const card = document.querySelector("[data-result-card]");
const params = new URLSearchParams(window.location.search);
const orderId = params.get("order");
const paymentStatus = params.get("status");

function render(title, body) {
  if (!card) return;
  card.innerHTML = `<h1>${title}</h1>${body}`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character]);
}

function safeHref(value) {
  try {
    const url = new URL(String(value || ""), window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? escapeHtml(url.href) : "";
  } catch {
    return "";
  }
}

async function loadOrder() {
  if (!orderId) {
    render(
      paymentStatus === "failed" ? "پرداخت ناموفق بود" : "سفارش پیدا نشد",
      "<p>اگر مبلغی از حساب شما کم شده، معمولاً توسط بانک برگشت داده می‌شود. در صورت نیاز با پشتیبانی تماس بگیرید.</p>"
    );
    return;
  }

  try {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: "no-store" });
    const order = await response.json();

    if (!response.ok) throw new Error(order.message || "سفارش پیدا نشد.");

    if (order.status === "licence_issued" && order.licence?.key) {
      const licenceUrl = safeHref(order.licence.url);
      render(
        "پرداخت موفق بود",
        `<p>${escapeHtml(order.fullName)} عزیز، لایسنس اسپات‌پلیر شما صادر شد.</p>
         <dl>
           <div><dt>کد لایسنس</dt><dd>${escapeHtml(order.licence.key)}</dd></div>
           ${licenceUrl ? `<div><dt>لینک دریافت</dt><dd><a href="${licenceUrl}">دانلود فایل لایسنس</a></dd></div>` : ""}
           ${order.paymentRefId ? `<div><dt>کد پیگیری پرداخت</dt><dd>${escapeHtml(order.paymentRefId)}</dd></div>` : ""}
         </dl>`
      );
      return;
    }

    if (["paid", "paid_licence_pending"].includes(order.status)) {
      render(
        "پرداخت ثبت شد",
        "<p>پرداخت شما موفق بوده، اما صدور خودکار لایسنس هنوز کامل نشده است. سفارش ذخیره شده و تیم پشتیبانی می‌تواند آن را پیگیری کند.</p>"
      );
      return;
    }

    render(
      "پرداخت کامل نشد",
      "<p>سفارش پرداخت موفق ندارد. اگر مبلغی از حساب شما کم شده، معمولاً توسط بانک برگشت داده می‌شود.</p>"
    );
  } catch (error) {
    render("خطا در نمایش نتیجه", `<p>${escapeHtml(error.message)}</p>`);
  }
}

loadOrder();
