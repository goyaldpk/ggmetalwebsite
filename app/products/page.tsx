import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, PencilRuler } from "lucide-react";
import { CtaBand, PageHero, ProductCard, Section } from "@/components/blocks";
import { OPERATIONS } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { enquire } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Ceiling fan components: shackle (fan hanger) assemblies, safety wires, down rods and blade shanks, made to your drawing.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Ceiling fan components" crumbs={[{ label: "Products" }]} label="Product range"
                subtitle="The parts that hang a ceiling fan safely and hold its blades true, made to your drawing in MS steel and HR pickled coil." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>

        <div className="mt-14 grid gap-8 rounded-lg border border-dashed border-ink/30 bg-white p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="flex size-14 items-center justify-center rounded-md bg-ink text-white"><PencilRuler className="size-6" /></span>
          <div>
            <h2 className="text-2xl font-semibold">Need a different sheet metal part?</h2>
            <p className="mt-1 text-slate-600">
              Fan components are our speciality, but our presses handle all kinds of pressed parts:{" "}
              {OPERATIONS.map(([op]) => op.toLowerCase()).join(", ")}. Send us your drawing or a sample.
            </p>
          </div>
          <Link href={enquire("Custom sheet metal part")}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark">
            Ask about a custom part <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
