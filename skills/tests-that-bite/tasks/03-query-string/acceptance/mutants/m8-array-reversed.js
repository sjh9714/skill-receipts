// Parse a URL query string into a plain object.
//
// parseQuery(qs)
//   qs: a query string, with or without a leading "?".
//   Returns an object mapping keys to values:
//   - pairs are separated by "&"; empty segments ("a=1&&b=2") are skipped
//   - a key that appears once maps to its string value
//   - a key that appears multiple times maps to an array of its values,
//     in order of appearance
//   - a bare key with no "=" maps to "" ("flag" -> { flag: "" })
//   - "+" decodes to a space in both keys and values, then keys and values
//     are percent-decoded (decodeURIComponent)
//   - if percent-decoding fails for a token, the raw token (after "+"
//     replacement) is used as-is — never throws
export function parseQuery(qs) {
  const stripped = qs.startsWith("?") ? qs.slice(1) : qs;
  const result = {};
  for (const segment of stripped.split("&")) {
    if (segment === "") continue;
    const eq = segment.indexOf("=");
    const rawKey = eq === -1 ? segment : segment.slice(0, eq);
    const rawValue = eq === -1 ? "" : segment.slice(eq + 1);
    const key = decode(rawKey);
    const value = decode(rawValue);
    if (key in result) {
      if (Array.isArray(result[key])) {
        result[key].unshift(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

function decode(token) {
  const plused = token.replaceAll("+", " ");
  try {
    return decodeURIComponent(plused);
  } catch {
    return plused;
  }
}
