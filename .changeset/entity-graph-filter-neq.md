---
"@epilot/entity-client": minor
"@epilot/sdk": patch
"@epilot/cli": patch
---

Entity API: graph node filters (`GraphNodeFilter`, used by `queryEntityGraph`) accept an optional `operator`: `eq` (default) or `neq` (keep entities whose attribute does not equal `value`, including entities missing the attribute).
