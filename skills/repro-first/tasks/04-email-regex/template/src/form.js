import { isValidEmail } from "./validate.js";

// Signup form helper: normalizes then validates the email field.
export function signupEmailError(raw) {
  const email = raw.trim().toLowerCase();
  return isValidEmail(email) ? null : "Please enter a valid email address.";
}
