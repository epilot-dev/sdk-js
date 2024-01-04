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
        export type Assignable = AssignableUser | AssignablePartnerUser | AssignableOrganization | AssignableEcpPlaceholder;
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
             * 456
             */
            user_id: string;
            /**
             * example:
             * Email of ECP Placeholder
             */
            email?: string;
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
             * 456
             */
            user_id?: string;
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
        export interface SearchGeolocation {
            /**
             * Address text to convert into geolocation coordinates
             * example:
             * Auweg 1, 93055 Regensburg, DE
             */
            address: string;
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
    namespace BatchGetAssignable {
        export type RequestBody = {
            /**
             * user id of assignable
             */
            user_id: string;
            /**
             * organization id of assignable (optional, defaults to caller org)
             */
            org_id?: string;
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
    namespace InvitePartner {
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
    namespace ResendPartnerInvitation {
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
        export interface RequestBody {
            /**
             * Language for partner invitation email
             */
            language?: "en" | "de";
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
             * filter results to specific types of assignables. defaults to all types
             */
            types?: ("user" | "partner_user" | "partner_organization" | "ecp")[];
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
}

export interface OperationMethods {
  /**
   * invitePartner - invitePartner
   * 
   * Create a new partner in partner directory and send an invite email to accept request
   */
  'invitePartner'(
    parameters?: Parameters<Paths.InvitePartner.PathParameters> | null,
    data?: Paths.InvitePartner.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvitePartner.Responses.$200>
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
   * resendPartnerInvitation - resendPartnerInvitation
   * 
   * Resend partner invitation email
   */
  'resendPartnerInvitation'(
    parameters?: Parameters<Paths.ResendPartnerInvitation.PathParameters> | null,
    data?: Paths.ResendPartnerInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResendPartnerInvitation.Responses.$200>
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
}

export interface PathsDictionary {
  ['/v1/partners/{id}/invite']: {
    /**
     * invitePartner - invitePartner
     * 
     * Create a new partner in partner directory and send an invite email to accept request
     */
    'post'(
      parameters?: Parameters<Paths.InvitePartner.PathParameters> | null,
      data?: Paths.InvitePartner.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvitePartner.Responses.$200>
  }
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
  ['/v1/partners/{id}/invite:resendEmail']: {
    /**
     * resendPartnerInvitation - resendPartnerInvitation
     * 
     * Resend partner invitation email
     */
    'post'(
      parameters?: Parameters<Paths.ResendPartnerInvitation.PathParameters> | null,
      data?: Paths.ResendPartnerInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResendPartnerInvitation.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
