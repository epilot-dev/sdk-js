# Partner API

- **Base URL:** `https://partner-directory-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/partner-directory](https://docs.epilot.io/api/partner-directory)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.partnerDirectory.approvePartner(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/partner-directory'

const partnerDirectoryClient = getClient()
authorize(partnerDirectoryClient, () => '<token>')
const { data } = await partnerDirectoryClient.approvePartner(...)
```

## Operations

**partners**
- [`approvePartner`](#approvepartner)
- [`rejectPartner`](#rejectpartner)
- [`searchAssignable`](#searchassignable)
- [`batchGetAssignable`](#batchgetassignable)
- [`getPartnerByToken`](#getpartnerbytoken)
- [`activatePartner`](#activatepartner)
- [`searchGeolocationForText`](#searchgeolocationfortext)
- [`invitePartnerV2`](#invitepartnerv2)

**partner_users**
- [`getPartnerUsers`](#getpartnerusers)
- [`createPartnerUser`](#createpartneruser)
- [`deletePartnerUser`](#deletepartneruser)
- [`getPartnerRoles`](#getpartnerroles)
- [`createPartnerRole`](#createpartnerrole)
- [`updatePartnerRole`](#updatepartnerrole)
- [`assignPartnerUserRoles`](#assignpartneruserroles)
- [`unassignPartnerUserRoles`](#unassignpartneruserroles)

**Schemas**
- [`InviteToken`](#invitetoken)
- [`Partner`](#partner)
- [`PartnerId`](#partnerid)
- [`OrganizationId`](#organizationid)
- [`ActivatePartnerPayload`](#activatepartnerpayload)
- [`PartnerInvitationPayload`](#partnerinvitationpayload)
- [`Assignable`](#assignable)
- [`BaseAssignable`](#baseassignable)
- [`AssignableUser`](#assignableuser)
- [`AssignablePartnerUser`](#assignablepartneruser)
- [`AssignableGroup`](#assignablegroup)
- [`AssignableOrganization`](#assignableorganization)
- [`AssignableEcpPlaceholder`](#assignableecpplaceholder)
- [`SearchGeolocation`](#searchgeolocation)
- [`Geolocation`](#geolocation)
- [`Address`](#address)
- [`AddressGeolocation`](#addressgeolocation)
- [`PartnerUser`](#partneruser)
- [`CreatePartnerUserPayload`](#createpartneruserpayload)
- [`CreatePartnerRolePayload`](#createpartnerrolepayload)
- [`UpdatePartnerRolePayload`](#updatepartnerrolepayload)
- [`Grant`](#grant)
- [`GrantWithDependencies`](#grantwithdependencies)
- [`GrantCondition`](#grantcondition)
- [`EqualsCondition`](#equalscondition)
- [`RoleId`](#roleid)
- [`BaseRoleForCreate`](#baseroleforcreate)
- [`PartnerRole`](#partnerrole)
- [`AssignRolesPayload`](#assignrolespayload)
- [`User`](#user)

### `approvePartner`

Approve partner request

`POST /v1/partners/{id}/approve`

```ts
const { data } = await client.approvePartner({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.rejectPartner({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

searchAssignables

`POST /v1/partners/assignables:search`

```ts
const { data } = await client.searchAssignable(
  null,
  {
    q: '',
    from: 0,
    size: 25,
    org_ids: ['123'],
    portalUsersEntityIdScope: '',
    types: ['user', 'partner_user', 'partner_organization', 'ecp', 'group']
  },
)
```

<details>
<summary>Response</summary>

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

batchGet

`POST /v1/partners/assignables:batchGet`

```ts
const { data } = await client.batchGetAssignable(
  null,
  [
    {
      user_id: 'string',
      org_id: 'string',
      group_id: 'string'
    }
  ],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPartnerByToken({
  token: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.activatePartner(
  {
    token: 'example',
  },
  {
    company_name: 'Company name',
    signed_up_email: 'user@example.com',
    organization_id: 'string'
  },
)
```

---

### `searchGeolocationForText`

Converts a given string, in the format of an address, to geo-location latitude and longitude

`POST /v1/geolocation/text:search`

```ts
const { data } = await client.searchGeolocationForText(
  null,
  {
    address: 'Auweg 1, 93055 Regensburg, DE'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.invitePartnerV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    language: 'en'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPartnerUsers({
  orgId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createPartnerUser(
  {
    orgId: 'example',
  },
  {
    email: 'user@example.com',
    language: 'en',
    roles: ['role-123', 'role-456']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePartnerUser({
  orgId: 'example',
  userId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `getPartnerRoles`

Get all roles for a partner organization

`GET /v2/partners/{orgId}/roles`

```ts
const { data } = await client.getPartnerRoles({
  orgId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createPartnerRole(
  {
    orgId: 'example',
  },
  {
    name: 'Partner Admin',
    slug: 'partner_admin',
    grants: [
      {
        action: 'entity-read',
        resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
        effect: 'allow',
        conditions: [
          {
            attribute: 'workflows.primary.task_name',
            operation: 'equals',
            values: ['Qualification']
          }
        ],
        dependencies: [
          {
            action: 'entity-read',
            resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
            effect: 'allow',
            conditions: [
              {
                attribute: 'workflows.primary.task_name',
                operation: 'equals',
                values: ['Qualification']
              }
            ]
          }
        ]
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updatePartnerRole(
  {
    orgId: 'example',
    roleId: 'example',
  },
  {
    grants: [
      {
        action: 'entity-read',
        resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
        effect: 'allow',
        conditions: [
          {
            attribute: 'workflows.primary.task_name',
            operation: 'equals',
            values: ['Qualification']
          }
        ],
        dependencies: [
          {
            action: 'entity-read',
            resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
            effect: 'allow',
            conditions: [
              {
                attribute: 'workflows.primary.task_name',
                operation: 'equals',
                values: ['Qualification']
              }
            ]
          }
        ]
      }
    ],
    id: '123:owner',
    name: 'Owner',
    slug: 'owner'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.assignPartnerUserRoles(
  {
    orgId: 'example',
    userId: 'example',
  },
  {
    roleIds: ['role-123', 'role-456']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.unassignPartnerUserRoles(
  {
    orgId: 'example',
    userId: 'example',
  },
  {
    roleIds: ['role-123', 'role-456']
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `InviteToken`

```ts
type InviteToken = string
```

### `Partner`

```ts
type Partner = {
  id?: string
  organization_id?: string
  created_at?: string
  description?: string
  company_name?: string
  invitation_token?: string
  invitation_email?: string // email
  email?: string // email
  owner_email?: string // email
  signed_up_email?: string // email
  partner_org_id?: string
  status?: "Pending" | "Request" | "Deleted" | "Invited" | "Rejected"
}
```

### `PartnerId`

```ts
type PartnerId = string
```

### `OrganizationId`

```ts
type OrganizationId = string
```

### `ActivatePartnerPayload`

```ts
type ActivatePartnerPayload = {
  company_name?: string
  signed_up_email: string // email
  organization_id: string
}
```

### `PartnerInvitationPayload`

```ts
type PartnerInvitationPayload = {
  language?: "en" | "de"
}
```

### `Assignable`

```ts
type Assignable = {
  type: "user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id?: string
  email?: string
} | {
  type: "partner_user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id?: string
  user_id?: string
  email?: string
} | {
  type: "partner_organization"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id: string
  email?: string
  geolocations?: Array<{
    address?: {
      street?: { ... }
      street_number?: { ... }
      city?: { ... }
      postal_code?: { ... }
      country?: { ... }
    }
    lat: number
    lng: number
    addressLabel?: string
    relevance?: number
  }>
  phone?: string
  activity_radius?: number
} | {
  type: "ecp"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id: string
  email?: string
} | {
  type: string
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  group_id?: string
}
```

### `BaseAssignable`

```ts
type BaseAssignable = {
  type: string
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
}
```

### `AssignableUser`

```ts
type AssignableUser = {
  type: "user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id?: string
  email?: string
}
```

### `AssignablePartnerUser`

```ts
type AssignablePartnerUser = {
  type: "partner_user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id?: string
  user_id?: string
  email?: string
}
```

### `AssignableGroup`

```ts
type AssignableGroup = {
  type: string
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  group_id?: string
}
```

### `AssignableOrganization`

```ts
type AssignableOrganization = {
  type: "partner_organization"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id: string
  email?: string
  geolocations?: Array<{
    address?: {
      street?: { ... }
      street_number?: { ... }
      city?: { ... }
      postal_code?: { ... }
      country?: { ... }
    }
    lat: number
    lng: number
    addressLabel?: string
    relevance?: number
  }>
  phone?: string
  activity_radius?: number
}
```

### `AssignableEcpPlaceholder`

```ts
type AssignableEcpPlaceholder = {
  type: "ecp"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string
  activated_at?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id: string
  email?: string
}
```

### `SearchGeolocation`

```ts
type SearchGeolocation = {
  address: string
}
```

### `Geolocation`

```ts
type Geolocation = {
  lat: number
  lng: number
  addressLabel?: string
  relevance?: number
}
```

### `Address`

```ts
type Address = {
  street?: string
  street_number?: string
  city?: string
  postal_code?: string
  country?: string
}
```

### `AddressGeolocation`

```ts
type AddressGeolocation = {
  address?: {
    street?: string
    street_number?: string
    city?: string
    postal_code?: string
    country?: string
  }
  lat: number
  lng: number
  addressLabel?: string
  relevance?: number
}
```

### `PartnerUser`

```ts
type PartnerUser = {
  id: string
  name?: string
  email: string // email
  status: string
  image?: {
    original?: string // uri
    thumbnail_32?: string // uri
  }
  roles: Array<{
    id: string
    slug: string
    name: string
  }>
}
```

### `CreatePartnerUserPayload`

```ts
type CreatePartnerUserPayload = {
  email: string // email
  language?: "en" | "de"
  roles?: string[]
}
```

### `CreatePartnerRolePayload`

```ts
type CreatePartnerRolePayload = {
  name: string
  slug: string
  grants: Array<{
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

### `UpdatePartnerRolePayload`

```ts
type UpdatePartnerRolePayload = {
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
  id?: string
  name: string
  slug: string
}
```

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

Format: `<organization_id>`:`<slug>`

```ts
type RoleId = string
```

### `BaseRoleForCreate`

```ts
type BaseRoleForCreate = {
  id?: string
  name: string
  slug: string
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
  slug: string
  name: string
  type?: string
}
```

### `AssignRolesPayload`

```ts
type AssignRolesPayload = {
  roleIds: string[]
}
```

### `User`

```ts
type User = {
  id?: string
  email?: string // email
  display_name?: string
  status?: string
}
```
