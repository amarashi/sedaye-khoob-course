/* App — composes the site, wires scroll reveals + sticky nav + Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMood": "night",
  "energy": "lively",
  "ctaColor": "#F2C45A"
}/*EDITMODE-END*/;

const CTA_ON = { "#F2C45A": "var(--ink-900)", "#E2503C": "#FFF6F2", "#5B55E8": "#F4F4FF" };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const energyFactor = ({ calm: 0.45, lively: 1, wild: 1.9 })[t.energy] || 1;

  const goCheckout = () => {
    const el = document.getElementById("checkout");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };

  React.useEffect(() => {
    // sticky-nav glass toggle
    const nav = document.getElementById("siteNav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("is-stuck", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // scroll-triggered reveals
    let cleanupReveals = () => {};
    if (window.gsap && window.ScrollTrigger) {
      const g = window.gsap;
      g.registerPlugin(window.ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const els = g.utils.toArray(".reveal");
      if (reduce) {
        g.set(els, { opacity: 1, y: 0 });
      } else {
        els.forEach((el) => {
          g.fromTo(el, { opacity: 0, y: 28 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });
      }
      cleanupReveals = () => window.ScrollTrigger.getAll().forEach((tr) => tr.kill());
    } else {
      document.querySelectorAll(".reveal").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    }

    return () => { window.removeEventListener("scroll", onScroll); cleanupReveals(); };
  }, []);

  const accentVars = {
    "--color-gold": t.ctaColor,
    "--color-gold-hover": `color-mix(in oklch, ${t.ctaColor} 85%, black)`,
    "--on-gold": CTA_ON[t.ctaColor] || "#fff",
    "--shadow-gold": `0 14px 30px color-mix(in oklch, ${t.ctaColor} 38%, transparent)`,
  };

  return (
    <div className={"site" + (t.heroMood === "day" ? " site--day" : "")} style={accentVars}>
      <TopNav onBuy={goCheckout} />
      <Hero onBuy={goCheckout} mood={t.heroMood} energy={energyFactor} />
      <CourseIntro onBuy={goCheckout} />
      <Curriculum />
      <Outcomes />
      <Testimonials />
      <Checkout />
      <SiteFooter />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Mood" value={t.heroMood} options={["night", "day"]}
          onChange={(v) => setTweak("heroMood", v)} />
        <TweakRadio label="Motion energy" value={t.energy} options={["calm", "lively", "wild"]}
          onChange={(v) => setTweak("energy", v)} />
        <TweakSection label="Color" />
        <TweakColor label="CTA color" value={t.ctaColor} options={["#F2C45A", "#E2503C", "#5B55E8"]}
          onChange={(v) => setTweak("ctaColor", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
