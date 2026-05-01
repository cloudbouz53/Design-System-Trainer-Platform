# app-assembly-html

## Purpose

Guide `project-builder` through building a plain HTML application under `ui-lab/html-apps/` using promoted primitives (compiled to CSS classes or web components) and canonical tokens (as CSS custom properties).

## Inputs

- App manifest: `design-system/retrieval/manifests/<app>.manifest.md`
- Resolved bundle from `design-system/retrieval/bundles/app-context-builder.md`
- Promoted primitives and component sets

## Outputs

- Plain HTML application under `ui-lab/html-apps/<app>/`
- Gate report in `ui-lab/reports/<app>-gate-run-<date>.md`

## Tech Constraints

- Vanilla HTML + CSS + minimal JavaScript (no framework)
- CSS custom properties for all canonical tokens
- No build step at MVP; static files served directly
- JavaScript only for interactive behavior (toggle, dismiss, form validation) — no state management library

## Application Structure

```
ui-lab/html-apps/<app>/
  index.html
  styles/
    tokens.css      # CSS custom property declarations (sourced from canonical tokens)
    components.css  # Component-specific styles using tokens
    global.css      # Layout, reset, typography
  scripts/
    interactions.js # Minimal interaction behavior
```

## Token Usage

Canonical tokens are declared as CSS custom properties in `tokens.css`:

```css
:root {
  --color-background: #FFFFFF;
  --color-text-primary: #111111;
  /* ... */
}
```

Component styles reference these via `var(--token-name)`. No hardcoded values anywhere else.

## Gate Sequence

Token → State → A11y → Dependency Tracker → Visual Regression (Phase 6 Playwright) → Guardian Approval.

## Forbidden

- Using a CSS framework, preprocessor, or build tool at MVP
- Hardcoding values outside of `tokens.css`
- Including JavaScript libraries beyond minimal vanilla helpers
