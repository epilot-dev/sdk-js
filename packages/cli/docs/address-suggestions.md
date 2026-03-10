# Address Suggestions API

- **Base URL:** `https://address-suggestions-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/address-suggestions](https://docs.epilot.io/api/address-suggestions)

## Quick Start

```bash
# List available operations
epilot address-suggestions

# Call an operation
epilot address-suggestions getAddresses -p X-Epilot-Org-ID=739224
```

## Operations

**Addresses API**
- [`getAddresses`](#getaddresses) — Get address suggestions for the given file id
- [`checkAvailability`](#checkavailability) — Check the availability of a given address within multiple files
- [`validateAddressesFile`](#validateaddressesfile) — Validates an addresses file, it returns an array of errors if the file is invalid

### `getAddresses`

Get address suggestions for the given file id

`GET /v1/public/suggestions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |
| `s3FileUrl` | query | string | No | file s3 reference |
| `fileId` | query | string | No | file id to get suggestions from |
| `countryCodeSearchTerm` | query | string | No | country code search term |
| `postalCodeSearchTerm` | query | string | No | postal code search term |
| `streetSearchTerm` | query | string | No | street search term |

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
epilot address-suggestions getAddresses \
  -p X-Epilot-Org-ID=739224
```

With JSONata filter:

```bash
epilot address-suggestions getAddresses -p X-Epilot-Org-ID=739224 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "country": "string",
    "postal_code": "string",
    "city": "string",
    "street": "string",
    "street_number": "string"
  }
]
```

</details>

---

### `checkAvailability`

Check the availability of a given address within multiple files

`GET /v1/public/availability:check`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |
| `files` | query | string | Yes | file ids to check, comma separated |
| `countryCode` | query | string | Yes | country code |
| `postalCode` | query | string | Yes | postal code |
| `street` | query | string | No | street |
| `streetNumber` | query | string | No | street number |

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
epilot address-suggestions checkAvailability \
  -p X-Epilot-Org-ID=739224 \
  -p files=example \
  -p countryCode=de \
  -p postalCode=50667
```

With JSONata filter:

```bash
epilot address-suggestions checkAvailability -p X-Epilot-Org-ID=739224 -p files=example -p countryCode=de -p postalCode=50667 --jsonata 'fileId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "fileId": "4e7b7d95-ced6-4f5f-9326-0c61f30dcadb"
}
```

</details>

---

### `validateAddressesFile`

Validates an addresses file, it returns an array of errors if the file is invalid

`GET /v1/addresses-files:validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `fileId` | query | string | No | file id to validate |

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
epilot address-suggestions validateAddressesFile
```

With JSONata filter:

```bash
epilot address-suggestions validateAddressesFile --jsonata 'status'
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
      "msg": "string",
      "data": "string"
    }
  ]
}
```

</details>

---

## Deprecated Operations

- ~~`validateAddresses`~~ GET `/v1/suggestions:validate`
