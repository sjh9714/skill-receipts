export interface LineItem {
  sku: string;
  unitPrice: number; // cents
  quantity: number;
}

export function lineTotal(item: LineItem): number {
  return item.unitPrice * item.quantity;
}
