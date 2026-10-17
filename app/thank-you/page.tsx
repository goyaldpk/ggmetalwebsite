import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileImage, MessageCircle, Phone } from "lucide-react";
import { SITE, tel } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Where every enquiry form lands once the email has been sent. */
export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const name = first((await searchParams).name)?.slice(0, 40);
  const card = "rounded-lg bg-white p-5 ring-1 ring-line";
  return (
    <section className="drawing-grid">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-11 text-emerald-600" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Thank you{name ? `, ${name}` : ""}!</h1>
        <p className="mt-4 text-lg text-slate-600">
          We have received your enquiry and will get back to you soon.
        </p>
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          <div className={card}>
            <FileImage className="size-6 text-accent" />
            <p className="mt-2 text-sm font-semibold">Have a drawing?</p>
            <a href={`mailto:${SITE.email}`} className="text-xs break-all text-slate-500 hover:text-accent">Email it to {SITE.email}</a>
          </div>
          <div className={card}>
            <MessageCircle className="size-6 text-emerald-600" />
            <p className="mt-2 text-sm font-semibold">Or a photo?</p>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-accent">Send it on WhatsApp</a>
          </div>
          <div className={card}>
            <Phone className="size-6 text-accent" />
            <p className="mt-2 text-sm font-semibold">In a hurry?</p>
            <a href={tel(SITE.phones[0])} className="text-xs text-slate-500 hover:text-accent">Call {SITE.phones[0]}</a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-accent">Back to home</Link>
          <Link href="/products" className="rounded-md border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-ink">Browse products</Link>
        </div>
      </div>
    </section>
  );
}
