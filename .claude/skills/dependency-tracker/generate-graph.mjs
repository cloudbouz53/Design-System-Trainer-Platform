#!/usr/bin/env node
/**
 * Dependency graph generator.
 * Sole writer of the four authoritative JSON files under
 * design-system/canonical/dependency-graph/.
 *
 * LLMs must never edit the output files directly.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../../..');

const GRAPH_DIR = join(PROJECT_ROOT, 'design-system/canonical/dependency-graph');
const UILAB_DIR = join(PROJECT_ROOT, 'ui-lab');
const CANONICAL_DIR = join(PROJECT_ROOT, 'design-system/canonical');

const changedId = (() => {
  const idx = process.argv.indexOf('--changed-id');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ── Utility ────────────────────────────────────────────────────────────────

function walkFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.md']) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      results.push(...walkFiles(full, exts));
    } else if (exts.includes(extname(name))) {
      results.push(full);
    }
  }
  return results;
}

function rel(absPath) {
  return relative(PROJECT_ROOT, absPath).replace(/\\/g, '/');
}

function readSafe(path) {
  try { return readFileSync(path, 'utf8'); } catch { return ''; }
}

function writeAtomic(path, data) {
  const tmp = path + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  renameSync(tmp, path);
}

function cleanupStaleTmps(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (name.endsWith('.tmp')) unlinkSync(join(dir, name));
  }
}

// ── Patterns ──────────────────────────────────────────────────────────────

const IMPORT_STATIC_RE = /^(?:import|export)\s+.*?from\s+['"]([^'"]+)['"]/gm;
const IMPORT_REQUIRE_RE = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/gm;
const IMPORT_DYNAMIC_RE = /import\s*\(\s*(`[^`]*`|[^'"][^)]*[^'"])\s*\)/g;

const TOKEN_CSS_RE = /var\(--([a-z][a-z0-9-]*)\)/g;
const TOKEN_CSS_DECL_RE = /^\s+(--[a-z][a-z0-9-]*)\s*:/gm;  // property decl inside rule block
const TOKEN_JS_RE = /['"`]--([a-z][a-z0-9-]*)['"`]/g;
const TOKEN_COMPUTED_RE = /`--\$\{/g;

const RULE_CITE_RE = /\b([A-Z]{1,5}-\d{3})\b/g;

// ── Main ──────────────────────────────────────────────────────────────────

const componentImportGraph = {}; // file → [imported files]
const tokenUsageGraph = {};      // file → [token names]
const canonicalSpecGraph = {};   // file → [rule IDs]
const unsupported = [];

function processFile(absPath) {
  const key = rel(absPath);
  const content = readSafe(absPath);
  const ext = extname(absPath);

  componentImportGraph[key] = componentImportGraph[key] || [];
  tokenUsageGraph[key] = tokenUsageGraph[key] || [];
  canonicalSpecGraph[key] = canonicalSpecGraph[key] || [];

  // ── Static imports ──────────────────────────────────────────────────────
  for (const re of [IMPORT_STATIC_RE, IMPORT_REQUIRE_RE]) {
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(content)) !== null) {
      const spec = m[1];
      if (!spec.startsWith('.') && !spec.startsWith('/')) continue; // skip node_modules
      if (spec.includes('${')) {
        unsupported.push({ file: key, line: lineOf(content, m.index), reason: 'dynamic specifier in import' });
        continue;
      }
      componentImportGraph[key].push(spec);
    }
  }

  // ── Dynamic imports (unsupported) ───────────────────────────────────────
  {
    let m;
    IMPORT_DYNAMIC_RE.lastIndex = 0;
    while ((m = IMPORT_DYNAMIC_RE.exec(content)) !== null) {
      unsupported.push({ file: key, line: lineOf(content, m.index), reason: 'dynamic import with computed specifier' });
    }
  }

  // ── Token usage ─────────────────────────────────────────────────────────
  if (['.css', '.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    for (const re of [TOKEN_CSS_RE, TOKEN_JS_RE]) {
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(content)) !== null) {
        const token = '--' + m[1];
        if (!tokenUsageGraph[key].includes(token)) {
          tokenUsageGraph[key].push(token);
        }
      }
    }
    // CSS declaration (defining tokens, not just using them)
    {
      let m;
      TOKEN_CSS_DECL_RE.lastIndex = 0;
      while ((m = TOKEN_CSS_DECL_RE.exec(content)) !== null) {
        const token = m[1]; // already includes the -- prefix
        if (!tokenUsageGraph[key].includes(token)) {
          tokenUsageGraph[key].push(token);
        }
      }
    }
    // Computed token names (unsupported)
    {
      let m;
      TOKEN_COMPUTED_RE.lastIndex = 0;
      while ((m = TOKEN_COMPUTED_RE.exec(content)) !== null) {
        unsupported.push({ file: key, line: lineOf(content, m.index), reason: 'computed token name via template literal' });
      }
    }
  }

  // ── Canonical rule citations ─────────────────────────────────────────────
  {
    let m;
    RULE_CITE_RE.lastIndex = 0;
    while ((m = RULE_CITE_RE.exec(content)) !== null) {
      const ruleId = m[1];
      if (!canonicalSpecGraph[key].includes(ruleId)) {
        canonicalSpecGraph[key].push(ruleId);
      }
    }
  }
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

// ── Scan ──────────────────────────────────────────────────────────────────

const uiLabFiles = walkFiles(UILAB_DIR);
const canonicalFiles = walkFiles(CANONICAL_DIR);

for (const f of [...uiLabFiles, ...canonicalFiles]) {
  processFile(f);
}

// ── Deduplicate ───────────────────────────────────────────────────────────

for (const key of Object.keys(componentImportGraph)) {
  componentImportGraph[key] = [...new Set(componentImportGraph[key])];
  tokenUsageGraph[key] = [...new Set(tokenUsageGraph[key])];
  canonicalSpecGraph[key] = [...new Set(canonicalSpecGraph[key])];
}

// ── Impact summary ────────────────────────────────────────────────────────

function buildImpactSummary(targetId) {
  const tokenConsumers = {};
  const ruleConsumers = {};

  for (const [file, tokens] of Object.entries(tokenUsageGraph)) {
    for (const token of tokens) {
      if (!tokenConsumers[token]) tokenConsumers[token] = [];
      tokenConsumers[token].push(file);
    }
  }
  for (const [file, rules] of Object.entries(canonicalSpecGraph)) {
    for (const rule of rules) {
      if (!ruleConsumers[rule]) ruleConsumers[rule] = [];
      ruleConsumers[rule].push(file);
    }
  }

  if (targetId) {
    return {
      changedId: targetId,
      generatedAt: new Date().toISOString(),
      tokenConsumers: targetId.startsWith('--') ? { [targetId]: tokenConsumers[targetId] || [] } : {},
      ruleConsumers: !targetId.startsWith('--') ? { [targetId]: ruleConsumers[targetId] || [] } : {},
    };
  }

  return {
    changedId: null,
    generatedAt: new Date().toISOString(),
    tokenConsumers,
    ruleConsumers,
  };
}

// ── Write outputs ──────────────────────────────────────────────────────────

if (!existsSync(GRAPH_DIR)) mkdirSync(GRAPH_DIR, { recursive: true });
cleanupStaleTmps(GRAPH_DIR);

writeAtomic(join(GRAPH_DIR, 'component-import-graph.json'), componentImportGraph);
writeAtomic(join(GRAPH_DIR, 'token-usage-graph.json'), tokenUsageGraph);
writeAtomic(join(GRAPH_DIR, 'canonical-spec-graph.json'), canonicalSpecGraph);
writeAtomic(join(GRAPH_DIR, 'impact-summary.json'), buildImpactSummary(changedId));
writeFileSync(join(GRAPH_DIR, '.last-run'), new Date().toISOString(), 'utf8');

// ── Summary ────────────────────────────────────────────────────────────────

const totalFiles = uiLabFiles.length + canonicalFiles.length;
const totalImportEdges = Object.values(componentImportGraph).reduce((s, a) => s + a.length, 0);
const totalTokenEdges = Object.values(tokenUsageGraph).reduce((s, a) => s + a.length, 0);
const totalRuleEdges = Object.values(canonicalSpecGraph).reduce((s, a) => s + a.length, 0);

console.log(`dependency-tracker: scanned ${totalFiles} files`);
console.log(`  import edges: ${totalImportEdges}`);
console.log(`  token edges:  ${totalTokenEdges}`);
console.log(`  rule edges:   ${totalRuleEdges}`);
if (unsupported.length > 0) {
  console.warn(`  unsupported constructs: ${unsupported.length} (see impact-summary.json for details)`);
  // Append unsupported list to impact-summary.json
  const summary = JSON.parse(readFileSync(join(GRAPH_DIR, 'impact-summary.json'), 'utf8'));
  summary.unsupported = unsupported;
  writeFileSync(join(GRAPH_DIR, 'impact-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
}
console.log(`  graphs written to ${rel(GRAPH_DIR)}/`);
