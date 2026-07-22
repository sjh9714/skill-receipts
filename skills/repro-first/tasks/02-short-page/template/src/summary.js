// Builds the "showing X-Y of Z" label next to the results table.
export function rangeLabel(page, size, total) {
  if (total === 0) return "no results";
  const first = (page - 1) * size + 1;
  const last = Math.min(page * size, total);
  return `showing ${first}-${last} of ${total}`;
}
