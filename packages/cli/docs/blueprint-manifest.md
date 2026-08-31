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

**Import**
- [`uploadManifest`](#uploadmanifest) — Create pre-signed S3 URL to upload a manifest file.

**Blueprints**
- [`listBlueprints`](#listblueprints) — List Custom and Installed Blueprints
- [`createBlueprint`](#createblueprint) — Create a Blueprint
- [`listInstalledMarketplaceBlueprints`](#listinstalledmarketplaceblueprints) — List installed Marketplace Blueprints for the organization.
- [`preInstallBlueprint`](#preinstallblueprint) — Pre-install a Blueprint based on a blueprint file. Format-agnostic: the engine is detected from the uploaded archive, so
- [`getBlueprintPreview`](#getblueprintpreview) — Get Blueprint Preview by ID
- [`getBlueprint`](#getblueprint) — Get Blueprint by ID
- [`updateBlueprint`](#updateblueprint) — Update a Blueprint
- [`deleteBlueprint`](#deleteblueprint) — Delete a Blueprint
- [`addBlueprintNote`](#addblueprintnote) — Append an internal note to a blueprint. `id`, `created_at` and `created_by`
- [`updateBlueprintNote`](#updateblueprintnote) — Rewrite the text of an existing internal note. The note keeps its position in
- [`deleteBlueprintNote`](#deleteblueprintnote) — Remove a single internal note from a blueprint.
- [`verifyBlueprint`](#verifyblueprint) — Start a blueprint verification job. Compares resource configurations between a source org
- [`listMarketplaceSlugs`](#listmarketplaceslugs) — List all available marketplace blueprint slugs from Webflow CMS.
- [`publishBlueprint`](#publishblueprint) — Publish a blueprint to the marketplace. Exports the blueprint, uploads it to file-api with public access, and updates th
- [`formatBlueprintDescription`](#formatblueprintdescription) — Format a blueprint description as markdown using AI.
- [`suggestBlueprintResources`](#suggestblueprintresources) — Suggest resources to add to a blueprint based on a natural-language prompt.
- [`addBlueprintResource`](#addblueprintresource) — Add a resource to a Blueprint
- [`syncDependencies`](#syncdependencies) — Sync dependencies of all root resources in a Blueprint
- [`bulkAddBlueprintResources`](#bulkaddblueprintresources) — Bulk Add resources in a Blueprint
- [`bulkUpdateBlueprintResources`](#bulkupdateblueprintresources) — Bulk update resources in a Blueprint
- [`bulkDeleteBlueprintResources`](#bulkdeleteblueprintresources) — Bulk delete resources in a Blueprint
- [`updateBlueprintResource`](#updateblueprintresource) — Update a resource in a Blueprint
- [`deleteBlueprintResource`](#deleteblueprintresource) — Delete a resource from a Blueprint
- [`publishBlueprintV3`](#publishblueprintv3) — Starts an asynchronous V3 publication. The result is a signed, portable package; poll the existing blueprint job endpoin
- [`preInstallBlueprintV3`](#preinstallblueprintv3) — Validates a signed V3 package and returns the destination-specific resource plan used by the install UI.
- [`installBlueprintV3`](#installblueprintv3) — Install a blueprint into a single destination org using the V3 engine (direct API
- [`restoreBlueprintDeploymentV3`](#restoreblueprintdeploymentv3) — Roll a deployment back to its pre-install state. Two phases:
- [`getRestorePreview`](#getrestorepreview) — Computes what would happen if the user triggered a restore on this
- [`triggerDeploymentHealthCheckV3`](#triggerdeploymenthealthcheckv3) — Starts a read-only health scan of the resources this deployment's
- [`getDeploymentHealthReportV3`](#getdeploymenthealthreportv3) — Returns the most recent health report produced for this deployment
- [`getBlueprintLineageV3`](#getblueprintlineagev3) — Returns the lineage registry entries for a blueprint's resources in the current org.
- [`createBulkInstallV3`](#createbulkinstallv3) — Install one source blueprint into many destination organizations in a single
- [`getBulkInstallV3`](#getbulkinstallv3) — Returns the bulk install parent with aggregate status and counts. Scoped by the
- [`listBulkInstallTargetsV3`](#listbulkinstalltargetsv3) — Pages through the bulk install's target rows. Each row hydrates its latest child
- [`retryBulkInstallTargetV3`](#retrybulkinstalltargetv3) — Retries a single failed target. Allowed only for `FAILED` and `PARTIAL_SUCCESS`

**Jobs**
- [`listBlueprintJobs`](#listblueprintjobs) — List all blueprint jobs
- [`getBlueprintJob`](#getblueprintjob) — Poll the current state of a job. Serves both Terraform (v2) and V3-engine jobs —
- [`continueInstallationJob`](#continueinstallationjob) — Resume an installation job that is paused at `status: "WAITING_USER_ACTION"` after
- [`retryInstallationJob`](#retryinstallationjob) — Retry a finished V3 installation job whose status is `FAILED` or
- [`cancelBlueprintJob`](#cancelblueprintjob) — Cancel a blueprint job if it is still running.

**Marketplace Listings**
- [`getMarketplaceListing`](#getmarketplacelisting) — Get marketplace listing for a blueprint including all versions
- [`createMarketplaceListing`](#createmarketplacelisting) — Create a marketplace listing for a blueprint. Returns 409 if one already exists.
- [`listMarketplaceListings`](#listmarketplacelistings) — List all marketplace listings for the authenticated organization
- [`getMarketplaceListingById`](#getmarketplacelistingbyid) — Get marketplace listing by listing ID including all versions
- [`updateMarketplaceListing`](#updatemarketplacelisting) — Update listing-level fields
- [`deleteMarketplaceListing`](#deletemarketplacelisting) — Delete listing and all versions

**Marketplace Listing Versions**
- [`listMarketplaceListingVersions`](#listmarketplacelistingversions) — List all versions for a listing, newest first
- [`createMarketplaceListingVersion`](#createmarketplacelistingversion) — Create a draft version; auto-snapshots resources, requiredFeatures, recommendedApps from current blueprint
- [`updateMarketplaceListingVersion`](#updatemarketplacelistingversion) — Update updateNote, requiredFeatures, or recommendedApps on a draft version
- [`publishMarketplaceListingVersion`](#publishmarketplacelistingversion) — Publish a draft version; archives the previous live version

**Uniqueness Criteria**
- [`listUniquenessCriteria`](#listuniquenesscriteria) — List all custom uniqueness criteria configured for the caller's organization.
- [`getUniquenessCriteria`](#getuniquenesscriteria) — Get the configured uniqueness criteria for a specific resource type, if any.
- [`putUniquenessCriteria`](#putuniquenesscriteria) — Set or replace the uniqueness criteria for a resource type. The provided fields
- [`deleteUniquenessCriteria`](#deleteuniquenesscriteria) — Remove the custom criteria for a resource type, reverting to the default fields.

### `uploadManifest`

Create pre-signed S3 URL to upload a manifest file.

`POST /v1/blueprint-manifest:uploadManifest`

**Request Body**

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
      "description": {},
      "notes": [],
      "version": "string",
      "deployments": [],
      "is_verified": true,
      "latest_verification": {},
      "ignored_resource_addresses": ["string"],
      "installation_status": "IN_PROGRESS",
      "active_restore_job_id": "string",
      "active_restore_started_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {},
      "updated_by": {},
      "installation_job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "archived": false,
      "docs_url": "string",
      "recommended_apps": ["string"],
      "required_features": {},
      "zip_file_name": "string",
      "resources": [],
      "source_type": "custom"
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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
}
```

</details>

---

### `listInstalledMarketplaceBlueprints`

List installed Marketplace Blueprints for the organization.

`GET /v2/blueprint-manifest/blueprints:marketplace`

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

Pre-install a Blueprint based on a blueprint file. Format-agnostic: the engine is detected from the uploaded archive, so

`POST /v2/blueprint-manifest/blueprints:pre-install`

**Request Body**

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
  "sync_engine": "terraform",
  "blueprint_file_s3_key": "string",
  "is_verified": true,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
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
  "sync_engine": "terraform",
  "blueprint_file_s3_key": "string",
  "is_verified": true,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
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

### `getBlueprint`

Get Blueprint by ID

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
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
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {}
    }
  ],
  "version": "string",
  "deployments": [
    {
      "source_org_id": "string",
      "source_blueprint_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "string",
      "job_id": "string",
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "performed_by": {},
      "note": "string",
      "status": "IN_PROGRESS",
      "restore_details": {},
      "has_revertible_changes": true,
      "last_restore_job_id": "string",
      "restore_status": "available"
    }
  ],
  "is_verified": true,
  "latest_verification": {
    "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "status": "IN_PROGRESS",
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "source_org_id": "string",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "sync_engine": "terraform",
    "summary": {
      "total_resources": 0,
      "matched": 0,
      "mismatched": 0,
      "missing_in_destination": 0,
      "fetch_errors": 0
    }
  },
  "ignored_resource_addresses": ["string"],
  "installation_status": "IN_PROGRESS",
  "active_restore_job_id": "string",
  "active_restore_started_at": "1970-01-01T00:00:00.000Z",
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
  "source_type": "custom"
}
```

</details>

---

### `addBlueprintNote`

Append an internal note to a blueprint. `id`, `created_at` and `created_by`

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/notes`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest addBlueprintNote \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"text":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest addBlueprintNote c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest addBlueprintNote -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest addBlueprintNote -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
  "text": "Adjusted the meter-reading journey for the §14a rollout.",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  }
}
```

</details>

---

### `updateBlueprintNote`

Rewrite the text of an existing internal note. The note keeps its position in

`PATCH /v2/blueprint-manifest/blueprints/{blueprint_id}/notes/{note_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `note_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest updateBlueprintNote \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p note_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"text":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest updateBlueprintNote c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest updateBlueprintNote -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p note_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest updateBlueprintNote -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p note_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
  "text": "Adjusted the meter-reading journey for the §14a rollout.",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  }
}
```

</details>

---

### `deleteBlueprintNote`

Remove a single internal note from a blueprint.

`DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}/notes/{note_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `note_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest deleteBlueprintNote \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p note_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest deleteBlueprintNote c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest deleteBlueprintNote -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p note_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'notes'
```

<details>
<summary>Sample Response</summary>

```json
{
  "notes": [
    {
      "id": "3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40",
      "text": "Adjusted the meter-reading journey for the §14a rollout.",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      }
    }
  ]
}
```

</details>

---

### `verifyBlueprint`

Start a blueprint verification job. Compares resource configurations between a source org

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:verify`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest verifyBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With request body:

```bash
epilot blueprint-manifest verifyBlueprint \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{
  "source_org_id": "string",
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "destination_org_id": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "source_auth_token": "string",
  "destination_auth_token": "string",
  "installation_job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "sync_engine": "terraform"
}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest verifyBlueprint c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest verifyBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest verifyBlueprint -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `listMarketplaceSlugs`

List all available marketplace blueprint slugs from Webflow CMS.

`GET /v2/blueprint-manifest/marketplace/slugs`

**Sample Call**

```bash
epilot blueprint-manifest listMarketplaceSlugs
```

With JSONata filter:

```bash
epilot blueprint-manifest listMarketplaceSlugs --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "slug": "wallbox_b2c",
      "marketplace_slug": "wallbox-b2c",
      "version": "v1.0.0",
      "name": "Wallbox B2C",
      "installation_link": "https://portal.epilot.cloud/app/blueprints/install/marketplace/wallbox_b2c?s3Ref=https://example.com/blueprint.zip"
    }
  ]
}
```

</details>

---

### `publishBlueprint`

Publish a blueprint to the marketplace. Exports the blueprint, uploads it to file-api with public access, and updates th

`POST /v2/blueprint-manifest/blueprints:publish`

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest publishBlueprint \
  -d '{"blueprint_id":"c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341","slug":"string","version":"string","name":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest publishBlueprint
```

With JSONata filter:

```bash
epilot blueprint-manifest publishBlueprint --jsonata '$'
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

### `suggestBlueprintResources`

Suggest resources to add to a blueprint based on a natural-language prompt.

`POST /v2/blueprint-manifest/blueprints:suggest-resources`

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest suggestBlueprintResources \
  -d '{"prompt":"everything for the hausanschluss use case","blueprint_id":"c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest suggestBlueprintResources
```

With JSONata filter:

```bash
epilot blueprint-manifest suggestBlueprintResources --jsonata 'resources'
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
  ],
  "suggested_blueprint_name": "Hausanschluss",
  "explanation": "string",
  "add_dependencies_recommended": true
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
  ],
  "skipped": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "type": "designbuilder",
      "reason": "not_found"
    }
  ],
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
  "total_errors": 0,
  "errors_truncated": true
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
| `trigger` | query | "manual" \| "pre_sync" \| "post_revert" | No | What initiated the sync. Automated triggers (`pre_sync`,
`post_revert`) are side effects of an operation the activity
feed already shows on its own row, so they are excluded from
the audit log — same  |

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
  ],
  "skipped": [
    {
      "id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "type": "designbuilder",
      "reason": "not_found"
    }
  ],
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
  "total_errors": 0,
  "errors_truncated": true
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
      "job_type": "export",
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

Poll the current state of a job. Serves both Terraform (v2) and V3-engine jobs —

`GET /v2/blueprint-manifest/jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

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
  "job_type": "export",
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

Resume an installation job that is paused at `status: "WAITING_USER_ACTION"` after

`POST /v2/blueprint-manifest/jobs/{job_id}:continue`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot blueprint-manifest continueInstallationJob \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"resources_to_ignore":["string"],"sync_notes":false,"source_auth_token":"string"}'
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
  "job_type": "install",
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "source_blueprint_type": "custom",
  "source_org_id": "string",
  "source_blueprint_file": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "destination_org_id": "string",
  "slug": "string",
  "sync_engine": "terraform",
  "resource_progress": [
    {
      "lineage_id": "string",
      "type": "string",
      "address": "string",
      "name": "string",
      "status": "pending",
      "target_id": "string",
      "error_message": "string",
      "error_code": "string",
      "error_data": {}
    }
  ],
  "options": {
    "resources_to_ignore": ["string"],
    "sync_notes": false
  },
  "status": "IN_PROGRESS"
}
```

</details>

---

### `retryInstallationJob`

Retry a finished V3 installation job whose status is `FAILED` or

`POST /v2/blueprint-manifest/jobs/{job_id}:retry`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest retryInstallationJob \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest retryInstallationJob c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest retryInstallationJob -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `cancelBlueprintJob`

Cancel a blueprint job if it is still running.

`POST /v2/blueprint-manifest/jobs/{job_id}:cancel`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

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
  "job_type": "export",
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

### `getMarketplaceListing`

Get marketplace listing for a blueprint including all versions

`GET /v1/blueprints/{blueprint_id}/marketplace-listing`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getMarketplaceListing \
  -p blueprint_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getMarketplaceListing 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest getMarketplaceListing -p blueprint_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "name": "string",
  "slug": "string",
  "logo": "string",
  "documentation_url": "string",
  "pricing_type": "free",
  "support_email": "string",
  "portal_description": "string",
  "teaser_name": "string",
  "teaser_short_description": "string",
  "teaser_thumbnail": "string",
  "details_page_title": "string",
  "details_page_description": "string",
  "details_page_hero_image": "string",
  "details_page_carousel": ["string"],
  "resources_section_description": "string",
  "resources_section_benefits_title": "string",
  "resources_section_benefits_list": "string",
  "resources_section_process_details": "string",
  "partner": "string",
  "partner_subtext": "string",
  "partner_logo": "string",
  "partner_website_link": "string",
  "last_updated_on": "string",
  "requires_customer_portal": true,
  "process_details_section_title": "string",
  "is_new_blueprint": true,
  "available_in": "string",
  "testimonials": ["string"],
  "installation_link": "string",
  "installation_slug": "string",
  "demo_form_link": "string",
  "order": 0,
  "categories": ["string"],
  "main_category": ["string"],
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "versions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "listing_id": "string",
      "status": "draft",
      "version_name": "string",
      "draft_label": "string",
      "update_note": "string",
      "resources": [
        {}
      ],
      "required_features": ["string"],
      "recommended_apps": ["string"],
      "created_at": "1970-01-01T00:00:00.000Z",
      "published_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "has_publishable_draft": true
}
```

</details>

---

### `createMarketplaceListing`

Create a marketplace listing for a blueprint. Returns 409 if one already exists.

`POST /v1/blueprints/{blueprint_id}/marketplace-listing`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest createMarketplaceListing \
  -p blueprint_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"name":"string","slug":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest createMarketplaceListing 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest createMarketplaceListing -p blueprint_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest createMarketplaceListing -p blueprint_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "name": "string",
  "slug": "string",
  "logo": "string",
  "documentation_url": "string",
  "pricing_type": "free",
  "support_email": "string",
  "portal_description": "string",
  "teaser_name": "string",
  "teaser_short_description": "string",
  "teaser_thumbnail": "string",
  "details_page_title": "string",
  "details_page_description": "string",
  "details_page_hero_image": "string",
  "details_page_carousel": ["string"],
  "resources_section_description": "string",
  "resources_section_benefits_title": "string",
  "resources_section_benefits_list": "string",
  "resources_section_process_details": "string",
  "partner": "string",
  "partner_subtext": "string",
  "partner_logo": "string",
  "partner_website_link": "string",
  "last_updated_on": "string",
  "requires_customer_portal": true,
  "process_details_section_title": "string",
  "is_new_blueprint": true,
  "available_in": "string",
  "testimonials": ["string"],
  "installation_link": "string",
  "installation_slug": "string",
  "demo_form_link": "string",
  "order": 0,
  "categories": ["string"],
  "main_category": ["string"],
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listMarketplaceListings`

List all marketplace listings for the authenticated organization

`GET /v1/marketplace-listings`

**Sample Call**

```bash
epilot blueprint-manifest listMarketplaceListings
```

With JSONata filter:

```bash
epilot blueprint-manifest listMarketplaceListings --jsonata 'listings'
```

<details>
<summary>Sample Response</summary>

```json
{
  "listings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blueprint_id": "string",
      "name": "string",
      "slug": "string",
      "logo": "string",
      "documentation_url": "string",
      "pricing_type": "free",
      "support_email": "string",
      "portal_description": "string",
      "teaser_name": "string",
      "teaser_short_description": "string",
      "teaser_thumbnail": "string",
      "details_page_title": "string",
      "details_page_description": "string",
      "details_page_hero_image": "string",
      "details_page_carousel": ["string"],
      "resources_section_description": "string",
      "resources_section_benefits_title": "string",
      "resources_section_benefits_list": "string",
      "resources_section_process_details": "string",
      "partner": "string",
      "partner_subtext": "string",
      "partner_logo": "string",
      "partner_website_link": "string",
      "last_updated_on": "string",
      "requires_customer_portal": true,
      "process_details_section_title": "string",
      "is_new_blueprint": true,
      "available_in": "string",
      "testimonials": ["string"],
      "installation_link": "string",
      "installation_slug": "string",
      "demo_form_link": "string",
      "order": 0,
      "categories": ["string"],
      "main_category": ["string"],
      "status": "draft",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getMarketplaceListingById`

Get marketplace listing by listing ID including all versions

`GET /v1/marketplace-listings/{listing_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getMarketplaceListingById \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getMarketplaceListingById 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest getMarketplaceListingById -p listing_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "name": "string",
  "slug": "string",
  "logo": "string",
  "documentation_url": "string",
  "pricing_type": "free",
  "support_email": "string",
  "portal_description": "string",
  "teaser_name": "string",
  "teaser_short_description": "string",
  "teaser_thumbnail": "string",
  "details_page_title": "string",
  "details_page_description": "string",
  "details_page_hero_image": "string",
  "details_page_carousel": ["string"],
  "resources_section_description": "string",
  "resources_section_benefits_title": "string",
  "resources_section_benefits_list": "string",
  "resources_section_process_details": "string",
  "partner": "string",
  "partner_subtext": "string",
  "partner_logo": "string",
  "partner_website_link": "string",
  "last_updated_on": "string",
  "requires_customer_portal": true,
  "process_details_section_title": "string",
  "is_new_blueprint": true,
  "available_in": "string",
  "testimonials": ["string"],
  "installation_link": "string",
  "installation_slug": "string",
  "demo_form_link": "string",
  "order": 0,
  "categories": ["string"],
  "main_category": ["string"],
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "versions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "listing_id": "string",
      "status": "draft",
      "version_name": "string",
      "draft_label": "string",
      "update_note": "string",
      "resources": [
        {}
      ],
      "required_features": ["string"],
      "recommended_apps": ["string"],
      "created_at": "1970-01-01T00:00:00.000Z",
      "published_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "has_publishable_draft": true
}
```

</details>

---

### `updateMarketplaceListing`

Update listing-level fields

`PATCH /v1/marketplace-listings/{listing_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest updateMarketplaceListing \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot blueprint-manifest updateMarketplaceListing \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "slug": "string",
  "logo": "string",
  "documentation_url": "string",
  "pricing_type": "free",
  "support_email": "string",
  "portal_description": "string",
  "teaser_name": "string",
  "teaser_short_description": "string",
  "teaser_thumbnail": "string",
  "details_page_title": "string",
  "details_page_description": "string",
  "details_page_hero_image": "string",
  "details_page_carousel": ["string"],
  "resources_section_description": "string",
  "resources_section_benefits_title": "string",
  "resources_section_benefits_list": "string",
  "resources_section_process_details": "string",
  "partner": "string",
  "partner_subtext": "string",
  "partner_logo": "string",
  "partner_website_link": "string",
  "last_updated_on": "string",
  "requires_customer_portal": true,
  "process_details_section_title": "string",
  "is_new_blueprint": true,
  "available_in": "string",
  "testimonials": ["string"],
  "installation_link": "string",
  "installation_slug": "string",
  "demo_form_link": "string",
  "order": 0,
  "categories": ["string"],
  "main_category": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest updateMarketplaceListing 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest updateMarketplaceListing -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest updateMarketplaceListing -p listing_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "name": "string",
  "slug": "string",
  "logo": "string",
  "documentation_url": "string",
  "pricing_type": "free",
  "support_email": "string",
  "portal_description": "string",
  "teaser_name": "string",
  "teaser_short_description": "string",
  "teaser_thumbnail": "string",
  "details_page_title": "string",
  "details_page_description": "string",
  "details_page_hero_image": "string",
  "details_page_carousel": ["string"],
  "resources_section_description": "string",
  "resources_section_benefits_title": "string",
  "resources_section_benefits_list": "string",
  "resources_section_process_details": "string",
  "partner": "string",
  "partner_subtext": "string",
  "partner_logo": "string",
  "partner_website_link": "string",
  "last_updated_on": "string",
  "requires_customer_portal": true,
  "process_details_section_title": "string",
  "is_new_blueprint": true,
  "available_in": "string",
  "testimonials": ["string"],
  "installation_link": "string",
  "installation_slug": "string",
  "demo_form_link": "string",
  "order": 0,
  "categories": ["string"],
  "main_category": ["string"],
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteMarketplaceListing`

Delete listing and all versions

`DELETE /v1/marketplace-listings/{listing_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest deleteMarketplaceListing \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest deleteMarketplaceListing 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest deleteMarketplaceListing -p listing_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listMarketplaceListingVersions`

List all versions for a listing, newest first

`GET /v1/marketplace-listings/{listing_id}/versions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest listMarketplaceListingVersions \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest listMarketplaceListingVersions 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest listMarketplaceListingVersions -p listing_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'versions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "versions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "listing_id": "string",
      "status": "draft",
      "version_name": "string",
      "draft_label": "string",
      "update_note": "string",
      "resources": [
        {}
      ],
      "required_features": ["string"],
      "recommended_apps": ["string"],
      "created_at": "1970-01-01T00:00:00.000Z",
      "published_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createMarketplaceListingVersion`

Create a draft version; auto-snapshots resources, requiredFeatures, recommendedApps from current blueprint

`POST /v1/marketplace-listings/{listing_id}/versions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest createMarketplaceListingVersion \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest createMarketplaceListingVersion 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest createMarketplaceListingVersion -p listing_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "listing_id": "string",
  "status": "draft",
  "version_name": "string",
  "draft_label": "string",
  "update_note": "string",
  "resources": [
    {}
  ],
  "required_features": ["string"],
  "recommended_apps": ["string"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "published_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateMarketplaceListingVersion`

Update updateNote, requiredFeatures, or recommendedApps on a draft version

`PATCH /v1/marketplace-listings/{listing_id}/versions/{version_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |
| `version_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest updateMarketplaceListingVersion \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000 \
  -p version_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"update_note":"string","required_features":["string"],"recommended_apps":["string"]}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest updateMarketplaceListingVersion 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest updateMarketplaceListingVersion -p listing_id=123e4567-e89b-12d3-a456-426614174000 -p version_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest updateMarketplaceListingVersion -p listing_id=123e4567-e89b-12d3-a456-426614174000 -p version_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "listing_id": "string",
  "status": "draft",
  "version_name": "string",
  "draft_label": "string",
  "update_note": "string",
  "resources": [
    {}
  ],
  "required_features": ["string"],
  "recommended_apps": ["string"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "published_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `publishMarketplaceListingVersion`

Publish a draft version; archives the previous live version

`POST /v1/marketplace-listings/{listing_id}/versions/{version_id}/publish`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `listing_id` | path | string | Yes |  |
| `version_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest publishMarketplaceListingVersion \
  -p listing_id=123e4567-e89b-12d3-a456-426614174000 \
  -p version_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"version_name":"string","update_note":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest publishMarketplaceListingVersion 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest publishMarketplaceListingVersion -p listing_id=123e4567-e89b-12d3-a456-426614174000 -p version_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest publishMarketplaceListingVersion -p listing_id=123e4567-e89b-12d3-a456-426614174000 -p version_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "listing_id": "string",
  "status": "draft",
  "version_name": "string",
  "draft_label": "string",
  "update_note": "string",
  "resources": [
    {}
  ],
  "required_features": ["string"],
  "recommended_apps": ["string"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "published_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `publishBlueprintV3`

Starts an asynchronous V3 publication. The result is a signed, portable package; poll the existing blueprint job endpoin

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}:publish`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot blueprint-manifest publishBlueprintV3 \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"publish_to_marketplace":false}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest publishBlueprintV3 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest publishBlueprintV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest publishBlueprintV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `preInstallBlueprintV3`

Validates a signed V3 package and returns the destination-specific resource plan used by the install UI.

`POST /v3/blueprint-manifest/blueprints:pre-install`

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest preInstallBlueprintV3 \
  -d '{"blueprint_file":"string","source_blueprint_type":"marketplace","slug":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest preInstallBlueprintV3
```

With JSONata filter:

```bash
epilot blueprint-manifest preInstallBlueprintV3 --jsonata 'id'
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
  "sync_engine": "terraform",
  "blueprint_file_s3_key": "string",
  "is_verified": true,
  "docs_url": "string",
  "recommended_apps": ["string"],
  "required_features": {
    "enabled": ["string"],
    "disabled": ["string"]
  },
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

### `installBlueprintV3`

Install a blueprint into a single destination org using the V3 engine (direct API

`POST /v3/blueprint-manifest/blueprint:install`

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest installBlueprintV3 \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest installBlueprintV3
```

With JSONata filter:

```bash
epilot blueprint-manifest installBlueprintV3 --jsonata '$'
```

---

### `restoreBlueprintDeploymentV3`

Roll a deployment back to its pre-install state. Two phases:

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest restoreBlueprintDeploymentV3 \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest restoreBlueprintDeploymentV3 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest restoreBlueprintDeploymentV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `getRestorePreview`

Computes what would happen if the user triggered a restore on this

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `job_id` | path | string | Yes | The install job whose deployment is being previewed. |

**Sample Call**

```bash
epilot blueprint-manifest getRestorePreview \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getRestorePreview c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest getRestorePreview -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'snapshot_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "snapshot_id": "string",
  "resources": [
    {
      "lineage_id": "string",
      "type": "string",
      "name": "string",
      "target_id": "string",
      "action": "restore",
      "reason": "modified",
      "last_synced_at": "1970-01-01T00:00:00.000Z",
      "current_updated_at": "1970-01-01T00:00:00.000Z",
      "error_message": "string",
      "is_hidden": true,
      "co_owned_by": [
        {
          "blueprint_id": "string",
          "title": "string"
        }
      ],
      "protected_by": [
        {
          "lineage_id": "string",
          "type": "string",
          "target_id": "string"
        }
      ]
    }
  ],
  "has_effective_changes": true
}
```

</details>

---

### `triggerDeploymentHealthCheckV3`

Starts a read-only health scan of the resources this deployment's

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:health-check`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `job_id` | path | string | Yes | The install job whose deployment is being checked. |

**Request Body**

**Sample Call**

```bash
epilot blueprint-manifest triggerDeploymentHealthCheckV3 \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -d '{"source_org_id":"string","source_auth_token":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest triggerDeploymentHealthCheckV3 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest triggerDeploymentHealthCheckV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest triggerDeploymentHealthCheckV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata '$'
```

---

### `getDeploymentHealthReportV3`

Returns the most recent health report produced for this deployment

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/health-report`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getDeploymentHealthReportV3 \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 \
  -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getDeploymentHealthReportV3 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest getDeploymentHealthReportV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 -p job_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "running",
  "job_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "blueprint_instance_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "destination_org_id": "string",
  "generated_at": "1970-01-01T00:00:00.000Z",
  "html_url": "string",
  "summary": {
    "resources_scanned": 0,
    "unchecked": 0,
    "errors": 0,
    "warnings": 0,
    "infos": 0
  },
  "findings": [
    {
      "check_id": "live_readability",
      "code": "missing_in_destination",
      "severity": "error",
      "resource_type": "string",
      "lineage_id": "string",
      "target_id": "string",
      "resource_name": "string",
      "message": "string",
      "verdict": "string",
      "evidence": {
        "path": "string",
        "referenced_id": "string",
        "referenced_type": "string",
        "referenced_name": "string",
        "referenced_lineage_id": "string",
        "expected_target_id": "string",
        "reference_kind": "string",
        "operation": "string",
        "rejection_reason": "string",
        "error_message": "string",
        "response_status": 0
      }
    }
  ],
  "coverage": {
    "checks": [
      {
        "check_id": "live_readability",
        "status": "completed",
        "scope": "tracked_resources",
        "resources_considered": 0,
        "details": ["string"]
      }
    ],
    "resource_types": [
      {
        "resource_type": "string",
        "tracked": 0,
        "readable_by_lineage": 0,
        "missing_by_lineage": 0,
        "read_errors": 0,
        "unchecked": 0,
        "specialized_checks": ["live_readability"],
        "known_blind_spots": ["string"]
      }
    ]
  },
  "error": "string"
}
```

</details>

---

### `getBlueprintLineageV3`

Returns the lineage registry entries for a blueprint's resources in the current org.

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/lineage`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `blueprint_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getBlueprintLineageV3 \
  -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getBlueprintLineageV3 c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
```

With JSONata filter:

```bash
epilot blueprint-manifest getBlueprintLineageV3 -p blueprint_id=c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341 --jsonata 'total'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "entries": [
    {
      "lineage_id": "string",
      "target_id": "string",
      "resource_type": "designbuilder",
      "blueprint_instance_ids": ["string"],
      "fidelity": "full",
      "last_synced_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createBulkInstallV3`

Install one source blueprint into many destination organizations in a single

`POST /v3/blueprint-manifest/bulk-installs`

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest createBulkInstallV3
```

With request body:

```bash
epilot blueprint-manifest createBulkInstallV3 \
  -d '{
  "source_org_id": "string",
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "max_concurrency": 2,
  "slug": "string",
  "options": {
    "resources_to_ignore": ["string"],
    "sync_notes": false
  },
  "targets": [
    {
      "destination_org_id": "string",
      "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "destination_auth_token": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest createBulkInstallV3
```

With JSONata filter:

```bash
epilot blueprint-manifest createBulkInstallV3 --jsonata '$'
```

---

### `getBulkInstallV3`

Returns the bulk install parent with aggregate status and counts. Scoped by the

`GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `bulk_job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getBulkInstallV3 \
  -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getBulkInstallV3 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest getBulkInstallV3 -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'bulk_job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "bulk_job_id": "string",
  "source_org_id": "string",
  "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "status": "QUEUED",
  "target_count": 0,
  "max_concurrency": 0,
  "counts": {
    "queued": 0,
    "in_progress": 0,
    "success": 0,
    "partial_success": 0,
    "failed": 0
  },
  "slug": "string",
  "options": {
    "resources_to_ignore": ["string"],
    "sync_notes": false
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listBulkInstallTargetsV3`

Pages through the bulk install's target rows. Each row hydrates its latest child

`GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `bulk_job_id` | path | string | Yes |  |
| `limit` | query | number | No |  |
| `cursor` | query | string | No |  |

**Sample Call**

```bash
epilot blueprint-manifest listBulkInstallTargetsV3 \
  -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest listBulkInstallTargetsV3 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest listBulkInstallTargetsV3 -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "bulk_job_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "status": "QUEUED",
      "job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "job": {}
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `retryBulkInstallTargetV3`

Retries a single failed target. Allowed only for `FAILED` and `PARTIAL_SUCCESS`

`POST /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets/{destination_org_id}:retry`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `bulk_job_id` | path | string | Yes |  |
| `destination_org_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest retryBulkInstallTargetV3 \
  -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000 \
  -p destination_org_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"destination_auth_token":"string"}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest retryBulkInstallTargetV3 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest retryBulkInstallTargetV3 -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000 -p destination_org_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot blueprint-manifest retryBulkInstallTargetV3 -p bulk_job_id=123e4567-e89b-12d3-a456-426614174000 -p destination_org_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'bulk_job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "bulk_job_id": "string",
  "destination_org_id": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "status": "QUEUED",
  "job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "job": {
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
    "job_type": "install",
    "source_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "source_blueprint_type": "custom",
    "source_org_id": "string",
    "source_blueprint_file": "string",
    "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
    "destination_org_id": "string",
    "slug": "string",
    "sync_engine": "terraform",
    "resource_progress": [
      {
        "lineage_id": "string",
        "type": "string",
        "address": "string",
        "name": "string",
        "status": "pending",
        "target_id": "string",
        "error_message": "string",
        "error_code": "string",
        "error_data": {}
      }
    ],
    "options": {
      "resources_to_ignore": ["string"],
      "sync_notes": false
    },
    "status": "IN_PROGRESS"
  }
}
```

</details>

---

### `listUniquenessCriteria`

List all custom uniqueness criteria configured for the caller's organization.

`GET /v1/blueprint-manifest/uniqueness-criteria`

**Sample Call**

```bash
epilot blueprint-manifest listUniquenessCriteria
```

With JSONata filter:

```bash
epilot blueprint-manifest listUniquenessCriteria --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "org_id": "string",
      "resource_type": "emailtemplate",
      "fields": ["string"],
      "propagated_to": ["string"],
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string"
    }
  ],
  "defaults": {},
  "readonly_types": ["string"]
}
```

</details>

---

### `getUniquenessCriteria`

Get the configured uniqueness criteria for a specific resource type, if any.

`GET /v1/blueprint-manifest/uniqueness-criteria/{resource_type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `resource_type` | path | "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "product_recommendation" \| "file" \| "document_template" \| "notification_template" \| "journey" | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest getUniquenessCriteria \
  -p resource_type=example
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest getUniquenessCriteria example
```

With JSONata filter:

```bash
epilot blueprint-manifest getUniquenessCriteria -p resource_type=example --jsonata 'org_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "org_id": "string",
  "resource_type": "emailtemplate",
  "fields": ["string"],
  "propagated_to": ["string"],
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string"
}
```

</details>

---

### `putUniquenessCriteria`

Set or replace the uniqueness criteria for a resource type. The provided fields

`PUT /v1/blueprint-manifest/uniqueness-criteria/{resource_type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `resource_type` | path | "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "product_recommendation" \| "file" \| "document_template" \| "notification_template" \| "journey" | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot blueprint-manifest putUniquenessCriteria \
  -p resource_type=example \
  -d '{"fields":["string"],"propagated_to":["string"]}'
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest putUniquenessCriteria example
```

Using stdin pipe:

```bash
cat body.json | epilot blueprint-manifest putUniquenessCriteria -p resource_type=example
```

With JSONata filter:

```bash
epilot blueprint-manifest putUniquenessCriteria -p resource_type=example --jsonata 'org_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "org_id": "string",
  "resource_type": "emailtemplate",
  "fields": ["string"],
  "propagated_to": ["string"],
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string"
}
```

</details>

---

### `deleteUniquenessCriteria`

Remove the custom criteria for a resource type, reverting to the default fields.

`DELETE /v1/blueprint-manifest/uniqueness-criteria/{resource_type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `resource_type` | path | "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "product_recommendation" \| "file" \| "document_template" \| "notification_template" \| "journey" | Yes |  |

**Sample Call**

```bash
epilot blueprint-manifest deleteUniquenessCriteria \
  -p resource_type=example
```

Using positional args for path parameters:

```bash
epilot blueprint-manifest deleteUniquenessCriteria example
```

With JSONata filter:

```bash
epilot blueprint-manifest deleteUniquenessCriteria -p resource_type=example --jsonata '$'
```

---
