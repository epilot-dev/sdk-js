export enum RelationAffinityMode {
  /**
   * For strong affinity mode on a relation attribute, deleting or creating the parent or the relation linkage will trigger a CASCADE delete or create to the relation entity itself.
   * For weak affinity mode on a relation attribute, deleting or creating the parent or the relation linkage will NOT trigger a CASCADE delete or create to the relation entity itself.
   */
  WEAK = 'weak',
  STRONG = 'strong',
}
