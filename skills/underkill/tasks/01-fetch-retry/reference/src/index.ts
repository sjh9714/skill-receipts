// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
// This is the shape a well-behaved agent should produce — no options, no
// custom error class, no backoff strategy.
export async function fetchWithRetry(url: string): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
