---
"@epilot/email-settings-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add `cancelMailboxSync` (`POST /v2/outlook/mailbox/{email}/sync/cancel`) to stop a running Outlook mailbox sync, and sync the email-settings spec with the deployed API (pricing-tier 403 responses, sandbox `allowed_recipient_domains` setting, updated descriptions)
