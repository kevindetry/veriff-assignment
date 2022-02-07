import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButtonGroup from ".";

describe("RadioButtonGroup", () => {
  const user = userEvent.setup();
  const options = [
    { id: "foo", title: "Foo" },
    { id: "bar", title: "Bar" },
  ] as const;
  const [firstOption] = options;
  const getOption = (option: typeof options[number]) =>
    screen.getByRole("radio", { name: option.title });

  test("properly handles `aria-labelledby` prop", () => {
    const labelId = "test-label";
    const labelText = "Test label";

    render(
      <div>
        <div id={labelId}>{labelText}</div>
        <RadioButtonGroup options={options} aria-labelledby={labelId} />
      </div>
    );

    expect(screen.getByRole("radiogroup")).toHaveAccessibleName(labelText);
  });

  test("has no selected option if rendered without a value", () => {
    render(<RadioButtonGroup options={options} />);

    expect(
      screen.queryByRole("radio", { checked: true })
    ).not.toBeInTheDocument();
  });

  test("has a selected option if rendered with a value", () => {
    render(<RadioButtonGroup options={options} value={firstOption.id} />);

    expect(getOption(firstOption)).toBeChecked();
  });

  test("reacts to clicking on an unselected option", async () => {
    const handleChange = jest.fn();

    render(<RadioButtonGroup options={options} onChange={handleChange} />);

    expect(handleChange).not.toHaveBeenCalled();

    await user.click(getOption(firstOption));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(firstOption.id);
  });

  test("doesn't react to clicking on a selected option", async () => {
    const handleChange = jest.fn();

    render(
      <RadioButtonGroup
        options={options}
        value={firstOption.id}
        onChange={handleChange}
      />
    );

    expect(handleChange).not.toHaveBeenCalled();

    await user.click(getOption(firstOption));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
