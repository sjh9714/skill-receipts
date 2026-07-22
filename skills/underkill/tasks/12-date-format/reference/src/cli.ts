// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
const d = new Date(process.argv[2]);
const pad = (n: number): string => String(n).padStart(2, "0");
console.log(
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`,
);
