/** Business details shown across the site (from the company profile deck, Oct 2026). */
export const SITE = {
  name: "G.G Metal Works",
  shortName: "GGMW",
  url: "https://www.ggmetalworks.com",
  tagline: "Precision, Quality, and Reliability Since 1995",
  founded: 1995,
  founder: "Murari Lal Goyal",
  founderRole: "Founder & Proprietor",
  address: "Plot No. 42, Eicher Compound, Block E, Sanjay Colony, Sector 23, Faridabad, Haryana 121001",
  city: "Faridabad, Haryana",
  phones: ["+91 98102 87543"],
  email: "m.goyal543@gmail.com",
  whatsapp: "https://wa.me/919810287543",
  maps: "https://share.google/g6SjEhOiTR2DqkFXE",
  footerAbout:
    "A family-owned sheet metal manufacturing unit in Faridabad, making ceiling fan components for fan manufacturers since 1995.",
};

/** Whole years in business, rounded down to a multiple of five for "30+ years" style copy. */
export const YEARS = Math.floor((new Date().getFullYear() - SITE.founded) / 5) * 5;

export const tel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export type NavItem = { label: string; href: string; children?: NavItem[] };

/** Main menu. "Products" gets its dropdown from content/products.ts in the header. */
export const NAV: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Fan makers we supply (named in the company profile deck). */
export const CLIENTS = [
  "Advance Electricals",
  "Tibcon (Tibrewala Electronics)",
  "Wonder Electricals",
  "Seion",
  "Breezalit",
];

/** Link to the quote form with the product filled in. */
export const enquire = (product?: string) => `/contact${product ? `?product=${encodeURIComponent(product)}` : ""}#quote`;
