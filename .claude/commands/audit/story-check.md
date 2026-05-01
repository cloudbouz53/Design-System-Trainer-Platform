---
name: "Audit: Story Check"
description: Verify Storybook story coverage against all canonical states declared for a component
category: Audit
tags: [audit, storybook, states, coverage]
---

You are acting as the **style-drift-auditor** subagent. You read and report — you do not modify component files or canonical files.

**Input**: `$ARGUMENTS` — a component name (e.g., `button`, `input`). If `all`, check every component that has a canonical state file. If empty, check all.

## Goal

For each component, compare the states declared in `design-system/canonical/states/<component>.md` against the Storybook stories in `ui-lab/primitives/<component>/<Component>.stories.tsx` and identify any gaps.

## Steps

1. **Determine scope**

   If `$ARGUMENTS` is a specific component name, check that component only.
   If `$ARGUMENTS` is `all` or empty, list all files in `design-system/canonical/states/` and check each.

2. **For each component in scope**

   a. **Read the canonical states file**

   Read `design-system/canonical/states/<component>.md`. Extract every named state (e.g., default, hover, focus, active, disabled, loading, error, success, read-only, invalid, and any component-specific extras).

   b. **Read the Storybook story file**

   Read `ui-lab/primitives/<component>/<Component>.stories.tsx`.

   If the file doesn't exist, mark the component as: "MISSING — No Storybook story file found."

   c. **Match states to stories**

   For each canonical state, search the story file for a story that exercises it. A story "exercises" a state if:
   - The story name includes the state name (case-insensitive), OR
   - The story's args/props trigger the state (e.g., `disabled: true`, `isLoading: true`, `variant: "error"`), OR
   - The story has a `play()` function that triggers the state via interaction

   d. **Identify gaps**

   List states that have no matching story. List stories that appear to test states not declared in the canonical states file (bonus coverage or undeclared state).

3. **Check interaction testing**

   For states that require user interaction (hover, focus, active), check whether the story uses a `play()` function with `@storybook/test` interactions. If a state is interactive but the story doesn't exercise it via `play()`, flag it as "visually present but not interaction-tested."

4. **Check Storybook meta**

   Verify the stories file has a proper default export with `title`, `component`, and `tags: ['autodocs']`. Flag if missing.

5. **Write report**

   For each component, produce a section in the output:

   ```
   ## <Component> — State Coverage

   | State | Story | Interaction Tested |
   |---|---|---|
   | default | Default ✓ | n/a |
   | hover | — MISSING — | — |
   | focus | Focus ✓ | play() ✓ |
   | disabled | Disabled ✓ | n/a |
   | loading | Loading ✓ | n/a |

   Coverage: 4/5 states (80%)
   Missing states: hover
   Undeclared stories: none
   ```

6. **Offer to submit feedback**

   If any component has missing stories, ask: "Would you like me to submit a feedback item for the missing states?"

   If yes, create one feedback file per component in `design-system/feedback/pending/` using the format from `.claude/rules/review-files.md` with `type: text`.

## Constraints

- Read-only (except optionally writing feedback to `pending/`)
- Do not modify story files or canonical state files
- Do not create feedback items without user confirmation
