#!/usr/bin/env python3
"""Verify the REAL worker path (thread _run + async _spinner) with fake events."""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, "/home/ezunigam/poussinspythagores/scripts")
import ci_cd_tui as mod

FAKE = [
    ("banner", True, 1800),
    ("running", "1", "install", "/tmp/x.log"),
    ("log", "hello from install"),
    ("done", "1", "install", "PASS", 2, "", "/tmp/x.log"),
    ("skip", "12", "deploy", "recent deploy"),
    ("report", "/tmp/x.html"),
    ("finish", [
        {"num": "1", "name": "install", "status": "PASS", "duration": 2, "note": ""},
        {"num": "12", "name": "deploy", "status": "SKIP", "duration": 0, "note": "recent deploy"},
    ]),
]

mod.pipeline_events = lambda *a, **k: iter(FAKE)


async def main():
    CICDApp = mod._tui_classes()
    app = CICDApp(True, "https://x.test", 1800)
    async with app.run_test() as pilot:
        for _ in range(30):
            await pilot.pause(0.1)
            if app.finished:
                break
        statusbar = str(app.statusbar.render()).replace("\x00", "")
        install_row = str(app.query_one("#row-install").render()).strip()
        deploy_row = str(app.query_one("#row-deploy").render()).strip()
        print("STATUSBAR:", statusbar[:160])
        print("ROW install:", install_row[:60])
        print("ROW deploy:", deploy_row[:60])
        print("RESULTS:", app.results)
        ok = (
            app.finished
            and "Issues: 0" in statusbar
            and "RESULT: PASS" in statusbar
            and "PASS" in install_row
            and "SKIP" in deploy_row
        )
        print("REAL-WORKER TEST", "OK" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
