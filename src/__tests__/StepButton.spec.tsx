import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StepButton from "../component/StepButton";

describe("StepButton component", () => {
  it("when step is greater than 0, button text should plus +", () => {
    const wrapper = render(<StepButton step={18} onClick={jest.fn()} />);
    expect(wrapper.getByTestId("step-btn")).toHaveTextContent("+18");
  });

  it("when step is less than 0, button text should keep as the same as step input", () => {
    const wrapper = render(<StepButton step={-18} onClick={jest.fn()} />);
    expect(wrapper.getByTestId("step-btn")).toHaveTextContent("-18");
  });

  it("when step button is clicked, props fn will be fired along with step value", () => {
    const btnValue = 18;
    const fn = jest.fn();
    const wrapper = render(<StepButton step={btnValue} onClick={fn} />);
    fireEvent.click(wrapper.getByTestId("step-btn"), btnValue);
    expect(fn).toHaveBeenCalledWith(btnValue);
  });
});
