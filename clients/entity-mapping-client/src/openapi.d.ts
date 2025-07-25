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
        export interface AppendValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source?: string;
            /**
             * To be provided only when mapping json objects into a target attribute. Eg array of addresses.
             *
             */
            value_json: string;
            /**
             * Array of keys which should be used when checking for uniqueness. Eg: [country, city, postal_code]
             *
             */
            target_unique?: string[];
        }
        /**
         * Origin of an attribute.
         */
        export type AttributeOrigin = "system_recommendation" | "user_manually" | "entity_updating_system_recommendation";
        export interface ConditionNode {
            source?: string;
            value?: string | number | {
                [key: string]: any;
            } | {
                [key: string]: any;
            }[];
        }
        export interface CopyValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source: string;
        }
        export interface Entity {
            [name: string]: any;
            _id?: string;
            _schema?: string;
            _title?: string | null;
            _org?: string;
            _tags?: string[] | null;
            _created_at?: string | null;
            _updated_at?: string | null;
            required?: any;
        }
        export interface EntityRef {
            /**
             * id of the source entity to be mapped
             */
            entity_id: string;
            /**
             * schema of the source entity
             * example:
             * submission
             */
            entity_schema?: string;
        }
        /**
         * Pass either source or source_entity
         */
        export interface ExecuteMappingReq {
            /**
             * A reference (id and schema) to the entity to be used as source.
             */
            source_ref: EntityRef;
            /**
             * Mapping Configuration to apply.
             */
            targets: TargetConfig[];
        }
        export interface ExecuteMappingResp {
            mapped_entities: Entity[];
            failures?: MappingFailure[];
            warnings?: MappingWarning[];
        }
        /**
         * Build relations between a source entity and one or more target entities, dynamically identified
         */
        export interface ExecuteRelationsReq {
            /**
             * Entity for which to add relations.
             */
            source_ref: EntityRef;
            target?: {
                /**
                 * Main Entity from where to locate target entities. Eg. submisssion entity
                 */
                main_entity_ref: EntityRef;
                /**
                 * Relation mappings
                 */
                relation_attributes: RelationAttribute[];
                /**
                 * For cases where you want to store a relation between main entity (eg. submission) and current source entity.
                 */
                linkback?: {
                    /**
                     * Relation attribute on the main entity (submission) where the target entity will be linked. Set to false to disable linkback
                     *
                     */
                    attribute: string;
                    /**
                     * Relation tags (labels) to include in main entity linkback relation attribute
                     */
                    relation_tags: string[];
                };
            };
            additional_relations?: RelationItem[];
        }
        export interface ExecuteRelationsResp {
            relations?: NewRelationItem[];
        }
        export interface JourneyRef {
            journey_id?: string;
        }
        /**
         * This string value will be replaced with the value of the loop index, when mapping in loop mode
         */
        export type LoopIndexString = "##LOOP_INDEX##";
        export interface MapCondition {
            _exists?: ConditionNode;
            _equals?: ConditionNode;
            _not_exists?: ConditionNode;
            _any_of?: ConditionNode;
        }
        export type MappingAttribute = SetValueMapper | CopyValueMapper | AppendValueMapper;
        /**
         * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
         *
         */
        export type MappingAttributeMode = "copy_if_exists" | "append_if_exists" | "set_value";
        /**
         * example:
         * {
         *   "target": "_tags",
         *   "operation": {
         *     "_append": [
         *       "new",
         *       "tags"
         *     ],
         *     "_uniq": true
         *   }
         * }
         */
        export interface MappingAttributeV2 {
            /**
             * Target JSON path for the attribute to set
             */
            target: string;
            operation: /* Mapping operation nodes are either primitive values or operation node objects */ OperationNode;
            origin?: /* Origin of an attribute. */ AttributeOrigin;
        }
        export interface MappingConfig {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: Owner;
            last_updated_by?: Owner;
            /**
             * example:
             * 66
             */
            org_id: string;
            /**
             * example:
             * 2
             */
            version: number;
        }
        export interface MappingConfigCommonFields {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * User / service who created the entity mapping config
             * example:
             * {
             *   "type": "internal_service"
             * }
             */
            created_by?: Owner;
            /**
             * User / service who last updated entity mapping config
             * example:
             * {
             *   "type": "user",
             *   "org_id": 255151,
             *   "user_id": 99252
             * }
             */
            last_updated_by?: Owner;
        }
        export interface MappingConfigV2 {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: Owner;
            last_updated_by?: Owner;
            /**
             * example:
             * 66
             */
            org_id?: string;
            /**
             * example:
             * 2
             */
            version?: number;
        }
        export type MappingConfigs = MappingConfig[];
        export interface MappingConfigsResp {
            configs: MappingConfigs;
        }
        export interface MappingFailure {
            target?: TargetConfig;
            error?: {
                [name: string]: any;
                isSilent?: boolean;
                message?: string;
            };
        }
        export interface MappingHistoryEntry {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            id: string;
            timestamp: string; // ISO datetime
            source_entity_snapshot: Entity;
            mapped_entities_snapshot: Entity[];
            target_configs_snapshot: TargetConfig[];
        }
        export interface MappingHistoryResp {
            results: MappingHistoryEntry[];
        }
        export interface MappingSource {
            /**
             * Key aiming to identify source
             */
            key: string;
            /**
             * Each item describes a property under the main source and a possibly, a default value for its target attribute
             */
            sub_properties?: MappingSourceProperty[];
            /**
             * Data Structure type of source
             */
            source_type: string;
            /**
             * A group this source belongs to. Used for grouping sources in the UI
             */
            group?: string;
            /**
             * Data Structure Type of the underlaying output value
             */
            possible_target_types?: MappingSourceTargetType[];
            /**
             * Initial value of a relation to be added
             */
            initial_relation?: RelationAttribute;
            /**
             * Human readable name of the Source
             */
            title: string;
            /**
             * Human readable type of the source
             */
            sub_title?: string;
            /**
             * Whether the source (block or attribute) is a repeatable, aka holds a list of values
             */
            repeatable?: boolean;
            target_settings?: {
                /**
                 * Describes which actions the user can perform on each target, if specified. If not specified, all actions are allowed
                 */
                allowed_ui_actions?: ("schema-select" | "attribute-select" | "target-delete" | "target-add" | "target")[];
                /**
                 * Whether its a read-only ui or not. Can be each target, or only the first. Overwrites uiActions
                 */
                locked?: "each" | "first" | "system_recommendation";
                /**
                 * Whether all source mappings flow into a single attribute (e.g. address)
                 */
                isSingleTarget?: boolean;
                /**
                 * Determines whether a mapping target should be shown or not. Use if there are targets which cannot be manipulated by the UI. E.g journey_data
                 */
                visibility?: {
                    mode: "hide" | "show" | "message";
                    if: {
                        [name: string]: string;
                    };
                    message?: string;
                };
            };
        }
        export interface MappingSourceProperty {
            value: string;
            label: string;
            initial_target_value?: string;
            /**
             * Data Structure Type of the underlaying output value
             */
            possible_target_types?: MappingSourceTargetType[];
            /**
             * Whether the raw value should be used, or whether the value is enriched by a path
             */
            raw?: boolean;
        }
        export type MappingSourceTargetType = "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency";
        export interface MappingWarning {
            explanation: string;
            context?: string;
            id?: string;
        }
        export interface NewRelationItem {
            source_entity_id: string;
            target_entity_id: string;
            relation_attr: string;
            tags?: string[];
        }
        /**
         * Mapping operation nodes are either primitive values or operation node objects
         */
        export type OperationNode = /* Mapping operation nodes are either primitive values or operation node objects */ OperationObjectNode | /* Represents any primitive JSON value */ PrimitiveJSONValue;
        export interface OperationObjectNode {
            [name: string]: any;
            _set?: /* Represents any primitive JSON value */ PrimitiveJSONValue;
            /**
             * Append to array
             */
            _append?: any;
            /**
             * Unique array
             */
            _uniq?: /* Unique array */ boolean | string[];
            /**
             * Copy JSONPath value from source entity context
             * example:
             * contact.first_name
             */
            _copy?: string;
            /**
             * Define handlebars template to output a string
             * example:
             * {{contact.first_name}} {{contact.last_name}}
             */
            _template?: string;
            /**
             * Generate random ids / numbers
             */
            _random?: RandomOperation;
        }
        export interface Owner {
            type: "user" | "internal_service";
            org_id?: string;
            user_id?: string;
        }
        /**
         * Represents any primitive JSON value
         */
        export type PrimitiveJSONValue = /* Represents any primitive JSON value */ string | boolean | number | {
            [name: string]: any;
        } | any[];
        export type RandomOperation = {
            type: "uuid" | "nanoid";
        } | {
            type: "number";
            min?: number;
            max?: number;
        };
        export interface RelationAttribute {
            /**
             * Target attribute to store the relation in
             */
            target: string;
            /**
             * Relation tags (labels) to set for the stored relations
             */
            target_tags?: string[];
            /**
             * Include all relation tags (labels) present on the main entity relation
             */
            target_tags_include_source?: boolean;
            /**
             * A filter to identify which source entities to pick as relations from main entity
             */
            source_filter?: {
                /**
                 * Limit relations to maximum number (default, all matched relations)
                 */
                limit?: number;
                /**
                 * Filter by specific schema
                 */
                schema?: string;
                /**
                 * Filter by a specific relation attribute on the main entity
                 */
                attribute?: string;
                /**
                 * Filter by relation tag (label) on the main entity
                 */
                relation_tag?: string;
                /**
                 * Filter by a specific tag on the related entity
                 */
                tag?: string;
                /**
                 * Picks main entity as relation (overrides other filters)
                 */
                self?: boolean;
            };
            related_to?: {
                [name: string]: any;
            };
            mode: "append" | "prepend" | "set";
            origin?: /* Origin of an attribute. */ AttributeOrigin;
        }
        export interface RelationItem {
            entity_id: string;
            attribute: string;
        }
        export interface SearchMappingReq {
            source?: SourceConfig;
        }
        export interface SetValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * Any value to be set: string, number, string[], number[], JSON object, etc. It will override existing values, if any.
             *
             */
            value: any;
        }
        export interface SourceConfig {
            type?: "journey" | "entity";
            config?: JourneyRef | EntityRef;
        }
        export interface TargetConfig {
            /**
             * Identifier for target configuration. Useful for later usages when trying to identify which target config to map to.
             */
            id?: string;
            /**
             * A name for this configuration
             */
            name?: string;
            /**
             * Pass it as true, when you don't want failures to interrupt the mapping process.
             */
            allow_failure?: boolean;
            /**
             * Schema of target entity
             */
            target_schema: string;
            /**
             * Unique key for target entity (see upsertEntity of Entity API)
             */
            target_unique?: string[];
            /**
             * contains config in case of running in loop mode
             */
            loop_config?: {
                /**
                 * path to the array from the entity payload
                 */
                source_path?: string;
                /**
                 * a hard limit of how many times the loop is allowed to run.
                 */
                length?: number;
            };
            /**
             * Mode of how conditions are considered valid
             */
            conditionMode?: "oneOf" | "anyOf" | "allOf";
            /**
             * Conditions necessary to hold for the target entity to be mapped
             */
            conditions?: MapCondition[];
            /**
             * Attribute mappings
             */
            mapping_attributes: (/**
             * example:
             * {
             *   "target": "_tags",
             *   "operation": {
             *     "_append": [
             *       "new",
             *       "tags"
             *     ],
             *     "_uniq": true
             *   }
             * }
             */
            MappingAttributeV2 | MappingAttribute)[];
            /**
             * Relation mappings
             */
            relation_attributes?: RelationAttribute[];
            /**
             * Relation attribute on the main entity where the target entity will be linked. Set to false to disable linkback
             *
             */
            linkback_relation_attribute?: string;
            /**
             * Relation tags (labels) to include in main entity linkback relation attribute
             */
            linkback_relation_tags?: string[];
        }
    }
}
declare namespace Paths {
    namespace DeleteConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace ExecuteMapping {
        namespace Parameters {
            /**
             * example:
             * true
             */
            export type PreviewMode = boolean;
        }
        export interface QueryParameters {
            preview_mode?: /**
             * example:
             * true
             */
            Parameters.PreviewMode;
        }
        export type RequestBody = /* Pass either source or source_entity */ Components.Schemas.ExecuteMappingReq;
        namespace Responses {
            export type $200 = Components.Schemas.ExecuteMappingResp;
        }
    }
    namespace ExecuteRelations {
        export type RequestBody = /* Build relations between a source entity and one or more target entities, dynamically identified */ Components.Schemas.ExecuteRelationsReq;
        namespace Responses {
            export type $200 = Components.Schemas.ExecuteRelationsResp;
        }
    }
    namespace GetAllVersions {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigsResp;
        }
    }
    namespace GetConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace GetConfigVersion {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
            /**
             * example:
             * 3
             */
            export type Version = number;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
            version: /**
             * example:
             * 3
             */
            Parameters.Version;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace GetMappingConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigV2;
        }
    }
    namespace PutMappingConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        export type RequestBody = Components.Schemas.MappingConfigV2;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigV2;
        }
    }
    namespace QueryMappingHistory {
        namespace Parameters {
            export type From = string; // datetime
            export type SourceEntityId = string; // uuid
            export type TargetEntityId = string; // uuid
            export type To = string; // datetime
        }
        export interface QueryParameters {
            from?: Parameters.From /* datetime */;
            to?: Parameters.To /* datetime */;
            targetEntityId?: Parameters.TargetEntityId /* uuid */;
            sourceEntityId?: Parameters.SourceEntityId /* uuid */;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.MappingHistoryResp[];
            }
        }
    }
    namespace SearchConfigs {
        export type RequestBody = Components.Schemas.SearchMappingReq;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace StoreConfig {
        namespace Parameters {
            export type WithId = string;
        }
        export interface QueryParameters {
            with_id?: Parameters.WithId;
        }
        export type RequestBody = Components.Schemas.MappingConfig;
        namespace Responses {
            export type $201 = Components.Schemas.MappingConfig;
        }
    }
    namespace StoreNewVersion {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        export type RequestBody = Components.Schemas.MappingConfig;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
}


export interface OperationMethods {
  /**
   * storeConfig - storeConfig
   * 
   * Store new MappingConfig
   */
  'storeConfig'(
    parameters?: Parameters<Paths.StoreConfig.QueryParameters> | null,
    data?: Paths.StoreConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoreConfig.Responses.$201>
  /**
   * getConfig - getConfig
   * 
   * Get latest version of a mapping config by id
   */
  'getConfig'(
    parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfig.Responses.$200>
  /**
   * deleteConfig - deleteConfig
   * 
   * Delete entity mapping config
   */
  'deleteConfig'(
    parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConfig.Responses.$200>
  /**
   * getAllVersions - getAllVersions
   * 
   * Get all version of MappingConfig
   */
  'getAllVersions'(
    parameters?: Parameters<Paths.GetAllVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllVersions.Responses.$200>
  /**
   * storeNewVersion - storeNewVersion
   * 
   * Store new version of MappingConfig
   */
  'storeNewVersion'(
    parameters?: Parameters<Paths.StoreNewVersion.PathParameters> | null,
    data?: Paths.StoreNewVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoreNewVersion.Responses.$200>
  /**
   * getConfigVersion - getConfigVersion
   * 
   * Get specific version of a mapping config by id & version
   */
  'getConfigVersion'(
    parameters?: Parameters<Paths.GetConfigVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigVersion.Responses.$200>
  /**
   * executeMapping - executeMapping
   * 
   * Execute entity mapping based on a config
   */
  'executeMapping'(
    parameters?: Parameters<Paths.ExecuteMapping.QueryParameters> | null,
    data?: Paths.ExecuteMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteMapping.Responses.$200>
  /**
   * searchConfigs - searchConfigs
   * 
   * Search mapping configs
   */
  'searchConfigs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchConfigs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchConfigs.Responses.$200>
  /**
   * queryMappingHistory - queryMappingHistory
   * 
   * Get the Mapping History
   */
  'queryMappingHistory'(
    parameters?: Parameters<Paths.QueryMappingHistory.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.QueryMappingHistory.Responses.$200>
  /**
   * executeRelations - executeRelations
   * 
   * Execute relation mapping between source entity and target entities
   */
  'executeRelations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExecuteRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteRelations.Responses.$200>
  /**
   * getMappingConfig - getMappingConfig
   * 
   * Get latest version of a mapping config by id V2
   */
  'getMappingConfig'(
    parameters?: Parameters<Paths.GetMappingConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMappingConfig.Responses.$200>
  /**
   * putMappingConfig - putMappingConfig
   * 
   * Stores new version of entity mapping config
   */
  'putMappingConfig'(
    parameters?: Parameters<Paths.PutMappingConfig.PathParameters> | null,
    data?: Paths.PutMappingConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutMappingConfig.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/mappings']: {
    /**
     * storeConfig - storeConfig
     * 
     * Store new MappingConfig
     */
    'post'(
      parameters?: Parameters<Paths.StoreConfig.QueryParameters> | null,
      data?: Paths.StoreConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoreConfig.Responses.$201>
  }
  ['/v1/mappings/{id}']: {
    /**
     * getConfig - getConfig
     * 
     * Get latest version of a mapping config by id
     */
    'get'(
      parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfig.Responses.$200>
    /**
     * deleteConfig - deleteConfig
     * 
     * Delete entity mapping config
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConfig.Responses.$200>
  }
  ['/v1/mappings/{id}/versions']: {
    /**
     * getAllVersions - getAllVersions
     * 
     * Get all version of MappingConfig
     */
    'get'(
      parameters?: Parameters<Paths.GetAllVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllVersions.Responses.$200>
    /**
     * storeNewVersion - storeNewVersion
     * 
     * Store new version of MappingConfig
     */
    'post'(
      parameters?: Parameters<Paths.StoreNewVersion.PathParameters> | null,
      data?: Paths.StoreNewVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoreNewVersion.Responses.$200>
  }
  ['/v1/mappings/{id}/versions/{version}']: {
    /**
     * getConfigVersion - getConfigVersion
     * 
     * Get specific version of a mapping config by id & version
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigVersion.Responses.$200>
  }
  ['/v1/mappings:execute']: {
    /**
     * executeMapping - executeMapping
     * 
     * Execute entity mapping based on a config
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteMapping.QueryParameters> | null,
      data?: Paths.ExecuteMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteMapping.Responses.$200>
  }
  ['/v1/mappings:search']: {
    /**
     * searchConfigs - searchConfigs
     * 
     * Search mapping configs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchConfigs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchConfigs.Responses.$200>
  }
  ['/v1/mappings/history']: {
    /**
     * queryMappingHistory - queryMappingHistory
     * 
     * Get the Mapping History
     */
    'get'(
      parameters?: Parameters<Paths.QueryMappingHistory.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.QueryMappingHistory.Responses.$200>
  }
  ['/v1/relations:execute']: {
    /**
     * executeRelations - executeRelations
     * 
     * Execute relation mapping between source entity and target entities
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExecuteRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteRelations.Responses.$200>
  }
  ['/v2/mappings/{id}']: {
    /**
     * getMappingConfig - getMappingConfig
     * 
     * Get latest version of a mapping config by id V2
     */
    'get'(
      parameters?: Parameters<Paths.GetMappingConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMappingConfig.Responses.$200>
    /**
     * putMappingConfig - putMappingConfig
     * 
     * Stores new version of entity mapping config
     */
    'put'(
      parameters?: Parameters<Paths.PutMappingConfig.PathParameters> | null,
      data?: Paths.PutMappingConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutMappingConfig.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AppendValueMapper = Components.Schemas.AppendValueMapper;
export type AttributeOrigin = Components.Schemas.AttributeOrigin;
export type ConditionNode = Components.Schemas.ConditionNode;
export type CopyValueMapper = Components.Schemas.CopyValueMapper;
export type Entity = Components.Schemas.Entity;
export type EntityRef = Components.Schemas.EntityRef;
export type ExecuteMappingReq = Components.Schemas.ExecuteMappingReq;
export type ExecuteMappingResp = Components.Schemas.ExecuteMappingResp;
export type ExecuteRelationsReq = Components.Schemas.ExecuteRelationsReq;
export type ExecuteRelationsResp = Components.Schemas.ExecuteRelationsResp;
export type JourneyRef = Components.Schemas.JourneyRef;
export type Loop_Index_String = Components.Schemas.LoopIndexString;
export type MapCondition = Components.Schemas.MapCondition;
export type MappingAttribute = Components.Schemas.MappingAttribute;
export type MappingAttributeMode = Components.Schemas.MappingAttributeMode;
export type MappingAttributeV2 = Components.Schemas.MappingAttributeV2;
export type MappingConfig = Components.Schemas.MappingConfig;
export type MappingConfigCommonFields = Components.Schemas.MappingConfigCommonFields;
export type MappingConfigV2 = Components.Schemas.MappingConfigV2;
export type MappingConfigs = Components.Schemas.MappingConfigs;
export type MappingConfigsResp = Components.Schemas.MappingConfigsResp;
export type MappingFailure = Components.Schemas.MappingFailure;
export type MappingHistoryEntry = Components.Schemas.MappingHistoryEntry;
export type MappingHistoryResp = Components.Schemas.MappingHistoryResp;
export type MappingSource = Components.Schemas.MappingSource;
export type MappingSourceProperty = Components.Schemas.MappingSourceProperty;
export type MappingSourceTargetType = Components.Schemas.MappingSourceTargetType;
export type MappingWarning = Components.Schemas.MappingWarning;
export type NewRelationItem = Components.Schemas.NewRelationItem;
export type OperationNode = Components.Schemas.OperationNode;
export type OperationObjectNode = Components.Schemas.OperationObjectNode;
export type Owner = Components.Schemas.Owner;
export type PrimitiveJSONValue = Components.Schemas.PrimitiveJSONValue;
export type RandomOperation = Components.Schemas.RandomOperation;
export type RelationAttribute = Components.Schemas.RelationAttribute;
export type RelationItem = Components.Schemas.RelationItem;
export type SearchMappingReq = Components.Schemas.SearchMappingReq;
export type SetValueMapper = Components.Schemas.SetValueMapper;
export type SourceConfig = Components.Schemas.SourceConfig;
export type TargetConfig = Components.Schemas.TargetConfig;
