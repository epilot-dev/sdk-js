---
"@epilot/journey-client": patch
"@epilot/sdk": patch
"@epilot/cli": patch
---

Refresh the journey-config API contract to spec 1.4.3, adding `JourneyActivationGuarantee`.

A `Journey` read from the API now carries an explicit `settings.isActive`, so consumers no longer have to treat the flag as possibly absent when narrowing a response. It stays optional in request bodies, leaving journey creation and update payloads unchanged.

Type-level only — no new paths or operations.
