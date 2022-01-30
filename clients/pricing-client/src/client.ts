import OpenAPIClientAxios from 'openapi-client-axios';

import definition from './definition';
import { Client } from './openapi';

export const getClient = () => {
  const api = new OpenAPIClientAxios({
    definition,
    quick: true,
  });

  return api.initSync<Client>();
};
