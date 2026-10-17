"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { FieldError, invalid, useFormChecks } from "@/components/FormChecks";
import { PRODUCTS } from "@/content/products";
import { CHECKS, EnquiryFailed, submitEnquiry, type EnquiryField } from "@/lib/enquiry";
import { LIMITS } from "@/lib/validation";

export const OTHER_PART = "Custom sheet metal part";

/**
 * The quote / contact form. It emails the enquiry to the business (app/api/enquiry/route.ts), then shows the
 * thank-you page. `compact` drops the optional company and quantity fields (side cards).
 */
export default function EnquiryForm({ title, subtitle, source, product, compact = false, dark = false, submitLabel = "Send enquiry" }: {
  title?: string;
  subtitle?: string;
  source: string;
  /** Pre-selected product. */
  product?: string;
  compact?: boolean;
  dark?: boolean;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fields: EnquiryField[] = compact
    ? ["name", "phone", "email", "product", "message"]
    : ["name", "company", "phone", "email", "product", "quantity", "message"];
  const has = (x: EnquiryField) => fields.includes(x);
  const checks = useFormChecks(Object.fromEntries(fields.map((x) => [x, CHECKS[x]])));
  const options = [...PRODUCTS.map((p) => p.name), OTHER_PART];
  const selected = product && !options.includes(product) ? OTHER_PART : product;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!checks.validate(e.currentTarget)) return;
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setBusy(true);
    try {
      await submitEnquiry({
        name: f.name, company: f.company, phone: f.phone, email: f.email, product: f.product,
        quantity: f.quantity, message: f.message, source, website: f.website,
      });
      router.push(`/thank-you?name=${encodeURIComponent(f.name.trim().split(/\s+/)[0])}`);
    } catch (err) {
      const bad = err instanceof EnquiryFailed ? Object.entries(err.fields ?? {}) : [];
      bad.forEach(([field, message]) => message && checks.setError(field, message));
      if (!bad.length) setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  const input = `w-full rounded-md border px-3.5 py-3 text-sm outline-none transition focus:ring-4 ${
    dark
      ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/10"
      : "border-line bg-white text-ink placeholder:text-slate-400 focus:border-ink focus:ring-ink/5"
  }`;
  const label = `tag mb-1.5 block ${dark ? "text-white/60" : "text-slate-500"}`;
  const props = (x: EnquiryField) => ({ ...checks.field(x), className: `${input} ${invalid(!!checks.errors[x], dark)}` });

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {title && (
        <div className="sm:col-span-2">
          <h3 className={`text-2xl font-semibold ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
          {subtitle && <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-slate-500"}`}>{subtitle}</p>}
        </div>
      )}
      <label className={has("company") ? "" : "sm:col-span-2"}><span className={label}>Your name *</span>
        <input {...props("name")} required maxLength={LIMITS.name} autoComplete="name" />
        <FieldError {...checks.error("name")} dark={dark} />
      </label>
      {has("company") && (
        <label><span className={label}>Company</span>
          <input {...props("company")} maxLength={LIMITS.company} autoComplete="organization" />
          <FieldError {...checks.error("company")} dark={dark} />
        </label>
      )}
      <label><span className={label}>Phone *</span>
        <input {...props("phone")} type="tel" inputMode="tel" required maxLength={LIMITS.phone} autoComplete="tel" placeholder="98765 43210" />
        <FieldError {...checks.error("phone")} dark={dark} />
      </label>
      <label><span className={label}>Email</span>
        <input {...props("email")} type="email" maxLength={LIMITS.email} autoComplete="email" placeholder="name@company.com" />
        <FieldError {...checks.error("email")} dark={dark} />
      </label>
      <label className={has("quantity") ? "" : "sm:col-span-2"}><span className={label}>Product</span>
        <select {...props("product")} defaultValue={selected ?? ""}>
          <option value="">Choose a product (optional)</option>
          {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
        </select>
        <FieldError {...checks.error("product")} dark={dark} />
      </label>
      {has("quantity") && (
        <label><span className={label}>Quantity</span>
          <input {...props("quantity")} maxLength={LIMITS.quantity} placeholder="e.g. 10,000 pcs / month" />
          <FieldError {...checks.error("quantity")} dark={dark} />
        </label>
      )}
      <label className="sm:col-span-2"><span className={label}>Requirement *</span>
        <textarea {...props("message")} required rows={compact ? 3 : 4} maxLength={LIMITS.message}
                  placeholder="Part, size, material, finish… Mention if you can share a drawing or sample." />
        <FieldError {...checks.error("message")} dark={dark} />
      </label>
      {/* Honeypot: hidden from people, bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-0 w-0" />
      {error && <p className={`text-sm font-medium sm:col-span-2 ${dark ? "text-rose-200" : "text-red-600"}`} role="alert">{error}</p>}
      <button type="submit" disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60 sm:col-span-2">
        <Send className="size-4" /> {busy ? "Sending…" : submitLabel}
      </button>
      <p className={`text-xs sm:col-span-2 ${dark ? "text-white/60" : "text-slate-400"}`}>
        Your enquiry comes straight to our inbox. Drawings and photos can follow by email or WhatsApp.
      </p>
    </form>
  );
}
