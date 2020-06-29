import { isVaildArray, keepUniqueArrayValue, sortArray } from "../util/index";

describe("util functions", () => {
  it("isVaildArray function should return true if argument is array", () => {
    expect(isVaildArray([])).toBeTruthy();
    expect(isVaildArray([1, 2])).toBeTruthy();
  });

  it("isVaildArray function should return false if argument is not an array", () => {
    expect(isVaildArray("array")).toBeFalsy();
    expect(isVaildArray({ name: "array" })).toBeFalsy();
  });

  it("keepUniqueArrayValue function should return unique value when argument is array", () => {
    expect(keepUniqueArrayValue([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it("sortArray function should return sorting value", () => {
    expect(sortArray([-11, -32, 33, 11])).toEqual([-32, -11, 11, 33]);
  });
});
