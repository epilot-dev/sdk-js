import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequest = Schemas.Error;
        export type NotFound = Schemas.Error;
        export type Unauthorized = Schemas.Error;
        export type UnprocessableEntity = /**
         * Returned (422) when the org inventory contains no capturable resources
         * after filtering out sensitive, unsupported, and excluded types. The
         * `skipped_types` array explains why every type was dropped.
         *
         */
        Schemas.EmptyInventoryError;
    }
    namespace Schemas {
        export interface CallerIdentity {
            name: string;
            user_id?: string;
            token_id?: string;
        }
        /**
         * Request body for `captureOrgSnapshot`. All fields optional — an empty body
         * snapshots the whole org with a default name and the 90-day default TTL.
         *
         */
        export interface CreateOrgSnapshotRequest {
            /**
             * Snapshot name. Defaults to "Org snapshot — <ISO timestamp>".
             */
            name?: string;
            /**
             * Retention window. Converted to an absolute `expires_at` at creation
             * time. Omit for the default 90-day TTL.
             *
             */
            retention?: {
                value: number;
                unit: "days" | "weeks" | "months";
            };
            /**
             * Resource types to exclude from the capture, in addition to the
             * always-excluded sensitive types (`access_token`,
             * `environment_variable`).
             *
             */
            excluded_types?: string[];
        }
        export interface CreateSnapshotRequest {
            name: string;
            description?: string;
            /**
             * What initiated this snapshot. `scheduled` is used for automatic
             * nightly backups triggered by an org's EventBridge schedule
             * (RFC — Scheduled org snapshots).
             *
             */
            trigger?: "manual" | "sync" | "blueprint_install" | "scheduled";
            /**
             * Required iff `trigger === 'blueprint_install'`; forbidden otherwise.
             * Identifies the destination blueprint instance whose install this
             * snapshot covers. Used at restore time as the join key for the
             * lineage-driven delete sweep.
             *
             */
            blueprint_instance_id?: string;
            /**
             * List of resources to capture. Required non-empty for
             * `trigger === 'manual'` or `'sync'`. May be empty when
             * `trigger === 'blueprint_install'` — an install with no
             * resources to overwrite still needs a snapshot row so the
             * blueprint-manifest-api restore endpoint can find it.
             *
             */
            resources: ResourceRef[];
        }
        export interface CreateSnapshotResponse {
            id: string;
            name: string;
            status: "creating";
            created_at: string; // date-time
        }
        /**
         * Returned (422) when the org inventory contains no capturable resources
         * after filtering out sensitive, unsupported, and excluded types. The
         * `skipped_types` array explains why every type was dropped.
         *
         */
        export interface EmptyInventoryError {
            /**
             * example:
             * No capturable resources in the org inventory
             */
            message: string;
            skipped_types: {
                type: string;
                reason: string;
            }[];
        }
        export interface Error {
            status: number;
            error: string;
        }
        export interface Operation {
            type: "create" | "restore";
            started_at: string; // date-time
            completed_at?: string; // date-time
            /**
             * `partial` indicates `engine.apply` reported a partial success
             * (one or more resources failed individually) but the operation
             * as a whole did not fail.
             *
             */
            status: "in_progress" | "completed" | "partial" | "failed";
            error?: string;
            triggered_by: CallerIdentity;
        }
        export interface ResourceRef {
            /**
             * Resource type (e.g., custom_variable, journey, automation_flow)
             */
            type: string;
            id: string;
        }
        /**
         * Apply a captured snapshot to its source org. snapshot-api applies the
         * manifest verbatim minus any target ids the caller pre-decided to skip.
         * Drift detection (skip modified-since-install) is the caller's
         * responsibility — blueprint-manifest-api owns that logic for blueprint
         * restores; Config Hub's manual restore just omits the field.
         *
         */
        export interface RestoreSnapshotRequest {
            /**
             * Target ids the caller has decided not to restore. snapshot-api
             * applies the manifest minus these ids. Drops are silent — the
             * caller supplied the list and already knows.
             *
             */
            exclude_target_ids?: string[];
        }
        export interface RestoreSnapshotResponse {
            id: string;
            status: "restoring";
        }
        export interface Snapshot {
            id: string;
            org_id: string;
            name: string;
            description?: string;
            trigger: "manual" | "sync" | "blueprint_install" | "scheduled";
            /**
             * Set iff `trigger === 'blueprint_install'`. The destination blueprint
             * instance this snapshot covers.
             *
             */
            blueprint_instance_id?: string;
            /**
             * Resource type → count of resources of that type in the snapshot.
             */
            resource_counts: {
                [name: string]: number;
            };
            create: Operation;
            restores: Operation[];
            /**
             * Number of `resource` filter pairs from the request that are
             * contained in this snapshot. Present only on `listSnapshots`
             * responses where the caller passed at least one `resource`
             * filter — absent on `getSnapshot` and on unfiltered list calls.
             * Drives the coverage badge in Config Hub's snapshot picker.
             *
             */
            matched_count?: number;
            /**
             * Capture scope. `selection` (default for manual/sync/blueprint_install)
             * means only the explicitly listed resources were snapshotted.
             * `org` means a full org inventory was discovered and captured
             * (scheduled snapshots set this automatically).
             *
             */
            scope?: "selection" | "org";
            /**
             * ISO-8601 timestamp after which this snapshot will be deleted.
             * Derived from the org's retention setting at capture time for
             * scheduled snapshots; not set for manual snapshots (which use
             * a hardcoded 90-day TTL written directly as a DynamoDB `ttl` epoch).
             *
             */
            expires_at?: string; // date-time
            /**
             * Per-snapshot coverage report set by the capture worker on completion.
             * Records how many resources were attempted, captured, skipped
             * (unsupported type or explicitly excluded), and failed.
             *
             */
            capture_summary?: {
                /**
                 * Total resources in the inventory that were attempted.
                 */
                total: number;
                /**
                 * Resources successfully fetched and written to the manifest.
                 */
                captured: number;
                /**
                 * Resources skipped — type not supported by config-engine or
                 * excluded from capture (e.g. access_token, environment_variable).
                 *
                 */
                skipped: number;
                /**
                 * Resources where the fetch call returned an error.
                 */
                failed: number;
            };
        }
        /**
         * A single captured resource with its full payload. The identity fields
         * match `SnapshotResourceSummary`; the `captured` payload is the
         * pre-install state at snapshot time.
         *
         */
        export interface SnapshotResourceDetail {
            lineage_id: string;
            target_id: string;
            type: string;
            name?: string | null;
            /**
             * Full captured payload of the resource at snapshot time.
             */
            captured: {
                [name: string]: any;
            };
        }
        export interface SnapshotResourceList {
            resources: /**
             * Lightweight identity for a captured resource. Returned by
             * `listSnapshotResources`; the full payload is fetched separately via
             * `getSnapshotResource` when needed.
             *
             */
            SnapshotResourceSummary[];
        }
        /**
         * Lightweight identity for a captured resource. Returned by
         * `listSnapshotResources`; the full payload is fetched separately via
         * `getSnapshotResource` when needed.
         *
         */
        export interface SnapshotResourceSummary {
            /**
             * Deprecated alias of `target_id`. Always equals `target_id` (the
             * implementation never distinguished them). Use `target_id`.
             *
             */
            lineage_id: string;
            /**
             * Identifier the resource was captured by (passed in via `ResourceRef.id` on createSnapshot).
             */
            target_id: string;
            type: string;
            /**
             * Best-effort display name extracted from the captured payload
             * (`name` / `title` / `label` / `key` in that order). Null when
             * none of those fields are present.
             *
             */
            name?: string | null;
        }
    }
}
declare namespace Paths {
    namespace CaptureOrgSnapshot {
        export type RequestBody = /**
         * Request body for `captureOrgSnapshot`. All fields optional — an empty body
         * snapshots the whole org with a default name and the 90-day default TTL.
         *
         */
        Components.Schemas.CreateOrgSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.CreateSnapshotResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $422 = Components.Responses.UnprocessableEntity;
        }
    }
    namespace CreateSnapshot {
        export type RequestBody = Components.Schemas.CreateSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.CreateSnapshotResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace DeleteSnapshot {
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.Snapshot;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSnapshotResource {
        namespace Responses {
            export type $200 = /**
             * A single captured resource with its full payload. The identity fields
             * match `SnapshotResourceSummary`; the `captured` payload is the
             * pre-install state at snapshot time.
             *
             */
            Components.Schemas.SnapshotResourceDetail;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListDependencies {
        export interface RequestBody {
            resources: Components.Schemas.ResourceRef[];
        }
        namespace Responses {
            export interface $200 {
                dependencies: Components.Schemas.ResourceRef[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $501 = Components.Schemas.Error;
        }
    }
    namespace ListSnapshotResources {
        namespace Responses {
            export type $200 = Components.Schemas.SnapshotResourceList;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListSnapshots {
        namespace Parameters {
            export type Cursor = string;
            export type Resource = string /* ^[^:]+:.+$ */[];
            export type Size = number;
            export type Trigger = "manual" | "sync" | "blueprint_install" | "scheduled";
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            resource?: Parameters.Resource;
            trigger?: Parameters.Trigger;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Number of items in this page (not the total across all pages).
                 */
                page_size: number;
                /**
                 * Pagination cursor; pass to the next request to get the next page.
                 */
                cursor?: string;
                results: Components.Schemas.Snapshot[];
            }
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace RestoreSnapshot {
        export type RequestBody = /**
         * Apply a captured snapshot to its source org. snapshot-api applies the
         * manifest verbatim minus any target ids the caller pre-decided to skip.
         * Drift detection (skip modified-since-install) is the caller's
         * responsibility — blueprint-manifest-api owns that logic for blueprint
         * restores; Config Hub's manual restore just omits the field.
         *
         */
        Components.Schemas.RestoreSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.RestoreSnapshotResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace V1Snapshots$Id {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1Snapshots$IdResources {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1Snapshots$IdResources$LineageId {
        namespace Parameters {
            export type Id = string;
            export type LineageId = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
            lineage_id: Parameters.LineageId;
        }
    }
    namespace V1Snapshots$IdRestore {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
}


export interface OperationMethods {
  /**
   * listSnapshots - listSnapshots
   * 
   * List snapshots for the caller's organization, newest first.
   * 
   * Pass `resource=<type>:<id>` one or more times to filter to snapshots
   * containing **any** of the listed resources (OR semantics). Each returned
   * snapshot includes a `matched_count` indicating how many of the filter
   * pairs are present in it. Hard cap of 50 filter pairs per request. When
   * filtered, pagination is not applied — the result set is bounded.
   * 
   */
  'listSnapshots'(
    parameters?: Parameters<Paths.ListSnapshots.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSnapshots.Responses.$200>
  /**
   * createSnapshot - createSnapshot
   * 
   * Create a new snapshot of the given resources. Async — returns immediately
   * with a snapshot ID; client polls `getSnapshot` until `create.status`
   * moves from `in_progress` to `completed` or `failed`.
   * 
   */
  'createSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSnapshot.Responses.$202>
  /**
   * captureOrgSnapshot - captureOrgSnapshot
   * 
   * Snapshot the caller's whole organization now. Fetches a fresh inventory
   * of the org's configuration resources from configuration-hub-api, persists
   * it as an inventory artifact, and starts a `scope: "org"` chunked capture.
   * Async — returns immediately with a snapshot ID; client polls `getSnapshot`
   * and watches `capture_summary` fill in until `create.status` moves from
   * `in_progress` to `completed` or `failed`.
   * 
   * Sensitive types (`access_token`, `environment_variable`), types with no
   * engine adapter, and any `excluded_types` are dropped from the capture and
   * recorded in the snapshot's coverage report.
   * 
   */
  'captureOrgSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CaptureOrgSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CaptureOrgSnapshot.Responses.$202>
  /**
   * getSnapshot - getSnapshot
   * 
   * Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.
   */
  'getSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSnapshot.Responses.$200>
  /**
   * deleteSnapshot - deleteSnapshot
   * 
   * Delete a snapshot's metadata and S3 manifest.
   */
  'deleteSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSnapshot.Responses.$204>
  /**
   * restoreSnapshot - restoreSnapshot
   * 
   * Restore a snapshot to the org. Async — returns immediately; client polls
   * `getSnapshot` until the latest entry in `restores` moves from
   * `in_progress` to one of `completed | partial | failed`.
   * 
   * v1: full restore only. Cherry-pick (`resources?` body filter) is an open
   * question — see RFC OQ #1.
   * 
   */
  'restoreSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
    data?: Paths.RestoreSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RestoreSnapshot.Responses.$202>
  /**
   * listSnapshotResources - listSnapshotResources
   * 
   * List the resources captured in this snapshot. Returns lightweight
   * identity fields per resource — payloads are fetched via the
   * single-resource endpoint when needed.
   * 
   * Used by Config Hub UI to render snapshot contents, and by
   * blueprint-manifest-api to partition lineage rows during a restore
   * sweep (resources in this list are touched; others are net-new).
   * 
   */
  'listSnapshotResources'(
    parameters?: Parameters<Paths.V1Snapshots$IdResources.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSnapshotResources.Responses.$200>
  /**
   * getSnapshotResource - getSnapshotResource
   * 
   * Fetch one captured resource with its full payload. For UI views
   * that diff the captured state against the current destination.
   * 
   */
  'getSnapshotResource'(
    parameters?: Parameters<Paths.V1Snapshots$IdResources$LineageId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSnapshotResource.Responses.$200>
  /**
   * listDependencies - listDependencies
   * 
   * Walk the dependency tree for a set of resources and return the full
   * transitive closure, topologically sorted.
   * 
   * **Not implemented in v1.** Returns 501. Callers should pass an explicit
   * resource list to `createSnapshot`. See RFC Phase 5.
   * 
   */
  'listDependencies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ListDependencies.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDependencies.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/snapshots']: {
    /**
     * createSnapshot - createSnapshot
     * 
     * Create a new snapshot of the given resources. Async — returns immediately
     * with a snapshot ID; client polls `getSnapshot` until `create.status`
     * moves from `in_progress` to `completed` or `failed`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSnapshot.Responses.$202>
    /**
     * listSnapshots - listSnapshots
     * 
     * List snapshots for the caller's organization, newest first.
     * 
     * Pass `resource=<type>:<id>` one or more times to filter to snapshots
     * containing **any** of the listed resources (OR semantics). Each returned
     * snapshot includes a `matched_count` indicating how many of the filter
     * pairs are present in it. Hard cap of 50 filter pairs per request. When
     * filtered, pagination is not applied — the result set is bounded.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSnapshots.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSnapshots.Responses.$200>
  }
  ['/v1/snapshots:capture-org']: {
    /**
     * captureOrgSnapshot - captureOrgSnapshot
     * 
     * Snapshot the caller's whole organization now. Fetches a fresh inventory
     * of the org's configuration resources from configuration-hub-api, persists
     * it as an inventory artifact, and starts a `scope: "org"` chunked capture.
     * Async — returns immediately with a snapshot ID; client polls `getSnapshot`
     * and watches `capture_summary` fill in until `create.status` moves from
     * `in_progress` to `completed` or `failed`.
     * 
     * Sensitive types (`access_token`, `environment_variable`), types with no
     * engine adapter, and any `excluded_types` are dropped from the capture and
     * recorded in the snapshot's coverage report.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CaptureOrgSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CaptureOrgSnapshot.Responses.$202>
  }
  ['/v1/snapshots/{id}']: {
    /**
     * getSnapshot - getSnapshot
     * 
     * Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSnapshot.Responses.$200>
    /**
     * deleteSnapshot - deleteSnapshot
     * 
     * Delete a snapshot's metadata and S3 manifest.
     */
    'delete'(
      parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSnapshot.Responses.$204>
  }
  ['/v1/snapshots/{id}:restore']: {
    /**
     * restoreSnapshot - restoreSnapshot
     * 
     * Restore a snapshot to the org. Async — returns immediately; client polls
     * `getSnapshot` until the latest entry in `restores` moves from
     * `in_progress` to one of `completed | partial | failed`.
     * 
     * v1: full restore only. Cherry-pick (`resources?` body filter) is an open
     * question — see RFC OQ #1.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
      data?: Paths.RestoreSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RestoreSnapshot.Responses.$202>
  }
  ['/v1/snapshots/{id}/resources']: {
    /**
     * listSnapshotResources - listSnapshotResources
     * 
     * List the resources captured in this snapshot. Returns lightweight
     * identity fields per resource — payloads are fetched via the
     * single-resource endpoint when needed.
     * 
     * Used by Config Hub UI to render snapshot contents, and by
     * blueprint-manifest-api to partition lineage rows during a restore
     * sweep (resources in this list are touched; others are net-new).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$IdResources.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSnapshotResources.Responses.$200>
  }
  ['/v1/snapshots/{id}/resources/{lineage_id}']: {
    /**
     * getSnapshotResource - getSnapshotResource
     * 
     * Fetch one captured resource with its full payload. For UI views
     * that diff the captured state against the current destination.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$IdResources$LineageId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSnapshotResource.Responses.$200>
  }
  ['/v1/snapshots:list-dependencies']: {
    /**
     * listDependencies - listDependencies
     * 
     * Walk the dependency tree for a set of resources and return the full
     * transitive closure, topologically sorted.
     * 
     * **Not implemented in v1.** Returns 501. Callers should pass an explicit
     * resource list to `createSnapshot`. See RFC Phase 5.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ListDependencies.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDependencies.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CallerIdentity = Components.Schemas.CallerIdentity;
export type CreateOrgSnapshotRequest = Components.Schemas.CreateOrgSnapshotRequest;
export type CreateSnapshotRequest = Components.Schemas.CreateSnapshotRequest;
export type CreateSnapshotResponse = Components.Schemas.CreateSnapshotResponse;
export type EmptyInventoryError = Components.Schemas.EmptyInventoryError;
export type Error = Components.Schemas.Error;
export type Operation = Components.Schemas.Operation;
export type ResourceRef = Components.Schemas.ResourceRef;
export type RestoreSnapshotRequest = Components.Schemas.RestoreSnapshotRequest;
export type RestoreSnapshotResponse = Components.Schemas.RestoreSnapshotResponse;
export type Snapshot = Components.Schemas.Snapshot;
export type SnapshotResourceDetail = Components.Schemas.SnapshotResourceDetail;
export type SnapshotResourceList = Components.Schemas.SnapshotResourceList;
export type SnapshotResourceSummary = Components.Schemas.SnapshotResourceSummary;
