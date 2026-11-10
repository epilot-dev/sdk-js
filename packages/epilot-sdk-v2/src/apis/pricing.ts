import type { Document } from 'openapi-client-axios';

import { createApiClient, jsonContent } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/pricing';
export type * from '../types/pricing';
export type * from '../types/pricing-additional';
export type { OpenAPIClient } from 'openapi-client-axios';
export * from '../models/pricing-model';

/* eslint-disable @typescript-eslint/no-require-imports */
let _definition: Document | null = null;

// One definition object per API, shared by getClient() and every createClient():
// openapi-client-axios caches the dereferenced definition per definition object.
const loadDefinition = (): Document => {
  if (!_definition) {
    const mod = require('../definitions/pricing-runtime.json');
    _definition = expand((mod.default ?? mod) as CompactDefinition) as Document;
  }
  return _definition;
};

// help and openapi import by static path, so a bundler includes only this API's docs and spec.
/** Markdown docs of this API */
export const help = (): Promise<string> => jsonContent(import('../docs/pricing.json'));

/** Full OpenAPI specification of this API */
export const openapi = (): Promise<Document> => jsonContent(import('../definitions/pricing.json'));

const create = (): Client => createApiClient<Client>({ definition: loadDefinition(), help, openapi });

let _instance: Client | null = null;

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: () => (_instance ??= create()),
  createClient: create,
  apiName: 'pricing',
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `pricing.someOperation(...)` calls forwarded to lazy singleton
 */
export const pricing = _handle;
