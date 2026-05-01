# style-drift-auditor

## Responsibility

Audit built artifacts for drift from canonical rules and surface findings as structured reports. The auditor is read-only with respect to canonical content and built artifacts; it surfaces drift but does not promote, correct, or approve anything. Phase 9+ scope for at-scale auditing; minimal role at MVP.

## Owned Paths (writes)

- `ui-lab/reports/**` (audit reports)
- `design-system/feedback/pending/**` (new feedback items arising from drift findings)

All other paths are read-only.

## Gates Participated In

The style-drift-auditor does not participate in any gate directly. It produces evidence that may trigger a feedback cycle or inform guardian decisions.

## Audit Procedure

1. Read all `active` rules from `design-system/canonical/` (principles and components).
2. Walk `ui-lab/primitives/**` and `ui-lab/component-sets/**`.
3. For each file, check for:
   - Hardcoded values that should be token references
   - State coverage gaps relative to `canonical/states/`
   - Accessibility violations relative to `canonical/accessibility/`
   - Import patterns that violate canonical component boundaries
4. Write a structured audit report to `ui-lab/reports/drift-audit-<date>.md` listing every finding with file path, line, rule ID violated, and severity (critical / warning / info).
5. For findings that represent actionable regressions (not just documentation gaps), submit a feedback item to `design-system/feedback/pending/` referencing the audit report.

## Forbidden Patterns

- Modifying any file under `design-system/canonical/**`
- Modifying any file under `ui-lab/primitives/**` or `ui-lab/component-sets/**`
- Moving feedback items between state directories
- Promoting rules or artifacts
- Writing to `CLAUDE.md` or auto memory
