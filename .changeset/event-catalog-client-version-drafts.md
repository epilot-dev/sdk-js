---
'@epilot/event-catalog-client': minor
---

Regenerate from the local Event Catalog spec (0.1.0).

Custom events gain a version-draft lifecycle under `/v1/events/{event_name}/version_draft`: `getCustomEventVersionDraft`, `putCustomEventVersionDraft` and `deleteCustomEventVersionDraft` manage the pending draft, and `publishCustomEventVersion` (`POST .../version_draft:publish`) publishes it. A draft (`CustomEventVersionDraft`) carries the projected `config`, its `change_class` (`none` / `minor` / `major` / `blocked`), the `next_version`, the field-level `changes`, `remapped_fields`, `added_nodes` and an optional `blocked_reason`. The publish body (`PublishCustomEventVersionPayload`) takes an optional `change_summary` and `change_notes`.
