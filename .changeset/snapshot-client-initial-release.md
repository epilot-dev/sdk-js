---
"@epilot/snapshot-client": minor
---

Initial release of `@epilot/snapshot-client` — TypeScript client for the
epilot Snapshot API. Generated from the same openapi spec as the service;
follows the standard `getClient()` pattern used by the other epilot
clients in this monorepo.

Covers: createSnapshot, listSnapshots, getSnapshot, deleteSnapshot,
restoreSnapshot, listSnapshotResources, getSnapshotResource,
listDependencies.
