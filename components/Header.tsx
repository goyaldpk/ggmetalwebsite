"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { PRODUCTS } from "@/content/products";
import { NAV, SITE, enquire, tel, type NavItem } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  // Dropdowns open on hover/focus (CSS). After a click the page changes without a reload, so the pointer and focus are
  // still on the menu: keep it closed until the pointer leaves.
  const [closed, setClosed] = useState(false);
  // Close the mobile menu whenever the page changes, including Back/Forward.
  const [shownPath, setShownPath] = useState(path);
  if (path !== shownPath) {
    setShownPath(path);
    setOpen(false);
  }
  const active = (item: NavItem) => path === item.href || path.startsWith(`${item.href}/`);

  // Lock the page behind the mobile menu while it is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="relative">
      <div className="hazard h-1" aria-hidden />
      <div className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="shrink-0" aria-label={`${SITE.name}, home`}>
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative"
                   data-closed={(item.label === "Products" && closed) || undefined}
                   onMouseLeave={() => setClosed(false)}
                   onClick={(e) => {
                     if (!(e.target as HTMLElement).closest("a")) return;
                     (document.activeElement as HTMLElement | null)?.blur();
                     setClosed(true);
                   }}>
                <Link href={item.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium transition hover:text-accent ${active(item) ? "text-accent" : "text-ink"}`}>
                  {item.label}
                  {item.label === "Products" && <ChevronDown className="size-3.5 opacity-60 transition group-hover:rotate-180 group-data-closed:rotate-0" />}
                </Link>
                {item.label === "Products" && <ProductsMenu />}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <a href={tel(SITE.phones[0])} aria-label={`Call ${SITE.phones[0]}`}
               className="flex items-center gap-2 rounded-md border border-ink/15 p-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent xl:px-4">
              <Phone className="size-4" /><span className="hidden xl:inline">{SITE.phones[0]}</span>
            </a>
            <Link href={enquire()}
                  className="hidden items-center gap-1.5 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent sm:inline-flex">
              Request a quote <ArrowUpRight className="size-4" />
            </Link>
            <button className="rounded-md p-2 text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Mobile" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
               className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-24 lg:hidden">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-line">
                <Link href={item.href} className="block py-3.5 font-display text-lg font-semibold text-ink">{item.label}</Link>
                {item.label === "Products" && (
                  <ul className="mb-3 grid grid-cols-2 gap-1.5">
                    {PRODUCTS.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} className="block h-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-700">{p.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link href={enquire()} className="mt-6 flex justify-center rounded-md bg-accent px-5 py-3.5 font-semibold text-white">
              Request a quote
            </Link>
            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <a href={tel(SITE.phones[0])} className="flex items-center gap-2"><Phone className="size-4 text-accent" />{SITE.phones[0]}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 break-all"><Mail className="size-4 text-accent" />{SITE.email}</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

/** Every product with its photo. */
function ProductsMenu() {
  return (
    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 group-data-closed:invisible! group-data-closed:opacity-0!">
      <div className="w-[34rem] overflow-hidden rounded-lg border border-line bg-white shadow-2xl shadow-steel/15">
        <ul className="grid grid-cols-2 gap-px bg-line">
          {PRODUCTS.map((p) => (
            <li key={p.slug} className="bg-white">
              <Link href={`/products/${p.slug}`} className="group/item flex gap-3 p-4 hover:bg-paper">
                <span className="relative size-14 shrink-0 overflow-hidden rounded border border-line bg-white">
                  <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1" />
                </span>
                <span>
                  <span className="tag text-accent">Item {p.item}</span>
                  <span className="block text-sm font-semibold text-ink group-hover/item:text-accent">{p.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line bg-paper px-4 py-3">
          <p className="text-sm text-slate-600">Need a different part? We make to drawing.</p>
          <Link href="/products" className="tag inline-flex items-center gap-1 text-ink hover:text-accent">
            All products <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
