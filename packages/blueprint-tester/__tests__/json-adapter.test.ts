import { describe, expect, it } from 'vitest';
import { fromManifestJson, fromResourceArray } from '../src/adapters/json-adapter.js';
import { validateBlueprint } from '../src/validator.js';
import type { BlueprintManifest } from '../src/types.js';

describe('JSON adapter', () => {
  it('converts a manifest to BlueprintData', () => {
    const manifest: BlueprintManifest = {
      blueprint_id: 'test-bp-123',
      name: 'Test Blueprint',
      source_type: 'custom',
      resources: [
        {
          type: 'journey',
          id: 'j-001',
          name: 'Onboarding Journey',
          address: 'epilot_journey.onboarding',
          is_root: true,
          is_ready: true,
          depends_on_addresses: [],
          config: {
            name: 'Onboarding Journey',
            access_mode: 'PRIVATE',
          },
        },
        {
          type: 'automation_flow',
          id: 'a-001',
          name: 'Auto Flow',
          address: 'epilot_automation.auto_flow',
          depends_on_addresses: ['epilot_journey.onboarding'],
          config: {
            name: 'Auto Flow',
            trigger: { type: 'journey_submission', journey_id: 'j-001' },
          },
        },
      ],
    };

    const data = fromManifestJson(manifest);

    expect(data.format).toBe('json');
    expect(data.resources).toHaveLength(2);
    expect(data.metadata?.blueprintId).toBe('test-bp-123');
    expect(data.resources[0].type).toBe('epilot_journey');
    expect(data.resources[0].name).toBe('Onboarding Journey');
    expect(data.resources[1].dependsOn).toEqual(['epilot_journey.onboarding']);
  });

  it('converts a resource array to BlueprintData', () => {
    const data = fromResourceArray([
      {
        type: 'schema',
        id: 's-001',
        name: 'Contact Schema',
        config: { slug: 'contact', name: 'Contact' },
      },
    ]);

    expect(data.format).toBe('json');
    expect(data.resources).toHaveLength(1);
    expect(data.resources[0].type).toBe('epilot_schema');
  });

  it('validates a JSON manifest for dangling UUIDs', async () => {
    const manifest: BlueprintManifest = {
      blueprint_id: 'bp-dangling',
      resources: [
        {
          type: 'automation_flow',
          id: 'a-001',
          name: 'Auto Flow',
          config: {
            name: 'Auto Flow',
            trigger: {
              type: 'journey_submission',
              journey_id: 'd11995ae-368e-4ad3-bf1c-51d6449f8afc',
            },
          },
        },
      ],
    };

    const report = await validateBlueprint(manifest);
    expect(report.valid).toBe(false);
    expect(report.metadata.format).toBe('json');
    expect(report.issues.some((i) => i.ruleId === 'dangling-uuid')).toBe(true);
  });

  it('validates a clean JSON manifest', async () => {
    const manifest: BlueprintManifest = {
      blueprint_id: 'bp-clean',
      resources: [
        {
          type: 'journey',
          id: 'j-001',
          name: 'Journey',
          config: { name: 'My Journey', access_mode: 'PRIVATE' },
        },
      ],
    };

    const report = await validateBlueprint(manifest);
    expect(report.valid).toBe(true);
    expect(report.metadata.format).toBe('json');
    expect(report.metadata.blueprintId).toBe('bp-clean');
  });

  it('detects org IDs in JSON manifest resources', async () => {
    const manifest: BlueprintManifest = {
      blueprint_id: 'bp-org',
      resources: [
        {
          type: 'journey',
          id: 'j-001',
          name: 'Journey',
          config: {
            name: 'My Journey',
            organization_id: '911690',
          },
        },
      ],
    };

    const report = await validateBlueprint(manifest);
    expect(report.issues.some((i) => i.ruleId === 'source-org-ref')).toBe(true);
  });

  it('detects tokens in JSON manifest resources', async () => {
    const manifest: BlueprintManifest = {
      blueprint_id: 'bp-token',
      resources: [
        {
          type: 'webhook',
          id: 'wh-001',
          name: 'Webhook',
          config: {
            url: 'https://example.com',
            auth_token: 'api_5ZugdRXasLfWBypHi93Fk',
          },
        },
      ],
    };

    const report = await validateBlueprint(manifest);
    expect(report.issues.some((i) => i.ruleId === 'token-detection')).toBe(true);
  });
});
