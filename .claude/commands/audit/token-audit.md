---
name: "Audit: Token Audit"
description: Scan a component or path for hardcoded values and report token compliance violations
category: Audit
tags: [audit, tokens, compliance, hardcoded]
---

You are acting as the **style-drift-auditor** subagent. You read and report — you do not modify component files or canonical files.

**Input**: `$ARGUMENTS` — a component name or path to audit (e.g., `button`, `ui-lab/primitives/`, `all`). Defaults to `ui-lab/primitives/` if empty.

## Goal

Scan source files under the target path for any CSS or style value that bypasses the canonical token system, and produce a clear violation report.

## Steps

1. **Determine scope**

   If `$ARGUMENTS` is `all` or empty, scan all of `ui-lab/primitives/` and `ui-lab/component-sets/`.
   Otherwise, normalize the argument to a path (e.g., `button` → `ui-lab/primitives/button/`).

2. **Load token inventory**

   Read `design-system/canonical/tokens/` (all token files) to build the complete list of valid CSS custom property names. Read `design-system/retrieval/indexes/tokens-index.json` for the canonical ID cross-reference.

3. **Scan for violations**

   For each `.css`, `.tsx`, `.ts`, and `.js` file in scope, check for:

   | Violation Type | Pattern | Example |
   |---|---|---|
   | Hardcoded hex | `#[0-9a-fA-F]{3,8}` | `color: #1a1a1a` |
   | RGB/RGBA literal | `rgb\(` or `rgba\(` | `background: rgba(0,0,0,0.5)` |
   | HSL literal | `hsl\(` | `color: hsl(220, 90%, 56%)` |
   | Magic pixel value | bare `\d+px` not inside `var(--...)` | `padding: 8px` |
   | Magic rem/em | bare `\d+(\.\d+)?rem` not inside `var(--...)` | `font-size: 0.875rem` |
   | Hardcoded font-family | literal font name not in a token | `font-family: "Inter", sans-serif` |
   | Hardcoded font-weight | bare numeric weight | `font-weight: 600` |
   | Hardcoded border-radius | bare `\d+px` on a radius property | `border-radius: 6px` |
   | Named CSS color | `\b(red|blue|white|black|gray|...)\b` | `color: white` |

   For each violation, record: file path, line number, property name, the violating value.

4. **Cross-check against token list**

   For any `var(--...)` reference found, verify the token name exists in the canonical token inventory. Flag unknown tokens as: "Unknown token reference: `--foo-bar` (not in canonical token set)."

5. **Calculate compliance score**

   ```
   Compliance % = (style declarations using valid tokens) / (total style declarations) × 100
   ```

6. **Write to feedback if violations found**

   If any violations are found and the user hasn't specified "report only", ask: "Would you like me to submit these as feedback items to `design-system/feedback/pending/`?"

   If yes, create one feedback file per component with `type: text`, listing the violations. Use the format from `.claude/rules/review-files.md`.

7. **Report**

   Output a summary table:

   ```
   Token Audit Report — <path> — <date>

   | File | Violations | Type |
   |---|---|---|
   | button/Button.css | 3 | hex, magic-px |
   | button/Button.tsx | 1 | hardcoded-font |

   Compliance: 94% (47/50 declarations use canonical tokens)
   Unknown token references: 0

   Violations requiring attention: 4
   ```

## Constraints

- Read-only (except optionally writing feedback to `pending/`)
- Do not modify component files or canonical files
- Do not create feedback items without user confirmation
