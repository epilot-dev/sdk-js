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
- [`getActiveCall`](#getactivecall)
- [`reportActiveCall`](#reportactivecall)
- [`clearActiveCall`](#clearactivecall)

**manager**
- [`getManagerStatus`](#getmanagerstatus)
- [`listPhoneAgents`](#listphoneagents)
- [`assignPhoneAgent`](#assignphoneagent)
- [`removePhoneAgent`](#removephoneagent)
- [`getLiveSnapshot`](#getlivesnapshot)
- [`listLiveAgents`](#listliveagents)
- [`setAgentRouting`](#setagentrouting)
- [`previewAgentRouting`](#previewagentrouting)
- [`setAgentPresence`](#setagentpresence)
- [`listAgentPresences`](#listagentpresences)
- [`listQueues`](#listqueues)
- [`getQueue`](#getqueue)
- [`getCallReport`](#getcallreport)
- [`getLiveKpis`](#getlivekpis)
- [`getAgentPerformance`](#getagentperformance)
- [`listMissedCalls`](#listmissedcalls)
- [`requestMissedCallCallback`](#requestmissedcallcallback)
- [`getAgentActivity`](#getagentactivity)
- [`getQueueSettings`](#getqueuesettings)
- [`setQueueSettings`](#setqueuesettings)
- [`getCallHandlingSettings`](#getcallhandlingsettings)
- [`setCallHandlingSettings`](#setcallhandlingsettings)
- [`getQueuePerformance`](#getqueueperformance)
- [`listSkills`](#listskills)
- [`createSkill`](#createskill)
- [`deleteSkill`](#deleteskill)
- [`setQueueSkill`](#setqueueskill)
- [`removeQueueSkill`](#removequeueskill)

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
- [`ActiveCall`](#activecall)
- [`ActiveCallReport`](#activecallreport)
- [`AgentState`](#agentstate)
- [`AgentPresence`](#agentpresence)
- [`AgentPresenceRequest`](#agentpresencerequest)
- [`AgentPresenceChange`](#agentpresencechange)
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
- [`QueuePerformance`](#queueperformance)
- [`QueuePerformanceReport`](#queueperformancereport)
- [`SkillCatalogueEntry`](#skillcatalogueentry)
- [`SkillCatalogue`](#skillcatalogue)
- [`CreateSkillRequest`](#createskillrequest)
- [`SkillDeletion`](#skilldeletion)
- [`QueueSkillChange`](#queueskillchange)
- [`ErrorResponse`](#errorresponse)
- [`KpiPeriod`](#kpiperiod)
- [`LiveKpis`](#livekpis)
- [`AgentPerformance`](#agentperformance)
- [`AgentPerformanceReport`](#agentperformancereport)
- [`MissedCallCaller`](#missedcallcaller)
- [`MissedCallCallback`](#missedcallcallback)
- [`MissedCallCallbackRequest`](#missedcallcallbackrequest)
- [`MissedCall`](#missedcall)
- [`MissedCallList`](#missedcalllist)
- [`AgentActivityEvent`](#agentactivityevent)
- [`AgentPresenceTotal`](#agentpresencetotal)
- [`AgentActivity`](#agentactivity)
- [`QueueSettingsUpdate`](#queuesettingsupdate)
- [`QueueSettings`](#queuesettings)
- [`WrapUpTimes`](#wrapuptimes)
- [`CallHandlingSettings`](#callhandlingsettings)

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

### `getActiveCall`

Whether the signed-in user is on a phone call right now, and which conversation it is. The
answer is about the caller only (the user of the bearer token).

`GET /v1/calls/active`

```ts
const { data } = await client.getActiveCall()
```

<details>
<summary>Response</summary>

```json
{
  "on_call": true,
  "conversation_id": "01KW704DAM1PM5SDGKFDY9BNK0",
  "started_at": "1970-01-01T00:00:00.000Z",
  "source": "softphone",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `reportActiveCall`

Reports the call the signed-in user is on. Sent by the epilot 360 phone when a call is
answered and again every 30 seconds while it lasts: a report is valid for 2 minutes
(`expires_at`), so a phone th

`PUT /v1/calls/active`

```ts
const { data } = await client.reportActiveCall(
  null,
  {
    conversation_id: '01KW704DAM1PM5SDGKFDY9BNK0',
    started_at: '2026-11-10T10:00:00.000Z'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "on_call": true,
  "conversation_id": "01KW704DAM1PM5SDGKFDY9BNK0",
  "started_at": "1970-01-01T00:00:00.000Z",
  "source": "softphone",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `clearActiveCall`

Clears the signed-in user's reported call, when their part of it ended (hung up, or handed
over to another agent). With `conversation_id`, only a report of that conversation is
cleared, so a late "cal

`DELETE /v1/calls/active`

```ts
const { data } = await client.clearActiveCall({
  conversation_id: 'example',
})
```

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
agents). The pro

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
      "expected_wait_seconds": 0,
      "eligible": 0,
      "available": 0,
      "health": "healthy"
    }
  ],
  "calls_waiting": 0,
  "longest_wait_seconds": 0,
  "expected_wait_seconds": 0
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
1. Skills: the agent's skills in the phone system are replaced by `skills` (lowercased, see
   `Skill`), so t

`PUT /v1/manager/agents/{provider_agent_id}/routing`

```ts
const { data } = await client.setAgentRouting(
  {
    provider_agent_id: 'example',
  },
  {
    skills: ['string'],
    queue_ids: ['string'],
    include_own_steps: false
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
    queue_ids: ['string'],
    include_own_steps: false
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

### `setAgentPresence`

Puts the agent on one of the phone system's presences (`listAgentPresences`), as the agent could
in the phone app. A presence that is not `available` stops queue calls to the agent until it
changes ag

`PUT /v1/manager/agents/{provider_agent_id}/presence`

```ts
const { data } = await client.setAgentPresence(
  {
    provider_agent_id: 'example',
  },
  {
    presence: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "provider_agent_id": "string",
  "presence": {
    "name": "string",
    "label": "string",
    "available": true
  }
}
```

</details>

---

### `listAgentPresences`

The presences the organization's agents can be on (e.g. Available, Break, Meeting), as the phone
system defines them. `available` presences let agents take queue calls. Requires `phone:manage`.

`GET /v1/manager/presences`

```ts
const { data } = await client.listAgentPresences()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "name": "string",
      "label": "string",
      "available": true
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
      "expected_wait_seconds": 0,
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
          "team_members": ["string"],
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
  "expected_wait_seconds": 0,
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
      "team_members": ["string"],
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
      "contact": {
        "id": "string",
        "name": "string"
      },
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

### `getLiveKpis`

Service KPIs of the organization's phone team for a period: call counts, abandon rate, waits
and handling times, from the provider's metrics or, where it has none, its call reporting. A KPI
the provid

`GET /v1/manager/live/kpis`

```ts
const { data } = await client.getLiveKpis({
  period: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "captured_at": "1970-01-01T00:00:00.000Z",
  "period": "today",
  "calls_total": 0,
  "answered_total": 0,
  "abandoned_total": 0,
  "abandon_rate_percent": 0,
  "average_wait_seconds": 0,
  "longest_wait_seconds": 0,
  "average_talk_seconds": 0,
  "average_handle_seconds": 0,
  "average_hold_seconds": 0
}
```

</details>

---

### `getAgentPerformance`

Per-agent performance for a period from the provider's call reporting: calls handled and talk,
hold, wrap-up and handle times, one row per agent who handled at least one call. Agents that are
epilot p

`GET /v1/manager/reporting/agents`

```ts
const { data } = await client.getAgentPerformance({
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
  "results": [
    {
      "provider_agent_id": "string",
      "user_id": "string",
      "name": "string",
      "calls_handled": 0,
      "outbound_calls": 0,
      "talk_seconds_total": 0,
      "talk_seconds_average": 0,
      "hold_seconds_total": 0,
      "wrap_up_seconds_average": 0,
      "handle_seconds_average": 0
    }
  ]
}
```

</details>

---

### `listMissedCalls`

Callers who did not reach an agent in a period, newest first, one row per caller: an inbound
call (grouped by the provider's session, so transfer legs count once) that ended without being
bridged to a

`GET /v1/manager/missed-calls`

```ts
const { data } = await client.listMissedCalls({
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
  "results": [
    {
      "call_id": "string",
      "last_missed_at": "1970-01-01T00:00:00.000Z",
      "first_missed_at": "1970-01-01T00:00:00.000Z",
      "attempts": 1,
      "queue": {
        "id": "string",
        "name": "string"
      },
      "longest_wait_seconds": 0,
      "caller": {
        "anonymous": true,
        "number_masked": "string",
        "contact": {
          "id": "string",
          "name": "string"
        }
      },
      "resolved": true,
      "can_call_back": true,
      "callback": {
        "state": "queued",
        "requested_at": "1970-01-01T00:00:00.000Z",
        "requested_by": "string",
        "queue": {
          "id": "string",
          "name": "string"
        },
        "callback_call_id": "string"
      }
    }
  ]
}
```

</details>

---

### `requestMissedCallCallback`

Asks the phone system to call the caller of a missed call back: the provider queues an outbound
callback on a queue (the missed call's queue unless `queue_id` names another), so the next
eligible agen

`POST /v1/manager/missed-calls/{call_id}/callback`

```ts
const { data } = await client.requestMissedCallCallback(
  {
    call_id: 'example',
  },
  {
    queue_id: 'string'
  },
)
```

---

### `getAgentActivity`

An agent's activity in a period from the provider's agent logs: presence changes and calls in
time order, the time spent on each presence and the number of calls handled. The window is at
most 31 days

`GET /v1/manager/agents/{provider_agent_id}/activity`

```ts
const { data } = await client.getAgentActivity({
  provider_agent_id: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "provider_agent_id": "string",
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "events": [
    {
      "at": "1970-01-01T00:00:00.000Z",
      "kind": "presence",
      "presence": {
        "name": "string",
        "label": "string",
        "available": true
      },
      "call": {
        "call_id": "string",
        "direction": "inbound",
        "queue_name": "string",
        "duration_seconds": 0
      },
      "description": "string"
    }
  ],
  "presence_totals": [
    {
      "presence": {
        "name": "string",
        "label": "string",
        "available": true
      },
      "seconds": 0
    }
  ],
  "calls_handled": 0
}
```

</details>

---

### `getQueueSettings`

A queue's call handling settings as the phone system holds them: how many callers may wait,
how long an agent's phone rings, the wrap-up time after a call and how many agents are tried
per call.
Requi

`GET /v1/manager/queues/{queue_id}/settings`

```ts
const { data } = await client.getQueueSettings({
  queue_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "queue_id": "string",
  "name": "string",
  "max_size": 0,
  "ring_timeout_seconds": 5,
  "wrap_up_seconds": 0,
  "max_dial_count": 1
}
```

</details>

---

### `setQueueSettings`

Replaces a queue's call handling settings (all fields, not a delta); the phone system applies
them to the next call. The queue's name and routing are not changed.
Requires `phone:manage`.

`PUT /v1/manager/queues/{queue_id}/settings`

```ts
const { data } = await client.setQueueSettings(
  {
    queue_id: 'example',
  },
  {
    max_size: 0,
    ring_timeout_seconds: 5,
    wrap_up_seconds: 0,
    max_dial_count: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "queue_id": "string",
  "name": "string",
  "max_size": 0,
  "ring_timeout_seconds": 5,
  "wrap_up_seconds": 0,
  "max_dial_count": 1
}
```

</details>

---

### `getCallHandlingSettings`

The organization's call handling settings for all agents: wrap-up rules (including whether
agents may call out during wrap-up), wrap-up times after unsuccessful calls, and recording
defaults.
Requires

`GET /v1/manager/settings/call-handling`

```ts
const { data } = await client.getCallHandlingSettings()
```

<details>
<summary>Response</summary>

```json
{
  "wrap_up": {
    "inbound_cancel_allowed": true,
    "inbound_extend_allowed": true,
    "inbound_max_extension_seconds": 0,
    "outbound_enabled": true,
    "outbound_cancel_allowed": true,
    "outbound_extend_allowed": true,
    "outbound_max_extension_seconds": 0,
    "outbound_calls_allowed": true
  },
  "after_unsuccessful_inbound": {
    "busy_seconds": 0,
    "unreachable_seconds": 0,
    "declined_seconds": 0
  },
  "after_unsuccessful_outbound": {
    "busy_seconds": 0,
    "unreachable_seconds": 0,
    "declined_seconds": 0
  },
  "recording": {
    "always_record_outbound": true,
    "agents_may_delete": true,
    "hide_recording_controls": true
  }
}
```

</details>

---

### `setCallHandlingSettings`

Replaces the organization's call handling settings (the full object, not a delta).
Requires `phone:manage`.

`PUT /v1/manager/settings/call-handling`

```ts
const { data } = await client.setCallHandlingSettings(
  null,
  {
    wrap_up: {
      inbound_cancel_allowed: true,
      inbound_extend_allowed: true,
      inbound_max_extension_seconds: 0,
      outbound_enabled: true,
      outbound_cancel_allowed: true,
      outbound_extend_allowed: true,
      outbound_max_extension_seconds: 0,
      outbound_calls_allowed: true
    },
    after_unsuccessful_inbound: {
      busy_seconds: 0,
      unreachable_seconds: 0,
      declined_seconds: 0
    },
    after_unsuccessful_outbound: {
      busy_seconds: 0,
      unreachable_seconds: 0,
      declined_seconds: 0
    },
    recording: {
      always_record_outbound: true,
      agents_may_delete: true,
      hide_recording_controls: true
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "wrap_up": {
    "inbound_cancel_allowed": true,
    "inbound_extend_allowed": true,
    "inbound_max_extension_seconds": 0,
    "outbound_enabled": true,
    "outbound_cancel_allowed": true,
    "outbound_extend_allowed": true,
    "outbound_max_extension_seconds": 0,
    "outbound_calls_allowed": true
  },
  "after_unsuccessful_inbound": {
    "busy_seconds": 0,
    "unreachable_seconds": 0,
    "declined_seconds": 0
  },
  "after_unsuccessful_outbound": {
    "busy_seconds": 0,
    "unreachable_seconds": 0,
    "declined_seconds": 0
  },
  "recording": {
    "always_record_outbound": true,
    "agents_may_delete": true,
    "hide_recording_controls": true
  }
}
```

</details>

---

### `getQueuePerformance`

Inbound call outcomes per queue for a period, derived from the provider's call reporting (the
phone system has no per-queue report): every inbound call that started in [from, to) is counted
for the qu

`GET /v1/manager/reporting/queues`

```ts
const { data } = await client.getQueuePerformance({
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
  "results": [
    {
      "queue": {
        "id": "string",
        "name": "string"
      },
      "inbound_total": 0,
      "handled_by_agent": 0,
      "abandoned_or_failed": 0,
      "abandon_rate_percent": 0,
      "average_wait_seconds": 0
    }
  ]
}
```

</details>

---

### `listSkills`

The organization's skill catalogue: the skills epilot keeps for it (created in the control
center, `source: epilot`) together with every skill the phone system already uses on an agent or
in a queue's

`GET /v1/manager/skills`

```ts
const { data } = await client.listSkills()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "tag": "string",
      "source": "epilot",
      "created_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string"
    }
  ]
}
```

</details>

---

### `createSkill`

Adds a skill to the organization's catalogue (epilot only: nothing is written to the phone
system until an agent gets the skill or a queue accepts it). The skill is trimmed, must then be
1 to 100 char

`POST /v1/manager/skills`

```ts
const { data } = await client.createSkill(
  null,
  {
    tag: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "tag": "string",
  "source": "epilot",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `deleteSkill`

Deletes a skill everywhere (in any letter case, see `Skill`): it is taken from every agent that has it and from every routing step
of every queue that accepts it in the phone system, then removed from

`DELETE /v1/manager/skills/{tag}`

```ts
const { data } = await client.deleteSkill({
  tag: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "tag": "string",
  "agents_updated": 0,
  "queues_updated": 0
}
```

</details>

---

### `setQueueSkill`

The queue accepts the skill: every agent with it can take the queue's calls. epilot adds the
skill to the queue's FIRST enabled routing step of the organization's own in the phone system
(lowest order

`PUT /v1/manager/queues/{queue_id}/skills/{tag}`

```ts
const { data } = await client.setQueueSkill({
  queue_id: 'example',
  tag: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "queue": {
    "id": "string",
    "name": "string"
  },
  "tag": "string",
  "accepted": true,
  "step": {
    "id": "string",
    "label": "string"
  }
}
```

</details>

---

### `removeQueueSkill`

The queue no longer accepts the skill: it is removed from every routing step of the queue that
lists it (enabled or not). Idempotent. Requires `phone:manage`.

`DELETE /v1/manager/queues/{queue_id}/skills/{tag}`

```ts
const { data } = await client.removeQueueSkill({
  queue_id: 'example',
  tag: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "queue": {
    "id": "string",
    "name": "string"
  },
  "tag": "string",
  "accepted": true,
  "step": {
    "id": "string",
    "label": "string"
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

### `ActiveCall`

The phone call a user is on right now.

```ts
type ActiveCall = {
  on_call: boolean
  conversation_id?: string
  started_at?: string // date-time
  source?: "softphone" | "provider"
  expires_at?: string // date-time
}
```

### `ActiveCallReport`

```ts
type ActiveCallReport = {
  conversation_id: string
  started_at?: string
}
```

### `AgentState`

The agent's live line state as the provider reports it, plus `busy` for anyone who cannot take a
queue call for a reason other than a call: on a presence that takes no calls (e.g. Busy, Break),
without a presence, or disabled at the provider; `busy` also covers the provider's busy line
state. `unkno

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

### `AgentPresenceRequest`

```ts
type AgentPresenceRequest = {
  presence: string
}
```

### `AgentPresenceChange`

```ts
type AgentPresenceChange = {
  provider_agent_id: string
  presence: {
    name: string
    label: string
    available: boolean
  }
}
```

### `Skill`

A skill as the phone system holds it (Babelforce: an agent tag). epilot's convention for skills is
`<skill category>:`<label>`` (e.g. `language:german`), which the control center shows as
"Category · Label"; a skill without a colon has no category.
Skills are case-insensitive and stored lowercased, in

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
- `direct`: a step of the queue names the agent, the epilot-managed one or one set up in the phone
  system; the control center can take them off the queue;
- `r

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

`at_risk`: a waiting caller has no agent to take them: every caller not yet with an agent needs
their own eligible agent who is available or being rung, one agent counting once across the
queues of the same answer (so three callers and one free agent, or two queues sharing one free
agent, are at ris

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
  expected_wait_seconds?: number
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
    expected_wait_seconds?: number
    eligible: number
    available: number
    health: "healthy" | "at_risk" | "quiet"
  }>
  calls_waiting: number
  longest_wait_seconds?: number
  expected_wait_seconds?: number
}
```

### `QueueRoutingStep`

One step of who can take a queue's calls, in the order the phone system tries them. A step
offers calls to the people it names and to everyone with any of its skills. Teams set up in the
phone system appear as the people they contain (`team_members`). The epilot-managed step holds
the people added f

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
  team_members: string[]
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
  expected_wait_seconds?: number
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
    team_members: string[]
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
  contact?: {
    id: string
    name: string
  }
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
    contact?: {
      id: { ... }
      name: { ... }
    }
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
  include_own_steps?: boolean
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

### `QueuePerformance`

```ts
type QueuePerformance = {
  queue: {
    id: string
    name: string
  }
  inbound_total: number
  handled_by_agent: number
  abandoned_or_failed: number
  abandon_rate_percent: number
  average_wait_seconds?: number
}
```

### `QueuePerformanceReport`

```ts
type QueuePerformanceReport = {
  from: string // date-time
  to: string // date-time
  results: Array<{
    queue: {
      id: { ... }
      name: { ... }
    }
    inbound_total: number
    handled_by_agent: number
    abandoned_or_failed: number
    abandon_rate_percent: number
    average_wait_seconds?: number
  }>
}
```

### `SkillCatalogueEntry`

```ts
type SkillCatalogueEntry = {
  tag: string
  source: "epilot" | "provider"
  created_at?: string // date-time
  created_by?: string
}
```

### `SkillCatalogue`

```ts
type SkillCatalogue = {
  results: Array<{
    tag: string
    source: "epilot" | "provider"
    created_at?: string // date-time
    created_by?: string
  }>
}
```

### `CreateSkillRequest`

```ts
type CreateSkillRequest = {
  tag: string
}
```

### `SkillDeletion`

```ts
type SkillDeletion = {
  tag: string
  agents_updated: number
  queues_updated: number
}
```

### `QueueSkillChange`

```ts
type QueueSkillChange = {
  queue: {
    id: string
    name: string
  }
  tag: string
  accepted: boolean
  step?: {
    id: string
    label: string
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

### `KpiPeriod`

The KPI window, in the organization's phone system time zone: today, yesterday, this week
(since Monday), last week (Monday to Monday), last 7 / 30 days (seven / thirty calendar days
including today), this month, last month; `custom` is the window `from`/`to` of the request.


```ts
type KpiPeriod = "today" | "yesterday" | "this_week" | "last_week" | "last_7_days" | "last_30_days" | "this_month" | "last_month" | "custom"
```

### `LiveKpis`

Every KPI is absent when the phone system cannot tell it.

```ts
type LiveKpis = {
  captured_at: string // date-time
  period: "today" | "yesterday" | "this_week" | "last_week" | "last_7_days" | "last_30_days" | "this_month" | "last_month" | "custom"
  calls_total?: number
  answered_total?: number
  abandoned_total?: number
  abandon_rate_percent?: number
  average_wait_seconds?: number
  longest_wait_seconds?: number
  average_talk_seconds?: number
  average_handle_seconds?: number
  average_hold_seconds?: number
}
```

### `AgentPerformance`

```ts
type AgentPerformance = {
  provider_agent_id?: string
  user_id?: string
  name: string
  calls_handled: number
  outbound_calls?: number
  talk_seconds_total: number
  talk_seconds_average: number
  hold_seconds_total?: number
  wrap_up_seconds_average?: number
  handle_seconds_average: number
}
```

### `AgentPerformanceReport`

```ts
type AgentPerformanceReport = {
  from: string // date-time
  to: string // date-time
  results: Array<{
    provider_agent_id?: string
    user_id?: string
    name: string
    calls_handled: number
    outbound_calls?: number
    talk_seconds_total: number
    talk_seconds_average: number
    hold_seconds_total?: number
    wrap_up_seconds_average?: number
    handle_seconds_average: number
  }>
}
```

### `MissedCallCaller`

```ts
type MissedCallCaller = {
  anonymous: boolean
  number_masked?: string
  contact?: {
    id: string
    name: string
  }
}
```

### `MissedCallCallback`

```ts
type MissedCallCallback = {
  state: "queued" | "ringing" | "in_progress" | "completed" | "failed" | "canceled" | "unknown"
  requested_at: string // date-time
  requested_by?: string
  queue?: {
    id: string
    name: string
  }
  callback_call_id?: string
}
```

### `MissedCallCallbackRequest`

```ts
type MissedCallCallbackRequest = {
  queue_id?: string
}
```

### `MissedCall`

```ts
type MissedCall = {
  call_id: string
  last_missed_at: string // date-time
  first_missed_at?: string // date-time
  attempts: number
  queue?: {
    id: string
    name: string
  }
  longest_wait_seconds?: number
  caller: {
    anonymous: boolean
    number_masked?: string
    contact?: {
      id: { ... }
      name: { ... }
    }
  }
  resolved: boolean
  can_call_back: boolean
  callback?: {
    state: "queued" | "ringing" | "in_progress" | "completed" | "failed" | "canceled" | "unknown"
    requested_at: string // date-time
    requested_by?: string
    queue?: {
      id: { ... }
      name: { ... }
    }
    callback_call_id?: string
  }
}
```

### `MissedCallList`

```ts
type MissedCallList = {
  from: string // date-time
  to: string // date-time
  results: Array<{
    call_id: string
    last_missed_at: string // date-time
    first_missed_at?: string // date-time
    attempts: number
    queue?: {
      id: { ... }
      name: { ... }
    }
    longest_wait_seconds?: number
    caller: {
      anonymous: { ... }
      number_masked?: { ... }
      contact?: { ... }
    }
    resolved: boolean
    can_call_back: boolean
    callback?: {
      state: { ... }
      requested_at: { ... }
      requested_by?: { ... }
      queue?: { ... }
      callback_call_id?: { ... }
    }
  }>
}
```

### `AgentActivityEvent`

```ts
type AgentActivityEvent = {
  at: string // date-time
  kind: "presence" | "call" | "state" | "other"
  presence?: {
    name: string
    label: string
    available: boolean
  }
  call?: {
    call_id?: string
    direction?: "inbound" | "outbound"
    queue_name?: string
    duration_seconds?: number
  }
  description?: string
}
```

### `AgentPresenceTotal`

```ts
type AgentPresenceTotal = {
  presence: {
    name: string
    label: string
    available: boolean
  }
  seconds: number
}
```

### `AgentActivity`

```ts
type AgentActivity = {
  provider_agent_id: string
  from: string // date-time
  to: string // date-time
  events: Array<{
    at: string // date-time
    kind: "presence" | "call" | "state" | "other"
    presence?: {
      name: { ... }
      label: { ... }
      available: { ... }
    }
    call?: {
      call_id?: { ... }
      direction?: { ... }
      queue_name?: { ... }
      duration_seconds?: { ... }
    }
    description?: string
  }>
  presence_totals: Array<{
    presence: {
      name: { ... }
      label: { ... }
      available: { ... }
    }
    seconds: number
  }>
  calls_handled: number
}
```

### `QueueSettingsUpdate`

```ts
type QueueSettingsUpdate = {
  max_size: number
  ring_timeout_seconds: number
  wrap_up_seconds: number
  max_dial_count: number
}
```

### `QueueSettings`

```ts
type QueueSettings = {
  queue_id: string
  name: string
  max_size: number
  ring_timeout_seconds: number
  wrap_up_seconds: number
  max_dial_count: number
}
```

### `WrapUpTimes`

```ts
type WrapUpTimes = {
  busy_seconds: number
  unreachable_seconds: number
  declined_seconds: number
}
```

### `CallHandlingSettings`

```ts
type CallHandlingSettings = {
  wrap_up: {
    inbound_cancel_allowed: boolean
    inbound_extend_allowed: boolean
    inbound_max_extension_seconds: number
    outbound_enabled: boolean
    outbound_cancel_allowed: boolean
    outbound_extend_allowed: boolean
    outbound_max_extension_seconds: number
    outbound_calls_allowed: boolean
  }
  after_unsuccessful_inbound: {
    busy_seconds: number
    unreachable_seconds: number
    declined_seconds: number
  }
  after_unsuccessful_outbound: {
    busy_seconds: number
    unreachable_seconds: number
    declined_seconds: number
  }
  recording: {
    always_record_outbound: boolean
    agents_may_delete: boolean
    hide_recording_controls: boolean
  }
}
```
