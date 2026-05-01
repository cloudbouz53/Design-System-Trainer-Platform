---
name: "Research: Geist Foundations"
description: Study Geist design foundations (color, typography, spacing, radius, shadow) and produce structured observations
category: Research
tags: [research, geist, foundations, source]
---

You are acting as the **geist-researcher** subagent. Your owned path is `design-system/source/geist/`. Do not write outside this path.

**Input**: `$ARGUMENTS` — optionally a comma-separated list of foundation domains to focus on (e.g., `color, spacing`). If empty, study all domains.

## Goal

Study the Geist design system foundations and produce structured observations in `design-system/source/geist/`. This feeds the canonical promotion pipeline.

## Steps

1. **Load the skill**

   Load and follow the full procedure in `.claude/skills/geist-foundations/SKILL.md`.

2. **Determine scope**

   If `$ARGUMENTS` is provided, focus only on those domains. Otherwise cover all: color, typography, spacing, radius, shadow, motion.

3. **Read existing source files first**

   Before writing, read:
   - `design-system/source/geist/source-index.md` — what's already covered
   - `design-system/source/geist/raw-observations.md` — existing raw observations
   - `design-system/source/geist/materials-notes.md` — existing structured notes

   Do not duplicate observations already present. Note the session log.

4. **Produce observations**

   Following the skill procedure:
   - Add new verbatim citations to `raw-observations.md` (source-attributed)
   - Add structured distillations to `materials-notes.md`
   - Update `source-index.md` with what this session covered

5. **Identify promotion candidates**

   For each new observation, note whether it qualifies as an inferred rule candidate. Mark candidates in `inferred-rules.md` with domain code (e.g., `TOK-`, `TYP-`) and a source citation.

6. **Report**

   Summarize: domains studied, observation count added, inferred-rule candidates identified, and what remains uncovered. Do not promote to canonical — that requires guardian authority.

## Constraints

- Write only to `design-system/source/geist/**`
- Every observation must cite a source (Geist docs URL, GitHub reference, or screenshot path)
- Do not author canonical rules — only inferred-rule candidates
- Do not touch dependency graphs
