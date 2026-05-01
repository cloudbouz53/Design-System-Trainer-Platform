# Button States

**Version:** 1.0.0
**Source:** component-notes.md §Button §Interaction States — approved by guardian 2026-05-01

All states listed here must be exercised in the Button component's Storybook story. Missing state coverage fails the State Gate.

| State | Description | Visual Requirements | ARIA Requirements |
|---|---|---|---|
| `default` | Button at rest, interactive | Primary: `--color-interactive` bg, white text. Secondary: transparent bg, `--color-border` border. | None beyond base role |
| `hover` | Mouse pointer over the button | Primary: background darkens. Secondary: subtle background fill (`--color-background-secondary`). | None |
| `focus` | Keyboard focus or programmatic focus | `outline: 2px solid var(--color-interactive); outline-offset: 2px` | None (focus is a native browser state) |
| `active` | Button being pressed/clicked | Slight `scale(0.98)` transform or background darkens | None |
| `disabled` | Button is not interactive | `opacity: 0.4; cursor: not-allowed` | `aria-disabled="true"` |
| `loading` | Async operation in progress | Spinner visible; button visually non-interactive but stays in layout | `aria-busy="true"` and `aria-disabled="true"` |

## State Coverage Requirements

The Storybook story must export named stories for:
- `Default`
- `Hover` (use Storybook play function or CSS forced state)
- `Focus` (use Storybook play function)
- `Active` (use Storybook play function)
- `Disabled`
- `Loading`

Additionally, all of the above must be shown for at least the `primary` variant. Secondary and tertiary variants must show at least `Default` and `Disabled`.
