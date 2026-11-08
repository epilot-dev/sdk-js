---
"@epilot/email-settings-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Custom mailbox sync period: `startMailboxSync` accepts `since` (ISO date-time) instead of `timeframe`, `getMailboxSyncEstimate` takes a `since` query param, and `MailboxSyncTimeframePeriods` gains `custom` for syncs started from a `since`
