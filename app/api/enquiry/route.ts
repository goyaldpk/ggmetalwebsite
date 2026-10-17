import { CHECKS, type EnquiryError, type EnquiryField } from "@/lib/enquiry";
import { mailConfigured, sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";
import { normalisePhone, tidy } from "@/lib/validation";

/**
 * Quote / contact form → email to the business mailbox. Checks the input again (the browser's checks can be skipped),
 * drops bot submissions (honeypot), and limits each address to a few enquiries in a short time.
 */

const FIELDS = Object.keys(CHECKS) as EnquiryField[];
const MAX_BODY = 16_000;

// Best effort: one serverless instance's memory. Enough to stop a form being hammered from one address.
const WINDOW_MS = 10 * 60_000;
const PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > PER_WINDOW;
}

const fail = (status: number, body: EnquiryError) => Response.json(body, { status });

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return fail(413, { error: "That message is too long. Please shorten it, or call us." });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, { error: "We couldn’t read the form. Please refresh the page and try again." });
  }
  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");

  // Bots fill the hidden field: pretend it worked so they do not retry.
  if (str("website")) return Response.json({ ok: true });

  const fields: Partial<Record<EnquiryField, string>> = {};
  for (const f of FIELDS) {
    const message = CHECKS[f](str(f));
    if (message) fields[f] = message;
  }
  if (Object.keys(fields).length) return fail(400, { error: "Please check the highlighted fields.", fields });

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return fail(429, { error: `We’ve had several enquiries from you in the last few minutes. Please wait a little, or call ${SITE.phones[0]}.` });
  }

  const e = {
    name: tidy(str("name")),
    company: tidy(str("company")),
    phone: normalisePhone(str("phone")) ?? tidy(str("phone")),
    email: str("email").trim().toLowerCase(),
    product: tidy(str("product")),
    quantity: tidy(str("quantity")),
    message: str("message").trim(),
    source: tidy(str("source")).slice(0, 120) || "Website",
  };

  const rows: [string, string][] = [
    ["Name", e.name], ["Company", e.company], ["Phone", e.phone], ["Email", e.email],
    ["Product", e.product], ["Quantity", e.quantity], ["Form", e.source],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const subject = `Website enquiry: ${e.product || "General"} – ${e.name}${e.company ? ` (${e.company})` : ""}`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${e.message}\n`;
  const html = `
    <table cellpadding="6" style="border-collapse:collapse;font:14px Arial,sans-serif">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><b>${escape(v)}</b></td></tr>`).join("")}
    </table>
    <p style="font:14px Arial,sans-serif;white-space:pre-wrap">${escape(e.message)}</p>
    <p style="font:12px Arial,sans-serif;color:#888">Sent from the quote form on ${SITE.url}. Reply to this email to answer ${escape(e.name)}${e.email ? "" : " (no email given: call them)"}.</p>`;

  if (!mailConfigured) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without SMTP settings: show what would have been sent.
      console.info(`[enquiry] SMTP not configured; would send:\n${subject}\n${text}`);
      return Response.json({ ok: true });
    }
    console.error("[enquiry] SMTP is not configured; enquiry not sent");
    return fail(503, { error: `Our form is down for a moment. Please call ${SITE.phones[0]} or email ${SITE.email}.` });
  }

  try {
    await sendMail({ subject, text, html, replyTo: e.email || undefined });
  } catch (err) {
    console.error("[enquiry] sending failed", err);
    return fail(502, { error: `We couldn’t send your enquiry just now. Please try again, or call ${SITE.phones[0]}.` });
  }
  return Response.json({ ok: true });
}
