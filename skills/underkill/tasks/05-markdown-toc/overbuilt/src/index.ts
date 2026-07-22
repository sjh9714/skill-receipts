// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import { marked } from "marked";

export interface TocOptions {
  maxDepth?: number;
  skipCodeFences?: boolean;
}

export const DEFAULT_MAX_DEPTH = 6;

export function markdownToc(markdown: string, options: TocOptions = {}): string {
  const maxDepth = options.maxDepth ?? DEFAULT_MAX_DEPTH;
  const bullets: string[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence && options.skipCodeFences !== false) continue;
    const tokens = marked.lexer(line);
    const heading = tokens.find((t) => t.type === "heading") as { depth: number; text: string } | undefined;
    if (!heading || heading.depth > maxDepth) continue;
    const anchor = heading.text.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
    bullets.push(`${"  ".repeat(heading.depth - 1)}- [${heading.text}](#${anchor})`);
  }
  return bullets.join("\n");
}
