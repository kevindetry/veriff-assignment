import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckList from ".";
import { mockChecks, type Check, type CheckResult } from "../../api";

describe("CheckList", () => {
  const user = userEvent.setup();
  const orderedChecks = [...mockChecks].sort((a, b) => a.priority - b.priority);
  const getItem = (check: Check) =>
    screen.getByRole("listitem", { name: check.description });
  const getValues = (...noIndexes: number[]) =>
    orderedChecks.map<CheckResult>((check, index) => ({
      checkId: check.id,
      value: noIndexes.includes(index) ? "no" : "yes",
    }));

  test("renders the checks in priority order", () => {
    render(<CheckList checks={mockChecks} values={[]} />);

    screen.getAllByRole("listitem").forEach((item, index) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(item).toHaveAccessibleName(orderedChecks[index]!.description);
    });
  });

  test("disables the checks after the first `no` response", () => {
    const noIndex = 1;

    render(<CheckList checks={mockChecks} values={getValues(noIndex)} />);

    orderedChecks.slice(0, noIndex + 1).forEach((check) => {
      const item = getItem(check);
      expect(item).toHaveAttribute("aria-disabled", "false");
      expect(item).toHaveAttribute("tabindex", "0");
    });

    orderedChecks.slice(noIndex + 1).forEach((check) => {
      const item = getItem(check);
      expect(item).toHaveAttribute("aria-disabled", "true");
      expect(item).not.toHaveAttribute("tabindex");
    });
  });

  test("supports keyboard navigation", async () => {
    const noIndex = 2;

    render(<CheckList checks={mockChecks} values={getValues(noIndex)} />);

    await user.tab();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getItem(orderedChecks[0]!)).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getItem(orderedChecks[0]!)).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getItem(orderedChecks[1]!)).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getItem(orderedChecks[0]!)).toHaveFocus();

    await user.keyboard(`{ArrowDown>${noIndex + 1}/}`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getItem(orderedChecks[noIndex]!)).toHaveFocus();
  });

  test("correctly handles the changes", async () => {
    const handleChange = jest.fn();

    render(
      <CheckList
        checks={mockChecks}
        values={getValues(3)}
        onChange={handleChange}
      />
    );

    expect(handleChange).not.toHaveBeenCalled();

    await user.click(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      within(getItem(orderedChecks[1]!)).getByRole("radio", { name: "No" })
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(getValues(1, 3));
  });
});
