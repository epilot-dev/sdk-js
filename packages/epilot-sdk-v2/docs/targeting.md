# Targeting API

- **Base URL:** `https://targeting.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/targeting](https://docs.epilot.io/api/targeting)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.targeting.changeCampaignStatus(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/targeting'

const targetingClient = getClient()
authorize(targetingClient, () => '<token>')
const { data } = await targetingClient.changeCampaignStatus(...)
```

## Operations

**Campaign**
- [`changeCampaignStatus`](#changecampaignstatus)
- [`getCampaignJobStatus`](#getcampaignjobstatus)
- [`getCampaignPortals`](#getcampaignportals)
- [`setupCampaign`](#setupcampaign)
- [`matchCampaigns`](#matchcampaigns)
- [`discoverCampaigns`](#discovercampaigns)

**Campaign Delivery**
- [`retriggerCampaignAutomations`](#retriggercampaignautomations)

**Target**
- [`matchTargets`](#matchtargets)
- [`getTargetQueries`](#gettargetqueries)

**Campaign Recipient**
- [`createRecipient`](#createrecipient)
- [`updateRecipient`](#updaterecipient)
- [`updateRecipientPortalStatus`](#updaterecipientportalstatus)
- [`updateRecipientEntityUiStatus`](#updaterecipiententityuistatus)
- [`restoreRecipientEntityUiStatus`](#restorerecipiententityuistatus)
- [`getRecipients`](#getrecipients)
- [`getEmailStats`](#getemailstats)

**Schemas**
- [`BaseError`](#baseerror)
- [`ServerError`](#servererror)
- [`ClientError`](#clienterror)
- [`BaseUUID`](#baseuuid)
- [`BaseNanoID`](#basenanoid)
- [`BaseTags`](#basetags)
- [`BaseRelation`](#baserelation)
- [`BaseSystemId`](#basesystemid)
- [`BaseEntityOwner`](#baseentityowner)
- [`BaseEntityAcl`](#baseentityacl)
- [`BaseSystemFields`](#basesystemfields)
- [`BaseSystemFieldsRequired`](#basesystemfieldsrequired)
- [`CampaignStatus`](#campaignstatus)
- [`ExecutionSummaryItem`](#executionsummaryitem)
- [`JobStatus`](#jobstatus)
- [`Campaign`](#campaign)
- [`Target`](#target)
- [`MatchCampaignParams`](#matchcampaignparams)
- [`NextBestAction`](#nextbestaction)
- [`DiscoverCampaignsParams`](#discovercampaignsparams)
- [`DiscoverResult`](#discoverresult)
- [`MatchTargetParams`](#matchtargetparams)
- [`GetTargetQueriesParams`](#gettargetqueriesparams)
- [`TargetQueryResult`](#targetqueryresult)
- [`AutomationStatus`](#automationstatus)
- [`PortalStatus`](#portalstatus)
- [`EntityUiStatus`](#entityuistatus)
- [`EmailStatus`](#emailstatus)
- [`EmailBounceType`](#emailbouncetype)
- [`Recipient`](#recipient)
- [`BaseRecipientPayload`](#baserecipientpayload)
- [`AutomationRecipientPayload`](#automationrecipientpayload)
- [`PortalRecipientPayload`](#portalrecipientpayload)
- [`CreateRecipientPayload`](#createrecipientpayload)
- [`UpdateRecipientPayload`](#updaterecipientpayload)
- [`RetriggerAutomationsRequest`](#retriggerautomationsrequest)
- [`RetriggerAutomationsResult`](#retriggerautomationsresult)
- [`UpdatePortalStatusRequest`](#updateportalstatusrequest)
- [`UpdateEntityUiStatusRequest`](#updateentityuistatusrequest)
- [`SetupCampaignRequest`](#setupcampaignrequest)
- [`SetupTariffChangeCampaignRequest`](#setuptariffchangecampaignrequest)
- [`SetupTariffChangeCampaignResponse`](#setuptariffchangecampaignresponse)

### `changeCampaignStatus`

Change the status of a campaign to a desired status.

`POST /v1/campaign/{campaign_id}/status`

```ts
const { data } = await client.changeCampaignStatus({
  campaign_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getCampaignJobStatus({
  campaign_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getCampaignPortals({
  campaign_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.retriggerCampaignAutomations(
  {
    campaign_id: 'example',
  },
  {
    recipient_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
  },
)
```

<details>
<summary>Response</summary>

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
Used by the campaign wizard UI, but not restricted to it.

`POST /v1/campaign:setup`

```ts
const { data } = await client.setupCampaign(
  null,
  {
    type: 'tariff_change',
    product_recommendation: {
      name: 'string',
      source_product_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
      source_price_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
      offers: [
        {
          target_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
          items: [
            {
              product_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
              price_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
              highlight_config: {}
            }
          ]
        }
      ]
    },
    campaign: {
      name: 'string',
      goal: 'string',
      target_ids: ['b8c01433-5556-4e2b-aad4-6f5348d1df84']
    },
    journey: {
      journey_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84'
    },
    channels: {
      portal_widget: {
        portal_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
        block_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84'
      },
      email: {
        automation_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
        template_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.matchCampaigns(
  null,
  {
    entity_refs: [
      {
        entity_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
        entity_schema: 'string'
      }
    ],
    campaign_ids: ['b8c01433-5556-4e2b-aad4-6f5348d1df84']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.discoverCampaigns(
  null,
  {
    entity_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
    entity_schema: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.matchTargets(
  null,
  {
    entity_refs: [
      {
        entity_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
        entity_schema: 'string'
      }
    ],
    target_ids: ['b8c01433-5556-4e2b-aad4-6f5348d1df84']
  },
)
```

<details>
<summary>Response</summary>

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
Returns the transformed query string for each target along with any errors encountered.

`POST /v1/target/queries`

```ts
const { data } = await client.getTargetQueries(
  null,
  {
    target_ids: ['b8c01433-5556-4e2b-aad4-6f5348d1df84']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createRecipient(
  {
    campaign_id: 'example',
  },
  {
    entity_id: 'b8c01433-5556-4e2b-aad4-6f5348d1df84',
    entity_schema: 'string',
    automation_status: 'pending',
    automation_execution_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipient`

Updates a recipient's attributes.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}`

```ts
const { data } = await client.updateRecipient(
  {
    campaign_id: 'example',
    recipient_id: 'example',
  },
  {
    automation_status: 'pending',
    automation_execution_id: 'string',
    portal_status: 'sent',
    portal_state: {}
  },
)
```

<details>
<summary>Response</summary>

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipientPortalStatus`

Updates the portal status for a specific campaign recipient.
The portal_status_updated_at timestamp is automatically set when the status changes.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}/portal:status`

```ts
const { data } = await client.updateRecipientPortalStatus(
  {
    campaign_id: 'example',
    recipient_id: 'example',
  },
  {
    status: 'sent'
  },
)
```

<details>
<summary>Response</summary>

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipientEntityUiStatus`

Records a Next Best Action interaction for a recipient on the Entity-UI channel.

`PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:status`

```ts
const { data } = await client.updateRecipientEntityUiStatus(
  {
    campaign_id: 'example',
    recipient_id: 'example',
  },
  {
    status: 'seen',
    entity_schema: 'string'
  },
)
```

<details>
<summary>Response</summary>

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `restoreRecipientEntityUiStatus`

Undo a dismissal on the Entity-UI (Next Best Action) channel

`POST /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:restore`

```ts
const { data } = await client.restoreRecipientEntityUiStatus({
  campaign_id: 'example',
  recipient_id: 'example',
})
```

<details>
<summary>Response</summary>

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getRecipients`

Get a paginated list of recipients for a campaign.

`GET /v1/campaign/{campaign_id}/recipients`

```ts
const { data } = await client.getRecipients({
  campaign_id: 'example',
  limit: 1,
  next: 'example',
  q: 'example',
  automation_status: ['...'],
  portal_status: 'example',
  email_status: 'example',
})
```

<details>
<summary>Response</summary>

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
Counts cover the email (automation) channel only; `total_emailed` is the number of
recipients with a recorded em

`GET /v1/campaign/{campaign_id}/email-stats`

```ts
const { data } = await client.getEmailStats({
  campaign_id: 'example',
})
```

<details>
<summary>Response</summary>

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
  "unsubscribed": 0
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

Describes the structure of a client error response, which can be one of several types:
1. `MessageError`: Contains a 'message' field for general descriptive errors.
2. `CodeError`: Contains a 'code' field for specific, machine-readable error codes.
3. `StatusedError`: Contains 'error' and 'status' f

```ts
type ClientError = {
  message: string
} | {
  code: "CAMPAIGN_NOT_FOUND" | "CAMPAIGN_HAS_NO_TARGET" | "CAMPAIGN_HAS_NO_DELIVERY_METHOD" | "INVALID_NEXT_BEST_ACTION" | "CAMPAIGN_HAS_JOB_IN_PROGRESS" | "CAMPAIGN_HAS_UNEXPECTED_STATUS" | "JOB_TOKEN_MISSING" | "TARGET_WITHOUT_FILTERS"
} | {
  error: string
  status: number
}
```

### `BaseUUID`

```ts
type BaseUUID = string // uuid
```

### `BaseNanoID`

```ts
type BaseNanoID = string
```

### `BaseTags`

```ts
type BaseTags = string[]
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

### `BaseSystemId`

```ts
type BaseSystemId = {
  _id: string // uuid
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
  _id?: string // uuid
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
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

### `CampaignStatus`

```ts
type CampaignStatus = "draft" | "activating" | "active" | "inactive"
```

### `ExecutionSummaryItem`

```ts
type ExecutionSummaryItem = {
  execution_id?: string
  execution_status?: string
}
```

### `JobStatus`

```ts
type JobStatus = {
  status?: "queued" | "processing" | "finished" | "failed" | "cancelled" | "send_report"
  execution_summary?: Array<{
    execution_id?: string
    execution_status?: string
  }>
}
```

### `Campaign`

```ts
type Campaign = {
  _id?: string // uuid
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  name?: string
  goal?: string
  status?: "draft" | "activating" | "active" | "inactive"
  start_date?: string // date
  end_date?: string // date
  flow_id?: string
  job_id?: string
  target?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
}
```

### `Target`

```ts
type Target = {
  _id?: string // uuid
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  name?: string
  description?: string
  entity_schema?: string
  entity_filters?: Record<string, unknown>
}
```

### `MatchCampaignParams`

```ts
type MatchCampaignParams = {
  entity_refs: Array<{
    entity_id: string // uuid
    entity_schema: string
  }>
  campaign_ids: string // uuid[]
}
```

### `NextBestAction`

A Next Best Action configured on a campaign's Entity-UI channel.
This is the canonical NBA contract shared by discovery (this API), authoring, and rendering.
NBA content is single-language in v1; text fields may contain `{{placeholders}}` resolved at render time.


```ts
type NextBestAction = {
  category?: string
  icon?: {
    name: string
    color?: string
  }
  title: string
  body?: string
  priority?: "low" | "medium" | "high"
  is_dismissable?: boolean
  cta: {
    type: "journey" | "workflow" | "flow"
    target: string
    context_params?: Array<{
      key: { ... }
      value: { ... }
    }>
  }
}
```

### `DiscoverCampaignsParams`

```ts
type DiscoverCampaignsParams = {
  entity_id: string // uuid
  entity_schema: string
}
```

### `DiscoverResult`

One discovered Next Best Action, plus this entity's interaction state for it.

```ts
type DiscoverResult = {
  campaign_id: string // uuid
  nba: {
    category?: string
    icon?: {
      name: { ... }
      color?: { ... }
    }
    title: string
    body?: string
    priority?: "low" | "medium" | "high"
    is_dismissable?: boolean
    cta: {
      type: { ... }
      target: { ... }
      context_params?: { ... }
    }
  }
  status?: "seen" | "dismissed" | "clicked"
  status_updated_at?: string // date-time
}
```

### `MatchTargetParams`

```ts
type MatchTargetParams = {
  entity_refs: Array<{
    entity_id: string // uuid
    entity_schema: string
  }>
  target_ids: string // uuid[]
}
```

### `GetTargetQueriesParams`

```ts
type GetTargetQueriesParams = {
  target_ids: string // uuid[]
}
```

### `TargetQueryResult`

```ts
type TargetQueryResult = {
  target_id: string // uuid
  query: string
  error?: string
}
```

### `AutomationStatus`

```ts
type AutomationStatus = "pending" | "in_progress" | "success" | "failed" | "cancelled"
```

### `PortalStatus`

```ts
type PortalStatus = "sent" | "seen" | "dismissed" | "clicked"
```

### `EntityUiStatus`

Lifecycle status of a Next Best Action on the Entity-UI channel. Unlike the portal
channel there is no `sent` state: an NBA recipient is born at `seen`, the moment the
action is first rendered to an agent.


```ts
type EntityUiStatus = "seen" | "dismissed" | "clicked"
```

### `EmailStatus`

Delivery status of the email a campaign's automation sends to a recipient. Set to `sent`
once the automation hands the email off, then updated asynchronously as SES notifications
arrive (`bounced` / `complained`; an SES Reject maps to `bounced`). `failed` is a send-time
failure (the automation execu

```ts
type EmailStatus = "sent" | "delivered" | "bounced" | "complained" | "failed"
```

### `EmailBounceType`

SES bounce classification: `permanent` (hard) or `transient` (soft).

```ts
type EmailBounceType = "permanent" | "transient"
```

### `Recipient`

```ts
type Recipient = {
  entity_id?: string // uuid
  entity_schema?: string
  title?: string
  automation_status?: "pending" | "in_progress" | "success" | "failed" | "cancelled"
  automation_execution_id?: string
  portal_status?: "sent" | "seen" | "dismissed" | "clicked"
  portal_status_updated_at?: string // date-time
  portal_state?: Record<string, unknown>
  entity_ui_status?: "seen" | "dismissed" | "clicked"
  entity_ui_status_updated_at?: string // date-time
  entity_ui_status_before_dismiss?: "seen" | "dismissed" | "clicked"
  message_entity_id?: string
  email_status?: "sent" | "delivered" | "bounced" | "complained" | "failed"
  email_status_updated_at?: string // date-time
  email_bounce_type?: "permanent" | "transient"
  email_bounce_subtype?: string
  email_complaint_type?: string
  email_bounce_reason?: string
  email_send_error?: Record<string, unknown>
  email_unsubscribed_at?: string // date-time
  updated_at?: string // date-time
}
```

### `BaseRecipientPayload`

```ts
type BaseRecipientPayload = {
  entity_id: string // uuid
  entity_schema: string
}
```

### `AutomationRecipientPayload`

```ts
type AutomationRecipientPayload = {
  automation_status: "pending" | "in_progress" | "success" | "failed" | "cancelled"
  automation_execution_id: string
}
```

### `PortalRecipientPayload`

```ts
type PortalRecipientPayload = {
  portal_status: "sent" | "seen" | "dismissed" | "clicked"
  portal_state?: Record<string, unknown>
}
```

### `CreateRecipientPayload`

```ts
type CreateRecipientPayload = {
  entity_id: string // uuid
  entity_schema: string
  automation_status: "pending" | "in_progress" | "success" | "failed" | "cancelled"
  automation_execution_id: string
} | {
  entity_id: string // uuid
  entity_schema: string
  portal_status: "sent" | "seen" | "dismissed" | "clicked"
  portal_state?: Record<string, unknown>
} | {
  entity_id: string // uuid
  entity_schema: string
  automation_status: "pending" | "in_progress" | "success" | "failed" | "cancelled"
  automation_execution_id: string
  portal_status: "sent" | "seen" | "dismissed" | "clicked"
  portal_state?: Record<string, unknown>
}
```

### `UpdateRecipientPayload`

```ts
type UpdateRecipientPayload = {
  automation_status?: "pending" | "in_progress" | "success" | "failed" | "cancelled"
  automation_execution_id?: string
  portal_status?: "sent" | "seen" | "dismissed" | "clicked"
  portal_state?: Record<string, unknown>
}
```

### `RetriggerAutomationsRequest`

```ts
type RetriggerAutomationsRequest = {
  recipient_ids: string // uuid[]
}
```

### `RetriggerAutomationsResult`

```ts
type RetriggerAutomationsResult = {
  recipient_id: string // uuid
  result: "success" | "failure" | "not_found" | "invalid_status"
  execution_id?: string
  error?: string
}
```

### `UpdatePortalStatusRequest`

```ts
type UpdatePortalStatusRequest = {
  status: "sent" | "seen" | "dismissed" | "clicked"
}
```

### `UpdateEntityUiStatusRequest`

```ts
type UpdateEntityUiStatusRequest = {
  status: "seen" | "dismissed" | "clicked"
  entity_schema?: string
}
```

### `SetupCampaignRequest`

Discriminated by `type`. Each campaign variant has its own request shape;
new variants are added by introducing a new schema and extending the `oneOf` list.


```ts
type SetupCampaignRequest = {
  type: "tariff_change"
  product_recommendation: {
    name?: string
    source_product_id?: string // uuid
    source_price_id?: string // uuid
    offers?: Array<{
      target_id?: { ... }
      items: { ... }
    }>
  }
  campaign: {
    name: string
    goal?: string
    target_ids: string // uuid[]
  }
  journey?: {
    journey_id: string // uuid
  }
  channels?: {
    portal_widget?: {
      portal_id: { ... }
      block_id: { ... }
    }
    email?: {
      automation_id?: { ... }
      template_id?: { ... }
    }
  }
}
```

### `SetupTariffChangeCampaignRequest`

```ts
type SetupTariffChangeCampaignRequest = {
  type: "tariff_change"
  product_recommendation: {
    name?: string
    source_product_id?: string // uuid
    source_price_id?: string // uuid
    offers?: Array<{
      target_id?: { ... }
      items: { ... }
    }>
  }
  campaign: {
    name: string
    goal?: string
    target_ids: string // uuid[]
  }
  journey?: {
    journey_id: string // uuid
  }
  channels?: {
    portal_widget?: {
      portal_id: { ... }
      block_id: { ... }
    }
    email?: {
      automation_id?: { ... }
      template_id?: { ... }
    }
  }
}
```

### `SetupTariffChangeCampaignResponse`

```ts
type SetupTariffChangeCampaignResponse = {
  type: "tariff_change"
  product_recommendation_id: string // uuid
  campaign_id: string // uuid
  journey_id?: string // uuid
  portal_widget_id?: string // uuid
}
```
