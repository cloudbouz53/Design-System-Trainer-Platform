## 1. Repository scaffolding

- [x] 1.1 Create the full directory tree from PRD §4 (`.claude/{agents,skills,rules}`, `design-system/{source,retrieval,canonical,feedback,golden-examples,references}`, `ui-lab/{primitives,component-sets,react-apps,nextjs-apps,html-apps,snapshots,reports}`) with `.gitkeep` placeholders where needed
- [x] 1.2 Author a concise `CLAUDE.md` covering operating model, role-separation, canonical-truth principle, and pointers to `.claude/rules/` and Skills (target ~150 lines, hard cap 200)
- [x] 1.3 Author `README.md` summarizing the platform's purpose and pointing into `design-system/` and `.claude/`
- [x] 1.4 Author `.claude/rules/general-governance.md` declaring the role-separation contract
- [x] 1.5 Author `.claude/rules/component-files.md` (path scope: `ui-lab/primitives/**`, `ui-lab/component-sets/**`)
- [x] 1.6 Author `.claude/rules/app-files.md` (path scope: `ui-lab/react-apps/**`, `ui-lab/nextjs-apps/**`, `ui-lab/html-apps/**`)
- [x] 1.7 Author `.claude/rules/token-files.md` (path scope: `design-system/canonical/tokens/**`)
- [x] 1.8 Author `.claude/rules/review-files.md` (path scope: `design-system/feedback/**`, `design-system/golden-examples/**`, `ui-lab/reports/**`)

## 2. Subagent roster

- [x] 2.1 Author `.claude/agents/design-system-guardian.md` (final approval authority; owns transitions in `feedback/` and rule status flips)
- [x] 2.2 Author `.claude/agents/geist-researcher.md` (writes only under `design-system/source/`)
- [x] 2.3 Author `.claude/agents/component-builder.md` (builds under `ui-lab/primitives/`; consumes only retrieval bundles)
- [x] 2.4 Author `.claude/agents/component-set-builder.md` (builds under `ui-lab/component-sets/`)
- [x] 2.5 Author `.claude/agents/project-builder.md` (builds under `ui-lab/{react-apps,nextjs-apps,html-apps}/`)
- [x] 2.6 Author `.claude/agents/visual-reviewer.md` (reads diff artifacts, classifies causes, never overrides tooling)
- [x] 2.7 Author `.claude/agents/feedback-librarian.md` (converts accepted feedback into rule changes; cannot move feedback states)
- [x] 2.8 Author `.claude/agents/style-drift-auditor.md` (audit-only; surfaces drift but does not promote)
- [x] 2.9 Author `.claude/agents/change-impact-analyst.md` (consumes graph JSON only; produces rebuild plans)
- [x] 2.10 Verify each agent file declares responsibility, owned paths, gates participated in, and explicitly forbids cross-role writes

## 3. Skill roster (non-tracker)

- [x] 3.1 Author `.claude/skills/geist-foundations/SKILL.md`
- [x] 3.2 Author `.claude/skills/geist-components/SKILL.md`
- [x] 3.3 Author `.claude/skills/component-set-assembly/SKILL.md`
- [x] 3.4 Author `.claude/skills/app-assembly-react/SKILL.md`
- [x] 3.5 Author `.claude/skills/app-assembly-nextjs/SKILL.md`
- [x] 3.6 Author `.claude/skills/app-assembly-html/SKILL.md`
- [x] 3.7 Author `.claude/skills/visual-review-workflow/SKILL.md`
- [x] 3.8 Author `.claude/skills/feedback-to-rules/SKILL.md`
- [x] 3.9 Author `.claude/skills/canonical-rule-authoring/SKILL.md` (includes the structured rule template from PRD §10)
- [x] 3.10 Author `.claude/skills/retrieval-bundles/SKILL.md` (defines manifest format and resolver contract)

## 4. Deterministic dependency tracker

- [x] 4.1 Author `.claude/skills/dependency-tracker/SKILL.md` declaring the script-only-writer contract and the four authoritative outputs
- [x] 4.2 Implement `.claude/skills/dependency-tracker/generate-graph.mjs`: walk `ui-lab/` and `design-system/canonical/`, extract imports (regex-first), token references, and canonical-spec references, produce all four graph JSONs
- [x] 4.3 Implement `.claude/skills/dependency-tracker/run.sh` as the canonical entry point invoked by builders and the impact analyst
- [x] 4.4 Implement an `unsupported` report in the script's output for unparseable constructs (dynamic imports, computed token names) — reported, not silently dropped
- [x] 4.5 Hand-craft a fixture under `ui-lab/primitives/__fixture__/` exercising imports, token refs, and rule citations; run the script and verify graph outputs match expectations
- [x] 4.6 Verify `impact-summary.json` correctly enumerates downstream consumers when given a token ID or rule ID for the fixture
- [x] 4.7 Remove the fixture (or mark it explicitly as a test fixture excluded from canonical promotion)

## 5. Canonical rule engine

- [x] 5.1 Create `design-system/canonical/rule-engine/RULES.md` (live index, initially empty)
- [x] 5.2 Create `design-system/canonical/rule-engine/changelog.md` with an initial "engine bootstrapped" entry
- [x] 5.3 Create `design-system/canonical/rule-engine/validation-checks.md` defining the rule-format validator (required fields, ID format, valid status values, no duplicate IDs, no broken references)
- [x] 5.4 Implement the validator (script or skill-bundled procedure) and verify it flags malformed sample rules
- [x] 5.5 Create `design-system/canonical/rule-engine/versions/` and `design-system/canonical/rule-engine/migrations/` directories

## 6. Source ingestion (Geist)

- [x] 6.1 Create `design-system/source/geist/source-index.md` cataloging what was inspected
- [x] 6.2 Author `design-system/source/geist/raw-observations.md` with verbatim findings from Geist references, each line cited
- [x] 6.3 Author `design-system/source/geist/materials-notes.md` (color, typography, spacing, radius observations)
- [x] 6.4 Author `design-system/source/geist/component-notes.md` for at least Button and Input
- [x] 6.5 Author `design-system/source/geist/inferred-rules.md` with each entry citing the originating observation

## 7. Canonical promotion (initial wave)

- [x] 7.1 Promote a minimal token set (color, spacing, radius, typography) into `design-system/canonical/tokens/`, with each promotion logged in `changelog.md`
- [x] 7.2 Author `design-system/canonical/states/` definitions for at least Button (default, hover, focus, active, disabled, loading) and Input (default, hover, focus, disabled, error, success)
- [x] 7.3 Author `design-system/canonical/accessibility/` expectations for Button and Input
- [x] 7.4 Promote inferred rules to `active` status under `design-system/canonical/principles/` and `design-system/canonical/components/`, each with `Rule ID`, `Status`, `Version`, `Source`, `Scope`, `Priority`, `Do`, `Do Not`, `Why`, `Validation`, `Impact`, `Good Example`, `Bad Example`
- [x] 7.5 Run the rule validator and confirm zero issues
- [x] 7.6 Snapshot the corpus to `versions/v1.0.0.md`

## 8. Retrieval bundles

- [x] 8.1 Author `design-system/retrieval/manifests/button.manifest.md` listing required rules, tokens, anti-patterns, patterns, golden examples
- [x] 8.2 Author `design-system/retrieval/manifests/input.manifest.md` listing required rules, tokens, anti-patterns, patterns, golden examples
- [x] 8.3 Author `design-system/retrieval/bundles/component-context-builder.md` describing the resolver procedure
- [x] 8.4 Author `design-system/retrieval/bundles/app-context-builder.md` (placeholder for Phase 6; minimal contract only)
- [x] 8.5 Generate `design-system/retrieval/indexes/rules-index.json`, `tokens-index.json`, and `dependencies-index.json`
- [x] 8.6 Verify Button's manifest fully resolves through the indexes; verify Input's manifest fully resolves through the indexes

## 9. Visual regression wiring (Chromatic + Storybook)

- [x] 9.1 Add Storybook to `ui-lab/` with the minimum config to render primitives in isolation
- [x] 9.2 Configure Chromatic and commit `chromatic.config` (or equivalent) plus the project token reference
- [x] 9.3 Define the per-class tolerance map (e.g., button, input) in repository config
- [x] 9.4 Document the baseline-update approval procedure in `.claude/skills/visual-review-workflow/SKILL.md`

## 10. Build Button (full gate pipeline)

- [x] 10.1 `component-builder` resolves Button's bundle and generates `ui-lab/primitives/button/` (implementation + Storybook story exercising every declared state)
- [x] 10.2 Run the Token Gate; confirm only semantic tokens are referenced
- [x] 10.3 Run the State Gate; confirm every state from `canonical/states/button.md` is exercised
- [x] 10.4 Run the Accessibility Gate; confirm role, keyboard, focus, and contrast expectations are met
- [x] 10.5 Run `.claude/skills/dependency-tracker/run.sh`; confirm Button appears in all four graph JSONs
- [x] 10.6 Capture the Chromatic baseline; pass the Visual Regression Gate
- [x] 10.7 `design-system-guardian` reviews and records approval; pass the Guardian Approval Gate
- [x] 10.8 Save the golden example under `design-system/golden-examples/single-components/button/v1.0.0/`

## 11. Build Input (full gate pipeline)

- [x] 11.1 `component-builder` resolves Input's bundle and generates `ui-lab/primitives/input/` (implementation + Storybook story exercising every declared state)
- [x] 11.2 Run the Token Gate
- [x] 11.3 Run the State Gate
- [x] 11.4 Run the Accessibility Gate
- [x] 11.5 Run the dependency tracker; confirm Input appears in all four graph JSONs
- [x] 11.6 Capture the Chromatic baseline; pass the Visual Regression Gate
- [x] 11.7 Guardian approval; pass the Guardian Approval Gate
- [x] 11.8 Save the golden example under `design-system/golden-examples/single-components/input/v1.0.0/`

## 12. End-to-end feedback cycle

- [x] 12.1 Author a deliberate, tractable feedback item (text or screenshot) about Button or Input and place it under `design-system/feedback/pending/` with full metadata
- [x] 12.2 `design-system-guardian` reviews and moves the item to `design-system/feedback/accepted/` with rationale
- [x] 12.3 `feedback-librarian` converts the accepted item into either a new rule or a modification to an existing rule; bump version, update `RULES.md` and `changelog.md`, write a `migrations/` file if breaking
- [x] 12.4 Run `dependency-tracker/run.sh` and refresh `impact-summary.json`
- [x] 12.5 `change-impact-analyst` produces a rebuild plan listing every affected artifact
- [x] 12.6 Builders update affected artifacts (Button and/or Input) per the plan
- [x] 12.7 Re-run all gates; capture the updated baseline through the approval procedure
- [x] 12.8 Document the full cycle as a reference example under `design-system/golden-examples/` (or a clearly-named directory under `design-system/feedback/`)

## 13. Memory policy enactment

- [x] 13.1 Audit existing auto memory entries (if any) for canonical-shaped content; relocate any offenders to canonical files and remove from memory
- [x] 13.2 Confirm `CLAUDE.md` contains no rule content, token values, dependency information, or procedural workflows
- [x] 13.3 Confirm no agent prompt or skill references Serena MCP or any external memory orchestrator for canonical state
- [x] 13.4 Add a short "memory hygiene review" procedure to `.claude/skills/canonical-rule-authoring/SKILL.md` (or its own skill if it grows)

## 14. MVP acceptance verification

- [x] 14.1 Confirm canonical rules exist for at least Button and Input primitives
- [x] 14.2 Confirm all four dependency graph JSONs are present and were generated by `generate-graph.mjs` (not hand-edited)
- [x] 14.3 Confirm Chromatic baselines exist for Button and Input and the Visual Regression Gate passes
- [x] 14.4 Confirm Button and Input manifests resolve cleanly through the indexes
- [x] 14.5 Confirm a complete cascading-update plan from §12 is recorded and re-verifiable
- [x] 14.6 Confirm `CLAUDE.md` and `.claude/rules/` support workflows without holding canonical content
- [x] 14.7 Tag the corpus version (e.g., `versions/v1.0.0.md`) and announce MVP complete in `changelog.md`
