import React from "react";

/**
 * Sedaye Khoob — Button
 * The brand's pill-shaped action. `gold` is the high-energy hero CTA;
 * `primary` is the indigo workhorse; `secondary` is an outline; `ghost`
 * is text-only. Arrow points start-ward (RTL-aware via a logical glyph).
 */
export function Button({
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
    sm: { minHeight: 38, padding: "7px 20px", fontSize: 13 },
    md: { minHeight: 46, padding: "11px 26px", fontSize: 15 },
    lg: { minHeight: 56, padding: "15px 36px", fontSize: 17 },
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
    transition:
      "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
    ...sizes[size],
  };

  const variants = {
    gold: {
      color: "var(--on-gold)",
      background: "var(--color-gold)",
      borderColor: "var(--color-gold)",
      boxShadow: "var(--shadow-gold)",
    },
    primary: {
      color: "var(--on-primary)",
      background: "var(--color-primary)",
      borderColor: "var(--color-primary)",
      boxShadow: "var(--shadow-sm)",
    },
    secondary: {
      color: "var(--color-ink)",
      background: "var(--color-surface)",
      borderColor: "var(--color-border-strong)",
    },
    ghost: {
      color: "var(--color-primary)",
      background: "transparent",
      borderColor: "transparent",
    },
  };

  const cls = `sk-btn sk-btn--${variant}`;
  const composed = { ...base, ...variants[variant], ...style };

  const inner = (
    <>
      {iconStart}
      <span>{children}</span>
      {arrow ? <span aria-hidden="true" style={{ display: "inline-block" }}>←</span> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a className={cls} href={href} style={composed} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} style={composed} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
