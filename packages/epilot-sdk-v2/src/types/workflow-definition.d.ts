/* Auto-copied from workflow-definition-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type EnforceLimitsParam = boolean;
    }
    export interface QueryParameters {
        EnforceLimitsParam?: Parameters.EnforceLimitsParam;
    }
    namespace Schemas {
        export type ActionSchedule = ImmediateSchedule | DelayedSchedule | RelativeSchedule;
        /**
         * Configuration for AI Agent to run
         */
        export interface AgentConfig {
            [name: string]: any;
            /**
             * Id of the configured AI Agent to run
             */
            agent_id: string;
        }
        export interface AiAgentTask {
            id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            journey?: StepJourney;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it while the flow is running. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Only a manual task, or an automation or AI task whose `trigger_mode` is `manual` or absent, can carry it: on a decision or an automatic kind it is normalised to false on create, update and load.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) on every create, update and load — a client-supplied array is replaced. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins; an id occurring twice in one task is rejected. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate task completion while the flow is running.
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            agent_config?: /* Configuration for AI Agent to run */ AgentConfig;
            /**
             * How the agent run is started. `automatic` starts it as soon as the task becomes current; `manual` waits for a person to run it and to approve the result. An absent value is read as `manual` everywhere: the engine dispatches only an explicit `automatic`, the builder shows the task as manual, and the task may carry the skip gate and required subtasks.
             */
            trigger_mode?: "manual" | "automatic";
        }
        /**
         * AI extraction + prefill configuration for the attached journey (Flows v2 only)
         */
        export interface AiPrefillConfig {
            enabled?: boolean;
            source?: {
                type?: "flow_context";
                input_entity?: "thread" | "first_email" | "last_email";
            };
            extraction_fields?: AiPrefillExtractionField[];
            mappings?: AiPrefillMapping[];
            min_confidence?: number;
            /**
             * Free-text, cross-field context for the extractor (e.g. "amounts are always in euros")
             */
            instructions?: string;
        }
        export interface AiPrefillExtractionField {
            key: string;
            type: "string" | "number" | "boolean" | "date" | "enum";
            description?: string;
            /**
             * Set when the author replaced the derived description with their own; the builder preserves flagged descriptions across re-derivations
             */
            description_overridden?: boolean;
            enum?: string[];
        }
        export interface AiPrefillMapping {
            source: string;
            block_id: string;
            block_type: "text-input" | "number-input" | "personal-information" | "meter-reading";
            block_field?: string;
        }
        /**
         * Configuration for automation execution to run
         */
        export interface AutomationConfig {
            /**
             * Id of the configured automation to run
             */
            flow_id?: string;
            /**
             * Transient field. The full automation action configuration following the automation API action schema. Processed by the backend during create/update and stripped before storage. When present without a flow_id, a new automation flow is created. When present with a flow_id, the existing automation flow is updated.
             *
             */
            action_config?: {
                [name: string]: any;
                /**
                 * The action type (e.g. send-email, trigger-workflow)
                 */
                type: string;
                /**
                 * Action-specific configuration
                 */
                config?: {
                    [name: string]: any;
                };
            };
            /**
             * Transient field. When present, the backend clones the automation flow referenced by this ID and assigns the new flow_id to the task. Used when duplicating an automation task to give it an independent automation. Stripped before storage.
             *
             */
            duplicated_flow_id?: string;
            input_context?: /**
             * Optional. Source of the entity fed into this automation task. If omitted, the entity of the trigger that started the run is used.
             *
             */
            AutomationInputContext;
            output_context?: /**
             * Optional. What happens to the entity produced by this automation task (the last successful entity-producing action of its automation).
             *
             */
            AutomationOutputContext;
            /**
             * The closing reasons a person may choose from when running this task, making a `cancel-flow-execution` automation semi-automated: the step is configured here, the reason is picked at execution time. Every id must also appear in the flow template's `closing_reasons` — the step narrows the flow's vocabulary rather than introducing its own, which is what keeps the chosen reason a member of the execution's `configured_reasons` and what lets blueprints export the reasons a step depends on. Only a task whose `trigger_mode` is `manual` or absent can carry it; the template healer clears it from an `automatic` task, which has no assignee moment to choose in. Empty or absent means the automation runs with the reasons fixed in its own action config.
             */
            eligible_closing_reason_ids?: string[];
            email_review?: /* Whether the person running a semi-automated send-email step may adjust the email before it goes out, and what they may adjust. Meaningful only on a task a person triggers — the engine's own dispatch has nobody to review — so the template healer clears it from an `automatic` task. With `enabled` false the email is sent exactly as configured and the person only triggers it. */ EmailReviewConfig;
            /**
             * Whether the person running a semi-automated cancel step may add a free-text note alongside the reason they choose. Only meaningful with `eligible_closing_reason_ids`, since the note is written in the same prompt; the template healer clears it from a step that asks nothing.
             */
            allow_execution_note?: boolean;
        }
        /**
         * What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`.
         */
        export type AutomationFailurePolicy = "stop" | "continue";
        /**
         * Optional. Source of the entity fed into this automation task. If omitted, the entity of the trigger that started the run is used.
         *
         */
        export interface AutomationInputContext {
            /**
             * `trigger` = the entity of the trigger that started the run, or of the specific configured trigger named by `trigger_id`. `task` = entity produced by an upstream task in the graph.
             *
             */
            source: "trigger" | "task";
            /**
             * Required when source is `task`. The id of the upstream task whose output entity should feed this task.
             */
            task_id?: string;
            /**
             * Optional when source is `trigger`. Pins the input to one specific configured trigger (primary or additional) by its id. When absent, the trigger that started the run supplies the entity.
             *
             */
            trigger_id?: string;
        }
        /**
         * Optional. What happens to the entity produced by this automation task (the last successful entity-producing action of its automation).
         *
         */
        export interface AutomationOutputContext {
            /**
             * When true, the entity this task's automation produces becomes the run's primary context ("main context") when the task completes. Downstream tasks and decisions configured with the default input context then act on that entity. When the task is reverted or reset, the previous primary context is restored.
             *
             */
            set_as_primary?: boolean;
            /**
             * When true, the entity this task's automation produces is added to the run's contexts without becoming the main one. `set_as_primary` implies this: an entity cannot be the primary context without being a context. Contexts are unique by entity id, so a task that re-produces an entity already on the run adds nothing.
             *
             */
            attach_to_contexts?: boolean;
        }
        export interface AutomationTask {
            id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            journey?: StepJourney;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it while the flow is running. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Only a manual task, or an automation or AI task whose `trigger_mode` is `manual` or absent, can carry it: on a decision or an automatic kind it is normalised to false on create, update and load.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) on every create, update and load — a client-supplied array is replaced. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins; an id occurring twice in one task is rejected. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate task completion while the flow is running.
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            automation_config: /* Configuration for automation execution to run */ AutomationConfig;
            on_failure?: /* What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`. */ AutomationFailurePolicy;
            trigger_mode?: TriggerMode;
            schedule?: ActionSchedule;
            /**
             * Indicates whether this task was created automatically by journeys or manually by an user
             */
            created_automatically?: boolean;
        }
        export interface AutomationTrigger {
            id?: string;
            type: "automation";
            /**
             * Id of the automation config that triggers this workflow
             */
            automation_id?: string;
            /**
             * For email thread triggers, specifies which entity from the triggered email thread to use as the primary input for automation and decision tasks. Defaults to `thread` when not specified.
             *
             */
            input_entity?: "thread" | "first_email" | "last_email";
            /**
             * Transient field. Trigger configurations for creating or updating the trigger automation flow. Each item follows the automation API trigger schema. Processed by the backend during create/update and stripped before storage.
             *
             */
            trigger_config?: {
                [name: string]: any;
                /**
                 * The trigger type (e.g. entity_operation, activity)
                 */
                type: string;
                /**
                 * Trigger-specific configuration
                 */
                configuration?: {
                    [name: string]: any;
                };
            }[];
        }
        export interface ChangeReasonStatusReq {
            status: ClosingReasonsStatus;
        }
        /**
         * One Closing reason for a workflow
         */
        export interface ClosingReason {
            id?: string;
            title?: string;
            status?: ClosingReasonsStatus;
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
        /**
         * Error response returned when a closing reason is not found.
         */
        export interface ClosingReasonNotFoundResp {
            /**
             * Human-readable message indicating the closing reason was not found.
             * example:
             * Closing reason with id 'xyz789' not found
             */
            message?: string;
        }
        export interface ClosingReasons {
            reasons: /* One Closing reason for a workflow */ ClosingReason[];
        }
        export interface ClosingReasonsIds {
            reasons: ClosingReasonId[];
        }
        export type ClosingReasonsStatus = "ACTIVE" | "INACTIVE";
        export interface Condition {
            id: string;
            /**
             * The name of the branch
             * example:
             * Branch 1
             */
            branch_name: string;
            logical_operator: "AND" | "OR";
            statements: Statement[] | null;
        }
        /**
         * Base schema for V2 flow templates. A flow template defines the structure of a workflow
         * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
         * as blueprints that can be instantiated as flow executions.
         *
         */
        export interface CreateFlowTemplate {
            /**
             * Unique identifier for the flow template, generated by the system.
             */
            id?: string;
            /**
             * Organization identifier that owns this flow template.
             */
            org_id?: string;
            /**
             * Display name for the workflow, shown to users in the UI.
             */
            name: string;
            /**
             * Optional detailed description of the workflow's purpose and behavior.
             */
            description?: string;
            /**
             * Portal-facing overrides of the flow name. Portal surfaces (the End Customer and Installer portals, and the builder's portal views) show the matching override instead of `name`; an absent key falls back to `name`. Has no effect on execution behaviour.
             */
            portal_titles?: {
                /**
                 * Flow title shown to end customers.
                 */
                ecp?: string;
                /**
                 * Flow title shown to installers.
                 */
                installer?: string;
            };
            trigger?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger;
            /**
             * Whether the workflow is enabled or not
             */
            enabled?: boolean;
            version?: /**
             * Version of the workflow schema.
             *
             * - `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.
             * - `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.
             * - `v3` – Advanced workflows. Adds support for branching logic (conditions), parallel paths, and enhanced automation features such as dynamic triggers and flow control.
             *
             * example:
             * 2
             */
            Version;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            created_at?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            updated_at?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            /**
             * Additional trigger configurations that can also start this flow.
             * Useful for flows that should be startable via multiple methods
             * (e.g., both automation AND manual). Each additional trigger may
             * target its own entity and may carry its own entry edge (an edge
             * whose `from_id` is the trigger's `id`); without an entry edge of
             * its own it starts the flow at the primary entry. Triggers must be
             * complementary — no two triggers on a flow may cover the same
             * entity and event.
             *
             */
            additional_triggers?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger[];
            phases?: Phase[];
            /**
             * Customer-facing progress segments layered on top of the flow graph. Stages are strictly ordered boundaries: the first is anchored at the trigger, every later one is an edge cut (or a legacy entry-node anchor whose in-edges form the cut). The array order is the boundary order and must match the graph. Per-node stage membership is always computed from the graph, never stored, and a run may end in any stage.
             */
            stages?: /* A customer-facing progress segment layered on top of the flow graph. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order; the array order is the boundary order and must match the graph. The first stage's entry node is always the trigger node. */ Stage[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": {
             *     "event": "FlowStarted"
             *   },
             *   "target": {
             *     "entitySchema": "opportunity",
             *     "entityAttribute": "title"
             *   },
             *   "value": {
             *     "source": "workflow_name"
             *   }
             * }
             */
            EntitySync[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Whether only a single closing reason can be selected
             */
            singleClosingReasonSelection?: boolean;
            /**
             * The manifest IDs associated with this workflow
             */
            _manifest?: string[];
            /**
             * When true, this is a linear flow: task enablement is computed at runtime from the graph — a task is enabled only when all of its direct predecessor tasks in its branch are done. This fully overrides any explicit per-task requirements.
             */
            linear?: boolean;
            context_settings?: /**
             * Where a flow runs, and where people see it.
             * A run is ALWAYS visible on the entities it runs on — the entity its trigger supplied and every context it picks up. That is not configurable: it is what running there means, and hiding a run from its own entity is what `visibility: background` is for.
             * `displays` lists ADDITIONAL entity kinds, reached by relation. It is written once and holds for every trigger: which entry point started a run says how it began, not who the process concerns. A flow that finance must see on the Account must be seen there whether it started from a web form or an inbound email.
             *
             */
            FlowContextSettings;
            /**
             * Non-blocking warnings for configuration limits the flow exceeds. Returned on read (get-flow) and on create/update responses. Size/count limits are soft: a flow exceeding them is still accepted and stored, and the violations are reported here so the UI can surface an informational banner. The flow is still fully editable and usable.
             */
            limit_warnings?: /* A configuration limit that the flow currently exceeds. Returned by the get-flow endpoint and by create/update responses so the UI can show a non-blocking banner. Size/count limit violations never cause a 400 — only structural errors do. The flow remains fully usable; users are encouraged to bring values within the limits. */ FlowLimitWarning[];
            /**
             * Persisted preference for how the flow's task automations relate to the flow's `enabled` state. When `true`, task automations always mirror the flow: their enabled state is re-synced on every update and new task automations are created with the flow's current enabled state. When `false`, task automations are managed independently: updates never change their enabled state and new task automations are always created enabled, so a flow that is built or edited while disabled does not accumulate automations that stay off after the flow is re-enabled. When unset, legacy behavior applies: new task automations inherit the flow's enabled state and updates leave existing ones untouched. Safety: on updates that do NOT change `enabled`, the in-sync mode never re-enables automations that were disabled by the system (e.g. infinite-loop protection) — only a deliberate `enabled` flip on the flow re-arms those.
             */
            keep_task_automations_in_sync?: boolean;
        }
        export interface DecisionTask {
            id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            journey?: StepJourney;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it while the flow is running. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Only a manual task, or an automation or AI task whose `trigger_mode` is `manual` or absent, can carry it: on a decision or an automatic kind it is normalised to false on create, update and load.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) on every create, update and load — a client-supplied array is replaced. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins; an id occurring twice in one task is rejected. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate task completion while the flow is running.
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            trigger_mode: TriggerMode;
            conditions: Condition[];
            /**
             * When true, all branches with met conditions execute in parallel. When false, only the first branch with a met condition is executed. The default depends on the trigger mode: automatic decisions treat an absent field as true (backwards compatibility), while manual decisions require an explicit true before multiple branches can be selected at execution time (absent = single-select).
             */
            allow_parallel_execution?: boolean;
            schedule?: DelayedSchedule | RelativeSchedule;
            loop_config?: {
                /**
                 * The id of the branch that will be looped
                 */
                loop_branch_id: string;
                /**
                 * The id of the branch that will be used to exit the loop
                 */
                exit_branch_id: string;
                /**
                 * Maximum number of iterations for the loop branch
                 */
                max_iterations: number;
            };
        }
        /**
         * Error response returned when a workflow definition or flow template is not found.
         */
        export interface DefinitionNotFoundResp {
            /**
             * Human-readable message indicating the resource was not found.
             * example:
             * Definition with id 'abc123' not found
             */
            message?: string;
        }
        export interface DelayedSchedule {
            mode: "delayed";
            duration: number;
            unit: TimeUnit;
        }
        /**
         * Set due date for the task based on a dynamic condition
         */
        export interface DueDateConfig {
            duration: number;
            unit: TimeUnit;
            type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED";
            task_id?: string;
            phase_id?: string;
        }
        /**
         * Configuration for calculating a due date dynamically based on workflow events.
         * The due date is computed by adding a duration (numberOfUnits + timePeriod) to
         * a reference point defined by actionTypeCondition (e.g., when workflow started,
         * when a step closed, or when a phase finished).
         *
         */
        export interface DynamicDueDate {
            /**
             * Number of time units to add to the reference point.
             */
            numberOfUnits: number;
            timePeriod: TimeUnit;
            actionTypeCondition: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED";
            stepId?: string;
            phaseId?: string;
        }
        /**
         * Details regarding ECP for the workflow step
         */
        export interface ECPDetails {
            enabled?: boolean;
            label?: string;
            description?: string;
            journey?: StepJourney;
        }
        export interface Edge {
            id: string;
            /**
             * Source node of the edge: a task id, a phase id, the literal `trigger`
             * (the primary trigger's entry edge), or an additional trigger's `id`
             * (that trigger's own entry edge — allowing the flow to start at a
             * different node depending on which trigger fired).
             *
             */
            from_id: string;
            to_id?: string | null;
            condition_id?: string;
            /**
             * Indicates a default case for a decision task. Only decision task edges can have this field and the flow advances using this edge if no conditions are met.
             */
            none_met?: boolean;
        }
        /**
         * Whether the person running a semi-automated send-email step may adjust the email before it goes out, and what they may adjust. Meaningful only on a task a person triggers — the engine's own dispatch has nobody to review — so the template healer clears it from an `automatic` task. With `enabled` false the email is sent exactly as configured and the person only triggers it.
         */
        export interface EmailReviewConfig {
            enabled?: boolean;
            /**
             * The assignee may attach documents from the task's entity at execution, in addition to whatever the configured rules match.
             */
            allow_document_selection?: boolean;
            /**
             * The assignee may rewrite the rendered subject and body. They edit the rendered text, not the template, so the template is unchanged and other flows using it are unaffected.
             */
            allow_subject_and_body_edit?: boolean;
        }
        /**
         * describe the requirement for a task to be enabled
         */
        export interface EnableRequirement {
            /**
             * The id of the task that it points to
             */
            task_id?: string;
            /**
             * The id of the phase that it points to
             */
            phase_id?: string;
            when: "TASK_FINISHED" | "PHASE_FINISHED";
        }
        /**
         * example:
         * {
         *   "trigger": {
         *     "event": "FlowStarted"
         *   },
         *   "target": {
         *     "entitySchema": "opportunity",
         *     "entityAttribute": "title"
         *   },
         *   "value": {
         *     "source": "workflow_name"
         *   }
         * }
         */
        export interface EntitySync {
            /**
             * Trigger configuration that determines when entity sync occurs.
             * Contains the event type and optional filter to target specific tasks/phases.
             *
             */
            trigger: {
                /**
                 * Event or condition that triggers the entity sync.
                 * Direct triggers match EventBridge event names (PascalCase).
                 * Status triggers are deduced from event + entity status combination.
                 *
                 */
                event: "FlowStarted" | "FlowCompleted" | "FlowCancelled" | "FlowReopened" | "FlowDeleted" | "FlowAssigned" | "FlowDueDateChanged" | "FlowContextsChanged" | "TaskUpdated" | "CurrTaskChanged" | "TaskCompleted" | "TaskSkipped" | "TaskMarkedInProgress" | "TaskMarkedOnHold" | "PhaseUpdated" | "PhaseCompleted" | "PhaseSkipped" | "PhaseMarkedInProgress";
                /**
                 * Optional filter to target specific tasks or phases.
                 * Specify either task_template_id OR phase_template_id (mutually exclusive).
                 * If omitted, trigger applies to all tasks/phases.
                 *
                 */
                filter?: {
                    /**
                     * Target a specific task by its template ID (stable across executions)
                     */
                    task_template_id?: string;
                    /**
                     * Target a specific phase by its template ID (stable across executions)
                     */
                    phase_template_id?: string;
                };
            };
            value: {
                source: "workflow_name" | "workflow_status" | "workflow_assigned_to" | "task_name" | "task_status" | "task_assigned_to" | "phase_name" | "phase_status" | "phase_assigned_to" | "custom_value";
                value?: string;
            };
            target: {
                /**
                 * example:
                 * opportunity
                 */
                entitySchema: string;
                /**
                 * example:
                 * title
                 */
                entityAttribute: string;
            };
        }
        /**
         * Standard error response returned when an API request fails.
         */
        export interface ErrorResp {
            /**
             * Human-readable error message describing what went wrong.
             * example:
             * Invalid request body: name is required
             */
            message?: string;
        }
        export interface EvaluationSource {
            /**
             * The id of the action or trigger
             */
            id?: string;
            origin?: "trigger" | "action";
            /**
             * `trigger_source` (with origin `trigger`) marks a "started by" statement: the run's fired trigger is compared against the configured trigger ids in `values` — no entity attribute is involved.
             * `main_context` (with origin `trigger`, no `id`) marks a statement evaluated against the run's PRIMARY context: the fired trigger's entity, re-bound by any completed task that promotes its output to main context (`output_context.set_as_primary`). `schema` carries the subject's schema for attribute selection only — resolution is by the primary flag, never by schema.
             *
             */
            origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context";
            schema?: string;
            attribute?: string;
            attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "message_email_address";
            attribute_repeatable?: boolean;
            attribute_operation?: "all" | "updated" | "added" | "deleted";
            /**
             * Multi-attribute mode. When present and length > 1, the statement is
             * evaluated against every listed attribute and combined via
             * `attributes_match`. All listed attributes must share the same
             * `attribute_type`. Mutually exclusive with `attribute_sub_field`,
             * `date_offset`, and `attribute_operation`. When absent or length === 1,
             * the legacy `attribute` field is used.
             *
             */
            attributes?: [
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
            /**
             * Inner connector across `attributes`. `any` (default) means at least
             * one attribute must satisfy the operator; `all` means every attribute
             * must satisfy it. Ignored when `attributes` is absent or has length < 2.
             *
             */
            attributes_match?: "any" | "all";
            /**
             * For complex attribute types, specifies which sub-field to extract (e.g., "address", "name", "email_type")
             */
            attribute_sub_field?: string;
            /**
             * Offset to apply to the source date value before comparison (e.g., +18 years for age check, +30 days for expiry)
             */
            date_offset?: {
                /**
                 * Number of units to offset
                 */
                amount?: number;
                /**
                 * Unit of the offset
                 */
                unit?: "days" | "months" | "years";
            };
        }
        /**
         * Where a flow runs, and where people see it.
         * A run is ALWAYS visible on the entities it runs on — the entity its trigger supplied and every context it picks up. That is not configurable: it is what running there means, and hiding a run from its own entity is what `visibility: background` is for.
         * `displays` lists ADDITIONAL entity kinds, reached by relation. It is written once and holds for every trigger: which entry point started a run says how it began, not who the process concerns. A flow that finance must see on the Account must be seen there whether it started from a web form or an inbound email.
         *
         */
        export interface FlowContextSettings {
            /**
             * `entity_views` — the flow appears on entity pages, table views and the portal, as decided by `displays`.
             * `background` — the flow is hidden from every entity view. It runs and records exactly the same way; only the surfaces are suppressed.
             *
             */
            visibility?: "entity_views" | "background";
            main_context?: /**
             * Which of a flow's contexts owns the run: the entity conditions, automations and entity sync resolve against by default.
             * ABSENT means the historical behaviour — the primary trigger's entity. That default exists because it describes every flow built so far, not because the primary trigger is special: a flow with several complementary triggers has no natural primary, which is exactly when stating it explicitly earns its place.
             * This decides the STARTING main context only. A task with `output_context.set_as_primary` still moves it mid-run; the setting seeds the run and the graph moves it from there.
             *
             */
            MainContextSetting;
            /**
             * Additional entity kinds this flow is visible on, beyond the entities it runs on. Empty or absent means it is seen only where it runs.
             * ORDERED. An entry may anchor (`from`) only on the main context or on an EARLIER entry. That ordering is what makes a cycle (contact anchored on account anchored on contact) unrepresentable rather than something to detect at runtime.
             *
             */
            displays?: /**
             * One additional entity kind the flow should be visible on, found by relation from the main context or from an earlier entry.
             * An entity reached this way has no context of its own: it shows the main context's run, and acting on it acts on the main context. Nothing is copied and no second run starts.
             * There is no `enabled` flag and no entry for an entity the flow already runs on. An entry exists because someone wants the flow seen there; remove it to stop. Whether an entity is a context at all is decided by the trigger, by a task's `output_context`, or by `attach_to_contexts` below — never by a display setting.
             *
             */
            FlowDisplayRule[];
        }
        /**
         * One additional entity kind the flow should be visible on, found by relation from the main context or from an earlier entry.
         * An entity reached this way has no context of its own: it shows the main context's run, and acting on it acts on the main context. Nothing is copied and no second run starts.
         * There is no `enabled` flag and no entry for an entity the flow already runs on. An entry exists because someone wants the flow seen there; remove it to stop. Whether an entity is a context at all is decided by the trigger, by a task's `output_context`, or by `attach_to_contexts` below — never by a display setting.
         *
         */
        export interface FlowDisplayRule {
            id: string;
            /**
             * The schema of the entity this rule is about.
             */
            entity_schema: string;
            from?: /**
             * Where an entry starts looking. Absent means `main_context`.
             * A ROLE, not a schema: an entry anchored on `main_context` follows the primary when a task promotes another entity, where naming a schema would freeze it on the old one.
             *
             */
            FlowRuleAnchor;
            /**
             * Relation `_tags` to match (`family:label` form supported). Absent or empty matches every relation of `entity_schema`.
             *
             */
            relation_labels?: string[];
            /**
             * Governs CONTEXT. When true the matched entity is added to the run's contexts, so later rules can anchor on it and conditions, entity sync and task automations can address it. Resolved by the ENGINE — at start and whenever the contexts change — never as a side effect of rendering, which would make a run's context set depend on who opened which page.
             * A context must resolve to one entity: when several match, none is attached. Display is unaffected and still shows all of them.
             *
             */
            attach_to_contexts?: boolean;
        }
        /**
         * A configuration limit that the flow currently exceeds. Returned by the get-flow endpoint and by create/update responses so the UI can show a non-blocking banner. Size/count limit violations never cause a 400 — only structural errors do. The flow remains fully usable; users are encouraged to bring values within the limits.
         */
        export interface FlowLimitWarning {
            /**
             * i18n key identifying the exceeded limit (e.g. errors.task_max_incoming_edges).
             */
            i18nKey: string;
            /**
             * Human-readable description of the exceeded limit.
             */
            message: string;
            /**
             * The configured maximum for this limit.
             */
            max: number;
            /**
             * The actual value the flow currently has for this limit (e.g. the actual number of incoming connections).
             */
            current?: number;
            /**
             * ID of the task/node the limit applies to, when applicable.
             */
            node_id?: string;
            task_name?: string;
            branch_name?: string;
            /**
             * Name of the AI-agent parameter the limit applies to, when applicable.
             */
            param_name?: string;
            /**
             * JSON path within the flow to the offending value.
             */
            path: any[];
        }
        /**
         * Where an entry starts looking. Absent means `main_context`.
         * A ROLE, not a schema: an entry anchored on `main_context` follows the primary when a task promotes another entity, where naming a schema would freeze it on the old one.
         *
         */
        export type FlowRuleAnchor = /**
         * Where an entry starts looking. Absent means `main_context`.
         * A ROLE, not a schema: an entry anchored on `main_context` follows the primary when a task promotes another entity, where naming a schema would freeze it on the old one.
         *
         */
        /* The run's primary context, whatever it currently is. */ MainContextAnchor | /**
         * An earlier entry in `displays`, by its id: this entry searches from whatever that one matched. Chaining ticket -> contact -> account this way keeps both hops DISPLAY-only; making the contact a real context first is a separate decision (`attach_to_contexts`), not a prerequisite for reaching the account.
         *
         */
        RuleAnchor;
        /**
         * Base schema for V2 flow templates. A flow template defines the structure of a workflow
         * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
         * as blueprints that can be instantiated as flow executions.
         *
         */
        export interface FlowTemplate {
            /**
             * Unique identifier for the flow template, generated by the system.
             */
            id?: string;
            /**
             * Organization identifier that owns this flow template.
             */
            org_id?: string;
            /**
             * Display name for the workflow, shown to users in the UI.
             */
            name: string;
            /**
             * Optional detailed description of the workflow's purpose and behavior.
             */
            description?: string;
            /**
             * Portal-facing overrides of the flow name. Portal surfaces (the End Customer and Installer portals, and the builder's portal views) show the matching override instead of `name`; an absent key falls back to `name`. Has no effect on execution behaviour.
             */
            portal_titles?: {
                /**
                 * Flow title shown to end customers.
                 */
                ecp?: string;
                /**
                 * Flow title shown to installers.
                 */
                installer?: string;
            };
            trigger?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger;
            /**
             * Whether the workflow is enabled or not
             */
            enabled?: boolean;
            version?: /**
             * Version of the workflow schema.
             *
             * - `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.
             * - `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.
             * - `v3` – Advanced workflows. Adds support for branching logic (conditions), parallel paths, and enhanced automation features such as dynamic triggers and flow control.
             *
             * example:
             * 2
             */
            Version;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            created_at?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            updated_at?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            /**
             * Additional trigger configurations that can also start this flow.
             * Useful for flows that should be startable via multiple methods
             * (e.g., both automation AND manual). Each additional trigger may
             * target its own entity and may carry its own entry edge (an edge
             * whose `from_id` is the trigger's `id`); without an entry edge of
             * its own it starts the flow at the primary entry. Triggers must be
             * complementary — no two triggers on a flow may cover the same
             * entity and event.
             *
             */
            additional_triggers?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger[];
            phases?: Phase[];
            /**
             * Customer-facing progress segments layered on top of the flow graph. Stages are strictly ordered boundaries: the first is anchored at the trigger, every later one is an edge cut (or a legacy entry-node anchor whose in-edges form the cut). The array order is the boundary order and must match the graph. Per-node stage membership is always computed from the graph, never stored, and a run may end in any stage.
             */
            stages?: /* A customer-facing progress segment layered on top of the flow graph. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order; the array order is the boundary order and must match the graph. The first stage's entry node is always the trigger node. */ Stage[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": {
             *     "event": "FlowStarted"
             *   },
             *   "target": {
             *     "entitySchema": "opportunity",
             *     "entityAttribute": "title"
             *   },
             *   "value": {
             *     "source": "workflow_name"
             *   }
             * }
             */
            EntitySync[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Whether only a single closing reason can be selected
             */
            singleClosingReasonSelection?: boolean;
            /**
             * The manifest IDs associated with this workflow
             */
            _manifest?: string[];
            /**
             * When true, this is a linear flow: task enablement is computed at runtime from the graph — a task is enabled only when all of its direct predecessor tasks in its branch are done. This fully overrides any explicit per-task requirements.
             */
            linear?: boolean;
            context_settings?: /**
             * Where a flow runs, and where people see it.
             * A run is ALWAYS visible on the entities it runs on — the entity its trigger supplied and every context it picks up. That is not configurable: it is what running there means, and hiding a run from its own entity is what `visibility: background` is for.
             * `displays` lists ADDITIONAL entity kinds, reached by relation. It is written once and holds for every trigger: which entry point started a run says how it began, not who the process concerns. A flow that finance must see on the Account must be seen there whether it started from a web form or an inbound email.
             *
             */
            FlowContextSettings;
            /**
             * Non-blocking warnings for configuration limits the flow exceeds. Returned on read (get-flow) and on create/update responses. Size/count limits are soft: a flow exceeding them is still accepted and stored, and the violations are reported here so the UI can surface an informational banner. The flow is still fully editable and usable.
             */
            limit_warnings?: /* A configuration limit that the flow currently exceeds. Returned by the get-flow endpoint and by create/update responses so the UI can show a non-blocking banner. Size/count limit violations never cause a 400 — only structural errors do. The flow remains fully usable; users are encouraged to bring values within the limits. */ FlowLimitWarning[];
            /**
             * Persisted preference for how the flow's task automations relate to the flow's `enabled` state. When `true`, task automations always mirror the flow: their enabled state is re-synced on every update and new task automations are created with the flow's current enabled state. When `false`, task automations are managed independently: updates never change their enabled state and new task automations are always created enabled, so a flow that is built or edited while disabled does not accumulate automations that stay off after the flow is re-enabled. When unset, legacy behavior applies: new task automations inherit the flow's enabled state and updates leave existing ones untouched. Safety: on updates that do NOT change `enabled`, the in-sync mode never re-enables automations that were disabled by the system (e.g. infinite-loop protection) — only a deliberate `enabled` flip on the flow re-arms those.
             */
            keep_task_automations_in_sync?: boolean;
        }
        /**
         * Base schema for V2 flow templates. A flow template defines the structure of a workflow
         * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
         * as blueprints that can be instantiated as flow executions.
         *
         */
        export interface FlowTemplateBase {
            /**
             * Unique identifier for the flow template, generated by the system.
             */
            id?: string;
            /**
             * Organization identifier that owns this flow template.
             */
            org_id?: string;
            /**
             * Display name for the workflow, shown to users in the UI.
             */
            name: string;
            /**
             * Optional detailed description of the workflow's purpose and behavior.
             */
            description?: string;
            /**
             * Portal-facing overrides of the flow name. Portal surfaces (the End Customer and Installer portals, and the builder's portal views) show the matching override instead of `name`; an absent key falls back to `name`. Has no effect on execution behaviour.
             */
            portal_titles?: {
                /**
                 * Flow title shown to end customers.
                 */
                ecp?: string;
                /**
                 * Flow title shown to installers.
                 */
                installer?: string;
            };
            trigger?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger;
            /**
             * Whether the workflow is enabled or not
             */
            enabled?: boolean;
            version?: /**
             * Version of the workflow schema.
             *
             * - `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.
             * - `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.
             * - `v3` – Advanced workflows. Adds support for branching logic (conditions), parallel paths, and enhanced automation features such as dynamic triggers and flow control.
             *
             * example:
             * 2
             */
            Version;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            created_at?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            updated_at?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            /**
             * Additional trigger configurations that can also start this flow.
             * Useful for flows that should be startable via multiple methods
             * (e.g., both automation AND manual). Each additional trigger may
             * target its own entity and may carry its own entry edge (an edge
             * whose `from_id` is the trigger's `id`); without an entry edge of
             * its own it starts the flow at the primary entry. Triggers must be
             * complementary — no two triggers on a flow may cover the same
             * entity and event.
             *
             */
            additional_triggers?: /**
             * example:
             * {
             *   "type": "automation",
             *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
             * }
             */
            Trigger[];
            phases?: Phase[];
            /**
             * Customer-facing progress segments layered on top of the flow graph. Stages are strictly ordered boundaries: the first is anchored at the trigger, every later one is an edge cut (or a legacy entry-node anchor whose in-edges form the cut). The array order is the boundary order and must match the graph. Per-node stage membership is always computed from the graph, never stored, and a run may end in any stage.
             */
            stages?: /* A customer-facing progress segment layered on top of the flow graph. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order; the array order is the boundary order and must match the graph. The first stage's entry node is always the trigger node. */ Stage[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": {
             *     "event": "FlowStarted"
             *   },
             *   "target": {
             *     "entitySchema": "opportunity",
             *     "entityAttribute": "title"
             *   },
             *   "value": {
             *     "source": "workflow_name"
             *   }
             * }
             */
            EntitySync[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Whether only a single closing reason can be selected
             */
            singleClosingReasonSelection?: boolean;
            /**
             * The manifest IDs associated with this workflow
             */
            _manifest?: string[];
            /**
             * When true, this is a linear flow: task enablement is computed at runtime from the graph — a task is enabled only when all of its direct predecessor tasks in its branch are done. This fully overrides any explicit per-task requirements.
             */
            linear?: boolean;
            context_settings?: /**
             * Where a flow runs, and where people see it.
             * A run is ALWAYS visible on the entities it runs on — the entity its trigger supplied and every context it picks up. That is not configurable: it is what running there means, and hiding a run from its own entity is what `visibility: background` is for.
             * `displays` lists ADDITIONAL entity kinds, reached by relation. It is written once and holds for every trigger: which entry point started a run says how it began, not who the process concerns. A flow that finance must see on the Account must be seen there whether it started from a web form or an inbound email.
             *
             */
            FlowContextSettings;
            /**
             * Non-blocking warnings for configuration limits the flow exceeds. Returned on read (get-flow) and on create/update responses. Size/count limits are soft: a flow exceeding them is still accepted and stored, and the violations are reported here so the UI can surface an informational banner. The flow is still fully editable and usable.
             */
            limit_warnings?: /* A configuration limit that the flow currently exceeds. Returned by the get-flow endpoint and by create/update responses so the UI can show a non-blocking banner. Size/count limit violations never cause a 400 — only structural errors do. The flow remains fully usable; users are encouraged to bring values within the limits. */ FlowLimitWarning[];
            /**
             * Persisted preference for how the flow's task automations relate to the flow's `enabled` state. When `true`, task automations always mirror the flow: their enabled state is re-synced on every update and new task automations are created with the flow's current enabled state. When `false`, task automations are managed independently: updates never change their enabled state and new task automations are always created enabled, so a flow that is built or edited while disabled does not accumulate automations that stay off after the flow is re-enabled. When unset, legacy behavior applies: new task automations inherit the flow's enabled state and updates leave existing ones untouched. Safety: on updates that do NOT change `enabled`, the in-sync mode never re-enables automations that were disabled by the system (e.g. infinite-loop protection) — only a deliberate `enabled` flip on the flow re-arms those.
             */
            keep_task_automations_in_sync?: boolean;
        }
        /**
         * Short unique id (length 8) to identify the Flow Template.
         * example:
         * 7hj28akg
         */
        export type FlowTemplateId = string;
        export interface FlowTemplatesList {
            results: /**
             * Base schema for V2 flow templates. A flow template defines the structure of a workflow
             * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
             * as blueprints that can be instantiated as flow executions.
             *
             */
            FlowTemplate[];
        }
        export interface ImmediateSchedule {
            mode?: "immediate";
        }
        export type ItemType = "STEP" | "SECTION";
        export interface JourneyAutomationTrigger {
            id?: string;
            type: "journey_automation";
            /**
             * Schema of the main entity where flow will be triggered. The entity will be picked from automation context.
             */
            entity_schema?: string;
        }
        export interface JourneyContextParameter {
            /**
             * The journey context parameter key (paramKey in the journey's contextSchema)
             */
            key: string;
            /**
             * The value to pass for the parameter when launching the journey
             */
            value: string;
        }
        /**
         * One place a flow template task presets one of the requested context parameters.
         */
        export interface JourneyContextUsage {
            kind: "workflow-task";
            resource: {
                type: "workflow_template";
                /**
                 * Flow template id.
                 */
                id: string;
                /**
                 * Flow template name, when the template has one.
                 */
                name?: string;
            };
            /**
             * Present only when the matching task carries an id and/or a name.
             */
            location?: {
                task_id?: string;
                task_name?: string;
            };
            matched_as: {
                dialect: "name";
                /**
                 * The bare parameter key, e.g. `origin` — never a `journey_context.origin`-style prefixed token. Unlike every sibling adapter, this service stores the reference structurally in a typed field (`tasks[].journey.context_parameters[].key`), so the prefixed path string never appears in the stored record; `dialect: name` already tells the caller how to interpret `token`.
                 */
                token: string;
                /**
                 * Debugging path into the flow template where the match was found, e.g. `tasks[0].journey.context_parameters[1].key`. Not stable across edits to the template.
                 */
                at: string;
            };
            /**
             * Omitted when the underlying flow template has no id: a link built from an empty id could not resolve, so none is included. The usage row itself is still reported.
             */
            link_hint?: {
                route: "workflows-hub-flow";
                params: {
                    template_id: string;
                };
            };
        }
        /**
         * Request payload for getJourneyContextUsages.
         */
        export interface JourneyContextUsagesReq {
            /**
             * Journey whose context parameters are being checked for usage.
             */
            journey_id: string;
            /**
             * Context parameter keys to look for, as plain strings.
             */
            param_keys: string[];
            /**
             * Accepted and ignored. This service stores context references by name only; the field keeps one request shape across every adapter in this feature.
             */
            param_ids?: string[];
        }
        /**
         * Response payload for getJourneyContextUsages.
         */
        export interface JourneyContextUsagesResp {
            usages: /* One place a flow template task presets one of the requested context parameters. */ JourneyContextUsage[];
            /**
             * `partial` means the usages list hit its cap and the scan stopped there, before every scannable flow template in the org was examined. `ok` means the scan reached the end of the scannable population and returned every match found there — it does NOT mean every flow template in the org was examined: the underlying query only returns `version = v3` records, so legacy v1/v2 templates never enter the scan, and any record that fails to normalize is silently skipped and logged rather than failing the whole lookup.
             */
            status: "ok" | "partial";
            /**
             * Count of flow templates examined. This is every scannable flow template in the org, not only templates bound to this journey: the underlying query has no server-side journey filter, so it counts the org's whole scannable flow-template population, up to wherever the scan stopped if `status` is `partial`. "Scannable" excludes legacy v1/v2 records (the query filters to `version = v3`) and any record that fails to normalize (skipped and logged rather than failing the lookup), so this can be lower than the org's true total flow-template count.
             */
            scanned: number;
        }
        export interface JourneySubmissionTrigger {
            id?: string;
            type: "journey_submission";
            /**
             * ID of the journey that will trigger this flow
             */
            journey_id: string;
            /**
             * Name of the journey that will trigger this flow
             */
            journey_name?: string;
            automation_id?: string;
        }
        /**
         * The run's primary context, whatever it currently is.
         */
        export interface MainContextAnchor {
            role: "main_context";
        }
        /**
         * Which of a flow's contexts owns the run: the entity conditions, automations and entity sync resolve against by default.
         * ABSENT means the historical behaviour — the primary trigger's entity. That default exists because it describes every flow built so far, not because the primary trigger is special: a flow with several complementary triggers has no natural primary, which is exactly when stating it explicitly earns its place.
         * This decides the STARTING main context only. A task with `output_context.set_as_primary` still moves it mid-run; the setting seeds the run and the graph moves it from there.
         *
         */
        export interface MainContextSetting {
            /**
             * Entity schema of the main context. It need not be a schema any trigger provides: a run started on another context resolves it from that entity's relations.
             */
            schema: string;
            /**
             * Optional narrowing for that resolution. A run started on a context of another schema looks through the starting entity's relations for one of `schema`; these `_tags` narrow which relations count, for when schema alone is ambiguous.
             * Several matches: the FIRST is taken. Unlike an attaching display rule — which attaches nothing when several match, since binding an arbitrary entity as a surface has no justification — a run needs a primary to function at all, so a deterministic pick beats none.
             * No match: the run starts with the entity it was started on as primary, and records that the configured main context did not resolve. A manual start is never blocked because a relation happens to be missing.
             *
             */
            relation_labels?: string[];
        }
        export interface ManualTask {
            id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            journey?: StepJourney;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it while the flow is running. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Only a manual task, or an automation or AI task whose `trigger_mode` is `manual` or absent, can carry it: on a decision or an automatic kind it is normalised to false on create, update and load.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) on every create, update and load — a client-supplied array is replaced. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins; an id occurring twice in one task is rejected. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate task completion while the flow is running.
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
        }
        export interface ManualTrigger {
            id?: string;
            type: "manual";
            entity_schema?: string;
        }
        export interface MaxAllowedLimit {
            currentNoOfWorkflows?: number;
            maxAllowed?: number;
        }
        export type Operator = "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty";
        /**
         * Details regarding partner for the workflow step
         */
        export interface PartnerDetails {
            enabled?: boolean;
            label?: string;
            description?: string;
        }
        export interface Phase {
            id: string;
            name: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
        }
        export interface RelativeSchedule {
            mode: "relative";
            direction: "before" | "after";
            duration: number;
            unit: TimeUnit;
            reference: {
                /**
                 * The id of the entity / workflow / task, based on the origin of the schedule. For all_preceding_tasks_completed, use the sentinel value "all_preceding_tasks_completed".
                 */
                id: string;
                origin: "flow_started" | "task_completed" | "trigger_entity_attribute" | "all_preceding_tasks_completed";
                /**
                 * The schema of the entity
                 */
                schema?: string;
                /**
                 * An entity attribute that identifies a date / datetime
                 */
                attribute?: string;
            };
        }
        /**
         * An earlier entry in `displays`, by its id: this entry searches from whatever that one matched. Chaining ticket -> contact -> account this way keeps both hops DISPLAY-only; making the contact a real context first is a separate decision (`attach_to_contexts`), not a prerequisite for reaching the account.
         *
         */
        export interface RuleAnchor {
            role: "rule";
            /**
             * Id of an entry that appears earlier in `displays`.
             */
            rule_id: string;
        }
        export interface SearchFlowTemplates {
            name?: string;
            definition_id?: string;
            trigger_type?: "journey_submission" | "manual" | "automation";
            enabled?: boolean;
            from?: number;
            size?: number;
            sort_by?: "created_at" | "updated_at" | "name" | "enabled" | "id";
            sort_order?: "asc" | "desc";
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface Section {
            id?: string;
            name: string;
            order: number;
            type: ItemType;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            dueDate?: string;
            dynamicDueDate?: /**
             * Configuration for calculating a due date dynamically based on workflow events.
             * The due date is computed by adding a duration (numberOfUnits + timePeriod) to
             * a reference point defined by actionTypeCondition (e.g., when workflow started,
             * when a step closed, or when a phase finished).
             *
             */
            DynamicDueDate;
            assignedTo?: string[];
            steps: /* Action that needs to be done in a Workflow */ Step[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
        }
        /**
         * A customer-facing progress segment layered on top of the flow graph. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order; the array order is the boundary order and must match the graph. The first stage's entry node is always the trigger node.
         */
        export interface Stage {
            /**
             * Stable unique identifier for the stage.
             */
            id: string;
            /**
             * User-facing stage title.
             */
            name: string;
            /**
             * Customer-facing description of what happens in this stage.
             */
            description?: string;
            /**
             * Id of the graph node (task, phase, or the trigger sentinel) at which this stage begins; its incoming edges form the stage boundary, so no path may reach the node's successors without passing it. The first stage's entry_node_id is the trigger sentinel. Exactly one of entry_node_id / cut_edge_ids per stage; when both are present, cut_edge_ids wins.
             */
            entry_node_id?: string;
            /**
             * Edge-cut boundary, for stages that begin inside branching regions: the stage begins where these edges are crossed — one cut edge per branch that continues past the boundary, so that no path crosses it twice and none bypasses it. Branches that end before the boundary need no cut; a run may end in any stage. Cut edges may not be loop edges, end edges, or phase-internal edges. Node membership is derived by counting crossed boundaries, never stored.
             */
            cut_edge_ids?: string[];
            /**
             * Optional stage accent color, a key from a fixed palette.
             */
            color?: string;
            /**
             * Portal-facing overrides of the stage name. Portal surfaces show the matching override instead of `name`; an absent key falls back to `name`.
             */
            portal_names?: {
                /**
                 * Stage name shown to end customers.
                 */
                ecp?: string;
                /**
                 * Stage name shown to installers.
                 */
                installer?: string;
            };
            /**
             * Portal-facing overrides of the stage description. Portal surfaces show the matching override instead of `description`; an absent key falls back to `description`.
             */
            portal_descriptions?: {
                /**
                 * Stage description shown to end customers.
                 */
                ecp?: string;
                /**
                 * Stage description shown to installers.
                 */
                installer?: string;
            };
        }
        export interface Statement {
            id: string;
            source: EvaluationSource;
            operator: Operator;
            values: string[];
            /**
             * How to interpret values. "static" (default) means literal values. "relative_date" means values[0] is a dynamic date token like "today".
             */
            value_type?: "static" | "relative_date";
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
            dynamicDueDate?: /**
             * Configuration for calculating a due date dynamically based on workflow events.
             * The due date is computed by adding a duration (numberOfUnits + timePeriod) to
             * a reference point defined by actionTypeCondition (e.g., when workflow started,
             * when a step closed, or when a phase finished).
             *
             */
            DynamicDueDate;
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
            /**
             * Partner-specific task details shown to partner org users viewing shared resources
             */
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
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
            /**
             * Portal-facing label that replaces the default "Start now" button shown for this task's linked journey in the End Customer Portal / Installer Portal. Blank or absent means the portal keeps its own translated default.
             */
            portal_button_label?: string;
            /**
             * If true, the task be auto completed when the journey is completed. By default it is true.
             */
            complete_task_automatically?: boolean;
            /**
             * When true, the task cannot be completed while the flow is running until the linked journey was actually submitted. The execution service verifies the submission server-side via the correlation claims in the submission entity's journey_context. Manual tasks only: on any other task kind, or on a manual task with a delayed or relative schedule, the template is rejected (400); when no journey is linked the flag is dropped on create, update and load.
             */
            journey_submission_required?: boolean;
            /**
             * Values preset by the flow author for context parameters the journey declares in its contextSchema (String/Number parameters only, not entity-typed ones). Passed as journey context when the journey is launched from the task, overriding the default value of the parameter (e.g. `origin`).
             */
            context_parameters?: JourneyContextParameter[];
            ai_prefill?: /* AI extraction + prefill configuration for the attached journey (Flows v2 only) */ AiPrefillConfig;
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
        /**
         * One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup.
         */
        export interface Subtask {
            /**
             * Stable id, mirrored as data-subtask-id in the description markup
             */
            id: string;
            /**
             * Plain-text snapshot of the checklist item label
             */
            name?: string;
            /**
             * Which description field the item lives in
             */
            party: "description" | "ecp" | "installer" | "partner";
            /**
             * When true, the task cannot be completed while the flow is running until this item is checked
             */
            required?: boolean;
        }
        export type Task = ManualTask | AutomationTask | DecisionTask | AiAgentTask;
        export interface TaskBase {
            id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            journey?: StepJourney;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it while the flow is running. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Only a manual task, or an automation or AI task whose `trigger_mode` is `manual` or absent, can carry it: on a decision or an automatic kind it is normalised to false on create, update and load.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) on every create, update and load — a client-supplied array is replaced. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins; an id occurring twice in one task is rejected. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate task completion while the flow is running.
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            assigned_to?: (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Partner-specific task details shown to partner org users viewing shared resources
             */
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
        }
        export type TaskType = "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT";
        export type TimeUnit = "minutes" | "hours" | "days" | "weeks" | "months" | "years";
        /**
         * example:
         * {
         *   "type": "automation",
         *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
         * }
         */
        export type Trigger = /**
         * example:
         * {
         *   "type": "automation",
         *   "automation_id": "g92j2-sg9ug92hjt1gh-9s9gajgs-a979gg"
         * }
         */
        ManualTrigger | AutomationTrigger | JourneySubmissionTrigger | JourneyAutomationTrigger;
        export type TriggerMode = "manual" | "automatic";
        export type TriggerType = "MANUAL" | "AUTOMATIC";
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
        /**
         * Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution.
         */
        export interface VariableAssignment {
            /**
             * The variable expression, e.g., "{{entity.owner}}"
             * example:
             * {{entity.owner}}
             */
            variable: string;
            /**
             * The resolved values after variable evaluation (populated during execution)
             * example:
             * [
             *   "user_12345"
             * ]
             */
            value?: string[];
        }
        /**
         * Version of the workflow schema.
         *
         * - `v1` – *Deprecated*. The initial version of workflows with limited structure and automation capabilities.
         * - `v2` – Linear workflows. Supports sequential task execution with basic automation triggers.
         * - `v3` – Advanced workflows. Adds support for branching logic (conditions), parallel paths, and enhanced automation features such as dynamic triggers and flow control.
         *
         * example:
         * 2
         */
        export type Version = "v1" | "v2" | "v3";
        /**
         * V1 workflow definition schema. Defines a linear workflow structure with sections
         * and steps. Sections group related steps together, and steps represent individual
         * tasks that need to be completed. This is the legacy workflow model; for new
         * implementations, consider using V2 flow templates instead.
         *
         */
        export interface WorkflowDefinition {
            /**
             * Unique identifier for the workflow definition, generated by the system.
             */
            id?: string;
            /**
             * Display name for the workflow, shown to users in the UI.
             */
            name: string;
            /**
             * Optional detailed description of the workflow's purpose and behavior.
             */
            description?: string;
            /**
             * ISO String Date & Time
             * example:
             * 2021-04-27T12:01:13.000Z
             */
            creationTime?: string;
            /**
             * Whether the workflow is enabled or not
             */
            enabled?: boolean;
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
            dynamicDueDate?: /**
             * Configuration for calculating a due date dynamically based on workflow events.
             * The due date is computed by adding a duration (numberOfUnits + timePeriod) to
             * a reference point defined by actionTypeCondition (e.g., when workflow started,
             * when a step closed, or when a phase finished).
             *
             */
            DynamicDueDate;
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
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Whether only a single closing reason can be selected
             */
            singleClosingReasonSelection?: boolean;
            /**
             * The manifest IDs associated with this workflow
             */
            _manifest?: string[];
        }
    }
}
export declare namespace Paths {
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
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace CreateClosingReason {
        export type RequestBody = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
        namespace Responses {
            export type $201 = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
        }
    }
    namespace CreateDefinition {
        export type RequestBody = /**
         * V1 workflow definition schema. Defines a linear workflow structure with sections
         * and steps. Sections group related steps together, and steps represent individual
         * tasks that need to be completed. This is the legacy workflow model; for new
         * implementations, consider using V2 flow templates instead.
         *
         */
        Components.Schemas.WorkflowDefinition;
        namespace Responses {
            export type $201 = /**
             * V1 workflow definition schema. Defines a linear workflow structure with sections
             * and steps. Sections group related steps together, and steps represent individual
             * tasks that need to be completed. This is the legacy workflow model; for new
             * implementations, consider using V2 flow templates instead.
             *
             */
            Components.Schemas.WorkflowDefinition;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $409 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace CreateFlowTemplate {
        namespace Parameters {
            export type EnforceLimits = boolean;
        }
        export interface QueryParameters {
            enforce_limits?: Parameters.EnforceLimits;
        }
        export type RequestBody = /**
         * Base schema for V2 flow templates. A flow template defines the structure of a workflow
         * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
         * as blueprints that can be instantiated as flow executions.
         *
         */
        Components.Schemas.CreateFlowTemplate;
        namespace Responses {
            export type $201 = /**
             * Base schema for V2 flow templates. A flow template defines the structure of a workflow
             * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
             * as blueprints that can be instantiated as flow executions.
             *
             */
            Components.Schemas.FlowTemplate;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteClosingReason {
        namespace Parameters {
            /**
             * example:
             * x739cew
             */
            export type ReasonId = string;
        }
        export interface PathParameters {
            reasonId: /**
             * example:
             * x739cew
             */
            Parameters.ReasonId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $403 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a closing reason is not found. */ Components.Schemas.ClosingReasonNotFoundResp;
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
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export interface $404 {
            }
        }
    }
    namespace DeleteFlowTemplate {
        namespace Parameters {
            export type FlowId = /**
             * Short unique id (length 8) to identify the Flow Template.
             * example:
             * 7hj28akg
             */
            Components.Schemas.FlowTemplateId;
        }
        export interface PathParameters {
            flowId: Parameters.FlowId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a workflow definition or flow template is not found. */ Components.Schemas.DefinitionNotFoundResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace DuplicateFlowTemplate {
        namespace Parameters {
            export type FlowId = /**
             * Short unique id (length 8) to identify the Flow Template.
             * example:
             * 7hj28akg
             */
            Components.Schemas.FlowTemplateId;
        }
        export interface PathParameters {
            flowId: Parameters.FlowId;
        }
        namespace Responses {
            export type $201 = /**
             * Base schema for V2 flow templates. A flow template defines the structure of a workflow
             * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
             * as blueprints that can be instantiated as flow executions.
             *
             */
            Components.Schemas.FlowTemplate;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a workflow definition or flow template is not found. */ Components.Schemas.DefinitionNotFoundResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
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
    namespace GetClosingReason {
        namespace Parameters {
            /**
             * example:
             * x739cew
             */
            export type ReasonId = string;
        }
        export interface PathParameters {
            reasonId: /**
             * example:
             * x739cew
             */
            Parameters.ReasonId;
        }
        namespace Responses {
            export type $200 = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $403 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a closing reason is not found. */ Components.Schemas.ClosingReasonNotFoundResp;
        }
    }
    namespace GetClosingReasonV1 {
        namespace Parameters {
            export type ReasonId = string;
        }
        export interface PathParameters {
            reasonId: Parameters.ReasonId;
        }
        namespace Responses {
            export type $200 = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a closing reason is not found. */ Components.Schemas.ClosingReasonNotFoundResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
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
            export type $200 = /**
             * V1 workflow definition schema. Defines a linear workflow structure with sections
             * and steps. Sections group related steps together, and steps represent individual
             * tasks that need to be completed. This is the legacy workflow model; for new
             * implementations, consider using V2 flow templates instead.
             *
             */
            Components.Schemas.WorkflowDefinition;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a workflow definition or flow template is not found. */ Components.Schemas.DefinitionNotFoundResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace GetDefinitions {
        namespace Responses {
            export type $200 = /**
             * V1 workflow definition schema. Defines a linear workflow structure with sections
             * and steps. Sections group related steps together, and steps represent individual
             * tasks that need to be completed. This is the legacy workflow model; for new
             * implementations, consider using V2 flow templates instead.
             *
             */
            Components.Schemas.WorkflowDefinition[];
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace GetFlowTemplate {
        namespace Parameters {
            export type FlowId = /**
             * Short unique id (length 8) to identify the Flow Template.
             * example:
             * 7hj28akg
             */
            Components.Schemas.FlowTemplateId;
        }
        export interface PathParameters {
            flowId: Parameters.FlowId;
        }
        namespace Responses {
            export type $200 = /**
             * Base schema for V2 flow templates. A flow template defines the structure of a workflow
             * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
             * as blueprints that can be instantiated as flow executions.
             *
             */
            Components.Schemas.FlowTemplate;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a workflow definition or flow template is not found. */ Components.Schemas.DefinitionNotFoundResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace GetMaxAllowedLimit {
        namespace Responses {
            export type $200 = Components.Schemas.MaxAllowedLimit;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
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
    namespace ListFlowTemplates {
        namespace Parameters {
            export type TriggerSchema = string;
            export type TriggerSourceId = string;
            export type TriggerType = "automation" | "manual" | "journey_submission";
        }
        export interface QueryParameters {
            trigger_type?: Parameters.TriggerType;
            trigger_source_id?: Parameters.TriggerSourceId;
            trigger_schema?: Parameters.TriggerSchema;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FlowTemplatesList;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace SearchFlowTemplates {
        export type RequestBody = Components.Schemas.SearchFlowTemplates;
        namespace Responses {
            export interface $200 {
                hits?: number;
                results?: /**
                 * Base schema for V2 flow templates. A flow template defines the structure of a workflow
                 * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
                 * as blueprints that can be instantiated as flow executions.
                 *
                 */
                Components.Schemas.FlowTemplate[];
            }
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
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
    namespace UpdateClosingReason {
        namespace Parameters {
            /**
             * example:
             * x739cew
             */
            export type ReasonId = string;
        }
        export interface PathParameters {
            reasonId: /**
             * example:
             * x739cew
             */
            Parameters.ReasonId;
        }
        export type RequestBody = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
        namespace Responses {
            export type $200 = /* One Closing reason for a workflow */ Components.Schemas.ClosingReason;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $403 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a closing reason is not found. */ Components.Schemas.ClosingReasonNotFoundResp;
        }
    }
    namespace UpdateDefinition {
        namespace Parameters {
            export type DefinitionId = string;
        }
        export interface PathParameters {
            definitionId: Parameters.DefinitionId;
        }
        export type RequestBody = /**
         * V1 workflow definition schema. Defines a linear workflow structure with sections
         * and steps. Sections group related steps together, and steps represent individual
         * tasks that need to be completed. This is the legacy workflow model; for new
         * implementations, consider using V2 flow templates instead.
         *
         */
        Components.Schemas.WorkflowDefinition;
        namespace Responses {
            export type $200 = /**
             * V1 workflow definition schema. Defines a linear workflow structure with sections
             * and steps. Sections group related steps together, and steps represent individual
             * tasks that need to be completed. This is the legacy workflow model; for new
             * implementations, consider using V2 flow templates instead.
             *
             */
            Components.Schemas.WorkflowDefinition;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateFlowTemplate {
        namespace Parameters {
            export type EnforceLimits = boolean;
            export type FlowId = /**
             * Short unique id (length 8) to identify the Flow Template.
             * example:
             * 7hj28akg
             */
            Components.Schemas.FlowTemplateId;
        }
        export interface PathParameters {
            flowId: Parameters.FlowId;
        }
        export interface QueryParameters {
            enforce_limits?: Parameters.EnforceLimits;
        }
        export type RequestBody = /**
         * Base schema for V2 flow templates. A flow template defines the structure of a workflow
         * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
         * as blueprints that can be instantiated as flow executions.
         *
         */
        Components.Schemas.FlowTemplate;
        namespace Responses {
            export type $200 = /**
             * Base schema for V2 flow templates. A flow template defines the structure of a workflow
             * including phases, tasks, edges, triggers, and other configuration. Flow templates serve
             * as blueprints that can be instantiated as flow executions.
             *
             */
            Components.Schemas.FlowTemplate;
            export type $400 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $401 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $404 = /* Error response returned when a workflow definition or flow template is not found. */ Components.Schemas.DefinitionNotFoundResp;
            export type $409 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
            export type $500 = /* Standard error response returned when an API request fails. */ Components.Schemas.ErrorResp;
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
   * Retrieve all V1 workflow definitions belonging to the authenticated organization.
   */
  'getDefinitions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDefinitions.Responses.$200>
  /**
   * createDefinition - createDefinition
   * 
   * Create a new V1 workflow definition. The definition consists of sections and steps
   * that define the structure of the workflow. Once created, the definition can be used
   * to start workflow executions.
   * 
   * Deprecated: from 17 October 2026 00:00 Europe/Berlin this endpoint answers 409 —
   * create a flow via `POST /v2/flows/templates` instead.
   * 
   */
  'createDefinition'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDefinition.Responses.$201>
  /**
   * listFlowTemplates - listFlowTemplates
   * 
   * List all Flow Templates for a customer. Optionally, you can filter flow templates by trigger values.
   */
  'listFlowTemplates'(
    parameters?: Parameters<Paths.ListFlowTemplates.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListFlowTemplates.Responses.$200>
  /**
   * createFlowTemplate - createFlowTemplate
   * 
   * Create a new Flow Template (V2 workflow definition).
   * 
   * A flow template defines the structure of a workflow including its phases, tasks,
   * edges (connections between tasks), and trigger configuration. Once created, the
   * template can be used to start workflow executions.
   * 
   */
  'createFlowTemplate'(
    parameters?: Parameters<Paths.CreateFlowTemplate.QueryParameters> | null,
    data?: Paths.CreateFlowTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateFlowTemplate.Responses.$201>
  /**
   * searchFlowTemplates - searchFlowTemplates
   * 
   * Search for flow templates by name, trigger type, enabled status, and more.
   */
  'searchFlowTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchFlowTemplates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchFlowTemplates.Responses.$200>
  /**
   * getFlowTemplate - getFlowTemplate
   * 
   * Retrieve a specific flow template by its unique identifier.
   */
  'getFlowTemplate'(
    parameters?: Parameters<Paths.GetFlowTemplate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFlowTemplate.Responses.$200>
  /**
   * updateFlowTemplate - updateFlowTemplate
   * 
   * Update Flow Template.
   */
  'updateFlowTemplate'(
    parameters?: Parameters<Paths.UpdateFlowTemplate.QueryParameters & Paths.UpdateFlowTemplate.PathParameters> | null,
    data?: Paths.UpdateFlowTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateFlowTemplate.Responses.$200>
  /**
   * deleteFlowTemplate - deleteFlowTemplate
   * 
   * Delete Flow Template.
   */
  'deleteFlowTemplate'(
    parameters?: Parameters<Paths.DeleteFlowTemplate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFlowTemplate.Responses.$204>
  /**
   * duplicateFlowTemplate - duplicateFlowTemplate
   * 
   * Create a copy of an existing flow template. The duplicated template will have a new
   * unique identifier and can be modified independently of the original. This is useful
   * for creating variations of existing workflows without starting from scratch.
   * 
   */
  'duplicateFlowTemplate'(
    parameters?: Parameters<Paths.DuplicateFlowTemplate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DuplicateFlowTemplate.Responses.$201>
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
   * getClosingReason - getClosingReason
   * 
   * Get specific closing reason by id from the organisation.
   */
  'getClosingReason'(
    parameters?: Parameters<Paths.GetClosingReason.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClosingReason.Responses.$200>
  /**
   * updateClosingReason - updateClosingReason
   * 
   * Update an existing closing reason
   */
  'updateClosingReason'(
    parameters?: Parameters<Paths.UpdateClosingReason.PathParameters> | null,
    data?: Paths.UpdateClosingReason.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClosingReason.Responses.$200>
  /**
   * deleteClosingReason - deleteClosingReason
   * 
   * Permanently delete a closing reason (Using INACTIVE status is recommended instead)
   */
  'deleteClosingReason'(
    parameters?: Parameters<Paths.DeleteClosingReason.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteClosingReason.Responses.$204>
  /**
   * getClosingReasonV1 - getClosingReasonV1
   * 
   * Get specific closing reason by id from the organisation.
   */
  'getClosingReasonV1'(
    parameters?: Parameters<Paths.GetClosingReasonV1.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClosingReasonV1.Responses.$200>
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
     * Retrieve all V1 workflow definitions belonging to the authenticated organization.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDefinitions.Responses.$200>
    /**
     * createDefinition - createDefinition
     * 
     * Create a new V1 workflow definition. The definition consists of sections and steps
     * that define the structure of the workflow. Once created, the definition can be used
     * to start workflow executions.
     * 
     * Deprecated: from 17 October 2026 00:00 Europe/Berlin this endpoint answers 409 —
     * create a flow via `POST /v2/flows/templates` instead.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDefinition.Responses.$201>
  }
  ['/v2/flows/templates']: {
    /**
     * listFlowTemplates - listFlowTemplates
     * 
     * List all Flow Templates for a customer. Optionally, you can filter flow templates by trigger values.
     */
    'get'(
      parameters?: Parameters<Paths.ListFlowTemplates.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListFlowTemplates.Responses.$200>
    /**
     * createFlowTemplate - createFlowTemplate
     * 
     * Create a new Flow Template (V2 workflow definition).
     * 
     * A flow template defines the structure of a workflow including its phases, tasks,
     * edges (connections between tasks), and trigger configuration. Once created, the
     * template can be used to start workflow executions.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateFlowTemplate.QueryParameters> | null,
      data?: Paths.CreateFlowTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateFlowTemplate.Responses.$201>
  }
  ['/v2/flows/templates:search']: {
    /**
     * searchFlowTemplates - searchFlowTemplates
     * 
     * Search for flow templates by name, trigger type, enabled status, and more.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchFlowTemplates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchFlowTemplates.Responses.$200>
  }
  ['/v2/flows/templates/{flowId}']: {
    /**
     * getFlowTemplate - getFlowTemplate
     * 
     * Retrieve a specific flow template by its unique identifier.
     */
    'get'(
      parameters?: Parameters<Paths.GetFlowTemplate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFlowTemplate.Responses.$200>
    /**
     * updateFlowTemplate - updateFlowTemplate
     * 
     * Update Flow Template.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateFlowTemplate.QueryParameters & Paths.UpdateFlowTemplate.PathParameters> | null,
      data?: Paths.UpdateFlowTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateFlowTemplate.Responses.$200>
    /**
     * deleteFlowTemplate - deleteFlowTemplate
     * 
     * Delete Flow Template.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteFlowTemplate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFlowTemplate.Responses.$204>
  }
  ['/v2/flows/templates/{flowId}/duplicate']: {
    /**
     * duplicateFlowTemplate - duplicateFlowTemplate
     * 
     * Create a copy of an existing flow template. The duplicated template will have a new
     * unique identifier and can be modified independently of the original. This is useful
     * for creating variations of existing workflows without starting from scratch.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.DuplicateFlowTemplate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DuplicateFlowTemplate.Responses.$201>
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
  ['/v2/workflows/closing-reasons/{reasonId}']: {
    /**
     * getClosingReason - getClosingReason
     * 
     * Get specific closing reason by id from the organisation.
     */
    'get'(
      parameters?: Parameters<Paths.GetClosingReason.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClosingReason.Responses.$200>
    /**
     * updateClosingReason - updateClosingReason
     * 
     * Update an existing closing reason
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateClosingReason.PathParameters> | null,
      data?: Paths.UpdateClosingReason.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClosingReason.Responses.$200>
    /**
     * deleteClosingReason - deleteClosingReason
     * 
     * Permanently delete a closing reason (Using INACTIVE status is recommended instead)
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteClosingReason.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteClosingReason.Responses.$204>
  }
  ['/v1/workflows/closing-reasons/{reasonId}']: {
    /**
     * getClosingReasonV1 - getClosingReasonV1
     * 
     * Get specific closing reason by id from the organisation.
     */
    'get'(
      parameters?: Parameters<Paths.GetClosingReasonV1.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClosingReasonV1.Responses.$200>
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


export type ActionSchedule = Components.Schemas.ActionSchedule;
export type AgentConfig = Components.Schemas.AgentConfig;
export type AiAgentTask = Components.Schemas.AiAgentTask;
export type AiPrefillConfig = Components.Schemas.AiPrefillConfig;
export type AiPrefillExtractionField = Components.Schemas.AiPrefillExtractionField;
export type AiPrefillMapping = Components.Schemas.AiPrefillMapping;
export type AutomationConfig = Components.Schemas.AutomationConfig;
export type AutomationFailurePolicy = Components.Schemas.AutomationFailurePolicy;
export type AutomationInputContext = Components.Schemas.AutomationInputContext;
export type AutomationOutputContext = Components.Schemas.AutomationOutputContext;
export type AutomationTask = Components.Schemas.AutomationTask;
export type AutomationTrigger = Components.Schemas.AutomationTrigger;
export type ChangeReasonStatusReq = Components.Schemas.ChangeReasonStatusReq;
export type ClosingReason = Components.Schemas.ClosingReason;
export type ClosingReasonId = Components.Schemas.ClosingReasonId;
export type ClosingReasonNotFoundResp = Components.Schemas.ClosingReasonNotFoundResp;
export type ClosingReasons = Components.Schemas.ClosingReasons;
export type ClosingReasonsIds = Components.Schemas.ClosingReasonsIds;
export type ClosingReasonsStatus = Components.Schemas.ClosingReasonsStatus;
export type Condition = Components.Schemas.Condition;
export type CreateFlowTemplate = Components.Schemas.CreateFlowTemplate;
export type DecisionTask = Components.Schemas.DecisionTask;
export type DefinitionNotFoundResp = Components.Schemas.DefinitionNotFoundResp;
export type DelayedSchedule = Components.Schemas.DelayedSchedule;
export type DueDateConfig = Components.Schemas.DueDateConfig;
export type DynamicDueDate = Components.Schemas.DynamicDueDate;
export type ECPDetails = Components.Schemas.ECPDetails;
export type Edge = Components.Schemas.Edge;
export type EmailReviewConfig = Components.Schemas.EmailReviewConfig;
export type EnableRequirement = Components.Schemas.EnableRequirement;
export type EntitySync = Components.Schemas.EntitySync;
export type ErrorResp = Components.Schemas.ErrorResp;
export type EvaluationSource = Components.Schemas.EvaluationSource;
export type FlowContextSettings = Components.Schemas.FlowContextSettings;
export type FlowDisplayRule = Components.Schemas.FlowDisplayRule;
export type FlowLimitWarning = Components.Schemas.FlowLimitWarning;
export type FlowRuleAnchor = Components.Schemas.FlowRuleAnchor;
export type FlowTemplate = Components.Schemas.FlowTemplate;
export type FlowTemplateBase = Components.Schemas.FlowTemplateBase;
export type FlowTemplateId = Components.Schemas.FlowTemplateId;
export type FlowTemplatesList = Components.Schemas.FlowTemplatesList;
export type ImmediateSchedule = Components.Schemas.ImmediateSchedule;
export type ItemType = Components.Schemas.ItemType;
export type JourneyAutomationTrigger = Components.Schemas.JourneyAutomationTrigger;
export type JourneyContextParameter = Components.Schemas.JourneyContextParameter;
export type JourneyContextUsage = Components.Schemas.JourneyContextUsage;
export type JourneyContextUsagesReq = Components.Schemas.JourneyContextUsagesReq;
export type JourneyContextUsagesResp = Components.Schemas.JourneyContextUsagesResp;
export type JourneySubmissionTrigger = Components.Schemas.JourneySubmissionTrigger;
export type MainContextAnchor = Components.Schemas.MainContextAnchor;
export type MainContextSetting = Components.Schemas.MainContextSetting;
export type ManualTask = Components.Schemas.ManualTask;
export type ManualTrigger = Components.Schemas.ManualTrigger;
export type MaxAllowedLimit = Components.Schemas.MaxAllowedLimit;
export type Operator = Components.Schemas.Operator;
export type PartnerDetails = Components.Schemas.PartnerDetails;
export type Phase = Components.Schemas.Phase;
export type RelativeSchedule = Components.Schemas.RelativeSchedule;
export type RuleAnchor = Components.Schemas.RuleAnchor;
export type SearchFlowTemplates = Components.Schemas.SearchFlowTemplates;
export type Section = Components.Schemas.Section;
export type Stage = Components.Schemas.Stage;
export type Statement = Components.Schemas.Statement;
export type Step = Components.Schemas.Step;
export type StepDescription = Components.Schemas.StepDescription;
export type StepJourney = Components.Schemas.StepJourney;
export type StepRequirement = Components.Schemas.StepRequirement;
export type StepType = Components.Schemas.StepType;
export type Subtask = Components.Schemas.Subtask;
export type Task = Components.Schemas.Task;
export type TaskBase = Components.Schemas.TaskBase;
export type TaskType = Components.Schemas.TaskType;
export type TimeUnit = Components.Schemas.TimeUnit;
export type Trigger = Components.Schemas.Trigger;
export type TriggerMode = Components.Schemas.TriggerMode;
export type TriggerType = Components.Schemas.TriggerType;
export type UpdateEntityAttributes = Components.Schemas.UpdateEntityAttributes;
export type VariableAssignment = Components.Schemas.VariableAssignment;
export type Version = Components.Schemas.Version;
export type WorkflowDefinition = Components.Schemas.WorkflowDefinition;
