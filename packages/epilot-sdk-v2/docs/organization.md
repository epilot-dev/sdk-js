# Organization API

**Base URL:** `https://organization-v2.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/organization](https://docs.epilot.io/api/organization)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.organization.getCurrentOrganization(...)

// Or get the client explicitly
const organizationClient = await epilot.organization.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/organization'

const organizationClient = await getClient()
authorize(organizationClient, () => '<token>')
const { data } = await organizationClient.getCurrentOrganization(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/organization'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Organization**
- [`getCurrentOrganization`](#getcurrentorganization)
- [`getOrganization`](#getorganization)
- [`updateOrganization`](#updateorganization)

**Organization Settings**
- [`getSettings`](#getsettings)
- [`putSettingsValue`](#putsettingsvalue)
- [`deleteSettingsValue`](#deletesettingsvalue)

### `getCurrentOrganization`

Get caller's current organization

`GET /v2/organization/current`

```ts
const { data } = await client.getCurrentOrganization()
```

**Response**

```json
{
  "id": "739224",
  "name": "Epilot",
  "email": "someone@epilot.cloud",
  "phone": "+49123123123",
  "website": "https://epilot.cloud",
  "address": {
    "country": "string",
    "city": "string",
    "postal_code": "string",
    "street": "string",
    "street_number": "string"
  },
  "organization_use": "Production",
  "parent_production_org_id": "string",
  "created_date": "1970-01-01T00:00:00.000Z",
  "logo_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "logo_thumbnail_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "signature": "<p>Thanks</p>",
  "is_unlicensed_org": false,
  "style": {},
  "type": "Vendor",
  "symbol": "EPI",
  "pricing_tier": "professional",
  "free_user_limit": 50
}
```

---

### `getOrganization`

Get an organization

`GET /v2/organization/{org_id}`

```ts
const { data } = await client.getOrganization({
  org_id: 'example',
})
```

**Response**

```json
{
  "id": "739224",
  "name": "Epilot",
  "email": "someone@epilot.cloud",
  "phone": "+49123123123",
  "website": "https://epilot.cloud",
  "address": {
    "country": "string",
    "city": "string",
    "postal_code": "string",
    "street": "string",
    "street_number": "string"
  },
  "organization_use": "Production",
  "parent_production_org_id": "string",
  "created_date": "1970-01-01T00:00:00.000Z",
  "logo_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "logo_thumbnail_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "signature": "<p>Thanks</p>",
  "is_unlicensed_org": false,
  "style": {},
  "type": "Vendor",
  "symbol": "EPI",
  "pricing_tier": "professional",
  "free_user_limit": 50
}
```

---

### `updateOrganization`

Updates an organization

`PATCH /v2/organization/{org_id}`

```ts
const { data } = await client.updateOrganization(
  {
    org_id: 'example',
  },
  {
    id: '739224',
    name: 'Epilot',
    email: 'someone@epilot.cloud',
    phone: '+49123123123',
    website: 'https://epilot.cloud',
    address: {
      country: 'string',
      city: 'string',
      postal_code: 'string',
      street: 'string',
      street_number: 'string'
    },
    organization_use: 'Production',
    parent_production_org_id: 'string',
    created_date: '1970-01-01T00:00:00.000Z',
    logo_url: 'https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png',
    logo_thumbnail_url: 'https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png',
    signature: '<p>Thanks</p>',
    is_unlicensed_org: false,
    style: {},
    type: 'Vendor',
    symbol: 'EPI',
    pricing_tier: 'professional',
    free_user_limit: 50
  },
)
```

**Response**

```json
{
  "id": "739224",
  "name": "Epilot",
  "email": "someone@epilot.cloud",
  "phone": "+49123123123",
  "website": "https://epilot.cloud",
  "address": {
    "country": "string",
    "city": "string",
    "postal_code": "string",
    "street": "string",
    "street_number": "string"
  },
  "organization_use": "Production",
  "parent_production_org_id": "string",
  "created_date": "1970-01-01T00:00:00.000Z",
  "logo_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "logo_thumbnail_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
  "signature": "<p>Thanks</p>",
  "is_unlicensed_org": false,
  "style": {},
  "type": "Vendor",
  "symbol": "EPI",
  "pricing_tier": "professional",
  "free_user_limit": 50
}
```

---

### `getSettings`

Get full organization settings object

`GET /v2/organization/{org_id}/settings`

```ts
const { data } = await client.getSettings({
  org_id: 'example',
})
```

**Response**

```json
{
  "double_opt_in": {
    "enabled": true
  }
}
```

---

### `putSettingsValue`

Updates an organization setting

`PUT /v2/organization/{org_id}/settings/{key}`

```ts
const { data } = await client.putSettingsValue(
  {
    org_id: 'example',
    key: 'example',
  },
  {
    enabled: true
  },
)
```

**Response**

```json
{
  "enabled": true
}
```

---

### `deleteSettingsValue`

Updates an organization nsetting

`DELETE /v2/organization/{org_id}/settings/{key}`

```ts
const { data } = await client.deleteSettingsValue({
  org_id: 'example',
  key: 'example',
})
```

---

## Schemas

### `OrganizationId`

```ts
type OrganizationId = string
```

### `Organization`

```ts
type Organization = {
  id?: string
  name?: string
  email?: string
  phone?: string
  website?: string
  address?: {
    country?: string
    city?: string
    postal_code?: string
    street?: string
    street_number?: string
  }
  organization_use?: "Production" | "Sandbox"
  parent_production_org_id?: string
  created_date?: string // date-time
  logo_url?: string
  logo_thumbnail_url?: string
  signature?: string
  is_unlicensed_org?: boolean
  style?: Record<string, unknown>
  type?: "Vendor" | "Partner"
  symbol?: string
  pricing_tier?: string
  free_user_limit?: number
}
```

### `InternalOrganization`

```ts
type InternalOrganization = {
  id?: string
  name?: string
  email?: string
  phone?: string
  website?: string
  address?: {
    country?: string
    city?: string
    postal_code?: string
    street?: string
    street_number?: string
  }
  organization_use?: "Production" | "Sandbox"
  parent_production_org_id?: string
  created_date?: string // date-time
  logo_url?: string
  logo_thumbnail_url?: string
  signature?: string
  is_unlicensed_org?: boolean
  style?: Record<string, unknown>
  type?: "Vendor" | "Partner"
  symbol?: string
  pricing_tier?: string
  free_user_limit?: number
}
```

### `SettingKey`

```ts
type SettingKey = string
```

### `Settings`

```ts
type Settings = Record<string, unknown>
```

### `SettingsValue`

```ts
type SettingsValue = string | number | boolean | Record<string, unknown>[] | Record<string, unknown>
```

### `CreateOrganizationRequest`

```ts
type CreateOrganizationRequest = {
  organization_detail?: {
    name: string
    email_address?: string
    type: string
    organization_use?: "Production" | "Sandbox"
    pricing_tier_id: string
  }
  owner_user?: {
    full_name?: string
    email_address: string
  }
}
```

### `DataPointsResponse`

```ts
type DataPointsResponse = Array<{
  id?: number
  max_customer?: number
  actual_customer?: number
}>
```

### `DataPoint`

```ts
type DataPoint = {
  id?: number
  max_customer?: number
  actual_customer?: number
}
```

### `OrganizationToCleanup`

```ts
type OrganizationToCleanup = {
  org_id: string
  deleted_at: string // date-time
  deleted_by: string
}
```

### `OrganizationCleanupStatus`

```ts
type OrganizationCleanupStatus = {
  org_id: string
  service_name: string
  operations?: Array<{
    action?: string
    resource?: string
    extra_info?: string | number | boolean | Record<string, unknown>[] | Record<string, unknown>
  }>
}
```
