import type { Document } from 'openapi-client-axios';

import { lazyApiDocs } from '../api-docs';
import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/entity';
export type * from '../types/entity';
export type { OpenAPIClient } from 'openapi-client-axios';
export * from '../models/entity-model';

/* eslint-disable @typescript-eslint/no-require-imports */
let _definition: Document | null = null;

// One definition object per API, shared by getClient() and every createClient():
// openapi-client-axios caches the dereferenced definition per definition object.
const loadDefinition = (): Document => {
  if (!_definition) {
    const mod = require('../definitions/entity-runtime.json');
    _definition = expand((mod.default ?? mod) as CompactDefinition) as Document;
  }
  return _definition;
};

// Literal paths: a bundler emits lazy chunks for this API's docs only, not for every API.
const docs = lazyApiDocs({
  apiName: 'entity',
  help: () => import('../docs/entity.json'),
  openapi: () => import('../definitions/entity.json'),
});

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition();
    _instance = createApiClient<Client>({ definition: def, docs });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition(), docs }),
  apiName: 'entity',
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `entity.getEntity(...)` calls forwarded to lazy singleton
 */
export const entity = _handle;
