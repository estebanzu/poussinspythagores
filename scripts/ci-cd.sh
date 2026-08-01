#!/usr/bin/env bash
#
# ci-cd.sh — run the full Poussins Pythagores CI/CD pipeline.
#
# Every stage runs and its result (PASS / FAIL / SKIPPED) is recorded.
# - If ANY stage fails, `make deploy` is NOT run.
# - If the last production deployment is < 30 min old, `make deploy` is
#   skipped (recent enough to reuse) but the smoke test still runs.
# - A report is always written to `ci-cd-report.html`, with failed
#   stages highlighted and their logs included.
#
# Stages:
#   1.  install      — npm install
#   2.  format-check — npx prettier --check .
#   3.  lint         — npm run lint
#   4.  test         — npm test
#   5.  geome        — node scripts/qa.js --geome
#   6.  frontend-qa  — node scripts/qa.js --frontend
#   7.  audit-prod   — npm audit --omit=dev
#   8.  gitleaks     — gitleaks detect --source .
#   9.  css          — npm run build:css
#   10. css-check    — rebuild + diff public/styles.css
#   11. build        — make build (stage artefacts)
#   12. deploy       — make deploy (Vercel production) — skipped on failure
#                      or if deployed within the last DEPLOY_MAX_AGE secs
#   13. smoke        — assert deployed site serves ES modules
#
# Usage:
#   ./scripts/ci-cd.sh              run everything including deploy
#   ./scripts/ci-cd.sh --no-deploy  run pipeline up to (but excluding) deploy
#   ./scripts/ci-cd.sh --help       show this help
#
# Optional environment:
#   VERCEL_TOKEN    required for deploy (unless --no-deploy)
#   VERCEL_PROJECT_ID  overrides project id read from .vercel/project.json
#   DEPLOY_URL      production URL used by the smoke test
#                   (default: https://poussinspythagores.vercel.app)
#   DEPLOY_MAX_AGE  skip deploy if last production deploy is younger than
#                   this many seconds (default: 1800 = 30 min)
set -uo pipefail

DEPLOY_URL="${DEPLOY_URL:-https://poussinspythagores.vercel.app}"
DEPLOY_MAX_AGE="${DEPLOY_MAX_AGE:-1800}"
DO_DEPLOY=1
REPORT="ci-cd-report.html"

for arg in "$@"; do
  case "$arg" in
    --no-deploy) DO_DEPLOY=0 ;;
    --help | -h)
      sed -n '2,36p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg (see --help)" >&2
      exit 2
      ;;
  esac
done

# Load .env if present (defines VERCEL_TOKEN, SUPABASE_URL, ...)
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

LOG_DIR=$(mktemp -d)
trap 'rm -rf "$LOG_DIR"' EXIT

STAGES=()
STATUS=()
DURATION=()
NOTES=()
LOGS=()

record_skip() {
  STAGES+=("$1")
  STATUS+=(SKIP)
  DURATION+=("0")
  NOTES+=("$2")
  LOGS+=("$LOG_DIR/skipped.log")
  : >"$LOG_DIR/skipped.log"
}

run_stage() {
  local label="$1"
  shift
  local log="$LOG_DIR/$(echo "$label" | tr -cd '[:alnum:]-').log"
  local start end rc
  start=$(date +%s)
  echo
  echo "-------------------------------------------------------------------"
  echo "  $label"
  echo "-------------------------------------------------------------------"
  "$@" >"$log" 2>&1
  rc=$?
  end=$(date +%s)
  local stat=PASS
  [ "$rc" -eq 0 ] || stat=FAIL
  STAGES+=("$label")
  STATUS+=("$stat")
  DURATION+=("$((end - start))")
  NOTES+=("")
  LOGS+=("$log")
  if [ "$rc" -eq 0 ]; then
    echo "  PASS ✓"
  else
    echo "  FAIL ✗ (see report)"
    tail -5 "$log"
  fi
}

any_failed() {
  local s
  for s in "${STATUS[@]:-}"; do
    [ "$s" = "FAIL" ] && return 0
  done
  return 1
}

# Age in seconds of the most recent production deployment; "" if unknown.
get_last_deploy_age() {
  local project_id="${VERCEL_PROJECT_ID:-}"
  if [ -z "$project_id" ] && [ -f .vercel/project.json ]; then
    project_id=$(node -e 'try { const p = JSON.parse(require("fs").readFileSync(".vercel/project.json", "utf8")); process.stdout.write(p.projectId || ""); } catch (e) {}')
  fi
  [ -n "$project_id" ] || return 0
  VERCEL_PROJECT_ID="$project_id" node -e '
    const https = require("https");
    const url = `https://api.vercel.com/v6/deployments?projectId=${process.env.VERCEL_PROJECT_ID}&limit=1&target=production`;
    https.get(url, { headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN || ""}` } }, res => {
      let body = "";
      res.on("data", c => (body += c));
      res.on("end", () => {
        try {
          const d = (JSON.parse(body).deployments || [])[0];
          if (d && d.created) process.stdout.write(String(Math.floor((Date.now() - d.created) / 1000)));
        } catch (e) {}
      });
    }).on("error", () => {});
  '
}

html_escape() {
  sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' "$1"
}

# ---------------------------------------------------------------------------
# 1. Preflight
# ---------------------------------------------------------------------------
echo "Poussins Pythagores CI/CD pipeline"
echo "Started: $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
echo "Deploy:  $([ "$DO_DEPLOY" -eq 1 ] && echo enabled || echo disabled)"
echo "Max deploy age: ${DEPLOY_MAX_AGE}s (skip deploy if newer)"
echo
for tool in node npm make gitleaks curl; do
  command -v "$tool" >/dev/null 2>&1 || {
    echo "ERROR: '$tool' not found on PATH" >&2
    exit 2
  }
done
if [ "$DO_DEPLOY" -eq 1 ] && [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: VERCEL_TOKEN is not set (source .env or export it)" >&2
  exit 2
fi

# ---------------------------------------------------------------------------
# 2. Stages
# ---------------------------------------------------------------------------
run_stage "1. install" npm install
run_stage "2. format-check" make format-check
run_stage "3. lint" make lint
run_stage "4. test" make test
run_stage "5. geome" make geome
run_stage "6. frontend-qa" make frontend-qa
run_stage "7. audit-prod" make audit-prod
run_stage "8. gitleaks" make gitleaks
run_stage "9. css" make css
run_stage "10. css-check" make css-check
run_stage "11. build" make build

HAS_FAILURES=0
any_failed && HAS_FAILURES=1

# Decide whether deploy should be skipped (age check, if any failure, --no-deploy)
DEPLOY_REASON=""
if [ "$DO_DEPLOY" -eq 0 ]; then
  DEPLOY_REASON="--no-deploy requested"
elif [ "$HAS_FAILURES" -eq 1 ]; then
  DEPLOY_REASON="previous stage(s) failed"
elif [ -n "${VERCEL_TOKEN:-}" ]; then
  DEPLOY_AGE=$(get_last_deploy_age)
  if [ -n "$DEPLOY_AGE" ] && [ "$DEPLOY_AGE" -le "$DEPLOY_MAX_AGE" ]; then
    DEPLOY_REASON="last production deployment ${DEPLOY_AGE}s ago (<= ${DEPLOY_MAX_AGE}s)"
  fi
fi

# --- 12. deploy --------------------------------------------------------------
if [ -n "$DEPLOY_REASON" ]; then
  record_skip "12. deploy" "$DEPLOY_REASON"
  echo
  echo "-------------------------------------------------------------------"
  echo "  Deploy SKIPPED: $DEPLOY_REASON"
  echo "-------------------------------------------------------------------"
else
  run_stage "12. deploy" make deploy
fi

# --- 13. smoke ---------------------------------------------------------------
any_failed && HAS_FAILURES=1
if [ "$HAS_FAILURES" -eq 1 ]; then
  record_skip "13. smoke" "skipped because of earlier failure(s)"
else
  run_stage "13. smoke" bash -c "
    set -e
    curl -s -o /dev/null -w 'GET /         HTTP %{http_code}\n' --max-time 30 '$DEPLOY_URL'
    curl -s -o /dev/null -w 'GET /health   HTTP %{http_code}\n' --max-time 30 '$DEPLOY_URL/health'
    MAIN_JS=\$(curl -s --max-time 30 '$DEPLOY_URL/js/main.js')
    echo \"\$MAIN_JS\" | grep -q '^import ' || { echo 'FAIL: /js/main.js is not served as an ES module'; exit 1; }
    echo \"\$MAIN_JS\" | grep -q 'require(' && { echo 'FAIL: /js/main.js contains require() — ESM compiled to CJS'; exit 1; }
    echo '  /js/main.js served as ES module (import, no require)'
    curl -s -o /dev/null -w 'GET /styles.css HTTP %{http_code}\n' --max-time 30 '$DEPLOY_URL/styles.css'
  "
fi

# ---------------------------------------------------------------------------
# 3. HTML report
# ---------------------------------------------------------------------------
n_pass=0; n_fail=0; n_skip=0
for s in "${STATUS[@]}"; do
  case "$s" in
    PASS) n_pass=$((n_pass + 1)) ;;
    FAIL) n_fail=$((n_fail + 1)) ;;
    SKIP) n_skip=$((n_skip + 1)) ;;
  esac
done

GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo n/a)
GIT_BRANCH=$(git branch --show-current 2>/dev/null || echo n/a)

{
  cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CI/CD Pipeline Report — Poussins Pythagores</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; margin: 2rem auto; max-width: 960px; padding: 0 1rem; color: #1f2937; }
  h1 { font-size: 1.5rem; }
  .meta { color: #6b7280; font-size: 0.85rem; margin-bottom: 1.5rem; }
  .summary { display: inline-block; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; margin-bottom: 1.5rem; }
  .summary.ok { background: #dcfce7; color: #166534; }
  .summary.bad { background: #fee2e2; color: #991b1b; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
  th, td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  th { background: #f3f4f6; }
  tr.fail { background: #fef2f2; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; color: #fff; white-space: nowrap; }
  .badge.pass { background: #16a34a; }
  .badge.fail { background: #dc2626; }
  .badge.skip { background: #9ca3af; }
  h2 { font-size: 1.1rem; margin-top: 2rem; }
  details { border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; padding: 0.5rem 0.75rem; }
  summary { cursor: pointer; font-weight: 600; }
  pre { background: #111827; color: #e5e7eb; padding: 0.75rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; }
</style>
</head>
<body>
<h1>CI/CD Pipeline Report — Poussins Pythagores</h1>
<div class="meta">
  Run: $(date -u +'%Y-%m-%d %H:%M:%S UTC') &nbsp;|&nbsp; Git: $GIT_BRANCH @ $GIT_SHA &nbsp;|&nbsp; Max deploy age: ${DEPLOY_MAX_AGE}s
</div>
EOF

  if [ "$n_fail" -eq 0 ]; then
    echo '<div class="summary ok">ALL STAGES PASSED — pipeline completed</div>'
  else
    echo "<div class=\"summary bad\">$n_fail stage(s) FAILED — deploy was skipped</div>"
  fi

  cat <<EOF
<table>
<thead><tr><th>#</th><th>Stage</th><th>Status</th><th>Duration</th><th>Notes</th><th>Log</th></tr></thead>
<tbody>
EOF

  for i in "${!STAGES[@]}"; do
    cls=""
    [ "${STATUS[$i]}" = "FAIL" ] && cls=' class="fail"'
    logfile="${LOGS[$i]}"
    short="${logfile##*/}"
    echo "<tr$cls><td>${STAGES[$i]%% *}</td><td>${STAGES[$i]#*. }</td><td><span class=\"badge $(echo "${STATUS[$i]}" | tr 'A-Z' 'a-z')\">${STATUS[$i]}</span></td><td>${DURATION[$i]}s</td><td>${NOTES[$i]}</td><td><a href=\"#$short\">log</a></td></tr>"
  done

  cat <<EOF
</tbody>
</table>
EOF

  echo "<h2>Failed stages (${n_fail})</h2>"
  for i in "${!STAGES[@]}"; do
    [ "${STATUS[$i]}" != "FAIL" ] && continue
    logfile="${LOGS[$i]}"
    short="${logfile##*/}"
    echo "<details open id=\"$short\"><summary>${STAGES[$i]}</summary><pre>"
    html_escape "$logfile"
    echo "</pre></details>"
  done

  echo "<h2>All stage logs (${#STAGES[@]})</h2>"
  for i in "${!STAGES[@]}"; do
    logfile="${LOGS[$i]}"
    short="${logfile##*/}"
    echo "<details id=\"$short\"><summary>${STAGES[$i]} — ${STATUS[$i]}${NOTES[$i]:+ — ${NOTES[$i]}}</summary><pre>"
    html_escape "$logfile"
    echo "</pre></details>"
  done

  cat <<EOF
</body>
</html>
EOF
} >"$REPORT"

echo
echo "-------------------------------------------------------------------"
echo "  Report written to $REPORT"
echo "-------------------------------------------------------------------"

if [ "$n_fail" -gt 0 ]; then
  echo "Pipeline FAILED ($n_fail stage(s)). See $REPORT for details."
  exit 1
fi
echo "Pipeline completed successfully."
exit 0
