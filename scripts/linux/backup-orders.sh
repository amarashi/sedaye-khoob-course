#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/nicevoice}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
DB_FILE="${DB_FILE:-$APP_DIR/data/orders.sqlite}"
STAMP="$(date +%Y%m%d-%H%M%S)"

if [ ! -f "$DB_FILE" ]; then
  echo "Database not found: $DB_FILE" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

if command -v sqlite3 >/dev/null 2>&1; then
  sqlite3 "$DB_FILE" ".backup '$BACKUP_DIR/orders-$STAMP.sqlite'"
else
  cp "$DB_FILE" "$BACKUP_DIR/orders-$STAMP.sqlite"
  [ -f "$DB_FILE-wal" ] && cp "$DB_FILE-wal" "$BACKUP_DIR/orders-$STAMP.sqlite-wal"
  [ -f "$DB_FILE-shm" ] && cp "$DB_FILE-shm" "$BACKUP_DIR/orders-$STAMP.sqlite-shm"
fi

find "$BACKUP_DIR" -type f -name "orders-*.sqlite*" -mtime +14 -delete

echo "Order database backup written to $BACKUP_DIR"
