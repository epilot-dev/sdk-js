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
        export interface DocumentGenerationV2Request {
            /**
             * Language to use for variables
             */
            language?: string;
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
             * Custom values for variables in the template. Takes the higher precedence than others.
             */
            variable_payload?: {
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
        export type DocxTemplaterErrorDetails = [
            /* DocxTemplater error detail */ DocxTemplaterErrorDetail?,
            ...any[]
        ];
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
            items?: any;
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
        export type InvalidCustomVariableErrorDetails = [
            InvalidCustomVariableErrorDetail?,
            ...any[]
        ];
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
    namespace GenerateDocument {
        export interface RequestBody {
            /**
             * Language to use
             * example:
             * de
             */
            language?: string;
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
                s3ref?: Components.Schemas.S3Reference;
            };
            /**
             * Entity to use for variable context
             * example:
             * bcd0aab9-b544-42b0-8bfb-6d449d02eacc
             */
            context_entity_id?: string;
            /**
             * User Id for variable context
             * example:
             * 100321
             */
            user_id?: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Pre-signed S3 GET URL for preview
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
                     * Generated document filename
                     * example:
                     * my-template-OR-001.pdf
                     */
                    filename?: string;
                    s3ref?: Components.Schemas.S3Reference;
                };
            }
        }
    }
    namespace GenerateDocumentV2 {
        namespace Parameters {
            export type JobId = string;
            export type Mode = "partial_generation" | "full_generation";
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
            mode?: Parameters.Mode;
        }
        export type RequestBody = Components.Schemas.DocumentGenerationV2Request;
        namespace Responses {
            export type $200 = Components.Schemas.DocumentGenerationV2Response;
        }
    }
}

export interface OperationMethods {
  /**
   * generateDocument - generateDocument
   * 
   * Builds document generated from input document with variables.
   * 
   * Supported input document types:
   * - .docx
   * 
   * Supported output document types:
   * - .pdf
   * 
   * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
   * 
   */
  'generateDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GenerateDocument.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDocument.Responses.$200>
  /**
   * generateDocumentV2 - generateDocumentV2
   * 
   * Builds document generated from input document with variables.
   * 
   * Supported input document types:
   * - .docx
   * 
   * Supported output document types:
   * - .pdf
   * - .docx but limited to only text based variables
   * 
   * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
   * 
   */
  'generateDocumentV2'(
    parameters?: Parameters<Paths.GenerateDocumentV2.QueryParameters> | null,
    data?: Paths.GenerateDocumentV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDocumentV2.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/documents:generate']: {
    /**
     * generateDocument - generateDocument
     * 
     * Builds document generated from input document with variables.
     * 
     * Supported input document types:
     * - .docx
     * 
     * Supported output document types:
     * - .pdf
     * 
     * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GenerateDocument.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDocument.Responses.$200>
  }
  ['/v2/documents:generate']: {
    /**
     * generateDocumentV2 - generateDocumentV2
     * 
     * Builds document generated from input document with variables.
     * 
     * Supported input document types:
     * - .docx
     * 
     * Supported output document types:
     * - .pdf
     * - .docx but limited to only text based variables
     * 
     * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GenerateDocumentV2.QueryParameters> | null,
      data?: Paths.GenerateDocumentV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDocumentV2.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
