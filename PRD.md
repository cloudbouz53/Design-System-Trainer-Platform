
# PRD: Design System Trainer Platform (Final Version)

## 1. Overview

Design System Trainer Platform is a project-scoped governance and assembly system built around Claude Code customization primitives: always-on project instructions, reusable skills, specialized subagents, and project memory.

Its purpose is to study a reference design system, extract reusable rules, formalize them into a canonical internal standard, generate components and applications from that standard, and continuously improve the system through structured review loops.

This final version explicitly avoids Serena MCP and any external memory orchestration layer. Instead, it relies on:
- repository-owned canonical files,
- deterministic scripts,
- Claude Code project instructions,
- `.claude/rules/`,
- Skills,
- subagents,
- and Claude Code auto memory.

## 2. Product goals

### 2.1 Goals

- Ingest a reference design system and extract structured observations and inferred rules.
- Convert approved findings into a canonical internal design standard.
- Generate single components, coherent component sets, and full projects in React, Next.js, or static HTML.
- Turn text feedback and screenshot feedback into durable rules and golden examples.
- Use deterministic graph generation for dependency truth.
- Use scoped retrieval bundles to control context growth.
- Use versioned rule governance for safe cascading updates.
- Use visual regression tooling for exact screenshot comparison while keeping LLM review semantic.

### 2.2 Non-goals

- Fine-tuning or retraining the underlying model.
- Claiming pixel-perfect accuracy from the LLM alone.
- Allowing builders to invent dependency graphs manually.
- Allowing project builders to introduce new patterns outside governance flow.
- Replacing deterministic regression tooling with screenshot reasoning only.
- Using Serena MCP or any external MCP memory service.

### 2.3 Success criteria

- Canonical rules become the authoritative source for design behavior.
- Dependency graphs are generated only by scripts, never by manual JSON edits.
- Component and app builds consume only relevant context bundles.
- Visual diffs are validated through Chromatic or Playwright, then interpreted semantically by the review layer.
- Rule changes trigger auditable downstream rebuild or review plans.
- Claude Code auto memory and repository artifacts retain operational context without becoming the source of truth.

## 3. Core architecture

### 3.1 Operating model

The platform uses four operating layers:

- `CLAUDE.md` for always-on project guidance.
- `.claude/rules/` for modular and path-scoped project rules.
- `Skills` for reusable domain procedures, reference logic, and bundled scripts.
- `Subagents` for isolated specialized execution.

Claude Code documents that `CLAUDE.md` is for user-authored instructions, while auto memory stores learnings and patterns Claude writes itself. Both are loaded at session start, but they are context layers, not hard enforcement. The formal source of truth for this platform must therefore remain in repository files under `design-system/canonical/`. [page:1]

### 3.2 Governance principles

#### Source is not authority
Everything learned from a reference system must enter `design-system/source/` first.  
Nothing becomes canonical until approved and published under `design-system/canonical/`.

#### Roles stay separated
Research, approval, building, reviewing, dependency analysis, and change planning must remain separate subagent responsibilities.

#### Rules beat impressions
Every accepted correction should become a structured rule with:
- ID,
- scope,
- rationale,
- validation criteria,
- examples,
- and status.

#### No output is canonical without gates
Components, sets, and apps must pass explicit gates before promotion.

#### Memory supports governance; it does not replace it
Claude Code auto memory may retain operational learnings, but repository files remain the only canonical truth. Claude Code itself distinguishes between instructions in `CLAUDE.md` and learnings in auto memory, so this platform must keep formal rules in versioned files, not memory notes. [page:1]

## 4. Repository structure

```txt
project-root/
├── CLAUDE.md
├── README.md
│
├── .claude/
│   ├── agents/
│   │   ├── design-system-guardian.md
│   │   ├── geist-researcher.md
│   │   ├── component-builder.md
│   │   ├── component-set-builder.md
│   │   ├── project-builder.md
│   │   ├── visual-reviewer.md
│   │   ├── feedback-librarian.md
│   │   ├── style-drift-auditor.md
│   │   └── change-impact-analyst.md
│   │
│   ├── skills/
│   │   ├── geist-foundations/
│   │   ├── geist-components/
│   │   ├── component-set-assembly/
│   │   ├── app-assembly-react/
│   │   ├── app-assembly-nextjs/
│   │   ├── app-assembly-html/
│   │   ├── visual-review-workflow/
│   │   ├── feedback-to-rules/
│   │   ├── canonical-rule-authoring/
│   │   ├── retrieval-bundles/
│   │   └── dependency-tracker/
│   │       ├── SKILL.md
│   │       ├── generate-graph.mjs
│   │       └── run.sh
│   │
│   └── rules/
│       ├── general-governance.md
│       ├── component-files.md
│       ├── app-files.md
│       ├── token-files.md
│       └── review-files.md
│
├── design-system/
│   ├── source/
│   │   └── geist/
│   │       ├── source-index.md
│   │       ├── raw-observations.md
│   │       ├── inferred-rules.md
│   │       ├── materials-notes.md
│   │       └── component-notes.md
│   │
│   ├── retrieval/
│   │   ├── manifests/
│   │   ├── bundles/
│   │   └── indexes/
│   │
│   ├── canonical/
│   │   ├── principles/
│   │   ├── tokens/
│   │   ├── states/
│   │   ├── components/
│   │   ├── sets/
│   │   ├── app-patterns/
│   │   ├── accessibility/
│   │   ├── rule-engine/
│   │   ├── dependency-graph/
│   │   │   ├── component-import-graph.json
│   │   │   ├── token-usage-graph.json
│   │   │   ├── canonical-spec-graph.json
│   │   │   └── impact-summary.json
│   │   ├── dependency-versions/
│   │   └── checklists/
│   │
│   ├── feedback/
│   │   ├── pending/
│   │   ├── accepted/
│   │   ├── rejected/
│   │   └── escalations/
│   │
│   ├── golden-examples/
│   │   ├── single-components/
│   │   ├── component-sets/
│   │   └── full-screens/
│   │
│   └── references/
│       ├── screenshots/
│       ├── crops/
│       ├── annotations/
│       └── comparisons/
│
└── ui-lab/
    ├── primitives/
    ├── component-sets/
    ├── react-apps/
    ├── nextjs-apps/
    ├── html-apps/
    ├── snapshots/
    └── reports/
```

## 5. Subagents

### 5.1 Subagent responsibilities

| Subagent | Responsibility |
|---|---|
| `design-system-guardian` | Final approval authority for rules, components, sets, and apps. |
| `geist-researcher` | Reads reference systems and produces structured observations and inferred rules. |
| `component-builder` | Builds a single primitive component from canonical rules. |
| `component-set-builder` | Builds coherent groups of related components. |
| `project-builder` | Assembles full React, Next.js, or HTML projects from approved assets. |
| `visual-reviewer` | Interprets visual evidence and classifies likely causes of visual differences. |
| `feedback-librarian` | Converts accepted corrections into repository knowledge. |
| `style-drift-auditor` | Detects deviation from canonical design language over time. |
| `change-impact-analyst` | Computes downstream rebuild or review scope from dependency graph truth. |

Claude Code supports specialized subagents and forked execution contexts for task isolation, which makes this separation appropriate for research, generation, review, and impact analysis workflows. [page:2]

## 6. Skills

### 6.1 Skill philosophy

Skills should remain narrow, reusable, and procedural. Claude Code loads full skill bodies only when relevant or invoked, which makes Skills appropriate for large procedures, reference playbooks, and bundled scripts without bloating every session’s startup context. [page:2]

### 6.2 Key skills

- `geist-foundations`
- `geist-components`
- `component-set-assembly`
- `app-assembly-react`
- `app-assembly-nextjs`
- `app-assembly-html`
- `visual-review-workflow`
- `feedback-to-rules`
- `canonical-rule-authoring`
- `retrieval-bundles`
- `dependency-tracker`

## 7. Deterministic dependency tracking

### 7.1 Policy

Dependency graph JSON files must never be authored, patched, or inferred manually by an LLM.  
They must be generated only by a deterministic script under the `dependency-tracker` skill.

### 7.2 Skill contract

Location:

```txt
.claude/skills/dependency-tracker/
├── SKILL.md
├── generate-graph.mjs
└── run.sh
```

Responsibilities:
- scan `ui-lab/`
- scan `design-system/canonical/`
- extract imports via AST-style or regex-based tracking
- extract token references
- extract canonical spec references
- rewrite graph JSON outputs

Authoritative outputs:
- `component-import-graph.json`
- `token-usage-graph.json`
- `canonical-spec-graph.json`
- `impact-summary.json`

### 7.3 Enforcement rules

- `component-builder` must never write dependency JSON files directly.
- `component-builder` must execute `.claude/skills/dependency-tracker/run.sh` after a component passes initial local gates.
- `change-impact-analyst` must treat the script-generated graph JSON files as the absolute truth for downstream rebuild and review scope.
- If the graph is stale, `change-impact-analyst` must require a refresh before proceeding.

## 8. Retrieval architecture

Large-scale app assembly risks context overload if builders load every token, rule, and pattern at once. Claude Code recommends keeping always-on instruction files concise and moving procedural or scoped knowledge into path-scoped rules and skills. [page:1][page:2]

To avoid context bloat, the platform introduces retrieval bundles.

```txt
design-system/retrieval/
├── manifests/
│   ├── button.manifest.md
│   ├── input.manifest.md
│   ├── form-set.manifest.md
│   └── app-shell.manifest.md
├── bundles/
│   ├── component-context-builder.md
│   └── app-context-builder.md
└── indexes/
    ├── rules-index.json
    ├── tokens-index.json
    └── dependencies-index.json
```

Workflow:
1. A task requests a component, set, or screen.
2. A bundling layer resolves the relevant manifests.
3. Only the needed rules, specs, tokens, anti-patterns, and patterns are bundled.
4. The builder receives the focused bundle rather than the full corpus.

## 9. Visual QA architecture

LLM-based visual review is useful for semantic interpretation, but exact screenshot validation should be delegated to visual regression tooling.

| Layer | Role |
|---|---|
| Visual regression engine | Generates baseline, actual, and diff artifacts using Chromatic or Playwright visual comparisons. |
| `visual-reviewer` | Reads visual diff outputs, classifies likely causes, and translates them into design implications. |
| `design-system-guardian` | Accepts, rejects, escalates, or requests migration after review. |

Use **Chromatic** when the workflow is Storybook-first and centered on component baselines and review flows.  
Use **Playwright visual comparisons** when the workflow needs repository-local screenshot assertions across pages, components, or flows. [web:95][web:109]

## 10. Rule engine

Every canonical rule should use a structured format so it can be validated, versioned, migrated, and traced.

Example:

```md
Rule ID: BTN-001
Status: active
Version: 1.0.0
Source: reference observation + human approval
Scope: buttons / primary actions
Priority: high

Do:
- Use semantic tokens only

Do Not:
- Do not hardcode colors inside component files

Why:
- Preserves consistency, theming, and reviewability

Validation:
- Fail if raw hex values appear in the component implementation

Impact:
- Affects all primary button variants and form actions

Good Example:
- Uses shared color, spacing, and radius tokens

Bad Example:
- Uses direct hex values and arbitrary padding
```

## 11. Versioning and cascading updates

Rule changes must be treated as first-class events because a token or spec change can affect multiple downstream layers.

Structure:

```txt
design-system/canonical/
├── rule-engine/
│   ├── RULES.md
│   ├── validation-checks.md
│   ├── changelog.md
│   ├── versions/
│   │   ├── v1.0.0.md
│   │   ├── v1.1.0.md
│   │   └── v2.0.0.md
│   └── migrations/
│       ├── token-migration-v1-to-v1.1.md
│       └── radius-migration-v1.1-to-v2.md
└── dependency-graph/
    ├── component-import-graph.json
    ├── token-usage-graph.json
    ├── canonical-spec-graph.json
    └── impact-summary.json
```

Cascading update workflow:
1. `design-system-guardian` approves a rule or token change.
2. Rule metadata and version history are updated.
3. `dependency-tracker` refreshes graph truth.
4. `change-impact-analyst` computes affected components, sets, and apps.
5. Rebuild or review tasks are created.
6. Builders update affected artifacts.
7. Visual regression checks expected vs unexpected changes.
8. The guardian approves or escalates the new state.

## 12. Claude Code memory policy

This platform does **not** use Serena MCP.

Instead, it relies on Claude Code’s documented memory model:
- `CLAUDE.md` for persistent project instructions,
- `.claude/rules/` for scoped project guidance,
- auto memory for Claude-written learnings and patterns,
- repository artifacts for canonical truth. [page:1]

### 12.1 Rules

- Dependency graph JSON files remain the authoritative source of dependency truth.
- Auto memory may store short operational notes such as:
  - last dependency refresh,
  - recent rebuild implications,
  - repeated review problems,
  - temporary investigation context.
- Auto memory must never override canonical repository files.
- `CLAUDE.md` should remain concise and hold only stable project guidance.
- Procedural workflows should live in Skills, because Claude Code loads full skill content on demand rather than at every startup. [page:2]

## 13. Approval gates

| Gate | Applies to | Pass condition |
|---|---|---|
| Token Gate | components / sets / apps | Required values come from approved semantic tokens. |
| State Gate | components / sets | Required interaction and status states are covered. |
| Accessibility Gate | components / apps | Accessibility and interaction expectations are met. |
| Visual Regression Gate | components / sets / apps | Diff output is within expected range or intentionally approved. |
| Guardian Approval Gate | all deliverables | Final authority confirms promotion is allowed. |
| Dependency Truth Gate | components / sets / apps after structural change | `dependency-tracker` has refreshed graph outputs before impact analysis. |

## 14. Execution phases

### Phase 1: Governance setup
Create `CLAUDE.md`, `.claude/agents`, `.claude/skills`, `.claude/rules`, and the initial `design-system/` and `ui-lab/` structure.

### Phase 2: Source ingestion
Run `geist-researcher` to capture structured source observations and inferred rules.

### Phase 3: Canonical authoring
Promote accepted rules into `canonical/`, assign IDs, establish lifecycle status, and initialize changelog management.

### Phase 4: Primitive components
Build Button, Input, Card, and Dialog with explicit state coverage and initial regression baselines.

### Phase 5: Component sets
Assemble coherent sets from approved primitives and validate internal consistency.

### Phase 6: Full app assembly
Use `project-builder` plus retrieval bundles to assemble React, Next.js, or HTML apps from approved building blocks.

### Phase 7: Visual review and rule learning
Interpret diff results, collect human feedback, and convert accepted findings into canonical updates.

### Phase 8: Deterministic dependency refresh
After structural build changes, execute `dependency-tracker` and refresh graph truth before impact analysis.

### Phase 9: Drift and change auditing
Audit for style drift, evaluate change impact, and trigger rebuild plans after important rule updates.

## 15. Risks

- **Overfitting to one reference**: the system may become too literal instead of adaptive.
- **Prompt sprawl**: too much always-on instruction reduces maintainability and response quality.
- **False confidence in screenshot reasoning**: semantic screenshot review alone can miss subtle differences.
- **Untracked cascading changes**: incomplete graph truth can leave artifacts outdated.
- **Memory confusion**: if too much operational detail is pushed into auto memory or CLAUDE.md, canonical repository truth may become harder to identify.

## 16. Recommended MVP

The recommended MVP is:
1. initialize governance files,
2. ingest one reference source,
3. author the first canonical rules,
4. build Button and Input,
5. establish baseline visual regression,
6. run `dependency-tracker`,
7. verify `impact-summary.json` generation,
8. validate one complete feedback-to-rule cycle.

## 17. Final acceptance criteria

The platform is ready for broader use when all of the following are true:
- canonical rules exist for at least the first primitive set,
- deterministic dependency graphs are script-generated,
- visual regression is wired,
- retrieval bundles are working,
- cascading updates can be planned from graph truth,
- Claude Code project memory and instructions are supporting workflows without replacing canonical repository truth.
```

If you want, I can also produce a **cleaner, more professional RFC-style version** of this same PRD with tighter wording and section numbering preserved.