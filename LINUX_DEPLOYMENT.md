# Linux VPS Deployment

This project can run on a small Ubuntu or Debian VPS. It does not need an expensive managed Node host, but it does need a persistent Node.js process, environment variables, writable disk for SQLite orders, and an HTTP reverse proxy.

## Recommended VPS shape

- Ubuntu 22.04/24.04 or Debian 12.
- 1 vCPU and 1 GB RAM is enough for a small course site.
- 10 GB disk or more.
- Root or sudo access.
- A domain pointed to the server IP.

## Server packages

Install Node.js 22.18 or newer, Nginx, Git, and optional SQLite tooling:

```bash
sudo apt update
sudo apt install -y git nginx sqlite3
node --version
```

Node **22.18 or newer is required** — the app stores orders via the built-in `node:sqlite` module, which is only unflagged from 22.13 and only accepts bare named parameters from 22.18. If the distribution package is older, install a current LTS Node.js before continuing.

There are no native modules and no compiler is needed, which matters on an Iranian server: the previous `better-sqlite3` dependency fetched a prebuilt binary from GitHub and fell back to compiling it, and both of those steps are unreliable from inside Iran.

### npm from an Iranian server

`registry.npmjs.org` is frequently unreachable from Iranian networks. If `npm ci` stalls or fails, point npm at a domestic mirror before installing:

```bash
npm config set registry https://mirror.abrha.net/repository/npm/
```

The three remaining dependencies (`express`, `dotenv`, `nodemailer`) are pure JavaScript, so a mirror is all that is needed.

## App setup

Clone or copy the project to the server:

```bash
sudo mkdir -p /var/www
sudo git clone <your-repo-url> /var/www/nicevoice
sudo chown -R "$USER:$USER" /var/www/nicevoice
cd /var/www/nicevoice
```

Create the production environment file:

```bash
sudo cp .env.example .env
sudo nano .env
```

Set at least:

```dotenv
PORT=3000
PUBLIC_BASE_URL=https://example.com
COURSE_PRICE=990000
PAYMENT_PROVIDER=zarinpal
ZARINPAL_MERCHANT_ID=your-merchant-id
ZARINPAL_SANDBOX=false
SPOTPLAYER_ENABLED=true
SPOTPLAYER_API=your-spotplayer-api-key
SPOTPLAYER_MODE=production
SPOTPLAYER_COURSE_IDS=your-course-id
```

Run the local build check:

```bash
bash scripts/linux/build.sh
```

## systemd service

Install the app as a system service:

```bash
sudo APP_DIR=/var/www/nicevoice SERVICE_NAME=nicevoice PORT=3000 bash scripts/linux/install-service.sh
```

Useful commands:

```bash
sudo systemctl status nicevoice
sudo journalctl -u nicevoice -f
sudo systemctl restart nicevoice
```

## Nginx reverse proxy

Point Nginx at the Node process:

```bash
sudo DOMAIN=example.com APP_PORT=3000 SERVICE_NAME=nicevoice bash scripts/linux/configure-nginx.sh
```

Then enable HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Update `.env` so `PUBLIC_BASE_URL` is the HTTPS domain. This is required for the ZarinPal callback URL.

## Deploy updates

After pushing new code:

```bash
cd /var/www/nicevoice
APP_DIR=/var/www/nicevoice SERVICE_NAME=nicevoice BRANCH=main bash scripts/linux/deploy.sh
```

The deploy script pulls the branch, installs production dependencies, validates the Node files and JSON content, then restarts the service.

## Backups

Orders are stored in `data/orders.sqlite`. Back it up regularly:

```bash
APP_DIR=/var/www/nicevoice bash scripts/linux/backup-orders.sh
```

Add a daily cron job:

```bash
sudo crontab -e
```

```cron
15 2 * * * APP_DIR=/var/www/nicevoice /bin/bash /var/www/nicevoice/scripts/linux/backup-orders.sh >> /var/log/nicevoice-backup.log 2>&1
```

Keep an off-server copy of the backups before a launch or major update.

## Notes

- Do not commit `.env`, `data/`, or backups.
- Test with `PAYMENT_PROVIDER=manual` first.
- Test ZarinPal sandbox before production.
- Keep Spot Player disabled until the course IDs and device limits are confirmed.
