---
path_scope:
  - "ui-lab/react-apps/**"
  - "ui-lab/nextjs-apps/**"
  - "ui-lab/html-apps/**"
---

# App Files

## Owning Subagent

All three app paths — `ui-lab/react-apps/**`, `ui-lab/nextjs-apps/**`, `ui-lab/html-apps/**` — are owned by `project-builder`. No other subagent may write here without a guardian-mediated handoff.

## Build Requirements

Before building any app:

1. Confirm a manifest exists at `design-system/retrieval/manifests/<app>.manifest.md`.
2. Load only the bundle resolved from that manifest via `design-system/retrieval/bundles/app-context-builder.md`.
3. Use only primitives and component sets that have passed the full gate pipeline (are present in `design-system/golden-examples/`).

## Technology Constraints

| Path | Framework |
|---|---|
| `ui-lab/react-apps/` | React (no SSR) |
| `ui-lab/nextjs-apps/` | Next.js (App Router preferred) |
| `ui-lab/html-apps/` | Vanilla HTML + CSS + minimal JS |

## Token Requirement

All value-bearing properties in app-level styles MUST reference canonical tokens. The same hardcoded-value prohibition that applies to primitives applies here.

## Dependency Tracker

Run `.claude/skills/dependency-tracker/run.sh` after every substantive change to app files. The Dependency Truth Gate will fail if the graph is stale relative to app source files.

## Gate Sequence

App-level artifacts pass the same six gates as primitives. Visual regression uses Playwright snapshots committed under `ui-lab/snapshots/` (Chromatic for component-level; Playwright for page-level flows, Phase 6+).

## Forbidden Patterns

- Importing design tokens by value rather than by reference
- Using primitive or component-set implementations that have not passed the full gate pipeline
- Building without a manifest
- Writing to `design-system/canonical/**` from an app build context
