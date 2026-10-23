---
'@epilot/integration-toolkit-client': minor
---

Regenerate from Integration Toolkit spec 1.50.0.

- Ingest responses gain an optional `correlation_close` (`CorrelationCloseResult`) reporting whether a `correlation_complete` close was `applied`, `rate_limited` or `ignored`, with `reasons` and a `message`.
- Correlation status and wait results gain `complete`, `completed_at`, `errors_total`, `entities_omitted`, `undecided_entity_requirements` and per-requirement `required` / `after_completion` details.
- Monitoring run summaries gain `entries` (rows counted by level, including `retry`); `code` is typed as `MonitoringCode | string`.
- New `PROCESSING_STATE_LIMIT` monitoring code and refined `CORRELATION_*` descriptions in the code catalog.
- The four v1 monitoring operations now carry `deprecated: true` in the runtime definition.
