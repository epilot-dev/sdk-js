/* Auto-copied from sharing-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type PartnerOrgIdPath = string;
    }
    export interface PathParameters {
        PartnerOrgIdPath?: Parameters.PartnerOrgIdPath;
    }
    namespace Schemas {
        export interface AcceptOfferPayload {
            partner_org_id: string;
            sharing_org_id: string;
            entity_id: string;
        }
        export interface AssignRolePayload {
            template_role_id: string;
        }
        export interface EntityResource {
            schema: string;
            entity_id: string;
            parent_entity_id?: string | null;
            offer_accepted?: boolean;
            updated_at?: string;
            created_at?: string;
        }
        export interface EntityResourceInput {
            schema: string;
            entity_id: string;
            parent_entity_id?: string | null;
            offer_accepted?: boolean;
        }
        export interface OfferEntityPayload {
            offer: PartnerOfferedEntitiesInput[];
            unoffer: PartnerOfferedEntitiesInput[];
        }
        export interface OfferEntityResource {
            schema: string;
            entity_id: string;
            parent_entity_id?: string | null;
            offer_status: OfferStatusEnum;
            offered_by_user_id?: string;
            updated_at?: string;
            created_at?: string;
        }
        export interface OfferEntityResourceInput {
            schema: string;
            entity_id: string;
            parent_entity_id?: string | null;
        }
        export interface OfferStatus {
            entity: PartialEntity;
            offer_status: OfferStatusEnum;
            status_changed_at?: string;
            offered_at?: string;
            accepted_by_org_id?: string;
        }
        export type OfferStatusEnum = "EXPIRED" | "UNAVAILABLE" | "PENDING" | "DECLINED" | "ACCEPTED";
        export interface PartialEntity {
            _schema: string;
            _id: string;
            _title: string;
            _created_at: string;
            _updated_at: string;
        }
        export interface PartnerEntitiesInput {
            partner_org_id: string;
            entities: EntityResourceInput[];
        }
        export interface PartnerEntityInput {
            entity: EntityResourceInput;
            partner_org_id: string;
        }
        export interface PartnerOfferedEntitiesInput {
            partner_org_id: string;
            offered_entities: OfferEntityResourceInput[];
        }
        export interface PartnerSharingConfig {
            /**
             * ID of the organization that is sharing the entities
             */
            sharing_org_id: string;
            /**
             * ID of the organization that receives access to the entities
             */
            partner_org_id: string;
            users?: string[];
            partner_status?: PartnerStatus;
            entities?: EntityResource[];
            offered_entities?: OfferEntityResource[];
            template_role_id?: string;
            template_role_grants?: TemplateRoleGrant[];
            generated_role_id?: string;
            user_limit?: number | null;
            created_at?: string;
            updated_at?: string;
        }
        export type PartnerStatus = "REGISTERED" | "UNREGISTERED";
        export interface SearchSharingConfigurationsPayload {
            entities: EntityResourceInput[];
        }
        export interface ShareChildEntityPayload {
            share: PartnerEntityInput[];
            unshare: PartnerEntityInput[];
        }
        export interface SharingEntityPayload {
            share: PartnerEntitiesInput[];
            unshare: PartnerEntitiesInput[];
        }
        export interface TemplateRoleGrant {
            action: string;
            resource: string;
            /**
             * allow or deny
             */
            effect?: string;
        }
        export interface UpdateSharingConfigurationPayload {
            user_limit?: number | null;
        }
    }
}
export declare namespace Paths {
    namespace AcceptOffer {
        export type RequestBody = Components.Schemas.AcceptOfferPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig;
            export interface $400 {
            }
        }
    }
    namespace AssignRoleToConfiguration {
        namespace Parameters {
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        export type RequestBody = Components.Schemas.AssignRolePayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace DeleteSharingConfiguration {
        namespace Parameters {
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig;
            export interface $401 {
            }
        }
    }
    namespace GetConfigurationsByTemplateRole {
        namespace Parameters {
            export type TemplateRoleId = string;
        }
        export interface PathParameters {
            template_role_id: Parameters.TemplateRoleId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetOfferStatus {
        namespace Parameters {
            export type EntityId = string;
            export type PartnerOrgId = string;
            export type SharingOrgId = string;
        }
        export interface QueryParameters {
            partner_org_id: Parameters.PartnerOrgId;
            sharing_org_id: Parameters.SharingOrgId;
            entity_id: Parameters.EntityId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OfferStatus;
            export interface $400 {
            }
        }
    }
    namespace GetSharingConfiguration {
        namespace Parameters {
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetSharingConfigurations {
        namespace Parameters {
            export type PartnerOrgIds = string[];
        }
        export interface QueryParameters {
            partner_org_ids: Parameters.PartnerOrgIds;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $401 {
            }
        }
    }
    namespace OfferEntityToPartners {
        export type RequestBody = Components.Schemas.OfferEntityPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace SearchPartnerSharingConfigurations {
        export type RequestBody = Components.Schemas.SearchSharingConfigurationsPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $401 {
            }
        }
    }
    namespace ShareChildEntityWithPartners {
        export type RequestBody = Components.Schemas.ShareChildEntityPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ShareEntityWithPartners {
        export type RequestBody = Components.Schemas.SharingEntityPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UpdateSharingConfiguration {
        namespace Parameters {
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        export type RequestBody = Components.Schemas.UpdateSharingConfigurationPayload;
        namespace Responses {
            export type $200 = Components.Schemas.PartnerSharingConfig;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getSharingConfiguration - Get sharing configuration for a partner
   * 
   * Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and assigned users.
   */
  'getSharingConfiguration'(
    parameters?: Parameters<Paths.GetSharingConfiguration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharingConfiguration.Responses.$200>
  /**
   * updateSharingConfiguration - Update sharing configuration for a partner
   * 
   * Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limit changes.
   */
  'updateSharingConfiguration'(
    parameters?: Parameters<Paths.UpdateSharingConfiguration.PathParameters> | null,
    data?: Paths.UpdateSharingConfiguration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSharingConfiguration.Responses.$200>
  /**
   * deleteSharingConfiguration - Delete sharing configuration for a partner
   * 
   * Deletes the sharing configuration for a partner, removing all shared and offered entity access.
   */
  'deleteSharingConfiguration'(
    parameters?: Parameters<Paths.DeleteSharingConfiguration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSharingConfiguration.Responses.$200>
  /**
   * assignRoleToConfiguration - Assign a template role to a partner sharing configuration
   * 
   * Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity access control.
   */
  'assignRoleToConfiguration'(
    parameters?: Parameters<Paths.AssignRoleToConfiguration.PathParameters> | null,
    data?: Paths.AssignRoleToConfiguration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignRoleToConfiguration.Responses.$200>
  /**
   * getSharingConfigurations - Get sharing configurations for multiple partners
   * 
   * Returns sharing configurations for multiple partner organizations in a single batch request.
   */
  'getSharingConfigurations'(
    parameters?: Parameters<Paths.GetSharingConfigurations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharingConfigurations.Responses.$200>
  /**
   * searchPartnerSharingConfigurations - Search partner sharing configurations by entities
   * 
   * Searches for partner sharing configurations that have access to the given entities. Returns configurations with their shared and offered entity lists.
   */
  'searchPartnerSharingConfigurations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchPartnerSharingConfigurations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPartnerSharingConfigurations.Responses.$200>
  /**
   * getConfigurationsByTemplateRole - Get sharing configurations that use a specific template role
   * 
   * Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage before deletion.
   */
  'getConfigurationsByTemplateRole'(
    parameters?: Parameters<Paths.GetConfigurationsByTemplateRole.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigurationsByTemplateRole.Responses.$200>
  /**
   * shareEntityWithPartners - Share or unshare entities with partners
   * 
   * Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream processing.
   */
  'shareEntityWithPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShareEntityWithPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShareEntityWithPartners.Responses.$200>
  /**
   * shareChildEntityWithPartners - Share or unshare child entities with partners
   * 
   * Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.
   */
  'shareChildEntityWithPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShareChildEntityWithPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShareChildEntityWithPartners.Responses.$200>
  /**
   * offerEntityToPartners - Offer or unoffer entities to partners (First Come First Served)
   * 
   * Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept each offered entity.
   */
  'offerEntityToPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.OfferEntityToPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OfferEntityToPartners.Responses.$200>
  /**
   * getOfferStatus - Get the status of an entity offer (public, no auth required)
   * 
   * Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-facing pages without authentication.
   */
  'getOfferStatus'(
    parameters?: Parameters<Paths.GetOfferStatus.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOfferStatus.Responses.$200>
  /**
   * acceptOffer - Accept an entity offer (public, no auth required)
   * 
   * Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages without authentication. Only one partner can accept each offer.
   */
  'acceptOffer'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcceptOffer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcceptOffer.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/sharing/configurations/{partner_org_id}']: {
    /**
     * getSharingConfiguration - Get sharing configuration for a partner
     * 
     * Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and assigned users.
     */
    'get'(
      parameters?: Parameters<Paths.GetSharingConfiguration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharingConfiguration.Responses.$200>
    /**
     * updateSharingConfiguration - Update sharing configuration for a partner
     * 
     * Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limit changes.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateSharingConfiguration.PathParameters> | null,
      data?: Paths.UpdateSharingConfiguration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSharingConfiguration.Responses.$200>
    /**
     * deleteSharingConfiguration - Delete sharing configuration for a partner
     * 
     * Deletes the sharing configuration for a partner, removing all shared and offered entity access.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSharingConfiguration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSharingConfiguration.Responses.$200>
  }
  ['/v1/sharing/configurations/{partner_org_id}/role']: {
    /**
     * assignRoleToConfiguration - Assign a template role to a partner sharing configuration
     * 
     * Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity access control.
     */
    'put'(
      parameters?: Parameters<Paths.AssignRoleToConfiguration.PathParameters> | null,
      data?: Paths.AssignRoleToConfiguration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignRoleToConfiguration.Responses.$200>
  }
  ['/v1/sharing/configurations']: {
    /**
     * getSharingConfigurations - Get sharing configurations for multiple partners
     * 
     * Returns sharing configurations for multiple partner organizations in a single batch request.
     */
    'get'(
      parameters?: Parameters<Paths.GetSharingConfigurations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharingConfigurations.Responses.$200>
  }
  ['/v1/sharing/configurations:search']: {
    /**
     * searchPartnerSharingConfigurations - Search partner sharing configurations by entities
     * 
     * Searches for partner sharing configurations that have access to the given entities. Returns configurations with their shared and offered entity lists.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchPartnerSharingConfigurations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchPartnerSharingConfigurations.Responses.$200>
  }
  ['/v1/sharing/configurations/by-role/{template_role_id}']: {
    /**
     * getConfigurationsByTemplateRole - Get sharing configurations that use a specific template role
     * 
     * Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage before deletion.
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigurationsByTemplateRole.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigurationsByTemplateRole.Responses.$200>
  }
  ['/v1/sharing/entities:share']: {
    /**
     * shareEntityWithPartners - Share or unshare entities with partners
     * 
     * Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream processing.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShareEntityWithPartners.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShareEntityWithPartners.Responses.$200>
  }
  ['/v1/sharing/entities:share-child']: {
    /**
     * shareChildEntityWithPartners - Share or unshare child entities with partners
     * 
     * Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShareChildEntityWithPartners.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShareChildEntityWithPartners.Responses.$200>
  }
  ['/v1/sharing/entities:offer']: {
    /**
     * offerEntityToPartners - Offer or unoffer entities to partners (First Come First Served)
     * 
     * Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept each offered entity.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.OfferEntityToPartners.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OfferEntityToPartners.Responses.$200>
  }
  ['/v1/sharing/offers/status']: {
    /**
     * getOfferStatus - Get the status of an entity offer (public, no auth required)
     * 
     * Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-facing pages without authentication.
     */
    'get'(
      parameters?: Parameters<Paths.GetOfferStatus.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOfferStatus.Responses.$200>
  }
  ['/v1/sharing/offers:accept']: {
    /**
     * acceptOffer - Accept an entity offer (public, no auth required)
     * 
     * Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages without authentication. Only one partner can accept each offer.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcceptOffer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcceptOffer.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AcceptOfferPayload = Components.Schemas.AcceptOfferPayload;
export type AssignRolePayload = Components.Schemas.AssignRolePayload;
export type EntityResource = Components.Schemas.EntityResource;
export type EntityResourceInput = Components.Schemas.EntityResourceInput;
export type OfferEntityPayload = Components.Schemas.OfferEntityPayload;
export type OfferEntityResource = Components.Schemas.OfferEntityResource;
export type OfferEntityResourceInput = Components.Schemas.OfferEntityResourceInput;
export type OfferStatus = Components.Schemas.OfferStatus;
export type OfferStatusEnum = Components.Schemas.OfferStatusEnum;
export type PartialEntity = Components.Schemas.PartialEntity;
export type PartnerEntitiesInput = Components.Schemas.PartnerEntitiesInput;
export type PartnerEntityInput = Components.Schemas.PartnerEntityInput;
export type PartnerOfferedEntitiesInput = Components.Schemas.PartnerOfferedEntitiesInput;
export type PartnerSharingConfig = Components.Schemas.PartnerSharingConfig;
export type PartnerStatus = Components.Schemas.PartnerStatus;
export type SearchSharingConfigurationsPayload = Components.Schemas.SearchSharingConfigurationsPayload;
export type ShareChildEntityPayload = Components.Schemas.ShareChildEntityPayload;
export type SharingEntityPayload = Components.Schemas.SharingEntityPayload;
export type TemplateRoleGrant = Components.Schemas.TemplateRoleGrant;
export type UpdateSharingConfigurationPayload = Components.Schemas.UpdateSharingConfigurationPayload;
