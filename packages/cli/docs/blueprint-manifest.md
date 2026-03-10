# Blueprint Manifest API

**API Name:** `blueprint-manifest`
**Base URL:** `https://blueprint-manifest.sls.epilot.io`

Service to create and install Blueprint Manifest files

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getJob` | GET | `/v1/blueprint-manifest/jobs/{job_id}` | getJob |
| `createExport` | POST | `/v1/blueprint-manifest/jobs:createExport` | createExport |
| `exportManifest` | POST | `/v1/blueprint-manifest/jobs/{job_id}:exportManifest` | exportManifest |
| `uploadManifest` | POST | `/v1/blueprint-manifest:uploadManifest` | uploadManifest |
| `createPlan` | POST | `/v1/blueprint-manifest/jobs:createPlan` | createPlan |
| `applyPlan` | POST | `/v1/blueprint-manifest/jobs/{job_id}:applyPlan` | applyPlan |
| `listInstalledManifests` | GET | `/v1/blueprint-manifest/manifests` | listInstalledManifests |
| `getManifest` | GET | `/v1/blueprint-manifest/manifests/{manifest_id}` | getManifest |
| `updateManifest` | PUT | `/v1/blueprint-manifest/manifests/{manifest_id}` | updateManifest |
| `deleteManifest` | DELETE | `/v1/blueprint-manifest/manifests/{manifest_id}` | deleteManifest |
| `listBlueprints` | GET | `/v2/blueprint-manifest/blueprints` | listBlueprints |
| `createBlueprint` | POST | `/v2/blueprint-manifest/blueprints` | createBlueprint |
| `listInstalledMarketplaceBlueprints` | GET | `/v2/blueprint-manifest/blueprints:marketplace` | listInstalledMarketplaceBlueprints |
| `preInstallBlueprint` | POST | `/v2/blueprint-manifest/blueprints:pre-install` | preInstallBlueprint |
| `getBlueprintPreview` | GET | `/v2/blueprint-manifest/blueprints:preview/{preview_id}` | getBlueprintPreview |
| `installBlueprint` | POST | `/v2/blueprint-manifest/blueprint:install` | installBlueprint |
| `getBlueprint` | GET | `/v2/blueprint-manifest/blueprints/{blueprint_id}` | getBlueprint |
| `updateBlueprint` | PUT | `/v2/blueprint-manifest/blueprints/{blueprint_id}` | updateBlueprint |
| `deleteBlueprint` | DELETE | `/v2/blueprint-manifest/blueprints/{blueprint_id}` | deleteBlueprint |
| `validateBlueprint` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}/validate` | validateBlueprint |
| `exportBlueprint` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}:export` | exportBlueprint |
| `formatBlueprintDescription` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}:format-description` | formatBlueprintDescription |
| `addBlueprintResource` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources` | addBlueprintResource |
| `syncDependencies` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources:syncDependencies` | syncDependencies |
| `bulkAddBlueprintResources` | POST | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk` | bulkAddBlueprintResources |
| `bulkUpdateBlueprintResources` | PUT | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk` | bulkUpdateBlueprintResources |
| `bulkDeleteBlueprintResources` | DELETE | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk` | bulkDeleteBlueprintResources |
| `updateBlueprintResource` | PUT | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}` | updateBlueprintResource |
| `deleteBlueprintResource` | DELETE | `/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}` | deleteBlueprintResource |
| `listBlueprintJobs` | GET | `/v2/blueprint-manifest/jobs` | List Blueprint Jobs |
| `getBlueprintJob` | GET | `/v2/blueprint-manifest/jobs/{job_id}` | Get Job |
| `continueInstallationJob` | POST | `/v2/blueprint-manifest/jobs/{job_id}:continue` | Continue Installation Job |
| `cancelBlueprintJob` | POST | `/v2/blueprint-manifest/jobs/{job_id}:cancel` | Cancel Blueprint Job |

## Usage

```bash
epilot blueprint-manifest getJob
```
