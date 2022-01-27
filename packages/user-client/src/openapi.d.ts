/* eslint-disable */
import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
  namespace Schemas {
    export type InviteToken = string;
    export type Limit = number;
    export interface LoginParameters {
      /**
       * example:
       * 123
       */
      organization_id?: string;
      /**
       * example:
       * epilot GmbH
       */
      organization_name?: string;
      /**
       * example:
       * Vendor
       */
      organization_type?: string;
      /**
       * example:
       * eu-central-1
       */
      cognito_region?: string;
      /**
       * example:
       * eu-central-1:d24af723-7b40-4c3d-be57-d0a732a59a5d
       */
      cognito_identity_pool_id?: string;
      /**
       * example:
       * eu-central-sample
       */
      cognito_user_pool_id?: string;
      /**
       * example:
       * asbkh213ehkquwhdi
       */
      cognito_user_pool_client_id?: string;
      /**
       * example:
       * epilot-org-123
       */
      cognito_oauth_domain?: string;
      /**
       * example:
       * [
       *   "openid"
       * ]
       */
      cognito_oauth_scopes?: string[];
      oauth_response_type?: "code" | "token";
    }
    export type Offset = number;
    export type OrganizationId = string;
    export type Query = string;
    export interface User {
      id: UserId;
      organization_id: OrganizationId;
      email: string; // email
      /**
       * example:
       * Example user
       */
      display_name?: string;
      /**
       * example:
       * Example user
       */
      name: string;
      /**
       * example:
       * de
       */
      preferred_language: string;
      /**
       * example:
       * <p>Thanks</p>
       */
      signature?: string;
      /**
       * Deprecated! Please use Permissions API instead
       */
      roles: string[];
      image_uri?: {
        [name: string]: any;
        /**
         * example:
         * https://account-profile-images.epilot.cloud/1/avatar.png
         */
        original?: string; // uri
        /**
         * example:
         * https://account-profile-images.epilot.cloud/1/avatar_32x32.png
         */
        thumbnail_32?: string; // uri
      };
      properties: {
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
    export interface UserActivationPayload {
      /**
       * User's display name (default: email address)
       * example:
       * Example User
       */
      display_name?: string;
      /**
       * User's password
       * example:
       * AKjhdakjsdh@!34
       */
      password?: string;
    }
    export type UserId = string;
    export interface UserV2 {
      id?: UserId;
      organization_id?: OrganizationId;
      /**
       * User's display name (default: email address)
       * example:
       * Example User
       */
      display_name?: string;
      email?: string; // email
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
    export type Username = string;
  }
}
declare namespace Paths {
  namespace ActivateUser {
    namespace Parameters {
      export type Token = Components.Schemas.InviteToken;
    }
    export interface QueryParameters {
      token: Parameters.Token;
    }
    export type RequestBody = Components.Schemas.UserActivationPayload;
  }
  namespace DeleteUserV2 {
    namespace Parameters {
      export type Id = Components.Schemas.UserId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.User;
    }
  }
  namespace GetMe {
    namespace Responses {
      export type $200 = Components.Schemas.User;
    }
  }
  namespace GetMeV2 {
    namespace Responses {
      export type $200 = Components.Schemas.UserV2;
    }
  }
  namespace GetUser {
    namespace Parameters {
      export type Id = Components.Schemas.UserId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.User;
    }
  }
  namespace GetUserLoginParameters {
    namespace Parameters {
      export type Username = Components.Schemas.Username;
    }
    export interface PathParameters {
      username: Parameters.Username;
    }
    namespace Responses {
      export interface $200 {
        login_parameters?: Components.Schemas.LoginParameters[];
      }
    }
  }
  namespace GetUserLoginParametersV2 {
    namespace Parameters {
      export type Username = Components.Schemas.Username;
    }
    export interface PathParameters {
      username: Parameters.Username;
    }
    namespace Responses {
      export interface $200 {
        login_parameters?: Components.Schemas.LoginParameters[];
      }
    }
  }
  namespace GetUserV2 {
    namespace Parameters {
      export type Id = Components.Schemas.UserId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.UserV2;
    }
  }
  namespace ListUsers {
    namespace Parameters {
      export type Limit = Components.Schemas.Limit;
      export type Offset = Components.Schemas.Offset;
      export type OrgIds = Components.Schemas.OrganizationId[];
      export type Query = Components.Schemas.Query;
    }
    export interface QueryParameters {
      org_ids?: Parameters.OrgIds;
      query?: Parameters.Query;
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export interface $200 {
        users?: Components.Schemas.User[];
      }
    }
  }
  namespace ListUsersV2 {
    namespace Parameters {
      export type Limit = Components.Schemas.Limit;
      export type Offset = Components.Schemas.Offset;
      export type Query = Components.Schemas.Query;
    }
    export interface QueryParameters {
      query?: Parameters.Query;
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export interface $200 {
        results?: Components.Schemas.UserV2[];
      }
    }
  }
  namespace UpdateUserV2 {
    namespace Parameters {
      export type Id = Components.Schemas.UserId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.Schemas.UserV2;
    namespace Responses {
      export type $200 = Components.Schemas.UserV2;
    }
  }
}

export interface OperationMethods {
  /**
   * getMe - getMe
   * 
   * Get currently logged in user
   */
  'getMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMe.Responses.$200>
  /**
   * listUsers - listUsers
   * 
   * Lists users in organizations you have access to
   */
  'listUsers'(
    parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsers.Responses.$200>
  /**
   * getUser - getUser
   * 
   * Get user by id
   */
  'getUser'(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUser.Responses.$200>
  /**
   * getUserLoginParameters - getUserLoginParameters
   * 
   * Get user organization login parameters by username
   */
  'getUserLoginParameters'(
    parameters?: Parameters<Paths.GetUserLoginParameters.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLoginParameters.Responses.$200>
  /**
   * getMeV2 - getMeV2
   * 
   * Get currently logged in user
   */
  'getMeV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeV2.Responses.$200>
  /**
   * listUsersV2 - listUsersV2
   * 
   * Get the list of organization users
   */
  'listUsersV2'(
    parameters?: Parameters<Paths.ListUsersV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsersV2.Responses.$200>
  /**
   * getUserV2 - getUserV2
   * 
   * Get the user details by user id
   */
  'getUserV2'(
    parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserV2.Responses.$200>
  /**
   * updateUserV2 - updateUserV2
   * 
   * Update the user details
   */
  'updateUserV2'(
    parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
    data?: Paths.UpdateUserV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
  /**
   * deleteUserV2 - deleteUserV2
   * 
   * Delete the user by user id
   */
  'deleteUserV2'(
    parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  /**
   * activateUser - activateUser
   * 
   * Activates the user
   */
  'activateUser'(
    parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
    data?: Paths.ActivateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getUserLoginParametersV2 - getUserLoginParametersV2
   * 
   * Get user organization login parameters by username
   */
  'getUserLoginParametersV2'(
    parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/users/me']: {
    /**
     * getMe - getMe
     * 
     * Get currently logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMe.Responses.$200>
  }
  ['/v1/users']: {
    /**
     * listUsers - listUsers
     * 
     * Lists users in organizations you have access to
     */
    'get'(
      parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsers.Responses.$200>
  }
  ['/v1/users/{id}']: {
    /**
     * getUser - getUser
     * 
     * Get user by id
     */
    'get'(
      parameters?: Parameters<Paths.GetUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUser.Responses.$200>
  }
  ['/v1/users/username/{username}:getLoginParameters']: {
    /**
     * getUserLoginParameters - getUserLoginParameters
     * 
     * Get user organization login parameters by username
     */
    'get'(
      parameters?: Parameters<Paths.GetUserLoginParameters.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLoginParameters.Responses.$200>
  }
  ['/v2/users/me']: {
    /**
     * getMeV2 - getMeV2
     * 
     * Get currently logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeV2.Responses.$200>
  }
  ['/v2/users']: {
    /**
     * listUsersV2 - listUsersV2
     * 
     * Get the list of organization users
     */
    'get'(
      parameters?: Parameters<Paths.ListUsersV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsersV2.Responses.$200>
  }
  ['/v2/users/{id}']: {
    /**
     * getUserV2 - getUserV2
     * 
     * Get the user details by user id
     */
    'get'(
      parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserV2.Responses.$200>
    /**
     * updateUserV2 - updateUserV2
     * 
     * Update the user details
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
      data?: Paths.UpdateUserV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
    /**
     * deleteUserV2 - deleteUserV2
     * 
     * Delete the user by user id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  }
  ['/v2/users/public/activate']: {
    /**
     * activateUser - activateUser
     * 
     * Activates the user
     */
    'post'(
      parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
      data?: Paths.ActivateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v2/users/public/username/{username}:getLoginParameters']: {
    /**
     * getUserLoginParametersV2 - getUserLoginParametersV2
     * 
     * Get user organization login parameters by username
     */
    'get'(
      parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
