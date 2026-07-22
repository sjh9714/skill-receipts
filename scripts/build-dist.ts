// Generate skills/<id>/SKILL.md and skills/<id>/dist/CLAUDE.md.snippet from
// the single source skills/<id>/rules.md (+ skill.json metadata). Both carry
// the rules body verbatim so the benchmark-measured artifact and the shipped
// artifact are byte-identical. CI runs this with --check and fails on drift.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const GENERATED = "Generated from rules.md by scripts/build-dist.ts. Do not edit by hand.";

interface SkillMeta {
  name: string;
  description: string;
  snippetHeading: string;
}

// The rules body = rules.md minus its title and editor-facing comment header.
function extractBody(rulesMd: string): string {
  return rulesMd
    .replace(/^# .*\n/, "")
    .replace(/<!--[\s\S]*?-->\n?/, "")
    .trim();
}

export function render(meta: SkillMeta, rulesMd: string): Record<string, string> {
  const body = extractBody(rulesMd);

  const skillMd = `---
name: ${meta.name}
description: ${meta.description}
---

# ${meta.name}

<!-- ${GENERATED} -->

${body}
`;

  const snippet = `<!-- ${meta.name} — paste this section into your CLAUDE.md (project or ~/.claude/CLAUDE.md) -->
<!-- ${GENERATED} -->
## ${meta.snippetHeading}

${body}
`;

  return {
    "SKILL.md": skillMd,
    "dist/CLAUDE.md.snippet": snippet,
  };
}

function main(): void {
  const root = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
  const skillsDir = path.join(root, "skills");
  const check = process.argv.includes("--check");
  let drifted = false;
  const skillIds = readdirSync(skillsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  for (const skillId of skillIds) {
    const dir = path.join(skillsDir, skillId);
    const meta: SkillMeta = JSON.parse(readFileSync(path.join(dir, "skill.json"), "utf8"));
    const out = render(meta, readFileSync(path.join(dir, "rules.md"), "utf8"));
    for (const [rel, content] of Object.entries(out)) {
      const file = path.join(dir, rel);
      if (check) {
        let current = "";
        try {
          current = readFileSync(file, "utf8");
        } catch {}
        if (current !== content) {
          console.error(`drift: skills/${skillId}/${rel} differs from generated output`);
          drifted = true;
        }
      } else {
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, content);
        console.log(`wrote skills/${skillId}/${rel}`);
      }
    }
  }
  if (drifted) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
