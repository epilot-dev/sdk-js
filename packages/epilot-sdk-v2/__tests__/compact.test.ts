import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, it, expect } from 'vitest';

import { expand, type CompactDefinition } from '../src/compact';

const CLIENTS_DIR = resolve(__dirname, '../../../clients');
const DEFS_DIR = resolve(__dirname, '../src/definitions');

/**
 * Replicate the compactify logic to test the full roundtrip:
 * original JSON → compact → expand → should match original
 */
const LOC_TO_SHORT: Record<string, string> = { path: 'p', query: 'q', header: 'h', cookie: 'c' };

const compactifyParam = (p: Record<string, unknown>): unknown[] => {
  const loc = LOC_TO_SHORT[(p.in as string) || 'query'] || 'q';
  const cp: unknown[] = [p.name as string, loc];
  if (p.required) cp.push(true);
  if (p.style) {
    if (!p.required) cp.push(false);
    cp.push(p.style as string);
  }
  if (p.explode !== undefined) cp.push(p.explode as boolean);
  return cp;
};

const compactifyDefinition = (raw: Record<string, unknown>): CompactDefinition => {
  const server: string = (raw.servers as { url: string }[])?.[0]?.url || '';
  const paths = (raw.paths || {}) as Record<string, Record<string, unknown>>;

  const ops: unknown[] = [];
  const pathLevelParams: Record<string, unknown[][]> = {};

  for (const [path, methods] of Object.entries(paths)) {
    // Capture path-level parameters
    if (methods.parameters) {
      pathLevelParams[path] = (methods.parameters as Record<string, unknown>[]).map((p) => {
        if (p.$ref) return [(p.$ref as string).split('/').pop()!];
        return compactifyParam(p);
      });
    }

    for (const [method, rawOp] of Object.entries(methods)) {
      if (method === 'parameters') continue;
      const op = rawOp as Record<string, unknown>;
      if (typeof op !== 'object' || !op.operationId) continue;

      const params = (op.parameters || []) as Record<string, unknown>[];
      const compactParams = params.map((p) => {
        if (p.$ref) {
          return [(p.$ref as string).split('/').pop()!];
        }
        return compactifyParam(p);
      });

      const hasBody = op.requestBody ? 1 : 0;
      const entry: unknown[] = [op.operationId, method, path];
      if (compactParams.length > 0 || hasBody) entry.push(compactParams.length > 0 ? compactParams : undefined);
      if (hasBody) entry.push(1);
      ops.push(entry);
    }
  }

  const openapiVersion = (raw.openapi as string) || '3.0.2';
  const result: CompactDefinition = { s: server, o: ops as CompactDefinition['o'] };
  if (openapiVersion !== '3.0.2') result.v = openapiVersion;

  const componentParams = (raw.components as Record<string, unknown>)?.parameters as
    | Record<string, Record<string, unknown>>
    | undefined;
  if (componentParams && Object.keys(componentParams).length > 0) {
    result.cp = {};
    for (const [refName, p] of Object.entries(componentParams)) {
      result.cp[refName] = compactifyParam(p) as CompactDefinition['cp'] extends Record<string, infer V> ? V : never;
    }
  }

  if (Object.keys(pathLevelParams).length > 0) {
    result.pp = pathLevelParams as CompactDefinition['pp'];
  }

  return result;
};

/**
 * Normalize an expanded definition to match the original format.
 * The original JSONs have some quirks we need to account for:
 * - Some params have `required: false` (which we omit in compact)
 * - Some params have `deprecated: true` (which we omit in compact — not used by openapi-client-axios)
 * - `openapi` version might differ (3.0.2 vs 3.0.3)
 * - `components.responses` exist in some originals but not needed at runtime
 */
const normalizeForComparison = (doc: Record<string, unknown>): Record<string, unknown> => {
  const clone = JSON.parse(JSON.stringify(doc));

  // Keep openapi version for comparison (expand now preserves it)

  // Remove info — expand uses empty stubs
  delete clone.info;

  // Remove component responses and requestBodies (not needed at runtime)
  if (clone.components?.responses) {
    delete clone.components.responses;
  }
  if (clone.components?.requestBodies) {
    delete clone.components.requestBodies;
  }

  // Remove empty components
  if (clone.components && Object.keys(clone.components).length === 0) {
    delete clone.components;
  }

  // Normalize paths
  const paths = clone.paths || {};
  for (const methods of Object.values(paths) as Record<string, unknown>[]) {
    // Normalize path-level parameters
    if (methods.parameters) {
      for (const p of methods.parameters as Record<string, unknown>[]) {
        if (p.$ref) continue;
        if (p.required === false) delete p.required;
        delete p.deprecated;
        delete p.description;
      }
    }

    for (const [method, rawOp] of Object.entries(methods)) {
      if (method === 'parameters') continue;
      const op = rawOp as Record<string, unknown>;
      if (typeof op !== 'object') continue;

      // Strip fields not preserved in compact format
      delete op.deprecated;

      // Normalize responses — expand always adds `responses: {}`
      // but some originals omit it entirely
      if (!op.responses) {
        op.responses = {};
      }

      // Remove empty parameter arrays
      const params = (op.parameters || []) as Record<string, unknown>[];
      if (params.length === 0) delete op.parameters;
      for (const p of params) {
        if (p.$ref) continue; // refs stay as-is
        // Remove `required: false` (we don't encode it)
        if (p.required === false) delete p.required;
        // Remove fields not preserved in compact format
        delete p.deprecated;
        delete p.description;
      }

      // Normalize requestBody — compact only records presence, not `required` on body
      if (op.requestBody) {
        op.requestBody = { content: { 'application/json': {} } };
      }
    }
  }

  // Normalize component parameters
  if (clone.components?.parameters) {
    for (const p of Object.values(clone.components.parameters) as Record<string, unknown>[]) {
      if (p.required === false) delete p.required;
      delete p.deprecated;
      delete p.description;
    }
  }

  return clone;
};

// Discover all client definitions
const discoverDefinitions = (): { name: string; path: string }[] => {
  const dirs = readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith('-client'))
    .map((d) => d.name);

  return dirs
    .map((dirName) => {
      const runtimePath = resolve(CLIENTS_DIR, dirName, 'src/openapi-runtime.json');
      if (!existsSync(runtimePath)) return null;
      return { name: dirName.replace(/-client$/, ''), path: runtimePath };
    })
    .filter(Boolean) as { name: string; path: string }[];
};

describe('compact OpenAPI definitions', () => {
  const definitions = discoverDefinitions();

  it('should discover definitions', () => {
    expect(definitions.length).toBeGreaterThan(0);
  });

  describe('roundtrip: compact → expand matches original', () => {
    for (const def of definitions) {
      it(`${def.name}: expanded compact matches original`, () => {
        const original = JSON.parse(readFileSync(def.path, 'utf-8'));
        const compact = compactifyDefinition(original);
        const expanded = expand(compact);

        const normalizedOriginal = normalizeForComparison(original);
        const normalizedExpanded = normalizeForComparison(expanded);

        // Compare openapi version
        expect(normalizedExpanded.openapi).toEqual(normalizedOriginal.openapi);

        // Compare paths — this is the critical part
        expect(normalizedExpanded.paths).toEqual(normalizedOriginal.paths);

        // Compare servers
        expect(normalizedExpanded.servers).toEqual(normalizedOriginal.servers);

        // Compare component parameters (if any)
        if (normalizedOriginal.components) {
          expect(normalizedExpanded.components).toEqual(normalizedOriginal.components);
        }
      });
    }
  });

  describe('expand produces valid OpenAPI structure', () => {
    for (const def of definitions) {
      it(`${def.name}: has correct structure`, () => {
        const original = JSON.parse(readFileSync(def.path, 'utf-8'));
        const compact = compactifyDefinition(original);
        const expanded = expand(compact) as Record<string, unknown>;

        expect(expanded.openapi).toMatch(/^3\.\d+\.\d+$/);
        expect(expanded.info).toEqual({ title: '', version: '' });
        expect(expanded.paths).toBeDefined();
        expect(expanded.servers).toBeDefined();
        const servers = expanded.servers as unknown[];
        if (servers.length > 0) {
          expect(servers[0]).toHaveProperty('url');
        }
      });
    }
  });

  describe('operation preservation', () => {
    for (const def of definitions) {
      it(`${def.name}: preserves all operationIds`, () => {
        const original = JSON.parse(readFileSync(def.path, 'utf-8'));
        const compact = compactifyDefinition(original);
        const expanded = expand(compact) as { paths: Record<string, Record<string, { operationId: string }>> };

        // Collect all operationIds from original
        const originalOps = new Set<string>();
        for (const methods of Object.values(original.paths || {})) {
          for (const [method, op] of Object.entries(methods as Record<string, unknown>)) {
            if (method === 'parameters') continue;
            const opObj = op as Record<string, unknown>;
            if (opObj.operationId) originalOps.add(opObj.operationId as string);
          }
        }

        // Collect from expanded
        const expandedOps = new Set<string>();
        for (const methods of Object.values(expanded.paths)) {
          for (const [method, op] of Object.entries(methods)) {
            if (method === 'parameters') continue;
            if (op.operationId) expandedOps.add(op.operationId);
          }
        }

        expect(expandedOps).toEqual(originalOps);
      });
    }
  });

  describe('generated compact definition files match', () => {
    for (const def of definitions) {
      const jsonPath = resolve(DEFS_DIR, `${def.name}-runtime.json`);
      if (!existsSync(jsonPath)) continue;

      it(`${def.name}: generated .json file produces matching definition`, () => {
        const original = JSON.parse(readFileSync(def.path, 'utf-8'));

        // Load the generated compact JSON definition
        const compact: CompactDefinition = JSON.parse(readFileSync(jsonPath, 'utf-8'));
        const expanded = expand(compact);

        const normalizedOriginal = normalizeForComparison(original);
        const normalizedExpanded = normalizeForComparison(expanded);

        expect(normalizedExpanded.openapi).toEqual(normalizedOriginal.openapi);
        expect(normalizedExpanded.paths).toEqual(normalizedOriginal.paths);
        expect(normalizedExpanded.servers).toEqual(normalizedOriginal.servers);

        if (normalizedOriginal.components) {
          expect(normalizedExpanded.components).toEqual(normalizedOriginal.components);
        }
      });
    }
  });

  it('compact format is significantly smaller than JSON', () => {
    let totalOriginal = 0;
    let totalCompact = 0;

    for (const def of definitions) {
      const original = readFileSync(def.path, 'utf-8');
      const parsed = JSON.parse(original);
      const compact = compactifyDefinition(parsed);
      const compactStr = JSON.stringify(compact);

      totalOriginal += original.length;
      totalCompact += compactStr.length;
    }

    const reduction = (1 - totalCompact / totalOriginal) * 100;
    // Expect at least 60% reduction
    expect(reduction).toBeGreaterThan(60);
  });
});
