import clsx from "clsx";
import type { AriaRole, MouseEventHandler, ReactNode } from "react";
import * as styles from "./styles.css";

const Button = (props: ButtonProps) => (
  <button
    className={clsx(styles.variant[props.variant ?? "filled"], props.className)}
    disabled={props.disabled}
    role={props.role}
    type={props.type ?? "button"}
    aria-checked={props["aria-checked"]}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

interface ButtonProps {
  children: ReactNode;
  variant?: keyof typeof styles.variant | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  role?: AriaRole | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default Button;
