---
"@epilot/sdk": minor
---

Update the journey client with journey-config spec `1.5.0` — journey revisions and publishing (ER-5411)

Five operations under `/v1/journey/configuration/{id}` bring save/publish versioning to journeys. Every save creates a **revision**; publishing a revision makes it the **published version**, the one customers receive; rollback is publishing an older revision. They answer `404` for organizations without the `journeys-versioning` feature flag.

`createJourneyRevision` (`POST …/revisions`) takes a `JourneyRevisionRequest` — the complete journey configuration, same shape as the `PUT` body — plus `parent_revision_id` (the revision the editor started from, so a concurrent save answers `409` with a `JourneyRevisionConflict` carrying the current `latest_revision`), `based_on_revision_id` (provenance when an older revision was loaded into the editor) and `mapping_config_version` (the entity-mapping version stored alongside the revision). It answers `201 JourneyRevisionSummary`.

`listJourneyRevisions` (`GET …/revisions?limit&cursor`) pages the history newest first as a `JourneyRevisionList` — `results` plus a `next_cursor` that is absent at the end. `getJourneyRevision` (`GET …/revisions/{revision_id}`) returns a `JourneyRevision`, the summary plus the full `configuration`.

`publishJourneyRevision` (`POST …/publish`) takes `PublishRevisionRequest` `{ revision_id, name?, description? }` and answers `PublishResult`, which also carries `post_publish_warnings` naming any best-effort side effect that failed after the publish itself succeeded.

`getJourneyPublishState` (`GET …/publish-state`) returns a `JourneyPublishState`. An explicit `published_revision_id: null` means the journey has not adopted versioning yet.

`JourneyRevisionSummary` describes a revision: `revision_id` (opaque string, moves on every save), `created_at`, `created_by?` (absent for revisions recorded from writes without a user), `name?` and `description?` (set at publish time only), `published_at?` (the last time it was published, which a revision keeps after another one takes over) and `is_published` (whether it is the published version right now).

Existing operations and schemas are unchanged. The `version` query parameter and `JourneyAuditInfo.revisions` gain descriptions only: `revisions` stays the legacy change counter of the published version, and versioning metadata is available through `publish-state` alone.
