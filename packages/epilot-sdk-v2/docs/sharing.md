# Sharing API

- **Base URL:** `https://sharing-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/sharing](https://docs.epilot.io/api/sharing)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.sharing.getSharingConfiguration(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/sharing'

const sharingClient = getClient()
authorize(sharingClient, () => '<token>')
const { data } = await sharingClient.getSharingConfiguration(...)
```

## Operations

**Sharing Configuration**
- [`getSharingConfiguration`](#getsharingconfiguration)
- [`updateSharingConfiguration`](#updatesharingconfiguration)
- [`deleteSharingConfiguration`](#deletesharingconfiguration)
- [`assignRoleToConfiguration`](#assignroletoconfiguration)
- [`getSharingConfigurations`](#getsharingconfigurations)
- [`searchPartnerSharingConfigurations`](#searchpartnersharingconfigurations)
- [`getConfigurationsByTemplateRole`](#getconfigurationsbytemplaterole)

**Entity Sharing**
- [`shareEntityWithPartners`](#shareentitywithpartners)
- [`shareChildEntityWithPartners`](#sharechildentitywithpartners)

**Entity Offering**
- [`offerEntityToPartners`](#offerentitytopartners)
- [`getOfferStatus`](#getofferstatus)
- [`acceptOffer`](#acceptoffer)

**Schemas**
- [`PartnerSharingConfig`](#partnersharingconfig)
- [`PartnerStatus`](#partnerstatus)
- [`EntityResource`](#entityresource)
- [`OfferEntityResource`](#offerentityresource)
- [`TemplateRoleGrant`](#templaterolegrant)
- [`OfferStatus`](#offerstatus)
- [`PartialEntity`](#partialentity)
- [`OfferStatusEnum`](#offerstatusenum)
- [`EntityResourceInput`](#entityresourceinput)
- [`OfferEntityResourceInput`](#offerentityresourceinput)
- [`UpdateSharingConfigurationPayload`](#updatesharingconfigurationpayload)
- [`AssignRolePayload`](#assignrolepayload)
- [`SearchSharingConfigurationsPayload`](#searchsharingconfigurationspayload)
- [`SharingEntityPayload`](#sharingentitypayload)
- [`PartnerEntitiesInput`](#partnerentitiesinput)
- [`ShareChildEntityPayload`](#sharechildentitypayload)
- [`PartnerEntityInput`](#partnerentityinput)
- [`OfferEntityPayload`](#offerentitypayload)
- [`PartnerOfferedEntitiesInput`](#partnerofferedentitiesinput)
- [`AcceptOfferPayload`](#acceptofferpayload)

### `getSharingConfiguration`

Get sharing configuration for a partner

`GET /v1/sharing/configurations/{partner_org_id}`

```ts
const { data } = await client.getSharingConfiguration({
  partner_org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "sharing_org_id": "string",
  "partner_org_id": "string",
  "users": ["string"],
  "partner_status": "REGISTERED",
  "entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_accepted": true,
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "offered_entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_status": "EXPIRED",
      "offered_by_user_id": "string",
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "template_role_id": "string",
  "template_role_grants": [
    {
      "action": "string",
      "resource": "string",
      "effect": "string"
    }
  ],
  "generated_role_id": "string",
  "user_limit": 0,
  "created_at": "string",
  "updated_at": "string"
}
```

</details>

---

### `updateSharingConfiguration`

Update sharing configuration for a partner

`PATCH /v1/sharing/configurations/{partner_org_id}`

```ts
const { data } = await client.updateSharingConfiguration(
  {
    partner_org_id: 'example',
  },
  {
    user_limit: 0
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "sharing_org_id": "string",
  "partner_org_id": "string",
  "users": ["string"],
  "partner_status": "REGISTERED",
  "entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_accepted": true,
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "offered_entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_status": "EXPIRED",
      "offered_by_user_id": "string",
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "template_role_id": "string",
  "template_role_grants": [
    {
      "action": "string",
      "resource": "string",
      "effect": "string"
    }
  ],
  "generated_role_id": "string",
  "user_limit": 0,
  "created_at": "string",
  "updated_at": "string"
}
```

</details>

---

### `deleteSharingConfiguration`

Delete sharing configuration for a partner

`DELETE /v1/sharing/configurations/{partner_org_id}`

```ts
const { data } = await client.deleteSharingConfiguration({
  partner_org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "sharing_org_id": "string",
  "partner_org_id": "string",
  "users": ["string"],
  "partner_status": "REGISTERED",
  "entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_accepted": true,
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "offered_entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_status": "EXPIRED",
      "offered_by_user_id": "string",
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "template_role_id": "string",
  "template_role_grants": [
    {
      "action": "string",
      "resource": "string",
      "effect": "string"
    }
  ],
  "generated_role_id": "string",
  "user_limit": 0,
  "created_at": "string",
  "updated_at": "string"
}
```

</details>

---

### `assignRoleToConfiguration`

Assign a template role to a partner sharing configuration

`PUT /v1/sharing/configurations/{partner_org_id}/role`

```ts
const { data } = await client.assignRoleToConfiguration(
  {
    partner_org_id: 'example',
  },
  {
    template_role_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "sharing_org_id": "string",
  "partner_org_id": "string",
  "users": ["string"],
  "partner_status": "REGISTERED",
  "entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_accepted": true,
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "offered_entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_status": "EXPIRED",
      "offered_by_user_id": "string",
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "template_role_id": "string",
  "template_role_grants": [
    {
      "action": "string",
      "resource": "string",
      "effect": "string"
    }
  ],
  "generated_role_id": "string",
  "user_limit": 0,
  "created_at": "string",
  "updated_at": "string"
}
```

</details>

---

### `getSharingConfigurations`

Get sharing configurations for multiple partners

`GET /v1/sharing/configurations`

```ts
const { data } = await client.getSharingConfigurations({
  partner_org_ids: ['...'],
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `searchPartnerSharingConfigurations`

Search partner sharing configurations by entities

`POST /v1/sharing/configurations:search`

```ts
const { data } = await client.searchPartnerSharingConfigurations(
  null,
  {
    entities: [
      {
        schema: 'string',
        entity_id: 'string',
        parent_entity_id: 'string',
        offer_accepted: true
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `getConfigurationsByTemplateRole`

Get sharing configurations that use a specific template role

`GET /v1/sharing/configurations/by-role/{template_role_id}`

```ts
const { data } = await client.getConfigurationsByTemplateRole({
  template_role_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `shareEntityWithPartners`

Share or unshare entities with partners

`POST /v1/sharing/entities:share`

```ts
const { data } = await client.shareEntityWithPartners(
  null,
  {
    share: [
      {
        partner_org_id: 'string',
        entities: [
          {
            schema: 'string',
            entity_id: 'string',
            parent_entity_id: 'string',
            offer_accepted: true
          }
        ]
      }
    ],
    unshare: [
      {
        partner_org_id: 'string',
        entities: [
          {
            schema: 'string',
            entity_id: 'string',
            parent_entity_id: 'string',
            offer_accepted: true
          }
        ]
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `shareChildEntityWithPartners`

Share or unshare child entities with partners

`POST /v1/sharing/entities:share-child`

```ts
const { data } = await client.shareChildEntityWithPartners(
  null,
  {
    share: [
      {
        entity: {
          schema: 'string',
          entity_id: 'string',
          parent_entity_id: 'string',
          offer_accepted: true
        },
        partner_org_id: 'string'
      }
    ],
    unshare: [
      {
        entity: {
          schema: 'string',
          entity_id: 'string',
          parent_entity_id: 'string',
          offer_accepted: true
        },
        partner_org_id: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `offerEntityToPartners`

Offer or unoffer entities to partners (First Come First Served)

`POST /v1/sharing/entities:offer`

```ts
const { data } = await client.offerEntityToPartners(
  null,
  {
    offer: [
      {
        partner_org_id: 'string',
        offered_entities: [
          {
            schema: 'string',
            entity_id: 'string',
            parent_entity_id: 'string'
          }
        ]
      }
    ],
    unoffer: [
      {
        partner_org_id: 'string',
        offered_entities: [
          {
            schema: 'string',
            entity_id: 'string',
            parent_entity_id: 'string'
          }
        ]
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "sharing_org_id": "string",
    "partner_org_id": "string",
    "users": ["string"],
    "partner_status": "REGISTERED",
    "entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true,
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "offered_entities": [
      {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_status": "EXPIRED",
        "offered_by_user_id": "string",
        "updated_at": "string",
        "created_at": "string"
      }
    ],
    "template_role_id": "string",
    "template_role_grants": [
      {
        "action": "string",
        "resource": "string",
        "effect": "string"
      }
    ],
    "generated_role_id": "string",
    "user_limit": 0,
    "created_at": "string",
    "updated_at": "string"
  }
]
```

</details>

---

### `getOfferStatus`

Get the status of an entity offer (public, no auth required)

`GET /v1/sharing/offers/status`

```ts
const { data } = await client.getOfferStatus({
  partner_org_id: 'example',
  sharing_org_id: 'example',
  entity_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "entity": {
    "_schema": "string",
    "_id": "string",
    "_title": "string",
    "_created_at": "string",
    "_updated_at": "string"
  },
  "offer_status": "EXPIRED",
  "status_changed_at": "string",
  "offered_at": "string",
  "accepted_by_org_id": "string"
}
```

</details>

---

### `acceptOffer`

Accept an entity offer (public, no auth required)

`POST /v1/sharing/offers:accept`

```ts
const { data } = await client.acceptOffer(
  null,
  {
    partner_org_id: 'string',
    sharing_org_id: 'string',
    entity_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "sharing_org_id": "string",
  "partner_org_id": "string",
  "users": ["string"],
  "partner_status": "REGISTERED",
  "entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_accepted": true,
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "offered_entities": [
    {
      "schema": "string",
      "entity_id": "string",
      "parent_entity_id": "string",
      "offer_status": "EXPIRED",
      "offered_by_user_id": "string",
      "updated_at": "string",
      "created_at": "string"
    }
  ],
  "template_role_id": "string",
  "template_role_grants": [
    {
      "action": "string",
      "resource": "string",
      "effect": "string"
    }
  ],
  "generated_role_id": "string",
  "user_limit": 0,
  "created_at": "string",
  "updated_at": "string"
}
```

</details>

---

## Schemas

### `PartnerSharingConfig`

```ts
type PartnerSharingConfig = {
  sharing_org_id: string
  partner_org_id: string
  users?: string[]
  partner_status?: "REGISTERED" | "UNREGISTERED"
  entities?: Array<{
    schema: string
    entity_id: string
    parent_entity_id?: string
    offer_accepted?: boolean
    updated_at?: string
    created_at?: string
  }>
  offered_entities?: Array<{
    schema: string
    entity_id: string
    parent_entity_id?: string
    offer_status: "EXPIRED" | "UNAVAILABLE" | "PENDING" | "DECLINED" | "ACCEPTED"
    offered_by_user_id?: string
    updated_at?: string
    created_at?: string
  }>
  template_role_id?: string
  template_role_grants?: Array<{
    action: string
    resource: string
    effect?: string
  }>
  generated_role_id?: string
  user_limit?: number
  created_at?: string
  updated_at?: string
}
```

### `PartnerStatus`

```ts
type PartnerStatus = "REGISTERED" | "UNREGISTERED"
```

### `EntityResource`

```ts
type EntityResource = {
  schema: string
  entity_id: string
  parent_entity_id?: string
  offer_accepted?: boolean
  updated_at?: string
  created_at?: string
}
```

### `OfferEntityResource`

```ts
type OfferEntityResource = {
  schema: string
  entity_id: string
  parent_entity_id?: string
  offer_status: "EXPIRED" | "UNAVAILABLE" | "PENDING" | "DECLINED" | "ACCEPTED"
  offered_by_user_id?: string
  updated_at?: string
  created_at?: string
}
```

### `TemplateRoleGrant`

```ts
type TemplateRoleGrant = {
  action: string
  resource: string
  effect?: string
}
```

### `OfferStatus`

```ts
type OfferStatus = {
  entity: {
    _schema: string
    _id: string
    _title: string
    _created_at: string
    _updated_at: string
  }
  offer_status: "EXPIRED" | "UNAVAILABLE" | "PENDING" | "DECLINED" | "ACCEPTED"
  status_changed_at?: string
  offered_at?: string
  accepted_by_org_id?: string
}
```

### `PartialEntity`

```ts
type PartialEntity = {
  _schema: string
  _id: string
  _title: string
  _created_at: string
  _updated_at: string
}
```

### `OfferStatusEnum`

```ts
type OfferStatusEnum = "EXPIRED" | "UNAVAILABLE" | "PENDING" | "DECLINED" | "ACCEPTED"
```

### `EntityResourceInput`

```ts
type EntityResourceInput = {
  schema: string
  entity_id: string
  parent_entity_id?: string
  offer_accepted?: boolean
}
```

### `OfferEntityResourceInput`

```ts
type OfferEntityResourceInput = {
  schema: string
  entity_id: string
  parent_entity_id?: string
}
```

### `UpdateSharingConfigurationPayload`

```ts
type UpdateSharingConfigurationPayload = {
  user_limit?: number
}
```

### `AssignRolePayload`

```ts
type AssignRolePayload = {
  template_role_id: string
}
```

### `SearchSharingConfigurationsPayload`

```ts
type SearchSharingConfigurationsPayload = {
  entities: Array<{
    schema: string
    entity_id: string
    parent_entity_id?: string
    offer_accepted?: boolean
  }>
}
```

### `SharingEntityPayload`

```ts
type SharingEntityPayload = {
  share: Array<{
    partner_org_id: string
    entities: Array<{
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
      offer_accepted?: { ... }
    }>
  }>
  unshare: Array<{
    partner_org_id: string
    entities: Array<{
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
      offer_accepted?: { ... }
    }>
  }>
}
```

### `PartnerEntitiesInput`

```ts
type PartnerEntitiesInput = {
  partner_org_id: string
  entities: Array<{
    schema: string
    entity_id: string
    parent_entity_id?: string
    offer_accepted?: boolean
  }>
}
```

### `ShareChildEntityPayload`

```ts
type ShareChildEntityPayload = {
  share: Array<{
    entity: {
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
      offer_accepted?: { ... }
    }
    partner_org_id: string
  }>
  unshare: Array<{
    entity: {
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
      offer_accepted?: { ... }
    }
    partner_org_id: string
  }>
}
```

### `PartnerEntityInput`

```ts
type PartnerEntityInput = {
  entity: {
    schema: string
    entity_id: string
    parent_entity_id?: string
    offer_accepted?: boolean
  }
  partner_org_id: string
}
```

### `OfferEntityPayload`

```ts
type OfferEntityPayload = {
  offer: Array<{
    partner_org_id: string
    offered_entities: Array<{
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
    }>
  }>
  unoffer: Array<{
    partner_org_id: string
    offered_entities: Array<{
      schema: { ... }
      entity_id: { ... }
      parent_entity_id?: { ... }
    }>
  }>
}
```

### `PartnerOfferedEntitiesInput`

```ts
type PartnerOfferedEntitiesInput = {
  partner_org_id: string
  offered_entities: Array<{
    schema: string
    entity_id: string
    parent_entity_id?: string
  }>
}
```

### `AcceptOfferPayload`

```ts
type AcceptOfferPayload = {
  partner_org_id: string
  sharing_org_id: string
  entity_id: string
}
```
