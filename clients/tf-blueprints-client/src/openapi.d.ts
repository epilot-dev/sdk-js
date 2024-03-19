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
        export interface Progress {
            job_status?: ProgressStatus;
            job_id?: string;
            message?: string;
            time_stamp?: string; // date-time
        }
        export type ProgressStatus = "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
        export interface S3Reference {
            /**
             * example:
             * epilot-dev-blueprints
             */
            bucket?: string;
            /**
             * example:
             * templates/main.tf
             */
            key?: string;
        }
        export interface UploadFilePayload {
            /**
             * example:
             * main.tf
             */
            filename: string;
            /**
             * MIME type of file
             * example:
             * application/pdf
             */
            mime_type?: string;
        }
    }
}
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
            export interface $200 {
                /**
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                blueprintId?: string;
            }
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
                /**
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                blueprintId?: string;
            }
        }
    }
    namespace GetBlueprintStatus {
        namespace Parameters {
            export type BlueprintId = string;
        }
        export interface PathParameters {
            blueprintId: Parameters.BlueprintId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Progress;
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
    namespace UploadBlueprintTemplate {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * example:
                 * https://epilot-dev-blueprints.s3.eu-central-1.amazonaws.com/templates/document.pdf
                 */
                upload_url?: string; // url
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getBlueprintStatus - getBlueprintStatus
   * 
   * Get the current status of a blueprint (export or import)
   */
  'getBlueprintStatus'(
    parameters?: Parameters<Paths.GetBlueprintStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprintStatus.Responses.$200>
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
   * uploadBlueprintTemplate - uploadBlueprintTemplate
   * 
   * Create pre-signed S3 URL to upload a file.
   * 
   */
  'uploadBlueprintTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadBlueprintTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadBlueprintTemplate.Responses.$201>
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
  ['/v2/blueprint/{id}/status']: {
    /**
     * getBlueprintStatus - getBlueprintStatus
     * 
     * Get the current status of a blueprint (export or import)
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprintStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprintStatus.Responses.$200>
  }
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
  ['/v2/uploadBlueprintTemplate']: {
    /**
     * uploadBlueprintTemplate - uploadBlueprintTemplate
     * 
     * Create pre-signed S3 URL to upload a file.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadBlueprintTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadBlueprintTemplate.Responses.$201>
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
