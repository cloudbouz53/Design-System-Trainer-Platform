## Context

The Design System Trainer Platform is greenfield. The PRD describes an ambitious system spanning research, canonical authoring, generation, review, and cascading change management. Delivering it all at once is high-risk; delivering nothing leaves no validation that the architecture works.

This design covers the **MVP scope** from PRD §16: governance scaffolding, one ingested reference (Geist), the rule engine, the deterministic dependency tracker, retrieval bundles, visual regression baselines, two primitives (Button, Input), and one full feedback-to-rule cycle. Later phases (component sets, full app assembly, drift auditing at scale) reuse the same primitives without redesign.

Constraints from the PRD that bind this design:
- No Serena MCP and no external memory orchestration.
- Canonical truth lives in repo files; auto memory and `CLAUDE.md` are supporting layers, not authority.
- Dependency graph JSON files MUST be script-generated only.
- Visual regression is delegated to deterministic tooling; LLM review is semantic only.
- Subagent roles are non-overlapping by design.

Stakeholders: a single user (the platform author) acting as guardian; the runtime (Claude Code) executing subagents and skills.

## Goals / Non-Goals

**Goals:**
- Stand up every layer of the architecture (governance, canonical, retrieval, dependency, visual, feedback) at MVP depth so downstream phases never need to retrofit primitives.
- Make role boundaries enforceable through file-path conventions and subagent prompts, not just convention.
- Make the dependency graph the single arbiter of "what must rebuild" — no LLM judgment on cascade scope.
- Keep `CLAUDE.md` short; push procedural knowledge into Skills loaded on demand.
- Validate the full feedback → rule → cascading-rebuild loop end-to-end with at least one real cycle before declaring done.

**Non-Goals:**
- Implementing component sets, full apps, or drift auditing in this change (Phase 5+ in PRD).
- Building a UI for any of this; everything is repo-file-driven.
- Pixel-perfect screenshot reasoning; that is delegated to Chromatic / Playwright.
- Generalizing past Geist; one reference source is enough to validate the pipeline.
- Rich CI/CD; manual invocation of the dependency-tracker script and visual regression tooling is sufficient for MVP.

## Decisions

### D1. Canonical truth lives in `design-system/canonical/`, not memory
**Why:** The PRD is explicit that auto memory and `CLAUDE.md` are context layers, not enforcement. Storing rules in memory or in a single mega-`CLAUDE.md` would (a) bloat startup context, (b) break versioning, and (c) blur the line between Claude-written learnings and human-approved standards.
**Alternatives considered:**
- *All rules in `CLAUDE.md`*: simple but unbounded growth and no version history.
- *External memory service (e.g., Serena MCP)*: explicitly forbidden by the PRD and adds dependency risk.
**Implication:** Skills and agents must be written to read from `design-system/canonical/` for authority and only consult memory for ephemeral operational context.

### D2. Dependency graph JSON is write-only by a deterministic script
**Why:** LLMs are unreliable at maintaining graph consistency across many files. Cascading rebuild plans must be reproducible and auditable.
**Decision:** A single skill (`dependency-tracker`) owns `generate-graph.mjs`. All four graph JSONs (`component-import-graph.json`, `token-usage-graph.json`, `canonical-spec-graph.json`, `impact-summary.json`) are written exclusively by that script. `component-builder` and `change-impact-analyst` invoke the script via `run.sh`; they never touch the JSON.
**Alternatives considered:**
- *LLM-edited graphs with validation*: rejected — validation can't catch every drift, and the failure mode (silent staleness) is invisible.
- *Graph-as-code (e.g., TypeScript modules)*: more flexible, but JSON keeps the contract simple and tool-agnostic.
**Trade-off:** The script is the bottleneck; if it has a bug, every downstream impact analysis is wrong. Mitigation: keep parsing logic narrow (regex + import-aware AST) and easy to inspect.

### D3. Subagent role separation is enforced via path scoping in `.claude/rules/`
**Why:** Without enforcement, the LLM will drift toward "do it all in one agent." Path-scoped rules (e.g., `component-files.md` applies only to `ui-lab/primitives/**`) make role boundaries observable.
**Decision:** Each subagent gets a single, narrow purpose; `.claude/rules/*.md` files declare what each path is for and which agent owns writes. Cross-role writes require an explicit guardian-mediated handoff.
**Alternatives considered:**
- *One omni-agent with a large prompt*: simpler to launch but loses isolation, audit trail, and forked context benefits.

### D4. Retrieval bundles, not always-on context
**Why:** Loading every rule, token, and pattern into every builder session would exceed budget on real-world apps and dilute attention. Claude Code's own guidance is to keep always-on instructions concise.
**Decision:** Each component / set / screen gets a `*.manifest.md` declaring required rules, tokens, anti-patterns, and patterns. A bundle resolver (`component-context-builder.md`, `app-context-builder.md`) materializes only those files into the builder's context for that task. Indexes (`rules-index.json`, `tokens-index.json`, `dependencies-index.json`) make manifest resolution cheap.
**Alternatives considered:**
- *Vector retrieval / embeddings*: heavier, fuzzier, harder to audit. Manifests are explicit and reviewable.
- *Single global context*: simple, but doesn't scale past a handful of components.

### D5. Visual regression: Chromatic OR Playwright, not both at MVP
**Why:** Both tools serve different scopes (Storybook vs whole-page). Wiring both at MVP doubles cost without proving the pattern.
**Decision:** Pick one based on the first concrete artifact: Button + Input are component-level, so MVP wires **Chromatic with Storybook**. Playwright comparisons land when the first full screen does (Phase 6, out of scope here). The visual-regression spec is written tool-agnostically so adding Playwright later is additive, not breaking.
**Alternatives considered:**
- *Wire both upfront*: doubles setup and creates two sources of baseline truth before either is validated.
- *Defer entirely to Phase 7*: leaves the gate pipeline untestable.

### D6. Rule format is structured Markdown with a fixed header
**Why:** Rules need to be machine-checkable (validation), human-reviewable, and migration-aware. Pure prose loses structure; pure JSON loses readability.
**Decision:** Adopt the PRD §10 format verbatim (Rule ID, Status, Version, Source, Scope, Priority, Do, Do Not, Why, Validation, Impact, Good Example, Bad Example). A small linter in `validation-checks.md` enforces presence of required headers.
**Trade-off:** Extracting structured fields from Markdown is brittle; if rules grow past ~100, migrate the headers to YAML frontmatter. Not needed at MVP.

### D7. Memory policy: short operational notes only
**Why:** The PRD warns against "memory confusion" where canonical truth and ephemeral notes become indistinguishable.
**Decision:** Auto memory may store: last dependency-tracker run timestamp, recent rebuild scope, repeated review problems, in-flight investigation context. Auto memory must NEVER store rule content, token values, dependency edges, or anything that has a canonical home.

### D8. Feedback flows through a four-state lifecycle
**Why:** Without explicit states, accepted feedback drifts back into pending, and rejected feedback gets re-litigated.
**Decision:** `feedback/{pending, accepted, rejected, escalations}/` with a single guardian-mediated transition between them. `feedback-librarian` writes accepted feedback into a new or modified rule under `canonical/rule-engine/`, bumps version, updates `changelog.md`, and triggers `dependency-tracker` + `change-impact-analyst`.

## Risks / Trade-offs

- **[Subagent role drift]** The LLM may try to perform multiple roles in one execution to save tokens. → Mitigation: path-scoped rules declare ownership; the guardian rejects cross-role writes during gate review.
- **[Dependency tracker scope creep]** The script may grow to handle every edge case (deep TS generics, dynamic imports, computed token names) and become unmaintainable. → Mitigation: keep it regex-first with an explicit "unsupported" report; flagged unsupported cases block promotion rather than silently passing.
- **[Manifest staleness]** A rule rename or token rename leaves manifests pointing at non-existent files. → Mitigation: an indexer pass validates manifests after every canonical change; broken manifests fail the Token Gate.
- **[Visual regression false positives]** Anti-aliasing or font-rendering noise produces diffs the human reads as real. → Mitigation: configure tolerance per component class; require `visual-reviewer` semantic interpretation before guardian approval, not just diff existence.
- **[Memory creep into canonical territory]** Over time, auto memory accumulates rule-shaped content. → Mitigation: a quarterly review pass; the memory policy spec calls out forbidden content categories explicitly.
- **[Bootstrap "everything is a stub"]** Standing up nine agents and eleven skills risks shallow placeholders that don't actually run. → Mitigation: MVP acceptance requires Button + Input completing the *full* gate pipeline including a real feedback cycle — placeholders that can't do this are not done.
- **[Reference overfitting to Geist]** Inferred rules may encode Geist-specific quirks as universal. → Mitigation: every inferred rule's `Source` field cites the observation; the guardian must re-confirm generality before promotion to canonical. Drift auditing (Phase 9) catches what slips through.

## Migration Plan

This is greenfield, so there is no rollback target. Sequence:

1. Land the directory tree, `CLAUDE.md`, and `.claude/rules/` first — no behavior, just scaffolding.
2. Land each subagent and skill as a separate, reviewable unit; never bulk-commit the whole roster.
3. Land the dependency-tracker script before any builder uses it; verify its output on a hand-crafted fixture.
4. Ingest Geist into `source/`; nothing canonical yet.
5. Promote the first rules into `canonical/` through guardian approval.
6. Build Button, then Input, each through every gate.
7. Wire Chromatic and capture baselines.
8. Run one feedback cycle end-to-end (intentional defect → pending → accepted → rule update → cascading rebuild plan → re-baseline).
9. Mark MVP complete only when step 8 has succeeded; a half-completed pipeline is not done.

If a step blocks (e.g., Chromatic setup fails), pause downstream phases — do not stub past it, because that creates the exact "shallow placeholder" risk above.

## Open Questions

- **Q1.** Should `dependency-tracker` parse TypeScript with a real AST (e.g., `@typescript-eslint/parser`) or stay regex-based? Defer until the first false-negative is observed; regex is sufficient for Button + Input.
- **Q2.** What is the exact rule-ID scheme? Proposal: `<DOMAIN>-<NNN>` (e.g., `BTN-001`, `TOK-014`). Confirm during Phase 3.
- **Q3.** Where does the guardian's approval signal live? Proposal: a `Status: active` field flip plus a `changelog.md` entry, no separate approval file. Revisit if multi-reviewer flows are ever added.
- **Q4.** Is one ingested reference (Geist) enough to validate retrieval-bundle scaling? Likely yes for MVP; revisit when a second reference is added.
