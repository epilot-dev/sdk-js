import type { AxiosInstance } from 'axios'
import type { Document } from 'openapi-client-axios'

import { createApiClient } from '../client-factory'
import { createApiHandle } from '../proxy'
import type { ApiHandle } from '../types'
export { authorize } from '../authorize'
export type { TokenArg } from '../authorize'
import type { Client } from '../types/event-catalog'
export type { Client, PathsDictionary, OperationMethods, CommonEventMetadata, ContextEntity, EntityOperationTrigger, Event, EventConfig, EventConfigBase, EventJsonSchema, FieldsParam, GraphDefinition, GraphEdge, GraphNode, PrimitiveField, SchemaField, SearchOptions, TriggerEventPayload, TriggerEventResponse, UpdateEventPayload } from '../types/event-catalog'

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/event-catalog.json')
  return (mod.default ?? mod) as unknown as Document
}

let _instance: Client | null = null

const resolve = async (): Promise<Client> => {
  if (!_instance) {
    const definition = await loadDefinition()
    _instance = createApiClient<Client>({ definition })
  }
  return _instance
}

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  loadDefinition,
})

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient

/**
 * API handle — also exposes operations directly:
 * `eventCatalog.someOperation(...)` calls forwarded to lazy singleton
 */
export const eventCatalog = _handle