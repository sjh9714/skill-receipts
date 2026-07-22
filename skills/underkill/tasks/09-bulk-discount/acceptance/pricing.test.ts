// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { lineTotal } from "../src/pricing.js";

const item = (unitPrice: number, quantity: number) => ({ sku: "x", unitPrice, quantity });

describe("lineTotal", () => {
  it("charges full price below 10 units", () => {
    expect(lineTotal(item(500, 1))).toBe(500);
    expect(lineTotal(item(500, 9))).toBe(4500);
  });

  it("applies 10% off at exactly 10 units", () => {
    expect(lineTotal(item(500, 10))).toBe(4500);
  });

  it("rounds the discounted total down to whole cents", () => {
    // 333 × 11 = 3663 → ×0.9 = 3296.7 → 3296
    expect(lineTotal(item(333, 11))).toBe(3296);
  });
});
