# geist-foundations

## Purpose

Guide `geist-researcher` through systematic inspection of Geist's foundational design tokens: color palettes, typography scale, spacing scale, border radius, shadow definitions, and motion/transition values. Outputs land exclusively under `design-system/source/geist/`.

## Inputs

- Access to Geist reference (Vercel public docs, GitHub source, or screenshots under `design-system/references/`)
- Target category: `color` | `typography` | `spacing` | `radius` | `shadow` | `motion` | `all`

## Outputs

- Entries appended to `design-system/source/geist/raw-observations.md` (verbatim, cited)
- Entries appended to `design-system/source/geist/materials-notes.md` (structured summaries)
- Entries appended to `design-system/source/geist/inferred-rules.md` (candidate rules with citations)
- `source-index.md` updated with session coverage

## Procedure

### 1. Scope the session

Identify the specific token category you are studying. Update `source-index.md` at the start of the session to record the scope and date.

### 2. Record verbatim observations

For each value found in the Geist reference, record in `raw-observations.md`:

```markdown
## Session: <date> — <category>

- [source: <url or screenshot filename>] `--geist-<name>: <value>` — <context/usage note>
```

Do not paraphrase values. Record them verbatim.

### 3. Write structured notes

Distill observations into `materials-notes.md` sections:

```markdown
## Color

| Token Candidate | Observed Value | Usage Context |
|---|---|---|
| --color-background | #FFFFFF | Default page/panel background |
```

Sections: `## Color`, `## Typography`, `## Spacing`, `## Border Radius`, `## Shadow`, `## Motion`

### 4. Infer candidate rules

For each pattern that could become a canonical rule, write to `inferred-rules.md`:

```markdown
### <Candidate Rule Name>

Source: materials-notes.md §Color, row <n>
Observed: <what was seen>
Inferred Do: <positive prescription>
Inferred Do Not: <negative prescription>
Why: <rationale>
```

Every entry must cite its source. Uncited entries must not be written.

### 5. Close the session

Update `source-index.md` with what was covered. Do NOT promote anything to `design-system/canonical/` — that requires guardian approval.
