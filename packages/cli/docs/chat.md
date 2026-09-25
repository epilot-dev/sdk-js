# epilot Chat API

- **Base URL:** `https://chat.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/chat](https://docs.epilot.io/api/chat)

Widget management and anonymous browser chat.

## Quick Start

```bash
# List available operations
epilot chat

# Call an operation
epilot chat listChatWidgets
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

**Chat widgets**
- [`listChatWidgets`](#listchatwidgets) — GET /v1/widgets
- [`createChatWidget`](#createchatwidget) — POST /v1/widgets
- [`getChatWidget`](#getchatwidget) — GET /v1/widgets/{widget_id}
- [`updateChatWidget`](#updatechatwidget) — PUT /v1/widgets/{widget_id}
- [`deleteChatWidget`](#deletechatwidget) — DELETE /v1/widgets/{widget_id}

**Other**
- [`getPublicChatWidget`](#getpublicchatwidget) — Resolve visitor-facing configuration for an independent widget and its current agent assignment. The widget ID is not an
- [`createPublicChatGrant`](#createpublicchatgrant) — Called by the host website with its widget_key. Checks the saved website origin allowlist and issues a single-use grant 
- [`createAnonymousChatSession`](#createanonymouschatsession) — Exchanges an unexpired grant once for an independent 30-minute session. Expired or previously used grants return 401 INV
- [`sendAnonymousChatMessage`](#sendanonymouschatmessage) — Creates a turn or replays its persisted result. Reuse request_id and the exact

### `listChatWidgets`

`GET /v1/widgets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No |  |

**Sample Call**

```bash
epilot chat listChatWidgets
```

With JSONata filter:

```bash
epilot chat listChatWidgets --jsonata 'widgets'
```

<details>
<summary>Sample Response</summary>

```json
{
  "widgets": [
    {
      "name": "string",
      "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "website_chat": {
        "allowed_origins": ["string"],
        "organisation_name": "string",
        "default_locale": "en",
        "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "authentication": {
          "email_code": {
            "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
        }
      },
      "widget_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "version": 1,
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "website_chat_embed": {
        "script_url": "https://example.com/path",
        "chat_api_origin": "https://example.com/path",
        "demo_url": "https://example.com/path"
      }
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createChatWidget`

`POST /v1/widgets`

**Request Body** (required)

**Sample Call**

```bash
epilot chat createChatWidget
```

With request body:

```bash
epilot chat createChatWidget \
  -d '{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "website_chat": {
    "allowed_origins": ["string"],
    "organisation_name": "string",
    "default_locale": "en",
    "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authentication": {
      "email_code": {
        "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat createChatWidget
```

With JSONata filter:

```bash
epilot chat createChatWidget --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "website_chat": {
    "allowed_origins": ["string"],
    "organisation_name": "string",
    "default_locale": "en",
    "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authentication": {
      "email_code": {
        "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  },
  "widget_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "website_chat_embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `getChatWidget`

`GET /v1/widgets/{widget_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `widget_id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot chat getChatWidget \
  -p widget_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot chat getChatWidget 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat getChatWidget -p widget_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "website_chat": {
    "allowed_origins": ["string"],
    "organisation_name": "string",
    "default_locale": "en",
    "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authentication": {
      "email_code": {
        "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  },
  "widget_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "website_chat_embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `updateChatWidget`

`PUT /v1/widgets/{widget_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `widget_id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot chat updateChatWidget \
  -p widget_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot chat updateChatWidget \
  -p widget_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "website_chat": {
    "allowed_origins": ["string"],
    "organisation_name": "string",
    "default_locale": "en",
    "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authentication": {
      "email_code": {
        "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  },
  "version": 1
}'
```

Using positional args for path parameters:

```bash
epilot chat updateChatWidget 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot chat updateChatWidget -p widget_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat updateChatWidget -p widget_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "website_chat": {
    "allowed_origins": ["string"],
    "organisation_name": "string",
    "default_locale": "en",
    "design_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authentication": {
      "email_code": {
        "email_template_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    }
  },
  "widget_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "website_chat_embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `deleteChatWidget`

`DELETE /v1/widgets/{widget_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `widget_id` | path | string (uuid) | Yes |  |
| `version` | query | number | Yes |  |

**Sample Call**

```bash
epilot chat deleteChatWidget \
  -p widget_id=123e4567-e89b-12d3-a456-426614174000 \
  -p version=1
```

Using positional args for path parameters:

```bash
epilot chat deleteChatWidget 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat deleteChatWidget -p widget_id=123e4567-e89b-12d3-a456-426614174000 -p version=1 --jsonata '$'
```

---

### `getPublicChatWidget`

Resolve visitor-facing configuration for an independent widget and its current agent assignment. The widget ID is not an

`GET /v1/widgets/{widget_id}/configuration`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `widget_id` | path | string | Yes | Public widget ID, also used as widget_key in bootstrap and data-epilot-chat in the embed. |

**Sample Call**

```bash
epilot chat getPublicChatWidget \
  -p widget_id=550e8400-e29b-41d4-a716-446655440000
```

Using positional args for path parameters:

```bash
epilot chat getPublicChatWidget 550e8400-e29b-41d4-a716-446655440000
```

With JSONata filter:

```bash
epilot chat getPublicChatWidget -p widget_id=550e8400-e29b-41d4-a716-446655440000 --jsonata 'key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "key": "string",
  "organisationName": "string",
  "assistantName": "string",
  "defaultLocale": "en",
  "design": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "last_modified_at": "string",
    "style": {
      "palette": {
        "primary": "string",
        "background": "string"
      },
      "typography": {
        "font": {
          "font_family": "string"
        }
      },
      "shape": {
        "border_radius": 0
      }
    },
    "spark_theme": {
      "accentColor": "string",
      "backgroundColor": "string",
      "fontBody": "string",
      "fontHeading": "string",
      "radius": "string",
      "scaling": "string",
      "spacing": "string",
      "appearance": "string",
      "neutralColor": "string",
      "styleVariant": "string",
      "labelPosition": "string",
      "inputStyle": "string",
      "inputColor": "string",
      "cardVariant": "string",
      "cardColor": "string",
      "highContrast": true
    }
  },
  "locales": ["en"]
}
```

</details>

---

### `createPublicChatGrant`

Called by the host website with its widget_key. Checks the saved website origin allowlist and issues a single-use grant 

`POST /v1/bootstrap`

**Request Body** (required)

**Sample Call**

```bash
epilot chat createPublicChatGrant \
  -d '{"widget_key":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat createPublicChatGrant
```

With JSONata filter:

```bash
epilot chat createPublicChatGrant --jsonata 'grant'
```

<details>
<summary>Sample Response</summary>

```json
{
  "grant": "string",
  "expires_in": 60,
  "widget_origin": "https://example.com/path"
}
```

</details>

---

### `createAnonymousChatSession`

Exchanges an unexpired grant once for an independent 30-minute session. Expired or previously used grants return 401 INV

`POST /v1/sessions`

**Request Body** (required)

**Sample Call**

```bash
epilot chat createAnonymousChatSession \
  -d '{"grant":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat createAnonymousChatSession
```

With JSONata filter:

```bash
epilot chat createAnonymousChatSession --jsonata 'token'
```

<details>
<summary>Sample Response</summary>

```json
{
  "token": "string",
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expires_at": 0,
  "widget": {
    "key": "string",
    "organisationName": "string",
    "assistantName": "string",
    "defaultLocale": "en",
    "design": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "last_modified_at": "string",
      "style": {
        "palette": {
          "primary": "string",
          "background": "string"
        },
        "typography": {
          "font": {
            "font_family": "string"
          }
        },
        "shape": {
          "border_radius": 0
        }
      },
      "spark_theme": {
        "accentColor": "string",
        "backgroundColor": "string",
        "fontBody": "string",
        "fontHeading": "string",
        "radius": "string",
        "scaling": "string",
        "spacing": "string",
        "appearance": "string",
        "neutralColor": "string",
        "styleVariant": "string",
        "labelPosition": "string",
        "inputStyle": "string",
        "inputColor": "string",
        "cardVariant": "string",
        "cardColor": "string",
        "highContrast": true
      }
    },
    "locales": ["en"]
  }
}
```

</details>

---

### `sendAnonymousChatMessage`

Creates a turn or replays its persisted result. Reuse request_id and the exact

`POST /v1/messages`

**Request Body** (required)

**Sample Call**

```bash
epilot chat sendAnonymousChatMessage \
  -d '{"request_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","message":"string","locale":"en","simple_language":true}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat sendAnonymousChatMessage
```

With JSONata filter:

```bash
epilot chat sendAnonymousChatMessage --jsonata '$'
```

---
