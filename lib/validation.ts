/**
 * Quote-form checks. The same functions run in the browser (messages under each field) and again on the server
 * (app/api/enquiry/route.ts), so nothing the browser lets through is rejected later, and nothing the server accepts
 * skipped a check. Each check returns a message, or "" when the value is fine. Copy is polite and says how to fix it.
 */

const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_MOBILE = /^[6-9]\d{9}$/;
const INDIAN_LANDLINE = /^[1-5]\d{9}$/; // STD code + number, e.g. 0129 xxxxxxx written without the 0
const INTERNATIONAL = /^\+[1-9]\d{7,14}$/;

/** Common slips in email domains, so "gmial.com" gets a nudge instead of a bounced reply. */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gamil.com": "gmail.com", "gmal.com": "gmail.com", "gmai.com": "gmail.com",
  "gmail.co": "gmail.com", "gmail.con": "gmail.com", "gmail.cm": "gmail.com",
  "yahoo.con": "yahoo.com", "yaho.com": "yahoo.com", "yahoo.co": "yahoo.com",
  "hotmail.con": "hotmail.com", "hotmial.com": "hotmail.com", "outlook.con": "outlook.com", "outlok.com": "outlook.com",
  "rediffmail.con": "rediffmail.com",
};

export const LIMITS = { name: 120, company: 160, email: 200, phone: 20, product: 120, quantity: 120, message: 3000 };

/** Trims and collapses inner whitespace ("  Raj   Kumar " → "Raj Kumar"). */
export const tidy = (v: string) => v.trim().replace(/\s+/g, " ");

export function checkName(raw: string) {
  const v = tidy(raw);
  if (!v) return "Please add your name so we know who to reply to.";
  if (/\d/.test(v)) return "Names don’t usually have numbers. Letters only, please.";
  if (!NAME.test(v)) return "Letters, spaces and . ' - only, please.";
  if (v.replace(/[^\p{L}]/gu, "").length < 2) return "That’s a little short. Your full name, please.";
  if (v.length > LIMITS.name) return "That name is too long for our form.";
  return "";
}

/**
 * Accepts Indian mobiles (98765 43210, 098765 43210, +91 98765 43210, 0091…), Indian landlines with STD code
 * (0129 2345678) and foreign numbers with a + code. Returns the number in international form, or null.
 */
export function normalisePhone(raw: string): string | null {
  const v = raw.trim().replace(/[\s()./_-]/g, "").replace(/^00(?=[1-9])/, "+");
  const indian = (local: string) => (INDIAN_MOBILE.test(local) || INDIAN_LANDLINE.test(local) ? `+91${local}` : null);
  if (v.startsWith("+91")) return indian(v.slice(3));
  if (v.startsWith("+")) return INTERNATIONAL.test(v) ? v : null;
  if (!/^\d+$/.test(v)) return null;
  const local = v.length === 12 && v.startsWith("91") ? v.slice(2) : v.length === 11 && v.startsWith("0") ? v.slice(1) : v;
  return indian(local);
}

export function checkPhone(raw: string) {
  const v = raw.trim();
  if (!v) return "Please add a phone number so we can call you back about the quote.";
  if (normalisePhone(v)) return "";
  if (/[a-z]/i.test(v)) return "Phone numbers are digits only, like 98765 43210.";
  if (!v.startsWith("+")) {
    const local = v.replace(/\D/g, "").replace(/^(?:91(?=\d{10}$)|0(?=\d{10}$))/, "");
    if (local.length !== 10) return `A phone number has 10 digits (with STD code for a landline); this one has ${local.length}.`;
  }
  return "That number won’t connect. Use a 10-digit number, or the full number with its country code (e.g. +44…).";
}

export function checkEmail(raw: string) {
  const v = raw.trim().toLowerCase();
  if (!v) return ""; // optional: some buyers prefer a call
  if (!EMAIL.test(v) || v.length > LIMITS.email) return "That email doesn’t look right. It should look like name@company.com.";
  const [user, domain] = v.split("@");
  const fix = DOMAIN_TYPOS[domain];
  if (fix) return `Did you mean ${user}@${fix}?`;
  return "";
}

export function checkMessage(raw: string) {
  const v = tidy(raw);
  if (!v) return "Tell us a little about the part you need: size, material, finish. One line is enough.";
  if (v.length < 3) return "A few more words, please.";
  if (v.length > LIMITS.message) return `Please keep it under ${LIMITS.message} characters; we can go into detail on the call.`;
  return "";
}

/** Optional free-text fields: only a length check. */
export const checkLength = (max: number) => (raw: string) => (tidy(raw).length > max ? `Please keep this under ${max} characters.` : "");
