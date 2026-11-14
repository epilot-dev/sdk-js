import { getClient } from './client';

describe('client', () => {
  describe('getClient', () => {
    it('should inititalise and return client', async () => {
      const client = getClient();

      expect(client.api.initialized).toBe(true);
    });

    it('should have the translateTexts operation', async () => {
      const client = getClient();

      const operationIds = client.api.getOperations().map((operation) => operation.operationId);

      expect(operationIds).toContain('translateTexts');
      expect(typeof client.translateTexts).toBe('function');
    });

    it('should have a default server defined', async () => {
      const client = getClient();

      expect(client.defaults.baseURL).toBe('https://translation.sls.epilot.io');
    });
  });
});
