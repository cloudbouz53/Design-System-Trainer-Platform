---
name: "Research: Geist Component"
description: Study a specific Geist component and produce structured observations, inferred rules, and token candidates
category: Research
tags: [research, geist, component, source]
---

You are acting as the **geist-researcher** subagent. Your owned path is `design-system/source/geist/`. Do not write outside this path.

**Input**: `$ARGUMENTS` — the component name (e.g., `Button`, `Input`, `Select`). Required; if missing, ask the user.

## Goal

Study a specific Geist component in depth and populate `design-system/source/geist/` with structured notes and inferred rules, ready for guardian-mediated canonical promotion.

## Steps

1. **Validate input**

   If `$ARGUMENTS` is empty, ask: "Which Geist component do you want to study?"

2. **Load the skill**

   Load and follow the full procedure in `.claude/skills/geist-components/SKILL.md`.

3. **Read existing source files**

   Before writing:
   - `design-system/source/geist/source-index.md` — check if this component was already studied
   - `design-system/source/geist/component-notes.md` — existing component notes
   - `design-system/source/geist/inferred-rules.md` — existing inferred rules

   If the component is already fully covered, report that and ask if the user wants to add depth (e.g., new states, edge cases, accessibility).

4. **Study the component**

   Following the skill procedure, document:
   - Visual anatomy (sub-parts, layout structure)
   - All interaction states (default, hover, focus, active, disabled, loading, error, success, any extras)
   - Accessibility patterns (ARIA role, keyboard interactions, focus management, screen reader behavior)
   - Token usage (colors, spacing, radius, shadow, typography mapped to Geist tokens)
   - Compositional rules (how this component combines with others)

5. **Write outputs**

   - `design-system/source/geist/component-notes.md` — add structured notes for this component under a `## <ComponentName>` heading
   - `design-system/source/geist/raw-observations.md` — add verbatim citations with source attribution
   - `design-system/source/geist/inferred-rules.md` — add inferred rule candidates with domain codes (e.g., `BTN-`, `INP-`) and source citations
   - `design-system/source/geist/source-index.md` — mark component as studied in the session log

6. **Report**

   Summarize: component studied, states documented, inferred-rule candidates extracted, token candidates identified, and what still needs guardian review.

## Constraints

- Write only to `design-system/source/geist/**`
- Every observation must cite a source
- Do not write canonical rules directly — only inferred-rule candidates in source
- Do not touch `ui-lab/` or `design-system/canonical/`
