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
        export type InviteToken = string;
        export type OrganizationId = string;
        export interface Partner {
            id?: Partner;
            organization_id?: OrganizationId;
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
        export type PartnerId = string;
        export interface PartnerInvitationPayload {
            /**
             * Language for partner invitation email
             */
            language?: "en" | "de";
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
            export type Id = Components.Schemas.PartnerId;
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
            export type Id = Components.Schemas.PartnerId;
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
            export type Id = Components.Schemas.PartnerId;
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
            export type Id = Components.Schemas.PartnerId;
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
