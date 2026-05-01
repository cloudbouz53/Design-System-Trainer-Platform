# Geist Component Notes

Per-component structured observations from the Geist reference.

---

## Button

### Visual Anatomy

- Container: `<button>` element with `border-radius: var(--radius-md)` (6px)
- Label: typography `--font-size-sm` (14px), `--font-weight-semibold` (600)
- Icon slot: optional leading or trailing icon; standard icon size 16px
- Loading spinner: replaces icon slot during loading; button stays in layout

### Interaction States

| State | Visual Change |
|---|---|
| `default` | Primary: `--color-interactive` bg, white text. Secondary: transparent bg, `--color-border` border, `--color-text-primary` text |
| `hover` | Primary: background darkens (~`--ds-blue-800`). Secondary: slight background fill (`--color-background-secondary`) |
| `focus` | `outline: 2px solid --color-interactive; outline-offset: 2px` |
| `active` | Subtle scale transform `scale(0.98)` or background darkens slightly |
| `disabled` | `opacity: 0.4; cursor: not-allowed; pointer-events: none` |
| `loading` | Spinner visible; button visually disabled but maintains size |

### Accessibility Patterns

- Role: implicit `button` via `<button>` element
- Keyboard: `Enter` and `Space` activate; matches native `<button>` behavior
- Focus ring: visible 2px outline using `--color-interactive`
- ARIA: `aria-disabled="true"` when disabled (not `disabled` attr alone, to preserve focusability if needed); `aria-busy="true"` during loading
- Color contrast: white text on `--color-interactive` meets WCAG AA (≥ 4.5:1 for normal text)

### Token Usage

| Property | Token |
|---|---|
| background (primary) | `--color-interactive` |
| text (primary) | white (hardcoded for contrast — acceptable exception on interactive bg) |
| background (secondary) | transparent / `--color-background-secondary` on hover |
| border (secondary) | `--color-border` |
| text (secondary) | `--color-text-primary` |
| border-radius | `--radius-md` |
| padding (md) | `--spacing-2` (v) × `--spacing-3` (h) |
| padding (sm) | `--spacing-1` (v) × `--spacing-2` (h) |
| focus outline | `--color-interactive` |
| disabled opacity | `0.4` (unitless, not tokenized) |
| font-size | `--font-size-sm` |
| font-weight | `--font-weight-semibold` |

### Compositional Rules

- Loading state always includes a visible spinner; never a blank button
- Icon is leading by default; trailing icon only for explicit "external link" or "expand" affordances
- Variant must be passed as a prop; never inferred from context

### Source Citations

- raw-observations.md §Button

---

## Input

### Visual Anatomy

- Container: `<input>` element wrapped in a `<div>` with optional `<label>` above and error/helper text below
- Border: `1px solid --color-border` by default
- Background: `--color-background`
- Height: 32px (medium), 28px (small), 40px (large)

### Interaction States

| State | Visual Change |
|---|---|
| `default` | `--color-border` border, `--color-background` background |
| `hover` | Border color slightly darkens (subtle — same border, slight background shift) |
| `focus` | Border `--color-interactive`, `box-shadow: 0 0 0 2px --color-interactive-ring` (~blue-300 equivalent) |
| `disabled` | Background `--color-background-secondary`; opacity 0.6; cursor not-allowed |
| `error` | Border `--color-error`; error message shown below |
| `success` | Border `--color-success`; optional success indicator |

### Accessibility Patterns

- Role: implicit `textbox` via `<input type="text">` (or other input type)
- Required: always associated with a label via `htmlFor`/`id` pairing OR `aria-label`
- Error messages: referenced via `aria-describedby` pointing to the error element; error element uses `role="alert"` or is in a live region
- Disabled: uses `disabled` attribute OR `aria-disabled="true"` depending on whether focus must be preserved
- Placeholder: present but NOT the sole label — always combined with a visible `<label>` or `aria-label`
- Color contrast: placeholder text `--color-text-secondary` meets WCAG AA for placeholder (≥ 3:1 for non-text)

### Token Usage

| Property | Token |
|---|---|
| border | `--color-border` |
| border (error) | `--color-error` |
| border (success) | `--color-success` |
| border (focus) | `--color-interactive` |
| focus shadow | `0 0 0 2px` + blue-ring (needs explicit token: `--color-interactive-ring`) |
| background | `--color-background` |
| background (disabled) | `--color-background-secondary` |
| text | `--color-text-primary` |
| placeholder | `--color-text-secondary` |
| border-radius | `--radius-md` |
| padding horizontal | `--spacing-2` |
| font-size | `--font-size-sm` |

### Source Citations

- raw-observations.md §Input
