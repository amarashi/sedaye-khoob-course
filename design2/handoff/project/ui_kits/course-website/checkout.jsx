/* Checkout — course summary + registration form with a fake submit
   that flips to a success state (the brand's payment-result moment). */
const CheckDS = window.SedayeKhoobDesignSystem_7ce729;

function Checkout() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | done
  const [name, setName] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1400);
  };

  return (
    <section className="section section--line" id="checkout" data-screen-label="Checkout">
      <div className="wrap checkout">
        <CheckDS.Card variant="night" className="reveal checkout__summary">
          <CheckDS.Badge tone="night" dot>دوره آنلاین</CheckDS.Badge>
          <h2 style={{ margin: "14px 0 0", color: "var(--on-night)" }}>تئوری موسیقی</h2>
          <p style={{ margin: "16px 0 0", color: "var(--on-night-muted)", lineHeight: 1.8 }}>
            یک مسیر آموزشی متمرکز برای هنرجویان تازه‌کار و موزیسین‌هایی که می‌خواهند پایه‌ها را
            بالاخره روشن و قابل‌استفاده یاد بگیرند.
          </p>
          <div style={{ margin: "22px 0" }}>
            <CheckDS.Checklist tone="gold" boxed items={[
              "دسترسی دائمی به دوره‌ی فعلی",
              "درس‌های ویدیویی و فایل‌های تمرین",
              "طراحی‌شده برای یادگیری با سرعت شخصی",
            ]} />
          </div>
          <p className="meta" style={{ color: "var(--on-night-muted)", lineHeight: 1.7 }}>
            بعد از پرداخت موفق، سفارش ذخیره می‌شود و لایسنس اسپات‌پلیر برای همین شماره‌ی موبایل صادر می‌شود.
          </p>
        </CheckDS.Card>

        <form className="formcard reveal" onSubmit={submit} noValidate>
          {status === "done" ? (
            <div className="formcard__success">
              <div className="formcard__check" aria-hidden="true">✓</div>
              <h2>سفارش ثبت شد</h2>
              <p className="lead" style={{ fontSize: 17 }}>
                {name ? name + " عزیز، " : ""}ثبت‌نام شما کامل شد. لینک دسترسی و لایسنس به‌زودی پیامک می‌شود.
              </p>
              <CheckDS.Button variant="secondary" onClick={() => { setStatus("idle"); setName(""); }}>
                ثبت سفارش دیگر
              </CheckDS.Button>
            </div>
          ) : (
            <>
              <span className="eyebrow">ثبت‌نام و پرداخت</span>
              <h2 style={{ marginTop: 12 }}>از دوره‌ی تئوری موسیقی شروع کنید.</h2>
              <p className="lead" style={{ margin: "14px 0 28px" }}>
                مسیری آنلاین و متمرکز برای یادگیریِ روشن و قابل‌استفاده‌ی پایه‌ها.
              </p>
              <div style={{ display: "grid", gap: 18 }}>
                <CheckDS.TextField label="نام و نام خانوادگی" name="fullName" required autoComplete="name"
                  value={name} onChange={(e) => setName(e.target.value)} />
                <CheckDS.TextField label="شماره موبایل" name="mobile" inputMode="tel" placeholder="09123456789" required />
                <CheckDS.TextField label="ایمیل برای دریافت رسید" name="email" type="email" hint="اختیاری" />
              </div>
              <div style={{ marginTop: 26 }}>
                <CheckDS.Button variant="gold" size="lg" type="submit" style={{ width: "100%" }}
                  disabled={status === "sending"}>
                  {status === "sending" ? "در حال آماده‌سازی پرداخت…" : "ثبت‌نام و پرداخت آنلاین"}
                </CheckDS.Button>
              </div>
              {status === "sending" ? (
                <div className="formcard__msg">در حال انتقال به درگاه پرداخت…</div>
              ) : null}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

window.Checkout = Checkout;
