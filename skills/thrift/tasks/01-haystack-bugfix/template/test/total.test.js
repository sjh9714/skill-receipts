import { describe, expect, it } from "vitest";
import { orderTotalCents } from "../src/orders/total.js";

describe("orderTotalCents", () => {
  it("totals a plain US order", () => {
    // subtotal 10000, no discount, tax 800
    expect(orderTotalCents({ region: "US", discountCode: null, lines: [{ unitCents: 5000, qty: 2 }] })).toBe(10800);
  });

  it("totals a discounted US order (currently failing — the reported bug)", () => {
    // subtotal 10000, SAVE10 -> discounted 9000, tax on 9000 = 720 -> 9720
    expect(orderTotalCents({ region: "US", discountCode: "SAVE10", lines: [{ unitCents: 5000, qty: 2 }] })).toBe(9720);
  });
});
