# app-assembly-nextjs

## Purpose

Guide `project-builder` through building a Next.js application under `ui-lab/nextjs-apps/` using promoted primitives and component sets.

## Inputs

- App manifest: `design-system/retrieval/manifests/<app>.manifest.md`
- Resolved bundle from `design-system/retrieval/bundles/app-context-builder.md`
- Promoted primitives and component sets

## Outputs

- Next.js application under `ui-lab/nextjs-apps/<app>/`
- Gate report in `ui-lab/reports/<app>-gate-run-<date>.md`

## Tech Constraints

- Framework: Next.js with App Router (preferred over Pages Router)
- Rendering: Server Components by default; use `"use client"` only when interactivity requires it
- Styling: CSS custom properties referencing canonical tokens
- No Tailwind, CSS-in-JS, or other styling systems at MVP unless canonically mandated

## Procedure

### 1. Pre-flight

1. Confirm manifest exists and all primitives are promoted.
2. Resolve the app bundle via `app-context-builder.md`.

### 2. Application structure

```
ui-lab/nextjs-apps/<app>/
  app/
    layout.tsx
    page.tsx
    <routes>/
  components/      # app-level compositions
  styles/          # global CSS using canonical tokens
  public/
  next.config.ts
  package.json
  tsconfig.json
```

### 3. Token usage

Reference canonical tokens via CSS custom properties in global stylesheets or CSS modules. Never hardcode values.

### 4. Gate sequence

Same as React apps: Token → State → A11y → Dependency Tracker → Visual Regression (Phase 6) → Guardian Approval.

### 5. Differences from react apps

- SSR/SSG considerations: components with dynamic state must be wrapped in `"use client"` boundaries
- Metadata API: use Next.js `generateMetadata` for SEO
- Image optimization: use `next/image` instead of raw `<img>` tags
