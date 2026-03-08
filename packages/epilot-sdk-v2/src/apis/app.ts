import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/app';

export type {
  Actor,
  AggregatedEvents,
  AppBridgeSurfaceConfig,
  AppEventData,
  Audit,
  Author,
  BaseComponent,
  BaseComponentCommon,
  BaseCustomActionConfig,
  BatchEventRequest,
  BillingFrequency,
  BlueprintRef,
  BooleanArg,
  CallerIdentity,
  Client,
  ComponentType,
  Configuration,
  ConfigurationMetadata,
  ConfigurationVersion,
  CustomCapabilityComponent,
  CustomFlowActionComponent,
  CustomFlowConfig,
  CustomPageComponent,
  CustomPageConfig,
  EnumArg,
  ErpInformToolkitComponent,
  EventsQuery,
  EventsQueryResponse,
  ExternalIntegrationCustomActionConfig,
  ExternalProductCatalogAuthBlock,
  ExternalProductCatalogComponent,
  ExternalProductCatalogConfig,
  ExternalProductCatalogHookProductRecommendations,
  ExternalProductCatalogHookProducts,
  Grants,
  Installation,
  JourneyBlockComponent,
  JourneyBlockComponentArgs,
  JourneyBlockConfig,
  NotificationConfig,
  NotificationEvent,
  OperationMethods,
  Option,
  Options,
  OptionsRef,
  OverrideDevMode,
  PathsDictionary,
  PortalBlockComponent,
  PortalBlockConfig,
  PortalBlockSurfaceConfig,
  PortalExtensionAuthBlock,
  PortalExtensionComponent,
  PortalExtensionConfig,
  PortalExtensionHookConsumptionDataRetrieval,
  PortalExtensionHookContractIdentification,
  PortalExtensionHookCostDataRetrieval,
  PortalExtensionHookMeterReadingPlausibilityCheck,
  PortalExtensionHookPriceDataRetrieval,
  PortalExtensionHookRegistrationIdentifiersCheck,
  PortalExtensionSeamlessLink,
  Pricing,
  PublicConfiguration,
  RawEvents,
  Review,
  Role,
  S3Reference,
  SandboxCustomActionConfig,
  TextArg,
  TranslatedString,
} from '../types/app';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/app.json');
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
 * `app.someOperation(...)` calls forwarded to lazy singleton
 */
export const app = _handle;
