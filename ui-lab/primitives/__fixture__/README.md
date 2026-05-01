# Test Fixture

Files in this directory are used solely to verify `dependency-tracker` behavior. They are **excluded from canonical promotion** and must never appear in gate reviews, golden examples, or manifests.

The fixture exercises:
- Static token references (`var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`)
- Rule citations (`BTN-001`, `BTN-002`, `TOK-001`)
- One intentional unsupported construct (dynamic import) to verify the unsupported reporter

To re-run the verification: `bash .claude/skills/dependency-tracker/run.sh --changed-id BTN-001`
