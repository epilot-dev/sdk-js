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
            agent_id?: /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            AgentId;
            org_id?: string;
            name?: string;
            description?: string;
            category?: SkillCategory;
            icon?: string;
            source?: /**
             * - system: Pre-built by epilot (system skills)
             * - custom: Created by organization
             *
             */
            AgentSource;
            /**
             * Where this agent/skill is available (flows, copilot, or both)
             * example:
             * [
             *   "flows",
             *   "copilot"
             * ]
             */
            availability?: /**
             * Where the skill/agent is available:
             * - flows: Available in workflow automations
             * - copilot: Available as a sub-agent in copilot
             * - portals: Available in end-user self-service portals
             * - all: Available everywhere
             *
             */
            SkillAvailability[];
            /**
             * Entity schemas this skill is allowed to work with (e.g., ["message"] for email skills)
             * example:
             * [
             *   "message"
             * ]
             */
            allowed_entity_schemas?: string[];
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
         * Agent identifier. Can be either:
         * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
         * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
         *
         * example:
         * skill:email-categorizer
         */
        export type AgentId = string;
        /**
         * - system: Pre-built by epilot (system skills)
         * - custom: Created by organization
         *
         */
        export type AgentSource = "system" | "custom";
        export interface ApproveExecutionRequest {
            /**
             * Optional reason for approval
             */
            reason?: string;
            /**
             * For batch approval - list of action IDs to approve. If not provided, all actions are approved.
             */
            approved_action_ids?: string[];
            /**
             * For batch approval - list of action IDs to reject. Actions not in approved_action_ids are implicitly rejected.
             */
            rejected_action_ids?: string[];
            /**
             * For `partnering.proposeAssignment` approvals. `primary_only` (default) shares only the primary entity; `primary_and_relations` also shares every entity in the proposal's `related_entities` as a child of the primary. Ignored by other tools.
             *
             */
            share_scope?: "primary_only" | "primary_and_relations";
        }
        export interface ChatMessage {
            role: "user" | "assistant" | "tool" | "system";
            content: string;
            tool_calls?: {
                id?: string;
                name?: string;
                input?: {
                    [key: string]: any;
                };
                output?: string;
            }[];
        }
        export interface ChatRequest {
            /**
             * Agent ID to chat with
             */
            agentId: string;
            /**
             * User message
             */
            message: string;
            /**
             * Conversation ID for server-side memory. If provided, loads history from DynamoDB.
             */
            conversationId?: string; // uuid
            /**
             * Client-provided message history (overrides server-side memory)
             */
            clientHistory?: ChatMessage[];
            context?: {
                entityId?: string;
                customData?: {
                    [name: string]: any;
                };
            };
            streaming?: StreamingOptions;
        }
        export interface ConversationItem {
            conversation_id?: string; // uuid
            user_id?: string;
            agent_id?: string;
            title?: string;
            message_count?: number;
            /**
             * Preview of the last message
             */
            last_message?: string;
            last_message_at?: string; // date-time
            context?: {
                entityId?: string;
                customData?: {
                    [key: string]: any;
                };
            };
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        export interface ConversationWithMessages {
            conversation?: ConversationItem;
            messages?: MessageItem[];
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
                /**
                 * Schema of the primary entity (e.g., "message", "contact")
                 */
                entity_schema?: string;
                workflow_id?: string;
                workflow_execution_id?: string;
                task_id?: string;
                custom_data?: {
                    [name: string]: any;
                };
                /**
                 * Array of entities from the flow trigger context (e.g., the message entity when triggered by email receive)
                 */
                flow_context?: {
                    entity_id: string;
                    entity_schema: string;
                }[];
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
            execution_context?: /**
             * Where the execution was triggered from:
             * - flows: Triggered from workflow automation
             * - copilot: Triggered from copilot assistant
             * - api: Direct API call
             *
             */
            ExecutionContext;
            /**
             * Webhook URL for async completion notification
             */
            callback_url?: string; // uri
            /**
             * Execution timeout in milliseconds
             */
            timeout_ms?: number;
        }
        /**
         * Where the execution was triggered from:
         * - flows: Triggered from workflow automation
         * - copilot: Triggered from copilot assistant
         * - api: Direct API call
         *
         */
        export type ExecutionContext = "flows" | "copilot" | "api";
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
        export interface ExecutionIterationProjection {
            index?: number;
            /**
             * Tool id the iteration invoked, or null for a non-tool step
             */
            tool?: string | null;
            status?: "running" | "completed";
            timestamp?: string; // date-time
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
            agent_id?: /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            AgentId;
            agent_source?: /**
             * - system: Pre-built by epilot (system skills)
             * - custom: Created by organization
             *
             */
            AgentSource;
            /**
             * Human-readable agent name (denormalized for display)
             */
            agent_name?: string;
            execution_context?: /**
             * Where the execution was triggered from:
             * - flows: Triggered from workflow automation
             * - copilot: Triggered from copilot assistant
             * - api: Direct API call
             *
             */
            ExecutionContext;
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
            /**
             * Slim, labels-only step-progress projection of the ReAct iterations (empty for direct mode). Exposes only index, tool, status, and timestamp — raw thought, action input, and observation are intentionally excluded.
             */
            iterations?: ExecutionIterationProjection[];
        }
        export interface ExecutionResult {
            response?: string;
            structured_output?: {
                [key: string]: any;
            };
            status?: "completed" | "failed" | "max_iterations" | "rejected";
            metrics?: ExecutionMetrics;
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
             * - textarea: Multi-line text input field
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
             * - shared-inbox: Shared inbox selector (fetches from Email Settings API)
             * - matching-criteria: Criteria editor for mapping compared fields between two contexts or entities
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
            /**
             * Whether to hide the parameter from the UI
             */
            hidden?: boolean;
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
        export interface ListConversationsResponse {
            conversations?: ConversationItem[];
            next_cursor?: string | null;
        }
        export interface ListExecutionsResponse {
            executions?: ExecutionResponse[];
            next_cursor?: string | null;
        }
        export interface MessageFeedback {
            rating: "up" | "down";
            comment?: string;
            user_id: string;
            submitted_at: string; // date-time
        }
        export interface MessageItem {
            conversation_id?: string; // uuid
            role?: "user" | "assistant" | "tool" | "system";
            content?: string;
            timestamp?: string; // date-time
            tool_calls?: {
                id?: string;
                name?: string;
                input?: {
                    [key: string]: any;
                };
                output?: string;
            }[];
            token_count?: number;
            /**
             * Langfuse trace id for the turn (assistant messages only)
             */
            trace_id?: string; // uuid
            feedback?: MessageFeedback;
        }
        export interface ModelConfig {
            /**
             * AWS Bedrock model ID
             */
            model_id?: string;
            temperature?: number;
            max_tokens?: number;
            /**
             * Enable extended thinking/reasoning for the model
             */
            thinking?: boolean;
            /**
             * Token budget for extended thinking (only used when thinking is enabled)
             */
            thinking_budget?: number;
        }
        /**
         * Base types:
         * - text: Text input field
         * - textarea: Multi-line text input field
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
         * - shared-inbox: Shared inbox selector (fetches from Email Settings API)
         * - matching-criteria: Criteria editor for mapping compared fields between two contexts or entities
         *
         */
        export type ParameterType = "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria";
        /**
         * Action waiting for approval (when status=waiting_approval)
         */
        export type PendingAction = {
            /**
             * Tool ID that requires approval
             */
            tool?: string;
            /**
             * Tool input parameters
             */
            input?: {
                [key: string]: any;
            };
            /**
             * Human-readable description of the action
             */
            description?: string;
            preview?: /* Structured preview data for approval UI. Provides a generic format that any tool can populate. */ ToolPreview;
        } | null;
        /**
         * Type of action being previewed
         */
        export type PreviewActionType = "move" | "create" | "update" | "delete" | "apply" | "send" | "link" | "unlink" | "batch_approval";
        /**
         * A single field change in the preview
         */
        export interface PreviewChange {
            /**
             * Field identifier
             */
            field?: string;
            /**
             * Human-readable field label
             */
            label?: string;
            from?: /* Typed value for preview display */ PreviewValue;
            to?: /* Typed value for preview display */ PreviewValue;
        }
        /**
         * Entity reference for preview display
         */
        export interface PreviewEntity {
            /**
             * Entity type (e.g., "inbox", "email", "contact", "label")
             * example:
             * inbox
             */
            type?: string;
            /**
             * Entity ID
             */
            id?: string;
            /**
             * Human-readable name for display
             * example:
             * Support Inbox
             */
            name?: string;
            /**
             * Entity schema (for epilot entities)
             */
            schema?: string;
            /**
             * Icon hint for UI
             */
            icon?: string;
            /**
             * Optional URL to view the entity
             */
            url?: string;
        }
        /**
         * Typed value for preview display
         */
        export interface PreviewValue {
            /**
             * Value type for proper rendering
             */
            type: "text" | "number" | "boolean" | "list" | "entity" | "badge";
            /**
             * The actual value (type depends on "type" field)
             */
            value?: any;
            /**
             * Array of values (for list type)
             */
            values?: string[];
            /**
             * Entity ID (for entity type)
             */
            id?: string;
            /**
             * Display name (for entity type)
             */
            name?: string;
            /**
             * Entity schema (for entity type)
             */
            schema?: string;
            /**
             * Badge color (for badge type)
             */
            color?: "success" | "warning" | "error" | "info";
        }
        export interface RejectExecutionRequest {
            /**
             * Reason for rejection
             */
            reason: string;
        }
        /**
         * Where the skill/agent is available:
         * - flows: Available in workflow automations
         * - copilot: Available as a sub-agent in copilot
         * - portals: Available in end-user self-service portals
         * - all: Available everywhere
         *
         */
        export type SkillAvailability = "flows" | "copilot" | "portals" | "all";
        export type SkillCategory = "message" | "entity" | "document" | "classification" | "custom";
        /**
         * Server-Sent Event for streaming responses
         */
        export interface StreamEvent {
            type?: "token" | "agent_step" | "tool_call" | "tool_result" | "complete" | "error" | "metadata" | "needs_approval";
            /**
             * Token content (for token events)
             */
            content?: string;
            /**
             * Token index (for token events)
             */
            index?: number;
            /**
             * Tool name (for tool events)
             */
            tool?: string;
            /**
             * Tool input (for tool_call events)
             */
            input?: {
                [key: string]: any;
            };
            /**
             * Tool output (for tool_result events)
             */
            output?: string;
            /**
             * Tool call ID
             */
            callId?: string;
            result?: ExecutionResult;
            error?: {
                code?: string;
                message?: string;
            };
            /**
             * Conversation ID (included in complete events)
             */
            conversationId?: string; // uuid
        }
        export interface StreamingOptions {
            /**
             * Stream mode - updates for step-based, messages for token-based
             */
            mode?: "updates" | "messages";
            /**
             * Enable token-level streaming
             */
            streamTokens?: boolean;
            /**
             * Include metadata events
             */
            includeMetadata?: boolean;
        }
        export interface SubmitFeedbackRequest {
            /**
             * Langfuse trace id of the assistant turn being rated
             */
            trace_id: string; // uuid
            rating: "up" | "down";
            /**
             * Optional free-text feedback
             */
            comment?: string;
        }
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
            category?: "entity" | "message" | "taxonomy" | "rag" | "workflow";
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
        /**
         * Structured preview data for approval UI. Provides a generic format that any tool can populate.
         */
        export interface ToolPreview {
            action?: {
                type: /* Type of action being previewed */ PreviewActionType;
                /**
                 * Human-readable action verb
                 * example:
                 * Move Thread
                 */
                verb: string;
            };
            source?: /* Entity reference for preview display */ PreviewEntity;
            target?: /* Entity reference for preview display */ PreviewEntity;
            /**
             * List of changes/modifications being made
             */
            changes?: /* A single field change in the preview */ PreviewChange[];
            /**
             * Additional context information
             */
            metadata?: {
                [name: string]: /* Typed value for preview display */ PreviewValue;
            };
            /**
             * AI reasoning for why this action is recommended
             * example:
             * This email discusses solar panel installation and should be handled by the Service team.
             */
            summary?: string;
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
    namespace Chat {
        export type RequestBody = Components.Schemas.ChatRequest;
        namespace Responses {
            export type $200 = /* Server-Sent Event for streaming responses */ Components.Schemas.StreamEvent;
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
            export type AgentId = /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            Components.Schemas.AgentId;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace DeleteConversation {
        namespace Parameters {
            export type ConversationId = string; // uuid
        }
        export interface PathParameters {
            conversation_id: Parameters.ConversationId /* uuid */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ExecuteAgent {
        namespace Parameters {
            export type AgentId = /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            Components.Schemas.AgentId;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export type RequestBody = Components.Schemas.ExecuteAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ExecuteAgentStream {
        namespace Parameters {
            export type AgentId = /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            Components.Schemas.AgentId;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export type RequestBody = Components.Schemas.ExecuteAgentRequest;
        namespace Responses {
            export type $200 = /* Server-Sent Event for streaming responses */ Components.Schemas.StreamEvent;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetAgentById {
        namespace Parameters {
            export type AgentId = /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            Components.Schemas.AgentId;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentDefinition;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace GetConversation {
        namespace Parameters {
            export type ConversationId = string; // uuid
            export type MessageLimit = number;
        }
        export interface PathParameters {
            conversation_id: Parameters.ConversationId /* uuid */;
        }
        export interface QueryParameters {
            message_limit?: Parameters.MessageLimit;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConversationWithMessages;
            export type $404 = Components.Schemas.Error;
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
        namespace Parameters {
            export type Availability = /**
             * Where the skill/agent is available:
             * - flows: Available in workflow automations
             * - copilot: Available as a sub-agent in copilot
             * - portals: Available in end-user self-service portals
             * - all: Available everywhere
             *
             */
            Components.Schemas.SkillAvailability;
            export type EntitySchema = string;
            export type Source = /**
             * - system: Pre-built by epilot (system skills)
             * - custom: Created by organization
             *
             */
            Components.Schemas.AgentSource;
        }
        export interface QueryParameters {
            source?: Parameters.Source;
            availability?: Parameters.Availability;
            entity_schema?: Parameters.EntitySchema;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListAgentsResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListConversations {
        namespace Parameters {
            export type AgentId = string;
            export type Cursor = string;
            export type Limit = number;
        }
        export interface QueryParameters {
            agent_id?: Parameters.AgentId;
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListConversationsResponse;
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
    namespace StreamExecution {
        namespace Parameters {
            export type ExecutionId = string; // uuid
            export type FromSequence = number;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        export interface QueryParameters {
            from_sequence?: Parameters.FromSequence;
        }
        namespace Responses {
            export type $200 = /* Server-Sent Event for streaming responses */ Components.Schemas.StreamEvent;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace SubmitConversationFeedback {
        namespace Parameters {
            export type ConversationId = string; // uuid
        }
        export interface PathParameters {
            conversation_id: Parameters.ConversationId /* uuid */;
        }
        export type RequestBody = Components.Schemas.SubmitFeedbackRequest;
        namespace Responses {
            export interface $200 {
                feedback?: Components.Schemas.MessageFeedback;
            }
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace UpdateAgentById {
        namespace Parameters {
            export type AgentId = /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            Components.Schemas.AgentId;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
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
   * 
   * Lists agents from both system skills and custom agents.
   * Use query parameters to filter by source, availability, or entity schema.
   * 
   */
  'listAgents'(
    parameters?: Parameters<Paths.ListAgents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAgents.Responses.$200>
  /**
   * createAgent - Create Agent definition
   * 
   * Creates a new custom agent. System skills cannot be created via this endpoint.
   */
  'createAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAgent.Responses.$201>
  /**
   * getAgentById - Get the agent configuration by ID
   * 
   * Retrieves an agent by ID. Supports both:
   * - System skill IDs (prefixed): "skill:email-categorizer"
   * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
   * 
   */
  'getAgentById'(
    parameters?: Parameters<Paths.GetAgentById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentById.Responses.$200>
  /**
   * updateAgentById - Update the agent configuration by ID
   * 
   * Updates a custom agent. System skills cannot be updated via this endpoint.
   */
  'updateAgentById'(
    parameters?: Parameters<Paths.UpdateAgentById.PathParameters> | null,
    data?: Paths.UpdateAgentById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAgentById.Responses.$200>
  /**
   * deleteAgentById - Delete the agent configuration by ID
   * 
   * Deletes a custom agent. System skills cannot be deleted via this endpoint.
   */
  'deleteAgentById'(
    parameters?: Parameters<Paths.DeleteAgentById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAgentById.Responses.$204>
  /**
   * executeAgent - Execute an agent
   * 
   * Executes an agent (system skill or custom agent).
   * Supports both:
   * - System skill IDs (prefixed): "skill:email-categorizer"
   * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
   * 
   */
  'executeAgent'(
    parameters?: Parameters<Paths.ExecuteAgent.PathParameters> | null,
    data?: Paths.ExecuteAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteAgent.Responses.$200>
  /**
   * executeAgentStream - Execute an agent with streaming response
   * 
   * Executes an agent with real-time streaming of tokens and tool events.
   * Returns Server-Sent Events (SSE) stream with token-by-token output,
   * tool call progress, and completion status.
   * 
   * Unlike the async `/execute` endpoint which returns immediately with
   * an execution_id for polling, this endpoint streams all events in real-time.
   * 
   * Supports both:
   * - System skill IDs (prefixed): "skill:email-categorizer"
   * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
   * 
   */
  'executeAgentStream'(
    parameters?: Parameters<Paths.ExecuteAgentStream.PathParameters> | null,
    data?: Paths.ExecuteAgentStream.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteAgentStream.Responses.$200>
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
  /**
   * streamExecution - Reconnect to execution stream
   * 
   * Reconnects to an execution's event stream after approval. Replays missed events from event log and continues streaming if execution is still running.
   */
  'streamExecution'(
    parameters?: Parameters<Paths.StreamExecution.QueryParameters & Paths.StreamExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StreamExecution.Responses.$200>
  /**
   * chat - Streaming chat with AI agent
   * 
   * Initiates a streaming chat session with an AI agent. Supports server-side conversation memory via conversationId or client-provided history via clientHistory.
   */
  'chat'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Chat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Chat.Responses.$200>
  /**
   * listConversations - List conversations
   * 
   * Lists conversations for the authenticated user, sorted by most recent.
   */
  'listConversations'(
    parameters?: Parameters<Paths.ListConversations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConversations.Responses.$200>
  /**
   * getConversation - Get conversation with messages
   * 
   * Retrieves a conversation and its message history.
   */
  'getConversation'(
    parameters?: Parameters<Paths.GetConversation.QueryParameters & Paths.GetConversation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConversation.Responses.$200>
  /**
   * deleteConversation - Delete conversation
   * 
   * Deletes a conversation and all its messages.
   */
  'deleteConversation'(
    parameters?: Parameters<Paths.DeleteConversation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConversation.Responses.$204>
  /**
   * submitConversationFeedback - Submit feedback for an assistant turn
   * 
   * Records a thumbs up/down (with optional comment) for the assistant turn identified by its Langfuse trace id. The rating is persisted on the message and mirrored to Langfuse as a trace score.
   * 
   */
  'submitConversationFeedback'(
    parameters?: Parameters<Paths.SubmitConversationFeedback.PathParameters> | null,
    data?: Paths.SubmitConversationFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SubmitConversationFeedback.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/agents']: {
    /**
     * createAgent - Create Agent definition
     * 
     * Creates a new custom agent. System skills cannot be created via this endpoint.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAgent.Responses.$201>
    /**
     * listAgents - List all agent configurations
     * 
     * Lists agents from both system skills and custom agents.
     * Use query parameters to filter by source, availability, or entity schema.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListAgents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAgents.Responses.$200>
  }
  ['/v1/agents/{agent_id}']: {
    /**
     * getAgentById - Get the agent configuration by ID
     * 
     * Retrieves an agent by ID. Supports both:
     * - System skill IDs (prefixed): "skill:email-categorizer"
     * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetAgentById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentById.Responses.$200>
    /**
     * updateAgentById - Update the agent configuration by ID
     * 
     * Updates a custom agent. System skills cannot be updated via this endpoint.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateAgentById.PathParameters> | null,
      data?: Paths.UpdateAgentById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAgentById.Responses.$200>
    /**
     * deleteAgentById - Delete the agent configuration by ID
     * 
     * Deletes a custom agent. System skills cannot be deleted via this endpoint.
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
     * 
     * Executes an agent (system skill or custom agent).
     * Supports both:
     * - System skill IDs (prefixed): "skill:email-categorizer"
     * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteAgent.PathParameters> | null,
      data?: Paths.ExecuteAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteAgent.Responses.$200>
  }
  ['/v1/agents/{agent_id}/execute/stream']: {
    /**
     * executeAgentStream - Execute an agent with streaming response
     * 
     * Executes an agent with real-time streaming of tokens and tool events.
     * Returns Server-Sent Events (SSE) stream with token-by-token output,
     * tool call progress, and completion status.
     * 
     * Unlike the async `/execute` endpoint which returns immediately with
     * an execution_id for polling, this endpoint streams all events in real-time.
     * 
     * Supports both:
     * - System skill IDs (prefixed): "skill:email-categorizer"
     * - Custom agent IDs (UUID): "0336a235-9417-4dd8-894c-fe81285bba75"
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteAgentStream.PathParameters> | null,
      data?: Paths.ExecuteAgentStream.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteAgentStream.Responses.$200>
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
  ['/v1/executions/{execution_id}/stream']: {
    /**
     * streamExecution - Reconnect to execution stream
     * 
     * Reconnects to an execution's event stream after approval. Replays missed events from event log and continues streaming if execution is still running.
     */
    'get'(
      parameters?: Parameters<Paths.StreamExecution.QueryParameters & Paths.StreamExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StreamExecution.Responses.$200>
  }
  ['/v1/chat']: {
    /**
     * chat - Streaming chat with AI agent
     * 
     * Initiates a streaming chat session with an AI agent. Supports server-side conversation memory via conversationId or client-provided history via clientHistory.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Chat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Chat.Responses.$200>
  }
  ['/v1/conversations']: {
    /**
     * listConversations - List conversations
     * 
     * Lists conversations for the authenticated user, sorted by most recent.
     */
    'get'(
      parameters?: Parameters<Paths.ListConversations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConversations.Responses.$200>
  }
  ['/v1/conversations/{conversation_id}']: {
    /**
     * getConversation - Get conversation with messages
     * 
     * Retrieves a conversation and its message history.
     */
    'get'(
      parameters?: Parameters<Paths.GetConversation.QueryParameters & Paths.GetConversation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConversation.Responses.$200>
    /**
     * deleteConversation - Delete conversation
     * 
     * Deletes a conversation and all its messages.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteConversation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConversation.Responses.$204>
  }
  ['/v1/conversations/{conversation_id}/feedback']: {
    /**
     * submitConversationFeedback - Submit feedback for an assistant turn
     * 
     * Records a thumbs up/down (with optional comment) for the assistant turn identified by its Langfuse trace id. The rating is persisted on the message and mirrored to Langfuse as a trace score.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SubmitConversationFeedback.PathParameters> | null,
      data?: Paths.SubmitConversationFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SubmitConversationFeedback.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AgentDefinition = Components.Schemas.AgentDefinition;
export type AgentId = Components.Schemas.AgentId;
export type AgentSource = Components.Schemas.AgentSource;
export type ApproveExecutionRequest = Components.Schemas.ApproveExecutionRequest;
export type ChatMessage = Components.Schemas.ChatMessage;
export type ChatRequest = Components.Schemas.ChatRequest;
export type ConversationItem = Components.Schemas.ConversationItem;
export type ConversationWithMessages = Components.Schemas.ConversationWithMessages;
export type CreateAgentRequest = Components.Schemas.CreateAgentRequest;
export type Error = Components.Schemas.Error;
export type ExecuteAgentRequest = Components.Schemas.ExecuteAgentRequest;
export type ExecutionContext = Components.Schemas.ExecutionContext;
export type ExecutionError = Components.Schemas.ExecutionError;
export type ExecutionIteration = Components.Schemas.ExecutionIteration;
export type ExecutionIterationProjection = Components.Schemas.ExecutionIterationProjection;
export type ExecutionMetrics = Components.Schemas.ExecutionMetrics;
export type ExecutionMode = Components.Schemas.ExecutionMode;
export type ExecutionPattern = Components.Schemas.ExecutionPattern;
export type ExecutionResponse = Components.Schemas.ExecutionResponse;
export type ExecutionResult = Components.Schemas.ExecutionResult;
export type ExecutionStatus = Components.Schemas.ExecutionStatus;
export type ExecutionTrace = Components.Schemas.ExecutionTrace;
export type InputParameterDefinition = Components.Schemas.InputParameterDefinition;
export type InputParametersSchema = Components.Schemas.InputParametersSchema;
export type ListAgentsResponse = Components.Schemas.ListAgentsResponse;
export type ListConversationsResponse = Components.Schemas.ListConversationsResponse;
export type ListExecutionsResponse = Components.Schemas.ListExecutionsResponse;
export type MessageFeedback = Components.Schemas.MessageFeedback;
export type MessageItem = Components.Schemas.MessageItem;
export type ModelConfig = Components.Schemas.ModelConfig;
export type ParameterType = Components.Schemas.ParameterType;
export type PendingAction = Components.Schemas.PendingAction;
export type PreviewActionType = Components.Schemas.PreviewActionType;
export type PreviewChange = Components.Schemas.PreviewChange;
export type PreviewEntity = Components.Schemas.PreviewEntity;
export type PreviewValue = Components.Schemas.PreviewValue;
export type RejectExecutionRequest = Components.Schemas.RejectExecutionRequest;
export type SkillAvailability = Components.Schemas.SkillAvailability;
export type SkillCategory = Components.Schemas.SkillCategory;
export type StreamEvent = Components.Schemas.StreamEvent;
export type StreamingOptions = Components.Schemas.StreamingOptions;
export type SubmitFeedbackRequest = Components.Schemas.SubmitFeedbackRequest;
export type ToolDefinition = Components.Schemas.ToolDefinition;
export type ToolPreview = Components.Schemas.ToolPreview;
export type UpdateAgentRequest = Components.Schemas.UpdateAgentRequest;
