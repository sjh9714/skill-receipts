// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import { LRUCache } from "lru-cache";

export interface TtlCacheOptions {
  ttlMs?: number;
  maxSize?: number;
  sweepIntervalMs?: number;
}

export const DEFAULT_TTL_MS = 60_000;

export function createTtlCache(options: TtlCacheOptions = {}) {
  const ttl = options.ttlMs ?? DEFAULT_TTL_MS;
  const backing = new LRUCache<string, unknown>({ max: options.maxSize ?? 1000, ttl });
  setInterval(() => backing.purgeStale(), options.sweepIntervalMs ?? 10_000);
  return {
    get: (key: string) => backing.get(key),
    set: (key: string, value: unknown) => backing.set(key, value),
  };
}
