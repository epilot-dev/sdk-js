# epilot Chat API

- **Base URL:** `https://chat.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/chat](https://docs.epilot.io/api/chat)

Website Chat management and anonymous browser chat.

## Quick Start

```bash
# List available operations
epilot chat

# Call an operation
epilot chat listWebsiteChats
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

**Website Chats**
- [`listWebsiteChats`](#listwebsitechats) — GET /v1/website-chats
- [`createWebsiteChat`](#createwebsitechat) — POST /v1/website-chats
- [`getWebsiteChat`](#getwebsitechat) — GET /v1/website-chats/{website_chat_id}
- [`updateWebsiteChat`](#updatewebsitechat) — PUT /v1/website-chats/{website_chat_id}
- [`deleteWebsiteChat`](#deletewebsitechat) — DELETE /v1/website-chats/{website_chat_id}

**Other**
- [`getPublicWebsiteChat`](#getpublicwebsitechat) — Resolve visitor-facing configuration for an independent Website Chat and its current agent assignment. The Website Chat 
- [`createPublicChatGrant`](#createpublicchatgrant) — Called by the host website with its website_chat_id. Checks the saved website origin allowlist and issues a single-use g
- [`createAnonymousChatSession`](#createanonymouschatsession) — Exchanges an unexpired grant once for an independent 30-minute session. Expired or previously used grants return 401 INV
- [`sendAnonymousChatMessage`](#sendanonymouschatmessage) — Creates a turn or replays its persisted result. Reuse request_id and the exact
- [`getChatVerification`](#getchatverification) — Read this session's verification state. No contact IDs or candidate records are exposed.
- [`startChatEmailVerification`](#startchatemailverification) — Start or resend an email challenge using the template saved on this session's Website Chat. Repeating the same request_i
- [`verifyChatEmailCode`](#verifychatemailcode) — Verify a code for this session's current challenge. Success binds email proof and contact resolution to this session and
- [`cancelChatVerification`](#cancelchatverification) — Cancel a pending challenge or clear verified identity. Clearing verified identity starts a new anonymous conversation. I

### `listWebsiteChats`

`GET /v1/website-chats`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No |  |

**Sample Call**

```bash
epilot chat listWebsiteChats
```

With JSONata filter:

```bash
epilot chat listWebsiteChats --jsonata 'website_chats'
```

<details>
<summary>Sample Response</summary>

```json
{
  "website_chats": [
    {
      "name": "string",
      "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "settings": {
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
      "website_chat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "version": 1,
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "embed": {
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

### `createWebsiteChat`

`POST /v1/website-chats`

**Request Body** (required)

**Sample Call**

```bash
epilot chat createWebsiteChat
```

With request body:

```bash
epilot chat createWebsiteChat \
  -d '{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "settings": {
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
cat body.json | epilot chat createWebsiteChat
```

With JSONata filter:

```bash
epilot chat createWebsiteChat --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "settings": {
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
  "website_chat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `getWebsiteChat`

`GET /v1/website-chats/{website_chat_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `website_chat_id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot chat getWebsiteChat \
  -p website_chat_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot chat getWebsiteChat 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat getWebsiteChat -p website_chat_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "settings": {
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
  "website_chat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `updateWebsiteChat`

`PUT /v1/website-chats/{website_chat_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `website_chat_id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot chat updateWebsiteChat \
  -p website_chat_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot chat updateWebsiteChat \
  -p website_chat_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "settings": {
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
epilot chat updateWebsiteChat 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot chat updateWebsiteChat -p website_chat_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat updateWebsiteChat -p website_chat_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "name": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "settings": {
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
  "website_chat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "binding_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "embed": {
    "script_url": "https://example.com/path",
    "chat_api_origin": "https://example.com/path",
    "demo_url": "https://example.com/path"
  }
}
```

</details>

---

### `deleteWebsiteChat`

`DELETE /v1/website-chats/{website_chat_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `website_chat_id` | path | string (uuid) | Yes |  |
| `version` | query | number | Yes |  |

**Sample Call**

```bash
epilot chat deleteWebsiteChat \
  -p website_chat_id=123e4567-e89b-12d3-a456-426614174000 \
  -p version=1
```

Using positional args for path parameters:

```bash
epilot chat deleteWebsiteChat 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot chat deleteWebsiteChat -p website_chat_id=123e4567-e89b-12d3-a456-426614174000 -p version=1 --jsonata '$'
```

---

### `getPublicWebsiteChat`

Resolve visitor-facing configuration for an independent Website Chat and its current agent assignment. The Website Chat 

`GET /v1/website-chats/{website_chat_id}/configuration`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `website_chat_id` | path | string | Yes | Public Website Chat ID, also used as website_chat_id in bootstrap and data-epilot-chat in the embed. |

**Sample Call**

```bash
epilot chat getPublicWebsiteChat \
  -p website_chat_id=550e8400-e29b-41d4-a716-446655440000
```

Using positional args for path parameters:

```bash
epilot chat getPublicWebsiteChat 550e8400-e29b-41d4-a716-446655440000
```

With JSONata filter:

```bash
epilot chat getPublicWebsiteChat -p website_chat_id=550e8400-e29b-41d4-a716-446655440000 --jsonata 'key'
```

<details>
<summary>Sample Response</summary>

```json
{
  "key": "string",
  "organisationName": "string",
  "assistantName": "string",
  "defaultLocale": "en",
  "authentication": {
    "email_code": true
  },
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

Called by the host website with its website_chat_id. Checks the saved website origin allowlist and issues a single-use g

`POST /v1/bootstrap`

**Request Body** (required)

**Sample Call**

```bash
epilot chat createPublicChatGrant \
  -d '{"website_chat_id":"string"}'
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
  "frame_origin": "https://example.com/path"
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
  "website_chat": {
    "key": "string",
    "organisationName": "string",
    "assistantName": "string",
    "defaultLocale": "en",
    "authentication": {
      "email_code": true
    },
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

### `getChatVerification`

Read this session's verification state. No contact IDs or candidate records are exposed.

`GET /v1/verification`

**Sample Call**

```bash
epilot chat getChatVerification
```

With JSONata filter:

```bash
epilot chat getChatVerification --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available": true,
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "anonymous",
  "challenge_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code_expires_at": 0,
  "resend_after": 0,
  "email": "user@example.com",
  "contact_resolution": "matched"
}
```

</details>

---

### `startChatEmailVerification`

Start or resend an email challenge using the template saved on this session's Website Chat. Repeating the same request_i

`POST /v1/verification/email`

**Request Body** (required)

**Sample Call**

```bash
epilot chat startChatEmailVerification \
  -d '{"request_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","email":"user@example.com","locale":"en"}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat startChatEmailVerification
```

With JSONata filter:

```bash
epilot chat startChatEmailVerification --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available": true,
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "anonymous",
  "challenge_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code_expires_at": 0,
  "resend_after": 0,
  "email": "user@example.com",
  "contact_resolution": "matched"
}
```

</details>

---

### `verifyChatEmailCode`

Verify a code for this session's current challenge. Success binds email proof and contact resolution to this session and

`POST /v1/verification/code`

**Request Body** (required)

**Sample Call**

```bash
epilot chat verifyChatEmailCode \
  -d '{"challenge_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","code":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot chat verifyChatEmailCode
```

With JSONata filter:

```bash
epilot chat verifyChatEmailCode --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available": true,
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "anonymous",
  "challenge_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code_expires_at": 0,
  "resend_after": 0,
  "email": "user@example.com",
  "contact_resolution": "matched"
}
```

</details>

---

### `cancelChatVerification`

Cancel a pending challenge or clear verified identity. Clearing verified identity starts a new anonymous conversation. I

`POST /v1/verification/cancel`

**Sample Call**

```bash
epilot chat cancelChatVerification
```

With JSONata filter:

```bash
epilot chat cancelChatVerification --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available": true,
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "anonymous",
  "challenge_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code_expires_at": 0,
  "resend_after": 0,
  "email": "user@example.com",
  "contact_resolution": "matched"
}
```

</details>

---
