declare const client: import("openapi-client-axios").OpenAPIClient<import("./openapi").OperationMethods, import("./openapi").PathsDictionary>;
export default client;
export type { Client, Components, Paths, PathsDictionary, OperationMethods } from './openapi';
export type { OpenAPIClient, OpenAPIClientAxios, Document } from 'openapi-client-axios';
export * from './client';
