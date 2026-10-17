import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { CtaBand, PageHero } from "@/components/blocks";
import { PRODUCTS, product as findProduct } from "@/content/products";
import { SITE, tel } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = findProduct((await params).slug);
  return p ? { title: p.name, description: p.short, openGraph: { images: [p.image] } } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const p = findProduct((await params).slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHero title={p.name} label={`Item ${p.item}${p.flagship ? " · Our speciality" : ""}`} subtitle={p.short}
                crumbs={[{ label: "Products", href: "/products" }, { label: p.name }]} />

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
              {/* Photo on a drawing sheet, with a callout. */}
              <figure>
                <div className="crop-marks">
                  <div className="drawing-grid relative aspect-square overflow-hidden rounded-md border border-line bg-white">
                    <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 768px) 30vw, 100vw" className="object-contain p-8 mix-blend-multiply" />
                    <span className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-full border-2 border-accent bg-white font-mono text-sm font-semibold text-accent">{p.item}</span>
                  </div>
                </div>
                <figcaption className="tag mt-3 text-slate-500">Representative photo · made to your specification</figcaption>
              </figure>

              {/* Specification as a drawing title block. */}
              <div>
                <p className="tag text-accent">What it does</p>
                <p className="mt-2 font-display text-xl font-semibold text-ink">{p.role}</p>
                <table className="mt-6 w-full border border-ink text-sm">
                  <caption className="tag bg-ink px-3 py-2 text-left text-white">Specification</caption>
                  <tbody>
                    {p.specs.map(([k, v]) => (
                      <tr key={k} className="border-t border-ink/20">
                        <th scope="row" className="tag w-32 bg-paper px-3 py-3 text-left align-top text-slate-500">{k}</th>
                        <td className="px-3 py-3 font-medium text-ink">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-12 text-xl leading-relaxed text-ink">{p.intro}</p>

            <h2 className="mt-12 text-3xl font-semibold">Features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.features.map((x) => (
                <li key={x} className="flex gap-3 rounded-lg border border-line bg-white p-4">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white"><Check className="size-3.5" /></span>
                  <span className="text-slate-700">{x}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">How we make it</h2>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {p.process.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-md border border-ink/20 bg-white px-3 py-2">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold text-ink">{step}</span>
                  </span>
                  {i < p.process.length - 1 && <span className="text-slate-400" aria-hidden>→</span>}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-slate-600">
              Every batch is checked against your drawing before it is packed. Tools are sharpened and maintained in-house,
              so the hundredth part matches the first.
            </p>

            <h2 className="mt-12 text-3xl font-semibold">For a quotation, send us</h2>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {[
                ["A drawing or sample", "PDF, photo with dimensions, or a part we can measure"],
                ["Material and thickness", "If you have a preference; we can suggest one"],
                ["Finish", "Plating, painting or plain, as your fan needs"],
                ["Quantity", "Per order or per month"],
              ].map(([title, note]) => (
                <li key={title} className="bg-white p-5">
                  <span className="block font-semibold text-ink">{title}</span>
                  <span className="text-sm text-slate-500">{note}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl font-semibold">Other components</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/products/${r.slug}`} className="group flex h-full items-center gap-3 rounded-lg border border-line bg-white p-3 hover:border-ink">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded bg-white">
                      <Image src={r.image} alt="" fill sizes="56px" className="object-contain" />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-ink group-hover:text-accent">{r.name}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-slate-300 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="overflow-hidden rounded-lg bg-steel shadow-2xl shadow-steel/20 lg:sticky lg:top-28 lg:self-start">
            <div className="hazard h-1.5" aria-hidden />
            <div className="p-6">
              <EnquiryForm dark compact title={`Quote for ${p.name.toLowerCase()}`} subtitle="Tell us the size and quantity; we’ll call you back."
                           source={`Product page: ${p.name}`} product={p.name} submitLabel="Request a quote" />
              <div className="mt-5 border-t border-dashed border-white/15 pt-4 text-sm text-white/80">
                <p className="tag mb-2 text-white/50">Prefer to call?</p>
                {SITE.phones.map((ph) => (
                  <a key={ph} href={tel(ph)} className="flex items-center gap-2 py-0.5 hover:text-white"><Phone className="size-4" />{ph}</a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title={`Talk to us about ${p.name.toLowerCase()}`} product={p.name} />
    </>
  );
}
