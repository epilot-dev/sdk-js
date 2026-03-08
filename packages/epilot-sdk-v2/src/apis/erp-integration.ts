import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/erp-integration';

export type {
  AccessLogEntry,
  AutoRefreshSettings,
  Client,
  CreateFileProxyUseCaseRequest,
  CreateInboundUseCaseRequest,
  CreateIntegrationRequest,
  CreateOutboundUseCaseRequest,
  CreateUseCaseRequest,
  CreateUseCaseRequestBase,
  DeleteIntegrationAppMappingRequest,
  DeliveryConfig,
  EmbeddedInboundUseCaseRequest,
  EmbeddedOutboundUseCaseRequest,
  EmbeddedUseCaseRequest,
  EmbeddedUseCaseRequestBase,
  EntityUpdate,
  EnvironmentFieldConfig,
  ErpEvent,
  ErpEventV3,
  ErpUpdatesEventsV2Request,
  ErpUpdatesEventsV3Request,
  ErrorResponseBase,
  FileProxyAuth,
  FileProxyParam,
  FileProxyResponseConfig,
  FileProxyStep,
  FileProxyUrlConfig,
  FileProxyUrlParam,
  FileProxyUrlParams,
  FileProxyUseCase,
  FileProxyUseCaseConfiguration,
  FileProxyUseCaseHistoryEntry,
  GetMonitoringStatsRequest,
  GetMonitoringTimeSeriesRequest,
  InboundIntegrationEventConfiguration,
  InboundMonitoringEvent,
  InboundUseCase,
  InboundUseCaseHistoryEntry,
  Integration,
  IntegrationAppMapping,
  IntegrationConfigurationV1,
  IntegrationConfigurationV2,
  IntegrationEditableFields,
  IntegrationEntity,
  IntegrationEntityField,
  IntegrationFieldV1,
  IntegrationMeterReading,
  IntegrationObjectV1,
  IntegrationSettings,
  IntegrationWithUseCases,
  MappingSimulationRequest,
  MappingSimulationResponse,
  MappingSimulationV2Request,
  MappingSimulationWarning,
  MeterReadingPruneScopeConfig,
  MeterReadingUpdate,
  MeterUniqueIdsConfig,
  MonitoringStats,
  OperationMethods,
  OutboundConflict,
  OutboundIntegrationEventConfiguration,
  OutboundMapping,
  OutboundMonitoringEvent,
  OutboundStatusResponse,
  OutboundUseCase,
  OutboundUseCaseHistoryEntry,
  OutboundUseCaseStatus,
  PathsDictionary,
  PruneScopeConfig,
  QueryAccessLogsRequest,
  QueryEventsRequest,
  QueryInboundMonitoringEventsRequest,
  QueryOutboundMonitoringEventsRequest,
  RelationConfig,
  RelationItemConfig,
  RelationRefItemConfig,
  RelationRefsConfig,
  RelationRefValueConfig,
  RelationUniqueIdField,
  RepeatableFieldType,
  ReplayEventsRequest,
  SetIntegrationAppMappingRequest,
  TimeSeriesBucket,
  TriggerErpActionRequest,
  TriggerWebhookResp,
  UpdateFileProxyUseCaseRequest,
  UpdateInboundUseCaseRequest,
  UpdateIntegrationRequest,
  UpdateOutboundUseCaseRequest,
  UpdateUseCaseRequest,
  UpdateUseCaseRequestBase,
  UpsertIntegrationWithUseCasesRequest,
  UseCase,
  UseCaseBase,
  UseCaseHistoryEntry,
  UseCaseHistoryEntryBase,
  WebhookStatus,
} from '../types/erp-integration';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/erp-integration.json');
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
 * `erpIntegration.someOperation(...)` calls forwarded to lazy singleton
 */
export const erpIntegration = _handle;
