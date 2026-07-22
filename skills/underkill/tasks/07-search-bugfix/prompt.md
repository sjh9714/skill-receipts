`src/search.ts` has a bug: `searchByPrefix` is documented to match
case-insensitively, but searching for "usb" fails to match a product named
"USB Cable".

Fix `searchByPrefix` so the query matches product names case-insensitively.
Change nothing else.
