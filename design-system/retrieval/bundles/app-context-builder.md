# App Context Builder

**Phase 6+ placeholder — minimal contract only.**

## Purpose

Resolve an application manifest into a focused context bundle for `project-builder`. Follows the same resolution contract as `component-context-builder.md` but adds page-level and composition-level context.

## Minimal Contract (MVP)

At MVP, no full apps are being built. This file establishes the contract for future use.

### Inputs

- App manifest: `design-system/retrieval/manifests/<app>.manifest.md`
- `design-system/retrieval/indexes/rules-index.json`
- `design-system/retrieval/indexes/tokens-index.json`
- `design-system/retrieval/indexes/dependencies-index.json` (to locate component manifests)

### Outputs

A set of file paths to read into the project-builder's context:
- Resolved rule files
- Token files
- State definitions for each component in the app's scope
- Accessibility expectations for each component
- Manifests for component sets used by the app
- Golden examples (components and sets)

### Resolution Procedure (Phase 6)

1. Read the app manifest.
2. Resolve rules via `rules-index.json` (same as component builder).
3. Resolve tokens via `tokens-index.json` (same as component builder).
4. For each component or component set referenced by the app manifest, locate their manifests via `dependencies-index.json` and resolve their bundles recursively (one level deep only — do not walk the full dependency graph).
5. Load page-level accessibility expectations (heading order, ARIA landmarks, skip links).

### Scope Constraint

The app builder may read:
- All files resolved from the above steps
- `.claude/rules/app-files.md`

The app builder must NOT read all of `design-system/canonical/`. If a needed rule or token is missing from the resolved bundle, stop and update the manifest.
