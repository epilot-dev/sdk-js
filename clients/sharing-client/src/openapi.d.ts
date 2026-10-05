import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type PartnerOrgIdPath = string;
        export type RuleIdPath = string;
    }
    export interface PathParameters {
        PartnerOrgIdPath?: Parameters.PartnerOrgIdPath;
        RuleIdPath?: Parameters.RuleIdPath;
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
        export interface SharingRule {
            name: string;
            enabled: boolean;
            /**
             * Schema of the shared parent entity that triggers the rule
             * example:
             * opportunity
             */
            trigger_schema: string;
            /**
             * Schemas of related entities the rule may share
             */
            include_schemas: [
                string,
                ...string[]
            ];
            evaluation_type: "deterministic" | "ai";
            conditions?: /* Required iff evaluation_type is deterministic */ SharingRuleConditions;
            ai_config?: /* Required iff evaluation_type is ai */ SharingRuleAiConfig;
            rule_id: string; // uuid
            vendor_org_id: string;
            partner_org_id: string;
            source: "AUTO_SHARING_RULE";
            created_at: string; // date-time
            updated_at: string; // date-time
            created_by?: string;
        }
        /**
         * Required iff evaluation_type is ai
         */
        export interface SharingRuleAiConfig {
            confidence_threshold: number;
            /**
             * Vendor's natural-language instructions for the evaluator
             */
            guidance?: string;
        }
        /**
         * Required iff evaluation_type is deterministic
         */
        export interface SharingRuleConditions {
            logical_operator: "AND" | "OR";
            statements: [
                /* Subset of the Flows condition Statement */ Statement,
                .../* Subset of the Flows condition Statement */ Statement[]
            ];
        }
        export interface SharingRuleInput {
            name: string;
            enabled?: boolean;
            /**
             * Schema of the shared parent entity that triggers the rule
             * example:
             * opportunity
             */
            trigger_schema: string;
            /**
             * Schemas of related entities the rule may share
             */
            include_schemas: [
                string,
                ...string[]
            ];
            evaluation_type: "deterministic" | "ai";
            conditions?: /* Required iff evaluation_type is deterministic */ SharingRuleConditions;
            ai_config?: /* Required iff evaluation_type is ai */ SharingRuleAiConfig;
        }
        /**
         * Every SharingRuleInput field is optional. The patch is merged into the stored rule, then validated.
         */
        export interface SharingRuleUpdate {
            name?: string;
            enabled?: boolean;
            trigger_schema?: string;
            include_schemas?: [
                string,
                ...string[]
            ];
            evaluation_type?: "deterministic" | "ai";
            conditions?: /* Required iff evaluation_type is deterministic */ SharingRuleConditions;
            ai_config?: /* Required iff evaluation_type is ai */ SharingRuleAiConfig;
        }
        /**
         * Subset of the Flows condition Statement
         */
        export interface Statement {
            id: string;
            source: {
                /**
                 * Top-level entity attribute. Labels are `_tags`.
                 */
                attribute: string;
                attribute_type: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "price";
            };
            operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "is_empty" | "is_not_empty";
            /**
             * May be empty only for is_empty / is_not_empty
             */
            values: string[];
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
declare namespace Paths {
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
    namespace CreateSharingRule {
        namespace Parameters {
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        export type RequestBody = Components.Schemas.SharingRuleInput;
        namespace Responses {
            export type $201 = Components.Schemas.SharingRule;
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
    namespace DeleteSharingRule {
        namespace Parameters {
            export type PartnerOrgId = string;
            export type RuleId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
            rule_id: Parameters.RuleId;
        }
        namespace Responses {
            export interface $204 {
            }
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
    namespace GetSharingRule {
        namespace Parameters {
            export type PartnerOrgId = string;
            export type RuleId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
            rule_id: Parameters.RuleId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SharingRule;
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace ListSharingRules {
        namespace Parameters {
            export type Enabled = boolean;
            export type PartnerOrgId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
        }
        export interface QueryParameters {
            enabled?: Parameters.Enabled;
        }
        namespace Responses {
            export interface $200 {
                rules: Components.Schemas.SharingRule[];
            }
            export interface $400 {
            }
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
    namespace UpdateSharingRule {
        namespace Parameters {
            export type PartnerOrgId = string;
            export type RuleId = string;
        }
        export interface PathParameters {
            partner_org_id: Parameters.PartnerOrgId;
            rule_id: Parameters.RuleId;
        }
        export type RequestBody = /* Every SharingRuleInput field is optional. The patch is merged into the stored rule, then validated. */ Components.Schemas.SharingRuleUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.SharingRule;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getSharingConfiguration - getSharingConfiguration
   * 
   * Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and assigned users.
   */
  'getSharingConfiguration'(
    parameters?: Parameters<Paths.GetSharingConfiguration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharingConfiguration.Responses.$200>
  /**
   * updateSharingConfiguration - updateSharingConfiguration
   * 
   * Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limit changes.
   */
  'updateSharingConfiguration'(
    parameters?: Parameters<Paths.UpdateSharingConfiguration.PathParameters> | null,
    data?: Paths.UpdateSharingConfiguration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSharingConfiguration.Responses.$200>
  /**
   * deleteSharingConfiguration - deleteSharingConfiguration
   * 
   * Deletes the sharing configuration for a partner, removing all shared and offered entity access.
   */
  'deleteSharingConfiguration'(
    parameters?: Parameters<Paths.DeleteSharingConfiguration.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSharingConfiguration.Responses.$200>
  /**
   * assignRoleToConfiguration - assignRoleToConfiguration
   * 
   * Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity access control.
   */
  'assignRoleToConfiguration'(
    parameters?: Parameters<Paths.AssignRoleToConfiguration.PathParameters> | null,
    data?: Paths.AssignRoleToConfiguration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignRoleToConfiguration.Responses.$200>
  /**
   * getSharingConfigurations - getSharingConfigurations
   * 
   * Returns sharing configurations for multiple partner organizations in a single batch request.
   */
  'getSharingConfigurations'(
    parameters?: Parameters<Paths.GetSharingConfigurations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharingConfigurations.Responses.$200>
  /**
   * searchPartnerSharingConfigurations - searchPartnerSharingConfigurations
   * 
   * Searches for partner sharing configurations that have access to the given entities. Returns configurations with their shared and offered entity lists.
   */
  'searchPartnerSharingConfigurations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchPartnerSharingConfigurations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchPartnerSharingConfigurations.Responses.$200>
  /**
   * getConfigurationsByTemplateRole - getConfigurationsByTemplateRole
   * 
   * Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage before deletion.
   */
  'getConfigurationsByTemplateRole'(
    parameters?: Parameters<Paths.GetConfigurationsByTemplateRole.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigurationsByTemplateRole.Responses.$200>
  /**
   * shareEntityWithPartners - shareEntityWithPartners
   * 
   * Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream processing.
   */
  'shareEntityWithPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShareEntityWithPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShareEntityWithPartners.Responses.$200>
  /**
   * shareChildEntityWithPartners - shareChildEntityWithPartners
   * 
   * Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.
   */
  'shareChildEntityWithPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShareChildEntityWithPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShareChildEntityWithPartners.Responses.$200>
  /**
   * offerEntityToPartners - offerEntityToPartners
   * 
   * Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept each offered entity.
   */
  'offerEntityToPartners'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.OfferEntityToPartners.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OfferEntityToPartners.Responses.$200>
  /**
   * getOfferStatus - getOfferStatus
   * 
   * Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-facing pages without authentication.
   */
  'getOfferStatus'(
    parameters?: Parameters<Paths.GetOfferStatus.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOfferStatus.Responses.$200>
  /**
   * acceptOffer - acceptOffer
   * 
   * Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages without authentication. Only one partner can accept each offer.
   */
  'acceptOffer'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcceptOffer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcceptOffer.Responses.$200>
  /**
   * listSharingRules - listSharingRules
   * 
   * Lists the auto-sharing rules the caller's organization configured for a partner.
   */
  'listSharingRules'(
    parameters?: Parameters<Paths.ListSharingRules.QueryParameters & Paths.ListSharingRules.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSharingRules.Responses.$200>
  /**
   * createSharingRule - createSharingRule
   * 
   * Creates an auto-sharing rule for a partner.
   */
  'createSharingRule'(
    parameters?: Parameters<Paths.CreateSharingRule.PathParameters> | null,
    data?: Paths.CreateSharingRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSharingRule.Responses.$201>
  /**
   * getSharingRule - getSharingRule
   * 
   * Returns a single auto-sharing rule.
   */
  'getSharingRule'(
    parameters?: Parameters<Paths.GetSharingRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharingRule.Responses.$200>
  /**
   * updateSharingRule - updateSharingRule
   * 
   * Partially updates an auto-sharing rule. The patch is merged into the stored rule, which is then validated as a whole. Use `{ "enabled": false }` to disable a rule.
   */
  'updateSharingRule'(
    parameters?: Parameters<Paths.UpdateSharingRule.PathParameters> | null,
    data?: Paths.UpdateSharingRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSharingRule.Responses.$200>
  /**
   * deleteSharingRule - deleteSharingRule
   * 
   * Deletes an auto-sharing rule.
   */
  'deleteSharingRule'(
    parameters?: Parameters<Paths.DeleteSharingRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSharingRule.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/sharing/configurations/{partner_org_id}']: {
    /**
     * getSharingConfiguration - getSharingConfiguration
     * 
     * Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and assigned users.
     */
    'get'(
      parameters?: Parameters<Paths.GetSharingConfiguration.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharingConfiguration.Responses.$200>
    /**
     * updateSharingConfiguration - updateSharingConfiguration
     * 
     * Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limit changes.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateSharingConfiguration.PathParameters> | null,
      data?: Paths.UpdateSharingConfiguration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSharingConfiguration.Responses.$200>
    /**
     * deleteSharingConfiguration - deleteSharingConfiguration
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
     * assignRoleToConfiguration - assignRoleToConfiguration
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
     * getSharingConfigurations - getSharingConfigurations
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
     * searchPartnerSharingConfigurations - searchPartnerSharingConfigurations
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
     * getConfigurationsByTemplateRole - getConfigurationsByTemplateRole
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
     * shareEntityWithPartners - shareEntityWithPartners
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
     * shareChildEntityWithPartners - shareChildEntityWithPartners
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
     * offerEntityToPartners - offerEntityToPartners
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
     * getOfferStatus - getOfferStatus
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
     * acceptOffer - acceptOffer
     * 
     * Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages without authentication. Only one partner can accept each offer.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcceptOffer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcceptOffer.Responses.$200>
  }
  ['/v1/sharing/rules/{partner_org_id}']: {
    /**
     * listSharingRules - listSharingRules
     * 
     * Lists the auto-sharing rules the caller's organization configured for a partner.
     */
    'get'(
      parameters?: Parameters<Paths.ListSharingRules.QueryParameters & Paths.ListSharingRules.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSharingRules.Responses.$200>
    /**
     * createSharingRule - createSharingRule
     * 
     * Creates an auto-sharing rule for a partner.
     */
    'post'(
      parameters?: Parameters<Paths.CreateSharingRule.PathParameters> | null,
      data?: Paths.CreateSharingRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSharingRule.Responses.$201>
  }
  ['/v1/sharing/rules/{partner_org_id}/{rule_id}']: {
    /**
     * getSharingRule - getSharingRule
     * 
     * Returns a single auto-sharing rule.
     */
    'get'(
      parameters?: Parameters<Paths.GetSharingRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharingRule.Responses.$200>
    /**
     * updateSharingRule - updateSharingRule
     * 
     * Partially updates an auto-sharing rule. The patch is merged into the stored rule, which is then validated as a whole. Use `{ "enabled": false }` to disable a rule.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateSharingRule.PathParameters> | null,
      data?: Paths.UpdateSharingRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSharingRule.Responses.$200>
    /**
     * deleteSharingRule - deleteSharingRule
     * 
     * Deletes an auto-sharing rule.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSharingRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSharingRule.Responses.$204>
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
export type SharingRule = Components.Schemas.SharingRule;
export type SharingRuleAiConfig = Components.Schemas.SharingRuleAiConfig;
export type SharingRuleConditions = Components.Schemas.SharingRuleConditions;
export type SharingRuleInput = Components.Schemas.SharingRuleInput;
export type SharingRuleUpdate = Components.Schemas.SharingRuleUpdate;
export type Statement = Components.Schemas.Statement;
export type TemplateRoleGrant = Components.Schemas.TemplateRoleGrant;
export type UpdateSharingConfigurationPayload = Components.Schemas.UpdateSharingConfigurationPayload;
