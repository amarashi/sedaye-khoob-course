/* Hero — the spotlight is on the calligraphic wordmark itself: giant
   gradient logo center-stage, conductor + instrument orbs as supporting
   cast at the edges. GSAP entrance + energy-scaled float/parallax. */
const HeroDS = window.SedayeKhoobDesignSystem_7ce729;

function Hero({ onBuy, mood = "night", energy = 1 }) {
  const root = React.useRef(null);

  React.useEffect(() => {
    if (!window.gsap || !root.current) return;
    const g = window.gsap;
    const E = energy;
    const ctx = g.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        g.set(".hero [data-anim], .hero .orb, .hero .cast__maestro", { opacity: 1, y: 0, scale: 1 });
        return;
      }
      const tl = g.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero__spot", { opacity: 0, scale: 0.6, duration: 1.1, ease: "power2.out" })
        .from(".nav__inner", { y: -24, opacity: 0, duration: 0.6 }, 0.1)
        .from("[data-anim='logo']", { y: 50 * E, opacity: 0, scale: 0.9, duration: 1.05, ease: "power3.out" }, 0.25)
        .from("[data-anim='line']", { y: 28, opacity: 0, duration: 0.65, stagger: 0.12 }, 0.7)
        .from("[data-anim='lead']", { y: 18, opacity: 0, duration: 0.55 }, 0.9)
        .from("[data-anim='cta'] > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, 1.0)
        .from("[data-anim='stat']", { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 }, 1.1)
        .from(".cast__maestro", { y: 60, opacity: 0, duration: 0.9, ease: "power2.out" }, 0.6)
        .from(".cast__podium", { scale: 0.3, opacity: 0, duration: 0.8 }, 0.75)
        .from(".orb", { scale: 0, opacity: 0, duration: 0.7, stagger: 0.14, ease: `back.out(${1.2 + E * 0.6})` }, 0.8)
        .from(".orb__note", { opacity: 0, scale: 0.4, duration: 0.6, stagger: 0.1 }, 1.0);

      // perpetual float — amplitude scales with energy
      g.utils.toArray(".orb").forEach((orb, i) => {
        g.to(orb, { y: `+=${10 + 8 * E}`, rotation: (i % 2 ? 3 : -3) * E, duration: (3 + i * 0.4) / Math.max(E, 0.35), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3 });
      });
      g.to(".cast__maestro", { y: `-=${8 * E}`, duration: 4 / Math.max(E, 0.35), repeat: -1, yoyo: true, ease: "sine.inOut" });
      g.to("[data-anim='logo']", { y: `-=${6 * E}`, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4 });

      // pointer parallax — strength scales with energy
      const hero = root.current;
      const layers = g.utils.toArray(".hero [data-depth]");
      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        layers.forEach((el) => {
          const d = parseFloat(el.dataset.depth) * E;
          g.to(el, { x: -dx * 36 * d, y: -dy * 26 * d, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }, root);
    return () => ctx.revert();
  }, [energy]);

  const nightGhost = mood === "day"
    ? { color: "var(--color-ink)", border: "1.5px solid var(--color-border-strong)" }
    : { color: "var(--on-night)", border: "1.5px solid color-mix(in oklch, var(--on-night) 30%, transparent)" };

  return (
    <section className={"hero" + (mood === "day" ? " hero--day" : "")} id="top" ref={root} data-screen-label="Hero">
      <div className="hero__spot" aria-hidden="true"></div>
      <div className="hero__texture" aria-hidden="true"></div>

      <div className="hero__cast" aria-hidden="true">
        <span className="orb__note orb__note--1" data-depth="2.4">♪</span>
        <span className="orb__note orb__note--2" data-depth="1.8">♫</span>
        <span className="orb__note orb__note--3" data-depth="2.9">♬</span>
        <span className="orb__note orb__note--4" data-depth="1.4">♩</span>
        <span className="orb__note orb__note--5" data-depth="2.1">♪</span>
        <span className="orb__note orb__note--6" data-depth="3.2">♫</span>
        <span className="orb__note orb__note--7" data-depth="1.6">♪</span>
      </div>

      <div className="hero__inner">
        <img className="hero__logo" data-anim="logo" data-depth="0.25"
          src="../../assets/design/sedayekhubBG.png" alt="صدای خوب" />
        <div className="hero__copy">
          <h1 className="hero__title">
            <span data-anim="line">تئوری موسیقی، </span>
            <span data-anim="line" className="spectrum-text">شبیهِ تجربه‌ی نواختن.</span>
          </h1>
          <p className="hero__lead" data-anim="lead">
            صدا، فاصله، گام و آکورد را با درس‌های کوتاه و تمرین‌های شنیداری یاد بگیر —
            با آرامش، اعتمادبه‌نفس و گوشی که موسیقی را واقعی می‌شنود.
          </p>
          <div className="hero__cta" data-anim="cta">
            <HeroDS.Button variant="gold" size="lg" onClick={onBuy}>خرید دوره تئوری موسیقی</HeroDS.Button>
            <HeroDS.Button variant="ghost" size="lg" arrow style={nightGhost} href="#curriculum">دیدن درس‌ها</HeroDS.Button>
          </div>
          <div className="hero__stats">
            <div className="hero__stat" data-anim="stat"><b>۱۲</b><span>فصل آموزشی</span></div>
            <div className="hero__stat" data-anim="stat"><b>۴۸</b><span>تمرین کوتاه</span></div>
            <div className="hero__stat" data-anim="stat"><b>۹۰</b><span>دقیقه مثال شنیداری</span></div>
          </div>
        </div>

        <div className="hero__orchestra" aria-hidden="true">
          <div className="orb orb--a" data-depth="1.5"><img src="../../assets/design/ostad-piano.png" alt="" /></div>
          <div className="orb orb--b" data-depth="2.1"><img src="../../assets/design/ostad-daf.png" alt="" /></div>
          <div className="orb orb--c" data-depth="1.2"><img src="../../assets/design/ostad-tar.png" alt="" /></div>
          <div className="cast__podium" data-depth="0.3"></div>
          <img className="cast__maestro" src="../../assets/design/maestro-conductor.png" alt="" data-depth="0.7" />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
