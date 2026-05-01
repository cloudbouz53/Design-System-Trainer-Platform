#!/usr/bin/env bash
# Canonical entry point for the dependency tracker.
# Invoked by component-builder, change-impact-analyst, and any gate runner.
# LLMs must never edit the JSON outputs produced by this script.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "dependency-tracker: starting"
echo "  project root: $PROJECT_ROOT"

# Require Node >= 18 (ESM support)
NODE_VERSION=$(node --version 2>/dev/null | sed 's/v//' | cut -d. -f1 || echo "0")
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "ERROR: Node.js >= 18 required (found v${NODE_VERSION})" >&2
  exit 1
fi

# Run the graph generator
node "$SCRIPT_DIR/generate-graph.mjs" "$@"
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "ERROR: generate-graph.mjs exited with code $EXIT_CODE" >&2
  exit $EXIT_CODE
fi

echo "dependency-tracker: complete"
echo "  outputs written to $PROJECT_ROOT/design-system/canonical/dependency-graph/"
