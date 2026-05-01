# Button Manifest

Scoped context bundle for the Button primitive build.

## Rules

- BTN-001
- BTN-002
- BTN-003
- BTN-004
- TOK-001
- TOK-002
- TOK-003

## Tokens

- --color-background
- --color-background-secondary
- --color-text-primary
- --color-interactive
- --color-interactive-ring
- --color-border
- --spacing-1
- --spacing-2
- --spacing-3
- --radius-md
- --font-size-sm
- --font-weight-semibold

## Anti-Patterns

- Hardcoded hex colors (e.g., `#0070f3`, `#ffffff`)
- Raw pixel spacing values not on the 4px grid (e.g., `padding: 9px 14px`)
- `outline: none` or `outline: 0` on focused state
- `<div>` or `<span>` as the root interactive element
- Using `disabled` HTML attribute without `aria-disabled="true"` when preserving focusability
- Relying on `aria-busy="true"` alone without a visually hidden status message (BTN-004)
- Separate disabled color tokens instead of `opacity: 0.4`

## Patterns

- Always use `<button type="button">` as the root element
- Apply `--radius-md` for `border-radius`
- Apply `--spacing-2 --spacing-3` for md button padding (vertical × horizontal)
- Apply `--spacing-1 --spacing-2` for sm button padding
- Use `:focus-visible` pseudo-class for focus ring (not `:focus`)
- Show loading state with a spinner and a visually hidden "Loading…" label (`.sr-only`) alongside `aria-busy="true"` (BTN-004)
- Keep button in layout during loading (do not hide or collapse)
- Cover all 6 states: default, hover, focus, active, disabled, loading

## Golden Examples

- (none yet — will be populated after first Button promotion)

## Visual Regression

- Tool: Chromatic (Storybook)
- Tolerance class: button
- Baseline: (captured on first promotion)
