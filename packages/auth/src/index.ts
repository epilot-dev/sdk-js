import 'source-map-support/register';

import type { AxiosInstance } from 'axios';

import { loginToUserPool } from './cognito';
import { Credentials } from './types';
import { getLoginParametersForUser } from './user';

export interface UsernamePasswordAuthParams {
  username: string;
  password: string;
}
export const authenticate = async (authParams: UsernamePasswordAuthParams): Promise<Credentials> => {
  console.debug('auth:params', { ...authParams, password: 'HIDDEN' });

  const loginParams = await getLoginParametersForUser({ username: authParams.username });
  console.debug('auth:loginParams', { loginParams });

  const credentials = await loginToUserPool({
    username: authParams.username,
    password: authParams.password,
    userPoolId: loginParams.userPoolId,
    userPoolClientId: loginParams.userPoolClientId,
  });
  console.debug('auth:credentials', { credentials });

  return credentials;
};

export const authorizeClient = (credentials: Credentials) => <T extends AxiosInstance>(client: T): T => {
  client.interceptors.request.use((request) => {
    request.headers['authorization'] = `Bearer ${credentials.tokens.access_token}`;

    return request;
  });

  return client;
};

export * from './types';
