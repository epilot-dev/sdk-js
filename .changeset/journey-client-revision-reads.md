---
"@epilot/sdk": minor
---

Update the journey client with journey-config spec `1.6.0` — serve a revision to the runtime, and name a revision on save (ER-5421, ER-5416)

`getJourney` (`GET /v1/journey/configuration/{id}`) takes an optional `revision_id` query parameter and answers with `revision_id` on the response, naming the revision the configuration came from. This lets a save-and-continue session stay on the revision it started on rather than following the published version mid-session.

Only revisions that have been published at least once are served on the public and portal routes; a never-published revision, and a legacy row predating versioning, is served only to a caller with the journey edit permission and is otherwise `404`. Naming a revision twice (`revision_id` together with the legacy `version`) answers `400`. The served configuration is the journey record as the runtime reads it with the revision's configuration on top: the public token, journey entity, activation flag and access mode always come from the record, so an older revision cannot re-open a journey that has since been made private.

On the response, `revision_id` is the requested revision, or the journey record's published revision when none was requested. It is absent while a journey has not adopted versioning and on legacy `?version=n` reads.

`JourneyRevisionRequest` gains an optional `revision_name`: what a save changed, for the revision history to list. It is distinct from `name`, which is the journey's own name, and a publish replaces it with the version name.

Existing operations are otherwise unchanged. `GET /v2/journey/configuration/{id}` does not take `revision_id`.
