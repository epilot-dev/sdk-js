import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Declarative validation rule (schema version v2). Supports predefined comparison operators
         * over number, date and text inputs, with static, dynamic (context path) and relative-date
         * comparison values.
         *
         */
        export interface ComparisonRuleType {
            /**
             * The kind of input value the rule validates. Determines which operators are allowed.
             */
            input_type: "number" | "date" | "text";
            /**
             * The comparisons the input value must satisfy. All blocking conditions must pass
             * for the input to be valid; `allow_failure` conditions are advisory and excluded
             * from the verdict. Must contain at least one condition (enforced at write time).
             *
             */
            conditions: /* A single comparison the input value must satisfy. */ Condition[];
        }
        /**
         * A single comparison the input value must satisfy.
         */
        export interface Condition {
            /**
             * Stable identifier of the condition within the rule, used for editing and error reporting.
             */
            id: string;
            operator: /**
             * Predefined comparison operator. Compatibility (enforced at write time):
             * - number: equal, notEqual, greaterThan, greaterThanInclusive, lessThan, lessThanInclusive, between, regexMatch
             * - date: dateBefore, dateOnOrBefore, dateAfter, dateOnOrAfter, dateBetween, notInFuture, notInPast, regexMatch
             * - text: equal, notEqual, contains, doesNotContain, startsWith, endsWith, regexMatch, lengthBetween,
             *   greaterThan, greaterThanInclusive, lessThan, lessThanInclusive, between
             * Range operators (between, dateBetween, lengthBetween) require a `range` value;
             * unary operators (notInFuture, notInPast) require a `none` value; all others require a scalar value.
             * regexMatch validates the raw input string's format and always takes a static string pattern.
             * Numeric comparison operators on text rules parse the input as a number at evaluation time
             * (free-text fields often hold numbers); unparsable input fails the condition.
             *
             */
            Operator;
            value: /* The comparison value of a condition - a scalar, a range of scalars, or nothing (unary operators). */ ConditionValue;
            /**
             * Message shown to the end user when this condition fails.
             */
            error_message: string;
            /**
             * When true, the condition is advisory: it is always evaluated and reported
             * when it fails, but it never takes part in the validity verdict.
             * The input is valid when every blocking (non-advisory) condition passes.
             * A rule whose conditions are all advisory is always valid (warnings only).
             *
             */
            allow_failure?: boolean;
        }
        /**
         * The comparison value of a condition - a scalar, a range of scalars, or nothing (unary operators).
         */
        export type ConditionValue = /* The comparison value of a condition - a scalar, a range of scalars, or nothing (unary operators). */ /* A fixed comparison value. */ StaticValue | /**
         * A dynamic comparison value resolved from runtime context, e.g. `contract.installment_amount`
         * or `previous_reading.value`. The first path segment must match the `name` of a declared
         * context requirement.
         *
         */
        ContextValue | /* A date relative to the evaluation moment, e.g. "today minus 30 days". Only valid for date rules. */ RelativeDateValue | /* A lower and upper bound for range operators (between, dateBetween, lengthBetween). Bounds are inclusive. */ RangeValue | /* No comparison value - used by unary operators such as notInFuture / notInPast. */ NoValue;
        /**
         * An entity context source the rule needs at evaluation time, referenced by `context`
         * value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
         * How the source is resolved (which entity instance) is decided by the consuming surface,
         * not by the rule. Meter reading comparisons use the meter/meter_counter entity schemas
         * (e.g. `meter_counter.current_consumption` for the previous reading value).
         *
         */
        export interface ContextRequirement {
            /**
             * Entity schema slug.
             * example:
             * contract
             */
            schema: string;
        }
        /**
         * A dynamic comparison value resolved from runtime context, e.g. `contract.installment_amount`
         * or `previous_reading.value`. The first path segment must match the `name` of a declared
         * context requirement.
         *
         */
        export interface ContextValue {
            source: "context";
            /**
             * Dot-separated path into the resolved context.
             */
            path: string; // ^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*$
            adjust?: /**
             * Adjusts a context-resolved numeric value before comparison, e.g. "context value plus 10 percent".
             * Used to express tolerance bands such as "at most 10% above the current instalment amount".
             *
             */
            ValueAdjustment;
        }
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
            used_by?: /**
             * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
             * example:
             * {
             *   "type": "journey",
             *   "source_id": "journey-xyz789"
             * }
             */
            UsedBy[];
            rule: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType | /**
             * Declarative validation rule (schema version v2). Supports predefined comparison operators
             * over number, date and text inputs, with static, dynamic (context path) and relative-date
             * comparison values.
             *
             */
            ComparisonRuleType;
            /**
             * Declares the dynamic context a v2 rule needs at evaluation time.
             * `context` condition values reference these sources by using the schema slug
             * as the first segment of their `path`. Only applicable to v2 rules.
             *
             */
            contexts?: /**
             * An entity context source the rule needs at evaluation time, referenced by `context`
             * value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
             * How the source is resolved (which entity instance) is decided by the consuming surface,
             * not by the rule. Meter reading comparisons use the meter/meter_counter entity schemas
             * (e.g. `meter_counter.current_consumption` for the previous reading value).
             *
             */
            ContextRequirement[];
        }
        /**
         * Response envelope for listing all validation rules within an organization.
         */
        export interface GetValidationRulesResponse {
            /**
             * Flat list of all validation rules belonging to the authenticated organization.
             */
            results?: /* The Validation rule definition. */ ValidationRule[];
        }
        /**
         * No comparison value - used by unary operators such as notInFuture / notInPast.
         */
        export interface NoValue {
            source: "none";
        }
        /**
         * Condition definition for a numeric-based validation rule (2 levels deep)
         */
        export type NumericCondition = /* Condition definition for a numeric-based validation rule (2 levels deep) */ {
            all: (/* Fact-based condition for numeric validation */ NumericFactCondition | /* Nested condition with logical operators (level 2 only) */ NumericNestedCondition)[];
        } | {
            any: (/* Fact-based condition for numeric validation */ NumericFactCondition | /* Nested condition with logical operators (level 2 only) */ NumericNestedCondition)[];
        } | {
            not: /* Fact-based condition for numeric validation */ NumericFactCondition | /* Nested condition with logical operators (level 2 only) */ NumericNestedCondition;
        };
        /**
         * Fact-based condition for numeric validation
         */
        export type NumericFactCondition = /* Fact-based condition for numeric validation */ {
            /**
             * The numeric value extracted from input; The amount of digits
             */
            fact: "numeric-value" | "total-length";
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
            fact: "integer-digits-count";
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
            fact: "decimal-digits-count";
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
            fact: "has-leading-zeroes";
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
         * Nested condition with logical operators (level 2 only)
         */
        export type NumericNestedCondition = /* Nested condition with logical operators (level 2 only) */ {
            all: /* Fact-based condition for numeric validation */ NumericFactCondition[];
        } | {
            any: /* Fact-based condition for numeric validation */ NumericFactCondition[];
        } | {
            not: /* Fact-based condition for numeric validation */ NumericFactCondition;
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
            conditions: /* Condition definition for a numeric-based validation rule (2 levels deep) */ NumericCondition;
        }
        /**
         * Predefined comparison operator. Compatibility (enforced at write time):
         * - number: equal, notEqual, greaterThan, greaterThanInclusive, lessThan, lessThanInclusive, between, regexMatch
         * - date: dateBefore, dateOnOrBefore, dateAfter, dateOnOrAfter, dateBetween, notInFuture, notInPast, regexMatch
         * - text: equal, notEqual, contains, doesNotContain, startsWith, endsWith, regexMatch, lengthBetween,
         *   greaterThan, greaterThanInclusive, lessThan, lessThanInclusive, between
         * Range operators (between, dateBetween, lengthBetween) require a `range` value;
         * unary operators (notInFuture, notInPast) require a `none` value; all others require a scalar value.
         * regexMatch validates the raw input string's format and always takes a static string pattern.
         * Numeric comparison operators on text rules parse the input as a number at evaluation time
         * (free-text fields often hold numbers); unparsable input fails the condition.
         *
         */
        export type Operator = "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "between" | "dateBefore" | "dateOnOrBefore" | "dateAfter" | "dateOnOrAfter" | "dateBetween" | "notInFuture" | "notInPast" | "contains" | "doesNotContain" | "startsWith" | "endsWith" | "regexMatch" | "lengthBetween";
        /**
         * Condition definition for a pattern-based validation rule (2 levels deep)
         */
        export type PatternCondition = /* Condition definition for a pattern-based validation rule (2 levels deep) */ {
            all: (/* Fact-based condition for pattern validation */ PatternFactCondition | /* Nested condition with logical operators (level 2 only) */ PatternNestedCondition)[];
        } | {
            any: (/* Fact-based condition for pattern validation */ PatternFactCondition | /* Nested condition with logical operators (level 2 only) */ PatternNestedCondition)[];
        } | {
            not: /* Fact-based condition for pattern validation */ PatternFactCondition | /* Nested condition with logical operators (level 2 only) */ PatternNestedCondition;
        };
        /**
         * Fact-based condition for pattern validation
         */
        export type PatternFactCondition = /* Fact-based condition for pattern validation */ {
            /**
             * The name of the value to validate.
             */
            fact: "total-length";
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
            fact: "static-check" | "total-length";
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
            fact: "static-check";
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
            fact: "static-check";
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
         * Nested condition with logical operators (level 2 only)
         */
        export type PatternNestedCondition = /* Nested condition with logical operators (level 2 only) */ {
            all: /* Fact-based condition for pattern validation */ PatternFactCondition[];
        } | {
            any: /* Fact-based condition for pattern validation */ PatternFactCondition[];
        } | {
            not: /* Fact-based condition for pattern validation */ PatternFactCondition;
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
            conditions: /* Condition definition for a pattern-based validation rule (2 levels deep) */ PatternCondition;
        }
        /**
         * A lower and upper bound for range operators (between, dateBetween, lengthBetween). Bounds are inclusive.
         */
        export interface RangeValue {
            source: "range";
            min: /* A single comparison value - static, resolved from context, or a relative date. */ ScalarValue;
            max: /* A single comparison value - static, resolved from context, or a relative date. */ ScalarValue;
        }
        /**
         * Condition definition for a regex-based validation rule (2 levels deep)
         */
        export type RegexCondition = /* Condition definition for a regex-based validation rule (2 levels deep) */ {
            all: (/* Fact-based condition for regex validation */ RegexFactCondition | /* Nested condition with logical operators (level 2 only) */ RegexNestedCondition)[];
        } | {
            any: (/* Fact-based condition for regex validation */ RegexFactCondition | /* Nested condition with logical operators (level 2 only) */ RegexNestedCondition)[];
        } | {
            not: /* Fact-based condition for regex validation */ RegexFactCondition | /* Nested condition with logical operators (level 2 only) */ RegexNestedCondition;
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
         * Nested condition with logical operators (level 2 only)
         */
        export type RegexNestedCondition = /* Nested condition with logical operators (level 2 only) */ {
            all: /* Fact-based condition for regex validation */ RegexFactCondition[];
        } | {
            any: /* Fact-based condition for regex validation */ RegexFactCondition[];
        } | {
            not: /* Fact-based condition for regex validation */ RegexFactCondition;
        };
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
            conditions: /* Condition definition for a regex-based validation rule (2 levels deep) */ RegexCondition;
        }
        /**
         * A date relative to the evaluation moment, e.g. "today minus 30 days". Only valid for date rules.
         */
        export interface RelativeDateValue {
            source: "relative_date";
            /**
             * Offset from the anchor. Negative values are in the past, positive in the future, 0 is the anchor itself.
             */
            offset: number;
            unit: "days" | "months" | "years";
            anchor?: "today";
        }
        /**
         * A single comparison value - static, resolved from context, or a relative date.
         */
        export type ScalarValue = /* A single comparison value - static, resolved from context, or a relative date. */ /* A fixed comparison value. */ StaticValue | /**
         * A dynamic comparison value resolved from runtime context, e.g. `contract.installment_amount`
         * or `previous_reading.value`. The first path segment must match the `name` of a declared
         * context requirement.
         *
         */
        ContextValue | /* A date relative to the evaluation moment, e.g. "today minus 30 days". Only valid for date rules. */ RelativeDateValue;
        /**
         * A fixed comparison value.
         */
        export interface StaticValue {
            source: "static";
            /**
             * The literal value. Numbers for numeric comparisons, ISO 8601 date strings for date comparisons, strings for text comparisons.
             */
            data: /* The literal value. Numbers for numeric comparisons, ISO 8601 date strings for date comparisons, strings for text comparisons. */ number | string | boolean;
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
            used_by?: /**
             * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
             * example:
             * {
             *   "type": "journey",
             *   "source_id": "journey-xyz789"
             * }
             */
            UsedBy[];
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType | /**
             * Declarative validation rule (schema version v2). Supports predefined comparison operators
             * over number, date and text inputs, with static, dynamic (context path) and relative-date
             * comparison values.
             *
             */
            ComparisonRuleType;
            /**
             * Declares the dynamic context a v2 rule needs at evaluation time.
             * `context` condition values reference these sources by using the schema slug
             * as the first segment of their `path`. Only applicable to v2 rules.
             *
             */
            contexts?: /**
             * An entity context source the rule needs at evaluation time, referenced by `context`
             * value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
             * How the source is resolved (which entity instance) is decided by the consuming surface,
             * not by the rule. Meter reading comparisons use the meter/meter_counter entity schemas
             * (e.g. `meter_counter.current_consumption` for the previous reading value).
             *
             */
            ContextRequirement[];
        }
        /**
         * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
         * example:
         * {
         *   "type": "journey",
         *   "source_id": "journey-xyz789"
         * }
         */
        export interface UsedBy {
            /**
             * The context in which the rule is used - either a journey block or an entity schema attribute.
             * example:
             * journey
             */
            type: "journey" | "entity";
            /**
             * Slug of the entity schema using this rule. Only applicable when `type` is `entity`.
             * example:
             * contact
             */
            schema_slug?: string;
            /**
             * Unique identifier of the source (e.g. journey ID or entity attribute key) that references this rule.
             * example:
             * journey-xyz789
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
            used_by?: /**
             * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
             * example:
             * {
             *   "type": "journey",
             *   "source_id": "journey-xyz789"
             * }
             */
            UsedBy[];
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType | /**
             * Declarative validation rule (schema version v2). Supports predefined comparison operators
             * over number, date and text inputs, with static, dynamic (context path) and relative-date
             * comparison values.
             *
             */
            ComparisonRuleType;
            /**
             * Declares the dynamic context a v2 rule needs at evaluation time.
             * `context` condition values reference these sources by using the schema slug
             * as the first segment of their `path`. Only applicable to v2 rules.
             *
             */
            contexts?: /**
             * An entity context source the rule needs at evaluation time, referenced by `context`
             * value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
             * How the source is resolved (which entity instance) is decided by the consuming surface,
             * not by the rule. Meter reading comparisons use the meter/meter_counter entity schemas
             * (e.g. `meter_counter.current_consumption` for the previous reading value).
             *
             */
            ContextRequirement[];
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
            used_by?: /**
             * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
             * example:
             * {
             *   "type": "journey",
             *   "source_id": "journey-xyz789"
             * }
             */
            UsedBy[];
            rule?: /* Validation rule that uses a regular expression to validate input. */ RegexRuleType | /* Validation rule that uses a sequence of patterns to validate input. */ PatternRuleType | /* Validation rule for numeric values, supporting range and digit count constraints. */ NumericRuleType | /**
             * Declarative validation rule (schema version v2). Supports predefined comparison operators
             * over number, date and text inputs, with static, dynamic (context path) and relative-date
             * comparison values.
             *
             */
            ComparisonRuleType;
            /**
             * Declares the dynamic context a v2 rule needs at evaluation time.
             * `context` condition values reference these sources by using the schema slug
             * as the first segment of their `path`. Only applicable to v2 rules.
             *
             */
            contexts?: /**
             * An entity context source the rule needs at evaluation time, referenced by `context`
             * value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
             * How the source is resolved (which entity instance) is decided by the consuming surface,
             * not by the rule. Meter reading comparisons use the meter/meter_counter entity schemas
             * (e.g. `meter_counter.current_consumption` for the previous reading value).
             *
             */
            ContextRequirement[];
        }
        /**
         * Adjusts a context-resolved numeric value before comparison, e.g. "context value plus 10 percent".
         * Used to express tolerance bands such as "at most 10% above the current instalment amount".
         *
         */
        export interface ValueAdjustment {
            type: "percent" | "absolute";
            value: number;
            direction: "increase" | "decrease";
        }
    }
}
declare namespace Paths {
    namespace AddUsedByReference {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        export type RequestBody = /**
         * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
         * example:
         * {
         *   "type": "journey",
         *   "source_id": "journey-xyz789"
         * }
         */
        Components.Schemas.UsedBy;
        namespace Responses {
            export type $200 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
                 */
                message?: string;
            }
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
    namespace CreateValidationRule {
        export type RequestBody = Components.Schemas.CreateValidationRuleRequest;
        namespace Responses {
            export type $201 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
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
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
                 */
                message?: string;
            }
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
    namespace GetValidationRuleById {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        namespace Responses {
            export type $200 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
                 */
                message?: string;
            }
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
            export type $200 = /* Response envelope for listing all validation rules within an organization. */ Components.Schemas.GetValidationRulesResponse;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
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
    namespace RemoveUsedByReference {
        namespace Parameters {
            export type RuleId = string;
        }
        export interface PathParameters {
            ruleId: Parameters.RuleId;
        }
        export type RequestBody = /**
         * Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.
         * example:
         * {
         *   "type": "journey",
         *   "source_id": "journey-xyz789"
         * }
         */
        Components.Schemas.UsedBy;
        namespace Responses {
            export type $200 = /* The Validation rule definition. */ Components.Schemas.ValidationRule;
            export interface $400 {
                /**
                 * example:
                 * Invalid request body
                 */
                message?: string;
            }
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
                 */
                message?: string;
            }
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
            export interface $401 {
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
            }
            export interface $403 {
                /**
                 * example:
                 * Forbidden
                 */
                message?: string;
            }
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
}


export interface OperationMethods {
  /**
   * getValidationRules - getValidationRules
   * 
   * Returns all validation rules belonging to the authenticated user's organization.
   * 
   * Results are returned as a flat list. Use this endpoint to list available rules when configuring journeys or entity schemas.
   * 
   */
  'getValidationRules'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetValidationRules.Responses.$200>
  /**
   * createValidationRule - createValidationRule
   * 
   * Creates a new validation rule for the authenticated organization.
   */
  'createValidationRule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateValidationRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateValidationRule.Responses.$201>
  /**
   * getValidationRuleById - getValidationRuleById
   * 
   * Retrieves a specific validation rule by its unique ID.
   */
  'getValidationRuleById'(
    parameters?: Parameters<Paths.GetValidationRuleById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetValidationRuleById.Responses.$200>
  /**
   * updateValidationRule - updateValidationRule
   * 
   * Partially updates an existing validation rule by ID. Only the fields provided in the request body are updated.
   */
  'updateValidationRule'(
    parameters?: Parameters<Paths.UpdateValidationRule.PathParameters> | null,
    data?: Paths.UpdateValidationRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateValidationRule.Responses.$200>
  /**
   * deleteValidationRule - deleteValidationRule
   * 
   * Permanently deletes a validation rule by ID. Any journeys or entity attributes referencing this rule should be updated before deletion.
   */
  'deleteValidationRule'(
    parameters?: Parameters<Paths.DeleteValidationRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteValidationRule.Responses.$204>
  /**
   * addUsedByReference - addUsedByReference
   * 
   * Adds a single `used_by` reference to an existing validation rule.
   * 
   * Use this endpoint when attaching a validation rule to a journey block or entity attribute to track where the rule is applied.
   * 
   */
  'addUsedByReference'(
    parameters?: Parameters<Paths.AddUsedByReference.PathParameters> | null,
    data?: Paths.AddUsedByReference.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddUsedByReference.Responses.$200>
  /**
   * removeUsedByReference - removeUsedByReference
   * 
   * Removes a specific `used_by` reference from an existing validation rule.
   * 
   * Use this endpoint when detaching a validation rule from a journey block or entity attribute.
   * 
   */
  'removeUsedByReference'(
    parameters?: Parameters<Paths.RemoveUsedByReference.PathParameters> | null,
    data?: Paths.RemoveUsedByReference.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveUsedByReference.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/validation-rules']: {
    /**
     * getValidationRules - getValidationRules
     * 
     * Returns all validation rules belonging to the authenticated user's organization.
     * 
     * Results are returned as a flat list. Use this endpoint to list available rules when configuring journeys or entity schemas.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetValidationRules.Responses.$200>
    /**
     * createValidationRule - createValidationRule
     * 
     * Creates a new validation rule for the authenticated organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateValidationRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateValidationRule.Responses.$201>
  }
  ['/v1/validation-rules/{ruleId}']: {
    /**
     * getValidationRuleById - getValidationRuleById
     * 
     * Retrieves a specific validation rule by its unique ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetValidationRuleById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetValidationRuleById.Responses.$200>
    /**
     * updateValidationRule - updateValidationRule
     * 
     * Partially updates an existing validation rule by ID. Only the fields provided in the request body are updated.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateValidationRule.PathParameters> | null,
      data?: Paths.UpdateValidationRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateValidationRule.Responses.$200>
    /**
     * deleteValidationRule - deleteValidationRule
     * 
     * Permanently deletes a validation rule by ID. Any journeys or entity attributes referencing this rule should be updated before deletion.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteValidationRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteValidationRule.Responses.$204>
  }
  ['/v1/validation-rules/{ruleId}/used-by']: {
    /**
     * addUsedByReference - addUsedByReference
     * 
     * Adds a single `used_by` reference to an existing validation rule.
     * 
     * Use this endpoint when attaching a validation rule to a journey block or entity attribute to track where the rule is applied.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AddUsedByReference.PathParameters> | null,
      data?: Paths.AddUsedByReference.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddUsedByReference.Responses.$200>
    /**
     * removeUsedByReference - removeUsedByReference
     * 
     * Removes a specific `used_by` reference from an existing validation rule.
     * 
     * Use this endpoint when detaching a validation rule from a journey block or entity attribute.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveUsedByReference.PathParameters> | null,
      data?: Paths.RemoveUsedByReference.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveUsedByReference.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ComparisonRuleType = Components.Schemas.ComparisonRuleType;
export type Condition = Components.Schemas.Condition;
export type ConditionValue = Components.Schemas.ConditionValue;
export type ContextRequirement = Components.Schemas.ContextRequirement;
export type ContextValue = Components.Schemas.ContextValue;
export type CreateValidationRuleRequest = Components.Schemas.CreateValidationRuleRequest;
export type GetValidationRulesResponse = Components.Schemas.GetValidationRulesResponse;
export type NoValue = Components.Schemas.NoValue;
export type NumericCondition = Components.Schemas.NumericCondition;
export type NumericFactCondition = Components.Schemas.NumericFactCondition;
export type NumericNestedCondition = Components.Schemas.NumericNestedCondition;
export type NumericRuleType = Components.Schemas.NumericRuleType;
export type Operator = Components.Schemas.Operator;
export type PatternCondition = Components.Schemas.PatternCondition;
export type PatternFactCondition = Components.Schemas.PatternFactCondition;
export type PatternNestedCondition = Components.Schemas.PatternNestedCondition;
export type PatternRuleType = Components.Schemas.PatternRuleType;
export type RangeValue = Components.Schemas.RangeValue;
export type RegexCondition = Components.Schemas.RegexCondition;
export type RegexFactCondition = Components.Schemas.RegexFactCondition;
export type RegexNestedCondition = Components.Schemas.RegexNestedCondition;
export type RegexRuleType = Components.Schemas.RegexRuleType;
export type RelativeDateValue = Components.Schemas.RelativeDateValue;
export type ScalarValue = Components.Schemas.ScalarValue;
export type StaticValue = Components.Schemas.StaticValue;
export type UpdateValidationRuleRequest = Components.Schemas.UpdateValidationRuleRequest;
export type UsedBy = Components.Schemas.UsedBy;
export type ValidationRule = Components.Schemas.ValidationRule;
export type ValidationRuleBase = Components.Schemas.ValidationRuleBase;
export type ValueAdjustment = Components.Schemas.ValueAdjustment;
