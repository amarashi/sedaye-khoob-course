import * as React from "react";

export interface CardProps {
  children: React.ReactNode;
  /** surface = light · raised = stronger shadow · night = deep-indigo · spectrum = gradient top edge */
  variant?: "surface" | "raised" | "night" | "spectrum";
  pad?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

/**
 * Stadium-radius surface container.
 *
 * @startingPoint section="Cards" subtitle="Stadium surfaces — light, night & spectrum" viewport="700x240"
 */
export function Card(props: CardProps): JSX.Element;
