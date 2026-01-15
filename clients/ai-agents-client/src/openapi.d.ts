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
        export interface AgentDefinition {
            agent_id?: string; // uuid
            org_id?: string;
            name?: string;
            description?: string;
            category?: SkillCategory;
            icon?: string;
            source?: /**
             * - system: Pre-built by epilot
             * - custom: Created by organization
             *
             */
            AgentSource;
            system_prompt?: string;
            tools?: string[];
            model_config?: ModelConfig;
            max_iterations?: number;
            execution_pattern?: /**
             * - direct: Single LLM call, no tools
             * - react: Multi-step reasoning with tool use
             *
             */
            ExecutionPattern;
            execution_mode?: /**
             * - automatic: Execute without human intervention
             * - approval: Pause for human approval before tool execution
             * - draft: Execute but mark output as draft for review
             *
             */
            ExecutionMode;
            output_schema?: {
                [key: string]: any;
            };
            input_parameters_schema?: /**
             * example:
             * {
             *   "type": "object",
             *   "parameters": [
             *     {
             *       "name": "target_schema",
             *       "label": "Target Schema",
             *       "type": "entity-schema",
             *       "description": "Entity type to create"
             *     },
             *     {
             *       "name": "confidence_threshold",
             *       "label": "Confidence Threshold",
             *       "type": "number",
             *       "minimum": 0,
             *       "maximum": 1,
             *       "default": 0.8
             *     },
             *     {
             *       "name": "categories",
             *       "label": "Categories",
             *       "type": "select",
             *       "enum": [
             *         "invoice",
             *         "contract",
             *         "letter"
             *       ],
             *       "multi": true
             *     }
             *   ],
             *   "required": [
             *     "target_schema"
             *   ]
             * }
             */
            InputParametersSchema;
            version?: number;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
        }
        /**
         * - system: Pre-built by epilot
         * - custom: Created by organization
         *
         */
        export type AgentSource = "system" | "custom";
        export interface ApproveExecutionRequest {
            /**
             * Optional reason for approval
             */
            reason?: string;
        }
        export interface CreateAgentRequest {
            /**
             * example:
             * Email Reply Generator
             */
            name: string;
            description?: string;
            category?: SkillCategory;
            /**
             * example:
             * mail-reply
             */
            icon?: string;
            /**
             * Core LLM instructions
             */
            system_prompt: string;
            /**
             * Tool IDs this agent can use
             * example:
             * [
             *   "entity.search",
             *   "message.draft"
             * ]
             */
            tools?: string[];
            model_config?: ModelConfig;
            /**
             * Max ReAct loop iterations
             */
            max_iterations?: number;
            execution_pattern: /**
             * - direct: Single LLM call, no tools
             * - react: Multi-step reasoning with tool use
             *
             */
            ExecutionPattern;
            execution_mode?: /**
             * - automatic: Execute without human intervention
             * - approval: Pause for human approval before tool execution
             * - draft: Execute but mark output as draft for review
             *
             */
            ExecutionMode;
            /**
             * JSON Schema for expected output
             */
            output_schema?: {
                [key: string]: any;
            };
            input_parameters_schema?: /**
             * example:
             * {
             *   "type": "object",
             *   "parameters": [
             *     {
             *       "name": "target_schema",
             *       "label": "Target Schema",
             *       "type": "entity-schema",
             *       "description": "Entity type to create"
             *     },
             *     {
             *       "name": "confidence_threshold",
             *       "label": "Confidence Threshold",
             *       "type": "number",
             *       "minimum": 0,
             *       "maximum": 1,
             *       "default": 0.8
             *     },
             *     {
             *       "name": "categories",
             *       "label": "Categories",
             *       "type": "select",
             *       "enum": [
             *         "invoice",
             *         "contract",
             *         "letter"
             *       ],
             *       "multi": true
             *     }
             *   ],
             *   "required": [
             *     "target_schema"
             *   ]
             * }
             */
            InputParametersSchema;
        }
        export interface Error {
            error?: string;
            message?: string;
            details?: {
                [key: string]: any;
            };
        }
        export interface ExecuteAgentRequest {
            input?: {
                /**
                 * Primary entity ID for context
                 */
                entity_id?: string;
                workflow_id?: string;
                workflow_execution_id?: string;
                task_id?: string;
                custom_data?: {
                    [name: string]: any;
                };
            };
            /**
             * Runtime parameters (validated against input_parameters_schema)
             */
            parameters?: {
                [name: string]: any;
            };
            execution_mode_override?: /**
             * - automatic: Execute without human intervention
             * - approval: Pause for human approval before tool execution
             * - draft: Execute but mark output as draft for review
             *
             */
            ExecutionMode;
            /**
             * Webhook URL for async completion notification
             */
            callback_url?: string; // uri
            /**
             * Execution timeout in milliseconds
             */
            timeout_ms?: number;
        }
        export type ExecutionError = {
            code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR";
            message?: string;
            details?: {
                [key: string]: any;
            };
        } | null;
        export interface ExecutionIteration {
            iteration_index?: number;
            /**
             * LLM reasoning/thinking
             */
            thought?: string;
            action?: {
                tool?: string;
                input?: {
                    [key: string]: any;
                };
            } | null;
            /**
             * Tool result
             */
            observation?: {
                [key: string]: any;
            } | null;
            timestamp?: string; // date-time
            tokens_used?: number;
            latency_ms?: number;
        }
        export interface ExecutionMetrics {
            total_tokens?: number;
            input_tokens?: number;
            output_tokens?: number;
            total_cost_usd?: number; // float
            duration_ms?: number;
            iteration_count?: number;
        }
        /**
         * - automatic: Execute without human intervention
         * - approval: Pause for human approval before tool execution
         * - draft: Execute but mark output as draft for review
         *
         */
        export type ExecutionMode = "automatic" | "approval" | "draft";
        /**
         * - direct: Single LLM call, no tools
         * - react: Multi-step reasoning with tool use
         *
         */
        export type ExecutionPattern = "direct" | "react";
        export interface ExecutionResponse {
            execution_id?: string; // uuid
            agent_id?: string; // uuid
            org_id?: string;
            status?: ExecutionStatus;
            input?: {
                [key: string]: any;
            };
            parameters?: {
                [key: string]: any;
            };
            /**
             * Execution result (when status=completed)
             */
            result?: {
                /**
                 * Text response from the agent
                 */
                response?: string;
                /**
                 * Parsed structured output (only for direct mode with output_schema)
                 */
                structured_output?: {
                    [key: string]: any;
                } | null;
            } | null;
            error?: ExecutionError;
            pending_action?: /* Action waiting for approval (when status=waiting_approval) */ PendingAction;
            metrics?: ExecutionMetrics;
            started_at?: string; // date-time
            completed_at?: string | null; // date-time
        }
        export type ExecutionStatus = "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled";
        export interface ExecutionTrace {
            execution_id?: string; // uuid
            iterations?: ExecutionIteration[];
            total_iterations?: number;
        }
        export interface InputParameterDefinition {
            /**
             * Unique identifier for the parameter (used in API)
             * example:
             * target_schema
             */
            name: string;
            /**
             * Human-readable display label
             * example:
             * Target Schema
             */
            label: string;
            type: /**
             * Base types:
             * - text: Text input field
             * - number: Numeric input field
             * - boolean: Toggle switch
             * - select: Dropdown selection (requires enum array)
             *
             * Custom types (domain-specific):
             * - entity-schema: Entity schema selector (fetches from Entity API)
             * - entity-attribute: Entity attribute selector (requires dependsOn)
             * - entity-id: Entity picker (search and select entities)
             * - taxonomy: Taxonomy selector (fetches from Taxonomy API)
             * - taxonomy-classification: Classification selector (requires dependsOn)
             *
             */
            ParameterType;
            /**
             * Help text for the parameter
             */
            description?: string;
            /**
             * Default value for the parameter
             */
            default?: any;
            /**
             * Allow multiple selections (value becomes array)
             */
            multi?: boolean;
            /**
             * Parent parameter this depends on (for entity-attribute, taxonomy-classification)
             */
            dependsOn?: string;
            /**
             * Conditional visibility rules (show when parent has specific values)
             */
            visibleWhen?: {
                [name: string]: any[];
            };
            /**
             * Allowed values (required for 'select' type)
             */
            enum?: string[];
            /**
             * Minimum value (for number type)
             */
            minimum?: number;
            /**
             * Maximum value (for number type)
             */
            maximum?: number;
            /**
             * Step increment (for number type)
             */
            step?: number;
            /**
             * Minimum length (for text type)
             */
            minLength?: number;
            /**
             * Maximum length (for text type)
             */
            maxLength?: number;
            /**
             * Filter to specific schemas (for entity-schema, entity-id)
             */
            schemaFilter?: string[];
            /**
             * Filter to specific attribute types (for entity-attribute)
             */
            attributeTypeFilter?: string[];
        }
        /**
         * example:
         * {
         *   "type": "object",
         *   "parameters": [
         *     {
         *       "name": "target_schema",
         *       "label": "Target Schema",
         *       "type": "entity-schema",
         *       "description": "Entity type to create"
         *     },
         *     {
         *       "name": "confidence_threshold",
         *       "label": "Confidence Threshold",
         *       "type": "number",
         *       "minimum": 0,
         *       "maximum": 1,
         *       "default": 0.8
         *     },
         *     {
         *       "name": "categories",
         *       "label": "Categories",
         *       "type": "select",
         *       "enum": [
         *         "invoice",
         *         "contract",
         *         "letter"
         *       ],
         *       "multi": true
         *     }
         *   ],
         *   "required": [
         *     "target_schema"
         *   ]
         * }
         */
        export interface InputParametersSchema {
            /**
             * Always "object"
             */
            type: "object";
            /**
             * Array of parameter definitions
             */
            parameters: InputParameterDefinition[];
            /**
             * Array of parameter names that are required
             */
            required?: string[];
        }
        export interface ListAgentsResponse {
            agents?: AgentDefinition[];
            next_cursor?: string | null;
        }
        export interface ListExecutionsResponse {
            executions?: ExecutionResponse[];
            next_cursor?: string | null;
        }
        export interface ModelConfig {
            /**
             * AWS Bedrock model ID
             */
            model_id?: string;
            temperature?: number;
            max_tokens?: number;
        }
        /**
         * Base types:
         * - text: Text input field
         * - number: Numeric input field
         * - boolean: Toggle switch
         * - select: Dropdown selection (requires enum array)
         *
         * Custom types (domain-specific):
         * - entity-schema: Entity schema selector (fetches from Entity API)
         * - entity-attribute: Entity attribute selector (requires dependsOn)
         * - entity-id: Entity picker (search and select entities)
         * - taxonomy: Taxonomy selector (fetches from Taxonomy API)
         * - taxonomy-classification: Classification selector (requires dependsOn)
         *
         */
        export type ParameterType = "text" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification";
        /**
         * Action waiting for approval (when status=waiting_approval)
         */
        export type PendingAction = {
            tool?: string;
            input?: {
                [key: string]: any;
            };
            description?: string;
        } | null;
        export interface RejectExecutionRequest {
            /**
             * Reason for rejection
             */
            reason: string;
        }
        export type SkillCategory = "message" | "entity" | "document" | "classification" | "custom";
        export interface ToolDefinition {
            /**
             * example:
             * entity.search
             */
            tool_id?: string;
            /**
             * example:
             * Search Entities
             */
            name?: string;
            /**
             * Description for LLM to understand tool purpose
             */
            description?: string;
            category?: "entity" | "email" | "taxonomy" | "rag" | "workflow";
            /**
             * JSON Schema for tool input
             */
            parameters?: {
                [key: string]: any;
            };
            /**
             * JSON Schema for tool output
             */
            returns?: {
                [key: string]: any;
            };
            /**
             * Whether this tool always requires human approval
             */
            requires_approval?: boolean;
            enabled?: boolean;
        }
        export interface UpdateAgentRequest {
            name?: string;
            description?: string;
            category?: SkillCategory;
            icon?: string;
            system_prompt?: string;
            tools?: string[];
            model_config?: ModelConfig;
            max_iterations?: number;
            execution_pattern?: /**
             * - direct: Single LLM call, no tools
             * - react: Multi-step reasoning with tool use
             *
             */
            ExecutionPattern;
            execution_mode?: /**
             * - automatic: Execute without human intervention
             * - approval: Pause for human approval before tool execution
             * - draft: Execute but mark output as draft for review
             *
             */
            ExecutionMode;
            output_schema?: {
                [key: string]: any;
            };
            input_parameters_schema?: /**
             * example:
             * {
             *   "type": "object",
             *   "parameters": [
             *     {
             *       "name": "target_schema",
             *       "label": "Target Schema",
             *       "type": "entity-schema",
             *       "description": "Entity type to create"
             *     },
             *     {
             *       "name": "confidence_threshold",
             *       "label": "Confidence Threshold",
             *       "type": "number",
             *       "minimum": 0,
             *       "maximum": 1,
             *       "default": 0.8
             *     },
             *     {
             *       "name": "categories",
             *       "label": "Categories",
             *       "type": "select",
             *       "enum": [
             *         "invoice",
             *         "contract",
             *         "letter"
             *       ],
             *       "multi": true
             *     }
             *   ],
             *   "required": [
             *     "target_schema"
             *   ]
             * }
             */
            InputParametersSchema;
        }
    }
}
declare namespace Paths {
    namespace ApproveExecution {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        export type RequestBody = Components.Schemas.ApproveExecutionRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace CancelExecution {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace CreateAgent {
        export type RequestBody = Components.Schemas.CreateAgentRequest;
        namespace Responses {
            export type $201 = Components.Schemas.AgentDefinition;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace DeleteAgentById {
        namespace Parameters {
            export type AgentId = string; // uuid
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ExecuteAgent {
        namespace Parameters {
            export type AgentId = string; // uuid
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId /* uuid */;
        }
        export type RequestBody = Components.Schemas.ExecuteAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetAgentById {
        namespace Parameters {
            export type AgentId = string; // uuid
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentDefinition;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace GetExecution {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetExecutionTrace {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionTrace;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ListAgents {
        namespace Responses {
            export type $200 = Components.Schemas.ListAgentsResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListExecutions {
        namespace Parameters {
            export type AgentId = string;
            export type Limit = number;
            export type Status = Components.Schemas.ExecutionStatus;
        }
        export interface QueryParameters {
            agent_id?: Parameters.AgentId;
            status?: Parameters.Status;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListExecutionsResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace RejectExecution {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        export type RequestBody = Components.Schemas.RejectExecutionRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace UpdateAgentById {
        namespace Parameters {
            export type AgentId = string; // uuid
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId /* uuid */;
        }
        export type RequestBody = Components.Schemas.UpdateAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AgentDefinition;
            export type $400 = Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * listAgents - List all agent configurations
   */
  'listAgents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAgents.Responses.$200>
  /**
   * createAgent - Create Agent definition
   */
  'createAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAgent.Responses.$201>
  /**
   * getAgentById - Get the agent configuration by ID
   */
  'getAgentById'(
    parameters?: Parameters<Paths.GetAgentById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentById.Responses.$200>
  /**
   * updateAgentById - update the agent configuration by ID
   */
  'updateAgentById'(
    parameters?: Parameters<Paths.UpdateAgentById.PathParameters> | null,
    data?: Paths.UpdateAgentById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAgentById.Responses.$200>
  /**
   * deleteAgentById - Delete the agent configuration by ID
   */
  'deleteAgentById'(
    parameters?: Parameters<Paths.DeleteAgentById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAgentById.Responses.$204>
  /**
   * executeAgent - Execute an agent
   */
  'executeAgent'(
    parameters?: Parameters<Paths.ExecuteAgent.PathParameters> | null,
    data?: Paths.ExecuteAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteAgent.Responses.$200>
  /**
   * listExecutions - List executions
   */
  'listExecutions'(
    parameters?: Parameters<Paths.ListExecutions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListExecutions.Responses.$200>
  /**
   * getExecution - Get execution by ID
   */
  'getExecution'(
    parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecution.Responses.$200>
  /**
   * cancelExecution - Cancel execution
   */
  'cancelExecution'(
    parameters?: Parameters<Paths.CancelExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelExecution.Responses.$200>
  /**
   * getExecutionTrace - Get execution trace/iterations
   * 
   * Returns the step-by-step reasoning and tool calls for ReAct mode executions. Returns empty iterations array for direct mode executions.
   */
  'getExecutionTrace'(
    parameters?: Parameters<Paths.GetExecutionTrace.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecutionTrace.Responses.$200>
  /**
   * approveExecution - Approve pending action
   * 
   * Approves a pending tool action when execution is in waiting_approval status
   */
  'approveExecution'(
    parameters?: Parameters<Paths.ApproveExecution.PathParameters> | null,
    data?: Paths.ApproveExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApproveExecution.Responses.$200>
  /**
   * rejectExecution - Reject pending action
   * 
   * Rejects a pending tool action when execution is in waiting_approval status
   */
  'rejectExecution'(
    parameters?: Parameters<Paths.RejectExecution.PathParameters> | null,
    data?: Paths.RejectExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectExecution.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/agents']: {
    /**
     * createAgent - Create Agent definition
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAgent.Responses.$201>
    /**
     * listAgents - List all agent configurations
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAgents.Responses.$200>
  }
  ['/v1/agents/{agent_id}']: {
    /**
     * getAgentById - Get the agent configuration by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetAgentById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentById.Responses.$200>
    /**
     * updateAgentById - update the agent configuration by ID
     */
    'put'(
      parameters?: Parameters<Paths.UpdateAgentById.PathParameters> | null,
      data?: Paths.UpdateAgentById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAgentById.Responses.$200>
    /**
     * deleteAgentById - Delete the agent configuration by ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAgentById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAgentById.Responses.$204>
  }
  ['/v1/agents/{agent_id}/execute']: {
    /**
     * executeAgent - Execute an agent
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteAgent.PathParameters> | null,
      data?: Paths.ExecuteAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteAgent.Responses.$200>
  }
  ['/v1/executions']: {
    /**
     * listExecutions - List executions
     */
    'get'(
      parameters?: Parameters<Paths.ListExecutions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListExecutions.Responses.$200>
  }
  ['/v1/executions/{execution_id}']: {
    /**
     * getExecution - Get execution by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecution.Responses.$200>
    /**
     * cancelExecution - Cancel execution
     */
    'delete'(
      parameters?: Parameters<Paths.CancelExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelExecution.Responses.$200>
  }
  ['/v1/executions/{execution_id}/trace']: {
    /**
     * getExecutionTrace - Get execution trace/iterations
     * 
     * Returns the step-by-step reasoning and tool calls for ReAct mode executions. Returns empty iterations array for direct mode executions.
     */
    'get'(
      parameters?: Parameters<Paths.GetExecutionTrace.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecutionTrace.Responses.$200>
  }
  ['/v1/executions/{execution_id}/approve']: {
    /**
     * approveExecution - Approve pending action
     * 
     * Approves a pending tool action when execution is in waiting_approval status
     */
    'post'(
      parameters?: Parameters<Paths.ApproveExecution.PathParameters> | null,
      data?: Paths.ApproveExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApproveExecution.Responses.$200>
  }
  ['/v1/executions/{execution_id}/reject']: {
    /**
     * rejectExecution - Reject pending action
     * 
     * Rejects a pending tool action when execution is in waiting_approval status
     */
    'post'(
      parameters?: Parameters<Paths.RejectExecution.PathParameters> | null,
      data?: Paths.RejectExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectExecution.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AgentDefinition = Components.Schemas.AgentDefinition;
export type AgentSource = Components.Schemas.AgentSource;
export type ApproveExecutionRequest = Components.Schemas.ApproveExecutionRequest;
export type CreateAgentRequest = Components.Schemas.CreateAgentRequest;
export type Error = Components.Schemas.Error;
export type ExecuteAgentRequest = Components.Schemas.ExecuteAgentRequest;
export type ExecutionError = Components.Schemas.ExecutionError;
export type ExecutionIteration = Components.Schemas.ExecutionIteration;
export type ExecutionMetrics = Components.Schemas.ExecutionMetrics;
export type ExecutionMode = Components.Schemas.ExecutionMode;
export type ExecutionPattern = Components.Schemas.ExecutionPattern;
export type ExecutionResponse = Components.Schemas.ExecutionResponse;
export type ExecutionStatus = Components.Schemas.ExecutionStatus;
export type ExecutionTrace = Components.Schemas.ExecutionTrace;
export type InputParameterDefinition = Components.Schemas.InputParameterDefinition;
export type InputParametersSchema = Components.Schemas.InputParametersSchema;
export type ListAgentsResponse = Components.Schemas.ListAgentsResponse;
export type ListExecutionsResponse = Components.Schemas.ListExecutionsResponse;
export type ModelConfig = Components.Schemas.ModelConfig;
export type ParameterType = Components.Schemas.ParameterType;
export type PendingAction = Components.Schemas.PendingAction;
export type RejectExecutionRequest = Components.Schemas.RejectExecutionRequest;
export type SkillCategory = Components.Schemas.SkillCategory;
export type ToolDefinition = Components.Schemas.ToolDefinition;
export type UpdateAgentRequest = Components.Schemas.UpdateAgentRequest;
