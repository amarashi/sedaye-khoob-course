#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/nicevoice}"
SERVICE_NAME="${SERVICE_NAME:-nicevoice}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

if [ -d .git ]; then
  git fetch --prune origin
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
fi

bash "$APP_DIR/scripts/linux/build.sh"

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files | grep -q "^${SERVICE_NAME}.service"; then
  sudo systemctl restart "$SERVICE_NAME"
  sudo systemctl --no-pager --full status "$SERVICE_NAME"
else
  echo "Service ${SERVICE_NAME}.service was not found. Start manually with: npm start"
fi
