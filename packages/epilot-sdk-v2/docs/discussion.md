# Discussion API

- **Base URL:** `https://discussion.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/discussion](https://docs.epilot.io/api/discussion)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.discussion.createComment(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/discussion'

const discussionClient = await getClient()
authorize(discussionClient, () => '<token>')
const { data } = await discussionClient.createComment(...)
```

## Operations

**Comments**
- [`createComment`](#createcomment)
- [`updateComment`](#updatecomment)
- [`getComment`](#getcomment)
- [`deleteComment`](#deletecomment)

**Threads**
- [`getThreadsByContext`](#getthreadsbycontext)
- [`getThreadComments`](#getthreadcomments)

**Users**
- [`getMentionableUsers`](#getmentionableusers)

### `createComment`

Create comment

`POST /v1/comments`

```ts
const { data } = await client.createComment(
  null,
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    context_id: 'd9159a41-1311-47fd-b026-b59401f3bf87',
    thread_id: '6a838adf-a579-4ffd-9e6c-630a09fa025a',
    title: 'Discussion',
    content: 'I want to trigger a discussion about when we delivery the facilities to customer.',
    attachments: [
      {
        id: '70432e1d-eadc-4995-937c-2604637bbaae',
        filename: 'document.pdf',
        mime_type: 'application/pdf',
        public_url: 'https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf',
        s3ref: { /* ... */ }
      }
    ],
    reactions: [
      {
        emoji: 'like',
        user_id: 12345
      }
    ],
    edited_at: '2021-02-10T09:14:31.990Z',
    _tags: [
      'automatic email template',
      'comment'
    ],
    created_by: 1234,
    _created_at: '2021-02-09T12:41:43.662Z',
    updated_by: 1234,
    _updated_at: '2021-02-10T09:14:31.990Z',
    _title: 'string',
    _org: '206801',
    _schema: 'message'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "context_id": "d9159a41-1311-47fd-b026-b59401f3bf87",
  "thread_id": "6a838adf-a579-4ffd-9e6c-630a09fa025a",
  "title": "Discussion",
  "content": "I want to trigger a discussion about when we delivery the facilities to customer.",
  "attachments": [
    {
      "id": "70432e1d-eadc-4995-937c-2604637bbaae",
      "filename": "document.pdf",
      "mime_type": "application/pdf",
      "public_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
      "s3ref": {}
    }
  ],
  "reactions": [
    {
      "emoji": "like",
      "user_id": 12345
    }
  ],
  "edited_at": "2021-02-10T09:14:31.990Z",
  "_tags": [
    "automatic email template",
    "comment"
  ],
  "created_by": 1234,
  "_created_at": "2021-02-09T12:41:43.662Z",
  "updated_by": 1234,
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_title": "string",
  "_org": "206801",
  "_schema": "message"
}
```

</details>

---

### `updateComment`

Update comment

`PUT /v1/comments/{id}`

```ts
const { data } = await client.updateComment(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    context_id: 'd9159a41-1311-47fd-b026-b59401f3bf87',
    thread_id: '6a838adf-a579-4ffd-9e6c-630a09fa025a',
    title: 'Discussion',
    content: 'I want to trigger a discussion about when we delivery the facilities to customer.',
    attachments: [
      {
        id: '70432e1d-eadc-4995-937c-2604637bbaae',
        filename: 'document.pdf',
        mime_type: 'application/pdf',
        public_url: 'https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf',
        s3ref: { /* ... */ }
      }
    ],
    reactions: [
      {
        emoji: 'like',
        user_id: 12345
      }
    ],
    edited_at: '2021-02-10T09:14:31.990Z',
    _tags: [
      'automatic email template',
      'comment'
    ],
    created_by: 1234,
    _created_at: '2021-02-09T12:41:43.662Z',
    updated_by: 1234,
    _updated_at: '2021-02-10T09:14:31.990Z',
    _title: 'string',
    _org: '206801',
    _schema: 'message'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "context_id": "d9159a41-1311-47fd-b026-b59401f3bf87",
  "thread_id": "6a838adf-a579-4ffd-9e6c-630a09fa025a",
  "title": "Discussion",
  "content": "I want to trigger a discussion about when we delivery the facilities to customer.",
  "attachments": [
    {
      "id": "70432e1d-eadc-4995-937c-2604637bbaae",
      "filename": "document.pdf",
      "mime_type": "application/pdf",
      "public_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
      "s3ref": {}
    }
  ],
  "reactions": [
    {
      "emoji": "like",
      "user_id": 12345
    }
  ],
  "edited_at": "2021-02-10T09:14:31.990Z",
  "_tags": [
    "automatic email template",
    "comment"
  ],
  "created_by": 1234,
  "_created_at": "2021-02-09T12:41:43.662Z",
  "updated_by": 1234,
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_title": "string",
  "_org": "206801",
  "_schema": "message"
}
```

</details>

---

### `getComment`

Get comment

`GET /v1/comments/{id}`

```ts
const { data } = await client.getComment({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "context_id": "d9159a41-1311-47fd-b026-b59401f3bf87",
  "thread_id": "6a838adf-a579-4ffd-9e6c-630a09fa025a",
  "title": "Discussion",
  "content": "I want to trigger a discussion about when we delivery the facilities to customer.",
  "attachments": [
    {
      "id": "70432e1d-eadc-4995-937c-2604637bbaae",
      "filename": "document.pdf",
      "mime_type": "application/pdf",
      "public_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
      "s3ref": {}
    }
  ],
  "reactions": [
    {
      "emoji": "like",
      "user_id": 12345
    }
  ],
  "edited_at": "2021-02-10T09:14:31.990Z",
  "_tags": [
    "automatic email template",
    "comment"
  ],
  "created_by": 1234,
  "_created_at": "2021-02-09T12:41:43.662Z",
  "updated_by": 1234,
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_title": "string",
  "_org": "206801",
  "_schema": "message"
}
```

</details>

---

### `deleteComment`

Delete comment

`DELETE /v1/comments/{id}`

```ts
const { data } = await client.deleteComment({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getThreadsByContext`

Get threads by context

`GET /v1/contexts/{id}/threads`

```ts
const { data } = await client.getThreadsByContext({
  id: '123e4567-e89b-12d3-a456-426614174000',
  limit: 1,
  offset: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "hits": 15,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "context_id": "d9159a41-1311-47fd-b026-b59401f3bf87",
      "thread_id": "6a838adf-a579-4ffd-9e6c-630a09fa025a",
      "title": "Discussion",
      "content": "I want to trigger a discussion about when we delivery the facilities to customer.",
      "attachments": [],
      "reactions": [],
      "edited_at": "2021-02-10T09:14:31.990Z",
      "_tags": [],
      "created_by": 1234,
      "_created_at": "2021-02-09T12:41:43.662Z",
      "updated_by": 1234,
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "_title": "string",
      "_org": "206801",
      "_schema": "message"
    }
  ]
}
```

</details>

---

### `getMentionableUsers`

Get list of users for mention list of a context.

`GET /v1/contexts/{id}/mentionableUsers`

```ts
const { data } = await client.getMentionableUsers({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "id": "12345",
    "organization_id": "23456",
    "created_at": "2022-02-08T04:44:32.246Z",
    "display_name": "Example User",
    "status": "Active",
    "email": "user@example.com",
    "draft_email": "user@example.com",
    "phone": 1234567890,
    "preferred_language": "de",
    "token": "65dc527f-cb2d-4158-8f2e-8978dbceb599",
    "signature": "<p>Thanks</p>",
    "is_signature_enabled": true,
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "properties": [
      {}
    ]
  }
]
```

</details>

---

### `getThreadComments`

Get thread comments

`GET /v1/threads/{id}`

```ts
const { data } = await client.getThreadComments({
  id: '123e4567-e89b-12d3-a456-426614174000',
  limit: 1,
  offset: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "hits": 15,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "context_id": "d9159a41-1311-47fd-b026-b59401f3bf87",
      "thread_id": "6a838adf-a579-4ffd-9e6c-630a09fa025a",
      "title": "Discussion",
      "content": "I want to trigger a discussion about when we delivery the facilities to customer.",
      "attachments": [],
      "reactions": [],
      "edited_at": "2021-02-10T09:14:31.990Z",
      "_tags": [],
      "created_by": 1234,
      "_created_at": "2021-02-09T12:41:43.662Z",
      "updated_by": 1234,
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "_title": "string",
      "_org": "206801",
      "_schema": "message"
    }
  ]
}
```

</details>

---

<details>
<summary>Schemas</summary>

### `BaseEntity`

```ts
type BaseEntity = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
}
```

### `Comment`

```ts
type Comment = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
}
```

### `Attachment`

```ts
type Attachment = {
  id?: string
  filename?: string
  mime_type?: string
  public_url?: string
  s3ref?: {
    bucket?: string
    key?: string
  }
}
```

### `User`

```ts
type User = {
  id?: string
  organization_id?: string
  created_at?: string
  display_name?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  email?: string // email
  draft_email?: string // email
  phone?: string
  preferred_language?: string
  token?: string
  signature?: string
  is_signature_enabled?: boolean
  image_uri?: {
    original?: string // uri
    thumbnail_32?: string // uri
  }
  properties?: Array<{
    name: string
    value: string
  }>
}
```

### `Reaction`

```ts
type Reaction = {
  emoji?: string
  user_id?: number
}
```

</details>