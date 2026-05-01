# Button Accessibility Expectations

**Version:** 1.0.0
**Source:** component-notes.md §Button §Accessibility Patterns — approved by guardian 2026-05-01

## Semantic Role

- MUST use `<button>` element (implicit `role="button"`)
- MUST NOT use `<div>`, `<span>`, `<a>`, or other non-semantic elements as interactive buttons without explicit `role="button"` AND full keyboard handler implementation

## Keyboard Interaction

| Key | Action |
|---|---|
| `Enter` | Activates the button (native `<button>` behavior) |
| `Space` | Activates the button (native `<button>` behavior) |
| `Tab` | Moves focus to/from the button |

## Focus Management

- Focus ring MUST be visible when button receives keyboard focus
- Focus ring: `outline: 2px solid var(--color-interactive); outline-offset: 2px`
- MUST NOT suppress focus ring with `outline: none` or `outline: 0`
- May use `:focus-visible` to suppress ring on mouse click (acceptable enhancement)

## ARIA Attributes

| State | Attribute | Value |
|---|---|---|
| Disabled | `aria-disabled` | `"true"` |
| Loading | `aria-busy` | `"true"` |
| Loading | `aria-disabled` | `"true"` |
| Toggleable | `aria-pressed` | `"true"` or `"false"` |
| Has popup | `aria-haspopup` | Appropriate type |

## Color Contrast

- White text on `--color-interactive` (#0070f3): must meet WCAG AA ≥ 4.5:1 for normal text
- `--color-text-primary` on `--color-background-secondary` (secondary button hover): must meet WCAG AA ≥ 4.5:1

## Gate Check Criteria

The Accessibility Gate passes when:
1. `<button>` element is used
2. `Enter` and `Space` activate the button (native for `<button>`)
3. Focus ring is visible on keyboard focus
4. `aria-disabled="true"` is present on disabled state
5. `aria-busy="true"` is present on loading state
6. Contrast ratio ≥ 4.5:1 for all text/bg combinations
7. (BTN-004) When `loading=true`: a visually hidden text node ("Loading…") is present inside `<button>`, is NOT `aria-hidden`, and uses the `.sr-only` clip-path pattern
