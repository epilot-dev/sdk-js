# Validation Rules API

- **Base URL:** `https://validation-rules.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/validation-rules](https://docs.epilot.io/api/validation-rules)

## Quick Start

```bash
# List available operations
epilot validation-rules

# Call an operation
epilot validation-rules getValidationRules
```

## Operations

**Validation Rules**
- [`getValidationRules`](#getvalidationrules) — Gets all validation rules by organization Id
- [`createValidationRule`](#createvalidationrule) — Creates a new validation rule
- [`getValidationRuleById`](#getvalidationrulebyid) — Retrieves a specific validation rule by its ID
- [`updateValidationRule`](#updatevalidationrule) — Updates an existing validation rule partially by ID
- [`deleteValidationRule`](#deletevalidationrule) — Deletes a validation rule by ID
- [`addUsedByReference`](#addusedbyreference) — Adds a single reference to the usedBy array of a validation rule
- [`removeUsedByReference`](#removeusedbyreference) — Removes a specific reference from the usedBy array of a validation rule

### `getValidationRules`

Gets all validation rules by organization Id

`GET /v1/validation-rules`

**Flags**

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

Creates a new validation rule

`POST /v1/validation-rules`

**Request Body**

**Flags**

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
  }
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

Retrieves a specific validation rule by its ID

`GET /v1/validation-rules/{ruleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to retrieve. |

**Flags**

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

**Sample Call**

```bash
epilot validation-rules getValidationRuleById \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot validation-rules getValidationRuleById 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot validation-rules getValidationRuleById -p ruleId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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

Updates an existing validation rule partially by ID

`PATCH /v1/validation-rules/{ruleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot validation-rules updateValidationRule \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot validation-rules updateValidationRule \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
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
  }
}'
```

Using positional args for path parameters:

```bash
epilot validation-rules updateValidationRule 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules updateValidationRule -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot validation-rules updateValidationRule -p ruleId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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

Deletes a validation rule by ID

`DELETE /v1/validation-rules/{ruleId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to delete. |

**Flags**

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

**Sample Call**

```bash
epilot validation-rules deleteValidationRule \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot validation-rules deleteValidationRule 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot validation-rules deleteValidationRule -p ruleId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `addUsedByReference`

Adds a single reference to the usedBy array of a validation rule

`POST /v1/validation-rules/{ruleId}/used-by`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot validation-rules addUsedByReference \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"type":"journey","schema_slug":"string","source_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot validation-rules addUsedByReference 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules addUsedByReference -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot validation-rules addUsedByReference -p ruleId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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

Removes a specific reference from the usedBy array of a validation rule

`DELETE /v1/validation-rules/{ruleId}/used-by`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `ruleId` | path | string | Yes | The unique identifier of the validation rule to update. |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot validation-rules removeUsedByReference \
  -p ruleId=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"type":"journey","schema_slug":"string","source_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot validation-rules removeUsedByReference 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot validation-rules removeUsedByReference -p ruleId=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot validation-rules removeUsedByReference -p ruleId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
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
