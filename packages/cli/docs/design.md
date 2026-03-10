# Design Builder API v2

- **Base URL:** `https://design-builder-api.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/design](https://docs.epilot.io/api/design)

## Quick Start

```bash
# List available operations
epilot design

# Call an operation
epilot design getAllDesigns
```

## Operations

**design-builder**
- [`getAllDesigns`](#getalldesigns) — Scan all designs linked to a organization, based in orgId attribute from JWT auth token
- [`addDesign`](#adddesign) — Create a brand new design linked to a organization, based in orgId attribute from JWT auth token
- [`getDesign`](#getdesign) — Search for a especific design owned by user organization
- [`updateDesign`](#updatedesign) — Update a especific design owned by user organization
- [`deleteDesign`](#deletedesign) — Search and delete for a especific design owned by user organization
- [`getThemeFromDesign`](#getthemefromdesign) — Search for a especific design owned by user organization and parse them to a new or old theme
- [`getFiles`](#getfiles) — List all files for the user organization bucket
- [`uploadFile`](#uploadfile) — Upload a new file for the user organization bucket
- [`getConsumerDesign`](#getconsumerdesign) — Search for a especific design owned by user organization
- [`addConsumer`](#addconsumer) — Add a consumer that uses a specific design
- [`removeConsumer`](#removeconsumer) — Remove a consumer that uses a specific design

### `getAllDesigns`

Scan all designs linked to a organization, based in orgId attribute from JWT auth token

`GET /v1/designs`

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
epilot design getAllDesigns
```

With JSONata filter:

```bash
epilot design getAllDesigns --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "designs": [
      {}
    ]
  }
]
```

</details>

---

### `addDesign`

Create a brand new design linked to a organization, based in orgId attribute from JWT auth token

`POST /v1/designs`

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot design addDesign
```

With request body:

```bash
epilot design addDesign \
  -d '{
  "design": {
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string"
        }
      },
      "palette": {
        "primary": "string",
        "secondary": "string",
        "error": "string",
        "background": "string",
        "paper": "string",
        "navbar": "string",
        "portal_login_background": "string"
      },
      "typography": {
        "font": {
          "font_id": "string",
          "font_name": "string",
          "font_family": "string",
          "font_weight_regular": "string",
          "font_weight_medium": "string",
          "font_weight_bold": "string",
          "urls": [
            {
              "type": "WOFF2",
              "url": "string"
            }
          ]
        },
        "primary": "string",
        "secondary": "string"
      },
      "shape": {
        "border_radius": 0
      },
      "consumer": {
        "widgets": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "customer_portals": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      }
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot design addDesign
```

With JSONata filter:

```bash
epilot design addDesign --jsonata 'design'
```

<details>
<summary>Sample Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `getDesign`

Search for a especific design owned by user organization

`GET /v1/designs/{designId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |

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
epilot design getDesign \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a
```

Using positional args for path parameters:

```bash
epilot design getDesign 4a062990-a6a3-11eb-9828-4f3da7d4935a
```

With JSONata filter:

```bash
epilot design getDesign -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a --jsonata 'design'
```

<details>
<summary>Sample Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `updateDesign`

Update a especific design owned by user organization

`PUT /v1/designs/{designId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot design updateDesign \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a
```

With request body:

```bash
epilot design updateDesign \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a \
  -d '{
  "design": {
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string"
        }
      },
      "palette": {
        "primary": "string",
        "secondary": "string",
        "error": "string",
        "background": "string",
        "paper": "string",
        "navbar": "string",
        "portal_login_background": "string"
      },
      "typography": {
        "font": {
          "font_id": "string",
          "font_name": "string",
          "font_family": "string",
          "font_weight_regular": "string",
          "font_weight_medium": "string",
          "font_weight_bold": "string",
          "urls": [
            {
              "type": "WOFF2",
              "url": "string"
            }
          ]
        },
        "primary": "string",
        "secondary": "string"
      },
      "shape": {
        "border_radius": 0
      },
      "consumer": {
        "widgets": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "customer_portals": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      }
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}'
```

Using positional args for path parameters:

```bash
epilot design updateDesign 4a062990-a6a3-11eb-9828-4f3da7d4935a
```

Using stdin pipe:

```bash
cat body.json | epilot design updateDesign -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a
```

With JSONata filter:

```bash
epilot design updateDesign -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a --jsonata '$'
```

---

### `deleteDesign`

Search and delete for a especific design owned by user organization

`DELETE /v1/designs/{designId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |

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
epilot design deleteDesign \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a
```

Using positional args for path parameters:

```bash
epilot design deleteDesign 4a062990-a6a3-11eb-9828-4f3da7d4935a
```

With JSONata filter:

```bash
epilot design deleteDesign -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a --jsonata '$'
```

---

### `getThemeFromDesign`

Search for a especific design owned by user organization and parse them to a new or old theme

`GET /v1/designs/{designId}/parse`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |
| `orgId` | query | string | No | Organization id of the user |
| `theme` | query | "NEW" \| "OLD" | Yes | Type of theme to be parsed and returned |

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
epilot design getThemeFromDesign \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a \
  -p theme=NEW
```

Using positional args for path parameters:

```bash
epilot design getThemeFromDesign 4a062990-a6a3-11eb-9828-4f3da7d4935a
```

With JSONata filter:

```bash
epilot design getThemeFromDesign -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p theme=NEW --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `getFiles`

List all files for the user organization bucket

`GET /v1/designs/files`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | query | "LOGO" \| "FONT" | No | Type of files to be returned |

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
epilot design getFiles
```

With JSONata filter:

```bash
epilot design getFiles --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "name": "string",
    "display_name": "string",
    "file_type": "LOGO",
    "s3_object_key": "string",
    "url": "string"
  }
]
```

</details>

---

### `uploadFile`

Upload a new file for the user organization bucket

`POST /v1/designs/files`

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
epilot design uploadFile
```

With JSONata filter:

```bash
epilot design uploadFile --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "display_name": "string",
  "file_type": "LOGO",
  "s3_object_key": "string",
  "url": "string"
}
```

</details>

---

### `getConsumerDesign`

Search for a especific design owned by user organization

`GET /v1/designs/consumer/{application}/{consumerId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `consumerId` | path | string | Yes | Id of the design |
| `application` | path | string | Yes | Type of application that uses the design |

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
epilot design getConsumerDesign \
  -p consumerId=4a062990-a6a3-11eb-9828-4f3da7d4935a \
  -p application=journey
```

Using positional args for path parameters:

```bash
epilot design getConsumerDesign 4a062990-a6a3-11eb-9828-4f3da7d4935a journey
```

With JSONata filter:

```bash
epilot design getConsumerDesign -p consumerId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p application=journey --jsonata 'design'
```

<details>
<summary>Sample Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `addConsumer`

Add a consumer that uses a specific design

`PUT /v1/designs/addConsumer/{application}/{designId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |
| `application` | path | string | Yes | Type of application that uses the design |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot design addConsumer \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a \
  -p application=journey \
  -d '{"consumer_id":"string","consumer_name":"string","should_delete":"string"}'
```

Using positional args for path parameters:

```bash
epilot design addConsumer 4a062990-a6a3-11eb-9828-4f3da7d4935a journey
```

Using stdin pipe:

```bash
cat body.json | epilot design addConsumer -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p application=journey
```

With JSONata filter:

```bash
epilot design addConsumer -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p application=journey --jsonata '$'
```

---

### `removeConsumer`

Remove a consumer that uses a specific design

`PUT /v1/designs/removeConsumer/{application}/{designId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `designId` | path | string | Yes | Id of the design |
| `application` | path | string | Yes | Type of application that uses the design |

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot design removeConsumer \
  -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a \
  -p application=journey \
  -d '{"consumer_id":"string","consumer_name":"string","should_delete":"string"}'
```

Using positional args for path parameters:

```bash
epilot design removeConsumer 4a062990-a6a3-11eb-9828-4f3da7d4935a journey
```

Using stdin pipe:

```bash
cat body.json | epilot design removeConsumer -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p application=journey
```

With JSONata filter:

```bash
epilot design removeConsumer -p designId=4a062990-a6a3-11eb-9828-4f3da7d4935a -p application=journey --jsonata '$'
```

---

## Deprecated Operations

- ~~`getLimit`~~ GET `/v1/designs/limit`
- ~~`getBrands`~~ GET `/v1/brands`
