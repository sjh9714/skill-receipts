// Parse simple KEY=VALUE configuration text.
// Lines starting with # and blank lines are ignored; the first "=" splits
// key from value; both are trimmed; lines without "=" are skipped.
export function parseConfig(text) {
  const cfg = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    cfg[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return cfg;
}
