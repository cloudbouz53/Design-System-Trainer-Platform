---
name: "Canonical: Rebuild Plan"
description: Run change impact analysis — determine what artifacts need rebuilding after a rule or token change
category: Canonical
tags: [canonical, impact, dependency, rebuild]
---

You are acting as the **change-impact-analyst** subagent. You read dependency graphs and canonical files to produce rebuild plans. You write only to `ui-lab/reports/`. You do not modify canonical files or component source files.

**Input**: `$ARGUMENTS` — a rule ID, token name, or description of what changed (e.g., `BTN-003`, `--color-primary`, `button radius token`). Required; if missing, ask the user.

## Goal

Determine the full cascade of artifacts that must be rebuilt or re-validated after a change to a canonical rule or token, and produce a rebuild plan at `ui-lab/reports/<change>-rebuild-plan-<date>.md`.

## Steps

1. **Validate input**

   If `$ARGUMENTS` is empty, ask: "What changed? Provide a rule ID (e.g., `BTN-003`), a token name (e.g., `--color-primary`), or a description."

2. **Load dependency graphs**

   Read all four graphs from `design-system/canonical/dependency-graph/`:
   - `canonical-spec-graph.json` — which components depend on which rules
   - `token-usage-graph.json` — which components use which tokens
   - `component-import-graph.json` — which components import which other components
   - `impact-summary.json` — pre-computed impact summaries

3. **Identify the changed entity**

   Determine whether `$ARGUMENTS` refers to:
   - A **rule** (search `canonical-spec-graph.json`)
   - A **token** (search `token-usage-graph.json`)
   - A **component** (search `component-import-graph.json`)

   If the entity is not found in any graph, warn: "Entity not found in dependency graphs. Run `.claude/skills/dependency-tracker/run.sh` to ensure graphs are current."

4. **Compute direct dependents**

   From the identified entity, list all artifacts that directly reference it.

5. **Compute transitive dependents**

   Walk the `component-import-graph.json` from each direct dependent outward to find all transitive dependents (components that import components that use the changed rule/token).

6. **Classify impact severity**

   For each affected artifact, classify:
   - **High** — the change alters the artifact's visual output (color, size, spacing, layout)
   - **Medium** — the change alters behavior or interaction (state, accessibility, animation)
   - **Low** — the change is structural/organizational but doesn't change rendered output

7. **Determine required gate actions**

   For each affected artifact, list which gates must be re-run:
   - Token Gate (if a token value changed)
   - State Gate (if a state was added/removed)
   - Accessibility Gate (if an a11y expectation changed)
   - Visual Regression Gate (if any visual property changed)
   - Dependency Truth Gate (always — re-run tracker after any change)
   - Guardian Approval Gate (for any high-severity change)

8. **Write rebuild plan**

   Create `ui-lab/reports/<slug>-rebuild-plan-<YYYY-MM-DD>.md`:

   ```markdown
   # Rebuild Plan: <Change Description>

   **Date**: <YYYY-MM-DD>
   **Triggered by**: <rule ID / token name>
   **Analyst**: change-impact-analyst

   ## Changed Entity
   <Description of what changed and why>

   ## Affected Artifacts

   | Artifact | Severity | Required Gates |
   |---|---|---|
   | ui-lab/primitives/button | High | Token, Visual Regression, Guardian Approval |
   | ... | ... | ... |

   ## Rebuild Order
   <Ordered list respecting import dependencies — build leaf components first>

   ## Notes
   <Any cross-component implications, migration needs, or escalation flags>
   ```

9. **Report**

   Show the rebuild plan summary: affected artifact count, severity breakdown, recommended rebuild order, and next action (typically: trigger `/build/primitive` for each high/medium artifact in order).

## Constraints

- Read-only except for writing to `ui-lab/reports/`
- Do not modify canonical files or component source files
- If graphs appear stale (`.last-run` is older than relevant source files), flag it prominently and recommend running the dependency tracker before relying on the plan
