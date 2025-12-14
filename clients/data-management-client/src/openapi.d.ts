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
            id?: string;
            /**
             * Type of configuration. Currently only 'deletion' is supported.
             */
            type?: /* Type of configuration (e.g. deletion) */ ConfigType;
            entity_schema?: string;
            query?: QueryConfig;
            schedule?: ConfigSchedule;
            enabled?: boolean;
            created_at?: string; // date-time
            last_updated_at?: string; // date-time
            next_run_at?: string; // date-time
        }
        export type ConfigSchedule = DailyConfigSchedule | WeeklyConfigSchedule | MonthlyConfigSchedule;
        /**
         * Type of configuration (e.g. deletion)
         */
        export type ConfigType = "deletion";
        export interface DailyConfigSchedule {
            frequency: "daily";
            start_date?: string; // date
            end_date?: string; // date
        }
        export interface ListConfigsResponse {
            configs?: Config[];
            cursor?: string | null;
        }
        export interface MonthlyConfigSchedule {
            frequency: "monthly";
            /**
             * Day of month on which the rule runs
             */
            day_of_month: number;
            start_date?: string; // date
            end_date?: string; // date
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
            lookback_period_months?: number;
        }
        export type QueryFilterType = "entity_workflows_only_in_closed_or_cancelled_status" | "no_related_entities" | "related_entities_all_in_closed_or_cancelled_status" | "related_entities_any_in_closed_or_cancelled_status" | "no_email_communication_since";
        export interface UpsertConfigRequest {
            type: /* Type of configuration (e.g. deletion) */ ConfigType;
            query: QueryConfig;
            schedule: ConfigSchedule;
            /**
             * Whether this configuration is active
             */
            enabled?: boolean;
        }
        export interface WeeklyConfigSchedule {
            frequency: "weekly";
            /**
             * Day of week when the rule runs
             */
            day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
            start_date?: string; // date
            end_date?: string; // date
        }
    }
}
declare namespace Paths {
    namespace ListConfigs {
        namespace Parameters {
            export type Cursor = string;
            export type EntitySchema = string;
            export type Limit = number;
            export type Type = /* Type of configuration (e.g. deletion) */ Components.Schemas.ConfigType;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
            entity_schema?: Parameters.EntitySchema;
            type?: Parameters.Type;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListConfigsResponse;
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Config = Components.Schemas.Config;
export type ConfigSchedule = Components.Schemas.ConfigSchedule;
export type ConfigType = Components.Schemas.ConfigType;
export type DailyConfigSchedule = Components.Schemas.DailyConfigSchedule;
export type ListConfigsResponse = Components.Schemas.ListConfigsResponse;
export type MonthlyConfigSchedule = Components.Schemas.MonthlyConfigSchedule;
export type QueryConfig = Components.Schemas.QueryConfig;
export type QueryEntitiesRequest = Components.Schemas.QueryEntitiesRequest;
export type QueryEntitiesResult = Components.Schemas.QueryEntitiesResult;
export type QueryFilter = Components.Schemas.QueryFilter;
export type QueryFilterType = Components.Schemas.QueryFilterType;
export type UpsertConfigRequest = Components.Schemas.UpsertConfigRequest;
export type WeeklyConfigSchedule = Components.Schemas.WeeklyConfigSchedule;
