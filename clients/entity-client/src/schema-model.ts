import { Components } from './openapi';

export enum RelationAffinityMode {
  /**
   * For strong affinity mode on a relation attribute, deleting or creating the parent or the relation linkage will trigger a CASCADE delete or create to the relation entity itself.
   * For weak affinity mode on a relation attribute, deleting or creating the parent or the relation linkage will NOT trigger a CASCADE delete or create to the relation entity itself.
   */
  WEAK = 'weak',
  STRONG = 'strong',
}

export type Attribute =
  | Components.Schemas.InternalAttribute
  | Components.Schemas.TextAttribute
  | Components.Schemas.RepeatableAttribute
  | Components.Schemas.BooleanAttribute
  | Components.Schemas.SelectAttribute
  | Components.Schemas.RelationAttribute
  | Components.Schemas.UserRelationAttribute
  | Components.Schemas.DateAttribute
  | Components.Schemas.TagsAttribute
  | Components.Schemas.NumberAttribute
  | Components.Schemas.CurrencyAttribute
  | Components.Schemas.ConsentAttribute
  | Components.Schemas.LinkAttribute
  | Components.Schemas.OrderedListAttribute
  | Components.Schemas.FileAttribute
  | Components.Schemas.CountryAttribute;

export type AttributeType = Attribute['type'];
