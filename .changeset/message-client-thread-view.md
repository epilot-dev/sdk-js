---
"@epilot/message-client": minor
---

Add `ThreadView` and the structured-view parameters for server-side predicate compilation

`threads:search` and `threads:searchIds` accept a `view` describing a central-inbox view structurally — folder, mailbox, labels, purposes, state filters, from/to, assignees, date range, free text — which the service compiles to a query, so a view's list and its unread count are one predicate rather than two hand-authored copies. `user_groups` travels alongside it, because the caller's groups live on the access token rather than the id token the service parses.

`q` becomes optional on `SearchParamsV2` and `SearchIDParams`: a caller sends either predicate. Requests naming neither are refused by the service, and an empty-string `q` behaves as before.

`UnreadCountScope` gains `view_id`, so a count scope names the saved view it counts instead of restating that view's predicate on the wire.
