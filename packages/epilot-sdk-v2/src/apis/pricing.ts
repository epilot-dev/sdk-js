import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/pricing';

export type {
  Address,
  Amounts,
  AvailabilityCheckParams,
  AvailabilityFilters,
  AvailabilityLocation,
  AvailabilityResult,
  AverageMarketPriceRecord,
  AverageMarketPriceResult,
  BaseCompositePrice,
  BaseCouponCommon,
  BaseMarketPriceRecord,
  BasePriceItem,
  BasePriceItemCommon,
  BasePriceItemDto,
  BasicAuthCredentials,
  BasicAuthIntegration,
  BillingPeriod,
  CartDto,
  CashbackAmount,
  CashbackAmounts,
  CashbackPeriod,
  CatalogSearch,
  CatalogSearchResult,
  CheckoutCart,
  CheckoutCartResult,
  CheckoutMode,
  Client,
  CompositePrice,
  CompositePriceItem,
  CompositePriceItemDto,
  ComputedBasePrice,
  ComputedPriceBreakdown,
  ComputedPriceComponents,
  ComputePriceParams,
  ComputePriceParamsBase,
  ComputePriceParamsGas,
  ComputePriceParamsPower,
  ComputePriceResult,
  ConsumptionTypeGetAg,
  Coupon,
  CouponItem,
  CouponWithoutPromoCodes,
  Currency,
  CustomContext,
  Customer,
  DiscountAmounts,
  DynamicTariffInterval,
  DynamicTariffMode,
  EntityId,
  EntityItem,
  EntityRelation,
  Error,
  ExternalCatalogConfigurationRequest,
  ExternalCatalogCustomRequest,
  ExternalCatalogItem,
  ExternalCatalogJourneyRequest,
  ExternalCatalogPortalRequest,
  ExternalCatalogRequest,
  ExternalFeeMapping,
  ExternalFeeMappings,
  ExternalFeeMetadata,
  ExternalPriceMetadata,
  File,
  GasConcessionType,
  HistoricMarketPriceRecord,
  HistoricMarketPricesResult,
  HydratedCompositePrice,
  IntegrationAuthCredentials,
  IntegrationCredentialsResult,
  IntegrationId,
  JourneyContext,
  MarkupPricingModel,
  MetaData,
  NonHydratedCompositePrice,
  OAuthCredentials,
  OAuthIntegration,
  Offer,
  OperationMethods,
  Opportunity,
  OpportunitySource,
  Order,
  OrderPayload,
  OrderRelation,
  OrderSource,
  OrderStatus,
  PathsDictionary,
  PaymentMethod,
  PortalContext,
  PowerMeterType,
  Price,
  PriceAmounts,
  PriceComponentRelation,
  PriceConditions,
  PriceDynamicTariff,
  PriceGetAg,
  PriceInputMapping,
  PriceInputMappings,
  PriceItem,
  PriceItemDto,
  PriceItemDtoUnion,
  PriceItems,
  PriceItemsDto,
  PriceTier,
  PriceTierDisplayMode,
  PricingDetails,
  PricingDetailsResponse,
  PricingModel,
  Product,
  ProductCategory,
  ProductRecommendation,
  ProductRecommendationResponse,
  ProductRecommendationSearch,
  PromoCode,
  PromoCodeValidationResponse,
  Provider,
  RecurrenceAmount,
  RecurrenceAmountDto,
  RecurrenceAmountWithTax,
  RedeemedPromo,
  SalesTax,
  SaveIntegrationCredentialsParams,
  SearchExternalCatalogParams,
  SearchExternalCatalogRecommendationsResult,
  SearchExternalCatalogResult,
  SearchProvidersParams,
  SearchProvidersResult,
  SearchStreetsParams,
  SearchStreetsResult,
  SignatureMeta,
  SpotMarketBiddingZone,
  SpotMarketDataFrequency,
  SpotMarketType,
  Street,
  TariffTypeGetAg,
  Tax,
  TaxAmount,
  TaxAmountBreakdown,
  TaxAmountDto,
  TaxBreakdownInfo,
  TierDetails,
  TotalDetails,
  TypeGetAg,
  ValidateAvailabilityFileError,
  ValidateAvailabilityFileResult,
} from '../types/pricing';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/pricing.json');
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
 * `pricing.someOperation(...)` calls forwarded to lazy singleton
 */
export const pricing = _handle;
