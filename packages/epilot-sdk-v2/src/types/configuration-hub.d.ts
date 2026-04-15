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
      count: number;
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
      count: number;
      items: ConfigNode[];
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
    }
    export interface PathParameters {
      type: Parameters.Type;
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
    }
    export interface PathParameters {
      type: Parameters.Type;
      id: Parameters.Id;
    }
    namespace Responses {
      export interface $200 {
        results: Components.Schemas.ConfigNode[];
      }
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
    parameters: Parameters<Paths.ListConfigs.PathParameters>,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ListConfigs.Responses.$200>;

  'getConfigDependencies'(
    parameters: Parameters<Paths.GetConfigDependencies.PathParameters>,
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
