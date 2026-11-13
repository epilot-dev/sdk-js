import type { Document } from 'openapi-client-axios';

import { createApiClient, docsContent } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/configuration-hub';
export type * from '../types/configuration-hub';
export type { OpenAPIClient } from 'openapi-client-axios';

/* eslint-disable @typescript-eslint/no-require-imports */
let _definition: Document | null = null;

// One definition object per API, shared by getClient() and every createClient():
// openapi-client-axios caches the dereferenced definition per definition object.
const loadDefinition = (): Document => {
  if (!_definition) {
    const mod = require('../definitions/configuration-hub-runtime.json');
    _definition = expand((mod.default ?? mod) as CompactDefinition) as Document;
  }
  return _definition;
};

// help and openapi import by static path, so a bundler includes only this API's docs and spec.
const help = async (): Promise<string> =>
  docsContent('configuration-hub.json', () => import('../docs/configuration-hub.json'));

// src/definitions holds no full spec for this API.
const openapi = async (): Promise<Document> => {
  throw new Error('Module not found in bundle: ./definitions/configuration-hub.json');
};

const create = (): Client =>
  createApiClient<Client>({ definition: loadDefinition(), apiName: 'configurationHub', help, openapi });

let _instance: Client | null = null;

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: () => (_instance ??= create()),
  createClient: create,
  apiName: 'configurationHub',
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `configurationHub.someOperation(...)` calls forwarded to lazy singleton
 */
export const configurationHub = _handle;
