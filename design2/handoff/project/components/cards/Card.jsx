import React from "react";

/**
 * Sedaye Khoob — Card
 * The brand's stadium-radius surface. `night` flips to the deep-indigo
 * surface; `spectrum` adds a gradient top edge. Soft indigo-tinted shadow.
 */
export function Card({ children, variant = "surface", pad = "lg", className, style, ...rest }) {
  const pads = { sm: 20, md: 28, lg: "clamp(26px, 4vw, 44px)" };

  const variants = {
    surface: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-md)",
    },
    raised: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-lg)",
    },
    night: {
      background: "linear-gradient(150deg, var(--color-night) 0%, var(--color-night-2) 100%)",
      color: "var(--on-night)",
      border: "1px solid color-mix(in oklch, var(--indigo-400) 30%, transparent)",
      boxShadow: "var(--shadow-lg)",
    },
    spectrum: {
      background: "var(--color-surface)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
      boxShadow: "var(--shadow-md)",
    },
  };

  return (
    <div
      className={`sk-card sk-card--${variant}` + (className ? " " + className : "")}
      style={{
        position: "relative",
        borderRadius: "var(--radius-stadium)",
        padding: pads[pad],
        overflow: "hidden",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {variant === "spectrum" ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            insetInline: 0,
            top: 0,
            height: 5,
            background: "var(--brand-spectrum-rtl)",
          }}
        ></span>
      ) : null}
      {children}
    </div>
  );
}
