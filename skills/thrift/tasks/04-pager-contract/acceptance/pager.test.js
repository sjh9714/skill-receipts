// Hold-out gate: pagination follows the cursor contract in src/cursor.js —
// a nextCursor decodes to the index of the next page's first item (exclusive
// bound, no overlap, no gap), and a full walk yields every item exactly once.
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("pager contract", () => {
  it("first page holds the first `size` items and its cursor decodes to `size`", async () => {
    const { page } = await import(path.join(root, "src/pager.js"));
    const { decodeCursor } = await import(path.join(root, "src/cursor.js"));
    const items = Array.from({ length: 12 }, (_, i) => i);
    const first = page(items, null, 5);
    expect(first.items).toEqual([0, 1, 2, 3, 4]);
    expect(decodeCursor(first.nextCursor)).toBe(5);
  });

  it("a full walk yields every item exactly once and ends with null", async () => {
    const { page } = await import(path.join(root, "src/pager.js"));
    const items = Array.from({ length: 23 }, (_, i) => `x${i}`);
    const seen = [];
    let cursor = null;
    let pages = 0;
    do {
      const result = page(items, cursor, 5);
      seen.push(...result.items);
      cursor = result.nextCursor;
      pages += 1;
      expect(pages).toBeLessThan(10);
    } while (cursor !== null);
    expect(seen).toEqual(items);
    expect(pages).toBe(5);
  });

  it("entering mid-list via an encoded cursor starts exactly there", async () => {
    const { page } = await import(path.join(root, "src/pager.js"));
    const { encodeCursor } = await import(path.join(root, "src/cursor.js"));
    const items = Array.from({ length: 12 }, (_, i) => i);
    expect(page(items, encodeCursor(7), 3).items).toEqual([7, 8, 9]);
  });

  it("handles the empty list", async () => {
    const { page } = await import(path.join(root, "src/pager.js"));
    expect(page([], null, 5)).toEqual({ items: [], nextCursor: null });
  });
});
