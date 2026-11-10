---
"@epilot/sdk": minor
---

Keep other APIs' docs and specs out of subpath imports

`createApiClient` attached `help()` and `openapi()` through lookups by API name, which reference the docs and OpenAPI specs of every API. A bundler that writes a single file (esbuild without code splitting, the usual Lambda build) inlined all of them: about 6 MB for one `@epilot/sdk/<api>` import.

Each API module now loads its own docs and spec by static path, so only those are included. `help` and `openapi` are also exported from every `@epilot/sdk/<api>` subpath, as the README documents for `openapi`.
