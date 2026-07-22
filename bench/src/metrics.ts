import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Project } from "ts-morph";
import type { Task } from "./types.js";

// Scope metrics from `git diff` against the baseline commit. This module
// produces the evidence behind the headline claim, so it stays pure enough to
// unit-test against fixture repos (that is what CI checks).

export interface ScopeMetrics {
  locAddedSrc: number;
  locAddedTest: number;
  filesCreated: number;
  depsAdded: string[];
  exportedSymbols: number;
  trapsTriggered: string[];
}

// Comment stripping is string-literal aware: a URL inside a string must not
// start a "line comment", and trap regexes must never fire on comment text.
export function stripComments(src: string): string {
  let out = "";
  let i = 0;
  let state: "code" | "line" | "block" | "single" | "double" | "template" = "code";
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (state === "code") {
      if (c === "/" && n === "/") { state = "line"; i += 2; continue; }
      if (c === "/" && n === "*") { state = "block"; i += 2; continue; }
      if (c === "'") state = "single";
      else if (c === '"') state = "double";
      else if (c === "`") state = "template";
      out += c;
      i++;
    } else if (state === "line") {
      if (c === "\n") { state = "code"; out += c; }
      i++;
    } else if (state === "block") {
      if (c === "*" && n === "/") { state = "code"; i += 2; } else i++;
    } else {
      if (c === "\\") { out += c + (n ?? ""); i += 2; continue; }
      const close = state === "single" ? "'" : state === "double" ? '"' : "`";
      if (c === close) state = "code";
      out += c;
      i++;
    }
  }
  return out;
}

const isCodeFile = (p: string) => /\.[cm]?[jt]sx?$/.test(p);
const isTestFile = (p: string) =>
  /(^|\/)(test|tests|__tests__)\//.test(p) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(p);

function globToRegex(glob: string): RegExp {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += glob[i + 2] === "/" ? "(?:.*/)?" : ".*";
        i += glob[i + 2] === "/" ? 2 : 1;
      } else {
        re += "[^/]*";
      }
    } else if ("\\^$.|?+()[]{}".includes(c)) {
      re += "\\" + c;
    } else {
      re += c;
    }
  }
  return new RegExp(`^${re}$`);
}

function* walk(dir: string, rel = ""): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) yield* walk(path.join(dir, entry.name), relPath);
    else yield relPath;
  }
}

function git(dir: string, ...args: string[]): string {
  return execFileSync("git", ["-C", dir, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function depNames(pkgJson: string): Set<string> {
  try {
    const pkg = JSON.parse(pkgJson);
    return new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ]);
  } catch {
    return new Set();
  }
}

export async function collectMetrics(dir: string, task: Task): Promise<ScopeMetrics> {
  git(dir, "add", "-A");
  const numstat = git(dir, "diff", "--cached", "HEAD", "--numstat");
  let locAddedSrc = 0;
  let locAddedTest = 0;
  for (const line of numstat.split("\n")) {
    const [added, , file] = line.split("\t");
    if (!file || added === "-" || !isCodeFile(file)) continue;
    if (isTestFile(file)) locAddedTest += Number(added);
    else locAddedSrc += Number(added);
  }

  const nameStatus = git(dir, "diff", "--cached", "HEAD", "--name-status");
  const changedFiles = nameStatus
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("\t").at(-1)!);
  const filesCreated = nameStatus
    .split("\n")
    .filter((l) => l.startsWith("A\t")).length;

  let baselinePkg = "";
  try {
    baselinePkg = git(dir, "show", "HEAD:package.json");
  } catch {}
  const before = depNames(baselinePkg);
  const after = depNames(readFileSync(path.join(dir, "package.json"), "utf8"));
  const depsAdded = [...after].filter((d) => !before.has(d));

  const project = new Project({ compilerOptions: { allowJs: true } });
  project.addSourceFilesAtPaths([
    path.join(dir, "src/**/*.{ts,tsx,js,jsx}"),
  ]);
  let exportedSymbols = 0;
  for (const file of project.getSourceFiles()) {
    if (isTestFile(path.relative(dir, file.getFilePath()))) continue;
    exportedSymbols += file.getExportedDeclarations().size;
  }

  const trapsTriggered: string[] = [];
  for (const trap of task.traps) {
    const d = trap.detect;
    let hit = false;
    if (d.type === "regex") {
      const re = new RegExp(d.pattern);
      const fileRe = globToRegex(d.glob);
      for (const rel of walk(dir)) {
        if (!fileRe.test(rel)) continue;
        if (re.test(stripComments(readFileSync(path.join(dir, rel), "utf8")))) {
          hit = true;
          break;
        }
      }
    } else if (d.type === "deps-added") {
      hit = depsAdded.length > 0;
    } else if (d.type === "exports-gt") {
      hit = exportedSymbols > d.max;
    } else {
      // touches-outside: agent-written test files are exempt by design — tests
      // are never counted as out-of-scope (their LOC is tracked separately)
      const allowed = d.allow.map(globToRegex);
      hit = changedFiles.some(
        (file) => !isTestFile(file) && !allowed.some((re) => re.test(file)),
      );
    }
    if (hit) trapsTriggered.push(trap.name);
  }

  return { locAddedSrc, locAddedTest, filesCreated, depsAdded, exportedSymbols, trapsTriggered };
}
