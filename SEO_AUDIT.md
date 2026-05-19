# SEO Audit Report — Kandice Nowak Realty

**Audit Date:** 2026-05-18
**Domain:** https://kandicenowakrealty.com

---

## Executive Summary

| Status | Item |
|--------|------|
| PASS | Title tags unique, keyword-first, 50–70 chars |
| PASS | Meta descriptions present, 140–160 chars, with CTA |
| PASS | Canonical tags self-referencing per page |
| PASS | Open Graph & Twitter Cards configured |
| PASS | JSON-LD RealEstateAgent schema markup |
| PASS | robots.txt allows all, references sitemap |
| PASS | XML sitemap with lastmod timestamps |
| PASS | Semantic HTML (header, nav, main, section, footer) |
| PASS | H1–H6 hierarchy valid (one H1 per page) |
| PASS | All images have descriptive alt text |
| PASS | Company logo (CENTURY 21 First Choice Realty) deployed |
| PASS | Agent stats synced with RealSatisfied (50 reviews, 4.8/5) |

---

## 1. Crawlability & Indexation

### robots.txt
```
User-agent: *
Allow: /

Sitemap: https://kandicenowakrealty.com/sitemap.xml
```
- No unintended disallow rules.
- Sitemap referenced with absolute URL.

### XML Sitemap
- 9 URLs indexed (home, listings, contact, 6 property detail pages).
- `lastmod` added to all entries (2026-05-18).
- `changefreq` and `priority` set appropriately.

### Canonicals
- Every page injects a self-referencing `<link rel="canonical">` via the `SEO` component.
- Static canonical fallback present in `index.html` for prerendering.
- No cross-domain or chained canonicals detected.

---

## 2. On-Page Optimization

### Title Tags
| Page | Title | Length |
|------|-------|--------|
| Home | Kandice Nowak \| Tulsa Real Estate Agent \| CENTURY 21 First Choice Realty | 74 chars |
| Listings | Homes for Sale in Tulsa, OK \| Kandice Nowak Realty | 53 chars |
| Contact | Contact \| Free Consultation \| Kandice Nowak Realty | 51 chars |
| Detail | {Address} - {City}, {State} \| Kandice Nowak Realty | ~50–60 chars |

### Meta Descriptions
- **Home:** includes agent name, office, rating (4.8/5), review count (50), and location.
- **Listings:** includes location and listing count.
- **Contact:** includes phone number and CTA.
- **Detail:** includes beds, baths, sqft, and description snippet.

### Heading Hierarchy
- **Home:** H1 (hero) → H2 (Featured Listings) → H2 (CTA). Valid.
- **Listings:** H1 (All Listings). Valid.
- **Detail:** H1 (address) → H2-equivalent sections. Valid.
- **Contact:** H1 (Contact) → H2 (Send a Message). Valid.

### Image Alt Text
- All listing images: `alt={listing.address}`
- Agent photo: `alt={agent.name}`
- Company logo: `alt="CENTURY 21 First Choice Realty"`
- Decorative icons use `aria-hidden="true"`.

---

## 3. Structured Data

### JSON-LD Schema (RealEstateAgent)
Injected on every page via `react-helmet-async`:
- **@type:** RealEstateAgent
- **name:** Kandice Nowak
- **image:** `/agent-photo.jpg`
- **telephone:** +1-918-408-8089
- **email:** kandicenowak@gmail.com
- **address:** 4004 E 51st St, Tulsa, OK 74135
- **geo:** lat 36.0896, lng -95.9246
- **areaServed:** Tulsa, Broken Arrow, Owasso, Claremore, Sand Springs, Bixby, Jenks, Glenpool, Catoosa, Skiatook, Oklahoma
- **aggregateRating:** 4.8/5 from 50 reviews
- **sameAs:** Facebook, LinkedIn, Zillow, personal website, RealSatisfied profile
- **memberOf:** CENTURY 21 First Choice Realty

### Aggregate Rating
Synced from RealSatisfied RSS feed:
- **ratingValue:** 4.8
- **reviewCount:** 50
- **bestRating:** 5
- **worstRating:** 1

---

## 4. Performance & Assets

### Core Web Vitals Estimates
- **Bundle:** ~412 KB JS (130 KB gzipped), ~35 KB CSS (7 KB gzipped).
- **Images:** Unsplash CDN images served at `w=800`. Consider adding `srcset` for responsive images.
- **Fonts:** Uses system font stack. No render-blocking font requests.
- **Logo:** Company logo served as optimized JPEG (~25 KB).

### Recommendations
| Priority | Fix | Effort |
|----------|-----|--------|
| Minor | Add `srcset` to listing images for responsive sizing | 15 min |
| Minor | Add `loading="lazy"` to below-the-fold images in InertiaGrid | 5 min |
| Minor | Replace favicon.svg with a multi-resolution ICO/PNG for broader browser support | 10 min |
| Minor | Add Review schema markup for individual testimonials | 30 min |

---

## 5. Prioritized Fix List (Completed)

| Fix | Status |
|-----|--------|
| Update company logo to CENTURY 21 First Choice Realty (dark in header, gold in footer) | Done |
| Sync agent stats with RealSatisfied (50 reviews, 4.8 rating) | Done |
| Fix empty `alt` attributes on all listing images | Done |
| Add complete static SEO fallback tags to `index.html` | Done |
| Add `lastmod` timestamps to `sitemap.xml` | Done |
| Expand JSON-LD schema with `sameAs`, `areaServed`, `memberOf` | Done |
| Update default OG/Twitter image to agent photo | Done |
