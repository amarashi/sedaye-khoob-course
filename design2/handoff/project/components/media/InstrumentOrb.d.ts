import * as React from "react";

export interface InstrumentOrbProps {
  /** Illustration source (an ostad / instrument PNG) */
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  /** Diameter in px */
  size?: number;
  /** Gentle float animation on the illustration */
  float?: boolean;
  style?: React.CSSProperties;
}

/**
 * Circular spotlight framing an illustration, with title + caption.
 *
 * @startingPoint section="Media" subtitle="Spotlight orb for ostad / instrument art" viewport="700x320"
 */
export function InstrumentOrb(props: InstrumentOrbProps): JSX.Element;
