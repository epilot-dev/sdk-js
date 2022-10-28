import OpenAPIClientAxios from 'openapi-client-axios';
import CorrelationIds from '@dazn/lambda-powertools-correlation-ids';
import definition from './definition';
import { Client } from './openapi';

export const getClient = () => {
  const api = new OpenAPIClientAxios({ definition, quick: true });

  const apiClient = api.initSync<Client>();

  apiClient.defaults.headers.common = {
    ...(apiClient.defaults.headers.common ?? {}),
    ...(CorrelationIds.get() || {})
  }

  return apiClient;
};
