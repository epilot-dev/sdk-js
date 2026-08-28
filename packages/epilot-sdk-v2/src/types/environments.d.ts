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
        export type EnvironmentOption = {
            value: string;
            label: string;
        } | {
            value: string;
            labels: {
                [name: string]: string;
            };
        };
        /**
         * A variable's value. The JSON type corresponds to the variable's `type`:
         * `String`, `SecretString` and `Text` are strings, `Number` is a number,
         * `Boolean` is a boolean, and `Options` is an object. Numbers are IEEE 754
         * doubles; integers above 2^53 may lose precision on round-trip.
         *
         */
        export type EnvironmentValue = /**
         * A variable's value. The JSON type corresponds to the variable's `type`:
         * `String`, `SecretString` and `Text` are strings, `Number` is a number,
         * `Boolean` is a boolean, and `Options` is an object. Numbers are IEEE 754
         * doubles; integers above 2^53 may lose precision on round-trip.
         *
         */
        string | number | boolean | OptionsValue;
        /**
         * The structure a variable's value holds. `SecretString` is encrypted at rest and
         * its value is never returned. `Text`, `Number`, `Boolean` and `Options` may be
         * served to browser-facing consumers; `String` and `SecretString` may not.
         *
         */
        export type EnvironmentValueType = "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Options";
        export interface EnvironmentVariable {
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            type: /**
             * The structure a variable's value holds. `SecretString` is encrypted at rest and
             * its value is never returned. `Text`, `Number`, `Boolean` and `Options` may be
             * served to browser-facing consumers; `String` and `SecretString` may not.
             *
             */
            EnvironmentValueType;
            description?: string;
            /**
             * Optional group name for organising variables in the UI
             */
            group?: string;
            /**
             * Returned for non-secret types, omitted for SecretString. Also omitted when
             * the variable has been created without a value — for example by a blueprint
             * install, which syncs a variable's key and type but never its value.
             *
             */
            value?: /**
             * Returned for non-secret types, omitted for SecretString. Also omitted when
             * the variable has been created without a value — for example by a blueprint
             * install, which syncs a variable's key and type but never its value.
             *
             */
            string | number | boolean | OptionsValue;
            /**
             * Whether the variable is protected from editing
             */
            protected?: boolean;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface EnvironmentVariableCreateRequest {
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            type: /**
             * The structure a variable's value holds. `SecretString` is encrypted at rest and
             * its value is never returned. `Text`, `Number`, `Boolean` and `Options` may be
             * served to browser-facing consumers; `String` and `SecretString` may not.
             *
             */
            EnvironmentValueType;
            description?: string;
            group?: string;
            value?: /**
             * A variable's value. The JSON type corresponds to the variable's `type`:
             * `String`, `SecretString` and `Text` are strings, `Number` is a number,
             * `Boolean` is a boolean, and `Options` is an object. Numbers are IEEE 754
             * doubles; integers above 2^53 may lose precision on round-trip.
             *
             */
            EnvironmentValue;
            /**
             * Whether the variable is protected from editing
             */
            protected?: boolean;
        }
        export interface EnvironmentVariableList {
            items: EnvironmentVariableListItem[];
        }
        export interface EnvironmentVariableListItem {
            key: string;
            type: /**
             * The structure a variable's value holds. `SecretString` is encrypted at rest and
             * its value is never returned. `Text`, `Number`, `Boolean` and `Options` may be
             * served to browser-facing consumers; `String` and `SecretString` may not.
             *
             */
            EnvironmentValueType;
            description?: string;
            /**
             * Optional group name for organising variables in the UI
             */
            group?: string;
            /**
             * Returned for non-secret types, omitted for SecretString. Also omitted when
             * the variable has been created without a value — for example by a blueprint
             * install, which syncs a variable's key and type but never its value.
             *
             */
            value?: /**
             * Returned for non-secret types, omitted for SecretString. Also omitted when
             * the variable has been created without a value — for example by a blueprint
             * install, which syncs a variable's key and type but never its value.
             *
             */
            string | number | boolean | OptionsValue;
            /**
             * Whether the variable is protected from editing
             */
            protected?: boolean;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface EnvironmentVariableUpdateRequest {
            /**
             * Type of variable. Used when creating a new variable. Defaults to String.
             */
            type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Options";
            value?: /**
             * A variable's value. The JSON type corresponds to the variable's `type`:
             * `String`, `SecretString` and `Text` are strings, `Number` is a number,
             * `Boolean` is a boolean, and `Options` is an object. Numbers are IEEE 754
             * doubles; integers above 2^53 may lose precision on round-trip.
             *
             */
            EnvironmentValue;
            description?: string;
            group?: string;
            /**
             * Whether the variable is protected from editing
             */
            protected?: boolean;
        }
        export interface OptionsValue {
            fallbackLanguage?: string;
            options: [
                EnvironmentOption,
                ...EnvironmentOption[]
            ];
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
            export interface $409 {
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
   * listEnvironmentVariables - listEnvironmentVariables
   * 
   * List all environment variables for the organization. Returns metadata only, no secret values.
   */
  'listEnvironmentVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEnvironmentVariables.Responses.$200>
  /**
   * createEnvironmentVariable - createEnvironmentVariable
   * 
   * Create a new environment variable or secret for the organization. If `group` is provided and the group does not yet exist, it is created automatically.
   */
  'createEnvironmentVariable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateEnvironmentVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEnvironmentVariable.Responses.$201>
  /**
   * listEnvironmentGroups - listEnvironmentGroups
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
   * 
   * Create or update an environment group by name. Acts as an upsert — creates the group if it does not exist.
   */
  'putEnvironmentGroup'(
    parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
    data?: Paths.PutEnvironmentGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutEnvironmentGroup.Responses.$200 | Paths.PutEnvironmentGroup.Responses.$201>
  /**
   * deleteEnvironmentGroup - deleteEnvironmentGroup
   * 
   * Deletes a group. Variables assigned to this group become ungrouped.
   */
  'deleteEnvironmentGroup'(
    parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEnvironmentGroup.Responses.$204>
  /**
   * getEnvironmentVariable - getEnvironmentVariable
   * 
   * Get an environment variable by key. Returns value for non-secret types, omitted for SecretString.
   */
  'getEnvironmentVariable'(
    parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEnvironmentVariable.Responses.$200>
  /**
   * updateEnvironmentVariable - updateEnvironmentVariable
   * 
   * Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist. If `group` is provided and the group does not yet exist, it is created automatically.
   */
  'updateEnvironmentVariable'(
    parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
    data?: Paths.UpdateEnvironmentVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEnvironmentVariable.Responses.$200 | Paths.UpdateEnvironmentVariable.Responses.$201>
  /**
   * deleteEnvironmentVariable - deleteEnvironmentVariable
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
     * listEnvironmentVariables - listEnvironmentVariables
     * 
     * List all environment variables for the organization. Returns metadata only, no secret values.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEnvironmentVariables.Responses.$200>
    /**
     * createEnvironmentVariable - createEnvironmentVariable
     * 
     * Create a new environment variable or secret for the organization. If `group` is provided and the group does not yet exist, it is created automatically.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateEnvironmentVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEnvironmentVariable.Responses.$201>
  }
  ['/v1/environments/groups']: {
    /**
     * listEnvironmentGroups - listEnvironmentGroups
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
     * 
     * Create or update an environment group by name. Acts as an upsert — creates the group if it does not exist.
     */
    'put'(
      parameters?: Parameters<Paths.V1EnvironmentsGroups$Name.PathParameters> | null,
      data?: Paths.PutEnvironmentGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutEnvironmentGroup.Responses.$200 | Paths.PutEnvironmentGroup.Responses.$201>
    /**
     * deleteEnvironmentGroup - deleteEnvironmentGroup
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
     * getEnvironmentVariable - getEnvironmentVariable
     * 
     * Get an environment variable by key. Returns value for non-secret types, omitted for SecretString.
     */
    'get'(
      parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEnvironmentVariable.Responses.$200>
    /**
     * updateEnvironmentVariable - updateEnvironmentVariable
     * 
     * Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist. If `group` is provided and the group does not yet exist, it is created automatically.
     */
    'put'(
      parameters?: Parameters<Paths.V1Environments$Key.PathParameters> | null,
      data?: Paths.UpdateEnvironmentVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEnvironmentVariable.Responses.$200 | Paths.UpdateEnvironmentVariable.Responses.$201>
    /**
     * deleteEnvironmentVariable - deleteEnvironmentVariable
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
export type EnvironmentOption = Components.Schemas.EnvironmentOption;
export type EnvironmentValue = Components.Schemas.EnvironmentValue;
export type EnvironmentValueType = Components.Schemas.EnvironmentValueType;
export type EnvironmentVariable = Components.Schemas.EnvironmentVariable;
export type EnvironmentVariableCreateRequest = Components.Schemas.EnvironmentVariableCreateRequest;
export type EnvironmentVariableList = Components.Schemas.EnvironmentVariableList;
export type EnvironmentVariableListItem = Components.Schemas.EnvironmentVariableListItem;
export type EnvironmentVariableUpdateRequest = Components.Schemas.EnvironmentVariableUpdateRequest;
export type OptionsValue = Components.Schemas.OptionsValue;
