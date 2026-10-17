import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { PRODUCTS } from "@/content/products";
import { NAV, SITE, enquire, tel } from "@/lib/site";

export default function Footer() {
  const col = "mb-4 tag text-white/45";
  const link = "text-sm text-white/75 transition hover:text-white";
  return (
    <footer className="relative overflow-hidden bg-steel text-white/75">
      <div className="drawing-grid absolute inset-0 opacity-50 [filter:invert(1)]" aria-hidden />
      <div className="hazard relative h-1.5" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-14 md:flex-row md:items-end">
          <p className="max-w-3xl font-display text-4xl leading-[1.05] font-semibold text-white sm:text-6xl">
            Send us the drawing. <span className="text-spark">We&rsquo;ll press the parts.</span>
          </p>
          <Link href={enquire()}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-accent">
            Request a quote <ArrowUpRight className="size-5" />
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo light />
            <p className="max-w-sm text-sm leading-relaxed">{SITE.footerAbout}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-spark" />{SITE.address}
                </a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p}><a href={tel(p)} className="flex gap-3 hover:text-white"><Phone className="size-4 shrink-0 text-spark" />{p}</a></li>
              ))}
              <li><a href={`mailto:${SITE.email}`} className="flex gap-3 break-all hover:text-white"><Mail className="size-4 shrink-0 text-spark" />{SITE.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className={col}>Products</h4>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className={`${link} flex items-baseline gap-2`}>
                    <span className="font-mono text-[11px] text-spark">{p.item}</span> {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={col}>Company</h4>
            <ul className="space-y-2">
              {NAV.filter((n) => n.label !== "Products").map((n) => <li key={n.label}><Link href={n.href} className={link}>{n.label}</Link></li>)}
              <li><Link href={enquire()} className={link}>Request a quote</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-white/45">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="tag">Cutting · Punching · Stamping · Bending</p>
        </div>
      </div>
    </footer>
  );
}
