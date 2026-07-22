// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
export function markdownToc(markdown: string): string {
  const bullets: string[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{1,6}) (.*)$/.exec(line);
    if (!match) continue;
    const title = match[2];
    const anchor = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
    bullets.push(`${"  ".repeat(match[1].length - 1)}- [${title}](#${anchor})`);
  }
  return bullets.join("\n");
}
