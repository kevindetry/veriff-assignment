import { useId } from "@react-aria/utils";
import {
  forwardRef,
  type ForwardedRef,
  type KeyboardEventHandler,
} from "react";
import RadioButtonGroup from "../radio-button-group";
import * as styles from "./styles.css";

const CheckListItem = forwardRef(function CheckListItem(
  props: CheckListItemProps,
  ref: ForwardedRef<HTMLLIElement>
) {
  const controller = useController(props);
  return (
    <li
      ref={ref}
      className={styles.root}
      tabIndex={props.disabled ? undefined : 0}
      aria-disabled={props.disabled}
      aria-labelledby={controller.labelId}
      onKeyDown={controller.handleKeyDown}
    >
      <p id={controller.labelId} className={styles.description}>
        {props.description}
      </p>
      <RadioButtonGroup
        options={options}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        aria-labelledby={controller.labelId}
      />
    </li>
  );
});

interface CheckListItemProps {
  description: string;
  value?: CheckListItemOptionId | undefined;
  disabled?: boolean | undefined;
  onChange?: ((value: CheckListItemOptionId) => void) | undefined;
  onSelectNext?: (() => void) | undefined;
  onSelectPrevious?: (() => void) | undefined;
}

const useController = (props: CheckListItemProps) => {
  const labelId = useId();

  const handleKeyDown: KeyboardEventHandler<HTMLLIElement> = (e) => {
    const handlers: Record<string, VoidFunction | undefined> = {
      ArrowDown: props.onSelectNext,
      ArrowUp: props.onSelectPrevious,
      1: () => props.onChange?.("yes"),
      2: () => props.onChange?.("no"),
    };
    handlers[e.key]?.();
  };

  return { labelId, handleKeyDown };
};

const options = [
  { id: "yes", title: "Yes" },
  { id: "no", title: "No" },
] as const;

type CheckListItemOptionId = typeof options[number]["id"];

export default CheckListItem;
