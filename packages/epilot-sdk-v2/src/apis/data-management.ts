import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/data-management';

export type {
  Client,
  Config,
  ConfigSchedule,
  ConfigType,
  CreateJobRequest,
  DeletionRelationEntitySchema,
  IntervalConfigSchedule,
  Job,
  JobDetails,
  JobReport,
  JobReportFormat,
  JobReportUrlResponse,
  JobStatus,
  JobTrigger,
  ListConfigsResponse,
  ListJobsResponse,
  OperationMethods,
  PathsDictionary,
  QueryConfig,
  QueryEntitiesRequest,
  QueryEntitiesResult,
  QueryFilter,
  QueryFilterType,
  UpdateJobRequest,
  UpsertConfigRequest,
} from '../types/data-management';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/data-management.json');
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
 * `dataManagement.someOperation(...)` calls forwarded to lazy singleton
 */
export const dataManagement = _handle;
