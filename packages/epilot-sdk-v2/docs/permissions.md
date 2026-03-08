# Permissions API

- **Base URL:** `https://permissions.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/permissions](https://docs.epilot.io/api/permissions)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.permissions.listCurrentRoles(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/permissions'

const permissionsClient = await getClient()
authorize(permissionsClient, () => '<token>')
const { data } = await permissionsClient.listCurrentRoles(...)
```

## Operations

**Roles**
- [`listCurrentRoles`](#listcurrentroles)
- [`listAllRoles`](#listallroles)
- [`createRole`](#createrole)
- [`searchRoles`](#searchroles)
- [`getRole`](#getrole)
- [`putRole`](#putrole)
- [`deleteRole`](#deleterole)
- [`refreshPermissions`](#refreshpermissions)

**Assignments**
- [`getAssignedRolesForUser`](#getassignedrolesforuser)
- [`assignRoles`](#assignroles)
- [`addAssignment`](#addassignment)
- [`removeAssignment`](#removeassignment)
- [`listAllAssignments`](#listallassignments)

**Schemas**
- [`Grant`](#grant)
- [`GrantWithDependencies`](#grantwithdependencies)
- [`GrantCondition`](#grantcondition)
- [`EqualsCondition`](#equalscondition)
- [`RoleId`](#roleid)
- [`BaseRole`](#baserole)
- [`BaseRoleForCreate`](#baseroleforcreate)
- [`UserRole`](#userrole)
- [`OrgRole`](#orgrole)
- [`ShareRole`](#sharerole)
- [`PartnerRole`](#partnerrole)
- [`PortalRole`](#portalrole)
- [`Role`](#role)
- [`RolePayload`](#rolepayload)
- [`Assignment`](#assignment)
- [`InternalAssignment`](#internalassignment)
- [`OrgAssignments`](#orgassignments)
- [`OrgRoles`](#orgroles)
- [`Assignments`](#assignments)
- [`UserId`](#userid)
- [`OrganizationId`](#organizationid)
- [`Slug`](#slug)
- [`RoleSearchInput`](#rolesearchinput)
- [`CreateRolePayload`](#createrolepayload)
- [`Error`](#error)

### `listCurrentRoles`

Returns roles and grants assigned to current user

`GET /v1/permissions/me`

```ts
const { data } = await client.listCurrentRoles()
```

<details>
<summary>Response</summary>

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
      "grants": [],
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

```ts
const { data } = await client.listAllRoles()
```

<details>
<summary>Response</summary>

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
      "grants": [],
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

```ts
const { data } = await client.createRole(
  null,
  {},
)
```

<details>
<summary>Response</summary>

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
      "conditions": []
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

```ts
const { data } = await client.searchRoles(
  null,
  {
    role_ids: [
      '123:manager',
      '456:owner'
    ],
    org_ids: [
      '123',
      '456'
    ],
    slugs: [
      'manager',
      'owner'
    ],
    query: 'Administrator',
    limit: 1,
    offset: 1
  },
)
```

<details>
<summary>Response</summary>

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
      "grants": [],
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

```ts
const { data } = await client.getRole({
  roleId: 'example',
})
```

<details>
<summary>Response</summary>

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
      "conditions": []
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

```ts
const { data } = await client.putRole(
  {
    roleId: 'example',
  },
  {
    id: '123:owner',
    name: 'Owner',
    slug: 'owner',
    type: 'user_role',
    expires_at: '2028-07-21T17:32:28Z',
    organization_id: '123',
    grants: [
      {
        action: 'entity-read',
        resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
        effect: 'allow',
        conditions: [ /* ... */ ]
      }
    ],
    parent_role: '123:owner'
  },
)
```

<details>
<summary>Response</summary>

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
      "conditions": []
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

```ts
const { data } = await client.deleteRole({
  roleId: 'example',
})
```

<details>
<summary>Response</summary>

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
      "conditions": []
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

```ts
const { data } = await client.refreshPermissions()
```

---

### `getAssignedRolesForUser`

Get list of assigned roles by user id

`GET /v1/permissions/assignments/{userId}`

```ts
const { data } = await client.getAssignedRolesForUser({
  userId: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  "123:owner"
]
```

</details>

---

### `assignRoles`

Assign / unassign roles to users.

`PUT /v1/permissions/assignments/{userId}`

```ts
const { data } = await client.assignRoles(
  {
    userId: 'example',
  },
  [
    '123:owner'
  ],
)
```

<details>
<summary>Response</summary>

```json
[
  "123:owner"
]
```

</details>

---

### `addAssignment`

Assign a user to a role.

`POST /v1/permissions/assignments/{userId}/{roleId}`

```ts
const { data } = await client.addAssignment({
  userId: 'example',
  roleId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "user_id": "1",
  "roles": [
    "123:owner"
  ]
}
```

</details>

---

### `removeAssignment`

Remove role assignment from user

`DELETE /v1/permissions/assignments/{userId}/{roleId}`

```ts
const { data } = await client.removeAssignment({
  userId: 'example',
  roleId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "user_id": "1",
  "roles": [
    "123:owner"
  ]
}
```

</details>

---

### `listAllAssignments`

Returns list of all assignments in organization

`GET /v1/permissions/assignments`

```ts
const { data } = await client.listAllAssignments()
```

<details>
<summary>Response</summary>

```json
{
  "assignments": [
    {
      "user_id": "1",
      "roles": []
    }
  ]
}
```

</details>

---

## Schemas

### `Grant`

```ts
type Grant = {
  action: string
  resource?: string
  effect?: "allow" | "deny"
  conditions?: object[]
}
```

### `GrantWithDependencies`

```ts
type GrantWithDependencies = {
  action: string
  resource?: string
  effect?: "allow" | "deny"
  conditions?: object[]
  dependencies?: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `GrantCondition`

```ts
type GrantCondition = object
```

### `EqualsCondition`

Check if attribute equals to any of the values

```ts
type EqualsCondition = {
  attribute: string
  operation: "equals"
  values: unknown[]
}
```

### `RoleId`

Format: <organization_id>:<slug>

```ts
type RoleId = string
```

### `BaseRole`

```ts
type BaseRole = {
  id: string
  name: string
  slug: string
  type: string
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `BaseRoleForCreate`

```ts
type BaseRoleForCreate = {
  id?: string
  name: string
  slug: string
  type: string
  expires_at?: string // date-time
  organization_id?: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `UserRole`

```ts
type UserRole = {
  id: string
  name: string
  slug: string
  type: "user_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  parent_role?: object
}
```

### `OrgRole`

```ts
type OrgRole = {
  id: string
  name: string
  slug: string
  type: "org_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  pricing_tier?: string
}
```

### `ShareRole`

```ts
type ShareRole = {
  id: string
  name: string
  slug: string
  type: "share_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `PartnerRole`

```ts
type PartnerRole = {
  id: string
  name: string
  slug: string
  type: "partner_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  partner_org_id?: object
  vendor_enforced_user_limit?: number
}
```

### `PortalRole`

```ts
type PortalRole = {
  id: string
  name: string
  slug: string
  type: "portal_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `Role`

```ts
type Role = {
  id: string
  name: string
  slug: string
  type: "user_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  parent_role?: object
} | {
  id: string
  name: string
  slug: string
  type: "org_role"
  expires_at?: string // date-time
  organization_id: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  pricing_tier?: string
} | {
  id: string
  // ...
}
```

### `RolePayload`

```ts
type RolePayload = {
  grants?: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
    dependencies?: Array<{
      action: { ... }
      resource?: { ... }
      effect?: { ... }
      conditions?: { ... }
    }>
  }>
}
```

### `Assignment`

A role attached to an user

```ts
type Assignment = {
  user_id?: string
  roles?: string[]
}
```

### `InternalAssignment`

A role attached to an user

```ts
type InternalAssignment = {
  userId?: string
  roles?: string[]
}
```

### `OrgAssignments`

All roles attached to an users of an organization

```ts
type OrgAssignments = {
  organizationId?: string
  assignments?: Array<{
    userId?: string
    roles?: string[]
  }>
}
```

### `OrgRoles`

All roles attached to an users of an organization

```ts
type OrgRoles = {
  organizationId?: string
  roles?: Array<{
    id: string
    name: string
    slug: string
    type: "user_role"
    expires_at?: string // date-time
    organization_id: string
    grants: Array<{
      action: { ... }
      resource?: { ... }
      effect?: { ... }
      conditions?: { ... }
    }>
    parent_role?: object
  } | {
    id: string
    name: string
    slug: string
    type: "org_role"
    expires_at?: string // date-time
    organization_id: string
    grants: Array<{
      action: { ... }
      resource?: { ... }
      effect?: { ... }
      conditions?: { ... }
    }>
    pricing_tier?: string
  // ...
}
```

### `Assignments`

List of role ids attached to an user

```ts
type Assignments = string[]
```

### `UserId`

Id of a user

```ts
type UserId = string
```

### `OrganizationId`

Id of an organization

```ts
type OrganizationId = string
```

### `Slug`

Slug of a role; for a role with id = 123:manager -> 123 is org_id & manager is slug

```ts
type Slug = string
```

### `RoleSearchInput`

```ts
type RoleSearchInput = {
  role_ids?: string[]
  org_ids?: string[]
  slugs?: string[]
  query?: string
  limit?: number
  offset?: number
}
```

### `CreateRolePayload`

```ts
type CreateRolePayload = {
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  id?: string
  name: string
  slug: string
  type: string
  expires_at?: string // date-time
  organization_id?: string
}
```

### `Error`

Error response

```ts
type Error = {
  message: string
}
```
