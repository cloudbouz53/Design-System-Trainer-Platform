---
path_scope:
  - "design-system/canonical/tokens/**"
---

# Token Files

## Owning Subagent

`design-system/canonical/tokens/**` is owned exclusively by `design-system-guardian`. All promotions to this path require explicit guardian approval recorded in `design-system/canonical/rule-engine/changelog.md`.

## Token File Format

Each token file is a Markdown document structured as follows:

```markdown
# <Token Category> Tokens

| Token Name | Value | Description |
|---|---|---|
| --color-background | #FFFFFF | Default page background |
| --color-text-primary | #111111 | Primary readable text |
```

Token names MUST use CSS custom property syntax (`--<category>-<name>`). Values MUST be resolved (no references to other variables at the token tier).

## Promotion Requirements

Before adding or modifying a token:

1. The token must be cited in at least one inferred rule in `design-system/source/geist/inferred-rules.md` with an observation citation.
2. Guardian approval is recorded in `changelog.md` with the inferred-rule source and approval date.
3. If a token is renamed or its value changes in a way that breaks existing components, a migration file is created under `design-system/canonical/rule-engine/migrations/`.

## Token ID Scheme

Tokens referenced in rules use the pattern `<DOMAIN>-<NNN>` (e.g., `TOK-001`). The token's canonical name and its rule ID are cross-referenced in `design-system/retrieval/indexes/tokens-index.json`.

## Forbidden Patterns

- Adding tokens without guardian approval and a changelog entry
- Using tokens in source files that are not present in `tokens-index.json`
- Renaming tokens without creating a migration file and updating all manifests that reference the old name
- Storing token values in `CLAUDE.md` or auto memory
