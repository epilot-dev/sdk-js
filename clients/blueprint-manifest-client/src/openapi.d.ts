import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type JobID = /**
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        Schemas.JobID;
    }
    export interface PathParameters {
        JobID?: Parameters.JobID;
    }
    namespace Schemas {
        export interface AppBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
            source_type: "app";
            resources?: BlueprintResource[];
        }
        export type Blueprint = CustomBlueprint | FileBlueprint | MarketplaceBlueprint | DeployedBlueprint | AppBlueprint;
        export interface BlueprintDependenciesSyncJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "dependencies_sync";
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED";
        }
        export interface BlueprintExportJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "export";
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED";
            download_file?: S3Reference;
        }
        /**
         * ID of a blueprint
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintID = string;
        export type BlueprintInstallStatus = "SUCCESS" | "PARTIAL" | "FAILED";
        export interface BlueprintInstallationJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "install";
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app";
            source_org_id?: string;
            source_blueprint_file?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            destination_org_id?: string;
            /**
             * Blueprint slug for marketplace blueprints
             */
            slug?: string;
            /**
             * Engine used for this install job
             */
            sync_engine?: "terraform" | "v3";
            /**
             * Per-resource live status. Populated only for V3 installs.
             */
            resource_progress?: V3ResourceProgressEntry[];
            status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
        }
        export interface BlueprintInstallationJobOptions {
            /**
             * List of resource addresses to ignore changes for. When a resource is marked as create, it will be ignored and not created.
             */
            resources_to_ignore?: string[];
        }
        export type BlueprintJob = BlueprintExportJob | BlueprintInstallationJob | BlueprintRestoreJob | BlueprintDependenciesSyncJob | BlueprintValidateJob | BlueprintVerificationJob;
        export interface BlueprintJobEvent {
            timestamp?: string; // date-time
            message?: string;
            errors?: FormattedError[];
            level?: "info" | "warning" | "error";
            data?: {
                installed_blueprint_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                BlueprintID;
                export_job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                BlueprintJobID;
                resources?: number;
            };
        }
        /**
         * ID of a job
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintJobID = string;
        export interface BlueprintPatch {
            patch_id?: string;
            version?: number;
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            rollout_id?: string;
            source_org_id?: string;
            name?: string;
            description?: string;
            status?: "draft" | "ready" | "applying" | "applied" | "partial";
            resources?: PatchResourceDiff[];
            changelog?: string;
            created_by?: string;
            created_at?: string; // date-time
            applied_at?: string; // date-time
        }
        export interface BlueprintPatchWithResults {
            patch_id?: string;
            version?: number;
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            rollout_id?: string;
            source_org_id?: string;
            name?: string;
            description?: string;
            status?: "draft" | "ready" | "applying" | "applied" | "partial";
            resources?: PatchResourceDiff[];
            changelog?: string;
            created_by?: string;
            created_at?: string; // date-time
            applied_at?: string; // date-time
            org_results?: OrgPatchExecution[];
        }
        /**
         * Preview data for a blueprint before installation. Stored temporarily with TTL.
         */
        export interface BlueprintPreview {
            /**
             * Unique preview ID
             */
            id: string;
            /**
             * Organization ID
             */
            org_id: string;
            title: string;
            description?: {
                preinstall?: string;
            };
            version?: string;
            slug?: string;
            source_type: "marketplace" | "file";
            /**
             * S3 key of the blueprint zip file
             */
            blueprint_file_s3_key: string;
            is_verified: boolean;
            docs_url?: string;
            recommended_apps?: string[];
            required_features?: {
                enabled?: string[];
                disabled?: string[];
            };
            created_at: string; // date-time
            created_by: CallerIdentity;
            /**
             * Whether the blueprint is updating to the latest version in the marketplace
             */
            is_updating: boolean;
            resources: BlueprintResource[];
        }
        export interface BlueprintResource {
            id: /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintResourceID;
            name?: string;
            type: /* Type of the resource */ ResourceNodeType;
            address?: string;
            /**
             * When a resource is marked as root, we'll be able to keep track of it's dependencies
             */
            is_root?: boolean;
            /**
             * when editing a blueprint, this indicates if the resource is ready to be exported and when installing a blueprint, this indicates if the resource is ready to be used
             */
            is_ready?: boolean;
            /**
             * When a resource is marked as hidden, it's used to hide it from the UI
             */
            is_hidden?: boolean;
            /**
             * When a resource is marked as disabled, it will be skipped during export
             */
            is_disabled?: boolean;
            hard_dependencies?: /* Type of the resource */ ResourceNodeType[];
            /**
             * Used to automatically remove resources with hard dependencies and to block deletion of resources with hard dependencies
             */
            parent_resource_ids?: /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintResourceID[];
            /**
             * Terraform addresses this resource references (for dependency-aware ignore)
             */
            depends_on_addresses?: string[];
            impact_on_install?: ("create" | "update" | "internal-update" | "no-op" | "delete" | "ignored" | "error")[];
            /**
             * Fields causing the updates / internal updates on a resource install
             */
            impact_on_install_reason?: string[];
        }
        /**
         * ID of a blueprint resource
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintResourceID = string;
        export interface BlueprintRestoreJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "restore";
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            destination_org_id?: string;
            /**
             * The install job whose deployment is being reverted. Maps back
             * to the entry in `Blueprint.deployments[]`.
             *
             */
            install_job_id?: string | null;
            /**
             * The snapshot driving Phase 1 of the restore. Null for sweep-only
             * restores (pure-create deployments with no captured manifest).
             *
             */
            snapshot_id?: string | null;
            sync_engine?: "v3";
            status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
            /**
             * Absent while the job is still IN_PROGRESS.
             */
            restore_result?: {
                /**
                 * The snapshot driving Phase 1 of the restore. Null/absent for
                 * sweep-only restores (pure-create deployments with no captured
                 * manifest).
                 *
                 */
                snapshot_id?: string | null;
                resources?: RestoreOutcomeItem[];
                /**
                 * `true` iff at least one entry in `resources` has an effective
                 * action (`action` is `restore` or `delete`). `false` when every
                 * resource would be skipped (all `skip` / `failed`). Consumers
                 * can gate the "Revert sync" confirm button on this — if false,
                 * executing the revert is a no-op.
                 *
                 */
                has_effective_changes?: boolean;
            } | null;
        }
        export interface BlueprintValidateJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "validate";
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: "IN_PROGRESS" | "SUCCESS" | "FAILED";
            /**
             * Present when status is SUCCESS or FAILED.
             */
            valid?: boolean;
            /**
             * Present when valid is false.
             */
            errors?: FormattedError[];
        }
        export interface BlueprintVerificationJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            job_type?: "verification";
            source_org_id?: string;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            destination_org_id?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            installation_job_id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            /**
             * Install engine used by the linked installation job, when known.
             */
            sync_engine?: "terraform" | "v3";
            status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
            summary?: VerificationSummary;
            resource_results?: ResourceVerificationResult[];
            /**
             * S3 key for detailed results when too large for inline storage.
             */
            resource_results_s3_key?: string;
        }
        /**
         * Bulk install parent. Never carries target auth tokens.
         */
        export interface BulkInstall {
            bulk_job_id?: string;
            source_org_id?: string;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: /**
             * Aggregate status for a bulk install or one of its targets.
             * - `QUEUED`: not started yet
             * - `IN_PROGRESS`: at least one target queued/in-progress, not all done
             * - `SUCCESS`: all targets succeeded
             * - `PARTIAL_SUCCESS`: all targets terminal with a mix of success/partial/failure
             * - `FAILED`: all targets terminal and none succeeded or partially succeeded
             *
             */
            BulkInstallStatus;
            target_count?: number;
            max_concurrency?: number;
            counts?: /* Tally of target rows by status. Recomputed from target rows on each transition. */ BulkInstallCounts;
            slug?: string;
            options?: BlueprintInstallationJobOptions;
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        /**
         * Tally of target rows by status. Recomputed from target rows on each transition.
         */
        export interface BulkInstallCounts {
            queued?: number;
            in_progress?: number;
            success?: number;
            partial_success?: number;
            failed?: number;
        }
        export interface BulkInstallCreateRequest {
            /**
             * The org that owns the source blueprint. Optional; defaults to the caller org and,
             * if provided, must equal it — source reads use the caller's token, and the bulk job
             * is owned/polled by the caller org. A different value is rejected with 400.
             *
             */
            source_org_id?: string;
            source_blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            /**
             * Maximum number of concurrently active child installs.
             */
            max_concurrency?: number;
            slug?: string;
            options?: BlueprintInstallationJobOptions;
            targets: [
                BulkInstallTargetInput,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?,
                BulkInstallTargetInput?
            ];
        }
        /**
         * Aggregate status for a bulk install or one of its targets.
         * - `QUEUED`: not started yet
         * - `IN_PROGRESS`: at least one target queued/in-progress, not all done
         * - `SUCCESS`: all targets succeeded
         * - `PARTIAL_SUCCESS`: all targets terminal with a mix of success/partial/failure
         * - `FAILED`: all targets terminal and none succeeded or partially succeeded
         *
         */
        export type BulkInstallStatus = "QUEUED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
        /**
         * A single destination of a bulk install. `job` is the hydrated latest child
         * install job derived from `job_ids.at(-1)`. Auth tokens are never stored or returned.
         *
         */
        export interface BulkInstallTarget {
            bulk_job_id?: string;
            destination_org_id?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: /**
             * Aggregate status for a bulk install or one of its targets.
             * - `QUEUED`: not started yet
             * - `IN_PROGRESS`: at least one target queued/in-progress, not all done
             * - `SUCCESS`: all targets succeeded
             * - `PARTIAL_SUCCESS`: all targets terminal with a mix of success/partial/failure
             * - `FAILED`: all targets terminal and none succeeded or partially succeeded
             *
             */
            BulkInstallStatus;
            job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * The hydrated latest child install job (`job_ids.at(-1)`), when present.
             */
            job?: {
                id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                BlueprintJobID;
                events?: BlueprintJobEvent[];
                triggered_at?: string; // date-time
                created_by?: CallerIdentity;
                job_type?: "install";
                source_blueprint_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                BlueprintID;
                source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app";
                source_org_id?: string;
                source_blueprint_file?: string;
                destination_blueprint_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                BlueprintID;
                destination_org_id?: string;
                /**
                 * Blueprint slug for marketplace blueprints
                 */
                slug?: string;
                /**
                 * Engine used for this install job
                 */
                sync_engine?: "terraform" | "v3";
                /**
                 * Per-resource live status. Populated only for V3 installs.
                 */
                resource_progress?: V3ResourceProgressEntry[];
                status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "CANCELED" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
            } | null;
        }
        export interface BulkInstallTargetInput {
            destination_org_id: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            /**
             * Write-only org-scoped token for the destination org. Never persisted or returned.
             */
            destination_auth_token: string;
        }
        export interface BulkInstallTargetList {
            results?: /**
             * A single destination of a bulk install. `job` is the hydrated latest child
             * install job derived from `job_ids.at(-1)`. Auth tokens are never stored or returned.
             *
             */
            BulkInstallTarget[];
            /**
             * Opaque cursor for the next page. Absent on the last page.
             */
            next_cursor?: string;
        }
        export interface CallerIdentity {
            /**
             * a human readable name of the caller (e.g. user name, token name or email address)
             * example:
             * manifest@epilot.cloud
             */
            name?: any;
            /**
             * epilot organization id
             * example:
             * 911690
             */
            org_id: string;
            /**
             * epilot user id, when called by a user
             * example:
             * 11001045
             */
            user_id?: string;
            /**
             * token id, when called by API token
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            token_id?: string;
        }
        export interface CommonBlueprintFields {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
        }
        export interface CommonBlueprintJobFields {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
        }
        export interface CommonImportFields {
            source_type?: ManifestSource;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
        }
        export interface CommonManifestFields {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            pre_install_requirements?: /**
             * List of feature settings that must be enabled before installing the blueprint
             * example:
             * [
             *   "journey_automation",
             *   "ticket-entities",
             *   "advanced_permissions"
             * ]
             */
            PreInstallRequirements;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
        }
        export interface CommonMarkdownFields {
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
        }
        export interface CommonResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
        }
        export interface CustomBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
            resources?: BlueprintResource[];
            source_type: "custom";
        }
        export interface DeployedBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
            source_type: "deploy";
            resources?: BlueprintResource[];
        }
        export interface DetectChangesResult {
            resources?: PatchResourceDiff[];
        }
        export interface FieldDiff {
            /**
             * JSON path to the differing field (e.g. "steps[2].name")
             */
            path?: string;
            source_value?: any;
            destination_value?: any;
            diff_type?: "value_changed" | "field_missing_in_destination" | "field_missing_in_source" | "type_mismatch";
        }
        export interface FileBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
            source_type: "file";
            resources?: BlueprintResource[];
        }
        export interface FormattedError {
            error?: string | {
                [key: string]: any;
            };
            code?: FormattedErrorCodes;
            data?: {
                formattedResource?: FormattedErrorData;
                resource?: string;
                resourceDependency?: string;
                resources?: string[];
                addresses?: string[];
                originalError?: string;
            };
        }
        export type FormattedErrorCodes = "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_validate_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error" | "bad_request" | "forbidden" | "conflict" | "not_found" | "undeclared_resource" | "invalid_readonly_attribute" | "invalid_attribute_value" | "unsupported_attribute" | "self_referential_block" | "circular_dependency" | "state_mismatch" | "import_nonexistent_object" | "provider_install_error" | "stale_blueprint";
        export interface FormattedErrorData {
            id?: string;
            name?: string;
            type?: string;
        }
        /**
         * Summary of an installed marketplace blueprint for version tracking
         */
        export interface InstalledMarketplaceBlueprintItem {
            id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            /**
             * URL slug of the blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            slug: string;
            /**
             * Version of the installed blueprint
             * example:
             * v1.0.0
             */
            version?: string;
            created_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_at?: string; // date-time
            updated_by?: CallerIdentity;
            /**
             * Whether a newer version is available in the marketplace
             * example:
             * true
             */
            has_update_available?: boolean;
            /**
             * The latest version available in the marketplace
             * example:
             * v2.0.0
             */
            latest_marketplace_version?: string;
            /**
             * URL to install/update the blueprint from the marketplace
             */
            installation_link?: string;
        }
        export interface Job {
            job_id?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            job_status?: JobStatus;
            /**
             * The S3 key of the manifest file
             */
            manifest_file_path?: string;
            message?: string;
            timestamp?: string; // date-time
            /**
             * An URL to download the plan file
             */
            plan_file_content?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_export?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to export when the resources are too large to be included in the response
             */
            large_resources_to_export_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_import?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to import when the resources are too large to be included in the response
             */
            large_resources_to_import_url?: string;
            resource_replacements?: ResourceReplacement[];
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            errors?: FormattedError[];
            source_type?: ManifestSource;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            pre_install_requirements?: /**
             * List of feature settings that must be enabled before installing the blueprint
             * example:
             * [
             *   "journey_automation",
             *   "ticket-entities",
             *   "advanced_permissions"
             * ]
             */
            PreInstallRequirements;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
        }
        /**
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        export type JobID = string;
        export type JobStatus = "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
        export interface LatestBlueprintVerification {
            job_id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
            triggered_at?: string; // date-time
            source_org_id?: string;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            destination_org_id?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            installation_job_id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            sync_engine?: "terraform" | "v3";
            summary?: VerificationSummary;
        }
        export interface LineageEntry {
            /**
             * Immutable resource identity across orgs
             */
            lineage_id?: string;
            /**
             * Resource ID in the destination org
             */
            target_id?: string;
            resource_type?: /* Type of the resource */ ResourceNodeType;
            blueprint_instance_ids?: string[];
            fidelity?: "full" | "partial";
            last_synced_at?: string; // date-time
        }
        export interface Manifest {
            import_job_id?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            /**
             * List of job IDs that were used to install the manifest
             */
            previous_jobs_ids?: string[];
            /**
             * List of jobs that were used to install the manifest
             */
            previous_jobs?: Job[];
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            pre_install_requirements?: /**
             * List of feature settings that must be enabled before installing the blueprint
             * example:
             * [
             *   "journey_automation",
             *   "ticket-entities",
             *   "advanced_permissions"
             * ]
             */
            PreInstallRequirements;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        /**
         * ID of an imported / installed manifest
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type ManifestID = string;
        export interface ManifestItem {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            pre_install_requirements?: /**
             * List of feature settings that must be enabled before installing the blueprint
             * example:
             * [
             *   "journey_automation",
             *   "ticket-entities",
             *   "advanced_permissions"
             * ]
             */
            PreInstallRequirements;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export type ManifestSource = "file" | "marketplace" | "sandbox";
        export interface ManifestTimestampFields {
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export interface MarketplaceBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            deployments?: {
                source_org_id?: string;
                source_blueprint_id?: string;
                destination_org_id?: string;
                destination_blueprint_id?: string;
                /**
                 * Blueprint installation job that created or updated this deployment record
                 */
                job_id?: string;
                triggered_at?: string; // date-time
                /**
                 * User-provided note about this synchronization
                 */
                note?: string;
                /**
                 * Outcome of this deployment
                 */
                status?: "IN_PROGRESS" | "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED";
                /**
                 * Restore lifecycle metadata for this deployment.
                 */
                restore_details?: {
                    /**
                     * Whether this sync changed destination resources in a way that can
                     * be reverted. `false` means the sync completed without create,
                     * update, internal-update, or delete impacts, so there is no revert
                     * action to offer.
                     *
                     */
                    has_revertible_changes?: boolean;
                    /**
                     * Counts of resource impact values from the V3 apply result.
                     */
                    resource_impact_summary?: {
                        create?: number;
                        update?: number;
                        internal_update?: number;
                        delete?: number;
                        no_op?: number;
                        ignored?: number;
                    };
                    /**
                     * BlueprintInstallationJob id of the most recent restore that ran
                     * against this deployment. Used by the FE to keep the restore-status
                     * badge visible across page reloads. Frontends poll this job to
                     * render the latest restore outcome.
                     *
                     */
                    last_restore_job_id?: string;
                    /**
                     * Timestamp of the most recent restore that ran against this
                     * deployment. Stamped when the restore sweep finishes. Used by the
                     * FE to show when a sync was reverted.
                     *
                     */
                    last_restore_at?: string; // date-time
                    /**
                     * Identity of the caller who triggered the most recent restore.
                     * Stamped when the restore sweep finishes. Used by the FE to show
                     * who reverted a sync.
                     *
                     */
                    last_restored_by?: {
                        /**
                         * Display name (email or token name) of the restorer.
                         */
                        name?: string;
                        /**
                         * User id of the restorer, when triggered by a user.
                         */
                        user_id?: string;
                    };
                    /**
                     * Computed server-side from `(job_id, restore_details.last_restore_job_id, installation_status)`.
                     * `available` when the deployment is restorable but has no prior
                     * restore (including pure-create deployments without `snapshot_id`,
                     * reverted via sweep-only);
                     * `in_progress` while an install or restore is running on this
                     * blueprint instance;
                     * `restored` / `partially_restored` / `restore_failed` reflect the
                     * terminal status of the job referenced by `last_restore_job_id`;
                     * `unavailable` means there is no revert action, for example
                     * malformed deployment rows missing `job_id` or no-change syncs.
                     *
                     */
                    status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
                };
                /**
                 * Deprecated. Use `restore_details.has_revertible_changes`.
                 *
                 */
                has_revertible_changes?: boolean;
                /**
                 * Deprecated. Use `restore_details.last_restore_job_id`.
                 *
                 */
                last_restore_job_id?: string;
                /**
                 * Deprecated. Use `restore_details.status`.
                 *
                 */
                restore_status?: "available" | "in_progress" | "restored" | "partially_restored" | "restore_failed" | "unavailable";
            }[];
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            latest_verification?: LatestBlueprintVerification;
            /**
             * Resource addresses excluded during the latest install/update and ignored by verification.
             */
            ignored_resource_addresses?: string[];
            installation_status?: "IN_PROGRESS" | "CANCELED" | "PARTIAL" | "SUCCESS" | "FAILED";
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            installation_job_ids?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID[];
            /**
             * ID of the blueprint that brought this blueprint to the destination org (deployed or installed)
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            source_blueprint_id?: string;
            /**
             * Whether the blueprint is archived (soft-deleted). Archived blueprints are hidden from the main list.
             */
            archived?: boolean;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * List of recommended app IDs for the blueprint
             */
            recommended_apps?: string[];
            /**
             * Feature constraints for blueprint installation
             */
            required_features?: {
                /**
                 * Features that must be enabled in the target org
                 */
                enabled?: string[];
                /**
                 * Features that must be disabled in the target org
                 */
                disabled?: string[];
            };
            /**
             * Custom name for the exported zip file
             */
            zip_file_name?: string;
            source_type: "marketplace";
            resources?: BlueprintResource[];
            /**
             * Whether a newer version is available in the marketplace.
             */
            has_update_available?: boolean;
            /**
             * The latest version available in the marketplace.
             * example:
             * v2.0.0
             */
            latest_marketplace_version?: string;
            /**
             * URL to install/update the blueprint from the marketplace.
             */
            installation_link?: string;
        }
        export interface MarketplaceListing {
            id: string; // uuid
            blueprint_id: string;
            name: string;
            slug: string;
            logo?: string | null;
            documentation_url?: string | null;
            pricing_type?: "free" | "paid" | "freemium" | "contact_us";
            support_email?: string | null;
            portal_description?: string | null;
            teaser_name?: string | null;
            teaser_short_description?: string | null;
            teaser_thumbnail?: string | null;
            details_page_title?: string | null;
            details_page_description?: string | null;
            details_page_hero_image?: string | null;
            details_page_carousel?: string[] | null;
            resources_section_description?: string | null;
            resources_section_benefits_title?: string | null;
            resources_section_benefits_list?: string | null;
            resources_section_process_details?: string | null;
            partner?: string | null;
            partner_subtext?: string | null;
            partner_logo?: string | null;
            partner_website_link?: string | null;
            last_updated_on?: string | null;
            requires_customer_portal?: boolean | null;
            process_details_section_title?: string | null;
            is_new_blueprint?: boolean | null;
            available_in?: string | null;
            testimonials?: string[] | null;
            installation_link?: string | null;
            installation_slug?: string | null;
            demo_form_link?: string | null;
            order?: number | null;
            categories?: string[] | null;
            main_category?: string[] | null;
            status: "draft" | "live" | "archived";
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        export interface MarketplaceListingUpdate {
            name?: string;
            slug?: string;
            logo?: string | null;
            documentation_url?: string | null;
            pricing_type?: "free" | "paid" | "freemium" | "contact_us";
            support_email?: string | null;
            portal_description?: string | null;
            teaser_name?: string | null;
            teaser_short_description?: string | null;
            teaser_thumbnail?: string | null;
            details_page_title?: string | null;
            details_page_description?: string | null;
            details_page_hero_image?: string | null;
            details_page_carousel?: string[] | null;
            resources_section_description?: string | null;
            resources_section_benefits_title?: string | null;
            resources_section_benefits_list?: string | null;
            resources_section_process_details?: string | null;
            partner?: string | null;
            partner_subtext?: string | null;
            partner_logo?: string | null;
            partner_website_link?: string | null;
            last_updated_on?: string | null;
            requires_customer_portal?: boolean | null;
            process_details_section_title?: string | null;
            is_new_blueprint?: boolean | null;
            available_in?: string | null;
            testimonials?: string[] | null;
            installation_link?: string | null;
            installation_slug?: string | null;
            demo_form_link?: string | null;
            order?: number | null;
            categories?: string[] | null;
            main_category?: string[] | null;
        }
        export interface MarketplaceListingVersion {
            id: string; // uuid
            listing_id: string;
            status: "draft" | "published" | "archived";
            version_name?: string | null;
            draft_label: string;
            update_note?: string | null;
            resources?: {
                [key: string]: any;
            }[] | null;
            required_features?: string[] | null;
            recommended_apps?: string[] | null;
            created_at: string; // date-time
            published_at?: string | null; // date-time
        }
        export interface OrgPatchExecution {
            patch_id?: string;
            version?: number;
            org_id?: string;
            org_name?: string;
            dest_blueprint_id?: string;
            status?: "pending" | "in_progress" | "success" | "failed";
            error?: string;
            applied_at?: string; // date-time
            retries?: number;
            changes_applied?: PatchFieldDiff[];
        }
        export interface PatchFieldDiff {
            path?: string;
            op?: "changed" | "added" | "removed";
            baseline_value?: any;
            current_value?: any;
        }
        export interface PatchResourceDiff {
            type?: string;
            source_id?: string;
            address?: string;
            name?: string;
            changes?: PatchFieldDiff[];
        }
        export type PlanChanges = ("create" | "update" | "internal-update" | "no-op" | "delete" | "ignored")[];
        /**
         * List of feature settings that must be enabled before installing the blueprint
         * example:
         * [
         *   "journey_automation",
         *   "ticket-entities",
         *   "advanced_permissions"
         * ]
         */
        export type PreInstallRequirements = string[];
        export interface PutManifestPayload {
            /**
             * Name of the source blueprint
             */
            source_blueprint_name?: string;
            /**
             * Markdown content of the manifest
             */
            markdown?: string;
            /**
             * Array of ids of resources selected to be ready by the user
             */
            ready_resources?: string[];
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                last_triggered_at?: string;
            }[];
        }
        export interface ResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Original ID of the exported resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: ResourceNode[] | null;
            parents?: {
                id?: string;
                type?: /* Type of the resource */ ResourceNodeType;
            }[];
            changes?: PlanChanges;
            /**
             * Fields causing the updates / internal updates on a resource install
             */
            changes_reason?: string[];
        }
        /**
         * Type of the resource
         */
        export type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "product_recommendation" | "coupon" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "integration" | "dashboard" | "custom_variable" | "usergroup" | "saved_view" | "app" | "role" | "portal_config" | "target" | "kanban" | "validation_rule" | "flow_template" | "taxonomy" | "notification_template" | "environment_variable" | "datasource" | "family" | "permission";
        export interface ResourceReplacement {
            /**
             * Original resource ID to be replaced
             */
            originalAddress: string;
            /**
             * ID of the resource that will replace the original
             */
            replacementId: string;
            /**
             * Name of the resource that will replace the original
             */
            replacementName?: string;
        }
        export interface ResourceVerificationResult {
            resource_type?: /* Type of the resource */ ResourceNodeType;
            resource_name?: string;
            source_resource_id?: string;
            source_resource_address?: string;
            destination_resource_id?: string;
            destination_resource_address?: string;
            status?: "matched" | "mismatched" | "missing_in_destination" | "fetch_error";
            /**
             * Explains whether this result is likely downstream of another failed resource.
             */
            failure_context?: "depends_on_failed_resource" | "may_be_caused_by_failed_dependency";
            failed_dependency_resource_ids?: string[];
            failed_dependency_resource_names?: string[];
            failed_dependency_addresses?: string[];
            field_diffs?: FieldDiff[];
            error?: string;
        }
        export interface RestoreOutcome {
            /**
             * The snapshot driving Phase 1 of the restore. Null/absent for
             * sweep-only restores (pure-create deployments with no captured
             * manifest).
             *
             */
            snapshot_id?: string | null;
            resources?: RestoreOutcomeItem[];
            /**
             * `true` iff at least one entry in `resources` has an effective
             * action (`action` is `restore` or `delete`). `false` when every
             * resource would be skipped (all `skip` / `failed`). Consumers
             * can gate the "Revert sync" confirm button on this — if false,
             * executing the revert is a no-op.
             *
             */
            has_effective_changes?: boolean;
        }
        export interface RestoreOutcomeItem {
            lineage_id: string;
            type: string;
            name?: string | null;
            target_id?: string | null;
            /**
             * On `restore-preview`: the action the restore would take.
             * On `restore_result`: the action that was applied.
             * `failed` only appears on `restore_result`.
             *
             */
            action: "restore" | "delete" | "skip" | "failed";
            /**
             * Only set when `action == skip`.
             */
            reason?: "modified" | "delete_unsupported" | "heuristic_match" | "co_owned";
            /**
             * Only set when `reason == modified`. From the lineage row's last install write.
             */
            last_synced_at?: string | null; // date-time
            /**
             * Only set when `reason == modified`. From the destination resource's current state.
             */
            current_updated_at?: string | null; // date-time
            /**
             * Only set when `action == failed`.
             */
            error_message?: string | null;
            /**
             * Mirrors the install manifest's `is_hidden` for this resource —
             * helper resources (entity mappings, datasources, flow-template
             * automations) the UI hides on every other resources view. Absent
             * on rows from legacy installs without a persisted manifest.
             *
             */
            is_hidden?: boolean;
            /**
             * Only set when `reason == co_owned`. The other live blueprint
             * instances that still own this resource's lineage row — the
             * "another sync" the skip refers to.
             *
             */
            co_owned_by?: {
                blueprint_id: string;
                title?: string | null;
            }[];
        }
        export interface RootResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: VirtualResourceNodeGroup[] | null;
            changes?: PlanChanges;
            /**
             * Fields causing the updates / internal updates on a resource install
             */
            changes_reason?: string[];
        }
        export interface S3Reference {
            /**
             * example:
             * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
             */
            bucket: string;
            /**
             * example:
             * templates/main.tf
             */
            key: string;
        }
        export interface SelectedResources {
            exported_root_resources: {
                id: string;
                type: /* Type of the resource */ ResourceNodeType;
                /**
                 * Terraform address of the resource
                 */
                address?: string;
            }[];
            selected_resources: string[];
            /**
             * Pipeline ID selected when doing the sandbox sync
             */
            pipeline_id?: string;
        }
        export interface SuggestBlueprintResourcesRequest {
            /**
             * Natural-language description of what to include.
             * example:
             * everything for the hausanschluss use case
             */
            prompt: string;
            /**
             * When provided, suggestions are scoped as additions to this existing
             * blueprint — resources already in it are excluded from the response.
             *
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            blueprint_id?: string;
        }
        export interface SuggestBlueprintResourcesResponse {
            /**
             * Suggested resources to add. All marked is_root so the caller can request transitive dependency resolution.
             */
            resources: BlueprintResource[];
            /**
             * Short title derived from the prompt. Useful when the caller is
             * creating a new blueprint as a result of the suggestion — saves the
             * user from naming it themselves.
             *
             * example:
             * Hausanschluss
             */
            suggested_blueprint_name?: string;
            /**
             * Short human-readable summary of what was matched and why.
             */
            explanation?: string;
            /**
             * Hint to the caller: persist via bulkAddBlueprintResources with
             * ?add_dependencies=true so anchor resources (journeys, workflows)
             * pull their transitive dependencies.
             *
             */
            add_dependencies_recommended?: boolean;
        }
        export interface UniquenessCriteria {
            org_id: string;
            resource_type: /* Resource type for which custom uniqueness criteria can be configured. */ UniquenessCriteriaResourceType;
            fields: [
                string,
                ...string[]
            ];
            propagated_to?: string[];
            updated_at: string; // date-time
            updated_by?: string;
        }
        /**
         * Resource type for which custom uniqueness criteria can be configured.
         */
        export type UniquenessCriteriaResourceType = "emailtemplate" | "product" | "price" | "tax" | "coupon" | "product_recommendation" | "file" | "document_template" | "notification_template" | "journey";
        export interface UploadFilePayload {
            /**
             * example:
             * example.manifest.zip
             */
            filename: string;
        }
        export interface V3ResourceProgressEntry {
            lineage_id: string;
            type: string;
            address: string;
            name?: string;
            status: "pending" | "in_progress" | "done" | "failed" | "skipped";
            target_id?: string;
            error_message?: string;
        }
        export interface VerificationSummary {
            total_resources?: number;
            matched?: number;
            mismatched?: number;
            missing_in_destination?: number;
            fetch_errors?: number;
        }
        export interface VirtualResourceNodeGroup {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: true;
            dependencies?: ResourceNode[];
        }
    }
}
declare namespace Paths {
    namespace AddBlueprintResource {
        namespace Parameters {
            /**
             * Whether to add this resource dependencies to the blueprint automatically
             */
            export type AddDependencies = boolean;
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface QueryParameters {
            add_dependencies?: /* Whether to add this resource dependencies to the blueprint automatically */ Parameters.AddDependencies;
        }
        export type RequestBody = Components.Schemas.BlueprintResource;
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace ApplyPatch {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type PatchId = string;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            patch_id: Parameters.PatchId;
        }
        export interface RequestBody {
            org_id: string;
            org_name: string;
            dest_blueprint_id: string;
            dest_org_id?: string;
            /**
             * Auth token with access to the destination org (e.g. pipeline token)
             */
            destination_auth_token?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OrgPatchExecution;
        }
    }
    namespace ApplyPlan {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace BulkAddBlueprintResources {
        namespace Parameters {
            /**
             * Whether to add this resource dependencies to the blueprint automatically
             */
            export type AddDependencies = boolean;
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface QueryParameters {
            add_dependencies?: /* Whether to add this resource dependencies to the blueprint automatically */ Parameters.AddDependencies;
        }
        export type RequestBody = Components.Schemas.BlueprintResource[];
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace BulkDeleteBlueprintResources {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = /**
         * ID of a blueprint resource
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        Components.Schemas.BlueprintResourceID[];
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace BulkUpdateBlueprintResources {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = Components.Schemas.BlueprintResource[];
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace CancelBlueprintJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintJob;
        }
    }
    namespace ContinueInstallationJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export type RequestBody = Components.Schemas.BlueprintInstallationJobOptions;
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintInstallationJob;
        }
    }
    namespace CreateBlueprint {
        export type RequestBody = Components.Schemas.Blueprint;
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace CreateBulkInstallV3 {
        export type RequestBody = Components.Schemas.BulkInstallCreateRequest;
        namespace Responses {
            export type $202 = /* Bulk install parent. Never carries target auth tokens. */ Components.Schemas.BulkInstall;
            export interface $400 {
                message?: string;
            }
        }
    }
    namespace CreateExport {
        export interface RequestBody {
            resources: [
                {
                    type: /* Type of the resource */ Components.Schemas.ResourceNodeType;
                    id: string;
                },
                ...{
                    type: /* Type of the resource */ Components.Schemas.ResourceNodeType;
                    id: string;
                }[]
            ];
            jobId?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
            /**
             * Pipeline ID selected when doing the sandbox sync
             */
            pipelineId?: string;
            /**
             * ID of the installed manifest to load the resource addresses from
             */
            manifestId?: string;
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace CreateMarketplaceListing {
        namespace Parameters {
            export type BlueprintId = string;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            name: string;
            slug?: string;
        }
        namespace Responses {
            export type $201 = Components.Schemas.MarketplaceListing;
            export interface $409 {
            }
        }
    }
    namespace CreateMarketplaceListingVersion {
        namespace Parameters {
            export type ListingId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
        }
        namespace Responses {
            export type $201 = Components.Schemas.MarketplaceListingVersion;
            export interface $404 {
            }
        }
    }
    namespace CreatePatch {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            rollout_id: string;
            source_org_id: string;
            name: string;
            description?: string;
            resources: Components.Schemas.PatchResourceDiff[];
            changelog?: string;
        }
        namespace Responses {
            export type $201 = Components.Schemas.BlueprintPatch;
        }
    }
    namespace CreatePlan {
        export type RequestBody = {
            /**
             * s3ref of manifest file uploaded via `uploadManifest`
             */
            s3ref: {
                /**
                 * example:
                 * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
                 */
                bucket: string;
                /**
                 * example:
                 * templates/main.tf
                 */
                key: string;
            };
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
            /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            job_id?: string;
            /**
             * Source of the manifest
             */
            source?: "file" | "marketplace" | "sandbox";
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
            deployedFrom?: {
                sourceOrganizationId: string;
                sourceManifestId: string;
                sourceOrganizationType: "sandbox" | "production";
            };
        } | {
            /**
             * Manifest s3 key uploaded via `uploadManifest`
             */
            manifestFilePath: string;
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
            /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            job_id?: string;
            /**
             * Source of the manifest
             */
            source?: "file" | "marketplace" | "sandbox";
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
            deployedFrom?: {
                sourceOrganizationId: string;
                sourceManifestId: string;
                sourceOrganizationType: "sandbox" | "production";
            };
        };
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                jobId?: string;
            }
        }
    }
    namespace DeleteBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace DeleteBlueprintResource {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type ResourceId = /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintResourceID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            resource_id: Parameters.ResourceId;
        }
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace DeleteManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace DeleteMarketplaceListing {
        namespace Parameters {
            export type ListingId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteUniquenessCriteria {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DetectPatchChanges {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            /**
             * Organization ID of the source org where changes were made
             */
            source_org_id?: string;
            /**
             * Organization ID of a destination org (used to load tfstate baseline)
             */
            dest_org_id?: string;
            /**
             * Blueprint ID in the destination org (used to locate tfstate in S3)
             */
            dest_blueprint_id?: string;
            /**
             * ID of the mass rollout
             */
            rollout_id?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DetectChangesResult;
        }
    }
    namespace ExportBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            destination_org_id?: string;
            destination_blueprint_id?: string;
            /**
             * When true, run terraform validate before creating the export zip. If validation fails, the job will be marked as FAILED with errors.
             */
            validate?: boolean;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace ExportManifest {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * An array of resource IDs to export
             */
            selectedResourceIds: string[];
            /**
             * example:
             * journey_HouseConnectionJourney
             */
            resourceName: string;
            metadata?: {
                markdown?: {
                    manifest?: string;
                    preinstall?: string;
                    postinstall?: string;
                };
                docs_link?: string;
                source_blueprint_name?: string;
                source_blueprint_slug?: string;
                source_blueprint_version?: string;
            };
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
            generateAISummary?: boolean;
            language?: "en" | "de";
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace FormatBlueprintDescription {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            /**
             * Plain text to format as markdown
             */
            text: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * AI-formatted markdown content
                 */
                markdown?: string;
            }
        }
    }
    namespace GetBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace GetBlueprintJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintJob;
        }
    }
    namespace GetBlueprintLineageV3 {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $200 {
                total?: number;
                entries?: Components.Schemas.LineageEntry[];
            }
        }
    }
    namespace GetBlueprintPreview {
        namespace Parameters {
            export type PreviewId = string;
        }
        export interface PathParameters {
            preview_id: Parameters.PreviewId;
        }
        namespace Responses {
            export type $200 = /* Preview data for a blueprint before installation. Stored temporarily with TTL. */ Components.Schemas.BlueprintPreview;
            export interface $404 {
            }
        }
    }
    namespace GetBulkInstallV3 {
        namespace Parameters {
            export type BulkJobId = string;
        }
        export interface PathParameters {
            bulk_job_id: Parameters.BulkJobId;
        }
        namespace Responses {
            export type $200 = /* Bulk install parent. Never carries target auth tokens. */ Components.Schemas.BulkInstall;
            export interface $404 {
            }
        }
    }
    namespace GetJob {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Job;
        }
    }
    namespace GetManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace GetMarketplaceListing {
        namespace Parameters {
            export type BlueprintId = string;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $200 {
                id: string; // uuid
                blueprint_id: string;
                name: string;
                slug: string;
                logo?: string | null;
                documentation_url?: string | null;
                pricing_type?: "free" | "paid" | "freemium" | "contact_us";
                support_email?: string | null;
                portal_description?: string | null;
                teaser_name?: string | null;
                teaser_short_description?: string | null;
                teaser_thumbnail?: string | null;
                details_page_title?: string | null;
                details_page_description?: string | null;
                details_page_hero_image?: string | null;
                details_page_carousel?: string[] | null;
                resources_section_description?: string | null;
                resources_section_benefits_title?: string | null;
                resources_section_benefits_list?: string | null;
                resources_section_process_details?: string | null;
                partner?: string | null;
                partner_subtext?: string | null;
                partner_logo?: string | null;
                partner_website_link?: string | null;
                last_updated_on?: string | null;
                requires_customer_portal?: boolean | null;
                process_details_section_title?: string | null;
                is_new_blueprint?: boolean | null;
                available_in?: string | null;
                testimonials?: string[] | null;
                installation_link?: string | null;
                installation_slug?: string | null;
                demo_form_link?: string | null;
                order?: number | null;
                categories?: string[] | null;
                main_category?: string[] | null;
                status: "draft" | "live" | "archived";
                created_at?: string; // date-time
                updated_at?: string; // date-time
                versions?: Components.Schemas.MarketplaceListingVersion[];
                has_publishable_draft?: boolean;
            }
            export interface $404 {
            }
        }
    }
    namespace GetMarketplaceListingById {
        namespace Parameters {
            export type ListingId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
        }
        namespace Responses {
            export interface $200 {
                id: string; // uuid
                blueprint_id: string;
                name: string;
                slug: string;
                logo?: string | null;
                documentation_url?: string | null;
                pricing_type?: "free" | "paid" | "freemium" | "contact_us";
                support_email?: string | null;
                portal_description?: string | null;
                teaser_name?: string | null;
                teaser_short_description?: string | null;
                teaser_thumbnail?: string | null;
                details_page_title?: string | null;
                details_page_description?: string | null;
                details_page_hero_image?: string | null;
                details_page_carousel?: string[] | null;
                resources_section_description?: string | null;
                resources_section_benefits_title?: string | null;
                resources_section_benefits_list?: string | null;
                resources_section_process_details?: string | null;
                partner?: string | null;
                partner_subtext?: string | null;
                partner_logo?: string | null;
                partner_website_link?: string | null;
                last_updated_on?: string | null;
                requires_customer_portal?: boolean | null;
                process_details_section_title?: string | null;
                is_new_blueprint?: boolean | null;
                available_in?: string | null;
                testimonials?: string[] | null;
                installation_link?: string | null;
                installation_slug?: string | null;
                demo_form_link?: string | null;
                order?: number | null;
                categories?: string[] | null;
                main_category?: string[] | null;
                status: "draft" | "live" | "archived";
                created_at?: string; // date-time
                updated_at?: string; // date-time
                versions?: Components.Schemas.MarketplaceListingVersion[];
                has_publishable_draft?: boolean;
            }
            export interface $404 {
            }
        }
    }
    namespace GetPatch {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type PatchId = string;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            patch_id: Parameters.PatchId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintPatchWithResults;
            export interface $404 {
            }
        }
    }
    namespace GetRestorePreview {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RestoreOutcome;
            export interface $404 {
            }
        }
    }
    namespace GetUniquenessCriteria {
        namespace Responses {
            export type $200 = Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace InstallBlueprint {
        export interface RequestBody {
            source_org_id?: string;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * URL to the blueprint zip file
             */
            source_blueprint_file?: string;
            destination_org_id?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * Auth token with access to the source org. Required for cross-org auto-verification when the caller's bearer token belongs to the destination org.
             */
            source_auth_token?: string;
            /**
             * Auth token with access to the destination org. Defaults to the caller's bearer token.
             */
            destination_auth_token?: string;
            options?: Components.Schemas.BlueprintInstallationJobOptions;
            /**
             * Installation mode
             */
            mode: "simple" | "advanced";
            source_blueprint_type?: "marketplace";
            /**
             * Slug to enforce in this blueprint. Used in marketplace blueprints to keep it consistent with webflow.
             */
            slug?: string;
            /**
             * If true, automatically enable required features in the destination org before installing
             */
            auto_enable_features?: boolean;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
                destination_blueprint_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintID;
            }
        }
    }
    namespace InstallBlueprintV3 {
        export type RequestBody = {
            source_org_id: string;
            source_blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * S3 key to the blueprint zip file
             */
            source_blueprint_file?: string;
            destination_org_id: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * Auth token for the destination org. Required for cross-org installs where the caller's token belongs to the source org. Defaults to the caller's bearer token.
             */
            destination_auth_token?: string;
            options?: Components.Schemas.BlueprintInstallationJobOptions;
            /**
             * Slug for marketplace blueprint consistency
             */
            slug?: string;
            /**
             * When `true`, the install skips the manual plan-approval step and applies
             * straight after plan + snapshot succeed (no `:continue` call needed).
             * Defaults to `false`. Used internally by the bulk-install worker.
             *
             */
            auto_apply?: boolean;
        } | {
            source_org_id?: string;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * S3 key to the blueprint zip file
             */
            source_blueprint_file: string;
            destination_org_id: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * Auth token for the destination org. Required for cross-org installs where the caller's token belongs to the source org. Defaults to the caller's bearer token.
             */
            destination_auth_token?: string;
            options?: Components.Schemas.BlueprintInstallationJobOptions;
            /**
             * Slug for marketplace blueprint consistency
             */
            slug?: string;
            /**
             * When `true`, the install skips the manual plan-approval step and applies
             * straight after plan + snapshot succeed (no `:continue` call needed).
             * Defaults to `false`. Used internally by the bulk-install worker.
             *
             */
            auto_apply?: boolean;
        };
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
                destination_blueprint_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintID;
            }
            export interface $400 {
                message?: string;
            }
        }
    }
    namespace ListBlueprintJobs {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.BlueprintJob[];
            }
        }
    }
    namespace ListBlueprints {
        namespace Parameters {
            export type Archived = boolean;
        }
        export interface QueryParameters {
            archived?: Parameters.Archived;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.Blueprint[];
            }
        }
    }
    namespace ListBulkInstallTargetsV3 {
        namespace Parameters {
            export type BulkJobId = string;
            export type Cursor = string;
            export type Limit = number;
        }
        export interface PathParameters {
            bulk_job_id: Parameters.BulkJobId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BulkInstallTargetList;
            export interface $404 {
            }
        }
    }
    namespace ListInstalledManifests {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.ManifestItem[];
            }
        }
    }
    namespace ListInstalledMarketplaceBlueprints {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: /* Summary of an installed marketplace blueprint for version tracking */ Components.Schemas.InstalledMarketplaceBlueprintItem[];
            }
        }
    }
    namespace ListMarketplaceListingVersions {
        namespace Parameters {
            export type ListingId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
        }
        namespace Responses {
            export interface $200 {
                versions?: Components.Schemas.MarketplaceListingVersion[];
            }
        }
    }
    namespace ListMarketplaceListings {
        namespace Responses {
            export interface $200 {
                listings?: Components.Schemas.MarketplaceListing[];
            }
        }
    }
    namespace ListMarketplaceSlugs {
        namespace Responses {
            export interface $200 {
                results?: {
                    /**
                     * The installation slug identifier for the blueprint (used for publishing).
                     * example:
                     * wallbox_b2c
                     */
                    slug?: string;
                    /**
                     * The marketplace page slug for the Webflow CMS item (used for display).
                     * example:
                     * wallbox-b2c
                     */
                    marketplace_slug?: string;
                    /**
                     * example:
                     * v1.0.0
                     */
                    version?: string;
                    /**
                     * example:
                     * Wallbox B2C
                     */
                    name?: string;
                    /**
                     * example:
                     * https://portal.epilot.cloud/app/blueprints/install/marketplace/wallbox_b2c?s3Ref=https://example.com/blueprint.zip
                     */
                    installation_link?: string;
                }[];
            }
        }
    }
    namespace ListPatches {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $200 {
                total?: number;
                results?: Components.Schemas.BlueprintPatch[];
            }
        }
    }
    namespace ListUniquenessCriteria {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.UniquenessCriteria[];
                /**
                 * Built-in default uniqueness fields per resource type, as used by
                 * the install engines when no custom criteria are configured.
                 *
                 */
                defaults?: {
                    [name: string]: string[];
                };
                /**
                 * Resource types whose criteria are fixed by epilot and cannot be
                 * customized (writes are rejected). Shown read-only in the UI.
                 *
                 */
                readonly_types?: string[];
            }
        }
    }
    namespace PreInstallBlueprint {
        export interface RequestBody {
            /**
             * URL to the blueprint zip file
             */
            blueprint_file?: string;
            source_blueprint_type?: "marketplace";
            /**
             * Slug to enforce in this blueprint. Used in marketplace blueprints to keep it consistent with webflow.
             */
            slug?: string;
        }
        namespace Responses {
            export type $200 = /* Preview data for a blueprint before installation. Stored temporarily with TTL. */ Components.Schemas.BlueprintPreview;
        }
    }
    namespace PublishBlueprint {
        export interface RequestBody {
            blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * The marketplace installation slug for the Webflow CMS item
             */
            slug: string;
            /**
             * The version string to set on the marketplace CMS item (e.g. "1.0.0")
             */
            version?: string;
            /**
             * The display name for the blueprint on the marketplace CMS item
             */
            name?: string;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace PublishBlueprintV3 {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $202 {
                job_id: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace PublishMarketplaceListingVersion {
        namespace Parameters {
            export type ListingId = string;
            export type VersionId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
            version_id: Parameters.VersionId;
        }
        export interface RequestBody {
            version_name: string;
            update_note?: string | null;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MarketplaceListingVersion;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace PutUniquenessCriteria {
        export interface RequestBody {
            fields: [
                string,
                ...string[]
            ];
            /**
             * Org IDs this rule was also applied to (the UI's "Also apply to"
             * selection). Stored so the selection survives reloads; each target
             * org still holds its own criteria row.
             *
             */
            propagated_to?: string[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.UniquenessCriteria;
            export interface $400 {
            }
        }
    }
    namespace RestoreBlueprintDeploymentV3 {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
                blueprint_instance_id?: /**
                 * ID of a blueprint
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintID;
                snapshot_id?: string;
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace RetryBulkInstallTargetV3 {
        namespace Parameters {
            export type BulkJobId = string;
            export type DestinationOrgId = string;
        }
        export interface PathParameters {
            bulk_job_id: Parameters.BulkJobId;
            destination_org_id: Parameters.DestinationOrgId;
        }
        export interface RequestBody {
            /**
             * Write-only auth token for the destination org used for the new attempt.
             */
            destination_auth_token: string;
        }
        namespace Responses {
            export type $200 = /**
             * A single destination of a bulk install. `job` is the hydrated latest child
             * install job derived from `job_ids.at(-1)`. Auth tokens are never stored or returned.
             *
             */
            Components.Schemas.BulkInstallTarget;
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace RetryPatchOrg {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type OrgId = string;
            export type PatchId = string;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            patch_id: Parameters.PatchId;
            org_id: Parameters.OrgId;
        }
        export interface RequestBody {
            org_name?: string;
            dest_blueprint_id?: string;
            destination_auth_token?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OrgPatchExecution;
        }
    }
    namespace SuggestBlueprintResources {
        export type RequestBody = Components.Schemas.SuggestBlueprintResourcesRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestBlueprintResourcesResponse;
        }
    }
    namespace SyncDependencies {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type Trigger = "manual" | "pre_sync" | "post_revert";
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface QueryParameters {
            trigger?: Parameters.Trigger;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace UpdateBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = Components.Schemas.Blueprint;
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace UpdateBlueprintResource {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type ResourceId = /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintResourceID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            resource_id: Parameters.ResourceId;
        }
        export type RequestBody = Components.Schemas.BlueprintResource;
        namespace Responses {
            export interface $200 {
                resources?: Components.Schemas.BlueprintResource[];
            }
        }
    }
    namespace UpdateManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        export type RequestBody = Components.Schemas.PutManifestPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace UpdateMarketplaceListing {
        namespace Parameters {
            export type ListingId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
        }
        export type RequestBody = Components.Schemas.MarketplaceListingUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.MarketplaceListing;
            export interface $404 {
            }
        }
    }
    namespace UpdateMarketplaceListingVersion {
        namespace Parameters {
            export type ListingId = string;
            export type VersionId = string;
        }
        export interface PathParameters {
            listing_id: Parameters.ListingId;
            version_id: Parameters.VersionId;
        }
        export interface RequestBody {
            update_note?: string | null;
            required_features?: string[];
            recommended_apps?: string[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.MarketplaceListingVersion;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace UploadManifest {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * example:
                 * https://epilot-dev-blueprints.s3.eu-central-1.amazonaws.com/templates/document.pdf
                 */
                upload_url?: string; // url
            }
        }
    }
    namespace V1BlueprintManifestUniquenessCriteria$ResourceType {
        namespace Parameters {
            export type ResourceType = /* Resource type for which custom uniqueness criteria can be configured. */ Components.Schemas.UniquenessCriteriaResourceType;
        }
        export interface PathParameters {
            resource_type: Parameters.ResourceType;
        }
    }
    namespace ValidateBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
            export interface $404 {
            }
        }
    }
    namespace VerifyBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface RequestBody {
            /**
             * Organization ID of the source org
             */
            source_org_id: string;
            source_blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * Organization ID of the destination org
             */
            destination_org_id: string;
            destination_blueprint_id: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * Auth token with access to the source org (e.g. pipeline token). If not provided, the caller's bearer token is used for both orgs.
             */
            source_auth_token?: string;
            /**
             * Auth token with access to the destination org. Required for cross-org verification when the caller token only has access to the source org. If not provided, the caller's bearer token is used for both orgs.
             */
            destination_auth_token?: string;
            /**
             * Optional install job this verification is checking. If omitted, the latest destination blueprint installation job is used when available.
             */
            installation_job_id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
            /**
             * Optional install engine hint. Usually inferred from installation_job_id.
             */
            sync_engine?: "terraform" | "v3";
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getJob - getJob
   * 
   * Get the current status of a blueprint (export or import)
   */
  'getJob'(
    parameters?: Parameters<Paths.GetJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJob.Responses.$200>
  /**
   * createExport - createExport
   * 
   * Creates a new Export Job with a list of available resources to export from the passed root resource.
   * 
   * Multiple root resources can be added by calling this multiple times with the same jobId
   * 
   */
  'createExport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExport.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExport.Responses.$200>
  /**
   * exportManifest - exportManifest
   * 
   * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
   */
  'exportManifest'(
    parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
    data?: Paths.ExportManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportManifest.Responses.$200>
  /**
   * uploadManifest - uploadManifest
   * 
   * Create pre-signed S3 URL to upload a manifest file.
   * 
   */
  'uploadManifest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadManifest.Responses.$201>
  /**
   * createPlan - createPlan
   * 
   * Creates a new import job from an uploaded manifest file and returns the plan.
   * 
   * Creates an updated plan for an installed manifest when `manifest_id` is passed
   * 
   */
  'createPlan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePlan.Responses.$200>
  /**
   * applyPlan - applyPlan
   * 
   * Apply a plan returned by `createPlan`.
   */
  'applyPlan'(
    parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
    data?: Paths.ApplyPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  /**
   * listInstalledManifests - listInstalledManifests
   * 
   * List Blueprint Manifests installed to the organization
   */
  'listInstalledManifests'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  /**
   * getManifest - getManifest
   * 
   * Get installed Manifest by ID
   */
  'getManifest'(
    parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManifest.Responses.$200>
  /**
   * updateManifest - updateManifest
   * 
   * Update an installed manifest
   * 
   */
  'updateManifest'(
    parameters?: Parameters<Paths.UpdateManifest.PathParameters> | null,
    data?: Paths.UpdateManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateManifest.Responses.$200>
  /**
   * deleteManifest - deleteManifest
   * 
   * Remove installed manifest from the org
   * 
   * Note that this does not delete the installed resources of the Manifest!
   * 
   */
  'deleteManifest'(
    parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteManifest.Responses.$200>
  /**
   * listBlueprints - listBlueprints
   * 
   * List Custom and Installed Blueprints
   */
  'listBlueprints'(
    parameters?: Parameters<Paths.ListBlueprints.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListBlueprints.Responses.$200>
  /**
   * createBlueprint - createBlueprint
   * 
   * Create a Blueprint
   */
  'createBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  /**
   * listInstalledMarketplaceBlueprints - listInstalledMarketplaceBlueprints
   * 
   * List installed Marketplace Blueprints for the organization.
   * When multiple blueprints have the same slug, returns only the most recently created one.
   * 
   */
  'listInstalledMarketplaceBlueprints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledMarketplaceBlueprints.Responses.$200>
  /**
   * preInstallBlueprint - preInstallBlueprint
   * 
   * Pre-install a Blueprint based on a blueprint file
   */
  'preInstallBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PreInstallBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreInstallBlueprint.Responses.$200>
  /**
   * getBlueprintPreview - getBlueprintPreview
   * 
   * Get Blueprint Preview by ID
   */
  'getBlueprintPreview'(
    parameters?: Parameters<Paths.GetBlueprintPreview.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprintPreview.Responses.$200>
  /**
   * installBlueprint - installBlueprint
   * 
   * Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource
   * 
   */
  'installBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InstallBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InstallBlueprint.Responses.$202>
  /**
   * getBlueprint - getBlueprint
   * 
   * Get Blueprint by ID
   */
  'getBlueprint'(
    parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprint.Responses.$200>
  /**
   * updateBlueprint - updateBlueprint
   * 
   * Update a Blueprint
   */
  'updateBlueprint'(
    parameters?: Parameters<Paths.UpdateBlueprint.PathParameters> | null,
    data?: Paths.UpdateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
  /**
   * deleteBlueprint - deleteBlueprint
   * 
   * Delete a Blueprint
   */
  'deleteBlueprint'(
    parameters?: Parameters<Paths.DeleteBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlueprint.Responses.$200>
  /**
   * validateBlueprint - validateBlueprint
   * 
   * Start a blueprint validation job. Validates Terraform for the blueprint (all types).
   * Returns 202 Accepted with job_id. Poll GET /jobs/{job_id} for status, valid, and errors.
   * 
   */
  'validateBlueprint'(
    parameters?: Parameters<Paths.ValidateBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateBlueprint.Responses.$202>
  /**
   * verifyBlueprint - verifyBlueprint
   * 
   * Start a blueprint verification job. Compares resource configurations between a source org
   * and a destination org to verify that a sync/install was successful.
   * Returns 202 Accepted with job_id. Poll GET /jobs/{job_id} for status, summary, and resource_results.
   * 
   */
  'verifyBlueprint'(
    parameters?: Parameters<Paths.VerifyBlueprint.PathParameters> | null,
    data?: Paths.VerifyBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyBlueprint.Responses.$202>
  /**
   * detectPatchChanges - detectPatchChanges
   * 
   * Detect changes between the current state of a blueprint's resources and its tfstate baseline.
   * Returns field-level diffs for resources that have been modified since the blueprint was last installed/exported.
   * 
   */
  'detectPatchChanges'(
    parameters?: Parameters<Paths.DetectPatchChanges.PathParameters> | null,
    data?: Paths.DetectPatchChanges.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DetectPatchChanges.Responses.$200>
  /**
   * listPatches - listPatches
   * 
   * List all patches for a blueprint.
   */
  'listPatches'(
    parameters?: Parameters<Paths.ListPatches.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPatches.Responses.$200>
  /**
   * createPatch - createPatch
   * 
   * Create a new patch for a blueprint.
   */
  'createPatch'(
    parameters?: Parameters<Paths.CreatePatch.PathParameters> | null,
    data?: Paths.CreatePatch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePatch.Responses.$201>
  /**
   * getPatch - getPatch
   * 
   * Get a patch by ID, including per-org execution results.
   */
  'getPatch'(
    parameters?: Parameters<Paths.GetPatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPatch.Responses.$200>
  /**
   * applyPatch - applyPatch
   * 
   * Apply a patch to a single destination org.
   */
  'applyPatch'(
    parameters?: Parameters<Paths.ApplyPatch.PathParameters> | null,
    data?: Paths.ApplyPatch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyPatch.Responses.$200>
  /**
   * retryPatchOrg - retryPatchOrg
   * 
   * Retry a failed patch execution for a specific org.
   */
  'retryPatchOrg'(
    parameters?: Parameters<Paths.RetryPatchOrg.PathParameters> | null,
    data?: Paths.RetryPatchOrg.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetryPatchOrg.Responses.$200>
  /**
   * exportBlueprint - exportBlueprint
   * 
   * Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.
   * 
   */
  'exportBlueprint'(
    parameters?: Parameters<Paths.ExportBlueprint.PathParameters> | null,
    data?: Paths.ExportBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportBlueprint.Responses.$202>
  /**
   * listMarketplaceSlugs - listMarketplaceSlugs
   * 
   * List all available marketplace blueprint slugs from Webflow CMS.
   * Returns cached results when available.
   * 
   */
  'listMarketplaceSlugs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMarketplaceSlugs.Responses.$200>
  /**
   * publishBlueprint - publishBlueprint
   * 
   * Publish a blueprint to the marketplace. Exports the blueprint, uploads it to file-api with public access, and updates the Webflow CMS listing.
   * 
   */
  'publishBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PublishBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishBlueprint.Responses.$202>
  /**
   * formatBlueprintDescription - formatBlueprintDescription
   * 
   * Format a blueprint description as markdown using AI.
   * 
   */
  'formatBlueprintDescription'(
    parameters?: Parameters<Paths.FormatBlueprintDescription.PathParameters> | null,
    data?: Paths.FormatBlueprintDescription.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FormatBlueprintDescription.Responses.$200>
  /**
   * suggestBlueprintResources - suggestBlueprintResources
   * 
   * Suggest resources to add to a blueprint based on a natural-language prompt.
   * 
   * Walks anchor resource types in priority order (journey > workflow_definition >
   * automation_flow > schema > entity-backed types) and returns matches per
   * anchor using each upstream API's text search. Suggestions are marked
   * `is_root: true` so callers can pass `add_dependencies=true` to
   * bulkAddBlueprintResources and have transitive dependencies resolved
   * server-side — which means a single matched journey can stand in for its
   * full product/schema/template bundle.
   * 
   * No side effects on the blueprint — the caller persists the chosen resources
   * via the existing create/bulk-add endpoints.
   * 
   */
  'suggestBlueprintResources'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SuggestBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SuggestBlueprintResources.Responses.$200>
  /**
   * addBlueprintResource - addBlueprintResource
   * 
   * Add a resource to a Blueprint
   */
  'addBlueprintResource'(
    parameters?: Parameters<Paths.AddBlueprintResource.QueryParameters & Paths.AddBlueprintResource.PathParameters> | null,
    data?: Paths.AddBlueprintResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBlueprintResource.Responses.$200>
  /**
   * syncDependencies - syncDependencies
   * 
   * Sync dependencies of all root resources in a Blueprint
   */
  'syncDependencies'(
    parameters?: Parameters<Paths.SyncDependencies.QueryParameters & Paths.SyncDependencies.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SyncDependencies.Responses.$202>
  /**
   * bulkUpdateBlueprintResources - bulkUpdateBlueprintResources
   * 
   * Bulk update resources in a Blueprint
   */
  'bulkUpdateBlueprintResources'(
    parameters?: Parameters<Paths.BulkUpdateBlueprintResources.PathParameters> | null,
    data?: Paths.BulkUpdateBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkUpdateBlueprintResources.Responses.$200>
  /**
   * bulkAddBlueprintResources - bulkAddBlueprintResources
   * 
   * Bulk Add resources in a Blueprint
   */
  'bulkAddBlueprintResources'(
    parameters?: Parameters<Paths.BulkAddBlueprintResources.QueryParameters & Paths.BulkAddBlueprintResources.PathParameters> | null,
    data?: Paths.BulkAddBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkAddBlueprintResources.Responses.$200>
  /**
   * bulkDeleteBlueprintResources - bulkDeleteBlueprintResources
   * 
   * Bulk delete resources in a Blueprint
   */
  'bulkDeleteBlueprintResources'(
    parameters?: Parameters<Paths.BulkDeleteBlueprintResources.PathParameters> | null,
    data?: Paths.BulkDeleteBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkDeleteBlueprintResources.Responses.$200>
  /**
   * updateBlueprintResource - updateBlueprintResource
   * 
   * Update a resource in a Blueprint
   */
  'updateBlueprintResource'(
    parameters?: Parameters<Paths.UpdateBlueprintResource.PathParameters> | null,
    data?: Paths.UpdateBlueprintResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlueprintResource.Responses.$200>
  /**
   * deleteBlueprintResource - deleteBlueprintResource
   * 
   * Delete a resource from a Blueprint
   */
  'deleteBlueprintResource'(
    parameters?: Parameters<Paths.DeleteBlueprintResource.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlueprintResource.Responses.$200>
  /**
   * listBlueprintJobs - List Blueprint Jobs
   * 
   * List all blueprint jobs
   */
  'listBlueprintJobs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListBlueprintJobs.Responses.$200>
  /**
   * getBlueprintJob - Get Job
   * 
   * Poll the current state of a job. Serves both Terraform (v2) and V3-engine jobs —
   * check `sync_engine` (`terraform` | `v3`) to tell them apart. V3 jobs additionally
   * expose live `resource_progress[]`. V3 single-install and bulk-install child jobs
   * are polled here.
   *
   */
  'getBlueprintJob'(
    parameters?: Parameters<Paths.GetBlueprintJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprintJob.Responses.$200>
  /**
   * continueInstallationJob - Continue Installation Job
   * 
   * Resume an installation job that is paused at `status: "WAITING_USER_ACTION"` after
   * planning. Works for both Terraform and V3 jobs. Not needed for V3 installs created
   * with `auto_apply: true` (including all bulk-install child jobs), which apply
   * without pausing.
   *
   */
  'continueInstallationJob'(
    parameters?: Parameters<Paths.ContinueInstallationJob.PathParameters> | null,
    data?: Paths.ContinueInstallationJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContinueInstallationJob.Responses.$200>
  /**
   * cancelBlueprintJob - Cancel Blueprint Job
   * 
   * Cancel a blueprint job if it is still running.
   */
  'cancelBlueprintJob'(
    parameters?: Parameters<Paths.CancelBlueprintJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBlueprintJob.Responses.$200>
  /**
   * getMarketplaceListing - getMarketplaceListing
   * 
   * Get marketplace listing for a blueprint including all versions
   */
  'getMarketplaceListing'(
    parameters?: Parameters<Paths.GetMarketplaceListing.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMarketplaceListing.Responses.$200>
  /**
   * createMarketplaceListing - createMarketplaceListing
   * 
   * Create a marketplace listing for a blueprint. Returns 409 if one already exists.
   */
  'createMarketplaceListing'(
    parameters?: Parameters<Paths.CreateMarketplaceListing.PathParameters> | null,
    data?: Paths.CreateMarketplaceListing.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMarketplaceListing.Responses.$201>
  /**
   * listMarketplaceListings - listMarketplaceListings
   * 
   * List all marketplace listings for the authenticated organization
   */
  'listMarketplaceListings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMarketplaceListings.Responses.$200>
  /**
   * getMarketplaceListingById - getMarketplaceListingById
   * 
   * Get marketplace listing by listing ID including all versions
   */
  'getMarketplaceListingById'(
    parameters?: Parameters<Paths.GetMarketplaceListingById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMarketplaceListingById.Responses.$200>
  /**
   * updateMarketplaceListing - updateMarketplaceListing
   * 
   * Update listing-level fields
   */
  'updateMarketplaceListing'(
    parameters?: Parameters<Paths.UpdateMarketplaceListing.PathParameters> | null,
    data?: Paths.UpdateMarketplaceListing.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMarketplaceListing.Responses.$200>
  /**
   * deleteMarketplaceListing - deleteMarketplaceListing
   * 
   * Delete listing and all versions
   */
  'deleteMarketplaceListing'(
    parameters?: Parameters<Paths.DeleteMarketplaceListing.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMarketplaceListing.Responses.$204>
  /**
   * listMarketplaceListingVersions - listMarketplaceListingVersions
   * 
   * List all versions for a listing, newest first
   */
  'listMarketplaceListingVersions'(
    parameters?: Parameters<Paths.ListMarketplaceListingVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMarketplaceListingVersions.Responses.$200>
  /**
   * createMarketplaceListingVersion - createMarketplaceListingVersion
   * 
   * Create a draft version; auto-snapshots resources, requiredFeatures, recommendedApps from current blueprint
   */
  'createMarketplaceListingVersion'(
    parameters?: Parameters<Paths.CreateMarketplaceListingVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMarketplaceListingVersion.Responses.$201>
  /**
   * updateMarketplaceListingVersion - updateMarketplaceListingVersion
   * 
   * Update updateNote, requiredFeatures, or recommendedApps on a draft version
   */
  'updateMarketplaceListingVersion'(
    parameters?: Parameters<Paths.UpdateMarketplaceListingVersion.PathParameters> | null,
    data?: Paths.UpdateMarketplaceListingVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMarketplaceListingVersion.Responses.$200>
  /**
   * publishMarketplaceListingVersion - publishMarketplaceListingVersion
   * 
   * Publish a draft version; archives the previous live version
   */
  'publishMarketplaceListingVersion'(
    parameters?: Parameters<Paths.PublishMarketplaceListingVersion.PathParameters> | null,
    data?: Paths.PublishMarketplaceListingVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishMarketplaceListingVersion.Responses.$200>
  /**
   * publishBlueprintV3 - Publish Blueprint V3
   *
   * Starts an asynchronous V3 publication. The result is a signed, portable package; poll the existing blueprint job endpoint for completion.
   */
  'publishBlueprintV3'(
    parameters?: Parameters<Paths.PublishBlueprintV3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.PublishBlueprintV3.Responses.$202>
  /**
   * installBlueprintV3 - Install Blueprint V3
   * 
   * Install a blueprint into a single destination org using the V3 engine (direct API
   * calls, no Terraform). Creates resources in topological order with global ID
   * replacement and supports checkpoint-based resume on failure.
   *
   * **Lifecycle (how to drive an install to completion):**
   * 1. `POST /v3/blueprint-manifest/blueprint:install` returns `{ job_id }` (202).
   * 2. Poll the job with `GET /v2/blueprint-manifest/jobs/{job_id}` — V3 jobs are
   *    served by the same v2 jobs endpoints as Terraform jobs and are identified by
   *    `sync_engine: "v3"`. Watch `status` and `resource_progress[]`.
   * 3. If `auto_apply` is `false` (default), the job pauses at
   *    `status: "WAITING_USER_ACTION"` after planning. Resume it with
   *    `POST /v2/blueprint-manifest/jobs/{job_id}:continue`.
   * 4. If `auto_apply` is `true`, the engine applies automatically after plan +
   *    snapshot — no `:continue` call is needed. This is what the bulk-install worker
   *    uses; to install into many orgs at once prefer `POST .../bulk-installs`.
   *
   * For cross-org installs, pass `destination_auth_token` (the destination org's
   * token); reads use the caller's bearer token, writes use that token.
   * 
   */
  'installBlueprintV3'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InstallBlueprintV3.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InstallBlueprintV3.Responses.$202>
  /**
   * restoreBlueprintDeploymentV3 - Restore a specific deployment by job_id
   * 
   * Roll a deployment back to its pre-install state. Two phases:
   * 
   *   1. Upsert — re-applies the captured payloads via snapshot-api's
   *      `:restore` (server-side; runs config-engine.apply with captured
   *      target ids pre-seeded). Skipped for pure-create deployments
   *      whose snapshot was empty.
   *   2. Delete sweep — for lineage rows of this blueprint instance not
   *      present in the snapshot's captured set, deletes the live
   *      resource via the type's adapter. Co-ownership / drift /
   *      no-delete-capability skip the entry with the corresponding
   *      reason.
   * 
   * Resolves `(blueprint_id, job_id)` to the entry in
   * `Blueprint.deployments[]` and reads its `snapshot_id` and
   * `destination_blueprint_id` — the caller never needs to handle
   * snapshot ids directly.
   * 
   * Async — returns 202 with a job id. Poll the job to track progress.
   * The per-instance lock (`installation_status === 'IN_PROGRESS'`)
   * rejects concurrent installs or restores with 409.
   * 
   */
  'restoreBlueprintDeploymentV3'(
    parameters?: Parameters<Paths.RestoreBlueprintDeploymentV3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RestoreBlueprintDeploymentV3.Responses.$202>
  /**
   * getRestorePreview - Predicted outcome of reverting a deployment
   * 
   * Computes what would happen if the user triggered a restore on this
   * deployment, without performing any writes. The forecast uses the
   * snapshot's captured resources (when present) plus the current lineage
   * state plus per-adapter gates (co-ownership, no-delete-capability,
   * heuristic-match, drift when wired).
   * 
   * Idempotent and side-effect free. Safe to call repeatedly. The result
   * may shift between calls if operators edit destination resources or
   * another blueprint adopts a shared resource in the meantime.
   * 
   */
  'getRestorePreview'(
    parameters?: Parameters<Paths.GetRestorePreview.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRestorePreview.Responses.$200>
  /**
   * getBlueprintLineageV3 - Get Blueprint Lineage V3
   * 
   * Returns the lineage registry entries for a blueprint's resources in the current org.
   * Shows the mapping between source lineage IDs and target resource IDs.
   * 
   */
  'getBlueprintLineageV3'(
    parameters?: Parameters<Paths.GetBlueprintLineageV3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprintLineageV3.Responses.$200>
  /**
   * createBulkInstallV3 - Create Bulk Install V3
   *
   * Install one source blueprint into many destination organizations in a single
   * request. The server schedules child V3 installs with `auto_apply=true` and caps
   * active installs at `max_concurrency`. Per-target failures are isolated and
   * retryable; they do not stop the remaining targets.
   *
   * Each target carries its own write-only `destination_auth_token` (org-scoped).
   * Tokens are passed to the worker via Step Functions input only — they are never
   * persisted in DynamoDB nor returned by any endpoint.
   *
   */
  'createBulkInstallV3'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBulkInstallV3.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateBulkInstallV3.Responses.$202>
  /**
   * getBulkInstallV3 - Get Bulk Install V3
   *
   * Returns the bulk install parent with aggregate status and counts. Scoped by the
   * caller org as `source_org_id`. Target rows are not included — use the targets
   * endpoint to page through them.
   *
   */
  'getBulkInstallV3'(
    parameters?: Parameters<Paths.GetBulkInstallV3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetBulkInstallV3.Responses.$200>
  /**
   * listBulkInstallTargetsV3 - List Bulk Install Targets V3
   *
   * Pages through the bulk install's target rows. Each row hydrates its latest child
   * install job (`job_ids.at(-1)`) with the standard V3 job shape (`events[]`,
   * `resource_progress[]`) so callers can inspect per-resource progress and errors.
   *
   */
  'listBulkInstallTargetsV3'(
    parameters?: Parameters<Paths.ListBulkInstallTargetsV3.QueryParameters & Paths.ListBulkInstallTargetsV3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ListBulkInstallTargetsV3.Responses.$200>
  /**
   * retryBulkInstallTargetV3 - Retry Bulk Install Target V3
   *
   * Retries a single failed target. Allowed only for `FAILED` and `PARTIAL_SUCCESS`
   * targets. Starts a new child install with `auto_apply=true`, appends its job id to
   * `job_ids`, and reuses the same target row. Only the destination auth token may be
   * supplied for the new attempt; source/destination identifiers are immutable.
   *
   */
  'retryBulkInstallTargetV3'(
    parameters?: Parameters<Paths.RetryBulkInstallTargetV3.PathParameters> | null,
    data?: Paths.RetryBulkInstallTargetV3.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RetryBulkInstallTargetV3.Responses.$200>
  /**
   * listUniquenessCriteria - listUniquenessCriteria
   * 
   * List all custom uniqueness criteria configured for the caller's organization.
   * These overrides are applied during install (V2 and V3) when matching incoming
   * resources against existing ones in the destination org, replacing the default
   * per-resource-type field set with the caller's chosen fields (AND-combined).
   * 
   */
  'listUniquenessCriteria'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
  /**
   * getUniquenessCriteria - getUniquenessCriteria
   * 
   * Get the configured uniqueness criteria for a specific resource type, if any.
   */
  'getUniquenessCriteria'(
    parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
  /**
   * putUniquenessCriteria - putUniquenessCriteria
   * 
   * Set or replace the uniqueness criteria for a resource type. The provided fields
   * must be valid attributes on the resource's schema (the UI typically loads the
   * schema to populate options). All listed fields are AND-combined during matching.
   * 
   */
  'putUniquenessCriteria'(
    parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
    data?: Paths.PutUniquenessCriteria.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutUniquenessCriteria.Responses.$200>
  /**
   * deleteUniquenessCriteria - deleteUniquenessCriteria
   * 
   * Remove the custom criteria for a resource type, reverting to the default fields.
   */
  'deleteUniquenessCriteria'(
    parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/blueprint-manifest/jobs/{job_id}']: {
    /**
     * getJob - getJob
     * 
     * Get the current status of a blueprint (export or import)
     */
    'get'(
      parameters?: Parameters<Paths.GetJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJob.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs:createExport']: {
    /**
     * createExport - createExport
     * 
     * Creates a new Export Job with a list of available resources to export from the passed root resource.
     * 
     * Multiple root resources can be added by calling this multiple times with the same jobId
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateExport.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateExport.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:exportManifest']: {
    /**
     * exportManifest - exportManifest
     * 
     * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
     */
    'post'(
      parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
      data?: Paths.ExportManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportManifest.Responses.$200>
  }
  ['/v1/blueprint-manifest:uploadManifest']: {
    /**
     * uploadManifest - uploadManifest
     * 
     * Create pre-signed S3 URL to upload a manifest file.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadManifest.Responses.$201>
  }
  ['/v1/blueprint-manifest/jobs:createPlan']: {
    /**
     * createPlan - createPlan
     * 
     * Creates a new import job from an uploaded manifest file and returns the plan.
     * 
     * Creates an updated plan for an installed manifest when `manifest_id` is passed
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:applyPlan']: {
    /**
     * applyPlan - applyPlan
     * 
     * Apply a plan returned by `createPlan`.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
      data?: Paths.ApplyPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests']: {
    /**
     * listInstalledManifests - listInstalledManifests
     * 
     * List Blueprint Manifests installed to the organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests/{manifest_id}']: {
    /**
     * getManifest - getManifest
     * 
     * Get installed Manifest by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManifest.Responses.$200>
    /**
     * updateManifest - updateManifest
     * 
     * Update an installed manifest
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateManifest.PathParameters> | null,
      data?: Paths.UpdateManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateManifest.Responses.$200>
    /**
     * deleteManifest - deleteManifest
     * 
     * Remove installed manifest from the org
     * 
     * Note that this does not delete the installed resources of the Manifest!
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteManifest.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints']: {
    /**
     * listBlueprints - listBlueprints
     * 
     * List Custom and Installed Blueprints
     */
    'get'(
      parameters?: Parameters<Paths.ListBlueprints.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListBlueprints.Responses.$200>
    /**
     * createBlueprint - createBlueprint
     * 
     * Create a Blueprint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints:marketplace']: {
    /**
     * listInstalledMarketplaceBlueprints - listInstalledMarketplaceBlueprints
     * 
     * List installed Marketplace Blueprints for the organization.
     * When multiple blueprints have the same slug, returns only the most recently created one.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledMarketplaceBlueprints.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints:pre-install']: {
    /**
     * preInstallBlueprint - preInstallBlueprint
     * 
     * Pre-install a Blueprint based on a blueprint file
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PreInstallBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreInstallBlueprint.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints:preview/{preview_id}']: {
    /**
     * getBlueprintPreview - getBlueprintPreview
     * 
     * Get Blueprint Preview by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprintPreview.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprintPreview.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprint:install']: {
    /**
     * installBlueprint - installBlueprint
     * 
     * Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InstallBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InstallBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}']: {
    /**
     * getBlueprint - getBlueprint
     * 
     * Get Blueprint by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprint.Responses.$200>
    /**
     * updateBlueprint - updateBlueprint
     * 
     * Update a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlueprint.PathParameters> | null,
      data?: Paths.UpdateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
    /**
     * deleteBlueprint - deleteBlueprint
     * 
     * Delete a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlueprint.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/validate']: {
    /**
     * validateBlueprint - validateBlueprint
     * 
     * Start a blueprint validation job. Validates Terraform for the blueprint (all types).
     * Returns 202 Accepted with job_id. Poll GET /jobs/{job_id} for status, valid, and errors.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ValidateBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}:verify']: {
    /**
     * verifyBlueprint - verifyBlueprint
     * 
     * Start a blueprint verification job. Compares resource configurations between a source org
     * and a destination org to verify that a sync/install was successful.
     * Returns 202 Accepted with job_id. Poll GET /jobs/{job_id} for status, summary, and resource_results.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.VerifyBlueprint.PathParameters> | null,
      data?: Paths.VerifyBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/patches:detect']: {
    /**
     * detectPatchChanges - detectPatchChanges
     * 
     * Detect changes between the current state of a blueprint's resources and its tfstate baseline.
     * Returns field-level diffs for resources that have been modified since the blueprint was last installed/exported.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.DetectPatchChanges.PathParameters> | null,
      data?: Paths.DetectPatchChanges.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DetectPatchChanges.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/patches']: {
    /**
     * createPatch - createPatch
     * 
     * Create a new patch for a blueprint.
     */
    'post'(
      parameters?: Parameters<Paths.CreatePatch.PathParameters> | null,
      data?: Paths.CreatePatch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePatch.Responses.$201>
    /**
     * listPatches - listPatches
     * 
     * List all patches for a blueprint.
     */
    'get'(
      parameters?: Parameters<Paths.ListPatches.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPatches.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/patches/{patch_id}']: {
    /**
     * getPatch - getPatch
     * 
     * Get a patch by ID, including per-org execution results.
     */
    'get'(
      parameters?: Parameters<Paths.GetPatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPatch.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/patches/{patch_id}:apply']: {
    /**
     * applyPatch - applyPatch
     * 
     * Apply a patch to a single destination org.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyPatch.PathParameters> | null,
      data?: Paths.ApplyPatch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyPatch.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/patches/{patch_id}/orgs/{org_id}:retry']: {
    /**
     * retryPatchOrg - retryPatchOrg
     * 
     * Retry a failed patch execution for a specific org.
     */
    'post'(
      parameters?: Parameters<Paths.RetryPatchOrg.PathParameters> | null,
      data?: Paths.RetryPatchOrg.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetryPatchOrg.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}:export']: {
    /**
     * exportBlueprint - exportBlueprint
     * 
     * Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExportBlueprint.PathParameters> | null,
      data?: Paths.ExportBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/marketplace/slugs']: {
    /**
     * listMarketplaceSlugs - listMarketplaceSlugs
     * 
     * List all available marketplace blueprint slugs from Webflow CMS.
     * Returns cached results when available.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMarketplaceSlugs.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints:publish']: {
    /**
     * publishBlueprint - publishBlueprint
     * 
     * Publish a blueprint to the marketplace. Exports the blueprint, uploads it to file-api with public access, and updates the Webflow CMS listing.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PublishBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}:format-description']: {
    /**
     * formatBlueprintDescription - formatBlueprintDescription
     * 
     * Format a blueprint description as markdown using AI.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.FormatBlueprintDescription.PathParameters> | null,
      data?: Paths.FormatBlueprintDescription.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FormatBlueprintDescription.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints:suggest-resources']: {
    /**
     * suggestBlueprintResources - suggestBlueprintResources
     * 
     * Suggest resources to add to a blueprint based on a natural-language prompt.
     * 
     * Walks anchor resource types in priority order (journey > workflow_definition >
     * automation_flow > schema > entity-backed types) and returns matches per
     * anchor using each upstream API's text search. Suggestions are marked
     * `is_root: true` so callers can pass `add_dependencies=true` to
     * bulkAddBlueprintResources and have transitive dependencies resolved
     * server-side — which means a single matched journey can stand in for its
     * full product/schema/template bundle.
     * 
     * No side effects on the blueprint — the caller persists the chosen resources
     * via the existing create/bulk-add endpoints.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SuggestBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SuggestBlueprintResources.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources']: {
    /**
     * addBlueprintResource - addBlueprintResource
     * 
     * Add a resource to a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.AddBlueprintResource.QueryParameters & Paths.AddBlueprintResource.PathParameters> | null,
      data?: Paths.AddBlueprintResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBlueprintResource.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources:syncDependencies']: {
    /**
     * syncDependencies - syncDependencies
     * 
     * Sync dependencies of all root resources in a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.SyncDependencies.QueryParameters & Paths.SyncDependencies.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SyncDependencies.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk']: {
    /**
     * bulkAddBlueprintResources - bulkAddBlueprintResources
     * 
     * Bulk Add resources in a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.BulkAddBlueprintResources.QueryParameters & Paths.BulkAddBlueprintResources.PathParameters> | null,
      data?: Paths.BulkAddBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkAddBlueprintResources.Responses.$200>
    /**
     * bulkUpdateBlueprintResources - bulkUpdateBlueprintResources
     * 
     * Bulk update resources in a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.BulkUpdateBlueprintResources.PathParameters> | null,
      data?: Paths.BulkUpdateBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkUpdateBlueprintResources.Responses.$200>
    /**
     * bulkDeleteBlueprintResources - bulkDeleteBlueprintResources
     * 
     * Bulk delete resources in a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.BulkDeleteBlueprintResources.PathParameters> | null,
      data?: Paths.BulkDeleteBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkDeleteBlueprintResources.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}']: {
    /**
     * updateBlueprintResource - updateBlueprintResource
     * 
     * Update a resource in a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlueprintResource.PathParameters> | null,
      data?: Paths.UpdateBlueprintResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlueprintResource.Responses.$200>
    /**
     * deleteBlueprintResource - deleteBlueprintResource
     * 
     * Delete a resource from a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlueprintResource.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlueprintResource.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs']: {
    /**
     * listBlueprintJobs - List Blueprint Jobs
     * 
     * List all blueprint jobs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListBlueprintJobs.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}']: {
    /**
     * getBlueprintJob - Get Job
     * 
     * Poll the current state of a job. Serves both Terraform (v2) and V3-engine jobs —
     * check `sync_engine` (`terraform` | `v3`) to tell them apart. V3 jobs additionally
     * expose live `resource_progress[]`. V3 single-install and bulk-install child jobs
     * are polled here.
     *
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprintJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprintJob.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}:continue']: {
    /**
     * continueInstallationJob - Continue Installation Job
     * 
     * Resume an installation job that is paused at `status: "WAITING_USER_ACTION"` after
     * planning. Works for both Terraform and V3 jobs. Not needed for V3 installs created
     * with `auto_apply: true` (including all bulk-install child jobs), which apply
     * without pausing.
     *
     */
    'post'(
      parameters?: Parameters<Paths.ContinueInstallationJob.PathParameters> | null,
      data?: Paths.ContinueInstallationJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContinueInstallationJob.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}:cancel']: {
    /**
     * cancelBlueprintJob - Cancel Blueprint Job
     * 
     * Cancel a blueprint job if it is still running.
     */
    'post'(
      parameters?: Parameters<Paths.CancelBlueprintJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBlueprintJob.Responses.$200>
  }
  ['/v1/blueprints/{blueprint_id}/marketplace-listing']: {
    /**
     * createMarketplaceListing - createMarketplaceListing
     * 
     * Create a marketplace listing for a blueprint. Returns 409 if one already exists.
     */
    'post'(
      parameters?: Parameters<Paths.CreateMarketplaceListing.PathParameters> | null,
      data?: Paths.CreateMarketplaceListing.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMarketplaceListing.Responses.$201>
    /**
     * getMarketplaceListing - getMarketplaceListing
     * 
     * Get marketplace listing for a blueprint including all versions
     */
    'get'(
      parameters?: Parameters<Paths.GetMarketplaceListing.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMarketplaceListing.Responses.$200>
  }
  ['/v1/marketplace-listings']: {
    /**
     * listMarketplaceListings - listMarketplaceListings
     * 
     * List all marketplace listings for the authenticated organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMarketplaceListings.Responses.$200>
  }
  ['/v1/marketplace-listings/{listing_id}']: {
    /**
     * getMarketplaceListingById - getMarketplaceListingById
     * 
     * Get marketplace listing by listing ID including all versions
     */
    'get'(
      parameters?: Parameters<Paths.GetMarketplaceListingById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMarketplaceListingById.Responses.$200>
    /**
     * updateMarketplaceListing - updateMarketplaceListing
     * 
     * Update listing-level fields
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateMarketplaceListing.PathParameters> | null,
      data?: Paths.UpdateMarketplaceListing.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMarketplaceListing.Responses.$200>
    /**
     * deleteMarketplaceListing - deleteMarketplaceListing
     * 
     * Delete listing and all versions
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteMarketplaceListing.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMarketplaceListing.Responses.$204>
  }
  ['/v1/marketplace-listings/{listing_id}/versions']: {
    /**
     * createMarketplaceListingVersion - createMarketplaceListingVersion
     * 
     * Create a draft version; auto-snapshots resources, requiredFeatures, recommendedApps from current blueprint
     */
    'post'(
      parameters?: Parameters<Paths.CreateMarketplaceListingVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMarketplaceListingVersion.Responses.$201>
    /**
     * listMarketplaceListingVersions - listMarketplaceListingVersions
     * 
     * List all versions for a listing, newest first
     */
    'get'(
      parameters?: Parameters<Paths.ListMarketplaceListingVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMarketplaceListingVersions.Responses.$200>
  }
  ['/v1/marketplace-listings/{listing_id}/versions/{version_id}']: {
    /**
     * updateMarketplaceListingVersion - updateMarketplaceListingVersion
     * 
     * Update updateNote, requiredFeatures, or recommendedApps on a draft version
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateMarketplaceListingVersion.PathParameters> | null,
      data?: Paths.UpdateMarketplaceListingVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMarketplaceListingVersion.Responses.$200>
  }
  ['/v1/marketplace-listings/{listing_id}/versions/{version_id}/publish']: {
    /**
     * publishMarketplaceListingVersion - publishMarketplaceListingVersion
     * 
     * Publish a draft version; archives the previous live version
     */
    'post'(
      parameters?: Parameters<Paths.PublishMarketplaceListingVersion.PathParameters> | null,
      data?: Paths.PublishMarketplaceListingVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishMarketplaceListingVersion.Responses.$200>
  }
  ['/v3/blueprint-manifest/blueprints/{blueprint_id}:publish']: {
    /**
     * publishBlueprintV3 - Publish Blueprint V3
     *
     * Starts an asynchronous V3 publication. The result is a signed, portable package; poll the existing blueprint job endpoint for completion.
     */
    'post'(
      parameters?: Parameters<Paths.PublishBlueprintV3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.PublishBlueprintV3.Responses.$202>
  }
  ['/v3/blueprint-manifest/blueprint:install']: {
    /**
     * installBlueprintV3 - Install Blueprint V3
     * 
     * Install a blueprint into a single destination org using the V3 engine (direct API
     * calls, no Terraform). Creates resources in topological order with global ID
     * replacement and supports checkpoint-based resume on failure.
     *
     * **Lifecycle (how to drive an install to completion):**
     * 1. `POST /v3/blueprint-manifest/blueprint:install` returns `{ job_id }` (202).
     * 2. Poll the job with `GET /v2/blueprint-manifest/jobs/{job_id}` — V3 jobs are
     *    served by the same v2 jobs endpoints as Terraform jobs and are identified by
     *    `sync_engine: "v3"`. Watch `status` and `resource_progress[]`.
     * 3. If `auto_apply` is `false` (default), the job pauses at
     *    `status: "WAITING_USER_ACTION"` after planning. Resume it with
     *    `POST /v2/blueprint-manifest/jobs/{job_id}:continue`.
     * 4. If `auto_apply` is `true`, the engine applies automatically after plan +
     *    snapshot — no `:continue` call is needed. This is what the bulk-install worker
     *    uses; to install into many orgs at once prefer `POST .../bulk-installs`.
     *
     * For cross-org installs, pass `destination_auth_token` (the destination org's
     * token); reads use the caller's bearer token, writes use that token.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InstallBlueprintV3.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InstallBlueprintV3.Responses.$202>
  }
  ['/v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore']: {
    /**
     * restoreBlueprintDeploymentV3 - Restore a specific deployment by job_id
     * 
     * Roll a deployment back to its pre-install state. Two phases:
     * 
     *   1. Upsert — re-applies the captured payloads via snapshot-api's
     *      `:restore` (server-side; runs config-engine.apply with captured
     *      target ids pre-seeded). Skipped for pure-create deployments
     *      whose snapshot was empty.
     *   2. Delete sweep — for lineage rows of this blueprint instance not
     *      present in the snapshot's captured set, deletes the live
     *      resource via the type's adapter. Co-ownership / drift /
     *      no-delete-capability skip the entry with the corresponding
     *      reason.
     * 
     * Resolves `(blueprint_id, job_id)` to the entry in
     * `Blueprint.deployments[]` and reads its `snapshot_id` and
     * `destination_blueprint_id` — the caller never needs to handle
     * snapshot ids directly.
     * 
     * Async — returns 202 with a job id. Poll the job to track progress.
     * The per-instance lock (`installation_status === 'IN_PROGRESS'`)
     * rejects concurrent installs or restores with 409.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RestoreBlueprintDeploymentV3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RestoreBlueprintDeploymentV3.Responses.$202>
  }
  ['/v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview']: {
    /**
     * getRestorePreview - Predicted outcome of reverting a deployment
     * 
     * Computes what would happen if the user triggered a restore on this
     * deployment, without performing any writes. The forecast uses the
     * snapshot's captured resources (when present) plus the current lineage
     * state plus per-adapter gates (co-ownership, no-delete-capability,
     * heuristic-match, drift when wired).
     * 
     * Idempotent and side-effect free. Safe to call repeatedly. The result
     * may shift between calls if operators edit destination resources or
     * another blueprint adopts a shared resource in the meantime.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRestorePreview.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRestorePreview.Responses.$200>
  }
  ['/v3/blueprint-manifest/blueprints/{blueprint_id}/lineage']: {
    /**
     * getBlueprintLineageV3 - Get Blueprint Lineage V3
     * 
     * Returns the lineage registry entries for a blueprint's resources in the current org.
     * Shows the mapping between source lineage IDs and target resource IDs.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprintLineageV3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprintLineageV3.Responses.$200>
  }
  ['/v3/blueprint-manifest/bulk-installs']: {
    /**
     * createBulkInstallV3 - Create Bulk Install V3
     *
     * Install one source blueprint into many destination organizations in a single
     * request. The server schedules child V3 installs with `auto_apply=true` and caps
     * active installs at `max_concurrency`. Per-target failures are isolated and
     * retryable; they do not stop the remaining targets.
     *
     * Each target carries its own write-only `destination_auth_token` (org-scoped).
     * Tokens are passed to the worker via Step Functions input only — they are never
     * persisted in DynamoDB nor returned by any endpoint.
     *
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBulkInstallV3.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateBulkInstallV3.Responses.$202>
  }
  ['/v3/blueprint-manifest/bulk-installs/{bulk_job_id}']: {
    /**
     * getBulkInstallV3 - Get Bulk Install V3
     *
     * Returns the bulk install parent with aggregate status and counts. Scoped by the
     * caller org as `source_org_id`. Target rows are not included — use the targets
     * endpoint to page through them.
     *
     */
    'get'(
      parameters?: Parameters<Paths.GetBulkInstallV3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetBulkInstallV3.Responses.$200>
  }
  ['/v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets']: {
    /**
     * listBulkInstallTargetsV3 - List Bulk Install Targets V3
     *
     * Pages through the bulk install's target rows. Each row hydrates its latest child
     * install job (`job_ids.at(-1)`) with the standard V3 job shape (`events[]`,
     * `resource_progress[]`) so callers can inspect per-resource progress and errors.
     *
     */
    'get'(
      parameters?: Parameters<Paths.ListBulkInstallTargetsV3.QueryParameters & Paths.ListBulkInstallTargetsV3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ListBulkInstallTargetsV3.Responses.$200>
  }
  ['/v3/blueprint-manifest/bulk-installs/{bulk_job_id}/targets/{destination_org_id}:retry']: {
    /**
     * retryBulkInstallTargetV3 - Retry Bulk Install Target V3
     *
     * Retries a single failed target. Allowed only for `FAILED` and `PARTIAL_SUCCESS`
     * targets. Starts a new child install with `auto_apply=true`, appends its job id to
     * `job_ids`, and reuses the same target row. Only the destination auth token may be
     * supplied for the new attempt; source/destination identifiers are immutable.
     *
     */
    'post'(
      parameters?: Parameters<Paths.RetryBulkInstallTargetV3.PathParameters> | null,
      data?: Paths.RetryBulkInstallTargetV3.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RetryBulkInstallTargetV3.Responses.$200>
  }
  ['/v1/blueprint-manifest/uniqueness-criteria']: {
    /**
     * listUniquenessCriteria - listUniquenessCriteria
     * 
     * List all custom uniqueness criteria configured for the caller's organization.
     * These overrides are applied during install (V2 and V3) when matching incoming
     * resources against existing ones in the destination org, replacing the default
     * per-resource-type field set with the caller's chosen fields (AND-combined).
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
  }
  ['/v1/blueprint-manifest/uniqueness-criteria/{resource_type}']: {
    /**
     * getUniquenessCriteria - getUniquenessCriteria
     * 
     * Get the configured uniqueness criteria for a specific resource type, if any.
     */
    'get'(
      parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
    /**
     * putUniquenessCriteria - putUniquenessCriteria
     * 
     * Set or replace the uniqueness criteria for a resource type. The provided fields
     * must be valid attributes on the resource's schema (the UI typically loads the
     * schema to populate options). All listed fields are AND-combined during matching.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
      data?: Paths.PutUniquenessCriteria.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutUniquenessCriteria.Responses.$200>
    /**
     * deleteUniquenessCriteria - deleteUniquenessCriteria
     * 
     * Remove the custom criteria for a resource type, reverting to the default fields.
     */
    'delete'(
      parameters?: Parameters<Paths.V1BlueprintManifestUniquenessCriteria$ResourceType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AppBlueprint = Components.Schemas.AppBlueprint;
export type Blueprint = Components.Schemas.Blueprint;
export type BlueprintDependenciesSyncJob = Components.Schemas.BlueprintDependenciesSyncJob;
export type BlueprintExportJob = Components.Schemas.BlueprintExportJob;
export type BlueprintID = Components.Schemas.BlueprintID;
export type BlueprintInstallStatus = Components.Schemas.BlueprintInstallStatus;
export type BlueprintInstallationJob = Components.Schemas.BlueprintInstallationJob;
export type BlueprintInstallationJobOptions = Components.Schemas.BlueprintInstallationJobOptions;
export type BlueprintJob = Components.Schemas.BlueprintJob;
export type BlueprintJobEvent = Components.Schemas.BlueprintJobEvent;
export type BlueprintJobID = Components.Schemas.BlueprintJobID;
export type BlueprintPatch = Components.Schemas.BlueprintPatch;
export type BlueprintPatchWithResults = Components.Schemas.BlueprintPatchWithResults;
export type BlueprintPreview = Components.Schemas.BlueprintPreview;
export type BlueprintResource = Components.Schemas.BlueprintResource;
export type BlueprintResourceID = Components.Schemas.BlueprintResourceID;
export type BlueprintRestoreJob = Components.Schemas.BlueprintRestoreJob;
export type BlueprintValidateJob = Components.Schemas.BlueprintValidateJob;
export type BlueprintVerificationJob = Components.Schemas.BlueprintVerificationJob;
export type BulkInstall = Components.Schemas.BulkInstall;
export type BulkInstallCounts = Components.Schemas.BulkInstallCounts;
export type BulkInstallCreateRequest = Components.Schemas.BulkInstallCreateRequest;
export type BulkInstallStatus = Components.Schemas.BulkInstallStatus;
export type BulkInstallTarget = Components.Schemas.BulkInstallTarget;
export type BulkInstallTargetInput = Components.Schemas.BulkInstallTargetInput;
export type BulkInstallTargetList = Components.Schemas.BulkInstallTargetList;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type CommonBlueprintFields = Components.Schemas.CommonBlueprintFields;
export type CommonBlueprintJobFields = Components.Schemas.CommonBlueprintJobFields;
export type CommonImportFields = Components.Schemas.CommonImportFields;
export type CommonManifestFields = Components.Schemas.CommonManifestFields;
export type CommonMarkdownFields = Components.Schemas.CommonMarkdownFields;
export type CommonResourceNode = Components.Schemas.CommonResourceNode;
export type CustomBlueprint = Components.Schemas.CustomBlueprint;
export type DeployedBlueprint = Components.Schemas.DeployedBlueprint;
export type DetectChangesResult = Components.Schemas.DetectChangesResult;
export type FieldDiff = Components.Schemas.FieldDiff;
export type FileBlueprint = Components.Schemas.FileBlueprint;
export type FormattedError = Components.Schemas.FormattedError;
export type FormattedErrorCodes = Components.Schemas.FormattedErrorCodes;
export type FormattedErrorData = Components.Schemas.FormattedErrorData;
export type InstalledMarketplaceBlueprintItem = Components.Schemas.InstalledMarketplaceBlueprintItem;
export type Job = Components.Schemas.Job;
export type JobID = Components.Schemas.JobID;
export type JobStatus = Components.Schemas.JobStatus;
export type LatestBlueprintVerification = Components.Schemas.LatestBlueprintVerification;
export type LineageEntry = Components.Schemas.LineageEntry;
export type Manifest = Components.Schemas.Manifest;
export type ManifestID = Components.Schemas.ManifestID;
export type ManifestItem = Components.Schemas.ManifestItem;
export type ManifestSource = Components.Schemas.ManifestSource;
export type ManifestTimestampFields = Components.Schemas.ManifestTimestampFields;
export type MarketplaceBlueprint = Components.Schemas.MarketplaceBlueprint;
export type MarketplaceListing = Components.Schemas.MarketplaceListing;
export type MarketplaceListingUpdate = Components.Schemas.MarketplaceListingUpdate;
export type MarketplaceListingVersion = Components.Schemas.MarketplaceListingVersion;
export type OrgPatchExecution = Components.Schemas.OrgPatchExecution;
export type PatchFieldDiff = Components.Schemas.PatchFieldDiff;
export type PatchResourceDiff = Components.Schemas.PatchResourceDiff;
export type PlanChanges = Components.Schemas.PlanChanges;
export type PreInstallRequirements = Components.Schemas.PreInstallRequirements;
export type PutManifestPayload = Components.Schemas.PutManifestPayload;
export type ResourceNode = Components.Schemas.ResourceNode;
export type ResourceNodeType = Components.Schemas.ResourceNodeType;
export type ResourceReplacement = Components.Schemas.ResourceReplacement;
export type ResourceVerificationResult = Components.Schemas.ResourceVerificationResult;
export type RestoreOutcome = Components.Schemas.RestoreOutcome;
export type RestoreOutcomeItem = Components.Schemas.RestoreOutcomeItem;
export type RootResourceNode = Components.Schemas.RootResourceNode;
export type S3Reference = Components.Schemas.S3Reference;
export type SelectedResources = Components.Schemas.SelectedResources;
export type SuggestBlueprintResourcesRequest = Components.Schemas.SuggestBlueprintResourcesRequest;
export type SuggestBlueprintResourcesResponse = Components.Schemas.SuggestBlueprintResourcesResponse;
export type UniquenessCriteria = Components.Schemas.UniquenessCriteria;
export type UniquenessCriteriaResourceType = Components.Schemas.UniquenessCriteriaResourceType;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
export type V3ResourceProgressEntry = Components.Schemas.V3ResourceProgressEntry;
export type VerificationSummary = Components.Schemas.VerificationSummary;
export type VirtualResourceNodeGroup = Components.Schemas.VirtualResourceNodeGroup;
