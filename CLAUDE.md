# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page, Persian/RTL course landing site for "Sedaye Khoob" (صدای خوب) with a checkout that takes orders, hands off to the ZarinPal payment gateway, and auto-issues Spot Player video licences after a verified payment. Plain Node + Express backend, no framework, no build step, no test suite.

## Commands

```bash
npm install          # native better-sqlite3 needs build tools (build-essential/python3 on Linux)
cp .env.example .env # configure before first run
npm start            # node server/index.js -> http://localhost:3000
npm run validate     # syntax-check server JS + assert content/site.json parses (this is the only "test")
npm run build        # alias for validate; CI/deploy gate
```

There is no linter and no automated test runner. `npm run validate` (used by `scripts/linux/build.sh` and `deploy.sh`) is the correctness gate — run it after editing `server/*.js` or `content/site.json`. Node must be `>=18 <24` (`.nvmrc` pins 22; `fetch` is relied on as a global).

## Architecture

The site is rendered **twice** from one source of truth (`content/site.json`), and you must keep both paths consistent:

1. **Server-side render** ([server/content-renderer.js](server/content-renderer.js)): on each `GET /`, the static [index.html](index.html) template is read fresh and `renderIndex()` injects content by rewriting the HTML with regexes — it fills `data-content="<dot.path>"` elements, expands `data-render-list="<key>"` containers, sets SEO `<meta>`/`<title>`/canonical, builds JSON-LD structured data, and toggles whole `<section>`s on/off via each section's `visibility` field. It is **not** a template engine — it edits literal tags, so the attribute/class selectors in the renderer (e.g. `class="orbit-board"`, `name="mobile"`) must match the markup in `index.html` exactly or replacements silently no-op.
2. **Client-side hydration** ([script.js](script.js)): the renderer also embeds the full `site.json` as `<script id="site-content" type="application/json">`. The browser script re-reads that blob to drive interactivity (mobile nav, curriculum module switching, testimonial carousel, checkout form). `script.js` mirrors much of the renderer's mapping logic (the `sectionIds`, `testimonialImages`, `featureIcons` constants appear in **both** files) — when you change one, change the other.

So content edits are data-only (`content/site.json`); structural/markup changes touch `index.html` **and** the matching selector in `content-renderer.js` **and** the hydration in `script.js`.

### Checkout / payment / licence flow ([server/index.js](server/index.js))

Everything is in one file. Orders persist to SQLite at `data/orders.sqlite` (auto-created; WAL mode; schema defined inline, with `ensureColumn` for lightweight migrations). The `orders.status` column is the state machine — key states: `created` → (`manual_review` | `payment_pending`) → `paid` → `licence_issued`, with failure branches `payment_cancelled`, `payment_failed`, `failed`, and the important `paid_licence_pending` (payment captured but licence not issued — never drop these, they represent owed money).

Flow: `POST /api/orders` validates + inserts, then branches on `PAYMENT_PROVIDER`:
- `manual` → order parked in `manual_review`, returns 202 (no gateway configured yet).
- `zarinpal` → `createZarinPalPayment` requests an authority, returns a `paymentUrl` the client redirects to.

`GET /api/payments/zarinpal/callback` verifies the payment (`verifyZarinPalPayment`), marks it `paid`, then calls `issueSpotPlayerLicence` (POST to `panel.spotplayer.ir`), and redirects to `payment-result.html`. [payment-result.js](payment-result.js) polls `GET /api/orders/:id` (which returns the sanitised `publicOrder` shape — never raw DB rows) to show the licence.

To swap payment providers, replace only `createZarinPalPayment`/`verifyZarinPalPayment` and keep the surrounding order + Spot Player flow (see [CHECKOUT_SETUP.md](CHECKOUT_SETUP.md)).

All user-facing checkout/error strings are Persian and live inline in `server/index.js` and `content/site.json`. Mobile numbers are normalised (Persian/Arabic digits → ASCII, `+98`/`0098` → `0`) and must match `^09\d{9}$`.

### Config & secrets

All behaviour is env-driven via `.env` (loaded by `dotenv`); see [.env.example](.env.example) for the full surface. Spot Player issuing is gated behind `SPOTPLAYER_ENABLED` and stays off until course IDs/device limits are confirmed. Admin email notifications activate only when `ADMIN_NOTIFICATION_EMAIL` + `SMTP_HOST` + `SMTP_FROM` are all set. `PUBLIC_BASE_URL` must be the real HTTPS domain in production — it builds the ZarinPal callback URL.

## Operational guardrails

- Never commit `.env`, `data/`, `node_modules/`, or `archive/` (all gitignored). `data/orders.sqlite` is the live order database — back it up, don't delete it.
- There is intentionally **no** unauthenticated admin/order-list endpoint. Inspect orders via SQLite directly.
- Test with `PAYMENT_PROVIDER=manual`, then ZarinPal sandbox (`ZARINPAL_SANDBOX=true`), before going live.
- Deployment is a systemd service + Nginx reverse proxy on a Linux VPS — see [LINUX_DEPLOYMENT.md](LINUX_DEPLOYMENT.md) and `scripts/linux/`.

## design2/

`design2/handoff/` is the Claude Design handoff bundle ("Sedaye Khoob Design System") that the production site's current "night stage" look is implemented from — design tokens, component prototypes, and the `ui_kits/course-website` reference screens. It is reference/design material, not wired into the running app. Production images are served from `assets/` (the `/assets` Express static mount) as WebP; the only PNGs kept there are `hero-logo-cropped.png` (og:image) and `sedayekhubBG.png` (JSON-LD logo), retained as PNG for social/search crawler compatibility. Superseded design material (the old "alt sky" prototype, original PNG art) lives in the untracked `archive/` folder.
