# Partner Directory API

- **Base URL:** `https://partner-directory-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/partner-directory](https://docs.epilot.io/api/partner-directory)

The Partner Directory API enables organizations to manage partnerships within the epilot platform.

## Quick Start

```bash
# List available operations
epilot partner-directory

# Call an operation
epilot partner-directory approvePartner -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc
```

## Common Flags

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

## Operations

**Partners**
- [`approvePartner`](#approvepartner) — Approves a pending partner request, allowing the partner to begin collaboration.
- [`rejectPartner`](#rejectpartner) — Rejects a pending partner request, declining the partnership.
- [`searchAssignable`](#searchassignable) — Search for users and organizations that can be assigned to tasks, workflows, or entities.
- [`batchGetAssignable`](#batchgetassignable) — Retrieve multiple assignable users or groups by their IDs in a single request.
- [`getPartnerByToken`](#getpartnerbytoken) — Retrieves partner information using an invitation token.
- [`activatePartner`](#activatepartner) — Activates a partner account using an invitation token.
- [`searchGeolocationForText`](#searchgeolocationfortext) — Converts an address string to geographic coordinates (latitude and longitude).
- [`invitePartnerV2`](#invitepartnerv2) — Sends an invitation email to a partner organization to begin collaboration.

**Partner Users**
- [`getPartnerUsers`](#getpartnerusers) — Retrieves all users belonging to a partner organization along with their assigned roles.
- [`createPartnerUser`](#createpartneruser) — Creates a new user in a partner organization.
- [`deletePartnerUser`](#deletepartneruser) — Removes a user from a partner organization.
- [`getPartnerRoles`](#getpartnerroles) — Retrieves all roles defined for a partner organization.
- [`createPartnerRole`](#createpartnerrole) — Creates a new role for a partner organization.
- [`updatePartnerRole`](#updatepartnerrole) — Updates an existing role in a partner organization.
- [`deletePartnerRole`](#deletepartnerrole) — Delete a role from a partner organization
- [`assignPartnerUserRoles`](#assignpartneruserroles) — Assigns one or more roles to a user in a partner organization.
- [`unassignPartnerUserRoles`](#unassignpartneruserroles) — Removes one or more roles from a user in a partner organization.

### `approvePartner`

Approves a pending partner request, allowing the partner to begin collaboration.

`POST /v1/partners/{id}/approve`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The unique identifier of the partner to approve |

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
  "description": "Regional solar installation partner for Bavaria",
  "company_name": "Acme Solar GmbH",
  "invitation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "invitation_email": "user@example.com",
  "email": "contact@acme-solar.de",
  "owner_email": "owner@acme-solar.de",
  "signed_up_email": "admin@acme-solar.de",
  "partner_org_id": "456789",
  "status": "Pending"
}
```

</details>

---

### `rejectPartner`

Rejects a pending partner request, declining the partnership.

`POST /v1/partners/{id}/reject`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The unique identifier of the partner to reject |

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
  "description": "Regional solar installation partner for Bavaria",
  "company_name": "Acme Solar GmbH",
  "invitation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "invitation_email": "user@example.com",
  "email": "contact@acme-solar.de",
  "owner_email": "owner@acme-solar.de",
  "signed_up_email": "admin@acme-solar.de",
  "partner_org_id": "456789",
  "status": "Pending"
}
```

</details>

---

### `searchAssignable`

Search for users and organizations that can be assigned to tasks, workflows, or entities.

`POST /v1/partners/assignables:search`

**Request Body**

**Sample Call**

```bash
epilot partner-directory searchAssignable
```

With request body:

```bash
epilot partner-directory searchAssignable \
  -d '{
  "q": "john",
  "from": 0,
  "size": 25,
  "org_ids": ["123", "456"],
  "portalUsersEntityIdScope": "f7c22299-ca72-4bca-8538-0a88eeefc947",
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
  "hits": 42,
  "results": [
    {
      "type": "user",
      "display_name": "John Smith",
      "image_uri": {
        "original": "https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png",
        "thumbnail_32": "https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png"
      },
      "org_id": "123",
      "created_at": "2022-02-08T04:44:32.246Z",
      "activated_at": "2022-02-08T04:44:32.246Z",
      "status": "Active",
      "user_id": "456",
      "email": "john.smith@example.com"
    }
  ]
}
```

</details>

---

### `batchGetAssignable`

Retrieve multiple assignable users or groups by their IDs in a single request.

`POST /v1/partners/assignables:batchGet`

**Request Body**

**Sample Call**

```bash
epilot partner-directory batchGetAssignable \
  -d '[{"user_id":"456","org_id":"123","group_id":"group-789"}]'
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
  "hits": 3,
  "results": [
    {
      "type": "user",
      "display_name": "John Smith",
      "image_uri": {
        "original": "https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png",
        "thumbnail_32": "https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png"
      },
      "org_id": "123",
      "created_at": "2022-02-08T04:44:32.246Z",
      "activated_at": "2022-02-08T04:44:32.246Z",
      "status": "Active",
      "user_id": "456",
      "email": "john.smith@example.com"
    }
  ]
}
```

</details>

---

### `getPartnerByToken`

Retrieves partner information using an invitation token.

`GET /v1/partner-directory/public/getPartnerByToken`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | The invitation token received via email |

**Sample Call**

```bash
epilot partner-directory getPartnerByToken \
  -p token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

With JSONata filter:

```bash
epilot partner-directory getPartnerByToken -p token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "e45a6dc2-3795-43a3-ae0f-6b6760f310fc",
  "organization_id": "123",
  "created_at": "2022-02-08T04:44:32.246Z",
  "description": "Regional solar installation partner for Bavaria",
  "company_name": "Acme Solar GmbH",
  "invitation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "invitation_email": "user@example.com",
  "email": "contact@acme-solar.de",
  "owner_email": "owner@acme-solar.de",
  "signed_up_email": "admin@acme-solar.de",
  "partner_org_id": "456789",
  "status": "Pending"
}
```

</details>

---

### `activatePartner`

Activates a partner account using an invitation token.

`POST /v1/partner-directory/public/activate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | The invitation token received via email |

**Request Body**

**Sample Call**

```bash
epilot partner-directory activatePartner \
  -p token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... \
  -d '{"company_name":"Acme Solar GmbH","signed_up_email":"admin@acme-solar.de","organization_id":"456"}'
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory activatePartner -p token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

With JSONata filter:

```bash
epilot partner-directory activatePartner -p token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... --jsonata '$'
```

---

### `searchGeolocationForText`

Converts an address string to geographic coordinates (latitude and longitude).

`POST /v1/geolocation/text:search`

**Request Body**

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
  "addressLabel": "Auweg 1, 93055 Regensburg, Germany",
  "relevance": 0.95
}
```

</details>

---

### `invitePartnerV2`

Sends an invitation email to a partner organization to begin collaboration.

`POST /v2/partners/{id}/invite`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The unique identifier of the partner to invite |

**Request Body**

**Sample Call**

```bash
epilot partner-directory invitePartnerV2 \
  -p id=e45a6dc2-3795-43a3-ae0f-6b6760f310fc \
  -d '{"language":"de"}'
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
  "description": "Regional solar installation partner for Bavaria",
  "company_name": "Acme Solar GmbH",
  "invitation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "invitation_email": "user@example.com",
  "email": "contact@acme-solar.de",
  "owner_email": "owner@acme-solar.de",
  "signed_up_email": "admin@acme-solar.de",
  "partner_org_id": "456789",
  "status": "Pending"
}
```

</details>

---

### `getPartnerUsers`

Retrieves all users belonging to a partner organization along with their assigned roles.

`GET /v2/partners/{orgId}/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner whose users to retrieve |

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
      "email": "user@partner.com",
      "status": "Active",
      "image": {
        "original": "https://example.com/path",
        "thumbnail_32": "https://example.com/path"
      },
      "roles": [
        {
          "id": "123:partner_admin",
          "slug": "partner_admin",
          "name": "Partner Administrator"
        }
      ]
    }
  ]
}
```

</details>

---

### `createPartnerUser`

Creates a new user in a partner organization.

`POST /v2/partners/{orgId}/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The partner organization ID where the user will be created |

**Request Body**

**Sample Call**

```bash
epilot partner-directory createPartnerUser \
  -p orgId=123 \
  -d '{"email":"newuser@partner.com","language":"de","roles":["123:partner_viewer"]}'
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

Removes a user from a partner organization.

`DELETE /v2/partners/{orgId}/users/{userId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The unique identifier of the user to delete |

**Sample Call**

```bash
epilot partner-directory deletePartnerUser \
  -p orgId=123 \
  -p userId=456
```

Using positional args for path parameters:

```bash
epilot partner-directory deletePartnerUser 123 456
```

With JSONata filter:

```bash
epilot partner-directory deletePartnerUser -p orgId=123 -p userId=456 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `getPartnerRoles`

Retrieves all roles defined for a partner organization.

`GET /v2/partners/{orgId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner whose roles to retrieve |

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
      "id": "123:partner_admin",
      "slug": "partner_admin",
      "name": "Partner Administrator",
      "type": "share_role",
      "grants": [
        {
          "action": "entity-read",
          "resource": "entity:123:contact:*",
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
}
```

</details>

---

### `createPartnerRole`

Creates a new role for a partner organization.

`POST /v2/partners/{orgId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner where the role will be created |

**Request Body**

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
  "name": "Partner Administrator",
  "slug": "partner_admin",
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:*",
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
          "resource": "entity:123:contact:*",
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
  "id": "123:partner_admin",
  "slug": "partner_admin",
  "name": "Partner Administrator",
  "type": "share_role",
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:*",
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
```

</details>

---

### `updatePartnerRole`

Updates an existing role in a partner organization.

`PUT /v2/partners/{orgId}/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `roleId` | path | string | Yes | The unique identifier of the role to update |

**Request Body**

**Sample Call**

```bash
epilot partner-directory updatePartnerRole \
  -p orgId=123 \
  -p roleId=123:partner_sales
```

With request body:

```bash
epilot partner-directory updatePartnerRole \
  -p orgId=123 \
  -p roleId=123:partner_sales \
  -d '{
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:*",
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
          "resource": "entity:123:contact:*",
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
epilot partner-directory updatePartnerRole 123 123:partner_sales
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory updatePartnerRole -p orgId=123 -p roleId=123:partner_sales
```

With JSONata filter:

```bash
epilot partner-directory updatePartnerRole -p orgId=123 -p roleId=123:partner_sales --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:partner_admin",
  "slug": "partner_admin",
  "name": "Partner Administrator",
  "type": "share_role",
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:*",
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
```

</details>

---

### `deletePartnerRole`

Delete a role from a partner organization

`DELETE /v2/partners/{orgId}/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `roleId` | path | string | Yes | The role ID to delete |

**Sample Call**

```bash
epilot partner-directory deletePartnerRole \
  -p orgId=123 \
  -p roleId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot partner-directory deletePartnerRole 123 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot partner-directory deletePartnerRole -p orgId=123 -p roleId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:partner_admin",
  "slug": "partner_admin",
  "name": "Partner Administrator",
  "type": "share_role",
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:*",
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
```

</details>

---

### `assignPartnerUserRoles`

Assigns one or more roles to a user in a partner organization.

`POST /v2/partners/{orgId}/users/{userId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The unique identifier of the user to assign roles to |

**Request Body**

**Sample Call**

```bash
epilot partner-directory assignPartnerUserRoles \
  -p orgId=123 \
  -p userId=456 \
  -d '{"roleIds":["123:partner_admin","123:partner_viewer"]}'
```

Using positional args for path parameters:

```bash
epilot partner-directory assignPartnerUserRoles 123 456
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory assignPartnerUserRoles -p orgId=123 -p userId=456
```

With JSONata filter:

```bash
epilot partner-directory assignPartnerUserRoles -p orgId=123 -p userId=456 --jsonata 'results[0]'
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

Removes one or more roles from a user in a partner organization.

`DELETE /v2/partners/{orgId}/users/{userId}/roles`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `orgId` | path | string | Yes | The organization ID of the partner |
| `userId` | path | string | Yes | The unique identifier of the user to remove roles from |

**Request Body**

**Sample Call**

```bash
epilot partner-directory unassignPartnerUserRoles \
  -p orgId=123 \
  -p userId=456 \
  -d '{"roleIds":["123:partner_admin","123:partner_viewer"]}'
```

Using positional args for path parameters:

```bash
epilot partner-directory unassignPartnerUserRoles 123 456
```

Using stdin pipe:

```bash
cat body.json | epilot partner-directory unassignPartnerUserRoles -p orgId=123 -p userId=456
```

With JSONata filter:

```bash
epilot partner-directory unassignPartnerUserRoles -p orgId=123 -p userId=456 --jsonata 'results[0]'
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
