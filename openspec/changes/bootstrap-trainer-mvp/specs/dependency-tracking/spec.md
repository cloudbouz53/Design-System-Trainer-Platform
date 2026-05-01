## ADDED Requirements

### Requirement: Deterministic dependency tracker is the sole writer of graph JSON

The four authoritative graph JSON files — `component-import-graph.json`, `token-usage-graph.json`, `canonical-spec-graph.json`, and `impact-summary.json` under `design-system/canonical/dependency-graph/` — SHALL be written exclusively by the `dependency-tracker` skill's `generate-graph.mjs` script invoked through `run.sh`. No other subagent, skill, or human-authored process SHALL author or patch these files.

#### Scenario: Builder runs the script, not edits the JSON
- **WHEN** `component-builder` finishes a primitive and needs the graph refreshed
- **THEN** it executes `.claude/skills/dependency-tracker/run.sh`
- **AND** it does NOT open or edit any file under `design-system/canonical/dependency-graph/`

#### Scenario: Manual graph edit is rejected
- **WHEN** any change introduces a manual edit to one of the four graph JSON files (i.e., the diff is not produced by `generate-graph.mjs`)
- **THEN** the change MUST be rejected at gate review

### Requirement: Tracker scans the full sourcebase

`generate-graph.mjs` SHALL scan, at minimum, all files under `ui-lab/` and all files under `design-system/canonical/`, extracting: import statements (component-to-component edges), token references (component-to-token edges), and canonical spec references (component-to-rule edges).

#### Scenario: New component added is reflected in the graph
- **WHEN** a new file is added under `ui-lab/primitives/` and the script is run
- **THEN** `component-import-graph.json` includes the new component and all its outbound imports
- **AND** `token-usage-graph.json` includes every token the component references
- **AND** `canonical-spec-graph.json` includes every rule the component cites

#### Scenario: Removed file is removed from the graph
- **WHEN** a component file is deleted and the script is run
- **THEN** the component and all its edges are absent from the new graph outputs

### Requirement: Impact summary derives from graph truth

`impact-summary.json` SHALL be derived solely from the other three graph files. It SHALL list, for a given changed rule or token, every downstream component, set, and app that must be rebuilt or reviewed.

#### Scenario: Token change produces impact list
- **WHEN** a token is modified and the script is run with that token's ID as input
- **THEN** `impact-summary.json` enumerates every component using that token, transitively through any sets and apps that include those components

#### Scenario: Rule change produces impact list
- **WHEN** a canonical rule is modified and the script is run with that rule's ID as input
- **THEN** `impact-summary.json` enumerates every artifact that cites the rule, plus its downstream consumers

### Requirement: Stale graph blocks impact analysis

`change-impact-analyst` SHALL refuse to compute or report impact when the graph is stale. The graph is "stale" if any file under `ui-lab/` or `design-system/canonical/` has a modification time newer than the most recent successful run of `generate-graph.mjs`.

#### Scenario: Stale graph is refreshed before analysis
- **WHEN** `change-impact-analyst` is invoked and detects a stale graph
- **THEN** it triggers `dependency-tracker/run.sh` (or instructs the operator to run it) before producing any impact output

#### Scenario: Fresh graph allows analysis
- **WHEN** the graph's mtime is newer than every relevant input file
- **THEN** `change-impact-analyst` proceeds with analysis using the existing graph

### Requirement: Tracker reports unsupported constructs

If `generate-graph.mjs` encounters a construct it cannot reliably parse (e.g., a dynamic import with a computed specifier, a token referenced via runtime concatenation), it SHALL record the file and line in an `unsupported` section of its run output rather than silently dropping the edge.

#### Scenario: Unsupported edge is reported
- **WHEN** the script encounters an unparseable import or token reference
- **THEN** it logs the file, line, and reason to the run report

#### Scenario: Unsupported entries block promotion
- **WHEN** an artifact under review has an unsupported entry in the most recent tracker run
- **THEN** it cannot pass the Dependency Truth Gate until the entry is resolved (either rewritten to a supported form or explicitly waived by the guardian)
