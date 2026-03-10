# Messaging Settings API

- **Base URL:** `https://email-settings.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/email-settings](https://docs.epilot.io/api/email-settings)

The Messaging Settings API provides comprehensive management of email configurations for epilot organizations.

## Quick Start

```bash
# List available operations
epilot email-settings

# Call an operation
epilot email-settings provisionEpilotEmailAddress
```

## Operations

**Email addresses**
- [`provisionEpilotEmailAddress`](#provisionepilotemailaddress) — Provisions or reactivates an epilot-managed email address for the organization.
- [`setEmailAddressPrimary`](#setemailaddressprimary) — Sets the specified email address as the primary address for the organization.
- [`getEmailAddress`](#getemailaddress) — Retrieves the details of a specific email address by its ID.
- [`updateEmailAddress`](#updateemailaddress) — Updates the configuration of an existing email address.
- [`deleteEmailAddress`](#deleteemailaddress) — Permanently deletes an email address from the organization.
- [`listEmailAddresses`](#listemailaddresses) — Retrieves all email addresses configured for the organization.
- [`addEmailAddress`](#addemailaddress) — Adds a new email address to the organization.

**Shared inboxes**
- [`getSharedInbox`](#getsharedinbox) — Retrieves the details of a specific shared inbox by its ID.
- [`updateSharedInbox`](#updatesharedinbox) — Updates the configuration of an existing shared inbox.
- [`deleteSharedInbox`](#deletesharedinbox) — Deletes a shared inbox and reroutes all associated emails to a successor inbox.
- [`listSharedInboxes`](#listsharedinboxes) — Retrieves all shared inboxes configured for the organization.
- [`addSharedInbox`](#addsharedinbox) — Creates a new shared inbox for the organization.

**Inbox buckets**
- [`listInboxBuckets`](#listinboxbuckets) — Retrieves all inbox buckets for the organization.

**O365 Outlook Connection**
- [`connectOutlook`](#connectoutlook) — Returns Microsoft authorization URL for Outlook OAuth.
- [`getOutlookConnectionStatus`](#getoutlookconnectionstatus) — Returns all Microsoft 365 / Outlook connections for the organization.
- [`disconnectOutlook`](#disconnectoutlook) — Removes the Microsoft 365 / Outlook connection for a specific tenant.
- [`connectOutlookMailbox`](#connectoutlookmailbox) — Connects an Outlook mailbox:
- [`disconnectOutlookMailbox`](#disconnectoutlookmailbox) — Disconnects a single Outlook mailbox by email address.
- [`startMailboxSync`](#startmailboxsync) — Triggers an Outlook mailbox sync for the specified email address.
- [`getMailboxSyncStatus`](#getmailboxsyncstatus) — Returns the current or latest sync status for the specified mailbox.
- [`retryMailboxSync`](#retrymailboxsync) — Retries failed messages from a previous sync execution.
- [`getConnectedOutlookEmails`](#getconnectedoutlookemails) — Returns all Outlook email addresses connected to the organization.
- [`outlookOAuthCallback`](#outlookoauthcallback) — Exchanges authorization code for tokens and stores them.

**Settings**
- [`getSettings`](#getsettings) — Retrieves settings of a specific type for the organization.
- [`addSetting`](#addsetting) — Creates a new setting of the specified type.
- [`deleteSetting`](#deletesetting) — Deletes a setting by its ID and type.
- [`updateSetting`](#updatesetting) — Updates an existing setting identified by its ID.

**Domains**
- [`addDomain`](#adddomain) — Adds a custom email domain to the organization.
- [`deleteDomain`](#deletedomain) — Removes a custom email domain from the organization.
- [`verifyNameServers`](#verifynameservers) — Verifies that the domain's name server (NS) records are correctly configured.
- [`verifyDomain`](#verifydomain) — Verifies ownership and configuration of a custom email domain.

### `provisionEpilotEmailAddress`

Provisions or reactivates an epilot-managed email address for the organization.

`PUT /v2/email-settings/email-addresses/epilot:provision`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings provisionEpilotEmailAddress \
  -d '{"address":"mycompany@epilot.cloud"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings provisionEpilotEmailAddress
```

With JSONata filter:

```bash
epilot email-settings provisionEpilotEmailAddress --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

</details>

---

### `setEmailAddressPrimary`

Sets the specified email address as the primary address for the organization.

`POST /v2/email-settings/email-addresses/primary`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings setEmailAddressPrimary \
  -d '{"address":"sales@yourcompany.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings setEmailAddressPrimary
```

With JSONata filter:

```bash
epilot email-settings setEmailAddressPrimary --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

</details>

---

### `getEmailAddress`

Retrieves the details of a specific email address by its ID.

`GET /v2/email-settings/email-addresses/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the email address. This can be either the UUID assigned
when the email address was created, or the email address string itself.
 |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getEmailAddress \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot email-settings getEmailAddress 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings getEmailAddress -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

</details>

---

### `updateEmailAddress`

Updates the configuration of an existing email address.

`PUT /v2/email-settings/email-addresses/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the email address. This can be either the UUID assigned
when the email address was created, or the email address string itself.
 |

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings updateEmailAddress \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot email-settings updateEmailAddress \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true
}'
```

Using positional args for path parameters:

```bash
epilot email-settings updateEmailAddress 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings updateEmailAddress -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings updateEmailAddress -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

</details>

---

### `deleteEmailAddress`

Permanently deletes an email address from the organization.

`DELETE /v2/email-settings/email-addresses/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the email address. This can be either the UUID assigned
when the email address was created, or the email address string itself.
 |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings deleteEmailAddress \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot email-settings deleteEmailAddress 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings deleteEmailAddress -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listEmailAddresses`

Retrieves all email addresses configured for the organization.

`GET /v2/email-settings/email-addresses`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings listEmailAddresses
```

With JSONata filter:

```bash
epilot email-settings listEmailAddresses --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
    "user_ids": ["user-123", "user-456"],
    "group_ids": ["group-789"],
    "default_signature_id": "sig-abc",
    "shared_inbox_id": "inbox-xyz",
    "is_active": true,
    "is_primary": false,
    "is_epilot_email_address": false
  }
]
```

</details>

---

### `addEmailAddress`

Adds a new email address to the organization.

`POST /v2/email-settings/email-addresses`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings addEmailAddress
```

With request body:

```bash
epilot email-settings addEmailAddress \
  -d '{
  "address": "support@yourcompany.com",
  "name": "Customer Support",
  "user_ids": ["user-123"],
  "group_ids": ["group-456"],
  "default_signature_id": "sig-789",
  "shared_inbox_id": "inbox-abc"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings addEmailAddress
```

With JSONata filter:

```bash
epilot email-settings addEmailAddress --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "address": "sales@yourcompany.com",
  "name": "Sales Team",
  "user_ids": ["user-123", "user-456"],
  "group_ids": ["group-789"],
  "default_signature_id": "sig-abc",
  "shared_inbox_id": "inbox-xyz",
  "is_active": true,
  "is_primary": false,
  "is_epilot_email_address": false
}
```

</details>

---

### `getSharedInbox`

Retrieves the details of a specific shared inbox by its ID.

`GET /v2/email-settings/shared-inboxes/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier (UUID) of the shared inbox.
Use `default` to reference the organization's default inbox.
 |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getSharedInbox \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot email-settings getSharedInbox 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings getSharedInbox -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": ["user-123", "user-456"],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

</details>

---

### `updateSharedInbox`

Updates the configuration of an existing shared inbox.

`PUT /v2/email-settings/shared-inboxes/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier (UUID) of the shared inbox.
Use `default` to reference the organization's default inbox.
 |

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings updateSharedInbox \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot email-settings updateSharedInbox \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "color": "#4CAF50",
  "name": "Customer Support",
  "assignees": ["user-123", "user-456"],
  "description": "Incoming customer support requests"
}'
```

Using positional args for path parameters:

```bash
epilot email-settings updateSharedInbox 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings updateSharedInbox -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings updateSharedInbox -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": ["user-123", "user-456"],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

</details>

---

### `deleteSharedInbox`

Deletes a shared inbox and reroutes all associated emails to a successor inbox.

`DELETE /v2/email-settings/shared-inboxes/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier (UUID) of the shared inbox.
Use `default` to reference the organization's default inbox.
 |
| `successorInboxId` | query | string | No | ID of the inbox that will receive emails from the deleted inbox.
If not provided, the default inbox (`default`) will be used as the successor.
 |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings deleteSharedInbox \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot email-settings deleteSharedInbox 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-settings deleteSharedInbox -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listSharedInboxes`

Retrieves all shared inboxes configured for the organization.

`GET /v2/email-settings/shared-inboxes`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings listSharedInboxes
```

With JSONata filter:

```bash
epilot email-settings listSharedInboxes --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
    "assignees": ["user-123", "user-456"],
    "description": "Incoming customer support requests",
    "bucket_id": "bucket-xyz"
  }
]
```

</details>

---

### `addSharedInbox`

Creates a new shared inbox for the organization.

`POST /v2/email-settings/shared-inboxes`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings addSharedInbox
```

With request body:

```bash
epilot email-settings addSharedInbox \
  -d '{
  "id": "support-inbox",
  "color": "#2196F3",
  "name": "Sales Inquiries",
  "assignees": ["user-123", "user-456"],
  "description": "Inbound sales and pricing requests"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings addSharedInbox
```

With JSONata filter:

```bash
epilot email-settings addSharedInbox --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "a10bd0ff-4391-4cfc-88ee-b19d718a9bf7",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "created_by": "user-123",
  "updated_by": "user-456",
  "name": "Customer Support",
  "color": "#4CAF50",
  "assignees": ["user-123", "user-456"],
  "description": "Incoming customer support requests",
  "bucket_id": "bucket-xyz"
}
```

</details>

---

### `listInboxBuckets`

Retrieves all inbox buckets for the organization.

`GET /v2/email-settings/inbox-buckets`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings listInboxBuckets
```

With JSONata filter:

```bash
epilot email-settings listInboxBuckets --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "bucket-abc",
    "inbox_id": "inbox-xyz"
  }
]
```

</details>

---

### `connectOutlook`

Returns Microsoft authorization URL for Outlook OAuth.

`GET /v2/outlook/connect`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings connectOutlook
```

With JSONata filter:

```bash
epilot email-settings connectOutlook --jsonata 'authorization_url'
```

<details>
<summary>Sample Response</summary>

```json
{
  "authorization_url": "string"
}
```

</details>

---

### `getOutlookConnectionStatus`

Returns all Microsoft 365 / Outlook connections for the organization.

`GET /v2/outlook/connection/status`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getOutlookConnectionStatus
```

With JSONata filter:

```bash
epilot email-settings getOutlookConnectionStatus --jsonata 'connections'
```

<details>
<summary>Sample Response</summary>

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
      "scopes": ["string"],
      "expires_at": "1970-01-01T00:00:00.000Z",
      "is_token_valid": true
    }
  ],
  "has_connections": true
}
```

</details>

---

### `disconnectOutlook`

Removes the Microsoft 365 / Outlook connection for a specific tenant.

`POST /v2/outlook/connection/disconnect`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings disconnectOutlook \
  -d '{"tenant_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings disconnectOutlook
```

With JSONata filter:

```bash
epilot email-settings disconnectOutlook --jsonata 'success'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true,
  "tenant_id": "string",
  "affected_shared_inboxes": ["string"]
}
```

</details>

---

### `connectOutlookMailbox`

Connects an Outlook mailbox:

`POST /v2/outlook/mailbox/connect`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings connectOutlookMailbox \
  -d '{"email":"user@example.com","shared_inbox_id":"default","mailboxSyncTimeframe":"5m"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings connectOutlookMailbox
```

With JSONata filter:

```bash
epilot email-settings connectOutlookMailbox --jsonata 'email_address'
```

<details>
<summary>Sample Response</summary>

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
    "user_ids": ["user-123", "user-456"],
    "group_ids": ["group-789"],
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

</details>

---

### `disconnectOutlookMailbox`

Disconnects a single Outlook mailbox by email address.

`POST /v2/outlook/mailbox/{email}/disconnect`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | path | string (email) | Yes | Email address of the Outlook mailbox to disconnect |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings disconnectOutlookMailbox \
  -p email=user@example.com
```

Using positional args for path parameters:

```bash
epilot email-settings disconnectOutlookMailbox user@example.com
```

With JSONata filter:

```bash
epilot email-settings disconnectOutlookMailbox -p email=user@example.com --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true,
  "email": "user@example.com"
}
```

</details>

---

### `startMailboxSync`

Triggers an Outlook mailbox sync for the specified email address.

`POST /v2/outlook/mailbox/{email}/sync`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | path | string (email) | Yes | Email address of the Outlook mailbox to sync |

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings startMailboxSync \
  -p email=user@example.com \
  -d '{"timeframe":"5m"}'
```

Using positional args for path parameters:

```bash
epilot email-settings startMailboxSync user@example.com
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings startMailboxSync -p email=user@example.com
```

With JSONata filter:

```bash
epilot email-settings startMailboxSync -p email=user@example.com --jsonata '$'
```

---

### `getMailboxSyncStatus`

Returns the current or latest sync status for the specified mailbox.

`GET /v2/outlook/mailbox/{email}/sync/status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | path | string (email) | Yes | Email address of the Outlook mailbox |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getMailboxSyncStatus \
  -p email=user@example.com
```

Using positional args for path parameters:

```bash
epilot email-settings getMailboxSyncStatus user@example.com
```

With JSONata filter:

```bash
epilot email-settings getMailboxSyncStatus -p email=user@example.com --jsonata 'execution_id'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `retryMailboxSync`

Retries failed messages from a previous sync execution.

`POST /v2/outlook/mailbox/{email}/sync/retry`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | path | string (email) | Yes | Email address of the Outlook mailbox |

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings retryMailboxSync \
  -p email=user@example.com \
  -d '{"sync_id":"string","scope":"all_failed","message_ids":["string"]}'
```

Using positional args for path parameters:

```bash
epilot email-settings retryMailboxSync user@example.com
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings retryMailboxSync -p email=user@example.com
```

With JSONata filter:

```bash
epilot email-settings retryMailboxSync -p email=user@example.com --jsonata '$'
```

---

### `getConnectedOutlookEmails`

Returns all Outlook email addresses connected to the organization.

`GET /v2/outlook/mailbox/mappings`

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getConnectedOutlookEmails
```

With JSONata filter:

```bash
epilot email-settings getConnectedOutlookEmails --jsonata 'outlook_emails'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `outlookOAuthCallback`

Exchanges authorization code for tokens and stores them.

`GET /v2/outlook/oauth/callback`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `code` | query | string | No |  |
| `state` | query | string | Yes |  |
| `session_state` | query | string | No |  |
| `error` | query | string | No |  |
| `error_description` | query | string | No |  |
| `error_subcode` | query | string | No |  |
| `client_info` | query | string | No |  |
| `error_uri` | query | string | No |  |
| `admin_consent` | query | string | No |  |
| `tenant` | query | string | No |  |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings outlookOAuthCallback \
  -p state=example
```

With JSONata filter:

```bash
epilot email-settings outlookOAuthCallback -p state=example --jsonata 'connected'
```

<details>
<summary>Sample Response</summary>

```json
{
  "connected": true,
  "expires_at": "1970-01-01T00:00:00.000Z",
  "scope": "string"
}
```

</details>

---

### `getSettings`

Retrieves settings of a specific type for the organization.

`GET /v1/email-settings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | query | "signature" \| "email_domain" \| "email_address" \| "whitelist_email_address" \| "restrict_duplicates_within" | Yes | The type of settings to retrieve. Determines which category of
email settings will be returned.
 |
| `id` | query | string | No | Optional ID to retrieve a specific setting. If omitted, all settings
of the specified type are returned.
 |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings getSettings \
  -p type=signature
```

With JSONata filter:

```bash
epilot email-settings getSettings -p type=signature --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `addSetting`

Creates a new setting of the specified type.

`POST /v1/email-settings`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings addSetting
```

With request body:

```bash
epilot email-settings addSetting \
  -d '{
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings addSetting
```

With JSONata filter:

```bash
epilot email-settings addSetting --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `deleteSetting`

Deletes a setting by its ID and type.

`DELETE /v1/email-settings`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings deleteSetting \
  -d '{"type":"signature","id":"a10bd0ff-4391-4cfc-88ee-b19d718a9bf7"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings deleteSetting
```

With JSONata filter:

```bash
epilot email-settings deleteSetting --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `updateSetting`

Updates an existing setting identified by its ID.

`POST /v1/email-settings/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The unique identifier of the setting to update |

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings updateSetting \
  -p id=a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
```

With request body:

```bash
epilot email-settings updateSetting \
  -p id=a10bd0ff-4391-4cfc-88ee-b19d718a9bf7 \
  -d '{
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
}'
```

Using positional args for path parameters:

```bash
epilot email-settings updateSetting a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings updateSetting -p id=a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
```

With JSONata filter:

```bash
epilot email-settings updateSetting -p id=a10bd0ff-4391-4cfc-88ee-b19d718a9bf7 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `addDomain`

Adds a custom email domain to the organization.

`POST /v1/email-settings/domain`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings addDomain \
  -d '{"domain":"mail.yourcompany.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings addDomain
```

With JSONata filter:

```bash
epilot email-settings addDomain --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `deleteDomain`

Removes a custom email domain from the organization.

`DELETE /v1/email-settings/domain`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings deleteDomain \
  -d '{"domain":"mail.yourcompany.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings deleteDomain
```

With JSONata filter:

```bash
epilot email-settings deleteDomain --jsonata '$'
```

---

### `verifyNameServers`

Verifies that the domain's name server (NS) records are correctly configured.

`POST /v1/email-settings/domain/name-servers:verify`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings verifyNameServers \
  -d '{"domain":"mail.yourcompany.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings verifyNameServers
```

With JSONata filter:

```bash
epilot email-settings verifyNameServers --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

</details>

---

### `verifyDomain`

Verifies ownership and configuration of a custom email domain.

`POST /v1/email-settings/domain:verify`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot email-settings verifyDomain \
  -d '{"domain":"mail.yourcompany.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-settings verifyDomain
```

With JSONata filter:

```bash
epilot email-settings verifyDomain --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

</details>

---
