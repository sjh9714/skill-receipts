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
  intervals.forEach(([s, e]) => {
    if (s > e) throw new RangeError(`invalid interval [${s}, ${e}]`);
  });
  return intervals
    .map(([s, e]) => [s, e])
    .sort(([a], [b]) => a - b)
    .reduce((acc, [s, e]) => {
      const last = acc[acc.length - 1];
      if (last !== undefined && s <= last[1]) {
        return [...acc.slice(0, -1), [last[0], Math.max(last[1], e)]];
      }
      return [...acc, [s, e]];
    }, []);
}
