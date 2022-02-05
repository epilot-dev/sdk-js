/* eslint-disable @typescript-eslint/no-explicit-any */
import * as EpilotAuth from '@epilot/auth';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import EpilotClient from './';

const server = setupServer(
  rest.get(/https:\/\/user.sls.epilot.io\/v2\/users\/public\/username\/.*:getLoginParameters/, (_req, res, ctx) => {
    return res(
      ctx.json({
        login_parameters: [
          {
            cognito_identity_pool_id: 'eu-central-1:john-cena',
            cognito_oauth_domain: 'epilot-org-dev-rocks',
            cognito_region: 'eu-central-1',
            cognito_user_pool_client_id: 'rey-misterio-client-id',
            cognito_user_pool_id: 'eu-central-1_johncena',
            oauth_response_type: 'code',
            oauth_scopes: ['openid'],
            organization_id: 'dev-rocks',
          },
        ],
      }),
    );
  }),
  rest.post('https://cognito-idp.eu-central-1.amazonaws.com', (_req, res, ctx) => {
    return res(
      ctx.json({
        ChallengeName: 'PASSWORD_VERIFIER',
        ChallengeParameters: {
          SALT: 'THE_MOCKED_PEPPER',
          SECRET_BLOCK: 'THE_MOCKED_SECRET_BLOCK',
          SRP_B: 'THE_MOCKED_SRP_B',
          USERNAME: 'john-doe@epilot.cloud',
          USER_ID_FOR_SRP: 'john-doe@epilot.cloud',
        },
        AuthenticationResult: {
          NewDeviceMetadata: null,
          AccessToken: 'THE-AUTH-TOKEN',
          ExpiresIn: 3600,
          IdToken: 'THE-ID-TOKEN',
          RefreshToken: 'THE-REFRESH-TOKEN',
          TokenType: 'Bearer',
        },
      }),
    );
  }),
  rest.get('http://localhost/v1/entity/order/123', (req, res, ctx) => {
    if (req.headers.get('authorization') !== 'Bearer THE-AUTH-TOKEN') {
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
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('EpilotClient', () => {
  describe('login', () => {
    it('should call the auth api', async () => {
      const authorizerMock = jest.fn((client: any) => client);

      const authenticateSpy = jest.spyOn(EpilotAuth, 'authenticate');
      authenticateSpy.mockResolvedValue({ configureClient: authorizerMock } as any);

      const eclient = await EpilotClient.buildClient({ username: 'john-doe@epilot.cloud', password: 'doe123' });

      expect(authenticateSpy).toHaveBeenCalledTimes(1);
      expect(authenticateSpy).toHaveBeenCalledWith({ password: 'doe123', username: 'john-doe@epilot.cloud' });

      expect(authorizerMock).toHaveBeenCalledTimes(3);

      expect(eclient.entity).not.toBeNull();
      expect(eclient.user).not.toBeNull();
      expect(eclient.pricing).not.toBeNull();
    });
  });

  describe('entity', () => {
    it('should authorize entity client requests', async () => {
      const eclient = await EpilotClient.buildClient({ username: 'john-doe@epilot.cloud', password: 'doe123' });

      const result = await eclient.entity.getEntity({ slug: 'order', id: '123' });

      expect(result.data.entity).toStrictEqual({ _id: 'my-entity_id' });
    });
  });
});
