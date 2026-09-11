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
            portal_user_id?: /* Portal User ID for access token type "portal_preview" */ PortalUserId;
            contact_id?: /**
             * Contact entity ID for access token type "contact_identification"
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            ContactId;
            allowed_operations?: /**
             * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
             * example:
             * [
             *   "getContact",
             *   "getContracts"
             * ]
             */
            AllowedOperations;
            assignments?: /* List of role ids attached to an user */ Assignments;
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
            /**
             * Last date the token was used (YYYY-MM-DD format, 1 day accuracy)
             * example:
             * 2026-02-24
             */
            last_used?: string; // date
            /**
             * Timestamp when the token expires and stops being accepted (only set for tokens created with expires_in)
             * example:
             * 2026-03-01T12:00:00.000Z
             */
            expires_at?: string; // date-time
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
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
        }
        /**
         * Access token type
         * example:
         * api
         */
        export type AccessTokenType = "api" | "journey" | "portal" | "assume" | "app" | "portal_preview" | "contact_identification";
        /**
         * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
         * example:
         * [
         *   "getContact",
         *   "getContracts"
         * ]
         */
        export type AllowedOperations = string[];
        /**
         * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
         * example:
         * true
         */
        export type Anonymize = boolean;
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
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
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
            read_only?: /**
             * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
             * example:
             * true
             */
            ReadOnly;
            anonymize?: /**
             * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
             * example:
             * true
             */
            Anonymize;
        }
        /**
         * Contact entity ID for access token type "contact_identification"
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type ContactId = string;
        /**
         * A token that acts as one contact, issued after that contact was identified by a portal's registration identifiers rather than by logging in. Distinct from portal_preview, which impersonates an existing portal user for a 360 operator: this kind belongs to no user, is minted for an unauthenticated caller, and is therefore always short-lived and restricted to an explicit operation allowlist. Never stored, so it cannot be listed or revoked - keep expires_in short.
         */
        export interface ContactIdentificationTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "contact_identification";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            contact_id: /**
             * Contact entity ID for access token type "contact_identification"
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            ContactId;
            /**
             * Portal surface the token is issued for (see `surfaces` on the portal config in customer-portal-api). Carried as the `custom:surface_id` claim; the consuming API resolves the surface's data access from the portal config on every request.
             * example:
             * website-journeys
             */
            surface_id: string;
            allowed_operations: /**
             * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
             * example:
             * [
             *   "getContact",
             *   "getContracts"
             * ]
             */
            AllowedOperations;
            /**
             * Lifetime in seconds. Integer only for this token type (no "5m" strings), and capped server-side by CONTACT_IDENTIFICATION_TOKEN_MAX_EXPIRATION_SECONDS - the value originates from portal configuration, so it is not trusted as-is.
             * example:
             * 300
             */
            expires_in: number; // int32
            /**
             * Optional. Carried as the `email` claim when the consumer needs it (e.g. to attribute an activity). Omit to keep the contact's email out of the token.
             */
            email?: string;
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
        export interface PortalPreviewTokenParameters {
            name: /**
             * Human readable name for access token
             * example:
             * Postman Access Token
             */
            AccessTokenName;
            token_type?: "portal_preview";
            portal_id: /* Portal ID for access token type "portal" */ PortalId;
            portal_user_id: /* Portal User ID for access token type "portal_preview" */ PortalUserId;
        }
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
         * Portal User ID for access token type "portal_preview"
         */
        export type PortalUserId = string;
        /**
         * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
         * example:
         * true
         */
        export type ReadOnly = boolean;
        /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        export type RoleId = string;
        export type TokenParameters = AccessTokenParameters | JourneyTokenParameters | PortalTokenParameters | AssumeTokenParameters | AppTokenParameters | PortalPreviewTokenParameters | /* A token that acts as one contact, issued after that contact was identified by a portal's registration identifiers rather than by logging in. Distinct from portal_preview, which impersonates an existing portal user for a 360 operator: this kind belongs to no user, is minted for an unauthenticated caller, and is therefore always short-lived and restricted to an explicit operation allowlist. Never stored, so it cannot be listed or revoked - keep expires_in short. */ ContactIdentificationTokenParameters;
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
                portal_user_id?: /* Portal User ID for access token type "portal_preview" */ Components.Schemas.PortalUserId;
                contact_id?: /**
                 * Contact entity ID for access token type "contact_identification"
                 * example:
                 * 5da0a718-c822-403d-9f5d-20d4584e0528
                 */
                Components.Schemas.ContactId;
                allowed_operations?: /**
                 * openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.
                 * example:
                 * [
                 *   "getContact",
                 *   "getContracts"
                 * ]
                 */
                Components.Schemas.AllowedOperations;
                assignments?: /* List of role ids attached to an user */ Components.Schemas.Assignments;
                read_only?: /**
                 * When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.
                 * example:
                 * true
                 */
                Components.Schemas.ReadOnly;
                anonymize?: /**
                 * Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.
                 * example:
                 * true
                 */
                Components.Schemas.Anonymize;
                /**
                 * Last date the token was used (YYYY-MM-DD format, 1 day accuracy)
                 * example:
                 * 2026-02-24
                 */
                last_used?: string; // date
                /**
                 * Timestamp when the token expires and stops being accepted (only set for tokens created with expires_in)
                 * example:
                 * 2026-03-01T12:00:00.000Z
                 */
                expires_at?: string; // date-time
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
    namespace GetContactIdentificationTokenJwks {
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
    namespace GetContactIdentificationTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/contact-identification
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/contact-identification/.well-known/jwks.json
                 */
                jwks_uri?: string; // uri
            }
        }
    }
    namespace GetPortalPreviewTokenJwks {
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
    namespace GetPortalPreviewTokenOIDC {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/portal-preview
                 */
                issuer?: string; // uri
                /**
                 * example:
                 * https://access-token.sls.epilot.io/v1/access-tokens/portal-preview/.well-known/jwks.json
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
   * getPortalPreviewTokenJwks - getPortalPreviewTokenJwks
   * 
   * Get jwks public key set to verify portal preview tokens generated by this API
   */
  'getPortalPreviewTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalPreviewTokenJwks.Responses.$200>
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
  /**
   * getPortalPreviewTokenOIDC - getPortalPreviewTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API a a portal preview identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getPortalPreviewTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPortalPreviewTokenOIDC.Responses.$200>
  /**
   * getContactIdentificationTokenJwks - getContactIdentificationTokenJwks
   * 
   * Get jwks public key set to verify contact identification tokens generated by this API
   */
  'getContactIdentificationTokenJwks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContactIdentificationTokenJwks.Responses.$200>
  /**
   * getContactIdentificationTokenOIDC - getContactIdentificationTokenOIDC
   * 
   * OpenID Connect configuration for Access Token API as a contact identification identity provider
   * 
   * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
   * automate the process of verifying JWT tokens.
   * 
   */
  'getContactIdentificationTokenOIDC'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContactIdentificationTokenOIDC.Responses.$200>
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
  ['/v1/access-tokens/portal-preview/.well-known/jwks.json']: {
    /**
     * getPortalPreviewTokenJwks - getPortalPreviewTokenJwks
     * 
     * Get jwks public key set to verify portal preview tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalPreviewTokenJwks.Responses.$200>
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
  ['/v1/access-tokens/portal-preview/.well-known/openid-configuration']: {
    /**
     * getPortalPreviewTokenOIDC - getPortalPreviewTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API a a portal preview identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPortalPreviewTokenOIDC.Responses.$200>
  }
  ['/v1/access-tokens/contact-identification/.well-known/jwks.json']: {
    /**
     * getContactIdentificationTokenJwks - getContactIdentificationTokenJwks
     * 
     * Get jwks public key set to verify contact identification tokens generated by this API
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContactIdentificationTokenJwks.Responses.$200>
  }
  ['/v1/access-tokens/contact-identification/.well-known/openid-configuration']: {
    /**
     * getContactIdentificationTokenOIDC - getContactIdentificationTokenOIDC
     * 
     * OpenID Connect configuration for Access Token API as a contact identification identity provider
     * 
     * Note: This API is not a fully compliant OAuth2.0 / OIDC identity provider, but this endpoint is useful to
     * automate the process of verifying JWT tokens.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContactIdentificationTokenOIDC.Responses.$200>
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
export type AllowedOperations = Components.Schemas.AllowedOperations;
export type Anonymize = Components.Schemas.Anonymize;
export type AppTokenParameters = Components.Schemas.AppTokenParameters;
export type Assignments = Components.Schemas.Assignments;
export type AssumeTokenParameters = Components.Schemas.AssumeTokenParameters;
export type ContactId = Components.Schemas.ContactId;
export type ContactIdentificationTokenParameters = Components.Schemas.ContactIdentificationTokenParameters;
export type ExpiresIn = Components.Schemas.ExpiresIn;
export type JourneyTokenParameters = Components.Schemas.JourneyTokenParameters;
export type PortalId = Components.Schemas.PortalId;
export type PortalPreviewTokenParameters = Components.Schemas.PortalPreviewTokenParameters;
export type PortalTokenParameters = Components.Schemas.PortalTokenParameters;
export type PortalUserId = Components.Schemas.PortalUserId;
export type ReadOnly = Components.Schemas.ReadOnly;
export type RoleId = Components.Schemas.RoleId;
export type TokenParameters = Components.Schemas.TokenParameters;
