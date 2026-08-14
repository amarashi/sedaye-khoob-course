#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

cd "$APP_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed." >&2
  exit 1
fi

# node:sqlite is unflagged from 22.13 and accepts bare named parameters from 22.18.
if ! node -p "const [a,b]=process.versions.node.split('.').map(Number); (a>22||(a===22&&b>=18))?0:process.exit(1)" >/dev/null 2>&1; then
  echo "Node.js 22.18 or newer is required (node:sqlite). Found: $(node -v)" >&2
  exit 1
fi

if [ -f package-lock.json ]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

mkdir -p data
npm run build

echo "Build check completed in $APP_DIR"
