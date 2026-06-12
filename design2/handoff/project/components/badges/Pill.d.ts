import * as React from "react";

export interface PillProps {
  children: React.ReactNode;
  /** Gold highlighted state — the hero quick-nav style */
  active?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Tappable capsule for quick-nav links and feature tags. */
export function Pill(props: PillProps): JSX.Element;
