# Phone Integration API

- **Base URL:** `https://phone-integration-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/phone-integration](https://docs.epilot.io/api/phone-integration)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.phoneIntegration.batchSearchCustomers(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/phone-integration'

const phoneIntegrationClient = getClient()
authorize(phoneIntegrationClient, () => '<token>')
const { data } = await phoneIntegrationClient.batchSearchCustomers(...)
```

## Operations

**phone-integration**
- [`batchSearchCustomers`](#batchsearchcustomers)

**manager**
- [`getManagerStatus`](#getmanagerstatus)
- [`listPhoneAgents`](#listphoneagents)
- [`assignPhoneAgent`](#assignphoneagent)
- [`removePhoneAgent`](#removephoneagent)
- [`getLiveSnapshot`](#getlivesnapshot)
- [`listLiveAgents`](#listliveagents)
- [`setAgentRouting`](#setagentrouting)
- [`previewAgentRouting`](#previewagentrouting)
- [`listQueues`](#listqueues)
- [`getQueue`](#getqueue)
- [`getCallReport`](#getcallreport)

**operator**
- [`listProviderSetups`](#listprovidersetups)
- [`getProviderSetup`](#getprovidersetup)
- [`setupProvider`](#setupprovider)

**Schemas**
- [`ManagerStatus`](#managerstatus)
- [`PhoneAgent`](#phoneagent)
- [`AssignPhoneAgentRequest`](#assignphoneagentrequest)
- [`ProviderSetup`](#providersetup)
- [`ProviderSetupSummary`](#providersetupsummary)
- [`ProviderSetupRequest`](#providersetuprequest)
- [`CustomerBatchSearchResult`](#customerbatchsearchresult)
- [`CustomerSearchResult`](#customersearchresult)
- [`CustomerIdentifier`](#customeridentifier)
- [`CustomerSummary`](#customersummary)
- [`AgentState`](#agentstate)
- [`AgentPresence`](#agentpresence)
- [`Skill`](#skill)
- [`QueueRef`](#queueref)
- [`PersonRef`](#personref)
- [`EligibilityPath`](#eligibilitypath)
- [`AgentQueueEligibility`](#agentqueueeligibility)
- [`LiveAgent`](#liveagent)
- [`LiveAgentCounters`](#liveagentcounters)
- [`QueueHealth`](#queuehealth)
- [`QueueLive`](#queuelive)
- [`LiveSnapshot`](#livesnapshot)
- [`QueueRoutingStep`](#queueroutingstep)
- [`QueueOverview`](#queueoverview)
- [`EligibleAgent`](#eligibleagent)
- [`WaitingCall`](#waitingcall)
- [`QueueDetail`](#queuedetail)
- [`AgentRoutingRequest`](#agentroutingrequest)
- [`AgentRouting`](#agentrouting)
- [`AgentRoutingPreview`](#agentroutingpreview)
- [`CallReport`](#callreport)
- [`ErrorResponse`](#errorresponse)

### `batchSearchCustomers`

Resolves up to 50 identifiers to epilot customers (Contacts) in one
request — for example every number in an agent's call history.

`GET /v1/customer:batchSearch`

```ts
const { data } = await client.batchSearchCustomers({
  id: ['...'],
  customer_number: ['...'],
  external_id: ['...'],
  phone_number: ['...'],
  email: ['...'],
  x-trace-id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "identifier": {
        "type": "id",
        "value": "+4917012345678"
      },
      "status": "found",
      "customer": {
        "id": "dba8e5f9-8b3f-4608-b887-cd0798fce624",
        "name": "Max Mustermann",
        "customer_number": "4711"
      }
    }
  ]
}
```

</details>

---

### `getManagerStatus`

Whether the caller's organization is ready for phone agents: the telephony provider tenant
exists and is configured. The control center shows a "not set up" state when `ready` is false.
Requires `phon

`GET /v1/manager/status`

```ts
const { data } = await client.getManagerStatus()
```

<details>
<summary>Response</summary>

```json
{
  "provider": "babelforce",
  "ready": true,
  "reasons": ["provider_tenant_missing"]
}
```

</details>

---

### `listPhoneAgents`

Organization members who hold the phone (`phone:use`), each joined with the provider user behind
them. Requires `phone:manage`.

`GET /v1/manager/agents`

```ts
const { data } = await client.listPhoneAgents()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "user_id": "string",
      "email": "string",
      "display_name": "string",
      "status": "active",
      "provider_user_id": "string",
      "provider_roles": ["string"],
      "assigned_at": "1970-01-01T00:00:00.000Z",
      "assigned_by": "string"
    }
  ]
}
```

</details>

---

### `assignPhoneAgent`

Gives an organization member the phone. In order: the member is verified with user-api, their
pairwise subject for the provider is read from identity-api, the provider user is created (or
found) bound

`POST /v1/manager/agents`

```ts
const { data } = await client.assignPhoneAgent(
  null,
  {
    user_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "user_id": "string",
  "email": "string",
  "display_name": "string",
  "status": "active",
  "provider_user_id": "string",
  "provider_roles": ["string"],
  "assigned_at": "1970-01-01T00:00:00.000Z",
  "assigned_by": "string"
}
```

</details>

---

### `removePhoneAgent`

Takes the phone away from a member: the `phone_agent` role is removed first, then the provider
user is deactivated (never deleted: call history keeps referring to it). Requires `phone:manage`.

`DELETE /v1/manager/agents/{user_id}`

```ts
const { data } = await client.removePhoneAgent({
  user_id: 'example',
})
```

---

### `getLiveSnapshot`

One snapshot of the organization's live phone state for the control center's Overview: agent
presence counters and per-queue health (waiting calls, longest wait, eligible vs available
agents). Read fr

`GET /v1/manager/live`

```ts
const { data } = await client.getLiveSnapshot()
```

<details>
<summary>Response</summary>

```json
{
  "captured_at": "1970-01-01T00:00:00.000Z",
  "agents": {
    "total": 0,
    "online": 0,
    "available": 0,
    "on_call": 0,
    "wrap_up": 0,
    "offline": 0
  },
  "queues": [
    {
      "id": "string",
      "name": "string",
      "waiting": 0,
      "longest_wait_seconds": 0,
      "eligible": 0,
      "available": 0,
      "health": "healthy"
    }
  ],
  "calls_waiting": 0,
  "longest_wait_seconds": 0
}
```

</details>

---

### `listLiveAgents`

The organization's phone agents with their live phone status, their skills (as the phone system
holds them) and the queues they can take calls from. Agents that are epilot phone agents carry
the epilo

`GET /v1/manager/agents/live`

```ts
const { data } = await client.listLiveAgents()
```

<details>
<summary>Response</summary>

```json
{
  "captured_at": "1970-01-01T00:00:00.000Z",
  "results": [
    {
      "provider_agent_id": "string",
      "user_id": "string",
      "name": "string",
      "email": "string",
      "enabled": true,
      "state": "available",
      "presence": {
        "name": "string",
        "label": "string",
        "available": true
      },
      "display_status": "string",
      "skills": ["string"],
      "queues": [
        {
          "id": "string",
          "name": "string",
          "via": ["skill"],
          "skills": ["string"],
          "locked": true
        }
      ],
      "current_call": {
        "started_at": "1970-01-01T00:00:00.000Z",
        "queue_name": "string"
      }
    }
  ]
}
```

</details>

---

### `setAgentRouting`

Sets an agent's skills and direct queue membership (full sets, not deltas), in this order:
1. Skills: the agent's skills in the phone system are replaced by `skills`, so the phone system
   routes on 

`PUT /v1/manager/agents/{provider_agent_id}/routing`

```ts
const { data } = await client.setAgentRouting(
  {
    provider_agent_id: 'example',
  },
  {
    skills: ['string'],
    queue_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "provider_agent_id": "string",
  "skills": ["string"],
  "queues": [
    {
      "id": "string",
      "name": "string",
      "via": ["skill"],
      "skills": ["string"],
      "locked": true
    }
  ]
}
```

</details>

---

### `previewAgentRouting`

The routing impact of `setAgentRouting` with the same body, without changing anything: the
queues the agent can take calls from now (as the phone system routes today) and after the
change, what is add

`POST /v1/manager/agents/{provider_agent_id}/routing:preview`

```ts
const { data } = await client.previewAgentRouting(
  {
    provider_agent_id: 'example',
  },
  {
    skills: ['string'],
    queue_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "provider_agent_id": "string",
  "before": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "after": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "added": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "removed": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "coverage_lost": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "locked": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

</details>

---

### `listQueues`

The organization's queues with live demand (waiting calls, longest wait), staffing (eligible
vs available agents), derived health and who can take their calls: the routing steps in the
order the phone

`GET /v1/manager/queues`

```ts
const { data } = await client.listQueues()
```

<details>
<summary>Response</summary>

```json
{
  "captured_at": "1970-01-01T00:00:00.000Z",
  "results": [
    {
      "id": "string",
      "name": "string",
      "waiting": 0,
      "longest_wait_seconds": 0,
      "eligible": 0,
      "available": 0,
      "health": "healthy",
      "numbers": ["string"],
      "routing": [
        {
          "id": "string",
          "order": 0,
          "label": "string",
          "enabled": true,
          "skills": ["string"],
          "people": [
            {
              "provider_agent_id": "string",
              "user_id": "string",
              "name": "string"
            }
          ],
          "managed_by_epilot": true
        }
      ]
    }
  ]
}
```

</details>

---

### `getQueue`

One queue for the control center's queue drawer: the overview fields plus the agents currently
eligible for it (with live status and how they are eligible) and the calls waiting in it.
Requires `phone

`GET /v1/manager/queues/{queue_id}`

```ts
const { data } = await client.getQueue({
  queue_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "waiting": 0,
  "longest_wait_seconds": 0,
  "eligible": 0,
  "available": 0,
  "health": "healthy",
  "numbers": ["string"],
  "routing": [
    {
      "id": "string",
      "order": 0,
      "label": "string",
      "enabled": true,
      "skills": ["string"],
      "people": [
        {
          "provider_agent_id": "string",
          "user_id": "string",
          "name": "string"
        }
      ],
      "managed_by_epilot": true
    }
  ],
  "captured_at": "1970-01-01T00:00:00.000Z",
  "eligible_agents": [
    {
      "provider_agent_id": "string",
      "user_id": "string",
      "name": "string",
      "email": "string",
      "state": "available",
      "presence": {
        "name": "string",
        "label": "string",
        "available": true
      },
      "via": ["skill"],
      "skills": ["string"]
    }
  ],
  "waiting_calls": [
    {
      "id": "string",
      "from_masked": "string",
      "waited_seconds": 0,
      "state": "string"
    }
  ]
}
```

</details>

---

### `getCallReport`

Inbound call outcomes for a period, from the provider's call reporting: how many inbound calls
there were, how many an agent handled (bridged) and how many ended without an agent (abandoned
or failed)

`GET /v1/manager/reporting/calls`

```ts
const { data } = await client.getCallReport({
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "inbound_total": 0,
  "handled_by_agent": 0,
  "abandoned_or_failed": 0,
  "previous_period": {
    "from": "1970-01-01T00:00:00.000Z",
    "to": "1970-01-01T00:00:00.000Z",
    "inbound_total": 0
  }
}
```

</details>

---

### `listProviderSetups`

Every organization that has a telephony provider tenant, for the admin portal's overview: the
provider's sub-accounts (one per organization, keyed by the organization id) joined with this
service's se

`GET /v1/operator/provider-setups`

```ts
const { data } = await client.listProviderSetups()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "org_id": "string",
      "provider": "babelforce",
      "ready": true,
      "setup_recorded": true,
      "tenant": {
        "id": "string",
        "name": "string",
        "org_key": "string"
      },
      "sso_identity_client_id": "string",
      "last_setup_by": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getProviderSetup`

What has been set up at the telephony provider for this organization.

`GET /v1/operator/organizations/{org_id}/provider`

```ts
const { data } = await client.getProviderSetup({
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "provider": "babelforce",
  "org_id": "string",
  "ready": true,
  "tenant": {
    "id": "string",
    "name": "string",
    "org_key": "string",
    "created_at": "1970-01-01T00:00:00.000Z"
  },
  "scim": {
    "configured": true,
    "roles_enabled": true
  },
  "sso": {
    "configured": true,
    "identity_client_id": "string",
    "configured_at": "1970-01-01T00:00:00.000Z"
  },
  "last_setup_by": "string"
}
```

</details>

---

### `setupProvider`

Prepares the telephony provider for an organization, idempotently and in order: the provider
tenant (Babelforce sub-account keyed by the organization id), its SCIM configuration with role
management o

`POST /v1/operator/organizations/{org_id}/provider:setup`

```ts
const { data } = await client.setupProvider(
  {
    org_id: 'example',
  },
  {
    account_name: 'string',
    identity_client_id: 'string',
    identity_client_secret: 'stringstring'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "provider": "babelforce",
  "org_id": "string",
  "ready": true,
  "tenant": {
    "id": "string",
    "name": "string",
    "org_key": "string",
    "created_at": "1970-01-01T00:00:00.000Z"
  },
  "scim": {
    "configured": true,
    "roles_enabled": true
  },
  "sso": {
    "configured": true,
    "identity_client_id": "string",
    "configured_at": "1970-01-01T00:00:00.000Z"
  },
  "last_setup_by": "string"
}
```

</details>

---

## Schemas

### `ManagerStatus`

```ts
type ManagerStatus = {
  provider: "babelforce"
  ready: boolean
  reasons: "provider_tenant_missing" | "sso_not_configured" | "scim_not_configured" | "identity_enablement_missing"[]
}
```

### `PhoneAgent`

```ts
type PhoneAgent = {
  user_id: string
  email: string
  display_name?: string
  status: "active" | "pending" | "disabled" | "missing_provider" | "missing_role"
  provider_user_id?: string
  provider_roles?: string[]
  assigned_at?: string // date-time
  assigned_by?: string
}
```

### `AssignPhoneAgentRequest`

```ts
type AssignPhoneAgentRequest = {
  user_id: string
}
```

### `ProviderSetup`

```ts
type ProviderSetup = {
  provider: "babelforce"
  org_id: string
  ready: boolean
  tenant: {
    id: string
    name: string
    org_key: string
    created_at?: string // date-time
  }
  scim: {
    configured: boolean
    roles_enabled: boolean
  }
  sso: {
    configured: boolean
    identity_client_id?: string
    configured_at?: string // date-time
  }
  last_setup_by?: string
}
```

### `ProviderSetupSummary`

One organization's provider setup, as listed in the overview (no live SCIM or SSO reads).

```ts
type ProviderSetupSummary = {
  org_id: string
  provider: "babelforce"
  ready: boolean
  setup_recorded: boolean
  tenant: {
    id: string
    name: string
    org_key: string
  }
  sso_identity_client_id?: string
  last_setup_by?: string
  updated_at?: string // date-time
}
```

### `ProviderSetupRequest`

```ts
type ProviderSetupRequest = {
  account_name?: string
  identity_client_id: string
  identity_client_secret: string
}
```

### `CustomerBatchSearchResult`

```ts
type CustomerBatchSearchResult = {
  results: Array<{
    identifier: {
      type: { ... }
      value: { ... }
    }
    status: "found" | "not_found" | "ambiguous" | "invalid" | "error"
    customer?: {
      id: { ... }
      name: { ... }
      customer_number?: { ... }
    }
  }>
}
```

### `CustomerSearchResult`

```ts
type CustomerSearchResult = {
  identifier: {
    type: "id" | "customer_number" | "external_id" | "phone_number" | "email"
    value: string
  }
  status: "found" | "not_found" | "ambiguous" | "invalid" | "error"
  customer?: {
    id: string
    name: string
    customer_number?: string
  }
}
```

### `CustomerIdentifier`

```ts
type CustomerIdentifier = {
  type: "id" | "customer_number" | "external_id" | "phone_number" | "email"
  value: string
}
```

### `CustomerSummary`

Present when `status` is `found`

```ts
type CustomerSummary = {
  id: string
  name: string
  customer_number?: string
}
```

### `AgentState`

The agent's live line state as the provider reports it, plus `offline` for an agent whose
presence is not available (not signed in or on a busy presence) and `unknown` when the
provider gives no state. `in_call` covers ringing-to-bridged; `wrap_up` is the post-call time.


```ts
type AgentState = "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown"
```

### `AgentPresence`

The provider presence the agent has selected (e.g. Available, Break, Meeting)

```ts
type AgentPresence = {
  name: string
  label: string
  available: boolean
}
```

### `Skill`

A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
`<skill category>:`<label>`` (e.g. `language:german`), which the control center shows as
"Category · Label"; a skill without a colon has no category.


```ts
type Skill = string
```

### `QueueRef`

```ts
type QueueRef = {
  id: string
  name: string
}
```

### `PersonRef`

An agent as a routing step names them

```ts
type PersonRef = {
  provider_agent_id: string
  user_id?: string
  name: string
}
```

### `EligibilityPath`

How an agent can take a queue's calls:
- `skill`: the queue routes to people with a skill the agent has (changes with the agent's skills);
- `direct`: the agent is in the queue's epilot-managed step (added from the control center);
- `routing`: the phone system's own routing names the agent (a team 

```ts
type EligibilityPath = "skill" | "direct" | "routing"
```

### `AgentQueueEligibility`

A queue an agent can take calls from, and why

```ts
type AgentQueueEligibility = {
  id: string
  name: string
  via: "skill" | "direct" | "routing"[]
  skills: string[]
  locked: boolean
}
```

### `LiveAgent`

```ts
type LiveAgent = {
  provider_agent_id: string
  user_id?: string
  name: string
  email?: string
  enabled: boolean
  state: "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown"
  presence?: {
    name: string
    label: string
    available: boolean
  }
  display_status?: string
  skills: string[]
  queues: Array<{
    id: string
    name: string
    via: "skill" | "direct" | "routing"[]
    skills: string[]
    locked: boolean
  }>
  current_call?: {
    started_at: string // date-time
    queue_name?: string
  }
}
```

### `LiveAgentCounters`

Presence counters over the organization's agents

```ts
type LiveAgentCounters = {
  total: number
  online: number
  available: number
  on_call: number
  wrap_up: number
  offline: number
}
```

### `QueueHealth`

`at_risk`: calls are waiting and no eligible agent is available. `healthy`: at least one
eligible agent is available. `quiet`: nothing waiting and nobody available.


```ts
type QueueHealth = "healthy" | "at_risk" | "quiet"
```

### `QueueLive`

Live demand and staffing of one queue

```ts
type QueueLive = {
  id: string
  name: string
  waiting: number
  longest_wait_seconds?: number
  eligible: number
  available: number
  health: "healthy" | "at_risk" | "quiet"
}
```

### `LiveSnapshot`

```ts
type LiveSnapshot = {
  captured_at: string // date-time
  agents: {
    total: number
    online: number
    available: number
    on_call: number
    wrap_up: number
    offline: number
  }
  queues: Array<{
    id: string
    name: string
    waiting: number
    longest_wait_seconds?: number
    eligible: number
    available: number
    health: "healthy" | "at_risk" | "quiet"
  }>
  calls_waiting: number
  longest_wait_seconds?: number
}
```

### `QueueRoutingStep`

One step of who can take a queue's calls, in the order the phone system tries them. A step
offers calls to the people it names and to everyone with any of its skills. Teams set up in the
phone system appear as the people they contain. The epilot-managed step holds the people added
from the control c

```ts
type QueueRoutingStep = {
  id: string
  order: number
  label: string
  enabled: boolean
  skills: string[]
  people: Array<{
    provider_agent_id: string
    user_id?: string
    name: string
  }>
  managed_by_epilot: boolean
}
```

### `QueueOverview`

```ts
type QueueOverview = {
  id: string
  name: string
  waiting: number
  longest_wait_seconds?: number
  eligible: number
  available: number
  health: "healthy" | "at_risk" | "quiet"
  numbers?: string[]
  routing: Array<{
    id: string
    order: number
    label: string
    enabled: boolean
    skills: string[]
    people: Array<{
      provider_agent_id: { ... }
      user_id?: { ... }
      name: { ... }
    }>
    managed_by_epilot: boolean
  }>
}
```

### `EligibleAgent`

An agent who can take the queue's calls, with live status

```ts
type EligibleAgent = {
  provider_agent_id: string
  user_id?: string
  name: string
  email?: string
  state: "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown"
  presence?: {
    name: string
    label: string
    available: boolean
  }
  via: "skill" | "direct" | "routing"[]
  skills: string[]
}
```

### `WaitingCall`

```ts
type WaitingCall = {
  id: string
  from_masked?: string
  waited_seconds: number
  state: string
}
```

### `QueueDetail`

```ts
type QueueDetail = {
  captured_at: string // date-time
  eligible_agents: Array<{
    provider_agent_id: string
    user_id?: string
    name: string
    email?: string
    state: "available" | "ringing" | "in_call" | "wrap_up" | "busy" | "declined" | "unreachable" | "selected" | "offline" | "unknown"
    presence?: {
      name: { ... }
      label: { ... }
      available: { ... }
    }
    via: "skill" | "direct" | "routing"[]
    skills: string[]
  }>
  waiting_calls: Array<{
    id: string
    from_masked?: string
    waited_seconds: number
    state: string
  }>
}
```

### `AgentRoutingRequest`

```ts
type AgentRoutingRequest = {
  skills: string[]
  queue_ids: string[]
}
```

### `AgentRouting`

```ts
type AgentRouting = {
  provider_agent_id: string
  skills: string[]
  queues: Array<{
    id: string
    name: string
    via: "skill" | "direct" | "routing"[]
    skills: string[]
    locked: boolean
  }>
}
```

### `AgentRoutingPreview`

```ts
type AgentRoutingPreview = {
  provider_agent_id: string
  before: Array<{
    id: string
    name: string
  }>
  after: Array<{
    id: string
    name: string
  }>
  added: Array<{
    id: string
    name: string
  }>
  removed: Array<{
    id: string
    name: string
  }>
  coverage_lost: Array<{
    id: string
    name: string
  }>
  locked: Array<{
    id: string
    name: string
  }>
}
```

### `CallReport`

```ts
type CallReport = {
  from: string // date-time
  to: string // date-time
  inbound_total: number
  handled_by_agent: number
  abandoned_or_failed: number
  previous_period: {
    from: string // date-time
    to: string // date-time
    inbound_total: number
  }
}
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  status: number
  error: string
  code?: string
}
```
