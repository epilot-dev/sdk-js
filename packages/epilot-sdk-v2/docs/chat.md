# epilot Chat API

- **Base URL:** `https://chat.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/chat](https://docs.epilot.io/api/chat)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.chat.listWebsiteChats(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/chat'

const chatClient = getClient()
authorize(chatClient, () => '<token>')
const { data } = await chatClient.listWebsiteChats(...)
```

## Operations

**Website Chats**
- [`listWebsiteChats`](#listwebsitechats)
- [`createWebsiteChat`](#createwebsitechat)
- [`getWebsiteChat`](#getwebsitechat)
- [`updateWebsiteChat`](#updatewebsitechat)
- [`deleteWebsiteChat`](#deletewebsitechat)

**Other**
- [`getPublicWebsiteChat`](#getpublicwebsitechat)
- [`createPublicChatGrant`](#createpublicchatgrant)
- [`createAnonymousChatSession`](#createanonymouschatsession)
- [`sendAnonymousChatMessage`](#sendanonymouschatmessage)
- [`getChatVerification`](#getchatverification)
- [`startChatEmailVerification`](#startchatemailverification)
- [`verifyChatEmailCode`](#verifychatemailcode)
- [`cancelChatVerification`](#cancelchatverification)

**Schemas**
- [`ListWebsiteChatsResponse`](#listwebsitechatsresponse)
- [`WebsiteChat`](#websitechat)
- [`WebsiteChatSettings`](#websitechatsettings)
- [`Error`](#error)
- [`CreateWebsiteChatRequest`](#createwebsitechatrequest)
- [`UpdateWebsiteChatRequest`](#updatewebsitechatrequest)
- [`VerificationState`](#verificationstate)
- [`PublicWebsiteChat`](#publicwebsitechat)
- [`WebsiteChatDesign`](#websitechatdesign)
- [`PublicEvent`](#publicevent)
- [`PublicChatError`](#publicchaterror)

### `listWebsiteChats`

`GET /v1/website-chats`

```ts
const { data } = await client.listWebsiteChats({
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createWebsiteChat(
  null,
  {
    name: 'string',
    agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    settings: {
      allowed_origins: ['string'],
      organisation_name: 'string',
      default_locale: 'en',
      design_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      authentication: {
        email_code: {
          email_template_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        }
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getWebsiteChat({
  website_chat_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateWebsiteChat(
  {
    website_chat_id: 'example',
  },
  {
    name: 'string',
    agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    settings: {
      allowed_origins: ['string'],
      organisation_name: 'string',
      default_locale: 'en',
      design_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      authentication: {
        email_code: {
          email_template_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        }
      }
    },
    version: 1
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteWebsiteChat({
  website_chat_id: 'example',
  version: 1,
})
```

---

### `getPublicWebsiteChat`

`GET /v1/website-chats/{website_chat_id}/configuration`

```ts
const { data } = await client.getPublicWebsiteChat({
  website_chat_id: 'example',
})
```

<details>
<summary>Response</summary>

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

`POST /v1/bootstrap`

```ts
const { data } = await client.createPublicChatGrant(
  null,
  {
    website_chat_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

`POST /v1/sessions`

```ts
const { data } = await client.createAnonymousChatSession(
  null,
  {
    grant: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

`POST /v1/messages`

```ts
const { data } = await client.sendAnonymousChatMessage(
  null,
  {
    request_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    message: 'string',
    locale: 'en',
    simple_language: true
  },
)
```

---

### `getChatVerification`

`GET /v1/verification`

```ts
const { data } = await client.getChatVerification()
```

<details>
<summary>Response</summary>

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

`POST /v1/verification/email`

```ts
const { data } = await client.startChatEmailVerification(
  null,
  {
    request_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    email: 'user@example.com',
    locale: 'en'
  },
)
```

<details>
<summary>Response</summary>

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

`POST /v1/verification/code`

```ts
const { data } = await client.verifyChatEmailCode(
  null,
  {
    challenge_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    code: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

`POST /v1/verification/cancel`

```ts
const { data } = await client.cancelChatVerification()
```

<details>
<summary>Response</summary>

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

## Schemas

### `ListWebsiteChatsResponse`

```ts
type ListWebsiteChatsResponse = {
  website_chats: Array<{
    name: string
    agent_id: string // uuid
    settings: {
      allowed_origins: { ... }
      organisation_name: { ... }
      default_locale: { ... }
      design_id?: { ... }
      authentication?: { ... }
    }
    website_chat_id: string // uuid
    org_id: string
    binding_id: string // uuid
    version: number
    created_at: string // date-time
    updated_at: string // date-time
    embed: {
      script_url: { ... }
      chat_api_origin: { ... }
      demo_url: { ... }
    }
  }>
  next_cursor?: string
}
```

### `WebsiteChat`

```ts
type WebsiteChat = {
  name: string
  agent_id: string // uuid
  settings: {
    allowed_origins: string[]
    organisation_name: string
    default_locale: "en" | "de"
    design_id?: string // uuid
    authentication?: {
      email_code: { ... }
    }
  }
  website_chat_id: string // uuid
  org_id: string
  binding_id: string // uuid
  version: number
  created_at: string // date-time
  updated_at: string // date-time
  embed: {
    script_url: string // uri
    chat_api_origin: string // uri
    demo_url: string // uri
  }
}
```

### `WebsiteChatSettings`

```ts
type WebsiteChatSettings = {
  allowed_origins: string[]
  organisation_name: string
  default_locale: "en" | "de"
  design_id?: string // uuid
  authentication?: {
    email_code: {
      email_template_id?: { ... }
    }
  }
}
```

### `Error`

```ts
type Error = {
  error?: string
  message?: string
  details?: object
}
```

### `CreateWebsiteChatRequest`

```ts
type CreateWebsiteChatRequest = {
  name: string
  agent_id: string // uuid
  settings: {
    allowed_origins: string[]
    organisation_name: string
    default_locale: "en" | "de"
    design_id?: string // uuid
    authentication?: {
      email_code: { ... }
    }
  }
}
```

### `UpdateWebsiteChatRequest`

```ts
type UpdateWebsiteChatRequest = {
  name?: string
  agent_id?: string // uuid
  settings?: {
    allowed_origins: string[]
    organisation_name: string
    default_locale: "en" | "de"
    design_id?: string // uuid
    authentication?: {
      email_code: { ... }
    }
  }
  version: number
}
```

### `VerificationState`

```ts
type VerificationState = {
  available: boolean
  conversation_id: string // uuid
  status: "anonymous" | "sending" | "pending" | "verified"
  challenge_id?: string // uuid
  code_expires_at?: number
  resend_after?: number
  email?: string // email
  contact_resolution?: "matched" | "ambiguous" | "not_found"
}
```

### `PublicWebsiteChat`

```ts
type PublicWebsiteChat = {
  key: string
  organisationName: string
  assistantName: string
  defaultLocale: "en" | "de"
  authentication?: {
    email_code: boolean
  }
  design?: {
    id: string // uuid
    last_modified_at?: string
    style?: {
      palette?: { ... }
      typography?: { ... }
      shape?: { ... }
    }
    spark_theme?: {
      accentColor?: { ... }
      backgroundColor?: { ... }
      fontBody?: { ... }
      fontHeading?: { ... }
      radius?: { ... }
      scaling?: { ... }
      spacing?: { ... }
      appearance?: { ... }
      neutralColor?: { ... }
      styleVariant?: { ... }
      labelPosition?: { ... }
      inputStyle?: { ... }
      inputColor?: { ... }
      cardVariant?: { ... }
      cardColor?: { ... }
      highContrast?: { ... }
    }
  }
  locales: "en" | "de"[]
}
```

### `WebsiteChatDesign`

```ts
type WebsiteChatDesign = {
  id: string // uuid
  last_modified_at?: string
  style?: {
    palette?: {
      primary?: { ... }
      background?: { ... }
    }
    typography?: {
      font?: { ... }
    }
    shape?: {
      border_radius?: { ... }
    }
  }
  spark_theme?: {
    accentColor?: string
    backgroundColor?: string
    fontBody?: string
    fontHeading?: string
    radius?: string
    scaling?: string
    spacing?: string
    appearance?: string
    neutralColor?: string
    styleVariant?: string
    labelPosition?: string
    inputStyle?: string
    inputColor?: string
    cardVariant?: string
    cardColor?: string
    highContrast?: boolean
  }
}
```

### `PublicEvent`

JSON payload of one SSE data frame from sendAnonymousChatMessage.

```ts
type PublicEvent = {
  type: "delta"
  text: string
  request_id: string // uuid
} | {
  type: "complete"
  text: string
  request_id: string // uuid
} | {
  type: "error"
  code: "UNAVAILABLE"
  request_id: string // uuid
}
```

### `PublicChatError`

```ts
type PublicChatError = {
  code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE"
}
```
