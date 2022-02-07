import { useState, type FormEventHandler } from "react";
import type { Check, CheckResult } from "../../api";
import Button from "../button";
import CheckList from "../check-list";
import * as styles from "./styles.css";

const CheckListForm = (props: CheckListFormProps) => {
  const controller = useController(props);
  return (
    <form className={styles.root} onSubmit={controller.handleSubmit}>
      <CheckList
        checks={props.checks}
        values={controller.values}
        onChange={controller.handleChange}
      />
      <Button
        className={styles.submitButton}
        disabled={controller.isSubmitDisabled}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

interface CheckListFormProps {
  checks: Check[];
  onSubmit?: ((values: CheckResult[]) => Promise<void> | void) | undefined;
}

const useController = (props: CheckListFormProps) => {
  const [values, setValues] = useState<CheckResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled =
    isSubmitting ||
    (values.length < props.checks.length &&
      values.every(({ value }) => value === "yes"));

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      await props.onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    isSubmitDisabled,
    handleChange: setValues,
    handleSubmit,
  };
};

export default CheckListForm;
