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
- [`listSharingConfigurations`](#listsharingconfigurations)
- [`searchPartnerSharingConfigurations`](#searchpartnersharingconfigurations)
- [`getConfigurationsByTemplateRole`](#getconfigurationsbytemplaterole)

**Entity Sharing**
- [`shareEntityWithPartners`](#shareentitywithpartners)
- [`shareChildEntityWithPartners`](#sharechildentitywithpartners)
- [`getEntitySharingEvents`](#getentitysharingevents)

**Entity Offering**
- [`offerEntityToPartners`](#offerentitytopartners)
- [`getOfferStatus`](#getofferstatus)
- [`acceptOffer`](#acceptoffer)

**Sharing Rules**
- [`listSharingRules`](#listsharingrules)
- [`createSharingRule`](#createsharingrule)
- [`getSharingRule`](#getsharingrule)
- [`updateSharingRule`](#updatesharingrule)
- [`deleteSharingRule`](#deletesharingrule)

**Schemas**
- [`PartnerSharingConfig`](#partnersharingconfig)
- [`EntitySummary`](#entitysummary)
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
- [`SearchEntityResourceInput`](#searchentityresourceinput)
- [`SharingEntityPayload`](#sharingentitypayload)
- [`PartnerEntitiesInput`](#partnerentitiesinput)
- [`ShareChildEntityPayload`](#sharechildentitypayload)
- [`PartnerEntityInput`](#partnerentityinput)
- [`OfferEntityPayload`](#offerentitypayload)
- [`PartnerOfferedEntitiesInput`](#partnerofferedentitiesinput)
- [`AcceptOfferPayload`](#acceptofferpayload)
- [`SharingRuleInput`](#sharingruleinput)
- [`SharingRuleUpdate`](#sharingruleupdate)
- [`SharingRule`](#sharingrule)
- [`SharingRuleConditions`](#sharingruleconditions)
- [`Statement`](#statement)
- [`SharingRuleAiConfig`](#sharingruleaiconfig)
- [`EntitySharingEventsResponse`](#entitysharingeventsresponse)
- [`EntitySharingEvent`](#entitysharingevent)
- [`EntitySharingEventUser`](#entitysharingeventuser)
- [`EntitySharingEventEntity`](#entitysharingevententity)

### `getSharingConfiguration`

Returns the sharing configuration for a specific partner organization with its assigned users and an `entity_summary` of the shared and offered records. `entities` and `offered_entities` are not retur

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
  "updated_at": "string",
  "entity_summary": {
    "shared_total": 0,
    "offered_total": 0,
    "shared_by_schema": [
      {
        "schema": "string",
        "count": 0,
        "root_count": 0
      }
    ]
  }
}
```

</details>

---

### `updateSharingConfiguration`

Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limit changes.

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
  "updated_at": "string",
  "entity_summary": {
    "shared_total": 0,
    "offered_total": 0,
    "shared_by_schema": [
      {
        "schema": "string",
        "count": 0,
        "root_count": 0
      }
    ]
  }
}
```

</details>

---

### `deleteSharingConfiguration`

Deletes the sharing configuration for a partner, removing all shared and offered entity access.

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
  "updated_at": "string",
  "entity_summary": {
    "shared_total": 0,
    "offered_total": 0,
    "shared_by_schema": [
      {
        "schema": "string",
        "count": 0,
        "root_count": 0
      }
    ]
  }
}
```

</details>

---

### `assignRoleToConfiguration`

Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity access control.

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
  "updated_at": "string",
  "entity_summary": {
    "shared_total": 0,
    "offered_total": 0,
    "shared_by_schema": [
      {
        "schema": "string",
        "count": 0,
        "root_count": 0
      }
    ]
  }
}
```

</details>

---

### `getSharingConfigurations`

Returns sharing configurations for multiple partner organizations in a single batch request.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `listSharingConfigurations`

Lists all sharing configurations of the organization, without their entities. Paginated with an opaque cursor; keep paging while `next_cursor` is returned. Only available to the organization's own use

`GET /v1/sharing/configurations:list`

```ts
const { data } = await client.listSharingConfigurations({
  size: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
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
      "updated_at": "string",
      "entity_summary": {
        "shared_total": 0,
        "offered_total": 0,
        "shared_by_schema": [
          {
            "schema": "string",
            "count": 0,
            "root_count": 0
          }
        ]
      },
      "has_share_role": true
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `searchPartnerSharingConfigurations`

Searches for partner sharing configurations that have access to the given entities. Returns configurations with their shared and offered entity lists.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `getConfigurationsByTemplateRole`

Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage before deletion.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `shareEntityWithPartners`

Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream processing.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `shareChildEntityWithPartners`

Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `offerEntityToPartners`

Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept each offered entity.

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
    "updated_at": "string",
    "entity_summary": {
      "shared_total": 0,
      "offered_total": 0,
      "shared_by_schema": [
        {
          "schema": "string",
          "count": 0,
          "root_count": 0
        }
      ]
    }
  }
]
```

</details>

---

### `getEntitySharingEvents`

Returns the sharing history of an entity, reconstructed from the audit log. `total` counts matching audit log entries, not returned events - a single log entry can describe both a share and an unshare

`GET /v1/sharing/entities/{entity_id}/events`

```ts
const { data } = await client.getEntitySharingEvents({
  entity_id: 'example',
  limit: 1,
  page: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "events": [
    {
      "id": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "status": "success",
      "action": "shared",
      "user": {
        "user_id": "string",
        "email": "string",
        "display_name": "string"
      },
      "partner_org_ids": ["string"],
      "entities": [
        {
          "entity_id": "string",
          "schema": "string",
          "parent_entity_id": "string",
          "title": "string"
        }
      ]
    }
  ],
  "total": 0
}
```

</details>

---

### `getOfferStatus`

Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-facing pages without authentication.

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

Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages without authentication. Only one partner can accept each offer.

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
  "updated_at": "string",
  "entity_summary": {
    "shared_total": 0,
    "offered_total": 0,
    "shared_by_schema": [
      {
        "schema": "string",
        "count": 0,
        "root_count": 0
      }
    ]
  }
}
```

</details>

---

### `listSharingRules`

Lists the auto-sharing rules the caller's organization configured for a partner.

`GET /v1/sharing/rules/{partner_org_id}`

```ts
const { data } = await client.listSharingRules({
  partner_org_id: 'example',
  enabled: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "rules": [
    {
      "name": "string",
      "enabled": true,
      "trigger_schema": "opportunity",
      "include_schemas": ["string"],
      "evaluation_type": "deterministic",
      "conditions": {
        "logical_operator": "AND",
        "statements": [
          {
            "id": "string",
            "source": {
              "attribute": "string",
              "attribute_type": "string"
            },
            "operator": "equals",
            "values": ["string"]
          }
        ]
      },
      "ai_config": {
        "confidence_threshold": 0,
        "guidance": "string"
      },
      "rule_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vendor_org_id": "string",
      "partner_org_id": "string",
      "source": "AUTO_SHARING_RULE",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string"
    }
  ]
}
```

</details>

---

### `createSharingRule`

Creates an auto-sharing rule for a partner.

`POST /v1/sharing/rules/{partner_org_id}`

```ts
const { data } = await client.createSharingRule(
  {
    partner_org_id: 'example',
  },
  {
    name: 'string',
    enabled: true,
    trigger_schema: 'opportunity',
    include_schemas: ['string'],
    evaluation_type: 'deterministic',
    conditions: {
      logical_operator: 'AND',
      statements: [
        {
          id: 'string',
          source: {
            attribute: 'string',
            attribute_type: 'string'
          },
          operator: 'equals',
          values: ['string']
        }
      ]
    },
    ai_config: {
      confidence_threshold: 0,
      guidance: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "enabled": true,
  "trigger_schema": "opportunity",
  "include_schemas": ["string"],
  "evaluation_type": "deterministic",
  "conditions": {
    "logical_operator": "AND",
    "statements": [
      {
        "id": "string",
        "source": {
          "attribute": "string",
          "attribute_type": "string"
        },
        "operator": "equals",
        "values": ["string"]
      }
    ]
  },
  "ai_config": {
    "confidence_threshold": 0,
    "guidance": "string"
  },
  "rule_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vendor_org_id": "string",
  "partner_org_id": "string",
  "source": "AUTO_SHARING_RULE",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `getSharingRule`

Returns a single auto-sharing rule.

`GET /v1/sharing/rules/{partner_org_id}/{rule_id}`

```ts
const { data } = await client.getSharingRule({
  partner_org_id: 'example',
  rule_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "enabled": true,
  "trigger_schema": "opportunity",
  "include_schemas": ["string"],
  "evaluation_type": "deterministic",
  "conditions": {
    "logical_operator": "AND",
    "statements": [
      {
        "id": "string",
        "source": {
          "attribute": "string",
          "attribute_type": "string"
        },
        "operator": "equals",
        "values": ["string"]
      }
    ]
  },
  "ai_config": {
    "confidence_threshold": 0,
    "guidance": "string"
  },
  "rule_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vendor_org_id": "string",
  "partner_org_id": "string",
  "source": "AUTO_SHARING_RULE",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `updateSharingRule`

Partially updates an auto-sharing rule. The patch is merged into the stored rule, which is then validated as a whole. Use `{ "enabled": false }` to disable a rule.

`PATCH /v1/sharing/rules/{partner_org_id}/{rule_id}`

```ts
const { data } = await client.updateSharingRule(
  {
    partner_org_id: 'example',
    rule_id: 'example',
  },
  {
    name: 'string',
    enabled: true,
    trigger_schema: 'string',
    include_schemas: ['string'],
    evaluation_type: 'deterministic',
    conditions: {
      logical_operator: 'AND',
      statements: [
        {
          id: 'string',
          source: {
            attribute: 'string',
            attribute_type: 'string'
          },
          operator: 'equals',
          values: ['string']
        }
      ]
    },
    ai_config: {
      confidence_threshold: 0,
      guidance: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "enabled": true,
  "trigger_schema": "opportunity",
  "include_schemas": ["string"],
  "evaluation_type": "deterministic",
  "conditions": {
    "logical_operator": "AND",
    "statements": [
      {
        "id": "string",
        "source": {
          "attribute": "string",
          "attribute_type": "string"
        },
        "operator": "equals",
        "values": ["string"]
      }
    ]
  },
  "ai_config": {
    "confidence_threshold": 0,
    "guidance": "string"
  },
  "rule_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vendor_org_id": "string",
  "partner_org_id": "string",
  "source": "AUTO_SHARING_RULE",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `deleteSharingRule`

Deletes an auto-sharing rule.

`DELETE /v1/sharing/rules/{partner_org_id}/{rule_id}`

```ts
const { data } = await client.deleteSharingRule({
  partner_org_id: 'example',
  rule_id: 'example',
})
```

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
  entity_summary?: {
    shared_total: number
    offered_total: number
    shared_by_schema: Array<{
      schema: { ... }
      count: { ... }
      root_count: { ... }
    }>
  }
}
```

### `EntitySummary`

Counts of the records shared/offered with the partner. Only returned by the single-partner read.

```ts
type EntitySummary = {
  shared_total: number
  offered_total: number
  shared_by_schema: Array<{
    schema: string
    count: number
    root_count: number
  }>
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
    schema?: string
    entity_id: string
    parent_entity_id?: string
    offer_accepted?: boolean
  }>
}
```

### `SearchEntityResourceInput`

```ts
type SearchEntityResourceInput = {
  schema?: string
  entity_id: string
  parent_entity_id?: string
  offer_accepted?: boolean
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

### `SharingRuleInput`

```ts
type SharingRuleInput = {
  name: string
  enabled?: boolean
  trigger_schema: string
  include_schemas: string[]
  evaluation_type: "deterministic" | "ai"
  conditions?: {
    logical_operator: "AND" | "OR"
    statements: Array<{
      id: { ... }
      source: { ... }
      operator: { ... }
      values: { ... }
    }>
  }
  ai_config?: {
    confidence_threshold: number
    guidance?: string
  }
}
```

### `SharingRuleUpdate`

Every SharingRuleInput field is optional. The patch is merged into the stored rule, then validated.

```ts
type SharingRuleUpdate = {
  name?: string
  enabled?: boolean
  trigger_schema?: string
  include_schemas?: string[]
  evaluation_type?: "deterministic" | "ai"
  conditions?: {
    logical_operator: "AND" | "OR"
    statements: Array<{
      id: { ... }
      source: { ... }
      operator: { ... }
      values: { ... }
    }>
  }
  ai_config?: {
    confidence_threshold: number
    guidance?: string
  }
}
```

### `SharingRule`

```ts
type SharingRule = {
  name: string
  enabled: boolean
  trigger_schema: string
  include_schemas: string[]
  evaluation_type: "deterministic" | "ai"
  conditions?: {
    logical_operator: "AND" | "OR"
    statements: Array<{
      id: { ... }
      source: { ... }
      operator: { ... }
      values: { ... }
    }>
  }
  ai_config?: {
    confidence_threshold: number
    guidance?: string
  }
  rule_id: string // uuid
  vendor_org_id: string
  partner_org_id: string
  source: "AUTO_SHARING_RULE"
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
}
```

### `SharingRuleConditions`

Required iff evaluation_type is deterministic

```ts
type SharingRuleConditions = {
  logical_operator: "AND" | "OR"
  statements: Array<{
    id: string
    source: {
      attribute: { ... }
      attribute_type: { ... }
    }
    operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "is_empty" | "is_not_empty"
    values: string[]
  }>
}
```

### `Statement`

Subset of the Flows condition Statement

```ts
type Statement = {
  id: string
  source: {
    attribute: string
    attribute_type: "string" | "text" | "number" | "boolean" | "date" | "datetime" | "tags" | "country" | "email" | "phone" | "status" | "relation" | "multiselect" | "select" | "radio" | "relation_user" | "purpose" | "label" | "price"
  }
  operator: "equals" | "not_equals" | "any_of" | "none_of" | "contains" | "not_contains" | "starts_with" | "ends_with" | "greater_than" | "less_than" | "is_empty" | "is_not_empty"
  values: string[]
}
```

### `SharingRuleAiConfig`

Required iff evaluation_type is ai

```ts
type SharingRuleAiConfig = {
  confidence_threshold: number
  guidance?: string
}
```

### `EntitySharingEventsResponse`

```ts
type EntitySharingEventsResponse = {
  events: Array<{
    id: string
    timestamp: string // date-time
    status: "success" | "failure"
    action: "shared" | "unshared" | "offered" | "unoffered" | "child_shared" | "child_unshared"
    user: {
      user_id?: { ... }
      email?: { ... }
      display_name?: { ... }
    }
    partner_org_ids: string[]
    entities: Array<{
      entity_id: { ... }
      schema: { ... }
      parent_entity_id?: { ... }
      title?: { ... }
    }>
  }>
  total: number
}
```

### `EntitySharingEvent`

```ts
type EntitySharingEvent = {
  id: string
  timestamp: string // date-time
  status: "success" | "failure"
  action: "shared" | "unshared" | "offered" | "unoffered" | "child_shared" | "child_unshared"
  user: {
    user_id?: string
    email?: string
    display_name?: string
  }
  partner_org_ids: string[]
  entities: Array<{
    entity_id: string
    schema: string
    parent_entity_id?: string
    title?: string
  }>
}
```

### `EntitySharingEventUser`

```ts
type EntitySharingEventUser = {
  user_id?: string
  email?: string
  display_name?: string
}
```

### `EntitySharingEventEntity`

```ts
type EntitySharingEventEntity = {
  entity_id: string
  schema: string
  parent_entity_id?: string
  title?: string
}
```
