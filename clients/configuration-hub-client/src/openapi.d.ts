import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type ConfigId = string;
        export type ConfigType = /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        Schemas.ResourceType;
        export type CursorParam = string;
        export type DeleteJobId = string;
        export type SizeParam = number;
        export type SyncJobId = string;
    }
    export interface PathParameters {
        ConfigType?: Parameters.ConfigType;
        ConfigId?: Parameters.ConfigId;
        SyncJobId?: Parameters.SyncJobId;
        DeleteJobId?: Parameters.DeleteJobId;
    }
    export interface QueryParameters {
        CursorParam?: Parameters.CursorParam;
        SizeParam?: Parameters.SizeParam;
    }
    namespace Schemas {
        export interface BreakLineageResponse {
            deleted: boolean;
        }
        /**
         * Row counts per match status
         */
        export interface CompareCounts {
            matched: number;
            only_current: number;
            only_source: number;
        }
        /**
         * Provenance of a lineage-backed match
         */
        export interface CompareLineage {
            /**
             * `pull` — the caller org imported this config from the source org
             * (entry lives in the caller's lineage partition). `push` — the
             * source org imported it from the caller (entry lives in the source
             * org's partition).
             *
             */
            direction: "pull" | "push";
            last_synced_at?: string; // date-time
            last_sync_job_id?: string;
            /**
             * `manual_confirm` when the entry was created by confirming a
             * heuristic suggestion in the Compare view; absent for sync-written
             * entries.
             *
             */
            origin?: string;
        }
        /**
         * Request body for a per-type cross-org comparison
         */
        export interface CompareRequest {
            /**
             * Organization to compare the caller's org against
             */
            source_org_id: string;
            /**
             * Auth token belonging to `source_org_id` (e.g. a pipeline token).
             * Verified before any source-org data is read. Never logged.
             *
             */
            source_auth_token: string;
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
        }
        /**
         * Side-by-side comparison of one config type across two orgs
         */
        export interface CompareResponse {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            label: string;
            icon: string;
            rows: /**
             * One row of the side-by-side comparison. `matched` rows carry both
             * configs plus lineage provenance; one-sided rows carry only the side
             * the config exists on.
             *
             */
            CompareRow[];
            counts: /* Row counts per match status */ CompareCounts;
        }
        /**
         * One row of the side-by-side comparison. `matched` rows carry both
         * configs plus lineage provenance; one-sided rows carry only the side
         * the config exists on.
         *
         */
        export interface CompareRow {
            match_status: "matched" | "only_current" | "only_source";
            current?: /* Summary metadata for a single configuration item in the tree */ ConfigNode;
            source?: /* Summary metadata for a single configuration item in the tree */ ConfigNode;
            lineage?: /* Provenance of a lineage-backed match */ CompareLineage;
        }
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
         * Fresh inventory of all configuration resources for an org.
         */
        export interface ConfigInventoryResponse {
            /**
             * Unique identifier for this inventory run (UUID).
             */
            inventory_id: string;
            /**
             * Organization ID the inventory was collected for.
             */
            org_id: string;
            /**
             * ISO timestamp of when the inventory was collected.
             */
            indexed_at: string; // date-time
            /**
             * Total number of resources found across all types.
             */
            resources_count: number;
            /**
             * List of all found resources as `{ type, id }` pairs.
             */
            resources: /* Minimal identity of a single configuration resource. */ SnapshotInventoryItem[];
            /**
             * Types that failed to list or had no adapter; never fail the whole inventory.
             */
            skipped_types: /* A type that could not be listed during inventory collection. */ SnapshotInventorySkippedType[];
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
            /**
             * Whether resources of this type can be deleted via the bulk-delete API
             * example:
             * true
             */
            deletable: boolean;
        }
        /**
         * Persist a source→target lineage pairing (caller org as target)
         */
        export interface ConfirmLineageRequest {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            source_org_id: string;
            /**
             * Config id in the source org
             */
            source_id: string;
            /**
             * Config id in the caller's org to pair it with
             */
            target_id: string;
        }
        /**
         * Bulk-delete job header surfaced by `createDeleteJob`/`getDeleteJob`.
         */
        export interface DeleteJob {
            id: string;
            name?: string;
            status: /* Lifecycle status of a bulk-delete job. */ DeleteJobStatus;
            org_id: string;
            counts: /* Aggregate counters by resource delete status. */ DeleteJobCounts;
            started_at: string; // date-time
            finished_at?: string; // date-time
            /**
             * True once the worker has kicked the index rebuild on completion.
             */
            rebuild_triggered?: boolean;
        }
        /**
         * Aggregate counters by resource delete status.
         */
        export interface DeleteJobCounts {
            total: number;
            pending: number;
            in_progress: number;
            deleted: number;
            skipped: number;
            failed: number;
        }
        /**
         * Cursor-paginated list of delete jobs.
         */
        export interface DeleteJobListResponse {
            next_cursor?: string;
            results: /* Bulk-delete job header surfaced by `createDeleteJob`/`getDeleteJob`. */ DeleteJob[];
        }
        /**
         * Request body for `createDeleteJob`.
         */
        export interface DeleteJobRequest {
            /**
             * Optional human-friendly job name shown in the history list.
             */
            name?: string;
            /**
             * The resources to delete, by type + id.
             */
            resources: [
                {
                    /**
                     * Resource type identifier
                     */
                    type: string;
                    /**
                     * Resource ID
                     */
                    id: string;
                    /**
                     * Optional human-readable title captured for the failures view.
                     */
                    title?: string;
                },
                ...{
                    /**
                     * Resource type identifier
                     */
                    type: string;
                    /**
                     * Resource ID
                     */
                    id: string;
                    /**
                     * Optional human-readable title captured for the failures view.
                     */
                    title?: string;
                }[]
            ];
        }
        /**
         * Per-resource row for a delete job.
         */
        export interface DeleteJobResource {
            type: string;
            id: string;
            title?: string;
            status: /**
             * Per-resource delete status. `skipped` is used for protected resources
             * that are intentionally not deleted (e.g. built-in schemas).
             *
             */
            DeleteJobResourceStatus;
            attempt: number;
            error?: string;
            updated_at: string; // date-time
        }
        /**
         * Cursor-paginated list of delete job resources.
         */
        export interface DeleteJobResourceListResponse {
            next_cursor?: string;
            results: /* Per-resource row for a delete job. */ DeleteJobResource[];
        }
        /**
         * Per-resource delete status. `skipped` is used for protected resources
         * that are intentionally not deleted (e.g. built-in schemas).
         *
         */
        export type DeleteJobResourceStatus = "pending" | "in_progress" | "deleted" | "skipped" | "failed";
        /**
         * Lifecycle status of a bulk-delete job.
         */
        export type DeleteJobStatus = "pending" | "in_progress" | "succeeded" | "partial" | "failed" | "cancelled";
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
            /**
             * Organization the index (and the authenticated token) belongs to.
             * Echoed so callers holding a token for another org can resolve and
             * verify its identity.
             *
             */
            org_id?: string;
            last_built_at?: string; // date-time
            total_items?: number;
            build_duration_ms?: number;
        }
        /**
         * A persisted lineage entry
         */
        export interface LineageEntryResponse {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            target_org_id: string;
            source_org_id: string;
            source_id: string;
            target_id: string;
            last_synced_at?: string; // date-time
            origin?: string;
        }
        /**
         * Heuristic candidate for one source config (null candidate = no match)
         */
        export interface MatchSuggestion {
            source_id: string;
            candidate?: {
                id: string;
                title?: string;
            } | null;
        }
        /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        export type ResourceType = "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token";
        /**
         * Minimal identity of a single configuration resource.
         */
        export interface SnapshotInventoryItem {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Unique identifier of the resource
             */
            id: string;
        }
        /**
         * A type that could not be listed during inventory collection.
         */
        export interface SnapshotInventorySkippedType {
            type: string;
            reason: string;
        }
        /**
         * Request body for batched heuristic match suggestions
         */
        export interface SuggestMatchesRequest {
            source_org_id: string;
            /**
             * Auth token belonging to `source_org_id`. Never logged.
             */
            source_auth_token: string;
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Source-org config ids to find caller-org candidates for
             */
            source_ids: [
                string,
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
        }
        export interface SuggestMatchesResponse {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            suggestions: /* Heuristic candidate for one source config (null candidate = no match) */ MatchSuggestion[];
        }
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
            /**
             * Human-readable resource title captured from the source payload
             * during Phase 0. Lets clients identify rows without resolving
             * raw UUIDs. Absent on rows written before this field existed.
             *
             */
            title?: string;
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
         * Optional body for `retrySyncJob`. Defaults to retrying every unresolved
         * resource of the original job (failed, pending or in_progress).
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
declare namespace Paths {
    namespace BreakLineage {
        namespace Parameters {
            export type SourceId = string;
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
        }
        export interface QueryParameters {
            type: Parameters.Type;
            source_id: Parameters.SourceId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BreakLineageResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CancelSyncJob {
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
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CompareConfigs {
        export type RequestBody = /* Request body for a per-type cross-org comparison */ Components.Schemas.CompareRequest;
        namespace Responses {
            export type $200 = /* Side-by-side comparison of one config type across two orgs */ Components.Schemas.CompareResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ConfirmLineage {
        export type RequestBody = /* Persist a source→target lineage pairing (caller org as target) */ Components.Schemas.ConfirmLineageRequest;
        namespace Responses {
            export type $201 = /* A persisted lineage entry */ Components.Schemas.LineageEntryResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateDeleteJob {
        export type RequestBody = /* Request body for `createDeleteJob`. */ Components.Schemas.DeleteJobRequest;
        namespace Responses {
            export type $201 = /* Bulk-delete job header surfaced by `createDeleteJob`/`getDeleteJob`. */ Components.Schemas.DeleteJob;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
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
    namespace GetConfigInventory {
        namespace Parameters {
            export type IncludeDependencyOnly = boolean;
        }
        export interface QueryParameters {
            include_dependency_only?: Parameters.IncludeDependencyOnly;
        }
        namespace Responses {
            export type $200 = /* Fresh inventory of all configuration resources for an org. */ Components.Schemas.ConfigInventoryResponse;
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
    namespace GetDeleteJob {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* Bulk-delete job header surfaced by `createDeleteJob`/`getDeleteJob`. */ Components.Schemas.DeleteJob;
            export type $404 = Components.Schemas.ErrorResponse;
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
            export type Sort = "updated_at" | "usage" | "name";
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
    namespace ListDeleteJobResources {
        namespace Parameters {
            export type Cursor = string;
            export type Id = string;
            export type Size = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of delete job resources. */ Components.Schemas.DeleteJobResourceListResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListDeleteJobs {
        namespace Parameters {
            export type Cursor = string;
            export type Size = number;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of delete jobs. */ Components.Schemas.DeleteJobListResponse;
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
         * Optional body for `retrySyncJob`. Defaults to retrying every unresolved
         * resource of the original job (failed, pending or in_progress).
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
    namespace SuggestMatches {
        export type RequestBody = /* Request body for batched heuristic match suggestions */ Components.Schemas.SuggestMatchesRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestMatchesResponse;
            export type $400 = Components.Schemas.ErrorResponse;
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
   * compareConfigs - compareConfigs
   * 
   * Compare the caller org's configs of a single type against another
   * (source) org, side by side. Rows are paired via the lineage registry in
   * both sync directions (caller imported from source, or source imported
   * from caller); configs without a counterpart come back as `only_current`
   * or `only_source`.
   * 
   * `source_auth_token` must be a valid token for `source_org_id` — the
   * frontend mints one via the pipeline pairing, mirroring `createSyncJob`'s
   * `target_auth_token`. The token is verified against `source_org_id`
   * before any source-org data is read.
   * 
   * POST because the request carries a token; the operation reads only.
   * 
   */
  'compareConfigs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CompareConfigs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompareConfigs.Responses.$200>
  /**
   * suggestMatches - suggestMatches
   * 
   * Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /
   * unique key) for a batch of source-org configs that have no lineage
   * entry, and return candidate counterparts in the caller's org.
   * 
   * Suggestions are ephemeral — nothing is persisted. The client offers
   * each candidate to the user, and a confirmed pair is written via
   * `confirmLineage`. Batches are capped at 25 ids; the client pages
   * through unmatched rows across successive calls.
   * 
   */
  'suggestMatches'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SuggestMatches.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SuggestMatches.Responses.$200>
  /**
   * confirmLineage - confirmLineage
   * 
   * Persist a lineage entry pairing a source-org config with a config in
   * the caller's org — used to confirm a heuristic suggestion from the
   * Compare view. Writes to the caller org's lineage partition (caller as
   * sync target), so subsequent syncs PATCH the confirmed target instead of
   * creating a duplicate. Conflicts (an existing entry pointing at a
   * different target) return 409 so the client can refresh.
   * 
   */
  'confirmLineage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConfirmLineage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConfirmLineage.Responses.$201>
  /**
   * breakLineage - breakLineage
   * 
   * Delete a lineage entry from the caller org's partition (caller as sync
   * target), identified by `type` + `source_id`. Used to break a wrong or
   * stale match from the Compare view. Note: a future sync can re-match the
   * same pair heuristically — the entry is deleted, not blocklisted. To
   * break a match recorded in the OTHER direction, call this operation
   * authenticated as the other org (pipeline token).
   * 
   */
  'breakLineage'(
    parameters?: Parameters<Paths.BreakLineage.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BreakLineage.Responses.$200>
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
   * Retry the unresolved resources from a prior sync job: `failed` rows, plus
   * rows the original run left at `pending`/`in_progress` because it stopped
   * early. Creates a new job whose scope is that `(type, source_id)` set and
   * enqueues it for execution. Optionally accepts inline payload overrides.
   * 
   */
  'retrySyncJob'(
    parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
    data?: Paths.RetrySyncJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  /**
   * cancelSyncJob - cancelSyncJob
   * 
   * Cancel a running sync job. Marks the job `cancelled` with a `finished_at`
   * so it stops being reported as in-flight, and the worker stops at its next
   * batch boundary — phases re-read the job status and abort rather than
   * overwrite a cancellation with their own outcome.
   * 
   * Resources already written to the target are NOT rolled back; cancelling
   * stops further work. Jobs already in a terminal state are rejected with
   * 409.
   * 
   */
  'cancelSyncJob'(
    parameters?: Parameters<Paths.CancelSyncJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelSyncJob.Responses.$200>
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
   * listDeleteJobs - listDeleteJobs
   * 
   * List bulk-delete jobs scoped to the caller's organization, paginated
   * with an opaque cursor. Most-recent first.
   * 
   */
  'listDeleteJobs'(
    parameters?: Parameters<Paths.ListDeleteJobs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDeleteJobs.Responses.$200>
  /**
   * createDeleteJob - createDeleteJob
   * 
   * Create a bulk-delete job for the caller's organization. The selected
   * resources are deleted asynchronously by a worker Lambda; the response
   * returns the persisted job header with status `pending`.
   * 
   * Raw delete — no dependency checks are performed. On completion the
   * worker auto-triggers an index rebuild so the config list reflects the
   * deletions.
   * 
   */
  'createDeleteJob'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDeleteJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDeleteJob.Responses.$201>
  /**
   * getDeleteJob - getDeleteJob
   * 
   * Fetch a single bulk-delete job by ID. Returns the job header and counts
   * summary. Frontend polls this endpoint while the job runs.
   * 
   */
  'getDeleteJob'(
    parameters?: Parameters<Paths.GetDeleteJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDeleteJob.Responses.$200>
  /**
   * listDeleteJobResources - listDeleteJobResources
   * 
   * List the per-resource rows for a delete job, cursor-paginated. Used by
   * the failures view in the frontend.
   * 
   */
  'listDeleteJobResources'(
    parameters?: Parameters<Paths.ListDeleteJobResources.QueryParameters & Paths.ListDeleteJobResources.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDeleteJobResources.Responses.$200>
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
  /**
   * getConfigInventory - getConfigInventory
   * 
   * Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,
   * no full payloads. Calls every adapter's `list()` live (bypasses the 7-day DynamoDB index).
   * Intended for snapshot-api to consume when taking a full-org snapshot.
   * 
   */
  'getConfigInventory'(
    parameters?: Parameters<Paths.GetConfigInventory.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigInventory.Responses.$200>
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
  ['/v1/configs/compare']: {
    /**
     * compareConfigs - compareConfigs
     * 
     * Compare the caller org's configs of a single type against another
     * (source) org, side by side. Rows are paired via the lineage registry in
     * both sync directions (caller imported from source, or source imported
     * from caller); configs without a counterpart come back as `only_current`
     * or `only_source`.
     * 
     * `source_auth_token` must be a valid token for `source_org_id` — the
     * frontend mints one via the pipeline pairing, mirroring `createSyncJob`'s
     * `target_auth_token`. The token is verified against `source_org_id`
     * before any source-org data is read.
     * 
     * POST because the request carries a token; the operation reads only.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CompareConfigs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompareConfigs.Responses.$200>
  }
  ['/v1/configs/compare/suggestions']: {
    /**
     * suggestMatches - suggestMatches
     * 
     * Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /
     * unique key) for a batch of source-org configs that have no lineage
     * entry, and return candidate counterparts in the caller's org.
     * 
     * Suggestions are ephemeral — nothing is persisted. The client offers
     * each candidate to the user, and a confirmed pair is written via
     * `confirmLineage`. Batches are capped at 25 ids; the client pages
     * through unmatched rows across successive calls.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SuggestMatches.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SuggestMatches.Responses.$200>
  }
  ['/v1/configs/lineage']: {
    /**
     * confirmLineage - confirmLineage
     * 
     * Persist a lineage entry pairing a source-org config with a config in
     * the caller's org — used to confirm a heuristic suggestion from the
     * Compare view. Writes to the caller org's lineage partition (caller as
     * sync target), so subsequent syncs PATCH the confirmed target instead of
     * creating a duplicate. Conflicts (an existing entry pointing at a
     * different target) return 409 so the client can refresh.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConfirmLineage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConfirmLineage.Responses.$201>
    /**
     * breakLineage - breakLineage
     * 
     * Delete a lineage entry from the caller org's partition (caller as sync
     * target), identified by `type` + `source_id`. Used to break a wrong or
     * stale match from the Compare view. Note: a future sync can re-match the
     * same pair heuristically — the entry is deleted, not blocklisted. To
     * break a match recorded in the OTHER direction, call this operation
     * authenticated as the other org (pipeline token).
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.BreakLineage.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BreakLineage.Responses.$200>
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
     * Retry the unresolved resources from a prior sync job: `failed` rows, plus
     * rows the original run left at `pending`/`in_progress` because it stopped
     * early. Creates a new job whose scope is that `(type, source_id)` set and
     * enqueues it for execution. Optionally accepts inline payload overrides.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
      data?: Paths.RetrySyncJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  }
  ['/v1/configs/sync-jobs/{id}/cancel']: {
    /**
     * cancelSyncJob - cancelSyncJob
     * 
     * Cancel a running sync job. Marks the job `cancelled` with a `finished_at`
     * so it stops being reported as in-flight, and the worker stops at its next
     * batch boundary — phases re-read the job status and abort rather than
     * overwrite a cancellation with their own outcome.
     * 
     * Resources already written to the target are NOT rolled back; cancelling
     * stops further work. Jobs already in a terminal state are rejected with
     * 409.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CancelSyncJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelSyncJob.Responses.$200>
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
  ['/v1/configs/delete-jobs']: {
    /**
     * createDeleteJob - createDeleteJob
     * 
     * Create a bulk-delete job for the caller's organization. The selected
     * resources are deleted asynchronously by a worker Lambda; the response
     * returns the persisted job header with status `pending`.
     * 
     * Raw delete — no dependency checks are performed. On completion the
     * worker auto-triggers an index rebuild so the config list reflects the
     * deletions.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDeleteJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDeleteJob.Responses.$201>
    /**
     * listDeleteJobs - listDeleteJobs
     * 
     * List bulk-delete jobs scoped to the caller's organization, paginated
     * with an opaque cursor. Most-recent first.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListDeleteJobs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDeleteJobs.Responses.$200>
  }
  ['/v1/configs/delete-jobs/{id}']: {
    /**
     * getDeleteJob - getDeleteJob
     * 
     * Fetch a single bulk-delete job by ID. Returns the job header and counts
     * summary. Frontend polls this endpoint while the job runs.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetDeleteJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDeleteJob.Responses.$200>
  }
  ['/v1/configs/delete-jobs/{id}/resources']: {
    /**
     * listDeleteJobResources - listDeleteJobResources
     * 
     * List the per-resource rows for a delete job, cursor-paginated. Used by
     * the failures view in the frontend.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListDeleteJobResources.QueryParameters & Paths.ListDeleteJobResources.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDeleteJobResources.Responses.$200>
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
  ['/v1/configs/inventory']: {
    /**
     * getConfigInventory - getConfigInventory
     * 
     * Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,
     * no full payloads. Calls every adapter's `list()` live (bypasses the 7-day DynamoDB index).
     * Intended for snapshot-api to consume when taking a full-org snapshot.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigInventory.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigInventory.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type BreakLineageResponse = Components.Schemas.BreakLineageResponse;
export type CompareCounts = Components.Schemas.CompareCounts;
export type CompareLineage = Components.Schemas.CompareLineage;
export type CompareRequest = Components.Schemas.CompareRequest;
export type CompareResponse = Components.Schemas.CompareResponse;
export type CompareRow = Components.Schemas.CompareRow;
export type ConfigDependenciesResponse = Components.Schemas.ConfigDependenciesResponse;
export type ConfigInventoryResponse = Components.Schemas.ConfigInventoryResponse;
export type ConfigListResponse = Components.Schemas.ConfigListResponse;
export type ConfigNode = Components.Schemas.ConfigNode;
export type ConfigTypeInfo = Components.Schemas.ConfigTypeInfo;
export type ConfirmLineageRequest = Components.Schemas.ConfirmLineageRequest;
export type DeleteJob = Components.Schemas.DeleteJob;
export type DeleteJobCounts = Components.Schemas.DeleteJobCounts;
export type DeleteJobListResponse = Components.Schemas.DeleteJobListResponse;
export type DeleteJobRequest = Components.Schemas.DeleteJobRequest;
export type DeleteJobResource = Components.Schemas.DeleteJobResource;
export type DeleteJobResourceListResponse = Components.Schemas.DeleteJobResourceListResponse;
export type DeleteJobResourceStatus = Components.Schemas.DeleteJobResourceStatus;
export type DeleteJobStatus = Components.Schemas.DeleteJobStatus;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type IndexRebuildResponse = Components.Schemas.IndexRebuildResponse;
export type IndexStatusResponse = Components.Schemas.IndexStatusResponse;
export type LineageEntryResponse = Components.Schemas.LineageEntryResponse;
export type MatchSuggestion = Components.Schemas.MatchSuggestion;
export type ResourceType = Components.Schemas.ResourceType;
export type SnapshotInventoryItem = Components.Schemas.SnapshotInventoryItem;
export type SnapshotInventorySkippedType = Components.Schemas.SnapshotInventorySkippedType;
export type SuggestMatchesRequest = Components.Schemas.SuggestMatchesRequest;
export type SuggestMatchesResponse = Components.Schemas.SuggestMatchesResponse;
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
