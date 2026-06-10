#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-nicevoice}"
APP_DIR="${APP_DIR:-/var/www/nicevoice}"
APP_USER="${APP_USER:-nicevoice}"
PORT="${PORT:-3000}"
ENV_FILE="${ENV_FILE:-$APP_DIR/.env}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo SERVICE_NAME=$SERVICE_NAME APP_DIR=$APP_DIR bash scripts/linux/install-service.sh" >&2
  exit 1
fi

if [ ! -d "$APP_DIR" ]; then
  echo "APP_DIR does not exist: $APP_DIR" >&2
  exit 1
fi

if ! id "$APP_USER" >/dev/null 2>&1; then
  useradd --system --home-dir "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
fi

mkdir -p "$APP_DIR/data"
chown -R "$APP_USER:$APP_USER" "$APP_DIR/data"

if [ -f "$ENV_FILE" ]; then
  chown "root:$APP_USER" "$ENV_FILE"
  chmod 640 "$ENV_FILE"
fi

cat >"/etc/systemd/system/${SERVICE_NAME}.service" <<SERVICE
[Unit]
Description=Nicevoice checkout site
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$PORT
EnvironmentFile=-$ENV_FILE
ExecStart=/usr/bin/env npm start
Restart=always
RestartSec=5
User=$APP_USER
Group=$APP_USER
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ReadWritePaths=$APP_DIR/data

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"
systemctl --no-pager --full status "$SERVICE_NAME"

echo "Installed ${SERVICE_NAME}.service for $APP_DIR on port $PORT"
