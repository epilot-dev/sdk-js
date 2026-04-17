/* Auto-copied from configuration-hub-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type ConfigId = string;
        export type ConfigType = /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        Schemas.ResourceType;
        export type CursorParam = string;
        export type SizeParam = number;
    }
    export interface PathParameters {
        ConfigType?: Parameters.ConfigType;
        ConfigId?: Parameters.ConfigId;
    }
    export interface QueryParameters {
        CursorParam?: Parameters.CursorParam;
        SizeParam?: Parameters.SizeParam;
    }
    namespace Schemas {
        /**
         * Cursor-paginated list of configs referenced by a given config
         */
        export interface ConfigDependenciesResponse {
            /**
             * Total number of dependencies found (if known)
             */
            total?: number;
            /**
             * Cursor for fetching the next page. Absent when no more pages.
             */
            next_cursor?: string;
            results: /* Summary metadata for a single configuration item in the tree */ ConfigNode[];
        }
        /**
         * Cursor-paginated list of configs for a specific type
         */
        export interface ConfigListResponse {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            label: string;
            icon: string;
            /**
             * Total number of configs of this type (if known)
             */
            total?: number;
            /**
             * Cursor for fetching the next page. Absent when no more pages.
             */
            next_cursor?: string;
            items: /* Summary metadata for a single configuration item in the tree */ ConfigNode[];
        }
        /**
         * Summary metadata for a single configuration item in the tree
         */
        export interface ConfigNode {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Unique identifier
             */
            id: string;
            /**
             * Display name
             */
            title: string;
            /**
             * Last modified timestamp
             */
            updated_at?: string; // date-time
            /**
             * User who last modified this config
             */
            updated_by?: string;
            /**
             * Tags / labels
             */
            tags?: string[];
            /**
             * Business purposes
             */
            purposes?: string[];
            /**
             * Direct link to open this config in epilot
             */
            link?: string; // uri
        }
        /**
         * Static metadata for a config type folder in the tree.
         * No downstream API calls — just type + label + icon + source API info.
         *
         */
        export interface ConfigTypeInfo {
            type: /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            ResourceType;
            /**
             * Display label
             * example:
             * Journeys
             */
            label: string;
            /**
             * Frontend icon name
             * example:
             * Route
             */
            icon: string;
            /**
             * Base URL of the epilot API that owns this resource type
             * example:
             * https://journey.sls.epilot.io
             */
            source_api: string;
            /**
             * @epilot/sdk subpath for fetching full config payloads
             * example:
             * @epilot/sdk/journey
             */
            sdk_client: string;
        }
        export interface ErrorResponse {
            status: number;
            error: string;
        }
        /**
         * Result of an index rebuild operation
         */
        export interface IndexRebuildResponse {
            status: "ready" | "building" | "failed" | "already_building";
            last_built_at?: string; // date-time
            total_items?: number;
            build_duration_ms?: number;
            failed_types?: string[];
        }
        /**
         * Configuration resource type identifier.
         * Matches blueprint-manifest-api V3 naming conventions.
         *
         */
        export type ResourceType = "journey" | "automation_flow" | "workflow_definition" | "closing_reason" | "flow_template" | "schema" | "emailtemplate" | "product" | "price" | "tax" | "coupon" | "file" | "webhook" | "saved_view" | "dashboard" | "kanban" | "role" | "usergroup" | "validation_rule" | "integration" | "app" | "designbuilder" | "notification_template" | "custom_variable" | "environment_variable" | "taxonomy" | "taxonomy_classification" | "entity_mapping" | "portal_config" | "target" | "product_recommendation";
    }
}
export declare namespace Paths {
    namespace GetConfigDependencies {
        namespace Parameters {
            export type Cursor = string;
            export type Id = string;
            export type Size = number;
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
        }
        export interface PathParameters {
            type: Parameters.Type;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of configs referenced by a given config */ Components.Schemas.ConfigDependenciesResponse;
            export type $404 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListConfigTypes {
        namespace Responses {
            export interface $200 {
                results: /**
                 * Static metadata for a config type folder in the tree.
                 * No downstream API calls — just type + label + icon + source API info.
                 *
                 */
                Components.Schemas.ConfigTypeInfo[];
            }
        }
    }
    namespace ListConfigs {
        namespace Parameters {
            export type Cursor = string;
            export type Purposes = string;
            export type Q = string;
            export type Size = number;
            export type Type = /**
             * Configuration resource type identifier.
             * Matches blueprint-manifest-api V3 naming conventions.
             *
             */
            Components.Schemas.ResourceType;
            export type UpdatedAfter = string; // date-time
            export type UpdatedBefore = string; // date-time
        }
        export interface PathParameters {
            type: Parameters.Type;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            q?: Parameters.Q;
            updated_after?: Parameters.UpdatedAfter /* date-time */;
            updated_before?: Parameters.UpdatedBefore /* date-time */;
            purposes?: Parameters.Purposes;
        }
        namespace Responses {
            export type $200 = /* Cursor-paginated list of configs for a specific type */ Components.Schemas.ConfigListResponse;
            export type $400 = Components.Schemas.ErrorResponse;
        }
    }
    namespace RebuildIndex {
        namespace Responses {
            export type $200 = /* Result of an index rebuild operation */ Components.Schemas.IndexRebuildResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * listConfigTypes - listConfigTypes
   * 
   * Returns the static list of available configuration types with display metadata.
   * This is a cheap call — no fan-out to downstream APIs. Returns all known types
   * with labels and icons. The frontend should then call `listConfigs` separately
   * for each type it wants to load.
   * 
   */
  'listConfigTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigTypes.Responses.$200>
  /**
   * listConfigs - listConfigs
   * 
   * List configs of a given type with pagination. Returns summary metadata only
   * (not full payloads). The frontend calls this per type folder when expanding.
   * 
   * Supports offset-based pagination via `from` and `size` parameters.
   * 
   */
  'listConfigs'(
    parameters?: Parameters<Paths.ListConfigs.QueryParameters & Paths.ListConfigs.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConfigs.Responses.$200>
  /**
   * getConfigDependencies - getConfigDependencies
   * 
   * Get configs that are referenced by the given config.
   * Used to render children when expanding a config node in the tree.
   * 
   * Resolves dependencies by fetching the config payload server-side and scanning
   * for references (UUIDs, source IDs, slug-based references).
   * 
   */
  'getConfigDependencies'(
    parameters?: Parameters<Paths.GetConfigDependencies.QueryParameters & Paths.GetConfigDependencies.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigDependencies.Responses.$200>
  /**
   * rebuildIndex - rebuildIndex
   * 
   * Rebuild the configuration index for the caller's organization.
   * Calls all adapter APIs in parallel and stores results in DynamoDB.
   * If a build is already in progress (within 60s), returns immediately.
   * 
   */
  'rebuildIndex'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RebuildIndex.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/configs/types']: {
    /**
     * listConfigTypes - listConfigTypes
     * 
     * Returns the static list of available configuration types with display metadata.
     * This is a cheap call — no fan-out to downstream APIs. Returns all known types
     * with labels and icons. The frontend should then call `listConfigs` separately
     * for each type it wants to load.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigTypes.Responses.$200>
  }
  ['/v1/configs/{type}']: {
    /**
     * listConfigs - listConfigs
     * 
     * List configs of a given type with pagination. Returns summary metadata only
     * (not full payloads). The frontend calls this per type folder when expanding.
     * 
     * Supports offset-based pagination via `from` and `size` parameters.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConfigs.QueryParameters & Paths.ListConfigs.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConfigs.Responses.$200>
  }
  ['/v1/configs/{type}/{id}/dependencies']: {
    /**
     * getConfigDependencies - getConfigDependencies
     * 
     * Get configs that are referenced by the given config.
     * Used to render children when expanding a config node in the tree.
     * 
     * Resolves dependencies by fetching the config payload server-side and scanning
     * for references (UUIDs, source IDs, slug-based references).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigDependencies.QueryParameters & Paths.GetConfigDependencies.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigDependencies.Responses.$200>
  }
  ['/v1/index/rebuild']: {
    /**
     * rebuildIndex - rebuildIndex
     * 
     * Rebuild the configuration index for the caller's organization.
     * Calls all adapter APIs in parallel and stores results in DynamoDB.
     * If a build is already in progress (within 60s), returns immediately.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RebuildIndex.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ConfigDependenciesResponse = Components.Schemas.ConfigDependenciesResponse;
export type ConfigListResponse = Components.Schemas.ConfigListResponse;
export type ConfigNode = Components.Schemas.ConfigNode;
export type ConfigTypeInfo = Components.Schemas.ConfigTypeInfo;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type IndexRebuildResponse = Components.Schemas.IndexRebuildResponse;
export type ResourceType = Components.Schemas.ResourceType;
