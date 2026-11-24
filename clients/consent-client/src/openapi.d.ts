import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequest = /* Error returned by the consent definition operations */ Schemas.HttpError;
        export type Forbidden = /* Error returned by the consent definition operations */ Schemas.HttpError;
        export type NotFound = /* Error returned by the consent definition operations */ Schemas.HttpError;
        export type Unauthorized = /* Error returned by the consent definition operations */ Schemas.HttpError;
    }
    namespace Schemas {
        /**
         * The channel a consent covers. The list is fixed by epilot.
         * example:
         * email
         */
        export type ConsentChannel = "email" | "sms" | "phone" | "print";
        /**
         * A consent the organization collects, for one topic on one channel
         */
        export interface ConsentDefinition {
            /**
             * example:
             * 5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10
             */
            id: string; // uuid
            topic: /**
             * What the customer agrees to, for example "PV newsletter". Definitions of the same topic are shown
             * together. It names the contact attribute, so it cannot change after creation: lowercased, with
             * ä/ö/ü/ß written as ae/oe/ue/ss and every other run of characters outside a-z and 0-9 turned into `_`,
             * it may be at most 40 characters long and must keep at least one letter or digit.
             *
             * example:
             * PV newsletter
             */
            ConsentDefinitionTopic;
            name: /**
             * The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).
             * example:
             * PV newsletter
             */
            ConsentDefinitionName;
            channel: /**
             * The channel a consent covers. The list is fixed by epilot.
             * example:
             * email
             */
            ConsentChannel;
            legal_text?: /**
             * The consent text customers agree to, as rich text (HTML). May contain environment variables such as
             * `{{env.company_name}}`, which are filled in when the text is shown.
             *
             * example:
             * <p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>
             */
            ConsentDefinitionLegalText;
            /**
             * Whether a consent given in a journey needs to be confirmed by double opt-in
             */
            double_opt_in: boolean;
            confirmation_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
            reminder_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
            /**
             * Name of the contact attribute that holds this consent, generated as `consent_<topic>_<channel>`
             * on creation. Unique in the organization and fixed after creation.
             *
             * example:
             * consent_pv_newsletter_email
             */
            attribute: string;
            status: /**
             * - `draft`: editable and deletable, and not usable in journeys yet
             * - `published`: usable in journeys; stays editable, never goes back to `draft` and is never deleted
             * - `archived`: a published definition taken out of use, hidden from lists and pickers by default and
             *   keeps its text until it is unarchived (only its email templates can change); its attribute and
             *   stored consents stay
             *
             * example:
             * draft
             */
            ConsentDefinitionStatus;
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        /**
         * Error returned by the consent definition operations
         */
        export interface ConsentDefinitionConflictError {
            /**
             * example:
             * 400
             */
            status: number;
            /**
             * example:
             * topic cannot be changed after creation
             */
            error: string;
            /**
             * The definition that already uses the attribute
             */
            existing_definition_id?: string;
            /**
             * example:
             * consent_pv_newsletter_email
             */
            attribute?: string;
        }
        export interface ConsentDefinitionCreateRequest {
            topic: /**
             * What the customer agrees to, for example "PV newsletter". Definitions of the same topic are shown
             * together. It names the contact attribute, so it cannot change after creation: lowercased, with
             * ä/ö/ü/ß written as ae/oe/ue/ss and every other run of characters outside a-z and 0-9 turned into `_`,
             * it may be at most 40 characters long and must keep at least one letter or digit.
             *
             * example:
             * PV newsletter
             */
            ConsentDefinitionTopic;
            channel: /**
             * The channel a consent covers. The list is fixed by epilot.
             * example:
             * email
             */
            ConsentChannel;
            name?: /**
             * The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).
             * example:
             * PV newsletter
             */
            ConsentDefinitionName;
            legal_text?: /**
             * The consent text customers agree to, as rich text (HTML). May contain environment variables such as
             * `{{env.company_name}}`, which are filled in when the text is shown.
             *
             * example:
             * <p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>
             */
            ConsentDefinitionLegalText;
            double_opt_in?: boolean;
            confirmation_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
            reminder_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
        }
        /**
         * Id of an email template
         * example:
         * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
         */
        export type ConsentDefinitionEmailTemplateId = string | null;
        /**
         * The consent text customers agree to, as rich text (HTML). May contain environment variables such as
         * `{{env.company_name}}`, which are filled in when the text is shown.
         *
         * example:
         * <p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>
         */
        export type ConsentDefinitionLegalText = string;
        export interface ConsentDefinitionListResponse {
            results: /* A consent the organization collects, for one topic on one channel */ ConsentDefinition[];
            /**
             * Total number of matching definitions
             * example:
             * 2
             */
            hits: number;
        }
        /**
         * The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).
         * example:
         * PV newsletter
         */
        export type ConsentDefinitionName = string;
        /**
         * Error returned by the consent definition operations
         */
        export interface ConsentDefinitionNotPublishableError {
            /**
             * example:
             * 400
             */
            status: number;
            /**
             * example:
             * topic cannot be changed after creation
             */
            error: string;
            /**
             * The fields that keep the definition from being published, or that a published definition must keep valid. With double opt-in, `confirmation_email_template_id` is listed when the template is not set or does not exist, and `reminder_email_template_id` when it is set but does not exist.
             * example:
             * [
             *   "legal_text"
             * ]
             */
            missing_fields?: ("name" | "legal_text" | "confirmation_email_template_id" | "reminder_email_template_id")[];
        }
        /**
         * Not an HTTP request body: the payload a service sends when it invokes the consent definition resolver
         * Lambda directly. There is no token: only services allowed by IAM to invoke the function can call it, and
         * they vouch for `orgId`.
         *
         */
        export interface ConsentDefinitionResolveEvent {
            /**
             * The organization the definitions belong to, e.g. the organization of the journey being served
             * example:
             * 123
             */
            orgId: string; // ^[A-Za-z0-9_-]+$
            /**
             * Ids of consent definitions, at most 50 once duplicates are removed (more answers `400`). Duplicates are answered once.
             * example:
             * [
             *   "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10"
             * ]
             */
            ids: string[];
            /**
             * The language the texts are wanted in, e.g. `de`. Accepted and ignored for now: a definition has one text. Callers send it already so they do not change once texts per language arrive (ER-5685).
             * example:
             * de
             */
            language?: string;
        }
        /**
         * Not an HTTP response: what the consent definition resolver Lambda returns as its payload. `200` with `body`;
         * `400` when the event is invalid (no `orgId` or one that is not an org id, `ids` not a list of strings, more
         * than 50 ids); `500` when the definitions could not be read. On `400` and `500`, `error` says why; it never
         * contains a definition's content. An invoke can still fail without a payload (`FunctionError`), e.g. when
         * the function times out, and callers must handle that too.
         *
         */
        export interface ConsentDefinitionResolveResponse {
            statusCode: 200 | 400 | 500;
            body?: /* The resolved definitions and the ids that did not resolve, each id in one of the two lists */ ConsentDefinitionResolveResult;
            error?: string;
        }
        /**
         * The resolved definitions and the ids that did not resolve, each id in one of the two lists
         */
        export interface ConsentDefinitionResolveResult {
            items: /* A published definition with its current text. Holds only what a journey needs to show and store the consent, since journeys are served to anonymous visitors. */ ResolvedConsentDefinition[];
            errors: /* An id that does not resolve. Nothing else about the definition is given. */ UnresolvedConsentDefinition[];
        }
        /**
         * - `draft`: editable and deletable, and not usable in journeys yet
         * - `published`: usable in journeys; stays editable, never goes back to `draft` and is never deleted
         * - `archived`: a published definition taken out of use, hidden from lists and pickers by default and
         *   keeps its text until it is unarchived (only its email templates can change); its attribute and
         *   stored consents stay
         *
         * example:
         * draft
         */
        export type ConsentDefinitionStatus = "draft" | "published" | "archived";
        /**
         * What the customer agrees to, for example "PV newsletter". Definitions of the same topic are shown
         * together. It names the contact attribute, so it cannot change after creation: lowercased, with
         * ä/ö/ü/ß written as ae/oe/ue/ss and every other run of characters outside a-z and 0-9 turned into `_`,
         * it may be at most 40 characters long and must keep at least one letter or digit.
         *
         * example:
         * PV newsletter
         */
        export type ConsentDefinitionTopic = string;
        export interface ConsentDefinitionUpdateRequest {
            name?: /**
             * The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).
             * example:
             * PV newsletter
             */
            ConsentDefinitionName;
            legal_text?: /**
             * The consent text customers agree to, as rich text (HTML). May contain environment variables such as
             * `{{env.company_name}}`, which are filled in when the text is shown.
             *
             * example:
             * <p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>
             */
            ConsentDefinitionLegalText;
            double_opt_in?: boolean;
            confirmation_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
            reminder_email_template_id?: /**
             * Id of an email template
             * example:
             * 8d396871-95a0-4c9d-bb4d-9eda9c35776c
             */
            ConsentDefinitionEmailTemplateId;
            /**
             * Accepted only with the current value
             */
            topic?: string;
            channel?: /**
             * The channel a consent covers. The list is fixed by epilot.
             * example:
             * email
             */
            ConsentChannel;
            /**
             * Accepted only with the current value
             */
            attribute?: string;
            status?: /**
             * - `draft`: editable and deletable, and not usable in journeys yet
             * - `published`: usable in journeys; stays editable, never goes back to `draft` and is never deleted
             * - `archived`: a published definition taken out of use, hidden from lists and pickers by default and
             *   keeps its text until it is unarchived (only its email templates can change); its attribute and
             *   stored consents stay
             *
             * example:
             * draft
             */
            ConsentDefinitionStatus;
            /**
             * Accepted only with the current value
             */
            id?: string;
            /**
             * Ignored
             */
            created_at?: string;
            /**
             * Ignored
             */
            updated_at?: string;
        }
        /**
         * A recorded consent event representing a change in customer consent status.
         * Events are immutable once created and form an audit trail of all consent changes.
         *
         */
        export interface ConsentEvent {
            /**
             * The type of consent event:
             * - `OPT_IN`: Customer granted consent directly
             * - `OPT_OUT`: Customer revoked consent
             * - `DOUBLE_OPT_IN_REQUESTED`: Verification email sent, awaiting confirmation
             * - `DOUBLE_OPT_IN`: Customer confirmed consent via verification link
             *
             */
            type: "OPT_IN" | "OPT_OUT" | "DOUBLE_OPT_IN_REQUESTED" | "DOUBLE_OPT_IN";
            /**
             * ISO 8601 timestamp when the consent event was recorded
             * example:
             * 2024-01-15T10:30:00Z
             */
            created_at?: string; // date-time
            topic: /**
             * The specific type of marketing communication the customer is consenting to
             * or revoking consent for. Common topics include:
             * - `EMAIL_MARKETING` - Marketing emails and newsletters
             * - `SMS_MARKETING` - Marketing SMS/text messages
             * - `PHONE_CALL_MARKETING` - Marketing phone calls
             *
             * Custom topics can be defined based on business requirements.
             *
             * example:
             * EMAIL_MARKETING
             */
            ConsentTopic;
            source?: /**
             * Origin of the consent event, indicating where/how the consent was collected.
             * Examples include:
             * - Journey URLs (e.g., `frontend.epilot.cloud`)
             * - Portal identifiers
             * - Manual entry indicators (e.g., `customer service`)
             * - Unsubscribe sources (e.g., `unsubscribe via email`)
             *
             * example:
             * www.frontend.epilot.cloud
             */
            ConsentSource;
            organization_id?: /**
             * The epilot organization ID that owns this consent record
             * example:
             * 123
             */
            OrganizationId;
            identifier: /**
             * Unique identifier for the customer whose consent is being managed.
             * Typically an email address or phone number that matches how the customer
             * is identified in marketing communications.
             *
             * example:
             * exampleuser@epilot.cloud
             */
            ConsentIdentifier;
            meta?: /**
             * Additional metadata associated with the consent event. This flexible object
             * can store any relevant context about how and where consent was collected.
             *
             * **Common fields:**
             * - `double_opt_in` (boolean): When `true`, triggers a double opt-in email
             *   to verify the customer's consent
             * - `source_type` (string): Type of source (e.g., `journey`, `portal`, `api`)
             * - `source_id` (string): UUID of the source (e.g., journey ID)
             * - `ip_address` (string): Customer's IP address for audit purposes
             * - `user_agent` (string): Customer's browser user agent string
             *
             * example:
             * {
             *   "double_opt_in": true,
             *   "source_type": "journey",
             *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
             *   "ip_address": "1.1.1.1",
             *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
             * }
             */
            ConsentMeta;
        }
        /**
         * Paginated list of consent events for a customer
         */
        export interface ConsentEventListResponse {
            /**
             * List of consent events, ordered by creation date (newest first)
             */
            events?: /**
             * A recorded consent event representing a change in customer consent status.
             * Events are immutable once created and form an audit trail of all consent changes.
             *
             */
            ConsentEvent[];
            /**
             * Total number of consent events matching the query criteria
             * example:
             * 1
             */
            total?: number;
        }
        /**
         * Request body for publishing a new consent event
         */
        export interface ConsentEventRequestBody {
            /**
             * The type of consent event:
             * - `OPT_IN`: Customer grants consent
             * - `OPT_OUT`: Customer revokes consent
             *
             */
            type: "OPT_IN" | "OPT_OUT";
            topic: /**
             * The specific type of marketing communication the customer is consenting to
             * or revoking consent for. Common topics include:
             * - `EMAIL_MARKETING` - Marketing emails and newsletters
             * - `SMS_MARKETING` - Marketing SMS/text messages
             * - `PHONE_CALL_MARKETING` - Marketing phone calls
             *
             * Custom topics can be defined based on business requirements.
             *
             * example:
             * EMAIL_MARKETING
             */
            ConsentTopic;
            source?: /**
             * Origin of the consent event, indicating where/how the consent was collected.
             * Examples include:
             * - Journey URLs (e.g., `frontend.epilot.cloud`)
             * - Portal identifiers
             * - Manual entry indicators (e.g., `customer service`)
             * - Unsubscribe sources (e.g., `unsubscribe via email`)
             *
             * example:
             * www.frontend.epilot.cloud
             */
            ConsentSource;
            identifier: /**
             * Unique identifier for the customer whose consent is being managed.
             * Typically an email address or phone number that matches how the customer
             * is identified in marketing communications.
             *
             * example:
             * exampleuser@epilot.cloud
             */
            ConsentIdentifier;
            meta?: /**
             * Additional metadata associated with the consent event. This flexible object
             * can store any relevant context about how and where consent was collected.
             *
             * **Common fields:**
             * - `double_opt_in` (boolean): When `true`, triggers a double opt-in email
             *   to verify the customer's consent
             * - `source_type` (string): Type of source (e.g., `journey`, `portal`, `api`)
             * - `source_id` (string): UUID of the source (e.g., journey ID)
             * - `ip_address` (string): Customer's IP address for audit purposes
             * - `user_agent` (string): Customer's browser user agent string
             *
             * example:
             * {
             *   "double_opt_in": true,
             *   "source_type": "journey",
             *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
             *   "ip_address": "1.1.1.1",
             *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
             * }
             */
            ConsentMeta;
            /**
             * Timestamp of when the consent was given or revoked. Useful for
             * importing historical consent data. If not provided, the current
             * timestamp is used.
             *
             * example:
             * 2022-01-01T00:00:00Z
             */
            created_at?: string; // date-time
        }
        /**
         * Unique identifier for the customer whose consent is being managed.
         * Typically an email address or phone number that matches how the customer
         * is identified in marketing communications.
         *
         * example:
         * exampleuser@epilot.cloud
         */
        export type ConsentIdentifier = string;
        /**
         * Additional metadata associated with the consent event. This flexible object
         * can store any relevant context about how and where consent was collected.
         *
         * **Common fields:**
         * - `double_opt_in` (boolean): When `true`, triggers a double opt-in email
         *   to verify the customer's consent
         * - `source_type` (string): Type of source (e.g., `journey`, `portal`, `api`)
         * - `source_id` (string): UUID of the source (e.g., journey ID)
         * - `ip_address` (string): Customer's IP address for audit purposes
         * - `user_agent` (string): Customer's browser user agent string
         *
         * example:
         * {
         *   "double_opt_in": true,
         *   "source_type": "journey",
         *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
         *   "ip_address": "1.1.1.1",
         *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
         * }
         */
        export interface ConsentMeta {
            [name: string]: any;
        }
        /**
         * Origin of the consent event, indicating where/how the consent was collected.
         * Examples include:
         * - Journey URLs (e.g., `frontend.epilot.cloud`)
         * - Portal identifiers
         * - Manual entry indicators (e.g., `customer service`)
         * - Unsubscribe sources (e.g., `unsubscribe via email`)
         *
         * example:
         * www.frontend.epilot.cloud
         */
        export type ConsentSource = string;
        /**
         * The specific type of marketing communication the customer is consenting to
         * or revoking consent for. Common topics include:
         * - `EMAIL_MARKETING` - Marketing emails and newsletters
         * - `SMS_MARKETING` - Marketing SMS/text messages
         * - `PHONE_CALL_MARKETING` - Marketing phone calls
         *
         * Custom topics can be defined based on business requirements.
         *
         * example:
         * EMAIL_MARKETING
         */
        export type ConsentTopic = string;
        /**
         * Standard error response returned when a request fails
         */
        export interface ErrorResponse {
            /**
             * Human-readable error message describing what went wrong
             * example:
             * Validation error: 'identifier' is required
             */
            message: string;
        }
        /**
         * Error returned by the consent definition operations
         */
        export interface HttpError {
            /**
             * example:
             * 400
             */
            status: number;
            /**
             * example:
             * topic cannot be changed after creation
             */
            error: string;
        }
        /**
         * The epilot organization ID that owns this consent record
         * example:
         * 123
         */
        export type OrganizationId = string;
        /**
         * A published definition with its current text. Holds only what a journey needs to show and store the consent, since journeys are served to anonymous visitors.
         */
        export interface ResolvedConsentDefinition {
            /**
             * example:
             * 5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10
             */
            id: string;
            name: /**
             * The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).
             * example:
             * PV newsletter
             */
            ConsentDefinitionName;
            topic: /**
             * What the customer agrees to, for example "PV newsletter". Definitions of the same topic are shown
             * together. It names the contact attribute, so it cannot change after creation: lowercased, with
             * ä/ö/ü/ß written as ae/oe/ue/ss and every other run of characters outside a-z and 0-9 turned into `_`,
             * it may be at most 40 characters long and must keep at least one letter or digit.
             *
             * example:
             * PV newsletter
             */
            ConsentDefinitionTopic;
            channel: /**
             * The channel a consent covers. The list is fixed by epilot.
             * example:
             * email
             */
            ConsentChannel;
            /**
             * The current consent text as rich text (HTML), as stored. Environment variables such as `{{env.company_name}}` are left in place for the caller's templating to fill in.
             * example:
             * <p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>
             */
            legal_text: string;
            /**
             * Whether a consent given in a journey needs to be confirmed by double opt-in
             */
            double_opt_in: boolean;
            /**
             * The contact attribute that holds this consent
             * example:
             * consent_pv_newsletter_email
             */
            attribute: string;
            /**
             * Always `published`, since only published definitions resolve
             */
            status: "published";
        }
        /**
         * An id that does not resolve. Nothing else about the definition is given.
         */
        export interface UnresolvedConsentDefinition {
            /**
             * example:
             * 5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10
             */
            id: string;
            /**
             * - `not_found`: no definition with this id in the organization, also when it is in entity-api's trash
             * - `draft`: not published yet
             * - `archived`: taken out of use
             *
             */
            reason: "not_found" | "draft" | "archived";
        }
    }
}
declare namespace Paths {
    namespace ArchiveConsentDefinition {
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.HttpError;
        }
    }
    namespace CreateConsentDefinition {
        export type RequestBody = Components.Schemas.ConsentDefinitionCreateRequest;
        namespace Responses {
            export type $201 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.ConsentDefinitionConflictError;
        }
    }
    namespace DeleteConsentDefinition {
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.HttpError;
        }
    }
    namespace GetConsentDefinition {
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace HandleOptInWithToken {
        namespace Parameters {
            export type Lang = string;
            export type Token = string;
        }
        export interface PathParameters {
            token: Parameters.Token;
        }
        export interface QueryParameters {
            lang?: Parameters.Lang;
        }
    }
    namespace HandleOptOutWithToken {
        namespace Parameters {
            export type Lang = string;
            export type Token = string;
        }
        export interface PathParameters {
            token: Parameters.Token;
        }
        export interface QueryParameters {
            lang?: Parameters.Lang;
        }
    }
    namespace HandleOptOutWithTokenConfirmation {
        namespace Parameters {
            export type Lang = string;
            export type Token = string;
        }
        export interface PathParameters {
            token: Parameters.Token;
        }
        export interface QueryParameters {
            lang?: Parameters.Lang;
        }
    }
    namespace ListConsentDefinitions {
        namespace Parameters {
            export type From = number;
            export type IncludeArchived = boolean;
            export type Size = number;
            export type Status = /**
             * - `draft`: editable and deletable, and not usable in journeys yet
             * - `published`: usable in journeys; stays editable, never goes back to `draft` and is never deleted
             * - `archived`: a published definition taken out of use, hidden from lists and pickers by default and
             *   keeps its text until it is unarchived (only its email templates can change); its attribute and
             *   stored consents stay
             *
             * example:
             * draft
             */
            Components.Schemas.ConsentDefinitionStatus;
            export type Topic = string;
        }
        export interface QueryParameters {
            topic?: Parameters.Topic;
            status?: Parameters.Status;
            include_archived?: Parameters.IncludeArchived;
            from?: Parameters.From;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConsentDefinitionListResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListConsentEvents {
        namespace Parameters {
            export type From = number;
            export type Identifier = /**
             * Unique identifier for the customer whose consent is being managed.
             * Typically an email address or phone number that matches how the customer
             * is identified in marketing communications.
             *
             * example:
             * exampleuser@epilot.cloud
             */
            Components.Schemas.ConsentIdentifier;
            export type Limit = number;
            export type Topic = /**
             * The specific type of marketing communication the customer is consenting to
             * or revoking consent for. Common topics include:
             * - `EMAIL_MARKETING` - Marketing emails and newsletters
             * - `SMS_MARKETING` - Marketing SMS/text messages
             * - `PHONE_CALL_MARKETING` - Marketing phone calls
             *
             * Custom topics can be defined based on business requirements.
             *
             * example:
             * EMAIL_MARKETING
             */
            Components.Schemas.ConsentTopic;
        }
        export interface PathParameters {
            identifier: Parameters.Identifier;
        }
        export interface QueryParameters {
            topic?: Parameters.Topic;
            limit?: Parameters.Limit;
            from?: Parameters.From;
        }
        namespace Responses {
            export type $200 = /* Paginated list of consent events for a customer */ Components.Schemas.ConsentEventListResponse;
            export type $400 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
            export type $401 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
            export type $500 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
        }
    }
    namespace PublishConsentDefinition {
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $400 = /* Error returned by the consent definition operations */ Components.Schemas.ConsentDefinitionNotPublishableError;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.HttpError;
        }
    }
    namespace PublishConsentEvent {
        export type RequestBody = /* Request body for publishing a new consent event */ Components.Schemas.ConsentEventRequestBody;
        namespace Responses {
            export type $201 = /**
             * A recorded consent event representing a change in customer consent status.
             * Events are immutable once created and form an audit trail of all consent changes.
             *
             */
            Components.Schemas.ConsentEvent;
            export type $400 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
            export type $401 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
            export type $500 = /* Standard error response returned when a request fails */ Components.Schemas.ErrorResponse;
        }
    }
    namespace UnarchiveConsentDefinition {
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $400 = /* Error returned by the consent definition operations */ Components.Schemas.ConsentDefinitionNotPublishableError;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.HttpError;
        }
    }
    namespace UpdateConsentDefinition {
        export type RequestBody = Components.Schemas.ConsentDefinitionUpdateRequest;
        namespace Responses {
            export type $200 = /* A consent the organization collects, for one topic on one channel */ Components.Schemas.ConsentDefinition;
            export type $400 = /* Error returned by the consent definition operations */ Components.Schemas.ConsentDefinitionNotPublishableError;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = /* Error returned by the consent definition operations */ Components.Schemas.HttpError;
        }
    }
    namespace V1ConsentDefinitions$DefinitionId {
        namespace Parameters {
            export type DefinitionId = string; // uuid
        }
        export interface PathParameters {
            definition_id: Parameters.DefinitionId /* uuid */;
        }
    }
    namespace V1ConsentDefinitions$DefinitionIdArchive {
        namespace Parameters {
            export type DefinitionId = string; // uuid
        }
        export interface PathParameters {
            definition_id: Parameters.DefinitionId /* uuid */;
        }
    }
    namespace V1ConsentDefinitions$DefinitionIdPublish {
        namespace Parameters {
            export type DefinitionId = string; // uuid
        }
        export interface PathParameters {
            definition_id: Parameters.DefinitionId /* uuid */;
        }
    }
    namespace V1ConsentDefinitions$DefinitionIdUnarchive {
        namespace Parameters {
            export type DefinitionId = string; // uuid
        }
        export interface PathParameters {
            definition_id: Parameters.DefinitionId /* uuid */;
        }
    }
}


export interface OperationMethods {
  /**
   * publishConsentEvent - publishConsentEvent
   * 
   * Publishes a consent event (opt-in or opt-out) to the event bus, which appends
   * the event to the immutable consent store. This endpoint is used to record
   * customer consent decisions from various sources such as journeys, portals,
   * or manual entry.
   * 
   * When `meta.double_opt_in: true` is set, a double opt-in email will be sent
   * to the customer to verify their consent. The consent will only be fully
   * activated after the customer clicks the verification link.
   * 
   * **Use Cases:**
   * - Recording consent from journey submissions
   * - Processing opt-out requests from customer service
   * - Syncing consent from external systems
   * 
   */
  'publishConsentEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PublishConsentEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishConsentEvent.Responses.$201>
  /**
   * listConsentEvents - listConsentEvents
   * 
   * Retrieves the complete consent history for a customer identified by their
   * email address or phone number. Returns all opt-in and opt-out events in
   * chronological order, providing a full audit trail for compliance purposes.
   * 
   * **Use Cases:**
   * - Displaying consent history on contact entity detail pages
   * - Verifying current consent status before sending marketing communications
   * - Generating compliance reports for GDPR audits
   * 
   */
  'listConsentEvents'(
    parameters?: Parameters<Paths.ListConsentEvents.QueryParameters & Paths.ListConsentEvents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConsentEvents.Responses.$200>
  /**
   * listConsentDefinitions - listConsentDefinitions
   * 
   * Lists the organization's consent definitions, sorted by topic.
   * 
   * Archived definitions are left out unless `status=archived` or `include_archived=true` asks for them,
   * so pickers only offer definitions that are still in use. An archived definition can still be read by id.
   * 
   * Requires the `consent:definition:view` grant. Not available until the consent definitions release.
   * 
   */
  'listConsentDefinitions'(
    parameters?: Parameters<Paths.ListConsentDefinitions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConsentDefinitions.Responses.$200>
  /**
   * createConsentDefinition - createConsentDefinition
   * 
   * Creates a consent definition: one topic on one channel, for example "PV newsletter" by email.
   * 
   * A new definition starts as `draft`. Its contact attribute name is generated from the topic and
   * channel as `consent_<topic>_<channel>` and is unique in the organization: a second definition for
   * the same topic and channel is rejected with `409`. `topic`, `channel` and `attribute` cannot change
   * after creation.
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'createConsentDefinition'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateConsentDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateConsentDefinition.Responses.$201>
  /**
   * getConsentDefinition - getConsentDefinition
   * 
   * Reads one consent definition by id.
   * 
   * Requires the `consent:definition:view` grant. Not available until the consent definitions release.
   * 
   */
  'getConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConsentDefinition.Responses.$200>
  /**
   * updateConsentDefinition - updateConsentDefinition
   * 
   * Updates a consent definition's name, legal text and double opt-in settings. Only the fields sent
   * are changed; send `null` to clear an email template.
   * 
   * `topic`, `channel`, `attribute` and `status` may be sent with their current value, for clients that
   * send the whole definition back, but changing them is rejected with `400`. The status changes through
   * its own operations (publish, archive, unarchive).
   * 
   * A blank `name` is rejected with `400` and `missing_fields`, for drafts and published definitions alike.
   * 
   * A published definition's changes take effect at once: the next journey that loads shows the new text.
   * It must stay publishable, with the same checks as publishing: a change that leaves it without a legal
   * text, or with double opt-in and a confirmation or reminder email template that does not exist, is
   * rejected with `400` and `missing_fields`. The templates are looked up on every change, since they can
   * be deleted after publishing. A draft may be saved incomplete.
   * 
   * An archived definition keeps its name, legal text and double opt-in setting until it is unarchived:
   * changing them answers `409`. Only its email templates can be changed, without the publish checks, so a
   * template deleted while it was archived can be replaced before unarchiving. A definition in the trash
   * cannot be changed (`409`).
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'updateConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
    data?: Paths.UpdateConsentDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateConsentDefinition.Responses.$200>
  /**
   * deleteConsentDefinition - deleteConsentDefinition
   * 
   * Deletes a draft consent definition for good. A draft has collected no consents, so nothing is kept:
   * the entity is purged (it does not go to the trash) and its topic and channel can be used again by a new
   * definition. A draft that is already in the trash is purged too.
   * 
   * A definition that has been published is never deleted, since its consents are proof and its contact
   * attribute is referenced elsewhere: deleting a published or archived definition is rejected with `409`.
   * Archive it instead.
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'deleteConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConsentDefinition.Responses.$200>
  /**
   * publishConsentDefinition - publishConsentDefinition
   * 
   * Publishes a draft consent definition, so journeys can use it. Its current name, legal text and
   * double opt-in settings are what customers see from then on.
   * 
   * A definition is published only when it has a name and a legal text, and, with double opt-in, a
   * confirmation email template that exists and, when one is set, a reminder email template that exists.
   * Otherwise the request is rejected with `400` and `missing_fields`.
   * 
   * Publishing is one-way: a published definition never goes back to `draft`. Its name, text and
   * double opt-in settings stay editable through `updateConsentDefinition`, and each change takes effect
   * at once. Publishing a definition that is already published changes nothing and answers `200`.
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'publishConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdPublish.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishConsentDefinition.Responses.$200>
  /**
   * archiveConsentDefinition - archiveConsentDefinition
   * 
   * Archives a published consent definition that is no longer in use. It is left out of lists and pickers
   * by default but can still be read by id. Its contact attribute, the consents stored on contacts and the
   * ledger stay as they are. An archived definition keeps its text until it is unarchived; only its email
   * templates can be changed.
   * 
   * Archiving a definition that is already archived changes nothing and answers `200`. A draft cannot be
   * archived (`409`); delete it instead.
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'archiveConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdArchive.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ArchiveConsentDefinition.Responses.$200>
  /**
   * unarchiveConsentDefinition - unarchiveConsentDefinition
   * 
   * Brings an archived consent definition back into use: its status becomes `published` again.
   * 
   * It must still be publishable, with the same checks as publishing, since its email templates may have
   * been deleted while it was archived; otherwise the request is rejected with `400` and `missing_fields`.
   * Unarchiving a published definition changes nothing and answers `200`. A draft cannot be unarchived
   * (`409`).
   * 
   * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
   * 
   */
  'unarchiveConsentDefinition'(
    parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdUnarchive.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnarchiveConsentDefinition.Responses.$200>
  /**
   * handleOptInWithToken - handleOptInWithToken
   * 
   * Public endpoint for customers to confirm their opt-in by clicking a
   * verification link sent via email (double opt-in flow). This endpoint
   * validates the token and records a `DOUBLE_OPT_IN` event if valid.
   * 
   * **Flow:**
   * 1. Customer submits a journey/form with marketing consent
   * 2. System sends verification email with opt-in link containing a secure token
   * 3. Customer clicks the link, which calls this endpoint
   * 4. System validates token and records confirmed consent
   * 
   * This endpoint returns an HTML page to provide visual feedback to the customer.
   * 
   */
  'handleOptInWithToken'(
    parameters?: Parameters<Paths.HandleOptInWithToken.QueryParameters & Paths.HandleOptInWithToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * handleOptOutWithToken - handleOptOutWithToken
   * 
   * Public endpoint that displays the opt-out confirmation page when a customer
   * clicks an unsubscribe link in an email. The page allows the customer to
   * confirm their decision to opt-out.
   * 
   * The GET method displays the confirmation page without processing the opt-out.
   * The actual opt-out is processed when the customer submits the form (POST).
   * 
   * **Flow:**
   * 1. Customer clicks unsubscribe link in marketing email
   * 2. GET request displays confirmation page asking "Are you sure?"
   * 3. Customer clicks "Unsubscribe" button
   * 4. POST request processes the opt-out and shows success message
   * 
   */
  'handleOptOutWithToken'(
    parameters?: Parameters<Paths.HandleOptOutWithToken.QueryParameters & Paths.HandleOptOutWithToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * handleOptOutWithTokenConfirmation - handleOptOutWithTokenConfirmation
   * 
   * Public endpoint for customers to confirm their opt-out request. This is
   * typically called when a customer submits an unsubscribe confirmation form.
   * 
   * The POST method is used when the opt-out requires explicit confirmation
   * (e.g., clicking an "Unsubscribe" button on a confirmation page) to prevent
   * accidental unsubscribes from email preview features.
   * 
   * Records an `OPT_OUT` event for the customer and topic specified in the token.
   * 
   */
  'handleOptOutWithTokenConfirmation'(
    parameters?: Parameters<Paths.HandleOptOutWithTokenConfirmation.QueryParameters & Paths.HandleOptOutWithTokenConfirmation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
}

export interface PathsDictionary {
  ['/v1/consent/publish']: {
    /**
     * publishConsentEvent - publishConsentEvent
     * 
     * Publishes a consent event (opt-in or opt-out) to the event bus, which appends
     * the event to the immutable consent store. This endpoint is used to record
     * customer consent decisions from various sources such as journeys, portals,
     * or manual entry.
     * 
     * When `meta.double_opt_in: true` is set, a double opt-in email will be sent
     * to the customer to verify their consent. The consent will only be fully
     * activated after the customer clicks the verification link.
     * 
     * **Use Cases:**
     * - Recording consent from journey submissions
     * - Processing opt-out requests from customer service
     * - Syncing consent from external systems
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PublishConsentEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishConsentEvent.Responses.$201>
  }
  ['/v1/consent/{identifier}']: {
    /**
     * listConsentEvents - listConsentEvents
     * 
     * Retrieves the complete consent history for a customer identified by their
     * email address or phone number. Returns all opt-in and opt-out events in
     * chronological order, providing a full audit trail for compliance purposes.
     * 
     * **Use Cases:**
     * - Displaying consent history on contact entity detail pages
     * - Verifying current consent status before sending marketing communications
     * - Generating compliance reports for GDPR audits
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConsentEvents.QueryParameters & Paths.ListConsentEvents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConsentEvents.Responses.$200>
  }
  ['/v1/consent/definitions']: {
    /**
     * createConsentDefinition - createConsentDefinition
     * 
     * Creates a consent definition: one topic on one channel, for example "PV newsletter" by email.
     * 
     * A new definition starts as `draft`. Its contact attribute name is generated from the topic and
     * channel as `consent_<topic>_<channel>` and is unique in the organization: a second definition for
     * the same topic and channel is rejected with `409`. `topic`, `channel` and `attribute` cannot change
     * after creation.
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateConsentDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateConsentDefinition.Responses.$201>
    /**
     * listConsentDefinitions - listConsentDefinitions
     * 
     * Lists the organization's consent definitions, sorted by topic.
     * 
     * Archived definitions are left out unless `status=archived` or `include_archived=true` asks for them,
     * so pickers only offer definitions that are still in use. An archived definition can still be read by id.
     * 
     * Requires the `consent:definition:view` grant. Not available until the consent definitions release.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConsentDefinitions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConsentDefinitions.Responses.$200>
  }
  ['/v1/consent/definitions/{definition_id}']: {
    /**
     * getConsentDefinition - getConsentDefinition
     * 
     * Reads one consent definition by id.
     * 
     * Requires the `consent:definition:view` grant. Not available until the consent definitions release.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConsentDefinition.Responses.$200>
    /**
     * updateConsentDefinition - updateConsentDefinition
     * 
     * Updates a consent definition's name, legal text and double opt-in settings. Only the fields sent
     * are changed; send `null` to clear an email template.
     * 
     * `topic`, `channel`, `attribute` and `status` may be sent with their current value, for clients that
     * send the whole definition back, but changing them is rejected with `400`. The status changes through
     * its own operations (publish, archive, unarchive).
     * 
     * A blank `name` is rejected with `400` and `missing_fields`, for drafts and published definitions alike.
     * 
     * A published definition's changes take effect at once: the next journey that loads shows the new text.
     * It must stay publishable, with the same checks as publishing: a change that leaves it without a legal
     * text, or with double opt-in and a confirmation or reminder email template that does not exist, is
     * rejected with `400` and `missing_fields`. The templates are looked up on every change, since they can
     * be deleted after publishing. A draft may be saved incomplete.
     * 
     * An archived definition keeps its name, legal text and double opt-in setting until it is unarchived:
     * changing them answers `409`. Only its email templates can be changed, without the publish checks, so a
     * template deleted while it was archived can be replaced before unarchiving. A definition in the trash
     * cannot be changed (`409`).
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
      data?: Paths.UpdateConsentDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateConsentDefinition.Responses.$200>
    /**
     * deleteConsentDefinition - deleteConsentDefinition
     * 
     * Deletes a draft consent definition for good. A draft has collected no consents, so nothing is kept:
     * the entity is purged (it does not go to the trash) and its topic and channel can be used again by a new
     * definition. A draft that is already in the trash is purged too.
     * 
     * A definition that has been published is never deleted, since its consents are proof and its contact
     * attribute is referenced elsewhere: deleting a published or archived definition is rejected with `409`.
     * Archive it instead.
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConsentDefinition.Responses.$200>
  }
  ['/v1/consent/definitions/{definition_id}/publish']: {
    /**
     * publishConsentDefinition - publishConsentDefinition
     * 
     * Publishes a draft consent definition, so journeys can use it. Its current name, legal text and
     * double opt-in settings are what customers see from then on.
     * 
     * A definition is published only when it has a name and a legal text, and, with double opt-in, a
     * confirmation email template that exists and, when one is set, a reminder email template that exists.
     * Otherwise the request is rejected with `400` and `missing_fields`.
     * 
     * Publishing is one-way: a published definition never goes back to `draft`. Its name, text and
     * double opt-in settings stay editable through `updateConsentDefinition`, and each change takes effect
     * at once. Publishing a definition that is already published changes nothing and answers `200`.
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdPublish.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishConsentDefinition.Responses.$200>
  }
  ['/v1/consent/definitions/{definition_id}/archive']: {
    /**
     * archiveConsentDefinition - archiveConsentDefinition
     * 
     * Archives a published consent definition that is no longer in use. It is left out of lists and pickers
     * by default but can still be read by id. Its contact attribute, the consents stored on contacts and the
     * ledger stay as they are. An archived definition keeps its text until it is unarchived; only its email
     * templates can be changed.
     * 
     * Archiving a definition that is already archived changes nothing and answers `200`. A draft cannot be
     * archived (`409`); delete it instead.
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdArchive.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ArchiveConsentDefinition.Responses.$200>
  }
  ['/v1/consent/definitions/{definition_id}/unarchive']: {
    /**
     * unarchiveConsentDefinition - unarchiveConsentDefinition
     * 
     * Brings an archived consent definition back into use: its status becomes `published` again.
     * 
     * It must still be publishable, with the same checks as publishing, since its email templates may have
     * been deleted while it was archived; otherwise the request is rejected with `400` and `missing_fields`.
     * Unarchiving a published definition changes nothing and answers `200`. A draft cannot be unarchived
     * (`409`).
     * 
     * Requires the `consent:definition:edit` grant. Not available until the consent definitions release.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1ConsentDefinitions$DefinitionIdUnarchive.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnarchiveConsentDefinition.Responses.$200>
  }
  ['/v1/opt-in/{token}']: {
    /**
     * handleOptInWithToken - handleOptInWithToken
     * 
     * Public endpoint for customers to confirm their opt-in by clicking a
     * verification link sent via email (double opt-in flow). This endpoint
     * validates the token and records a `DOUBLE_OPT_IN` event if valid.
     * 
     * **Flow:**
     * 1. Customer submits a journey/form with marketing consent
     * 2. System sends verification email with opt-in link containing a secure token
     * 3. Customer clicks the link, which calls this endpoint
     * 4. System validates token and records confirmed consent
     * 
     * This endpoint returns an HTML page to provide visual feedback to the customer.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.HandleOptInWithToken.QueryParameters & Paths.HandleOptInWithToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/opt-out/{token}']: {
    /**
     * handleOptOutWithTokenConfirmation - handleOptOutWithTokenConfirmation
     * 
     * Public endpoint for customers to confirm their opt-out request. This is
     * typically called when a customer submits an unsubscribe confirmation form.
     * 
     * The POST method is used when the opt-out requires explicit confirmation
     * (e.g., clicking an "Unsubscribe" button on a confirmation page) to prevent
     * accidental unsubscribes from email preview features.
     * 
     * Records an `OPT_OUT` event for the customer and topic specified in the token.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.HandleOptOutWithTokenConfirmation.QueryParameters & Paths.HandleOptOutWithTokenConfirmation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * handleOptOutWithToken - handleOptOutWithToken
     * 
     * Public endpoint that displays the opt-out confirmation page when a customer
     * clicks an unsubscribe link in an email. The page allows the customer to
     * confirm their decision to opt-out.
     * 
     * The GET method displays the confirmation page without processing the opt-out.
     * The actual opt-out is processed when the customer submits the form (POST).
     * 
     * **Flow:**
     * 1. Customer clicks unsubscribe link in marketing email
     * 2. GET request displays confirmation page asking "Are you sure?"
     * 3. Customer clicks "Unsubscribe" button
     * 4. POST request processes the opt-out and shows success message
     * 
     */
    'get'(
      parameters?: Parameters<Paths.HandleOptOutWithToken.QueryParameters & Paths.HandleOptOutWithToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ConsentChannel = Components.Schemas.ConsentChannel;
export type ConsentDefinition = Components.Schemas.ConsentDefinition;
export type ConsentDefinitionConflictError = Components.Schemas.ConsentDefinitionConflictError;
export type ConsentDefinitionCreateRequest = Components.Schemas.ConsentDefinitionCreateRequest;
export type ConsentDefinitionEmailTemplateId = Components.Schemas.ConsentDefinitionEmailTemplateId;
export type ConsentDefinitionLegalText = Components.Schemas.ConsentDefinitionLegalText;
export type ConsentDefinitionListResponse = Components.Schemas.ConsentDefinitionListResponse;
export type ConsentDefinitionName = Components.Schemas.ConsentDefinitionName;
export type ConsentDefinitionNotPublishableError = Components.Schemas.ConsentDefinitionNotPublishableError;
export type ConsentDefinitionResolveEvent = Components.Schemas.ConsentDefinitionResolveEvent;
export type ConsentDefinitionResolveResponse = Components.Schemas.ConsentDefinitionResolveResponse;
export type ConsentDefinitionResolveResult = Components.Schemas.ConsentDefinitionResolveResult;
export type ConsentDefinitionStatus = Components.Schemas.ConsentDefinitionStatus;
export type ConsentDefinitionTopic = Components.Schemas.ConsentDefinitionTopic;
export type ConsentDefinitionUpdateRequest = Components.Schemas.ConsentDefinitionUpdateRequest;
export type ConsentEvent = Components.Schemas.ConsentEvent;
export type ConsentEventListResponse = Components.Schemas.ConsentEventListResponse;
export type ConsentEventRequestBody = Components.Schemas.ConsentEventRequestBody;
export type ConsentIdentifier = Components.Schemas.ConsentIdentifier;
export type ConsentMeta = Components.Schemas.ConsentMeta;
export type ConsentSource = Components.Schemas.ConsentSource;
export type ConsentTopic = Components.Schemas.ConsentTopic;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type HttpError = Components.Schemas.HttpError;
export type OrganizationId = Components.Schemas.OrganizationId;
export type ResolvedConsentDefinition = Components.Schemas.ResolvedConsentDefinition;
export type UnresolvedConsentDefinition = Components.Schemas.UnresolvedConsentDefinition;
