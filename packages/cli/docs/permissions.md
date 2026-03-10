# Permissions API

- **Base URL:** `https://permissions.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/permissions](https://docs.epilot.io/api/permissions)

Flexible Role-based Access Control for epilot

## Quick Start

```bash
# List available operations
epilot permissions

# Call an operation
epilot permissions listCurrentRoles
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

**Roles**
- [`listCurrentRoles`](#listcurrentroles) — Returns roles and grants assigned to current user
- [`listAllRoles`](#listallroles) — Returns list of all roles in organization
- [`createRole`](#createrole) — Create role
- [`searchRoles`](#searchroles) — Search Roles
- [`getRole`](#getrole) — Get role by id
- [`putRole`](#putrole) — Create or update role
- [`deleteRole`](#deleterole) — Delete role by id
- [`refreshPermissions`](#refreshpermissions) — Makes sure the user has a role in the organization

**Assignments**
- [`getAssignedRolesForUser`](#getassignedrolesforuser) — Get list of assigned roles by user id
- [`assignRoles`](#assignroles) — Assign / unassign roles to users.
- [`addAssignment`](#addassignment) — Assign a user to a role.
- [`removeAssignment`](#removeassignment) — Remove role assignment from user
- [`listAllAssignments`](#listallassignments) — Returns list of all assignments in organization

### `listCurrentRoles`

Returns roles and grants assigned to current user

`GET /v1/permissions/me`

**Sample Call**

```bash
epilot permissions listCurrentRoles
```

With JSONata filter:

```bash
epilot permissions listCurrentRoles --jsonata 'roles'
```

<details>
<summary>Sample Response</summary>

```json
{
  "roles": [
    {
      "id": "123:owner",
      "name": "Owner",
      "slug": "owner",
      "type": "user_role",
      "expires_at": "2028-07-21T17:32:28Z",
      "organization_id": "123",
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
          ]
        }
      ],
      "parent_role": "123:owner"
    }
  ]
}
```

</details>

---

### `listAllRoles`

Returns list of all roles in organization

`GET /v1/permissions/roles`

**Sample Call**

```bash
epilot permissions listAllRoles
```

With JSONata filter:

```bash
epilot permissions listAllRoles --jsonata 'roles'
```

<details>
<summary>Sample Response</summary>

```json
{
  "roles": [
    {
      "id": "123:owner",
      "name": "Owner",
      "slug": "owner",
      "type": "user_role",
      "expires_at": "2028-07-21T17:32:28Z",
      "organization_id": "123",
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
          ]
        }
      ],
      "parent_role": "123:owner"
    }
  ]
}
```

</details>

---

### `createRole`

Create role

`POST /v1/permissions/roles`

**Request Body**

**Sample Call**

```bash
epilot permissions createRole \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot permissions createRole
```

With JSONata filter:

```bash
epilot permissions createRole --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner",
  "type": "user_role",
  "expires_at": "2028-07-21T17:32:28Z",
  "organization_id": "123",
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
      ]
    }
  ],
  "parent_role": "123:owner"
}
```

</details>

---

### `searchRoles`

Search Roles

`POST /v1/permissions/roles:search`

**Request Body**

**Sample Call**

```bash
epilot permissions searchRoles
```

With request body:

```bash
epilot permissions searchRoles \
  -d '{
  "role_ids": ["123:manager", "456:owner"],
  "org_ids": ["123", "456"],
  "slugs": ["manager", "owner"],
  "query": "Administrator",
  "limit": 1,
  "offset": 1
}'
```

Using stdin pipe:

```bash
cat body.json | epilot permissions searchRoles
```

With JSONata filter:

```bash
epilot permissions searchRoles --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "id": "123:owner",
      "name": "Owner",
      "slug": "owner",
      "type": "user_role",
      "expires_at": "2028-07-21T17:32:28Z",
      "organization_id": "123",
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
          ]
        }
      ],
      "parent_role": "123:owner"
    }
  ]
}
```

</details>

---

### `getRole`

Get role by id

`GET /v1/permissions/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `roleId` | path | string | Yes |  |

**Sample Call**

```bash
epilot permissions getRole \
  -p roleId=123:owner
```

Using positional args for path parameters:

```bash
epilot permissions getRole 123:owner
```

With JSONata filter:

```bash
epilot permissions getRole -p roleId=123:owner --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner",
  "type": "user_role",
  "expires_at": "2028-07-21T17:32:28Z",
  "organization_id": "123",
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
      ]
    }
  ],
  "parent_role": "123:owner"
}
```

</details>

---

### `putRole`

Create or update role

`PUT /v1/permissions/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `roleId` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot permissions putRole \
  -p roleId=123:owner
```

With request body:

```bash
epilot permissions putRole \
  -p roleId=123:owner \
  -d '{
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner",
  "type": "user_role",
  "expires_at": "2028-07-21T17:32:28Z",
  "organization_id": "123",
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
      ]
    }
  ],
  "parent_role": "123:owner"
}'
```

Using positional args for path parameters:

```bash
epilot permissions putRole 123:owner
```

Using stdin pipe:

```bash
cat body.json | epilot permissions putRole -p roleId=123:owner
```

With JSONata filter:

```bash
epilot permissions putRole -p roleId=123:owner --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner",
  "type": "user_role",
  "expires_at": "2028-07-21T17:32:28Z",
  "organization_id": "123",
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
      ]
    }
  ],
  "parent_role": "123:owner"
}
```

</details>

---

### `deleteRole`

Delete role by id

`DELETE /v1/permissions/roles/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `roleId` | path | string | Yes |  |

**Sample Call**

```bash
epilot permissions deleteRole \
  -p roleId=123:owner
```

Using positional args for path parameters:

```bash
epilot permissions deleteRole 123:owner
```

With JSONata filter:

```bash
epilot permissions deleteRole -p roleId=123:owner --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123:owner",
  "name": "Owner",
  "slug": "owner",
  "type": "user_role",
  "expires_at": "2028-07-21T17:32:28Z",
  "organization_id": "123",
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
      ]
    }
  ],
  "parent_role": "123:owner"
}
```

</details>

---

### `refreshPermissions`

Makes sure the user has a role in the organization

`GET /v1/permissions/refresh`

**Sample Call**

```bash
epilot permissions refreshPermissions
```

With JSONata filter:

```bash
epilot permissions refreshPermissions --jsonata '$'
```

---

### `getAssignedRolesForUser`

Get list of assigned roles by user id

`GET /v1/permissions/assignments/{userId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `userId` | path | string | Yes |  |

**Sample Call**

```bash
epilot permissions getAssignedRolesForUser \
  -p userId=1
```

Using positional args for path parameters:

```bash
epilot permissions getAssignedRolesForUser 1
```

With JSONata filter:

```bash
epilot permissions getAssignedRolesForUser -p userId=1 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
["123:owner"]
```

</details>

---

### `assignRoles`

Assign / unassign roles to users.

`PUT /v1/permissions/assignments/{userId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `userId` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot permissions assignRoles \
  -p userId=1 \
  -d '["123:owner"]'
```

Using positional args for path parameters:

```bash
epilot permissions assignRoles 1
```

Using stdin pipe:

```bash
cat body.json | epilot permissions assignRoles -p userId=1
```

With JSONata filter:

```bash
epilot permissions assignRoles -p userId=1 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
["123:owner"]
```

</details>

---

### `addAssignment`

Assign a user to a role.

`POST /v1/permissions/assignments/{userId}/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `userId` | path | string | Yes |  |
| `roleId` | path | string | Yes |  |

**Sample Call**

```bash
epilot permissions addAssignment \
  -p userId=1 \
  -p roleId=123:owner
```

Using positional args for path parameters:

```bash
epilot permissions addAssignment 1 123:owner
```

With JSONata filter:

```bash
epilot permissions addAssignment -p userId=1 -p roleId=123:owner --jsonata 'user_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "user_id": "1",
  "roles": ["123:owner"]
}
```

</details>

---

### `removeAssignment`

Remove role assignment from user

`DELETE /v1/permissions/assignments/{userId}/{roleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `userId` | path | string | Yes |  |
| `roleId` | path | string | Yes |  |

**Sample Call**

```bash
epilot permissions removeAssignment \
  -p userId=1 \
  -p roleId=123:owner
```

Using positional args for path parameters:

```bash
epilot permissions removeAssignment 1 123:owner
```

With JSONata filter:

```bash
epilot permissions removeAssignment -p userId=1 -p roleId=123:owner --jsonata 'user_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "user_id": "1",
  "roles": ["123:owner"]
}
```

</details>

---

### `listAllAssignments`

Returns list of all assignments in organization

`GET /v1/permissions/assignments`

**Sample Call**

```bash
epilot permissions listAllAssignments
```

With JSONata filter:

```bash
epilot permissions listAllAssignments --jsonata 'assignments'
```

<details>
<summary>Sample Response</summary>

```json
{
  "assignments": [
    {
      "user_id": "1",
      "roles": ["123:owner"]
    }
  ]
}
```

</details>

---
