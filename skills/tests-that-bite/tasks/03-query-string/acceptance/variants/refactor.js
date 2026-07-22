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
  const decode = (token) => {
    const plused = token.split("+").join(" ");
    try {
      return decodeURIComponent(plused);
    } catch {
      return plused;
    }
  };
  return (qs.startsWith("?") ? qs.slice(1) : qs)
    .split("&")
    .filter((segment) => segment.length > 0)
    .map((segment) => {
      const eq = segment.indexOf("=");
      return eq === -1
        ? [decode(segment), ""]
        : [decode(segment.slice(0, eq)), decode(segment.slice(eq + 1))];
    })
    .reduce((result, [key, value]) => {
      if (key in result) {
        result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
      } else {
        result[key] = value;
      }
      return result;
    }, {});
}
