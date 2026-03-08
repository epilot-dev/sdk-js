import type { Document } from 'openapi-client-axios'

import { createApiClient } from '../client-factory'
import { createApiHandle } from '../proxy'
import type { ApiHandle } from '../types'
export { authorize } from '../authorize'
export type { TokenArg } from '../authorize'
import type { Client } from '../types/customer-portal'
export type { Client, PathsDictionary, OperationMethods, AcceptanceDecision, ActionLabel, ActionWidget, Activity, ActivityCallerContext, ActivityId, ActivityItem, AdminUser, AllowedFileExtensions, AttributeMappingConfig, AuthConfig, Balance, BaseBillingEvent, BaseEntity, BillingAccount, BillingEvent, Block, BlockId, BlockProps, BlockRequest, BlockType, BusinessPartnerItem, CampaignWidget, CommonConfigAttributes, CommonConfigAttributesV3, Contact, ContactCountRequest, ContactExistsRequest, ContentWidget, ContextEntities, ContextEntity, Contract, ContractIdentifier, CreateUserRequest, Currency, DataRetrievalItem, DeleteEntityFile, Direction, DocumentWidget, DomainSettings, EmailTemplates, Entity, EntityEditRule, EntityFileCount, EntityGetParams, EntityId, EntityItem, EntityMatchingConfig, EntityResponse, EntityResponseGroupedWithHits, EntityResponseWithHits, EntitySearchParams, EntitySlug, EntityTemplates, EntityWidget, ErrorResp, Exists, Extension, ExtensionAuthBlock, ExtensionConfig, ExtensionHook, ExtensionHookConsumptionDataRetrieval, ExtensionHookContractIdentification, ExtensionHookCostDataRetrieval, ExtensionHookMeterReadingPlausibilityCheck, ExtensionHookPriceDataRetrieval, ExtensionHookRegistrationIdentifiersCheck, ExtensionHookSelection, ExtensionSeamlessLink, ExternalLink, ExtraSchemaAttributes, FailedRuleErrorResp, File, FileItem, Grant, IdentifierAttribute, InstallmentEvent, JourneyActions, JuiceSettings, Meter, MeterChartWidget, MeterReading, MeterReadingPhoto, MeterReadingPhotoData, MeterReadingWidget, MoblieOIDCConfig, OIDCProviderConfig, OIDCProviderMetadata, Opportunity, Order, OrganizationSettings, Origin, Page, PageRequest, PaymentWidget, PortalConfig, PortalConfigV3, PortalId, PortalUser, PortalUserRegistrationStatus, PortalWidget, Product, ProviderConfig, ProviderDisplayName, ProviderPublicConfig, ProviderSlug, PublicContractIdentificationDetails, PublicDataRetrievalHookDetails, PublicExtensionCapabilities, PublicExtensionDetails, PublicMeterReadingPlausibilityCheckDetails, ReadBy, ReadingStatus, Reason, RegistrationIdentifier, ReimbursementEvent, Rule, SAMLProviderConfig, SSOCallbackRequest, SSOCallbackResponse, SSOLoginToken, SaveEntityFile, SavePortalFile, Schema, Source, SwappableConfig, TariffType, TeaserWidget, TriggerPortalFlow, UpdateOnlyPortalConfigAttributes, UpsertPortalConfig, UpsertPortalConfigV3, UpsertPortalWidget, UserRequest, WidgetAction, WidgetBase, WorfklowIdentifier, WorkflowExecution, WorkflowStep } from '../types/customer-portal'

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/customer-portal.json')
  return (mod.default ?? mod) as unknown as Document
}

let _instance: Client | null = null

const resolve = (): Client => {
  if (!_instance) {
    const definition = loadDefinition()
    _instance = createApiClient<Client>({ definition })
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
 * `customerPortal.someOperation(...)` calls forwarded to lazy singleton
 */
export const customerPortal = _handle