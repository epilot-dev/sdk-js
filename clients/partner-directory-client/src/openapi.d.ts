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
        export interface ActivatePartnerPayload {
            /**
             * Company name
             * example:
             * Company name
             */
            company_name?: string;
            /**
             * Email using to sign up
             */
            signed_up_email: string; // email
            /**
             * organization id
             */
            organization_id: string;
        }
        export interface Address {
            /**
             * Street
             * example:
             * Auweg
             */
            street?: string;
            /**
             * Street
             * example:
             * 10
             */
            street_number?: string;
            /**
             * City
             * example:
             * Regensburg
             */
            city?: string;
            /**
             * Postal code
             * example:
             * 93055
             */
            postal_code?: string;
            /**
             * Country
             * example:
             * DE
             */
            country?: string;
        }
        export interface AddressGeolocation {
            address: Address;
            /**
             * Latitude
             * example:
             * 49.013
             */
            lat: number;
            /**
             * Longitude
             * example:
             * 12.101
             */
            lng: number;
            /**
             * Full address label as returned by the location service
             */
            addressLabel?: string;
            /**
             * Relevance of the result. A number between 0 and 1. Closer to 1 means more relevant
             */
            relevance?: number;
        }
        export interface AssignRolesPayload {
            /**
             * Array of role IDs to assign/unassign
             * example:
             * [
             *   "role-123",
             *   "role-456"
             * ]
             */
            roleIds: string[];
        }
        export type Assignable = AssignableUser | AssignablePartnerUser | AssignableOrganization | AssignableEcpPlaceholder | AssignableGroup;
        export interface AssignableEcpPlaceholder {
            /**
             * example:
             * ecp
             */
            type: "ecp";
            /**
             * example:
             * Example Ecp Placeholder
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * example:
             * 456
             */
            user_id: string;
            /**
             * example:
             * Email of ECP Placeholder
             */
            email?: string;
        }
        export interface AssignableGroup {
            /**
             * example:
             * user
             */
            type: string;
            /**
             * example:
             * Example User
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * example:
             * 456
             */
            group_id?: string;
        }
        export interface AssignableOrganization {
            /**
             * example:
             * partner_organization
             */
            type: "partner_organization";
            /**
             * example:
             * Example Partner Organization
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            partner_id: /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            PartnerId;
            /**
             * example:
             * Email of Partner Organization
             */
            email?: string;
            geolocations?: AddressGeolocation[];
            /**
             * example:
             * Phone number of Partner
             */
            phone?: string;
            /**
             * Activity radius, in km, the partner is operating in
             * example:
             * 50
             */
            activity_radius?: number;
        }
        export interface AssignablePartnerUser {
            /**
             * example:
             * partner_user
             */
            type: "partner_user";
            /**
             * example:
             * Example Partner User
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            partner_id?: /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            PartnerId;
            /**
             * example:
             * 456
             */
            user_id?: string;
            /**
             * example:
             * example@example.com
             */
            email?: string;
        }
        export interface AssignableUser {
            /**
             * example:
             * user
             */
            type: "user";
            /**
             * example:
             * Example User
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * example:
             * 456
             */
            user_id?: string;
            /**
             * example:
             * example@example.com
             */
            email?: string;
        }
        export interface BaseAssignable {
            /**
             * example:
             * user
             */
            type: string;
            /**
             * example:
             * Example User
             */
            display_name: string;
            image_uri?: {
                /**
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            org_id: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string;
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
        }
        export interface CreatePartnerUserPayload {
            /**
             * User email address
             * example:
             * user@example.com
             */
            email: string; // email
            /**
             * User display name
             * example:
             * John Doe
             */
            display_name?: string;
            /**
             * User phone number
             * example:
             * +1234567890
             */
            phone?: string;
        }
        export interface Geolocation {
            /**
             * Latitude
             * example:
             * 49.013
             */
            lat: number;
            /**
             * Longitude
             * example:
             * 12.101
             */
            lng: number;
            /**
             * Full address label as returned by the location service
             */
            addressLabel?: string;
            /**
             * Relevance of the result. A number between 0 and 1. Closer to 1 means more relevant
             */
            relevance?: number;
        }
        export type InviteToken = string;
        /**
         * example:
         * 123
         */
        export type OrganizationId = string;
        export interface Partner {
            id?: /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            PartnerId;
            organization_id?: /**
             * example:
             * 123
             */
            OrganizationId;
            /**
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string;
            /**
             * Description
             * example:
             * Description
             */
            description?: string;
            /**
             * Company name
             * example:
             * Company name
             */
            company_name?: string;
            /**
             * Invitation token
             */
            invitation_token?: string;
            /**
             * Email using to receive invitation
             */
            invitation_email?: string; // email
            /**
             * Email using to receive invitation
             */
            email?: string; // email
            /**
             * Email using to sign up
             */
            signed_up_email?: string; // email
            /**
             * Target Organization
             * example:
             * 123456
             */
            partner_org_id?: string;
            status?: "Pending" | "Request" | "Deleted" | "Invited" | "Rejected";
        }
        /**
         * example:
         * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
         */
        export type PartnerId = string;
        export interface PartnerInvitationPayload {
            /**
             * Language for partner invitation email
             */
            language?: "en" | "de";
        }
        export interface PartnerRole {
            /**
             * Role ID
             * example:
             * role-123
             */
            id: string;
            /**
             * Role slug
             * example:
             * admin
             */
            slug: string;
            /**
             * Role name
             * example:
             * Administrator
             */
            name: string;
            /**
             * Role type
             * example:
             * share_role
             */
            type?: string;
        }
        export interface PartnerUser {
            /**
             * User ID
             * example:
             * 456
             */
            id: string;
            /**
             * User name
             * example:
             * John Doe
             */
            name?: string;
            /**
             * User email
             * example:
             * user@example.com
             */
            email: string; // email
            /**
             * User status
             * example:
             * Active
             */
            status: string;
            image?: {
                /**
                 * Original image URI
                 */
                original?: string; // uri
                /**
                 * Thumbnail image URI (32x32)
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * List of roles assigned to the user
             */
            roles: {
                /**
                 * Role ID
                 * example:
                 * role-123
                 */
                id: string;
                /**
                 * Role slug
                 * example:
                 * admin
                 */
                slug: string;
                /**
                 * Role name
                 * example:
                 * Administrator
                 */
                name: string;
            }[];
        }
        export interface SearchGeolocation {
            /**
             * Address text to convert into geolocation coordinates
             * example:
             * Auweg 1, 93055 Regensburg, DE
             */
            address: string;
        }
        export interface User {
            /**
             * User ID
             * example:
             * 456
             */
            id?: string;
            /**
             * User email
             * example:
             * user@example.com
             */
            email?: string; // email
            /**
             * User display name
             * example:
             * John Doe
             */
            display_name?: string;
            /**
             * User status
             * example:
             * Active
             */
            status?: string;
        }
    }
}
declare namespace Paths {
    namespace ActivatePartner {
        namespace Parameters {
            export type Token = Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.ActivatePartnerPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $404 {
            }
        }
    }
    namespace ApprovePartner {
        namespace Parameters {
            export type Id = /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $201 = Components.Schemas.Partner;
            export interface $400 {
            }
        }
    }
    namespace AssignPartnerUserRoles {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.AssignRolesPayload;
        namespace Responses {
            export interface $200 {
                results?: {
                    roleId?: string;
                    success?: boolean;
                    data?: {
                        [key: string]: any;
                    };
                    error?: {
                        [key: string]: any;
                    };
                }[];
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace BatchGetAssignable {
        export type RequestBody = {
            /**
             * user id of assignable
             */
            user_id?: string;
            /**
             * organization id of assignable (optional, defaults to caller org)
             */
            org_id?: string;
            /**
             * group id of assignable (optional)
             */
            group_id?: string;
        }[];
        namespace Responses {
            export interface $200 {
                /**
                 * total number of search results
                 * example:
                 * 25
                 */
                hits?: number;
                results?: Components.Schemas.Assignable[];
            }
        }
    }
    namespace CreatePartnerUser {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        export type RequestBody = Components.Schemas.CreatePartnerUserPayload;
        namespace Responses {
            export type $201 = Components.Schemas.User;
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeletePartnerUser {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetPartnerByToken {
        namespace Parameters {
            export type Token = Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Partner;
            export interface $404 {
            }
        }
    }
    namespace GetPartnerRoles {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.PartnerRole[];
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetPartnerUsers {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.PartnerUser[];
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace InvitePartnerV2 {
        namespace Parameters {
            export type Id = /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PartnerInvitationPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Partner;
            export interface $400 {
            }
        }
    }
    namespace RejectPartner {
        namespace Parameters {
            export type Id = /**
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Partner;
            export interface $400 {
            }
        }
    }
    namespace SearchAssignable {
        export interface RequestBody {
            /**
             * search query to filter results
             */
            q: string;
            /**
             * start results from an offset for pagination
             */
            from?: number;
            /**
             * limit number of results to return
             */
            size?: number;
            /**
             * filter results to specific organizations. defaults to all orgs
             */
            org_ids?: /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId[];
            /**
             * Optional parameter if 'types' contains 'ecp' type user. Portal Users will only be fetched in the context of an entity, fetching the related ones through relations and not returning placeholders anymore.
             */
            portalUsersEntityIdScope?: string;
            /**
             * filter results to specific types of assignables. defaults to all types
             */
            types?: ("user" | "partner_user" | "partner_organization" | "ecp" | "group" | "parent_organization_user")[];
        }
        namespace Responses {
            export interface $200 {
                /**
                 * total number of search results
                 * example:
                 * 25
                 */
                hits?: number;
                results?: Components.Schemas.Assignable[];
            }
        }
    }
    namespace SearchGeolocationForText {
        export type RequestBody = Components.Schemas.SearchGeolocation;
        namespace Responses {
            export type $200 = Components.Schemas.Geolocation;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace UnassignPartnerUserRoles {
        namespace Parameters {
            export type OrgId = /**
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.AssignRolesPayload;
        namespace Responses {
            export interface $200 {
                results?: {
                    roleId?: string;
                    success?: boolean;
                    data?: {
                        [key: string]: any;
                    };
                    error?: {
                        [key: string]: any;
                    };
                }[];
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * approvePartner - approvePartner
   * 
   * Approve partner request
   */
  'approvePartner'(
    parameters?: Parameters<Paths.ApprovePartner.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApprovePartner.Responses.$201>
  /**
   * rejectPartner - rejectPartner
   * 
   * Reject partner request
   */
  'rejectPartner'(
    parameters?: Parameters<Paths.RejectPartner.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectPartner.Responses.$200>
  /**
   * searchAssignable - searchAssignables
   * 
   * Search for assignable users/organizations from this organization and Partners
   * 
   * Results can include:
   *  - Users in your organization
   *  - Users in partner organizations
   *  - Partner organizations
   * 
   */
  'searchAssignable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchAssignable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAssignable.Responses.$200>
  /**
   * batchGetAssignable - batchGet
   * 
   * Search for assignable users from this organization by its ids
   * 
   */
  'batchGetAssignable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BatchGetAssignable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchGetAssignable.Responses.$200>
  /**
   * getPartnerByToken - getPartnerByToken
   * 
   * Get partner by token
   */
  'getPartnerByToken'(
    parameters?: Parameters<Paths.GetPartnerByToken.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerByToken.Responses.$200>
  /**
   * activatePartner - activatePartner
   * 
   * Activate partner using an invite token
   */
  'activatePartner'(
    parameters?: Parameters<Paths.ActivatePartner.QueryParameters> | null,
    data?: Paths.ActivatePartner.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivatePartner.Responses.$200>
  /**
   * searchGeolocationForText - searchGeolocationForText
   * 
   * Converts a given string, in the format of an address, to geo-location latitude and longitude
   */
  'searchGeolocationForText'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchGeolocationForText.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchGeolocationForText.Responses.$200>
  /**
   * invitePartnerV2 - invitePartnerV2
   * 
   * Invite a partner into collaboration. It will send an email to partner and ask to join into collaboration
   */
  'invitePartnerV2'(
    parameters?: Parameters<Paths.InvitePartnerV2.PathParameters> | null,
    data?: Paths.InvitePartnerV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvitePartnerV2.Responses.$200>
  /**
   * getPartnerUsers - getPartnerUsers
   * 
   * Get all users for a partner organization with their roles
   */
  'getPartnerUsers'(
    parameters?: Parameters<Paths.GetPartnerUsers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerUsers.Responses.$200>
  /**
   * createPartnerUser - createPartnerUser
   * 
   * Create a new user in a partner organization
   */
  'createPartnerUser'(
    parameters?: Parameters<Paths.CreatePartnerUser.PathParameters> | null,
    data?: Paths.CreatePartnerUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePartnerUser.Responses.$201>
  /**
   * deletePartnerUser - deletePartnerUser
   * 
   * Delete a user from a partner organization
   */
  'deletePartnerUser'(
    parameters?: Parameters<Paths.DeletePartnerUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePartnerUser.Responses.$200>
  /**
   * getPartnerRoles - getPartnerRoles
   * 
   * Get all roles for a partner organization
   */
  'getPartnerRoles'(
    parameters?: Parameters<Paths.GetPartnerRoles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerRoles.Responses.$200>
  /**
   * assignPartnerUserRoles - assignPartnerUserRoles
   * 
   * Assign roles to a user in a partner organization
   */
  'assignPartnerUserRoles'(
    parameters?: Parameters<Paths.AssignPartnerUserRoles.PathParameters> | null,
    data?: Paths.AssignPartnerUserRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignPartnerUserRoles.Responses.$200>
  /**
   * unassignPartnerUserRoles - unassignPartnerUserRoles
   * 
   * Unassign roles from a user in a partner organization
   */
  'unassignPartnerUserRoles'(
    parameters?: Parameters<Paths.UnassignPartnerUserRoles.PathParameters> | null,
    data?: Paths.UnassignPartnerUserRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnassignPartnerUserRoles.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/partners/{id}/approve']: {
    /**
     * approvePartner - approvePartner
     * 
     * Approve partner request
     */
    'post'(
      parameters?: Parameters<Paths.ApprovePartner.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApprovePartner.Responses.$201>
  }
  ['/v1/partners/{id}/reject']: {
    /**
     * rejectPartner - rejectPartner
     * 
     * Reject partner request
     */
    'post'(
      parameters?: Parameters<Paths.RejectPartner.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectPartner.Responses.$200>
  }
  ['/v1/partners/assignables:search']: {
    /**
     * searchAssignable - searchAssignables
     * 
     * Search for assignable users/organizations from this organization and Partners
     * 
     * Results can include:
     *  - Users in your organization
     *  - Users in partner organizations
     *  - Partner organizations
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchAssignable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAssignable.Responses.$200>
  }
  ['/v1/partners/assignables:batchGet']: {
    /**
     * batchGetAssignable - batchGet
     * 
     * Search for assignable users from this organization by its ids
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BatchGetAssignable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchGetAssignable.Responses.$200>
  }
  ['/v1/partner-directory/public/getPartnerByToken']: {
    /**
     * getPartnerByToken - getPartnerByToken
     * 
     * Get partner by token
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerByToken.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerByToken.Responses.$200>
  }
  ['/v1/partner-directory/public/activate']: {
    /**
     * activatePartner - activatePartner
     * 
     * Activate partner using an invite token
     */
    'post'(
      parameters?: Parameters<Paths.ActivatePartner.QueryParameters> | null,
      data?: Paths.ActivatePartner.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivatePartner.Responses.$200>
  }
  ['/v1/geolocation/text:search']: {
    /**
     * searchGeolocationForText - searchGeolocationForText
     * 
     * Converts a given string, in the format of an address, to geo-location latitude and longitude
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchGeolocationForText.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchGeolocationForText.Responses.$200>
  }
  ['/v2/partners/{id}/invite']: {
    /**
     * invitePartnerV2 - invitePartnerV2
     * 
     * Invite a partner into collaboration. It will send an email to partner and ask to join into collaboration
     */
    'post'(
      parameters?: Parameters<Paths.InvitePartnerV2.PathParameters> | null,
      data?: Paths.InvitePartnerV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvitePartnerV2.Responses.$200>
  }
  ['/v2/partners/{orgId}/users']: {
    /**
     * getPartnerUsers - getPartnerUsers
     * 
     * Get all users for a partner organization with their roles
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerUsers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerUsers.Responses.$200>
    /**
     * createPartnerUser - createPartnerUser
     * 
     * Create a new user in a partner organization
     */
    'post'(
      parameters?: Parameters<Paths.CreatePartnerUser.PathParameters> | null,
      data?: Paths.CreatePartnerUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePartnerUser.Responses.$201>
  }
  ['/v2/partners/{orgId}/users/{userId}']: {
    /**
     * deletePartnerUser - deletePartnerUser
     * 
     * Delete a user from a partner organization
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePartnerUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePartnerUser.Responses.$200>
  }
  ['/v2/partners/{orgId}/roles']: {
    /**
     * getPartnerRoles - getPartnerRoles
     * 
     * Get all roles for a partner organization
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerRoles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerRoles.Responses.$200>
  }
  ['/v2/partners/{orgId}/users/{userId}/roles']: {
    /**
     * assignPartnerUserRoles - assignPartnerUserRoles
     * 
     * Assign roles to a user in a partner organization
     */
    'post'(
      parameters?: Parameters<Paths.AssignPartnerUserRoles.PathParameters> | null,
      data?: Paths.AssignPartnerUserRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignPartnerUserRoles.Responses.$200>
    /**
     * unassignPartnerUserRoles - unassignPartnerUserRoles
     * 
     * Unassign roles from a user in a partner organization
     */
    'delete'(
      parameters?: Parameters<Paths.UnassignPartnerUserRoles.PathParameters> | null,
      data?: Paths.UnassignPartnerUserRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnassignPartnerUserRoles.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ActivatePartnerPayload = Components.Schemas.ActivatePartnerPayload;
export type Address = Components.Schemas.Address;
export type AddressGeolocation = Components.Schemas.AddressGeolocation;
export type AssignRolesPayload = Components.Schemas.AssignRolesPayload;
export type Assignable = Components.Schemas.Assignable;
export type AssignableEcpPlaceholder = Components.Schemas.AssignableEcpPlaceholder;
export type AssignableGroup = Components.Schemas.AssignableGroup;
export type AssignableOrganization = Components.Schemas.AssignableOrganization;
export type AssignablePartnerUser = Components.Schemas.AssignablePartnerUser;
export type AssignableUser = Components.Schemas.AssignableUser;
export type BaseAssignable = Components.Schemas.BaseAssignable;
export type CreatePartnerUserPayload = Components.Schemas.CreatePartnerUserPayload;
export type Geolocation = Components.Schemas.Geolocation;
export type InviteToken = Components.Schemas.InviteToken;
export type OrganizationId = Components.Schemas.OrganizationId;
export type Partner = Components.Schemas.Partner;
export type PartnerId = Components.Schemas.PartnerId;
export type PartnerInvitationPayload = Components.Schemas.PartnerInvitationPayload;
export type PartnerRole = Components.Schemas.PartnerRole;
export type PartnerUser = Components.Schemas.PartnerUser;
export type SearchGeolocation = Components.Schemas.SearchGeolocation;
export type User = Components.Schemas.User;
