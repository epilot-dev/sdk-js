# Targeting API

- **Base URL:** `https://targeting.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/targeting](https://docs.epilot.io/api/targeting)

API for Targeting

## Quick Start

```bash
# List available operations
epilot targeting

# Call an operation
epilot targeting changeCampaignStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
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

**Campaign**
- [`changeCampaignStatus`](#changecampaignstatus) — Change the status of a campaign to a desired status.
- [`getCampaignJobStatus`](#getcampaignjobstatus) — Get the status of a campaign's automation job
- [`getCampaignPortals`](#getcampaignportals) — Get the list of portals and its widgets where the campaign is used.
- [`setupCampaign`](#setupcampaign) — Creates a `campaign` entity together with its related entities and configurations in a single call.
- [`matchCampaigns`](#matchcampaigns) — Match campaigns based on target entities.
- [`discoverCampaigns`](#discovercampaigns) — Given an entity, returns the Next Best Actions it should see on the Entity-UI channel.

**Campaign Delivery**
- [`retriggerCampaignAutomations`](#retriggercampaignautomations) — Retrigger automation executions for specific campaign recipients that have failed.

**Target**
- [`matchTargets`](#matchtargets) — Find targets from the provided list that include the provide entities.
- [`getTargetQueries`](#gettargetqueries) — Transform target filters into Lucene queries for the provided target IDs.

**Campaign Recipient**
- [`createRecipient`](#createrecipient) — Creates a new recipient associated with a campaign.
- [`updateRecipient`](#updaterecipient) — Updates a recipient's attributes.
- [`updateRecipientPortalStatus`](#updaterecipientportalstatus) — Updates the portal status for a specific campaign recipient.
- [`updateRecipientEntityUiStatus`](#updaterecipiententityuistatus) — Records a Next Best Action interaction for a recipient on the Entity-UI channel.
- [`restoreRecipientEntityUiStatus`](#restorerecipiententityuistatus) — Reverses a dismissal so the Next Best Action becomes visible to the entity again. This is
- [`getRecipients`](#getrecipients) — Get a paginated list of recipients for a campaign.
- [`getEmailStats`](#getemailstats) — Aggregate email delivery counts for a campaign, for the KPI summary on the campaign UI.

### `changeCampaignStatus`

Change the status of a campaign to a desired status.

`POST /v1/campaign/{campaign_id}/status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Sample Call**

```bash
epilot targeting changeCampaignStatus \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting changeCampaignStatus b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting changeCampaignStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'campaign'
```

<details>
<summary>Sample Response</summary>

```json
{
  "campaign": {
    "_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
    "_org": "string",
    "_owners": [
      {
        "org_id": "123",
        "user_id": "123"
      }
    ],
    "_schema": "string",
    "_title": "string",
    "_tags": ["string"],
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_updated_at": "1970-01-01T00:00:00.000Z",
    "_acl": {
      "view": ["org:456"],
      "edit": ["org:456"],
      "delete": ["org:456"]
    },
    "name": "string",
    "goal": "string",
    "status": "draft",
    "start_date": "1970-01-01",
    "end_date": "1970-01-01",
    "flow_id": "string",
    "job_id": "string",
    "target": {
      "$relation": [
        {
          "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
          "_tags": ["string"]
        }
      ]
    }
  }
}
```

</details>

---

### `getCampaignJobStatus`

Get the status of a campaign's automation job

`GET /v1/campaign/{campaign_id}/job`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Sample Call**

```bash
epilot targeting getCampaignJobStatus \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting getCampaignJobStatus b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting getCampaignJobStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "queued",
  "execution_summary": [
    {
      "execution_id": "string",
      "execution_status": "string"
    }
  ]
}
```

</details>

---

### `getCampaignPortals`

Get the list of portals and its widgets where the campaign is used.

`GET /v1/campaign/{campaign_id}/portals`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Sample Call**

```bash
epilot targeting getCampaignPortals \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting getCampaignPortals b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting getCampaignPortals -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "portal": {
      "origin": "string",
      "domain": "string",
      "name": "string"
    },
    "widgets": [
      {
        "id": "string",
        "headline": {
          "en": "string",
          "de": "string"
        }
      }
    ]
  }
]
```

</details>

---

### `retriggerCampaignAutomations`

Retrigger automation executions for specific campaign recipients that have failed.

`POST /v1/campaign/{campaign_id}/automations:retrigger`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Request Body** (required)

**Sample Call**

```bash
epilot targeting retriggerCampaignAutomations \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -d '{"recipient_ids":["3fa85f64-5717-4562-b3fc-2c963f66afa6"]}'
```

Using positional args for path parameters:

```bash
epilot targeting retriggerCampaignAutomations b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using stdin pipe:

```bash
cat body.json | epilot targeting retriggerCampaignAutomations -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting retriggerCampaignAutomations -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "string",
  "results": [
    {
      "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "result": "success",
      "execution_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `setupCampaign`

Creates a `campaign` entity together with its related entities and configurations in a single call.

`POST /v1/campaign:setup`

**Request Body** (required)

**Sample Call**

```bash
epilot targeting setupCampaign
```

With request body:

```bash
epilot targeting setupCampaign \
  -d '{
  "type": "tariff_change",
  "product_recommendation": {
    "name": "string",
    "source_product_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
    "source_price_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
    "offers": [
      {
        "target_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
        "items": [
          {
            "product_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
            "price_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
            "highlight_config": {}
          }
        ]
      }
    ]
  },
  "campaign": {
    "name": "string",
    "goal": "string",
    "target_ids": ["b8c01433-5556-4e2b-aad4-6f5348d1df84"]
  },
  "journey": {
    "journey_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84"
  },
  "channels": {
    "portal_widget": {
      "portal_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "block_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84"
    },
    "email": {
      "automation_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "template_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84"
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot targeting setupCampaign
```

With JSONata filter:

```bash
epilot targeting setupCampaign --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "tariff_change",
  "product_recommendation_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "campaign_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "journey_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "portal_widget_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84"
}
```

</details>

---

### `matchCampaigns`

Match campaigns based on target entities.

`POST /v1/campaign:match`

**Request Body** (required)

**Sample Call**

```bash
epilot targeting matchCampaigns
```

With request body:

```bash
epilot targeting matchCampaigns \
  -d '{
  "entity_refs": [
    {
      "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "entity_schema": "string"
    }
  ],
  "campaign_ids": ["b8c01433-5556-4e2b-aad4-6f5348d1df84"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot targeting matchCampaigns
```

With JSONata filter:

```bash
epilot targeting matchCampaigns --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "campaign": {
        "_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
        "_org": "string",
        "_owners": [
          {
            "org_id": "123",
            "user_id": "123"
          }
        ],
        "_schema": "string",
        "_title": "string",
        "_tags": ["string"],
        "_created_at": "1970-01-01T00:00:00.000Z",
        "_updated_at": "1970-01-01T00:00:00.000Z",
        "_acl": {
          "view": ["org:456"],
          "edit": ["org:456"],
          "delete": ["org:456"]
        },
        "name": "string",
        "goal": "string",
        "status": "draft",
        "start_date": "1970-01-01",
        "end_date": "1970-01-01",
        "flow_id": "string",
        "job_id": "string",
        "target": {
          "$relation": [
            {
              "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
              "_tags": ["string"]
            }
          ]
        }
      }
    }
  ]
}
```

</details>

---

### `discoverCampaigns`

Given an entity, returns the Next Best Actions it should see on the Entity-UI channel.

`POST /v1/campaign:discover`

**Request Body** (required)

**Sample Call**

```bash
epilot targeting discoverCampaigns \
  -d '{"entity_id":"b8c01433-5556-4e2b-aad4-6f5348d1df84","entity_schema":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot targeting discoverCampaigns
```

With JSONata filter:

```bash
epilot targeting discoverCampaigns --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "campaign_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "nba": {
        "category": "string",
        "icon": {
          "name": "string",
          "color": "string"
        },
        "title": "string",
        "body": "string",
        "priority": "medium",
        "is_dismissable": true,
        "cta": {
          "type": "journey",
          "target": "string",
          "context_params": [
            {
              "key": "string",
              "value": "string"
            }
          ]
        }
      },
      "status": "seen",
      "status_updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "dismissed": [
    {
      "campaign_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "nba": {
        "category": "string",
        "icon": {
          "name": "string",
          "color": "string"
        },
        "title": "string",
        "body": "string",
        "priority": "medium",
        "is_dismissable": true,
        "cta": {
          "type": "journey",
          "target": "string",
          "context_params": [
            {
              "key": "string",
              "value": "string"
            }
          ]
        }
      },
      "status": "seen",
      "status_updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `matchTargets`

Find targets from the provided list that include the provide entities.

`POST /v1/target:match`

**Request Body** (required)

**Sample Call**

```bash
epilot targeting matchTargets
```

With request body:

```bash
epilot targeting matchTargets \
  -d '{
  "entity_refs": [
    {
      "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "entity_schema": "string"
    }
  ],
  "target_ids": ["b8c01433-5556-4e2b-aad4-6f5348d1df84"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot targeting matchTargets
```

With JSONata filter:

```bash
epilot targeting matchTargets --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "target": {
        "_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
        "_org": "string",
        "_owners": [
          {
            "org_id": "123",
            "user_id": "123"
          }
        ],
        "_schema": "string",
        "_title": "string",
        "_tags": ["string"],
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
        "entity_filters": {}
      }
    }
  ]
}
```

</details>

---

### `getTargetQueries`

Transform target filters into Lucene queries for the provided target IDs.

`POST /v1/target/queries`

**Request Body** (required)

**Sample Call**

```bash
epilot targeting getTargetQueries \
  -d '{"target_ids":["b8c01433-5556-4e2b-aad4-6f5348d1df84"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot targeting getTargetQueries
```

With JSONata filter:

```bash
epilot targeting getTargetQueries --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "target_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "query": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `createRecipient`

Creates a new recipient associated with a campaign.

`POST /v1/campaign/{campaign_id}/recipient`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Request Body** (required)

**Sample Call**

```bash
epilot targeting createRecipient \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With request body:

```bash
epilot targeting createRecipient \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -d '{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "automation_status": "pending",
  "automation_execution_id": "string"
}'
```

Using positional args for path parameters:

```bash
epilot targeting createRecipient b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using stdin pipe:

```bash
cat body.json | epilot targeting createRecipient -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting createRecipient -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "title": "string",
  "automation_status": "pending",
  "automation_execution_id": "string",
  "portal_status": "sent",
  "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
  "portal_state": {},
  "entity_ui_status": "seen",
  "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
  "entity_ui_status_before_dismiss": "seen",
  "message_entity_id": "string",
  "email_status": "sent",
  "email_status_updated_at": "1970-01-01T00:00:00.000Z",
  "email_bounce_type": "permanent",
  "email_bounce_subtype": "string",
  "email_complaint_type": "string",
  "email_bounce_reason": "string",
  "email_send_error": {},
  "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
  "email_open_count": 0,
  "email_first_opened_at": "1970-01-01T00:00:00.000Z",
  "email_last_opened_at": "1970-01-01T00:00:00.000Z",
  "email_click_count": 0,
  "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
  "email_clicked_links": [
    {
      "url": "string",
      "clicked_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipient`

Updates a recipient's attributes.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |
| `recipient_id` | path | string (uuid) | Yes | The entity ID of the recipient |

**Request Body** (required)

**Sample Call**

```bash
epilot targeting updateRecipient \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -d '{"automation_status":"pending","automation_execution_id":"string","portal_status":"sent","portal_state":{}}'
```

Using positional args for path parameters:

```bash
epilot targeting updateRecipient b8c01433-5556-4e2b-aad4-6f5348d1df84 b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using stdin pipe:

```bash
cat body.json | epilot targeting updateRecipient -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting updateRecipient -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "title": "string",
  "automation_status": "pending",
  "automation_execution_id": "string",
  "portal_status": "sent",
  "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
  "portal_state": {},
  "entity_ui_status": "seen",
  "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
  "entity_ui_status_before_dismiss": "seen",
  "message_entity_id": "string",
  "email_status": "sent",
  "email_status_updated_at": "1970-01-01T00:00:00.000Z",
  "email_bounce_type": "permanent",
  "email_bounce_subtype": "string",
  "email_complaint_type": "string",
  "email_bounce_reason": "string",
  "email_send_error": {},
  "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
  "email_open_count": 0,
  "email_first_opened_at": "1970-01-01T00:00:00.000Z",
  "email_last_opened_at": "1970-01-01T00:00:00.000Z",
  "email_click_count": 0,
  "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
  "email_clicked_links": [
    {
      "url": "string",
      "clicked_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipientPortalStatus`

Updates the portal status for a specific campaign recipient.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}/portal:status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |
| `recipient_id` | path | string (uuid) | Yes | The entity ID of the recipient |

**Request Body** (required)

**Sample Call**

```bash
epilot targeting updateRecipientPortalStatus \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -d '{"status":"sent"}'
```

Using positional args for path parameters:

```bash
epilot targeting updateRecipientPortalStatus b8c01433-5556-4e2b-aad4-6f5348d1df84 b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using stdin pipe:

```bash
cat body.json | epilot targeting updateRecipientPortalStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting updateRecipientPortalStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "title": "string",
  "automation_status": "pending",
  "automation_execution_id": "string",
  "portal_status": "sent",
  "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
  "portal_state": {},
  "entity_ui_status": "seen",
  "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
  "entity_ui_status_before_dismiss": "seen",
  "message_entity_id": "string",
  "email_status": "sent",
  "email_status_updated_at": "1970-01-01T00:00:00.000Z",
  "email_bounce_type": "permanent",
  "email_bounce_subtype": "string",
  "email_complaint_type": "string",
  "email_bounce_reason": "string",
  "email_send_error": {},
  "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
  "email_open_count": 0,
  "email_first_opened_at": "1970-01-01T00:00:00.000Z",
  "email_last_opened_at": "1970-01-01T00:00:00.000Z",
  "email_click_count": 0,
  "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
  "email_clicked_links": [
    {
      "url": "string",
      "clicked_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipientEntityUiStatus`

Records a Next Best Action interaction for a recipient on the Entity-UI channel.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |
| `recipient_id` | path | string (uuid) | Yes | The entity ID of the recipient |

**Request Body** (required)

**Sample Call**

```bash
epilot targeting updateRecipientEntityUiStatus \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -d '{"status":"seen","entity_schema":"string"}'
```

Using positional args for path parameters:

```bash
epilot targeting updateRecipientEntityUiStatus b8c01433-5556-4e2b-aad4-6f5348d1df84 b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using stdin pipe:

```bash
cat body.json | epilot targeting updateRecipientEntityUiStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting updateRecipientEntityUiStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "title": "string",
  "automation_status": "pending",
  "automation_execution_id": "string",
  "portal_status": "sent",
  "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
  "portal_state": {},
  "entity_ui_status": "seen",
  "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
  "entity_ui_status_before_dismiss": "seen",
  "message_entity_id": "string",
  "email_status": "sent",
  "email_status_updated_at": "1970-01-01T00:00:00.000Z",
  "email_bounce_type": "permanent",
  "email_bounce_subtype": "string",
  "email_complaint_type": "string",
  "email_bounce_reason": "string",
  "email_send_error": {},
  "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
  "email_open_count": 0,
  "email_first_opened_at": "1970-01-01T00:00:00.000Z",
  "email_last_opened_at": "1970-01-01T00:00:00.000Z",
  "email_click_count": 0,
  "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
  "email_clicked_links": [
    {
      "url": "string",
      "clicked_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `restoreRecipientEntityUiStatus`

Reverses a dismissal so the Next Best Action becomes visible to the entity again. This is

`POST /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:restore`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |
| `recipient_id` | path | string (uuid) | Yes | The entity ID of the recipient |

**Sample Call**

```bash
epilot targeting restoreRecipientEntityUiStatus \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 \
  -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting restoreRecipientEntityUiStatus b8c01433-5556-4e2b-aad4-6f5348d1df84 b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting restoreRecipientEntityUiStatus -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 -p recipient_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
  "entity_schema": "string",
  "title": "string",
  "automation_status": "pending",
  "automation_execution_id": "string",
  "portal_status": "sent",
  "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
  "portal_state": {},
  "entity_ui_status": "seen",
  "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
  "entity_ui_status_before_dismiss": "seen",
  "message_entity_id": "string",
  "email_status": "sent",
  "email_status_updated_at": "1970-01-01T00:00:00.000Z",
  "email_bounce_type": "permanent",
  "email_bounce_subtype": "string",
  "email_complaint_type": "string",
  "email_bounce_reason": "string",
  "email_send_error": {},
  "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
  "email_open_count": 0,
  "email_first_opened_at": "1970-01-01T00:00:00.000Z",
  "email_last_opened_at": "1970-01-01T00:00:00.000Z",
  "email_click_count": 0,
  "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
  "email_clicked_links": [
    {
      "url": "string",
      "clicked_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getRecipients`

Get a paginated list of recipients for a campaign.

`GET /v1/campaign/{campaign_id}/recipients`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |
| `limit` | query | number | No | Number of items to return |
| `next` | query | string | No | Cursor for pagination |
| `q` | query | string | No | Search by recipient title |
| `automation_status` | query | "pending" \| "in_progress" \| "success" \| "failed" \| "cancelled"[] | No | Filter by automation status. Repeat the parameter to match multiple
statuses in one request
(e.g. automation_status=failed&automation_status=cancelled).
 |
| `portal_status` | query | "sent" \| "seen" \| "dismissed" \| "clicked" | No | Filter by portal status |
| `email_status` | query | "sent" \| "delivered" \| "bounced" \| "complained" \| "failed" | No | Filter by email delivery status (e.g. bounced, delivered). The response total reflects the count for the filtered status. |

**Sample Call**

```bash
epilot targeting getRecipients \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting getRecipients b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting getRecipients -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "entity_id": "b8c01433-5556-4e2b-aad4-6f5348d1df84",
      "entity_schema": "string",
      "title": "string",
      "automation_status": "pending",
      "automation_execution_id": "string",
      "portal_status": "sent",
      "portal_status_updated_at": "1970-01-01T00:00:00.000Z",
      "portal_state": {},
      "entity_ui_status": "seen",
      "entity_ui_status_updated_at": "1970-01-01T00:00:00.000Z",
      "entity_ui_status_before_dismiss": "seen",
      "message_entity_id": "string",
      "email_status": "sent",
      "email_status_updated_at": "1970-01-01T00:00:00.000Z",
      "email_bounce_type": "permanent",
      "email_bounce_subtype": "string",
      "email_complaint_type": "string",
      "email_bounce_reason": "string",
      "email_send_error": {},
      "email_unsubscribed_at": "1970-01-01T00:00:00.000Z",
      "email_open_count": 0,
      "email_first_opened_at": "1970-01-01T00:00:00.000Z",
      "email_last_opened_at": "1970-01-01T00:00:00.000Z",
      "email_click_count": 0,
      "email_first_clicked_at": "1970-01-01T00:00:00.000Z",
      "email_clicked_links": [
        {
          "url": "string",
          "clicked_at": "1970-01-01T00:00:00.000Z"
        }
      ],
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next": "string",
  "total": 0
}
```

</details>

---

### `getEmailStats`

Aggregate email delivery counts for a campaign, for the KPI summary on the campaign UI.

`GET /v1/campaign/{campaign_id}/email-stats`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string (uuid) | Yes | The campaign ID |

**Sample Call**

```bash
epilot targeting getEmailStats \
  -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84
```

Using positional args for path parameters:

```bash
epilot targeting getEmailStats b8c01433-5556-4e2b-aad4-6f5348d1df84
```

With JSONata filter:

```bash
epilot targeting getEmailStats -p campaign_id=b8c01433-5556-4e2b-aad4-6f5348d1df84 --jsonata 'total_emailed'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total_emailed": 0,
  "sent": 0,
  "delivered": 0,
  "bounced": 0,
  "bounced_hard": 0,
  "bounced_soft": 0,
  "complained": 0,
  "failed": 0,
  "unsubscribed": 0,
  "opened": 0,
  "clicked": 0,
  "total_opens": 0,
  "total_clicks": 0
}
```

</details>

---
