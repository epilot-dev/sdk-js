/* Auto-copied from configuration-hub-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type ConfigId = string;
        export type ConfigType = /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        Schemas.ResourceType;
        export type CursorParam = string;
        export type SizeParam = number;
        export type SyncJobId = string;
    }
    export interface PathParameters {
        ConfigType?: Parameters.ConfigType;
        ConfigId?: Parameters.ConfigId;
        SyncJobId?: Parameters.SyncJobId;
    }
    export interface QueryParameters {
        CursorParam?: Parameters.CursorParam;
        SizeParam?: Parameters.SizeParam;
    }
    namespace Schemas {
        /**
         * Cursor-paginated list of configs referenced by a given config
         */
        export interface ConfigDependenciesResponse {
            /**
             * Total number of dependencies found (if known)
             */
            total?: number;
            /**
             * Cursor for fetching the next page. Absent when no more pages.
             */
            next_cursor?: string;
            results: /* Summary metadata for a single configuration item in the tree */ ConfigNode[];
        }
        /**
         * Cursor-paginated list of configs for a specific type
         */
        export interface ConfigListResponse {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            label: string;
            icon: string;
            /**
             * Total number of configs of this type (if known)
             */
            total?: number;
            /**
             * Cursor for fetching the next page. Absent when no more pages.
             */
            next_cursor?: string;
            results: /* Summary metadata for a single configuration item in the tree */ ConfigNode[];
        }
        /**
         * Summary metadata for a single configuration item in the tree
         */
        export interface ConfigNode {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Unique identifier
             */
            id: string;
            /**
             * Display name
             */
            title: string;
            /**
             * Last modified timestamp
             */
            updated_at?: string; // date-time
            /**
             * User who last modified this config
             */
            updated_by?: string;
            /**
             * Tags / labels
             */
            tags?: string[];
            /**
             * Alternative identifiers (short IDs, slugs, variable keys) used in cross-references
             */
            aliases?: string[];
            /**
             * Business purposes
             */
            purposes?: string[];
            /**
             * Direct link to open this config in epilot
             */
            link?: string; // uri
            /**
             * Whether this config is currently active/enabled (omitted when not applicable)
             */
            active?: boolean;
            /**
             * Installed blueprints that produced this config (tagged during the rebuild lineage pass)
             */
            blueprints?: {
                id: string;
                title: string;
            }[];
            /**
             * Type-specific metadata (e.g., submission count for journeys)
             */
            metadata?: {
                [name: string]: any;
            };
        }
        /**
         * Static metadata for a config type folder in the tree.
         * No downstream API calls — just type + label + icon + source API info.
         *
         */
        export interface ConfigTypeInfo {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Display label
             * example:
             * Journeys
             */
            label: string;
            /**
             * Frontend icon name
             * example:
             * Route
             */
            icon: string;
            /**
             * Base URL of the epilot API that owns this resource type
             * example:
             * https://journey.sls.epilot.io
             */
            source_api: string;
            /**
             * @epilot/sdk subpath for fetching full config payloads
             * example:
             * @epilot/sdk/journey
             */
            sdk_client: string;
        }
        export interface ErrorResponse {
            status: number;
            error: string;
        }
        /**
         * Result of an index rebuild operation
         */
        export interface IndexRebuildResponse {
            status: "ready" | "building" | "failed" | "already_building";
            last_built_at?: string; // date-time
            total_items?: number;
            build_duration_ms?: number;
            failed_types?: string[];
        }
        /**
         * Current index build state
         */
        export interface IndexStatusResponse {
            status: "missing" | "building" | "ready" | "failed";
            last_built_at?: string; // date-time
            total_items?: number;
            build_duration_ms?: number;
        }
        /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        export type ResourceType = "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token";
        /**
         * Direction of the sync, derived from the source/target pane selection in the
         * configuration hub UI.
         *
         */
        export type SyncDirection = "push" | "pull";
        /**
         * Sync job header as surfaced by `getSyncJob` and the create response. The
         * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
         *
         */
        export interface SyncJob {
            id: string;
            name?: string;
            status: /**
             * Lifecycle status of a sync job. See `docs/sync/INTERFACES.md` for state
             * transitions.
             *
             */
            SyncJobStatus;
            direction: /**
             * Direction of the sync, derived from the source/target pane selection in the
             * configuration hub UI.
             *
             */
            SyncDirection;
            source_org_id: string;
            target_org_id: string;
            dry_run: boolean;
            counts: /* Aggregate counters by resource status. */ SyncJobCounts;
            current_phase?: /**
             * Three-phase orchestrator phase. `phase_0` fetches source payloads,
             * `phase_a` creates/matches with topological batches, `phase_a5` resolves
             * derived references, `phase_b` patches with the full ID map, `finalize`
             * runs cycle-breaking finalizers.
             *
             */
            SyncPhase;
            current_batch?: /* Position within the current topological batch for the active phase. */ SyncJobBatch;
            started_at: string; // date-time
            finished_at?: string; // date-time
            /**
             * Most recent events (capped server-side, typically last 10).
             */
            events?: /**
             * Activity-log entry surfaced to the frontend. Backed by the op-log rows in
             * the index table (`SYNC#<jobId>#OP#<seq>`).
             *
             */
            SyncJobEvent[];
            /**
             * Up to 20 sample error messages from failed resources.
             */
            errors_sample?: [
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?,
                {
                    type: string;
                    source_id: string;
                    error: string;
                }?
            ];
        }
        /**
         * Position within the current topological batch for the active phase.
         */
        export interface SyncJobBatch {
            /**
             * Zero-based index of the batch currently executing.
             */
            index: number;
            /**
             * Total number of batches in the current phase.
             */
            of: number;
            /**
             * Dependency level (matches `dependencyLevel` from the topological sort).
             */
            level: number;
        }
        /**
         * Aggregate counters by resource status.
         */
        export interface SyncJobCounts {
            total: number;
            pending: number;
            in_progress: number;
            succeeded: number;
            failed: number;
            skipped_unchanged: number;
        }
        /**
         * Activity-log entry surfaced to the frontend. Backed by the op-log rows in
         * the index table (`SYNC#<jobId>#OP#<seq>`).
         *
         */
        export interface SyncJobEvent {
            /**
             * Monotonic sequence number assigned at write time.
             */
            seq: number;
            ts: string; // date-time
            phase?: /**
             * Three-phase orchestrator phase. `phase_0` fetches source payloads,
             * `phase_a` creates/matches with topological batches, `phase_a5` resolves
             * derived references, `phase_b` patches with the full ID map, `finalize`
             * runs cycle-breaking finalizers.
             *
             */
            SyncPhase;
            /**
             * Resource type
             */
            type?: string;
            source_id?: string;
            target_id?: string;
            status: /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            SyncJobResourceStatus;
            message?: string;
            error?: string;
        }
        /**
         * Cursor-paginated list of sync jobs.
         */
        export interface SyncJobListResponse {
            next_cursor?: string;
            results: /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            SyncJob[];
        }
        /**
         * Request body for `createSyncJob`. `target_auth_token` is the destination
         * org's auth token and MUST NOT be persisted or logged — it is `writeOnly`.
         *
         */
        export interface SyncJobRequest {
            /**
             * Org ID the resources are sourced from.
             */
            source_org_id: string;
            /**
             * Org ID the resources are written into.
             */
            target_org_id: string;
            /**
             * Destination-org auth token forwarded to adapter writes. Never returned
             * in responses and never logged.
             *
             */
            target_auth_token: string;
            /**
             * Optional human-friendly job name shown in the history list.
             */
            name?: string;
            /**
             * If true, the orchestrator runs Phase 0 + a planning pass and writes
             * `would_*` resource rows but performs no destination writes.
             *
             */
            dry_run?: boolean;
            /**
             * If true, the orchestrator expands the resource set by following
             * dependency edges discovered during Phase 0.
             *
             */
            include_dependencies?: boolean;
            /**
             * Initial resource selection. Dependencies may be added.
             */
            resources: {
                /**
                 * Resource type identifier
                 */
                type: string;
                /**
                 * Source-org resource ID
                 */
                id: string;
            }[];
        }
        /**
         * Per-resource row backed by `SyncResourcesTable`. See
         * `docs/sync/INTERFACES.md` for the DDB shape.
         *
         */
        export interface SyncJobResource {
            type: string;
            source_id: string;
            target_id?: string;
            status: /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            SyncJobResourceStatus;
            phase: /**
             * Three-phase orchestrator phase. `phase_0` fetches source payloads,
             * `phase_a` creates/matches with topological batches, `phase_a5` resolves
             * derived references, `phase_b` patches with the full ID map, `finalize`
             * runs cycle-breaking finalizers.
             *
             */
            SyncPhase;
            attempt: number;
            error?: string;
            updated_at: string; // date-time
        }
        /**
         * Cursor-paginated list of sync job resources.
         */
        export interface SyncJobResourceListResponse {
            next_cursor?: string;
            results: /**
             * Per-resource row backed by `SyncResourcesTable`. See
             * `docs/sync/INTERFACES.md` for the DDB shape.
             *
             */
            SyncJobResource[];
        }
        /**
         * Per-resource status. `would_*` values are produced by dry-run jobs.
         *
         */
        export type SyncJobResourceStatus = "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed";
        /**
         * Optional body for `retrySyncJob`. Defaults to retrying every failed
         * resource of the original job.
         *
         */
        export interface SyncJobRetryRequest {
            /**
             * Map of `<type>:<source_id>` → partial payload patch. Applied on top of
             * the originally fetched payload before re-running Phase A.
             *
             */
            payload_overrides?: {
                [name: string]: any;
            };
        }
        /**
         * Lifecycle status of a sync job. See `docs/sync/INTERFACES.md` for state
         * transitions.
         *
         */
        export type SyncJobStatus = "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled";
        /**
         * Three-phase orchestrator phase. `phase_0` fetches source payloads,
         * `phase_a` creates/matches with topological batches, `phase_a5` resolves
         * derived references, `phase_b` patches with the full ID map, `finalize`
         * runs cycle-breaking finalizers.
         *
         */
        export type SyncPhase = "phase_0" | "phase_a" | "phase_a5" | "phase_b" | "finalize";
    }
}
export declare namespace Paths {
    namespace CreateSyncJob {
        export type RequestBody = /**
         * Request body for `createSyncJob`. `target_auth_token` is the destination
         * org's auth token and MUST NOT be persisted or logged — it is `writeOnly`.
         *
         */
        Components.Schemas.SyncJobRequest;
        namespace Responses {
            export type $201 = /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            Components.Schemas.SyncJob;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetConfigDependencies {
        namespace Parameters {
            export type Cursor = string;
            export type Id = string;
            export type Size = number;
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
        }
        export interface PathParameters {
            type: Parameters.Type;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of configs referenced by a given config */ Components.Schemas.ConfigDependenciesResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetConfigUsedBy {
        namespace Parameters {
            export type Id = string;
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
        }
        export interface PathParameters {
            type: Parameters.Type;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of configs referenced by a given config */ Components.Schemas.ConfigDependenciesResponse;
        }
    }
    namespace GetIndex {
        namespace Responses {
            export type $200 = /* Current index build state */ Components.Schemas.IndexStatusResponse;
        }
    }
    namespace GetSyncJob {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            Components.Schemas.SyncJob;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListConfigTypes {
        namespace Responses {
            export interface $200 {
                results: /**
                 * Static metadata for a config type folder in the tree.
                 * No downstream API calls — just type + label + icon + source API info.
                 *
                 */
                Components.Schemas.ConfigTypeInfo[];
            }
        }
    }
    namespace ListConfigs {
        namespace Parameters {
            export type ActiveOnly = boolean;
            export type BlueprintIds = string;
            export type Cursor = string;
            export type Purposes = string;
            export type Q = string;
            export type Size = number;
            export type Sort = "updated_at" | "usage";
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
            export type UpdatedAfter = string; // date-time
            export type UpdatedBefore = string; // date-time
        }
        export interface PathParameters {
            type: Parameters.Type;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            q?: Parameters.Q;
            updated_after?: Parameters.UpdatedAfter /* date-time */;
            updated_before?: Parameters.UpdatedBefore /* date-time */;
            purposes?: Parameters.Purposes;
            blueprint_ids?: Parameters.BlueprintIds;
            sort?: Parameters.Sort;
            active_only?: Parameters.ActiveOnly;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of configs for a specific type */ Components.Schemas.ConfigListResponse;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListSyncJobResources {
        namespace Parameters {
            export type Cursor = string;
            export type Id = string;
            export type Size = number;
            export type Status = /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            Components.Schemas.SyncJobResourceStatus;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of sync job resources. */ Components.Schemas.SyncJobResourceListResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListSyncJobs {
        namespace Parameters {
            export type Cursor = string;
            export type Size = number;
            export type Status = /**
             * Lifecycle status of a sync job. See `docs/sync/INTERFACES.md` for state
             * transitions.
             *
             */
            Components.Schemas.SyncJobStatus;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of sync jobs. */ Components.Schemas.SyncJobListResponse;
        }
    }
    namespace RebuildIndex {
        namespace Responses {
            export type $200 = /* Result of an index rebuild operation */ Components.Schemas.IndexRebuildResponse;
        }
    }
    namespace RetrySyncJob {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /**
         * Optional body for `retrySyncJob`. Defaults to retrying every failed
         * resource of the original job.
         *
         */
        Components.Schemas.SyncJobRetryRequest;
        namespace Responses {
            export type $201 = /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            Components.Schemas.SyncJob;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * listConfigTypes - listConfigTypes
   * 
   * Returns the static list of available configuration types with display metadata.
   * This is a cheap call — no fan-out to downstream APIs. Returns all known types
   * with labels and icons. The frontend should then call `listConfigs` separately
   * for each type it wants to load.
   * 
   */
  'listConfigTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigTypes.Responses.$200>
  /**
   * listConfigs - listConfigs
   * 
   * List configs of a given type with pagination. Returns summary metadata only
   * (not full payloads). The frontend calls this per type folder when expanding.
   * 
   * Supports offset-based pagination via `from` and `size` parameters.
   * 
   */
  'listConfigs'(
    parameters?: Parameters<Paths.ListConfigs.QueryParameters & Paths.ListConfigs.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigs.Responses.$200>
  /**
   * getConfigDependencies - getConfigDependencies
   * 
   * Get configs that are referenced by the given config.
   * Used to render children when expanding a config node in the tree.
   * 
   * Resolves dependencies by fetching the config payload server-side and scanning
   * for references (UUIDs, source IDs, slug-based references).
   * 
   */
  'getConfigDependencies'(
    parameters?: Parameters<Paths.GetConfigDependencies.QueryParameters & Paths.GetConfigDependencies.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigDependencies.Responses.$200>
  /**
   * getConfigUsedBy - getConfigUsedBy
   * 
   * Get configs that reference the given config (reverse dependencies).
   * Scans the indexed config items for references to this config's ID or aliases.
   * 
   */
  'getConfigUsedBy'(
    parameters?: Parameters<Paths.GetConfigUsedBy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigUsedBy.Responses.$200>
  /**
   * getIndex - getIndex
   * 
   * Return the current index build state for the caller's organization.
   * Clients poll this to decide whether to show a "building" indicator
   * and when to refetch data.
   * 
   */
  'getIndex'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetIndex.Responses.$200>
  /**
   * listSyncJobs - listSyncJobs
   * 
   * List sync jobs scoped to the caller's organization, paginated with an opaque
   * cursor. Defaults to most-recent first.
   * 
   */
  'listSyncJobs'(
    parameters?: Parameters<Paths.ListSyncJobs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSyncJobs.Responses.$200>
  /**
   * createSyncJob - createSyncJob
   * 
   * Create a new cross-org sync job. The job is enqueued for asynchronous execution
   * by the worker Lambda; the response returns the persisted job header with status
   * `pending`.
   * 
   * See `docs/sync/INTERFACES.md` for the locked request/response contract.
   * 
   */
  'createSyncJob'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSyncJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSyncJob.Responses.$201>
  /**
   * getSyncJob - getSyncJob
   * 
   * Fetch a single sync job by ID. Returns the job header, counts summary,
   * current phase pointer, and the latest activity events. Frontend polls this
   * endpoint with a ramping interval.
   * 
   */
  'getSyncJob'(
    parameters?: Parameters<Paths.GetSyncJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncJob.Responses.$200>
  /**
   * retrySyncJob - retrySyncJob
   * 
   * Retry the failed resources from a prior sync job. Creates a new job whose
   * scope is the failed `(type, source_id)` set of the original job and enqueues
   * it for execution. Optionally accepts inline payload overrides.
   * 
   */
  'retrySyncJob'(
    parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
    data?: Paths.RetrySyncJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  /**
   * listSyncJobResources - listSyncJobResources
   * 
   * List the per-resource rows for a sync job. Supports filtering by status
   * (e.g. `failed`) and cursor pagination. Used by the failures table and the
   * dry-run plan view in the frontend.
   * 
   */
  'listSyncJobResources'(
    parameters?: Parameters<Paths.ListSyncJobResources.QueryParameters & Paths.ListSyncJobResources.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSyncJobResources.Responses.$200>
  /**
   * rebuildIndex - rebuildIndex
   * 
   * Rebuild the configuration index for the caller's organization.
   * Fire-and-forget: invokes the async worker and returns immediately.
   * A new rebuild will cancel any in-flight build (see `build_token`).
   * 
   */
  'rebuildIndex'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RebuildIndex.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/configs/types']: {
    /**
     * listConfigTypes - listConfigTypes
     * 
     * Returns the static list of available configuration types with display metadata.
     * This is a cheap call — no fan-out to downstream APIs. Returns all known types
     * with labels and icons. The frontend should then call `listConfigs` separately
     * for each type it wants to load.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigTypes.Responses.$200>
  }
  ['/v1/configs/{type}']: {
    /**
     * listConfigs - listConfigs
     * 
     * List configs of a given type with pagination. Returns summary metadata only
     * (not full payloads). The frontend calls this per type folder when expanding.
     * 
     * Supports offset-based pagination via `from` and `size` parameters.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConfigs.QueryParameters & Paths.ListConfigs.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigs.Responses.$200>
  }
  ['/v1/configs/{type}/{id}/dependencies']: {
    /**
     * getConfigDependencies - getConfigDependencies
     * 
     * Get configs that are referenced by the given config.
     * Used to render children when expanding a config node in the tree.
     * 
     * Resolves dependencies by fetching the config payload server-side and scanning
     * for references (UUIDs, source IDs, slug-based references).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigDependencies.QueryParameters & Paths.GetConfigDependencies.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigDependencies.Responses.$200>
  }
  ['/v1/configs/{type}/{id}/used_by']: {
    /**
     * getConfigUsedBy - getConfigUsedBy
     * 
     * Get configs that reference the given config (reverse dependencies).
     * Scans the indexed config items for references to this config's ID or aliases.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigUsedBy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigUsedBy.Responses.$200>
  }
  ['/v1/configs/index']: {
    /**
     * getIndex - getIndex
     * 
     * Return the current index build state for the caller's organization.
     * Clients poll this to decide whether to show a "building" indicator
     * and when to refetch data.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetIndex.Responses.$200>
  }
  ['/v1/configs/sync-jobs']: {
    /**
     * createSyncJob - createSyncJob
     * 
     * Create a new cross-org sync job. The job is enqueued for asynchronous execution
     * by the worker Lambda; the response returns the persisted job header with status
     * `pending`.
     * 
     * See `docs/sync/INTERFACES.md` for the locked request/response contract.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSyncJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSyncJob.Responses.$201>
    /**
     * listSyncJobs - listSyncJobs
     * 
     * List sync jobs scoped to the caller's organization, paginated with an opaque
     * cursor. Defaults to most-recent first.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSyncJobs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSyncJobs.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}']: {
    /**
     * getSyncJob - getSyncJob
     * 
     * Fetch a single sync job by ID. Returns the job header, counts summary,
     * current phase pointer, and the latest activity events. Frontend polls this
     * endpoint with a ramping interval.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSyncJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncJob.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/retry']: {
    /**
     * retrySyncJob - retrySyncJob
     * 
     * Retry the failed resources from a prior sync job. Creates a new job whose
     * scope is the failed `(type, source_id)` set of the original job and enqueues
     * it for execution. Optionally accepts inline payload overrides.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
      data?: Paths.RetrySyncJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  }
  ['/v1/configs/sync-jobs/{id}/resources']: {
    /**
     * listSyncJobResources - listSyncJobResources
     * 
     * List the per-resource rows for a sync job. Supports filtering by status
     * (e.g. `failed`) and cursor pagination. Used by the failures table and the
     * dry-run plan view in the frontend.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSyncJobResources.QueryParameters & Paths.ListSyncJobResources.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSyncJobResources.Responses.$200>
  }
  ['/v1/configs/index:rebuild']: {
    /**
     * rebuildIndex - rebuildIndex
     * 
     * Rebuild the configuration index for the caller's organization.
     * Fire-and-forget: invokes the async worker and returns immediately.
     * A new rebuild will cancel any in-flight build (see `build_token`).
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RebuildIndex.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ConfigDependenciesResponse = Components.Schemas.ConfigDependenciesResponse;
export type ConfigListResponse = Components.Schemas.ConfigListResponse;
export type ConfigNode = Components.Schemas.ConfigNode;
export type ConfigTypeInfo = Components.Schemas.ConfigTypeInfo;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type IndexRebuildResponse = Components.Schemas.IndexRebuildResponse;
export type IndexStatusResponse = Components.Schemas.IndexStatusResponse;
export type ResourceType = Components.Schemas.ResourceType;
export type SyncDirection = Components.Schemas.SyncDirection;
export type SyncJob = Components.Schemas.SyncJob;
export type SyncJobBatch = Components.Schemas.SyncJobBatch;
export type SyncJobCounts = Components.Schemas.SyncJobCounts;
export type SyncJobEvent = Components.Schemas.SyncJobEvent;
export type SyncJobListResponse = Components.Schemas.SyncJobListResponse;
export type SyncJobRequest = Components.Schemas.SyncJobRequest;
export type SyncJobResource = Components.Schemas.SyncJobResource;
export type SyncJobResourceListResponse = Components.Schemas.SyncJobResourceListResponse;
export type SyncJobResourceStatus = Components.Schemas.SyncJobResourceStatus;
export type SyncJobRetryRequest = Components.Schemas.SyncJobRetryRequest;
export type SyncJobStatus = Components.Schemas.SyncJobStatus;
export type SyncPhase = Components.Schemas.SyncPhase;
