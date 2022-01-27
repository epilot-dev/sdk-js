import type { AxiosInstance } from 'axios';

export interface Credentials {
  tokens: unknown;
}

export const authenticate = async (): Promise<Credentials> => {
  throw new Error('Not implemented');
};

export const authorizeClient = (_credentials: Credentials) => (client: AxiosInstance): AxiosInstance => {
  return client;
};
