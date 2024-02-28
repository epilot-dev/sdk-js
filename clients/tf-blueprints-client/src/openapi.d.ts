/* eslint-disable */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
    namespace ApplyBlueprint {
        export interface RequestBody {
            /**
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            blueprintId?: string;
            /**
             * example:
             * example.tf
             */
            templateFilePath?: string;
        }
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace CreateBlueprint {
        export interface RequestBody {
            /**
             * example:
             * example.tf
             */
            templateFilePath?: string;
        }
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace ExportBlueprint {
        export interface RequestBody {
            resourceType?: "journey" | "product" | "price" | "tax" | "automation_flow" | "designbuilder" | "file" | "emailtemplate" | "entity";
            resourceIds?: [
                string,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
        }
        namespace Responses {
            export interface $200 {
                message?: string;
                resources?: string[];
                templateFilePath?: string;
            }
        }
    }
    namespace UpdateBlueprint {
        export interface RequestBody {
            /**
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            blueprintId?: string;
            /**
             * example:
             * example.tf
             */
            templateFilePath?: string;
        }
        namespace Responses {
            export type $200 = string;
        }
    }
}

export interface OperationMethods {
  /**
   * exportBlueprint - exportBlueprint
   * 
   * Export a blueprint
   */
  'exportBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExportBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportBlueprint.Responses.$200>
  /**
   * createBlueprint - createBlueprint
   * 
   * Create a blueprint
   */
  'createBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  /**
   * updateBlueprint - updateBlueprint
   * 
   * Update a blueprint
   */
  'updateBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
  /**
   * applyBlueprint - applyBlueprint
   * 
   * Apply blueprint from generated plan
   */
  'applyBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApplyBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyBlueprint.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/exportBlueprint']: {
    /**
     * exportBlueprint - exportBlueprint
     * 
     * Export a blueprint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExportBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportBlueprint.Responses.$200>
  }
  ['/v2/createBlueprint']: {
    /**
     * createBlueprint - createBlueprint
     * 
     * Create a blueprint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  }
  ['/v2/updateBlueprint']: {
    /**
     * updateBlueprint - updateBlueprint
     * 
     * Update a blueprint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
  }
  ['/v2/applyBlueprint']: {
    /**
     * applyBlueprint - applyBlueprint
     * 
     * Apply blueprint from generated plan
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApplyBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyBlueprint.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
