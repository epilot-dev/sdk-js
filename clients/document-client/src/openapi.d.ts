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
             * Language
             * example:
             * de
             */
            language?: string;
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
             * de
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
            xlsx_output?: {
                /**
                 * Pre-signed S3 GET URL for XLSX preview
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.xlsx
                 */
                preview_url?: string;
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-template.xlsx"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for XLSX
                     * example:
                     * my-template-OR-001.xlsx
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
         * - TEMPLATE_NOT_FOUND - Template file was not found in S3. This indicates the template was likely deleted.
         *
         */
        export type ErrorCode = "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR" | "INVALID_TEMPLATE_FORMAT" | "TEMPLATE_NOT_FOUND";
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
             * - TEMPLATE_NOT_FOUND - Template file was not found in S3. This indicates the template was likely deleted.
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
         * A single template syntax problem, and the repair proposed for it
         */
        export interface TemplateIssue {
            /**
             * Problem kind. Reuses docxtemplater's error vocabulary where one exists
             * (`unopened_tag`, `unclosed_tag`, `duplicate_open_tag`, `duplicate_close_tag`), plus
             * `malformed_tag` for single-brace placeholders and `typographic_characters` for
             * editor-substituted characters inside an otherwise valid tag.
             *
             * example:
             * unopened_tag
             */
            id?: string;
            /**
             * Zip part the problem was found in
             * example:
             * xl/sharedStrings.xml
             */
            file?: string;
            /**
             * Where the user can find it — a cell reference for spreadsheets, a part label
             * (`Document body`, `Header 1`, `Slide 3`) otherwise.
             *
             * example:
             * Tabelle1!N4
             */
            location?: string;
            /**
             * The offending text with surrounding context
             * example:
             * …Datum: {system.date}} Unterschrift…
             */
            context?: string;
            /**
             * Why the template parser rejects it
             * example:
             * The tag is missing an opening brace.
             */
            explanation?: string;
            /**
             * Whether the proposed repair was applied to the fixed copy
             * example:
             * true
             */
            fixable?: boolean;
            /**
             * How sure we are that the repair is what the author meant
             */
            confidence?: "high" | "medium" | "low";
            /**
             * The repair rule that produced `after`
             * example:
             * balance_opening_delimiter
             */
            rule?: string;
            /**
             * The text as it is in the template
             * example:
             * {system.date}}
             */
            before?: string;
            /**
             * The text as it would be in the fixed copy
             * example:
             * {{system.date}}
             */
            after?: string;
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
             * 123e4567-e89b-12d3-a456-426614174000
             */
            file_entity_id?: string; // uuid
        }
        export interface TemplateValidationRequest {
            /**
             * Input template document
             */
            template_document: {
                /**
                 * Document original filename, used to name the fixed copy
                 * example:
                 * Umzugsmeldung.xlsx
                 */
                filename?: string;
                s3ref: S3Reference;
            };
            /**
             * Attempt to produce a hotfixed copy of the template. When false, the template is only
             * inspected and no file is written.
             *
             */
            fix?: boolean;
            /**
             * How far the hotfix may go:
             * - safe - only repairs where the author's intent is unambiguous from the syntax
             *   (unbalanced or duplicated braces, editor-substituted characters inside a tag).
             * - aggressive - additionally promotes single-brace placeholders such as `{contact.name}`
             *   to `{{contact.name}}`. These are common in customer templates but indistinguishable
             *   from prose that uses braces, so they are reported with `confidence: low`.
             *
             */
            fix_level?: "safe" | "aggressive";
        }
        export interface TemplateValidationResponse {
            /**
             * Whether the template compiled cleanly before any repair was attempted
             * example:
             * false
             */
            valid?: boolean;
            /**
             * Whether a corrected copy of the template could be produced
             * example:
             * true
             */
            fixed?: boolean;
            /**
             * Everything found in the template, whether or not it could be repaired
             */
            issues?: /* A single template syntax problem, and the repair proposed for it */ TemplateIssue[];
            /**
             * Parser errors that remain after the hotfix (or the original errors when nothing was
             * fixed). Empty when the template is valid.
             *
             */
            unresolved_errors?: /* DocxTemplater error detail */ DocxTemplaterErrorDetail[];
            /**
             * The corrected copy, for the user to review and accept. Absent when no repair was
             * applied. The original template is left untouched.
             *
             */
            fixed_document?: {
                s3ref?: S3Reference;
                /**
                 * example:
                 * Umzugsmeldung (fixed).xlsx
                 */
                filename?: string;
                /**
                 * Short-lived download link for the corrected copy
                 */
                preview_url?: string; // uri
            };
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
            /**
             * - partial_generation: Generates a partial document for user validation before final generation
             * - full_generation: Completes the entire document generation process in one step
             *
             */
            export type Mode = "partial_generation" | "full_generation";
            /**
             * - open: Preview URL opens the file directly in browser
             * - download: Preview URL triggers a download of the file
             *
             */
            export type PreviewMode = "open" | "download";
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
            mode?: /**
             * - partial_generation: Generates a partial document for user validation before final generation
             * - full_generation: Completes the entire document generation process in one step
             *
             */
            Parameters.Mode;
            preview_mode?: /**
             * - open: Preview URL opens the file directly in browser
             * - download: Preview URL triggers a download of the file
             *
             */
            Parameters.PreviewMode;
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
    namespace ValidateTemplate {
        export type RequestBody = Components.Schemas.TemplateValidationRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TemplateValidationResponse;
            export type $403 = Components.Schemas.ErrorOutput;
            export type $413 = Components.Schemas.ErrorOutput;
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
   * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the input document.
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
  /**
   * validateTemplate - validateTemplate
   * 
   * Validates a document template's variable syntax and, optionally, proposes a hotfixed copy of it.
   * 
   * The endpoint compiles the template with docxtemplater's core parser (the xlsx module for
   * spreadsheets), so a delimiter or tag error reported here is one generation would fail on.
   * Failures specific to the image or HTML modules are not covered. Every problem it can repair
   * unambiguously — a missing brace, an extra brace, a smart quote or a non-breaking space that
   * Word substituted inside a tag — is applied to a **copy** of the template, which is uploaded
   * and returned as `fixed_document`.
   * 
   * The original template is never modified. Accepting the fix is an explicit, separate step:
   * the caller shows the user `issues` (each with its `before`/`after`), lets them download
   * `fixed_document.preview_url`, and only then replaces the template.
   * 
   * Supported input document types:
   * - .docx, .docm, .dotx
   * - .xlsx, .xlsm
   * - .pptx
   * 
   */
  'validateTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ValidateTemplate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateTemplate.Responses.$200>
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
     * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the input document.
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
  ['/v2/templates:validate']: {
    /**
     * validateTemplate - validateTemplate
     * 
     * Validates a document template's variable syntax and, optionally, proposes a hotfixed copy of it.
     * 
     * The endpoint compiles the template with docxtemplater's core parser (the xlsx module for
     * spreadsheets), so a delimiter or tag error reported here is one generation would fail on.
     * Failures specific to the image or HTML modules are not covered. Every problem it can repair
     * unambiguously — a missing brace, an extra brace, a smart quote or a non-breaking space that
     * Word substituted inside a tag — is applied to a **copy** of the template, which is uploaded
     * and returned as `fixed_document`.
     * 
     * The original template is never modified. Accepting the fix is an explicit, separate step:
     * the caller shows the user `issues` (each with its `before`/`after`), lets them download
     * `fixed_document.preview_url`, and only then replaces the template.
     * 
     * Supported input document types:
     * - .docx, .docm, .dotx
     * - .xlsx, .xlsm
     * - .pptx
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ValidateTemplate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateTemplate.Responses.$200>
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
export type TemplateIssue = Components.Schemas.TemplateIssue;
export type TemplateSettings = Components.Schemas.TemplateSettings;
export type TemplateValidationRequest = Components.Schemas.TemplateValidationRequest;
export type TemplateValidationResponse = Components.Schemas.TemplateValidationResponse;
