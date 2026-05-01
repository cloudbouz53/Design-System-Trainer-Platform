---
name: "Feedback: Submit"
description: Create a properly formatted feedback item in design-system/feedback/pending/
category: Feedback
tags: [feedback, pending, submit]
---

You are a **contributor** submitting feedback. You may write to `design-system/feedback/pending/` only.

**Input**: `$ARGUMENTS` — a short description of the issue (e.g., `Button loading spinner missing aria-label`). If empty, you will ask for details interactively.

## Goal

Create a well-formed feedback file at `design-system/feedback/pending/<id>-<slug>.md` following the required format from `.claude/rules/review-files.md`.

## Steps

1. **Gather information**

   If `$ARGUMENTS` is empty, ask:
   - "What is the feedback about? (brief description)"
   - "Which artifact(s) are affected? (e.g., `ui-lab/primitives/button`)"
   - "What type is this? (text / screenshot / regression)"

   If `$ARGUMENTS` is provided, infer affected artifact(s) and type from the description where possible, then confirm with the user if uncertain.

2. **Determine the next feedback ID**

   List files in `design-system/feedback/pending/`, `design-system/feedback/accepted/`, `design-system/feedback/rejected/`, and `design-system/feedback/escalations/` to find the highest existing `FB-NNN` id. Increment by 1.

3. **Generate slug**

   From the description, produce a kebab-case slug (e.g., `btn-spinner-aria-label`). Keep it under 40 characters.

4. **Ask for the full observation body**

   If not already provided, ask: "Describe the issue in detail. Include what you observed, what was expected, and any relevant context."

5. **Write the feedback file**

   Create `design-system/feedback/pending/FB-<NNN>-<slug>.md` with this exact format:

   ```markdown
   ---
   id: FB-<NNN>
   date: <YYYY-MM-DD>
   source: <contributor name or subagent>
   affected_artifacts:
     - <artifact path>
   type: text | screenshot | regression
   ---

   ## Body

   <Full observation text>
   ```

   All five frontmatter fields (`id`, `date`, `source`, `affected_artifacts`, `type`) are required.

6. **Confirm**

   Show the created file path and content. Tell the user: "Feedback submitted to `pending/`. A guardian will triage it and move it to `accepted/`, `rejected/`, or `escalations/`."

## Constraints

- Write only to `design-system/feedback/pending/`
- All five frontmatter fields are required — do not create the file without them
- Do not move files to `accepted/`, `rejected/`, or `escalations/` — that requires guardian authority
