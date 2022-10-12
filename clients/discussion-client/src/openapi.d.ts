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
        export type Attachment = {
            /**
             * File ID
             * example:
             * 70432e1d-eadc-4995-937c-2604637bbaae
             */
            id?: string;
            /**
             * Filename
             * example:
             * document.pdf
             */
            filename?: string;
            /**
             * Content type
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * Public url for downloading file
             * example:
             * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string;
            /**
             * S3 reference
             */
            s3ref?: {
                /**
                 * S3 bucket name
                 * example:
                 * epilot-files-prod
                 */
                bucket?: string;
                /**
                 * S3 object key
                 * example:
                 * 123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                 */
                key?: string;
            };
        } | null;
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id?: string;
            /**
             * Entity title
             */
            _title?: string;
            /**
             * Ivy Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org?: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema?: string;
            /**
             * Entity tags
             * example:
             * [
             *   "automatic email template"
             * ]
             */
            _tags?: string[];
            /**
             * Created date
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at?: string; // date-time
            /**
             * Updated date
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at?: string; // date-time
        }
        export interface Comment {
            /**
             * UUID v4
             * example:
             * d9159a41-1311-47fd-b026-b59401f3bf87
             */
            _id?: string;
            /**
             * Entity title
             */
            _title?: string;
            /**
             * Ivy Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org?: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema?: string;
            /**
             * Tags
             * example:
             * [
             *   "automatic email template",
             *   "discussion",
             *   "comment"
             * ]
             */
            _tags?: string[];
            /**
             * Created at
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _created_at?: string; // date-time
            /**
             * Updated at
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at?: string; // date-time
            /**
             * ID of the context the comment belongs to (entity ID, workflow ID, activity ID, opportunity ID,…)
             * example:
             * d9159a41-1311-47fd-b026-b59401f3bf87
             */
            context_id?: string;
            /**
             * Thread ID - available when the comment is a reply to thread.
             * example:
             * 6a838adf-a579-4ffd-9e6c-630a09fa025a
             */
            thread_id?: string;
            /**
             * Title
             * example:
             * Discussion
             */
            title?: string;
            /**
             * name
             * example:
             * I want to trigger a discussion about when we delivery the facilities to customer.
             */
            content?: string;
            /**
             * Attachments
             */
            attachments?: Attachment[];
            /**
             * Reactions
             */
            reactions?: Reaction[];
            /**
             * Last edit time of author
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            edited_at?: string; // date-time
            /**
             * Created by
             * example:
             * 1234
             */
            created_by?: number;
            /**
             * Updated by
             * example:
             * 1234
             */
            updated_by?: number;
        }
        export interface Reaction {
            /**
             * Emoji
             * example:
             * like
             */
            emoji?: string;
            /**
             * User ID who reacted
             * example:
             * 12345
             */
            user_id?: number;
        }
        export interface User {
            /**
             * example:
             * 12345
             */
            id?: string;
            /**
             * example:
             * 23456
             */
            organization_id?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * User's display name (default: email address)
             * example:
             * Example User
             */
            display_name?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            email?: string; // email
            draft_email?: string | null; // email
            /**
             * example:
             * 1234567890
             */
            phone?: string | null;
            /**
             * example:
             * de
             */
            preferred_language?: string;
            /**
             * example:
             * 65dc527f-cb2d-4158-8f2e-8978dbceb599
             */
            token?: string;
            /**
             * example:
             * <p>Thanks</p>
             */
            signature?: string;
            /**
             * example:
             * true
             */
            is_signature_enabled?: boolean;
            /**
             * example:
             * {
             *   "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
             *   "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
             * }
             */
            image_uri?: {
                [name: string]: any;
                original?: string; // uri
                thumbnail_32?: string; // uri
            };
            properties?: {
                /**
                 * example:
                 * profileImageName
                 */
                name: string;
                /**
                 * example:
                 * avatar.png
                 */
                value: string;
            }[];
        }
    }
}
declare namespace Paths {
    namespace CreateComment {
        export type RequestBody = Components.Schemas.Comment;
        namespace Responses {
            export type $201 = Components.Schemas.Comment;
            export interface $403 {
            }
        }
    }
    namespace DeleteComment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetComment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Comment;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetMentionableUsers {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User[];
            export interface $403 {
            }
        }
    }
    namespace GetThreadComments {
        namespace Parameters {
            export type Id = string;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Total comments in a thread
                 * example:
                 * 15
                 */
                hits?: number;
                /**
                 * Comments
                 */
                results?: Components.Schemas.Comment[];
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetThreadsByContext {
        namespace Parameters {
            export type Id = string;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Total threads of context
                 * example:
                 * 15
                 */
                hits?: number;
                /**
                 * Threads
                 */
                results?: Components.Schemas.Comment[];
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateComment {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Comment;
        namespace Responses {
            export type $200 = Components.Schemas.Comment;
            export interface $403 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * createComment - Create comment
   * 
   * Create a comment.
   */
  'createComment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateComment.Responses.$201>
  /**
   * getComment - Get comment
   * 
   * Get comment by ID
   */
  'getComment'(
    parameters?: Parameters<Paths.GetComment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetComment.Responses.$200>
  /**
   * updateComment - Update comment
   * 
   * Update a comment.
   */
  'updateComment'(
    parameters?: Parameters<Paths.UpdateComment.PathParameters> | null,
    data?: Paths.UpdateComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateComment.Responses.$200>
  /**
   * deleteComment - Delete comment
   * 
   * Immediately and permanently deletes the specified comment. If the comment is the one that triggered a discussion thread, all comments belong to this thread will be deleted as well. This operation cannot be undone.
   */
  'deleteComment'(
    parameters?: Parameters<Paths.DeleteComment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteComment.Responses.$204>
  /**
   * getThreadsByContext - Get threads by context
   * 
   * Get the comments that are treated as first comment of a thread. The fully thread will be get separately.
   */
  'getThreadsByContext'(
    parameters?: Parameters<Paths.GetThreadsByContext.PathParameters & Paths.GetThreadsByContext.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThreadsByContext.Responses.$200>
  /**
   * getMentionableUsers - Get list of users for mention list of a context.
   * 
   * Get list of users for mention list including entity owner's users & shared users.
   */
  'getMentionableUsers'(
    parameters?: Parameters<Paths.GetMentionableUsers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMentionableUsers.Responses.$200>
  /**
   * getThreadComments - Get thread comments
   * 
   * Get comments belong to a thread
   */
  'getThreadComments'(
    parameters?: Parameters<Paths.GetThreadComments.PathParameters & Paths.GetThreadComments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThreadComments.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/comments']: {
    /**
     * createComment - Create comment
     * 
     * Create a comment.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateComment.Responses.$201>
  }
  ['/v1/comments/{id}']: {
    /**
     * updateComment - Update comment
     * 
     * Update a comment.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateComment.PathParameters> | null,
      data?: Paths.UpdateComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateComment.Responses.$200>
    /**
     * getComment - Get comment
     * 
     * Get comment by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetComment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetComment.Responses.$200>
    /**
     * deleteComment - Delete comment
     * 
     * Immediately and permanently deletes the specified comment. If the comment is the one that triggered a discussion thread, all comments belong to this thread will be deleted as well. This operation cannot be undone.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteComment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteComment.Responses.$204>
  }
  ['/v1/contexts/{id}/threads']: {
    /**
     * getThreadsByContext - Get threads by context
     * 
     * Get the comments that are treated as first comment of a thread. The fully thread will be get separately.
     */
    'get'(
      parameters?: Parameters<Paths.GetThreadsByContext.PathParameters & Paths.GetThreadsByContext.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThreadsByContext.Responses.$200>
  }
  ['/v1/contexts/{id}/mentionableUsers']: {
    /**
     * getMentionableUsers - Get list of users for mention list of a context.
     * 
     * Get list of users for mention list including entity owner's users & shared users.
     */
    'get'(
      parameters?: Parameters<Paths.GetMentionableUsers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMentionableUsers.Responses.$200>
  }
  ['/v1/threads/{id}']: {
    /**
     * getThreadComments - Get thread comments
     * 
     * Get comments belong to a thread
     */
    'get'(
      parameters?: Parameters<Paths.GetThreadComments.PathParameters & Paths.GetThreadComments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThreadComments.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
