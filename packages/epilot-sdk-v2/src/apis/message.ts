import type { Document } from 'openapi-client-axios'

import { createApiClient } from '../client-factory'
import { expand } from '../compact'
import type { CompactDefinition } from '../compact'
import { createApiHandle } from '../proxy'
import type { ApiHandle } from '../types'
export { authorize } from '../authorize'
export type { TokenArg } from '../authorize'
import type { Client } from '../types/message'
export type { Client, PathsDictionary, OperationMethods, Address, AttachmentsRelation, BaseEntity, BulkActionsPayload, BulkActionsPayloadWithScopes, ErrorResponse, FieldsParam, File, Message, MessageRequestParams, MessageV2, MoveThreadPayload, ReadMessagePayload, ReadingScope, SearchIDParams, SearchParams, SearchParamsV2, Thread, ThreadDoneEvent, ThreadOpenEvent, ThreadTimeline, TimelineEvent, TimelineEventData } from '../types/message'

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/message-runtime.json')
  return expand((mod.default ?? mod) as CompactDefinition) as Document
}

let _instance: Client | null = null

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition()
    _instance = createApiClient<Client>({ definition: def })
  }
  return _instance
}

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition() }),
})

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient

/**
 * API handle — also exposes operations directly:
 * `message.someOperation(...)` calls forwarded to lazy singleton
 */
export const message = _handle