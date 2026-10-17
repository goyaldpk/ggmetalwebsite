import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Factory, IndianRupee, Mail, MapPin, Phone, Plus, Shuffle, Wrench } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { Feature, FramedPhoto, ProductCard, Section, SectionTitle } from "@/components/blocks";
import { FAQ, MACHINES, MATERIALS, OPERATIONS, ROUTE, WHY_US } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { CLIENTS, SITE, YEARS, enquire, tel } from "@/lib/site";

const WHY_ICONS = [<Clock key="c" />, <BadgeCheck key="b" />, <IndianRupee key="i" />, <Shuffle key="s" />, <Factory key="f" />];

const STATS = [
  [`${YEARS}+`, "Years in sheet metal", `Since ${SITE.founded}`],
  ["10–75 T", "Power press range", "With automatic feeders"],
  [String(PRODUCTS.length), "Core fan components", "Made to drawing"],
  [String(CLIENTS.length), "Fan brands supplied", "And growing"],
];

/** Decorative power press: the ram strokes up and down (CSS, off under reduced motion). */
function PressIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="10" y="4" width="44" height="10" rx="2" className="fill-ink" />
      <rect x="12" y="14" width="6" height="40" className="fill-brand" />
      <rect x="46" y="14" width="6" height="40" className="fill-brand" />
      <g className="press-ram"><rect x="24" y="14" width="16" height="14" rx="1" className="fill-accent" /></g>
      <rect x="20" y="46" width="24" height="4" className="fill-slate-400" />
      <rect x="6" y="54" width="52" height="6" rx="1" className="fill-ink" />
    </svg>
  );
}

export default function Home() {
  const [flagship, ...others] = [...PRODUCTS].sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship));
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="drawing-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-10 pb-16 lg:grid-cols-[1.15fr_1fr] lg:pt-16 lg:pb-24">
          <div>
            <p className="tag inline-flex items-center gap-2 rounded-md border border-line bg-white py-1.5 pr-3 pl-1.5 text-ink">
              <PressIcon className="size-6" /> Sheet metal components · {SITE.city} · Est. {SITE.founded}
            </p>
            <h1 className="mt-6 text-[2.6rem] leading-[0.98] font-semibold sm:text-6xl xl:text-7xl">
              Ceiling fan hangers,{" "}
              <span className="relative whitespace-nowrap text-accent">
                pressed right
                <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full text-sun" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 8 L298 8" stroke="currentColor" strokeWidth="5" />
                </svg>
              </span>{" "}
              since {SITE.founded}.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
              {SITE.name} is a family-owned sheet metal manufacturer. We make shackle (fan hanger) assemblies, safety
              wires, down rods and blade shanks for ceiling fan makers: cut, punched, stamped and bent on our own power
              presses, to your drawing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={enquire()} className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent">
                Request a quote <ArrowRight className="size-4" />
              </Link>
              <Link href="/products" className="rounded-md border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink">
                See our products
              </Link>
            </div>

            {/* Title block, as in the corner of an engineering drawing. */}
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px border border-ink bg-ink text-sm sm:grid-cols-4">
              {[["Est.", String(SITE.founded)], ["Presses", "10–75 T"], ["Material", "MS / HR"], ["Works", "Faridabad"]].map(([k, v]) => (
                <div key={k} className="bg-white px-3 py-2.5">
                  <dt className="tag text-[10px]! text-slate-500">{k}</dt>
                  <dd className="font-display text-lg font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <FramedPhoto src="/images/factory-press-line.jpg" alt="Row of power presses on the G.G Metal Works shop floor"
                         caption="Our press shop · Faridabad" priority sizes="(min-width: 1024px) 40vw, 90vw"
                         className="ml-auto aspect-[4/5] w-[85%]" />
            <Link href={`/products/${flagship.slug}`}
                  className="group absolute bottom-8 left-0 flex w-56 flex-col overflow-hidden rounded-md border border-ink bg-white shadow-2xl shadow-steel/25 transition hover:-translate-y-1 sm:w-64">
              <div className="drawing-grid relative aspect-[4/3]">
                <Image src={flagship.image} alt={flagship.name} fill sizes="256px" className="object-contain p-3 mix-blend-multiply" />
                <span className="absolute top-2 left-2 flex size-8 items-center justify-center rounded-full border-2 border-accent bg-white font-mono text-[11px] font-semibold text-accent">{flagship.item}</span>
              </div>
              <div className="border-t border-ink px-3 py-2.5">
                <p className="tag text-[10px]! text-accent">Our speciality</p>
                <p className="text-sm font-semibold text-ink group-hover:text-accent">{flagship.name} →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Clients ─────────────────────────────────────────── */}
      <section aria-label="Clients" className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-7 text-center">
          <p className="tag text-slate-500">Supplying fan makers including</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {CLIENTS.map((c) => (
              <li key={c} className="font-display text-base font-bold tracking-tight whitespace-nowrap text-slate-400 uppercase sm:text-lg">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────────── */}
      <Section id="products">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="Product range" title={<>Every part between<br />the ceiling and the blade.</>}
                        intro="We specialise in ceiling fan components: the parts that hang a fan safely and hold its blades true." />
          <Link href="/products" className="tag mb-10 inline-flex shrink-0 items-center gap-1 text-accent hover:underline lg:mb-14">
            All products <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <div className="sm:col-span-2 lg:row-span-2"><ProductCard p={flagship} large /></div>
          {others.map((p, i) => (
            <div key={p.slug} className={i === 2 ? "sm:col-span-2" : ""}><ProductCard p={p} /></div>
          ))}
        </div>
      </Section>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-steel">
        <div className="drawing-grid absolute inset-0 opacity-40 [filter:invert(1)]" aria-hidden />
        <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {STATS.map(([n, label, note]) => (
            <div key={label} className="flex flex-col bg-steel px-6 py-10">
              <dd className="font-display text-5xl font-semibold text-white">{n}</dd>
              <dt className="mt-2 font-semibold text-white/85">{label}</dt>
              <span className="tag mt-1 text-sun">{note}</span>
            </div>
          ))}
        </dl>
      </section>

      {/* ── From coil to crate ─────────────────────────────── */}
      <Section id="process">
        <SectionTitle eyebrow="How a part is made" title="From coil to crate, under one roof."
                      intro="Everything from feeding the coil to packing the finished part happens in our own shop, with our own tools." />
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          <span className="absolute top-5 right-8 left-8 hidden border-t-2 border-dashed border-ink/25 lg:block" aria-hidden />
          {ROUTE.map(([title, text], i) => (
            <li key={title} className="relative">
              <span className="relative flex size-10 items-center justify-center rounded-full border-2 border-accent bg-paper font-mono text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Factory ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-5">
            <FramedPhoto src="/images/factory-press-shop.jpg" alt="Power presses with G.G Metal crates of finished parts"
                         caption="Presses & crates of finished parts" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
            <FramedPhoto src="/images/factory-press-line.jpg" alt="Power press line with automatic feeders"
                         caption="Press line" sizes="(min-width: 1024px) 25vw, 50vw" className="mt-12 aspect-[3/4]" />
          </div>
          <div>
            <SectionTitle eyebrow="Our works" title="Built around the power press."
                          intro="Our shop in Faridabad runs a line of power presses with automatic feeders, and we sharpen and maintain our own tools, so parts stay consistent from the first piece to the last." />
            <ul className="-mt-4 divide-y divide-line border-y border-line">
              {MACHINES.map(([name, detail]) => (
                <li key={name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-semibold text-ink">{name}</span>
                  <span className="text-right text-sm text-slate-500">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {OPERATIONS.map(([op]) => <span key={op} className="tag rounded border border-ink/20 px-2.5 py-1.5 text-ink">{op}</span>)}
              {MATERIALS.map((m) => <span key={m} className="tag rounded bg-sun/25 px-2.5 py-1.5 text-ink">{m}</span>)}
            </div>
            <Link href="/capabilities" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
              <Wrench className="size-4" /> Our full capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why us ──────────────────────────────────────────── */}
      <Section>
        <SectionTitle eyebrow="Why partner with us" title="A supplier you don’t have to chase." center />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map(([title, text], i) => <Feature key={title} icon={WHY_ICONS[i]} title={title}>{text}</Feature>)}
        </div>
      </Section>

      {/* ── FAQ + quick quote ───────────────────────────────── */}
      <section id="quote" className="scroll-mt-28 border-t border-line bg-paper-dark/60 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionTitle eyebrow="Questions" title="Good to know" />
            <div className="-mt-4 divide-y divide-line border-y border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {q}<Plus className="size-5 shrink-0 text-accent transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              <li><a href={tel(SITE.phones[0])} className="flex items-center gap-3 font-semibold text-ink hover:text-accent"><Phone className="size-4 text-accent" />{SITE.phones[0]}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all text-ink hover:text-accent"><Mail className="size-4 text-accent" />{SITE.email}</a></li>
              <li><a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-slate-600 hover:text-accent"><MapPin className="size-4 shrink-0 text-accent" />{SITE.address}</a></li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg border border-ink bg-white shadow-xl shadow-steel/10">
            <div className="flex items-center justify-between border-b border-ink bg-ink px-6 py-3">
              <span className="tag text-white">Request for quotation</span>
              <span className="tag text-sun">RFQ</span>
            </div>
            <div className="p-6 sm:p-8">
              <EnquiryForm source="Home page quote form" title="Tell us what you need" compact
                           subtitle="A short description is enough to start. We’ll call you back to go through the details." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
