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
         * A JWT Access Token
         * example:
         * eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
         */
        export type AccessToken = string;
        /**
         * example:
         * api_5ZugdRXasLfWBypHi93Fk
         */
        export type AccessTokenId = string;
        export interface AccessTokenItem {
            id: /**
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            AccessTokenId;
            created_at: string; // date-time
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: /**
             * Access token type
             * example:
             * api
             */
            AccessTokenType;
            journey_id?: /* Journey ID for access token type "journey" */ AccessTokenJourneyId;
            portal_id?: /* Portal ID for access token type "portal" */ PortalId;
            assignments?: /* List of role ids attached to an user */ Assignments;
        }
        /**
         * Journey ID for access token type "journey"
         */
        export type AccessTokenJourneyId = string;
        /**
         * Human readable name for access token
         * example:
         * Postman Access Token
         */
        export type AccessTokenName = string;
        export interface AccessTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "api";
            assignments?: /* List of role ids attached to an user */ Assignments;
            expires_in?: ExpiresIn;
        }
        /**
         * Access token type
         * example:
         * api
         */
        export type AccessTokenType = "api" | "journey" | "portal" | "assume" | "app";
        export interface AppTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "app";
            assignments?: /* List of role ids attached to an user */ Assignments;
            expires_in?: ExpiresIn;
        }
        /**
         * List of role ids attached to an user
         */
        export type Assignments = /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        RoleId[];
        export interface AssumeTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "assume";
            assignments?: /* List of role ids attached to an user */ Assignments;
        }
        export type ExpiresIn = number /* int32 */ | string /* ^[0-9]+ ?(ms|milliseconds?|s|seconds?|m|minutes?|h|hours?|d|days?|w|weeks?|y|years?)?$ */;
        export interface JourneyTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "journey";
            journey_id: /* Journey ID for access token type "journey" */ AccessTokenJourneyId;
            expires_in?: ExpiresIn;
        }
        /**
         * Portal ID for access token type "portal"
         */
        export type PortalId = string;
        export interface PortalTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "portal";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            expires_in?: ExpiresIn;
        }
        /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        export type RoleId = string;
        export type TokenParameters = AccessTokenParameters | JourneyTokenParameters | PortalTokenParameters | AssumeTokenParameters | AppTokenParameters;
    }
}
declare namespace Paths {
    namespace CreateAccessToken {
        export type RequestBody = Components.Schemas.TokenParameters;
        namespace Responses {
            export interface $201 {
                token?: /**
                 * A JWT Access Token
                 * example:
                 * eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
                 */
                Components.Schemas.AccessToken;
                id: /**
                 * example:
                 * api_5ZugdRXasLfWBypHi93Fk
                 */
                Components.Schemas.AccessTokenId;
                created_at: string; // date-time
                name: /**
                 * Human readable name for access token
                 * example:
                 * Postman Access Token
                 */
                Components.Schemas.AccessTokenName;
                token_type?: /**
                 * Access token type
                 * example:
                 * api
                 */
                Components.Schemas.AccessTokenType;
                journey_id?: /* Journey ID for access token type "journey" */ Components.Schemas.AccessTokenJourneyId;
                portal_id?: /* Portal ID for access token type "portal" */ Components.Schemas.PortalId;
                assignments?: /* List of role ids attached to an user */ Components.Schemas.Assignments;
            }
            export interface $400 {
                status?: number;
                error?: string;
            }
            export interface $500 {
                status?: number;
                error?: string;
            }
        }
    }
    namespace GetAccessTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetAccessTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace GetPublicTokenJwks {
        namespace Responses {
            export interface $200 {
                keys?: {
                    /**
                     * example:
                     * RS256
                     */
                    alg?: string;
                    /**
                     * example:
                     * AQAB
                     */
                    e?: string;
                    /**
                     * example:
                     * tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=
                     */
                    kid?: string;
                    /**
                     * example:
                     * RSA
                     */
                    kty?: string;
                    /**
                     * example:
                     * h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ
                     */
                    n?: string;
                    /**
                     * example:
                     * sig
                     */
                    use?: string;
                }[];
            }
        }
    }
    namespace GetPublicTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace ListAccessTokens {
        namespace Parameters {
            export type TokenType = /**
             * Access token type
             * example:
             * api
             */
            Components.Schemas.AccessTokenType[];
        }
        export interface QueryParameters {
            token_type?: Parameters.TokenType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenItem[];
        }
    }
    namespace RevokeAccessToken {
        namespace Parameters {
            export type Id = /**
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            Components.Schemas.AccessTokenId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenItem;
        }
    }
}


export interface OperationMethods {
  /**
   * listAccessTokens - listAccessTokens
   * 
   * Lists all Access Tokens for current user (by default excludes system generated tokens)
   */
  'listAccessTokens'(
    parameters?: Parameters<Paths.ListAccessTokens.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAccessTokens.Responses.$200>
  /**
   * createAccessToken - createAccessToken
   * 
   * **Access Token type: `API`** (default if not specified):
   * 
   * Generates a new Access Token to use for calling epilot APIs.
   * 
   * Takes optionally a list of Roles assigned to the Access Token. Defaults to current user's assignments
   * 
   * See [Permissions API docs](https://docs.epilot.io/api/permissions)
   * 
   * **Access Token type: `JOURNEY`**:
   * 
   * Generates a Public Access Token related to a journey.
   * The journey id should be specfied.
   * 
   */
  'createAccessToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAccessToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAccessToken.Responses.$201>
  /**
   * revokeAccessToken - revokeAccessToken
   * 
   * Revokes an Access Token so it can't be used anymore.
   */
  'revokeAccessToken'(
    parameters?: Parameters<Paths.RevokeAccessToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeAccessToken.Responses.$200>
  /**
   * getAccessTokenJwks - getAccessTokenJwks
   * 
   * Get jwks public key set to verify access tokens generated by this API
   */
  'getAccessTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccessTokenJwks.Responses.$200>
  /**
   * getAccessTokenOIDC - getAccessTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API as identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getAccessTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccessTokenOIDC.Responses.$200>
  /**
   * getPublicTokenJwks - getPublicTokenJwks
   * 
   * Get jwks public key set to verify public tokens generated by this API
   */
  'getPublicTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicTokenJwks.Responses.$200>
  /**
   * getPublicTokenOIDC - getPublicTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API a a public identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getPublicTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicTokenOIDC.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/access-tokens']: {
    /**
     * createAccessToken - createAccessToken
     * 
     * **Access Token type: `API`** (default if not specified):
     * 
     * Generates a new Access Token to use for calling epilot APIs.
     * 
     * Takes optionally a list of Roles assigned to the Access Token. Defaults to current user's assignments
     * 
     * See [Permissions API docs](https://docs.epilot.io/api/permissions)
     * 
     * **Access Token type: `JOURNEY`**:
     * 
     * Generates a Public Access Token related to a journey.
     * The journey id should be specfied.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAccessToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAccessToken.Responses.$201>
    /**
     * listAccessTokens - listAccessTokens
     * 
     * Lists all Access Tokens for current user (by default excludes system generated tokens)
     */
    'get'(
      parameters?: Parameters<Paths.ListAccessTokens.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAccessTokens.Responses.$200>
  }
  ['/v1/access-tokens/{id}']: {
    /**
     * revokeAccessToken - revokeAccessToken
     * 
     * Revokes an Access Token so it can't be used anymore.
     */
    'delete'(
      parameters?: Parameters<Paths.RevokeAccessToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeAccessToken.Responses.$200>
  }
  ['/v1/access-tokens/.well-known/jwks.json']: {
    /**
     * getAccessTokenJwks - getAccessTokenJwks
     * 
     * Get jwks public key set to verify access tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccessTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/.well-known/openid-configuration']: {
    /**
     * getAccessTokenOIDC - getAccessTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API as identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccessTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/public/.well-known/jwks.json']: {
    /**
     * getPublicTokenJwks - getPublicTokenJwks
     * 
     * Get jwks public key set to verify public tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/public/.well-known/openid-configuration']: {
    /**
     * getPublicTokenOIDC - getPublicTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API a a public identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicTokenOIDC.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AccessToken = Components.Schemas.AccessToken;
export type AccessTokenId = Components.Schemas.AccessTokenId;
export type AccessTokenItem = Components.Schemas.AccessTokenItem;
export type AccessTokenJourneyId = Components.Schemas.AccessTokenJourneyId;
export type AccessTokenName = Components.Schemas.AccessTokenName;
export type AccessTokenParameters = Components.Schemas.AccessTokenParameters;
export type AccessTokenType = Components.Schemas.AccessTokenType;
export type AppTokenParameters = Components.Schemas.AppTokenParameters;
export type Assignments = Components.Schemas.Assignments;
export type AssumeTokenParameters = Components.Schemas.AssumeTokenParameters;
export type ExpiresIn = Components.Schemas.ExpiresIn;
export type JourneyTokenParameters = Components.Schemas.JourneyTokenParameters;
export type PortalId = Components.Schemas.PortalId;
export type PortalTokenParameters = Components.Schemas.PortalTokenParameters;
export type RoleId = Components.Schemas.RoleId;
export type TokenParameters = Components.Schemas.TokenParameters;
