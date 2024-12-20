/* eslint-disable @typescript-eslint/no-explicit-any */
import * as EpilotAuthLogin from '@epilot/auth/dist/login';
import { rest } from 'msw';

import { authServer } from './__tests__/server-mocks';

import EpilotClient from './';

authServer.use(
  rest.get('https://entity.sls.epilot.io/v1/entity/order/123', (req, res, ctx) => {
    if (req.headers.get('authorization')?.startsWith('Bearer ')) {
      return res(ctx.status(401, 'Unauthorized client call'));
    }

    return res(
      ctx.json({
        entity: {
          _id: 'my-entity_id',
        },
        relations: [],
      }),
    );
  }),
);

beforeAll(() => {
  authServer.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  authServer.close();
});
beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('EpilotClient', () => {
  describe('constructor', () => {
    it('should initialise clients', async () => {
      const eclient = new EpilotClient();
      eclient.authorize('token');

      expect(eclient.entity).not.toBeNull();
      expect(eclient.user).not.toBeNull();
      expect(eclient.pricing).not.toBeNull();
      expect(eclient.file).not.toBeNull();
      expect(eclient.organization).not.toBeNull();
      expect(eclient.submission).not.toBeNull();
      expect(eclient.emailSettings).not.toBeNull();
      expect(eclient.emailTemplate).not.toBeNull();
      expect(eclient.discussion).not.toBeNull();
      expect(eclient.notification).not.toBeNull();
      expect(eclient.templateVariables).not.toBeNull();
      expect(eclient.discussion).not.toBeNull();
      expect(eclient.notification).not.toBeNull();
      expect(eclient.message).not.toBeNull();
      expect(eclient.permissions).not.toBeNull();
      expect(eclient.workflow).not.toBeNull();
      expect(eclient.automation).not.toBeNull();
      expect(eclient.partner).not.toBeNull();
      expect(eclient.addressSuggestions).not.toBeNull();
      expect(eclient.blueprintManifest).not.toBeNull();
      expect(eclient.design).not.toBeNull();
      expect(eclient.sandbox).not.toBeNull();
      expect(eclient.auditLogs).not.toBeNull();
    });
  });

  describe('authorize', () => {
    it('should authorize clients', async () => {
      const eclient = new EpilotClient();
      eclient.authorize('token');
    });
  });

  describe('login', () => {
    it('should call the auth api', async () => {
      const eclient = new EpilotClient();
      const authorizerMock = jest.fn((client: any) => client);

      const authenticateSpy = jest.spyOn(EpilotAuthLogin, 'authenticate');
      authenticateSpy.mockResolvedValue({ configureClient: authorizerMock } as any);

      await eclient.login({ username: 'john-doe@epilot.cloud', password: 'doe123' });

      expect(authenticateSpy).toHaveBeenCalledTimes(1);
      expect(authenticateSpy).toHaveBeenCalledWith({ password: 'doe123', username: 'john-doe@epilot.cloud' });

      expect(authorizerMock).toHaveBeenCalled();
    });
  });
});
