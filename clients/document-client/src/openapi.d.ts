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
        export interface ConvertDocumentRequest {
            /**
             * Input document
             */
            input_document: {
                s3ref: S3Reference;
            };
            /**
             * Output format of the document
             */
            output_format: "pdf";
            /**
             * Filename of the output document (optional)
             * example:
             * converted.pdf
             */
            output_filename?: string;
        }
        export interface ConvertDocumentResponse {
            output_document?: {
                /**
                 * Pre-signed URL for the converted document
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/converted.pdf
                 */
                preview_url?: string;
                s3ref?: S3Reference;
            };
        }
        export interface DocumentGenerationV2Request {
            /**
             * Input template document
             */
            template_document: {
                /**
                 * Document original filename
                 * example:
                 * my-template-{{order.order_number}}.docx
                 */
                filename?: string;
                s3ref?: S3Reference;
            };
            /**
             * Entity to use for variable context
             * example:
             * bcd0aab9-b544-42b0-8bfb-6d449d02eacc
             */
            context_entity_id?: string; // uuid
            /**
             * User Id for variable context
             * example:
             * 100321
             */
            user_id?: string;
            /**
             * Language
             * example:
             * en
             */
            language?: string;
            /**
             * Custom values for variables in the template. Takes the higher precedence than others.
             */
            variable_payload?: {
                additionalProperties?: string;
            };
            /**
             * Custom values for variables in the template. Takes the higher precedence than others.
             */
            context_data?: {
                additionalProperties?: string;
            };
            template_settings?: /* Template Settings for document generation */ TemplateSettings;
        }
        export interface DocumentGenerationV2Response {
            job_id?: string; // uuid
            /**
             * Status of the job
             */
            job_status?: "STARTED" | "PROCESSING" | "SUCCESS" | "FAILED";
            /**
             * A message explaining the progress
             */
            message?: string;
            ics_output?: {
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-appointment.ics"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for ICS
                     * example:
                     * my-appointment-OR-001.ics
                     */
                    filename?: string;
                    s3ref?: S3Reference;
                };
            };
            pdf_output?: {
                /**
                 * Pre-signed S3 GET URL for PDF preview
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.pdf
                 */
                preview_url?: string;
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-template.pdf"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for PDF
                     * example:
                     * my-template-OR-001.pdf
                     */
                    filename?: string;
                    s3ref?: S3Reference;
                };
            };
            docx_output?: {
                /**
                 * Pre-signed S3 GET URL for DOCX preview
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.docx
                 */
                preview_url?: string;
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-template.docx"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for DOCX
                     * example:
                     * my-template-OR-001.docx
                     */
                    filename?: string;
                    s3ref?: S3Reference;
                };
            };
            error_output?: ErrorOutput;
            /**
             * List of variables and its corresponding replaced values from the document template
             */
            variable_payload?: {
                additionalProperties?: string;
            };
            template_settings?: /* Template Settings for document generation */ TemplateSettings;
        }
        export interface DocumentMetaRequest {
            /**
             * Input template document
             */
            template_document?: {
                s3ref?: S3Reference;
            };
        }
        export interface DocumentMetaResponse {
            /**
             * Page margins for the document
             */
            page_margins?: {
                /**
                 * Top margin in cm
                 * example:
                 * 2.54
                 */
                top?: number;
                /**
                 * Bottom margin in cm
                 * example:
                 * 2.54
                 */
                bottom?: number;
                /**
                 * Left margin in cm
                 * example:
                 * 2.54
                 */
                left?: number;
                /**
                 * Right margin in cm
                 * example:
                 * 2.54
                 */
                right?: number;
                /**
                 * Header margin in cm
                 * example:
                 * 2.54
                 */
                header?: number;
                /**
                 * Footer margin in cm
                 * example:
                 * 2.54
                 */
                footer?: number;
            };
            /**
             * List of variables in the document
             * example:
             * [
             *   "order.billing_contact.0.salutation",
             *   "order.billing_contact.0.title",
             *   "order_table",
             *   "stayHardStatic",
             *   "opportunity[attribute_name]",
             *   "opportunity[\"attribute_name\"]",
             *   "opportunity.[attribute_name]",
             *   "attribute_name",
             *   "opportunities.0.attribute_name",
             *   "opportunities[0].attribute_name",
             *   "contact.opportunities[0].attribute_name",
             *   "opportunities[Primary].attribute_name"
             * ]
             */
            variables?: string[];
        }
        /**
         * DocxTemplater error detail
         */
        export interface DocxTemplaterErrorDetail {
            /**
             * Id of the error
             */
            id?: string;
            /**
             * Context of the error
             */
            context?: string;
            /**
             * Explanation of the error
             */
            explanation?: string;
        }
        /**
         * Error details for DocxTemplater error. This error will appear under 'PARSE_ERROR' error code.
         * See https://docxtemplater.com/docs/errors/#error-schema for more details.
         *
         */
        export type DocxTemplaterErrorDetails = /* DocxTemplater error detail */ DocxTemplaterErrorDetail[];
        /**
         * Error codes for document generation:
         * - PARSE_ERROR - Error while parsing the document. Normally related with a bad template using the wrong DocxTemplater syntax.
         * - DOC_TO_PDF_CONVERT_ERROR - Error while converting the document to PDF. Normally related with a ConvertAPI failure.
         * - INTERNAL_ERROR - Internal error. Please contact support.
         * - INVALID_TEMPLATE_FORMAT - Invalid template format (only .docx is supported). This can happen due to a bad word file or an unsupported file extension.
         *
         */
        export type ErrorCode = "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR" | "INVALID_TEMPLATE_FORMAT";
        export interface ErrorOutput {
            /**
             * Error message
             */
            error_message?: string;
            error_code?: /**
             * Error codes for document generation:
             * - PARSE_ERROR - Error while parsing the document. Normally related with a bad template using the wrong DocxTemplater syntax.
             * - DOC_TO_PDF_CONVERT_ERROR - Error while converting the document to PDF. Normally related with a ConvertAPI failure.
             * - INTERNAL_ERROR - Internal error. Please contact support.
             * - INVALID_TEMPLATE_FORMAT - Invalid template format (only .docx is supported). This can happen due to a bad word file or an unsupported file extension.
             *
             */
            ErrorCode;
            error_details?: /* Error details for invalid custom variables. This error will appear under 'PARSE_ERROR' error code. */ InvalidCustomVariableErrorDetails | /* Error details for internal error. This error will appear under 'INTERNAL_ERROR' error code. */ InternalErrorDetails | /**
             * Error details for DocxTemplater error. This error will appear under 'PARSE_ERROR' error code.
             * See https://docxtemplater.com/docs/errors/#error-schema for more details.
             *
             */
            DocxTemplaterErrorDetails;
        }
        /**
         * Internal error detail
         */
        export interface InternalErrorDetail {
            /**
             * Name of the error
             */
            name?: string;
            /**
             * Error message
             */
            message?: string;
            /**
             * Stack trace
             */
            stack?: string;
            /**
             * Cause of the error
             */
            cause?: string;
        }
        /**
         * Error details for internal error. This error will appear under 'INTERNAL_ERROR' error code.
         */
        export type InternalErrorDetails = {
            items?: /* Internal error detail */ InternalErrorDetail;
        }[];
        export interface InvalidCustomVariableErrorDetail {
            [name: string]: any;
            /**
             * Explanation for the error
             */
            explanation?: string;
            /**
             * Context for the error
             */
            context?: {
                /**
                 * List of invalid variables
                 */
                invalid_variables?: {
                    /**
                     * Variable name
                     */
                    variable?: string;
                    /**
                     * Explanation for the error
                     */
                    error?: string;
                }[];
            };
        }
        /**
         * Error details for invalid custom variables. This error will appear under 'PARSE_ERROR' error code.
         */
        export type InvalidCustomVariableErrorDetails = InvalidCustomVariableErrorDetail[];
        export interface S3Reference {
            /**
             * example:
             * document-api-prod
             */
            bucket: string;
            /**
             * example:
             * uploads/my-template.pdf
             */
            key: string;
        }
        /**
         * Template Settings for document generation
         */
        export interface TemplateSettings {
            /**
             * Custom margins for the document
             */
            custom_margins?: {
                /**
                 * Top margin in cm
                 * example:
                 * 2.54
                 */
                top?: number;
                /**
                 * Bottom margin in cm
                 * example:
                 * 2.54
                 */
                bottom?: number;
            };
            /**
             * Suggested margins for the document
             */
            suggested_margins?: {
                /**
                 * Top margin in cm
                 * example:
                 * 2.54
                 */
                top?: number;
                /**
                 * Bottom margin in cm
                 * example:
                 * 2.54
                 */
                bottom?: number;
            };
            /**
             * Display margin guidelines (applicable to partial generation only)
             * example:
             * true
             */
            display_margin_guidelines?: boolean;
            /**
             * Enable data table margin autofix
             * example:
             * false
             */
            enable_data_table_margin_autofix?: boolean;
            /**
             * A flag that indicates whether the template has 1 or more data tables in it
             * example:
             * false
             */
            template_with_datatable?: boolean;
            /**
             * Enables the persistance of template settings
             * example:
             * false
             */
            enabled_template_settings_persistence?: boolean;
            /**
             * An indication that the page margins are misconfigured
             * example:
             * false
             */
            misconfigured_margins?: boolean;
            /**
             * The file entity id, used when persisting a new template version with updated settings
             * example:
             * 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
             */
            file_entity_id?: string; // uuid
        }
    }
}
declare namespace Paths {
    namespace ConvertDocument {
        export type RequestBody = Components.Schemas.ConvertDocumentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ConvertDocumentResponse;
        }
    }
    namespace GenerateDocumentV2 {
        namespace Parameters {
            export type JobId = string;
            export type Mode = "partial_generation" | "full_generation";
            export type PreviewMode = "open" | "download";
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
            mode?: Parameters.Mode;
            preview_mode?: Parameters.PreviewMode;
        }
        export type RequestBody = Components.Schemas.DocumentGenerationV2Request;
        namespace Responses {
            export type $200 = Components.Schemas.DocumentGenerationV2Response;
        }
    }
    namespace GetTemplateMeta {
        export type RequestBody = Components.Schemas.DocumentMetaRequest;
        namespace Responses {
            export type $200 = Components.Schemas.DocumentMetaResponse;
            export type $400 = Components.Schemas.ErrorOutput;
            export type $403 = Components.Schemas.ErrorOutput;
            export type $415 = Components.Schemas.ErrorOutput;
        }
    }
}

export interface OperationMethods {
  /**
   * getTemplateMeta - getTemplateMeta
   * 
   * Get metadata for a document template
   * 
   * Supported input document types:
   * - .docx
   * 
   */
  'getTemplateMeta'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetTemplateMeta.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTemplateMeta.Responses.$200>
  /**
   * generateDocumentV2 - generateDocumentV2
   * 
   * Generates documents from templates with variables.
   * 
   * Supported document types as input:
   * - .docx
   * - .ics
   * 
   * Supported document types as output:
   * - .pdf
   * - .docx but limited to only text based variables
   * - .ics
   * 
   * Uses [Template Variable API](https://docs.epilot.io/api/template-variables) to replace variables in the input document.
   * 
   */
  'generateDocumentV2'(
    parameters?: Parameters<Paths.GenerateDocumentV2.QueryParameters> | null,
    data?: Paths.GenerateDocumentV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDocumentV2.Responses.$200>
  /**
   * convertDocument - convertDocument
   * 
   * Converts a document to a different format.
   * 
   * Supported input document types:
   * - .docx
   * 
   * Supported output document types:
   * - .pdf
   * 
   */
  'convertDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConvertDocument.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConvertDocument.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/documents:meta']: {
    /**
     * getTemplateMeta - getTemplateMeta
     * 
     * Get metadata for a document template
     * 
     * Supported input document types:
     * - .docx
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetTemplateMeta.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTemplateMeta.Responses.$200>
  }
  ['/v2/documents:generate']: {
    /**
     * generateDocumentV2 - generateDocumentV2
     * 
     * Generates documents from templates with variables.
     * 
     * Supported document types as input:
     * - .docx
     * - .ics
     * 
     * Supported document types as output:
     * - .pdf
     * - .docx but limited to only text based variables
     * - .ics
     * 
     * Uses [Template Variable API](https://docs.epilot.io/api/template-variables) to replace variables in the input document.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GenerateDocumentV2.QueryParameters> | null,
      data?: Paths.GenerateDocumentV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDocumentV2.Responses.$200>
  }
  ['/v2/documents:convert']: {
    /**
     * convertDocument - convertDocument
     * 
     * Converts a document to a different format.
     * 
     * Supported input document types:
     * - .docx
     * 
     * Supported output document types:
     * - .pdf
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConvertDocument.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConvertDocument.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ConvertDocumentRequest = Components.Schemas.ConvertDocumentRequest;
export type ConvertDocumentResponse = Components.Schemas.ConvertDocumentResponse;
export type DocumentGenerationV2Request = Components.Schemas.DocumentGenerationV2Request;
export type DocumentGenerationV2Response = Components.Schemas.DocumentGenerationV2Response;
export type DocumentMetaRequest = Components.Schemas.DocumentMetaRequest;
export type DocumentMetaResponse = Components.Schemas.DocumentMetaResponse;
export type DocxTemplaterErrorDetail = Components.Schemas.DocxTemplaterErrorDetail;
export type DocxTemplaterErrorDetails = Components.Schemas.DocxTemplaterErrorDetails;
export type ErrorCode = Components.Schemas.ErrorCode;
export type ErrorOutput = Components.Schemas.ErrorOutput;
export type InternalErrorDetail = Components.Schemas.InternalErrorDetail;
export type InternalErrorDetails = Components.Schemas.InternalErrorDetails;
export type InvalidCustomVariableErrorDetail = Components.Schemas.InvalidCustomVariableErrorDetail;
export type InvalidCustomVariableErrorDetails = Components.Schemas.InvalidCustomVariableErrorDetails;
export type S3Reference = Components.Schemas.S3Reference;
export type TemplateSettings = Components.Schemas.TemplateSettings;
