# Target API

- **Base URL:** `https://target.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/target](https://docs.epilot.io/api/target)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.target.createTarget(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/target'

const targetClient = getClient()
authorize(targetClient, () => '<token>')
const { data } = await targetClient.createTarget(...)
```

## Operations

**Target**
- [`createTarget`](#createtarget)
- [`getTarget`](#gettarget)
- [`deleteTarget`](#deletetarget)
- [`patchTarget`](#patchtarget)
- [`updateTarget`](#updatetarget)

**Schemas**
- [`BaseError`](#baseerror)
- [`ServerError`](#servererror)
- [`ClientError`](#clienterror)
- [`BaseUUID`](#baseuuid)
- [`BaseTags`](#basetags)
- [`BasePurpose`](#basepurpose)
- [`BaseRelation`](#baserelation)
- [`BaseEntityOwner`](#baseentityowner)
- [`BaseEntityAcl`](#baseentityacl)
- [`BaseSystemFields`](#basesystemfields)
- [`BaseSystemReadonlyFields`](#basesystemreadonlyfields)
- [`BaseSystemFieldsRequired`](#basesystemfieldsrequired)
- [`BaseTarget`](#basetarget)
- [`BaseTargetRequired`](#basetargetrequired)
- [`Target`](#target)
- [`TargetCreate`](#targetcreate)
- [`TargetPatch`](#targetpatch)

### `createTarget`

Create a new target entity

`POST /v1/target`

```ts
const { data } = await client.createTarget(
  null,
  {
    _schema: 'target',
    name: 'string',
    description: 'string',
    entity_schema: 'string',
    entity_filters: {
      filter: {
        items: [
          {
            key: 'string',
            operator: 'string',
            value: 'string'
          }
        ],
        combination: 'string'
      }
    },
    _tags: ['string'],
    _purpose: ['string'],
    _files: {
      $relation: [
        {
          entity_id: '123e4567-e89b-12d3-a456-426614174000',
          _tags: ['string']
        }
      ]
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    __additional: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `getTarget`

Read a specific target entity by a given id

`GET /v1/target/{targetId}`

```ts
const { data } = await client.getTarget({
  targetId: 'example',
  hydrate: true,
  strict: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `deleteTarget`

Delete a specific target entity by a given id

`DELETE /v1/target/{targetId}`

```ts
const { data } = await client.deleteTarget({
  targetId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `patchTarget`

Partially update a specific target entity's properties by a given id and a given payload

`PATCH /v1/target/{targetId}`

```ts
const { data } = await client.patchTarget(
  {
    targetId: 'example',
  },
  {
    _schema: 'target',
    name: 'string',
    description: 'string',
    entity_schema: 'string',
    entity_filters: {
      filter: {
        items: [
          {
            key: 'string',
            operator: 'string',
            value: 'string'
          }
        ],
        combination: 'string'
      }
    },
    _tags: ['string'],
    _purpose: ['string'],
    _files: {
      $relation: [
        {
          entity_id: '123e4567-e89b-12d3-a456-426614174000',
          _tags: ['string']
        }
      ]
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    __additional: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

### `updateTarget`

Completly replace a specific target entity's properties by a given id and a given payload

`PUT /v1/target/{targetId}`

```ts
const { data } = await client.updateTarget(
  {
    targetId: 'example',
  },
  {
    _schema: 'target',
    name: 'string',
    description: 'string',
    entity_schema: 'string',
    entity_filters: {
      filter: {
        items: [
          {
            key: 'string',
            operator: 'string',
            value: 'string'
          }
        ],
        combination: 'string'
      }
    },
    _tags: ['string'],
    _purpose: ['string'],
    _files: {
      $relation: [
        {
          entity_id: '123e4567-e89b-12d3-a456-426614174000',
          _tags: ['string']
        }
      ]
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    __additional: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_id": "123e4567-e89b-12d3-a456-426614174000",
  "_schema": "target",
  "_org": "string",
  "_tags": ["string"],
  "_files": {
    "$relation": [
      {
        "entity_id": "123e4567-e89b-12d3-a456-426614174000",
        "_tags": ["string"]
      }
    ]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_title": "string",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "name": "string",
  "description": "string",
  "entity_schema": "string",
  "entity_filters": {
    "filter": {
      "items": [
        {
          "key": "string",
          "operator": "string",
          "value": "string"
        }
      ],
      "combination": "string"
    }
  },
  "_purpose": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "__additional": {}
}
```

</details>

---

## Schemas

### `BaseError`

```ts
type BaseError = {
  status: number
  message: string
}
```

### `ServerError`

```ts
type ServerError = {
  status: number
  message: string
}
```

### `ClientError`

```ts
type ClientError = {
  status: number
  message: string
}
```

### `BaseUUID`

```ts
type BaseUUID = string // uuid
```

### `BaseTags`

```ts
type BaseTags = string[]
```

### `BasePurpose`

```ts
type BasePurpose = string[]
```

### `BaseRelation`

```ts
type BaseRelation = {
  $relation?: Array<{
    entity_id?: string // uuid
    _tags?: string[]
  }>
}
```

### `BaseEntityOwner`

The user / organization owning this entity.

Note: Owner implicitly has access to the entity regardless of ACLs.


```ts
type BaseEntityOwner = {
  org_id: string
  user_id?: string
}
```

### `BaseEntityAcl`

Access control list (ACL) for an entity. Defines sharing access to external orgs or users.

```ts
type BaseEntityAcl = {
  view?: string[]
  edit?: string[]
  delete?: string[]
}
```

### `BaseSystemFields`

```ts
type BaseSystemFields = {
  _tags?: string[]
  _purpose?: string[]
  _files?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _manifest?: string // uuid[]
  __additional?: Record<string, unknown>
}
```

### `BaseSystemReadonlyFields`

```ts
type BaseSystemReadonlyFields = {
  _id?: string // uuid
  _schema?: string
  _org?: string
  _tags?: string[]
  _files?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _title?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
}
```

### `BaseSystemFieldsRequired`

```ts
type BaseSystemFieldsRequired = object
```

### `BaseTarget`

```ts
type BaseTarget = {
  _schema?: "target"
  name?: string
  description?: string
  entity_schema?: string
  entity_filters?: {
    filter?: {
      items?: { ... }
      combination?: { ... }
    }
  }
}
```

### `BaseTargetRequired`

```ts
type BaseTargetRequired = object
```

### `Target`

```ts
type Target = {
  _id?: string // uuid
  _schema: "target"
  _org: string
  _tags?: string[]
  _files?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _title?: string
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  name: string
  description?: string
  entity_schema?: string
  entity_filters?: {
    filter?: {
      items?: { ... }
      combination?: { ... }
    }
  }
  _purpose?: string[]
  _manifest?: string // uuid[]
  __additional?: Record<string, unknown>
}
```

### `TargetCreate`

```ts
type TargetCreate = {
  _schema?: "target"
  name: string
  description?: string
  entity_schema?: string
  entity_filters?: {
    filter?: {
      items?: { ... }
      combination?: { ... }
    }
  }
  _tags?: string[]
  _purpose?: string[]
  _files?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _manifest?: string // uuid[]
  __additional?: Record<string, unknown>
}
```

### `TargetPatch`

```ts
type TargetPatch = {
  _schema?: "target"
  name?: string
  description?: string
  entity_schema?: string
  entity_filters?: {
    filter?: {
      items?: { ... }
      combination?: { ... }
    }
  }
  _tags?: string[]
  _purpose?: string[]
  _files?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _manifest?: string // uuid[]
  __additional?: Record<string, unknown>
}
```
