import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/entity';

export type {
  Activity,
  ActivityCallerContext,
  ActivityId,
  ActivityItem,
  ActivityType,
  AddressAttribute,
  AddressRelationAttribute,
  Attribute,
  AttributeWithCompositeID,
  AutomationAttribute,
  BaseActivityItem,
  BaseAttribute,
  BaseEntity,
  BlueprintEntityId,
  BooleanAttribute,
  ClassificationId,
  ClassificationIdOrPattern,
  ClassificationSlug,
  ClassificationsUpdate,
  Client,
  ComputedAttribute,
  ConsentAttribute,
  CountryAttribute,
  CurrencyAttribute,
  DateAttribute,
  DefaultAddressFields,
  EmailAttribute,
  Entity,
  EntityAcl,
  EntityAction,
  EntityCapability,
  EntityCapabilityWithCompositeID,
  EntityDefaultCreate,
  EntityDefaultEdit,
  EntityDefaultTable,
  EntityId,
  EntityImportParams,
  EntityItem,
  EntityListParams,
  EntityOperation,
  EntityOwner,
  EntitySchema,
  EntitySchemaGroup,
  EntitySchemaGroupWithCompositeID,
  EntitySchemaItem,
  EntitySearchIncludeDeletedParam,
  EntitySearchOptions,
  EntitySearchParams,
  EntitySearchResults,
  EntitySlug,
  EntityTableFilterOption,
  EntityTableFilterSearch,
  EntityValidationError,
  EntityValidationResult,
  EntityValidationResultError,
  EntityValidationResultSuccess,
  EntityValidationV2Error,
  EntityValidationV2Result,
  EntityValidationV2ResultError,
  EntityValidationV2ResultSuccess,
  EntityViewDisabled,
  ErrorObject,
  ESClusterAssignment,
  ExportJobId,
  FieldsParam,
  FileAttribute,
  GenerateEntityTableAIFiltersRequest,
  GenerateEntityTableAIFiltersResponse,
  GetRelatedEntitiesCount,
  GetRelationsResp,
  GetRelationsRespWithPagination,
  GraphDefinition,
  GraphEdge,
  GraphNode,
  GraphQueryRequest,
  GraphQueryResponse,
  GraphSeed,
  GroupHeadline,
  GroupHeadlineWithCompositeID,
  HydratedEntity,
  HydratedEntityItem,
  InternalAttribute,
  InternalUserAttribute,
  InvitationEmailAttribute,
  IsTemplate,
  Language,
  LinkAttribute,
  ListSavedViewsResults,
  MessageEmailAddressAttribute,
  MultiSelectAttribute,
  NullableEntity,
  NumberAttribute,
  OperationMethods,
  OrderedListAttribute,
  PartnerOrganisationAttribute,
  PartnerStatusAttribute,
  PathsDictionary,
  PaymentAttribute,
  PaymentMethodRelationAttribute,
  PhoneAttribute,
  PortalAccessAttribute,
  PriceComponentAttribute,
  PurposeAttribute,
  RedirectEntityView,
  RelationAttribute,
  RelationEntity,
  RelationItem,
  RepeatableAttribute,
  SavedView,
  SavedViewId,
  SavedViewItem,
  SavedViewPartial,
  SchemaId,
  SearchFilter,
  SearchFilterValue,
  SearchMappings,
  SelectAttribute,
  SequenceAttribute,
  SettingFlag,
  StatusAttribute,
  SummaryAttribute,
  SummaryField,
  TagsAttribute,
  Taxonomy,
  TaxonomyBulkJob,
  TaxonomyBulkJobActionType,
  TaxonomyBulkJobStatus,
  TaxonomyBulkJobTriggerResponse,
  TaxonomyClassification,
  TaxonomyLocationId,
  TaxonomySearchIncludeArchivedParam,
  TaxonomySlug,
  TextAttribute,
  UserRelationAttribute,
} from '../types/entity';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/entity.json');
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
 * `entity.getEntity(...)` calls forwarded to lazy singleton
 */
export const entity = _handle;
