import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/address-suggestions';
export type * from '../types/address-suggestions';
export type { OpenAPIClient } from 'openapi-client-axios';

/* eslint-disable @typescript-eslint/no-require-imports */
let _definition: Document | null = null;

// One definition object per API, shared by getClient() and every createClient():
// openapi-client-axios caches the dereferenced definition per definition object.
const loadDefinition = (): Document => {
  if (!_definition) {
    const mod = require('../definitions/address-suggestions-runtime.json');
    _definition = expand((mod.default ?? mod) as CompactDefinition) as Document;
  }
  return _definition;
};

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition();
    _instance = createApiClient<Client>({ definition: def, apiName: 'addressSuggestions' });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition(), apiName: 'addressSuggestions' }),
  apiName: 'addressSuggestions',
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `addressSuggestions.someOperation(...)` calls forwarded to lazy singleton
 */
export const addressSuggestions = _handle;
