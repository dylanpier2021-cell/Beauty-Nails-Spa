# Claude Code Build Prompt — Beauty Nails Spa Website

> Paste everything below into Claude Code. Attach the reference screenshot (Lacquer/Wix template) as a *design inspiration only* reference, not to copy.

---

## ROLE & GOAL

You are building a production-ready, SEO-optimized marketing website for a local nail salon. Every page must be fully indexable, load fast (Lighthouse 90+ on Performance, SEO, Accessibility, Best Practices), use clean semantic HTML, and have unique copy that does not resemble any competitor or template. This is a real business serving real customers, so follow Google's spam and quality policies strictly: no doorway pages, no keyword stuffing, no hidden text, no cloaking, no thin/duplicate content. Each page must offer genuine, distinct value.

**Hard rules (do not violate):**
- Do NOT add a `noindex` tag to Home or any of the core/service/location/blog/legal pages listed below. Every listed route must be indexable.
- Do NOT use EM dashes (—) anywhere in visible text. Use commas, periods, or "and" instead. (Hyphens in compound words are fine.)
- Do NOT design or build anything that violates Google policies (no cloaking, doorway pages, sneaky redirects, scraped/spun content, or deceptive structured data).
- The design must be unique and modern, not a clone of the reference screenshot. Use the screenshot only for layout inspiration (split hero, service cards, clean spacing). The brand is cream and gold luxury, NOT purple.
- All copy must be original. Write fresh, warm, human marketing copy. No lorem ipsum, no copied competitor lines.

---

## TECH STACK

- **Vite + React + TypeScript + Tailwind CSS + Framer Motion** (matches existing brand system).
- **Critical for SEO:** A client-only SPA will not index well. Use **`vite-react-ssg`** (or `react-snap` as fallback) to pre-render every route to static HTML at build time so each page ships real, crawlable HTML and meta tags. Confirm in the build output that each route produces its own `.html` file with unique `<title>` and `<meta name="description">`.
- **`react-router-dom`** for routing, **`react-helmet-async`** (or vite-react-ssg's Head) for per-page meta.
- Use `react-router-dom` `<Link>` for internal navigation (real `<a href>` in rendered HTML) so crawlers follow links.
- Lazy-load below-the-fold images with `loading="lazy"`, use `width`/`height` to prevent CLS, serve WebP, and preload the hero image and fonts.

---

## BUSINESS INFO (use exactly)

- **Name:** Beauty Nails Spa
- **Owner:** Hien Vu (goes by "Hannah")
- **Address:** 706 W Marketview Dr Ste A, Champaign, IL 61822
- **Phone:** (217) 398-1898 — link as `tel:+12173981898`
- **Email:** hannahvu83@yahoo.com
- **Hours:** Mon to Sat 9:30 AM to 7:00 PM, Sun 11:00 AM to 5:00 PM
- **Years in business:** 10+
- **Google Maps:** https://www.google.com/maps/place/706+W+Marketview+Dr+Ste+A,+Champaign,+IL+61822
- **Google review link:** https://g.page/r/CTK8LV-epOqKEAE/review
- **Yelp review link:** https://www.yelp.com/writeareview/biz/-BtggbTrtuaPjL5Dc9lv3w
- **Tagline:** "Champaign County's Premier Luxury Nail Salon"
- **Tone:** warm, elegant, welcoming, family-owned, detail-oriented.

**Why clients choose us:** 100% sterilized tools between every client; premium long-lasting products; detail-oriented caring technicians; relaxing comfortable atmosphere; friendly owners who treat you like family.

**Service areas (local SEO):** Champaign, Urbana, Savoy, Philo, Mahomet, Rantoul, St. Joseph, Tolono, Monticello (all IL).

---

## BRAND / VISUAL IDENTITY

**Aesthetic:** Cream and gold luxury. No black backgrounds. Serif headings, sans body. Elegant, airy, lots of whitespace.

**Typography:**
- Headings/Display: **Playfair Display** (serif)
- Body: **Montserrat** (sans-serif)
- Self-host or use `font-display: swap` and preconnect to keep CLS/LCP low.

**Color tokens (define as CSS variables in HSL, expose through Tailwind theme):**

| Token | HSL | Hex |
|---|---|---|
| Background | 40 30% 99% | #FDFCF8 |
| Foreground | 30 10% 15% | #2A2622 |
| Primary / Gold | 43 60% 50% | #CC9F33 |
| Gold Light | 43 50% 72% | #DCC388 |
| Gold Dark | 43 65% 38% | #A17A22 |
| Cream / Secondary | 38 35% 95% | #F4EFE6 |
| Warm / Accent | 35 30% 91% | #ECE4D6 |
| Charcoal | 30 10% 18% | #332E29 |
| Border | 38 20% 88% | #E3DCCF |
| Muted text | 30 8% 45% | #7A736B |
| Destructive | 0 84% 60% | #EF4444 |

**Gradients:**
- Gold bg gradient: `linear-gradient(135deg, #CC9F33, #C9A04D)`
- Gold text gradient: `linear-gradient(135deg, #CC9F33, #DCC388, #CC9F33)`
- Dark image overlay: `linear-gradient(180deg, rgba(38,33,28,0.45), rgba(38,33,28,0.25))`

**UI conventions:**
- Buttons: gold gradient bg, charcoal text, uppercase, tracking-wide, rounded-md.
- Sections alternate `bg-background` and `bg-secondary` (cream).
- Gold divider: 80px x 2px horizontal gold gradient under section eyebrows.
- Eyebrow labels: small gold uppercase, 0.3em letter-spacing.
- Base radius: 0.5rem.
- Framer Motion fade/slide-in on section reveals (respect `prefers-reduced-motion`).

---

## ROUTES (build every one, all indexable)

**Core**
- `/` and `/home` (Home)
- `/thank-you` redirects to `/home`

**Services**
- `/services`, `/pricing`, `/gallery`

**Manicures**
- `/manicure`, `/manicure-gel`, `/manicure-french-tip`, `/manicure-spa`, `/manicure-kids`

**Pedicures**
- `/pedicure`, `/pedicure-gel`, `/pedicure-spa`, `/pedicure-deluxe`, `/pedicure-kids`, `/callus-treatment`

**Nails / Enhancements**
- `/nails`, `/acrylic-nails`, `/gel-x-nails`, `/dip-powder-nails`, `/nail-art`, `/acrylic-fill-in`, `/nail-repair`, `/nail-removal`

**About / Contact / Booking**
- `/beauty-nails-spa-in-champaign-country` (About)
- `/contact-us`
- `/book`

**Reviews**
- `/review-us-online`, `/review`, `/leave-a-review`

**Blog**
- `/blog` (index), `/blog/:slug` (dynamic post pages, pre-rendered from a local content source such as Markdown/MDX or a typed data file)

**Local SEO (Locations)**
- `/nail-salon-champaign`, `/nail-salon-urbana`, `/nail-salon-savoy`, `/nail-salon-philo`, `/nail-salon-mahomet`, `/nail-salon-rantoul`, `/nail-salon-st-joseph`, `/nail-salon-tolono`, `/nail-salon-monticello`

**Legal**
- `/terms`, `/privacy`

**Fallback**
- `*` → custom 404 NotFound page (this one gets `noindex`, the only page that should).

> IMPORTANT for Google compliance: location pages and individual service pages must NOT be thin duplicates. Each needs genuinely unique content: location-specific intro, directions/landmarks, why locals choose us, area-relevant FAQ, and internal links. Each service page needs its own process description, benefits, who it's for, aftercare/longevity, price, duration, and 2 to 4 unique FAQ. If you cannot make a page meaningfully unique, make its content substantive enough to stand alone rather than templated boilerplate.

---

## FULL PRICE MENU (use on /pricing and relevant service pages)

Note line: "Prices may vary based on nail length, shape, and design complexity. Nail art available on request."

**Manicures:** Basic Manicure $30 (~30 min) · Deluxe Manicure $38 (~35 min) · Shellac (Gel) Manicure $45 (~45 min) · Dipping Powder Manicure $45 (~30 min) · Manicure and Pedicure Combo $70 (~60 to 75 min)

**Pedicures:** Basic Pedicure $38 (~30 min) · Herbal Pedicure $48 (~45 min) · Hydration Pedicure $50 (~45 min) · Jelly Spa Pedicure $55 (~50 min) · Deluxe Volcano Spa Pedicure $60 (~55 min) · Organic Detox Pedicure $65 (~60 min) · Luxury Pedicure $75 (~60 min)

**Artificial / Enhancement:** Full Set Gel or Shellac $55+ (~45 min) · Full Set Regular Acrylic $45+ (~30 to 45 min) · Fill In Gel/Shellac $50+ (~45 to 60 min) · Fill In Regular $42+ (~45 min) · Nail Repair $15+ (~15 min) · Take Off / Removal $15+ (~15 min)

**Polish:** Polish Change Hands $18 (~15 to 30 min) · Polish Change Feet $18 (~15 to 30 min)

---

## SOCIAL PROOF (Reviews / Home)

24+ five-star reviews. Featured techs: Hannah (owner), Anna. Themes: clean salon, gentle service, matches inspo pics, long-lasting polish, family feel, Gel X quality, friendly Sunday hours.

Pull quotes (use verbatim, attribute as shown):
- "Hannah matched inspo pic. Super talented and gentle." — Cheldyn C.
- "Polish lasts longer than other salons. Highly recommend." — Michele C.
- "Warm, welcoming, spotless, kind staff, very attentive." — Shilpi S.
- "Been coming 4 years. Great experience with Anna and family." — Yamileth D.

Add CTA buttons to the Google and Yelp review links on the review pages.

---

## FAQ CONTENT (reuse and expand per page)

- Gel lasts 2 to 3 weeks.
- Walk-ins welcome, booking recommended.
- Tools sterilized between every client, disposables used where possible.
- Gel vs dip: gel is UV-cured and glossy; dip is powder, durable and lightweight; both last 2 to 3 weeks.
- Nail art: yes, custom designs on request.
- Acrylic full set starts at $45.

---

## SEO REQUIREMENTS (apply to every page)

1. **Unique `<title>` (50 to 60 chars) and `<meta name="description">` (140 to 160 chars) per page.** Include the city where natural. No keyword stuffing.
2. **One `<h1>` per page**, then logical `<h2>`/`<h3>`. Use semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Descriptive `alt` text on every image.
3. **Canonical tag** on every page pointing to its own absolute URL (use the production domain, e.g. `https://beautynailsspacu.com`).
4. **Open Graph + Twitter Card** meta on every page.
5. **JSON-LD structured data:**
   - Site-wide `LocalBusiness` / `NailSalon` schema with name, address, geo, phone, hours, priceRange, image, sameAs (Google/Yelp).
   - `Service` schema on each service page.
   - `FAQPage` schema where FAQs appear (only mark up FAQs visible on the page).
   - `BreadcrumbList` on inner pages.
   - `BlogPosting` on blog posts.
   - Do not mark up content that is not visible (Google penalizes this).
6. **`sitemap.xml`** listing every indexable route, and **`robots.txt`** that allows crawling and references the sitemap.
7. **Internal linking:** header nav, footer with grouped links (Services, Locations, Company, Legal), and contextual in-body links between related service and location pages. Breadcrumbs on inner pages.
8. **Performance:** code-split routes, compress and lazy-load images (WebP, explicit dimensions), preload hero image and fonts, `font-display: swap`, minimal blocking JS, defer Framer Motion where possible, and keep total JS small. Target Lighthouse Performance 90+ and CLS < 0.1.
9. **Accessibility:** color contrast AA, focus states, aria labels on icon buttons, `prefers-reduced-motion` support, skip-to-content link.
10. **Mobile-first responsive** matching the brand. Sticky header with a "Book Now" button and click-to-call.

---

## PAGE-LEVEL CONTENT GUIDANCE

- **Home:** split hero (headline + subhead + "Book Now" and "Our Services" CTAs + hero image), trust strip (sterilized tools, 10+ years, 24+ five-star reviews), about teaser, featured services grid linking to service pages, pricing highlights, reviews carousel, locations strip, FAQ accordion, contact/hours/map, footer.
- **Service pages:** H1 with service name, hero, what it is, benefits, who it's for, process steps, longevity/aftercare, price and duration, gallery, related services, 2 to 4 unique FAQs, CTA.
- **Location pages:** H1 like "Nail Salon in Urbana, IL", unique local intro, distance/landmarks from that town to the salon, services offered, why locals choose Beauty Nails Spa, embedded map, area FAQ, CTA. Make each town's copy genuinely different.
- **About:** Hannah and family story, 10+ years, values, sanitation standards, photos.
- **Booking:** clear options (call, walk-in, online if applicable), hours, address, map, phone CTA. If no booking system, make "Call to Book" the primary action with `tel:` link.
- **Reviews pages:** showcase quotes + prominent Google and Yelp review buttons.
- **Blog:** index of posts + individual post pages. Seed 3 to 5 original starter posts (e.g., "How to Make a Gel Manicure Last Longer", "Gel vs Dip Powder: Which Lasts Longer?", "What to Expect at Your First Luxury Pedicure"). Original content only.
- **Terms / Privacy:** A2P 10DLC compliant, SMS consent with STOP/HELP language, no lead sharing, no affiliate marketing. Last updated 2026/06/07.

---

## DELIVERABLES

1. Full Vite + React + TS + Tailwind + Framer Motion project with all routes above, pre-rendered to static HTML.
2. `sitemap.xml`, `robots.txt`, favicon, OG image.
3. Reusable components: Header/Nav, Footer, SEO/Head component, Button, ServiceCard, FAQAccordion, ReviewCard, LocationTemplate, ServiceTemplate, Section, GoldDivider.
4. Centralized data files for services, locations, pricing, reviews, and blog posts (typed) so content is easy to edit.
5. A short README with setup, dev, build, and pre-render commands, plus how to add a service/location/blog post.

## ACCEPTANCE CHECKS (run before finishing)

- `npm run build` succeeds and each route emits its own static HTML file with a unique title and meta description (verify by inspecting the build output).
- No page except the 404 has `noindex`.
- No EM dashes in any rendered text (grep the source).
- One `<h1>` per page; valid landmark structure.
- Lighthouse 90+ on Performance, SEO, Accessibility, Best Practices for Home, one service page, and one location page.
- All internal links resolve; sitemap matches actual routes.
- JSON-LD validates and only describes visible content.
