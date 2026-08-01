#!/usr/bin/env bash
#
# install-textual.sh — set up the project Python venv and install Textual.
#
# The distro Python is PEP 668 "externally managed", so we create a venv
# and bootstrap pip via get-pip.py (ensurepip is often missing too).
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d .venv ]; then
  echo "Creating .venv ..."
  python3 -m venv .venv
fi

if [ ! -x .venv/bin/pip ]; then
  echo "Bootstrapping pip (get-pip.py) ..."
  curl -fsSL https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
  .venv/bin/python /tmp/get-pip.py --quiet
  rm -f /tmp/get-pip.py
fi

echo "Installing textual ..."
.venv/bin/pip install --quiet textual
.venv/bin/python -c "import textual; print('textual', textual.__version__)"
