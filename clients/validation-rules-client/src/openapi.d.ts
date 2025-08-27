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
            rule: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType;
        }
        export interface GetValidationRulesResponse {
            results?: /* The Validation rule definition. */ ValidationRule[];
        }
        /**
         * Condition definition for a numeric validation rule
         */
        export type NumericCondition = /* Condition definition for a numeric validation rule */ {
            all: (/* Condition definition for a numeric validation rule */ NumericCondition | /* Fact-based condition for numeric validation */ NumericFactCondition)[];
        } | {
            any: (/* Condition definition for a numeric validation rule */ NumericCondition | /* Fact-based condition for numeric validation */ NumericFactCondition)[];
        } | {
            not: /* Condition definition for a numeric validation rule */ NumericCondition | /* Fact-based condition for numeric validation */ NumericFactCondition;
        };
        /**
         * Fact-based condition for numeric validation
         */
        export type NumericFactCondition = /* Fact-based condition for numeric validation */ {
            /**
             * The numeric value extracted from input
             */
            fact: "numericValue";
            /**
             * Numeric comparison operator
             */
            operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive";
            /**
             * Numeric value to compare against
             */
            value: number;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
            };
        } | {
            /**
             * Count of integer digits (excludes leading zeros unless allowed)
             */
            fact: "integerDigitsCount";
            /**
             * Digit count comparison operator
             */
            operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits";
            /**
             * Expected number of integer digits
             */
            value: number;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
                /**
                 * Whether to count leading zeroes in digit count
                 */
                allowLeadingZeroes?: boolean;
            };
        } | {
            /**
             * Count of decimal digits
             */
            fact: "decimalDigitsCount";
            /**
             * Decimal digit count comparison operator
             */
            operator: "equal" | "minDecimalDigits" | "maxDecimalDigits";
            /**
             * Expected number of decimal digits
             */
            value: number;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
            };
        } | {
            /**
             * Whether the input has leading zeros
             */
            fact: "hasLeadingZeroes";
            /**
             * Leading zeros check operator
             */
            operator: "equal" | "notAllowed";
            /**
             * Whether leading zeros should be present or not
             */
            value: boolean;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
            };
        };
        /**
         * Validation rule for numeric values, supporting range and digit count constraints.
         */
        export interface NumericRuleType {
            /**
             * Indicates this is a numeric-based validation rule.
             */
            type: "numeric";
            /**
             * The conditions that must be met for the rule to trigger
             */
            conditions: /* Condition definition for a numeric validation rule */ NumericCondition;
        }
        /**
         * Condition definition for a pattern-based validation rule
         */
        export type PatternCondition = /* Condition definition for a pattern-based validation rule */ {
            all: (/* Condition definition for a pattern-based validation rule */ PatternCondition | /* Fact-based condition for pattern validation */ PatternFactCondition)[];
        } | {
            any: (/* Condition definition for a pattern-based validation rule */ PatternCondition | /* Fact-based condition for pattern validation */ PatternFactCondition)[];
        } | {
            not: /* Condition definition for a pattern-based validation rule */ PatternCondition | /* Fact-based condition for pattern validation */ PatternFactCondition;
        };
        /**
         * Fact-based condition for pattern validation
         */
        export type PatternFactCondition = /* Fact-based condition for pattern validation */ {
            /**
             * The name of the value to validate.
             */
            fact: "totalLength";
            /**
             * Numeric comparison operator
             */
            operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive";
            /**
             * Numeric value to compare against
             */
            value: number;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
                /**
                 * From where to check
                 */
                start?: number;
                /**
                 * To where to check
                 */
                end?: number;
            };
        } | {
            /**
             * The name of the value to validate.
             */
            fact: "staticCheck" | "totalLength";
            /**
             * Exact digit count operator
             */
            operator: "exactlyNDigits";
            /**
             * Number of digits required
             */
            value: number;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
                /**
                 * From where to check
                 */
                start?: number;
                /**
                 * To where to check
                 */
                end?: number;
            };
        } | {
            /**
             * The name of the value to validate.
             */
            fact: "staticCheck";
            /**
             * Array-based comparison operator
             */
            operator: "in" | "notIn" | "contains" | "doesNotContain";
            /**
             * Array of string values for array-based operators
             */
            value: string[];
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
                /**
                 * From where to check
                 */
                start?: number;
                /**
                 * To where to check
                 */
                end?: number;
            };
        } | {
            /**
             * The name of the value to validate.
             */
            fact: "staticCheck";
            /**
             * String comparison operator
             */
            operator: "equal" | "notEqual";
            /**
             * String value to compare against
             */
            value: string;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
                /**
                 * From where to check
                 */
                start?: number;
                /**
                 * To where to check
                 */
                end?: number;
            };
        };
        /**
         * Validation rule that uses a sequence of patterns to validate input.
         */
        export interface PatternRuleType {
            /**
             * Indicates this is a pattern-based validation rule.
             */
            type: "pattern";
            /**
             * The conditions that must be met for the rule to trigger
             */
            conditions: /* Condition definition for a pattern-based validation rule */ PatternCondition;
        }
        /**
         * Condition definition for a regex-based validation rule
         */
        export type RegexCondition = /* Condition definition for a regex-based validation rule */ {
            all: (/* Condition definition for a regex-based validation rule */ RegexCondition | /* Fact-based condition for regex validation */ RegexFactCondition)[];
        } | {
            any: (/* Condition definition for a regex-based validation rule */ RegexCondition | /* Fact-based condition for regex validation */ RegexFactCondition)[];
        } | {
            not: /* Condition definition for a regex-based validation rule */ RegexCondition | /* Fact-based condition for regex validation */ RegexFactCondition;
        };
        /**
         * Fact-based condition for regex validation
         */
        export interface RegexFactCondition {
            /**
             * The name of the value to validate. Should always be 'inputValue' because this property name is passed to the engine
             */
            fact: "inputValue";
            /**
             * The operator to use for comparison
             */
            operator: "regexMatch";
            /**
             * The actual regex
             */
            value: string;
            /**
             * Additional parameters for the condition
             */
            params?: {
                /**
                 * Custom error message
                 */
                errorMessage?: string;
            };
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
             * The conditions that must be met for the rule to trigger
             */
            conditions: /* Condition definition for a regex-based validation rule */ RegexCondition;
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
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType;
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
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType;
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
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType;
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
    namespace GetValidationRuleById {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        namespace Responses {
            export type $200 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $404 {
                /**
                 * example:
                 * Validation rule not found
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
   * getValidationRuleById - Get validation rule by ID
   * 
   * Retrieves a specific validation rule by its ID
   */
  'getValidationRuleById'(
    parameters?: Parameters<Paths.GetValidationRuleById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetValidationRuleById.Responses.$200>
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
     * getValidationRuleById - Get validation rule by ID
     * 
     * Retrieves a specific validation rule by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GetValidationRuleById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetValidationRuleById.Responses.$200>
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
export type NumericCondition = Components.Schemas.NumericCondition;
export type NumericFactCondition = Components.Schemas.NumericFactCondition;
export type NumericRuleType = Components.Schemas.NumericRuleType;
export type PatternCondition = Components.Schemas.PatternCondition;
export type PatternFactCondition = Components.Schemas.PatternFactCondition;
export type PatternRuleType = Components.Schemas.PatternRuleType;
export type RegexCondition = Components.Schemas.RegexCondition;
export type RegexFactCondition = Components.Schemas.RegexFactCondition;
export type RegexRuleType = Components.Schemas.RegexRuleType;
export type UpdateValidationRuleRequest = Components.Schemas.UpdateValidationRuleRequest;
export type UsedBy = Components.Schemas.UsedBy;
export type ValidationRule = Components.Schemas.ValidationRule;
export type ValidationRuleBase = Components.Schemas.ValidationRuleBase;
