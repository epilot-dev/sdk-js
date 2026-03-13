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
- [`matchCampaigns`](#matchcampaigns)

**Campaign Delivery**
- [`retriggerCampaignAutomations`](#retriggercampaignautomations)

**Target**
- [`matchTargets`](#matchtargets)
- [`getTargetQueries`](#gettargetqueries)

**Campaign Recipient**
- [`createRecipient`](#createrecipient)
- [`updateRecipient`](#updaterecipient)
- [`updateRecipientPortalStatus`](#updaterecipientportalstatus)
- [`getRecipients`](#getrecipients)

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
- [`MatchTargetParams`](#matchtargetparams)
- [`GetTargetQueriesParams`](#gettargetqueriesparams)
- [`TargetQueryResult`](#targetqueryresult)
- [`AutomationStatus`](#automationstatus)
- [`PortalStatus`](#portalstatus)
- [`Recipient`](#recipient)
- [`BaseRecipientPayload`](#baserecipientpayload)
- [`AutomationRecipientPayload`](#automationrecipientpayload)
- [`PortalRecipientPayload`](#portalrecipientpayload)
- [`CreateRecipientPayload`](#createrecipientpayload)
- [`UpdateRecipientPayload`](#updaterecipientpayload)
- [`RetriggerAutomationsRequest`](#retriggerautomationsrequest)
- [`RetriggerAutomationsResult`](#retriggerautomationsresult)
- [`UpdatePortalStatusRequest`](#updateportalstatusrequest)

### `changeCampaignStatus`

Change the status of a campaign

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

Get portals usage info for a campaign

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

Retrigger automations for campaign recipients

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

### `matchCampaigns`

Match campaigns

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

### `matchTargets`

Match targets

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

Get target queries

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

Create a recipient associated with a campaign

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipient`

Update a recipient

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateRecipientPortalStatus`

Update portal status for a campaign recipient

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
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getRecipients`

Get campaign recipients

`GET /v1/campaign/{campaign_id}/recipients`

```ts
const { data } = await client.getRecipients({
  campaign_id: 'example',
  limit: 1,
  next: 'example',
  q: 'example',
  automation_status: 'example',
  portal_status: 'example',
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
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next": "string",
  "total": 0
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
  code: "CAMPAIGN_NOT_FOUND" | "CAMPAIGN_HAS_NO_TARGET" | "CAMPAIGN_HAS_NO_DELIVERY_METHOD" | "CAMPAIGN_HAS_JOB_IN_PROGRESS" | "CAMPAIGN_HAS_UNEXPECTED_STATUS" | "JOB_TOKEN_MISSING" | "TARGET_WITHOUT_FILTERS"
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
