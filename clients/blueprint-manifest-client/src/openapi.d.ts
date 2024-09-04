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
        export type JobID = /**
         * ID of an import or export job
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        Schemas.JobID;
    }
    export interface PathParameters {
        JobID?: Parameters.JobID;
    }
    namespace Schemas {
        export interface Job {
            job_status?: JobStatus;
            job_id?: /**
             * ID of an import or export job
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            message?: string;
            timestamp?: string; // date-time
            /**
             * An URL to download the plan file
             */
            plan_file_content?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_export?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ ResourceNode[] | ResourceNode;
            /**
             * An URL to download the resources to export when the resources are too large to be included in the response
             */
            large_resources_to_export_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_import?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ ResourceNode[] | ResourceNode;
            /**
             * An URL to download the resources to import when the resources are too large to be included in the response
             */
            large_resources_to_import_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ ResourceNode[] | ResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             */
            large_imported_resources_url?: string;
            markdown?: {
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
        }
        /**
         * ID of an import or export job
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        export type JobID = string;
        export type JobStatus = "STARTED" | "WAITING_USER_ACTION" | "CANCELLED" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
        export interface ResourceNode {
            id: string;
            type: ResourceNodeType;
            name?: string;
            source_id?: string;
            address?: string;
            dependencies?: ResourceNode[];
            changes?: ("create" | "update" | "no-op" | "delete")[];
        }
        export type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "workflow_definition" | "closing_reason" | "taxonomy_classification";
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
    namespace ApplyPlan {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
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
    namespace CreateExport {
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
                jobId?: /**
                 * ID of an import or export job
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace CreatePlan {
        export interface RequestBody {
            /**
             * Path to the manifest file uploaded via `uploadManifest`
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
                jobId?: string;
            }
        }
    }
    namespace ExportManifest {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * An array of resource IDs to export
             */
            selectedResourceIds?: string[];
            /**
             * example:
             * journey_HouseConnectionJourney
             */
            resourceName?: string;
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace GetJob {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Job;
        }
    }
    namespace UploadManifest {
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
   * getJob - getJob
   * 
   * Get the current status of a blueprint (export or import)
   */
  'getJob'(
    parameters?: Parameters<Paths.GetJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJob.Responses.$200>
  /**
   * createExport - createExport
   * 
   * Creates a new Export Job with a list of available resources to export from the passed root resource.
   * 
   */
  'createExport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExport.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExport.Responses.$200>
  /**
   * exportManifest - exportManifest
   * 
   * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
   */
  'exportManifest'(
    parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
    data?: Paths.ExportManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportManifest.Responses.$200>
  /**
   * uploadManifest - uploadManifest
   * 
   * Create pre-signed S3 URL to upload a manifest file.
   * 
   */
  'uploadManifest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadManifest.Responses.$201>
  /**
   * createPlan - createPlan
   * 
   * Creates a new import job from an uploaded manifest file and returns the plan
   */
  'createPlan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePlan.Responses.$200>
  /**
   * applyPlan - applyPlan
   * 
   * Apply a plan returned by `createPlan`
   */
  'applyPlan'(
    parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
    data?: Paths.ApplyPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyPlan.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/blueprint-manifest/jobs/{job_id}']: {
    /**
     * getJob - getJob
     * 
     * Get the current status of a blueprint (export or import)
     */
    'get'(
      parameters?: Parameters<Paths.GetJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJob.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs:createExport']: {
    /**
     * createExport - createExport
     * 
     * Creates a new Export Job with a list of available resources to export from the passed root resource.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateExport.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateExport.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:exportManifest']: {
    /**
     * exportManifest - exportManifest
     * 
     * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
     */
    'post'(
      parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
      data?: Paths.ExportManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportManifest.Responses.$200>
  }
  ['/v1/blueprint-manifest:uploadManifest']: {
    /**
     * uploadManifest - uploadManifest
     * 
     * Create pre-signed S3 URL to upload a manifest file.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadManifest.Responses.$201>
  }
  ['/v1/blueprint-manifest/jobs:createPlan']: {
    /**
     * createPlan - createPlan
     * 
     * Creates a new import job from an uploaded manifest file and returns the plan
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:applyPlan']: {
    /**
     * applyPlan - applyPlan
     * 
     * Apply a plan returned by `createPlan`
     */
    'post'(
      parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
      data?: Paths.ApplyPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
