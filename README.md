# Beauty Nails Spa

Production marketing website for **Beauty Nails Spa**, a family-owned luxury nail salon in Champaign, IL. Built as a statically pre-rendered React app so every page ships real, crawlable HTML with its own title, meta description, canonical, Open Graph tags and JSON-LD structured data.

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** for styling (cream and gold brand system)
- **Framer Motion** for subtle, reduced-motion-aware animations
- **vite-react-ssg** for static pre-rendering (Static Site Generation)
- **react-router-dom** for routing, **react-helmet-async** (via vite-react-ssg `Head`) for per-page meta
- **sharp** (dev only) to generate favicons and the Open Graph image

## Requirements

- Node 18 or newer (developed on Node 24)

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
```

## Building

```bash
npm run build      # pre-render every route to static HTML, then write sitemap.xml
npm run preview    # serve the production build locally (http://localhost:4173)
```

`npm run build` runs `vite-react-ssg build` followed by `scripts/generate-sitemap.mjs`. The build:

- Emits one `index.html` per route under `dist/` (clean URLs, e.g. `dist/manicure-gel/index.html`).
- Writes `dist/sitemap.xml` listing every indexable route (excludes the 404, the `/thank-you` redirect, and the `/home` alias which canonicalizes to `/`).
- Copies the pre-rendered 404 to `dist/404.html` for host-level 404 handling.

### Other scripts

```bash
npm run typecheck     # tsc --noEmit
npm run lint:emdash   # fail if any em dash or en dash appears in source
npm run assets        # regenerate favicons, app icons, og-image.png and the web manifest into /public
npm run photos        # re-optimize source photos into responsive WebP in /public/images
```

## Project structure

```
src/
  data/            Typed, centralized content (edit these to change copy)
    business.ts    Name, address, phone, hours, geo, review links (single source of truth)
    pricing.ts     Full price menu
    reviews.ts     Guest reviews
    faqs.ts        Shared FAQs
    photos.ts      Curated photo manifest with alt text
    types.ts       Content contracts (Service, Location, BlogPost, ...)
    services/      manicures.ts, pedicures.ts, enhancements.ts + index helpers
    locations/     group-a.ts, group-b.ts + index helpers
    blog/          posts.ts + index helpers
  components/      Header, Footer, Seo, JsonLd, Button, ServiceCard, FAQAccordion, etc.
  templates/       ServiceTemplate, LocationTemplate (render from data)
  pages/           Home, Services, Pricing, Gallery, About, Contact, Book, Reviews, Blog, legal, 404
  lib/             seo.ts (absolute URLs), schema.ts (JSON-LD builders), cn.ts
  routes.tsx       Route tree with lazy loading + getStaticPaths for dynamic routes
  main.tsx         ViteReactSSG entry
scripts/           generate-assets.mjs, process-photos.mjs, generate-sitemap.mjs, check-emdash.mjs
public/            robots.txt, favicons, og-image.png, site.webmanifest, images/ (optimized WebP)
```

## Editing content

All copy lives in `src/data`. The page templates render from these typed files, so most edits are data changes, not code changes. Avoid em dashes (use commas, periods, or "and"); `npm run lint:emdash` enforces this.

### Add or edit a service

1. Open the relevant file in `src/data/services/` (`manicures.ts`, `pedicures.ts`, or `enhancements.ts`).
2. Add a `Service` object (copy an existing entry for the shape). Give it a unique `slug`, `title` (50 to 60 chars), `description` (140 to 160 chars), intro paragraphs, benefits, process steps, aftercare, `prices`, `gallery` captions, 2 to 4 `faqs`, and `related` slugs.
3. Body strings may include inline links with `[label](/path)` syntax.

The new service is automatically added to the nav, footer, services index, sitemap and gets its own pre-rendered page at `/<slug>`.

### Add or edit a location

1. Open `src/data/locations/group-a.ts` or `group-b.ts`.
2. Add a `Location` object with a `nail-salon-<town>` slug, unique local intro, real `distance` and `landmarks`, `whyLocals`, `popularServices` (service slugs), area FAQs and `nearbyAreas` (other location slugs).

### Add a blog post

1. Open `src/data/blog/posts.ts` and add a `BlogPost` object.
2. `body` is an array of typed `ContentBlock`s (`p`, `h2`, `h3`, `ul`, `ol`, `quote`, `callout`). Paragraph text supports `[label](/path)` inline links.

## SEO notes

- The production domain is set as `SITE_URL` in `src/data/business.ts`. Update it if the domain changes; canonical tags, Open Graph URLs and the sitemap all derive from it.
- Site-wide `NailSalon` (LocalBusiness) and `WebSite` JSON-LD render on every page. Service, Location, FAQ, Breadcrumb and BlogPosting schema are added per page, and only describe content that is visible.
- Only the 404 page carries `noindex`. Every other route is indexable.
- `public/robots.txt` allows crawling and references the sitemap.

## Photos

Real salon photos are used throughout (hero, gallery, service pages, about, contact, booking and the location pages). The optimized WebP files live in `public/images` and are listed with alt text in `src/data/photos.ts`.

To add or change photos:

1. Put the new source images in a folder and update the `nails` / `salon` maps in `scripts/process-photos.mjs` with `outName: 'filename.jpg'` entries (and the `SRC` path if needed).
2. Run `npm run photos` to generate responsive `-400`, `-800` (and hero `-560`, `-1000`) WebP files.
3. Add or edit the matching entries (with accurate `alt` text) in `src/data/photos.ts`.

## Booking (GoHighLevel + 10% deposit)

The `/book` page embeds Hien's GoHighLevel (GHL) calendar. All booking config lives in `src/data/booking.ts`.

To turn on online booking:

1. In GHL, open Hien's calendar, then the share / embed option, and copy the iframe `src` from the embed code. It looks like `https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXX` (white-label sub-accounts may use a custom domain, that is fine).
2. Paste that URL into `ghlCalendarUrl` in `src/data/booking.ts`, then `npm run build` and redeploy.

Until that URL is set, the page shows a "reserve by phone" fallback, so nothing looks broken.

**The 10% deposit is configured in GHL, not in code.** In the same calendar: open the **Payments** tab, connect **Stripe**, enable **Accept payments**, choose **Deposit**, and set it to **10%**. The deposit is then collected securely inside the booking widget during checkout. The website never handles card details, which keeps it PCI-safe and avoids storing payment data. The deposit percentage shown in the page copy comes from `depositPercent` in the same file, so keep the two in sync.

## Before launch (to replace)

- **Geo coordinates** in `src/data/business.ts` are approximate. Replace with the exact latitude and longitude for the Marketview Drive location.
- **Open Graph image** (`public/og-image.png`) is a branded wordmark generated from `scripts/generate-assets.mjs`. Re-run `npm run assets` after editing that script, or drop in a custom 1200x630 image.

## Deployment

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages). The site uses clean nested URLs (`/services/`), so no special rewrite rules are required. Point the host's custom 404 at `404.html` if it does not pick it up automatically.
```bash
npm run build
# then deploy the dist/ directory
```
