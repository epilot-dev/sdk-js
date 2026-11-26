# @epilot/entity-client

## 7.8.0

### Minor Changes

- ba1c859: Graph node filters (`GraphNodeFilter`, used by `queryEntityGraph`) accept an optional `operator`: `eq` (default) or `neq` (keep entities whose attribute does not equal `value`, including entities missing the attribute).

## 7.5.0

### Minor Changes

- f9979be: Publish the attribute-type allowlists

  `@epilot/entity-client` exports `RELATION_ATTRIBUTE_TYPES` — the four types that point at another entity — plus `RELATION_ATTRIBUTE_TYPE_LIST` as a literal-typed array and `AttributeType`, the union of every `type` an attribute can have. The list is `satisfies readonly AttributeType[]`, so a member the entity spec does not declare is a compile error.

  `@epilot/pricing-client` exports `OVERRIDABLE_ATTRIBUTE_TYPES` and `OVERRIDABLE_ATTRIBUTE_TYPE_LIST` — the entity attribute types whose value a conditional pricing variant may override via `overridable_attribute`. It lives with pricing because conditional pricing is its only consumer.

  Both sets are `ReadonlySet<string>`, so `.has(attribute.type)` works without narrowing first.

  These were hand-copied in `entity-api`, `epilot360-entity-builder`, `epilot360-entity-builder-v2` and `epilot360-integration-hub`; those copies can now be replaced with an import.

## 6.10.1

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 6.6.1

### Patch Changes

- Mark access as public for all packages

## 6.6.0

### Minor Changes

- Minor version bump for all client packages
