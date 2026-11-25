/* Auto-copied from purpose-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type PurposeIdPathParam = string;
        export type QueryParam = string;
        export type SizeParam = number;
    }
    export interface PathParameters {
        PurposeIdPathParam?: Parameters.PurposeIdPathParam;
    }
    export interface QueryParameters {
        QueryParam?: Parameters.QueryParam;
        SizeParam?: Parameters.SizeParam;
    }
    namespace RequestBodies {
        export type BatchGetPurposesRequest = /**
         * Input for batch-fetching purposes by their IDs
         * example:
         * {
         *   "purposeIds": [
         *     "123e4567-e89b-12d3-a456-426614174000",
         *     "987fcdeb-51a2-43f7-9012-345678901234"
         *   ]
         * }
         */
        Schemas.BatchGetPurposesInput;
        export type CreatePurposeRequest = /**
         * Input for creating a new purpose
         * example:
         * {
         *   "name": "Electricity Contract"
         * }
         */
        Schemas.CreatePurposeInput;
        export type UpdatePurposeRequest = /**
         * Input for updating an existing purpose
         * example:
         * {
         *   "name": "Electricity & Gas Contract"
         * }
         */
        Schemas.UpdatePurposeInput;
    }
    namespace Responses {
        export type ClientErrorResponse = Schemas.Error;
        export type ConflictResponse = Schemas.Error;
        export type ForbiddenResponse = Schemas.Error;
        export type NotFoundResponse = Schemas.Error;
        export interface PurposeListResponse {
            results?: /* An epilot Purpose – a named taxonomy label used to tag and organize resources across the platform */ Schemas.Purpose[];
            /**
             * Total number of results returned
             * example:
             * 2
             */
            hits?: number;
        }
        export type PurposeResponse = /* An epilot Purpose – a named taxonomy label used to tag and organize resources across the platform */ Schemas.Purpose;
        export interface PurposeSearchResponse {
            results?: /* An epilot Purpose – a named taxonomy label used to tag and organize resources across the platform */ Schemas.Purpose[];
        }
        export type ServerErrorResponse = Schemas.Error;
        export type UnauthorizedResponse = Schemas.Error;
    }
    namespace Schemas {
        /**
         * Input for batch-fetching purposes by their IDs
         * example:
         * {
         *   "purposeIds": [
         *     "123e4567-e89b-12d3-a456-426614174000",
         *     "987fcdeb-51a2-43f7-9012-345678901234"
         *   ]
         * }
         */
        export interface BatchGetPurposesInput {
            /**
             * List of purpose UUIDs to fetch
             * example:
             * [
             *   "123e4567-e89b-12d3-a456-426614174000",
             *   "987fcdeb-51a2-43f7-9012-345678901234"
             * ]
             */
            purposeIds: string /* uuid */[];
        }
        /**
         * Input for creating a new purpose
         * example:
         * {
         *   "name": "Electricity Contract"
         * }
         */
        export interface CreatePurposeInput {
            /**
             * Human-readable name for the purpose. Must be unique within the organization.
             * example:
             * Electricity Contract
             */
            name: string;
        }
        export interface Error {
            /**
             * HTTP status code
             * example:
             * 400
             */
            status?: number;
            /**
             * Short error label
             * example:
             * Bad Request
             */
            error?: string;
            /**
             * Human-readable description of the error
             * example:
             * name is a required field
             */
            message?: string;
        }
        /**
         * An epilot Purpose – a named taxonomy label used to tag and organize resources across the platform
         */
        export interface Purpose {
            /**
             * Unique identifier for the purpose
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            id: string; // uuid
            /**
             * Human-readable name of the purpose
             * example:
             * Electricity Contract
             */
            name: string;
            /**
             * ISO 8601 timestamp of when the purpose was created
             * example:
             * 2024-01-15T10:30:00.000Z
             */
            created_at?: string; // date-time
            /**
             * ISO 8601 timestamp of the last update
             * example:
             * 2024-06-01T08:00:00.000Z
             */
            updated_at?: string; // date-time
        }
        /**
         * Input for updating an existing purpose
         * example:
         * {
         *   "name": "Electricity & Gas Contract"
         * }
         */
        export interface UpdatePurposeInput {
            /**
             * New human-readable name for the purpose
             * example:
             * Electricity & Gas Contract
             */
            name?: string;
        }
    }
}
export declare namespace Paths {
    namespace BatchGetPurposes {
        export type RequestBody = Components.RequestBodies.BatchGetPurposesRequest;
        namespace Responses {
            export type $200 = Components.Responses.PurposeListResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace CreatePurpose {
        export type RequestBody = Components.RequestBodies.CreatePurposeRequest;
        namespace Responses {
            export type $201 = Components.Responses.PurposeResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $409 = Components.Responses.ConflictResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace DeletePurpose {
        namespace Parameters {
            export type PurposeId = string;
        }
        export interface PathParameters {
            purposeId: Parameters.PurposeId;
        }
        namespace Responses {
            export type $200 = Components.Responses.PurposeResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace GetPurpose {
        namespace Parameters {
            export type PurposeId = string;
        }
        export interface PathParameters {
            purposeId: Parameters.PurposeId;
        }
        namespace Responses {
            export type $200 = Components.Responses.PurposeResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace SearchPurposes {
        namespace Parameters {
            export type Query = string;
            export type Size = number;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Responses.PurposeSearchResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace UpdatePurpose {
        namespace Parameters {
            export type PurposeId = string;
        }
        export interface PathParameters {
            purposeId: Parameters.PurposeId;
        }
        export type RequestBody = Components.RequestBodies.UpdatePurposeRequest;
        namespace Responses {
            export type $200 = Components.Responses.PurposeResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * createPurpose - createPurpose
   * 
   * Create a new purpose.
   * 
   * Purpose names must be unique within an organization. Attempting to create a purpose with a name that already exists returns `409 Conflict`.
   * 
   */
  'createPurpose'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePurpose.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePurpose.Responses.$201>
  /**
   * searchPurposes - searchPurposes
   * 
   * Search purposes using fuzzy matching against the purpose name.
   * 
   * Use this endpoint for autocomplete inputs and user-driven purpose pickers. For resolving known purpose IDs to full objects, use `batchGetPurposes` instead.
   * 
   */
  'searchPurposes'(
    parameters?: Parameters<Paths.SearchPurposes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPurposes.Responses.$200>
  /**
   * batchGetPurposes - batchGetPurposes
   * 
   * Fetch multiple purposes by their known IDs in a single request.
   * 
   * **Use this for:**
   * - Hydrating purpose references from entities
   * - Resolving a list of purpose IDs to full objects
   * 
   * **Do NOT use this for:**
   * - Browsing/discovering purposes (use `searchPurposes` instead)
   * - Autocomplete (use `searchPurposes` instead)
   * 
   * **Examples:**
   * - Entity has `_purposes: ["uuid-1", "uuid-2"]` → fetch full purpose objects
   * - Display purpose names for a list of tagged entities
   * 
   */
  'batchGetPurposes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BatchGetPurposes.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchGetPurposes.Responses.$200>
  /**
   * getPurpose - getPurpose
   * 
   * Get a single purpose by its UUID.
   */
  'getPurpose'(
    parameters?: Parameters<Paths.GetPurpose.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPurpose.Responses.$200>
  /**
   * updatePurpose - updatePurpose
   * 
   * Update an existing purpose.
   * 
   * Only the `name` field can be updated. The `id`, `created_at`, and `updated_at` fields are managed by the server.
   * 
   */
  'updatePurpose'(
    parameters?: Parameters<Paths.UpdatePurpose.PathParameters> | null,
    data?: Paths.UpdatePurpose.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePurpose.Responses.$200>
  /**
   * deletePurpose - deletePurpose
   * 
   * Permanently delete a purpose by its UUID.
   * 
   * Deleting a purpose does not automatically remove it from resources that reference it. Clients should handle stale purpose IDs gracefully.
   * 
   */
  'deletePurpose'(
    parameters?: Parameters<Paths.DeletePurpose.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePurpose.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/purpose']: {
    /**
     * createPurpose - createPurpose
     * 
     * Create a new purpose.
     * 
     * Purpose names must be unique within an organization. Attempting to create a purpose with a name that already exists returns `409 Conflict`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePurpose.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePurpose.Responses.$201>
  }
  ['/v1/purpose:search']: {
    /**
     * searchPurposes - searchPurposes
     * 
     * Search purposes using fuzzy matching against the purpose name.
     * 
     * Use this endpoint for autocomplete inputs and user-driven purpose pickers. For resolving known purpose IDs to full objects, use `batchGetPurposes` instead.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchPurposes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPurposes.Responses.$200>
  }
  ['/v1/purpose:batchGet']: {
    /**
     * batchGetPurposes - batchGetPurposes
     * 
     * Fetch multiple purposes by their known IDs in a single request.
     * 
     * **Use this for:**
     * - Hydrating purpose references from entities
     * - Resolving a list of purpose IDs to full objects
     * 
     * **Do NOT use this for:**
     * - Browsing/discovering purposes (use `searchPurposes` instead)
     * - Autocomplete (use `searchPurposes` instead)
     * 
     * **Examples:**
     * - Entity has `_purposes: ["uuid-1", "uuid-2"]` → fetch full purpose objects
     * - Display purpose names for a list of tagged entities
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BatchGetPurposes.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchGetPurposes.Responses.$200>
  }
  ['/v1/purpose/{purposeId}']: {
    /**
     * getPurpose - getPurpose
     * 
     * Get a single purpose by its UUID.
     */
    'get'(
      parameters?: Parameters<Paths.GetPurpose.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPurpose.Responses.$200>
    /**
     * updatePurpose - updatePurpose
     * 
     * Update an existing purpose.
     * 
     * Only the `name` field can be updated. The `id`, `created_at`, and `updated_at` fields are managed by the server.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePurpose.PathParameters> | null,
      data?: Paths.UpdatePurpose.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePurpose.Responses.$200>
    /**
     * deletePurpose - deletePurpose
     * 
     * Permanently delete a purpose by its UUID.
     * 
     * Deleting a purpose does not automatically remove it from resources that reference it. Clients should handle stale purpose IDs gracefully.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePurpose.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePurpose.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type BatchGetPurposesInput = Components.Schemas.BatchGetPurposesInput;
export type CreatePurposeInput = Components.Schemas.CreatePurposeInput;
export type Error = Components.Schemas.Error;
export type Purpose = Components.Schemas.Purpose;
export type UpdatePurposeInput = Components.Schemas.UpdatePurposeInput;
