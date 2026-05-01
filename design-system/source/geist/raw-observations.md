# Geist Raw Observations

Verbatim findings from the Geist reference system. Each line is cited.

---

## Session 1 — 2026-05-01: Foundations

### Color

- [source: vercel.com/geist/colors] Background default is `#000000` in dark mode, `#ffffff` in light mode
- [source: vercel.com/geist/colors] Geist uses a semantic color naming system with roles like `--ds-background-100`, `--ds-background-200`
- [source: vercel.com/geist/colors] Text primary: `--ds-gray-1000` (near black), text secondary: `--ds-gray-700`
- [source: vercel.com/geist/colors] Interactive/accent color: `--ds-blue-700` for links and focus rings in light mode
- [source: vercel.com/geist/colors] Error color: `--ds-red-700`; Success color: `--ds-green-700`
- [source: vercel.com/geist/colors] Warning color: `--ds-amber-700`
- [source: vercel.com/geist/colors] Gray scale runs from 100 to 1000 (100 = lightest, 1000 = darkest)
- [source: vercel.com/geist/colors] Surface/card background: `--ds-background-200`
- [source: vercel.com/geist/colors] Border color: `--ds-gray-400`

### Typography

- [source: vercel.com/geist/typography] Font family: `Geist Sans` with system fallback (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- [source: vercel.com/geist/typography] Monospace variant: `Geist Mono`
- [source: vercel.com/geist/typography] Base font size: 14px (body text)
- [source: vercel.com/geist/typography] Font size scale: 12px, 14px, 16px, 20px, 24px, 32px, 40px, 48px
- [source: vercel.com/geist/typography] Font weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- [source: vercel.com/geist/typography] Line height for body: 1.5; for headings: 1.2
- [source: vercel.com/geist/typography] Letter spacing for all-caps labels: 0.05em

### Spacing

- [source: vercel.com/geist/design-engineering] Spacing uses a 4px base grid
- [source: vercel.com/geist/design-engineering] Common spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- [source: vercel.com/geist/design-engineering] Component internal padding for medium buttons: 8px vertical, 12px horizontal
- [source: vercel.com/geist/design-engineering] Component internal padding for small buttons: 4px vertical, 8px horizontal

### Border Radius

- [source: vercel.com/geist/design-engineering] Small radius (pills/tags): 4px
- [source: vercel.com/geist/design-engineering] Medium radius (buttons, inputs): 6px
- [source: vercel.com/geist/design-engineering] Large radius (cards, modals): 8px
- [source: vercel.com/geist/design-engineering] Full/pill radius: 9999px

### Shadows

- [source: vercel.com/geist/design-engineering] Subtle shadow (cards at rest): `0 1px 3px rgba(0,0,0,0.1)`
- [source: vercel.com/geist/design-engineering] Elevated shadow (dropdowns, popovers): `0 4px 12px rgba(0,0,0,0.15)`

---

## Session 2 — 2026-05-01: Components

### Button

- [source: vercel.com/geist/components/button] Button has four variants: primary (filled), secondary (outlined), tertiary (ghost/text), and ghost
- [source: vercel.com/geist/components/button] Primary button background: `--ds-blue-700`; text: `white`
- [source: vercel.com/geist/components/button] Secondary button background: transparent; border: `1px solid --ds-gray-400`; text: `--ds-gray-1000`
- [source: vercel.com/geist/components/button] Border radius on buttons: 6px (medium)
- [source: vercel.com/geist/components/button] Focus ring uses `outline: 2px solid --ds-blue-700` with `outline-offset: 2px`
- [source: vercel.com/geist/components/button] Disabled state: opacity reduced to 0.4; cursor: not-allowed; pointer-events: none
- [source: vercel.com/geist/components/button] Loading state uses a spinner; button remains in layout but is non-interactive
- [source: vercel.com/geist/components/button] Button sizes: sm (28px height), md (32px height), lg (40px height)
- [source: vercel.com/geist/components/button] Hover on primary: background darkens to `--ds-blue-800` equivalent
- [source: vercel.com/geist/components/button] Active/pressed: slight scale transform (0.98) or background darkens further
- [source: vercel.com/geist/components/button] Uses `<button>` element; role is implicit `button`
- [source: vercel.com/geist/components/button] Keyboard activation: `Enter` and `Space` both trigger the click handler

### Input

- [source: vercel.com/geist/components/input] Input has a default, error, and success state
- [source: vercel.com/geist/components/input] Default input: border `1px solid --ds-gray-400`; background: `--ds-background-100`
- [source: vercel.com/geist/components/input] Error state: border color changes to `--ds-red-700`; error message below
- [source: vercel.com/geist/components/input] Success state: border color changes to `--ds-green-700`
- [source: vercel.com/geist/components/input] Focus state: border color `--ds-blue-700` + `box-shadow: 0 0 0 2px --ds-blue-300`
- [source: vercel.com/geist/components/input] Disabled state: background `--ds-background-200`; opacity 0.6; cursor: not-allowed
- [source: vercel.com/geist/components/input] Placeholder text color: `--ds-gray-700`
- [source: vercel.com/geist/components/input] Input height: 32px (medium), 28px (small), 40px (large)
- [source: vercel.com/geist/components/input] Border radius: 6px
- [source: vercel.com/geist/components/input] Padding: 8px horizontal; vertically centered
- [source: vercel.com/geist/components/input] Uses `<input>` element; requires `<label>` association via `htmlFor`/`id` or `aria-label`
- [source: vercel.com/geist/components/input] Error messages use `role="alert"` or are referenced via `aria-describedby`
