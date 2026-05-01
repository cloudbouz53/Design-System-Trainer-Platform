## ADDED Requirements

### Requirement: Source observations live in design-system/source/

The `geist-researcher` subagent SHALL write all reference-system findings under `design-system/source/<reference-name>/`. For the MVP reference, this is `design-system/source/geist/`. Source content SHALL NOT be written anywhere else and SHALL NOT be treated as canonical.

#### Scenario: Researcher writes to source tree
- **WHEN** `geist-researcher` extracts an observation, inferred rule, or material note from the Geist reference
- **THEN** the content is written to a file under `design-system/source/geist/`

#### Scenario: Source content is never canonical
- **WHEN** any builder or reviewer reads from `design-system/source/`
- **THEN** the content MUST be treated as candidate input, not as authority
- **AND** builders MUST NOT consume source files directly when generating components or apps

### Requirement: Source structure for each reference

Each reference under `design-system/source/<name>/` SHALL include the following files: `source-index.md` (catalog of what was inspected), `raw-observations.md` (verbatim findings with citations), `inferred-rules.md` (candidate rules awaiting promotion), `materials-notes.md` (tokens, color, typography, spacing observations), and `component-notes.md` (per-component observations).

#### Scenario: Researcher creates the full file set
- **WHEN** `geist-researcher` ingests a new reference
- **THEN** all five files exist for that reference
- **AND** empty files contain explicit "no findings yet" markers rather than being missing

### Requirement: Inferred rule has a citation

Every entry in `inferred-rules.md` SHALL cite the supporting evidence from `raw-observations.md`, `materials-notes.md`, or `component-notes.md` (or external screenshots under `design-system/references/`). Uncited inferences MUST NOT be written.

#### Scenario: Inferred rule cites observation
- **WHEN** an entry is added to `inferred-rules.md`
- **THEN** it includes a reference to the source line, file, or screenshot that motivated it

#### Scenario: Uncited inference is rejected
- **WHEN** `geist-researcher` proposes an inferred rule with no evidence link
- **THEN** the entry MUST be rewritten with a citation or discarded

### Requirement: Promotion to canonical is gated

An inferred rule SHALL NOT be promoted from `design-system/source/` to `design-system/canonical/` without explicit guardian approval recorded in the rule's `Source` field and in `canonical/rule-engine/changelog.md`.

#### Scenario: Promotion records approval
- **WHEN** `design-system-guardian` promotes an inferred rule to canonical
- **THEN** the canonical rule's `Source` field cites the originating observation and notes "human approval"
- **AND** `canonical/rule-engine/changelog.md` records the promotion event

#### Scenario: Auto-promotion is forbidden
- **WHEN** any subagent other than `design-system-guardian` attempts to write a new rule directly under `design-system/canonical/`
- **THEN** the write is rejected
