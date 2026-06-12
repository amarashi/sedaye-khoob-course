import * as React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  tone?: "indigo" | "crimson" | "gold" | "night" | "neutral";
  /** Show a leading status dot */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Compact kicker / label / status pill. */
export function Badge(props: BadgeProps): JSX.Element;
