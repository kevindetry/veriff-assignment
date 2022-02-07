import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckListItem from ".";

describe("CheckListItem", () => {
  const user = userEvent.setup();
  const description = "test description";

  test("isn't focusable while disabled", async () => {
    render(<CheckListItem description={description} disabled />);

    await user.tab();
    expect(screen.getByRole("listitem")).not.toHaveFocus();
  });

  test("reacts to pressing `ArrowDown` key", async () => {
    const handleSelectNext = jest.fn();

    render(
      <CheckListItem
        description={description}
        onSelectNext={handleSelectNext}
      />
    );

    expect(handleSelectNext).not.toHaveBeenCalled();

    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(handleSelectNext).toHaveBeenCalledTimes(1);
  });

  test("reacts to pressing `ArrowUp` key", async () => {
    const handleSelectPrevious = jest.fn();

    render(
      <CheckListItem
        description={description}
        onSelectPrevious={handleSelectPrevious}
      />
    );

    expect(handleSelectPrevious).not.toHaveBeenCalled();

    await user.tab();
    await user.keyboard("{ArrowUp}");
    expect(handleSelectPrevious).toHaveBeenCalledTimes(1);
  });

  test("sets `yes` on pressing `1`", async () => {
    const handleChange = jest.fn();

    render(<CheckListItem description={description} onChange={handleChange} />);

    expect(handleChange).not.toHaveBeenCalled();

    await user.tab();
    await user.keyboard("1");
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("yes");
  });

  test("sets `no` on pressing `2`", async () => {
    const handleChange = jest.fn();

    render(<CheckListItem description={description} onChange={handleChange} />);

    expect(handleChange).not.toHaveBeenCalled();

    await user.tab();
    await user.keyboard("2");
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("no");
  });
});
