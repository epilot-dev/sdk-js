import { getClient } from './client';

export * from './client';
export * from './schema-model';
export type { Client, Components, Paths, PathsDictionary, OperationMethods } from './openapi';
export type { OpenAPIClient, OpenAPIClientAxios, Document } from 'openapi-client-axios';

const client = getClient();
export default client;
