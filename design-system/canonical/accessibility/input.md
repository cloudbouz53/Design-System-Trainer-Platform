# Input Accessibility Expectations

**Version:** 1.0.0
**Source:** component-notes.md §Input §Accessibility Patterns — approved by guardian 2026-05-01

## Semantic Role

- MUST use `<input>` element with appropriate `type` attribute (`text`, `email`, `password`, etc.)
- Role is implicit (`textbox` for most types)

## Label Association

- MUST have an associated label via ONE of:
  1. `<label htmlFor="input-id">` paired with `<input id="input-id">` (preferred — most compatible)
  2. `aria-label="Description"` (when no visible label is appropriate)
  3. `aria-labelledby="label-element-id"` (when label is a non-`<label>` element)
- MUST NOT rely on placeholder text as the sole label

## Keyboard Interaction

Input uses native keyboard behavior. No custom keyboard handling required at MVP.

## Focus Management

- Focus ring: `border-color: var(--color-interactive)` + `box-shadow: 0 0 0 2px var(--color-interactive-ring)` on `:focus-visible`
- Must be visible; must not be suppressed

## ARIA Attributes

| State | Attribute | Value |
|---|---|---|
| Error | `aria-invalid` | `"true"` |
| Success | `aria-invalid` | `"false"` (optional) |
| Error message present | `aria-describedby` | Error element's `id` |
| Helper text present | `aria-describedby` | Helper element's `id` (space-separated with error if both) |
| Disabled | `disabled` attribute | Present |
| Required | `required` attribute OR `aria-required` | `"true"` |

## Error Message

- Error message element MUST have a unique `id` referenced by `aria-describedby` on the input
- Error message element MUST use `role="alert"` OR live in an `aria-live` region to announce on state change

## Color Contrast

- Text in input (`--color-text-primary`) on `--color-background`: WCAG AA ≥ 4.5:1
- Placeholder (`--color-text-secondary`) on `--color-background`: WCAG AA ≥ 3:1 (non-text criterion for placeholder)
- Error border (`--color-error`) on `--color-background`: WCAG AA ≥ 3:1 (UI component criterion)

## Gate Check Criteria

The Accessibility Gate passes when:
1. `<input>` element is used
2. Input has an associated `<label>` or `aria-label`
3. Placeholder is NOT the sole label
4. Focus ring is visible on keyboard focus
5. Error state sets `aria-invalid="true"` and `aria-describedby` pointing to visible error text
6. Error message is in a live region or has `role="alert"`
7. Contrast ratios meet WCAG AA for text and UI components
