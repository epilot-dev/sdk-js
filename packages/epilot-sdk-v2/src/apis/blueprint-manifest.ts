import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/blueprint-manifest';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
  AppBlueprint,
  Blueprint,
  BlueprintDependenciesSyncJob,
  BlueprintExportJob,
  BlueprintID,
  BlueprintInstallStatus,
  BlueprintInstallationJob,
  BlueprintInstallationJobOptions,
  BlueprintJob,
  BlueprintJobEvent,
  BlueprintJobID,
  BlueprintPreview,
  BlueprintResource,
  BlueprintResourceID,
  BlueprintValidateJob,
  CallerIdentity,
  CommonBlueprintFields,
  CommonBlueprintJobFields,
  CommonImportFields,
  CommonManifestFields,
  CommonMarkdownFields,
  CommonResourceNode,
  CustomBlueprint,
  DeployedBlueprint,
  FileBlueprint,
  FormattedError,
  FormattedErrorCodes,
  FormattedErrorData,
  InstalledMarketplaceBlueprintItem,
  Job,
  JobID,
  JobStatus,
  Manifest,
  ManifestID,
  ManifestItem,
  ManifestSource,
  ManifestTimestampFields,
  MarketplaceBlueprint,
  PlanChanges,
  PreInstallRequirements,
  PutManifestPayload,
  ResourceNode,
  ResourceNodeType,
  ResourceReplacement,
  RootResourceNode,
  S3Reference,
  SelectedResources,
  UploadFilePayload,
  VirtualResourceNodeGroup,
} from '../types/blueprint-manifest';

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/blueprint-manifest-runtime.json');
  return expand((mod.default ?? mod) as CompactDefinition) as Document;
};

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition();
    _instance = createApiClient<Client>({ definition: def });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition() }),
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `blueprintManifest.someOperation(...)` calls forwarded to lazy singleton
 */
export const blueprintManifest = _handle;
