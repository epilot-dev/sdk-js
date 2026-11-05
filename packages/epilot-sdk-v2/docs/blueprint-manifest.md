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
- [`getBlueprint`](#getblueprint)
- [`updateBlueprint`](#updateblueprint)
- [`deleteBlueprint`](#deleteblueprint)
- [`addBlueprintNote`](#addblueprintnote)
- [`updateBlueprintNote`](#updateblueprintnote)
- [`deleteBlueprintNote`](#deleteblueprintnote)
- [`verifyBlueprint`](#verifyblueprint)
- [`listMarketplaceSlugs`](#listmarketplaceslugs)
- [`formatBlueprintDescription`](#formatblueprintdescription)
- [`suggestBlueprintResources`](#suggestblueprintresources)
- [`addBlueprintResource`](#addblueprintresource)
- [`syncDependencies`](#syncdependencies)
- [`bulkAddBlueprintResources`](#bulkaddblueprintresources)
- [`bulkUpdateBlueprintResources`](#bulkupdateblueprintresources)
- [`bulkDeleteBlueprintResources`](#bulkdeleteblueprintresources)
- [`updateBlueprintResource`](#updateblueprintresource)
- [`deleteBlueprintResource`](#deleteblueprintresource)
- [`publishBlueprintV3`](#publishblueprintv3)
- [`preInstallBlueprintV3`](#preinstallblueprintv3)
- [`installBlueprintV3`](#installblueprintv3)
- [`restoreBlueprintDeploymentV3`](#restoreblueprintdeploymentv3)
- [`getRestorePreview`](#getrestorepreview)
- [`triggerRestorePreview`](#triggerrestorepreview)
- [`getRestorePreviewReport`](#getrestorepreviewreport)
- [`triggerDeploymentHealthCheckV3`](#triggerdeploymenthealthcheckv3)
- [`getDeploymentHealthReportV3`](#getdeploymenthealthreportv3)
- [`getBlueprintLineageV3`](#getblueprintlineagev3)
- [`createBulkInstallV3`](#createbulkinstallv3)
- [`getBulkInstallV3`](#getbulkinstallv3)
- [`listBulkInstallTargetsV3`](#listbulkinstalltargetsv3)
- [`retryBulkInstallTargetV3`](#retrybulkinstalltargetv3)

**Jobs**
- [`listBlueprintJobs`](#listblueprintjobs)
- [`getBlueprintJob`](#getblueprintjob)
- [`continueInstallationJob`](#continueinstallationjob)
- [`retryInstallationJob`](#retryinstallationjob)
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

**merge-plans**
- [`getBlueprintMergePlan`](#getblueprintmergeplan)
- [`listBlueprintMergePlanResources`](#listblueprintmergeplanresources)
- [`getBlueprintMergePlanResource`](#getblueprintmergeplanresource)
- [`updateBlueprintMergePlanResolutions`](#updateblueprintmergeplanresolutions)
- [`discardBlueprintMergePlan`](#discardblueprintmergeplan)
- [`replanBlueprintMergePlan`](#replanblueprintmergeplan)
- [`applyBlueprintMergePlan`](#applyblueprintmergeplan)
- [`previewBlueprintMergeRevert`](#previewblueprintmergerevert)
- [`applyBlueprintMergeRevert`](#applyblueprintmergerevert)

**Uniqueness Criteria**
- [`listUniquenessCriteria`](#listuniquenesscriteria)
- [`getUniquenessCriteria`](#getuniquenesscriteria)
- [`putUniquenessCriteria`](#putuniquenesscriteria)
- [`deleteUniquenessCriteria`](#deleteuniquenesscriteria)

**Schemas**
- [`UniquenessCriteriaResourceType`](#uniquenesscriteriaresourcetype)
- [`UniquenessCriteria`](#uniquenesscriteria)
- [`LineageEntry`](#lineageentry)
- [`BlueprintNote`](#blueprintnote)
- [`BlueprintID`](#blueprintid)
- [`BlueprintResourceID`](#blueprintresourceid)
- [`CommonBlueprintFields`](#commonblueprintfields)
- [`SuggestBlueprintResourcesRequest`](#suggestblueprintresourcesrequest)
- [`SuggestBlueprintResourcesResponse`](#suggestblueprintresourcesresponse)
- [`SkippedBlueprintResource`](#skippedblueprintresource)
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
- [`BulkInstallStatus`](#bulkinstallstatus)
- [`BulkInstallCounts`](#bulkinstallcounts)
- [`BulkInstall`](#bulkinstall)
- [`BulkInstallTarget`](#bulkinstalltarget)
- [`BulkInstallTargetList`](#bulkinstalltargetlist)
- [`BulkInstallTargetInput`](#bulkinstalltargetinput)
- [`BulkInstallCreateRequest`](#bulkinstallcreaterequest)
- [`BlueprintRestoreJob`](#blueprintrestorejob)
- [`V3ResourceProgressEntry`](#v3resourceprogressentry)
- [`RestoreOutcomeItem`](#restoreoutcomeitem)
- [`HealthFinding`](#healthfinding)
- [`HealthCheckCoverage`](#healthcheckcoverage)
- [`HealthResourceTypeCoverage`](#healthresourcetypecoverage)
- [`HealthScanCoverage`](#healthscancoverage)
- [`DeploymentHealthReport`](#deploymenthealthreport)
- [`RestoreOutcome`](#restoreoutcome)
- [`RestorePreviewReport`](#restorepreviewreport)
- [`BlueprintJob`](#blueprintjob)
- [`BlueprintDependenciesSyncJob`](#blueprintdependenciessyncjob)
- [`BlueprintVerificationJob`](#blueprintverificationjob)
- [`LatestBlueprintVerification`](#latestblueprintverification)
- [`VerificationSummary`](#verificationsummary)
- [`ResourceVerificationResult`](#resourceverificationresult)
- [`FieldDiff`](#fielddiff)
- [`BlueprintJobEvent`](#blueprintjobevent)
- [`BlueprintInstallationJobOptions`](#blueprintinstallationjoboptions)
- [`ContinueInstallationJobRequest`](#continueinstallationjobrequest)
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
- [`MergePlanState`](#mergeplanstate)
- [`MergeOptionId`](#mergeoptionid)
- [`MergeChoice`](#mergechoice)
- [`MergeChoiceInput`](#mergechoiceinput)
- [`MergeSectionRef`](#mergesectionref)
- [`MergeSectionValue`](#mergesectionvalue)
- [`MergeDecisionGroup`](#mergedecisiongroup)
- [`MergePlanWarning`](#mergeplanwarning)
- [`MergeBaseProvenance`](#mergebaseprovenance)
- [`MergeResourceStatus`](#mergeresourcestatus)
- [`MergeResourceEligibility`](#mergeresourceeligibility)
- [`MergeResourceAutoCounts`](#mergeresourceautocounts)
- [`MergePlanReview`](#mergeplanreview)
- [`MergePlanApplyCounts`](#mergeplanapplycounts)
- [`MergeResourceOutcome`](#mergeresourceoutcome)
- [`MergePlanResourceSummary`](#mergeplanresourcesummary)
- [`MergePlanResourcePage`](#mergeplanresourcepage)
- [`MergePlanResourceDetail`](#mergeplanresourcedetail)
- [`MergePlanResourceReview`](#mergeplanresourcereview)
- [`MergePlanResolutionsUpdate`](#mergeplanresolutionsupdate)
- [`MergePlanApplyRequest`](#mergeplanapplyrequest)
- [`MergePlanRevisionRequest`](#mergeplanrevisionrequest)
- [`MergePlanReplanResult`](#mergeplanreplanresult)
- [`MergeRevertEntry`](#mergerevertentry)
- [`MergeRevertPreview`](#mergerevertpreview)
- [`MergeRevertSelection`](#mergerevertselection)
- [`MergeRevertRequest`](#mergerevertrequest)
- [`MergeRevertResult`](#mergerevertresult)
- [`MergePlanError`](#mergeplanerror)

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
    notes: [
      {
        id: '3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40',
        text: 'Adjusted the meter-reading journey for the §14a rollout.',
        created_at: '1970-01-01T00:00:00.000Z',
        updated_at: '1970-01-01T00:00:00.000Z',
        created_by: { /* ... */ }
      }
    ],
    version: 'string',
    deployments: [
      {
        source_org_id: 'string',
        source_blueprint_id: 'string',
        destination_org_id: 'string',
        destination_blueprint_id: 'string',
        job_id: 'string',
        triggered_at: '1970-01-01T00:00:00.000Z',
        performed_by: { /* ... */ },
        note: 'string',
        status: 'IN_PROGRESS',
        merge_plan_id: 'string',
        merge_snapshot_id: 'string',
        snapshot_restore_available: true,
        merge_plan_state: 'review_required',
        revert_until: '1970-01-01T00:00:00.000Z',
        restore_details: { /* ... */ },
        has_revertible_changes: true,
        last_restore_job_id: 'string',
        restore_status: 'available'
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
      installation_job_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      sync_engine: 'terraform',
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
    active_restore_job_id: 'string',
    active_restore_started_at: '1970-01-01T00:00:00.000Z',
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
        impact_on_install_reason: ['string'],
        impact_on_install_changes: [ /* ... */ ],
        impact_on_install_labels: {},
        impact_on_install_summary: ['string']
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
      "merge_plan_id": "string",
      "merge_snapshot_id": "string",
      "snapshot_restore_available": true,
      "merge_plan_state": "review_required",
      "revert_until": "1970-01-01T00:00:00.000Z",
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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

Pre-install a Blueprint based on a blueprint file. Format-agnostic: the engine is detected from the uploaded archive, so this endpoint accepts both Terraform exports and signed V3 packages. The return

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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
    }
  ]
}
```

</details>

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
      "merge_plan_id": "string",
      "merge_snapshot_id": "string",
      "snapshot_restore_available": true,
      "merge_plan_state": "review_required",
      "revert_until": "1970-01-01T00:00:00.000Z",
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
    notes: [
      {
        id: '3f1c9b0e-2f3a-4a1f-9a3e-6f2b8c7d1e40',
        text: 'Adjusted the meter-reading journey for the §14a rollout.',
        created_at: '1970-01-01T00:00:00.000Z',
        updated_at: '1970-01-01T00:00:00.000Z',
        created_by: { /* ... */ }
      }
    ],
    version: 'string',
    deployments: [
      {
        source_org_id: 'string',
        source_blueprint_id: 'string',
        destination_org_id: 'string',
        destination_blueprint_id: 'string',
        job_id: 'string',
        triggered_at: '1970-01-01T00:00:00.000Z',
        performed_by: { /* ... */ },
        note: 'string',
        status: 'IN_PROGRESS',
        merge_plan_id: 'string',
        merge_snapshot_id: 'string',
        snapshot_restore_available: true,
        merge_plan_state: 'review_required',
        revert_until: '1970-01-01T00:00:00.000Z',
        restore_details: { /* ... */ },
        has_revertible_changes: true,
        last_restore_job_id: 'string',
        restore_status: 'available'
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
      installation_job_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
      sync_engine: 'terraform',
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
    active_restore_job_id: 'string',
    active_restore_started_at: '1970-01-01T00:00:00.000Z',
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
        impact_on_install_reason: ['string'],
        impact_on_install_changes: [ /* ... */ ],
        impact_on_install_labels: {},
        impact_on_install_summary: ['string']
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
      "merge_plan_id": "string",
      "merge_snapshot_id": "string",
      "snapshot_restore_available": true,
      "merge_plan_state": "review_required",
      "revert_until": "1970-01-01T00:00:00.000Z",
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
      "merge_plan_id": "string",
      "merge_snapshot_id": "string",
      "snapshot_restore_available": true,
      "merge_plan_state": "review_required",
      "revert_until": "1970-01-01T00:00:00.000Z",
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
    }
  ],
  "source_type": "custom"
}
```

</details>

---

### `addBlueprintNote`

Append an internal note to a blueprint. `id`, `created_at` and `created_by`
are stamped server-side from the caller, so notes cannot be backdated or
attributed to someone else. Existing notes are neve

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/notes`

```ts
const { data } = await client.addBlueprintNote(
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
the list along with `created_at` and `created_by`, so an edit cannot reassign
authorship; `updated_at` is stamped server-s

`PATCH /v2/blueprint-manifest/blueprints/{blueprint_id}/notes/{note_id}`

```ts
const { data } = await client.updateBlueprintNote(
  {
    blueprint_id: 'example',
    note_id: 'example',
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

```ts
const { data } = await client.deleteBlueprintNote({
  blueprint_id: 'example',
  note_id: 'example',
})
```

<details>
<summary>Response</summary>

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
    destination_auth_token: 'string',
    installation_job_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    sync_engine: 'terraform'
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

### `suggestBlueprintResources`

Suggest resources to add to a blueprint based on a natural-language prompt.

`POST /v2/blueprint-manifest/blueprints:suggest-resources`

```ts
const { data } = await client.suggestBlueprintResources(
  null,
  {
    prompt: 'everything for the hausanschluss use case',
    blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341'
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
    impact_on_install_reason: ['string'],
    impact_on_install_changes: [
      {
        path: 'string',
        destination: {},
        source: {},
        added: true
      }
    ],
    impact_on_install_labels: {},
    impact_on_install_summary: ['string']
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
        "originalError": "string",
        "current": 0,
        "max_allowed": 0,
        "planned": 0
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

```ts
const { data } = await client.syncDependencies({
  blueprint_id: 'example',
  trigger: 'example',
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
      impact_on_install_reason: ['string'],
      impact_on_install_changes: [
        {
          path: 'string',
          destination: {},
          source: {},
          added: true
        }
      ],
      impact_on_install_labels: {},
      impact_on_install_summary: ['string']
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
        "originalError": "string",
        "current": 0,
        "max_allowed": 0,
        "planned": 0
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
      impact_on_install_reason: ['string'],
      impact_on_install_changes: [
        {
          path: 'string',
          destination: {},
          source: {},
          added: true
        }
      ],
      impact_on_install_labels: {},
      impact_on_install_summary: ['string']
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
    impact_on_install_reason: ['string'],
    impact_on_install_changes: [
      {
        path: 'string',
        destination: {},
        source: {},
        added: true
      }
    ],
    impact_on_install_labels: {},
    impact_on_install_summary: ['string']
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
    }
  ]
}
```

</details>

---

### `listBlueprintJobs`

List all blueprint jobs

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
                "originalError": "string",
                "current": 0,
                "max_allowed": 0,
                "planned": 0
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
check `sync_engine` (`terraform` | `v3`) to tell them apart. V3 jobs additionally
expose live `resource_progress[]`. V3

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
            "originalError": "string",
            "current": 0,
            "max_allowed": 0,
            "planned": 0
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
planning. Works for both Terraform and V3 jobs. Not needed for V3 installs created
with `auto_apply: true` (including

`POST /v2/blueprint-manifest/jobs/{job_id}:continue`

```ts
const { data } = await client.continueInstallationJob(
  {
    job_id: 'example',
  },
  {
    resources_to_ignore: ['string'],
    sync_notes: false,
    include_field_diffs: false,
    source_auth_token: 'string'
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
            "originalError": "string",
            "current": 0,
            "max_allowed": 0,
            "planned": 0
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
    "sync_notes": false,
    "include_field_diffs": false
  },
  "merge_plan_id": "string",
  "wait_kind": "plan",
  "prefill_from_merge_plan_id": "string",
  "assigned_merge_plan_id": "string",
  "status": "IN_PROGRESS"
}
```

</details>

---

### `retryInstallationJob`

Retry a finished V3 installation job whose status is `FAILED` or
`PARTIAL_SUCCESS`. Starts a fresh install job (new `job_id`) with the same
source/destination and `auto_apply: true` — no `:continue` c

`POST /v2/blueprint-manifest/jobs/{job_id}:retry`

```ts
const { data } = await client.retryInstallationJob({
  job_id: 'example',
})
```

---

### `cancelBlueprintJob`

Cancel a blueprint job if it is still running.

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
            "originalError": "string",
            "current": 0,
            "max_allowed": 0,
            "planned": 0
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

### `publishBlueprintV3`

Starts an asynchronous V3 publication. The result is a signed, portable package; poll the existing blueprint job endpoint for completion.

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}:publish`

```ts
const { data } = await client.publishBlueprintV3(
  {
    blueprint_id: 'example',
  },
  {
    publish_to_marketplace: false,
    slug: 'string',
    version: 'string',
    name: 'string'
  },
)
```

---

### `preInstallBlueprintV3`

Validates a signed V3 package and returns the destination-specific resource plan used by the install UI.

`POST /v3/blueprint-manifest/blueprints:pre-install`

```ts
const { data } = await client.preInstallBlueprintV3(
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
      "impact_on_install_reason": ["string"],
      "impact_on_install_changes": [
        {
          "path": "string",
          "destination": {},
          "source": {},
          "added": true
        }
      ],
      "impact_on_install_labels": {},
      "impact_on_install_summary": ["string"]
    }
  ]
}
```

</details>

---

### `getBlueprintMergePlan`

Summary of an update merge plan, with counts, warnings and the revision to send back.

`GET /v3/blueprint-manifest/merge-plans/{merge_plan_id}`

```ts
const { data } = await client.getBlueprintMergePlan({
  merge_plan_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "merge_plan_id": "string",
  "plan_revision": 0,
  "expected_plan_revision": 0,
  "warnings": [
    {
      "code": "string",
      "resource_key": "string",
      "target": "string",
      "message": "string"
    }
  ],
  "blocked_reasons": ["string"],
  "apply_counts": {
    "updated": 0,
    "kept": 0,
    "removed": 0,
    "restored": 0
  },
  "apply_counts_unknown": true,
  "state": "review_required",
  "job_id": "string",
  "destination_blueprint_id": "string",
  "source": {
    "blueprint_id": "string",
    "version": "string"
  },
  "resource_counts": {
    "automatic": 0,
    "decisions_required": 0,
    "ready": 0,
    "blocked": 0
  },
  "group_counts": {
    "conflict": 0,
    "confirm": 0,
    "mandatory": 0,
    "unresolved": 0
  },
  "warning_count": 0,
  "auto_counts": {
    "kept_customizations": 0,
    "applied_updates": 0
  },
  "other_resource_count": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "revert_until": "1970-01-01T00:00:00.000Z",
  "supersedes": "string",
  "superseded_by": "string",
  "successor_failed": true
}
```

</details>

---

### `listBlueprintMergePlanResources`

Journeys of the plan, one page at a time. A cursor is valid only for the revision it was issued for.

`GET /v3/blueprint-manifest/merge-plans/{merge_plan_id}/resources`

```ts
const { data } = await client.listBlueprintMergePlanResources({
  merge_plan_id: 'example',
  cursor: 'example',
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "merge_plan_id": "string",
  "plan_revision": 0,
  "resources": [
    {
      "resource_key": "string",
      "label": "string",
      "status": "automatic",
      "eligibility": "merge",
      "blocking_reasons": ["string"],
      "auto_counts": {
        "from_current": 0,
        "from_incoming": 0
      },
      "unresolved": 0,
      "warning_count": 0,
      "outcome": "applied"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getBlueprintMergePlanResource`

One journey of the plan with its decision groups and warnings.

`GET /v3/blueprint-manifest/merge-plans/{merge_plan_id}/resources/{resource_key}`

```ts
const { data } = await client.getBlueprintMergePlanResource({
  merge_plan_id: 'example',
  resource_key: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "merge_plan_id": "string",
  "plan_revision": 0,
  "resource": {
    "resource_key": "string",
    "resource_type": "journey",
    "lineage_id": "string",
    "target_id": "string",
    "label": "string",
    "model_version": "string",
    "base_provenance": {
      "rung": "apply_evidence",
      "job_id": "string",
      "manifest_version": "string",
      "reason": "no_evidence"
    },
    "eligibility": "merge",
    "fast_path": true,
    "auto_counts": {
      "from_current": 0,
      "from_incoming": 0
    },
    "decision_groups": [
      {}
    ],
    "warnings": [
      {}
    ],
    "status": "automatic",
    "blocking_reasons": ["string"],
    "outcome": "applied"
  }
}
```

</details>

---

### `updateBlueprintMergePlanResolutions`

Saves choices for decision groups. Each submitted choice replaces the saved choice of the same group. Allowed while the plan waits for review.

`PUT /v3/blueprint-manifest/merge-plans/{merge_plan_id}/resolutions`

```ts
const { data } = await client.updateBlueprintMergePlanResolutions(
  {
    merge_plan_id: 'example',
  },
  {
    expected_plan_revision: 0,
    resolutions: [
      {
        group_id: 'string',
        group_signature: 'string',
        option_id: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "merge_plan_id": "string",
  "plan_revision": 0,
  "expected_plan_revision": 0,
  "warnings": [
    {
      "code": "string",
      "resource_key": "string",
      "target": "string",
      "message": "string"
    }
  ],
  "blocked_reasons": ["string"],
  "apply_counts": {
    "updated": 0,
    "kept": 0,
    "removed": 0,
    "restored": 0
  },
  "apply_counts_unknown": true,
  "state": "review_required",
  "job_id": "string",
  "destination_blueprint_id": "string",
  "source": {
    "blueprint_id": "string",
    "version": "string"
  },
  "resource_counts": {
    "automatic": 0,
    "decisions_required": 0,
    "ready": 0,
    "blocked": 0
  },
  "group_counts": {
    "conflict": 0,
    "confirm": 0,
    "mandatory": 0,
    "unresolved": 0
  },
  "warning_count": 0,
  "auto_counts": {
    "kept_customizations": 0,
    "applied_updates": 0
  },
  "other_resource_count": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "revert_until": "1970-01-01T00:00:00.000Z",
  "supersedes": "string",
  "superseded_by": "string",
  "successor_failed": true
}
```

</details>

---

### `discardBlueprintMergePlan`

Discards a plan waiting for review and ends its job. Nothing is written.

`POST /v3/blueprint-manifest/merge-plans/{merge_plan_id}:discard`

```ts
const { data } = await client.discardBlueprintMergePlan(
  {
    merge_plan_id: 'example',
  },
  {
    expected_plan_revision: 0
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "merge_plan_id": "string",
  "plan_revision": 0,
  "expected_plan_revision": 0,
  "warnings": [
    {
      "code": "string",
      "resource_key": "string",
      "target": "string",
      "message": "string"
    }
  ],
  "blocked_reasons": ["string"],
  "apply_counts": {
    "updated": 0,
    "kept": 0,
    "removed": 0,
    "restored": 0
  },
  "apply_counts_unknown": true,
  "state": "review_required",
  "job_id": "string",
  "destination_blueprint_id": "string",
  "source": {
    "blueprint_id": "string",
    "version": "string"
  },
  "resource_counts": {
    "automatic": 0,
    "decisions_required": 0,
    "ready": 0,
    "blocked": 0
  },
  "group_counts": {
    "conflict": 0,
    "confirm": 0,
    "mandatory": 0,
    "unresolved": 0
  },
  "warning_count": 0,
  "auto_counts": {
    "kept_customizations": 0,
    "applied_updates": 0
  },
  "other_resource_count": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "revert_until": "1970-01-01T00:00:00.000Z",
  "supersedes": "string",
  "superseded_by": "string",
  "successor_failed": true
}
```

</details>

---

### `replanBlueprintMergePlan`

Starts a new update job whose plan is prefilled with this plan's saved choices. A plan still waiting for review, or expired, becomes `superseded`.

`POST /v3/blueprint-manifest/merge-plans/{merge_plan_id}:replan`

```ts
const { data } = await client.replanBlueprintMergePlan(
  {
    merge_plan_id: 'example',
  },
  {
    expected_plan_revision: 0
  },
)
```

---

### `applyBlueprintMergePlan`

Approves the plan at `expected_plan_revision` with its current choices and resumes the parked update job with the caller's token. Only a `ready` plan whose job waits for this review can be applied. Re

`POST /v3/blueprint-manifest/merge-plans/{merge_plan_id}:apply`

```ts
const { data } = await client.applyBlueprintMergePlan(
  {
    merge_plan_id: 'example',
  },
  {
    expected_plan_revision: 0,
    idempotency_key: 'string'
  },
)
```

---

### `previewBlueprintMergeRevert`

Lists what the update wrote, from its own journal, and what reverting each resource would do. Resources changed since the update need an explicit choice (`requires_choice`); `not_restorable` ones can 

`POST /v3/blueprint-manifest/merge-plans/{merge_plan_id}:preview-revert`

```ts
const { data } = await client.previewBlueprintMergeRevert(
  {
    merge_plan_id: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "revert_preview_id": "string",
  "preview_revision": 0,
  "merge_plan_id": "string",
  "entries": [
    {
      "resource_key": "string",
      "lineage_id": "string",
      "label": "string",
      "resource_type": "string",
      "category": "unchanged",
      "default_action": "restore",
      "requires_choice": true
    }
  ]
}
```

</details>

---

### `applyBlueprintMergeRevert`

Reverts the update as the preview describes it, with an explicit `action` for every preview entry. Starts a `restore` job and moves the plan to `reverting`; the job ends it `reverted`, or `revert_part

`POST /v3/blueprint-manifest/merge-plans/{merge_plan_id}:revert`

```ts
const { data } = await client.applyBlueprintMergeRevert(
  {
    merge_plan_id: 'example',
  },
  {
    revert_preview_id: 'string',
    expected_preview_revision: 0,
    idempotency_key: 'string',
    selections: [
      {
        resource_key: 'string',
        action: 'restore'
      }
    ],
    session_credentials: {
      refresh_token: 'string',
      client_id: 'string',
      pipeline_id: 'string'
    }
  },
)
```

---

### `installBlueprintV3`

Install a blueprint into a single destination org using the V3 engine (direct API
calls, no Terraform). Creates resources in topological order with global ID
replacement and supports checkpoint-based 

`POST /v3/blueprint-manifest/blueprint:install`

```ts
const { data } = await client.installBlueprintV3(
  null,
  {},
)
```

---

### `restoreBlueprintDeploymentV3`

Roll a deployment back to its pre-install state. Two phases:

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore`

```ts
const { data } = await client.restoreBlueprintDeploymentV3({
  blueprint_id: 'example',
  job_id: 'example',
})
```

---

### `getRestorePreview`

Computes what would happen if the user triggered a restore on this
deployment, without performing any writes. The forecast uses the
snapshot's captured resources (when present) plus the current lineag

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview`

```ts
const { data } = await client.getRestorePreview({
  blueprint_id: 'example',
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `triggerRestorePreview`

Starts computing the same forecast as `getRestorePreview` in the
background. Large deployments take longer than the API Gateway
timeout to forecast inline, so clients should prefer this endpoint.

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore-preview`

```ts
const { data } = await client.triggerRestorePreview({
  blueprint_id: 'example',
  job_id: 'example',
})
```

---

### `getRestorePreviewReport`

Returns a restore preview started by `triggerRestorePreview`. The
`outcome` is present once `status` is `completed`. A preview whose
worker stopped without reporting is returned as `failed`.

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview/{preview_id}`

```ts
const { data } = await client.getRestorePreviewReport({
  blueprint_id: 'example',
  job_id: 'example',
  preview_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "preview_id": "string",
  "job_id": "string",
  "status": "running",
  "requested_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "outcome": {
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
  },
  "error": "string"
}
```

</details>

---

### `triggerDeploymentHealthCheckV3`

Starts a read-only health scan of the resources this deployment's
blueprint instance tracks in the destination org (see
docs/rfcs/RFC-org-health-check.md, Phase 0). Checks:

`POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:health-check`

```ts
const { data } = await client.triggerDeploymentHealthCheckV3(
  {
    blueprint_id: 'example',
    job_id: 'example',
  },
  {
    source_org_id: 'string',
    source_auth_token: 'string'
  },
)
```

---

### `getDeploymentHealthReportV3`

Returns the most recent health report produced for this deployment
by the `:health-check` endpoint. Idempotent and side-effect free.

`GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/health-report`

```ts
const { data } = await client.getDeploymentHealthReportV3({
  blueprint_id: 'example',
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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
Shows the mapping between source lineage IDs and target resource IDs.

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

### `createBulkInstallV3`

Install one source blueprint into many destination organizations in a single
request. The server schedules child V3 installs with `auto_apply=true` and caps
active installs at `max_concurrency`. Not a

`POST /v3/blueprint-manifest/bulk-installs`

```ts
const { data } = await client.createBulkInstallV3(
  null,
  {
    source_org_id: 'string',
    source_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
    max_concurrency: 2,
    slug: 'string',
    options: {
      resources_to_ignore: ['string'],
      sync_notes: false,
      include_field_diffs: false
    },
    targets: [
      {
        destination_org_id: 'string',
        destination_blueprint_id: 'c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341',
        destination_auth_token: 'string'
      }
    ]
  },
)
```

---

### `getBulkInstallV3`

Returns the bulk install parent with aggregate status and counts. Scoped by the
caller org as `source_org_id`. Target rows are not included — use the targets
endpoint to page through them.

`GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}`

```ts
const { data } = await client.getBulkInstallV3({
  bulk_job_id: 'example',
})
```

<details>
<summary>Response</summary>

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
    "failed": 0,
    "review_required": 0
  },
  "slug": "string",
  "options": {
    "resources_to_ignore": ["string"],
    "sync_notes": false,
    "include_field_diffs": false
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listBulkInstallTargetsV3`

Pages through the bulk install's target rows. Each row hydrates its latest child
install job (`job_ids.at(-1)`) with the standard V3 job shape (`events[]`,
`resource_progress[]`) so callers can inspec

`GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets`

```ts
const { data } = await client.listBulkInstallTargetsV3({
  bulk_job_id: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "bulk_job_id": "string",
      "destination_org_id": "string",
      "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
      "status": "QUEUED",
      "job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
      "merge_plan_id": "string",
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
                  "originalError": "string",
                  "current": 0,
                  "max_allowed": 0,
                  "planned": 0
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
          "sync_notes": false,
          "include_field_diffs": false
        },
        "merge_plan_id": "string",
        "wait_kind": "plan",
        "prefill_from_merge_plan_id": "string",
        "assigned_merge_plan_id": "string",
        "status": "IN_PROGRESS"
      }
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `retryBulkInstallTargetV3`

Retries a single failed target. Allowed only for `FAILED` and `PARTIAL_SUCCESS`
targets. Starts a new child install with `auto_apply=true`, appends its job id to
`job_ids`, and reuses the same target 

`POST /v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets/{destination_org_id}:retry`

```ts
const { data } = await client.retryBulkInstallTargetV3(
  {
    bulk_job_id: 'example',
    destination_org_id: 'example',
  },
  {
    destination_auth_token: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "bulk_job_id": "string",
  "destination_org_id": "string",
  "destination_blueprint_id": "c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341",
  "status": "QUEUED",
  "job_ids": ["c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341"],
  "merge_plan_id": "string",
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
              "originalError": "string",
              "current": 0,
              "max_allowed": 0,
              "planned": 0
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
      "sync_notes": false,
      "include_field_diffs": false
    },
    "merge_plan_id": "string",
    "wait_kind": "plan",
    "prefill_from_merge_plan_id": "string",
    "assigned_merge_plan_id": "string",
    "status": "IN_PROGRESS"
  }
}
```

</details>

---

### `listUniquenessCriteria`

List all custom uniqueness criteria configured for the caller's organization.
These overrides are applied during install (V2 and V3) when matching incoming
resources against existing ones in the desti

`GET /v1/blueprint-manifest/uniqueness-criteria`

```ts
const { data } = await client.listUniquenessCriteria()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getUniquenessCriteria({
  resource_type: 'example',
})
```

<details>
<summary>Response</summary>

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
must be valid attributes on the resource's schema (the UI typically loads the
schema to populate options). All listed fi

`PUT /v1/blueprint-manifest/uniqueness-criteria/{resource_type}`

```ts
const { data } = await client.putUniquenessCriteria(
  {
    resource_type: 'example',
  },
  {
    fields: ['string'],
    propagated_to: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteUniquenessCriteria({
  resource_type: 'example',
})
```

---

## Schemas

### `UniquenessCriteriaResourceType`

Resource type for which custom uniqueness criteria can be configured.

```ts
type UniquenessCriteriaResourceType = "emailtemplate" | "product" | "price" | "tax" | "coupon" | "product_recommendation" | "file" | "document_template" | "notification_template" | "journey"
```

### `UniquenessCriteria`

```ts
type UniquenessCriteria = {
  org_id: string
  resource_type: "emailtemplate" | "product" | "price" | "tax" | "coupon" | "product_recommendation" | "file" | "document_template" | "notification_template" | "journey"
  fields: string[]
  propagated_to?: string[]
  updated_at: string // date-time
  updated_by?: string
}
```

### `LineageEntry`

```ts
type LineageEntry = {
  lineage_id?: string
  target_id?: string
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  blueprint_instance_ids?: string[]
  fidelity?: "full" | "partial"
  last_synced_at?: string // date-time
}
```

### `BlueprintNote`

A single internal note on a blueprint.

```ts
type BlueprintNote = {
  id: string
  text: string
  created_at: string // date-time
  updated_at?: string // date-time
  created_by?: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
}
```

### `SuggestBlueprintResourcesRequest`

```ts
type SuggestBlueprintResourcesRequest = {
  prompt: string
  blueprint_id?: string
}
```

### `SuggestBlueprintResourcesResponse`

```ts
type SuggestBlueprintResourcesResponse = {
  resources: Array<{
    id: string
    name?: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored" | "error"[]
    impact_on_install_reason?: string[]
    impact_on_install_changes?: Array<{
      path: { ... }
      destination?: { ... }
      source?: { ... }
      added: { ... }
    }>
    impact_on_install_labels?: Record<string, string>
    impact_on_install_summary?: string[]
  }>
  suggested_blueprint_name?: string
  explanation?: string
  add_dependencies_recommended?: boolean
}
```

### `SkippedBlueprintResource`

A resource that was requested (or discovered as a dependency) but was not
added to the Blueprint. Reasons are stable machine-readable codes.


```ts
type SkippedBlueprintResource = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  reason: "not_found" | "source_validation_failed" | "enrichment_failed"
}
```

### `BlueprintResource`

```ts
type BlueprintResource = {
  id: string
  name?: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  address?: string
  is_root?: boolean
  is_ready?: boolean
  is_hidden?: boolean
  is_disabled?: boolean
  hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"[]
  parent_resource_ids?: string[]
  depends_on_addresses?: string[]
  impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored" | "error"[]
  impact_on_install_reason?: string[]
  impact_on_install_changes?: Array<{
    path: string
    destination?: unknown
    source?: unknown
    added: boolean
  }>
  impact_on_install_labels?: Record<string, string>
  impact_on_install_summary?: string[]
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
  sync_engine?: "terraform" | "v3"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"[]
    parent_resource_ids?: string[]
    depends_on_addresses?: string[]
    impact_on_install?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored" | "error"[]
    impact_on_install_reason?: string[]
    impact_on_install_changes?: Array<{
      path: { ... }
      destination?: { ... }
      source?: { ... }
      added: { ... }
    }>
    impact_on_install_labels?: Record<string, string>
    impact_on_install_summary?: string[]
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  // ...
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
  notes?: Array<{
    id: string
    text: string
    created_at: string // date-time
    updated_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
  }>
  version?: string
  deployments?: Array<{
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    job_id?: string
    triggered_at?: string // date-time
    performed_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    note?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    merge_plan_id?: string
    merge_snapshot_id?: string
    snapshot_restore_available?: boolean
    merge_plan_state?: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
    revert_until?: string // date-time
    restore_details?: {
      has_revertible_changes?: { ... }
      resource_impact_summary?: { ... }
      last_restore_job_id?: { ... }
      last_restore_at?: { ... }
      last_restored_by?: { ... }
      status?: { ... }
    }
    has_revertible_changes?: boolean
    last_restore_job_id?: string
    restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable"
  }>
  is_verified?: boolean
  latest_verification?: {
    job_id?: string
    status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
    triggered_at?: string // date-time
    source_org_id?: string
    source_blueprint_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    installation_job_id?: string
    sync_engine?: "terraform" | "v3"
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
  active_restore_job_id?: string
  active_restore_started_at?: string // date-time
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
  job_type?: "export"
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
  job_type?: "install"
  source_blueprint_id?: string
  source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app"
  source_org_id?: string
  source_blueprint_file?: string
  destination_blueprint_id?: string
  destination_org_id?: string
  slug?: string
  sync_engine?: "terraform" | "v3"
  resource_progress?: Array<{
    lineage_id: string
    type: string
    address: string
    name?: string
    status: "pending" | "in_progress" | "done" | "failed" | "skipped"
    target_id?: string
    error_message?: string
    error_code?: string
    error_data?: Record<string, unknown>
  }>
  options?: {
    resources_to_ignore?: string[]
    sync_notes?: boolean
    include_field_diffs?: boolean
  }
  merge_plan_id?: string
  wait_kind?: "plan" | "reauth" | "merge_review"
  prefill_from_merge_plan_id?: string
  assigned_merge_plan_id?: string
  status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
}
```

### `BulkInstallStatus`

Aggregate status for a bulk install or one of its targets.
- `QUEUED`: not started yet
- `IN_PROGRESS`: at least one target queued/in-progress, not all done
- `SUCCESS`: all targets succeeded
- `PARTIAL_SUCCESS`: all targets terminal with a mix of success/partial/failure
- `FAILED`: all targets term

```ts
type BulkInstallStatus = "QUEUED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "REVIEW_REQUIRED"
```

### `BulkInstallCounts`

Tally of target rows by status. Recomputed from target rows on each transition.

```ts
type BulkInstallCounts = {
  queued?: number
  in_progress?: number
  success?: number
  partial_success?: number
  failed?: number
  review_required?: number
}
```

### `BulkInstall`

Bulk install parent. Never carries target auth tokens.

```ts
type BulkInstall = {
  bulk_job_id?: string
  source_org_id?: string
  source_blueprint_id?: string
  status?: "QUEUED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "REVIEW_REQUIRED"
  target_count?: number
  max_concurrency?: number
  counts?: {
    queued?: number
    in_progress?: number
    success?: number
    partial_success?: number
    failed?: number
    review_required?: number
  }
  slug?: string
  options?: {
    resources_to_ignore?: string[]
    sync_notes?: boolean
    include_field_diffs?: boolean
  }
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `BulkInstallTarget`

A single destination of a bulk install. `job` is the hydrated latest child
install job derived from `job_ids.at(-1)`. Auth tokens are never stored or returned.


```ts
type BulkInstallTarget = {
  bulk_job_id?: string
  destination_org_id?: string
  destination_blueprint_id?: string
  status?: "QUEUED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "REVIEW_REQUIRED"
  job_ids?: string[]
  merge_plan_id?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  job?: {
    id?: string
    events?: Array<{
      timestamp?: { ... }
      message?: { ... }
      errors?: { ... }
      level?: { ... }
      data?: { ... }
    }>
    triggered_at?: string // date-time
    created_by?: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    job_type?: "install"
    source_blueprint_id?: string
    source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app"
    source_org_id?: string
    source_blueprint_file?: string
    destination_blueprint_id?: string
    destination_org_id?: string
    slug?: string
    sync_engine?: "terraform" | "v3"
    resource_progress?: Array<{
      lineage_id: { ... }
      type: { ... }
      address: { ... }
      name?: { ... }
      status: { ... }
      target_id?: { ... }
      error_message?: { ... }
      error_code?: { ... }
      error_data?: { ... }
    }>
    options?: {
      resources_to_ignore?: { ... }
      sync_notes?: { ... }
      include_field_diffs?: { ... }
    }
    merge_plan_id?: string
    wait_kind?: "plan" | "reauth" | "merge_review"
    prefill_from_merge_plan_id?: string
    assigned_merge_plan_id?: string
    status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  }
}
```

### `BulkInstallTargetList`

```ts
type BulkInstallTargetList = {
  results?: Array<{
    bulk_job_id?: string
    destination_org_id?: string
    destination_blueprint_id?: string
    status?: "QUEUED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "REVIEW_REQUIRED"
    job_ids?: string[]
    merge_plan_id?: string
    created_at?: string // date-time
    updated_at?: string // date-time
    job?: {
      id?: { ... }
      events?: { ... }
      triggered_at?: { ... }
      created_by?: { ... }
      job_type?: { ... }
      source_blueprint_id?: { ... }
      source_blueprint_type?: { ... }
      source_org_id?: { ... }
      source_blueprint_file?: { ... }
      destination_blueprint_id?: { ... }
      destination_org_id?: { ... }
      slug?: { ... }
      sync_engine?: { ... }
      resource_progress?: { ... }
      options?: { ... }
      merge_plan_id?: { ... }
      wait_kind?: { ... }
      prefill_from_merge_plan_id?: { ... }
      assigned_merge_plan_id?: { ... }
      status?: { ... }
    }
  }>
  next_cursor?: string
}
```

### `BulkInstallTargetInput`

```ts
type BulkInstallTargetInput = {
  destination_org_id: string
  destination_blueprint_id?: string
  destination_auth_token: string
}
```

### `BulkInstallCreateRequest`

```ts
type BulkInstallCreateRequest = {
  source_org_id?: string
  source_blueprint_id: string
  max_concurrency?: number
  slug?: string
  options?: {
    resources_to_ignore?: string[]
    sync_notes?: boolean
    include_field_diffs?: boolean
  }
  targets: Array<{
    destination_org_id: string
    destination_blueprint_id?: string
    destination_auth_token: string
  }>
}
```

### `BlueprintRestoreJob`

```ts
type BlueprintRestoreJob = {
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
  job_type?: "restore"
  destination_blueprint_id?: string
  destination_org_id?: string
  install_job_id?: string
  merge_plan_id?: string
  snapshot_id?: string
  sync_engine?: "v3"
  status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  restore_result?: {
    snapshot_id?: string
    resources?: Array<{
      lineage_id: { ... }
      type: { ... }
      name?: { ... }
      target_id?: { ... }
      action: { ... }
      reason?: { ... }
      last_synced_at?: { ... }
      current_updated_at?: { ... }
      error_message?: { ... }
      is_hidden?: { ... }
      co_owned_by?: { ... }
      protected_by?: { ... }
    }>
    has_effective_changes?: boolean
  }
}
```

### `V3ResourceProgressEntry`

```ts
type V3ResourceProgressEntry = {
  lineage_id: string
  type: string
  address: string
  name?: string
  status: "pending" | "in_progress" | "done" | "failed" | "skipped"
  target_id?: string
  error_message?: string
  error_code?: string
  error_data?: Record<string, unknown>
}
```

### `RestoreOutcomeItem`

```ts
type RestoreOutcomeItem = {
  lineage_id: string
  type: string
  name?: string
  target_id?: string
  action: "restore" | "delete" | "skip" | "failed"
  reason?: "modified" | "delete_unsupported" | "heuristic_match" | "co_owned" | "dependency_protected" | "already_deleted" | "non_revertible" | "not_created_by_install" | "unconfirmed" | "unknown_provenance"
  last_synced_at?: string // date-time
  current_updated_at?: string // date-time
  error_message?: string
  is_hidden?: boolean
  co_owned_by?: Array<{
    blueprint_id: string
    title?: string
  }>
  protected_by?: Array<{
    lineage_id: string
    type: string
    target_id?: string
  }>
}
```

### `HealthFinding`

```ts
type HealthFinding = {
  check_id: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "catalog_hygiene" | "spec_conformance"
  code: "missing_in_destination" | "fetch_error" | "no_readback" | "unreplaced_source_reference" | "broken_internal_reference" | "dropped_at_install" | "orphaned_group_reference" | "uuid_group_label" | "unreachable_attribute_purpose" | "duplicate_attribute_name" | "duplicate_headline" | "broken_mapping_reference" | "stale_mapping_version" | "mapping_slot_mismatch" | "mapping_parity_mismatch" | "stale_lineage" | "broken_trigger_reference" | "broken_action_reference" | "broken_workflow_step" | "invalid_mapping_target" | "invalid_mapping_source" | "invalid_mapping_version" | "unknown_mapping_attribute" | "workflow_edge_limit" | "dead_purpose_reference" | "broken_portal_reference" | "orphaned_portal_block" | "broken_closing_reason" | "broken_journey_settings" | "unresolved_assignee" | "current_write_invalid" | "duplicate_live_resource" | "missing_file_content" | "file_etag_mismatch" | "incomplete_webhook" | "broken_template_reference" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "cross_org_reference"
  severity: "error" | "warning" | "info"
  resource_type: string
  lineage_id: string
  target_id?: string
  resource_name?: string
  message: string
  verdict?: string
  evidence?: {
    path?: string
    referenced_id?: string
    referenced_type?: string
    referenced_name?: string
    referenced_lineage_id?: string
    expected_target_id?: string
    reference_kind?: string
    operation?: string
    rejection_reason?: string
    error_message?: string
    response_status?: number
  }
}
```

### `HealthCheckCoverage`

```ts
type HealthCheckCoverage = {
  check_id: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "spec_conformance"
  status: "completed" | "partial" | "skipped" | "not_applicable"
  scope: "tracked_resources" | "org_wide" | "source_comparison"
  resources_considered: number
  details: string[]
}
```

### `HealthResourceTypeCoverage`

```ts
type HealthResourceTypeCoverage = {
  resource_type: string
  tracked: number
  readable_by_lineage: number
  missing_by_lineage: number
  read_errors: number
  unchecked: number
  specialized_checks: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "spec_conformance"[]
  known_blind_spots: string[]
}
```

### `HealthScanCoverage`

```ts
type HealthScanCoverage = {
  checks: Array<{
    check_id: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "spec_conformance"
    status: "completed" | "partial" | "skipped" | "not_applicable"
    scope: "tracked_resources" | "org_wide" | "source_comparison"
    resources_considered: number
    details: string[]
  }>
  resource_types: Array<{
    resource_type: string
    tracked: number
    readable_by_lineage: number
    missing_by_lineage: number
    read_errors: number
    unchecked: number
    specialized_checks: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "spec_conformance"[]
    known_blind_spots: string[]
  }>
}
```

### `DeploymentHealthReport`

```ts
type DeploymentHealthReport = {
  status: "running" | "completed" | "failed"
  job_id: string
  blueprint_instance_id: string
  destination_org_id: string
  generated_at: string // date-time
  html_url?: string
  summary?: {
    resources_scanned?: number
    unchecked?: number
    errors?: number
    warnings?: number
    infos?: number
  }
  findings?: Array<{
    check_id: "live_readability" | "referential_integrity" | "install_completeness" | "schema_consistency" | "mapping_integrity" | "execution_readiness" | "catalog_hygiene" | "spec_conformance"
    code: "missing_in_destination" | "fetch_error" | "no_readback" | "unreplaced_source_reference" | "broken_internal_reference" | "dropped_at_install" | "orphaned_group_reference" | "uuid_group_label" | "unreachable_attribute_purpose" | "duplicate_attribute_name" | "duplicate_headline" | "broken_mapping_reference" | "stale_mapping_version" | "mapping_slot_mismatch" | "mapping_parity_mismatch" | "stale_lineage" | "broken_trigger_reference" | "broken_action_reference" | "broken_workflow_step" | "invalid_mapping_target" | "invalid_mapping_source" | "invalid_mapping_version" | "unknown_mapping_attribute" | "workflow_edge_limit" | "dead_purpose_reference" | "broken_portal_reference" | "orphaned_portal_block" | "broken_closing_reason" | "broken_journey_settings" | "unresolved_assignee" | "current_write_invalid" | "duplicate_live_resource" | "missing_file_content" | "file_etag_mismatch" | "incomplete_webhook" | "broken_template_reference" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "cross_org_reference"
    severity: "error" | "warning" | "info"
    resource_type: string
    lineage_id: string
    target_id?: string
    resource_name?: string
    message: string
    verdict?: string
    evidence?: {
      path?: { ... }
      referenced_id?: { ... }
      referenced_type?: { ... }
      referenced_name?: { ... }
      referenced_lineage_id?: { ... }
      expected_target_id?: { ... }
      reference_kind?: { ... }
      operation?: { ... }
      rejection_reason?: { ... }
      error_message?: { ... }
      response_status?: { ... }
    }
  }>
  coverage?: {
    checks: Array<{
      check_id: { ... }
      status: { ... }
      scope: { ... }
      resources_considered: { ... }
      details: { ... }
    }>
    resource_types: Array<{
      resource_type: { ... }
      tracked: { ... }
      readable_by_lineage: { ... }
      missing_by_lineage: { ... }
      read_errors: { ... }
      unchecked: { ... }
      specialized_checks: { ... }
      known_blind_spots: { ... }
    }>
  }
  error?: string
}
```

### `RestoreOutcome`

```ts
type RestoreOutcome = {
  snapshot_id?: string
  resources?: Array<{
    lineage_id: string
    type: string
    name?: string
    target_id?: string
    action: "restore" | "delete" | "skip" | "failed"
    reason?: "modified" | "delete_unsupported" | "heuristic_match" | "co_owned" | "dependency_protected" | "already_deleted" | "non_revertible" | "not_created_by_install" | "unconfirmed" | "unknown_provenance"
    last_synced_at?: string // date-time
    current_updated_at?: string // date-time
    error_message?: string
    is_hidden?: boolean
    co_owned_by?: Array<{
      blueprint_id: { ... }
      title?: { ... }
    }>
    protected_by?: Array<{
      lineage_id: { ... }
      type: { ... }
      target_id?: { ... }
    }>
  }>
  has_effective_changes?: boolean
}
```

### `RestorePreviewReport`

```ts
type RestorePreviewReport = {
  preview_id: string
  job_id: string
  status: "running" | "completed" | "failed"
  requested_at: string // date-time
  completed_at?: string // date-time
  outcome?: {
    snapshot_id?: string
    resources?: Array<{
      lineage_id: { ... }
      type: { ... }
      name?: { ... }
      target_id?: { ... }
      action: { ... }
      reason?: { ... }
      last_synced_at?: { ... }
      current_updated_at?: { ... }
      error_message?: { ... }
      is_hidden?: { ... }
      co_owned_by?: { ... }
      protected_by?: { ... }
    }>
    has_effective_changes?: boolean
  }
  error?: string
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
  job_type?: "export"
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
  job_type?: "install"
  source_blueprint_id?: string
  source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app"
  source_org_id?: string
  source_blueprint_file?: string
  destination_blueprint_id?: string
  destination_org_id?: string
  slug?: string
  sync_engine?: "terraform" | "v3"
  resource_progress?: Array<{
    lineage_id: string
    type: string
    address: string
    name?: string
    status: "pending" | "in_progress" | "done" | "failed" | "skipped"
    target_id?: string
    error_message?: string
    error_code?: string
    error_data?: Record<string, unknown>
  }>
  options?: {
    resources_to_ignore?: string[]
    sync_notes?: boolean
    include_field_diffs?: boolean
  }
  merge_plan_id?: string
  wait_kind?: "plan" | "reauth" | "merge_review"
  prefill_from_merge_plan_id?: string
  assigned_merge_plan_id?: string
  status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
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
  job_type?: "dependencies_sync"
  blueprint_id?: string
  status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED"
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
  job_type?: "verification"
  source_org_id?: string
  source_blueprint_id?: string
  destination_org_id?: string
  destination_blueprint_id?: string
  installation_job_id?: string
  sync_engine?: "terraform" | "v3"
  status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  summary?: {
    total_resources?: number
    matched?: number
    mismatched?: number
    missing_in_destination?: number
    fetch_errors?: number
  }
  resource_results?: Array<{
    resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
    resource_name?: string
    source_resource_id?: string
    source_resource_address?: string
    destination_resource_id?: string
    destination_resource_address?: string
    status?: "matched" | "mismatched" | "missing_in_destination" | "fetch_error"
    failure_context?: "depends_on_failed_resource" | "may_be_caused_by_failed_dependency"
    failed_dependency_resource_ids?: string[]
    failed_dependency_resource_names?: string[]
    failed_dependency_addresses?: string[]
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
  status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  triggered_at?: string // date-time
  source_org_id?: string
  source_blueprint_id?: string
  destination_org_id?: string
  destination_blueprint_id?: string
  installation_job_id?: string
  sync_engine?: "terraform" | "v3"
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
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  resource_name?: string
  source_resource_id?: string
  source_resource_address?: string
  destination_resource_id?: string
  destination_resource_address?: string
  status?: "matched" | "mismatched" | "missing_in_destination" | "fetch_error"
  failure_context?: "depends_on_failed_resource" | "may_be_caused_by_failed_dependency"
  failed_dependency_resource_ids?: string[]
  failed_dependency_resource_names?: string[]
  failed_dependency_addresses?: string[]
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
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference"
    data?: {
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
      current?: { ... }
      max_allowed?: { ... }
      planned?: { ... }
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
  sync_notes?: boolean
  include_field_diffs?: boolean
}
```

### `ContinueInstallationJobRequest`

```ts
type ContinueInstallationJobRequest = {
  resources_to_ignore?: string[]
  sync_notes?: boolean
  include_field_diffs?: boolean
  source_auth_token?: string // password
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
    job_status?: "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
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
type JobStatus = "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
```

### `ResourceNodeType`

Type of the resource

```ts
type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
```

### `PlanChanges`

```ts
type PlanChanges = "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
```

### `CommonResourceNode`

```ts
type CommonResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  name?: string
  source_id?: string
  is_virtual?: boolean
}
```

### `RootResourceNode`

```ts
type RootResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  name?: string
  source_id?: string
  is_virtual?: true
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
  }>
  changes?: "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
  changes_reason?: string[]
}
```

### `Job`

```ts
type Job = {
  job_id?: string
  job_status?: "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "REAUTH_REQUIRED" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED"
  manifest_file_path?: string
  message?: string
  timestamp?: string // date-time
  plan_file_content?: string
  resources_to_export?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference"
    data?: {
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
      current?: { ... }
      max_allowed?: { ... }
      planned?: { ... }
    }
  }>
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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
type FormattedErrorCodes = "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference"
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
  code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference"
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
    current?: number
    max_allowed?: number
    planned?: number
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox"
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

### `MergePlanState`

Lifecycle state of an update merge plan.

```ts
type MergePlanState = "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
```

### `MergeOptionId`

```ts
type MergeOptionId = "keep_current" | "take_incoming" | "keep_absent" | "restore_incoming"
```

### `MergeChoice`

The reviewer's choice for one decision group. Valid only while `group_signature` matches.

```ts
type MergeChoice = {
  group_id: string
  group_signature: string
  option_id: "keep_current" | "take_incoming" | "keep_absent" | "restore_incoming"
}
```

### `MergeChoiceInput`

A submitted choice. `option_id` is not an enum here, so an option the group does not offer is answered with 422 `merge_plan_choice_invalid` and its `group_ids`, like every other invalid choice.

```ts
type MergeChoiceInput = {
  group_id: string
  group_signature: string
  option_id: string
}
```

### `MergeSectionRef`

```ts
type MergeSectionRef = {
  resource_lineage_id: string
  section_id: string
  item_path?: Array<{
    section_id: string
    item_key: string
  }>
}
```

### `MergeSectionValue`

A unit value in builder terms. `present` false means the unit does not exist on that side.

```ts
type MergeSectionValue = {
  present: boolean
  value?: unknown
}
```

### `MergeDecisionGroup`

```ts
type MergeDecisionGroup = {
  group_id: string
  group_signature: string
  kind: "conflict" | "mandatory" | "confirm"
  scope: "units" | "order" | "resource"
  section_refs: Array<{
    resource_lineage_id: string
    section_id: string
    item_path?: Array<{
      section_id: { ... }
      item_key: { ... }
    }>
  }>
  ui_concept: string
  label_key: string
  values: Array<{
    section_ref: {
      resource_lineage_id: { ... }
      section_id: { ... }
      item_path?: { ... }
    }
    label: string
    base: {
      present: { ... }
      value?: { ... }
    }
    current: {
      present: { ... }
      value?: { ... }
    }
    incoming: {
      present: { ... }
      value?: { ... }
    }
  }>
  options: Array<{
    option_id: "keep_current" | "take_incoming" | "keep_absent" | "restore_incoming"
    label_key: string
    description_key: string
  }>
  selection_required: boolean
  selected_option_id?: "keep_current" | "take_incoming" | "keep_absent" | "restore_incoming"
  mandatory_declaration_ids: string[]
  batch_key?: string
  sequence_labels?: {
    base?: string[]
    current: string[]
    incoming: string[]
  }
}
```

### `MergePlanWarning`

A finding of the merged result that does not block the update.

```ts
type MergePlanWarning = {
  code: string
  target: string
  unit_key?: string
  level?: "warning"
  message: string
}
```

### `MergeBaseProvenance`

```ts
type MergeBaseProvenance = {
  rung: "apply_evidence" | "none"
  job_id?: string
  manifest_version?: string
  reason?: "no_evidence" | "unreconciled" | "no_manifest" | "not_in_manifest" | "translation_gap"
}
```

### `MergeResourceStatus`

```ts
type MergeResourceStatus = "automatic" | "decisions_required" | "ready" | "blocked"
```

### `MergeResourceEligibility`

```ts
type MergeResourceEligibility = "merge" | "two_way" | "blocked" | "automatic_keep_absent" | "absence_decision"
```

### `MergeResourceAutoCounts`

```ts
type MergeResourceAutoCounts = {
  from_current: number
  from_incoming: number
}
```

### `MergePlanReview`

Summary of an update merge plan.

```ts
type MergePlanReview = {
  merge_plan_id: string
  plan_revision: number
  expected_plan_revision: number
  warnings: Array<{
    code: string
    resource_key: string
    target: string
    message: string
  }>
  blocked_reasons: string[]
  apply_counts: {
    updated: number
    kept: number
    removed: number
    restored: number
  }
  apply_counts_unknown?: boolean
  state: "review_required" | "ready" | "approved" | "applying" | "applied" | "partially_applied" | "failed" | "discarded" | "expired" | "superseded" | "reverting" | "reverted" | "revert_partial"
  job_id: string
  destination_blueprint_id: string
  source: {
    blueprint_id?: string
    version?: string
  }
  resource_counts: {
    automatic: number
    decisions_required: number
    ready: number
    blocked: number
  }
  group_counts: {
    conflict: number
    confirm: number
    mandatory: number
    unresolved: number
  }
  warning_count: number
  auto_counts: {
    kept_customizations: number
    applied_updates: number
  }
  other_resource_count: number
  created_at: string // date-time
  expires_at: string // date-time
  revert_until: string // date-time
  supersedes?: string
  superseded_by?: string
  successor_failed?: boolean
}
```

### `MergePlanApplyCounts`

Journeys by what apply does with the current choices: `updated` (written), `kept` (blocked, left as they are), `removed` (stay removed), `restored` (created again).

```ts
type MergePlanApplyCounts = {
  updated: number
  kept: number
  removed: number
  restored: number
}
```

### `MergeResourceOutcome`

Result of one journey after apply.

```ts
type MergeResourceOutcome = "applied" | "kept_removed" | "restored" | "merge_stale" | "failed"
```

### `MergePlanResourceSummary`

```ts
type MergePlanResourceSummary = {
  resource_key: string
  label: string
  status: "automatic" | "decisions_required" | "ready" | "blocked"
  eligibility: "merge" | "two_way" | "blocked" | "automatic_keep_absent" | "absence_decision"
  blocking_reasons: string[]
  auto_counts: {
    from_current: number
    from_incoming: number
  }
  unresolved: number
  warning_count: number
  outcome?: "applied" | "kept_removed" | "restored" | "merge_stale" | "failed"
}
```

### `MergePlanResourcePage`

```ts
type MergePlanResourcePage = {
  merge_plan_id: string
  plan_revision: number
  resources: Array<{
    resource_key: string
    label: string
    status: "automatic" | "decisions_required" | "ready" | "blocked"
    eligibility: "merge" | "two_way" | "blocked" | "automatic_keep_absent" | "absence_decision"
    blocking_reasons: string[]
    auto_counts: {
      from_current: { ... }
      from_incoming: { ... }
    }
    unresolved: number
    warning_count: number
    outcome?: "applied" | "kept_removed" | "restored" | "merge_stale" | "failed"
  }>
  next_cursor?: string
}
```

### `MergePlanResourceDetail`

```ts
type MergePlanResourceDetail = {
  resource_key: string
  resource_type: "journey"
  lineage_id: string
  target_id: string
  label: string
  model_version: string
  base_provenance: {
    rung: "apply_evidence" | "none"
    job_id?: string
    manifest_version?: string
    reason?: "no_evidence" | "unreconciled" | "no_manifest" | "not_in_manifest" | "translation_gap"
  }
  eligibility: "merge" | "two_way" | "blocked" | "automatic_keep_absent" | "absence_decision"
  fast_path: boolean
  auto_counts: {
    from_current: number
    from_incoming: number
  }
  decision_groups: Array<{
    group_id: string
    group_signature: string
    kind: "conflict" | "mandatory" | "confirm"
    scope: "units" | "order" | "resource"
    section_refs: Array<{
      resource_lineage_id: { ... }
      section_id: { ... }
      item_path?: { ... }
    }>
    ui_concept: string
    label_key: string
    values: Array<{
      section_ref: { ... }
      label: { ... }
      base: { ... }
      current: { ... }
      incoming: { ... }
    }>
    options: Array<{
      option_id: { ... }
      label_key: { ... }
      description_key: { ... }
    }>
    selection_required: boolean
    selected_option_id?: "keep_current" | "take_incoming" | "keep_absent" | "restore_incoming"
    mandatory_declaration_ids: string[]
    batch_key?: string
    sequence_labels?: {
      base?: { ... }
      current: { ... }
      incoming: { ... }
    }
  }>
  warnings: Array<{
    code: string
    target: string
    unit_key?: string
    level?: "warning"
    message: string
  }>
  status: "automatic" | "decisions_required" | "ready" | "blocked"
  blocking_reasons: string[]
  outcome?: "applied" | "kept_removed" | "restored" | "merge_stale" | "failed"
}
```

### `MergePlanResourceReview`

```ts
type MergePlanResourceReview = {
  merge_plan_id: string
  plan_revision: number
  resource: {
    resource_key: string
    resource_type: "journey"
    lineage_id: string
    target_id: string
    label: string
    model_version: string
    base_provenance: {
      rung: { ... }
      job_id?: { ... }
      manifest_version?: { ... }
      reason?: { ... }
    }
    eligibility: "merge" | "two_way" | "blocked" | "automatic_keep_absent" | "absence_decision"
    fast_path: boolean
    auto_counts: {
      from_current: { ... }
      from_incoming: { ... }
    }
    decision_groups: Array<{
      group_id: { ... }
      group_signature: { ... }
      kind: { ... }
      scope: { ... }
      section_refs: { ... }
      ui_concept: { ... }
      label_key: { ... }
      values: { ... }
      options: { ... }
      selection_required: { ... }
      selected_option_id?: { ... }
      mandatory_declaration_ids: { ... }
      batch_key?: { ... }
      sequence_labels?: { ... }
    }>
    warnings: Array<{
      code: { ... }
      target: { ... }
      unit_key?: { ... }
      level?: { ... }
      message: { ... }
    }>
    status: "automatic" | "decisions_required" | "ready" | "blocked"
    blocking_reasons: string[]
    outcome?: "applied" | "kept_removed" | "restored" | "merge_stale" | "failed"
  }
}
```

### `MergePlanResolutionsUpdate`

```ts
type MergePlanResolutionsUpdate = {
  expected_plan_revision: number
  resolutions: Array<{
    group_id: string
    group_signature: string
    option_id: string
  }>
}
```

### `MergePlanApplyRequest`

```ts
type MergePlanApplyRequest = {
  expected_plan_revision: number
  idempotency_key: string
}
```

### `MergePlanRevisionRequest`

Body of discard and refresh requests.

```ts
type MergePlanRevisionRequest = {
  expected_plan_revision: number
}
```

### `MergePlanReplanResult`

```ts
type MergePlanReplanResult = {
  merge_plan_id: string
  job_id: string
}
```

### `MergeRevertEntry`

```ts
type MergeRevertEntry = {
  resource_key: string
  lineage_id: string
  label: string
  resource_type: string
  category: "unchanged" | "changed_since_update" | "created_by_update" | "metadata_only" | "not_restorable"
  default_action: "restore" | "keep"
  requires_choice: boolean
}
```

### `MergeRevertPreview`

```ts
type MergeRevertPreview = {
  revert_preview_id: string
  preview_revision: number
  merge_plan_id: string
  entries: Array<{
    resource_key: string
    lineage_id: string
    label: string
    resource_type: string
    category: "unchanged" | "changed_since_update" | "created_by_update" | "metadata_only" | "not_restorable"
    default_action: "restore" | "keep"
    requires_choice: boolean
  }>
}
```

### `MergeRevertSelection`

```ts
type MergeRevertSelection = {
  resource_key: string
  action: "restore" | "keep"
}
```

### `MergeRevertRequest`

```ts
type MergeRevertRequest = {
  revert_preview_id: string
  expected_preview_revision: number
  idempotency_key: string
  selections: Array<{
    resource_key: string
    action: "restore" | "keep"
  }>
  session_credentials?: {
    refresh_token: string // password
    client_id: string
    pipeline_id?: string
  }
}
```

### `MergeRevertResult`

```ts
type MergeRevertResult = {
  job_id: string
}
```

### `MergePlanError`

```ts
type MergePlanError = {
  status: number
  error: string
  group_ids?: string[]
  action?: "replan"
  merge_plan_id?: string
  retry_after?: number
  resource_keys?: string[]
}
```
