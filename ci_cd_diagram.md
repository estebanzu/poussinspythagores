# CI/CD Diagram — Poussins Pythagores

ASCII overview of the whole continuous integration / deployment flow for this
repository (Makefile QA pipeline → build → Vercel / Docker runtime).

```
                              ┌───────────────────────────────────────────┐
                              │              DEVELOPER (local)            │
                              │   edit code  •  git add  •  git commit    │
                              │   git push origin main                    │
                              └───────────────────┬───────────────────────┘
                                                  │
                                                  ▼
   ┌──────────────────────── LOCAL QA PIPELINE (Makefile) ───────────────────────┐
   │                                                                             │
   │  make install ───────────► npm install                        [deps]       │
   │                                                                             │
   │  make css ───────────────► tailwindcss -i src/styles.css                   │
   │                             -o public/styles.css --minify     [build css]  │
   │                                                                             │
   │  make check ──────────────────────────────────────────────────────────┐     │
   │   ├─► format-check ──► npx prettier --check .               [format]  │     │
   │   ├─► lint ──────────► npx eslint .                           [lint]  │     │
   │   ├─► test ──────────► npm test (jest, supertest)           [tests]  │     │
   │   ├─► geome ─────────► node scripts/qa.js --geome        [qa: geom.] │     │
   │   └─► frontend-qa ───► node scripts/qa.js --frontend    [qa: front]  │     │
   │                                                     └──► all 5 pass? │     │
   │                                                                       │     │
   │  make security ──────────► npm audit                        [vulns]  │     │
   │  make audit-prod ────────► npm audit --omit=dev       [prod vulns]   │     │
   │  make gitleaks ──────────► gitleaks detect --source .  [secrets]      │     │
   │  make css-check ─────────► rebuild + diff public/styles.css [fresh]   │     │
   │                                                                             │
   │  make verify = check + security + gitleaks ───────────────► PASS?          │
   └────────────────────────────────┬───────────────────────────┬───────────────┘
                                    │                           │
                             FAIL: fix & rerun             PASS ✓
                                                            │
                                                            ▼
                              ┌───────────────────────────────────────────┐
                              │                 BUILD                     │
                              │                                           │
                              │  make css      rebuild Tailwind CSS       │
                              │  make build    stage artefacts:           │
                              │   index.html, public/, server.js,         │
                              │   package.json, README.md                  │
                              │   └─► .vercel_build_output/               │
                              └───────────────────┬───────────────────────┘
                                                  │
                                                  ▼
                              ┌───────────────────────────────────────────┐
                              │                 DEPLOY                     │
                              │                                           │
                              │  make deploy ──► vercel --prod             │
                              │                 (uses VERCEL_TOKEN)        │
                              │                                           │
                              │  vercel.json:                             │
                              │   • build  server.js with @vercel/node    │
                              │   • route  /(.*)  ──►  server.js          │
                              └───────────────────┬───────────────────────┘
                                                  │
                                    ┌─────────────┴─────────────┐
                                    ▼                           ▼
                        ┌───────────────────────┐   ┌────────────────────────┐
                        │  VERCEL (primary)     │   │  DOCKER (alternative)  │
                        │                      │   │  Dockerfile:           │
                        │  serverless Node      │   │  • node:20-alpine      │
                        │  Express server.js    │   │  • npm ci --only=prod  │
                        │                      │   │  • EXPOSE 3000          │
                        │  Continuous deploy    │   │  • CMD node server.js  │
                        │  from branch `main`   │   └────────────┬───────────┘
                        └───────────┬───────────┘                │
                                    │                            │
                                    └────────────┬───────────────┘
                                                 ▼
                         ┌─────────────────────────────────────────────┐
                         │                RUNTIME                       │
                         │                                             │
                         │  Express server.js:                          │
                         │   • static  public/                          │
                         │     ├─ index.html  (PWA shell)              │
                         │     ├─ styles.css  (Tailwind build)         │
                         │     ├─ js/*        (ES modules)             │
                         │     ├─ service-worker.js                    │
                         │     └─ manifest.json, logo.png              │
                         │   • GET  /health                            │
                         │   • POST /api/telemetry ──► Supabase        │
                         └──────────────────────┬──────────────────────┘
                                                ▼
                                    poussinspythagores.vercel.app
```

## What each piece is

| Piece                 | File(s)                                | Role in CI/CD                                                    |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| QA pipeline           | `Makefile`, `package.json`             | `check` / `verify` gate (lint, format, test, geome, frontend-qa) |
| Frontend QA script    | `scripts/qa.js`                        | Serves app and asserts assets, modules, no Tailwind CDN          |
| CSS build             | `src/styles.css`, `tailwind.config.js` | `make css` → `public/styles.css`                                 |
| Security              | `Makefile`                             | `make security`, `make audit-prod`, `make gitleaks`              |
| Pre-deploy gate       | `Makefile`                             | `make verify` = check + security + gitleaks                      |
| Build artefacts       | `Makefile` (`build`)                   | stages to `.vercel_build_output/`                                |
| Deploy (CLI)          | `Makefile` (`deploy`)                  | `vercel --prod` with `VERCEL_TOKEN`                              |
| Deploy (continuous)   | Vercel project settings                | auto-deploys `main` branch (see `README.md`)                     |
| Serverless entry      | `vercel.json`, `server.js`             | routes all requests to Express                                   |
| Container alternative | `Dockerfile`                           | Node 20 + `npm ci --only=production`                             |
| Secrets               | `.env` (git-ignored)                   | Supabase URL/anon key, `VERCEL_TOKEN`                            |

## Pipeline exit codes

| Step         | Command                  | Fails CI/CD when…                      |
| ------------ | ------------------------ | -------------------------------------- |
| format-check | `npx prettier --check .` | any file not formatted                 |
| lint         | `npx eslint .`           | any lint error                         |
| test         | `npm test`               | any test fails                         |
| geome        | `qa.js --geome`          | geometry category/render/parse missing |
| frontend-qa  | `qa.js --frontend`       | asset/module/Tailwind-CDN check fails  |
| security     | `npm audit`              | vulnerabilities found                  |
| audit-prod   | `npm audit --omit=dev`   | prod vulnerabilities found             |
| gitleaks     | `gitleaks detect`        | a secret is detected                   |
| css-check    | rebuild + `cmp`          | `public/styles.css` out of date        |
| deploy       | `vercel --prod`          | deploy/build failure on Vercel         |
