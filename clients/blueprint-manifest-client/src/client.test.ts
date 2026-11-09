import { createClient, getClient } from './client';
import type { FormattedErrorCodes, V3SourceDrift } from './openapi';

describe('client', () => {
  it('exposes hydrated source drift on polled installation jobs', async () => {
    const drift: V3SourceDrift = {
      removed: [
        { address: 'headline.old', type: 'schema_group_headline', name: 'Old headline', id: 'opportunity:old' },
      ],
      missing: [
        { address: 'file.old', type: 'file', name: 'Old attachment', id: 'old', referenced_by: ['journey.main'] },
      ],
      exclude_addresses: ['file.old', 'file.alias', 'journey.main'],
    };
    const code: FormattedErrorCodes = 'source_resources_missing';
    const client = createClient();
    client.defaults.adapter = async (config) => ({
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      data: {
        id: 'plan-job',
        status: 'FAILED',
        job_type: 'install',
        source_drift: drift,
        events: [{ errors: [{ code }] }],
      },
    });
    const { data } = await client.getBlueprintJob('plan-job');
    expect(data.source_drift).toEqual(drift);
    expect(data.events?.[0].errors?.[0].code).toBe('source_resources_missing');
  });
  describe('getClient', () => {
    it('should inititalise and return client', async () => {
      const client = getClient();

      expect(client.api.initialized).toBe(true);
    });

    it('should have operations', async () => {
      const client = getClient();

      const operations = client.api.getOperations();

      expect(operations.length).toBeGreaterThan(0);
    });

    it('should have a default server defined', async () => {
      const client = getClient();

      expect(client.defaults.baseURL).toBeDefined();
    });
  });
});
