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
    }
    namespace Schemas {
        export interface CallerIdentity {
            name: string;
            user_id?: string;
            token_id?: string;
        }
        export interface CreateSnapshotRequest {
            name: string;
            description?: string;
            /**
             * What initiated this snapshot. `scheduled` may be added in a later
             * phase for nightly backups (RFC OQ #3).
             *
             */
            trigger?: "manual" | "sync" | "blueprint_install";
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
        export interface Error {
            status: number;
            error: string;
        }
        export interface Operation {
            type: "create" | "restore";
            started_at: string; // date-time
            completed_at?: string; // date-time
            status: "in_progress" | "completed" | "failed";
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
        export interface RestoreSnapshotResponse {
            id: string;
            status: "restoring";
        }
        export interface Snapshot {
            id: string;
            org_id: string;
            name: string;
            description?: string;
            trigger: "manual" | "sync" | "blueprint_install";
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
             * Cross-service correlation key — matches the lineage row id in
             * blueprint-manifest-api's lineage table for `blueprint_install`
             * snapshots. Same as `target_id` for snapshots whose capture
             * doesn't distinguish source vs destination identifiers.
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
            export type Resource = [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            export type Size = number;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            resource?: Parameters.Resource;
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
   * `in_progress` to `completed` or `failed`.
   * 
   * v1: full restore only. Cherry-pick (`resources?` body filter) is an open
   * question — see RFC OQ #1.
   * 
   */
  'restoreSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
    data?: any,
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
     * `in_progress` to `completed` or `failed`.
     * 
     * v1: full restore only. Cherry-pick (`resources?` body filter) is an open
     * question — see RFC OQ #1.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
      data?: any,
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
export type CreateSnapshotRequest = Components.Schemas.CreateSnapshotRequest;
export type CreateSnapshotResponse = Components.Schemas.CreateSnapshotResponse;
export type Error = Components.Schemas.Error;
export type Operation = Components.Schemas.Operation;
export type ResourceRef = Components.Schemas.ResourceRef;
export type RestoreSnapshotResponse = Components.Schemas.RestoreSnapshotResponse;
export type Snapshot = Components.Schemas.Snapshot;
export type SnapshotResourceDetail = Components.Schemas.SnapshotResourceDetail;
export type SnapshotResourceList = Components.Schemas.SnapshotResourceList;
export type SnapshotResourceSummary = Components.Schemas.SnapshotResourceSummary;
