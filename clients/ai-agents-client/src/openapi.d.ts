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
        export type ScriptRunIdPath = string; // ^[0-9a-f-]{36}\.[0-9a-f-]{36}$
        export type SessionIdPath = string; // uuid ^[0-9a-f-]{36}$
    }
    export interface PathParameters {
        CustomerChatAgentIdPath?: Parameters.CustomerChatAgentIdPath;
        SessionIdPath?: Parameters.SessionIdPath /* uuid ^[0-9a-f-]{36}$ */;
        ScriptRunIdPath?: Parameters.ScriptRunIdPath /* ^[0-9a-f-]{36}\.[0-9a-f-]{36}$ */;
    }
    namespace Responses {
        export type SessionsBadRequest = /* An error of the Sessions API */ Schemas.SessionsError;
        export type SessionsConflict = /* An error of the Sessions API */ Schemas.SessionsError;
        export type SessionsInternalError = /* An error of the Sessions API */ Schemas.SessionsError;
        export type SessionsNotEnabled = /* A refusal the client tells the user about; `error` repeats it, like every other error */ Schemas.Refusal;
        export type SessionsNotFound = /* An error of the Sessions API */ Schemas.SessionsError;
        export type SessionsPayloadTooLarge = /* An error of the Sessions API */ Schemas.SessionsError;
        export type SessionsQuotaExceeded = /* A refusal the client tells the user about; `error` repeats it, like every other error */ Schemas.Refusal;
        export type SessionsUnauthorized = /* An error of the Sessions API */ Schemas.SessionsError;
    }
    namespace Schemas {
        /**
         * Who may use a capability. `anonymous` = every visitor, `authenticated` =
         * only a customer authenticated by email code or portal login; others are
         * asked to sign in first. Each capability type has a default and a
         * minimum; values below the minimum are raised. Used today by
         * `open_journey`, `open_link` and `submit_meter_reading` (always
         * `authenticated`); other capability types ignore it.
         *
         */
        export type AccessLevel = "anonymous" | "authenticated";
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
        /**
         * Access profile of the agent's grant at the Access Token API (its ceiling)
         */
        export type AgentAuthAccessProfile = "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full";
        export interface AgentAuthActivationRequest {
            access_profile: /* Access profile of the agent's grant at the Access Token API (its ceiling) */ AgentAuthAccessProfile;
            /**
             * Purpose shown in the agent's token names and the admin view; required for any profile but `read`
             * example:
             * Labels inbound emails and updates their tickets
             */
            reason?: string;
        }
        export interface AgentAuthStatus {
            status: "inactive" | "active" | "expired";
            /**
             * The agent's id at the Access Token API
             */
            agent_auth_agent_id?: string;
            activation_id?: string;
            access_profile?: /* Access profile of the agent's grant at the Access Token API (its ceiling) */ AgentAuthAccessProfile;
            /**
             * The admin who activated it; the agent acts with their current roles
             */
            owner_user_id?: string;
            /**
             * End of the activation's lifetime (90 days); it is not renewed automatically
             */
            expires_at?: string; // date-time
            /**
             * `active` and expiring within 14 days: an admin should activate the agent again, or its Flows runs fail
             * with `AGENT_IDENTITY_EXPIRED` once it has expired.
             *
             */
            expiring_soon?: boolean;
        }
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
             * Present on `completed` — the execution result. A result too large for the event
             * (above ~200 KB) is replaced by `{ result_ref: { bucket, key, bytes }, preview: { response } }`;
             * read the full result with `GET /v1/executions/{execution_id}`.
             *
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
         * Agent Builder preview: unsaved editor settings applied to the saved
         * custom agent for this request only. Nothing is persisted. Requires
         * preview_demo on /v1/chat and forces draft execution mode on
         * /v1/agents/{agent_id}/execute/stream. Not supported for system skills
         * or Website Chat agents.
         *
         */
        export interface AgentPreviewOverride {
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
        /**
         * - system: Pre-built by epilot (system skills)
         * - custom: Created by organization
         *
         */
        export type AgentSource = "system" | "custom";
        /**
         * One answer per question, in order: the labels picked, and/or the user's own words
         */
        export interface Answer {
            selected: [
                string?,
                string?,
                string?,
                string?
            ];
            other?: string;
        }
        export interface AppearanceConfig {
            displayName: string;
            greeting: string;
            starters: string[];
            /**
             * One key per starter, in the order of `starters` and the same for a starter in every language; websites ask a starter by it with `startStarter(key)`. Absent for starters saved before keys, which readers key `starter-<position>`.
             */
            starterKeys?: string /* ^[A-Za-z0-9_-]{1,64}$ */[];
            /**
             * Text on the Website Chat's epilot button, in the default language. Website place only; without it the Website Chat shows its own label.
             */
            launcherLabel?: string;
            /**
             * Default language. The top-level texts are written in it.
             */
            language: "de" | "en";
            formOfAddress: "sie" | "du";
            /**
             * Suggest follow-ups after a reply. Defaults to on for website agents, off for portal agents.
             */
            followUps?: boolean;
            /**
             * Configured content languages for widget chrome (name, greeting, starters) and per-language instructions. Only present with two or more; always includes `language`.
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
        export interface ApplyScriptRunRequest {
            /**
             * What the user confirmed (trimmed)
             */
            approvalSummary: string; // \S
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
        /**
         * A change the agent asks to make, exactly as it will run
         */
        export interface BatchChange {
            operationId: string;
            service?: string;
            method: string;
            path: string;
            effect: "read" | "write" | "config" | "destructive";
            pathParameters?: {
                [name: string]: any;
            };
            queryParameters?: {
                [name: string]: any;
            };
            /**
             * The request body
             */
            body?: any;
            /**
             * The name of the record it changes
             */
            title?: string;
        }
        export type CapabilityId = "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading";
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
            accessLevel?: /**
             * Who may use a capability. `anonymous` = every visitor, `authenticated` =
             * only a customer authenticated by email code or portal login; others are
             * asked to sign in first. Each capability type has a default and a
             * minimum; values below the minimum are raised. Used today by
             * `open_journey`, `open_link` and `submit_meter_reading` (always
             * `authenticated`); other capability types ignore it.
             *
             */
            AccessLevel;
            intent?: /* What a journey, link or in-chat capability is for; names the action in the chat and in analytics. */ SelfServiceIntent;
            /**
             * `open_journey` only. The journey the Website Chat embeds; the action is offered only once set.
             */
            journeyId?: string; // uuid
            /**
             * `open_journey` only. The journey's name, kept for display.
             */
            journeyName?: string;
            /**
             * `open_link` only. The page the Website Chat opens; the action is offered only once set.
             */
            url?: string; // ^https://
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
            accessLevel?: /**
             * Who may use a capability. `anonymous` = every visitor, `authenticated` =
             * only a customer authenticated by email code or portal login; others are
             * asked to sign in first. Each capability type has a default and a
             * minimum; values below the minimum are raised. Used today by
             * `open_journey`, `open_link` and `submit_meter_reading` (always
             * `authenticated`); other capability types ignore it.
             *
             */
            AccessLevel;
            intent?: /* What a journey, link or in-chat capability is for; names the action in the chat and in analytics. */ SelfServiceIntent;
            /**
             * `open_journey` only. The journey the Website Chat embeds; the action is offered only once set.
             */
            journeyId?: string; // uuid
            /**
             * `open_journey` only. The journey's name, kept for display.
             */
            journeyName?: string;
            /**
             * `open_link` only. The page the Website Chat opens; the action is offered only once set.
             */
            url?: string; // ^https://
            /**
             * `view_hems_energy` only. When true or omitted, grants device
             * onboarding docs tools (`portal.hems.vendors` via get_vendors +
             * `portal.hems.onboarding_docs` via get_connection_options) once
             * an integrationId is set. Set false to disable. Portal place only.
             *
             */
            searchDeviceDocs?: boolean;
        }
        /**
         * What happened to one change of an approved batch
         */
        export interface ChangeOutcome {
            change: number;
            status: "ok" | "failed" | "skipped";
            operationId: string;
            error?: string;
            /**
             * A failed change whose result was lost; it may have taken effect
             */
            mayHaveRun?: boolean;
            record?: {
                _id?: string;
                _title?: string;
                _schema?: string;
            };
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
             * User message. Required unless `tool_approval` is set.
             */
            message?: string;
            tool_approval?: /**
             * The user's answer to an `approval_required` event (Luna behind the
             * `luna-tool-approvals` flag). Requires the asking turn's `conversationId` and `agentId`; `message` may
             * be omitted. On approve the server runs exactly the pending tool call
             * stored in the conversation, streams its `tool_call` / `tool_result`
             * and continues the turn. Errors: `APPROVAL_INVALID`,
             * `APPROVAL_EXPIRED`, `APPROVAL_USED`, `APPROVAL_UNAVAILABLE`.
             *
             */
            ToolApprovalAnswer;
            /**
             * Conversation ID for server-side memory. If provided, loads history from DynamoDB.
             */
            conversationId?: string; // uuid
            /**
             * Client-provided message history. A non-empty array overrides
             * server-side memory. Each item is a ChatMessage. Only the latest
             * 100 messages are used; any other shape is rejected.
             *
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
            agent_override?: /**
             * Agent Builder preview: unsaved editor settings applied to the saved
             * custom agent for this request only. Nothing is persisted. Requires
             * preview_demo on /v1/chat and forces draft execution mode on
             * /v1/agents/{agent_id}/execute/stream. Not supported for system skills
             * or Website Chat agents.
             *
             */
            AgentPreviewOverride;
            /**
             * Agent Builder preview of a portal Customer Chat agent: the unsaved
             * place configuration (same shape as the customer chat config
             * update). It is validated and compiled like a save and used for
             * this request only; nothing is persisted. Requires preview_demo.
             * Not supported for Website Chat agents.
             *
             */
            portal_config_override?: {
                [name: string]: any;
            };
        }
        /**
         * What a client sees of a session's history. Every event carries the `seq` of the stored event it comes
         * from, so history, live messages and reconnects can overlap and a client applies each event once.
         *
         */
        export type ClientEvent = /**
         * What a client sees of a session's history. Every event carries the `seq` of the stored event it comes
         * from, so history, live messages and reconnects can overlap and a client applies each event once.
         *
         */
        /* The user's message, or their interrupt */ ClientEventInput | /* The agent took the user's message `inputEventId`, where it reads it */ ClientEventInputTaken | /* The message will not be answered: the user stopped the turn, or the session was deleted */ ClientEventInputCancelled | /* The message failed again and again and was skipped, so the session goes on */ ClientEventInputFailed | ClientEventTurnStarted | /* One model call: what it read and wrote, and what filled its context */ ClientEventModelUsage | /* Older messages were summarized to make room; the context held `tokensBefore` until then */ ClientEventContextCompacted | ClientEventTurnEnded | /* The agent's answer */ ClientEventMessage | /* The agent calls a tool */ ClientEventStepStarted | ClientEventStepFinished | ClientEventSkillLoaded | /* The agent asks to make changes: approve or reject with `user.approval` */ ClientEventApprovalRequired | ClientEventApprovalResolved | /* An approved batch ran: every change ran, or it stopped at the first failure */ ClientEventApprovalExecuted | /* The agent asks the user: answer with `user.answer` */ ClientEventQuestionAsked | /* Files the agent wrote for the user in this turn */ ClientEventFilesCreated | /* Answered, or `dismissed`: the user wrote a message instead */ ClientEventQuestionAnswered;
        /**
         * An approved batch ran: every change ran, or it stopped at the first failure
         */
        export interface ClientEventApprovalExecuted {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "approval.executed";
            approvalId: string;
            stepId: string;
            applied: number;
            total: number;
            complete: boolean;
            stopped?: boolean;
            changes: /* What happened to one change of an approved batch */ ChangeOutcome[];
        }
        /**
         * The agent asks to make changes: approve or reject with `user.approval`
         */
        export interface ClientEventApprovalRequired {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "approval.required";
            approvalId: string;
            stepId: string;
            tool: string;
            summary: string;
            /**
             * A batch: every change, exactly as it will run
             */
            changes?: /* A change the agent asks to make, exactly as it will run */ BatchChange[];
            /**
             * The script that recorded the batch
             */
            executionId?: string;
            call?: /* A change the agent asks to make, exactly as it will run */ BatchChange;
        }
        export interface ClientEventApprovalResolved {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "approval.resolved";
            approvalId: string;
            approved: boolean;
            reason?: string;
        }
        export interface ClientEventBase {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
        }
        /**
         * Older messages were summarized to make room; the context held `tokensBefore` until then
         */
        export interface ClientEventContextCompacted {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "context.compacted";
            tokensBefore: number;
        }
        /**
         * Files the agent wrote for the user in this turn
         */
        export interface ClientEventFilesCreated {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "files.created";
            files: /* A file in a session */ FileRef[];
        }
        /**
         * The user's message, or their interrupt
         */
        export interface ClientEventInput {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "input";
            input: {
                kind: "message";
                text: string;
                files?: /* A file in a session */ FileRef[];
            } | {
                kind: "interrupt";
            };
        }
        /**
         * The message will not be answered: the user stopped the turn, or the session was deleted
         */
        export interface ClientEventInputCancelled {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "input.cancelled";
            inputEventId: string;
            reason: "stopped" | "deleted";
        }
        /**
         * The message failed again and again and was skipped, so the session goes on
         */
        export interface ClientEventInputFailed {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "input.failed";
            inputEventId: string;
            errorCode: /* Why a turn or an input failed, for the user's copy */ SessionErrorCode;
            error: string;
        }
        /**
         * The agent took the user's message `inputEventId`, where it reads it
         */
        export interface ClientEventInputTaken {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "input.taken";
            inputEventId: string;
        }
        /**
         * The agent's answer
         */
        export interface ClientEventMessage {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "message";
            text: string;
            reasoning?: string;
            /**
             * How long the model thought before it answered
             */
            reasoningMs?: number;
        }
        /**
         * One model call: what it read and wrote, and what filled its context
         */
        export interface ClientEventModelUsage {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "model.usage";
            usage: {
                input: number;
                output: number;
                cacheRead: number;
                cacheWrite: number;
            };
            context?: /* What filled the model's context on one call, in tokens */ ContextBreakdown;
        }
        /**
         * Answered, or `dismissed`: the user wrote a message instead
         */
        export interface ClientEventQuestionAnswered {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "question.answered";
            questionId: string;
            answers?: /* One answer per question, in order: the labels picked, and/or the user's own words */ Answer[];
            dismissed?: boolean;
        }
        /**
         * The agent asks the user: answer with `user.answer`
         */
        export interface ClientEventQuestionAsked {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "question.asked";
            questionId: string;
            stepId: string;
            questions: Question[];
        }
        export interface ClientEventSkillLoaded {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "skill.loaded";
            skill: string;
            version?: string;
            /**
             * The read that loaded it; a client shows the skill instead of that step
             */
            stepId?: string;
        }
        export interface ClientEventStepFinished {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "step.finished";
            stepId: string;
            tool: string;
            ok: boolean;
            output: string;
            /**
             * Why the runtime wrote the result instead of the tool
             */
            marker?: "interrupted" | "may_have_run";
        }
        /**
         * The agent calls a tool
         */
        export interface ClientEventStepStarted {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "step.started";
            stepId: string;
            tool: string;
            input: {
                [name: string]: any;
            };
        }
        export interface ClientEventTurnEnded {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "turn.ended";
            reason: "done" | "stopped" | "failed";
            /**
             * Details only; `errorCode` is for the user's copy
             */
            error?: string;
            errorCode?: /* Why a turn or an input failed, for the user's copy */ SessionErrorCode;
            /**
             * The answer stopped at the model's output limit; the user can ask it to continue
             */
            cutOff?: boolean;
        }
        export interface ClientEventTurnStarted {
            seq: number;
            eventId: string;
            occurredAt: string; // date-time
            type: "turn.started";
        }
        /**
         * The user's input to a session
         */
        export type ClientInput = /* The user's input to a session */ /* A message. It closes open questions and expires pending approvals. */ UserMessageInput | /* Approves or rejects what the agent asked to do (`approval.required`) */ UserApprovalInput | /* The user's answers to the agent's questions (`question.asked`), one per question */ UserAnswerInput | /* Stops the agent's turn */ UserInterruptInput;
        export type ContentPart = TextContentPart | ImageContentPart | ThinkingContentPart | ToolCallContentPart;
        /**
         * What filled the model's context on one call, in tokens
         */
        export interface ContextBreakdown {
            /**
             * The model's context window
             */
            window: number;
            parts: {
                instructions?: number;
                user?: number;
                replies?: number;
                thinking?: number;
                toolCalls?: number;
                toolResults?: number;
                files?: number;
                summary?: number;
            };
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
        export interface CreateSessionRequest {
            agentId: string;
            requestId?: /* The client's id for the request: sent again on a retry, it is taken once */ RequestId /* uuid */;
            input?: /* The user's message, its text (trimmed), its files, or both */ MessageInput;
        }
        export interface CreatedSession {
            session: SessionView;
            events: /**
             * What a client sees of a session's history. Every event carries the `seq` of the stored event it comes
             * from, so history, live messages and reconnects can overlap and a client applies each event once.
             *
             */
            ClientEvent[];
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
        export interface CustomerChatConversation {
            conversation_id: string;
            /**
             * Portal user who chatted
             */
            user_id: string;
            /**
             * The customer's contact, known once the agent created a ticket
             */
            contact_id?: string;
            title?: string;
            message_count: number;
            last_message?: string;
            last_message_at: string; // date-time
            created_at: string; // date-time
            /**
             * Tickets the agent created in this conversation, oldest first
             */
            ticket_ids: string[];
        }
        export interface CustomerChatConversationMessage {
            role: "user" | "assistant";
            content: string;
            timestamp: string; // date-time
        }
        export interface CustomerChatConversationTranscript {
            conversation: CustomerChatConversation;
            messages: CustomerChatConversationMessage[];
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
            /**
             * Machine-readable error code, where an operation documents one (e.g. `FEATURE_DISABLED`)
             */
            code?: string;
            message?: string;
            details?: {
                [key: string]: any;
            };
        }
        export interface EscalationConfig {
            websiteHandover: WebsiteHandover;
            ticketPurpose?: /**
             * Portal places only: purpose set on tickets the portal chat creates when
             * it hands over to the service team. Omit (or send `null`) for a plain ticket.
             *
             */
            TicketPurpose;
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
             * Deadline for the execution, counted from its creation. A direct skill still running when
             * it passes is cut off and the execution fails with `error: TIMEOUT`; a ReAct agent is cut off
             * at its next model call. Without it an execution is bounded only by the service's own limit.
             * Ignored by `mode: sync`, which has a fixed cutoff.
             *
             */
            timeout_ms?: number;
        }
        export interface ExecuteAgentStreamRequest {
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
             * Deadline for the execution, counted from its creation. A direct skill still running when
             * it passes is cut off and the execution fails with `error: TIMEOUT`; a ReAct agent is cut off
             * at its next model call. Without it an execution is bounded only by the service's own limit.
             * Ignored by `mode: sync`, which has a fixed cutoff.
             *
             */
            timeout_ms?: number;
            agent_override?: /**
             * Agent Builder preview: unsaved editor settings applied to the saved
             * custom agent for this request only. Nothing is persisted. Requires
             * preview_demo on /v1/chat and forces draft execution mode on
             * /v1/agents/{agent_id}/execute/stream. Not supported for system skills
             * or Website Chat agents.
             *
             */
            AgentPreviewOverride;
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
             * Execution result (when status=completed). `GET /v1/executions/{execution_id}` always returns
             * the full result. The list endpoint and the completion event may instead carry
             * `{ result_ref, preview }` for a result too large to store inline.
             *
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
                /**
                 * Why the model stopped (`end_turn`, `max_tokens`, ...). Present for skills that run through the native InvokeModel path, so a caller can treat a truncated answer itself.
                 */
                stop_reason?: string;
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
        /**
         * A file in a session
         */
        export interface FileRef {
            fileId: string; // uuid
            name: string;
            mediaType: string;
            size: number;
        }
        export interface ImageContentPart {
            type: "image";
            mimeType: string;
            /**
             * Base64 data of a small image
             */
            data?: string;
            key?: string;
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
        /**
         * Knowledge source IDs available to this agent. An empty array clears the selection.
         */
        export type KnowledgeSourceIds = string /* uuid */[];
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
        export interface ListCustomerChatConversationsResponse {
            conversations: CustomerChatConversation[];
            next_cursor?: string;
        }
        export interface ListCustomerChatResponse {
            agents: CustomerChatAgent[];
        }
        export interface ListExecutionsResponse {
            executions?: ExecutionResponse[];
            /**
             * Pass as `cursor` for the next page. Null after the last page.
             */
            next_cursor?: string | null;
        }
        export interface LocalizedAppearance {
            displayName: string;
            greeting: string;
            starters: string[];
            /**
             * One key per starter, in the order of `starters` and the same for a starter in every language; websites ask a starter by it with `startStarter(key)`. Absent for starters saved before keys, which readers key `starter-<position>`.
             */
            starterKeys?: string /* ^[A-Za-z0-9_-]{1,64}$ */[];
            launcherLabel?: string;
        }
        export type LocalizedFieldList = ("displayName" | "greeting" | "starters" | "launcherLabel")[];
        export interface MessageFeedback {
            rating: "up" | "down";
            comment?: string;
            user_id: string;
            submitted_at: string; // date-time
        }
        /**
         * The user's message, its text (trimmed), its files, or both
         */
        export interface MessageInput {
            text?: string;
            /**
             * Where the user is (page, record); given to the agent, not shown as the user's words
             */
            context?: {
                [name: string]: any;
            };
            /**
             * Uploads (`createSessionUpload`) to attach, by `fileId`
             */
            files?: [
                string?,
                string?,
                string?,
                string?,
                string?
            ];
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
            /**
             * Set when the usual approvers cannot decide this action. With agents-strict-approvals, a run started with internal auth and no user can only be approved or rejected by internal auth (the automation that started it); without its decision the approval expires and the run continues without the action.
             */
            approval_note?: string;
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
        export interface Question {
            /**
             * A short label for the question
             */
            header: string;
            question: string;
            /**
             * Several options may be picked
             */
            multiSelect?: boolean;
            options: [
                {
                    label: string;
                    description?: string;
                },
                {
                    label: string;
                    description?: string;
                },
                {
                    label: string;
                    description?: string;
                }?,
                {
                    label: string;
                    description?: string;
                }?
            ];
        }
        /**
         * A refusal the client tells the user about; `error` repeats it, like every other error
         */
        export interface Refusal {
            code: "not_enabled" | "quota_exceeded" | "refused";
            /**
             * For the user
             */
            message: string;
            /**
             * `quota_exceeded`: which limit
             */
            limit?: "concurrent_sessions" | "active_vms" | "daily_budget";
            /**
             * `quota_exceeded`: seconds until it may work again (also the `retry-after` header)
             */
            retryAfterSeconds?: number;
            error: RefusalDetails;
        }
        export interface RefusalDetails {
            code: "not_enabled" | "quota_exceeded" | "refused";
            /**
             * For the user
             */
            message: string;
            /**
             * `quota_exceeded`: which limit
             */
            limit?: "concurrent_sessions" | "active_vms" | "daily_budget";
            /**
             * `quota_exceeded`: seconds until it may work again (also the `retry-after` header)
             */
            retryAfterSeconds?: number;
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
        export interface RenameSessionRequest {
            /**
             * Trimmed
             */
            title: string; // \S
        }
        /**
         * The client's id for the request: sent again on a retry, it is taken once
         */
        export type RequestId = string; // uuid
        export interface RunScriptRequest {
            language: "javascript" | "python";
            script: string;
            /**
             * What the script does, for the user (trimmed)
             */
            description: string; // \S
            /**
             * How long to wait for the result, in milliseconds
             */
            waitMs?: number;
        }
        export interface SaveCustomerChatConfigRequest {
            config: AgentConfig;
            updated_at?: string; // date-time
        }
        export interface ScriptApplyResult {
            /**
             * False while changes are left; call again
             */
            done: boolean;
            /**
             * Changes that ran so far
             */
            applied: number;
            total: number;
            /**
             * When done: what the batch did
             */
            result?: {
                content: ContentPart[];
                isError: boolean;
            };
        }
        export interface ScriptRunView {
            runId: string;
            status: "running" | "done" | "failed";
            /**
             * How the run ended: what the script printed, its result, its exit
             */
            output?: string;
            /**
             * Changes the script recorded, not applied; `applyScriptRun` applies them
             */
            changes?: number;
        }
        /**
         * What a journey, link or in-chat capability is for; names the action in the chat and in analytics.
         */
        export type SelfServiceIntent = "submit_meter_reading";
        /**
         * Why a turn or an input failed, for the user's copy
         */
        export type SessionErrorCode = "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal";
        export interface SessionEventsPage {
            events: /**
             * What a client sees of a session's history. Every event carries the `seq` of the stored event it comes
             * from, so history, live messages and reconnects can overlap and a client applies each event once.
             *
             */
            ClientEvent[];
            /**
             * The `seq` this page ends at; ask again `after` it while `hasMore`
             */
            lastSeq: number;
            hasMore: boolean;
            status: /* `starting`: its VM starts or the agent catches up; `failed`: its last turn couldn't run */ SessionStatus;
        }
        export interface SessionFileUrl {
            url: string;
            expiresAt: string; // date-time
        }
        /**
         * What was accepted: a message or an interrupt, an approval decision, or answers
         */
        export type SessionInputAccepted = /* What was accepted: a message or an interrupt, an approval decision, or answers */ {
            accepted: true;
        } | {
            approval: {
                id: string; // uuid
                status: "pending" | "approved" | "rejected" | "executed" | "expired";
            };
        } | {
            question: {
                id: string; // uuid
                status: "pending" | "answered" | "dismissed";
            };
        };
        export interface SessionList {
            sessions: SessionView[];
        }
        /**
         * How to subscribe to the session's live messages on AppSync Events
         */
        export interface SessionLiveInfo {
            transport: "appsync";
            /**
             * Host of the Event API's HTTP endpoint (the `host` in the subscribe auth header)
             */
            httpHost: string;
            /**
             * WebSocket URL of the Event API
             */
            realtimeUrl: string;
            channel: string;
        }
        export interface SessionResponse {
            session: SessionView;
        }
        /**
         * `starting`: its VM starts or the agent catches up; `failed`: its last turn couldn't run
         */
        export type SessionStatus = "idle" | "starting" | "running" | "failed";
        export interface SessionUpload {
            file: /* A file in a session */ FileRef;
            /**
             * `PUT` the file's bytes to `url` with `headers`, before the link expires
             */
            upload: {
                method: "PUT";
                url: string;
                headers: {
                    [name: string]: string;
                };
            };
        }
        export interface SessionView {
            id: string; // uuid
            agentId: string;
            /**
             * `read`: the user signed in read-only (or anonymized), so the agent only reads in this session
             */
            mode: "read" | "write";
            title: string | null;
            createdAt: string; // date-time
            updatedAt: string; // date-time
            status: /* `starting`: its VM starts or the agent catches up; `failed`: its last turn couldn't run */ SessionStatus;
            live?: /* How to subscribe to the session's live messages on AppSync Events */ SessionLiveInfo;
        }
        /**
         * An error of the Sessions API
         */
        export interface SessionsError {
            error: {
                message: string;
                /**
                 * `Invalid request`: what doesn't match
                 */
                issues?: ValidationIssue[];
                /**
                 * The request's id, for support (internal errors)
                 */
                requestId?: string;
            };
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
            type?: "token" | "agent_step" | "tool_call" | "tool_result" | "complete" | "error" | "metadata" | "needs_approval" | "approval_required";
            /**
             * Token content (for token events)
             */
            content?: string;
            approval?: /* A tool call waiting for the user's approval; the turn has ended. */ ToolApprovalRequest;
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
        export interface TextContentPart {
            type: "text";
            text: string;
        }
        export interface ThinkingContentPart {
            type: "thinking";
            thinking: string;
            redacted?: boolean;
        }
        /**
         * Portal places only: purpose set on tickets the portal chat creates when
         * it hands over to the service team. Omit (or send `null`) for a plain ticket.
         *
         */
        export type TicketPurpose = {
            /**
             * Purpose taxonomy classification id, stored in the ticket's `_purpose`.
             */
            id: string;
            /**
             * The purpose's name, kept for display.
             */
            name?: string;
        } | null;
        /**
         * The user's answer to an `approval_required` event (Luna behind the
         * `luna-tool-approvals` flag). Requires the asking turn's `conversationId` and `agentId`; `message` may
         * be omitted. On approve the server runs exactly the pending tool call
         * stored in the conversation, streams its `tool_call` / `tool_result`
         * and continues the turn. Errors: `APPROVAL_INVALID`,
         * `APPROVAL_EXPIRED`, `APPROVAL_USED`, `APPROVAL_UNAVAILABLE`.
         *
         */
        export interface ToolApprovalAnswer {
            /**
             * `approval.token` from the `approval_required` event
             */
            token: string;
            approved: boolean;
            /**
             * Optional reason, passed to the agent on decline
             */
            reason?: string;
        }
        /**
         * A tool call waiting for the user's approval; the turn has ended.
         */
        export interface ToolApprovalRequest {
            id: string;
            /**
             * example:
             * entity.update
             */
            tool_id: string;
            /**
             * `callId` of this call's `tool_call` / `tool_result` events
             */
            tool_call_id: string;
            /**
             * Human-readable tool name
             */
            title?: string;
            /**
             * The exact arguments that run on approve
             */
            input: {
                [name: string]: any;
            };
            impact?: string;
            preview?: {
                [name: string]: any;
            };
            /**
             * 10 minutes after the request
             */
            expires_at: string; // date-time
            /**
             * Signed, single-use; send back as `tool_approval.token`
             */
            token: string;
        }
        export interface ToolCallContentPart {
            type: "tool_call";
            id: string;
            name: string;
            arguments: {
                [name: string]: any;
            };
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
        export interface UploadRequest {
            /**
             * Trimmed, and made safe as a file name
             */
            name: string; // \S
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/gif" | "application/pdf" | "text/csv" | "text/plain" | "text/markdown" | "application/json" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            /**
             * In bytes; the upload URL takes exactly this many
             */
            size: number;
        }
        /**
         * The user's answers to the agent's questions (`question.asked`), one per question
         */
        export interface UserAnswerInput {
            type: "user.answer";
            questionId: string; // uuid
            answers: [
                /* One answer per question, in order: the labels picked, and/or the user's own words */ Answer,
                /* One answer per question, in order: the labels picked, and/or the user's own words */ Answer?,
                /* One answer per question, in order: the labels picked, and/or the user's own words */ Answer?,
                /* One answer per question, in order: the labels picked, and/or the user's own words */ Answer?
            ];
        }
        /**
         * Approves or rejects what the agent asked to do (`approval.required`)
         */
        export interface UserApprovalInput {
            type: "user.approval";
            approvalId: string; // uuid
            approved: boolean;
            reason?: string;
        }
        /**
         * Stops the agent's turn
         */
        export interface UserInterruptInput {
            type: "user.interrupt";
            requestId?: /* The client's id for the request: sent again on a retry, it is taken once */ RequestId /* uuid */;
        }
        /**
         * A message. It closes open questions and expires pending approvals.
         */
        export interface UserMessageInput {
            text?: string;
            /**
             * Where the user is (page, record); given to the agent, not shown as the user's words
             */
            context?: {
                [name: string]: any;
            };
            /**
             * Uploads (`createSessionUpload`) to attach, by `fileId`
             */
            files?: [
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            type: "user.message";
            requestId?: /* The client's id for the request: sent again on a retry, it is taken once */ RequestId /* uuid */;
        }
        export interface ValidationIssue {
            code: string;
            /**
             * Where in the request
             */
            path: (string | number)[];
            message: string;
        }
        export interface WebsiteHandover {
            /**
             * Where the website agent hands over when it cannot help.
             * - `phone`: the agent gives the customer the phone number in `value`.
             * - `email`: the agent gives the customer the email address in `value`.
             * - `journey`: the agent points the customer to the journey in `journeyId`.
             * - `ticket`: an authenticated visitor can confirm a support ticket for the
             *   service team, with the chat transcript as a note. Anonymous
             *   visitors are asked to sign in first.
             * - `unset`: nothing chosen yet; the agent offers no hand-over channel.
             *
             */
            kind: "phone" | "email" | "journey" | "ticket" | "unset";
            /**
             * Phone number or email address for `phone` / `email`; empty otherwise.
             */
            value: string;
            /**
             * The hand-over journey, for `journey`.
             */
            journeyId?: string;
            /**
             * The journey's name, kept for display, for `journey`.
             */
            journeyName?: string;
        }
    }
}
declare namespace Paths {
    namespace ActivateAgentAuth {
        export type RequestBody = Components.Schemas.AgentAuthActivationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.AgentAuthStatus;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
            export type $502 = Components.Schemas.Error;
        }
    }
    namespace ApplyScriptRun {
        namespace Parameters {
            export type RunId = string; // ^[0-9a-f-]{36}\.[0-9a-f-]{36}$
        }
        export interface PathParameters {
            runId: Parameters.RunId /* ^[0-9a-f-]{36}\.[0-9a-f-]{36}$ */;
        }
        export type RequestBody = Components.Schemas.ApplyScriptRunRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ScriptApplyResult;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $403 = Components.Responses.SessionsNotEnabled;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $409 = /* A refusal the client tells the user about; `error` repeats it, like every other error */ Components.Schemas.Refusal;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
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
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
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
    namespace CreateSession {
        export type RequestBody = Components.Schemas.CreateSessionRequest;
        namespace Responses {
            export type $201 = Components.Schemas.CreatedSession;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $403 = Components.Responses.SessionsNotEnabled;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $409 = Components.Responses.SessionsConflict;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $429 = Components.Responses.SessionsQuotaExceeded;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace CreateSessionUpload {
        export type RequestBody = Components.Schemas.UploadRequest;
        namespace Responses {
            export type $201 = Components.Schemas.SessionUpload;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $403 = Components.Responses.SessionsNotEnabled;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace DeactivateAgentAuth {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $502 = Components.Schemas.Error;
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
    namespace DeleteSession {
        namespace Parameters {
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $500 = Components.Responses.SessionsInternalError;
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
        export type RequestBody = Components.Schemas.ExecuteAgentStreamRequest;
        namespace Responses {
            export type $200 = /* Server-Sent Event for streaming responses */ Components.Schemas.StreamEvent;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetAgentAuth {
        namespace Responses {
            export type $200 = Components.Schemas.AgentAuthStatus;
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
    namespace GetCustomerChatConversation {
        namespace Parameters {
            export type AgentId = string;
            export type ConversationId = string;
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
            conversation_id: Parameters.ConversationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CustomerChatConversationTranscript;
            export type $403 = Components.Schemas.Error;
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
    namespace GetScriptRun {
        namespace Parameters {
            export type RunId = string; // ^[0-9a-f-]{36}\.[0-9a-f-]{36}$
            export type WaitMs = number;
        }
        export interface PathParameters {
            runId: Parameters.RunId /* ^[0-9a-f-]{36}\.[0-9a-f-]{36}$ */;
        }
        export interface QueryParameters {
            waitMs?: Parameters.WaitMs;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ScriptRunView;
            export type $202 = Components.Schemas.ScriptRunView;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace GetSession {
        namespace Parameters {
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SessionResponse;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace GetSessionFileUrl {
        namespace Parameters {
            export type Download = "1";
            export type FileId = string; // uuid ^[0-9a-f-]{36}$
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
            fileId: Parameters.FileId /* uuid ^[0-9a-f-]{36}$ */;
        }
        export interface QueryParameters {
            download?: Parameters.Download;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SessionFileUrl;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $500 = Components.Responses.SessionsInternalError;
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
    namespace ListCustomerChatConversations {
        namespace Parameters {
            export type AgentId = string;
            export type Cursor = string;
            export type From = string; // date-time
            export type HasTicket = boolean;
            export type Limit = number;
            export type To = string; // date-time
        }
        export interface PathParameters {
            agent_id: Parameters.AgentId;
        }
        export interface QueryParameters {
            has_ticket?: Parameters.HasTicket;
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
            from?: Parameters.From /* date-time */;
            to?: Parameters.To /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListCustomerChatConversationsResponse;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ListExecutions {
        namespace Parameters {
            export type AgentId = string;
            export type Cursor = string;
            export type Limit = number;
            export type Status = Components.Schemas.ExecutionStatus;
        }
        export interface QueryParameters {
            agent_id?: Parameters.AgentId;
            status?: Parameters.Status;
            limit?: Parameters.Limit;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListExecutionsResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListSessionEvents {
        namespace Parameters {
            export type After = number;
            export type Limit = number;
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
        }
        export interface QueryParameters {
            after?: Parameters.After;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SessionEventsPage;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace ListSessions {
        namespace Parameters {
            export type AgentId = string;
            export type Before = string; // date-time
            export type Limit = number;
        }
        export interface QueryParameters {
            agentId?: Parameters.AgentId;
            limit?: Parameters.Limit;
            before?: Parameters.Before /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SessionList;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $500 = Components.Responses.SessionsInternalError;
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
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
            export type $409 = Components.Schemas.Error;
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
    namespace RenameSession {
        namespace Parameters {
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
        }
        export type RequestBody = Components.Schemas.RenameSessionRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SessionResponse;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace RevokeSessionAgents {
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $500 = Components.Responses.SessionsInternalError;
        }
    }
    namespace RunScript {
        export type RequestBody = Components.Schemas.RunScriptRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ScriptRunView;
            export type $202 = Components.Schemas.ScriptRunView;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $403 = Components.Responses.SessionsNotEnabled;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $429 = Components.Responses.SessionsQuotaExceeded;
            export type $500 = Components.Responses.SessionsInternalError;
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
    namespace SendSessionEvent {
        namespace Parameters {
            export type SessionId = string; // uuid ^[0-9a-f-]{36}$
        }
        export interface PathParameters {
            sessionId: Parameters.SessionId /* uuid ^[0-9a-f-]{36}$ */;
        }
        export type RequestBody = /* The user's input to a session */ Components.Schemas.ClientInput;
        namespace Responses {
            export type $202 = /* What was accepted: a message or an interrupt, an approval decision, or answers */ Components.Schemas.SessionInputAccepted;
            export type $400 = Components.Responses.SessionsBadRequest;
            export type $401 = Components.Responses.SessionsUnauthorized;
            export type $403 = Components.Responses.SessionsNotEnabled;
            export type $404 = Components.Responses.SessionsNotFound;
            export type $409 = Components.Responses.SessionsConflict;
            export type $413 = Components.Responses.SessionsPayloadTooLarge;
            export type $429 = Components.Responses.SessionsQuotaExceeded;
            export type $500 = Components.Responses.SessionsInternalError;
            export type $502 = /* An error of the Sessions API */ Components.Schemas.SessionsError;
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
    namespace V1Agents$AgentIdAgentAuth {
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
   * getAgentAuth - Get the agent's identity for Flows runs
   * 
   * The agent's own identity for runs started by Flows (internal auth): an autonomous Agent Auth agent at the
   * Access Token API, owned by the admin who activated it. `inactive` when none was activated; `expired` once
   * its lifetime (90 days) is over. Runs of an agent with an activation (behind the `agent-flows-identity`
   * organization flag) mint their tokens from it instead of using the platform service token, and fail with
   * `AGENT_IDENTITY_EXPIRED` when it has expired or was revoked.
   * 
   */
  'getAgentAuth'(
    parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAgentAuth.Responses.$200>
  /**
   * activateAgentAuth - Activate the agent's identity for Flows runs
   * 
   * Registers a new autonomous agent for this custom agent at the Access Token API (90 days) and stores the
   * activation on the agent. The caller must be a 360 user calling with their login token in their login
   * organization, allowed `token:create`; they become the agent's owner, and the agent acts with the owner's
   * current roles under `access_profile`. Activating again replaces (and revokes) the previous activation.
   * Available only while the PostHog flag `agent-flows-identity` is on for the organization; otherwise `403`
   * with `code: FEATURE_DISABLED` (`GET` and `DELETE` stay available).
   * 
   */
  'activateAgentAuth'(
    parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
    data?: Paths.ActivateAgentAuth.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateAgentAuth.Responses.$200>
  /**
   * deactivateAgentAuth - Deactivate the agent's identity for Flows runs
   * 
   * Revokes the agent's autonomous agent at the Access Token API (with every token it issued) and removes the
   * activation. Needs `token:create`. Later Flows runs use the platform service token again.
   * 
   */
  'deactivateAgentAuth'(
    parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeactivateAgentAuth.Responses.$204>
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
   * listCustomerChatConversations - List a portal agent's conversations
   * 
   * Lists the conversations portal customers had with this agent, most recent first.
   * Requires `entity:view` on contacts. With `has_ticket=true` a page can hold fewer
   * than `limit` conversations; keep following `next_cursor`. `from` and `to` narrow the
   * list to conversations last active in that period; keep them unchanged while following
   * `next_cursor`.
   * 
   */
  'listCustomerChatConversations'(
    parameters?: Parameters<Paths.ListCustomerChatConversations.QueryParameters & Paths.ListCustomerChatConversations.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCustomerChatConversations.Responses.$200>
  /**
   * getCustomerChatConversation - Get a portal agent conversation transcript
   * 
   * Customer and agent messages of one conversation, oldest first. Requires `entity:view` on contacts.
   */
  'getCustomerChatConversation'(
    parameters?: Parameters<Paths.GetCustomerChatConversation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerChatConversation.Responses.$200>
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
   * Lists the executions of the caller's organization, optionally filtered by agent and status.
   * With a filter, a page can hold fewer than `limit` executions, or none, while more follow:
   * keep following `next_cursor` until it is null, with the same filters.
   * 
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
  /**
   * createSessionUpload - Upload a file for a session
   * 
   * Registers a file the caller attaches to a message and returns a short-lived URL to `PUT` its bytes to,
   * with the headers to send. Attach it by its `fileId` in `createSession` or `sendSessionEvent` (`user.message`).
   * Only the listed media types, up to 10 MB.
   * 
   */
  'createSessionUpload'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSessionUpload.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSessionUpload.Responses.$201>
  /**
   * listSessions - List the caller's sessions
   * 
   * The caller's own sessions, most recently updated first.
   */
  'listSessions'(
    parameters?: Parameters<Paths.ListSessions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSessions.Responses.$200>
  /**
   * createSession - Start a session
   * 
   * Starts a session with an agent, optionally with the user's first message (`input`), which wakes the agent.
   * With a `requestId`, a retried request gets the session its first attempt created.
   * 
   */
  'createSession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSession.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSession.Responses.$201>
  /**
   * getSession - Get a session
   * 
   * One of the caller's sessions, with its current status. Another user's session is not found.
   */
  'getSession'(
    parameters?: Parameters<Paths.GetSession.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSession.Responses.$200>
  /**
   * renameSession - Rename a session
   * 
   * Sets the session's title (trimmed).
   */
  'renameSession'(
    parameters?: Parameters<Paths.RenameSession.PathParameters> | null,
    data?: Paths.RenameSession.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RenameSession.Responses.$200>
  /**
   * deleteSession - Delete a session
   * 
   * Deletes the session and everything it keeps (events, files, workspace).
   */
  'deleteSession'(
    parameters?: Parameters<Paths.DeleteSession.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSession.Responses.$204>
  /**
   * listSessionEvents - List a session's events
   * 
   * The session's history as client events, in pages: while `hasMore`, ask again with `after` set to `lastSeq`.
   * Every event carries the `seq` it comes from, so history and live messages can overlap.
   * 
   */
  'listSessionEvents'(
    parameters?: Parameters<Paths.ListSessionEvents.QueryParameters & Paths.ListSessionEvents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSessionEvents.Responses.$200>
  /**
   * sendSessionEvent - Send to a session
   * 
   * The user's input to the session: a message, an approval decision, answers to the agent's questions,
   * or an interrupt (stop the turn). Accepted inputs are handled asynchronously; follow the session's events.
   * 
   */
  'sendSessionEvent'(
    parameters?: Parameters<Paths.SendSessionEvent.PathParameters> | null,
    data?: Paths.SendSessionEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendSessionEvent.Responses.$202>
  /**
   * getSessionFileUrl - Get a link to a session file
   * 
   * A short-lived link to a file of the session: one the user attached, or one the agent created.
   * Images open in the browser unless `download=1`; anything else is downloaded under its name.
   * 
   */
  'getSessionFileUrl'(
    parameters?: Parameters<Paths.GetSessionFileUrl.QueryParameters & Paths.GetSessionFileUrl.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSessionFileUrl.Responses.$200>
  /**
   * runScript - Run a script
   * 
   * Runs a script in the caller's script session, without a model (the epilot MCP's `execute`). Its reads run
   * with the caller's token; the changes it records are not applied until `applyScriptRun`. Waits up to `waitMs`
   * for the result: `200` when it finished, `202` while it still runs (ask `getScriptRun`).
   * 
   */
  'runScript'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RunScript.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RunScript.Responses.$200 | Paths.RunScript.Responses.$202>
  /**
   * getScriptRun - Get a script run
   * 
   * Where a script run stands, waiting up to `waitMs` (at most 20000) for it to finish: `200` when it finished, `202` while it runs.
   */
  'getScriptRun'(
    parameters?: Parameters<Paths.GetScriptRun.QueryParameters & Paths.GetScriptRun.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScriptRun.Responses.$200 | Paths.GetScriptRun.Responses.$202>
  /**
   * applyScriptRun - Apply a script run's changes
   * 
   * Applies the changes a finished script run recorded, after the caller's client confirmed them, with the
   * caller's token. Each request runs for a while; call again until `done`. Refused (`409`, nothing runs) when
   * the script failed, recorded nothing, or asks for something the caller's roles don't allow.
   * 
   */
  'applyScriptRun'(
    parameters?: Parameters<Paths.ApplyScriptRun.PathParameters> | null,
    data?: Paths.ApplyScriptRun.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyScriptRun.Responses.$200>
  /**
   * revokeSessionAgents - Revoke the caller's session agents
   * 
   * Logout. Every agent the caller's sessions act with ends now.
   */
  'revokeSessionAgents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeSessionAgents.Responses.$204>
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
  ['/v1/agents/{agent_id}/agent-auth']: {
    /**
     * getAgentAuth - Get the agent's identity for Flows runs
     * 
     * The agent's own identity for runs started by Flows (internal auth): an autonomous Agent Auth agent at the
     * Access Token API, owned by the admin who activated it. `inactive` when none was activated; `expired` once
     * its lifetime (90 days) is over. Runs of an agent with an activation (behind the `agent-flows-identity`
     * organization flag) mint their tokens from it instead of using the platform service token, and fail with
     * `AGENT_IDENTITY_EXPIRED` when it has expired or was revoked.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAgentAuth.Responses.$200>
    /**
     * activateAgentAuth - Activate the agent's identity for Flows runs
     * 
     * Registers a new autonomous agent for this custom agent at the Access Token API (90 days) and stores the
     * activation on the agent. The caller must be a 360 user calling with their login token in their login
     * organization, allowed `token:create`; they become the agent's owner, and the agent acts with the owner's
     * current roles under `access_profile`. Activating again replaces (and revokes) the previous activation.
     * Available only while the PostHog flag `agent-flows-identity` is on for the organization; otherwise `403`
     * with `code: FEATURE_DISABLED` (`GET` and `DELETE` stay available).
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
      data?: Paths.ActivateAgentAuth.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateAgentAuth.Responses.$200>
    /**
     * deactivateAgentAuth - Deactivate the agent's identity for Flows runs
     * 
     * Revokes the agent's autonomous agent at the Access Token API (with every token it issued) and removes the
     * activation. Needs `token:create`. Later Flows runs use the platform service token again.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1Agents$AgentIdAgentAuth.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeactivateAgentAuth.Responses.$204>
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
  ['/v1/customer-chat/{agent_id}/conversations']: {
    /**
     * listCustomerChatConversations - List a portal agent's conversations
     * 
     * Lists the conversations portal customers had with this agent, most recent first.
     * Requires `entity:view` on contacts. With `has_ticket=true` a page can hold fewer
     * than `limit` conversations; keep following `next_cursor`. `from` and `to` narrow the
     * list to conversations last active in that period; keep them unchanged while following
     * `next_cursor`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListCustomerChatConversations.QueryParameters & Paths.ListCustomerChatConversations.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCustomerChatConversations.Responses.$200>
  }
  ['/v1/customer-chat/{agent_id}/conversations/{conversation_id}']: {
    /**
     * getCustomerChatConversation - Get a portal agent conversation transcript
     * 
     * Customer and agent messages of one conversation, oldest first. Requires `entity:view` on contacts.
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomerChatConversation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerChatConversation.Responses.$200>
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
     * Lists the executions of the caller's organization, optionally filtered by agent and status.
     * With a filter, a page can hold fewer than `limit` executions, or none, while more follow:
     * keep following `next_cursor` until it is null, with the same filters.
     * 
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
  ['/v2/sessions/uploads']: {
    /**
     * createSessionUpload - Upload a file for a session
     * 
     * Registers a file the caller attaches to a message and returns a short-lived URL to `PUT` its bytes to,
     * with the headers to send. Attach it by its `fileId` in `createSession` or `sendSessionEvent` (`user.message`).
     * Only the listed media types, up to 10 MB.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSessionUpload.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSessionUpload.Responses.$201>
  }
  ['/v2/sessions']: {
    /**
     * createSession - Start a session
     * 
     * Starts a session with an agent, optionally with the user's first message (`input`), which wakes the agent.
     * With a `requestId`, a retried request gets the session its first attempt created.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSession.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSession.Responses.$201>
    /**
     * listSessions - List the caller's sessions
     * 
     * The caller's own sessions, most recently updated first.
     */
    'get'(
      parameters?: Parameters<Paths.ListSessions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSessions.Responses.$200>
  }
  ['/v2/sessions/{sessionId}']: {
    /**
     * getSession - Get a session
     * 
     * One of the caller's sessions, with its current status. Another user's session is not found.
     */
    'get'(
      parameters?: Parameters<Paths.GetSession.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSession.Responses.$200>
    /**
     * renameSession - Rename a session
     * 
     * Sets the session's title (trimmed).
     */
    'patch'(
      parameters?: Parameters<Paths.RenameSession.PathParameters> | null,
      data?: Paths.RenameSession.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RenameSession.Responses.$200>
    /**
     * deleteSession - Delete a session
     * 
     * Deletes the session and everything it keeps (events, files, workspace).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSession.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSession.Responses.$204>
  }
  ['/v2/sessions/{sessionId}/events']: {
    /**
     * listSessionEvents - List a session's events
     * 
     * The session's history as client events, in pages: while `hasMore`, ask again with `after` set to `lastSeq`.
     * Every event carries the `seq` it comes from, so history and live messages can overlap.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSessionEvents.QueryParameters & Paths.ListSessionEvents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSessionEvents.Responses.$200>
    /**
     * sendSessionEvent - Send to a session
     * 
     * The user's input to the session: a message, an approval decision, answers to the agent's questions,
     * or an interrupt (stop the turn). Accepted inputs are handled asynchronously; follow the session's events.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SendSessionEvent.PathParameters> | null,
      data?: Paths.SendSessionEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendSessionEvent.Responses.$202>
  }
  ['/v2/sessions/{sessionId}/files/{fileId}']: {
    /**
     * getSessionFileUrl - Get a link to a session file
     * 
     * A short-lived link to a file of the session: one the user attached, or one the agent created.
     * Images open in the browser unless `download=1`; anything else is downloaded under its name.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSessionFileUrl.QueryParameters & Paths.GetSessionFileUrl.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSessionFileUrl.Responses.$200>
  }
  ['/v2/sessions/scripts']: {
    /**
     * runScript - Run a script
     * 
     * Runs a script in the caller's script session, without a model (the epilot MCP's `execute`). Its reads run
     * with the caller's token; the changes it records are not applied until `applyScriptRun`. Waits up to `waitMs`
     * for the result: `200` when it finished, `202` while it still runs (ask `getScriptRun`).
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RunScript.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RunScript.Responses.$200 | Paths.RunScript.Responses.$202>
  }
  ['/v2/sessions/scripts/{runId}']: {
    /**
     * getScriptRun - Get a script run
     * 
     * Where a script run stands, waiting up to `waitMs` (at most 20000) for it to finish: `200` when it finished, `202` while it runs.
     */
    'get'(
      parameters?: Parameters<Paths.GetScriptRun.QueryParameters & Paths.GetScriptRun.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScriptRun.Responses.$200 | Paths.GetScriptRun.Responses.$202>
  }
  ['/v2/sessions/scripts/{runId}/apply']: {
    /**
     * applyScriptRun - Apply a script run's changes
     * 
     * Applies the changes a finished script run recorded, after the caller's client confirmed them, with the
     * caller's token. Each request runs for a while; call again until `done`. Refused (`409`, nothing runs) when
     * the script failed, recorded nothing, or asks for something the caller's roles don't allow.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ApplyScriptRun.PathParameters> | null,
      data?: Paths.ApplyScriptRun.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyScriptRun.Responses.$200>
  }
  ['/v2/agents/revoke']: {
    /**
     * revokeSessionAgents - Revoke the caller's session agents
     * 
     * Logout. Every agent the caller's sessions act with ends now.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeSessionAgents.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AccessLevel = Components.Schemas.AccessLevel;
export type ActionAutonomy = Components.Schemas.ActionAutonomy;
export type AgentAuthAccessProfile = Components.Schemas.AgentAuthAccessProfile;
export type AgentAuthActivationRequest = Components.Schemas.AgentAuthActivationRequest;
export type AgentAuthStatus = Components.Schemas.AgentAuthStatus;
export type AgentConfig = Components.Schemas.AgentConfig;
export type AgentDefinition = Components.Schemas.AgentDefinition;
export type AgentDomain = Components.Schemas.AgentDomain;
export type AgentExecutionEvent = Components.Schemas.AgentExecutionEvent;
export type AgentExecutionEventStatus = Components.Schemas.AgentExecutionEventStatus;
export type AgentId = Components.Schemas.AgentId;
export type AgentPreviewOverride = Components.Schemas.AgentPreviewOverride;
export type AgentSource = Components.Schemas.AgentSource;
export type Answer = Components.Schemas.Answer;
export type AppearanceConfig = Components.Schemas.AppearanceConfig;
export type ApplyScriptRunRequest = Components.Schemas.ApplyScriptRunRequest;
export type ApproveExecutionRequest = Components.Schemas.ApproveExecutionRequest;
export type BatchChange = Components.Schemas.BatchChange;
export type CapabilityId = Components.Schemas.CapabilityId;
export type CapabilityInstance = Components.Schemas.CapabilityInstance;
export type CapabilityState = Components.Schemas.CapabilityState;
export type ChangeOutcome = Components.Schemas.ChangeOutcome;
export type ChatMessage = Components.Schemas.ChatMessage;
export type ChatRequest = Components.Schemas.ChatRequest;
export type ClientEvent = Components.Schemas.ClientEvent;
export type ClientEventApprovalExecuted = Components.Schemas.ClientEventApprovalExecuted;
export type ClientEventApprovalRequired = Components.Schemas.ClientEventApprovalRequired;
export type ClientEventApprovalResolved = Components.Schemas.ClientEventApprovalResolved;
export type ClientEventBase = Components.Schemas.ClientEventBase;
export type ClientEventContextCompacted = Components.Schemas.ClientEventContextCompacted;
export type ClientEventFilesCreated = Components.Schemas.ClientEventFilesCreated;
export type ClientEventInput = Components.Schemas.ClientEventInput;
export type ClientEventInputCancelled = Components.Schemas.ClientEventInputCancelled;
export type ClientEventInputFailed = Components.Schemas.ClientEventInputFailed;
export type ClientEventInputTaken = Components.Schemas.ClientEventInputTaken;
export type ClientEventMessage = Components.Schemas.ClientEventMessage;
export type ClientEventModelUsage = Components.Schemas.ClientEventModelUsage;
export type ClientEventQuestionAnswered = Components.Schemas.ClientEventQuestionAnswered;
export type ClientEventQuestionAsked = Components.Schemas.ClientEventQuestionAsked;
export type ClientEventSkillLoaded = Components.Schemas.ClientEventSkillLoaded;
export type ClientEventStepFinished = Components.Schemas.ClientEventStepFinished;
export type ClientEventStepStarted = Components.Schemas.ClientEventStepStarted;
export type ClientEventTurnEnded = Components.Schemas.ClientEventTurnEnded;
export type ClientEventTurnStarted = Components.Schemas.ClientEventTurnStarted;
export type ClientInput = Components.Schemas.ClientInput;
export type ContentPart = Components.Schemas.ContentPart;
export type ContextBreakdown = Components.Schemas.ContextBreakdown;
export type ConversationItem = Components.Schemas.ConversationItem;
export type ConversationWithMessages = Components.Schemas.ConversationWithMessages;
export type CreateAgentRequest = Components.Schemas.CreateAgentRequest;
export type CreateCustomerChatAgentRequest = Components.Schemas.CreateCustomerChatAgentRequest;
export type CreateSessionRequest = Components.Schemas.CreateSessionRequest;
export type CreatedSession = Components.Schemas.CreatedSession;
export type CustomerChatAgent = Components.Schemas.CustomerChatAgent;
export type CustomerChatCapabilityCatalogEntry = Components.Schemas.CustomerChatCapabilityCatalogEntry;
export type CustomerChatCasRequest = Components.Schemas.CustomerChatCasRequest;
export type CustomerChatConversation = Components.Schemas.CustomerChatConversation;
export type CustomerChatConversationMessage = Components.Schemas.CustomerChatConversationMessage;
export type CustomerChatConversationTranscript = Components.Schemas.CustomerChatConversationTranscript;
export type CustomerChatKnowledgeSource = Components.Schemas.CustomerChatKnowledgeSource;
export type CustomerChatKnowledgeSourceType = Components.Schemas.CustomerChatKnowledgeSourceType;
export type CustomerChatPlace = Components.Schemas.CustomerChatPlace;
export type DeleteCustomerChatAgentRequest = Components.Schemas.DeleteCustomerChatAgentRequest;
export type Error = Components.Schemas.Error;
export type EscalationConfig = Components.Schemas.EscalationConfig;
export type ExecuteAgentRequest = Components.Schemas.ExecuteAgentRequest;
export type ExecuteAgentStreamRequest = Components.Schemas.ExecuteAgentStreamRequest;
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
export type FileRef = Components.Schemas.FileRef;
export type ImageContentPart = Components.Schemas.ImageContentPart;
export type InputParameterDefinition = Components.Schemas.InputParameterDefinition;
export type InputParametersSchema = Components.Schemas.InputParametersSchema;
export type KnowledgeSourceIds = Components.Schemas.KnowledgeSourceIds;
export type ListAgentsResponse = Components.Schemas.ListAgentsResponse;
export type ListConversationsResponse = Components.Schemas.ListConversationsResponse;
export type ListCustomerChatCapabilitiesResponse = Components.Schemas.ListCustomerChatCapabilitiesResponse;
export type ListCustomerChatConversationsResponse = Components.Schemas.ListCustomerChatConversationsResponse;
export type ListCustomerChatResponse = Components.Schemas.ListCustomerChatResponse;
export type ListExecutionsResponse = Components.Schemas.ListExecutionsResponse;
export type LocalizedAppearance = Components.Schemas.LocalizedAppearance;
export type LocalizedFieldList = Components.Schemas.LocalizedFieldList;
export type MessageFeedback = Components.Schemas.MessageFeedback;
export type MessageInput = Components.Schemas.MessageInput;
export type MessageItem = Components.Schemas.MessageItem;
export type ModelConfig = Components.Schemas.ModelConfig;
export type ParameterType = Components.Schemas.ParameterType;
export type PendingAction = Components.Schemas.PendingAction;
export type PreviewActionType = Components.Schemas.PreviewActionType;
export type PreviewChange = Components.Schemas.PreviewChange;
export type PreviewEntity = Components.Schemas.PreviewEntity;
export type PreviewValue = Components.Schemas.PreviewValue;
export type PutExecutionFeedbackRequest = Components.Schemas.PutExecutionFeedbackRequest;
export type Question = Components.Schemas.Question;
export type Refusal = Components.Schemas.Refusal;
export type RefusalDetails = Components.Schemas.RefusalDetails;
export type RejectExecutionRequest = Components.Schemas.RejectExecutionRequest;
export type RenameCustomerChatAgentRequest = Components.Schemas.RenameCustomerChatAgentRequest;
export type RenameSessionRequest = Components.Schemas.RenameSessionRequest;
export type RequestId = Components.Schemas.RequestId;
export type RunScriptRequest = Components.Schemas.RunScriptRequest;
export type SaveCustomerChatConfigRequest = Components.Schemas.SaveCustomerChatConfigRequest;
export type ScriptApplyResult = Components.Schemas.ScriptApplyResult;
export type ScriptRunView = Components.Schemas.ScriptRunView;
export type SelfServiceIntent = Components.Schemas.SelfServiceIntent;
export type SessionErrorCode = Components.Schemas.SessionErrorCode;
export type SessionEventsPage = Components.Schemas.SessionEventsPage;
export type SessionFileUrl = Components.Schemas.SessionFileUrl;
export type SessionInputAccepted = Components.Schemas.SessionInputAccepted;
export type SessionList = Components.Schemas.SessionList;
export type SessionLiveInfo = Components.Schemas.SessionLiveInfo;
export type SessionResponse = Components.Schemas.SessionResponse;
export type SessionStatus = Components.Schemas.SessionStatus;
export type SessionUpload = Components.Schemas.SessionUpload;
export type SessionView = Components.Schemas.SessionView;
export type SessionsError = Components.Schemas.SessionsError;
export type SkillAvailability = Components.Schemas.SkillAvailability;
export type SkillCategory = Components.Schemas.SkillCategory;
export type StreamEvent = Components.Schemas.StreamEvent;
export type StreamingOptions = Components.Schemas.StreamingOptions;
export type SubmitFeedbackRequest = Components.Schemas.SubmitFeedbackRequest;
export type TextContentPart = Components.Schemas.TextContentPart;
export type ThinkingContentPart = Components.Schemas.ThinkingContentPart;
export type TicketPurpose = Components.Schemas.TicketPurpose;
export type ToolApprovalAnswer = Components.Schemas.ToolApprovalAnswer;
export type ToolApprovalRequest = Components.Schemas.ToolApprovalRequest;
export type ToolCallContentPart = Components.Schemas.ToolCallContentPart;
export type ToolDefinition = Components.Schemas.ToolDefinition;
export type ToolPreview = Components.Schemas.ToolPreview;
export type UpdateAgentRequest = Components.Schemas.UpdateAgentRequest;
export type UploadRequest = Components.Schemas.UploadRequest;
export type UserAnswerInput = Components.Schemas.UserAnswerInput;
export type UserApprovalInput = Components.Schemas.UserApprovalInput;
export type UserInterruptInput = Components.Schemas.UserInterruptInput;
export type UserMessageInput = Components.Schemas.UserMessageInput;
export type ValidationIssue = Components.Schemas.ValidationIssue;
export type WebsiteHandover = Components.Schemas.WebsiteHandover;
