# feedback-to-rules

## Purpose

Guide `feedback-librarian` through the conversion of an accepted feedback item into a canonical rule change (new rule, rule modification, or golden example). Includes the steps for version bumping, changelog entries, migration files, and triggering the downstream cascade.

## Inputs

- An accepted feedback file from `design-system/feedback/accepted/<id>.md`
- Current rule corpus: `design-system/canonical/rule-engine/RULES.md`
- Relevant canonical rule files: `design-system/canonical/principles/` and `design-system/canonical/components/`

## Outputs

- New or modified rule file under `design-system/canonical/principles/` or `design-system/canonical/components/`
- Updated `RULES.md` index
- New `changelog.md` entry
- New `migrations/` file (if the change is breaking)
- Trigger for `dependency-tracker/run.sh` and `change-impact-analyst`

## Step 1: Classify the feedback

Read the accepted feedback. Determine which of these applies:

| Classification | Criteria |
|---|---|
| **New rule** | No existing active rule covers the behavior described |
| **Rule modification** | An existing active rule needs to be refined or corrected |
| **Golden example** | The feedback describes a best-practice pattern, not a constraint |

## Step 2: Assign or locate a Rule ID

For a **new rule**:
- Read `RULES.md` to find the highest existing sequence number in the relevant domain
- Assign the next number: e.g., if `BTN-003` is the highest Button rule, the new rule is `BTN-004`
- Domain codes: `BTN` (Button), `INP` (Input), `TOK` (Token), `A11Y` (Accessibility), `SPC` (Spacing), `TYP` (Typography), `LYT` (Layout)

For a **rule modification**:
- Locate the existing rule file

## Step 3: Draft the rule content

Use the canonical rule template (see `canonical-rule-authoring` skill). For a modification, update only the relevant fields and bump the `Version`.

Status for new rules: `draft`. Only the guardian promotes to `active`.

## Step 4: Update RULES.md

Add a new row for a new rule, or update the existing row for a modification:

```markdown
| BTN-004 | draft | Button loading state must use spinner token | 1.0.0 |
```

## Step 5: Write changelog entry

Append to `design-system/canonical/rule-engine/changelog.md`:

```markdown
## YYYY-MM-DD — <Rule ID> <change type>

- **Change:** <Added / Modified / Deprecated>
- **Rule:** <Rule ID and name>
- **Source:** Accepted feedback `<feedback-id>`
- **Rationale:** <Why this change was accepted>
- **Breaking:** <Yes / No>
- **Migration file:** <path or N/A>
```

## Step 6: Write migration file (if breaking)

If the change renames a token, removes a prop, or changes a value in a way that breaks existing implementations:

Create `design-system/canonical/rule-engine/migrations/<rule-id>-v<from>-to-v<to>.md`:

```markdown
# Migration: <Rule ID> v<from> → v<to>

## Before
<Describe the old behavior / token name / value>

## After
<Describe the new behavior / token name / value>

## Affected Artifacts
<List known affected artifact types>

## Rebuild Steps
<Step-by-step instructions for updating affected artifacts>
```

## Step 7: Trigger cascade

After presenting the draft to the guardian and receiving `active` promotion:

1. Run `.claude/skills/dependency-tracker/run.sh`
2. Invoke `change-impact-analyst` with the modified rule ID to produce a rebuild plan
3. Attach the rebuild plan path to the feedback file's resolution metadata

## Forbidden

- Setting a new rule to `Status: active` without guardian approval
- Writing to `ui-lab/**`
- Skipping the migration file for a breaking change
- Skipping the dependency-tracker run after a rule becomes active
