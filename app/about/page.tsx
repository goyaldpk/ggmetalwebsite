import type { Metadata } from "next";
import { Gem, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import { CtaBand, Feature, FramedPhoto, PageHero, Section, SectionTitle } from "@/components/blocks";
import { MISSION, VALUES } from "@/content/company";
import { CLIENTS, SITE, YEARS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE.name}: a family-owned sheet metal manufacturer in Faridabad, making ceiling fan components since ${SITE.founded}.`,
};

const VALUE_ICONS = [<Gem key="q" />, <ShieldCheck key="r" />, <Lightbulb key="i" />, <Handshake key="c" />];

export default function AboutPage() {
  return (
    <>
      <PageHero title="A family business, pressing parts since 1995" crumbs={[{ label: "About" }]} label="Who we are"
                subtitle={SITE.tagline} />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionTitle eyebrow="Our story" title={`${YEARS}+ years of sheet metal, one family.`} />
            <div className="-mt-4 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                {SITE.name} was founded in {SITE.founded} by {SITE.founder} as a family-owned sheet metal manufacturing
                business, committed to delivering high-quality components with precision and reliability.
              </p>
              <p>
                Over the years we have specialised in ceiling fan components. Today we make shackle (fan hanger)
                assemblies, safety wires, down rods and blade shanks for fan manufacturers, on our own line of power
                presses in Faridabad.
              </p>
              <p>
                Being a focused, family-run unit keeps us agile. We take on custom and low-volume work as readily as
                regular supply, price competitively for small and medium-sized orders, and the person you speak to is
                the person responsible for your parts.
              </p>
            </div>

            <figure className="mt-10 flex items-center gap-5 rounded-lg border border-line bg-white p-5">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl font-bold text-white" aria-hidden>
                {SITE.founder.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <figcaption>
                <span className="block font-display text-xl font-semibold text-ink">{SITE.founder}</span>
                <span className="tag text-accent">{SITE.founderRole}</span>
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-2 gap-5 self-start">
            <FramedPhoto src="/images/factory-press-shop.jpg" alt="Power presses and crates of finished parts at G.G Metal Works"
                         sizes="(min-width: 1024px) 22vw, 50vw" className="aspect-[3/4]" />
            <FramedPhoto src="/images/factory-press-line.jpg" alt="Power press line at G.G Metal Works"
                         sizes="(min-width: 1024px) 22vw, 50vw" className="mt-12 aspect-[3/4]" />
          </div>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-steel py-16 lg:py-24">
        <div className="drawing-grid absolute inset-0 opacity-40 [filter:invert(1)]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="tag text-sun">Our mission</p>
          <p className="mt-5 font-display text-3xl leading-tight font-semibold text-white sm:text-5xl">{MISSION}</p>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Our values" title="What we hold ourselves to" center />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([title, text], i) => <Feature key={title} icon={VALUE_ICONS[i]} title={title}>{text}</Feature>)}
        </div>
      </Section>

      <section className="border-y border-line bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="tag text-slate-500">Fan makers we supply</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((c) => <li key={c} className="font-display text-xl font-bold tracking-tight text-slate-500 uppercase">{c}</li>)}
          </ul>
        </div>
      </section>

      <CtaBand title="Let’s work together" text={`Ready to partner with ${SITE.name} for your sheet metal component needs?`} />
    </>
  );
}
