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
- [`getChatPortalLogin`](#getchatportallogin)
- [`startChatPortalLogin`](#startchatportallogin)
- [`verifyChatPortalLogin`](#verifychatportallogin)
- [`cancelChatPortalLogin`](#cancelchatportallogin)
- [`signOutChatCustomer`](#signoutchatcustomer)
- [`getChatAction`](#getchataction)
- [`startChatAction`](#startchataction)
- [`submitChatAction`](#submitchataction)
- [`confirmChatAction`](#confirmchataction)
- [`cancelChatAction`](#cancelchataction)

**Schemas**
- [`ListWebsiteChatsResponse`](#listwebsitechatsresponse)
- [`WebsiteChat`](#websitechat)
- [`WebsiteChatSettings`](#websitechatsettings)
- [`SelfServiceSettings`](#selfservicesettings)
- [`SelfServiceAction`](#selfserviceaction)
- [`Error`](#error)
- [`CreateWebsiteChatRequest`](#createwebsitechatrequest)
- [`UpdateWebsiteChatRequest`](#updatewebsitechatrequest)
- [`ActionRevision`](#actionrevision)
- [`ActionState`](#actionstate)
- [`VerificationState`](#verificationstate)
- [`PortalLoginState`](#portalloginstate)
- [`LoginMethod`](#loginmethod)
- [`AccessTier`](#accesstier)
- [`CustomerAccess`](#customeraccess)
- [`PublicWebsiteChat`](#publicwebsitechat)
- [`WebsiteChatDesign`](#websitechatdesign)
- [`PublicEvent`](#publicevent)
- [`SelfServiceDirective`](#selfservicedirective)
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
          },
          "portal": {
            "portal_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
        },
        "self_service": {
          "actions": [
            {
              "action": "submit_meter_reading",
              "enabled": true,
              "fulfilment": "in_chat",
              "journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "url": "string",
              "access": "anonymous",
              "guidance": "string"
            }
          ]
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
        },
        portal: {
          portal_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        }
      },
      self_service: {
        actions: [
          {
            action: 'submit_meter_reading',
            enabled: true,
            fulfilment: 'in_chat',
            journey_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            url: 'string',
            access: 'anonymous',
            guidance: 'string'
          }
        ]
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
      },
      "portal": {
        "portal_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    },
    "self_service": {
      "actions": [
        {
          "action": "submit_meter_reading",
          "enabled": true,
          "fulfilment": "in_chat",
          "journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "url": "string",
          "access": "anonymous",
          "guidance": "string"
        }
      ]
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
      },
      "portal": {
        "portal_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    },
    "self_service": {
      "actions": [
        {
          "action": "submit_meter_reading",
          "enabled": true,
          "fulfilment": "in_chat",
          "journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "url": "string",
          "access": "anonymous",
          "guidance": "string"
        }
      ]
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
        },
        portal: {
          portal_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        }
      },
      self_service: {
        actions: [
          {
            action: 'submit_meter_reading',
            enabled: true,
            fulfilment: 'in_chat',
            journey_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            url: 'string',
            access: 'anonymous',
            guidance: 'string'
          }
        ]
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
      },
      "portal": {
        "portal_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    },
    "self_service": {
      "actions": [
        {
          "action": "submit_meter_reading",
          "enabled": true,
          "fulfilment": "in_chat",
          "journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "url": "string",
          "access": "anonymous",
          "guidance": "string"
        }
      ]
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
  "login_methods": ["email_code"],
  "actions": {
    "meter_reading": true,
    "meter_reading_journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
    "login_methods": ["email_code"],
    "actions": {
      "meter_reading": true,
      "meter_reading_journey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
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
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
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
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
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
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `getChatPortalLogin`

`GET /v1/login/portal`

```ts
const { data } = await client.getChatPortalLogin()
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
  "attempts_left": 0,
  "email": "user@example.com",
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `startChatPortalLogin`

`POST /v1/login/portal/start`

```ts
const { data } = await client.startChatPortalLogin(
  null,
  {
    request_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    email: 'user@example.com'
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
  "attempts_left": 0,
  "email": "user@example.com",
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `verifyChatPortalLogin`

`POST /v1/login/portal/verify`

```ts
const { data } = await client.verifyChatPortalLogin(
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
  "attempts_left": 0,
  "email": "user@example.com",
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `cancelChatPortalLogin`

`POST /v1/login/portal/cancel`

```ts
const { data } = await client.cancelChatPortalLogin()
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
  "attempts_left": 0,
  "email": "user@example.com",
  "contact_resolution": "matched",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `signOutChatCustomer`

`POST /v1/login/sign-out`

```ts
const { data } = await client.signOutChatCustomer()
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "access": {
    "tier": "anonymous",
    "method": "email_code"
  }
}
```

</details>

---

### `getChatAction`

`GET /v1/actions`

```ts
const { data } = await client.getChatAction()
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "none",
  "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "revision": 0,
  "options": [
    {
      "meter_id": "string",
      "counter_id": "string",
      "meter_number": "string",
      "label": "string",
      "unit": "string",
      "min_value": 0,
      "max_value": 0
    }
  ],
  "values": {
    "meter_id": "string",
    "counter_id": "string",
    "value": 0
  },
  "field_error": "VALUE_INVALID",
  "receipt": {
    "reference": "string",
    "meter_number": "string",
    "value": 0,
    "unit": "string",
    "submitted_at": "string"
  },
  "reason": "NO_METERS"
}
```

</details>

---

### `startChatAction`

`POST /v1/actions`

```ts
const { data } = await client.startChatAction(
  null,
  {
    request_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    action_type: 'submit_meter_reading'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "none",
  "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "revision": 0,
  "options": [
    {
      "meter_id": "string",
      "counter_id": "string",
      "meter_number": "string",
      "label": "string",
      "unit": "string",
      "min_value": 0,
      "max_value": 0
    }
  ],
  "values": {
    "meter_id": "string",
    "counter_id": "string",
    "value": 0
  },
  "field_error": "VALUE_INVALID",
  "receipt": {
    "reference": "string",
    "meter_number": "string",
    "value": 0,
    "unit": "string",
    "submitted_at": "string"
  },
  "reason": "NO_METERS"
}
```

</details>

---

### `submitChatAction`

`POST /v1/actions/{action_id}/submit`

```ts
const { data } = await client.submitChatAction(
  {
    action_id: 'example',
  },
  {
    expected_revision: 1,
    meter_id: 'string',
    counter_id: 'string',
    value: 0
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "none",
  "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "revision": 0,
  "options": [
    {
      "meter_id": "string",
      "counter_id": "string",
      "meter_number": "string",
      "label": "string",
      "unit": "string",
      "min_value": 0,
      "max_value": 0
    }
  ],
  "values": {
    "meter_id": "string",
    "counter_id": "string",
    "value": 0
  },
  "field_error": "VALUE_INVALID",
  "receipt": {
    "reference": "string",
    "meter_number": "string",
    "value": 0,
    "unit": "string",
    "submitted_at": "string"
  },
  "reason": "NO_METERS"
}
```

</details>

---

### `confirmChatAction`

`POST /v1/actions/{action_id}/confirm`

```ts
const { data } = await client.confirmChatAction(
  {
    action_id: 'example',
  },
  {
    expected_revision: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "none",
  "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "revision": 0,
  "options": [
    {
      "meter_id": "string",
      "counter_id": "string",
      "meter_number": "string",
      "label": "string",
      "unit": "string",
      "min_value": 0,
      "max_value": 0
    }
  ],
  "values": {
    "meter_id": "string",
    "counter_id": "string",
    "value": 0
  },
  "field_error": "VALUE_INVALID",
  "receipt": {
    "reference": "string",
    "meter_number": "string",
    "value": 0,
    "unit": "string",
    "submitted_at": "string"
  },
  "reason": "NO_METERS"
}
```

</details>

---

### `cancelChatAction`

`POST /v1/actions/{action_id}/cancel`

```ts
const { data } = await client.cancelChatAction(
  {
    action_id: 'example',
  },
  {
    expected_revision: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "none",
  "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "revision": 0,
  "options": [
    {
      "meter_id": "string",
      "counter_id": "string",
      "meter_number": "string",
      "label": "string",
      "unit": "string",
      "min_value": 0,
      "max_value": 0
    }
  ],
  "values": {
    "meter_id": "string",
    "counter_id": "string",
    "value": 0
  },
  "field_error": "VALUE_INVALID",
  "receipt": {
    "reference": "string",
    "meter_number": "string",
    "value": 0,
    "unit": "string",
    "submitted_at": "string"
  },
  "reason": "NO_METERS"
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
      self_service?: { ... }
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
      email_code?: { ... }
      portal?: { ... }
    }
    self_service?: {
      actions: { ... }
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
    email_code?: {
      email_template_id?: { ... }
    }
    portal?: {
      portal_id: { ... }
    }
  }
  self_service?: {
    actions: Array<{
      action: { ... }
      enabled: { ... }
      fulfilment: { ... }
      journey_id?: { ... }
      url?: { ... }
      access: { ... }
      guidance?: { ... }
    }>
  }
}
```

### `SelfServiceSettings`

Self-service actions customers can start in this Website Chat. On update, the list is replaced as a whole; null removes all actions.

```ts
type SelfServiceSettings = {
  actions: Array<{
    action: "submit_meter_reading" | "change_installment_rate" | "update_payment_method" | "change_billing_address" | "update_customer_details" | "change_tariff" | "report_move" | "terminate_contract"
    enabled: boolean
    fulfilment: "in_chat" | "journey" | "link"
    journey_id?: string // uuid
    url?: string
    access: "anonymous" | "identified" | "verified"
    guidance?: string
  }>
}
```

### `SelfServiceAction`

How a self-service action is done and who can start it. A journey needs journey_id, a link needs url. in_chat is only available for submit_meter_reading and requires a verified customer.

```ts
type SelfServiceAction = {
  action: "submit_meter_reading" | "change_installment_rate" | "update_payment_method" | "change_billing_address" | "update_customer_details" | "change_tariff" | "report_move" | "terminate_contract"
  enabled: boolean
  fulfilment: "in_chat" | "journey" | "link"
  journey_id?: string // uuid
  url?: string
  access: "anonymous" | "identified" | "verified"
  guidance?: string
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
      email_code?: { ... }
      portal?: { ... }
    }
    self_service?: {
      actions: { ... }
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
      email_code?: { ... }
      portal?: { ... }
    }
    self_service?: {
      actions: { ... }
    }
  }
  version: number
}
```

### `ActionRevision`

```ts
type ActionRevision = {
  expected_revision: number
}
```

### `ActionState`

```ts
type ActionState = {
  conversation_id: string // uuid
  status: "none" | "needs_input" | "needs_confirmation" | "executing" | "completed" | "pending" | "rejected" | "handoff"
  action_id?: string // uuid
  revision?: number
  options?: Array<{
    meter_id: string
    counter_id: string
    meter_number: string
    label: string
    unit: string
    min_value?: number
    max_value?: number
  }>
  values?: {
    meter_id: string
    counter_id: string
    value: number
  }
  field_error?: "VALUE_INVALID" | "VALUE_OUT_OF_RANGE" | "TARGET_UNAVAILABLE"
  receipt?: {
    reference: string
    meter_number: string
    value: number
    unit: string
    submitted_at: string
  }
  reason?: "NO_METERS" | "SUBMISSION_REJECTED" | "SUBMISSION_UNCERTAIN"
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
  access: {
    tier: "anonymous" | "identified" | "verified"
    method?: "email_code" | "portal_login"
  }
}
```

### `PortalLoginState`

```ts
type PortalLoginState = {
  available: boolean
  conversation_id: string // uuid
  status: "anonymous" | "pending" | "verified"
  challenge_id?: string // uuid
  code_expires_at?: number
  attempts_left?: number
  email?: string // email
  contact_resolution?: "matched" | "not_found"
  access: {
    tier: "anonymous" | "identified" | "verified"
    method?: "email_code" | "portal_login"
  }
}
```

### `LoginMethod`

How a customer can log in or verify themselves in the chat.

```ts
type LoginMethod = "email_code" | "portal_login"
```

### `AccessTier`

anonymous: no customer identity. identified: the Contact is known but ownership
is not proven. verified: ownership is proven (an email code or a portal login).


```ts
type AccessTier = "anonymous" | "identified" | "verified"
```

### `CustomerAccess`

```ts
type CustomerAccess = {
  tier: "anonymous" | "identified" | "verified"
  method?: "email_code" | "portal_login"
}
```

### `PublicWebsiteChat`

```ts
type PublicWebsiteChat = {
  key: string
  organisationName: string
  assistantName: string
  defaultLocale: "en" | "de"
  login_methods: "email_code" | "portal_login"[]
  actions?: {
    meter_reading?: boolean
    meter_reading_journey_id?: string // uuid
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
} | {
  type: "action"
  action: {
    action: string
    fulfilment: "in_chat" | "journey" | "link"
    journey_id?: string // uuid
    url?: string
    access: "anonymous" | "identified" | "verified"
  }
  request_id: string // uuid
}
```

### `SelfServiceDirective`

```ts
type SelfServiceDirective = {
  action: string
  fulfilment: "in_chat" | "journey" | "link"
  journey_id?: string // uuid
  url?: string
  access: "anonymous" | "identified" | "verified"
}
```

### `PublicChatError`

```ts
type PublicChatError = {
  code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE" | "IDENTITY_REQUIRED" | "ACTION_UNAVAILABLE" | "ACTION_CONFLICT" | "ACTION_TARGET_DENIED" | "INVALID_LOGIN_CODE" | "LOGIN_EXPIRED" | "LOGIN_DISABLED" | "LOGIN_UNAVAILABLE" | "LOGIN_CONFLICT" | "LOGIN_REJECTED"
  attempts_left?: number
}
```
