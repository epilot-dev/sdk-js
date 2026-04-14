import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type HydrateQueryParam = boolean;
        export type StrictQueryParam = boolean;
        export type TargetIdPathParam = /**
         * example:
         * 123e4567-e89b-12d3-a456-426614174000
         */
        Schemas.BaseUUID /* uuid */;
    }
    export interface PathParameters {
        TargetIdPathParam?: Parameters.TargetIdPathParam;
    }
    export interface QueryParameters {
        HydrateQueryParam?: Parameters.HydrateQueryParam;
        StrictQueryParam?: Parameters.StrictQueryParam;
    }
    namespace RequestBodies {
        export type TargetCreateRequest = Schemas.TargetCreate;
        export type TargetPatchRequest = Schemas.TargetPatch;
        export type TargetUpdateRequest = Schemas.TargetCreate;
    }
    namespace Responses {
        export type ClientErrorResponse = Schemas.ClientError;
        export type ServerErrorResponse = Schemas.ServerError;
        export type TargetResponse = Schemas.Target;
    }
    namespace Schemas {
        /**
         * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
         */
        export interface BaseEntityAcl {
            view?: string[];
            edit?: string[];
            delete?: string[];
        }
        /**
         * The user / organization owning this entity.
         *
         * Note: Owner implicitly has access to the entity regardless of ACLs.
         *
         */
        export interface BaseEntityOwner {
            /**
             * example:
             * 123
             */
            org_id: string;
            /**
             * example:
             * 123
             */
            user_id?: string;
        }
        export interface BaseError {
            /**
             * example:
             * 404
             */
            status: number;
            /**
             * example:
             * Entity not found
             */
            message: string;
        }
        export type BasePurpose = string[] | null;
        export interface BaseRelation {
            $relation?: {
                entity_id?: /**
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                BaseUUID /* uuid */;
                _tags?: BaseTags;
            }[];
        }
        export interface BaseSystemFields {
            _tags?: BaseTags;
            _purpose?: BasePurpose;
            _files?: BaseRelation;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * Additional fields that are not part of the schema
             * example:
             * {}
             */
            __additional?: {
                [name: string]: any;
            } | null;
        }
        export interface BaseSystemFieldsRequired {
        }
        export interface BaseSystemReadonlyFields {
            _id?: /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            BaseUUID /* uuid */;
            _schema?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _tags?: BaseTags;
            _files?: BaseRelation;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            _title?: string;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
        }
        export type BaseTags = string[] | null;
        export interface BaseTarget {
            _schema?: "target";
            /**
             * The description for the target
             */
            name?: string;
            /**
             * The description of the target
             */
            description?: string;
            /**
             * The schema of the target entities
             */
            entity_schema?: string;
            /**
             * The filters on the targeted schema
             */
            entity_filters?: {
                filter?: {
                    /**
                     * The list of applied filters on targeted schema
                     */
                    items?: {
                        /**
                         * The key of the filter
                         */
                        key?: string;
                        /**
                         * The operator of the filter
                         */
                        operator?: string;
                        value?: string | string[];
                    }[];
                    /**
                     * The combination of the filters
                     */
                    combination?: string;
                };
            };
        }
        export interface BaseTargetRequired {
        }
        /**
         * example:
         * 123e4567-e89b-12d3-a456-426614174000
         */
        export type BaseUUID = string; // uuid
        export type ClientError = BaseError;
        export type ServerError = BaseError;
        export interface Target {
            _id?: /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            BaseUUID /* uuid */;
            _schema: "target";
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _tags?: BaseTags;
            _files?: BaseRelation;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            _title?: string;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
            /**
             * The description for the target
             */
            name: string;
            /**
             * The description of the target
             */
            description?: string;
            /**
             * The schema of the target entities
             */
            entity_schema?: string;
            /**
             * The filters on the targeted schema
             */
            entity_filters?: {
                filter?: {
                    /**
                     * The list of applied filters on targeted schema
                     */
                    items?: {
                        /**
                         * The key of the filter
                         */
                        key?: string;
                        /**
                         * The operator of the filter
                         */
                        operator?: string;
                        value?: string | string[];
                    }[];
                    /**
                     * The combination of the filters
                     */
                    combination?: string;
                };
            };
            _purpose?: BasePurpose;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * Additional fields that are not part of the schema
             * example:
             * {}
             */
            __additional?: {
                [name: string]: any;
            } | null;
        }
        export interface TargetCreate {
            _schema?: "target";
            /**
             * The description for the target
             */
            name: string;
            /**
             * The description of the target
             */
            description?: string;
            /**
             * The schema of the target entities
             */
            entity_schema?: string;
            /**
             * The filters on the targeted schema
             */
            entity_filters?: {
                filter?: {
                    /**
                     * The list of applied filters on targeted schema
                     */
                    items?: {
                        /**
                         * The key of the filter
                         */
                        key?: string;
                        /**
                         * The operator of the filter
                         */
                        operator?: string;
                        value?: string | string[];
                    }[];
                    /**
                     * The combination of the filters
                     */
                    combination?: string;
                };
            };
            _tags?: BaseTags;
            _purpose?: BasePurpose;
            _files?: BaseRelation;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * Additional fields that are not part of the schema
             * example:
             * {}
             */
            __additional?: {
                [name: string]: any;
            } | null;
        }
        export interface TargetPatch {
            _schema?: "target";
            /**
             * The description for the target
             */
            name?: string;
            /**
             * The description of the target
             */
            description?: string;
            /**
             * The schema of the target entities
             */
            entity_schema?: string;
            /**
             * The filters on the targeted schema
             */
            entity_filters?: {
                filter?: {
                    /**
                     * The list of applied filters on targeted schema
                     */
                    items?: {
                        /**
                         * The key of the filter
                         */
                        key?: string;
                        /**
                         * The operator of the filter
                         */
                        operator?: string;
                        value?: string | string[];
                    }[];
                    /**
                     * The combination of the filters
                     */
                    combination?: string;
                };
            };
            _tags?: BaseTags;
            _purpose?: BasePurpose;
            _files?: BaseRelation;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * Additional fields that are not part of the schema
             * example:
             * {}
             */
            __additional?: {
                [name: string]: any;
            } | null;
        }
    }
}
declare namespace Paths {
    namespace CreateTarget {
        export type RequestBody = Components.RequestBodies.TargetCreateRequest;
        namespace Responses {
            export type $201 = Components.Responses.TargetResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace DeleteTarget {
        namespace Parameters {
            export type TargetId = /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            targetId: Parameters.TargetId;
        }
        namespace Responses {
            export type $200 = Components.Responses.TargetResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace GetTarget {
        namespace Parameters {
            export type Hydrate = boolean;
            export type Strict = boolean;
            export type TargetId = /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            targetId: Parameters.TargetId;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
            strict?: Parameters.Strict;
        }
        namespace Responses {
            export type $200 = Components.Responses.TargetResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace PatchTarget {
        namespace Parameters {
            export type TargetId = /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            targetId: Parameters.TargetId;
        }
        export type RequestBody = Components.RequestBodies.TargetPatchRequest;
        namespace Responses {
            export type $200 = Components.Responses.TargetResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
    namespace UpdateTarget {
        namespace Parameters {
            export type TargetId = /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            Components.Schemas.BaseUUID /* uuid */;
        }
        export interface PathParameters {
            targetId: Parameters.TargetId;
        }
        export type RequestBody = Components.RequestBodies.TargetUpdateRequest;
        namespace Responses {
            export type $200 = Components.Responses.TargetResponse;
            export type $400 = Components.Responses.ClientErrorResponse;
            export type $500 = Components.Responses.ServerErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * createTarget - createTarget
   * 
   * Create a new target entity
   */
  'createTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTarget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTarget.Responses.$201>
  /**
   * getTarget - getTarget
   * 
   * Read a specific target entity by a given id
   */
  'getTarget'(
    parameters?: Parameters<Paths.GetTarget.QueryParameters & Paths.GetTarget.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTarget.Responses.$200>
  /**
   * updateTarget - updateTarget
   * 
   * Completly replace a specific target entity's properties by a given id and a given payload
   */
  'updateTarget'(
    parameters?: Parameters<Paths.UpdateTarget.PathParameters> | null,
    data?: Paths.UpdateTarget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTarget.Responses.$200>
  /**
   * patchTarget - patchTarget
   * 
   * Partially update a specific target entity's properties by a given id and a given payload
   */
  'patchTarget'(
    parameters?: Parameters<Paths.PatchTarget.PathParameters> | null,
    data?: Paths.PatchTarget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchTarget.Responses.$200>
  /**
   * deleteTarget - deleteTarget
   * 
   * Delete a specific target entity by a given id
   */
  'deleteTarget'(
    parameters?: Parameters<Paths.DeleteTarget.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteTarget.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/target']: {
    /**
     * createTarget - createTarget
     * 
     * Create a new target entity
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTarget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTarget.Responses.$201>
  }
  ['/v1/target/{targetId}']: {
    /**
     * getTarget - getTarget
     * 
     * Read a specific target entity by a given id
     */
    'get'(
      parameters?: Parameters<Paths.GetTarget.QueryParameters & Paths.GetTarget.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTarget.Responses.$200>
    /**
     * deleteTarget - deleteTarget
     * 
     * Delete a specific target entity by a given id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTarget.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteTarget.Responses.$200>
    /**
     * patchTarget - patchTarget
     * 
     * Partially update a specific target entity's properties by a given id and a given payload
     */
    'patch'(
      parameters?: Parameters<Paths.PatchTarget.PathParameters> | null,
      data?: Paths.PatchTarget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchTarget.Responses.$200>
    /**
     * updateTarget - updateTarget
     * 
     * Completly replace a specific target entity's properties by a given id and a given payload
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTarget.PathParameters> | null,
      data?: Paths.UpdateTarget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTarget.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type BaseEntityAcl = Components.Schemas.BaseEntityAcl;
export type BaseEntityOwner = Components.Schemas.BaseEntityOwner;
export type BaseError = Components.Schemas.BaseError;
export type BasePurpose = Components.Schemas.BasePurpose;
export type BaseRelation = Components.Schemas.BaseRelation;
export type BaseSystemFields = Components.Schemas.BaseSystemFields;
export type BaseSystemFieldsRequired = Components.Schemas.BaseSystemFieldsRequired;
export type BaseSystemReadonlyFields = Components.Schemas.BaseSystemReadonlyFields;
export type BaseTags = Components.Schemas.BaseTags;
export type BaseTarget = Components.Schemas.BaseTarget;
export type BaseTargetRequired = Components.Schemas.BaseTargetRequired;
export type BaseUUID = Components.Schemas.BaseUUID;
export type ClientError = Components.Schemas.ClientError;
export type ServerError = Components.Schemas.ServerError;
export type Target = Components.Schemas.Target;
export type TargetCreate = Components.Schemas.TargetCreate;
export type TargetPatch = Components.Schemas.TargetPatch;
