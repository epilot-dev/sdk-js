# Message API

- **Base URL:** `https://message.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/message](https://docs.epilot.io/api/message)

Send and receive email messages via your epilot organization

## Quick Start

```bash
# List available operations
epilot message

# Call an operation
epilot message sendMessage
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

**Messages**
- [`sendMessage`](#sendmessage) — Send an email message
- [`updateMessage`](#updatemessage) — Update message metadata
- [`getMessage`](#getmessage) — Get an email message by id
- [`deleteMessage`](#deletemessage) — Immediately and permanently delete a message. This operation cannot be undone.
- [`getMessageEml`](#getmessageeml) — Download a message as an EML file.
- [`searchMessages`](#searchmessages) — Search Messages
- [`trashMessage`](#trashmessage) — Move a message to the trash
- [`untrashMessage`](#untrashmessage) — Restore a trashed message
- [`markReadMessage`](#markreadmessage) — Mark message as read
- [`markReadMessageV2`](#markreadmessagev2) — Mark message as read within a scope
- [`markUnreadMessage`](#markunreadmessage) — Mark message as unread
- [`getUnread`](#getunread) — Get all unread messages by actor
- [`markUnreadMessageV2`](#markunreadmessagev2) — Mark message as unread within a scope
- [`spamMessage`](#spammessage) — Mark a single message as spam. Also marks the parent thread as spam if all messages in the thread are spam.
- [`unspamMessage`](#unspammessage) — Remove spam marking from a single message. Also removes spam from the parent thread if no other messages are spam.
- [`getMessageV2`](#getmessagev2) — - Fetches message by ID

**Threads**
- [`searchThreads`](#searchthreads) — Search for threads of email messages.
- [`searchThreadsV2`](#searchthreadsv2) — Search for threads of email messages.
- [`searchIds`](#searchids) — Return all thread id's that match a criteria
- [`updateThread`](#updatethread) — Modify thread metadata
- [`deleteThread`](#deletethread) — Immediately and permanently delete a thread. This operation cannot be undone.
- [`moveThread`](#movethread) — Move thread to a different Inbox
- [`markThreadAsDone`](#markthreadasdone) — Mark thread as done
- [`markThreadAsOpen`](#markthreadasopen) — Mark thread as open
- [`getThreadTimeline`](#getthreadtimeline) — Get thread timeline
- [`trashThread`](#trashthread) — Move a thread to trash
- [`untrashThread`](#untrashthread) — Restore a trashed thread
- [`spamThread`](#spamthread) — Mark a thread as spam
- [`unspamThread`](#unspamthread) — Remove spam marking from a thread
- [`bulkMoveThreads`](#bulkmovethreads) — Move many threads to a different inbox
- [`bulkAssignThreads`](#bulkassignthreads) — Assign many threads
- [`threadBulkActionsRead`](#threadbulkactionsread) — Perform a bulk action of marking an array of thread ids as read
- [`threadBulkActionsUnread`](#threadbulkactionsunread) — Perform a bulk action of marking an array of thread ids as unread
- [`threadBulkActionsFavorite`](#threadbulkactionsfavorite) — Perform a bulk action of marking an array of thread ids favorite
- [`threadBulkActionsUnfavorite`](#threadbulkactionsunfavorite) — Perform a bulk action of marking an array of thread ids unfavorited
- [`threadBulkActionsTrash`](#threadbulkactionstrash) — Perform a bulk action of trashing an array of threads
- [`threadBulkActionsUntrash`](#threadbulkactionsuntrash) — Perform a bulk action of untrashing an array of threads
- [`threadBulkActionsDelete`](#threadbulkactionsdelete) — Performs a bulk permanent delete for all threads
- [`threadBulkActionsDone`](#threadbulkactionsdone) — Perform a bulk action of marking an array of threads as done
- [`threadBulkActionsOpen`](#threadbulkactionsopen) — Perform a bulk action of marking an array of threads as open
- [`markReadThread`](#markreadthread) — Mark thread as read
- [`markReadThreadV2`](#markreadthreadv2) — Mark thread as read within a scope
- [`markUnreadThread`](#markunreadthread) — Mark thread as unread
- [`markUnreadThreadV2`](#markunreadthreadv2) — Mark thread as unread within a scope
- [`assignThread`](#assignthread) — Assign thread to entities
- [`unassignThread`](#unassignthread) — Unassign thread from entities
- [`assignUsers`](#assignusers) — Assign users to thread for receiving notifications.
- [`assignUsersV2`](#assignusersv2) — Assign users to thread.
- [`pinThread`](#pinthread) — Pin a single thread
- [`unpinThread`](#unpinthread) — Unpin a single thread

**Drafts**
- [`createDraft`](#createdraft) — Create a new draft
- [`sendDraft`](#senddraft) — Send the existing draft to the recipients

### `sendMessage`

Send an email message

`POST /v1/message/messages`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `do_not_create_entities` | query | boolean | No | When true, this flag lets the caller to send only the message and by-pass creating the thread & message entities. |

**Request Body**

**Sample Call**

```bash
epilot message sendMessage \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot message sendMessage
```

With JSONata filter:

```bash
epilot message sendMessage --jsonata 'complete_thread'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `updateMessage`

Update message metadata

`PUT /v1/message/messages`

**Sample Call**

```bash
epilot message updateMessage
```

With JSONata filter:

```bash
epilot message updateMessage --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
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
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "may_be_signature_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
  "send_status": ["SEND"],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `getMessage`

Get an email message by id

`GET /v1/message/messages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message getMessage \
  -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb
```

Using positional args for path parameters:

```bash
epilot message getMessage 4d74976d-fb64-47fd-85e2-65eea140f5eb
```

With JSONata filter:

```bash
epilot message getMessage -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
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
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "may_be_signature_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
  "send_status": ["SEND"],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `deleteMessage`

Immediately and permanently delete a message. This operation cannot be undone.

`DELETE /v1/message/messages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message deleteMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message deleteMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message deleteMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getMessageEml`

Download a message as an EML file.

`GET /v1/message/messages/{id}/eml`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message entity ID |

**Sample Call**

```bash
epilot message getMessageEml \
  -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb
```

Using positional args for path parameters:

```bash
epilot message getMessageEml 4d74976d-fb64-47fd-85e2-65eea140f5eb
```

With JSONata filter:

```bash
epilot message getMessageEml -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb --jsonata '$'
```

---

### `searchMessages`

Search Messages

`POST /v1/message/messages:search`

**Request Body**

**Sample Call**

```bash
epilot message searchMessages
```

With request body:

```bash
epilot message searchMessages \
  -d '{
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "q": "subject:\"Request for solar panel price\" AND _tags:INBOX",
  "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"],
  "from": 0,
  "size": 10,
  "hydrate": false,
  "include_scores": false,
  "sort": "string",
  "highlight": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message searchMessages
```

With JSONata filter:

```bash
epilot message searchMessages --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": ["pricing", "INBOX"],
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
          {
            "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
            "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
            "is_message_attachment": true,
            "may_be_signature_attachment": true,
            "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
            "inline": false,
            "send_as_link": false
          }
        ]
      },
      "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
      "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
      "user_read_message": ["206801", "200109"],
      "org_read_message": ["789372", "210291"],
      "send_status": ["SEND"],
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message trashMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message trashMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message trashMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `untrashMessage`

Restore a trashed message

`POST /v1/message/messages/{id}/untrash`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message untrashMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message untrashMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message untrashMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markReadMessage`

Mark message as read

`POST /v1/message/messages/{id}/read`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message markReadMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markReadMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markReadMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markReadMessageV2`

Mark message as read within a scope

`POST /v2/message/messages/{id}/read`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message markReadMessageV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"scopes":["organization","user"]}'
```

Using positional args for path parameters:

```bash
epilot message markReadMessageV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message markReadMessageV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markReadMessageV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markUnreadMessage`

Mark message as unread

`POST /v1/message/messages/{id}/unread`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message markUnreadMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markUnreadMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markUnreadMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getUnread`

Get all unread messages by actor

`GET /v1/message/messages/unread/{actor}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `actor` | path | "organization" \| "user" | Yes | Actor performing call, can be user or organization |
| `email_filter` | query | string[] \| string | No | emails to filter by |

**Sample Call**

```bash
epilot message getUnread \
  -p actor=example
```

Using positional args for path parameters:

```bash
epilot message getUnread example
```

With JSONata filter:

```bash
epilot message getUnread -p actor=example --jsonata 'count'
```

<details>
<summary>Sample Response</summary>

```json
{
  "count": 14,
  "unread": 0,
  "drafts": 12,
  "unassigned": 1,
  "spam": 3
}
```

</details>

---

### `markUnreadMessageV2`

Mark message as unread within a scope

`POST /v2/message/messages/{id}/unread`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message markUnreadMessageV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"scopes":["organization","user"]}'
```

Using positional args for path parameters:

```bash
epilot message markUnreadMessageV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message markUnreadMessageV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markUnreadMessageV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `searchThreads`

Search for threads of email messages.

`POST /v1/message/threads:search`

**Request Body**

**Sample Call**

```bash
epilot message searchThreads \
  -d '{"q":"subject:\"Request for solar panel price\" AND _tags:INBOX","from":0,"size":10,"hydrate":false}'
```

Using stdin pipe:

```bash
cat body.json | epilot message searchThreads
```

With JSONata filter:

```bash
epilot message searchThreads --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": ["pricing", "INBOX"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "topic": "CUSTOMER_MESSAGE",
      "assigned_to": ["206801", "200109"],
      "org_read_message": ["789372", "210291"],
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

**Request Body**

**Sample Call**

```bash
epilot message searchThreadsV2
```

With request body:

```bash
epilot message searchThreadsV2 \
  -d '{
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "q": "subject:\"Request for solar panel price\" AND _tags:INBOX",
  "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"],
  "from": 0,
  "size": 10,
  "hydrate": false,
  "include_scores": false,
  "sort": "string",
  "highlight": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message searchThreadsV2
```

With JSONata filter:

```bash
epilot message searchThreadsV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 14,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": ["pricing", "INBOX"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "topic": "CUSTOMER_MESSAGE",
      "assigned_to": ["206801", "200109"],
      "org_read_message": ["789372", "210291"],
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

Return all thread id's that match a criteria

`POST /v1/message/threads:searchIds`

**Request Body**

**Sample Call**

```bash
epilot message searchIds \
  -d '{"q":"subject:\"Request for solar panel price\" AND _tags:INBOX"}'
```

Using stdin pipe:

```bash
cat body.json | epilot message searchIds
```

With JSONata filter:

```bash
epilot message searchIds --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 14,
  "results": ["string"]
}
```

</details>

---

### `updateThread`

Modify thread metadata

`PUT /v1/message/threads`

**Sample Call**

```bash
epilot message updateThread
```

With JSONata filter:

```bash
epilot message updateThread --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "topic": "CUSTOMER_MESSAGE",
  "assigned_to": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
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
    "user_read_message": ["206801", "200109"],
    "org_read_message": ["789372", "210291"],
    "send_status": ["SEND"],
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
    "user_read_message": ["206801", "200109"],
    "org_read_message": ["789372", "210291"],
    "send_status": ["SEND"],
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message deleteThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message deleteThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message deleteThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `moveThread`

Move thread to a different Inbox

`POST /v1/message/threads/{id}:move`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message moveThread \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"inbox_id":"3f34ce73-089c-4d45-a5ee-c161234e41c3"}'
```

Using positional args for path parameters:

```bash
epilot message moveThread 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message moveThread -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message moveThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markThreadAsDone`

Mark thread as done

`POST /v1/message/threads/{id}:markAsDone`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message markThreadAsDone \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markThreadAsDone 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markThreadAsDone -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markThreadAsOpen`

Mark thread as open

`POST /v1/message/threads/{id}:markAsOpen`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message markThreadAsOpen \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markThreadAsOpen 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markThreadAsOpen -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getThreadTimeline`

Get thread timeline

`GET /v1/message/threads/{id}/timeline`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message getThreadTimeline \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message getThreadTimeline 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message getThreadTimeline -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'events'
```

<details>
<summary>Sample Response</summary>

```json
{
  "events": [
    {
      "data": {
        "type": "THREAD_DONE",
        "user_id": "123",
        "organization_id": "456"
      },
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

</details>

---

### `trashThread`

Move a thread to trash

`POST /v1/message/threads/{id}/trash`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message trashThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message trashThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message trashThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `untrashThread`

Restore a trashed thread

`POST /v1/message/threads/{id}/untrash`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message untrashThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message untrashThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message untrashThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `spamThread`

Mark a thread as spam

`POST /v1/message/threads/{id}/spam`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message spamThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message spamThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message spamThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `unspamThread`

Remove spam marking from a thread

`POST /v1/message/threads/{id}/unspam`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message unspamThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message unspamThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message unspamThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `spamMessage`

Mark a single message as spam. Also marks the parent thread as spam if all messages in the thread are spam.

`POST /v1/message/messages/{id}/spam`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message spamMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message spamMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message spamMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `unspamMessage`

Remove spam marking from a single message. Also removes spam from the parent thread if no other messages are spam.

`POST /v1/message/messages/{id}/unspam`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message unspamMessage \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message unspamMessage 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message unspamMessage -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `bulkMoveThreads`

Move many threads to a different inbox

`POST /v1/message/threads/bulk:move`

**Request Body** (required)

**Sample Call**

```bash
epilot message bulkMoveThreads
```

With request body:

```bash
epilot message bulkMoveThreads \
  -d '{
  "ids": ["6b299eda-4018-4554-8965-c4b5598e6531"],
  "assign_to": ["206801"],
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "scopes": ["organization", "user"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message bulkMoveThreads
```

With JSONata filter:

```bash
epilot message bulkMoveThreads --jsonata '$'
```

---

### `bulkAssignThreads`

Assign many threads

`POST /v1/message/threads/bulk:assign`

**Request Body** (required)

**Sample Call**

```bash
epilot message bulkAssignThreads
```

With request body:

```bash
epilot message bulkAssignThreads \
  -d '{
  "ids": ["6b299eda-4018-4554-8965-c4b5598e6531"],
  "assign_to": ["206801"],
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "scopes": ["organization", "user"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message bulkAssignThreads
```

With JSONata filter:

```bash
epilot message bulkAssignThreads --jsonata '$'
```

---

### `threadBulkActionsRead`

Perform a bulk action of marking an array of thread ids as read

`POST /v1/message/threads/bulk:read`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsRead
```

With request body:

```bash
epilot message threadBulkActionsRead \
  -d '{
  "ids": ["6b299eda-4018-4554-8965-c4b5598e6531"],
  "assign_to": ["206801"],
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "scopes": ["organization", "user"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsRead
```

With JSONata filter:

```bash
epilot message threadBulkActionsRead --jsonata '$'
```

---

### `threadBulkActionsUnread`

Perform a bulk action of marking an array of thread ids as unread

`POST /v1/message/threads/bulk:unread`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsUnread
```

With request body:

```bash
epilot message threadBulkActionsUnread \
  -d '{
  "ids": ["6b299eda-4018-4554-8965-c4b5598e6531"],
  "assign_to": ["206801"],
  "inbox_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3",
  "scopes": ["organization", "user"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsUnread
```

With JSONata filter:

```bash
epilot message threadBulkActionsUnread --jsonata '$'
```

---

### `threadBulkActionsFavorite`

Perform a bulk action of marking an array of thread ids favorite

`POST /v1/message/threads/bulk:favorite`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsFavorite \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsFavorite
```

With JSONata filter:

```bash
epilot message threadBulkActionsFavorite --jsonata '$'
```

---

### `threadBulkActionsUnfavorite`

Perform a bulk action of marking an array of thread ids unfavorited

`POST /v1/message/threads/bulk:unfavorite`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsUnfavorite \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsUnfavorite
```

With JSONata filter:

```bash
epilot message threadBulkActionsUnfavorite --jsonata '$'
```

---

### `threadBulkActionsTrash`

Perform a bulk action of trashing an array of threads

`POST /v1/message/threads/bulk:trash`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsTrash \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsTrash
```

With JSONata filter:

```bash
epilot message threadBulkActionsTrash --jsonata '$'
```

---

### `threadBulkActionsUntrash`

Perform a bulk action of untrashing an array of threads

`POST /v1/message/threads/bulk:untrash`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsUntrash \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsUntrash
```

With JSONata filter:

```bash
epilot message threadBulkActionsUntrash --jsonata '$'
```

---

### `threadBulkActionsDelete`

Performs a bulk permanent delete for all threads

`POST /v1/message/threads/bulk:delete`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsDelete \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsDelete
```

With JSONata filter:

```bash
epilot message threadBulkActionsDelete --jsonata '$'
```

---

### `threadBulkActionsDone`

Perform a bulk action of marking an array of threads as done

`POST /v1/message/threads/bulk:done`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsDone \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsDone
```

With JSONata filter:

```bash
epilot message threadBulkActionsDone --jsonata '$'
```

---

### `threadBulkActionsOpen`

Perform a bulk action of marking an array of threads as open

`POST /v1/message/threads/bulk:open`

**Request Body** (required)

**Sample Call**

```bash
epilot message threadBulkActionsOpen \
  -d '{"ids":["6b299eda-4018-4554-8965-c4b5598e6531"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot message threadBulkActionsOpen
```

With JSONata filter:

```bash
epilot message threadBulkActionsOpen --jsonata '$'
```

---

### `markReadThread`

Mark thread as read

`POST /v1/message/threads/{id}/read`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message markReadThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markReadThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markReadThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markReadThreadV2`

Mark thread as read within a scope

`POST /v2/message/threads/{id}/read`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message markReadThreadV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"scopes":["organization","user"]}'
```

Using positional args for path parameters:

```bash
epilot message markReadThreadV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message markReadThreadV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markReadThreadV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markUnreadThread`

Mark thread as unread

`POST /v1/message/threads/{id}/unread`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message markUnreadThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message markUnreadThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markUnreadThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `markUnreadThreadV2`

Mark thread as unread within a scope

`POST /v2/message/threads/{id}/unread`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message markUnreadThreadV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"scopes":["organization","user"]}'
```

Using positional args for path parameters:

```bash
epilot message markUnreadThreadV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message markUnreadThreadV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message markUnreadThreadV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `assignThread`

Assign thread to entities

`POST /v1/message/threads/{id}/assign`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message assignThread \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '[{"slug":"contact","entity_id":"3f34ce73-089c-4d45-a5ee-c161234e41c3","org_id":"206801","is_main_entity":true}]'
```

Using positional args for path parameters:

```bash
epilot message assignThread 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message assignThread -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message assignThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `unassignThread`

Unassign thread from entities

`POST /v1/message/threads/{id}/unassign`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |
| `unlink_mapped_entities` | query | boolean | No | When true, also removes unassigned entities from mapped_entities on related source entities |

**Request Body** (required)

**Sample Call**

```bash
epilot message unassignThread \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '[{"slug":"contact","entity_id":"3f34ce73-089c-4d45-a5ee-c161234e41c3"}]'
```

Using positional args for path parameters:

```bash
epilot message unassignThread 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message unassignThread -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message unassignThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `assignUsers`

Assign users to thread for receiving notifications.

`POST /v1/message/threads/{id}/assign:users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message assignUsers \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"assigned_to":["206801"]}'
```

Using positional args for path parameters:

```bash
epilot message assignUsers 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message assignUsers -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message assignUsers -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `assignUsersV2`

Assign users to thread.

`POST /v2/message/threads/{id}/assign:users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Request Body** (required)

**Sample Call**

```bash
epilot message assignUsersV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"add":["206801"],"remove":["206801"]}'
```

Using positional args for path parameters:

```bash
epilot message assignUsersV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot message assignUsersV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message assignUsersV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `pinThread`

Pin a single thread

`POST /v1/message/threads/{id}:pin`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message pinThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message pinThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message pinThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `unpinThread`

Unpin a single thread

`DELETE /v1/message/threads/{id}:pin`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Thread ID |

**Sample Call**

```bash
epilot message unpinThread \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot message unpinThread 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot message unpinThread -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `createDraft`

Create a new draft

`POST /v1/message/drafts`

**Request Body**

**Sample Call**

```bash
epilot message createDraft \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot message createDraft
```

With JSONata filter:

```bash
epilot message createDraft --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
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
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "may_be_signature_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
  "send_status": ["SEND"],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `sendDraft`

Send the existing draft to the recipients

`POST /v1/message/drafts:send`

**Sample Call**

```bash
epilot message sendDraft
```

With JSONata filter:

```bash
epilot message sendDraft --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
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
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "may_be_signature_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
  "send_status": ["SEND"],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---

### `getMessageV2`

- Fetches message by ID

`GET /v2/message/messages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Message ID |

**Sample Call**

```bash
epilot message getMessageV2 \
  -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb
```

Using positional args for path parameters:

```bash
epilot message getMessageV2 4d74976d-fb64-47fd-85e2-65eea140f5eb
```

With JSONata filter:

```bash
epilot message getMessageV2 -p id=4d74976d-fb64-47fd-85e2-65eea140f5eb --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "html_omitted": false,
  "html_download_url": "https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html",
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["pricing", "INBOX"],
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
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "may_be_signature_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  },
  "references": "<0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "in_reply_to": "<CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>",
  "user_read_message": ["206801", "200109"],
  "org_read_message": ["789372", "210291"],
  "send_status": ["SEND"],
  "type": "SENT",
  "template_id": "3f34ce73-089c-4d45-a5ee-c161234e41c3"
}
```

</details>

---
