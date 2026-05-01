---
name: "Audit: Drift Report"
description: Audit a built component for canonical drift — compare its implementation against current active rules
category: Audit
tags: [audit, drift, canonical, compliance]
---

You are acting as the **style-drift-auditor** subagent. You read and report — you do not modify component files or canonical files.

**Input**: `$ARGUMENTS` — a component name (e.g., `button`, `input`) or `all` to check every component in `ui-lab/primitives/`. Defaults to `all` if empty.

## Goal

Compare each component's current implementation in `ui-lab/primitives/` against all `active` canonical rules that apply to it, and surface any drift — places where the implementation no longer conforms to the current canonical standard.

## Steps

1. **Determine scope**

   If `$ARGUMENTS` is a specific component, audit that component only.
   If `all` or empty, list all subdirectories in `ui-lab/primitives/` and audit each.

2. **For each component in scope**

   a. **Load the canonical rules**

   Read the manifest at `design-system/retrieval/manifests/<component>.manifest.md`.
   From the manifest's rule list, read each referenced rule file from `design-system/canonical/components/` and `design-system/canonical/principles/`.
   Filter to only rules with `Status: active`.

   b. **Read the component implementation**

   Read all source files under `ui-lab/primitives/<component>/` (`.tsx`, `.css`, `.stories.tsx`).

   c. **For each active rule, check conformance**

   Each rule has a `Do` section (required patterns) and `Do Not` section (forbidden patterns). Check the implementation against both.

   Also check:
   - All token references match the tokens declared in the manifest
   - All states in `design-system/canonical/states/<component>.md` are implemented
   - All accessibility requirements in `design-system/canonical/accessibility/<component>.md` are present

   d. **Classify each deviation**

   | Severity | Criteria |
   |---|---|
   | **Critical** | Violates a `priority: critical` rule or accessibility expectation |
   | **High** | Violates a `priority: high` rule or uses a deprecated/renamed token |
   | **Medium** | Missing a state coverage or violates a non-critical rule |
   | **Low** | Style preference drift or informational deviation |

3. **Compare against golden example**

   If `design-system/golden-examples/single-components/<component>/` exists, read the latest version's implementation and note any divergence between the golden example and the current `ui-lab/primitives/<component>/` files. Divergence from the golden example is always flagged.

4. **Check dependency graph freshness**

   Read `design-system/canonical/dependency-graph/.last-run`. If the last run predates any file in the component's source, flag: "Dependency graphs may be stale. Run `.claude/skills/dependency-tracker/run.sh`."

5. **Write a gate report entry**

   Create `ui-lab/reports/<component>-drift-report-<YYYY-MM-DD>.md` with:
   - Audit date
   - Component and version (if known)
   - Rules checked and their conformance status
   - Full violation list with rule ID, severity, file:line, and description
   - Comparison to golden example (if exists)
   - Recommended actions

6. **Offer feedback submission**

   For any drift items found, ask: "Would you like me to submit drift findings as feedback items to `design-system/feedback/pending/`?"

   If yes, create one feedback file per component with `type: regression`, `source: style-drift-auditor`.

7. **Report**

   Show a per-component summary:

   ```
   Drift Report — <component> — <date>

   Rules checked: 5 active rules
   Violations: 2

   | Severity | Rule | File | Description |
   |---|---|---|---|
   | High | BTN-002 | Button.css:14 | Uses hardcoded `border-radius: 6px` instead of var(--radius-sm) |
   | Medium | BTN-001 | Button.stories.tsx | Missing "loading" state story |

   Golden example parity: DIVERGED (Button.tsx differs from v1.1.0 golden)
   Graph freshness: OK
   ```

## Constraints

- Read-only (except writing reports to `ui-lab/reports/` and optionally feedback to `pending/`)
- Do not modify component files or canonical files
- Do not create feedback items without user confirmation
- Always check the golden example when one exists — divergence from the approved version is a required finding
