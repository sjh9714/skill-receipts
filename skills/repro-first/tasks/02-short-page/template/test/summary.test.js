import { describe, expect, it } from "vitest";
import { rangeLabel } from "../src/summary.js";

describe("rangeLabel", () => {
  it("labels a middle page", () => {
    expect(rangeLabel(2, 10, 35)).toBe("showing 11-20 of 35");
  });
});
