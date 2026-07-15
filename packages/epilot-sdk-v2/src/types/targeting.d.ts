/* Auto-copied from targeting-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
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
        export interface DiscoverCampaignsResponse {
            /**
             * Number of matching NBAs.
             */
            hits: number;
            /**
             * Matching NBAs, sorted by priority (desc); one entry per campaign.
             */
            results: {
                campaign_id: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                Schemas.BaseUUID /* uuid */;
                nba: /**
                 * A Next Best Action configured on a campaign's Entity-UI channel.
                 * This is the canonical NBA contract shared by discovery (this API), authoring, and rendering.
                 * NBA content is single-language in v1; text fields may contain `{{placeholders}}` resolved at render time.
                 *
                 */
                Schemas.NextBestAction;
                /**
                 * The recipient's current Entity-UI status for this campaign, present only
                 * when a recipient record already exists (i.e. the entity has previously seen
                 * or clicked this NBA). Absent when the entity has not yet interacted with it.
                 * Dismissed NBAs are filtered out server-side, so this is only ever `seen` or
                 * `clicked`. Lets the client skip a redundant `seen` call for NBAs already seen.
                 *
                 */
                status?: "seen" | "dismissed" | "clicked";
            }[];
        }
        export interface GetTargetQueriesResponse {
            /**
             * List of target query results.
             */
            results: Schemas.TargetQueryResult[];
        }
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
        export type SetupCampaignResponse = Schemas.SetupTariffChangeCampaignResponse;
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
            _id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
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
            _id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
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
        export interface DiscoverCampaignsParams {
            entity_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            /**
             * The schema slug of the entity (e.g. "contact" or "account").
             */
            entity_schema: string;
        }
        /**
         * Lifecycle status of a Next Best Action on the Entity-UI channel. Unlike the portal
         * channel there is no `sent` state: an NBA recipient is born at `seen`, the moment the
         * action is first rendered to an agent.
         *
         */
        export type EntityUiStatus = "seen" | "dismissed" | "clicked";
        export interface ExecutionSummaryItem {
            execution_id?: string;
            execution_status?: string;
        }
        export interface GetTargetQueriesParams {
            /**
             * List of target IDs to transform into queries.
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
                .../**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */[]
            ];
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
        /**
         * A Next Best Action configured on a campaign's Entity-UI channel.
         * This is the canonical NBA contract shared by discovery (this API), authoring, and rendering.
         * NBA content is single-language in v1; text fields may contain `{{placeholders}}` resolved at render time.
         *
         */
        export interface NextBestAction {
            /**
             * Light category label shown above the title. Free-form text.
             */
            category?: string;
            /**
             * Curated icon for the NBA.
             */
            icon?: {
                /**
                 * Icon name from "@epilot360/icons".
                 */
                name: string;
                /**
                 * Optional icon color.
                 */
                color?: string;
            };
            /**
             * Bold action title. Required. Supports `{{placeholders}}`.
             */
            title: string;
            /**
             * Optional description. Supports `{{placeholders}}` (incl. relative dates).
             */
            body?: string;
            /**
             * Display priority. NBAs are shown highest-priority first.
             */
            priority?: "low" | "medium" | "high";
            /**
             * Whether the agent can dismiss the NBA.
             */
            is_dismissable?: boolean;
            /**
             * The NBA's single call-to-action.
             */
            cta: {
                type: "journey" | "workflow" | "url";
                /**
                 * Journey id, workflow definition id, or URL, depending on `type`.
                 */
                target: string;
                /**
                 * Optional CTA button label.
                 */
                label?: string;
                /**
                 * Journey context parameters (journey CTA only). Maps the journey's declared
                 * context parameters so the journey knows which entity it is about. Discovery
                 * returns them verbatim; they are passed to the journey when it launches.
                 *
                 */
                context_params?: {
                    key: string;
                    value: string;
                }[];
            };
        }
        export interface PortalRecipientPayload {
            portal_status: PortalStatus;
            portal_state?: {
                [name: string]: any;
            };
        }
        export type PortalStatus = "sent" | "seen" | "dismissed" | "clicked";
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
            entity_ui_status?: /**
             * Lifecycle status of a Next Best Action on the Entity-UI channel. Unlike the portal
             * channel there is no `sent` state: an NBA recipient is born at `seen`, the moment the
             * action is first rendered to an agent.
             *
             */
            EntityUiStatus;
            entity_ui_status_updated_at?: string; // date-time
            resolution?: /**
             * Cross-channel resolution of a campaign for a recipient. Unlike the per-channel `*_status`
             * fields (where `dismissed` is channel-local), a resolution suppresses the campaign on EVERY
             * channel — the 360 Entity-UI card and the portal teaser alike. Server-managed and read-only:
             * never sent by a client. Absence means unresolved.
             *
             */
            Resolution;
            updated_at?: string; // date-time
        }
        /**
         * Cross-channel resolution of a campaign for a recipient. Unlike the per-channel `*_status`
         * fields (where `dismissed` is channel-local), a resolution suppresses the campaign on EVERY
         * channel — the 360 Entity-UI card and the portal teaser alike. Server-managed and read-only:
         * never sent by a client. Absence means unresolved.
         *
         */
        export type Resolution = "accepted";
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
        /**
         * Discriminated by `type`. Each campaign variant has its own request shape;
         * new variants are added by introducing a new schema and extending the `oneOf` list.
         *
         */
        export type SetupCampaignRequest = /**
         * Discriminated by `type`. Each campaign variant has its own request shape;
         * new variants are added by introducing a new schema and extending the `oneOf` list.
         *
         */
        SetupTariffChangeCampaignRequest;
        export interface SetupTariffChangeCampaignRequest {
            type: "tariff_change";
            product_recommendation: {
                /**
                 * Optional name of the product recommendation. Defaults to the campaign name.
                 */
                name?: string;
                /**
                 * Optional source product entity ID for the recommendation.
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                source_product_id?: string; // uuid
                /**
                 * Optional source price entity ID for the recommendation.
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                source_price_id?: string; // uuid
                /**
                 * Offer blocks for the product_recommendation entity.
                 */
                offers?: {
                    /**
                     * Optional per-offer target entity ID.
                     */
                    target_id?: /**
                     * example:
                     * b8c01433-5556-4e2b-aad4-6f5348d1df84
                     */
                    BaseUUID /* uuid */;
                    /**
                     * Product/price pairs within this offer.
                     */
                    items: {
                        product_id: /**
                         * example:
                         * b8c01433-5556-4e2b-aad4-6f5348d1df84
                         */
                        BaseUUID /* uuid */;
                        price_id: /**
                         * example:
                         * b8c01433-5556-4e2b-aad4-6f5348d1df84
                         */
                        BaseUUID /* uuid */;
                        /**
                         * Opaque per-item highlight/comparison config persisted as-is on the entity.
                         */
                        highlight_config?: {
                            [name: string]: any;
                        };
                    }[];
                }[];
            };
            campaign: {
                name: string;
                goal?: string;
                /**
                 * List of target entity IDs to attach to the campaign. Today only a single
                 * entry is supported (campaign.target is has_one) but the array shape is kept
                 * for forward-compatibility — only `target_ids[0]` is used.
                 *
                 */
                target_ids: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */[];
            };
            /**
             * Optional journey configuration selected in the wizard. Only sent by the
             * consumer once a journey has been chosen.
             *
             */
            journey?: {
                journey_id: /**
                 * example:
                 * b8c01433-5556-4e2b-aad4-6f5348d1df84
                 */
                BaseUUID /* uuid */;
            };
            /**
             * Optional delivery channel configuration. Each channel is only sent by the
             * consumer once it has been enabled and fully configured in the wizard.
             *
             */
            channels?: {
                /**
                 * Portal widget placement for the product recommendation block. Only sent by
                 * the consumer once both a portal and a block have been selected.
                 *
                 */
                portal_widget?: {
                    portal_id: /**
                     * example:
                     * b8c01433-5556-4e2b-aad4-6f5348d1df84
                     */
                    BaseUUID /* uuid */;
                    block_id: /**
                     * example:
                     * b8c01433-5556-4e2b-aad4-6f5348d1df84
                     */
                    BaseUUID /* uuid */;
                };
                /**
                 * Email campaign delivery. An automation flow (legacy) and/or an email
                 * template can be provided to send the campaign emails. The selection is
                 * persisted as the campaign's `flow_id`. If `automation_id` is provided it is
                 * used as-is; otherwise a flow is created from `template_id`. Only sent by the
                 * consumer once one has been selected.
                 *
                 */
                email?: {
                    automation_id?: /**
                     * example:
                     * b8c01433-5556-4e2b-aad4-6f5348d1df84
                     */
                    BaseUUID /* uuid */;
                    template_id?: /**
                     * example:
                     * b8c01433-5556-4e2b-aad4-6f5348d1df84
                     */
                    BaseUUID /* uuid */;
                };
            };
        }
        export interface SetupTariffChangeCampaignResponse {
            type: "tariff_change";
            product_recommendation_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            campaign_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            journey_id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            portal_widget_id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
        }
        export interface Target {
            _id?: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
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
            name?: string;
            description?: string;
            entity_schema?: string;
            entity_filters?: {
                [name: string]: any;
            };
        }
        export interface TargetQueryResult {
            target_id: /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            BaseUUID /* uuid */;
            /**
             * Transformed query string, or null if transformation failed.
             */
            query: string | null;
            /**
             * Error message if query transformation failed.
             */
            error?: string;
        }
        export interface UpdateEntityUiStatusRequest {
            status: /**
             * Lifecycle status of a Next Best Action on the Entity-UI channel. Unlike the portal
             * channel there is no `sent` state: an NBA recipient is born at `seen`, the moment the
             * action is first rendered to an agent.
             *
             */
            EntityUiStatus;
            /**
             * Schema slug of the recipient entity (e.g. "contact"). Required when recording the
             * first `seen`, which lazily creates the recipient record; ignored on later transitions.
             *
             */
            entity_schema?: string;
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
export declare namespace Paths {
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
    namespace DiscoverCampaigns {
        export type RequestBody = Components.Schemas.DiscoverCampaignsParams;
        namespace Responses {
            export type $200 = Components.Responses.DiscoverCampaignsResponse;
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
            export type AutomationStatus = Components.Schemas.AutomationStatus[];
            export type CampaignId = /**
             * example:
             * b8c01433-5556-4e2b-aad4-6f5348d1df84
             */
            Components.Schemas.BaseUUID /* uuid */;
            export type Limit = number;
            export type Next = string;
            export type PortalStatus = Components.Schemas.PortalStatus;
            export type Q = string;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            next?: Parameters.Next;
            q?: Parameters.Q;
            automation_status?: Parameters.AutomationStatus;
            portal_status?: Parameters.PortalStatus;
        }
        namespace Responses {
            export type $200 = Components.Responses.RecipientsResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace GetTargetQueries {
        export type RequestBody = Components.Schemas.GetTargetQueriesParams;
        namespace Responses {
            export type $200 = Components.Responses.GetTargetQueriesResponse;
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
    namespace SetupCampaign {
        export type RequestBody = /**
         * Discriminated by `type`. Each campaign variant has its own request shape;
         * new variants are added by introducing a new schema and extending the `oneOf` list.
         *
         */
        Components.Schemas.SetupCampaignRequest;
        namespace Responses {
            export type $201 = Components.Responses.SetupCampaignResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
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
    namespace UpdateRecipientEntityUiStatus {
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
        export type RequestBody = Components.Schemas.UpdateEntityUiStatusRequest;
        namespace Responses {
            export type $200 = Components.Responses.RecipientResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $404 = Components.Responses.ClientErrorResponse;
            export type $409 = Components.Responses.ClientErrorResponse;
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
   * setupCampaign - Set up a campaign with related entities and configurations
   * 
   * Creates a `campaign` entity together with its related entities and configurations in a single call.
   * Used by the campaign wizard UI, but not restricted to it.
   * 
   */
  'setupCampaign'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SetupCampaign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetupCampaign.Responses.$201>
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
   * discoverCampaigns - Discover Entity-UI Next Best Actions for an entity
   * 
   * Given an entity, returns the Next Best Actions it should see on the Entity-UI channel.
   * 
   * Enumerates the organization's **active** campaigns that carry a valid Entity-UI Next Best
   * Action, live-matches each against the entity using the existing match engine, and returns
   * the matching NBAs priority-sorted (one per campaign).
   * 
   * This is a pure read: it writes nothing. An entity that matches no campaigns returns an
   * empty list, not an error.
   * 
   */
  'discoverCampaigns'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DiscoverCampaigns.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscoverCampaigns.Responses.$200>
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
   * getTargetQueries - Get target queries
   * 
   * Transform target filters into Lucene queries for the provided target IDs.
   * Returns the transformed query string for each target along with any errors encountered.
   * 
   */
  'getTargetQueries'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetTargetQueries.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTargetQueries.Responses.$200>
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
   * - From 'sent': can change to 'seen', 'dismissed', or 'clicked'
   * - From 'seen': can change to 'dismissed' or 'clicked'
   * - From 'dismissed' or 'clicked': cannot be changed (final states)
   * 
   */
  'updateRecipientPortalStatus'(
    parameters?: Parameters<Paths.UpdateRecipientPortalStatus.PathParameters> | null,
    data?: Paths.UpdateRecipientPortalStatus.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRecipientPortalStatus.Responses.$200>
  /**
   * updateRecipientEntityUiStatus - Update Entity-UI (Next Best Action) status for a campaign recipient
   * 
   * Records a Next Best Action interaction for a recipient on the Entity-UI channel.
   * 
   * Unlike the portal channel, an NBA recipient is created lazily: the first `seen` creates
   * the recipient record (and requires `entity_schema`). `seen` is idempotent — re-viewing an
   * NBA that is already seen/clicked/dismissed is a no-op success and never regresses the status.
   * 
   * Status transition rules:
   * - `seen`: lazily creates the recipient; a no-op success if a status already exists
   * - From `seen`: can change to `clicked` or `dismissed`
   * - From `clicked`: can change to `dismissed`
   * - From `dismissed`: cannot be changed (final state)
   * 
   * `dismissed` and `clicked` require an existing recipient (404 otherwise, since an NBA is
   * born at `seen`) and reject invalid transitions (409).
   * 
   * The entity_ui_status_updated_at timestamp is automatically set when the status changes.
   * 
   */
  'updateRecipientEntityUiStatus'(
    parameters?: Parameters<Paths.UpdateRecipientEntityUiStatus.PathParameters> | null,
    data?: Paths.UpdateRecipientEntityUiStatus.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRecipientEntityUiStatus.Responses.$200>
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
  ['/v1/campaign:setup']: {
    /**
     * setupCampaign - Set up a campaign with related entities and configurations
     * 
     * Creates a `campaign` entity together with its related entities and configurations in a single call.
     * Used by the campaign wizard UI, but not restricted to it.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SetupCampaign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetupCampaign.Responses.$201>
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
  ['/v1/campaign:discover']: {
    /**
     * discoverCampaigns - Discover Entity-UI Next Best Actions for an entity
     * 
     * Given an entity, returns the Next Best Actions it should see on the Entity-UI channel.
     * 
     * Enumerates the organization's **active** campaigns that carry a valid Entity-UI Next Best
     * Action, live-matches each against the entity using the existing match engine, and returns
     * the matching NBAs priority-sorted (one per campaign).
     * 
     * This is a pure read: it writes nothing. An entity that matches no campaigns returns an
     * empty list, not an error.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DiscoverCampaigns.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscoverCampaigns.Responses.$200>
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
  ['/v1/target/queries']: {
    /**
     * getTargetQueries - Get target queries
     * 
     * Transform target filters into Lucene queries for the provided target IDs.
     * Returns the transformed query string for each target along with any errors encountered.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetTargetQueries.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTargetQueries.Responses.$200>
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
     * - From 'sent': can change to 'seen', 'dismissed', or 'clicked'
     * - From 'seen': can change to 'dismissed' or 'clicked'
     * - From 'dismissed' or 'clicked': cannot be changed (final states)
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateRecipientPortalStatus.PathParameters> | null,
      data?: Paths.UpdateRecipientPortalStatus.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRecipientPortalStatus.Responses.$200>
  }
  ['/v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:status']: {
    /**
     * updateRecipientEntityUiStatus - Update Entity-UI (Next Best Action) status for a campaign recipient
     * 
     * Records a Next Best Action interaction for a recipient on the Entity-UI channel.
     * 
     * Unlike the portal channel, an NBA recipient is created lazily: the first `seen` creates
     * the recipient record (and requires `entity_schema`). `seen` is idempotent — re-viewing an
     * NBA that is already seen/clicked/dismissed is a no-op success and never regresses the status.
     * 
     * Status transition rules:
     * - `seen`: lazily creates the recipient; a no-op success if a status already exists
     * - From `seen`: can change to `clicked` or `dismissed`
     * - From `clicked`: can change to `dismissed`
     * - From `dismissed`: cannot be changed (final state)
     * 
     * `dismissed` and `clicked` require an existing recipient (404 otherwise, since an NBA is
     * born at `seen`) and reject invalid transitions (409).
     * 
     * The entity_ui_status_updated_at timestamp is automatically set when the status changes.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateRecipientEntityUiStatus.PathParameters> | null,
      data?: Paths.UpdateRecipientEntityUiStatus.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRecipientEntityUiStatus.Responses.$200>
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
export type DiscoverCampaignsParams = Components.Schemas.DiscoverCampaignsParams;
export type EntityUiStatus = Components.Schemas.EntityUiStatus;
export type ExecutionSummaryItem = Components.Schemas.ExecutionSummaryItem;
export type GetTargetQueriesParams = Components.Schemas.GetTargetQueriesParams;
export type JobStatus = Components.Schemas.JobStatus;
export type MatchCampaignParams = Components.Schemas.MatchCampaignParams;
export type MatchTargetParams = Components.Schemas.MatchTargetParams;
export type NextBestAction = Components.Schemas.NextBestAction;
export type PortalRecipientPayload = Components.Schemas.PortalRecipientPayload;
export type PortalStatus = Components.Schemas.PortalStatus;
export type Recipient = Components.Schemas.Recipient;
export type Resolution = Components.Schemas.Resolution;
export type RetriggerAutomationsRequest = Components.Schemas.RetriggerAutomationsRequest;
export type RetriggerAutomationsResult = Components.Schemas.RetriggerAutomationsResult;
export type ServerError = Components.Schemas.ServerError;
export type SetupCampaignRequest = Components.Schemas.SetupCampaignRequest;
export type SetupTariffChangeCampaignRequest = Components.Schemas.SetupTariffChangeCampaignRequest;
export type SetupTariffChangeCampaignResponse = Components.Schemas.SetupTariffChangeCampaignResponse;
export type Target = Components.Schemas.Target;
export type TargetQueryResult = Components.Schemas.TargetQueryResult;
export type UpdateEntityUiStatusRequest = Components.Schemas.UpdateEntityUiStatusRequest;
export type UpdatePortalStatusRequest = Components.Schemas.UpdatePortalStatusRequest;
export type UpdateRecipientPayload = Components.Schemas.UpdateRecipientPayload;
