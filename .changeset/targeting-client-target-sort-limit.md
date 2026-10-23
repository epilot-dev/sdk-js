---
"@epilot/targeting-client": minor
---

Regenerate types from the deployed Targeting API: targets can define an optional `sort` and `limit` in `entity_filters` (`TargetEntityFilters`, `TargetSortItem`), and `getTargetQueries` returns them as Elasticsearch sort fields and a result limit. Also syncs the `entity_ui` (Next Best Action) campaign channel and the `504` response of campaign setup.
