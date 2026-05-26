# Design — Kandice Nowak Realty

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Marketing pages: Stat-Led (giant metric hero, supporting stats grid, then sections)
- App pages: Catalogue (uniform property grid) / Split Studio (detail: image left, info right)
- Content pages: Conversational FAQ (bold questions, brief answers, then form)

## Theme
- `--color-paper`   oklch(98% 0.005 80)
- `--color-paper-2` oklch(96% 0.01 80)
- `--color-ink`     oklch(18% 0.01 260)
- `--color-ink-2`   oklch(45% 0.02 260)
- `--color-rule`    oklch(88% 0.01 80)
- `--color-accent`  oklch(72% 0.14 75)
- `--color-focus`   oklch(72% 0.14 75)

## Typography
- Display: Geist Sans, weight 600, style normal
- Body: Geist Sans, weight 400
- Mono: Geist Mono, weight 400
- Display tracking: -0.03em
- Type scale anchor: --text-display = clamp(2.5rem, 5vw + 0.5rem, 4.75rem)

## Spacing
4-point named scale. Values in tokens.css. Pages use named tokens only.

## Motion
- Easings: cubic-bezier(0.16, 1, 0.3, 1) named --ease-out
- Reveal pattern: none (page is composed)
- Reduced-motion fallback: opacity-only, ≤ 150 ms

## Microinteractions stance
- Silent success (no celebratory toasts)
- Hover delay 800 ms, focus delay 0 ms
- Optimistic update + Undo over confirmation dialogs

## CTA voice
- Primary: black-filled pill (--color-ink fill, --color-paper text)
- Secondary: outlined pill (--color-ink border, --color-ink text)

## Per-page allowances
- Marketing pages MAY use Tier-A CSS art or Tier-B SVG enrichment
- App pages MUST NOT use enrichment
- Content pages: typography only

## What pages MUST share
- The wordmark / logotype
- The accent colour and its placement (≤ 5 % per viewport)
- The display + body fonts
- The CTA voice (pill shape, border-radius, padding rhythm)
- Section heading rhythm (numeral + label + display heading pattern)

## What pages MAY differ on
- Macrostructure within the page-type family
- Hero archetype (within the family's allowance)
- Enrichment — only on marketing pages, only Tier-A or Tier-B

## Exports

### tokens.css
```css
:root {
  --color-paper:      oklch(98% 0.005 80);
  --color-paper-2:    oklch(96% 0.01 80);
  --color-ink:        oklch(18% 0.01 260);
  --color-ink-2:      oklch(45% 0.02 260);
  --color-rule:       oklch(88% 0.01 80);
  --color-accent:     oklch(72% 0.14 75);
  --color-accent-ink: oklch(18% 0.01 260);
  --color-focus:      oklch(72% 0.14 75);

  --font-display: "Geist Sans", system-ui, sans-serif;
  --font-body:    "Geist Sans", system-ui, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, monospace;

  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs:  0.75rem;
  --space-sm:  1rem;
  --space-md:  1.5rem;
  --space-lg:  2rem;
  --space-xl:  3rem;
  --space-2xl: 4.5rem;
  --space-3xl: 7rem;

  --text-xs:  0.75rem;
  --text-sm:  0.875rem;
  --text-md:  1.125rem;
  --text-lg:  1.375rem;
  --text-xl:  1.75rem;
  --text-2xl: 2.25rem;
  --text-display: clamp(2.5rem, 5vw + 0.5rem, 4.75rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 220ms;
  --radius-pill: 9999px;
  --radius-card: 8px;
  --radius-input: 6px;
}
```

### Tailwind v4 @theme
```css
@theme {
  --color-paper:   oklch(98% 0.005 80);
  --color-paper-2: oklch(96% 0.01 80);
  --color-ink:     oklch(18% 0.01 260);
  --color-ink-2:   oklch(45% 0.02 260);
  --color-rule:    oklch(88% 0.01 80);
  --color-accent:  oklch(72% 0.14 75);
  --color-focus:   oklch(72% 0.14 75);

  --font-display: "Geist Sans", system-ui, sans-serif;
  --font-body:    "Geist Sans", system-ui, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, monospace;

  --spacing-md: 1.5rem;
  --text-md: 1.125rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG tokens.json
```json
{
  "color": {
    "paper":  { "$value": "oklch(98% 0.005 80)", "$type": "color" },
    "paper-2":{ "$value": "oklch(96% 0.01 80)", "$type": "color" },
    "ink":    { "$value": "oklch(18% 0.01 260)", "$type": "color" },
    "ink-2":  { "$value": "oklch(45% 0.02 260)", "$type": "color" },
    "rule":   { "$value": "oklch(88% 0.01 80)", "$type": "color" },
    "accent": { "$value": "oklch(72% 0.14 75)", "$type": "color" },
    "focus":  { "$value": "oklch(72% 0.14 75)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Geist Sans", "$type": "fontFamily" },
    "body":    { "$value": "Geist Sans", "$type": "fontFamily" },
    "mono":    { "$value": "Geist Mono", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:         98% 0.005 80;
  --foreground:         18% 0.01 260;
  --primary:            72% 0.14 75;
  --primary-foreground: 18% 0.01 260;
  --muted:              88% 0.01 80;
  --muted-foreground:   45% 0.02 260;
  --border:             88% 0.01 80;
  --input:              88% 0.01 80;
  --ring:               72% 0.14 75;
  --radius:             8px;
}
```
