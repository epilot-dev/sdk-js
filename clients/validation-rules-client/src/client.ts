import type { AxiosRequestHeaders } from 'axios';
import { OpenAPIClientAxios } from 'openapi-client-axios';

import definition from './definition';
import { Client } from './openapi';

export const getClient = () => {
  const api = new OpenAPIClientAxios({ definition, quick: true });
  const apiClient = api.initSync<Client>();
  apiClient.interceptors.request.use((config) => {
    config.headers = {
      ...(config.headers || {}),
    } as AxiosRequestHeaders;

    return config;
  });

  return apiClient;
};
