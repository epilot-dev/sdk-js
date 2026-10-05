/* Auto-copied from external-values-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Parameters {
        export type AppId = string;
        export type HookId = string; // ^[a-zA-Z0-9_-]{1,100}$
    }
    export interface PathParameters {
        AppId?: Parameters.AppId;
        HookId?: Parameters.HookId /* ^[a-zA-Z0-9_-]{1,100}$ */;
    }
    namespace Schemas {
        export interface ExternalValueError {
            /**
             * Set for per-result errors; absent for hook-level failures
             */
            result_id?: string;
            code: /**
             * - `timeout`: the third-party call exceeded `timeout_ms`
             * - `upstream_error`: the third-party call failed or returned a non-2xx status
             * - `auth_failed`: the `auth` pre-call failed
             * - `extraction_failed`: template/path/jsonata threw or yielded null / empty
             * - `coercion_failed`: the extracted value could not be coerced to the result type
             *
             */
            ExternalValueErrorCode;
            message: string;
        }
        /**
         * - `timeout`: the third-party call exceeded `timeout_ms`
         * - `upstream_error`: the third-party call failed or returned a non-2xx status
         * - `auth_failed`: the `auth` pre-call failed
         * - `extraction_failed`: template/path/jsonata threw or yielded null / empty
         * - `coercion_failed`: the extracted value could not be coerced to the result type
         *
         */
        export type ExternalValueErrorCode = "timeout" | "upstream_error" | "auth_failed" | "extraction_failed" | "coercion_failed";
        export interface ExternalValueHookList {
            hooks: ExternalValueHookSummary[];
        }
        export interface ExternalValueHookSummary {
            app_id: string;
            app_name: string;
            hook_id: string;
            name: TranslatedString;
            description?: TranslatedString;
            results: ExternalValueResultSummary[];
        }
        export interface ExternalValueResultSummary {
            id: string;
            type: ExternalValueType;
            name: TranslatedString;
        }
        export type ExternalValueType = "number" | "text" | "date" | "boolean";
        /**
         * example:
         * {
         *   "context": {
         *     "input": "123,45",
         *     "contract": {
         *       "_id": "8a7e3f5e-9c0c-4c74-8d4a-1a1a1a1a1a1a",
         *       "installment_amount": 110
         *     }
         *   },
         *   "consumer": {
         *     "type": "validation_rule",
         *     "rule_id": "6c0a9e1e-2f4b-4e6a-8f8e-2b2b2b2b2b2b"
         *   }
         * }
         */
        export interface ResolveExternalValueRequest {
            /**
             * Everything the consumer supplies for interpolation, as one name → value map.
             * Exposed to the hook's Liquid templates as `Context` / `context`, e.g.
             * `{{ context.input }}`, `{{ context.contract.installment_amount }}`.
             *
             * The names are up to the consumer; this API does not interpret them. By
             * convention the journey runtime passes the validated value of a validation
             * rule as `input` and every configured context binding under its own name.
             *
             */
            context: {
                [name: string]: any;
            };
            /**
             * Who is resolving the value. Forwarded to the hook as `Consumer`.
             */
            consumer?: {
                [name: string]: any;
                /**
                 * example:
                 * validation_rule
                 */
                type?: string;
                rule_id?: string;
                journey_id?: string;
            };
        }
        /**
         * example:
         * {
         *   "values": {
         *     "predicted": 132
         *   },
         *   "errors": [
         *     {
         *       "result_id": "limit",
         *       "code": "coercion_failed",
         *       "message": "Cannot coerce \"n/a\" to number"
         *     }
         *   ],
         *   "policy": {
         *     "on_unavailable": "skip"
         *   }
         * }
         */
        export interface ResolveExternalValueResponse {
            /**
             * Successfully extracted and coerced results, keyed by result id
             */
            values: {
                [name: string]: number | string | boolean;
            };
            errors: ExternalValueError[];
            policy: {
                /**
                 * What the consumer should do when the values are unavailable
                 */
                on_unavailable: "skip" | "block";
            };
            /**
             * True when `values` were served from the hook's result cache
             */
            cached?: boolean;
        }
        export interface TranslatedString {
            /**
             * German translation
             */
            de: string;
            /**
             * English translation
             */
            en?: string | null;
        }
    }
}
export declare namespace Paths {
    namespace ListExternalValues {
        namespace Responses {
            export type $200 = Components.Schemas.ExternalValueHookList;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace ResolveExternalValue {
        export type RequestBody = /**
         * example:
         * {
         *   "context": {
         *     "input": "123,45",
         *     "contract": {
         *       "_id": "8a7e3f5e-9c0c-4c74-8d4a-1a1a1a1a1a1a",
         *       "installment_amount": 110
         *     }
         *   },
         *   "consumer": {
         *     "type": "validation_rule",
         *     "rule_id": "6c0a9e1e-2f4b-4e6a-8f8e-2b2b2b2b2b2b"
         *   }
         * }
         */
        Components.Schemas.ResolveExternalValueRequest;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "values": {
             *     "predicted": 132
             *   },
             *   "errors": [
             *     {
             *       "result_id": "limit",
             *       "code": "coercion_failed",
             *       "message": "Cannot coerce \"n/a\" to number"
             *     }
             *   ],
             *   "policy": {
             *     "on_unavailable": "skip"
             *   }
             * }
             */
            Components.Schemas.ResolveExternalValueResponse;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $422 {
            }
            export interface $500 {
            }
        }
    }
    namespace ResolvePortalExternalValue {
        export type RequestBody = /**
         * example:
         * {
         *   "context": {
         *     "input": "123,45",
         *     "contract": {
         *       "_id": "8a7e3f5e-9c0c-4c74-8d4a-1a1a1a1a1a1a",
         *       "installment_amount": 110
         *     }
         *   },
         *   "consumer": {
         *     "type": "validation_rule",
         *     "rule_id": "6c0a9e1e-2f4b-4e6a-8f8e-2b2b2b2b2b2b"
         *   }
         * }
         */
        Components.Schemas.ResolveExternalValueRequest;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "values": {
             *     "predicted": 132
             *   },
             *   "errors": [
             *     {
             *       "result_id": "limit",
             *       "code": "coercion_failed",
             *       "message": "Cannot coerce \"n/a\" to number"
             *     }
             *   ],
             *   "policy": {
             *     "on_unavailable": "skip"
             *   }
             * }
             */
            Components.Schemas.ResolveExternalValueResponse;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $422 {
            }
            export interface $500 {
            }
        }
    }
    namespace V1ExternalValues$AppIdHooks$HookIdResolve {
        namespace Parameters {
            export type $0 = Components.Parameters.AppId;
            export type $1 = Components.Parameters.HookId /* ^[a-zA-Z0-9_-]{1,100}$ */;
        }
    }
    namespace V1PortalExternalValues$AppIdHooks$HookIdResolve {
        namespace Parameters {
            export type $0 = Components.Parameters.AppId;
            export type $1 = Components.Parameters.HookId /* ^[a-zA-Z0-9_-]{1,100}$ */;
        }
    }
}


export interface OperationMethods {
  /**
   * listExternalValues - listExternalValues
   * 
   * List hooks and their results of all enabled installed apps that declare an
   * `EXTERNAL_VALUES` component. Intended for pickers (e.g. the validation-rules builder).
   * 
   */
  'listExternalValues'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListExternalValues.Responses.$200>
  /**
   * resolveExternalValue - resolveExternalValue
   * 
   * Resolve an external value hook for an epilot 360 user (builder preview, entity-attribute
   * rules). The organization is taken from the caller's token.
   * 
   * Returns HTTP 200 whenever the hook configuration was found and executed — including
   * upstream failures, which are reported in `errors` so clients can apply `policy`.
   * 
   */
  'resolveExternalValue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResolveExternalValue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResolveExternalValue.Responses.$200>
  /**
   * resolvePortalExternalValue - resolvePortalExternalValue
   * 
   * Resolve an external value hook for a portal end customer (private journeys, portal).
   * The organization is taken from the portal token claims.
   * 
   * Returns HTTP 200 whenever the hook configuration was found and executed — including
   * upstream failures, which are reported in `errors` so clients can apply `policy`.
   * 
   */
  'resolvePortalExternalValue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResolvePortalExternalValue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResolvePortalExternalValue.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/external-values']: {
    /**
     * listExternalValues - listExternalValues
     * 
     * List hooks and their results of all enabled installed apps that declare an
     * `EXTERNAL_VALUES` component. Intended for pickers (e.g. the validation-rules builder).
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListExternalValues.Responses.$200>
  }
  ['/v1/external-values/{app_id}/hooks/{hook_id}:resolve']: {
    /**
     * resolveExternalValue - resolveExternalValue
     * 
     * Resolve an external value hook for an epilot 360 user (builder preview, entity-attribute
     * rules). The organization is taken from the caller's token.
     * 
     * Returns HTTP 200 whenever the hook configuration was found and executed — including
     * upstream failures, which are reported in `errors` so clients can apply `policy`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResolveExternalValue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResolveExternalValue.Responses.$200>
  }
  ['/v1/portal/external-values/{app_id}/hooks/{hook_id}:resolve']: {
    /**
     * resolvePortalExternalValue - resolvePortalExternalValue
     * 
     * Resolve an external value hook for a portal end customer (private journeys, portal).
     * The organization is taken from the portal token claims.
     * 
     * Returns HTTP 200 whenever the hook configuration was found and executed — including
     * upstream failures, which are reported in `errors` so clients can apply `policy`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResolvePortalExternalValue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResolvePortalExternalValue.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ExternalValueError = Components.Schemas.ExternalValueError;
export type ExternalValueErrorCode = Components.Schemas.ExternalValueErrorCode;
export type ExternalValueHookList = Components.Schemas.ExternalValueHookList;
export type ExternalValueHookSummary = Components.Schemas.ExternalValueHookSummary;
export type ExternalValueResultSummary = Components.Schemas.ExternalValueResultSummary;
export type ExternalValueType = Components.Schemas.ExternalValueType;
export type ResolveExternalValueRequest = Components.Schemas.ResolveExternalValueRequest;
export type ResolveExternalValueResponse = Components.Schemas.ResolveExternalValueResponse;
export type TranslatedString = Components.Schemas.TranslatedString;
