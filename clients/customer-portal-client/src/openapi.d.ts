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
        export type Forbidden = Schemas.ErrorResp;
        export type InternalServerError = Schemas.ErrorResp;
        export type InvalidRequest = Schemas.ErrorResp;
        export type NotFound = Schemas.ErrorResp;
        export type Unauthorized = Schemas.ErrorResp;
    }
    namespace Schemas {
        export interface ActionWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
            EntityId;
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
         * The mapped contact of the portal user
         */
        export interface Contact {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
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
        export interface ContentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
            EntityId;
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
            _schema: "contract";
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
             * Secondary identifier to identify a contact
             * example:
             * 123456
             */
            secondaryIdentifier?: string;
            /**
             * Identifiers to identify a contact
             */
            contactIdentifiers?: {
                [name: string]: string;
            };
            /**
             * ID of the contact
             * example:
             * 123456
             */
            contactId?: string;
        }
        export interface DeleteEntityFile {
            /**
             * Entity ID
             * example:
             * 123456
             */
            entity_id: string;
            /**
             * Entity type
             * example:
             * order
             */
            entity_type: string;
            /**
             * Array of file entity IDs
             */
            file_entity_ids: string[];
        }
        export interface DocumentWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
             * example:
             * 701f089d-6953-48b5-ac35-442de7c59cd3
             */
            confirmAccount?: string;
            /**
             * ID of the email template for forgot password
             * example:
             * 6538fddb-f0e9-4f0f-af51-6e57891ff20a
             */
            forgotPassword?: string;
            /**
             * ID of the email template for invitation
             * example:
             * 14ae65fb-0dc1-4863-8743-6bc01da469f6
             */
            invitation?: string;
            /**
             * ID of the email template for new quote
             * example:
             * b03e2b88-8f3f-4a93-8118-1fb07e9198a1
             */
            onNewQuote?: string;
            /**
             * ID of the email template for mapping a pending portal user with a contact
             * example:
             * 940134fa-50f2-4204-a08a-fd3afddbf39a
             */
            onMapAPendingUser?: string;
        }
        export interface Entity {
            [name: string]: any;
        }
        export interface EntityFileCount {
            /**
             * The ID of the parent entity
             * example:
             * d8dffa9a-6c90-4c4e-b8d1-032194b25526
             */
            entity_id: string;
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
        export type EntityId = string;
        export interface EntityItem {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
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
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter";
        export interface EntityWidget {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
            EntityId;
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
            EntityId;
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
                /**
                 * The ID of the parent entity
                 * example:
                 * d8dffa9a-6c90-4c4e-b8d1-032194b25526
                 */
                entity_id?: string;
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
            EntityId;
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
            EntityId;
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
            /**
             * ID of the design used to build the portal
             * example:
             * 9ba94f20-b872-4217-a259-2a90a8ee1a29
             */
            design_id: string;
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
             * Allow portal user self-registration without a mapped contact
             * example:
             * false
             */
            self_registration?: boolean;
            self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
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
             * Secondary identifier to identify a contact other than the email
             * example:
             * full_name
             */
            contact_secondary_identifier?: string;
            /**
             * Identifiers to identify a contact.
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
             * Journey actions allowed on an entity by a portal user
             */
            entity_actions?: {
                journey_id?: string;
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
             * ID of the organization
             * example:
             * 12345
             */
            id?: string;
            /**
             * Name of the organization
             * example:
             * ABC Company
             */
            org_name?: string;
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
                 * Release candidate settings
                 */
                release_candidate?: {
                    /**
                     * Enable/Disable the release candidate feature
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
            EntityId;
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
        export type PortalWidget = EntityWidget | ContentWidget | ActionWidget | TeaserWidget | DocumentWidget;
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
            EntityId;
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
        export interface SaveEntityFile {
            /**
             * Entity ID
             * example:
             * 123456
             */
            entity_id: string;
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
                 * 12345
                 */
                filename: string;
                /**
                 * File entity ID
                 * example:
                 * 12345
                 */
                file_entity_id?: string;
                /**
                 * Document type
                 * example:
                 * 12345
                 */
                document_type?: string;
                /**
                 * Access control level for the file
                 */
                access_control?: "private" | "public-read";
                /**
                 * Array of file tags
                 * example:
                 * 12345
                 */
                _tags?: string[];
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
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
            left?: {
                show?: boolean;
                showButton?: boolean;
            };
            right?: {
                show?: boolean;
                showButton?: boolean;
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
             * example:
             * 9ba94f20-b872-4217-a259-2a90a8ee1a29
             */
            design_id: string;
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
             * Allow portal user self-registration without a mapped contact
             * example:
             * false
             */
            self_registration?: boolean;
            self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY";
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
             * Secondary identifier to identify a contact other than the email
             * example:
             * full_name
             */
            contact_secondary_identifier?: string;
            /**
             * Identifiers to identify a contact.
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
             * Journey actions allowed on an entity by a portal user
             */
            entity_actions?: {
                journey_id?: string;
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
            type?: "link" | "journey";
            label: {
                en?: string;
                de?: string;
            };
            url: string;
        }
        export interface WidgetBase {
            id: string;
            type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET";
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
    }
}
declare namespace Paths {
    namespace AddEndCustomerRelationToEntity {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId;
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
            Components.Schemas.EntityId;
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
                deletedFiles?: string[];
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
                Components.Schemas.EntityId;
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
    namespace GetAllContracts {
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
            export type EntityIds = string[];
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
    namespace GetContactCount {
        namespace Parameters {
            export type Origin = /* Origin of the portal */ Components.Schemas.Origin;
        }
        export interface QueryParameters {
            origin: Parameters.Origin;
        }
        export type RequestBody = Components.Schemas.ContactCountRequest;
        namespace Responses {
            export interface $200 {
                /**
                 * Count of Contact
                 * example:
                 * 2
                 */
                count?: number;
            }
            export type $400 = Components.Responses.InvalidRequest;
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
            Components.Schemas.EntityId;
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
    namespace GetCountByEmail {
        namespace Parameters {
            /**
             * Portal user Email Address
             * example:
             * test@test.com
             */
            export type Email = string;
            /**
             * Organization ID
             * example:
             * 123
             */
            export type OrgId = string;
        }
        export interface QueryParameters {
            email: /**
             * Portal user Email Address
             * example:
             * test@test.com
             */
            Parameters.Email;
            org_id: /**
             * Organization ID
             * example:
             * 123
             */
            Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Count of Contact
                 * example:
                 * 2
                 */
                count?: number;
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetECPContact {
        namespace Parameters {
            /**
             * ID of the mapped contact
             * example:
             * 1234
             */
            export type Id = string;
        }
        export interface QueryParameters {
            id: /**
             * ID of the mapped contact
             * example:
             * 1234
             */
            Parameters.Id;
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
    namespace GetEntitiesByIdentifiers {
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
                data?: Components.Schemas.EntityItem[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
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
            Components.Schemas.EntityId;
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
            Components.Schemas.EntityId;
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
            Components.Schemas.EntityId;
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
    namespace GetSchemas {
        namespace Responses {
            export interface $200 {
                schemas?: Components.Schemas.Schema[];
            }
            export type $401 = Components.Responses.Unauthorized;
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
    namespace ReplaceECPTemplateVariables {
        export interface RequestBody {
            /**
             * ID of the contact
             * example:
             * 7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51
             */
            contactId?: string;
        }
        namespace Responses {
            export interface $200 {
                customerPortal?: {
                    /**
                     * example:
                     * https://end-customer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com
                     */
                    invitationLink?: string;
                };
                installerPortal?: {
                    /**
                     * example:
                     * https://installer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com
                     */
                    invitationLink?: string;
                };
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
    namespace UpdateContact {
        export type RequestBody = Components.Schemas.Entity;
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
    namespace UpdateContract {
        namespace Parameters {
            export type Id = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId;
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
            export type $403 = Components.Responses.Forbidden;
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
            Components.Schemas.EntityId;
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
            Components.Schemas.EntityId;
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
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the user exists in the portal
                 * example:
                 * true
                 */
                exists: boolean;
                user?: /* The portal user entity */ Components.Schemas.PortalUser;
            }
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
   * getCountByEmail - getCountByEmail
   * 
   * Check Contact by email
   */
  'getCountByEmail'(
    parameters?: Parameters<Paths.GetCountByEmail.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCountByEmail.Responses.$200>
  /**
   * getContactCount - getContactCount
   * 
   * Check existence of contacts.
   */
  'getContactCount'(
    parameters?: Parameters<Paths.GetContactCount.QueryParameters> | null,
    data?: Paths.GetContactCount.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContactCount.Responses.$200>
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
    parameters?: Parameters<UnknownParamsObject> | null,
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
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllOpportunities.Responses.$200>
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
    parameters?: Parameters<UnknownParamsObject> | null,
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
   * getEntitiesByIdentifiers - getEntitiesByIdentifiers
   * 
   * Get entities by identifiers by portal user
   */
  'getEntitiesByIdentifiers'(
    parameters?: Parameters<Paths.GetEntitiesByIdentifiers.PathParameters> | null,
    data?: Paths.GetEntitiesByIdentifiers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntitiesByIdentifiers.Responses.$200>
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
   * getFilesCountByEntity - getFileCountByEntity
   * 
   * Fetch file counts for all ECP user related entities
   */
  'getFilesCountByEntity'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFilesCountByEntity.Responses.$200>
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
  ['/v2/portal/contact/email/count']: {
    /**
     * getCountByEmail - getCountByEmail
     * 
     * Check Contact by email
     */
    'get'(
      parameters?: Parameters<Paths.GetCountByEmail.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCountByEmail.Responses.$200>
  }
  ['/v2/portal/public/contact/count']: {
    /**
     * getContactCount - getContactCount
     * 
     * Check existence of contacts.
     */
    'post'(
      parameters?: Parameters<Paths.GetContactCount.QueryParameters> | null,
      data?: Paths.GetContactCount.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContactCount.Responses.$200>
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
      parameters?: Parameters<UnknownParamsObject> | null,
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
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllOpportunities.Responses.$200>
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
      parameters?: Parameters<UnknownParamsObject> | null,
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
  ['/v2/portal/entity/by-identifiers/{slug}']: {
    /**
     * getEntitiesByIdentifiers - getEntitiesByIdentifiers
     * 
     * Get entities by identifiers by portal user
     */
    'post'(
      parameters?: Parameters<Paths.GetEntitiesByIdentifiers.PathParameters> | null,
      data?: Paths.GetEntitiesByIdentifiers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntitiesByIdentifiers.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
