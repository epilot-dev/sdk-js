---
'@epilot/integration-toolkit-client': minor
---

Regenerate from Integration Toolkit spec 1.64.0.

- Integration lifecycle: `bootstrapIntegrationLifecycle` (`POST /v2/integrations/{integrationId}:bootstrap`), `notifyIntegrationConfigChanged` (`POST /v2/integrations/{integrationId}:config-changed`) and `getIntegrationLifecycle` (`GET /v2/integrations/{integrationId}/lifecycle`).
- Bulk import window: `getBulkImportWindow`, `putBulkImportWindow` and `deleteBulkImportWindow` on `/v1/bulk-imports/window`, with the `BulkImportWindow*` and `BulkImportLane` schemas.
- Ingest operations document `202` (`ERPUpdatesResponse`) and `429` (`IngestRetryLater`) responses.
- New `EVENT_TOO_WIDE` monitoring code and a refined sandbox-lane description in the code catalog.
