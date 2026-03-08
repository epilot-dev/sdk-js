# Message API

- **Base URL:** `https://message.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/message](https://docs.epilot.io/api/message)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.message.sendMessage(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/message'

const messageClient = await getClient()
authorize(messageClient, () => '<token>')
const { data } = await messageClient.sendMessage(...)
```

## Operations

**Messages**
- [`sendMessage`](#sendmessage)
- [`updateMessage`](#updatemessage)
- [`getMessage`](#getmessage)
- [`deleteMessage`](#deletemessage)
- [`getMessageEml`](#getmessageeml)
- [`searchMessages`](#searchmessages)
- [`trashMessage`](#trashmessage)
- [`untrashMessage`](#untrashmessage)
- [`markReadMessage`](#markreadmessage)
- [`markReadMessageV2`](#markreadmessagev2)
- [`markUnreadMessage`](#markunreadmessage)
- [`getUnread`](#getunread)
- [`markUnreadMessageV2`](#markunreadmessagev2)
- [`getMessageV2`](#getmessagev2)

**Threads**
- [`searchThreads`](#searchthreads)
- [`searchThreadsV2`](#searchthreadsv2)
- [`searchIds`](#searchids)
- [`updateThread`](#updatethread)
- [`deleteThread`](#deletethread)
- [`moveThread`](#movethread)
- [`markThreadAsDone`](#markthreadasdone)
- [`markThreadAsOpen`](#markthreadasopen)
- [`getThreadTimeline`](#getthreadtimeline)
- [`trashThread`](#trashthread)
- [`untrashThread`](#untrashthread)
- [`threadBulkActionsRead`](#threadbulkactionsread)
- [`threadBulkActionsUnread`](#threadbulkactionsunread)
- [`threadBulkActionsFavorite`](#threadbulkactionsfavorite)
- [`threadBulkActionsUnfavorite`](#threadbulkactionsunfavorite)
- [`threadBulkActionsTrash`](#threadbulkactionstrash)
- [`threadBulkActionsUntrash`](#threadbulkactionsuntrash)
- [`threadBulkActionsDelete`](#threadbulkactionsdelete)
- [`threadBulkActionsDone`](#threadbulkactionsdone)
- [`threadBulkActionsOpen`](#threadbulkactionsopen)
- [`markReadThread`](#markreadthread)
- [`markReadThreadV2`](#markreadthreadv2)
- [`markUnreadThread`](#markunreadthread)
- [`markUnreadThreadV2`](#markunreadthreadv2)
- [`assignThread`](#assignthread)
- [`unassignThread`](#unassignthread)
- [`assignUsers`](#assignusers)
- [`assignUsersV2`](#assignusersv2)
- [`pinThread`](#pinthread)
- [`unpinThread`](#unpinthread)

**Drafts**
- [`createDraft`](#createdraft)
- [`sendDraft`](#senddraft)

**Schemas**
- [`ErrorResponse`](#errorresponse)
- [`MoveThreadPayload`](#movethreadpayload)
- [`BaseEntity`](#baseentity)
- [`Thread`](#thread)
- [`Message`](#message)
- [`MessageV2`](#messagev2)
- [`Address`](#address)
- [`AttachmentsRelation`](#attachmentsrelation)
- [`File`](#file)
- [`MessageRequestParams`](#messagerequestparams)
- [`SearchParamsV2`](#searchparamsv2)
- [`SearchParams`](#searchparams)
- [`SearchIDParams`](#searchidparams)
- [`ReadMessagePayload`](#readmessagepayload)
- [`ReadingScope`](#readingscope)
- [`ThreadTimeline`](#threadtimeline)
- [`ThreadDoneEvent`](#threaddoneevent)
- [`ThreadOpenEvent`](#threadopenevent)
- [`TimelineEventData`](#timelineeventdata)
- [`TimelineEvent`](#timelineevent)
- [`BulkActionsPayloadWithScopes`](#bulkactionspayloadwithscopes)
- [`BulkActionsPayload`](#bulkactionspayload)
- [`FieldsParam`](#fieldsparam)

### `sendMessage`

Send an email message

`POST /v1/message/messages`

```ts
const { data } = await client.sendMessage(
  {
    do_not_create_entities: true,
  },
  {},
)
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `updateMessage`

Update message metadata

`PUT /v1/message/messages`

```ts
const { data } = await client.updateMessage()
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
  "sender": "206801",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "send_status": [
    "SEND"
  ],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `getMessage`

Get an email message by id

`GET /v1/message/messages/{id}`

```ts
const { data } = await client.getMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
  "sender": "206801",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "send_status": [
    "SEND"
  ],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `deleteMessage`

Immediately and permanently delete a message. This operation cannot be undone.

`DELETE /v1/message/messages/{id}`

```ts
const { data } = await client.deleteMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getMessageEml`

Download a message as an EML file.
Returns a 302 redirect to a pre-signed S3 URL where the EML file can be downloaded.

`GET /v1/message/messages/{id}/eml`

```ts
const { data } = await client.getMessageEml({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `searchMessages`

Search Messages

`POST /v1/message/messages:search`

```ts
const { data } = await client.searchMessages(
  null,
  {
    inbox_id: '3f34ce73-089c-4d45-a5ee-c161234e41c3',
    q: 'subject:"Request for solar panel price" AND _tags:INBOX',
    fields: [
      '_id',
      '_title',
      'first_name',
      'account',
      '!account.*._files',
      '**._product'
    ],
    from: 0,
    size: 10,
    hydrate: false,
    include_scores: false,
    sort: 'string',
    highlight: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
      "sender": "206801",
      "subject": "Request for solar panel price",
      "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
      "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
      "from": {},
      "reply_to": {},
      "to": [],
      "cc": [],
      "bcc": [],
      "file": {},
      "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
      "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
      "user_read_message": [],
      "org_read_message": [],
      "send_status": [],
      "type": "SENT",
      "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
    }
  ]
}
```

</details>

---

### `trashMessage`

Move a message to the trash

`POST /v1/message/messages/{id}/trash`

```ts
const { data } = await client.trashMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `untrashMessage`

Restore a trashed message

`POST /v1/message/messages/{id}/untrash`

```ts
const { data } = await client.untrashMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `markReadMessage`

Mark message as read

`POST /v1/message/messages/{id}/read`

```ts
const { data } = await client.markReadMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `markReadMessageV2`

Mark message as read within a scope

`POST /v2/message/messages/{id}/read`

```ts
const { data } = await client.markReadMessageV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `markUnreadMessage`

Mark message as unread

`POST /v1/message/messages/{id}/unread`

```ts
const { data } = await client.markUnreadMessage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getUnread`

Get all unread messages by actor

`GET /v1/message/messages/unread/{actor}`

```ts
const { data } = await client.getUnread({
  actor: 'example',
  email_filter: ['...'],
})
```

<details>
<summary>Response</summary>

```json
{
  "count": 14,
  "unread": 0,
  "drafts": 12,
  "unassigned": 1
}
```

</details>

---

### `markUnreadMessageV2`

Mark message as unread within a scope

`POST /v2/message/messages/{id}/unread`

```ts
const { data } = await client.markUnreadMessageV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `searchThreads`

Search for threads of email messages.

`POST /v1/message/threads:search`

```ts
const { data } = await client.searchThreads(
  null,
  {
    q: 'subject:"Request for solar panel price" AND _tags:INBOX',
    from: 0,
    size: 10,
    hydrate: false
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "topic": "CUSTOMER_MESSAGE",
      "assigned_to": [],
      "org_read_message": [],
      "done": false,
      "latest_message": {},
      "latest_trash_message": {},
      "latest_message_at": "2024-02-10T09:14:31.990Z"
    }
  ]
}
```

</details>

---

### `searchThreadsV2`

Search for threads of email messages.

`POST /v2/message/threads:search`

```ts
const { data } = await client.searchThreadsV2(
  null,
  {
    inbox_id: '3f34ce73-089c-4d45-a5ee-c161234e41c3',
    q: 'subject:"Request for solar panel price" AND _tags:INBOX',
    fields: [
      '_id',
      '_title',
      'first_name',
      'account',
      '!account.*._files',
      '**._product'
    ],
    from: 0,
    size: 10,
    hydrate: false,
    include_scores: false,
    sort: 'string',
    highlight: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "topic": "CUSTOMER_MESSAGE",
      "assigned_to": [],
      "org_read_message": [],
      "done": false,
      "latest_message": {},
      "latest_trash_message": {},
      "latest_message_at": "2024-02-10T09:14:31.990Z"
    }
  ]
}
```

</details>

---

### `searchIds`

Search threads and return all id's

`POST /v1/message/threads:searchIds`

```ts
const { data } = await client.searchIds(
  null,
  {
    q: 'subject:"Request for solar panel price" AND _tags:INBOX'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 14,
  "results": [
    "string"
  ]
}
```

</details>

---

### `updateThread`

Modify thread metadata

`PUT /v1/message/threads`

```ts
const { data } = await client.updateThread()
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "topic": "CUSTOMER_MESSAGE",
  "assigned_to": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "done": false,
  "latest_message": {
    "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
    "sender": "206801",
    "subject": "Request for solar panel price",
    "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
    "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
    "from": {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    },
    "reply_to": {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    },
    "to": [
      {}
    ],
    "cc": [
      {}
    ],
    "bcc": [
      {}
    ],
    "file": {
      "$relation": []
    },
    "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
    "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
    "user_read_message": [
      "206801",
      "200109"
    ],
    "org_read_message": [
      "789372",
      "210291"
    ],
    "send_status": [
      "SEND"
    ],
    "type": "SENT",
    "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
  },
  "latest_trash_message": {
    "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
    "sender": "206801",
    "subject": "Request for solar panel price",
    "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
    "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
    "from": {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    },
    "reply_to": {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    },
    "to": [
      {}
    ],
    "cc": [
      {}
    ],
    "bcc": [
      {}
    ],
    "file": {
      "$relation": []
    },
    "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
    "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
    "user_read_message": [
      "206801",
      "200109"
    ],
    "org_read_message": [
      "789372",
      "210291"
    ],
    "send_status": [
      "SEND"
    ],
    "type": "SENT",
    "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
  },
  "latest_message_at": "2024-02-10T09:14:31.990Z"
}
```

</details>

---

### `deleteThread`

Immediately and permanently delete a thread. This operation cannot be undone.

`DELETE /v1/message/threads/{id}`

```ts
const { data } = await client.deleteThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `moveThread`

Move thread to a different Inbox

`POST /v1/message/threads/{id}:move`

```ts
const { data } = await client.moveThread(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    inbox_id: '3f34ce73-089c-4d45-a5ee-c161234e41c3'
  },
)
```

---

### `markThreadAsDone`

Mark thread as done

`POST /v1/message/threads/{id}:markAsDone`

```ts
const { data } = await client.markThreadAsDone({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `markThreadAsOpen`

Mark thread as open

`POST /v1/message/threads/{id}:markAsOpen`

```ts
const { data } = await client.markThreadAsOpen({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getThreadTimeline`

Get thread timeline

`GET /v1/message/threads/{id}/timeline`

```ts
const { data } = await client.getThreadTimeline({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "events": [
    {
      "data": {},
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `trashThread`

Move a thread to trash

`POST /v1/message/threads/{id}/trash`

```ts
const { data } = await client.trashThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `untrashThread`

Restore a trashed thread

`POST /v1/message/threads/{id}/untrash`

```ts
const { data } = await client.untrashThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `threadBulkActionsRead`

Perform a bulk action of marking an array of thread ids as read

`POST /v1/message/threads/bulk:read`

```ts
const { data } = await client.threadBulkActionsRead(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ],
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `threadBulkActionsUnread`

Perform a bulk action of marking an array of thread ids as unread

`POST /v1/message/threads/bulk:unread`

```ts
const { data } = await client.threadBulkActionsUnread(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ],
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `threadBulkActionsFavorite`

Perform a bulk action of marking an array of thread ids favorite

`POST /v1/message/threads/bulk:favorite`

```ts
const { data } = await client.threadBulkActionsFavorite(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsUnfavorite`

Perform a bulk action of marking an array of thread ids unfavorited

`POST /v1/message/threads/bulk:unfavorite`

```ts
const { data } = await client.threadBulkActionsUnfavorite(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsTrash`

Perform a bulk action of trashing an array of threads

`POST /v1/message/threads/bulk:trash`

```ts
const { data } = await client.threadBulkActionsTrash(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsUntrash`

Perform a bulk action of untrashing an array of threads

`POST /v1/message/threads/bulk:untrash`

```ts
const { data } = await client.threadBulkActionsUntrash(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsDelete`

Performs a bulk permanent delete for all threads

`POST /v1/message/threads/bulk:delete`

```ts
const { data } = await client.threadBulkActionsDelete(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsDone`

Perform a bulk action of marking an array of threads as done

`POST /v1/message/threads/bulk:done`

```ts
const { data } = await client.threadBulkActionsDone(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `threadBulkActionsOpen`

Perform a bulk action of marking an array of threads as open

`POST /v1/message/threads/bulk:open`

```ts
const { data } = await client.threadBulkActionsOpen(
  null,
  {
    ids: [
      '6b299eda-4018-4554-8965-c4b5598e6531'
    ]
  },
)
```

---

### `markReadThread`

Mark thread as read

`POST /v1/message/threads/{id}/read`

```ts
const { data } = await client.markReadThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `markReadThreadV2`

Mark thread as read within a scope

`POST /v2/message/threads/{id}/read`

```ts
const { data } = await client.markReadThreadV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `markUnreadThread`

Mark thread as unread

`POST /v1/message/threads/{id}/unread`

```ts
const { data } = await client.markUnreadThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `markUnreadThreadV2`

Mark thread as unread within a scope

`POST /v2/message/threads/{id}/unread`

```ts
const { data } = await client.markUnreadThreadV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    scopes: [
      'organization',
      'user'
    ]
  },
)
```

---

### `assignThread`

Assign thread to entities

`POST /v1/message/threads/{id}/assign`

```ts
const { data } = await client.assignThread(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  [
    {
      slug: 'contact',
      entity_id: '3f34ce73-089c-4d45-a5ee-c161234e41c3',
      org_id: '206801',
      is_main_entity: true
    }
  ],
)
```

---

### `unassignThread`

Unassign thread from entities

`POST /v1/message/threads/{id}/unassign`

```ts
const { data } = await client.unassignThread(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  [
    {
      slug: 'contact',
      entity_id: '3f34ce73-089c-4d45-a5ee-c161234e41c3'
    }
  ],
)
```

---

### `assignUsers`

Assign users to thread for receiving notifications.
The operation replaces all existing assigned users in thread.

`POST /v1/message/threads/{id}/assign:users`

```ts
const { data } = await client.assignUsers(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    assigned_to: [
      '206801'
    ]
  },
)
```

---

### `assignUsersV2`

Assign users to thread.

`POST /v2/message/threads/{id}/assign:users`

```ts
const { data } = await client.assignUsersV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    add: [
      '206801'
    ],
    remove: [
      '206801'
    ]
  },
)
```

---

### `pinThread`

Pin a single thread

`POST /v1/message/threads/{id}:pin`

```ts
const { data } = await client.pinThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `unpinThread`

Unpin a single thread

`DELETE /v1/message/threads/{id}:pin`

```ts
const { data } = await client.unpinThread({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `createDraft`

Create a new draft

`POST /v1/message/drafts`

```ts
const { data } = await client.createDraft(
  null,
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
  "sender": "206801",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "send_status": [
    "SEND"
  ],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `sendDraft`

Send the existing draft to the recipients

`POST /v1/message/drafts:send`

```ts
const { data } = await client.sendDraft()
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
  "sender": "206801",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "send_status": [
    "SEND"
  ],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `getMessageV2`

- Fetches message by ID
- If the message html is omitted on the entity, then it keeps the content on the message as a signed url
  {
    ...
    _id: "4d74976d-fb64-47fd-85e2-65eea140f5eb",
    _schem

`GET /v2/message/messages/{id}`

```ts
const { data } = await client.getMessageV2({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "html_omitted": false,
  "html_download_url": "https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html",
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": [
    "pricing",
    "INBOX"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "message_id": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>",
  "sender": "206801",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "email_type": "INTERNAL",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "email_type": "INTERNAL",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": [
    "206801",
    "200109"
  ],
  "org_read_message": [
    "789372",
    "210291"
  ],
  "send_status": [
    "SEND"
  ],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

## Schemas

### `ErrorResponse`

```ts
type ErrorResponse = {
  error?: string
}
```

### `MoveThreadPayload`

```ts
type MoveThreadPayload = {
  inbox_id: string
}
```

### `BaseEntity`

```ts
type BaseEntity = {
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `Thread`

Thread properties depend on API caller as it's not pre-defined. We do recommend having at least `topic` property for categorizing.

```ts
type Thread = {
  topic: string
  assigned_to?: string[]
  org_read_message?: string[]
  done?: boolean
  latest_message?: {
    message_id?: string
    sender?: string
    subject: string
    html?: string
    text?: string
    from: {
      name?: { ... }
      address: { ... }
      email_type?: { ... }
      send_status?: { ... }
      send_error?: { ... }
    }
    reply_to?: {
      name?: { ... }
      address: { ... }
      email_type?: { ... }
      send_status?: { ... }
      send_error?: { ... }
    }
    to?: Array<{
      name?: { ... }
      address: { ... }
      email_type?: { ... }
      send_status?: { ... }
  // ...
}
```

### `Message`

```ts
type Message = {
  message_id?: string
  sender?: string
  subject: string
  html?: string
  text?: string
  from: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  reply_to?: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  to?: Array<{
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }>
  cc?: Array<{
    name?: string
    address: string
  // ...
}
```

### `MessageV2`

```ts
type MessageV2 = {
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  message_id?: string
  sender?: string
  subject: string
  html?: string
  text?: string
  from: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  reply_to?: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  to?: Array<{
    name?: string
    address: string
  // ...
}
```

### `Address`

```ts
type Address = {
  name?: string
  address: string
  email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
  send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
  send_error?: object
}
```

### `AttachmentsRelation`

Message attachments

```ts
type AttachmentsRelation = {
  $relation?: Array<{
    entity_id: string
    filename?: string
    is_message_attachment?: boolean
    may_be_signature_attachment?: boolean
    cid?: string
    inline?: boolean
    send_as_link?: boolean
  }>
}
```

### `File`

```ts
type File = {
  entity_id: string
  filename?: string
  is_message_attachment?: boolean
  may_be_signature_attachment?: boolean
  cid?: string
  inline?: boolean
  send_as_link?: boolean
}
```

### `MessageRequestParams`

```ts
type MessageRequestParams = {
  complete_thread?: boolean
  thread?: {
    topic: string
    assigned_to?: string[]
  }
  parent_id?: string
  subject: string
  html?: string
  text?: string
  from: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  reply_to?: {
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  }
  to?: Array<{
    name?: string
    address: string
    email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER"
    send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR"
    send_error?: object
  // ...
}
```

### `SearchParamsV2`

```ts
type SearchParamsV2 = {
  inbox_id?: string | string[]
  q: string
  fields?: string[]
  from?: number
  size?: number
  hydrate?: boolean
  include_scores?: boolean
  sort?: string
  highlight?: unknown
}
```

### `SearchParams`

```ts
type SearchParams = {
  q: string
  from?: number
  size?: number
  hydrate?: boolean
}
```

### `SearchIDParams`

```ts
type SearchIDParams = {
  q?: string
}
```

### `ReadMessagePayload`

```ts
type ReadMessagePayload = {
  scopes: "organization" | "user"[]
}
```

### `ReadingScope`

Who is marking an item as read or unread.

```ts
type ReadingScope = "organization" | "user"
```

### `ThreadTimeline`

```ts
type ThreadTimeline = {
  events: Array<{
    data: {
      type: { ... }
      user_id: { ... }
      organization_id: { ... }
    } | {
      type: { ... }
      user_id: { ... }
      organization_id: { ... }
    }
    timestamp: string
  }>
}
```

### `ThreadDoneEvent`

```ts
type ThreadDoneEvent = {
  type: "THREAD_DONE"
  user_id: string
  organization_id: string
}
```

### `ThreadOpenEvent`

```ts
type ThreadOpenEvent = {
  type: "THREAD_OPEN"
  user_id: string
  organization_id: string
}
```

### `TimelineEventData`

```ts
type TimelineEventData = {
  type: "THREAD_DONE"
  user_id: string
  organization_id: string
} | {
  type: "THREAD_OPEN"
  user_id: string
  organization_id: string
}
```

### `TimelineEvent`

```ts
type TimelineEvent = {
  data: {
    type: "THREAD_DONE"
    user_id: string
    organization_id: string
  } | {
    type: "THREAD_OPEN"
    user_id: string
    organization_id: string
  }
  timestamp: string
}
```

### `BulkActionsPayloadWithScopes`

```ts
type BulkActionsPayloadWithScopes = {
  ids: string[]
  scopes?: "organization" | "user"[]
}
```

### `BulkActionsPayload`

```ts
type BulkActionsPayload = {
  ids: string[]
}
```

### `FieldsParam`

List of entity fields to include or exclude in the response

Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.

Globbing and globstart (**) is supported for nested fields.


```ts
type FieldsParam = string[]
```
