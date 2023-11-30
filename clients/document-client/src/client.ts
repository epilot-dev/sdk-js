import OpenAPIClientAxios from 'openapi-client-axios';

import definition from './definition';
// eslint-disable-next-line import/no-unresolved
import { Client } from './openapi';

export const getClient = () => {
  const api = new OpenAPIClientAxios({ definition, quick: true });

  return api.initSync<Client>();
};
