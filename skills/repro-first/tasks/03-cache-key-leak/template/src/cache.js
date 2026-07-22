// Generic TTL cache with an injectable clock.
export function createCache(ttlMs, clock = () => Date.now()) {
  const store = new Map();
  return {
    get(key) {
      const entry = store.get(key);
      if (!entry || clock() - entry.at > ttlMs) return undefined;
      return entry.value;
    },
    set(key, value) {
      store.set(key, { value, at: clock() });
    },
  };
}
