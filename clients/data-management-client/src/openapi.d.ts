import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * A governance config defining an automated policy (e.g., scheduled
         * entity deletion) for a specific entity schema.
         *
         */
        export interface Config {
            /**
             * Unique identifier of the config.
             */
            id: string;
            /**
             * Governance action type. Currently only `deletion` is supported.
             */
            type: /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            ConfigType;
            /**
             * Entity schema slug this config targets.
             */
            entity_schema: string;
            query: /**
             * Defines the query used by a governance config to identify target
             * entities. Combines a saved view with optional governance filters.
             *
             */
            QueryConfig;
            schedule?: /* Schedule definition controlling when a governance config runs. */ ConfigSchedule;
            /**
             * Whether this config is currently active.
             */
            enabled?: boolean;
            /**
             * ISO 8601 timestamp when the config was created.
             */
            created_at?: string; // date-time
            /**
             * ISO 8601 timestamp of the most recent update.
             */
            last_updated_at?: string; // date-time
            /**
             * Next scheduled run date (`YYYY-MM-DD`). Computed from the schedule
             * after each job run.
             *
             */
            next_run_at?: string; // date
            /**
             * Related entity schemas whose entities will also be deleted
             * alongside the primary entity.
             *
             */
            relations_for_deletion?: /**
             * Entity schema slug that can be specified as a cascading deletion
             * target. When a primary entity is deleted, related entities of these
             * schemas are also removed.
             *
             */
            DeletionRelationEntitySchema[];
            /**
             * ISO 8601 timestamp of the most recent job run.
             */
            last_run_at?: string; // date-time
        }
        /**
         * Schedule definition controlling when a governance config runs.
         */
        export type ConfigSchedule = /**
         * Interval-based schedule. The governance engine will create a job every
         * `interval_days` days, optionally bounded by start and end dates.
         *
         */
        IntervalConfigSchedule;
        /**
         * The governance action type. Determines what operation is performed on
         * matched entities when a job runs. Currently only `deletion` is supported.
         *
         */
        export type ConfigType = "deletion";
        /**
         * Request payload for creating a new job run.
         */
        export interface CreateJobRequest {
            type: /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            ConfigType;
            /**
             * ID of the governance config this job executes.
             */
            config_id: string;
            /**
             * The date this job is scheduled to process (format `YYYY-MM-DD`).
             */
            scheduled_for: string; // date
            status?: /**
             * Current execution status of a job run.
             * - `in_progress` — the job is actively processing entities.
             * - `success` — the job completed without critical errors.
             * - `failed` — the job terminated due to an error.
             *
             */
            JobStatus;
            /**
             * ISO 8601 timestamp marking when execution began.
             */
            started_at?: string; // date-time
        }
        /**
         * Entity schema slug that can be specified as a cascading deletion
         * target. When a primary entity is deleted, related entities of these
         * schemas are also removed.
         *
         */
        export type DeletionRelationEntitySchema = "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "message" | "account" | "submission" | "contract";
        /**
         * Interval-based schedule. The governance engine will create a job every
         * `interval_days` days, optionally bounded by start and end dates.
         *
         */
        export interface IntervalConfigSchedule {
            /**
             * Schedule type. Currently only `interval` is supported.
             */
            frequency: "interval";
            /**
             * Number of days between consecutive job runs.
             */
            interval_days: number;
            /**
             * Earliest date (`YYYY-MM-DD`) the schedule is active. If omitted,
             * the schedule starts immediately.
             *
             */
            start_date?: string; // date
            /**
             * Latest date (`YYYY-MM-DD`) the schedule is active. If omitted,
             * the schedule runs indefinitely.
             *
             */
            end_date?: string; // date
        }
        /**
         * Represents a single execution run of a governance config. Tracks the
         * full lifecycle from creation through completion, including outcome
         * details and an optional downloadable report.
         *
         */
        export interface Job {
            /**
             * Unique identifier of the job.
             */
            id: string;
            type: /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            ConfigType;
            /**
             * ID of the governance config this job was created from.
             */
            config_id: string;
            /**
             * Entity schema slug this job operates on.
             */
            entity_schema: string;
            /**
             * The date this job was scheduled to process (`YYYY-MM-DD`).
             */
            scheduled_for: string; // date
            status: /**
             * Current execution status of a job run.
             * - `in_progress` — the job is actively processing entities.
             * - `success` — the job completed without critical errors.
             * - `failed` — the job terminated due to an error.
             *
             */
            JobStatus;
            details?: /**
             * Type-specific job outcome payload. The shape depends on the config type.
             * For `deletion` jobs, typical fields include:
             * - `matched_count` — total entities matched by the query
             * - `deleted_count` — entities successfully deleted
             * - `failed_count` — entities that could not be deleted
             *
             */
            JobDetails;
            /**
             * ISO 8601 timestamp when execution started.
             */
            started_at?: string; // date-time
            /**
             * ISO 8601 timestamp when execution finished.
             */
            completed_at?: string; // date-time
            /**
             * Error message if the job failed.
             */
            error?: string;
            report?: /**
             * Reference to a report file stored in S3 that details the outcome of a
             * job run (e.g., which entities were deleted or failed).
             *
             */
            JobReport;
            /**
             * ISO 8601 timestamp when the job record was created.
             */
            created_at: string; // date-time
            /**
             * ISO 8601 timestamp of the most recent update to this job.
             */
            last_updated_at: string; // date-time
            trigger?: /**
             * Indicates how the job was initiated.
             * - `schedule` — automatically created by the background scheduler.
             * - `manual` — explicitly triggered by a user via the API.
             *
             */
            JobTrigger;
            /**
             * Identifier of the user who triggered the job. Set when
             * `trigger` is `manual`; `null` for scheduled jobs.
             *
             */
            triggered_by?: string | null;
        }
        /**
         * Type-specific job outcome payload. The shape depends on the config type.
         * For `deletion` jobs, typical fields include:
         * - `matched_count` — total entities matched by the query
         * - `deleted_count` — entities successfully deleted
         * - `failed_count` — entities that could not be deleted
         *
         */
        export interface JobDetails {
            [name: string]: any;
        }
        /**
         * Reference to a report file stored in S3 that details the outcome of a
         * job run (e.g., which entities were deleted or failed).
         *
         */
        export interface JobReport {
            /**
             * S3 bucket where the report file is stored.
             */
            bucket?: string;
            /**
             * S3 object key of the report file.
             */
            key?: string;
            format?: /* File format of the job report. Currently only CSV is supported. */ JobReportFormat;
        }
        /**
         * File format of the job report. Currently only CSV is supported.
         */
        export type JobReportFormat = "csv";
        /**
         * Contains a time-limited pre-signed URL to download a job report.
         */
        export interface JobReportUrlResponse {
            /**
             * Pre-signed S3 URL for downloading the report file.
             */
            url?: string;
            /**
             * Number of seconds until the pre-signed URL expires.
             */
            expires_in?: number;
        }
        /**
         * Current execution status of a job run.
         * - `in_progress` — the job is actively processing entities.
         * - `success` — the job completed without critical errors.
         * - `failed` — the job terminated due to an error.
         *
         */
        export type JobStatus = "in_progress" | "success" | "failed";
        /**
         * Indicates how the job was initiated.
         * - `schedule` — automatically created by the background scheduler.
         * - `manual` — explicitly triggered by a user via the API.
         *
         */
        export type JobTrigger = "schedule" | "manual";
        /**
         * Paginated response containing a list of governance configs.
         */
        export interface ListConfigsResponse {
            /**
             * Array of config records for the current page.
             */
            configs?: /**
             * A governance config defining an automated policy (e.g., scheduled
             * entity deletion) for a specific entity schema.
             *
             */
            Config[];
            /**
             * Opaque cursor for fetching the next page. `null` when there are
             * no more results.
             *
             */
            cursor?: string | null;
        }
        /**
         * Paginated response containing a list of job runs.
         */
        export interface ListJobsResponse {
            /**
             * Array of job records for the current page.
             */
            jobs?: /**
             * Represents a single execution run of a governance config. Tracks the
             * full lifecycle from creation through completion, including outcome
             * details and an optional downloadable report.
             *
             */
            Job[];
            /**
             * Opaque cursor for fetching the next page. `null` when there are
             * no more results.
             *
             */
            cursor?: string | null;
        }
        /**
         * Defines the query used by a governance config to identify target
         * entities. Combines a saved view with optional governance filters.
         *
         */
        export interface QueryConfig {
            /**
             * ID of the saved view that provides the base entity query.
             */
            saved_view_id: string;
            /**
             * Controls whether soft-deleted entities are included:
             * - `true` — include both active and deleted entities
             * - `false` — exclude deleted entities (default)
             * - `only` — return only deleted entities
             *
             */
            include_deleted?: "true" | "false" | "only";
            /**
             * Additional data governance filters layered on top of the saved view
             * to further narrow the set of matched entities.
             *
             */
            filters?: /**
             * A single governance filter condition applied during entity querying.
             * The required and optional fields depend on the `type`.
             *
             */
            QueryFilter[];
        }
        /**
         * Request body for the query endpoint. Extends `QueryConfig` with
         * pagination and projection options.
         *
         */
        export interface QueryEntitiesRequest {
            /**
             * ID of the saved view that provides the base entity query.
             */
            saved_view_id: string;
            /**
             * Controls whether soft-deleted entities are included:
             * - `true` — include both active and deleted entities
             * - `false` — exclude deleted entities (default)
             * - `only` — return only deleted entities
             *
             */
            include_deleted?: "true" | "false" | "only";
            /**
             * Additional data governance filters layered on top of the saved view
             * to further narrow the set of matched entities.
             *
             */
            filters?: /**
             * A single governance filter condition applied during entity querying.
             * The required and optional fields depend on the `type`.
             *
             */
            QueryFilter[];
            /**
             * Zero-based offset for pagination.
             */
            from?: number;
            /**
             * Maximum number of results to return.
             */
            size?: number;
            /**
             * When `true`, return full entity payloads. When `false` (default),
             * return only entity IDs and minimal metadata.
             *
             */
            hydrate?: boolean;
            /**
             * List of entity attribute names to include in the response.
             * Acts as a projection to reduce payload size.
             *
             */
            fields?: string[];
        }
        /**
         * Response from the entity query endpoint.
         */
        export interface QueryEntitiesResult {
            /**
             * Total number of entities matching the query.
             */
            hits?: number;
            /**
             * Array of matched entity objects. Shape depends on the `hydrate`
             * and `fields` options in the request.
             *
             */
            results?: {
                [name: string]: any;
            }[];
        }
        /**
         * A single governance filter condition applied during entity querying.
         * The required and optional fields depend on the `type`.
         *
         */
        export interface QueryFilter {
            type: /**
             * Predefined data governance filter types that can be layered on top of
             * a saved view to narrow down target entities:
             * - `entity_workflows_only_in_closed_or_cancelled_status` — include only
             *   entities whose own workflows are all in a closed/cancelled state.
             * - `no_related_entities` — include only entities with no related entities
             *   of the specified schemas.
             * - `related_entities_all_in_closed_or_cancelled_status` — include only
             *   entities whose related entities are all closed or cancelled.
             * - `related_entities_workflows_only_in_closed_or_cancelled_status` —
             *   include only entities whose related entities' workflows are all
             *   closed or cancelled.
             * - `no_email_communication_since` — include only entities with no email
             *   communication (sent or received) within the lookback period.
             *
             */
            QueryFilterType;
            /**
             * Entity schema slugs to consider when evaluating relationship-based
             * filters (e.g. `no_related_entities`).
             *
             */
            related_entity_schemas?: string[];
            /**
             * Number of days to look back when evaluating time-based filters
             * such as `no_email_communication_since`.
             *
             */
            lookback_period_days?: number;
            /**
             * Email message direction(s) to consider. Applicable to
             * `no_email_communication_since`.
             *
             */
            message_type?: ("SENT" | "RECEIVED")[];
            /**
             * Workflow statuses considered "terminal" for workflow-based filters.
             *
             */
            workflow_status?: ("CLOSED" | "DONE")[];
        }
        /**
         * Predefined data governance filter types that can be layered on top of
         * a saved view to narrow down target entities:
         * - `entity_workflows_only_in_closed_or_cancelled_status` — include only
         *   entities whose own workflows are all in a closed/cancelled state.
         * - `no_related_entities` — include only entities with no related entities
         *   of the specified schemas.
         * - `related_entities_all_in_closed_or_cancelled_status` — include only
         *   entities whose related entities are all closed or cancelled.
         * - `related_entities_workflows_only_in_closed_or_cancelled_status` —
         *   include only entities whose related entities' workflows are all
         *   closed or cancelled.
         * - `no_email_communication_since` — include only entities with no email
         *   communication (sent or received) within the lookback period.
         *
         */
        export type QueryFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_workflows_only_in_closed_or_cancelled_status" | "no_email_communication_since";
        /**
         * Partial update payload for an existing job. Only the fields provided
         * will be merged into the job record.
         *
         */
        export interface UpdateJobRequest {
            status?: /**
             * Current execution status of a job run.
             * - `in_progress` — the job is actively processing entities.
             * - `success` — the job completed without critical errors.
             * - `failed` — the job terminated due to an error.
             *
             */
            JobStatus;
            details?: /**
             * Type-specific job outcome payload. The shape depends on the config type.
             * For `deletion` jobs, typical fields include:
             * - `matched_count` — total entities matched by the query
             * - `deleted_count` — entities successfully deleted
             * - `failed_count` — entities that could not be deleted
             *
             */
            JobDetails;
            /**
             * ISO 8601 timestamp marking when the job finished.
             */
            completed_at?: string; // date-time
            /**
             * Human-readable error message if the job failed.
             */
            error?: string;
            report?: /**
             * Reference to a report file stored in S3 that details the outcome of a
             * job run (e.g., which entities were deleted or failed).
             *
             */
            JobReport;
        }
        /**
         * Request payload for creating or updating a governance config.
         */
        export interface UpsertConfigRequest {
            type: /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            ConfigType;
            query: /**
             * Defines the query used by a governance config to identify target
             * entities. Combines a saved view with optional governance filters.
             *
             */
            QueryConfig;
            schedule: /* Schedule definition controlling when a governance config runs. */ ConfigSchedule;
            /**
             * Entity schemas whose related entities should also be deleted
             * when the primary entity is removed. Only applicable when `type`
             * is `deletion`.
             *
             */
            relations_for_deletion?: /**
             * Entity schema slug that can be specified as a cascading deletion
             * target. When a primary entity is deleted, related entities of these
             * schemas are also removed.
             *
             */
            DeletionRelationEntitySchema[];
            /**
             * Whether this config is active and should be evaluated on schedule.
             */
            enabled?: boolean;
        }
    }
}
declare namespace Paths {
    namespace CreateJob {
        namespace Parameters {
            export type EntitySchema = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
        }
        export type RequestBody = /* Request payload for creating a new job run. */ Components.Schemas.CreateJobRequest;
        namespace Responses {
            export type $201 = /**
             * Represents a single execution run of a governance config. Tracks the
             * full lifecycle from creation through completion, including outcome
             * details and an optional downloadable report.
             *
             */
            Components.Schemas.Job;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace CreateJobForConfig {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            config_id: Parameters.ConfigId;
        }
        namespace Responses {
            export type $201 = /**
             * Represents a single execution run of a governance config. Tracks the
             * full lifecycle from creation through completion, including outcome
             * details and an optional downloadable report.
             *
             */
            Components.Schemas.Job;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetConfig {
        namespace Parameters {
            export type ConfigId = string;
        }
        export interface PathParameters {
            config_id: Parameters.ConfigId;
        }
        namespace Responses {
            export type $200 = /**
             * A governance config defining an automated policy (e.g., scheduled
             * entity deletion) for a specific entity schema.
             *
             */
            Components.Schemas.Config;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /**
             * Represents a single execution run of a governance config. Tracks the
             * full lifecycle from creation through completion, including outcome
             * details and an optional downloadable report.
             *
             */
            Components.Schemas.Job;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetJobReportUrl {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /* Contains a time-limited pre-signed URL to download a job report. */ Components.Schemas.JobReportUrlResponse;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace ListConfigs {
        namespace Parameters {
            export type Cursor = string;
            export type Enabled = boolean;
            export type EntitySchema = string;
            export type Limit = number;
            export type NextRunAt = string; // date
            export type Type = /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            Components.Schemas.ConfigType;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
            entity_schema?: Parameters.EntitySchema;
            type?: Parameters.Type;
            next_run_at?: Parameters.NextRunAt /* date */;
            enabled?: Parameters.Enabled;
        }
        namespace Responses {
            export type $200 = /* Paginated response containing a list of governance configs. */ Components.Schemas.ListConfigsResponse;
            export interface $401 {
            }
        }
    }
    namespace ListJobs {
        namespace Parameters {
            export type ConfigId = string;
            export type Cursor = string;
            export type EntitySchema = string;
            export type Limit = number;
            export type Status = /**
             * Current execution status of a job run.
             * - `in_progress` — the job is actively processing entities.
             * - `success` — the job completed without critical errors.
             * - `failed` — the job terminated due to an error.
             *
             */
            Components.Schemas.JobStatus;
            export type Type = /**
             * The governance action type. Determines what operation is performed on
             * matched entities when a job runs. Currently only `deletion` is supported.
             *
             */
            Components.Schemas.ConfigType;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
            entity_schema?: Parameters.EntitySchema;
            type?: Parameters.Type;
            status?: Parameters.Status;
            config_id?: Parameters.ConfigId;
        }
        namespace Responses {
            export type $200 = /* Paginated response containing a list of job runs. */ Components.Schemas.ListJobsResponse;
            export interface $401 {
            }
        }
    }
    namespace QueryEntities {
        namespace Parameters {
            export type EntitySchema = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
        }
        export type RequestBody = /**
         * Request body for the query endpoint. Extends `QueryConfig` with
         * pagination and projection options.
         *
         */
        Components.Schemas.QueryEntitiesRequest;
        namespace Responses {
            export type $200 = /* Response from the entity query endpoint. */ Components.Schemas.QueryEntitiesResult;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateJob {
        namespace Parameters {
            export type EntitySchema = string;
            export type JobId = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
            job_id: Parameters.JobId;
        }
        export type RequestBody = /**
         * Partial update payload for an existing job. Only the fields provided
         * will be merged into the job record.
         *
         */
        Components.Schemas.UpdateJobRequest;
        namespace Responses {
            export type $200 = /**
             * Represents a single execution run of a governance config. Tracks the
             * full lifecycle from creation through completion, including outcome
             * details and an optional downloadable report.
             *
             */
            Components.Schemas.Job;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace UpsertConfig {
        namespace Parameters {
            export type EntitySchema = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
        }
        export type RequestBody = /* Request payload for creating or updating a governance config. */ Components.Schemas.UpsertConfigRequest;
        namespace Responses {
            export type $200 = /**
             * A governance config defining an automated policy (e.g., scheduled
             * entity deletion) for a specific entity schema.
             *
             */
            Components.Schemas.Config;
            export type $201 = /**
             * A governance config defining an automated policy (e.g., scheduled
             * entity deletion) for a specific entity schema.
             *
             */
            Components.Schemas.Config;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * queryEntities - Query entities matching a governance policy
   * 
   * Executes a query against the specified entity schema using a saved view
   * definition, optionally combined with additional data governance filters.
   * 
   * This endpoint is typically used to **preview** which entities would be
   * affected by a governance config before it runs. The response includes
   * the total hit count and (optionally hydrated) entity results.
   * 
   * Pagination is supported via `from` and `size` in the request body.
   * 
   */
  'queryEntities'(
    parameters?: Parameters<Paths.QueryEntities.PathParameters> | null,
    data?: Paths.QueryEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryEntities.Responses.$200>
  /**
   * createJob - Create a new job run
   * 
   * Creates a new job run for the given entity schema. The job is associated
   * with an existing config and records the scheduled execution date.
   * 
   * This is a low-level endpoint used internally by the scheduler. For
   * manually triggering a config execution, prefer
   * `POST /data-management/v1/configs/{config_id}/jobs`.
   * 
   */
  'createJob'(
    parameters?: Parameters<Paths.CreateJob.PathParameters> | null,
    data?: Paths.CreateJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateJob.Responses.$201>
  /**
   * updateJob - Update an existing job run
   * 
   * Partially updates an existing job run. Typically used to record
   * progress or finalize a job by setting its status to `success` or
   * `failed`, attaching details, error messages, or a report reference.
   * 
   */
  'updateJob'(
    parameters?: Parameters<Paths.UpdateJob.PathParameters> | null,
    data?: Paths.UpdateJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateJob.Responses.$200>
  /**
   * getJob - Get a job by ID
   * 
   * Returns full details of a single job run, including its current status,
   * execution timestamps, type-specific details, and report reference
   * (if available).
   * 
   */
  'getJob'(
    parameters?: Parameters<Paths.GetJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJob.Responses.$200>
  /**
   * getJobReportUrl - Get report download URL for a job
   * 
   * Returns a short-lived, pre-signed S3 URL to download the CSV report
   * file for the given job. The URL expires after the number of seconds
   * indicated in the `expires_in` field.
   * 
   * A report is only available after a job has completed. If the job is
   * still in progress or did not produce a report, a 404 is returned.
   * 
   */
  'getJobReportUrl'(
    parameters?: Parameters<Paths.GetJobReportUrl.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJobReportUrl.Responses.$200>
  /**
   * getConfig - Get a config by ID
   * 
   * Returns a single data governance config by its unique identifier,
   * including its query definition, schedule, and current enabled state.
   * 
   */
  'getConfig'(
    parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfig.Responses.$200>
  /**
   * createJobForConfig - Trigger a manual job run for a config
   * 
   * Manually triggers a new job run for the specified config. The job is
   * created and queued for asynchronous execution.
   * 
   * Returns the newly created job, whose `id` can be used to poll status
   * via `GET /data-management/v1/jobs/{job_id}`.
   * 
   * The job's `trigger` field will be set to `manual` and `triggered_by`
   * will contain the authenticated user's identifier.
   * 
   */
  'createJobForConfig'(
    parameters?: Parameters<Paths.CreateJobForConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateJobForConfig.Responses.$201>
  /**
   * upsertConfig - Create or update a governance config
   * 
   * Creates a new governance config or updates an existing one for the
   * given entity schema. The config defines:
   * - A **query** (saved view + optional filters) to identify target entities
   * - A **schedule** controlling how often the policy runs
   * - An **action type** (currently only `deletion`)
   * 
   * Once created and enabled, the config is evaluated on its schedule by a
   * background process that creates job runs automatically.
   * 
   * Returns `201` when a new config is created, `200` when an existing
   * config is updated.
   * 
   */
  'upsertConfig'(
    parameters?: Parameters<Paths.UpsertConfig.PathParameters> | null,
    data?: Paths.UpsertConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertConfig.Responses.$200 | Paths.UpsertConfig.Responses.$201>
  /**
   * listConfigs - List governance configs
   * 
   * Returns a cursor-paginated list of governance configs. Results can be
   * filtered by entity schema, config type, scheduled run date, or
   * enabled status.
   * 
   */
  'listConfigs'(
    parameters?: Parameters<Paths.ListConfigs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigs.Responses.$200>
  /**
   * listJobs - List job runs
   * 
   * Returns a cursor-paginated list of job runs. Results can be filtered
   * by entity schema, action type, execution status, or parent config.
   * 
   */
  'listJobs'(
    parameters?: Parameters<Paths.ListJobs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListJobs.Responses.$200>
}

export interface PathsDictionary {
  ['/data-management/v1/{entity_schema}/query']: {
    /**
     * queryEntities - Query entities matching a governance policy
     * 
     * Executes a query against the specified entity schema using a saved view
     * definition, optionally combined with additional data governance filters.
     * 
     * This endpoint is typically used to **preview** which entities would be
     * affected by a governance config before it runs. The response includes
     * the total hit count and (optionally hydrated) entity results.
     * 
     * Pagination is supported via `from` and `size` in the request body.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.QueryEntities.PathParameters> | null,
      data?: Paths.QueryEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryEntities.Responses.$200>
  }
  ['/data-management/v1/{entity_schema}/jobs']: {
    /**
     * createJob - Create a new job run
     * 
     * Creates a new job run for the given entity schema. The job is associated
     * with an existing config and records the scheduled execution date.
     * 
     * This is a low-level endpoint used internally by the scheduler. For
     * manually triggering a config execution, prefer
     * `POST /data-management/v1/configs/{config_id}/jobs`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateJob.PathParameters> | null,
      data?: Paths.CreateJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateJob.Responses.$201>
  }
  ['/data-management/v1/{entity_schema}/jobs/{job_id}']: {
    /**
     * updateJob - Update an existing job run
     * 
     * Partially updates an existing job run. Typically used to record
     * progress or finalize a job by setting its status to `success` or
     * `failed`, attaching details, error messages, or a report reference.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateJob.PathParameters> | null,
      data?: Paths.UpdateJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateJob.Responses.$200>
  }
  ['/data-management/v1/jobs/{job_id}']: {
    /**
     * getJob - Get a job by ID
     * 
     * Returns full details of a single job run, including its current status,
     * execution timestamps, type-specific details, and report reference
     * (if available).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJob.Responses.$200>
  }
  ['/data-management/v1/jobs/{job_id}/report-url']: {
    /**
     * getJobReportUrl - Get report download URL for a job
     * 
     * Returns a short-lived, pre-signed S3 URL to download the CSV report
     * file for the given job. The URL expires after the number of seconds
     * indicated in the `expires_in` field.
     * 
     * A report is only available after a job has completed. If the job is
     * still in progress or did not produce a report, a 404 is returned.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetJobReportUrl.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJobReportUrl.Responses.$200>
  }
  ['/data-management/v1/configs/{config_id}']: {
    /**
     * getConfig - Get a config by ID
     * 
     * Returns a single data governance config by its unique identifier,
     * including its query definition, schedule, and current enabled state.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfig.Responses.$200>
  }
  ['/data-management/v1/configs/{config_id}/jobs']: {
    /**
     * createJobForConfig - Trigger a manual job run for a config
     * 
     * Manually triggers a new job run for the specified config. The job is
     * created and queued for asynchronous execution.
     * 
     * Returns the newly created job, whose `id` can be used to poll status
     * via `GET /data-management/v1/jobs/{job_id}`.
     * 
     * The job's `trigger` field will be set to `manual` and `triggered_by`
     * will contain the authenticated user's identifier.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateJobForConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateJobForConfig.Responses.$201>
  }
  ['/data-management/v1/{entity_schema}/configs']: {
    /**
     * upsertConfig - Create or update a governance config
     * 
     * Creates a new governance config or updates an existing one for the
     * given entity schema. The config defines:
     * - A **query** (saved view + optional filters) to identify target entities
     * - A **schedule** controlling how often the policy runs
     * - An **action type** (currently only `deletion`)
     * 
     * Once created and enabled, the config is evaluated on its schedule by a
     * background process that creates job runs automatically.
     * 
     * Returns `201` when a new config is created, `200` when an existing
     * config is updated.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.UpsertConfig.PathParameters> | null,
      data?: Paths.UpsertConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpsertConfig.Responses.$200 | Paths.UpsertConfig.Responses.$201>
  }
  ['/data-management/v1/configs']: {
    /**
     * listConfigs - List governance configs
     * 
     * Returns a cursor-paginated list of governance configs. Results can be
     * filtered by entity schema, config type, scheduled run date, or
     * enabled status.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConfigs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigs.Responses.$200>
  }
  ['/data-management/v1/jobs']: {
    /**
     * listJobs - List job runs
     * 
     * Returns a cursor-paginated list of job runs. Results can be filtered
     * by entity schema, action type, execution status, or parent config.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListJobs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListJobs.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Config = Components.Schemas.Config;
export type ConfigSchedule = Components.Schemas.ConfigSchedule;
export type ConfigType = Components.Schemas.ConfigType;
export type CreateJobRequest = Components.Schemas.CreateJobRequest;
export type DeletionRelationEntitySchema = Components.Schemas.DeletionRelationEntitySchema;
export type IntervalConfigSchedule = Components.Schemas.IntervalConfigSchedule;
export type Job = Components.Schemas.Job;
export type JobDetails = Components.Schemas.JobDetails;
export type JobReport = Components.Schemas.JobReport;
export type JobReportFormat = Components.Schemas.JobReportFormat;
export type JobReportUrlResponse = Components.Schemas.JobReportUrlResponse;
export type JobStatus = Components.Schemas.JobStatus;
export type JobTrigger = Components.Schemas.JobTrigger;
export type ListConfigsResponse = Components.Schemas.ListConfigsResponse;
export type ListJobsResponse = Components.Schemas.ListJobsResponse;
export type QueryConfig = Components.Schemas.QueryConfig;
export type QueryEntitiesRequest = Components.Schemas.QueryEntitiesRequest;
export type QueryEntitiesResult = Components.Schemas.QueryEntitiesResult;
export type QueryFilter = Components.Schemas.QueryFilter;
export type QueryFilterType = Components.Schemas.QueryFilterType;
export type UpdateJobRequest = Components.Schemas.UpdateJobRequest;
export type UpsertConfigRequest = Components.Schemas.UpsertConfigRequest;
