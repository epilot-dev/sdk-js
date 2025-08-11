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
        export interface Entity {
            [name: string]: any;
        }
        export type EntityId = string; // uuid
        export interface EntityOperation {
            entity: EntityId /* uuid */;
            /**
             * example:
             * updateEntity
             */
            operation?: string;
            /**
             * example:
             * {
             *   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "slug": "contact"
             * }
             */
            params?: {
                id?: EntityId /* uuid */;
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
            };
            /**
             * example:
             * {
             *   "_schema": "contact",
             *   "_org": "123",
             *   "status": "Inactive"
             * }
             */
            payload?: {
                [name: string]: any;
            };
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        /**
         * example:
         * 123456789
         */
        export type Id = number;
        export interface Notification {
            [name: string]: any;
            timestamp?: string; // date-time
            /**
             * Type of notification
             * example:
             * workflow
             */
            type: string;
            /**
             * Redirect url
             * example:
             * https://epilot.cloud
             */
            redirect_url?: string;
            /**
             * Organization Id
             * example:
             * 206801
             */
            organization_id?: string;
            title: {
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * My custom notification
                 */
                en?: string;
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * Meine benutzerdefinierte Aktivität
                 */
                de?: string;
            };
            message: {
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} did something with {{contact.entity.id}} {{branch.name}}.
                 */
                en?: string;
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}.
                 */
                de?: string;
            };
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
            caller?: NotificationCallerContext;
            operations?: EntityOperation[];
            /**
             * example:
             * {
             *   "12345": {
             *     "email": false,
             *     "in_app": false
             *   }
             * }
             */
            force_notify_users?: {
                [name: string]: any;
            };
            /**
             * The person who is the corresponding event recipient.
             * example:
             * [
             *   "1",
             *   "2",
             *   "3",
             *   "4",
             *   "5"
             * ]
             */
            visibility_user_ids?: string[];
        }
        export interface NotificationBase {
            [name: string]: any;
            timestamp?: string; // date-time
            /**
             * Type of notification
             * example:
             * workflow
             */
            type: string;
            /**
             * Redirect url
             * example:
             * https://epilot.cloud
             */
            redirect_url?: string;
            /**
             * Organization Id
             * example:
             * 206801
             */
            organization_id?: string;
            title: {
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * My custom notification
                 */
                en?: string;
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * Meine benutzerdefinierte Aktivität
                 */
                de?: string;
            };
            message: {
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} did something with {{contact.entity.id}} {{branch.name}}.
                 */
                en?: string;
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}.
                 */
                de?: string;
            };
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
            caller?: NotificationCallerContext;
            operations?: EntityOperation[];
            /**
             * example:
             * {
             *   "12345": {
             *     "email": false,
             *     "in_app": false
             *   }
             * }
             */
            force_notify_users?: {
                [name: string]: any;
            };
        }
        export interface NotificationCallerContext {
            [name: string]: any;
            EpilotAuth?: {
                /**
                 * example:
                 * {
                 *   "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
                 *   "cognito:groups": [
                 *     "Administrator"
                 *   ],
                 *   "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
                 *   "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
                 *   "custom:ivy_org_id": "739224",
                 *   "cognito:username": "n.ahmad@epilot.cloud",
                 *   "custom:ivy_user_id": "10006129",
                 *   "cognito:roles": [
                 *     "arn:aws:iam::912468240823:role/base-administrator-role"
                 *   ],
                 *   "aud": "6e0jbdnger7nmoktaaflarue1l",
                 *   "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
                 *   "token_use": "id",
                 *   "auth_time": 1614333023,
                 *   "exp": 1614336623,
                 *   "iat": 1614333023,
                 *   "email": "n.ahmad@epilot.cloud"
                 * }
                 */
                token?: {
                    /**
                     * example:
                     * 476e9b48-42f4-4234-a2b0-4668b34626ce
                     */
                    sub?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    email?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    "cognito:username"?: string;
                    /**
                     * example:
                     * 10006129
                     */
                    "custom:ivy_user_id"?: string;
                };
            };
        }
        /**
         * example:
         * 123456789
         */
        export type NotificationId = number;
        export interface NotificationItem {
            [name: string]: any;
            id?: /**
             * example:
             * 123456789
             */
            Id;
            notification_id?: /**
             * example:
             * 123456789
             */
            NotificationId;
            timestamp?: string; // date-time
            /**
             * example:
             * false
             */
            read_state?: boolean;
            /**
             * Type of notification
             * example:
             * workflow
             */
            type: string;
            /**
             * Redirect url
             * example:
             * https://epilot.cloud
             */
            redirect_url?: string;
            /**
             * Organization Id
             * example:
             * 206801
             */
            organization_id?: string;
            title: {
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * My custom notification
                 */
                en?: string;
                /**
                 * Title for notification. Supports handlebars syntax.
                 * example:
                 * Meine benutzerdefinierte Aktivität
                 */
                de?: string;
            };
            message: {
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} did something with {{contact.entity.id}} {{branch.name}}.
                 */
                en?: string;
                /**
                 * Message for notification. Supports handlebars syntax.
                 * example:
                 * {{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}.
                 */
                de?: string;
            };
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
            caller?: NotificationCallerContext;
            operations?: EntityOperation[];
            /**
             * example:
             * {
             *   "12345": {
             *     "email": false,
             *     "in_app": false
             *   }
             * }
             */
            force_notify_users?: {
                [name: string]: any;
            };
        }
    }
}
declare namespace Paths {
    namespace CreateNotification {
        export type RequestBody = Components.Schemas.Notification;
        namespace Responses {
            export interface $202 {
            }
        }
    }
    namespace GetNotification {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NotificationItem;
        }
    }
    namespace GetNotifications {
        namespace Parameters {
            export type AfterId = number;
            export type Limit = number;
            export type NoHydrate = boolean;
        }
        export interface QueryParameters {
            after_id?: Parameters.AfterId;
            limit?: Parameters.Limit;
            no_hydrate?: Parameters.NoHydrate;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                /**
                 * example:
                 * 1
                 */
                total_unread?: number;
                results?: Components.Schemas.NotificationItem[];
            }
        }
    }
    namespace GetNotificationsV2 {
        namespace Parameters {
            export type AfterId = number;
            export type Cursor = string;
            export type Limit = number;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            after_id?: Parameters.AfterId;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Base64 encoded cursor to be used for pagination
                 * example:
                 * eyJjcmVhd
                 */
                cursor?: string;
                /**
                 * example:
                 * 1
                 */
                total?: number;
                /**
                 * example:
                 * 1
                 */
                total_unread?: number;
                results?: Components.Schemas.NotificationItem[];
            }
        }
    }
    namespace GetTotalUnread {
        namespace Responses {
            /**
             * example:
             * 999
             */
            export type $200 = number;
        }
    }
    namespace MarkAllAsRead {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace MarkAsRead {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getNotificationsV2 - getNotificationsV2
   * 
   * Get notifications items. These items may eventually contain entities within their payload, which can be hydrated by the client if desired by calling the Entity API directly.
   */
  'getNotificationsV2'(
    parameters?: Parameters<Paths.GetNotificationsV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotificationsV2.Responses.$200>
  /**
   * getNotifications - getNotifications
   * 
   * Get notifications
   */
  'getNotifications'(
    parameters?: Parameters<Paths.GetNotifications.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotifications.Responses.$200>
  /**
   * createNotification - createNotification
   * 
   * Create a message that can be displayed in the notification panel.
   */
  'createNotification'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateNotification.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNotification.Responses.$202>
  /**
   * getNotification - getNotification
   * 
   * Get the details of a single notification.
   */
  'getNotification'(
    parameters?: Parameters<Paths.GetNotification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotification.Responses.$200>
  /**
   * markAllAsRead - markAllAsRead
   * 
   * Mark all as read
   */
  'markAllAsRead'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkAllAsRead.Responses.$204>
  /**
   * markAsRead - markAsRead
   * 
   * Mark as read
   */
  'markAsRead'(
    parameters?: Parameters<Paths.MarkAsRead.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkAsRead.Responses.$204>
  /**
   * getTotalUnread - getTotalUnread
   * 
   * Get total unread
   */
  'getTotalUnread'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTotalUnread.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/notification/notifications']: {
    /**
     * getNotificationsV2 - getNotificationsV2
     * 
     * Get notifications items. These items may eventually contain entities within their payload, which can be hydrated by the client if desired by calling the Entity API directly.
     */
    'get'(
      parameters?: Parameters<Paths.GetNotificationsV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNotificationsV2.Responses.$200>
  }
  ['/v1/notification/notifications']: {
    /**
     * createNotification - createNotification
     * 
     * Create a message that can be displayed in the notification panel.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateNotification.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateNotification.Responses.$202>
    /**
     * getNotifications - getNotifications
     * 
     * Get notifications
     */
    'get'(
      parameters?: Parameters<Paths.GetNotifications.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNotifications.Responses.$200>
  }
  ['/v1/notification/notifications/{id}']: {
    /**
     * getNotification - getNotification
     * 
     * Get the details of a single notification.
     */
    'get'(
      parameters?: Parameters<Paths.GetNotification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNotification.Responses.$200>
  }
  ['/v1/notification/notifications/mark']: {
    /**
     * markAllAsRead - markAllAsRead
     * 
     * Mark all as read
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkAllAsRead.Responses.$204>
  }
  ['/v1/notification/notifications/{id}/mark']: {
    /**
     * markAsRead - markAsRead
     * 
     * Mark as read
     */
    'put'(
      parameters?: Parameters<Paths.MarkAsRead.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkAsRead.Responses.$204>
  }
  ['/v1/notification/unreads']: {
    /**
     * getTotalUnread - getTotalUnread
     * 
     * Get total unread
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTotalUnread.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Entity = Components.Schemas.Entity;
export type EntityId = Components.Schemas.EntityId;
export type EntityOperation = Components.Schemas.EntityOperation;
export type EntitySlug = Components.Schemas.EntitySlug;
export type Id = Components.Schemas.Id;
export type Notification = Components.Schemas.Notification;
export type NotificationBase = Components.Schemas.NotificationBase;
export type NotificationCallerContext = Components.Schemas.NotificationCallerContext;
export type NotificationId = Components.Schemas.NotificationId;
export type NotificationItem = Components.Schemas.NotificationItem;
