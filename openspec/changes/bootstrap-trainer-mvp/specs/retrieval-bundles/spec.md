## ADDED Requirements

### Requirement: Manifest declares required context per artifact

Every component, component set, and app to be built SHALL have a manifest file under `design-system/retrieval/manifests/` declaring the rules, tokens, anti-patterns, patterns, and golden examples its builder needs. Manifests SHALL be Markdown with a fixed header section (`Rules:`, `Tokens:`, `Anti-Patterns:`, `Patterns:`, `Golden Examples:`).

#### Scenario: Manifest exists before build
- **WHEN** `component-builder`, `component-set-builder`, or `project-builder` is invoked for an artifact
- **THEN** a manifest for that artifact exists at `design-system/retrieval/manifests/<artifact>.manifest.md`

#### Scenario: Build without manifest is rejected
- **WHEN** a builder is invoked for an artifact with no manifest
- **THEN** the build is blocked until a manifest is created and reviewed by the guardian

### Requirement: Bundle resolver materializes scoped context

A bundle resolver (defined in `design-system/retrieval/bundles/component-context-builder.md` and `design-system/retrieval/bundles/app-context-builder.md`) SHALL read a manifest, resolve each declared item to its canonical file path via the indexes, and produce a focused bundle containing only those files for the builder's session.

#### Scenario: Bundle includes only declared items
- **WHEN** the resolver runs for a manifest declaring N rules, M tokens, K patterns, and J golden examples
- **THEN** the produced bundle contains exactly N+M+K+J files (plus any explicit transitive dependencies)
- **AND** no canonical file outside the manifest's declarations is included

#### Scenario: Builder consumes bundle, not the corpus
- **WHEN** `component-builder` begins generating a primitive
- **THEN** its working context contains the resolver's bundle
- **AND** it does NOT load the entire `design-system/canonical/` tree

### Requirement: Indexes accelerate manifest resolution

The retrieval layer SHALL maintain three indexes under `design-system/retrieval/indexes/`: `rules-index.json` (rule ID → file path), `tokens-index.json` (token name → file path), and `dependencies-index.json` (artifact ID → manifest path). Indexes SHALL be regenerated whenever the corpus they index changes.

#### Scenario: Index lookup resolves a rule reference
- **WHEN** the resolver encounters `BTN-001` in a manifest
- **THEN** `rules-index.json` returns the canonical file path for that rule

#### Scenario: Stale index causes rebuild
- **WHEN** an index's mtime is older than any file it indexes
- **THEN** the resolver regenerates the index before resolving the bundle

### Requirement: Manifest references must resolve

Every entry in a manifest SHALL resolve to an existing canonical file. Manifests with broken references SHALL fail the Token Gate.

#### Scenario: Broken manifest fails Token Gate
- **WHEN** a manifest references a rule ID, token name, or pattern that does not exist in the indexes
- **THEN** the artifact built from that manifest fails the Token Gate
- **AND** the manifest MUST be corrected before the artifact can be promoted

#### Scenario: Manifest validates after canonical rename
- **WHEN** a canonical rule or token is renamed
- **THEN** every manifest referencing the old name MUST be updated as part of the same change
- **AND** index regeneration confirms all manifest references resolve before promotion
