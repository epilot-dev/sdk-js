import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/app';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
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
  Option,
  Options,
  OptionsRef,
  OverrideDevMode,
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

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/app-runtime.json');
  return expand((mod.default ?? mod) as CompactDefinition) as Document;
};

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition();
    _instance = createApiClient<Client>({ definition: def });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition() }),
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
