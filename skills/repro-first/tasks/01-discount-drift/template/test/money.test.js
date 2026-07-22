import { describe, expect, it } from "vitest";
import { orderTotalCents } from "../src/money.js";

describe("orderTotalCents", () => {
  it("sums lines with no discount", () => {
    expect(orderTotalCents([{ unitCents: 500, qty: 2 }], 0)).toBe(1000);
  });
});
