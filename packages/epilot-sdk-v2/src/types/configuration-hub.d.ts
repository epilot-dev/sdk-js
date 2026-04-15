import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
  namespace Schemas {
    export type ResourceType =
      | 'journey'
      | 'automation_flow'
      | 'workflow_definition'
      | 'closing_reason'
      | 'flow_template'
      | 'schema'
      | 'emailtemplate'
      | 'product'
      | 'price'
      | 'tax'
      | 'coupon'
      | 'file'
      | 'webhook'
      | 'saved_view'
      | 'dashboard'
      | 'kanban'
      | 'role'
      | 'usergroup'
      | 'validation_rule'
      | 'integration'
      | 'app'
      | 'designbuilder'
      | 'notification_template'
      | 'custom_variable'
      | 'environment_variable'
      | 'taxonomy'
      | 'taxonomy_classification'
      | 'entity_mapping'
      | 'portal_config'
      | 'target'
      | 'product_recommendation';

    export interface ConfigTypeInfo {
      type: ResourceType;
      label: string;
      icon: string;
      source_api: string;
      sdk_client: string;
    }

    export interface ConfigNode {
      type: ResourceType;
      id: string;
      title: string;
      updated_at?: string;
      updated_by?: string;
      tags?: string[];
      purposes?: string[];
      link?: string;
    }

    export interface ConfigListResponse {
      type: ResourceType;
      label: string;
      icon: string;
      total?: number;
      next_cursor?: string;
      items: ConfigNode[];
    }

    export interface ConfigDependenciesResponse {
      total?: number;
      next_cursor?: string;
      results: ConfigNode[];
    }

    export interface ErrorResponse {
      status: number;
      error: string;
    }
  }
}

export declare namespace Paths {
  namespace ListConfigTypes {
    namespace Responses {
      export interface $200 {
        results: Components.Schemas.ConfigTypeInfo[];
      }
    }
  }

  namespace ListConfigs {
    namespace Parameters {
      export type Type = Components.Schemas.ResourceType;
      export type Cursor = string;
      export type Size = number;
    }
    export interface PathParameters {
      type: Parameters.Type;
    }
    export interface QueryParameters {
      cursor?: Parameters.Cursor;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.ConfigListResponse;
      export type $400 = Components.Schemas.ErrorResponse;
    }
  }

  namespace GetConfigDependencies {
    namespace Parameters {
      export type Type = Components.Schemas.ResourceType;
      export type Id = string;
      export type Cursor = string;
      export type Size = number;
    }
    export interface PathParameters {
      type: Parameters.Type;
      id: Parameters.Id;
    }
    export interface QueryParameters {
      cursor?: Parameters.Cursor;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.ConfigDependenciesResponse;
      export type $404 = Components.Schemas.ErrorResponse;
    }
  }
}

export interface OperationMethods {
  'listConfigTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ListConfigTypes.Responses.$200>;

  'listConfigs'(
    parameters: Parameters<Paths.ListConfigs.PathParameters & Paths.ListConfigs.QueryParameters>,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ListConfigs.Responses.$200>;

  'getConfigDependencies'(
    parameters: Parameters<Paths.GetConfigDependencies.PathParameters & Paths.GetConfigDependencies.QueryParameters>,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetConfigDependencies.Responses.$200>;
}

export interface PathsDictionary {
  ['/v1/configs/types']: {
    get: OperationMethods['listConfigTypes'];
  };
  ['/v1/configs/{type}']: {
    get: OperationMethods['listConfigs'];
  };
  ['/v1/configs/{type}/{id}/dependencies']: {
    get: OperationMethods['getConfigDependencies'];
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
