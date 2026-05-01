# Input States

**Version:** 1.0.0
**Source:** component-notes.md §Input §Interaction States — approved by guardian 2026-05-01

All states listed here must be exercised in the Input component's Storybook story.

| State | Description | Visual Requirements | ARIA Requirements |
|---|---|---|---|
| `default` | Input at rest | `--color-border` border, `--color-background` bg | None beyond base role |
| `hover` | Mouse over the input | Subtle border darkens | None |
| `focus` | Input has keyboard/programmatic focus | Border `--color-interactive`; `box-shadow: 0 0 0 2px var(--color-interactive-ring)` | None (native focus state) |
| `disabled` | Input is not editable | `--color-background-secondary` bg; `opacity: 0.6; cursor: not-allowed` | `disabled` attribute or `aria-disabled="true"` |
| `error` | Input value is invalid | Border `--color-error`; error message displayed below | `aria-invalid="true"`; `aria-describedby` pointing to error element |
| `success` | Input value is valid | Border `--color-success`; optional success indicator | None required (optional `aria-invalid="false"`) |

## State Coverage Requirements

The Storybook story must export named stories for:
- `Default`
- `Hover`
- `Focus`
- `Disabled`
- `Error` (with visible error message)
- `Success`

Each story must include the associated label element.
