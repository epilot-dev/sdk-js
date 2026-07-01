# @epilot/snapshot-client

## 0.2.0

### Minor Changes

- e25d140: Initial release of `@epilot/snapshot-client` — TypeScript client for the
  epilot Snapshot API. Generated from the same openapi spec as the service;
  follows the standard `getClient()` pattern used by the other epilot
  clients in this monorepo.

  Covers: createSnapshot, listSnapshots, getSnapshot, deleteSnapshot,
  restoreSnapshot, listSnapshotResources, getSnapshotResource,
  listDependencies.

- 5c2d525: Add scheduled-snapshot endpoints, regenerated from the published Snapshot API
  spec:

  - `getOrgSnapshotSchedule`
  - `putOrgSnapshotSchedule`
  - `deleteOrgSnapshotSchedule`

  Consumers can now call these as typed client methods instead of raw axios
  requests. `captureOrgSnapshot` was already present.
