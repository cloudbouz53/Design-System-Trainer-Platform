# visual-review-workflow

## Purpose

Define the procedure for capturing Chromatic baselines, interpreting visual regression diffs, and obtaining guardian approval for baseline updates. Visual regression is delegated to deterministic tooling; this skill governs the human-in-the-loop semantic layer.

## Tooling

- **Chromatic**: for Storybook-based component-level visual regression (MVP)
- **Playwright**: for page-level visual regression (Phase 6+, out of scope at MVP)

LLMs do not produce pixel measurements. All pixel comparison is performed by Chromatic or Playwright. `visual-reviewer` provides semantic classification only.

## Baseline Capture Procedure

### First-time baseline (new artifact)

1. Ensure the artifact's Storybook story (or Playwright spec) covers all declared states.
2. Run `npx chromatic --project-token=<TOKEN>` from `ui-lab/`.
3. Chromatic captures baselines for every story variant.
4. The run URL and build number are recorded in the artifact's gate report at `ui-lab/reports/<artifact>-gate-run-<date>.md`.
5. Guardian approves baselines in the Chromatic UI (or via auto-accept on first build if configured).

### Subsequent runs (after changes)

1. Run `npx chromatic --project-token=<TOKEN>`.
2. If diffs are within tolerance: gate passes automatically.
3. If diffs exceed tolerance: proceed to the semantic review procedure below.

## Tolerance Configuration

Per-class tolerance values live in `chromatic.config.json` at the `ui-lab/` root:

```json
{
  "diffThreshold": 0.063,
  "componentOverrides": {
    "button": { "diffThreshold": 0.05 },
    "input": { "diffThreshold": 0.05 }
  }
}
```

Tolerance changes must be approved by the guardian and recorded in `changelog.md` with rationale. Widening tolerance reduces gate signal.

## Semantic Review Procedure (when diffs exceed tolerance)

Load this skill for `visual-reviewer` when a diff report needs classification.

1. `visual-reviewer` reads baseline, actual, and diff images from the Chromatic run artifacts.
2. Reads `design-system/canonical/rule-engine/changelog.md` for recent canonical changes.
3. Reads any relevant `migrations/` files.
4. Classifies the diff cause using one of the defined classifications (see `visual-reviewer.md`).
5. Writes recommendation to `ui-lab/reports/<artifact>-visual-review-<date>.md`.
6. If classification is `intentional-change`: guardian approves the baseline update in Chromatic UI.
7. If classification is `unexplained` or indicates a problem: open feedback in `design-system/feedback/pending/`.

## Baseline Update Approval

Baseline updates for diffs above tolerance require:
1. `visual-reviewer` classification identifying the cause as `intentional-change` or `anti-aliasing-noise`
2. Explicit guardian approval recorded in `ui-lab/reports/` referencing the canonical change that motivated the diff
3. Baseline accepted in Chromatic UI by guardian

## Gate Pass Conditions

The Visual Regression Gate passes when:
- All diffs are within configured tolerance, OR
- Exceeding-tolerance diffs are classified, guardian-approved, and baselines updated

The gate fails when:
- Any diff exceeds tolerance with classification `unexplained` or `spacing-drift` or `state-miscoverage`

## Forbidden

- Claiming a gate pass when Chromatic reports a failure
- Accepting baseline updates without guardian approval
- Widening tolerance without a changelog entry
