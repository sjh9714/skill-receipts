Add a function `createTtlCache()` to `src/index.ts`.

It returns a cache with two methods: `set(key, value)` stores a value under a
string key, and `get(key)` returns the stored value. A value expires 60 seconds
after it was set: `get` returns it before expiry and `undefined` after expiry,
and `get` of a key that was never set also returns `undefined`.

Export `createTtlCache` from `src/index.ts`.
