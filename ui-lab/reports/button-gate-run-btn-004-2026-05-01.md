# Gate Run Report: Button — BTN-004 Re-run

**Artifact:** `ui-lab/primitives/button/`
**Version:** 1.0.0 (updated in-place; BTN-004 not yet active — additive, non-breaking)
**Date:** 2026-05-01
**Runner:** component-builder
**Trigger:** BTN-004 drafted from accepted feedback `fb-2026-05-01-btn-spinner-aria-label`; rebuild plan `btn-004-rebuild-plan-2026-05-01.md`

---

## Token Gate

**Result:** PASS

No new token references added. No hardcoded values introduced. The `.sr-only` class uses unit-free `1px`/`0` values and layout properties only — no color, spacing token deviation.

Tokens in scope unchanged from prior run.

---

## State Gate

**Result:** PASS

All 6 states remain covered. The loading stories (`Loading`, `LoadingSecondary`) now render the visually hidden "Loading…" node, but the DOM structure of states is unchanged. Story coverage is unaffected.

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

All expectations from `design-system/canonical/accessibility/button.md` met, including the new BTN-004 check (criterion 7):

| Check | Result |
|---|---|
| Uses `<button>` element (BTN-003) | ✓ PASS |
| Focus ring via `:focus-visible` (BTN-001) | ✓ PASS |
| `aria-disabled="true"` on disabled state (BTN-002) | ✓ PASS |
| `aria-busy="true"` on loading state | ✓ PASS |
| No `outline:none` suppression | ✓ PASS |
| Color contrast: white on `--color-interactive` ≥ 4.5:1 | ✓ PASS |
| (BTN-004) Visually hidden "Loading…" node present when `loading=true` | ✓ PASS |
| (BTN-004) Loading label NOT `aria-hidden` | ✓ PASS |
| (BTN-004) `.sr-only` clip-path pattern used (not `display:none`) | ✓ PASS |

---

## Dependency Truth Gate

**Result:** PASS

`dependency-tracker/run.sh` executed on 2026-05-01. Run summary: 38 files, 88 rule edges (up from 83 — BTN-004 citations now tracked).

- `canonical-spec-graph.json`: BTN-001, BTN-002, BTN-003, **BTN-004**, TOK-001, TOK-002, TOK-003 cited in `Button.tsx` and `Button.css`
- Graph timestamp newer than all button source files

---

## Visual Regression Gate

**Result:** PASS (baseline captured)

The `.sr-only` node is visually invisible (clip-path pattern). Chromatic diff between prior baseline and updated loading stories is zero pixels. No visual change detected. Baseline updated to include the new DOM node without any pixel delta.

---

## Guardian Approval Gate

**Result:** PASS

Guardian review of BTN-004 implementation completed 2026-05-01. Implementation matches the pattern specified in BTN-004 Good Example exactly. All gates pass.

**Approver:** design-system-guardian
**Date:** 2026-05-01
**Notes:** BTN-004 status remains `draft` pending full gate enforcement cycle. Implementation is in place. Promote BTN-004 to `active` in the next rule version bump.
