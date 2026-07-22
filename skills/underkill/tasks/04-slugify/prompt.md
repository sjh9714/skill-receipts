Add a function `slugify(text)` to `src/index.ts`.

It converts a plain-ASCII string into a URL slug: lowercase everything,
replace each run of spaces and/or underscores with a single hyphen, remove
every other character that is not a-z, 0-9, or hyphen, collapse runs of
hyphens into one, and trim leading and trailing hyphens. Input is always
plain ASCII.

Export `slugify` from `src/index.ts`.
