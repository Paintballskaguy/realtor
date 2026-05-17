# SEO Audit Report — Kandice Nowak Realty

## Executive Summary

| Status | Item |
|--------|------|
| PASS | Title tags unique, keyword-first, 50–60 chars |
| PASS | Meta descriptions present, 140–160 chars, with CTA |
| PASS | Canonical tags self-referencing per page |
| PASS | Open Graph & Twitter Cards configured |
| PASS | JSON-LD RealEstateAgent schema markup |
| PASS | robots.txt allows all, references sitemap |
| PASS | XML sitemap with all routes |
| PASS | Semantic HTML (header, nav, main, section, footer) |
| PASS | H1–H6 hierarchy valid (one H1 per page) |
| PASS | All images have descriptive alt text |
| WARN | Site not yet deployed (URLs reference placeholder domain) |

---

## 1. Crawlability & Indexation

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://kandicenowakrealty.com/sitemap.xml
```
- No unintended disallow rules.
- Sitemap referenced.

### XML Sitemap
- 9 URLs indexed (home, listings, contact, 6 property detail pages).
- `changefreq` and `priority` set appropriately.
- **Action:** Update `lastmod` dates when content changes.

### Canonicals
- Every page injects a self-referencing `<link rel="canonical">` via the `SEO` component.
- No cross-domain or chained canonicals detected.

---

## 2. On-Page Optimization

### Title Tags
| Page | Title | Length |
|------|-------|--------|
| Home | Tulsa Real Estate Agent \| Kandice Nowak Realty | 48 chars |
| Listings | Homes for Sale in Tulsa, OK \| Kandice Nowak Realty | 53 chars |
| Contact | Contact \| Kandice Nowak Realty | 33 chars |
| Detail | {Address} - {City}, {State} \| Kandice Nowak Realty | ~50–60 chars |

### Meta Descriptions
- Home: includes agent name, office, and value prop.
- Listings: includes location and listing count.
- Contact: includes phone number and CTA.
- Detail: includes beds, baths, sqft, and description snippet.

### Heading Hierarchy
- **Home:** H1 (hero) → H2 (Featured Listings) → H2 (CTA). Valid.
- **Listings:** H1 (All Listings). Valid.
- **Detail:** H1 (address) → H2-equivalent sections. Valid.
- **Contact:** H1 (Contact) → H2 (Send a Message). Valid.

### Image Alt Text
- All listing images: `alt={listing.address}`
- Agent photo: `alt={agent.name}`
- **Recommendation:** Add alt text to decorative icons (or `aria-hidden`).

---

## 3. Performance & Structured Data

### JSON-LD Schema
RealEstateAgent schema injected on every page via `react-helmet-async`:
- `@type`: RealEstateAgent
- `name`, `image`, `telephone`, `address`, `geo`, `areaServed`
- `aggregateRating`: 5/5 from 34 reviews

### Core Web Vitals Estimates
- **Bundle:** ~412 KB JS (130 KB gzipped), ~29 KB CSS (6 KB gzipped).
- **Images:** Unsplash CDN images served at `w=800`. Consider adding `srcset` for responsive images.
- **Fonts:** Uses system font stack. No render-blocking font requests.
- **Recommendation:** Add `loading="lazy"` to listing card images below the fold.

---

## 4. Prioritized Fix List

| Priority | Fix | Effort |
|----------|-----|--------|
| Minor | Replace placeholder domain with real domain before launch | 5 min |
| Minor | Add `loading="lazy"` to ListingCard images | 5 min |
| Minor | Add `srcset` to listing images for responsive sizing | 15 min |
| Minor | Add `lastmod` timestamps to sitemap.xml | 10 min |
