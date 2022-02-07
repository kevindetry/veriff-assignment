import { createRef, useMemo, useRef } from "react";
import type { Check, CheckResult } from "../../api";
import CheckListItem from "../check-list-item";
import * as styles from "./styles.css";

const CheckList = (props: CheckListProps) => {
  const controller = useController(props);
  return (
    <ul ref={controller.rootRef} className={styles.root}>
      {controller.orderedChecks.map((check, index) => (
        <CheckListItem
          key={check.id}
          ref={controller.childrenRefs[check.id]}
          description={check.description}
          value={controller.state[check.id]}
          disabled={index > controller.lastEnabledItemIndex}
          onSelectNext={() => controller.focusItem(index + 1)}
          onSelectPrevious={() => controller.focusItem(index - 1)}
          onChange={(value) => controller.handleChange(check.id, value)}
        />
      ))}
    </ul>
  );
};

interface CheckListProps {
  checks: Check[];
  values: CheckResult[];
  onChange?: ((value: CheckResult[]) => void) | undefined;
}

const useController = (props: CheckListProps) => {
  const rootRef = useRef<HTMLUListElement>(null);

  const childrenRefs = useMemo(() => {
    return Object.fromEntries(
      props.checks.map(({ id }) => [id, createRef<HTMLLIElement>()])
    );
  }, [props.checks]);

  const orderedChecks = useMemo(
    () => [...props.checks].sort((a, b) => a.priority - b.priority),
    [props.checks]
  );

  const state = useMemo(() => {
    const valuesAsObject = Object.fromEntries(
      props.values.map(({ checkId, value }) => [checkId, value])
    );
    return Object.fromEntries(
      orderedChecks.flatMap(({ id }) => {
        const value = valuesAsObject[id];
        if (value === undefined) return [];
        return [[id, value]];
      })
    );
  }, [orderedChecks, props.values]);

  const lastEnabledItemIndex = useMemo(() => {
    const values = Object.values(state);
    const firstNoIndex = values.indexOf("no");
    return firstNoIndex === -1 ? values.length : firstNoIndex;
  }, [state]);

  const focusItem = (index: number) => {
    const itemId = orderedChecks[index]?.id;
    if (itemId === undefined) return;
    childrenRefs[itemId]?.current?.focus();
  };

  const handleChange = (checkId: string, value: CheckResult["value"]) => {
    const updatedState = { ...state, [checkId]: value };
    const result = Object.entries(updatedState).flatMap<CheckResult>(
      ([checkId, value]) => (value !== undefined ? [{ checkId, value }] : [])
    );
    props.onChange?.(result);
  };

  return {
    rootRef,
    childrenRefs,
    orderedChecks,
    state,
    lastEnabledItemIndex,
    focusItem,
    handleChange,
  };
};

export default CheckList;
