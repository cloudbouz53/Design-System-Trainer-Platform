# Reference: End-to-End Feedback Cycle — BTN-004

**Cycle ID:** btn-004-cycle
**Date:** 2026-05-01
**Status:** Complete
**Trigger artifact:** Button primitive (`ui-lab/primitives/button/`)
**Rule created:** BTN-004 — Button Loading State Must Include Visually Hidden Loading Label

---

## Purpose

This document records the full lifecycle of a single feedback item from observation through canonical promotion and re-verified golden example. It serves as a repeatable reference for future feedback cycles.

---

## Step 1 — Observation filed

**File:** `design-system/feedback/pending/fb-2026-05-01-btn-spinner-aria-label.md`
**Submitted by:** visual-reviewer
**Date:** 2026-05-01

The Button component rendered a spinner during loading with `aria-hidden="true"` and `aria-busy="true"`, but no status message node. WCAG 2.1 SC 4.1.3 requires programmatically determinable status messages; relying on `aria-busy` alone has inconsistent support across NVDA + Firefox.

**Required metadata:** ✓ id, date, source, affected_artifacts, type

---

## Step 2 — Guardian review and acceptance

**File moved to:** `design-system/feedback/accepted/fb-2026-05-01-btn-spinner-aria-label.md`
**Reviewer:** design-system-guardian
**Date:** 2026-05-01
**Decision:** ACCEPTED — new rule BTN-004
**Classification:** Additive, non-breaking

Guardian added `## Resolution Rationale` section per `review-files.md` protocol.

---

## Step 3 — Rule authoring by feedback-librarian

**New rule file:** `design-system/canonical/components/BTN-004.md`
**Status on creation:** draft
**Version:** 1.0.0
**RULES.md updated:** BTN-004 row added with `draft` status
**changelog.md updated:** Entry for BTN-004 addition on 2026-05-01
**Migration file:** Not required (additive change — no breaking API change)

Rule specifies:
- Visually hidden `<span className="sr-only">Loading…</span>` alongside spinner
- `.sr-only` must use clip-path pattern (not `display:none`)
- `aria-busy="true"` must be retained

---

## Step 4 — Impact analysis

**Run:** `dependency-tracker/run.sh` — 2026-05-01
**Result:** `impact-summary.json` refreshed; 37 files, 83 rule edges
**Rebuild plan:** `ui-lab/reports/btn-004-rebuild-plan-2026-05-01.md`

Affected artifacts:
- **Must update:** `Button.tsx`, `Button.css`, `button.manifest.md`
- **Should update:** `Button.stories.tsx` (comment), `button/v1.0.0/` golden example, `accessibility/button.md`

---

## Step 5 — Implementation (component-builder)

**Changes made to `ui-lab/primitives/button/`:**

| File | Change |
|---|---|
| `Button.tsx` | Added `<span className="sr-only">Loading…</span>` alongside spinner in loading branch; rule comment updated to include BTN-004 |
| `Button.css` | Added `.sr-only` utility class using clip-path pattern; rule comment updated to include BTN-004 |
| `Button.stories.tsx` | Rule comment updated to include BTN-004 |

**Changes made to `design-system/`:**

| File | Change |
|---|---|
| `retrieval/manifests/button.manifest.md` | BTN-004 added to Rules section; anti-pattern and pattern entries updated |
| `canonical/accessibility/button.md` | Gate Check Criteria criterion 7 added for BTN-004 visually hidden loading label |
| `golden-examples/single-components/button/v1.0.0/` | All four files synced to BTN-004 implementation; metadata updated |

---

## Step 6 — Gate re-run

**Report:** `ui-lab/reports/button-gate-run-btn-004-2026-05-01.md`
**Dependency tracker re-run:** 38 files, 88 rule edges (BTN-004 now tracked)

| Gate | Result |
|---|---|
| Token Gate | PASS — no new tokens; no hardcoded values introduced |
| State Gate | PASS — all 6 states still covered |
| Accessibility Gate | PASS — BTN-004 criterion 7 verified |
| Dependency Truth Gate | PASS — BTN-004 in canonical-spec-graph |
| Visual Regression Gate | PASS — zero pixel delta (sr-only is visually invisible) |
| Guardian Approval Gate | PASS — design-system-guardian approved 2026-05-01 |

---

## Step 7 — Rebuild plan checklist closed

All six checklist items in `btn-004-rebuild-plan-2026-05-01.md` marked complete.

---

## Key invariants demonstrated

1. **No file leaves `pending/` without guardian authority** — the feedback moved to `accepted/` only after guardian review.
2. **No canonical rule becomes `active` without the full gate pipeline** — BTN-004 remains `draft` until a future version bump after the pipeline confirms enforcement.
3. **Dependency graph is never hand-edited** — `run.sh` was invoked after every relevant change.
4. **Golden examples stay in sync** — the `v1.0.0/` snapshot was updated in-place when the change was additive and non-breaking.
5. **RULES.md and changelog.md are the live index** — every rule transition is recorded there first.

---

## Files produced or modified in this cycle

```
design-system/feedback/accepted/fb-2026-05-01-btn-spinner-aria-label.md     (moved)
design-system/canonical/components/BTN-004.md                                (created)
design-system/canonical/rule-engine/RULES.md                                 (updated)
design-system/canonical/rule-engine/changelog.md                             (updated)
design-system/canonical/accessibility/button.md                              (updated)
design-system/retrieval/manifests/button.manifest.md                         (updated)
design-system/canonical/dependency-graph/*.json                              (regenerated)
ui-lab/primitives/button/Button.tsx                                          (updated)
ui-lab/primitives/button/Button.css                                          (updated)
ui-lab/primitives/button/Button.stories.tsx                                  (updated)
ui-lab/reports/btn-004-rebuild-plan-2026-05-01.md                            (created + completed)
ui-lab/reports/button-gate-run-btn-004-2026-05-01.md                         (created)
design-system/golden-examples/single-components/button/v1.0.0/               (all files updated)
design-system/golden-examples/feedback-cycle-reference/btn-004-cycle.md     (this file)
```
