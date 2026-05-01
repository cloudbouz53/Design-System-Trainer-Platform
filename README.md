# Design System Trainer Platform

A governed system for studying a reference design system, extracting canonical rules, generating components and apps from those rules, and continuously improving the standard through an auditable feedback loop.

## What this platform does

The platform treats a reference design system (starting with [Geist](https://vercel.com/geist/introduction)) as a source of truth to learn from — not copy blindly. It produces:

1. **Canonical rules** — structured, versioned, validated standards extracted from the reference and approved by a guardian
2. **Retrieval bundles** — scoped context packages so builders load only what they need for a given task
3. **Built primitives** — components and apps in `ui-lab/` that must pass a six-gate approval pipeline before promotion
4. **Feedback cycles** — a governed loop from observation to rule change to cascading rebuild plan

## How it works

### Operating model

All work flows through a single pipeline. An LLM agent observes the reference, extracts findings, a guardian approves them, builders implement against the canonical standard, and a deterministic script keeps the dependency graph honest.

```
Reference system
      │
      ▼
geist-researcher  ──►  design-system/source/geist/
                               │
                               ▼
               design-system-guardian (approval)
                               │
                               ▼
                  design-system/canonical/
                  (rules, tokens, states, a11y)
                               │
                               ▼
              component-builder / project-builder
                               │
                               ▼
                          ui-lab/primitives/
                          ui-lab/react-apps/ ...
                               │
                               ▼
                  Six-gate pipeline (see below)
                               │
                               ▼
              design-system/golden-examples/
```

### Canonical truth principle

**The only source of truth is repository files.** Auto memory and `CLAUDE.md` are supporting context layers. When they conflict with `design-system/canonical/`, the repository files always win.

### Role separation

Nine specialized subagents own non-overlapping paths. No subagent writes outside its declared scope — cross-role writes require guardian-mediated handoff.

| Subagent | Owns / Responsibility |
|---|---|
| `design-system-guardian` | Gate approvals, rule promotions, feedback transitions |
| `geist-researcher` | `design-system/source/geist/` — raw observations and inferred rules |
| `component-builder` | `ui-lab/primitives/` — single primitive components |
| `component-set-builder` | `ui-lab/component-sets/` — multi-component compositions |
| `project-builder` | `ui-lab/{react-apps,nextjs-apps,html-apps}/` — full app builds |
| `visual-reviewer` | Reads diff artifacts; classifies causes; no writes to canonical |
| `feedback-librarian` | Converts accepted feedback into rule changes |
| `style-drift-auditor` | Reads and reports drift; no promotions |
| `change-impact-analyst` | Reads graph JSON; produces rebuild plans |

### The six-gate pipeline

Every artifact must clear all six gates in order before promotion to `golden-examples/`:

| Gate | Pass condition |
|---|---|
| **1. Token Gate** | All value-bearing properties use canonical tokens — no hardcoded hex, magic pixel values, or ad-hoc sizes |
| **2. State Gate** | Every interaction and status state declared in `canonical/states/` is exercised |
| **3. Accessibility Gate** | Semantic role, keyboard interaction, focus management, ARIA, and contrast expectations are all met |
| **4. Visual Regression Gate** | Chromatic or Playwright diff is within tolerance, or the diff traces to an approved canonical change |
| **5. Guardian Approval Gate** | `design-system-guardian` records explicit approval |
| **6. Dependency Truth Gate** | The most recent `dependency-tracker` run is newer than every relevant input file |

Any single gate failure blocks promotion regardless of all other gate status.

### Dependency tracking

Dependency graph JSON files under `design-system/canonical/dependency-graph/` are the sole source of cascade truth. **LLMs must never author or patch these files.** Only the dependency-tracker script may produce them:

```bash
bash .claude/skills/dependency-tracker/run.sh
```

The script produces four authoritative files:

| File | Content |
|---|---|
| `component-import-graph.json` | Component → imported components |
| `token-usage-graph.json` | Component → canonical tokens referenced |
| `canonical-spec-graph.json` | Component → canonical rule IDs cited |
| `impact-summary.json` | Token or rule ID → all downstream artifacts |

### Retrieval bundles

To avoid context bloat, builders never load the full canonical corpus. Instead, a manifest-based retrieval system scopes context to what a specific task needs:

1. A task requests a component, set, or screen.
2. The relevant manifest in `design-system/retrieval/manifests/` is located.
3. The bundle resolver loads only the rules, tokens, states, and patterns that apply.
4. The builder receives the focused bundle rather than everything.

### Feedback loop

The platform learns from corrections. Accepted observations become durable rules:

1. A contributor or `visual-reviewer` submits feedback to `design-system/feedback/pending/`.
2. `design-system-guardian` accepts, rejects, or escalates each item.
3. `feedback-librarian` converts accepted feedback into a canonical rule change.
4. `dependency-tracker` refreshes graph truth.
5. `change-impact-analyst` computes which artifacts are affected.
6. Builders update affected artifacts and re-run the gate pipeline.

## Repository layout

```
design-system/
  source/           # Raw observations from reference systems (not canonical)
    geist/          # Geist reference observations and inferred rules
  canonical/        # The authoritative standard
    principles/     # High-level design principles (TOK-xxx)
    tokens/         # Semantic tokens (colors, spacing, radius, typography)
    states/         # Per-component state declarations
    components/     # Per-component canonical rules (BTN-xxx, INP-xxx)
    accessibility/  # Per-component accessibility expectations
    rule-engine/    # RULES.md index, changelog, versioned snapshots, migrations
    dependency-graph/ # Script-generated dependency JSON (never hand-edited)
  retrieval/        # Manifests, bundle resolvers, lookup indexes
  feedback/         # pending / accepted / rejected / escalations
  golden-examples/  # Approved reference implementations
  references/       # External screenshots and reference materials

ui-lab/
  primitives/       # Single-component implementations (Button, Input, ...)
  component-sets/   # Multi-component compositions
  react-apps/       # React application builds
  nextjs-apps/      # Next.js application builds
  html-apps/        # Plain HTML application builds
  snapshots/        # Playwright visual snapshots
  reports/          # Gate run records

.claude/
  agents/           # Nine specialized subagent definitions
  skills/           # On-demand skill bundles (procedures + scripts)
    dependency-tracker/  # generate-graph.mjs + run.sh
    geist-foundations/   # Reference ingestion for design foundations
    geist-components/    # Reference ingestion for components
    canonical-rule-authoring/  # Rule format and lifecycle guidance
    feedback-to-rules/   # Converting accepted feedback into rules
    retrieval-bundles/   # Manifest format and bundle resolution
    visual-review-workflow/   # Visual regression baseline procedure
    app-assembly-react/  # React app assembly procedure
    app-assembly-nextjs/ # Next.js app assembly procedure
    app-assembly-html/   # HTML app assembly procedure
    component-set-assembly/  # Component set assembly procedure
  rules/            # Path-scoped governance rules
    general-governance.md  # Role-separation contract for the entire repo
    component-files.md     # Rules for ui-lab/primitives/ and component-sets/
    app-files.md           # Rules for ui-lab/{react,nextjs,html}-apps/
    token-files.md         # Rules for design-system/canonical/tokens/
    review-files.md        # Rules for feedback/, golden-examples/, reports/

```

## Getting started

**1. Read the governance files first.**

```
CLAUDE.md                              # Operating model and canonical-truth principle
.claude/rules/general-governance.md   # Role-separation contract
```

**2. Ingest a reference system.**

Invoke the `geist-foundations` or `geist-components` skill to capture structured observations into `design-system/source/geist/`.

**3. Promote findings to canonical.**

`design-system-guardian` reviews inferred rules and approves promotions to `design-system/canonical/`. Every promotion is recorded in `design-system/canonical/rule-engine/changelog.md`.

**4. Build a component.**

Confirm a manifest exists in `design-system/retrieval/manifests/`, then invoke the `component-builder` subagent. It resolves the relevant bundle and builds against canonical rules only.

**5. Run the gate pipeline.**

After a build, run the dependency tracker and verify each gate:

```bash
bash .claude/skills/dependency-tracker/run.sh
```

Gate reports are written to `ui-lab/reports/`.

**6. Run the feedback loop.**

Submit observations to `design-system/feedback/pending/`. The guardian triages them, the feedback-librarian converts accepted items to rules, and the change-impact-analyst computes which artifacts need rebuilding.

## Current state (MVP)

The `bootstrap-trainer-mvp` change established all layers at MVP depth:

- Governance scaffolding (agents, skills, rules)
- Geist reference ingested into `design-system/source/`
- Rule engine initialized with 9 canonical rules (TOK-001–003, BTN-001–004, INP-001–002)
- Dependency tracking operational
- Retrieval bundles for Button and Input
- Two built primitives: `Button` (v1.0.0) and `Input` (v1.0.0) in `ui-lab/primitives/`
- Golden examples saved for both primitives
- One complete feedback-to-rule cycle (BTN-004: loading state accessibility)

## Key rules (quick reference)

| Rule ID | Status | Description |
|---|---|---|
| TOK-001 | active | Use semantic color tokens only — no hardcoded hex |
| TOK-002 | active | Use spacing tokens on a 4px grid |
| TOK-003 | active | Use border-radius tokens |
| BTN-001 | active | Button focus ring must use canonical focus token |
| BTN-002 | active | Disabled state uses opacity, not color swap |
| BTN-003 | active | Use semantic `<button>` HTML element |
| BTN-004 | draft | Loading state must include a visually-hidden label |
| INP-001 | active | Input must have an accessible label |
| INP-002 | active | Input error message must use `aria-describedby` |

Full rule index: `design-system/canonical/rule-engine/RULES.md`
