# Messaging Settings API

**Base URL:** `https://email-settings.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/email-settings](https://docs.epilot.io/api/email-settings)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.emailSettings.provisionEpilotEmailAddress(...)

// Or get the client explicitly
const emailSettingsClient = await epilot.emailSettings.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/email-settings'

const emailSettingsClient = await getClient()
authorize(emailSettingsClient, () => '<token>')
const { data } = await emailSettingsClient.provisionEpilotEmailAddress(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/email-settings'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Email addresses**
- [`provisionEpilotEmailAddress`](#provisionepilotemailaddress)
- [`setEmailAddressPrimary`](#setemailaddressprimary)
- [`getEmailAddress`](#getemailaddress)
- [`deleteEmailAddress`](#deleteemailaddress)
- [`updateEmailAddress`](#updateemailaddress)
- [`listEmailAddresses`](#listemailaddresses)
- [`addEmailAddress`](#addemailaddress)

**Shared inboxes**
- [`getSharedInbox`](#getsharedinbox)
- [`deleteSharedInbox`](#deletesharedinbox)
- [`updateSharedInbox`](#updatesharedinbox)
- [`listSharedInboxes`](#listsharedinboxes)
- [`addSharedInbox`](#addsharedinbox)

**Inbox buckets**
- [`listInboxBuckets`](#listinboxbuckets)

**O365 Outlook Connection**
- [`connectOutlook`](#connectoutlook)
- [`getOutlookConnectionStatus`](#getoutlookconnectionstatus)
- [`disconnectOutlook`](#disconnectoutlook)
- [`connectOutlookMailbox`](#connectoutlookmailbox)
- [`disconnectOutlookMailbox`](#disconnectoutlookmailbox)
- [`startMailboxSync`](#startmailboxsync)
- [`getMailboxSyncStatus`](#getmailboxsyncstatus)
- [`retryMailboxSync`](#retrymailboxsync)
- [`getConnectedOutlookEmails`](#getconnectedoutlookemails)
- [`outlookOAuthCallback`](#outlookoauthcallback)

**Settings**
- [`getSettings`](#getsettings)
- [`addSetting`](#addsetting)
- [`deleteSetting`](#deletesetting)
- [`updateSetting`](#updatesetting)

**Domains**
- [`addDomain`](#adddomain)
- [`deleteDomain`](#deletedomain)
- [`verifyNameServers`](#verifynameservers)
- [`verifyDomain`](#verifydomain)

### `provisionEpilotEmailAddress`

Provisions or reactivates an epilot-managed email address for the organization.

`PUT /v2/email-settings/email-addresses/epilot:provision`

```ts
const { data } = await client.provisionEpilotEmailAddress(
  null,
  {
    address: 'mycompany@epilot.cloud'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": [
    "user-123",
    "user-456"
  ],
  "group_ids": [
    "group-789"
  ],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

---

### `setEmailAddressPrimary`

Sets the specified email address as the primary address for the organization.

`POST /v2/email-settings/email-addresses/primary`

```ts
const { data } = await client.setEmailAddressPrimary(
  null,
  {
    address: 'sales@yourcompany.com'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": [
    "user-123",
    "user-456"
  ],
  "group_ids": [
    "group-789"
  ],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

---

### `getEmailAddress`

Retrieves the details of a specific email address by its ID.

`GET /v2/email-settings/email-addresses/{id}`

```ts
const { data } = await client.getEmailAddress({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": [
    "user-123",
    "user-456"
  ],
  "group_ids": [
    "group-789"
  ],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

---

### `deleteEmailAddress`

Permanently deletes an email address from the organization.

`DELETE /v2/email-settings/email-addresses/{id}`

```ts
const { data } = await client.deleteEmailAddress({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `updateEmailAddress`

Updates the configuration of an existing email address.

`PUT /v2/email-settings/email-addresses/{id}`

```ts
const { data } = await client.updateEmailAddress(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'Sales Team',
    user_ids: [
      'user-123',
      'user-456'
    ],
    group_ids: [
      'group-789'
    ],
    default_signature_id: 'sig-abc',
    shared_inbox_id: 'inbox-xyz',
    is_active: true
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": [
    "user-123",
    "user-456"
  ],
  "group_ids": [
    "group-789"
  ],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

---

### `listEmailAddresses`

Retrieves all email addresses configured for the organization.

`GET /v2/email-settings/email-addresses`

```ts
const { data } = await client.listEmailAddresses()
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456",
    "address": "sales@yourcompany.com",
    "name": "Sales Team",
    "user_ids": [
      "user-123",
      "user-456"
    ],
    "group_ids": [
      "group-789"
    ],
    "default_signature_id": "sig-abc",
    "shared_inbox_id": "inbox-xyz",
    "is_active": true,
    "is_primary": false,
    "is_epilot_email_address": false
  }
]
```

---

### `addEmailAddress`

Adds a new email address to the organization.

`POST /v2/email-settings/email-addresses`

```ts
const { data } = await client.addEmailAddress(
  null,
  {
    address: 'support@yourcompany.com',
    name: 'Customer Support',
    user_ids: [
      'user-123'
    ],
    group_ids: [
      'group-456'
    ],
    default_signature_id: 'sig-789',
    shared_inbox_id: 'inbox-abc'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": [
    "user-123",
    "user-456"
  ],
  "group_ids": [
    "group-789"
  ],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

---

### `getSharedInbox`

Retrieves the details of a specific shared inbox by its ID.

`GET /v2/email-settings/shared-inboxes/{id}`

```ts
const { data } = await client.getSharedInbox({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": [
    "user-123",
    "user-456"
  ],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

---

### `deleteSharedInbox`

Deletes a shared inbox and reroutes all associated emails to a successor inbox.

`DELETE /v2/email-settings/shared-inboxes/{id}`

```ts
const { data } = await client.deleteSharedInbox({
  id: '123e4567-e89b-12d3-a456-426614174000',
  successorInboxId: 'example',
})
```

---

### `updateSharedInbox`

Updates the configuration of an existing shared inbox.

`PUT /v2/email-settings/shared-inboxes/{id}`

```ts
const { data } = await client.updateSharedInbox(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    color: '#4CAF50',
    name: 'Customer Support',
    assignees: [
      'user-123',
      'user-456'
    ],
    description: 'Incoming customer support requests'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": [
    "user-123",
    "user-456"
  ],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

---

### `listSharedInboxes`

Retrieves all shared inboxes configured for the organization.

`GET /v2/email-settings/shared-inboxes`

```ts
const { data } = await client.listSharedInboxes()
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456",
    "name": "Customer Support",
    "color": "#4CAF50",
    "assignees": [
      "user-123",
      "user-456"
    ],
    "description": "Incoming customer support requests",
    "bucket_id": "bucket-xyz"
  }
]
```

---

### `addSharedInbox`

Creates a new shared inbox for the organization.

`POST /v2/email-settings/shared-inboxes`

```ts
const { data } = await client.addSharedInbox(
  null,
  {
    id: 'support-inbox',
    color: '#2196F3',
    name: 'Sales Inquiries',
    assignees: [
      'user-123',
      'user-456'
    ],
    description: 'Inbound sales and pricing requests'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": [
    "user-123",
    "user-456"
  ],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

---

### `listInboxBuckets`

Retrieves all inbox buckets for the organization.

`GET /v2/email-settings/inbox-buckets`

```ts
const { data } = await client.listInboxBuckets()
```

**Response**

```json
[
  {
    "id": "bucket-abc",
    "inbox_id": "inbox-xyz"
  }
]
```

---

### `connectOutlook`

Returns Microsoft authorization URL for Outlook OAuth.

`GET /v2/outlook/connect`

```ts
const { data } = await client.connectOutlook()
```

**Response**

```json
{
  "authorization_url": "string"
}
```

---

### `getOutlookConnectionStatus`

Returns all Microsoft 365 / Outlook connections for the organization.
Supports multiple connections (one per Azure AD tenant).

`GET /v2/outlook/connection/status`

```ts
const { data } = await client.getOutlookConnectionStatus()
```

**Response**

```json
{
  "connections": [
    {
      "status": "connected",
      "action": "connect",
      "connected_by_display_name": "string",
      "connected_by_email": "user@example.com",
      "connected_by_user_id": "string",
      "connected_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "tenant_id": "string",
      "scopes": [],
      "expires_at": "1970-01-01T00:00:00.000Z",
      "is_token_valid": true
    }
  ],
  "has_connections": true
}
```

---

### `disconnectOutlook`

Removes the Microsoft 365 / Outlook connection for a specific tenant.
This deletes the stored tokens and disconnects the integration.

`POST /v2/outlook/connection/disconnect`

```ts
const { data } = await client.disconnectOutlook(
  null,
  {
    tenant_id: 'string'
  },
)
```

**Response**

```json
{
  "success": true,
  "tenant_id": "string",
  "affected_shared_inboxes": [
    "string"
  ]
}
```

---

### `connectOutlookMailbox`

Connects an Outlook mailbox:
  1. Validates the user has access to the mailbox via Microsoft Graph API
  2. Creates a mapping between the email address of the mailbox and the outlook connection
  3. E

`POST /v2/outlook/mailbox/connect`

```ts
const { data } = await client.connectOutlookMailbox(
  null,
  {
    email: 'user@example.com',
    shared_inbox_id: 'default',
    mailboxSyncTimeframe: '5m'
  },
)
```

**Response**

```json
{
  "email_address": {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456",
    "address": "sales@yourcompany.com",
    "name": "Sales Team",
    "user_ids": [
      "user-123",
      "user-456"
    ],
    "group_ids": [
      "group-789"
    ],
    "default_signature_id": "sig-abc",
    "shared_inbox_id": "inbox-xyz",
    "is_active": true,
    "is_primary": false,
    "is_epilot_email_address": false
  },
  "outlook_email": "user@example.com",
  "tenant_id": "string",
  "provider": "outlook"
}
```

---

### `disconnectOutlookMailbox`

Disconnect Outlook Mailbox

`POST /v2/outlook/mailbox/{email}/disconnect`

```ts
const { data } = await client.disconnectOutlookMailbox({
  email: 'example',
})
```

**Response**

```json
{
  "success": true,
  "email": "user@example.com"
}
```

---

### `startMailboxSync`

Start Mailbox Sync

`POST /v2/outlook/mailbox/{email}/sync`

```ts
const { data } = await client.startMailboxSync(
  {
    email: 'example',
  },
  {
    timeframe: '5m'
  },
)
```

---

### `getMailboxSyncStatus`

Get Mailbox Sync Status

`GET /v2/outlook/mailbox/{email}/sync/status`

```ts
const { data } = await client.getMailboxSyncStatus({
  email: 'example',
})
```

**Response**

```json
{
  "execution_id": "string",
  "status": "RUNNING",
  "timeframe": "5m",
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "inbox": {
    "status": "PENDING",
    "total_messages": 0,
    "processed_messages": 0,
    "failed_messages": 0
  },
  "sent_items": {
    "status": "PENDING",
    "total_messages": 0,
    "processed_messages": 0,
    "failed_messages": 0
  }
}
```

---

### `retryMailboxSync`

Retry Failed Messages

`POST /v2/outlook/mailbox/{email}/sync/retry`

```ts
const { data } = await client.retryMailboxSync(
  {
    email: 'example',
  },
  {
    sync_id: 'string',
    scope: 'all_failed',
    message_ids: [
      'string'
    ]
  },
)
```

---

### `getConnectedOutlookEmails`

Returns all Outlook email addresses connected to the organization.

`GET /v2/outlook/mailbox/mappings`

```ts
const { data } = await client.getConnectedOutlookEmails()
```

**Response**

```json
{
  "outlook_emails": [
    {
      "outlook_email": "user@example.com",
      "tenant_id": "string",
      "provider": "outlook",
      "connected_at": "1970-01-01T00:00:00.000Z",
      "connected_by_user_id": "string"
    }
  ],
  "count": 0
}
```

---

### `outlookOAuthCallback`

Exchanges authorization code for tokens and stores them.

`GET /v2/outlook/oauth/callback`

```ts
const { data } = await client.outlookOAuthCallback({
  code: 'example',
  state: 'example',
  session_state: 'example',
  error: 'example',
  error_description: 'example',
  error_subcode: 'example',
  client_info: 'example',
  error_uri: 'example',
  admin_consent: 'example',
  tenant: 'example',
})
```

**Response**

```json
{
  "connected": true,
  "expires_at": "1970-01-01T00:00:00.000Z",
  "scope": "string"
}
```

---

### `getSettings`

Retrieves settings of a specific type for the organization.

`GET /v1/email-settings`

```ts
const { data } = await client.getSettings({
  type: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "name": "Default Signature",
    "org_id": "org-123",
    "type": "signature",
    "value": "Best regards, The Team",
    "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456"
  }
]
```

---

### `addSetting`

Creates a new setting of the specified type.

`POST /v1/email-settings`

```ts
const { data } = await client.addSetting(
  null,
  {
    id: 'a10bd0ff-4391-4cfc-88ee-b19d718a9bf7',
    name: 'Default Signature',
    org_id: 'org-123',
    type: 'signature',
    value: 'Best regards, The Team',
    html: '<p>Best regards,<br/><strong>The Team</strong></p>',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:45:00Z',
    created_by: 'user-123',
    updated_by: 'user-456'
  },
)
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "name": "Default Signature",
    "org_id": "org-123",
    "type": "signature",
    "value": "Best regards, The Team",
    "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456"
  }
]
```

---

### `deleteSetting`

Deletes a setting by its ID and type.

`DELETE /v1/email-settings`

```ts
const { data } = await client.deleteSetting(
  null,
  {
    type: 'signature',
    id: 'a10bd0ff-4391-4cfc-88ee-b19d718a9bf7'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "name": "Default Signature",
  "org_id": "org-123",
  "type": "signature",
  "value": "Best regards, The Team",
  "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456"
}
```

---

### `updateSetting`

Updates an existing setting identified by its ID.

`POST /v1/email-settings/{id}`

```ts
const { data } = await client.updateSetting(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'a10bd0ff-4391-4cfc-88ee-b19d718a9bf7',
    name: 'Default Signature',
    org_id: 'org-123',
    type: 'signature',
    value: 'Best regards, The Team',
    html: '<p>Best regards,<br/><strong>The Team</strong></p>',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:45:00Z',
    created_by: 'user-123',
    updated_by: 'user-456'
  },
)
```

**Response**

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "name": "Default Signature",
  "org_id": "org-123",
  "type": "signature",
  "value": "Best regards, The Team",
  "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456"
}
```

---

### `addDomain`

Adds a custom email domain to the organization.

`POST /v1/email-settings/domain`

```ts
const { data } = await client.addDomain(
  null,
  {
    domain: 'mail.yourcompany.com'
  },
)
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "name": "Default Signature",
    "org_id": "org-123",
    "type": "signature",
    "value": "Best regards, The Team",
    "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456"
  }
]
```

---

### `deleteDomain`

Removes a custom email domain from the organization.

`DELETE /v1/email-settings/domain`

```ts
const { data } = await client.deleteDomain(
  null,
  {
    domain: 'mail.yourcompany.com'
  },
)
```

---

### `verifyNameServers`

Verifies that the domain's name server (NS) records are correctly configured.

`POST /v1/email-settings/domain/name-servers:verify`

```ts
const { data } = await client.verifyNameServers(
  null,
  {
    domain: 'mail.yourcompany.com'
  },
)
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "name": "Default Signature",
    "org_id": "org-123",
    "type": "signature",
    "value": "Best regards, The Team",
    "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456"
  }
]
```

---

### `verifyDomain`

Verifies ownership and configuration of a custom email domain.

`POST /v1/email-settings/domain:verify`

```ts
const { data } = await client.verifyDomain(
  null,
  {
    domain: 'mail.yourcompany.com'
  },
)
```

**Response**

```json
[
  {
    "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
    "name": "Default Signature",
    "org_id": "org-123",
    "type": "signature",
    "value": "Best regards, The Team",
    "html": "<p>Best regards,<br/><strong>The Team</strong></p>",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "created_by": "user-123",
    "updated_by": "user-456"
  }
]
```

---

## Schemas

### `MailboxSyncStatus`

```ts
type MailboxSyncStatus = {
  execution_id: string
  status: "RUNNING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "CANCELLED"
  timeframe: "5m" | "1w" | "2w" | "1m"
  started_at: string // date-time
  completed_at?: string // date-time
  inbox?: {
    status?: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED"
    total_messages?: number
    processed_messages?: number
    failed_messages?: number
  }
  sent_items?: {
    status?: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED"
    total_messages?: number
    processed_messages?: number
    failed_messages?: number
  }
}
```

### `MailboxSyncStatuses`

```ts
type MailboxSyncStatuses = "RUNNING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "CANCELLED"
```

### `MailboxSyncFolderStatuses`

```ts
type MailboxSyncFolderStatuses = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED"
```

### `MailboxSyncTimeframePeriods`

```ts
type MailboxSyncTimeframePeriods = "5m" | "1w" | "2w" | "1m"
```

### `InboxBucketResponse`

Inbox bucket representing the storage container for a shared inbox.

```ts
type InboxBucketResponse = {
  id: string
  inbox_id: string
}
```

### `ProvisionEpilotEmailAddressPayload`

Request payload for provisioning an epilot-managed email address.

```ts
type ProvisionEpilotEmailAddressPayload = {
  address: string
}
```

### `SetEmailAddressPrimaryPayload`

Request payload for setting an email address as the organization's primary address.

```ts
type SetEmailAddressPrimaryPayload = {
  address: string
}
```

### `UpdateEmailAddressPayload`

Request payload for updating an email address configuration.
All fields are optional; only provided fields will be updated.


```ts
type UpdateEmailAddressPayload = {
  name?: string
  user_ids?: string[]
  group_ids?: string[]
  default_signature_id?: string
  shared_inbox_id?: string
  is_active?: boolean
}
```

### `CreateEmailAddressPayload`

Request payload for creating a new email address.

```ts
type CreateEmailAddressPayload = {
  address: string
  name?: string
  user_ids?: string[]
  group_ids?: string[]
  default_signature_id?: string
  shared_inbox_id?: string
}
```

### `EmailAddressResponse`

Email address configuration with all associated metadata.

```ts
type EmailAddressResponse = {
  id: string
  created_at: string // date-time
  updated_at?: string // date-time
  created_by?: string
  updated_by?: string
  address: string
  name?: string
  user_ids?: string[]
  group_ids?: string[]
  default_signature_id?: string
  shared_inbox_id?: string
  is_active?: boolean
  is_primary?: boolean
  is_epilot_email_address?: boolean
}
```

### `ErrorResponse`

Standard error response format for all API errors.

```ts
type ErrorResponse = {
  error: string
  status: number
}
```

### `SettingMeta`

Common metadata fields for all settings and resources.

```ts
type SettingMeta = {
  id: string
  created_at: string // date-time
  updated_at?: string // date-time
  created_by?: string
  updated_by?: string
}
```

### `UpdateSharedInboxPayload`

Request payload for updating a shared inbox configuration.
All fields are optional; only provided fields will be updated.


```ts
type UpdateSharedInboxPayload = {
  color?: string
  name?: string
  assignees?: string[]
  description?: string
}
```

### `CreateSharedInboxPayload`

Request payload for creating a new shared inbox.

```ts
type CreateSharedInboxPayload = {
  id?: string
  color: string
  name: string
  assignees?: string[]
  description?: string
}
```

### `SharedInboxResponse`

Shared inbox configuration with all associated metadata.

```ts
type SharedInboxResponse = {
  id: string
  created_at: string // date-time
  updated_at?: string // date-time
  created_by?: string
  updated_by?: string
  name: string
  color: string
  assignees: string[]
  description?: string
  bucket_id: string
}
```

### `SettingsResponse`

```ts
type SettingsResponse = Array<{
  id?: string
  name?: string
  org_id?: string
  type: "signature" | "email_domain" | "email_address" | "whitelist_email_address" | "restrict_duplicates_within"
  value?: string
  html?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}> | {
  id?: string
  name?: string
  org_id?: string
  type: "signature" | "email_domain" | "email_address" | "whitelist_email_address" | "restrict_duplicates_within"
  value?: string
  html?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}
```

### `ConnectedOutlookEmail`

Mapping between an Outlook email and its Outlook Connection.
This tracks which provider/tenant provisions each Outlook email.


```ts
type ConnectedOutlookEmail = {
  outlook_email: string // email
  tenant_id?: string
  provider?: "outlook"
  connected_at?: string // date-time
  connected_by_user_id?: string
}
```

### `OutlookConnectionError`

```ts
type OutlookConnectionError = {
  error: string
  error_description?: string
  admin_consent_url?: string // uri
}
```

### `OutlookConnectionStatus`

```ts
type OutlookConnectionStatus = {
  status: "connected" | "expired" | "pending_auth" | "not_connected"
  action: "connect" | "authorize" | "reconnect" | "none"
  connected_by_display_name?: string
  connected_by_email?: string // email
  connected_by_user_id?: string
  connected_at?: string // date-time
  updated_at?: string // date-time
  tenant_id: string
  scopes?: string[]
  expires_at?: string // date-time
  is_token_valid?: boolean
}
```

### `SignatureSetting`

Setting that allows to add a signature.

```ts
type SignatureSetting = "signature"
```

### `EmailDomainSetting`

Setting that allows to add a custom domain. For e.g; doe.com

```ts
type EmailDomainSetting = "email_domain"
```

### `EmailAddressSetting`

Setting that allows to add an email address on the custom domain. For e.g; john@doe.com

```ts
type EmailAddressSetting = "email_address"
```

### `WhitelistEmailAddressSetting`

- Setting that specifies a list of addresses exempt from being flagged as duplicate emails.
- An email will be flagged as a duplicate if it has the same content and is sent to the same recipient within the time frame specified in the RestrictDuplicatesWithinSetting.


```ts
type WhitelistEmailAddressSetting = "whitelist_email_address"
```

### `RestrictDuplicatesWithinSetting`

- Restrict duplicates within:
  * 10s
  * 5m
  * 1d
  * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
- Defaults to 3 minutes
- Negative values will be treated same as positive values
- If not set, defaults to 3 min
- If set as

```ts
type RestrictDuplicatesWithinSetting = "restrict_duplicates_within"
```

### `SettingType`

```ts
type SettingType = "signature" | "email_domain" | "email_address" | "whitelist_email_address" | "restrict_duplicates_within"
```

### `Setting`

Generic setting object used for various email configuration types.
The applicable fields depend on the setting type:
- **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
- **email_domain**: Uses `value` (domain name)
- **whitelist_email_address**: Uses `value` (email address)
-

```ts
type Setting = {
  id?: string
  name?: string
  org_id?: string
  type: "signature" | "email_domain" | "email_address" | "whitelist_email_address" | "restrict_duplicates_within"
  value?: string
  html?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}
```

### `Domain`

Custom email domain configuration.

```ts
type Domain = {
  domain?: string
}
```
