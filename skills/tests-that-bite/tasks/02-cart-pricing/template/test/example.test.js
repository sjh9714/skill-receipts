import { describe, expect, it } from "vitest";
import { priceOrder } from "../src/pricing.js";

// Starter test — extend or replace with a real suite.
describe("priceOrder", () => {
  it("returns an object", () => {
    expect(typeof priceOrder([])).toBe("object");
  });
});
