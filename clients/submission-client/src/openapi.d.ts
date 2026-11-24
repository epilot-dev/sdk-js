import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequestResponse = Schemas.ErrorResponse;
        export type ForbiddenResponse = Schemas.ErrorResponse;
        export type InternalServerErrorResponse = Schemas.ErrorResponse;
        export type NotFoundResponse = Schemas.ErrorResponse;
        export type UnauthorizedResponse = Schemas.ErrorResponse;
    }
    namespace Schemas {
        export interface ErrorResponse {
            /**
             * HTTP status code
             * example:
             * 400
             */
            status?: number;
            /**
             * Short error label
             * example:
             * Bad Request
             */
            error?: string;
            /**
             * Human-readable description of the error
             */
            message?: string;
        }
        /**
         * Set by the journey app when the submission was recorded offline and replayed later.
         * The known keys are typed; unknown keys are accepted (newer app versions may add more).
         *
         */
        export type JourneyContextOffline = {
            [name: string]: any;
            queued_at?: string; // date-time
            synced_at?: string; // date-time
            device_id?: string;
            pack_revision_id?: string;
            pack_published_revision_id?: string;
        } | null;
        /**
         * A consent opt-in record captured during the submission
         */
        export interface OptIn {
            /**
             * The consent topic (e.g. `EMAIL_MARKETING`, `SMS_MARKETING`)
             * example:
             * EMAIL_MARKETING
             */
            topic?: string;
            /**
             * The identifier for the consent record (typically the customer's email address)
             * example:
             * jane.doe@example.com
             */
            identifier?: string;
            /**
             * Additional metadata about the opt-in (e.g. source, timestamp)
             */
            meta?: {
                [name: string]: any;
            };
        }
        /**
         * An S3 object reference returned by the epilot File API after a successful upload
         */
        export interface S3Reference {
            /**
             * S3 bucket name
             * example:
             * epilot-user-content
             */
            bucket: string;
            /**
             * S3 object key path
             * example:
             * temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            key: string;
        }
        export interface SubmissionDuplicateResponse {
            duplicate: true;
            /**
             * Id of the submission entity created by the first request, when already known.
             */
            submission_id?: string;
        }
        /**
         * An epilot entity to create as part of the submission
         * example:
         * {
         *   "_schema": "submission",
         *   "description": "Customer enquiry about EV charging",
         *   "contact_first_name": "Jane",
         *   "contact_last_name": "Doe",
         *   "contact_email": "jane.doe@example.com",
         *   "request": "I would like to know more about home EV charging options",
         *   "files": [
         *     {
         *       "s3ref": {
         *         "bucket": "epilot-user-content",
         *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
         *       },
         *       "filename": "document.pdf"
         *     }
         *   ]
         * }
         */
        export interface SubmissionEntity {
            [name: string]: any;
            /**
             * The entity schema type. Must be `submission` for standard Journey submissions.
             */
            _schema: "submission";
            /**
             * Human-readable description of the submission, used as the entity title
             */
            description?: string;
            /**
             * Runtime context the journey app attaches to the entity. Documented keys are listed below;
             * any other key is accepted and stored as sent.
             *
             */
            journey_context?: {
                [name: string]: any;
                /**
                 * The journey revision the submission was produced with (usually a string; any value is accepted).
                 */
                journey_revision_id?: any;
                offline?: /**
                 * Set by the journey app when the submission was recorded offline and replayed later.
                 * The known keys are typed; unknown keys are accepted (newer app versions may add more).
                 *
                 */
                JourneyContextOffline;
            } | null;
            /**
             * Files to attach to the Submission entity as relations. Each file must be an S3 reference
             * previously obtained from the epilot File API upload flow.
             *
             */
            files?: {
                [name: string]: any;
                s3ref: /* An S3 object reference returned by the epilot File API after a successful upload */ S3Reference;
                /**
                 * Override the file name displayed in epilot
                 */
                filename?: string;
                /**
                 * Tags to apply to the created File entity
                 */
                _tags?: string[];
                /**
                 * Relation labels for the file attachment (e.g. `signed_document`)
                 */
                relation_tags?: string[];
            }[];
        }
        export interface SubmissionNonce {
            /**
             * The nonce token
             * example:
             * nonce-a1b2c3d4e5f6
             */
            nonce: string;
            /**
             * ID of the submission that consumed this nonce
             * example:
             * 7f3c2a1b-4d5e-6f7a-8b9c-0d1e2f3a4b5c
             */
            submission_id: string;
            /**
             * The organization ID associated with this nonce
             * example:
             * 123
             */
            organization_id: string;
            /**
             * Unix timestamp (seconds) when the nonce expires
             * example:
             * 1700000000
             */
            ttl?: number;
        }
        export interface SubmissionNonceCheckResult {
            /**
             * Whether the nonce has already been consumed
             * example:
             * true
             */
            exists: boolean;
            /**
             * The nonce token (only set when it exists)
             * example:
             * nonce-a1b2c3d4e5f6
             */
            nonce?: string;
        }
        /**
         * Holds content and meta information for a Journey submission
         */
        export interface SubmissionPayload {
            /**
             * Target organization ID – defaults to the token's organization when omitted
             * example:
             * 123
             */
            organization_id?: string;
            /**
             * Client-generated idempotency key (uuid v4), one per submission attempt. When idempotency is
             * enabled for the organization, a repeated POST with the same id returns 200 `duplicate: true`
             * instead of creating a second submission (503 with `Retry-After` while the first request is
             * still starting).
             *
             * example:
             * 5b0d3c1e-6a3e-4d2c-9d7e-0f1a2b3c4d5e
             */
            journey_submit_id?: string;
            /**
             * Type of source that generated the submission (e.g. `journey`, `frontend`)
             * example:
             * journey
             */
            source_type: string;
            /**
             * Identifier for the source, e.g. the Journey ID or frontend component ID
             * example:
             * ce99875f-fba9-4fe2-a8f9-afaf52059051
             */
            source_id: string;
            /**
             * Opt-in consent records to create alongside this submission (e.g. email marketing consent)
             *
             */
            opt_ins?: [
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?,
                /* A consent opt-in record captured during the submission */ OptIn?
            ];
            /**
             * One or more epilot entities to create from this submission. Must contain at least one entry.
             *
             */
            entities: [
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?,
                /**
                 * An epilot entity to create as part of the submission
                 * example:
                 * {
                 *   "_schema": "submission",
                 *   "description": "Customer enquiry about EV charging",
                 *   "contact_first_name": "Jane",
                 *   "contact_last_name": "Doe",
                 *   "contact_email": "jane.doe@example.com",
                 *   "request": "I would like to know more about home EV charging options",
                 *   "files": [
                 *     {
                 *       "s3ref": {
                 *         "bucket": "epilot-user-content",
                 *         "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 *       },
                 *       "filename": "document.pdf"
                 *     }
                 *   ]
                 * }
                 */
                SubmissionEntity?
            ];
            /**
             * Related Ivy Opportunity IDs (deprecated – do not use for new integrations)
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
        export type RequestBody = /* Holds content and meta information for a Journey submission */ Components.Schemas.SubmissionPayload;
        namespace Responses {
            export type $200 = Components.Schemas.SubmissionDuplicateResponse;
            export interface $201 {
                /**
                 * The ID of the created submission entity
                 * example:
                 * 7f3c2a1b-4d5e-6f7a-8b9c-0d1e2f3a4b5c
                 */
                submission_id?: string;
            }
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $403 = Components.Responses.ForbiddenResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetNonce {
        namespace Parameters {
            export type NonceId = string;
        }
        export interface PathParameters {
            nonce_id: Parameters.NonceId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SubmissionNonceCheckResult;
            export type $400 = Components.Responses.BadRequestResponse;
            export type $401 = Components.Responses.UnauthorizedResponse;
            export type $404 = Components.Responses.NotFoundResponse;
            export type $500 = Components.Responses.InternalServerErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * createSubmission - createSubmission
   * 
   * Creates a submission from a public-facing Journey or other external source.
   * 
   * **Access:**
   * - Public Journeys and non-journey sources accept anonymous requests or public Journey tokens (by design). A token bound to a Journey (`journey_id` claim) may only submit to that Journey (`source_id`).
   * - Private Journeys require a user or portal-user token (public Journey tokens are rejected). Tokens of the Journey's owner organization are accepted; tokens of other organizations (e.g. sharing partners) must be able to access the Journey via journey-api (`entity:view` on the shared journey).
   * - Journey submissions always land in the Journey's owner organization.
   * 
   * The API processes the payload, creates the specified entities in epilot, resolves file attachments from the File API S3 references, and records any opt-in consent entries.
   * 
   * **Idempotency:** Use the `journey_submit_id` field as a client-side idempotency key to avoid duplicate submissions on retries
   * (enforced when idempotency is enabled for the organization).
   * 
   */
  'createSubmission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSubmission.Responses.$200 | Paths.CreateSubmission.Responses.$201>
  /**
   * getNonce - getNonce
   * 
   * Check whether a submission nonce has already been consumed (i.e. exists in storage).
   * 
   * Nonces are single-use tokens attached to Journey submissions to prevent duplicate processing. Before re-submitting, clients can call this endpoint to verify whether a previous submission with the same nonce was already recorded.
   * 
   * This endpoint is public (no authorization), so it only answers whether the nonce was used. It does not return the submission or organization the nonce belongs to.
   * 
   */
  'getNonce'(
    parameters?: Parameters<Paths.GetNonce.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNonce.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/submission/submissions']: {
    /**
     * createSubmission - createSubmission
     * 
     * Creates a submission from a public-facing Journey or other external source.
     * 
     * **Access:**
     * - Public Journeys and non-journey sources accept anonymous requests or public Journey tokens (by design). A token bound to a Journey (`journey_id` claim) may only submit to that Journey (`source_id`).
     * - Private Journeys require a user or portal-user token (public Journey tokens are rejected). Tokens of the Journey's owner organization are accepted; tokens of other organizations (e.g. sharing partners) must be able to access the Journey via journey-api (`entity:view` on the shared journey).
     * - Journey submissions always land in the Journey's owner organization.
     * 
     * The API processes the payload, creates the specified entities in epilot, resolves file attachments from the File API S3 references, and records any opt-in consent entries.
     * 
     * **Idempotency:** Use the `journey_submit_id` field as a client-side idempotency key to avoid duplicate submissions on retries
     * (enforced when idempotency is enabled for the organization).
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSubmission.Responses.$200 | Paths.CreateSubmission.Responses.$201>
  }
  ['/v1/submission/nonce/{nonce_id}']: {
    /**
     * getNonce - getNonce
     * 
     * Check whether a submission nonce has already been consumed (i.e. exists in storage).
     * 
     * Nonces are single-use tokens attached to Journey submissions to prevent duplicate processing. Before re-submitting, clients can call this endpoint to verify whether a previous submission with the same nonce was already recorded.
     * 
     * This endpoint is public (no authorization), so it only answers whether the nonce was used. It does not return the submission or organization the nonce belongs to.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetNonce.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNonce.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ErrorResponse = Components.Schemas.ErrorResponse;
export type JourneyContextOffline = Components.Schemas.JourneyContextOffline;
export type OptIn = Components.Schemas.OptIn;
export type S3Reference = Components.Schemas.S3Reference;
export type SubmissionDuplicateResponse = Components.Schemas.SubmissionDuplicateResponse;
export type SubmissionEntity = Components.Schemas.SubmissionEntity;
export type SubmissionNonce = Components.Schemas.SubmissionNonce;
export type SubmissionNonceCheckResult = Components.Schemas.SubmissionNonceCheckResult;
export type SubmissionPayload = Components.Schemas.SubmissionPayload;
