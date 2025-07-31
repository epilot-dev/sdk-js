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
        export type DeduplicateRequestBody = {
            toKeep: string;
            toDelete: string[];
        }[];
        export type DeduplicateRequestResponse = /* Base Entity schema */ Entity[];
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
    }
}
declare namespace Paths {
    namespace Deduplicate {
        export type RequestBody = Components.Schemas.DeduplicateRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DeduplicateRequestResponse;
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type DeduplicateRequestBody = Components.Schemas.DeduplicateRequestBody;
export type DeduplicateRequestResponse = Components.Schemas.DeduplicateRequestResponse;
export type Entity = Components.Schemas.Entity;
