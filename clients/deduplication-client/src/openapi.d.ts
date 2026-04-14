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
         * Response returned immediately when a deduplication job is submitted
         */
        export interface DeduplicateAsyncResponse {
            /**
             * Job ID to poll for status via GET /v1/deduplicate/jobs/{jobId}
             */
            jobId: string;
            status: JobStatus;
            /**
             * Initial status message
             */
            message: string;
        }
        export type DeduplicateRequestBody = {
            toKeep: string;
            toDelete: string[];
        }[];
        export type DeduplicateRequestResponse = /* Base Entity schema */ Entity[];
        /**
         * Represents an async deduplication job
         */
        export interface DeduplicationJob {
            /**
             * Unique identifier for the deduplication job
             */
            jobId: string;
            status: JobStatus;
            /**
             * Human-readable status message (e.g. progress info or error details)
             */
            message?: string;
            /**
             * Array of deduplicated entities, present when status is completed
             */
            result?: /* Base Entity schema */ Entity[];
            /**
             * ISO 8601 timestamp of job creation
             */
            createdAt: string; // date-time
            /**
             * ISO 8601 timestamp of last update
             */
            updatedAt: string; // date-time
        }
        /**
         * Base Entity schema
         */
        export interface Entity {
            /**
             * Entity ID of the Deduplication entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Deduplication
             */
            _org?: string;
            /**
             * The Entity schema of this Deduplication
             */
            _schema?: string;
            /**
             * The timestamp of when this Deduplication was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Deduplication was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Deduplication
             */
            _created_by?: /* The Entity ID of the User that created this Deduplication */ string | number;
            /**
             * The Entity ID of the User that created this Deduplication
             */
            created_by?: /* The Entity ID of the User that created this Deduplication */ string | number;
            /**
             * Tags associated with this Deduplication
             */
            _tags?: string[];
            /**
             * Access Control List for this Deduplication entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
            /**
             * Entity ID of the Deduplication entry
             */
            type?: string;
        }
        export type JobStatus = "pending" | "processing" | "completed" | "failed";
    }
}
declare namespace Paths {
    namespace Deduplicate {
        export type RequestBody = Components.Schemas.DeduplicateRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DeduplicateRequestResponse;
        }
    }
    namespace DeduplicateAsync {
        export type RequestBody = Components.Schemas.DeduplicateRequestBody;
        namespace Responses {
            export type $202 = /* Response returned immediately when a deduplication job is submitted */ Components.Schemas.DeduplicateAsyncResponse;
        }
    }
    namespace GetDeduplicationJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            jobId: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /* Represents an async deduplication job */ Components.Schemas.DeduplicationJob;
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * deduplicate - deduplicate
   * 
   * Deduplicates Entities
   */
  'deduplicate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Deduplicate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Deduplicate.Responses.$200>
  /**
   * deduplicateAsync - deduplicateAsync
   * 
   * Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.
   */
  'deduplicateAsync'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeduplicateAsync.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeduplicateAsync.Responses.$202>
  /**
   * getDeduplicationJob - getDeduplicationJob
   * 
   * Returns the current status of an async deduplication job
   */
  'getDeduplicationJob'(
    parameters?: Parameters<Paths.GetDeduplicationJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDeduplicationJob.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/deduplicate']: {
    /**
     * deduplicate - deduplicate
     * 
     * Deduplicates Entities
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Deduplicate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Deduplicate.Responses.$200>
  }
  ['/v1/deduplicate/job']: {
    /**
     * deduplicateAsync - deduplicateAsync
     * 
     * Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeduplicateAsync.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeduplicateAsync.Responses.$202>
  }
  ['/v1/deduplicate/jobs/{jobId}']: {
    /**
     * getDeduplicationJob - getDeduplicationJob
     * 
     * Returns the current status of an async deduplication job
     */
    'get'(
      parameters?: Parameters<Paths.GetDeduplicationJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDeduplicationJob.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type DeduplicateAsyncResponse = Components.Schemas.DeduplicateAsyncResponse;
export type DeduplicateRequestBody = Components.Schemas.DeduplicateRequestBody;
export type DeduplicateRequestResponse = Components.Schemas.DeduplicateRequestResponse;
export type DeduplicationJob = Components.Schemas.DeduplicationJob;
export type Entity = Components.Schemas.Entity;
export type JobStatus = Components.Schemas.JobStatus;
