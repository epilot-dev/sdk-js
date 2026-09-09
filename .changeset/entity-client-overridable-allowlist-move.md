---
"@epilot/entity-client": minor
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

Move `OVERRIDABLE_ATTRIBUTE_TYPE_LIST` / `OVERRIDABLE_ATTRIBUTE_TYPES` from `@epilot/pricing-client` to `@epilot/entity-client`

Both hold entity attribute types and are checked against the entity spec, so they belong beside `AttributeType` and `RELATION_ATTRIBUTE_TYPE_LIST` rather than with conditional pricing, their first consumer. Now that they sit in the same module, the relation entries are spread from `RELATION_ATTRIBUTE_TYPE_LIST` instead of being restated, so the two lists cannot drift apart.

This is a breaking change for anyone who picked up `@epilot/pricing-client@3.57.0` or `@epilot/sdk@2.20.0`, where these first shipped. The values are unchanged — only the module they come from:

```diff
-import { OVERRIDABLE_ATTRIBUTE_TYPES } from '@epilot/pricing-client';
+import { OVERRIDABLE_ATTRIBUTE_TYPES } from '@epilot/entity-client';

-import { OVERRIDABLE_ATTRIBUTE_TYPES } from '@epilot/sdk/pricing';
+import { OVERRIDABLE_ATTRIBUTE_TYPES } from '@epilot/sdk/entity';
```

`RELATION_ATTRIBUTE_TYPES`, `RELATION_ATTRIBUTE_TYPE_LIST` and `AttributeType` are unaffected — they were already in `@epilot/entity-client`.
