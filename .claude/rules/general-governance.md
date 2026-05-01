---
path_scope: "**"
---

# General Governance

## Role-Separation Contract

Every write in this repository is owned by exactly one subagent. Before writing any file, confirm your identity matches the subagent that owns the target path. Cross-role writes are forbidden without an explicit guardian-mediated handoff.

### Ownership Table

| Path prefix | Owning subagent |
|---|---|
| `design-system/source/**` | `geist-researcher` |
| `design-system/canonical/tokens/**` | `design-system-guardian` (promotions only) |
| `design-system/canonical/principles/**` | `design-system-guardian` |
| `design-system/canonical/components/**` | `design-system-guardian` |
| `design-system/canonical/states/**` | `design-system-guardian` |
| `design-system/canonical/accessibility/**` | `design-system-guardian` |
| `design-system/canonical/rule-engine/**` | `design-system-guardian` + `feedback-librarian` (rule content only) |
| `design-system/canonical/dependency-graph/**` | `dependency-tracker` script (never LLMs) |
| `design-system/retrieval/**` | `design-system-guardian` |
| `design-system/feedback/pending/**` | Any contributor or visual-reviewer |
| `design-system/feedback/accepted/**` | `design-system-guardian` only |
| `design-system/feedback/rejected/**` | `design-system-guardian` only |
| `design-system/feedback/escalations/**` | `design-system-guardian` only |
| `design-system/golden-examples/**` | `design-system-guardian` |
| `ui-lab/primitives/**` | `component-builder` |
| `ui-lab/component-sets/**` | `component-set-builder` |
| `ui-lab/react-apps/**` | `project-builder` |
| `ui-lab/nextjs-apps/**` | `project-builder` |
| `ui-lab/html-apps/**` | `project-builder` |
| `ui-lab/reports/**` | Gate runners (read-only for reviewers) |
| `.claude/agents/**` | `design-system-guardian` (configuration only) |
| `.claude/skills/**` | `design-system-guardian` (configuration only) |
| `.claude/rules/**` | `design-system-guardian` (configuration only) |

## Canonical Truth

Canonical truth lives in repo files. Auto memory and `CLAUDE.md` are supporting layers, not authority. When they conflict with `design-system/canonical/`, the repo files win.

## Dependency Graph

The four JSON files under `design-system/canonical/dependency-graph/` are write-protected from LLMs. Only `.claude/skills/dependency-tracker/run.sh` may produce or update them. Any diff touching these files that was not produced by that script MUST be rejected at gate review.

## Gate Pipeline

Every artifact must clear these gates in order before promotion:
1. **Token Gate** — all values resolve to canonical tokens; no hardcoded literals
2. **State Gate** — every state declared in `canonical/states/` for the artifact class is exercised
3. **Accessibility Gate** — all expectations in `canonical/accessibility/` for the artifact class are met
4. **Visual Regression Gate** — Chromatic or Playwright diff is within tolerance, or the diff is traceable to an approved canonical change
5. **Guardian Approval Gate** — `design-system-guardian` records explicit approval
6. **Dependency Truth Gate** — the most recent `generate-graph.mjs` run is newer than every relevant input file

Any single gate failure blocks promotion regardless of all other gate status.

## Memory Hygiene

Auto memory must never store rule content, token values, dependency edges, manifest contents, or any other canonical material. Permitted operational notes: last dependency-tracker run timestamp, most recent rebuild scope, repeated review problems, in-flight investigation context. A periodic hygiene review is defined in `.claude/skills/canonical-rule-authoring/SKILL.md`.

## Forbidden Patterns

- Writing dependency graph JSON by hand
- Promoting a source observation to canonical without guardian approval
- Storing rule fragments in `CLAUDE.md` or auto memory
- Moving feedback out of `pending/` without guardian authority
- Building a component without its manifest
- Bypassing any gate in the pipeline
