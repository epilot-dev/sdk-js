import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    export interface HeaderParameters {
        IfMatchUpdatedAt?: Parameters.IfMatchUpdatedAt;
    }
    namespace Parameters {
        export type CustomerChatAgentIdPath = string;
        export type IfMatchUpdatedAt = string;
    }
    export interface PathParameters {
        CustomerChatAgentIdPath?: Parameters.CustomerChatAgentIdPath;
    }
    namespace Schemas {
        /**
         * Action capabilities only (`open_quick_actions`): per-capability autonomy.
         * `draft` = suggest only (proposal + deep link, nothing opens),
         * `approval` = the customer confirms in a card first,
         * `automatic` = run immediately. Defaults to `approval` when the
         * capability is enabled without one; unknown values become `approval`;
         * values above the capability's maximum are clamped down.
         *
         */
        export type ActionAutonomy = "draft" | "approval" | "automatic";
        export interface AgentConfig {
            /**
             * Configured capability instances, up to 30 per agent. The same
             * catalog `type` may appear more than once when `label` (name) or
             * `guidance` (when to use) differs between siblings.
             *
             */
            capabilities: CapabilityInstance[];
            knowledgeSources: CustomerChatKnowledgeSource[];
            escalation: EscalationConfig;
            appearance: AppearanceConfig;
            /**
             * Admin-editable briefing in the default `appearance.language`. Prefilled with a place default on create; omitted on save keeps the saved value.
             */
            instructions?: string;
            /**
             * Briefings for each language in `appearance.languages` other than `appearance.language`. Only present once the agent speaks a second language.
             */
            instructionTranslations?: {
                de?: string;
                en?: string;
            };
            /**
             * Languages whose briefing changed in another language and are not checked yet.
             */
            instructionsNeedsReview?: ("de" | "en")[];
        }
        export interface AgentDefinition {
            domain?: /* Business domain selected in the agent builder. */ AgentDomain;
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
             * - website: Website chat, explicitly selected; currently supports anonymous execution
             * - all: Available on the existing non-website surfaces; website requires explicit selection
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
            knowledge_source_ids?: /* Knowledge source IDs available to this agent. An empty array clears the selection. */ KnowledgeSourceIds;
            version?: number;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
        }
        /**
         * Business domain selected in the agent builder.
         */
        export type AgentDomain = "customer_service" | "sales" | "billing" | "metering_grid" | "other";
        /**
         * Detail payload of the `agent-execution-status-update` event, published on
         * the AI Agents event bus with source `ai-agents`.
         *
         * `execution_context` and `input` are present on every status, so a consumer
         * can tell whether an execution is theirs, and what it belonged to, from the
         * terminal event alone — without a secondary lookup.
         *
         */
        export interface AgentExecutionEvent {
            /**
             * The agent execution this event reports on
             */
            executionId: string;
            agentId: /**
             * Agent identifier. Can be either:
             * - System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
             * - Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"
             *
             * example:
             * skill:email-categorizer
             */
            AgentId;
            orgId: string;
            userId?: string;
            execution_status: /**
             * Lifecycle status carried on an agent execution event.
             *
             * Deliberately narrower than `ExecutionStatus`, which is the stored status of
             * the execution row: `pending` and `running` both surface as `started`, and
             * `cancelled` surfaces as `failed`. Consumers must not assume the two
             * vocabularies are interchangeable.
             *
             * `queued` is non-terminal: the execution is waiting for executor capacity and will
             * be followed by `started`, and it can be published more than once if a throttled
             * execution is put back on the queue. Consumers must not treat it as an outcome.
             *
             */
            AgentExecutionEventStatus;
            execution_context?: /**
             * Where the execution was triggered from:
             * - flows: Triggered from workflow automation
             * - copilot: Triggered from copilot assistant
             * - api: Direct API call
             * - sharing: Triggered by sharing-api auto-sharing rules
             *
             */
            ExecutionContext;
            /**
             * The execution input, as supplied by the caller of the execute endpoint
             */
            input?: {
                [name: string]: any;
            };
            /**
             * Present on `completed` — the execution result
             */
            output?: {
                [name: string]: any;
            };
            /**
             * Present on `failed`
             */
            error?: {
                message?: string;
                code?: string;
                stack?: string;
            };
            /**
             * Wall-clock duration in milliseconds, present on `completed`
             */
            duration?: number;
            iterations?: number;
            iteration?: number;
            /**
             * Present on `approval_required` — what is awaiting approval
             */
            message?: string;
            toolCalls?: {
                name?: string;
                args?: {
                    [name: string]: any;
                };
            }[];
            timestamp?: string; // date-time
        }
        /**
         * Lifecycle status carried on an agent execution event.
         *
         * Deliberately narrower than `ExecutionStatus`, which is the stored status of
         * the execution row: `pending` and `running` both surface as `started`, and
         * `cancelled` surfaces as `failed`. Consumers must not assume the two
         * vocabularies are interchangeable.
         *
         * `queued` is non-terminal: the execution is waiting for executor capacity and will
         * be followed by `started`, and it can be published more than once if a throttled
         * execution is put back on the queue. Consumers must not treat it as an outcome.
         *
         */
        export type AgentExecutionEventStatus = "started" | "queued" | "completed" | "failed" | "approval_required";
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
        export interface AppearanceConfig {
            displayName: string;
            greeting: string;
            starters: string[];
            /**
             * Default language. The top-level texts are written in it.
             */
            language: "de" | "en";
            formOfAddress: "sie" | "du";
            /**
             * Languages customers can chat in. Only present with two or more; always includes `language`.
             */
            languages?: ("de" | "en")[];
            /**
             * Texts for each language in `languages` other than `language`.
             */
            translations?: {
                de?: LocalizedAppearance;
                en?: LocalizedAppearance;
            };
            /**
             * Per language, texts that changed in another language and are not checked yet.
             */
            needsReview?: {
                de?: LocalizedFieldList;
                en?: LocalizedFieldList;
            };
        }
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
        }
        export type CapabilityId = "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy";
        export interface CapabilityInstance {
            type: CapabilityId;
            /**
             * Stable id for this instance within the agent. Generated when
             * omitted; send it back unchanged on later saves.
             *
             */
            instanceId?: string;
            enabled: boolean;
            meterTypes?: string[];
            ticketType?: string;
            /**
             * `search_web` only. Websites web search may use, normalized to
             * `host[/path]` (scheme, `www.`, query, fragment and trailing slash
             * removed; host lowercased; duplicates dropped). Empty or missing
             * allows any website. When set, only `web_search.search` is granted.
             *
             */
            allowedDomains?: [
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
            autonomy?: /**
             * Action capabilities only (`open_quick_actions`): per-capability autonomy.
             * `draft` = suggest only (proposal + deep link, nothing opens),
             * `approval` = the customer confirms in a card first,
             * `automatic` = run immediately. Defaults to `approval` when the
             * capability is enabled without one; unknown values become `approval`;
             * values above the capability's maximum are clamped down.
             *
             */
            ActionAutonomy;
            /**
             * Admin label override. Kept on every capability so a disabled row stays listed.
             */
            label?: string;
            /**
             * Admin guidance. Kept on every capability so a disabled row stays listed; action capabilities also inject it into the prompt.
             */
            guidance?: string;
            /**
             * `open_quick_actions` only. Reserved tile allowlist (at most 200);
             * empty or missing allows every quick-action tile on the linked portal.
             *
             */
            blockIds?: string[];
            /**
             * `view_hems_energy` only. Hub integration installation id used by
             * HEMS portal tools (`portal.hems.snapshot` via list_devices, and
             * when searchDeviceDocs is on also get_vendors /
             * get_connection_options). Chosen in Agent Builder via the
             * integration picker.
             *
             */
            integrationId?: string; // uuid
            /**
             * `view_hems_energy` only. When true or omitted, grants device
             * onboarding docs tools (`portal.hems.vendors` via get_vendors +
             * `portal.hems.onboarding_docs` via get_connection_options) once
             * an integrationId is set. Set false to disable. Portal place only.
             *
             */
            searchDeviceDocs?: boolean;
        }
        export interface CapabilityState {
            enabled: boolean;
            meterTypes?: string[];
            ticketType?: string;
            /**
             * `search_web` only. Websites web search may use, normalized to
             * `host[/path]` (scheme, `www.`, query, fragment and trailing slash
             * removed; host lowercased; duplicates dropped). Empty or missing
             * allows any website. When set, only `web_search.search` is granted.
             *
             */
            allowedDomains?: [
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
            autonomy?: /**
             * Action capabilities only (`open_quick_actions`): per-capability autonomy.
             * `draft` = suggest only (proposal + deep link, nothing opens),
             * `approval` = the customer confirms in a card first,
             * `automatic` = run immediately. Defaults to `approval` when the
             * capability is enabled without one; unknown values become `approval`;
             * values above the capability's maximum are clamped down.
             *
             */
            ActionAutonomy;
            /**
             * Admin label override. Kept on every capability so a disabled row stays listed.
             */
            label?: string;
            /**
             * Admin guidance. Kept on every capability so a disabled row stays listed; action capabilities also inject it into the prompt.
             */
            guidance?: string;
            /**
             * `open_quick_actions` only. Reserved tile allowlist (at most 200);
             * empty or missing allows every quick-action tile on the linked portal.
             *
             */
            blockIds?: string[];
            /**
             * `view_hems_energy` only. Hub integration installation id used by
             * HEMS portal tools (`portal.hems.snapshot` via list_devices, and
             * when searchDeviceDocs is on also get_vendors /
             * get_connection_options). Chosen in Agent Builder via the
             * integration picker.
             *
             */
            integrationId?: string; // uuid
            /**
             * `view_hems_energy` only. When true or omitted, grants device
             * onboarding docs tools (`portal.hems.vendors` via get_vendors +
             * `portal.hems.onboarding_docs` via get_connection_options) once
             * an integrationId is set. Set false to disable. Portal place only.
             *
             */
            searchDeviceDocs?: boolean;
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
            /**
             * Agent Builder place-agent preview: when true, portal tools return
             * synthetic demo fixtures instead of calling customer-portal-api,
             * and execution mode is forced to draft.
             *
             */
            preview_demo?: boolean;
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
            domain?: /* Business domain selected in the agent builder. */ AgentDomain;
            availability?: [
                /**
                 * Where the skill/agent is available:
                 * - flows: Available in workflow automations
                 * - copilot: Available as a sub-agent in copilot
                 * - portals: Available in end-user self-service portals
                 * - website: Website chat, explicitly selected; currently supports anonymous execution
                 * - all: Available on the existing non-website surfaces; website requires explicit selection
                 *
                 */
                SkillAvailability,
                .../**
                 * Where the skill/agent is available:
                 * - flows: Available in workflow automations
                 * - copilot: Available as a sub-agent in copilot
                 * - portals: Available in end-user self-service portals
                 * - website: Website chat, explicitly selected; currently supports anonymous execution
                 * - all: Available on the existing non-website surfaces; website requires explicit selection
                 *
                 */
                SkillAvailability[]
            ];
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
            knowledge_source_ids?: /* Knowledge source IDs available to this agent. An empty array clears the selection. */ KnowledgeSourceIds;
        }
        export interface CreateCustomerChatAgentRequest {
            place: CustomerChatPlace;
            internal_name?: string;
        }
        export interface CreateKnowledgeFileUploadRequest {
            filename: string;
            mime_type: string;
            size_bytes: number; // int64
        }
        export interface CreateKnowledgeFileUploadResponse {
            source_id: string; // uuid
            upload_url: string; // uri
            upload_fields: {
                [name: string]: string;
            };
            expires_at: string; // date-time
        }
        export interface CustomerChatAgent {
            org_id: string;
            /**
             * Stable id of the customer chat agent; equal to runtime_agent_id.
             */
            agent_id: string; // uuid
            place: CustomerChatPlace;
            internal_name: string;
            runtime_agent_id: string; // uuid
            config: AgentConfig;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface CustomerChatCapabilityCatalogEntry {
            id: CapabilityId;
            places: CustomerChatPlace[];
            /**
             * An agent can have this capability at most once. Agents that already
             * have more instances keep them, but cannot add another.
             *
             */
            singleInstance?: boolean;
            /**
             * Only offer this capability when the organization has a matching
             * integration set up.
             *
             */
            requiresIntegration?: boolean;
        }
        export interface CustomerChatCasRequest {
            updated_at?: string; // date-time
        }
        export interface CustomerChatKnowledgeSource {
            id: string;
            type: CustomerChatKnowledgeSourceType;
            title: string;
            targetId: string;
            detail?: string;
        }
        export type CustomerChatKnowledgeSourceType = "portal_page" | "document" | "catalogue" | "url";
        export type CustomerChatPlace = "website" | "portal";
        export interface DeleteCustomerChatAgentRequest {
            updated_at?: string; // date-time
            /**
             * Portal linked to this agent (`feature_settings.portal_copilot_agent_id`).
             * When set, only that portal is unlinked. When omitted for a portal agent,
             * org portal configs are scanned for matching links.
             *
             */
            portal_id?: string; // uuid
        }
        export interface Error {
            error?: string;
            message?: string;
            details?: {
                [key: string]: any;
            };
        }
        export interface EscalationConfig {
            websiteHandover: WebsiteHandover;
        }
        export interface ExecuteAgentRequest {
            /**
             * `sync` runs the skill inside the request and answers 200 with the completed execution, or 422/504/500
             * with the failed execution's id in `details.execution_id`. Only for direct, tool-less, automatic skills;
             * the model call is cut off after 27 seconds.
             *
             */
            mode?: "auto" | "stream" | "async" | "sync";
            input?: {
                /**
                 * Free-text instruction or query for the agent
                 */
                message?: string;
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
                /**
                 * The file the agent should look at, referenced by S3 object. Only accepted by skills
                 * that declare attachment support (currently direct-mode document skills). The object is
                 * read by the execution Lambda and passed to the model as an image or document content
                 * block; images must be JPEG, PNG, GIF or WebP, documents PDF, DOCX, DOC, XLSX, XLS,
                 * CSV, TXT, HTML or Markdown. Callers are expected to downscale images and cap document
                 * pages before referencing them.
                 *
                 */
                attachment?: {
                    s3ref: {
                        bucket: string;
                        key: string;
                    };
                    /**
                     * Mime type of the object, decides whether it is sent as an image or a document block.
                     */
                    mime_type: string;
                    filename?: string;
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
            execution_context?: /**
             * Where the execution was triggered from:
             * - flows: Triggered from workflow automation
             * - copilot: Triggered from copilot assistant
             * - api: Direct API call
             * - sharing: Triggered by sharing-api auto-sharing rules
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
         * - sharing: Triggered by sharing-api auto-sharing rules
         *
         */
        export type ExecutionContext = "flows" | "copilot" | "api" | "sharing";
        export type ExecutionError = {
            code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR";
            message?: string;
            details?: {
                [key: string]: any;
            };
        } | null;
        export interface ExecutionFeedback {
            rating: "up" | "down";
            comment?: string;
            user_id: string;
            submitted_at: string; // date-time
        }
        export interface ExecutionFeedbackResponse {
            feedback: {
                rating: "up" | "down";
                comment?: string;
                user_id: string;
                submitted_at: string; // date-time
            } | null;
        }
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
             * - sharing: Triggered by sharing-api auto-sharing rules
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
        export type ExecutionStatus = "pending" | "queued" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled";
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
        export interface KnowledgeFileSource {
            type: "file";
            source_id: string; // uuid
            filename: string;
            mime_type: string;
            size_bytes: number; // int64
            /**
             * Whether the source is available for agent retrieval.
             */
            ready: boolean;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface KnowledgeFileSourceRegisteredEvent {
            orgId: string;
            sourceId: string; // uuid
            type: "file";
            bucket: string;
            key: string;
        }
        export type KnowledgeSource = KnowledgeFileSource;
        /**
         * Published when a knowledge source is deleted.
         */
        export interface KnowledgeSourceDeletedEvent {
            orgId: string;
            sourceId: string; // uuid
            type: "file";
        }
        /**
         * Knowledge source IDs available to this agent. An empty array clears the selection.
         */
        export type KnowledgeSourceIds = string /* uuid */[];
        /**
         * Published by a knowledge processing pipeline after all derived data for
         * the source has been stored and is available for agent retrieval. The
         * event uses source `knowledge-processing` and detail type
         * `knowledge-source-processing-completed` on the AI Agents event bus.
         *
         */
        export interface KnowledgeSourceProcessingCompletedEvent {
            orgId: string;
            sourceId: string; // uuid
        }
        /**
         * Detail payload of the `knowledge-source-registered` event, published on
         * the AI Agents event bus with source `ai-agents` after the source record
         * exists in DynamoDB. Consumers must process `sourceId` idempotently.
         *
         */
        export type KnowledgeSourceRegisteredEvent = /**
         * Detail payload of the `knowledge-source-registered` event, published on
         * the AI Agents event bus with source `ai-agents` after the source record
         * exists in DynamoDB. Consumers must process `sourceId` idempotently.
         *
         */
        KnowledgeFileSourceRegisteredEvent;
        export interface ListAgentsResponse {
            agents?: AgentDefinition[];
            next_cursor?: string | null;
        }
        export interface ListConversationsResponse {
            conversations?: ConversationItem[];
            next_cursor?: string | null;
        }
        export interface ListCustomerChatCapabilitiesResponse {
            capabilities: CustomerChatCapabilityCatalogEntry[];
        }
        export interface ListCustomerChatResponse {
            agents: CustomerChatAgent[];
        }
        export interface ListExecutionsResponse {
            executions?: ExecutionResponse[];
            next_cursor?: string | null;
        }
        export interface ListKnowledgeSourcesResponse {
            sources: KnowledgeSource[];
        }
        export interface LocalizedAppearance {
            displayName: string;
            greeting: string;
            starters: string[];
        }
        export type LocalizedFieldList = ("displayName" | "greeting" | "starters")[];
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
        export interface PutExecutionFeedbackRequest {
            rating: "up" | "down";
            comment?: string;
        }
        export interface RejectExecutionRequest {
            /**
             * Reason for rejection
             */
            reason: string;
        }
        export interface RenameCustomerChatAgentRequest {
            internal_name: string;
            updated_at?: string; // date-time
        }
        export interface SaveCustomerChatConfigRequest {
            config: AgentConfig;
            updated_at?: string; // date-time
        }
        /**
         * Where the skill/agent is available:
         * - flows: Available in workflow automations
         * - copilot: Available as a sub-agent in copilot
         * - portals: Available in end-user self-service portals
         * - website: Website chat, explicitly selected; currently supports anonymous execution
         * - all: Available on the existing non-website surfaces; website requires explicit selection
         *
         */
        export type SkillAvailability = "flows" | "copilot" | "portals" | "website" | "all";
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
            domain?: /* Business domain selected in the agent builder. */ AgentDomain;
            availability?: [
                /**
                 * Where the skill/agent is available:
                 * - flows: Available in workflow automations
                 * - copilot: Available as a sub-agent in copilot
                 * - portals: Available in end-user self-service portals
                 * - website: Website chat, explicitly selected; currently supports anonymous execution
                 * - all: Available on the existing non-website surfaces; website requires explicit selection
                 *
                 */
                SkillAvailability,
                .../**
                 * Where the skill/agent is available:
                 * - flows: Available in workflow automations
                 * - copilot: Available as a sub-agent in copilot
                 * - portals: Available in end-user self-service portals
                 * - website: Website chat, explicitly selected; currently supports anonymous execution
                 * - all: Available on the existing non-website surfaces; website requires explicit selection
                 *
                 */
                SkillAvailability[]
            ];
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
            knowledge_source_ids?: /* Knowledge source IDs available to this agent. An empty array clears the selection. */ KnowledgeSourceIds;
        }
        export interface WebsiteHandover {
            kind: "phone" | "email" | "journey" | "unset";
            value: string;
            journeyId?: string;
            journeyName?: string;
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
    namespace CreateCustomerChatAgent {
        export type RequestBody = Components.Schemas.CreateCustomerChatAgentRequest;
        namespace Responses {
            export type $201 = Components.Schemas.CustomerChatAgent;
            export type $400 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
        }
    }
    namespace CreateKnowledgeFileUpload {
        export type RequestBody = Components.Schemas.CreateKnowledgeFileUploadRequest;
        namespace Responses {
            export type $201 = Components.Schemas.CreateKnowledgeFileUploadResponse;
            export type $400 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
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
    namespace DeleteCustomerChatAgent {
        export interface HeaderParameters {
            "If-Match"?: Parameters.IfMatch;
        }
        namespace Parameters {
            export type AgentId = string;
            export type IfMatch = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export type RequestBody = Components.Schemas.DeleteCustomerChatAgentRequest;
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
        }
    }
    namespace DeleteKnowledgeSource {
        namespace Responses {
            export interface $204 {
            }
            export type $409 = Components.Schemas.Error;
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
            export type $201 = Components.Schemas.ExecutionResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $422 = Components.Schemas.Error;
            export type $504 = Components.Schemas.Error;
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
    namespace GetCustomerChatAgent {
        namespace Parameters {
            export type AgentId = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CustomerChatAgent;
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
    namespace GetExecutionFeedback {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionFeedbackResponse;
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
    namespace GetKnowledgeSource {
        namespace Responses {
            export type $200 = Components.Schemas.KnowledgeSource;
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
             * - website: Website chat, explicitly selected; currently supports anonymous execution
             * - all: Available on the existing non-website surfaces; website requires explicit selection
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
    namespace ListCustomerChat {
        namespace Responses {
            export type $200 = Components.Schemas.ListCustomerChatResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListCustomerChatCapabilities {
        namespace Responses {
            export type $200 = Components.Schemas.ListCustomerChatCapabilitiesResponse;
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
    namespace ListKnowledgeSources {
        namespace Responses {
            export type $200 = Components.Schemas.ListKnowledgeSourcesResponse;
        }
    }
    namespace PutExecutionFeedback {
        namespace Parameters {
            export type ExecutionId = string; // uuid
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId /* uuid */;
        }
        export type RequestBody = Components.Schemas.PutExecutionFeedbackRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ExecutionFeedbackResponse;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
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
    namespace RenameCustomerChatAgent {
        export interface HeaderParameters {
            "If-Match"?: Parameters.IfMatch;
        }
        namespace Parameters {
            export type AgentId = string;
            export type IfMatch = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export type RequestBody = Components.Schemas.RenameCustomerChatAgentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CustomerChatAgent;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
        }
    }
    namespace SaveCustomerChatConfig {
        export interface HeaderParameters {
            "If-Match"?: Parameters.IfMatch;
        }
        namespace Parameters {
            export type AgentId = string;
            export type IfMatch = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export type RequestBody = Components.Schemas.SaveCustomerChatConfigRequest;
        namespace Responses {
            export type $200 = Components.Schemas.CustomerChatAgent;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
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
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
        }
    }
    namespace V1KnowledgeSources$SourceId {
        namespace Parameters {
            export type SourceId = string; // uuid
        }
        export interface PathParameters {
            source_id: Parameters.SourceId /* uuid */;
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
   * listCustomerChat - List customer chat agents
   * 
   * Returns the org's website agent (at most one) first, then its portal agents ordered by created_at ascending.
   */
  'listCustomerChat'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCustomerChat.Responses.$200>
  /**
   * createCustomerChatAgent - Create a customer chat agent with default config
   * 
   * Mints agent_id (equal to runtime_agent_id) and compiles the runtime AgentRecord. An org can have at most one website agent (409 on a second one) and any number of portal agents.
   */
  'createCustomerChatAgent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCustomerChatAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCustomerChatAgent.Responses.$201>
  /**
   * listCustomerChatCapabilities - List the capability catalog
   * 
   * Capabilities admins can enable and the places they are offered on.
   * Single source of truth for Agent Builder; capabilities that are no
   * longer offered are omitted, while already-enabled instances of them
   * keep working.
   * 
   */
  'listCustomerChatCapabilities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCustomerChatCapabilities.Responses.$200>
  /**
   * getCustomerChatAgent - Get a customer chat agent
   */
  'getCustomerChatAgent'(
    parameters?: Parameters<Paths.GetCustomerChatAgent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerChatAgent.Responses.$200>
  /**
   * renameCustomerChatAgent - Rename a customer chat agent
   */
  'renameCustomerChatAgent'(
    parameters?: Parameters<Paths.RenameCustomerChatAgent.HeaderParameters & Paths.RenameCustomerChatAgent.PathParameters> | null,
    data?: Paths.RenameCustomerChatAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RenameCustomerChatAgent.Responses.$200>
  /**
   * deleteCustomerChatAgent - Remove a customer chat agent and its runtime projection
   * 
   * Deletes the place agent. For portal agents, also clears
   * `feature_settings.portal_copilot_agent_id` on linked portals (pass
   * `portal_id` when known, otherwise the API scans org portal configs)
   * before deleting, so a single request cannot leave an orphan agent.
   * 
   */
  'deleteCustomerChatAgent'(
    parameters?: Parameters<Paths.DeleteCustomerChatAgent.HeaderParameters & Paths.DeleteCustomerChatAgent.PathParameters> | null,
    data?: Paths.DeleteCustomerChatAgent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCustomerChatAgent.Responses.$204>
  /**
   * saveCustomerChatConfig - Replace the AgentConfig and compile the runtime AgentRecord
   */
  'saveCustomerChatConfig'(
    parameters?: Parameters<Paths.SaveCustomerChatConfig.HeaderParameters & Paths.SaveCustomerChatConfig.PathParameters> | null,
    data?: Paths.SaveCustomerChatConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveCustomerChatConfig.Responses.$200>
  /**
   * listKnowledgeSources - List knowledge sources
   */
  'listKnowledgeSources'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListKnowledgeSources.Responses.$200>
  /**
   * createKnowledgeFileUpload - Create a knowledge file upload
   * 
   * Returns a direct S3 upload. The source becomes available after S3 confirms the completed object.
   */
  'createKnowledgeFileUpload'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateKnowledgeFileUpload.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateKnowledgeFileUpload.Responses.$201>
  /**
   * getKnowledgeSource - Get a knowledge source
   */
  'getKnowledgeSource'(
    parameters?: Parameters<Paths.V1KnowledgeSources$SourceId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetKnowledgeSource.Responses.$200>
  /**
   * deleteKnowledgeSource - Delete a knowledge source
   */
  'deleteKnowledgeSource'(
    parameters?: Parameters<Paths.V1KnowledgeSources$SourceId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteKnowledgeSource.Responses.$204>
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
  ): OperationResponse<Paths.ExecuteAgent.Responses.$200 | Paths.ExecuteAgent.Responses.$201>
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
   * 
   * List executions
   */
  'listExecutions'(
    parameters?: Parameters<Paths.ListExecutions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListExecutions.Responses.$200>
  /**
   * getExecution - Get execution by ID
   * 
   * Get execution by ID
   */
  'getExecution'(
    parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecution.Responses.$200>
  /**
   * cancelExecution - Cancel execution
   * 
   * Cancel execution
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
   * getExecutionFeedback - Get execution feedback
   * 
   * Returns the authenticated user's feedback for an execution.
   */
  'getExecutionFeedback'(
    parameters?: Parameters<Paths.GetExecutionFeedback.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecutionFeedback.Responses.$200>
  /**
   * putExecutionFeedback - Submit execution feedback
   * 
   * Upserts thumbs up/down feedback and mirrors it to the execution's Langfuse trace.
   */
  'putExecutionFeedback'(
    parameters?: Parameters<Paths.PutExecutionFeedback.PathParameters> | null,
    data?: Paths.PutExecutionFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutExecutionFeedback.Responses.$200>
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
  ['/v1/customer-chat']: {
    /**
     * listCustomerChat - List customer chat agents
     * 
     * Returns the org's website agent (at most one) first, then its portal agents ordered by created_at ascending.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCustomerChat.Responses.$200>
    /**
     * createCustomerChatAgent - Create a customer chat agent with default config
     * 
     * Mints agent_id (equal to runtime_agent_id) and compiles the runtime AgentRecord. An org can have at most one website agent (409 on a second one) and any number of portal agents.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCustomerChatAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCustomerChatAgent.Responses.$201>
  }
  ['/v1/customer-chat/capabilities']: {
    /**
     * listCustomerChatCapabilities - List the capability catalog
     * 
     * Capabilities admins can enable and the places they are offered on.
     * Single source of truth for Agent Builder; capabilities that are no
     * longer offered are omitted, while already-enabled instances of them
     * keep working.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCustomerChatCapabilities.Responses.$200>
  }
  ['/v1/customer-chat/{agent_id}']: {
    /**
     * getCustomerChatAgent - Get a customer chat agent
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomerChatAgent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerChatAgent.Responses.$200>
    /**
     * renameCustomerChatAgent - Rename a customer chat agent
     */
    'patch'(
      parameters?: Parameters<Paths.RenameCustomerChatAgent.HeaderParameters & Paths.RenameCustomerChatAgent.PathParameters> | null,
      data?: Paths.RenameCustomerChatAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RenameCustomerChatAgent.Responses.$200>
    /**
     * deleteCustomerChatAgent - Remove a customer chat agent and its runtime projection
     * 
     * Deletes the place agent. For portal agents, also clears
     * `feature_settings.portal_copilot_agent_id` on linked portals (pass
     * `portal_id` when known, otherwise the API scans org portal configs)
     * before deleting, so a single request cannot leave an orphan agent.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCustomerChatAgent.HeaderParameters & Paths.DeleteCustomerChatAgent.PathParameters> | null,
      data?: Paths.DeleteCustomerChatAgent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCustomerChatAgent.Responses.$204>
  }
  ['/v1/customer-chat/{agent_id}/config']: {
    /**
     * saveCustomerChatConfig - Replace the AgentConfig and compile the runtime AgentRecord
     */
    'put'(
      parameters?: Parameters<Paths.SaveCustomerChatConfig.HeaderParameters & Paths.SaveCustomerChatConfig.PathParameters> | null,
      data?: Paths.SaveCustomerChatConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveCustomerChatConfig.Responses.$200>
  }
  ['/v1/knowledge/sources']: {
    /**
     * listKnowledgeSources - List knowledge sources
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListKnowledgeSources.Responses.$200>
  }
  ['/v1/knowledge/file-uploads']: {
    /**
     * createKnowledgeFileUpload - Create a knowledge file upload
     * 
     * Returns a direct S3 upload. The source becomes available after S3 confirms the completed object.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateKnowledgeFileUpload.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateKnowledgeFileUpload.Responses.$201>
  }
  ['/v1/knowledge/sources/{source_id}']: {
    /**
     * getKnowledgeSource - Get a knowledge source
     */
    'get'(
      parameters?: Parameters<Paths.V1KnowledgeSources$SourceId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetKnowledgeSource.Responses.$200>
    /**
     * deleteKnowledgeSource - Delete a knowledge source
     */
    'delete'(
      parameters?: Parameters<Paths.V1KnowledgeSources$SourceId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteKnowledgeSource.Responses.$204>
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
    ): OperationResponse<Paths.ExecuteAgent.Responses.$200 | Paths.ExecuteAgent.Responses.$201>
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
     * 
     * List executions
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
     * 
     * Get execution by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecution.Responses.$200>
    /**
     * cancelExecution - Cancel execution
     * 
     * Cancel execution
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
  ['/v1/executions/{execution_id}/feedback']: {
    /**
     * getExecutionFeedback - Get execution feedback
     * 
     * Returns the authenticated user's feedback for an execution.
     */
    'get'(
      parameters?: Parameters<Paths.GetExecutionFeedback.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecutionFeedback.Responses.$200>
    /**
     * putExecutionFeedback - Submit execution feedback
     * 
     * Upserts thumbs up/down feedback and mirrors it to the execution's Langfuse trace.
     */
    'put'(
      parameters?: Parameters<Paths.PutExecutionFeedback.PathParameters> | null,
      data?: Paths.PutExecutionFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutExecutionFeedback.Responses.$200>
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


export type ActionAutonomy = Components.Schemas.ActionAutonomy;
export type AgentConfig = Components.Schemas.AgentConfig;
export type AgentDefinition = Components.Schemas.AgentDefinition;
export type AgentDomain = Components.Schemas.AgentDomain;
export type AgentExecutionEvent = Components.Schemas.AgentExecutionEvent;
export type AgentExecutionEventStatus = Components.Schemas.AgentExecutionEventStatus;
export type AgentId = Components.Schemas.AgentId;
export type AgentSource = Components.Schemas.AgentSource;
export type AppearanceConfig = Components.Schemas.AppearanceConfig;
export type ApproveExecutionRequest = Components.Schemas.ApproveExecutionRequest;
export type CapabilityId = Components.Schemas.CapabilityId;
export type CapabilityInstance = Components.Schemas.CapabilityInstance;
export type CapabilityState = Components.Schemas.CapabilityState;
export type ChatMessage = Components.Schemas.ChatMessage;
export type ChatRequest = Components.Schemas.ChatRequest;
export type ConversationItem = Components.Schemas.ConversationItem;
export type ConversationWithMessages = Components.Schemas.ConversationWithMessages;
export type CreateAgentRequest = Components.Schemas.CreateAgentRequest;
export type CreateCustomerChatAgentRequest = Components.Schemas.CreateCustomerChatAgentRequest;
export type CreateKnowledgeFileUploadRequest = Components.Schemas.CreateKnowledgeFileUploadRequest;
export type CreateKnowledgeFileUploadResponse = Components.Schemas.CreateKnowledgeFileUploadResponse;
export type CustomerChatAgent = Components.Schemas.CustomerChatAgent;
export type CustomerChatCapabilityCatalogEntry = Components.Schemas.CustomerChatCapabilityCatalogEntry;
export type CustomerChatCasRequest = Components.Schemas.CustomerChatCasRequest;
export type CustomerChatKnowledgeSource = Components.Schemas.CustomerChatKnowledgeSource;
export type CustomerChatKnowledgeSourceType = Components.Schemas.CustomerChatKnowledgeSourceType;
export type CustomerChatPlace = Components.Schemas.CustomerChatPlace;
export type DeleteCustomerChatAgentRequest = Components.Schemas.DeleteCustomerChatAgentRequest;
export type Error = Components.Schemas.Error;
export type EscalationConfig = Components.Schemas.EscalationConfig;
export type ExecuteAgentRequest = Components.Schemas.ExecuteAgentRequest;
export type ExecutionContext = Components.Schemas.ExecutionContext;
export type ExecutionError = Components.Schemas.ExecutionError;
export type ExecutionFeedback = Components.Schemas.ExecutionFeedback;
export type ExecutionFeedbackResponse = Components.Schemas.ExecutionFeedbackResponse;
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
export type KnowledgeFileSource = Components.Schemas.KnowledgeFileSource;
export type KnowledgeFileSourceRegisteredEvent = Components.Schemas.KnowledgeFileSourceRegisteredEvent;
export type KnowledgeSource = Components.Schemas.KnowledgeSource;
export type KnowledgeSourceDeletedEvent = Components.Schemas.KnowledgeSourceDeletedEvent;
export type KnowledgeSourceIds = Components.Schemas.KnowledgeSourceIds;
export type KnowledgeSourceProcessingCompletedEvent = Components.Schemas.KnowledgeSourceProcessingCompletedEvent;
export type KnowledgeSourceRegisteredEvent = Components.Schemas.KnowledgeSourceRegisteredEvent;
export type ListAgentsResponse = Components.Schemas.ListAgentsResponse;
export type ListConversationsResponse = Components.Schemas.ListConversationsResponse;
export type ListCustomerChatCapabilitiesResponse = Components.Schemas.ListCustomerChatCapabilitiesResponse;
export type ListCustomerChatResponse = Components.Schemas.ListCustomerChatResponse;
export type ListExecutionsResponse = Components.Schemas.ListExecutionsResponse;
export type ListKnowledgeSourcesResponse = Components.Schemas.ListKnowledgeSourcesResponse;
export type LocalizedAppearance = Components.Schemas.LocalizedAppearance;
export type LocalizedFieldList = Components.Schemas.LocalizedFieldList;
export type MessageFeedback = Components.Schemas.MessageFeedback;
export type MessageItem = Components.Schemas.MessageItem;
export type ModelConfig = Components.Schemas.ModelConfig;
export type ParameterType = Components.Schemas.ParameterType;
export type PendingAction = Components.Schemas.PendingAction;
export type PreviewActionType = Components.Schemas.PreviewActionType;
export type PreviewChange = Components.Schemas.PreviewChange;
export type PreviewEntity = Components.Schemas.PreviewEntity;
export type PreviewValue = Components.Schemas.PreviewValue;
export type PutExecutionFeedbackRequest = Components.Schemas.PutExecutionFeedbackRequest;
export type RejectExecutionRequest = Components.Schemas.RejectExecutionRequest;
export type RenameCustomerChatAgentRequest = Components.Schemas.RenameCustomerChatAgentRequest;
export type SaveCustomerChatConfigRequest = Components.Schemas.SaveCustomerChatConfigRequest;
export type SkillAvailability = Components.Schemas.SkillAvailability;
export type SkillCategory = Components.Schemas.SkillCategory;
export type StreamEvent = Components.Schemas.StreamEvent;
export type StreamingOptions = Components.Schemas.StreamingOptions;
export type SubmitFeedbackRequest = Components.Schemas.SubmitFeedbackRequest;
export type ToolDefinition = Components.Schemas.ToolDefinition;
export type ToolPreview = Components.Schemas.ToolPreview;
export type UpdateAgentRequest = Components.Schemas.UpdateAgentRequest;
export type WebsiteHandover = Components.Schemas.WebsiteHandover;
