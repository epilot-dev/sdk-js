# Validation Rules API

- **Full API Docs:** [https://docs.epilot.io/api/validation-rules](https://docs.epilot.io/api/validation-rules)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.validationRules.getValidationRules(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/validation-rules'

const validationRulesClient = getClient()
authorize(validationRulesClient, () => '<token>')
const { data } = await validationRulesClient.getValidationRules(...)
```

## Operations

**Validation Rules**
- [`getValidationRules`](#getvalidationrules)
- [`createValidationRule`](#createvalidationrule)
- [`getValidationRuleById`](#getvalidationrulebyid)
- [`updateValidationRule`](#updatevalidationrule)
- [`deleteValidationRule`](#deletevalidationrule)
- [`addUsedByReference`](#addusedbyreference)
- [`removeUsedByReference`](#removeusedbyreference)

**Schemas**
- [`GetValidationRulesResponse`](#getvalidationrulesresponse)
- [`CreateValidationRuleRequest`](#createvalidationrulerequest)
- [`UpdateValidationRuleRequest`](#updatevalidationrulerequest)
- [`ValidationRuleBase`](#validationrulebase)
- [`ValidationRule`](#validationrule)
- [`UsedBy`](#usedby)
- [`RegexRuleType`](#regexruletype)
- [`PatternRuleType`](#patternruletype)
- [`NumericRuleType`](#numericruletype)
- [`RegexCondition`](#regexcondition)
- [`RegexNestedCondition`](#regexnestedcondition)
- [`RegexFactCondition`](#regexfactcondition)
- [`PatternCondition`](#patterncondition)
- [`PatternNestedCondition`](#patternnestedcondition)
- [`PatternFactCondition`](#patternfactcondition)
- [`NumericCondition`](#numericcondition)
- [`NumericNestedCondition`](#numericnestedcondition)
- [`NumericFactCondition`](#numericfactcondition)
- [`ComparisonRuleType`](#comparisonruletype)
- [`Condition`](#condition)
- [`Operator`](#operator)
- [`ConditionValue`](#conditionvalue)
- [`ScalarValue`](#scalarvalue)
- [`StaticValue`](#staticvalue)
- [`ContextValue`](#contextvalue)
- [`ValueAdjustment`](#valueadjustment)
- [`RelativeDateValue`](#relativedatevalue)
- [`RangeValue`](#rangevalue)
- [`NoValue`](#novalue)
- [`AppliesWhen`](#applieswhen)
- [`ContextRequirement`](#contextrequirement)

### `getValidationRules`

Returns all validation rules belonging to the authenticated user's organization.

`GET /v1/validation-rules`

```ts
const { data } = await client.getValidationRules()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "title": "string",
      "placeholder": "string",
      "used_by": [
        {
          "type": "journey",
          "source_id": "journey-xyz789"
        }
      ],
      "rule": {
        "type": "regex",
        "conditions": {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            },
            {
              "all": [
                {
                  "fact": "inputValue",
                  "operator": "regexMatch",
                  "value": "string",
                  "params": {
                    "errorMessage": "string"
                  }
                }
              ]
            }
          ]
        }
      },
      "contexts": [
        {
          "schema": "contract"
        }
      ],
      "_schema_version": "string",
      "_id": "string",
      "_organization_id": "string",
      "created_at": "string",
      "updated_at": "string",
      "created_by": "string",
      "updated_by": "string"
    }
  ]
}
```

</details>

---

### `createValidationRule`

Creates a new validation rule for the authenticated organization.

`POST /v1/validation-rules`

```ts
const { data } = await client.createValidationRule(
  null,
  {
    title: 'string',
    placeholder: 'string',
    used_by: [
      {
        type: 'journey',
        source_id: 'journey-xyz789'
      }
    ],
    rule: {
      type: 'regex',
      conditions: {
        all: [
          {
            fact: 'inputValue',
            operator: 'regexMatch',
            value: 'string',
            params: {
              errorMessage: 'string'
            }
          },
          {
            all: [
              {
                fact: 'inputValue',
                operator: 'regexMatch',
                value: 'string',
                params: {
                  errorMessage: 'string'
                }
              }
            ]
          }
        ]
      }
    },
    contexts: [
      {
        schema: 'contract'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "placeholder": "string",
  "used_by": [
    {
      "type": "journey",
      "source_id": "journey-xyz789"
    }
  ],
  "rule": {
    "type": "regex",
    "conditions": {
      "all": [
        {
          "fact": "inputValue",
          "operator": "regexMatch",
          "value": "string",
          "params": {
            "errorMessage": "string"
          }
        },
        {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            }
          ]
        }
      ]
    }
  },
  "contexts": [
    {
      "schema": "contract"
    }
  ],
  "_schema_version": "string",
  "_id": "string",
  "_organization_id": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `getValidationRuleById`

Retrieves a specific validation rule by its unique ID.

`GET /v1/validation-rules/{ruleId}`

```ts
const { data } = await client.getValidationRuleById({
  ruleId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "placeholder": "string",
  "used_by": [
    {
      "type": "journey",
      "source_id": "journey-xyz789"
    }
  ],
  "rule": {
    "type": "regex",
    "conditions": {
      "all": [
        {
          "fact": "inputValue",
          "operator": "regexMatch",
          "value": "string",
          "params": {
            "errorMessage": "string"
          }
        },
        {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            }
          ]
        }
      ]
    }
  },
  "contexts": [
    {
      "schema": "contract"
    }
  ],
  "_schema_version": "string",
  "_id": "string",
  "_organization_id": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `updateValidationRule`

Partially updates an existing validation rule by ID. Only the fields provided in the request body are updated.

`PATCH /v1/validation-rules/{ruleId}`

```ts
const { data } = await client.updateValidationRule(
  {
    ruleId: 'example',
  },
  {
    title: 'string',
    placeholder: 'string',
    used_by: [
      {
        type: 'journey',
        source_id: 'journey-xyz789'
      }
    ],
    rule: {
      type: 'regex',
      conditions: {
        all: [
          {
            fact: 'inputValue',
            operator: 'regexMatch',
            value: 'string',
            params: {
              errorMessage: 'string'
            }
          },
          {
            all: [
              {
                fact: 'inputValue',
                operator: 'regexMatch',
                value: 'string',
                params: {
                  errorMessage: 'string'
                }
              }
            ]
          }
        ]
      }
    },
    contexts: [
      {
        schema: 'contract'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "placeholder": "string",
  "used_by": [
    {
      "type": "journey",
      "source_id": "journey-xyz789"
    }
  ],
  "rule": {
    "type": "regex",
    "conditions": {
      "all": [
        {
          "fact": "inputValue",
          "operator": "regexMatch",
          "value": "string",
          "params": {
            "errorMessage": "string"
          }
        },
        {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            }
          ]
        }
      ]
    }
  },
  "contexts": [
    {
      "schema": "contract"
    }
  ],
  "_schema_version": "string",
  "_id": "string",
  "_organization_id": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `deleteValidationRule`

Permanently deletes a validation rule by ID. Any journeys or entity attributes referencing this rule should be updated before deletion.

`DELETE /v1/validation-rules/{ruleId}`

```ts
const { data } = await client.deleteValidationRule({
  ruleId: 'example',
})
```

---

### `addUsedByReference`

Adds a single `used_by` reference to an existing validation rule.

`POST /v1/validation-rules/{ruleId}/used-by`

```ts
const { data } = await client.addUsedByReference(
  {
    ruleId: 'example',
  },
  {
    type: 'journey',
    source_id: 'journey-xyz789'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "placeholder": "string",
  "used_by": [
    {
      "type": "journey",
      "source_id": "journey-xyz789"
    }
  ],
  "rule": {
    "type": "regex",
    "conditions": {
      "all": [
        {
          "fact": "inputValue",
          "operator": "regexMatch",
          "value": "string",
          "params": {
            "errorMessage": "string"
          }
        },
        {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            }
          ]
        }
      ]
    }
  },
  "contexts": [
    {
      "schema": "contract"
    }
  ],
  "_schema_version": "string",
  "_id": "string",
  "_organization_id": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `removeUsedByReference`

Removes a specific `used_by` reference from an existing validation rule.

`DELETE /v1/validation-rules/{ruleId}/used-by`

```ts
const { data } = await client.removeUsedByReference(
  {
    ruleId: 'example',
  },
  {
    type: 'journey',
    source_id: 'journey-xyz789'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "placeholder": "string",
  "used_by": [
    {
      "type": "journey",
      "source_id": "journey-xyz789"
    }
  ],
  "rule": {
    "type": "regex",
    "conditions": {
      "all": [
        {
          "fact": "inputValue",
          "operator": "regexMatch",
          "value": "string",
          "params": {
            "errorMessage": "string"
          }
        },
        {
          "all": [
            {
              "fact": "inputValue",
              "operator": "regexMatch",
              "value": "string",
              "params": {
                "errorMessage": "string"
              }
            }
          ]
        }
      ]
    }
  },
  "contexts": [
    {
      "schema": "contract"
    }
  ],
  "_schema_version": "string",
  "_id": "string",
  "_organization_id": "string",
  "created_at": "string",
  "updated_at": "string",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

## Schemas

### `GetValidationRulesResponse`

Response envelope for listing all validation rules within an organization.

```ts
type GetValidationRulesResponse = {
  results?: Array<{
    _schema_version: string
    _id: string
    _organization_id: string
    created_at: string
    updated_at: string
    created_by: string
    updated_by: string
  }>
}
```

### `CreateValidationRuleRequest`

```ts
type CreateValidationRuleRequest = object
```

### `UpdateValidationRuleRequest`

```ts
type UpdateValidationRuleRequest = {
  title?: string
  placeholder?: string
  used_by?: Array<{
    type: "journey" | "entity"
    schema_slug?: string
    source_id?: string
  }>
  rule?: {
    type: "regex"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    type: "pattern"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    type: "numeric"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    input_type: "number" | "date" | "text"
    conditions: Array<{
      id: { ... }
      operator: { ... }
      value: { ... }
      error_message: { ... }
      applies_when?: { ... }
      allow_failure?: { ... }
    }>
  }
  contexts?: Array<{
    schema: string
  }>
}
```

### `ValidationRuleBase`

```ts
type ValidationRuleBase = {
  title?: string
  placeholder?: string
  used_by?: Array<{
    type: "journey" | "entity"
    schema_slug?: string
    source_id?: string
  }>
  rule?: {
    type: "regex"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    type: "pattern"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    type: "numeric"
    conditions: {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  } | {
    input_type: "number" | "date" | "text"
    conditions: Array<{
      id: { ... }
      operator: { ... }
      value: { ... }
      error_message: { ... }
      applies_when?: { ... }
      allow_failure?: { ... }
    }>
  }
  contexts?: Array<{
    schema: string
  }>
}
```

### `ValidationRule`

The Validation rule definition.

```ts
type ValidationRule = {
  _schema_version: string
  _id: string
  _organization_id: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}
```

### `UsedBy`

Describes where and how a validation rule is applied. Used to track associations between rules and the journeys or entity schemas that reference them.

```ts
type UsedBy = {
  type: "journey" | "entity"
  schema_slug?: string
  source_id?: string
}
```

### `RegexRuleType`

Validation rule that uses a regular expression to validate input.

```ts
type RegexRuleType = {
  type: "regex"
  conditions: {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  }
}
```

### `PatternRuleType`

Validation rule that uses a sequence of patterns to validate input.

```ts
type PatternRuleType = {
  type: "pattern"
  conditions: {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  }
}
```

### `NumericRuleType`

Validation rule for numeric values, supporting range and digit count constraints.

```ts
type NumericRuleType = {
  type: "numeric"
  conditions: {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      all: { ... }
    } | {
      any: { ... }
    } | {
      not: { ... }
    }
  }
}
```

### `RegexCondition`

Condition definition for a regex-based validation rule (2 levels deep)

```ts
type RegexCondition = {
  all: Array<{
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  } | {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }
  }>
} | {
  any: Array<{
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  } | {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }
  }>
} | {
  not: {
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  } | {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }
  }
}
```

### `RegexNestedCondition`

Nested condition with logical operators (level 2 only)

```ts
type RegexNestedCondition = {
  all: Array<{
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  }>
} | {
  any: Array<{
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  }>
} | {
  not: {
    fact: "inputValue"
    operator: "regexMatch"
    value: string
    params?: {
      errorMessage?: { ... }
    }
  }
}
```

### `RegexFactCondition`

Fact-based condition for regex validation

```ts
type RegexFactCondition = {
  fact: "inputValue"
  operator: "regexMatch"
  value: string
  params?: {
    errorMessage?: string
  }
}
```

### `PatternCondition`

Condition definition for a pattern-based validation rule (2 levels deep)

```ts
type PatternCondition = {
  all: Array<{
    fact: "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check" | "total-length"
    operator: "exactlyNDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "in" | "notIn" | "contains" | "doesNotContain"
    value: string[]
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "equal" | "notEqual"
    value: string
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
  // ...
}
```

### `PatternNestedCondition`

Nested condition with logical operators (level 2 only)

```ts
type PatternNestedCondition = {
  all: Array<{
    fact: "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check" | "total-length"
    operator: "exactlyNDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "in" | "notIn" | "contains" | "doesNotContain"
    value: string[]
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "equal" | "notEqual"
    value: string
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  }>
} | {
  any: Array<{
    fact: "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check" | "total-length"
    operator: "exactlyNDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "in" | "notIn" | "contains" | "doesNotContain"
    value: string[]
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "equal" | "notEqual"
    value: string
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  }>
} | {
  not: {
    fact: "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check" | "total-length"
    operator: "exactlyNDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      start?: { ... }
      end?: { ... }
    }
  } | {
    fact: "static-check"
    operator: "in" | "notIn" | "contains" | "doesNotContain"
    value: string[]
    params?: {
  // ...
}
```

### `PatternFactCondition`

Fact-based condition for pattern validation

```ts
type PatternFactCondition = {
  fact: "total-length"
  operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
  value: number
  params?: {
    errorMessage?: string
    start?: number
    end?: number
  }
} | {
  fact: "static-check" | "total-length"
  operator: "exactlyNDigits"
  value: number
  params?: {
    errorMessage?: string
    start?: number
    end?: number
  }
} | {
  fact: "static-check"
  operator: "in" | "notIn" | "contains" | "doesNotContain"
  value: string[]
  params?: {
    errorMessage?: string
    start?: number
    end?: number
  }
} | {
  fact: "static-check"
  operator: "equal" | "notEqual"
  value: string
  params?: {
    errorMessage?: string
    start?: number
    end?: number
  }
}
```

### `NumericCondition`

Condition definition for a numeric-based validation rule (2 levels deep)

```ts
type NumericCondition = {
  all: Array<{
    fact: "numeric-value" | "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "integer-digits-count"
    operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      allowLeadingZeroes?: { ... }
    }
  } | {
    fact: "decimal-digits-count"
    operator: "equal" | "minDecimalDigits" | "maxDecimalDigits"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "has-leading-zeroes"
    operator: "equal" | "notAllowed"
    value: boolean
    params?: {
      errorMessage?: { ... }
    }
  } | {
    all: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    any: Array<{
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }>
  } | {
    not: {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    } | {
      fact: { ... }
      operator: { ... }
      value: { ... }
      params?: { ... }
    }
  }>
} | {
  any: Array<{
    fact: "numeric-value" | "total-length"
  // ...
}
```

### `NumericNestedCondition`

Nested condition with logical operators (level 2 only)

```ts
type NumericNestedCondition = {
  all: Array<{
    fact: "numeric-value" | "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "integer-digits-count"
    operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      allowLeadingZeroes?: { ... }
    }
  } | {
    fact: "decimal-digits-count"
    operator: "equal" | "minDecimalDigits" | "maxDecimalDigits"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "has-leading-zeroes"
    operator: "equal" | "notAllowed"
    value: boolean
    params?: {
      errorMessage?: { ... }
    }
  }>
} | {
  any: Array<{
    fact: "numeric-value" | "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "integer-digits-count"
    operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      allowLeadingZeroes?: { ... }
    }
  } | {
    fact: "decimal-digits-count"
    operator: "equal" | "minDecimalDigits" | "maxDecimalDigits"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "has-leading-zeroes"
    operator: "equal" | "notAllowed"
    value: boolean
    params?: {
      errorMessage?: { ... }
    }
  }>
} | {
  not: {
    fact: "numeric-value" | "total-length"
    operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "integer-digits-count"
    operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits"
    value: number
    params?: {
      errorMessage?: { ... }
      allowLeadingZeroes?: { ... }
    }
  } | {
    fact: "decimal-digits-count"
    operator: "equal" | "minDecimalDigits" | "maxDecimalDigits"
    value: number
    params?: {
      errorMessage?: { ... }
    }
  } | {
    fact: "has-leading-zeroes"
    operator: "equal" | "notAllowed"
    value: boolean
    params?: {
      errorMessage?: { ... }
    }
  }
}
```

### `NumericFactCondition`

Fact-based condition for numeric validation

```ts
type NumericFactCondition = {
  fact: "numeric-value" | "total-length"
  operator: "equal" | "notEqual" | "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive"
  value: number
  params?: {
    errorMessage?: string
  }
} | {
  fact: "integer-digits-count"
  operator: "equal" | "exactlyNDigits" | "minIntegerDigits" | "maxIntegerDigits"
  value: number
  params?: {
    errorMessage?: string
    allowLeadingZeroes?: boolean
  }
} | {
  fact: "decimal-digits-count"
  operator: "equal" | "minDecimalDigits" | "maxDecimalDigits"
  value: number
  params?: {
    errorMessage?: string
  }
} | {
  fact: "has-leading-zeroes"
  operator: "equal" | "notAllowed"
  value: boolean
  params?: {
    errorMessage?: string
  }
}
```

### `ComparisonRuleType`

Declarative validation rule (schema version v2). Supports predefined comparison operators
over number, date and text inputs, with static, dynamic (context path) and relative-date
comparison values.


```ts
type ComparisonRuleType = {
  input_type: "number" | "date" | "text"
  conditions: Array<{
    id: string
    operator: "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "between" | "dateBefore" | "dateOnOrBefore" | "dateAfter" | "dateOnOrAfter" | "dateBetween" | "notInFuture" | "notInPast" | "contains" | "doesNotContain" | "startsWith" | "endsWith" | "regexMatch" | "lengthBetween"
    value: {
      source: { ... }
      data: { ... }
    } | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    } | {
      source: { ... }
      offset: { ... }
      unit: { ... }
      anchor?: { ... }
    } | {
      source: { ... }
      min: { ... }
      max: { ... }
    } | {
      source: { ... }
    }
    error_message: string
    applies_when?: {
      path: { ... }
      operator: { ... }
      value?: { ... }
    }
    allow_failure?: boolean
  }>
}
```

### `Condition`

A single comparison the input value must satisfy.

```ts
type Condition = {
  id: string
  operator: "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "between" | "dateBefore" | "dateOnOrBefore" | "dateAfter" | "dateOnOrAfter" | "dateBetween" | "notInFuture" | "notInPast" | "contains" | "doesNotContain" | "startsWith" | "endsWith" | "regexMatch" | "lengthBetween"
  value: {
    source: "static"
    data: number | string | boolean
  } | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  } | {
    source: "relative_date"
    offset: number
    unit: "days" | "months" | "years"
    anchor?: "today"
  } | {
    source: "range"
    min: {
      source: { ... }
      data: { ... }
    } | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    } | {
      source: { ... }
      offset: { ... }
      unit: { ... }
      anchor?: { ... }
    }
    max: {
      source: { ... }
      data: { ... }
    } | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    } | {
      source: { ... }
      offset: { ... }
      unit: { ... }
      anchor?: { ... }
    }
  } | {
    source: "none"
  }
  error_message: string
  applies_when?: {
    path: string
    operator: "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "isEmpty" | "isNotEmpty"
    value?: number | string | boolean
  }
  allow_failure?: boolean
}
```

### `Operator`

Predefined comparison operator. Compatibility (enforced at write time):
- number: equal, notEqual, greaterThan, greaterThanInclusive, lessThan, lessThanInclusive, between, regexMatch
- date: dateBefore, dateOnOrBefore, dateAfter, dateOnOrAfter, dateBetween, notInFuture, notInPast, regexMatch
- text:

```ts
type Operator = "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "between" | "dateBefore" | "dateOnOrBefore" | "dateAfter" | "dateOnOrAfter" | "dateBetween" | "notInFuture" | "notInPast" | "contains" | "doesNotContain" | "startsWith" | "endsWith" | "regexMatch" | "lengthBetween"
```

### `ConditionValue`

The comparison value of a condition - a scalar, a range of scalars, or nothing (unary operators).

```ts
type ConditionValue = {
  source: "static"
  data: number | string | boolean
} | {
  source: "context"
  path: string
  adjust?: {
    type: "percent" | "absolute"
    value: number | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    }
    direction: "increase" | "decrease"
    rounding?: "up" | "down"
  }
} | {
  source: "relative_date"
  offset: number
  unit: "days" | "months" | "years"
  anchor?: "today"
} | {
  source: "range"
  min: {
    source: "static"
    data: number | string | boolean
  } | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  } | {
    source: "relative_date"
    offset: number
    unit: "days" | "months" | "years"
    anchor?: "today"
  }
  max: {
    source: "static"
    data: number | string | boolean
  } | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  } | {
    source: "relative_date"
    offset: number
    unit: "days" | "months" | "years"
    anchor?: "today"
  }
} | {
  source: "none"
}
```

### `ScalarValue`

A single comparison value - static, resolved from context, or a relative date.

```ts
type ScalarValue = {
  source: "static"
  data: number | string | boolean
} | {
  source: "context"
  path: string
  adjust?: {
    type: "percent" | "absolute"
    value: number | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    }
    direction: "increase" | "decrease"
    rounding?: "up" | "down"
  }
} | {
  source: "relative_date"
  offset: number
  unit: "days" | "months" | "years"
  anchor?: "today"
}
```

### `StaticValue`

A fixed comparison value.

```ts
type StaticValue = {
  source: "static"
  data: number | string | boolean
}
```

### `ContextValue`

A dynamic comparison value resolved from runtime context, e.g. `contract.installment_amount`
or `previous_reading.value`. The first path segment must match the `name` of a declared
context requirement.


```ts
type ContextValue = {
  source: "context"
  path: string
  adjust?: {
    type: "percent" | "absolute"
    value: number | {
      source: { ... }
      path: { ... }
      adjust?: { ... }
    }
    direction: "increase" | "decrease"
    rounding?: "up" | "down"
  }
}
```

### `ValueAdjustment`

Adjusts a context-resolved numeric value before comparison, e.g. "context value plus 10 percent".
Used to express tolerance bands such as "at most 10% above the current instalment amount".


```ts
type ValueAdjustment = {
  type: "percent" | "absolute"
  value: number | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  }
  direction: "increase" | "decrease"
  rounding?: "up" | "down"
}
```

### `RelativeDateValue`

A date relative to the evaluation moment, e.g. "today minus 30 days". Only valid for date rules.

```ts
type RelativeDateValue = {
  source: "relative_date"
  offset: number
  unit: "days" | "months" | "years"
  anchor?: "today"
}
```

### `RangeValue`

A lower and upper bound for range operators (between, dateBetween, lengthBetween). Bounds are inclusive.

```ts
type RangeValue = {
  source: "range"
  min: {
    source: "static"
    data: number | string | boolean
  } | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  } | {
    source: "relative_date"
    offset: number
    unit: "days" | "months" | "years"
    anchor?: "today"
  }
  max: {
    source: "static"
    data: number | string | boolean
  } | {
    source: "context"
    path: string
    adjust?: {
      type: { ... }
      value: { ... }
      direction: { ... }
      rounding?: { ... }
    }
  } | {
    source: "relative_date"
    offset: number
    unit: "days" | "months" | "years"
    anchor?: "today"
  }
}
```

### `NoValue`

No comparison value - used by unary operators such as notInFuture / notInPast.

```ts
type NoValue = {
  source: "none"
}
```

### `AppliesWhen`

Optional precondition on a condition: the condition only takes part in the
validation when this comparison over context holds. Examples: apply the
dual-tariff reference only when `contract.htnt` is not empty, or run a
plausibility check only when a context value reaches a threshold.


```ts
type AppliesWhen = {
  path: string
  operator: "equal" | "notEqual" | "greaterThan" | "greaterThanInclusive" | "lessThan" | "lessThanInclusive" | "isEmpty" | "isNotEmpty"
  value?: number | string | boolean
}
```

### `ContextRequirement`

An entity context source the rule needs at evaluation time, referenced by `context`
value paths via the schema slug as their first segment (e.g. `contract.installment_amount`).
How the source is resolved (which entity instance) is decided by the consuming surface,
not by the rule. Meter reading comp

```ts
type ContextRequirement = {
  schema: string
}
```
