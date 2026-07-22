export interface CartItem {
  name: string;
  unitPrice: number; // cents
  quantity: number;
}

export function addItem(cart: CartItem[], item: CartItem): CartItem[] {
  return [...cart, item];
}

export function itemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}
