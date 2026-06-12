import React from "react";

/**
 * Sedaye Khoob — Checklist
 * The benefit/feature list with circular check marks. `tone` colours the
 * check chip; on dark cards pass tone="gold".
 */
export function Checklist({ items = [], tone = "crimson", boxed = false, style, ...rest }) {
  const tones = {
    crimson: { bg: "var(--color-accent)", fg: "var(--on-accent)" },
    indigo: { bg: "var(--color-primary)", fg: "var(--on-primary)" },
    gold: { bg: "var(--color-gold)", fg: "var(--on-gold)" },
  };
  const t = tones[tone];
  return (
    <ul
      className="sk-checklist"
      style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: boxed ? 10 : 14, ...style }}
      {...rest}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "28px 1fr",
            gap: 12,
            alignItems: boxed ? "center" : "start",
            color: "inherit",
            ...(boxed
              ? {
                  minHeight: 44,
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  background: "color-mix(in oklch, var(--color-surface) 70%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--color-border) 70%, transparent)",
                }
              : {}),
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: t.bg,
              color: t.fg,
              fontWeight: 800,
              fontSize: 15,
              boxShadow: "var(--shadow-xs)",
            }}
          >
            ✓
          </span>
          <span style={{ lineHeight: 1.5 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
