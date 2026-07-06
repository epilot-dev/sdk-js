---
"@epilot/customer-portal-client": minor
---

Update customer-portal export endpoints to the column-config contract (MO-2626)

- `createExport` (`POST /v1/portal/exports`) — now takes a JSON body with required `schema` and ordered `columns` (new `PortalDataExportColumn` schema: key, localized header, source path/attribute, formatter, enum_labels), plus optional `search`, `expand_over` and `language`. Replaces the earlier draft that only accepted a `language` query param.
- `getExport` (`GET /v1/portal/exports/{jobId}`) — unchanged; poll status (`queued`/`running`/`ready`/`failed`/`expired`) and pick up the short-lived `downloadUrl` when ready.
