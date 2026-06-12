import * as React from "react";

export interface TestimonialProps {
  quote: React.ReactNode;
  name: string;
  role?: string;
  /** Optional side illustration */
  art?: string;
  accent?: "indigo" | "crimson" | "gold" | "magenta";
  style?: React.CSSProperties;
}

/** Student quote card with author footer and optional side art. */
export function Testimonial(props: TestimonialProps): JSX.Element;
