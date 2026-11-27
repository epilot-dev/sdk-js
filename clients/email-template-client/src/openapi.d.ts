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
         * Type of approval action for the bulk message request.
         * * APPROVE_WITH_CONSENT: Approve the bulk message request and send emails to queued recipients with consent
         * * APPROVE_ALL: Approve the bulk message request and send emails to all queued recipients, including those without consent
         *
         */
        export type ApproveAction = "APPROVE_WITH_CONSENT" | "APPROVE_ALL";
        /**
         * Time when the bulk message action was last approved
         */
        export type ApprovedAt = string; // date-time
        export interface AsyncEmailTemplateResponse {
            /**
             * Job ID of the email template that is requested to replace and generate docs
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            job_id: string;
            status: "STARTED" | "PROCESSING" | "SUCCESS" | "FAILED";
            /**
             * Error message
             */
            message?: string;
            /**
             * Progress count of the documents that are needed to generate
             */
            doc_progress_count?: {
                /**
                 * Total count
                 * example:
                 * 10
                 */
                total: number;
                /**
                 * Completed count
                 * example:
                 * 5
                 */
                completed: number;
            };
            /**
             * Result of the email template that is replaced along with generated docs
             */
            result?: {
                entity?: EmailTemplateEntity;
                relations?: {
                    [key: string]: any;
                }[];
            };
        }
        export type Attachment = {
            /**
             * Attachment ID
             * example:
             * f820ce3b-07b0-45ae-bcc6-babb2f53f79f
             */
            cid?: string;
            /**
             * File name
             * example:
             * Produktinformationen_epilot360_Double_Opt_in.pdf
             */
            filename: string;
            /**
             * File size in bytes
             * example:
             * 451349
             */
            size: number;
            /**
             * Content type
             * example:
             * application/pdf
             */
            content_type: string;
            /**
             * URL to download the attachment.
             * example:
             * https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf
             */
            url?: string;
            /**
             * S3 bucket where file is stored
             * example:
             * 893487340562-message-attachment
             */
            bucket: string;
            /**
             * S3 object apiKey
             * example:
             * attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf
             */
            object_key: string;
            /**
             * If true then this attachment should not be offered for download (at least not in the main attachments list).\
             * The usecase is CID embedded image (aka inline image).
             *
             */
            inline?: boolean;
            /**
             * If true then this attachment is sent via link. The link is already inserted to email body by API caller. In this case, service doesn't process this attachment.
             */
            send_as_link?: boolean;
            /**
             * File type such as Document template, Document,... Use for replace variables on document template
             * example:
             * Document template
             */
            type?: string;
            /**
             * If true then this attachment is copied to the message and replaces corresponding one
             */
            copy_to_message?: boolean;
        } | null;
        export interface AttachmentResponse {
            /**
             * Total attachments
             * example:
             * 10
             */
            total?: number;
            /**
             * List attachments
             */
            attachments?: {
                /**
                 * File name
                 * example:
                 * order.docx
                 */
                filename?: string;
                /**
                 * Bucket name
                 * example:
                 * epilot-playground-upload-document
                 */
                bucket?: string;
                /**
                 * Object key
                 * example:
                 * 9f561bea-f0d9-4e96-b7a9-879fc1643ac0.docx
                 */
                object_key?: string;
                /**
                 * URL
                 * example:
                 * https://epilot-playground-upload-document.s3.eu-central-1.amazonaws.com/9f561bea-f0d9-4e96-b7a9-879fc1643ac0.docx
                 */
                url?: string;
                /**
                 * Document type:
                 * * 0: Static docs
                 * * 1: Templates
                 *
                 * example:
                 * 0
                 */
                document_type?: number;
            }[];
        }
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: string;
            /**
             * Entity title
             */
            _title: string;
            /**
             * Ivy Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema: string;
            /**
             * Entity tags
             * example:
             * [
             *   "automatic email template"
             * ]
             */
            _tags?: string[];
            /**
             * Created date
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Updated date
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at: string; // date-time
            /**
             * Entity Purposes
             * example:
             * [
             *   "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
             *   "310cd388-2f15-4b5b-8f98-ca14c1e03304"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
        }
        export interface BulkSendMessageJob {
            org_id?: /**
             * Organization ID
             * example:
             * 206801
             */
            OrgId;
            /**
             * Job ID for tracking the status of bulk message action
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            job_id: string;
            skip_creating_entities?: /* When true, it lets to send only the email by skip creating the thread & message entities. */ SkipCreatingEntities;
            complete_thread?: /* Whether the thread is marked as Done immediately after sending the message */ CompleteThread;
            /**
             * Status of the bulk message action
             * * PROCESSING: Bulk message action is processing the request
             * * QUEUEING: Bulk message action is generating emails to send in a queue
             * * SENDING: Bulk message action is sending emails from the queue
             * * SUCCESS: Bulk message action is completed successfully
             * * FAILED: Bulk message action is failed
             * * CANCELLED: Bulk message action was cancelled
             *
             */
            status: "PROCESSING" | "QUEUEING" | "APPROVAL" | "SENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
            request: /**
             * It takes a list of entity ids, treating each as a separate mainEntity to construct individual messages.
             * For e.g; if there some opportunityIds are provided, then each opportunityId is treated as a separate mainEntity to construct individual messages.
             *
             */
            BulkSendMessageRequest | /**
             * It takes an entity query to derive recipient_ids, treating each as a separate mainEntity to construct individual messages.
             * For e.g; if the query is provided as `_schema:opportunity AND status:PENDING`,
             *   then all the opportunity Ids with status PENDING are treated as separate mainEntity to construct individual messages.
             *
             */
            BulkSendMessageRequestWithQuery;
            created_by?: /**
             * User ID who created the bulk message action
             * example:
             * 1234
             */
            CreatedBy;
            created_at?: /* Time when the bulk message action was created */ CreatedAt /* date-time */;
            updated_at?: /* Time when the bulk message action was last updated */ UpdatedAt /* date-time */;
            approved_at?: /* Time when the bulk message action was last approved */ ApprovedAt /* date-time */;
            approve_action?: /**
             * Type of approval action for the bulk message request.
             * * APPROVE_WITH_CONSENT: Approve the bulk message request and send emails to queued recipients with consent
             * * APPROVE_ALL: Approve the bulk message request and send emails to all queued recipients, including those without consent
             *
             */
            ApproveAction;
            task_token?: /**
             * Task token to approve or cancel the bulk message action
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            TaskToken;
            /**
             * Total number of emails generated and queued for sending
             * example:
             * 100
             */
            total_queued?: number;
            /**
             * List of entity ids that are queued for sending
             */
            queued?: {
                /**
                 * Recipient Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                entity_id: string;
                /**
                 * Recipient emails
                 */
                email_to: string[];
                /**
                 * Recipient emails with consent
                 */
                email_with_consent: string[];
            }[];
            /**
             * List of entity ids and message ids that were sent successfully
             */
            sent?: {
                /**
                 * Recipient Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                entity_id: string;
                /**
                 * Message ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                message_id: string;
                email_to?: string[];
            }[];
            /**
             * List of entity ids that were skipped or failed
             */
            failed?: {
                /**
                 * Recipient Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                entity_id: string;
                /**
                 * Error message
                 */
                error: string;
                email_to?: string[];
            }[];
        }
        /**
         * It takes a list of entity ids, treating each as a separate mainEntity to construct individual messages.
         * For e.g; if there some opportunityIds are provided, then each opportunityId is treated as a separate mainEntity to construct individual messages.
         *
         */
        export interface BulkSendMessageRequest {
            skip_creating_entities?: /* When true, it lets to send only the email by skip creating the thread & message entities. */ SkipCreatingEntities;
            complete_thread?: /* Whether the thread is marked as Done immediately after sending the message */ CompleteThread;
            /**
             * ID of email template to use for sending bulk emails
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
            /**
             * If true then include unsubscribe link in the email body
             *
             */
            must_include_unsubscribe_link?: boolean;
            /**
             * List of entity ids to use as recipients
             * example:
             * [
             *   "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "3fa85f64-5717-4562-b3fc-2c963f66afa7",
             *   "3fa85f64-5717-4562-b3fc-2c963f66afa8"
             * ]
             */
            recipient_ids: string[];
            custom_variables?: /* Custom variables to be replaced in the email template */ CustomVariables;
        }
        /**
         * It takes an entity query to derive recipient_ids, treating each as a separate mainEntity to construct individual messages.
         * For e.g; if the query is provided as `_schema:opportunity AND status:PENDING`,
         *   then all the opportunity Ids with status PENDING are treated as separate mainEntity to construct individual messages.
         *
         */
        export interface BulkSendMessageRequestWithQuery {
            skip_creating_entities?: /* When true, it lets to send only the email by skip creating the thread & message entities. */ SkipCreatingEntities;
            complete_thread?: /* Whether the thread is marked as Done immediately after sending the message */ CompleteThread;
            /**
             * ID of email template to use for sending bulk emails
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
            /**
             * If true then include unsubscribe link in the email body
             *
             */
            must_include_unsubscribe_link?: boolean;
            /**
             * Entity search query to select recipients
             * example:
             * _schema:contact AND consent_email_marketing:active
             */
            recipient_query: string;
            custom_variables?: /* Custom variables to be replaced in the email template */ CustomVariables;
        }
        /**
         * Whether the thread is marked as Done immediately after sending the message
         */
        export type CompleteThread = boolean;
        export interface CreateSystemTemplatesReq {
            /**
             * example:
             * [
             *   "DoubleOptIn_Email_DE",
             *   "Einladung Kundenportal",
             *   "Partner_Kooperation_Email_DE"
             * ]
             */
            template_names: string[];
        }
        export type CreateSystemTemplatesResp = BaseEntity[];
        /**
         * Time when the bulk message action was created
         */
        export type CreatedAt = string; // date-time
        /**
         * User ID who created the bulk message action
         * example:
         * 1234
         */
        export type CreatedBy = string;
        /**
         * Custom variables to be replaced in the email template
         */
        export type CustomVariables = {
            /**
             * Template Variable Name
             * example:
             * {{abc.xyz}}
             */
            variable?: string;
            /**
             * Value to be Replaced
             * example:
             * ReplacedValue
             */
            value?: string;
        }[];
        /**
         * Design Builder design linked to this template. When set, `{{design.*}}` placeholders
         * (e.g. `{{design.assets.logo.url}}`, `{{design.colors.primary}}`) are replaced with the design's
         * current values at templating time.
         *
         * example:
         * 7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b
         */
        export type DesignId = string | null;
        export interface EmailTemplateEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: string;
            /**
             * Entity title
             */
            _title: string;
            /**
             * Ivy Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema: string;
            /**
             * Entity tags
             * example:
             * [
             *   "automatic email template"
             * ]
             */
            _tags?: string[];
            /**
             * Created date
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Updated date
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at: string; // date-time
            /**
             * Entity Purposes
             * example:
             * [
             *   "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
             *   "310cd388-2f15-4b5b-8f98-ca14c1e03304"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * name
             * example:
             * Order confirmation
             */
            name: string;
            /**
             * Brand ID. Equal 0 if available for All brands
             * example:
             * 0
             */
            brand_id?: number | null;
            design_id?: /**
             * Design Builder design linked to this template. When set, `{{design.*}}` placeholders
             * (e.g. `{{design.assets.logo.url}}`, `{{design.colors.primary}}`) are replaced with the design's
             * current values at templating time.
             *
             * example:
             * 7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b
             */
            DesignId;
            from?: From;
            /**
             * To
             */
            to?: To[];
            /**
             * Cc
             */
            cc?: To[];
            /**
             * Bcc
             */
            bcc?: To[];
            /**
             * Subject
             * example:
             * We have received your order!
             */
            subject?: string;
            /**
             * Body
             * example:
             * Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly
             */
            body?: string;
            /**
             * Email template attachments
             */
            attachments?: Attachment[] | null;
            file?: {
                /**
                 * Entity tags
                 */
                $relation?: {
                    [key: string]: any;
                }[];
            };
            /**
             * Created by
             * example:
             * 1234
             */
            created_by?: string;
            /**
             * Updated by
             * example:
             * 1234
             */
            updated_by?: string;
            /**
             * This field is used to store JSON templates. If this field is populated, then the Body html is derived from the JSON.
             */
            json_template?: string;
            /**
             * Snapshot of the legacy template body, taken when migrating to the email-builder format.
             */
            backup?: {
                /**
                 * Original HTML body before conversion to email-builder blocks.
                 */
                body?: string;
                /**
                 * ISO 8601 timestamp when the backup was created.
                 * example:
                 * 2026-05-13T10:00:00.000Z
                 */
                backed_up_at?: string;
            };
            /**
             * True after the template has been converted from legacy HTML to the new email-builder format. Used by the UI to expose the "Revert to legacy HTML" action.
             * example:
             * false
             */
            converted_to_new_editor?: boolean;
            /**
             * If template is created by system (Double Opt-in, CMD invitation,...) then true, and some attributes can not be edited such as Name, To,...
             * Remember to add default content of template to system_template enum for revert to original feature
             *
             * example:
             * false
             */
            system_template?: boolean;
            /**
             * If true, the template is displayed in read-only mode in the UI
             */
            protected?: boolean;
            /**
             * Set on a duplicated template to point at its source template id.
             * Cleared after automations have been migrated via `migrateAutomationsForTemplate`.
             *
             * example:
             * cd7809ba-a111-4dd9-8d15-18eb4de0faed
             */
            original_template_id?: string | null;
        }
        export interface EmailTemplateRequest {
            /**
             * example:
             * cd7809ba-a111-4dd9-8d15-18eb4de0faed
             */
            _id?: string;
            /**
             * Entity tags
             * example:
             * [
             *   "template"
             * ]
             */
            _tags?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * Entity Purposes
             * example:
             * [
             *   "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
             *   "310cd388-2f15-4b5b-8f98-ca14c1e03304"
             * ]
             */
            _purpose?: string[];
            /**
             * name
             * example:
             * Order confirmation
             */
            name: string;
            /**
             * Brand ID. Equal 0 if available for All brands
             * example:
             * 0
             */
            brand_id?: number | null;
            /**
             * `partial` for blocks other templates reuse. A partial is never sent on its own, so it has
             * no subject. Unset for a regular template.
             *
             * example:
             * partial
             */
            template_type?: "partial";
            design_id?: /**
             * Design Builder design linked to this template. When set, `{{design.*}}` placeholders
             * (e.g. `{{design.assets.logo.url}}`, `{{design.colors.primary}}`) are replaced with the design's
             * current values at templating time.
             *
             * example:
             * 7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b
             */
            DesignId;
            /**
             * From
             */
            from?: From;
            /**
             * To
             */
            to?: To[];
            /**
             * Cc
             */
            cc?: To[];
            /**
             * Bcc
             */
            bcc?: To[];
            /**
             * Subject. Required, except for a partial (`template_type` partial).
             * example:
             * We have received your order!
             */
            subject?: string;
            /**
             * Body
             * example:
             * Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly
             */
            body?: string;
            /**
             * Email template attachments
             */
            attachments?: Attachment[] | null;
            file?: {
                /**
                 * Entity tags
                 */
                $relation?: {
                    [key: string]: any;
                }[];
            };
            /**
             * If template is created by system (Double Opt-in, CMD invitation,...) then true, and some attributes can not be edited such as Name, To,...
             * Remember to add default content of template to [system-template.ts](https://gitlab.com/e-pilot/product/email-templates/svc-email-templates-api/-/blob/main/lambda/HandlerFunction/src/enum/system-template.ts) enum for revert to original feature
             *
             * example:
             * false
             */
            system_template?: boolean;
            /**
             * If true, the template is displayed in read-only mode in the UI
             */
            protected?: boolean;
            /**
             * Created by
             * example:
             * 1234
             */
            created_by?: string;
            /**
             * Updated by
             * example:
             * 1234
             */
            updated_by?: string;
            /**
             * This field is used to store JSON templates. If this field is populated, then the Body html is derived from the JSON.
             */
            json_template?: string;
            /**
             * Set on a duplicated template to point at its source template id.
             * Cleared (set to null) after automations referencing the source have been
             * migrated onto the new template via `migrateAutomationsForTemplate`.
             *
             * example:
             * cd7809ba-a111-4dd9-8d15-18eb4de0faed
             */
            original_template_id?: string | null;
            /**
             * Snapshot of the legacy template body, taken when migrating to the email-builder format.
             */
            backup?: {
                /**
                 * Original HTML body before conversion to email-builder blocks.
                 */
                body?: string;
                /**
                 * ISO 8601 timestamp when the backup was created.
                 * example:
                 * 2026-05-13T10:00:00.000Z
                 */
                backed_up_at?: string;
            };
            /**
             * True after the template has been converted from legacy HTML to the new email-builder format. Used by the UI to expose the "Revert to legacy HTML" action.
             * example:
             * false
             */
            converted_to_new_editor?: boolean;
        }
        export interface EmailTemplateResponse {
            entity?: EmailTemplateEntity;
            relations?: {
                [key: string]: any;
            }[];
        }
        export interface From {
            /**
             * example:
             * epilot
             */
            name?: string;
            /**
             * example:
             * service@stadtwerke-example.de
             */
            email: string;
        }
        export interface JourneyContextUsageItem {
            kind: "email-template-body";
            resource: {
                type: "email_template";
                /**
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                id: string;
                name?: string;
            };
            location: {
                /**
                 * Email template field the match was found in.
                 */
                field: "subject" | "body" | "to" | "cc" | "bcc" | "json_template" | "backup.body";
            };
            matched_as: {
                dialect: "name";
                /**
                 * The exact token found, e.g. `submission.journey_context.contact_id`.
                 */
                token: string;
                /**
                 * Path the match was found at. Debugging and tests only.
                 */
                at: string;
            };
            link_hint: {
                route: "email-template";
                params: {
                    id: string;
                };
            };
        }
        /**
         * Shared request shape across journey-api's eight context-usage
         * adapters. `journey_id` is required for parity with the other seven,
         * but this adapter does not use it: email templates reference context
         * parameters by name and carry no journey id at all, so it cannot
         * narrow the search here.
         *
         */
        export interface JourneyContextUsagesRequest {
            /**
             * Journey the usage check originated from. Validated, not used by this adapter.
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            journey_id: string;
            /**
             * Context parameter keys to search for, e.g. `contact_id`.
             * example:
             * [
             *   "contact_id"
             * ]
             */
            param_keys: [
                string,
                ...string[]
            ];
            /**
             * Accepted and ignored. This adapter resolves context parameters by name only.
             */
            param_ids?: string[];
        }
        export interface JourneyContextUsagesResponse {
            usages: JourneyContextUsageItem[];
            /**
             * `partial` when a page cap, row cap, or soft deadline truncated the scan before every template was read.
             */
            status: "ok" | "partial";
            /**
             * Number of email templates read during the scan.
             */
            scanned: number;
        }
        export interface MigrateAutomationsResponse {
            /**
             * Number of automation flows successfully rewritten to point at the new template
             * example:
             * 3
             */
            migrated_flow_count: number;
            /**
             * IDs of automation flows that were successfully migrated
             */
            migrated_flow_ids: string[];
            /**
             * Number of v2 workflows whose `AUTOMATION` tasks point at a migrated automation flow.
             * Derived from `migrated_flow_ids` — a workflow is counted once even if multiple of
             * its tasks reference the same migrated flow.
             *
             * example:
             * 2
             */
            migrated_workflow_count: number;
            /**
             * IDs of workflows (`wf-*`) that owned at least one migrated automation flow
             */
            migrated_workflow_ids: string[];
            /**
             * Number of customer-portal email-template config rows whose references were rewritten
             * from the old template id to the new one (via customer-portal-api's
             * `migrateEmailTemplateReferences`).
             *
             * example:
             * 1
             */
            migrated_portal_count: number;
            /**
             * Portal IDs whose email-template references were successfully rewritten
             */
            migrated_portal_ids: string[];
            /**
             * IDs of automation flows whose `putFlow` update failed. Caller can retry or surface to the user.
             */
            failed_flow_ids: string[];
            /**
             * Portal IDs whose email-template reference rewrite failed in customer-portal-api.
             */
            failed_portal_ids: string[];
            /**
             * True when the call to customer-portal-api threw before returning, so the portal
             * counts could not be computed. Flow/workflow results are still valid; the caller
             * should surface this and offer a retry of the portal migration.
             *
             * example:
             * false
             */
            portal_migration_errored: boolean;
        }
        /**
         * Organization ID
         * example:
         * 206801
         */
        export type OrgId = string;
        export interface PresignedRequest {
            /**
             * UUID
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            id: string;
            /**
             * File name
             * example:
             * order.pdf
             */
            filename: string;
            /**
             * Content type
             * example:
             * application/pdf
             */
            content_type: string;
        }
        export interface PresignedResponse {
            /**
             * URL to download the attachment. This URL is not accessible until attachment is uploaded successfully.
             * example:
             * https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf
             */
            download_url: string;
            /**
             * Post presigned URL to upload file
             */
            upload_url: {
                /**
                 * URL to upload the attachment
                 * example:
                 * https://s3.eu-central-1.amazonaws.com/893487340562-message-attachment
                 */
                url: number;
                /**
                 * Fields are provided by AWS to authenticate and validate the request. All fields should be included in form-data when performing upload request.
                 * example:
                 * {}
                 */
                fields: {
                    [key: string]: any;
                };
            };
        }
        /**
         * When true, it lets to send only the email by skip creating the thread & message entities.
         */
        export type SkipCreatingEntities = boolean;
        /**
         * Task token to approve or cancel the bulk message action
         * example:
         * 8c086140-f33e-4bb7-a993-50c0f2402c7b
         */
        export type TaskToken = string;
        export interface TemplateReferenceItem {
            id: string;
            /**
             * Human-friendly name (flow_name / workflow name / portal name); may be absent.
             */
            name?: string | null;
        }
        export interface TemplateReferencesResponse {
            /**
             * Automation flows whose send-email/reply-email actions reference this template
             */
            flows: TemplateReferenceItem[];
            /**
             * v2 workflows that own a referencing automation flow
             */
            workflows: TemplateReferenceItem[];
            /**
             * Customer portals whose email-template config references this template
             */
            portals: TemplateReferenceItem[];
            /**
             * True when the customer-portal lookup failed, so `portals` may be incomplete.
             */
            portal_lookup_errored: boolean;
        }
        export type TemplateType = "email" | "document";
        export interface To {
            /**
             * example:
             * Ny Huynh
             */
            name?: string;
            /**
             * example:
             * ny.huynh@axonactive.com
             */
            email: string;
        }
        /**
         * Time when the bulk message action was last updated
         */
        export type UpdatedAt = string; // date-time
        export interface UserResponse {
            id?: string;
            organization_id?: string;
            /**
             * User's display name (default: email address)
             * example:
             * Example User
             */
            display_name?: string;
            email?: string; // email
            /**
             * example:
             * 1234567890
             */
            phone?: string | null;
            /**
             * example:
             * de
             */
            preferred_language?: string;
            /**
             * example:
             * {
             *   "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
             *   "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
             * }
             */
            image_uri?: {
                [name: string]: any;
                original?: string; // uri
                thumbnail_32?: string; // uri
            };
            properties?: {
                /**
                 * example:
                 * profileImageName
                 */
                name: string;
                /**
                 * example:
                 * avatar.png
                 */
                value: string;
            }[];
        }
        export interface VariableParameters {
            template_type: TemplateType;
            /**
             * example:
             * de
             */
            language?: string;
            /**
             * The main entity ID. Use main entity in order to use the variable without schema slug prefix - or just pass directly to other object ID.
             * example:
             * 63753437-c9e2-4e83-82bb-b1c666514561
             */
            main_entity_id?: string;
            /**
             * User ID
             * example:
             * 123452
             */
            user_id?: string;
            custom_variables?: /* Custom variables to be replaced in the email template */ CustomVariables;
            /**
             * Only put the current content of the partials in, and leave every other variable as it is,
             * e.g. to preview a template without an entity.
             *
             */
            partials_only?: boolean;
            /**
             * The portal the send is for, e.g. the recipient's portal. Portal user variables
             * (`{{portalUser.*}}`) link to this portal. Without it the portal is derived from the template.
             *
             */
            portal_id?: string;
        }
    }
}
declare namespace Paths {
    namespace BulkSendMessage {
        export type RequestBody = /**
         * It takes an entity query to derive recipient_ids, treating each as a separate mainEntity to construct individual messages.
         * For e.g; if the query is provided as `_schema:opportunity AND status:PENDING`,
         *   then all the opportunity Ids with status PENDING are treated as separate mainEntity to construct individual messages.
         *
         */
        Components.Schemas.BulkSendMessageRequestWithQuery | /**
         * It takes a list of entity ids, treating each as a separate mainEntity to construct individual messages.
         * For e.g; if there some opportunityIds are provided, then each opportunityId is treated as a separate mainEntity to construct individual messages.
         *
         */
        Components.Schemas.BulkSendMessageRequest | {
            /**
             * Job ID for tracking the status of a bulk message request
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            job_id: string;
            /**
             * Trigger an APPROVE OR CANCEL action for the bulk message request.
             *
             * * APPROVE: Alias for APPROVE_WITH_CONSENT
             * * APPROVE_WITH_CONSENT: Approve the bulk message request and send emails to queued recipients with consent
             * * APPROVE_ALL: Approve the bulk message request and send emails to all queued recipients, including those without consent
             * * CANCEL: Cancel the bulk message request
             *
             */
            action?: "APPROVE" | "APPROVE_WITH_CONSENT" | "APPROVE_ALL" | "CANCEL";
        };
        namespace Responses {
            export type $200 = Components.Schemas.BulkSendMessageJob;
            export interface $403 {
            }
        }
    }
    namespace ConvertToBuilder {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface RequestBody {
            /**
             * When true, return the converted output without saving.
             * example:
             * false
             */
            dryRun?: boolean;
            /**
             * When true, overwrite an existing json_template.
             * example:
             * false
             */
            force?: boolean;
            /**
             * When true, leave the source template untouched and save the converted result as a NEW template (linked via original_template_id). The response is the new entity.
             * example:
             * false
             */
            as_copy?: boolean;
            /**
             * Optional name for the as_copy result. The UI sends a localized copy name (e.g. "Copy of <name> (Visual)") so the new template is named like the list-view "Duplicate" action. Ignored unless as_copy is true.
             * example:
             * Copy of Welcome email (Visual)
             */
            name?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateEntity;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace GetTemplateDetail {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateResponse;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetTemplateReferences {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TemplateReferencesResponse;
            export interface $403 {
            }
        }
    }
    namespace MigrateAutomationsForTemplate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface RequestBody {
            /**
             * Source template id that automations are being migrated away from
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            old_template_id: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MigrateAutomationsResponse;
            export interface $403 {
            }
        }
    }
    namespace ReplaceVariables {
        export interface RequestBody {
            /**
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
            variable_parameters?: Components.Schemas.VariableParameters;
            /**
             * If true then include unsubscribe link in the email body
             *
             */
            must_include_unsubscribe_link?: boolean;
            /**
             * If true then skip document generation. This is useful when you want to replace html variables only. Speeds up the process.
             *
             */
            skip_document_generation?: boolean;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateResponse;
            export interface $403 {
            }
        }
    }
    namespace ReplaceVariablesAsync {
        namespace Parameters {
            export type JobId = string;
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id?: string;
            variable_parameters?: Components.Schemas.VariableParameters;
            /**
             * If true then include unsubscribe link in the email body
             *
             */
            must_include_unsubscribe_link?: boolean;
            /**
             * If true then skip document generation. This is useful when you want to replace html variables only. Speeds up the process.
             *
             */
            skip_document_generation?: boolean;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AsyncEmailTemplateResponse;
            export interface $403 {
            }
        }
    }
    namespace RevertToOriginalTemplate {
        export interface RequestBody {
            /**
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveTemplate {
        export type RequestBody = Components.Schemas.EmailTemplateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateEntity;
            export interface $403 {
            }
        }
    }
    namespace UpdateTemplateDetail {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.EmailTemplateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateEntity;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * saveTemplate - saveTemplate
   * 
   * Create or update a template. If `id` is provided, it will update the template.
   */
  'saveTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SaveTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveTemplate.Responses.$200>
  /**
   * getTemplateDetail - getTemplateDetail
   * 
   * Get email template by ID
   */
  'getTemplateDetail'(
    parameters?: Parameters<Paths.GetTemplateDetail.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTemplateDetail.Responses.$200>
  /**
   * updateTemplateDetail - updateTemplateDetail
   * 
   * Update email template by ID
   */
  'updateTemplateDetail'(
    parameters?: Parameters<Paths.UpdateTemplateDetail.PathParameters> | null,
    data?: Paths.UpdateTemplateDetail.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTemplateDetail.Responses.$200>
  /**
   * migrateAutomationsForTemplate - migrateAutomationsForTemplate
   * 
   * Find all automation flows in the org that contain a `send-email` or `reply-email`
   * action referencing `old_template_id` and rewrite those actions to point at the
   * new template id (`{id}` path param). Intended to be called after a duplicated
   * template has been refined, so automations follow over to the new template.
   * 
   */
  'migrateAutomationsForTemplate'(
    parameters?: Parameters<Paths.MigrateAutomationsForTemplate.PathParameters> | null,
    data?: Paths.MigrateAutomationsForTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MigrateAutomationsForTemplate.Responses.$200>
  /**
   * getTemplateReferences - getTemplateReferences
   * 
   * List the automation flows, workflows and customer portals that currently
   * reference this template, without modifying anything. Powers the template
   * settings "used by" view and the pre-migrate preview, and uses the same
   * discovery as `migrateAutomationsForTemplate` so the preview matches what a
   * migrate would touch.
   * 
   */
  'getTemplateReferences'(
    parameters?: Parameters<Paths.GetTemplateReferences.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTemplateReferences.Responses.$200>
  /**
   * replaceVariables - replaceVariables
   * 
   * Get template detail and replace all variables (template variables and document generation)
   */
  'replaceVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ReplaceVariables.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplaceVariables.Responses.$200>
  /**
   * replaceVariablesAsync - replaceVariablesAsync
   * 
   * This endpoint allows to initiate an asynchronous process in replacing the template details & generating the documents.
   * On initial request, a jobId and STARTED status are returned. Subsequent requests can use this jobId to poll for the resolved template.
   * If still processing, it returns the jobId and IN-PROGRESS status. Upon completion or failure, it returns the final template or a failure status with reason.
   * 
   */
  'replaceVariablesAsync'(
    parameters?: Parameters<Paths.ReplaceVariablesAsync.QueryParameters> | null,
    data?: Paths.ReplaceVariablesAsync.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplaceVariablesAsync.Responses.$200>
  /**
   * bulkSendMessage - bulkSendMessage
   * 
   * Send emails to multiple recipients using a template
   */
  'bulkSendMessage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkSendMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkSendMessage.Responses.$200>
  /**
   * revertToOriginalTemplate - revertToOriginalTemplate
   * 
   * Revert to the original system generated email template
   */
  'revertToOriginalTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RevertToOriginalTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevertToOriginalTemplate.Responses.$200>
  /**
   * convertToBuilder - convertToBuilder
   * 
   * Converts a legacy HTML email template into the email-builder block format.
   * Stores the new `json_template` (stringified block graph), re-renders `body`
   * from the resulting blocks, and stashes the original HTML at `backup.body`.
   * Returns 409 if the template is already converted unless `force=true`.
   * 
   */
  'convertToBuilder'(
    parameters?: Parameters<Paths.ConvertToBuilder.PathParameters> | null,
    data?: Paths.ConvertToBuilder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConvertToBuilder.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/email-template/templates']: {
    /**
     * saveTemplate - saveTemplate
     * 
     * Create or update a template. If `id` is provided, it will update the template.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SaveTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveTemplate.Responses.$200>
  }
  ['/v1/email-template/templates/{id}']: {
    /**
     * getTemplateDetail - getTemplateDetail
     * 
     * Get email template by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetTemplateDetail.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTemplateDetail.Responses.$200>
    /**
     * updateTemplateDetail - updateTemplateDetail
     * 
     * Update email template by ID
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTemplateDetail.PathParameters> | null,
      data?: Paths.UpdateTemplateDetail.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTemplateDetail.Responses.$200>
  }
  ['/v1/email-template/templates/{id}:migrate-automations']: {
    /**
     * migrateAutomationsForTemplate - migrateAutomationsForTemplate
     * 
     * Find all automation flows in the org that contain a `send-email` or `reply-email`
     * action referencing `old_template_id` and rewrite those actions to point at the
     * new template id (`{id}` path param). Intended to be called after a duplicated
     * template has been refined, so automations follow over to the new template.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.MigrateAutomationsForTemplate.PathParameters> | null,
      data?: Paths.MigrateAutomationsForTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MigrateAutomationsForTemplate.Responses.$200>
  }
  ['/v1/email-template/templates/{id}:references']: {
    /**
     * getTemplateReferences - getTemplateReferences
     * 
     * List the automation flows, workflows and customer portals that currently
     * reference this template, without modifying anything. Powers the template
     * settings "used by" view and the pre-migrate preview, and uses the same
     * discovery as `migrateAutomationsForTemplate` so the preview matches what a
     * migrate would touch.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTemplateReferences.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTemplateReferences.Responses.$200>
  }
  ['/v1/email-template/templates:replace']: {
    /**
     * replaceVariables - replaceVariables
     * 
     * Get template detail and replace all variables (template variables and document generation)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ReplaceVariables.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplaceVariables.Responses.$200>
  }
  ['/v1/email-template/templates:replaceAsync']: {
    /**
     * replaceVariablesAsync - replaceVariablesAsync
     * 
     * This endpoint allows to initiate an asynchronous process in replacing the template details & generating the documents.
     * On initial request, a jobId and STARTED status are returned. Subsequent requests can use this jobId to poll for the resolved template.
     * If still processing, it returns the jobId and IN-PROGRESS status. Upon completion or failure, it returns the final template or a failure status with reason.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ReplaceVariablesAsync.QueryParameters> | null,
      data?: Paths.ReplaceVariablesAsync.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplaceVariablesAsync.Responses.$200>
  }
  ['/v1/email-template/templates:bulkSendMessage']: {
    /**
     * bulkSendMessage - bulkSendMessage
     * 
     * Send emails to multiple recipients using a template
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkSendMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkSendMessage.Responses.$200>
  }
  ['/v1/email-template/templates:revert']: {
    /**
     * revertToOriginalTemplate - revertToOriginalTemplate
     * 
     * Revert to the original system generated email template
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RevertToOriginalTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevertToOriginalTemplate.Responses.$200>
  }
  ['/v1/email-template/templates/{id}:convertToBuilder']: {
    /**
     * convertToBuilder - convertToBuilder
     * 
     * Converts a legacy HTML email template into the email-builder block format.
     * Stores the new `json_template` (stringified block graph), re-renders `body`
     * from the resulting blocks, and stashes the original HTML at `backup.body`.
     * Returns 409 if the template is already converted unless `force=true`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ConvertToBuilder.PathParameters> | null,
      data?: Paths.ConvertToBuilder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConvertToBuilder.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ApproveAction = Components.Schemas.ApproveAction;
export type ApprovedAt = Components.Schemas.ApprovedAt;
export type AsyncEmailTemplateResponse = Components.Schemas.AsyncEmailTemplateResponse;
export type Attachment = Components.Schemas.Attachment;
export type AttachmentResponse = Components.Schemas.AttachmentResponse;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BulkSendMessageJob = Components.Schemas.BulkSendMessageJob;
export type BulkSendMessageRequest = Components.Schemas.BulkSendMessageRequest;
export type BulkSendMessageRequestWithQuery = Components.Schemas.BulkSendMessageRequestWithQuery;
export type CompleteThread = Components.Schemas.CompleteThread;
export type CreateSystemTemplatesReq = Components.Schemas.CreateSystemTemplatesReq;
export type CreateSystemTemplatesResp = Components.Schemas.CreateSystemTemplatesResp;
export type CreatedAt = Components.Schemas.CreatedAt;
export type CreatedBy = Components.Schemas.CreatedBy;
export type CustomVariables = Components.Schemas.CustomVariables;
export type DesignId = Components.Schemas.DesignId;
export type EmailTemplateEntity = Components.Schemas.EmailTemplateEntity;
export type EmailTemplateRequest = Components.Schemas.EmailTemplateRequest;
export type EmailTemplateResponse = Components.Schemas.EmailTemplateResponse;
export type From = Components.Schemas.From;
export type JourneyContextUsageItem = Components.Schemas.JourneyContextUsageItem;
export type JourneyContextUsagesRequest = Components.Schemas.JourneyContextUsagesRequest;
export type JourneyContextUsagesResponse = Components.Schemas.JourneyContextUsagesResponse;
export type MigrateAutomationsResponse = Components.Schemas.MigrateAutomationsResponse;
export type OrgId = Components.Schemas.OrgId;
export type PresignedRequest = Components.Schemas.PresignedRequest;
export type PresignedResponse = Components.Schemas.PresignedResponse;
export type SkipCreatingEntities = Components.Schemas.SkipCreatingEntities;
export type TaskToken = Components.Schemas.TaskToken;
export type TemplateReferenceItem = Components.Schemas.TemplateReferenceItem;
export type TemplateReferencesResponse = Components.Schemas.TemplateReferencesResponse;
export type TemplateType = Components.Schemas.TemplateType;
export type To = Components.Schemas.To;
export type UpdatedAt = Components.Schemas.UpdatedAt;
export type UserResponse = Components.Schemas.UserResponse;
export type VariableParameters = Components.Schemas.VariableParameters;
