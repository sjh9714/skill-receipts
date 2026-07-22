// Hold-out gate: pages hold `size` items, the label logic is untouched, and
// the API call site returns full pages.
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const rows = Array.from({ length: 23 }, (_, i) => `r${i}`);

describe("pagination", () => {
  it("returns a full first page", async () => {
    const { paginate } = await import(path.join(root, "src/paginate.js"));
    expect(paginate(rows, 1, 10).items).toEqual(rows.slice(0, 10));
  });

  it("returns the short last page", async () => {
    const { paginate } = await import(path.join(root, "src/paginate.js"));
    expect(paginate(rows, 3, 10).items).toEqual(rows.slice(20, 23));
  });

  it("returns empty items past the end", async () => {
    const { paginate } = await import(path.join(root, "src/paginate.js"));
    expect(paginate(rows, 4, 10)).toEqual({ items: [], total: 23 });
  });

  it("the API call site serves full pages", async () => {
    const { listPage } = await import(path.join(root, "src/api.js"));
    expect(listPage(rows, 2, 10).rows).toHaveLength(10);
  });

  it("the range label stays correct", async () => {
    const { rangeLabel } = await import(path.join(root, "src/summary.js"));
    expect(rangeLabel(1, 10, 23)).toBe("showing 1-10 of 23");
    expect(rangeLabel(3, 10, 23)).toBe("showing 21-23 of 23");
  });
});
