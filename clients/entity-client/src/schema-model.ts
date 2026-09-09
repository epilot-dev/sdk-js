import type { Attribute } from './openapi';

/** Every `type` an entity schema attribute can have. */
export type AttributeType = NonNullable<Attribute['type']>;

export enum RelationAffinityMode {
  /** Deleting or creating the parent or the linkage does NOT cascade to the relation entity. */
  WEAK = 'weak',
  /** Deleting or creating the parent or the linkage cascades to the relation entity. */
  STRONG = 'strong',
}

/** Types that point at another entity. A repeatable relation is still a relation. */
export const RELATION_ATTRIBUTE_TYPE_LIST = [
  'relation',
  'relation_user',
  'relation_address',
  'relation_payment_method',
] as const satisfies readonly AttributeType[];

/** `string`, not `AttributeType`, so callers can test an unnarrowed `attribute.type`. */
export const RELATION_ATTRIBUTE_TYPES: ReadonlySet<string> = new Set(RELATION_ATTRIBUTE_TYPE_LIST);

/**
 * Entity attribute types a conditional pricing variant may override (`overridable_attribute`).
 * An allowlist, so a new scalar type is never overridable by default; a new relation type is, since
 * relations are overridable by kind. No pricing schema to `satisfies` against — `models.test.ts`
 * checks these against the entity spec.
 *
 * Scalars are overridden value for value. The relation types are overridden as a whole: the
 * variant's `$relation` list replaces the base entity's, which is how a variant swaps a product's
 * prices or a composite price's components. They are spread from `RELATION_ATTRIBUTE_TYPE_LIST`
 * above rather than restated, so the two sets cannot drift.
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
  ...RELATION_ATTRIBUTE_TYPE_LIST,
] as const;

/** `string`, not a literal union, so callers can test an unnarrowed `attribute.type`. */
export const OVERRIDABLE_ATTRIBUTE_TYPES: ReadonlySet<string> = new Set(OVERRIDABLE_ATTRIBUTE_TYPE_LIST);
