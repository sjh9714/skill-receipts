// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
export function createTtlCache(): {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
} {
  const entries = new Map<string, { value: unknown; expiresAt: number }>();
  return {
    get(key) {
      const entry = entries.get(key);
      if (!entry || Date.now() > entry.expiresAt) return undefined;
      return entry.value;
    },
    set(key, value) {
      entries.set(key, { value, expiresAt: Date.now() + 60_000 });
    },
  };
}
