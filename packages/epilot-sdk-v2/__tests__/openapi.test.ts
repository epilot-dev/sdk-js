import { describe, it, expect } from 'vitest';

import { openapi } from '../src/openapi';

describe('openapi', () => {
  it('should load the full OpenAPI spec for an API', async () => {
    const spec = await openapi('entity');
    expect(spec).toBeDefined();
    expect(spec.openapi).toMatch(/^3\./);
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBeDefined();
    expect(spec.paths).toBeDefined();
    expect(Object.keys(spec.paths!).length).toBeGreaterThan(0);
  });

  it('should return the full spec (not the compact runtime version)', async () => {
    const spec = await openapi('entity');
    // Full spec has schemas in components
    expect(spec.components).toBeDefined();
    expect(spec.components?.schemas).toBeDefined();
  });

  it('should cache repeated calls', async () => {
    const spec1 = await openapi('organization');
    const spec2 = await openapi('organization');
    expect(spec1).toBe(spec2);
  });

  it('should handle camelCase API names (converts to kebab-case)', async () => {
    const spec = await openapi('workflowDefinition');
    expect(spec).toBeDefined();
    expect(spec.openapi).toMatch(/^3\./);
  });
});
