/* Auto-copied from entity-client/src/schema-model.ts */
import type { Attribute } from '../types/entity';

/** Every `type` an entity schema attribute can have. */
export type AttributeType = NonNullable<Attribute['type']>;

export enum RelationAffinityMode {
  /** Deleting or creating the parent or the linkage does NOT cascade to the relation entity. */
  WEAK = 'weak',
  /** Deleting or creating the parent or the linkage cascades to the relation entity. */
  STRONG = 'strong',
}

/**
 * Attribute types that point at another entity instead of holding a plain value.
 * `repeatable` does not change this — a repeatable relation is still a relation.
 */
export const RELATION_ATTRIBUTE_TYPE_LIST = [
  'relation',
  'relation_user',
  'relation_address',
  'relation_payment_method',
] as const satisfies readonly AttributeType[];

/**
 * Attribute types whose value a conditional variant may override via `overridable_attribute`.
 *
 * An allowlist by design: a denylist rots as new attribute types land — a new type would
 * silently become overridable — and it cannot be derived from kind alone, since `file` and
 * `image` are scalars unless `repeatable` is set. A type absent here is not overridable.
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
] as const satisfies readonly AttributeType[];

/**
 * Lookup companions of the lists above. Typed `string` rather than `AttributeType` so a
 * caller can test an unvalidated `attribute.type` without narrowing it first.
 */
export const RELATION_ATTRIBUTE_TYPES: ReadonlySet<string> = new Set(RELATION_ATTRIBUTE_TYPE_LIST);
export const OVERRIDABLE_ATTRIBUTE_TYPES: ReadonlySet<string> = new Set(OVERRIDABLE_ATTRIBUTE_TYPE_LIST);
