## ADDED Requirements

### Requirement: Primitives live under ui-lab/primitives/

Single-component primitives SHALL be authored under `ui-lab/primitives/<component>/`. Each primitive SHALL include the implementation file(s), a Storybook story (or equivalent harness for visual regression), and a reference back to the manifest under `design-system/retrieval/manifests/<component>.manifest.md`.

#### Scenario: Button is built under primitives
- **WHEN** `component-builder` produces the Button primitive for the MVP
- **THEN** files exist under `ui-lab/primitives/button/`
- **AND** a Storybook story renders Button in every state declared by its manifest

#### Scenario: Input is built under primitives
- **WHEN** `component-builder` produces the Input primitive for the MVP
- **THEN** files exist under `ui-lab/primitives/input/`
- **AND** a Storybook story renders Input in every state declared by its manifest

### Requirement: Primitive consumes only its bundle

`component-builder` SHALL build a primitive using only the focused bundle produced from that primitive's manifest, plus the implementation conventions in `.claude/rules/component-files.md`. It SHALL NOT consume canonical files outside the bundle.

#### Scenario: Builder reads bundle, not corpus
- **WHEN** `component-builder` is invoked for Button
- **THEN** its working context is the resolver's bundle for Button's manifest
- **AND** if a needed rule or token is missing from the bundle, the builder pauses and the manifest is updated rather than reading from canonical directly

### Requirement: State coverage matches the manifest

A primitive SHALL render every interaction and status state declared by `design-system/canonical/states/` for its component class (e.g., default, hover, focus, active, disabled, loading, error, success). Missing state coverage fails the State Gate.

#### Scenario: All declared states are exercised
- **WHEN** the State Gate runs against a primitive
- **THEN** every state declared in `canonical/states/` for that component class is present in the primitive's story or test
- **AND** missing states cause gate failure with an explicit list of missing state names

### Requirement: Primitive uses semantic tokens only

A primitive SHALL reference values only via approved semantic tokens. Hardcoded values (raw hex colors, magic spacing values, ad-hoc font sizes) SHALL fail the Token Gate.

#### Scenario: Hardcoded color fails the gate
- **WHEN** a primitive's implementation contains a raw hex value, RGB literal, or named CSS color outside the token system
- **THEN** the Token Gate fails and reports the file, line, and offending value

#### Scenario: Token reference passes the gate
- **WHEN** every color, spacing, radius, and font value in a primitive resolves to an entry in `canonical/tokens/`
- **THEN** the Token Gate passes

### Requirement: Component triggers dependency tracker after build

After a primitive passes its initial local gates (Token, State, Accessibility), `component-builder` SHALL execute `.claude/skills/dependency-tracker/run.sh`. The primitive SHALL NOT proceed to Visual Regression or Guardian Approval until the tracker has produced fresh graph outputs.

#### Scenario: Tracker runs after build
- **WHEN** Button passes its local Token, State, and Accessibility gates
- **THEN** `component-builder` runs the dependency-tracker before requesting visual regression or guardian review

#### Scenario: Skipping the tracker blocks promotion
- **WHEN** a primitive's promotion is requested but the graph is stale relative to the primitive's files
- **THEN** the Dependency Truth Gate fails and the primitive cannot be promoted

### Requirement: Golden example accompanies a promoted primitive

When a primitive passes the Guardian Approval Gate, a golden example SHALL be saved under `design-system/golden-examples/single-components/<component>/`. The golden example records the canonical-correct implementation at that version for future review and regression.

#### Scenario: Promotion saves a golden example
- **WHEN** the guardian approves a primitive
- **THEN** a snapshot of its implementation, story, and screenshots is written to `golden-examples/single-components/<component>/v<version>/`
