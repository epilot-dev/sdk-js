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
        export type RecipientIdPathParam = /**
         * example:
         * b8c01433-5556-4e2b-aad4-6f5348d1df84
         */
        Schemas.BaseUUID /* uuid */;
    }
    export interface PathParameters {
        CampaignIdPathParam?: Parameters.CampaignIdPathParam;
        RecipientIdPathParam?: Parameters.RecipientIdPathParam;
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
        export type RecipientResponse = Schemas.Recipient;
        export interface RecipientsResponse {
            results?: Schemas.Recipient[];
            /**
             * Cursor for next page of results
             */
            next?: string | null;
            /**
             * Total number of recipients
             */
            total?: number;
        }
        export interface RetriggerAutomationsResponse {
            /**
             * A confirmation message indicating the request was received and processed
             */
            message: string;
            /**
             * List of retriggering results
             */
            results: Schemas.RetriggerAutomationsResult[];
        }
        export type ServerErrorResponse = Schemas.ServerError;
    }
    namespace Schemas {
        export interface AutomationRecipientPayload {
            automation_status: AutomationStatus;
            automation_execution_id: string;
        }
        export type AutomationStatus = "pending" | "in_progress" | "success" | "failed" | "cancelled";
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
        export interface BaseRecipientPayload {
            entity_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            entity_schema: string;
        }
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
        export type CampaignStatus = "draft" | "activating" | "active" | "inactive";
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
        export type CreateRecipientPayload = {
            entity_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            entity_schema: string;
            automation_status: AutomationStatus;
            automation_execution_id: string;
        } | {
            entity_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            entity_schema: string;
            portal_status: PortalStatus;
            portal_state?: {
                [name: string]: any;
            };
        } | {
            entity_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            entity_schema: string;
            automation_status: AutomationStatus;
            automation_execution_id: string;
            portal_status: PortalStatus;
            portal_state?: {
                [name: string]: any;
            };
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
        export interface PortalRecipientPayload {
            portal_status: PortalStatus;
            portal_state?: {
                [name: string]: any;
            };
        }
        export type PortalStatus = "delivered" | "seen" | "accepted" | "dismissed";
        export interface Recipient {
            entity_id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            entity_schema?: string;
            title?: string;
            automation_status?: AutomationStatus;
            automation_execution_id?: string;
            portal_status?: PortalStatus;
            portal_status_updated_at?: string; // date-time
            portal_state?: {
                [name: string]: any;
            };
            updated_at?: string; // date-time
        }
        export interface RetriggerAutomationsRequest {
            /**
             * List of recipient IDs to retrigger automations for
             */
            recipient_ids: string /* uuid */[];
        }
        export interface RetriggerAutomationsResult {
            /**
             * The ID of the recipient
             */
            recipient_id: string; // uuid
            /**
             * The result of the retriggering operation
             */
            result: "success" | "failure" | "not_found" | "invalid_status";
            /**
             * The ID of the new automation execution (if successful)
             */
            execution_id?: string;
            /**
             * The error message if the operation failed
             */
            error?: string;
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
        export interface UpdatePortalStatusRequest {
            status: PortalStatus;
        }
        export interface UpdateRecipientPayload {
            automation_status?: AutomationStatus;
            automation_execution_id?: string;
            portal_status?: PortalStatus;
            portal_state?: {
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
    namespace CreateRecipient {
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
        export type RequestBody = Components.Schemas.CreateRecipientPayload;
        namespace Responses {
            export type $201 = Components.Responses.RecipientResponse;
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
    namespace GetRecipients {
        namespace Parameters {
            export type AutomationStatus = Components.Schemas.AutomationStatus;
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
            export type Limit = number;
            export type Next = string;
            export type PortalStatus = Components.Schemas.PortalStatus;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            next?: Parameters.Next;
            automation_status?: Parameters.AutomationStatus;
            portal_status?: Parameters.PortalStatus;
        }
        namespace Responses {
            export type $200 = Components.Responses.RecipientsResponse;
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
    namespace RetriggerCampaignAutomations {
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
        export type RequestBody = Components.Schemas.RetriggerAutomationsRequest;
        namespace Responses {
            export type $200 = Components.Responses.RetriggerAutomationsResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $404 = Components.Responses.ServerErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace UpdateRecipient {
        namespace Parameters {
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
            export type RecipientId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
            recipient_id: Parameters.RecipientId;
        }
        export type RequestBody = Components.Schemas.UpdateRecipientPayload;
        namespace Responses {
            export type $200 = Components.Responses.RecipientResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace UpdateRecipientPortalStatus {
        namespace Parameters {
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
            export type RecipientId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
            recipient_id: Parameters.RecipientId;
        }
        export type RequestBody = Components.Schemas.UpdatePortalStatusRequest;
        namespace Responses {
            export type $200 = Components.Responses.RecipientResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $404 = Components.Responses.ClientErrorResponse;
            export type $409 = Components.Responses.ClientErrorResponse;
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
   * retriggerCampaignAutomations - Retrigger automations for campaign recipients
   * 
   * Retrigger automation executions for specific campaign recipients that have failed.
   * 
   * This endpoint starts new automation executions for the specified recipients
   * using the campaign's associated automation flow. Only recipients with
   * automation_status 'failed' will be processed. Recipients with other statuses
   * (success, pending, in_progress, cancelled) will be skipped to prevent
   * accidentally retriggering successful or ongoing automations.
   * 
   */
  'retriggerCampaignAutomations'(
    parameters?: Parameters<Paths.RetriggerCampaignAutomations.PathParameters> | null,
    data?: Paths.RetriggerCampaignAutomations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetriggerCampaignAutomations.Responses.$200>
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
  /**
   * createRecipient - Create a recipient associated with a campaign
   * 
   * Creates a new recipient associated with a campaign.
   */
  'createRecipient'(
    parameters?: Parameters<Paths.CreateRecipient.PathParameters> | null,
    data?: Paths.CreateRecipient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateRecipient.Responses.$201>
  /**
   * updateRecipient - Update a recipient
   * 
   * Updates a recipient's attributes.
   */
  'updateRecipient'(
    parameters?: Parameters<Paths.UpdateRecipient.PathParameters> | null,
    data?: Paths.UpdateRecipient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRecipient.Responses.$200>
  /**
   * updateRecipientPortalStatus - Update portal status for a campaign recipient
   * 
   * Updates the portal status for a specific campaign recipient.
   * The portal_status_updated_at timestamp is automatically set when the status changes.
   * 
   * Status transition rules:
   * - From 'delivered': can change to 'seen', 'accepted', or 'dismissed'
   * - From 'seen': can change to 'accepted' or 'dismissed'
   * - From 'accepted' or 'dismissed': cannot be changed (final states)
   * 
   */
  'updateRecipientPortalStatus'(
    parameters?: Parameters<Paths.UpdateRecipientPortalStatus.PathParameters> | null,
    data?: Paths.UpdateRecipientPortalStatus.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRecipientPortalStatus.Responses.$200>
  /**
   * getRecipients - Get campaign recipients
   * 
   * Get a paginated list of recipients for a campaign.
   */
  'getRecipients'(
    parameters?: Parameters<Paths.GetRecipients.QueryParameters & Paths.GetRecipients.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRecipients.Responses.$200>
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
  ['/v1/campaign/{campaign_id}/automations:retrigger']: {
    /**
     * retriggerCampaignAutomations - Retrigger automations for campaign recipients
     * 
     * Retrigger automation executions for specific campaign recipients that have failed.
     * 
     * This endpoint starts new automation executions for the specified recipients
     * using the campaign's associated automation flow. Only recipients with
     * automation_status 'failed' will be processed. Recipients with other statuses
     * (success, pending, in_progress, cancelled) will be skipped to prevent
     * accidentally retriggering successful or ongoing automations.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RetriggerCampaignAutomations.PathParameters> | null,
      data?: Paths.RetriggerCampaignAutomations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetriggerCampaignAutomations.Responses.$200>
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
  ['/v1/campaign/{campaign_id}/recipient']: {
    /**
     * createRecipient - Create a recipient associated with a campaign
     * 
     * Creates a new recipient associated with a campaign.
     */
    'post'(
      parameters?: Parameters<Paths.CreateRecipient.PathParameters> | null,
      data?: Paths.CreateRecipient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateRecipient.Responses.$201>
  }
  ['/v1/campaign/{campaign_id}/recipient/{recipient_id}']: {
    /**
     * updateRecipient - Update a recipient
     * 
     * Updates a recipient's attributes.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateRecipient.PathParameters> | null,
      data?: Paths.UpdateRecipient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRecipient.Responses.$200>
  }
  ['/v1/campaign/{campaign_id}/recipient/{recipient_id}/portal:status']: {
    /**
     * updateRecipientPortalStatus - Update portal status for a campaign recipient
     * 
     * Updates the portal status for a specific campaign recipient.
     * The portal_status_updated_at timestamp is automatically set when the status changes.
     * 
     * Status transition rules:
     * - From 'delivered': can change to 'seen', 'accepted', or 'dismissed'
     * - From 'seen': can change to 'accepted' or 'dismissed'
     * - From 'accepted' or 'dismissed': cannot be changed (final states)
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateRecipientPortalStatus.PathParameters> | null,
      data?: Paths.UpdateRecipientPortalStatus.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRecipientPortalStatus.Responses.$200>
  }
  ['/v1/campaign/{campaign_id}/recipients']: {
    /**
     * getRecipients - Get campaign recipients
     * 
     * Get a paginated list of recipients for a campaign.
     */
    'get'(
      parameters?: Parameters<Paths.GetRecipients.QueryParameters & Paths.GetRecipients.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRecipients.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AutomationRecipientPayload = Components.Schemas.AutomationRecipientPayload;
export type AutomationStatus = Components.Schemas.AutomationStatus;
export type BaseEntityAcl = Components.Schemas.BaseEntityAcl;
export type BaseEntityOwner = Components.Schemas.BaseEntityOwner;
export type BaseError = Components.Schemas.BaseError;
export type BaseNanoID = Components.Schemas.BaseNanoID;
export type BaseRecipientPayload = Components.Schemas.BaseRecipientPayload;
export type BaseRelation = Components.Schemas.BaseRelation;
export type BaseSystemFields = Components.Schemas.BaseSystemFields;
export type BaseSystemFieldsRequired = Components.Schemas.BaseSystemFieldsRequired;
export type BaseSystemId = Components.Schemas.BaseSystemId;
export type BaseTags = Components.Schemas.BaseTags;
export type BaseUUID = Components.Schemas.BaseUUID;
export type Campaign = Components.Schemas.Campaign;
export type CampaignStatus = Components.Schemas.CampaignStatus;
export type ClientError = Components.Schemas.ClientError;
export type CreateRecipientPayload = Components.Schemas.CreateRecipientPayload;
export type ExecutionSummaryItem = Components.Schemas.ExecutionSummaryItem;
export type JobStatus = Components.Schemas.JobStatus;
export type MatchCampaignParams = Components.Schemas.MatchCampaignParams;
export type MatchTargetParams = Components.Schemas.MatchTargetParams;
export type PortalRecipientPayload = Components.Schemas.PortalRecipientPayload;
export type PortalStatus = Components.Schemas.PortalStatus;
export type Recipient = Components.Schemas.Recipient;
export type RetriggerAutomationsRequest = Components.Schemas.RetriggerAutomationsRequest;
export type RetriggerAutomationsResult = Components.Schemas.RetriggerAutomationsResult;
export type ServerError = Components.Schemas.ServerError;
export type Target = Components.Schemas.Target;
export type UpdatePortalStatusRequest = Components.Schemas.UpdatePortalStatusRequest;
export type UpdateRecipientPayload = Components.Schemas.UpdateRecipientPayload;
