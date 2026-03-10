# Notification API

- **Base URL:** `https://notification.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/notification](https://docs.epilot.io/api/notification)

Notification API for epilot 360

## Quick Start

```bash
# List available operations
epilot notification

# Call an operation
epilot notification getNotificationsV2
```

## Operations

**Notification**
- [`getNotificationsV2`](#getnotificationsv2) — Get notifications items. These items may eventually contain entities within their payload, which can be hydrated by the 
- [`getNotifications`](#getnotifications) — Get notifications
- [`createNotification`](#createnotification) — Create a message that can be displayed in the notification panel.
- [`getNotification`](#getnotification) — Get the details of a single notification.
- [`markAllAsRead`](#markallasread) — Mark all as read
- [`markAsRead`](#markasread) — Mark as read
- [`getTotalUnread`](#gettotalunread) — Get total unread

**Template**
- [`listNotificationTemplates`](#listnotificationtemplates) — List notification templates with optional filtering and pagination
- [`createNotificationTemplate`](#createnotificationtemplate) — Create a new notification template
- [`getNotificationTemplate`](#getnotificationtemplate) — Get a single notification template by ID
- [`updateNotificationTemplate`](#updatenotificationtemplate) — Update a notification template (full replacement)
- [`patchNotificationTemplate`](#patchnotificationtemplate) — Partially update a notification template
- [`deleteNotificationTemplate`](#deletenotificationtemplate) — Delete a notification template permanently
- [`sendPreview`](#sendpreview) — Send a preview notification (both email and in-app) to the requesting user.

### `getNotificationsV2`

Get notifications items. These items may eventually contain entities within their payload, which can be hydrated by the 

`GET /v2/notification/notifications`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No | Base64 encoded cursor to be used for pagination |
| `after_id` | query | number | No |  |
| `limit` | query | number | No | The numbers of items to return |

**Sample Call**

```bash
epilot notification getNotificationsV2
```

With JSONata filter:

```bash
epilot notification getNotificationsV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

### `getNotifications`

Get notifications

`GET /v1/notification/notifications`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `after_id` | query | number | No |  |
| `limit` | query | number | No | The numbers of items to return |
| `no_hydrate` | query | boolean | No | When true, the payload will not be hydrated with the entity data. This is useful when the client does not need the entity data and wants to save on API calls (performance gain). When false, the payloa |

**Sample Call**

```bash
epilot notification getNotifications
```

With JSONata filter:

```bash
epilot notification getNotifications --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

### `createNotification`

Create a message that can be displayed in the notification panel.

`POST /v1/notification/notifications`

**Request Body**

**Sample Call**

```bash
epilot notification createNotification
```

With request body:

```bash
epilot notification createNotification \
  -d '{
  "notification_id": 0,
  "timestamp": "1970-01-01T00:00:00.000Z",
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
  },
  "read_state": false,
  "visibility_user_ids": ["1", "2", "3", "4", "5"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot notification createNotification
```

With JSONata filter:

```bash
epilot notification createNotification --jsonata '$'
```

---

### `getNotification`

Get the details of a single notification.

`GET /v1/notification/notifications/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | number | Yes | Notification Id |

**Sample Call**

```bash
epilot notification getNotification \
  -p id=1
```

Using positional args for path parameters:

```bash
epilot notification getNotification 1
```

With JSONata filter:

```bash
epilot notification getNotification -p id=1 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Sample Call**

```bash
epilot notification markAllAsRead
```

With JSONata filter:

```bash
epilot notification markAllAsRead --jsonata '$'
```

---

### `markAsRead`

Mark as read

`PUT /v1/notification/notifications/{id}/mark`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | number | Yes | Numeric ID of the notification to mark as read |

**Sample Call**

```bash
epilot notification markAsRead \
  -p id=1
```

Using positional args for path parameters:

```bash
epilot notification markAsRead 1
```

With JSONata filter:

```bash
epilot notification markAsRead -p id=1 --jsonata '$'
```

---

### `getTotalUnread`

Get total unread

`GET /v1/notification/unreads`

**Sample Call**

```bash
epilot notification getTotalUnread
```

With JSONata filter:

```bash
epilot notification getTotalUnread --jsonata '$'
```

---

### `listNotificationTemplates`

List notification templates with optional filtering and pagination

`GET /v1/notification/templates`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `q` | query | string | No | Lucene query string for filtering |
| `from` | query | number | No | Pagination offset (0-based) |
| `size` | query | number | No | Results per page |
| `sort` | query | string | No | Sort fields (prefix with - for descending) |
| `fields` | query | string | No | Comma-separated fields to include |
| `hydrate` | query | boolean | No | Resolve nested relations |

**Sample Call**

```bash
epilot notification listNotificationTemplates
```

With JSONata filter:

```bash
epilot notification listNotificationTemplates --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

**Request Body** (required)

**Sample Call**

```bash
epilot notification createNotificationTemplate
```

With request body:

```bash
epilot notification createNotificationTemplate \
  -d '{
  "name": "string",
  "type": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "_title": "string",
  "_tags": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot notification createNotificationTemplate
```

With JSONata filter:

```bash
epilot notification createNotificationTemplate --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Template ID (UUID) |

**Sample Call**

```bash
epilot notification getNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notification getNotificationTemplate 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notification getNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Template ID (UUID) |

**Request Body** (required)

**Sample Call**

```bash
epilot notification updateNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot notification updateNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "_title": "string",
  "_tags": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot notification updateNotificationTemplate 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notification updateNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notification updateNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Template ID (UUID) |

**Request Body** (required)

**Sample Call**

```bash
epilot notification patchNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot notification patchNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "name": "string",
  "notification_title": "string",
  "message": "string",
  "action_label": "string",
  "action_url": "string",
  "style": "string",
  "_title": "string",
  "_tags": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot notification patchNotificationTemplate 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot notification patchNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notification patchNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Template ID (UUID) |

**Sample Call**

```bash
epilot notification deleteNotificationTemplate \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot notification deleteNotificationTemplate 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot notification deleteNotificationTemplate -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/notification/templates/send-preview`

**Request Body** (required)

**Sample Call**

```bash
epilot notification sendPreview
```

With request body:

```bash
epilot notification sendPreview \
  -d '{
  "template": {
    "name": "string",
    "notification_title": "string",
    "message": "string",
    "action_label": "string",
    "action_url": "string",
    "style": "string",
    "_title": "string",
    "_tags": ["string"],
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
  },
  "context_ids": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot notification sendPreview
```

With JSONata filter:

```bash
epilot notification sendPreview --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
