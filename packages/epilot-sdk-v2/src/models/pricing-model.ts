/* Auto-copied from pricing-client/src/schema-model.ts */
import type { DynamicTariffMode, MarkupPricingModel, PricingModel, TypeGetAg } from '../types/pricing';

/**
 * Runtime companions for spec enums, for consumers that need the values and not
 * just the union type.
 *
 * Suffixed `Values` because the spec type owns the bare name. That suffix is also
 * the contract: `packages/epilot-sdk-v2/__tests__/models.test.ts` checks every
 * `<SpecType>Values` map against `components.schemas.<SpecType>.enum`, so a member
 * added to or removed from the spec fails the build rather than drifting silently.
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

/**
 * Entity attribute types a conditional pricing variant may override (`overridable_attribute`).
 * An allowlist, so a new attribute type is never overridable by default. No pricing schema to
 * `satisfies` against — `models.test.ts` checks these against the entity spec.
 *
 * Scalars are overridden value for value. The relation types are overridden as a whole: the
 * variant's `$relation` list replaces the base entity's, which is how a variant swaps a product's
 * prices or a composite price's components (the entity spec's `RELATION_ATTRIBUTE_TYPE_LIST`).
 */
export const OVERRIDABLE_ATTRIBUTE_TYPE_LIST = [
  'string',
  'number',
  'currency',
  'boolean',
  'date',
  'datetime',
  'select',
  'radio',
  'multiselect',
  'checkbox',
  'country',
  'tags',
  'relation',
  'relation_user',
  'relation_address',
  'relation_payment_method',
] as const;

/** `string`, not a literal union, so callers can test an unnarrowed `attribute.type`. */
export const OVERRIDABLE_ATTRIBUTE_TYPES: ReadonlySet<string> = new Set(OVERRIDABLE_ATTRIBUTE_TYPE_LIST);
