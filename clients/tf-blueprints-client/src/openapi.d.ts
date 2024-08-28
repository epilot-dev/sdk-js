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
        export interface InstalledPatchItem {
            blueprintId?: string;
            stateFileRef?: string;
        }
        export interface Job {
            job_status?: JobStatus;
            job_id?: string;
            message?: string;
            timestamp?: string; // date-time
            /**
             * A URL to download the plan file
             */
            plan_file_content?: string;
            /**
             * A tree-like JSON object representing the resources to export
             */
            resources_to_export?: ResourceNode;
            /**
             * A tree-like JSON object representing the resources to import
             */
            resources_to_import?: ResourceNode;
            /**
             * A tree-like JSON object representing the imported resources
             */
            imported_resources?: ResourceNode;
        }
        export type JobStatus = "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
        export interface ResourceNode {
            id: string;
            type: string;
            name?: string;
            source_id?: string;
            dependencies?: ResourceNode[];
        }
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
            manifestFilePath?: string;
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
            manifestFilePath?: string;
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
            /**
             * A tree-like JSON object representing the resources to export
             * example:
             * {
             *   "id": "4854bb2a-94f9-424d-a968-3fb17fb0bf89",
             *   "type": "journey",
             *   "name": "House Connection Journey",
             *   "dependencies": [
             *     {
             *       "id": "4854bb2a-94f9-424d-a968-3fb17fb0bf89",
             *       "type": "product",
             *       "name": "Solar Panel",
             *       "dependencies": []
             *     }
             *   ]
             * }
             *
             */
            resourcesToExport?: {
                [key: string]: any;
            };
            /**
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            exportedBlueprintId?: string;
            /**
             * example:
             * journey_HouseConnectionJourney
             */
            resourceName?: string;
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
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Job;
        }
    }
    namespace GetExportResources {
        export interface RequestBody {
            resourceType?: "journey" | "product" | "price" | "tax" | "automation_flow" | "designbuilder" | "file" | "emailtemplate" | "entity" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "workflow_definition" | "closing_reason" | "taxonomy_classification";
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
    namespace ListInstalledPatches {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.InstalledPatchItem[];
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
            manifestFilePath?: string;
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
   * listInstalledPatches - listInstalledPatches
   * 
   * Get the list of installed patches for org
   */
  'listInstalledPatches'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledPatches.Responses.$200>
  /**
   * getExportResources - getExportResources
   * 
   * Get the resources to export
   */
  'getExportResources'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetExportResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExportResources.Responses.$200>
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
  ['/v2/blueprint/listInstalledPatches']: {
    /**
     * listInstalledPatches - listInstalledPatches
     * 
     * Get the list of installed patches for org
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledPatches.Responses.$200>
  }
  ['/v2/getExportResources']: {
    /**
     * getExportResources - getExportResources
     * 
     * Get the resources to export
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetExportResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExportResources.Responses.$200>
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
