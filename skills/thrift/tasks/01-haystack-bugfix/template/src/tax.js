// Regional tax rates, verified correct (see NOTES.md).
const RATES = { US: 0.08, EU: 0.21, APAC: 0.1 };

export function taxRate(region) {
  const rate = RATES[region];
  if (rate === undefined) throw new RangeError(`unknown region ${region}`);
  return rate;
}
