---
"@epilot/configuration-hub-client": minor
"@epilot/sdk": minor
"@epilot/cli": minor
---

Refresh the Configuration Hub API contract from the published spec: deterministic sync conflicts on plans (`SyncPlanConflict` with `target_edited`, `both_edited`, `target_only_removed`, `mostly_replaced`; `plan.conflicts`, `summary.conflicts`, `conflicts_checked_at`), the `has_conflicts` filter on `listSyncJobResources`, `overwrite_conflicts` on `applySyncPlan` (409 `unresolved_conflicts`), and the health finding codes `env_value_missing` / `secret_value_missing`.
