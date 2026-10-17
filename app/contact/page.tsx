import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { PageHero, Section } from "@/components/blocks";
import { SITE, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: `Request a quote for ceiling fan components or custom sheet metal parts. ${SITE.address}.`,
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const product = first((await searchParams).product);
  const card = "rounded-lg border border-line bg-white p-6";

  return (
    <>
      <PageHero title="Contact us" crumbs={[{ label: "Contact" }]} label="Let’s work together"
                subtitle="Ask for a quotation, send a drawing, or visit our works in Faridabad." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-5">
            <div className={card}>
              <UserRound className="size-7 text-accent" />
              <h2 className="mt-3 text-lg font-bold">{SITE.founder}</h2>
              <p className="text-slate-600">{SITE.founderRole}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className={card}>
                <Phone className="size-7 text-accent" />
                <h2 className="mt-3 text-lg font-bold">Call</h2>
                {SITE.phones.map((p) => <a key={p} href={tel(p)} className="block text-slate-600 hover:text-accent">{p}</a>)}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1.5 text-sm text-emerald-700 hover:underline">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
              <div className={card}>
                <Mail className="size-7 text-accent" />
                <h2 className="mt-3 text-lg font-bold">Email</h2>
                <a href={`mailto:${SITE.email}`} className="break-all text-slate-600 hover:text-accent">{SITE.email}</a>
              </div>
            </div>
            <div className={card}>
              <MapPin className="size-7 text-accent" />
              <h2 className="mt-3 text-lg font-bold">Works address</h2>
              <p className="text-slate-600">{SITE.address}</p>
              <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                Open in Google Maps <ExternalLink className="size-3.5" />
              </a>
            </div>
            <iframe title={`Map to ${SITE.name}, Faridabad`} loading="lazy" className="h-72 w-full rounded-lg border border-line"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${SITE.name}, ${SITE.address}`)}&output=embed`} />
          </div>

          <div id="quote" className="scroll-mt-32 self-start overflow-hidden rounded-lg border border-ink bg-white shadow-xl shadow-steel/10">
            <div className="flex items-center justify-between bg-ink px-6 py-3">
              <span className="tag text-white">Request for quotation</span>
              <span className="tag text-sun">RFQ</span>
            </div>
            <div className="p-6 sm:p-8">
              <EnquiryForm key={product} title="Request a quote" product={product}
                           subtitle="Tell us the part, quantity and finish. We’ll get back to you with a quotation."
                           source={product ? `Contact page (${product})` : "Contact page"} submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
