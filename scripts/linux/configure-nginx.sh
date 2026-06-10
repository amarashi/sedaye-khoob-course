#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-}"
SERVICE_NAME="${SERVICE_NAME:-nicevoice}"
APP_PORT="${APP_PORT:-3000}"
CLIENT_MAX_BODY_SIZE="${CLIENT_MAX_BODY_SIZE:-1m}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo DOMAIN=example.com bash scripts/linux/configure-nginx.sh" >&2
  exit 1
fi

if [ -z "$DOMAIN" ]; then
  echo "DOMAIN is required, for example: sudo DOMAIN=example.com bash scripts/linux/configure-nginx.sh" >&2
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "Nginx is not installed. Install it first with: sudo apt install nginx" >&2
  exit 1
fi

AVAILABLE="/etc/nginx/sites-available/$SERVICE_NAME"
ENABLED="/etc/nginx/sites-enabled/$SERVICE_NAME"

if [ -f "$AVAILABLE" ]; then
  cp "$AVAILABLE" "${AVAILABLE}.bak.$(date +%Y%m%d%H%M%S)"
fi

cat >"$AVAILABLE" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    client_max_body_size $CLIENT_MAX_BODY_SIZE;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX

ln -sfn "$AVAILABLE" "$ENABLED"
nginx -t
systemctl reload nginx

echo "Nginx is proxying $DOMAIN to 127.0.0.1:$APP_PORT"
echo "For HTTPS, run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
