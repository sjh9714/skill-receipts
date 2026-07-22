Add a function `markdownToc(markdown)` to `src/index.ts`.

Given a markdown document as one string, return its table of contents as a
string. A heading is a line that starts with 1–6 `#` characters followed by a
single space; treat every line independently (no need to handle code fences).

For each heading, emit one bullet line: two spaces of indentation per heading
level beyond 1, then `- [Title](#anchor)`, where Title is the heading text and
anchor is the title lowercased, with spaces replaced by hyphens, and every
character other than a-z, 0-9, or hyphen removed. Join the bullet lines with
newlines and return the result. Return an empty string when there are no
headings.

Export `markdownToc` from `src/index.ts`.
