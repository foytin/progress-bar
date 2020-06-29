import React from "react";
import { render } from "@testing-library/react";

import ProgressBar from "../component/ProgressBar";

describe("ProgressBar component", () => {
  it("when value less than or equal to limit, background colour should be nornal", () => {
    const wrapper = render(<ProgressBar value={80} limit={90} />);
    expect(wrapper.getByTestId("bar-block")).toHaveClass("bar normal");
    expect(wrapper.getByTestId("bar-number")).toHaveTextContent("80%");
  });

  it("when value less than or equal to limit, should alert bright colour for warning", () => {
    const wrapper = render(<ProgressBar value={180} limit={90} />);
    expect(wrapper.getByTestId("bar-block")).toHaveClass("bar alert");
    expect(wrapper.getByTestId("bar-number")).toHaveTextContent("180%");
  });
});
