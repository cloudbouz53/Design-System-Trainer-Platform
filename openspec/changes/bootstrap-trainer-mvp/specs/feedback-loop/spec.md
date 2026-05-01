## ADDED Requirements

### Requirement: Feedback flows through four states

All feedback (text or screenshot) SHALL live under `design-system/feedback/` in one of four states: `pending/`, `accepted/`, `rejected/`, or `escalations/`. Transitions between states SHALL only be performed by guardian-mediated handoff.

#### Scenario: New feedback lands in pending
- **WHEN** a contributor or `visual-reviewer` records new feedback
- **THEN** the feedback file is written to `design-system/feedback/pending/`

#### Scenario: Guardian moves feedback
- **WHEN** `design-system-guardian` reviews a pending item
- **THEN** the file is moved to `accepted/`, `rejected/`, or `escalations/` with a recorded rationale

#### Scenario: Direct write to accepted is rejected
- **WHEN** any subagent other than `design-system-guardian` writes directly to `accepted/`, `rejected/`, or `escalations/`
- **THEN** the write is rejected

### Requirement: Each feedback item has structured metadata

A feedback file SHALL contain: a unique ID, the date created, the source (contributor name or subagent), the affected artifact(s), the feedback type (text observation, screenshot annotation, regression note), the body, and (once moved) the resolution rationale.

#### Scenario: Feedback file is well-formed
- **WHEN** a new feedback file is added under `pending/`
- **THEN** it includes ID, date, source, affected artifacts, type, and body fields

#### Scenario: Resolution rationale is required for state transitions
- **WHEN** feedback moves out of `pending/`
- **THEN** the file gains a resolution-rationale section recording why it was accepted, rejected, or escalated

### Requirement: Accepted feedback becomes a rule change

`feedback-librarian` SHALL convert each accepted feedback item into either a new canonical rule, a modified canonical rule, or a new golden example. The conversion SHALL update `canonical/rule-engine/RULES.md`, `canonical/rule-engine/changelog.md`, and (when applicable) create a `migrations/` file.

#### Scenario: Accepted feedback yields a new rule
- **WHEN** an accepted feedback item identifies a behavior not yet covered by any rule
- **THEN** `feedback-librarian` drafts a new rule, the guardian approves it to `active`, and `RULES.md` plus `changelog.md` are updated

#### Scenario: Accepted feedback modifies an existing rule
- **WHEN** an accepted feedback item refines or contradicts an existing rule
- **THEN** the rule's `Version` is bumped, its content updated, and the change is recorded in `changelog.md`
- **AND** if the change is breaking, a `migrations/` file is created

### Requirement: Rule change triggers cascading rebuild plan

After any canonical rule change driven by feedback, `dependency-tracker/run.sh` SHALL be invoked, and `change-impact-analyst` SHALL produce a rebuild plan listing every artifact that must be rebuilt or reviewed.

#### Scenario: Token rule update triggers rebuild plan
- **WHEN** a token rule is modified per accepted feedback
- **THEN** the dependency tracker runs, `impact-summary.json` is refreshed, and `change-impact-analyst` produces a rebuild plan
- **AND** the plan is attached to the feedback file's resolution metadata

#### Scenario: Rebuild plan tasks are tracked
- **WHEN** a rebuild plan is produced
- **THEN** each affected artifact is tracked through the gate pipeline until re-promoted

### Requirement: One end-to-end cycle is validated for MVP

The MVP SHALL include at least one fully-validated feedback cycle: a pending feedback item is created, accepted by the guardian, converted into a rule change by `feedback-librarian`, propagated through the dependency tracker, has its rebuild plan produced by `change-impact-analyst`, has affected artifacts re-built, and has visual regression confirm the new state. The cycle SHALL be documented as a reference example.

#### Scenario: MVP feedback cycle is reproducible
- **WHEN** the MVP is reviewed for completeness
- **THEN** a documented cycle exists showing every step from pending through re-promotion
- **AND** the documentation lives under `design-system/feedback/` or `design-system/golden-examples/` as a reference cycle
