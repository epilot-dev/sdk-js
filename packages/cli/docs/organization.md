# Organization API

- **Base URL:** `https://organization-v2.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/organization](https://docs.epilot.io/api/organization)

Manage epilot tenant organizations

## Quick Start

```bash
# List available operations
epilot organization

# Call an operation
epilot organization getCurrentOrganization
```

## Operations

**Organization**
- [`getCurrentOrganization`](#getcurrentorganization) — Get caller's current organization
- [`getOrganization`](#getorganization) — Get an organization
- [`updateOrganization`](#updateorganization) — Updates an organization

**Organization Settings**
- [`getSettings`](#getsettings) — Get full organization settings object
- [`putSettingsValue`](#putsettingsvalue) — Updates an organization setting
- [`deleteSettingsValue`](#deletesettingsvalue) — Updates an organization nsetting

### `getCurrentOrganization`

Get caller's current organization

`GET /v2/organization/current`

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

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
  "free_user_limit": 50
}
```

</details>

---

### `getOrganization`

Get an organization

`GET /v2/organization/{org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The Id of the organization. |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

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
  "free_user_limit": 50
}
```

</details>

---

### `updateOrganization`

Updates an organization

`PATCH /v2/organization/{org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The Id of the organization. |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

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
  "free_user_limit": 50
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
  "free_user_limit": 50
}
```

</details>

---

### `getSettings`

Get full organization settings object

`GET /v2/organization/{org_id}/settings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The Id of the organization. |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

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
  }
}
```

</details>

---

### `putSettingsValue`

Updates an organization setting

`PUT /v2/organization/{org_id}/settings/{key}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The Id of the organization. |
| `key` | path | string | Yes | Organization setting key |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot organization putSettingsValue \
  -p org_id=739224 \
  -p key=example \
  -d '{"enabled":true}'
```

Using positional args for path parameters:

```bash
epilot organization putSettingsValue 739224 example
```

Using stdin pipe:

```bash
cat body.json | epilot organization putSettingsValue -p org_id=739224 -p key=example
```

With JSONata filter:

```bash
epilot organization putSettingsValue -p org_id=739224 -p key=example --jsonata '$'
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

Updates an organization nsetting

`DELETE /v2/organization/{org_id}/settings/{key}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | path | string | Yes | The Id of the organization. |
| `key` | path | string | Yes | Organization setting key |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot organization deleteSettingsValue \
  -p org_id=739224 \
  -p key=example
```

Using positional args for path parameters:

```bash
epilot organization deleteSettingsValue 739224 example
```

With JSONata filter:

```bash
epilot organization deleteSettingsValue -p org_id=739224 -p key=example --jsonata '$'
```

---
