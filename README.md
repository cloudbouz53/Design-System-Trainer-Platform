# Design System Trainer Platform

A governed system for studying a reference design system, extracting canonical rules, generating components and apps from those rules, and learning from feedback through an auditable lifecycle.

## Purpose

The platform turns a reference design system (starting with [Geist](https://vercel.com/geist/introduction)) into:

1. **Canonical rules** — structured, versioned, validated standards in `design-system/canonical/`
2. **Retrieval bundles** — scoped context so builders consume only what they need
3. **Built primitives** — components and apps in `ui-lab/` that pass a six-gate approval pipeline
4. **Feedback cycles** — a governed loop from observation to rule change to cascading rebuild plan

## Repository Layout

```
design-system/
  source/           # Raw observations from reference systems (not canonical)
  canonical/        # The authoritative standard: rules, tokens, states, a11y, graph
  retrieval/        # Manifests, bundle resolvers, and lookup indexes
  feedback/         # pending / accepted / rejected / escalations
  golden-examples/  # Approved reference implementations
  references/       # External screenshots and reference materials

ui-lab/
  primitives/       # Single-component implementations
  component-sets/   # Multi-component compositions
  react-apps/       # React application builds
  nextjs-apps/      # Next.js application builds
  html-apps/        # Plain HTML application builds
  snapshots/        # Playwright visual snapshots
  reports/          # Gate run records

.claude/
  agents/           # Nine specialized subagent definitions
  skills/           # On-demand skill bundles (procedures + scripts)
  rules/            # Path-scoped binding governance rules
```

## Governance

All work is governed by `CLAUDE.md` and the role-separation rules in `.claude/rules/`. Nine specialized subagents own non-overlapping paths; cross-role writes require guardian-mediated handoff.

Every artifact must pass six gates before promotion: **Token → State → Accessibility → Visual Regression → Guardian Approval → Dependency Truth**.

The dependency graph JSON under `design-system/canonical/dependency-graph/` is the single source of cascade truth and is generated exclusively by `.claude/skills/dependency-tracker/run.sh`.

## Getting Started

1. Read `CLAUDE.md` for the operating model and canonical-truth principle.
2. Read `.claude/rules/general-governance.md` for the role-separation contract.
3. To ingest a reference: invoke the `geist-foundations` or `geist-components` skill.
4. To build a component: ensure a manifest exists in `design-system/retrieval/manifests/`, then invoke the `component-builder` subagent.
5. To run the dependency tracker: `bash .claude/skills/dependency-tracker/run.sh`

## MVP Scope

The first change (`bootstrap-trainer-mvp`) establishes all layers at MVP depth: governance scaffolding, one ingested reference (Geist), the rule engine, deterministic dependency tracking, retrieval bundles, visual regression baselines, two primitives (Button, Input), and one full feedback-to-rule cycle.
