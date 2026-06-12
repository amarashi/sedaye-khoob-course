require("dotenv").config();

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const Database = require("better-sqlite3");
const express = require("express");
const nodemailer = require("nodemailer");
const { readContent, renderIndex } = require("./content-renderer");

const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const contentFile = path.join(rootDir, "content", "site.json");
fs.mkdirSync(dataDir, { recursive: true });

const app = express();
const port = Number(process.env.PORT || 3000);
const publicBaseUrl = (process.env.PUBLIC_BASE_URL || `http://localhost:${port}`).replace(/\/+$/, "");
const cacheHeaders = {
  noStore: "no-store",
  shortStatic: "public, max-age=3600",
  publicMetadata: "public, max-age=3600",
  immutableAsset: "public, max-age=2592000, immutable",
};

const config = {
  courseSlug: process.env.COURSE_SLUG || "music-theory",
  courseTitle: process.env.COURSE_TITLE || "دوره تئوری موسیقی",
  amount: Number(process.env.COURSE_PRICE || 0),
  currency: process.env.PAYMENT_CURRENCY || "IRT",
  paymentProvider: (process.env.PAYMENT_PROVIDER || "manual").toLowerCase(),
  zarinpalMerchantId: process.env.ZARINPAL_MERCHANT_ID || "",
  zarinpalSandbox: process.env.ZARINPAL_SANDBOX !== "false",
  spotPlayerEnabled: process.env.SPOTPLAYER_ENABLED === "true",
  spotPlayerApi: process.env.SPOTPLAYER_API || "",
  spotPlayerMode: process.env.SPOTPLAYER_MODE || "test",
  spotPlayerCourseIds: (process.env.SPOTPLAYER_COURSE_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  spotPlayerWatermarkTemplate: process.env.SPOTPLAYER_WATERMARK_TEMPLATE || "{name} | {mobile}",
  spotPlayerDevice: {
    p0: Number(process.env.SPOTPLAYER_ALLOWED_DEVICES || 2),
    p1: Number(process.env.SPOTPLAYER_WINDOWS || 0),
    p2: Number(process.env.SPOTPLAYER_MACOS || 0),
    p3: Number(process.env.SPOTPLAYER_UBUNTU || 0),
    p4: Number(process.env.SPOTPLAYER_ANDROID || 0),
    p5: Number(process.env.SPOTPLAYER_IOS || 0),
    p6: Number(process.env.SPOTPLAYER_WEBAPP || 2),
  },
  adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
  },
};

const mailTransporter = createMailTransporter(config.smtp);

const db = new Database(path.join(dataDir, "orders.sqlite"));
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    status TEXT NOT NULL,
    course_slug TEXT NOT NULL,
    course_title TEXT NOT NULL,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT,
    question TEXT,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    payment_provider TEXT NOT NULL,
    payment_authority TEXT,
    payment_ref_id TEXT,
    payment_raw_json TEXT,
    spotplayer_status TEXT NOT NULL DEFAULT 'not_started',
    spotplayer_license_id TEXT,
    spotplayer_license_key TEXT,
    spotplayer_license_url TEXT,
    error_message TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_orders_payment_authority ON orders(payment_authority);
`);
ensureColumn(db, "orders", "question", "TEXT");

const insertOrder = db.prepare(`
  INSERT INTO orders (
    id, created_at, updated_at, status, course_slug, course_title, full_name, mobile, email, question,
    amount, currency, payment_provider
  )
  VALUES (
    @id, @createdAt, @updatedAt, @status, @courseSlug, @courseTitle, @fullName, @mobile, @email, @question,
    @amount, @currency, @paymentProvider
  )
`);

const getOrder = db.prepare("SELECT * FROM orders WHERE id = ?");
const getOrderByAuthority = db.prepare("SELECT * FROM orders WHERE payment_authority = ?");

const updateOrder = db.prepare(`
  UPDATE orders
  SET updated_at = @updatedAt,
      status = COALESCE(@status, status),
      payment_authority = COALESCE(@paymentAuthority, payment_authority),
      payment_ref_id = COALESCE(@paymentRefId, payment_ref_id),
      payment_raw_json = COALESCE(@paymentRawJson, payment_raw_json),
      spotplayer_status = COALESCE(@spotPlayerStatus, spotplayer_status),
      spotplayer_license_id = COALESCE(@spotPlayerLicenseId, spotplayer_license_id),
      spotplayer_license_key = COALESCE(@spotPlayerLicenseKey, spotplayer_license_key),
      spotplayer_license_url = COALESCE(@spotPlayerLicenseUrl, spotplayer_license_url),
      error_message = @errorMessage
  WHERE id = @id
`);

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

app.use(
  "/assets",
  express.static(path.join(rootDir, "assets"), {
    dotfiles: "ignore",
    maxAge: "30d",
    immutable: true,
    setHeaders: (response) => {
      response.setHeader("Cache-Control", cacheHeaders.immutableAsset);
    },
  })
);

app.get("/favicon.ico", (_request, response) => {
  response.set("Cache-Control", cacheHeaders.shortStatic);
  response.status(204).end();
});

app.get("/robots.txt", (_request, response) => {
  response
    .set("Cache-Control", cacheHeaders.publicMetadata)
    .type("text/plain")
    .send([
      "User-agent: *",
      "Allow: /",
      `Sitemap: ${publicBaseUrl}/sitemap.xml`,
      "",
    ].join("\n"));
});

app.get("/sitemap.xml", (_request, response) => {
  response
    .set("Cache-Control", cacheHeaders.publicMetadata)
    .type("application/xml")
    .send(buildSitemapXml(publicBaseUrl, latestPublicModifiedDate()));
});

app.get(["/", "/index.html"], (_request, response) => {
  try {
    const template = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
    const content = readContent(contentFile);
    response.set("Cache-Control", cacheHeaders.noStore);
    response.type("html").send(renderIndex(template, content, { publicBaseUrl, course: config }));
  } catch (error) {
    response.status(500).send(`Content render failed: ${error.message}`);
  }
});

for (const fileName of ["styles.css", "script.js", "payment-result.js"]) {
  app.get(`/${fileName}`, (_request, response) => {
    response.set("Cache-Control", cacheHeaders.shortStatic);
    response.sendFile(path.join(rootDir, fileName));
  });
}

app.get("/payment-result.html", (_request, response) => {
  response.set("Cache-Control", cacheHeaders.noStore);
  response.sendFile(path.join(rootDir, "payment-result.html"));
});

app.use("/api", (_request, response, next) => {
  response.set("Cache-Control", cacheHeaders.noStore);
  next();
});

app.get("/api/content", (_request, response) => {
  fs.readFile(contentFile, "utf8", (error, text) => {
    if (error) {
      return response.status(500).json({ message: "Content file could not be read." });
    }

    try {
      JSON.parse(text);
    } catch {
      return response.status(500).json({ message: "Content file is not valid JSON." });
    }

    response.type("application/json").send(text);
  });
});

app.post("/api/orders", async (request, response) => {
  const parsed = parseOrderRequest(request.body);
  if (!parsed.ok) {
    return response.status(400).json({ message: parsed.message });
  }

  const now = new Date().toISOString();
  const order = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "created",
    courseSlug: config.courseSlug,
    courseTitle: config.courseTitle,
    fullName: parsed.data.fullName,
    mobile: parsed.data.mobile,
    email: parsed.data.email,
    question: parsed.data.question,
    amount: config.amount,
    currency: config.currency,
    paymentProvider: config.paymentProvider,
  };

  insertOrder.run(order);

  if (config.paymentProvider === "manual") {
    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: "manual_review",
      paymentAuthority: null,
      paymentRefId: null,
      paymentRawJson: null,
      spotPlayerStatus: "not_started",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: "Payment provider is not configured.",
    });

    notifyAdminOrderEvent("New manual-review order", getOrder.get(order.id));

    return response.status(202).json({
      orderId: order.id,
      message: "سفارش ثبت شد، اما درگاه پرداخت هنوز فعال نشده است. لطفاً برای فعال‌سازی خرید آنلاین با پشتیبانی تماس بگیرید.",
    });
  }

  if (config.paymentProvider !== "zarinpal") {
    markOrderFailed(order.id, `Unsupported payment provider: ${config.paymentProvider}`);
    notifyAdminOrderEvent("Order failed", getOrder.get(order.id));
    return response.status(500).json({ message: "درگاه پرداخت به‌درستی تنظیم نشده است." });
  }

  try {
    const payment = await createZarinPalPayment(order);

    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: "payment_pending",
      paymentAuthority: payment.authority,
      paymentRefId: null,
      paymentRawJson: JSON.stringify(payment.raw),
      spotPlayerStatus: "not_started",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: null,
    });

    notifyAdminOrderEvent("New payment-pending order", getOrder.get(order.id));

    return response.json({ orderId: order.id, paymentUrl: payment.paymentUrl });
  } catch (error) {
    markOrderFailed(order.id, error.message);
    notifyAdminOrderEvent("Order payment request failed", getOrder.get(order.id));
    return response.status(502).json({
      orderId: order.id,
      message: "درگاه پرداخت پاسخ نداد. لطفاً چند دقیقه بعد دوباره تلاش کنید.",
    });
  }
});

app.get("/api/payments/zarinpal/callback", async (request, response) => {
  const authority = String(request.query.Authority || request.query.authority || "");
  const providerStatus = String(request.query.Status || request.query.status || "");
  const order = authority ? getOrderByAuthority.get(authority) : null;
  let paymentVerified = false;

  if (!order) {
    return response.redirect("/payment-result.html?status=failed");
  }

  // Idempotency: a refreshed/retried callback must not re-verify or re-issue a licence.
  // ZarinPal returns code 101 ("already verified") on replay, which would otherwise
  // fall through and request a second Spot Player licence for an already-paid order.
  if (["paid", "paid_licence_pending", "licence_issued"].includes(order.status)) {
    return response.redirect(`/payment-result.html?status=success&order=${encodeURIComponent(order.id)}`);
  }

  if (providerStatus.toUpperCase() !== "OK") {
    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: "payment_cancelled",
      paymentAuthority: null,
      paymentRefId: null,
      paymentRawJson: JSON.stringify({ callback: request.query }),
      spotPlayerStatus: "not_started",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: "Payment was cancelled or rejected by the gateway.",
    });
    notifyAdminOrderEvent("Payment cancelled", getOrder.get(order.id));
    return response.redirect(`/payment-result.html?status=failed&order=${encodeURIComponent(order.id)}`);
  }

  try {
    const verification = await verifyZarinPalPayment(order, authority);
    paymentVerified = true;
    const referenceId = verification.data?.ref_id ? String(verification.data.ref_id) : "";

    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: "paid",
      paymentAuthority: authority,
      paymentRefId: referenceId,
      paymentRawJson: JSON.stringify(verification),
      spotPlayerStatus: "pending",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: null,
    });

    const paidOrder = getOrder.get(order.id);
    await issueSpotPlayerLicence(paidOrder);
    notifyAdminOrderEvent("Payment verified", getOrder.get(order.id));

    return response.redirect(`/payment-result.html?status=success&order=${encodeURIComponent(order.id)}`);
  } catch (error) {
    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: paymentVerified ? "paid_licence_pending" : "payment_failed",
      paymentAuthority: authority,
      paymentRefId: null,
      paymentRawJson: null,
      spotPlayerStatus: paymentVerified ? "failed" : "not_started",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: error.message,
    });

    notifyAdminOrderEvent(paymentVerified ? "Paid order needs licence review" : "Payment verification failed", getOrder.get(order.id));

    return response.redirect(`/payment-result.html?status=failed&order=${encodeURIComponent(order.id)}`);
  }
});

app.get("/api/orders/:id", (request, response) => {
  const order = getOrder.get(request.params.id);
  if (!order) {
    return response.status(404).json({ message: "سفارش پیدا نشد." });
  }

  response.json(publicOrder(order));
});

app.listen(port, () => {
  console.log(`Checkout server listening on ${publicBaseUrl}`);
});

function parseOrderRequest(body) {
  body = body || {};
  const fullName = clean(body.fullName);
  const mobile = normaliseMobile(body.mobile);
  const email = clean(body.email).toLowerCase();
  const question = clean(body.question);

  if (clean(body.course) && clean(body.course) !== config.courseSlug) {
    return { ok: false, message: "دوره انتخاب‌شده معتبر نیست." };
  }

  if (fullName.length < 2 || fullName.length > 120) {
    return { ok: false, message: "لطفاً نام و نام خانوادگی را وارد کنید." };
  }

  if (!/^09\d{9}$/.test(mobile)) {
    return { ok: false, message: "لطفاً شماره موبایل را با فرمت 09123456789 وارد کنید." };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "فرمت ایمیل درست نیست." };
  }

  if (question.length > 1000) {
    return { ok: false, message: "متن پرسش طولانی است." };
  }

  return { ok: true, data: { fullName, mobile, email: email || null, question: question || null } };
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function ensureColumn(database, tableName, columnName, definition) {
  const columns = database.prepare(`PRAGMA table_info(${tableName})`).all();
  if (columns.some((column) => column.name === columnName)) return;
  database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
}

function createMailTransporter(smtpConfig) {
  if (!config.adminNotificationEmail || !smtpConfig.host || !smtpConfig.from) {
    return null;
  }

  const options = {
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
  };

  if (smtpConfig.user || smtpConfig.pass) {
    options.auth = {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    };
  }

  return nodemailer.createTransport(options);
}

function notifyAdminOrderEvent(eventName, order) {
  if (!mailTransporter || !order) {
    return;
  }

  const shortId = order.id.slice(0, 8);
  const subject = `[Nicevoice] ${eventName}: ${shortId}`;
  const text = buildAdminOrderNotificationText(eventName, order);

  mailTransporter
    .sendMail({
      from: config.smtp.from,
      to: config.adminNotificationEmail,
      subject,
      text,
    })
    .catch((error) => {
      console.error(`Admin order notification failed for ${order.id}: ${error.message}`);
    });
}

function buildAdminOrderNotificationText(eventName, order) {
  const resultUrl = `${publicBaseUrl}/payment-result.html?order=${encodeURIComponent(order.id)}`;
  return [
    eventName,
    "",
    `Order ID: ${order.id}`,
    `Status: ${order.status}`,
    `Created: ${order.created_at}`,
    `Updated: ${order.updated_at}`,
    "",
    `Course: ${order.course_title} (${order.course_slug})`,
    `Amount: ${order.amount} ${order.currency}`,
    `Payment provider: ${order.payment_provider}`,
    order.payment_ref_id ? `Payment reference: ${order.payment_ref_id}` : null,
    "",
    `Name: ${order.full_name}`,
    `Mobile: ${order.mobile}`,
    `Email: ${order.email || "not provided"}`,
    `Question: ${order.question || "not provided"}`,
    "",
    `Spot Player status: ${order.spotplayer_status}`,
    order.spotplayer_license_id ? `Spot Player licence ID: ${order.spotplayer_license_id}` : null,
    order.spotplayer_license_url ? `Spot Player licence URL: ${order.spotplayer_license_url}` : null,
    order.error_message ? `Error: ${order.error_message}` : null,
    "",
    `Result page: ${resultUrl}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function normaliseMobile(value) {
  let mobile = normaliseDigits(value).replace(/[\s\-()]/g, "");
  if (mobile.startsWith("+98")) mobile = `0${mobile.slice(3)}`;
  if (mobile.startsWith("0098")) mobile = `0${mobile.slice(4)}`;
  return mobile;
}

function normaliseDigits(value) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return String(value || "").replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persian.indexOf(digit);
    if (persianIndex >= 0) return String(persianIndex);
    return String(arabic.indexOf(digit));
  });
}

async function createZarinPalPayment(order) {
  ensureZarinPalConfig();

  const endpoint = config.zarinpalSandbox
    ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
    : "https://api.zarinpal.com/pg/v4/payment/request.json";

  const callbackUrl = `${publicBaseUrl}/api/payments/zarinpal/callback`;
  const payload = {
    merchant_id: config.zarinpalMerchantId,
    amount: order.amount,
    currency: order.currency,
    callback_url: callbackUrl,
    description: `${order.courseTitle} - ${order.fullName}`,
    metadata: {
      mobile: order.mobile,
      email: order.email || undefined,
      order_id: order.id,
    },
  };

  const result = await postJson(endpoint, payload);
  const authority = result.data?.authority;
  const code = Number(result.data?.code);
  if (code !== 100 || !authority) {
    throw new Error(`ZarinPal payment request failed: ${JSON.stringify(result.errors || result)}`);
  }

  return {
    authority,
    paymentUrl: `${config.zarinpalSandbox ? "https://sandbox.zarinpal.com" : "https://www.zarinpal.com"}/pg/StartPay/${authority}`,
    raw: result,
  };
}

async function verifyZarinPalPayment(order, authority) {
  ensureZarinPalConfig();

  const endpoint = config.zarinpalSandbox
    ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
    : "https://api.zarinpal.com/pg/v4/payment/verify.json";

  const result = await postJson(endpoint, {
    merchant_id: config.zarinpalMerchantId,
    amount: order.amount,
    authority,
  });

  const code = Number(result.data?.code);
  if (code !== 100 && code !== 101) {
    throw new Error(`ZarinPal payment verification failed: ${JSON.stringify(result.errors || result)}`);
  }

  return result;
}

function ensureZarinPalConfig() {
  if (!config.zarinpalMerchantId) {
    throw new Error("ZARINPAL_MERCHANT_ID is missing.");
  }
  if (!Number.isInteger(config.amount) || config.amount <= 0) {
    throw new Error("COURSE_PRICE must be a positive integer in the selected payment currency.");
  }
}

async function issueSpotPlayerLicence(order) {
  if (!config.spotPlayerEnabled) {
    updateOrder.run({
      id: order.id,
      updatedAt: new Date().toISOString(),
      status: "paid_licence_pending",
      paymentAuthority: null,
      paymentRefId: null,
      paymentRawJson: null,
      spotPlayerStatus: "disabled",
      spotPlayerLicenseId: null,
      spotPlayerLicenseKey: null,
      spotPlayerLicenseUrl: null,
      errorMessage: "Spot Player issuing is disabled.",
    });
    return;
  }

  if (!config.spotPlayerApi || config.spotPlayerCourseIds.length === 0) {
    throw new Error("SPOTPLAYER_API and SPOTPLAYER_COURSE_IDS are required before issuing licences.");
  }

  const watermarkText = config.spotPlayerWatermarkTemplate
    .replaceAll("{name}", order.full_name)
    .replaceAll("{mobile}", order.mobile)
    .replaceAll("{email}", order.email || "");

  const result = await spotPlayerRequest("https://panel.spotplayer.ir/license/edit/", {
    test: config.spotPlayerMode === "test",
    name: order.full_name,
    course: config.spotPlayerCourseIds,
    watermark: { texts: [{ text: watermarkText }] },
    device: config.spotPlayerDevice,
    payload: JSON.stringify({ orderId: order.id, mobile: order.mobile, email: order.email }),
  });

  updateOrder.run({
    id: order.id,
    updatedAt: new Date().toISOString(),
    status: "licence_issued",
    paymentAuthority: null,
    paymentRefId: null,
    paymentRawJson: null,
    spotPlayerStatus: "issued",
    spotPlayerLicenseId: result._id || null,
    spotPlayerLicenseKey: result.key || null,
    spotPlayerLicenseUrl: result.url || null,
    errorMessage: null,
  });
}

async function spotPlayerRequest(url, payload) {
  const result = await postJson(url, payload, {
    "$API": config.spotPlayerApi,
    "$LEVEL": "-1",
  });

  if (result?.ex?.msg) {
    throw new Error(`Spot Player error: ${result.ex.msg}`);
  }

  return result;
}

async function postJson(url, payload, extraHeaders = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify(removeUndefined(payload)),
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}: ${text}`);
  }

  return json;
}

function removeUndefined(value) {
  return JSON.parse(JSON.stringify(value));
}

function markOrderFailed(id, message) {
  updateOrder.run({
    id,
    updatedAt: new Date().toISOString(),
    status: "failed",
    paymentAuthority: null,
    paymentRefId: null,
    paymentRawJson: null,
    spotPlayerStatus: "not_started",
    spotPlayerLicenseId: null,
    spotPlayerLicenseKey: null,
    spotPlayerLicenseUrl: null,
    errorMessage: message,
  });
}

function buildSitemapXml(baseUrl, lastModifiedDate) {
  const homepage = `${baseUrl}/`;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${escapeXml(homepage)}</loc>`,
    `    <lastmod>${escapeXml(lastModifiedDate)}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    "  </url>",
    "</urlset>",
    "",
  ].join("\n");
}

function latestPublicModifiedDate() {
  const files = [
    path.join(rootDir, "index.html"),
    path.join(rootDir, "styles.css"),
    path.join(rootDir, "script.js"),
    contentFile,
  ];

  const latest = files.reduce((time, file) => {
    try {
      return Math.max(time, fs.statSync(file).mtime.getTime());
    } catch {
      return time;
    }
  }, 0);

  return new Date(latest || Date.now()).toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function publicOrder(order) {
  const paid = ["paid", "paid_licence_pending", "licence_issued"].includes(order.status);
  return {
    id: order.id,
    status: order.status,
    courseTitle: order.course_title,
    fullName: order.full_name,
    mobile: order.mobile,
    amount: order.amount,
    currency: order.currency,
    paymentRefId: order.payment_ref_id,
    spotPlayerStatus: order.spotplayer_status,
    licence: paid
      ? {
          id: order.spotplayer_license_id,
          key: order.spotplayer_license_key,
          url: order.spotplayer_license_url,
        }
      : null,
    errorMessage: order.error_message,
  };
}
