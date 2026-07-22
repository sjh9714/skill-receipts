export interface LineItem {
  sku: string;
  unitPrice: number; // cents
  quantity: number;
}

export function lineTotal(item: LineItem): number {
  const total = item.unitPrice * item.quantity;
  return item.quantity >= 10 ? Math.floor(total * 0.9) : total;
}
