import { getClient } from './client';

const client = getClient();
export default client;

export type { Client, Components, Paths, PathsDictionary, OperationMethods } from './openapi';
export type { OpenAPIClient, OpenAPIClientAxios, Document } from 'openapi-client-axios';

export * from './client';
