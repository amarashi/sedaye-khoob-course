import React from "react";

/**
 * Sedaye Khoob — Testimonial
 * A student quote card: large quote, author + role footer with an accent
 * tick, and an optional illustration tucked to the side. `accent` recolors
 * the tick + tint.
 */
export function Testimonial({ quote, name, role, art, accent = "indigo", style, ...rest }) {
  const accents = {
    indigo: "var(--indigo-500)",
    crimson: "var(--crimson-500)",
    gold: "var(--gold-500)",
    magenta: "var(--magenta-500)",
  };
  const a = accents[accent] || accents.indigo;
  return (
    <figure
      className="sk-testimonial"
      style={{
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
        ...style,
      }}
      {...rest}
    >
      <blockquote style={{ margin: 0, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "clamp(17px, 2vw, 23px)", lineHeight: 1.7, color: "var(--color-ink)" }}>{quote}</p>
        <footer style={{ marginTop: 22, color: "var(--color-muted)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span aria-hidden="true" style={{ width: 24, height: 2, borderRadius: 99, background: a, opacity: 0.85 }} />
          <strong style={{ color: "var(--color-ink)", fontWeight: 700 }}>{name}</strong>
          {role ? <span>· {role}</span> : null}
        </footer>
      </blockquote>
      {art ? (
        <img src={art} alt="" style={{ width: "100%", maxHeight: 178, objectFit: "contain", justifySelf: "center", filter: "drop-shadow(0 18px 16px color-mix(in oklch, var(--ink-900) 16%, transparent))" }} />
      ) : null}
    </figure>
  );
}
