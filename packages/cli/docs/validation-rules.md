# Validation Rules API

- **Base URL:** `https://validation-rules.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/validation-rules](https://docs.epilot.io/api/validation-rules)

The Validation Rules API manages reusable input validation rules for epilot journeys and entity attributes.

## Quick Start

```bash
# List available operations
epilot validation-rules

# Call an operation
epilot validation-rules getValidationRules
```

## Common Flags

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Validation Rules**
- [`getValidationRules`](#getvalidationrules) — Returns all validation rules belonging to the authenticated user's organization.
- [`createValidationRule`](#createvalidationrule) — Creates a new validation rule for the authenticated organization.
- [`getValidationRuleById`](#getvalidationrulebyid) — Retrieves a specific validation rule by its unique ID.
- [`updateValidationRule`](#updatevalidationrule) — Partially updates an existing validation rule by ID. Only the fields provided in the request body are updated.
- [`deleteValidationRule`](#deletevalidationrule) — Permanently deletes a validation rule by ID. Any journeys or entity attributes referencing this rule should be updated b
- [`addUsedByReference`](#addusedbyreference) — Adds a single `used_by` reference to an existing validation rule.
- [`removeUsedByReference`](#removeusedbyreference) — Removes a specific `used_by` reference from an existing validation rule.

### `getValidationRules`

Returns all validation rules belonging to the authenticated user's organization.

`GET /v1/validation-rules`

**Sample Call**

```bash
epilot validation-rules getValidationRules
```

With JSONata filter:

```bash
epilot validation-rules getValidationRules --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

**Request Body** (required)

**Sample Call**

```bash
epilot validation-rules createValidationRule
```

With request body:

```bash
epilot validation-rules createValidationRule \
  -d '{
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
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules createValidationRule
```

With JSONata filter:

```bash
epilot validation-rules createValidationRule --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to retrieve. |

**Sample Call**

```bash
epilot validation-rules getValidationRuleById \
  -p ruleId=rule-abc123
```

Using positional args for path parameters:

```bash
epilot validation-rules getValidationRuleById rule-abc123
```

With JSONata filter:

```bash
epilot validation-rules getValidationRuleById -p ruleId=rule-abc123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Sample Call**

```bash
epilot validation-rules updateValidationRule \
  -p ruleId=rule-abc123
```

With request body:

```bash
epilot validation-rules updateValidationRule \
  -p ruleId=rule-abc123 \
  -d '{
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
  ]
}'
```

Using positional args for path parameters:

```bash
epilot validation-rules updateValidationRule rule-abc123
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules updateValidationRule -p ruleId=rule-abc123
```

With JSONata filter:

```bash
epilot validation-rules updateValidationRule -p ruleId=rule-abc123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Permanently deletes a validation rule by ID. Any journeys or entity attributes referencing this rule should be updated b

`DELETE /v1/validation-rules/{ruleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to delete. |

**Sample Call**

```bash
epilot validation-rules deleteValidationRule \
  -p ruleId=rule-abc123
```

Using positional args for path parameters:

```bash
epilot validation-rules deleteValidationRule rule-abc123
```

With JSONata filter:

```bash
epilot validation-rules deleteValidationRule -p ruleId=rule-abc123 --jsonata '$'
```

---

### `addUsedByReference`

Adds a single `used_by` reference to an existing validation rule.

`POST /v1/validation-rules/{ruleId}/used-by`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Sample Call**

```bash
epilot validation-rules addUsedByReference \
  -p ruleId=rule-abc123 \
  -d '{"type":"journey","source_id":"journey-xyz789"}'
```

Using positional args for path parameters:

```bash
epilot validation-rules addUsedByReference rule-abc123
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules addUsedByReference -p ruleId=rule-abc123
```

With JSONata filter:

```bash
epilot validation-rules addUsedByReference -p ruleId=rule-abc123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Sample Call**

```bash
epilot validation-rules removeUsedByReference \
  -p ruleId=rule-abc123 \
  -d '{"type":"journey","source_id":"journey-xyz789"}'
```

Using positional args for path parameters:

```bash
epilot validation-rules removeUsedByReference rule-abc123
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules removeUsedByReference -p ruleId=rule-abc123
```

With JSONata filter:

```bash
epilot validation-rules removeUsedByReference -p ruleId=rule-abc123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
