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
            parameters_schema?: {
                [key: string]: any;
            };
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
             *   "email.draft"
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
            /**
             * JSON Schema for configurable parameters
             */
            parameters_schema?: {
                [key: string]: any;
            };
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
             * Runtime parameters (validated against parameters_schema)
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
                [key: string]: any;
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
        export interface ListAgentsResponse {
            agents?: AgentDefinition[];
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
         * Action waiting for approval (when status=waiting_approval)
         */
        export type PendingAction = {
            tool?: string;
            input?: {
                [key: string]: any;
            };
            description?: string;
        } | null;
        export type SkillCategory = "email" | "entity" | "document" | "classification" | "custom";
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
            parameters_schema?: {
                [key: string]: any;
            };
        }
    }
}
declare namespace Paths {
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
    namespace ListAgents {
        namespace Responses {
            export type $200 = Components.Schemas.ListAgentsResponse;
            export type $400 = Components.Schemas.Error;
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AgentDefinition = Components.Schemas.AgentDefinition;
export type AgentSource = Components.Schemas.AgentSource;
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
export type ListAgentsResponse = Components.Schemas.ListAgentsResponse;
export type ModelConfig = Components.Schemas.ModelConfig;
export type PendingAction = Components.Schemas.PendingAction;
export type SkillCategory = Components.Schemas.SkillCategory;
export type ToolDefinition = Components.Schemas.ToolDefinition;
export type UpdateAgentRequest = Components.Schemas.UpdateAgentRequest;
