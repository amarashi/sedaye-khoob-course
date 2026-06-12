/* TopNav — overlays the hero, flips to a glass bar on scroll */
const DS = window.SedayeKhoobDesignSystem_7ce729;

function TopNav({ onBuy }) {
  return (
    <header className="nav" id="siteNav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="صدای خوب">
          <strong className="spectrum-text">صدای خوب</strong>
        </a>
        <nav className="nav__links" aria-label="فهرست سایت">
          <a href="#course">دوره</a>
          <a href="#curriculum">سرفصل‌ها</a>
          <a href="#studio">شیوه آموزش</a>
          <a href="#testimonials">نظر هنرجوها</a>
          <a href="#contact">تماس</a>
        </nav>
        <div className="nav__cta">
          <DS.Button variant="gold" size="sm" onClick={onBuy}>خرید دوره</DS.Button>
        </div>
      </div>
    </header>
  );
}

window.TopNav = TopNav;
