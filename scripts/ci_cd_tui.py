#!/usr/bin/env python3
"""CI/CD pipeline with a live Textual UI.

Shows every stage of the Poussins Pythagores pipeline as it runs:
  - which block is running right now (spinner + yellow highlight)
  - PASS / FAIL / SKIPPED per stage, with durations
  - live stream of the running stage's output
  - a summary bar with the number of issues discovered (or "0 issues")

Same guarantees as scripts/ci-cd.sh:
  - `make deploy` never runs if an earlier stage failed
  - deploy is skipped if the last production deployment is younger than
    DEPLOY_MAX_AGE seconds (default 1800 = 30 min); smoke still runs
  - an HTML report (ci-cd-report.html) is written with every stage's
    result and logs, highlighting failures

Runs in full-screen TUI mode when on a terminal with `textual` installed;
otherwise falls back to a plain console mode (also used when piped).
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORT = REPO / "ci-cd-report.html"
DEPLOY_URL_DEFAULT = "https://poussinspythagores.vercel.app"
DEPLOY_MAX_AGE_DEFAULT = 1800

STAGES = [
    ("1", "install", ["npm", "install"]),
    ("2", "format-check", ["make", "format-check"]),
    ("3", "lint", ["make", "lint"]),
    ("4", "test", ["make", "test"]),
    ("5", "geome", ["make", "geome"]),
    ("6", "frontend-qa", ["make", "frontend-qa"]),
    ("7", "audit-prod", ["make", "audit-prod"]),
    ("8", "gitleaks", ["make", "gitleaks"]),
    ("9", "css", ["make", "css"]),
    ("10", "css-check", ["make", "css-check"]),
    ("11", "build", ["make", "build"]),
]

ANSI_RE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")


def clean_line(raw: str) -> str:
    return ANSI_RE.sub("", raw).replace("\r", "")


def load_env() -> None:
    env_file = REPO / ".env"
    if not env_file.exists():
        return
    for raw in env_file.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def git_info() -> tuple[str, str]:
    branch = (
        subprocess.run(
            ["git", "branch", "--show-current"],
            cwd=REPO, capture_output=True, text=True,
        ).stdout.strip()
        or "n/a"
    )
    sha = (
        subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd=REPO, capture_output=True, text=True,
        ).stdout.strip()
        or "n/a"
    )
    return branch, sha


def preflight(deploy_enabled: bool) -> bool:
    missing = [t for t in ("node", "npm", "make", "gitleaks", "curl") if shutil.which(t) is None]
    if missing:
        print(f"ERROR: missing tools: {', '.join(missing)}", file=sys.stderr)
        return False
    if deploy_enabled and not os.environ.get("VERCEL_TOKEN"):
        print("ERROR: VERCEL_TOKEN is not set (source .env or export it)", file=sys.stderr)
        return False
    return True


def get_last_deploy_age() -> int | None:
    """Age in seconds of the most recent production deployment, or None."""
    project_id = os.environ.get("VERCEL_PROJECT_ID")
    if not project_id:
        try:
            project_id = json.loads((REPO / ".vercel/project.json").read_text()).get("projectId")
        except Exception:
            return None
    token = os.environ.get("VERCEL_TOKEN")
    if not project_id or not token:
        return None
    url = f"https://api.vercel.com/v6/deployments?projectId={project_id}&limit=1&target=production"
    try:
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.load(resp)
        created = ((data.get("deployments") or [{}])[0]).get("created")
        if not created:
            return None
        return max(0, int(time.time() * 1000 - created) // 1000)
    except Exception:
        return None


def run_smoke(url: str) -> tuple[int, list[str]]:
    lines: list[str] = []
    ok = True

    def fetch(path: str) -> tuple[int | None, str | None]:
        try:
            with urllib.request.urlopen(url + path, timeout=30) as resp:
                return resp.status, resp.read().decode("utf-8", "replace")
        except Exception as exc:
            lines.append(f"GET {path} ERROR: {exc}")
            return None, None

    for path in ("/", "/health"):
        code, _ = fetch(path)
        lines.append(f"GET {path:<15} HTTP {code if code is not None else 'FAILED'}")
        ok = ok and code == 200

    code, body = fetch("/js/main.js")
    if code == 200 and body is not None:
        if not body.lstrip().startswith("import "):
            lines.append("FAIL: /js/main.js is not served as an ES module")
            ok = False
        elif "require(" in body:
            lines.append("FAIL: /js/main.js contains require() — ESM compiled to CJS")
            ok = False
        else:
            lines.append("  /js/main.js served as ES module (import, no require)")
    else:
        ok = False

    code, _ = fetch("/styles.css")
    lines.append(f"GET /styles.css    HTTP {code if code is not None else 'FAILED'}")
    ok = ok and code == 200

    lines.append("")
    lines.append("SMOKE " + ("PASS" if ok else "FAIL"))
    return (0 if ok else 1), lines


# ---------------------------------------------------------------------------
# HTML report
# ---------------------------------------------------------------------------

REPORT_CSS = """
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
"""


def write_report(path: Path, results: list[dict], deploy_enabled: bool, max_age: int) -> None:
    n_pass = sum(1 for r in results if r["status"] == "PASS")
    n_fail = sum(1 for r in results if r["status"] == "FAIL")
    n_skip = sum(1 for r in results if r["status"] == "SKIP")
    branch, sha = git_info()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    rows = []
    for r in results:
        cls = ' class="fail"' if r["status"] == "FAIL" else ""
        badge = f'<span class="badge {r["status"].lower()}">{r["status"]}</span>'
        note = html.escape(r.get("note") or "")
        short = f"{r['num']}-{r['name']}"
        rows.append(
            f"<tr{cls}><td>{r['num']}</td><td>{html.escape(r['name'])}</td>"
            f"<td>{badge}</td><td>{r['duration']}s</td><td>{note}</td>"
            f'<td><a href="#{short}">log</a></td></tr>'
        )

    if n_fail == 0:
        banner = '<div class="summary ok">ALL STAGES PASSED — pipeline completed</div>'
    else:
        banner = f'<div class="summary bad">{n_fail} stage(s) FAILED — deploy was skipped</div>'

    fail_details = []
    for r in results:
        if r["status"] != "FAIL":
            continue
        short = f"{r['num']}-{r['name']}"
        log = html.escape(r.get("log", ""))
        fail_details.append(f'<details open id="{short}"><summary>{r["num"]}. {html.escape(r["name"])}</summary><pre>{log}</pre></details>')

    all_details = []
    for r in results:
        short = f"{r['num']}-{r['name']}"
        log = html.escape(r.get("log", ""))
        note = html.escape(r.get("note") or "")
        extra = f" — {note}" if note else ""
        all_details.append(
            f'<details id="{short}"><summary>{r["num"]}. {html.escape(r["name"])} — {r["status"]}{extra}</summary><pre>{log}</pre></details>'
        )

    path.write_text(
        f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CI/CD Pipeline Report — Poussins Pythagores</title>
<style>{REPORT_CSS}</style>
</head>
<body>
<h1>CI/CD Pipeline Report — Poussins Pythagores</h1>
<div class="meta">Run: {now} &nbsp;|&nbsp; Git: {branch} @ {sha} &nbsp;|&nbsp; Deploy: {'enabled' if deploy_enabled else '--no-deploy'} &nbsp;|&nbsp; Max deploy age: {max_age}s</div>
{banner}
<table>
<thead><tr><th>#</th><th>Stage</th><th>Status</th><th>Duration</th><th>Notes</th><th>Log</th></tr></thead>
<tbody>
{chr(10).join(rows)}
</tbody>
</table>
<h2>Failed stages ({n_fail})</h2>
{chr(10).join(fail_details) if fail_details else '<p>None — all stages passed.</p>'}
<h2>All stage logs ({len(results)})</h2>
{chr(10).join(all_details)}
</body>
</html>
""",
        encoding="utf-8",
    )


# ---------------------------------------------------------------------------
# Pipeline (event generator — consumed by both the TUI and the console)
# ---------------------------------------------------------------------------

def exec_stage(num: str, name: str, task, log_path: Path):
    yield ("running", num, name, str(log_path))
    buf: list[str] = []
    start = time.time()
    rc = 0
    if callable(task):
        rc, out_lines = task()
        for line in out_lines:
            buf.append(line + "\n")
            yield ("log", line)
    else:
        proc = subprocess.Popen(
            task, cwd=REPO,
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            text=True, bufsize=1,
        )
        assert proc.stdout is not None
        for raw in proc.stdout:
            buf.append(raw)
            line = clean_line(raw.rstrip("\n"))
            if line:
                yield ("log", line)
        proc.wait()
        rc = proc.returncode
    duration = int(time.time() - start)
    log_path.write_text("".join(buf), encoding="utf-8", errors="replace")
    status = "PASS" if rc == 0 else "FAIL"
    yield ("done", num, name, status, duration, "", str(log_path))


def pipeline_events(deploy_enabled: bool, deploy_url: str, max_age: int, log_dir: Path):
    results: list[dict] = []

    def record(num: str, name: str, status: str, duration: int, note: str, log_text: str = ""):
        results.append(
            {"num": num, "name": name, "status": status, "duration": duration, "note": note, "log": log_text}
        )
        yield ("done", num, name, status, duration, note, "")

    yield ("banner", deploy_enabled, max_age)

    # ---- stages 1..11 -----------------------------------------------------
    for num, name, cmd in STAGES:
        for ev in exec_stage(num, name, cmd, log_dir / f"{num}-{name}.log"):
            if ev[0] == "done":
                _, n, na, status, dur, _, logp = ev
                results.append(
                    {"num": n, "name": na, "status": status, "duration": dur, "note": "", "log": Path(logp).read_text(errors="replace")}
                )
                yield ev
            else:
                yield ev

    has_failures = any(r["status"] == "FAIL" for r in results)

    # ---- 12. deploy -------------------------------------------------------
    deploy_reason = ""
    if not deploy_enabled:
        deploy_reason = "--no-deploy requested"
    elif has_failures:
        deploy_reason = "previous stage(s) failed"
    elif os.environ.get("VERCEL_TOKEN"):
        age = get_last_deploy_age()
        if age is not None and age <= max_age:
            deploy_reason = f"last production deployment {age}s ago (<= {max_age}s)"

    if deploy_reason:
        yield ("skip", "12", "deploy", deploy_reason)
        results.append({"num": "12", "name": "deploy", "status": "SKIP", "duration": 0, "note": deploy_reason, "log": ""})
    else:
        for ev in exec_stage("12", "deploy", ["make", "deploy"], log_dir / "12-deploy.log"):
            if ev[0] == "done":
                _, n, na, status, dur, _, logp = ev
                results.append(
                    {"num": n, "name": na, "status": status, "duration": dur, "note": "", "log": Path(logp).read_text(errors="replace")}
                )
                yield ev
            else:
                yield ev

    # ---- 13. smoke ----------------------------------------------------------
    has_failures = any(r["status"] == "FAIL" for r in results)
    if has_failures:
        note = "skipped because of earlier failure(s)"
        yield ("skip", "13", "smoke", note)
        results.append({"num": "13", "name": "smoke", "status": "SKIP", "duration": 0, "note": note, "log": ""})
    else:
        smoke_task = lambda: run_smoke(deploy_url)  # noqa: E731
        for ev in exec_stage("13", "smoke", smoke_task, log_dir / "13-smoke.log"):
            if ev[0] == "done":
                _, n, na, status, dur, _, logp = ev
                results.append(
                    {"num": n, "name": na, "status": status, "duration": dur, "note": "", "log": Path(logp).read_text(errors="replace")}
                )
                yield ev
            else:
                yield ev

    # ---- report --------------------------------------------------------------
    write_report(REPORT, results, deploy_enabled, max_age)
    yield ("report", str(REPORT))
    yield ("finish", results)


# ---------------------------------------------------------------------------
# Console (non-TUI) rendering
# ---------------------------------------------------------------------------

BADGE = {"PASS": "PASS \u2713", "FAIL": "FAIL \u2717", "SKIP": "SKIP", "RUNNING": "RUNNING \u25b6"}


def console_main(deploy_enabled: bool, deploy_url: str, max_age: int) -> int:
    with tempfile.TemporaryDirectory(prefix="ci-cd-") as tmp:
        log_dir = Path(tmp)
        print(f"Poussins Pythagores CI/CD pipeline")
        print(f"Started: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
        print(f"Deploy: {'enabled' if deploy_enabled else 'disabled'}  Max deploy age: {max_age}s")
        print()
        for ev in pipeline_events(deploy_enabled, deploy_url, max_age, log_dir):
            kind = ev[0]
            if kind == "banner":
                continue
            if kind == "running":
                _, num, name, _ = ev
                print(f"[{num}/13] {name} ... ", end="", flush=True)
            elif kind == "log":
                print(f"    {ev[1]}")
            elif kind == "done":
                _, num, name, status, duration, _, _ = ev
                print(f"{BADGE[status]} ({duration}s)")
            elif kind == "skip":
                _, num, name, note = ev
                print(f"[{num}/13] {name} ... SKIP ({note})")
            elif kind == "report":
                print()
                print(f"Report written to {ev[1]}")
            elif kind == "finish":
                results = ev[1]
                n_fail = sum(1 for r in results if r["status"] == "FAIL")
                print()
                if n_fail:
                    print(f"Pipeline FAILED ({n_fail} stage(s)). See {REPORT} for details.")
                    return 1
                print("Pipeline completed successfully.")
                return 0
    return 1


# ---------------------------------------------------------------------------
# Textual TUI
# ---------------------------------------------------------------------------

def _tui_classes():
    """Import Textual and return the CICDApp class (Textual stays optional)."""
    import asyncio

    from textual.app import App, ComposeResult
    from textual.binding import Binding
    from textual.containers import Horizontal, ScrollableContainer, Vertical
    from textual.widgets import Footer, Header, Log, Static

    STAGE_IDS = [n for _, n, _ in STAGES] + ["deploy", "smoke"]

    ROW_MARKUP = {
        "PENDING": "[dim]\u00b7\u00b7\u00b7\u00b7\u00b7[/dim]",
        "RUNNING": "[bold yellow]RUNNING[/bold yellow]",
        "PASS": "[green]\u25cf PASS[/green]",
        "FAIL": "[red]\u25cf FAIL[/red]",
        "SKIP": "[dim]\u25cb SKIP[/dim]",
    }

    class CICDApp(App):
        TITLE = "CI/CD Pipeline"
        SUB_TITLE = "Poussins Pythagores"
        CSS = """
        Screen { layout: vertical; }
        #top { layout: horizontal; height: 1fr; }
        #stages-panel { width: 48%; border: round $accent; margin: 0 0 1 1; }
        #log-panel { width: 1fr; border: round $primary; margin: 0 1 1 1; }
        .panel-title { text-style: bold; color: $text-muted; padding: 0 1; }
        #log-body { height: 1fr; }
        .stage { padding: 0 1; }
        .stage.pass { color: $text; }
        .stage.fail { background: $error 20%; color: $text; }
        .stage.running { color: $warning; text-style: bold; }
        .stage.skip { color: $text-muted; }
        #statusbar { height: 3; border: round $success; margin: 0 1 1 1; padding: 0 1; }
        """

        BINDINGS = [
            Binding("q", "quit", "Quit"),
            Binding("r", "report", "Open report (copy path)"),
        ]

        def __init__(self, deploy_enabled: bool, deploy_url: str, max_age: int) -> None:
            super().__init__()
            self.deploy_enabled = deploy_enabled
            self.deploy_url = deploy_url
            self.max_age = max_age
            self.results: list[dict] = []
            self.running: str | None = None
            self.finished = False

        def compose(self) -> ComposeResult:
            yield Header()
            with Horizontal(id="top"):
                with ScrollableContainer(id="stages-panel"):
                    yield Static("STAGES", classes="panel-title")
                    for name in STAGE_IDS:
                        yield Static("", id=f"row-{name}", classes="stage")
                with Vertical(id="log-panel"):
                    yield Static("LOG", id="log-title", classes="panel-title")
                    yield Log(id="log-body", highlight=False)
            yield Static("", id="statusbar")
            yield Footer()

        def on_mount(self) -> None:
            self.log_view = self.query_one("#log-body", Log)
            self.statusbar = self.query_one("#statusbar", Static)
            self.log_title = self.query_one("#log-title", Static)
            for name in STAGE_IDS:
                self.query_one(f"#row-{name}", Static).update(self.render_row(name))
            self.update_statusbar("STARTING")
            self.run_worker(self._run, thread=True)
            self.run_worker(self._spinner)

        # -- worker: run the pipeline -----------------------------------------
        def _run(self) -> None:
            log_dir = Path(tempfile.mkdtemp(prefix="ci-cd-tui-"))
            try:
                for ev in pipeline_events(self.deploy_enabled, self.deploy_url, self.max_age, log_dir):
                    self.call_from_thread(self._handle_event, ev)
            except Exception as exc:  # pragma: no cover
                self.call_from_thread(self.log_view.write_line, f"\nERROR: {exc}")
                self.call_from_thread(self.notify, f"Pipeline error: {exc}", severity="error")
                self.call_from_thread(self.update_statusbar, f"ERROR: {exc}")
                self.call_from_thread(self.quit)

        # -- worker: spinner animation -----------------------------------------
        async def _spinner(self) -> None:
            frames = ["\u280b", "\u2819", "\u2839", "\u2838", "\u283c", "\u2834", "\u2826", "\u2827", "\u2807", "\u280f"]
            i = 0
            while not self.finished:
                if self.running:
                    self._update_spinner_row(frames[i % len(frames)])
                    i += 1
                await asyncio.sleep(0.12)

        def _update_spinner_row(self, ch: str) -> None:
            if self.running:
                self.query_one(f"#row-{self.running}", Static).update(
                    self.render_row(self.running, status="RUNNING", spinner=ch)
                )

        def _handle_event(self, ev: tuple) -> None:
            kind = ev[0]
            if kind == "banner":
                _, enabled, max_age = ev
                self.update_statusbar(
                    f"DEPLOY {'enabled' if enabled else 'disabled'} (max age {max_age}s) — running stages..."
                )
            elif kind == "running":
                _, num, name, log_path = ev
                self.running = name
                self.log_title.update(f"LOG \u2014 {num}. {name}")
                self.log_view.clear()
                self.query_one(f"#row-{name}", Static).update(
                    self.render_row(name, status="RUNNING")
                )
                self.update_statusbar(f"[{num}/13] RUNNING \u2014 {name}")
            elif kind == "log":
                self.log_view.write_line(ev[1])
            elif kind == "done":
                _, num, name, status, duration, note, log_path = ev
                self.running = None
                self.results.append(
                    {"num": num, "name": name, "status": status, "duration": duration, "note": note}
                )
                self.query_one(f"#row-{name}", Static).update(
                    self.render_row(name, status=status, duration=duration, note=note)
                )
                self.log_view.write_line(f"\n{name}: {status} ({duration}s)")
                self.update_statusbar(self._summary())
            elif kind == "skip":
                _, num, name, note = ev
                self.results.append({"num": num, "name": name, "status": "SKIP", "duration": 0, "note": note})
                self.query_one(f"#row-{name}", Static).update(
                    self.render_row(name, status="SKIP", note=note)
                )
                self.log_title.update(f"LOG \u2014 {num}. {name}")
                self.log_view.clear()
                self.log_view.write_line(f"SKIPPED: {note}")
                self.update_statusbar(self._summary())
            elif kind == "report":
                self.log_view.write_line(f"\nReport written to {ev[1]}")
            elif kind == "finish":
                self.finished = True
                results = ev[1]
                n_fail = sum(1 for r in results if r["status"] == "FAIL")
                n_pass = sum(1 for r in results if r["status"] == "PASS")
                n_skip = sum(1 for r in results if r["status"] == "SKIP")
                if n_fail:
                    self.notify(f"Pipeline FAILED: {n_fail} issue(s). Report: {REPORT}", severity="error")
                else:
                    self.notify("All stages passed. Report: " + str(REPORT), severity="information")
                self.update_statusbar(
                    f"RESULT: {'FAIL' if n_fail else 'PASS'} \u00b7 {n_pass} passed \u00b7 {n_fail} failed \u00b7 {n_skip} skipped \u00b7 Issues: {n_fail} \u00b7 Report: {REPORT}"
                )

        # -- rendering helpers ------------------------------------------------
        def render_row(self, name: str, status: str = "PENDING", duration: int | None = None, note: str = "", spinner: str = "") -> str:
            label = f"{name:<16}"
            base = f"[b]{label}[/b]"
            badge = ROW_MARKUP[status] if status in ROW_MARKUP else f"[dim]{status}[/dim]"
            parts = [base, badge]
            if status == "RUNNING" and spinner:
                parts.append(f"[yellow]{spinner}[/yellow]")
            if duration is not None:
                parts.append(f"[dim]{duration}s[/dim]")
            if note:
                parts.append(f"[dim]({note})[/dim]")
            return "  ".join(parts)

        def _summary(self) -> str:
            n_pass = sum(1 for r in self.results if r["status"] == "PASS")
            n_fail = sum(1 for r in self.results if r["status"] == "FAIL")
            n_skip = sum(1 for r in self.results if r["status"] == "SKIP")
            failed = ", ".join(r["name"] for r in self.results if r["status"] == "FAIL")
            issues = f"{n_fail} ({failed})" if failed else "0"
            done = len(self.results)
            running = f" \u00b7 RUNNING: {self.running}" if self.running else ""
            return (
                f"STAGES: {done}/13 \u00b7 {n_pass} passed \u00b7 {n_fail} failed \u00b7 {n_skip} skipped"
                f" \u00b7 Issues: {issues}{running}"
            )

        def update_statusbar(self, text: str) -> None:
            self.statusbar.update(text)

        def action_report(self) -> None:
            self.notify(f"Report: {REPORT}")

    return CICDApp


def tui_main(deploy_enabled: bool, deploy_url: str, max_age: int) -> int:
    CICDApp = _tui_classes()
    app = CICDApp(deploy_enabled, deploy_url, max_age)
    app.run()
    n_fail = sum(1 for r in app.results if r["status"] == "FAIL")
    return 1 if n_fail else 0


# ---------------------------------------------------------------------------

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="CI/CD pipeline with Textual UI.")
    p.add_argument("--no-deploy", action="store_true", help="run pipeline but never deploy")
    p.add_argument(
        "--max-age",
        type=int,
        default=int(os.environ.get("DEPLOY_MAX_AGE", DEPLOY_MAX_AGE_DEFAULT)),
        help=f"skip deploy if last production deployment is younger than this (s) [default {DEPLOY_MAX_AGE_DEFAULT}]",
    )
    p.add_argument("--url", default=os.environ.get("DEPLOY_URL", DEPLOY_URL_DEFAULT), help="production URL for smoke test")
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    load_env()
    deploy_url = args.url or os.environ.get("DEPLOY_URL", DEPLOY_URL_DEFAULT)
    deploy_enabled = not args.no_deploy

    if not preflight(deploy_enabled):
        return 2

    try:
        import textual  # noqa: F401
        has_textual = True
    except ImportError:
        has_textual = False

    if has_textual and sys.stdin.isatty():
        return tui_main(deploy_enabled, deploy_url, args.max_age)
    if has_textual:
        print("Textual UI requires a terminal; running console mode.")
    else:
        print("Textual not installed; running console mode (pip install textual).")
    return console_main(deploy_enabled, deploy_url, args.max_age)


if __name__ == "__main__":
    sys.exit(main())
