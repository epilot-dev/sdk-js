/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type ExecutionIdParam = string;
        export type SoftDeleteParam = boolean;
    }
    export interface PathParameters {
        ExecutionIdParam?: Parameters.ExecutionIdParam;
    }
    export interface QueryParameters {
        SoftDeleteParam?: Parameters.SoftDeleteParam;
    }
    namespace Schemas {
        /**
         * The user ids
         */
        export type Assignees = string[];
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
        export interface AutomationTask {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: StepStatus;
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
            assigned_to?: /* The user ids */ Assignees;
            analytics: {
                started_at?: string; // date-time
                completed_at?: string; // date-time
                in_progress_by?: /* The user id */ UserId;
                completed_by?: /* The user id */ UserId;
                skipped_by?: /* The user id */ UserId;
            };
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
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            automation_config: {
                /**
                 * Id of the configured automation to run
                 */
                flow_id: string;
                /**
                 * Id of the automation execution which ran
                 */
                execution_id?: string;
                execution_mode?: "MANUAL_TRIGGER_BY_USER_CLICK" | "AUTO_TRIGGER_BY_SYSTEM_ON_CURRENT_TASK";
            };
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
            logical_operator: "AND" | "OR";
            statements: Statement[];
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
            status?: StepStatus;
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
            status: StepStatus;
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
            assigned_to?: /* The user ids */ Assignees;
            analytics: {
                started_at?: string; // date-time
                completed_at?: string; // date-time
                in_progress_by?: /* The user id */ UserId;
                completed_by?: /* The user id */ UserId;
                skipped_by?: /* The user id */ UserId;
            };
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
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
            conditions: Condition[];
        }
        /**
         * Set due date for the task based on a dynamic condition
         */
        export interface DueDateConfig {
            duration: number;
            unit: "minutes" | "hours" | "days" | "weeks" | "months";
            type: "WORKFLOW_STARTED" | "TASK_FINISHED";
            task_id?: string;
        }
        /**
         * set a Duedate for a step then a specific
         */
        export interface DynamicDueDate {
            numberOfUnits: number;
            timePeriod: "days" | "weeks" | "months";
            actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED";
            stepId?: string;
        }
        /**
         * Details regarding ECP for the workflow step
         */
        export interface ECPDetails {
            label?: string;
            journey?: StepJourney;
        }
        export interface Edge {
            id: string;
            task_id_from: TaskId;
            task_id_to: TaskId;
            condition_id?: /**
             * A locally unique identifier for the condition
             * example:
             * abc123
             */
            ConditionId;
        }
        /**
         * describe the requirement for a task to be enabled
         */
        export interface EnableRequirement {
            task_id?: string;
            phase_id?: string;
            when: "TASK_FINISHED" | "PHASE_FINISHED";
        }
        export interface EntityRef {
            entity_id?: string;
            entity_schema?: string;
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
        export interface ExecutionPaginationDynamo {
            orgId?: string;
            creationTime?: string;
        }
        export interface Flow {
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
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
            assigned_to?: /* The user ids */ Assignees;
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
            crt_task_id: TaskId;
            phases?: Phase[];
            tasks: Task[];
            edges: Edge[];
            closing_reason?: {
                selected_reasons?: ClosingReason[];
                configured_reasons?: ClosingReason[];
                extra_description?: string;
            };
            /**
             * Indicates whether this flow execution is available for End Customer Portal or not. By default it's not.
             */
            available_in_ecp?: boolean;
            update_entity_attributes?: UpdateEntityAttributes[];
            /**
             * Taxonomy ids (both Labels and Purposes) that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            trigger: {
                id?: string;
                type?: TriggerType;
                automation_config?: /* Configuration for automation execution to run */ AutomationConfig;
            };
        }
        export type FlowExecutionId = string;
        export interface FlowSlim {
            flow: (/* A group of Steps that define the progress of the Workflow */ Section | Step)[];
        }
        export type FlowTemplateId = string;
        export type ItemType = "STEP" | "SECTION";
        export interface LastEvaluatedKey {
            orgId?: string;
            creationTime?: string;
        }
        export type ManualTask = TaskBase;
        export type Operator = "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty";
        export interface PatchFlowReq {
            status?: WorkflowStatus;
            assigned_to?: /* The user ids */ Assignees;
            selected_closing_reasons?: ClosingReason[];
            closing_reason_description?: string;
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            /**
             * id of the user / partner user who is closing the workflow. For partner pass orgId_userId.
             */
            closed_by?: string;
            contexts?: WorkflowContext[];
            /**
             * Timestamp when flow execution was completed
             */
            completed_at?: string; // date-time
        }
        export interface Phase {
            id: string;
            template_id: string;
            name: string;
            /**
             * example:
             * 2021-04-27T12:00:00.000Z
             */
            due_date?: string;
            due_date_config?: /* Set due date for the task based on a dynamic condition */ DueDateConfig;
            assigned_to?: /* The user ids */ Assignees;
            /**
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
        }
        export interface PhaseInEntity {
            phase_id?: string;
            phase_name?: string;
            phase_progress?: number;
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
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21"
             *         },
             *         {
             *           "id": "sada5641f3a22"
             *         },
             *         {
             *           "id": "sada5641f3a23"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1"
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
                status?: StepStatus;
                created?: string;
                lastUpdated?: string;
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
            startedTime?: string;
            completedTime?: string;
            status?: SectionStatus;
            type: ItemType;
            steps: Step[];
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
        }
        export type SectionStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
        export interface StartFlowReq {
            flow_template_id: string;
            trigger_type?: TriggerType;
            contexts: FlowContext[];
            /**
             * An array of purposes to filter workflow phases.
             */
            purposes: string[];
        }
        export interface Statement {
            id: string;
            source: EvaluationSource;
            operator: Operator;
            values: string[];
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
            status?: StepStatus;
            created?: string;
            lastUpdated?: string;
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
            status?: StepStatus;
            created?: string;
            lastUpdated?: string;
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
            enabled?: boolean;
            requirements?: /* describe the requirement for step enablement */ StepRequirement[];
            /**
             * Manual / Automation step
             */
            executionType?: StepType;
        }
        export type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS";
        export type StepType = "MANUAL" | "AUTOMATION";
        export type Task = ManualTask | AutomationTask | DecisionTask;
        export interface TaskBase {
            id: TaskId;
            template_id: string;
            name: string;
            description?: /* Longer information regarding Task */ StepDescription;
            status: StepStatus;
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
            assigned_to?: /* The user ids */ Assignees;
            analytics: {
                started_at?: string; // date-time
                completed_at?: string; // date-time
                /**
                 * The user which moved the task to the IN_PROGRESS state.
                 */
                in_progress_by?: /* The user id */ UserId;
                /**
                 * The user which moved the task to the COMPLETED state.
                 */
                completed_by?: /* The user id */ UserId;
                /**
                 * The user which moved the task to the SKIPPED state.
                 */
                skipped_by?: /* The user id */ UserId;
            };
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
             * Taxonomy ids that are associated with this workflow and used for filtering
             */
            taxonomies?: string[];
            phase_id?: string;
            task_type: TaskType;
        }
        export type TaskId = string;
        export type TaskType = "MANUAL" | "AUTOMATION" | "DECISION";
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
            status?: StepStatus;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            name?: string;
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
            status?: StepStatus;
            created?: string;
            lastUpdated?: string;
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
         *           "status": "ASSIGNED",
         *           "assignedTo": [
         *             "11"
         *           ]
         *         },
         *         {
         *           "id": "sada5641f3a22",
         *           "name": "Check product availability",
         *           "status": "UNASSIGNED"
         *         },
         *         {
         *           "id": "sada5641f3a23",
         *           "name": "Send email confirming contact with the client",
         *           "status": "SKIPPED"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1",
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
             * Version of the workflow execution
             */
            version?: number;
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
             * Version of the workflow execution
             */
            version?: number;
        }
        /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
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
         *       "name": "Initial Information Gathering",
         *       "steps": [
         *         {
         *           "id": "sada5641f3a21"
         *         },
         *         {
         *           "id": "sada5641f3a22"
         *         },
         *         {
         *           "id": "sada5641f3a23"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1"
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
             * Version of the workflow execution
             */
            version?: number;
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
            duedate?: string;
            last_update_time?: string;
            progress?: number;
            task_id?: string;
            task_name?: string;
            task_assignees?: string[];
            task_duedate?: string;
            task_execution_type?: StepType;
            task_status?: StepStatus;
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
declare namespace Paths {
    namespace CreateExecution {
        export type RequestBody = /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
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
             *           "status": "ASSIGNED",
             *           "assignedTo": [
             *             "11"
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecution;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $401 = Components.Schemas.ErrorResp;
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
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $500 = Components.Schemas.ErrorResp;
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
             *           "status": "ASSIGNED",
             *           "assignedTo": [
             *             "11"
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecution;
            export type $500 = Components.Schemas.ErrorResp;
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
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21"
             *         },
             *         {
             *           "id": "sada5641f3a22"
             *         },
             *         {
             *           "id": "sada5641f3a23"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1"
             *     }
             *   ]
             * }
             */
            Components.Schemas.WorkflowExecutionSlim[];
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace SearchExecutions {
        export type RequestBody = Components.Schemas.SearchExecutionsReq;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExecutionsResp;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace SearchFlowExecutions {
        export type RequestBody = Components.Schemas.SearchFlowsReq;
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.FlowExecution[];
            }
            export type $400 = Components.Schemas.ErrorResp;
            export interface $401 {
            }
            export interface $403 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace SearchSteps {
        export type RequestBody = Components.Schemas.SearchStepsReq;
        namespace Responses {
            export type $200 = Components.Schemas.SearchStepsResp;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace StartFlowExecution {
        export type RequestBody = Components.Schemas.StartFlowReq;
        namespace Responses {
            export type $201 = Components.Schemas.FlowExecution;
            export type $400 = Components.Schemas.ErrorResp;
            export interface $401 {
            }
            export interface $403 {
            }
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $500 = Components.Schemas.ErrorResp;
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
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
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
   * Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).
   */
  'createExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExecution.Responses.$201>
  /**
   * getExecution - getExecution
   * 
   * Get a full workflow execution, included steps information, by execution id.
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
   * Patches various changes to a workflow execution step.
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
   * Starts a new Flow Execution based on a flow template.
   */
  'startFlowExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartFlowExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartFlowExecution.Responses.$201>
  /**
   * getFlowExecution - getFlowExecution
   * 
   * Get a full flow execution, included tasks, phases, edges & analytics.
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
     * Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).
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
     * Get a full workflow execution, included steps information, by execution id.
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
     * Patches various changes to a workflow execution step.
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
     * Starts a new Flow Execution based on a flow template.
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
     * Get a full flow execution, included tasks, phases, edges & analytics.
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Assignees = Components.Schemas.Assignees;
export type AutomationConfig = Components.Schemas.AutomationConfig;
export type AutomationTask = Components.Schemas.AutomationTask;
export type ClosingReason = Components.Schemas.ClosingReason;
export type ClosingReasonResp = Components.Schemas.ClosingReasonResp;
export type Condition = Components.Schemas.Condition;
export type ConditionId = Components.Schemas.ConditionId;
export type CreateStepReq = Components.Schemas.CreateStepReq;
export type DecisionTask = Components.Schemas.DecisionTask;
export type DueDateConfig = Components.Schemas.DueDateConfig;
export type DynamicDueDate = Components.Schemas.DynamicDueDate;
export type ECPDetails = Components.Schemas.ECPDetails;
export type Edge = Components.Schemas.Edge;
export type EnableRequirement = Components.Schemas.EnableRequirement;
export type EntityRef = Components.Schemas.EntityRef;
export type ErrorResp = Components.Schemas.ErrorResp;
export type EvaluationSource = Components.Schemas.EvaluationSource;
export type ExecutionPaginationDynamo = Components.Schemas.ExecutionPaginationDynamo;
export type Flow = Components.Schemas.Flow;
export type FlowContext = Components.Schemas.FlowContext;
export type FlowExecution = Components.Schemas.FlowExecution;
export type FlowExecutionId = Components.Schemas.FlowExecutionId;
export type FlowSlim = Components.Schemas.FlowSlim;
export type FlowTemplateId = Components.Schemas.FlowTemplateId;
export type ItemType = Components.Schemas.ItemType;
export type LastEvaluatedKey = Components.Schemas.LastEvaluatedKey;
export type ManualTask = Components.Schemas.ManualTask;
export type Operator = Components.Schemas.Operator;
export type PatchFlowReq = Components.Schemas.PatchFlowReq;
export type Phase = Components.Schemas.Phase;
export type PhaseInEntity = Components.Schemas.PhaseInEntity;
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
export type TriggerType = Components.Schemas.TriggerType;
export type UpdateEntityAttributes = Components.Schemas.UpdateEntityAttributes;
export type UpdateStepReq = Components.Schemas.UpdateStepReq;
export type UpdateStepResp = Components.Schemas.UpdateStepResp;
export type UserId = Components.Schemas.UserId;
export type WorkflowContext = Components.Schemas.WorkflowContext;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
export type WorkflowExecutionBase = Components.Schemas.WorkflowExecutionBase;
export type WorkflowExecutionCreateReq = Components.Schemas.WorkflowExecutionCreateReq;
export type WorkflowExecutionSlim = Components.Schemas.WorkflowExecutionSlim;
export type WorkflowExecutionUpdateReq = Components.Schemas.WorkflowExecutionUpdateReq;
export type WorkflowInEntity = Components.Schemas.WorkflowInEntity;
export type WorkflowStatus = Components.Schemas.WorkflowStatus;
