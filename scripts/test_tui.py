#!/usr/bin/env python3
"""Headless test of the Textual TUI logic (deterministic, no worker threads).

Drives the CICDApp's event handler directly with fake pipeline events and
asserts rows, statusbar and issue counting behave correctly. Run:

    .venv/bin/python scripts/test_tui.py
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import ci_cd_tui as mod

FAKE_EVENTS = [
    ("banner", True, 1800),
    ("running", "1", "install", "/tmp/x.log"),
    ("log", "npm install ok"),
    ("done", "1", "install", "PASS", 2, "", "/tmp/x.log"),
    ("running", "3", "lint", "/tmp/x.log"),
    ("log", "eslint clean"),
    ("done", "3", "lint", "FAIL", 3, "", "/tmp/x.log"),
    ("skip", "12", "deploy", "fake skip reason"),
    ("report", "/tmp/x.html"),
    ("finish", [
        {"num": "1", "name": "install", "status": "PASS", "duration": 2, "note": ""},
        {"num": "3", "name": "lint", "status": "FAIL", "duration": 3, "note": ""},
        {"num": "12", "name": "deploy", "status": "SKIP", "duration": 0, "note": "fake skip reason"},
    ]),
]


async def main() -> int:
    CICDApp = mod._tui_classes()
    app = CICDApp(True, "https://x.test", 1800)
    app.run_worker = lambda *a, **k: None  # keep the pipeline out of on_mount

    async with app.run_test() as pilot:
        for ev in FAKE_EVENTS:
            app._handle_event(ev)
        await pilot.pause()

        statusbar = str(app.statusbar.render()).replace("\x00", "")
        install_row = str(app.query_one("#row-install").render()).strip()
        lint_row = str(app.query_one("#row-lint").render()).strip()
        deploy_row = str(app.query_one("#row-deploy").render()).strip()
        smoke_row = str(app.query_one("#row-smoke").render()).strip()

        print("STATUSBAR:", statusbar[:200])
        print("ROW install:", install_row[:80])
        print("ROW lint:   ", lint_row[:80])
        print("ROW deploy: ", deploy_row[:80])
        print("ROW smoke:  ", smoke_row[:80])

        assert app.finished, "finish event not handled"
        assert "Issues: 1" in statusbar, "issues not counted in statusbar"
        assert "RESULT: FAIL" in statusbar, "final result not FAIL"
        assert "PASS" in install_row, "install row not PASS"
        assert "FAIL" in lint_row, "lint row not FAIL"
        assert "SKIP" in deploy_row, "deploy row not SKIP"
        assert "\u00b7\u00b7\u00b7\u00b7\u00b7" in smoke_row, "smoke row should stay PENDING"
        assert app.results[-1]["status"] == "SKIP", "results not recorded"
        print("TUI HEADLESS TEST OK")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
