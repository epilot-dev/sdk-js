import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequestResponse = /* Standard error response body */ Schemas.ErrorResponse;
        export type ForbiddenResponse = /* Standard error response body */ Schemas.ErrorResponse;
        export type InternalServerErrorResponse = /* Standard error response body */ Schemas.ErrorResponse;
        export type NotFoundResponse = /* Standard error response body */ Schemas.ErrorResponse;
        export type UnauthorizedResponse = /* Standard error response body */ Schemas.ErrorResponse;
    }
    namespace Schemas {
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
        export type AutomationExecutionDataset = "automation_executions_overview" | "list_automation_definitions";
        export interface AutomationExecutionResponse {
            /**
             * Total number of execution records found
             * example:
             * 100
             */
            hits?: number;
            /**
             * List of automation execution records
             */
            results?: {
                /**
                 * Unique identifier for the automation flow
                 * example:
                 * 1234567890
                 */
                flow_id: string;
                /**
                 * Name of the automation flow
                 * example:
                 * flow_name
                 */
                flow_name?: string;
                /**
                 * Unique identifier for the execution instance
                 * example:
                 * execution_id
                 */
                execution_id: string;
                /**
                 * Current status of the execution
                 * example:
                 * execution_status
                 */
                execution_status: string;
                /**
                 * Entity schema associated with the flow
                 * example:
                 * opportunity
                 */
                entity_schema?: string;
                /**
                 * Identifier of the entity associated with the execution
                 * example:
                 * entity_id
                 */
                entity_id?: string;
                /**
                 * Timestamp when the execution was created
                 * example:
                 * execution_created_at
                 */
                created_at: string;
                /**
                 * Timestamp when the execution was last updated
                 * example:
                 * execution_updated_at
                 */
                updated_at?: string;
                /**
                 * Error details if execution failed
                 */
                error?: {
                    /**
                     * Error message
                     * example:
                     * error_message
                     */
                    message?: string;
                    /**
                     * Error code
                     * example:
                     * error_code
                     */
                    error_code?: string;
                };
                /**
                 * Event that triggered the automation
                 */
                trigger_event?: {
                    [name: string]: any;
                    /**
                     * Type of the trigger event
                     * example:
                     * EntityOperation
                     */
                    type?: string;
                    /**
                     * Type of operation trigger
                     * example:
                     * createEntity
                     */
                    trigger_type?: string;
                };
            }[];
        }
        export interface AutomationQueryOptions {
            [name: string]: any;
            dataset: AutomationExecutionDataset;
        }
        /**
         * Cache Expiration timestamp
         * example:
         * 1663308898789
         */
        export type CacheExpiration = string; // timestamp
        /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "current_entities",
         *   "config": {
         *     "schema": "some_schema",
         *     "include_purpose_view": true,
         *     "include_label_view": true,
         *     "include_relation_view": true,
         *     "relationship_attribute": [
         *       "some_relationship_attribute"
         *     ]
         *   }
         * }
         */
        export interface CurrentEntitiesViewRequest {
            view_name?: string;
            source_dataset: "current_entities";
            config: {
                schema: string;
                include_purpose_view?: boolean;
                include_label_view?: boolean;
                include_relation_view?: boolean;
                relationship_attribute?: string[];
            };
        }
        export type DatalakeQuery = DatalakeQueryOptions;
        export interface DatalakeQueryOptions {
            [name: string]: any;
            /**
             * example:
             * entity_operations
             */
            dataset?: string;
            /**
             * example:
             * count_operations
             */
            measure?: string;
            dimensions?: {
                [name: string]: any;
            }[];
            filters?: {
                [name: string]: any;
            }[];
            /**
             * example:
             * true
             */
            exclude_deleted?: boolean;
        }
        export interface Dataset {
            dataset?: /**
             * example:
             * entity_operations
             */
            DatasetName;
            domain?: DatasetDomain;
            /**
             * example:
             * /v2/query/entities
             */
            endpoint?: string;
        }
        export type DatasetDomain = "entities" | "workflows";
        /**
         * example:
         * entity_operations
         */
        export type DatasetName = string & (/**
         * example:
         * entity_operations
         */
        EntityDataset | WorkflowDataset);
        export interface DatasetOptionsAutomationExecutionsOverview {
            [name: string]: any;
            dataset: AutomationExecutionDataset;
            /**
             * Automation Flow IDs
             * Filter by specific automation executions passing a list of automation flow ids.
             */
            flow_ids?: string[];
            /**
             * Automation Execution State
             * Filter by the states of the automation executions. Use "scheduled" to filter executions that have scheduled actions. Multiple states are combined with OR logic.
             *
             * example:
             * [
             *   "success",
             *   "failed",
             *   "scheduled"
             * ]
             */
            execution_states?: string[];
            relative_time_range?: RelativeTimeRange;
            /**
             * Start date in YYYY-MM-DD format
             */
            time_range_from?: string;
            /**
             * End date in YYYY-MM-DD format
             */
            time_range_to?: string;
        }
        /**
         * Dataset Options: Cancellation Reasons
         * See the cancellation reasons of workflows in a pie chart.
         */
        export interface DatasetOptionsCancellationReasons {
            workflow_definition_ids?: /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            WorkflowsQueryOptionsWorkflowDefinitionIDs;
            entity_schema?: /**
             * Entity Schema
             * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
             * You can choose to limit your results to workflow executions to specific entity schemas / types.
             *
             * example:
             * Opportunity
             */
            WorkflowsQueryOptionsEntitySchema;
            relative_time_range?: /**
             * Relative Time Range
             * A combination of two worde that describe a time range, e.g. "this year" or "last month"
             * example:
             * this year
             */
            WorkflowsQueryOptionsRelativeTimeRange;
            time_range_from?: /**
             * Time Range From
             * Set a specific start of a time range, e.g. "2023-01-01"
             * example:
             * 2023-01-01
             */
            WorkflowsQueryOptionsTimeRangeFrom;
            time_range_to?: /**
             * Time Range To
             * Set a specific end of a time range, e.g. "2023-06-30"
             * example:
             * 2023-06-01
             */
            WorkflowsQueryOptionsTimeRangeTo;
        }
        /**
         * Dataset Options: Cumulative Sum of Workflows
         */
        export interface DatasetOptionsCumulativeSumOfWorkflows {
            workflow_definition_ids?: /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            WorkflowsQueryOptionsWorkflowDefinitionIDs;
            entity_schema?: /**
             * Entity Schema
             * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
             * You can choose to limit your results to workflow executions to specific entity schemas / types.
             *
             * example:
             * Opportunity
             */
            WorkflowsQueryOptionsEntitySchema;
            relative_time_range?: /**
             * Relative Time Range
             * A combination of two worde that describe a time range, e.g. "this year" or "last month"
             * example:
             * this year
             */
            WorkflowsQueryOptionsRelativeTimeRange;
            time_range_from?: /**
             * Time Range From
             * Set a specific start of a time range, e.g. "2023-01-01"
             * example:
             * 2023-01-01
             */
            WorkflowsQueryOptionsTimeRangeFrom;
            time_range_to?: /**
             * Time Range To
             * Set a specific end of a time range, e.g. "2023-06-30"
             * example:
             * 2023-06-01
             */
            WorkflowsQueryOptionsTimeRangeTo;
            workflow_states?: /**
             * Workflow States
             * Filter by the states of the workflow executions.
             */
            WorkflowsQueryOptionsWorkflowStates;
            group_time_by?: /**
             * Group Time By
             * If chosen a time series, this parameter sets by which time the data is grouped, e.g. quarterly, monthly or weekly.  Available values: "D","W","M","Q","Y"
             */
            WorkflowsQueryOptionsGroupTimeBy;
        }
        export interface DatasetOptionsListAutomationDefinitions {
            [name: string]: any;
            dataset: AutomationExecutionDataset;
            /**
             * Search term to filter automation definitions
             */
            search?: string;
        }
        /**
         * Dataset Options: Total Count of Workflow Executions
         * See the total of workflow executions in a pie chart.
         */
        export interface DatasetOptionsTotalCountOfWorkflowExecutions {
            workflow_definition_ids?: /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            WorkflowsQueryOptionsWorkflowDefinitionIDs;
            entity_schema?: /**
             * Entity Schema
             * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
             * You can choose to limit your results to workflow executions to specific entity schemas / types.
             *
             * example:
             * Opportunity
             */
            WorkflowsQueryOptionsEntitySchema;
            relative_time_range?: /**
             * Relative Time Range
             * A combination of two worde that describe a time range, e.g. "this year" or "last month"
             * example:
             * this year
             */
            WorkflowsQueryOptionsRelativeTimeRange;
            time_range_from?: /**
             * Time Range From
             * Set a specific start of a time range, e.g. "2023-01-01"
             * example:
             * 2023-01-01
             */
            WorkflowsQueryOptionsTimeRangeFrom;
            time_range_to?: /**
             * Time Range To
             * Set a specific end of a time range, e.g. "2023-06-30"
             * example:
             * 2023-06-01
             */
            WorkflowsQueryOptionsTimeRangeTo;
        }
        /**
         * Dataset Options: Workflow Execution Time Series
         */
        export interface DatasetOptionsWorkflowExecutionTimeSeries {
            workflow_definition_ids?: /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            WorkflowsQueryOptionsWorkflowDefinitionIDs;
            entity_schema?: /**
             * Entity Schema
             * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
             * You can choose to limit your results to workflow executions to specific entity schemas / types.
             *
             * example:
             * Opportunity
             */
            WorkflowsQueryOptionsEntitySchema;
            relative_time_range?: /**
             * Relative Time Range
             * A combination of two worde that describe a time range, e.g. "this year" or "last month"
             * example:
             * this year
             */
            WorkflowsQueryOptionsRelativeTimeRange;
            time_range_from?: /**
             * Time Range From
             * Set a specific start of a time range, e.g. "2023-01-01"
             * example:
             * 2023-01-01
             */
            WorkflowsQueryOptionsTimeRangeFrom;
            time_range_to?: /**
             * Time Range To
             * Set a specific end of a time range, e.g. "2023-06-30"
             * example:
             * 2023-06-01
             */
            WorkflowsQueryOptionsTimeRangeTo;
            workflow_states?: /**
             * Workflow States
             * Filter by the states of the workflow executions.
             */
            WorkflowsQueryOptionsWorkflowStates;
            group_time_by?: /**
             * Group Time By
             * If chosen a time series, this parameter sets by which time the data is grouped, e.g. quarterly, monthly or weekly.  Available values: "D","W","M","Q","Y"
             */
            WorkflowsQueryOptionsGroupTimeBy;
        }
        /**
         * Dataset Options: Workflow Tasks Overview
         * Get a list of tasks to help organize executing users their day.
         */
        export interface DatasetOptionsWorkflowTasksOverview {
            dataset: WorkflowDataset;
            workflow_definition_ids?: /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            WorkflowsQueryOptionsWorkflowDefinitionIDs;
            entity_schema?: /**
             * Entity Schema
             * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
             * You can choose to limit your results to workflow executions to specific entity schemas / types.
             *
             * example:
             * Opportunity
             */
            WorkflowsQueryOptionsEntitySchema;
            relative_time_range?: /**
             * Relative Time Range
             * A combination of two worde that describe a time range, e.g. "this year" or "last month"
             * example:
             * this year
             */
            WorkflowsQueryOptionsRelativeTimeRange;
            time_range_from?: /**
             * Time Range From
             * Set a specific start of a time range, e.g. "2023-01-01"
             * example:
             * 2023-01-01
             */
            WorkflowsQueryOptionsTimeRangeFrom;
            time_range_to?: /**
             * Time Range To
             * Set a specific end of a time range, e.g. "2023-06-30"
             * example:
             * 2023-06-01
             */
            WorkflowsQueryOptionsTimeRangeTo;
            /**
             * Assignee ID
             *
             */
            assignee_ids?: string[];
            /**
             * Include Unassigned
             */
            include_unassigned?: boolean;
            /**
             * Due Date From
             * If chosen a time series, specify the start date in the format YYYY-MM-DD, e.g. 2023-01-01.
             */
            due_date_from?: string;
            /**
             * Due Date To
             * If chosen a time series, specify the end date in the format YYYY-MM-DD, e.g. 2023-03-31.
             */
            due_date_to?: string;
            /**
             * Sort By
             */
            sort_by?: string & (/* Sort By */ SortBy);
            /**
             * Page Number
             * Pagination page number
             */
            page_number?: number;
            /**
             * Page Size
             * Number of tasks per page
             */
            page_size?: number;
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
        }
        export type EntityDataset = "entity_operations" | "entities_timemachine" | "datalake_raw_sql";
        /**
         * Standard error response body
         */
        export interface ErrorResponse {
            /**
             * HTTP status code
             * example:
             * 400
             */
            status?: number;
            /**
             * Short error label
             * example:
             * Bad Request
             */
            error?: string;
            /**
             * Human-readable description of the error
             * example:
             * Invalid query parameters provided
             */
            message?: string;
        }
        /**
         * example:
         * {
         *   "hits": 100,
         *   "results": [
         *     {
         *       "flow_id": "flow_123",
         *       "flow_name": "Email Notification Flow",
         *       "entity_schema": "opportunity"
         *     },
         *     {
         *       "flow_id": "flow_456",
         *       "flow_name": "SMS Alert Flow",
         *       "entity_schema": "customer"
         *     }
         *   ]
         * }
         */
        export interface ListAutomationDefinitionsResponse {
            /**
             * Total number of automation definitions found
             * example:
             * 100
             */
            hits?: number;
            /**
             * List of automation definitions
             */
            results?: {
                /**
                 * Unique identifier for the automation flow
                 * example:
                 * flow_123
                 */
                flow_id: string;
                /**
                 * Name of the automation flow
                 * example:
                 * Email Notification Flow
                 */
                flow_name: string;
                /**
                 * Entity schema associated with the flow
                 * example:
                 * opportunity
                 */
                entity_schema?: string;
            }[];
        }
        export interface NameDurationSettings {
            dataset?: "name_duration";
            from?: string; // date-time
            to?: string; // date-time
            workflow_name?: string;
        }
        /**
         * example:
         * false
         */
        export type NoCache = boolean;
        export type PhaseStates = "OPEN" | "COMPLETED" | "IN_PROGRESS";
        export interface QueryResults {
            /**
             * example:
             * FINISHED
             */
            status?: string;
            /**
             * example:
             * 1715621496068
             */
            timestamp?: string;
            results?: {
                [name: string]: any;
            }[];
        }
        /**
         * example:
         * {
         *   "relationship_name": "some_relationship",
         *   "from_table": "some_table",
         *   "to_table": "some_table",
         *   "from_column": "some_column",
         *   "to_column": "some_column",
         *   "type": "one_to_many"
         * }
         */
        export interface RelationshipRequest {
            /**
             * Unique identifier for the relationship
             */
            relationship_name: string;
            /**
             * Source table name
             */
            from_table: string;
            /**
             * Target table name
             */
            to_table: string;
            /**
             * Source column name
             */
            from_column: string;
            /**
             * Target column name
             */
            to_column: string;
            type: "one_to_many" | "many_to_many" | "many_to_one" | "one_to_one";
        }
        /**
         * example:
         * {
         *   "relationship_name": "some_relationship",
         *   "from_table": "some_table",
         *   "to_table": "some_table",
         *   "from_column": "some_column",
         *   "to_column": "some_column",
         *   "type": "one_to_many"
         * }
         */
        export interface RelationshipResponse {
            relationship_name?: string;
            from_table?: string;
            to_table?: string;
            from_column?: string;
            to_column?: string;
            type?: "one_to_many" | "many_to_many" | "many_to_one" | "one_to_one";
        }
        /**
         * example:
         * {
         *   "relationships": [
         *     {
         *       "relationship_name": "some_relationship",
         *       "from_table": "some_table",
         *       "to_table": "some_table",
         *       "from_column": "some_column",
         *       "to_column": "some_column",
         *       "type": "one_to_many"
         *     },
         *     {
         *       "relationship_name": "another_relationship",
         *       "from_table": "table_a",
         *       "to_table": "table_b",
         *       "from_column": "column_a",
         *       "to_column": "column_b",
         *       "type": "many_to_many"
         *     }
         *   ]
         * }
         */
        export interface RelationshipsListResponse {
            relationships?: /**
             * example:
             * {
             *   "relationship_name": "some_relationship",
             *   "from_table": "some_table",
             *   "to_table": "some_table",
             *   "from_column": "some_column",
             *   "to_column": "some_column",
             *   "type": "one_to_many"
             * }
             */
            RelationshipResponse[];
        }
        export type RelativeTimeRange = "all_time" | "this_week" | "last_week" | "last_7_days" | "this_month" | "last_month" | "last_30_days" | "last_3_months" | "last_6_months" | "this_year" | "last_year";
        export interface ResponseWorkflowTaskOverview {
            results?: Task[];
            hits?: number;
        }
        /**
         * The semantic model exposing entities, relationships, and query capabilities
         */
        export interface SemanticModel {
            /**
             * Available entity tables that can be queried
             */
            entities?: {
                /**
                 * Table identifier used in queries
                 * example:
                 * current_contacts
                 */
                name?: string;
                /**
                 * Human-readable name
                 * example:
                 * Contacts
                 */
                displayName?: string;
                /**
                 * Schema type (entity, workflow, purpose)
                 * example:
                 * entity
                 */
                schema?: string;
            }[];
            /**
             * Relationships between entities for JOIN operations
             */
            relationships?: {
                /**
                 * example:
                 * current_contacts
                 */
                from?: string;
                /**
                 * example:
                 * opportunity_account_contact_relation
                 */
                to?: string;
                relationship?: "hasMany" | "belongsTo" | "hasOne";
                /**
                 * example:
                 * Contact has many Opportunities
                 */
                displayName?: string;
            }[];
            /**
             * Supported query capabilities
             */
            capabilities?: {
                /**
                 * example:
                 * [
                 *   "count",
                 *   "count_distinct",
                 *   "sum",
                 *   "average",
                 *   "min",
                 *   "max",
                 *   "median"
                 * ]
                 */
                aggregations?: string[];
                calculationTypes?: {
                    type?: string;
                    description?: string;
                    parameters?: {
                        [name: string]: string;
                    };
                }[];
                /**
                 * example:
                 * [
                 *   "day",
                 *   "week",
                 *   "month",
                 *   "quarter",
                 *   "year"
                 * ]
                 */
                granularities?: string[];
                filterOperators?: {
                    operator?: string;
                    description?: string;
                }[];
            };
        }
        export type SortBy = "due_date_ascending" | "due_date_descending" | "creation_date_ascending" | "creation_date_descending";
        export interface Task {
            orgId?: string;
            id?: string;
            definitionId?: string;
            phaseId?: string;
            entityRefId?: string;
            name?: string;
            type?: TaskType;
            ecp?: /* Details regarding ECP for the workflow step */ ECPDetails;
            requirements?: /* describe the requirement for step enablement */ TaskRequirement[];
            /**
             * Manual / Automation step
             */
            executionType?: TaskType;
            executionId?: string;
            assignedTo?: string[];
            /**
             * The user which moved the step/task to the IN_PROGRESS state. The user should also be present in the assignedTo property of the step/task
             */
            assignedToInProgress?: string;
            status?: TaskStatus;
            executionStatus?: WorkflowStatus;
            created?: string;
            lastUpdated?: string;
            dueDate?: string;
            dynamicDueDate?: /* set a Duedate for a step then a specific */ DynamicDueDate;
            manuallyCreated?: boolean;
            /**
             * enabled flag results from calculating the requirements
             */
            enabled?: boolean;
            /**
             * Configuration for automated steps
             */
            automationConfig?: /* Configuration for automation execution to run */ AutomationConfig;
            executionName?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
        }
        /**
         * describe the requirement for step enablement
         */
        export interface TaskRequirement {
            definitionId?: string;
            type?: "STEP";
            condition?: "CLOSED";
        }
        export type TaskStates = "OPEN" | "COMPLETED" | "IN_PROGRESS";
        export type TaskStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS";
        export type TaskType = "MANUAL" | "AUTOMATION";
        /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "taxonomies"
         * }
         */
        export interface TaxonomiesViewRequest {
            view_name?: string;
            source_dataset: "taxonomies";
        }
        export type TimeGroups = "Y" | "Q" | "M" | "W" | "D";
        export interface TimeSeriesSettings {
            dataset?: "time_series";
            from?: string; // date-time
            to?: string; // date-time
            time_grouper?: string;
            workflow_names?: string[];
        }
        /**
         * Execution Id for the query
         */
        export type UserId = string;
        export type ViewRequest = /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "current_entities",
         *   "config": {
         *     "schema": "some_schema",
         *     "include_purpose_view": true,
         *     "include_label_view": true,
         *     "include_relation_view": true,
         *     "relationship_attribute": [
         *       "some_relationship_attribute"
         *     ]
         *   }
         * }
         */
        CurrentEntitiesViewRequest | /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "taxonomies"
         * }
         */
        TaxonomiesViewRequest | /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "workflow_executions"
         * }
         */
        WorkflowExecutionsViewRequest;
        /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "current_entities",
         *   "attributes": [
         *     {
         *       "name": "some_attribute",
         *       "type": "string",
         *       "description": "some description"
         *     }
         *   ]
         * }
         */
        export interface ViewResponse {
            view_name: string;
            source_dataset: "current_entities" | "taxonomies" | "workflow_executions";
            attributes: {
                /**
                 * Name of the attribute
                 */
                name: string;
                /**
                 * Data type of the attribute
                 */
                type: string;
                /**
                 * Description of the attribute
                 */
                description?: string;
            }[];
        }
        /**
         * example:
         * {
         *   "views": [
         *     {
         *       "view_name": "some_view",
         *       "source_dataset": "current_entities",
         *       "view_slug": "some_view",
         *       "attributes": [
         *         {
         *           "name": "some_attribute",
         *           "type": "string",
         *           "description": "some description"
         *         }
         *       ]
         *     },
         *     {
         *       "view_name": "another_view",
         *       "source_dataset": "taxonomies",
         *       "view_slug": "another_view",
         *       "attributes": [
         *         {
         *           "name": "taxonomy_attribute",
         *           "type": "string",
         *           "description": "taxonomy attribute description"
         *         }
         *       ]
         *     }
         *   ]
         * }
         */
        export interface ViewsListResponse {
            views?: {
                view_name: string;
                source_dataset: "current_entities" | "taxonomies" | "workflow_executions";
                view_slug?: string;
                attributes: {
                    /**
                     * Name of the attribute
                     */
                    name: string;
                    /**
                     * Data type of the attribute
                     */
                    type: string;
                    /**
                     * Description of the attribute
                     */
                    description?: string;
                }[];
            }[];
        }
        export interface WorkflowContext {
            id: string;
            title: string;
            schema: string;
        }
        export type WorkflowDataset = "total_count_of_workflow_executions" | "workflow_execution_time_series" | "cumulative_sum_of_workflows" | "cancellation_reasons" | "phases_count" | "phases_duration" | "tasks_duration" | "task_duration" | "workflow_tasks_overview";
        /**
         * example:
         * {
         *   "view_name": "some_view",
         *   "source_dataset": "workflow_executions"
         * }
         */
        export interface WorkflowExecutionsViewRequest {
            view_name?: string;
            source_dataset: "workflow_executions";
        }
        export type WorkflowStates = "STARTED" | "CLOSED" | "DONE";
        export type WorkflowStatus = "STARTED" | "DONE" | "CLOSED";
        /**
         * Settings for the data of the chart that is being queried.
         */
        export interface WorkflowsQueryOptions {
            dataset?: WorkflowDataset;
            /**
             * Workflow Definition IDs
             * Filter by specific workflows by passing a list of workflow definition ids.
             */
            workflow_definition_ids?: string[];
            /**
             * Entity Schemas
             * Filter by entity schema
             */
            entity_schemas?: string[];
            /**
             * Workflow Definition IDs
             * Filter by the states of the executions, phases, or tasks.
             * examples:
             *   - ["STARTED"]
             *   - ["COMPLETED", "PARTIALLY_COMPLETED"]
             *
             */
            states?: string[];
            /**
             * Group Time By
             * If chosen a time series, this parameter sets by which time the data is grouped, e.g. quarterly, monthly or weekly.  Available values: "D","W","M","Q","Y"
             */
            group_time_by?: string;
            /**
             * Relative Time Range
             * If chosen a time series, this arg defines the time span, e.g.  show data of the current month. Either this param or "time_range_from" and "time_range_to" must be set.
             */
            relative_time_range?: string;
            /**
             * Time Range From
             * If chosen a time series, specify the start date in the format YYYY-MM-DD, e.g. 2023-01-01.
             */
            time_range_from?: string;
            /**
             * Time Range To
             * If chosen a time series, specify the end date in the format YYYY-MM-DD, e.g. 2023-03-31.
             */
            time_range_to?: string;
            /**
             * Duration Threshold
             * Certain datasets enable you to set a threshold of the duration. Example: We want to see total phase counts, phase counts less than threshold, phase counts more than threshold; threshold could be for example 45 days.
             */
            duration_threshold?: number;
        }
        /**
         * Entity Schema
         * Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
         * You can choose to limit your results to workflow executions to specific entity schemas / types.
         *
         * example:
         * Opportunity
         */
        export type WorkflowsQueryOptionsEntitySchema = string;
        /**
         * Group Time By
         * If chosen a time series, this parameter sets by which time the data is grouped, e.g. quarterly, monthly or weekly.  Available values: "D","W","M","Q","Y"
         */
        export type WorkflowsQueryOptionsGroupTimeBy = string;
        /**
         * Relative Time Range
         * A combination of two worde that describe a time range, e.g. "this year" or "last month"
         * example:
         * this year
         */
        export type WorkflowsQueryOptionsRelativeTimeRange = string;
        /**
         * Time Range From
         * Set a specific start of a time range, e.g. "2023-01-01"
         * example:
         * 2023-01-01
         */
        export type WorkflowsQueryOptionsTimeRangeFrom = string;
        /**
         * Time Range To
         * Set a specific end of a time range, e.g. "2023-06-30"
         * example:
         * 2023-06-01
         */
        export type WorkflowsQueryOptionsTimeRangeTo = string;
        /**
         * Workflow Definition IDs
         * Filter by specific workflows by passing a list of workflow definition ids.
         */
        export type WorkflowsQueryOptionsWorkflowDefinitionIDs = string[];
        /**
         * Workflow States
         * Filter by the states of the workflow executions.
         */
        export type WorkflowsQueryOptionsWorkflowStates = string[];
        /**
         * example:
         * {
         *   "data": [
         *     0,
         *     1
         *   ],
         *   "labels": [
         *     "label1",
         *     "label2"
         *   ],
         *   "timestamp": "1715621496068"
         * }
         */
        export interface WorkflowsQueryResult {
            [name: string]: any;
            data?: (string | number | {
                [name: string]: any;
            } | {
                [name: string]: any;
            }[])[] | {
                [name: string]: any;
            } | string | number;
            labels?: string[];
            timestamp?: string;
        }
    }
}
declare namespace Paths {
    namespace Autocomplete {
        namespace Parameters {
            /**
             * example:
             * current_purposes.name
             */
            export type Attribute = string;
            export type Dataset = "workflows" | "purposes" | "sharing_configs" | "partners";
            export type Input = string;
            export type Size = number;
        }
        export interface QueryParameters {
            dataset: Parameters.Dataset;
            input?: Parameters.Input;
            attribute: /**
             * example:
             * current_purposes.name
             */
            Parameters.Attribute;
            size?: Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   "value"
                 * ]
                 */
                results?: (string | boolean | {
                    [name: string]: any;
                })[];
            }
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace CreateOrUpdateRelationship {
        export type RequestBody = /**
         * example:
         * {
         *   "relationship_name": "some_relationship",
         *   "from_table": "some_table",
         *   "to_table": "some_table",
         *   "from_column": "some_column",
         *   "to_column": "some_column",
         *   "type": "one_to_many"
         * }
         */
        Components.Schemas.RelationshipRequest;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "relationship_name": "some_relationship",
             *   "from_table": "some_table",
             *   "to_table": "some_table",
             *   "from_column": "some_column",
             *   "to_column": "some_column",
             *   "type": "one_to_many"
             * }
             */
            Components.Schemas.RelationshipResponse;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace CreateOrUpdateView {
        export type RequestBody = Components.Schemas.ViewRequest;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "view_name": "some_view",
             *   "source_dataset": "current_entities",
             *   "attributes": [
             *     {
             *       "name": "some_attribute",
             *       "type": "string",
             *       "description": "some description"
             *     }
             *   ]
             * }
             */
            Components.Schemas.ViewResponse;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ExecuteAutomationQuery {
        namespace Parameters {
            export type From = number;
            export type Size = number;
        }
        export interface QueryParameters {
            from?: Parameters.From;
            size?: Parameters.Size;
        }
        export type RequestBody = Components.Schemas.DatasetOptionsAutomationExecutionsOverview | Components.Schemas.DatasetOptionsListAutomationDefinitions;
        namespace Responses {
            export type $200 = Components.Schemas.AutomationExecutionResponse | /**
             * example:
             * {
             *   "hits": 100,
             *   "results": [
             *     {
             *       "flow_id": "flow_123",
             *       "flow_name": "Email Notification Flow",
             *       "entity_schema": "opportunity"
             *     },
             *     {
             *       "flow_id": "flow_456",
             *       "flow_name": "SMS Alert Flow",
             *       "entity_schema": "customer"
             *     }
             *   ]
             * }
             */
            Components.Schemas.ListAutomationDefinitionsResponse;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ExecuteEntitiesQuery {
        namespace Parameters {
            export type CacheExpiration = /**
             * Cache Expiration timestamp
             * example:
             * 1663308898789
             */
            Components.Schemas.CacheExpiration /* timestamp */;
            export type NoCache = /**
             * example:
             * false
             */
            Components.Schemas.NoCache;
        }
        export interface QueryParameters {
            cache_expiration?: Parameters.CacheExpiration;
            no_cache?: Parameters.NoCache;
        }
        export interface RequestBody {
            query?: Components.Schemas.DatalakeQuery;
        }
        namespace Responses {
            export type $200 = Components.Schemas.QueryResults;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ExecuteQuery {
        namespace Parameters {
            export type CacheExpiration = /**
             * Cache Expiration timestamp
             * example:
             * 1663308898789
             */
            Components.Schemas.CacheExpiration /* timestamp */;
            export type NoCache = /**
             * example:
             * false
             */
            Components.Schemas.NoCache;
        }
        export interface QueryParameters {
            cache_expiration?: Parameters.CacheExpiration;
            no_cache?: Parameters.NoCache;
        }
        export interface RequestBody {
            query?: Components.Schemas.DatalakeQuery;
        }
        namespace Responses {
            export type $200 = Components.Schemas.QueryResults;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ExecuteQueryV2 {
        export interface RequestBody {
            [name: string]: any;
        }
        namespace Responses {
            export type $200 = Components.Schemas.QueryResults;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ExecuteWorkflowsQuery {
        namespace Parameters {
            export type CacheExpiration = /**
             * Cache Expiration timestamp
             * example:
             * 1663308898789
             */
            Components.Schemas.CacheExpiration /* timestamp */;
            export type Mock = boolean;
            export type NoCache = /**
             * example:
             * false
             */
            Components.Schemas.NoCache;
        }
        export interface QueryParameters {
            mock?: Parameters.Mock;
            cache_expiration?: Parameters.CacheExpiration;
            no_cache?: Parameters.NoCache;
        }
        export type RequestBody = /* Settings for the data of the chart that is being queried. */ Components.Schemas.WorkflowsQueryOptions | /**
         * Dataset Options: Total Count of Workflow Executions
         * See the total of workflow executions in a pie chart.
         */
        Components.Schemas.DatasetOptionsTotalCountOfWorkflowExecutions | /* Dataset Options: Workflow Execution Time Series */ Components.Schemas.DatasetOptionsWorkflowExecutionTimeSeries | /* Dataset Options: Cumulative Sum of Workflows */ Components.Schemas.DatasetOptionsCumulativeSumOfWorkflows | /**
         * Dataset Options: Cancellation Reasons
         * See the cancellation reasons of workflows in a pie chart.
         */
        Components.Schemas.DatasetOptionsCancellationReasons | /**
         * Dataset Options: Workflow Tasks Overview
         * Get a list of tasks to help organize executing users their day.
         */
        Components.Schemas.DatasetOptionsWorkflowTasksOverview;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "data": [
             *     0,
             *     1
             *   ],
             *   "labels": [
             *     "label1",
             *     "label2"
             *   ],
             *   "timestamp": "1715621496068"
             * }
             */
            Components.Schemas.WorkflowsQueryResult;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace GenerateCredentialsV2 {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * datalakeuser_sfsdfs_66
                 */
                username?: string;
                /**
                 * example:
                 * ***
                 */
                password?: string;
                endpoints?: {
                    /**
                     * example:
                     * qjjcxsy87t.eu-central-1.aws.clickhouse.cloud
                     */
                    host?: string;
                    /**
                     * example:
                     * 8443
                     */
                    port?: string;
                };
                /**
                 * example:
                 * datawarehouse
                 */
                database?: string;
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace GetAllRelationships {
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "relationships": [
             *     {
             *       "relationship_name": "some_relationship",
             *       "from_table": "some_table",
             *       "to_table": "some_table",
             *       "from_column": "some_column",
             *       "to_column": "some_column",
             *       "type": "one_to_many"
             *     },
             *     {
             *       "relationship_name": "another_relationship",
             *       "from_table": "table_a",
             *       "to_table": "table_b",
             *       "from_column": "column_a",
             *       "to_column": "column_b",
             *       "type": "many_to_many"
             *     }
             *   ]
             * }
             */
            Components.Schemas.RelationshipsListResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace GetAllViews {
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "views": [
             *     {
             *       "view_name": "some_view",
             *       "source_dataset": "current_entities",
             *       "view_slug": "some_view",
             *       "attributes": [
             *         {
             *           "name": "some_attribute",
             *           "type": "string",
             *           "description": "some description"
             *         }
             *       ]
             *     },
             *     {
             *       "view_name": "another_view",
             *       "source_dataset": "taxonomies",
             *       "view_slug": "another_view",
             *       "attributes": [
             *         {
             *           "name": "taxonomy_attribute",
             *           "type": "string",
             *           "description": "taxonomy attribute description"
             *         }
             *       ]
             *     }
             *   ]
             * }
             */
            Components.Schemas.ViewsListResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace GetSemanticModel {
        namespace Responses {
            export type $200 = /* The semantic model exposing entities, relationships, and query capabilities */ Components.Schemas.SemanticModel;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace GetView {
        namespace Parameters {
            export type ViewSlug = string;
        }
        export interface PathParameters {
            view_slug: Parameters.ViewSlug;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "view_name": "some_view",
             *   "source_dataset": "current_entities",
             *   "attributes": [
             *     {
             *       "name": "some_attribute",
             *       "type": "string",
             *       "description": "some description"
             *     }
             *   ]
             * }
             */
            Components.Schemas.ViewResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListAvailableDatasetsV2 {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   {
                 *     "domain": "entities",
                 *     "dataset": "entity_operations",
                 *     "endpoint": "/v2/query/domain/entities:execute"
                 *   },
                 *   {
                 *     "domain": "workflows",
                 *     "dataset": "workflow_execution_time_series",
                 *     "endpoint": "/v2/query/domain/workflows:execute"
                 *   },
                 *   {
                 *     "domain": "workflows",
                 *     "dataset": "phases_duration",
                 *     "endpoint": "/v2/query/domain/workflows:execute"
                 *   }
                 * ]
                 */
                results?: Components.Schemas.Dataset[];
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListCredentialsV2 {
        namespace Responses {
            export interface $200 {
                users?: {
                    user_id?: string;
                }[];
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListDatasets {
        namespace Responses {
            /**
             * example:
             * {
             *   "results": [
             *     {
             *       "dataset": "entity_operations"
             *     },
             *     {
             *       "dataset": "entities_timemachine"
             *     }
             *   ]
             * }
             */
            export interface $200 {
                results?: Components.Schemas.Dataset[];
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListPhaseNames {
        namespace Parameters {
            export type OrgId = string;
        }
        export interface QueryParameters {
            org_id?: Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                results?: {
                    /**
                     * example:
                     * y0UdVCOI
                     */
                    id: string;
                    /**
                     * example:
                     * PV Kauf
                     */
                    name: string;
                    /**
                     * example:
                     * 2023-05-31T00:00:00.000Z
                     */
                    max_date: string; // date-time
                    /**
                     * example:
                     * 2023-01-00T00:00:00.000Z
                     */
                    min_date: string; // date-time
                }[];
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListWorkflowDefinitions {
        namespace Parameters {
            export type Mock = boolean;
        }
        export interface QueryParameters {
            mock?: Parameters.Mock;
        }
        namespace Responses {
            export interface $200 {
                results?: {
                    /**
                     * example:
                     * y0UdVCOI
                     */
                    id: string;
                    /**
                     * example:
                     * PV Kauf
                     */
                    name: string;
                    /**
                     * example:
                     * 2023-05-31T00:00:00.000Z
                     */
                    max_date: string; // date-time
                    /**
                     * example:
                     * 2023-01-00T00:00:00.000Z
                     */
                    min_date: string; // date-time
                }[];
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace ListWorkflowPhasesByDefinitionId {
        namespace Parameters {
            export type WorkflowDefinitionId = string;
        }
        export interface PathParameters {
            workflowDefinitionId: Parameters.WorkflowDefinitionId;
        }
        namespace Responses {
            export type $200 = {
                /**
                 * The unique identifier of the workflow phase.
                 * example:
                 * y0UdVCOI
                 */
                id?: string;
                /**
                 * The name of the workflow phase.
                 * example:
                 * Initial Phase
                 */
                name?: string;
            }[];
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace RevokeCredentialsV2 {
        namespace Parameters {
            export type UserId = /* Execution Id for the query */ Components.Schemas.UserId;
        }
        export interface QueryParameters {
            user_id?: Parameters.UserId;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
            }
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
    namespace WorkflowsAutocomplete {
        namespace Parameters {
            /**
             * example:
             * name
             */
            export type Attribute = string;
            export type Input = string;
            export type Size = number;
        }
        export interface QueryParameters {
            input?: Parameters.Input;
            attribute: /**
             * example:
             * name
             */
            Parameters.Attribute;
            size?: Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   "value"
                 * ]
                 */
                results?: (string | boolean | {
                    [name: string]: any;
                })[];
            }
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * getAllViews - getAllViews
   * 
   * Retrieve all materialized data lake views configured for the organization.
   */
  'getAllViews'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllViews.Responses.$200>
  /**
   * createOrUpdateView - createOrUpdateView
   * 
   * Create or update a materialized SQL view in the epilot data lake.
   * 
   * Views expose epilot data (entities, taxonomies, workflow executions) as queryable tables that can be used by BI tools or queried directly. If a view with the same `view_name` already exists, it is updated.
   * 
   */
  'createOrUpdateView'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrUpdateView.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateOrUpdateView.Responses.$200>
  /**
   * getView - getView
   * 
   * Retrieve the definition and attributes of a specific data lake view by its slug.
   */
  'getView'(
    parameters?: Parameters<Paths.GetView.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetView.Responses.$200>
  /**
   * getAllRelationships - getAllRelationships
   * 
   * Retrieve all table relationships configured for the organization's data lake.
   */
  'getAllRelationships'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllRelationships.Responses.$200>
  /**
   * createOrUpdateRelationship - createOrUpdateRelationship
   * 
   * Define or update a relationship between two tables in the data lake.
   * 
   * Relationships enable JOIN operations in views and queries. If a relationship with the same `relationship_name` already exists, it is updated.
   * 
   */
  'createOrUpdateRelationship'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrUpdateRelationship.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateOrUpdateRelationship.Responses.$200>
  /**
   * listAvailableDatasetsV2 - listAvailableDatasetsV2
   * 
   * Lists all available datasets grouped by domain
   * 
   * Current domains are:
   *  - Entity
   *  - Workflow
   * 
   */
  'listAvailableDatasetsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAvailableDatasetsV2.Responses.$200>
  /**
   * executeEntitiesQuery - executeEntitiesQuery
   * 
   * Execute queries against entities datasets.
   * 
   * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
   * 
   * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
   * 
   * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
   * 
   */
  'executeEntitiesQuery'(
    parameters?: Parameters<Paths.ExecuteEntitiesQuery.QueryParameters> | null,
    data?: Paths.ExecuteEntitiesQuery.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteEntitiesQuery.Responses.$200>
  /**
   * executeWorkflowsQuery - executeWorkflowsQuery
   * 
   * Query Workflow Analytics Datasets.
   */
  'executeWorkflowsQuery'(
    parameters?: Parameters<Paths.ExecuteWorkflowsQuery.QueryParameters> | null,
    data?: Paths.ExecuteWorkflowsQuery.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteWorkflowsQuery.Responses.$200>
  /**
   * executeAutomationQuery - executeAutomationQuery
   * 
   * Query Automation Analytics Datasets.
   */
  'executeAutomationQuery'(
    parameters?: Parameters<Paths.ExecuteAutomationQuery.QueryParameters> | null,
    data?: Paths.ExecuteAutomationQuery.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteAutomationQuery.Responses.$200>
  /**
   * listWorkflowPhasesByDefinitionId - listWorkflowPhasesByDefinitionId
   * 
   * Retrieves the workflow phases associated with a given workflow definition ID.
   * 
   */
  'listWorkflowPhasesByDefinitionId'(
    parameters?: Parameters<Paths.ListWorkflowPhasesByDefinitionId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListWorkflowPhasesByDefinitionId.Responses.$200>
  /**
   * listWorkflowDefinitions - listWorkflowDefinitions
   * 
   * Lists available worflow definitions with their ids, names and start times
   * 
   */
  'listWorkflowDefinitions'(
    parameters?: Parameters<Paths.ListWorkflowDefinitions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListWorkflowDefinitions.Responses.$200>
  /**
   * listPhaseNames - listPhaseNames
   * 
   * Lists phase names of an org.
   * 
   */
  'listPhaseNames'(
    parameters?: Parameters<Paths.ListPhaseNames.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPhaseNames.Responses.$200>
  /**
   * listDatasets - listDatasets
   * 
   * Get list of available datasets
   */
  'listDatasets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDatasets.Responses.$200>
  /**
   * executeQuery - executeQuery
   * 
   * Execute queries against datasets.
   * 
   * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
   * 
   * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
   * 
   * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
   * 
   */
  'executeQuery'(
    parameters?: Parameters<Paths.ExecuteQuery.QueryParameters> | null,
    data?: Paths.ExecuteQuery.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteQuery.Responses.$200>
  /**
   * generateCredentialsV2 - generateCredentialsV2
   * 
   * Generate credentials for the epilot datalake for connecting other BI tools with ClickHouse
   * 
   */
  'generateCredentialsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateCredentialsV2.Responses.$200>
  /**
   * listCredentialsV2 - listCredentialsV2
   * 
   * List all the credentialof Clickhouse for the organization here
   */
  'listCredentialsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCredentialsV2.Responses.$200>
  /**
   * revokeCredentialsV2 - revokeCredentialsV2
   * 
   * Revoke credentials for the epilot datalake for connecting other BI tools with Clickhouse
   * 
   */
  'revokeCredentialsV2'(
    parameters?: Parameters<Paths.RevokeCredentialsV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeCredentialsV2.Responses.$200>
  /**
   * executeQueryV2 - executeQueryV2
   * 
   * Execute queries against datasets.
   * 
   * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
   * 
   * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
   * 
   * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
   * 
   */
  'executeQueryV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExecuteQueryV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteQueryV2.Responses.$200>
  /**
   * getSemanticModel - getSemanticModel
   * 
   * Get the semantic model for agent/tool consumption.
   * 
   * Returns available entities, their relationships, and supported query capabilities
   * including aggregations, calculation types, date granularities, and filter operators.
   * 
   */
  'getSemanticModel'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSemanticModel.Responses.$200>
  /**
   * autocomplete - autocomplete
   * 
   * Generic autocomplete endpoint for querying distinct values across datasets.
   * Use the dataset parameter to specify which data category to query.
   * 
   */
  'autocomplete'(
    parameters?: Parameters<Paths.Autocomplete.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Autocomplete.Responses.$200>
  /**
   * workflowsAutocomplete - workflowsAutocomplete
   * 
   * Autocomplete Workflows data
   * 
   */
  'workflowsAutocomplete'(
    parameters?: Parameters<Paths.WorkflowsAutocomplete.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WorkflowsAutocomplete.Responses.$200>
}

export interface PathsDictionary {
  ['/datalake/views']: {
    /**
     * createOrUpdateView - createOrUpdateView
     * 
     * Create or update a materialized SQL view in the epilot data lake.
     * 
     * Views expose epilot data (entities, taxonomies, workflow executions) as queryable tables that can be used by BI tools or queried directly. If a view with the same `view_name` already exists, it is updated.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrUpdateView.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateOrUpdateView.Responses.$200>
    /**
     * getAllViews - getAllViews
     * 
     * Retrieve all materialized data lake views configured for the organization.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllViews.Responses.$200>
  }
  ['/datalake/views/{view_slug}']: {
    /**
     * getView - getView
     * 
     * Retrieve the definition and attributes of a specific data lake view by its slug.
     */
    'get'(
      parameters?: Parameters<Paths.GetView.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetView.Responses.$200>
  }
  ['/datalake/relationships']: {
    /**
     * createOrUpdateRelationship - createOrUpdateRelationship
     * 
     * Define or update a relationship between two tables in the data lake.
     * 
     * Relationships enable JOIN operations in views and queries. If a relationship with the same `relationship_name` already exists, it is updated.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrUpdateRelationship.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateOrUpdateRelationship.Responses.$200>
    /**
     * getAllRelationships - getAllRelationships
     * 
     * Retrieve all table relationships configured for the organization's data lake.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllRelationships.Responses.$200>
  }
  ['/v2/query/datasets']: {
    /**
     * listAvailableDatasetsV2 - listAvailableDatasetsV2
     * 
     * Lists all available datasets grouped by domain
     * 
     * Current domains are:
     *  - Entity
     *  - Workflow
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAvailableDatasetsV2.Responses.$200>
  }
  ['/v2/query/domain/entities:execute']: {
    /**
     * executeEntitiesQuery - executeEntitiesQuery
     * 
     * Execute queries against entities datasets.
     * 
     * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
     * 
     * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
     * 
     * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteEntitiesQuery.QueryParameters> | null,
      data?: Paths.ExecuteEntitiesQuery.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteEntitiesQuery.Responses.$200>
  }
  ['/v2/query/domain/workflows:execute']: {
    /**
     * executeWorkflowsQuery - executeWorkflowsQuery
     * 
     * Query Workflow Analytics Datasets.
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteWorkflowsQuery.QueryParameters> | null,
      data?: Paths.ExecuteWorkflowsQuery.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteWorkflowsQuery.Responses.$200>
  }
  ['/v2/query/domain/automations:execute']: {
    /**
     * executeAutomationQuery - executeAutomationQuery
     * 
     * Query Automation Analytics Datasets.
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteAutomationQuery.QueryParameters> | null,
      data?: Paths.ExecuteAutomationQuery.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteAutomationQuery.Responses.$200>
  }
  ['/v2/query/domain/workflows/definitions/{workflowDefinitionId}/phases']: {
    /**
     * listWorkflowPhasesByDefinitionId - listWorkflowPhasesByDefinitionId
     * 
     * Retrieves the workflow phases associated with a given workflow definition ID.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkflowPhasesByDefinitionId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListWorkflowPhasesByDefinitionId.Responses.$200>
  }
  ['/v2/query/domain/workflows/definitions']: {
    /**
     * listWorkflowDefinitions - listWorkflowDefinitions
     * 
     * Lists available worflow definitions with their ids, names and start times
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListWorkflowDefinitions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListWorkflowDefinitions.Responses.$200>
  }
  ['/v2/query/domain/workflows/phases']: {
    /**
     * listPhaseNames - listPhaseNames
     * 
     * Lists phase names of an org.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListPhaseNames.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPhaseNames.Responses.$200>
  }
  ['/v1/query/datasets']: {
    /**
     * listDatasets - listDatasets
     * 
     * Get list of available datasets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDatasets.Responses.$200>
  }
  ['/v1/query:execute']: {
    /**
     * executeQuery - executeQuery
     * 
     * Execute queries against datasets.
     * 
     * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
     * 
     * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
     * 
     * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteQuery.QueryParameters> | null,
      data?: Paths.ExecuteQuery.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteQuery.Responses.$200>
  }
  ['/v2/query/credentials:generate']: {
    /**
     * generateCredentialsV2 - generateCredentialsV2
     * 
     * Generate credentials for the epilot datalake for connecting other BI tools with ClickHouse
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateCredentialsV2.Responses.$200>
  }
  ['/v2/query/credentials:list']: {
    /**
     * listCredentialsV2 - listCredentialsV2
     * 
     * List all the credentialof Clickhouse for the organization here
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCredentialsV2.Responses.$200>
  }
  ['/v2/query/credentials:revoke']: {
    /**
     * revokeCredentialsV2 - revokeCredentialsV2
     * 
     * Revoke credentials for the epilot datalake for connecting other BI tools with Clickhouse
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RevokeCredentialsV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeCredentialsV2.Responses.$200>
  }
  ['/v2/query:execute']: {
    /**
     * executeQueryV2 - executeQueryV2
     * 
     * Execute queries against datasets.
     * 
     * **Measures** are referred to as quantitative data, such as number of unique entities, operations, sum of profit, and so on.
     * 
     * **Dimensions** are referred to as categorical data, such as workflow status, product name, or units of time (e.g., day, week, month).
     * 
     * **Filters** are used to narrow down the dataset to be more specific e.g. only to a time range or specific entity schemas.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExecuteQueryV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteQueryV2.Responses.$200>
  }
  ['/v2/query/semantic-model']: {
    /**
     * getSemanticModel - getSemanticModel
     * 
     * Get the semantic model for agent/tool consumption.
     * 
     * Returns available entities, their relationships, and supported query capabilities
     * including aggregations, calculation types, date granularities, and filter operators.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSemanticModel.Responses.$200>
  }
  ['/v2/query/autocomplete']: {
    /**
     * autocomplete - autocomplete
     * 
     * Generic autocomplete endpoint for querying distinct values across datasets.
     * Use the dataset parameter to specify which data category to query.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.Autocomplete.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Autocomplete.Responses.$200>
  }
  ['/v2/query/workflows:autocomplete']: {
    /**
     * workflowsAutocomplete - workflowsAutocomplete
     * 
     * Autocomplete Workflows data
     * 
     */
    'get'(
      parameters?: Parameters<Paths.WorkflowsAutocomplete.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WorkflowsAutocomplete.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AutomationConfig = Components.Schemas.AutomationConfig;
export type AutomationExecutionDataset = Components.Schemas.AutomationExecutionDataset;
export type AutomationExecutionResponse = Components.Schemas.AutomationExecutionResponse;
export type AutomationQueryOptions = Components.Schemas.AutomationQueryOptions;
export type CacheExpiration = Components.Schemas.CacheExpiration;
export type CurrentEntitiesViewRequest = Components.Schemas.CurrentEntitiesViewRequest;
export type DatalakeQuery = Components.Schemas.DatalakeQuery;
export type DatalakeQueryOptions = Components.Schemas.DatalakeQueryOptions;
export type Dataset = Components.Schemas.Dataset;
export type DatasetDomain = Components.Schemas.DatasetDomain;
export type DatasetName = Components.Schemas.DatasetName;
export type DatasetOptions.AutomationExecutionsOverview = Components.Schemas.DatasetOptionsAutomationExecutionsOverview;
export type DatasetOptions.CancellationReasons = Components.Schemas.DatasetOptionsCancellationReasons;
export type DatasetOptions.CumulativeSumOfWorkflows = Components.Schemas.DatasetOptionsCumulativeSumOfWorkflows;
export type DatasetOptions.ListAutomationDefinitions = Components.Schemas.DatasetOptionsListAutomationDefinitions;
export type DatasetOptions.TotalCountOfWorkflowExecutions = Components.Schemas.DatasetOptionsTotalCountOfWorkflowExecutions;
export type DatasetOptions.WorkflowExecutionTimeSeries = Components.Schemas.DatasetOptionsWorkflowExecutionTimeSeries;
export type DatasetOptions.WorkflowTasksOverview = Components.Schemas.DatasetOptionsWorkflowTasksOverview;
export type DynamicDueDate = Components.Schemas.DynamicDueDate;
export type ECPDetails = Components.Schemas.ECPDetails;
export type EntityDataset = Components.Schemas.EntityDataset;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type ListAutomationDefinitionsResponse = Components.Schemas.ListAutomationDefinitionsResponse;
export type NameDurationSettings = Components.Schemas.NameDurationSettings;
export type NoCache = Components.Schemas.NoCache;
export type PhaseStates = Components.Schemas.PhaseStates;
export type QueryResults = Components.Schemas.QueryResults;
export type RelationshipRequest = Components.Schemas.RelationshipRequest;
export type RelationshipResponse = Components.Schemas.RelationshipResponse;
export type RelationshipsListResponse = Components.Schemas.RelationshipsListResponse;
export type RelativeTimeRange = Components.Schemas.RelativeTimeRange;
export type Response.WorkflowTaskOverview = Components.Schemas.ResponseWorkflowTaskOverview;
export type SemanticModel = Components.Schemas.SemanticModel;
export type SortBy = Components.Schemas.SortBy;
export type Task = Components.Schemas.Task;
export type TaskRequirement = Components.Schemas.TaskRequirement;
export type TaskStates = Components.Schemas.TaskStates;
export type TaskStatus = Components.Schemas.TaskStatus;
export type TaskType = Components.Schemas.TaskType;
export type TaxonomiesViewRequest = Components.Schemas.TaxonomiesViewRequest;
export type TimeGroups = Components.Schemas.TimeGroups;
export type TimeSeriesSettings = Components.Schemas.TimeSeriesSettings;
export type UserId = Components.Schemas.UserId;
export type ViewRequest = Components.Schemas.ViewRequest;
export type ViewResponse = Components.Schemas.ViewResponse;
export type ViewsListResponse = Components.Schemas.ViewsListResponse;
export type WorkflowContext = Components.Schemas.WorkflowContext;
export type WorkflowDataset = Components.Schemas.WorkflowDataset;
export type WorkflowExecutionsViewRequest = Components.Schemas.WorkflowExecutionsViewRequest;
export type WorkflowStates = Components.Schemas.WorkflowStates;
export type WorkflowStatus = Components.Schemas.WorkflowStatus;
export type WorkflowsQueryOptions = Components.Schemas.WorkflowsQueryOptions;
export type WorkflowsQueryOptions.EntitySchema = Components.Schemas.WorkflowsQueryOptionsEntitySchema;
export type WorkflowsQueryOptions.GroupTimeBy = Components.Schemas.WorkflowsQueryOptionsGroupTimeBy;
export type WorkflowsQueryOptions.RelativeTimeRange = Components.Schemas.WorkflowsQueryOptionsRelativeTimeRange;
export type WorkflowsQueryOptions.TimeRangeFrom = Components.Schemas.WorkflowsQueryOptionsTimeRangeFrom;
export type WorkflowsQueryOptions.TimeRangeTo = Components.Schemas.WorkflowsQueryOptionsTimeRangeTo;
export type WorkflowsQueryOptions.WorkflowDefinitionIDs = Components.Schemas.WorkflowsQueryOptionsWorkflowDefinitionIDs;
export type WorkflowsQueryOptions.WorkflowStates = Components.Schemas.WorkflowsQueryOptionsWorkflowStates;
export type WorkflowsQueryResult = Components.Schemas.WorkflowsQueryResult;
