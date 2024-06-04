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
        export interface ContractAssignmentConflict {
            /**
             * Error message
             */
            message?: string;
            reason: "MULTIPLE" | "DRAFT";
        }
        export type Forbidden = Schemas.ErrorResp;
        export type ForbiddenByRule = Schemas.ErrorResp | Schemas.FailedRuleErrorResp;
        export type InternalServerError = Schemas.ErrorResp;
        export type InvalidRequest = Schemas.ErrorResp;
        export type NotFound = Schemas.ErrorResp;
        export type Unauthorized = Schemas.ErrorResp;
    }
    namespace Schemas {
        export interface ActionWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
        export interface CreateSSOUserRequest {
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
            contactId?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */;
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
            file_entity_ids: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId /* uuid */[];
        }
        export interface DocumentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
            /**
             * Default 360 user to notify upon an internal notification
             */
            default_user_to_notify?: {
                /**
                 * Default admin users for pending user notification to notify
                 */
                onPendingUser?: AdminUser[];
            };
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
            email_templates?: /* Email templates used for authentication and internal processes */ EmailTemplates;
            /**
             * Permissions granted to a portal user while accessing entities
             */
            grants?: Grant[];
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
             * Identifiers used to identify an entity by a portal user
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
             * Identifiers to identify a contact of a portal user during the registration.
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
            registration_identifiers?: RegistrationIdentifier[];
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
            /**
             * Name of the organization
             * example:
             * ABC Company
             */
            org_name?: string;
            origin?: /* Origin of the portal */ Origin;
            allowed_file_extensions?: /* Allowed file extensions for upload */ AllowedFileExtensions;
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
        export type PortalWidget = EntityWidget | ContentWidget | ActionWidget | TeaserWidget | DocumentWidget | PaymentWidget;
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
        export interface TeaserWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
                };
            };
        }
        export interface UpsertPortalConfig {
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
            /**
             * Default 360 user to notify upon an internal notification
             */
            default_user_to_notify?: {
                /**
                 * Default admin users for pending user notification to notify
                 */
                onPendingUser?: AdminUser[];
            };
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
            email_templates?: /* Email templates used for authentication and internal processes */ EmailTemplates;
            /**
             * Permissions granted to a portal user while accessing entities
             */
            grants?: Grant[];
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
             * Identifiers used to identify an entity by a portal user
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
             * Identifiers to identify a contact of a portal user during the registration.
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
            registration_identifiers?: RegistrationIdentifier[];
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
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET";
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
         * example:
         * ```json
         *   {
         *     "name": "My Contract",
         *     "contract_number": "123"
         *   }
         * ```
         *
         */
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.EntityItem;
                hits: number;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.ContractAssignmentConflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace AddEndCustomerRelationToEntity {
        namespace Parameters {
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
        namespace Responses {
            export interface $200 {
                entity?: Components.Schemas.EntityItem;
                relations?: Components.Schemas.EntityItem[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
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
            export type Entities = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */[];
        }
        export interface QueryParameters {
            entities?: Parameters.Entities;
        }
        export type RequestBody = Components.Schemas.Activity;
        namespace Responses {
            export type $201 = Components.Schemas.ActivityItem;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateSSOUser {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.CreateSSOUserRequest;
        namespace Responses {
            export interface $201 {
                data?: /* The portal user entity */ Components.Schemas.PortalUser;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
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
                response: /* The portal user entity */ Components.Schemas.PortalUser;
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
                data?: /* The contract entity */ Components.Schemas.Contract[];
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
            export type EntityIds = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */[];
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
                data?: /* The opportunity entity */ Components.Schemas.Opportunity[];
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
                data?: /* The order entity */ Components.Schemas.Order[];
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
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId /* uuid */[];
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
            entity_id?: Parameters.EntityId;
            event_type?: /* Type of billing event to filter by */ Parameters.EventType;
            date_after?: /* List billing events after this date */ Parameters.DateAfter /* date-time */;
            date_before?: /* List billing events before this date */ Parameters.DateBefore /* date-time */;
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
    namespace GetContact {
        namespace Responses {
            export interface $200 {
                entity?: /* The mapped contact of the portal user */ Components.Schemas.Contact;
                files?: /* The file entity */ Components.Schemas.File[];
                relations?: Components.Schemas.EntityItem[];
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
            export type $200 = Components.Schemas.PortalConfig;
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
   * createSSOUser - createSSOUser
   * 
   * Creates a portal user as an SSO user.
   */
  'createSSOUser'(
    parameters?: Parameters<Paths.CreateSSOUser.QueryParameters> | null,
    data?: Paths.CreateSSOUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSSOUser.Responses.$201>
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
   * getContact - getContact
   * 
   * Retrieves the contact by ID.
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
    parameters?: Parameters<Paths.ConfirmUser.PathParameters & Paths.ConfirmUser.QueryParameters> | null,
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
   * Self-assign contract by pre-configured identifiers.
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
   * addEndCustomerRelationToEntity - addEndCustomerRelationToEntity
   * 
   * Add portal user relation to an entity
   */
  'addEndCustomerRelationToEntity'(
    parameters?: Parameters<Paths.AddEndCustomerRelationToEntity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddEndCustomerRelationToEntity.Responses.$200>
  /**
   * getEntityActivityFeed - getEntityActivityFeed
   * 
   * Get activity feed for an entity
   * 
   */
  'getEntityActivityFeed'(
    parameters?: Parameters<Paths.GetEntityActivityFeed.PathParameters & Paths.GetEntityActivityFeed.QueryParameters> | null,
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
    parameters?: Parameters<Paths.ValidateCadenceEntityEditRules.PathParameters & Paths.ValidateCadenceEntityEditRules.QueryParameters> | null,
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
    parameters?: Parameters<Paths.TriggerEntityAccessEvent.PathParameters & Paths.TriggerEntityAccessEvent.QueryParameters> | null,
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
  ['/v2/portal/sso/user']: {
    /**
     * createSSOUser - createSSOUser
     * 
     * Creates a portal user as an SSO user.
     */
    'post'(
      parameters?: Parameters<Paths.CreateSSOUser.QueryParameters> | null,
      data?: Paths.CreateSSOUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSSOUser.Responses.$201>
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
  ['/v2/portal/contact']: {
    /**
     * getContact - getContact
     * 
     * Retrieves the contact by ID.
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
  ['/v2/porta/users/by-related-entity']: {
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
  ['/v2/portal/user/confirm/{id}']: {
    /**
     * confirmUser - confirmUser
     * 
     * Confirm a portal user
     */
    'get'(
      parameters?: Parameters<Paths.ConfirmUser.PathParameters & Paths.ConfirmUser.QueryParameters> | null,
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
     * Self-assign contract by pre-configured identifiers.
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
  ['/v2/portal/entity/add-end-customer/{slug}/{id}']: {
    /**
     * addEndCustomerRelationToEntity - addEndCustomerRelationToEntity
     * 
     * Add portal user relation to an entity
     */
    'put'(
      parameters?: Parameters<Paths.AddEndCustomerRelationToEntity.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddEndCustomerRelationToEntity.Responses.$200>
  }
  ['/v2/portal/entity/{slug}/{id}/activity']: {
    /**
     * getEntityActivityFeed - getEntityActivityFeed
     * 
     * Get activity feed for an entity
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityActivityFeed.PathParameters & Paths.GetEntityActivityFeed.QueryParameters> | null,
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
      parameters?: Parameters<Paths.ValidateCadenceEntityEditRules.PathParameters & Paths.ValidateCadenceEntityEditRules.QueryParameters> | null,
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
      parameters?: Parameters<Paths.TriggerEntityAccessEvent.PathParameters & Paths.TriggerEntityAccessEvent.QueryParameters> | null,
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
