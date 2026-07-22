Add a function `fetchWithRetry(url)` to `src/index.ts`.

It should fetch the given URL and return the parsed JSON body. If the request
fails (network error, or a non-OK HTTP status), retry — up to 3 attempts total.
If all 3 attempts fail, throw.

Export `fetchWithRetry` from `src/index.ts`.
