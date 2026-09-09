---
"@epilot/sdk": minor
---

Update the journey client with journey-config spec `1.6.0` — serve a published journey revision by id to the runtime (ER-5421)

`getJourney` (`GET /v1/journey/configuration/{id}`) takes an optional `revision_id` query parameter and serves that revision instead of the published version, so a save-and-continue session can stay on the revision it started on and resume against exactly that configuration.

Only revisions that have been published at least once are served on the public and portal routes; a never-published revision is served to `EpilotAuth` callers holding the journey edit permission and answers `404` otherwise, as does an unknown id. It cannot be combined with the legacy `version` parameter, which still reads a revision row by number and is unchanged.

The response gains `revision_id`, the revision the served configuration came from: the requested one, or the journey record's published revision when none was requested. It is absent while a journey has not adopted versioning and on legacy `version` reads. `revisions` remains the legacy change counter of the published version.

No other operation or schema changes. `getJourneyV2` deliberately does not take `revision_id` and does not return it, so config-engine, Configuration Hub and blueprint-manifest-api are unaffected.
