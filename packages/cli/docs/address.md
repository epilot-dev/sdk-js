# Address API

- **Base URL:** `https://address.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/address](https://docs.epilot.io/api/address)

API for address based operations on the Epilot platform

## Quick Start

```bash
# List available operations
epilot address

# Call an operation
epilot address getAddressSuggestions -p fileRef=https://epilot-dev-user-content.s3.eu-central-1.amazonaws.com/739224/0a3639af-d4c3-4f96-bfc1-9dcbafdfaa42/availability-file-template%2520(13).csv
```

## Operations

**Address Suggestion**
- [`getAddressSuggestions`](#getaddresssuggestions) — Get address suggestions for the given Availability File

**Availability**
- [`availabilityCheck`](#availabilitycheck) — Check for Entities that contain a matching availability range in related availability files.
- [`validateAvailabilityFile`](#validateavailabilityfile) — Validates an already uploaded availability file, it returns an array of errors if any errors are found in the file.

### `getAddressSuggestions`

Get address suggestions for the given Availability File

`GET /v1/public/suggestions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `fileRef` | query | string (uri) | Yes | Reference to the File URL |
| `countryCodeSearchTerm` | query | string | No | Country code search term |
| `postalCodeSearchTerm` | query | string (postal-code) | No | Postal code search term |
| `streetSearchTerm` | query | string (street-address) | No | street search term |

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
epilot address getAddressSuggestions \
  -p fileRef=https://epilot-dev-user-content.s3.eu-central-1.amazonaws.com/739224/0a3639af-d4c3-4f96-bfc1-9dcbafdfaa42/availability-file-template%2520(13).csv
```

With JSONata filter:

```bash
epilot address getAddressSuggestions -p fileRef=https://epilot-dev-user-content.s3.eu-central-1.amazonaws.com/739224/0a3639af-d4c3-4f96-bfc1-9dcbafdfaa42/availability-file-template%2520(13).csv --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "country": "st",
    "postal_code": "string",
    "city": "string",
    "street": "string",
    "street_number": "string"
  }
]
```

</details>

---

### `availabilityCheck`

Check for Entities that contain a matching availability range in related availability files.

`POST /v1/public/availability`

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
epilot address availabilityCheck \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot address availabilityCheck
```

With JSONata filter:

```bash
epilot address availabilityCheck --jsonata 'available_entities'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available_entities": [],
  "check_results": [
    {
      "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe36",
      "matching_hits": 0
    },
    {
      "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe37",
      "matching_hits": 0
    }
  ]
}
```

</details>

---

### `validateAvailabilityFile`

Validates an already uploaded availability file, it returns an array of errors if any errors are found in the file.

`GET /v1/availability/{id}/validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity ID of the File Entity with the Availability File. The accepted formats are `.csv` and `.xlsx`. |

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
epilot address validateAvailabilityFile \
  -p id=72c803b2-2e5d-4bd6-bffc-fad998bbbe36
```

Using positional args for path parameters:

```bash
epilot address validateAvailabilityFile 72c803b2-2e5d-4bd6-bffc-fad998bbbe36
```

With JSONata filter:

```bash
epilot address validateAvailabilityFile -p id=72c803b2-2e5d-4bd6-bffc-fad998bbbe36 --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "success",
  "rules_parsed_count": 0,
  "errors": [
    {
      "line": 0,
      "message": "string",
      "data": "string"
    }
  ]
}
```

</details>

---
