import React from "react";
import { render } from "@testing-library/react";

import Error from "../component/Error";

describe("Error Page component", () => {
  it("Error page render correctly", () => {
    const wrapper = render(<Error />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
