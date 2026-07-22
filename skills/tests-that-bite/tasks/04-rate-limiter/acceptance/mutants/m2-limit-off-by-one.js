// Sliding-window rate limiter with an injected clock (no Date.now inside).
//
// createLimiter(limit = 5, windowMs = 60000)
//   Returns { allow(key, now) }:
//   - allow(key, now) returns true and RECORDS the call iff the number of
//     previously allowed calls for `key` with timestamp t satisfying
//     t > now - windowMs is strictly less than `limit`; otherwise returns
//     false and records nothing
//   - a call exactly windowMs old (t === now - windowMs) has expired and
//     does not count
//   - keys are independent buckets
//   - `now` is a caller-supplied timestamp in ms; throws TypeError if it is
//     not a finite number
export function createLimiter(limit = 5, windowMs = 60000) {
  const calls = new Map();
  return {
    allow(key, now) {
      if (typeof now !== "number" || !Number.isFinite(now)) {
        throw new TypeError(`now must be a finite number, got ${now}`);
      }
      const recent = (calls.get(key) ?? []).filter((t) => t > now - windowMs);
      if (recent.length <= limit) {
        recent.push(now);
        calls.set(key, recent);
        return true;
      }
      calls.set(key, recent);
      return false;
    },
  };
}
