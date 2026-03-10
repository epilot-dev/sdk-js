# Messaging Settings API

**API Name:** `email-settings`
**Base URL:** `https://email-settings.sls.epilot.io`

The Messaging Settings API provides comprehensive management of email configurations for epilot organizations.

## Overv

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `provisionEpilotEmailAddress` | PUT | `/v2/email-settings/email-addresses/epilot:provision` | provisionEpilotEmailAddress |
| `setEmailAddressPrimary` | POST | `/v2/email-settings/email-addresses/primary` | setEmailAddressPrimary |
| `getEmailAddress` | GET | `/v2/email-settings/email-addresses/{id}` | getEmailAddress |
| `updateEmailAddress` | PUT | `/v2/email-settings/email-addresses/{id}` | updateEmailAddress |
| `deleteEmailAddress` | DELETE | `/v2/email-settings/email-addresses/{id}` | deleteEmailAddress |
| `listEmailAddresses` | GET | `/v2/email-settings/email-addresses` | listEmailAddresses |
| `addEmailAddress` | POST | `/v2/email-settings/email-addresses` | addEmailAddress |
| `getSharedInbox` | GET | `/v2/email-settings/shared-inboxes/{id}` | getSharedInbox |
| `updateSharedInbox` | PUT | `/v2/email-settings/shared-inboxes/{id}` | updateSharedInbox |
| `deleteSharedInbox` | DELETE | `/v2/email-settings/shared-inboxes/{id}` | deleteSharedInbox |
| `listSharedInboxes` | GET | `/v2/email-settings/shared-inboxes` | listSharedInboxes |
| `addSharedInbox` | POST | `/v2/email-settings/shared-inboxes` | addSharedInbox |
| `listInboxBuckets` | GET | `/v2/email-settings/inbox-buckets` | listInboxBuckets |
| `connectOutlook` | GET | `/v2/outlook/connect` | connectOutlook |
| `getOutlookConnectionStatus` | GET | `/v2/outlook/connection/status` | getOutlookConnectionStatus |
| `disconnectOutlook` | POST | `/v2/outlook/connection/disconnect` | disconnectOutlook |
| `connectOutlookMailbox` | POST | `/v2/outlook/mailbox/connect` | connectOutlookMailbox |
| `disconnectOutlookMailbox` | POST | `/v2/outlook/mailbox/{email}/disconnect` | Disconnect Outlook Mailbox |
| `startMailboxSync` | POST | `/v2/outlook/mailbox/{email}/sync` | Start Mailbox Sync |
| `getMailboxSyncStatus` | GET | `/v2/outlook/mailbox/{email}/sync/status` | Get Mailbox Sync Status |
| `retryMailboxSync` | POST | `/v2/outlook/mailbox/{email}/sync/retry` | Retry Failed Messages |
| `getConnectedOutlookEmails` | GET | `/v2/outlook/mailbox/mappings` | getConnectedOutlookEmails |
| `outlookOAuthCallback` | GET | `/v2/outlook/oauth/callback` | outlookOAuthCallback |
| `getSettings` | GET | `/v1/email-settings` | getSettings |
| `addSetting` | POST | `/v1/email-settings` | addSetting |
| `deleteSetting` | DELETE | `/v1/email-settings` | deleteSetting |
| `updateSetting` | POST | `/v1/email-settings/{id}` | updateSetting |
| `addDomain` | POST | `/v1/email-settings/domain` | addDomain |
| `deleteDomain` | DELETE | `/v1/email-settings/domain` | deleteDomain |
| `verifyNameServers` | POST | `/v1/email-settings/domain/name-servers:verify` | verifyNameServers |
| `verifyDomain` | POST | `/v1/email-settings/domain:verify` | verifyDomain |

## Usage

```bash
epilot email-settings provisionEpilotEmailAddress
```
