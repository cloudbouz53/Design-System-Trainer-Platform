# Geist Inferred Rules

Candidate rules awaiting guardian approval for canonical promotion. Each entry cites supporting evidence.

**Important:** These are candidates, NOT canonical authority. Builders must NOT consume this file.

---

## Token Rules

### Use semantic color tokens for all value-bearing properties

Source: materials-notes.md §Color; raw-observations.md §Color (Geist uses `--ds-*` semantic tokens throughout)
Observed: Geist never uses raw hex or RGB values in component styles — all colors go through named semantic tokens with role-based names.
Inferred Do: Reference only canonical semantic token names (e.g., `--color-background`, `--color-text-primary`) in component implementations.
Inferred Do Not: Use raw hex colors, RGB/HSL literals, or named CSS colors (`red`, `blue`) in component styles.
Why: Token-based color allows theming, dark mode, and future design changes without touching component code.

### Use spacing tokens on the 4px grid

Source: materials-notes.md §Spacing; raw-observations.md §Spacing (4px base grid observed throughout)
Observed: All spacing values in Geist are multiples of 4px. Non-grid values are absent from the reference.
Inferred Do: Use spacing tokens (`--spacing-1` through `--spacing-16`) for all margin, padding, and gap values.
Inferred Do Not: Use arbitrary pixel values like `11px`, `13px`, `15px`, or `20px`.
Why: Grid alignment produces visual consistency and predictable layouts.

### Use border-radius tokens

Source: materials-notes.md §Border Radius; raw-observations.md §Border Radius (three distinct values observed)
Observed: Geist uses exactly three radii for components: 4px (sm), 6px (md), 8px (lg), plus 9999px for pills.
Inferred Do: Use `--radius-sm`, `--radius-md`, `--radius-lg`, or `--radius-full` for all `border-radius` values.
Inferred Do Not: Use arbitrary values like `5px`, `7px`, or `10px`.
Why: Consistent radii produce a unified visual language across components.

---

## Button Rules

### Button focus ring must be visible

Source: raw-observations.md §Button (focus: `outline: 2px solid --ds-blue-700; outline-offset: 2px` observed)
Observed: Geist buttons always show a 2px outline on focus using the interactive color token, with 2px offset to separate from the button border.
Inferred Do: Apply `outline: 2px solid var(--color-interactive)` with `outline-offset: 2px` on `:focus-visible`.
Inferred Do Not: Remove or suppress the focus ring with `outline: none` on focused buttons.
Why: Visible focus indicators are required for keyboard and assistive technology users (WCAG 2.4.7).

### Button disabled state uses opacity

Source: raw-observations.md §Button (disabled: `opacity: 0.4; cursor: not-allowed` observed)
Observed: Geist disabled buttons use opacity reduction rather than a separate disabled color token.
Inferred Do: Set `opacity: 0.4` and `cursor: not-allowed` for the disabled state.
Inferred Do Not: Use a separate disabled background color; opacity communicates the state consistently across variants.
Why: Opacity-based disabled state works across all button variants without duplicating token definitions.

### Button uses semantic HTML button element

Source: raw-observations.md §Button (`<button>` element observed; implicit role confirmed)
Observed: Geist always uses `<button>` for interactive buttons, never `<div>`, `<a>`, or `<span>`.
Inferred Do: Use `<button type="button">` (or `type="submit"` in forms) for all button implementations.
Inferred Do Not: Use non-semantic elements with `role="button"` unless there is a documented reason.
Why: Native `<button>` provides keyboard interaction, implicit role, and accessible activation for free.

### Button loading state uses aria-busy

Source: raw-observations.md §Button (loading spinner observed; button remains in layout)
Observed: Loading state shows a spinner while the button remains visible and non-interactive.
Inferred Do: Set `aria-busy="true"` and `aria-disabled="true"` during the loading state; keep the button in the DOM.
Inferred Do Not: Remove the button from DOM or hide it during loading; replace label text with spinner without indicating loading state.
Why: `aria-busy` communicates progress to screen readers; keeping the button in layout prevents layout shift.

---

## Input Rules

### Input must have an accessible label

Source: raw-observations.md §Input; component-notes.md §Input §Accessibility
Observed: Geist inputs always have a visible `<label>` associated via `htmlFor`/`id` or an `aria-label` when a visible label is not possible.
Inferred Do: Always associate an input with either a visible `<label>` (via `htmlFor`/`id`) or an `aria-label` attribute.
Inferred Do Not: Use placeholder text as the only label; placeholders disappear on input and are not reliably announced by screen readers.
Why: Screen readers require explicit label association to announce the input's purpose.

### Input error message uses aria-describedby

Source: raw-observations.md §Input; component-notes.md §Input §Accessibility
Observed: Geist error messages are referenced from the input via `aria-describedby`, not only via visual position.
Inferred Do: When an input is in the error state, add `aria-describedby` pointing to the error message element's `id`; the error element should have `role="alert"` or be in an `aria-live` region.
Inferred Do Not: Only style the input red without programmatically linking the error message.
Why: Without `aria-describedby`, screen reader users cannot discover the error description.

### Input focus state changes border color and adds shadow ring

Source: raw-observations.md §Input (focus: border color + box-shadow observed)
Observed: Geist inputs on focus change border to `--color-interactive` and add a 2px box-shadow ring.
Inferred Do: On `:focus-visible`, change border-color to `--color-interactive` and apply `box-shadow: 0 0 0 2px var(--color-interactive-ring)`.
Inferred Do Not: Only change border color without the shadow ring (ring improves visibility on non-white backgrounds).
Why: Combined border + ring provides a visible focus indicator that passes WCAG in more contexts.
