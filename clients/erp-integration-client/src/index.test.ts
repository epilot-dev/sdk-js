import * as erpIntegration from './index';

describe('erp-integration-client', () => {
  it('should re-export from integration-toolkit-client', () => {
    expect(erpIntegration).toBeDefined();
  });
});
