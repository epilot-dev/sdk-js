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
        export interface ChangeReasonStatusReq {
            status: ClosingReasonsStatus;
        }
        /**
         * One Closing reason for a workflow
         */
        export interface ClosingReason {
            id?: string;
            title: string;
            status: ClosingReasonsStatus;
            lastUpdateTime?: string;
            creationTime?: string;
        }
        export interface ClosingReasonId {
            /**
             * example:
             * x739cew
             */
            id: string;
        }
        export interface ClosingReasons {
            reasons: /* One Closing reason for a workflow */ ClosingReason[];
        }
        export interface ClosingReasonsIds {
            reasons: ClosingReasonId[];
        }
        export type ClosingReasonsStatus = "ACTIVE" | "INACTIVE";
        /**
         * Definition could be not found
         */
        export interface DefinitionNotFoundResp {
            message?: string;
        }
        /**
         * set a Duedate for a step then a specific
         */
        export interface DynamicDueDate {
            numberOfUnits: number;
            timePeriod: "days" | "weeks" | "months";
            actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED";
            stepId?: string;
        }
        /**
         * Details regarding ECP for the workflow step
         */
        export interface ECPDetails {
            enabled?: boolean;
            label?: string;
            name?: string;
            description?: string;
            journey?: StepJourney;
        }
        export interface ErrorResp {
            message?: string;
        }
        export type ItemType = "STEP" | "SECTION";
        export interface MaxAllowedLimit {
            currentNoOfWorkflows?: number;
            maxAllowed?: number;
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface Section {
            id?: string;
            name: string;
            order: number;
            type: ItemType;
            steps: /* Action that needs to be done in a Workflow */ Step[];
        }
        /**
         * Action that needs to be done in a Workflow
         */
        export interface Step {
            id?: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            executionType?: StepType;
            automationConfig?: {
                /**
                 * Id of the configured automation to run
                 */
                flowId: string;
            };
            journey?: StepJourney;
            order: number;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            /**
             * requirements that need to be fulfilled in order to enable the step execution
             */
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            assignedTo?: string[];
            type: ItemType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
        }
        /**
         * Longer information regarding Task
         */
        export interface StepDescription {
            enabled?: boolean;
            value?: string;
        }
        export interface StepJourney {
            id?: string;
            journeyId?: string;
            name?: string;
        }
        /**
         * describe the requirement for step enablement
         */
        export interface StepRequirement {
            definitionId: string;
            type: ItemType;
            condition: "CLOSED";
        }
        export type StepType = "MANUAL" | "AUTOMATION";
        export interface UpdateEntityAttributes {
            source: "workflow_status" | "current_section" | "current_step";
            target: {
                /**
                 * example:
                 * opportunity
                 */
                entitySchema: string;
                /**
                 * example:
                 * my_status
                 */
                entityAttribute: string;
            };
        }
        export interface WorkflowDefinition {
            id?: string;
            name: string;
            description?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            creationTime?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            lastUpdateTime?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | /* Action that needs to be done in a Workflow */ Step)[];
            closingReasons?: ClosingReasonId[];
            updateEntityAttributes?: UpdateEntityAttributes[];
        }
    }
}
declare namespace Paths {
    namespace ChangeReasonStatus {
        namespace Parameters {
            export type ReasonId = string;
        }
        export interface PathParameters {
            reasonId: Parameters.ReasonId;
        }
        export type RequestBody = Components.Schemas.ChangeReasonStatusReq;
        namespace Responses {
            export interface $202 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace CreateClosingReason {
        export type RequestBody = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
        namespace Responses {
            export type $201 = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
        }
    }
    namespace CreateDefinition {
        export type RequestBody = Components.Schemas.WorkflowDefinition;
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowDefinition;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteDefinition {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
        }
    }
    namespace GetAllClosingReasons {
        namespace Parameters {
            export type IncludeInactive = boolean;
        }
        export interface QueryParameters {
            includeInactive?: Parameters.IncludeInactive;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ClosingReasons;
        }
    }
    namespace GetDefinition {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowDefinition;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $404 = /* Definition could be not found */ Components.Schemas.DefinitionNotFoundResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetDefinitions {
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowDefinition[];
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetMaxAllowedLimit {
        namespace Responses {
            export type $200 = Components.Schemas.MaxAllowedLimit;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetWorkflowClosingReasons {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ClosingReasonsIds;
        }
    }
    namespace SetWorkflowClosingReasons {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        export type RequestBody = Components.Schemas.ClosingReasonsIds;
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace UpdateDefinition {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        export type RequestBody = Components.Schemas.WorkflowDefinition;
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowDefinition;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
}

export interface OperationMethods {
  /**
   * getMaxAllowedLimit - getMaxAllowedLimit
   * 
   * Get limits and number of created executions for an Organization.
   */
  'getMaxAllowedLimit'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMaxAllowedLimit.Responses.$200>
  /**
   * getDefinitions - getDefinitions
   * 
   * Retrieve all Workflow Definitions from an Organization
   */
  'getDefinitions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDefinitions.Responses.$200>
  /**
   * createDefinition - createDefinition
   * 
   * Create a Workflow Definition.
   */
  'createDefinition'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDefinition.Responses.$200>
  /**
   * getDefinition - getDefinition
   * 
   * Get specific Definition by id from the Organization.
   */
  'getDefinition'(
    parameters?: Parameters<Paths.GetDefinition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDefinition.Responses.$200>
  /**
   * updateDefinition - updateDefinition
   * 
   * Update Workflow Definition.
   */
  'updateDefinition'(
    parameters?: Parameters<Paths.UpdateDefinition.PathParameters> | null,
    data?: Paths.UpdateDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateDefinition.Responses.$200>
  /**
   * deleteDefinition - deleteDefinition
   * 
   * Delete Workflow Definition.
   */
  'deleteDefinition'(
    parameters?: Parameters<Paths.DeleteDefinition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDefinition.Responses.$204>
  /**
   * getAllClosingReasons - getAllClosingReasons
   * 
   * Get all Closing Reasons defined in the organization by default all Active.
   */
  'getAllClosingReasons'(
    parameters?: Parameters<Paths.GetAllClosingReasons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllClosingReasons.Responses.$200>
  /**
   * createClosingReason - createClosingReason
   * 
   * A created Closing Reason is stored for the organization and will be displayed in the library of reasons.
   */
  'createClosingReason'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClosingReason.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClosingReason.Responses.$201>
  /**
   * changeReasonStatus - changeReasonStatus
   * 
   * Change the status of a Closing Reason (eg. ACTIVE to INACTIVE).
   */
  'changeReasonStatus'(
    parameters?: Parameters<Paths.ChangeReasonStatus.PathParameters> | null,
    data?: Paths.ChangeReasonStatus.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeReasonStatus.Responses.$202>
  /**
   * getWorkflowClosingReasons - getWorkflowClosingReasons
   * 
   * Returns all closing reasons defined for the workflow.
   */
  'getWorkflowClosingReasons'(
    parameters?: Parameters<Paths.GetWorkflowClosingReasons.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWorkflowClosingReasons.Responses.$200>
  /**
   * setWorkflowClosingReasons - setWorkflowClosingReasons
   * 
   * Sets which closing reasons are defined for this workflow, based on the entire closing reasons catalog.
   */
  'setWorkflowClosingReasons'(
    parameters?: Parameters<Paths.SetWorkflowClosingReasons.PathParameters> | null,
    data?: Paths.SetWorkflowClosingReasons.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetWorkflowClosingReasons.Responses.$201>
}

export interface PathsDictionary {
  ['/v1/workflows/limits/max-allowed']: {
    /**
     * getMaxAllowedLimit - getMaxAllowedLimit
     * 
     * Get limits and number of created executions for an Organization.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMaxAllowedLimit.Responses.$200>
  }
  ['/v1/workflows/definitions']: {
    /**
     * getDefinitions - getDefinitions
     * 
     * Retrieve all Workflow Definitions from an Organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDefinitions.Responses.$200>
    /**
     * createDefinition - createDefinition
     * 
     * Create a Workflow Definition.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDefinition.Responses.$200>
  }
  ['/v1/workflows/definitions/{definitionId}']: {
    /**
     * getDefinition - getDefinition
     * 
     * Get specific Definition by id from the Organization.
     */
    'get'(
      parameters?: Parameters<Paths.GetDefinition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDefinition.Responses.$200>
    /**
     * updateDefinition - updateDefinition
     * 
     * Update Workflow Definition.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateDefinition.PathParameters> | null,
      data?: Paths.UpdateDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateDefinition.Responses.$200>
    /**
     * deleteDefinition - deleteDefinition
     * 
     * Delete Workflow Definition.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteDefinition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDefinition.Responses.$204>
  }
  ['/v1/workflows/closing-reasons']: {
    /**
     * getAllClosingReasons - getAllClosingReasons
     * 
     * Get all Closing Reasons defined in the organization by default all Active.
     */
    'get'(
      parameters?: Parameters<Paths.GetAllClosingReasons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllClosingReasons.Responses.$200>
    /**
     * createClosingReason - createClosingReason
     * 
     * A created Closing Reason is stored for the organization and will be displayed in the library of reasons.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClosingReason.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClosingReason.Responses.$201>
  }
  ['/v1/workflows/closing-reasons/{reasonId}']: {
    /**
     * changeReasonStatus - changeReasonStatus
     * 
     * Change the status of a Closing Reason (eg. ACTIVE to INACTIVE).
     */
    'patch'(
      parameters?: Parameters<Paths.ChangeReasonStatus.PathParameters> | null,
      data?: Paths.ChangeReasonStatus.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeReasonStatus.Responses.$202>
  }
  ['/v1/workflows/definitions/{definitionId}/closing-reasons']: {
    /**
     * getWorkflowClosingReasons - getWorkflowClosingReasons
     * 
     * Returns all closing reasons defined for the workflow.
     */
    'get'(
      parameters?: Parameters<Paths.GetWorkflowClosingReasons.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWorkflowClosingReasons.Responses.$200>
    /**
     * setWorkflowClosingReasons - setWorkflowClosingReasons
     * 
     * Sets which closing reasons are defined for this workflow, based on the entire closing reasons catalog.
     */
    'patch'(
      parameters?: Parameters<Paths.SetWorkflowClosingReasons.PathParameters> | null,
      data?: Paths.SetWorkflowClosingReasons.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetWorkflowClosingReasons.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
