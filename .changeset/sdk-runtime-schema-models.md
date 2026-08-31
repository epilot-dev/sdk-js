---
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

Publish runtime values through the SDK via a client's `schema-model.ts`

The SDK could only ever re-export *types* from a client's hand-written modules: `additional-types.ts` is copied to a `.d.ts` and re-exported with `export type *`, so a `const` or `enum` placed there type-checks and is then `undefined` at runtime. A client's `schema-model.ts` is now copied as a real `.ts` to `src/models/<api>-model.ts` and re-exported with `export *`, so the values survive.

This fixes an existing gap: `RelationAffinityMode` has always been exported from `@epilot/entity-client` but was unreachable through `@epilot/sdk/entity` — the generator never looked at `schema-model.ts`. It is now available from both.

`@epilot/pricing-client` gains a `schema-model.ts` with runtime companions for four spec enums — `PricingModelValues`, `MarkupPricingModelValues`, `TypeGetAgValues` and `DynamicTariffModeValues` — for consumers that need the values themselves (an `Object.values()` allowlist, a lookup, a `switch` default) rather than just the union type. Each is tied to its generated union with `satisfies`, so dropping a member from the spec is a compile error and the two cannot drift.

A name exported from `schema-model.ts` must not also be a `components.schemas` entry, since both are re-exported from the same API entry file; hence the `<SpecType>Values` naming. See CONTRIBUTING.md.
