/* Footer / contact */
function SiteFooter() {
  const methods = [
    { label: "ایمیل", value: "hello@sedayekhoob.example", href: "mailto:hello@sedayekhoob.example" },
    { label: "پشتیبانی دوره", value: "+61 2 5550 1234", href: "tel:+61255501234" },
    { label: "واتساپ", value: "+61 400 555 019", href: "tel:+61400555019" },
  ];
  return (
    <footer className="foot" id="contact" data-screen-label="Footer">
      <div className="wrap">
        <div className="foot__top reveal">
          <h2>تماس با ما</h2>
          <p className="lead">
            برای پرسش‌های مربوط به ثبت‌نام، محتوای دوره یا همکاری آموزشی می‌توانید از راه‌های
            زیر با تیم صدای خوب در ارتباط باشید.
          </p>
        </div>
        <div className="foot__methods reveal">
          {methods.map((m) => (
            <div key={m.label} className="foot__method">
              <span>{m.label}</span>
              <a href={m.href}>{m.value}</a>
            </div>
          ))}
        </div>
        <div className="foot__bottom">
          <span className="meta">© 2026 صدای خوب</span>
          <span className="meta">ساخته‌شده برای هنرجویانی که موسیقی را واقعی می‌شنوند.</span>
        </div>
      </div>
    </footer>
  );
}

window.SiteFooter = SiteFooter;
