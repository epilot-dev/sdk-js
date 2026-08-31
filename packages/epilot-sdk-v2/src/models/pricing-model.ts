/* Auto-copied from pricing-client/src/schema-model.ts */
import type { DynamicTariffMode, MarkupPricingModel, PricingModel, TypeGetAg } from '../types/pricing';

/**
 * Runtime companions for spec enums.
 *
 * `components.schemas` enums generate a TypeScript union — a type, erased at
 * runtime. Consumers that need the values themselves (a lookup, a `switch`
 * default, an `Object.values()` allowlist) otherwise re-declare them by hand;
 * `@epilot/pricing` carries exactly such a copy in `src/prices/constants.ts`.
 *
 * Named `<SpecType>Values` because the spec type already owns the bare name —
 * exporting both from `@epilot/sdk/pricing` would collide.
 *
 * `satisfies` is what makes these safe to depend on: drop a member from the spec
 * and this file stops compiling, so the two cannot drift apart silently.
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
