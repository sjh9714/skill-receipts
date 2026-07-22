import { describe, expect, it } from "vitest";
import { median } from "./stats.js";

describe("median", () => {
  it("picks the middle of an odd-length list", () => {
    expect(median([9, 1, 5])).toBe(5);
  });
  it("averages the middle pair of an even-length list", () => {
    expect(median([1, 2, 3, 10])).toBe(2.5);
  });
});
