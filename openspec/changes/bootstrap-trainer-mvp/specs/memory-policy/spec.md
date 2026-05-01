## ADDED Requirements

### Requirement: Canonical truth lives in repository files

The canonical source of truth for rules, tokens, states, components, sets, app patterns, accessibility expectations, and dependency edges SHALL be repository files under `design-system/canonical/` (and `ui-lab/` for built artifacts). Auto memory and `CLAUDE.md` SHALL NOT contain canonical content.

#### Scenario: Subagents read canonical content from repo files
- **WHEN** any subagent needs to consult a rule, token, state definition, or dependency edge
- **THEN** it reads from `design-system/canonical/` (directly or via a retrieval bundle), not from auto memory

#### Scenario: Conflict resolves to repo files
- **WHEN** auto memory and a canonical repo file disagree
- **THEN** the canonical file wins
- **AND** the stale memory entry is updated or removed

### Requirement: Auto memory scope is operational only

Claude Code auto memory MAY store: the timestamp of the last `dependency-tracker` run, the most recent rebuild scope, repeated review problems observed across sessions, and ephemeral investigation context for the current task. Auto memory SHALL NOT store rule content, token values, dependency edges, manifest contents, or any other canonical material.

#### Scenario: Permitted operational note is stored
- **WHEN** the dependency tracker last ran on a given date
- **THEN** that timestamp MAY be saved in auto memory for quick reference

#### Scenario: Forbidden canonical content is rejected
- **WHEN** a subagent attempts to save rule content, token values, or graph edges to auto memory
- **THEN** the save MUST be rejected and the content placed in the appropriate canonical file instead

### Requirement: CLAUDE.md scope is project guidance only

`CLAUDE.md` SHALL contain only stable project guidance — the operating model summary, role-separation principle, canonical-truth principle, and pointers to `.claude/rules/` and Skills. It SHALL NOT contain rules, tokens, dependency information, or procedural workflows.

#### Scenario: Procedural content goes to a Skill
- **WHEN** a contributor proposes adding a multi-step procedure to `CLAUDE.md`
- **THEN** the procedure is moved to a Skill under `.claude/skills/` instead

#### Scenario: Path-scoped guidance goes to .claude/rules/
- **WHEN** a contributor proposes adding guidance that applies only to a specific path
- **THEN** the guidance is moved to the appropriate `.claude/rules/<file>.md` instead

### Requirement: Skills hold procedural workflows

Reusable procedures, reference playbooks, and bundled scripts SHALL live in Skills under `.claude/skills/`. Skills SHALL be loaded on demand rather than at session startup so that always-on context remains small.

#### Scenario: Procedural content lives in a Skill
- **WHEN** a workflow has more than a few steps or includes scripts
- **THEN** it is implemented as a Skill, not embedded in `CLAUDE.md` or in an agent prompt

#### Scenario: Skill loads only when relevant
- **WHEN** a session begins and no relevant skill is invoked
- **THEN** the skill body is NOT loaded into context

### Requirement: External memory orchestrators are out of scope

The platform SHALL NOT depend on Serena MCP or any other external memory orchestration service for canonical truth. Workflows SHALL function without such services.

#### Scenario: No Serena MCP dependency
- **WHEN** the repository is inspected
- **THEN** no configuration file, agent prompt, or skill references Serena MCP for canonical state
- **AND** any external MCP integration that exists is for non-canonical convenience only

### Requirement: Periodic memory hygiene review

A periodic review pass SHALL audit auto memory entries for canonical-shaped content that has crept in (rule fragments, token values, dependency claims). Offending entries SHALL be removed and the content relocated to its canonical home if it is missing there.

#### Scenario: Review finds canonical creep
- **WHEN** auto memory contains a fragment that should be a canonical rule or token
- **THEN** the fragment is removed from memory
- **AND** if the canonical home is missing the content, the content is added there through the normal promotion path

#### Scenario: Clean review records nothing
- **WHEN** auto memory contains only operational notes
- **THEN** the review records "clean" and takes no action
