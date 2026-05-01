# geist-components

## Purpose

Guide `geist-researcher` through systematic inspection of specific Geist components: their visual anatomy, interaction states, accessibility patterns, token usage, and compositional rules. Outputs land exclusively under `design-system/source/geist/component-notes.md`.

## Inputs

- Access to Geist reference (Vercel public docs, GitHub source, or screenshots under `design-system/references/`)
- Target component(s): `button` | `input` | `<other>` | `all`
- Optionally: existing `materials-notes.md` (token vocabulary context)

## Outputs

- Entries appended to `design-system/source/geist/component-notes.md` (per-component structured notes)
- Entries appended to `design-system/source/geist/raw-observations.md` (verbatim citations)
- Candidate rule entries appended to `design-system/source/geist/inferred-rules.md`

## Procedure

### 1. Per-component structure

For each component being studied, record in `component-notes.md`:

```markdown
## <Component Name>

### Visual Anatomy
- <Part>: <description and token reference if observable>

### Interaction States
| State | Visual Change |
|---|---|
| default | <description> |
| hover | <description> |
| focus | <description> |
| active | <description> |
| disabled | <description> |
| loading | <description (if applicable)> |
| error | <description (if applicable)> |
| success | <description (if applicable)> |

### Accessibility Patterns
- Role: <observed ARIA role>
- Keyboard: <key interactions>
- Focus ring: <description>
- ARIA attributes: <list>

### Token Usage
| Property | Observed Token or Value |
|---|---|
| background | --geist-<token> |

### Compositional Rules
- <Observed compositional pattern, e.g., "icon is always trailing on loading state">

### Source Citations
- <url or screenshot filename>
```

### 2. Cross-reference with materials

Where component notes reference a token, confirm it appears in `materials-notes.md`. If it does not, record it as a new observation in `raw-observations.md`.

### 3. Infer component rules

Add entries to `inferred-rules.md` for component-specific patterns, following the same citation format. Domain codes: `BTN` for Button, `INP` for Input.

### 4. Constraints

- Record what was observed; do not synthesize universal patterns not seen in the source
- Flag ambiguous observations with `[AMBIGUOUS]` rather than guessing
- Do not promote to canonical
