# Partner Directory API

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

**Partners**
- [`approvePartner`](#approvepartner)
- [`rejectPartner`](#rejectpartner)
- [`searchAssignable`](#searchassignable)
- [`batchGetAssignable`](#batchgetassignable)
- [`getPartnerByToken`](#getpartnerbytoken)
- [`activatePartner`](#activatepartner)
- [`searchGeolocationForText`](#searchgeolocationfortext)
- [`invitePartnerV2`](#invitepartnerv2)

**Partner Users**
- [`getPartnerUsers`](#getpartnerusers)
- [`createPartnerUser`](#createpartneruser)
- [`deletePartnerUser`](#deletepartneruser)
- [`getPartnerRoles`](#getpartnerroles)
- [`createPartnerRole`](#createpartnerrole)
- [`updatePartnerRole`](#updatepartnerrole)
- [`deletePartnerRole`](#deletepartnerrole)
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

Approves a pending partner request, allowing the partner to begin collaboration.

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

```ts
const { data } = await client.searchAssignable(
  null,
  {
    q: 'john',
    from: 0,
    size: 25,
    org_ids: ['123', '456'],
    portalUsersEntityIdScope: 'f7c22299-ca72-4bca-8538-0a88eeefc947',
    types: ['user', 'partner_user', 'partner_organization', 'ecp', 'group']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.batchGetAssignable(
  null,
  [
    {
      user_id: '456',
      org_id: '123',
      group_id: 'group-789'
    }
  ],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.activatePartner(
  {
    token: 'example',
  },
  {
    company_name: 'Acme Solar GmbH',
    signed_up_email: 'admin@acme-solar.de',
    organization_id: '456'
  },
)
```

---

### `searchGeolocationForText`

Converts an address string to geographic coordinates (latitude and longitude).

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
  "addressLabel": "Auweg 1, 93055 Regensburg, Germany",
  "relevance": 0.95
}
```

</details>

---

### `invitePartnerV2`

Sends an invitation email to a partner organization to begin collaboration.

`POST /v2/partners/{id}/invite`

```ts
const { data } = await client.invitePartnerV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    language: 'de'
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

```ts
const { data } = await client.createPartnerUser(
  {
    orgId: 'example',
  },
  {
    email: 'newuser@partner.com',
    language: 'de',
    roles: ['123:partner_viewer']
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

Removes a user from a partner organization.

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

Retrieves all roles defined for a partner organization.

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

```ts
const { data } = await client.createPartnerRole(
  {
    orgId: 'example',
  },
  {
    name: 'Partner Administrator',
    slug: 'partner_admin',
    grants: [
      {
        action: 'entity-read',
        resource: 'entity:123:contact:*',
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
            resource: 'entity:123:contact:*',
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
        resource: 'entity:123:contact:*',
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
            resource: 'entity:123:contact:*',
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

```ts
const { data } = await client.deletePartnerRole({
  orgId: 'example',
  roleId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.assignPartnerUserRoles(
  {
    orgId: 'example',
    userId: 'example',
  },
  {
    roleIds: ['123:partner_admin', '123:partner_viewer']
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

Removes one or more roles from a user in a partner organization.

`DELETE /v2/partners/{orgId}/users/{userId}/roles`

```ts
const { data } = await client.unassignPartnerUserRoles(
  {
    orgId: 'example',
    userId: 'example',
  },
  {
    roleIds: ['123:partner_admin', '123:partner_viewer']
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

A secure token used for partner invitation and activation. Sent via email to the invited partner.

```ts
type InviteToken = string
```

### `Partner`

Represents a partner organization in the partner directory.

Partners go through a lifecycle from invitation to active collaboration:
- **Pending**: Initial state when partner record is created
- **Invited**: Invitation email has been sent to the partner
- **Request**: Partner has requested to join 

```ts
type Partner = {
  id?: string
  organization_id?: string
  created_at?: string // date-time
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

Unique identifier for a partner record (UUID format)

```ts
type PartnerId = string
```

### `OrganizationId`

Unique identifier for an organization in the epilot platform

```ts
type OrganizationId = string
```

### `ActivatePartnerPayload`

Payload for activating a partner account using an invitation token

```ts
type ActivatePartnerPayload = {
  company_name?: string
  signed_up_email: string // email
  organization_id: string
}
```

### `PartnerInvitationPayload`

Configuration options for sending a partner invitation

```ts
type PartnerInvitationPayload = {
  language?: "en" | "de"
}
```

### `Assignable`

A user, organization, or group that can be assigned to tasks, workflows, or entities.
The `type` field discriminates between different assignable types.


```ts
type Assignable = {
  type: "user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id?: string
  email?: string // email
} | {
  type: "partner_user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id?: string
  user_id?: string
  email?: string // email
} | {
  type: "partner_organization"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id: string
  email?: string // email
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
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id: string
  email?: string // email
} | {
  type: "group"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  group_id?: string
}
```

### `BaseAssignable`

Common properties shared by all assignable types

```ts
type BaseAssignable = {
  type: string
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
}
```

### `AssignableUser`

A user within the caller's organization that can be assigned to tasks or entities

```ts
type AssignableUser = {
  type: "user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id?: string
  email?: string // email
}
```

### `AssignablePartnerUser`

A user from a partner organization that can be assigned to shared tasks or entities

```ts
type AssignablePartnerUser = {
  type: "partner_user"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id?: string
  user_id?: string
  email?: string // email
}
```

### `AssignableGroup`

A user group that can be assigned to tasks or entities. All members of the group will be notified/assigned.

```ts
type AssignableGroup = {
  type: "group"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  group_id?: string
}
```

### `AssignableOrganization`

A partner organization that can be assigned to tasks or entities at the organization level.
Useful when you want to assign work to a partner company rather than a specific individual.


```ts
type AssignableOrganization = {
  type: "partner_organization"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  partner_id: string
  email?: string // email
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

An End Customer Portal (ECP) user that can be assigned to tasks or entities.
These are external users who access the system through the customer portal.


```ts
type AssignableEcpPlaceholder = {
  type: "ecp"
  display_name: string
  image_uri?: {
    original: string // uri
    thumbnail_32?: string // uri
  }
  org_id: string
  created_at?: string // date-time
  activated_at?: string // date-time
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  user_id: string
  email?: string // email
}
```

### `SearchGeolocation`

Request payload for geocoding an address to coordinates

```ts
type SearchGeolocation = {
  address: string
}
```

### `Geolocation`

Geographic coordinates with optional metadata

```ts
type Geolocation = {
  lat: number
  lng: number
  addressLabel?: string
  relevance?: number
}
```

### `Address`

Structured postal address

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

Combined address and geographic coordinates for a location

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

A user within a partner organization, including their assigned roles

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

Request payload for creating a new user in a partner organization

```ts
type CreatePartnerUserPayload = {
  email: string // email
  language?: "en" | "de"
  roles?: string[]
}
```

### `CreatePartnerRolePayload`

Request payload for creating a new role in a partner organization

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

Request payload for updating an existing role in a partner organization

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

A permission grant that allows or denies a specific action on a resource.

Grants are the building blocks of roles and define what users can do within the system.


```ts
type Grant = {
  action: string
  resource?: string
  effect?: "allow" | "deny"
  conditions?: object[]
}
```

### `GrantWithDependencies`

A grant with optional dependent grants that are automatically included when this grant is assigned

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

An additional condition that must be met for a grant to apply.
Conditions allow fine-grained control over when permissions are active.


```ts
type GrantCondition = object
```

### `EqualsCondition`

A condition that checks if an attribute equals one of the specified values.
The grant only applies when the condition is satisfied.


```ts
type EqualsCondition = {
  attribute: string
  operation: "equals"
  values: string[]
}
```

### `RoleId`

Unique identifier for a role, combining organization ID and role slug.
Format: `<organization_id>`:`<slug>`


```ts
type RoleId = string
```

### `BaseRoleForCreate`

Base schema for creating or updating a role

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

A role definition for users in a partner organization

```ts
type PartnerRole = {
  id: string
  slug: string
  name: string
  type?: string
  grants: Array<{
    action: string
    resource?: string
    effect?: "allow" | "deny"
    conditions?: object[]
  }>
}
```

### `AssignRolesPayload`

Request payload for assigning or unassigning roles to/from a user

```ts
type AssignRolesPayload = {
  roleIds: string[]
}
```

### `User`

A user account in the epilot platform

```ts
type User = {
  id?: string
  email?: string // email
  display_name?: string
  status?: "Active" | "Pending" | "Deactivated"
}
```
