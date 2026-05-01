# Component Context Builder

## Purpose

Resolve a component manifest into a focused context bundle. The builder's session should load exactly the files listed in this resolution — nothing more, nothing less.

## Inputs

- Component manifest: `design-system/retrieval/manifests/<component>.manifest.md`
- `design-system/retrieval/indexes/rules-index.json`
- `design-system/retrieval/indexes/tokens-index.json`

## Outputs

A set of file paths to read into the builder's context:
- Rule files (from `Rules:` section of manifest)
- Token files (containing the token declarations from `Tokens:` section)
- Canonical state file for the component
- Canonical accessibility file for the component
- Any golden examples listed in the manifest

## Resolution Procedure

### Step 1: Read the manifest

Read `design-system/retrieval/manifests/<component>.manifest.md`.

### Step 2: Resolve rules

For each rule ID in the **Rules** section:
1. Look up the ID in `rules-index.json`.
2. Read the returned file path.
3. If any rule ID is missing from the index: STOP. Report the broken reference. Do not proceed.

### Step 3: Resolve tokens

For each token name in the **Tokens** section:
1. Look up the token name in `tokens-index.json`.
2. Note the returned file path. Deduplicate (multiple tokens may point to the same file).
3. Read each unique token file.
4. If any token name is missing from the index: STOP. Report the broken reference. Token Gate fails.

### Step 4: Load state definitions

Read `design-system/canonical/states/<component>.md`.

### Step 5: Load accessibility expectations

Read `design-system/canonical/accessibility/<component>.md`.

### Step 6: Load golden examples (if any)

Read each path listed under **Golden Examples** in the manifest.

### Step 7: Load component rules file

Read `.claude/rules/component-files.md` for path-scoped governance.

### Result

The builder's working context now contains:
- Resolved rule files (N rules)
- Token file(s) (deduplicated)
- State definitions
- Accessibility expectations
- Golden examples (if any)
- Component governance rules

The builder MUST NOT read `design-system/canonical/` directly beyond these files. If a needed rule or token is missing from the bundle, stop and update the manifest rather than reading the corpus directly.
