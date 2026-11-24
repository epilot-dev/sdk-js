---
'@epilot/sdk': patch
---

Stop per-API imports from pulling every API's docs into a bundle

Importing one client, e.g. `@epilot/sdk/pricing`, made bundlers emit a lazy chunk for the docs and OpenAPI spec of every API in the SDK (about 160 chunks, 5 MiB), because `client.help()` and `client.openapi()` looked their files up by name. Each `@epilot/sdk/<api>` entry now references only its own two files.

`help()` and `openapi()` behave as before, on clients and on the root `epilot` SDK.
