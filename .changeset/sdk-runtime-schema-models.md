---
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

Publish runtime values through the SDK via a client's `schema-model.ts`

Only types could reach SDK consumers before — `additional-types.ts` lands in a `.d.ts`, so a `const` or `enum` there is `undefined` at runtime. A client's `schema-model.ts` is now copied as a real `.ts` and re-exported with `export *`.

This makes `RelationAffinityMode` reachable through `@epilot/sdk/entity` for the first time; it was already exported from `@epilot/entity-client`.

`@epilot/pricing-client` gains `PricingModelValues`, `MarkupPricingModelValues`, `TypeGetAgValues` and `DynamicTariffModeValues` — the enum values themselves, for lookups and `Object.values()` allowlists, rather than just the union types. Each is tied to its spec union with `satisfies`, and checked against `components.schemas.<SpecType>.enum`, so a member added to or removed from the spec fails the build rather than drifting silently.
