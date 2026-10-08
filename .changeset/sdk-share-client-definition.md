---
"@epilot/sdk": patch
---

Share one API definition between `getClient()` and every `createClient()`

`createClient()` expanded a new definition object on every call. openapi-client-axios then deep-cloned and dereferenced each one, and with `dereference-json-schema` < 0.2.3 (resolved by `openapi-client-axios` ≤ 7.9.1 lockfiles) cached it in a module-level `Map` that is never freed. Services that create a client per request or per message retained a full definition per call: ~85 KB for `entity`, enough to run a Lambda container out of memory within a few thousand messages.

Each API module and `createSDK()` registry entry now expands its definition once and reuses it. Clients stay independent: every `createClient()` still has its own axios instance, default headers and interceptors.
