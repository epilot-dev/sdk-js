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
        export interface CognitoDetails {
            /**
             * example:
             * eu-central-1
             */
            cognito_region?: string;
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
             * arn:aws:cognito-idp:eu-central-1:123456789012:userpool/eu-central-sample
             */
            cognito_user_pool_arn?: string;
        }
        export interface CreateGroupReq {
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name: string;
            /**
             * The list of user ids in the group.
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            user_ids?: /* User's unique identifier */ UserId[];
        }
        export interface DataPoint {
            /**
             * Organization id
             * example:
             * 206801
             */
            id?: number;
            /**
             * Number of current user
             * example:
             * 10
             */
            actual_users?: number;
            /**
             * Max user last month
             * example:
             * 10
             */
            max_users_last_month?: number;
            /**
             * Max non-billable user last month
             * example:
             * 10
             */
            non_billable_users_last_month?: number;
        }
        export type DataPointsResponse = DataPoint[];
        export interface Group {
            id: /* Group unique identifier */ GroupId;
            org_id: OrganizationId;
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name: string;
            /**
             * example:
             * 2024-02-08T04:44:32.246Z
             */
            created_at: string;
            /**
             * example:
             * 2024-02-08T04:44:32.246Z
             */
            updated_at: string;
            /**
             * The user id of the user that created the group.
             * example:
             * 123
             */
            created_by?: string;
            /**
             * The current user assignee of the group. This is the user, from within the group, that has last been assigned to a workflow task.
             */
            crt_assignee?: {
                id?: /* User's unique identifier */ UserId;
                organization_id?: OrganizationId;
                created_at?: string; // date-time
                activated_at?: string; // date-time
                /**
                 * User's display name (default: email address)
                 * example:
                 * Example User
                 */
                display_name?: string;
                status?: "Active" | "Pending" | "Deactivated" | "Deleted";
                /**
                 * User's email address
                 */
                email?: string; // email
                /**
                 * User's pending email address
                 */
                draft_email?: string | null; // email
                /**
                 * User's department
                 * example:
                 * Sales
                 */
                department?: string | null;
                /**
                 * User's phone number
                 * example:
                 * 1234567890
                 */
                phone?: string | null;
                /**
                 * User's secondary phone number, preferred for communication
                 * example:
                 * 1234567890
                 */
                secondary_phone?: string | null;
                /**
                 * User's multi-factor authentication status
                 * example:
                 * false
                 */
                mfa_enabled?: boolean;
                /**
                 * User's phone number verification status
                 * example:
                 * true
                 */
                phone_verified?: boolean;
                token?: /* Token used to invite a user to epilot */ InviteToken;
                /**
                 * User's email signature
                 * example:
                 * <p>Thanks</p>
                 */
                signature?: string | null;
                /**
                 * Whether the user's signature is enabled
                 * example:
                 * true
                 */
                is_signature_enabled?: boolean | null;
                /**
                 * User's preferred language
                 * example:
                 * de
                 */
                preferred_language?: string;
                /**
                 * User's start page after login
                 */
                custom_start_page?: string | null; // ^/app/*
                /**
                 * This field is used to override the release channel for the user.
                 */
                override_release_channel?: "canary" | "rc" | "stable" | null;
                /**
                 * User's feature preferences
                 * example:
                 * {
                 *   "feature_name": true
                 * }
                 */
                feature_preferences?: {
                    [name: string]: any;
                } | null;
                /**
                 * User's custom profile image
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
                } | null;
                /**
                 * example:
                 * {
                 *   "entity_views": {
                 *     "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
                 *     "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
                 *   },
                 *   "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
                 * }
                 */
                favorites?: {
                    [name: string]: any;
                };
                /**
                 * example:
                 * {
                 *   "added_participant_opportunity": true,
                 *   "assigned_opportunity": true,
                 *   "assigned_task": true,
                 *   "comment_opportunity": true,
                 *   "deleted_task": true,
                 *   "escalated_task": true,
                 *   "message_receive_opportunity": true,
                 *   "message_send_opportunity": true,
                 *   "created_task": true,
                 *   "created_opportunity_manual": true,
                 *   "created_opportunity_auto": true,
                 *   "deleted_opportunity": true
                 * }
                 */
                email_notification_setting?: {
                    [name: string]: any;
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
                /**
                 * The index of the current assignee in the group's user list.
                 * example:
                 * 3
                 */
                crt_index?: number;
            };
            /**
             * The list of users in the group. Only contains the full user when respective endpoint is called with a flag. Otherwise only contains the user id.
             */
            users?: UserV2[];
        }
        /**
         * Group unique identifier
         */
        export type GroupId = string;
        export type Hydrate = boolean;
        /**
         * Token used to invite a user to epilot
         */
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
             * Production
             */
            organization_use?: string;
            /**
             * example:
             * eu-central-1
             */
            cognito_region?: string;
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
            id?: OrganizationId;
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
            cognito_details?: CognitoDetails;
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
        /**
         * Token used to invite a partner user to epilot
         */
        export type PartnerInvitationToken = string;
        export type Query = string;
        export interface SignupUserPayload {
            organization_detail?: OrganizationDetail;
            user_detail?: UserDetail;
            /**
             * Language for user invitation email
             */
            language?: "en" | "de";
        }
        export interface UpdateGroupReq {
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name?: string;
            /**
             * The list of user ids in the group.
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            user_ids?: /* User's unique identifier */ UserId[];
        }
        export interface User {
            id: /* User's unique identifier */ UserId;
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
            } | null;
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
        /**
         * User's unique identifier
         */
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
            id?: /* User's unique identifier */ UserId;
            organization_id?: OrganizationId;
            created_at?: string; // date-time
            activated_at?: string; // date-time
            /**
             * User's display name (default: email address)
             * example:
             * Example User
             */
            display_name?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * User's email address
             */
            email?: string; // email
            /**
             * User's pending email address
             */
            draft_email?: string | null; // email
            /**
             * User's department
             * example:
             * Sales
             */
            department?: string | null;
            /**
             * User's phone number
             * example:
             * 1234567890
             */
            phone?: string | null;
            /**
             * User's secondary phone number, preferred for communication
             * example:
             * 1234567890
             */
            secondary_phone?: string | null;
            /**
             * User's multi-factor authentication status
             * example:
             * false
             */
            mfa_enabled?: boolean;
            /**
             * User's phone number verification status
             * example:
             * true
             */
            phone_verified?: boolean;
            token?: /* Token used to invite a user to epilot */ InviteToken;
            /**
             * User's email signature
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
            /**
             * Whether the user's signature is enabled
             * example:
             * true
             */
            is_signature_enabled?: boolean | null;
            /**
             * User's preferred language
             * example:
             * de
             */
            preferred_language?: string;
            /**
             * User's start page after login
             */
            custom_start_page?: string | null; // ^/app/*
            /**
             * This field is used to override the release channel for the user.
             */
            override_release_channel?: "canary" | "rc" | "stable" | null;
            /**
             * User's feature preferences
             * example:
             * {
             *   "feature_name": true
             * }
             */
            feature_preferences?: {
                [name: string]: any;
            } | null;
            /**
             * User's custom profile image
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
            } | null;
            /**
             * example:
             * {
             *   "entity_views": {
             *     "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
             *     "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
             *   },
             *   "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
             * }
             */
            favorites?: {
                [name: string]: any;
            };
            /**
             * example:
             * {
             *   "added_participant_opportunity": true,
             *   "assigned_opportunity": true,
             *   "assigned_task": true,
             *   "comment_opportunity": true,
             *   "deleted_task": true,
             *   "escalated_task": true,
             *   "message_receive_opportunity": true,
             *   "message_send_opportunity": true,
             *   "created_task": true,
             *   "created_opportunity_manual": true,
             *   "created_opportunity_auto": true,
             *   "deleted_opportunity": true
             * }
             */
            email_notification_setting?: {
                [name: string]: any;
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
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.UserActivationPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace AdvanceUserAssignment {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group;
            export interface $404 {
            }
            export interface $422 {
            }
        }
    }
    namespace CheckInviteToken {
        namespace Parameters {
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Organization ID of the organization that invited the user
                 */
                invitation_org_id: string;
                /**
                 * Name of the organization that invited the user
                 */
                invitation_org_name: string;
                /**
                 * Logo URL of the organization that invited the user
                 */
                invitation_org_logo_url?: string;
                /**
                 * Logo Thumbnail URL of the organization that invited the user
                 */
                invitation_org_logo_thumbnail_url?: string;
                /**
                 * User ID of the invited user
                 */
                invitee_user_id: string;
                /**
                 * Organization ID of the primary organization of the user (when inviting an existing epilot user)
                 */
                invitee_primary_org_id?: string;
            }
            export interface $404 {
            }
        }
    }
    namespace CreateGroup {
        export type RequestBody = Components.Schemas.CreateGroupReq;
        namespace Responses {
            export type $201 = Components.Schemas.Group;
        }
    }
    namespace DeleteGroup {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeleteUserV2 {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace GetGroup {
        namespace Parameters {
            export type Hydrate = Components.Schemas.Hydrate;
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group;
            export interface $404 {
            }
        }
    }
    namespace GetGroups {
        namespace Parameters {
            export type Hydrate = Components.Schemas.Hydrate;
            export type Limit = Components.Schemas.Limit;
            export type Offset = Components.Schemas.Offset;
            export type Query = Components.Schemas.Query;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                hits?: number;
                groups?: Components.Schemas.Group[];
            }
        }
    }
    namespace GetGroupsForUser {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group[];
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
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
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
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
        }
    }
    namespace InviteUser {
        export type RequestBody = Components.Schemas.UserInvitationPayload;
        namespace Responses {
            export type $201 = Components.Schemas.UserV2;
            export interface $400 {
            }
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
    namespace RejectInvite {
        namespace Parameters {
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
            }
            export interface $404 {
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
            export type $200 = Components.Schemas.UserV2;
            export interface $400 {
            }
        }
    }
    namespace SignUpUser {
        namespace Parameters {
            export type Token = /* Token used to invite a partner user to epilot */ Components.Schemas.PartnerInvitationToken;
        }
        export interface QueryParameters {
            token?: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.SignupUserPayload;
        namespace Responses {
            export interface $200 {
                user?: Components.Schemas.User;
                organization?: Components.Schemas.Organization;
            }
        }
    }
    namespace SwitchOrganization {
        export interface RequestBody {
            org_id: Components.Schemas.OrganizationId;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * A login token for the new organization to be used with CUSTOM_AUTH flow against login parameters
                 */
                login_token: string;
            }
        }
    }
    namespace UpdateGroup {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateGroupReq;
        namespace Responses {
            export type $201 = Components.Schemas.Group;
            export interface $404 {
            }
        }
    }
    namespace UpdateUserV2 {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UserV2;
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
        }
    }
    namespace VerifyEmailWithToken {
        namespace Parameters {
            export type Token = Components.Schemas.VerificationToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.UserVerificationPayload;
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
   * Creates a new user in the caller's organization and sends an invite email to activate the user
   * 
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
   * getGroupsForUser - getGroupsForUser
   * 
   * Get groups of a user
   */
  'getGroupsForUser'(
    parameters?: Parameters<Paths.GetGroupsForUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupsForUser.Responses.$200>
  /**
   * getGroups - getGroups
   * 
   * Lists groups in organizations you have access to
   */
  'getGroups'(
    parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroups.Responses.$200>
  /**
   * createGroup - createGroup
   * 
   * Create a new group
   */
  'createGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateGroup.Responses.$201>
  /**
   * getGroup - getGroup
   * 
   * Get group by id
   */
  'getGroup'(
    parameters?: Parameters<Paths.GetGroup.QueryParameters & Paths.GetGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroup.Responses.$200>
  /**
   * updateGroup - updateGroup
   * 
   * Update group by id
   */
  'updateGroup'(
    parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
    data?: Paths.UpdateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateGroup.Responses.$201>
  /**
   * deleteGroup - deleteGroup
   * 
   * Delete group by id
   */
  'deleteGroup'(
    parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteGroup.Responses.$204>
  /**
   * advanceUserAssignment - advanceUserAssignment
   * 
   * Advance user assignment to next user in line
   */
  'advanceUserAssignment'(
    parameters?: Parameters<Paths.AdvanceUserAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvanceUserAssignment.Responses.$200>
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
   * checkInviteToken - checkInviteToken
   * 
   * Check an invite token
   */
  'checkInviteToken'(
    parameters?: Parameters<Paths.CheckInviteToken.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CheckInviteToken.Responses.$200>
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
   * rejectInvite - rejectInvite
   * 
   * Reject an invite
   */
  'rejectInvite'(
    parameters?: Parameters<Paths.RejectInvite.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectInvite.Responses.$200>
  /**
   * getUserLoginParametersV2 - getUserLoginParametersV2
   * 
   * Get user organization login parameters by username
   * 
   * The first item in the list corresponds to the user's primary organization and must be used for initial login.
   * 
   */
  'getUserLoginParametersV2'(
    parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
  /**
   * switchOrganization - switchOrganization
   * 
   * Switch to another organization the user is part of
   */
  'switchOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SwitchOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SwitchOrganization.Responses.$200>
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
     * Creates a new user in the caller's organization and sends an invite email to activate the user
     * 
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
  ['/v2/users/{id}/groups']: {
    /**
     * getGroupsForUser - getGroupsForUser
     * 
     * Get groups of a user
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupsForUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupsForUser.Responses.$200>
  }
  ['/v1/groups']: {
    /**
     * getGroups - getGroups
     * 
     * Lists groups in organizations you have access to
     */
    'get'(
      parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroups.Responses.$200>
    /**
     * createGroup - createGroup
     * 
     * Create a new group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateGroup.Responses.$201>
  }
  ['/v1/groups/{id}']: {
    /**
     * getGroup - getGroup
     * 
     * Get group by id
     */
    'get'(
      parameters?: Parameters<Paths.GetGroup.QueryParameters & Paths.GetGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroup.Responses.$200>
    /**
     * updateGroup - updateGroup
     * 
     * Update group by id
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
      data?: Paths.UpdateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateGroup.Responses.$201>
    /**
     * deleteGroup - deleteGroup
     * 
     * Delete group by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteGroup.Responses.$204>
  }
  ['/v1/groups/{id}/user:next']: {
    /**
     * advanceUserAssignment - advanceUserAssignment
     * 
     * Advance user assignment to next user in line
     */
    'post'(
      parameters?: Parameters<Paths.AdvanceUserAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvanceUserAssignment.Responses.$200>
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
  ['/v2/users/public/checkToken']: {
    /**
     * checkInviteToken - checkInviteToken
     * 
     * Check an invite token
     */
    'get'(
      parameters?: Parameters<Paths.CheckInviteToken.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CheckInviteToken.Responses.$200>
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
  ['/v2/users/public/reject']: {
    /**
     * rejectInvite - rejectInvite
     * 
     * Reject an invite
     */
    'delete'(
      parameters?: Parameters<Paths.RejectInvite.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectInvite.Responses.$200>
  }
  ['/v2/users/public/username/{username}:getLoginParameters']: {
    /**
     * getUserLoginParametersV2 - getUserLoginParametersV2
     * 
     * Get user organization login parameters by username
     * 
     * The first item in the list corresponds to the user's primary organization and must be used for initial login.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
  }
  ['/v2/users/switchOrganization']: {
    /**
     * switchOrganization - switchOrganization
     * 
     * Switch to another organization the user is part of
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SwitchOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SwitchOrganization.Responses.$200>
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


export type CognitoDetails = Components.Schemas.CognitoDetails;
export type CreateGroupReq = Components.Schemas.CreateGroupReq;
export type DataPoint = Components.Schemas.DataPoint;
export type DataPointsResponse = Components.Schemas.DataPointsResponse;
export type Group = Components.Schemas.Group;
export type GroupId = Components.Schemas.GroupId;
export type Hydrate = Components.Schemas.Hydrate;
export type InviteToken = Components.Schemas.InviteToken;
export type Limit = Components.Schemas.Limit;
export type LoginParameters = Components.Schemas.LoginParameters;
export type Offset = Components.Schemas.Offset;
export type Organization = Components.Schemas.Organization;
export type OrganizationDetail = Components.Schemas.OrganizationDetail;
export type OrganizationId = Components.Schemas.OrganizationId;
export type PartnerInvitationToken = Components.Schemas.PartnerInvitationToken;
export type Query = Components.Schemas.Query;
export type SignupUserPayload = Components.Schemas.SignupUserPayload;
export type UpdateGroupReq = Components.Schemas.UpdateGroupReq;
export type User = Components.Schemas.User;
export type UserActivationPayload = Components.Schemas.UserActivationPayload;
export type UserDetail = Components.Schemas.UserDetail;
export type UserId = Components.Schemas.UserId;
export type UserInvitationPayload = Components.Schemas.UserInvitationPayload;
export type UserV2 = Components.Schemas.UserV2;
export type UserVerificationPayload = Components.Schemas.UserVerificationPayload;
export type Username = Components.Schemas.Username;
export type VerificationToken = Components.Schemas.VerificationToken;
