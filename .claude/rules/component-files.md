---
path_scope:
  - "ui-lab/primitives/**"
  - "ui-lab/component-sets/**"
---

# Component Files

## Owning Subagents

- `ui-lab/primitives/**` — owned by `component-builder`
- `ui-lab/component-sets/**` — owned by `component-set-builder`

No other subagent may write to these paths without a guardian-mediated handoff.

## Build Requirements

Before starting any build under these paths:

1. Confirm a manifest exists at `design-system/retrieval/manifests/<component>.manifest.md`.
2. Load only the bundle resolved from that manifest — do not read the full `design-system/canonical/` tree.
3. Follow all `active` rules in the resolved bundle.

## Token Requirement

Every value-bearing property (color, spacing, radius, font size, shadow, motion timing) MUST reference a semantic token from `design-system/canonical/tokens/`. Raw hex values, RGB literals, magic pixel values, and ad-hoc font sizes are forbidden. The Token Gate will fail the artifact if any are found.

## State Coverage Requirement

Every interaction and status state declared in `design-system/canonical/states/<component>.md` MUST be exercised in the component's Storybook story or test harness. The State Gate will list missing states explicitly.

## Accessibility Requirement

The component MUST satisfy all expectations in `design-system/canonical/accessibility/<component>.md`: semantic role, keyboard interaction, focus management, ARIA attributes, and color contrast against the canonical token palette.

## Gate Sequence

After passing Token, State, and Accessibility gates locally:

1. Run `.claude/skills/dependency-tracker/run.sh`.
2. Confirm the component appears in all four graph JSONs.
3. Proceed to Visual Regression Gate (Chromatic baseline capture).
4. Request Guardian Approval Gate.
5. Save golden example to `design-system/golden-examples/single-components/<component>/v<version>/`.

## Forbidden Patterns

- Writing directly to `design-system/canonical/dependency-graph/` — run the script instead
- Consuming canonical files outside the resolved bundle
- Hard-coding values instead of token references
- Skipping the dependency-tracker run before requesting visual regression or guardian review
- Claiming gate passage without an observable gate record in `ui-lab/reports/`
