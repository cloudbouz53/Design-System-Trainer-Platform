## ADDED Requirements

### Requirement: Repository directory structure

The project SHALL provide the directory tree defined in PRD §4 at the repository root: `CLAUDE.md`, `README.md`, `.claude/{agents,skills,rules}/`, `design-system/{source,retrieval,canonical,feedback,golden-examples,references}/`, and `ui-lab/{primitives,component-sets,react-apps,nextjs-apps,html-apps,snapshots,reports}/`.

#### Scenario: Fresh clone has the full tree
- **WHEN** a developer clones the repository and runs `ls -R` from the project root
- **THEN** every directory listed in PRD §4 is present
- **AND** placeholder files (e.g., `.gitkeep`) preserve directories that have no content yet

#### Scenario: New asset goes in its declared home
- **WHEN** any subagent or skill creates a new artifact (rule, component, manifest, golden example, snapshot, etc.)
- **THEN** the artifact MUST be written under the path designated for its kind by PRD §4
- **AND** writes outside the declared tree are rejected by the guardian during gate review

### Requirement: CLAUDE.md is concise and stable

`CLAUDE.md` SHALL contain only stable project guidance: the operating model summary, the role-separation principle, the canonical-truth-lives-in-files principle, and pointers to `.claude/rules/` and Skills. It SHALL NOT contain rule content, token values, dependency information, or procedural workflows.

#### Scenario: CLAUDE.md edits stay within scope
- **WHEN** a contributor proposes adding rule details, token values, or workflow steps to `CLAUDE.md`
- **THEN** the guardian rejects the edit and redirects the content to `.claude/rules/`, `design-system/canonical/`, or a Skill as appropriate

#### Scenario: CLAUDE.md length stays bounded
- **WHEN** `CLAUDE.md` exceeds approximately 200 lines
- **THEN** content MUST be moved into Skills or `.claude/rules/` files before further additions

### Requirement: Path-scoped rules in .claude/rules/

The project SHALL provide path-scoped rule files under `.claude/rules/` covering, at minimum: `general-governance.md`, `component-files.md`, `app-files.md`, `token-files.md`, and `review-files.md`. Each rule file SHALL declare which paths it applies to and which subagent owns writes under those paths.

#### Scenario: Path-scoped rule applies during edits
- **WHEN** any subagent edits a file under a path covered by a `.claude/rules/` file
- **THEN** the rules in that file are treated as binding for the edit

#### Scenario: Cross-role write is blocked
- **WHEN** a subagent attempts to write to a path owned by a different subagent
- **THEN** the write MUST be routed through a guardian-mediated handoff, not performed directly

### Requirement: Subagent roster

The project SHALL define nine specialized subagents under `.claude/agents/`: `design-system-guardian`, `geist-researcher`, `component-builder`, `component-set-builder`, `project-builder`, `visual-reviewer`, `feedback-librarian`, `style-drift-auditor`, and `change-impact-analyst`. Each subagent SHALL have a single, non-overlapping responsibility as listed in PRD §5.1.

#### Scenario: Subagent file exists for each role
- **WHEN** the repository is inspected
- **THEN** `.claude/agents/<name>.md` exists for each of the nine subagents
- **AND** each file declares the subagent's responsibility, the paths it owns, and the gates it participates in

#### Scenario: Responsibility overlap is rejected
- **WHEN** a new subagent prompt is proposed whose responsibility overlaps an existing subagent
- **THEN** the proposal MUST either be rejected or re-scoped so responsibilities remain non-overlapping

### Requirement: Skill roster

The project SHALL define eleven skills under `.claude/skills/`: `geist-foundations`, `geist-components`, `component-set-assembly`, `app-assembly-react`, `app-assembly-nextjs`, `app-assembly-html`, `visual-review-workflow`, `feedback-to-rules`, `canonical-rule-authoring`, `retrieval-bundles`, and `dependency-tracker`. Each skill SHALL have a `SKILL.md` describing its purpose and procedure; skills MAY include bundled scripts (e.g., the dependency-tracker's `generate-graph.mjs` and `run.sh`).

#### Scenario: Skill loads on demand
- **WHEN** a subagent invokes a skill by name or matches its trigger
- **THEN** Claude Code loads the skill body for that session
- **AND** non-invoked skills do NOT contribute to startup context

#### Scenario: Skill has a minimal SKILL.md contract
- **WHEN** any new skill is added
- **THEN** its `SKILL.md` describes the skill's purpose, its inputs, its outputs, and any bundled scripts
