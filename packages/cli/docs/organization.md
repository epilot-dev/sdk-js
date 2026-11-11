# Organization API

- **Base URL:** `https://organization-v2.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/organization](https://docs.epilot.io/api/organization)

The Organization API provides endpoints for managing epilot tenant organizations.

## Quick Start

```bash
# List available operations
epilot organization

# Call an operation
epilot organization getCurrentOrganization
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

**Organization**
- [`getCurrentOrganization`](#getcurrentorganization) — Retrieves the organization associated with the authenticated user's current session.
- [`getOrganization`](#getorganization) — Retrieves detailed information about a specific organization by its unique identifier.
- [`updateOrganization`](#updateorganization) — Updates an organization's profile information.

**Organization Settings**
- [`getSettings`](#getsettings) — Retrieves all configuration settings for an organization.
- [`putSettingsValue`](#putsettingsvalue) — Creates or updates a specific organization setting identified by its key.
- [`deleteSettingsValue`](#deletesettingsvalue) — Removes a specific organization setting identified by its key.
- [`notifySettingsValueUpdated`](#notifysettingsvalueupdated) — Sends an internal notification that an organization setting was updated.

**Feature Settings**
- [`getOrganizationFeatureSettings`](#getorganizationfeaturesettings) — Get organization feature settings.

**Announcements**
- [`getActiveAnnouncement`](#getactiveannouncement) — Returns the announcement (e.g. a subprocessor change notice) to show as a portal banner for the
- [`acknowledgeAnnouncement`](#acknowledgeannouncement) — Acknowledges an announcement on behalf of the caller's organization. Only org admins

### `getCurrentOrganization`

Retrieves the organization associated with the authenticated user's current session.

`GET /v2/organization/current`

**Sample Call**

```bash
epilot organization getCurrentOrganization
```

With JSONata filter:

```bash
epilot organization getCurrentOrganization --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization to retrieve |

**Sample Call**

```bash
epilot organization getOrganization \
  -p org_id=739224
```

Using positional args for path parameters:

```bash
epilot organization getOrganization 739224
```

With JSONata filter:

```bash
epilot organization getOrganization -p org_id=739224 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization to update |

**Request Body** (required)

**Sample Call**

```bash
epilot organization updateOrganization \
  -p org_id=739224
```

With request body:

```bash
epilot organization updateOrganization \
  -p org_id=739224 \
  -d '{
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
}'
```

Using positional args for path parameters:

```bash
epilot organization updateOrganization 739224
```

Using stdin pipe:

```bash
cat body.json | epilot organization updateOrganization -p org_id=739224
```

With JSONata filter:

```bash
epilot organization updateOrganization -p org_id=739224 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization |

**Sample Call**

```bash
epilot organization getSettings \
  -p org_id=739224
```

Using positional args for path parameters:

```bash
epilot organization getSettings 739224
```

With JSONata filter:

```bash
epilot organization getSettings -p org_id=739224 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization |
| `key` | path | string | Yes | The setting key to create or update.
Common keys include: double_opt_in, email_tracking, default_language, workflow_notifications
 |

**Request Body** (required)

**Sample Call**

```bash
epilot organization putSettingsValue \
  -p org_id=739224 \
  -p key=double_opt_in \
  -d '{"enabled":true}'
```

Using positional args for path parameters:

```bash
epilot organization putSettingsValue 739224 double_opt_in
```

Using stdin pipe:

```bash
cat body.json | epilot organization putSettingsValue -p org_id=739224 -p key=double_opt_in
```

With JSONata filter:

```bash
epilot organization putSettingsValue -p org_id=739224 -p key=double_opt_in --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization |
| `key` | path | string | Yes | The setting key to delete |

**Sample Call**

```bash
epilot organization deleteSettingsValue \
  -p org_id=739224 \
  -p key=double_opt_in
```

Using positional args for path parameters:

```bash
epilot organization deleteSettingsValue 739224 double_opt_in
```

With JSONata filter:

```bash
epilot organization deleteSettingsValue -p org_id=739224 -p key=double_opt_in --jsonata '$'
```

---

### `notifySettingsValueUpdated`

Sends an internal notification that an organization setting was updated.

`POST /v2/organization/{org_id}/settings/{key}/notifications`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The unique identifier of the organization |
| `key` | path | string | Yes | The setting key that was updated |

**Request Body** (required)

**Sample Call**

```bash
epilot organization notifySettingsValueUpdated \
  -p org_id=739224 \
  -p key=360_features \
  -d '{"user_email":"string","org_name":"string","value":{"enabled":true}}'
```

Using positional args for path parameters:

```bash
epilot organization notifySettingsValueUpdated 739224 360_features
```

Using stdin pipe:

```bash
cat body.json | epilot organization notifySettingsValueUpdated -p org_id=739224 -p key=360_features
```

With JSONata filter:

```bash
epilot organization notifySettingsValueUpdated -p org_id=739224 -p key=360_features --jsonata 'delivered'
```

<details>
<summary>Sample Response</summary>

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

**Sample Call**

```bash
epilot organization getOrganizationFeatureSettings
```

With JSONata filter:

```bash
epilot organization getOrganizationFeatureSettings --jsonata 'version'
```

---

### `getActiveAnnouncement`

Returns the announcement (e.g. a subprocessor change notice) to show as a portal banner for the

`GET /v2/organization/announcements/active`

**Sample Call**

```bash
epilot organization getActiveAnnouncement
```

With JSONata filter:

```bash
epilot organization getActiveAnnouncement --jsonata 'announcement'
```

<details>
<summary>Sample Response</summary>

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

`POST /v2/organization/announcements/{announcement_id}/acknowledge`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `announcement_id` | path | string | Yes | Announcement id |

**Request Body**

**Sample Call**

```bash
epilot organization acknowledgeAnnouncement \
  -p announcement_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"portal":"360"}'
```

Using positional args for path parameters:

```bash
epilot organization acknowledgeAnnouncement 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot organization acknowledgeAnnouncement -p announcement_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot organization acknowledgeAnnouncement -p announcement_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'announcement_id'
```

<details>
<summary>Sample Response</summary>

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
