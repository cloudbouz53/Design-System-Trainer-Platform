# Design System Trainer Platform

## Operating Model

This platform studies a reference design system (Geist), extracts reusable rules into a canonical internal standard, generates components and apps from that standard, and learns from feedback through a governed lifecycle. All work flows through a gate pipeline: Token → State → Accessibility → Visual Regression → Guardian Approval → Dependency Truth.

## Canonical Truth Principle

**Canonical truth lives in repository files — never in auto memory or in this file.**

- Rules, tokens, states, accessibility expectations: `design-system/canonical/`
- Built artifacts: `ui-lab/`
- Reference observations: `design-system/source/`
- Retrieval bundles: `design-system/retrieval/`
- Dependency graph JSON: `design-system/canonical/dependency-graph/` (script-generated only — never hand-edited)

When auto memory and a canonical file disagree, the canonical file wins. Remove or correct the stale memory entry.

## Role-Separation Principle

Nine specialized subagents have non-overlapping responsibilities defined in `.claude/agents/`. No subagent writes outside its declared path scope. Cross-role writes require guardian-mediated handoff.

| Subagent | Owns |
|---|---|
| `design-system-guardian` | Gate approvals, feedback transitions, rule promotions |
| `geist-researcher` | `design-system/source/geist/` |
| `component-builder` | `ui-lab/primitives/` |
| `component-set-builder` | `ui-lab/component-sets/` |
| `project-builder` | `ui-lab/{react-apps,nextjs-apps,html-apps}/` |
| `visual-reviewer` | Reads diff artifacts; classifies causes; no overrides |
| `feedback-librarian` | Converts accepted feedback into rule changes |
| `style-drift-auditor` | Reads and reports drift; no promotions |
| `change-impact-analyst` | Reads graph JSON; produces rebuild plans |

## Path-Scoped Rules

Binding rules for specific paths live in `.claude/rules/`:

- `general-governance.md` — role-separation contract for the entire repo
- `component-files.md` — `ui-lab/primitives/**`, `ui-lab/component-sets/**`
- `app-files.md` — `ui-lab/react-apps/**`, `ui-lab/nextjs-apps/**`, `ui-lab/html-apps/**`
- `token-files.md` — `design-system/canonical/tokens/**`
- `review-files.md` — `design-system/feedback/**`, `design-system/golden-examples/**`, `ui-lab/reports/**`

When editing a file, load all rule files whose path scope matches your target path.

## Skills (load on demand)

Procedures and bundled scripts live in `.claude/skills/` and are loaded only when invoked:

- `geist-foundations` / `geist-components` — source ingestion from the Geist reference
- `component-set-assembly` — building component sets
- `app-assembly-react` / `app-assembly-nextjs` / `app-assembly-html` — building apps
- `visual-review-workflow` — visual regression baseline procedure
- `feedback-to-rules` — converting accepted feedback into canonical rules
- `canonical-rule-authoring` — rule format, lifecycle, memory hygiene review
- `retrieval-bundles` — manifest format and bundle resolution
- `dependency-tracker` — deterministic graph generation (`generate-graph.mjs`, `run.sh`)

Load the relevant skill before starting any multi-step workflow. Do not embed procedural steps in this file.

## Dependency Graph Contract

The four graph files under `design-system/canonical/dependency-graph/` are the sole source of truth for cascade analysis:

- `component-import-graph.json`
- `token-usage-graph.json`
- `canonical-spec-graph.json`
- `impact-summary.json`

**LLMs must never author or patch these files.** Run `.claude/skills/dependency-tracker/run.sh` to regenerate them after any relevant change.

## Memory Hygiene

Auto memory may only hold operational notes: last tracker run timestamp, recent rebuild scope, repeated review problems, in-flight investigation context. Rule content, token values, dependency edges, and manifest contents must never appear in auto memory. Perform a periodic hygiene review per `.claude/skills/canonical-rule-authoring/SKILL.md`.

## Out of Scope

- Serena MCP and external memory orchestration
- Pixel-perfect reasoning by LLMs (delegated to Chromatic / Playwright)
- Manual dependency-graph authoring
- Component sets, full apps, and drift auditing at scale (Phase 5+)
