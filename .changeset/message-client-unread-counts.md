---
"@epilot/message-client": minor
---

Add `getUnreadCounts` for the consolidated unread-counts endpoint

`POST /v1/message/unread:counts` returns unread counts for several named scopes in one request. A scope is a name plus the parameters the thread list already takes (`q`, `inbox_id`), and the server adds only the read-state condition — so a badge and the list beneath it are one predicate rather than two authored copies. The `organization` scope is the exception and takes no `q`, reusing the four canonical central-inbox queries so its numbers match `getUnread` exactly.

Gated on the `message-unread-counts` flag: with it off the response is `{ "enabled": false, "counts": {} }`.
