# Handoff — 2026-10-17 (G1: first version of the site)

## Task status

| # | Task | Status |
|---|---|---|
| G1 | First version: home, products (4 pages), capabilities, about, contact/quote, thank-you, 404, sitemap, robots; quote form → email | done (uncommitted, for owner review) |
| next | Owner review of copy and photos → commit → Vercel project + SMTP env vars | todo |
| later | Move `ggmetalworks.com` from the ERP to this site (ERP to a subdomain) | todo |

## Session: G1 — first version (owner request, 17 Oct)

### What I built
- Structure and idioms from the Western World site (Next 16, React 19, Tailwind v4, lucide, `content/` + `lib/site.ts`
  as data, `FormChecks` hook). Their CRM connection is replaced by `app/api/enquiry/route.ts` → SMTP email
  (`lib/mail.ts`, nodemailer: the one new dependency, needed to send mail from Vercel without a third-party form service).
- Design: "engineering drawing": graphite steel + safety orange (`accent`, AA with white text) + hazard yellow (`sun`,
  the stripes on the press beds), drawing-grid backgrounds, item callouts (01–04), title-block spec tables, crop marks
  on photos. Fonts Archivo / IBM Plex Sans / IBM Plex Mono (self-hosted by next/font).
- Content from the owner's company profile deck (`G.G Metal Works.pdf`): founder, 1995, mission, values, products,
  capabilities, machines, materials, why us, clients, contact. Photos extracted from the deck into `public/images/`.
- Logo (owner picked option A of three, 17 Oct): a ceiling fan seen from below, three steel blades around an orange
  motor hub stamped GGMW; blades spin while the logo is hovered (`components/Logo.tsx`). Browser tab: `app/icon.svg`
  (hub shows a single "G", GGMW is unreadable at 16 px).
- Versions: Next 16.3.8 (16.3.6 used by Western World has a published advisory), nodemailer 10.0.x (7.x has advisories).
  `npm audit` still lists `braces` via `eslint-config-next`: lint tooling only, not shipped.

### Verification
- `npm run lint`, `npx tsc --noEmit`, `npm run build`: pass (all pages static except contact, thank-you, API).
- Playwright against `next start`: every page at 1440 px and 390 px, no console errors, no horizontal overflow.
- Form end to end against a local SMTP catcher: empty submit shows messages and focuses the first field; phone and
  email-typo messages; valid submit → email to m.goyal543@gmail.com with reply-to = customer → `/thank-you`.
  Direct POST with bad data → 400 with field messages; honeypot → 200, no email.
- Not verified: sending through a real Gmail/Zoho account, and on Vercel (needs the owner's SMTP credentials).

### Open for the owner
- **SMTP**: which mailbox sends the emails (Gmail app password, or a domain mailbox), set in Vercel.
- **Photos**: the down rod and safety wire images in the deck look like catalogue/stock photos; replace with photos
  of our own parts if we have them (also better product shots in general, on a plain background).
- **Clients**: OK to name Advance Electricals, Tibcon, Wonder Electricals, Seion and Breezalit on a public site?
- **WhatsApp**: the button uses +91 98102 87543; confirm WhatsApp is on that number.
- **Copy review**: product descriptions and specs are drafts (finish/size "as per your specification" on purpose,
  no tonnage per product, no certifications). Revenue (< ₹3 cr) from the deck is deliberately not shown.
- Real logo file, opening hours, GST number, social links: add when available.
