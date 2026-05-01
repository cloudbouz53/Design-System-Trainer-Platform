# Geist Materials Notes

Structured summaries of Geist foundation tokens derived from raw observations.

---

## Color

| Token Candidate | Observed Value (light) | Role / Usage |
|---|---|---|
| `--color-background` | `#ffffff` | Default page/panel background |
| `--color-background-secondary` | `--ds-background-200` (~#fafafa) | Card/surface background |
| `--color-text-primary` | `--ds-gray-1000` (~#0a0a0a) | Primary body text |
| `--color-text-secondary` | `--ds-gray-700` (~#666666) | Secondary/muted text, placeholders |
| `--color-border` | `--ds-gray-400` (~#e6e6e6) | Default borders |
| `--color-interactive` | `--ds-blue-700` (~#0070f3) | Links, focus rings, CTA backgrounds |
| `--color-error` | `--ds-red-700` (~#e00) | Error borders, error text |
| `--color-success` | `--ds-green-700` (~#0a7a00) | Success borders, success text |
| `--color-warning` | `--ds-amber-700` (~#f5a623) | Warning indicators |

Source: raw-observations.md §Color

---

## Typography

| Token Candidate | Observed Value | Usage |
|---|---|---|
| `--font-sans` | `"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Default body font |
| `--font-mono` | `"Geist Mono", "SF Mono", Menlo, Consolas, monospace` | Code, numeric displays |
| `--font-size-xs` | `12px` | Labels, captions |
| `--font-size-sm` | `14px` | Body text (default) |
| `--font-size-md` | `16px` | Emphasized body |
| `--font-size-lg` | `20px` | Subheadings |
| `--font-size-xl` | `24px` | Section headings |
| `--font-size-2xl` | `32px` | Page headings |
| `--font-weight-regular` | `400` | Body text |
| `--font-weight-medium` | `500` | Emphasized labels |
| `--font-weight-semibold` | `600` | Button labels, subheadings |
| `--font-weight-bold` | `700` | Strong headings |
| `--line-height-body` | `1.5` | Body paragraphs |
| `--line-height-heading` | `1.2` | Headings |
| `--letter-spacing-caps` | `0.05em` | All-caps labels |

Source: raw-observations.md §Typography

---

## Spacing

| Token Candidate | Value | Usage |
|---|---|---|
| `--spacing-1` | `4px` | Minimum gap, icon margin |
| `--spacing-2` | `8px` | Small padding (sm button, input horizontal) |
| `--spacing-3` | `12px` | Medium horizontal padding (md button) |
| `--spacing-4` | `16px` | Standard section padding |
| `--spacing-6` | `24px` | Component group spacing |
| `--spacing-8` | `32px` | Section separation |
| `--spacing-12` | `48px` | Major section gaps |
| `--spacing-16` | `64px` | Page-level separation |

Naming follows a `spacing-N` where N is the multiplier on a 4px base grid.
Source: raw-observations.md §Spacing

---

## Border Radius

| Token Candidate | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Tags, badges, small chips |
| `--radius-md` | `6px` | Buttons, inputs, default components |
| `--radius-lg` | `8px` | Cards, panels, modals |
| `--radius-full` | `9999px` | Pill shapes |

Source: raw-observations.md §Border Radius

---

## Shadows

| Token Candidate | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Cards at rest |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.15)` | Dropdowns, popovers |

Source: raw-observations.md §Shadows
