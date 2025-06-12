import { AxiosInstance } from 'openapi-client-axios';

import { OAuthTokens } from './types';

export const authorizeClient =
  (tokens: OAuthTokens) =>
  <T extends AxiosInstance>(client: T): T => {
    client.interceptors.request.use((request) => {
      request.headers['authorization'] = `Bearer ${tokens.access_token}`;

      return request;
    });

    return client;
  };
