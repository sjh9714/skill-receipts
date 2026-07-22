import { describe, expect, it } from "vitest";
import { mergeIntervals } from "../src/merge.js";

// Starter test — extend or replace with a real suite.
describe("mergeIntervals", () => {
  it("returns an array", () => {
    expect(Array.isArray(mergeIntervals([]))).toBe(true);
  });
});
