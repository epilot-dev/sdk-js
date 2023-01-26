import OpenAPIClientAxios from 'openapi-client-axios';

import definition from './definition';
import { Client } from './openapi';

let client: Client;
export const getClient = () => {
  if (!client) {
    client = createClient();
  }

  return client;
};

export const createClient = () => {
  const api = new OpenAPIClientAxios({ definition, quick: true });

  return api.initSync<Client>();
};
