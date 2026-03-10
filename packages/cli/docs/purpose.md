# Purpose API

- **Base URL:** `https://purpose.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/purpose](https://docs.epilot.io/api/purpose)

Purpose API - enables the management of purposes for the epilot platform.

## Quick Start

```bash
# List available operations
epilot purpose

# Call an operation
epilot purpose createPurpose
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

**Purpose**
- [`createPurpose`](#createpurpose) — Create a new purpose
- [`searchPurposes`](#searchpurposes) — Search purposes using fuzzy matching.
- [`batchGetPurposes`](#batchgetpurposes) — Fetch multiple purposes by their known IDs in a single request.
- [`getPurpose`](#getpurpose) — Get a single purpose by ID
- [`updatePurpose`](#updatepurpose) — Update an existing purpose
- [`deletePurpose`](#deletepurpose) — Permanently delete a purpose

### `createPurpose`

Create a new purpose

`POST /v1/purpose`

**Request Body** (required)

**Sample Call**

```bash
epilot purpose createPurpose \
  -d '{"name":"Electricity Contract"}'
```

Using stdin pipe:

```bash
cat body.json | epilot purpose createPurpose
```

With JSONata filter:

```bash
epilot purpose createPurpose --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `searchPurposes`

Search purposes using fuzzy matching.

`GET /v1/purpose:search`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `query` | query | string | No | Search query string |
| `size` | query | number | No | Maximum number of results to return |

**Sample Call**

```bash
epilot purpose searchPurposes
```

With JSONata filter:

```bash
epilot purpose searchPurposes --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Electricity Contract",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `batchGetPurposes`

Fetch multiple purposes by their known IDs in a single request.

`POST /v1/purpose:batchGet`

**Request Body** (required)

**Sample Call**

```bash
epilot purpose batchGetPurposes \
  -d '{"purposeIds":["123e4567-e89b-12d3-a456-426614174000"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot purpose batchGetPurposes
```

With JSONata filter:

```bash
epilot purpose batchGetPurposes --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Electricity Contract",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "hits": 0
}
```

</details>

---

### `getPurpose`

Get a single purpose by ID

`GET /v1/purpose/{purposeId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `purposeId` | path | string | Yes | Purpose ID (UUID) |

**Sample Call**

```bash
epilot purpose getPurpose \
  -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

Using positional args for path parameters:

```bash
epilot purpose getPurpose 1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

With JSONata filter:

```bash
epilot purpose getPurpose -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updatePurpose`

Update an existing purpose

`PUT /v1/purpose/{purposeId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `purposeId` | path | string | Yes | Purpose ID (UUID) |

**Request Body** (required)

**Sample Call**

```bash
epilot purpose updatePurpose \
  -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217 \
  -d '{"name":"string"}'
```

Using positional args for path parameters:

```bash
epilot purpose updatePurpose 1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

Using stdin pipe:

```bash
cat body.json | epilot purpose updatePurpose -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

With JSONata filter:

```bash
epilot purpose updatePurpose -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deletePurpose`

Permanently delete a purpose

`DELETE /v1/purpose/{purposeId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `purposeId` | path | string | Yes | Purpose ID (UUID) |

**Sample Call**

```bash
epilot purpose deletePurpose \
  -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

Using positional args for path parameters:

```bash
epilot purpose deletePurpose 1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217
```

With JSONata filter:

```bash
epilot purpose deletePurpose -p purposeId=1fdc8f66-0e2b-4e20-a347-9cbdbf6a7217 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Electricity Contract",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---
