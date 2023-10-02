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
        /**
         * The view action
         * example:
         * seen
         */
        export type ActionType = "seen" | "downloaded";
        export interface BaseViewActionItem {
            schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            EntitySchema;
            entity_id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Organization id of the entity
             * example:
             * 739224
             */
            entity_org?: string;
            action?: /**
             * The view action
             * example:
             * seen
             */
            ActionType;
            timestamp?: string; // date-time
            /**
             * Organization id of the acting user
             * example:
             * 989123
             */
            user_org?: string;
        }
        /**
         * Entity ID
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type EntityId = string;
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * opportunity
         */
        export type EntitySchema = string;
        export interface PortalUserViewActionItem {
            schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            EntitySchema;
            entity_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Organization id of the entity
             * example:
             * 739224
             */
            entity_org: string;
            action: /**
             * The view action
             * example:
             * seen
             */
            ActionType;
            timestamp: string; // date-time
            /**
             * Organization id of the acting user
             * example:
             * 989123
             */
            user_org?: string;
            /**
             * Portal user id
             * example:
             * 123
             */
            portal_user_id: string;
        }
        export interface UserViewActionItem {
            schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            EntitySchema;
            entity_id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Organization id of the entity
             * example:
             * 739224
             */
            entity_org: string;
            action: /**
             * The view action
             * example:
             * seen
             */
            ActionType;
            timestamp: string; // date-time
            /**
             * Organization id of the acting user
             * example:
             * 989123
             */
            user_org?: string;
            /**
             * Epilot user id
             * example:
             * 123
             */
            user_id: string;
        }
        export type ViewActionItem = UserViewActionItem | PortalUserViewActionItem;
    }
}
declare namespace Paths {
    namespace GetEntityViewActions {
        namespace Parameters {
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId;
            export type EntitySchema = /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            Components.Schemas.EntitySchema;
        }
        export interface PathParameters {
            entity_id: Parameters.EntityId;
            entity_schema: Parameters.EntitySchema;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.ViewActionItem[];
            }
        }
    }
    namespace TrackEntityViewAction {
        namespace Parameters {
            export type Action = /**
             * The view action
             * example:
             * seen
             */
            Components.Schemas.ActionType;
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId;
            export type EntitySchema = /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            Components.Schemas.EntitySchema;
        }
        export interface PathParameters {
            action: Parameters.Action;
            entity_id: Parameters.EntityId;
            entity_schema: Parameters.EntitySchema;
        }
        namespace Responses {
            export type $201 = Components.Schemas.ViewActionItem;
        }
    }
    namespace UntrackEntityViewAction {
        namespace Parameters {
            export type Action = /**
             * The view action
             * example:
             * seen
             */
            Components.Schemas.ActionType;
            export type EntityId = /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Components.Schemas.EntityId;
            export type EntitySchema = /**
             * URL-friendly identifier for the entity schema
             * example:
             * opportunity
             */
            Components.Schemas.EntitySchema;
        }
        export interface PathParameters {
            action: Parameters.Action;
            entity_id: Parameters.EntityId;
            entity_schema: Parameters.EntitySchema;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ViewActionItem;
        }
    }
}

export interface OperationMethods {
  /**
   * getEntityViewActions - getEntityViewActions
   * 
   * Get entity view actions for the current user.
   */
  'getEntityViewActions'(
    parameters?: Parameters<Paths.GetEntityViewActions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityViewActions.Responses.$200>
  /**
   * trackEntityViewAction - trackEntityViewAction
   * 
   * Track a view action for the current user. E.g. seen or downloaded.
   */
  'trackEntityViewAction'(
    parameters?: Parameters<Paths.TrackEntityViewAction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TrackEntityViewAction.Responses.$201>
  /**
   * untrackEntityViewAction - untrackEntityViewAction
   * 
   * Remove a previously viewed track action for the current user.
   */
  'untrackEntityViewAction'(
    parameters?: Parameters<Paths.UntrackEntityViewAction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UntrackEntityViewAction.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/viewers/{entity_schema}/{entity_id}']: {
    /**
     * getEntityViewActions - getEntityViewActions
     * 
     * Get entity view actions for the current user.
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityViewActions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityViewActions.Responses.$200>
  }
  ['/v1/viewers/{entity_schema}/{entity_id}/{action}']: {
    /**
     * trackEntityViewAction - trackEntityViewAction
     * 
     * Track a view action for the current user. E.g. seen or downloaded.
     */
    'post'(
      parameters?: Parameters<Paths.TrackEntityViewAction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TrackEntityViewAction.Responses.$201>
    /**
     * untrackEntityViewAction - untrackEntityViewAction
     * 
     * Remove a previously viewed track action for the current user.
     */
    'delete'(
      parameters?: Parameters<Paths.UntrackEntityViewAction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UntrackEntityViewAction.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
