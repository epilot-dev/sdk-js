/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Config {
            id: string;
            /**
             * Type of configuration. Currently only 'deletion' is supported.
             */
            type: /* Type of configuration (e.g. deletion) */ ConfigType;
            entity_schema: string;
            query: QueryConfig;
            schedule?: ConfigSchedule;
            enabled?: boolean;
            created_at?: string; // date-time
            last_updated_at?: string; // date-time
            next_run_at?: string; // date
            relations_for_deletion?: DeletionRelationEntitySchema[];
        }
        export type ConfigSchedule = IntervalConfigSchedule;
        /**
         * Type of configuration (e.g. deletion)
         */
        export type ConfigType = "deletion";
        export interface CreateJobRequest {
            type: /* Type of configuration (e.g. deletion) */ ConfigType;
            config_id: string;
            scheduled_for: string; // date
            status?: JobStatus;
            started_at?: string; // date-time
        }
        export type DeletionRelationEntitySchema = "contact" | "file" | "opportunity" | "order" | "meter" | "ticket" | "email" | "account" | "submission";
        export interface IntervalConfigSchedule {
            frequency: "interval";
            /**
             * Interval in days between executions
             */
            interval_days: number;
            start_date?: string; // date
            end_date?: string; // date
        }
        export interface Job {
            id: string;
            type: /* Type of configuration (e.g. deletion) */ ConfigType;
            config_id: string;
            entity_schema: string;
            scheduled_for: string; // date
            status: JobStatus;
            details?: /* Generic, type-specific job details payload (e.g. matched count, deleted count, failed count, etc.). */ JobDetails;
            started_at?: string; // date-time
            completed_at?: string; // date-time
            error?: string;
            report?: JobReport;
            created_at: string; // date-time
            last_updated_at: string; // date-time
        }
        /**
         * Generic, type-specific job details payload (e.g. matched count, deleted count, failed count, etc.).
         */
        export interface JobDetails {
            [name: string]: any;
        }
        export interface JobReport {
            bucket?: string;
            key?: string;
            format?: JobReportFormat;
        }
        export type JobReportFormat = "csv";
        export interface JobReportUrlResponse {
            url?: string;
            expires_in?: number;
        }
        export type JobStatus = "in_progress" | "success" | "failed";
        export interface ListConfigsResponse {
            configs?: Config[];
            cursor?: string | null;
        }
        export interface ListJobsResponse {
            jobs?: Job[];
            cursor?: string | null;
        }
        export interface QueryConfig {
            saved_view_id: string;
            include_deleted?: "true" | "false" | "only";
            filters: [
                QueryFilter,
                ...QueryFilter[]
            ];
        }
        export interface QueryEntitiesRequest {
            saved_view_id: string;
            include_deleted?: "true" | "false" | "only";
            filters: [
                QueryFilter,
                ...QueryFilter[]
            ];
            from?: number;
            size?: number;
            hydrate?: boolean;
            fields?: string[];
        }
        export interface QueryEntitiesResult {
            hits?: number;
            results?: {
                [name: string]: any;
            }[];
        }
        export interface QueryFilter {
            type: QueryFilterType;
            related_entity_schemas?: string[];
            lookback_period_days?: number;
        }
        export type QueryFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_any_in_closed_or_cancelled_status" | "no_email_communication_since";
        export interface UpdateJobRequest {
            status?: JobStatus;
            details?: /* Generic, type-specific job details payload (e.g. matched count, deleted count, failed count, etc.). */ JobDetails;
            completed_at?: string; // date-time
            error?: string;
            report?: JobReport;
        }
        export interface UpsertConfigRequest {
            type: /* Type of configuration (e.g. deletion) */ ConfigType;
            query: QueryConfig;
            schedule: ConfigSchedule;
            relations_for_deletion?: DeletionRelationEntitySchema[];
            /**
             * Whether this configuration is active
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
        export type RequestBody = Components.Schemas.CreateJobRequest;
        namespace Responses {
            export type $201 = Components.Schemas.Job;
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
            export type $200 = Components.Schemas.Config;
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
            export type $200 = Components.Schemas.JobReportUrlResponse;
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
            export type Type = /* Type of configuration (e.g. deletion) */ Components.Schemas.ConfigType;
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
            export type $200 = Components.Schemas.ListConfigsResponse;
        }
    }
    namespace ListJobs {
        namespace Parameters {
            export type ConfigId = string;
            export type Cursor = string;
            export type EntitySchema = string;
            export type Limit = number;
            export type Status = Components.Schemas.JobStatus;
            export type Type = /* Type of configuration (e.g. deletion) */ Components.Schemas.ConfigType;
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
            export type $200 = Components.Schemas.ListJobsResponse;
        }
    }
    namespace QueryEntities {
        namespace Parameters {
            export type EntitySchema = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
        }
        export type RequestBody = Components.Schemas.QueryEntitiesRequest;
        namespace Responses {
            export type $200 = Components.Schemas.QueryEntitiesResult;
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
        export type RequestBody = Components.Schemas.UpdateJobRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Job;
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
        export type RequestBody = Components.Schemas.UpsertConfigRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Config;
            export type $201 = Components.Schemas.Config;
        }
    }
}


export interface OperationMethods {
  /**
   * queryEntities - Query entities using a saved view with additional data filters
   * 
   * Executes a query against the specified entity schema using the saved view definition, optionally combined with additional filters. Returns the entities matching the composed query.
   * 
   */
  'queryEntities'(
    parameters?: Parameters<Paths.QueryEntities.PathParameters> | null,
    data?: Paths.QueryEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryEntities.Responses.$200>
  /**
   * createJob - Create a new job run
   */
  'createJob'(
    parameters?: Parameters<Paths.CreateJob.PathParameters> | null,
    data?: Paths.CreateJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateJob.Responses.$201>
  /**
   * updateJob - Update an existing job run
   */
  'updateJob'(
    parameters?: Parameters<Paths.UpdateJob.PathParameters> | null,
    data?: Paths.UpdateJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateJob.Responses.$200>
  /**
   * getJobReportUrl - Get report download URL for a job
   * 
   * Returns a short-lived, pre-signed URL to download the report file for the given job.
   * 
   */
  'getJobReportUrl'(
    parameters?: Parameters<Paths.GetJobReportUrl.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJobReportUrl.Responses.$200>
  /**
   * getConfig - Get a config by id
   * 
   * Returns a data management config by its id.
   * 
   */
  'getConfig'(
    parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfig.Responses.$200>
  /**
   * upsertConfig - Upsert config
   * 
   * Creates or updates a config for the given entity schema. The config is later used by a scheduled background process to periodically query and act on matching entities (for example, deletion).
   * 
   */
  'upsertConfig'(
    parameters?: Parameters<Paths.UpsertConfig.PathParameters> | null,
    data?: Paths.UpsertConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertConfig.Responses.$200 | Paths.UpsertConfig.Responses.$201>
  /**
   * listConfigs - List configs
   * 
   * Returns a paginated list of configs
   * 
   */
  'listConfigs'(
    parameters?: Parameters<Paths.ListConfigs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigs.Responses.$200>
  /**
   * listJobs - List jobs
   * 
   * Returns a paginated list of jobs
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
     * queryEntities - Query entities using a saved view with additional data filters
     * 
     * Executes a query against the specified entity schema using the saved view definition, optionally combined with additional filters. Returns the entities matching the composed query.
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
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateJob.PathParameters> | null,
      data?: Paths.UpdateJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateJob.Responses.$200>
  }
  ['/data-management/v1/jobs/{job_id}/report-url']: {
    /**
     * getJobReportUrl - Get report download URL for a job
     * 
     * Returns a short-lived, pre-signed URL to download the report file for the given job.
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
     * getConfig - Get a config by id
     * 
     * Returns a data management config by its id.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfig.Responses.$200>
  }
  ['/data-management/v1/{entity_schema}/configs']: {
    /**
     * upsertConfig - Upsert config
     * 
     * Creates or updates a config for the given entity schema. The config is later used by a scheduled background process to periodically query and act on matching entities (for example, deletion).
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
     * listConfigs - List configs
     * 
     * Returns a paginated list of configs
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
     * listJobs - List jobs
     * 
     * Returns a paginated list of jobs
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
export type ListConfigsResponse = Components.Schemas.ListConfigsResponse;
export type ListJobsResponse = Components.Schemas.ListJobsResponse;
export type QueryConfig = Components.Schemas.QueryConfig;
export type QueryEntitiesRequest = Components.Schemas.QueryEntitiesRequest;
export type QueryEntitiesResult = Components.Schemas.QueryEntitiesResult;
export type QueryFilter = Components.Schemas.QueryFilter;
export type QueryFilterType = Components.Schemas.QueryFilterType;
export type UpdateJobRequest = Components.Schemas.UpdateJobRequest;
export type UpsertConfigRequest = Components.Schemas.UpsertConfigRequest;
