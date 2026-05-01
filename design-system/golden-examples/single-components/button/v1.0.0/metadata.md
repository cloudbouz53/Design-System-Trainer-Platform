# Button Golden Example — v1.0.0

**Artifact:** Button primitive
**Version:** 1.0.0
**Approval date:** 2026-05-01
**Approving guardian:** design-system-guardian

## Gate Results Summary

| Gate | Result |
|---|---|
| Token Gate | PASS |
| State Gate | PASS — all 6 states covered |
| Accessibility Gate | PASS — all expectations met |
| Dependency Truth Gate | PASS — appears in all 4 graph JSONs |
| Visual Regression Gate | PENDING — Chromatic baseline capture required |
| Guardian Approval Gate | PASS |

## Files in this snapshot

- `Button.tsx` — React implementation
- `Button.css` — Styles (all values via canonical tokens)
- `Button.stories.tsx` — Storybook stories covering all 6 states
- `metadata.md` — This file

## Canonical coverage

- Rules: BTN-001, BTN-002, BTN-003, TOK-001, TOK-002, TOK-003
- States: default, hover, focus, active, disabled, loading
- Accessibility: role, focus ring, aria-disabled, aria-busy, contrast

## Gate report

See `ui-lab/reports/button-gate-run-2026-05-01.md`
