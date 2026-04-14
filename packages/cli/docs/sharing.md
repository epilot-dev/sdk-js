# Sharing API

- **Base URL:** `https://sharing-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/sharing](https://docs.epilot.io/api/sharing)

REST API for managing partner sharing configurations and entity sharing.

## Quick Start

```bash
# List available operations
epilot sharing

# Call an operation
epilot sharing getSharingConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000
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

**Sharing Configuration**
- [`getSharingConfiguration`](#getsharingconfiguration) — Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and 
- [`updateSharingConfiguration`](#updatesharingconfiguration) — Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limi
- [`deleteSharingConfiguration`](#deletesharingconfiguration) — Deletes the sharing configuration for a partner, removing all shared and offered entity access.
- [`assignRoleToConfiguration`](#assignroletoconfiguration) — Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity
- [`getSharingConfigurations`](#getsharingconfigurations) — Returns sharing configurations for multiple partner organizations in a single batch request.
- [`searchPartnerSharingConfigurations`](#searchpartnersharingconfigurations) — Searches for partner sharing configurations that have access to the given entities. Returns configurations with their sh
- [`getConfigurationsByTemplateRole`](#getconfigurationsbytemplaterole) — Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage bef

**Entity Sharing**
- [`shareEntityWithPartners`](#shareentitywithpartners) — Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream pr
- [`shareChildEntityWithPartners`](#sharechildentitywithpartners) — Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.

**Entity Offering**
- [`offerEntityToPartners`](#offerentitytopartners) — Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept 
- [`getOfferStatus`](#getofferstatus) — Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-
- [`acceptOffer`](#acceptoffer) — Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages wi

### `getSharingConfiguration`

Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and 

`GET /v1/sharing/configurations/{partner_org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_id` | path | string | Yes | Partner organization ID |

**Sample Call**

```bash
epilot sharing getSharingConfiguration \
  -p partner_org_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot sharing getSharingConfiguration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing getSharingConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'sharing_org_id'
```

<details>
<summary>Sample Response</summary>

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

Updates the sharing configuration for a partner, such as the user limit. Also patches the internal role if the user limi

`PATCH /v1/sharing/configurations/{partner_org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_id` | path | string | Yes | Partner organization ID |

**Request Body** (required)

**Sample Call**

```bash
epilot sharing updateSharingConfiguration \
  -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"user_limit":0}'
```

Using positional args for path parameters:

```bash
epilot sharing updateSharingConfiguration 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot sharing updateSharingConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing updateSharingConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'sharing_org_id'
```

<details>
<summary>Sample Response</summary>

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

Deletes the sharing configuration for a partner, removing all shared and offered entity access.

`DELETE /v1/sharing/configurations/{partner_org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_id` | path | string | Yes | Partner organization ID |

**Sample Call**

```bash
epilot sharing deleteSharingConfiguration \
  -p partner_org_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot sharing deleteSharingConfiguration 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing deleteSharingConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'sharing_org_id'
```

<details>
<summary>Sample Response</summary>

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

Assigns a template role to a partner sharing configuration. The role grants are copied into the configuration for entity

`PUT /v1/sharing/configurations/{partner_org_id}/role`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_id` | path | string | Yes | Partner organization ID |

**Request Body** (required)

**Sample Call**

```bash
epilot sharing assignRoleToConfiguration \
  -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"template_role_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot sharing assignRoleToConfiguration 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot sharing assignRoleToConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing assignRoleToConfiguration -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'sharing_org_id'
```

<details>
<summary>Sample Response</summary>

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

Returns sharing configurations for multiple partner organizations in a single batch request.

`GET /v1/sharing/configurations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_ids` | query | string[] | Yes | Comma-separated list of partner organization IDs |

**Sample Call**

```bash
epilot sharing getSharingConfigurations \
  -p partner_org_ids=example
```

With JSONata filter:

```bash
epilot sharing getSharingConfigurations -p partner_org_ids=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Searches for partner sharing configurations that have access to the given entities. Returns configurations with their sh

`POST /v1/sharing/configurations:search`

**Request Body** (required)

**Sample Call**

```bash
epilot sharing searchPartnerSharingConfigurations \
  -d '{"entities":[{"schema":"string","entity_id":"string","parent_entity_id":"string","offer_accepted":true}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot sharing searchPartnerSharingConfigurations
```

With JSONata filter:

```bash
epilot sharing searchPartnerSharingConfigurations --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Returns all partner sharing configurations that reference the given template role ID. Useful for checking role usage bef

`GET /v1/sharing/configurations/by-role/{template_role_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `template_role_id` | path | string | Yes | Template role ID to search for |

**Sample Call**

```bash
epilot sharing getConfigurationsByTemplateRole \
  -p template_role_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot sharing getConfigurationsByTemplateRole 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing getConfigurationsByTemplateRole -p template_role_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Shares or unshares top-level entities with one or more partner organizations. Publishes sharing events for downstream pr

`POST /v1/sharing/entities:share`

**Request Body** (required)

**Sample Call**

```bash
epilot sharing shareEntityWithPartners
```

With request body:

```bash
epilot sharing shareEntityWithPartners \
  -d '{
  "share": [
    {
      "partner_org_id": "string",
      "entities": [
        {
          "schema": "string",
          "entity_id": "string",
          "parent_entity_id": "string",
          "offer_accepted": true
        }
      ]
    }
  ],
  "unshare": [
    {
      "partner_org_id": "string",
      "entities": [
        {
          "schema": "string",
          "entity_id": "string",
          "parent_entity_id": "string",
          "offer_accepted": true
        }
      ]
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot sharing shareEntityWithPartners
```

With JSONata filter:

```bash
epilot sharing shareEntityWithPartners --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Shares or unshares child entities (entities that belong to an already-shared parent) with partner organizations.

`POST /v1/sharing/entities:share-child`

**Request Body** (required)

**Sample Call**

```bash
epilot sharing shareChildEntityWithPartners
```

With request body:

```bash
epilot sharing shareChildEntityWithPartners \
  -d '{
  "share": [
    {
      "entity": {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true
      },
      "partner_org_id": "string"
    }
  ],
  "unshare": [
    {
      "entity": {
        "schema": "string",
        "entity_id": "string",
        "parent_entity_id": "string",
        "offer_accepted": true
      },
      "partner_org_id": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot sharing shareChildEntityWithPartners
```

With JSONata filter:

```bash
epilot sharing shareChildEntityWithPartners --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Offers or unoffers entities to partner organizations using a First Come First Served model. Only one partner can accept 

`POST /v1/sharing/entities:offer`

**Request Body** (required)

**Sample Call**

```bash
epilot sharing offerEntityToPartners
```

With request body:

```bash
epilot sharing offerEntityToPartners \
  -d '{
  "offer": [
    {
      "partner_org_id": "string",
      "offered_entities": [
        {
          "schema": "string",
          "entity_id": "string",
          "parent_entity_id": "string"
        }
      ]
    }
  ],
  "unoffer": [
    {
      "partner_org_id": "string",
      "offered_entities": [
        {
          "schema": "string",
          "entity_id": "string",
          "parent_entity_id": "string"
        }
      ]
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot sharing offerEntityToPartners
```

With JSONata filter:

```bash
epilot sharing offerEntityToPartners --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

Returns the current status of an entity offer (pending, accepted, expired). This is a public endpoint used from partner-

`GET /v1/sharing/offers/status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_org_id` | query | string | Yes |  |
| `sharing_org_id` | query | string | Yes |  |
| `entity_id` | query | string | Yes |  |

**Sample Call**

```bash
epilot sharing getOfferStatus \
  -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 \
  -p sharing_org_id=123e4567-e89b-12d3-a456-426614174000 \
  -p entity_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot sharing getOfferStatus -p partner_org_id=123e4567-e89b-12d3-a456-426614174000 -p sharing_org_id=123e4567-e89b-12d3-a456-426614174000 -p entity_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

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

Accepts an entity offer on behalf of a partner organization. This is a public endpoint used from partner-facing pages wi

`POST /v1/sharing/offers:accept`

**Request Body** (required)

**Sample Call**

```bash
epilot sharing acceptOffer \
  -d '{"partner_org_id":"string","sharing_org_id":"string","entity_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot sharing acceptOffer
```

With JSONata filter:

```bash
epilot sharing acceptOffer --jsonata 'sharing_org_id'
```

<details>
<summary>Sample Response</summary>

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
