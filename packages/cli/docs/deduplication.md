# Deduplication API

- **Base URL:** `https://deduplication.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/deduplication](https://docs.epilot.io/api/deduplication)

Backend for Epilot Deduplication feature

## Quick Start

```bash
# List available operations
epilot deduplication

# Call an operation
epilot deduplication deduplicate
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

- [`deduplicate`](#deduplicate) — Deduplicates Entities
- [`deduplicateAsync`](#deduplicateasync) — Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.
- [`getDeduplicationJob`](#getdeduplicationjob) — Returns the current status of an async deduplication job
- [`detectDuplicates`](#detectduplicates) — Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns match
- [`dismissDuplicates`](#dismissduplicates) — Confirms entities as NOT duplicates: clears the internal duplicate-detection flags (_matching_entities) on each given en
- [`listUniquenessCriteria`](#listuniquenesscriteria) — Lists UniquenessCriteria for the requesting organization. Optionally filtered by schema.
- [`createUniquenessCriteria`](#createuniquenesscriteria) — Creates a new UniquenessCriteria record.
- [`getUniquenessCriteria`](#getuniquenesscriteria) — Fetch a single UniquenessCriteria record.
- [`updateUniquenessCriteria`](#updateuniquenesscriteria) — Replace the matchRules on an existing UniquenessCriteria record.
- [`deleteUniquenessCriteria`](#deleteuniquenesscriteria) — Delete a UniquenessCriteria record.

### `deduplicate`

Deduplicates Entities

`POST /v1/deduplicate`

**Request Body**

**Sample Call**

```bash
epilot deduplication deduplicate \
  -d '[{"toKeep":"string","toDelete":["string"]}]'
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication deduplicate
```

With JSONata filter:

```bash
epilot deduplication deduplicate --jsonata 'deduplicatedEntities'
```

<details>
<summary>Sample Response</summary>

```json
{
  "deduplicatedEntities": [
    {
      "_id": "string",
      "_org": "string",
      "_schema": "string",
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_created_by": "string",
      "created_by": "string",
      "_tags": ["string"],
      "_acl": {},
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "type": "string"
    }
  ]
}
```

</details>

---

### `deduplicateAsync`

Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.

`POST /v1/deduplicate/job`

**Request Body**

**Sample Call**

```bash
epilot deduplication deduplicateAsync \
  -d '[{"toKeep":"string","toDelete":["string"]}]'
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication deduplicateAsync
```

With JSONata filter:

```bash
epilot deduplication deduplicateAsync --jsonata '$'
```

---

### `getDeduplicationJob`

Returns the current status of an async deduplication job

`GET /v1/deduplicate/jobs/{jobId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `jobId` | path | string | Yes | The job ID returned by POST /v1/deduplicate/job |

**Sample Call**

```bash
epilot deduplication getDeduplicationJob \
  -p jobId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot deduplication getDeduplicationJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot deduplication getDeduplicationJob -p jobId=123e4567-e89b-12d3-a456-426614174000 --jsonata 'jobId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "jobId": "string",
  "status": "pending",
  "message": "string",
  "result": [
    {
      "_id": "string",
      "_org": "string",
      "_schema": "string",
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_created_by": "string",
      "created_by": "string",
      "_tags": ["string"],
      "_acl": {},
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "type": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `detectDuplicates`

Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns match

`POST /v1/detect-duplicates`

**Request Body**

**Sample Call**

```bash
epilot deduplication detectDuplicates \
  -d '{"schema":"string","entity":{}}'
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication detectDuplicates
```

With JSONata filter:

```bash
epilot deduplication detectDuplicates --jsonata 'matches'
```

<details>
<summary>Sample Response</summary>

```json
{
  "matches": [
    {
      "entity": {
        "_id": "string",
        "_org": "string",
        "_schema": "string",
        "_created_at": "1970-01-01T00:00:00.000Z",
        "_updated_at": "1970-01-01T00:00:00.000Z",
        "_created_by": "string",
        "created_by": "string",
        "_tags": ["string"],
        "_acl": {},
        "_owners": [
          {
            "org_id": "string",
            "user_id": "string"
          }
        ],
        "type": "string"
      },
      "confidence": 0,
      "matched_attributes": ["string"]
    }
  ]
}
```

</details>

---

### `dismissDuplicates`

Confirms entities as NOT duplicates: clears the internal duplicate-detection flags (_matching_entities) on each given en

`POST /v1/duplicates/dismiss`

**Request Body**

**Sample Call**

```bash
epilot deduplication dismissDuplicates \
  -d '{"schema":"string","entityIds":["string"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication dismissDuplicates
```

With JSONata filter:

```bash
epilot deduplication dismissDuplicates --jsonata 'dismissed'
```

<details>
<summary>Sample Response</summary>

```json
{
  "dismissed": ["string"]
}
```

</details>

---

### `listUniquenessCriteria`

Lists UniquenessCriteria for the requesting organization. Optionally filtered by schema.

`GET /v1/uniqueness-criteria`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | query | string | No | Filter results to a specific entity schema. |

**Sample Call**

```bash
epilot deduplication listUniquenessCriteria
```

With JSONata filter:

```bash
epilot deduplication listUniquenessCriteria --jsonata 'items[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "schema": "string",
      "matchRules": [
        {
          "name": "string",
          "attributes": [
            {
              "attribute": "string"
            }
          ],
          "confidence": 0
        }
      ],
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createUniquenessCriteria`

Creates a new UniquenessCriteria record.

`POST /v1/uniqueness-criteria`

**Request Body**

**Sample Call**

```bash
epilot deduplication createUniquenessCriteria \
  -d '{"schema":"string","matchRules":[{"name":"string","attributes":[{"attribute":"string"}],"confidence":0}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication createUniquenessCriteria
```

With JSONata filter:

```bash
epilot deduplication createUniquenessCriteria --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getUniquenessCriteria`

Fetch a single UniquenessCriteria record.

`GET /v1/uniqueness-criteria/{schema}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | path | string | Yes | Entity schema slug. |

**Sample Call**

```bash
epilot deduplication getUniquenessCriteria \
  -p schema=example
```

Using positional args for path parameters:

```bash
epilot deduplication getUniquenessCriteria example
```

With JSONata filter:

```bash
epilot deduplication getUniquenessCriteria -p schema=example --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateUniquenessCriteria`

Replace the matchRules on an existing UniquenessCriteria record.

`PUT /v1/uniqueness-criteria/{schema}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | path | string | Yes | Entity schema slug. |

**Request Body**

**Sample Call**

```bash
epilot deduplication updateUniquenessCriteria \
  -p schema=example \
  -d '{"matchRules":[{"name":"string","attributes":[{"attribute":"string"}],"confidence":0}]}'
```

Using positional args for path parameters:

```bash
epilot deduplication updateUniquenessCriteria example
```

Using stdin pipe:

```bash
cat body.json | epilot deduplication updateUniquenessCriteria -p schema=example
```

With JSONata filter:

```bash
epilot deduplication updateUniquenessCriteria -p schema=example --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "schema": "string",
  "matchRules": [
    {
      "name": "string",
      "attributes": [
        {
          "attribute": "string"
        }
      ],
      "confidence": 0
    }
  ],
  "createdAt": "1970-01-01T00:00:00.000Z",
  "updatedAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteUniquenessCriteria`

Delete a UniquenessCriteria record.

`DELETE /v1/uniqueness-criteria/{schema}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | path | string | Yes | Entity schema slug. |

**Sample Call**

```bash
epilot deduplication deleteUniquenessCriteria \
  -p schema=example
```

Using positional args for path parameters:

```bash
epilot deduplication deleteUniquenessCriteria example
```

With JSONata filter:

```bash
epilot deduplication deleteUniquenessCriteria -p schema=example --jsonata '$'
```

---
