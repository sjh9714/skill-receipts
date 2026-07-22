import { describe, expect, it } from "vitest";
import { paginate } from "../src/paginate.js";

// Repro for the reported bug: a full page must contain `size` items.
describe("page size", () => {
  it("returns exactly `size` items on a full page", () => {
    const rows = Array.from({ length: 30 }, (_, i) => i);
    expect(paginate(rows, 1, 10).items).toHaveLength(10);
  });
});
