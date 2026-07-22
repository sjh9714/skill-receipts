// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { addItem, cartTotal, itemCount } from "../src/cart.js";

const milk = { name: "milk", unitPrice: 250, quantity: 2 };
const bread = { name: "bread", unitPrice: 199, quantity: 3 };

describe("cartTotal", () => {
  it("returns 0 for an empty cart", () => {
    expect(cartTotal([])).toBe(0);
  });

  it("sums unitPrice × quantity over all items", () => {
    expect(cartTotal([milk, bread])).toBe(250 * 2 + 199 * 3);
  });
});

describe("existing behavior is untouched", () => {
  it("addItem still appends without mutating", () => {
    const cart = [milk];
    const next = addItem(cart, bread);
    expect(next).toHaveLength(2);
    expect(cart).toHaveLength(1);
  });

  it("itemCount still sums quantities", () => {
    expect(itemCount([milk, bread])).toBe(5);
  });
});
