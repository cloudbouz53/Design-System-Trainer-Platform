## Why

We need a project-scoped governance and assembly system that can study a reference design system (Geist), extract reusable rules into a canonical internal standard, and generate components and apps from that standard while continuously learning from feedback. Without this, work on the platform is unstructured: there is no canonical source of truth, no deterministic dependency tracking, no scoped retrieval, and no auditable rule lifecycle — meaning every output risks drifting from the reference and every change risks invisible cascading breakage.

This change bootstraps the MVP defined in the PRD (sections 16 and 17): the minimum surface area required for canonical rules, deterministic dependency truth, visual regression, retrieval bundles, and one full feedback-to-rule cycle to function end-to-end.

## What Changes

- Establish the governance layer: `CLAUDE.md`, `.claude/agents/`, `.claude/skills/`, `.claude/rules/`, and the `design-system/` and `ui-lab/` directory trees.
- Author nine specialized subagents (guardian, researcher, component-builder, set-builder, project-builder, visual-reviewer, feedback-librarian, drift-auditor, change-impact-analyst) with distinct, non-overlapping responsibilities.
- Author eleven skills covering Geist research, component and set assembly, app assembly (React / Next.js / HTML), visual review, feedback-to-rules conversion, canonical rule authoring, retrieval bundles, and the deterministic dependency tracker.
- Build the deterministic `dependency-tracker` skill (`SKILL.md`, `generate-graph.mjs`, `run.sh`) that is the **only** writer of `component-import-graph.json`, `token-usage-graph.json`, `canonical-spec-graph.json`, and `impact-summary.json`. **BREAKING** for any prior workflow: LLMs may not author or patch dependency graph JSON.
- Stand up the canonical rule engine: structured rule format (ID, status, version, scope, do/don't, why, validation, impact, examples), `RULES.md`, `validation-checks.md`, `changelog.md`, `versions/`, and `migrations/`.
- Stand up retrieval bundles: `manifests/`, `bundles/`, and `indexes/` so builders consume scoped context rather than the full corpus.
- Wire visual regression (Chromatic for Storybook-first flows; Playwright visual comparisons for repo-local screenshot assertions) and define the semantic-review handoff to `visual-reviewer`.
- Ingest one reference source (Geist) via `geist-researcher` into `design-system/source/geist/`, then promote approved findings into `design-system/canonical/`.
- Build Button and Input primitives end-to-end through the gate pipeline (Token, State, Accessibility, Visual Regression, Guardian Approval, Dependency Truth) with golden examples and baseline snapshots.
- Validate one complete feedback-to-rule cycle: pending feedback → review → accepted → new/updated rule → cascading rebuild plan via `change-impact-analyst`.
- Define the project memory policy: canonical truth lives in repo files; auto memory and `CLAUDE.md` support workflows but never override canonical artifacts. **BREAKING** for any prior assumption: Serena MCP and external memory orchestration are explicitly out of scope.

## Capabilities

### New Capabilities
- `governance-foundation`: Repository structure, `CLAUDE.md`, `.claude/rules/`, subagent roster, skill roster, and the role-separation contract that underpins all other capabilities.
- `source-ingestion`: How `geist-researcher` reads a reference system and produces structured observations and inferred rules in `design-system/source/`.
- `canonical-rule-engine`: The structured rule format, lifecycle (draft → active → deprecated), versioning, changelog, and migrations under `design-system/canonical/rule-engine/`.
- `dependency-tracking`: The deterministic graph generation contract, the four authoritative graph JSON outputs, and the prohibition on LLM-authored dependency JSON.
- `retrieval-bundles`: Manifest format, bundle resolution workflow, and indexes that keep builder context scoped.
- `component-authoring`: How primitives (Button, Input) are built from canonical rules, including state coverage and the gate pipeline.
- `visual-regression`: Tool selection (Chromatic vs Playwright), baseline lifecycle, diff artifacts, and the semantic-review handoff to `visual-reviewer`.
- `approval-gates`: The six gates (Token, State, Accessibility, Visual Regression, Guardian Approval, Dependency Truth) and their pass conditions per artifact type.
- `feedback-loop`: How text and screenshot feedback flow through `pending → accepted/rejected/escalations`, become rules, and trigger cascading rebuild plans.
- `memory-policy`: What lives in `CLAUDE.md` vs `.claude/rules/` vs Skills vs auto memory vs canonical repo files, and the rule that auto memory never overrides canonical truth.

### Modified Capabilities
<!-- None — this is a greenfield bootstrap. No existing specs in openspec/specs/. -->

## Impact

- **Repository structure**: creates the full `.claude/`, `design-system/`, and `ui-lab/` trees described in the PRD.
- **Tooling**: introduces a Node-based deterministic dependency tracker (`generate-graph.mjs`) and a visual regression toolchain (Chromatic and/or Playwright).
- **Workflow**: every component, set, and app must now flow through the gate pipeline; dependency graph JSON files become read-only to LLMs.
- **Governance**: introduces a guardian-mediated approval lifecycle for rules and artifacts; introduces versioned rule migrations.
- **Out of scope (explicit)**: model fine-tuning, Serena MCP, external memory orchestration, pixel-perfect claims from LLM-only review, and manual dependency-graph authoring.
