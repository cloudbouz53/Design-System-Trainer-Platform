## ADDED Requirements

### Requirement: Structured rule format

Every canonical rule SHALL follow the structured format defined in PRD §10. Each rule file SHALL contain, at minimum, these fields in this order: `Rule ID`, `Status`, `Version`, `Source`, `Scope`, `Priority`, `Do`, `Do Not`, `Why`, `Validation`, `Impact`, `Good Example`, `Bad Example`.

#### Scenario: New rule has all required fields
- **WHEN** a new canonical rule file is created under `design-system/canonical/`
- **THEN** all thirteen fields above are present and non-empty

#### Scenario: Missing field fails validation
- **WHEN** `validation-checks.md` is run against the rule corpus
- **AND** any rule is missing a required field
- **THEN** the rule fails validation and MUST be corrected before any artifact depending on it can pass the Token, State, or Accessibility gates

### Requirement: Rule ID scheme

Each rule SHALL have an ID of the form `<DOMAIN>-<NNN>` where `<DOMAIN>` is an uppercase short code (e.g., `BTN`, `INP`, `TOK`, `A11Y`) and `<NNN>` is a zero-padded three-digit sequence number unique within that domain. IDs SHALL NOT be reused after a rule is removed.

#### Scenario: New rule gets a fresh ID
- **WHEN** `feedback-librarian` or `design-system-guardian` adds a new rule
- **THEN** its ID uses the next unused sequence number for its domain
- **AND** the ID is recorded in `RULES.md` and `changelog.md`

#### Scenario: Removed rule ID is not reused
- **WHEN** a rule's `Status` is set to `removed`
- **THEN** its ID remains reserved permanently and SHALL NOT appear on any future rule

### Requirement: Rule lifecycle status

Every rule SHALL have a `Status` field with one of: `draft`, `active`, `deprecated`, `removed`. Only `active` rules are binding on builders. `draft` rules are visible but advisory; `deprecated` rules trigger migration plans; `removed` rules persist for historical reference only.

#### Scenario: Active rule is binding
- **WHEN** a builder generates an artifact whose scope includes an `active` rule
- **THEN** the artifact MUST satisfy that rule to pass its gates

#### Scenario: Deprecated rule triggers migration
- **WHEN** a rule's `Status` transitions from `active` to `deprecated`
- **THEN** a migration file under `canonical/rule-engine/migrations/` is created describing the replacement and the path forward

#### Scenario: Draft rule is advisory only
- **WHEN** a builder reviews a `draft` rule
- **THEN** the builder MAY consider it but MUST NOT fail an artifact for violating it

### Requirement: Versioning and changelog

The rule engine SHALL maintain `canonical/rule-engine/RULES.md` (the live index), `canonical/rule-engine/changelog.md` (chronological event log), and `canonical/rule-engine/versions/v<X>.<Y>.<Z>.md` (frozen snapshots). Every rule change — addition, modification, status transition, removal — SHALL be recorded in the changelog with date, rule ID, change type, and rationale.

#### Scenario: Rule change writes a changelog entry
- **WHEN** any rule is added, modified, or its status changes
- **THEN** `changelog.md` gains a new entry on the same commit

#### Scenario: Version snapshot is taken at meaningful boundaries
- **WHEN** the guardian declares a new version (e.g., after a wave of related changes)
- **THEN** a `versions/v<X>.<Y>.<Z>.md` file is written containing a frozen snapshot of the rule corpus at that moment

### Requirement: Migration files for breaking rule changes

When a rule change would invalidate existing artifacts (e.g., token rename, radius change, removed prop), a migration file under `canonical/rule-engine/migrations/` SHALL be created describing the before-state, the after-state, and the steps for affected artifacts.

#### Scenario: Token migration is documented
- **WHEN** a token is renamed or its value changes in a way that breaks existing components
- **THEN** a `migrations/<token>-migration-v<from>-to-v<to>.md` file exists describing the change and the rebuild path

#### Scenario: Migration is referenced by impact summary
- **WHEN** `change-impact-analyst` produces an `impact-summary.json` for a change covered by a migration file
- **THEN** the summary references the migration file path

### Requirement: Rule validation script

`canonical/rule-engine/validation-checks.md` SHALL define the validation rules a deterministic checker enforces against the rule corpus: presence of all required fields, valid `Status` values, valid `Rule ID` format, no duplicate IDs, and no broken references between rules.

#### Scenario: Validation checker runs cleanly on a healthy corpus
- **WHEN** the validation checker runs against a corpus with all rules well-formed
- **THEN** it exits successfully and reports zero issues

#### Scenario: Validation checker catches malformed rule
- **WHEN** a rule is added with a malformed ID, missing field, or invalid status
- **THEN** the checker reports the specific rule and field that failed
