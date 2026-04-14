# Notes API

- **Base URL:** `https://notes.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/notes](https://docs.epilot.io/api/notes)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.notes.createNote(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/notes'

const notesClient = getClient()
authorize(notesClient, () => '<token>')
const { data } = await notesClient.createNote(...)
```

## Operations

**Notes**
- [`createNote`](#createnote)
- [`getNote`](#getnote)
- [`patchNote`](#patchnote)
- [`updateNote`](#updatenote)
- [`deleteNote`](#deletenote)
- [`searchNotesByContext`](#searchnotesbycontext)
- [`getNoteContexts`](#getnotecontexts)

**Pinning**
- [`pinNote`](#pinnote)

**Reactions**
- [`addNoteReaction`](#addnotereaction)
- [`removeNoteReaction`](#removenotereaction)
- [`toggleNoteReactions`](#togglenotereactions)

**Schemas**
- [`NotePostRequestBody`](#notepostrequestbody)
- [`ContextType`](#contexttype)
- [`NoteEntity`](#noteentity)
- [`Entity`](#entity)
- [`CreatedByType`](#createdbytype)
- [`NoteGetRequestResponse`](#notegetrequestresponse)
- [`NotePatchRequestBody`](#notepatchrequestbody)
- [`NonHydratedNoteEntity`](#nonhydratednoteentity)
- [`NoteEntityParent`](#noteentityparent)
- [`NotePutRequestBody`](#noteputrequestbody)
- [`NoteSearchByContextRequestBody`](#notesearchbycontextrequestbody)
- [`NotesSearchRequestResponse`](#notessearchrequestresponse)
- [`NoteContexts`](#notecontexts)
- [`WorkflowExecution`](#workflowexecution)
- [`ReactionRequest`](#reactionrequest)
- [`ToggleReactionsRequest`](#togglereactionsrequest)

### `createNote`

Creates a new Note entry

`POST /v1/note`

```ts
const { data } = await client.createNote(
  null,
  {
    _tags: ['string'],
    type: 'string',
    entity_id: 'string',
    parent_id: 'string',
    contexts: [
      {
        type: 'workflow_execution',
        id: 'string'
      }
    ],
    additional_contexts: [
      {
        type: 'workflow_execution',
        id: 'string'
      }
    ],
    content: 'string',
    attachments: ['string'],
    read_by: ['string']
  },
)
```

---

### `getNote`

Retrieves a single Note entry based on it's Entity ID

`GET /v1/note/{id}`

```ts
const { data } = await client.getNote({
  id: '123e4567-e89b-12d3-a456-426614174000',
  hydrate: true,
})
```

---

### `patchNote`

Updates an existing Note entry

`PATCH /v1/note/{id}`

```ts
const { data } = await client.patchNote({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `updateNote`

Updates an existing Note entry

`PUT /v1/note/{id}`

```ts
const { data } = await client.updateNote(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: 'string',
    _org: 'string',
    _schema: 'string',
    _created_at: '1970-01-01T00:00:00.000Z',
    _updated_at: '1970-01-01T00:00:00.000Z',
    _created_by: 'string',
    _tags: ['string'],
    _acl: {},
    _owners: [
      {
        org_id: 'string',
        user_id: 'string'
      }
    ],
    type: 'string',
    context_entities: {
      $relation: [
        {
          entity_id: 'string'
        }
      ]
    },
    parent: {
      $relation: [
        {
          entity_id: 'string'
        }
      ]
    },
    attachments: {
      $relation: [
        {
          entity_id: 'string'
        }
      ]
    },
    content: 'string',
    contexts: [
      {
        type: 'workflow_execution',
        id: 'string'
      }
    ],
    pinned_at: '1970-01-01T00:00:00.000Z',
    created_by: {
      type: 'user',
      user_id: 'string',
      display_name: 'string',
      org_id: 'string',
      email: 'string',
      phone: 'string'
    },
    read_by: ['string'],
    reactions: {}
  },
)
```

---

### `deleteNote`

Deletes a single Note entry based on it's Entity ID

`DELETE /v1/note/{id}`

```ts
const { data } = await client.deleteNote({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `searchNotesByContext`

Search for a paginated list of Notes based on one or more contexts

`POST /v1/notes:search`

```ts
const { data } = await client.searchNotesByContext(
  null,
  {
    contexts: [
      {
        type: 'workflow_execution',
        id: 'string'
      }
    ],
    from: 0,
    size: 10
  },
)
```

---

### `pinNote`

Pins a single Note entry based on it's Entity ID

`POST /v1/note/{id}/pin`

```ts
const { data } = await client.pinNote({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getNoteContexts`

Gets all the Entity and non-Entity records the Note is contextually attached to

`GET /v1/note/{id}/context`

```ts
const { data } = await client.getNoteContexts({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "type": "workflow_execution",
    "context": {
      "_id": "string",
      "_org": "string",
      "_schema": "string",
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z",
      "_created_by": "string",
      "_tags": ["string"],
      "_acl": {},
      "_owners": [
        {
          "org_id": "string",
          "user_id": "string"
        }
      ],
      "type": "string"
    }
  }
]
```

</details>

---

### `addNoteReaction`

Adds an emoji reaction to a note

`POST /v1/note/{id}/reaction`

```ts
const { data } = await client.addNoteReaction(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    emoji: 'thumbs-up'
  },
)
```

---

### `removeNoteReaction`

Removes an emoji reaction from a note

`DELETE /v1/note/{id}/reaction/{emoji_shortcode}`

```ts
const { data } = await client.removeNoteReaction({
  id: '123e4567-e89b-12d3-a456-426614174000',
  emoji_shortcode: 'example',
})
```

---

### `toggleNoteReactions`

Toggles multiple emoji reactions on a note. If a user has already reacted with an emoji, it removes the reaction. If a user hasn't reacted with an emoji, it adds the reaction.

`POST /v1/note/{id}/reactions/toggle`

```ts
const { data } = await client.toggleNoteReactions(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    emojis: ['thumbs-up', 'heart']
  },
)
```

---

## Schemas

### `NotePostRequestBody`

```ts
type NotePostRequestBody = {
  _tags?: string[]
  type?: string
  entity_id?: string
  parent_id?: string
  contexts?: Array<{
    type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
    id: string
  }>
  additional_contexts?: Array<{
    type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
    id: string
  }>
  content?: string
  attachments?: string[]
  read_by?: string[]
}
```

### `ContextType`

```ts
type ContextType = "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
```

### `NoteEntity`

A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place.

```ts
type NoteEntity = {
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}
```

### `Entity`

Base Entity schema

```ts
type Entity = {
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}
```

### `CreatedByType`

```ts
type CreatedByType = "user" | "group"
```

### `NoteGetRequestResponse`

```ts
type NoteGetRequestResponse = {
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}
```

### `NotePatchRequestBody`

```ts
type NotePatchRequestBody = {
  _tags?: string[]
  type?: string
  attachments?: {
    $relation?: Array<{
      entity_id: { ... }
    }>
  }
  comments?: Array<{
    _id: string
    _org?: string
    _schema?: string
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _created_by?: string | number
    _tags?: string[]
    _acl?: Record<string, string[]>
    _owners?: Array<{
      org_id: { ... }
      user_id: { ... }
    }>
    type?: string
  }>
  content?: string
  contexts?: Array<{
    type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
    id: string
  }>
  pinned_at?: string // date-time
  created_by?: {
    type: "user" | "group"
    user_id?: string
    display_name?: string
    org_id?: string
    email?: string
    phone?: string
  }
  read_by?: string[]
  reactions?: Record<string, string[]>
}
```

### `NonHydratedNoteEntity`

A note Entity object cotaining Entity metadata and content. Relational attributes are not hydrated in place.

```ts
type NonHydratedNoteEntity = {
  _id: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
}
```

### `NoteEntityParent`

The Note's parent Note

```ts
type NoteEntityParent = {
  $relation?: Array<{
    entity_id: string
  }>
}
```

### `NotePutRequestBody`

```ts
type NotePutRequestBody = {
  _id?: string
  _org?: string
  _schema?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _created_by?: string | number
  _tags?: string[]
  _acl?: Record<string, string[]>
  _owners?: Array<{
    org_id: string
    user_id: string
  }>
  type?: string
  context_entities?: {
    $relation: Array<{
      entity_id: { ... }
    }>
  }
  parent?: {
    $relation?: Array<{
      entity_id: { ... }
    }>
  }
  attachments?: {
    $relation?: Array<{
      entity_id: { ... }
    }>
  }
  content?: string
  contexts?: Array<{
    type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
    id: string
  }>
  pinned_at?: string // date-time
  created_by?: {
    type: "user" | "group"
    user_id?: string
    display_name?: string
    org_id?: string
    email?: string
    phone?: string
  }
  read_by?: string[]
  reactions?: Record<string, string[]>
}
```

### `NoteSearchByContextRequestBody`

```ts
type NoteSearchByContextRequestBody = {
  contexts: Array<{
    type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
    id: string
  }>
  from?: number
  size?: number
}
```

### `NotesSearchRequestResponse`

```ts
type NotesSearchRequestResponse = {
  hits?: number
  results: Array<{
    _id: string
    _org?: string
    _schema?: string
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _created_by?: string | number
    _tags?: string[]
    _acl?: Record<string, string[]>
    _owners?: Array<{
      org_id: { ... }
      user_id: { ... }
    }>
    type?: string
  }>
}
```

### `NoteContexts`

List of resolved Entity and non-Entity contexts attached to a given Note.

```ts
type NoteContexts = {
  type: "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity"
  context: {
    _id: string
    _org?: string
    _schema?: string
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _created_by?: string | number
    _tags?: string[]
    _acl?: Record<string, string[]>
    _owners?: Array<{
      org_id: { ... }
      user_id: { ... }
    }>
    type?: string
  } | {
    id: string
    definitionId: string
    orgId: string
    name: string
  }
}
```

### `WorkflowExecution`

Base metadata for a Workflow Execution. This is a lightweight representation of a Workflow Execution, and does not contain all it's data

```ts
type WorkflowExecution = {
  id: string
  definitionId: string
  orgId: string
  name: string
}
```

### `ReactionRequest`

```ts
type ReactionRequest = {
  emoji: string
}
```

### `ToggleReactionsRequest`

```ts
type ToggleReactionsRequest = {
  emojis: string[]
}
```
