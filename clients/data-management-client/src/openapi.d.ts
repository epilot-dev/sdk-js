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
        export interface DataManagementFilter {
            type: DataManagementFilterType;
            related_entity_schemas?: string[];
            workflow_statuses?: string[];
            entity_statuses?: string[];
            lookback_period_months?: number;
        }
        export type DataManagementFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_any_in_closed_or_cancelled_status" | "no_email_communication_since";
    }
}
declare namespace Paths {
    namespace HealthCheck {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * ok
                 */
                status?: string;
            }
        }
    }
    namespace QueryEntitiesBySavedView {
        namespace Parameters {
            export type EntitySchema = string;
        }
        export interface PathParameters {
            entity_schema: Parameters.EntitySchema;
        }
        export interface RequestBody {
            /**
             * ID of the saved view to use for querying entities
             */
            saved_view_id: string;
            /**
             * Pagination start offset
             */
            from?: number;
            /**
             * Page size (maximum number of entities to return)
             */
            size?: number;
            /**
             * Whether to include soft-deleted entities in the result
             */
            includeDeleted?: boolean;
            /**
             * Whether to hydrate entities with full data instead of returning only indexed / projection fields.
             *
             */
            hydrate?: boolean;
            /**
             * Optional list of fields to include in each entity.
             *
             */
            fields?: string[];
            filters?: Components.Schemas.DataManagementFilter;
        }
        namespace Responses {
            export interface $200 {
                results?: {
                    [name: string]: any;
                }[];
            }
        }
    }
}


export interface OperationMethods {
  /**
   * healthCheck - Health check
   * 
   * Returns service health status
   */
  'healthCheck'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HealthCheck.Responses.$200>
  /**
   * queryEntitiesBySavedView - Query entities using a saved view with additional data filters
   * 
   * Executes a query against the specified entity schema using the saved view definition, optionally combined with additional filters. Returns the entities matching the composed query.
   * 
   */
  'queryEntitiesBySavedView'(
    parameters?: Parameters<Paths.QueryEntitiesBySavedView.PathParameters> | null,
    data?: Paths.QueryEntitiesBySavedView.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryEntitiesBySavedView.Responses.$200>
}

export interface PathsDictionary {
  ['/health']: {
    /**
     * healthCheck - Health check
     * 
     * Returns service health status
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HealthCheck.Responses.$200>
  }
  ['/data-management/v1/{entity_schema}/query']: {
    /**
     * queryEntitiesBySavedView - Query entities using a saved view with additional data filters
     * 
     * Executes a query against the specified entity schema using the saved view definition, optionally combined with additional filters. Returns the entities matching the composed query.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.QueryEntitiesBySavedView.PathParameters> | null,
      data?: Paths.QueryEntitiesBySavedView.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryEntitiesBySavedView.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type DataManagementFilter = Components.Schemas.DataManagementFilter;
export type DataManagementFilterType = Components.Schemas.DataManagementFilterType;
