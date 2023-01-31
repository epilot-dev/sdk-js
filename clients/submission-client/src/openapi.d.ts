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
        export interface OptIn {
            /**
             * example:
             * EMAIL_MARKETING
             */
            topic?: string;
            /**
             * Consent identifier
             * example:
             * example@email.com
             */
            identifier?: string;
            meta?: {
                [name: string]: any;
            };
        }
        /**
         * S3 Reference from File API
         */
        export interface S3Reference {
            /**
             * example:
             * epilot-user-content
             */
            bucket: string;
            /**
             * example:
             * temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            key: string;
        }
        /**
         * The submission entity to create
         * example:
         * {
         *   "_schema": "submission",
         *   "description": "Submission created via API",
         *   "contact_first_name": "First",
         *   "contact_last_name": "Last",
         *   "contact_email": "example@submission.com",
         *   "request": "I would like to know more about electric vehicles",
         *   "files": [
         *     {
         *       "s3ref": {
         *         "bucket": "epilot-user-content",
         *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
         *       }
         *     }
         *   ]
         * }
         */
        export interface SubmissionEntity {
            [name: string]: any;
            _schema: "submission";
            /**
             * Readable description of the submission. Will be used as the title if passed
             */
            description?: string;
            /**
             * Files to attach to Submission Entity as a relation (s3refs from File API)
             *
             */
            files?: {
                s3ref: /* S3 Reference from File API */ S3Reference;
                /**
                 * Override the file name
                 */
                filename?: string;
                /**
                 * List of tags for File entities
                 */
                _tags?: string[];
                /**
                 * Like other entities, file includes _purpose
                 */
                _purpose?: string[];
                /**
                 * List of relation labels for File attachments
                 */
                relation_tags?: string[];
            }[];
        }
        /**
         * Holds content and meta information
         */
        export interface SubmissionPayload {
            /**
             * organization id
             * example:
             * 123
             */
            organization_id: string;
            /**
             * journey submit uid
             * example:
             * 123
             */
            journey_submit_id?: string;
            /**
             * type of source, e.g. journey or frontend
             * example:
             * journey
             */
            source_type: string;
            /**
             * identifier for source e.g. journey ID or frontend ID
             * example:
             * ce99875f-fba9-4fe2-a8f9-afaf52059051
             */
            source_id: string;
            /**
             * Opt-ins to create from submission
             *
             */
            opt_ins?: [
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?,
                OptIn?
            ];
            /**
             * Entities to create from submission
             *
             */
            entities: [
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * The submission entity to create
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Submission created via API",
                 *   "contact_first_name": "First",
                 *   "contact_last_name": "Last",
                 *   "contact_email": "example@submission.com",
                 *   "request": "I would like to know more about electric vehicles",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       }
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?
            ];
            /**
             * Related Ivy Opportunity Ids
             */
            _ivy_opportunity_ids?: [
                string,
                ...string[]
            ];
        }
    }
}
declare namespace Paths {
    namespace CreateSubmission {
        export type RequestBody = /* Holds content and meta information */ Components.Schemas.SubmissionPayload;
        namespace Responses {
            export interface $201 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * createSubmission - createSubmission
   * 
   * Creates a submission from a public facing Journey
   * 
   */
  'createSubmission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSubmission.Responses.$201>
}

export interface PathsDictionary {
  ['/v1/submission/submissions']: {
    /**
     * createSubmission - createSubmission
     * 
     * Creates a submission from a public facing Journey
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSubmission.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
