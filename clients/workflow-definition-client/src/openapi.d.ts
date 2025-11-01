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
        export type ActionSchedule = ImmediateSchedule | DelayedSchedule | RelativeSchedule;
        /**
         * Configuration for automation execution to run
         */
        export interface AutomationConfig {
            /**
             * Id of the configured automation to run
             */
            flow_id: string;
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
            assigned_to?: string[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            automation_config: /* Configuration for automation execution to run */ AutomationConfig;
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
            automation_id: string;
        }
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
        /**
         * Closing reason could be not found
         */
        export interface ClosingReasonNotFoundResp {
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
            statements: Statement[];
        }
        export interface CreateFlowTemplate {
            id?: string;
            org_id?: string;
            name: string;
            description?: string;
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
            assigned_to?: string[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            phases?: Phase[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": "workflow_started",
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
            assigned_to?: string[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            trigger_mode: TriggerMode;
            conditions: Condition[];
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
         * Definition could be not found
         */
        export interface DefinitionNotFoundResp {
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
            type: "WORKFLOW_STARTED" | "TASK_FINISHED" | "PHASE_FINISHED";
            task_id?: string;
            phase_id?: string;
        }
        /**
         * set a Duedate for a step then a specific
         */
        export interface DynamicDueDate {
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
            from_id: string;
            to_id: string;
            condition_id?: string;
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
         *   "trigger": "workflow_started",
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
            trigger: "workflow_started" | "workflow_completed" | "workflow_cancelled" | "workflow_reopened" | "workflow_assigned" | "workflow_due_date_changed" | "workflow_contexts_changed" | "task_updated" | "task_created" | "task_completed" | "task_skipped" | "task_marked_in_progress" | "curr_task_changed" | "phase_updated" | "phase_completed" | "phase_skipped" | "phase_marked_in_progress";
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
        export interface ErrorResp {
            message?: string;
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
            attribute_type?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label";
            attribute_repeatable?: boolean;
            attribute_operation?: "all" | "updated" | "added" | "deleted";
        }
        export interface FlowTemplate {
            id?: string;
            org_id?: string;
            name: string;
            description?: string;
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
            assigned_to?: string[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            phases?: Phase[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": "workflow_started",
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
        }
        export interface FlowTemplateBase {
            id?: string;
            org_id?: string;
            name: string;
            description?: string;
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
            assigned_to?: string[];
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            phases?: Phase[];
            tasks: Task[];
            edges: Edge[];
            closing_reasons?: /* One Closing reason for a workflow */ ClosingReason[];
            entity_sync?: /**
             * example:
             * {
             *   "trigger": "workflow_started",
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
        }
        /**
         * Short unique id (length 8) to identify the Flow Template.
         * example:
         * 7hj28akg
         */
        export type FlowTemplateId = string;
        export interface FlowTemplatesList {
            results: FlowTemplate[];
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
            assigned_to?: string[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
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
        export interface Phase {
            id: string;
            name: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: string[];
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
                 * The id of the entity / workflow / task, based on the origin of the schedule
                 */
                id: string;
                origin: "flow_started" | "task_completed" | "trigger_entity_attribute";
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
        export interface SearchFlowTemplates {
            name?: string;
            definition_id?: string;
            trigger_type?: "journey_submission" | "manual" | "automation";
            enabled?: boolean;
            from?: number;
            size?: number;
            sort_by?: "created_at" | "updated_at";
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
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            assignedTo?: string[];
            steps: /* Action that needs to be done in a Workflow */ Step[];
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
        }
        export interface Statement {
            id: string;
            source: EvaluationSource;
            operator: Operator;
            values: string[];
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
             * If true, the task be auto completed when the journey is completed. By default it is true.
             */
            complete_task_automatically?: boolean;
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
        export type Task = ManualTask | AutomationTask | DecisionTask;
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
            assigned_to?: string[];
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            installer?: /* Details regarding ECP for the workflow step */ ECPDetails;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
        }
        export type TaskType = "MANUAL" | "AUTOMATION" | "DECISION";
        export type TimeUnit = "minutes" | "hours" | "days" | "weeks" | "months";
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
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
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
            export type $201 = Components.Schemas.WorkflowDefinition;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace CreateFlowTemplate {
        export type RequestBody = Components.Schemas.CreateFlowTemplate;
        namespace Responses {
            export type $201 = Components.Schemas.FlowTemplate;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $403 = Components.Schemas.ErrorResp;
            export type $404 = /* Closing reason could be not found */ Components.Schemas.ClosingReasonNotFoundResp;
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
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
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
            export type $201 = Components.Schemas.FlowTemplate;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $400 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $404 = /* Closing reason could be not found */ Components.Schemas.ClosingReasonNotFoundResp;
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
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $404 = /* Closing reason could be not found */ Components.Schemas.ClosingReasonNotFoundResp;
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $200 = Components.Schemas.FlowTemplate;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $404 = /* Definition could be not found */ Components.Schemas.DefinitionNotFoundResp;
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
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace SearchFlowTemplates {
        export type RequestBody = Components.Schemas.SearchFlowTemplates;
        namespace Responses {
            export interface $200 {
                hits?: number;
                results?: Components.Schemas.FlowTemplate[];
            }
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $400 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $404 = /* Closing reason could be not found */ Components.Schemas.ClosingReasonNotFoundResp;
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
    namespace UpdateFlowTemplate {
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
        export type RequestBody = Components.Schemas.FlowTemplate;
        namespace Responses {
            export type $200 = Components.Schemas.FlowTemplate;
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
   * Create a new Flow Template.
   */
  'createFlowTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
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
   * Get specific FLow template for a customer
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
    parameters?: Parameters<Paths.UpdateFlowTemplate.PathParameters> | null,
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
   * Duplicate a Flow Template from an existing workflow.
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
     * Create a new Flow Template.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
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
     * Get specific FLow template for a customer
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
      parameters?: Parameters<Paths.UpdateFlowTemplate.PathParameters> | null,
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
     * Duplicate a Flow Template from an existing workflow.
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
export type AutomationConfig = Components.Schemas.AutomationConfig;
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
export type EnableRequirement = Components.Schemas.EnableRequirement;
export type EntitySync = Components.Schemas.EntitySync;
export type ErrorResp = Components.Schemas.ErrorResp;
export type EvaluationSource = Components.Schemas.EvaluationSource;
export type FlowTemplate = Components.Schemas.FlowTemplate;
export type FlowTemplateBase = Components.Schemas.FlowTemplateBase;
export type FlowTemplateId = Components.Schemas.FlowTemplateId;
export type FlowTemplatesList = Components.Schemas.FlowTemplatesList;
export type ImmediateSchedule = Components.Schemas.ImmediateSchedule;
export type ItemType = Components.Schemas.ItemType;
export type JourneyAutomationTrigger = Components.Schemas.JourneyAutomationTrigger;
export type JourneySubmissionTrigger = Components.Schemas.JourneySubmissionTrigger;
export type ManualTask = Components.Schemas.ManualTask;
export type ManualTrigger = Components.Schemas.ManualTrigger;
export type MaxAllowedLimit = Components.Schemas.MaxAllowedLimit;
export type Operator = Components.Schemas.Operator;
export type Phase = Components.Schemas.Phase;
export type RelativeSchedule = Components.Schemas.RelativeSchedule;
export type SearchFlowTemplates = Components.Schemas.SearchFlowTemplates;
export type Section = Components.Schemas.Section;
export type Statement = Components.Schemas.Statement;
export type Step = Components.Schemas.Step;
export type StepDescription = Components.Schemas.StepDescription;
export type StepJourney = Components.Schemas.StepJourney;
export type StepRequirement = Components.Schemas.StepRequirement;
export type StepType = Components.Schemas.StepType;
export type Task = Components.Schemas.Task;
export type TaskBase = Components.Schemas.TaskBase;
export type TaskType = Components.Schemas.TaskType;
export type TimeUnit = Components.Schemas.TimeUnit;
export type Trigger = Components.Schemas.Trigger;
export type TriggerMode = Components.Schemas.TriggerMode;
export type TriggerType = Components.Schemas.TriggerType;
export type UpdateEntityAttributes = Components.Schemas.UpdateEntityAttributes;
export type Version = Components.Schemas.Version;
export type WorkflowDefinition = Components.Schemas.WorkflowDefinition;
