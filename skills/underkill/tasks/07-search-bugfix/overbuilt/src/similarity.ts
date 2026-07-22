export function similarity(a: string, b: string): number {
  return a.toLowerCase().startsWith(b.toLowerCase()) ? b.length / a.length : 0;
}
