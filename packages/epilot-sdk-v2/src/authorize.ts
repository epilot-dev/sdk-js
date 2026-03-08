import type { AxiosInstance } from 'axios';

export type TokenArg = string | (() => string | Promise<string>);

export const authorize = <T extends AxiosInstance>(client: T, token: TokenArg): T => {
  if (typeof token === 'string') {
    client.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    client.interceptors.request.use(async (config) => {
      const resolved = await token();
      config.headers.authorization = `Bearer ${resolved}`;

      return config;
    });
  }

  return client;
};
