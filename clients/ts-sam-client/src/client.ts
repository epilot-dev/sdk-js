import CorrelationIds from '@dazn/lambda-powertools-correlation-ids';
import OpenAPIClientAxios from 'openapi-client-axios';

import definition from './definition';
import { Client } from './openapi';

export const getClient = () => {
  const api = new OpenAPIClientAxios({ definition, quick: true });
  const apiClient = api.initSync<Client>();
  apiClient.interceptors.request.use((config) => {
    const correlationHeaders = CorrelationIds.get() || {};
    config.headers = {
      ...(config.headers || {}),
      ...correlationHeaders,
    };

    return config;
  });

  return apiClient;
};
