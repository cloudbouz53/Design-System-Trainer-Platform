# retrieval-bundles

## Purpose

Define the manifest format, the bundle resolver contract, and the index schema for the retrieval layer. All builders must read this skill before starting a build to understand how to load only the scoped context they need.

## Manifest Format

A manifest file lives at `design-system/retrieval/manifests/<artifact>.manifest.md`. It declares all context a builder needs for that artifact:

```markdown
# <Artifact Name> Manifest

## Rules

- BTN-001  <!-- required rule IDs — must exist in rules-index.json -->
- BTN-002
- A11Y-001

## Tokens

- --color-background
- --color-text-primary
- --spacing-sm
- --radius-md

## Anti-Patterns

- Hardcoded hex colors
- Using raw `px` values for spacing

## Patterns

- Always use `--color-interactive-*` tokens for interactive elements
- Apply `--radius-md` to all button shapes

## Golden Examples

- design-system/golden-examples/single-components/button/v1.0.0/
```

All entries under **Rules** and **Tokens** must resolve to existing canonical files via the indexes. Broken references fail the Token Gate.

## Bundle Resolution Contract

The resolver procedure is defined in `design-system/retrieval/bundles/component-context-builder.md` (for components and sets) and `app-context-builder.md` (for apps).

### Resolution Steps

1. Read the manifest file.
2. For each entry under **Rules**: look up the rule ID in `design-system/retrieval/indexes/rules-index.json` to get the canonical file path. Read that file.
3. For each entry under **Tokens**: look up the token name in `design-system/retrieval/indexes/tokens-index.json` to get the canonical file path. Read that file.
4. For each entry under **Golden Examples**: read the referenced directory.
5. The produced bundle is the union of these files — nothing more.

If any lookup fails (missing key in index), stop and report the broken reference. Do not attempt to read the full canonical tree as a fallback.

## Index Schema

### rules-index.json

```json
{
  "BTN-001": "design-system/canonical/components/BTN-001.md",
  "TOK-001": "design-system/canonical/principles/TOK-001.md"
}
```

### tokens-index.json

```json
{
  "--color-background": "design-system/canonical/tokens/colors.md",
  "--spacing-sm": "design-system/canonical/tokens/spacing.md"
}
```

### dependencies-index.json

```json
{
  "button": "design-system/retrieval/manifests/button.manifest.md",
  "input": "design-system/retrieval/manifests/input.manifest.md"
}
```

## Index Regeneration

Indexes must be regenerated whenever the canonical corpus they index changes:
- After any rule is added, modified, or its ID changes: regenerate `rules-index.json`
- After any token is added or renamed: regenerate `tokens-index.json`
- After any new manifest is created: regenerate `dependencies-index.json`

Index regeneration is a guardian responsibility (or a script run by the guardian after each canonical change).

## Build Without a Manifest

If no manifest exists for an artifact, the build MUST NOT proceed. The guardian must create and approve a manifest first.
