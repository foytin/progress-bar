import React from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";

import ProgressBarsChart from "../container/ProgressBarsChart";

describe("ProgressBarsChart container intergation test cases", () => {
  const data = { buttons: [7, 33, -34], bars: [60, 43, 24, 33], limit: 90 };

  it("should has lodaing spin in inital status", () => {
    const wrapper = render(<ProgressBarsChart />);
    expect(wrapper.getByTestId("loading-spin")).toBeInTheDocument();
    expect(wrapper.findByText("Data loading...")).toBeTruthy();
  });

  it("should have 4 bars, 3 buttons and 4 bar options after grab api data", async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });

    await waitFor(() => wrapper.getAllByTestId("progress-bar"));
    expect(wrapper!.container).toMatchSnapshot();
    expect(wrapper!.getAllByTestId("progress-bar")).toHaveLength(4);
    expect(wrapper!.getAllByRole("option")).toHaveLength(4);
    expect(wrapper!.getAllByTestId("step-btn")).toHaveLength(3);
  });

  it("After grab api data, first bar should display 60% with class is normal and style is width: 60%", async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });

    await waitFor(() => wrapper.getAllByTestId("progress-bar"));
    expect(wrapper!.getAllByTestId("bar-number")[0]).toHaveTextContent(
      `${data.bars[0]}%`
    );
    expect(wrapper!.getAllByTestId("bar-block")[0]).toHaveClass("bar normal");
    expect(wrapper!.getAllByTestId("bar-block")[0]).toHaveStyle(
      `width: ${data.bars[0]}%`
    );
  });

  it("select second bar option and click second step btn, second bar value will increase 7 from 43 to 50", async () => {
    let wrapper: RenderResult;
    const buttons = [...data.buttons].sort((a, b) => a - b);
    const selectionIndex = 1;
    const btnIndex = 1;
    const barIndex = 1;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });

    await waitFor(() => wrapper.getAllByTestId("progress-bar"));

    act(() => {
      fireEvent.blur(wrapper.getByTestId("bar-selection"), {
        target: { value: selectionIndex },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId("step-btn")[btnIndex]);
    });

    const barOption = wrapper!.container
      .getElementsByTagName("option")
      .item(selectionIndex);
    expect(barOption!.selected).toBeTruthy();

    expect(wrapper!.getAllByTestId("bar-number")[barIndex]).toHaveTextContent(
      `${data.bars[barIndex] + buttons[btnIndex]}%`
    );
  });

  it("value below threshold value, porgress bar should have normal classname, while equal or above should have alert classname", async () => {
    let wrapper: RenderResult;
    const barIndex = 0;
    const btnIndex = 2;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });

    await waitFor(() => wrapper.getAllByTestId("progress-bar"));

    expect(wrapper!.getAllByTestId("bar-number")[barIndex]).toHaveTextContent(
      "60%"
    );
    expect(wrapper!.getAllByTestId("bar-block")[barIndex]).toHaveClass(
      "bar normal"
    );

    act(() => {
      fireEvent.click(wrapper.getAllByTestId("step-btn")[btnIndex]);
    });

    // threshold value is 90%
    expect(wrapper!.getAllByTestId("bar-number")[barIndex]).toHaveTextContent(
      "93%"
    );
    expect(wrapper!.getAllByTestId("bar-block")[barIndex]).toHaveClass(
      "bar alert"
    );
  });

  it("Progress bar minimal value should be equal or above 0, even calculate result is negative value", async () => {
    let wrapper: RenderResult;
    const barIndex = 2;
    const selectionIndex = 2;
    const btnIndex = 0;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });

    await waitFor(() => wrapper.getAllByTestId("progress-bar"));

    act(() => {
      fireEvent.blur(wrapper.getByTestId("bar-selection"), {
        target: { value: selectionIndex },
      });
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId("step-btn")[btnIndex]);
    });
    // calculate result is -10
    expect(wrapper!.getAllByTestId("bar-number")[barIndex]).toHaveTextContent(
      "0%"
    );
  });
});

describe("ProgressBarsChart container intergation exception test cases", () => {
  it("should return empty array if data error", async () => {
    const data = { buttons: undefined, bars: undefined, limit: undefined };
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });
    await waitFor(() => wrapper.getAllByTestId("bar-selection"));
    expect(wrapper!.queryAllByTestId("progress-bar")).toEqual([]);
    expect(wrapper!.queryAllByRole("option")).toEqual([]);
    expect(wrapper!.queryAllByTestId("step-btn")).toEqual([]);
  });

  it("should return empty array if data.bars and data.buttons is not array", async () => {
    const data = { buttons: {}, bars: {}, limit: 100 };
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data }));
    });
    await waitFor(() => wrapper.getAllByTestId("bar-selection"));
    expect(wrapper!.queryAllByTestId("progress-bar")).toEqual([]);
    expect(wrapper!.queryAllByRole("option")).toEqual([]);
    expect(wrapper!.queryAllByTestId("step-btn")).toEqual([]);
  });

  it("should display Error page when call api fail", async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(<ProgressBarsChart />);
      jest.spyOn(axios, "get").mockRejectedValueOnce("network failure");
    });

    await waitFor(() => wrapper.getByTestId("error-page"));
    expect(wrapper!.queryByTestId("loading-spin")).toEqual(null);
    expect(wrapper!.getByTestId("error-page")).toBeInTheDocument();
  });
});
