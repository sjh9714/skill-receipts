// CLI error formatting.
export function formatError(kind, detail) {
  switch (kind) {
    case "unknown-option":
      return `Uknown option: ${detail}`;
    case "missing-value":
      return `Missing value for option: ${detail}`;
    case "duplicate-option":
      return `Duplicate option: ${detail}`;
    default:
      return `Error: ${detail}`;
  }
}
