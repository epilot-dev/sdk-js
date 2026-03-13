# Organization API

- **Base URL:** `https://organization-v2.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/organization](https://docs.epilot.io/api/organization)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.organization.getCurrentOrganization(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/organization'

const organizationClient = getClient()
authorize(organizationClient, () => '<token>')
const { data } = await organizationClient.getCurrentOrganization(...)
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

**Feature Settings**
- [`getFeatureSettings`](#getfeaturesettings)

**Schemas**
- [`OrganizationId`](#organizationid)
- [`Organization`](#organization)
- [`InternalOrganization`](#internalorganization)
- [`SettingKey`](#settingkey)
- [`Settings`](#settings)
- [`SettingsValue`](#settingsvalue)
- [`CreateOrganizationRequest`](#createorganizationrequest)
- [`DataPointsResponse`](#datapointsresponse)
- [`DataPoint`](#datapoint)
- [`OrganizationToCleanup`](#organizationtocleanup)
- [`OrganizationCleanupStatus`](#organizationcleanupstatus)
- [`HubspotCompany`](#hubspotcompany)
- [`HubspotCompaniesResponse`](#hubspotcompaniesresponse)
- [`HubspotOrganizationData`](#hubspotorganizationdata)
- [`FeatureSettings`](#featuresettings)
- [`FeatureFlagMetadata`](#featureflagmetadata)
- [`I18nString`](#i18nstring)
- [`VisibilityRule`](#visibilityrule)

### `getCurrentOrganization`

Retrieves the organization associated with the authenticated user's current session.

`GET /v2/organization/current`

```ts
const { data } = await client.getCurrentOrganization()
```

<details>
<summary>Response</summary>

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
  "free_user_limit": 50,
  "tags": ["test org"]
}
```

</details>

---

### `getOrganization`

Retrieves detailed information about a specific organization by its unique identifier.

`GET /v2/organization/{org_id}`

```ts
const { data } = await client.getOrganization({
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

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
  "free_user_limit": 50,
  "tags": ["test org"]
}
```

</details>

---

### `updateOrganization`

Updates an organization's profile information.

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
    free_user_limit: 50,
    tags: ['test org']
  },
)
```

<details>
<summary>Response</summary>

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
  "free_user_limit": 50,
  "tags": ["test org"]
}
```

</details>

---

### `getSettings`

Retrieves all configuration settings for an organization.

`GET /v2/organization/{org_id}/settings`

```ts
const { data } = await client.getSettings({
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "double_opt_in": {
    "enabled": true
  },
  "email_tracking": {
    "enabled": true,
    "track_opens": true
  },
  "default_language": "de"
}
```

</details>

---

### `putSettingsValue`

Creates or updates a specific organization setting identified by its key.

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

<details>
<summary>Response</summary>

```json
{
  "enabled": true
}
```

</details>

---

### `deleteSettingsValue`

Removes a specific organization setting identified by its key.

`DELETE /v2/organization/{org_id}/settings/{key}`

```ts
const { data } = await client.deleteSettingsValue({
  org_id: 'example',
  key: 'example',
})
```

---

### `getFeatureSettings`

Get platform configuration metadata

`GET /v2/feature-settings`

```ts
const { data } = await client.getFeatureSettings()
```

---

## Schemas

### `OrganizationId`

Unique identifier for an organization (tenant) in the epilot platform

```ts
type OrganizationId = string
```

### `Organization`

Represents an epilot organization (tenant).

An organization contains all the configuration, branding, and contact information
for a tenant account on the epilot platform.


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
  tags?: string[]
}
```

### `InternalOrganization`

Extended organization object with internal-only fields.

Includes all fields from the base Organization schema plus additional
internal metadata used for platform administration and support.


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
  tags?: string[]
}
```

### `SettingKey`

A unique key identifying an organization setting.
Common setting keys include: double_opt_in, email_tracking, default_language, workflow_notifications


```ts
type SettingKey = string
```

### `Settings`

A key-value map of all organization settings.
Keys are setting identifiers and values can be any valid JSON type.


```ts
type Settings = Record<string, unknown>
```

### `SettingsValue`

The value of an organization setting.
Can be any valid JSON type: string, number, boolean, array, or object.


```ts
type SettingsValue = string | number | boolean | Record<string, unknown>[] | Record<string, unknown>
```

### `CreateOrganizationRequest`

Request payload for creating a new organization

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

List of data point metrics for all organizations

```ts
type DataPointsResponse = Array<{
  id?: number
  max_customer?: number
  actual_customer?: number
}>
```

### `DataPoint`

Data point metrics for a single organization, used for usage tracking and billing

```ts
type DataPoint = {
  id?: number
  max_customer?: number
  actual_customer?: number
}
```

### `OrganizationToCleanup`

Represents an organization that has been marked for deletion and requires cleanup.
Contains metadata about the deletion request.


```ts
type OrganizationToCleanup = {
  org_id: string
  deleted_at: string // date-time
  deleted_by: string
}
```

### `OrganizationCleanupStatus`

Records the cleanup status reported by a specific service for an organization.
Each service that stores organization data reports its cleanup operations here.


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

### `HubspotCompany`

Represents a company record from HubSpot CRM synchronized to the epilot data warehouse.
Used for CRM integration and organization mapping.


```ts
type HubspotCompany = {
  company_id?: string
  company_name?: string
  domain?: string
}
```

### `HubspotCompaniesResponse`

Response containing a list of HubSpot companies matching the search criteria

```ts
type HubspotCompaniesResponse = {
  results?: Array<{
    company_id?: string
    company_name?: string
    domain?: string
  }>
  total?: number
}
```

### `HubspotOrganizationData`

HubSpot company data associated with an epilot organization.
Contains business metrics and CRM properties synced from HubSpot.


```ts
type HubspotOrganizationData = {
  company_id?: string
  company_name?: string
  domain?: string
  current_mrr?: string
  potential_mrr?: string
  company_size?: string
  pricing_tier?: string
  lifecyclestage?: string
  industry?: string
  numberofemployees?: string
  customer_number?: string
  no_of_users?: string
  activation_rate?: string
  active_features?: string
  usecases_implemented?: string
  buyer_journey?: string
  country?: string
  city?: string
  properties?: Record<string, unknown>
}
```

### `FeatureSettings`

Feature settings metadata served to frontend applications.

```ts
type FeatureSettings = {
  version: string
  feature_flags: Array<{
    feature_name: string
    title?: {
      key: { ... }
      default_value?: { ... }
    }
    description?: {
      key: { ... }
      default_value?: { ... }
    }
    badge?: "alpha" | "beta" | "new" | "advanced" | "experiment" | "deprecated"
    confetti?: boolean
    one_way?: boolean
    reverse_checked?: boolean
    is_visible_for_partner?: boolean
    visibility_rules: Array<{
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }>
  }>
}
```

### `FeatureFlagMetadata`

Metadata for a single feature flag toggle

```ts
type FeatureFlagMetadata = {
  feature_name: string
  title?: {
    key: string
    default_value?: string
  }
  description?: {
    key: string
    default_value?: string
  }
  badge?: "alpha" | "beta" | "new" | "advanced" | "experiment" | "deprecated"
  confetti?: boolean
  one_way?: boolean
  reverse_checked?: boolean
  is_visible_for_partner?: boolean
  visibility_rules: Array<{
    type: "always" | "never" | "advanced_mode" | "pricing_tier" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
    setting_key?: string
    flag_name?: string
    action?: string
    resource?: string
    rule?: {
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }
    rules?: Array<{
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }>
  }>
}
```

### `I18nString`

Internationalized string with a translation key and optional default value

```ts
type I18nString = {
  key: string
  default_value?: string
}
```

### `VisibilityRule`

A rule that determines feature visibility. Rules are combined with AND logic
at the top level. Supports boolean combinators (and, or, not) for complex logic.


```ts
type VisibilityRule = {
  type: "always" | "never" | "advanced_mode" | "pricing_tier" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
  setting_key?: string
  flag_name?: string
  action?: string
  resource?: string
  rule?: {
    type: "always" | "never" | "advanced_mode" | "pricing_tier" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
    setting_key?: string
    flag_name?: string
    action?: string
    resource?: string
    rule?: {
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }
    rules?: Array<{
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }>
  }
  rules?: Array<{
    type: "always" | "never" | "advanced_mode" | "pricing_tier" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
    setting_key?: string
    flag_name?: string
    action?: string
    resource?: string
    rule?: {
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }
    rules?: Array<{
      type: { ... }
      setting_key?: { ... }
      flag_name?: { ... }
      action?: { ... }
      resource?: { ... }
      rule?: { ... }
      rules?: { ... }
    }>
  }>
}
```
