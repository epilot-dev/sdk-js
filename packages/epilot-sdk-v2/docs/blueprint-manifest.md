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
- [`listBlueprintTestCases`](#listblueprinttestcases)
- [`createBlueprintTestCase`](#createblueprinttestcase)
- [`getBlueprintTestCase`](#getblueprinttestcase)
- [`updateBlueprintTestCase`](#updateblueprinttestcase)
- [`deleteBlueprintTestCase`](#deleteblueprinttestcase)
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
- [`sendBlueprintAssistantMessage`](#sendblueprintassistantmessage)
- [`listBlueprintAssistantConversations`](#listblueprintassistantconversations)
- [`getBlueprintAssistantConversation`](#getblueprintassistantconversation)
- [`listBlueprintAssistantSkills`](#listblueprintassistantskills)
- [`uploadBlueprintAssistantSkill`](#uploadblueprintassistantskill)
- [`getBlueprintAssistantSkill`](#getblueprintassistantskill)
- [`updateBlueprintAssistantSkill`](#updateblueprintassistantskill)
- [`deleteBlueprintAssistantSkill`](#deleteblueprintassistantskill)
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
- [`getSourceTestOperation`](#getsourcetestoperation)
- [`createSourceConfirmedRun`](#createsourceconfirmedrun)
- [`createBlueprintTestRun`](#createblueprinttestrun)
- [`listBlueprintTestRuns`](#listblueprinttestruns)
- [`getBlueprintTestRun`](#getblueprinttestrun)
- [`getBlueprintTestSuite`](#getblueprinttestsuite)
- [`createBlueprintTestSuiteRun`](#createblueprinttestsuiterun)
- [`getBlueprintTestSuiteRun`](#getblueprinttestsuiterun)
- [`createBlueprintGraphSuggestions`](#createblueprintgraphsuggestions)
- [`getBlueprintGraphSuggestions`](#getblueprintgraphsuggestions)
- [`acceptBlueprintGraphSuggestions`](#acceptblueprintgraphsuggestions)
- [`migrateBlueprintV1TestCases`](#migrateblueprintv1testcases)
- [`createBlueprintTestInterpretation`](#createblueprinttestinterpretation)
- [`getBlueprintTestInterpretation`](#getblueprinttestinterpretation)
- [`confirmBlueprintTestInterpretationV2`](#confirmblueprinttestinterpretationv2)

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
- [`BlueprintTestSuiteError`](#blueprinttestsuiteerror)
- [`SentenceParamValue`](#sentenceparamvalue)
- [`Sentence`](#sentence)
- [`ClauseEvidenceView`](#clauseevidenceview)
- [`ClauseResultView`](#clauseresultview)
- [`BlueprintTestUnreadableResource`](#blueprinttestunreadableresource)
- [`SuiteRun`](#suiterun)
- [`CaseResultRow`](#caseresultrow)
- [`BlueprintTestSuiteSummary`](#blueprinttestsuitesummary)
- [`BlueprintTestSuite`](#blueprinttestsuite)
- [`BlueprintTestCaseShape`](#blueprinttestcaseshape)
- [`Suggestion`](#suggestion)
- [`BlueprintGraphSuggestionsStarted`](#blueprintgraphsuggestionsstarted)
- [`BlueprintTestInterpretationInput`](#blueprinttestinterpretationinput)
- [`BlueprintTestInterpretationStarted`](#blueprinttestinterpretationstarted)
- [`BlueprintInterpretedCheck`](#blueprintinterpretedcheck)
- [`BlueprintInterpretedPart`](#blueprintinterpretedpart)
- [`BlueprintInterpretationSpan`](#blueprintinterpretationspan)
- [`BlueprintTestInterpretationResult`](#blueprinttestinterpretationresult)
- [`BlueprintTestInterpretationConfirmInput`](#blueprinttestinterpretationconfirminput)
- [`BlueprintTestInterpretationConfirmation`](#blueprinttestinterpretationconfirmation)
- [`BlueprintTestCaseOrigin`](#blueprinttestcaseorigin)
- [`BlueprintGraphSuggestionPage`](#blueprintgraphsuggestionpage)
- [`BlueprintGraphSuggestionAcceptInput`](#blueprintgraphsuggestionacceptinput)
- [`BlueprintGraphSuggestionAcceptance`](#blueprintgraphsuggestionacceptance)
- [`BlueprintV1TestCaseMigration`](#blueprintv1testcasemigration)
- [`BlueprintTestCaseInput`](#blueprinttestcaseinput)
- [`BlueprintTestCaseUpdate`](#blueprinttestcaseupdate)
- [`BlueprintTestCase`](#blueprinttestcase)
- [`BlueprintTestPredicate`](#blueprinttestpredicate)
- [`BlueprintTestInterpretation`](#blueprinttestinterpretation)
- [`BlueprintTestCatalogEntry`](#blueprinttestcatalogentry)
- [`BlueprintTestInterpretationProposal`](#blueprinttestinterpretationproposal)
- [`BlueprintTestCaseConfirmation`](#blueprinttestcaseconfirmation)
- [`BlueprintTestResourceEvidence`](#blueprinttestresourceevidence)
- [`BlueprintTestCheckResult`](#blueprinttestcheckresult)
- [`BlueprintTestDependencyValidation`](#blueprinttestdependencyvalidation)
- [`BlueprintTestRunResult`](#blueprinttestrunresult)
- [`BlueprintSourceTestOperation`](#blueprintsourcetestoperation)
- [`BlueprintTestRun`](#blueprinttestrun)
- [`BlueprintTestRunPage`](#blueprinttestrunpage)
- [`BlueprintTestRunError`](#blueprinttestrunerror)
- [`BlueprintTestRunInput`](#blueprinttestruninput)
- [`BlueprintTestCasePage`](#blueprinttestcasepage)
- [`BlueprintAssistantMessageRequest`](#blueprintassistantmessagerequest)
- [`BlueprintAssistantConversation`](#blueprintassistantconversation)
- [`BlueprintAssistantSkill`](#blueprintassistantskill)
- [`BlueprintAssistantDefaultSkill`](#blueprintassistantdefaultskill)
- [`BlueprintAssistantSkillUpload`](#blueprintassistantskillupload)
- [`BlueprintAssistantConversationSummary`](#blueprintassistantconversationsummary)
- [`BlueprintAssistantMessage`](#blueprintassistantmessage)
- [`BlueprintAssistantPart`](#blueprintassistantpart)
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
- [`V3SourceResource`](#v3sourceresource)
- [`V3MissingSourceResource`](#v3missingsourceresource)
- [`V3SourceDrift`](#v3sourcedrift)
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
      "source_drift": {},
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
    source_drift: {
      removed: [
        { /* ... */ }
      ],
      missing: [
        { /* ... */ }
      ],
      exclude_addresses: ['string']
    },
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
  "source_drift": {
    "removed": [
      {}
    ],
    "missing": [
      {}
    ],
    "exclude_addresses": ["string"]
  },
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
  "source_drift": {
    "removed": [
      {}
    ],
    "missing": [
      {}
    ],
    "exclude_addresses": ["string"]
  },
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
    source_drift: {
      removed: [
        { /* ... */ }
      ],
      missing: [
        { /* ... */ }
      ],
      exclude_addresses: ['string']
    },
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
  "source_drift": {
    "removed": [
      {}
    ],
    "missing": [
      {}
    ],
    "exclude_addresses": ["string"]
  },
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
  "source_drift": {
    "removed": [
      {}
    ],
    "missing": [
      {}
    ],
    "exclude_addresses": ["string"]
  },
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

### `listBlueprintTestCases`

Author versioned plain-language expectations. Requires the blueprint-test-cases organization feature flag.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases`

```ts
const { data } = await client.listBlueprintTestCases({
  blueprint_id: 'example',
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blueprint_id": "string",
      "org_id": "string",
      "schema_version": 1,
      "revision": 1,
      "title": "string",
      "expectation": "string",
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
      "deleted_at": "1970-01-01T00:00:00.000Z",
      "confirmation": {
        "schema_version": "1",
        "interpretation": {
          "schema_version": "1",
          "clauses": [
            {
              "source_text": "string",
              "status": "supported",
              "assertions": [
                {
                  "operator": "resource_included",
                  "target_key": "string"
                }
              ],
              "reason": "string"
            }
          ]
        },
        "catalog": [
          {
            "key": "string",
            "type": "string",
            "id": "string",
            "label": "string",
            "membership_state": "included",
            "capabilities": ["resource_included"],
            "tasks": [
              {
                "key": "string",
                "label": "string",
                "capabilities": ["workflow_task_required"]
              }
            ]
          }
        ],
        "proposal_hash": "string",
        "expectation_sha256": "string",
        "interpreter_version": "string",
        "confirmed_by": {
          "name": "manifest@epilot.cloud",
          "org_id": "911690",
          "user_id": "11001045",
          "token_id": "api_5ZugdRXasLfWBypHi93Fk"
        },
        "confirmed_at": "1970-01-01T00:00:00.000Z",
        "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      "clauses": [
        {}
      ],
      "clauses_hash": "string",
      "title_key": {},
      "origin": {},
      "needs_reinterpretation": {
        "reason": "string"
      }
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createBlueprintTestCase`

Author versioned plain-language expectations. Requires the blueprint-test-cases organization feature flag.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases`

```ts
const { data } = await client.createBlueprintTestCase(
  {
    blueprint_id: 'example',
  },
  {
    title: 'string',
    expectation: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "org_id": "string",
  "schema_version": 1,
  "revision": 1,
  "title": "string",
  "expectation": "string",
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
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "confirmation": {
    "schema_version": "1",
    "interpretation": {
      "schema_version": "1",
      "clauses": [
        {
          "source_text": "string",
          "status": "supported",
          "assertions": [
            {
              "operator": "resource_included",
              "target_key": "string"
            }
          ],
          "reason": "string"
        }
      ]
    },
    "catalog": [
      {
        "key": "string",
        "type": "string",
        "id": "string",
        "label": "string",
        "membership_state": "included",
        "capabilities": ["resource_included"],
        "tasks": [
          {
            "key": "string",
            "label": "string",
            "capabilities": ["workflow_task_required"]
          }
        ]
      }
    ],
    "proposal_hash": "string",
    "expectation_sha256": "string",
    "interpreter_version": "string",
    "confirmed_by": {
      "name": "manifest@epilot.cloud",
      "org_id": "911690",
      "user_id": "11001045",
      "token_id": "api_5ZugdRXasLfWBypHi93Fk"
    },
    "confirmed_at": "1970-01-01T00:00:00.000Z",
    "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "clauses": [
    {}
  ],
  "clauses_hash": "string",
  "title_key": {},
  "origin": {},
  "needs_reinterpretation": {
    "reason": "string"
  }
}
```

</details>

---

### `getBlueprintTestCase`

Author versioned plain-language expectations. Requires the blueprint-test-cases organization feature flag.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}`

```ts
const { data } = await client.getBlueprintTestCase({
  blueprint_id: 'example',
  test_case_id: 'example',
  revision: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "org_id": "string",
  "schema_version": 1,
  "revision": 1,
  "title": "string",
  "expectation": "string",
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
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "confirmation": {
    "schema_version": "1",
    "interpretation": {
      "schema_version": "1",
      "clauses": [
        {
          "source_text": "string",
          "status": "supported",
          "assertions": [
            {
              "operator": "resource_included",
              "target_key": "string"
            }
          ],
          "reason": "string"
        }
      ]
    },
    "catalog": [
      {
        "key": "string",
        "type": "string",
        "id": "string",
        "label": "string",
        "membership_state": "included",
        "capabilities": ["resource_included"],
        "tasks": [
          {
            "key": "string",
            "label": "string",
            "capabilities": ["workflow_task_required"]
          }
        ]
      }
    ],
    "proposal_hash": "string",
    "expectation_sha256": "string",
    "interpreter_version": "string",
    "confirmed_by": {
      "name": "manifest@epilot.cloud",
      "org_id": "911690",
      "user_id": "11001045",
      "token_id": "api_5ZugdRXasLfWBypHi93Fk"
    },
    "confirmed_at": "1970-01-01T00:00:00.000Z",
    "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "clauses": [
    {}
  ],
  "clauses_hash": "string",
  "title_key": {},
  "origin": {},
  "needs_reinterpretation": {
    "reason": "string"
  }
}
```

</details>

---

### `updateBlueprintTestCase`

Author versioned plain-language expectations. Requires the blueprint-test-cases organization feature flag.

`PUT /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}`

```ts
const { data } = await client.updateBlueprintTestCase(
  {
    blueprint_id: 'example',
    test_case_id: 'example',
  },
  {
    title: 'string',
    expectation: 'string',
    expected_revision: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "blueprint_id": "string",
  "org_id": "string",
  "schema_version": 1,
  "revision": 1,
  "title": "string",
  "expectation": "string",
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
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "confirmation": {
    "schema_version": "1",
    "interpretation": {
      "schema_version": "1",
      "clauses": [
        {
          "source_text": "string",
          "status": "supported",
          "assertions": [
            {
              "operator": "resource_included",
              "target_key": "string"
            }
          ],
          "reason": "string"
        }
      ]
    },
    "catalog": [
      {
        "key": "string",
        "type": "string",
        "id": "string",
        "label": "string",
        "membership_state": "included",
        "capabilities": ["resource_included"],
        "tasks": [
          {
            "key": "string",
            "label": "string",
            "capabilities": ["workflow_task_required"]
          }
        ]
      }
    ],
    "proposal_hash": "string",
    "expectation_sha256": "string",
    "interpreter_version": "string",
    "confirmed_by": {
      "name": "manifest@epilot.cloud",
      "org_id": "911690",
      "user_id": "11001045",
      "token_id": "api_5ZugdRXasLfWBypHi93Fk"
    },
    "confirmed_at": "1970-01-01T00:00:00.000Z",
    "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "clauses": [
    {}
  ],
  "clauses_hash": "string",
  "title_key": {},
  "origin": {},
  "needs_reinterpretation": {
    "reason": "string"
  }
}
```

</details>

---

### `deleteBlueprintTestCase`

Author versioned plain-language expectations. Requires the blueprint-test-cases organization feature flag.

`DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}`

```ts
const { data } = await client.deleteBlueprintTestCase({
  blueprint_id: 'example',
  test_case_id: 'example',
  expected_revision: 1,
})
```

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
        "missing_count": 0,
        "exclude_count": 0,
        "source_drift_s3_key": "string",
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
        "missing_count": 0,
        "exclude_count": 0,
        "source_drift_s3_key": "string",
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
                "missing_count": 0,
                "exclude_count": 0,
                "source_drift_s3_key": "string",
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
            "missing_count": 0,
            "exclude_count": 0,
            "source_drift_s3_key": "string",
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
            "missing_count": 0,
            "exclude_count": 0,
            "source_drift_s3_key": "string",
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
  "source_drift": {
    "removed": [
      {
        "address": "string",
        "type": "designbuilder",
        "name": "string",
        "id": "string"
      }
    ],
    "missing": [
      {
        "address": "string",
        "type": "designbuilder",
        "name": "string",
        "id": "string",
        "referenced_by": ["string"]
      }
    ],
    "exclude_addresses": ["string"]
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
            "missing_count": 0,
            "exclude_count": 0,
            "source_drift_s3_key": "string",
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

### `sendBlueprintAssistantMessage`

Sends a message to the blueprint assistant for a custom blueprint, starting a conversation when
`conversation_id` is omitted. The answer is produced asynchronously: poll
`getBlueprintAssistantConversa

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/assistant/messages`

```ts
const { data } = await client.sendBlueprintAssistantMessage(
  {
    blueprint_id: 'example',
  },
  {
    conversation_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'string',
    retry: true,
    proposal_update: {
      proposal_id: 'string',
      status: 'applied',
      note: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "blueprint_id": "string",
  "status": "IN_PROGRESS",
  "error": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "created_by_name": "string",
  "messages": [
    {
      "id": "string",
      "role": "user",
      "created_at": "1970-01-01T00:00:00.000Z",
      "parts": [
        {
          "type": "text",
          "text": "string",
          "tool_use_id": "string",
          "tool": "string",
          "title": "string",
          "status": "running",
          "result": {
            "kind": "string"
          }
        }
      ]
    }
  ]
}
```

</details>

---

### `listBlueprintAssistantConversations`

The blueprint's blueprint assistant conversations in this organization, most recently updated first
(at most 20). Conversations expire 30 days after their last update.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/assistant/conversations`

```ts
const { data } = await client.listBlueprintAssistantConversations({
  blueprint_id: 'example',
  mine: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "title": "string",
      "status": "IN_PROGRESS",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string",
      "created_by_name": "string",
      "message_count": 0
    }
  ]
}
```

</details>

---

### `getBlueprintAssistantConversation`

A blueprint assistant conversation, including the answer in progress.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/assistant/conversations/{conversation_id}`

```ts
const { data } = await client.getBlueprintAssistantConversation({
  blueprint_id: 'example',
  conversation_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "blueprint_id": "string",
  "status": "IN_PROGRESS",
  "error": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "created_by_name": "string",
  "messages": [
    {
      "id": "string",
      "role": "user",
      "created_at": "1970-01-01T00:00:00.000Z",
      "parts": [
        {
          "type": "text",
          "text": "string",
          "tool_use_id": "string",
          "tool": "string",
          "title": "string",
          "status": "running",
          "result": {
            "kind": "string"
          }
        }
      ]
    }
  ]
}
```

</details>

---

### `listBlueprintAssistantSkills`

The organization's blueprint assistant skills, the skills epilot ships (`defaults`; an organization
skill with the same name replaces one), and the upload limits. Available when `blueprint-ai-assistan

`GET /v2/blueprint-manifest/assistant/skills`

```ts
const { data } = await client.listBlueprintAssistantSkills()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "name": "string",
      "description": "string",
      "enabled": true,
      "files": ["string"],
      "size": 0,
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "updated_by_name": "string"
    }
  ],
  "defaults": [
    {
      "name": "string",
      "description": "string",
      "audience": "publishers"
    }
  ],
  "limits": {}
}
```

</details>

---

### `uploadBlueprintAssistantSkill`

Uploads a skill for the organization's blueprint assistant, replacing the skill of the same name.
The file is a `SKILL.md` or a zip with `SKILL.md` and `references/*.md` (the format claude.ai exports;

`POST /v2/blueprint-manifest/assistant/skills`

```ts
const { data } = await client.uploadBlueprintAssistantSkill(
  null,
  {
    file_name: 'string',
    content_base64: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "description": "string",
  "enabled": true,
  "files": ["string"],
  "size": 0,
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string",
  "updated_by_name": "string",
  "ignored": ["string"]
}
```

</details>

---

### `getBlueprintAssistantSkill`

A skill of the organization with the text of its files.

`GET /v2/blueprint-manifest/assistant/skills/{skill_name}`

```ts
const { data } = await client.getBlueprintAssistantSkill({
  skill_name: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "description": "string",
  "enabled": true,
  "files": ["string"],
  "size": 0,
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string",
  "updated_by_name": "string",
  "contents": {}
}
```

</details>

---

### `updateBlueprintAssistantSkill`

Enables or disables a skill. Conversations keep the skills they started with.

`PATCH /v2/blueprint-manifest/assistant/skills/{skill_name}`

```ts
const { data } = await client.updateBlueprintAssistantSkill(
  {
    skill_name: 'example',
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
  "name": "string",
  "description": "string",
  "enabled": true,
  "files": ["string"],
  "size": 0,
  "updated_at": "1970-01-01T00:00:00.000Z",
  "updated_by": "string",
  "updated_by_name": "string"
}
```

</details>

---

### `deleteBlueprintAssistantSkill`

Deletes a skill. Running conversations that offered it answer that it was removed.

`DELETE /v2/blueprint-manifest/assistant/skills/{skill_name}`

```ts
const { data } = await client.deleteBlueprintAssistantSkill({
  skill_name: 'example',
})
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
      {}
    ],
    "triggered_at": "1970-01-01T00:00:00.000Z",
    "created_by": {
      "name": "manifest@epilot.cloud",
      "org_id": "911690",
      "user_id": "11001045",
      "token_id": "api_5ZugdRXasLfWBypHi93Fk"
    },
    "source_drift": {
      "removed": [],
      "missing": [],
      "exclude_addresses": ["string"]
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
      {}
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

### `getSourceTestOperation`

Read a source-only generation or manual run. Requires the blueprint-test-cases organization feature flag and the original caller's organization.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}/source-operations/{run_id}`

```ts
const { data } = await client.getSourceTestOperation({
  blueprint_id: 'example',
  test_case_id: 'example',
  run_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "operation_kind": "generate",
  "run": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "org_id": "string",
    "blueprint_id": "string",
    "incarnation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "test_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "test_revision": 1,
    "expectation": "string",
    "title": "string",
    "created_by": {
      "name": "manifest@epilot.cloud",
      "org_id": "911690",
      "user_id": "11001045",
      "token_id": "api_5ZugdRXasLfWBypHi93Fk"
    },
    "created_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "status": "queued",
    "confirmation_hash": "string",
    "membership_fingerprint": "string",
    "result": {
      "verdict": "PASSED",
      "checks": [],
      "coverage": {},
      "fingerprints": {},
      "evaluator_version": "1",
      "checked_at": "1970-01-01T00:00:00.000Z",
      "evidence": [],
      "evidence_omitted_count": 0,
      "dependency_validation": {},
      "interpretation_proposal": {},
      "requires_confirmation": true
    },
    "error": {
      "code": "expired"
    },
    "superseded": true,
    "stale": true
  }
}
```

</details>

---

### `createSourceConfirmedRun`

Evaluate previously confirmed checks against the source Blueprint only. Requires the blueprint-test-cases organization feature flag and the original caller's organization.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}/source-confirmed-runs`

```ts
const { data } = await client.createSourceConfirmedRun(
  {
    blueprint_id: 'example',
    test_case_id: 'example',
  },
  {
    expected_revision: 1
  },
)
```

---

### `createBlueprintTestRun`

Run read-only configuration acceptance checks or review their interpretation. Requires the blueprint-test-cases organization feature flag and the original caller's organization.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}/runs`

```ts
const { data } = await client.createBlueprintTestRun(
  {
    blueprint_id: 'example',
    test_case_id: 'example',
  },
  {
    expected_revision: 1
  },
)
```

---

### `listBlueprintTestRuns`

Run read-only configuration acceptance checks or review their interpretation. Requires the blueprint-test-cases organization feature flag and the original caller's organization.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}/runs`

```ts
const { data } = await client.listBlueprintTestRuns({
  blueprint_id: 'example',
  test_case_id: 'example',
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "blueprint_id": "string",
      "incarnation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "test_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "test_revision": 1,
      "expectation": "string",
      "title": "string",
      "created_by": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "status": "queued",
      "confirmation_hash": "string",
      "membership_fingerprint": "string",
      "result": {},
      "error": {},
      "superseded": true,
      "stale": true
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getBlueprintTestRun`

Run read-only configuration acceptance checks or review their interpretation. Requires the blueprint-test-cases organization feature flag and the original caller's organization.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-cases/{test_case_id}/runs/{run_id}`

```ts
const { data } = await client.getBlueprintTestRun({
  blueprint_id: 'example',
  test_case_id: 'example',
  run_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "blueprint_id": "string",
  "incarnation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "test_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "test_revision": 1,
  "expectation": "string",
  "title": "string",
  "created_by": {
    "name": "manifest@epilot.cloud",
    "org_id": "911690",
    "user_id": "11001045",
    "token_id": "api_5ZugdRXasLfWBypHi93Fk"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "status": "queued",
  "confirmation_hash": "string",
  "membership_fingerprint": "string",
  "result": {
    "verdict": "PASSED",
    "checks": [
      {}
    ],
    "coverage": {
      "complete": true,
      "boundaries": [],
      "supported_clauses": 0,
      "total_clauses": 1
    },
    "fingerprints": {},
    "evaluator_version": "1",
    "checked_at": "1970-01-01T00:00:00.000Z",
    "evidence": [
      {}
    ],
    "evidence_omitted_count": 0,
    "dependency_validation": {
      "scope": "related_resources",
      "verdict": "PASSED",
      "checks": [],
      "boundaries": [],
      "omitted_count": 0
    },
    "interpretation_proposal": {
      "schema_version": "1",
      "interpretation": {},
      "catalog": [],
      "proposal_hash": "string",
      "expectation_sha256": "string",
      "interpreter_version": "string",
      "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "requires_confirmation": true
  },
  "error": {
    "code": "expired"
  },
  "superseded": true,
  "stale": true
}
```

</details>

---

### `getBlueprintTestSuite`

The v2 test cases of the blueprint with their current latest suite result (stale results never count as passed) and a summary over all cases. Requires the blueprint-test-cases organization feature fla

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite`

```ts
const { data } = await client.getBlueprintTestSuite({
  blueprint_id: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "cases": [
    {
      "case": {},
      "latest": {}
    }
  ],
  "summary": {
    "passed": 0,
    "failed": 0,
    "cannot_verify": 0,
    "never_run": 0,
    "stale": 0,
    "needs_reinterpretation": 0
  },
  "active_run": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "status": "queued",
    "created_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "digest": "string",
    "unreadable": [
      {}
    ],
    "counts": {
      "passed": 0,
      "failed": 0,
      "cannot_verify": 0,
      "superseded": 0
    },
    "skipped_v1": 0,
    "membership_fingerprint": "string",
    "error": "string"
  },
  "next_cursor": "string"
}
```

</details>

---

### `createBlueprintTestSuiteRun`

Run every v2 test case of the blueprint against one configuration snapshot. Requires the blueprint-test-cases organization feature flag.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/runs`

```ts
const { data } = await client.createBlueprintTestSuiteRun(
  {
    blueprint_id: 'example',
  },
  {},
)
```

---

### `getBlueprintTestSuiteRun`

Read a suite run. Requires the blueprint-test-cases organization feature flag.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/runs/{run_id}`

```ts
const { data } = await client.getBlueprintTestSuiteRun({
  blueprint_id: 'example',
  run_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "queued",
  "created_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "digest": "string",
  "unreadable": [
    {
      "type": "string",
      "id": "string",
      "reason": "string"
    }
  ],
  "counts": {
    "passed": 0,
    "failed": 0,
    "cannot_verify": 0,
    "superseded": 0
  },
  "skipped_v1": 0,
  "membership_fingerprint": "string",
  "error": "string"
}
```

</details>

---

### `createBlueprintGraphSuggestions`

Generate engine-verified test suggestions from the blueprint configuration graph. Requires the blueprint-test-cases organization feature flag.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/suggestions`

```ts
const { data } = await client.createBlueprintGraphSuggestions(
  {
    blueprint_id: 'example',
  },
  {},
)
```

---

### `getBlueprintGraphSuggestions`

Read a graph suggestion generation and a page of its suggestions. Requires the blueprint-test-cases organization feature flag.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/suggestions/{generation_id}`

```ts
const { data } = await client.getBlueprintGraphSuggestions({
  blueprint_id: 'example',
  generation_id: 'example',
  shape: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "pending",
  "created_at": "1970-01-01T00:00:00.000Z",
  "error": {
    "code": "string",
    "retriable": true
  },
  "prompt_version": "string",
  "model": "string",
  "digest": "string",
  "total": 0,
  "counts_by_shape": {
    "journey_starts_workflow": 0,
    "event_sends_email": 0,
    "step_logic": 0,
    "answer_options": 0,
    "process_order": 0,
    "catalog_structure": 0
  },
  "excluded": [
    {
      "reason": "invalid",
      "count": 0
    }
  ],
  "unreadable": [
    {
      "type": "string",
      "id": "string",
      "reason": "string"
    }
  ],
  "incomplete_subjects": [
    {
      "node_id": "string",
      "resource_id": "string",
      "resource_type": "string",
      "reason": "step_cap"
    }
  ],
  "items": [
    {
      "id": "string",
      "shape": "journey_starts_workflow",
      "subject": {
        "node_id": "string",
        "resource_id": "string",
        "resource_type": "string",
        "label": "string"
      },
      "clauses": [
        {}
      ],
      "sentences": [
        {
          "key": "string",
          "params": {}
        }
      ]
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `acceptBlueprintGraphSuggestions`

Accept suggestions as v2 test cases. Idempotent per suggestion id. Requires the blueprint-test-cases organization feature flag.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/suggestions/{generation_id}/accept`

```ts
const { data } = await client.acceptBlueprintGraphSuggestions(
  {
    blueprint_id: 'example',
    generation_id: 'example',
  },
  {
    suggestion_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blueprint_id": "string",
      "org_id": "string",
      "schema_version": 1,
      "revision": 1,
      "title": "string",
      "expectation": "string",
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
      "deleted_at": "1970-01-01T00:00:00.000Z",
      "confirmation": {
        "schema_version": "1",
        "interpretation": {
          "schema_version": "1",
          "clauses": [
            {
              "source_text": "string",
              "status": "supported",
              "assertions": [
                {
                  "operator": "resource_included",
                  "target_key": "string"
                }
              ],
              "reason": "string"
            }
          ]
        },
        "catalog": [
          {
            "key": "string",
            "type": "string",
            "id": "string",
            "label": "string",
            "membership_state": "included",
            "capabilities": ["resource_included"],
            "tasks": [
              {
                "key": "string",
                "label": "string",
                "capabilities": ["workflow_task_required"]
              }
            ]
          }
        ],
        "proposal_hash": "string",
        "expectation_sha256": "string",
        "interpreter_version": "string",
        "confirmed_by": {
          "name": "manifest@epilot.cloud",
          "org_id": "911690",
          "user_id": "11001045",
          "token_id": "api_5ZugdRXasLfWBypHi93Fk"
        },
        "confirmed_at": "1970-01-01T00:00:00.000Z",
        "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      "clauses": [
        {}
      ],
      "clauses_hash": "string",
      "title_key": {},
      "origin": {},
      "needs_reinterpretation": {
        "reason": "string"
      }
    }
  ],
  "accepted_ids": ["string"]
}
```

</details>

---

### `migrateBlueprintV1TestCases`

Migrate v1 test cases to v2 clauses; cases that cannot be mapped are flagged needs_reinterpretation. Requires the blueprint-test-cases organization feature flag.

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite:migrate-v1`

```ts
const { data } = await client.migrateBlueprintV1TestCases(
  {
    blueprint_id: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "migrated": 0,
  "needs_reinterpretation": 0,
  "cases": [
    {
      "case_id": "string",
      "result": "migrated",
      "clauses": [
        {}
      ]
    }
  ]
}
```

</details>

---

### `createBlueprintTestInterpretation`

Start interpreting an author's plain-language test against the blueprint configuration. With test_case_id the result rewrites that case. One active interpretation per author and blueprint. Requires th

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/interpretations`

```ts
const { data } = await client.createBlueprintTestInterpretation(
  {
    blueprint_id: 'example',
  },
  {
    text: 'string',
    test_case_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

---

### `getBlueprintTestInterpretation`

Read the caller's own text interpretation. Requires the blueprint-test-cases organization feature flag.

`GET /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/interpretations/{interpretation_id}`

```ts
const { data } = await client.getBlueprintTestInterpretation({
  blueprint_id: 'example',
  interpretation_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "pending",
  "created_at": "1970-01-01T00:00:00.000Z",
  "text": "string",
  "test_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parts": [
    {
      "index": 0,
      "span": [0, 0],
      "state": "supported",
      "check": {
        "id": "string",
        "hash": "string",
        "clause": {},
        "sentence": {
          "key": "string",
          "params": {}
        },
        "result": {
          "clause_id": "string",
          "verdict": "PASSED",
          "reason": "string",
          "sentence": {
            "key": "string",
            "params": {}
          },
          "evidence": [
            {
              "node_id": "string",
              "resource_id": "string",
              "resource_type": "string",
              "label": "string",
              "path": "string",
              "expected": {},
              "actual": {}
            }
          ],
          "evidence_truncated": true,
          "candidates": ["string"]
        }
      }
    }
  ],
  "dropped": 0,
  "unchanged": true,
  "unreadable": [
    {
      "type": "string",
      "id": "string",
      "reason": "string"
    }
  ],
  "prompt_version": "string",
  "model": "string",
  "error": {
    "code": "interpretation_too_complex",
    "retriable": true
  },
  "accepted_case_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `confirmBlueprintTestInterpretationV2`

Save the author's confirmed selection of a completed interpretation as a v2 test case (201), or as a new revision of the case it rewrites (200, needs expected_revision). Ambiguous parts need a chosen 

`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/interpretations/{interpretation_id}/confirm`

```ts
const { data } = await client.confirmBlueprintTestInterpretationV2(
  {
    blueprint_id: 'example',
    interpretation_id: 'example',
  },
  {
    choices: [
      {
        part_index: 0,
        candidate_id: 'string'
      }
    ],
    omit_parts: [0],
    confirmed: true,
    expected_revision: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "test_case": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "blueprint_id": "string",
    "org_id": "string",
    "schema_version": 1,
    "revision": 1,
    "title": "string",
    "expectation": "string",
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
    "deleted_at": "1970-01-01T00:00:00.000Z",
    "confirmation": {
      "schema_version": "1",
      "interpretation": {
        "schema_version": "1",
        "clauses": [
          {
            "source_text": "string",
            "status": "supported",
            "assertions": [
              {
                "operator": "resource_included",
                "target_key": "string"
              }
            ],
            "reason": "string"
          }
        ]
      },
      "catalog": [
        {
          "key": "string",
          "type": "string",
          "id": "string",
          "label": "string",
          "membership_state": "included",
          "capabilities": ["resource_included"],
          "tasks": [
            {
              "key": "string",
              "label": "string",
              "capabilities": ["workflow_task_required"]
            }
          ]
        }
      ],
      "proposal_hash": "string",
      "expectation_sha256": "string",
      "interpreter_version": "string",
      "confirmed_by": {
        "name": "manifest@epilot.cloud",
        "org_id": "911690",
        "user_id": "11001045",
        "token_id": "api_5ZugdRXasLfWBypHi93Fk"
      },
      "confirmed_at": "1970-01-01T00:00:00.000Z",
      "interpreter_execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "clauses": [
      {}
    ],
    "clauses_hash": "string",
    "title_key": {},
    "origin": {},
    "needs_reinterpretation": {
      "reason": "string"
    }
  },
  "confirmation_kept": true
}
```

</details>

---

## Schemas

### `BlueprintTestSuiteError`

```ts
type BlueprintTestSuiteError = {
  status: number
  code: "invalid_request" | "unauthorized" | "forbidden" | "not_found" | "conflict" | "credential_invalid" | "permissions_unavailable" | "permission_denied" | "feature_unavailable" | "session_expiring" | "storage_conflict" | "suite_unavailable" | "v2_case" | "active_generation" | "active_suite_run" | "org_run_limit" | "suggestions_stale" | "unknown_suggestion" | "suggestion_acceptance_changed" | "suggestion_input_too_large" | "invalid_clauses" | "not_implemented" | "interpretation_input_too_large" | "interpretation_incomplete" | "interpretation_not_ready" | "interpretation_used" | "confirmation_required"
  retriable: boolean
  active_run_id?: string // uuid
  generation_id?: string // uuid
  retry_after_seconds?: number
  accepted_ids?: string[]
  count?: number
}
```

### `SentenceParamValue`

A sentence parameter. Strings, lists and objects of parameters; never prose.

```ts
type SentenceParamValue = string | { ... }[] | Record<string, { ... }>
```

### `Sentence`

A translation key and its parameters. The UI renders the text; the server never returns sentences.

```ts
type Sentence = {
  key: string
  params: Record<string, string | { ... }[] | Record<string, { ... }>>
}
```

### `ClauseEvidenceView`

```ts
type ClauseEvidenceView = {
  node_id: string
  resource_id: string
  resource_type: string
  label: string
  path?: string
  expected?: unknown
  actual?: unknown
}
```

### `ClauseResultView`

```ts
type ClauseResultView = {
  clause_id: string
  verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
  reason?: string
  sentence: {
    key: string
    params: Record<string, string | { ... }[] | Record<string, { ... }>>
  }
  evidence: Array<{
    node_id: string
    resource_id: string
    resource_type: string
    label: string
    path?: string
    expected?: unknown
    actual?: unknown
  }>
  evidence_truncated?: boolean
  candidates?: string[]
}
```

### `BlueprintTestUnreadableResource`

```ts
type BlueprintTestUnreadableResource = {
  type: string
  id: string
  reason: string
}
```

### `SuiteRun`

```ts
type SuiteRun = {
  id: string // uuid
  status: "queued" | "running" | "completed" | "failed"
  created_at: string // date-time
  finished_at?: string // date-time
  digest?: string
  unreadable?: Array<{
    type: string
    id: string
    reason: string
  }>
  counts?: {
    passed: number
    failed: number
    cannot_verify: number
    superseded: number
  }
  skipped_v1?: number
  membership_fingerprint?: string
  error?: string
}
```

### `CaseResultRow`

```ts
type CaseResultRow = {
  case_id: string // uuid
  case_revision: number
  clauses_hash: string
  membership_fingerprint: string
  status: "PASSED" | "FAILED" | "CANNOT_VERIFY" | "stale"
  reason?: "no_clauses"
  results: Array<{
    clause_id: string
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    reason?: string
    sentence: {
      key: { ... }
      params: { ... }
    }
    evidence: Array<{
      node_id: { ... }
      resource_id: { ... }
      resource_type: { ... }
      label: { ... }
      path?: { ... }
      expected?: { ... }
      actual?: { ... }
    }>
    evidence_truncated?: boolean
    candidates?: string[]
  }>
  run_id?: string // uuid
  finished_at?: string // date-time
}
```

### `BlueprintTestSuiteSummary`

Over all cases of the blueprint, not only the page. v1 cases count as needs_reinterpretation when migration flagged them, otherwise as never_run.

```ts
type BlueprintTestSuiteSummary = {
  passed: number
  failed: number
  cannot_verify: number
  never_run: number
  stale: number
  needs_reinterpretation: number
}
```

### `BlueprintTestSuite`

```ts
type BlueprintTestSuite = {
  cases: Array<{
    case: {
      id: { ... }
      blueprint_id: { ... }
      org_id: { ... }
      schema_version: { ... }
      revision: { ... }
      title?: { ... }
      expectation?: { ... }
      created_at: { ... }
      created_by: { ... }
      updated_at: { ... }
      updated_by: { ... }
      deleted_at?: { ... }
      confirmation?: { ... }
      clauses?: { ... }
      clauses_hash?: { ... }
      title_key?: { ... }
      origin?: { ... }
      needs_reinterpretation?: { ... }
    }
    latest?: {
      case_id: { ... }
      case_revision: { ... }
      clauses_hash: { ... }
      membership_fingerprint: { ... }
      status: { ... }
      reason?: { ... }
      results: { ... }
      run_id?: { ... }
      finished_at?: { ... }
    }
  }>
  summary: {
    passed: number
    failed: number
    cannot_verify: number
    never_run: number
    stale: number
    needs_reinterpretation: number
  }
  active_run?: {
    id: string // uuid
    status: "queued" | "running" | "completed" | "failed"
    created_at: string // date-time
    finished_at?: string // date-time
    digest?: string
    unreadable?: Array<{
      type: { ... }
      id: { ... }
      reason: { ... }
    }>
    counts?: {
      passed: { ... }
      failed: { ... }
      cannot_verify: { ... }
      superseded: { ... }
    }
    skipped_v1?: number
    membership_fingerprint?: string
    error?: string
  }
  next_cursor?: string
}
```

### `BlueprintTestCaseShape`

```ts
type BlueprintTestCaseShape = "journey_starts_workflow" | "event_sends_email" | "step_logic" | "answer_options" | "process_order" | "catalog_structure"
```

### `Suggestion`

```ts
type Suggestion = {
  id: string
  shape: "journey_starts_workflow" | "event_sends_email" | "step_logic" | "answer_options" | "process_order" | "catalog_structure"
  subject: {
    node_id: string
    resource_id: string
    resource_type: string
    label: string
  }
  clauses: Record<string, unknown>[]
  sentences: Array<{
    key: string
    params: Record<string, string | { ... }[] | Record<string, { ... }>>
  }>
}
```

### `BlueprintGraphSuggestionsStarted`

```ts
type BlueprintGraphSuggestionsStarted = {
  generation_id: string // uuid
  status: "pending"
}
```

### `BlueprintTestInterpretationInput`

```ts
type BlueprintTestInterpretationInput = {
  text: string
  test_case_id?: string // uuid
}
```

### `BlueprintTestInterpretationStarted`

```ts
type BlueprintTestInterpretationStarted = {
  interpretation_id: string // uuid
  status: "pending"
}
```

### `BlueprintInterpretedCheck`

An engine-verified check. Code-assigned id (p<i> or p<i>c`<n>`); the sentence is a key, never model text.

```ts
type BlueprintInterpretedCheck = {
  id: string
  hash: string
  clause: Record<string, unknown>
  sentence: {
    key: string
    params: Record<string, string | { ... }[] | Record<string, { ... }>>
  }
  result: {
    clause_id: string
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    reason?: string
    sentence: {
      key: { ... }
      params: { ... }
    }
    evidence: Array<{
      node_id: { ... }
      resource_id: { ... }
      resource_type: { ... }
      label: { ... }
      path?: { ... }
      expected?: { ... }
      actual?: { ... }
    }>
    evidence_truncated?: boolean
    candidates?: string[]
  }
}
```

### `BlueprintInterpretedPart`

One part of the author's text in one of three states. span is an integer offset pair into the author's own text.

```ts
type BlueprintInterpretedPart = {
  index: number
  span?: number[]
  state: "supported"
  check: {
    id: string
    hash: string
    clause: Record<string, unknown>
    sentence: {
      key: { ... }
      params: { ... }
    }
    result: {
      clause_id: { ... }
      verdict: { ... }
      reason?: { ... }
      sentence: { ... }
      evidence: { ... }
      evidence_truncated?: { ... }
      candidates?: { ... }
    }
  }
} | {
  index: number
  span?: number[]
  state: "ambiguous"
  candidates: Array<{
    id: string
    hash: string
    clause: Record<string, unknown>
    sentence: {
      key: { ... }
      params: { ... }
    }
    result: {
      clause_id: { ... }
      verdict: { ... }
      reason?: { ... }
      sentence: { ... }
      evidence: { ... }
      evidence_truncated?: { ... }
      candidates?: { ... }
    }
  }>
} | {
  index: number
  span?: number[]
  state: "unsupported"
  reason: "runtime_behaviour" | "document_content" | "external_system" | "legal_judgement" | "generic_integrity" | "no_matching_resource" | "no_matching_field" | "no_matching_value" | "not_expressible" | "cannot_bind" | "too_vague"
  hint: {
    code: "name_the_resource" | "name_the_field" | "name_the_value" | "split_statement" | "describe_configuration" | "use_health_check" | "rephrase_as_check"
    params: {
      type?: { ... }
    }
  }
}
```

### `BlueprintInterpretationSpan`

[start, end) character offsets into the author's text.

```ts
type BlueprintInterpretationSpan = number[]
```

### `BlueprintTestInterpretationResult`

```ts
type BlueprintTestInterpretationResult = {
  id: string // uuid
  status: "pending" | "running" | "completed" | "failed"
  created_at: string // date-time
  text: string
  test_case_id?: string // uuid
  parts: Array<{
    index: number
    span?: number[]
    state: "supported"
    check: {
      id: { ... }
      hash: { ... }
      clause: { ... }
      sentence: { ... }
      result: { ... }
    }
  } | {
    index: number
    span?: number[]
    state: "ambiguous"
    candidates: Array<{
      id: { ... }
      hash: { ... }
      clause: { ... }
      sentence: { ... }
      result: { ... }
    }>
  } | {
    index: number
    span?: number[]
    state: "unsupported"
    reason: "runtime_behaviour" | "document_content" | "external_system" | "legal_judgement" | "generic_integrity" | "no_matching_resource" | "no_matching_field" | "no_matching_value" | "not_expressible" | "cannot_bind" | "too_vague"
    hint: {
      code: { ... }
      params: { ... }
    }
  }>
  dropped: number
  unchanged?: boolean
  unreadable: Array<{
    type: string
    id: string
    reason: string
  }>
  prompt_version?: string
  model?: string
  error?: {
    code: "interpretation_too_complex" | "model_unavailable" | "timeout" | "expired" | "worker_failed" | "not_authorized" | "invoke_failed"
    retriable: boolean
  }
  accepted_case_id?: string // uuid
}
```

### `BlueprintTestInterpretationConfirmInput`

```ts
type BlueprintTestInterpretationConfirmInput = {
  choices: Array<{
    part_index: number
    candidate_id: string
  }>
  omit_parts: number[]
  confirmed: boolean
  expected_revision?: number
}
```

### `BlueprintTestInterpretationConfirmation`

```ts
type BlueprintTestInterpretationConfirmation = {
  test_case: {
    id: string // uuid
    blueprint_id: string
    org_id: string
    schema_version: 1 | 2
    revision: number
    title?: string
    expectation?: string
    created_at: string // date-time
    created_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    updated_at: string // date-time
    updated_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    deleted_at?: string // date-time
    confirmation?: {
      schema_version: { ... }
      interpretation: { ... }
      catalog: { ... }
      proposal_hash: { ... }
      expectation_sha256: { ... }
      interpreter_version: { ... }
      confirmed_by: { ... }
      confirmed_at: { ... }
      interpreter_execution_id?: { ... }
    }
    clauses?: Record<string, unknown>[]
    clauses_hash?: string
    title_key?: Record<string, unknown>
    origin?: Record<string, unknown>
    needs_reinterpretation?: {
      reason: { ... }
    }
  }
  confirmation_kept: boolean
}
```

### `BlueprintTestCaseOrigin`

Where a v2 case came from (BlueprintTestCase.origin).

```ts
type BlueprintTestCaseOrigin = {
  kind: "suggestion"
  source: "ai"
  shape: "journey_starts_workflow" | "event_sends_email" | "step_logic" | "answer_options" | "process_order" | "catalog_structure"
  suggestion_id: string
  generation_id: string
  prompt_version: string
  model: string
} | {
  kind: "migrated_v1"
  from_revision: number
} | {
  kind: "interpretation"
  source: "ai"
  interpretation_id: string // uuid
  prompt_version: string
  model: string
  confirmed_clauses_hash: string
  confirmed_at: string // date-time
  confirmed_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
}
```

### `BlueprintGraphSuggestionPage`

```ts
type BlueprintGraphSuggestionPage = {
  id: string // uuid
  status: "pending" | "running" | "completed" | "failed"
  created_at: string // date-time
  error?: {
    code: string
    retriable: boolean
  }
  prompt_version?: string
  model?: string
  digest?: string
  total: number
  counts_by_shape: {
    journey_starts_workflow?: number
    event_sends_email?: number
    step_logic?: number
    answer_options?: number
    process_order?: number
    catalog_structure?: number
  }
  excluded: Array<{
    reason: "invalid" | "unknown_subject" | "shape_unknown" | "not_passing" | "cannot_verify" | "trivial" | "duplicate"
    count: number
  }>
  unreadable: Array<{
    type: string
    id: string
    reason: string
  }>
  incomplete_subjects: Array<{
    node_id: string
    resource_id: string
    resource_type: string
    reason: "step_cap" | "input_cap" | "deadline" | "model_error"
  }>
  items: Array<{
    id: string
    shape: "journey_starts_workflow" | "event_sends_email" | "step_logic" | "answer_options" | "process_order" | "catalog_structure"
    subject: {
      node_id: { ... }
      resource_id: { ... }
      resource_type: { ... }
      label: { ... }
    }
    clauses: Record<string, unknown>[]
    sentences: Array<{
      key: { ... }
      params: { ... }
    }>
  }>
  next_cursor?: string
}
```

### `BlueprintGraphSuggestionAcceptInput`

```ts
type BlueprintGraphSuggestionAcceptInput = {
  suggestion_ids: string[]
}
```

### `BlueprintGraphSuggestionAcceptance`

```ts
type BlueprintGraphSuggestionAcceptance = {
  results: Array<{
    id: string // uuid
    blueprint_id: string
    org_id: string
    schema_version: 1 | 2
    revision: number
    title?: string
    expectation?: string
    created_at: string // date-time
    created_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    updated_at: string // date-time
    updated_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    deleted_at?: string // date-time
    confirmation?: {
      schema_version: { ... }
      interpretation: { ... }
      catalog: { ... }
      proposal_hash: { ... }
      expectation_sha256: { ... }
      interpreter_version: { ... }
      confirmed_by: { ... }
      confirmed_at: { ... }
      interpreter_execution_id?: { ... }
    }
    clauses?: Record<string, unknown>[]
    clauses_hash?: string
    title_key?: Record<string, unknown>
    origin?: Record<string, unknown>
    needs_reinterpretation?: {
      reason: { ... }
    }
  }>
  accepted_ids: string[]
}
```

### `BlueprintV1TestCaseMigration`

```ts
type BlueprintV1TestCaseMigration = {
  migrated: number
  needs_reinterpretation: number
  cases: Array<{
    case_id: string
    result: "migrated"
    clauses: Record<string, unknown>[]
  } | {
    case_id: string
    result: "needs_reinterpretation"
    reason: string
  }>
}
```

### `BlueprintTestCaseInput`

```ts
type BlueprintTestCaseInput = {
  title: string
  expectation: string
}
```

### `BlueprintTestCaseUpdate`

```ts
type BlueprintTestCaseUpdate = {
  title: string
  expectation: string
  expected_revision: number
}
```

### `BlueprintTestCase`

```ts
type BlueprintTestCase = {
  id: string // uuid
  blueprint_id: string
  org_id: string
  schema_version: 1 | 2
  revision: number
  title?: string
  expectation?: string
  created_at: string // date-time
  created_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  updated_at: string // date-time
  updated_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  deleted_at?: string // date-time
  confirmation?: {
    schema_version: "1"
    interpretation: {
      schema_version: { ... }
      clauses: { ... }
    }
    catalog: Array<{
      key: { ... }
      type: { ... }
      id: { ... }
      label: { ... }
      membership_state: { ... }
      capabilities: { ... }
      tasks?: { ... }
    }>
    proposal_hash: string
    expectation_sha256: string
    interpreter_version: string
    confirmed_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    confirmed_at: string // date-time
    interpreter_execution_id?: string // uuid
  }
  clauses?: Record<string, unknown>[]
  clauses_hash?: string
  title_key?: Record<string, unknown>
  origin?: Record<string, unknown>
  needs_reinterpretation?: {
    reason: string
  }
}
```

### `BlueprintTestPredicate`

```ts
type BlueprintTestPredicate = {
  operator: "resource_included"
  target_key: string
} | {
  operator: "resource_references"
  target_key: string
  expected_target_key: string
} | {
  operator: "config_enabled"
  target_key: string
} | {
  operator: "workflow_task_required"
  target_key: string
  task_key: string
}
```

### `BlueprintTestInterpretation`

```ts
type BlueprintTestInterpretation = {
  schema_version: "1"
  clauses: Array<{
    source_text: string
    status: "supported"
    assertions: Array<{
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      expected_target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      task_key: { ... }
    }>
    reason: string
  } | {
    source_text: string
    status: "unsupported" | "ambiguous"
    assertions: Array<{
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      expected_target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      task_key: { ... }
    }>
    reason: string
  }>
}
```

### `BlueprintTestCatalogEntry`

```ts
type BlueprintTestCatalogEntry = {
  key: string
  type: string
  id: string
  label: string
  membership_state: "included" | "excluded" | "absent"
  capabilities: "resource_included" | "resource_references" | "config_enabled" | "workflow_task_required"[]
  tasks?: Array<{
    key: string
    label: string
    capabilities: "workflow_task_required"[]
  }>
}
```

### `BlueprintTestInterpretationProposal`

```ts
type BlueprintTestInterpretationProposal = {
  schema_version: "1"
  interpretation: {
    schema_version: "1"
    clauses: Array<{
      source_text: { ... }
      status: { ... }
      assertions: { ... }
      reason: { ... }
    } | {
      source_text: { ... }
      status: { ... }
      assertions: { ... }
      reason: { ... }
    }>
  }
  catalog: Array<{
    key: string
    type: string
    id: string
    label: string
    membership_state: "included" | "excluded" | "absent"
    capabilities: "resource_included" | "resource_references" | "config_enabled" | "workflow_task_required"[]
    tasks?: Array<{
      key: { ... }
      label: { ... }
      capabilities: { ... }
    }>
  }>
  proposal_hash: string
  expectation_sha256: string
  interpreter_version: string
  interpreter_execution_id?: string // uuid
}
```

### `BlueprintTestCaseConfirmation`

```ts
type BlueprintTestCaseConfirmation = {
  schema_version: "1"
  interpretation: {
    schema_version: "1"
    clauses: Array<{
      source_text: { ... }
      status: { ... }
      assertions: { ... }
      reason: { ... }
    } | {
      source_text: { ... }
      status: { ... }
      assertions: { ... }
      reason: { ... }
    }>
  }
  catalog: Array<{
    key: string
    type: string
    id: string
    label: string
    membership_state: "included" | "excluded" | "absent"
    capabilities: "resource_included" | "resource_references" | "config_enabled" | "workflow_task_required"[]
    tasks?: Array<{
      key: { ... }
      label: { ... }
      capabilities: { ... }
    }>
  }>
  proposal_hash: string
  expectation_sha256: string
  interpreter_version: string
  confirmed_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  confirmed_at: string // date-time
  interpreter_execution_id?: string // uuid
}
```

### `BlueprintTestResourceEvidence`

```ts
type BlueprintTestResourceEvidence = {
  type: string
  id: string
  key: string
  membership_state: "included" | "excluded" | "absent"
  source_state: "read" | "source_unreadable" | "unsupported" | "not_read"
  checked_at?: string // date-time
  fingerprint?: string
  references: Array<{
    target_key: string
    path: string
    candidate_target_keys?: string[]
  }>
  dependency_coverage: "complete" | "incomplete"
  enabled?: {
    path: string
    value: boolean
  }
  tasks_complete?: boolean
  tasks: Array<{
    key: string
    path: string
    required?: boolean
    manual: boolean
    task_type?: "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT"
  }>
}
```

### `BlueprintTestCheckResult`

```ts
type BlueprintTestCheckResult = {
  predicate?: {
    operator: "resource_included"
    target_key: string
  } | {
    operator: "resource_references"
    target_key: string
    expected_target_key: string
  } | {
    operator: "config_enabled"
    target_key: string
  } | {
    operator: "workflow_task_required"
    target_key: string
    task_key: string
  }
  resource_key?: string
  verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
  reason: string
  path?: string
  actual?: boolean | string
}
```

### `BlueprintTestDependencyValidation`

```ts
type BlueprintTestDependencyValidation = {
  scope: "related_resources"
  verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
  checks: Array<{
    predicate?: {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      expected_target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      task_key: { ... }
    }
    resource_key?: string
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    reason: string
    path?: string
    actual?: boolean | string
  }>
  boundaries: Array<{
    key?: string
    path?: string
    reason: string
  }>
  omitted_count: number
}
```

### `BlueprintTestRunResult`

```ts
type BlueprintTestRunResult = {
  verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
  checks: Array<{
    predicate?: {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      expected_target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
    } | {
      operator: { ... }
      target_key: { ... }
      task_key: { ... }
    }
    resource_key?: string
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    reason: string
    path?: string
    actual?: boolean | string
  }>
  coverage: {
    complete: boolean
    boundaries: Array<{
      key?: { ... }
      path?: { ... }
      reason: { ... }
    }>
    supported_clauses: number
    total_clauses: number
  }
  fingerprints: Record<string, string>
  evaluator_version: "1"
  checked_at: string // date-time
  evidence?: Array<{
    type: string
    id: string
    key: string
    membership_state: "included" | "excluded" | "absent"
    source_state: "read" | "source_unreadable" | "unsupported" | "not_read"
    checked_at?: string // date-time
    fingerprint?: string
    references: Array<{
      target_key: { ... }
      path: { ... }
      candidate_target_keys?: { ... }
    }>
    dependency_coverage: "complete" | "incomplete"
    enabled?: {
      path: { ... }
      value: { ... }
    }
    tasks_complete?: boolean
    tasks: Array<{
      key: { ... }
      path: { ... }
      required?: { ... }
      manual: { ... }
      task_type?: { ... }
    }>
  }>
  evidence_omitted_count: number
  dependency_validation?: {
    scope: "related_resources"
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    checks: Array<{
      predicate?: { ... }
      resource_key?: { ... }
      verdict: { ... }
      reason: { ... }
      path?: { ... }
      actual?: { ... }
    }>
    boundaries: Array<{
      key?: { ... }
      path?: { ... }
      reason: { ... }
    }>
    omitted_count: number
  }
  interpretation_proposal?: {
    schema_version: "1"
    interpretation: {
      schema_version: { ... }
      clauses: { ... }
    }
    catalog: Array<{
      key: { ... }
      type: { ... }
      id: { ... }
      label: { ... }
      membership_state: { ... }
      capabilities: { ... }
      tasks?: { ... }
    }>
    proposal_hash: string
    expectation_sha256: string
  // ...
}
```

### `BlueprintSourceTestOperation`

```ts
type BlueprintSourceTestOperation = {
  operation_kind: "generate" | "execute"
  run: {
    id: string // uuid
    org_id: string
    blueprint_id: string
    incarnation_id: string // uuid
    test_case_id: string // uuid
    test_revision: number
    expectation: string
    title: string
    created_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    created_at: string // date-time
    expires_at: string // date-time
    status: "queued" | "running" | "completed" | "failed"
    confirmation_hash?: string
    membership_fingerprint?: string
    result?: {
      verdict: { ... }
      checks: { ... }
      coverage: { ... }
      fingerprints: { ... }
      evaluator_version: { ... }
      checked_at: { ... }
      evidence?: { ... }
      evidence_omitted_count: { ... }
      dependency_validation?: { ... }
      interpretation_proposal?: { ... }
      requires_confirmation?: { ... }
    }
    error?: {
      code: { ... }
    }
    superseded?: boolean
    stale: boolean
  }
}
```

### `BlueprintTestRun`

```ts
type BlueprintTestRun = {
  id: string // uuid
  org_id: string
  blueprint_id: string
  incarnation_id: string // uuid
  test_case_id: string // uuid
  test_revision: number
  expectation: string
  title: string
  created_by: {
    name?: unknown
    org_id: string
    user_id?: string
    token_id?: string
  }
  created_at: string // date-time
  expires_at: string // date-time
  status: "queued" | "running" | "completed" | "failed"
  confirmation_hash?: string
  membership_fingerprint?: string
  result?: {
    verdict: "PASSED" | "FAILED" | "CANNOT_VERIFY"
    checks: Array<{
      predicate?: { ... }
      resource_key?: { ... }
      verdict: { ... }
      reason: { ... }
      path?: { ... }
      actual?: { ... }
    }>
    coverage: {
      complete: { ... }
      boundaries: { ... }
      supported_clauses: { ... }
      total_clauses: { ... }
    }
    fingerprints: Record<string, string>
    evaluator_version: "1"
    checked_at: string // date-time
    evidence?: Array<{
      type: { ... }
      id: { ... }
      key: { ... }
      membership_state: { ... }
      source_state: { ... }
      checked_at?: { ... }
      fingerprint?: { ... }
      references: { ... }
      dependency_coverage: { ... }
      enabled?: { ... }
      tasks_complete?: { ... }
      tasks: { ... }
    }>
    evidence_omitted_count: number
    dependency_validation?: {
      scope: { ... }
      verdict: { ... }
      checks: { ... }
      boundaries: { ... }
      omitted_count: { ... }
    }
    interpretation_proposal?: {
      schema_version: { ... }
      interpretation: { ... }
      catalog: { ... }
      proposal_hash: { ... }
      expectation_sha256: { ... }
      interpreter_version: { ... }
      interpreter_execution_id?: { ... }
    }
    requires_confirmation?: true
  }
  error?: {
    code: "expired" | "timeout" | "invoke_failed" | "worker_failed"
  }
  superseded?: boolean
  stale: boolean
}
```

### `BlueprintTestRunPage`

```ts
type BlueprintTestRunPage = {
  results: Array<{
    id: string // uuid
    org_id: string
    blueprint_id: string
    incarnation_id: string // uuid
    test_case_id: string // uuid
    test_revision: number
    expectation: string
    title: string
    created_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    created_at: string // date-time
    expires_at: string // date-time
    status: "queued" | "running" | "completed" | "failed"
    confirmation_hash?: string
    membership_fingerprint?: string
    result?: {
      verdict: { ... }
      checks: { ... }
      coverage: { ... }
      fingerprints: { ... }
      evaluator_version: { ... }
      checked_at: { ... }
      evidence?: { ... }
      evidence_omitted_count: { ... }
      dependency_validation?: { ... }
      interpretation_proposal?: { ... }
      requires_confirmation?: { ... }
    }
    error?: {
      code: { ... }
    }
    superseded?: boolean
    stale: boolean
  }>
  next_cursor?: string
}
```

### `BlueprintTestRunError`

```ts
type BlueprintTestRunError = {
  status: number
  code: "invalid_request" | "unauthorized" | "forbidden" | "not_found" | "conflict" | "checks_already_confirmed" | "confirmation_required" | "portable_test_unavailable" | "active_run" | "org_run_limit" | "session_expiring" | "credential_invalid" | "permissions_unavailable" | "permission_denied" | "feature_unavailable" | "run_unavailable" | "storage_conflict" | "v2_case"
  retriable?: boolean
  active_run_id?: string // uuid
  retry_after_seconds?: number
}
```

### `BlueprintTestRunInput`

```ts
type BlueprintTestRunInput = {
  expected_revision: number
}
```

### `BlueprintTestCasePage`

```ts
type BlueprintTestCasePage = {
  results: Array<{
    id: string // uuid
    blueprint_id: string
    org_id: string
    schema_version: 1 | 2
    revision: number
    title?: string
    expectation?: string
    created_at: string // date-time
    created_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    updated_at: string // date-time
    updated_by: {
      name?: { ... }
      org_id: { ... }
      user_id?: { ... }
      token_id?: { ... }
    }
    deleted_at?: string // date-time
    confirmation?: {
      schema_version: { ... }
      interpretation: { ... }
      catalog: { ... }
      proposal_hash: { ... }
      expectation_sha256: { ... }
      interpreter_version: { ... }
      confirmed_by: { ... }
      confirmed_at: { ... }
      interpreter_execution_id?: { ... }
    }
    clauses?: Record<string, unknown>[]
    clauses_hash?: string
    title_key?: Record<string, unknown>
    origin?: Record<string, unknown>
    needs_reinterpretation?: {
      reason: { ... }
    }
  }>
  next_cursor?: string
}
```

### `BlueprintAssistantMessageRequest`

```ts
type BlueprintAssistantMessageRequest = {
  conversation_id?: string // uuid
  message?: string
  retry?: boolean
  proposal_update?: {
    proposal_id: string
    status: "applied" | "dismissed"
    note?: string
  }
}
```

### `BlueprintAssistantConversation`

```ts
type BlueprintAssistantConversation = {
  id: string
  blueprint_id: string
  status: "IN_PROGRESS" | "IDLE" | "FAILED"
  error?: string
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
  created_by_name?: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    created_at: string // date-time
    parts: Array<{
      type: { ... }
      text?: { ... }
      tool_use_id?: { ... }
      tool?: { ... }
      title?: { ... }
      status?: { ... }
      result?: { ... }
    }>
  }>
}
```

### `BlueprintAssistantSkill`

```ts
type BlueprintAssistantSkill = {
  name: string
  description: string
  enabled: boolean
  files: string[]
  size: number
  updated_at: string // date-time
  updated_by?: string
  updated_by_name?: string
}
```

### `BlueprintAssistantDefaultSkill`

```ts
type BlueprintAssistantDefaultSkill = {
  name: string
  description: string
  audience?: "publishers"
}
```

### `BlueprintAssistantSkillUpload`

```ts
type BlueprintAssistantSkillUpload = {
  file_name: string
  content_base64: string
}
```

### `BlueprintAssistantConversationSummary`

```ts
type BlueprintAssistantConversationSummary = {
  id: string
  title: string
  status: "IN_PROGRESS" | "IDLE" | "FAILED"
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
  created_by_name?: string
  message_count: number
}
```

### `BlueprintAssistantMessage`

```ts
type BlueprintAssistantMessage = {
  id: string
  role: "user" | "assistant"
  created_at: string // date-time
  parts: Array<{
    type: "text" | "tool"
    text?: string
    tool_use_id?: string
    tool?: string
    title?: string
    status?: "running" | "done" | "error"
    result?: {
      kind?: { ... }
    }
  }>
}
```

### `BlueprintAssistantPart`

`text` parts carry `text`. `tool` parts carry the tool call and, once finished, its structured
`result`, discriminated by `result.kind`: `overview`, `resources`, `inclusion`, `resource_content`,
`audit`, `proposal_changes`, `proposal_add`, `proposal_blueprint`, `proposal_publish`, `skill` or `error`

```ts
type BlueprintAssistantPart = {
  type: "text" | "tool"
  text?: string
  tool_use_id?: string
  tool?: string
  title?: string
  status?: "running" | "done" | "error"
  result?: {
    kind?: string
  }
}
```

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
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"[]
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
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  reason: "not_found" | "source_validation_failed" | "enrichment_failed"
}
```

### `BlueprintResource`

```ts
type BlueprintResource = {
  id: string
  name?: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  address?: string
  is_root?: boolean
  is_ready?: boolean
  is_hidden?: boolean
  is_disabled?: boolean
  hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"[]
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
    address?: string
    is_root?: boolean
    is_ready?: boolean
    is_hidden?: boolean
    is_disabled?: boolean
    hard_dependencies?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"[]
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
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  // ...
}
```

### `FileBlueprint`

```ts
type FileBlueprint = {
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  // ...
}
```

### `MarketplaceBlueprint`

```ts
type MarketplaceBlueprint = {
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  // ...
}
```

### `AppBlueprint`

```ts
type AppBlueprint = {
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  // ...
}
```

### `Blueprint`

```ts
type Blueprint = {
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
  }
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
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
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
    source_drift?: {
      removed: { ... }
      missing?: { ... }
      exclude_addresses?: { ... }
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
      source_drift?: { ... }
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
  source_drift?: {
    removed: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
    }>
    missing?: Array<{
      address: { ... }
      type: { ... }
      name: { ... }
      id: { ... }
      referenced_by: { ... }
    }>
    exclude_addresses?: string[]
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
    resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
  resource_type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference" | "source_resources_missing"
    data?: {
      missing_count?: { ... }
      exclude_count?: { ... }
      source_drift_s3_key?: { ... }
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
type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
```

### `PlanChanges`

```ts
type PlanChanges = "create" | "update" | "internal-update" | "no-op" | "delete" | "ignored"[]
```

### `CommonResourceNode`

```ts
type CommonResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name?: string
  source_id?: string
  is_virtual?: boolean
}
```

### `RootResourceNode`

```ts
type RootResourceNode = {
  id: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name?: string
  source_id?: string
  is_virtual?: true
  dependencies?: Array<{
    id: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
    name?: string
    source_id?: string
    is_virtual?: boolean
    address?: string
    dependencies?: { ... }[]
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
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name?: string
  source_id?: string
  is_virtual?: boolean
  address?: string
  dependencies?: { ... }[]
  parents?: Array<{
    id?: string
    type?: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference" | "source_resources_missing"
    data?: {
      missing_count?: { ... }
      exclude_count?: { ... }
      source_drift_s3_key?: { ... }
      formattedResource?: { ... }
      resource?: { ... }
      resourceDependency?: { ... }
      resources?: { ... }
      addresses?: { ... }
      originalError?: { ... }
      current?: { ... }
      max_allowed?: { ... }
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
type FormattedErrorCodes = "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference" | "source_resources_missing"
```

### `V3SourceResource`

```ts
type V3SourceResource = {
  address: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name: string
  id: string
}
```

### `V3MissingSourceResource`

```ts
type V3MissingSourceResource = {
  address: string
  type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
  name: string
  id: string
  referenced_by: string[]
}
```

### `V3SourceDrift`

V3 live-source plan capture only. Available on the install job and destination
blueprint plan. Only confirmed owning-API NotFound/404 reads may be auto-skipped; null, permission,
transport, server errors and missing ids remain strict capture failures.
Complete details are hydrated from durable stora

```ts
type V3SourceDrift = {
  removed: Array<{
    address: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
    name: string
    id: string
  }>
  missing?: Array<{
    address: string
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
    name: string
    id: string
    referenced_by: string[]
  }>
  exclude_addresses?: string[]
}
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
  code?: "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint" | "workflow_quota_reached" | "entity_mapping_journey_not_in_blueprint" | "missing_required_reference" | "source_resources_missing"
  data?: {
    missing_count?: number
    exclude_count?: number
    source_drift_s3_key?: string
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
    type: "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "insight" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission" | "email_signature" | "shared_inbox" | "event_catalog_event"
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
