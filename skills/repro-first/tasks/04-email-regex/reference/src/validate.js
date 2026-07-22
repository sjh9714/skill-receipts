// Validate an email address for signup.
//
// Accepts name@domain where the domain is dot-separated labels of letters,
// digits, or hyphens, ending in a 2+ letter TLD. Labels must be NON-EMPTY —
// consecutive dots are invalid. The local part is any non-space, non-@ text.
export function isValidEmail(input) {
  return /^[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(input);
}
