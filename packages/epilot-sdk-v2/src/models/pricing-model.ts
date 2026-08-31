/* Auto-copied from pricing-client/src/schema-model.ts */
import type { DynamicTariffMode, MarkupPricingModel, PricingModel, TypeGetAg } from '../types/pricing';

/**
 * Runtime companions for spec enums, for consumers that need the values and not
 * just the union type — `@epilot/pricing` re-declares these in
 * `src/prices/constants.ts` today.
 *
 * Suffixed `Values` because the spec type owns the bare name. `satisfies` stops
 * them drifting: drop a member from the spec and this no longer compiles.
 */

export const PricingModelValues = {
  perUnit: 'per_unit',
  tieredGraduated: 'tiered_graduated',
  tieredVolume: 'tiered_volume',
  tieredFlatFee: 'tiered_flatfee',
  dynamicTariff: 'dynamic_tariff',
  externalGetAG: 'external_getag',
} as const satisfies Record<string, PricingModel>;

export const MarkupPricingModelValues = {
  perUnit: 'per_unit',
  tieredVolume: 'tiered_volume',
  tieredFlatFee: 'tiered_flatfee',
} as const satisfies Record<string, MarkupPricingModel>;

export const TypeGetAgValues = {
  basePrice: 'base_price',
  workPrice: 'work_price',
} as const satisfies Record<string, TypeGetAg>;

export const DynamicTariffModeValues = {
  dayAheadMarket: 'day_ahead_market',
  manual: 'manual',
} as const satisfies Record<string, DynamicTariffMode>;
