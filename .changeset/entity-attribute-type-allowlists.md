---
"@epilot/entity-client": minor
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

Publish the attribute-type allowlists

`@epilot/entity-client` exports `RELATION_ATTRIBUTE_TYPES` — the four types that point at another entity — plus `RELATION_ATTRIBUTE_TYPE_LIST` as a literal-typed array and `AttributeType`, the union of every `type` an attribute can have. The list is `satisfies readonly AttributeType[]`, so a member the entity spec does not declare is a compile error.

`@epilot/pricing-client` exports `OVERRIDABLE_ATTRIBUTE_TYPES` and `OVERRIDABLE_ATTRIBUTE_TYPE_LIST` — the entity attribute types whose value a conditional pricing variant may override via `overridable_attribute`. It lives with pricing because conditional pricing is its only consumer.

Both sets are `ReadonlySet<string>`, so `.has(attribute.type)` works without narrowing first.

These were hand-copied in `entity-api`, `epilot360-entity-builder`, `epilot360-entity-builder-v2` and `epilot360-integration-hub`; those copies can now be replaced with an import.
