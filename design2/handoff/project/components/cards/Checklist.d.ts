import * as React from "react";

export interface ChecklistProps {
  items: React.ReactNode[];
  /** Colour of the round check chip */
  tone?: "crimson" | "indigo" | "gold";
  /** Wrap each row in a soft boxed surface (the checkout style) */
  boxed?: boolean;
  style?: React.CSSProperties;
}

/** Benefit / feature list with circular check marks. */
export function Checklist(props: ChecklistProps): JSX.Element;
