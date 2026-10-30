# @epilot/blueprint-manifest-client

## 6.0.0

### Major Changes

- Remove the operations of the retired Terraform (V2) engine, which the API no longer serves:
  `installBlueprint`, `exportBlueprint`, `validateBlueprint`, `publishBlueprint`, and the patch
  operations (`createPatch`, `getPatch`, `listPatches`, `applyPatch`, `detectPatchChanges`,
  `retryPatchOrg`).

### Minor Changes

- Add the async restore preview: `triggerRestorePreview` (`POST …/deployments/{job_id}:restore-preview`)
  and `getRestorePreviewReport` (`GET …/deployments/{job_id}/restore-preview/{preview_id}`), with the
  `RestorePreviewReport` schema.
- Add the blueprint update merge-plan operations (`getBlueprintMergePlan`,
  `listBlueprintMergePlanResources`, `getBlueprintMergePlanResource`,
  `updateBlueprintMergePlanResolutions`, `discardBlueprintMergePlan`, `replanBlueprintMergePlan`,
  `applyBlueprintMergePlan`, `previewBlueprintMergeRevert`, `applyBlueprintMergeRevert`).

## 5.6.0

### Minor Changes

- Add the session-continuity surface for long V3 installs: `session_credentials` on
  `installBlueprintV3`, `source_auth_token` on `continueInstallationJob`, and the
  `REAUTH_REQUIRED` job status. All additive — existing callers are unaffected.

## 3.3.1

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 3.1.1

### Patch Changes

- Mark access as public for all packages

## 3.1.0

### Minor Changes

- Minor version bump for all client packages
