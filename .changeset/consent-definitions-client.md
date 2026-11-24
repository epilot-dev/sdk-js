---
"@epilot/consent-client": minor
"@epilot/entity-client": patch
---

Update the consent and entity clients to the latest published specs.

- consent-client: the consent definition operations (`listConsentDefinitions`, `createConsentDefinition`, `getConsentDefinition`, `updateConsentDefinition`, `deleteConsentDefinition`, `publishConsentDefinition`, `archiveConsentDefinition`, `unarchiveConsentDefinition`) with their schemas, and the opt-out token operations (`handleOptOutWithToken`, `handleOptOutWithTokenConfirmation`).
- entity-client: consent attributes can carry a `definition_id` (`topic` is only required for legacy consent attributes), and the new `ConsentValue` schema describes the value such an attribute stores.
