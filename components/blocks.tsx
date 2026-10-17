import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Product } from "@/content/products";
import { SITE, enquire, tel } from "@/lib/site";

/** Page title band with breadcrumb, used on every inner page. */
export function PageHero({ title, crumbs = [], subtitle, image = "/images/factory-press-shop.jpg", label }: {
  title: string;
  crumbs?: { label: string; href?: string }[];
  subtitle?: ReactNode;
  image?: string;
  /** Small mono line above the title, e.g. "Item 01". */
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-steel">
      <Image src={image} alt="" fill priority className="object-cover opacity-25 grayscale" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/40" />
      <div className="drawing-grid absolute inset-0 opacity-40 [filter:invert(1)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="tag mb-5 flex flex-wrap items-center gap-1 text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="size-3" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
            </span>
          ))}
        </nav>
        {label && <p className="tag mb-3 text-sun">{label}</p>}
        <h1 className="max-w-4xl text-4xl leading-[1.02] font-semibold text-white sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>}
      </div>
      <div className="hazard h-1.5" aria-hidden />
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro, center = false, light = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; light?: boolean;
}) {
  return (
    <div className={`mb-10 lg:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className={`tag mb-3 flex items-center gap-2 ${center ? "justify-center" : ""} ${light ? "text-sun" : "text-accent"}`}>
          <span className="inline-block h-px w-6 bg-current" />{eyebrow}
        </p>
      )}
      <h2 className={`text-3xl leading-[1.05] font-semibold sm:text-5xl ${light ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}

/** Product card styled as a drawing sheet: item callout, photo on white, title block underneath. */
export function ProductCard({ p, large = false }: { p: Product; large?: boolean }) {
  return (
    <Link href={`/products/${p.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-1 hover:border-ink hover:shadow-2xl hover:shadow-steel/10">
      <div className={`drawing-grid relative ${large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
        <Image src={p.image} alt={p.name} fill className="object-contain p-6 mix-blend-multiply transition duration-500 group-hover:scale-105"
               sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"} />
        <span className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-full border-2 border-accent bg-white font-mono text-xs font-semibold text-accent">
          {p.item}
        </span>
        {p.flagship && <span className="tag absolute top-4 right-3 rounded bg-sun px-2 py-1 text-ink">Our speciality</span>}
      </div>
      <div className="border-t border-line p-5">
        <h3 className={`flex items-center justify-between gap-2 font-semibold ${large ? "text-2xl" : "text-lg"}`}>
          {p.name}<ArrowUpRight className="size-5 shrink-0 text-slate-300 transition group-hover:text-accent" />
        </h3>
        <p className="mt-1 text-sm text-slate-600">{p.short}</p>
      </div>
    </Link>
  );
}

export function CtaBand({ title = "Have a drawing or a sample?", text = "Send it over with the quantity you need. We will get back to you with a quotation.", product }: {
  title?: string; text?: string; product?: string;
}) {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-lg bg-accent px-8 py-10 md:flex-row md:items-center lg:px-12">
        <div className="hazard absolute inset-y-0 left-0 w-2" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 text-white/85">{text}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Link href={enquire(product)} className="inline-flex items-center gap-1.5 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-accent transition hover:bg-ink hover:text-white">
            Request a quote <ArrowUpRight className="size-4" />
          </Link>
          <a href={tel(SITE.phones[0])} className="rounded-md border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Call {SITE.phones[0]}</a>
        </div>
      </div>
    </section>
  );
}

export function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6 transition hover:border-ink">
      <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-ink text-white [&_svg]:size-5">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

/** A framed photo with drawing crop marks and a caption strip. */
export function FramedPhoto({ src, alt, caption, className = "", sizes, priority = false }: {
  src: string; alt: string; caption?: string; className?: string; sizes: string; priority?: boolean;
}) {
  return (
    <figure className={`crop-marks ${className}`}>
      <div className="relative h-full overflow-hidden rounded-md bg-steel">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {caption && (
          <figcaption className="tag absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel/90 to-transparent px-4 pt-10 pb-3 text-white/85">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
