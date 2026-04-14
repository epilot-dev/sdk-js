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

**Feature Settings**
- [`getOrganizationFeatureSettings`](#getorganizationfeaturesettings) — Returns feature flag metadata for the organization UI.

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

### `getOrganizationFeatureSettings`

Returns feature flag metadata for the organization UI.

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
