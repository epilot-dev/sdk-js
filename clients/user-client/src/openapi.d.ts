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
        export interface Organization {
            id?: string;
            type?: "Vendor" | "Partner";
            /**
             * example:
             * Epilot
             */
            name?: string | null;
            /**
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
            /**
             * example:
             * EPI
             */
            symbol?: string | null;
            /**
             * example:
             * professional
             */
            pricing_tier?: string | null;
            /**
             * example:
             * someone@epilot.cloud
             */
            email?: string | null;
            /**
             * example:
             * 49123123123
             */
            phone?: string | null;
            /**
             * example:
             * https://epilot.cloud
             */
            website?: string | null;
            address?: {
                country?: string | null;
                city?: string | null;
                postal_code?: string | null;
                street?: string | null;
                street_number?: string | null;
            };
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_url?: string | null;
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_thumbnail_url?: string | null;
            /**
             * example:
             * false
             */
            is_unlicensed_org?: boolean | null;
        }
        export interface OrganizationDetail {
            [name: string]: any;
            type: "Vendor" | "Partner";
            /**
             * example:
             * Epilot
             */
            name: string;
            /**
             * example:
             * professional
             */
            pricing_tier: string;
            email: string;
            phone?: string;
            website?: string;
            /**
             * example:
             * false
             */
            is_privacy_policy_checked?: boolean | null;
            /**
             * example:
             * false
             */
            is_terms_and_conditions_checked?: boolean | null;
        }
        export type OrganizationId = string;
        export type PartnerInvitationToken = string;
        export type Query = string;
        export interface SignupUserPayload {
            organization_detail?: {
                [name: string]: any;
                type: "Vendor" | "Partner";
                /**
                 * example:
                 * Epilot
                 */
                name: string;
                /**
                 * example:
                 * professional
                 */
                pricing_tier: string;
                email: string;
                phone?: string;
                website?: string;
                /**
                 * example:
                 * false
                 */
                is_privacy_policy_checked?: boolean | null;
                /**
                 * example:
                 * false
                 */
                is_terms_and_conditions_checked?: boolean | null;
            };
            user_detail?: {
                /**
                 * example:
                 * Example user
                 */
                full_name: string;
                email: string; // email
                /**
                 * User's password
                 * example:
                 * AKjhdakjsdh@!34
                 */
                password: string;
            };
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
        }
        export interface User {
            id: string;
            organization_id: string;
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
        export interface UserDetail {
            /**
             * example:
             * Example user
             */
            full_name: string;
            email: string; // email
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password: string;
        }
        export type UserId = string;
        export interface UserInvitationPayload {
            /**
             * Email address of the address
             * example:
             * test@example.com
             */
            email?: string;
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
            roles?: string[];
        }
        export interface UserV2 {
            id?: string;
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
        export interface UserVerificationPayload {
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password?: string;
        }
        export type Username = string;
        export type VerificationToken = string;
    }
}
declare namespace Paths {
    namespace ActivateUser {
        namespace Parameters {
            export type Token = string;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export interface RequestBody {
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
        namespace Responses {
            export interface $200 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteUserV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                id: string;
                organization_id: string;
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
        }
    }
    namespace GetMe {
        namespace Responses {
            export interface $200 {
                id: string;
                organization_id: string;
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
        }
    }
    namespace GetMeV2 {
        namespace Responses {
            export interface $200 {
                id?: string;
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
    namespace GetUser {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                id: string;
                organization_id: string;
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
        }
    }
    namespace GetUserLoginParameters {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export interface $200 {
                login_parameters?: {
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
                }[];
            }
        }
    }
    namespace GetUserLoginParametersV2 {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export interface $200 {
                login_parameters?: {
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
                }[];
            }
        }
    }
    namespace GetUserV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                id?: string;
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
    namespace InviteUser {
        export interface RequestBody {
            /**
             * Email address of the address
             * example:
             * test@example.com
             */
            email?: string;
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
            roles?: string[];
        }
        namespace Responses {
            export interface $201 {
                id?: string;
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
            export interface $400 {
            }
        }
    }
    namespace ListUsers {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
            export type OrgIds = string[];
            export type Query = string;
        }
        export interface QueryParameters {
            org_ids?: Parameters.OrgIds;
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                users?: {
                    id: string;
                    organization_id: string;
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
                }[];
            }
        }
    }
    namespace ListUsersV2 {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
            export type Query = string;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                results?: {
                    id?: string;
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
                }[];
            }
        }
    }
    namespace ResendUserInvitation {
        export interface RequestBody {
            /**
             * Email address of the address
             * example:
             * test@example.com
             */
            email?: string;
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
        }
        namespace Responses {
            export interface $200 {
                id?: string;
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
            export interface $400 {
            }
        }
    }
    namespace SignUpUser {
        namespace Parameters {
            export type Token = string;
        }
        export interface QueryParameters {
            token?: Parameters.Token;
        }
        export interface RequestBody {
            organization_detail?: {
                [name: string]: any;
                type: "Vendor" | "Partner";
                /**
                 * example:
                 * Epilot
                 */
                name: string;
                /**
                 * example:
                 * professional
                 */
                pricing_tier: string;
                email: string;
                phone?: string;
                website?: string;
                /**
                 * example:
                 * false
                 */
                is_privacy_policy_checked?: boolean | null;
                /**
                 * example:
                 * false
                 */
                is_terms_and_conditions_checked?: boolean | null;
            };
            user_detail?: {
                /**
                 * example:
                 * Example user
                 */
                full_name: string;
                email: string; // email
                /**
                 * User's password
                 * example:
                 * AKjhdakjsdh@!34
                 */
                password: string;
            };
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
        }
        namespace Responses {
            export interface $200 {
                user?: {
                    id: string;
                    organization_id: string;
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
                };
                organization?: {
                    id?: string;
                    type?: "Vendor" | "Partner";
                    /**
                     * example:
                     * Epilot
                     */
                    name?: string | null;
                    /**
                     * example:
                     * <p>Thanks</p>
                     */
                    signature?: string | null;
                    /**
                     * example:
                     * EPI
                     */
                    symbol?: string | null;
                    /**
                     * example:
                     * professional
                     */
                    pricing_tier?: string | null;
                    /**
                     * example:
                     * someone@epilot.cloud
                     */
                    email?: string | null;
                    /**
                     * example:
                     * 49123123123
                     */
                    phone?: string | null;
                    /**
                     * example:
                     * https://epilot.cloud
                     */
                    website?: string | null;
                    address?: {
                        country?: string | null;
                        city?: string | null;
                        postal_code?: string | null;
                        street?: string | null;
                        street_number?: string | null;
                    };
                    /**
                     * example:
                     * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
                     */
                    logo_url?: string | null;
                    /**
                     * example:
                     * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
                     */
                    logo_thumbnail_url?: string | null;
                    /**
                     * example:
                     * false
                     */
                    is_unlicensed_org?: boolean | null;
                };
            }
        }
    }
    namespace UpdateUserV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface RequestBody {
            id?: string;
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
        namespace Responses {
            export interface $200 {
                id?: string;
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
    namespace VerifyEmailWithToken {
        namespace Parameters {
            export type Token = string;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export interface RequestBody {
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password?: string;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $404 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * signUpUser - signUpUser
   */
  'signUpUser'(
    parameters?: Parameters<Paths.SignUpUser.QueryParameters> | null,
    data?: Paths.SignUpUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SignUpUser.Responses.$200>
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
   * Get user details by user id
   */
  'getUserV2'(
    parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserV2.Responses.$200>
  /**
   * updateUserV2 - updateUserV2
   * 
   * Update user details
   */
  'updateUserV2'(
    parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
    data?: Paths.UpdateUserV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
  /**
   * deleteUserV2 - deleteUserV2
   * 
   * Delete user by user id
   */
  'deleteUserV2'(
    parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  /**
   * inviteUser - inviteUser
   * 
   * Creates a new user in the caller's organization and sends an invite email to activate
   */
  'inviteUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InviteUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InviteUser.Responses.$201>
  /**
   * resendUserInvitation - resendUserInvitation
   * 
   * Resend user invitation email
   */
  'resendUserInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResendUserInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResendUserInvitation.Responses.$200>
  /**
   * verifyEmailWithToken - verifyEmailWithToken
   * 
   * Update new email using an verification token
   */
  'verifyEmailWithToken'(
    parameters?: Parameters<Paths.VerifyEmailWithToken.QueryParameters> | null,
    data?: Paths.VerifyEmailWithToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyEmailWithToken.Responses.$200>
  /**
   * activateUser - activateUser
   * 
   * Activate user using an invite token
   */
  'activateUser'(
    parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
    data?: Paths.ActivateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateUser.Responses.$200>
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
}

export interface PathsDictionary {
  ['/v2/users/public/signup']: {
    /**
     * signUpUser - signUpUser
     */
    'post'(
      parameters?: Parameters<Paths.SignUpUser.QueryParameters> | null,
      data?: Paths.SignUpUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SignUpUser.Responses.$200>
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
     * Get user details by user id
     */
    'get'(
      parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserV2.Responses.$200>
    /**
     * updateUserV2 - updateUserV2
     * 
     * Update user details
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
      data?: Paths.UpdateUserV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
    /**
     * deleteUserV2 - deleteUserV2
     * 
     * Delete user by user id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  }
  ['/v2/users/invite']: {
    /**
     * inviteUser - inviteUser
     * 
     * Creates a new user in the caller's organization and sends an invite email to activate
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InviteUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InviteUser.Responses.$201>
  }
  ['/v2/users/invite:resendEmail']: {
    /**
     * resendUserInvitation - resendUserInvitation
     * 
     * Resend user invitation email
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResendUserInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResendUserInvitation.Responses.$200>
  }
  ['/v2/users/public/verifyEmail']: {
    /**
     * verifyEmailWithToken - verifyEmailWithToken
     * 
     * Update new email using an verification token
     */
    'post'(
      parameters?: Parameters<Paths.VerifyEmailWithToken.QueryParameters> | null,
      data?: Paths.VerifyEmailWithToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyEmailWithToken.Responses.$200>
  }
  ['/v2/users/public/activate']: {
    /**
     * activateUser - activateUser
     * 
     * Activate user using an invite token
     */
    'post'(
      parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
      data?: Paths.ActivateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateUser.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
