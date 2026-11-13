import type { Document } from 'openapi-client-axios';

import { createApiClient, docsContent } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/integration-toolkit';
export type * from '../types/integration-toolkit';
export type { OpenAPIClient } from 'openapi-client-axios';
export * from '../models/integration-toolkit-model';

/* eslint-disable @typescript-eslint/no-require-imports */
let _definition: Document | null = null;

// One definition object per API, shared by getClient() and every createClient():
// openapi-client-axios caches the dereferenced definition per definition object.
const loadDefinition = (): Document => {
  if (!_definition) {
    const mod = require('../definitions/integration-toolkit-runtime.json');
    _definition = expand((mod.default ?? mod) as CompactDefinition) as Document;
  }
  return _definition;
};

// help and openapi import by static path, so a bundler includes only this API's docs and spec.
const help = async (): Promise<string> =>
  docsContent('integration-toolkit.json', () => import('../docs/integration-toolkit.json'));

// src/definitions holds no full spec for this API.
const openapi = async (): Promise<Document> => {
  throw new Error('Module not found in bundle: ./definitions/integration-toolkit.json');
};

const create = (): Client =>
  createApiClient<Client>({ definition: loadDefinition(), apiName: 'integrationToolkit', help, openapi });

let _instance: Client | null = null;

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: () => (_instance ??= create()),
  createClient: create,
  apiName: 'integrationToolkit',
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `integrationToolkit.someOperation(...)` calls forwarded to lazy singleton
 */
export const integrationToolkit = _handle;
