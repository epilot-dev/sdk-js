# epilot Chat API

- **Base URL:** `https://chat.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/chat](https://docs.epilot.io/api/chat)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.chat.listChatWidgets(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/chat'

const chatClient = getClient()
authorize(chatClient, () => '<token>')
const { data } = await chatClient.listChatWidgets(...)
```

## Operations

**Chat widgets**
- [`listChatWidgets`](#listchatwidgets)
- [`createChatWidget`](#createchatwidget)
- [`getChatWidget`](#getchatwidget)
- [`updateChatWidget`](#updatechatwidget)
- [`deleteChatWidget`](#deletechatwidget)

**Other**
- [`getPublicChatWidget`](#getpublicchatwidget)
- [`createPublicChatGrant`](#createpublicchatgrant)
- [`createAnonymousChatSession`](#createanonymouschatsession)
- [`sendAnonymousChatMessage`](#sendanonymouschatmessage)

**Schemas**
- [`ListChatWidgetsResponse`](#listchatwidgetsresponse)
- [`ChatWidget`](#chatwidget)
- [`WebsiteChatSettings`](#websitechatsettings)
- [`Error`](#error)
- [`CreateChatWidgetRequest`](#createchatwidgetrequest)
- [`UpdateChatWidgetRequest`](#updatechatwidgetrequest)
- [`Widget`](#widget)
- [`WidgetDesign`](#widgetdesign)
- [`PublicEvent`](#publicevent)
- [`PublicChatError`](#publicchaterror)

### `listChatWidgets`

`GET /v1/widgets`

```ts
const { data } = await client.listChatWidgets({
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createChatWidget(
  null,
  {
    name: 'string',
    agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    website_chat: {
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

```ts
const { data } = await client.getChatWidget({
  widget_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateChatWidget(
  {
    widget_id: 'example',
  },
  {
    name: 'string',
    agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    website_chat: {
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

```ts
const { data } = await client.deleteChatWidget({
  widget_id: 'example',
  version: 1,
})
```

---

### `getPublicChatWidget`

`GET /v1/widgets/{widget_id}/configuration`

```ts
const { data } = await client.getPublicChatWidget({
  widget_id: 'example',
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
    widget_key: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `ListChatWidgetsResponse`

```ts
type ListChatWidgetsResponse = {
  widgets: Array<{
    name: string
    agent_id: string // uuid
    website_chat: {
      allowed_origins: { ... }
      organisation_name: { ... }
      default_locale: { ... }
      design_id?: { ... }
      authentication?: { ... }
    }
    widget_id: string // uuid
    org_id: string
    binding_id: string // uuid
    version: number
    created_at: string // date-time
    updated_at: string // date-time
    website_chat_embed: {
      script_url: { ... }
      chat_api_origin: { ... }
      demo_url: { ... }
    }
  }>
  next_cursor?: string
}
```

### `ChatWidget`

```ts
type ChatWidget = {
  name: string
  agent_id: string // uuid
  website_chat: {
    allowed_origins: string[]
    organisation_name: string
    default_locale: "en" | "de"
    design_id?: string // uuid
    authentication?: {
      email_code: { ... }
    }
  }
  widget_id: string // uuid
  org_id: string
  binding_id: string // uuid
  version: number
  created_at: string // date-time
  updated_at: string // date-time
  website_chat_embed: {
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

### `CreateChatWidgetRequest`

```ts
type CreateChatWidgetRequest = {
  name: string
  agent_id: string // uuid
  website_chat: {
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

### `UpdateChatWidgetRequest`

```ts
type UpdateChatWidgetRequest = {
  name?: string
  agent_id?: string // uuid
  website_chat?: {
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

### `Widget`

```ts
type Widget = {
  key: string
  organisationName: string
  assistantName: string
  defaultLocale: "en" | "de"
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

### `WidgetDesign`

```ts
type WidgetDesign = {
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
  code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE"
}
```
