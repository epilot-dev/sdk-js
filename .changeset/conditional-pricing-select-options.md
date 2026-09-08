---
"@epilot/entity-client": minor
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

Align a `select` condition with a `select` attribute: a `ConditionDefinition` on both the Entity API and the Pricing API now declares its vocabulary under `options` (was `values` on the Entity API), and an option is either a bare value or a `{ value, title }` object, exactly as an attribute's `options`. The one deliberate difference stays: a condition has no `allow_any` (removed from the Pricing API's `ConditionDefinition`), since a variant can only ever pin a declared option.
