---
"@epilot/targeting-client": minor
---

Add `from` offset parameter to `getRecipients`

- `getRecipients` (`GET /v1/campaign/{campaign_id}/recipients`) now accepts an optional `from` query parameter — a zero-based offset of the first item to return. This enables direct (random-access) pagination to any page in a single request, instead of walking `next` cursors page by page. When `from` is provided it takes precedence over `next`.
