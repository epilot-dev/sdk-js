import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'node:fs';

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

vi.mock('node:fs');

describe('loadOverrides', () => {
  let registry: Map<string, ApiEntry>;

  const mockLoader = () => ({
    openapi: '3.0.0' as const,
    info: { title: 'Mock', version: '1.0.0' },
    paths: {},
  });

  beforeEach(() => {
    _resetOverrides();
    registry = createRegistry();
    vi.restoreAllMocks();
  });

  it('should register a new client from overrides file', () => {
    const overridesJson = JSON.stringify({ 'custom-api': './custom-spec.json' });
    const specJson = JSON.stringify({
      openapi: '3.0.0',
      info: { title: 'Custom API', version: '1.0.0' },
      paths: {},
    });

    vi.mocked(fs.existsSync).mockImplementation((p) => String(p).includes('sdk-overrides.json'));
    vi.mocked(fs.readFileSync).mockImplementation(((p: string) => {
      if (p.includes('sdk-overrides.json')) return overridesJson;
      if (p.includes('custom-spec.json')) return specJson;
      throw new Error(`Unexpected read: ${p}`);
    }) as typeof fs.readFileSync);

    loadOverrides(registry);

    expect(registry.has('custom-api')).toBe(true);

    const entry = registry.get('custom-api')!;
    const spec = entry.loader();
    expect(spec.info.title).toBe('Custom API');
  });

  it('should override an existing loader', () => {
    registerApi({ registry, name: 'entity', loader: mockLoader });

    const overridesJson = JSON.stringify({ entity: './custom-entity-spec.json' });
    const specJson = JSON.stringify({
      openapi: '3.0.0',
      info: { title: 'Custom Entity', version: '2.0.0' },
      paths: {},
    });

    vi.mocked(fs.existsSync).mockImplementation((p) => String(p).includes('sdk-overrides.json'));
    vi.mocked(fs.readFileSync).mockImplementation(((p: string) => {
      if (p.includes('sdk-overrides.json')) return overridesJson;
      if (p.includes('custom-entity-spec.json')) return specJson;
      throw new Error(`Unexpected read: ${p}`);
    }) as typeof fs.readFileSync);

    loadOverrides(registry);

    const entry = registry.get('entity')!;
    expect(entry.instance).toBeNull();

    const spec = entry.loader();
    expect(spec.info.title).toBe('Custom Entity');
  });

  it('should silently skip when no overrides file exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    loadOverrides(registry);

    expect(registry.size).toBe(0);
  });

  it('should only load once (idempotent)', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    loadOverrides(registry);
    loadOverrides(registry);
    // No error — second call is a no-op
  });
});
