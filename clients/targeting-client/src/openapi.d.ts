/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type CampaignIdPathParam = /**
         * example:
         * b8c01433-5556-4e2b-aad4-6f5348d1df84
         */
        Schemas.BaseUUID /* uuid */;
    }
    export interface PathParameters {
        CampaignIdPathParam?: Parameters.CampaignIdPathParam;
    }
    namespace Responses {
        export type CampaignPortalsResponse = {
            portal: {
                /**
                 * The origin of the portal
                 */
                origin?: string;
                /**
                 * The domain of the portal
                 */
                domain?: string;
                /**
                 * The name of the portal
                 */
                name?: string;
            };
            widgets: {
                /**
                 * The ID of the widget
                 */
                id: string;
                headline?: {
                    /**
                     * The headline in English
                     */
                    en?: string;
                    /**
                     * The headline in German
                     */
                    de?: string;
                };
            }[];
        }[];
        export interface CampaignResponse {
            campaign?: Schemas.Campaign;
        }
        export type ClientErrorResponse = /**
         * Describes the structure of a client error response, which can be one of several types:
         * 1. `MessageError`: Contains a 'message' field for general descriptive errors.
         * 2. `CodeError`: Contains a 'code' field for specific, machine-readable error codes.
         * 3. `StatusedError`: Contains 'error' and 'status' fields.
         * The HTTP status code of the response itself (e.g., 400, 404, 409) will always indicate the overall error category.
         *
         */
        Schemas.ClientError;
        export type JobStatusResponse = Schemas.JobStatus;
        export interface MatchCampaignsResponse {
            /**
             * Number of matching campaigns.
             */
            hits?: number;
            /**
             * List of matching campaigns.
             */
            results?: {
                campaign: Schemas.Campaign;
            }[];
        }
        export interface MatchTargetsResponse {
            /**
             * Number of matching targets.
             */
            hits?: number;
            /**
             * List of matching targets.
             */
            results?: {
                target: Schemas.Target;
            }[];
        }
        export type ServerErrorResponse = Schemas.ServerError;
    }
    namespace Schemas {
        /**
         * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
         */
        export interface BaseEntityAcl {
            [name: string]: any;
            view?: string[];
            edit?: string[];
            delete?: string[];
        }
        /**
         * The user / organization owning this entity.
         *
         * Note: Owner implicitly has access to the entity regardless of ACLs.
         *
         */
        export interface BaseEntityOwner {
            /**
             * example:
             * 123
             */
            org_id: string;
            /**
             * example:
             * 123
             */
            user_id?: string;
        }
        export interface BaseError {
            /**
             * example:
             * 404
             */
            status: number;
            /**
             * example:
             * Entity not found
             */
            message: string;
        }
        /**
         * example:
         * xHcOoJCa07eysJ1GaQeSb
         */
        export type BaseNanoID = string;
        export interface BaseRelation {
            $relation?: {
                entity_id?: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */;
                _tags?: BaseTags;
            }[];
        }
        export interface BaseSystemFields {
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            _schema?: string;
            _title?: string;
            _tags?: BaseTags;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
        }
        export interface BaseSystemFieldsRequired {
        }
        export interface BaseSystemId {
            _id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
        }
        export type BaseTags = string[] | null;
        /**
         * example:
         * b8c01433-5556-4e2b-aad4-6f5348d1df84
         */
        export type BaseUUID = string; // uuid
        export interface Campaign {
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            _schema?: string;
            _title?: string;
            _tags?: BaseTags;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
            id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            name?: string;
            goal?: string;
            status?: CampaignStatus;
            start_date?: string; // date
            end_date?: string; // date
            flow_id?: string;
            job_id?: string;
            target?: BaseRelation;
        }
        export type CampaignStatus = "draft" | "active" | "inactive";
        /**
         * Describes the structure of a client error response, which can be one of several types:
         * 1. `MessageError`: Contains a 'message' field for general descriptive errors.
         * 2. `CodeError`: Contains a 'code' field for specific, machine-readable error codes.
         * 3. `StatusedError`: Contains 'error' and 'status' fields.
         * The HTTP status code of the response itself (e.g., 400, 404, 409) will always indicate the overall error category.
         *
         */
        export type ClientError = /**
         * Describes the structure of a client error response, which can be one of several types:
         * 1. `MessageError`: Contains a 'message' field for general descriptive errors.
         * 2. `CodeError`: Contains a 'code' field for specific, machine-readable error codes.
         * 3. `StatusedError`: Contains 'error' and 'status' fields.
         * The HTTP status code of the response itself (e.g., 400, 404, 409) will always indicate the overall error category.
         *
         */
        {
            /**
             * A descriptive error message.
             * example:
             * The provided input was invalid.
             */
            message: string;
        } | {
            /**
             * A specific machine-readable error code indicating a known error condition.
             * example:
             * CAMPAIGN_NOT_FOUND
             */
            code: "CAMPAIGN_NOT_FOUND" | "CAMPAIGN_HAS_NO_TARGET" | "CAMPAIGN_HAS_NO_DELIVERY_METHOD" | "CAMPAIGN_HAS_JOB_IN_PROGRESS" | "CAMPAIGN_HAS_UNEXPECTED_STATUS" | "JOB_TOKEN_MISSING" | "TARGET_WITHOUT_FILTERS";
        } | {
            /**
             * A descriptive error message.
             * example:
             * An unexpected error occurred during processing.
             */
            error: string;
            /**
             * An explicit status code in the body, often mirroring the HTTP status but provided for programmatic access.
             * example:
             * 400
             */
            status: number;
        };
        export interface ExecutionSummaryItem {
            execution_id?: string;
            execution_status?: string;
        }
        export interface JobStatus {
            /**
             * The status of the automation job
             */
            status?: "queued" | "processing" | "finished" | "failed" | "cancelled" | "send_report";
            execution_summary?: ExecutionSummaryItem[];
        }
        export interface MatchCampaignParams {
            /**
             * List of entities (e.g. Contacts or Contracts) that should be part of the campaign target.
             */
            entity_refs: {
                entity_id: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */;
                entity_schema: string;
            }[];
            /**
             * List of campaign IDs to check.
             * example:
             * [
             *   "b8c01433-5556-4e2b-aad4-6f5348d1df84"
             * ]
             */
            campaign_ids: [
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?
            ];
        }
        export interface MatchTargetParams {
            /**
             * List of entities (e.g. Contacts or Contracts) that should be part of the targets.
             */
            entity_refs: {
                entity_id: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */;
                entity_schema: string;
            }[];
            /**
             * List of target IDs to check.
             * example:
             * [
             *   "b8c01433-5556-4e2b-aad4-6f5348d1df84"
             * ]
             */
            target_ids: [
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?,
                /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */?
            ];
        }
        export type ServerError = BaseError;
        export interface Target {
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            _schema?: string;
            _title?: string;
            _tags?: BaseTags;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
            id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            name?: string;
            description?: string;
            entity_schema?: string;
            entity_filters?: {
                [name: string]: any;
            };
        }
    }
}
declare namespace Paths {
    namespace ChangeCampaignStatus {
        namespace Parameters {
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
        }
        namespace Responses {
            export type $200 = Components.Responses.CampaignResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace GetCampaignJobStatus {
        namespace Parameters {
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
        }
        namespace Responses {
            export type $200 = Components.Responses.JobStatusResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace GetCampaignPortals {
        namespace Parameters {
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
        }
        namespace Responses {
            export type $200 = Components.Responses.CampaignPortalsResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace MatchCampaigns {
        export type RequestBody = Components.Schemas.MatchCampaignParams;
        namespace Responses {
            export type $200 = Components.Responses.MatchCampaignsResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace MatchTargets {
        export type RequestBody = Components.Schemas.MatchTargetParams;
        namespace Responses {
            export type $200 = Components.Responses.MatchTargetsResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
}

export interface OperationMethods {
  /**
   * changeCampaignStatus - Change the status of a campaign
   * 
   * Change the status of a campaign to a desired status.
   * 
   * The status can be one of the following: active, inactive.
   * 
   * Status transition is accompanied by side effects, e.g., automation execution.
   * 
   */
  'changeCampaignStatus'(
    parameters?: Parameters<Paths.ChangeCampaignStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeCampaignStatus.Responses.$200>
  /**
   * getCampaignJobStatus - Get the status of a campaign's automation job
   * 
   * Get the status of a campaign's automation job
   */
  'getCampaignJobStatus'(
    parameters?: Parameters<Paths.GetCampaignJobStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCampaignJobStatus.Responses.$200>
  /**
   * getCampaignPortals - Get portals usage info for a campaign
   * 
   * Get the list of portals and its widgets where the campaign is used.
   * 
   */
  'getCampaignPortals'(
    parameters?: Parameters<Paths.GetCampaignPortals.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCampaignPortals.Responses.$200>
  /**
   * matchCampaigns - Match campaigns
   * 
   * Match campaigns based on target entities.
   * 
   * This endpoint returns the list of campaigns where the provided entities are part of the target.
   * 
   */
  'matchCampaigns'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MatchCampaigns.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MatchCampaigns.Responses.$200>
  /**
   * matchTargets - Match targets
   * 
   * Find targets from the provided list that include the provide entities.
   * 
   */
  'matchTargets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MatchTargets.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MatchTargets.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/campaign/{campaign_id}/status']: {
    /**
     * changeCampaignStatus - Change the status of a campaign
     * 
     * Change the status of a campaign to a desired status.
     * 
     * The status can be one of the following: active, inactive.
     * 
     * Status transition is accompanied by side effects, e.g., automation execution.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ChangeCampaignStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeCampaignStatus.Responses.$200>
  }
  ['/v1/campaign/{campaign_id}/job']: {
    /**
     * getCampaignJobStatus - Get the status of a campaign's automation job
     * 
     * Get the status of a campaign's automation job
     */
    'get'(
      parameters?: Parameters<Paths.GetCampaignJobStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCampaignJobStatus.Responses.$200>
  }
  ['/v1/campaign/{campaign_id}/portals']: {
    /**
     * getCampaignPortals - Get portals usage info for a campaign
     * 
     * Get the list of portals and its widgets where the campaign is used.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetCampaignPortals.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCampaignPortals.Responses.$200>
  }
  ['/v1/campaign:match']: {
    /**
     * matchCampaigns - Match campaigns
     * 
     * Match campaigns based on target entities.
     * 
     * This endpoint returns the list of campaigns where the provided entities are part of the target.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MatchCampaigns.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MatchCampaigns.Responses.$200>
  }
  ['/v1/target:match']: {
    /**
     * matchTargets - Match targets
     * 
     * Find targets from the provided list that include the provide entities.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MatchTargets.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MatchTargets.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type BaseEntityAcl = Components.Schemas.BaseEntityAcl;
export type BaseEntityOwner = Components.Schemas.BaseEntityOwner;
export type BaseError = Components.Schemas.BaseError;
export type BaseNanoID = Components.Schemas.BaseNanoID;
export type BaseRelation = Components.Schemas.BaseRelation;
export type BaseSystemFields = Components.Schemas.BaseSystemFields;
export type BaseSystemFieldsRequired = Components.Schemas.BaseSystemFieldsRequired;
export type BaseSystemId = Components.Schemas.BaseSystemId;
export type BaseTags = Components.Schemas.BaseTags;
export type BaseUUID = Components.Schemas.BaseUUID;
export type Campaign = Components.Schemas.Campaign;
export type CampaignStatus = Components.Schemas.CampaignStatus;
export type ClientError = Components.Schemas.ClientError;
export type ExecutionSummaryItem = Components.Schemas.ExecutionSummaryItem;
export type JobStatus = Components.Schemas.JobStatus;
export type MatchCampaignParams = Components.Schemas.MatchCampaignParams;
export type MatchTargetParams = Components.Schemas.MatchTargetParams;
export type ServerError = Components.Schemas.ServerError;
export type Target = Components.Schemas.Target;
