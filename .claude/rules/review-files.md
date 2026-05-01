---
path_scope:
  - "design-system/feedback/**"
  - "design-system/golden-examples/**"
  - "ui-lab/reports/**"
---

# Review Files

## Ownership

| Path | Who may write |
|---|---|
| `design-system/feedback/pending/**` | Any contributor or `visual-reviewer` |
| `design-system/feedback/accepted/**` | `design-system-guardian` only |
| `design-system/feedback/rejected/**` | `design-system-guardian` only |
| `design-system/feedback/escalations/**` | `design-system-guardian` only |
| `design-system/golden-examples/**` | `design-system-guardian` only |
| `ui-lab/reports/**` | Gate runners (read-only for all reviewers) |

## Feedback File Format

A feedback file under `pending/` MUST contain all of these fields:

```markdown
---
id: FB-001
date: YYYY-MM-DD
source: <contributor name or subagent>
affected_artifacts:
  - ui-lab/primitives/button
type: text | screenshot | regression
---

## Body

<Observation, screenshot annotation, or regression note.>
```

Fields `id`, `date`, `source`, `affected_artifacts`, and `type` are required. Files missing any of these will be returned to the submitter.

## Feedback State Transitions

Only `design-system-guardian` may move a file from `pending/` to `accepted/`, `rejected/`, or `escalations/`. The guardian MUST add a `resolution-rationale` section when moving the file:

```markdown
## Resolution Rationale

<Why this was accepted/rejected/escalated, and what follow-up action is required.>
```

Direct writes to `accepted/`, `rejected/`, or `escalations/` by any other subagent are forbidden.

## Golden Example Requirements

A golden example saved to `design-system/golden-examples/single-components/<component>/v<version>/` MUST include:
- The implementation file(s) at the approved version
- The Storybook story at the approved version
- A `metadata.md` recording: artifact name, version, approval date, approving guardian, gate results summary

## Gate Report Format

A record in `ui-lab/reports/` MUST contain:
- Artifact name and version
- Date and time of the gate run
- For each gate that ran: name, result (pass/fail), and rationale or failure detail
- Reference to the dependency-tracker run timestamp (for the Dependency Truth Gate)

## Forbidden Patterns

- Moving feedback files without guardian authority
- Writing golden examples that have not passed all six gates
- Overwriting gate reports after the fact
- Leaving feedback in `pending/` without a resolution within the review cycle
