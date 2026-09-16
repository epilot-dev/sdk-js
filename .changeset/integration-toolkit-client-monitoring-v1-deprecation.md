---
'@epilot/integration-toolkit-client': minor
---

Regenerate from Integration Toolkit spec 1.33.0.

`NotificationRule` gains an optional `last_evaluation` object — `evaluated_at`, `observed`, `threshold` and an optional `suppressed_reason: 'sample_size'`. A rule that neither fires nor transitions previously left no trace at all, so there was no way to answer "why isn't this rule firing?"; `suppressed_reason` distinguishes a rule that evaluated healthy from one the success-rate minimum-sample guard stopped evaluating altogether.

The v2 monitoring event filter accepts `level: 'skipped'` again. It can never match — the pipeline normalises `skipped` to `info` and the table's enum has no such member — but request validation no longer rejects it, so a client with a saved `level=skipped` filter gets an empty `200` instead of a `400`. It is accepted on the filter only, not on `MonitoringEventV2`. Use `info` instead.

The four v1 monitoring operations — `queryInboundMonitoringEvents`, `queryOutboundMonitoringEvents`, `getMonitoringStats` and `getMonitoringTimeSeries` — are marked deprecated. The `erp_monitoring` and `webhook_events` tables behind them have been retired in favour of the unified `erp_monitoring_v2` table. They still respond `200` with empty results and zeroed counters so existing callers do not 404, but they read no data. Move to the v2 equivalents under `/v2/integrations/{integrationId}/monitoring/`.
