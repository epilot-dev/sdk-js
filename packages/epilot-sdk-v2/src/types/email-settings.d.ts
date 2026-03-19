/* Auto-copied from email-settings-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type EmailAddressId = string;
        export type SharedInboxId = string;
    }
    export interface PathParameters {
        EmailAddressId?: Parameters.EmailAddressId;
        SharedInboxId?: Parameters.SharedInboxId;
    }
    namespace Responses {
        export type BadRequest = /* Standard error response format for all API errors. */ Schemas.ErrorResponse;
        export type Conflict = /* Standard error response format for all API errors. */ Schemas.ErrorResponse;
        export type CreateEmailAddressSuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse;
        export type CreateSharedInboxSuccessResponse = /* Shared inbox configuration with all associated metadata. */ Schemas.SharedInboxResponse;
        export type Forbidden = /* Standard error response format for all API errors. */ Schemas.ErrorResponse;
        export type GetEmailAddressSuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse;
        export type GetSharedInboxSuccessResponse = /* Shared inbox configuration with all associated metadata. */ Schemas.SharedInboxResponse;
        export type InternalServerError = /* Standard error response format for all API errors. */ Schemas.ErrorResponse;
        export type ListEmailAddressesSuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse[];
        export type ListInboxBucketsSuccessResponse = /* Inbox bucket representing the storage container for a shared inbox. */ Schemas.InboxBucketResponse[];
        export type ListSharedInboxesSuccessResponse = /* Shared inbox configuration with all associated metadata. */ Schemas.SharedInboxResponse[];
        export interface NoContent {
        }
        export type NotFound = /* Standard error response format for all API errors. */ Schemas.ErrorResponse;
        export type OutlookErrorResponse = Schemas.OutlookConnectionError;
        export type ProvisionEpilotEmailAddressSuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse;
        export type SetEmailAddressPrimarySuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse;
        export type UpdateEmailAddressSuccessResponse = /* Email address configuration with all associated metadata. */ Schemas.EmailAddressResponse;
        export type UpdateSharedInboxSuccessResponse = /* Shared inbox configuration with all associated metadata. */ Schemas.SharedInboxResponse;
    }
    namespace Schemas {
        /**
         * Mapping between an Outlook email and its Outlook Connection.
         * This tracks which provider/tenant provisions each Outlook email.
         *
         */
        export interface ConnectedOutlookEmail {
            /**
             * The Outlook shared mailbox email address
             */
            outlook_email: string; // email
            /**
             * Azure AD Tenant ID that provisions this mailbox
             */
            tenant_id?: string;
            /**
             * Provider type (for future extensibility)
             */
            provider?: "outlook";
            /**
             * When the mailbox was connected
             */
            connected_at?: string; // date-time
            /**
             * User who connected this mailbox
             */
            connected_by_user_id?: string;
        }
        /**
         * Request payload for creating a new email address.
         */
        export interface CreateEmailAddressPayload {
            /**
             * The email address to add (e.g., from a custom domain or external provider)
             * example:
             * support@yourcompany.com
             */
            address: string;
            /**
             * Display name shown as the sender name in emails
             * example:
             * Customer Support
             */
            name?: string;
            /**
             * List of user IDs who can send from this address
             * example:
             * [
             *   "user-123"
             * ]
             */
            user_ids?: string[];
            /**
             * List of group IDs whose members can send from this address
             * example:
             * [
             *   "group-456"
             * ]
             */
            group_ids?: string[];
            /**
             * ID of the signature to use by default when sending from this address
             * example:
             * sig-789
             */
            default_signature_id?: string;
            /**
             * ID of the shared inbox to associate with this address
             * example:
             * inbox-abc
             */
            shared_inbox_id?: string;
        }
        /**
         * Request payload for creating a new shared inbox.
         */
        export interface CreateSharedInboxPayload {
            /**
             * Optional custom ID for the inbox (auto-generated if not provided)
             * example:
             * support-inbox
             */
            id?: string;
            /**
             * Hex color code for visual identification in the UI (required)
             * example:
             * #2196F3
             */
            color: string;
            /**
             * Display name of the shared inbox (required)
             * example:
             * Sales Inquiries
             */
            name: string;
            /**
             * List of user IDs to assign to this inbox
             * example:
             * [
             *   "user-123",
             *   "user-456"
             * ]
             */
            assignees?: string[];
            /**
             * Optional description of the inbox purpose
             * example:
             * Inbound sales and pricing requests
             */
            description?: string;
        }
        /**
         * Custom email domain configuration.
         */
        export interface Domain {
            /**
             * The domain name to add or verify. Can be a root domain or subdomain.
             * Examples: "yourcompany.com", "mail.yourcompany.com"
             *
             * example:
             * mail.yourcompany.com
             */
            domain?: string;
        }
        /**
         * Email address configuration with all associated metadata.
         */
        export interface EmailAddressResponse {
            /**
             * Unique identifier (UUID) for the resource
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id: string;
            /**
             * Timestamp when the resource was created
             * example:
             * 2024-01-15T10:30:00Z
             */
            created_at: string; // date-time
            /**
             * Timestamp when the resource was last updated
             * example:
             * 2024-01-20T14:45:00Z
             */
            updated_at?: string; // date-time
            /**
             * User ID of the user who created the resource
             * example:
             * user-123
             */
            created_by?: string;
            /**
             * User ID of the user who last updated the resource
             * example:
             * user-456
             */
            updated_by?: string;
            /**
             * The email address string
             * example:
             * sales@yourcompany.com
             */
            address: string;
            /**
             * Display name shown as the sender name
             * example:
             * Sales Team
             */
            name?: string;
            /**
             * IDs of users who can send from this address
             * example:
             * [
             *   "user-123",
             *   "user-456"
             * ]
             */
            user_ids?: string[];
            /**
             * IDs of groups whose members can send from this address
             * example:
             * [
             *   "group-789"
             * ]
             */
            group_ids?: string[];
            /**
             * ID of the default signature for this address
             * example:
             * sig-abc
             */
            default_signature_id?: string;
            /**
             * ID of the associated shared inbox
             * example:
             * inbox-xyz
             */
            shared_inbox_id?: string;
            /**
             * Whether the address is currently active for sending
             * example:
             * true
             */
            is_active?: boolean;
            /**
             * Whether this is the organization's primary email address
             * example:
             * false
             */
            is_primary?: boolean;
            /**
             * Whether this is an epilot-managed address (@epilot.cloud)
             * example:
             * false
             */
            is_epilot_email_address?: boolean;
        }
        /**
         * Setting that allows to add an email address on the custom domain. For e.g; john@doe.com
         */
        export type EmailAddressSetting = "email_address";
        /**
         * Setting that allows to add a custom domain. For e.g; doe.com
         */
        export type EmailDomainSetting = "email_domain";
        /**
         * Standard error response format for all API errors.
         */
        export interface ErrorResponse {
            /**
             * Human-readable error message describing what went wrong
             * example:
             * Resource not found
             */
            error: string;
            /**
             * HTTP status code of the error
             * example:
             * 404
             */
            status: number;
        }
        /**
         * Inbox bucket representing the storage container for a shared inbox.
         */
        export interface InboxBucketResponse {
            /**
             * Unique identifier of the bucket
             * example:
             * bucket-abc
             */
            id: string;
            /**
             * ID of the shared inbox associated with this bucket
             * example:
             * inbox-xyz
             */
            inbox_id: string;
        }
        export type MailboxSyncFolderStatuses = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "SKIPPED";
        export interface MailboxSyncStatus {
            execution_id: string;
            status: MailboxSyncStatuses;
            timeframe: MailboxSyncTimeframePeriods;
            started_at: string; // date-time
            completed_at?: string; // date-time
            inbox?: {
                status?: MailboxSyncFolderStatuses;
                total_messages?: number;
                processed_messages?: number;
                failed_messages?: number;
            };
            sent_items?: {
                status?: MailboxSyncFolderStatuses;
                total_messages?: number;
                processed_messages?: number;
                failed_messages?: number;
            };
        }
        export type MailboxSyncStatuses = "RUNNING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED" | "CANCELLED";
        export type MailboxSyncTimeframePeriods = "5m" | "1w" | "2w" | "1m";
        export interface OutlookConnectionError {
            /**
             * Error code or message from the OAuth flow.
             */
            error: string;
            /**
             * Human-readable description of the error.
             */
            error_description?: string;
            /**
             * URL for tenant admin to grant consent, if applicable.
             */
            admin_consent_url?: string; // uri
        }
        export interface OutlookConnectionStatus {
            /**
             * Current connection status:
             * - pending_auth: Admin consent granted, waiting for user OAuth
             * - connected: Fully connected with valid tokens
             * - expired: Tokens expired, need to re-authenticate
             * - not_connected: No connection, initiate OAuth
             *
             */
            status: "connected" | "expired" | "pending_auth" | "not_connected";
            /**
             * Action for UI to take (all call GET /outlook/connect):
             * - connect: No connection, initiate OAuth
             * - authorize: Admin consent done, complete OAuth
             * - reconnect: Re-authenticate expired session
             * - none: Fully connected, no action needed
             *
             */
            action: "connect" | "authorize" | "reconnect" | "none";
            /**
             * Display name of user who connected
             */
            connected_by_display_name?: string;
            /**
             * Email of the user who connected
             */
            connected_by_email?: string; // email
            /**
             * Azure AD Object ID of user who connected
             */
            connected_by_user_id?: string;
            /**
             * When the connection was established
             */
            connected_at?: string; // date-time
            /**
             * When the connection was last updated
             */
            updated_at?: string; // date-time
            /**
             * Microsoft Azure AD tenant ID
             */
            tenant_id: string;
            /**
             * Granted permission scopes
             */
            scopes?: string[];
            /**
             * When the current access token expires
             */
            expires_at?: string; // date-time
            /**
             * Whether the current token is still valid
             */
            is_token_valid?: boolean;
        }
        /**
         * Request payload for provisioning an epilot-managed email address.
         */
        export interface ProvisionEpilotEmailAddressPayload {
            /**
             * The epilot email address to provision (must be on @epilot.cloud domain)
             * example:
             * mycompany@epilot.cloud
             */
            address: string;
        }
        /**
         * - Restrict duplicates within:
         *   * 10s
         *   * 5m
         *   * 1d
         *   * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
         * - Defaults to 3 minutes
         * - Negative values will be treated same as positive values
         * - If not set, defaults to 3 min
         * - If set as 0, then the no email will be treated as a duplicate
         * - Cannot have multiple values
         *
         */
        export type RestrictDuplicatesWithinSetting = "restrict_duplicates_within";
        /**
         * Request payload for setting an email address as the organization's primary address.
         */
        export interface SetEmailAddressPrimaryPayload {
            /**
             * The email address to set as primary
             * example:
             * sales@yourcompany.com
             */
            address: string;
        }
        /**
         * Generic setting object used for various email configuration types.
         * The applicable fields depend on the setting type:
         * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
         * - **email_domain**: Uses `value` (domain name)
         * - **whitelist_email_address**: Uses `value` (email address)
         * - **restrict_duplicates_within**: Uses `value` (time duration)
         *
         */
        export interface Setting {
            [name: string]: any;
            /**
             * Unique identifier of the setting
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id?: string;
            /**
             * Display name of the setting (used for signatures)
             * example:
             * Default Signature
             */
            name?: string;
            /**
             * Organization ID that owns this setting
             * example:
             * org-123
             */
            org_id?: string;
            type: SettingType;
            /**
             * The setting value. Interpretation depends on type:
             * - signature: Plain text version of the signature
             * - email_domain: Domain name (e.g., "yourcompany.com")
             * - whitelist_email_address: Email address to whitelist
             * - restrict_duplicates_within: Time duration (e.g., "5m", "1d")
             *
             * example:
             * Best regards, The Team
             */
            value?: string;
            /**
             * HTML content (only applicable for signature type)
             * example:
             * <p>Best regards,<br/><strong>The Team</strong></p>
             */
            html?: string;
            /**
             * ISO 8601 timestamp when the setting was created
             * example:
             * 2024-01-15T10:30:00Z
             */
            created_at?: string;
            /**
             * ISO 8601 timestamp when the setting was last updated
             * example:
             * 2024-01-20T14:45:00Z
             */
            updated_at?: string;
            /**
             * User ID of the creator
             * example:
             * user-123
             */
            created_by?: string;
            /**
             * User ID of the last editor
             * example:
             * user-456
             */
            updated_by?: string;
        }
        /**
         * Common metadata fields for all settings and resources.
         */
        export interface SettingMeta {
            /**
             * Unique identifier (UUID) for the resource
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id: string;
            /**
             * Timestamp when the resource was created
             * example:
             * 2024-01-15T10:30:00Z
             */
            created_at: string; // date-time
            /**
             * Timestamp when the resource was last updated
             * example:
             * 2024-01-20T14:45:00Z
             */
            updated_at?: string; // date-time
            /**
             * User ID of the user who created the resource
             * example:
             * user-123
             */
            created_by?: string;
            /**
             * User ID of the user who last updated the resource
             * example:
             * user-456
             */
            updated_by?: string;
        }
        export type SettingType = /* Setting that allows to add a signature. */ SignatureSetting | /* Setting that allows to add a custom domain. For e.g; doe.com */ EmailDomainSetting | /* Setting that allows to add an email address on the custom domain. For e.g; john@doe.com */ EmailAddressSetting | /**
         * - Setting that specifies a list of addresses exempt from being flagged as duplicate emails.
         * - An email will be flagged as a duplicate if it has the same content and is sent to the same recipient within the time frame specified in the RestrictDuplicatesWithinSetting.
         *
         */
        WhitelistEmailAddressSetting | /**
         * - Restrict duplicates within:
         *   * 10s
         *   * 5m
         *   * 1d
         *   * 5000 // It converts to 5 seconds.When expressed as a numerical value, it will be interpreted as being in milliseconds.
         * - Defaults to 3 minutes
         * - Negative values will be treated same as positive values
         * - If not set, defaults to 3 min
         * - If set as 0, then the no email will be treated as a duplicate
         * - Cannot have multiple values
         *
         */
        RestrictDuplicatesWithinSetting;
        export type SettingsResponse = /**
         * Generic setting object used for various email configuration types.
         * The applicable fields depend on the setting type:
         * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
         * - **email_domain**: Uses `value` (domain name)
         * - **whitelist_email_address**: Uses `value` (email address)
         * - **restrict_duplicates_within**: Uses `value` (time duration)
         *
         */
        Setting[] | /**
         * Generic setting object used for various email configuration types.
         * The applicable fields depend on the setting type:
         * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
         * - **email_domain**: Uses `value` (domain name)
         * - **whitelist_email_address**: Uses `value` (email address)
         * - **restrict_duplicates_within**: Uses `value` (time duration)
         *
         */
        Setting;
        /**
         * Shared inbox configuration with all associated metadata.
         */
        export interface SharedInboxResponse {
            /**
             * Unique identifier of the shared inbox
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id: string;
            /**
             * Timestamp when the resource was created
             * example:
             * 2024-01-15T10:30:00Z
             */
            created_at: string; // date-time
            /**
             * Timestamp when the resource was last updated
             * example:
             * 2024-01-20T14:45:00Z
             */
            updated_at?: string; // date-time
            /**
             * User ID of the user who created the resource
             * example:
             * user-123
             */
            created_by?: string;
            /**
             * User ID of the user who last updated the resource
             * example:
             * user-456
             */
            updated_by?: string;
            /**
             * Display name of the shared inbox
             * example:
             * Customer Support
             */
            name: string;
            /**
             * Hex color code for visual identification
             * example:
             * #4CAF50
             */
            color: string;
            /**
             * List of user IDs assigned to this inbox
             * example:
             * [
             *   "user-123",
             *   "user-456"
             * ]
             */
            assignees: string[];
            /**
             * Description of the inbox purpose
             * example:
             * Incoming customer support requests
             */
            description?: string;
            /**
             * ID of the associated storage bucket for messages
             * example:
             * bucket-xyz
             */
            bucket_id: string;
        }
        /**
         * Setting that allows to add a signature.
         */
        export type SignatureSetting = "signature";
        /**
         * Request payload for updating an email address configuration.
         * All fields are optional; only provided fields will be updated.
         *
         */
        export interface UpdateEmailAddressPayload {
            /**
             * Display name shown as the sender name in emails
             * example:
             * Sales Team
             */
            name?: string;
            /**
             * List of user IDs who can send from this address
             * example:
             * [
             *   "user-123",
             *   "user-456"
             * ]
             */
            user_ids?: string[];
            /**
             * List of group IDs whose members can send from this address
             * example:
             * [
             *   "group-789"
             * ]
             */
            group_ids?: string[];
            /**
             * ID of the signature to use by default when sending from this address
             * example:
             * sig-abc
             */
            default_signature_id?: string;
            /**
             * ID of the shared inbox to associate with this address
             * example:
             * inbox-xyz
             */
            shared_inbox_id?: string;
            /**
             * Whether the email address is active and can be used for sending
             * example:
             * true
             */
            is_active?: boolean;
        }
        /**
         * Request payload for updating a shared inbox configuration.
         * All fields are optional; only provided fields will be updated.
         *
         */
        export interface UpdateSharedInboxPayload {
            /**
             * Hex color code for visual identification in the UI
             * example:
             * #4CAF50
             */
            color?: string;
            /**
             * Display name of the shared inbox
             * example:
             * Customer Support
             */
            name?: string;
            /**
             * List of user IDs assigned to this inbox
             * example:
             * [
             *   "user-123",
             *   "user-456"
             * ]
             */
            assignees?: string[];
            /**
             * Optional description of the inbox purpose
             * example:
             * Incoming customer support requests
             */
            description?: string;
        }
        /**
         * - Setting that specifies a list of addresses exempt from being flagged as duplicate emails.
         * - An email will be flagged as a duplicate if it has the same content and is sent to the same recipient within the time frame specified in the RestrictDuplicatesWithinSetting.
         *
         */
        export type WhitelistEmailAddressSetting = "whitelist_email_address";
    }
}
export declare namespace Paths {
    namespace AddDomain {
        export type RequestBody = /* Custom email domain configuration. */ Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace AddEmailAddress {
        export type RequestBody = /* Request payload for creating a new email address. */ Components.Schemas.CreateEmailAddressPayload;
        namespace Responses {
            export type $201 = Components.Responses.CreateEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace AddSetting {
        export type RequestBody = /**
         * Generic setting object used for various email configuration types.
         * The applicable fields depend on the setting type:
         * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
         * - **email_domain**: Uses `value` (domain name)
         * - **whitelist_email_address**: Uses `value` (email address)
         * - **restrict_duplicates_within**: Uses `value` (time duration)
         *
         */
        Components.Schemas.Setting;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace AddSharedInbox {
        export type RequestBody = /* Request payload for creating a new shared inbox. */ Components.Schemas.CreateSharedInboxPayload;
        namespace Responses {
            export type $201 = Components.Responses.CreateSharedInboxSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ConnectMsTeams {
        namespace Responses {
            export interface $200 {
                connected?: boolean;
                connected_at?: string; // date-time
            }
            export interface $400 {
                error?: string;
                message?: string;
            }
        }
    }
    namespace ConnectOutlook {
        namespace Responses {
            export interface $200 {
                authorization_url?: string;
            }
            export type $403 = Components.Responses.OutlookErrorResponse;
        }
    }
    namespace ConnectOutlookMailbox {
        export interface RequestBody {
            /**
             * Email address of the Outlook mailbox to connect
             */
            email: string; // email
            /**
             * Shared inbox ID to associate with the mailbox. Defaults to the default shared inbox.
             */
            shared_inbox_id?: string;
            /**
             * Optional timeframe for initial mailbox sync. When provided, triggers an automatic
             * mailbox sync after connecting the mailbox, syncing emails from the specified period.
             *
             */
            mailboxSyncTimeframe?: "5m" | "1w" | "2w" | "1m";
        }
        namespace Responses {
            export interface $201 {
                email_address: /* Email address configuration with all associated metadata. */ Components.Schemas.EmailAddressResponse;
                /**
                 * The email of the connected mailbox
                 */
                outlook_email: string; // email
                /**
                 * Azure AD Tenant ID that provisions this mailbox
                 */
                tenant_id: string;
                /**
                 * The provider type
                 */
                provider: "outlook";
            }
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeleteDomain {
        export type RequestBody = /* Custom email domain configuration. */ Components.Schemas.Domain;
        namespace Responses {
            export interface $204 {
            }
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DeleteEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $204 = Components.Responses.NoContent;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteSetting {
        export interface RequestBody {
            type: Components.Schemas.SettingType;
            /**
             * The unique identifier of the setting to delete
             * example:
             * a10bd0ff-4391-4cfc-88ee-b19d718a9bf7
             */
            id: string;
        }
        namespace Responses {
            export type $200 = /**
             * Generic setting object used for various email configuration types.
             * The applicable fields depend on the setting type:
             * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
             * - **email_domain**: Uses `value` (domain name)
             * - **whitelist_email_address**: Uses `value` (email address)
             * - **restrict_duplicates_within**: Uses `value` (time duration)
             *
             */
            Components.Schemas.Setting;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DeleteSharedInbox {
        namespace Parameters {
            export type Id = string;
            export type SuccessorInboxId = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            successorInboxId?: Parameters.SuccessorInboxId;
        }
        namespace Responses {
            export type $204 = Components.Responses.NoContent;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DisconnectMsTeams {
        namespace Responses {
            export interface $200 {
                connected?: boolean;
            }
        }
    }
    namespace DisconnectOutlook {
        export interface RequestBody {
            /**
             * Azure AD Tenant ID of the connection to disconnect
             */
            tenant_id: string;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
                /**
                 * The tenant ID that was disconnected
                 */
                tenant_id?: string;
                /**
                 * List of shared inbox IDs that were affected by the disconnection
                 */
                affected_shared_inboxes?: string[];
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace DisconnectOutlookMailbox {
        namespace Parameters {
            export type Email = string; // email
        }
        export interface PathParameters {
            email: Parameters.Email /* email */;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                /**
                 * The email address that was disconnected
                 */
                email: string; // email
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetConnectedOutlookEmails {
        namespace Responses {
            export interface $200 {
                outlook_emails: /**
                 * Mapping between an Outlook email and its Outlook Connection.
                 * This tracks which provider/tenant provisions each Outlook email.
                 *
                 */
                Components.Schemas.ConnectedOutlookEmail[];
                /**
                 * Number of Outlook emails
                 */
                count: number;
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetEmailAddressSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMailboxSyncStatus {
        namespace Parameters {
            export type Email = string; // email
        }
        export interface PathParameters {
            email: Parameters.Email /* email */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MailboxSyncStatus;
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetMsTeamsStatus {
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the Teams channel is connected
                 */
                connected?: boolean;
                /**
                 * When the Teams channel was connected
                 */
                connected_at?: string; // date-time
                /**
                 * User ID who connected the Teams channel
                 */
                connected_by_user_id?: string;
            }
        }
    }
    namespace GetOutlookConnectionStatus {
        namespace Responses {
            export interface $200 {
                /**
                 * List of Outlook connections (one per tenant)
                 */
                connections: Components.Schemas.OutlookConnectionStatus[];
                /**
                 * Whether any connections exist
                 */
                has_connections: boolean;
                /**
                 * Whether Microsoft Teams features are enabled for this organization
                 */
                teams_enabled?: boolean;
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetSettings {
        namespace Parameters {
            export type Id = string;
            export type Type = Components.Schemas.SettingType;
        }
        export interface QueryParameters {
            type: Parameters.Type;
            id?: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSharedInbox {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetSharedInboxSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListEmailAddresses {
        namespace Responses {
            export type $200 = Components.Responses.ListEmailAddressesSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListInboxBuckets {
        namespace Responses {
            export type $200 = Components.Responses.ListInboxBucketsSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace ListSharedInboxes {
        namespace Responses {
            export type $200 = Components.Responses.ListSharedInboxesSuccessResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace OutlookOAuthCallback {
        namespace Parameters {
            export type AdminConsent = string;
            export type ClientInfo = string;
            export type Code = string;
            export type Error = string;
            export type ErrorDescription = string;
            export type ErrorSubcode = string;
            export type ErrorUri = string;
            export type SessionState = string;
            export type State = string;
            export type Tenant = string;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
            state: Parameters.State;
            session_state?: Parameters.SessionState;
            error?: Parameters.Error;
            error_description?: Parameters.ErrorDescription;
            error_subcode?: Parameters.ErrorSubcode;
            client_info?: Parameters.ClientInfo;
            error_uri?: Parameters.ErrorUri;
            admin_consent?: Parameters.AdminConsent;
            tenant?: Parameters.Tenant;
        }
        namespace Responses {
            export interface $200 {
                connected?: boolean;
                expires_at?: string; // date-time
                scope?: string;
            }
        }
    }
    namespace ProvisionEpilotEmailAddress {
        export type RequestBody = /* Request payload for provisioning an epilot-managed email address. */ Components.Schemas.ProvisionEpilotEmailAddressPayload;
        namespace Responses {
            export type $200 = Components.Responses.ProvisionEpilotEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace RetryMailboxSync {
        namespace Parameters {
            export type Email = string; // email
        }
        export interface PathParameters {
            email: Parameters.Email /* email */;
        }
        export interface RequestBody {
            /**
             * Execution ID of the sync to retry
             */
            sync_id: string;
            /**
             * Retry scope. Use 'all_failed' to retry all retryable failed messages.
             */
            scope?: "all_failed";
            /**
             * Specific Graph message IDs to retry (alternative to scope)
             */
            message_ids?: string[];
        }
        namespace Responses {
            export interface $202 {
                /**
                 * Execution ID for the retry sync
                 */
                retry_execution_id: string;
                /**
                 * Number of messages queued for retry
                 */
                messages_queued: number;
            }
            export interface $404 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace SetEmailAddressPrimary {
        export type RequestBody = /* Request payload for setting an email address as the organization's primary address. */ Components.Schemas.SetEmailAddressPrimaryPayload;
        namespace Responses {
            export type $200 = Components.Responses.SetEmailAddressPrimarySuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace StartMailboxSync {
        namespace Parameters {
            export type Email = string; // email
        }
        export interface PathParameters {
            email: Parameters.Email /* email */;
        }
        export interface RequestBody {
            /**
             * Sync period:
             * - 5m: last 5 minutes (quick sync)
             * - 1w: 1 week
             * - 2w: 2 weeks
             * - 1m: 1 month
             *
             */
            timeframe: Components.Schemas.MailboxSyncTimeframePeriods;
        }
        namespace Responses {
            export interface $202 {
                /**
                 * The execution ID
                 */
                execution_id: string;
                status: Components.Schemas.MailboxSyncStatuses;
                timeframe: Components.Schemas.MailboxSyncTimeframePeriods;
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace UpdateEmailAddress {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /**
         * Request payload for updating an email address configuration.
         * All fields are optional; only provided fields will be updated.
         *
         */
        Components.Schemas.UpdateEmailAddressPayload;
        namespace Responses {
            export type $200 = Components.Responses.UpdateEmailAddressSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateSetting {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /**
         * Generic setting object used for various email configuration types.
         * The applicable fields depend on the setting type:
         * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
         * - **email_domain**: Uses `value` (domain name)
         * - **whitelist_email_address**: Uses `value` (email address)
         * - **restrict_duplicates_within**: Uses `value` (time duration)
         *
         */
        Components.Schemas.Setting;
        namespace Responses {
            export type $200 = /**
             * Generic setting object used for various email configuration types.
             * The applicable fields depend on the setting type:
             * - **signature**: Uses `name`, `value` (plain text), and `html` (rich text)
             * - **email_domain**: Uses `value` (domain name)
             * - **whitelist_email_address**: Uses `value` (email address)
             * - **restrict_duplicates_within**: Uses `value` (time duration)
             *
             */
            Components.Schemas.Setting;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace UpdateSharedInbox {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /**
         * Request payload for updating a shared inbox configuration.
         * All fields are optional; only provided fields will be updated.
         *
         */
        Components.Schemas.UpdateSharedInboxPayload;
        namespace Responses {
            export type $200 = Components.Responses.UpdateSharedInboxSuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace VerifyDomain {
        export type RequestBody = /* Custom email domain configuration. */ Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace VerifyNameServers {
        export type RequestBody = /* Custom email domain configuration. */ Components.Schemas.Domain;
        namespace Responses {
            export type $200 = Components.Schemas.SettingsResponse;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
}


export interface OperationMethods {
  /**
   * provisionEpilotEmailAddress - provisionEpilotEmailAddress
   * 
   * Provisions or reactivates an epilot-managed email address for the organization.
   * 
   * When provisioning a new epilot email address, any previously active epilot email addresses
   * will be automatically deactivated. Only one epilot email address can be active at a time.
   * 
   * Epilot email addresses use the `@epilot.cloud` domain and are fully managed by the platform.
   * 
   */
  'provisionEpilotEmailAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ProvisionEpilotEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProvisionEpilotEmailAddress.Responses.$200>
  /**
   * setEmailAddressPrimary - setEmailAddressPrimary
   * 
   * Sets the specified email address as the primary address for the organization.
   * 
   * The primary email address is used as the default sender address when composing new emails.
   * Only one email address can be primary at a time; setting a new primary will unset the previous one.
   * 
   */
  'setEmailAddressPrimary'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SetEmailAddressPrimary.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetEmailAddressPrimary.Responses.$200>
  /**
   * getEmailAddress - getEmailAddress
   * 
   * Retrieves the details of a specific email address by its ID.
   * 
   * Returns the full configuration including display name, assigned users/groups,
   * default signature, and shared inbox association.
   * 
   */
  'getEmailAddress'(
    parameters?: Parameters<Paths.GetEmailAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmailAddress.Responses.$200>
  /**
   * updateEmailAddress - updateEmailAddress
   * 
   * Updates the configuration of an existing email address.
   * 
   * You can modify:
   * - Display name
   * - Assigned users and groups
   * - Default signature
   * - Shared inbox association
   * - Active status
   * 
   */
  'updateEmailAddress'(
    parameters?: Parameters<Paths.UpdateEmailAddress.PathParameters> | null,
    data?: Paths.UpdateEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEmailAddress.Responses.$200>
  /**
   * deleteEmailAddress - deleteEmailAddress
   * 
   * Permanently deletes an email address from the organization.
   * 
   * **Warning**: This action cannot be undone. Users will no longer be able to send
   * emails from this address after deletion.
   * 
   */
  'deleteEmailAddress'(
    parameters?: Parameters<Paths.DeleteEmailAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEmailAddress.Responses.$204>
  /**
   * listEmailAddresses - listEmailAddresses
   * 
   * Retrieves all email addresses configured for the organization.
   * 
   * Returns an array of email address configurations including their IDs, display names,
   * assigned users/groups, signatures, and status flags.
   * 
   */
  'listEmailAddresses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEmailAddresses.Responses.$200>
  /**
   * addEmailAddress - addEmailAddress
   * 
   * Adds a new email address to the organization.
   * 
   * The email address can be from a custom domain (if configured) or any external
   * email provider. Optionally assign users, groups, and a default signature.
   * 
   */
  'addEmailAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddEmailAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddEmailAddress.Responses.$201>
  /**
   * getSharedInbox - getSharedInbox
   * 
   * Retrieves the details of a specific shared inbox by its ID.
   * 
   * Returns the inbox configuration including name, color, description, assigned team members,
   * and the associated bucket ID.
   * 
   */
  'getSharedInbox'(
    parameters?: Parameters<Paths.GetSharedInbox.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharedInbox.Responses.$200>
  /**
   * updateSharedInbox - updateSharedInbox
   * 
   * Updates the configuration of an existing shared inbox.
   * 
   * You can modify the inbox name, color, description, and team member assignments.
   * Changes take effect immediately for all associated email addresses.
   * 
   */
  'updateSharedInbox'(
    parameters?: Parameters<Paths.UpdateSharedInbox.PathParameters> | null,
    data?: Paths.UpdateSharedInbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSharedInbox.Responses.$200>
  /**
   * deleteSharedInbox - deleteSharedInbox
   * 
   * Deletes a shared inbox and reroutes all associated emails to a successor inbox.
   * 
   * When a shared inbox is deleted:
   * - All email addresses associated with this inbox will be reassigned to the successor
   * - If no successor is specified, emails are routed to the default inbox
   * - The inbox's message history is preserved in the successor inbox
   * 
   * **Note**: The default inbox cannot be deleted.
   * 
   */
  'deleteSharedInbox'(
    parameters?: Parameters<Paths.DeleteSharedInbox.QueryParameters & Paths.DeleteSharedInbox.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSharedInbox.Responses.$204>
  /**
   * listSharedInboxes - listSharedInboxes
   * 
   * Retrieves all shared inboxes configured for the organization.
   * 
   * **Note**: The default inbox (with ID `default`) is not included in this list but is
   * always available for all organizations. You do not need to create it explicitly.
   * 
   */
  'listSharedInboxes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSharedInboxes.Responses.$200>
  /**
   * addSharedInbox - addSharedInbox
   * 
   * Creates a new shared inbox for the organization.
   * 
   * Shared inboxes help teams organize and categorize incoming emails.
   * Each inbox requires a name and color for visual identification.
   * 
   */
  'addSharedInbox'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddSharedInbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddSharedInbox.Responses.$201>
  /**
   * listInboxBuckets - listInboxBuckets
   * 
   * Retrieves all inbox buckets for the organization.
   * 
   * Inbox buckets are internal storage containers that correspond to shared inboxes.
   * Each shared inbox has an associated bucket for storing messages.
   * 
   * **Note**: The default bucket (with ID `default`) is not included in this list but
   * is always available for all organizations.
   * 
   */
  'listInboxBuckets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInboxBuckets.Responses.$200>
  /**
   * connectOutlook - connectOutlook
   * 
   * Returns Microsoft authorization URL for Outlook OAuth.
   */
  'connectOutlook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConnectOutlook.Responses.$200>
  /**
   * getOutlookConnectionStatus - getOutlookConnectionStatus
   * 
   * Returns all Microsoft 365 / Outlook connections for the organization.
   * Supports multiple connections (one per Azure AD tenant).
   * 
   * Each connection includes an `action` field that tells the UI what button to show
   * and what endpoint to call. All actions use GET /outlook/connect.
   * 
   */
  'getOutlookConnectionStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOutlookConnectionStatus.Responses.$200>
  /**
   * disconnectOutlook - disconnectOutlook
   * 
   * Removes the Microsoft 365 / Outlook connection for a specific tenant.
   * This deletes the stored tokens and disconnects the integration.
   * 
   */
  'disconnectOutlook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DisconnectOutlook.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DisconnectOutlook.Responses.$200>
  /**
   * connectMsTeams - connectMsTeams
   * 
   * Connects Microsoft Teams channel (click-to-call deep links, meetings) for the organization.
   * Requires an active Microsoft 365 / Outlook connection.
   * 
   */
  'connectMsTeams'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConnectMsTeams.Responses.$200>
  /**
   * disconnectMsTeams - disconnectMsTeams
   * 
   * Disconnects Microsoft Teams channel for the organization.
   * 
   */
  'disconnectMsTeams'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DisconnectMsTeams.Responses.$200>
  /**
   * getMsTeamsStatus - getMsTeamsStatus
   * 
   * Returns the connection status of the Microsoft Teams channel for the organization.
   * 
   */
  'getMsTeamsStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMsTeamsStatus.Responses.$200>
  /**
   * connectOutlookMailbox - connectOutlookMailbox
   * 
   * Connects an Outlook mailbox:
   *   1. Validates the user has access to the mailbox via Microsoft Graph API
   *   2. Creates a mapping between the email address of the mailbox and the outlook connection
   *   3. Enables the user to send emails as the mailbox's email address
   * 
   */
  'connectOutlookMailbox'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConnectOutlookMailbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConnectOutlookMailbox.Responses.$201>
  /**
   * disconnectOutlookMailbox - Disconnect Outlook Mailbox
   * 
   * Disconnects a single Outlook mailbox by email address.
   * Deletes the email address entity, Outlook email mapping, and Graph API subscriptions.
   * Does not affect the tenant-level Outlook connection.
   * 
   */
  'disconnectOutlookMailbox'(
    parameters?: Parameters<Paths.DisconnectOutlookMailbox.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DisconnectOutlookMailbox.Responses.$200>
  /**
   * startMailboxSync - Start Mailbox Sync
   * 
   * Triggers an Outlook mailbox sync for the specified email address.
   * Syncs existing emails (inbox + sent items) for the specified timeframe.
   * 
   */
  'startMailboxSync'(
    parameters?: Parameters<Paths.StartMailboxSync.PathParameters> | null,
    data?: Paths.StartMailboxSync.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartMailboxSync.Responses.$202>
  /**
   * getMailboxSyncStatus - Get Mailbox Sync Status
   * 
   * Returns the current or latest sync status for the specified mailbox.
   * Poll this endpoint to track sync progress.
   * 
   */
  'getMailboxSyncStatus'(
    parameters?: Parameters<Paths.GetMailboxSyncStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMailboxSyncStatus.Responses.$200>
  /**
   * retryMailboxSync - Retry Failed Messages
   * 
   * Retries failed messages from a previous sync execution.
   * Only retries messages with status FAILED (not PERMANENTLY_FAILED).
   * Messages that fail 3+ retries become PERMANENTLY_FAILED.
   * 
   */
  'retryMailboxSync'(
    parameters?: Parameters<Paths.RetryMailboxSync.PathParameters> | null,
    data?: Paths.RetryMailboxSync.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetryMailboxSync.Responses.$202>
  /**
   * getConnectedOutlookEmails - getConnectedOutlookEmails
   * 
   * Returns all Outlook email addresses connected to the organization.
   * 
   */
  'getConnectedOutlookEmails'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConnectedOutlookEmails.Responses.$200>
  /**
   * outlookOAuthCallback - outlookOAuthCallback
   * 
   * Exchanges authorization code for tokens and stores them.
   */
  'outlookOAuthCallback'(
    parameters?: Parameters<Paths.OutlookOAuthCallback.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OutlookOAuthCallback.Responses.$200>
  /**
   * getSettings - getSettings
   * 
   * Retrieves settings of a specific type for the organization.
   * 
   * If an `id` is provided, returns only that specific setting.
   * Otherwise, returns all settings of the specified type.
   * 
   * ## Setting Types
   * 
   * | Type | Description |
   * |------|-------------|
   * | `signature` | HTML email signatures |
   * | `email_domain` | Custom email domains |
   * | `email_address` | Sender email addresses |
   * | `whitelist_email_address` | Addresses exempt from duplicate detection |
   * | `restrict_duplicates_within` | Time window for duplicate email detection |
   * 
   */
  'getSettings'(
    parameters?: Parameters<Paths.GetSettings.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettings.Responses.$200>
  /**
   * addSetting - addSetting
   * 
   * Creates a new setting of the specified type.
   * 
   * The setting type determines which fields are applicable:
   * - **signature**: Requires `name`, `value` (plain text), and `html` (HTML content)
   * - **email_domain**: Requires `value` (domain name)
   * - **whitelist_email_address**: Requires `value` (email address)
   * - **restrict_duplicates_within**: Requires `value` (time duration like "5m", "1d")
   * 
   */
  'addSetting'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddSetting.Responses.$200>
  /**
   * deleteSetting - deleteSetting
   * 
   * Deletes a setting by its ID and type.
   * 
   * Both the `id` and `type` are required to uniquely identify the setting to delete.
   * 
   * **Warning**: This action cannot be undone.
   * 
   */
  'deleteSetting'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSetting.Responses.$200>
  /**
   * updateSetting - updateSetting
   * 
   * Updates an existing setting identified by its ID.
   * 
   * Include the `type` field in the request body to specify which setting type
   * is being updated. Only the fields provided will be updated.
   * 
   */
  'updateSetting'(
    parameters?: Parameters<Paths.UpdateSetting.PathParameters> | null,
    data?: Paths.UpdateSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSetting.Responses.$200>
  /**
   * addDomain - addDomain
   * 
   * Adds a custom email domain to the organization.
   * 
   * After adding the domain, you must:
   * 1. Configure the required DNS records (provided in the response)
   * 2. Verify the domain using the verification endpoint
   * 
   * Until verification is complete, the domain cannot be used for sending emails.
   * 
   */
  'addDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddDomain.Responses.$200>
  /**
   * deleteDomain - deleteDomain
   * 
   * Removes a custom email domain from the organization.
   * 
   * **Warning**: Deleting a domain will prevent sending emails from any addresses
   * using this domain. Existing email addresses on this domain should be removed
   * or reassigned before deleting the domain.
   * 
   */
  'deleteDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDomain.Responses.$204>
  /**
   * verifyNameServers - verifyNameServers
   * 
   * Verifies that the domain's name server (NS) records are correctly configured.
   * 
   * This check ensures that DNS resolution is properly set up for the domain
   * before proceeding with full domain verification.
   * 
   * Run this verification after configuring NS records in your DNS provider.
   * 
   */
  'verifyNameServers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyNameServers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyNameServers.Responses.$200>
  /**
   * verifyDomain - verifyDomain
   * 
   * Verifies ownership and configuration of a custom email domain.
   * 
   * Domain verification checks:
   * - DNS TXT records for domain ownership
   * - MX records for email routing
   * - SPF records for sender authentication
   * - DKIM records for email signing
   * 
   * Once verified, the domain can be used to create email addresses and send emails.
   * 
   */
  'verifyDomain'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyDomain.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyDomain.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/email-settings/email-addresses/epilot:provision']: {
    /**
     * provisionEpilotEmailAddress - provisionEpilotEmailAddress
     * 
     * Provisions or reactivates an epilot-managed email address for the organization.
     * 
     * When provisioning a new epilot email address, any previously active epilot email addresses
     * will be automatically deactivated. Only one epilot email address can be active at a time.
     * 
     * Epilot email addresses use the `@epilot.cloud` domain and are fully managed by the platform.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ProvisionEpilotEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProvisionEpilotEmailAddress.Responses.$200>
  }
  ['/v2/email-settings/email-addresses/primary']: {
    /**
     * setEmailAddressPrimary - setEmailAddressPrimary
     * 
     * Sets the specified email address as the primary address for the organization.
     * 
     * The primary email address is used as the default sender address when composing new emails.
     * Only one email address can be primary at a time; setting a new primary will unset the previous one.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SetEmailAddressPrimary.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetEmailAddressPrimary.Responses.$200>
  }
  ['/v2/email-settings/email-addresses/{id}']: {
    /**
     * getEmailAddress - getEmailAddress
     * 
     * Retrieves the details of a specific email address by its ID.
     * 
     * Returns the full configuration including display name, assigned users/groups,
     * default signature, and shared inbox association.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEmailAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmailAddress.Responses.$200>
    /**
     * deleteEmailAddress - deleteEmailAddress
     * 
     * Permanently deletes an email address from the organization.
     * 
     * **Warning**: This action cannot be undone. Users will no longer be able to send
     * emails from this address after deletion.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEmailAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEmailAddress.Responses.$204>
    /**
     * updateEmailAddress - updateEmailAddress
     * 
     * Updates the configuration of an existing email address.
     * 
     * You can modify:
     * - Display name
     * - Assigned users and groups
     * - Default signature
     * - Shared inbox association
     * - Active status
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateEmailAddress.PathParameters> | null,
      data?: Paths.UpdateEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEmailAddress.Responses.$200>
  }
  ['/v2/email-settings/email-addresses']: {
    /**
     * listEmailAddresses - listEmailAddresses
     * 
     * Retrieves all email addresses configured for the organization.
     * 
     * Returns an array of email address configurations including their IDs, display names,
     * assigned users/groups, signatures, and status flags.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEmailAddresses.Responses.$200>
    /**
     * addEmailAddress - addEmailAddress
     * 
     * Adds a new email address to the organization.
     * 
     * The email address can be from a custom domain (if configured) or any external
     * email provider. Optionally assign users, groups, and a default signature.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddEmailAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddEmailAddress.Responses.$201>
  }
  ['/v2/email-settings/shared-inboxes/{id}']: {
    /**
     * getSharedInbox - getSharedInbox
     * 
     * Retrieves the details of a specific shared inbox by its ID.
     * 
     * Returns the inbox configuration including name, color, description, assigned team members,
     * and the associated bucket ID.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSharedInbox.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharedInbox.Responses.$200>
    /**
     * deleteSharedInbox - deleteSharedInbox
     * 
     * Deletes a shared inbox and reroutes all associated emails to a successor inbox.
     * 
     * When a shared inbox is deleted:
     * - All email addresses associated with this inbox will be reassigned to the successor
     * - If no successor is specified, emails are routed to the default inbox
     * - The inbox's message history is preserved in the successor inbox
     * 
     * **Note**: The default inbox cannot be deleted.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSharedInbox.QueryParameters & Paths.DeleteSharedInbox.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSharedInbox.Responses.$204>
    /**
     * updateSharedInbox - updateSharedInbox
     * 
     * Updates the configuration of an existing shared inbox.
     * 
     * You can modify the inbox name, color, description, and team member assignments.
     * Changes take effect immediately for all associated email addresses.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateSharedInbox.PathParameters> | null,
      data?: Paths.UpdateSharedInbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSharedInbox.Responses.$200>
  }
  ['/v2/email-settings/shared-inboxes']: {
    /**
     * listSharedInboxes - listSharedInboxes
     * 
     * Retrieves all shared inboxes configured for the organization.
     * 
     * **Note**: The default inbox (with ID `default`) is not included in this list but is
     * always available for all organizations. You do not need to create it explicitly.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSharedInboxes.Responses.$200>
    /**
     * addSharedInbox - addSharedInbox
     * 
     * Creates a new shared inbox for the organization.
     * 
     * Shared inboxes help teams organize and categorize incoming emails.
     * Each inbox requires a name and color for visual identification.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddSharedInbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddSharedInbox.Responses.$201>
  }
  ['/v2/email-settings/inbox-buckets']: {
    /**
     * listInboxBuckets - listInboxBuckets
     * 
     * Retrieves all inbox buckets for the organization.
     * 
     * Inbox buckets are internal storage containers that correspond to shared inboxes.
     * Each shared inbox has an associated bucket for storing messages.
     * 
     * **Note**: The default bucket (with ID `default`) is not included in this list but
     * is always available for all organizations.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInboxBuckets.Responses.$200>
  }
  ['/v2/outlook/connect']: {
    /**
     * connectOutlook - connectOutlook
     * 
     * Returns Microsoft authorization URL for Outlook OAuth.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConnectOutlook.Responses.$200>
  }
  ['/v2/outlook/connection/status']: {
    /**
     * getOutlookConnectionStatus - getOutlookConnectionStatus
     * 
     * Returns all Microsoft 365 / Outlook connections for the organization.
     * Supports multiple connections (one per Azure AD tenant).
     * 
     * Each connection includes an `action` field that tells the UI what button to show
     * and what endpoint to call. All actions use GET /outlook/connect.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOutlookConnectionStatus.Responses.$200>
  }
  ['/v2/outlook/connection/disconnect']: {
    /**
     * disconnectOutlook - disconnectOutlook
     * 
     * Removes the Microsoft 365 / Outlook connection for a specific tenant.
     * This deletes the stored tokens and disconnects the integration.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DisconnectOutlook.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DisconnectOutlook.Responses.$200>
  }
  ['/v2/channels/msteams/connect']: {
    /**
     * connectMsTeams - connectMsTeams
     * 
     * Connects Microsoft Teams channel (click-to-call deep links, meetings) for the organization.
     * Requires an active Microsoft 365 / Outlook connection.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConnectMsTeams.Responses.$200>
  }
  ['/v2/channels/msteams/disconnect']: {
    /**
     * disconnectMsTeams - disconnectMsTeams
     * 
     * Disconnects Microsoft Teams channel for the organization.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DisconnectMsTeams.Responses.$200>
  }
  ['/v2/channels/msteams/status']: {
    /**
     * getMsTeamsStatus - getMsTeamsStatus
     * 
     * Returns the connection status of the Microsoft Teams channel for the organization.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMsTeamsStatus.Responses.$200>
  }
  ['/v2/outlook/mailbox/connect']: {
    /**
     * connectOutlookMailbox - connectOutlookMailbox
     * 
     * Connects an Outlook mailbox:
     *   1. Validates the user has access to the mailbox via Microsoft Graph API
     *   2. Creates a mapping between the email address of the mailbox and the outlook connection
     *   3. Enables the user to send emails as the mailbox's email address
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConnectOutlookMailbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConnectOutlookMailbox.Responses.$201>
  }
  ['/v2/outlook/mailbox/{email}/disconnect']: {
    /**
     * disconnectOutlookMailbox - Disconnect Outlook Mailbox
     * 
     * Disconnects a single Outlook mailbox by email address.
     * Deletes the email address entity, Outlook email mapping, and Graph API subscriptions.
     * Does not affect the tenant-level Outlook connection.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.DisconnectOutlookMailbox.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DisconnectOutlookMailbox.Responses.$200>
  }
  ['/v2/outlook/mailbox/{email}/sync']: {
    /**
     * startMailboxSync - Start Mailbox Sync
     * 
     * Triggers an Outlook mailbox sync for the specified email address.
     * Syncs existing emails (inbox + sent items) for the specified timeframe.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.StartMailboxSync.PathParameters> | null,
      data?: Paths.StartMailboxSync.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartMailboxSync.Responses.$202>
  }
  ['/v2/outlook/mailbox/{email}/sync/status']: {
    /**
     * getMailboxSyncStatus - Get Mailbox Sync Status
     * 
     * Returns the current or latest sync status for the specified mailbox.
     * Poll this endpoint to track sync progress.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMailboxSyncStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMailboxSyncStatus.Responses.$200>
  }
  ['/v2/outlook/mailbox/{email}/sync/retry']: {
    /**
     * retryMailboxSync - Retry Failed Messages
     * 
     * Retries failed messages from a previous sync execution.
     * Only retries messages with status FAILED (not PERMANENTLY_FAILED).
     * Messages that fail 3+ retries become PERMANENTLY_FAILED.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RetryMailboxSync.PathParameters> | null,
      data?: Paths.RetryMailboxSync.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetryMailboxSync.Responses.$202>
  }
  ['/v2/outlook/mailbox/mappings']: {
    /**
     * getConnectedOutlookEmails - getConnectedOutlookEmails
     * 
     * Returns all Outlook email addresses connected to the organization.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConnectedOutlookEmails.Responses.$200>
  }
  ['/v2/outlook/oauth/callback']: {
    /**
     * outlookOAuthCallback - outlookOAuthCallback
     * 
     * Exchanges authorization code for tokens and stores them.
     */
    'get'(
      parameters?: Parameters<Paths.OutlookOAuthCallback.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OutlookOAuthCallback.Responses.$200>
  }
  ['/v1/email-settings']: {
    /**
     * getSettings - getSettings
     * 
     * Retrieves settings of a specific type for the organization.
     * 
     * If an `id` is provided, returns only that specific setting.
     * Otherwise, returns all settings of the specified type.
     * 
     * ## Setting Types
     * 
     * | Type | Description |
     * |------|-------------|
     * | `signature` | HTML email signatures |
     * | `email_domain` | Custom email domains |
     * | `email_address` | Sender email addresses |
     * | `whitelist_email_address` | Addresses exempt from duplicate detection |
     * | `restrict_duplicates_within` | Time window for duplicate email detection |
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSettings.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSettings.Responses.$200>
    /**
     * addSetting - addSetting
     * 
     * Creates a new setting of the specified type.
     * 
     * The setting type determines which fields are applicable:
     * - **signature**: Requires `name`, `value` (plain text), and `html` (HTML content)
     * - **email_domain**: Requires `value` (domain name)
     * - **whitelist_email_address**: Requires `value` (email address)
     * - **restrict_duplicates_within**: Requires `value` (time duration like "5m", "1d")
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddSetting.Responses.$200>
    /**
     * deleteSetting - deleteSetting
     * 
     * Deletes a setting by its ID and type.
     * 
     * Both the `id` and `type` are required to uniquely identify the setting to delete.
     * 
     * **Warning**: This action cannot be undone.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSetting.Responses.$200>
  }
  ['/v1/email-settings/{id}']: {
    /**
     * updateSetting - updateSetting
     * 
     * Updates an existing setting identified by its ID.
     * 
     * Include the `type` field in the request body to specify which setting type
     * is being updated. Only the fields provided will be updated.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.UpdateSetting.PathParameters> | null,
      data?: Paths.UpdateSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSetting.Responses.$200>
  }
  ['/v1/email-settings/domain']: {
    /**
     * addDomain - addDomain
     * 
     * Adds a custom email domain to the organization.
     * 
     * After adding the domain, you must:
     * 1. Configure the required DNS records (provided in the response)
     * 2. Verify the domain using the verification endpoint
     * 
     * Until verification is complete, the domain cannot be used for sending emails.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddDomain.Responses.$200>
    /**
     * deleteDomain - deleteDomain
     * 
     * Removes a custom email domain from the organization.
     * 
     * **Warning**: Deleting a domain will prevent sending emails from any addresses
     * using this domain. Existing email addresses on this domain should be removed
     * or reassigned before deleting the domain.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDomain.Responses.$204>
  }
  ['/v1/email-settings/domain/name-servers:verify']: {
    /**
     * verifyNameServers - verifyNameServers
     * 
     * Verifies that the domain's name server (NS) records are correctly configured.
     * 
     * This check ensures that DNS resolution is properly set up for the domain
     * before proceeding with full domain verification.
     * 
     * Run this verification after configuring NS records in your DNS provider.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyNameServers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyNameServers.Responses.$200>
  }
  ['/v1/email-settings/domain:verify']: {
    /**
     * verifyDomain - verifyDomain
     * 
     * Verifies ownership and configuration of a custom email domain.
     * 
     * Domain verification checks:
     * - DNS TXT records for domain ownership
     * - MX records for email routing
     * - SPF records for sender authentication
     * - DKIM records for email signing
     * 
     * Once verified, the domain can be used to create email addresses and send emails.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyDomain.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyDomain.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ConnectedOutlookEmail = Components.Schemas.ConnectedOutlookEmail;
export type CreateEmailAddressPayload = Components.Schemas.CreateEmailAddressPayload;
export type CreateSharedInboxPayload = Components.Schemas.CreateSharedInboxPayload;
export type Domain = Components.Schemas.Domain;
export type EmailAddressResponse = Components.Schemas.EmailAddressResponse;
export type EmailAddressSetting = Components.Schemas.EmailAddressSetting;
export type EmailDomainSetting = Components.Schemas.EmailDomainSetting;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type InboxBucketResponse = Components.Schemas.InboxBucketResponse;
export type MailboxSyncFolderStatuses = Components.Schemas.MailboxSyncFolderStatuses;
export type MailboxSyncStatus = Components.Schemas.MailboxSyncStatus;
export type MailboxSyncStatuses = Components.Schemas.MailboxSyncStatuses;
export type MailboxSyncTimeframePeriods = Components.Schemas.MailboxSyncTimeframePeriods;
export type OutlookConnectionError = Components.Schemas.OutlookConnectionError;
export type OutlookConnectionStatus = Components.Schemas.OutlookConnectionStatus;
export type ProvisionEpilotEmailAddressPayload = Components.Schemas.ProvisionEpilotEmailAddressPayload;
export type RestrictDuplicatesWithinSetting = Components.Schemas.RestrictDuplicatesWithinSetting;
export type SetEmailAddressPrimaryPayload = Components.Schemas.SetEmailAddressPrimaryPayload;
export type Setting = Components.Schemas.Setting;
export type SettingMeta = Components.Schemas.SettingMeta;
export type SettingType = Components.Schemas.SettingType;
export type SettingsResponse = Components.Schemas.SettingsResponse;
export type SharedInboxResponse = Components.Schemas.SharedInboxResponse;
export type SignatureSetting = Components.Schemas.SignatureSetting;
export type UpdateEmailAddressPayload = Components.Schemas.UpdateEmailAddressPayload;
export type UpdateSharedInboxPayload = Components.Schemas.UpdateSharedInboxPayload;
export type WhitelistEmailAddressSetting = Components.Schemas.WhitelistEmailAddressSetting;
