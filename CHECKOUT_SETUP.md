# Checkout and Spot Player automation

This project now has a first-stage automated checkout path:

1. The buyer completes the checkout form on the website.
2. The backend saves the order to `data/orders.sqlite`.
3. If `PAYMENT_PROVIDER=zarinpal`, the backend creates a payment request and redirects the buyer to the gateway.
4. The payment gateway returns to `/api/payments/zarinpal/callback`.
5. The backend verifies the payment.
6. After a verified payment, the backend issues a Spot Player licence when Spot Player is enabled.
7. The buyer lands on `payment-result.html` and sees the licence when it was issued.

## Setup

Install dependencies:

```powershell
npm install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Fill in these values in `.env`:

```dotenv
PUBLIC_BASE_URL=https://your-live-domain.example
COURSE_PRICE=990000
PAYMENT_CURRENCY=IRT
PAYMENT_PROVIDER=zarinpal
ZARINPAL_MERCHANT_ID=your-merchant-id
ZARINPAL_SANDBOX=false

SPOTPLAYER_ENABLED=true
SPOTPLAYER_API=your-spotplayer-api-key
SPOTPLAYER_MODE=production
SPOTPLAYER_COURSE_IDS=your-spotplayer-course-id

ADMIN_NOTIFICATION_EMAIL=admin@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=smtp-user
SMTP_PASS=smtp-password
SMTP_FROM="Nicevoice <orders@example.com>"
```

Use sandbox/test values first. Switch to production only after the full payment callback and Spot Player licence flow works end to end.

## Running locally

```powershell
npm start
```

Open:

```text
http://localhost:3000
```

## Important operational notes

- Keep `.env` private. It contains payment and Spot Player secrets.
- Back up `data/orders.sqlite`; it is the order database.
- Admin email notifications are optional. They are enabled only when `ADMIN_NOTIFICATION_EMAIL`, `SMTP_HOST`, and `SMTP_FROM` are set.
- Do not enable Spot Player issuing until the course ID and device limits have been confirmed in the Spot Player panel.
- If a payment is verified but Spot Player issuing fails, the order status becomes `paid_licence_pending` so it can be handled manually without losing the payment record.
- There is intentionally no unauthenticated admin order list. Inspect/export orders directly from SQLite or add an authenticated admin panel later.

## Provider notes

The backend currently implements the ZarinPal-style request/verify flow. If you choose a different Shaparak-connected PSP or پرداخت‌یار, keep the same local order and Spot Player flow and replace only the provider request/verify functions in `server/index.js`.
