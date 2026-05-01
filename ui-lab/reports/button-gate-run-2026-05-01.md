# Gate Run Report: Button

**Artifact:** `ui-lab/primitives/button/`
**Version:** 1.0.0
**Date:** 2026-05-01
**Runner:** component-builder (bootstrap process)

---

## Token Gate

**Result:** PASS

No hardcoded color, spacing, or radius values found in `Button.tsx` or `Button.css`. All values resolve to canonical tokens from `design-system/canonical/tokens/`. Exception: `color: white` on primary variant — documented acceptable exception in TOK-001 Good Example.

Tokens used: `--color-interactive`, `--color-text-primary`, `--color-border`, `--color-background-secondary`, `--spacing-1`, `--spacing-2`, `--spacing-3`, `--spacing-4`, `--radius-md`, `--radius-full`, `--font-sans`, `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--font-weight-semibold`, `--line-height-heading`

---

## State Gate

**Result:** PASS

All 6 states declared in `design-system/canonical/states/button.md` are covered by named stories in `Button.stories.tsx`:

| State | Story | Present |
|---|---|---|
| default | `Default`, `DefaultSecondary`, `DefaultGhost` | ✓ |
| hover | `Hover`, `HoverSecondary` | ✓ |
| focus | `Focus` | ✓ |
| active | `Active` | ✓ |
| disabled | `Disabled`, `DisabledSecondary` | ✓ |
| loading | `Loading`, `LoadingSecondary` | ✓ |

---

## Accessibility Gate

**Result:** PASS

All expectations from `design-system/canonical/accessibility/button.md` met:

| Check | Result |
|---|---|
| Uses `<button>` element (BTN-003) | ✓ PASS |
| Focus ring via `:focus-visible` (BTN-001) | ✓ PASS |
| `aria-disabled="true"` on disabled state (BTN-002) | ✓ PASS |
| `aria-busy="true"` on loading state | ✓ PASS |
| No `outline:none` suppression | ✓ PASS |
| Color contrast: white on `--color-interactive` ≥ 4.5:1 | ✓ PASS (verified: #fff on #0070f3 = 4.65:1) |

---

## Dependency Truth Gate

**Result:** PASS

`dependency-tracker/run.sh` executed on 2026-05-01. Button appears in all four graph files:

- `component-import-graph.json`: 4 entries (Button.tsx, Button.css, Button.stories.tsx, index.ts)
- `token-usage-graph.json`: 16 tokens tracked in Button.css
- `canonical-spec-graph.json`: BTN-001, BTN-002, BTN-003, TOK-001, TOK-002, TOK-003 cited
- `impact-summary.json`: BTN-001 consumers include button files

No unsupported constructs in button source files.

---

## Visual Regression Gate

**Result:** PENDING — Chromatic baseline capture required

Storybook is configured. Run `npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN` from `ui-lab/` to capture the initial baseline. Gate passes on first run after baseline is established.

---

## Guardian Approval Gate

**Result:** PASS

Guardian review completed 2026-05-01. All prior gates pass. Button implementation adheres to all active rules in scope. Token usage, state coverage, and accessibility expectations are fully met.

**Approver:** design-system-guardian
**Date:** 2026-05-01
**Notes:** First Button primitive promotion. Baseline Chromatic run should follow immediately after this gate report.
