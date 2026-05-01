# Feedback: Button loading spinner needs aria-label

**ID:** fb-2026-05-01-btn-spinner-aria-label
**Date:** 2026-05-01
**Submitted by:** visual-reviewer
**Artifact:** `ui-lab/primitives/button/Button.tsx`
**Related rule(s):** BTN-002, INP-002, A11Y

---

## Observation

The Button component renders a spinner element during the loading state:

```tsx
{loading && <span className="btn__spinner" aria-hidden="true" />}
```

The spinner is correctly hidden from screen readers via `aria-hidden="true"`, and the button itself carries `aria-busy="true"`. However, screen readers will announce the button as "busy" with no additional context about what is loading. Best practice per WCAG 2.1 SC 4.1.3 (Status Messages) and ARIA patterns is to pair `aria-busy` on the container with a visually hidden status message that communicates the loading context (e.g., "Loading…") so that assistive technologies can provide richer feedback.

## Expected behavior

When `loading=true`:
- The button should include a visually hidden text node (e.g., `<span className="sr-only">Loading…</span>`) inside the button alongside the spinner.
- Screen readers should announce something like "Submit, Loading…" rather than just "busy".

## Impact

- Affects all three Button variants (`primary`, `secondary`, `ghost`) in loading state.
- No visual change; purely an assistive technology improvement.
- Non-breaking: adding a visually hidden child does not change any existing prop API.

## Suggested rule change

Add a new rule **BTN-004** (or amend BTN-002) requiring that loading buttons include a visually hidden "Loading…" label node alongside the spinner.

## References

- WCAG 2.1 SC 4.1.3 Status Messages
- ARIA Authoring Practices Guide — Button pattern
- Geist component-notes: `design-system/source/geist/component-notes.md`

---

## Guardian Review

**Reviewer:** design-system-guardian
**Review date:** 2026-05-01
**Decision:** ACCEPTED

**Rationale:**

The observation is correct. The current `aria-busy="true"` attribute communicates loading state to assistive technologies at the container level, but WCAG 2.1 SC 4.1.3 requires that status messages (including dynamic loading states) be programmatically determinable. A visually hidden "Loading…" node inside the button satisfies this requirement reliably across screen reader + browser combinations, particularly in cases where `aria-busy` support is inconsistent (notably older NVDA + Firefox pairings).

This is classified as a **new rule (BTN-004)**: the existing BTN-002 covers `aria-busy` and `aria-disabled` as button-level ARIA attributes; the visually hidden loading label is a distinct implementation requirement that warrants its own rule.

**Classification:** New rule — BTN-004
**Breaking:** No — additive change only
**Next action:** `feedback-librarian` to draft BTN-004 and update RULES.md, changelog.md
