/* Auto-copied from workflow-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type ExecutionIdParam = string;
        export type PhaseIdParam = string;
        export type ScheduleIdParam = string;
        export type SoftDeleteParam = boolean;
        export type TaskIdParam = string;
    }
    export interface PathParameters {
        ExecutionIdParam?: Parameters.ExecutionIdParam;
        TaskIdParam?: Parameters.TaskIdParam;
        PhaseIdParam?: Parameters.PhaseIdParam;
        ScheduleIdParam?: Parameters.ScheduleIdParam;
    }
    export interface QueryParameters {
        SoftDeleteParam?: Parameters.SoftDeleteParam;
    }
    namespace Schemas {
        export type ActionSchedule = ImmediateSchedule | DelayedSchedule | RelativeSchedule;
        export interface AddTaskReq {
            /**
             * Source node id for the edge to this task
             */
            previous_task_id: string; // uuid
            /**
             * Target node id for the edge from this task
             */
            next_task_id: string; // uuid
            task: {
                /**
                 * Id of the task
                 */
                id?: string; // uuid
                name: string;
                status?: /**
                 * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
                 * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
                 * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
                 * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
                 * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
                 * - **COMPLETED**: Step/Task has been finished successfully
                 * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
                 * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
                 * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
                 * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
                 * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
                 * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
                 *
                 */
                StepStatus;
                /**
                 * example:
                 * 2021-04-27T12:00:00.000Z
                 */
                due_date?: string;
                due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
                assigned_to?: /* The user ids or variable assignments */ Assignees;
                /**
                 * flag for controlling enabled/disabled state of the task
                 */
                enabled?: boolean;
                automation_config?: AutomationInfo;
                phase_id?: string;
                task_type?: TaskType;
            };
        }
        /**
         * Configuration for AI Agent to run
         */
        export interface AgentConfig {
            [name: string]: any;
            /**
             * Id of the configured AI Agent to run
             */
            agent_id: string;
            /**
             * Parameters to customize the AI Agent behavior
             */
            parameters?: {
                [key: string]: any;
            };
        }
        export interface AgentExecutionInfo {
            /**
             * Id of the agent execution started by this task
             */
            execution_id?: string;
            /**
             * Status of the agent execution, when it already ran
             */
            execution_status?: string;
            error_reason?: string;
            /**
             * Server-computed outcome read from the agent execution's structured_output (e.g. assigned, recommended, no_eligible_partner, missing_input). When the outcome means the work is not really done (no_eligible_partner, missing_input) the task is held as the current task instead of auto-completing, so the phase does not advance.
             */
            outcome?: string;
        }
        export interface AiAgentTask {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
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
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: AnalyticsInfo;
            /**
             * Time when the task was created
             */
            created_at?: string; // date-time
            /**
             * Last Update timestamp
             */
            updated_at?: string; // date-time
            /**
             * Flag to indicate if the task was created manually
             */
            manually_created?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled: boolean;
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
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
            agent_execution?: AgentExecutionInfo;
            /**
             * ID of the agent execution, used for tracking status updates. This is needed as a separate field to allow indexing.
             */
            agent_execution_id?: string;
        }
        export interface AnalyticsInfo {
            started_at?: string; // date-time
            in_progress_at?: string; // date-time
            completed_at?: string; // date-time
            /**
             * Last updated timestamp of the status
             */
            status_updated_at?: string; // date-time
            /**
             * The user which moved the task/phase to IN_PROGRESS state.
             */
            in_progress_by?: /* The user id */ UserId;
            /**
             * The user which moved the task/phase to COMPLETED state.
             */
            completed_by?: /* The user id */ UserId;
            /**
             * The user which moved the task/phase to SKIPPED state.
             */
            skipped_by?: /* The user id */ UserId;
            /**
             * The user which moved the task/phase to ON_HOLD state.
             */
            on_hold_by?: /* The user id */ UserId;
        }
        /**
         * The user ids or variable assignments
         */
        export type Assignees = (string | /* Represents a variable assignment with its expression and optional resolved value. Used for dynamic user assignments that get resolved during workflow execution. */ VariableAssignment)[];
        /**
         * Configuration for automation execution to run
         */
        export interface AutomationConfig {
            /**
             * Id of the configured automation to run
             */
            flowId: string;
            /**
             * Id of the automation execution which ran
             */
            executionId?: string;
            /**
             * Status of Automation Execution. Types can be found in Automation API
             */
            executionStatus?: string;
        }
        export interface AutomationInfo {
            /**
             * Id of the automation that should be run by this task
             */
            flow_id: string;
            /**
             * Id of the automation execution, when it already ran
             */
            execution_id?: string;
            /**
             * Status of the automation execution, when it already ran
             */
            execution_status?: string;
            error_reason?: string;
            input_context?: /**
             * Optional. Source of the entity fed into this automation task. If omitted, the workflow's primary entity is used.
             *
             */
            AutomationInputContext;
            /**
             * Internal — number of times flow-healing-service has attempted to re-trigger this task's lost automation dispatch. Used to cap retries and avoid an indefinite heal-on-every-read storm against a deterministically-failing automation flow.
             */
            heal_attempts?: number;
            /**
             * Internal — timestamp of the most recent heal attempt for this task. flow-healing-service uses this as a per-task debounce gate so the heal cannot fire more than once per HEAL_RETRY_COOLDOWN_MS regardless of how often the flow execution is read.
             */
            last_heal_attempted_at?: string; // date-time
        }
        /**
         * Optional. Source of the entity fed into this automation task. If omitted, the workflow's primary entity is used.
         *
         */
        export interface AutomationInputContext {
            /**
             * `trigger` = workflow's primary (trigger) entity. `task` = entity produced by an upstream task in the graph.
             *
             */
            source: "trigger" | "task";
            /**
             * Required when source is `task`. The id of the upstream task whose output entity should feed this task.
             */
            task_id?: string;
        }
        export interface AutomationTask {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
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
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: AnalyticsInfo;
            /**
             * Time when the task was created
             */
            created_at?: string; // date-time
            /**
             * Last Update timestamp
             */
            updated_at?: string; // date-time
            /**
             * Flag to indicate if the task was created manually
             */
            manually_created?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled: boolean;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            automation_config: AutomationInfo;
            /**
             * ID of the automation execution, used for tracking status updates.
             */
            automation_execution_id?: string;
            trigger_mode?: TriggerMode;
            schedule?: ActionSchedule;
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
        }
        export interface ClosingReason {
            id: string;
            title: string;
        }
        export interface ClosingReasonResp {
            reasons?: ClosingReason[];
        }
        export interface Condition {
            id: /**
             * A locally unique identifier for the condition
             * example:
             * abc123
             */
            ConditionId;
            /**
             * The name of the branch
             * example:
             * Branch 1
             */
            branch_name: string;
            logical_operator: "AND" | "OR";
            statements: Statement[];
            /**
             * Time when the condition was evaluated
             */
            evaluated_at?: string; // date-time
            /**
             * The result of evaluating this condition - true / false
             */
            is_met?: boolean;
        }
        /**
         * A locally unique identifier for the condition
         * example:
         * abc123
         */
        export type ConditionId = string;
        export interface CreateStepReq {
            insertionIndex: number;
            name: string;
            /**
             * Longer information regarding Task
             */
            description?: {
                enabled: boolean;
                value: string;
            };
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            sectionId?: string;
            /**
             * Manual / Automation step
             */
            executionType?: StepType;
            /**
             * Configuration for automated steps
             */
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
        }
        export interface DecisionTask {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
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
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: AnalyticsInfo;
            /**
             * Time when the task was created
             */
            created_at?: string; // date-time
            /**
             * Last Update timestamp
             */
            updated_at?: string; // date-time
            /**
             * Flag to indicate if the task was created manually
             */
            manually_created?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled: boolean;
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
             * When true, all branches with met conditions execute in parallel. When false, only the first branch with a met condition is executed. Defaults to true for backwards compatibility.
             */
            allow_parallel_execution?: boolean;
            schedule?: DelayedSchedule | RelativeSchedule;
            loop_config?: LoopConfig;
        }
        export interface DelayedSchedule {
            mode: "delayed";
            duration: number;
            unit: TimeUnit;
            /**
             * The id of the created schedule
             */
            schedule_id?: string;
            /**
             * The resolved absolute timestamp (ISO 8601, UTC) at which the task is
             * armed to run. Set by the backend when the schedule is armed and the
             * task transitions to SCHEDULED. Absent while the task is still
             * pending/unscheduled.
             *
             * Note: intentionally typed as plain `string` (not
             * `format: date-time`). `schedule` is embedded in the AutomationTask /
             * DecisionTask schemas; if a future request body ever accepts a task
             * (or schedule) and `safeParse`s it, `format: date-time` would make
             * openapi-zod-client emit `z.string().datetime({ offset: true })` and
             * reject any round-tripped value that is empty or tz-less — the exact
             * mechanism behind the May 2026 due_date incident (513ed597 added the
             * format, ee574b43 activated it via an unrelated regen; see commit
             * 2c91ff35). This field is server-written via `toISOString()` so it is
             * always a valid UTC instant; the datetime validator adds no
             * protection, only latent risk.
             *
             */
            scheduled_at?: string;
            /**
             * Set by the backend when scheduling this task FAILED (e.g. the
             * referenced date attribute is empty/unreadable, or the resolved fire
             * time is already in the past). A JSON string
             * ({ error_code, error_reason, error_info }) describing why, so the UI
             * can show a specific warning and ask the user to fix the date
             * attribute and re-schedule. Cleared when the task is successfully
             * (re-)armed. This is the decision-task counterpart of
             * AutomationInfo.error_reason (decision tasks have no automation_config).
             *
             */
            error_reason?: string;
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
         * set a Duedate for a step then a specific
         */
        export interface DynamicDueDate {
            numberOfUnits: number;
            timePeriod: "minutes" | "hours" | "days" | "weeks" | "months";
            actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED" | "PHASE_FINISHED";
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
            from_id: TaskId;
            to_id: TaskId;
            condition_id?: /**
             * A locally unique identifier for the condition
             * example:
             * abc123
             */
            ConditionId;
            /**
             * Indicates a default case for a decision task. Only decision task edges can have this field and the flow advances using this edge if no conditions are met.
             */
            none_met?: boolean;
        }
        /**
         * describe the requirement for a task to be enabled
         */
        export interface EnableRequirement {
            /**
             * The template_id of the task that this requirement points to
             */
            task_id?: string;
            /**
             * The template_id of the phase that this requirement points to
             */
            phase_id?: string;
            when: "TASK_FINISHED" | "PHASE_FINISHED";
        }
        export interface EntityRef {
            entity_id?: string;
            entity_schema?: string;
            /**
             * Flag to indicate if the entity is primary and should be used for evaluating the conditions of the tasks
             */
            is_primary?: boolean;
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
         * Contains a human-readable message describing the error.
         *
         */
        export interface ErrorResp {
            /**
             * Human-readable description of the error that occurred
             * example:
             * Validation failed: workflowId is required
             */
            message: string;
        }
        export interface EvaluationSource {
            /**
             * The id of the action or trigger
             */
            id?: string;
            origin?: "trigger" | "action";
            origin_type?: "entity" | "workflow" | "journey_block";
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
             * For complex attribute types, specifies which sub-field to extract (e.g., 'address', 'name', 'email_type')
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
        export interface ExecutionPaginationDynamo {
            orgId?: string;
            creationTime?: string;
        }
        export interface Flow {
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
        }
        export interface FlowClosingReason {
            selected_reasons?: ClosingReason[];
            configured_reasons?: ClosingReason[];
            extra_description?: string;
        }
        export type FlowContext = EntityRef;
        export interface FlowExecution {
            id: FlowExecutionId;
            flow_template_id: FlowTemplateId;
            org_id: string;
            name: string;
            /**
             * Creation timestamp which will double as started time as well
             */
            created_at: string;
            /**
             * Last Update timestamp
             */
            updated_at: string;
            /**
             * Due date for finishing the workflow
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            status: WorkflowStatus;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: {
                /**
                 * Timestamp when the flow execution started
                 */
                started_at?: string;
                /**
                 * Timestamp when the flow execution was completed
                 */
                completed_at?: string;
                /**
                 * Timestamp when the flow execution was closed
                 */
                closed_at?: string;
                /**
                 * User who started the flow execution.
                 */
                started_by?: string;
                /**
                 * User who closed the flow execution
                 */
                closed_by?: string;
            };
            contexts: FlowContext[];
            crt_tasks: {
                id?: TaskId;
                /**
                 * Timestamp when this task entered crt_tasks (i.e. became current). Used by the flow-healing-service as the authoritative gate for "has this PENDING task been stuck long enough to heal?". Using the task's own analytics.status_updated_at as the gate produced false positives because transitioning a task INTO crt_tasks does not change its status — so that timestamp can be hours old for a freshly-current task.
                 */
                crt_since?: string; // date-time
            }[];
            phases?: Phase[];
            tasks: Task[];
            edges: Edge[];
            /**
             * [Internal] Tracks the chain of automation-originated executions to prevent infinite loops. This is an internal property and should not be used by external consumers.
             */
            _execution_chain?: {
                /**
                 * ID of the parent flow execution that triggered this execution via automation
                 */
                parent_execution_id?: string;
                /**
                 * ID of the automation task in the parent execution that triggered this
                 */
                parent_task_id?: string;
                /**
                 * The depth in the execution chain (0 for manual triggers, 1+ for automation-triggered)
                 */
                depth?: number;
            };
            closing_reason?: FlowClosingReason;
            /**
             * Indicates whether this flow execution is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
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
             * Taxonomy ids (both Labels and Purposes) that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            trigger: FlowTrigger;
            /**
             * Indicates whether only a single closing reason can be selected when closing the flow execution
             */
            singleClosingReasonSelection?: boolean;
            /**
             * Copied from the flow template at start. When true, task enablement is computed at runtime from the graph (a task is enabled only when all of its direct predecessor tasks in its branch are done) instead of from each task's explicit requirements.
             */
            linear?: boolean;
        }
        export type FlowExecutionId = string;
        export interface FlowSlim {
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
        }
        export type FlowTemplateId = string;
        export interface FlowTrigger {
            type?: TriggerType;
            automation_config?: AutomationInfo;
        }
        export interface ImmediateSchedule {
            mode: "immediate";
        }
        export type ItemType = "STEP" | "SECTION";
        export interface LastEvaluatedKey {
            orgId?: string;
            creationTime?: string;
        }
        export interface LoopConfig {
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
            /**
             * Current number of iterations for the loop branch
             */
            crt_iterations?: number;
        }
        /**
         * Information about loop iterations, when task is part of a loop branch
         */
        export interface LoopInfo {
            /**
             * Maximum number of iterations for the loop branch
             */
            max_iterations: number;
            /**
             * Current number of iterations for the loop branch
             */
            crt_iterations?: number;
        }
        export interface ManualTask {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
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
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: AnalyticsInfo;
            /**
             * Time when the task was created
             */
            created_at?: string; // date-time
            /**
             * Last Update timestamp
             */
            updated_at?: string; // date-time
            /**
             * Flag to indicate if the task was created manually
             */
            manually_created?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled: boolean;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
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
        export interface PatchFlowReq {
            status?: WorkflowStatus;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            closing_reason?: FlowClosingReason;
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            contexts?: FlowContext[];
        }
        export interface PatchPhaseReq {
            name?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
        }
        /**
         * Request payload for updating a task within a flow execution.
         * All fields are optional; only provided fields will be updated.
         *
         */
        export interface PatchTaskReq {
            /**
             * Display name of the task
             * example:
             * Review customer application
             */
            name?: string;
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            /**
             * Explicit due date for the task. Takes precedence over
             * due_date_config if both are provided.
             *
             * Note: intentionally typed as plain `string` (not
             * `format: date-time`). For day/week/month-precision due
             * dates the server stores a "floating" datetime without a
             * timezone designator (e.g. `2026-05-28T00:00:00.000`) so
             * that the UI can render it as a date in the user's local
             * timezone without shifting the displayed day. Tightening
             * this to `format: date-time` causes openapi-zod-client to
             * emit `z.string().datetime({ offset: true })` in
             * `validators-generated.ts`, which then trips
             * `safeParse(body)` in `patch-task.ts` whenever the
             * sidebar sends a stored task back with a tz-less
             * `due_date`. See commit 4aca299c (Aug 2024) for the
             * original date-only display rationale and the May 2026
             * incident (513ed597 added the format, ee574b43
             * unintentionally activated it via an unrelated regen) for
             * the history. Long-term, day-precision due dates should
             * migrate to a separate `format: date` field.
             *
             * example:
             * 2026-05-28T00:00:00.000
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            /**
             * Controls whether the task is enabled (can be worked on) or disabled (grayed out).
             * Disabled tasks cannot have their status changed until re-enabled.
             *
             */
            enabled?: boolean;
            automation_config?: AutomationInfo;
            description?: /* Longer information regarding Task */ StepDescription;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Partner-specific task details shown to partner org users viewing shared resources
             */
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * For decision tasks with manual trigger mode, specifies which condition/branch
             * to follow when completing the task. The condition ID must match one of the
             * conditions defined on the decision task.
             *
             * example:
             * cond_branch_approved
             */
            next_condition_id?: string;
            /**
             * Controls behavior when updating a task that was already completed/skipped and
             * comes before the current task in the workflow:
             * - `true`: Reverts the execution - the patched task becomes the current task
             *   and all subsequent tasks are reset to PENDING status
             * - `false` (default): Updates only this task without affecting workflow position
             *   or other tasks
             *
             * **Important:** This parameter is silently ignored when:
             * - Patching the current task
             * - Patching future tasks (tasks that haven't been reached yet)
             *
             */
            revert_execution?: boolean;
            /**
             * Request-only signal indicating the task is being completed as a
             * result of the user submitting the task's linked journey (journey
             * auto-completion). When `true` and the task transitions to
             * `COMPLETED`, the activity log records a journey-specific message
             * instead of the generic completion message. Not persisted on the task.
             *
             */
            completed_via_journey?: boolean;
        }
        export interface Phase {
            id: PhaseId;
            template_id: string;
            name: string;
            status?: SectionStatus;
            /**
             * Last Update timestamp
             */
            updated_at?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics?: AnalyticsInfo;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
        }
        export type PhaseId = string;
        export interface PhaseInEntity {
            phase_id?: string;
            phase_name?: string;
            phase_progress?: number;
            phase_assignees?: string[];
        }
        export interface RelativeSchedule {
            mode: "relative";
            direction: "before" | "after";
            duration: number;
            unit: TimeUnit;
            reference: {
                /**
                 * The id of the entity / workflow / task, based on the origin of the schedule. For all_preceding_tasks_completed, use the sentinel value 'all_preceding_tasks_completed'.
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
            /**
             * The id of the created schedule
             */
            schedule_id?: string;
            /**
             * The resolved absolute timestamp (ISO 8601, UTC) at which the task is
             * armed to run. Set by the backend when the schedule is armed and the
             * task transitions to SCHEDULED. Absent while the task is still
             * pending/unscheduled.
             *
             * Note: intentionally typed as plain `string` (not
             * `format: date-time`). `schedule` is embedded in the AutomationTask /
             * DecisionTask schemas; if a future request body ever accepts a task
             * (or schedule) and `safeParse`s it, `format: date-time` would make
             * openapi-zod-client emit `z.string().datetime({ offset: true })` and
             * reject any round-tripped value that is empty or tz-less — the exact
             * mechanism behind the May 2026 due_date incident (513ed597 added the
             * format, ee574b43 activated it via an unrelated regen; see commit
             * 2c91ff35). This field is server-written via `toISOString()` so it is
             * always a valid UTC instant; the datetime validator adds no
             * protection, only latent risk.
             *
             */
            scheduled_at?: string;
            /**
             * Set by the backend when scheduling this task FAILED (e.g. the
             * referenced date attribute is empty/unreadable, or the resolved fire
             * time is already in the past). A JSON string
             * ({ error_code, error_reason, error_info }) describing why, so the UI
             * can show a specific warning and ask the user to fix the date
             * attribute and re-schedule. Cleared when the task is successfully
             * (re-)armed. This is the decision-task counterpart of
             * AutomationInfo.error_reason (decision tasks have no automation_config).
             *
             */
            error_reason?: string;
        }
        export interface SearchExecutionsReq {
            name?: string;
            status?: WorkflowStatus;
            includeDoneWorkflows?: boolean;
            assignedTo?: string;
            sorting?: SearchSorting;
            pagination?: ExecutionPaginationDynamo;
        }
        export interface SearchExecutionsResp {
            executions: /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "definitionId": "section_definition_id_1",
             *       "name": "Initial Information Gathering",
             *       "type": "SECTION",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "definitionId": "step_definition_id_1",
             *           "name": "Call client"
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "definitionId": "step_definition_id_2",
             *           "name": "Check product availability"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "definitionId": "step_definition_id_3",
             *           "name": "Send email confirming contact with the client"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "definitionId": "step_definition_id_4",
             *       "name": "Print and send catalog",
             *       "type": "STEP"
             *     }
             *   ]
             * }
             */
            WorkflowExecutionSlim[];
            lastEvaluatedKey?: LastEvaluatedKey;
        }
        export interface SearchFlowsReq {
            entity_id: string;
            entity_schema: string;
        }
        export interface SearchPagination {
            from?: number;
            size?: number;
        }
        export type SearchSorting = "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
        export interface SearchStepsReq {
            executionName?: string;
            stepName?: string;
            assignedTo?: number;
            includeDoneWorkflows?: boolean;
            manuallyCreated?: boolean;
            status?: "OPEN" | "COMPLETE" | "NEXT_OPEN_ITEM_IN_WORKFLOW";
            sorting?: SearchSorting;
            pagination?: SearchPagination;
        }
        export interface SearchStepsResp {
            /**
             * example:
             * 50
             */
            hits?: number;
            results?: {
                id: string;
                definitionId?: string;
                /**
                 * This field is deprecated. It will be soon removed. Please use only id.
                 */
                entityRefId?: string;
                name: string;
                description?: /* Longer information regarding Task */ StepDescription;
                type: ItemType;
                ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
                installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
                partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
                /**
                 * enabled flag results from calculating the requirements
                 */
                enabled?: boolean;
                requirements?: /* describe the requirement for step enablement */ StepRequirement[];
                executionType?: StepType;
                sectionId?: string;
                executionId: string;
                /**
                 * This field is deprecated. Please use assignedTo
                 */
                userIds?: number[];
                assignedTo?: string[];
                /**
                 * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
                 */
                assignedToInProgress?: string;
                /**
                 * The user which moved the step/task to the ON_HOLD state. The user should also be present in the assignedTo property of the step/task
                 */
                assignedToOnHold?: string;
                status?: /**
                 * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
                 * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
                 * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
                 * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
                 * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
                 * - **COMPLETED**: Step/Task has been finished successfully
                 * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
                 * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
                 * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
                 * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
                 * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
                 * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
                 *
                 */
                StepStatus;
                created?: string;
                lastUpdated?: string;
                /**
                 * Last updated timestamp of the status
                 */
                statusLastUpdated?: string;
                startedTime?: string;
                completedTime?: string;
                dueDate?: string;
                dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
                manuallyCreated?: boolean;
                automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
                journey?: StepJourney;
                /**
                 * Taxonomy ids (purposes in this case) that are associated with this step/task and used for filtering
                 */
                taxonomies?: string[];
                executionName: string;
                executionStatus: WorkflowStatus;
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
            }[];
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface Section {
            id: string;
            definitionId?: string;
            /**
             * Name for this Section
             * example:
             * Lead Qualification
             */
            name: string;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            startedTime?: string;
            completedTime?: string;
            status?: SectionStatus;
            type: ItemType;
            steps: Step[];
            /**
             * Taxonomy ids (purposes in this case) that are associated with this section and used for filtering
             */
            taxonomies?: string[];
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface SectionSimplified {
            id: string;
            definitionId?: string;
            /**
             * Name for this Section
             * example:
             * Lead Qualification
             */
            name: string;
            type: ItemType;
            steps: StepSimplified[];
            assignedTo?: string[];
        }
        export type SectionStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
        /**
         * Request payload for starting a new flow execution from a template.
         *
         */
        export interface StartFlowReq {
            /**
             * The unique identifier of the flow template (definition) to instantiate.
             * The template must exist and be accessible within the organization.
             *
             * example:
             * tpl_abc123def456
             */
            flow_template_id: string;
            trigger?: FlowTrigger;
            /**
             * Entity references that this execution is linked to. At least one context
             * is required. The primary context (is_primary: true) is used for condition
             * evaluation and data mapping.
             *
             */
            contexts: [
                FlowContext,
                ...FlowContext[]
            ];
            /**
             * Taxonomy purpose IDs to filter which phases and tasks are included in the execution.
             * Only phases/tasks tagged with matching purposes will be active. If empty or omitted,
             * all phases and tasks from the template are included.
             *
             */
            purposes?: string[];
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
        export interface Step {
            id: string;
            definitionId?: string;
            /**
             * This field is deprecated. It will be soon removed. Please use only id.
             */
            entityRefId?: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            type: ItemType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled?: boolean;
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            executionType?: StepType;
            sectionId?: string;
            executionId?: string;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToInProgress?: string;
            /**
             * The user which moved the step/task to the ON_HOLD state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToOnHold?: string;
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            created?: string;
            lastUpdated?: string;
            /**
             * Last updated timestamp of the status
             */
            statusLastUpdated?: string;
            startedTime?: string;
            completedTime?: string;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            manuallyCreated?: boolean;
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
            journey?: StepJourney;
            /**
             * Taxonomy ids (purposes in this case) that are associated with this step/task and used for filtering
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
        export interface StepExtended {
            id: string;
            definitionId?: string;
            /**
             * This field is deprecated. It will be soon removed. Please use only id.
             */
            entityRefId?: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            type: ItemType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled?: boolean;
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            executionType?: StepType;
            sectionId?: string;
            executionId: string;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToInProgress?: string;
            /**
             * The user which moved the step/task to the ON_HOLD state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToOnHold?: string;
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            created?: string;
            lastUpdated?: string;
            /**
             * Last updated timestamp of the status
             */
            statusLastUpdated?: string;
            startedTime?: string;
            completedTime?: string;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            manuallyCreated?: boolean;
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
            journey?: StepJourney;
            /**
             * Taxonomy ids (purposes in this case) that are associated with this step/task and used for filtering
             */
            taxonomies?: string[];
            executionName: string;
            executionStatus: WorkflowStatus;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
        }
        export interface StepId {
            id?: string;
            /**
             * This field is deprecated. It will be soon removed. Please use only id.
             */
            entityRefId?: string;
        }
        export interface StepJourney {
            id?: string;
            journeyId?: string;
            name?: string;
            /**
             * If true, the task be auto completed when the journey is completed
             */
            complete_task_automatically?: boolean;
        }
        export interface StepPositionAt {
            index: number;
            sectionId?: string;
        }
        /**
         * describe the requirement for step enablement
         */
        export interface StepRequirement {
            definitionId: string;
            type: ItemType;
            condition: "CLOSED";
        }
        export interface StepSimplified {
            id: string;
            definitionId?: string;
            /**
             * This field is deprecated. It will be soon removed. Please use only id.
             */
            entityRefId?: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            type: ItemType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Partner-specific task details shown to partner org users viewing shared resources
             */
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            enabled?: boolean;
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            /**
             * Manual / Automation step
             */
            executionType?: StepType;
        }
        /**
         * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
         * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
         * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
         * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
         * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
         * - **COMPLETED**: Step/Task has been finished successfully
         * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
         * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
         * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
         * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
         * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
         * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
         *
         */
        export type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "ON_HOLD" | "FAILED";
        export type StepType = "MANUAL" | "AUTOMATION";
        export type Task = ManualTask | AutomationTask | DecisionTask | AiAgentTask;
        export interface TaskBase {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
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
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics: AnalyticsInfo;
            /**
             * Time when the task was created
             */
            created_at?: string; // date-time
            /**
             * Last Update timestamp
             */
            updated_at?: string; // date-time
            /**
             * Flag to indicate if the task was created manually
             */
            manually_created?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled: boolean;
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
        export type TaskId = string;
        export type TaskType = "MANUAL" | "AUTOMATION" | "DECISION" | "AI_AGENT";
        export type TimeUnit = "minutes" | "hours" | "days" | "weeks" | "months" | "years";
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
        export interface UpdateStepReq {
            stepId?: string;
            /**
             * This field is deprecated. Please use stepId
             */
            entityRefId?: string;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToInProgress?: string;
            /**
             * The user which moved the step/task to the ON_HOLD state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToOnHold?: string;
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            name?: string;
            /**
             * Longer information regarding Task
             */
            description?: {
                enabled: boolean;
                value: string;
            };
            position?: StepPositionAt;
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
            startedTime?: string;
            completedTime?: string;
        }
        export interface UpdateStepResp {
            id: string;
            definitionId?: string;
            /**
             * This field is deprecated. It will be soon removed. Please use only id.
             */
            entityRefId?: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            type: ItemType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            partner?: /* Details regarding partner for the workflow step */ PartnerDetails;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled?: boolean;
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            executionType?: StepType;
            sectionId?: string;
            executionId?: string;
            /**
             * This field is deprecated. Please use assignedTo
             */
            userIds?: number[];
            assignedTo?: string[];
            /**
             * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToInProgress?: string;
            /**
             * The user which moved the step/task to the ON_HOLD state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToOnHold?: string;
            status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            created?: string;
            lastUpdated?: string;
            /**
             * Last updated timestamp of the status
             */
            statusLastUpdated?: string;
            startedTime?: string;
            completedTime?: string;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            manuallyCreated?: boolean;
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
            journey?: StepJourney;
            /**
             * Taxonomy ids (purposes in this case) that are associated with this step/task and used for filtering
             */
            taxonomies?: string[];
        }
        /**
         * The user id
         */
        export type UserId = string;
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
        export interface WorkflowContext {
            id: string;
            title: string;
            schema: string;
        }
        /**
         * example:
         * {
         *   "id": "8gja72h6kas6h",
         *   "name": "Lead Qualification",
         *   "trigger": "MANUAL",
         *   "status": "STARTED",
         *   "creationTime": "2021-04-27T12:01:13.000Z",
         *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
         *   "assignedTo": [
         *     "252",
         *     "29052"
         *   ],
         *   "flow": [
         *     {
         *       "id": "sectionId1",
         *       "name": "Initial Information Gathering",
         *       "steps": [
         *         {
         *           "id": "sada5641f3a21",
         *           "name": "Call client and confirm address and product",
         *           "definitionId": "step_definition_id_1",
         *           "status": "ASSIGNED",
         *           "assignedTo": [
         *             "11"
         *           ]
         *         },
         *         {
         *           "id": "sada5641f3a22",
         *           "name": "Check product availability",
         *           "status": "UNASSIGNED",
         *           "definitionId": "step_definition_id_2"
         *         },
         *         {
         *           "id": "sada5641f3a23",
         *           "name": "Send email confirming contact with the client",
         *           "definitionId": "step_definition_id_3",
         *           "status": "SKIPPED"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1",
         *       "definitionId": "step_definition_id_4",
         *       "name": "Print and send catalog",
         *       "status": "SKIPPED",
         *       "dueDate": "2023-01-15T20:00:00"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecution {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp which will double as started time as well
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            /**
             * Completed time of the workflow execution
             */
            completedTime?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            status?: WorkflowStatus;
            trigger?: TriggerType;
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: WorkflowContext[];
            nextOpenStep?: StepId;
            configuredClosingReasonSnapshot?: ClosingReason[];
            selectedClosingReasons?: ClosingReason[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            updateEntityAttributes?: UpdateEntityAttributes[];
            /**
             * Version of the workflow execution.
             */
            version?: number;
            /**
             * Taxonomy ids (both Labels and Purposes) that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Indicates whether only a single closing reason can be selected when closing the workflow execution
             */
            singleClosingReasonSelection?: boolean;
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
        }
        export interface WorkflowExecutionBase {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp which will double as started time as well
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            /**
             * Completed time of the workflow execution
             */
            completedTime?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            status?: WorkflowStatus;
            trigger?: TriggerType;
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: WorkflowContext[];
            nextOpenStep?: StepId;
            configuredClosingReasonSnapshot?: ClosingReason[];
            selectedClosingReasons?: ClosingReason[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            updateEntityAttributes?: UpdateEntityAttributes[];
            /**
             * Version of the workflow execution.
             */
            version?: number;
            /**
             * Taxonomy ids (both Labels and Purposes) that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Indicates whether only a single closing reason can be selected when closing the workflow execution
             */
            singleClosingReasonSelection?: boolean;
        }
        /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "contexts": [
         *     {
         *       "id": "3fa3fa86-0907-4642-a57e-0fe30a19874d",
         *       "schema": "contact"
         *     },
         *     {
         *       "id": "3a6d42fa-5070-4723-b90f-41ead4303e33",
         *       "schema": "opportunity"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecutionCreateReq {
            workflowId: string;
            trigger?: TriggerType;
            assignedTo?: string[];
            contexts?: WorkflowContext[];
            /**
             * An array of purposes to filter workflow phases.
             */
            purposes?: string[];
        }
        /**
         * example:
         * {
         *   "id": "8gja72h6kas6h",
         *   "name": "Lead Qualification",
         *   "trigger": "MANUAL",
         *   "status": "STARTED",
         *   "creationTime": "2021-04-27T12:01:13.000Z",
         *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
         *   "flow": [
         *     {
         *       "id": "sectionId1",
         *       "definitionId": "section_definition_id_1",
         *       "name": "Initial Information Gathering",
         *       "type": "SECTION",
         *       "steps": [
         *         {
         *           "id": "sada5641f3a21",
         *           "definitionId": "step_definition_id_1",
         *           "name": "Call client"
         *         },
         *         {
         *           "id": "sada5641f3a22",
         *           "definitionId": "step_definition_id_2",
         *           "name": "Check product availability"
         *         },
         *         {
         *           "id": "sada5641f3a23",
         *           "definitionId": "step_definition_id_3",
         *           "name": "Send email confirming contact with the client"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1",
         *       "definitionId": "step_definition_id_4",
         *       "name": "Print and send catalog",
         *       "type": "STEP"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecutionSlim {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp which will double as started time as well
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            /**
             * Completed time of the workflow execution
             */
            completedTime?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            status?: WorkflowStatus;
            trigger?: TriggerType;
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: WorkflowContext[];
            nextOpenStep?: StepId;
            configuredClosingReasonSnapshot?: ClosingReason[];
            selectedClosingReasons?: ClosingReason[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            updateEntityAttributes?: UpdateEntityAttributes[];
            /**
             * Version of the workflow execution.
             */
            version?: number;
            /**
             * Taxonomy ids (both Labels and Purposes) that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            /**
             * Indicates whether only a single closing reason can be selected when closing the workflow execution
             */
            singleClosingReasonSelection?: boolean;
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
        }
        export interface WorkflowExecutionUpdateReq {
            status?: WorkflowStatus;
            assignedTo?: string[];
            selectedClosingReasons?: ClosingReason[];
            closingReasonDescription?: string;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            /**
             * id of the user / partner user who is closing the workflow. For partner pass orgId_userId.
             */
            closedBy?: string;
            contexts?: WorkflowContext[];
            /**
             * Completed time of the workflow execution
             */
            completedTime?: string;
        }
        export interface WorkflowInEntity {
            id?: string;
            definition_id?: string;
            name?: string;
            status?: WorkflowStatus;
            assignees?: string[];
            duedate?: string; // date-time
            last_update_time?: string; // date-time
            progress?: number;
            upcoming_tasks_assignees?: string[];
            task_id?: string;
            task_name?: string;
            task_assignees?: string[];
            task_duedate?: string; // date-time
            task_execution_type?: StepType;
            task_status?: /**
             * **Note**: "UNASSIGNED" and "ASSIGNED" are deprecated and will be removed in a future version. Please use "PENDING" instead. Status values for workflow execution steps/tasks:
             * - **UNASSIGNED**: Step has not been assigned to any user (deprecated - use PENDING instead)
             * - **ASSIGNED**: Step has been assigned to one or more users (deprecated - use PENDING instead)
             * - **PENDING**: Step/Task is waiting to be started by assigned users or is ready for execution
             * - **IN_PROGRESS**: Step/Task is currently being worked on by a user
             * - **COMPLETED**: Step/Task has been finished successfully
             * - **SKIPPED**: Step/Task was intentionally bypassed and will not be executed
             * - **SCHEDULED**: Task is scheduled to run at a specific time in the future
             * - **CONDITION_PENDING**: Task is waiting for certain conditions to be met before it can proceed
             * - **WAITING_FOR_CONFIRMATION**: Step/Task is paused and waiting for user confirmation via an external input (e.g., link in email) before proceeding.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            phase_id?: string;
            phase_name?: string;
            phase_assignees?: string[];
            phase_progress?: number;
            phases_in_progress?: PhaseInEntity[];
            selected_closing_reasons?: ClosingReason[];
            closing_reason_description?: string;
        }
        export type WorkflowStatus = "STARTED" | "DONE" | "CLOSED";
    }
}
export declare namespace Paths {
    namespace AddTask {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        export type RequestBody = Components.Schemas.AddTaskReq;
        namespace Responses {
            export type $201 = Components.Schemas.Task;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace CancelSchedule {
        namespace Parameters {
            export type ExecutionId = string;
            export type ScheduleId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            schedule_id: Parameters.ScheduleId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace CancelTaskSchedule {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace CreateExecution {
        export type RequestBody = /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "contexts": [
         *     {
         *       "id": "3fa3fa86-0907-4642-a57e-0fe30a19874d",
         *       "schema": "contact"
         *     },
         *     {
         *       "id": "3a6d42fa-5070-4723-b90f-41ead4303e33",
         *       "schema": "opportunity"
         *     }
         *   ]
         * }
         */
        Components.Schemas.WorkflowExecutionCreateReq;
        namespace Responses {
            export type $201 = /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "assignedTo": [
             *     "252",
             *     "29052"
             *   ],
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "name": "Call client and confirm address and product",
             *           "definitionId": "step_definition_id_1",
             *           "status": "ASSIGNED",
             *           "assignedTo": [
             *             "11"
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED",
             *           "definitionId": "step_definition_id_2"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "definitionId": "step_definition_id_3",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "definitionId": "step_definition_id_4",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecution;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace CreateStep {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        export type RequestBody = Components.Schemas.CreateStepReq;
        namespace Responses {
            export type $201 = Components.Schemas.Step;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export interface $404 {
            }
        }
    }
    namespace DeleteFlowExecution {
        namespace Parameters {
            export type ExecutionId = string;
            export type Soft = boolean;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        export interface QueryParameters {
            soft?: Parameters.Soft;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteStep {
        namespace Parameters {
            export type ExecutionId = string;
            export type StepId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
            stepId: Parameters.StepId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace ExecuteTask {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Task;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace GetClosingReasonExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ClosingReasonResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace GetExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "assignedTo": [
             *     "252",
             *     "29052"
             *   ],
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "name": "Call client and confirm address and product",
             *           "definitionId": "step_definition_id_1",
             *           "status": "ASSIGNED",
             *           "assignedTo": [
             *             "11"
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED",
             *           "definitionId": "step_definition_id_2"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "definitionId": "step_definition_id_3",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "definitionId": "step_definition_id_4",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecution;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace GetExecutions {
        namespace Parameters {
            export type Context = string;
            export type Schema = string;
        }
        export interface QueryParameters {
            context?: Parameters.Context;
            schema?: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "definitionId": "section_definition_id_1",
             *       "name": "Initial Information Gathering",
             *       "type": "SECTION",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "definitionId": "step_definition_id_1",
             *           "name": "Call client"
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "definitionId": "step_definition_id_2",
             *           "name": "Check product availability"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "definitionId": "step_definition_id_3",
             *           "name": "Send email confirming contact with the client"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "definitionId": "step_definition_id_4",
             *       "name": "Print and send catalog",
             *       "type": "STEP"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecutionSlim[];
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace GetFlowExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FlowExecution;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace PatchFlowExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        export type RequestBody = Components.Schemas.PatchFlowReq;
        namespace Responses {
            export type $200 = Components.Schemas.FlowExecution;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace PatchPhase {
        namespace Parameters {
            export type ExecutionId = string;
            export type PhaseId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            phase_id: Parameters.PhaseId;
        }
        export type RequestBody = Components.Schemas.PatchPhaseReq;
        namespace Responses {
            export type $200 = Components.Schemas.Phase;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace PatchTask {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        export type RequestBody = /**
         * Request payload for updating a task within a flow execution.
         * All fields are optional; only provided fields will be updated.
         *
         */
        Components.Schemas.PatchTaskReq;
        namespace Responses {
            export type $200 = Components.Schemas.Task;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace ReconcileAutomationTask {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FlowExecution;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $403 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace RunTaskAutomation {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AutomationTask;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace RunTaskScheduleNow {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Task;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace SearchExecutions {
        export type RequestBody = Components.Schemas.SearchExecutionsReq;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExecutionsResp;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace SearchFlowExecutions {
        export type RequestBody = Components.Schemas.SearchFlowsReq;
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.FlowExecution[];
            }
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export interface $401 {
            }
            export interface $403 {
            }
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace SearchSteps {
        export type RequestBody = Components.Schemas.SearchStepsReq;
        namespace Responses {
            export type $200 = Components.Schemas.SearchStepsResp;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace StartFlowExecution {
        export type RequestBody = /**
         * Request payload for starting a new flow execution from a template.
         *
         */
        Components.Schemas.StartFlowReq;
        namespace Responses {
            export type $201 = Components.Schemas.FlowExecution;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $403 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        export type RequestBody = Components.Schemas.WorkflowExecutionUpdateReq;
        namespace Responses {
            export interface $204 {
            }
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateStep {
        namespace Parameters {
            export type ExecutionId = string;
            export type StepId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
            stepId: Parameters.StepId;
        }
        export type RequestBody = Components.Schemas.UpdateStepReq;
        namespace Responses {
            export type $200 = Components.Schemas.Step;
            export type $400 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $401 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $500 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
        }
    }
}


export interface OperationMethods {
  /**
   * getExecutions - getExecutions
   * 
   * Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are more light weight - steps are not loaded with all information.
   */
  'getExecutions'(
    parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecutions.Responses.$200>
  /**
   * createExecution - createExecution
   * 
   * Creates a new V1 Workflow Execution from a workflow definition (template).
   * 
   * **Note:** This is the legacy V1 API. For new integrations, use `POST /v2/flows/executions` instead.
   * 
   * The workflow definition specifies the structure (sections and steps) of the workflow.
   * When created, the execution instantiates all steps and begins tracking progress.
   * 
   */
  'createExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExecution.Responses.$201>
  /**
   * getExecution - getExecution
   * 
   * Retrieves a complete V1 workflow execution by ID, including all steps information.
   * 
   * **Note:** This is the legacy V1 API. For new integrations, use `GET /v2/flows/executions/{execution_id}` instead.
   * 
   */
  'getExecution'(
    parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecution.Responses.$200>
  /**
   * updateExecution - updateExecution
   * 
   * Patches updates like assignees, status, closingReason for a single Workflow Execution.
   */
  'updateExecution'(
    parameters?: Parameters<Paths.UpdateExecution.PathParameters> | null,
    data?: Paths.UpdateExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateExecution.Responses.$204>
  /**
   * deleteExecution - deleteExecution
   * 
   * Delete workflow execution by id. Workflow contexts will NOT be deleted.
   */
  'deleteExecution'(
    parameters?: Parameters<Paths.DeleteExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteExecution.Responses.$204>
  /**
   * createStep - createStep
   * 
   * Create a new step in current workflow execution.
   */
  'createStep'(
    parameters?: Parameters<Paths.CreateStep.PathParameters> | null,
    data?: Paths.CreateStep.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateStep.Responses.$201>
  /**
   * updateStep - updateStep
   * 
   * Updates a workflow execution step with new values for status, assignees, due date, position, and more.
   * 
   * **Note:** This is the legacy V1 API. For new integrations, use `PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}` instead.
   * 
   * **Common use cases:**
   * - Mark a step as completed or skipped
   * - Assign or reassign users to a step
   * - Update step due dates (static or dynamic)
   * - Reorder steps within a section
   * 
   */
  'updateStep'(
    parameters?: Parameters<Paths.UpdateStep.PathParameters> | null,
    data?: Paths.UpdateStep.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateStep.Responses.$200>
  /**
   * deleteStep - deleteStep
   * 
   * Deletes a step from a workflow execution.
   */
  'deleteStep'(
    parameters?: Parameters<Paths.DeleteStep.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStep.Responses.$204>
  /**
   * searchExecutions - searchExecutions
   * 
   * Search Workflow Executions by different filters.
   */
  'searchExecutions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchExecutions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchExecutions.Responses.$200>
  /**
   * searchSteps - searchSteps
   * 
   * Search workflow execution steps by different filters.
   */
  'searchSteps'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchSteps.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchSteps.Responses.$200>
  /**
   * getClosingReasonExecution - getClosingReasonExecution
   * 
   * Shows all Closing Reasons defined at the moment of starting the Workflow Execution.
   * The Closing Reasons shown in the execution are just snapshots
   * from the state of the Definition when the instance was created.
   * 
   */
  'getClosingReasonExecution'(
    parameters?: Parameters<Paths.GetClosingReasonExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClosingReasonExecution.Responses.$200>
  /**
   * startFlowExecution - startFlowExecution
   * 
   * Starts a new Flow Execution based on a flow template (definition).
   * 
   * The flow template defines the structure of the workflow including phases, tasks, edges (transitions),
   * and automation configurations. When started, the execution creates runtime instances of all tasks
   * and begins processing from the initial task(s).
   * 
   * **Required fields:**
   * - `flow_template_id`: The ID of the flow template to instantiate
   * - `contexts`: At least one entity context to link the execution to
   * 
   * **Optional fields:**
   * - `trigger`: Specifies how the execution was triggered (manual or automatic)
   * - `purposes`: Filter which phases/tasks are included based on taxonomy purposes
   * 
   */
  'startFlowExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartFlowExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartFlowExecution.Responses.$201>
  /**
   * getFlowExecution - getFlowExecution
   * 
   * Retrieves a complete flow execution by ID, including all phases, tasks, edges, contexts, and analytics.
   * 
   * The response includes:
   * - **Execution metadata**: ID, name, status, timestamps, assignees
   * - **Phases**: Organizational groupings of tasks with progress tracking
   * - **Tasks**: Individual work items with their status, assignees, and configurations
   * - **Edges**: Connections between tasks defining the workflow graph
   * - **Analytics**: Timing information (started, completed, closed timestamps)
   * - **Contexts**: Linked entity references
   * 
   */
  'getFlowExecution'(
    parameters?: Parameters<Paths.GetFlowExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFlowExecution.Responses.$200>
  /**
   * patchFlowExecution - patchFlowExecution
   * 
   * Patch flow execution with new assignees, status, analytics & other changes.
   */
  'patchFlowExecution'(
    parameters?: Parameters<Paths.PatchFlowExecution.PathParameters> | null,
    data?: Paths.PatchFlowExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchFlowExecution.Responses.$200>
  /**
   * deleteFlowExecution - deleteFlowExecution
   * 
   * Deletes a specific execution of a flow, identified by id. Flow contexts will NOT be deleted.
   */
  'deleteFlowExecution'(
    parameters?: Parameters<Paths.DeleteFlowExecution.QueryParameters & Paths.DeleteFlowExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFlowExecution.Responses.$204>
  /**
   * searchFlowExecutions - searchFlowExecutions
   * 
   * Search Flow Executions for a specific Entity.
   */
  'searchFlowExecutions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchFlowExecutions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchFlowExecutions.Responses.$200>
  /**
   * patchTask - patchTask
   * 
   * Updates attributes of a flow task including status, assignees, due date, and more.
   * 
   * **Common use cases:**
   * - Mark a task as completed or skipped
   * - Assign or reassign users to a task
   * - Update task due dates
   * - Enable or disable a task
   * - Revert execution to a previous task
   * 
   * **Status transitions:**
   * - `PENDING` -> `IN_PROGRESS`: User starts working on the task
   * - `IN_PROGRESS` -> `COMPLETED`: User finishes the task
   * - `PENDING` or `IN_PROGRESS` -> `SKIPPED`: Task is bypassed
   * - `COMPLETED` or `SKIPPED` -> `PENDING`: Task is reopened (with revert_execution flag)
   * 
   * **Reverting execution:**
   * When updating a task that was already completed/skipped and comes before the current task,
   * use `revert_execution: true` to reset the flow back to that point. All subsequent tasks
   * will be reset to PENDING status.
   * 
   */
  'patchTask'(
    parameters?: Parameters<Paths.PatchTask.PathParameters> | null,
    data?: Paths.PatchTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchTask.Responses.$200>
  /**
   * runTaskAutomation - runTaskAutomation
   * 
   * Runs configured automation for a flow task
   */
  'runTaskAutomation'(
    parameters?: Parameters<Paths.RunTaskAutomation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RunTaskAutomation.Responses.$200>
  /**
   * executeTask - executeTask
   * 
   * Executes any kind of flow task immediately.
   */
  'executeTask'(
    parameters?: Parameters<Paths.ExecuteTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteTask.Responses.$200>
  /**
   * patchPhase - patchPhase
   * 
   * Apply updates to a phase within flow execution
   */
  'patchPhase'(
    parameters?: Parameters<Paths.PatchPhase.PathParameters> | null,
    data?: Paths.PatchPhase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchPhase.Responses.$200>
  /**
   * addTask - addTask
   * 
   * Create a new task in current workflow execution.
   */
  'addTask'(
    parameters?: Parameters<Paths.AddTask.PathParameters> | null,
    data?: Paths.AddTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddTask.Responses.$201>
  /**
   * cancelTaskSchedule - cancelTaskSchedule
   * 
   * Cancels a scheduled task, deleting the schedule and marking the task as skipped.
   */
  'cancelTaskSchedule'(
    parameters?: Parameters<Paths.CancelTaskSchedule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelTaskSchedule.Responses.$204>
  /**
   * reconcileAutomationTask - reconcileAutomationTask
   * 
   * Reconciles an automation task's status against its linked automation execution.
   * 
   * Looks the task up by id (whether or not it is currently a `crt_task`),
   * fetches its automation execution, and — if the automation has reached a
   * terminal state (success/failed/skipped) — corrects the task's `status`,
   * `automation_config` and `analytics` to match and persists them. If the
   * task is the current task and the flow is still active, the flow is
   * advanced; otherwise only the task record is corrected.
   * 
   * Used by the "Refresh status" action to recover a task left `IN_PROGRESS`
   * after a missed or clobbered completion event. No-op (returns the
   * execution unchanged) when the task is already terminal or the automation
   * is still running.
   * 
   */
  'reconcileAutomationTask'(
    parameters?: Parameters<Paths.ReconcileAutomationTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReconcileAutomationTask.Responses.$200>
  /**
   * runTaskScheduleNow - runTaskScheduleNow
   * 
   * Cancels the pending schedule for a task and immediately triggers its automation execution.
   */
  'runTaskScheduleNow'(
    parameters?: Parameters<Paths.RunTaskScheduleNow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RunTaskScheduleNow.Responses.$200>
  /**
   * cancelSchedule - cancelSchedule
   * 
   * Cancels a flow schedule, marking it as canceled.
   * 
   * **Deprecated**: Use DELETE /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule instead.
   * 
   */
  'cancelSchedule'(
    parameters?: Parameters<Paths.CancelSchedule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelSchedule.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/workflows/executions']: {
    /**
     * getExecutions - getExecutions
     * 
     * Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are more light weight - steps are not loaded with all information.
     */
    'get'(
      parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecutions.Responses.$200>
    /**
     * createExecution - createExecution
     * 
     * Creates a new V1 Workflow Execution from a workflow definition (template).
     * 
     * **Note:** This is the legacy V1 API. For new integrations, use `POST /v2/flows/executions` instead.
     * 
     * The workflow definition specifies the structure (sections and steps) of the workflow.
     * When created, the execution instantiates all steps and begins tracking progress.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateExecution.Responses.$201>
  }
  ['/v1/workflows/executions/{executionId}']: {
    /**
     * getExecution - getExecution
     * 
     * Retrieves a complete V1 workflow execution by ID, including all steps information.
     * 
     * **Note:** This is the legacy V1 API. For new integrations, use `GET /v2/flows/executions/{execution_id}` instead.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecution.Responses.$200>
    /**
     * updateExecution - updateExecution
     * 
     * Patches updates like assignees, status, closingReason for a single Workflow Execution.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateExecution.PathParameters> | null,
      data?: Paths.UpdateExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateExecution.Responses.$204>
    /**
     * deleteExecution - deleteExecution
     * 
     * Delete workflow execution by id. Workflow contexts will NOT be deleted.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteExecution.Responses.$204>
  }
  ['/v1/workflows/executions/{executionId}/steps']: {
    /**
     * createStep - createStep
     * 
     * Create a new step in current workflow execution.
     */
    'post'(
      parameters?: Parameters<Paths.CreateStep.PathParameters> | null,
      data?: Paths.CreateStep.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateStep.Responses.$201>
  }
  ['/v1/workflows/executions/{executionId}/steps/{stepId}']: {
    /**
     * updateStep - updateStep
     * 
     * Updates a workflow execution step with new values for status, assignees, due date, position, and more.
     * 
     * **Note:** This is the legacy V1 API. For new integrations, use `PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}` instead.
     * 
     * **Common use cases:**
     * - Mark a step as completed or skipped
     * - Assign or reassign users to a step
     * - Update step due dates (static or dynamic)
     * - Reorder steps within a section
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateStep.PathParameters> | null,
      data?: Paths.UpdateStep.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateStep.Responses.$200>
    /**
     * deleteStep - deleteStep
     * 
     * Deletes a step from a workflow execution.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteStep.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStep.Responses.$204>
  }
  ['/v1/workflows/executions/search']: {
    /**
     * searchExecutions - searchExecutions
     * 
     * Search Workflow Executions by different filters.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchExecutions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchExecutions.Responses.$200>
  }
  ['/v1/workflows/executions/steps/search']: {
    /**
     * searchSteps - searchSteps
     * 
     * Search workflow execution steps by different filters.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchSteps.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchSteps.Responses.$200>
  }
  ['/v1/workflows/executions/{executionId}/closing-reasons']: {
    /**
     * getClosingReasonExecution - getClosingReasonExecution
     * 
     * Shows all Closing Reasons defined at the moment of starting the Workflow Execution.
     * The Closing Reasons shown in the execution are just snapshots
     * from the state of the Definition when the instance was created.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetClosingReasonExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClosingReasonExecution.Responses.$200>
  }
  ['/v2/flows/executions']: {
    /**
     * startFlowExecution - startFlowExecution
     * 
     * Starts a new Flow Execution based on a flow template (definition).
     * 
     * The flow template defines the structure of the workflow including phases, tasks, edges (transitions),
     * and automation configurations. When started, the execution creates runtime instances of all tasks
     * and begins processing from the initial task(s).
     * 
     * **Required fields:**
     * - `flow_template_id`: The ID of the flow template to instantiate
     * - `contexts`: At least one entity context to link the execution to
     * 
     * **Optional fields:**
     * - `trigger`: Specifies how the execution was triggered (manual or automatic)
     * - `purposes`: Filter which phases/tasks are included based on taxonomy purposes
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.StartFlowExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartFlowExecution.Responses.$201>
  }
  ['/v2/flows/executions/{execution_id}']: {
    /**
     * getFlowExecution - getFlowExecution
     * 
     * Retrieves a complete flow execution by ID, including all phases, tasks, edges, contexts, and analytics.
     * 
     * The response includes:
     * - **Execution metadata**: ID, name, status, timestamps, assignees
     * - **Phases**: Organizational groupings of tasks with progress tracking
     * - **Tasks**: Individual work items with their status, assignees, and configurations
     * - **Edges**: Connections between tasks defining the workflow graph
     * - **Analytics**: Timing information (started, completed, closed timestamps)
     * - **Contexts**: Linked entity references
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetFlowExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFlowExecution.Responses.$200>
    /**
     * patchFlowExecution - patchFlowExecution
     * 
     * Patch flow execution with new assignees, status, analytics & other changes.
     */
    'patch'(
      parameters?: Parameters<Paths.PatchFlowExecution.PathParameters> | null,
      data?: Paths.PatchFlowExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchFlowExecution.Responses.$200>
    /**
     * deleteFlowExecution - deleteFlowExecution
     * 
     * Deletes a specific execution of a flow, identified by id. Flow contexts will NOT be deleted.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteFlowExecution.QueryParameters & Paths.DeleteFlowExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFlowExecution.Responses.$204>
  }
  ['/v2/flows/executions:search']: {
    /**
     * searchFlowExecutions - searchFlowExecutions
     * 
     * Search Flow Executions for a specific Entity.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchFlowExecutions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchFlowExecutions.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}']: {
    /**
     * patchTask - patchTask
     * 
     * Updates attributes of a flow task including status, assignees, due date, and more.
     * 
     * **Common use cases:**
     * - Mark a task as completed or skipped
     * - Assign or reassign users to a task
     * - Update task due dates
     * - Enable or disable a task
     * - Revert execution to a previous task
     * 
     * **Status transitions:**
     * - `PENDING` -> `IN_PROGRESS`: User starts working on the task
     * - `IN_PROGRESS` -> `COMPLETED`: User finishes the task
     * - `PENDING` or `IN_PROGRESS` -> `SKIPPED`: Task is bypassed
     * - `COMPLETED` or `SKIPPED` -> `PENDING`: Task is reopened (with revert_execution flag)
     * 
     * **Reverting execution:**
     * When updating a task that was already completed/skipped and comes before the current task,
     * use `revert_execution: true` to reset the flow back to that point. All subsequent tasks
     * will be reset to PENDING status.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.PatchTask.PathParameters> | null,
      data?: Paths.PatchTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchTask.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/automation:run']: {
    /**
     * runTaskAutomation - runTaskAutomation
     * 
     * Runs configured automation for a flow task
     */
    'post'(
      parameters?: Parameters<Paths.RunTaskAutomation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RunTaskAutomation.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/execute']: {
    /**
     * executeTask - executeTask
     * 
     * Executes any kind of flow task immediately.
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteTask.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/phases/{phase_id}']: {
    /**
     * patchPhase - patchPhase
     * 
     * Apply updates to a phase within flow execution
     */
    'patch'(
      parameters?: Parameters<Paths.PatchPhase.PathParameters> | null,
      data?: Paths.PatchPhase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchPhase.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks']: {
    /**
     * addTask - addTask
     * 
     * Create a new task in current workflow execution.
     */
    'post'(
      parameters?: Parameters<Paths.AddTask.PathParameters> | null,
      data?: Paths.AddTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddTask.Responses.$201>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/schedule']: {
    /**
     * cancelTaskSchedule - cancelTaskSchedule
     * 
     * Cancels a scheduled task, deleting the schedule and marking the task as skipped.
     */
    'delete'(
      parameters?: Parameters<Paths.CancelTaskSchedule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelTaskSchedule.Responses.$204>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/reconcile-automation']: {
    /**
     * reconcileAutomationTask - reconcileAutomationTask
     * 
     * Reconciles an automation task's status against its linked automation execution.
     * 
     * Looks the task up by id (whether or not it is currently a `crt_task`),
     * fetches its automation execution, and — if the automation has reached a
     * terminal state (success/failed/skipped) — corrects the task's `status`,
     * `automation_config` and `analytics` to match and persists them. If the
     * task is the current task and the flow is still active, the flow is
     * advanced; otherwise only the task record is corrected.
     * 
     * Used by the "Refresh status" action to recover a task left `IN_PROGRESS`
     * after a missed or clobbered completion event. No-op (returns the
     * execution unchanged) when the task is already terminal or the automation
     * is still running.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ReconcileAutomationTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReconcileAutomationTask.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/schedule/run-now']: {
    /**
     * runTaskScheduleNow - runTaskScheduleNow
     * 
     * Cancels the pending schedule for a task and immediately triggers its automation execution.
     */
    'post'(
      parameters?: Parameters<Paths.RunTaskScheduleNow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RunTaskScheduleNow.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/schedules/{schedule_id}']: {
    /**
     * cancelSchedule - cancelSchedule
     * 
     * Cancels a flow schedule, marking it as canceled.
     * 
     * **Deprecated**: Use DELETE /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule instead.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CancelSchedule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelSchedule.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActionSchedule = Components.Schemas.ActionSchedule;
export type AddTaskReq = Components.Schemas.AddTaskReq;
export type AgentConfig = Components.Schemas.AgentConfig;
export type AgentExecutionInfo = Components.Schemas.AgentExecutionInfo;
export type AiAgentTask = Components.Schemas.AiAgentTask;
export type AnalyticsInfo = Components.Schemas.AnalyticsInfo;
export type Assignees = Components.Schemas.Assignees;
export type AutomationConfig = Components.Schemas.AutomationConfig;
export type AutomationInfo = Components.Schemas.AutomationInfo;
export type AutomationInputContext = Components.Schemas.AutomationInputContext;
export type AutomationTask = Components.Schemas.AutomationTask;
export type ClosingReason = Components.Schemas.ClosingReason;
export type ClosingReasonResp = Components.Schemas.ClosingReasonResp;
export type Condition = Components.Schemas.Condition;
export type ConditionId = Components.Schemas.ConditionId;
export type CreateStepReq = Components.Schemas.CreateStepReq;
export type DecisionTask = Components.Schemas.DecisionTask;
export type DelayedSchedule = Components.Schemas.DelayedSchedule;
export type DueDateConfig = Components.Schemas.DueDateConfig;
export type DynamicDueDate = Components.Schemas.DynamicDueDate;
export type ECPDetails = Components.Schemas.ECPDetails;
export type Edge = Components.Schemas.Edge;
export type EnableRequirement = Components.Schemas.EnableRequirement;
export type EntityRef = Components.Schemas.EntityRef;
export type EntitySync = Components.Schemas.EntitySync;
export type ErrorResp = Components.Schemas.ErrorResp;
export type EvaluationSource = Components.Schemas.EvaluationSource;
export type ExecutionPaginationDynamo = Components.Schemas.ExecutionPaginationDynamo;
export type Flow = Components.Schemas.Flow;
export type FlowClosingReason = Components.Schemas.FlowClosingReason;
export type FlowContext = Components.Schemas.FlowContext;
export type FlowExecution = Components.Schemas.FlowExecution;
export type FlowExecutionId = Components.Schemas.FlowExecutionId;
export type FlowSlim = Components.Schemas.FlowSlim;
export type FlowTemplateId = Components.Schemas.FlowTemplateId;
export type FlowTrigger = Components.Schemas.FlowTrigger;
export type ImmediateSchedule = Components.Schemas.ImmediateSchedule;
export type ItemType = Components.Schemas.ItemType;
export type LastEvaluatedKey = Components.Schemas.LastEvaluatedKey;
export type LoopConfig = Components.Schemas.LoopConfig;
export type LoopInfo = Components.Schemas.LoopInfo;
export type ManualTask = Components.Schemas.ManualTask;
export type Operator = Components.Schemas.Operator;
export type PartnerDetails = Components.Schemas.PartnerDetails;
export type PatchFlowReq = Components.Schemas.PatchFlowReq;
export type PatchPhaseReq = Components.Schemas.PatchPhaseReq;
export type PatchTaskReq = Components.Schemas.PatchTaskReq;
export type Phase = Components.Schemas.Phase;
export type PhaseId = Components.Schemas.PhaseId;
export type PhaseInEntity = Components.Schemas.PhaseInEntity;
export type RelativeSchedule = Components.Schemas.RelativeSchedule;
export type SearchExecutionsReq = Components.Schemas.SearchExecutionsReq;
export type SearchExecutionsResp = Components.Schemas.SearchExecutionsResp;
export type SearchFlowsReq = Components.Schemas.SearchFlowsReq;
export type SearchPagination = Components.Schemas.SearchPagination;
export type SearchSorting = Components.Schemas.SearchSorting;
export type SearchStepsReq = Components.Schemas.SearchStepsReq;
export type SearchStepsResp = Components.Schemas.SearchStepsResp;
export type Section = Components.Schemas.Section;
export type SectionSimplified = Components.Schemas.SectionSimplified;
export type SectionStatus = Components.Schemas.SectionStatus;
export type StartFlowReq = Components.Schemas.StartFlowReq;
export type Statement = Components.Schemas.Statement;
export type Step = Components.Schemas.Step;
export type StepDescription = Components.Schemas.StepDescription;
export type StepExtended = Components.Schemas.StepExtended;
export type StepId = Components.Schemas.StepId;
export type StepJourney = Components.Schemas.StepJourney;
export type StepPositionAt = Components.Schemas.StepPositionAt;
export type StepRequirement = Components.Schemas.StepRequirement;
export type StepSimplified = Components.Schemas.StepSimplified;
export type StepStatus = Components.Schemas.StepStatus;
export type StepType = Components.Schemas.StepType;
export type Task = Components.Schemas.Task;
export type TaskBase = Components.Schemas.TaskBase;
export type TaskId = Components.Schemas.TaskId;
export type TaskType = Components.Schemas.TaskType;
export type TimeUnit = Components.Schemas.TimeUnit;
export type TriggerMode = Components.Schemas.TriggerMode;
export type TriggerType = Components.Schemas.TriggerType;
export type UpdateEntityAttributes = Components.Schemas.UpdateEntityAttributes;
export type UpdateStepReq = Components.Schemas.UpdateStepReq;
export type UpdateStepResp = Components.Schemas.UpdateStepResp;
export type UserId = Components.Schemas.UserId;
export type VariableAssignment = Components.Schemas.VariableAssignment;
export type WorkflowContext = Components.Schemas.WorkflowContext;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
export type WorkflowExecutionBase = Components.Schemas.WorkflowExecutionBase;
export type WorkflowExecutionCreateReq = Components.Schemas.WorkflowExecutionCreateReq;
export type WorkflowExecutionSlim = Components.Schemas.WorkflowExecutionSlim;
export type WorkflowExecutionUpdateReq = Components.Schemas.WorkflowExecutionUpdateReq;
export type WorkflowInEntity = Components.Schemas.WorkflowInEntity;
export type WorkflowStatus = Components.Schemas.WorkflowStatus;
