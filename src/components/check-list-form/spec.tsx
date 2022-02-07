import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckListForm from ".";
import { mockChecks, type CheckResult } from "../../api";

describe("CheckListForm", () => {
  const user = userEvent.setup();
  const getItems = () => screen.getAllByRole("radiogroup");
  const getSubmitButton = () => screen.getByRole("button", { name: "Submit" });
  const getOption = (item: HTMLElement, name: string) =>
    within(item).getByRole("radio", { name });

  test("should be submittable if every check is `yes`", async () => {
    render(<CheckListForm checks={mockChecks} />);

    const submitButton = getSubmitButton();

    for (const item of getItems()) {
      expect(submitButton).toBeDisabled();
      await user.click(getOption(item, "Yes"));
    }
    expect(submitButton).toBeEnabled();
  });

  test("should be submittable if at least one check is `no`", async () => {
    render(<CheckListForm checks={mockChecks} />);

    const submitButton = getSubmitButton();
    const items = screen.getAllByRole("radiogroup");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(getOption(items[0]!, "Yes"));
    expect(submitButton).toBeDisabled();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(getOption(items[1]!, "No"));
    expect(submitButton).toBeEnabled();
  });

  test("submits expected values", async () => {
    const values = ["yes", "yes", "no"] as const;
    const orderedChecks = [...mockChecks].sort(
      (a, b) => a.priority - b.priority
    );
    const expectedResult: CheckResult[] = values.map((value, index) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      checkId: orderedChecks[index]!.id,
      value,
    }));
    const handleSubmit = jest.fn();

    render(<CheckListForm checks={mockChecks} onSubmit={handleSubmit} />);

    const submitButton = getSubmitButton();

    expect(handleSubmit).not.toHaveBeenCalled();

    const itemsWithValues = getItems()
      .slice(0, values.length)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((item, index) => [item, values[index]!] as const);

    for (const [item, value] of itemsWithValues) {
      await user.click(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getOption(item, { yes: "Yes", no: "No" }[value]!)
      );
    }

    await user.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(expectedResult);
  });
});
