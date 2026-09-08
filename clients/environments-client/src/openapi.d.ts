import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
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
        /**
         * A variable's value. The JSON type corresponds to the variable's `type`:
         * `String`, `SecretString` and `Text` are strings, `Number` is a number,
         * `Boolean` is a boolean, and `Map`, `JSON`, `Link` and `List` are objects.
         * Numbers are IEEE 754 doubles; integers above 2^53 may lose precision on
         * round-trip.
         *
         */
        export type EnvironmentValue = /**
         * A variable's value. The JSON type corresponds to the variable's `type`:
         * `String`, `SecretString` and `Text` are strings, `Number` is a number,
         * `Boolean` is a boolean, and `Map`, `JSON`, `Link` and `List` are objects.
         * Numbers are IEEE 754 doubles; integers above 2^53 may lose precision on
         * round-trip.
         *
         */
        string | number | boolean | MapValue | /**
         * Arbitrary JSON object, e.g. a flat key/value map used by integrations for
         * enum translation: {"Mr.": 1, "Ms. / Mrs.": 2}. Max 32 KB serialised.
         *
         */
        JsonValue | /**
         * One URL with a label and description a customer reads. `label` and
         * `description` are each either a plain string or one string per language;
         * the two fields decide that independently — a plain string means "the
         * same in every language". A translated field must carry the fallback
         * language.
         *
         * The URL must be absolute and `http`/`https` only. This value is served
         * to browser-facing consumers, so `javascript:` and `data:` URLs are
         * rejected at write time.
         *
         * Written flat rather than composed from a shared field set: `allOf` plus
         * `additionalProperties: false` is rejected by most validators, because
         * each branch sees the sibling's properties as unknown. The composition
         * lives in zod (LinkFieldsSchema) — see src/core/value-types.ts.
         *
         * Each translated value of `label` and `description` is also limited to
         * the same maximum as the plain-string form above — 255 characters for
         * `label`, 1024 for `description`. The limit is enforced by the server
         * even though the shared `StringTranslations` schema referenced below
         * does not itself declare it.
         *
         */
        LinkValue | /**
         * An ordered collection of one declared element type. Items round-trip in
         * the order written; nothing sorts them. Holds at most 100 items.
         *
         * The whole value is limited to 32768 characters when serialised — the
         * server enforces this, and it is not expressible per-property here.
         *
         */
        ListValue;
        /**
         * The structure a variable's value holds. `SecretString` is encrypted at rest and
         * its value is never returned. `Text`, `Number`, `Boolean`, `Map`, `JSON`, `Link` and
         * `List` may be served to browser-facing consumers; `String` and `SecretString` may not.
         *
         */
        export type EnvironmentValueType = "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List";
        export interface EnvironmentVariable {
            key: string; // ^[a-z0-9][a-z0-9_.\-]{0,127}$
            type: /**
             * The structure a variable's value holds. `SecretString` is encrypted at rest and
             * its value is never returned. `Text`, `Number`, `Boolean`, `Map`, `JSON`, `Link` and
             * `List` may be served to browser-facing consumers; `String` and `SecretString` may not.
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
            string | number | boolean | MapValue | /**
             * Arbitrary JSON object, e.g. a flat key/value map used by integrations for
             * enum translation: {"Mr.": 1, "Ms. / Mrs.": 2}. Max 32 KB serialised.
             *
             */
            JsonValue | /**
             * One URL with a label and description a customer reads. `label` and
             * `description` are each either a plain string or one string per language;
             * the two fields decide that independently — a plain string means "the
             * same in every language". A translated field must carry the fallback
             * language.
             *
             * The URL must be absolute and `http`/`https` only. This value is served
             * to browser-facing consumers, so `javascript:` and `data:` URLs are
             * rejected at write time.
             *
             * Written flat rather than composed from a shared field set: `allOf` plus
             * `additionalProperties: false` is rejected by most validators, because
             * each branch sees the sibling's properties as unknown. The composition
             * lives in zod (LinkFieldsSchema) — see src/core/value-types.ts.
             *
             * Each translated value of `label` and `description` is also limited to
             * the same maximum as the plain-string form above — 255 characters for
             * `label`, 1024 for `description`. The limit is enforced by the server
             * even though the shared `StringTranslations` schema referenced below
             * does not itself declare it.
             *
             */
            LinkValue | /**
             * An ordered collection of one declared element type. Items round-trip in
             * the order written; nothing sorts them. Holds at most 100 items.
             *
             * The whole value is limited to 32768 characters when serialised — the
             * server enforces this, and it is not expressible per-property here.
             *
             */
            ListValue;
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
             * its value is never returned. `Text`, `Number`, `Boolean`, `Map`, `JSON`, `Link` and
             * `List` may be served to browser-facing consumers; `String` and `SecretString` may not.
             *
             */
            EnvironmentValueType;
            description?: string;
            group?: string;
            value?: /**
             * A variable's value. The JSON type corresponds to the variable's `type`:
             * `String`, `SecretString` and `Text` are strings, `Number` is a number,
             * `Boolean` is a boolean, and `Map`, `JSON`, `Link` and `List` are objects.
             * Numbers are IEEE 754 doubles; integers above 2^53 may lose precision on
             * round-trip.
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
             * its value is never returned. `Text`, `Number`, `Boolean`, `Map`, `JSON`, `Link` and
             * `List` may be served to browser-facing consumers; `String` and `SecretString` may not.
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
            string | number | boolean | MapValue | /**
             * Arbitrary JSON object, e.g. a flat key/value map used by integrations for
             * enum translation: {"Mr.": 1, "Ms. / Mrs.": 2}. Max 32 KB serialised.
             *
             */
            JsonValue | /**
             * One URL with a label and description a customer reads. `label` and
             * `description` are each either a plain string or one string per language;
             * the two fields decide that independently — a plain string means "the
             * same in every language". A translated field must carry the fallback
             * language.
             *
             * The URL must be absolute and `http`/`https` only. This value is served
             * to browser-facing consumers, so `javascript:` and `data:` URLs are
             * rejected at write time.
             *
             * Written flat rather than composed from a shared field set: `allOf` plus
             * `additionalProperties: false` is rejected by most validators, because
             * each branch sees the sibling's properties as unknown. The composition
             * lives in zod (LinkFieldsSchema) — see src/core/value-types.ts.
             *
             * Each translated value of `label` and `description` is also limited to
             * the same maximum as the plain-string form above — 255 characters for
             * `label`, 1024 for `description`. The limit is enforced by the server
             * even though the shared `StringTranslations` schema referenced below
             * does not itself declare it.
             *
             */
            LinkValue | /**
             * An ordered collection of one declared element type. Items round-trip in
             * the order written; nothing sorts them. Holds at most 100 items.
             *
             * The whole value is limited to 32768 characters when serialised — the
             * server enforces this, and it is not expressible per-property here.
             *
             */
            ListValue;
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
            type?: "String" | "SecretString" | "Text" | "Number" | "Boolean" | "Map" | "JSON" | "Link" | "List";
            value?: /**
             * A variable's value. The JSON type corresponds to the variable's `type`:
             * `String`, `SecretString` and `Text` are strings, `Number` is a number,
             * `Boolean` is a boolean, and `Map`, `JSON`, `Link` and `List` are objects.
             * Numbers are IEEE 754 doubles; integers above 2^53 may lose precision on
             * round-trip.
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
        /**
         * Arbitrary JSON object, e.g. a flat key/value map used by integrations for
         * enum translation: {"Mr.": 1, "Ms. / Mrs.": 2}. Max 32 KB serialised.
         *
         */
        export interface JsonValue {
            [name: string]: any;
        }
        /**
         * The fields of a link, without a fallback language — the shape a `List`
         * item carries. Inside a list the fallback belongs to the wrapper, which
         * owns the language tabs for every row.
         *
         * Restated rather than composed with `LinkValue`: `allOf` plus
         * `additionalProperties: false` is rejected by most validators, because
         * each branch sees the sibling's properties as unknown. zod composes
         * properly — see LinkFieldsSchema in src/core/value-types.ts.
         *
         */
        export interface LinkFields {
            url: string;
            label: string | /**
             * A string translated per language. Keys are language codes (e.g. `de`,
             * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
             * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
             * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
             * not otherwise linked. The pattern is documented rather than declared
             * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
             * 3.0.3, where it fails `spectral lint` (oas3-schema).
             *
             */
            StringTranslations;
            description?: string | /**
             * A string translated per language. Keys are language codes (e.g. `de`,
             * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
             * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
             * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
             * not otherwise linked. The pattern is documented rather than declared
             * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
             * 3.0.3, where it fails `spectral lint` (oas3-schema).
             *
             */
            StringTranslations;
        }
        /**
         * One URL with a label and description a customer reads. `label` and
         * `description` are each either a plain string or one string per language;
         * the two fields decide that independently — a plain string means "the
         * same in every language". A translated field must carry the fallback
         * language.
         *
         * The URL must be absolute and `http`/`https` only. This value is served
         * to browser-facing consumers, so `javascript:` and `data:` URLs are
         * rejected at write time.
         *
         * Written flat rather than composed from a shared field set: `allOf` plus
         * `additionalProperties: false` is rejected by most validators, because
         * each branch sees the sibling's properties as unknown. The composition
         * lives in zod (LinkFieldsSchema) — see src/core/value-types.ts.
         *
         * Each translated value of `label` and `description` is also limited to
         * the same maximum as the plain-string form above — 255 characters for
         * `label`, 1024 for `description`. The limit is enforced by the server
         * even though the shared `StringTranslations` schema referenced below
         * does not itself declare it.
         *
         */
        export interface LinkValue {
            url: string;
            label: string | /**
             * A string translated per language. Keys are language codes (e.g. `de`,
             * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
             * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
             * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
             * not otherwise linked. The pattern is documented rather than declared
             * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
             * 3.0.3, where it fails `spectral lint` (oas3-schema).
             *
             */
            StringTranslations;
            description?: string | /**
             * A string translated per language. Keys are language codes (e.g. `de`,
             * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
             * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
             * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
             * not otherwise linked. The pattern is documented rather than declared
             * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
             * 3.0.3, where it fails `spectral lint` (oas3-schema).
             *
             */
            StringTranslations;
            fallbackLanguage?: string;
        }
        /**
         * The element type a `List` holds. `String` and `SecretString` are absent
         * deliberately: they are the two types never served to browser-facing
         * consumers, and a `List` is. `Map` is already a keyed collection, and a
         * list of lists has no consumer.
         *
         */
        export type ListItemType = "Text" | "Number" | "Boolean" | "JSON" | "Link";
        export interface ListOfBoolean {
            itemType: "Boolean";
            items: [
                boolean,
                ...boolean[]
            ];
        }
        export interface ListOfJson {
            itemType: "JSON";
            items: [
                {
                    [name: string]: any;
                },
                ...{
                    [name: string]: any;
                }[]
            ];
        }
        /**
         * A list of links. `fallbackLanguage` applies to every item's translated
         * `label` and `description`; items may mix plain and translated fields
         * freely, since a plain string is a complete answer for any language.
         *
         */
        export interface ListOfLink {
            itemType: "Link";
            fallbackLanguage?: string;
            items: [
                /**
                 * The fields of a link, without a fallback language — the shape a `List`
                 * item carries. Inside a list the fallback belongs to the wrapper, which
                 * owns the language tabs for every row.
                 *
                 * Restated rather than composed with `LinkValue`: `allOf` plus
                 * `additionalProperties: false` is rejected by most validators, because
                 * each branch sees the sibling's properties as unknown. zod composes
                 * properly — see LinkFieldsSchema in src/core/value-types.ts.
                 *
                 */
                LinkFields,
                .../**
                 * The fields of a link, without a fallback language — the shape a `List`
                 * item carries. Inside a list the fallback belongs to the wrapper, which
                 * owns the language tabs for every row.
                 *
                 * Restated rather than composed with `LinkValue`: `allOf` plus
                 * `additionalProperties: false` is rejected by most validators, because
                 * each branch sees the sibling's properties as unknown. zod composes
                 * properly — see LinkFieldsSchema in src/core/value-types.ts.
                 *
                 */
                LinkFields[]
            ];
        }
        export interface ListOfNumber {
            itemType: "Number";
            items: [
                number,
                ...number[]
            ];
        }
        export interface ListOfText {
            itemType: "Text";
            items: [
                string,
                ...string[]
            ];
        }
        /**
         * An ordered collection of one declared element type. Items round-trip in
         * the order written; nothing sorts them. Holds at most 100 items.
         *
         * The whole value is limited to 32768 characters when serialised — the
         * server enforces this, and it is not expressible per-property here.
         *
         */
        export type ListValue = /**
         * An ordered collection of one declared element type. Items round-trip in
         * the order written; nothing sorts them. Holds at most 100 items.
         *
         * The whole value is limited to 32768 characters when serialised — the
         * server enforces this, and it is not expressible per-property here.
         *
         */
        ListOfText | ListOfNumber | ListOfBoolean | ListOfJson | /**
         * A list of links. `fallbackLanguage` applies to every item's translated
         * `label` and `description`; items may mix plain and translated fields
         * freely, since a plain string is a complete answer for any language.
         *
         */
        ListOfLink;
        /**
         * One entry of a Map. `key` is the token a journey submits; `value` is
         * what the customer reads — either one string, or one string per
         * language. Every entry of a Map must agree on which of the two it uses.
         *
         */
        export interface MapEntry {
            key: string;
            value: string | /**
             * A string translated per language. Keys are language codes (e.g. `de`,
             * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
             * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
             * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
             * not otherwise linked. The pattern is documented rather than declared
             * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
             * 3.0.3, where it fails `spectral lint` (oas3-schema).
             *
             */
            StringTranslations;
        }
        export interface MapValue {
            fallbackLanguage?: string;
            options: [
                /**
                 * One entry of a Map. `key` is the token a journey submits; `value` is
                 * what the customer reads — either one string, or one string per
                 * language. Every entry of a Map must agree on which of the two it uses.
                 *
                 */
                MapEntry,
                .../**
                 * One entry of a Map. `key` is the token a journey submits; `value` is
                 * what the customer reads — either one string, or one string per
                 * language. Every entry of a Map must agree on which of the two it uses.
                 *
                 */
                MapEntry[]
            ];
        }
        /**
         * A string translated per language. Keys are language codes (e.g. `de`,
         * `en-US`), matching the hyphen-only BCP-47 form epilot's i18n stack uses
         * everywhere else: `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. The server enforces
         * that with LANGUAGE_KEY_PATTERN in src/core/value-types.ts — the two are
         * not otherwise linked. The pattern is documented rather than declared
         * because `propertyNames` is JSON Schema / OAS 3.1 and this document is
         * 3.0.3, where it fails `spectral lint` (oas3-schema).
         *
         */
        export interface StringTranslations {
            [name: string]: string;
        }
    }
}
declare namespace Paths {
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
export type EnvironmentValue = Components.Schemas.EnvironmentValue;
export type EnvironmentValueType = Components.Schemas.EnvironmentValueType;
export type EnvironmentVariable = Components.Schemas.EnvironmentVariable;
export type EnvironmentVariableCreateRequest = Components.Schemas.EnvironmentVariableCreateRequest;
export type EnvironmentVariableList = Components.Schemas.EnvironmentVariableList;
export type EnvironmentVariableListItem = Components.Schemas.EnvironmentVariableListItem;
export type EnvironmentVariableUpdateRequest = Components.Schemas.EnvironmentVariableUpdateRequest;
export type JsonValue = Components.Schemas.JsonValue;
export type LinkFields = Components.Schemas.LinkFields;
export type LinkValue = Components.Schemas.LinkValue;
export type ListItemType = Components.Schemas.ListItemType;
export type ListOfBoolean = Components.Schemas.ListOfBoolean;
export type ListOfJson = Components.Schemas.ListOfJson;
export type ListOfLink = Components.Schemas.ListOfLink;
export type ListOfNumber = Components.Schemas.ListOfNumber;
export type ListOfText = Components.Schemas.ListOfText;
export type ListValue = Components.Schemas.ListValue;
export type MapEntry = Components.Schemas.MapEntry;
export type MapValue = Components.Schemas.MapValue;
export type StringTranslations = Components.Schemas.StringTranslations;
