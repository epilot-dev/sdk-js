/* Auto-copied from entity-ui-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type WidgetDefinitionRefPathParam = /**
         * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
         * example:
         * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
         */
        Schemas.WidgetDefinitionRef /* ^[a-f0-9]{64}$ */;
    }
    export interface PathParameters {
        WidgetDefinitionRefPathParam?: Parameters.WidgetDefinitionRefPathParam;
    }
    namespace Responses {
        export type BadRequest = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
        export type Forbidden = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
        export type NotFound = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
        export type PayloadTooLarge = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
        export type ServiceUnavailable = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
        export type Unauthorized = /* Standard error response format for all API errors */ Schemas.ErrorResponse;
    }
    namespace Schemas {
        export interface BatchGetWidgetDefinitionsRequest {
            refs: [
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?,
                /**
                 * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
                 * example:
                 * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                 */
                WidgetDefinitionRef /* ^[a-f0-9]{64}$ */?
            ];
        }
        export interface BatchGetWidgetDefinitionsResponse {
            /**
             * Stored definitions keyed by ref
             */
            definitions: {
                [name: string]: /**
                 * Version 1 of an AI widget definition. Unknown keys are rejected at every level, because any extra key would
                 * produce a different `ref` for an otherwise identical definition.
                 *
                 */
                WidgetDefinition;
            };
            /**
             * Requested refs that are not stored in the organization
             */
            missing: /**
             * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
             * example:
             * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
             */
            WidgetDefinitionRef /* ^[a-f0-9]{64}$ */[];
        }
        /**
         * Standard error response format for all API errors
         */
        export interface ErrorResponse {
            /**
             * Error message, or the list of validation errors for a 400
             */
            error: /* Error message, or the list of validation errors for a 400 */ string | {
                [key: string]: any;
            }[];
            /**
             * HTTP status code of the error
             */
            status: number;
        }
        /**
         * Version 1 of an AI widget definition. Unknown keys are rejected at every level, because any extra key would
         * produce a different `ref` for an otherwise identical definition.
         *
         */
        export interface WidgetDefinition {
            version: 1;
            /**
             * The admin's own words
             */
            prompt: string;
            manifest: WidgetManifest;
            /**
             * Body fragment rendered inside the sandboxed frame
             */
            html: string;
            strings: /* Localized string tables; both include `title` */ WidgetStrings;
            suggestions?: WidgetSuggestions;
        }
        /**
         * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
         * example:
         * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
         */
        export type WidgetDefinitionRef = string; // ^[a-f0-9]{64}$
        export interface WidgetDefinitionRefResponse {
            ref: /**
             * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
             * example:
             * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
             */
            WidgetDefinitionRef /* ^[a-f0-9]{64}$ */;
        }
        export interface WidgetManifest {
            relations: WidgetRelations;
            /**
             * Host-injected libraries, `[]` for none
             */
            libs: ("echarts")[];
            /**
             * Icon names the widget renders
             */
            icons?: [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
        }
        export type WidgetRelations = {
            mode: "direct" | "reverse" | "both" | "none" | "direct" | "reverse" | "both";
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: string[];
            size: number;
        } | {
            mode: "none" | "none" | "direct" | "reverse" | "both";
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: [
            ];
            size: number;
        };
        /**
         * String table of one locale. Keys are what the widget passes to `t()`; both tables include `title`.
         *
         * Every key must match `^[a-z0-9_]{1,64}$` (snake_case, at most 64 characters) and may not be `__proto__`. The
         * server enforces this and answers `400` naming the offending key; OpenAPI 3.0 has no keyword to express it.
         *
         */
        export interface WidgetStringTable {
            [name: string]: string;
        }
        /**
         * Localized string tables; both include `title`
         */
        export interface WidgetStrings {
            de: /**
             * String table of one locale. Keys are what the widget passes to `t()`; both tables include `title`.
             *
             * Every key must match `^[a-z0-9_]{1,64}$` (snake_case, at most 64 characters) and may not be `__proto__`. The
             * server enforces this and answers `400` naming the offending key; OpenAPI 3.0 has no keyword to express it.
             *
             */
            WidgetStringTable;
            en: /**
             * String table of one locale. Keys are what the widget passes to `t()`; both tables include `title`.
             *
             * Every key must match `^[a-z0-9_]{1,64}$` (snake_case, at most 64 characters) and may not be `__proto__`. The
             * server enforces this and answers `400` naming the offending key; OpenAPI 3.0 has no keyword to express it.
             *
             */
            WidgetStringTable;
        }
        export interface WidgetSuggestions {
            de: [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            en: [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
        }
    }
}
export declare namespace Paths {
    namespace BatchGetWidgetDefinitions {
        export type RequestBody = Components.Schemas.BatchGetWidgetDefinitionsRequest;
        namespace Responses {
            export type $200 = Components.Schemas.BatchGetWidgetDefinitionsResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $503 = Components.Responses.ServiceUnavailable;
        }
    }
    namespace GetWidgetDefinition {
        namespace Parameters {
            export type Ref = /**
             * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
             * example:
             * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
             */
            Components.Schemas.WidgetDefinitionRef /* ^[a-f0-9]{64}$ */;
        }
        export interface PathParameters {
            ref: Parameters.Ref;
        }
        namespace Responses {
            export type $200 = /**
             * Version 1 of an AI widget definition. Unknown keys are rejected at every level, because any extra key would
             * produce a different `ref` for an otherwise identical definition.
             *
             */
            Components.Schemas.WidgetDefinition;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace PutWidgetDefinition {
        export type RequestBody = /**
         * Version 1 of an AI widget definition. Unknown keys are rejected at every level, because any extra key would
         * produce a different `ref` for an otherwise identical definition.
         *
         */
        Components.Schemas.WidgetDefinition;
        namespace Responses {
            export type $200 = Components.Schemas.WidgetDefinitionRefResponse;
            export type $201 = Components.Schemas.WidgetDefinitionRefResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $413 = Components.Responses.PayloadTooLarge;
        }
    }
}


export interface OperationMethods {
  /**
   * putWidgetDefinition - putWidgetDefinition
   * 
   * Stores a widget definition and returns its `ref`.
   * 
   * The server canonicalizes the body with RFC 8785 (JCS) and hashes the canonical UTF-8 bytes with SHA-256.
   * Storing a definition that already exists in the organization is a no-op that returns `200` with the same
   * `ref`; the stored item is never overwritten.
   * 
   * Requires `schema:update` in the organization.
   * 
   */
  'putWidgetDefinition'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PutWidgetDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutWidgetDefinition.Responses.$200 | Paths.PutWidgetDefinition.Responses.$201>
  /**
   * getWidgetDefinition - getWidgetDefinition
   * 
   * Returns a stored widget definition in its canonical form.
   * 
   * The response never changes for a given `ref`, so it is cacheable forever.
   * 
   * Requires `entity:view` in the organization of the token.
   * 
   */
  'getWidgetDefinition'(
    parameters?: Parameters<Paths.GetWidgetDefinition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWidgetDefinition.Responses.$200>
  /**
   * batchGetWidgetDefinitions - batchGetWidgetDefinitions
   * 
   * Returns up to 20 stored widget definitions by `ref`. Refs that are not stored in the organization are
   * listed in `missing`.
   * 
   * The limit keeps the largest possible response under Lambda's 6MB synchronous response limit: 20 definitions
   * at the 131072-byte canonical cap, with every byte escaped a second time inside the Lambda response.
   * 
   * Requires `entity:view` in the organization of the token.
   * 
   */
  'batchGetWidgetDefinitions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BatchGetWidgetDefinitions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchGetWidgetDefinitions.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/entity-ui/widget-definitions']: {
    /**
     * putWidgetDefinition - putWidgetDefinition
     * 
     * Stores a widget definition and returns its `ref`.
     * 
     * The server canonicalizes the body with RFC 8785 (JCS) and hashes the canonical UTF-8 bytes with SHA-256.
     * Storing a definition that already exists in the organization is a no-op that returns `200` with the same
     * `ref`; the stored item is never overwritten.
     * 
     * Requires `schema:update` in the organization.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PutWidgetDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutWidgetDefinition.Responses.$200 | Paths.PutWidgetDefinition.Responses.$201>
  }
  ['/v1/entity-ui/widget-definitions/{ref}']: {
    /**
     * getWidgetDefinition - getWidgetDefinition
     * 
     * Returns a stored widget definition in its canonical form.
     * 
     * The response never changes for a given `ref`, so it is cacheable forever.
     * 
     * Requires `entity:view` in the organization of the token.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetWidgetDefinition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWidgetDefinition.Responses.$200>
  }
  ['/v1/entity-ui/widget-definitions/batch-get']: {
    /**
     * batchGetWidgetDefinitions - batchGetWidgetDefinitions
     * 
     * Returns up to 20 stored widget definitions by `ref`. Refs that are not stored in the organization are
     * listed in `missing`.
     * 
     * The limit keeps the largest possible response under Lambda's 6MB synchronous response limit: 20 definitions
     * at the 131072-byte canonical cap, with every byte escaped a second time inside the Lambda response.
     * 
     * Requires `entity:view` in the organization of the token.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BatchGetWidgetDefinitions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchGetWidgetDefinitions.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type BatchGetWidgetDefinitionsRequest = Components.Schemas.BatchGetWidgetDefinitionsRequest;
export type BatchGetWidgetDefinitionsResponse = Components.Schemas.BatchGetWidgetDefinitionsResponse;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type WidgetDefinition = Components.Schemas.WidgetDefinition;
export type WidgetDefinitionRef = Components.Schemas.WidgetDefinitionRef;
export type WidgetDefinitionRefResponse = Components.Schemas.WidgetDefinitionRefResponse;
export type WidgetManifest = Components.Schemas.WidgetManifest;
export type WidgetRelations = Components.Schemas.WidgetRelations;
export type WidgetStringTable = Components.Schemas.WidgetStringTable;
export type WidgetStrings = Components.Schemas.WidgetStrings;
export type WidgetSuggestions = Components.Schemas.WidgetSuggestions;
