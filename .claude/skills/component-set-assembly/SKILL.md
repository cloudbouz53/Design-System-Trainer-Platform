# component-set-assembly

## Purpose

Guide `component-set-builder` through assembling a multi-component composition from promoted primitives. Ensures the set uses only gate-approved primitives, resolves its bundle correctly, and passes the full six-gate pipeline.

## Inputs

- Component set manifest: `design-system/retrieval/manifests/<set>.manifest.md`
- Promoted primitives: present in `design-system/golden-examples/single-components/`
- Resolved bundle from `design-system/retrieval/bundles/component-context-builder.md`

## Outputs

- Component set implementation under `ui-lab/component-sets/<set>/`
- Storybook story exercising all composite states
- Gate report in `ui-lab/reports/<set>-gate-run-<date>.md`
- Golden example in `design-system/golden-examples/` (after guardian approval)

## Procedure

### 1. Pre-flight checks

Before writing any code:
1. Confirm the manifest exists for the set.
2. Confirm every primitive the set depends on has a corresponding entry in `design-system/golden-examples/single-components/`. If any are missing, stop — do not use un-promoted primitives.
3. Resolve the bundle via `component-context-builder.md`.

### 2. Implementation

- Import promoted primitives from their `ui-lab/primitives/<component>/` paths.
- Apply only semantic tokens from the resolved bundle for any set-level styling.
- Do not re-implement primitive behavior; compose it.

### 3. Story

Write a Storybook story that renders the composite in every relevant state combination (e.g., a form field: default, focused, errored, disabled).

### 4. Gate sequence

Follow the same sequence as component builds:
1. Token Gate — no hardcoded values in set-level styles
2. State Gate — all composite states exercised
3. Accessibility Gate — composite ARIA structure is correct
4. Run dependency-tracker; confirm set appears in all four graphs
5. Visual Regression Gate — Chromatic baseline
6. Guardian Approval Gate

### 5. Forbidden

- Using un-promoted primitives
- Hardcoding values
- Writing to `design-system/canonical/**`
