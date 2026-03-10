# Blueprint Manifest API

- **Base URL:** `https://blueprint-manifest.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/blueprint-manifest](https://docs.epilot.io/api/blueprint-manifest)

Service to create and install Blueprint Manifest files

## Quick Start

```bash
# List available operations
epilot blueprint-manifest

# Call an operation
epilot blueprint-manifest getJob -p job_id=4854bb2a-94f9-424d-a968-3fb17fb0bf89
```

## Operations

**Import**
- [`uploadManifest`](#uploadmanifest) — Create pre-signed S3 URL to upload a manifest file.

**Blueprints**
- [`listBlueprints`](#listblueprints) — List Custom and Installed Blueprints
- [`createBlueprint`](#createblueprint) — Create a Blueprint
- [`listInstalledMarketplaceBlueprints`](#listinstalledmarketplaceblueprints) — List installed Marketplace Blueprints for the organization.
- [`preInstallBlueprint`](#preinstallblueprint) — Pre-install a Blueprint based on a blueprint file
- [`getBlueprintPreview`](#getblueprintpreview) — Get Blueprint Preview by ID
- [`installBlueprint`](#installblueprint) — Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource
- [`getBlueprint`](#getblueprint) — Get Blueprint by ID
- [`updateBlueprint`](#updateblueprint) — Update a Blueprint
- [`deleteBlueprint`](#deleteblueprint) — Delete a Blueprint
- [`validateBlueprint`](#validateblueprint) — Start a blueprint validation job. Validates Terraform for the blueprint (all types).
- [`exportBlueprint`](#exportblueprint) — Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.
- [`formatBlueprintDescription`](#formatblueprintdescription) — Format a blueprint description as markdown using AI.
- [`addBlueprintResource`](#addblueprintresource) — Add a resource to a Blueprint
- [`syncDependencies`](#syncdependencies) — Sync dependencies of all root resources in a Blueprint
- [`bulkAddBlueprintResources`](#bulkaddblueprintresources) — Bulk Add resources in a Blueprint
- [`bulkUpdateBlueprintResources`](#bulkupdateblueprintresources) — Bulk update resources in a Blueprint
- [`bulkDeleteBlueprintResources`](#bulkdeleteblueprintresources) — Bulk delete resources in a Blueprint
- [`updateBlueprintResource`](#updateblueprintresource) — Update a resource in a Blueprint
- [`deleteBlueprintResource`](#deleteblueprintresource) — Delete a resource from a Blueprint

**Jobs**
- [`listBlueprintJobs`](#listblueprintjobs) — List all blueprint jobs
- [`getBlueprintJob`](#getblueprintjob) — Poll current state of a job.
- [`continueInstallationJob`](#continueinstallationjob) — Continue an installation job if it is waiting for user action.
- [`cancelBlueprintJob`](#cancelblueprintjob) — Cancel a blueprint job if it is still running.

### `uploadManifest`

Create pre-signed S3 URL to upload a manifest file.

`POST /v1/blueprint-manifest:uploadManifest`

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
epilot blueprint-manifest uploadManifest \
  -d '{"filename":"example.manifest.zip"}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest uploadManifest
```

With JSONata filter:

```bash
epilot blueprint-manifest uploadManifest --jsonata 's3ref'
```

<details>
<summary>Sample Response</summary>

```json
{
  "s3ref": {
    "bucket": "blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw",
    "key": "templates/main.tf"
  },
  "upload_url": "https://epilot-dev-blueprints.s3.eu-central-1.amazonaws.com/templates/document.pdf"
}
```

</details>

---

### `listBlueprints`

List Custom and Installed Blueprints

`GET /v2/blueprint-manifest/blueprints`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `archived` | query | boolean | No | Filter blueprints by archived status. If true, returns only archived blueprints. If false or not provided, returns only non-archived blueprints. |

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
epilot blueprint-manifest listBlueprints
```

With JSONata filter:

```bash
epilot blueprint-manifest listBlueprints --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 1,
  "results": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "title": "string",
      "slug": "string",
      "description": {
        "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
        "postinstall": "This is the content of the postinstall.md file\n"
      },
      "version": "string",
      "deployments": [
        {
          "source_org_id": "string",
          "source_blueprint_id": "string",
          "destination_org_id": "string",
          "destination_blueprint_id": "string",
          "triggered_at": "1970-01-01T00:00:00.000Z"
        }
      ],
      "is_verified": true,
      "installation_status": "IN_PROGRESS",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "updated_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "archived": false,
      "docs_url": "string",
      "recommended_apps": ["string"],
      "required_features": {
        "enabled": ["string"],
        "disabled": ["string"]
      },
      "zip_file_name": "string",
      "resources": [
        {
          "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
          "name": "string",
          "type": "designbuilder",
          "address": "string",
          "is_root": true,
          "is_ready": true,
          "is_hidden": true,
          "is_disabled": false,
          "hard_dependencies": ["designbuilder"],
          "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
          "depends_on_addresses": ["string"],
          "impact_on_install": ["create"],
          "impact_on_install_reason": ["string"]
        }
      ],
      "source_type": "string"
    }
  ]
}
```

</details>

---

### `createBlueprint`

Create a Blueprint

`POST /v2/blueprint-manifest/blueprints`

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
epilot blueprint-manifest createBlueprint
```

With request body:

```bash
epilot blueprint-manifest createBlueprint \
  -d '{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest createBlueprint
```

With JSONata filter:

```bash
epilot blueprint-manifest createBlueprint --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}
```

</details>

---

### `listInstalledMarketplaceBlueprints`

List installed Marketplace Blueprints for the organization.

`GET /v2/blueprint-manifest/blueprints:marketplace`

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
epilot blueprint-manifest listInstalledMarketplaceBlueprints
```

With JSONata filter:

```bash
epilot blueprint-manifest listInstalledMarketplaceBlueprints --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 1,
  "results": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "slug": "solar-b2b",
      "version": "v1.0.0",
      "created_at": "1970-01-01T00:00:00.000Z",
      "created_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "has_update_available": true,
      "latest_marketplace_version": "v2.0.0",
      "installation_link": "string"
    }
  ]
}
```

</details>

---

### `preInstallBlueprint`

Pre-install a Blueprint based on a blueprint file

`POST /v2/blueprint-manifest/blueprints:pre-install`

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
epilot blueprint-manifest preInstallBlueprint \
  -d '{"blueprint_file":"string","source_blueprint_type":"marketplace","slug":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest preInstallBlueprint
```

With JSONata filter:

```bash
epilot blueprint-manifest preInstallBlueprint --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "title": "string",
  "description": {
    "preinstall": "string"
  },
  "version": "string",
  "slug": "string",
  "source_type": "marketplace",
  "blueprint_file_s3_key": "string",
  "is_verified": true,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "is_updating": true,
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `getBlueprintPreview`

Get Blueprint Preview by ID

`GET /v2/blueprint-manifest/blueprints:preview/{preview_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `preview_id` | path | string | Yes |  |

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
epilot blueprint-manifest getBlueprintPreview \
  -p preview_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getBlueprintPreview 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest getBlueprintPreview -p preview_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "title": "string",
  "description": {
    "preinstall": "string"
  },
  "version": "string",
  "slug": "string",
  "source_type": "marketplace",
  "blueprint_file_s3_key": "string",
  "is_verified": true,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "is_updating": true,
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `installBlueprint`

Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource

`POST /v2/blueprint-manifest/blueprint:install`

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot blueprint-manifest installBlueprint
```

With request body:

```bash
epilot blueprint-manifest installBlueprint \
  -d '{
  "source_org_id": "string",
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "source_blueprint_file": "string",
  "destination_org_id": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "options": {
    "resources_to_ignore": ["string"]
  },
  "mode": "simple",
  "source_blueprint_type": "marketplace",
  "slug": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest installBlueprint
```

With JSONata filter:

```bash
epilot blueprint-manifest installBlueprint --jsonata '$'
```

---

### `getBlueprint`

Get Blueprint by ID

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest getBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest getBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}
```

</details>

---

### `updateBlueprint`

Update a Blueprint

`PUT /v2/blueprint-manifest/blueprints/{blueprint_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest updateBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest updateBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest updateBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest updateBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest updateBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}
```

</details>

---

### `deleteBlueprint`

Delete a Blueprint

`DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest deleteBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest deleteBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest deleteBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "title": "string",
  "slug": "string",
  "description": {
    "preinstall": "This is the content of the preinstall.md file which contains the blueprint description.\n",
    "postinstall": "This is the content of the postinstall.md file\n"
  },
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "is_verified": true,
  "installation_status": "IN_PROGRESS",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "updated_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "archived": false,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
  "zip_file_name": "string",
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ],
  "source_type": "string"
}
```

</details>

---

### `validateBlueprint`

Start a blueprint validation job. Validates Terraform for the blueprint (all types).

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest validateBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest validateBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest validateBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `exportBlueprint`

Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:export`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest exportBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"destination_org_id":"string","destination_blueprint_id":"string","validate":true}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest exportBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest exportBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest exportBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `formatBlueprintDescription`

Format a blueprint description as markdown using AI.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:format-description`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot blueprint-manifest formatBlueprintDescription \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"text":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest formatBlueprintDescription c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest formatBlueprintDescription -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest formatBlueprintDescription -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'markdown'
```

<details>
<summary>Sample Response</summary>

```json
{
  "markdown": "string"
}
```

</details>

---

### `addBlueprintResource`

Add a resource to a Blueprint

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `add_dependencies` | query | boolean | No |  |

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
epilot blueprint-manifest addBlueprintResource \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest addBlueprintResource \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "name": "string",
  "type": "designbuilder",
  "address": "string",
  "is_root": true,
  "is_ready": true,
  "is_hidden": true,
  "is_disabled": false,
  "hard_dependencies": ["designbuilder"],
  "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "depends_on_addresses": ["string"],
  "impact_on_install": ["create"],
  "impact_on_install_reason": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest addBlueprintResource c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest addBlueprintResource -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest addBlueprintResource -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `syncDependencies`

Sync dependencies of all root resources in a Blueprint

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources:syncDependencies`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest syncDependencies \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest syncDependencies c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest syncDependencies -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `bulkAddBlueprintResources`

Bulk Add resources in a Blueprint

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `add_dependencies` | query | boolean | No |  |

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
epilot blueprint-manifest bulkAddBlueprintResources \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest bulkAddBlueprintResources \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '[
  {
    "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "name": "string",
    "type": "designbuilder",
    "address": "string",
    "is_root": true,
    "is_ready": true,
    "is_hidden": true,
    "is_disabled": false,
    "hard_dependencies": ["designbuilder"],
    "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
    "depends_on_addresses": ["string"],
    "impact_on_install": ["create"],
    "impact_on_install_reason": ["string"]
  }
]'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest bulkAddBlueprintResources c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest bulkAddBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest bulkAddBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `bulkUpdateBlueprintResources`

Bulk update resources in a Blueprint

`PUT /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest bulkUpdateBlueprintResources \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest bulkUpdateBlueprintResources \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '[
  {
    "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "name": "string",
    "type": "designbuilder",
    "address": "string",
    "is_root": true,
    "is_ready": true,
    "is_hidden": true,
    "is_disabled": false,
    "hard_dependencies": ["designbuilder"],
    "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
    "depends_on_addresses": ["string"],
    "impact_on_install": ["create"],
    "impact_on_install_reason": ["string"]
  }
]'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest bulkUpdateBlueprintResources c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest bulkUpdateBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest bulkUpdateBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `bulkDeleteBlueprintResources`

Bulk delete resources in a Blueprint

`DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
epilot blueprint-manifest bulkDeleteBlueprintResources \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"]'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest bulkDeleteBlueprintResources c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest bulkDeleteBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest bulkDeleteBlueprintResources -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `updateBlueprintResource`

Update a resource in a Blueprint

`PUT /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `resource_id` | path | string | Yes |  |

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
epilot blueprint-manifest updateBlueprintResource \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest updateBlueprintResource \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "name": "string",
  "type": "designbuilder",
  "address": "string",
  "is_root": true,
  "is_ready": true,
  "is_hidden": true,
  "is_disabled": false,
  "hard_dependencies": ["designbuilder"],
  "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "depends_on_addresses": ["string"],
  "impact_on_install": ["create"],
  "impact_on_install_reason": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest updateBlueprintResource c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest updateBlueprintResource -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest updateBlueprintResource -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `deleteBlueprintResource`

Delete a resource from a Blueprint

`DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `resource_id` | path | string | Yes |  |

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
epilot blueprint-manifest deleteBlueprintResource \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest deleteBlueprintResource c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest deleteBlueprintResource -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p resource_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'resources'
```

<details>
<summary>Sample Response</summary>

```json
{
  "resources": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "name": "string",
      "type": "designbuilder",
      "address": "string",
      "is_root": true,
      "is_ready": true,
      "is_hidden": true,
      "is_disabled": false,
      "hard_dependencies": ["designbuilder"],
      "parent_resource_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "depends_on_addresses": ["string"],
      "impact_on_install": ["create"],
      "impact_on_install_reason": ["string"]
    }
  ]
}
```

</details>

---

### `listBlueprintJobs`

List all blueprint jobs

`GET /v2/blueprint-manifest/jobs`

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
epilot blueprint-manifest listBlueprintJobs
```

With JSONata filter:

```bash
epilot blueprint-manifest listBlueprintJobs --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 1,
  "results": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "events": [
        {
          "timestamp": "1970-01-01T00:00:00.000Z",
          "message": "string",
          "errors": [
            {
              "error": "string",
              "code": "dependency_extraction",
              "data": {
                "formattedResource": {
                  "id": "string",
                  "name": "string",
                  "type": "string"
                },
                "resource": "string",
                "resourceDependency": "string",
                "resources": ["string"],
                "addresses": ["string"],
                "originalError": "string"
              }
            }
          ],
          "level": "info",
          "data": {
            "installed_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
            "export_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
            "resources": 0
          }
        }
      ],
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "created_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "status": "IN_PROGRESS",
      "download_file": {
        "bucket": "blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw",
        "key": "templates/main.tf"
      }
    }
  ]
}
```

</details>

---

### `getBlueprintJob`

Poll current state of a job.

`GET /v2/blueprint-manifest/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

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
epilot blueprint-manifest getBlueprintJob \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getBlueprintJob c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest getBlueprintJob -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "events": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "message": "string",
      "errors": [
        {
          "error": "string",
          "code": "dependency_extraction",
          "data": {
            "formattedResource": {
              "id": "string",
              "name": "string",
              "type": "string"
            },
            "resource": "string",
            "resourceDependency": "string",
            "resources": ["string"],
            "addresses": ["string"],
            "originalError": "string"
          }
        }
      ],
      "level": "info",
      "data": {
        "installed_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "export_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "resources": 0
      }
    }
  ],
  "triggered_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "status": "IN_PROGRESS",
  "download_file": {
    "bucket": "blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw",
    "key": "templates/main.tf"
  }
}
```

</details>

---

### `continueInstallationJob`

Continue an installation job if it is waiting for user action.

`POST /v2/blueprint-manifest/jobs/{job_id}:continue`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

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
epilot blueprint-manifest continueInstallationJob \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"resources_to_ignore":["string"]}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest continueInstallationJob c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest continueInstallationJob -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest continueInstallationJob -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "events": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "message": "string",
      "errors": [
        {
          "error": "string",
          "code": "dependency_extraction",
          "data": {
            "formattedResource": {
              "id": "string",
              "name": "string",
              "type": "string"
            },
            "resource": "string",
            "resourceDependency": "string",
            "resources": ["string"],
            "addresses": ["string"],
            "originalError": "string"
          }
        }
      ],
      "level": "info",
      "data": {
        "installed_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "export_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "resources": 0
      }
    }
  ],
  "triggered_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "source_blueprint_type": "custom",
  "source_org_id": "string",
  "source_blueprint_file": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "destination_org_id": "string",
  "slug": "string",
  "status": "IN_PROGRESS"
}
```

</details>

---

### `cancelBlueprintJob`

Cancel a blueprint job if it is still running.

`POST /v2/blueprint-manifest/jobs/{job_id}:cancel`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

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
epilot blueprint-manifest cancelBlueprintJob \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest cancelBlueprintJob c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest cancelBlueprintJob -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "events": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "message": "string",
      "errors": [
        {
          "error": "string",
          "code": "dependency_extraction",
          "data": {
            "formattedResource": {
              "id": "string",
              "name": "string",
              "type": "string"
            },
            "resource": "string",
            "resourceDependency": "string",
            "resources": ["string"],
            "addresses": ["string"],
            "originalError": "string"
          }
        }
      ],
      "level": "info",
      "data": {
        "installed_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "export_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
        "resources": 0
      }
    }
  ],
  "triggered_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "status": "IN_PROGRESS",
  "download_file": {
    "bucket": "blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw",
    "key": "templates/main.tf"
  }
}
```

</details>

---

## Deprecated Operations

- ~~`getJob`~~ GET `/v1/blueprint-manifest/jobs/{job_id}`
- ~~`createExport`~~ POST `/v1/blueprint-manifest/jobs:createExport`
- ~~`exportManifest`~~ POST `/v1/blueprint-manifest/jobs/{job_id}:exportManifest`
- ~~`createPlan`~~ POST `/v1/blueprint-manifest/jobs:createPlan`
- ~~`applyPlan`~~ POST `/v1/blueprint-manifest/jobs/{job_id}:applyPlan`
- ~~`listInstalledManifests`~~ GET `/v1/blueprint-manifest/manifests`
- ~~`getManifest`~~ GET `/v1/blueprint-manifest/manifests/{manifest_id}`
- ~~`updateManifest`~~ PUT `/v1/blueprint-manifest/manifests/{manifest_id}`
- ~~`deleteManifest`~~ DELETE `/v1/blueprint-manifest/manifests/{manifest_id}`
