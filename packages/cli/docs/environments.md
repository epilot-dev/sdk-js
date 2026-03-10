# Environments API

- **Base URL:** `https://environments.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/environments](https://docs.epilot.io/api/environments)

API for managing organization environment variables and secrets

## Quick Start

```bash
# List available operations
epilot environments

# Call an operation
epilot environments listEnvironmentVariables
```

## Operations

**environments**
- [`listEnvironmentVariables`](#listenvironmentvariables) — List all environment variables for the organization. Returns metadata only, no secret values.
- [`createEnvironmentVariable`](#createenvironmentvariable) — Create a new environment variable or secret for the organization.
- [`getEnvironmentVariable`](#getenvironmentvariable) — Get an environment variable by key. Returns value only for String type, omitted for SecretString.
- [`updateEnvironmentVariable`](#updateenvironmentvariable) — Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist.
- [`deleteEnvironmentVariable`](#deleteenvironmentvariable) — Delete an environment variable by key.

### `listEnvironmentVariables`

List all environment variables for the organization. Returns metadata only, no secret values.

`GET /v1/environments`

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot environments listEnvironmentVariables
```

With JSONata filter:

```bash
epilot environments listEnvironmentVariables --jsonata 'items[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "items": [
    {
      "key": "string",
      "type": "String",
      "description": "string",
      "value": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createEnvironmentVariable`

Create a new environment variable or secret for the organization.

`POST /v1/environments`

**Request Body** (required)

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot environments createEnvironmentVariable \
  -d '{"key":"string","type":"String","description":"string","value":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot environments createEnvironmentVariable
```

With JSONata filter:

```bash
epilot environments createEnvironmentVariable --jsonata 'key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getEnvironmentVariable`

Get an environment variable by key. Returns value only for String type, omitted for SecretString.

`GET /v1/environments/{key}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `key` | path | string | Yes | Environment variable key |

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot environments getEnvironmentVariable \
  -p key=example
```

Using positional args for path parameters:

```bash
epilot environments getEnvironmentVariable example
```

With JSONata filter:

```bash
epilot environments getEnvironmentVariable -p key=example --jsonata 'key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateEnvironmentVariable`

Create or update an environment variable. Acts as an upsert — creates the variable if it does not exist.

`PUT /v1/environments/{key}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `key` | path | string | Yes | Environment variable key |

**Request Body** (required)

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot environments updateEnvironmentVariable \
  -p key=example \
  -d '{"type":"String","value":"string","description":"string"}'
```

Using positional args for path parameters:

```bash
epilot environments updateEnvironmentVariable example
```

Using stdin pipe:

```bash
cat body.json | epilot environments updateEnvironmentVariable -p key=example
```

With JSONata filter:

```bash
epilot environments updateEnvironmentVariable -p key=example --jsonata 'key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "key": "string",
  "type": "String",
  "description": "string",
  "value": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteEnvironmentVariable`

Delete an environment variable by key.

`DELETE /v1/environments/{key}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `key` | path | string | Yes | Environment variable key |

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot environments deleteEnvironmentVariable \
  -p key=example
```

Using positional args for path parameters:

```bash
epilot environments deleteEnvironmentVariable example
```

With JSONata filter:

```bash
epilot environments deleteEnvironmentVariable -p key=example --jsonata '$'
```

---
