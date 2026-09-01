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
