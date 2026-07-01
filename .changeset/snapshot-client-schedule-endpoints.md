---
"@epilot/snapshot-client": minor
---

Add scheduled-snapshot endpoints, regenerated from the published Snapshot API
spec:

- `getOrgSnapshotSchedule`
- `putOrgSnapshotSchedule`
- `deleteOrgSnapshotSchedule`

Consumers can now call these as typed client methods instead of raw axios
requests. `captureOrgSnapshot` was already present.
