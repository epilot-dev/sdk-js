---
"@epilot/journey-client": minor
"@epilot/sdk": minor
---

Update the journey client with journey-config spec `1.4.3` — environment-backed datasources, an auth gate, and ordered validation rule refs (ER-5354)

`getJourneyEnvironment` (`GET /v1/journey/configuration/{id}/environment`) resolves the environment variables a journey references, authenticated with the journey access token bound to that journey id. Only browser-safe value types are served — `Text`, `Number`, `Boolean` and `Map` — and the response is always `Cache-Control: private, no-store`.

It answers with `JourneyEnvironmentResponse`, which reports per datasource rather than failing whole: `items` carries the resolved `{ datasourceId, type, value }`, and `errors` carries `{ datasourceId, code }` for the ones that could not resolve, with `code` one of `not_found`, `unsupported_type`, `not_set`, `invalid_value` or `incompatible_consumer`. Two supporting types come with it: `EnvironmentMap`, a `Map` variable's non-empty `options` array plus an optional `fallbackLanguage` (default `de`), and `EnvironmentMapEntry`, one `{ key, value }` of it — `key` is the token a journey submits, `value` what the customer reads, either a plain string or a record of one translation per language code. These mirror `MapValue` and `MapEntry` in `@epilot/environments-client`.

`JourneyActivationGuarantee` narrows what a read returns: journeys coming back from `getJourney` and `getJourneyV2` now declare `settings.isActive` as required, so consumers no longer have to treat the flag as possibly absent. It stays optional in request bodies.

Journey settings gain `authGate`, `{ stepId }` naming the step that holds the Login & Registration block — every step after it requires an authenticated session. Alongside it: `useAustrianLabels` for Austrian-format input labels, `stepperType` (`numbers` or `progress bar`) on step display, `newMappings` marking a journey whose mappings live as advanced mappings on a lazily created automation, and `context_entity_id` on document generation, the entity that entity and relational template variables resolve against. Design parameters gain a `description` of up to 500 characters.

`ValidationRuleRef` and `RuleRef` both accept an ordered, non-empty, unique array of rule IDs wherever they accepted a single ID, so a block or a field can run several rules in a defined order. A lone string still works.

Two breaking renames land inside `settings.savingProgress`: `savingMode` becomes `mode` and `supportedVersion` becomes `supportedRevision`. The object itself is now also declared on the v2 journey payload, where it was previously missing. Anything reading or writing those two properties needs updating.

`lang` on a design parameter widens from `"de" | "en" | "fr"` to any language code string; code that exhaustively switched on the old union will need a default branch. `templateId` becomes nullable.
