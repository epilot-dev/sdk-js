---
'@epilot/integration-toolkit-client': patch
---

Regenerate from Integration Toolkit spec 1.33.1.

Operations now declare their required permissions via `x-epilot-permissions`: for example `integration:view` for reads, `integration:manage` for writes and `entity:view` for `triggerErp`. Public ERP ingest and simulation endpoints declare none. Metadata only; the generated types are unchanged.
