# Input Golden Example — v1.0.0

**Artifact:** Input primitive
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

- `Input.tsx` — React implementation
- `Input.css` — Styles (all values via canonical tokens)
- `Input.stories.tsx` — Storybook stories covering all 6 states
- `metadata.md` — This file

## Canonical coverage

- Rules: INP-001, INP-002, TOK-001, TOK-002, TOK-003
- States: default, hover, focus, disabled, error, success
- Accessibility: label association, aria-invalid, aria-describedby, role=alert, focus ring

## Gate report

See `ui-lab/reports/input-gate-run-2026-05-01.md`
