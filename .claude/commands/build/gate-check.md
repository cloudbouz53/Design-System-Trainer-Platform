---
name: "Build: Gate Check"
description: Run the full six-gate pipeline check on an existing artifact and produce a gate report
category: Build
tags: [build, gates, validation, report]
---

You are acting as a **gate runner**. You read artifacts and write gate reports to `ui-lab/reports/`. You do not modify component source files.

**Input**: `$ARGUMENTS` — the artifact identifier (e.g., `button`, `input`, `button/v1.1.0`). Required; if missing, ask the user.

## Goal

Run all six gates against an existing artifact and produce a complete gate report at `ui-lab/reports/<artifact>-gate-run-<date>.md`.

## Steps

1. **Validate input**

   If `$ARGUMENTS` is empty, ask: "Which artifact do you want to gate-check? (e.g., `button`, `input`)"

   Normalize to lowercase. If a version is specified (e.g., `button/v1.1.0`), target that path; otherwise use `ui-lab/primitives/<artifact>/`.

2. **Load rules**

   Read `.claude/rules/component-files.md` and `.claude/rules/general-governance.md` for gate definitions and report format.

3. **Gate 1 — Token Gate**

   Scan all source files under the artifact path for:
   - Hardcoded hex values (`#[0-9a-fA-F]{3,8}`)
   - RGB/RGBA literals (`rgb(`, `rgba(`)
   - Magic pixel values (any numeric px/rem/em not wrapped in `var(--...)`)
   - Raw font-size values

   **Result**: PASS (none found) or FAIL (list every violation with file:line).

4. **Gate 2 — State Gate**

   Read `design-system/canonical/states/<artifact>.md`. List all declared states.
   Read `ui-lab/primitives/<artifact>/<Component>.stories.tsx`.
   Check each declared state has a corresponding Storybook story.

   **Result**: PASS (all states covered) or FAIL (list missing states).

5. **Gate 3 — Accessibility Gate**

   Read `design-system/canonical/accessibility/<artifact>.md`. List all expectations.
   Read the component implementation.
   Verify: correct ARIA role, keyboard event handlers, focus styles, ARIA attributes, visible focus indicator.

   **Result**: PASS or FAIL with specific unmet expectations listed.

6. **Gate 4 — Visual Regression Gate**

   Check `ui-lab/reports/` for the most recent visual regression report for this artifact.
   If a Chromatic or Playwright diff report exists and is within tolerance: PASS.
   If no report exists or the report predates the last source change: PENDING — "No visual regression baseline found. Run Chromatic or Playwright to establish one."

7. **Gate 5 — Guardian Approval Gate**

   Check `design-system/golden-examples/single-components/<artifact>/` for an approved golden example.
   If present, read `metadata.md` to confirm approval is recorded.

   **Result**: PASS (golden example with approval recorded) or PENDING.

8. **Gate 6 — Dependency Truth Gate**

   Check `.claude/skills/dependency-tracker/` for the `.last-run` timestamp.
   Check if any source files under the artifact path are newer than `.last-run`.

   **Result**: PASS (graph is current) or FAIL (stale — run `.claude/skills/dependency-tracker/run.sh`).

9. **Write gate report**

   Create `ui-lab/reports/<artifact>-gate-run-<YYYY-MM-DD>.md` with:
   - Artifact name and version
   - Date and time of the run
   - For each gate: name, result (pass/fail/pending), and rationale or failure details
   - Reference to dependency-tracker `.last-run` timestamp

10. **Report**

    Show a summary table of all six gate results. Flag blockers (FAIL gates). Note PENDING gates that need external tooling.

## Constraints

- Read-only except for writing to `ui-lab/reports/`
- Do not modify component source files or canonical files
- Do not mark a gate PASS without observable evidence
