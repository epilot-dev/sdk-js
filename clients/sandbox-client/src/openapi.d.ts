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
        /**
         * An epilot access token
         * example:
         * eyJhbGciOiJIUzI1NiIs...
         */
        export type AccessToken = string;
        export interface CreatePipelineRequest {
            pipeline_role: /* The role of the other organization in the pipeline from the perspective of the caller's organization */ PipelineRole;
            api_token: /**
             * An API token generated from the sandbox org
             * example:
             * eyJhbGciOiJIUzI1NiIs...
             */
            SandboxToken;
        }
        /**
         * Epilot Tenant Organization ID
         * example:
         * 54321
         */
        export type OrgId = string;
        export interface Pipeline {
            pipeline_role?: /* The role of the other organization in the pipeline from the perspective of the caller's organization */ PipelineRole;
            pipeline_id?: /**
             * Unique identifier for a pipeline.
             *
             * The format for a pipeline is: `<sandbox_org>::<production_org>`
             *
             * example:
             * 12345::54321
             */
            PipelineId;
            /**
             * Epilot Tenant Organization ID
             * example:
             * 12345
             */
            sandbox_org_id?: string;
            /**
             * example:
             * Sandbox
             */
            sandbox_org_name?: string;
            production_org_id?: /**
             * Epilot Tenant Organization ID
             * example:
             * 54321
             */
            OrgId;
            /**
             * example:
             * Production
             */
            production_org_name?: string;
        }
        /**
         * Unique identifier for a pipeline.
         *
         * The format for a pipeline is: `<sandbox_org>::<production_org>`
         *
         * example:
         * 12345::54321
         */
        export type PipelineId = string;
        export interface PipelineItem {
            pipeline_id?: /**
             * Unique identifier for a pipeline.
             *
             * The format for a pipeline is: `<sandbox_org>::<production_org>`
             *
             * example:
             * 12345::54321
             */
            PipelineId;
            /**
             * Epilot Tenant Organization ID
             * example:
             * 12345
             */
            sandbox_org_id?: string;
            /**
             * example:
             * Sandbox
             */
            sandbox_org_name?: string;
            production_org_id?: /**
             * Epilot Tenant Organization ID
             * example:
             * 54321
             */
            OrgId;
            /**
             * example:
             * Production
             */
            production_org_name?: string;
        }
        /**
         * The role of the other organization in the pipeline from the perspective of the caller's organization
         */
        export type PipelineRole = "sandbox" | "production";
        /**
         * A temporary access token
         * example:
         * eyJhbGciOiJIUzI1NiIs...
         */
        export type PipelineToken = string;
        /**
         * An API token generated from the sandbox org
         * example:
         * eyJhbGciOiJIUzI1NiIs...
         */
        export type SandboxToken = string;
    }
}
declare namespace Paths {
    namespace CreatePipeline {
        export type RequestBody = Components.Schemas.CreatePipelineRequest;
        namespace Responses {
            export type $201 = Components.Schemas.Pipeline;
        }
    }
    namespace DeletePipeline {
        namespace Parameters {
            export type PipelineId = /**
             * Unique identifier for a pipeline.
             *
             * The format for a pipeline is: `<sandbox_org>::<production_org>`
             *
             * example:
             * 12345::54321
             */
            Components.Schemas.PipelineId;
        }
        export interface PathParameters {
            pipeline_id: Parameters.PipelineId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pipeline;
        }
    }
    namespace GeneratePipelineToken {
        namespace Parameters {
            export type PipelineId = /**
             * Unique identifier for a pipeline.
             *
             * The format for a pipeline is: `<sandbox_org>::<production_org>`
             *
             * example:
             * 12345::54321
             */
            Components.Schemas.PipelineId;
        }
        export interface PathParameters {
            pipeline_id: Parameters.PipelineId;
        }
        namespace Responses {
            export interface $200 {
                pipeline_token?: /**
                 * A temporary access token
                 * example:
                 * eyJhbGciOiJIUzI1NiIs...
                 */
                Components.Schemas.PipelineToken;
            }
        }
    }
    namespace GetPipeline {
        namespace Parameters {
            export type PipelineId = /**
             * Unique identifier for a pipeline.
             *
             * The format for a pipeline is: `<sandbox_org>::<production_org>`
             *
             * example:
             * 12345::54321
             */
            Components.Schemas.PipelineId;
        }
        export interface PathParameters {
            pipeline_id: Parameters.PipelineId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pipeline;
        }
    }
    namespace ListPipelines {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.Pipeline[];
                /**
                 * example:
                 * 1
                 */
                total?: number;
            }
        }
    }
}

export interface OperationMethods {
  /**
   * listPipelines - listPipelines
   * 
   * List pipelines the current organization is part of
   */
  'listPipelines'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPipelines.Responses.$200>
  /**
   * createPipeline - createPipeline
   * 
   * Create a new pipeline by passing an api token from another organization.
   * 
   * Note: The API token should have administrator role access for the other org.
   * 
   */
  'createPipeline'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePipeline.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePipeline.Responses.$201>
  /**
   * getPipeline - getPipeline
   * 
   * Get pipeline by ID
   */
  'getPipeline'(
    parameters?: Parameters<Paths.GetPipeline.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPipeline.Responses.$200>
  /**
   * deletePipeline - deletePipeline
   * 
   * Delete a pipeline by ID
   */
  'deletePipeline'(
    parameters?: Parameters<Paths.DeletePipeline.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePipeline.Responses.$200>
  /**
   * generatePipelineToken - generatePipelineToken
   * 
   * Generate a temporary pipeline access token to access the other org from the pipeline
   */
  'generatePipelineToken'(
    parameters?: Parameters<Paths.GeneratePipelineToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneratePipelineToken.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/sandbox/pipelines']: {
    /**
     * listPipelines - listPipelines
     * 
     * List pipelines the current organization is part of
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPipelines.Responses.$200>
    /**
     * createPipeline - createPipeline
     * 
     * Create a new pipeline by passing an api token from another organization.
     * 
     * Note: The API token should have administrator role access for the other org.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePipeline.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePipeline.Responses.$201>
  }
  ['/v1/sandbox/pipelines/{pipeline_id}']: {
    /**
     * getPipeline - getPipeline
     * 
     * Get pipeline by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetPipeline.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPipeline.Responses.$200>
    /**
     * deletePipeline - deletePipeline
     * 
     * Delete a pipeline by ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePipeline.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePipeline.Responses.$200>
  }
  ['/v1/sandbox/pipelines/{pipeline_id}/token']: {
    /**
     * generatePipelineToken - generatePipelineToken
     * 
     * Generate a temporary pipeline access token to access the other org from the pipeline
     */
    'get'(
      parameters?: Parameters<Paths.GeneratePipelineToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneratePipelineToken.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AccessToken = Components.Schemas.AccessToken;
export type CreatePipelineRequest = Components.Schemas.CreatePipelineRequest;
export type OrgId = Components.Schemas.OrgId;
export type Pipeline = Components.Schemas.Pipeline;
export type PipelineId = Components.Schemas.PipelineId;
export type PipelineItem = Components.Schemas.PipelineItem;
export type PipelineRole = Components.Schemas.PipelineRole;
export type PipelineToken = Components.Schemas.PipelineToken;
export type SandboxToken = Components.Schemas.SandboxToken;