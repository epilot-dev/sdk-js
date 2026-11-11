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
        export interface CreatePreviewRequest {
            /**
             * Display name of the preview. Defaults to `Preview <date>`.
             */
            name?: string;
            /**
             * Internal callers only (e.g. the admin portal, with the source org in `x-ivy-org-id`):
             * who gets invited to the preview org as owner; `user_id` or `email` is required. Users
             * always invite themselves; sending this with a user token is rejected with 403.
             *
             */
            requester?: {
                /**
                 * A user of the source org (preferred). They are invited, and the copy job acts as
                 * them (e.g. they own the copied dashboards). Email, name and language come from
                 * their user record.
                 *
                 */
                user_id?: string;
                /**
                 * Used when `user_id` is not given.
                 */
                email?: string; // email
                display_name?: string;
                language?: "de" | "en";
            };
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
            /**
             * Machine-readable reason, where the operation documents one
             */
            code?: string;
            error: string;
        }
        export interface HealthFinding {
            /**
             * Stable finding identity — unchanged across rescans.
             */
            id: string;
            code: "broken_reference" | "inactive_reference" | "unreadable_config" | "orphaned_group_reference" | "uuid_group_label" | "duplicate_attribute_name" | "duplicate_headline" | "unreachable_attribute_purpose" | "orphaned_price" | "duplicate_price" | "inactive_price_in_use" | "incomplete_configuration" | "source_org_reference" | "secret_value_missing" | "env_value_missing";
            severity: "error" | "warning" | "info";
            /**
             * Config type carrying the problem.
             */
            source_type: string;
            source_id: string;
            source_title: string;
            /**
             * English prose. Use message_key when rendering to a user.
             */
            message: string;
            /**
             * Translation key for the same sentence, with message_params as interpolation values. Absent for findings whose text comes from @epilot/config-engine.
             *
             */
            message_key?: string;
            message_params?: {
                [name: string]: any;
            };
            /**
             * Type of the referenced config (reference findings only).
             */
            ref_type?: string;
            ref_id?: string;
            ref_title?: string;
            /**
             * Portal deep link to the source config.
             */
            source_link?: string;
            /**
             * Portal deep link to the referenced config (when it exists).
             */
            ref_link?: string;
            /**
             * Config that owns the affected one, when the affected config has no
             * editor of its own (an entity mapping is edited inside its journey).
             *
             */
            owner_type?: string;
            owner_id?: string;
            owner_title?: string;
            /**
             * Portal deep link to the owning config — where the fix happens.
             */
            owner_link?: string;
            /**
             * Field path of the referencing field in the source payload.
             */
            path?: string;
            /**
             * True when the cleanup endpoint can remove this orphan reference.
             */
            cleanable?: boolean;
            /**
             * Acknowledged as intentional by a person — excluded from the headline score and default breakdown until un-ignored.
             *
             */
            ignored?: boolean;
            ignored_at?: string; // date-time
            ignored_by?: string;
            ignored_reason?: string;
            /**
             * Scan timestamp when this finding first appeared.
             */
            first_seen: string; // date-time
            last_seen: string; // date-time
        }
        export interface HealthReportResponse {
            status: "missing" | "idle" | "scanning" | "cleaning" | "ready" | "failed";
            last_scanned_at?: string; // date-time
            scan_duration_ms?: number;
            scanned_configs?: number;
            /**
             * Configs fetched per resource type in the latest scan.
             */
            scanned_by_type?: {
                [name: string]: number;
            };
            counts?: {
                error?: number;
                warning?: number;
                info?: number;
            };
            /**
             * Findings whose first_seen is the latest scan.
             */
            new_since_previous?: number;
            /**
             * Findings present in the previous scan but gone now.
             */
            resolved_since_previous?: number;
            last_cleanup_at?: string; // date-time
            cleaned_count?: number;
            /**
             * One entry per completed scan, oldest first — powers the trend.
             */
            history?: {
                scanned_at: string; // date-time
                clean: number;
                total: number;
            }[];
            error?: string;
            findings: HealthFinding[];
        }
        export interface HealthScanStartResponse {
            status: "scanning" | "failed";
            error?: string;
        }
        export interface HealthSeverityCounts {
            error: number;
            warning: number;
            info: number;
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
        export interface Preview {
            id: string;
            name: string;
            status: /**
             * - creating_org: the preview org is being created
             * - copying_configuration: the sync job copying this org's configuration is running
             * - inviting: the requester is being invited to the preview org
             * - ready: the requester got the "your preview org is ready" email
             * - failed: see `error`
             *
             */
            PreviewStatus;
            /**
             * The org the preview copies (the org it was requested from).
             */
            source_org_id: string;
            /**
             * The preview org, once created.
             */
            preview_org_id?: string;
            /**
             * The sync job copying the configuration (see `getSyncJob`).
             */
            sync_job_id?: string;
            /**
             * Final status of the copy sync job (`succeeded` or `partial`).
             */
            sync_status?: string;
            requested_by: {
                user_id?: string;
                email?: string;
            };
            created_at: string; // date-time
            updated_at: string; // date-time
            /**
             * Why the preview failed.
             */
            error?: string;
        }
        /**
         * - creating_org: the preview org is being created
         * - copying_configuration: the sync job copying this org's configuration is running
         * - inviting: the requester is being invited to the preview org
         * - ready: the requester got the "your preview org is ready" email
         * - failed: see `error`
         *
         */
        export type PreviewStatus = "creating_org" | "copying_configuration" | "inviting" | "ready" | "failed";
        /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        export type ResourceType = "journey" | "datasource" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "document_template" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation" | "access_token" | "email_signature" | "shared_inbox" | "org_setting";
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
         * How the dependency was found. `typed_reference`: a structural reference
         * in the payload (e.g. a workflow step's automation). `id_reference`: an
         * id in the payload resolved through the source index.
         * `automation_trigger`: an automation triggered by the resource (e.g. a
         * journey submission). `journey_datasource`: a datasource owned by the
         * journey. `file_reference`: a file used by the resource.
         *
         */
        export type SyncDependencyReason = "typed_reference" | "id_reference" | "automation_trigger" | "journey_datasource" | "file_reference";
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
             * `dependencies` expands the selection with its dependencies (only when
             * `include_dependencies` is on), `phase_a` creates/matches with
             * topological batches, `phase_a5` resolves derived references, `phase_b`
             * patches with the full ID map, `finalize` runs cycle-breaking
             * finalizers. Clients should tolerate phase values they don't know.
             *
             */
            SyncPhase;
            current_batch?: /* Position within the current topological batch for the active phase. */ SyncJobBatch;
            started_at: string; // date-time
            finished_at?: string; // date-time
            health_check?: /**
             * Compact state of the job's post-import health check. Full results:
             * `getSyncJobHealth`. Absent on plans and on jobs that finished before
             * the check existed.
             *
             */
            SyncJobHealthCheck;
            /**
             * Deprecated — use `listSyncJobEvents`. Up to 10 op-log events,
             * ordered by resource index rather than recency.
             *
             */
            events?: /**
             * Activity-log entry surfaced to the frontend. Backed by the append-only
             * job event log, or by the op-log rows (`SYNC#<jobId>#OP#<seq>`) for jobs
             * that predate it. Key events by `id` when present.
             *
             */
            SyncJobEvent[];
            /**
             * Id of the user who started the job.
             */
            created_by?: string;
            /**
             * Id of the job this job retries.
             */
            retry_of?: string;
            /**
             * Ids of the retry jobs created from this job, oldest first.
             */
            retried_by?: string[];
            /**
             * True on a finished plan (`dry_run`) job.
             */
            plan_only?: boolean;
            plan_summary?: /**
             * Planned resources by action. `not_compared` counts the `update`
             * resources whose copies could not be compared (it is part of
             * `update`, not in addition to it). `failed` counts resources planning
             * failed for.
             *
             */
            SyncPlanCounts;
            /**
             * On a plan, when every row was last planned (first run or full replan).
             */
            planned_at?: string; // date-time
            /**
             * On a finished plan, when it stops being applicable (24 hours after
             * `planned_at`). Same value as `getSyncPlan`'s `expires_at`.
             *
             */
            expires_at?: string; // date-time
            /**
             * Id of the plan this job applies (see `applySyncPlan`).
             */
            applied_from_plan?: string;
            /**
             * Ids of the jobs that applied this plan, oldest first.
             */
            applied_by?: string[];
            /**
             * On a job applying a plan, the user who approved the plan.
             */
            approved_by?: string;
            /**
             * On a job applying a plan, when the plan was approved.
             */
            approved_at?: string; // date-time
            /**
             * On a plan, every approval (one per `applySyncPlan` call), oldest
             * first: the apply job, who approved and when.
             *
             */
            approvals?: {
                job_id: string;
                approved_by?: string;
                approved_at: string; // date-time
            }[];
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
         * Activity-log entry surfaced to the frontend. Backed by the append-only
         * job event log, or by the op-log rows (`SYNC#<jobId>#OP#<seq>`) for jobs
         * that predate it. Key events by `id` when present.
         *
         */
        export interface SyncJobEvent {
            /**
             * Event id. A ULID (time-sortable) for event-log events, `op-<seq>`
             * for op-log events. Absent on `getSyncJob.events`.
             *
             */
            id?: string;
            /**
             * What the event describes. `resource`: a status change of a resource
             * row. `dependency`: dependency expansion resolved a referenced
             * resource (see `dependency`). `step`: a phase milestone such as the
             * source-index check or the dependency summary; has no `type` or
             * `source_id`. Absent means `resource`.
             *
             */
            kind?: "resource" | "dependency" | "step";
            /**
             * Resource sequence number of the op-log write (the resource's index
             * in the job). Not unique per event. 0 for `dependency` and `step`
             * events.
             *
             */
            seq: number;
            ts: string; // date-time
            phase?: /**
             * Three-phase orchestrator phase. `phase_0` fetches source payloads,
             * `dependencies` expands the selection with its dependencies (only when
             * `include_dependencies` is on), `phase_a` creates/matches with
             * topological batches, `phase_a5` resolves derived references, `phase_b`
             * patches with the full ID map, `finalize` runs cycle-breaking
             * finalizers. Clients should tolerate phase values they don't know.
             *
             */
            SyncPhase;
            /**
             * Resource type
             */
            type?: string;
            source_id?: string;
            target_id?: string;
            /**
             * Resource title, when known at write time.
             */
            title?: string;
            status: /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            SyncJobResourceStatus;
            attempt?: number;
            message?: string;
            error?: string;
            dependency?: /**
             * Only on `kind: dependency` events. The event's `type`, `source_id` and
             * `title` describe the dependency itself.
             *
             */
            SyncJobEventDependency;
        }
        /**
         * Only on `kind: dependency` events. The event's `type`, `source_id` and
         * `title` describe the dependency itself.
         *
         */
        export interface SyncJobEventDependency {
            /**
             * `added`: not yet in the target, fetched and added to the sync set.
             * `linked`: already synced to the target (`target_id`), mapped but not
             * synced again. `skipped`: not syncable (unsupported type, archived or
             * built-in). `not_found`: couldn't be loaded from the source org.
             *
             */
            outcome: "added" | "linked" | "skipped" | "not_found";
            reason: /**
             * How the dependency was found. `typed_reference`: a structural reference
             * in the payload (e.g. a workflow step's automation). `id_reference`: an
             * id in the payload resolved through the source index.
             * `automation_trigger`: an automation triggered by the resource (e.g. a
             * journey submission). `journey_datasource`: a datasource owned by the
             * journey. `file_reference`: a file used by the resource.
             *
             */
            SyncDependencyReason;
            required_by: /* The resource that referenced the dependency. */ SyncRequiredBy;
            /**
             * Expansion depth. 0 = referenced directly by a selected resource.
             *
             */
            depth: number;
        }
        export interface SyncJobEventListResponse {
            /**
             * Events, latest first.
             */
            results: /**
             * Activity-log entry surfaced to the frontend. Backed by the append-only
             * job event log, or by the op-log rows (`SYNC#<jobId>#OP#<seq>`) for jobs
             * that predate it. Key events by `id` when present.
             *
             */
            SyncJobEvent[];
            next_cursor?: string;
            /**
             * Number of events matching the `kind` filter. Only on the first page
             * (no `cursor`, no `after`).
             *
             */
            total?: number;
            /**
             * Only with `after`: more new events existed than were returned.
             * Reload from the first page.
             *
             */
            truncated?: boolean;
            /**
             * Which store served the events.
             */
            source: "events" | "op_log";
        }
        /**
         * Targeted health check of the configs a sync job wrote into the target
         * org. Findings carry `first_seen` = `last_seen` = `finished_at`.
         *
         */
        export interface SyncJobHealth {
            status: /**
             * State of a sync job's post-import health check. `pending`: queued,
             * `running`: scanning, `done`: findings available, `failed`: the check
             * itself failed or did not finish (the import is unaffected), `skipped`:
             * nothing to check (a plan, a job that wrote nothing, or a cancelled
             * job), `not_run`: a finished job that never had a check (start one with
             * `runSyncJobHealth`).
             *
             */
            SyncJobHealthStatus;
            started_at?: string; // date-time
            finished_at?: string; // date-time
            /**
             * Written configs whose payload was read.
             */
            scanned: number;
            counts: HealthSeverityCounts;
            /**
             * Why the check failed or was skipped.
             */
            error?: string;
            /**
             * Errors first, then warnings, then info. Empty unless `done`.
             */
            findings: HealthFinding[];
        }
        /**
         * Compact state of the job's post-import health check. Full results:
         * `getSyncJobHealth`. Absent on plans and on jobs that finished before
         * the check existed.
         *
         */
        export interface SyncJobHealthCheck {
            status: /**
             * State of a sync job's post-import health check. `pending`: queued,
             * `running`: scanning, `done`: findings available, `failed`: the check
             * itself failed or did not finish (the import is unaffected), `skipped`:
             * nothing to check (a plan, a job that wrote nothing, or a cancelled
             * job), `not_run`: a finished job that never had a check (start one with
             * `runSyncJobHealth`).
             *
             */
            SyncJobHealthStatus;
            counts: HealthSeverityCounts;
        }
        /**
         * State of a sync job's post-import health check. `pending`: queued,
         * `running`: scanning, `done`: findings available, `failed`: the check
         * itself failed or did not finish (the import is unaffected), `skipped`:
         * nothing to check (a plan, a job that wrote nothing, or a cancelled
         * job), `not_run`: a finished job that never had a check (start one with
         * `runSyncJobHealth`).
         *
         */
        export type SyncJobHealthStatus = "pending" | "running" | "done" | "failed" | "skipped" | "not_run";
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
             * If true, the job is a plan: the orchestrator runs Phase 0 + a
             * planning pass, reads the target's copies, writes `would_*`
             * resource rows with a `plan` (create / update / no change) and
             * field diffs, and performs no destination writes. See
             * `getSyncPlan`, `listSyncPlanDiffs` and `applySyncPlan`.
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
             * If true (default), a synced `portal_config` also pushes the source
             * portal's widgets to the target portal (a full replace of the target's
             * widget set). Set false to leave the target portal's widgets alone.
             *
             */
            sync_portal_widgets?: boolean;
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
            /**
             * Set when dependency expansion added the row to the sync set: the
             * resource that referenced it and why. Absent on rows the user
             * selected and on rows written before this field existed.
             *
             */
            required_by?: {
                type: string;
                source_id: string;
                title?: string;
                reason: /**
                 * How the dependency was found. `typed_reference`: a structural reference
                 * in the payload (e.g. a workflow step's automation). `id_reference`: an
                 * id in the payload resolved through the source index.
                 * `automation_trigger`: an automation triggered by the resource (e.g. a
                 * journey submission). `journey_datasource`: a datasource owned by the
                 * journey. `file_reference`: a file used by the resource.
                 *
                 */
                SyncDependencyReason;
            };
            status: /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            SyncJobResourceStatus;
            phase: /**
             * Three-phase orchestrator phase. `phase_0` fetches source payloads,
             * `dependencies` expands the selection with its dependencies (only when
             * `include_dependencies` is on), `phase_a` creates/matches with
             * topological batches, `phase_a5` resolves derived references, `phase_b`
             * patches with the full ID map, `finalize` runs cycle-breaking
             * finalizers. Clients should tolerate phase values they don't know.
             *
             */
            SyncPhase;
            attempt: number;
            error?: string;
            updated_at: string; // date-time
            /**
             * Portal editor URL of the resource in the source org. Absent when it
             * can't be built reliably (e.g. entity-scoped types without schema
             * context).
             *
             */
            source_link?: string;
            /**
             * Portal editor URL of the resource in the target org. Only present
             * when the row has a `target_id`; absent when it can't be built
             * reliably.
             *
             */
            target_link?: string;
            plan?: /**
             * The plan for one resource. Set on rows of plan jobs (`dry_run`), and
             * copied onto the rows of the job that applies the plan. Absent on rows
             * planning failed for and on jobs created before plans existed.
             *
             */
            SyncResourcePlan;
            /**
             * Only on jobs that apply a plan: why the row was not applied.
             * `unchanged` (the plan found no change), `excluded` (left out by
             * the request) or `not_syncable` (the plan would skip it). Such rows
             * are `skipped`.
             *
             */
            excluded_from_apply?: "unchanged" | "excluded" | "not_syncable";
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
        export interface SyncJobResourceRef {
            type: string;
            source_id: string;
        }
        /**
         * Per-resource status. `would_*` values are produced by dry-run jobs.
         *
         */
        export type SyncJobResourceStatus = "pending" | "in_progress" | "created" | "patched" | "skipped" | "would_create" | "would_patch" | "would_skip_unchanged" | "would_match_heuristic" | "failed";
        export interface SyncJobRetryErrorResponse {
            status?: number;
            error?: string;
            invalid_resources?: SyncJobResourceRef[];
        }
        export interface SyncJobRetryPlan {
            /**
             * The selected rows of the original job.
             */
            selected: /**
             * Per-resource row backed by `SyncResourcesTable`. See
             * `docs/sync/INTERFACES.md` for the DDB shape.
             *
             */
            SyncJobResource[];
            /**
             * Unresolved rows the selection depends on, added to the retry.
             */
            added_dependencies: /**
             * Per-resource row backed by `SyncResourcesTable`. See
             * `docs/sync/INTERFACES.md` for the DDB shape.
             *
             */
            SyncJobResource[];
            /**
             * `best_effort` when some source payloads could not be fetched, so
             * dependencies may be missing from `added_dependencies`.
             *
             */
            dependency_resolution: "exact" | "best_effort";
        }
        export interface SyncJobRetryPlanRequest {
            /**
             * Rows of the original job to retry. Each must be `failed`, `pending`
             * or `in_progress`. Omit to retry every unresolved row.
             *
             */
            resources?: SyncJobResourceRef[];
        }
        /**
         * Optional body for `retrySyncJob`. Defaults to retrying every unresolved
         * resource of the original job (failed, pending or in_progress).
         *
         */
        export interface SyncJobRetryRequest {
            /**
             * Target org token used by the worker for writes. Required.
             */
            target_auth_token?: string;
            /**
             * Retry only these rows (each must be `failed`, `pending` or
             * `in_progress`) plus the unresolved rows they depend on.
             *
             */
            resources?: SyncJobResourceRef[];
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
         * `dependencies` expands the selection with its dependencies (only when
         * `include_dependencies` is on), `phase_a` creates/matches with
         * topological batches, `phase_a5` resolves derived references, `phase_b`
         * patches with the full ID map, `finalize` runs cycle-breaking
         * finalizers. Clients should tolerate phase values they don't know.
         *
         */
        export type SyncPhase = "phase_0" | "dependencies" | "phase_a" | "phase_a5" | "phase_b" | "finalize";
        export interface SyncPlan {
            job_id: string;
            status: /**
             * Lifecycle status of a sync job. See `docs/sync/INTERFACES.md` for state
             * transitions.
             *
             */
            SyncJobStatus;
            /**
             * True once planning has finished and produced a plan (the job
             * ended `succeeded` or `partial`). Stays false for a plan job that
             * ended `failed` or `cancelled`; its counts cover only the rows
             * planned before it stopped.
             *
             */
            ready: boolean;
            /**
             * True while `applySyncPlan` accepts the plan: it is `ready` and
             * `expires_at` has not passed. A plan can be applied more than once
             * (e.g. one part now, another later); each apply is listed in
             * `applied_by`.
             *
             */
            applicable: boolean;
            /**
             * When the plan stops being applicable: 24 hours after every row was
             * last planned (`planned_at`). A partial replan does not move it.
             *
             */
            expires_at?: string; // date-time
            /**
             * When every row was last planned (first run or full replan).
             */
            planned_at?: string; // date-time
            /**
             * When a partial replan (`replanSyncPlan` with `resources`) last finished.
             */
            replanned_at?: string; // date-time
            source_org_id: string;
            target_org_id: string;
            started_at?: string; // date-time
            finished_at?: string; // date-time
            summary: /**
             * Planned resources by action. `not_compared` counts the `update`
             * resources whose copies could not be compared (it is part of
             * `update`, not in addition to it). `failed` counts resources planning
             * failed for.
             *
             */
            SyncPlanCounts;
            by_type: {
                total: number;
                create: number;
                update: number;
                no_change: number;
                skip: number;
                failed: number;
                not_compared: number;
                type: string;
            }[];
            /**
             * Ids of the jobs that applied this plan, oldest first.
             */
            applied_by?: string[];
        }
        /**
         * What a real run would do with a planned resource:
         * - `create`: no counterpart in the target; a new resource is created.
         * - `update`: the target's copy differs from the source and is
         *   overwritten. Also used when the copies could not be compared
         *   (`diff_status: not_compared`): such resources are re-applied to be
         *   safe.
         * - `no_change`: the target's copy already matches the source.
         * - `skip`: the resource is never synced (e.g. built-in taxonomies,
         *   credentials).
         *
         */
        export type SyncPlanAction = "create" | "update" | "no_change" | "skip";
        export interface SyncPlanApplyErrorResponse {
            status?: number;
            error?: string;
            /**
             * Machine-readable reason, for clients that show their own message.
             */
            code?: "target_auth_token_missing" | "empty_selection" | "invalid_resources" | "plan_not_ready" | "plan_expired" | "nothing_to_apply" | "missing_dependencies";
            invalid_resources?: SyncJobResourceRef[];
            missing_dependencies?: SyncPlanMissingDependency[];
        }
        export interface SyncPlanApplyRequest {
            /**
             * Destination-org auth token, as on `createSyncJob`. Never returned
             * in responses and never logged.
             *
             */
            target_auth_token: string;
            /**
             * Name of the apply job. Defaults to the plan's name.
             */
            name?: string;
            /**
             * Apply exactly these rows of the plan. Omit to apply every
             * `create` and `update` row.
             *
             */
            resources?: SyncJobResourceRef[];
            /**
             * Rows of the plan to leave out.
             */
            exclude?: SyncJobResourceRef[];
            /**
             * Apply even when left-out resources that would be created are
             * referenced by applied ones. Those references then keep pointing
             * at the source org's ids.
             *
             */
            allow_missing_dependencies?: boolean;
        }
        /**
         * One changed field. `path` uses dots for object keys and
         * `[key=value]` for array items that have an identity (`name`, `slug`,
         * `key`, `id`, …), e.g. `steps[name=Contact].blocks[name=Email].label`.
         * `$` is the whole resource.
         *
         * Values are compared after removing fields that differ between orgs
         * by design: ids of the resource itself, org ids, timestamps and audit
         * fields (`created_at`, `updated_by`, `_manifest`, …). References to
         * other resources are shown as target-org ids. A reference to a
         * resource the plan would create is shown as `new:<type>:<source_id>`,
         * since its target id does not exist yet.
         *
         * A value whose JSON is larger than 4 KB is replaced by
         * `{ "__truncated": true, "json_bytes": <size> }`.
         *
         */
        export interface SyncPlanChange {
            path: string;
            /**
             * `added`: only the source has a value here. `removed`: only the
             * target has one (a real run does not necessarily delete it; that
             * depends on the resource's API). `changed`: both have different
             * values. `reordered`: the same array items in a different order.
             *
             */
            kind: "added" | "removed" | "changed" | "reordered";
            /**
             * The target org's current value. Absent for `added`.
             */
            before?: any;
            /**
             * The value a real run would write. Absent for `removed`.
             */
            after?: any;
        }
        /**
         * Planned resources by action. `not_compared` counts the `update`
         * resources whose copies could not be compared (it is part of
         * `update`, not in addition to it). `failed` counts resources planning
         * failed for.
         *
         */
        export interface SyncPlanCounts {
            total: number;
            create: number;
            update: number;
            no_change: number;
            skip: number;
            failed: number;
            not_compared: number;
        }
        export interface SyncPlanDiff {
            type: string;
            source_id: string;
            /**
             * The target counterpart. Absent for `create`.
             */
            target_id?: string;
            title?: string;
            action: /**
             * What a real run would do with a planned resource:
             * - `create`: no counterpart in the target; a new resource is created.
             * - `update`: the target's copy differs from the source and is
             *   overwritten. Also used when the copies could not be compared
             *   (`diff_status: not_compared`): such resources are re-applied to be
             *   safe.
             * - `no_change`: the target's copy already matches the source.
             * - `skip`: the resource is never synced (e.g. built-in taxonomies,
             *   credentials).
             *
             */
            SyncPlanAction;
            match: /**
             * How the target counterpart was found: `lineage` (synced before),
             * `heuristic` (first sync, matched by name / slug / unique key) or
             * `none` (no counterpart: the resource is created).
             *
             */
            SyncPlanMatch;
            diff_status: /**
             * `computed` when both copies were read and compared. `not_compared`
             * when the target could not be read or compared (see `note`).
             *
             */
            SyncPlanDiffStatus;
            /**
             * Number of changed fields, including any left out of `changes`.
             */
            change_count: number;
            /**
             * The changed fields (at most 200). Empty for `no_change`. For
             * `create` a single `added` change at `$` holds the whole resource.
             *
             */
            changes: /**
             * One changed field. `path` uses dots for object keys and
             * `[key=value]` for array items that have an identity (`name`, `slug`,
             * `key`, `id`, …), e.g. `steps[name=Contact].blocks[name=Email].label`.
             * `$` is the whole resource.
             *
             * Values are compared after removing fields that differ between orgs
             * by design: ids of the resource itself, org ids, timestamps and audit
             * fields (`created_at`, `updated_by`, `_manifest`, …). References to
             * other resources are shown as target-org ids. A reference to a
             * resource the plan would create is shown as `new:<type>:<source_id>`,
             * since its target id does not exist yet.
             *
             * A value whose JSON is larger than 4 KB is replaced by
             * `{ "__truncated": true, "json_bytes": <size> }`.
             *
             */
            SyncPlanChange[];
            /**
             * True when changes or values were left out to keep the diff small.
             * `change_count` is still exact.
             *
             */
            truncated: boolean;
            note?: string;
            planned_at?: string; // date-time
        }
        export interface SyncPlanDiffListResponse {
            next_cursor?: string;
            results: SyncPlanDiff[];
        }
        /**
         * `computed` when both copies were read and compared. `not_compared`
         * when the target could not be read or compared (see `note`).
         *
         */
        export type SyncPlanDiffStatus = "computed" | "not_compared";
        /**
         * How the target counterpart was found: `lineage` (synced before),
         * `heuristic` (first sync, matched by name / slug / unique key) or
         * `none` (no counterpart: the resource is created).
         *
         */
        export type SyncPlanMatch = "lineage" | "heuristic" | "none";
        export interface SyncPlanMissingDependency {
            type: string;
            source_id: string;
            title?: string;
            /**
             * Applied resources that reference it.
             */
            required_by: {
                type: string;
                source_id: string;
                title?: string;
            }[];
        }
        export interface SyncPlanReplanRequest {
            /**
             * Destination-org auth token (planning reads the target). Never returned or logged.
             */
            target_auth_token: string;
            /**
             * Rows of the plan to plan again. Omit to plan every row again.
             */
            resources?: SyncJobResourceRef[];
        }
        /**
         * The resource that referenced the dependency.
         */
        export interface SyncRequiredBy {
            type: string;
            source_id: string;
            title?: string;
        }
        /**
         * The plan for one resource. Set on rows of plan jobs (`dry_run`), and
         * copied onto the rows of the job that applies the plan. Absent on rows
         * planning failed for and on jobs created before plans existed.
         *
         */
        export interface SyncResourcePlan {
            action: /**
             * What a real run would do with a planned resource:
             * - `create`: no counterpart in the target; a new resource is created.
             * - `update`: the target's copy differs from the source and is
             *   overwritten. Also used when the copies could not be compared
             *   (`diff_status: not_compared`): such resources are re-applied to be
             *   safe.
             * - `no_change`: the target's copy already matches the source.
             * - `skip`: the resource is never synced (e.g. built-in taxonomies,
             *   credentials).
             *
             */
            SyncPlanAction;
            match: /**
             * How the target counterpart was found: `lineage` (synced before),
             * `heuristic` (first sync, matched by name / slug / unique key) or
             * `none` (no counterpart: the resource is created).
             *
             */
            SyncPlanMatch;
            diff_status?: /**
             * `computed` when both copies were read and compared. `not_compared`
             * when the target could not be read or compared (see `note`).
             *
             */
            SyncPlanDiffStatus;
            /**
             * Number of changed fields (`update` only).
             */
            change_count?: number;
            /**
             * The first 20 changed field paths (`update` only).
             */
            changed_paths?: [
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
            /**
             * Why the plan chose this action, when it is not obvious.
             */
            note?: string;
            /**
             * Other resources of the plan this resource references.
             */
            depends_on?: SyncJobResourceRef[];
        }
    }
}
declare namespace Paths {
    namespace ApplySyncPlan {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.SyncPlanApplyRequest;
        namespace Responses {
            export type $201 = /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            Components.Schemas.SyncJob;
            export type $400 = Components.Schemas.SyncPlanApplyErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.SyncPlanApplyErrorResponse;
        }
    }
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
    namespace CreatePreview {
        export type RequestBody = Components.Schemas.CreatePreviewRequest;
        namespace Responses {
            export type $202 = Components.Schemas.Preview;
            export interface $409 {
            }
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
    namespace GetHealthReport {
        namespace Responses {
            export type $200 = Components.Schemas.HealthReportResponse;
        }
    }
    namespace GetIndex {
        namespace Responses {
            export type $200 = /* Current index build state */ Components.Schemas.IndexStatusResponse;
        }
    }
    namespace GetPreview {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Preview;
            export interface $404 {
            }
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
    namespace GetSyncJobHealth {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * Targeted health check of the configs a sync job wrote into the target
             * org. Findings carry `first_seen` = `last_seen` = `finished_at`.
             *
             */
            Components.Schemas.SyncJobHealth;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetSyncPlan {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SyncPlan;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetSyncPlanDiff {
        namespace Parameters {
            export type Id = string;
            export type SourceId = string;
            export type Type = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
            type: Parameters.Type;
            source_id: Parameters.SourceId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SyncPlanDiff;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
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
    namespace ListPreviews {
        namespace Responses {
            export interface $200 {
                results: Components.Schemas.Preview[];
            }
        }
    }
    namespace ListSyncJobEvents {
        namespace Parameters {
            export type After = string;
            export type Cursor = string;
            export type Id = string;
            /**
             * example:
             * dependency,step
             */
            export type Kind = string;
            export type Size = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            after?: Parameters.After;
            kind?: /**
             * example:
             * dependency,step
             */
            Parameters.Kind;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SyncJobEventListResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListSyncJobResources {
        namespace Parameters {
            export type Cursor = string;
            export type Id = string;
            export type PlanAction = /**
             * What a real run would do with a planned resource:
             * - `create`: no counterpart in the target; a new resource is created.
             * - `update`: the target's copy differs from the source and is
             *   overwritten. Also used when the copies could not be compared
             *   (`diff_status: not_compared`): such resources are re-applied to be
             *   safe.
             * - `no_change`: the target's copy already matches the source.
             * - `skip`: the resource is never synced (e.g. built-in taxonomies,
             *   credentials).
             *
             */
            Components.Schemas.SyncPlanAction;
            export type Size = number;
            export type Status = /**
             * Per-resource status. `would_*` values are produced by dry-run jobs.
             *
             */
            Components.Schemas.SyncJobResourceStatus;
            export type Type = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            status?: Parameters.Status;
            type?: Parameters.Type;
            plan_action?: Parameters.PlanAction;
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
    namespace ListSyncPlanDiffs {
        namespace Parameters {
            export type Action = /**
             * What a real run would do with a planned resource:
             * - `create`: no counterpart in the target; a new resource is created.
             * - `update`: the target's copy differs from the source and is
             *   overwritten. Also used when the copies could not be compared
             *   (`diff_status: not_compared`): such resources are re-applied to be
             *   safe.
             * - `no_change`: the target's copy already matches the source.
             * - `skip`: the resource is never synced (e.g. built-in taxonomies,
             *   credentials).
             *
             */
            Components.Schemas.SyncPlanAction;
            export type Cursor = string;
            export type Id = string;
            export type Size = number;
            export type Type = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            type?: Parameters.Type;
            action?: Parameters.Action;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SyncPlanDiffListResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace PlanSyncJobRetry {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.SyncJobRetryPlanRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SyncJobRetryPlan;
            export type $400 = Components.Schemas.SyncJobRetryErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace RebuildIndex {
        namespace Responses {
            export type $200 = /* Result of an index rebuild operation */ Components.Schemas.IndexRebuildResponse;
        }
    }
    namespace ReplanSyncPlan {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.SyncPlanReplanRequest;
        namespace Responses {
            export type $202 = /**
             * Sync job header as surfaced by `getSyncJob` and the create response. The
             * canonical persistence shape is described in `docs/sync/INTERFACES.md`.
             *
             */
            Components.Schemas.SyncJob;
            export type $400 = Components.Schemas.SyncPlanApplyErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.SyncPlanApplyErrorResponse;
        }
    }
    namespace RequestHealthCoverage {
        export interface RequestBody {
            message: string;
        }
        namespace Responses {
            export interface $202 {
                status: "sent" | "failed";
                error?: string;
            }
            export interface $400 {
                status?: string;
                error?: string;
            }
            export interface $503 {
                status?: string;
                error?: string;
            }
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
            export type $400 = Components.Schemas.SyncJobRetryErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace RunSyncJobHealth {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $202 = /**
             * Targeted health check of the configs a sync job wrote into the target
             * org. Findings carry `first_seen` = `last_seen` = `finished_at`.
             *
             */
            Components.Schemas.SyncJobHealth;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $409 = Components.Schemas.ErrorResponse;
        }
    }
    namespace SetHealthFindingsIgnored {
        export interface RequestBody {
            finding_ids: string[];
            ignored?: boolean;
            reason?: string;
        }
        namespace Responses {
            export interface $200 {
                status: "ok";
                count?: number;
            }
            export interface $400 {
                status?: string;
                error?: string;
            }
        }
    }
    namespace StartHealthCleanup {
        export interface RequestBody {
            finding_ids?: string[];
        }
        namespace Responses {
            export interface $202 {
                status: "cleaning" | "failed";
                cleanable?: number;
                error?: string;
            }
            export type $422 = Components.Schemas.HealthScanStartResponse;
        }
    }
    namespace StartHealthScan {
        namespace Responses {
            export type $202 = Components.Schemas.HealthScanStartResponse;
            export type $422 = Components.Schemas.HealthScanStartResponse;
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
   * startHealthScan - startHealthScan
   * 
   * Start an asynchronous org health scan — fire-and-forget, mirrors
   * `rebuildIndex`. The scan walks the indexed configs, fetches each
   * payload, extracts field-path-known references (journey→mapping,
   * automation→template/webhook/workflow, workflow→automation, …) and
   * records a finding for every reference that resolves to a missing or
   * inactive config, plus configs that are listed but unreadable.
   * 
   * Requires a built config index (422 otherwise). Poll `getHealthReport`
   * for status and results.
   * 
   */
  'startHealthScan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartHealthScan.Responses.$202>
  /**
   * getHealthReport - getHealthReport
   * 
   * Return the caller org's current health report: scan status, summary
   * counts by severity, new/resolved deltas vs the previous scan, and the
   * full finding list (errors first, then most recently appeared).
   * Findings carry `first_seen`/`last_seen` so the UI can correlate new
   * findings with recent imports and installs.
   * 
   */
  'getHealthReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHealthReport.Responses.$200>
  /**
   * requestHealthCoverage - requestHealthCoverage
   * 
   * Send a request for configuration the health check does not cover yet.
   * Posted to the #epilot-org-health Slack channel together with the calling
   * org and user. Returns 503 when no webhook is configured for the stage.
   * 
   */
  'requestHealthCoverage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequestHealthCoverage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestHealthCoverage.Responses.$202>
  /**
   * startHealthCleanup - startHealthCleanup
   * 
   * Remove references that are already inert: dangling `$relation` entries
   * on products and prices (a price selling with a deleted tax, a product
   * linking a deleted price, …), automation triggers pointed at a deleted
   * journey (they can never fire), and the journey attached to a workflow
   * task when that journey is deleted (the task itself stays). Only
   * findings flagged `cleanable` are touched; live wiring — an action's
   * email template, a task's automation, a webhook target — is never
   * modified, because removing it would change what runs. Without
   * a body every cleanable finding is cleaned; `finding_ids` narrows the
   * set (e.g. one row's Clean up button). Fire-and-forget: poll
   * `getHealthReport` — status `cleaning` until done.
   * 
   */
  'startHealthCleanup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartHealthCleanup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartHealthCleanup.Responses.$202>
  /**
   * setHealthFindingsIgnored - setHealthFindingsIgnored
   * 
   * Acknowledge findings as intentional (or undo that). An ignored
   * finding is excluded from the headline score and the default
   * breakdown, but stays visible under the Ignored filter and can be
   * un-ignored at any time — it never disappears for good. Synchronous:
   * only flips a flag on already-computed rows, no rescan needed.
   * `ignored` defaults to `true`.
   * 
   */
  'setHealthFindingsIgnored'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SetHealthFindingsIgnored.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetHealthFindingsIgnored.Responses.$200>
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
   * getSyncJobHealth - getSyncJobHealth
   * 
   * Targeted health check of an applied (non-dry-run) sync job. When the job
   * reaches its terminal status, the target org is scanned asynchronously
   * for the configs the job wrote — rows with status `created` or
   * `patched` and a `target_id` — using the same finding logic as
   * `getHealthReport`, plus `source_org_reference` for written payloads
   * that still carry a source-org id, and `secret_value_missing` (warning)
   * for a referenced SecretString variable the job created: a sync copies
   * a variable's key, never its value, so setting it is a manual step. It runs for `succeeded` and
   * `partial` jobs, and for `failed` jobs that wrote at least one config;
   * otherwise it is `skipped`. Best-effort: it never changes the job's own
   * status, and its results never replace the org-wide health report.
   * Readable from both the source and the target org.
   * 
   * A finished job that never had a check (it finished before checks
   * existed) reports `not_run`. A check left `pending` or `running` for
   * longer than the scan can take is reported as `failed`; both can be
   * started again with `runSyncJobHealth`.
   * 
   */
  'getSyncJobHealth'(
    parameters?: Parameters<Paths.GetSyncJobHealth.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncJobHealth.Responses.$200>
  /**
   * runSyncJobHealth - runSyncJobHealth
   * 
   * Start the targeted health check of a finished, applied sync job again:
   * for jobs that finished before checks existed (`not_run`), checks that
   * failed or got stuck, or to re-check after fixing something. Same scope
   * and rules as the automatic check after every import. Callable from the
   * source or the target org; the scan runs in the target org. Answers with
   * the check's new state (`pending`) and runs asynchronously; poll
   * `getSyncJobHealth`.
   * 
   */
  'runSyncJobHealth'(
    parameters?: Parameters<Paths.RunSyncJobHealth.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RunSyncJobHealth.Responses.$202>
  /**
   * retrySyncJob - retrySyncJob
   * 
   * Retry the unresolved resources from a prior sync job: `failed` rows, plus
   * rows the original run left at `pending`/`in_progress` because it stopped
   * early. Creates a new job whose scope is that `(type, source_id)` set and
   * enqueues it for execution. Optionally accepts inline payload overrides.
   * 
   * With `resources`, only those rows are retried, plus the unresolved rows
   * of the original job they depend on (transitively). The new job carries
   * `retry_of`; the original job's `retried_by` gains the new job's id.
   * 
   */
  'retrySyncJob'(
    parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
    data?: Paths.RetrySyncJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  /**
   * planSyncJobRetry - planSyncJobRetry
   * 
   * Preview what `retrySyncJob` would re-run for the same `resources`,
   * without creating a job: the selected rows and the unresolved rows they
   * depend on. Read-only; needs no target token.
   * 
   */
  'planSyncJobRetry'(
    parameters?: Parameters<Paths.PlanSyncJobRetry.PathParameters> | null,
    data?: Paths.PlanSyncJobRetry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PlanSyncJobRetry.Responses.$200>
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
   * listSyncJobEvents - listSyncJobEvents
   * 
   * Full activity log of a sync job, latest first: one event per resource
   * status change. Paginate older events with `next_cursor`, or poll for
   * new ones with `after` (the newest event id the client holds).
   * 
   * Jobs that predate the event log are served from the op-log instead
   * (`source: op_log`): one event per resource holding its last state.
   * `after` is ignored there and the first page is returned.
   * 
   */
  'listSyncJobEvents'(
    parameters?: Parameters<Paths.ListSyncJobEvents.QueryParameters & Paths.ListSyncJobEvents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSyncJobEvents.Responses.$200>
  /**
   * listSyncJobResources - listSyncJobResources
   * 
   * List the per-resource rows for a sync job. Supports filtering by status
   * (e.g. `failed`) and type, and cursor pagination. Used by the job detail
   * page, the failures table and the dry-run plan view in the frontend.
   * 
   * Rows without a stored `title` get one from the config index (the target
   * org's copy, else the source org's) when it can be resolved. Rows carry
   * `source_link` / `target_link` portal editor URLs where they can be built.
   * 
   */
  'listSyncJobResources'(
    parameters?: Parameters<Paths.ListSyncJobResources.QueryParameters & Paths.ListSyncJobResources.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSyncJobResources.Responses.$200>
  /**
   * getSyncPlan - getSyncPlan
   * 
   * Summary of a plan: a dry-run sync job (`createSyncJob` with
   * `dry_run: true`). Says how many resources a real run would create,
   * update or leave unchanged, overall and per type.
   * 
   * Every resource row of the plan also carries a `plan` object (see
   * `listSyncJobResources`, which can filter by `plan_action`). The field
   * diffs behind each update are served by `listSyncPlanDiffs` and
   * `getSyncPlanDiff`.
   * 
   * A plan describes the target org at planning time. Apply it with
   * `applySyncPlan`, which can leave out resources first.
   * 
   */
  'getSyncPlan'(
    parameters?: Parameters<Paths.GetSyncPlan.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncPlan.Responses.$200>
  /**
   * listSyncPlanDiffs - listSyncPlanDiffs
   * 
   * Field-level diffs of a plan, one per planned resource: what the target
   * org has now (`before`) and what a real run would write (`after`). Use
   * it to review a plan in bulk, e.g. from an AI agent.
   * 
   * Only resources whose plan action is `create`, `update` or `no_change`
   * have a diff. Pages are ordered by type, then source id.
   * 
   */
  'listSyncPlanDiffs'(
    parameters?: Parameters<Paths.ListSyncPlanDiffs.QueryParameters & Paths.ListSyncPlanDiffs.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSyncPlanDiffs.Responses.$200>
  /**
   * getSyncPlanDiff - getSyncPlanDiff
   * 
   * Field-level diff of one planned resource. See `listSyncPlanDiffs`.
   * 
   */
  'getSyncPlanDiff'(
    parameters?: Parameters<Paths.GetSyncPlanDiff.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncPlanDiff.Responses.$200>
  /**
   * applySyncPlan - applySyncPlan
   * 
   * Run a finished plan for real. Creates a new sync job (it carries
   * `applied_from_plan`; the plan's `applied_by` gets the new job's id)
   * and enqueues it.
   * 
   * By default the job applies every resource the plan would `create` or
   * `update`. `no_change` and `skip` resources are not written. Change
   * the selection with:
   * - `resources`: apply exactly these rows of the plan. Can include
   *   `no_change` rows to write them anyway.
   * - `exclude`: leave these rows out (applied after `resources`).
   * 
   * Rows that are not applied are still listed on the new job, as
   * `skipped` with `excluded_from_apply`. Their existing targets keep
   * resolving references from the applied resources.
   * 
   * Leaving out a resource the plan would create, while an applied
   * resource references it, would leave that reference pointing at a
   * resource that does not exist in the target. The request is then
   * rejected with 409 and `missing_dependencies`, unless
   * `allow_missing_dependencies` is set.
   * 
   * Applied resources go through the normal sync phases, so a change in
   * the target since planning is handled like in any sync. A plan can be
   * applied up to 24 hours after it finished (`expires_at`); plan again
   * after that. A plan can be applied more than once; each apply job is
   * added to the plan's `applied_by`.
   * 
   * Errors carry a machine-readable `code`.
   * 
   */
  'applySyncPlan'(
    parameters?: Parameters<Paths.ApplySyncPlan.PathParameters> | null,
    data?: Paths.ApplySyncPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplySyncPlan.Responses.$201>
  /**
   * replanSyncPlan - replanSyncPlan
   * 
   * Plan some rows of a plan again, in place, e.g. after fixing a
   * resource in the source org because its plan showed an unexpected
   * change. The listed resources are fetched from the source again,
   * their dependencies are expanded again (a newly referenced resource
   * is added to the plan), and their targets are read and diffed again.
   * All other rows keep their plan and diff.
   * 
   * Without `resources` every row is planned again; that also renews the
   * plan's 24-hour window (`expires_at`). A partial replan does not,
   * because the other rows were planned earlier.
   * 
   * The plan job goes back to `pending` / `in_progress` and is `ready`
   * again when it finishes (`replanned_at` / `planned_at` updated). Poll
   * `getSyncPlan`.
   * 
   */
  'replanSyncPlan'(
    parameters?: Parameters<Paths.ReplanSyncPlan.PathParameters> | null,
    data?: Paths.ReplanSyncPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplanSyncPlan.Responses.$202>
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
  /**
   * listPreviews - listPreviews
   * 
   * Lists the previews requested from the caller's current org, newest first (max 50).
   */
  'listPreviews'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPreviews.Responses.$200>
  /**
   * createPreview - createPreview
   * 
   * Starts a preview of the caller's current org (internal callers: the org in `x-ivy-org-id`,
   * plus `requester`): a new, temporary org with
   * `organization_use: Preview` (parent = this org) that receives a copy of all of
   * this org's configuration through a sync job. When the copy is done, the
   * requesting user is invited to the preview org as owner with a
   * "your preview org is ready" email. Runs asynchronously; poll `getPreview`.
   * 
   */
  'createPreview'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePreview.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePreview.Responses.$202>
  /**
   * getPreview - getPreview
   * 
   * Returns a preview requested from the caller's current org, with its progress.
   */
  'getPreview'(
    parameters?: Parameters<Paths.GetPreview.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPreview.Responses.$200>
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
  ['/v1/configs/health:scan']: {
    /**
     * startHealthScan - startHealthScan
     * 
     * Start an asynchronous org health scan — fire-and-forget, mirrors
     * `rebuildIndex`. The scan walks the indexed configs, fetches each
     * payload, extracts field-path-known references (journey→mapping,
     * automation→template/webhook/workflow, workflow→automation, …) and
     * records a finding for every reference that resolves to a missing or
     * inactive config, plus configs that are listed but unreadable.
     * 
     * Requires a built config index (422 otherwise). Poll `getHealthReport`
     * for status and results.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartHealthScan.Responses.$202>
  }
  ['/v1/configs/health']: {
    /**
     * getHealthReport - getHealthReport
     * 
     * Return the caller org's current health report: scan status, summary
     * counts by severity, new/resolved deltas vs the previous scan, and the
     * full finding list (errors first, then most recently appeared).
     * Findings carry `first_seen`/`last_seen` so the UI can correlate new
     * findings with recent imports and installs.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHealthReport.Responses.$200>
  }
  ['/v1/configs/health:coverage-request']: {
    /**
     * requestHealthCoverage - requestHealthCoverage
     * 
     * Send a request for configuration the health check does not cover yet.
     * Posted to the #epilot-org-health Slack channel together with the calling
     * org and user. Returns 503 when no webhook is configured for the stage.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequestHealthCoverage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestHealthCoverage.Responses.$202>
  }
  ['/v1/configs/health:cleanup']: {
    /**
     * startHealthCleanup - startHealthCleanup
     * 
     * Remove references that are already inert: dangling `$relation` entries
     * on products and prices (a price selling with a deleted tax, a product
     * linking a deleted price, …), automation triggers pointed at a deleted
     * journey (they can never fire), and the journey attached to a workflow
     * task when that journey is deleted (the task itself stays). Only
     * findings flagged `cleanable` are touched; live wiring — an action's
     * email template, a task's automation, a webhook target — is never
     * modified, because removing it would change what runs. Without
     * a body every cleanable finding is cleaned; `finding_ids` narrows the
     * set (e.g. one row's Clean up button). Fire-and-forget: poll
     * `getHealthReport` — status `cleaning` until done.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.StartHealthCleanup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartHealthCleanup.Responses.$202>
  }
  ['/v1/configs/health:ignore']: {
    /**
     * setHealthFindingsIgnored - setHealthFindingsIgnored
     * 
     * Acknowledge findings as intentional (or undo that). An ignored
     * finding is excluded from the headline score and the default
     * breakdown, but stays visible under the Ignored filter and can be
     * un-ignored at any time — it never disappears for good. Synchronous:
     * only flips a flag on already-computed rows, no rescan needed.
     * `ignored` defaults to `true`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SetHealthFindingsIgnored.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetHealthFindingsIgnored.Responses.$200>
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
  ['/v1/configs/sync-jobs/{id}/health']: {
    /**
     * getSyncJobHealth - getSyncJobHealth
     * 
     * Targeted health check of an applied (non-dry-run) sync job. When the job
     * reaches its terminal status, the target org is scanned asynchronously
     * for the configs the job wrote — rows with status `created` or
     * `patched` and a `target_id` — using the same finding logic as
     * `getHealthReport`, plus `source_org_reference` for written payloads
     * that still carry a source-org id, and `secret_value_missing` (warning)
     * for a referenced SecretString variable the job created: a sync copies
     * a variable's key, never its value, so setting it is a manual step. It runs for `succeeded` and
     * `partial` jobs, and for `failed` jobs that wrote at least one config;
     * otherwise it is `skipped`. Best-effort: it never changes the job's own
     * status, and its results never replace the org-wide health report.
     * Readable from both the source and the target org.
     * 
     * A finished job that never had a check (it finished before checks
     * existed) reports `not_run`. A check left `pending` or `running` for
     * longer than the scan can take is reported as `failed`; both can be
     * started again with `runSyncJobHealth`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSyncJobHealth.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncJobHealth.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/health:run']: {
    /**
     * runSyncJobHealth - runSyncJobHealth
     * 
     * Start the targeted health check of a finished, applied sync job again:
     * for jobs that finished before checks existed (`not_run`), checks that
     * failed or got stuck, or to re-check after fixing something. Same scope
     * and rules as the automatic check after every import. Callable from the
     * source or the target org; the scan runs in the target org. Answers with
     * the check's new state (`pending`) and runs asynchronously; poll
     * `getSyncJobHealth`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RunSyncJobHealth.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RunSyncJobHealth.Responses.$202>
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
     * With `resources`, only those rows are retried, plus the unresolved rows
     * of the original job they depend on (transitively). The new job carries
     * `retry_of`; the original job's `retried_by` gains the new job's id.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RetrySyncJob.PathParameters> | null,
      data?: Paths.RetrySyncJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrySyncJob.Responses.$201>
  }
  ['/v1/configs/sync-jobs/{id}/retry-plan']: {
    /**
     * planSyncJobRetry - planSyncJobRetry
     * 
     * Preview what `retrySyncJob` would re-run for the same `resources`,
     * without creating a job: the selected rows and the unresolved rows they
     * depend on. Read-only; needs no target token.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.PlanSyncJobRetry.PathParameters> | null,
      data?: Paths.PlanSyncJobRetry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PlanSyncJobRetry.Responses.$200>
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
  ['/v1/configs/sync-jobs/{id}/events']: {
    /**
     * listSyncJobEvents - listSyncJobEvents
     * 
     * Full activity log of a sync job, latest first: one event per resource
     * status change. Paginate older events with `next_cursor`, or poll for
     * new ones with `after` (the newest event id the client holds).
     * 
     * Jobs that predate the event log are served from the op-log instead
     * (`source: op_log`): one event per resource holding its last state.
     * `after` is ignored there and the first page is returned.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSyncJobEvents.QueryParameters & Paths.ListSyncJobEvents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSyncJobEvents.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/resources']: {
    /**
     * listSyncJobResources - listSyncJobResources
     * 
     * List the per-resource rows for a sync job. Supports filtering by status
     * (e.g. `failed`) and type, and cursor pagination. Used by the job detail
     * page, the failures table and the dry-run plan view in the frontend.
     * 
     * Rows without a stored `title` get one from the config index (the target
     * org's copy, else the source org's) when it can be resolved. Rows carry
     * `source_link` / `target_link` portal editor URLs where they can be built.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSyncJobResources.QueryParameters & Paths.ListSyncJobResources.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSyncJobResources.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/plan']: {
    /**
     * getSyncPlan - getSyncPlan
     * 
     * Summary of a plan: a dry-run sync job (`createSyncJob` with
     * `dry_run: true`). Says how many resources a real run would create,
     * update or leave unchanged, overall and per type.
     * 
     * Every resource row of the plan also carries a `plan` object (see
     * `listSyncJobResources`, which can filter by `plan_action`). The field
     * diffs behind each update are served by `listSyncPlanDiffs` and
     * `getSyncPlanDiff`.
     * 
     * A plan describes the target org at planning time. Apply it with
     * `applySyncPlan`, which can leave out resources first.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSyncPlan.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncPlan.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/plan/diffs']: {
    /**
     * listSyncPlanDiffs - listSyncPlanDiffs
     * 
     * Field-level diffs of a plan, one per planned resource: what the target
     * org has now (`before`) and what a real run would write (`after`). Use
     * it to review a plan in bulk, e.g. from an AI agent.
     * 
     * Only resources whose plan action is `create`, `update` or `no_change`
     * have a diff. Pages are ordered by type, then source id.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSyncPlanDiffs.QueryParameters & Paths.ListSyncPlanDiffs.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSyncPlanDiffs.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/plan/diffs/{type}/{source_id}']: {
    /**
     * getSyncPlanDiff - getSyncPlanDiff
     * 
     * Field-level diff of one planned resource. See `listSyncPlanDiffs`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSyncPlanDiff.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncPlanDiff.Responses.$200>
  }
  ['/v1/configs/sync-jobs/{id}/plan/apply']: {
    /**
     * applySyncPlan - applySyncPlan
     * 
     * Run a finished plan for real. Creates a new sync job (it carries
     * `applied_from_plan`; the plan's `applied_by` gets the new job's id)
     * and enqueues it.
     * 
     * By default the job applies every resource the plan would `create` or
     * `update`. `no_change` and `skip` resources are not written. Change
     * the selection with:
     * - `resources`: apply exactly these rows of the plan. Can include
     *   `no_change` rows to write them anyway.
     * - `exclude`: leave these rows out (applied after `resources`).
     * 
     * Rows that are not applied are still listed on the new job, as
     * `skipped` with `excluded_from_apply`. Their existing targets keep
     * resolving references from the applied resources.
     * 
     * Leaving out a resource the plan would create, while an applied
     * resource references it, would leave that reference pointing at a
     * resource that does not exist in the target. The request is then
     * rejected with 409 and `missing_dependencies`, unless
     * `allow_missing_dependencies` is set.
     * 
     * Applied resources go through the normal sync phases, so a change in
     * the target since planning is handled like in any sync. A plan can be
     * applied up to 24 hours after it finished (`expires_at`); plan again
     * after that. A plan can be applied more than once; each apply job is
     * added to the plan's `applied_by`.
     * 
     * Errors carry a machine-readable `code`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ApplySyncPlan.PathParameters> | null,
      data?: Paths.ApplySyncPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplySyncPlan.Responses.$201>
  }
  ['/v1/configs/sync-jobs/{id}/plan/replan']: {
    /**
     * replanSyncPlan - replanSyncPlan
     * 
     * Plan some rows of a plan again, in place, e.g. after fixing a
     * resource in the source org because its plan showed an unexpected
     * change. The listed resources are fetched from the source again,
     * their dependencies are expanded again (a newly referenced resource
     * is added to the plan), and their targets are read and diffed again.
     * All other rows keep their plan and diff.
     * 
     * Without `resources` every row is planned again; that also renews the
     * plan's 24-hour window (`expires_at`). A partial replan does not,
     * because the other rows were planned earlier.
     * 
     * The plan job goes back to `pending` / `in_progress` and is `ready`
     * again when it finishes (`replanned_at` / `planned_at` updated). Poll
     * `getSyncPlan`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ReplanSyncPlan.PathParameters> | null,
      data?: Paths.ReplanSyncPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplanSyncPlan.Responses.$202>
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
  ['/v1/previews']: {
    /**
     * createPreview - createPreview
     * 
     * Starts a preview of the caller's current org (internal callers: the org in `x-ivy-org-id`,
     * plus `requester`): a new, temporary org with
     * `organization_use: Preview` (parent = this org) that receives a copy of all of
     * this org's configuration through a sync job. When the copy is done, the
     * requesting user is invited to the preview org as owner with a
     * "your preview org is ready" email. Runs asynchronously; poll `getPreview`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePreview.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePreview.Responses.$202>
    /**
     * listPreviews - listPreviews
     * 
     * Lists the previews requested from the caller's current org, newest first (max 50).
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPreviews.Responses.$200>
  }
  ['/v1/previews/{id}']: {
    /**
     * getPreview - getPreview
     * 
     * Returns a preview requested from the caller's current org, with its progress.
     */
    'get'(
      parameters?: Parameters<Paths.GetPreview.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPreview.Responses.$200>
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
export type CreatePreviewRequest = Components.Schemas.CreatePreviewRequest;
export type DeleteJob = Components.Schemas.DeleteJob;
export type DeleteJobCounts = Components.Schemas.DeleteJobCounts;
export type DeleteJobListResponse = Components.Schemas.DeleteJobListResponse;
export type DeleteJobRequest = Components.Schemas.DeleteJobRequest;
export type DeleteJobResource = Components.Schemas.DeleteJobResource;
export type DeleteJobResourceListResponse = Components.Schemas.DeleteJobResourceListResponse;
export type DeleteJobResourceStatus = Components.Schemas.DeleteJobResourceStatus;
export type DeleteJobStatus = Components.Schemas.DeleteJobStatus;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type HealthFinding = Components.Schemas.HealthFinding;
export type HealthReportResponse = Components.Schemas.HealthReportResponse;
export type HealthScanStartResponse = Components.Schemas.HealthScanStartResponse;
export type HealthSeverityCounts = Components.Schemas.HealthSeverityCounts;
export type IndexRebuildResponse = Components.Schemas.IndexRebuildResponse;
export type IndexStatusResponse = Components.Schemas.IndexStatusResponse;
export type LineageEntryResponse = Components.Schemas.LineageEntryResponse;
export type MatchSuggestion = Components.Schemas.MatchSuggestion;
export type Preview = Components.Schemas.Preview;
export type PreviewStatus = Components.Schemas.PreviewStatus;
export type ResourceType = Components.Schemas.ResourceType;
export type SnapshotInventoryItem = Components.Schemas.SnapshotInventoryItem;
export type SnapshotInventorySkippedType = Components.Schemas.SnapshotInventorySkippedType;
export type SuggestMatchesRequest = Components.Schemas.SuggestMatchesRequest;
export type SuggestMatchesResponse = Components.Schemas.SuggestMatchesResponse;
export type SyncDependencyReason = Components.Schemas.SyncDependencyReason;
export type SyncDirection = Components.Schemas.SyncDirection;
export type SyncJob = Components.Schemas.SyncJob;
export type SyncJobBatch = Components.Schemas.SyncJobBatch;
export type SyncJobCounts = Components.Schemas.SyncJobCounts;
export type SyncJobEvent = Components.Schemas.SyncJobEvent;
export type SyncJobEventDependency = Components.Schemas.SyncJobEventDependency;
export type SyncJobEventListResponse = Components.Schemas.SyncJobEventListResponse;
export type SyncJobHealth = Components.Schemas.SyncJobHealth;
export type SyncJobHealthCheck = Components.Schemas.SyncJobHealthCheck;
export type SyncJobHealthStatus = Components.Schemas.SyncJobHealthStatus;
export type SyncJobListResponse = Components.Schemas.SyncJobListResponse;
export type SyncJobRequest = Components.Schemas.SyncJobRequest;
export type SyncJobResource = Components.Schemas.SyncJobResource;
export type SyncJobResourceListResponse = Components.Schemas.SyncJobResourceListResponse;
export type SyncJobResourceRef = Components.Schemas.SyncJobResourceRef;
export type SyncJobResourceStatus = Components.Schemas.SyncJobResourceStatus;
export type SyncJobRetryErrorResponse = Components.Schemas.SyncJobRetryErrorResponse;
export type SyncJobRetryPlan = Components.Schemas.SyncJobRetryPlan;
export type SyncJobRetryPlanRequest = Components.Schemas.SyncJobRetryPlanRequest;
export type SyncJobRetryRequest = Components.Schemas.SyncJobRetryRequest;
export type SyncJobStatus = Components.Schemas.SyncJobStatus;
export type SyncPhase = Components.Schemas.SyncPhase;
export type SyncPlan = Components.Schemas.SyncPlan;
export type SyncPlanAction = Components.Schemas.SyncPlanAction;
export type SyncPlanApplyErrorResponse = Components.Schemas.SyncPlanApplyErrorResponse;
export type SyncPlanApplyRequest = Components.Schemas.SyncPlanApplyRequest;
export type SyncPlanChange = Components.Schemas.SyncPlanChange;
export type SyncPlanCounts = Components.Schemas.SyncPlanCounts;
export type SyncPlanDiff = Components.Schemas.SyncPlanDiff;
export type SyncPlanDiffListResponse = Components.Schemas.SyncPlanDiffListResponse;
export type SyncPlanDiffStatus = Components.Schemas.SyncPlanDiffStatus;
export type SyncPlanMatch = Components.Schemas.SyncPlanMatch;
export type SyncPlanMissingDependency = Components.Schemas.SyncPlanMissingDependency;
export type SyncPlanReplanRequest = Components.Schemas.SyncPlanReplanRequest;
export type SyncRequiredBy = Components.Schemas.SyncRequiredBy;
export type SyncResourcePlan = Components.Schemas.SyncResourcePlan;
