---
"@epilot/integration-toolkit-client": minor
"@epilot/sdk": minor
---

Add the pricing-file import operations to the integration-toolkit client

- `createErpImport` (`POST /v2/erp/imports`) — create a pricing-file import job from an uploaded file, starts the validate phase
- `listErpImports` (`GET /v2/erp/imports`) — list recent import jobs for the org, cursor-paginated
- `getErpImport` (`GET /v2/erp/imports/{importId}`) — poll a job's status, validation summary, and progress
- `executeErpImport` (`POST /v2/erp/imports/{importId}:execute`) — confirm and run the write phase of a validated (`READY`) job
- `abortErpImport` (`POST /v2/erp/imports/{importId}:abort`) — cooperatively stop a running job
