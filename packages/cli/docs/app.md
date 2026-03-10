# App API

- **Base URL:** `https://app.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/app](https://docs.epilot.io/api/app)

API for managing app publishing and installed app.

## Quick Start

```bash
# List available operations
epilot app

# Call an operation
epilot app getPublicFacingComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p componentId=123e4567-e89b-12d3-a456-426614174000
```

## Operations

**App Installation**
- [`getPublicFacingComponent`](#getpublicfacingcomponent) — Retrieve public facing components for an installed app
- [`listInstallations`](#listinstallations) — Retrieve a list of installed apps for the organization.
- [`getInstallation`](#getinstallation) — Retrieve details of an installed app by its ID.
- [`install`](#install) — Upsert app installation by its ID.
- [`patchInstallation`](#patchinstallation) — Patch an installed app by its ID.
- [`uninstall`](#uninstall) — Uninstall an app by its ID.
- [`promoteVersion`](#promoteversion) — Update an installed app to a new version

**App Configuration**
- [`listConfigurations`](#listconfigurations) — List all app configuration metadata owned by an organization. To get full app configuration details, use the /v1/app-con
- [`createConfiguration`](#createconfiguration) — Create a new private app configuration. To make it public a verification process needs to be triggered
- [`listPublicConfigurations`](#listpublicconfigurations) — List all publicly available app configurations that can be installed. This endpoint returns apps that have at least one 
- [`getPublicConfiguration`](#getpublicconfiguration) — Retrieve the public configuration of an app to install in your tenant
- [`getConfiguration`](#getconfiguration) — Retrieve a specific app configuration
- [`patchMetadata`](#patchmetadata) — Patch non-versioned configuration metadata of a given app configuration.
- [`deleteConfiguration`](#deleteconfiguration) — Delete an app configuration and all its versions and components.
- [`createBundleUploadUrl`](#createbundleuploadurl) — Generate a presigned URL for uploading app bundle to /<app-id>/bundle.js path
- [`createZipUploadUrl`](#createzipuploadurl) — Generate a presigned URL to upload a zip file with artifacts that will be unpacked in a new directory under the /<app-id
- [`createLogoUploadUrl`](#createlogouploadurl) — Generate a presigned URL for uploading app logo to /<app-id>/logo.png path
- [`deleteLogo`](#deletelogo) — Delete the app logo from /<app-id>/logo.png path
- [`listVersions`](#listversions) — Retrieve a list of versions for an app configuration
- [`getVersion`](#getversion) — Retrieve a specific version of an app configuration
- [`patchVersion`](#patchversion) — Patch an existing app version
- [`deleteVersion`](#deleteversion) — Delete a specific version of an app configuration
- [`getReview`](#getreview) — Retrieve the review status of a specific app version
- [`createReview`](#createreview) — Submit an app version for review to make it public
- [`createComponent`](#createcomponent) — Patch an existing app version to create/add a component
- [`patchComponent`](#patchcomponent) — Patch an existing app version to update its components
- [`deleteComponent`](#deletecomponent) — Delete a specific component from an app version
- [`cloneVersion`](#cloneversion) — Clone an existing app version to create a new version

**App Analytics**
- [`queryEvents`](#queryevents) — Query analytics events for a specific app with flexible filtering
- [`ingestEvent`](#ingestevent) — Internal endpoint for services to submit app events for analytic purposes

### `getPublicFacingComponent`

Retrieve public facing components for an installed app

`GET /v1/public/app/{appId}/components/{componentId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration to install |
| `componentId` | path | string | Yes | ID of the component to retrieve |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getPublicFacingComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p componentId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app getPublicFacingComponent 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app getPublicFacingComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p componentId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'component'
```

<details>
<summary>Sample Response</summary>

```json
{
  "component": {
    "component_type": "CUSTOM_JOURNEY_BLOCK",
    "configuration": {
      "override_dev_mode": {
        "override_url": "http://localhost:3000"
      },
      "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
      "component_tag": "string",
      "component_args": [
        {
          "type": "text"
        }
      ],
      "component_size": 0,
      "component_mapping": {}
    }
  }
}
```

</details>

---

### `listConfigurations`

List all app configuration metadata owned by an organization. To get full app configuration details, use the /v1/app-con

`GET /v1/app-configurations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `page` | query | number | No | Page number for pagination |
| `pageSize` | query | number | No | Number of items per page |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app listConfigurations
```

With JSONata filter:

```bash
epilot app listConfigurations --jsonata 'configurations'
```

<details>
<summary>Sample Response</summary>

```json
{
  "configurations": [
    {
      "app_id": "string",
      "name": "string",
      "author": {
        "name": "string",
        "company": "string",
        "email": "string"
      },
      "dev_mode": true,
      "versions": ["string"],
      "public_versions": ["string"],
      "support_email": "string",
      "latest_version": "string",
      "category": "string",
      "icon_url": "string",
      "documentation_url": "string",
      "description": {
        "en": "string",
        "de": "string"
      },
      "notifications": {
        "email": "developer@example.com",
        "events": ["app.installed"]
      },
      "owner_org_id": "string",
      "internal": false,
      "pricing": {
        "pricing_type": "FREE",
        "billing_frequency": "MONTHLY"
      },
      "configuration_audit": {
        "created_at": "string",
        "created_by": "string",
        "updated_at": "string",
        "updated_by": "string"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `createConfiguration`

Create a new private app configuration. To make it public a verification process needs to be triggered

`POST /v1/app-configurations`

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createConfiguration \
  -d '{"name":"string","description":{"en":"string","de":"string"},"category":"string","logo_url_key":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot app createConfiguration
```

With JSONata filter:

```bash
epilot app createConfiguration --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string"
}
```

</details>

---

### `listPublicConfigurations`

List all publicly available app configurations that can be installed. This endpoint returns apps that have at least one 

`GET /v1/app-configurations/public`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `page` | query | number | No | Page number for pagination |
| `pageSize` | query | number | No | Number of items per page |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app listPublicConfigurations
```

With JSONata filter:

```bash
epilot app listPublicConfigurations --jsonata 'configurations'
```

<details>
<summary>Sample Response</summary>

```json
{
  "configurations": [
    {
      "app_id": "string",
      "name": "string",
      "author": {
        "name": "string",
        "company": "string",
        "email": "string"
      },
      "dev_mode": true,
      "versions": ["string"],
      "public_versions": ["string"],
      "support_email": "string",
      "latest_version": "string",
      "category": "string",
      "icon_url": "string",
      "documentation_url": "string",
      "description": {
        "en": "string",
        "de": "string"
      },
      "notifications": {
        "email": "developer@example.com",
        "events": ["app.installed"]
      },
      "owner_org_id": "string",
      "internal": false,
      "pricing": {
        "pricing_type": "FREE",
        "billing_frequency": "MONTHLY"
      },
      "configuration_audit": {
        "created_at": "string",
        "created_by": "string",
        "updated_at": "string",
        "updated_by": "string"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getPublicConfiguration`

Retrieve the public configuration of an app to install in your tenant

`GET /v1/app-configurations/public/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration to install |
| `version` | query | string | No | Version of the app configuration to retrieve |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getPublicConfiguration \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app getPublicConfiguration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app getPublicConfiguration -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "support_email": "string",
  "owner_org_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "is_beta": true,
  "deprecated_at": "string",
  "version": "string",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "latest_version": "string",
  "public": true,
  "versions": [
    {
      "app_id": "string",
      "owner_org_id": "string",
      "components": [],
      "visibility": "private",
      "public": false,
      "pending": false,
      "version": "string",
      "is_beta": true,
      "deprecated_at": "string",
      "changelog": "string",
      "review_status": "approved",
      "role": {},
      "blueprint_ref": {},
      "version_audit": {}
    }
  ]
}
```

</details>

---

### `getConfiguration`

Retrieve a specific app configuration

`GET /v1/app-configurations/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | query | string | No | Version of the app configuration to retrieve |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getConfiguration \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app getConfiguration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app getConfiguration -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "versions": ["string"],
  "public_versions": ["string"],
  "support_email": "string",
  "latest_version": "string",
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "notifications": {
    "email": "developer@example.com",
    "events": ["app.installed"]
  },
  "owner_org_id": "string",
  "internal": false,
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "configuration_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "visibility": "private",
  "public": false,
  "pending": false,
  "version": "string",
  "is_beta": true,
  "deprecated_at": "string",
  "changelog": "string",
  "review_status": "approved",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "version_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string",
    "versioned_at": "string",
    "versioned_by": "string"
  }
}
```

</details>

---

### `patchMetadata`

Patch non-versioned configuration metadata of a given app configuration.

`PATCH /v1/app-configurations/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app patchMetadata \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot app patchMetadata \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "category": "string",
  "documentation_url": "string",
  "notifications": {
    "email": "developer@example.com",
    "events": ["app.installed"]
  },
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "logo_url_key": "string",
  "support_email": "string",
  "dev_mode": true
}'
```

Using positional args for path parameters:

```bash
epilot app patchMetadata 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app patchMetadata -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app patchMetadata -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `deleteConfiguration`

Delete an app configuration and all its versions and components.

`DELETE /v1/app-configurations/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app deleteConfiguration \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app deleteConfiguration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app deleteConfiguration -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `queryEvents`

Query analytics events for a specific app with flexible filtering

`POST /v1/app-configurations/{appId}/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app queryEvents \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot app queryEvents \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "time_range": {
    "start": "1970-01-01T00:00:00.000Z",
    "end": "1970-01-01T00:00:00.000Z",
    "preset": "1h"
  },
  "filters": {
    "source": ["CUSTOM_JOURNEY_BLOCK"],
    "component_id": ["string"],
    "event_type": ["ERROR"],
    "correlation_id": "string"
  },
  "aggregation": {
    "group_by": ["source"],
    "metrics": ["count"]
  },
  "pagination": {
    "page": 1,
    "page_size": 100
  },
  "sort": {
    "field": "timestamp",
    "order": "desc"
  }
}'
```

Using positional args for path parameters:

```bash
epilot app queryEvents 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app queryEvents -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app queryEvents -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "query": {
    "time_range": {
      "start": "1970-01-01T00:00:00.000Z",
      "end": "1970-01-01T00:00:00.000Z",
      "preset": "1h"
    },
    "filters": {
      "source": ["CUSTOM_JOURNEY_BLOCK"],
      "component_id": ["string"],
      "event_type": ["ERROR"],
      "correlation_id": "string"
    },
    "aggregation": {
      "group_by": ["source"],
      "metrics": ["count"]
    },
    "pagination": {
      "page": 1,
      "page_size": 100
    },
    "sort": {
      "field": "timestamp",
      "order": "desc"
    }
  },
  "results": {
    "type": "raw",
    "events": [
      {
        "app_id": "string",
        "version": "string",
        "event_id": "string",
        "component_id": "string",
        "timestamp": "string",
        "correlation_id": "string",
        "event_type": "ERROR",
        "source": "CUSTOM_JOURNEY_BLOCK",
        "actor": {
          "org_id": "string",
          "user_id": "string",
          "type": "user"
        },
        "details": {}
      }
    ]
  },
  "pagination": {
    "page": 0,
    "page_size": 0,
    "total_items": 0,
    "has_next": true
  }
}
```

</details>

---

### `createBundleUploadUrl`

Generate a presigned URL for uploading app bundle to /<app-id>/bundle.js path

`POST /v1/app-configurations/{appId}/bundle`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createBundleUploadUrl \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"version":"string","component_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot app createBundleUploadUrl 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app createBundleUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app createBundleUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'component_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "component_id": "string",
  "component_url": "string",
  "upload_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createZipUploadUrl`

Generate a presigned URL to upload a zip file with artifacts that will be unpacked in a new directory under the /<app-id

`POST /v1/app-configurations/{appId}/zip`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createZipUploadUrl \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"version":"1.0.0","component_id":"string","filename":"dist.zip"}'
```

Using positional args for path parameters:

```bash
epilot app createZipUploadUrl 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app createZipUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app createZipUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'component_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "component_id": "string",
  "upload_url": "string",
  "artifact_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createLogoUploadUrl`

Generate a presigned URL for uploading app logo to /<app-id>/logo.png path

`POST /v1/app-configurations/{appId}/logo`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createLogoUploadUrl \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"filename":"company-logo.png","mime_type":"image/png"}'
```

Using positional args for path parameters:

```bash
epilot app createLogoUploadUrl 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app createLogoUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app createLogoUploadUrl -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'upload_url'
```

<details>
<summary>Sample Response</summary>

```json
{
  "upload_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteLogo`

Delete the app logo from /<app-id>/logo.png path

`DELETE /v1/app-configurations/{appId}/logo`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app deleteLogo \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app deleteLogo 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app deleteLogo -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listVersions`

Retrieve a list of versions for an app configuration

`GET /v1/app-configurations/{appId}/versions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `page` | query | number | No | Page number for pagination |
| `pageSize` | query | number | No | Number of items per page |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app listVersions \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app listVersions 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app listVersions -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'versions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "versions": [
    {
      "app_id": "string",
      "owner_org_id": "string",
      "components": [
        {
          "component_type": "CUSTOM_JOURNEY_BLOCK",
          "configuration": {
            "override_dev_mode": {
              "override_url": "http://localhost:3000"
            },
            "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
            "component_tag": "string",
            "component_args": [
              {
                "type": "text"
              }
            ],
            "component_size": 0,
            "component_mapping": {}
          }
        }
      ],
      "visibility": "private",
      "public": false,
      "pending": false,
      "version": "string",
      "is_beta": true,
      "deprecated_at": "string",
      "changelog": "string",
      "review_status": "approved",
      "role": {
        "id": "string",
        "grants": [
          {
            "action": "string",
            "resource": "string"
          }
        ]
      },
      "blueprint_ref": {
        "manifest_id": "string",
        "job_id": "string"
      },
      "version_audit": {
        "created_at": "string",
        "created_by": "string",
        "updated_at": "string",
        "updated_by": "string",
        "versioned_at": "string",
        "versioned_by": "string"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getVersion`

Retrieve a specific version of an app configuration

`GET /v1/app-configurations/{appId}/versions/{version}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version of the app configuration to retrieve |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getVersion \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example
```

Using positional args for path parameters:

```bash
epilot app getVersion 123e4567-e89b-12d3-a456-426614174000 example
```

With JSONata filter:

```bash
epilot app getVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "versions": ["string"],
  "public_versions": ["string"],
  "support_email": "string",
  "latest_version": "string",
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "notifications": {
    "email": "developer@example.com",
    "events": ["app.installed"]
  },
  "owner_org_id": "string",
  "internal": false,
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "configuration_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "visibility": "private",
  "public": false,
  "pending": false,
  "version": "string",
  "is_beta": true,
  "deprecated_at": "string",
  "changelog": "string",
  "review_status": "approved",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "version_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string",
    "versioned_at": "string",
    "versioned_by": "string"
  }
}
```

</details>

---

### `patchVersion`

Patch an existing app version

`PATCH /v1/app-configurations/{appId}/versions/{version}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to update |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app patchVersion \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -d '{"manifest_id":"string","role_id":"string","grants":[{"action":"string","resource":"string"}]}'
```

Using positional args for path parameters:

```bash
epilot app patchVersion 123e4567-e89b-12d3-a456-426614174000 example
```

Using stdin pipe:

```bash
cat body.json | epilot app patchVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example
```

With JSONata filter:

```bash
epilot app patchVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata '$'
```

---

### `deleteVersion`

Delete a specific version of an app configuration

`DELETE /v1/app-configurations/{appId}/versions/{version}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to delete |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app deleteVersion \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example
```

Using positional args for path parameters:

```bash
epilot app deleteVersion 123e4567-e89b-12d3-a456-426614174000 example
```

With JSONata filter:

```bash
epilot app deleteVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata '$'
```

---

### `getReview`

Retrieve the review status of a specific app version

`GET /v1/app-configurations/{appId}/versions/{version}/review`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to retrieve the review status for |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getReview \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example
```

Using positional args for path parameters:

```bash
epilot app getReview 123e4567-e89b-12d3-a456-426614174000 example
```

With JSONata filter:

```bash
epilot app getReview -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata 'review'
```

<details>
<summary>Sample Response</summary>

```json
{
  "review": {
    "version": "string",
    "review_status": "approved",
    "requested_at": "string",
    "requested_by": "string",
    "technical_contact": "string",
    "marketing_contact": "string",
    "demo_url": "string"
  }
}
```

</details>

---

### `createReview`

Submit an app version for review to make it public

`POST /v1/app-configurations/{appId}/versions/{version}/review`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to submit for review |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createReview \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -d '{"technical_contact":"string","marketing_contact":"string","demo_url":"string"}'
```

Using positional args for path parameters:

```bash
epilot app createReview 123e4567-e89b-12d3-a456-426614174000 example
```

Using stdin pipe:

```bash
cat body.json | epilot app createReview -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example
```

With JSONata filter:

```bash
epilot app createReview -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata 'review'
```

<details>
<summary>Sample Response</summary>

```json
{
  "review": {
    "version": "string",
    "review_status": "approved",
    "requested_at": "string",
    "requested_by": "string",
    "technical_contact": "string",
    "marketing_contact": "string",
    "demo_url": "string"
  }
}
```

</details>

---

### `createComponent`

Patch an existing app version to create/add a component

`POST /v1/app-configurations/{appId}/versions/{version}/components`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to update |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app createComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example
```

With request body:

```bash
epilot app createComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -d '{
  "component_type": "CUSTOM_JOURNEY_BLOCK",
  "configuration": {
    "override_dev_mode": {
      "override_url": "http://localhost:3000"
    },
    "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
    "component_tag": "string",
    "component_args": [
      {
        "type": "text"
      }
    ],
    "component_size": 0,
    "component_mapping": {}
  }
}'
```

Using positional args for path parameters:

```bash
epilot app createComponent 123e4567-e89b-12d3-a456-426614174000 example
```

Using stdin pipe:

```bash
cat body.json | epilot app createComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example
```

With JSONata filter:

```bash
epilot app createComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata 'component'
```

<details>
<summary>Sample Response</summary>

```json
{
  "component": {
    "component_type": "CUSTOM_JOURNEY_BLOCK",
    "configuration": {
      "override_dev_mode": {
        "override_url": "http://localhost:3000"
      },
      "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
      "component_tag": "string",
      "component_args": [
        {
          "type": "text"
        }
      ],
      "component_size": 0,
      "component_mapping": {}
    }
  }
}
```

</details>

---

### `patchComponent`

Patch an existing app version to update its components

`PATCH /v1/app-configurations/{appId}/versions/{version}/components/{componentId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to update |
| `componentId` | path | string | Yes | ID of the component to update |

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app patchComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -p componentId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot app patchComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -p componentId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "component_type": "CUSTOM_JOURNEY_BLOCK",
  "configuration": {
    "override_dev_mode": {
      "override_url": "http://localhost:3000"
    },
    "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
    "component_tag": "string",
    "component_args": [
      {
        "type": "text"
      }
    ],
    "component_size": 0,
    "component_mapping": {}
  }
}'
```

Using positional args for path parameters:

```bash
epilot app patchComponent 123e4567-e89b-12d3-a456-426614174000 example 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app patchComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example -p componentId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app patchComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example -p componentId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `deleteComponent`

Delete a specific component from an app version

`DELETE /v1/app-configurations/{appId}/versions/{version}/components/{componentId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `version` | path | string | Yes | Version to update |
| `componentId` | path | string | Yes | ID of the component to delete |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app deleteComponent \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example \
  -p componentId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app deleteComponent 123e4567-e89b-12d3-a456-426614174000 example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app deleteComponent -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example -p componentId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `cloneVersion`

Clone an existing app version to create a new version

`POST /v1/app-configurations/{appId}/versions/{sourceVersion}/clone-to/{targetVersion}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes | ID of the app configuration |
| `sourceVersion` | path | string | Yes | Source version to clone from |
| `targetVersion` | path | string | Yes | Target version to create |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app cloneVersion \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p sourceVersion=example \
  -p targetVersion=example
```

Using positional args for path parameters:

```bash
epilot app cloneVersion 123e4567-e89b-12d3-a456-426614174000 example example
```

With JSONata filter:

```bash
epilot app cloneVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p sourceVersion=example -p targetVersion=example --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "version": "string",
  "status": "pending"
}
```

</details>

---

### `listInstallations`

Retrieve a list of installed apps for the organization.

`GET /v1/app`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `componentType` | query | "CUSTOM_JOURNEY_BLOCK" \| "CUSTOM_PORTAL_BLOCK" \| "PORTAL_EXTENSION" \| "CUSTOM_FLOW_ACTION" \| "ERP_INFORM_TOOLKIT" \| "CUSTOM_CAPABILITY" \| "EXTERNAL_PRODUCT_CATALOG" \| "CUSTOM_PAGE" | No | Filter apps by specific component type |
| `enabled` | query | boolean | No | Filter apps by enabled status |
| `page` | query | number | No | Page number for pagination |
| `pageSize` | query | number | No | Number of items per page |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app listInstallations
```

With JSONata filter:

```bash
epilot app listInstallations --jsonata 'apps'
```

<details>
<summary>Sample Response</summary>

```json
{
  "apps": [
    {
      "app_id": "string",
      "installer_org_id": "string",
      "owner_org_id": "string",
      "enabled": true,
      "name": "string",
      "option_values": [
        {
          "component_id": "string",
          "options": [
            {
              "key": "string",
              "value": {}
            }
          ]
        }
      ],
      "components": [
        {
          "component_type": "CUSTOM_JOURNEY_BLOCK",
          "configuration": {
            "override_dev_mode": {
              "override_url": "http://localhost:3000"
            },
            "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
            "component_tag": "string",
            "component_args": [
              {
                "type": "text"
              }
            ],
            "component_size": 0,
            "component_mapping": {}
          }
        }
      ],
      "installed_version": "string",
      "role": "string",
      "blueprint_ref": {
        "manifest_id": "string",
        "job_id": "string"
      },
      "installation_audit": {
        "created_at": "string",
        "created_by": "string",
        "updated_at": "string",
        "updated_by": "string"
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getInstallation`

Retrieve details of an installed app by its ID.

`GET /v1/app/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes |  |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app getInstallation \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app getInstallation 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app getInstallation -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": [
        {
          "key": "string",
          "value": {}
        }
      ]
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {
        "override_dev_mode": {
          "override_url": "http://localhost:3000"
        },
        "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
        "component_tag": "string",
        "component_args": [
          {
            "type": "text"
          }
        ],
        "component_size": 0,
        "component_mapping": {}
      }
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `install`

Upsert app installation by its ID.

`POST /v1/app/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes |  |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app install \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot app install \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "version": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": [
        {
          "key": "string",
          "value": {}
        }
      ]
    }
  ],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot app install 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app install -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app install -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": [
        {
          "key": "string",
          "value": {}
        }
      ]
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {
        "override_dev_mode": {
          "override_url": "http://localhost:3000"
        },
        "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
        "component_tag": "string",
        "component_args": [
          {
            "type": "text"
          }
        ],
        "component_size": 0,
        "component_mapping": {}
      }
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `patchInstallation`

Patch an installed app by its ID.

`PATCH /v1/app/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes |  |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app patchInstallation \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot app patchInstallation \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "version": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": [
        {
          "key": "string",
          "value": {}
        }
      ]
    }
  ],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot app patchInstallation 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot app patchInstallation -p appId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app patchInstallation -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `uninstall`

Uninstall an app by its ID.

`DELETE /v1/app/{appId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes |  |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app uninstall \
  -p appId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot app uninstall 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot app uninstall -p appId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `promoteVersion`

Update an installed app to a new version

`POST /v1/app/{appId}/promote-to/{version}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `appId` | path | string | Yes |  |
| `version` | path | string | Yes |  |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app promoteVersion \
  -p appId=123e4567-e89b-12d3-a456-426614174000 \
  -p version=example
```

Using positional args for path parameters:

```bash
epilot app promoteVersion 123e4567-e89b-12d3-a456-426614174000 example
```

With JSONata filter:

```bash
epilot app promoteVersion -p appId=123e4567-e89b-12d3-a456-426614174000 -p version=example --jsonata 'app_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": [
        {
          "key": "string",
          "value": {}
        }
      ]
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {
        "override_dev_mode": {
          "override_url": "http://localhost:3000"
        },
        "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
        "component_tag": "string",
        "component_args": [
          {
            "type": "text"
          }
        ],
        "component_size": 0,
        "component_mapping": {}
      }
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `ingestEvent`

Internal endpoint for services to submit app events for analytic purposes

`POST /v1/app-events`

**Request Body** (required)

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot app ingestEvent
```

With request body:

```bash
epilot app ingestEvent \
  -d '{
  "app_id": "string",
  "version": "string",
  "event_id": "string",
  "component_id": "string",
  "timestamp": "string",
  "correlation_id": "string",
  "event_type": "ERROR",
  "source": "CUSTOM_JOURNEY_BLOCK",
  "actor": {
    "org_id": "string",
    "user_id": "string",
    "type": "user"
  },
  "details": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot app ingestEvent
```

With JSONata filter:

```bash
epilot app ingestEvent --jsonata '$'
```

---
