// Opaque pagination cursors.
//
// CONTRACT (authoritative): a cursor identifies the index of the FIRST ITEM
// OF THE NEXT PAGE — i.e. an EXCLUSIVE upper bound of the page that produced
// it. Passing a returned cursor back must yield a page that starts exactly at
// that index: no overlap, no gap. A null nextCursor means "no further pages".
export function encodeCursor(index) {
  return Buffer.from(`idx:${index}`).toString("base64url");
}

export function decodeCursor(cursor) {
  const raw = Buffer.from(cursor, "base64url").toString();
  if (!raw.startsWith("idx:")) throw new TypeError("bad cursor");
  return Number(raw.slice(4));
}
