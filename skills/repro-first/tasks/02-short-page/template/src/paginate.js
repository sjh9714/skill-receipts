// Return { items, total } for 1-based page `page` of `size` items.
// The last page may be short; a page past the end yields empty items.
export function paginate(all, page, size) {
  const start = (page - 1) * size;
  return { items: all.slice(start, start + size - 1), total: all.length };
}
