---
'@epilot/integration-toolkit-client': minor
---

Regenerate from Integration Toolkit spec 1.52.0.

- Entity mappings gain an optional `sharing` block (`IntegrationEntitySharing` / `IntegrationEntitySharingPartner`) that keeps the mapped entity shared with, or unshared from, partner organizations. `enabled` is a boolean or a JSONata expression.
- Mapping simulation results gain `sharing`, the evaluated partner list.
- New monitoring codes in `MonitoringCode` and the `MONITORING_CODES` catalog: `ENV_VAR_REF_*`, `PORTAL_REF_*`, `SHARING_*`, `MISSING_METER_UNIQUE_IDS`, `MISSING_METER_COUNTER_UNIQUE_IDS`, `RELATION_MISSING_UNIQUE_IDS`, `UNIQUE_ID_TYPE_DERIVATION_FAILED`, `ORG_DROPPED`, `SECURE_PROXY_OK`, `WEBHOOK_DELIVERY_FAILED` and `WEBHOOK_SKIPPED`.
- The `openapi:local` and `codes:local` scripts now read from `integration-toolkit-api` (formerly `erp-integration-api`).
