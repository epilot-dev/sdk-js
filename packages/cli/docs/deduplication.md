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

## Operations

- [`deduplicate`](#deduplicate) — Deduplicates Entities

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
epilot deduplication deduplicate --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
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
```

</details>

---
