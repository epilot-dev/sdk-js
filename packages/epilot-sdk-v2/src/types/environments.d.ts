/* Auto-copied from environments-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface EnvironmentGroup {
            name: string;
            description?: string;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface EnvironmentGroupList {
            items: EnvironmentGroup[];
        }
        export interface EnvironmentGroupUpsertRequest {
            description?: string;
        }
        export type EnvironmentValueType = "String" | "SecretString";
        export interface EnvironmentVariable {
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            type: EnvironmentValueType;
            description?: string;
            /**
             * Optional group name for organising variables in the UI
             */
            group?: string;
            /**
             * Value is returned for String type, omitted for SecretString
             */
            value?: string;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface EnvironmentVariableCreateRequest {
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            type: EnvironmentValueType;
            description?: string;
            group?: string;
            value?: string;
        }
        export interface EnvironmentVariableList {
            items: EnvironmentVariableListItem[];
        }
        export interface EnvironmentVariableListItem {
            key: string;
            type: EnvironmentValueType;
            description?: string;
            /**
             * Optional group name for organising variables in the UI
             */
            group?: string;
            /**
             * Value is returned for String type, omitted for SecretString
             */
            value?: string;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface EnvironmentVariableUpdateRequest {
            /**
             * Type of variable. Used when creating a new variable. Defaults to String.
             */
            type?: "String" | "SecretString";
            value?: string;
            description?: string;
            group?: string;
        }
    }
}
export declare namespace Paths {
    namespace CreateEnvironmentVariable {
        export type RequestBody = Components.Schemas.EnvironmentVariableCreateRequest;
        namespace Responses {
            export type $201 = Components.Schemas.EnvironmentVariable;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeleteEnvironmentGroup {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeleteEnvironmentVariable {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetEnvironmentVariable {
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentVariable;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace ListEnvironmentGroups {
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentGroupList;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace ListEnvironmentVariables {
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentVariableList;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace PutEnvironmentGroup {
        export type RequestBody = Components.Schemas.EnvironmentGroupUpsertRequest;
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentGroup;
            export type $201 = Components.Schemas.EnvironmentGroup;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace UpdateEnvironmentVariable {
        export type RequestBody = Components.Schemas.EnvironmentVariableUpdateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentVariable;
            export type $201 = Components.Schemas.EnvironmentVariable;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace V1Environments$Key {
        namespace Parameters {
            export type Key = string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
        }
        export interface PathParameters {
            key: Parameters.Key /* ^[a-z0-9][a-z0-9_.\-]{0,127}$ */;
        }
    }
    namespace V1EnvironmentsGroups$Name {
        namespace Parameters {
            export type Name = string;
        }
        export interface PathParameters {
            name: Parameters.Name;
        }
    }
}


export interface OperationMethods {
  /**
   * listEnvironmentVariables - List environment variables
   * 
   * List all environment variables for the organization. Returns metadata only, no secret values.
   */
  'listEnvironmentVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEnvironmentVariables.Responses.$200>
  /**
   * createEnvironmentVariable - Create environment variable
   * 
   * Create a new environment variable or secret for the organization.
   */
  'createEnvironmentVariable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateEnvironmentVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEnvironmentVariable.Responses.$201>
  /**
   * listEnvironmentGroups - List environment groups
   * 
   * List all environment groups for the organization.
   */
  'listEnvironmentGroups'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEnvironmentGroups.Responses.$200>
  /**
   * putEnvironmentGroup - putEnvironmentGroup
   */
  'putEnvironmentGroup'(
    parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
    data?: Paths.PutEnvironmentGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutEnvironmentGroup.Responses.$200 | Paths.PutEnvironmentGroup.Responses.$201>
  /**
   * deleteEnvironmentGroup - Delete an environment group
   * 
   * Deletes a group. Variables assigned to this group become ungrouped.
   */
  'deleteEnvironmentGroup'(
    parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEnvironmentGroup.Responses.$204>
  /**
   * getEnvironmentVariable - Get environment variable
   * 
   * Get an environment variable by key. Returns value only for String type, omitted for SecretString.
   */
  'getEnvironmentVariable'(
    parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEnvironmentVariable.Responses.$200>
  /**
   * updateEnvironmentVariable - Update environment variable
   * 
   * Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist.
   */
  'updateEnvironmentVariable'(
    parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
    data?: Paths.UpdateEnvironmentVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEnvironmentVariable.Responses.$200 | Paths.UpdateEnvironmentVariable.Responses.$201>
  /**
   * deleteEnvironmentVariable - Delete environment variable
   * 
   * Delete an environment variable by key.
   */
  'deleteEnvironmentVariable'(
    parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEnvironmentVariable.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/environments']: {
    /**
     * listEnvironmentVariables - List environment variables
     * 
     * List all environment variables for the organization. Returns metadata only, no secret values.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEnvironmentVariables.Responses.$200>
    /**
     * createEnvironmentVariable - Create environment variable
     * 
     * Create a new environment variable or secret for the organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateEnvironmentVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEnvironmentVariable.Responses.$201>
  }
  ['/v1/environments/groups']: {
    /**
     * listEnvironmentGroups - List environment groups
     * 
     * List all environment groups for the organization.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEnvironmentGroups.Responses.$200>
  }
  ['/v1/environments/groups/{name}']: {
    /**
     * putEnvironmentGroup - putEnvironmentGroup
     */
    'put'(
      parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
      data?: Paths.PutEnvironmentGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutEnvironmentGroup.Responses.$200 | Paths.PutEnvironmentGroup.Responses.$201>
    /**
     * deleteEnvironmentGroup - Delete an environment group
     * 
     * Deletes a group. Variables assigned to this group become ungrouped.
     */
    'delete'(
      parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEnvironmentGroup.Responses.$204>
  }
  ['/v1/environments/{key}']: {
    /**
     * getEnvironmentVariable - Get environment variable
     * 
     * Get an environment variable by key. Returns value only for String type, omitted for SecretString.
     */
    'get'(
      parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEnvironmentVariable.Responses.$200>
    /**
     * updateEnvironmentVariable - Update environment variable
     * 
     * Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist.
     */
    'put'(
      parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
      data?: Paths.UpdateEnvironmentVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEnvironmentVariable.Responses.$200 | Paths.UpdateEnvironmentVariable.Responses.$201>
    /**
     * deleteEnvironmentVariable - Delete environment variable
     * 
     * Delete an environment variable by key.
     */
    'delete'(
      parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEnvironmentVariable.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type EnvironmentGroup = Components.Schemas.EnvironmentGroup;
export type EnvironmentGroupList = Components.Schemas.EnvironmentGroupList;
export type EnvironmentGroupUpsertRequest = Components.Schemas.EnvironmentGroupUpsertRequest;
export type EnvironmentValueType = Components.Schemas.EnvironmentValueType;
export type EnvironmentVariable = Components.Schemas.EnvironmentVariable;
export type EnvironmentVariableCreateRequest = Components.Schemas.EnvironmentVariableCreateRequest;
export type EnvironmentVariableList = Components.Schemas.EnvironmentVariableList;
export type EnvironmentVariableListItem = Components.Schemas.EnvironmentVariableListItem;
export type EnvironmentVariableUpdateRequest = Components.Schemas.EnvironmentVariableUpdateRequest;
