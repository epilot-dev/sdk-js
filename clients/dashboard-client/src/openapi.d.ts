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
         * Adashboard configuration with tiles
         */
        export interface Dashboard {
            id?: /**
             * Unique identifier for dashboard
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            DashboardID /* uuid */;
            /**
             * example:
             * Employee Dashboard
             */
            title: string;
            /**
             * example:
             * [
             *   {
             *     "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
             *     "coordinates": {},
             *     "visualisation": "timechart",
             *     "visualisation_config": {
             *       "query": {
             *         "dataset": "entity_operations",
             *         "measure": "count_operations",
             *         "filters": [
             *           {
             *             "operation": [
             *               "createEntity"
             *             ]
             *           },
             *           {
             *             "entity_schema": [
             *               "opportunity"
             *             ]
             *           }
             *         ],
             *         "dimensions": [
             *           {
             *             "time_with_granularity": "month"
             *           },
             *           {
             *             "entity_attribute": "source.title"
             *           }
             *         ]
             *       },
             *       "options": {
             *         "type": "line"
             *       }
             *     }
             *   }
             * ]
             */
            tiles: DashboardTile[];
        }
        /**
         * Unique identifier for dashboard
         * example:
         * 3fa85f64-5717-4562-b3fc-2c963f66afa6
         */
        export type DashboardID = string; // uuid
        export interface DashboardTile {
            id?: /**
             * Unique identifier for a tile in a dashboard
             * example:
             * e4af1297-1fd6-440f-9846-f475f580d40f
             */
            DashboardTileID /* uuid */;
            coordinates?: {
                [key: string]: any;
            };
            /**
             * example:
             * Number of opportunities created by journeys every month
             */
            title?: string;
            visualisation_id?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            visualisation_config?: VisualisationConfig;
        }
        /**
         * Unique identifier for a tile in a dashboard
         * example:
         * e4af1297-1fd6-440f-9846-f475f580d40f
         */
        export type DashboardTileID = string; // uuid
        export interface DatalakeQuery {
            [name: string]: any;
            /**
             * example:
             * entity_operations
             */
            dataset?: string;
            /**
             * example:
             * count_operations
             */
            measure?: string;
            dimensions?: {
                [name: string]: any;
            }[];
            filters?: {
                [name: string]: any;
            }[];
        }
        export interface Example {
            id?: /**
             * Unique identifier for a visualisation examples for tiles in a dashboard
             * example:
             * e4af1297-1fd6-440f-9846-f475f580d40f
             */
            ExampleID /* uuid */;
            /**
             * example:
             * Number of opportunities created by journeys every month
             */
            title?: string;
            visualisation?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            query?: DatalakeQuery;
        }
        /**
         * Unique identifier for a visualisation examples for tiles in a dashboard
         * example:
         * e4af1297-1fd6-440f-9846-f475f580d40f
         */
        export type ExampleID = string; // uuid
        export interface TimechartVisualisationConfig {
            query?: DatalakeQuery;
            /**
             * example:
             * {
             *   "type": "bar"
             * }
             */
            options?: {
                [name: string]: any;
            };
        }
        /**
         * A Visualisation that can be used to configure tiles in dashboards
         */
        export interface Visualisation {
            visualisation?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            /**
             * example:
             * Time Series Visualisation
             */
            title?: string;
            description?: string;
            /**
             * Package name of the Visualisation MFE bundle to import
             * example:
             * @epilot360/highcharts
             */
            package_name?: string;
            /**
             * URL to Visualisation MFE bundle to import
             * example:
             * https://epilot-dashboard-visualisations.epilot.io/epilot360-datalake-visualisation/bundle.js?version=1650592827
             */
            import_url?: string; // uri
        }
        export type VisualisationConfig = TimechartVisualisationConfig;
        /**
         * Unique identifier for a Visualisation
         * example:
         * timechart
         */
        export type VisualisationId = "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow";
    }
}
declare namespace Paths {
    namespace CreateDashboard {
        export type RequestBody = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        namespace Responses {
            export type $201 = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        }
    }
    namespace DeleteDashboard {
        namespace Responses {
            export type $200 = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        }
    }
    namespace GetDashboard {
        namespace Responses {
            export type $200 = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        }
    }
    namespace ListAvailableExamples {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.Example[];
            }
        }
    }
    namespace ListAvailableVisualisations {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   {
                 *     "visualisation": "timechart",
                 *     "title": "Time Series Visualisation",
                 *     "description": "Visualise your metrics with respect to time series",
                 *     "package_name": "@epilot360/highcharts"
                 *   },
                 *   {
                 *     "visualisation": "kpi",
                 *     "title": "KPI Visualisation",
                 *     "description": "Visualise your key performance indicators",
                 *     "package_name": "@epilot360/kpi"
                 *   }
                 * ]
                 */
                results?: /* A Visualisation that can be used to configure tiles in dashboards */ Components.Schemas.Visualisation[];
            }
        }
    }
    namespace ListDashboards {
        namespace Responses {
            export interface $200 {
                results?: /* Adashboard configuration with tiles */ Components.Schemas.Dashboard[];
            }
        }
    }
    namespace PutDashboard {
        export type RequestBody = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        namespace Responses {
            export type $200 = /* Adashboard configuration with tiles */ Components.Schemas.Dashboard;
        }
    }
    namespace V1DashboardDashboards$Id {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for dashboard
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            Components.Schemas.DashboardID /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
}


export interface OperationMethods {
  /**
   * listDashboards - listDashboards
   * 
   * List dashboards available to the user
   */
  'listDashboards'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDashboards.Responses.$200>
  /**
   * createDashboard - createDashboard
   * 
   * Create new dashboard
   */
  'createDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDashboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDashboard.Responses.$201>
  /**
   * getDashboard - getDashboard
   * 
   * Get dashboard by ID
   */
  'getDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboard.Responses.$200>
  /**
   * putDashboard - putDashboard
   * 
   * Update a dashboard by ID
   */
  'putDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: Paths.PutDashboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutDashboard.Responses.$200>
  /**
   * deleteDashboard - deleteDashboard
   * 
   * Delete a dashboard by ID
   */
  'deleteDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDashboard.Responses.$200>
  /**
   * listAvailableVisualisations - listAvailableVisualisations
   * 
   * Returns list of available Visualisations to configure new dashboard tiles
   */
  'listAvailableVisualisations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAvailableVisualisations.Responses.$200>
  /**
   * listAvailableExamples - listAvailableExamples
   * 
   * Returns list of available exampless for visualisations to configure new dashboard tiles
   */
  'listAvailableExamples'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAvailableExamples.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/dashboard/dashboards']: {
    /**
     * listDashboards - listDashboards
     * 
     * List dashboards available to the user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDashboards.Responses.$200>
    /**
     * createDashboard - createDashboard
     * 
     * Create new dashboard
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDashboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDashboard.Responses.$201>
  }
  ['/v1/dashboard/dashboards/{id}']: {
    /**
     * getDashboard - getDashboard
     * 
     * Get dashboard by ID
     */
    'get'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboard.Responses.$200>
    /**
     * putDashboard - putDashboard
     * 
     * Update a dashboard by ID
     */
    'put'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: Paths.PutDashboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutDashboard.Responses.$200>
    /**
     * deleteDashboard - deleteDashboard
     * 
     * Delete a dashboard by ID
     */
    'delete'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDashboard.Responses.$200>
  }
  ['/v1/dashboard/visualisations']: {
    /**
     * listAvailableVisualisations - listAvailableVisualisations
     * 
     * Returns list of available Visualisations to configure new dashboard tiles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAvailableVisualisations.Responses.$200>
  }
  ['/v1/dashboard/examples']: {
    /**
     * listAvailableExamples - listAvailableExamples
     * 
     * Returns list of available exampless for visualisations to configure new dashboard tiles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAvailableExamples.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Dashboard = Components.Schemas.Dashboard;
export type DashboardID = Components.Schemas.DashboardID;
export type DashboardTile = Components.Schemas.DashboardTile;
export type DashboardTileID = Components.Schemas.DashboardTileID;
export type DatalakeQuery = Components.Schemas.DatalakeQuery;
export type Example = Components.Schemas.Example;
export type ExampleID = Components.Schemas.ExampleID;
export type timechartVisualisationConfig = Components.Schemas.TimechartVisualisationConfig;
export type Visualisation = Components.Schemas.Visualisation;
export type VisualisationConfig = Components.Schemas.VisualisationConfig;
export type VisualisationId = Components.Schemas.VisualisationId;
