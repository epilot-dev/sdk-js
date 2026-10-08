import { createClient, getClient } from './client';
import type { Components } from './openapi';

describe('Phone Integration client', () => {
  it('initializes the public operation against the production server', () => {
    const client = getClient();

    expect(client.api.initialized).toBe(true);
    expect(client.defaults.baseURL).toBe('https://phone-integration-api.sls.epilot.io');
    expect(client.api.getOperations().map((operation) => operation.operationId)).toEqual(['batchSearchCustomers']);
  });

  it('sends batch identifiers, bearer auth and trace headers without changing the response', async () => {
    const client = createClient();
    const result: Components.Schemas.CustomerBatchSearchResult = {
      results: [
        {
          identifier: { type: 'phone_number', value: '+4917012345678' },
          status: 'found',
          customer: { id: 'contact-1', name: 'Max Mustermann' },
        },
        { identifier: { type: 'phone_number', value: '030 1234567' }, status: 'not_found' },
      ],
    };
    client.defaults.headers.common.Authorization = 'Bearer phone-token';
    client.defaults.adapter = async (config) => {
      expect(config.method).toBe('get');
      expect(config.url).toBe('/v1/customer:batchSearch');
      expect(config.params).toEqual({
        id: ['contact-1'],
        customer_number: ['4711'],
        external_id: ['crm-1'],
        phone_number: ['+4917012345678', '030 1234567'],
        email: ['max@example.com'],
      });
      const query = new URL(client.getUri(config)).searchParams;
      expect(query.getAll('phone_number[]')).toEqual(['+4917012345678', '030 1234567']);
      expect(config.headers.Authorization).toBe('Bearer phone-token');
      expect(config.headers['x-trace-id']).toBe('trace-1');
      return { config, data: result, status: 200, statusText: 'OK', headers: {} };
    };

    const response = await client.batchSearchCustomers({
      id: ['contact-1'],
      customer_number: ['4711'],
      external_id: ['crm-1'],
      phone_number: ['+4917012345678', '030 1234567'],
      email: ['max@example.com'],
      'x-trace-id': 'trace-1',
    });
    expect(response.data).toEqual(result);
  });

  it('caches getClient and keeps fresh client credentials isolated', () => {
    const singleton = getClient();
    singleton.defaults.headers.common.Authorization = 'Bearer singleton-token';
    try {
      expect(getClient()).toBe(singleton);
      expect(createClient()).not.toBe(singleton);
      expect(createClient().defaults.headers.common.Authorization).toBeUndefined();
    } finally {
      delete singleton.defaults.headers.common.Authorization;
    }
  });
});
