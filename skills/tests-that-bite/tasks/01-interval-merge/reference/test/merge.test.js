import { describe, expect, it } from "vitest";
import { mergeIntervals } from "../src/merge.js";

describe("mergeIntervals", () => {
  it("merges overlapping intervals", () => {
    expect(mergeIntervals([[1, 4], [3, 6]])).toEqual([[1, 6]]);
  });

  it("merges touching intervals", () => {
    expect(mergeIntervals([[1, 2], [2, 3]])).toEqual([[1, 3]]);
  });

  it("keeps disjoint intervals separate, sorted by start ascending", () => {
    expect(mergeIntervals([[10, 12], [1, 2], [5, 6]])).toEqual([[1, 2], [5, 6], [10, 12]]);
  });

  it("sorts numerically, not lexicographically", () => {
    expect(mergeIntervals([[10, 20], [2, 3]])).toEqual([[2, 3], [10, 20]]);
  });

  it("keeps a containing interval when a contained one follows", () => {
    expect(mergeIntervals([[1, 10], [2, 3]])).toEqual([[1, 10]]);
  });

  it("returns a single interval unchanged", () => {
    expect(mergeIntervals([[4, 5]])).toEqual([[4, 5]]);
  });

  it("returns [] for []", () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  it("does not mutate the input array or its pairs", () => {
    const input = [[5, 6], [1, 2]];
    const snapshot = JSON.parse(JSON.stringify(input));
    mergeIntervals(input);
    expect(input).toEqual(snapshot);
  });

  it("throws RangeError when start > end", () => {
    expect(() => mergeIntervals([[5, 2]])).toThrow(RangeError);
  });
});
