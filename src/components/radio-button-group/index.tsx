import type { Key, ReactNode } from "react";
import Button from "../button";
import * as styles from "./styles.css";

const RadioButtonGroup = <T extends Key>(props: RadioButtonGroupProps<T>) => (
  <div
    role="radiogroup"
    aria-disabled={props.disabled}
    aria-labelledby={props["aria-labelledby"]}
  >
    {props.options.map((option) => {
      const isChecked = option.id === props.value;
      const onChange = isChecked ? undefined : props.onChange;
      const handleClick = onChange ? () => onChange(option.id) : undefined;
      return (
        <Button
          key={option.id}
          className={styles.item}
          variant={isChecked ? "filled" : "outlined"}
          role="radio"
          disabled={props.disabled}
          aria-checked={isChecked}
          onClick={handleClick}
        >
          {option.title}
        </Button>
      );
    })}
  </div>
);

interface RadioButtonGroupProps<T extends Key> {
  options: readonly RadioButtonGroupOption<T>[];
  value?: T | undefined;
  disabled?: boolean | undefined;
  onChange?: ((value: T) => void) | undefined;
  "aria-labelledby"?: string | undefined;
}

interface RadioButtonGroupOption<T extends Key> {
  id: T;
  title: ReactNode;
}

export default RadioButtonGroup;
