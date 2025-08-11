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
            /**
             * ID of email template to use for sending bulk emails
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
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
            /**
             * ID of email template to use for sending bulk emails
             * example:
             * 511ceb90-f738-47aa-8b1e-915ace0ae13c
             */
            email_template_id: string;
            /**
             * Entity search query to select recipients
             * example:
             * _schema:contact AND consent_email_marketing:active
             */
            recipient_query: string;
            custom_variables?: /* Custom variables to be replaced in the email template */ CustomVariables;
        }
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
             * If template is created by system (Double Opt-in, CMD invitation,...) then true, and some attributes can not be edited such as Name, To,...
             * Remember to add default content of template to system_template enum for revert to original feature
             *
             * example:
             * false
             */
            system_template?: boolean;
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
             * Subject
             * example:
             * We have received your order!
             */
            subject: string;
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
             * no-reply@epilot.cloud
             */
            email: string;
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
            language?: "en" | "de";
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
export type CreateSystemTemplatesReq = Components.Schemas.CreateSystemTemplatesReq;
export type CreateSystemTemplatesResp = Components.Schemas.CreateSystemTemplatesResp;
export type CreatedAt = Components.Schemas.CreatedAt;
export type CreatedBy = Components.Schemas.CreatedBy;
export type CustomVariables = Components.Schemas.CustomVariables;
export type EmailTemplateEntity = Components.Schemas.EmailTemplateEntity;
export type EmailTemplateRequest = Components.Schemas.EmailTemplateRequest;
export type EmailTemplateResponse = Components.Schemas.EmailTemplateResponse;
export type From = Components.Schemas.From;
export type OrgId = Components.Schemas.OrgId;
export type PresignedRequest = Components.Schemas.PresignedRequest;
export type PresignedResponse = Components.Schemas.PresignedResponse;
export type SkipCreatingEntities = Components.Schemas.SkipCreatingEntities;
export type TaskToken = Components.Schemas.TaskToken;
export type TemplateType = Components.Schemas.TemplateType;
export type To = Components.Schemas.To;
export type UpdatedAt = Components.Schemas.UpdatedAt;
export type UserResponse = Components.Schemas.UserResponse;
export type VariableParameters = Components.Schemas.VariableParameters;
