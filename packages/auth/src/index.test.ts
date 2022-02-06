/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { rest } from 'msw';

import { authServer } from './__tests__/server-mocks';

import { authenticate } from './';

authServer.use(
  rest.get('http://localhost/v1/entity/contact', (req, res, ctx) => {
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
  authServer.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  authServer.close();
});
beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('auth', () => {
  describe('authenticate', () => {
    it('should call the auth api', async () => {
      const authorizer = await authenticate({ username: 'john-doe@epilot.cloud', password: 'doe123' });
      authorizer.configureClient(axios);

      const res = await axios.get('http://localhost/v1/entity/contact');

      expect(res.status).toStrictEqual(200);
      expect(authorizer).toStrictEqual({
        configureClient: expect.anything(),
        logout: expect.anything(),
        refresh: expect.anything(),
        tokens: { access_token: 'THE-AUTH-TOKEN', id_token: 'THE-ID-TOKEN', refresh_token: 'THE-REFRESH-TOKEN' },
      });
    });
  });
});
