import axios from 'axios';
import { rest } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

describe('auth', () => {
  let server: SetupServerApi;

  afterEach(() => {
    server?.close();
  });

  describe('authorizeWithToken', () => {
    it('should use passed access token', async () => {
      // given
      const mockApiHandler = jest.fn((_req, res) => res());
      server = setupServer(rest.get('http://localhost/v1/test', mockApiHandler));
      server.listen();

      const { authorizeWithToken } = await import('./index');
      const client = axios.create();
      authorizeWithToken(client, 'test-token');

      // when
      const res = await client.get('http://localhost/v1/test');

      // then
      expect(res.status).toStrictEqual(200);
      expect(mockApiHandler).toBeCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            _headers: expect.objectContaining({ authorization: 'Bearer test-token' }),
          }),
        }),
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe('authenticate', () => {
    it('should authenticate with the auth api', async () => {
      // given
      const mockApiHandler = jest.fn((_req, res) => res());
      server = setupServer(rest.get('http://localhost/v1/test', mockApiHandler));
      server.listen();

      jest.mock('./user', () => ({
        getLoginParametersForUser: async () => ({
          userPoolId: 'pool-id',
          userPoolClientId: 'client-id',
        }),
      }));
      jest.mock('./cognito', () => ({
        loginToUserPool: async () => ({
          tokens: {
            access_token: 'test-token',
          },
        }),
      }));
      jest.resetModules();

      const client = axios.create();

      // when
      const { authenticate } = await import('./index');
      const authorizer = await authenticate({ username: 'john-doe@epilot.cloud', password: 'doe123' });
      authorizer.configureClient(client);

      // then
      const res = await client.get('http://localhost/v1/test');
      expect(res.status).toStrictEqual(200);
      expect(mockApiHandler).toBeCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            _headers: expect.objectContaining({ authorization: 'Bearer test-token' }),
          }),
        }),
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
