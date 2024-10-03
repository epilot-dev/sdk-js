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
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        Schemas.JobID;
    }
    export interface PathParameters {
        JobID?: Parameters.JobID;
    }
    namespace Schemas {
        export interface CommonImportFields {
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
        }
        export interface CommonManifestFields {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
        }
        export interface CommonMarkdownFields {
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
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
        export interface CommonResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            /**
             * Type of the resource
             */
            type: ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
        }
        export interface Job {
            job_id?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            job_status?: JobStatus;
            message?: string;
            timestamp?: string; // date-time
            /**
             * An URL to download the plan file
             */
            plan_file_content?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_export?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to export when the resources are too large to be included in the response
             */
            large_resources_to_export_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_import?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to import when the resources are too large to be included in the response
             */
            large_resources_to_import_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
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
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
        }
        /**
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        export type JobID = string;
        export type JobStatus = "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
        export interface Manifest {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
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
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        /**
         * ID of an imported / installed manifest
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type ManifestID = string;
        export interface ManifestItem {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export interface ManifestTimestampFields {
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export type PlanChanges = ("create" | "update" | "no-op" | "delete")[];
        export interface ResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Original ID of the exported resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: ResourceNode[] | null;
            parents?: {
                id?: string;
                type?: ResourceNodeType;
            }[];
            changes?: PlanChanges;
        }
        export type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook";
        export interface RootResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: VirtualResourceNodeGroup[] | null;
            changes?: PlanChanges;
        }
        export interface S3Reference {
            /**
             * example:
             * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
             */
            bucket: string;
            /**
             * example:
             * templates/main.tf
             */
            key: string;
        }
        export interface UploadFilePayload {
            /**
             * example:
             * example.manifest.zip
             */
            filename: string;
        }
        export interface VirtualResourceNodeGroup {
            /**
             * ID of the resource
             */
            id: string;
            type: ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: true;
            dependencies?: ResourceNode[];
        }
    }
}
declare namespace Paths {
    namespace ApplyPlan {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
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
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace CreateExport {
        export interface RequestBody {
            resourceType: Components.Schemas.ResourceNodeType;
            resourceIds: [
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
            jobId?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace CreatePlan {
        export type RequestBody = {
            /**
             * s3ref of manifest file uploaded via `uploadManifest`
             */
            s3ref: {
                /**
                 * example:
                 * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
                 */
                bucket: string;
                /**
                 * example:
                 * templates/main.tf
                 */
                key: string;
            };
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
        } | {
            /**
             * Manifest s3 key uploaded via `uploadManifest`
             */
            manifestFilePath: string;
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
        };
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
    namespace DeleteManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace ExportManifest {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
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
            selectedResourceIds: string[];
            /**
             * example:
             * journey_HouseConnectionJourney
             */
            resourceName: string;
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
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
             * ID of an import or export job (state machine)
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
    namespace GetManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace ListInstalledManifests {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.ManifestItem[];
            }
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
   * Multiple root resources can be added by calling this multiple times with the same jobId
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
   * Creates a new import job from an uploaded manifest file and returns the plan.
   * 
   * Creates an updated plan for an installed manifest when `manifest_id` is passed
   * 
   */
  'createPlan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePlan.Responses.$200>
  /**
   * applyPlan - applyPlan
   * 
   * Apply a plan returned by `createPlan`.
   */
  'applyPlan'(
    parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
    data?: Paths.ApplyPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  /**
   * listInstalledManifests - listInstalledManifests
   * 
   * List Blueprint Manifests installed to the organization
   */
  'listInstalledManifests'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  /**
   * getManifest - getManifest
   * 
   * Get installed Manifest by ID
   */
  'getManifest'(
    parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManifest.Responses.$200>
  /**
   * deleteManifest - deleteManifest
   * 
   * Remove installed manifest from the org
   * 
   * Note that this does not delete the installed resources of the Manifest!
   * 
   */
  'deleteManifest'(
    parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteManifest.Responses.$200>
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
     * Multiple root resources can be added by calling this multiple times with the same jobId
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
     * Creates a new import job from an uploaded manifest file and returns the plan.
     * 
     * Creates an updated plan for an installed manifest when `manifest_id` is passed
     * 
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
     * Apply a plan returned by `createPlan`.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
      data?: Paths.ApplyPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests']: {
    /**
     * listInstalledManifests - listInstalledManifests
     * 
     * List Blueprint Manifests installed to the organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests/{manifest_id}']: {
    /**
     * getManifest - getManifest
     * 
     * Get installed Manifest by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManifest.Responses.$200>
    /**
     * deleteManifest - deleteManifest
     * 
     * Remove installed manifest from the org
     * 
     * Note that this does not delete the installed resources of the Manifest!
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteManifest.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type CommonImportFields = Components.Schemas.CommonImportFields;
export type CommonManifestFields = Components.Schemas.CommonManifestFields;
export type CommonMarkdownFields = Components.Schemas.CommonMarkdownFields;
export type CommonResourceNode = Components.Schemas.CommonResourceNode;
export type Job = Components.Schemas.Job;
export type JobID = Components.Schemas.JobID;
export type JobStatus = Components.Schemas.JobStatus;
export type Manifest = Components.Schemas.Manifest;
export type ManifestID = Components.Schemas.ManifestID;
export type ManifestItem = Components.Schemas.ManifestItem;
export type ManifestTimestampFields = Components.Schemas.ManifestTimestampFields;
export type PlanChanges = Components.Schemas.PlanChanges;
export type ResourceNode = Components.Schemas.ResourceNode;
export type ResourceNodeType = Components.Schemas.ResourceNodeType;
export type RootResourceNode = Components.Schemas.RootResourceNode;
export type S3Reference = Components.Schemas.S3Reference;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
export type VirtualResourceNodeGroup = Components.Schemas.VirtualResourceNodeGroup;
