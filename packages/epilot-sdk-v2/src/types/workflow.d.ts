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
        export type BulkJobIdParam = string;
        export type ExecutionIdParam = string;
        export type PhaseIdParam = string;
        export type ScheduleIdParam = string;
        export type SoftDeleteParam = boolean;
        export type TaskIdParam = string;
    }
    export interface PathParameters {
        BulkJobIdParam?: Parameters.BulkJobIdParam;
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
        export interface ActiveBulkStartFlowsJobResp {
            job: {
                job_id: string;
                org_id: string;
                status: /**
                 * * `awaiting_approval`: preflight done, nothing started; waits for `APPROVE`
                 * * `queued`: approved, waiting for a worker
                 * * `running`: starts in progress
                 * * `completed`: every start that was not skipped succeeded
                 * * `completed_with_errors`: finished, at least one start failed
                 * * `failed`: the job itself failed; some starts may have happened, see items
                 * * `cancelled`: cancelled; flows already started are kept
                 * * `expired`: not approved within 24 hours
                 *
                 */
                BulkStartFlowsJobStatus;
                /**
                 * User who created the job; receives the completion notification.
                 */
                created_by: string;
                created_at: string; // date-time
                updated_at: string; // date-time
                /**
                 * The job expires if it is not approved by then.
                 */
                expires_at: string; // date-time
                approved_at?: string; // date-time
                approved_by?: string;
                finished_at?: string; // date-time
                cancel_requested?: boolean;
                /**
                 * The job this job restarts the failed and never-started items of.
                 */
                restart_of?: string;
                /**
                 * The approved job that restarts this job's failed and never-started items.
                 * A job is restarted at most once.
                 *
                 */
                restarted_by?: string;
                flows: BulkStartFlowsFlowSummary[];
                counts: BulkStartFlowsJobCounts;
                items: /* One (flow, entity) start of a bulk-start job. */ BulkStartFlowsItem[];
            } | null;
        }
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
                 * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
                due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
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
             * Status of the agent execution, when it already ran. Two vocabularies reach this field: the execute response's stored status (`pending`, `running`, `waiting_approval`, `cancelled`), written when the task dispatches its agent, and the narrower status ai-agents-api carries on its execution events (`started`, `approval_required`), written by the status listener. `queued` means the execution is accepted by ai-agents-api and waits for model capacity; it is not terminal and may recur after `started` if the run is re-queued.
             */
            execution_status?: "queued" | "pending" | "started" | "running" | "waiting_approval" | "approval_required" | "completed" | "failed" | "cancelled";
            /**
             * When the first `queued` event for the current `execution_id` arrived, so the UI can show how long the run has been waiting. Kept unchanged by every later event for the same execution, and dropped when a new `execution_id` starts (a retry).
             */
            queued_at?: string; // date-time
            /**
             * How many `queued` events the current `execution_id` has reported: 1 on the first, incremented on every re-queue. Dropped when a new `execution_id` starts (a retry).
             */
            queued_attempts?: number;
            error_reason?: string;
            /**
             * Server-computed outcome read from the agent execution's structured_output (e.g. assigned, recommended, no_eligible_partner, missing_input). When the outcome means the work is not really done (no_eligible_partner, missing_input) the task is held as the current task instead of auto-completing, so the phase does not advance.
             */
            outcome?: string;
            /**
             * Why a finished agent execution has not completed its task. `required_subtasks`: the agent finished with a completing outcome while the manual AI task still had unticked required subtasks, so the task stays IN_PROGRESS and the phase does not advance. A `subtask_states` PATCH by a caller allowed to change the status completes the task (`completed_by` is that user) and removes the hold once every required subtask the caller can see is ticked — whether that PATCH ticked the last one or merely echoed states that already were; the hold is also removed when the task leaves IN_PROGRESS any other way. Only meaningful on an IN_PROGRESS task.
             */
            completion_hold?: "required_subtasks";
        }
        export interface AiAgentTask {
            id: TaskId;
            /**
             * The loops the task belongs to, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            journey?: StepJourney;
            journey_prefill?: /* Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current. */ JourneyPrefill;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            /**
             * The resolved instant from which the task can be worked on (AL-3678). Resolved by the engine when the task becomes current: a template's fixed date is kept, a `start_date_config` is evaluated against the most recent occurrence of its reference event and is never earlier than the moment the task was reached. The task a revert or a reopened flow lands on starts at once: its `start_date_config` resolves to that moment, while a fixed date is kept. While the start date lies in the future the task is upcoming: its status is unchanged, and while it is still open (not completed, not skipped, not failed in a way the template lets the flow move past) no person may move its status other than back to PENDING, run it, run its schedule now, cancel its schedule or choose its branch. Cleared on every reset of a task with a `start_date_config`. Server-owned, not patchable. No `format: date-time`, like `due_date`.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string | null;
            start_date_config?: /* Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted. */ StartDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it (enforced on PATCH and schedule cancellation). Snapshotted from the template at flow start. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Not patchable — ignored on client patches.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) whenever a description is written: at flow start, on add-task, on a description PATCH and on a loop reset. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate the task's person action — completing a manual task or manual decision, running a manual automation, approving a manual AI task's result — and a partner user is held only to the party they can see: the partner description, or the co-worker description when no partner description is enabled. Not patchable directly — a description PATCH may add, remove, rename and reorder items, but it may neither make a required item optional nor drop it, and it may not repeat an id (400).
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            /**
             * Per-subtask completion state, keyed by subtask id. Written via PATCH; ids must exist in `subtasks`, and `completed_by` / `completed_at` are server-stamped — client values are ignored. A cross-org (partner) caller may only write entries for the party they can see — the partner description, or the co-worker description when no partner description is enabled — and is refused with 403 otherwise. Cleared (null) on loop re-entry, revert, a system skip and a revival, together with the checkmarks in the description markup, so each incarnation of the task starts with unchecked boxes (see `completion_gates_reset_at`).
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            } | null;
            /**
             * Server-managed: records that the task's linked journey was submitted, stamped by the journey-submission listener via the correlation claims (wf_execution_id / wf_task_id) in the submission entity's journey_context — on manual tasks only. Gates the transition into COMPLETED when `journey.journey_submission_required` is set. Cleared (null) on loop re-entry, revert, a system skip and a revival so each incarnation needs its own submission; a submission created before the current incarnation began — the newer of the last recorded loop pass and `completion_gates_reset_at` — is not recorded. Not patchable — ignored on client patches.
             */
            journey_submission?: {
                /**
                 * Id of the submission entity that satisfied the gate
                 */
                submission_entity_id?: string;
                /**
                 * Time the submission entity was created
                 */
                submitted_at?: string; // date-time
            } | null;
            /**
             * Server-managed, execution-only: when the completion gates of this task were last reset — the moment its current incarnation began. Stamped by every incarnation-ending path (loop re-entry, revert, a system skip, a revival) that cleared subtask stamps, a journey submission, a journey-gate waiver or checked boxes in the markup. Together with the newest recorded loop pass it is the fence that keeps a journey submission created in an earlier incarnation from satisfying the current one's gate. Not patchable — ignored on client patches.
             */
            completion_gates_reset_at?: string | null; // date-time
            /**
             * Server-managed, execution-only: when the journey gate of this task was waived because the linked journey no longer exists, stamped on the completion that the waiver allowed and recorded on the activity trail. Cleared (null) on loop re-entry, revert, a system skip and a revival with the other gate state. Not patchable — ignored on client patches.
             */
            journey_gate_waived_at?: string | null; // date-time
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            ecp_placeholder_assignees?: /* Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches. */ EcpPlaceholderAssignees;
            analytics: AnalyticsInfo;
            /**
             * Previous passes this task made through a loop, keyed by the loop's decision task id, then by pass number. Only the 3 most recent passes per loop are retained, and a revert above a loop drops that loop's passes (null when cleared). Server-owned — ignored on client patches. Also carried on event payloads.
             */
            loop_iterations?: {
                [name: string]: {
                    [name: string]: /* A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here. */ TaskIteration;
                };
            } | null;
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
             * Order of the task's audience description tabs in the builder and during execution; the first tab shown opens by default. Keys not listed follow in the default order description, ecp, installer, partner, and audiences that are not enabled are skipped.
             */
            audience_order?: [
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?
            ];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            agent_config?: /* Configuration for AI Agent to run */ AgentConfig;
            input_context?: /**
             * Optional. Source of the entity fed into this automation task. If omitted, the run's current main context is used.
             *
             */
            AutomationInputContext;
            /**
             * How the agent run is started. `automatic` starts it as soon as the task becomes current; `manual` waits for a person to run it and to approve the result. An absent value is read as `manual` everywhere: the engine dispatches only an explicit `automatic`, the builder shows the task as manual, and the task may carry the skip gate and required subtasks — which then hold completion after the run (see `AgentExecutionInfo.completion_hold`).
             */
            trigger_mode?: "manual" | "automatic";
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
            /**
             * Result of the agent execution this task started. Null after a loop reset, a revert or a reopen out of a finished status clears it.
             */
            agent_execution?: {
                /**
                 * Id of the agent execution started by this task
                 */
                execution_id?: string;
                /**
                 * Status of the agent execution, when it already ran. Two vocabularies reach this field: the execute response's stored status (`pending`, `running`, `waiting_approval`, `cancelled`), written when the task dispatches its agent, and the narrower status ai-agents-api carries on its execution events (`started`, `approval_required`), written by the status listener. `queued` means the execution is accepted by ai-agents-api and waits for model capacity; it is not terminal and may recur after `started` if the run is re-queued.
                 */
                execution_status?: "queued" | "pending" | "started" | "running" | "waiting_approval" | "approval_required" | "completed" | "failed" | "cancelled";
                /**
                 * When the first `queued` event for the current `execution_id` arrived, so the UI can show how long the run has been waiting. Kept unchanged by every later event for the same execution, and dropped when a new `execution_id` starts (a retry).
                 */
                queued_at?: string; // date-time
                /**
                 * How many `queued` events the current `execution_id` has reported: 1 on the first, incremented on every re-queue. Dropped when a new `execution_id` starts (a retry).
                 */
                queued_attempts?: number;
                error_reason?: string;
                /**
                 * Server-computed outcome read from the agent execution's structured_output (e.g. assigned, recommended, no_eligible_partner, missing_input). When the outcome means the work is not really done (no_eligible_partner, missing_input) the task is held as the current task instead of auto-completing, so the phase does not advance.
                 */
                outcome?: string;
                /**
                 * Why a finished agent execution has not completed its task. `required_subtasks`: the agent finished with a completing outcome while the manual AI task still had unticked required subtasks, so the task stays IN_PROGRESS and the phase does not advance. A `subtask_states` PATCH by a caller allowed to change the status completes the task (`completed_by` is that user) and removes the hold once every required subtask the caller can see is ticked — whether that PATCH ticked the last one or merely echoed states that already were; the hold is also removed when the task leaves IN_PROGRESS any other way. Only meaningful on an IN_PROGRESS task.
                 */
                completion_hold?: "required_subtasks";
            } | null;
            /**
             * ID of the agent execution, used for tracking status updates. This is needed as a separate field to allow indexing.
             */
            agent_execution_id?: string | null;
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
            skipped_at?: string; // date-time
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
        /**
         * What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`.
         */
        export type AutomationFailurePolicy = "stop" | "continue";
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
             * Optional. Source of the entity fed into this automation task. If omitted, the run's current main context is used.
             *
             */
            AutomationInputContext;
            output_context?: /**
             * Optional. What happens to the entity produced by this automation task (the last successful entity-producing action of its automation).
             *
             */
            AutomationOutputContext;
            /**
             * Internal — number of times flow-healing-service has attempted to re-trigger this task's lost automation dispatch. Used to cap retries and avoid an indefinite heal-on-every-read storm against a deterministically-failing automation flow.
             */
            heal_attempts?: number;
            /**
             * Internal — the user this run of the automation acted for: the person who ran it, or the one the automatic dispatch carried on from. Read when this task hands on to an automatic automation, so a chain of them keeps acting for the person who ran the first. Run bookkeeping, cleared by every reset.
             */
            run_for_user_id?: string;
            /**
             * Internal — timestamp of the most recent heal attempt for this task. flow-healing-service uses this as a per-task debounce gate so the heal cannot fire more than once per HEAL_RETRY_COOLDOWN_MS regardless of how often the flow execution is read.
             */
            last_heal_attempted_at?: string; // date-time
            /**
             * Server-managed snapshot of the send-email action's `wait_for_journey_submission` config, copied from the automation execution when the send succeeds. When true the task enters WAITING_FOR_JOURNEY_SUBMISSION instead of COMPLETED and waits for the linked journey's submission automation.
             */
            wait_for_journey_submission?: boolean;
            /**
             * Server-managed snapshot of the journey referenced by the email template's journey link, copied from the send-email action config. Display/validation only — correlation does not depend on it.
             */
            journey_id?: string;
            journey_execution?: /* Server-managed. Tracks the journey automation execution a task in WAITING_FOR_JOURNEY_SUBMISSION is (or was) waiting on. Cleared whenever the task's automation state is reset (revert, loop-back, clear status). */ JourneyExecutionInfo;
            /**
             * Copied from the template task at flow start. When non-empty, this is a semi-automated `cancel-flow-execution` task: the person running it must choose one of these reasons, and the run is refused without a choice. The ids resolve against the execution's own `closing_reason.configured_reasons`, frozen at start, so a later template edit cannot change what a running execution offers.
             */
            eligible_closing_reason_ids?: string[];
            /**
             * Copied from the template task at flow start. When true the person choosing a reason may add a free-text note with it, which is recorded on the cancelled flow.
             */
            allow_execution_note?: boolean;
            email_review?: /* Copied from the template task at flow start. Says whether the person running this step reviews the email first, and what they may change. Anything they send that this does not permit is refused. */ EmailReviewConfig;
        }
        /**
         * Optional. Source of the entity fed into this automation task. If omitted, the run's current main context is used.
         *
         */
        export interface AutomationInputContext {
            /**
             * `main_context` = the run's current main context (same as omitting `input_context`). It moves when a task promotes its output to main context. `task` = entity produced by an upstream task in the graph. `trigger` with `trigger_id` = that configured trigger's entity. The Flow Builder offers it while the task is in that one trigger's own sub-flow, before it merges with another trigger's path. Without `trigger_id` it is legacy and resolves like `main_context`.
             *
             */
            source: "main_context" | "task" | "trigger";
            /**
             * Required when source is `task`. The id of the upstream task whose output entity should feed this task.
             */
            task_id?: string;
            /**
             * Only read when source is `trigger`. Pins the input to one specific configured trigger (primary or additional) by its id. When absent, the input resolves like `main_context`.
             *
             */
            trigger_id?: string;
            /**
             * Whether the input entity brings its direct relations along. Every action honours it. When neither `with_relations` nor `also_pass` is set, the automation receives the legacy payload, unchanged.
             *
             */
            with_relations?: boolean;
            /**
             * Extra entities passed to the automation alongside the input entity, combined into one list (in order, de-duplicated, without the input entity itself). When neither `with_relations` nor `also_pass` is set, the automation receives the legacy payload, unchanged. Only the start-workflow (trigger-workflow) action uses it in this version.
             *
             */
            also_pass?: (/**
             * One of the run's own entities. `main_context` = the run's current main context.
             *
             */
            AutomationInputExtraContextRef | /* Every entity produced by an upstream task. */ AutomationInputExtraTaskRef)[];
        }
        /**
         * One of the run's own entities. `main_context` = the run's current main context.
         *
         */
        export interface AutomationInputExtraContextRef {
            source: "main_context";
        }
        /**
         * Every entity produced by an upstream task.
         */
        export interface AutomationInputExtraTaskRef {
            source: "task";
            /**
             * The id of the upstream task whose output entities are passed along.
             */
            task_id: string;
        }
        /**
         * Optional. What happens to the entity produced by this automation task (the last successful entity-producing action of its automation).
         *
         */
        export interface AutomationOutputContext {
            /**
             * When true, the entity this task's automation produces becomes the run's primary context ("main context") when the task completes. The previous primary is demoted (kept as a regular context) and restored again if the promoting task is later reverted or reset — see the promotion bookkeeping fields on `EntityRef`.
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
            id: TaskId;
            /**
             * The loops the task belongs to, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            journey?: StepJourney;
            journey_prefill?: /* Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current. */ JourneyPrefill;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            /**
             * The resolved instant from which the task can be worked on (AL-3678). Resolved by the engine when the task becomes current: a template's fixed date is kept, a `start_date_config` is evaluated against the most recent occurrence of its reference event and is never earlier than the moment the task was reached. The task a revert or a reopened flow lands on starts at once: its `start_date_config` resolves to that moment, while a fixed date is kept. While the start date lies in the future the task is upcoming: its status is unchanged, and while it is still open (not completed, not skipped, not failed in a way the template lets the flow move past) no person may move its status other than back to PENDING, run it, run its schedule now, cancel its schedule or choose its branch. Cleared on every reset of a task with a `start_date_config`. Server-owned, not patchable. No `format: date-time`, like `due_date`.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string | null;
            start_date_config?: /* Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted. */ StartDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it (enforced on PATCH and schedule cancellation). Snapshotted from the template at flow start. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Not patchable — ignored on client patches.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) whenever a description is written: at flow start, on add-task, on a description PATCH and on a loop reset. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate the task's person action — completing a manual task or manual decision, running a manual automation, approving a manual AI task's result — and a partner user is held only to the party they can see: the partner description, or the co-worker description when no partner description is enabled. Not patchable directly — a description PATCH may add, remove, rename and reorder items, but it may neither make a required item optional nor drop it, and it may not repeat an id (400).
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            /**
             * Per-subtask completion state, keyed by subtask id. Written via PATCH; ids must exist in `subtasks`, and `completed_by` / `completed_at` are server-stamped — client values are ignored. A cross-org (partner) caller may only write entries for the party they can see — the partner description, or the co-worker description when no partner description is enabled — and is refused with 403 otherwise. Cleared (null) on loop re-entry, revert, a system skip and a revival, together with the checkmarks in the description markup, so each incarnation of the task starts with unchecked boxes (see `completion_gates_reset_at`).
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            } | null;
            /**
             * Server-managed: records that the task's linked journey was submitted, stamped by the journey-submission listener via the correlation claims (wf_execution_id / wf_task_id) in the submission entity's journey_context — on manual tasks only. Gates the transition into COMPLETED when `journey.journey_submission_required` is set. Cleared (null) on loop re-entry, revert, a system skip and a revival so each incarnation needs its own submission; a submission created before the current incarnation began — the newer of the last recorded loop pass and `completion_gates_reset_at` — is not recorded. Not patchable — ignored on client patches.
             */
            journey_submission?: {
                /**
                 * Id of the submission entity that satisfied the gate
                 */
                submission_entity_id?: string;
                /**
                 * Time the submission entity was created
                 */
                submitted_at?: string; // date-time
            } | null;
            /**
             * Server-managed, execution-only: when the completion gates of this task were last reset — the moment its current incarnation began. Stamped by every incarnation-ending path (loop re-entry, revert, a system skip, a revival) that cleared subtask stamps, a journey submission, a journey-gate waiver or checked boxes in the markup. Together with the newest recorded loop pass it is the fence that keeps a journey submission created in an earlier incarnation from satisfying the current one's gate. Not patchable — ignored on client patches.
             */
            completion_gates_reset_at?: string | null; // date-time
            /**
             * Server-managed, execution-only: when the journey gate of this task was waived because the linked journey no longer exists, stamped on the completion that the waiver allowed and recorded on the activity trail. Cleared (null) on loop re-entry, revert, a system skip and a revival with the other gate state. Not patchable — ignored on client patches.
             */
            journey_gate_waived_at?: string | null; // date-time
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            ecp_placeholder_assignees?: /* Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches. */ EcpPlaceholderAssignees;
            analytics: AnalyticsInfo;
            /**
             * Previous passes this task made through a loop, keyed by the loop's decision task id, then by pass number. Only the 3 most recent passes per loop are retained, and a revert above a loop drops that loop's passes (null when cleared). Server-owned — ignored on client patches. Also carried on event payloads.
             */
            loop_iterations?: {
                [name: string]: {
                    [name: string]: /* A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here. */ TaskIteration;
                };
            } | null;
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
             * Order of the task's audience description tabs in the builder and during execution; the first tab shown opens by default. Keys not listed follow in the default order description, ecp, installer, partner, and audiences that are not enabled are skipped.
             */
            audience_order?: [
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?
            ];
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
            automation_execution_id?: string | null;
            on_failure?: /* What the flow does when this automation ends in a failed state. `stop` waits on the failed task until it is retried or skipped. `continue` proceeds to the next task. An absent value means `stop`. */ AutomationFailurePolicy;
            trigger_mode?: TriggerMode;
            schedule?: ActionSchedule;
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
        }
        export interface BulkStartEntityRef {
            entity_id: string;
            /**
             * example:
             * opportunity
             */
            entity_schema: string;
        }
        export interface BulkStartFlowsFlowSummary {
            flow_template_id: string;
            flow_name: string;
            /**
             * Entities this flow will be started on.
             */
            will_start: number;
            /**
             * Entities no trigger of this flow accepts.
             */
            skipped: number;
        }
        /**
         * One (flow, entity) start of a bulk-start job.
         */
        export interface BulkStartFlowsItem {
            flow_template_id: string;
            entity_id: string;
            entity_schema: string;
            status: BulkStartFlowsItemStatus;
            /**
             * The started flow execution, when `status` is `started`.
             */
            execution_id?: string;
            /**
             * Why the item was skipped or failed: `trigger_entity_mismatch`,
             * `flow_disabled`, `flow_not_found`, `WORKFLOW_START_THROTTLED` or
             * `start_failed`.
             *
             */
            error_code?: string;
            error_message?: string;
            updated_at?: string; // date-time
        }
        export type BulkStartFlowsItemStatus = "pending" | "started" | "failed" | "skipped" | "cancelled";
        export interface BulkStartFlowsJob {
            job_id: string;
            org_id: string;
            status: /**
             * * `awaiting_approval`: preflight done, nothing started; waits for `APPROVE`
             * * `queued`: approved, waiting for a worker
             * * `running`: starts in progress
             * * `completed`: every start that was not skipped succeeded
             * * `completed_with_errors`: finished, at least one start failed
             * * `failed`: the job itself failed; some starts may have happened, see items
             * * `cancelled`: cancelled; flows already started are kept
             * * `expired`: not approved within 24 hours
             *
             */
            BulkStartFlowsJobStatus;
            /**
             * User who created the job; receives the completion notification.
             */
            created_by: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            /**
             * The job expires if it is not approved by then.
             */
            expires_at: string; // date-time
            approved_at?: string; // date-time
            approved_by?: string;
            finished_at?: string; // date-time
            cancel_requested?: boolean;
            /**
             * The job this job restarts the failed and never-started items of.
             */
            restart_of?: string;
            /**
             * The approved job that restarts this job's failed and never-started items.
             * A job is restarted at most once.
             *
             */
            restarted_by?: string;
            flows: BulkStartFlowsFlowSummary[];
            counts: BulkStartFlowsJobCounts;
            items: /* One (flow, entity) start of a bulk-start job. */ BulkStartFlowsItem[];
        }
        export interface BulkStartFlowsJobCounts {
            total: number;
            pending: number;
            started: number;
            failed: number;
            skipped: number;
            cancelled: number;
        }
        /**
         * * `awaiting_approval`: preflight done, nothing started; waits for `APPROVE`
         * * `queued`: approved, waiting for a worker
         * * `running`: starts in progress
         * * `completed`: every start that was not skipped succeeded
         * * `completed_with_errors`: finished, at least one start failed
         * * `failed`: the job itself failed; some starts may have happened, see items
         * * `cancelled`: cancelled; flows already started are kept
         * * `expired`: not approved within 24 hours
         *
         */
        export type BulkStartFlowsJobStatus = "awaiting_approval" | "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled" | "expired";
        /**
         * A bulk-start job as listed in the history, without its items.
         */
        export interface BulkStartFlowsJobSummary {
            job_id: string;
            org_id: string;
            status: /**
             * * `awaiting_approval`: preflight done, nothing started; waits for `APPROVE`
             * * `queued`: approved, waiting for a worker
             * * `running`: starts in progress
             * * `completed`: every start that was not skipped succeeded
             * * `completed_with_errors`: finished, at least one start failed
             * * `failed`: the job itself failed; some starts may have happened, see items
             * * `cancelled`: cancelled; flows already started are kept
             * * `expired`: not approved within 24 hours
             *
             */
            BulkStartFlowsJobStatus;
            /**
             * User who created the job.
             */
            created_by: string;
            /**
             * Home organization of the creator; differs from `org_id` for a partner user.
             */
            created_by_org_id?: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            expires_at: string; // date-time
            approved_at?: string; // date-time
            approved_by?: string;
            finished_at?: string; // date-time
            cancel_requested?: boolean;
            /**
             * The job this job restarts the failed and never-started items of.
             */
            restart_of?: string;
            /**
             * The approved job that restarts this job's failed and never-started items.
             * A job is restarted at most once.
             *
             */
            restarted_by?: string;
            flows: BulkStartFlowsFlowSummary[];
            /**
             * Schema of the job's entities, when they all share one. Omitted for a job over entities of several schemas.
             */
            entity_schema?: string;
            /**
             * Ids of the job's entities, in request order.
             */
            entity_ids: [
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
             * Number of entities in the job (length of `entity_ids`).
             */
            entity_count: number;
            counts: BulkStartFlowsJobCounts;
        }
        /**
         * Start every flow in `flow_template_ids` on every entity in `entities`.
         */
        export interface BulkStartFlowsReq {
            /**
             * Flow templates to start. Unique.
             */
            flow_template_ids: [
                string,
                string?,
                string?,
                string?,
                string?
            ];
            /**
             * Entities to start the flows on. Unique by `entity_id`.
             */
            entities: [
                BulkStartEntityRef,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?,
                BulkStartEntityRef?
            ];
            /**
             * Passed to every start, as `purposes` on `startFlowExecution`.
             */
            purposes?: string[];
        }
        /**
         * The reason the person chose for cancelling the flow. Ids only — the titles stored on the closed execution are resolved server-side from the execution's `closing_reason.configured_reasons`, so a caller cannot record a reason under a title of its own choosing.
         */
        export interface CancelFlowExecutionInputs {
            /**
             * Must be non-empty and a subset of the task's `automation_config.eligible_closing_reason_ids`.
             */
            selected_closing_reason_ids: string[];
            /**
             * An optional note the person added with their choice. Accepted only when the task sets `allow_execution_note`; sent otherwise it is a 400, so a caller cannot write free text onto a flow whose step never invited one.
             */
            extra_description?: string;
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
            loop_outcome?: /* What taking the branch does to its decision's loop at the current count. `closes_lap` starts another iteration, `enters_body` continues inside the loop, `exits_loop` leaves it, `budget_spent` would continue it but no iterations are left, so the exit branch is taken instead. */ LoopOutcome;
            /**
             * Internal — which normalizations the comparison had to apply for this condition to evaluate the way it did. Empty when every statement matched its operands exactly. Only meaningful alongside `is_met`; when `is_met` is unset the condition has not been evaluated and this value is stale.
             */
            match_normalizations?: ("unicode" | "invisible" | "whitespace" | "case")[];
        }
        /**
         * A locally unique identifier for the condition
         * example:
         * abc123
         */
        export type ConditionId = string;
        /**
         * How one of a decision task's conditions stood when a loop pass closed.
         * `is_met: false` means the branch was evaluated and rejected; an absent
         * entry means it was never reached.
         *
         */
        export interface ConditionResult {
            id: /**
             * A locally unique identifier for the condition
             * example:
             * abc123
             */
            ConditionId;
            is_met?: boolean;
            evaluated_at?: string; // date-time
            /**
             * Which normalizations the comparison applied for this verdict.
             */
            match_normalizations?: ("unicode" | "invisible" | "whitespace" | "case")[];
        }
        /**
         * One configured trigger of the flow template, snapshotted VERBATIM onto the execution at start — conceptually the workflow-definition API's `Trigger` schema plus the `primary` flag. The trigger schema is owned by the definition service and copied through opaquely, so only the fields consumers key on are declared here; `additionalProperties` carries the rest of the trigger's configuration unchanged (e.g. an automation trigger's `automation_id`, a journey trigger's `journey_id`).
         */
        export interface ConfiguredTrigger {
            [name: string]: any;
            /**
             * The trigger's id — matched against `trigger.trigger_id` to tell the fired entry, and used as the `from_id` of a non-primary trigger's entry edge.
             */
            id?: string;
            /**
             * The TEMPLATE trigger type (manual, automation, journey_automation, journey_submission, ...) — not the runtime `FlowTrigger.type` start mode.
             */
            type?: string;
            /**
             * True on the template's primary trigger — the entry whose edge is stored with from_id 'trigger', and the fallback when `trigger.trigger_id` is absent or matches no entry.
             */
            primary?: boolean;
            /**
             * The entity schema the trigger starts from, when its type carries one (manual, journey_automation).
             */
            entity_schema?: string;
            /**
             * The automation flow owned by an automation-type trigger.
             */
            automation_id?: string;
            /**
             * The journey a journey_submission trigger listens to.
             */
            journey_id?: string;
        }
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
            /**
             * The loops the task belongs to, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            journey?: StepJourney;
            journey_prefill?: /* Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current. */ JourneyPrefill;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            /**
             * The resolved instant from which the task can be worked on (AL-3678). Resolved by the engine when the task becomes current: a template's fixed date is kept, a `start_date_config` is evaluated against the most recent occurrence of its reference event and is never earlier than the moment the task was reached. The task a revert or a reopened flow lands on starts at once: its `start_date_config` resolves to that moment, while a fixed date is kept. While the start date lies in the future the task is upcoming: its status is unchanged, and while it is still open (not completed, not skipped, not failed in a way the template lets the flow move past) no person may move its status other than back to PENDING, run it, run its schedule now, cancel its schedule or choose its branch. Cleared on every reset of a task with a `start_date_config`. Server-owned, not patchable. No `format: date-time`, like `due_date`.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string | null;
            start_date_config?: /* Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted. */ StartDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it (enforced on PATCH and schedule cancellation). Snapshotted from the template at flow start. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Not patchable — ignored on client patches.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) whenever a description is written: at flow start, on add-task, on a description PATCH and on a loop reset. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate the task's person action — completing a manual task or manual decision, running a manual automation, approving a manual AI task's result — and a partner user is held only to the party they can see: the partner description, or the co-worker description when no partner description is enabled. Not patchable directly — a description PATCH may add, remove, rename and reorder items, but it may neither make a required item optional nor drop it, and it may not repeat an id (400).
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            /**
             * Per-subtask completion state, keyed by subtask id. Written via PATCH; ids must exist in `subtasks`, and `completed_by` / `completed_at` are server-stamped — client values are ignored. A cross-org (partner) caller may only write entries for the party they can see — the partner description, or the co-worker description when no partner description is enabled — and is refused with 403 otherwise. Cleared (null) on loop re-entry, revert, a system skip and a revival, together with the checkmarks in the description markup, so each incarnation of the task starts with unchecked boxes (see `completion_gates_reset_at`).
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            } | null;
            /**
             * Server-managed: records that the task's linked journey was submitted, stamped by the journey-submission listener via the correlation claims (wf_execution_id / wf_task_id) in the submission entity's journey_context — on manual tasks only. Gates the transition into COMPLETED when `journey.journey_submission_required` is set. Cleared (null) on loop re-entry, revert, a system skip and a revival so each incarnation needs its own submission; a submission created before the current incarnation began — the newer of the last recorded loop pass and `completion_gates_reset_at` — is not recorded. Not patchable — ignored on client patches.
             */
            journey_submission?: {
                /**
                 * Id of the submission entity that satisfied the gate
                 */
                submission_entity_id?: string;
                /**
                 * Time the submission entity was created
                 */
                submitted_at?: string; // date-time
            } | null;
            /**
             * Server-managed, execution-only: when the completion gates of this task were last reset — the moment its current incarnation began. Stamped by every incarnation-ending path (loop re-entry, revert, a system skip, a revival) that cleared subtask stamps, a journey submission, a journey-gate waiver or checked boxes in the markup. Together with the newest recorded loop pass it is the fence that keeps a journey submission created in an earlier incarnation from satisfying the current one's gate. Not patchable — ignored on client patches.
             */
            completion_gates_reset_at?: string | null; // date-time
            /**
             * Server-managed, execution-only: when the journey gate of this task was waived because the linked journey no longer exists, stamped on the completion that the waiver allowed and recorded on the activity trail. Cleared (null) on loop re-entry, revert, a system skip and a revival with the other gate state. Not patchable — ignored on client patches.
             */
            journey_gate_waived_at?: string | null; // date-time
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            ecp_placeholder_assignees?: /* Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches. */ EcpPlaceholderAssignees;
            analytics: AnalyticsInfo;
            /**
             * Previous passes this task made through a loop, keyed by the loop's decision task id, then by pass number. Only the 3 most recent passes per loop are retained, and a revert above a loop drops that loop's passes (null when cleared). Server-owned — ignored on client patches. Also carried on event payloads.
             */
            loop_iterations?: {
                [name: string]: {
                    [name: string]: /* A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here. */ TaskIteration;
                };
            } | null;
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
             * Order of the task's audience description tabs in the builder and during execution; the first tab shown opens by default. Keys not listed follow in the default order description, ecp, installer, partner, and audiences that are not enabled are skipped.
             */
            audience_order?: [
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?
            ];
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
            /**
             * The loops this decision owns, keyed by loop id. Sent in every execution response and event; for an execution started before `loops` existed, it is built from `loop_config` and keyed by the decision id.
             */
            loops?: {
                [name: string]: LoopExecutionState;
            };
            loop_config?: /* Read `loops` instead. Kept for executions started before `loops`. */ LoopConfig;
            /**
             * Internal — number of times flow-healing-service has driven the in-line re-evaluation for this parked decision task. Observability only; deliberately not a retry cap (see last_heal_attempted_at).
             */
            heal_attempts?: number;
            /**
             * Internal — timestamp of the most recent heal attempt for this decision task. flow-healing-service uses this as a per-task debounce gate so the in-line re-evaluation of a parked decision (e.g. one legitimately waiting on entity data with no branch matched yet) cannot fire more than once per HEAL_RETRY_COOLDOWN_MS regardless of how often the flow execution is read.
             */
            last_heal_attempted_at?: string; // date-time
        }
        export interface DelayedSchedule {
            mode: "delayed";
            duration: number;
            unit: TimeUnit;
            /**
             * The id of the created schedule
             */
            schedule_id?: string | null;
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
         * Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays.
         */
        export interface DueDateConfig {
            duration: number;
            unit: TimeUnit;
            type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "START_DATE";
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
        /**
         * Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches.
         */
        export interface EcpPlaceholderAssignees {
            placeholder_ecp_customers?: string[];
            placeholder_ecp_installers?: string[];
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
            /**
             * The loop this edge loops back in. Set on loop back edges only.
             */
            loop_id?: string;
        }
        /**
         * Copied from the template task at flow start. Says whether the person running this step reviews the email first, and what they may change. Anything they send that this does not permit is refused.
         */
        export interface EmailReviewConfig {
            enabled?: boolean;
            allow_document_selection?: boolean;
            allow_subject_and_body_edit?: boolean;
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
        /**
         * Linearized portal workflows of a single entity
         */
        export interface EntityPortalWorkflows {
            entity_id: string;
            /**
             * Empty when the entity has no portal-relevant workflow
             */
            workflows: /**
             * A portal-facing projection of a workflow execution (V1 or V2), with the execution
             * graph already linearized into a flat, ordered list of portal-visible steps.
             *
             */
            PortalWorkflow[];
        }
        /**
         * One entity a run is bound to. `entity_id` is the identity of a context: a run never holds two contexts with the same `entity_id`.
         */
        export interface EntityRef {
            entity_id?: string;
            entity_schema?: string;
            /**
             * Flag to indicate if the entity is primary and should be used for evaluating the conditions of the tasks
             */
            is_primary?: boolean;
            /**
             * Main-context promotion bookkeeping. Set when this context became the primary because the referenced automation task (configured with `output_context.set_as_primary`) completed. The promotion stands only while that task is COMPLETED — when it is reverted or reset, the promotion is unwound and the marker cleared.
             */
            promoted_by_task_id?: string;
            /**
             * When the promotion was applied. Orders competing promotions: the most recent valid promotion holds the primary.
             */
            promoted_at?: string; // date-time
            /**
             * Main-context promotion bookkeeping. Set on the context that LOST the primary to the referenced task's promotion. Restores this context as primary when that promotion is unwound.
             */
            demoted_by_task_id?: string;
            /**
             * Set when an automation task added this context (the entity its automation produced). A later run of the same task replaces it (loops); an entity of the same schema produced by any other task moves it down the list instead of removing it from the run.
             */
            added_by_task_id?: string;
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
             * The id of the action or trigger, or of the decision owning the loop a flow trait reads
             */
            id?: string;
            /**
             * Where the subject comes from: the run's trigger, an upstream action, or the running flow itself (`flow_runtime`, flow traits).
             *
             */
            origin?: "trigger" | "action" | "flow_runtime";
            /**
             * `trigger_source` (with origin `trigger`) marks a "started by" statement: the run's fired trigger is compared against the configured trigger ids in `values` — no entity attribute is involved.
             * `main_context` (with origin `trigger`, no `id`) marks a statement evaluated against the run's PRIMARY context: the fired trigger's entity, re-bound by any completed task that promotes its output to main context (`output_context.set_as_primary`). `schema` carries the subject's schema for attribute selection only — resolution is by the primary flag, never by schema.
             * `flow_trait` (with origin `flow_runtime`) marks a statement on a value of the running flow: `attribute` is the trait key, `id` and `attribute_sub_field` name its subject. `loop.iteration` is the lap a loop is in (1 on the first pass); `id` is the decision that owns the loop and `attribute_sub_field` the loop's id, a loop the evaluating decision is inside.
             *
             */
            origin_type?: "entity" | "workflow" | "journey_block" | "trigger_source" | "main_context" | "flow_trait";
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
             * For complex attribute types, specifies which sub-field to extract (e.g., 'address', 'name', 'email_type'); for the flow trait `loop.iteration`, the loop id
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
        export type FlowContext = /* One entity a run is bound to. `entity_id` is the identity of a context: a run never holds two contexts with the same `entity_id`. */ EntityRef;
        export interface FlowExecution {
            id: FlowExecutionId;
            /**
             * Where the engine reads this execution's loops and counts. For diagnostics; `loops` on the decisions is sent either way. Set when the execution is read or advanced and has a loop: in responses and events, never stored.
             */
            loop_source?: "loops" | "loop_config";
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
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
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
                 * Home organisation of the user who started the flow execution. Differs from org_id when a partner starts a flow in a vendor organisation, which is what lets the execution be auto-shared back to that partner.
                 */
                started_by_org_id?: string;
                /**
                 * User who closed the flow execution, as `{org_id}_{user_id}` for a user of another organisation. A cancel step a person ran is credited to that person; `system` when no person is behind the change.
                 */
                closed_by?: string;
                /**
                 * User who completed the flow execution, as `{org_id}_{user_id}` for a user of another organisation; `system` when no person is behind the change.
                 */
                completed_by?: string;
            };
            /**
             * Every entity this run manages — what it binds to, reads and writes.
             * Exactly one carries `is_primary` (the main context).
             *
             * UNIQUE BY `entity_id`. The list is append-only and grows as the run
             * progresses: entities handed in at start, entities an automation task
             * produces (`output_context`), and entities a display rule attaches
             * (`attach_to_contexts`). Because it is keyed on entity id, re-resolving
             * those rules is idempotent — an entity already present is never added
             * twice, whichever source finds it.
             *
             * A context stays once attached, even if the relation that introduced it
             * is later removed: it may already have been written to or referenced by
             * a completed condition, so dropping it would make the run's history
             * unreadable. Only `is_primary` moves.
             *
             */
            contexts: FlowContext[];
            /**
             * Where this run is allowed to be seen, copied from the definition's
             * `context_settings.visibility` when the run starts and re-read
             * whenever its visibility is re-resolved.
             *
             * `entity_views` — the run surfaces on entity pages and table views,
             * on the entities `visible_on` lists.
             *
             * `background` — the run is suppressed from every entity view. It
             * still holds contexts, still reads and writes them, and is still
             * indexed against them so it can be found deliberately; it simply
             * has no surfaces, and `visible_on` is empty.
             *
             * Read THIS to tell a background run from a visible one. An empty
             * `visible_on` is a consequence, not the statement — absent on runs
             * that predate visibility, and indistinguishable from a run that
             * resolved to nothing.
             *
             */
            visibility?: "entity_views" | "background";
            /**
             * Every entity this run is SHOWN on — the COMPLETE set, not a delta
             * against `contexts`. A context that is displayed appears here as
             * `kind: context`; a context whose display was switched off simply is
             * not here, which is how hiding is expressed.
             *
             * Resolved from `contexts` plus the definition's display rules: at
             * start, whenever the contexts change, and whenever a rule is edited.
             * It is the source of truth for the entity -> executions index, so an
             * entity absent from this list does not surface the run at all.
             *
             * Callers that searched by entity read their own entry out of this
             * list to learn WHY the run is here — `kind`, `anchor_entity_id` and
             * `rule_id` are what let a Contact page say "runs on Ticket #4821"
             * instead of implying the run belongs to the contact.
             *
             * Capped at 50. Contexts are never evicted by the cap — they are
             * where the run actually runs. What is left is shared ROUND-ROBIN
             * between the entries, so an entry with no labels, which matches
             * every related entity of its schema, cannot spend the whole budget
             * and leave the entries after it with nothing.
             *
             * Unlike `contexts`, an entry here does NOT survive the relation that
             * produced it being removed: a surface is not a fact of the run. That
             * recomputation on entity-relation changes is not implemented yet.
             *
             */
            visible_on?: [
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?
            ];
            crt_tasks: {
                id?: TaskId;
                /**
                 * Timestamp when this task entered crt_tasks (i.e. became current). Used by the flow-healing-service as the authoritative gate for "has this PENDING task been stuck long enough to heal?". Using the task's own analytics.status_updated_at as the gate produced false positives because transitioning a task INTO crt_tasks does not change its status — so that timestamp can be hours old for a freshly-current task.
                 */
                crt_since?: string; // date-time
            }[];
            phases?: Phase[];
            /**
             * Customer-facing stages copied from the flow template at start, with entry_node_id remapped to execution node ids (cut edge ids are stable across the copy). Per-node stage membership stays derived at read time, never stored.
             */
            stages?: /* A customer-facing progress segment layered on top of the flow graph, copied from the flow template when the execution starts. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order. On an execution, entry_node_id references execution node ids (remapped at start); cut edge ids are stable across the copy. Per-node membership is derived at read time, never stored. */ Stage[];
            /**
             * Portal-facing overrides of the flow name, copied from the flow template at start. The portal projection prefers the audience's override over `name`. Has no effect on execution behaviour.
             */
            portal_titles?: {
                ecp?: string;
                installer?: string;
            };
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
            /**
             * [Internal] Ordered automation flow ids that led to this flow being started, carried over from the triggering automation so that automations this flow runs as tasks inherit the chain. Without it the chain restarts at the automation -> workflow hop and loop prevention cannot detect a cycle that runs through a workflow. This is an internal property and should not be used by external consumers.
             */
            _automation_chain?: string[];
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
             * Verbatim snapshot of ALL of the flow template's configured triggers at start, in configuration order (the template's primary first, flagged `primary: true`). The runtime `trigger` record replaces the template's trigger field on the execution, so this snapshot is what keeps the execution's trigger configuration complete and reproducible after the template changes (executions are snapshots precisely because templates are not versioned). The trigger that STARTED the run is the entry whose id equals `trigger.trigger_id`; when nothing matches or that field is absent, the primary-flagged entry started it. Every other entry was configured but not picked. Absent on executions recorded before the field existed.
             */
            configured_triggers?: /* One configured trigger of the flow template, snapshotted VERBATIM onto the execution at start — conceptually the workflow-definition API's `Trigger` schema plus the `primary` flag. The trigger schema is owned by the definition service and copied through opaquely, so only the fields consumers key on are declared here; `additionalProperties` carries the rest of the trigger's configuration unchanged (e.g. an automation trigger's `automation_id`, a journey trigger's `journey_id`). */ ConfiguredTrigger[];
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
            /**
             * Id of the template trigger (primary or additional) that started this execution — a reference to a `ConfiguredTrigger.id`. On a start request it may name the trigger explicitly; when absent the engine resolves it from the automation source or the starting entity. Absent on executions recorded before multi-trigger flows existed.
             *
             */
            trigger_id?: string;
        }
        export interface ImmediateSchedule {
            mode: "immediate";
        }
        export type ItemType = "STEP" | "SECTION";
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
         * Server-managed. Tracks the journey automation execution a task in WAITING_FOR_JOURNEY_SUBMISSION is (or was) waiting on. Cleared whenever the task's automation state is reset (revert, loop-back, clear status).
         */
        export interface JourneyExecutionInfo {
            /**
             * Id of the automation execution triggered by the journey submission
             */
            execution_id?: string;
            /**
             * Last known status of that execution
             */
            execution_status?: string;
            /**
             * Why the wait cannot complete or did not complete cleanly — the journey automation's failure reason, or the send-time detection that the email contained no journey link (in which case execution_id is absent).
             */
            error_reason?: string;
            /**
             * Entity id of the submission that triggered the journey execution
             */
            submission_entity_id?: string;
            /**
             * When the submission entity was created (its `_created_at`), stamped from the entity createEntity event that carried the task's correlation claims. Present independently of — and usually before — the journey automation's own execution events, so the UI can show "journey submitted" while the automation is still running.
             */
            submission_created_at?: string; // date-time
            /**
             * Set when a user completed or skipped the task while it was waiting for the journey submission.
             */
            wait_overridden_at?: string; // date-time
            wait_overridden_by?: /* The user id */ UserId;
        }
        /**
         * Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current.
         */
        export interface JourneyPrefill {
            status: "PENDING" | "READY" | "FAILED" | "SKIPPED";
            agent_execution_id?: string;
            /**
             * Set when the prefill agent is dispatched (status PENDING). Drives stale-PENDING recovery.
             */
            dispatched_at?: string; // date-time
            extracted_at?: string; // date-time
            initial_state?: {
                [name: string]: any;
            };
            field_confidence?: {
                [name: string]: number;
            };
            dropped?: {
                source?: string;
                block_id?: string;
                reason: string;
            }[];
        }
        export interface LastEvaluatedKey {
            orgId?: string;
            creationTime?: string;
        }
        export interface ListBulkStartFlowsJobsResp {
            results: /* A bulk-start job as listed in the history, without its items. */ BulkStartFlowsJobSummary[];
            /**
             * Cursor of the next page; absent on the last page.
             */
            next_cursor?: string;
        }
        /**
         * Read `loops` instead. Kept for executions started before `loops`.
         */
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
        export interface LoopExecutionState {
            /**
             * The decision's branches that enter the loop.
             */
            entry_branch_ids: [
                string,
                ...string[]
            ];
            /**
             * The decision's branch that exits the loop.
             */
            exit_branch_id: string;
            /**
             * Maximum number of iterations of the loop.
             */
            max_iterations: number;
            /**
             * Current number of iterations of the loop.
             */
            crt_iteration?: number;
            /**
             * The task or phase each iteration starts from. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            target_id?: string;
            /**
             * The loops this loop is directly nested in. Several when two outer loops are not nested in each other. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            outer_loop_ids?: string[];
            /**
             * The number of loops on the longest chain this loop is nested in; 0 for an outermost loop. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            depth?: number;
        }
        /**
         * Information about loop iterations, when task is part of a loop branch
         */
        export interface LoopInfo {
            /**
             * Derived from the loop's counter; will be removed
             */
            max_iterations: number;
            /**
             * Derived from the loop's counter; will be removed
             */
            crt_iterations?: number;
        }
        export interface LoopMembership {
            loop_id: string;
            /**
             * True when the node runs on the loop's own iteration path. False when it only reruns with the loop because it sits in a nested loop.
             */
            runs_in_loop: boolean;
        }
        /**
         * What taking the branch does to its decision's loop at the current count. `closes_lap` starts another iteration, `enters_body` continues inside the loop, `exits_loop` leaves it, `budget_spent` would continue it but no iterations are left, so the exit branch is taken instead.
         */
        export type LoopOutcome = "closes_lap" | "enters_body" | "exits_loop" | "budget_spent";
        export interface ManualTask {
            id: TaskId;
            /**
             * The loops the task belongs to, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            journey?: StepJourney;
            journey_prefill?: /* Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current. */ JourneyPrefill;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            /**
             * The resolved instant from which the task can be worked on (AL-3678). Resolved by the engine when the task becomes current: a template's fixed date is kept, a `start_date_config` is evaluated against the most recent occurrence of its reference event and is never earlier than the moment the task was reached. The task a revert or a reopened flow lands on starts at once: its `start_date_config` resolves to that moment, while a fixed date is kept. While the start date lies in the future the task is upcoming: its status is unchanged, and while it is still open (not completed, not skipped, not failed in a way the template lets the flow move past) no person may move its status other than back to PENDING, run it, run its schedule now, cancel its schedule or choose its branch. Cleared on every reset of a task with a `start_date_config`. Server-owned, not patchable. No `format: date-time`, like `due_date`.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string | null;
            start_date_config?: /* Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted. */ StartDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it (enforced on PATCH and schedule cancellation). Snapshotted from the template at flow start. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Not patchable — ignored on client patches.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) whenever a description is written: at flow start, on add-task, on a description PATCH and on a loop reset. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate the task's person action — completing a manual task or manual decision, running a manual automation, approving a manual AI task's result — and a partner user is held only to the party they can see: the partner description, or the co-worker description when no partner description is enabled. Not patchable directly — a description PATCH may add, remove, rename and reorder items, but it may neither make a required item optional nor drop it, and it may not repeat an id (400).
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            /**
             * Per-subtask completion state, keyed by subtask id. Written via PATCH; ids must exist in `subtasks`, and `completed_by` / `completed_at` are server-stamped — client values are ignored. A cross-org (partner) caller may only write entries for the party they can see — the partner description, or the co-worker description when no partner description is enabled — and is refused with 403 otherwise. Cleared (null) on loop re-entry, revert, a system skip and a revival, together with the checkmarks in the description markup, so each incarnation of the task starts with unchecked boxes (see `completion_gates_reset_at`).
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            } | null;
            /**
             * Server-managed: records that the task's linked journey was submitted, stamped by the journey-submission listener via the correlation claims (wf_execution_id / wf_task_id) in the submission entity's journey_context — on manual tasks only. Gates the transition into COMPLETED when `journey.journey_submission_required` is set. Cleared (null) on loop re-entry, revert, a system skip and a revival so each incarnation needs its own submission; a submission created before the current incarnation began — the newer of the last recorded loop pass and `completion_gates_reset_at` — is not recorded. Not patchable — ignored on client patches.
             */
            journey_submission?: {
                /**
                 * Id of the submission entity that satisfied the gate
                 */
                submission_entity_id?: string;
                /**
                 * Time the submission entity was created
                 */
                submitted_at?: string; // date-time
            } | null;
            /**
             * Server-managed, execution-only: when the completion gates of this task were last reset — the moment its current incarnation began. Stamped by every incarnation-ending path (loop re-entry, revert, a system skip, a revival) that cleared subtask stamps, a journey submission, a journey-gate waiver or checked boxes in the markup. Together with the newest recorded loop pass it is the fence that keeps a journey submission created in an earlier incarnation from satisfying the current one's gate. Not patchable — ignored on client patches.
             */
            completion_gates_reset_at?: string | null; // date-time
            /**
             * Server-managed, execution-only: when the journey gate of this task was waived because the linked journey no longer exists, stamped on the completion that the waiver allowed and recorded on the activity trail. Cleared (null) on loop re-entry, revert, a system skip and a revival with the other gate state. Not patchable — ignored on client patches.
             */
            journey_gate_waived_at?: string | null; // date-time
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            ecp_placeholder_assignees?: /* Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches. */ EcpPlaceholderAssignees;
            analytics: AnalyticsInfo;
            /**
             * Previous passes this task made through a loop, keyed by the loop's decision task id, then by pass number. Only the 3 most recent passes per loop are retained, and a revert above a loop drops that loop's passes (null when cleared). Server-owned — ignored on client patches. Also carried on event payloads.
             */
            loop_iterations?: {
                [name: string]: {
                    [name: string]: /* A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here. */ TaskIteration;
                };
            } | null;
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
             * Order of the task's audience description tabs in the builder and during execution; the first tab shown opens by default. Keys not listed follow in the default order description, ecp, installer, partner, and audiences that are not enabled are skipped.
             */
            audience_order?: [
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?
            ];
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
        export interface PatchBulkStartFlowsJobReq {
            action: "APPROVE" | "CANCEL";
        }
        export interface PatchFlowReq {
            status?: WorkflowStatus;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            closing_reason?: FlowClosingReason;
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            contexts?: FlowContext[];
            /**
             * Re-states where the run may be seen. Sent together with `visible_on` by a re-resolution, so that a definition switched to `background` after the run started stops surfacing it.
             */
            visibility?: "entity_views" | "background";
            /**
             * Replaces the run's visible set wholesale. The entity -> executions index is rebuilt from it, and entries no longer present are pruned, so a partial list silently hides the run from the entities it omits.
             */
            visible_on?: [
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?,
                /* One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here. */ VisibleEntity?
            ];
        }
        export interface PatchPhaseReq {
            name?: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
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
             * Per-subtask completion state changes, keyed by subtask id. Ids must exist in the task's `subtasks`, otherwise the request is rejected. The server stamps `completed_by` / `completed_at` itself and ignores client-supplied values for them. Entries omitted here keep their stored state, and so does an entry equal to the stored one — re-checking keeps the original stamps. Unchecking a stamped item is applied only when the entry carries the stored `completed_at`, which tells the server the client has seen the completion it undoes; a `completed: false` entry without it is a stale echo and is ignored. An entry that would move a box is permission-checked like a status change (`UpdateTaskStatus`, or assigned plus `UpdateAssignedTaskStatus`); echoes are not. A cross-org (partner) caller may move only the boxes of the party they can see — the partner description, or the co-worker description when no partner description is enabled; an entry that would move another party's box is refused with 403.
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            };
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
             * For decision tasks, specifies which conditions/branches to follow in
             * parallel when completing the task. Requires parallel execution to be
             * enabled on the task: manual decisions need an explicit
             * `allow_parallel_execution: true`, automatic decisions allow it unless
             * explicitly disabled (a manual multi-branch override, e.g. after automatic
             * evaluation yielded no winner). Every ID must match a condition defined on
             * the decision task. A loop or exit-loop branch cannot be combined with
             * other branches. Takes precedence over `next_condition_id` when both are
             * provided.
             *
             * example:
             * [
             *   "cond_branch_a",
             *   "cond_branch_b"
             * ]
             */
            next_condition_ids?: [
                string,
                ...string[]
            ];
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
            /**
             * Partner organization ids to exclude from the Partner Assignment
             * Agent's candidate pool. Honoured only when this request re-runs an
             * AI agent task (status `IN_PROGRESS` on a failed or held agent
             * task): the ids are added to the task's
             * `agent_config.parameters.excluded_partner_org_ids` and the new
             * agent execution runs with them. Ignored otherwise.
             *
             * example:
             * [
             *   "partner-org-1"
             * ]
             */
            excluded_partner_org_ids?: string[];
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
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            analytics?: AnalyticsInfo;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            loop_config?: /* Information about loop iterations, when task is part of a loop branch */ LoopInfo;
            /**
             * The loops that repeat every task of the phase, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
        }
        export type PhaseId = string;
        export interface PhaseInEntity {
            phase_id?: string;
            phase_name?: string;
            phase_progress?: number;
            phase_assignees?: string[];
        }
        /**
         * Which portal audience the workflows are loaded for. Controls which task-level
         * portal config (`ecp` or `installer`) determines task visibility. `all` returns
         * tasks enabled for any audience — callers must state the widest scope explicitly
         * rather than falling into it by omission.
         *
         */
        export type PortalAudience = "ecp" | "installer" | "all";
        export interface PortalEntityRef {
            entity_id: string;
            /**
             * example:
             * order
             */
            entity_schema: string;
        }
        /**
         * A portal-facing projection of a workflow execution (V1 or V2), with the execution
         * graph already linearized into a flat, ordered list of portal-visible steps.
         *
         */
        export interface PortalWorkflow {
            /**
             * Id of the workflow / flow execution
             */
            id: string;
            /**
             * Id of the workflow definition / flow template this execution was created from
             */
            definition_id?: string;
            name: string;
            status: WorkflowStatus;
            /**
             * 2 = legacy V1 workflow execution (linear model), 3 = V2 flow execution (graph model)
             */
            version: 2 | 3;
            /**
             * Creation timestamp, doubles as started time
             */
            created_at?: string;
            /**
             * Last update timestamp
             */
            updated_at?: string;
            /**
             * Timestamp when the execution was completed, if it is
             */
            completed_at?: string;
            due_date?: string;
            assigned_to?: string[];
            contexts?: FlowContext[];
            /**
             * True when the linearized path reached the end of the execution graph. False when an
             * unevaluated decision task was encountered, meaning additional steps may appear once
             * the decision is resolved (the returned steps are still the guaranteed active path).
             * Always true for V1 executions.
             *
             */
            is_path_complete: boolean;
            /**
             * Portal-visible tasks in linear (timeline) order
             */
            tasks?: /* A single portal-visible step of a linearized workflow execution */ PortalWorkflowTask[];
            /**
             * Customer-facing stages of the execution in strict order, each with a derived progress status. Present only for V2 flow executions whose template defined stages and whose boundaries still resolve cleanly on the execution graph; omitted otherwise, so consumers must fall back to the flat task timeline.
             */
            stages?: /* A customer-facing stage of a flow execution as shown in portals, with a progress status derived from the execution's tasks. Stages form a strict total order; the array order is the stage order. */ PortalWorkflowStage[];
            /**
             * Portal-facing overrides of the flow name, copied from the flow template at start. Returned unresolved so that consumers fetching with audience `all` (the portals fetch once and render per-block audiences client-side) can pick the right one; `name` already carries the resolved title for the `ecp` and `installer` audiences.
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
        }
        /**
         * A customer-facing stage of a flow execution as shown in portals, with a progress status derived from the execution's tasks. Stages form a strict total order; the array order is the stage order.
         */
        export interface PortalWorkflowStage {
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
             * Derived progress status:
             * - COMPLETED: the run moved past this stage, or finished in it
             * - IN_PROGRESS: the flow's current work is inside this stage
             * - UPCOMING: the flow has not reached this stage yet
             * - NOT_REACHED: the flow finished (DONE or CLOSED) before reaching this stage — a run may legitimately end at any stage
             *
             */
            status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING" | "NOT_REACHED";
            /**
             * Latest completion timestamp among the stage's tasks; set only when the stage is COMPLETED and at least one of its tasks recorded one.
             */
            completed_at?: string;
            /**
             * Portal-facing overrides of the stage name, copied from the flow template at start. Returned unresolved so that consumers fetching with audience `all` can pick the right one; `name` already carries the resolved title for the `ecp` and `installer` audiences.
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
             * Portal-facing overrides of the stage description, copied from the flow template at start. Returned unresolved so that consumers fetching with audience `all` can pick the right one; `description` already carries the resolved text for the `ecp` and `installer` audiences.
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
        /**
         * A single portal-visible step of a linearized workflow execution
         */
        export interface PortalWorkflowTask {
            /**
             * Id of the underlying task (V2) or step (V1)
             */
            id: string;
            /**
             * Internal task/step name (fallback label when the portal config has none)
             */
            name: string;
            /**
             * Normalized step status:
             * - COMPLETED / SKIPPED: the step is done (skipped steps count as done for progress)
             * - IN_PROGRESS: the step has been reached and work has started
             * - PENDING: the step has not been completed yet
             *
             */
            status: "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "PENDING";
            /**
             * True when the step has been reached in the execution — all predecessor tasks on its
             * path are completed/skipped — so the portal user can act on it (e.g. start its journey).
             * Steps that are only part of the projected future path are returned with is_active false.
             * The start date is not taken into account: an active step can still be upcoming (see start_date).
             *
             */
            is_active: boolean;
            /**
             * The instant (ISO 8601) before which nobody may work on the task (AL-3678), as the execution stored it: a template's fixed date, or the date a relative start date resolved to when the task was reached. While it lies in the future the task is upcoming: the execution service refuses work on it while it is open, so a portal shows it as upcoming instead of offering its action. Neither `status` nor `is_active` reflects it; compare it with the current time. Absent when the task has no start date, when its kind may not carry one (an AI task, an automatic automation or decision), or when its relative start date has not been resolved yet because the task was not reached.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            journey?: StepJourney;
            assigned_to?: string[];
            /**
             * Id of the phase the underlying task belongs to, if any (V2 only)
             */
            phase_id?: string;
            /**
             * Name of the phase the underlying task belongs to, if any (V2 only)
             */
            phase_name?: string;
            /**
             * Id of the stage the underlying task belongs to, when the execution carries stages. Derived from the stage boundaries at read time, never stored.
             */
            stage_id?: string;
            /**
             * Timestamp when the step was completed or skipped
             */
            completed_at?: string;
            /**
             * Last update timestamp of the underlying task/step
             */
            updated_at?: string;
        }
        export interface PortalWorkflowsBatchSearchReq {
            /**
             * Entities to load portal workflows for; schemas may differ
             */
            entities: [
                PortalEntityRef,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?,
                PortalEntityRef?
            ];
            audience: /**
             * Which portal audience the workflows are loaded for. Controls which task-level
             * portal config (`ecp` or `installer`) determines task visibility. `all` returns
             * tasks enabled for any audience — callers must state the widest scope explicitly
             * rather than falling into it by omission.
             *
             */
            PortalAudience;
        }
        export interface PortalWorkflowsBatchSearchResp {
            /**
             * One entry per requested entity id, in request order
             */
            results: /* Linearized portal workflows of a single entity */ EntityPortalWorkflows[];
        }
        export interface PortalWorkflowsSearchReq {
            /**
             * Id of the entity the portal user is viewing
             */
            entity_id: string;
            /**
             * Schema of the entity
             * example:
             * order
             */
            entity_schema: string;
            audience: /**
             * Which portal audience the workflows are loaded for. Controls which task-level
             * portal config (`ecp` or `installer`) determines task visibility. `all` returns
             * tasks enabled for any audience — callers must state the widest scope explicitly
             * rather than falling into it by omission.
             *
             */
            PortalAudience;
        }
        export interface PortalWorkflowsSearchResp {
            workflows: /**
             * A portal-facing projection of a workflow execution (V1 or V2), with the execution
             * graph already linearized into a flat, ordered list of portal-visible steps.
             *
             */
            PortalWorkflow[];
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
            schedule_id?: string | null;
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
         * The bounded choice a person makes when running a semi-automated task. Optional in full: a task that configures no choice runs from its automation's stored configuration.
         *
         * Nothing here is trusted as sent. Each input is checked against the stored task — never against the request — and is rejected unless that task actually configures the choice it carries.
         */
        export interface RunTaskAutomationReq {
            action_inputs?: /* Run-time inputs keyed by the automation action they belong to. An action whose key is absent runs entirely from its configuration. */ TaskAutomationActionInputs;
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
            /**
             * Also return runs whose `visibility` is `background`.
             *
             * Background runs are indexed against their contexts but never listed
             * by default — that is the point of the mode. This opts them back in
             * for a surface that asks for them deliberately, such as a "show
             * background processes" toggle in the entity's flows sidebar, where
             * the alternative is a process nobody can find when it stalls.
             *
             * It does NOT widen access: results are still filtered by the
             * caller's view permissions, and nothing here reaches the entity's
             * `workflows` projection, so entity tables and saved views stay
             * clean either way.
             *
             */
            include_background?: boolean;
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
                 * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
         * The adjustments a person made to a reviewed email. Each field is accepted only when the task's `email_review` permits it; sent otherwise it is a 400, so a caller cannot rewrite an email the configurator locked.
         *
         * These are the RENDERED values, not template edits — the template is untouched and other flows using it are unaffected.
         */
        export interface SendEmailInputs {
            subject?: string;
            /**
             * The edited HTML body. Capped well below the automation execution's own limits: it is carried through Step Functions state, which is bounded at 256KB for the whole payload.
             */
            body?: string;
            /**
             * File entities the person chose. Checked against the task entity's own file relations before sending, so a caller cannot attach an arbitrary file from elsewhere in the organisation.
             */
            attachment_entity_ids?: string[];
        }
        /**
         * A customer-facing progress segment layered on top of the flow graph, copied from the flow template when the execution starts. Unlike phases (internal task grouping), stages exist to communicate progress to outside users (e.g. end customers) with a title and description. Stages form a strict total order. On an execution, entry_node_id references execution node ids (remapped at start); cut edge ids are stable across the copy. Per-node membership is derived at read time, never stored.
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
             * Id of the graph node (task, phase, or the trigger sentinel) at which this stage begins. The first stage's entry_node_id is the trigger sentinel. Exactly one of entry_node_id / cut_edge_ids per stage; when both are present, cut_edge_ids wins.
             */
            entry_node_id?: string;
            /**
             * Edge-cut boundary, for stages that begin inside branching regions: the stage begins where these edges are crossed — one cut edge per branch that continues past the boundary, so that no path crosses it twice and none bypasses it. Branches that end before the boundary need no cut; a run may end in any stage.
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
        /**
         * Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted.
         */
        export interface StartDateConfig {
            duration: number;
            unit: TimeUnit;
            type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "A_PRECEDING_TASK_COMPLETED" | "ALL_PRECEDING_TASKS_COMPLETED" | "THIS_TASK_LAST_COMPLETED";
            /**
             * The task whose completion `TASK_FINISHED` counts from
             */
            task_id?: string;
        }
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
             * Unique by `entity_id`: repeated references are folded into one context,
             * keeping the first occurrence and OR-ing `is_primary`. A caller handing in
             * several entities (a journey automation passing the sequence it created)
             * therefore never has to de-duplicate them itself.
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
             * Portal-facing label that replaces the default "Start now" button shown for this task's linked journey in the End Customer Portal / Installer Portal. Snapshotted from the template at flow start and relayed on the portal projection. Blank or absent means the portal keeps its own translated default.
             */
            portal_button_label?: string;
            /**
             * If true, the task be auto completed when the journey is completed
             */
            complete_task_automatically?: boolean;
            /**
             * When true, the task cannot transition into COMPLETED until the linked journey was actually submitted (enforced on PATCH). Manual tasks only: the definition service rejects the flag on every other kind and the engine ignores it there. Snapshotted from the template at flow start. The submission is verified server-side — see `TaskBase.journey_submission`. When the journey no longer exists the gate is waived on completion, stamped as `TaskBase.journey_gate_waived_at` and recorded on the activity trail.
             */
            journey_submission_required?: boolean;
            /**
             * Values preset by the flow author for context parameters the journey declares in its contextSchema. A value is either a literal or an entity variable over the run's context, which the launcher resolves when the journey is opened from the task. Overrides the parameter's default value and the launcher's own entity ids.
             */
            context_parameters?: JourneyContextParameter[];
            ai_prefill?: /* AI extraction + prefill configuration for the attached journey (Flows v2 only) */ AiPrefillConfig;
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
         * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
         * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
         * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
         *
         */
        export type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "SCHEDULED" | "PENDING" | "CONDITION_PENDING" | "WAITING_FOR_CONFIRMATION" | "WAITING_FOR_JOURNEY_SUBMISSION" | "ON_HOLD" | "FAILED";
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
             * When true, the task cannot be completed until this item is checked
             */
            required?: boolean;
        }
        /**
         * Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false.
         */
        export interface SubtaskState {
            completed: boolean;
            /**
             * Server-stamped id of the user who checked the item
             */
            completed_by?: string;
            /**
             * Server-stamped time the item was checked. On a PATCH, echo the stored value together with `completed: false` to uncheck a stamped item.
             */
            completed_at?: string; // date-time
        }
        export type Task = ManualTask | AutomationTask | DecisionTask | AiAgentTask;
        /**
         * A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners.
         */
        export type TaskAudience = "description" | "ecp" | "installer" | "partner";
        /**
         * Run-time inputs keyed by the automation action they belong to. An action whose key is absent runs entirely from its configuration.
         */
        export interface TaskAutomationActionInputs {
            cancel_flow_execution?: /* The reason the person chose for cancelling the flow. Ids only — the titles stored on the closed execution are resolved server-side from the execution's `closing_reason.configured_reasons`, so a caller cannot record a reason under a title of its own choosing. */ CancelFlowExecutionInputs;
            send_email?: /**
             * The adjustments a person made to a reviewed email. Each field is accepted only when the task's `email_review` permits it; sent otherwise it is a 400, so a caller cannot rewrite an email the configurator locked.
             *
             * These are the RENDERED values, not template edits — the template is untouched and other flows using it are unaffected.
             */
            SendEmailInputs;
        }
        export interface TaskBase {
            id: TaskId;
            /**
             * The loops the task belongs to, innermost first. Derived when the execution is read or advanced; in responses and events, never stored.
             */
            loop_membership?: LoopMembership[];
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            journey?: StepJourney;
            journey_prefill?: /* Server-tracked outcome of an AI journey-prefill dispatch for this task (Flows v2 only). Absent when the task has no `journey.ai_prefill` config, or before the task becomes current. */ JourneyPrefill;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition. `START_DATE` counts from the task's own start date (AL-3678). A template may set it only on a task that has a start date; sent on a task, phase or flow without one, it is stored but has no effect, and the stored due date stays. */ DueDateConfig;
            /**
             * The resolved instant from which the task can be worked on (AL-3678). Resolved by the engine when the task becomes current: a template's fixed date is kept, a `start_date_config` is evaluated against the most recent occurrence of its reference event and is never earlier than the moment the task was reached. The task a revert or a reopened flow lands on starts at once: its `start_date_config` resolves to that moment, while a fixed date is kept. While the start date lies in the future the task is upcoming: its status is unchanged, and while it is still open (not completed, not skipped, not failed in a way the template lets the flow move past) no person may move its status other than back to PENDING, run it, run its schedule now, cancel its schedule or choose its branch. Cleared on every reset of a task with a `start_date_config`. Server-owned, not patchable. No `format: date-time`, like `due_date`.
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            start_date?: string | null;
            start_date_config?: /* Relative start date of a task (AL-3678): `duration` `unit` after the most recent occurrence of the reference event. `THIS_TASK_LAST_COMPLETED` is the task's own previous completion (a loop's earlier pass); there is no wait while the reference event has not happened. Durations are positive whole numbers and are added as exact calendar time (no business days); `years` is not accepted. */ StartDateConfig;
            /**
             * requirements that need to be fulfilled in order to enable the task while flow instances are running
             */
            requirements?: /* describe the requirement for a task to be enabled */ EnableRequirement[];
            /**
             * When true, the task is required and users cannot skip it (enforced on PATCH and schedule cancellation). Snapshotted from the template at flow start. Unrelated to `requirements`, which gate when a task becomes enabled. System-driven skips are unaffected — tasks on a not-taken decision branch, and automation tasks whose automation execution itself reports a skipped verdict (e.g. unmet trigger conditions). Not patchable — ignored on client patches.
             */
            required?: boolean;
            /**
             * Checklist items from the task's party descriptions, derived by the server from the checklist markup (`ul[__lexicallisttype="check"] > li[data-subtask-id]`, nearest list ancestor) whenever a description is written: at flow start, on add-task, on a description PATCH and on a loop reset. Parties are read in the order description, ecp, installer, partner and the first occurrence of an id wins. An item is required only when it is marked `data-subtask-required="true"` in the markup, the task kind has a person action (a manual task, a decision with `trigger_mode: manual`, or an automation or AI task whose `trigger_mode` is `manual` or absent) and it lives in the co-worker or partner description. Required items gate the task's person action — completing a manual task or manual decision, running a manual automation, approving a manual AI task's result — and a partner user is held only to the party they can see: the partner description, or the co-worker description when no partner description is enabled. Not patchable directly — a description PATCH may add, remove, rename and reorder items, but it may neither make a required item optional nor drop it, and it may not repeat an id (400).
             */
            subtasks?: /* One checklist item of a task, derived from the checklist markup in the party descriptions. Identity is the stable data-subtask-id the editor mints into the markup. */ Subtask[];
            /**
             * Per-subtask completion state, keyed by subtask id. Written via PATCH; ids must exist in `subtasks`, and `completed_by` / `completed_at` are server-stamped — client values are ignored. A cross-org (partner) caller may only write entries for the party they can see — the partner description, or the co-worker description when no partner description is enabled — and is refused with 403 otherwise. Cleared (null) on loop re-entry, revert, a system skip and a revival, together with the checkmarks in the description markup, so each incarnation of the task starts with unchecked boxes (see `completion_gates_reset_at`).
             */
            subtask_states?: {
                [name: string]: /* Completion state of one subtask. `completed_by` and `completed_at` are server-managed — stamped when a PATCH flips `completed` to true, cleared when it flips back to false. */ SubtaskState;
            } | null;
            /**
             * Server-managed: records that the task's linked journey was submitted, stamped by the journey-submission listener via the correlation claims (wf_execution_id / wf_task_id) in the submission entity's journey_context — on manual tasks only. Gates the transition into COMPLETED when `journey.journey_submission_required` is set. Cleared (null) on loop re-entry, revert, a system skip and a revival so each incarnation needs its own submission; a submission created before the current incarnation began — the newer of the last recorded loop pass and `completion_gates_reset_at` — is not recorded. Not patchable — ignored on client patches.
             */
            journey_submission?: {
                /**
                 * Id of the submission entity that satisfied the gate
                 */
                submission_entity_id?: string;
                /**
                 * Time the submission entity was created
                 */
                submitted_at?: string; // date-time
            } | null;
            /**
             * Server-managed, execution-only: when the completion gates of this task were last reset — the moment its current incarnation began. Stamped by every incarnation-ending path (loop re-entry, revert, a system skip, a revival) that cleared subtask stamps, a journey submission, a journey-gate waiver or checked boxes in the markup. Together with the newest recorded loop pass it is the fence that keeps a journey submission created in an earlier incarnation from satisfying the current one's gate. Not patchable — ignored on client patches.
             */
            completion_gates_reset_at?: string | null; // date-time
            /**
             * Server-managed, execution-only: when the journey gate of this task was waived because the linked journey no longer exists, stamped on the completion that the waiver allowed and recorded on the activity trail. Cleared (null) on loop re-entry, revert, a system skip and a revival with the other gate state. Not patchable — ignored on client patches.
             */
            journey_gate_waived_at?: string | null; // date-time
            assigned_to?: /* The user ids or variable assignments */ Assignees;
            ecp_placeholder_assignees?: /* Server-managed, execution-only: for each customer / installer portal placeholder the task is configured with (`placeholder_ecp_customers`, `placeholder_ecp_installers`), the portal user ids it put on the task and still manages. An empty list means the placeholder matches nobody yet. Written at flow start and updated while the task is open: when the task becomes current, and when a relation of the flow's primary context changes (for opportunity, order, contact, account, contract and ticket contexts) — matches are added, portal users who no longer match are removed, recorded ones missing from `assigned_to` are put back, and ids assigned by hand are never touched. A patch of `assigned_to` that leaves out one of a placeholder's portal users drops that placeholder, as does one that only matches people already assigned; it is then left to people. Absent when the task has no placeholder, empty once every placeholder was taken over. Not patchable — ignored on client patches. */ EcpPlaceholderAssignees;
            analytics: AnalyticsInfo;
            /**
             * Previous passes this task made through a loop, keyed by the loop's decision task id, then by pass number. Only the 3 most recent passes per loop are retained, and a revert above a loop drops that loop's passes (null when cleared). Server-owned — ignored on client patches. Also carried on event payloads.
             */
            loop_iterations?: {
                [name: string]: {
                    [name: string]: /* A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here. */ TaskIteration;
                };
            } | null;
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
             * Order of the task's audience description tabs in the builder and during execution; the first tab shown opens by default. Keys not listed follow in the default order description, ecp, installer, partner, and audiences that are not enabled are skipped.
             */
            audience_order?: [
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?,
                /* A task audience, named after the task field holding its description: co-workers (description), end customers (ecp), installers and partners. */ TaskAudience?
            ];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
        }
        /**
         * The rendered email a send-email task is about to send. `subject` is what the person edits, and `body` too while `body_edit_locked` is false; the rest is shown for context and is not editable.
         */
        export interface TaskEmailPreview {
            subject?: string;
            /**
             * Rendered HTML.
             */
            body?: string;
            to?: string[];
            /**
             * True when the template uses variables only the sending worker can resolve — a confirmation link, or portal variables built from a portal context. They render as placeholders here and are filled in on send, so the person reviewing must be told rather than left to "correct" them.
             */
            has_unresolved_send_time_variables?: boolean;
            /**
             * True when the action adds content to the body only at send time — a confirmation link to wait on, a journey to wait for a submission of, or portal variables for a portal user. An edited body would replace that content, so the run refuses body edits for such an action and the review must not offer them; the subject stays editable.
             */
            body_edit_locked?: boolean;
            /**
             * The files related to the entity this email renders against, offered when the step lets the person choose documents to attach; absent otherwise. The ids are what a run sends back as `attachment_entity_ids`. Only the entity's direct file relations are listed, which is the set the worker accepts a chosen id from, so nothing offered here is dropped at send. Listed in full up to a ceiling of 500 files; beyond that the rest are not offered.
             */
            attachable_documents?: {
                id: string;
                filename: string;
            }[];
            /**
             * The images the template embeds in the body as inline attachments, referenced there as `cid:` sources that only a mail client can resolve. Each pairs the content id with a public URL of the same image, so a client can display the body; an edited body sent back must reference the images by `cid:` again, or they are not embedded. Only images the body references are listed.
             */
            inline_images?: {
                cid: string;
                url: string;
            }[];
        }
        export type TaskId = string;
        export interface TaskInEntity {
            task_id?: string;
            task_name?: string;
            task_assignees?: string[];
            task_duedate?: string; // date-time
            task_start_date?: string;
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
        }
        /**
         * A task's state as it stood at the close of one pass through a loop. The owning task and the loop key identify it, so neither id is repeated here.
         */
        export interface TaskIteration {
            /**
             * Which pass this was. The first pass through a loop is 1.
             */
            iteration: number;
            recorded_at: string; // date-time
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            analytics?: AnalyticsInfo;
            automation_execution_id?: string;
            agent_execution_id?: string;
            error_reason?: string;
            /**
             * Status of the agent execution when the pass closed.
             */
            execution_status?: string;
            /**
             * Outcome of the agent execution (e.g. no_eligible_partner).
             */
            outcome?: string;
            condition_results?: /**
             * How one of a decision task's conditions stood when a loop pass closed.
             * `is_met: false` means the branch was evaluated and rejected; an absent
             * entry means it was never reached.
             *
             */
            ConditionResult[];
            schedule_id?: string;
        }
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
            journey?: StepJourney;
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
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
        /**
         * One entity a run is SHOWN on. Distinct from a context: a context is what the run reads, writes and decides against, while this only decides where people see it. Every context that is displayed also appears here.
         */
        export interface VisibleEntity {
            entity_id: string;
            entity_schema?: string;
            /**
             * `context` — an entity the run is bound to, shown on itself.
             * `display` — an entity with no context of its own, reached from a context by a relation label. Acting on the run from here acts on its main context; nothing is copied and no second run starts.
             */
            kind: "context" | "display";
            /**
             * `display` only. The context this entity was reached from — the entity the run actually runs on, which the UI names so a person can see they are acting on something else.
             */
            anchor_entity_id?: string;
            /**
             * `display` only. The `FlowDisplayRule` that put this entity here.
             */
            rule_id?: string;
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
            /**
             * Resolved start date of the task (AL-3678); the task is upcoming while it lies in the future
             */
            task_start_date?: string;
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
             * - **WAITING_FOR_JOURNEY_SUBMISSION**: Automation task sent its email and is paused until the journey linked in that email is submitted and the journey's submission automation completes. Unlike WAITING_FOR_CONFIRMATION, the task status is decoupled from `automation_config.execution_status`, which stays `success`.
             * - **ON_HOLD**: Step/Task is temporarily paused and cannot proceed until manually resumed
             * - **FAILED**: Task encountered an error and could not be completed. Mainly for automation tasks.
             *
             */
            StepStatus;
            /**
             * Every open current task of the workflow, in crt_tasks order. Omitted whenever the task_* fields are.
             */
            current_tasks?: TaskInEntity[];
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
    namespace BulkStartFlows {
        export type RequestBody = /* Start every flow in `flow_template_ids` on every entity in `entities`. */ Components.Schemas.BulkStartFlowsReq;
        namespace Responses {
            export type $202 = Components.Schemas.BulkStartFlowsJob;
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
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $409 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $503 = /**
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
    namespace GetActiveBulkStartFlowsJob {
        namespace Responses {
            export type $200 = Components.Schemas.ActiveBulkStartFlowsJobResp;
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetBulkStartFlowsJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BulkStartFlowsJob;
            export interface $401 {
            }
            export interface $403 {
            }
            export type $404 = /**
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
    namespace ListBulkStartFlowsJobs {
        namespace Parameters {
            export type Cursor = string;
            export type Size = number;
        }
        export interface QueryParameters {
            size?: Parameters.Size;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListBulkStartFlowsJobsResp;
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
        }
    }
    namespace PatchBulkStartFlowsJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export type RequestBody = Components.Schemas.PatchBulkStartFlowsJobReq;
        namespace Responses {
            export type $200 = Components.Schemas.BulkStartFlowsJob;
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
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $409 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
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
    namespace PreviewTaskEmail {
        namespace Parameters {
            export type ExecutionId = string;
            export type TaskId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            task_id: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = /* The rendered email a send-email task is about to send. `subject` is what the person edits, and `body` too while `body_edit_locked` is false; the rest is shown for context and is not editable. */ Components.Schemas.TaskEmailPreview;
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
    namespace RestartBulkStartFlowsJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $202 = Components.Schemas.BulkStartFlowsJob;
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
            export type $404 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $409 = /**
             * Standard error response returned when an API request fails.
             * Contains a human-readable message describing the error.
             *
             */
            Components.Schemas.ErrorResp;
            export type $503 = /**
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
        export type RequestBody = /**
         * The bounded choice a person makes when running a semi-automated task. Optional in full: a task that configures no choice runs from its automation's stored configuration.
         *
         * Nothing here is trusted as sent. Each input is checked against the stored task — never against the request — and is rejected unless that task actually configures the choice it carries.
         */
        Components.Schemas.RunTaskAutomationReq;
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
            export type $409 = /**
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
            export type $409 = /**
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
    namespace SearchPortalWorkflows {
        export type RequestBody = Components.Schemas.PortalWorkflowsSearchReq;
        namespace Responses {
            export type $200 = Components.Schemas.PortalWorkflowsSearchResp;
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
    namespace SearchPortalWorkflowsBatch {
        export type RequestBody = Components.Schemas.PortalWorkflowsBatchSearchReq;
        namespace Responses {
            export type $200 = Components.Schemas.PortalWorkflowsBatchSearchResp;
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
            export type $503 = /**
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
   * 
   * Returns runs the entity is a CONTEXT of and runs merely SHOWN on it through a display
   * rule. To tell the two apart, read the requested `entity_id` out of each result's
   * `visible_on`: `kind: display` also carries `anchor_entity_id`, the entity the run
   * actually runs on. No separate field is returned for this — the run already carries the
   * answer.
   * 
   */
  'searchFlowExecutions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchFlowExecutions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchFlowExecutions.Responses.$200>
  /**
   * searchPortalWorkflows - searchPortalWorkflows
   * 
   * Returns all portal-relevant workflow executions for a given entity, linearized into a
   * flat, ordered list of portal-visible steps. Intended to be called by the Customer Portal
   * API (ECP / Installer Portal) instead of fetching raw executions and linearizing client-side.
   * 
   * **Resolves CONTEXTS only.** A run reached through a display rule (`visible_on` with
   * `kind: display`) is deliberately not returned here: it runs on an entity the portal user
   * may have no access to, and a step anchored on something they cannot open is worse than
   * an absent one. Internal surfaces use the full visible set; the portal does not.
   * 
   * **Covers both execution models:**
   * - **V1 workflow executions** (legacy linear model, `version: 2`): sections/steps are
   *   flattened into the same step shape.
   * - **V2 flow executions** (graph model, `version: 3`): the execution graph is traversed
   *   from the trigger node along the *active path* — following edges whose conditions are met,
   *   resolving decision tasks, and skipping loop edges.
   * 
   * **Linearization semantics (V2):**
   * - Only tasks enabled for the requested `audience` become steps: `ecp` / `installer`
   *   filter by the matching task config, `all` includes tasks enabled for any audience.
   * - When a decision task has met conditions, all winning branches are followed (parallel
   *   branches supported).
   * - When a decision task is still unevaluated, traversal does **not** stop: it continues from
   *   the enclosing phase's exit edge to the next phase, since the phase backbone is guaranteed
   *   to be on the active path regardless of which branch inside the phase eventually wins.
   *   Steps inside the unresolved branches are omitted until the decision is evaluated, and
   *   `is_path_complete` is `false` to signal that more steps may appear later.
   * - A step is `is_active: true` when it has been *reached*: all predecessor tasks on its path
   *   are completed/skipped, so a portal user can act on it. Steps after an unevaluated decision
   *   are returned but not active.
   * - A step whose task has a start date carries it as `start_date` (AL-3678). While that
   *   instant lies in the future a step that is not done yet is upcoming: nobody may work on
   *   it, whatever `is_active` says.
   * 
   * **Ordering:** completed/skipped steps first (by completion time), then active steps, then
   * upcoming steps in traversal order.
   * 
   * Workflows with no portal-visible step for the requested audience, and V2 flows with
   * `available_in_ecp: false`, are filtered out.
   * 
   */
  'searchPortalWorkflows'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchPortalWorkflows.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPortalWorkflows.Responses.$200>
  /**
   * searchPortalWorkflowsBatch - searchPortalWorkflowsBatch
   * 
   * Batch variant of `searchPortalWorkflows`: returns portal-relevant workflow
   * executions for MANY entities in a single call — schemas may differ — each
   * linearized into a flat, ordered list of portal-visible tasks (same semantics
   * as the single-entity endpoint).
   * 
   * Intended for portal list views (e.g. an entity list where every card shows
   * its workflow progress), where enriching per entity would fan out into one
   * request per row. Accepts up to 50 entity ids per call.
   * 
   * The response contains one entry per requested entity id (in request order),
   * with an empty `workflows` array when the entity has no portal-relevant
   * workflow — absence of workflows is authoritative, not an error.
   * 
   */
  'searchPortalWorkflowsBatch'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchPortalWorkflowsBatch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPortalWorkflowsBatch.Responses.$200>
  /**
   * bulkStartFlows - bulkStartFlows
   * 
   * Creates a job that starts one or more flows on many entities: every flow in
   * `flow_template_ids` is started on every entity in `entities` (up to 5 flows,
   * 200 entities, 1000 starts). Every start is manual.
   * 
   * The request only runs a preflight and returns `202` with the job in status
   * `awaiting_approval`. Nothing is started until the job is approved with
   * `PATCH /v2/flows/bulk-jobs/{job_id}` (`action: APPROVE`); a job not approved
   * within 24 hours expires.
   * 
   * The preflight checks the caller may trigger flows, loads every template, and
   * matches each entity against the template's trigger. A pair whose entity type
   * no trigger accepts is recorded as a `skipped` item with `error_code:
   * trigger_entity_mismatch`. `flows[]` summarises per flow how many starts the
   * job will make, which is what a confirmation dialog shows.
   * 
   * After approval the job runs in the background, paced to protect the
   * datastore (roughly 5–10 starts per second). Poll
   * `GET /v2/flows/bulk-jobs/{job_id}` for progress; the user who created the
   * job is notified in-app when it finishes.
   * 
   */
  'bulkStartFlows'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkStartFlows.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkStartFlows.Responses.$202>
  /**
   * listBulkStartFlowsJobs - listBulkStartFlowsJobs
   * 
   * Lists the organization's approved bulk-start jobs, newest approval first,
   * with their counts but without items. Jobs never approved (still awaiting
   * approval, or expired) are not listed. Jobs are kept for 30 days.
   * 
   * Pass `next_cursor` of a page as `cursor` to read the next one.
   * 
   */
  'listBulkStartFlowsJobs'(
    parameters?: Parameters<Paths.ListBulkStartFlowsJobs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListBulkStartFlowsJobs.Responses.$200>
  /**
   * getActiveBulkStartFlowsJob - getActiveBulkStartFlowsJob
   * 
   * Returns the caller's bulk-start job in flight (`queued` or `running`), or
   * `job: null` when there is none.
   * 
   * A user can have one bulk start in flight at a time: creating or approving
   * another returns `409` with `error_code: BULK_START_ALREADY_RUNNING`. Clients
   * read this on load to resume showing a running job, for example after a page
   * refresh.
   * 
   */
  'getActiveBulkStartFlowsJob'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActiveBulkStartFlowsJob.Responses.$200>
  /**
   * getBulkStartFlowsJob - getBulkStartFlowsJob
   * 
   * Returns a bulk-start job with its counts and one item per (flow, entity)
   * pair, including the started execution id or the error.
   * 
   */
  'getBulkStartFlowsJob'(
    parameters?: Parameters<Paths.GetBulkStartFlowsJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBulkStartFlowsJob.Responses.$200>
  /**
   * patchBulkStartFlowsJob - patchBulkStartFlowsJob
   * 
   * Approves or cancels a bulk-start job.
   * 
   * - `APPROVE`: only from `awaiting_approval`, before the job expires. Queues the
   *   job; starts begin within seconds.
   * - `CANCEL`: from `awaiting_approval` or `queued` the job is cancelled at once.
   *   From `running` the job stops at its next checkpoint (a few seconds), or at
   *   once when no worker currently holds it; flows already started are kept and
   *   the remaining items become `cancelled`.
   * 
   */
  'patchBulkStartFlowsJob'(
    parameters?: Parameters<Paths.PatchBulkStartFlowsJob.PathParameters> | null,
    data?: Paths.PatchBulkStartFlowsJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchBulkStartFlowsJob.Responses.$200>
  /**
   * restartBulkStartFlowsJob - restartBulkStartFlowsJob
   * 
   * Restarts what is left of an ended bulk-start job: creates a new job, in
   * `awaiting_approval`, from the job's `failed` items and the items it never
   * started (`cancelled`). Started and skipped items are not repeated. Like
   * `bulkStartFlows`, it starts nothing: approve the new job with
   * `PATCH /v2/flows/bulk-jobs/{job_id}`.
   * 
   * Only a job in `completed_with_errors`, `failed` or `cancelled` can be
   * restarted. Each flow is loaded again: a flow deleted since becomes
   * `skipped` items (`error_code: flow_not_found`). The new job names the
   * source job in `restart_of`. A job is restarted at most once: approving
   * the new job marks the source job `restarted_by` it, and from then on
   * neither another restart of the source job nor the approval of another
   * restart preflight of it is allowed.
   * 
   */
  'restartBulkStartFlowsJob'(
    parameters?: Parameters<Paths.RestartBulkStartFlowsJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RestartBulkStartFlowsJob.Responses.$202>
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
   * Runs configured automation for a flow task. Running a `trigger_mode: manual` automation (an absent trigger mode counts as manual) is its person action, so it is permission-checked like completing a task (`UpdateTaskStatus`, or assigned plus `UpdateAssignedTaskStatus`) and refused with 400 "Cannot run this automation: N required subtask(s) are unfinished." while required subtasks the caller can see are unticked. The engine's own dispatch through executeTask is exempt.
   * 
   * A semi-automated task carries the bounded choice its assignee makes in the request body. The body is optional: a task that configures no choice runs entirely from its automation's stored configuration, exactly as before. For an organisation without semi-automated tasks enabled, a body whose `action_inputs` carries a `cancel_flow_execution` or `send_email` input is refused with 400 rather than run without it; an empty `action_inputs` runs as before.
   */
  'runTaskAutomation'(
    parameters?: Parameters<Paths.RunTaskAutomation.PathParameters> | null,
    data?: Paths.RunTaskAutomation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RunTaskAutomation.Responses.$200>
  /**
   * previewTaskEmail - previewTaskEmail
   * 
   * Renders the email a semi-automated send-email task would send, so the person running it can review and adjust it first.
   * 
   * Rendered here rather than in the client so that the preview and the eventual send resolve the same way: the entity is chosen by the same rule the run uses — the flow's primary entity, or an upstream task's output when the step's input context says so — and the template is rendered through the same call the sending worker makes.
   * 
   * Permission-checked like running the task, since a preview reveals the rendered contents of an email. Refused with 400 for an organisation without semi-automated tasks enabled, since the run would refuse the edits a preview invites.
   */
  'previewTaskEmail'(
    parameters?: Parameters<Paths.PreviewTaskEmail.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewTaskEmail.Responses.$200>
  /**
   * executeTask - executeTask
   * 
   * Executes any kind of flow task immediately. This is the scheduler's dispatch endpoint: when its timer fires on the SCHEDULED task it booked, in the scheduler's own name, the call is the engine dispatch and is the only caller exempt from the task's completion gates. Any other caller — a person, or a service token on a task no timer is waiting on — is gated like a PATCH.
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
   * 
   * The task is assigned to the user who creates it, unless `task.assigned_to`
   * is given and the caller may assign tasks.
   * 
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
   * execution unchanged) when the task is already terminal, the automation
   * is still running, or the task is in `WAITING_FOR_JOURNEY_SUBMISSION`
   * (the send execution's `success` must not complete a task that is
   * deliberately waiting on the journey's submission automation).
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
   * Cancels the pending schedule for a task and immediately triggers its automation execution. Always a person's request, so a `trigger_mode: manual` automation (an absent trigger mode counts as manual) is held to the same permission rule and run gate as runTaskAutomation — the 400 for unticked required subtasks is raised before the schedule is cancelled, so a refused call leaves the timer armed.
   * 
   * A step with an email review whose schedule is booked, in an organisation with semi-automated tasks enabled, is triggered first, under the same trigger claim as its schedule and an email review of it, and its schedule is cancelled best-effort afterwards; the schedule id stays on the task. The call is refused with 409 when the task's automation was already triggered. A task whose last run failed or was skipped runs again, even if that run had completed some of its actions, and a trigger that fails leaves the schedule armed. Other tasks, including a review step with no booked schedule, are unchanged.
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
     * 
     * Returns runs the entity is a CONTEXT of and runs merely SHOWN on it through a display
     * rule. To tell the two apart, read the requested `entity_id` out of each result's
     * `visible_on`: `kind: display` also carries `anchor_entity_id`, the entity the run
     * actually runs on. No separate field is returned for this — the run already carries the
     * answer.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchFlowExecutions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchFlowExecutions.Responses.$200>
  }
  ['/v2/flows/executions:portal-search']: {
    /**
     * searchPortalWorkflows - searchPortalWorkflows
     * 
     * Returns all portal-relevant workflow executions for a given entity, linearized into a
     * flat, ordered list of portal-visible steps. Intended to be called by the Customer Portal
     * API (ECP / Installer Portal) instead of fetching raw executions and linearizing client-side.
     * 
     * **Resolves CONTEXTS only.** A run reached through a display rule (`visible_on` with
     * `kind: display`) is deliberately not returned here: it runs on an entity the portal user
     * may have no access to, and a step anchored on something they cannot open is worse than
     * an absent one. Internal surfaces use the full visible set; the portal does not.
     * 
     * **Covers both execution models:**
     * - **V1 workflow executions** (legacy linear model, `version: 2`): sections/steps are
     *   flattened into the same step shape.
     * - **V2 flow executions** (graph model, `version: 3`): the execution graph is traversed
     *   from the trigger node along the *active path* — following edges whose conditions are met,
     *   resolving decision tasks, and skipping loop edges.
     * 
     * **Linearization semantics (V2):**
     * - Only tasks enabled for the requested `audience` become steps: `ecp` / `installer`
     *   filter by the matching task config, `all` includes tasks enabled for any audience.
     * - When a decision task has met conditions, all winning branches are followed (parallel
     *   branches supported).
     * - When a decision task is still unevaluated, traversal does **not** stop: it continues from
     *   the enclosing phase's exit edge to the next phase, since the phase backbone is guaranteed
     *   to be on the active path regardless of which branch inside the phase eventually wins.
     *   Steps inside the unresolved branches are omitted until the decision is evaluated, and
     *   `is_path_complete` is `false` to signal that more steps may appear later.
     * - A step is `is_active: true` when it has been *reached*: all predecessor tasks on its path
     *   are completed/skipped, so a portal user can act on it. Steps after an unevaluated decision
     *   are returned but not active.
     * - A step whose task has a start date carries it as `start_date` (AL-3678). While that
     *   instant lies in the future a step that is not done yet is upcoming: nobody may work on
     *   it, whatever `is_active` says.
     * 
     * **Ordering:** completed/skipped steps first (by completion time), then active steps, then
     * upcoming steps in traversal order.
     * 
     * Workflows with no portal-visible step for the requested audience, and V2 flows with
     * `available_in_ecp: false`, are filtered out.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchPortalWorkflows.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPortalWorkflows.Responses.$200>
  }
  ['/v2/flows/executions:portal-search-batch']: {
    /**
     * searchPortalWorkflowsBatch - searchPortalWorkflowsBatch
     * 
     * Batch variant of `searchPortalWorkflows`: returns portal-relevant workflow
     * executions for MANY entities in a single call — schemas may differ — each
     * linearized into a flat, ordered list of portal-visible tasks (same semantics
     * as the single-entity endpoint).
     * 
     * Intended for portal list views (e.g. an entity list where every card shows
     * its workflow progress), where enriching per entity would fan out into one
     * request per row. Accepts up to 50 entity ids per call.
     * 
     * The response contains one entry per requested entity id (in request order),
     * with an empty `workflows` array when the entity has no portal-relevant
     * workflow — absence of workflows is authoritative, not an error.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchPortalWorkflowsBatch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPortalWorkflowsBatch.Responses.$200>
  }
  ['/v2/flows/executions:bulk-start']: {
    /**
     * bulkStartFlows - bulkStartFlows
     * 
     * Creates a job that starts one or more flows on many entities: every flow in
     * `flow_template_ids` is started on every entity in `entities` (up to 5 flows,
     * 200 entities, 1000 starts). Every start is manual.
     * 
     * The request only runs a preflight and returns `202` with the job in status
     * `awaiting_approval`. Nothing is started until the job is approved with
     * `PATCH /v2/flows/bulk-jobs/{job_id}` (`action: APPROVE`); a job not approved
     * within 24 hours expires.
     * 
     * The preflight checks the caller may trigger flows, loads every template, and
     * matches each entity against the template's trigger. A pair whose entity type
     * no trigger accepts is recorded as a `skipped` item with `error_code:
     * trigger_entity_mismatch`. `flows[]` summarises per flow how many starts the
     * job will make, which is what a confirmation dialog shows.
     * 
     * After approval the job runs in the background, paced to protect the
     * datastore (roughly 5–10 starts per second). Poll
     * `GET /v2/flows/bulk-jobs/{job_id}` for progress; the user who created the
     * job is notified in-app when it finishes.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkStartFlows.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkStartFlows.Responses.$202>
  }
  ['/v2/flows/bulk-jobs']: {
    /**
     * listBulkStartFlowsJobs - listBulkStartFlowsJobs
     * 
     * Lists the organization's approved bulk-start jobs, newest approval first,
     * with their counts but without items. Jobs never approved (still awaiting
     * approval, or expired) are not listed. Jobs are kept for 30 days.
     * 
     * Pass `next_cursor` of a page as `cursor` to read the next one.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListBulkStartFlowsJobs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListBulkStartFlowsJobs.Responses.$200>
  }
  ['/v2/flows/bulk-jobs:active']: {
    /**
     * getActiveBulkStartFlowsJob - getActiveBulkStartFlowsJob
     * 
     * Returns the caller's bulk-start job in flight (`queued` or `running`), or
     * `job: null` when there is none.
     * 
     * A user can have one bulk start in flight at a time: creating or approving
     * another returns `409` with `error_code: BULK_START_ALREADY_RUNNING`. Clients
     * read this on load to resume showing a running job, for example after a page
     * refresh.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetActiveBulkStartFlowsJob.Responses.$200>
  }
  ['/v2/flows/bulk-jobs/{job_id}']: {
    /**
     * getBulkStartFlowsJob - getBulkStartFlowsJob
     * 
     * Returns a bulk-start job with its counts and one item per (flow, entity)
     * pair, including the started execution id or the error.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBulkStartFlowsJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBulkStartFlowsJob.Responses.$200>
    /**
     * patchBulkStartFlowsJob - patchBulkStartFlowsJob
     * 
     * Approves or cancels a bulk-start job.
     * 
     * - `APPROVE`: only from `awaiting_approval`, before the job expires. Queues the
     *   job; starts begin within seconds.
     * - `CANCEL`: from `awaiting_approval` or `queued` the job is cancelled at once.
     *   From `running` the job stops at its next checkpoint (a few seconds), or at
     *   once when no worker currently holds it; flows already started are kept and
     *   the remaining items become `cancelled`.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.PatchBulkStartFlowsJob.PathParameters> | null,
      data?: Paths.PatchBulkStartFlowsJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchBulkStartFlowsJob.Responses.$200>
  }
  ['/v2/flows/bulk-jobs/{job_id}/restart']: {
    /**
     * restartBulkStartFlowsJob - restartBulkStartFlowsJob
     * 
     * Restarts what is left of an ended bulk-start job: creates a new job, in
     * `awaiting_approval`, from the job's `failed` items and the items it never
     * started (`cancelled`). Started and skipped items are not repeated. Like
     * `bulkStartFlows`, it starts nothing: approve the new job with
     * `PATCH /v2/flows/bulk-jobs/{job_id}`.
     * 
     * Only a job in `completed_with_errors`, `failed` or `cancelled` can be
     * restarted. Each flow is loaded again: a flow deleted since becomes
     * `skipped` items (`error_code: flow_not_found`). The new job names the
     * source job in `restart_of`. A job is restarted at most once: approving
     * the new job marks the source job `restarted_by` it, and from then on
     * neither another restart of the source job nor the approval of another
     * restart preflight of it is allowed.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RestartBulkStartFlowsJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RestartBulkStartFlowsJob.Responses.$202>
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
     * Runs configured automation for a flow task. Running a `trigger_mode: manual` automation (an absent trigger mode counts as manual) is its person action, so it is permission-checked like completing a task (`UpdateTaskStatus`, or assigned plus `UpdateAssignedTaskStatus`) and refused with 400 "Cannot run this automation: N required subtask(s) are unfinished." while required subtasks the caller can see are unticked. The engine's own dispatch through executeTask is exempt.
     * 
     * A semi-automated task carries the bounded choice its assignee makes in the request body. The body is optional: a task that configures no choice runs entirely from its automation's stored configuration, exactly as before. For an organisation without semi-automated tasks enabled, a body whose `action_inputs` carries a `cancel_flow_execution` or `send_email` input is refused with 400 rather than run without it; an empty `action_inputs` runs as before.
     */
    'post'(
      parameters?: Parameters<Paths.RunTaskAutomation.PathParameters> | null,
      data?: Paths.RunTaskAutomation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RunTaskAutomation.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/email-preview']: {
    /**
     * previewTaskEmail - previewTaskEmail
     * 
     * Renders the email a semi-automated send-email task would send, so the person running it can review and adjust it first.
     * 
     * Rendered here rather than in the client so that the preview and the eventual send resolve the same way: the entity is chosen by the same rule the run uses — the flow's primary entity, or an upstream task's output when the step's input context says so — and the template is rendered through the same call the sending worker makes.
     * 
     * Permission-checked like running the task, since a preview reveals the rendered contents of an email. Refused with 400 for an organisation without semi-automated tasks enabled, since the run would refuse the edits a preview invites.
     */
    'get'(
      parameters?: Parameters<Paths.PreviewTaskEmail.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewTaskEmail.Responses.$200>
  }
  ['/v2/flows/executions/{execution_id}/tasks/{task_id}/execute']: {
    /**
     * executeTask - executeTask
     * 
     * Executes any kind of flow task immediately. This is the scheduler's dispatch endpoint: when its timer fires on the SCHEDULED task it booked, in the scheduler's own name, the call is the engine dispatch and is the only caller exempt from the task's completion gates. Any other caller — a person, or a service token on a task no timer is waiting on — is gated like a PATCH.
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
     * 
     * The task is assigned to the user who creates it, unless `task.assigned_to`
     * is given and the caller may assign tasks.
     * 
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
     * execution unchanged) when the task is already terminal, the automation
     * is still running, or the task is in `WAITING_FOR_JOURNEY_SUBMISSION`
     * (the send execution's `success` must not complete a task that is
     * deliberately waiting on the journey's submission automation).
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
     * Cancels the pending schedule for a task and immediately triggers its automation execution. Always a person's request, so a `trigger_mode: manual` automation (an absent trigger mode counts as manual) is held to the same permission rule and run gate as runTaskAutomation — the 400 for unticked required subtasks is raised before the schedule is cancelled, so a refused call leaves the timer armed.
     * 
     * A step with an email review whose schedule is booked, in an organisation with semi-automated tasks enabled, is triggered first, under the same trigger claim as its schedule and an email review of it, and its schedule is cancelled best-effort afterwards; the schedule id stays on the task. The call is refused with 409 when the task's automation was already triggered. A task whose last run failed or was skipped runs again, even if that run had completed some of its actions, and a trigger that fails leaves the schedule armed. Other tasks, including a review step with no booked schedule, are unchanged.
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
export type ActiveBulkStartFlowsJobResp = Components.Schemas.ActiveBulkStartFlowsJobResp;
export type AddTaskReq = Components.Schemas.AddTaskReq;
export type AgentConfig = Components.Schemas.AgentConfig;
export type AgentExecutionInfo = Components.Schemas.AgentExecutionInfo;
export type AiAgentTask = Components.Schemas.AiAgentTask;
export type AiPrefillConfig = Components.Schemas.AiPrefillConfig;
export type AiPrefillExtractionField = Components.Schemas.AiPrefillExtractionField;
export type AiPrefillMapping = Components.Schemas.AiPrefillMapping;
export type AnalyticsInfo = Components.Schemas.AnalyticsInfo;
export type Assignees = Components.Schemas.Assignees;
export type AutomationConfig = Components.Schemas.AutomationConfig;
export type AutomationFailurePolicy = Components.Schemas.AutomationFailurePolicy;
export type AutomationInfo = Components.Schemas.AutomationInfo;
export type AutomationInputContext = Components.Schemas.AutomationInputContext;
export type AutomationInputExtraContextRef = Components.Schemas.AutomationInputExtraContextRef;
export type AutomationInputExtraTaskRef = Components.Schemas.AutomationInputExtraTaskRef;
export type AutomationOutputContext = Components.Schemas.AutomationOutputContext;
export type AutomationTask = Components.Schemas.AutomationTask;
export type BulkStartEntityRef = Components.Schemas.BulkStartEntityRef;
export type BulkStartFlowsFlowSummary = Components.Schemas.BulkStartFlowsFlowSummary;
export type BulkStartFlowsItem = Components.Schemas.BulkStartFlowsItem;
export type BulkStartFlowsItemStatus = Components.Schemas.BulkStartFlowsItemStatus;
export type BulkStartFlowsJob = Components.Schemas.BulkStartFlowsJob;
export type BulkStartFlowsJobCounts = Components.Schemas.BulkStartFlowsJobCounts;
export type BulkStartFlowsJobStatus = Components.Schemas.BulkStartFlowsJobStatus;
export type BulkStartFlowsJobSummary = Components.Schemas.BulkStartFlowsJobSummary;
export type BulkStartFlowsReq = Components.Schemas.BulkStartFlowsReq;
export type CancelFlowExecutionInputs = Components.Schemas.CancelFlowExecutionInputs;
export type ClosingReason = Components.Schemas.ClosingReason;
export type ClosingReasonResp = Components.Schemas.ClosingReasonResp;
export type Condition = Components.Schemas.Condition;
export type ConditionId = Components.Schemas.ConditionId;
export type ConditionResult = Components.Schemas.ConditionResult;
export type ConfiguredTrigger = Components.Schemas.ConfiguredTrigger;
export type CreateStepReq = Components.Schemas.CreateStepReq;
export type DecisionTask = Components.Schemas.DecisionTask;
export type DelayedSchedule = Components.Schemas.DelayedSchedule;
export type DueDateConfig = Components.Schemas.DueDateConfig;
export type DynamicDueDate = Components.Schemas.DynamicDueDate;
export type ECPDetails = Components.Schemas.ECPDetails;
export type EcpPlaceholderAssignees = Components.Schemas.EcpPlaceholderAssignees;
export type Edge = Components.Schemas.Edge;
export type EmailReviewConfig = Components.Schemas.EmailReviewConfig;
export type EnableRequirement = Components.Schemas.EnableRequirement;
export type EntityPortalWorkflows = Components.Schemas.EntityPortalWorkflows;
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
export type JourneyContextParameter = Components.Schemas.JourneyContextParameter;
export type JourneyExecutionInfo = Components.Schemas.JourneyExecutionInfo;
export type JourneyPrefill = Components.Schemas.JourneyPrefill;
export type LastEvaluatedKey = Components.Schemas.LastEvaluatedKey;
export type ListBulkStartFlowsJobsResp = Components.Schemas.ListBulkStartFlowsJobsResp;
export type LoopConfig = Components.Schemas.LoopConfig;
export type LoopExecutionState = Components.Schemas.LoopExecutionState;
export type LoopInfo = Components.Schemas.LoopInfo;
export type LoopMembership = Components.Schemas.LoopMembership;
export type LoopOutcome = Components.Schemas.LoopOutcome;
export type ManualTask = Components.Schemas.ManualTask;
export type Operator = Components.Schemas.Operator;
export type PartnerDetails = Components.Schemas.PartnerDetails;
export type PatchBulkStartFlowsJobReq = Components.Schemas.PatchBulkStartFlowsJobReq;
export type PatchFlowReq = Components.Schemas.PatchFlowReq;
export type PatchPhaseReq = Components.Schemas.PatchPhaseReq;
export type PatchTaskReq = Components.Schemas.PatchTaskReq;
export type Phase = Components.Schemas.Phase;
export type PhaseId = Components.Schemas.PhaseId;
export type PhaseInEntity = Components.Schemas.PhaseInEntity;
export type PortalAudience = Components.Schemas.PortalAudience;
export type PortalEntityRef = Components.Schemas.PortalEntityRef;
export type PortalWorkflow = Components.Schemas.PortalWorkflow;
export type PortalWorkflowStage = Components.Schemas.PortalWorkflowStage;
export type PortalWorkflowTask = Components.Schemas.PortalWorkflowTask;
export type PortalWorkflowsBatchSearchReq = Components.Schemas.PortalWorkflowsBatchSearchReq;
export type PortalWorkflowsBatchSearchResp = Components.Schemas.PortalWorkflowsBatchSearchResp;
export type PortalWorkflowsSearchReq = Components.Schemas.PortalWorkflowsSearchReq;
export type PortalWorkflowsSearchResp = Components.Schemas.PortalWorkflowsSearchResp;
export type RelativeSchedule = Components.Schemas.RelativeSchedule;
export type RunTaskAutomationReq = Components.Schemas.RunTaskAutomationReq;
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
export type SendEmailInputs = Components.Schemas.SendEmailInputs;
export type Stage = Components.Schemas.Stage;
export type StartDateConfig = Components.Schemas.StartDateConfig;
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
export type Subtask = Components.Schemas.Subtask;
export type SubtaskState = Components.Schemas.SubtaskState;
export type Task = Components.Schemas.Task;
export type TaskAudience = Components.Schemas.TaskAudience;
export type TaskAutomationActionInputs = Components.Schemas.TaskAutomationActionInputs;
export type TaskBase = Components.Schemas.TaskBase;
export type TaskEmailPreview = Components.Schemas.TaskEmailPreview;
export type TaskId = Components.Schemas.TaskId;
export type TaskInEntity = Components.Schemas.TaskInEntity;
export type TaskIteration = Components.Schemas.TaskIteration;
export type TaskType = Components.Schemas.TaskType;
export type TimeUnit = Components.Schemas.TimeUnit;
export type TriggerMode = Components.Schemas.TriggerMode;
export type TriggerType = Components.Schemas.TriggerType;
export type UpdateEntityAttributes = Components.Schemas.UpdateEntityAttributes;
export type UpdateStepReq = Components.Schemas.UpdateStepReq;
export type UpdateStepResp = Components.Schemas.UpdateStepResp;
export type UserId = Components.Schemas.UserId;
export type VariableAssignment = Components.Schemas.VariableAssignment;
export type VisibleEntity = Components.Schemas.VisibleEntity;
export type WorkflowContext = Components.Schemas.WorkflowContext;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
export type WorkflowExecutionBase = Components.Schemas.WorkflowExecutionBase;
export type WorkflowExecutionCreateReq = Components.Schemas.WorkflowExecutionCreateReq;
export type WorkflowExecutionSlim = Components.Schemas.WorkflowExecutionSlim;
export type WorkflowExecutionUpdateReq = Components.Schemas.WorkflowExecutionUpdateReq;
export type WorkflowInEntity = Components.Schemas.WorkflowInEntity;
export type WorkflowStatus = Components.Schemas.WorkflowStatus;
