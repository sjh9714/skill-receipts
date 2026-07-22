import { decodeCursor, encodeCursor } from "./cursor.js";

// Return one page of up to `size` items, starting at `cursor` (null = start).
export function page(items, cursor, size) {
  const start = cursor === null ? 0 : decodeCursor(cursor);
  const pageItems = items.slice(start, start + size);
  const nextStart = start + size - 1;
  return {
    items: pageItems,
    nextCursor: nextStart < items.length ? encodeCursor(nextStart) : null,
  };
}
