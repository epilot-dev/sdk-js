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
        /**
         * example:
         * {
         *   "target": {
         *     "schema": "contact",
         *     "tag": "primary",
         *     "key": "address",
         *     "value_json": "{\"_tags\": [\"billing\"],\"city\":\"steps[0][Adresse][city]\",\"country\":\"steps[0][Adresse][countryCode]\",\"postal_code\":\"steps[0][Adresse][zipCode]\",\"street\":\"steps[0][Adresse][streetName]\",\"street_number\":\"steps[0][Adresse][houseNumber]\",\"additional_info\":\"steps[0][Adresse][addressExtention]\"}",
         *     "target_unique": [
         *       "country",
         *       "city",
         *       "postal_code",
         *       "street",
         *       "street_number"
         *     ]
         *   },
         *   "reference": {
         *     "schema": "opportunity",
         *     "key": "billing_address"
         *   }
         * }
         */
        export interface AddressMapper {
            target: {
                /**
                 * find target entity based on schema
                 */
                schema: string;
                /**
                 * find target entity based on entity tag
                 */
                tag?: string;
                /**
                 * find target entity based on relation tag on main entity relation
                 */
                relation_tag?: string;
                /**
                 * target field for where to store this address.
                 */
                key: string;
                /**
                 * stringified JSON for how to map address data
                 */
                value_json: string;
                /**
                 * Array of keys which should be used when checking for uniqueness. Eg: [country, city, postal_code]
                 *
                 */
                target_unique?: string[];
            };
            reference: {
                /**
                 * Schema of the entity where the reference will be stored.
                 */
                schema: string;
                /**
                 * Field location to store the reference.
                 */
                key: string;
                /**
                 * Optional relation labels to give meaning to this reference.
                 */
                labels?: string[];
            };
        }
        export type AnyAction = /**
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
        MapEntityAction | FillEntityAction | /**
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
        TriggerWorkflowAction | /**
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
        TriggerWebhookAction | /**
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
        CreateDocumentAction | /**
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
        SendEmailAction | /* Creates an order entity with prices from journey */ CartCheckoutAction | AutomationAction;
        export type AnyTrigger = FrontendSubmitTrigger | JourneySubmitTrigger | ApiSubmissionTrigger | EntityOperationTrigger | EntityManualTrigger | ReceivedEmailTrigger;
        export interface ApiSubmissionTrigger {
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
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
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
            entity_snapshot?: EntityItemSnapshot;
            org_id: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            OrganizationId;
            flow_id: /**
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
            actions: AnyAction[];
        }
        /**
         * example:
         * 9baf184f-bc81-4128-bca3-d974c90a12c4
         */
        export type AutomationExecutionId = string;
        export interface AutomationFlow {
            id?: /**
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
            actions: AnyAction[];
            /**
             * Number of automation executions that ran
             * example:
             * 7
             */
            runs?: number;
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
        }
        /**
         * example:
         * 7791b04a-16d2-44a2-9af9-2d59c25c512f
         */
        export type AutomationFlowId = string;
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
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
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
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
        }
        export interface CreateDocumentConfig {
            template_id?: string;
            filename?: string;
        }
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
        export interface EntityOperationTrigger {
            type: "entity_operation";
            configuration: {
                /**
                 * example:
                 * submission
                 */
                schema?: string;
                operations?: ("createEntity" | "updateEntity" | "deleteEntity")[];
            };
        }
        export type ErrorCode = "MAPPING_ERROR" | "REFRESH_RELATIONS_ERROR" | "DUPLICATE_ENTITY_ERROR" | "TRIGGER_WORKFLOW_ERROR" | "TIMEOUT_ERROR" | "BAD_CONFIG" | "INTERNAL_ERROR";
        export interface ErrorOutput {
            error_code: ErrorCode;
            error_reason: string;
        }
        export type ExecutionStatus = "pending" | "in_progress" | "success" | "failed" | "cancelled";
        export interface FillEntityAction {
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
            type?: "fill-entity";
            config: FillEntityConfig;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
        }
        export interface FillEntityConfig {
            mappings: /**
             * example:
             * {
             *   "target": {
             *     "schema": "contact",
             *     "tag": "primary",
             *     "key": "address",
             *     "value_json": "{\"_tags\": [\"billing\"],\"city\":\"steps[0][Adresse][city]\",\"country\":\"steps[0][Adresse][countryCode]\",\"postal_code\":\"steps[0][Adresse][zipCode]\",\"street\":\"steps[0][Adresse][streetName]\",\"street_number\":\"steps[0][Adresse][houseNumber]\",\"additional_info\":\"steps[0][Adresse][addressExtention]\"}",
             *     "target_unique": [
             *       "country",
             *       "city",
             *       "postal_code",
             *       "street",
             *       "street_number"
             *     ]
             *   },
             *   "reference": {
             *     "schema": "opportunity",
             *     "key": "billing_address"
             *   }
             * }
             */
            AddressMapper[];
        }
        export interface FrontendSubmitTrigger {
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
        export interface JourneySubmitTrigger {
            type: "journey_submission";
            configuration: {
                source_id: string; // uuid
            };
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
            config?: MapEntityActionConfig;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
        }
        export interface MapEntityActionConfig {
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
        }
        /**
         * Mapping operation nodes are either primitive values or operation node objects
         */
        export type OperationNode = /* Mapping operation nodes are either primitive values or operation node objects */ OperationObjectNode | /* Represents any primitive JSON value */ PrimitiveJSONValue;
        export interface OperationObjectNode {
            [name: string]: any;
            _set?: /* Represents any primitive JSON value */ PrimitiveJSONValue;
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
        /**
         * example:
         * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
         */
        export type OrganizationId = string;
        /**
         * Represents any primitive JSON value
         */
        export type PrimitiveJSONValue = /* Represents any primitive JSON value */ string | boolean | number | {
            [name: string]: any;
        } | any[];
        export interface ReceivedEmailTrigger {
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
        export interface SearchAutomationsResp {
            total: number;
            results: AutomationFlow[];
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
            config?: SendEmailActionConfig;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
        }
        export interface SendEmailActionConfig {
            email_template_id?: string;
            language_code?: "de" | "en";
            /**
             * Include extra file attachments in sent email.
             *
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
            entity_id?: /**
             * example:
             * e3d3ebac-baab-4395-abf4-50b5bf1f8b74
             */
            EntityId;
            flow_id?: /**
             * example:
             * 7791b04a-16d2-44a2-9af9-2d59c25c512f
             */
            AutomationFlowId;
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
            config?: TriggerWebhookActionConfig;
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
        }
        export interface TriggerWebhookActionConfig {
            entity_sources?: string[];
            target_webhook_id?: string;
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
            execution_status?: ExecutionStatus;
            started_at?: string;
            updated_at?: string;
            /**
             * Whether to stop execution in a failed state if this action fails
             */
            allow_failure?: boolean;
            /**
             * Flag indicating whether the action was created automatically or manually
             */
            created_automatically?: boolean;
            /**
             * example:
             * {}
             */
            outputs?: {
                [name: string]: any;
            };
            error_output?: ErrorOutput;
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
        }
    }
}
declare namespace Paths {
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
        }
    }
    namespace CreateFlow {
        export type RequestBody = Components.Schemas.AutomationFlow;
        namespace Responses {
            export type $201 = Components.Schemas.AutomationFlow;
        }
    }
    namespace DeleteFlow {
        namespace Parameters {
            export type FlowId = /**
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
        }
    }
    namespace GetFlow {
        namespace Parameters {
            export type FlowId = /**
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
        }
    }
    namespace PutFlow {
        namespace Parameters {
            export type FlowId = /**
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
        namespace Responses {
            export interface $200 {
            }
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
   * Retrigger a specific automation execution action
   */
  'retriggerAction'(
    parameters?: Parameters<Paths.RetriggerAction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetriggerAction.Responses.$200>
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
     * Retrigger a specific automation execution action
     */
    'post'(
      parameters?: Parameters<Paths.RetriggerAction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetriggerAction.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>