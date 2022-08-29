import type { AxiosInstance } from 'axios';

import { authorizeClient } from './client';

/**
 * Configures an epilot API client with a Bearer token
 */
export const authorizeWithToken = <T extends AxiosInstance>(client: T, accessToken: string): T => {
  return authorizeClient({ access_token: accessToken })(client);
};
