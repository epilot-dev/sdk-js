# Notification API

- **Base URL:** `https://notification.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/notification](https://docs.epilot.io/api/notification)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.notification.getNotificationsV2(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/notification'

const notificationClient = await getClient()
authorize(notificationClient, () => '<token>')
const { data } = await notificationClient.getNotificationsV2(...)
```

## Operations

**Notification**
- [`getNotificationsV2`](#getnotificationsv2)
- [`createNotification`](#createnotification)
- [`getNotifications`](#getnotifications)
- [`getNotification`](#getnotification)
- [`markAllAsRead`](#markallasread)
- [`markAsRead`](#markasread)
- [`getTotalUnread`](#gettotalunread)

**Template**
- [`listNotificationTemplates`](#listnotificationtemplates)
- [`createNotificationTemplate`](#createnotificationtemplate)
- [`getNotificationTemplate`](#getnotificationtemplate)
- [`updateNotificationTemplate`](#updatenotificationtemplate)
- [`patchNotificationTemplate`](#patchnotificationtemplate)
- [`deleteNotificationTemplate`](#deletenotificationtemplate)
- [`sendPreview`](#sendpreview)

**Schemas**
- [`Error`](#error)
- [`EntityOperation`](#entityoperation)
- [`NotificationItem`](#notificationitem)
- [`Notification`](#notification)
- [`NotificationBase`](#notificationbase)
- [`EntityId`](#entityid)
- [`Entity`](#entity)
- [`Id`](#id)
- [`NotificationId`](#notificationid)
- [`NotificationCallerContext`](#notificationcallercontext)
- [`EntitySlug`](#entityslug)
- [`EntityOwner`](#entityowner)
- [`EntityAcl`](#entityacl)
- [`NotificationTemplate`](#notificationtemplate)
- [`CreateNotificationTemplateInput`](#createnotificationtemplateinput)
- [`UpdateNotificationTemplateInput`](#updatenotificationtemplateinput)
- [`NotificationTemplateListResponse`](#notificationtemplatelistresponse)
- [`SendPreviewInput`](#sendpreviewinput)
- [`SendPreviewResponse`](#sendpreviewresponse)

### `getNotificationsV2`

Get notifications items. These items may eventually contain entities within their payload, which can be hydrated by the client if desired by calling the Entity API directly.

`GET /v2/notification/notifications`

```ts
const { data } = await client.getNotificationsV2({
  cursor: 'example',
  after_id: 1,
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "cursor": "eyJjcmVhd",
  "total": 1,
  "total_unread": 1,
  "results": [
    {
      "id": 123456789,
      "notification_id": 123456789,
      "timestamp": "1970-01-01T00:00:00.000Z",
      "read_state": false,
      "type": "workflow",
      "redirect_url": "https://epilot.cloud",
      "organization_id": "206801",
      "title": {
        "en": "My custom notification",
        "de": "Meine benutzerdefinierte Aktivität"
      },
      "message": {
        "en": "{{caller}} did something with {{contact.entity.id}} {{branch.name}}.",
        "de": "{{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}."
      },
      "payload": {
        "entity": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "schema": "contact"
        }
      },
      "caller": {
        "EpilotAuth": {
          "token": {
            "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
            "cognito:groups": ["Administrator"],
            "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
            "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
            "custom:ivy_org_id": "739224",
            "cognito:username": "n.ahmad@epilot.cloud",
            "custom:ivy_user_id": "10006129",
            "cognito:roles": ["arn:aws:iam::912468240823:role/base-administrator-role"],
            "aud": "6e0jbdnger7nmoktaaflarue1l",
            "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
            "token_use": "id",
            "auth_time": 1614333023,
            "exp": 1614336623,
            "iat": 1614333023,
            "email": "n.ahmad@epilot.cloud"
          }
        }
      },
      "operations": [
        {
          "entity": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "operation": "updateEntity",
          "params": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "slug": "contact"
          },
          "payload": {
            "_schema": "contact",
            "_org": "123",
            "status": "Inactive"
          }
        }
      ],
      "force_notify_users": {
        "12345": {
          "email": false,
          "in_app": false
        }
      }
    }
  ]
}
```

</details>

---

### `createNotification`

Create a message that can be displayed in the notification panel.

`POST /v1/notification/notifications`

```ts
const { data } = await client.createNotification(
  null,
  {
    notification_id: 0,
    timestamp: '1970-01-01T00:00:00.000Z',
    type: 'workflow',
    redirect_url: 'https://epilot.cloud',
    organization_id: '206801',
    title: {
      en: 'My custom notification',
      de: 'Meine benutzerdefinierte Aktivität'
    },
    message: {
      en: '{{caller}} did something with {{contact.entity.id}} {{branch.name}}.',
      de: '{{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}.'
    },
    payload: {
      entity: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        schema: 'contact'
      }
    },
    caller: {
      EpilotAuth: {
        token: {
          sub: '476e9b48-42f4-4234-a2b0-4668b34626ce',
          'cognito:groups': ['Administrator'],
          'cognito:preferred_role': 'arn:aws:iam::912468240823:role/base-administrator-role',
          iss: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D',
          'custom:ivy_org_id': '739224',
          'cognito:username': 'n.ahmad@epilot.cloud',
          'custom:ivy_user_id': '10006129',
          'cognito:roles': ['arn:aws:iam::912468240823:role/base-administrator-role'],
          aud: '6e0jbdnger7nmoktaaflarue1l',
          event_id: 'cd5f5583-d90c-4db5-8e99-5f5dd29a4d75',
          token_use: 'id',
          auth_time: 1614333023,
          exp: 1614336623,
          iat: 1614333023,
          email: 'n.ahmad@epilot.cloud'
        }
      }
    },
    operations: [
      {
        entity: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        operation: 'updateEntity',
        params: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          slug: 'contact'
        },
        payload: {
          _schema: 'contact',
          _org: '123',
          status: 'Inactive'
        }
      }
    ],
    force_notify_users: {
      '12345': {
        email: false,
        in_app: false
      }
    },
    read_state: false,
    visibility_user_ids: ['1', '2', '3', '4', '5']
  },
)
```

---

### `getNotifications`

Get notifications

`GET /v1/notification/notifications`

```ts
const { data } = await client.getNotifications({
  after_id: 1,
  limit: 1,
  no_hydrate: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "total": 1,
  "total_unread": 1,
  "results": [
    {
      "id": 123456789,
      "notification_id": 123456789,
      "timestamp": "1970-01-01T00:00:00.000Z",
      "read_state": false,
      "type": "workflow",
      "redirect_url": "https://epilot.cloud",
      "organization_id": "206801",
      "title": {
        "en": "My custom notification",
        "de": "Meine benutzerdefinierte Aktivität"
      },
      "message": {
        "en": "{{caller}} did something with {{contact.entity.id}} {{branch.name}}.",
        "de": "{{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}."
      },
      "payload": {
        "entity": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "schema": "contact"
        }
      },
      "caller": {
        "EpilotAuth": {
          "token": {
            "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
            "cognito:groups": ["Administrator"],
            "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
            "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
            "custom:ivy_org_id": "739224",
            "cognito:username": "n.ahmad@epilot.cloud",
            "custom:ivy_user_id": "10006129",
            "cognito:roles": ["arn:aws:iam::912468240823:role/base-administrator-role"],
            "aud": "6e0jbdnger7nmoktaaflarue1l",
            "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
            "token_use": "id",
            "auth_time": 1614333023,
            "exp": 1614336623,
            "iat": 1614333023,
            "email": "n.ahmad@epilot.cloud"
          }
        }
      },
      "operations": [
        {
          "entity": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "operation": "updateEntity",
          "params": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "slug": "contact"
          },
          "payload": {
            "_schema": "contact",
            "_org": "123",
            "status": "Inactive"
          }
        }
      ],
      "force_notify_users": {
        "12345": {
          "email": false,
          "in_app": false
        }
      }
    }
  ]
}
```

</details>

---

### `getNotification`

Get the details of a single notification.

`GET /v1/notification/notifications/{id}`

```ts
const { data } = await client.getNotification({
  id: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "id": 123456789,
  "notification_id": 123456789,
  "timestamp": "1970-01-01T00:00:00.000Z",
  "read_state": false,
  "type": "workflow",
  "redirect_url": "https://epilot.cloud",
  "organization_id": "206801",
  "title": {
    "en": "My custom notification",
    "de": "Meine benutzerdefinierte Aktivität"
  },
  "message": {
    "en": "{{caller}} did something with {{contact.entity.id}} {{branch.name}}.",
    "de": "{{caller}} habe etwas damit gemacht {{contact.entity.id}} {{branch.name}}."
  },
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  },
  "caller": {
    "EpilotAuth": {
      "token": {
        "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
        "cognito:groups": ["Administrator"],
        "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
        "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
        "custom:ivy_org_id": "739224",
        "cognito:username": "n.ahmad@epilot.cloud",
        "custom:ivy_user_id": "10006129",
        "cognito:roles": ["arn:aws:iam::912468240823:role/base-administrator-role"],
        "aud": "6e0jbdnger7nmoktaaflarue1l",
        "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
        "token_use": "id",
        "auth_time": 1614333023,
        "exp": 1614336623,
        "iat": 1614333023,
        "email": "n.ahmad@epilot.cloud"
      }
    }
  },
  "operations": [
    {
      "entity": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "operation": "updateEntity",
      "params": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "slug": "contact"
      },
      "payload": {
        "_schema": "contact",
        "_org": "123",
        "status": "Inactive"
      }
    }
  ],
  "force_notify_users": {
    "12345": {
      "email": false,
      "in_app": false
    }
  }
}
```

</details>

---

### `markAllAsRead`

Mark all as read

`PUT /v1/notification/notifications/mark`

```ts
const { data } = await client.markAllAsRead()
```

---

### `markAsRead`

Mark as read

`PUT /v1/notification/notifications/{id}/mark`

```ts
const { data } = await client.markAsRead({
  id: 1,
})
```

---

### `getTotalUnread`

Get total unread

`GET /v1/notification/unreads`

```ts
const { data } = await client.getTotalUnread()
```

---

### `listNotificationTemplates`

List notification templates with optional filtering and pagination

`GET /v1/notification/templates`

```ts
const { data } = await client.listNotificationTemplates({
  q: 'example',
  from: 1,
  size: 1,
  sort: 'example',
  fields: 'example',
  hydrate: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_schema": "string",
      "_title": "string",
      "_org": "string",
      "_tags": ["string"],
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "_acl": {
        "view": ["string"],
        "edit": ["string"],
        "delete": ["string"]
      },
      "name": "string",
      "type": "string",
      "notification_title": "string",
      "message": "string",
      "action_label": "string",
      "action_url": "string",
      "style": "string",
      "system_template": true,
      "created_by": "string",
      "updated_by": "string"
    }
  ],
  "hits": 0
}
```

</details>

---

### `createNotificationTemplate`

Create a new notification template

`POST /v1/notification/templates`

```ts
const { data } = await client.createNotificationTemplate(
  null,
  {
    name: 'string',
    type: 'string',
    notification_title: 'string',
    message: 'string',
    action_label: 'string',
    action_url: 'string',
    style: 'string',
    _title: 'string',
    _tags: ['string'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_schema": "string",
  "_title": "string",
  "_org": "string",
  "_tags": ["string"],
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "_acl": {
    "view": ["string"],
    "edit": ["string"],
    "delete": ["string"]
  },
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "system_template": true,
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `getNotificationTemplate`

Get a single notification template by ID

`GET /v1/notification/templates/{id}`

```ts
const { data } = await client.getNotificationTemplate({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_schema": "string",
  "_title": "string",
  "_org": "string",
  "_tags": ["string"],
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "_acl": {
    "view": ["string"],
    "edit": ["string"],
    "delete": ["string"]
  },
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "system_template": true,
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `updateNotificationTemplate`

Update a notification template (full replacement)

`PUT /v1/notification/templates/{id}`

```ts
const { data } = await client.updateNotificationTemplate(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'string',
    notification_title: 'string',
    message: 'string',
    action_label: 'string',
    action_url: 'string',
    style: 'string',
    _title: 'string',
    _tags: ['string'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_schema": "string",
  "_title": "string",
  "_org": "string",
  "_tags": ["string"],
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "_acl": {
    "view": ["string"],
    "edit": ["string"],
    "delete": ["string"]
  },
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "system_template": true,
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `patchNotificationTemplate`

Partially update a notification template

`PATCH /v1/notification/templates/{id}`

```ts
const { data } = await client.patchNotificationTemplate(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'string',
    notification_title: 'string',
    message: 'string',
    action_label: 'string',
    action_url: 'string',
    style: 'string',
    _title: 'string',
    _tags: ['string'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_schema": "string",
  "_title": "string",
  "_org": "string",
  "_tags": ["string"],
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "_acl": {
    "view": ["string"],
    "edit": ["string"],
    "delete": ["string"]
  },
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "system_template": true,
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `deleteNotificationTemplate`

Delete a notification template permanently

`DELETE /v1/notification/templates/{id}`

```ts
const { data } = await client.deleteNotificationTemplate({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_schema": "string",
  "_title": "string",
  "_org": "string",
  "_tags": ["string"],
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_owners": [
    {
      "org_id": "string",
      "user_id": "string"
    }
  ],
  "_acl": {
    "view": ["string"],
    "edit": ["string"],
    "delete": ["string"]
  },
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "system_template": true,
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `sendPreview`

Send a preview notification (both email and in-app) to the requesting user.
Used to test notification templates before saving.

`POST /v1/notification/templates/send-preview`

```ts
const { data } = await client.sendPreview(
  null,
  {
    template: {
      name: 'string',
      notification_title: 'string',
      message: 'string',
      action_label: 'string',
      action_url: 'string',
      style: 'string',
      _title: 'string',
      _tags: ['string'],
      _manifest: ['123e4567-e89b-12d3-a456-426614174000']
    },
    context_ids: {}
  },
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "success": true,
    "data": {}
  }
]
```

</details>

---

## Schemas

### `Error`

```ts
type Error = {
  message: string
  code?: string
}
```

### `EntityOperation`

```ts
type EntityOperation = {
  entity: string // uuid
  operation?: string
  params?: {
    id?: string // uuid
    slug?: string
  }
  payload?: object
}
```

### `NotificationItem`

```ts
type NotificationItem = {
  id?: number
  notification_id?: number
  timestamp?: string // date-time
  read_state?: boolean
  type: string
  redirect_url?: string
  organization_id?: string
  title: {
    en?: string
    de?: string
  }
  message: {
    en?: string
    de?: string
  }
  payload?: Record<string, unknown>
  caller?: {
    EpilotAuth?: {
      token?: { ... }
    }
  }
  operations?: Array<{
    entity: string // uuid
    operation?: string
    params?: {
      id?: { ... }
      slug?: { ... }
    }
    payload?: object
  }>
  force_notify_users?: Record<string, unknown>
}
```

### `Notification`

```ts
type Notification = {
  notification_id?: number
  timestamp?: string // date-time
  type: string
  redirect_url?: string
  organization_id?: string
  title: {
    en?: string
    de?: string
  }
  message: {
    en?: string
    de?: string
  }
  payload?: Record<string, unknown>
  caller?: {
    EpilotAuth?: {
      token?: { ... }
    }
  }
  operations?: Array<{
    entity: string // uuid
    operation?: string
    params?: {
      id?: { ... }
      slug?: { ... }
    }
    payload?: object
  }>
  force_notify_users?: Record<string, unknown>
  read_state?: boolean
  visibility_user_ids?: string[]
}
```

### `NotificationBase`

```ts
type NotificationBase = {
  notification_id?: number
  timestamp?: string // date-time
  type: string
  redirect_url?: string
  organization_id?: string
  title: {
    en?: string
    de?: string
  }
  message: {
    en?: string
    de?: string
  }
  payload?: Record<string, unknown>
  caller?: {
    EpilotAuth?: {
      token?: { ... }
    }
  }
  operations?: Array<{
    entity: string // uuid
    operation?: string
    params?: {
      id?: { ... }
      slug?: { ... }
    }
    payload?: object
  }>
  force_notify_users?: Record<string, unknown>
}
```

### `EntityId`

```ts
type EntityId = string // uuid
```

### `Entity`

```ts
type Entity = Record<string, unknown>
```

### `Id`

```ts
type Id = number
```

### `NotificationId`

```ts
type NotificationId = number
```

### `NotificationCallerContext`

```ts
type NotificationCallerContext = {
  EpilotAuth?: {
    token?: {
      sub?: { ... }
      email?: { ... }
      cognito:username?: { ... }
      custom:ivy_user_id?: { ... }
    }
  }
}
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = string
```

### `EntityOwner`

```ts
type EntityOwner = {
  org_id: string
  user_id: string
}
```

### `EntityAcl`

Access control list

```ts
type EntityAcl = {
  view?: string[]
  edit?: string[]
  delete?: string[]
}
```

### `NotificationTemplate`

```ts
type NotificationTemplate = {
  _id: string // uuid
  _schema: string
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _manifest?: string // uuid[]
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  name?: string
  type?: string
  notification_title?: string
  message?: string
  action_label?: string
  action_url?: string
  style?: string
  system_template?: boolean
  created_by?: string
  updated_by?: string
}
```

### `CreateNotificationTemplateInput`

```ts
type CreateNotificationTemplateInput = {
  name: string
  type: string
  notification_title?: string
  message?: string
  action_label?: string
  action_url?: string
  style?: string
  _title?: string
  _tags?: string[]
  _manifest?: string // uuid[]
}
```

### `UpdateNotificationTemplateInput`

```ts
type UpdateNotificationTemplateInput = {
  name?: string
  notification_title?: string
  message?: string
  action_label?: string
  action_url?: string
  style?: string
  _title?: string
  _tags?: string[]
  _manifest?: string // uuid[]
}
```

### `NotificationTemplateListResponse`

```ts
type NotificationTemplateListResponse = {
  results?: Array<{
    _id: string // uuid
    _schema: string
    _title: string
    _org: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    _manifest?: string // uuid[]
    _owners?: Array<{
      org_id: { ... }
      user_id: { ... }
    }>
    _acl?: {
      view?: { ... }
      edit?: { ... }
      delete?: { ... }
    }
    name?: string
    type?: string
    notification_title?: string
    message?: string
    action_label?: string
    action_url?: string
    style?: string
    system_template?: boolean
    created_by?: string
    updated_by?: string
  }>
  hits?: number
}
```

### `SendPreviewInput`

```ts
type SendPreviewInput = {
  template: {
    name?: string
    notification_title?: string
    message?: string
    action_label?: string
    action_url?: string
    style?: string
    _title?: string
    _tags?: string[]
    _manifest?: string // uuid[]
  }
  context_ids?: Record<string, string>
}
```

### `SendPreviewResponse`

Array of results for each notification channel (email, in-app)

```ts
type SendPreviewResponse = Array<{
  success: boolean
  data?: unknown
}>
```
