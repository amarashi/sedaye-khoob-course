import * as React from "react";

export interface TextFieldProps {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "url" | "search";
  autoComplete?: string;
  /** Small helper line below the input */
  hint?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

/** Labelled text input on the brand's rounded field. */
export function TextField(props: TextFieldProps): JSX.Element;
