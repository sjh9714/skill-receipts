import { describe, expect, it } from "vitest";
import { page } from "../src/pager.js";

const items = Array.from({ length: 12 }, (_, i) => `item-${i}`);

describe("page", () => {
  it("returns the first page", () => {
    expect(page(items, null, 5).items).toEqual(items.slice(0, 5));
  });

  it("walks every item exactly once", () => {
    const seen = [];
    let cursor = null;
    do {
      const result = page(items, cursor, 5);
      seen.push(...result.items);
      cursor = result.nextCursor;
    } while (cursor !== null);
    expect(seen).toEqual(items);
  });
});
