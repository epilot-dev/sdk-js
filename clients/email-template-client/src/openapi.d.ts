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
        }
        export interface EmailTemplateEntity {
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
             * To. This field is required if email template is not created by system
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
            entity?: {
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
            };
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
             * Brand ID
             * example:
             * 123451
             */
            brand_id?: number | null;
            /**
             * User ID
             * example:
             * 123452
             */
            user_id?: number;
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
    namespace CreateAttachmentUploadUrl {
        export type RequestBody = Components.Schemas.PresignedRequest;
        namespace Responses {
            export type $200 = Components.Schemas.PresignedResponse;
            export interface $403 {
            }
        }
    }
    namespace CreateFeatureSystemTemplates {
        export interface RequestBody {
            /**
             * example:
             * end_customer_portal
             */
            featureKey?: string;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace CreateSystemTemplates {
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace DeleteEmailTemplate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace DeleteMultipleEmailTemplates {
        export interface RequestBody {
            /**
             * List entity IDs
             */
            entity_ids: string[];
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetCreatedByAndUpdatedBy {
        export interface RequestBody {
            /**
             * List user IDs
             */
            entity_ids?: number[];
        }
        namespace Responses {
            /**
             * List attachments
             */
            export type $200 = any[];
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
    namespace ListAttachments {
        namespace Parameters {
            export type AvailabilityProducts = string;
            export type AvailabilityTypes = string;
            export type DocumentTypes = string;
        }
        export interface QueryParameters {
            document_types?: Parameters.DocumentTypes;
            availability_types?: Parameters.AvailabilityTypes;
            availability_products?: Parameters.AvailabilityProducts;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AttachmentResponse;
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
        }
        namespace Responses {
            export type $200 = Components.Schemas.EmailTemplateResponse;
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
            export interface $200 {
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
                from?: Components.Schemas.From;
                /**
                 * To
                 */
                to?: Components.Schemas.To[];
                /**
                 * Cc
                 */
                cc?: Components.Schemas.To[];
                /**
                 * Bcc
                 */
                bcc?: Components.Schemas.To[];
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
                attachments?: Components.Schemas.Attachment[] | null;
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
   * deleteMultipleEmailTemplates - deleteMultipleEmailTemplates
   * 
   * Immediately and permanently deletes the multiple email templates. This operation cannot be undone.
   */
  'deleteMultipleEmailTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteMultipleEmailTemplates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMultipleEmailTemplates.Responses.$204>
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
   * deleteEmailTemplate - deleteEmailTemplate
   * 
   * Immediately and permanently deletes the specified email template. This operation cannot be undone.
   */
  'deleteEmailTemplate'(
    parameters?: Parameters<Paths.DeleteEmailTemplate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEmailTemplate.Responses.$204>
  /**
   * createAttachmentUploadUrl - createAttachmentUploadUrl
   * 
   * Create S3 POST presigned URL to upload attachment. The URL is valid in 30 minutes. Maximum file size is 100MB.
   */
  'createAttachmentUploadUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAttachmentUploadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAttachmentUploadUrl.Responses.$200>
  /**
   * listAttachments - listAttachments
   * 
   * Get list attachments from static and template document
   */
  'listAttachments'(
    parameters?: Parameters<Paths.ListAttachments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAttachments.Responses.$200>
  /**
   * getCreatedByAndUpdatedBy - getCreatedByAndUpdatedBy
   * 
   * Get list users which create email template
   */
  'getCreatedByAndUpdatedBy'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetCreatedByAndUpdatedBy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCreatedByAndUpdatedBy.Responses.$200>
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
   * createSystemTemplates - createSystemTemplates
   * 
   * create system email templates for an organization
   */
  'createSystemTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSystemTemplates.Responses.$200>
  /**
   * createFeatureSystemTemplates - createFeatureSystemTemplates
   * 
   * create system email templates for an organization based on feature
   */
  'createFeatureSystemTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateFeatureSystemTemplates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateFeatureSystemTemplates.Responses.$200>
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
    /**
     * deleteMultipleEmailTemplates - deleteMultipleEmailTemplates
     * 
     * Immediately and permanently deletes the multiple email templates. This operation cannot be undone.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteMultipleEmailTemplates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMultipleEmailTemplates.Responses.$204>
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
     * deleteEmailTemplate - deleteEmailTemplate
     * 
     * Immediately and permanently deletes the specified email template. This operation cannot be undone.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEmailTemplate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEmailTemplate.Responses.$204>
  }
  ['/v1/email-template/templates/attachments/presigned-url']: {
    /**
     * createAttachmentUploadUrl - createAttachmentUploadUrl
     * 
     * Create S3 POST presigned URL to upload attachment. The URL is valid in 30 minutes. Maximum file size is 100MB.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAttachmentUploadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAttachmentUploadUrl.Responses.$200>
  }
  ['/v1/email-template/templates/attachments']: {
    /**
     * listAttachments - listAttachments
     * 
     * Get list attachments from static and template document
     */
    'get'(
      parameters?: Parameters<Paths.ListAttachments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAttachments.Responses.$200>
  }
  ['/v1/email-template/templates/users']: {
    /**
     * getCreatedByAndUpdatedBy - getCreatedByAndUpdatedBy
     * 
     * Get list users which create email template
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetCreatedByAndUpdatedBy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCreatedByAndUpdatedBy.Responses.$200>
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
  ['/v1/email-template/templates/system']: {
    /**
     * createSystemTemplates - createSystemTemplates
     * 
     * create system email templates for an organization
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSystemTemplates.Responses.$200>
  }
  ['/v1/email-template/templates/system/feature']: {
    /**
     * createFeatureSystemTemplates - createFeatureSystemTemplates
     * 
     * create system email templates for an organization based on feature
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateFeatureSystemTemplates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateFeatureSystemTemplates.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
