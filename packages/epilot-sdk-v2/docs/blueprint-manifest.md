# Blueprint Manifest API

- **Base URL:** `https://blueprint-manifest.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/blueprint-manifest](https://docs.epilot.io/api/blueprint-manifest)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.blueprintManifest.getJob(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/blueprint-manifest'

const blueprintManifestClient = getClient()
authorize(blueprintManifestClient, () => '<token>')
const { data } = await blueprintManifestClient.getJob(...)
```

## Operations

**Import**
- [`uploadManifest`](#uploadmanifest)

**Blueprints**
- [`listBlueprints`](#listblueprints)
- [`createBlueprint`](#createblueprint)
- [`listInstalledMarketplaceBlueprints`](#listinstalledmarketplaceblueprints)
- [`preInstallBlueprint`](#preinstallblueprint)
- [`getBlueprintPreview`](#getblueprintpreview)
- [`installBlueprint`](#installblueprint)
- [`getBlueprint`](#getblueprint)
- [`updateBlueprint`](#updateblueprint)
- [`deleteBlueprint`](#deleteblueprint)
- [`validateBlueprint`](#validateblueprint)
- [`verifyBlueprint`](#verifyblueprint)
- [`exportBlueprint`](#exportblueprint)
- [`listMarketplaceSlugs`](#listmarketplaceslugs)
- [`publishBlueprint`](#publishblueprint)
- [`formatBlueprintDescription`](#formatblueprintdescription)
- [`addBlueprintResource`](#addblueprintresource)
- [`syncDependencies`](#syncdependencies)
- [`bulkAddBlueprintResources`](#bulkaddblueprintresources)
- [`bulkUpdateBlueprintResources`](#bulkupdateblueprintresources)
- [`bulkDeleteBlueprintResources`](#bulkdeleteblueprintresources)
- [`updateBlueprintResource`](#updateblueprintresource)
- [`deleteBlueprintResource`](#deleteblueprintresource)
- [`installBlueprintV3`](#installblueprintv3)
- [`getBlueprintLineageV3`](#getblueprintlineagev3)

**Jobs**
- [`listBlueprintJobs`](#listblueprintjobs)
- [`getBlueprintJob`](#getblueprintjob)
- [`continueInstallationJob`](#continueinstallationjob)
- [`cancelBlueprintJob`](#cancelblueprintjob)

**Marketplace Listings**
- [`createMarketplaceListing`](#createmarketplacelisting)
- [`getMarketplaceListing`](#getmarketplacelisting)
- [`listMarketplaceListings`](#listmarketplacelistings)
- [`getMarketplaceListingById`](#getmarketplacelistingbyid)
- [`updateMarketplaceListing`](#updatemarketplacelisting)
- [`deleteMarketplaceListing`](#deletemarketplacelisting)

**Marketplace Listing Versions**
- [`createMarketplaceListingVersion`](#createmarketplacelistingversion)
- [`listMarketplaceListingVersions`](#listmarketplacelistingversions)
- [`updateMarketplaceListingVersion`](#updatemarketplacelistingversion)
- [`publishMarketplaceListingVersion`](#publishmarketplacelistingversion)

**Schemas**
- [`LineageEntry`](#lineageentry)
- [`BlueprintID`](#blueprintid)
- [`BlueprintResourceID`](#blueprintresourceid)
- [`CommonBlueprintFields`](#commonblueprintfields)
- [`BlueprintResource`](#blueprintresource)
- [`BlueprintPreview`](#blueprintpreview)
- [`CustomBlueprint`](#customblueprint)
- [`FileBlueprint`](#fileblueprint)
- [`MarketplaceBlueprint`](#marketplaceblueprint)
- [`InstalledMarketplaceBlueprintItem`](#installedmarketplaceblueprintitem)
- [`DeployedBlueprint`](#deployedblueprint)
- [`AppBlueprint`](#appblueprint)
- [`Blueprint`](#blueprint)
- [`BlueprintJobID`](#blueprintjobid)
- [`CommonBlueprintJobFields`](#commonblueprintjobfields)
- [`BlueprintExportJob`](#blueprintexportjob)
- [`BlueprintInstallationJob`](#blueprintinstallationjob)
- [`BlueprintJob`](#blueprintjob)
- [`BlueprintDependenciesSyncJob`](#blueprintdependenciessyncjob)
- [`BlueprintValidateJob`](#blueprintvalidatejob)
- [`BlueprintVerificationJob`](#blueprintverificationjob)
- [`LatestBlueprintVerification`](#latestblueprintverification)
- [`VerificationSummary`](#verificationsummary)
- [`ResourceVerificationResult`](#resourceverificationresult)
- [`FieldDiff`](#fielddiff)
- [`BlueprintJobEvent`](#blueprintjobevent)
- [`BlueprintInstallationJobOptions`](#blueprintinstallationjoboptions)
- [`ManifestID`](#manifestid)
- [`JobID`](#jobid)
- [`ManifestSource`](#manifestsource)
- [`Manifest`](#manifest)
- [`ManifestItem`](#manifestitem)
- [`JobStatus`](#jobstatus)
- [`ResourceNodeType`](#resourcenodetype)
- [`PlanChanges`](#planchanges)
- [`CommonResourceNode`](#commonresourcenode)
- [`RootResourceNode`](#rootresourcenode)
- [`VirtualResourceNodeGroup`](#virtualresourcenodegroup)
- [`ResourceNode`](#resourcenode)
- [`Job`](#job)
- [`UploadFilePayload`](#uploadfilepayload)
- [`S3Reference`](#s3reference)
- [`CommonManifestFields`](#commonmanifestfields)
- [`ManifestTimestampFields`](#manifesttimestampfields)
- [`CommonImportFields`](#commonimportfields)
- [`CommonMarkdownFields`](#commonmarkdownfields)
- [`PreInstallRequirements`](#preinstallrequirements)
- [`BlueprintInstallStatus`](#blueprintinstallstatus)
- [`FormattedErrorCodes`](#formattederrorcodes)
- [`FormattedErrorData`](#formattederrordata)
- [`FormattedError`](#formattederror)
- [`CallerIdentity`](#calleridentity)
- [`SelectedResources`](#selectedresources)
- [`ResourceReplacement`](#resourcereplacement)
- [`PutManifestPayload`](#putmanifestpayload)
- [`MarketplaceListing`](#marketplacelisting)
- [`MarketplaceListingUpdate`](#marketplacelistingupdate)
- [`MarketplaceListingVersion`](#marketplacelistingversion)

### `uploadManifest`

Create pre-signed S3 URL to upload a manifest file.

`POST /v1/blueprint-manifest:uploadManifest`

```ts
const { data } = await client.uploadManifest(
  null,
  {
    filename: 'example.manifest.zip'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listBlueprints({
  archived: true,
})
```

<details>
<summary>Response</summary>

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
          "triggered_at": "1970-01-01T00:00:00.000Z",
          "note": "string"
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
  ]
}
```

</details>

---

### `createBlueprint`

Create a Blueprint

`POST /v2/blueprint-manifest/blueprints`

```ts
const { data } = await client.createBlueprint(
  null,
  {
    id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    title: 'string',
    slug: 'string',
    description: {
      preinstall: 'This is the content of the preinstall.md file which contains the blueprint description.
  ',
      postinstall: 'This is the content of the postinstall.md file
  '
    },
    version: 'string',
    deployments: [
      {
        source_org_id: 'string',
        source_blueprint_id: 'string',
        destination_org_id: 'string',
        destination_blueprint_id: 'string',
        triggered_at: '1970-01-01T00:00:00.000Z',
        note: 'string'
      }
    ],
    is_verified: true,
    latest_verification: {
      job_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      status: 'IN_PROGRESS',
      triggered_at: '1970-01-01T00:00:00.000Z',
      source_org_id: 'string',
      source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      destination_org_id: 'string',
      destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      summary: {
        total_resources: 0,
        matched: 0,
        mismatched: 0,
        missing_in_destination: 0,
        fetch_errors: 0
      }
    },
    ignored_resource_addresses: ['string'],
    installation_status: 'IN_PROGRESS',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      name: 'manifest@epilot.cloud',
      org_id: '911690',
      user_id: '11001045',
      token_id: 'api_5ZugdRXasLfWBypHi93Fk'
    },
    updated_by: {
      name: 'manifest@epilot.cloud',
      org_id: '911690',
      user_id: '11001045',
      token_id: 'api_5ZugdRXasLfWBypHi93Fk'
    },
    installation_job_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    archived: false,
    docs_url: 'string',
    recommended_apps: ['string'],
    required_features: {
      enabled: ['string'],
      disabled: ['string']
    },
    zip_file_name: 'string',
    resources: [
      {
        id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
        name: 'string',
        type: 'designbuilder',
        address: 'string',
        is_root: true,
        is_ready: true,
        is_hidden: true,
        is_disabled: false,
        hard_dependencies: ['designbuilder'],
        parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
        depends_on_addresses: ['string'],
        impact_on_install: ['create'],
        impact_on_install_reason: ['string']
      }
    ],
    source_type: 'custom'
  },
)
```

<details>
<summary>Response</summary>

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
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "note": "string"
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
When multiple blueprints have the same slug, returns only the most recently created one.

`GET /v2/blueprint-manifest/blueprints:marketplace`

```ts
const { data } = await client.listInstalledMarketplaceBlueprints()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.preInstallBlueprint(
  null,
  {
    blueprint_file: 'string',
    source_blueprint_type: 'marketplace',
    slug: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getBlueprintPreview({
  preview_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `installBlueprint`

Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource

`POST /v2/blueprint-manifest/blueprint:install`

```ts
const { data } = await client.installBlueprint(
  null,
  {
    source_org_id: 'string',
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    source_blueprint_file: 'string',
    destination_org_id: 'string',
    destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    options: {
      resources_to_ignore: ['string']
    },
    mode: 'simple',
    source_blueprint_type: 'marketplace',
    slug: 'string',
    auto_enable_features: true
  },
)
```

---

### `getBlueprint`

Get Blueprint by ID

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}`

```ts
const { data } = await client.getBlueprint({
  blueprint_id: 'example',
})
```

<details>
<summary>Response</summary>

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
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "note": "string"
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

```ts
const { data } = await client.updateBlueprint(
  {
    blueprint_id: 'example',
  },
  {
    id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    title: 'string',
    slug: 'string',
    description: {
      preinstall: 'This is the content of the preinstall.md file which contains the blueprint description.
  ',
      postinstall: 'This is the content of the postinstall.md file
  '
    },
    version: 'string',
    deployments: [
      {
        source_org_id: 'string',
        source_blueprint_id: 'string',
        destination_org_id: 'string',
        destination_blueprint_id: 'string',
        triggered_at: '1970-01-01T00:00:00.000Z',
        note: 'string'
      }
    ],
    is_verified: true,
    latest_verification: {
      job_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      status: 'IN_PROGRESS',
      triggered_at: '1970-01-01T00:00:00.000Z',
      source_org_id: 'string',
      source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      destination_org_id: 'string',
      destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      summary: {
        total_resources: 0,
        matched: 0,
        mismatched: 0,
        missing_in_destination: 0,
        fetch_errors: 0
      }
    },
    ignored_resource_addresses: ['string'],
    installation_status: 'IN_PROGRESS',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      name: 'manifest@epilot.cloud',
      org_id: '911690',
      user_id: '11001045',
      token_id: 'api_5ZugdRXasLfWBypHi93Fk'
    },
    updated_by: {
      name: 'manifest@epilot.cloud',
      org_id: '911690',
      user_id: '11001045',
      token_id: 'api_5ZugdRXasLfWBypHi93Fk'
    },
    installation_job_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    archived: false,
    docs_url: 'string',
    recommended_apps: ['string'],
    required_features: {
      enabled: ['string'],
      disabled: ['string']
    },
    zip_file_name: 'string',
    resources: [
      {
        id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
        name: 'string',
        type: 'designbuilder',
        address: 'string',
        is_root: true,
        is_ready: true,
        is_hidden: true,
        is_disabled: false,
        hard_dependencies: ['designbuilder'],
        parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
        depends_on_addresses: ['string'],
        impact_on_install: ['create'],
        impact_on_install_reason: ['string']
      }
    ],
    source_type: 'custom'
  },
)
```

<details>
<summary>Response</summary>

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
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "note": "string"
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

```ts
const { data } = await client.deleteBlueprint({
  blueprint_id: 'example',
})
```

<details>
<summary>Response</summary>

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
      "triggered_at": "1970-01-01T00:00:00.000Z",
      "note": "string"
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

### `validateBlueprint`

Start a blueprint validation job. Validates Terraform for the blueprint (all types).
Returns 202 Accepted with job_id. Poll GET /jobs/{job_id} for status, valid, and errors.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/validate`

```ts
const { data } = await client.validateBlueprint({
  blueprint_id: 'example',
})
```

---

### `verifyBlueprint`

Start a blueprint verification job. Compares resource configurations between a source org
and a destination org to verify that a sync/install was successful.
Returns 202 Accepted with job_id. Poll GET

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:verify`

```ts
const { data } = await client.verifyBlueprint(
  {
    blueprint_id: 'example',
  },
  {
    source_org_id: 'string',
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    destination_org_id: 'string',
    destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    source_auth_token: 'string',
    destination_auth_token: 'string'
  },
)
```

---

### `exportBlueprint`

Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:export`

```ts
const { data } = await client.exportBlueprint(
  {
    blueprint_id: 'example',
  },
  {
    destination_org_id: 'string',
    destination_blueprint_id: 'string',
    validate: true
  },
)
```

---

### `listMarketplaceSlugs`

List all available marketplace blueprint slugs from Webflow CMS.
Returns cached results when available.

`GET /v2/blueprint-manifest/marketplace/slugs`

```ts
const { data } = await client.listMarketplaceSlugs()
```

<details>
<summary>Response</summary>

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

Publish a blueprint to the marketplace. Exports the blueprint, uploads it to file-api with public access, and updates the Webflow CMS listing.

`POST /v2/blueprint-manifest/blueprints:publish`

```ts
const { data } = await client.publishBlueprint(
  null,
  {
    blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    slug: 'string',
    version: 'string',
    name: 'string'
  },
)
```

---

### `formatBlueprintDescription`

Format a blueprint description as markdown using AI.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}:format-description`

```ts
const { data } = await client.formatBlueprintDescription(
  {
    blueprint_id: 'example',
  },
  {
    text: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.addBlueprintResource(
  {
    blueprint_id: 'example',
    add_dependencies: true,
  },
  {
    id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    name: 'string',
    type: 'designbuilder',
    address: 'string',
    is_root: true,
    is_ready: true,
    is_hidden: true,
    is_disabled: false,
    hard_dependencies: ['designbuilder'],
    parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
    depends_on_addresses: ['string'],
    impact_on_install: ['create'],
    impact_on_install_reason: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.syncDependencies({
  blueprint_id: 'example',
})
```

---

### `bulkAddBlueprintResources`

Bulk Add resources in a Blueprint

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk`

```ts
const { data } = await client.bulkAddBlueprintResources(
  {
    blueprint_id: 'example',
    add_dependencies: true,
  },
  [
    {
      id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      name: 'string',
      type: 'designbuilder',
      address: 'string',
      is_root: true,
      is_ready: true,
      is_hidden: true,
      is_disabled: false,
      hard_dependencies: ['designbuilder'],
      parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
      depends_on_addresses: ['string'],
      impact_on_install: ['create'],
      impact_on_install_reason: ['string']
    }
  ],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.bulkUpdateBlueprintResources(
  {
    blueprint_id: 'example',
  },
  [
    {
      id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      name: 'string',
      type: 'designbuilder',
      address: 'string',
      is_root: true,
      is_ready: true,
      is_hidden: true,
      is_disabled: false,
      hard_dependencies: ['designbuilder'],
      parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
      depends_on_addresses: ['string'],
      impact_on_install: ['create'],
      impact_on_install_reason: ['string']
    }
  ],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.bulkDeleteBlueprintResources(
  {
    blueprint_id: 'example',
  },
  ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateBlueprintResource(
  {
    blueprint_id: 'example',
    resource_id: 'example',
  },
  {
    id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    name: 'string',
    type: 'designbuilder',
    address: 'string',
    is_root: true,
    is_ready: true,
    is_hidden: true,
    is_disabled: false,
    hard_dependencies: ['designbuilder'],
    parent_resource_ids: ['c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'],
    depends_on_addresses: ['string'],
    impact_on_install: ['create'],
    impact_on_install_reason: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteBlueprintResource({
  blueprint_id: 'example',
  resource_id: 'example',
})
```

<details>
<summary>Response</summary>

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

List Blueprint Jobs

`GET /v2/blueprint-manifest/jobs`

```ts
const { data } = await client.listBlueprintJobs()
```

<details>
<summary>Response</summary>

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

Get Job

`GET /v2/blueprint-manifest/jobs/{job_id}`

```ts
const { data } = await client.getBlueprintJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Continue Installation Job

`POST /v2/blueprint-manifest/jobs/{job_id}:continue`

```ts
const { data } = await client.continueInstallationJob(
  {
    job_id: 'example',
  },
  {
    resources_to_ignore: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

Cancel Blueprint Job

`POST /v2/blueprint-manifest/jobs/{job_id}:cancel`

```ts
const { data } = await client.cancelBlueprintJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `createMarketplaceListing`

Create a marketplace listing for a blueprint. Returns 409 if one already exists.

`POST /v1/blueprints/{blueprint_id}/marketplace-listing`

```ts
const { data } = await client.createMarketplaceListing(
  {
    blueprint_id: 'example',
  },
  {
    name: 'string',
    slug: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

### `getMarketplaceListing`

Get marketplace listing for a blueprint including all versions

`GET /v1/blueprints/{blueprint_id}/marketplace-listing`

```ts
const { data } = await client.getMarketplaceListing({
  blueprint_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `listMarketplaceListings`

List all marketplace listings for the authenticated organization

`GET /v1/marketplace-listings`

```ts
const { data } = await client.listMarketplaceListings()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getMarketplaceListingById({
  listing_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateMarketplaceListing(
  {
    listing_id: 'example',
  },
  {
    name: 'string',
    slug: 'string',
    logo: 'string',
    documentation_url: 'string',
    pricing_type: 'free',
    support_email: 'string',
    portal_description: 'string',
    teaser_name: 'string',
    teaser_short_description: 'string',
    teaser_thumbnail: 'string',
    details_page_title: 'string',
    details_page_description: 'string',
    details_page_hero_image: 'string',
    details_page_carousel: ['string'],
    resources_section_description: 'string',
    resources_section_benefits_title: 'string',
    resources_section_benefits_list: 'string',
    resources_section_process_details: 'string',
    partner: 'string',
    partner_subtext: 'string',
    partner_logo: 'string',
    partner_website_link: 'string',
    last_updated_on: 'string',
    requires_customer_portal: true,
    process_details_section_title: 'string',
    is_new_blueprint: true,
    available_in: 'string',
    testimonials: ['string'],
    installation_link: 'string',
    installation_slug: 'string',
    demo_form_link: 'string',
    order: 0,
    categories: ['string'],
    main_category: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteMarketplaceListing({
  listing_id: 'example',
})
```

---

### `createMarketplaceListingVersion`

Create a draft version; auto-snapshots resources, requiredFeatures, recommendedApps from current blueprint

`POST /v1/marketplace-listings/{listing_id}/versions`

```ts
const { data } = await client.createMarketplaceListingVersion({
  listing_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `listMarketplaceListingVersions`

List all versions for a listing, newest first

`GET /v1/marketplace-listings/{listing_id}/versions`

```ts
const { data } = await client.listMarketplaceListingVersions({
  listing_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `updateMarketplaceListingVersion`

Update updateNote, requiredFeatures, or recommendedApps on a draft version

`PATCH /v1/marketplace-listings/{listing_id}/versions/{version_id}`

```ts
const { data } = await client.updateMarketplaceListingVersion(
  {
    listing_id: 'example',
    version_id: 'example',
  },
  {
    update_note: 'string',
    required_features: ['string'],
    recommended_apps: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.publishMarketplaceListingVersion(
  {
    listing_id: 'example',
    version_id: 'example',
  },
  {
    version_name: 'string',
    update_note: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

### `installBlueprintV3`

Install Blueprint V3

`POST /v3/blueprint-manifest/blueprint:install`

```ts
const { data } = await client.installBlueprintV3(
  null,
  {
    source_org_id: 'string',
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    source_blueprint_file: 'string',
    destination_org_id: 'string',
    destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    destination_auth_token: 'string',
    options: {
      resources_to_ignore: ['string']
    },
    slug: 'string'
  },
)
```

---

### `getBlueprintLineageV3`

Get Blueprint Lineage V3

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/lineage`

```ts
const { data } = await client.getBlueprintLineageV3({
  blueprint_id: 'example',
})
```

<details>
<summary>Response</summary>

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

## Schemas

### `LineageEntry`

```ts
type LineageEntry = {
  lineage_id?: string
  target_id?: string
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  blueprint_instance_ids?: string[]
  fidelity?: "full" | "partial"
  last_synced_at?: string // date-time
}
```

### `BlueprintID`

ID of a blueprint

```ts
type BlueprintID = string
```

### `BlueprintResourceID`

ID of a blueprint resource

```ts
type BlueprintResourceID = string
```

### `CommonBlueprintFields`

```ts
type CommonBlueprintFields = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
}
```

### `BlueprintResource`

```ts
type BlueprintResource = {
  id: string
  name?: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  address?: string
  is_root?: boolean
  is_ready?: boolean
  is_hidden?: boolean
  is_disabled?: boolean
  hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
  parent_resource_ids?: string[]
  depends_on_addresses?: string[]
  impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
  impact_on_install_reason?: string[]
}
```

### `BlueprintPreview`

Preview data for a blueprint before installation. Stored temporarily with TTL.

```ts
type BlueprintPreview = {
  id: string
  org_id: string
  title: string
  description?: {
    preinstall?: string
  }
  version?: string
  slug?: string
  source_type: "marketplace" | "file"
  blueprint_file_s3_key: string
  is_verified: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  created_at: string // date-time
  created_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  is_updating: boolean
  resources: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
}
```

### `CustomBlueprint`

```ts
type CustomBlueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
  source_type?: "custom"
}
```

### `FileBlueprint`

```ts
type FileBlueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  source_type?: "file"
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
}
```

### `MarketplaceBlueprint`

```ts
type MarketplaceBlueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  source_type?: "marketplace"
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
  has_update_available?: boolean
  latest_marketplace_version?: string
  installation_link?: string
}
```

### `InstalledMarketplaceBlueprintItem`

Summary of an installed marketplace blueprint for version tracking

```ts
type InstalledMarketplaceBlueprintItem = {
  id: string
  slug: string
  version?: string
  created_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_at?: string // date-time
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  has_update_available?: boolean
  latest_marketplace_version?: string
  installation_link?: string
}
```

### `DeployedBlueprint`

```ts
type DeployedBlueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  source_type?: "deploy"
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
}
```

### `AppBlueprint`

```ts
type AppBlueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  source_type?: "app"
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
}
```

### `Blueprint`

```ts
type Blueprint = {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    summary?: {
      total_resources?: { ... }
      matched?: { ... }
      mismatched?: { ... }
      missing_in_destination?: { ... }
      fetch_errors?: { ... }
    }
  }
  ignored_resource_addresses?: string[]
  installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED"
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  installation_job_ids?: string[]
  source_blueprint_id?: string
  archived?: boolean
  docs_url?: string
  recommended_apps?: string[]
  required_features?: {
    enabled?: string[]
    disabled?: string[]
  }
  zip_file_name?: string
  resources?: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    impact_on_install_reason?: string[]
  }>
  source_type?: "custom"
} | {
  id?: string
  title: string
  slug?: string
  description?: {
    preinstall?: string
    postinstall?: string
  }
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    triggered_at?: string // date-time
    note?: string
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
  // ...
}
```

### `BlueprintJobID`

ID of a job

```ts
type BlueprintJobID = string
```

### `CommonBlueprintJobFields`

```ts
type CommonBlueprintJobFields = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
}
```

### `BlueprintExportJob`

```ts
type BlueprintExportJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED"
  download_file?: {
    bucket: string
    key: string
  }
}
```

### `BlueprintInstallationJob`

```ts
type BlueprintInstallationJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  source_blueprint_id?: string
  source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app"
  source_org_id?: string
  source_blueprint_file?: string
  destination_blueprint_id?: string
  destination_org_id?: string
  slug?: string
  status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
}
```

### `BlueprintJob`

```ts
type BlueprintJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED"
  download_file?: {
    bucket: string
    key: string
  }
} | {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  source_blueprint_id?: string
  source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app"
  source_org_id?: string
  source_blueprint_file?: string
  destination_blueprint_id?: string
  destination_org_id?: string
  slug?: string
  status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
} | {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED"
} | {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
  // ...
}
```

### `BlueprintDependenciesSyncJob`

```ts
type BlueprintDependenciesSyncJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED"
}
```

### `BlueprintValidateJob`

```ts
type BlueprintValidateJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
  valid?: boolean
  errors?: Array<{
    error?: string | object
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint"
    data?: {
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
    }
  }>
}
```

### `BlueprintVerificationJob`

```ts
type BlueprintVerificationJob = {
  id?: string
  events?: Array<{
    timestamp?: string // date-time
    message?: string
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    level?: "info" | "warning" | "error"
    data?: {
      installed_blueprint_id?: { ... }
      export_job_id?: { ... }
      resources?: { ... }
    }
  }>
  triggered_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  source_org_id?: string
  source_blueprint_id?: string
  destination_org_id?: string
  destination_blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
  summary?: {
    total_resources?: number
    matched?: number
    mismatched?: number
    missing_in_destination?: number
    fetch_errors?: number
  }
  resource_results?: Array<{
    resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    resource_name?: string
    source_resource_id?: string
    destination_resource_id?: string
    status?: "matched" | "mismatched" | "missing_in_destination" | "fetch_error"
    field_diffs?: Array<{
      path?: { ... }
      source_value?: { ... }
      destination_value?: { ... }
      diff_type?: { ... }
    }>
    error?: string
  }>
  resource_results_s3_key?: string
}
```

### `LatestBlueprintVerification`

```ts
type LatestBlueprintVerification = {
  job_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED"
  triggered_at?: string // date-time
  source_org_id?: string
  source_blueprint_id?: string
  destination_org_id?: string
  destination_blueprint_id?: string
  summary?: {
    total_resources?: number
    matched?: number
    mismatched?: number
    missing_in_destination?: number
    fetch_errors?: number
  }
}
```

### `VerificationSummary`

```ts
type VerificationSummary = {
  total_resources?: number
  matched?: number
  mismatched?: number
  missing_in_destination?: number
  fetch_errors?: number
}
```

### `ResourceVerificationResult`

```ts
type ResourceVerificationResult = {
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  resource_name?: string
  source_resource_id?: string
  destination_resource_id?: string
  status?: "matched" | "mismatched" | "missing_in_destination" | "fetch_error"
  field_diffs?: Array<{
    path?: string
    source_value?: unknown
    destination_value?: unknown
    diff_type?: "value_changed" | "field_missing_in_destination" | "field_missing_in_source" | "type_mismatch"
  }>
  error?: string
}
```

### `FieldDiff`

```ts
type FieldDiff = {
  path?: string
  source_value?: unknown
  destination_value?: unknown
  diff_type?: "value_changed" | "field_missing_in_destination" | "field_missing_in_source" | "type_mismatch"
}
```

### `BlueprintJobEvent`

```ts
type BlueprintJobEvent = {
  timestamp?: string // date-time
  message?: string
  errors?: Array<{
    error?: string | object
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint"
    data?: {
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
    }
  }>
  level?: "info" | "warning" | "error"
  data?: {
    installed_blueprint_id?: string
    export_job_id?: string
    resources?: number
  }
}
```

### `BlueprintInstallationJobOptions`

```ts
type BlueprintInstallationJobOptions = {
  resources_to_ignore?: string[]
}
```

### `ManifestID`

ID of an imported / installed manifest

```ts
type ManifestID = string
```

### `JobID`

ID of an import or export job (state machine)

```ts
type JobID = string
```

### `ManifestSource`

```ts
type ManifestSource = "file" | "marketplace" | "sandbox"
```

### `Manifest`

```ts
type Manifest = {
  import_job_id?: string
  previous_jobs_ids?: string[]
  previous_jobs?: Array<{
    job_id?: string
    job_status?: "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    manifest_file_path?: string
    message?: string
    timestamp?: string // date-time
    plan_file_content?: string
    resources_to_export?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }> | {
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }
    large_resources_to_export_url?: string
    resources_to_import?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }> | {
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }
    large_resources_to_import_url?: string
    resource_replacements?: Array<{
      originalAddress: { ... }
      replacementId: { ... }
      replacementName?: { ... }
    }>
    is_verified?: boolean
    errors?: Array<{
      error?: { ... }
      code?: { ... }
      data?: { ... }
    }>
    source_type?: "file" | "marketplace" | "sandbox"
    imported_resources?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }> | {
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }
    large_imported_resources_url?: string // uri
    markdown?: {
      manifest?: { ... }
      preinstall?: { ... }
      postinstall?: { ... }
    }
    manifest_id?: string
    source_blueprint_name?: string
    source_blueprint_slug?: string
    source_blueprint_version?: string
    pre_install_requirements?: string[]
    source_blueprint_file?: string
    docs_link?: string
  // ...
}
```

### `ManifestItem`

```ts
type ManifestItem = {
  manifest_id?: string
  source_type?: "file" | "marketplace" | "sandbox"
  source_blueprint_name?: string
  source_blueprint_slug?: string
  source_blueprint_version?: string
  pre_install_requirements?: string[]
  source_blueprint_file?: string
  docs_link?: string
  source_blueprint_file_ref?: {
    bucket: string
    key: string
  }
  install_status?: "SUCCESS" | "PARTIAL" | "FAILED"
  install_status_description?: string
  is_verified?: boolean
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  manifest_version?: string
  selected_resources_url?: string
  ready_imported_resources_url?: string
  deployed_from?: {
    source_organization_id?: string
    source_manifest_id?: string
    source_organization_type?: "sandbox" | "production"
    last_triggered_at?: string // date-time
  }
  deployed_to?: Array<{
    destination_organization_id?: string
    destination_manifest_id?: string
    destination_organization_type?: "sandbox" | "production"
    last_triggered_at?: string // date-time
  }>
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `JobStatus`

```ts
type JobStatus = "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
```

### `ResourceNodeType`

Type of the resource

```ts
type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
```

### `PlanChanges`

```ts
type PlanChanges = "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
```

### `CommonResourceNode`

```ts
type CommonResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  name?: string
  source_id?: string
  is_virtual?: boolean
}
```

### `RootResourceNode`

```ts
type RootResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: true
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      parents?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }>
  }>
  changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
  changes_reason?: string[]
}
```

### `VirtualResourceNodeGroup`

```ts
type VirtualResourceNodeGroup = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  name?: string
  source_id?: string
  is_virtual?: true
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      parents?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }>
    parents?: Array<{
      id?: { ... }
      type?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }>
}
```

### `ResourceNode`

```ts
type ResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      address?: { ... }
      dependencies?: { ... }
      parents?: { ... }
      changes?: { ... }
      changes_reason?: { ... }
    }>
    parents?: Array<{
      id?: { ... }
      type?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }>
  parents?: Array<{
    id?: string
    type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
  }>
  changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
  changes_reason?: string[]
}
```

### `Job`

```ts
type Job = {
  job_id?: string
  job_status?: "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  manifest_file_path?: string
  message?: string
  timestamp?: string // date-time
  plan_file_content?: string
  resources_to_export?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }> | {
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }
  large_resources_to_export_url?: string
  resources_to_import?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }> | {
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }
  large_resources_to_import_url?: string
  resource_replacements?: Array<{
    originalAddress: string
    replacementId: string
    replacementName?: string
  }>
  is_verified?: boolean
  errors?: Array<{
    error?: string | object
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint"
    data?: {
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
    }
  }>
  source_type?: "file" | "marketplace" | "sandbox"
  imported_resources?: Array<{
    id: string
  // ...
}
```

### `UploadFilePayload`

```ts
type UploadFilePayload = {
  filename: string
}
```

### `S3Reference`

```ts
type S3Reference = {
  bucket: string
  key: string
}
```

### `CommonManifestFields`

```ts
type CommonManifestFields = {
  manifest_id?: string
  source_type?: "file" | "marketplace" | "sandbox"
  source_blueprint_name?: string
  source_blueprint_slug?: string
  source_blueprint_version?: string
  pre_install_requirements?: string[]
  source_blueprint_file?: string
  docs_link?: string
  source_blueprint_file_ref?: {
    bucket: string
    key: string
  }
  install_status?: "SUCCESS" | "PARTIAL" | "FAILED"
  install_status_description?: string
  is_verified?: boolean
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  manifest_version?: string
  selected_resources_url?: string
  ready_imported_resources_url?: string
  deployed_from?: {
    source_organization_id?: string
    source_manifest_id?: string
    source_organization_type?: "sandbox" | "production"
    last_triggered_at?: string // date-time
  }
  deployed_to?: Array<{
    destination_organization_id?: string
    destination_manifest_id?: string
    destination_organization_type?: "sandbox" | "production"
    last_triggered_at?: string // date-time
  }>
}
```

### `ManifestTimestampFields`

```ts
type ManifestTimestampFields = {
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `CommonImportFields`

```ts
type CommonImportFields = {
  source_type?: "file" | "marketplace" | "sandbox"
  imported_resources?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }> | {
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: Array<{
      id: { ... }
      type: { ... }
      name?: { ... }
      source_id?: { ... }
      is_virtual?: { ... }
      dependencies?: { ... }
    }>
    changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
    changes_reason?: string[]
  }
  large_imported_resources_url?: string // uri
}
```

### `CommonMarkdownFields`

```ts
type CommonMarkdownFields = {
  markdown?: {
    manifest?: string
    preinstall?: string
    postinstall?: string
  }
}
```

### `PreInstallRequirements`

List of feature settings that must be enabled before installing the blueprint

```ts
type PreInstallRequirements = string[]
```

### `BlueprintInstallStatus`

```ts
type BlueprintInstallStatus = "SUCCESS" | "PARTIAL" | "FAILED"
```

### `FormattedErrorCodes`

```ts
type FormattedErrorCodes = "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint"
```

### `FormattedErrorData`

```ts
type FormattedErrorData = {
  id?: string
  name?: string
  type?: string
}
```

### `FormattedError`

```ts
type FormattedError = {
  error?: string | object
  code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint"
  data?: {
    formattedResource?: {
      id?: { ... }
      name?: { ... }
      type?: { ... }
    }
    resource?: string
    resourceDependency?: string
    resources?: string[]
    addresses?: string[]
    originalError?: string
  }
}
```

### `CallerIdentity`

```ts
type CallerIdentity = {
  name?: unknown
  org_id: string
  user_id?: string
  token_id?: string
}
```

### `SelectedResources`

```ts
type SelectedResources = {
  exported_root_resources: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable"
    address?: string
  }>
  selected_resources: string[]
  pipeline_id?: string
}
```

### `ResourceReplacement`

```ts
type ResourceReplacement = {
  originalAddress: string
  replacementId: string
  replacementName?: string
}
```

### `PutManifestPayload`

```ts
type PutManifestPayload = {
  source_blueprint_name?: string
  markdown?: string
  ready_resources?: string[]
  deployed_to?: Array<{
    destination_organization_id?: string
    destination_manifest_id?: string
    destination_organization_type?: "sandbox" | "production"
    last_triggered_at?: string
  }>
}
```

### `MarketplaceListing`

```ts
type MarketplaceListing = {
  id: string // uuid
  blueprint_id: string
  name: string
  slug: string
  logo?: string
  documentation_url?: string
  pricing_type?: "free" | "paid" | "freemium" | "contact_us"
  support_email?: string
  portal_description?: string
  teaser_name?: string
  teaser_short_description?: string
  teaser_thumbnail?: string
  details_page_title?: string
  details_page_description?: string
  details_page_hero_image?: string
  details_page_carousel?: string[]
  resources_section_description?: string
  resources_section_benefits_title?: string
  resources_section_benefits_list?: string
  resources_section_process_details?: string
  partner?: string
  partner_subtext?: string
  partner_logo?: string
  partner_website_link?: string
  last_updated_on?: string
  requires_customer_portal?: boolean
  process_details_section_title?: string
  is_new_blueprint?: boolean
  available_in?: string
  testimonials?: string[]
  installation_link?: string
  installation_slug?: string
  demo_form_link?: string
  order?: number
  categories?: string[]
  main_category?: string[]
  status: "draft" | "live" | "archived"
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `MarketplaceListingUpdate`

```ts
type MarketplaceListingUpdate = {
  name?: string
  slug?: string
  logo?: string
  documentation_url?: string
  pricing_type?: "free" | "paid" | "freemium" | "contact_us"
  support_email?: string
  portal_description?: string
  teaser_name?: string
  teaser_short_description?: string
  teaser_thumbnail?: string
  details_page_title?: string
  details_page_description?: string
  details_page_hero_image?: string
  details_page_carousel?: string[]
  resources_section_description?: string
  resources_section_benefits_title?: string
  resources_section_benefits_list?: string
  resources_section_process_details?: string
  partner?: string
  partner_subtext?: string
  partner_logo?: string
  partner_website_link?: string
  last_updated_on?: string
  requires_customer_portal?: boolean
  process_details_section_title?: string
  is_new_blueprint?: boolean
  available_in?: string
  testimonials?: string[]
  installation_link?: string
  installation_slug?: string
  demo_form_link?: string
  order?: number
  categories?: string[]
  main_category?: string[]
}
```

### `MarketplaceListingVersion`

```ts
type MarketplaceListingVersion = {
  id: string // uuid
  listing_id: string
  status: "draft" | "published" | "archived"
  version_name?: string
  draft_label: string
  update_note?: string
  resources?: object[]
  required_features?: string[]
  recommended_apps?: string[]
  created_at: string // date-time
  published_at?: string // date-time
}
```
