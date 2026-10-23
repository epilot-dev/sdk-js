---
"@epilot/cli": patch
"@epilot/sdk": patch
---

Remove the leftover ERP Integration API (`erp-integration`) files. The API was renamed to the Integration Toolkit API long ago and is served as `epilot integration-toolkit` / `@epilot/sdk/integration-toolkit`; the CLI no longer registered an `erp-integration` command and the SDK no longer loaded these definitions, but the stale 0.58.0 spec, types and docs were still shipped and indexed by docs tooling. Every one of its 43 operations exists under the same `operationId` in the Integration Toolkit API.
