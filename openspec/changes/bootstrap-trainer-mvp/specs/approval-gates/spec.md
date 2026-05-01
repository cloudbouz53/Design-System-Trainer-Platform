## ADDED Requirements

### Requirement: Six approval gates govern promotion

Every component, set, and app SHALL pass the applicable subset of six approval gates before promotion: Token Gate, State Gate, Accessibility Gate, Visual Regression Gate, Guardian Approval Gate, and Dependency Truth Gate. The applicability matrix is defined in PRD §13.

#### Scenario: Component passes all six gates
- **WHEN** a primitive is proposed for promotion
- **THEN** Token, State, Accessibility, Visual Regression, Guardian Approval, and Dependency Truth gates all pass before the artifact is marked promoted

#### Scenario: Any failed gate blocks promotion
- **WHEN** any single gate fails
- **THEN** the artifact MUST NOT be promoted regardless of other gate status

### Requirement: Token Gate verifies semantic-token usage

The Token Gate SHALL pass only when every value-bearing reference in the artifact (color, spacing, radius, font, shadow, motion) resolves to an entry in `design-system/canonical/tokens/`. Hardcoded values SHALL fail the gate.

#### Scenario: Manifest reference resolves
- **WHEN** the resolver materializes the artifact's bundle
- **AND** every token referenced in the artifact's source resolves through `tokens-index.json`
- **THEN** the Token Gate passes

#### Scenario: Hardcoded value fails
- **WHEN** the artifact contains any unresolved literal value (e.g., `#FF00AA`, `padding: 11px`)
- **THEN** the Token Gate fails with a list of offending file/line locations

### Requirement: State Gate verifies state coverage

The State Gate SHALL pass only when every interaction and status state declared by `design-system/canonical/states/` for the artifact's class is exercised in the artifact's stories or tests.

#### Scenario: All declared states covered
- **WHEN** Button declares states {default, hover, focus, active, disabled, loading}
- **AND** the Button story renders all six
- **THEN** the State Gate passes

#### Scenario: Missing state fails
- **WHEN** any declared state is not exercised
- **THEN** the State Gate fails and lists the missing state names

### Requirement: Accessibility Gate verifies a11y expectations

The Accessibility Gate SHALL pass only when the artifact meets the accessibility expectations recorded in `design-system/canonical/accessibility/` for its class (semantic role, keyboard interaction, focus management, ARIA attributes, color contrast against the target token palette).

#### Scenario: A11y check passes
- **WHEN** Button has the correct role, keyboard activation handlers, focus ring, and contrast ratio for all token combinations
- **THEN** the Accessibility Gate passes

#### Scenario: A11y violation fails
- **WHEN** any required accessibility expectation is unmet
- **THEN** the gate fails with the specific expectation that was violated

### Requirement: Visual Regression Gate ties to tooling output

The Visual Regression Gate SHALL derive its pass/fail signal from Chromatic or Playwright diff output, with `visual-reviewer` providing semantic interpretation. Diffs above tolerance SHALL fail unless traceable to an approved canonical change.

#### Scenario: Within-tolerance diff passes
- **WHEN** all baselines vs actuals are within configured tolerance
- **THEN** the gate passes

#### Scenario: Approved intentional diff passes
- **WHEN** a diff exceeds tolerance but matches an approved canonical change
- **THEN** baselines are updated and the gate passes

#### Scenario: Unexplained over-tolerance diff fails
- **WHEN** a diff exceeds tolerance with no matching approved change
- **THEN** the gate fails

### Requirement: Guardian Approval Gate is the final authority

The Guardian Approval Gate SHALL pass only when `design-system-guardian` records explicit approval. Approval SHALL be recorded in the artifact's promotion entry in `canonical/rule-engine/changelog.md` (for rules) or in the artifact's golden-example metadata (for components, sets, apps).

#### Scenario: Guardian approves promotion
- **WHEN** all prior gates pass and the guardian inspects the artifact
- **THEN** the guardian records approval, and the artifact is promoted

#### Scenario: Guardian withholds approval
- **WHEN** the guardian identifies a concern not caught by other gates
- **THEN** approval is withheld and the artifact returns to its builder with notes

### Requirement: Dependency Truth Gate requires a fresh graph

The Dependency Truth Gate SHALL pass only when the four dependency graph JSON files reflect the artifact's current state — i.e., the most recent `generate-graph.mjs` run is newer than every relevant input file under `ui-lab/` and `design-system/canonical/`.

#### Scenario: Fresh graph passes the gate
- **WHEN** `generate-graph.mjs` was run after the artifact's last edit
- **THEN** the Dependency Truth Gate passes

#### Scenario: Stale graph fails the gate
- **WHEN** any artifact input file has an mtime newer than the graph
- **THEN** the gate fails and the operator MUST run `dependency-tracker/run.sh` before retrying

### Requirement: Gates are observable

Every gate run SHALL produce a record (e.g., a CI log line, a `ui-lab/reports/` entry, or a PR comment) showing which gates ran, which passed, which failed, and why. Hidden or undocumented gate runs SHALL NOT count.

#### Scenario: Gate run produces a record
- **WHEN** any gate runs against an artifact
- **THEN** an observable record exists tying the gate, the artifact version, the result, and the rationale together
