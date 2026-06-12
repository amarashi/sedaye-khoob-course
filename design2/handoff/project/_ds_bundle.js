/* @ds-bundle: {"format":3,"namespace":"SedayeKhoobDesignSystem_7ce729","components":[{"name":"Badge","sourcePath":"components/badges/Badge.jsx"},{"name":"Pill","sourcePath":"components/badges/Pill.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"Checklist","sourcePath":"components/cards/Checklist.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"InstrumentOrb","sourcePath":"components/media/InstrumentOrb.jsx"},{"name":"Testimonial","sourcePath":"components/media/Testimonial.jsx"}],"sourceHashes":{"components/badges/Badge.jsx":"e9af4cc718e5","components/badges/Pill.jsx":"f8377c79174a","components/buttons/Button.jsx":"8d79979c9a8f","components/cards/Card.jsx":"bdd923c56338","components/cards/Checklist.jsx":"4d9591cc7732","components/forms/TextField.jsx":"364708676da5","components/media/InstrumentOrb.jsx":"929382a69562","components/media/Testimonial.jsx":"32131c19b1ec","ui_kits/course-website/app.jsx":"a7de2399fbda","ui_kits/course-website/checkout.jsx":"be22ed8b9a22","ui_kits/course-website/footer.jsx":"23670bd2a065","ui_kits/course-website/hero.jsx":"0fe5b0d16b97","ui_kits/course-website/nav.jsx":"949cc4e90ca8","ui_kits/course-website/sections.jsx":"86b1996d67fa","ui_kits/course-website/testimonials.jsx":"ceb09f18eed1","ui_kits/course-website/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SedayeKhoobDesignSystem_7ce729 = window.SedayeKhoobDesignSystem_7ce729 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badges/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Badge
 * A compact kicker/label pill. Used as the "دوره آنلاین" price kicker,
 * section eyebrows, and status chips.
 */
function Badge({
  children,
  tone = "indigo",
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    indigo: {
      color: "var(--indigo-700)",
      background: "var(--indigo-50)",
      borderColor: "color-mix(in oklch, var(--indigo-400) 30%, transparent)"
    },
    crimson: {
      color: "var(--crimson-700)",
      background: "var(--crimson-50)",
      borderColor: "color-mix(in oklch, var(--crimson-500) 30%, transparent)"
    },
    gold: {
      color: "var(--on-gold)",
      background: "var(--gold-100)",
      borderColor: "color-mix(in oklch, var(--gold-500) 42%, transparent)"
    },
    night: {
      color: "var(--on-night)",
      background: "color-mix(in oklch, var(--color-night) 86%, white)",
      borderColor: "color-mix(in oklch, var(--on-night) 22%, transparent)"
    },
    neutral: {
      color: "var(--color-muted)",
      background: "var(--color-surface-2)",
      borderColor: "var(--color-border)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "sk-badge",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      minHeight: 30,
      padding: "5px 13px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid transparent",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      fontWeight: "var(--fw-bold)",
      lineHeight: 1,
      ...tones[tone],
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "currentColor",
      opacity: 0.85
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Badge.jsx", error: String((e && e.message) || e) }); }

// components/badges/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Pill
 * A tappable capsule used for quick-nav links and feature tags. The
 * `active` gold pill is the brand's signature hero-nav highlight.
 */
function Pill({
  children,
  active = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    padding: "9px 22px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid var(--color-border)",
    background: "color-mix(in oklch, var(--color-surface) 72%, transparent)",
    color: "var(--color-muted)",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: "var(--fw-semibold)",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)"
  };
  const activeStyle = active ? {
    background: "var(--color-gold)",
    borderColor: "var(--color-gold)",
    color: "var(--on-gold)",
    boxShadow: "var(--shadow-gold)"
  } : {};
  const composed = {
    ...base,
    ...activeStyle,
    ...style
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "sk-pill",
    href: href,
    onClick: onClick,
    style: composed
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Pill.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Button
 * The brand's pill-shaped action. `gold` is the high-energy hero CTA;
 * `primary` is the indigo workhorse; `secondary` is an outline; `ghost`
 * is text-only. Arrow points start-ward (RTL-aware via a logical glyph).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  iconStart = null,
  disabled = false,
  type = "button",
  href,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      minHeight: 38,
      padding: "7px 20px",
      fontSize: 13
    },
    md: {
      minHeight: 46,
      padding: "11px 26px",
      fontSize: 15
    },
    lg: {
      minHeight: 56,
      padding: "15px 36px",
      fontSize: 17
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    border: "1.5px solid transparent",
    borderRadius: "var(--radius-pill)",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--fw-bold)",
    letterSpacing: 0,
    lineHeight: 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
    ...sizes[size]
  };
  const variants = {
    gold: {
      color: "var(--on-gold)",
      background: "var(--color-gold)",
      borderColor: "var(--color-gold)",
      boxShadow: "var(--shadow-gold)"
    },
    primary: {
      color: "var(--on-primary)",
      background: "var(--color-primary)",
      borderColor: "var(--color-primary)",
      boxShadow: "var(--shadow-sm)"
    },
    secondary: {
      color: "var(--color-ink)",
      background: "var(--color-surface)",
      borderColor: "var(--color-border-strong)"
    },
    ghost: {
      color: "var(--color-primary)",
      background: "transparent",
      borderColor: "transparent"
    }
  };
  const cls = `sk-btn sk-btn--${variant}`;
  const composed = {
    ...base,
    ...variants[variant],
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, iconStart, /*#__PURE__*/React.createElement("span", null, children), arrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-block"
    }
  }, "\u2190") : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href,
      style: composed,
      onClick: onClick
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    disabled: disabled,
    style: composed,
    onClick: onClick
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Card
 * The brand's stadium-radius surface. `night` flips to the deep-indigo
 * surface; `spectrum` adds a gradient top edge. Soft indigo-tinted shadow.
 */
function Card({
  children,
  variant = "surface",
  pad = "lg",
  className,
  style,
  ...rest
}) {
  const pads = {
    sm: 20,
    md: 28,
    lg: "clamp(26px, 4vw, 44px)"
  };
  const variants = {
    surface: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-md)"
    },
    raised: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-lg)"
    },
    night: {
      background: "linear-gradient(150deg, var(--color-night) 0%, var(--color-night-2) 100%)",
      color: "var(--on-night)",
      border: "1px solid color-mix(in oklch, var(--indigo-400) 30%, transparent)",
      boxShadow: "var(--shadow-lg)"
    },
    spectrum: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-md)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `sk-card sk-card--${variant}` + (className ? " " + className : ""),
    style: {
      position: "relative",
      borderRadius: "var(--radius-stadium)",
      padding: pads[pad],
      overflow: "hidden",
      ...variants[variant],
      ...style
    }
  }, rest), variant === "spectrum" ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      insetInline: 0,
      top: 0,
      height: 5,
      background: "var(--brand-spectrum-rtl)"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/Checklist.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Checklist
 * The benefit/feature list with circular check marks. `tone` colours the
 * check chip; on dark cards pass tone="gold".
 */
function Checklist({
  items = [],
  tone = "crimson",
  boxed = false,
  style,
  ...rest
}) {
  const tones = {
    crimson: {
      bg: "var(--color-accent)",
      fg: "var(--on-accent)"
    },
    indigo: {
      bg: "var(--color-primary)",
      fg: "var(--on-primary)"
    },
    gold: {
      bg: "var(--color-gold)",
      fg: "var(--on-gold)"
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: "sk-checklist",
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gap: boxed ? 10 : 14,
      ...style
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "28px 1fr",
      gap: 12,
      alignItems: boxed ? "center" : "start",
      color: "inherit",
      ...(boxed ? {
        minHeight: 44,
        padding: "8px 12px",
        borderRadius: "var(--radius-sm)",
        background: "color-mix(in oklch, var(--color-surface) 70%, transparent)",
        border: "1px solid color-mix(in oklch, var(--color-border) 70%, transparent)"
      } : {})
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: t.bg,
      color: t.fg,
      fontWeight: 800,
      fontSize: 15,
      boxShadow: "var(--shadow-xs)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.5
    }
  }, item))));
}
Object.assign(__ds_scope, { Checklist });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Checklist.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — TextField
 * Labelled input on the brand's rounded "stadium-lite" field. Pairs a
 * muted label above a soft-bordered control that lights up indigo on focus.
 */
function TextField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  defaultValue,
  required = false,
  inputMode,
  autoComplete,
  hint,
  onChange,
  style,
  ...rest
}) {
  const fieldId = id || name;
  return /*#__PURE__*/React.createElement("div", {
    className: "sk-field",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      color: "var(--color-muted)",
      fontSize: 14
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-accent)",
      marginInlineStart: 4
    }
  }, "*") : null) : null, /*#__PURE__*/React.createElement("input", _extends({
    className: "sk-input",
    id: fieldId,
    name: name,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    required: required,
    inputMode: inputMode,
    autoComplete: autoComplete,
    onChange: onChange,
    style: {
      width: "100%",
      minHeight: 52,
      padding: "13px 18px",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      background: "var(--color-bg)",
      color: "var(--color-ink)",
      outline: "none",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)"
    }
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-faint)",
      fontSize: 12
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/media/InstrumentOrb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — InstrumentOrb
 * The signature circular "spotlight" that frames an ostad / instrument
 * illustration on a soft radial glow, with an optional float animation
 * and a title + caption beneath. Used across the curriculum & outcomes.
 */
function InstrumentOrb({
  src,
  alt = "",
  title,
  caption,
  size = 220,
  float = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: "sk-orb",
    style: {
      margin: 0,
      textAlign: "center",
      width: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      margin: "0 auto",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      isolation: "isolate",
      background: "radial-gradient(circle at 50% 36%, rgba(255,255,255,0.95), color-mix(in oklch, var(--color-surface) 84%, var(--color-accent-soft)) 62%, color-mix(in oklch, var(--indigo-200) 40%, var(--color-surface)))",
      border: "1px solid color-mix(in oklch, var(--color-border) 76%, var(--color-surface))",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: "15%",
      borderRadius: "50%",
      border: "1px solid color-mix(in oklch, var(--color-accent) 32%, transparent)",
      transform: "rotate(-10deg)",
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: float ? "sk-orb-float" : undefined,
    style: {
      position: "relative",
      zIndex: 1,
      width: "86%",
      height: "86%",
      objectFit: "contain",
      filter: "drop-shadow(0 16px 16px color-mix(in oklch, var(--ink-900) 16%, transparent))"
    }
  })), title ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 16,
      fontFamily: "var(--font-display)",
      fontWeight: 640,
      fontSize: 20
    }
  }, title) : null, caption ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--color-muted)",
      fontSize: 14
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { InstrumentOrb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/InstrumentOrb.jsx", error: String((e && e.message) || e) }); }

// components/media/Testimonial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sedaye Khoob — Testimonial
 * A student quote card: large quote, author + role footer with an accent
 * tick, and an optional illustration tucked to the side. `accent` recolors
 * the tick + tint.
 */
function Testimonial({
  quote,
  name,
  role,
  art,
  accent = "indigo",
  style,
  ...rest
}) {
  const accents = {
    indigo: "var(--indigo-500)",
    crimson: "var(--crimson-500)",
    gold: "var(--gold-500)",
    magenta: "var(--magenta-500)"
  };
  const a = accents[accent] || accents.indigo;
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: "sk-testimonial",
    style: {
      position: "relative",
      margin: 0,
      padding: "clamp(26px, 3.4vw, 38px)",
      borderRadius: 34,
      background: `linear-gradient(145deg, var(--color-surface), color-mix(in oklch, ${a} 9%, var(--color-surface)))`,
      border: "1px solid color-mix(in oklch, var(--color-border) 86%, var(--color-surface))",
      boxShadow: "var(--shadow-md), var(--inset-top)",
      display: "grid",
      gridTemplateColumns: art ? "minmax(0,1fr) clamp(110px, 24%, 168px)" : "1fr",
      gap: "clamp(20px, 3vw, 36px)",
      alignItems: "center",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "clamp(17px, 2vw, 23px)",
      lineHeight: 1.7,
      color: "var(--color-ink)"
    }
  }, quote), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 22,
      color: "var(--color-muted)",
      fontSize: 14,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 24,
      height: 2,
      borderRadius: 99,
      background: a,
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--color-ink)",
      fontWeight: 700
    }
  }, name), role ? /*#__PURE__*/React.createElement("span", null, "\xB7 ", role) : null)), art ? /*#__PURE__*/React.createElement("img", {
    src: art,
    alt: "",
    style: {
      width: "100%",
      maxHeight: 178,
      objectFit: "contain",
      justifySelf: "center",
      filter: "drop-shadow(0 18px 16px color-mix(in oklch, var(--ink-900) 16%, transparent))"
    }
  }) : null);
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Testimonial.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/app.jsx
try { (() => {
/* App — composes the site, wires scroll reveals + sticky nav + Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMood": "night",
  "energy": "lively",
  "ctaColor": "#F2C45A"
} /*EDITMODE-END*/;
const CTA_ON = {
  "#F2C45A": "var(--ink-900)",
  "#E2503C": "#FFF6F2",
  "#5B55E8": "#F4F4FF"
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const energyFactor = {
    calm: 0.45,
    lively: 1,
    wild: 1.9
  }[t.energy] || 1;
  const goCheckout = () => {
    const el = document.getElementById("checkout");
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth"
    });
  };
  React.useEffect(() => {
    // sticky-nav glass toggle
    const nav = document.getElementById("siteNav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("is-stuck", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();

    // scroll-triggered reveals
    let cleanupReveals = () => {};
    if (window.gsap && window.ScrollTrigger) {
      const g = window.gsap;
      g.registerPlugin(window.ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const els = g.utils.toArray(".reveal");
      if (reduce) {
        g.set(els, {
          opacity: 1,
          y: 0
        });
      } else {
        els.forEach(el => {
          g.fromTo(el, {
            opacity: 0,
            y: 28
          }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true
            }
          });
        });
      }
      cleanupReveals = () => window.ScrollTrigger.getAll().forEach(tr => tr.kill());
    } else {
      document.querySelectorAll(".reveal").forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      cleanupReveals();
    };
  }, []);
  const accentVars = {
    "--color-gold": t.ctaColor,
    "--color-gold-hover": `color-mix(in oklch, ${t.ctaColor} 85%, black)`,
    "--on-gold": CTA_ON[t.ctaColor] || "#fff",
    "--shadow-gold": `0 14px 30px color-mix(in oklch, ${t.ctaColor} 38%, transparent)`
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "site" + (t.heroMood === "day" ? " site--day" : ""),
    style: accentVars
  }, /*#__PURE__*/React.createElement(TopNav, {
    onBuy: goCheckout
  }), /*#__PURE__*/React.createElement(Hero, {
    onBuy: goCheckout,
    mood: t.heroMood,
    energy: energyFactor
  }), /*#__PURE__*/React.createElement(CourseIntro, {
    onBuy: goCheckout
  }), /*#__PURE__*/React.createElement(Curriculum, null), /*#__PURE__*/React.createElement(Outcomes, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Checkout, null), /*#__PURE__*/React.createElement(SiteFooter, null), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Mood",
    value: t.heroMood,
    options: ["night", "day"],
    onChange: v => setTweak("heroMood", v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Motion energy",
    value: t.energy,
    options: ["calm", "lively", "wild"],
    onChange: v => setTweak("energy", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Color"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "CTA color",
    value: t.ctaColor,
    options: ["#F2C45A", "#E2503C", "#5B55E8"],
    onChange: v => setTweak("ctaColor", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/checkout.jsx
try { (() => {
/* Checkout — course summary + registration form with a fake submit
   that flips to a success state (the brand's payment-result moment). */
const CheckDS = window.SedayeKhoobDesignSystem_7ce729;
function Checkout() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | done
  const [name, setName] = React.useState("");
  const submit = e => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1400);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--line",
    id: "checkout",
    "data-screen-label": "Checkout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap checkout"
  }, /*#__PURE__*/React.createElement(CheckDS.Card, {
    variant: "night",
    className: "reveal checkout__summary"
  }, /*#__PURE__*/React.createElement(CheckDS.Badge, {
    tone: "night",
    dot: true
  }, "\u062F\u0648\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "14px 0 0",
      color: "var(--on-night)"
    }
  }, "\u062A\u0626\u0648\u0631\u06CC \u0645\u0648\u0633\u06CC\u0642\u06CC"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      color: "var(--on-night-muted)",
      lineHeight: 1.8
    }
  }, "\u06CC\u06A9 \u0645\u0633\u06CC\u0631 \u0622\u0645\u0648\u0632\u0634\u06CC \u0645\u062A\u0645\u0631\u06A9\u0632 \u0628\u0631\u0627\u06CC \u0647\u0646\u0631\u062C\u0648\u06CC\u0627\u0646 \u062A\u0627\u0632\u0647\u200C\u06A9\u0627\u0631 \u0648 \u0645\u0648\u0632\u06CC\u0633\u06CC\u0646\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u0646\u062F \u067E\u0627\u06CC\u0647\u200C\u0647\u0627 \u0631\u0627 \u0628\u0627\u0644\u0627\u062E\u0631\u0647 \u0631\u0648\u0634\u0646 \u0648 \u0642\u0627\u0628\u0644\u200C\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06CC\u0627\u062F \u0628\u06AF\u06CC\u0631\u0646\u062F."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "22px 0"
    }
  }, /*#__PURE__*/React.createElement(CheckDS.Checklist, {
    tone: "gold",
    boxed: true,
    items: ["دسترسی دائمی به دوره‌ی فعلی", "درس‌های ویدیویی و فایل‌های تمرین", "طراحی‌شده برای یادگیری با سرعت شخصی"]
  })), /*#__PURE__*/React.createElement("p", {
    className: "meta",
    style: {
      color: "var(--on-night-muted)",
      lineHeight: 1.7
    }
  }, "\u0628\u0639\u062F \u0627\u0632 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642\u060C \u0633\u0641\u0627\u0631\u0634 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0644\u0627\u06CC\u0633\u0646\u0633 \u0627\u0633\u067E\u0627\u062A\u200C\u067E\u0644\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0635\u0627\u062F\u0631 \u0645\u06CC\u200C\u0634\u0648\u062F.")), /*#__PURE__*/React.createElement("form", {
    className: "formcard reveal",
    onSubmit: submit,
    noValidate: true
  }, status === "done" ? /*#__PURE__*/React.createElement("div", {
    className: "formcard__success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "formcard__check",
    "aria-hidden": "true"
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", null, "\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      fontSize: 17
    }
  }, name ? name + " عزیز، " : "", "\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0634\u0645\u0627 \u06A9\u0627\u0645\u0644 \u0634\u062F. \u0644\u06CC\u0646\u06A9 \u062F\u0633\u062A\u0631\u0633\u06CC \u0648 \u0644\u0627\u06CC\u0633\u0646\u0633 \u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F."), /*#__PURE__*/React.createElement(CheckDS.Button, {
    variant: "secondary",
    onClick: () => {
      setStatus("idle");
      setName("");
    }
  }, "\u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u062F\u06CC\u06AF\u0631")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 12
    }
  }, "\u0627\u0632 \u062F\u0648\u0631\u0647\u200C\u06CC \u062A\u0626\u0648\u0631\u06CC \u0645\u0648\u0633\u06CC\u0642\u06CC \u0634\u0631\u0648\u0639 \u06A9\u0646\u06CC\u062F."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      margin: "14px 0 28px"
    }
  }, "\u0645\u0633\u06CC\u0631\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0648 \u0645\u062A\u0645\u0631\u06A9\u0632 \u0628\u0631\u0627\u06CC \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC\u0650 \u0631\u0648\u0634\u0646 \u0648 \u0642\u0627\u0628\u0644\u200C\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u067E\u0627\u06CC\u0647\u200C\u0647\u0627."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CheckDS.TextField, {
    label: "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
    name: "fullName",
    required: true,
    autoComplete: "name",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(CheckDS.TextField, {
    label: "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644",
    name: "mobile",
    inputMode: "tel",
    placeholder: "09123456789",
    required: true
  }), /*#__PURE__*/React.createElement(CheckDS.TextField, {
    label: "\u0627\u06CC\u0645\u06CC\u0644 \u0628\u0631\u0627\u06CC \u062F\u0631\u06CC\u0627\u0641\u062A \u0631\u0633\u06CC\u062F",
    name: "email",
    type: "email",
    hint: "\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(CheckDS.Button, {
    variant: "gold",
    size: "lg",
    type: "submit",
    style: {
      width: "100%"
    },
    disabled: status === "sending"
  }, status === "sending" ? "در حال آماده‌سازی پرداخت…" : "ثبت‌نام و پرداخت آنلاین")), status === "sending" ? /*#__PURE__*/React.createElement("div", {
    className: "formcard__msg"
  }, "\u062F\u0631 \u062D\u0627\u0644 \u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u0647 \u062F\u0631\u06AF\u0627\u0647 \u067E\u0631\u062F\u0627\u062E\u062A\u2026") : null))));
}
window.Checkout = Checkout;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/checkout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/footer.jsx
try { (() => {
/* Footer / contact */
function SiteFooter() {
  const methods = [{
    label: "ایمیل",
    value: "hello@sedayekhoob.example",
    href: "mailto:hello@sedayekhoob.example"
  }, {
    label: "پشتیبانی دوره",
    value: "+61 2 5550 1234",
    href: "tel:+61255501234"
  }, {
    label: "واتساپ",
    value: "+61 400 555 019",
    href: "tel:+61400555019"
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "foot",
    id: "contact",
    "data-screen-label": "Footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot__top reveal"
  }, /*#__PURE__*/React.createElement("h2", null, "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "\u0628\u0631\u0627\u06CC \u067E\u0631\u0633\u0634\u200C\u0647\u0627\u06CC \u0645\u0631\u0628\u0648\u0637 \u0628\u0647 \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u060C \u0645\u062D\u062A\u0648\u0627\u06CC \u062F\u0648\u0631\u0647 \u06CC\u0627 \u0647\u0645\u06A9\u0627\u0631\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0627\u0632 \u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631 \u0628\u0627 \u062A\u06CC\u0645 \u0635\u062F\u0627\u06CC \u062E\u0648\u0628 \u062F\u0631 \u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627\u0634\u06CC\u062F.")), /*#__PURE__*/React.createElement("div", {
    className: "foot__methods reveal"
  }, methods.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.label,
    className: "foot__method"
  }, /*#__PURE__*/React.createElement("span", null, m.label), /*#__PURE__*/React.createElement("a", {
    href: m.href
  }, m.value)))), /*#__PURE__*/React.createElement("div", {
    className: "foot__bottom"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "\xA9 2026 \u0635\u062F\u0627\u06CC \u062E\u0648\u0628"), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "\u0633\u0627\u062E\u062A\u0647\u200C\u0634\u062F\u0647 \u0628\u0631\u0627\u06CC \u0647\u0646\u0631\u062C\u0648\u06CC\u0627\u0646\u06CC \u06A9\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC \u0631\u0627 \u0648\u0627\u0642\u0639\u06CC \u0645\u06CC\u200C\u0634\u0646\u0648\u0646\u062F."))));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/hero.jsx
try { (() => {
/* Hero — the spotlight is on the calligraphic wordmark itself: giant
   gradient logo center-stage, conductor + instrument orbs as supporting
   cast at the edges. GSAP entrance + energy-scaled float/parallax. */
const HeroDS = window.SedayeKhoobDesignSystem_7ce729;
function Hero({
  onBuy,
  mood = "night",
  energy = 1
}) {
  const root = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !root.current) return;
    const g = window.gsap;
    const E = energy;
    const ctx = g.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        g.set(".hero [data-anim], .hero .orb, .hero .cast__maestro", {
          opacity: 1,
          y: 0,
          scale: 1
        });
        return;
      }
      const tl = g.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      tl.from(".hero__spot", {
        opacity: 0,
        scale: 0.6,
        duration: 1.1,
        ease: "power2.out"
      }).from(".nav__inner", {
        y: -24,
        opacity: 0,
        duration: 0.6
      }, 0.1).from("[data-anim='logo']", {
        y: 50 * E,
        opacity: 0,
        scale: 0.9,
        duration: 1.05,
        ease: "power3.out"
      }, 0.25).from("[data-anim='line']", {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12
      }, 0.7).from("[data-anim='lead']", {
        y: 18,
        opacity: 0,
        duration: 0.55
      }, 0.9).from("[data-anim='cta'] > *", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, 1.0).from("[data-anim='stat']", {
        y: 14,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08
      }, 1.1).from(".cast__maestro", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out"
      }, 0.6).from(".cast__podium", {
        scale: 0.3,
        opacity: 0,
        duration: 0.8
      }, 0.75).from(".orb", {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: `back.out(${1.2 + E * 0.6})`
      }, 0.8).from(".orb__note", {
        opacity: 0,
        scale: 0.4,
        duration: 0.6,
        stagger: 0.1
      }, 1.0);

      // perpetual float — amplitude scales with energy
      g.utils.toArray(".orb").forEach((orb, i) => {
        g.to(orb, {
          y: `+=${10 + 8 * E}`,
          rotation: (i % 2 ? 3 : -3) * E,
          duration: (3 + i * 0.4) / Math.max(E, 0.35),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });
      g.to(".cast__maestro", {
        y: `-=${8 * E}`,
        duration: 4 / Math.max(E, 0.35),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      g.to("[data-anim='logo']", {
        y: `-=${6 * E}`,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4
      });

      // pointer parallax — strength scales with energy
      const hero = root.current;
      const layers = g.utils.toArray(".hero [data-depth]");
      const onMove = e => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        layers.forEach(el => {
          const d = parseFloat(el.dataset.depth) * E;
          g.to(el, {
            x: -dx * 36 * d,
            y: -dy * 26 * d,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
        });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }, root);
    return () => ctx.revert();
  }, [energy]);
  const nightGhost = mood === "day" ? {
    color: "var(--color-ink)",
    border: "1.5px solid var(--color-border-strong)"
  } : {
    color: "var(--on-night)",
    border: "1.5px solid color-mix(in oklch, var(--on-night) 30%, transparent)"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "hero" + (mood === "day" ? " hero--day" : ""),
    id: "top",
    ref: root,
    "data-screen-label": "Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__spot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__texture",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__cast",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--1",
    "data-depth": "2.4"
  }, "\u266A"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--2",
    "data-depth": "1.8"
  }, "\u266B"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--3",
    "data-depth": "2.9"
  }, "\u266C"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--4",
    "data-depth": "1.4"
  }, "\u2669"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--5",
    "data-depth": "2.1"
  }, "\u266A"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--6",
    "data-depth": "3.2"
  }, "\u266B"), /*#__PURE__*/React.createElement("span", {
    className: "orb__note orb__note--7",
    "data-depth": "1.6"
  }, "\u266A")), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("img", {
    className: "hero__logo",
    "data-anim": "logo",
    "data-depth": "0.25",
    src: "../../assets/design/sedayekhubBG.png",
    alt: "\u0635\u062F\u0627\u06CC \u062E\u0648\u0628"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero__title"
  }, /*#__PURE__*/React.createElement("span", {
    "data-anim": "line"
  }, "\u062A\u0626\u0648\u0631\u06CC \u0645\u0648\u0633\u06CC\u0642\u06CC\u060C "), /*#__PURE__*/React.createElement("span", {
    "data-anim": "line",
    className: "spectrum-text"
  }, "\u0634\u0628\u06CC\u0647\u0650 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0646\u0648\u0627\u062E\u062A\u0646.")), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead",
    "data-anim": "lead"
  }, "\u0635\u062F\u0627\u060C \u0641\u0627\u0635\u0644\u0647\u060C \u06AF\u0627\u0645 \u0648 \u0622\u06A9\u0648\u0631\u062F \u0631\u0627 \u0628\u0627 \u062F\u0631\u0633\u200C\u0647\u0627\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0648 \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627\u06CC \u0634\u0646\u06CC\u062F\u0627\u0631\u06CC \u06CC\u0627\u062F \u0628\u06AF\u06CC\u0631 \u2014 \u0628\u0627 \u0622\u0631\u0627\u0645\u0634\u060C \u0627\u0639\u062A\u0645\u0627\u062F\u0628\u0647\u200C\u0646\u0641\u0633 \u0648 \u06AF\u0648\u0634\u06CC \u06A9\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC \u0631\u0627 \u0648\u0627\u0642\u0639\u06CC \u0645\u06CC\u200C\u0634\u0646\u0648\u062F."), /*#__PURE__*/React.createElement("div", {
    className: "hero__cta",
    "data-anim": "cta"
  }, /*#__PURE__*/React.createElement(HeroDS.Button, {
    variant: "gold",
    size: "lg",
    onClick: onBuy
  }, "\u062E\u0631\u06CC\u062F \u062F\u0648\u0631\u0647 \u062A\u0626\u0648\u0631\u06CC \u0645\u0648\u0633\u06CC\u0642\u06CC"), /*#__PURE__*/React.createElement(HeroDS.Button, {
    variant: "ghost",
    size: "lg",
    arrow: true,
    style: nightGhost,
    href: "#curriculum"
  }, "\u062F\u06CC\u062F\u0646 \u062F\u0631\u0633\u200C\u0647\u0627")), /*#__PURE__*/React.createElement("div", {
    className: "hero__stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__stat",
    "data-anim": "stat"
  }, /*#__PURE__*/React.createElement("b", null, "\u06F1\u06F2"), /*#__PURE__*/React.createElement("span", null, "\u0641\u0635\u0644 \u0622\u0645\u0648\u0632\u0634\u06CC")), /*#__PURE__*/React.createElement("div", {
    className: "hero__stat",
    "data-anim": "stat"
  }, /*#__PURE__*/React.createElement("b", null, "\u06F4\u06F8"), /*#__PURE__*/React.createElement("span", null, "\u062A\u0645\u0631\u06CC\u0646 \u06A9\u0648\u062A\u0627\u0647")), /*#__PURE__*/React.createElement("div", {
    className: "hero__stat",
    "data-anim": "stat"
  }, /*#__PURE__*/React.createElement("b", null, "\u06F9\u06F0"), /*#__PURE__*/React.createElement("span", null, "\u062F\u0642\u06CC\u0642\u0647 \u0645\u062B\u0627\u0644 \u0634\u0646\u06CC\u062F\u0627\u0631\u06CC")))), /*#__PURE__*/React.createElement("div", {
    className: "hero__orchestra",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb orb--a",
    "data-depth": "1.5"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/ostad-piano.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "orb orb--b",
    "data-depth": "2.1"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/ostad-daf.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "orb orb--c",
    "data-depth": "1.2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/ostad-tar.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "cast__podium",
    "data-depth": "0.3"
  }), /*#__PURE__*/React.createElement("img", {
    className: "cast__maestro",
    src: "../../assets/design/maestro-conductor.png",
    alt: "",
    "data-depth": "0.7"
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/nav.jsx
try { (() => {
/* TopNav — overlays the hero, flips to a glass bar on scroll */
const DS = window.SedayeKhoobDesignSystem_7ce729;
function TopNav({
  onBuy
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "nav",
    id: "siteNav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__brand",
    href: "#top",
    "aria-label": "\u0635\u062F\u0627\u06CC \u062E\u0648\u0628"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "spectrum-text"
  }, "\u0635\u062F\u0627\u06CC \u062E\u0648\u0628")), /*#__PURE__*/React.createElement("nav", {
    className: "nav__links",
    "aria-label": "\u0641\u0647\u0631\u0633\u062A \u0633\u0627\u06CC\u062A"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#course"
  }, "\u062F\u0648\u0631\u0647"), /*#__PURE__*/React.createElement("a", {
    href: "#curriculum"
  }, "\u0633\u0631\u0641\u0635\u0644\u200C\u0647\u0627"), /*#__PURE__*/React.createElement("a", {
    href: "#studio"
  }, "\u0634\u06CC\u0648\u0647 \u0622\u0645\u0648\u0632\u0634"), /*#__PURE__*/React.createElement("a", {
    href: "#testimonials"
  }, "\u0646\u0638\u0631 \u0647\u0646\u0631\u062C\u0648\u0647\u0627"), /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "\u062A\u0645\u0627\u0633")), /*#__PURE__*/React.createElement("div", {
    className: "nav__cta"
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "gold",
    size: "sm",
    onClick: onBuy
  }, "\u062E\u0631\u06CC\u062F \u062F\u0648\u0631\u0647"))));
}
window.TopNav = TopNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/sections.jsx
try { (() => {
/* Course intro, curriculum (interactive stepper) & outcomes */
const SecDS = window.SedayeKhoobDesignSystem_7ce729;
const MODULES = [{
  id: "notes",
  label: "نت‌ها",
  title: "نت‌ها را مثل مختصات موسیقی بخوانید.",
  text: "خطوط حامل، کلیدها، نام نت‌ها و الگوهای اکتاو را با تمرین‌های تشخیص سریع یاد بگیرید.",
  img: "../../assets/design/ostad-piano.png"
}, {
  id: "scales",
  label: "گام‌ها",
  title: "گام‌ها را مثل رنگ‌های موسیقی بشناسید.",
  text: "الگوهای ماژور، مینور و مدال را بسازید و بشنوید هرکدام چگونه رنگ ملودی را عوض می‌کنند.",
  img: "../../assets/design/ostad-tar.png"
}, {
  id: "chords",
  label: "آکوردها",
  title: "آکوردها را با اطمینان بسازید.",
  text: "از فاصله‌ها به تریادها، آکوردهای هفتم و توالی‌هایی برسید که همان لحظه قابل استفاده‌اند.",
  img: "../../assets/design/ostad-guitar.png"
}, {
  id: "rhythm",
  label: "ریتم",
  title: "ریتم را قبل از شمردن حس کنید.",
  text: "پالس، تقسیم‌بندی و سنکوپ را با تمرین‌هایی یاد بگیرید که از شنیدن شروع می‌شوند.",
  img: "../../assets/design/ostad-tombak.png"
}];
function CourseIntro({
  onBuy
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--line",
    id: "course",
    "data-screen-label": "Course intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\u062F\u0648\u0631\u0647 \u067E\u06CC\u0634 \u0631\u0648"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "\u062A\u0626\u0648\u0631\u06CC \u0645\u0648\u0633\u06CC\u0642\u06CC\u060C \u0634\u0628\u06CC\u0647 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0646\u0648\u0627\u062E\u062A\u0646."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 20
    }
  }, "\u0627\u0648\u0644\u06CC\u0646 \u062F\u0648\u0631\u0647\u200C\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646\u0650 \u0635\u062F\u0627\u06CC \u062E\u0648\u0628 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634 \u0627\u0633\u062A: \u0645\u0633\u06CC\u0631\u06CC \u06A9\u0647 \u0646\u062A\u200C\u0647\u0627\u060C \u0641\u0627\u0635\u0644\u0647\u200C\u0647\u0627\u060C \u06AF\u0627\u0645\u200C\u0647\u0627 \u0648 \u0622\u06A9\u0648\u0631\u062F\u0647\u0627 \u0631\u0627 \u0628\u0647 \u062A\u0635\u0645\u06CC\u0645\u200C\u0647\u0627\u06CC \u0631\u0648\u0634\u0646\u0650 \u0645\u0648\u0633\u06CC\u0642\u0627\u06CC\u06CC \u062A\u0628\u062F\u06CC\u0644 \u0645\u06CC\u200C\u06A9\u0646\u062F."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(SecDS.Button, {
    variant: "primary",
    onClick: onBuy
  }, "\u062E\u0631\u06CC\u062F \u062F\u0648\u0631\u0647"))), /*#__PURE__*/React.createElement(SecDS.Card, {
    variant: "spectrum",
    className: "reveal"
  }, /*#__PURE__*/React.createElement(SecDS.Badge, {
    tone: "gold",
    dot: true
  }, "\u062F\u0648\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "12px 0 4px"
    }
  }, "\u0686\u0647 \u0686\u06CC\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F"), /*#__PURE__*/React.createElement("div", {
    className: "intro__media",
    style: {
      margin: "18px 0 22px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "intro__inst"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/inst-piano.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("span", {
    className: "intro__inst"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/inst-tar.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("span", {
    className: "intro__inst"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/design/inst-tombak.png",
    alt: ""
  }))), /*#__PURE__*/React.createElement(SecDS.Checklist, {
    items: ["درس‌های ویدیویی کوتاه با مثال‌های تصویری", "برگه‌های تمرین قابل دانلود", "تمرین شنیداری برای هر بخش"]
  }))));
}
function Curriculum() {
  const [active, setActive] = React.useState(0);
  const mod = MODULES[active];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--line",
    id: "curriculum",
    "data-screen-label": "Curriculum"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\u0633\u0631\u0641\u0635\u0644\u200C\u0647\u0627"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "\u0646\u0642\u0634\u0647\u200C\u0627\u06CC \u0627\u0632 \u062A\u0626\u0648\u0631\u06CC \u06A9\u0647 \u0648\u0627\u0642\u0639\u0627\u064B \u0634\u0646\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 18
    }
  }, "\u0628\u0627 \u062F\u0631\u0633\u200C\u0647\u0627\u06CC \u06A9\u0648\u062A\u0627\u0647\u060C \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627\u06CC \u0634\u0646\u06CC\u062F\u0627\u0631\u06CC \u0648 \u0627\u06CC\u062F\u0647\u200C\u0647\u0627\u06CC \u0639\u0645\u0644\u06CC \u0622\u0647\u0646\u06AF\u0633\u0627\u0632\u06CC \u062C\u0644\u0648 \u0628\u0631\u0648\u06CC\u062F.")), /*#__PURE__*/React.createElement("div", {
    className: "modgrid"
  }, MODULES.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "reveal",
    onMouseEnter: () => setActive(i),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(SecDS.InstrumentOrb, {
    src: m.img,
    title: m.label,
    size: 188,
    float: i === active
  })))), /*#__PURE__*/React.createElement("div", {
    className: "focus reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "focus__steps"
  }, MODULES.map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    className: "step" + (i === active ? " is-active" : ""),
    onClick: () => setActive(i)
  }, /*#__PURE__*/React.createElement("h4", null, m.label), /*#__PURE__*/React.createElement("p", null, m.text)))), /*#__PURE__*/React.createElement("div", {
    className: "lessonpanel"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "\u062A\u0645\u0631\u06A9\u0632 \u062F\u0631\u0633"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 14px"
    }
  }, mod.title), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      fontSize: 17
    }
  }, mod.text)), /*#__PURE__*/React.createElement("div", {
    className: "lessonpanel__art"
  }, /*#__PURE__*/React.createElement("img", {
    src: mod.img,
    alt: "",
    key: mod.id
  }))))));
}
function Outcomes() {
  const items = [{
    t: "ساختار را بشنوید",
    d: "تشخیص دهید ملودی‌ها، آکوردها و جمله‌ها چگونه کنار هم قرار می‌گیرند.",
    img: "../../assets/design/inst-piano.png"
  }, {
    t: "با اطمینان یاد بگیرید",
    d: "زبان تئوری را بدون گیر افتادن در اصطلاحات خشک به کار ببرید.",
    img: "../../assets/design/ostad-flute.png"
  }, {
    t: "سریع‌تر خلق کنید",
    d: "یک گام، آکورد یا ایده‌ی ریتمیک را به طرحی واقعی تبدیل کنید.",
    img: "../../assets/design/ostad-daf.png"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--line",
    id: "studio",
    "data-screen-label": "Outcomes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap outcomes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\u0634\u06CC\u0648\u0647\u200C\u06CC \u0622\u0645\u0648\u0632\u0634"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "\u0627\u0632 \u0646\u0634\u0627\u0646\u0647\u200C\u0647\u0627 \u062A\u0627 \u0627\u0646\u062A\u062E\u0627\u0628\u200C\u0647\u0627\u06CC \u0645\u0648\u0633\u06CC\u0642\u0627\u06CC\u06CC."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 18
    }
  }, "\u0647\u0631 \u0645\u0628\u062D\u062B \u0628\u0627 \u0644\u062D\u0638\u0647\u200C\u0647\u0627\u06CC \u0634\u0646\u06CC\u062F\u0627\u0631\u06CC\u060C \u062A\u0645\u0631\u06CC\u0646\u200C\u0647\u0627\u06CC \u062E\u0644\u0627\u0642\u0627\u0646\u0647\u200C\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0648 \u0628\u0631\u0631\u0633\u06CC\u200C\u0647\u0627\u06CC \u0633\u0627\u062F\u0647 \u0647\u0645\u0631\u0627\u0647 \u0627\u0633\u062A \u062A\u0627 \u0627\u06CC\u062F\u0647 \u0628\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC \u0648\u0627\u0642\u0639\u06CC \u0648\u0635\u0644 \u0634\u0648\u062F.")), /*#__PURE__*/React.createElement("div", {
    className: "outgrid"
  }, items.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.t,
    className: "outcard reveal"
  }, /*#__PURE__*/React.createElement("img", {
    src: o.img,
    alt: ""
  }), /*#__PURE__*/React.createElement("h4", null, o.t), /*#__PURE__*/React.createElement("p", null, o.d))))));
}
window.CourseIntro = CourseIntro;
window.Curriculum = Curriculum;
window.Outcomes = Outcomes;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/testimonials.jsx
try { (() => {
/* Testimonials — 3D carousel (faithful to the original site): active card
   front-center, prev/next tilted behind on the sides, dots + arrows. */
const TestDS = window.SedayeKhoobDesignSystem_7ce729;
const T_ITEMS = [{
  quote: "«برای اولین بار فهمیدم فاصله‌ها فقط اسم نیستند؛ واقعاً می‌شود صدایشان را تشخیص داد و در تمرین ساز از آن‌ها استفاده کرد.»",
  name: "یارا گیگیلی",
  role: "هنرجوی پیانو",
  art: "../../assets/design/testimonial-piano.png",
  accent: "indigo"
}, {
  quote: "«درس‌ها کوتاه و مرتب‌اند. وقتی تمرین‌ها را انجام می‌دهم، حس می‌کنم تئوری بالاخره به آهنگسازی روزمره‌ام وصل شده است.»",
  name: "امیر بتهوونیان",
  role: "تولیدکننده‌ی موسیقی",
  art: "../../assets/design/testimonial-guitar.png",
  accent: "gold"
}, {
  quote: "«لحن آموزش آرام و قدم‌به‌قدم است. بدون این‌که در اصطلاحات گم شوم، گام‌ها و آکوردهای پایه را بهتر شنیدم.»",
  name: "محیا اشی مشی",
  role: "هنرجوی آواز",
  art: "../../assets/design/testimonial-parts-3.png",
  accent: "magenta"
}];
function Testimonials() {
  const [active, setActive] = React.useState(0);
  const len = T_ITEMS.length;
  const go = dir => setActive(a => (a + dir + len) % len);
  const posClass = i => {
    const off = (i - active + len) % len;
    if (off === 0) return " is-active";
    if (off === 1) return " is-next";
    if (off === len - 1) return " is-prev";
    return " is-hidden";
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section tband",
    id: "testimonials",
    "data-screen-label": "Testimonials"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tband__head reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\u0646\u0638\u0631 \u0647\u0646\u0631\u062C\u0648\u0647\u0627"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "\u0647\u0646\u0631\u062C\u0648\u0647\u0627 \u0686\u0647 \u0645\u06CC\u200C\u06AF\u0648\u06CC\u0646\u062F\u061F"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      marginTop: 16
    }
  }, "\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u0647\u0646\u0631\u062C\u0648\u0647\u0627 \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u062F \u0645\u0633\u06CC\u0631 \u0622\u0645\u0648\u0632\u0634 \u0633\u0627\u062F\u0647\u200C\u062A\u0631\u060C \u06A9\u0627\u0631\u0628\u0631\u062F\u06CC\u200C\u062A\u0631 \u0648 \u0646\u0632\u062F\u06CC\u06A9\u200C\u062A\u0631 \u0628\u0647 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC \u0628\u0627\u0634\u062F.")), /*#__PURE__*/React.createElement("div", {
    className: "tcarousel reveal",
    "aria-label": "\u0646\u0638\u0631 \u0647\u0646\u0631\u062C\u0648\u0647\u0627"
  }, T_ITEMS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t.name,
    className: "tcard" + posClass(i),
    onClick: () => {
      if (i !== active) setActive(i);
    },
    role: i !== active ? "button" : undefined,
    "aria-hidden": posClass(i) === " is-hidden"
  }, /*#__PURE__*/React.createElement(TestDS.Testimonial, {
    quote: t.quote,
    name: t.name,
    role: t.role,
    art: t.art,
    accent: t.accent
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tcontrols"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tbtn",
    type: "button",
    "aria-label": "\u0642\u0628\u0644\u06CC",
    onClick: () => go(-1)
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    className: "tdots"
  }, T_ITEMS.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.name,
    type: "button",
    className: "tdot" + (i === active ? " is-active" : ""),
    "aria-label": "نظر " + (i + 1),
    onClick: () => setActive(i)
  }))), /*#__PURE__*/React.createElement("button", {
    className: "tbtn",
    type: "button",
    "aria-label": "\u0628\u0639\u062F\u06CC",
    onClick: () => go(1)
  }, "\u203A")))));
}
window.Testimonials = Testimonials;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/testimonials.jsx", error: String((e && e.message) || e) }); }

// ui_kits/course-website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/course-website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checklist = __ds_scope.Checklist;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.InstrumentOrb = __ds_scope.InstrumentOrb;

__ds_ns.Testimonial = __ds_scope.Testimonial;

})();
