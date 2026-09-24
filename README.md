# Crate Construction — Website

Marketing website for **Crate Construction**, a residential general contractor in Dallas, Texas.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, and Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically prerendered)
npm start
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run format`.

---

## Before launch — content checklist

The site is designed to be honest by default: nothing about the company is invented. Anything not yet
verified is either a clearly-flagged placeholder or hidden until it's filled in.

| What | Where | Status |
| --- | --- | --- |
| Production URL | `.env` → `NEXT_PUBLIC_SITE_URL` | **Required** for canonical URLs, sitemap, social cards |
| Form delivery | `.env` (see `.env.example`) | **Required** — production returns "unavailable" until set |
| Project portfolio | `data/projects.ts` | Placeholder projects (`placeholder: true`) |
| Photography | `data/images.ts`, `public/images/` | Representative stock photos (Unsplash license) |
| Placeholder notices | `data/site.ts` → `showPlaceholderNotices` | `true` — set `false` once real projects are in |
| Social profiles | `data/site.ts` → `social` | Empty (hidden) until URLs are added |
| Public email | `data/site.ts` → `email` | `null` (hidden) |
| Team | `data/team.ts` | Empty — section shows an invitation instead |
| Company-reported stats | `data/credentials.ts` → `companyFacts` | All `null` (hidden) |
| Logo / brand colors | `components/ui/Logo.tsx`, `app/globals.css` `:root` | Temporary wordmark & palette |
| Copy review | `data/services.ts`, `data/process.ts`, `app/about/page.tsx` | Review standards/approach wording with the client |

### Verified facts in use

From Crate Construction's public BuildZoom profile
(<https://www.buildzoom.com/contractor/crate-construction>), retrieved September 2026 and always labeled as
third-party information on the site:

- BuildZoom score 98 — above 84% of 222,249 Texas contractors
- Active since 2017; 24 building permits on record (Dallas, Richardson)
- Active registrations: General Contractor (City of Arlington), Home Builder (City of Midlothian)
- Selected permit history (street numbers intentionally omitted)
- Business phone (214) 664-8589; Dallas, TX 75211

Update `data/credentials.ts` whenever these are refreshed.

---

## Replacing content

Everything editable lives in `/data`:

- **`images.ts`** — the single image library. Drop real photos into `public/images/…`, point `src` at them,
  update `alt`, and remove `origin`. `position` sets an object-position focal point for tight crops.
- **`projects.ts`** — portfolio entries; each generates `/projects/[slug]`. Galleries lay themselves out
  automatically (full-bleed → pair → offset …). `beforeAfter` is optional.
- **`services.ts`** — the seven services (home accordion + `/services`). `inquiryType` pre-selects the project
  type on `/contact?type=…`.
- **`process.ts`**, **`principles.ts`**, **`team.ts`**, **`credentials.ts`**, **`site.ts`** — as named.

## Theming

All colors are CSS variables in `app/globals.css` (`--brand-*`). Swap the values there to apply an official
palette. Typography: Archivo (display + text, self-hosted and subset) and IBM Plex Mono for labels — both
SIL OFL, in `app/fonts/`.

## Project inquiry form

`components/contact/ContactForm.tsx` validates on the client and posts `multipart/form-data` to
`/api/inquiry`, which re-validates (shared rules in `lib/inquiry.ts`) and hands off to a provider in
`lib/inquiry-delivery.ts`: generic **webhook** (GoHighLevel, Zapier, Make, custom API, Supabase Edge
Function), **Formspree**, **HubSpot**, **Resend**, or **Supabase**. Includes a honeypot field, file uploads
(5 × 10 MB, 20 MB total), an accessible error summary, and a success state.

> Serverless hosts cap request bodies (Vercel: ~4.5 MB for route handlers). For large plan sets, set
> `NEXT_PUBLIC_INQUIRY_ENDPOINT` to a hosted form endpoint that accepts files directly (e.g. Formspree).

## Motion & performance

- Scroll reveals, parallax, text drift, and magnetic buttons are CSS driven by one lightweight observer
  (`components/layout/MotionObserver.tsx`) — no per-element animation instances.
- Framer Motion is used where it earns its weight: project filter layout transitions, the contact form's
  success transition, the full-screen mobile menu, and the desktop cursor label — the last two are
  code-split and only load when needed.
- Lenis smooth scrolling loads only on mouse/trackpad devices. Page transitions use native View Transitions.
- `prefers-reduced-motion` disables all of it. Content stays visible without JavaScript.

## SEO

Per-page metadata and canonical URLs (`lib/seo.ts`), Open Graph/Twitter cards with a generated share image
(`app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (`GeneralContractor`,
`WebSite`, `BreadcrumbList`, service list) using verified business information only.
