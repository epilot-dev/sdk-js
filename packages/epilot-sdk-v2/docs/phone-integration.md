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

**operator**
- [`getProviderSetup`](#getprovidersetup)
- [`setupProvider`](#setupprovider)

**Schemas**
- [`ManagerStatus`](#managerstatus)
- [`PhoneAgent`](#phoneagent)
- [`AssignPhoneAgentRequest`](#assignphoneagentrequest)
- [`ProviderSetup`](#providersetup)
- [`ProviderSetupRequest`](#providersetuprequest)
- [`CustomerBatchSearchResult`](#customerbatchsearchresult)
- [`CustomerSearchResult`](#customersearchresult)
- [`CustomerIdentifier`](#customeridentifier)
- [`CustomerSummary`](#customersummary)
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
  status: "active" | "pending" | "disabled" | "missing_provider"
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

### `ErrorResponse`

```ts
type ErrorResponse = {
  status: number
  error: string
  code?: string
}
```
