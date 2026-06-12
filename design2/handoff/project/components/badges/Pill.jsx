import React from "react";

/**
 * Sedaye Khoob — Pill
 * A tappable capsule used for quick-nav links and feature tags. The
 * `active` gold pill is the brand's signature hero-nav highlight.
 */
export function Pill({ children, active = false, href, onClick, style, ...rest }) {
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
    transition: "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
  };
  const activeStyle = active
    ? { background: "var(--color-gold)", borderColor: "var(--color-gold)", color: "var(--on-gold)", boxShadow: "var(--shadow-gold)" }
    : {};
  const composed = { ...base, ...activeStyle, ...style };
  const Tag = href ? "a" : "button";
  return (
    <Tag className="sk-pill" href={href} onClick={onClick} style={composed} {...rest}>
      {children}
    </Tag>
  );
}
