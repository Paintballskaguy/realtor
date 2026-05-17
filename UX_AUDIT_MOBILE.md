# Mobile UX Audit

## Executive Summary

The site is fundamentally responsive and uses Tailwind's mobile-first breakpoints correctly. However, **3 issues are mobile blockers** that will degrade the experience on iOS Safari and small Android devices.

---

## Findings

### Blocker: iOS Input Zoom (Contact Page + Home Email Capture)

**Issue:** Form inputs lack `text-base` (16px). On iOS Safari, any input with font-size < 16px triggers automatic page zoom on focus. Users must manually pinch-zoom out after typing.

**Affected:**
- Contact page: name, email, phone inputs
- Contact page: message textarea
- Home page: email capture input

**Fix:** Add `text-base` to all form inputs.

### Blocker: InertiaGrid Draggable Carousel Steals Vertical Scroll

**Issue:** The `drag="x"` prop on the featured listings carousel captures touch events. On mobile, users trying to scroll down the page will accidentally drag the carousel sideways instead.

**Fix:** Disable `drag` on touch devices or replace with native horizontal scroll (`overflow-x: scroll`) with snap points.

### Major: Listing Detail Image Too Tall on Mobile

**Issue:** `h-[28rem]` (448px) on the listing detail hero image consumes ~60% of a phone screen, pushing the price and CTA far below the fold.

**Fix:** Use `h-[20rem] sm:h-[28rem]` to reduce height on mobile.

### Major: Contact Page Agent Photo Too Tall

**Issue:** Same `h-[28rem]` on the agent photo in the contact page left column.

**Fix:** Use `h-[20rem] sm:h-[28rem]`.

### Minor: Carousel Nav Buttons Below 44px Touch Target

**Issue:** Prev/next buttons are `w-10 h-10` (40px). Apple's HIG and Google's Material Design recommend 44px minimum.

**Fix:** Increase to `w-11 h-11` (44px).

### Minor: Sticky Sidebar on Listing Detail

**Issue:** The right-column info panel is `sticky top-24` on all screen sizes. On mobile, this makes the panel stick to the top of the viewport (below the sticky header), leaving little room for the actual content.

**Fix:** Remove `sticky` below `lg:` breakpoint: `lg:sticky lg:top-24`.

### Minor: Email Capture Form Input Also Lacks text-base

**Issue:** Same iOS zoom risk as the contact form.

**Fix:** Add `text-base`.

---

## Scorecard

| Criterion | Status | Notes |
|-----------|--------|-------|
| Viewport config | Pass | Correct meta viewport tag |
| Responsive padding | Pass | Consistent px-4 sm:px-6 lg:px-8 |
| Mobile nav | Pass | Hamburger with ARIA, focus trap |
| Image responsiveness | Pass | w-full + object-cover |
| Grid breakpoints | Pass | sm: and lg: prefixes used |
| iOS input zoom | **Blocker** | Inputs lack text-base |
| Touch targets | Minor | Carousel buttons at 40px |
| Touch scroll conflict | **Blocker** | Drag carousel steals vertical scroll |
| Content fold | Major | 28rem images push CTAs below fold |
| Sticky sidebar | Minor | Sticks on mobile, wastes space |
