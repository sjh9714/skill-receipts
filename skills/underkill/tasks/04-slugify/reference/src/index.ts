// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ _]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
