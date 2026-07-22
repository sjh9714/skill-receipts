// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import pRetry from "p-retry";

export interface FetchOptions {
  maxRetries?: number;
  backoff?: BackoffStrategy;
}

export type BackoffStrategy = (attempt: number) => number;

export class FetchRetryError extends Error {
  constructor(public readonly attempts: number) {
    super(`failed after ${attempts} attempts`);
  }
}

export async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<unknown> {
  const max = options.maxRetries ?? 3;
  const backoff = options.backoff ?? ((attempt) => 100 * Math.pow(2, attempt));
  return pRetry(
    async () => {
      const res = await fetch(url);
      if (!res.ok) throw new FetchRetryError(max);
      return res.json();
    },
    { retries: max, minTimeout: backoff(0) },
  );
}
