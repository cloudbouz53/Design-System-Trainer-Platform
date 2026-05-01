# Input Manifest

Scoped context bundle for the Input primitive build.

## Rules

- INP-001
- INP-002
- TOK-001
- TOK-002
- TOK-003

## Tokens

- --color-background
- --color-background-secondary
- --color-text-primary
- --color-text-secondary
- --color-border
- --color-interactive
- --color-interactive-ring
- --color-error
- --color-success
- --spacing-2
- --radius-md
- --font-size-sm
- --font-weight-regular

## Anti-Patterns

- Placeholder text as the only label (no `<label>` or `aria-label`)
- Error state without `aria-invalid="true"` and `aria-describedby`
- Hardcoded border colors (e.g., `border-color: #e00`)
- `outline: none` on focused input
- Missing `role="alert"` or `aria-live` on error message element

## Patterns

- Always wrap `<input>` with `<label>` association (htmlFor/id)
- Show visible error message below the input in error state
- Apply `--radius-md` for border-radius
- Apply `--spacing-2` for horizontal padding
- Use `aria-describedby` to link helper text and/or error message
- Cover all 6 states: default, hover, focus, disabled, error, success

## Golden Examples

- (none yet — will be populated after first Input promotion)

## Visual Regression

- Tool: Chromatic (Storybook)
- Tolerance class: input
- Baseline: (captured on first promotion)
