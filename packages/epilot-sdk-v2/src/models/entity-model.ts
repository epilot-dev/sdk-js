/* Auto-copied from entity-client/src/schema-model.ts */
export enum RelationAffinityMode {
  /** Deleting or creating the parent or the linkage does NOT cascade to the relation entity. */
  WEAK = 'weak',
  /** Deleting or creating the parent or the linkage cascades to the relation entity. */
  STRONG = 'strong',
}
