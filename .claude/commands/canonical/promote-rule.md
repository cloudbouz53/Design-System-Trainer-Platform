---
name: "Canonical: Promote Rule"
description: Guardian-only — promote an inferred rule from source/geist to canonical and record it in the changelog
category: Canonical
tags: [canonical, guardian, rule, promotion]
---

You are acting as the **design-system-guardian** subagent. You own `design-system/canonical/**` and `design-system/retrieval/**`. Only you may write canonical rules.

**Input**: `$ARGUMENTS` — the inferred-rule candidate ID or description (e.g., `BTN-003`, `button loading state`). Required; if missing, ask the user.

## Goal

Promote an inferred rule from `design-system/source/geist/inferred-rules.md` to its canonical location, register it in the rule engine, and update all indexes.

## Steps

1. **Validate input**

   If `$ARGUMENTS` is empty, ask: "Which inferred rule do you want to promote? (provide the candidate ID or description)"

2. **Load the skill**

   Load `.claude/skills/canonical-rule-authoring/SKILL.md` and follow its full procedure for creating a canonical rule.

3. **Find the inferred rule**

   Read `design-system/source/geist/inferred-rules.md`. Locate the candidate matching `$ARGUMENTS`. If not found, check `component-notes.md` and `materials-notes.md`. If the rule doesn't exist as an observation, stop: "No inferred rule found for `$ARGUMENTS`. Run `/research/geist-component` first to generate source observations."

4. **Determine domain and next Rule ID**

   - Identify the domain (e.g., `BTN`, `INP`, `TOK`, `TYP`) from the inferred rule's domain code.
   - Read `design-system/canonical/rule-engine/RULES.md` to find the highest existing ID in that domain.
   - Assign the next sequential ID.

5. **Author the canonical rule**

   Following the skill's structured format, create the rule file at the appropriate path:
   - Component rules → `design-system/canonical/components/<DOMAIN-NNN>.md`
   - Token rules → `design-system/canonical/tokens/<category>.md` (append or create)
   - Principle rules → `design-system/canonical/principles/<DOMAIN-NNN>.md`

   The rule file must include all required fields from the canonical-rule-authoring skill: Rule ID, Status (`active`), Version, Source (cite the inferred rule), Scope, Priority, Do, Do Not, Why, Validation, Impact, and Good/Bad Examples.

6. **Update RULES.md index**

   Add the new rule to `design-system/canonical/rule-engine/RULES.md` with its ID, title, status, and file path.

7. **Record in changelog**

   Append an entry to `design-system/canonical/rule-engine/changelog.md`:

   ```markdown
   ## <DOMAIN-NNN> — <Rule Title>

   - **Date**: <YYYY-MM-DD>
   - **Action**: Promoted from inferred rule
   - **Source**: `design-system/source/geist/inferred-rules.md` — <candidate citation>
   - **Guardian**: design-system-guardian
   - **Status**: active
   ```

8. **Update retrieval indexes**

   - Add an entry to `design-system/retrieval/indexes/rules-index.json` for the new rule.
   - If the rule references tokens, cross-reference in `tokens-index.json`.

9. **Check if manifests need updating**

   Review manifests in `design-system/retrieval/manifests/` for any artifact the rule applies to. Add the new rule ID to their rule lists if appropriate.

10. **Run dependency tracker**

    ```bash
    .claude/skills/dependency-tracker/run.sh
    ```

11. **Report**

    Summarize: rule ID assigned, canonical file path, changelog entry, index updates made, manifests updated, and next steps (component rebuild if the rule changes an existing artifact's requirements).

## Constraints

- Source citation is mandatory — no rule may be promoted without an observation in `inferred-rules.md`
- All five required canonical rule fields (Do, Do Not, Why, Validation, Impact) must be present
- Changelog entry is required before the promotion is complete
- Do not modify `design-system/canonical/dependency-graph/**` — run the script instead
