import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Condition } from "./types.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function git(dir: string, ...args: string[]): void {
  execFileSync("git", ["-C", dir, ...args], { stdio: "ignore" });
}

// Prepare an isolated workspace for one run: temp copy of the skill's task
// template, a git baseline commit to anchor diff metrics, and a scratch
// CLAUDE_CONFIG_DIR so the user's global config never leaks into any arm.
// "on" injects the skill's shipped snippet byte-identically, committed into
// the baseline so it never appears in the diff.
export async function prepareWorkspace(
  skillId: string,
  taskId: string,
  condition: Condition,
): Promise<{ dir: string; configDir: string }> {
  const base = path.join(root, "bench/.workspaces");
  await mkdir(base, { recursive: true });
  const dir = await mkdtemp(path.join(base, `${skillId}-${taskId}-${condition}-`));
  await cp(path.join(root, "skills", skillId, "tasks", taskId, "template"), dir, { recursive: true });
  if (condition === "on") {
    await writeFile(
      path.join(dir, "CLAUDE.md"),
      await readFile(path.join(root, "skills", skillId, "dist/CLAUDE.md.snippet"), "utf8"),
    );
  } else if (condition !== "off") {
    // control/comparison arms: placebo instructions or a vendored competitor
    // ruleset (vs-<name>). A skill may ship its own placebo.md (pre-registered
    // in docs/DESIGN.md); otherwise the shared style-only placebo is used.
    // Strip the file's meta comment — it describes the experiment or the
    // vendoring provenance and must never reach the model.
    const skillPlacebo = path.join(root, "skills", skillId, "placebo.md");
    const source =
      condition === "placebo"
        ? existsSync(skillPlacebo)
          ? skillPlacebo
          : path.join(root, "bench/placebo-instructions.md")
        : path.join(root, `bench/competitors/${condition.slice(3)}.md`);
    const raw = await readFile(source, "utf8");
    await writeFile(path.join(dir, "CLAUDE.md"), raw.replace(/^<!--[\s\S]*?-->\n/, ""));
  }
  git(dir, "init", "-q", "-b", "main");
  git(dir, "add", "-A");
  git(dir, "-c", "user.name=bench", "-c", "user.email=bench@local", "commit", "-q", "-m", "baseline");
  const configDir = await mkdtemp(path.join(base, "config-"));
  return { dir, configDir };
}
