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
        export type CampaignResponse = Schemas.Campaign;
        export type ClientErrorResponse = Schemas.ClientError;
        export type JobStatusResponse = Schemas.JobStatus;
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
        export type ClientError = BaseError;
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
}

export interface OperationMethods {
  /**
   * changeCampaignStatus - Change the status of a campaign
   * 
   * Change the status of a campaign
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
}

export interface PathsDictionary {
  ['/v1/campaign/{campaign_id}/status']: {
    /**
     * changeCampaignStatus - Change the status of a campaign
     * 
     * Change the status of a campaign
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
export type ServerError = Components.Schemas.ServerError;
export type Target = Components.Schemas.Target;
