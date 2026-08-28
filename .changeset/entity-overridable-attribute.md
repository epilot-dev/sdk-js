---
"@epilot/entity-client": minor
"@epilot/sdk": minor
---

Regenerate entity types from the updated Entity API spec: the schema flag `variant_overridable` is renamed to `overridable_attribute` on attributes and capabilities, aligning with the name pricing-api's conditional-pricing service reads. Also picks up the schema-freezing sunset (freeze/unfreeze endpoints and the `latest` query param are deprecated no-ops).
