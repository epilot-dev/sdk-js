# @epilot/sdk

## 2.20.0

### Minor Changes

- f9979be: Publish the attribute-type allowlists

  `@epilot/entity-client` exports `RELATION_ATTRIBUTE_TYPES` — the four types that point at another entity — plus `RELATION_ATTRIBUTE_TYPE_LIST` as a literal-typed array and `AttributeType`, the union of every `type` an attribute can have. The list is `satisfies readonly AttributeType[]`, so a member the entity spec does not declare is a compile error.

  `@epilot/pricing-client` exports `OVERRIDABLE_ATTRIBUTE_TYPES` and `OVERRIDABLE_ATTRIBUTE_TYPE_LIST` — the entity attribute types whose value a conditional pricing variant may override via `overridable_attribute`. It lives with pricing because conditional pricing is its only consumer.

  Both sets are `ReadonlySet<string>`, so `.has(attribute.type)` works without narrowing first.

  These were hand-copied in `entity-api`, `epilot360-entity-builder`, `epilot360-entity-builder-v2` and `epilot360-integration-hub`; those copies can now be replaced with an import.

- b6a744e: Publish runtime values through the SDK via a client's `schema-model.ts`

  Only types could reach SDK consumers before — `additional-types.ts` lands in a `.d.ts`, so a `const` or `enum` there is `undefined` at runtime. A client's `schema-model.ts` is now copied as a real `.ts` and re-exported with `export *`.

  This makes `RelationAffinityMode` reachable through `@epilot/sdk/entity` for the first time; it was already exported from `@epilot/entity-client`.

  `@epilot/pricing-client` gains `PricingModelValues`, `MarkupPricingModelValues`, `TypeGetAgValues` and `DynamicTariffModeValues` — the enum values themselves, for lookups and `Object.values()` allowlists, rather than just the union types. Each is tied to its spec union with `satisfies`, and checked against `components.schemas.<SpecType>.enum`, so a member added to or removed from the spec fails the build rather than drifting silently.
