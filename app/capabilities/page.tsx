import type { Metadata } from "next";
import { ClipboardCheck, Layers, Ruler, Wrench } from "lucide-react";
import { CtaBand, Feature, FramedPhoto, PageHero, Section, SectionTitle } from "@/components/blocks";
import { MACHINES, MATERIALS, OPERATIONS, ROUTE } from "@/content/company";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities",
  description: "Power presses from 10 to 75 tonnes with automatic feeders, an uncoiler and in-house tool grinding. Cutting, punching, stamping and bending in MS steel and HR pickled coil.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero title="Manufacturing capabilities" crumbs={[{ label: "Capabilities" }]} label="Our works"
                image="/images/factory-press-line.jpg"
                subtitle="Equipped with power presses, automatic feeders and our own tool room, for precision and efficiency on every run." />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionTitle eyebrow="Machinery" title="Our machines" />
            <table className="-mt-4 w-full border border-ink text-sm">
              <caption className="tag bg-ink px-4 py-2 text-left text-white">Equipment list</caption>
              <thead className="sr-only"><tr><th>Machine</th><th>Detail</th></tr></thead>
              <tbody>
                {MACHINES.map(([name, detail], i) => (
                  <tr key={name} className="border-t border-ink/20">
                    <td className="w-12 bg-paper px-4 py-4 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</td>
                    <th scope="row" className="px-4 py-4 text-left font-display text-lg font-semibold text-ink">{name}</th>
                    <td className="px-4 py-4 text-right text-slate-600">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
              <p className="tag text-slate-500">Materials</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MATERIALS.map((m) => <li key={m} className="rounded-md bg-sun/25 px-3 py-2 font-semibold text-ink">{m}</li>)}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 self-start">
            <FramedPhoto src="/images/factory-press-line.jpg" alt="Power presses with automatic feeders" caption="Press line"
                         sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
            <FramedPhoto src="/images/factory-press-shop.jpg" alt="Power presses and crates of finished parts" caption="Press shop"
                         sizes="(min-width: 1024px) 25vw, 50vw" className="mt-12 aspect-[3/4]" />
          </div>
        </div>
      </Section>

      <section className="border-y border-line bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Operations" title="Cutting, punching, stamping, bending." />
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {OPERATIONS.map(([title, text], i) => (
              <div key={title} className="bg-white p-6">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="The route" title="From coil to crate" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTE.map(([title, text], i) => (
            <li key={title} className="flex gap-4 rounded-lg border border-dashed border-ink/25 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent font-mono text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-paper-dark/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Quality & flexibility" title="What that means for your order" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={<Wrench />} title="In-house tooling">Grinders for in-house tool management: tools are sharpened and maintained on site, so parts stay consistent.</Feature>
            <Feature icon={<ClipboardCheck />} title="Quality control">Strict checks throughout, so the components you receive are defect-free.</Feature>
            <Feature icon={<Ruler />} title="Made to your drawing">Tailored solutions to meet your specifications, from a drawing or a sample.</Feature>
            <Feature icon={<Layers />} title="Any batch size">Custom and low-volume orders, competitive pricing for small and medium-sized runs.</Feature>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
