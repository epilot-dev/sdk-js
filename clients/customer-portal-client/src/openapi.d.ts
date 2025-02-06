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
        export interface ConfirmUserInvalidRequest {
            /**
             * Error message
             */
            message?: string;
            reason: "invalid_token";
        }
        export type Conflict = Schemas.ErrorResp;
        export interface ContractAssignmentConflict {
            /**
             * Error message
             */
            message?: string;
            /**
             * Reason why the contract is not assignable. If the reason is "MULTIPLE", the contract is not assignable because multiple contracts were found and the business logic does not allow it.
             */
            reason: "DRAFT" | "MULTIPLE";
        }
        export type Forbidden = Schemas.ErrorResp;
        export type ForbiddenByRule = Schemas.ErrorResp | Schemas.FailedRuleErrorResp;
        export type InternalServerError = Schemas.ErrorResp;
        export type InvalidRequest = Schemas.ErrorResp;
        export type InvalidRequestCreateMeterReading = {
            reason?: "plausibility_check_failed" | "contract_period" | "no_counter" | "no_direction" | "timestamp_future" | "less_than_previous" | "greater_than_subsequent" | "meter_decommissioned" | "plausibility_check_failed";
            upper_limit: number;
            lower_limit: number;
            /**
             * Error message
             */
            message?: string;
        } | void;
        export type NotFound = Schemas.ErrorResp;
        export type Unauthorized = Schemas.ErrorResp;
    }
    namespace Schemas {
        export interface AcceptanceDecision {
            /**
             * Acceptance decision
             */
            decision: "accept" | "decline";
        }
        export interface ActionLabel {
            en?: string | null;
            de?: string | null;
        }
        export interface ActionWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            actions?: WidgetAction[];
        }
        export interface Activity {
            /**
             * example:
             * MyCustomActivity
             */
            type: string;
            /**
             * Title for activity. Supports handlebars syntax.
             * example:
             * My custom activity
             */
            title: string;
            /**
             * Message for activity. Supports handlebars syntax.
             * example:
             * {{caller}} did something with {{entity payload.entity.id}}.
             */
            message: string;
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
        }
        export interface ActivityCallerContext {
            [name: string]: any;
            PortalAuth?: {
                /**
                 * example:
                 * {
                 *   "cognito:username": "john@doe.com",
                 *   "custom:contact_entity_id": "7579d22f-9400-41d1-b460-04730239ee91",
                 *   "custom:org_id": "123456",
                 *   "custom:origin": "END_CUSTOMER_PORTAL",
                 *   "custom:portal_user_id": "06c78f9d-af75-4483-893d-a3fad524400f",
                 *   "email": "john@doe.com",
                 *   "email_verified": true,
                 *   "exp": 1694693219,
                 *   "iat": 1694689619,
                 *   "sub": "8cc73157-3dc4-47f3-b163-d3a5039bba72"
                 * }
                 */
                token?: {
                    /**
                     * example:
                     * 8cc73157-3dc4-47f3-b163-d3a5039bba72
                     */
                    sub?: string;
                    /**
                     * example:
                     * john@doe.com
                     */
                    email?: string;
                    /**
                     * example:
                     * john@doe.com
                     */
                    "cognito:username"?: string;
                    "custom:portal_user_id"?: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    EntityId /* uuid */;
                    "custom:contact_entity_id"?: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    EntityId /* uuid */;
                };
            };
        }
        /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        export type ActivityId = string; // ulid
        export interface ActivityItem {
            _id?: /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            ActivityId /* ulid */;
            timestamp?: string; // date-time
            /**
             * example:
             * MyCustomActivity
             */
            type: string;
            /**
             * Title for activity. Supports handlebars syntax.
             * example:
             * My custom activity
             */
            title: string;
            /**
             * Message for activity. Supports handlebars syntax.
             * example:
             * {{caller}} did something with {{entity payload.entity.id}}.
             */
            message: string;
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
                entity?: {
                    id?: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    EntityId /* uuid */;
                    schema?: string;
                };
                caller?: ActivityCallerContext;
            };
        }
        export interface AdminUser {
            [name: string]: any;
            /**
             * example:
             * user
             */
            type?: string | null;
            /**
             * example:
             * 123456
             */
            user_id?: string;
            /**
             * example:
             * John
             */
            display_name?: string | null;
            image_uri?: {
                /**
                 * example:
                 * https://fuafjvoHKsu.cloudimg.io/v7/e-mage-sam-bucket-dev.s3.eu-central-1.amazonaws.com/files/fuafjvoHKsudhfagweucjasdvga/original
                 */
                original?: string | null;
                /**
                 * example:
                 * https://fuafjvoHKsu.cloudimg.io/v7/e-mage-sam-bucket-dev.s3.eu-central-1.amazonaws.com/files/fuafjvoHKsudhfagweucjasdvga/original?w=32&h=32
                 */
                thumbnail_32?: string | null;
                /**
                 * example:
                 * https://fuafjvoHKsu.cloudimg.io/v7/e-mage-sam-bucket-dev.s3.eu-central-1.amazonaws.com/files/fuafjvoHKsudhfagweucjasdvga/original?w=64&h=64
                 */
                thumbnail_64?: string | null;
                /**
                 * example:
                 * fuafjvoHKsudhfagweucjasdvga
                 */
                key?: string | null;
            } | null;
            /**
             * example:
             * 123
             */
            org_id?: string;
            /**
             * example:
             * j.doe@epilot.cloud
             */
            email?: string | null;
            /**
             * example:
             * 12345 67890
             */
            phone?: string | null;
        }
        /**
         * Allowed file extensions for upload
         */
        export interface AllowedFileExtensions {
            document?: string[];
            image?: string[];
            spreadsheet?: string[];
            presentation?: string[];
            audioVideo?: string[];
            email?: string[];
            archive?: string[];
            cad?: string[];
            calendar?: string[];
            other?: string[];
        }
        /**
         * Dictionary of epilot user attributes to claims
         */
        export interface AttributeMappingConfig {
            /**
             * example:
             * email
             */
            email: string;
            /**
             * example:
             * name
             */
            display_name?: string;
            /**
             * example:
             * phone
             */
            phone?: string;
            /**
             * example:
             * language
             */
            preferred_language?: string;
        }
        export interface AuthConfig {
            /**
             * AWS Cognito User Pool ID
             * example:
             * eu-central-1_CUEQRNbUb
             */
            user_pool_id: string;
            /**
             * AWS Cognito User Pool Client ID
             * example:
             * 6bsd0jkgoie74k2i8mrhc1vest
             */
            user_pool_client_id: string;
            /**
             * AWS Cognito User Pool Identity Pool ID
             * example:
             * eu-central-1:a63af1f7-ab86-4ab5-a0eb-f461cb37c2b1
             */
            user_pool_identity_pool_id?: string;
            /**
             * Portal ID
             * example:
             * 7h2hwdj7hhjsdcjkq03eidna3ep
             */
            portal_id: string;
        }
        export interface Balance {
            /**
             * Current balance of the customer in cents. (precision 2)
             * example:
             * 8990
             */
            balance?: number;
            /**
             * Current balance of the customer in decimal string representation.
             * example:
             * 89.90
             */
            balance_decimal?: number;
            balance_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * A base billing event to be inherited by all billing events.
         */
        export interface BaseBillingEvent {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: {
                    /**
                     * Entity ID for the related contract.
                     * example:
                     * f589786b-3024-43cd-9cb3-5a3c953f2896
                     */
                    entity_id?: string;
                }[];
            };
        }
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
        }
        /**
         * An entity that describes a billing event such as a future installment or a reimbursement back to the customer.
         */
        export type BillingEvent = {
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
        } & (/* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ /* An entity that describes an installment billing event. */ InstallmentEvent | /* An entity that describes a reimbursement billing event. */ ReimbursementEvent);
        export interface CommonConfigAttributes {
            /**
             * Enable/Disable the portal access
             */
            enabled?: boolean;
            /**
             * A short name to identify your portal
             * example:
             * Installer Portal
             */
            name?: string;
            /**
             * The URL on which the portal is accessible
             * example:
             * abc.com
             */
            domain?: string;
            /**
             * Mark true if the domain is an Epilot domain
             */
            is_epilot_domain?: boolean;
            /**
             * ID of the design used to build the portal
             */
            design_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
            /**
             * Feature settings for the portal
             */
            feature_settings?: {
                /**
                 * Start page feature flag
                 */
                start_page?: boolean;
                /**
                 * Billing feature flag
                 */
                billing?: boolean;
                /**
                 * Change due date feature flag
                 */
                change_due_date?: boolean;
                /**
                 * Enable or disable the new design for the portal
                 */
                new_design?: boolean;
            };
            /**
             * Access token for the portal
             */
            accessToken?: string;
            advanced_mfa?: {
                /**
                 * Advanced MFA feature flag
                 */
                enabled?: boolean;
            };
            /**
             * AWS Cognito Pool details for the portal
             */
            cognito_details?: {
                /**
                 * Cognito user pool client ID
                 * example:
                 * 6bsd0jkgoie74k2i8mrhc1vest
                 */
                cognito_user_pool_client_id?: string;
                /**
                 * Cognito user pool ARN
                 * example:
                 * arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341
                 */
                cognito_user_pool_arn?: string;
                /**
                 * Cognito user pool ID
                 * example:
                 * eu-central-1_CUEQRNbUb
                 */
                cognito_user_pool_id?: string;
                /**
                 * Password policy for the portal
                 */
                password_policy?: {
                    /**
                     * Minimum password length
                     * example:
                     * 8
                     */
                    minimum_length?: number;
                    /**
                     * Require lowercase characters
                     * example:
                     * true
                     */
                    require_lowercase?: boolean;
                    /**
                     * Require uppercase characters
                     * example:
                     * true
                     */
                    require_uppercase?: boolean;
                    /**
                     * Require numbers
                     * example:
                     * true
                     */
                    require_numbers?: boolean;
                    /**
                     * Require symbols
                     * example:
                     * true
                     */
                    require_symbols?: boolean;
                };
            };
            /**
             * Stringified object with configuration details
             */
            config?: string;
            /**
             * Deprecated. Use registration_identifiers instead.
             * example:
             * [
             *   "email",
             *   "last_name"
             * ]
             */
            contact_identifiers?: string[];
            /**
             * example:
             * {
             *   "contact": [
             *     "name",
             *     "address"
             *   ],
             *   "contract": [
             *     "installment_amount"
             *   ]
             * }
             */
            approval_state_attributes?: {
                [name: string]: string[];
            };
            email_templates?: /* Email templates used for authentication and internal processes */ EmailTemplates;
            /**
             * Teaser & Banner Image web links
             */
            images?: {
                /**
                 * URL of the order left teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg
                 */
                orderLeftTeaser?: string | null;
                /**
                 * URL of the order right teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg
                 */
                orderRightTeaser?: string | null;
                /**
                 * URL of the welcome banner image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg
                 */
                welcomeBanner?: string | null;
            };
            /**
             * Identifiers used to identify an entity by a portal user. Deprecated. Use contract_identifiers instead.
             */
            entity_identifiers?: {
                type?: {
                    /**
                     * Enable/Disable the entity identifier
                     */
                    isEnabled?: boolean;
                    /**
                     * Attributes used to identify an entity
                     */
                    attributes?: string[];
                };
            };
            /**
             * Identifiers to identify a contract by a portal user.
             * example:
             * [
             *   {
             *     "name": "email",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            contract_identifiers?: ContractIdentifier[];
            /**
             * Identifiers to identify a contact of a portal user during the registration.
             * example:
             * [
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            registration_identifiers?: ContractIdentifier[];
            /**
             * Journeys automatically opened on a portal user action
             */
            triggered_journeys?: {
                trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER";
                journey_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
            }[];
            /**
             * Rules for editing an entity by a portal user
             */
            entity_edit_rules?: {
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * example:
                 * first_name
                 */
                attribute?: string;
                rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments";
                cadence_period_type?: "days" | "weeks" | "months";
                /**
                 * example:
                 * 1
                 */
                cadence_period?: number;
                /**
                 * example:
                 * 1
                 */
                changes_allowed?: number;
                /**
                 * example:
                 * 1
                 */
                grace_period?: number;
                /**
                 * example:
                 * 10%
                 */
                allowed_increment?: string;
                /**
                 * example:
                 * 10%
                 */
                allowed_decrement?: string;
                /**
                 * example:
                 * 10
                 */
                number_of_days_before_restriction?: number;
            }[];
            allowed_file_extensions?: /* Allowed file extensions for upload */ AllowedFileExtensions;
            /**
             * Prevent indexing by search engines
             */
            prevent_search_engine_indexing?: boolean;
        }
        /**
         * The mapped contact of the portal user
         */
        export interface Contact {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "contact";
        }
        export interface ContactCountRequest {
            /**
             * ID of the organization
             * example:
             * 728
             */
            orgId: string;
            /**
             * Identifiers to identify a contact
             */
            contactIdentifiers: {
                [name: string]: string;
            };
        }
        export interface ContactExistsRequest {
            /**
             * ID of the organization
             * example:
             * 728
             */
            org_id: string;
            /**
             * Identifier-value pairs per schema to identify a contact of a portal user during the resgistration
             * example:
             * {
             *   "contact": {
             *     "email": "john.doe@example.com"
             *   },
             *   "contract": {
             *     "contract_number": "123456"
             *   }
             * }
             */
            registration_identifiers: {
                [name: string]: {
                    [name: string]: string;
                };
            };
        }
        export interface ContentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            content?: string;
        }
        /**
         * The contract entity
         */
        export interface Contract {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            /**
             * The name of the contract.
             * example:
             * Grid Contract
             */
            contract_name?: string;
            /**
             * The unique identifier of the contract.
             * example:
             * 12345
             */
            contract_number?: string;
            /**
             * The status of the contract.
             * example:
             * approved
             */
            status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
            /**
             * A brief description of the contract.
             * example:
             * This contract is for the supply of widgets.
             */
            description?: string;
            /**
             * The account number associated with the contract.
             * example:
             * 67890
             */
            account_number?: string;
            /**
             * The branch associated with the contract.
             * example:
             * power
             */
            branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
            /**
             * The billing address associated with the contract.
             * example:
             * 123 Main St, Anytown
             */
            billing_address?: string;
            /**
             * The delivery address associated with the contract.
             * example:
             * 456 Elm St, Anytown
             */
            delivery_address?: string;
            /**
             * Any additional addresses associated with the contract.
             * example:
             * 789 Oak St, Anytown
             */
            additional_addresses?: string;
            /**
             * The date on which the contract was terminated.
             * example:
             * 2022-01-01
             */
            termination_date?: string;
            /**
             * The reason for the termination of the contract.
             * example:
             * Non-payment
             */
            termination_reason?: string;
            /**
             * The billing period associated with the contract.
             * example:
             * monthly
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            /**
             * The duration of the billing period.
             * example:
             * 30
             */
            billing_duration_amount?: number;
            /**
             * The duration of the renewal period.
             * example:
             * 365
             */
            renewal_duration_amount?: number;
            /**
             * The unit of time for the renewal period.
             * example:
             * years
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The amount of notice required for termination of the contract.
             * example:
             * 30
             */
            notice_time_amount?: number;
            /**
             * The unit of time for the notice period.
             * example:
             * months
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * The start date of the contract.
             * example:
             * 2021-01-01
             */
            start_date?: string;
            /**
             * Defines the day of the month in which the installments are due.
             * example:
             * 2
             */
            billing_due_day?: number;
            /**
             * Set amount for installments in cents. (precision 2)
             * example:
             * 10050
             */
            installment_amount?: number;
            /**
             * Current balance of the contract in cents. (precision 2)
             * example:
             * 8990
             */
            balance?: number;
            balance_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
        }
        export interface ContractIdentifier {
            /**
             * Name of the identifier/attribute
             */
            name?: string;
            schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
        }
        export interface CreateUserRequest {
            /**
             * User's email address
             * example:
             * testemail921@yopmail.com
             */
            email: string;
            /**
             * First Name of the portal user
             * example:
             * John
             */
            first_name?: string;
            /**
             * Last Name of the portal user
             * example:
             * Doe
             */
            last_name?: string;
            contactId?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the organization
             * example:
             * 728
             */
            orgId: string;
            /**
             * User's password
             * example:
             * 124n$aAJs*d41h4
             */
            password: string;
            /**
             * Deprecated. Use registration_identifiers instead.
             */
            contactIdentifiers?: {
                [name: string]: string;
            };
            /**
             * Identifier-value pairs per schema to identify a contact of a portal user during the resgistration
             * example:
             * {
             *   "contact": {
             *     "email": "john.doe@example.com"
             *   },
             *   "contract": {
             *     "contract_number": "123456"
             *   }
             * }
             */
            registration_identifiers?: {
                [name: string]: {
                    [name: string]: string;
                };
            };
        }
        /**
         * Currency code in ISO 4217 format
         * example:
         * EUR
         */
        export type Currency = string;
        export interface DataRetrievalItem {
            extension?: PublicExtensionDetails;
            hook?: PublicDataRetrievalHookDetails;
        }
        export interface DeleteEntityFile {
            entity_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Entity type
             * example:
             * order
             */
            entity_type: string;
            /**
             * Array of file entity IDs
             */
            file_entity_ids: [
                /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */,
                .../**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */[]
            ];
        }
        export type Direction = "feed-in" | "feed-out";
        export interface DocumentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
        }
        /**
         * Email templates used for authentication and internal processes
         */
        export interface EmailTemplates {
            /**
             * ID of the confirmation email template upon registration
             */
            confirmAccount?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the advanced MFA with login link and login code
             */
            advancedMFA?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for signing up from Journeys
             */
            journeySignUp?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for OTP to sign in from Journeys
             */
            journeySignInOneTimePassword?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for OTP to sign in from Journeys
             */
            journeyLoginOTP?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for forgot password
             */
            forgotPassword?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for invitation
             */
            invitation?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for new quote
             */
            onNewQuote?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for mapping a pending portal user with a contact
             */
            onMapAPendingUser?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for document upload
             */
            onDocUpload?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for workflow step assignment
             */
            onWorkflowStepAssigned?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * ID of the email template for setting password while updating email
             */
            confirmEmailUpdate?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
        }
        export interface Entity {
            [name: string]: any;
        }
        export interface EntityEditRule {
            slug?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            attribute?: string;
            rule_type?: string;
            cadence_period_type?: string;
            changes_allowed?: number;
            cadence_period?: number;
            allowed_decrement?: string;
            allowed_increment?: string;
            number_of_days_before_restriction?: number;
            grace_period?: number;
        }
        export interface EntityFileCount {
            /**
             * The ID of the parent entity
             */
            entity_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * The title of the parent entity
             * example:
             * Opportunity ABC
             */
            _title?: string;
            /**
             * Number of files associated with the entity and shared with portal user
             * example:
             * 2
             */
            file_count: number;
        }
        /**
         * Entity ID
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type EntityId = string; // uuid
        export interface EntityItem {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
        }
        export interface EntitySearchParams {
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * example:
             * _created_at:desc
             */
            sort?: string;
            from?: number;
            /**
             * Max search size is 1000 with higher values defaulting to 1000
             */
            size?: number;
            /**
             * When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place.
             */
            hydrate?: boolean;
            /**
             * List of entity fields to include in search results
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name"
             * ]
             */
            fields?: string[];
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter";
        export interface EntityWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            schema?: string;
        }
        export interface ErrorResp {
            /**
             * Error message
             */
            message?: string;
        }
        /**
         * example:
         * {
         *   "exists": true,
         *   "active": false
         * }
         */
        export interface Exists {
            /**
             * Indicate whether the item exists
             */
            exists: boolean;
            /**
             * Indicate whether the item is active
             */
            active?: boolean;
        }
        export interface Extension {
            /**
             * Identifier of the extension. Should not change between updates.
             */
            id: string;
            /**
             * Identifier of the app from which the extension was installed. Should not change between updates.
             */
            app_id?: string;
            /**
             * Name of the extension.
             */
            name: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
            /**
             * Name of the extension.
             */
            description?: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
            /**
             * Version of the extension.
             */
            version?: string;
            /**
             * Options available to the extension configurable by the portal administrator.
             */
            options?: {
                /**
                 * Identifier of the option. Should not change between updates.
                 */
                id: string;
                /**
                 * Name of the option.
                 */
                name: {
                    [name: string]: string;
                    /**
                     * Name of the option in English.
                     */
                    en: string;
                };
                /**
                 * Type of the option.
                 */
                type: "text" | "secret";
                /**
                 * Description of the option.
                 */
                description?: {
                    [name: string]: string;
                    /**
                     * Description of the option in English.
                     */
                    en: string;
                };
                /**
                 * Default value of the option.
                 */
                default?: string;
                /**
                 * Indicate whether the option is required.
                 */
                required?: boolean;
            }[];
            /**
             * External links added to the portal.
             */
            links?: {
                /**
                 * Identifier of the link. Should not change between updates.
                 */
                id: string;
                /**
                 * Name of the extension.
                 */
                name: {
                    [name: string]: string;
                    /**
                     * Name of the extension in English.
                     */
                    en: string;
                };
                /**
                 * Name of the extension.
                 */
                description?: {
                    [name: string]: string;
                    /**
                     * Name of the extension in English.
                     */
                    en: string;
                };
                type: "seamless";
                /**
                 * Controls whether the link should be shown. Supports variable interpolation.
                 * example:
                 * {{Contact.customer_number | is_not_empty}}
                 */
                condition?: string;
                auth?: ExtensionAuthBlock;
                redirect: {
                    /**
                     * URL to redirect to. Supports variable interpolation.
                     */
                    url?: string;
                    /**
                     * Parameters to append to the URL. Supports variable interpolation.
                     */
                    params?: {
                        [name: string]: string;
                    };
                };
            }[];
            /**
             * Hooks that influence the behavior of Portal.
             */
            hooks?: ({
                /**
                 * Identifier of the hook. Should not change between updates.
                 */
                id?: string;
            } & (/**
             * Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
             *   - 200 with contact id if exactly one contact is found
             *   - 404 if no contact is found or more than contact is found
             *
             */
            ExtensionHookRegistrationIdentifiersCheck | /**
             * Hook that replaces the built-in contract identification for self-assignment. This hook makes a POST call whenever a user is trying to self-assign a contract to find the corresponding contract(s). The expected response to the call is:
             *   - 200 if found with either:
             *     - contract_id array
             *     - contact_id string
             *   - 404 if no contract is found
             * If `contact_id` is provided in the response, Contracts are retrieved from this Contact. In that case, optionally, if you also specify `contact_relation_attribute`, the specified Contact attribute of the user performing the action will be modified to add the matched Contact.
             *
             */
            ExtensionHookContractIdentification | /**
             * Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            ExtensionHookPriceDataRetrieval | /**
             * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            ExtensionHookConsumptionDataRetrieval | /**
             * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
             *   - 200 with the time series data
             *
             */
            ExtensionHookCostDataRetrieval | /**
             * Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
             *   - 200:
             *     If meter reading is plausible, the response should contain:
             *       - valid: true
             *     If meter reading is not plausible, the response should contain:
             *       - valid: false
             *
             */
            ExtensionHookMeterReadingPlausibilityCheck))[];
        }
        export interface ExtensionAuthBlock {
            /**
             * HTTP method to use for authentication
             */
            method?: string;
            /**
             * URL to use for authentication. Supports variable interpolation.
             */
            url: string;
            /**
             * Parameters to append to the URL. Supports variable interpolation.
             */
            params?: {
                [name: string]: string;
            };
            /**
             * Headers to use for authentication. Supports variable interpolation.
             */
            headers?: {
                [name: string]: string;
            };
            /**
             * JSON body to use for authentication. Supports variable interpolation.
             */
            body?: {
                [name: string]: string;
            };
            cache?: {
                /**
                 * Key to use to identify the auth response. Supports interpolation.
                 * example:
                 * {{Options.api_key}}
                 */
                key: string;
                /**
                 * Time to live in seconds for the cache. Supports interpolation.
                 * example:
                 * {{AuthResponse.data.expires_in}}
                 */
                ttl: string;
            };
        }
        export interface ExtensionConfig {
            /**
             * Name of the extension
             */
            id: string;
            /**
             * Status of the extension
             */
            status: "installed" | "enabled";
            /**
             * Extension option values.
             */
            options?: {
                [name: string]: string;
            };
        }
        export interface ExtensionHook {
            /**
             * Identifier of the hook. Should not change between updates.
             */
            id?: string;
        }
        export type ExtensionHookConfig = {
            /**
             * The ID of the hook that is being configured.
             */
            hook_id?: string;
            /**
             * The ID of the app that is being hooked into.
             */
            app_id?: string;
        } | null;
        /**
         * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface ExtensionHookConsumptionDataRetrieval {
            type: "consumptionDataRetrieval";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
        }
        /**
         * Hook that replaces the built-in contract identification for self-assignment. This hook makes a POST call whenever a user is trying to self-assign a contract to find the corresponding contract(s). The expected response to the call is:
         *   - 200 if found with either:
         *     - contract_id array
         *     - contact_id string
         *   - 404 if no contract is found
         * If `contact_id` is provided in the response, Contracts are retrieved from this Contact. In that case, optionally, if you also specify `contact_relation_attribute`, the specified Contact attribute of the user performing the action will be modified to add the matched Contact.
         *
         */
        export interface ExtensionHookContractIdentification {
            type: "contractIdentification";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
            };
            /**
             * Name of the Contact attribute to update with the matched Contact ID. Must be a Contact relation attribute supporting multiple entities.
             * example:
             * represents_contact
             */
            contact_relation_attribute?: string;
            /**
             * Explanation of the hook.
             */
            explanation?: {
                [name: string]: string;
                /**
                 * Explanation of the functionality shown to the end user.
                 * example:
                 * This process will give you access to all Contracts kept
                 */
                en: string;
            };
        }
        /**
         * Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface ExtensionHookCostDataRetrieval {
            type: "costDataRetrieval";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
        }
        /**
         * Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
         *   - 200:
         *     If meter reading is plausible, the response should contain:
         *       - valid: true
         *     If meter reading is not plausible, the response should contain:
         *       - valid: false
         *
         */
        export interface ExtensionHookMeterReadingPlausibilityCheck {
            type: "meterReadingPlausibilityCheck";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * JSON body to use for authentication. Supports variable interpolation.
                 */
                body: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
            };
            /**
             * Response to the call
             */
            resolved: {
                /**
                 * Indicate whether the meter reading is plausible
                 * example:
                 * {{CallResponse.data.valid}}
                 */
                valid?: string;
                /**
                 * Upper allowed limit of the meter reading
                 * example:
                 * {{CallResponse.data.upper_limit}}
                 */
                upper_limit?: string;
                /**
                 * Lower allowed limit of the meter reading
                 * example:
                 * {{CallResponse.data.lower_limit}}
                 */
                lower_limit?: string;
            };
        }
        /**
         * Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
         *   - 200 with the time series data
         *
         */
        export interface ExtensionHookPriceDataRetrieval {
            type: "priceDataRetrieval";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * HTTP method to use for the call
                 */
                method?: string;
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers?: {
                    [name: string]: string;
                };
            };
            resolved?: {
                /**
                 * Optional path to the data (array) in the response. If omitted, the data is assumed to be on the top level.
                 */
                dataPath?: string;
            };
        }
        /**
         * Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
         *   - 200 with contact id if exactly one contact is found
         *   - 404 if no contact is found or more than contact is found
         *
         */
        export interface ExtensionHookRegistrationIdentifiersCheck {
            type: "registrationIdentifiersCheck";
            auth?: ExtensionAuthBlock;
            call: {
                /**
                 * URL to call. Supports variable interpolation.
                 */
                url: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
                /**
                 * Headers to use. Supports variable interpolation.
                 */
                headers: {
                    [name: string]: string;
                };
                /**
                 * Contact ID usually retrieved from the response body, e.g. `{{CallResponse.data.contact_id}}`. Supports variable interpolation.
                 */
                result: string;
            };
        }
        export interface ExtensionSeamlessLink {
            /**
             * Identifier of the link. Should not change between updates.
             */
            id: string;
            /**
             * Name of the extension.
             */
            name: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
            /**
             * Name of the extension.
             */
            description?: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
            type: "seamless";
            /**
             * Controls whether the link should be shown. Supports variable interpolation.
             * example:
             * {{Contact.customer_number | is_not_empty}}
             */
            condition?: string;
            auth?: ExtensionAuthBlock;
            redirect: {
                /**
                 * URL to redirect to. Supports variable interpolation.
                 */
                url?: string;
                /**
                 * Parameters to append to the URL. Supports variable interpolation.
                 */
                params?: {
                    [name: string]: string;
                };
            };
        }
        export interface ExternalLink {
            /**
             * Unique identifier for the external link
             */
            id: string;
            label: {
                [name: string]: string;
            };
            type: "link" | "journey" | "seamless";
            /**
             * The URL of the external link
             */
            link: string;
            rules?: {
                [key: string]: any;
            }[];
            /**
             * Attribute associated with the link
             */
            attribute?: string;
            /**
             * Entity associated with the link
             */
            entity?: string;
            /**
             * Attribute value for the link
             */
            attribute_value?: string;
            /**
             * Configuration of the icon for the external link
             */
            icon?: {
                /**
                 * The name of the icon
                 */
                name?: string;
                /**
                 * The color of the icon
                 */
                color?: string;
                /**
                 * Size of the icon in pixels
                 */
                size?: number;
            };
            /**
             * Seamless link identifier in a form of [extensionId, linkId]
             */
            extension_link_id?: string[];
        }
        export type ExtraSchemaAttributes = {
            /**
             * Attribute name
             */
            name: string;
            /**
             * Attribute label
             */
            label: string;
            /**
             * Attribute group
             */
            group: string;
        }[];
        export interface FailedRuleErrorResp {
            /**
             * Error message
             */
            message?: string;
            /**
             * Failed validation rule
             */
            failed_rule?: {
                [key: string]: any;
            };
        }
        /**
         * The file entity
         */
        export interface File {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "file";
        }
        /**
         * The file entity
         */
        export interface FileItem {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "file";
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            access_control?: "private" | "public-read";
            /**
             * The date used for sorting the file
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            file_date?: string; // date-time
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            /**
             * Human readable type for file
             */
            type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            _relations?: {
                entity_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
                _schema?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * The title of the parent entity
                 * example:
                 * Opportunity ABC
                 */
                _title?: string;
            }[];
            /**
             * Indicate whether the user has not seen/downloaded the file before
             */
            is_new?: boolean;
        }
        export interface Grant {
            /**
             * Action for granting permission
             * example:
             * entity-read
             */
            action: string;
            /**
             * Resource for granting permission
             * example:
             * entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947
             */
            resource?: string;
            /**
             * Effect of the permission
             */
            effect?: "allow" | "deny";
        }
        export interface IdentifierAttribute {
            /**
             * Label attribute
             */
            label?: string;
            /**
             * Name of the attribute
             */
            name?: string;
            /**
             * Type of the secondary attribute
             */
            type?: string;
        }
        /**
         * An entity that describes an installment billing event.
         */
        export interface InstallmentEvent {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: {
                    /**
                     * Entity ID for the related contract.
                     * example:
                     * f589786b-3024-43cd-9cb3-5a3c953f2896
                     */
                    entity_id?: string;
                }[];
            };
            /**
             * Type of the billing event.
             * example:
             * installment
             */
            type: "installment";
            /**
             * Date on which the installment is due.
             */
            due_date: string; // date
            /**
             * Date on which the installment is paid by the customer.
             */
            paid_date?: string; // date
        }
        export interface JourneyActions {
            journey_id?: string | null;
            action_label?: ActionLabel;
            slug?: string | null;
            rules?: Rule[] | null;
        }
        /**
         * The meter entity
         */
        export interface Meter {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "meter";
        }
        export interface MeterChartWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            schema?: string;
        }
        export interface MeterReading {
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * example:
             * Storing the feed-in record
             */
            Reason;
            /**
             * The ID of the associated meter
             */
            meter_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * The ID of the associated meter counter
             */
            counter_id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10T00:00:00.000Z
             */
            timestamp?: string;
            /**
             * The source of the reading
             */
            source: Source;
            /**
             * The status of the reading
             */
            status?: ReadingStatus;
        }
        export interface MeterReadingPhoto {
            /**
             * example:
             * Reading 10.01.2025.jpg
             */
            filename: string;
            /**
             * example:
             * image/jpeg
             */
            mime_type: string;
            /**
             * Base64 encoded image
             * example:
             * data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYFxgYFxgYHSggGBolHRgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUt
             */
            contents: string;
            /**
             * The ID of the associated Meter
             */
            meter_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
        }
        export interface MeterReadingPhotoData {
            /**
             * example:
             * Reading 10.01.2025.jpg
             */
            filename: string;
            s3ref: {
                /**
                 * S3 bucket name
                 * example:
                 * meter-readings
                 */
                bucket: string;
                /**
                 * S3 key
                 * example:
                 * uuid/reading-10.01.2025.jpg
                 */
                key: string;
            };
            /**
             * example:
             * 000123.45
             */
            reading?: string;
            /**
             * example:
             * water
             */
            meter_type?: string;
            /**
             * example:
             * 00123456
             */
            meter_number?: string;
        }
        export interface MeterReadingWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            schema?: string;
        }
        export interface OIDCProviderConfig {
            /**
             * Issuing Authority URL
             * example:
             * https://login.microsoftonline.com/33d4f3e5-3df2-421e-b92e-a63cfa680a88/v2.0
             */
            oidc_issuer: string;
            /**
             * Redirect URI for the OIDC flow
             * example:
             * https://customer-portal.com/login
             */
            redirect_uri?: string;
            /**
             * example:
             * ab81daf8-8b1f-42d6-94ca-c51621054c75
             */
            client_id: string;
            /**
             * example:
             * 7BIUnn~6shh.7fNtXb..3k1Mp3s6k6WK3B
             */
            client_secret?: string;
            /**
             * Space-separated list of OAuth 2.0 scopes to request from OpenID Connect
             * example:
             * openid email
             */
            scope: string;
            metadata?: OIDCProviderMetadata;
        }
        export interface OIDCProviderMetadata {
            /**
             * URL of the authorization endpoint
             * example:
             * https://www.facebook.com/v12.0/dialog/oauth
             */
            authorization_endpoint?: string;
            /**
             * URL of the token endpoint
             * example:
             * https://graph.facebook.com/v12.0/oauth/access_token
             */
            token_endpoint?: string;
            /**
             * URL of the userinfo endpoint
             * example:
             * https://graph.facebook.com/me
             */
            userinfo_endpoint?: string;
            /**
             * URL of the mobile redirect URI
             * example:
             * msauth.io.epilot.ecp://auth
             */
            mobile_redirect_uri?: string;
        }
        /**
         * The opportunity entity
         */
        export interface Opportunity {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "opportunity";
        }
        /**
         * The order entity
         */
        export interface Order {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "order";
        }
        export interface OrganizationSettings {
            automation_entity_mapping?: {
                /**
                 * Enable/Disable automation entity mapping
                 */
                enabled?: boolean;
            };
            automation_preview?: {
                /**
                 * Enable/Disable automation preview
                 */
                enabled?: boolean;
            };
            central_inbox_preview_setting?: {
                /**
                 * Enable/Disable central inbox preview setting
                 */
                enabled?: boolean;
            };
            contracts_preview_setting?: {
                /**
                 * Enable/Disable contracts preview setting
                 */
                enabled?: boolean;
            };
            disable_ivy?: {
                /**
                 * Enable/Disable Ivy
                 */
                enabled?: boolean;
            };
            double_opt_in?: {
                /**
                 * Enable/Disable double opt-in
                 */
                enabled?: boolean;
            };
            ecommerce_catalog_preview?: {
                /**
                 * Enable/Disable ecommerce catalog preview
                 */
                enabled?: boolean;
            };
            ecommerce_opportunities_preview?: {
                /**
                 * Enable/Disable ecommerce opportunities preview
                 */
                enabled?: boolean;
            };
            ecommerce_preview?: {
                /**
                 * Enable/Disable ecommerce preview
                 */
                enabled?: boolean;
            };
            end_customer_portal?: {
                /**
                 * Enable/Disable end customer portal
                 */
                enabled?: boolean;
            };
            installer_portal?: {
                /**
                 * Enable/Disable installer portal
                 */
                enabled?: boolean;
            };
            entity_schema_builder?: {
                /**
                 * Enable/Disable entity schema builder
                 */
                enabled?: boolean;
            };
            logic_editor_preview?: {
                /**
                 * Enable/Disable logic editor preview
                 */
                enabled?: boolean;
            };
            new_navigation?: {
                /**
                 * Enable/Disable new navigation
                 */
                enabled?: boolean;
            };
            partnering?: {
                /**
                 * Enable/Disable partnering
                 */
                enabled?: boolean;
            };
            "product-availability"?: {
                /**
                 * Enable/Disable product availability
                 */
                enabled?: boolean;
            };
            sso?: {
                /**
                 * Enable/Disable single sign-on (SSO)
                 */
                enabled?: boolean;
            };
            submission_preview?: {
                /**
                 * Enable/Disable submission preview
                 */
                enabled?: boolean;
            };
            user_roles_preview?: {
                /**
                 * Enable/Disable user roles preview
                 */
                enabled?: boolean;
            };
        }
        /**
         * Origin of the portal
         */
        export type Origin = "END_CUSTOMER_PORTAL" | "INSTALLER_PORTAL";
        export interface PaymentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
        }
        export interface PortalConfig {
            /**
             * Enable/Disable the portal access
             */
            enabled?: boolean;
            /**
             * A short name to identify your portal
             * example:
             * Installer Portal
             */
            name?: string;
            /**
             * The URL on which the portal is accessible
             * example:
             * abc.com
             */
            domain?: string;
            /**
             * Mark true if the domain is an Epilot domain
             */
            is_epilot_domain?: boolean;
            design_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
            /**
             * Feature settings for the portal
             */
            feature_settings?: {
                /**
                 * Start page feature flag
                 */
                start_page?: boolean;
                /**
                 * Billing feature flag
                 */
                billing?: boolean;
                /**
                 * Change due date feature flag
                 */
                change_due_date?: boolean;
                /**
                 * Enable or disable the new design for the portal
                 */
                new_design?: boolean;
            };
            /**
             * Access token for the portal
             */
            accessToken?: string;
            advanced_mfa?: {
                /**
                 * Advanced MFA feature flag
                 */
                enabled?: boolean;
            };
            /**
             * AWS Cognito Pool details for the portal
             */
            cognito_details?: {
                /**
                 * Cognito user pool client ID
                 * example:
                 * 6bsd0jkgoie74k2i8mrhc1vest
                 */
                cognito_user_pool_client_id?: string;
                /**
                 * Cognito user pool ARN
                 * example:
                 * arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341
                 */
                cognito_user_pool_arn?: string;
                /**
                 * Cognito user pool ID
                 * example:
                 * eu-central-1_CUEQRNbUb
                 */
                cognito_user_pool_id?: string;
                /**
                 * Password policy for the portal
                 */
                password_policy?: {
                    /**
                     * Minimum password length
                     * example:
                     * 8
                     */
                    minimum_length?: number;
                    /**
                     * Require lowercase characters
                     * example:
                     * true
                     */
                    require_lowercase?: boolean;
                    /**
                     * Require uppercase characters
                     * example:
                     * true
                     */
                    require_uppercase?: boolean;
                    /**
                     * Require numbers
                     * example:
                     * true
                     */
                    require_numbers?: boolean;
                    /**
                     * Require symbols
                     * example:
                     * true
                     */
                    require_symbols?: boolean;
                };
            };
            /**
             * Stringified object with configuration details
             */
            config?: string;
            /**
             * Deprecated. Use registration_identifiers instead.
             * example:
             * [
             *   "email",
             *   "last_name"
             * ]
             */
            contact_identifiers?: string[];
            /**
             * example:
             * {
             *   "contact": [
             *     "name",
             *     "address"
             *   ],
             *   "contract": [
             *     "installment_amount"
             *   ]
             * }
             */
            approval_state_attributes?: {
                [name: string]: string[];
            };
            email_templates?: /* Email templates used for authentication and internal processes */ EmailTemplates;
            /**
             * Teaser & Banner Image web links
             */
            images?: {
                /**
                 * URL of the order left teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg
                 */
                orderLeftTeaser?: string | null;
                /**
                 * URL of the order right teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg
                 */
                orderRightTeaser?: string | null;
                /**
                 * URL of the welcome banner image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg
                 */
                welcomeBanner?: string | null;
            };
            /**
             * Identifiers used to identify an entity by a portal user. Deprecated. Use contract_identifiers instead.
             */
            entity_identifiers?: {
                type?: {
                    /**
                     * Enable/Disable the entity identifier
                     */
                    isEnabled?: boolean;
                    /**
                     * Attributes used to identify an entity
                     */
                    attributes?: string[];
                };
            };
            /**
             * Identifiers to identify a contract by a portal user.
             * example:
             * [
             *   {
             *     "name": "email",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            contract_identifiers?: ContractIdentifier[];
            /**
             * Identifiers to identify a contact of a portal user during the registration.
             * example:
             * [
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            registration_identifiers?: ContractIdentifier[];
            /**
             * Journeys automatically opened on a portal user action
             */
            triggered_journeys?: {
                trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER";
                journey_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
            }[];
            /**
             * Rules for editing an entity by a portal user
             */
            entity_edit_rules?: {
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * example:
                 * first_name
                 */
                attribute?: string;
                rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments";
                cadence_period_type?: "days" | "weeks" | "months";
                /**
                 * example:
                 * 1
                 */
                cadence_period?: number;
                /**
                 * example:
                 * 1
                 */
                changes_allowed?: number;
                /**
                 * example:
                 * 1
                 */
                grace_period?: number;
                /**
                 * example:
                 * 10%
                 */
                allowed_increment?: string;
                /**
                 * example:
                 * 10%
                 */
                allowed_decrement?: string;
                /**
                 * example:
                 * 10
                 */
                number_of_days_before_restriction?: number;
            }[];
            allowed_file_extensions?: /* Allowed file extensions for upload */ AllowedFileExtensions;
            /**
             * Prevent indexing by search engines
             */
            prevent_search_engine_indexing?: boolean;
            /**
             * ID of the organization
             * example:
             * 12345
             */
            id?: string;
            /**
             * ID of the organization
             * example:
             * 12345
             */
            organization_id?: string;
            origin?: /* Origin of the portal */ Origin;
            /**
             * Organization settings
             */
            org_settings?: {
                /**
                 * Canary feature flag
                 */
                canary?: {
                    /**
                     * Enable/Disable the canary feature
                     */
                    enabled?: boolean;
                };
                /**
                 * Disable Advanced Usage Metrics
                 */
                notracking?: {
                    /**
                     * Disable browser-side scripts that track advanced usage metrics
                     */
                    enabled?: boolean;
                };
            };
            /**
             * Feature flags for the portal
             */
            feature_flags?: {
                [name: string]: boolean;
            };
            /**
             * Permissions granted to a portal user while accessing entities
             */
            grants?: Grant[];
            identity_providers?: ProviderPublicConfig[];
        }
        /**
         * The portal user entity
         */
        export interface PortalUser {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "portal_user";
        }
        export type PortalWidget = EntityWidget | ContentWidget | ActionWidget | TeaserWidget | DocumentWidget | PaymentWidget | MeterReadingWidget | MeterChartWidget;
        /**
         * The product entity
         */
        export interface Product {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "product";
        }
        export interface ProviderConfig {
            slug?: /**
             * URL-friendly slug to use as organization-unique identifier for Provider
             * example:
             * office-365-login
             */
            ProviderSlug /* [0-9a-z-]+ */;
            display_name: /**
             * Human-readable display name for identity provider shown in login
             * example:
             * Office 365 Login
             */
            ProviderDisplayName;
            provider_type: "OIDC";
            attribute_mappings?: /* Dictionary of epilot user attributes to claims */ AttributeMappingConfig;
            oidc_config?: OIDCProviderConfig;
        }
        /**
         * Human-readable display name for identity provider shown in login
         * example:
         * Office 365 Login
         */
        export type ProviderDisplayName = string;
        export interface ProviderPublicConfig {
            slug: /**
             * URL-friendly slug to use as organization-unique identifier for Provider
             * example:
             * office-365-login
             */
            ProviderSlug /* [0-9a-z-]+ */;
            display_name: /**
             * Human-readable display name for identity provider shown in login
             * example:
             * Office 365 Login
             */
            ProviderDisplayName;
            oidc_config?: OIDCProviderConfig;
        }
        /**
         * URL-friendly slug to use as organization-unique identifier for Provider
         * example:
         * office-365-login
         */
        export type ProviderSlug = string; // [0-9a-z-]+
        export interface PublicContractIdentificationDetails {
            /**
             * Explanation of the hook.
             */
            explanation?: {
                [name: string]: string;
                /**
                 * Explanation of the functionality shown to the end user.
                 * example:
                 * This process will give you access to all Contracts kept
                 */
                en: string;
            };
        }
        export interface PublicDataRetrievalHookDetails {
            /**
             * Identifier of the hook.
             */
            id?: string;
            name?: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
            /**
             * The intervals associated with the hook.
             */
            intervals?: string[];
        }
        export interface PublicExtensionCapabilities {
            consumptionDataRetrieval?: DataRetrievalItem[];
            priceDataRetrieval?: DataRetrievalItem[];
            costDataRetrieval?: DataRetrievalItem[];
            contractIdentification?: {
                extension?: PublicExtensionDetails;
                hook?: PublicContractIdentificationDetails;
            };
        }
        export interface PublicExtensionDetails {
            /**
             * Identifier of the extension.
             */
            id?: string;
            name?: {
                [name: string]: string;
                /**
                 * Name of the extension in English.
                 */
                en: string;
            };
        }
        /**
         * The person who recorded the reading
         * example:
         * John Doe
         */
        export type ReadBy = string | null;
        export type ReadingStatus = "valid" | "in-validation" | "implausible" | null | "";
        /**
         * The reason for recording the reading
         * example:
         * Storing the feed-in record
         */
        export type Reason = string | null;
        export interface RegistrationIdentifier {
            /**
             * Name of the identifier/attribute
             */
            name?: string;
            schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
        }
        /**
         * An entity that describes a reimbursement billing event.
         */
        export interface ReimbursementEvent {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: {
                    /**
                     * Entity ID for the related contract.
                     * example:
                     * f589786b-3024-43cd-9cb3-5a3c953f2896
                     */
                    entity_id?: string;
                }[];
            };
            /**
             * Type of the billing event.
             * example:
             * reimbursement
             */
            type: "reimbursement";
            /**
             * Date on which the installment is due.
             */
            due_date?: string; // date
            /**
             * Date on which the customer is reimbursed.
             */
            paid_date?: string; // date
        }
        export interface Rule {
            entity?: string | null;
            attribute?: string | null;
            attribute_value?: string | null;
        }
        export interface SAMLProviderConfig {
        }
        export interface SSOCallbackRequest {
            /**
             * URL of the authorization endpoint
             * example:
             * https://www.facebook.com/v12.0/dialog/oauth
             */
            token_endpoint: string;
            /**
             * The grant type
             * example:
             * authorization_code
             */
            grant_type: string;
            /**
             * The code received from the external SSO provider
             * example:
             * 123456
             */
            code: string;
            /**
             * The redirect uri
             * example:
             * https://customer-portal.com/login
             */
            redirect_uri: string;
            /**
             * The client id
             * example:
             * 123456
             */
            client_id: string;
            /**
             * The client secret
             * example:
             * 123456
             */
            client_secret: string;
            /**
             * The code verifier
             * example:
             * 123456
             */
            code_verifier: string;
        }
        export interface SSOCallbackResponse {
            /**
             * The access token
             * example:
             * 123456
             */
            access_token: string;
            /**
             * The token type
             * example:
             * Bearer
             */
            token_type: string;
            /**
             * The expires in
             * example:
             * 3600
             */
            expires_in: number;
            /**
             * The refresh token
             * example:
             * 123456
             */
            refresh_token: string;
            /**
             * The id token
             * example:
             * 123456
             */
            id_token: string;
        }
        export type SSOLoginToken = string;
        export interface SaveEntityFile {
            entity_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            /**
             * Entity type
             * example:
             * order
             */
            entity_type: string;
            files: {
                /**
                 * File name
                 * example:
                 * document.pdf
                 */
                filename: string;
                /**
                 * Access control level for the file. Deprecated - all files are private.
                 */
                access_control?: "private" | "public-read";
                s3ref: {
                    /**
                     * S3 bucket name
                     * example:
                     * 12345
                     */
                    bucket: string;
                    /**
                     * S3 key
                     * example:
                     * 12345
                     */
                    key: string;
                };
            }[];
        }
        export interface SavePortalFile {
            /**
             * Origin of the portal
             */
            origin: /* Origin of the portal */ Origin;
            files: {
                /**
                 * File name
                 * example:
                 * 12345
                 */
                filename?: string;
                /**
                 * File type
                 * example:
                 * orderRightTeaser
                 */
                file_type: string;
                /**
                 * Array of file tags
                 * example:
                 * 12345
                 */
                _tags?: string[];
                s3ref?: {
                    /**
                     * S3 bucket name
                     * example:
                     * 12345
                     */
                    bucket: string;
                    /**
                     * S3 key
                     * example:
                     * 12345
                     */
                    key: string;
                };
            }[];
        }
        export interface Schema {
            [name: string]: any;
            /**
             * Slug of the schema
             * example:
             * contact
             */
            slug?: string;
        }
        export type Source = "ECP" | "ERP" | "360" | "journey-submission";
        export type TariffType = "ht" | "nt";
        export interface TeaserWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
            imageUrl?: string;
            button?: {
                label?: {
                    en?: string;
                    de?: string;
                };
                url?: string;
            };
        }
        export interface TriggerPortalFlow {
            /**
             * Id of the activity
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            activity_id?: string;
            ecp_config?: {
                file_config?: {
                    /**
                     * Indicate whether the file is shared with the end customer
                     */
                    shared_with_end_customer?: boolean;
                    /**
                     * Array of entity tags
                     * example:
                     * [
                     *   "example",
                     *   "mock"
                     * ]
                     */
                    _tags?: string[];
                };
            };
        }
        export interface UpdateOnlyPortalConfigAttributes {
            /**
             * Journey actions allowed on an entity by a portal user
             */
            entity_actions?: {
                journey_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                action_Label?: {
                    en?: string;
                    de?: string;
                };
            }[];
            /**
             * Configured Portal extensions
             */
            extensions?: ExtensionConfig[];
            /**
             * Configured Portal extensions hooks
             */
            extension_hooks?: {
                [name: string]: ExtensionHookConfig;
            };
            /**
             * Default 360 user to notify upon an internal notification
             */
            default_user_to_notify?: {
                /**
                 * Default admin users for pending user notification to notify
                 */
                onPendingUser?: AdminUser[];
            };
        }
        export interface UpsertPortalConfig {
            /**
             * Journey actions allowed on an entity by a portal user
             */
            entity_actions?: {
                journey_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                action_Label?: {
                    en?: string;
                    de?: string;
                };
            }[];
            /**
             * Configured Portal extensions
             */
            extensions?: ExtensionConfig[];
            /**
             * Configured Portal extensions hooks
             */
            extension_hooks?: {
                [name: string]: ExtensionHookConfig;
            };
            /**
             * Default 360 user to notify upon an internal notification
             */
            default_user_to_notify?: {
                /**
                 * Default admin users for pending user notification to notify
                 */
                onPendingUser?: AdminUser[];
            };
            /**
             * Enable/Disable the portal access
             */
            enabled?: boolean;
            /**
             * A short name to identify your portal
             * example:
             * Installer Portal
             */
            name?: string;
            /**
             * The URL on which the portal is accessible
             * example:
             * abc.com
             */
            domain?: string;
            /**
             * Mark true if the domain is an Epilot domain
             */
            is_epilot_domain?: boolean;
            design_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
            self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
            /**
             * Feature settings for the portal
             */
            feature_settings: {
                /**
                 * Start page feature flag
                 */
                start_page?: boolean;
                /**
                 * Billing feature flag
                 */
                billing?: boolean;
                /**
                 * Change due date feature flag
                 */
                change_due_date?: boolean;
                /**
                 * Enable or disable the new design for the portal
                 */
                new_design?: boolean;
            };
            /**
             * Access token for the portal
             */
            accessToken?: string;
            advanced_mfa?: {
                /**
                 * Advanced MFA feature flag
                 */
                enabled?: boolean;
            };
            /**
             * AWS Cognito Pool details for the portal
             */
            cognito_details?: {
                /**
                 * Cognito user pool client ID
                 * example:
                 * 6bsd0jkgoie74k2i8mrhc1vest
                 */
                cognito_user_pool_client_id?: string;
                /**
                 * Cognito user pool ARN
                 * example:
                 * arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341
                 */
                cognito_user_pool_arn?: string;
                /**
                 * Cognito user pool ID
                 * example:
                 * eu-central-1_CUEQRNbUb
                 */
                cognito_user_pool_id?: string;
                /**
                 * Password policy for the portal
                 */
                password_policy?: {
                    /**
                     * Minimum password length
                     * example:
                     * 8
                     */
                    minimum_length?: number;
                    /**
                     * Require lowercase characters
                     * example:
                     * true
                     */
                    require_lowercase?: boolean;
                    /**
                     * Require uppercase characters
                     * example:
                     * true
                     */
                    require_uppercase?: boolean;
                    /**
                     * Require numbers
                     * example:
                     * true
                     */
                    require_numbers?: boolean;
                    /**
                     * Require symbols
                     * example:
                     * true
                     */
                    require_symbols?: boolean;
                };
            };
            /**
             * Stringified object with configuration details
             */
            config: string;
            /**
             * Deprecated. Use registration_identifiers instead.
             * example:
             * [
             *   "email",
             *   "last_name"
             * ]
             */
            contact_identifiers?: string[];
            /**
             * example:
             * {
             *   "contact": [
             *     "name",
             *     "address"
             *   ],
             *   "contract": [
             *     "installment_amount"
             *   ]
             * }
             */
            approval_state_attributes?: {
                [name: string]: string[];
            };
            email_templates?: /* Email templates used for authentication and internal processes */ EmailTemplates;
            /**
             * Teaser & Banner Image web links
             */
            images?: {
                /**
                 * URL of the order left teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg
                 */
                orderLeftTeaser?: string | null;
                /**
                 * URL of the order right teaser image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg
                 */
                orderRightTeaser?: string | null;
                /**
                 * URL of the welcome banner image
                 * example:
                 * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg
                 */
                welcomeBanner?: string | null;
            };
            /**
             * Identifiers used to identify an entity by a portal user. Deprecated. Use contract_identifiers instead.
             */
            entity_identifiers?: {
                type?: {
                    /**
                     * Enable/Disable the entity identifier
                     */
                    isEnabled?: boolean;
                    /**
                     * Attributes used to identify an entity
                     */
                    attributes?: string[];
                };
            };
            /**
             * Identifiers to identify a contract by a portal user.
             * example:
             * [
             *   {
             *     "name": "email",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            contract_identifiers?: ContractIdentifier[];
            /**
             * Identifiers to identify a contact of a portal user during the registration.
             * example:
             * [
             *   {
             *     "name": "last_name",
             *     "schema": "contact"
             *   },
             *   {
             *     "name": "contract_number",
             *     "schema": "contract"
             *   }
             * ]
             */
            registration_identifiers?: ContractIdentifier[];
            /**
             * Journeys automatically opened on a portal user action
             */
            triggered_journeys?: {
                trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER";
                journey_id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                EntityId /* uuid */;
            }[];
            /**
             * Rules for editing an entity by a portal user
             */
            entity_edit_rules?: {
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * example:
                 * first_name
                 */
                attribute?: string;
                rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments";
                cadence_period_type?: "days" | "weeks" | "months";
                /**
                 * example:
                 * 1
                 */
                cadence_period?: number;
                /**
                 * example:
                 * 1
                 */
                changes_allowed?: number;
                /**
                 * example:
                 * 1
                 */
                grace_period?: number;
                /**
                 * example:
                 * 10%
                 */
                allowed_increment?: string;
                /**
                 * example:
                 * 10%
                 */
                allowed_decrement?: string;
                /**
                 * example:
                 * 10
                 */
                number_of_days_before_restriction?: number;
            }[];
            allowed_file_extensions?: /* Allowed file extensions for upload */ AllowedFileExtensions;
            /**
             * Prevent indexing by search engines
             */
            prevent_search_engine_indexing?: boolean;
        }
        export interface UpsertPortalWidget {
            widgets: PortalWidget[];
        }
        export interface UserRequest {
            /**
             * User's email address
             * example:
             * testemail921@yopmail.com
             */
            email?: string;
            /**
             * First Name of the portal user
             * example:
             * John
             */
            first_name?: string;
            /**
             * Last Name of the portal user
             * example:
             * Doe
             */
            last_name?: string;
            /**
             * ID of the contact
             */
            contactId?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
        }
        export interface WidgetAction {
            _id: string;
            type: "link" | "journey";
            label: {
                en?: string;
                de?: string;
            };
            url: string;
            rules?: {
                attribute: string;
                attribute_value: string;
                entity: string;
            }[];
        }
        export interface WidgetBase {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET";
            /**
             * Index of the widget in the list, used for ordering (left or right)
             */
            listIndex: number;
            headline?: {
                en?: string;
                de?: string;
            };
            subHeadline?: {
                en?: string;
                de?: string;
            };
        }
        /**
         * Workflow identifier object
         */
        export interface WorfklowIdentifier {
            defition_id?: string;
            name?: string;
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
            [name: string]: any;
        }
        /**
         * example:
         * {
         *   "startedTime": "2024-01-12T13:29:55.942Z",
         *   "requirements": [],
         *   "created": "2023-10-20T17:41:10.256Z",
         *   "executionType": "MANUAL",
         *   "assignedToInProgress": "-",
         *   "sectionId": "lzxsw2sblj7",
         *   "type": "STEP",
         *   "entityRefId": "q1d6vcbsqvn",
         *   "assignedTo": [
         *     "10014532"
         *   ],
         *   "lastUpdated": "2024-01-13T05:18:43.838Z",
         *   "ecp": {},
         *   "userIds": [],
         *   "name": "Hinterlege den vereinbarten LIC Termin",
         *   "id": "q1d6vcbsqvn",
         *   "definitionId": "9UjHKq",
         *   "status": "COMPLETED",
         *   "manuallyCreated": false,
         *   "enabled": true,
         *   "completedTime": "2024-01-13T05:18:43.827Z"
         * }
         */
        export interface WorkflowStep {
            [name: string]: any;
        }
    }
}
declare namespace Paths {
    namespace AddContractByIdentifiers {
        /**
         * Identifier-value pairs per schema to identify the contract
         * example:
         * {
         *   "contract": {
         *     "contract_number": "123456"
         *   },
         *   "meter": {
         *     "meter_number": "123456"
         *   }
         * }
         */
        export interface RequestBody {
            [name: string]: {
                [name: string]: string;
            };
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.EntityItem[];
                hits: number;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.ContractAssignmentConflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CanTriggerPortalFlow {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.TriggerPortalFlow;
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the flow can be triggered
                 * example:
                 * true
                 */
                can_trigger?: boolean;
            }
        }
    }
    namespace CheckContactExists {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.ContactExistsRequest;
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the contact exists with the given identifier values
                 * example:
                 * true
                 */
                exists?: boolean;
                /**
                 * ID of the contact if exists
                 */
                contactId?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ConfigureDistribution {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * The domain name of the configured distribution
                 * example:
                 * dsj8op4ha01jha23.cloudfront.net
                 */
                domainName?: string;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ConfirmUser {
        namespace Parameters {
            /**
             * Confirmation link token
             */
            export type ConfirmationLinkToken = string;
            /**
             * Should the operation result in a 301 redirect
             */
            export type UseRedirect = boolean;
        }
        export interface QueryParameters {
            confirmation_link_token: /* Confirmation link token */ Parameters.ConfirmationLinkToken;
            use_redirect?: /* Should the operation result in a 301 redirect */ Parameters.UseRedirect;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Is the user confirmed
                 * example:
                 * true
                 */
                confirmed: boolean;
            }
            export interface $301 {
            }
            export type $400 = Components.Responses.ConfirmUserInvalidRequest;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ConfirmUserWithUserId {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            /**
             * example:
             * 123
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
            org_id: /**
             * example:
             * 123
             */
            Parameters.OrgId;
        }
        namespace Responses {
            export interface $301 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateCustomEntityActivity {
        namespace Parameters {
            export type Entities = [
                /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */,
                .../**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */[]
            ];
        }
        export interface QueryParameters {
            entities?: Parameters.Entities;
        }
        export interface RequestBody {
            /**
             * One of supported activity types
             */
            type: "PortalUserResetPassword";
        }
        namespace Responses {
            export type $201 = Components.Schemas.ActivityItem;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateMeterReading {
        namespace Parameters {
            export type OverridePlausibility = boolean;
        }
        export interface QueryParameters {
            override_plausibility?: Parameters.OverridePlausibility;
        }
        export type RequestBody = Components.Schemas.MeterReading;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReading;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateUser {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.CreateUserRequest;
        namespace Responses {
            export interface $201 {
                message: "User created successfully";
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteEntityFile {
        export type RequestBody = Components.Schemas.DeleteEntityFile;
        namespace Responses {
            export interface $202 {
                deletedFiles?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeletePortal {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeletePortalUser {
        namespace Responses {
            export interface $200 {
                message?: "User Succesfully Deleted";
                data?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ExtraPermissionAttributes {
        namespace Responses {
            export interface $200 {
                data?: {
                    contact?: Components.Schemas.ExtraSchemaAttributes;
                    contract?: Components.Schemas.ExtraSchemaAttributes;
                    order?: Components.Schemas.ExtraSchemaAttributes;
                    opportunity?: Components.Schemas.ExtraSchemaAttributes;
                    meter?: Components.Schemas.ExtraSchemaAttributes;
                    meter_counter?: Components.Schemas.ExtraSchemaAttributes;
                };
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace FetchPortalUsersByRelatedEntity {
        namespace Parameters {
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface QueryParameters {
            entity_id: Parameters.EntityId;
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                portalUsers?: /* The portal user entity */ Components.Schemas.PortalUser[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllContracts {
        namespace Parameters {
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 100
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results
             * example:
             * 100
             */
            Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    [name: string]: any;
                    _id: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    Components.Schemas.EntityId /* uuid */;
                    /**
                     * Title of the entity
                     * example:
                     * Example Entity
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 123
                     */
                    _org: string;
                    /**
                     * Array of entity tags
                     * example:
                     * [
                     *   "example",
                     *   "mock"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Creation timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Last update timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _updated_at: string; // date-time
                    /**
                     * The name of the contract.
                     * example:
                     * Grid Contract
                     */
                    contract_name?: string;
                    /**
                     * The unique identifier of the contract.
                     * example:
                     * 12345
                     */
                    contract_number?: string;
                    /**
                     * The status of the contract.
                     * example:
                     * approved
                     */
                    status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
                    /**
                     * A brief description of the contract.
                     * example:
                     * This contract is for the supply of widgets.
                     */
                    description?: string;
                    /**
                     * The account number associated with the contract.
                     * example:
                     * 67890
                     */
                    account_number?: string;
                    /**
                     * The branch associated with the contract.
                     * example:
                     * power
                     */
                    branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
                    /**
                     * The billing address associated with the contract.
                     * example:
                     * 123 Main St, Anytown
                     */
                    billing_address?: string;
                    /**
                     * The delivery address associated with the contract.
                     * example:
                     * 456 Elm St, Anytown
                     */
                    delivery_address?: string;
                    /**
                     * Any additional addresses associated with the contract.
                     * example:
                     * 789 Oak St, Anytown
                     */
                    additional_addresses?: string;
                    /**
                     * The date on which the contract was terminated.
                     * example:
                     * 2022-01-01
                     */
                    termination_date?: string;
                    /**
                     * The reason for the termination of the contract.
                     * example:
                     * Non-payment
                     */
                    termination_reason?: string;
                    /**
                     * The billing period associated with the contract.
                     * example:
                     * monthly
                     */
                    billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
                    /**
                     * The duration of the billing period.
                     * example:
                     * 30
                     */
                    billing_duration_amount?: number;
                    /**
                     * The duration of the renewal period.
                     * example:
                     * 365
                     */
                    renewal_duration_amount?: number;
                    /**
                     * The unit of time for the renewal period.
                     * example:
                     * years
                     */
                    renewal_duration_unit?: "weeks" | "months" | "years";
                    /**
                     * The amount of notice required for termination of the contract.
                     * example:
                     * 30
                     */
                    notice_time_amount?: number;
                    /**
                     * The unit of time for the notice period.
                     * example:
                     * months
                     */
                    notice_time_unit?: "weeks" | "months" | "years";
                    /**
                     * The start date of the contract.
                     * example:
                     * 2021-01-01
                     */
                    start_date?: string;
                    /**
                     * Defines the day of the month in which the installments are due.
                     * example:
                     * 2
                     */
                    billing_due_day?: number;
                    /**
                     * Set amount for installments in cents. (precision 2)
                     * example:
                     * 10050
                     */
                    installment_amount?: number;
                    /**
                     * Current balance of the contract in cents. (precision 2)
                     * example:
                     * 8990
                     */
                    balance?: number;
                    balance_currency?: /**
                     * Currency code in ISO 4217 format
                     * example:
                     * EUR
                     */
                    Components.Schemas.Currency;
                    journey_actions?: Components.Schemas.JourneyActions;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllFiles {
        namespace Parameters {
            /**
             * example:
             * [
             *   "4910096f-000a-4504-bf5a-d3774ec3032a",
             *   "7c9f8536-6266-42e8-a0de-c60b61aa81a7"
             * ]
             */
            export type EntityIds = [
                /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */,
                .../**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */[]
            ];
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 0
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size: /**
             * Size of the search results
             * example:
             * 0
             */
            Parameters.Size;
            entity_ids?: /**
             * example:
             * [
             *   "4910096f-000a-4504-bf5a-d3774ec3032a",
             *   "7c9f8536-6266-42e8-a0de-c60b61aa81a7"
             * ]
             */
            Parameters.EntityIds;
        }
        namespace Responses {
            export interface $200 {
                results?: /* The file entity */ Components.Schemas.FileItem[];
                /**
                 * Total number of files for pagination
                 * example:
                 * 50
                 */
                hits?: number;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllOpportunities {
        namespace Parameters {
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 100
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results
             * example:
             * 100
             */
            Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    [name: string]: any;
                    _id: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    Components.Schemas.EntityId /* uuid */;
                    /**
                     * Title of the entity
                     * example:
                     * Example Entity
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 123
                     */
                    _org: string;
                    /**
                     * Array of entity tags
                     * example:
                     * [
                     *   "example",
                     *   "mock"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Creation timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Last update timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _updated_at: string; // date-time
                    _schema: "opportunity";
                    journey_actions?: Components.Schemas.JourneyActions;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllOrders {
        namespace Parameters {
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 100
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results
             * example:
             * 100
             */
            Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    [name: string]: any;
                    _id: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    Components.Schemas.EntityId /* uuid */;
                    /**
                     * Title of the entity
                     * example:
                     * Example Entity
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 123
                     */
                    _org: string;
                    /**
                     * Array of entity tags
                     * example:
                     * [
                     *   "example",
                     *   "mock"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Creation timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Last update timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _updated_at: string; // date-time
                    _schema: "order";
                    journey_actions?: Components.Schemas.JourneyActions;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllPortalConfigs {
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.PortalConfig[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetBillingEvents {
        namespace Parameters {
            /**
             * List billing events after this date
             */
            export type DateAfter = string; // date-time
            /**
             * List billing events before this date
             */
            export type DateBefore = string; // date-time
            export type EntityId = [
                /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */,
                .../**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */[]
            ];
            /**
             * Type of billing event to filter by
             */
            export type EventType = "installment" | "reimbursement";
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Filter billing events by paid status
             */
            export type Paid = boolean;
            /**
             * Size of the search results.
             * example:
             * 100
             */
            export type Size = number;
            /**
             * Key to sort by
             * example:
             * due_date:asc
             */
            export type Sort = string;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results.
             * example:
             * 100
             */
            Parameters.Size;
            entity_id?: Parameters.EntityId;
            event_type?: /* Type of billing event to filter by */ Parameters.EventType;
            paid?: /* Filter billing events by paid status */ Parameters.Paid;
            date_after?: /* List billing events after this date */ Parameters.DateAfter /* date-time */;
            date_before?: /* List billing events before this date */ Parameters.DateBefore /* date-time */;
            sort?: /**
             * Key to sort by
             * example:
             * due_date:asc
             */
            Parameters.Sort;
        }
        namespace Responses {
            export interface $200 {
                results?: /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ Components.Schemas.BillingEvent[];
                /**
                 * Total number of billing events for pagination
                 * example:
                 * 50
                 */
                hits?: number;
            }
        }
    }
    namespace GetConsumption {
        namespace Parameters {
            export type ExtensionId = string;
            export type From = string; // date-time
            export type HookId = string;
            export type Interval = "PT15M" | "PT1H" | "P1D" | "P1M";
            export type MeterId = string;
            export type To = string; // date-time
        }
        export interface QueryParameters {
            extensionId: Parameters.ExtensionId;
            hookId: Parameters.HookId;
            meter_id: Parameters.MeterId;
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
            interval: Parameters.Interval;
        }
        namespace Responses {
            export interface $200 {
                consumptions?: {
                    /**
                     * ISO 8601 timestamp of the consumption record.
                     */
                    timestamp: string; // date-time
                    /**
                     * The consumption value.
                     */
                    value: number;
                    /**
                     * Optional type of the consumption, such as 'nt' (night time) or 'ht' (high time).
                     */
                    type?: string;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetContact {
        namespace Responses {
            export interface $200 {
                entity?: /* The mapped contact of the portal user */ Components.Schemas.Contact;
                files?: /* The file entity */ Components.Schemas.File[];
                relations?: Components.Schemas.EntityItem[];
                journey_actions?: Components.Schemas.JourneyActions[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetContract {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                entity?: /* The contract entity */ Components.Schemas.Contract;
                /**
                 * The related orders of the requested contract
                 */
                orders?: /* The order entity */ Components.Schemas.Order[];
                /**
                 * The related meters of the requested contract
                 */
                meters?: /* The meter entity */ Components.Schemas.Meter[];
                /**
                 * The related files of the requested contract
                 */
                files?: /* The file entity */ Components.Schemas.File[];
                /**
                 * The related entities of the requested contract
                 */
                relations?: Components.Schemas.EntityItem[];
                workflow?: /**
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
                Components.Schemas.WorkflowExecution[];
                journey_actions?: Components.Schemas.JourneyActions[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetCosts {
        namespace Parameters {
            export type ExtensionId = string;
            export type From = string; // date-time
            export type HookId = string;
            export type Interval = "PT15M" | "PT1H" | "P1D" | "P1M";
            export type MeterId = string;
            export type To = string; // date-time
        }
        export interface QueryParameters {
            extensionId: Parameters.ExtensionId;
            hookId: Parameters.HookId;
            meter_id: Parameters.MeterId;
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
            interval: Parameters.Interval;
        }
        namespace Responses {
            export interface $200 {
                costs?: {
                    /**
                     * ISO 8601 timestamp of the cost record.
                     */
                    timestamp: string; // date-time
                    /**
                     * Cost in cents, e.g. 1234 for 12,34 €.
                     * example:
                     * 1234
                     */
                    unit_amount: number;
                    /**
                     * ISO 4217:2015 currency.
                     * example:
                     * EUR
                     */
                    unit_amount_currency: string;
                    /**
                     * Cost in decimal format, e.g. "12.34".
                     * example:
                     * 12.34
                     */
                    unit_amount_decimal: string;
                    /**
                     * Is the tax (typically Value Added Tax) included in the amounts. Typically should NOT be included - exclusive of tax.
                     * example:
                     * exclusive
                     */
                    tax_behavior: "inclusive" | "exclusive";
                    /**
                     * Tax rate in percent, e.g. 19 for 19%.
                     * example:
                     * 19
                     */
                    tax_rate: number;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetCustomerBalance {
        namespace Responses {
            export type $200 = Components.Schemas.Balance;
        }
    }
    namespace GetECPContact {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface QueryParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                data?: /* The mapped contact of the portal user */ Components.Schemas.Contact;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetEmailTemplates {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = /* Email templates used for authentication and internal processes */ Components.Schemas.EmailTemplates;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetEntityActivityFeed {
        namespace Parameters {
            export type After = string; // date-time
            export type Before = string; // date-time
            export type From = number;
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type IncludeRelations = boolean;
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            /**
             * example:
             * SyncActivity
             */
            export type Type = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            after?: Parameters.After /* date-time */;
            before?: Parameters.Before /* date-time */;
            from?: Parameters.From;
            size?: Parameters.Size;
            type?: /**
             * example:
             * SyncActivity
             */
            Parameters.Type;
            include_relations?: Parameters.IncludeRelations;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.ActivityItem[];
            }
        }
    }
    namespace GetEntityIdentifiers {
        namespace Parameters {
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    /**
                     * The name of the identifier
                     * example:
                     * contract_number
                     */
                    name?: string;
                    /**
                     * The type of the identifier
                     * example:
                     * string
                     */
                    type?: string;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetExternalLinks {
        namespace Parameters {
            export type ContactId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin?: Parameters.Origin;
            contactId?: Parameters.ContactId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExternalLink[];
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetFileById {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                file?: /* The file entity */ Components.Schemas.FileItem;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetFilesCountByEntity {
        namespace Responses {
            export type $200 = Components.Schemas.EntityFileCount[];
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetOpportunity {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                entity?: /* The opportunity entity */ Components.Schemas.Opportunity;
                /**
                 * The related orders of the requested opportunity
                 */
                orders?: /* The order entity */ Components.Schemas.Order[];
                /**
                 * The related files of the requested opportunity
                 */
                files?: /* The file entity */ Components.Schemas.File[];
                /**
                 * The related entities of the requested opportunity
                 */
                relations?: Components.Schemas.EntityItem[];
                /**
                 * The related workflows of the requested opportunity
                 */
                workflow?: /**
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
                Components.Schemas.WorkflowExecution[];
                journey_actions?: Components.Schemas.JourneyActions[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetOrder {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                entity?: /* The order entity */ Components.Schemas.Order;
                /**
                 * The related files of the requested order
                 */
                files?: /* The file entity */ Components.Schemas.File[];
                /**
                 * The related entities of the requested order
                 */
                relations?: Components.Schemas.EntityItem[];
                /**
                 * The related products of the requested order
                 */
                products?: /* The product entity */ Components.Schemas.Product[];
                /**
                 * The related cross sellable products of the requested order
                 */
                crossSellableProducts?: /* The product entity */ Components.Schemas.Product[];
                /**
                 * The related workflows of the requested order
                 */
                workflow?: /**
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
                Components.Schemas.WorkflowExecution[];
                journey_actions?: Components.Schemas.JourneyActions[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetOrgPortalConfig {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Enable/Disable the portal access
                 */
                enabled?: boolean;
                /**
                 * A short name to identify your portal
                 * example:
                 * Installer Portal
                 */
                name?: string;
                /**
                 * The URL on which the portal is accessible
                 * example:
                 * abc.com
                 */
                domain?: string;
                /**
                 * Mark true if the domain is an Epilot domain
                 */
                is_epilot_domain?: boolean;
                design_id: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */;
                self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
                /**
                 * Feature settings for the portal
                 */
                feature_settings?: {
                    /**
                     * Start page feature flag
                     */
                    start_page?: boolean;
                    /**
                     * Billing feature flag
                     */
                    billing?: boolean;
                    /**
                     * Change due date feature flag
                     */
                    change_due_date?: boolean;
                    /**
                     * Enable or disable the new design for the portal
                     */
                    new_design?: boolean;
                };
                /**
                 * Access token for the portal
                 */
                accessToken?: string;
                advanced_mfa?: {
                    /**
                     * Advanced MFA feature flag
                     */
                    enabled?: boolean;
                };
                /**
                 * AWS Cognito Pool details for the portal
                 */
                cognito_details?: {
                    /**
                     * Cognito user pool client ID
                     * example:
                     * 6bsd0jkgoie74k2i8mrhc1vest
                     */
                    cognito_user_pool_client_id?: string;
                    /**
                     * Cognito user pool ARN
                     * example:
                     * arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341
                     */
                    cognito_user_pool_arn?: string;
                    /**
                     * Cognito user pool ID
                     * example:
                     * eu-central-1_CUEQRNbUb
                     */
                    cognito_user_pool_id?: string;
                    /**
                     * Password policy for the portal
                     */
                    password_policy?: {
                        /**
                         * Minimum password length
                         * example:
                         * 8
                         */
                        minimum_length?: number;
                        /**
                         * Require lowercase characters
                         * example:
                         * true
                         */
                        require_lowercase?: boolean;
                        /**
                         * Require uppercase characters
                         * example:
                         * true
                         */
                        require_uppercase?: boolean;
                        /**
                         * Require numbers
                         * example:
                         * true
                         */
                        require_numbers?: boolean;
                        /**
                         * Require symbols
                         * example:
                         * true
                         */
                        require_symbols?: boolean;
                    };
                };
                /**
                 * Stringified object with configuration details
                 */
                config?: string;
                /**
                 * Deprecated. Use registration_identifiers instead.
                 * example:
                 * [
                 *   "email",
                 *   "last_name"
                 * ]
                 */
                contact_identifiers?: string[];
                /**
                 * example:
                 * {
                 *   "contact": [
                 *     "name",
                 *     "address"
                 *   ],
                 *   "contract": [
                 *     "installment_amount"
                 *   ]
                 * }
                 */
                approval_state_attributes?: {
                    [name: string]: string[];
                };
                email_templates?: /* Email templates used for authentication and internal processes */ Components.Schemas.EmailTemplates;
                /**
                 * Teaser & Banner Image web links
                 */
                images?: {
                    /**
                     * URL of the order left teaser image
                     * example:
                     * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg
                     */
                    orderLeftTeaser?: string | null;
                    /**
                     * URL of the order right teaser image
                     * example:
                     * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg
                     */
                    orderRightTeaser?: string | null;
                    /**
                     * URL of the welcome banner image
                     * example:
                     * https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg
                     */
                    welcomeBanner?: string | null;
                };
                /**
                 * Identifiers used to identify an entity by a portal user. Deprecated. Use contract_identifiers instead.
                 */
                entity_identifiers?: {
                    type?: {
                        /**
                         * Enable/Disable the entity identifier
                         */
                        isEnabled?: boolean;
                        /**
                         * Attributes used to identify an entity
                         */
                        attributes?: string[];
                    };
                };
                /**
                 * Identifiers to identify a contract by a portal user.
                 * example:
                 * [
                 *   {
                 *     "name": "email",
                 *     "schema": "contact"
                 *   },
                 *   {
                 *     "name": "last_name",
                 *     "schema": "contact"
                 *   },
                 *   {
                 *     "name": "contract_number",
                 *     "schema": "contract"
                 *   }
                 * ]
                 */
                contract_identifiers?: Components.Schemas.ContractIdentifier[];
                /**
                 * Identifiers to identify a contact of a portal user during the registration.
                 * example:
                 * [
                 *   {
                 *     "name": "last_name",
                 *     "schema": "contact"
                 *   },
                 *   {
                 *     "name": "contract_number",
                 *     "schema": "contract"
                 *   }
                 * ]
                 */
                registration_identifiers?: Components.Schemas.ContractIdentifier[];
                /**
                 * Journeys automatically opened on a portal user action
                 */
                triggered_journeys?: {
                    trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER";
                    journey_id?: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    Components.Schemas.EntityId /* uuid */;
                }[];
                /**
                 * Rules for editing an entity by a portal user
                 */
                entity_edit_rules?: {
                    slug?: /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * contact
                     */
                    Components.Schemas.EntitySlug;
                    /**
                     * example:
                     * first_name
                     */
                    attribute?: string;
                    rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments";
                    cadence_period_type?: "days" | "weeks" | "months";
                    /**
                     * example:
                     * 1
                     */
                    cadence_period?: number;
                    /**
                     * example:
                     * 1
                     */
                    changes_allowed?: number;
                    /**
                     * example:
                     * 1
                     */
                    grace_period?: number;
                    /**
                     * example:
                     * 10%
                     */
                    allowed_increment?: string;
                    /**
                     * example:
                     * 10%
                     */
                    allowed_decrement?: string;
                    /**
                     * example:
                     * 10
                     */
                    number_of_days_before_restriction?: number;
                }[];
                allowed_file_extensions?: /* Allowed file extensions for upload */ Components.Schemas.AllowedFileExtensions;
                /**
                 * Prevent indexing by search engines
                 */
                prevent_search_engine_indexing?: boolean;
                /**
                 * ID of the organization
                 * example:
                 * 12345
                 */
                id?: string;
                /**
                 * ID of the organization
                 * example:
                 * 12345
                 */
                organization_id?: string;
                origin?: /* Origin of the portal */ Components.Schemas.Origin;
                /**
                 * Organization settings
                 */
                org_settings?: {
                    /**
                     * Canary feature flag
                     */
                    canary?: {
                        /**
                         * Enable/Disable the canary feature
                         */
                        enabled?: boolean;
                    };
                    /**
                     * Disable Advanced Usage Metrics
                     */
                    notracking?: {
                        /**
                         * Disable browser-side scripts that track advanced usage metrics
                         */
                        enabled?: boolean;
                    };
                };
                /**
                 * Feature flags for the portal
                 */
                feature_flags?: {
                    [name: string]: boolean;
                };
                /**
                 * Permissions granted to a portal user while accessing entities
                 */
                grants?: Components.Schemas.Grant[];
                identity_providers?: Components.Schemas.ProviderPublicConfig[];
                certificate_details?: {
                    /**
                     * Status of the certificate
                     */
                    status?: "PENDING_VALIDATION" | "ISSUED" | "INACTIVE" | "EXPIRED" | "VALIDATION_TIMED_OUT" | "REVOKED" | "FAILED" | "PENDING_AUTO_RENEWAL";
                    /**
                     * Reason for failed certificate
                     * example:
                     * CAA_ERROR
                     */
                    failed_reason?: string;
                };
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetOrganizationSettings {
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.OrganizationSettings;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPortalConfig {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin?: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PortalConfig;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPortalConfigByDomain {
        namespace Parameters {
            /**
             * Domain of the portal
             * example:
             * example.com
             */
            export type Domain = string;
        }
        export interface QueryParameters {
            domain: /**
             * Domain of the portal
             * example:
             * example.com
             */
            Parameters.Domain;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PortalConfig;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPortalExtensions {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin?: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Extension[];
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPortalUser {
        namespace Responses {
            export interface $200 {
                data?: /* The portal user entity */ Components.Schemas.PortalUser;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPortalWidgets {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin?: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UpsertPortalWidget;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPrices {
        namespace Parameters {
            export type ExtensionId = string;
            export type From = string; // date-time
            export type HookId = string;
            export type Interval = "PT15M" | "PT1H" | "P1D" | "P1M";
            export type MeterId = string;
            export type To = string; // date-time
        }
        export interface QueryParameters {
            extensionId: Parameters.ExtensionId;
            hookId: Parameters.HookId;
            meter_id: Parameters.MeterId;
            from: Parameters.From /* date-time */;
            to: Parameters.To /* date-time */;
            interval: Parameters.Interval;
        }
        namespace Responses {
            export interface $200 {
                prices?: {
                    /**
                     * ISO 8601 timestamp of the price record.
                     */
                    timestamp: string; // date-time
                    /**
                     * Cost in cents, e.g. 1234 for 12,34 €.
                     * example:
                     * 1234
                     */
                    unit_amount: number;
                    /**
                     * ISO 4217:2015 currency.
                     * example:
                     * EUR
                     */
                    unit_amount_currency: string;
                    /**
                     * Cost in decimal format, e.g. "12.34".
                     * example:
                     * 12.34
                     */
                    unit_amount_decimal: string;
                    /**
                     * Optional price components.
                     */
                    components?: {
                        /**
                         * Market price in cents, e.g. 1000 for 10,00 €.
                         * example:
                         * 1000
                         */
                        auction_price_amount?: number;
                        /**
                         * Market price in decimal format, e.g. "10.00".
                         * example:
                         * 10.00
                         */
                        auction_price_amount_decimal?: string;
                        /**
                         * Taxes/Levies other than tax specified on the price level in cents, e.g. 50 for 00,50 €.
                         * example:
                         * 50
                         */
                        taxes_levies_amount?: number;
                        /**
                         * Taxes/Levies other than tax specified on the price level in decimal format, e.g. "0.50".
                         * example:
                         * 0.50
                         */
                        taxes_levies_amount_decimal?: string;
                        /**
                         * Fee associated with the source, e.g. Green Energy Certificate fee in cents, e.g. 50 for 00,50 €.
                         * example:
                         * 50
                         */
                        source_fee_amount?: number;
                        /**
                         * Fee associated with the source, e.g. Green Energy Certificate fee in decimal format, e.g. "0.50".
                         * example:
                         * 0.50
                         */
                        source_fee_amount_decimal?: string;
                        /**
                         * Fee associated with the transmission/distribution in cents, e.g. 100 for 1,00 €.
                         * example:
                         * 100
                         */
                        grid_fee_amount?: number;
                        /**
                         * Fee associated with the transmission/distribution in decimal format, e.g. "1.00".
                         * example:
                         * 1.00
                         */
                        grid_fee_amount_decimal?: string;
                        /**
                         * Margin in cents, e.g. 34 for 0,34 €.
                         * example:
                         * 34
                         */
                        margin_amount?: number;
                        /**
                         * Margin in decimal format, e.g. "0.34".
                         * example:
                         * 0.34
                         */
                        margin_amount_decimal?: string;
                    };
                    /**
                     * Is the tax (typically Value Added Tax) included in the amounts. Typically should NOT be included - exclusive of tax.
                     * example:
                     * exclusive
                     */
                    tax_behavior: "inclusive" | "exclusive";
                    /**
                     * Tax rate in percent, e.g. 19 for 19%.
                     * example:
                     * 19
                     */
                    tax_rate: number;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPublicPortalConfig {
        namespace Parameters {
            /**
             * Organization ID
             * example:
             * 12324
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            org_id: /**
             * Organization ID
             * example:
             * 12324
             */
            Parameters.OrgId;
            origin: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PortalConfig;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPublicPortalExtensionDetails {
        namespace Parameters {
            /**
             * Organization ID
             * example:
             * 12324
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            org_id: /**
             * Organization ID
             * example:
             * 12324
             */
            Parameters.OrgId;
            origin: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PublicExtensionCapabilities;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetPublicPortalWidgets {
        namespace Parameters {
            /**
             * Organization ID
             * example:
             * 123
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            org_id: /**
             * Organization ID
             * example:
             * 123
             */
            Parameters.OrgId;
            origin: Parameters.Origin;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UpsertPortalWidget;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetRecipientsToNotifyOnAutomation {
        export interface RequestBody {
            /**
             * Emails array that are part of the automation
             * example:
             * [
             *   "john@doe.com"
             * ]
             */
            emails: string[];
            /**
             * Email template ID that used on the automation
             */
            template_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Filtered recipients to notify
                 */
                recipients?: {
                    /**
                     * Email of the recipient
                     * example:
                     * john@doe.com
                     */
                    email: string;
                    /**
                     * ID of the recipient
                     */
                    recipient_id: /**
                     * Entity ID
                     * example:
                     * 5da0a718-c822-403d-9f5d-20d4584e0528
                     */
                    Components.Schemas.EntityId /* uuid */;
                }[];
                /**
                 * Reason to not notify the user
                 */
                message?: string;
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetRegistrationIdentifiers {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * {
                 *   "contact": [
                 *     {
                 *       "label": "First name",
                 *       "name": "first_name",
                 *       "type": "string"
                 *     }
                 *   ],
                 *   "contract": [
                 *     {
                 *       "label": "Contract number",
                 *       "name": "contract_number",
                 *       "type": "string"
                 *     }
                 *   ]
                 * }
                 */
                data?: {
                    [name: string]: Components.Schemas.IdentifierAttribute[];
                };
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetResolvedExternalLink {
        namespace Parameters {
            export type ContactId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            origin?: Parameters.Origin;
            contactId?: Parameters.ContactId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ExternalLink;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetSchemas {
        namespace Responses {
            export interface $200 {
                schemas?: Components.Schemas.Schema[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetSearchResultsForOpportunities {
        namespace Parameters {
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 1000
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results
             * example:
             * 1000
             */
            Parameters.Size;
        }
        export interface RequestBody {
            addresses?: string[];
            customers?: string[];
            purposes?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */[];
            workflows?: any[];
        }
        namespace Responses {
            export interface $200 {
                data?: /* The opportunity entity */ Components.Schemas.Opportunity[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetSearchableAttributesForOpportunities {
        namespace Parameters {
            /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            export type From = number;
            /**
             * Size of the search results
             * example:
             * 1000
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * Initial offset to set for the search results
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * Size of the search results
             * example:
             * 1000
             */
            Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                data?: /* The opportunity entity */ Components.Schemas.Opportunity[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetValidSecondaryAttributes {
        namespace Responses {
            export interface $200 {
                data?: {
                    /**
                     * Name of the secondary attribute
                     * example:
                     * first_name
                     */
                    name?: string;
                    /**
                     * Type of the secondary attribute
                     * example:
                     * string
                     */
                    type?: string;
                }[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace LoginToPortalAsUser {
        export interface RequestBody {
            /**
             * The email address of the user to log in as
             * example:
             * portal-customer@email.com
             */
            email?: string;
            origin?: /* Origin of the portal */ Components.Schemas.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * A generated login_as_token to log in to a portal impersonating a user.
                 */
                login_as_token?: string;
            }
        }
    }
    namespace PostOrderAcceptance {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.AcceptanceDecision;
        namespace Responses {
            export interface $200 {
                data?: /* The order entity */ Components.Schemas.Order;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ReplaceECPTemplateVariables {
        export interface RequestBody {
            [name: string]: {
                /**
                 * ID of the entity
                 */
                _id?: /**
                 * Entity ID
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.EntityId /* uuid */;
                is_main_entity?: boolean;
            };
        }
        namespace Responses {
            export interface $200 {
                customerPortal?: {
                    /**
                     * example:
                     * https://end-customer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com
                     */
                    invitationLink?: string;
                    /**
                     * example:
                     * https://end-customer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b
                     */
                    newDocumentLink?: string;
                    /**
                     * example:
                     * https://end-customer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b
                     */
                    entityLink?: string;
                    /**
                     * example:
                     * [
                     *   "john@doe.com",
                     *   "mary@doe.com"
                     * ]
                     */
                    userEmailsOnEntity?: string[];
                };
                installerPortal?: {
                    /**
                     * example:
                     * https://installer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com
                     */
                    invitationLink?: string;
                    /**
                     * example:
                     * https://installer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b
                     */
                    newDocumentLink?: string;
                    /**
                     * example:
                     * https://installer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b
                     */
                    entityLink?: string;
                    /**
                     * example:
                     * [
                     *   "peter@doe.com",
                     *   "jane@doe.com"
                     * ]
                     */
                    userEmailsOnEntity?: string[];
                };
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ResendConfirmationEmail {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                message?: "Confirmation email sent successfully.";
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace RevokeToken {
        export interface RequestBody {
            /**
             * Refresh Token to be revoked
             * example:
             * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
             */
            refresh_token: string;
        }
        namespace Responses {
            export interface $200 {
                message?: "Token revoked successfully";
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SaveEntityFile {
        export type RequestBody = Components.Schemas.SaveEntityFile;
        namespace Responses {
            export interface $201 {
                createdFiles?: /* The file entity */ Components.Schemas.File[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SavePortalFiles {
        export type RequestBody = Components.Schemas.SavePortalFile;
        namespace Responses {
            export interface $201 {
                createdFiles?: /* The file entity */ Components.Schemas.File[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SearchPaymentRelationsInEntities {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.EntityItem[];
                /**
                 * Total number of files for entities found
                 * example:
                 * 50
                 */
                hits?: number;
            }
        }
    }
    namespace SearchPortalUserEntities {
        export type RequestBody = Components.Schemas.EntitySearchParams;
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.EntityItem[];
                /**
                 * Total number of entities for pagination
                 * example:
                 * 50
                 */
                hits?: number;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SsoCallback {
        export type RequestBody = Components.Schemas.SSOCallbackRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SSOCallbackResponse;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace SsoLogin {
        namespace Parameters {
            /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            export type ContactId = string; // uuid
            /**
             * example:
             * 123
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
            org_id: /**
             * example:
             * 123
             */
            Parameters.OrgId;
            contact_id?: /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Parameters.ContactId /* uuid */;
        }
        export interface RequestBody {
            provider_slug?: /**
             * URL-friendly slug to use as organization-unique identifier for Provider
             * example:
             * office-365-login
             */
            Components.Schemas.ProviderSlug /* [0-9a-z-]+ */;
        }
        namespace Responses {
            export interface $200 {
                token?: Components.Schemas.SSOLoginToken;
            }
        }
    }
    namespace SsoRedirect {
        namespace Parameters {
            /**
             * example:
             * https://customer-portal.com
             */
            export type WebUri = string;
        }
        export interface QueryParameters {
            web_uri: /**
             * example:
             * https://customer-portal.com
             */
            Parameters.WebUri;
        }
        export interface RequestBody {
            /**
             * The code received from the external SSO provider
             * example:
             * 123456
             */
            code?: string;
            /**
             * The state received from the external SSO provider
             * example:
             * 123456
             */
            state?: string;
        }
        namespace Responses {
            export interface $301 {
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace TrackFileDownloaded {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                file?: /* The file entity */ Components.Schemas.FileItem;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace TriggerEntityAccessEvent {
        namespace Parameters {
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            /**
             * Origin of the portal
             */
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
            /**
             * example:
             * contract
             */
            export type Schema = string;
        }
        export interface PathParameters {
            schema: /**
             * example:
             * contract
             */
            Parameters.Schema;
        }
        export interface QueryParameters {
            entity_id?: Parameters.EntityId;
            origin: /* Origin of the portal */ Parameters.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Event ID
                 */
                eventId?: string;
            }
        }
    }
    namespace UpdateContact {
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: /* The mapped contact of the portal user */ Components.Schemas.Contact;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.ForbiddenByRule;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateContract {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: /* The contract entity */ Components.Schemas.Contract;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.ForbiddenByRule;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateOpportunity {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: /* The opportunity entity */ Components.Schemas.Opportunity;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateOrder {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: /* The order entity */ Components.Schemas.Order;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdatePortalUser {
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: /* The portal user entity */ Components.Schemas.PortalUser;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdatePortalUserEmail {
        export interface RequestBody {
            /**
             * New email address of the portal user
             * example:
             * john@doe.com
             */
            email: string;
            /**
             * Password of the portal user for confirmation
             */
            password: string;
        }
        namespace Responses {
            export interface $200 {
                message?: "You will receive a confirmation mail soon on your updated email address.";
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateWorkflowStepAsDone {
        namespace Parameters {
            /**
             * ID of a step
             * example:
             * q1d6vcbsqvn
             */
            export type StepId = string;
            /**
             * ID of a workflow
             * example:
             * 0bjwcxc827t
             */
            export type WorkflowId = string;
        }
        export interface PathParameters {
            workflow_id: /**
             * ID of a workflow
             * example:
             * 0bjwcxc827t
             */
            Parameters.WorkflowId;
            step_id: /**
             * ID of a step
             * example:
             * q1d6vcbsqvn
             */
            Parameters.StepId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "startedTime": "2024-01-12T13:29:55.942Z",
             *   "requirements": [],
             *   "created": "2023-10-20T17:41:10.256Z",
             *   "executionType": "MANUAL",
             *   "assignedToInProgress": "-",
             *   "sectionId": "lzxsw2sblj7",
             *   "type": "STEP",
             *   "entityRefId": "q1d6vcbsqvn",
             *   "assignedTo": [
             *     "10014532"
             *   ],
             *   "lastUpdated": "2024-01-13T05:18:43.838Z",
             *   "ecp": {},
             *   "userIds": [],
             *   "name": "Hinterlege den vereinbarten LIC Termin",
             *   "id": "q1d6vcbsqvn",
             *   "definitionId": "9UjHKq",
             *   "status": "COMPLETED",
             *   "manuallyCreated": false,
             *   "enabled": true,
             *   "completedTime": "2024-01-13T05:18:43.827Z"
             * }
             */
            Components.Schemas.WorkflowStep;
        }
    }
    namespace UploadMeterReadingPhoto {
        export type RequestBody = Components.Schemas.MeterReadingPhoto;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReadingPhotoData;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpsertEmailTemplates {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = /* Email templates used for authentication and internal processes */ Components.Schemas.EmailTemplates;
        namespace Responses {
            export interface $200 {
                message: "Email Templates upserted successfully";
                emailTemplates: /* Email templates used for authentication and internal processes */ Components.Schemas.EmailTemplates;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpsertPortal {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.UpsertPortalConfig;
        namespace Responses {
            export type $201 = Components.Schemas.PortalConfig;
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpsertPortalWidget {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.UpsertPortalWidget;
        namespace Responses {
            export type $201 = Components.Schemas.UpsertPortalWidget;
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UserExists {
        namespace Parameters {
            /**
             * Email Address of the portal user
             * example:
             * user@example.com
             */
            export type Email = string;
            /**
             * Organization ID
             * example:
             * 123
             */
            export type OrgId = string;
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            email: /**
             * Email Address of the portal user
             * example:
             * user@example.com
             */
            Parameters.Email;
            org_id: /**
             * Organization ID
             * example:
             * 123
             */
            Parameters.OrgId;
            origin?: Parameters.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the user exists in the portal
                 * example:
                 * true
                 */
                exists: boolean;
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ValidateCaaRecords {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Whether to retry the validation to continue the domain setup
                 */
                retry?: boolean;
                /**
                 * Message of the validation
                 */
                message?: string;
                /**
                 * Whether the DNS is configured from the customer side
                 */
                isDNSConfigured?: boolean;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ValidateCadenceEntityEditRules {
        namespace Parameters {
            export type Attribute = string;
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            attribute?: Parameters.Attribute;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * false
                 */
                isBlockedByRules?: boolean;
                failedRule?: Components.Schemas.EntityEditRule;
            }
        }
    }
    namespace ValidateToken {
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
}

export interface OperationMethods {
  /**
   * upsertPortal - upsertPortal
   * 
   * Upserts the settings for a portal of an organization.
   */
  'upsertPortal'(
    parameters?: Parameters<Paths.UpsertPortal.QueryParameters> | null,
    data?: Paths.UpsertPortal.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertPortal.Responses.$201>
  /**
   * createUser - createUser
   * 
   * Registers a portal user
   */
  'createUser'(
    parameters?: Parameters<Paths.CreateUser.QueryParameters> | null,
    data?: Paths.CreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUser.Responses.$201>
  /**
   * validateToken - validateToken
   * 
   * Validates Portal Token is valid. Pass the token via Authorization Header.
   */
  'validateToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateToken.Responses.$204>
  /**
   * revokeToken - revokeToken
   * 
   * Revokes all of the access tokens for the given Refresh Token.
   */
  'revokeToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RevokeToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeToken.Responses.$200>
  /**
   * getPortalConfigByDomain - getPortalConfigByDomain
   * 
   * Retrieves the portal configuration by domain.
   */
  'getPortalConfigByDomain'(
    parameters?: Parameters<Paths.GetPortalConfigByDomain.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalConfigByDomain.Responses.$200>
  /**
   * getPortalConfig - getPortalConfig
   * 
   * Retrieves the portal configuration.
   */
  'getPortalConfig'(
    parameters?: Parameters<Paths.GetPortalConfig.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalConfig.Responses.$200>
  /**
   * deletePortal - deletePortal
   * 
   * Deletes the portal.
   */
  'deletePortal'(
    parameters?: Parameters<Paths.DeletePortal.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePortal.Responses.$204>
  /**
   * getPortalExtensions - getPortalExtensions
   * 
   * Retrieves the installed portal extensions.
   */
  'getPortalExtensions'(
    parameters?: Parameters<Paths.GetPortalExtensions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalExtensions.Responses.$200>
  /**
   * getPublicPortalExtensionDetails - getPublicPortalExtensionDetails
   * 
   * Get public extension details shown to end customers and configuring users.
   */
  'getPublicPortalExtensionDetails'(
    parameters?: Parameters<Paths.GetPublicPortalExtensionDetails.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicPortalExtensionDetails.Responses.$200>
  /**
   * getConsumption - Get Consumption
   * 
   * Get energy consumption data between a given time period.
   */
  'getConsumption'(
    parameters?: Parameters<Paths.GetConsumption.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConsumption.Responses.$200>
  /**
   * getCosts - Get Costs
   * 
   * Get energy cost data between a given time period.
   */
  'getCosts'(
    parameters?: Parameters<Paths.GetCosts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCosts.Responses.$200>
  /**
   * getPrices - Get Prices
   * 
   * Get energy prices data between a given time period.
   */
  'getPrices'(
    parameters?: Parameters<Paths.GetPrices.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPrices.Responses.$200>
  /**
   * getExternalLinks - getExternalLinks
   * 
   * Retrieves the portal configuration external links.
   */
  'getExternalLinks'(
    parameters?: Parameters<Paths.GetExternalLinks.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExternalLinks.Responses.$200>
  /**
   * getResolvedExternalLink - getResolvedExternalLink
   * 
   * Retrieves a resolved portal external link.
   */
  'getResolvedExternalLink'(
    parameters?: Parameters<Paths.GetResolvedExternalLink.QueryParameters & Paths.GetResolvedExternalLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetResolvedExternalLink.Responses.$200>
  /**
   * getPublicPortalConfig - getPublicPortalConfig
   * 
   * Retrieves the public portal configuration.
   */
  'getPublicPortalConfig'(
    parameters?: Parameters<Paths.GetPublicPortalConfig.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicPortalConfig.Responses.$200>
  /**
   * getOrgPortalConfig - getOrgPortalConfig
   * 
   * Retrieves the portal configuration for the organization.
   */
  'getOrgPortalConfig'(
    parameters?: Parameters<Paths.GetOrgPortalConfig.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrgPortalConfig.Responses.$200>
  /**
   * getAllPortalConfigs - getAllPortalConfigs
   * 
   * Retrieves all portal configurations.
   */
  'getAllPortalConfigs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllPortalConfigs.Responses.$200>
  /**
   * getEmailTemplates - getEmailTemplates
   * 
   * Retrieves the email templates of a portal
   */
  'getEmailTemplates'(
    parameters?: Parameters<Paths.GetEmailTemplates.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmailTemplates.Responses.$200>
  /**
   * upsertEmailTemplates - upsertEmailTemplates
   * 
   * Upserts the email templates of a portal
   */
  'upsertEmailTemplates'(
    parameters?: Parameters<Paths.UpsertEmailTemplates.QueryParameters> | null,
    data?: Paths.UpsertEmailTemplates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertEmailTemplates.Responses.$200>
  /**
   * getPublicPortalWidgets - getPublicPortalWidgets
   * 
   * Retrieves the public widgets of a portal
   */
  'getPublicPortalWidgets'(
    parameters?: Parameters<Paths.GetPublicPortalWidgets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicPortalWidgets.Responses.$200>
  /**
   * getPortalWidgets - getPortalWidgets
   * 
   * Retrieves the widgets of a portal
   */
  'getPortalWidgets'(
    parameters?: Parameters<Paths.GetPortalWidgets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalWidgets.Responses.$200>
  /**
   * upsertPortalWidget - upsertPortalWidget
   * 
   * Upsert widget for a portal of an organization.
   */
  'upsertPortalWidget'(
    parameters?: Parameters<Paths.UpsertPortalWidget.QueryParameters> | null,
    data?: Paths.UpsertPortalWidget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertPortalWidget.Responses.$201>
  /**
   * replaceECPTemplateVariables - replaceECPTemplateVariables
   * 
   * Replaces the template variables of a portal
   */
  'replaceECPTemplateVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ReplaceECPTemplateVariables.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplaceECPTemplateVariables.Responses.$200>
  /**
   * getOrganizationSettings - getOrganizationSettings
   * 
   * Retrieves the organization settings.
   */
  'getOrganizationSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganizationSettings.Responses.$200>
  /**
   * getSchemas - getSchemas
   * 
   * Retrieves the schemas.
   */
  'getSchemas'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemas.Responses.$200>
  /**
   * extraPermissionAttributes - extraPermissionAttributes
   * 
   * Retrieves the extra permission attributes.
   */
  'extraPermissionAttributes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExtraPermissionAttributes.Responses.$200>
  /**
   * validateCaaRecords - validateCaaRecords
   * 
   * Validates the CAA records of a portal
   */
  'validateCaaRecords'(
    parameters?: Parameters<Paths.ValidateCaaRecords.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateCaaRecords.Responses.$200>
  /**
   * getContact - getContact
   * 
   * Retrieves the contact of the logged in user.
   */
  'getContact'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContact.Responses.$200>
  /**
   * updateContact - updateContact
   * 
   * Updates the contact details.
   */
  'updateContact'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateContact.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateContact.Responses.$200>
  /**
   * getECPContact - getECPContact
   * 
   * Get the Contact by id
   */
  'getECPContact'(
    parameters?: Parameters<Paths.GetECPContact.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetECPContact.Responses.$200>
  /**
   * checkContactExists - checkContactExists
   * 
   * True if contact with given identifiers exists.
   */
  'checkContactExists'(
    parameters?: Parameters<Paths.CheckContactExists.QueryParameters> | null,
    data?: Paths.CheckContactExists.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CheckContactExists.Responses.$200>
  /**
   * getValidSecondaryAttributes - getValidSecondaryAttributes
   * 
   * Get valid secondary attributes that are used while mapping a contact on registration
   */
  'getValidSecondaryAttributes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetValidSecondaryAttributes.Responses.$200>
  /**
   * getPortalUser - getPortalUser
   * 
   * Get the portal user details
   */
  'getPortalUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalUser.Responses.$200>
  /**
   * updatePortalUser - updatePortalUser
   * 
   * Update the portal user details
   */
  'updatePortalUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdatePortalUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePortalUser.Responses.$200>
  /**
   * deletePortalUser - deletePortalUser
   * 
   * Delete the portal user
   */
  'deletePortalUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePortalUser.Responses.$200>
  /**
   * updatePortalUserEmail - updatePortalUserEmail
   * 
   * Update portal user email
   */
  'updatePortalUserEmail'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdatePortalUserEmail.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePortalUserEmail.Responses.$200>
  /**
   * resendConfirmationEmail - resendConfirmationEmail
   * 
   * Resend confirmation email
   */
  'resendConfirmationEmail'(
    parameters?: Parameters<Paths.ResendConfirmationEmail.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResendConfirmationEmail.Responses.$200>
  /**
   * fetchPortalUsersByRelatedEntity - fetchPortalUsersByRelatedEntity
   * 
   * Get all users for a given entity
   */
  'fetchPortalUsersByRelatedEntity'(
    parameters?: Parameters<Paths.FetchPortalUsersByRelatedEntity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FetchPortalUsersByRelatedEntity.Responses.$200>
  /**
   * confirmUser - confirmUser
   * 
   * Confirm a portal user
   */
  'confirmUser'(
    parameters?: Parameters<Paths.ConfirmUser.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConfirmUser.Responses.$200>
  /**
   * confirmUserWithUserId - confirmUserWithUserId
   * 
   * Confirm a portal user
   */
  'confirmUserWithUserId'(
    parameters?: Parameters<Paths.ConfirmUserWithUserId.QueryParameters & Paths.ConfirmUserWithUserId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * userExists - userExists
   * 
   * Checks whether a user exists in the portal
   */
  'userExists'(
    parameters?: Parameters<Paths.UserExists.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserExists.Responses.$200>
  /**
   * getRecipientsToNotifyOnAutomation - getRecipientsToNotifyOnAutomation
   * 
   * Get recipients to notify on automation
   */
  'getRecipientsToNotifyOnAutomation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetRecipientsToNotifyOnAutomation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRecipientsToNotifyOnAutomation.Responses.$200>
  /**
   * configureDistribution - configureDistribution
   * 
   * Configure the distribution for the portal's custom domain
   */
  'configureDistribution'(
    parameters?: Parameters<Paths.ConfigureDistribution.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConfigureDistribution.Responses.$200>
  /**
   * getAllOrders - getAllOrders
   * 
   * Get all orders for the portal user
   */
  'getAllOrders'(
    parameters?: Parameters<Paths.GetAllOrders.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllOrders.Responses.$200>
  /**
   * postOrderAcceptance - postOrderAcceptance
   * 
   * Accept/decline an offer by id
   */
  'postOrderAcceptance'(
    parameters?: Parameters<Paths.PostOrderAcceptance.PathParameters> | null,
    data?: Paths.PostOrderAcceptance.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostOrderAcceptance.Responses.$200>
  /**
   * getOrder - getOrder
   * 
   * Get an order by id
   */
  'getOrder'(
    parameters?: Parameters<Paths.GetOrder.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrder.Responses.$200>
  /**
   * updateOrder - updateOrder
   * 
   * Update an order by id
   */
  'updateOrder'(
    parameters?: Parameters<Paths.UpdateOrder.PathParameters> | null,
    data?: Paths.UpdateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOrder.Responses.$200>
  /**
   * getAllOpportunities - getAllOpportunities
   * 
   * Get all opportunities of a portal user
   */
  'getAllOpportunities'(
    parameters?: Parameters<Paths.GetAllOpportunities.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllOpportunities.Responses.$200>
  /**
   * getSearchableAttributesForOpportunities - getSearchableAttributesForOpportunities
   * 
   * Get all opportunity searchable attributes for a portal user
   */
  'getSearchableAttributesForOpportunities'(
    parameters?: Parameters<Paths.GetSearchableAttributesForOpportunities.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSearchableAttributesForOpportunities.Responses.$200>
  /**
   * getSearchResultsForOpportunities - getSearchResultsForOpportunities
   * 
   * Get all opportunity with the given serached attributes
   */
  'getSearchResultsForOpportunities'(
    parameters?: Parameters<Paths.GetSearchResultsForOpportunities.QueryParameters> | null,
    data?: Paths.GetSearchResultsForOpportunities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSearchResultsForOpportunities.Responses.$200>
  /**
   * getOpportunity - getOpportunity
   * 
   * Get an opportunity by id
   */
  'getOpportunity'(
    parameters?: Parameters<Paths.GetOpportunity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOpportunity.Responses.$200>
  /**
   * updateOpportunity - updateOpportunity
   * 
   * Update an opportunity by id
   */
  'updateOpportunity'(
    parameters?: Parameters<Paths.UpdateOpportunity.PathParameters> | null,
    data?: Paths.UpdateOpportunity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOpportunity.Responses.$200>
  /**
   * getAllContracts - getAllContracts
   * 
   * Get all contracts for a portal user
   */
  'getAllContracts'(
    parameters?: Parameters<Paths.GetAllContracts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllContracts.Responses.$200>
  /**
   * getContract - getContract
   * 
   * Get a contract by id
   */
  'getContract'(
    parameters?: Parameters<Paths.GetContract.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContract.Responses.$200>
  /**
   * updateContract - updateContract
   * 
   * Update a contract by id
   */
  'updateContract'(
    parameters?: Parameters<Paths.UpdateContract.PathParameters> | null,
    data?: Paths.UpdateContract.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateContract.Responses.$200>
  /**
   * addContractByIdentifiers - addContractByIdentifiers
   * 
   * Self-assign contract(s) by pre-configured identifiers.
   */
  'addContractByIdentifiers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddContractByIdentifiers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddContractByIdentifiers.Responses.$200>
  /**
   * getEntityIdentifiers - getEntityIdentifiers
   * 
   * Retrieve a list of entity identifiers used for entity search by portal users.
   */
  'getEntityIdentifiers'(
    parameters?: Parameters<Paths.GetEntityIdentifiers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityIdentifiers.Responses.$200>
  /**
   * getEntityActivityFeed - getEntityActivityFeed
   * 
   * Get activity feed for an entity
   * 
   */
  'getEntityActivityFeed'(
    parameters?: Parameters<Paths.GetEntityActivityFeed.QueryParameters & Paths.GetEntityActivityFeed.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityActivityFeed.Responses.$200>
  /**
   * validateCadenceEntityEditRules - validateCadenceEntityEditRules
   * 
   * Validate if cadence rule is valid for an entity
   * 
   */
  'validateCadenceEntityEditRules'(
    parameters?: Parameters<Paths.ValidateCadenceEntityEditRules.QueryParameters & Paths.ValidateCadenceEntityEditRules.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateCadenceEntityEditRules.Responses.$200>
  /**
   * searchPaymentRelationsInEntities - searchPaymentRelationsInEntities
   * 
   * Search for entities that have the payment relation with the given payment id
   * 
   */
  'searchPaymentRelationsInEntities'(
    parameters?: Parameters<Paths.SearchPaymentRelationsInEntities.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPaymentRelationsInEntities.Responses.$200>
  /**
   * createCustomEntityActivity - createCustomEntityActivity
   * 
   * Create a custom activity that can be displayed in activity feed of an entity.
   */
  'createCustomEntityActivity'(
    parameters?: Parameters<Paths.CreateCustomEntityActivity.QueryParameters> | null,
    data?: Paths.CreateCustomEntityActivity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCustomEntityActivity.Responses.$201>
  /**
   * saveEntityFile - saveEntityFile
   * 
   * Add files to an entity
   */
  'saveEntityFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SaveEntityFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveEntityFile.Responses.$201>
  /**
   * deleteEntityFile - deleteEntityFile
   * 
   * Delete files from an entity
   */
  'deleteEntityFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteEntityFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEntityFile.Responses.$202>
  /**
   * savePortalFiles - savePortalFiles
   * 
   * Add files to portal
   */
  'savePortalFiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SavePortalFiles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SavePortalFiles.Responses.$201>
  /**
   * getRegistrationIdentifiers - getRegistrationIdentifiers
   * 
   * Get valid attributes from entities that can be used as identifier to map contact to user on registration
   */
  'getRegistrationIdentifiers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRegistrationIdentifiers.Responses.$200>
  /**
   * getAllFiles - getAllFiles
   * 
   * Fetch all documents under the related entities of a contact
   */
  'getAllFiles'(
    parameters?: Parameters<Paths.GetAllFiles.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllFiles.Responses.$200>
  /**
   * getFileById - getFileById
   * 
   * Fetch a document with ID
   */
  'getFileById'(
    parameters?: Parameters<Paths.GetFileById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFileById.Responses.$200>
  /**
   * trackFileDownloaded - trackFileDownloaded
   * 
   * Track that user has downloaded a file
   */
  'trackFileDownloaded'(
    parameters?: Parameters<Paths.TrackFileDownloaded.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TrackFileDownloaded.Responses.$200>
  /**
   * getFilesCountByEntity - getFileCountByEntity
   * 
   * Fetch file counts for all ECP user related entities
   */
  'getFilesCountByEntity'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFilesCountByEntity.Responses.$200>
  /**
   * getBillingEvents - getBillingEvents
   * 
   * Fetch billing events for a portal user
   */
  'getBillingEvents'(
    parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
  /**
   * getCustomerBalance - getCustomerBalance
   * 
   * Get total balance across all contracts and orders of a customer entity.
   */
  'getCustomerBalance'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
  /**
   * loginToPortalAsUser - loginToPortalAsUser
   * 
   * Generate a token to log in to a portal impersonating a users.
   * 
   * Token is valid for 5 minutes.
   * 
   */
  'loginToPortalAsUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginToPortalAsUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LoginToPortalAsUser.Responses.$200>
  /**
   * triggerEntityAccessEvent - triggerEntityAccessEvent
   * 
   * Trigger entity access event for a portal user
   */
  'triggerEntityAccessEvent'(
    parameters?: Parameters<Paths.TriggerEntityAccessEvent.QueryParameters & Paths.TriggerEntityAccessEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TriggerEntityAccessEvent.Responses.$200>
  /**
   * searchPortalUserEntities - searchPortalUserEntities
   * 
   * Search all entities of a portal user
   */
  'searchPortalUserEntities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchPortalUserEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPortalUserEntities.Responses.$200>
  /**
   * canTriggerPortalFlow - canTriggerPortalFlow
   * 
   * Returns whether the user can trigger a portal flow
   */
  'canTriggerPortalFlow'(
    parameters?: Parameters<Paths.CanTriggerPortalFlow.QueryParameters> | null,
    data?: Paths.CanTriggerPortalFlow.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CanTriggerPortalFlow.Responses.$200>
  /**
   * updateWorkflowStepAsDone - updateWorkflowStepAsDone
   * 
   * Update a workflow step as done
   */
  'updateWorkflowStepAsDone'(
    parameters?: Parameters<Paths.UpdateWorkflowStepAsDone.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateWorkflowStepAsDone.Responses.$200>
  /**
   * createMeterReading - Create Meter Reading
   * 
   * Inserts a new meter reading.
   */
  'createMeterReading'(
    parameters?: Parameters<Paths.CreateMeterReading.QueryParameters> | null,
    data?: Paths.CreateMeterReading.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  /**
   * uploadMeterReadingPhoto - Upload Meter Reading Photo
   * 
   * Uploads a Meter Reading photo and - if enabled - gives back data extracted from the photo.
   */
  'uploadMeterReadingPhoto'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadMeterReadingPhoto.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadMeterReadingPhoto.Responses.$200>
  /**
   * ssoLogin - ssoLogin
   * 
   * Initiate login using external SSO identity.
   * 
   * Verifies the user with the issuer and matches the identity to an epilot user (or creates a new user).
   * 
   * Returns parameters to be used with CUSTOM_AUTH flow against Cognito
   * 
   */
  'ssoLogin'(
    parameters?: Parameters<Paths.SsoLogin.QueryParameters> | null,
    data?: Paths.SsoLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SsoLogin.Responses.$200>
  /**
   * ssoRedirect - ssoRedirect
   * 
   * Handles the redirect from the external SSO provider. Validates the authorization `code` and `state` received from the provider.
   * Redirects the user to the provided `web_uri` with the validated credentials.
   * 
   */
  'ssoRedirect'(
    parameters?: Parameters<Paths.SsoRedirect.QueryParameters> | null,
    data?: Paths.SsoRedirect.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * ssoCallback - ssoCallback
   * 
   * Handles the callback from the external SSO provider, validates the authorization `code`
   * and generates a external provider token to be used with the CUSTOM_AUTH flow against Cognito.
   * 
   */
  'ssoCallback'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SsoCallback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SsoCallback.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/portal/portal']: {
    /**
     * upsertPortal - upsertPortal
     * 
     * Upserts the settings for a portal of an organization.
     */
    'post'(
      parameters?: Parameters<Paths.UpsertPortal.QueryParameters> | null,
      data?: Paths.UpsertPortal.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpsertPortal.Responses.$201>
  }
  ['/v2/portal/public/user']: {
    /**
     * createUser - createUser
     * 
     * Registers a portal user
     */
    'post'(
      parameters?: Parameters<Paths.CreateUser.QueryParameters> | null,
      data?: Paths.CreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUser.Responses.$201>
  }
  ['/v2/portal/token/validate']: {
    /**
     * validateToken - validateToken
     * 
     * Validates Portal Token is valid. Pass the token via Authorization Header.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateToken.Responses.$204>
  }
  ['/v2/portal/token/revoke']: {
    /**
     * revokeToken - revokeToken
     * 
     * Revokes all of the access tokens for the given Refresh Token.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RevokeToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeToken.Responses.$200>
  }
  ['/v2/portal/public/config']: {
    /**
     * getPortalConfigByDomain - getPortalConfigByDomain
     * 
     * Retrieves the portal configuration by domain.
     */
    'get'(
      parameters?: Parameters<Paths.GetPortalConfigByDomain.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalConfigByDomain.Responses.$200>
  }
  ['/v2/portal/config']: {
    /**
     * getPortalConfig - getPortalConfig
     * 
     * Retrieves the portal configuration.
     */
    'get'(
      parameters?: Parameters<Paths.GetPortalConfig.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalConfig.Responses.$200>
    /**
     * deletePortal - deletePortal
     * 
     * Deletes the portal.
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePortal.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePortal.Responses.$204>
  }
  ['/v2/portal/extensions']: {
    /**
     * getPortalExtensions - getPortalExtensions
     * 
     * Retrieves the installed portal extensions.
     */
    'get'(
      parameters?: Parameters<Paths.GetPortalExtensions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalExtensions.Responses.$200>
  }
  ['/v2/portal/public/extensions']: {
    /**
     * getPublicPortalExtensionDetails - getPublicPortalExtensionDetails
     * 
     * Get public extension details shown to end customers and configuring users.
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicPortalExtensionDetails.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicPortalExtensionDetails.Responses.$200>
  }
  ['/v2/portal/consumption']: {
    /**
     * getConsumption - Get Consumption
     * 
     * Get energy consumption data between a given time period.
     */
    'get'(
      parameters?: Parameters<Paths.GetConsumption.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConsumption.Responses.$200>
  }
  ['/v2/portal/costs']: {
    /**
     * getCosts - Get Costs
     * 
     * Get energy cost data between a given time period.
     */
    'get'(
      parameters?: Parameters<Paths.GetCosts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCosts.Responses.$200>
  }
  ['/v2/portal/prices']: {
    /**
     * getPrices - Get Prices
     * 
     * Get energy prices data between a given time period.
     */
    'get'(
      parameters?: Parameters<Paths.GetPrices.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPrices.Responses.$200>
  }
  ['/v2/portal/external-links']: {
    /**
     * getExternalLinks - getExternalLinks
     * 
     * Retrieves the portal configuration external links.
     */
    'get'(
      parameters?: Parameters<Paths.GetExternalLinks.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExternalLinks.Responses.$200>
  }
  ['/v2/portal/resolve:external-link/{id}']: {
    /**
     * getResolvedExternalLink - getResolvedExternalLink
     * 
     * Retrieves a resolved portal external link.
     */
    'get'(
      parameters?: Parameters<Paths.GetResolvedExternalLink.QueryParameters & Paths.GetResolvedExternalLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetResolvedExternalLink.Responses.$200>
  }
  ['/v2/portal/public/portal/config']: {
    /**
     * getPublicPortalConfig - getPublicPortalConfig
     * 
     * Retrieves the public portal configuration.
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicPortalConfig.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicPortalConfig.Responses.$200>
  }
  ['/v2/portal/org/portal/config']: {
    /**
     * getOrgPortalConfig - getOrgPortalConfig
     * 
     * Retrieves the portal configuration for the organization.
     */
    'get'(
      parameters?: Parameters<Paths.GetOrgPortalConfig.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrgPortalConfig.Responses.$200>
  }
  ['/v2/portal/configs']: {
    /**
     * getAllPortalConfigs - getAllPortalConfigs
     * 
     * Retrieves all portal configurations.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllPortalConfigs.Responses.$200>
  }
  ['/v2/portal/email-templates']: {
    /**
     * upsertEmailTemplates - upsertEmailTemplates
     * 
     * Upserts the email templates of a portal
     */
    'post'(
      parameters?: Parameters<Paths.UpsertEmailTemplates.QueryParameters> | null,
      data?: Paths.UpsertEmailTemplates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpsertEmailTemplates.Responses.$200>
    /**
     * getEmailTemplates - getEmailTemplates
     * 
     * Retrieves the email templates of a portal
     */
    'get'(
      parameters?: Parameters<Paths.GetEmailTemplates.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmailTemplates.Responses.$200>
  }
  ['/v2/portal/public-widgets']: {
    /**
     * getPublicPortalWidgets - getPublicPortalWidgets
     * 
     * Retrieves the public widgets of a portal
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicPortalWidgets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicPortalWidgets.Responses.$200>
  }
  ['/v2/portal/widgets']: {
    /**
     * upsertPortalWidget - upsertPortalWidget
     * 
     * Upsert widget for a portal of an organization.
     */
    'post'(
      parameters?: Parameters<Paths.UpsertPortalWidget.QueryParameters> | null,
      data?: Paths.UpsertPortalWidget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpsertPortalWidget.Responses.$201>
    /**
     * getPortalWidgets - getPortalWidgets
     * 
     * Retrieves the widgets of a portal
     */
    'get'(
      parameters?: Parameters<Paths.GetPortalWidgets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalWidgets.Responses.$200>
  }
  ['/v2/portal/replace-ecp-template-variables']: {
    /**
     * replaceECPTemplateVariables - replaceECPTemplateVariables
     * 
     * Replaces the template variables of a portal
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ReplaceECPTemplateVariables.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplaceECPTemplateVariables.Responses.$200>
  }
  ['/v2/portal/org/settings']: {
    /**
     * getOrganizationSettings - getOrganizationSettings
     * 
     * Retrieves the organization settings.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganizationSettings.Responses.$200>
  }
  ['/v2/portal/schemas']: {
    /**
     * getSchemas - getSchemas
     * 
     * Retrieves the schemas.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemas.Responses.$200>
  }
  ['/v2/portal/extra-permission-attributes']: {
    /**
     * extraPermissionAttributes - extraPermissionAttributes
     * 
     * Retrieves the extra permission attributes.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExtraPermissionAttributes.Responses.$200>
  }
  ['/v2/portal/validate/caa-records']: {
    /**
     * validateCaaRecords - validateCaaRecords
     * 
     * Validates the CAA records of a portal
     */
    'post'(
      parameters?: Parameters<Paths.ValidateCaaRecords.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateCaaRecords.Responses.$200>
  }
  ['/v2/portal/contact']: {
    /**
     * getContact - getContact
     * 
     * Retrieves the contact of the logged in user.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContact.Responses.$200>
    /**
     * updateContact - updateContact
     * 
     * Updates the contact details.
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateContact.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateContact.Responses.$200>
  }
  ['/v2/portal/ecp/contact']: {
    /**
     * getECPContact - getECPContact
     * 
     * Get the Contact by id
     */
    'get'(
      parameters?: Parameters<Paths.GetECPContact.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetECPContact.Responses.$200>
  }
  ['/v2/portal/public/contact/exists']: {
    /**
     * checkContactExists - checkContactExists
     * 
     * True if contact with given identifiers exists.
     */
    'post'(
      parameters?: Parameters<Paths.CheckContactExists.QueryParameters> | null,
      data?: Paths.CheckContactExists.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CheckContactExists.Responses.$200>
  }
  ['/v2/portal/contact/valid/secondary/attributes']: {
    /**
     * getValidSecondaryAttributes - getValidSecondaryAttributes
     * 
     * Get valid secondary attributes that are used while mapping a contact on registration
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetValidSecondaryAttributes.Responses.$200>
  }
  ['/v2/portal/user']: {
    /**
     * getPortalUser - getPortalUser
     * 
     * Get the portal user details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalUser.Responses.$200>
    /**
     * updatePortalUser - updatePortalUser
     * 
     * Update the portal user details
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdatePortalUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePortalUser.Responses.$200>
    /**
     * deletePortalUser - deletePortalUser
     * 
     * Delete the portal user
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePortalUser.Responses.$200>
  }
  ['/v2/portal/user/update/email']: {
    /**
     * updatePortalUserEmail - updatePortalUserEmail
     * 
     * Update portal user email
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdatePortalUserEmail.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePortalUserEmail.Responses.$200>
  }
  ['/v2/portal/user/resend/confirmation-email/{id}']: {
    /**
     * resendConfirmationEmail - resendConfirmationEmail
     * 
     * Resend confirmation email
     */
    'post'(
      parameters?: Parameters<Paths.ResendConfirmationEmail.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResendConfirmationEmail.Responses.$200>
  }
  ['/v2/portal/users/by-related-entity']: {
    /**
     * fetchPortalUsersByRelatedEntity - fetchPortalUsersByRelatedEntity
     * 
     * Get all users for a given entity
     */
    'get'(
      parameters?: Parameters<Paths.FetchPortalUsersByRelatedEntity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FetchPortalUsersByRelatedEntity.Responses.$200>
  }
  ['/v2/portal/user/confirm']: {
    /**
     * confirmUser - confirmUser
     * 
     * Confirm a portal user
     */
    'get'(
      parameters?: Parameters<Paths.ConfirmUser.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConfirmUser.Responses.$200>
  }
  ['/v2/portal/user/confirm/{id}']: {
    /**
     * confirmUserWithUserId - confirmUserWithUserId
     * 
     * Confirm a portal user
     */
    'get'(
      parameters?: Parameters<Paths.ConfirmUserWithUserId.QueryParameters & Paths.ConfirmUserWithUserId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v2/portal/public/user/exists']: {
    /**
     * userExists - userExists
     * 
     * Checks whether a user exists in the portal
     */
    'get'(
      parameters?: Parameters<Paths.UserExists.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserExists.Responses.$200>
  }
  ['/v2/portal/recipients-to-notify']: {
    /**
     * getRecipientsToNotifyOnAutomation - getRecipientsToNotifyOnAutomation
     * 
     * Get recipients to notify on automation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetRecipientsToNotifyOnAutomation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRecipientsToNotifyOnAutomation.Responses.$200>
  }
  ['/v2/portal/configure-distribution']: {
    /**
     * configureDistribution - configureDistribution
     * 
     * Configure the distribution for the portal's custom domain
     */
    'get'(
      parameters?: Parameters<Paths.ConfigureDistribution.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConfigureDistribution.Responses.$200>
  }
  ['/v2/portal/order']: {
    /**
     * getAllOrders - getAllOrders
     * 
     * Get all orders for the portal user
     */
    'get'(
      parameters?: Parameters<Paths.GetAllOrders.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllOrders.Responses.$200>
  }
  ['/v2/portal/order/{id}/acceptance']: {
    /**
     * postOrderAcceptance - postOrderAcceptance
     * 
     * Accept/decline an offer by id
     */
    'post'(
      parameters?: Parameters<Paths.PostOrderAcceptance.PathParameters> | null,
      data?: Paths.PostOrderAcceptance.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostOrderAcceptance.Responses.$200>
  }
  ['/v2/portal/order/{id}']: {
    /**
     * getOrder - getOrder
     * 
     * Get an order by id
     */
    'get'(
      parameters?: Parameters<Paths.GetOrder.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrder.Responses.$200>
    /**
     * updateOrder - updateOrder
     * 
     * Update an order by id
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateOrder.PathParameters> | null,
      data?: Paths.UpdateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOrder.Responses.$200>
  }
  ['/v2/portal/opportunity']: {
    /**
     * getAllOpportunities - getAllOpportunities
     * 
     * Get all opportunities of a portal user
     */
    'get'(
      parameters?: Parameters<Paths.GetAllOpportunities.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllOpportunities.Responses.$200>
  }
  ['/v2/portal/opportunities/searchable-attributes']: {
    /**
     * getSearchableAttributesForOpportunities - getSearchableAttributesForOpportunities
     * 
     * Get all opportunity searchable attributes for a portal user
     */
    'get'(
      parameters?: Parameters<Paths.GetSearchableAttributesForOpportunities.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSearchableAttributesForOpportunities.Responses.$200>
  }
  ['/v2/portal/opportunities/search']: {
    /**
     * getSearchResultsForOpportunities - getSearchResultsForOpportunities
     * 
     * Get all opportunity with the given serached attributes
     */
    'post'(
      parameters?: Parameters<Paths.GetSearchResultsForOpportunities.QueryParameters> | null,
      data?: Paths.GetSearchResultsForOpportunities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSearchResultsForOpportunities.Responses.$200>
  }
  ['/v2/portal/opportunities/{id}']: {
    /**
     * getOpportunity - getOpportunity
     * 
     * Get an opportunity by id
     */
    'get'(
      parameters?: Parameters<Paths.GetOpportunity.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOpportunity.Responses.$200>
    /**
     * updateOpportunity - updateOpportunity
     * 
     * Update an opportunity by id
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateOpportunity.PathParameters> | null,
      data?: Paths.UpdateOpportunity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOpportunity.Responses.$200>
  }
  ['/v2/portal/contract']: {
    /**
     * getAllContracts - getAllContracts
     * 
     * Get all contracts for a portal user
     */
    'get'(
      parameters?: Parameters<Paths.GetAllContracts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllContracts.Responses.$200>
  }
  ['/v2/portal/contract/{id}']: {
    /**
     * getContract - getContract
     * 
     * Get a contract by id
     */
    'get'(
      parameters?: Parameters<Paths.GetContract.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContract.Responses.$200>
    /**
     * updateContract - updateContract
     * 
     * Update a contract by id
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateContract.PathParameters> | null,
      data?: Paths.UpdateContract.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateContract.Responses.$200>
  }
  ['/v2/portal/contract/by-identifiers']: {
    /**
     * addContractByIdentifiers - addContractByIdentifiers
     * 
     * Self-assign contract(s) by pre-configured identifiers.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddContractByIdentifiers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddContractByIdentifiers.Responses.$200>
  }
  ['/v2/portal/entity/identifiers/{slug}']: {
    /**
     * getEntityIdentifiers - getEntityIdentifiers
     * 
     * Retrieve a list of entity identifiers used for entity search by portal users.
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityIdentifiers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityIdentifiers.Responses.$200>
  }
  ['/v2/portal/entity/{slug}/{id}/activity']: {
    /**
     * getEntityActivityFeed - getEntityActivityFeed
     * 
     * Get activity feed for an entity
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityActivityFeed.QueryParameters & Paths.GetEntityActivityFeed.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityActivityFeed.Responses.$200>
  }
  ['/v2/portal/{slug}/{id}:validateRule']: {
    /**
     * validateCadenceEntityEditRules - validateCadenceEntityEditRules
     * 
     * Validate if cadence rule is valid for an entity
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ValidateCadenceEntityEditRules.QueryParameters & Paths.ValidateCadenceEntityEditRules.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateCadenceEntityEditRules.Responses.$200>
  }
  ['/v2/portal/entities-by-payment/{id}']: {
    /**
     * searchPaymentRelationsInEntities - searchPaymentRelationsInEntities
     * 
     * Search for entities that have the payment relation with the given payment id
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchPaymentRelationsInEntities.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPaymentRelationsInEntities.Responses.$200>
  }
  ['/v2/portal/entity/activity']: {
    /**
     * createCustomEntityActivity - createCustomEntityActivity
     * 
     * Create a custom activity that can be displayed in activity feed of an entity.
     */
    'put'(
      parameters?: Parameters<Paths.CreateCustomEntityActivity.QueryParameters> | null,
      data?: Paths.CreateCustomEntityActivity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCustomEntityActivity.Responses.$201>
  }
  ['/v2/portal/entity/file']: {
    /**
     * saveEntityFile - saveEntityFile
     * 
     * Add files to an entity
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SaveEntityFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveEntityFile.Responses.$201>
    /**
     * deleteEntityFile - deleteEntityFile
     * 
     * Delete files from an entity
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteEntityFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEntityFile.Responses.$202>
  }
  ['/v2/portal/portal/files']: {
    /**
     * savePortalFiles - savePortalFiles
     * 
     * Add files to portal
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SavePortalFiles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SavePortalFiles.Responses.$201>
  }
  ['/v2/portal/registration/identifiers']: {
    /**
     * getRegistrationIdentifiers - getRegistrationIdentifiers
     * 
     * Get valid attributes from entities that can be used as identifier to map contact to user on registration
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRegistrationIdentifiers.Responses.$200>
  }
  ['/v2/portal/user/files']: {
    /**
     * getAllFiles - getAllFiles
     * 
     * Fetch all documents under the related entities of a contact
     */
    'get'(
      parameters?: Parameters<Paths.GetAllFiles.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllFiles.Responses.$200>
  }
  ['/v2/portal/user/file/{id}']: {
    /**
     * getFileById - getFileById
     * 
     * Fetch a document with ID
     */
    'get'(
      parameters?: Parameters<Paths.GetFileById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFileById.Responses.$200>
  }
  ['/v2/portal/user/file/{id}/downloaded']: {
    /**
     * trackFileDownloaded - trackFileDownloaded
     * 
     * Track that user has downloaded a file
     */
    'post'(
      parameters?: Parameters<Paths.TrackFileDownloaded.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TrackFileDownloaded.Responses.$200>
  }
  ['/v2/portal/user/files/count-by-entity']: {
    /**
     * getFilesCountByEntity - getFileCountByEntity
     * 
     * Fetch file counts for all ECP user related entities
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFilesCountByEntity.Responses.$200>
  }
  ['/v2/portal/billing/events']: {
    /**
     * getBillingEvents - getBillingEvents
     * 
     * Fetch billing events for a portal user
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
  }
  ['/v2/portal/billing/customers/balance']: {
    /**
     * getCustomerBalance - getCustomerBalance
     * 
     * Get total balance across all contracts and orders of a customer entity.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
  }
  ['/v2/portal/admin:login-as-user']: {
    /**
     * loginToPortalAsUser - loginToPortalAsUser
     * 
     * Generate a token to log in to a portal impersonating a users.
     * 
     * Token is valid for 5 minutes.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LoginToPortalAsUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LoginToPortalAsUser.Responses.$200>
  }
  ['/v2/portal/entity/{schema}/access']: {
    /**
     * triggerEntityAccessEvent - triggerEntityAccessEvent
     * 
     * Trigger entity access event for a portal user
     */
    'post'(
      parameters?: Parameters<Paths.TriggerEntityAccessEvent.QueryParameters & Paths.TriggerEntityAccessEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TriggerEntityAccessEvent.Responses.$200>
  }
  ['/v2/portal/entity:search']: {
    /**
     * searchPortalUserEntities - searchPortalUserEntities
     * 
     * Search all entities of a portal user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchPortalUserEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPortalUserEntities.Responses.$200>
  }
  ['/v2/portal/can-trigger-portal-flow']: {
    /**
     * canTriggerPortalFlow - canTriggerPortalFlow
     * 
     * Returns whether the user can trigger a portal flow
     */
    'post'(
      parameters?: Parameters<Paths.CanTriggerPortalFlow.QueryParameters> | null,
      data?: Paths.CanTriggerPortalFlow.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CanTriggerPortalFlow.Responses.$200>
  }
  ['/v2/portal/workflow/{workflow_id}/{step_id}:markDone']: {
    /**
     * updateWorkflowStepAsDone - updateWorkflowStepAsDone
     * 
     * Update a workflow step as done
     */
    'put'(
      parameters?: Parameters<Paths.UpdateWorkflowStepAsDone.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateWorkflowStepAsDone.Responses.$200>
  }
  ['/v2/portal/metering/reading']: {
    /**
     * createMeterReading - Create Meter Reading
     * 
     * Inserts a new meter reading.
     */
    'post'(
      parameters?: Parameters<Paths.CreateMeterReading.QueryParameters> | null,
      data?: Paths.CreateMeterReading.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  }
  ['/v2/portal/metering/reading/photo']: {
    /**
     * uploadMeterReadingPhoto - Upload Meter Reading Photo
     * 
     * Uploads a Meter Reading photo and - if enabled - gives back data extracted from the photo.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadMeterReadingPhoto.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadMeterReadingPhoto.Responses.$200>
  }
  ['/v2/portal/public/sso/login']: {
    /**
     * ssoLogin - ssoLogin
     * 
     * Initiate login using external SSO identity.
     * 
     * Verifies the user with the issuer and matches the identity to an epilot user (or creates a new user).
     * 
     * Returns parameters to be used with CUSTOM_AUTH flow against Cognito
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SsoLogin.QueryParameters> | null,
      data?: Paths.SsoLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SsoLogin.Responses.$200>
  }
  ['/v2/portal/public/sso/redirect']: {
    /**
     * ssoRedirect - ssoRedirect
     * 
     * Handles the redirect from the external SSO provider. Validates the authorization `code` and `state` received from the provider.
     * Redirects the user to the provided `web_uri` with the validated credentials.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SsoRedirect.QueryParameters> | null,
      data?: Paths.SsoRedirect.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v2/portal/public/sso/callback']: {
    /**
     * ssoCallback - ssoCallback
     * 
     * Handles the callback from the external SSO provider, validates the authorization `code`
     * and generates a external provider token to be used with the CUSTOM_AUTH flow against Cognito.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SsoCallback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SsoCallback.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AcceptanceDecision = Components.Schemas.AcceptanceDecision;
export type ActionLabel = Components.Schemas.ActionLabel;
export type ActionWidget = Components.Schemas.ActionWidget;
export type Activity = Components.Schemas.Activity;
export type ActivityCallerContext = Components.Schemas.ActivityCallerContext;
export type ActivityId = Components.Schemas.ActivityId;
export type ActivityItem = Components.Schemas.ActivityItem;
export type AdminUser = Components.Schemas.AdminUser;
export type AllowedFileExtensions = Components.Schemas.AllowedFileExtensions;
export type AttributeMappingConfig = Components.Schemas.AttributeMappingConfig;
export type AuthConfig = Components.Schemas.AuthConfig;
export type Balance = Components.Schemas.Balance;
export type BaseBillingEvent = Components.Schemas.BaseBillingEvent;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BillingEvent = Components.Schemas.BillingEvent;
export type CommonConfigAttributes = Components.Schemas.CommonConfigAttributes;
export type Contact = Components.Schemas.Contact;
export type ContactCountRequest = Components.Schemas.ContactCountRequest;
export type ContactExistsRequest = Components.Schemas.ContactExistsRequest;
export type ContentWidget = Components.Schemas.ContentWidget;
export type Contract = Components.Schemas.Contract;
export type ContractIdentifier = Components.Schemas.ContractIdentifier;
export type CreateUserRequest = Components.Schemas.CreateUserRequest;
export type Currency = Components.Schemas.Currency;
export type DataRetrievalItem = Components.Schemas.DataRetrievalItem;
export type DeleteEntityFile = Components.Schemas.DeleteEntityFile;
export type Direction = Components.Schemas.Direction;
export type DocumentWidget = Components.Schemas.DocumentWidget;
export type EmailTemplates = Components.Schemas.EmailTemplates;
export type Entity = Components.Schemas.Entity;
export type EntityEditRule = Components.Schemas.EntityEditRule;
export type EntityFileCount = Components.Schemas.EntityFileCount;
export type EntityId = Components.Schemas.EntityId;
export type EntityItem = Components.Schemas.EntityItem;
export type EntitySearchParams = Components.Schemas.EntitySearchParams;
export type EntitySlug = Components.Schemas.EntitySlug;
export type EntityWidget = Components.Schemas.EntityWidget;
export type ErrorResp = Components.Schemas.ErrorResp;
export type Exists = Components.Schemas.Exists;
export type Extension = Components.Schemas.Extension;
export type ExtensionAuthBlock = Components.Schemas.ExtensionAuthBlock;
export type ExtensionConfig = Components.Schemas.ExtensionConfig;
export type ExtensionHook = Components.Schemas.ExtensionHook;
export type ExtensionHookConfig = Components.Schemas.ExtensionHookConfig;
export type ExtensionHookConsumptionDataRetrieval = Components.Schemas.ExtensionHookConsumptionDataRetrieval;
export type ExtensionHookContractIdentification = Components.Schemas.ExtensionHookContractIdentification;
export type ExtensionHookCostDataRetrieval = Components.Schemas.ExtensionHookCostDataRetrieval;
export type ExtensionHookMeterReadingPlausibilityCheck = Components.Schemas.ExtensionHookMeterReadingPlausibilityCheck;
export type ExtensionHookPriceDataRetrieval = Components.Schemas.ExtensionHookPriceDataRetrieval;
export type ExtensionHookRegistrationIdentifiersCheck = Components.Schemas.ExtensionHookRegistrationIdentifiersCheck;
export type ExtensionSeamlessLink = Components.Schemas.ExtensionSeamlessLink;
export type ExternalLink = Components.Schemas.ExternalLink;
export type ExtraSchemaAttributes = Components.Schemas.ExtraSchemaAttributes;
export type FailedRuleErrorResp = Components.Schemas.FailedRuleErrorResp;
export type File = Components.Schemas.File;
export type FileItem = Components.Schemas.FileItem;
export type Grant = Components.Schemas.Grant;
export type IdentifierAttribute = Components.Schemas.IdentifierAttribute;
export type InstallmentEvent = Components.Schemas.InstallmentEvent;
export type JourneyActions = Components.Schemas.JourneyActions;
export type Meter = Components.Schemas.Meter;
export type MeterChartWidget = Components.Schemas.MeterChartWidget;
export type MeterReading = Components.Schemas.MeterReading;
export type MeterReadingPhoto = Components.Schemas.MeterReadingPhoto;
export type MeterReadingPhotoData = Components.Schemas.MeterReadingPhotoData;
export type MeterReadingWidget = Components.Schemas.MeterReadingWidget;
export type OIDCProviderConfig = Components.Schemas.OIDCProviderConfig;
export type OIDCProviderMetadata = Components.Schemas.OIDCProviderMetadata;
export type Opportunity = Components.Schemas.Opportunity;
export type Order = Components.Schemas.Order;
export type OrganizationSettings = Components.Schemas.OrganizationSettings;
export type Origin = Components.Schemas.Origin;
export type PaymentWidget = Components.Schemas.PaymentWidget;
export type PortalConfig = Components.Schemas.PortalConfig;
export type PortalUser = Components.Schemas.PortalUser;
export type PortalWidget = Components.Schemas.PortalWidget;
export type Product = Components.Schemas.Product;
export type ProviderConfig = Components.Schemas.ProviderConfig;
export type ProviderDisplayName = Components.Schemas.ProviderDisplayName;
export type ProviderPublicConfig = Components.Schemas.ProviderPublicConfig;
export type ProviderSlug = Components.Schemas.ProviderSlug;
export type PublicContractIdentificationDetails = Components.Schemas.PublicContractIdentificationDetails;
export type PublicDataRetrievalHookDetails = Components.Schemas.PublicDataRetrievalHookDetails;
export type PublicExtensionCapabilities = Components.Schemas.PublicExtensionCapabilities;
export type PublicExtensionDetails = Components.Schemas.PublicExtensionDetails;
export type ReadBy = Components.Schemas.ReadBy;
export type ReadingStatus = Components.Schemas.ReadingStatus;
export type Reason = Components.Schemas.Reason;
export type RegistrationIdentifier = Components.Schemas.RegistrationIdentifier;
export type ReimbursementEvent = Components.Schemas.ReimbursementEvent;
export type Rule = Components.Schemas.Rule;
export type SAMLProviderConfig = Components.Schemas.SAMLProviderConfig;
export type SSOCallbackRequest = Components.Schemas.SSOCallbackRequest;
export type SSOCallbackResponse = Components.Schemas.SSOCallbackResponse;
export type SSOLoginToken = Components.Schemas.SSOLoginToken;
export type SaveEntityFile = Components.Schemas.SaveEntityFile;
export type SavePortalFile = Components.Schemas.SavePortalFile;
export type Schema = Components.Schemas.Schema;
export type Source = Components.Schemas.Source;
export type TariffType = Components.Schemas.TariffType;
export type TeaserWidget = Components.Schemas.TeaserWidget;
export type TriggerPortalFlow = Components.Schemas.TriggerPortalFlow;
export type UpdateOnlyPortalConfigAttributes = Components.Schemas.UpdateOnlyPortalConfigAttributes;
export type UpsertPortalConfig = Components.Schemas.UpsertPortalConfig;
export type UpsertPortalWidget = Components.Schemas.UpsertPortalWidget;
export type UserRequest = Components.Schemas.UserRequest;
export type WidgetAction = Components.Schemas.WidgetAction;
export type WidgetBase = Components.Schemas.WidgetBase;
export type WorfklowIdentifier = Components.Schemas.WorfklowIdentifier;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
export type WorkflowStep = Components.Schemas.WorkflowStep;
