import "server-only";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

/**
 * Sends website enquiries to the business mailbox over SMTP (settings in README / .env.example). Works with any
 * provider: Gmail (an app password), Zoho, or the domain's own mail server.
 */
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, ENQUIRY_FROM } = process.env;

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

const port = Number(SMTP_PORT || 465);

const transport = mailConfigured
  ? nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : null;

export async function sendMail({ subject, text, html, replyTo }: { subject: string; text: string; html: string; replyTo?: string }) {
  if (!transport) throw new Error("SMTP is not configured");
  await transport.sendMail({
    from: { name: `${SITE.name} website`, address: ENQUIRY_FROM || SMTP_USER! },
    to: ENQUIRY_TO || SITE.email,
    replyTo,
    subject,
    text,
    html,
  });
}
