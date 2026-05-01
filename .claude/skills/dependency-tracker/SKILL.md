# dependency-tracker

## Purpose

The only writer of the four authoritative dependency graph JSON files. Provides `generate-graph.mjs` (the parsing engine) and `run.sh` (the canonical entry point). LLMs must never author or patch these JSON files — only this script may produce them.

## Authoritative Outputs

All four files live under `design-system/canonical/dependency-graph/`:

| File | Content |
|---|---|
| `component-import-graph.json` | Component → imported components edges |
| `token-usage-graph.json` | Component → canonical tokens referenced |
| `canonical-spec-graph.json` | Component → canonical rule IDs cited |
| `impact-summary.json` | Token or rule ID → all downstream artifacts |

## Entry Point

```bash
bash .claude/skills/dependency-tracker/run.sh
```

Optional arguments:
```bash
bash .claude/skills/dependency-tracker/run.sh --changed-id TOK-001
```

When `--changed-id` is provided, `impact-summary.json` is computed for that specific ID. Without it, all four graphs are regenerated and `impact-summary.json` is computed for all changed items since the last run.

## Script Contract

### `generate-graph.mjs`

- Scans: `ui-lab/**` and `design-system/canonical/**`
- Parsing strategy: regex-first for common patterns; falls back to reporting unsupported constructs
- Writes all four JSON files atomically (temp file + rename)
- On completion: writes a run record to `design-system/canonical/dependency-graph/.last-run` containing the ISO timestamp

### `run.sh`

- Sets `NODE_OPTIONS` as needed
- Invokes `node .claude/skills/dependency-tracker/generate-graph.mjs "$@"`
- Exits non-zero if the script errors
- Prints a human-readable summary: files scanned, edges found, unsupported constructs count

## Unsupported Constructs

If the parser encounters a construct it cannot reliably parse (dynamic imports, computed token names, runtime concatenation), it writes an entry to the `unsupported` section of the run report rather than silently dropping the edge:

```json
{
  "unsupported": [
    {
      "file": "ui-lab/primitives/button/Button.tsx",
      "line": 42,
      "reason": "dynamic import with computed specifier"
    }
  ]
}
```

An artifact with unsupported entries in the most recent run report cannot pass the Dependency Truth Gate until the entry is resolved or explicitly waived by the guardian.

## Stale Graph Detection

The graph is stale if any file under `ui-lab/` or `design-system/canonical/` has an mtime newer than `design-system/canonical/dependency-graph/.last-run`. `change-impact-analyst` checks this before every analysis run.

## Forbidden

- Hand-editing any file under `design-system/canonical/dependency-graph/`
- Invoking `generate-graph.mjs` directly (always use `run.sh`)
- Skipping the tracker run after a component build or rule change
