import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const authServer = setupServer(
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
);
