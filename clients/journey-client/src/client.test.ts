import { getClient } from './client';

describe('client', () => {
  describe('getClient', () => {
    it('should initialise and return client', async () => {
      const client = getClient();

      expect(client.api.initialized).toBe(true);
    });

    it('should have operations', async () => {
      const client = getClient();

      const operations = client.api.getOperations();

      expect(operations.length).toBeGreaterThan(0);
    });

    it('should take a revision_id on the runtime read', async () => {
      const client = getClient();

      const runtimeRead = client.api.getOperations().find(({ operationId }) => operationId === 'getJourney');

      expect(runtimeRead?.parameters?.map((parameter) => 'name' in parameter && parameter.name)).toContain(
        'revision_id',
      );
    });

    it('should have the journey versioning operations', async () => {
      const client = getClient();

      const operationIds = client.api.getOperations().map(({ operationId }) => operationId);

      expect(operationIds).toEqual(
        expect.arrayContaining([
          'createJourneyRevision',
          'listJourneyRevisions',
          'getJourneyRevision',
          'publishJourneyRevision',
          'getJourneyPublishState',
        ]),
      );
    });
  });
});
