import React from "react";

/**
 * Sedaye Khoob — InstrumentOrb
 * The signature circular "spotlight" that frames an ostad / instrument
 * illustration on a soft radial glow, with an optional float animation
 * and a title + caption beneath. Used across the curriculum & outcomes.
 */
export function InstrumentOrb({ src, alt = "", title, caption, size = 220, float = true, style, ...rest }) {
  return (
    <figure className="sk-orb" style={{ margin: 0, textAlign: "center", width: size, ...style }} {...rest}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          margin: "0 auto",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          isolation: "isolate",
          background:
            "radial-gradient(circle at 50% 36%, rgba(255,255,255,0.95), color-mix(in oklch, var(--color-surface) 84%, var(--color-accent-soft)) 62%, color-mix(in oklch, var(--indigo-200) 40%, var(--color-surface)))",
          border: "1px solid color-mix(in oklch, var(--color-border) 76%, var(--color-surface))",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "15%",
            borderRadius: "50%",
            border: "1px solid color-mix(in oklch, var(--color-accent) 32%, transparent)",
            transform: "rotate(-10deg)",
            opacity: 0.55,
          }}
        />
        <img
          src={src}
          alt={alt}
          className={float ? "sk-orb-float" : undefined}
          style={{
            position: "relative",
            zIndex: 1,
            width: "86%",
            height: "86%",
            objectFit: "contain",
            filter: "drop-shadow(0 16px 16px color-mix(in oklch, var(--ink-900) 16%, transparent))",
          }}
        />
      </div>
      {title ? <figcaption style={{ marginTop: 16, fontFamily: "var(--font-display)", fontWeight: 640, fontSize: 20 }}>{title}</figcaption> : null}
      {caption ? <p style={{ margin: "6px 0 0", color: "var(--color-muted)", fontSize: 14 }}>{caption}</p> : null}
    </figure>
  );
}
