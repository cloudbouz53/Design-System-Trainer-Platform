# app-assembly-react

## Purpose

Guide `project-builder` through building a React application under `ui-lab/react-apps/` using promoted primitives and component sets.

## Inputs

- App manifest: `design-system/retrieval/manifests/<app>.manifest.md`
- Resolved bundle from `design-system/retrieval/bundles/app-context-builder.md`
- Promoted primitives and component sets (confirmed in `design-system/golden-examples/`)

## Outputs

- React application under `ui-lab/react-apps/<app>/`
- Gate report in `ui-lab/reports/<app>-gate-run-<date>.md`
- Playwright visual snapshot in `ui-lab/snapshots/<app>/` (page-level; Phase 6+)

## Tech Constraints

- Framework: React (no SSR; client-side rendering only at MVP)
- Styling: CSS custom properties referencing canonical tokens; no Tailwind or CSS-in-JS at MVP unless the manifest explicitly includes a corresponding canonical rule
- Package manager: npm (or as specified in project config)

## Procedure

### 1. Pre-flight

1. Confirm the manifest exists.
2. Confirm all primitives and component sets referenced in the manifest are promoted.
3. Resolve the app bundle via `app-context-builder.md`.

### 2. Application structure

```
ui-lab/react-apps/<app>/
  src/
    components/     # app-level compositions (not primitives — import from ui-lab/primitives/)
    pages/          # route-level views
    styles/         # global CSS using canonical tokens
  public/
  package.json
  index.html
```

### 3. Token usage

Import canonical tokens via CSS custom properties. Never hardcode values. Reference `design-system/canonical/tokens/` via the resolved bundle.

### 4. Gate sequence

1. Token Gate
2. State Gate (per view/component rendered)
3. Accessibility Gate (page-level ARIA landmarks, heading order, skip links)
4. Run dependency-tracker
5. Visual Regression Gate (Playwright snapshot, Phase 6; skip for MVP if Playwright not configured)
6. Guardian Approval Gate
