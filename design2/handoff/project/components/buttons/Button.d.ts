import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  /** gold = hero CTA · primary = indigo workhorse · secondary = outline · ghost = text-only */
  variant?: "gold" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Show the start-ward arrow glyph (animates on hover via .sk-btn) */
  arrow?: boolean;
  /** Optional leading icon node */
  iconStart?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  /** Render as an anchor instead of a button */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Pill-shaped brand action button.
 *
 * @startingPoint section="Buttons" subtitle="Pill actions in gold, indigo, outline & ghost" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
