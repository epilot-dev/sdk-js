/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        /**
         * example:
         * {
         *   "status": 403,
         *   "error": "Forbidden"
         * }
         */
        export interface ForbiddenError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             */
            error?: string;
        }
        /**
         * example:
         * {
         *   "status": 404,
         *   "error": "Not Found"
         * }
         */
        export interface NotFoundError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             */
            error?: string;
        }
    }
    namespace Schemas {
        export interface ActionCondition {
            id?: string;
            /**
             * Schedule Id which indicates the schedule of the actions inside the condition
             */
            schedule_id?: string;
            /**
             * Result of the condition evaluation
             */
            evaluationResult?: boolean;
            statements?: /**
             * example:
             * {
             *   "source": {
             *     "origin": "trigger",
             *     "originType": "entity",
             *     "id": "trigger-id",
             *     "schema": "contact",
             *     "attribute": "email",
             *     "attributeType": "text"
             *   },
             *   "operation": "equals",
             *   "values": [
             *     "hello@epilot.cloud"
             *   ]
             * }
             */
            ConditionStatement[];
        }
        export interface ActionSchedule {
            /**
             * Schedule Id
             */
            id: string;
            /**
             * The id of the configured scheduler which will be added on automation triggered
             */
            scheduleApiId?: string;
            numberOfUnits?: number;
            timePeriod?: "minutes" | "hours" | "days" | "weeks" | "months";
            timeRelation?: "after" | "before";
            source: /* The source of the schedule_at timestamp that will be used to schedule the action */ ActionScheduleSource;
        }
        /**
         * The source of the schedule_at timestamp that will be used to schedule the action
         */
        export interface ActionScheduleSource {
            /**
             * The id of the action or trigger
             */
            id: string;
            origin: "trigger" | "action" | "action_task" | "automation";
            schema?: string;
            attribute?: string;
        }
        /**
         * example:
         * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
         */
        export type ActivityId = string;
        export interface ActivityTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "activity";
            configuration: {
                /**
                 * example:
                 * submission
                 */
                schema?: string;
                types?: (("CreateMeterReading" | "UpdateMeterReading" | "DocDownloadedFromPortal" | "PortalUserResetPassword" | "PortalUserResetForgotPassword" | "SelfAssignmentFromPortal") | string)[];
            };
        }
        export type AnyAction = MapEntityAction | TriggerWorkflowAction | TriggerShareEntityAction | TriggerWebhookAction | InformERPAction | CreateDocumentAction | SendEmailAction | /* Creates an order entity with prices from journey */ CartCheckoutAction | CustomAction | AutomationAction | FlowExecutionCancelAction;
        export type AnyActionConfig = /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Map Entity",
         *   "type": "map-entity",
         *   "config": {
         *     "target_schema": "contact",
         *     "target_unique": [
         *       "email.0.email"
         *     ],
         *     "relation_attributes": [
         *       {
         *         "target": "company",
         *         "mode": "append",
         *         "source_filter": {
         *           "schema": "account",
         *           "limit": 1
         *         }
         *       }
         *     ],
         *     "mapping_attributes": [
         *       {
         *         "target": "_tags",
         *         "operation": {
         *           "_append": [
         *             "primary",
         *             "payer"
         *           ],
         *           "_uniq": true
         *         }
         *       },
         *       {
         *         "target": "email",
         *         "operation": {
         *           "_append": [
         *             {
         *               "email": {
         *                 "_copy": "billing_contact.email"
         *               }
         *             }
         *           ]
         *         }
         *       },
         *       {
         *         "target": "first_name",
         *         "operation": {
         *           "_copy": "billing_contact.first_name"
         *         }
         *       },
         *       {
         *         "target": "last_name",
         *         "operation": {
         *           "_copy": "billing_contact.last_name"
         *         }
         *       },
         *       {
         *         "target": "contact_type",
         *         "operation": {
         *           "_set": "customer"
         *         }
         *       },
         *       {
         *         "target": "address",
         *         "operation": {
         *           "_append": [
         *             {
         *               "_tags": [
         *                 "billing",
         *                 "primary"
         *               ],
         *               "street_name": {
         *                 "_copy": "billing_contact.street_name"
         *               },
         *               "street_number": {
         *                 "_copy": "billing_contact.street_number"
         *               },
         *               "city": {
         *                 "_copy": "billing_contact.city"
         *               },
         *               "postal_code": {
         *                 "_copy": "billing_contact.postal_code"
         *               },
         *               "country": {
         *                 "_copy": "billing_contact.country"
         *               }
         *             },
         *             {
         *               "_tags": [
         *                 "delivery"
         *               ],
         *               "street_name": {
         *                 "_copy": "delivery_contact.street_name"
         *               },
         *               "street_number": {
         *                 "_copy": "delivery_contact.street_number"
         *               },
         *               "city": {
         *                 "_copy": "delivery_contact.city"
         *               },
         *               "postal_code": {
         *                 "_copy": "delivery_contact.postal_code"
         *               },
         *               "country": {
         *                 "_copy": "delivery_contact.country"
         *               }
         *             }
         *           ],
         *           "_uniq": [
         *             "street_name",
         *             "street_number",
         *             "postal_code",
         *             "country"
         *           ]
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        MapEntityActionConfig | /**
         * example:
         * {
         *   "id": "08g988-ojt2jtaga-292h-8978gsaga",
         *   "name": "Trigger Workflow",
         *   "type": "trigger-workflow",
         *   "config": {
         *     "target_workflow": "mfptvUMH",
         *     "conditions": [
         *       {
         *         "schema": "ivy-opportunity",
         *         "source": "customer.type",
         *         "comparison": "equals",
         *         "value": "PRIVATE"
         *       }
         *     ],
         *     "assign_steps": [
         *       {
         *         "step_name": "Lead Sales",
         *         "user_ids": [
         *           10010729
         *         ]
         *       },
         *       {
         *         "step_name": "Operations",
         *         "user_ids": [
         *           10010728,
         *           10010729
         *         ]
         *       }
         *     ]
         *   }
         * }
         */
        TriggerWorkflowActionConfig | TriggerShareEntityActionConfig | /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Trigger Webhook",
         *   "type": "trigger-webhook",
         *   "config": {
         *     "entity_sources": [
         *       "contact",
         *       "account"
         *     ],
         *     "target_webhook_id": "25jg9ag2ga"
         *   }
         * }
         */
        TriggerWebhookActionConfig | /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Inform ERP",
         *   "type": "inform-erp",
         *   "config": {
         *     "entity_sources": [
         *       "contact",
         *       "account"
         *     ],
         *     "target_webhook_id": "25jg9ag2ga"
         *   }
         * }
         */
        InformERPActionConfig | /**
         * example:
         * {
         *   "id": "08g988-ojt2jtaga-292h-8978gsaga",
         *   "name": "Create Document",
         *   "type": "create-document",
         *   "config": {
         *     "template_id": {
         *       "type": "string",
         *       "example": "112b08ba-789c-42f2-9940-43b302f641e8\""
         *     },
         *     "filename": {
         *       "type": "string",
         *       "example": "newsletter.pdf\""
         *     }
         *   }
         * }
         */
        CreateDocumentActionConfig | /**
         * example:
         * {
         *   "id": "25jga0-gkasl26-0asg-908sgaj2",
         *   "name": "Send Email",
         *   "type": "send-email",
         *   "config": {
         *     "email_template_id": "gasj02-29ug9asgm-29t9gsaghg2g-pkmbhx2",
         *     "language_code": "de"
         *   }
         * }
         */
        SendEmailActionConfig | /* Creates an order entity with prices from journey */ CartCheckoutActionConfig | CustomAction | AutomationActionConfig | /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Cancel Flow Execution",
         *   "type": "cancel-flow-execution",
         *   "config": {
         *     "selected_reasons": [
         *       {
         *         "id": "_6kITMwkv_0Uo4i7fO7Ja",
         *         "title": "when you are done! that's when you close it."
         *       },
         *       {
         *         "id": "qgK9sGbKoS7NxlAbNReVn",
         *         "title": "Client didn't want our services"
         *       }
         *     ],
         *     "extra_description": "Test cancellation"
         *   }
         * }
         */
        FlowExecutionCancelActionConfig;
        export type AnyTrigger = FrontendSubmitTrigger | JourneySubmitTrigger | ApiSubmissionTrigger | /**
         * - If provides filter_config, executes an automation based on the filtered configuration when an entity event occurs.
         * - The conditions on a filter follows the event bridge patterns - `https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html`
         *   | Comparison             | Example                                             | Rule syntax                                              |
         *   |------------------------|-----------------------------------------------------|----------------------------------------------------------|
         *   | Null                   | first_name is null                                  | `"first_name": [ null ]`                                 |
         *   | Empty                  | last_name is empty                                  | `"last_name": [""]`                                      |
         *   | Equals                 | email is "j.doe@email.com"                          | `"email": [ "j.doe@email.com" ]`                         |
         *   | Equals (ignore case)   | first_name is "John"                                | `"first_name": [ { "equals-ignore-case": "john" } ]`     |
         *   | And                    | fist_name is "John" and last_name is "Doe"          | `"first_name": [ "John" ], "last_name": ["Doe"]`         |
         *   | Or                     | PaymentType is "Invoice" or "SEPA"                  | `"PaymentType": [ "invoice", "sepa"]`                    |
         *   | Or (multiple fields)   | first_name is "John", or last_name is "Doe".        | `"$or": [ { "first_name": [ "John" ] }, { "last_name": [ "Doe" ] } ]` |
         *   | Not                    | status is anything but "cancelled"                  | `"status": [ { "anything-but": [ "cancelled" ] } ]`      |
         *   | Numeric (equals)       | Price is 100                                        | `"Price": [ { "numeric": [ "=", 100 ] } ]`               |
         *   | Numeric (range)        | Price is more than 10, and less than or equal to 20 | `"Price": [ { "numeric": [ ">", 10, "<=", 20 ] } ]`      |
         *   | Exists                 | ProductName exists                                  | `"ProductName": [ { "exists": true } ]`                  |
         *   | Does not exist         | ProductName does not exist                          | `"ProductName": [ { "exists": false } ]`                 |
         *   | Begins with            | OpportunityNumber starts with OPP-                  | `"opportunity_number": [ { "prefix": "OPP-" } ]`         |
         *   | Ends with              | FileName ends with a .png extension                 | `"filename": [ { "suffix": ".png" } ]`                   |
         *   | Wildcard               | search a string using a wildcard                    | `"email": [ { "wildcard": "*@doe.com" } ]`               |
         *   - To run the execution on all update events
         *     ```
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"]
         *           }
         *         }
         *       }
         *     ```
         *   - To run the execution only when the updates are from a portal user
         *     ```
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"]
         *           },
         *           "activity": {
         *             "type": "EntityUpdatedFromPortal"
         *           }
         *         }
         *       }
         *     ```
         *   - To run the execution only when there is an update on a specific attribute
         *     ```
         *       Only starts the automation when the email on a contact is changed
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"],
         *             "payload": {
         *               "_schema": ["contact"]
         *             },
         *             "diff": {
         *               "updated": {
         *                 "email": [{ "exists": true }]
         *               }
         *             }
         *           }
         *         }
         *       }
         *     ```
         *     - To run the execution only when a specific attribute is altered(created/updated/deleted)
         *       ```
         *         Only starts the automation when a price is altered on a contract
         *         {
         *           "type": "filter_entity_event",
         *           "configuration": {
         *             "operation": {
         *               "payload": {
         *                 "_schema": ["contract"]
         *               },
         *               "diff": {
         *                 // Whether he first_name has been added, updated, or removed
         *                 $or: [
         *                   {
         *                     'added.first_name': [{ exists: true }]
         *                   },
         *                   {
         *                     'updated.first_name': [{ exists: true }]
         *                   },
         *                   {
         *                     'deleted.first_name': [{ exists: true }]
         *                   }
         *                 ]
         *               }
         *             }
         *           }
         *         }
         *       ```
         *     - To run the execution if an attribute is changed from one state to another
         *       ```
         *         Only starts the automation when the order status changes from `open_for_acceptance` to `placed`
         *         {
         *           "type": "filter_entity_event",
         *           "configuration": {
         *             "operation": {
         *               "operation": ["updateEntity"],
         *               "payload": {
         *                 "_schema": ["order"],
         *                 "status": ["placed"]
         *               },
         *               "diff": {
         *                 "updated": {
         *                   "status": ["open_for_acceptance"]
         *                 }
         *               }
         *             }
         *           }
         *         }
         *       ```
         *
         */
        EntityOperationTrigger | ActivityTrigger | EntityManualTrigger | ReceivedEmailTrigger | FlowsTrigger;
        export interface AnythingButCondition {
            "anything-but"?: string[];
        }
        export interface ApiCallerContext {
            [name: string]: any;
            EpilotAuth?: {
                /**
                 * example:
                 * {
                 *   "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
                 *   "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
                 *   "custom:ivy_org_id": "739224",
                 *   "cognito:username": "n.ahmad@epilot.cloud",
                 *   "custom:ivy_user_id": "10006129",
                 *   "aud": "6e0jbdnger7nmoktaaflarue1l",
                 *   "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
                 *   "token_use": "id",
                 *   "auth_time": 1614333023,
                 *   "exp": 1614336623,
                 *   "iat": 1614333023,
                 *   "email": "n.ahmad@epilot.cloud"
                 * }
                 */
                claims?: {
                    /**
                     * example:
                     * 10006129
                     */
                    userId?: string;
                    /**
                     * example:
                     * 476e9b48-42f4-4234-a2b0-4668b34626ce
                     */
                    sub?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    email?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    "cognito:username"?: string;
                    /**
                     * example:
                     * 10006129
                     */
                    "custom:ivy_user_id"?: string;
                };
                /**
                 * example:
                 * 10006129
                 */
                userId?: string;
                /**
                 * example:
                 * 739224
                 */
                organizationId?: string;
                /**
                 * example:
                 * eyJraWQiOi...
                 */
                token?: string;
            };
        }
        export interface ApiSubmissionTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "api_submission";
            configuration: {
                source_id?: string;
            };
        }
        export interface AppendValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source?: string;
            /**
             * To be provided only when mapping json objects into a target attribute. Eg array of addresses.
             *
             */
            value_json: string;
            /**
             * Array of keys which should be used when checking for uniqueness. Eg: [country, city, postal_code]
             *
             */
            target_unique?: string[];
        }
        /**
         * example:
         * [
         *   {
         *     "step_id": "xyh9t2ha",
         *     "step_name": "Lead Sales",
         *     "user_ids": [
         *       10010729
         *     ]
         *   },
         *   {
         *     "step_id": "29jgasl",
         *     "step_name": "Operations",
         *     "user_ids": [
         *       10010728,
         *       10010729
         *     ]
         *   }
         * ]
         */
        export interface AssignUsersToStep {
            step_id?: string;
            step_name?: string;
            user_ids?: number[];
        }
        export interface AutomationAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: string;
            config?: {
                [name: string]: any;
            };
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        export interface AutomationActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: string;
            config?: {
                [name: string]: any;
            };
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface AutomationActionExecutionState {
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * 9ec3711b-db63-449c-b894-54d5bb622a8f
         */
        export type AutomationActionId = string;
        export interface AutomationExecution {
            id: /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            AutomationExecutionId;
            execution_status?: ExecutionStatus;
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            activity_id?: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            ActivityId;
            entity_snapshot?: EntityItemSnapshot;
            org_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            OrganizationId;
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            /**
             * example:
             * Handle contact form
             */
            flow_name?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            current_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            conditions?: ActionCondition[];
            schedules?: ActionSchedule[];
            actions: AnyAction[];
            resume_token?: /**
             * A unique token to resume a paused automation execution
             * example:
             * eyJraWQiOiJrZXkifQ==
             */
            ResumeToken;
            /**
             * Version of the flow
             * example:
             * 2
             */
            version?: number;
            trigger_event?: TriggerEventManual | TriggerEventEntityActivity | TriggerEventEntityOperation | TriggerEventFlowAutomationTask;
        }
        /**
         * example:
         * 9baf184f-bc81-4128-bca3-d974c90a12c4
         */
        export type AutomationExecutionId = string;
        export interface AutomationFlow {
            id?: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            /**
             * A descriptive name for the Automation
             * example:
             * Handle contact form
             */
            flow_name: string;
            /**
             * Whether the automation is enabled or not
             */
            enabled?: boolean;
            disable_details?: {
                /**
                 * When the flow was disabled
                 */
                disabled_at: string; // date-time
                /**
                 * Who disabled the flow (system or user)
                 */
                disabled_by: "system" | "user";
                /**
                 * The 360 user email that disabled the flow
                 */
                blame?: string;
            };
            triggers: AnyTrigger[];
            trigger_conditions?: /**
             * example:
             * {
             *   "source": "billing_contact.email",
             *   "comparison": "exists"
             * }
             */
            TriggerCondition[];
            /**
             * The triggering entity schema
             * example:
             * submission
             */
            entity_schema?: string;
            conditions?: ActionCondition[];
            schedules?: ActionSchedule[];
            /**
             * The actions (nodes) of the automation flow
             */
            actions: AnyAction[];
            /**
             * Number of automation executions that ran
             * example:
             * 7
             */
            runs?: number;
            /**
             * Customized execution hot flow rate limit. Takes precedence over the default hot flow rate limit if specified.
             */
            max_executions?: {
                /**
                 * Maximum number of executions per time window
                 * example:
                 * 100
                 */
                count?: number;
                /**
                 * ISO 8601 duration time window for the threshold
                 * example:
                 * PT1M
                 */
                window?: string;
            };
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * User / service who created automation flow
             * example:
             * user:123
             */
            created_by?: string;
            /**
             * User / service who last updated automation flow
             * example:
             * user:123
             */
            last_updated_by?: string;
            /**
             * Organization the automation flow belongs to
             * example:
             * 123
             */
            org_id?: string;
            /**
             * Determines if the flow is a system generated flow
             */
            system_flow?: boolean;
            /**
             * Version of the flow
             * example:
             * 2
             */
            version?: number;
            /**
             * Source blueprint/manifest ID used when automation is created via blueprints.
             */
            _manifest?: string /* uuid */[] | null;
        }
        /**
         * ID of the Automation Flow
         * example:
         * 7791b04a-16d2-44a2-9af9-2d59c25c512f
         */
        export type AutomationFlowId = string;
        export interface AutomationTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
        }
        export interface BulkTriggerJob {
            job_id: /**
             * Job ID for tracking the status of bulk trigger automation executions
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            JobId;
            org_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            OrganizationId;
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            /**
             * Status of the bulk trigger automation job
             * * approval: Waiting for user approval to start the bulk trigger automation
             * * querying_entities: Loading entities in batches
             * * entities_loaded: All entities have been loaded and stored
             * * executing: Automation execution are currently running
             * * monitoring: All executions have been started, now monitoring their completion
             * * send_report: Automation executions finished running. Report is being created & sent to the user who initiated the bulk trigger automation
             * * finished: Automation executions finished running. Some may have failed. Check the status of each entity.
             * * failed: Bulk trigger automation execution failed. Some executions might have started. Check the status of each entity.
             * * cancelled: Bulk trigger automation execution was cancelled
             *
             */
            status: "approval" | "querying_entities" | "entities_loaded" | "executing" | "monitoring" | "send_report" | "finished" | "failed" | "cancelled";
            /**
             * User ID who created the bulk trigger automation job
             * example:
             * 1234
             */
            created_by: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            /**
             * Time when the bulk trigger automation executions job was approved
             */
            approved_at?: string; // date-time
            /**
             * Task token to approve/cancel the bulk automation job
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            task_token?: string;
            /**
             * Entity ID of the report file entity
             */
            report_file_entity_id?: string;
            /**
             * Query configuration for loading entities
             */
            entity_query?: {
                type: "refs" | "query" | "filter";
                data: EntityRef[] | string | /**
                 * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
                 * example:
                 * [
                 *   {
                 *     "term": {
                 *       "_schema": "contact"
                 *     }
                 *   },
                 *   {
                 *     "terms": {
                 *       "status": [
                 *         "active"
                 *       ]
                 *     }
                 *   }
                 * ]
                 */
                EntitySearchFilter;
            };
            /**
             * Pagination state for entity loading
             */
            pagination_state?: {
                /**
                 * Number of entities per page
                 */
                page_size?: number;
                /**
                 * Number of pages processed so far
                 */
                pages_processed?: number;
                /**
                 * Total number of entities processed so far
                 */
                total_processed?: number;
                /**
                 * Stable query ID for pagination
                 */
                stable_query_id?: string;
                /**
                 * Last sort value used for pagination
                 */
                search_after?: (string | number)[];
                /**
                 * Whether there are more entities to load
                 */
                has_more?: boolean;
            };
            /**
             * List of entities & their automation execution id & status
             */
            execution_summary?: /* Execution item for bulk trigger automation. It maps each entity to its automation execution id & status */ ExecItem[];
        }
        export type BulkTriggerRequest = {
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            entities_refs: EntityRef[];
        } | {
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            entities_query: string;
        } | {
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            entities_filter: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            EntitySearchFilter;
        };
        /**
         * A reason for cancelling a flow execution
         */
        export interface CancellationReason {
            /**
             * Unique identifier for the cancellation reason
             * example:
             * _6kITMwkv_0Uo4i7fO7Ja
             */
            id: string;
            /**
             * Human-readable title for the cancellation reason
             * example:
             * Process completed successfully
             */
            title: string;
        }
        /**
         * Creates an order entity with prices from journey
         */
        export interface CartCheckoutAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "cart-checkout";
            config?: CartCheckoutConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * Creates an order entity with prices from journey
         */
        export interface CartCheckoutActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "cart-checkout";
            config?: CartCheckoutConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface CartCheckoutConfig {
            /**
             * Version of the config
             */
            version?: string;
            mapping_config?: MappingConfigRef;
            relation_attributes?: RelationAttribute[];
            mapping_attributes?: (/**
             * example:
             * {
             *   "target": "_tags",
             *   "operation": {
             *     "_append": [
             *       "new",
             *       "tags"
             *     ],
             *     "_uniq": true
             *   }
             * }
             */
            MappingAttributeV2 | MappingAttribute)[];
            /**
             * Relation attribute on the main entity where the target entity will be linked. Set to false to disable linkback
             *
             */
            linkback_relation_attribute?: string;
            /**
             * Relation tags (labels) to include in main entity linkback relation attribute
             */
            linkback_relation_tags?: string[];
            /**
             * Unique key for target entity (see upsertEntity of Entity API)
             */
            target_unique?: string[];
        }
        export type Comparison = "equals" | "any_of" | "not_empty" | "is_empty";
        /**
         * example:
         * {
         *   "source": {
         *     "origin": "trigger",
         *     "originType": "entity",
         *     "id": "trigger-id",
         *     "schema": "contact",
         *     "attribute": "email",
         *     "attributeType": "text"
         *   },
         *   "operation": "equals",
         *   "values": [
         *     "hello@epilot.cloud"
         *   ]
         * }
         */
        export interface ConditionStatement {
            /**
             * example:
             * 1c8d3d9c-6d4c-4a83-aa22-aa0d630cbc2d
             */
            id?: string; // uuid
            source?: {
                /**
                 * The id of the action or trigger
                 */
                id?: string;
                origin?: "trigger" | "action";
                originType?: "entity" | "workflow" | "journey_block";
                schema?: string;
                attribute?: string;
                attributeType?: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "product" | "price" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label";
                attributeRepeatable?: boolean;
                attributeOperation?: "all" | "updated" | "added" | "deleted";
            };
            operation?: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "greater_than_or_equals" | "less_than_or_equals" | "is_empty" | "is_not_empty";
            values?: string[];
        }
        export interface CopyValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source: string;
        }
        export interface CreateDocumentAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "create-document";
            config?: CreateDocumentConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "08g988-ojt2jtaga-292h-8978gsaga",
         *   "name": "Create Document",
         *   "type": "create-document",
         *   "config": {
         *     "template_id": {
         *       "type": "string",
         *       "example": "112b08ba-789c-42f2-9940-43b302f641e8\""
         *     },
         *     "filename": {
         *       "type": "string",
         *       "example": "newsletter.pdf\""
         *     }
         *   }
         * }
         */
        export interface CreateDocumentActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "create-document";
            config?: CreateDocumentConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface CreateDocumentConfig {
            template_id?: string;
            filename?: string;
        }
        export interface CustomAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "custom-action";
            config?: {
                [name: string]: any;
                /**
                 * The name of the custom action
                 * example:
                 * Credit Check
                 */
                name?: string;
                /**
                 * The description of the custom action
                 * example:
                 * Check if the customer has a credit limit
                 */
                description?: string;
                /**
                 * The ID of the app to fetch configuration from the app API
                 * example:
                 * c451c26a-cc7a-4c1c-92bf-1c6246cbfe88
                 */
                app_id?: string;
                /**
                 * The ID of the component from the app. As the app can potentially have multiple custom actions, this ID is used to identify the component
                 * example:
                 * 2f1c26a-cc7a-4c1c-92bf-1c6246cbfe88
                 */
                component_id?: string;
            };
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        export type DiffAdded = FilterConditionOnEvent;
        export type DiffDeleted = FilterConditionOnEvent;
        export type DiffUpdated = FilterConditionOnEvent;
        /**
         * example:
         * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
         */
        export type EntityId = string;
        export interface EntityItemSnapshot {
            [name: string]: any;
            _id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            _title: string;
            _org: string;
            _schema: string;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
        }
        export interface EntityManualTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "entity_manual";
            configuration: {
                /**
                 * Which entity type can this automation be triggered from
                 * example:
                 * submission
                 */
                schema?: string;
            };
        }
        export type EntityOperation = "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity";
        /**
         * - If provides filter_config, executes an automation based on the filtered configuration when an entity event occurs.
         * - The conditions on a filter follows the event bridge patterns - `https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html`
         *   | Comparison             | Example                                             | Rule syntax                                              |
         *   |------------------------|-----------------------------------------------------|----------------------------------------------------------|
         *   | Null                   | first_name is null                                  | `"first_name": [ null ]`                                 |
         *   | Empty                  | last_name is empty                                  | `"last_name": [""]`                                      |
         *   | Equals                 | email is "j.doe@email.com"                          | `"email": [ "j.doe@email.com" ]`                         |
         *   | Equals (ignore case)   | first_name is "John"                                | `"first_name": [ { "equals-ignore-case": "john" } ]`     |
         *   | And                    | fist_name is "John" and last_name is "Doe"          | `"first_name": [ "John" ], "last_name": ["Doe"]`         |
         *   | Or                     | PaymentType is "Invoice" or "SEPA"                  | `"PaymentType": [ "invoice", "sepa"]`                    |
         *   | Or (multiple fields)   | first_name is "John", or last_name is "Doe".        | `"$or": [ { "first_name": [ "John" ] }, { "last_name": [ "Doe" ] } ]` |
         *   | Not                    | status is anything but "cancelled"                  | `"status": [ { "anything-but": [ "cancelled" ] } ]`      |
         *   | Numeric (equals)       | Price is 100                                        | `"Price": [ { "numeric": [ "=", 100 ] } ]`               |
         *   | Numeric (range)        | Price is more than 10, and less than or equal to 20 | `"Price": [ { "numeric": [ ">", 10, "<=", 20 ] } ]`      |
         *   | Exists                 | ProductName exists                                  | `"ProductName": [ { "exists": true } ]`                  |
         *   | Does not exist         | ProductName does not exist                          | `"ProductName": [ { "exists": false } ]`                 |
         *   | Begins with            | OpportunityNumber starts with OPP-                  | `"opportunity_number": [ { "prefix": "OPP-" } ]`         |
         *   | Ends with              | FileName ends with a .png extension                 | `"filename": [ { "suffix": ".png" } ]`                   |
         *   | Wildcard               | search a string using a wildcard                    | `"email": [ { "wildcard": "*@doe.com" } ]`               |
         *   - To run the execution on all update events
         *     ```
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"]
         *           }
         *         }
         *       }
         *     ```
         *   - To run the execution only when the updates are from a portal user
         *     ```
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"]
         *           },
         *           "activity": {
         *             "type": "EntityUpdatedFromPortal"
         *           }
         *         }
         *       }
         *     ```
         *   - To run the execution only when there is an update on a specific attribute
         *     ```
         *       Only starts the automation when the email on a contact is changed
         *       {
         *         "type": "filter_entity_event",
         *         "configuration": {
         *           "operation": {
         *             "operation": ["updateEntity"],
         *             "payload": {
         *               "_schema": ["contact"]
         *             },
         *             "diff": {
         *               "updated": {
         *                 "email": [{ "exists": true }]
         *               }
         *             }
         *           }
         *         }
         *       }
         *     ```
         *     - To run the execution only when a specific attribute is altered(created/updated/deleted)
         *       ```
         *         Only starts the automation when a price is altered on a contract
         *         {
         *           "type": "filter_entity_event",
         *           "configuration": {
         *             "operation": {
         *               "payload": {
         *                 "_schema": ["contract"]
         *               },
         *               "diff": {
         *                 // Whether he first_name has been added, updated, or removed
         *                 $or: [
         *                   {
         *                     'added.first_name': [{ exists: true }]
         *                   },
         *                   {
         *                     'updated.first_name': [{ exists: true }]
         *                   },
         *                   {
         *                     'deleted.first_name': [{ exists: true }]
         *                   }
         *                 ]
         *               }
         *             }
         *           }
         *         }
         *       ```
         *     - To run the execution if an attribute is changed from one state to another
         *       ```
         *         Only starts the automation when the order status changes from `open_for_acceptance` to `placed`
         *         {
         *           "type": "filter_entity_event",
         *           "configuration": {
         *             "operation": {
         *               "operation": ["updateEntity"],
         *               "payload": {
         *                 "_schema": ["order"],
         *                 "status": ["placed"]
         *               },
         *               "diff": {
         *                 "updated": {
         *                   "status": ["open_for_acceptance"]
         *                 }
         *               }
         *             }
         *           }
         *         }
         *       ```
         *
         */
        export interface EntityOperationTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "entity_operation";
            configuration: {
                /**
                 * example:
                 * submission
                 */
                schema?: string;
                operations?: [
                    EntityOperation,
                    ...EntityOperation[]
                ];
                include_activities?: string[];
                exclude_activities?: string[];
                filter_config?: {
                    operation?: {
                        /**
                         * Filter on operation type. If not specified, all operations will be matched on execution.
                         * Example:
                         *   1. Filter all the createEntity/updateEntity operations
                         *   ```
                         *     {
                         *       "operation":{
                         *         "operation": ["createEntity", "updateEntity"]
                         *       }
                         *     }
                         *   ```
                         *
                         */
                        operation?: EntityOperation[];
                        payload?: FilterConditionOnEvent;
                        diff?: OrConditionForDiff | {
                            added?: DiffAdded;
                            updated?: DiffUpdated;
                            deleted?: DiffDeleted;
                        };
                    };
                    activity?: {
                        /**
                         * Filter on activity type. If not specified, all activities will be matched on execution.
                         * Example:
                         *   1. Filter the events when an entity is updated from portal
                         *     ```
                         *       {
                         *         "activity":{
                         *           "type": ["EntityUpdatedFromPortal"]
                         *         }
                         *       }
                         *     ```
                         *   2. Filter the events when either a doc is uploaded/removed on an entity from a portal
                         *     ```
                         *       {
                         *         "activity":{
                         *           "type": ["DocUploadedFromPortal", "DocRemovedFromPortal"]
                         *         }
                         *       }
                         *     ```
                         *
                         * example:
                         * [
                         *   "EntityUpdatedFromPortal",
                         *   "EntityUpdated",
                         *   "DocUploadedFromPortal"
                         * ]
                         */
                        type?: (string | EqualsIgnoreCaseCondition | AnythingButCondition | ExistsCondition | PrefixCondition | SuffixCondition | WildcardCondition)[];
                    };
                };
                ecp_config?: {
                    /**
                     * example:
                     * END_CUSTOMER_PORTAL
                     */
                    origin?: string;
                    file_config?: {
                        /**
                         * example:
                         * true
                         */
                        shared_with_end_customer?: boolean;
                    };
                };
            };
        }
        export interface EntityRef {
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            entity_schema: string;
        }
        /**
         * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
         * example:
         * [
         *   {
         *     "term": {
         *       "_schema": "contact"
         *     }
         *   },
         *   {
         *     "terms": {
         *       "status": [
         *         "active"
         *       ]
         *     }
         *   }
         * ]
         */
        export type EntitySearchFilter = {
            /**
             * Returns documents that contain an exact term in a provided field.
             *
             * To return a document, the query term must exactly match the queried field's value, including whitespace and capitalization.
             *
             * You likely DO NOT want to use this filter on text fields and want to target its .keyword instead.
             *
             * example:
             * {
             *   "_schema": "contact"
             * }
             */
            term?: {
                [name: string]: /* A filter field value. */ EntitySearchFilterValue;
            };
            /**
             * Returns documents that contain one of the exact terms in a provided field. See term filter for more info.
             * example:
             * {
             *   "status": [
             *     "active"
             *   ]
             * }
             */
            terms?: {
                [name: string]: /* A filter field value. */ EntitySearchFilterValue[];
            };
            /**
             * Returns documents based on their IDs.
             * example:
             * {
             *   "values": [
             *     "550e8400-e29b-41d4-a716-446655440000"
             *   ]
             * }
             */
            ids?: {
                values?: string[];
            };
            /**
             * Returns documents with fields that have terms within a certain range.
             * example:
             * {
             *   "_created_at": {
             *     "gte": "2021-01-01T00:00:00.000Z",
             *     "lte": "2021-01-31T23:59:59.999Z"
             *   }
             * }
             */
            range?: {
                [name: string]: {
                    gt?: /* A filter field value. */ EntitySearchFilterValue;
                    gte?: /* A filter field value. */ EntitySearchFilterValue;
                    lt?: /* A filter field value. */ EntitySearchFilterValue;
                    lte?: /* A filter field value. */ EntitySearchFilterValue;
                    /**
                     * The date format used to parse date values.
                     */
                    format?: string;
                    /**
                     * Indicates how the range query matches values for range fields.
                     */
                    relation?: "INTERSECTS" | "CONTAINS" | "WITHIN";
                    /**
                     * Coordinated Universal Time (UTC) offset or IANA time zone used to convert date values in the query to UTC.
                     */
                    time_zone?: string;
                };
            };
            /**
             * Returns documents that have a value in the specified field.
             * example:
             * {
             *   "field": "_tags"
             * }
             */
            exists?: {
                field: string;
            };
            $and?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            EntitySearchFilter;
            $or?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            EntitySearchFilter;
            $not?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            EntitySearchFilter;
        }[];
        /**
         * A filter field value.
         */
        export type EntitySearchFilterValue = /* A filter field value. */ (string | null) | number | boolean;
        export interface EqualsIgnoreCaseCondition {
            "equals-ignore-case"?: string;
        }
        export type ErrorCode = "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR" | "TRIGGER_WEBHOOK_ERROR" | "TEMPLATE_ERROR" | "INVALID_PAYLOAD" | "INVALID_SCHEDULE_CONFIG" | "CUSTOM_ACTION_ERROR" | "ORDER_CREATION_ERROR" | "DOCUMENT_GENERATION_ERROR" | "BULK_EMAIL_ERROR" | "SHARING_ERROR" | "CANCEL_FLOW_EXECUTION_ERROR";
        export interface ErrorDetail {
            explanation: string;
            context?: string;
            id?: string;
        }
        export interface ErrorObject {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             */
            error?: string;
        }
        export interface ErrorOutput {
            error_code: ErrorCode;
            error_reason: string;
            error_info?: {
                [name: string]: any;
                details?: ErrorDetail[];
            };
        }
        /**
         * Execution item for bulk trigger automation. It maps each entity to its automation execution id & status
         */
        export interface ExecItem {
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            entity_schema?: string;
            execution_id?: /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            AutomationExecutionId;
            execution_status: ExecutionStatus;
            /**
             * Error message for the failed automation execution
             */
            error?: string;
        }
        export type ExecutionStatus = "pending" | "starting" | "in_progress" | "paused" | "success" | "failed" | "cancelled" | "skipped" | "scheduled" | "hot";
        export interface ExistsCondition {
            exists?: boolean;
        }
        export type FilterConditionOnEvent = OrCondition | {
            [name: string]: (string | EqualsIgnoreCaseCondition | AnythingButCondition | NumericCondition | ExistsCondition | PrefixCondition | SuffixCondition | WildcardCondition)[];
        };
        export interface FlowExecutionCancelAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "cancel-flow-execution";
            config?: /* Configuration for cancelling a flow execution with selected reasons */ FlowExecutionCancelConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Cancel Flow Execution",
         *   "type": "cancel-flow-execution",
         *   "config": {
         *     "selected_reasons": [
         *       {
         *         "id": "_6kITMwkv_0Uo4i7fO7Ja",
         *         "title": "when you are done! that's when you close it."
         *       },
         *       {
         *         "id": "qgK9sGbKoS7NxlAbNReVn",
         *         "title": "Client didn't want our services"
         *       }
         *     ],
         *     "extra_description": "Test cancellation"
         *   }
         * }
         */
        export interface FlowExecutionCancelActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "cancel-flow-execution";
            config?: /* Configuration for cancelling a flow execution with selected reasons */ FlowExecutionCancelConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        /**
         * Configuration for cancelling a flow execution with selected reasons
         */
        export interface FlowExecutionCancelConfig {
            /**
             * List of reasons selected for this specific cancellation
             */
            selected_reasons?: /* A reason for cancelling a flow execution */ CancellationReason[];
            /**
             * Additional description or notes for the cancellation
             * example:
             * Process completed successfully
             */
            extra_description?: string;
        }
        export interface FlowsTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "flows_trigger";
            configuration: {
                source_id: string; // uuid
            };
        }
        export interface FrontendSubmitTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "frontend_submission";
            configuration: {
                /**
                 * example:
                 * 99
                 */
                source_id?: string;
            };
        }
        export interface GetExecutionsResp {
            total: number;
            results: AutomationExecution[];
        }
        export interface InformERPAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "inform-erp";
            config?: InformERPConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Inform ERP",
         *   "type": "inform-erp",
         *   "config": {
         *     "entity_sources": [
         *       "contact",
         *       "account"
         *     ],
         *     "target_webhook_id": "25jg9ag2ga"
         *   }
         * }
         */
        export interface InformERPActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "inform-erp";
            config?: InformERPConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface InformERPConfig {
            entity_sources?: string[];
            target_webhook_id?: string;
            /**
             * Whether to wait for the request to finish before continuing automation execution
             */
            sync?: boolean;
        }
        /**
         * Job ID for tracking the status of bulk trigger automation executions
         * example:
         * 8c086140-f33e-4bb7-a993-50c0f2402c7b
         */
        export type JobId = string;
        export interface JourneySubmitTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "journey_submission";
            configuration: {
                source_id: string; // uuid
            };
        }
        export interface MapEntityAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "map-entity";
            config?: MapEntityConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Map Entity",
         *   "type": "map-entity",
         *   "config": {
         *     "target_schema": "contact",
         *     "target_unique": [
         *       "email.0.email"
         *     ],
         *     "relation_attributes": [
         *       {
         *         "target": "company",
         *         "mode": "append",
         *         "source_filter": {
         *           "schema": "account",
         *           "limit": 1
         *         }
         *       }
         *     ],
         *     "mapping_attributes": [
         *       {
         *         "target": "_tags",
         *         "operation": {
         *           "_append": [
         *             "primary",
         *             "payer"
         *           ],
         *           "_uniq": true
         *         }
         *       },
         *       {
         *         "target": "email",
         *         "operation": {
         *           "_append": [
         *             {
         *               "email": {
         *                 "_copy": "billing_contact.email"
         *               }
         *             }
         *           ]
         *         }
         *       },
         *       {
         *         "target": "first_name",
         *         "operation": {
         *           "_copy": "billing_contact.first_name"
         *         }
         *       },
         *       {
         *         "target": "last_name",
         *         "operation": {
         *           "_copy": "billing_contact.last_name"
         *         }
         *       },
         *       {
         *         "target": "contact_type",
         *         "operation": {
         *           "_set": "customer"
         *         }
         *       },
         *       {
         *         "target": "address",
         *         "operation": {
         *           "_append": [
         *             {
         *               "_tags": [
         *                 "billing",
         *                 "primary"
         *               ],
         *               "street_name": {
         *                 "_copy": "billing_contact.street_name"
         *               },
         *               "street_number": {
         *                 "_copy": "billing_contact.street_number"
         *               },
         *               "city": {
         *                 "_copy": "billing_contact.city"
         *               },
         *               "postal_code": {
         *                 "_copy": "billing_contact.postal_code"
         *               },
         *               "country": {
         *                 "_copy": "billing_contact.country"
         *               }
         *             },
         *             {
         *               "_tags": [
         *                 "delivery"
         *               ],
         *               "street_name": {
         *                 "_copy": "delivery_contact.street_name"
         *               },
         *               "street_number": {
         *                 "_copy": "delivery_contact.street_number"
         *               },
         *               "city": {
         *                 "_copy": "delivery_contact.city"
         *               },
         *               "postal_code": {
         *                 "_copy": "delivery_contact.postal_code"
         *               },
         *               "country": {
         *                 "_copy": "delivery_contact.country"
         *               }
         *             }
         *           ],
         *           "_uniq": [
         *             "street_name",
         *             "street_number",
         *             "postal_code",
         *             "country"
         *           ]
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export interface MapEntityActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "map-entity";
            config?: MapEntityConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface MapEntityConfig {
            mapping_config?: MappingConfigRef;
            /**
             * Schema of target entity
             */
            target_schema: string;
            /**
             * Unique key for target entity (see upsertEntity of Entity API)
             */
            target_unique?: string[];
            /**
             * Attribute mappings
             */
            mapping_attributes?: (/**
             * example:
             * {
             *   "target": "_tags",
             *   "operation": {
             *     "_append": [
             *       "new",
             *       "tags"
             *     ],
             *     "_uniq": true
             *   }
             * }
             */
            MappingAttributeV2 | MappingAttribute)[];
            /**
             * Relation mappings
             */
            relation_attributes?: RelationAttribute[];
            /**
             * Relation attribute on the main entity where the target entity will be linked. Set to false to disable linkback
             *
             */
            linkback_relation_attribute?: string;
            /**
             * Relation tags (labels) to include in main entity linkback relation attribute
             */
            linkback_relation_tags?: string[];
        }
        export type MappingAttribute = SetValueMapper | CopyValueMapper | AppendValueMapper;
        /**
         * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
         *
         */
        export type MappingAttributeMode = "copy_if_exists" | "append_if_exists" | "set_value";
        /**
         * example:
         * {
         *   "target": "_tags",
         *   "operation": {
         *     "_append": [
         *       "new",
         *       "tags"
         *     ],
         *     "_uniq": true
         *   }
         * }
         */
        export interface MappingAttributeV2 {
            /**
             * Target JSON path for the attribute to set
             */
            target?: string;
            operation: /* Mapping operation nodes are either primitive values or operation node objects */ OperationNode;
        }
        export interface MappingConfigRef {
            /**
             * Id of Entity Mapping Configuration to run for mapping.
             */
            config_id: string;
            /**
             * Id of TargetConfig to run for mapping.
             */
            target_id: string;
            /**
             * Version of Entity Mapping Configuration to run for mapping.
             */
            version?: number;
        }
        export interface NumericCondition {
            numeric?: (string | number)[];
        }
        /**
         * Mapping operation nodes are either primitive values or operation node objects
         */
        export type OperationNode = /* Mapping operation nodes are either primitive values or operation node objects */ OperationObjectNode | PrimitiveJSONValue;
        export interface OperationObjectNode {
            [name: string]: any;
            _set?: PrimitiveJSONValue;
            /**
             * Append to array
             */
            _append?: any;
            /**
             * Unique array
             */
            _uniq?: /* Unique array */ boolean | string[];
            /**
             * Copy JSONPath value from source entity context
             * example:
             * contact.first_name
             */
            _copy?: string;
        }
        export interface OrCondition {
            $or?: FilterConditionOnEvent[];
        }
        export interface OrConditionForDiff {
            $or?: (DiffAdded | DiffUpdated | DiffDeleted)[];
        }
        /**
         * example:
         * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
         */
        export type OrganizationId = string;
        export interface PatchBulkJobRequest {
            action: "APPROVE" | "CANCEL";
            task_token: string;
        }
        export interface PrefixCondition {
            prefix?: string;
        }
        export type PrimitiveJSONValue = any;
        export interface ReceivedEmailTrigger {
            /**
             * example:
             * 12d4f45a-1883-4841-a94c-5928cb338a94
             */
            id?: string; // uuid
            type: "received_email";
            configuration: {
                message_type?: "RECEIVED";
            };
        }
        export interface RelationAttribute {
            /**
             * Target attribute to store the relation in
             */
            target: string;
            /**
             * Relation tags (labels) to set for the stored relations
             */
            target_tags?: string[];
            /**
             * Include all relation tags (labels) present on the main entity relation
             */
            target_tags_include_source?: boolean;
            /**
             * A filter to identify which source entities to pick as relations from main entity
             */
            source_filter?: {
                /**
                 * Limit relations to maximum number (default, all matched relations)
                 */
                limit?: number;
                /**
                 * Filter by specific schema
                 */
                schema?: string;
                /**
                 * Filter by a specific relation attribute on the main entity
                 */
                attribute?: string;
                /**
                 * Filter by relation tag (label) on the main entity
                 */
                relation_tag?: string;
                /**
                 * Filter by a specific tag on the related entity
                 */
                tag?: string;
                /**
                 * Picks main entity as relation (overrides other filters)
                 */
                self?: boolean;
            };
            related_to?: {
                [name: string]: any;
            };
            mode: "append" | "prepend" | "set";
        }
        export interface ResumeReq {
            resume_token: /**
             * A unique token to resume a paused automation execution
             * example:
             * eyJraWQiOiJrZXkifQ==
             */
            ResumeToken;
        }
        export interface ResumeResp {
            execution: AutomationExecution;
            resumedAction: AnyAction;
        }
        /**
         * A unique token to resume a paused automation execution
         * example:
         * eyJraWQiOiJrZXkifQ==
         */
        export type ResumeToken = string;
        export interface RetryReq {
            /**
             * The condition id to retry when retry strategy is RETRY_ALL_PARENT_CONDITION_ACTIONS
             */
            condition_id?: string;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * different behaviors for retrying failed execution actions.
         */
        export type RetryStrategy = "RETRY_AND_RESUME" | "RETRY_AND_STOP" | "RETRY_ALL_PARENT_CONDITION_ACTIONS";
        export interface SearchAutomationsResp {
            total: number;
            results: AutomationFlow[];
        }
        export interface SendEmailAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "send-email";
            config?: SendEmailConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "25jga0-gkasl26-0asg-908sgaj2",
         *   "name": "Send Email",
         *   "type": "send-email",
         *   "config": {
         *     "email_template_id": "gasj02-29ug9asgm-29t9gsaghg2g-pkmbhx2",
         *     "language_code": "de"
         *   }
         * }
         */
        export interface SendEmailActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "send-email";
            config?: SendEmailConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface SendEmailCondition {
            _equals?: {
                source?: string;
                value?: string;
            };
        }
        export interface SendEmailConfig {
            email_template_id?: string;
            language_code?: "de" | "en";
            /**
             * Send an email exclusively to the portal user if they are registered on the portal.
             */
            notify_portal_user_only?: boolean;
            /**
             * When true, it lets to send only the email by skip creating the thread & message entities.
             */
            skip_creating_entities?: boolean;
            /**
             * Pause automation execution after sending email to wait for a confirmation link to be clicked.
             *
             * The email template should contain a confirmation link using the variable `{{confirmation_url}}`
             *
             */
            wait_for_confirmation?: boolean;
            /**
             * Include extra file attachments in sent email.
             * Attachments in email template will be sent regardless of this configuration.
             *
             */
            attachments?: {
                /**
                 * Specify filters to match file entities related to main entity
                 */
                source_filter?: {
                    /**
                     * Limit files to maximum number (default, all matched file relations)
                     * example:
                     * 1
                     */
                    limit?: number;
                    /**
                     * Match by filename. Regex syntax supported
                     * example:
                     * .*
                     */
                    filename_regex?: string;
                    /**
                     * Filter by a specific relation attribute on the main entity
                     * example:
                     * _files
                     */
                    attribute?: string;
                    /**
                     * Filter by relation tag (label) on the main entity
                     * example:
                     * contract
                     */
                    relation_tag?: string;
                    /**
                     * Filter by a specific tag on the related file entity
                     */
                    tag?: string;
                    /**
                     * Filter by a specific document type (e.g. document)
                     */
                    document_type?: "document" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
                    /**
                     * Picks main entity as file (only works if source entity is a file)
                     */
                    self?: boolean;
                };
            }[];
            /**
             * Conditions necessary to send out email. Otherwise it will be skipped
             */
            conditions?: SendEmailCondition[];
        }
        export interface SetValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * Any value to be set: string, number, string[], number[], JSON object, etc. It will override existing values, if any.
             *
             */
            value: any;
        }
        export interface StartExecutionRequest {
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            flow_id: /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
            /**
             * ID of the Flow Execution
             */
            flow_execution_id?: string;
            /**
             * ID of the automated flow action
             */
            flow_automation_task_id?: string; // UUID
        }
        export interface SuffixCondition {
            suffix?: string;
        }
        /**
         * example:
         * {
         *   "source": "billing_contact.email",
         *   "comparison": "exists"
         * }
         */
        export interface TriggerCondition {
            source: string;
            comparison: Comparison;
            value?: string | number | string[] | number[];
        }
        export interface TriggerEventEntityActivity {
            type?: "entity_activity";
            /**
             * example:
             * 123
             */
            org_id: string;
            activity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            ActivityId;
            activity_type: string;
            entity_id?: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
        }
        export interface TriggerEventEntityOperation {
            type?: "entity_operation";
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            /**
             * example:
             * 123
             */
            org_id: string;
            activity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            ActivityId;
            operation_type: EntityOperation;
        }
        export interface TriggerEventFlowAutomationTask {
            type?: "flow_automation_task";
            /**
             * example:
             * 123
             */
            org_id: string;
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            /**
             * example:
             * wfwAJoT_cK
             */
            flow_execution_id: string;
            /**
             * example:
             * 2fa221ec-3aac-4655-ab8f-c062eca44a3
             */
            flow_automation_task_id: string; // UUID
            caller?: ApiCallerContext;
        }
        export interface TriggerEventManual {
            type?: "manual";
            /**
             * example:
             * 123
             */
            org_id: string;
            entity_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            caller?: ApiCallerContext;
        }
        export interface TriggerShareEntityAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-share-entity";
            config?: TriggerShareEntityConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        export interface TriggerShareEntityActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-workflow";
            config?: TriggerShareEntityConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface TriggerShareEntityConfig {
            partner_org_ids?: string[];
        }
        export interface TriggerWebhookAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-webhook";
            config?: TriggerWebhookConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "2520gja-2sgmsaga-0asg-822jgal",
         *   "name": "Trigger Webhook",
         *   "type": "trigger-webhook",
         *   "config": {
         *     "entity_sources": [
         *       "contact",
         *       "account"
         *     ],
         *     "target_webhook_id": "25jg9ag2ga"
         *   }
         * }
         */
        export interface TriggerWebhookActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-webhook";
            config?: TriggerWebhookConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        export interface TriggerWebhookConfig {
            entity_sources?: string[];
            target_webhook_id?: string;
            /**
             * Whether to wait for the request to finish before continuing automation execution
             */
            sync?: boolean;
        }
        export interface TriggerWorkflowAction {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-workflow";
            config?: TriggerWorkflowConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
            retry_strategy?: /* different behaviors for retrying failed execution actions. */ RetryStrategy;
        }
        /**
         * example:
         * {
         *   "id": "08g988-ojt2jtaga-292h-8978gsaga",
         *   "name": "Trigger Workflow",
         *   "type": "trigger-workflow",
         *   "config": {
         *     "target_workflow": "mfptvUMH",
         *     "conditions": [
         *       {
         *         "schema": "ivy-opportunity",
         *         "source": "customer.type",
         *         "comparison": "equals",
         *         "value": "PRIVATE"
         *       }
         *     ],
         *     "assign_steps": [
         *       {
         *         "step_name": "Lead Sales",
         *         "user_ids": [
         *           10010729
         *         ]
         *       },
         *       {
         *         "step_name": "Operations",
         *         "user_ids": [
         *           10010728,
         *           10010729
         *         ]
         *       }
         *     ]
         *   }
         * }
         */
        export interface TriggerWorkflowActionConfig {
            id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            flow_action_id?: /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            AutomationActionId;
            name?: string;
            type?: "trigger-workflow";
            config?: TriggerWorkflowConfig;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * Flag indicating whether the same action can be in bulk in a single execution. e.g; send-email / map-entity
             */
            is_bulk_action?: boolean;
            reason?: {
                /**
                 * Why the action has to be skipped/failed
                 * example:
                 * There are no registered portal users for the given emails, hence skipping the action
                 */
                message?: string;
                /**
                 * Extra metadata about the skipping reason - such as a certain condition not met, etc.
                 */
                payload?: {
                    [name: string]: any;
                };
            };
            /**
             * Condition Id to be checked before executing the action
             */
            condition_id?: string;
            /**
             * Schedule Id which indicates the schedule of the action
             */
            schedule_id?: string;
        }
        /**
         * example:
         * {
         *   "source": "email",
         *   "comparison": "equals",
         *   "schema": "contact",
         *   "value": "test@epilot.cloud"
         * }
         */
        export interface TriggerWorkflowCondition {
            source: string;
            comparison: Comparison;
            value?: string | number | string[] | number[];
            schema: string;
        }
        export interface TriggerWorkflowConfig {
            target_workflow?: string;
            conditions?: /**
             * example:
             * {
             *   "source": "email",
             *   "comparison": "equals",
             *   "schema": "contact",
             *   "value": "test@epilot.cloud"
             * }
             */
            TriggerWorkflowCondition[];
            assignees?: string[];
            assign_steps?: /**
             * example:
             * [
             *   {
             *     "step_id": "xyh9t2ha",
             *     "step_name": "Lead Sales",
             *     "user_ids": [
             *       10010729
             *     ]
             *   },
             *   {
             *     "step_id": "29jgasl",
             *     "step_name": "Operations",
             *     "user_ids": [
             *       10010728,
             *       10010729
             *     ]
             *   }
             * ]
             */
            AssignUsersToStep[];
            filter_with_purposes?: boolean;
        }
        export interface WildcardCondition {
            wildcard?: string;
        }
    }
}
declare namespace Paths {
    namespace BulkTriggerExecutions {
        export type RequestBody = Components.Schemas.BulkTriggerRequest;
        namespace Responses {
            export type $202 = Components.Schemas.BulkTriggerJob;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
        }
    }
    namespace CancelExecution {
        namespace Parameters {
            export type ExecutionId = /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            Components.Schemas.AutomationExecutionId;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AutomationExecution;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace CancelSchedule {
        namespace Parameters {
            export type ExecutionId = /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            Components.Schemas.AutomationExecutionId;
            export type ScheduleId = string;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            schedule_id: Parameters.ScheduleId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ActionSchedule;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace CreateFlow {
        export type RequestBody = Components.Schemas.AutomationFlow;
        namespace Responses {
            export type $201 = Components.Schemas.AutomationFlow;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
        }
    }
    namespace DeleteFlow {
        namespace Parameters {
            export type FlowId = /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            Components.Schemas.AutomationFlowId;
        }
        export interface PathParameters {
            flow_id: Parameters.FlowId;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetBulkJob {
        namespace Parameters {
            export type JobId = /**
             * Job ID for tracking the status of bulk trigger automation executions
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            Components.Schemas.JobId;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BulkTriggerJob;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetExecution {
        namespace Parameters {
            export type ExecutionId = /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            Components.Schemas.AutomationExecutionId;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AutomationExecution;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetExecutions {
        namespace Parameters {
            export type EntityId = /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            Components.Schemas.EntityId;
            export type From = number;
            export type Size = number;
        }
        export interface QueryParameters {
            entity_id?: Parameters.EntityId;
            size?: Parameters.Size;
            from?: Parameters.From;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetExecutionsResp;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
        }
    }
    namespace GetFlow {
        namespace Parameters {
            export type FlowId = /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            Components.Schemas.AutomationFlowId;
        }
        export interface PathParameters {
            flow_id: Parameters.FlowId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AutomationFlow;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace PatchBulkJob {
        namespace Parameters {
            export type JobId = /**
             * Job ID for tracking the status of bulk trigger automation executions
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            Components.Schemas.JobId;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export type RequestBody = Components.Schemas.PatchBulkJobRequest;
        namespace Responses {
            export type $200 = Components.Schemas.BulkTriggerJob;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace PutFlow {
        namespace Parameters {
            export type FlowId = /**
             * ID of the Automation Flow
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            Components.Schemas.AutomationFlowId;
        }
        export interface PathParameters {
            flow_id: Parameters.FlowId;
        }
        export type RequestBody = Components.Schemas.AutomationFlow;
        namespace Responses {
            export type $200 = Components.Schemas.AutomationFlow;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
        }
    }
    namespace ResumeExecutionWithToken {
        export type RequestBody = Components.Schemas.ResumeReq;
        namespace Responses {
            export type $200 = Components.Schemas.ResumeResp;
            export interface $400 {
            }
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace RetriggerAction {
        namespace Parameters {
            export type ActionId = /**
             * example:
             * 9ec3711b-db63-449c-b894-54d5bb622a8f
             */
            Components.Schemas.AutomationActionId;
            export type ExecutionId = /**
             * example:
             * 9baf184f-bc81-4128-bca3-d974c90a12c4
             */
            Components.Schemas.AutomationExecutionId;
        }
        export interface PathParameters {
            execution_id: Parameters.ExecutionId;
            action_id: Parameters.ActionId;
        }
        export type RequestBody = Components.Schemas.RetryReq;
        namespace Responses {
            export interface $200 {
            }
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace SearchFlows {
        namespace Parameters {
            export type From = number;
            /**
             * example:
             * submission
             */
            export type Schema = string;
            export type Size = number;
            /**
             * example:
             * 600945fe-212e-4b97-acf7-391d64648384
             */
            export type TriggerSourceId = string;
        }
        export interface QueryParameters {
            schema?: /**
             * example:
             * submission
             */
            Parameters.Schema;
            size?: Parameters.Size;
            from?: Parameters.From;
            trigger_source_id?: /**
             * example:
             * 600945fe-212e-4b97-acf7-391d64648384
             */
            Parameters.TriggerSourceId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SearchAutomationsResp;
        }
    }
    namespace StartExecution {
        export type RequestBody = Components.Schemas.StartExecutionRequest;
        namespace Responses {
            export type $201 = Components.Schemas.AutomationExecution;
            export type $403 = /**
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden"
             * }
             */
            Components.Responses.ForbiddenError;
        }
    }
}


export interface OperationMethods {
  /**
   * searchFlows - searchFlows
   * 
   * Search available automation flows
   */
  'searchFlows'(
    parameters?: Parameters<Paths.SearchFlows.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchFlows.Responses.$200>
  /**
   * createFlow - createFlow
   * 
   * Create new automation flow
   */
  'createFlow'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateFlow.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateFlow.Responses.$201>
  /**
   * getFlow - getFlow
   * 
   * List available automation flows
   */
  'getFlow'(
    parameters?: Parameters<Paths.GetFlow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFlow.Responses.$200>
  /**
   * putFlow - putFlow
   * 
   * Update automation flow by id
   */
  'putFlow'(
    parameters?: Parameters<Paths.PutFlow.PathParameters> | null,
    data?: Paths.PutFlow.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutFlow.Responses.$200>
  /**
   * deleteFlow - deleteFlow
   * 
   * Update automation flow by id
   */
  'deleteFlow'(
    parameters?: Parameters<Paths.DeleteFlow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFlow.Responses.$200>
  /**
   * getExecutions - getExecutions
   * 
   * List automation executions
   */
  'getExecutions'(
    parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecutions.Responses.$200>
  /**
   * startExecution - startExecution
   * 
   * Start new automation execution
   */
  'startExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartExecution.Responses.$201>
  /**
   * bulkTriggerExecutions - bulkTriggerExecutions
   * 
   * Create a bulk job that triggers multiple automation executions
   */
  'bulkTriggerExecutions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkTriggerExecutions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkTriggerExecutions.Responses.$202>
  /**
   * getBulkJob - getBulkJob
   * 
   * Get the status of a bulk job that triggers multiple automation executions
   */
  'getBulkJob'(
    parameters?: Parameters<Paths.GetBulkJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBulkJob.Responses.$200>
  /**
   * patchBulkJob - patchBulkJob
   * 
   * Approve / Cancel bulk job that triggers multiple automation executions
   */
  'patchBulkJob'(
    parameters?: Parameters<Paths.PatchBulkJob.PathParameters> | null,
    data?: Paths.PatchBulkJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchBulkJob.Responses.$200>
  /**
   * getExecution - getExecution
   * 
   * Get automation execution
   */
  'getExecution'(
    parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecution.Responses.$200>
  /**
   * cancelExecution - cancelExecution
   * 
   * Cancel automation execution
   */
  'cancelExecution'(
    parameters?: Parameters<Paths.CancelExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelExecution.Responses.$200>
  /**
   * retriggerAction - retriggerAction
   * 
   * Retry a specific automation execution action which failed / is stuck.
   */
  'retriggerAction'(
    parameters?: Parameters<Paths.RetriggerAction.PathParameters> | null,
    data?: Paths.RetriggerAction.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetriggerAction.Responses.$200>
  /**
   * resumeExecutionWithToken - resumeExecutionWithToken
   * 
   * Resume a paused automation execution using a unique resume token.
   * 
   * This public API is normally called when a user lands on a confirmation page via email link.
   * 
   * Example link: https://automation.epilot.io/confirm-email?token=eyJraWQiOiJrZXkifQ...
   * 
   */
  'resumeExecutionWithToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResumeExecutionWithToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResumeExecutionWithToken.Responses.$200>
  /**
   * cancelSchedule - cancelSchedule
   * 
   * Cancel a scheduled automation
   */
  'cancelSchedule'(
    parameters?: Parameters<Paths.CancelSchedule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelSchedule.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/automation/flows']: {
    /**
     * searchFlows - searchFlows
     * 
     * Search available automation flows
     */
    'get'(
      parameters?: Parameters<Paths.SearchFlows.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchFlows.Responses.$200>
    /**
     * createFlow - createFlow
     * 
     * Create new automation flow
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateFlow.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateFlow.Responses.$201>
  }
  ['/v1/automation/flows/{flow_id}']: {
    /**
     * getFlow - getFlow
     * 
     * List available automation flows
     */
    'get'(
      parameters?: Parameters<Paths.GetFlow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFlow.Responses.$200>
    /**
     * putFlow - putFlow
     * 
     * Update automation flow by id
     */
    'put'(
      parameters?: Parameters<Paths.PutFlow.PathParameters> | null,
      data?: Paths.PutFlow.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutFlow.Responses.$200>
    /**
     * deleteFlow - deleteFlow
     * 
     * Update automation flow by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteFlow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFlow.Responses.$200>
  }
  ['/v1/automation/executions']: {
    /**
     * getExecutions - getExecutions
     * 
     * List automation executions
     */
    'get'(
      parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecutions.Responses.$200>
    /**
     * startExecution - startExecution
     * 
     * Start new automation execution
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.StartExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartExecution.Responses.$201>
  }
  ['/v1/automation/executions/bulk-jobs']: {
    /**
     * bulkTriggerExecutions - bulkTriggerExecutions
     * 
     * Create a bulk job that triggers multiple automation executions
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkTriggerExecutions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkTriggerExecutions.Responses.$202>
  }
  ['/v1/automation/executions/bulk-jobs/{job_id}']: {
    /**
     * getBulkJob - getBulkJob
     * 
     * Get the status of a bulk job that triggers multiple automation executions
     */
    'get'(
      parameters?: Parameters<Paths.GetBulkJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBulkJob.Responses.$200>
    /**
     * patchBulkJob - patchBulkJob
     * 
     * Approve / Cancel bulk job that triggers multiple automation executions
     */
    'patch'(
      parameters?: Parameters<Paths.PatchBulkJob.PathParameters> | null,
      data?: Paths.PatchBulkJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchBulkJob.Responses.$200>
  }
  ['/v1/automation/executions/{execution_id}']: {
    /**
     * getExecution - getExecution
     * 
     * Get automation execution
     */
    'get'(
      parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecution.Responses.$200>
    /**
     * cancelExecution - cancelExecution
     * 
     * Cancel automation execution
     */
    'delete'(
      parameters?: Parameters<Paths.CancelExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelExecution.Responses.$200>
  }
  ['/v1/automation/executions/{execution_id}/{action_id}/retrigger']: {
    /**
     * retriggerAction - retriggerAction
     * 
     * Retry a specific automation execution action which failed / is stuck.
     */
    'post'(
      parameters?: Parameters<Paths.RetriggerAction.PathParameters> | null,
      data?: Paths.RetriggerAction.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetriggerAction.Responses.$200>
  }
  ['/v1/automation/public/executions:resume']: {
    /**
     * resumeExecutionWithToken - resumeExecutionWithToken
     * 
     * Resume a paused automation execution using a unique resume token.
     * 
     * This public API is normally called when a user lands on a confirmation page via email link.
     * 
     * Example link: https://automation.epilot.io/confirm-email?token=eyJraWQiOiJrZXkifQ...
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResumeExecutionWithToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResumeExecutionWithToken.Responses.$200>
  }
  ['/v1/automation/executions/{execution_id}/schedules/{schedule_id}']: {
    /**
     * cancelSchedule - cancelSchedule
     * 
     * Cancel a scheduled automation
     */
    'delete'(
      parameters?: Parameters<Paths.CancelSchedule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelSchedule.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActionCondition = Components.Schemas.ActionCondition;
export type ActionSchedule = Components.Schemas.ActionSchedule;
export type ActionScheduleSource = Components.Schemas.ActionScheduleSource;
export type ActivityId = Components.Schemas.ActivityId;
export type ActivityTrigger = Components.Schemas.ActivityTrigger;
export type AnyAction = Components.Schemas.AnyAction;
export type AnyActionConfig = Components.Schemas.AnyActionConfig;
export type AnyTrigger = Components.Schemas.AnyTrigger;
export type AnythingButCondition = Components.Schemas.AnythingButCondition;
export type ApiCallerContext = Components.Schemas.ApiCallerContext;
export type ApiSubmissionTrigger = Components.Schemas.ApiSubmissionTrigger;
export type AppendValueMapper = Components.Schemas.AppendValueMapper;
export type AssignUsersToStep = Components.Schemas.AssignUsersToStep;
export type AutomationAction = Components.Schemas.AutomationAction;
export type AutomationActionConfig = Components.Schemas.AutomationActionConfig;
export type AutomationActionExecutionState = Components.Schemas.AutomationActionExecutionState;
export type AutomationActionId = Components.Schemas.AutomationActionId;
export type AutomationExecution = Components.Schemas.AutomationExecution;
export type AutomationExecutionId = Components.Schemas.AutomationExecutionId;
export type AutomationFlow = Components.Schemas.AutomationFlow;
export type AutomationFlowId = Components.Schemas.AutomationFlowId;
export type AutomationTrigger = Components.Schemas.AutomationTrigger;
export type BulkTriggerJob = Components.Schemas.BulkTriggerJob;
export type BulkTriggerRequest = Components.Schemas.BulkTriggerRequest;
export type CancellationReason = Components.Schemas.CancellationReason;
export type CartCheckoutAction = Components.Schemas.CartCheckoutAction;
export type CartCheckoutActionConfig = Components.Schemas.CartCheckoutActionConfig;
export type CartCheckoutConfig = Components.Schemas.CartCheckoutConfig;
export type Comparison = Components.Schemas.Comparison;
export type ConditionStatement = Components.Schemas.ConditionStatement;
export type CopyValueMapper = Components.Schemas.CopyValueMapper;
export type CreateDocumentAction = Components.Schemas.CreateDocumentAction;
export type CreateDocumentActionConfig = Components.Schemas.CreateDocumentActionConfig;
export type CreateDocumentConfig = Components.Schemas.CreateDocumentConfig;
export type CustomAction = Components.Schemas.CustomAction;
export type DiffAdded = Components.Schemas.DiffAdded;
export type DiffDeleted = Components.Schemas.DiffDeleted;
export type DiffUpdated = Components.Schemas.DiffUpdated;
export type EntityId = Components.Schemas.EntityId;
export type EntityItemSnapshot = Components.Schemas.EntityItemSnapshot;
export type EntityManualTrigger = Components.Schemas.EntityManualTrigger;
export type EntityOperation = Components.Schemas.EntityOperation;
export type EntityOperationTrigger = Components.Schemas.EntityOperationTrigger;
export type EntityRef = Components.Schemas.EntityRef;
export type EntitySearchFilter = Components.Schemas.EntitySearchFilter;
export type EntitySearchFilterValue = Components.Schemas.EntitySearchFilterValue;
export type EqualsIgnoreCaseCondition = Components.Schemas.EqualsIgnoreCaseCondition;
export type ErrorCode = Components.Schemas.ErrorCode;
export type ErrorDetail = Components.Schemas.ErrorDetail;
export type ErrorObject = Components.Schemas.ErrorObject;
export type ErrorOutput = Components.Schemas.ErrorOutput;
export type ExecItem = Components.Schemas.ExecItem;
export type ExecutionStatus = Components.Schemas.ExecutionStatus;
export type ExistsCondition = Components.Schemas.ExistsCondition;
export type FilterConditionOnEvent = Components.Schemas.FilterConditionOnEvent;
export type FlowExecutionCancelAction = Components.Schemas.FlowExecutionCancelAction;
export type FlowExecutionCancelActionConfig = Components.Schemas.FlowExecutionCancelActionConfig;
export type FlowExecutionCancelConfig = Components.Schemas.FlowExecutionCancelConfig;
export type FlowsTrigger = Components.Schemas.FlowsTrigger;
export type FrontendSubmitTrigger = Components.Schemas.FrontendSubmitTrigger;
export type GetExecutionsResp = Components.Schemas.GetExecutionsResp;
export type InformERPAction = Components.Schemas.InformERPAction;
export type InformERPActionConfig = Components.Schemas.InformERPActionConfig;
export type InformERPConfig = Components.Schemas.InformERPConfig;
export type JobId = Components.Schemas.JobId;
export type JourneySubmitTrigger = Components.Schemas.JourneySubmitTrigger;
export type MapEntityAction = Components.Schemas.MapEntityAction;
export type MapEntityActionConfig = Components.Schemas.MapEntityActionConfig;
export type MapEntityConfig = Components.Schemas.MapEntityConfig;
export type MappingAttribute = Components.Schemas.MappingAttribute;
export type MappingAttributeMode = Components.Schemas.MappingAttributeMode;
export type MappingAttributeV2 = Components.Schemas.MappingAttributeV2;
export type MappingConfigRef = Components.Schemas.MappingConfigRef;
export type NumericCondition = Components.Schemas.NumericCondition;
export type OperationNode = Components.Schemas.OperationNode;
export type OperationObjectNode = Components.Schemas.OperationObjectNode;
export type OrCondition = Components.Schemas.OrCondition;
export type OrConditionForDiff = Components.Schemas.OrConditionForDiff;
export type OrganizationId = Components.Schemas.OrganizationId;
export type PatchBulkJobRequest = Components.Schemas.PatchBulkJobRequest;
export type PrefixCondition = Components.Schemas.PrefixCondition;
export type PrimitiveJSONValue = Components.Schemas.PrimitiveJSONValue;
export type ReceivedEmailTrigger = Components.Schemas.ReceivedEmailTrigger;
export type RelationAttribute = Components.Schemas.RelationAttribute;
export type ResumeReq = Components.Schemas.ResumeReq;
export type ResumeResp = Components.Schemas.ResumeResp;
export type ResumeToken = Components.Schemas.ResumeToken;
export type RetryReq = Components.Schemas.RetryReq;
export type RetryStrategy = Components.Schemas.RetryStrategy;
export type SearchAutomationsResp = Components.Schemas.SearchAutomationsResp;
export type SendEmailAction = Components.Schemas.SendEmailAction;
export type SendEmailActionConfig = Components.Schemas.SendEmailActionConfig;
export type SendEmailCondition = Components.Schemas.SendEmailCondition;
export type SendEmailConfig = Components.Schemas.SendEmailConfig;
export type SetValueMapper = Components.Schemas.SetValueMapper;
export type StartExecutionRequest = Components.Schemas.StartExecutionRequest;
export type SuffixCondition = Components.Schemas.SuffixCondition;
export type TriggerCondition = Components.Schemas.TriggerCondition;
export type TriggerEventEntityActivity = Components.Schemas.TriggerEventEntityActivity;
export type TriggerEventEntityOperation = Components.Schemas.TriggerEventEntityOperation;
export type TriggerEventFlowAutomationTask = Components.Schemas.TriggerEventFlowAutomationTask;
export type TriggerEventManual = Components.Schemas.TriggerEventManual;
export type TriggerShareEntityAction = Components.Schemas.TriggerShareEntityAction;
export type TriggerShareEntityActionConfig = Components.Schemas.TriggerShareEntityActionConfig;
export type TriggerShareEntityConfig = Components.Schemas.TriggerShareEntityConfig;
export type TriggerWebhookAction = Components.Schemas.TriggerWebhookAction;
export type TriggerWebhookActionConfig = Components.Schemas.TriggerWebhookActionConfig;
export type TriggerWebhookConfig = Components.Schemas.TriggerWebhookConfig;
export type TriggerWorkflowAction = Components.Schemas.TriggerWorkflowAction;
export type TriggerWorkflowActionConfig = Components.Schemas.TriggerWorkflowActionConfig;
export type TriggerWorkflowCondition = Components.Schemas.TriggerWorkflowCondition;
export type TriggerWorkflowConfig = Components.Schemas.TriggerWorkflowConfig;
export type WildcardCondition = Components.Schemas.WildcardCondition;
