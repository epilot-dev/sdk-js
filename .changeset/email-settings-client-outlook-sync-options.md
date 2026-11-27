---
"@epilot/email-settings-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Outlook mailbox sync options: new `OutlookMailboxSyncOptions` schema (`deletion_policy` of `mirror`, `mirror_recent` or `keep`, plus `recent_window_days`), optional `sync_options` on `ConnectedOutlookEmail` and the `connectOutlookMailbox` request body, and a new `updateOutlookMailboxSyncOptions` operation (`PUT /v2/outlook/mailbox/{email}/sync-options`)
