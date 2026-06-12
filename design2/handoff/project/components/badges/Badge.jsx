import React from "react";

/**
 * Sedaye Khoob — Badge
 * A compact kicker/label pill. Used as the "دوره آنلاین" price kicker,
 * section eyebrows, and status chips.
 */
export function Badge({ children, tone = "indigo", dot = false, style, ...rest }) {
  const tones = {
    indigo: { color: "var(--indigo-700)", background: "var(--indigo-50)", borderColor: "color-mix(in oklch, var(--indigo-400) 30%, transparent)" },
    crimson: { color: "var(--crimson-700)", background: "var(--crimson-50)", borderColor: "color-mix(in oklch, var(--crimson-500) 30%, transparent)" },
    gold: { color: "var(--on-gold)", background: "var(--gold-100)", borderColor: "color-mix(in oklch, var(--gold-500) 42%, transparent)" },
    night: { color: "var(--on-night)", background: "color-mix(in oklch, var(--color-night) 86%, white)", borderColor: "color-mix(in oklch, var(--on-night) 22%, transparent)" },
    neutral: { color: "var(--color-muted)", background: "var(--color-surface-2)", borderColor: "var(--color-border)" },
  };
  return (
    <span
      className="sk-badge"
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {dot ? <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor", opacity: 0.85 }} /> : null}
      {children}
    </span>
  );
}
