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
            created_at?: string; // date-time
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
            created_at?: string; // date-time
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
        export interface SandboxRequest {
            /**
             * Unique identifier for the request
             * example:
             * 12345
             */
            id?: string;
            /**
             * The user who made the request
             * example:
             * John Doe
             */
            fullname: string;
            /**
             * The company name of the user who made the request
             * example:
             * Company Name
             */
            company_name: string;
            /**
             * The position of the user who made the request
             * example:
             * Software Engineer
             */
            position: string;
            /**
             * The email of the user who made the request
             * example:
             * user@example.com
             */
            email: string; // email
            /**
             * The usecase for the request
             * example:
             * Build a payment integration
             */
            sandbox_usecase: string;
            /**
             * The status of the request
             * example:
             * pending
             */
            status?: "pending" | "created" | "rejected";
            /**
             * Whether the user is in contact with an existing epilot customer
             */
            connected_to_existing_epilot_customer: boolean;
            /**
             * The time the request was made
             * example:
             * 2022-01-01T00:00:00Z
             */
            requested_at?: string; // date-time
            /**
             * The category of the sandbox requested
             */
            sandbox_request_category?: "APP_DEVELOPER_ACCOUNT" | "BLUEPRINT_SANDBOX" | "OTHER";
        }
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
    namespace ListSandboxRequests {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.SandboxRequest[];
                /**
                 * example:
                 * 1
                 */
                total?: number;
            }
        }
    }
    namespace RequestSandbox {
        export type RequestBody = Components.Schemas.SandboxRequest;
        namespace Responses {
            export type $201 = Components.Schemas.SandboxRequest;
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
  /**
   * requestSandbox - requestSandbox
   * 
   * Request a sandbox account for a user
   */
  'requestSandbox'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequestSandbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestSandbox.Responses.$201>
  /**
   * listSandboxRequests - listSandboxRequests
   * 
   * List sandbox requests from users
   */
  'listSandboxRequests'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSandboxRequests.Responses.$200>
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
  ['/v1/sandbox:request']: {
    /**
     * requestSandbox - requestSandbox
     * 
     * Request a sandbox account for a user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequestSandbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestSandbox.Responses.$201>
  }
  ['/v1/sandbox/requests']: {
    /**
     * listSandboxRequests - listSandboxRequests
     * 
     * List sandbox requests from users
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSandboxRequests.Responses.$200>
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
export type SandboxRequest = Components.Schemas.SandboxRequest;
export type SandboxToken = Components.Schemas.SandboxToken;
