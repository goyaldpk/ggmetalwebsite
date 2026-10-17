import { LIMITS, checkEmail, checkLength, checkMessage, checkName, checkPhone } from "@/lib/validation";

/** What the quote form sends to /api/enquiry. */
export type Enquiry = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  product?: string;
  quantity?: string;
  message: string;
  /** Which form on which page, so the email says where it came from. */
  source: string;
  website?: string; // honeypot
};

export type EnquiryField = "name" | "company" | "phone" | "email" | "product" | "quantity" | "message";

/** One rule per field, shared by the browser form and the server route. */
export const CHECKS: Record<EnquiryField, (v: string) => string> = {
  name: checkName,
  company: checkLength(LIMITS.company),
  phone: checkPhone,
  email: checkEmail,
  product: checkLength(LIMITS.product),
  quantity: checkLength(LIMITS.quantity),
  message: checkMessage,
};

/** The error body /api/enquiry returns: a message to show, and per-field messages when the input was the problem. */
export type EnquiryError = { error: string; fields?: Partial<Record<EnquiryField, string>> };

export class EnquiryFailed extends Error {
  constructor(message: string, readonly fields: EnquiryError["fields"] = {}) {
    super(message);
  }
}

export async function submitEnquiry(e: Enquiry): Promise<void> {
  const offline = "Looks like the connection dropped. Check your internet and try again, or just give us a call.";
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e),
  }).catch(() => {
    throw new Error(offline);
  });
  if (res.ok) return;
  const body: Partial<EnquiryError> = await res.json().catch(() => ({}));
  throw new EnquiryFailed(body.error ?? "We couldn’t send your enquiry just now. Please try again in a minute, or call us.", body.fields);
}
