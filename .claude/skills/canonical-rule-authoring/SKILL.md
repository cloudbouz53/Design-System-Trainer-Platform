# canonical-rule-authoring

## Purpose

Define the structured rule format, the lifecycle for promoting rules from draft to active, and the memory hygiene review procedure. Used by `feedback-librarian` (rule authoring) and `design-system-guardian` (promotion).

## Rule File Format

Every canonical rule file MUST contain all thirteen fields in this order. Missing fields fail validation.

```markdown
# <Rule Name>

**Rule ID:** <DOMAIN>-<NNN>
**Status:** draft | active | deprecated | removed
**Version:** <semver, e.g., 1.0.0>
**Source:** <citation — inferred-rules.md line N, or feedback/<id>, plus "human approval by guardian">
**Scope:** <path pattern or component class, e.g., "ui-lab/primitives/button/**">
**Priority:** critical | high | medium | low

## Do

<One or more clear positive prescriptions. Specific, testable.>

## Do Not

<One or more clear negative prescriptions. Specific, testable.>

## Why

<Rationale. Why this constraint exists; what failure it prevents.>

## Validation

<How a gate runner or linter should check this rule. Be concrete: "grep for raw hex values", "check story renders 'disabled' state", etc.>

## Impact

<Artifacts affected if this rule is violated or removed. Reference the dependency graph domains.>

## Good Example

```<lang>
<A short code or markup snippet that satisfies this rule.>
```

## Bad Example

```<lang>
<A short code or markup snippet that violates this rule.>
```
```

## Rule ID Scheme

Format: `<DOMAIN>-<NNN>`

| Domain | Code | Used For |
|---|---|---|
| Button | BTN | Button component rules |
| Input | INP | Input component rules |
| Token | TOK | Token usage and naming rules |
| Accessibility | A11Y | Accessibility expectations |
| Spacing | SPC | Spacing and layout rules |
| Typography | TYP | Font and text rules |
| Layout | LYT | Layout and composition rules |
| General | GEN | Cross-cutting governance rules |

`<NNN>` is a zero-padded three-digit integer unique within its domain. IDs are never reused after removal.

## Status Lifecycle

```
draft → active → deprecated → removed
```

- `draft`: Visible, advisory. Builders MAY consider it but MUST NOT fail for violating it.
- `active`: Binding. Builders MUST satisfy it; gates fail on violations.
- `deprecated`: Triggers migration. Builders are on notice; a `migrations/` file exists.
- `removed`: Persists for historical reference only. Never rebind the ID.

Only `design-system-guardian` may transition status. `feedback-librarian` writes `draft` only.

## Promotion Checklist

Before the guardian marks a rule `active`:
- [ ] All thirteen fields are present and non-empty
- [ ] `Source` cites observation evidence AND records guardian approval
- [ ] `Validation` is concrete and testable
- [ ] `Good Example` and `Bad Example` compile/render correctly
- [ ] Rule validator (`validation-checks.md`) passes with zero issues
- [ ] `RULES.md` updated
- [ ] `changelog.md` entry written

## Memory Hygiene Review Procedure

Perform this review at least once per feedback cycle and after any significant multi-rule promotion wave.

### Steps

1. Read the most recent auto memory entries in the project memory directory.
2. For each entry, classify its content:
   - **Operational** (permitted): timestamps, run dates, rebuild scopes, review observations, in-flight investigation notes
   - **Canonical** (forbidden): rule content, token values, dependency edges, manifest contents, component API details
3. For each canonical entry found:
   a. Confirm the content exists in the appropriate canonical file (`design-system/canonical/`).
   b. If missing from canonical: surface it for promotion through the normal ingestion path.
   c. Remove the entry from auto memory.
4. Record the outcome: "clean" if no violations found, or list entries removed.
5. No action needed if all entries are operational.

### Clean Memory Criteria

Auto memory passes hygiene if every entry is one of:
- Last dependency-tracker run timestamp
- Most recent rebuild scope (artifact names, not rule content)
- Repeated review problem observations (behavioral notes, not rule text)
- In-flight investigation context (temporary, session-scoped)
