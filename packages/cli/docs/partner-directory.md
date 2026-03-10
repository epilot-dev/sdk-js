# Partner API

- **Base URL:** `https://partner-directory-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/partner-directory](https://docs.epilot.io/api/partner-directory)

Management of Partners in epilot

## Quick Start

```bash
# List available operations
epilot partner-directory

# Call an operation
epilot partner-directory approvePartner -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

## Operations

**partners**
- [`approvePartner`](#approvepartner) — Approve partner request
- [`rejectPartner`](#rejectpartner) — Reject partner request
- [`searchAssignable`](#searchassignable) — Search for assignable users/organizations from this organization and Partners
- [`batchGetAssignable`](#batchgetassignable) — Search for assignable users from this organization by its ids
- [`getPartnerByToken`](#getpartnerbytoken) — Get partner by token
- [`activatePartner`](#activatepartner) — Activate partner using an invite token
- [`searchGeolocationForText`](#searchgeolocationfortext) — Converts a given string, in the format of an address, to geo-location latitude and longitude
- [`invitePartnerV2`](#invitepartnerv2) — Invite a partner into collaboration. It will send an email to partner and ask to join into collaboration

**partner_users**
- [`getPartnerUsers`](#getpartnerusers) — Get all users for a partner organization with their roles
- [`createPartnerUser`](#createpartneruser) — Create a new user in a partner organization
- [`deletePartnerUser`](#deletepartneruser) — Delete a user from a partner organization
- [`getPartnerRoles`](#getpartnerroles) — Get all roles for a partner organization
- [`createPartnerRole`](#createpartnerrole) — Create a role for a partner organization
- [`updatePartnerRole`](#updatepartnerrole) — Update a role for a partner organization
- [`assignPartnerUserRoles`](#assignpartneruserroles) — Assign roles to a user in a partner organization
- [`unassignPartnerUserRoles`](#unassignpartneruserroles) — Unassign roles from a user in a partner organization

### `approvePartner`

Approve partner request

`POST /v1/partners/{id}/approve`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory approvePartner \
  -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

Using positional args for path parameters:

```bash
epilot partner-directory approvePartner e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

With JSONata filter:

```bash
epilot partner-directory approvePartner -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "e45a6dc2-3795-43a3-ae0f-6b6760f310fc",
  "organization_id": "123",
  "created_at": "2022-02-08T04:44:32.246Z",
  "description": "Description",
  "company_name": "Company name",
  "invitation_token": "string",
  "invitation_email": "user@example.com",
  "email": "user@example.com",
  "owner_email": "user@example.com",
  "signed_up_email": "user@example.com",
  "partner_org_id": 123456,
  "status": "Pending"
}
```

</details>

---

### `rejectPartner`

Reject partner request

`POST /v1/partners/{id}/reject`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory rejectPartner \
  -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

Using positional args for path parameters:

```bash
epilot partner-directory rejectPartner e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

With JSONata filter:

```bash
epilot partner-directory rejectPartner -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "e45a6dc2-3795-43a3-ae0f-6b6760f310fc",
  "organization_id": "123",
  "created_at": "2022-02-08T04:44:32.246Z",
  "description": "Description",
  "company_name": "Company name",
  "invitation_token": "string",
  "invitation_email": "user@example.com",
  "email": "user@example.com",
  "owner_email": "user@example.com",
  "signed_up_email": "user@example.com",
  "partner_org_id": 123456,
  "status": "Pending"
}
```

</details>

---

### `searchAssignable`

Search for assignable users/organizations from this organization and Partners

`POST /v1/partners/assignables:search`

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory searchAssignable
```

With request body:

```bash
epilot partner-directory searchAssignable \
  -d '{
  "q": "",
  "from": 0,
  "size": 25,
  "org_ids": ["123"],
  "portalUsersEntityIdScope": "",
  "types": ["user", "partner_user", "partner_organization", "ecp", "group"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory searchAssignable
```

With JSONata filter:

```bash
epilot partner-directory searchAssignable --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 25,
  "results": [
    {
      "type": "user",
      "display_name": "Example User",
      "image_uri": {
        "original": "https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png",
        "thumbnail_32": "https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png"
      },
      "org_id": "123",
      "created_at": "2022-02-08T04:44:32.246Z",
      "activated_at": "2022-02-08T04:44:32.246Z",
      "status": "Active",
      "user_id": "456",
      "email": "example@example.com"
    }
  ]
}
```

</details>

---

### `batchGetAssignable`

Search for assignable users from this organization by its ids

`POST /v1/partners/assignables:batchGet`

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory batchGetAssignable \
  -d '[{"user_id":"string","org_id":"string","group_id":"string"}]'
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory batchGetAssignable
```

With JSONata filter:

```bash
epilot partner-directory batchGetAssignable --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 25,
  "results": [
    {
      "type": "user",
      "display_name": "Example User",
      "image_uri": {
        "original": "https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png",
        "thumbnail_32": "https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png"
      },
      "org_id": "123",
      "created_at": "2022-02-08T04:44:32.246Z",
      "activated_at": "2022-02-08T04:44:32.246Z",
      "status": "Active",
      "user_id": "456",
      "email": "example@example.com"
    }
  ]
}
```

</details>

---

### `getPartnerByToken`

Get partner by token

`GET /v1/partner-directory/public/getPartnerByToken`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Invite Token |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory getPartnerByToken \
  -p token=example
```

With JSONata filter:

```bash
epilot partner-directory getPartnerByToken -p token=example --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "e45a6dc2-3795-43a3-ae0f-6b6760f310fc",
  "organization_id": "123",
  "created_at": "2022-02-08T04:44:32.246Z",
  "description": "Description",
  "company_name": "Company name",
  "invitation_token": "string",
  "invitation_email": "user@example.com",
  "email": "user@example.com",
  "owner_email": "user@example.com",
  "signed_up_email": "user@example.com",
  "partner_org_id": 123456,
  "status": "Pending"
}
```

</details>

---

### `activatePartner`

Activate partner using an invite token

`POST /v1/partner-directory/public/activate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Invite Token |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory activatePartner \
  -p token=example \
  -d '{"company_name":"Company name","signed_up_email":"user@example.com","organization_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory activatePartner -p token=example
```

With JSONata filter:

```bash
epilot partner-directory activatePartner -p token=example --jsonata '$'
```

---

### `searchGeolocationForText`

Converts a given string, in the format of an address, to geo-location latitude and longitude

`POST /v1/geolocation/text:search`

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory searchGeolocationForText \
  -d '{"address":"Auweg 1, 93055 Regensburg, DE"}'
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory searchGeolocationForText
```

With JSONata filter:

```bash
epilot partner-directory searchGeolocationForText --jsonata 'lat'
```

<details>
<summary>Sample Response</summary>

```json
{
  "lat": 49.013,
  "lng": 12.101,
  "addressLabel": "string",
  "relevance": 0
}
```

</details>

---

### `invitePartnerV2`

Invite a partner into collaboration. It will send an email to partner and ask to join into collaboration

`POST /v2/partners/{id}/invite`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory invitePartnerV2 \
  -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc \
  -d '{"language":"en"}'
```

Using positional args for path parameters:

```bash
epilot partner-directory invitePartnerV2 e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory invitePartnerV2 -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

With JSONata filter:

```bash
epilot partner-directory invitePartnerV2 -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "e45a6dc2-3795-43a3-ae0f-6b6760f310fc",
  "organization_id": "123",
  "created_at": "2022-02-08T04:44:32.246Z",
  "description": "Description",
  "company_name": "Company name",
  "invitation_token": "string",
  "invitation_email": "user@example.com",
  "email": "user@example.com",
  "owner_email": "user@example.com",
  "signed_up_email": "user@example.com",
  "partner_org_id": 123456,
  "status": "Pending"
}
```

</details>

---

### `getPartnerUsers`

Get all users for a partner organization with their roles

`GET /v2/partners/{orgId}/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory getPartnerUsers \
  -p orgId=123
```

Using positional args for path parameters:

```bash
epilot partner-directory getPartnerUsers 123
```

With JSONata filter:

```bash
epilot partner-directory getPartnerUsers -p orgId=123 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "456",
      "name": "John Doe",
      "email": "user@example.com",
      "status": "Active",
      "image": {
        "original": "https://example.com/path",
        "thumbnail_32": "https://example.com/path"
      },
      "roles": [
        {
          "id": "role-123",
          "slug": "admin",
          "name": "Administrator"
        }
      ]
    }
  ]
}
```

</details>

---

### `createPartnerUser`

Create a new user in a partner organization

`POST /v2/partners/{orgId}/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The Partner organization ID where the user should be created |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory createPartnerUser \
  -p orgId=123 \
  -d '{"email":"user@example.com","language":"en","roles":["role-123","role-456"]}'
```

Using positional args for path parameters:

```bash
epilot partner-directory createPartnerUser 123
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory createPartnerUser -p orgId=123
```

With JSONata filter:

```bash
epilot partner-directory createPartnerUser -p orgId=123 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "456",
  "email": "user@example.com",
  "display_name": "John Doe",
  "status": "Active"
}
```

</details>

---

### `deletePartnerUser`

Delete a user from a partner organization

`DELETE /v2/partners/{orgId}/users/{userId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The user ID to delete |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory deletePartnerUser \
  -p orgId=123 \
  -p userId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot partner-directory deletePartnerUser 123 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot partner-directory deletePartnerUser -p orgId=123 -p userId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `getPartnerRoles`

Get all roles for a partner organization

`GET /v2/partners/{orgId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory getPartnerRoles \
  -p orgId=123
```

Using positional args for path parameters:

```bash
epilot partner-directory getPartnerRoles 123
```

With JSONata filter:

```bash
epilot partner-directory getPartnerRoles -p orgId=123 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "role-123",
      "slug": "admin",
      "name": "Administrator",
      "type": "share_role"
    }
  ]
}
```

</details>

---

### `createPartnerRole`

Create a role for a partner organization

`POST /v2/partners/{orgId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory createPartnerRole \
  -p orgId=123
```

With request body:

```bash
epilot partner-directory createPartnerRole \
  -p orgId=123 \
  -d '{
  "name": "Partner Admin",
  "slug": "partner_admin",
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow",
      "conditions": [
        {
          "attribute": "workflows.primary.task_name",
          "operation": "equals",
          "values": ["Qualification"]
        }
      ],
      "dependencies": [
        {
          "action": "entity-read",
          "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
          "effect": "allow",
          "conditions": [
            {
              "attribute": "workflows.primary.task_name",
              "operation": "equals",
              "values": ["Qualification"]
            }
          ]
        }
      ]
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot partner-directory createPartnerRole 123
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory createPartnerRole -p orgId=123
```

With JSONata filter:

```bash
epilot partner-directory createPartnerRole -p orgId=123 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "role-123",
  "slug": "admin",
  "name": "Administrator",
  "type": "share_role"
}
```

</details>

---

### `updatePartnerRole`

Update a role for a partner organization

`PUT /v2/partners/{orgId}/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `roleId` | path | string | Yes | The role ID to update |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory updatePartnerRole \
  -p orgId=123 \
  -p roleId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot partner-directory updatePartnerRole \
  -p orgId=123 \
  -p roleId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow",
      "conditions": [
        {
          "attribute": "workflows.primary.task_name",
          "operation": "equals",
          "values": ["Qualification"]
        }
      ],
      "dependencies": [
        {
          "action": "entity-read",
          "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
          "effect": "allow",
          "conditions": [
            {
              "attribute": "workflows.primary.task_name",
              "operation": "equals",
              "values": ["Qualification"]
            }
          ]
        }
      ]
    }
  ],
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner"
}'
```

Using positional args for path parameters:

```bash
epilot partner-directory updatePartnerRole 123 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory updatePartnerRole -p orgId=123 -p roleId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot partner-directory updatePartnerRole -p orgId=123 -p roleId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "role-123",
  "slug": "admin",
  "name": "Administrator",
  "type": "share_role"
}
```

</details>

---

### `assignPartnerUserRoles`

Assign roles to a user in a partner organization

`POST /v2/partners/{orgId}/users/{userId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The user ID |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory assignPartnerUserRoles \
  -p orgId=123 \
  -p userId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"roleIds":["role-123","role-456"]}'
```

Using positional args for path parameters:

```bash
epilot partner-directory assignPartnerUserRoles 123 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory assignPartnerUserRoles -p orgId=123 -p userId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot partner-directory assignPartnerUserRoles -p orgId=123 -p userId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "roleId": "string",
      "success": true,
      "data": {},
      "error": {}
    }
  ]
}
```

</details>

---

### `unassignPartnerUserRoles`

Unassign roles from a user in a partner organization

`DELETE /v2/partners/{orgId}/users/{userId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The user ID |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot partner-directory unassignPartnerUserRoles \
  -p orgId=123 \
  -p userId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"roleIds":["role-123","role-456"]}'
```

Using positional args for path parameters:

```bash
epilot partner-directory unassignPartnerUserRoles 123 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory unassignPartnerUserRoles -p orgId=123 -p userId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot partner-directory unassignPartnerUserRoles -p orgId=123 -p userId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "roleId": "string",
      "success": true,
      "data": {},
      "error": {}
    }
  ]
}
```

</details>

---
