---
name: "Build: Primitive Component"
description: Build a single component primitive from canonical rules through the full gate pipeline
category: Build
tags: [build, component, primitive, gates]
---

You are acting as the **component-builder** subagent. Your owned path is `ui-lab/primitives/`. Do not write outside this path (except running `dependency-tracker` scripts).

**Input**: `$ARGUMENTS` — the component name (e.g., `Button`, `Input`). Required; if missing, ask the user.

## Goal

Build a production-ready primitive component at `ui-lab/primitives/<component>/` that passes all six gates.

## Steps

1. **Validate input**

   If `$ARGUMENTS` is empty, ask: "Which component do you want to build?"

   Normalize to lowercase for paths (e.g., `Button` → `button`).

2. **Load rules and manifest**

   - Read `.claude/rules/component-files.md` — binding build constraints
   - Read `.claude/rules/general-governance.md` — gate pipeline definition
   - Confirm manifest exists at `design-system/retrieval/manifests/<component>.manifest.md`
   - If no manifest exists, stop and tell the user: "No manifest found for `<component>`. Create one first at `design-system/retrieval/manifests/<component>.manifest.md`."

3. **Resolve the retrieval bundle**

   Load `.claude/skills/retrieval-bundles/SKILL.md` and resolve only the bundle declared in the manifest. Read:
   - Canonical rules referenced in the manifest (from `design-system/canonical/components/`)
   - Canonical states (from `design-system/canonical/states/<component>.md`)
   - Canonical accessibility spec (from `design-system/canonical/accessibility/<component>.md`)
   - Token references needed (from `design-system/canonical/tokens/`)

   Do NOT read the full `design-system/canonical/` tree — only what the manifest declares.

4. **Build the component**

   Create or update under `ui-lab/primitives/<component>/`:
   - `<Component>.tsx` — React component using only canonical token references (no hardcoded values)
   - `<Component>.css` — Styles using `var(--token-name)` CSS custom properties only
   - `<Component>.stories.tsx` — Storybook story exercising every state declared in `canonical/states/<component>.md`
   - `index.ts` — Public export

5. **Run gate checks inline**

   After building, self-check each gate and report results:

   **Token Gate** — scan for any hardcoded hex, RGB, pixel, or font-size literal. List any found.
   **State Gate** — list every state in `canonical/states/<component>.md`; confirm each has a Storybook story variant.
   **Accessibility Gate** — verify all expectations in `canonical/accessibility/<component>.md` are implemented (ARIA role, keyboard handlers, focus styles, contrast).

   If any gate fails, fix the issue before proceeding.

6. **Run dependency tracker**

   ```bash
   .claude/skills/dependency-tracker/run.sh
   ```

   Confirm the component appears in the updated graphs.

7. **Write gate report**

   Create `ui-lab/reports/<component>-gate-run-<date>.md` following the format in `.claude/rules/review-files.md`. Record results for Token, State, Accessibility, and Dependency Truth gates. Mark Visual Regression and Guardian Approval gates as "pending".

8. **Report**

   Summarize: files created, gate results, any issues found, next steps (submit for visual regression and guardian approval).

## Constraints

- All CSS properties must use `var(--token-name)` references — no hardcoded values
- Every canonical state must have a Storybook story
- Gate report is required before requesting guardian review
- Do not write to `design-system/canonical/**`
