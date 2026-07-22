`src/format.ts` contains a timestamp formatter.

Add a function `formatRelative(ms, nowMs)` that describes how long ago `ms`
was, relative to `nowMs` (both epoch milliseconds, `ms` is never after
`nowMs`): under 60 seconds → `"<n>s ago"`, under 60 minutes → `"<n>m ago"`,
under 24 hours → `"<n>h ago"` (each `<n>` floored), and for 24 hours or more
return `formatTimestamp(ms)` unchanged.

Export `formatRelative` from `src/format.ts`. Change nothing else.
