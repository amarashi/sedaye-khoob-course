# Sedaye Khoob Course

Customer-ready course website for Sedaye Khoob. The front end uses the `design2` visual direction, while the production structure keeps separate HTML, CSS, JavaScript, JSON-managed content, checkout, payment hand-off, order storage, and Spot Player licence automation.

## Setup

Use Node.js 22 LTS, or another Node version matching `>=18 <24`.

```bash
npm install
cp .env.example .env
npm start
```

Open `http://localhost:3000`.

## Content

Most editable site copy lives in `content/site.json`.

- `page` controls SEO metadata.
- `navigation` controls menu labels.
- `course`, `curriculum`, `studio`, `outcomes`, `testimonials`, and `contact` control page sections.
- `checkout` controls the registration/payment copy, benefits, form labels, and user-facing status messages.

## Payment

The checkout form posts to `/api/orders`. The backend stores orders in `data/orders.sqlite`, then either:

- keeps the order in manual review when `PAYMENT_PROVIDER=manual`; or
- redirects to ZarinPal when `PAYMENT_PROVIDER=zarinpal` is configured.

Keep `.env` private. Do not commit `data/` or `node_modules/`.
