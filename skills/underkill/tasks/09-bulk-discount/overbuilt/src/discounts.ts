export interface DiscountTier {
  minQuantity: number;
  rate: number;
}

export const DISCOUNT_TIERS: DiscountTier[] = [
  { minQuantity: 10, rate: 0.1 },
  { minQuantity: 100, rate: 0.2 },
];

export function applyTiers(total: number, quantity: number, tiers: DiscountTier[]): number {
  const tier = [...tiers].reverse().find((t) => quantity >= t.minQuantity);
  return tier ? Math.floor(total * (1 - tier.rate)) : total;
}
