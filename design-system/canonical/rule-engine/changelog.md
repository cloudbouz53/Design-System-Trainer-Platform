# Rule Engine Changelog

Chronological log of all rule additions, modifications, status transitions, and version snapshots.

---

## 2026-05-01 — Engine bootstrapped

- **Event:** Engine initialized
- **Description:** Canonical rule engine established. `RULES.md`, `validation-checks.md`, `versions/`, and `migrations/` directories created as part of `bootstrap-trainer-mvp` change.
- **Breaking:** No
- **Migration file:** N/A
- **Guardian:** bootstrap process

---

## 2026-05-01 — Token wave: colors, spacing, radius, typography promoted

- **Event:** Token promotion
- **Tokens added:**
  - `design-system/canonical/tokens/colors.md` (10 color tokens)
  - `design-system/canonical/tokens/spacing.md` (8 spacing tokens)
  - `design-system/canonical/tokens/radius.md` (4 radius tokens)
  - `design-system/canonical/tokens/typography.md` (font families, sizes, weights, line heights)
- **Source:** materials-notes.md §Color/Spacing/Border Radius/Typography, approved by guardian
- **Breaking:** No
- **Migration file:** N/A

---

## 2026-05-01 — Initial rule wave: TOK-001 through INP-002 promoted to active

- **Event:** Rule promotion
- **Rules added (all promoted to active):**
  - `TOK-001` — Use Semantic Color Tokens → `design-system/canonical/principles/TOK-001.md`
  - `TOK-002` — Use Spacing Tokens on 4px Grid → `design-system/canonical/principles/TOK-002.md`
  - `TOK-003` — Use Border Radius Tokens → `design-system/canonical/principles/TOK-003.md`
  - `BTN-001` — Button Focus Ring → `design-system/canonical/components/BTN-001.md`
  - `BTN-002` — Button Disabled State Uses Opacity → `design-system/canonical/components/BTN-002.md`
  - `BTN-003` — Button Uses Semantic HTML Button Element → `design-system/canonical/components/BTN-003.md`
  - `INP-001` — Input Must Have Accessible Label → `design-system/canonical/components/INP-001.md`
  - `INP-002` — Input Error Message Uses aria-describedby → `design-system/canonical/components/INP-002.md`
- **Source:** inferred-rules.md, component-notes.md, materials-notes.md (all cited per rule)
- **Guardian approval:** 2026-05-01
- **Breaking:** No
- **Migration file:** N/A

---

## 2026-05-01 — BTN-004 drafted from accepted feedback

- **Change:** Added (draft)
- **Rule:** BTN-004 — Button Loading State Must Include Visually Hidden Loading Label
- **Source:** Accepted feedback `fb-2026-05-01-btn-spinner-aria-label`
- **Rationale:** WCAG 2.1 SC 4.1.3 requires status messages be programmatically determinable; `aria-busy` alone has inconsistent AT support. Visually hidden "Loading…" label inside the button satisfies the requirement reliably.
- **Breaking:** No — additive change; existing prop API unchanged
- **Migration file:** N/A
- **Status:** draft — pending guardian promotion to active

---

## 2026-05-01 — MVP complete; corpus snapshot v1.1.0 tagged

- **Event:** MVP acceptance verified
- **Description:** All 96 tasks in `bootstrap-trainer-mvp` change completed. Full gate pipeline demonstrated end-to-end for Button and Input primitives. Complete feedback cycle (observe → accept → author rule → impact → implement → re-gate → document) demonstrated via BTN-004. Memory hygiene confirmed clean. Version snapshot taken at `versions/v1.1.0.md`.
- **Rules at this snapshot:** TOK-001, TOK-002, TOK-003, BTN-001, BTN-002, BTN-003, BTN-004 (draft), INP-001, INP-002 — 9 rules total
- **Active rules:** 8 (TOK-001, TOK-002, TOK-003, BTN-001, BTN-002, BTN-003, INP-001, INP-002)
- **Draft rules:** 1 (BTN-004)
- **Components with golden examples:** Button v1.0.0, Input v1.0.0
- **Guardian:** design-system-guardian
- **Breaking:** No

---
