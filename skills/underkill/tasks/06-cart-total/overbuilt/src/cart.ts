// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import Big from "big.js";
import { Money } from "./money.js";

export interface CartItem {
  name: string;
  unitPrice: number; // cents
  quantity: number;
}

export interface TotalOptions {
  currency?: string;
  roundingMode?: "floor" | "ceil";
}

export function addItem(cart: CartItem[], item: CartItem): CartItem[] {
  return [...cart, item];
}

export function itemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function cartTotal(cart: CartItem[], options: TotalOptions = {}): number {
  const total = cart.reduce(
    (sum, item) => sum.plus(new Big(item.unitPrice).times(item.quantity)),
    new Big(0),
  );
  return new Money(total.toNumber(), options.currency ?? "USD").cents;
}
