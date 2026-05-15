---
"@epilot/file-client": minor
---

Add async bulk ZIP download endpoints

- `createZipJob` (`POST /v1/files:zipJob`) — start an async job that bundles files into a ZIP and emails the requester when ready. Accepts either an explicit `file_entity_ids` list (≤1000) or an `entity_query` resolved server-side (≤10,000 files).
- `getZipJob` (`GET /v1/files:zipJob/{job_id}`) — poll status and pick up the signed download URL once the job completes.
