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
        export interface CreateValidationRuleRequest {
            /**
             * Title of the validation rule.
             */
            title: string;
            /**
             * Placeholder for the validation rule.
             */
            placeholder?: string;
            /**
             * Describes where and how a validation rule is applied.
             */
            used_by?: /* Describes where and how a validation rule is applied. */ UsedBy[];
            /**
             * Matrix of validation rules that must be validated together.
             */
            rules: (/* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType)[][];
        }
        export interface GetValidationRulesResponse {
            results?: /* The Validation rule definition. */ ValidationRule[];
        }
        /**
         * Specific pattern for numeric based validation rules, supporting range and digit count constraints.
         */
        export interface NumericPattern {
            /**
             * Minimum allowed value.
             */
            min_value?: number;
            /**
             * Maximum allowed value.
             */
            max_value?: number;
            /**
             * Minimum number of integer digits.
             */
            min_integer_count?: number;
            /**
             * Maximum number of integer digits.
             */
            max_integer_count?: number;
            /**
             * Minimum number of decimal digits.
             */
            min_decimal_count?: number;
            /**
             * Maximum number of decimal digits.
             */
            max_decimal_count?: number;
            /**
             * Whether leading zeroes are allowed.
             */
            leading_zeroes?: boolean;
        }
        /**
         * Validation rule for numeric values, supporting range and digit count constraints.
         */
        export interface NumericRuleType {
            /**
             * Indicates this is a numeric-based validation rule.
             */
            type: "numeric";
            /**
             * Specific pattern for numeric based validation rules, supporting range and digit count constraints.
             */
            numeric_pattern?: /* Specific pattern for numeric based validation rules, supporting range and digit count constraints. */ NumericPattern;
        }
        /**
         * A pattern element used in pattern-based validation rules evaluated in a sequence.
         */
        export type Pattern = {
            /**
             * Whether this pattern is optional in the sequence.
             */
            optional?: boolean;
            /**
             * Whether this pattern depends on the previous pattern.
             */
            is_dependent?: boolean;
        } & (/* A pattern element used in pattern-based validation rules evaluated in a sequence. */ /* A static pattern that matches a fixed value. */ PatternStatic | /* A pattern that matches alphanumeric values with optional constraints. */ PatternAlphanumeric | /* A pattern that matches digit sequences with optional constraints. */ PatternDigits);
        /**
         * A pattern that matches alphanumeric values with optional constraints.
         */
        export interface PatternAlphanumeric {
            /**
             * Indicates an alphanumeric pattern type.
             */
            type: "alphanumeric";
            /**
             * List of allowed alphanumeric options.
             */
            options?: string[];
            /**
             * Minimum number of alphanumeric characters.
             */
            min_count?: number;
            /**
             * Exact number of alphanumeric characters.
             */
            count?: number;
            /**
             * Maximum number of alphanumeric characters.
             */
            max_count?: number;
        }
        /**
         * A pattern that matches digit sequences with optional constraints.
         */
        export interface PatternDigits {
            /**
             * Indicates a digits pattern type.
             */
            type: "digits";
            /**
             * Minimum number of digits.
             */
            min_count?: number;
            /**
             * Exact number of digits.
             */
            count?: number;
            /**
             * Maximum number of digits.
             */
            max_count?: number;
        }
        /**
         * Validation rule that uses a sequence of patterns to validate input.
         */
        export interface PatternRuleType {
            /**
             * Indicates this is a pattern-based validation rule.
             */
            type: "pattern";
            /**
             * List of patterns that define the validation logic.
             */
            patterns: /* A pattern element used in pattern-based validation rules evaluated in a sequence. */ Pattern[];
        }
        /**
         * A static pattern that matches a fixed value.
         */
        export interface PatternStatic {
            /**
             * Indicates a static pattern type.
             */
            type: "static";
            /**
             * The static value to match.
             */
            value: string;
        }
        /**
         * Validation rule that uses a regular expression to validate input.
         */
        export interface RegexRuleType {
            /**
             * Indicates this is a regex-based validation rule.
             */
            type: "regex";
            /**
             * The regular expression pattern to validate against.
             */
            regex: string;
            /**
             * The error message to display when the regex validation fails.
             */
            error_message?: string;
        }
        export interface UpdateValidationRuleRequest {
            /**
             * Title of the validation rule.
             */
            title?: string;
            /**
             * Placeholder for the validation rule.
             */
            placeholder?: string;
            /**
             * Describes where and how a validation rule is applied.
             */
            used_by?: /* Describes where and how a validation rule is applied. */ UsedBy[];
            /**
             * Matrix of validation rules that must be validated together.
             */
            rules?: (/* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType)[][];
        }
        /**
         * Describes where and how a validation rule is applied.
         */
        export interface UsedBy {
            /**
             * The context in which the rule is used (e.g., journey or entity).
             */
            type: "journey" | "entity";
            /**
             * Slug of the schema using this rule for entities.
             */
            schema_slug?: string;
            /**
             * Source identifier for the usage context.
             */
            source_id?: string;
        }
        /**
         * The Validation rule definition.
         */
        export interface ValidationRule {
            /**
             * Title of the validation rule.
             */
            title: string;
            /**
             * Placeholder for the validation rule.
             */
            placeholder?: string;
            /**
             * Describes where and how a validation rule is applied.
             */
            used_by?: /* Describes where and how a validation rule is applied. */ UsedBy[];
            /**
             * Matrix of validation rules that must be validated together.
             */
            rules?: (/* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType)[][];
            /**
             * Schema version of the validation rule.
             */
            _schema_version: string;
            /**
             * Unique identifier for the validation rule.
             */
            _id: string;
            /**
             * Organization ID that owns this rule.
             */
            _organization_id: string;
            /**
             * ISO timestamp when the rule was created.
             */
            created_at: string;
            /**
             * ISO timestamp when the rule was last updated.
             */
            updated_at: string;
            /**
             * User ID of the creator.
             */
            created_by: string;
            /**
             * User ID of the last updater.
             */
            updated_by: string;
        }
        export interface ValidationRuleBase {
            /**
             * Title of the validation rule.
             */
            title?: string;
            /**
             * Placeholder for the validation rule.
             */
            placeholder?: string;
            /**
             * Describes where and how a validation rule is applied.
             */
            used_by?: /* Describes where and how a validation rule is applied. */ UsedBy[];
            /**
             * Matrix of validation rules that must be validated together.
             */
            rules?: (/* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType)[][];
        }
    }
}
declare namespace Paths {
    namespace CreateValidationRule {
        export type RequestBody = Components.Schemas.CreateValidationRuleRequest;
        namespace Responses {
            export type $201 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
        }
    }
    namespace DeleteValidationRule {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $500 {
                /**
                 * example:
                 * Unknown API Error
                 */
                message?: string;
            }
        }
    }
    namespace GetValidationRules {
        namespace Responses {
            export type $200 = Components.Schemas.GetValidationRulesResponse;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $500 {
                /**
                 * example:
                 * Unknown API Error
                 */
                message?: string;
            }
        }
    }
    namespace UpdateValidationRule {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        export type RequestBody = Components.Schemas.UpdateValidationRuleRequest;
        namespace Responses {
            export type $200 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $500 {
                /**
                 * example:
                 * Unknown API Error
                 */
                message?: string;
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getValidationRules - Get all validation rules by organization Id
   * 
   * Gets all validation rules by organization Id
   */
  'getValidationRules'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetValidationRules.Responses.$200>
  /**
   * createValidationRule - Create Validation Rule
   * 
   * Creates a new validation rule
   */
  'createValidationRule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateValidationRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateValidationRule.Responses.$201>
  /**
   * updateValidationRule - Update Validation Rule (partial update)
   * 
   * Updates an existing validation rule partially by ID
   */
  'updateValidationRule'(
    parameters?: Parameters<Paths.UpdateValidationRule.PathParameters> | null,
    data?: Paths.UpdateValidationRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateValidationRule.Responses.$200>
  /**
   * deleteValidationRule - Delete Validation Rule
   * 
   * Deletes a validation rule by ID
   */
  'deleteValidationRule'(
    parameters?: Parameters<Paths.DeleteValidationRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteValidationRule.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/validation-rules']: {
    /**
     * getValidationRules - Get all validation rules by organization Id
     * 
     * Gets all validation rules by organization Id
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetValidationRules.Responses.$200>
    /**
     * createValidationRule - Create Validation Rule
     * 
     * Creates a new validation rule
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateValidationRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateValidationRule.Responses.$201>
  }
  ['/v1/validation-rules/{ruleId}']: {
    /**
     * updateValidationRule - Update Validation Rule (partial update)
     * 
     * Updates an existing validation rule partially by ID
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateValidationRule.PathParameters> | null,
      data?: Paths.UpdateValidationRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateValidationRule.Responses.$200>
    /**
     * deleteValidationRule - Delete Validation Rule
     * 
     * Deletes a validation rule by ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteValidationRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteValidationRule.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateValidationRuleRequest = Components.Schemas.CreateValidationRuleRequest;
export type GetValidationRulesResponse = Components.Schemas.GetValidationRulesResponse;
export type NumericPattern = Components.Schemas.NumericPattern;
export type NumericRuleType = Components.Schemas.NumericRuleType;
export type Pattern = Components.Schemas.Pattern;
export type PatternAlphanumeric = Components.Schemas.PatternAlphanumeric;
export type PatternDigits = Components.Schemas.PatternDigits;
export type PatternRuleType = Components.Schemas.PatternRuleType;
export type PatternStatic = Components.Schemas.PatternStatic;
export type RegexRuleType = Components.Schemas.RegexRuleType;
export type UpdateValidationRuleRequest = Components.Schemas.UpdateValidationRuleRequest;
export type UsedBy = Components.Schemas.UsedBy;
export type ValidationRule = Components.Schemas.ValidationRule;
export type ValidationRuleBase = Components.Schemas.ValidationRuleBase;
