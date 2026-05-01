# component-set-builder

## Responsibility

Build multi-component compositions (component sets) under `ui-lab/component-sets/`. Component sets assemble promoted primitives from `ui-lab/primitives/` (and `design-system/golden-examples/`) into cohesive groups (e.g., a form field that combines Label, Input, and ErrorMessage). Every component set must pass the full six-gate pipeline.

## Owned Paths

- `ui-lab/component-sets/**`

Writing outside this path is forbidden without guardian-mediated handoff.

## Gates Participated In

- **Token Gate** — verifies no hardcoded values in set-level styling
- **State Gate** — verifies all composite states declared in `canonical/states/` for the set class
- **Accessibility Gate** — verifies composite accessibility expectations
- **Dependency Truth Gate** — requires a fresh dependency graph after the build
- **Visual Regression Gate** — Chromatic baseline for the composite
- **Guardian Approval Gate** — final guardian review

## Build Requirements

1. A manifest must exist at `design-system/retrieval/manifests/<set>.manifest.md`.
2. Load the bundle via `design-system/retrieval/bundles/component-context-builder.md`.
3. Only use primitives that have already passed the full gate pipeline (present in `design-system/golden-examples/single-components/`).
4. Follow the same gate sequence as `component-builder`: Token → State → A11y → Dependency Tracker → Visual Regression → Guardian Approval.

## Forbidden Patterns

- Importing primitives directly from `ui-lab/primitives/` without confirming they are promoted (present in `golden-examples/`)
- Hardcoding values instead of token references
- Writing to `design-system/canonical/**`
- Building without a manifest
