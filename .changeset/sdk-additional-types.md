---
"@epilot/sdk": patch
---

Expose the clients' hand-written `additional-types.ts` through the SDK

`@epilot/sdk/<api>` re-exported only the types generated from an API's OpenAPI specification. Types a client declares by hand in `src/additional-types.ts` — types the API no longer returns but consumers still need — were silently dropped, so code migrating from `@epilot/<api>-client` to `@epilot/sdk/<api>` had to re-declare them.

`scripts/generate-sdk-v2.ts` now copies each client's `additional-types.ts` to `src/types/<api>-additional.d.ts` (rewriting its `./openapi` import to point at the copied generated types) and re-exports it from `src/apis/<api>.ts`.

For `@epilot/sdk/pricing` this restores `PriceTierEnhanced`, `Cart`, and `AvailabilityDate`, matching the surface of `@epilot/pricing-client`.
