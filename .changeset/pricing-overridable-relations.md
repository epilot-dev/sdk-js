---
"@epilot/pricing-client": minor
"@epilot/sdk": minor
---

`OVERRIDABLE_ATTRIBUTE_TYPE_LIST` / `OVERRIDABLE_ATTRIBUTE_TYPES` now include the relation types (`relation`, `relation_user`, `relation_address`, `relation_payment_method`): a conditional pricing variant may override a relation attribute by replacing its whole `$relation` list, e.g. to swap a product's prices or a composite price's components. Consumers that gate `overridable_attribute` on this list (Entity API, entity builder) accept the flag on relations once they pick this up.
