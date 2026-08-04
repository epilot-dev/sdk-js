/* Auto-copied from deduplication-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
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
        export type DeduplicateRequestBody = [
            {
                /**
                 * Entity id to keep and merge the duplicates into
                 */
                toKeep: string;
                /**
                 * Non-empty list of duplicate entity ids to merge into toKeep and delete
                 */
                toDelete: [
                    string,
                    ...string[]
                ];
            },
            ...{
                /**
                 * Entity id to keep and merge the duplicates into
                 */
                toKeep: string;
                /**
                 * Non-empty list of duplicate entity ids to merge into toKeep and delete
                 */
                toDelete: [
                    string,
                    ...string[]
                ];
            }[]
        ];
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
        export interface DetectDuplicatesRequestBody {
            /**
             * Entity schema to search (e.g. 'contact'). Must have UniquenessCriteria configured for the calling org.
             */
            schema: string;
            /**
             * The entity to look up potential duplicates for. Attribute values are extracted from this entity per the schema's match rules; system fields such as '_id' are supported. A rule is evaluated when at least one of its attributes resolves to a non-empty value on this entity; attributes without a value require candidates to also lack a value for them.
             */
            entity: {
                [name: string]: any;
            };
        }
        export interface DetectDuplicatesResponse {
            matches: DetectedDuplicateMatch[];
        }
        export interface DetectedDuplicateMatch {
            entity: /* Base Entity schema */ Entity;
            /**
             * Confidence score for the match, between 0 and 1.
             */
            confidence: number;
            /**
             * Names of the attributes that matched on the rule that produced this hit.
             */
            matched_attributes: [
                string,
                ...string[]
            ];
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
        /**
         * One attribute participating in a match rule. Wrapped as an object so per-attribute options can be added later.
         */
        export interface MatchAttribute {
            /**
             * Name of the entity attribute to match on. Its query path is resolved from the entity schema at query time.
             */
            attribute: string;
        }
        /**
         * One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins.
         */
        export interface MatchRule {
            /**
             * Optional human-readable label for the rule. Purely descriptive; not used during matching.
             */
            name?: string;
            /**
             * Attributes that must all match for this rule to fire. Attributes without a value on the source entity must also have no value on a matching candidate.
             */
            attributes: [
                /* One attribute participating in a match rule. Wrapped as an object so per-attribute options can be added later. */ MatchAttribute,
                .../* One attribute participating in a match rule. Wrapped as an object so per-attribute options can be added later. */ MatchAttribute[]
            ];
            /**
             * Confidence assigned to matches produced by this rule, between 0 and 1.
             */
            confidence: number;
        }
        /**
         * Defines what makes an entity of a given schema unique within an organization.
         */
        export interface UniquenessCriteria {
            /**
             * Unique identifier of the criteria record.
             */
            id: string; // uuid
            /**
             * Organization the criteria belong to.
             */
            orgId: string;
            /**
             * Entity schema these criteria apply to (e.g. 'contact').
             */
            schema: string;
            /**
             * Ordered list of match rules. Order is the evaluation priority.
             */
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
            /**
             * ISO 8601 timestamp of record creation.
             */
            createdAt: string; // date-time
            /**
             * ISO 8601 timestamp of last update.
             */
            updatedAt: string; // date-time
        }
        export interface UniquenessCriteriaCreateBody {
            /**
             * Entity schema these criteria apply to.
             */
            schema: string;
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
        }
        export interface UniquenessCriteriaListResponse {
            items: /* Defines what makes an entity of a given schema unique within an organization. */ UniquenessCriteria[];
        }
        export interface UniquenessCriteriaUpdateBody {
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
        }
    }
}
export declare namespace Paths {
    namespace CreateUniquenessCriteria {
        export type RequestBody = Components.Schemas.UniquenessCriteriaCreateBody;
        namespace Responses {
            export type $201 = /* Defines what makes an entity of a given schema unique within an organization. */ Components.Schemas.UniquenessCriteria;
        }
    }
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
    namespace DeleteUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
        }
    }
    namespace DetectDuplicates {
        export type RequestBody = Components.Schemas.DetectDuplicatesRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DetectDuplicatesResponse;
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
    namespace GetUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = /* Defines what makes an entity of a given schema unique within an organization. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace ListUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface QueryParameters {
            schema?: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UniquenessCriteriaListResponse;
        }
    }
    namespace UpdateUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        export type RequestBody = Components.Schemas.UniquenessCriteriaUpdateBody;
        namespace Responses {
            export type $200 = /* Defines what makes an entity of a given schema unique within an organization. */ Components.Schemas.UniquenessCriteria;
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
  /**
   * detectDuplicates - detectDuplicates
   * 
   * Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score.
   */
  'detectDuplicates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DetectDuplicates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DetectDuplicates.Responses.$200>
  /**
   * listUniquenessCriteria - listUniquenessCriteria
   * 
   * Lists UniquenessCriteria for the requesting organization. Optionally filtered by schema.
   */
  'listUniquenessCriteria'(
    parameters?: Parameters<Paths.ListUniquenessCriteria.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
  /**
   * createUniquenessCriteria - createUniquenessCriteria
   * 
   * Creates a new UniquenessCriteria record.
   */
  'createUniquenessCriteria'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUniquenessCriteria.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUniquenessCriteria.Responses.$201>
  /**
   * getUniquenessCriteria - getUniquenessCriteria
   * 
   * Fetch a single UniquenessCriteria record.
   */
  'getUniquenessCriteria'(
    parameters?: Parameters<Paths.GetUniquenessCriteria.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
  /**
   * updateUniquenessCriteria - updateUniquenessCriteria
   * 
   * Replace the matchRules on an existing UniquenessCriteria record.
   */
  'updateUniquenessCriteria'(
    parameters?: Parameters<Paths.UpdateUniquenessCriteria.PathParameters> | null,
    data?: Paths.UpdateUniquenessCriteria.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUniquenessCriteria.Responses.$200>
  /**
   * deleteUniquenessCriteria - deleteUniquenessCriteria
   * 
   * Delete a UniquenessCriteria record.
   */
  'deleteUniquenessCriteria'(
    parameters?: Parameters<Paths.DeleteUniquenessCriteria.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
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
  ['/v1/detect-duplicates']: {
    /**
     * detectDuplicates - detectDuplicates
     * 
     * Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DetectDuplicates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DetectDuplicates.Responses.$200>
  }
  ['/v1/uniqueness-criteria']: {
    /**
     * listUniquenessCriteria - listUniquenessCriteria
     * 
     * Lists UniquenessCriteria for the requesting organization. Optionally filtered by schema.
     */
    'get'(
      parameters?: Parameters<Paths.ListUniquenessCriteria.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
    /**
     * createUniquenessCriteria - createUniquenessCriteria
     * 
     * Creates a new UniquenessCriteria record.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUniquenessCriteria.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUniquenessCriteria.Responses.$201>
  }
  ['/v1/uniqueness-criteria/{schema}']: {
    /**
     * getUniquenessCriteria - getUniquenessCriteria
     * 
     * Fetch a single UniquenessCriteria record.
     */
    'get'(
      parameters?: Parameters<Paths.GetUniquenessCriteria.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
    /**
     * updateUniquenessCriteria - updateUniquenessCriteria
     * 
     * Replace the matchRules on an existing UniquenessCriteria record.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUniquenessCriteria.PathParameters> | null,
      data?: Paths.UpdateUniquenessCriteria.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUniquenessCriteria.Responses.$200>
    /**
     * deleteUniquenessCriteria - deleteUniquenessCriteria
     * 
     * Delete a UniquenessCriteria record.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUniquenessCriteria.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type DeduplicateAsyncResponse = Components.Schemas.DeduplicateAsyncResponse;
export type DeduplicateRequestBody = Components.Schemas.DeduplicateRequestBody;
export type DeduplicateRequestResponse = Components.Schemas.DeduplicateRequestResponse;
export type DeduplicationJob = Components.Schemas.DeduplicationJob;
export type DetectDuplicatesRequestBody = Components.Schemas.DetectDuplicatesRequestBody;
export type DetectDuplicatesResponse = Components.Schemas.DetectDuplicatesResponse;
export type DetectedDuplicateMatch = Components.Schemas.DetectedDuplicateMatch;
export type Entity = Components.Schemas.Entity;
export type JobStatus = Components.Schemas.JobStatus;
export type MatchAttribute = Components.Schemas.MatchAttribute;
export type MatchRule = Components.Schemas.MatchRule;
export type UniquenessCriteria = Components.Schemas.UniquenessCriteria;
export type UniquenessCriteriaCreateBody = Components.Schemas.UniquenessCriteriaCreateBody;
export type UniquenessCriteriaListResponse = Components.Schemas.UniquenessCriteriaListResponse;
export type UniquenessCriteriaUpdateBody = Components.Schemas.UniquenessCriteriaUpdateBody;
