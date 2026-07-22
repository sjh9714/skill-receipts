import { describe, expect, it } from "vitest";
import { createCache } from "../src/cache.js";

describe("createCache", () => {
  it("stores and expires entries", () => {
    let now = 0;
    const cache = createCache(100, () => now);
    cache.set("k", "v");
    expect(cache.get("k")).toBe("v");
    now = 200;
    expect(cache.get("k")).toBeUndefined();
  });
});
