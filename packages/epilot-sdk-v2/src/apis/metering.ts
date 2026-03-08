import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/metering';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
  ActionLabel,
  ActivityId,
  BaseEntity,
  CounterReadingOnSubmission,
  Direction,
  Entity,
  EntityId,
  EntityItem,
  EntityRelation,
  EntitySlug,
  ErrorResp,
  Id,
  JourneyActions,
  Meter,
  MeterCounter,
  MeterReading,
  PortalMeterReading,
  ReadBy,
  Reading,
  ReadingStatus,
  ReadingWithMeter,
  Reason,
  ReasonString,
  Rule,
  Source,
  SubmissionMeterReading,
  TariffType,
  Unit,
  UpdateMeterReading,
} from '../types/metering';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/metering.json');
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
 * `metering.someOperation(...)` calls forwarded to lazy singleton
 */
export const metering = _handle;
