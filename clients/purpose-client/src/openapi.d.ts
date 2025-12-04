/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
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
        export type BatchGetPurposesRequest = /* Input for batch getting purposes */ Schemas.BatchGetPurposesInput;
        export type CreatePurposeRequest = /* Input for creating a new purpose */ Schemas.CreatePurposeInput;
        export type UpdatePurposeRequest = /* Input for updating an existing purpose */ Schemas.UpdatePurposeInput;
    }
    namespace Responses {
        export type ClientErrorResponse = Schemas.Error;
        export type ConflictResponse = Schemas.Error;
        export type ForbiddenResponse = Schemas.Error;
        export type NotFoundResponse = Schemas.Error;
        export interface PurposeListResponse {
            results?: /* A purpose used to tag and organize entities */ Schemas.Purpose[];
            /**
             * Total number of results
             */
            hits?: number;
        }
        export type PurposeResponse = /* A purpose used to tag and organize entities */ Schemas.Purpose;
        export interface PurposeSearchResponse {
            results?: /* A purpose used to tag and organize entities */ Schemas.Purpose[];
        }
        export type ServerErrorResponse = Schemas.Error;
        export type UnauthorizedResponse = Schemas.Error;
    }
    namespace Schemas {
        /**
         * Input for batch getting purposes
         */
        export interface BatchGetPurposesInput {
            /**
             * List of purpose IDs to fetch
             * example:
             * [
             *   "123e4567-e89b-12d3-a456-426614174000"
             * ]
             */
            purposeIds: string[];
        }
        /**
         * Input for creating a new purpose
         */
        export interface CreatePurposeInput {
            /**
             * Human-readable name
             * example:
             * Electricity Contract
             */
            name: string;
        }
        export interface Error {
            /**
             * HTTP status code
             */
            status?: number;
            /**
             * Error message
             */
            error?: string;
        }
        /**
         * A purpose used to tag and organize entities
         */
        export interface Purpose {
            /**
             * Unique identifier
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            id: string; // uuid
            /**
             * Human-readable name
             * example:
             * Electricity Contract
             */
            name: string;
            /**
             * ISO timestamp of creation
             */
            created_at?: string; // date-time
            /**
             * ISO timestamp of last update
             */
            updated_at?: string; // date-time
        }
        /**
         * Input for updating an existing purpose
         */
        export interface UpdatePurposeInput {
            /**
             * Human-readable name
             */
            name?: string;
        }
    }
}
declare namespace Paths {
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
   * createPurpose - Create Purpose
   * 
   * Create a new purpose
   */
  'createPurpose'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePurpose.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePurpose.Responses.$201>
  /**
   * searchPurposes - Search Purposes
   * 
   * Search purposes using fuzzy matching.
   * 
   */
  'searchPurposes'(
    parameters?: Parameters<Paths.SearchPurposes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPurposes.Responses.$200>
  /**
   * batchGetPurposes - Batch Get Purposes
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
   * getPurpose - Get Purpose
   * 
   * Get a single purpose by ID
   */
  'getPurpose'(
    parameters?: Parameters<Paths.GetPurpose.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPurpose.Responses.$200>
  /**
   * updatePurpose - Update Purpose
   * 
   * Update an existing purpose
   */
  'updatePurpose'(
    parameters?: Parameters<Paths.UpdatePurpose.PathParameters> | null,
    data?: Paths.UpdatePurpose.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePurpose.Responses.$200>
  /**
   * deletePurpose - Delete Purpose
   * 
   * Permanently delete a purpose
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
     * createPurpose - Create Purpose
     * 
     * Create a new purpose
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePurpose.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePurpose.Responses.$201>
  }
  ['/v1/purpose:search']: {
    /**
     * searchPurposes - Search Purposes
     * 
     * Search purposes using fuzzy matching.
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
     * batchGetPurposes - Batch Get Purposes
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
     * getPurpose - Get Purpose
     * 
     * Get a single purpose by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetPurpose.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPurpose.Responses.$200>
    /**
     * updatePurpose - Update Purpose
     * 
     * Update an existing purpose
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePurpose.PathParameters> | null,
      data?: Paths.UpdatePurpose.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePurpose.Responses.$200>
    /**
     * deletePurpose - Delete Purpose
     * 
     * Permanently delete a purpose
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
