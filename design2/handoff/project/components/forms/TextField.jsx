import React from "react";

/**
 * Sedaye Khoob — TextField
 * Labelled input on the brand's rounded "stadium-lite" field. Pairs a
 * muted label above a soft-bordered control that lights up indigo on focus.
 */
export function TextField({
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
  return (
    <div className="sk-field" style={{ display: "flex", flexDirection: "column", gap: 7, ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{ color: "var(--color-muted)", fontSize: 14 }}>
          {label}
          {required ? <span style={{ color: "var(--color-accent)", marginInlineStart: 4 }}>*</span> : null}
        </label>
      ) : null}
      <input
        className="sk-input"
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={onChange}
        style={{
          width: "100%",
          minHeight: 52,
          padding: "13px 18px",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-bg)",
          color: "var(--color-ink)",
          outline: "none",
          transition:
            "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        }}
        {...rest}
      />
      {hint ? <span style={{ color: "var(--color-faint)", fontSize: 12 }}>{hint}</span> : null}
    </div>
  );
}
