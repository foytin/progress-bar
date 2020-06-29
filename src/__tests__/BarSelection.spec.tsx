import React from "react";
import { render, fireEvent } from "@testing-library/react";

import BarSelection from "../component/BarSelection";

describe("BarSelection component", () => {
  it("Correctly Render", () => {
    const wrapper = render(
      <BarSelection bars={[23, 66, 58]} onChange={jest.fn()} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it("if bars has 3 records, should have 3 options", () => {
    const wrapper = render(
      <BarSelection bars={[23, 66, 58]} onChange={jest.fn()} />
    );
    expect(wrapper.getAllByRole("option")).toHaveLength(3);
  });

  it("Second option value should be 1, and text should be #Progress 2", () => {
    const wrapper = render(
      <BarSelection bars={[23, 66, 58]} onChange={jest.fn()} />
    );
    expect(wrapper.getAllByRole("option")[1]).toHaveTextContent("#Progress 2");
    expect(wrapper.getAllByRole("option")[1]).toHaveValue("1");
  });

  it("when select on option, mock fn will be fired along with option value", () => {
    const fn = jest.fn();
    const value = "2";
    const wrapper = render(<BarSelection bars={[23, 66, 58]} onChange={fn} />);
    fireEvent.blur(wrapper.getByTestId("bar-selection"), { target: { value } });
    expect(fn).toHaveBeenLastCalledWith(value);
  });
});
