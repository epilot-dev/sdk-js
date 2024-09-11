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
        }
        export interface BulkSendMessageJob {
            /**
             * Organization ID
             * example:
             * 206801
             */
            org_id?: string;
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
            request: BulkSendMessageRequest | BulkSendMessageRequestWithQuery;
            /**
             * User ID who created the bulk message action
             * example:
             * 1234
             */
            created_by?: string;
            /**
             * Time when the bulk message action was created
             */
            created_at?: string; // date-time
            /**
             * Time when the bulk message action was last updated
             */
            updated_at?: string; // date-time
            /**
             * Time when the bulk message action was last updated
             */
            approved_at?: string; // date-time
            /**
             * Task token to approve or cancel the bulk message action
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            task_token?: string;
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
                email_to?: string[];
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
        }
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
        }
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
            created_by?: number;
            /**
             * Updated by
             * example:
             * 1234
             */
            updated_by?: number;
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
            created_by?: number;
            /**
             * Updated by
             * example:
             * 1234
             */
            updated_by?: number;
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
            name: string;
            /**
             * example:
             * no-reply@epilot.cloud
             */
            email: string;
        }
        /**
         * When true, it lets to send only the email by skip creating the thread & message entities.
         */
        export type SkipCreatingEntities = boolean;
        export type TemplateType = "email" | "document";
        export interface To {
            /**
             * example:
             * Ny Huynh
             */
            name: string;
            /**
             * example:
             * ny.huynh@axonactive.com
             */
            email: string;
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
            custom_variables?: {
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
        }
    }
}
declare namespace Paths {
    namespace BulkSendMessage {
        export type RequestBody = Components.Schemas.BulkSendMessageRequestWithQuery | Components.Schemas.BulkSendMessageRequest | {
            /**
             * Job ID for tracking the status of a bulk message request
             * example:
             * 8c086140-f33e-4bb7-a993-50c0f2402c7b
             */
            job_id: string;
            /**
             * Trigger an APPROVE OR CANCEL action for the bulk message request
             */
            action?: "APPROVE" | "CANCEL";
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

export type AsyncEmailTemplateResponse = Components.Schemas.AsyncEmailTemplateResponse;
export type Attachment = Components.Schemas.Attachment;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BulkSendMessageJob = Components.Schemas.BulkSendMessageJob;
export type BulkSendMessageRequest = Components.Schemas.BulkSendMessageRequest;
export type BulkSendMessageRequestWithQuery = Components.Schemas.BulkSendMessageRequestWithQuery;
export type EmailTemplateEntity = Components.Schemas.EmailTemplateEntity;
export type EmailTemplateRequest = Components.Schemas.EmailTemplateRequest;
export type EmailTemplateResponse = Components.Schemas.EmailTemplateResponse;
export type From = Components.Schemas.From;
export type SkipCreatingEntities = Components.Schemas.SkipCreatingEntities;
export type TemplateType = Components.Schemas.TemplateType;
export type To = Components.Schemas.To;
export type VariableParameters = Components.Schemas.VariableParameters;
