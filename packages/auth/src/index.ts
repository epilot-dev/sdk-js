import createDebugLogger from 'debug';

import { authorizeClient } from './client';
import { loginToUserPool } from './cognito';
import { Credentials } from './types';
import { getLoginParametersForUser } from './user';

const debug = createDebugLogger('epilot/auth');

export interface UsernamePasswordAuthParams {
  username: string;
  password: string;
}
export const authenticate = async (authParams: UsernamePasswordAuthParams): Promise<Credentials> => {
  debug('params %o', { ...authParams, password: 'HIDDEN' });

  const loginParams = await getLoginParametersForUser({ username: authParams.username });
  debug('loginParams %o', { loginParams });

  const credentials = await loginToUserPool({
    username: authParams.username,
    password: authParams.password,
    userPoolId: loginParams.userPoolId,
    userPoolClientId: loginParams.userPoolClientId,
  });
  debug('credentials %o', { credentials });

  return {
    ...credentials,
    configureClient: authorizeClient(credentials.tokens),
  };
};

export * from './types';
