// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { searchByPrefix, sortByPrice } from "../src/search.js";

const products = [
  { name: "USB Cable", price: 900 },
  { name: "usb hub", price: 2500 },
  { name: "Monitor", price: 30000 },
];

describe("searchByPrefix", () => {
  it("matches case-insensitively in both directions", () => {
    expect(searchByPrefix(products, "usb").map((p) => p.name)).toEqual(["USB Cable", "usb hub"]);
    expect(searchByPrefix(products, "USB").map((p) => p.name)).toEqual(["USB Cable", "usb hub"]);
  });

  it("still matches exact-case prefixes", () => {
    expect(searchByPrefix(products, "Mon").map((p) => p.name)).toEqual(["Monitor"]);
  });

  it("returns nothing for a non-matching prefix", () => {
    expect(searchByPrefix(products, "hdmi")).toEqual([]);
  });
});

describe("existing behavior is untouched", () => {
  it("sortByPrice still sorts ascending without mutating", () => {
    const sorted = sortByPrice(products);
    expect(sorted.map((p) => p.price)).toEqual([900, 2500, 30000]);
    expect(products[0].name).toBe("USB Cable");
  });
});
