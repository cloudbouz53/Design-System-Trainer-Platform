# Rule Validation Checks

Defines the constraints a deterministic checker enforces against the canonical rule corpus. Every rule file under `design-system/canonical/principles/` and `design-system/canonical/components/` must satisfy all checks.

## Required Fields

Every rule file MUST contain all thirteen fields in this order:

1. `Rule ID`
2. `Status`
3. `Version`
4. `Source`
5. `Scope`
6. `Priority`
7. `Do`
8. `Do Not`
9. `Why`
10. `Validation`
11. `Impact`
12. `Good Example`
13. `Bad Example`

**Check:** Read each file under `canonical/principles/` and `canonical/components/`. For each file, assert all thirteen bold/header fields are present and non-empty. Report any missing or empty field.

## Rule ID Format

Format must match: `^[A-Z]{1,5}-\d{3}$`

Valid examples: `BTN-001`, `TOK-014`, `A11Y-002`
Invalid examples: `btn-001`, `BTN-1`, `BUTTON-001`

**Check:** For every `Rule ID` field value, apply the regex. Report any non-matching ID.

## Valid Status Values

`Status` MUST be one of: `draft`, `active`, `deprecated`, `removed`

**Check:** For every `Status` field value, assert membership in the allowed set. Report any invalid value.

## No Duplicate IDs

No two rule files may share the same `Rule ID` value. Removed rules retain their IDs permanently to prevent reuse.

**Check:** Collect all `Rule ID` values across the corpus. Assert all values are unique. Report any duplicate.

## No Broken References

Rules that reference other rules (in `Impact` or cross-rule citations) must cite existing Rule IDs.

**Check:** Extract all `<DOMAIN>-\d{3}` patterns from `Impact` and `Why` fields. For each cited ID, assert it exists in `RULES.md`. Report any reference to a non-existent ID.

## RULES.md Consistency

Every rule file must have a corresponding row in `RULES.md`. Every row in `RULES.md` must have a corresponding file.

**Check:** Compare the set of Rule IDs found in files against the set in `RULES.md`. Report any discrepancy.

## Validation Script

The validator can be run as a Bash one-liner for quick checks (requires Node >= 18):

```bash
node -e "
const fs = require('fs');
const path = require('path');

const dirs = [
  'design-system/canonical/principles',
  'design-system/canonical/components'
];
const required = ['Rule ID', 'Status', 'Version', 'Source', 'Scope', 'Priority',
                  'Do', 'Do Not', 'Why', 'Validation', 'Impact', 'Good Example', 'Bad Example'];
const validStatuses = new Set(['draft', 'active', 'deprecated', 'removed']);
const idRe = /^[A-Z]{1,5}-\d{3}$/;

let errors = 0;
const ids = new Map();

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.md'))) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const file = path.join(dir, f);

    // Required fields
    for (const field of required) {
      if (!content.includes('**' + field + ':**') && !content.includes('## ' + field)) {
        console.error('FAIL missing field [' + field + '] in ' + file);
        errors++;
      }
    }

    // Rule ID format
    const idMatch = content.match(/\*\*Rule ID:\*\*\s*([^\n]+)/);
    if (idMatch) {
      const id = idMatch[1].trim();
      if (!idRe.test(id)) { console.error('FAIL invalid ID format [' + id + '] in ' + file); errors++; }
      if (ids.has(id)) { console.error('FAIL duplicate ID [' + id + '] in ' + file + ' and ' + ids.get(id)); errors++; }
      ids.set(id, file);
    }

    // Status
    const statusMatch = content.match(/\*\*Status:\*\*\s*([^\n]+)/);
    if (statusMatch && !validStatuses.has(statusMatch[1].trim())) {
      console.error('FAIL invalid status [' + statusMatch[1].trim() + '] in ' + file);
      errors++;
    }
  }
}

if (errors === 0) console.log('validation: OK — 0 issues');
else process.exit(1);
"
```

A zero-exit run is required before any artifact can pass the Token, State, or Accessibility gates.

## Malformed Rule Test

To verify the validator catches errors, create a temporary file missing a field, run the validator, and confirm it reports the violation before deleting the test file.
