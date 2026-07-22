// Merge a list of numeric intervals.
//
// mergeIntervals(intervals)
//   intervals: Array of [start, end] pairs with start <= end.
//   Returns a new array of merged intervals, sorted by start ascending:
//   - overlapping intervals are merged ([1,4],[3,6] -> [1,6])
//   - touching intervals are merged ([1,2],[2,3] -> [1,3])
//   - disjoint intervals stay separate
//   - [] -> []
//   - the input array and its pairs are never mutated
//   - throws RangeError if any pair has start > end
export function mergeIntervals(intervals) {
  for (const [start, end] of intervals) {
    if (start > end) throw new RangeError(`invalid interval [${start}, ${end}]`);
  }
  if (intervals.length === 1) return [];
  const sorted = intervals.map(([s, e]) => [s, e]).sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}
