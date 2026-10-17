# G.G Metal Works website

Public website for G.G Metal Works (GGMW), Faridabad: sheet metal manufacturer of ceiling fan components since 1995.
Built with Next.js 16, React 19 and Tailwind CSS v4, following the structure of the Western World website. A static
information site: every page is prerendered except the contact page (reads `?product=`), the thank-you page and the
enquiry endpoint.

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build locally
```

Needs Node.js 20.9 or newer (Node 22 LTS recommended).

## Enquiry form → email

Every form (home page, contact page, product pages) posts to `app/api/enquiry/route.ts`, which checks the input again
(`lib/validation.ts`, the same rules as the browser), drops bot submissions (hidden honeypot field), limits each
visitor to 5 enquiries in 10 minutes, and emails the enquiry over SMTP (`lib/mail.ts`, nodemailer). The email's
reply-to is the customer's address, so "Reply" answers them.

| Setting | Meaning |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Mail server login. Gmail: `smtp.gmail.com`, `465`, the Gmail address, an **App Password** |
| `ENQUIRY_TO` | Mailbox that receives enquiries (default `m.goyal543@gmail.com`) |
| `ENQUIRY_FROM` | Sender address (default `SMTP_USER`) |

Copy `.env.example` to `.env.local` locally; on Vercel set them under Project → Settings → Environment Variables.
Without SMTP settings, `npm run dev` prints enquiries to the terminal, and production asks the visitor to call.

## Deploying on Vercel

1. Import this GitHub repo in Vercel (framework: Next.js, no build settings to change).
2. Add the SMTP environment variables above, then deploy.
3. Domain: `ggmetalworks.com` currently hosts the ERP. When moving it, add the domain in Vercel and point the DNS
   records Vercel shows; keep the ERP on a subdomain (e.g. `erp.ggmetalworks.com`). `SITE.url` in `lib/site.ts` is
   used for the sitemap and social previews.

## Updating content

| What | Where |
|---|---|
| Phone, email, address, map link, WhatsApp | `SITE` in `lib/site.ts` |
| Client names | `CLIENTS` in `lib/site.ts` |
| Products (each gets `/products/<slug>`) | `content/products.ts` (+ photo in `public/images/`) |
| Mission, values, why us, machines, FAQ | `content/company.ts` |
| Colours and fonts | `app/globals.css` (`@theme` tokens) and `app/layout.tsx` |
| Logo | `components/Logo.tsx` (site) and `app/icon.svg` (browser tab) |

Then `npm run lint && npx tsc --noEmit && npm run build`, and deploy.
