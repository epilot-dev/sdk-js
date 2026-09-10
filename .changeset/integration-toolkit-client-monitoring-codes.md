---
'@epilot/integration-toolkit-client': minor
'@epilot/sdk': minor
---

Publish the monitoring code catalog. `MONITORING_CODES` gives the level and an operator-facing description for every code the Integration Toolkit emits, and `describeMonitoringCode()` resolves any code seen on an event — including the `HTTP_{status}` family the secure proxy emits, returning `undefined` only for a code it cannot place so callers can render a fallback.

The descriptions previously lived only in the integration hub, which made a frontend the source of truth for a backend taxonomy: eleven `SECURE_PROXY_*` codes existed nowhere else, and six had no description at all. They are now owned by erp-integration-api, where a code without a description is a compile error, and generated into this package from an asserted snapshot.

The code union itself is not redefined here — it comes from the spec's new `MonitoringCode` enum, so there is one definition of the list. The bundled spec also moves to 1.31.0, which corrects the v2 monitoring level enum (`info`, not `skipped` — the latter could never be stored, and `info` could not be filtered for) and adds `info_count` to the stats and time-series responses.
