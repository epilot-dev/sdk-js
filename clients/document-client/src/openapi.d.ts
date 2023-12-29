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
        export interface ErrorOutput {
            /**
             * Error message
             */
            error_message?: string;
            /**
             * Error code
             */
            error_code?: "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR";
            /**
             * Error details
             */
            error_details?: {
                [name: string]: any;
            }[];
        }
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
                /**
                 * Left margin in cm
                 * example:
                 * 1.27
                 */
                left?: number;
                /**
                 * Right margin in cm
                 * example:
                 * 1.27
                 */
                right?: number;
            };
            /**
             * Display margin guidelines
             * example:
             * true
             */
            display_margin_guidelines?: boolean;
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
        export interface RequestBody {
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
            /**
             * Custom values for variables in the template. Takes the higher precedence than others.
             */
            variable_payload?: {
                additionalProperties?: string;
            };
            template_settings?: /* Template Settings for document generation */ Components.Schemas.TemplateSettings;
        }
        namespace Responses {
            export interface $200 {
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
                        s3ref?: Components.Schemas.S3Reference;
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
                        s3ref?: Components.Schemas.S3Reference;
                    };
                };
                error_output?: Components.Schemas.ErrorOutput;
                /**
                 * List of variables and its corresponding replaced values from the document template
                 */
                variable_payload?: {
                    additionalProperties?: string;
                };
            }
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
