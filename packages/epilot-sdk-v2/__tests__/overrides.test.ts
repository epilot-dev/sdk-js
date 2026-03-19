import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { loadOverrides, _resetOverrides } from '../src/overrides';
import { createRegistry, registerApi } from '../src/registry';
import type { ApiEntry } from '../src/types';

vi.mock('openapi-client-axios', () => {
  return {
    default: class OpenAPIClientAxios {
      initSync() {
        return {
          defaults: { headers: { common: {} } },
          interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
          customOp: vi.fn().mockResolvedValue({ data: 'custom' }),
        };
      }
    },
  };
});

describe('loadOverrides', () => {
  let registry: Map<string, ApiEntry>;
  let tmpDir: string;

  const mockLoader = () => ({
    openapi: '3.0.0' as const,
    info: { title: 'Mock', version: '1.0.0' },
    paths: {},
  });

  beforeEach(() => {
    _resetOverrides();
    registry = createRegistry();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-overrides-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  const writeOverrides = (overrides: Record<string, string>) => {
    const epilotDir = path.join(tmpDir, '.epilot');
    fs.mkdirSync(epilotDir, { recursive: true });
    fs.writeFileSync(path.join(epilotDir, 'sdk-overrides.json'), JSON.stringify(overrides));
  };

  const writeSpec = (filename: string, spec: Record<string, unknown>) => {
    const epilotDir = path.join(tmpDir, '.epilot');
    fs.mkdirSync(epilotDir, { recursive: true });
    fs.writeFileSync(path.join(epilotDir, filename), JSON.stringify(spec));
  };

  it('should register a new client from overrides file', () => {
    const spec = { openapi: '3.0.0', info: { title: 'Custom API', version: '1.0.0' }, paths: {} };
    writeSpec('custom-spec.json', spec);
    writeOverrides({ 'custom-api': './custom-spec.json' });

    loadOverrides(registry, tmpDir);

    expect(registry.has('custom-api')).toBe(true);

    const entry = registry.get('custom-api')!;
    expect(entry.loader().info.title).toBe('Custom API');
  });

  it('should override an existing loader', () => {
    registerApi({ registry, name: 'entity', loader: mockLoader });

    const spec = { openapi: '3.0.0', info: { title: 'Custom Entity', version: '2.0.0' }, paths: {} };
    writeSpec('custom-entity-spec.json', spec);
    writeOverrides({ entity: './custom-entity-spec.json' });

    loadOverrides(registry, tmpDir);

    const entry = registry.get('entity')!;
    expect(entry.instance).toBeNull();
    expect(entry.loader().info.title).toBe('Custom Entity');
  });

  it('should silently skip when no overrides file exists', () => {
    loadOverrides(registry, tmpDir);

    expect(registry.size).toBe(0);
  });

  it('should only load once (idempotent)', () => {
    loadOverrides(registry, tmpDir);
    loadOverrides(registry, tmpDir);
    // No error — second call is a no-op
  });
});
