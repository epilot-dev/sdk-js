import { getClient } from './client';

describe('client', () => {
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
