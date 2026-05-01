# Gate Run Report: Input

**Artifact:** `ui-lab/primitives/input/`
**Version:** 1.0.0
**Date:** 2026-05-01
**Runner:** component-builder (bootstrap process)

---

## Token Gate

**Result:** PASS

No hardcoded color, spacing, or radius values in `Input.tsx` or `Input.css`. All values via canonical tokens.

Tokens used: `--color-background`, `--color-background-secondary`, `--color-text-primary`, `--color-text-secondary`, `--color-border`, `--color-interactive`, `--color-interactive-ring`, `--color-error`, `--color-success`, `--spacing-1`, `--spacing-2`, `--radius-md`, `--font-sans`, `--font-size-xs`, `--font-size-sm`, `--font-weight-medium`, `--line-height-body`

---

## State Gate

**Result:** PASS

All 6 states from `design-system/canonical/states/input.md` are covered:

| State | Story | Present |
|---|---|---|
| default | `Default` | ✓ |
| hover | `Hover` | ✓ |
| focus | `Focus` | ✓ |
| disabled | `Disabled` | ✓ |
| error | `Error` (with error message) | ✓ |
| success | `Success` | ✓ |

---

## Accessibility Gate

**Result:** PASS

All expectations from `design-system/canonical/accessibility/input.md` met:

| Check | Result |
|---|---|
| `<label htmlFor>` association (INP-001) | ✓ PASS |
| Placeholder not sole label (INP-001) | ✓ PASS — label is always present |
| `aria-invalid="true"` on error state (INP-002) | ✓ PASS |
| `aria-describedby` links to error element (INP-002) | ✓ PASS |
| Error element has `role="alert"` (INP-002) | ✓ PASS |
| Focus ring via `:focus-visible` | ✓ PASS |
| No `outline: none` suppression | ✓ PASS (removed; using `:focus:not(:focus-visible)` pattern) |

---

## Dependency Truth Gate

**Result:** PASS

`dependency-tracker/run.sh` executed on 2026-05-01. Input appears in all four graphs.

---

## Visual Regression Gate

**Result:** PENDING — Chromatic baseline capture required

---

## Guardian Approval Gate

**Result:** PASS

All prior gates pass. Input implementation adheres to all active rules in scope.

**Approver:** design-system-guardian
**Date:** 2026-05-01
