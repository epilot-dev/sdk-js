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
- [`notifySettingsValueUpdated`](#notifysettingsvalueupdated)

**Feature Settings**
- [`getOrganizationFeatureSettings`](#getorganizationfeaturesettings)

**Announcements**
- [`getActiveAnnouncement`](#getactiveannouncement)
- [`acknowledgeAnnouncement`](#acknowledgeannouncement)

**Schemas**
- [`OrganizationId`](#organizationid)
- [`Organization`](#organization)
- [`Settings`](#settings)
- [`SettingsValue`](#settingsvalue)
- [`FeatureSettings`](#featuresettings)
- [`FeatureFlagMetadata`](#featureflagmetadata)
- [`I18nString`](#i18nstring)
- [`VisibilityRule`](#visibilityrule)
- [`AnnouncementType`](#announcementtype)
- [`AnnouncementMessage`](#announcementmessage)
- [`Announcement`](#announcement)
- [`AnnouncementOrganizationStatusValue`](#announcementorganizationstatusvalue)
- [`AnnouncementOrganizationStatus`](#announcementorganizationstatus)
- [`ActiveAnnouncementResponse`](#activeannouncementresponse)

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

### `notifySettingsValueUpdated`

Sends an internal notification that an organization setting was updated.

`POST /v2/organization/{org_id}/settings/{key}/notifications`

```ts
const { data } = await client.notifySettingsValueUpdated(
  {
    org_id: 'example',
    key: 'example',
  },
  {
    user_email: 'string',
    org_name: 'string',
    value: {
      enabled: true
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "delivered": true
}
```

</details>

---

### `getOrganizationFeatureSettings`

Get organization feature settings.

`GET /v2/organization/feature-settings`

```ts
const { data } = await client.getOrganizationFeatureSettings()
```

---

### `getActiveAnnouncement`

Returns the announcement (e.g. a subprocessor change notice) to show as a portal banner for the
caller's organization.

`GET /v2/organization/announcements/active`

```ts
const { data } = await client.getActiveAnnouncement()
```

<details>
<summary>Response</summary>

```json
{
  "announcement": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "subprocessor_change",
    "message": {
      "de": "Wir haben unsere Liste der Subdienstleister aktualisiert (gültig ab 01.11.2026). Bitte prüfe die Änderungen.",
      "en": "We have updated our list of subprocessors (effective 01.11.2026). Please review the changes."
    },
    "link_url": "string",
    "list_version": "string",
    "effective_date": "1970-01-01",
    "window_days": 0,
    "status": "draft",
    "created_at": "1970-01-01T00:00:00.000Z",
    "created_by": "string",
    "updated_at": "1970-01-01T00:00:00.000Z",
    "published_at": "1970-01-01T00:00:00.000Z",
    "published_by": "string",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "archived_at": "1970-01-01T00:00:00.000Z",
    "archived_by": "string",
    "materialized_at": "1970-01-01T00:00:00.000Z"
  },
  "can_acknowledge": true
}
```

</details>

---

### `acknowledgeAnnouncement`

Acknowledges an announcement on behalf of the caller's organization. Only org admins
(`organization:edit`) may acknowledge.

`POST /v2/organization/announcements/{announcement_id}/acknowledge`

```ts
const { data } = await client.acknowledgeAnnouncement(
  {
    announcement_id: 'example',
  },
  {
    portal: '360'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "announcement_id": "string",
  "org_id": "string",
  "org_name": "string",
  "status": "acknowledged",
  "acknowledged_by": {
    "user_id": "string",
    "name": "string",
    "email": "string"
  },
  "acknowledged_at": "1970-01-01T00:00:00.000Z",
  "portal": "360",
  "list_version": "string",
  "recorded_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

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
  organization_use?: "Production" | "Sandbox" | "Preview"
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
      pricing_tier_classes?: { ... }
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
    type: "always" | "never" | "advanced_mode" | "pricing_tier" | "pricing_tier_class" | "production_org" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
    setting_key?: string
    flag_name?: string
    pricing_tier_classes?: string[]
    action?: string
    resource?: string
    rule?: { ... }
    rules?: { ... }[]
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
  type: "always" | "never" | "advanced_mode" | "pricing_tier" | "pricing_tier_class" | "production_org" | "feature_flag" | "permission" | "setting_enabled" | "flag_enabled" | "not" | "and" | "or"
  setting_key?: string
  flag_name?: string
  pricing_tier_classes?: string[]
  action?: string
  resource?: string
  rule?: { ... }
  rules?: { ... }[]
}
```

### `AnnouncementType`

```ts
type AnnouncementType = "subprocessor_change"
```

### `AnnouncementMessage`

```ts
type AnnouncementMessage = {
  de: string
  en?: string
}
```

### `Announcement`

```ts
type Announcement = {
  id: string // uuid
  type: "subprocessor_change"
  message: {
    de: string
    en?: string
  }
  link_url: string
  list_version: string
  effective_date: string // date
  window_days: number
  status: "draft" | "published" | "archived"
  created_at: string // date-time
  created_by?: string
  updated_at: string // date-time
  published_at?: string // date-time
  published_by?: string
  expires_at?: string // date-time
  archived_at?: string // date-time
  archived_by?: string
  materialized_at?: string // date-time
}
```

### `AnnouncementOrganizationStatusValue`

```ts
type AnnouncementOrganizationStatusValue = "acknowledged" | "pending" | "expired" | "superseded"
```

### `AnnouncementOrganizationStatus`

```ts
type AnnouncementOrganizationStatus = {
  announcement_id: string
  org_id: string
  org_name?: string
  status: "acknowledged" | "pending" | "expired" | "superseded"
  acknowledged_by?: {
    user_id: string
    name?: string
    email?: string
  }
  acknowledged_at?: string // date-time
  portal?: string
  list_version: string
  recorded_at?: string // date-time
}
```

### `ActiveAnnouncementResponse`

```ts
type ActiveAnnouncementResponse = {
  announcement: {
    id: string // uuid
    type: "subprocessor_change"
    message: {
      de: { ... }
      en?: { ... }
    }
    link_url: string
    list_version: string
    effective_date: string // date
    window_days: number
    status: "draft" | "published" | "archived"
    created_at: string // date-time
    created_by?: string
    updated_at: string // date-time
    published_at?: string // date-time
    published_by?: string
    expires_at?: string // date-time
    archived_at?: string // date-time
    archived_by?: string
    materialized_at?: string // date-time
  }
  can_acknowledge: boolean
}
```
