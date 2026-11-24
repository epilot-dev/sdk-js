import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type WidgetDefinitionRefPathParam = /**
         * Lowercase hex SHA-256 of the definition's RFC 8785 canonical JSON
         * example:
         * 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
         */
        Schemas.WidgetDefinitionRef /* ^[a-f0-9]{64}$ */;
        export type WidgetDefinitionSchemaQueryParam = string; // ^[a-zA-Z0-9_-]{1,64}$
    }
    export interface PathParameters {
        WidgetDefinitionRefPathParam?: Parameters.WidgetDefinitionRefPathParam;
    }
    export interface QueryParameters {
        WidgetDefinitionSchemaQueryParam?: Parameters.WidgetDefinitionSchemaQueryParam /* ^[a-zA-Z0-9_-]{1,64}$ */;
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
                 * An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
                 * key would produce a different `ref` for an otherwise identical definition.
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
         * An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
         * key would produce a different `ref` for an otherwise identical definition.
         *
         */
        export type WidgetDefinition = /**
         * An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
         * key would produce a different `ref` for an otherwise identical definition.
         *
         */
        /* Version 1 of an AI widget definition. The widget receives every attribute of every record. */ WidgetDefinitionV1 | /**
         * Version 2 of an AI widget definition. The widget receives only the attributes its `manifest.fields` declares,
         * plus `_id`, `_schema` and `_title`.
         *
         * Across both string tables, the UTF-8 bytes of every key plus every value may total at most 65536 bytes. The
         * server enforces this and answers `400`; JSON Schema has no keyword to express it.
         *
         */
        WidgetDefinitionV2;
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
        /**
         * Version 1 of an AI widget definition. The widget receives every attribute of every record.
         */
        export interface WidgetDefinitionV1 {
            version: 1;
            prompt: /**
             * The admin's own words, at most 4000 UTF-16 code units. The server counts code units and answers `400`, because
             * `maxLength` counts code points, so a prompt of astral characters passes it at up to 8000 code units.
             *
             */
            WidgetPrompt;
            manifest: WidgetManifest;
            html: /**
             * Body fragment rendered inside the sandboxed frame, at most 65536 UTF-8 bytes. The server counts bytes and
             * answers `400`, because `maxLength` counts characters.
             *
             */
            WidgetHtml;
            strings: /* Localized string tables; both include `title` */ WidgetStrings;
            suggestions?: WidgetSuggestions;
        }
        /**
         * Version 2 of an AI widget definition. The widget receives only the attributes its `manifest.fields` declares,
         * plus `_id`, `_schema` and `_title`.
         *
         * Across both string tables, the UTF-8 bytes of every key plus every value may total at most 65536 bytes. The
         * server enforces this and answers `400`; JSON Schema has no keyword to express it.
         *
         */
        export interface WidgetDefinitionV2 {
            version: 2;
            prompt: /**
             * The admin's own words, at most 4000 UTF-16 code units. The server counts code units and answers `400`, because
             * `maxLength` counts code points, so a prompt of astral characters passes it at up to 8000 code units.
             *
             */
            WidgetPrompt;
            manifest: WidgetManifestV2;
            html: /**
             * Body fragment rendered inside the sandboxed frame, at most 65536 UTF-8 bytes. The server counts bytes and
             * answers `400`, because `maxLength` counts characters.
             *
             */
            WidgetHtml;
            strings: /* Localized string tables; both include `title` */ WidgetStrings;
            suggestions?: WidgetSuggestions;
        }
        /**
         * Maps an entity schema slug to the top-level attributes the widget reads from records of that schema. A record
         * whose schema has no key receives `_id`, `_schema` and `_title` only.
         *
         * Every key must be 1 to 128 UTF-16 code units and may not be `__proto__`, and every attribute name at most 128
         * UTF-16 code units. The server enforces both and answers `400` naming the offending entry; OpenAPI 3.0 cannot
         * constrain object keys, and `maxLength` counts code points.
         *
         */
        export interface WidgetFields {
            [name: string]: [
                string,
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
        /**
         * Body fragment rendered inside the sandboxed frame, at most 65536 UTF-8 bytes. The server counts bytes and
         * answers `400`, because `maxLength` counts characters.
         *
         */
        export type WidgetHtml = string;
        /**
         * Icon names the widget renders
         */
        export type WidgetIcons = [
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
        /**
         * Host-injected libraries, `[]` for none
         */
        export type WidgetLibs = ("echarts")[];
        export interface WidgetManifest {
            relations: WidgetRelations;
            libs: /* Host-injected libraries, `[]` for none */ WidgetLibs;
            icons?: /* Icon names the widget renders */ WidgetIcons;
        }
        export interface WidgetManifestV2 {
            relations: /**
             * Relations of a version 2 definition: `schemas` names every related schema to load, so it must be non-empty
             * unless mode is none, and empty when mode is none.
             *
             */
            WidgetRelationsV2;
            libs: /* Host-injected libraries, `[]` for none */ WidgetLibs;
            icons?: /* Icon names the widget renders */ WidgetIcons;
            fields: /**
             * Maps an entity schema slug to the top-level attributes the widget reads from records of that schema. A record
             * whose schema has no key receives `_id`, `_schema` and `_title` only.
             *
             * Every key must be 1 to 128 UTF-16 code units and may not be `__proto__`, and every attribute name at most 128
             * UTF-16 code units. The server enforces both and answers `400` naming the offending entry; OpenAPI 3.0 cannot
             * constrain object keys, and `maxLength` counts code points.
             *
             */
            WidgetFields;
        }
        /**
         * The admin's own words, at most 4000 UTF-16 code units. The server counts code units and answers `400`, because
         * `maxLength` counts code points, so a prompt of astral characters passes it at up to 8000 code units.
         *
         */
        export type WidgetPrompt = string;
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
         * Relations of a version 2 definition: `schemas` names every related schema to load, so it must be non-empty
         * unless mode is none, and empty when mode is none.
         *
         */
        export type WidgetRelationsV2 = /**
         * Relations of a version 2 definition: `schemas` names every related schema to load, so it must be non-empty
         * unless mode is none, and empty when mode is none.
         *
         */
        {
            mode: "direct" | "reverse" | "both" | "none" | "direct" | "reverse" | "both" | "none" | "direct" | "reverse" | "both";
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: string[];
            size: number;
        } | {
            mode: "none" | "none" | "direct" | "reverse" | "both" | "none" | "direct" | "reverse" | "both";
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: [
            ];
            size: number;
        } | {
            mode: "none" | "none" | "direct" | "reverse" | "both";
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: string[];
            size: number;
        } | {
            /**
             * Related schemas to load; empty means every related schema, and must be empty when mode is none
             */
            schemas: [
                string,
                ...string[]
            ];
            mode: "none" | "direct" | "reverse" | "both";
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
declare namespace Paths {
    namespace BatchGetWidgetDefinitions {
        namespace Parameters {
            export type Schema = string; // ^[a-zA-Z0-9_-]{1,64}$
        }
        export interface QueryParameters {
            schema?: Parameters.Schema /* ^[a-zA-Z0-9_-]{1,64}$ */;
        }
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
            export type Schema = string; // ^[a-zA-Z0-9_-]{1,64}$
        }
        export interface PathParameters {
            ref: Parameters.Ref;
        }
        export interface QueryParameters {
            schema?: Parameters.Schema /* ^[a-zA-Z0-9_-]{1,64}$ */;
        }
        namespace Responses {
            export type $200 = /**
             * An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
             * key would produce a different `ref` for an otherwise identical definition.
             *
             */
            Components.Schemas.WidgetDefinition;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $503 = Components.Responses.ServiceUnavailable;
        }
    }
    namespace PutWidgetDefinition {
        export type RequestBody = /**
         * An AI widget definition, version 1 or version 2. Unknown keys are rejected at every level, because any extra
         * key would produce a different `ref` for an otherwise identical definition.
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
   * Requires `schema:update` in the organization of the token. `x-epilot-org-id` naming another organization is
   * refused with `403`.
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
   * Requires `entity:view` in the organization the request acts in: the organization of the token, or the one
   * named by `x-epilot-org-id`, where only the roles the caller holds in that organization count. A caller with
   * no `entity:view` there gets `403` whether or not the `ref` exists.
   * 
   */
  'getWidgetDefinition'(
    parameters?: Parameters<Paths.GetWidgetDefinition.QueryParameters & Paths.GetWidgetDefinition.PathParameters> | null,
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
   * Requires `entity:view` in the organization the request acts in: the organization of the token, or the one
   * named by `x-epilot-org-id`, where only the roles the caller holds in that organization count.
   * 
   */
  'batchGetWidgetDefinitions'(
    parameters?: Parameters<Paths.BatchGetWidgetDefinitions.QueryParameters> | null,
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
     * Requires `schema:update` in the organization of the token. `x-epilot-org-id` naming another organization is
     * refused with `403`.
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
     * Requires `entity:view` in the organization the request acts in: the organization of the token, or the one
     * named by `x-epilot-org-id`, where only the roles the caller holds in that organization count. A caller with
     * no `entity:view` there gets `403` whether or not the `ref` exists.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetWidgetDefinition.QueryParameters & Paths.GetWidgetDefinition.PathParameters> | null,
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
     * Requires `entity:view` in the organization the request acts in: the organization of the token, or the one
     * named by `x-epilot-org-id`, where only the roles the caller holds in that organization count.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.BatchGetWidgetDefinitions.QueryParameters> | null,
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
export type WidgetDefinitionV1 = Components.Schemas.WidgetDefinitionV1;
export type WidgetDefinitionV2 = Components.Schemas.WidgetDefinitionV2;
export type WidgetFields = Components.Schemas.WidgetFields;
export type WidgetHtml = Components.Schemas.WidgetHtml;
export type WidgetIcons = Components.Schemas.WidgetIcons;
export type WidgetLibs = Components.Schemas.WidgetLibs;
export type WidgetManifest = Components.Schemas.WidgetManifest;
export type WidgetManifestV2 = Components.Schemas.WidgetManifestV2;
export type WidgetPrompt = Components.Schemas.WidgetPrompt;
export type WidgetRelations = Components.Schemas.WidgetRelations;
export type WidgetRelationsV2 = Components.Schemas.WidgetRelationsV2;
export type WidgetStringTable = Components.Schemas.WidgetStringTable;
export type WidgetStrings = Components.Schemas.WidgetStrings;
export type WidgetSuggestions = Components.Schemas.WidgetSuggestions;
