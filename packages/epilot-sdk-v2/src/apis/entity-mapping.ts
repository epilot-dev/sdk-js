import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/entity-mapping';

export type {
  AppendValueMapper,
  AttributeOrigin,
  Client,
  ConditionNode,
  CopyValueMapper,
  Entity,
  EntityRef,
  ExecuteMappingReq,
  ExecuteMappingResp,
  ExecuteRelationsReq,
  ExecuteRelationsResp,
  JourneyRef,
  Loop_Index_String,
  MapCondition,
  MappingAttribute,
  MappingAttributeMode,
  MappingAttributeV2,
  MappingConfig,
  MappingConfigCommonFields,
  MappingConfigs,
  MappingConfigsResp,
  MappingConfigV2,
  MappingFailure,
  MappingHistoryEntry,
  MappingHistoryResp,
  MappingSource,
  MappingSourceProperty,
  MappingSourceTargetType,
  MappingWarning,
  NewRelationItem,
  OperationMethods,
  OperationNode,
  OperationObjectNode,
  Owner,
  PathsDictionary,
  PrimitiveJSONValue,
  RandomOperation,
  RelationAttribute,
  RelationItem,
  SearchMappingReq,
  SetValueMapper,
  SourceConfig,
  TargetConfig,
} from '../types/entity-mapping';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/entity-mapping.json');
  return (mod.default ?? mod) as unknown as Document;
};

let _instance: Client | null = null;

const resolve = async (): Promise<Client> => {
  if (!_instance) {
    const definition = await loadDefinition();
    _instance = createApiClient<Client>({ definition });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  loadDefinition,
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `entityMapping.someOperation(...)` calls forwarded to lazy singleton
 */
export const entityMapping = _handle;
