# Validation Rules API

- **Base URL:** `https://validation-rules.sls.epilot.io`
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

const validationRulesClient = await getClient()
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

### `getValidationRules`

Get all validation rules by organization Id

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
          "schema_slug": "string",
          "source_id": "string"
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

Create Validation Rule

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
        schema_slug: 'string',
        source_id: 'string'
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
    }
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
      "schema_slug": "string",
      "source_id": "string"
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

Get validation rule by ID

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
      "schema_slug": "string",
      "source_id": "string"
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

Update Validation Rule (partial update)

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
        schema_slug: 'string',
        source_id: 'string'
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
    }
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
      "schema_slug": "string",
      "source_id": "string"
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

Delete Validation Rule

`DELETE /v1/validation-rules/{ruleId}`

```ts
const { data } = await client.deleteValidationRule({
  ruleId: 'example',
})
```

---

### `addUsedByReference`

Add a reference to the usedBy array

`POST /v1/validation-rules/{ruleId}/used-by`

```ts
const { data } = await client.addUsedByReference(
  {
    ruleId: 'example',
  },
  {
    type: 'journey',
    schema_slug: 'string',
    source_id: 'string'
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
      "schema_slug": "string",
      "source_id": "string"
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

Remove a reference from the usedBy array

`DELETE /v1/validation-rules/{ruleId}/used-by`

```ts
const { data } = await client.removeUsedByReference(
  {
    ruleId: 'example',
  },
  {
    type: 'journey',
    schema_slug: 'string',
    source_id: 'string'
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
      "schema_slug": "string",
      "source_id": "string"
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
  }
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
  }
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

Describes where and how a validation rule is applied.

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
