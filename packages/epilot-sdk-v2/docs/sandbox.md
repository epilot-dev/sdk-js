# Sandbox API

- **Base URL:** `https://sandbox.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/sandbox](https://docs.epilot.io/api/sandbox)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.sandbox.listPipelines(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/sandbox'

const sandboxClient = await getClient()
authorize(sandboxClient, () => '<token>')
const { data } = await sandboxClient.listPipelines(...)
```

## Operations

**Pipelines**
- [`listPipelines`](#listpipelines)
- [`createPipeline`](#createpipeline)
- [`getPipeline`](#getpipeline)
- [`deletePipeline`](#deletepipeline)
- [`generatePipelineToken`](#generatepipelinetoken)

**Sandbox Requests**
- [`requestSandbox`](#requestsandbox)
- [`listSandboxRequests`](#listsandboxrequests)

**Schemas**
- [`OrgId`](#orgid)
- [`PipelineId`](#pipelineid)
- [`PipelineRole`](#pipelinerole)
- [`PipelineItem`](#pipelineitem)
- [`Pipeline`](#pipeline)
- [`CreatePipelineRequest`](#createpipelinerequest)
- [`AccessToken`](#accesstoken)
- [`SandboxToken`](#sandboxtoken)
- [`PipelineToken`](#pipelinetoken)
- [`SandboxRequest`](#sandboxrequest)

### `listPipelines`

List pipelines the current organization is part of

`GET /v1/sandbox/pipelines`

```ts
const { data } = await client.listPipelines()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "pipeline_role": "sandbox",
      "pipeline_id": "12345::54321",
      "sandbox_org_id": "12345",
      "sandbox_org_name": "Sandbox",
      "production_org_id": "54321",
      "production_org_name": "Production",
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

</details>

---

### `createPipeline`

Create a new pipeline by passing an api token from another organization.

`POST /v1/sandbox/pipelines`

```ts
const { data } = await client.createPipeline(
  null,
  {
    pipeline_role: 'sandbox',
    api_token: 'eyJhbGciOiJIUzI1NiIs...'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "pipeline_role": "sandbox",
  "pipeline_id": "12345::54321",
  "sandbox_org_id": "12345",
  "sandbox_org_name": "Sandbox",
  "production_org_id": "54321",
  "production_org_name": "Production",
  "created_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getPipeline`

Get pipeline by ID

`GET /v1/sandbox/pipelines/{pipeline_id}`

```ts
const { data } = await client.getPipeline({
  pipeline_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "pipeline_role": "sandbox",
  "pipeline_id": "12345::54321",
  "sandbox_org_id": "12345",
  "sandbox_org_name": "Sandbox",
  "production_org_id": "54321",
  "production_org_name": "Production",
  "created_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deletePipeline`

Delete a pipeline by ID

`DELETE /v1/sandbox/pipelines/{pipeline_id}`

```ts
const { data } = await client.deletePipeline({
  pipeline_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "pipeline_role": "sandbox",
  "pipeline_id": "12345::54321",
  "sandbox_org_id": "12345",
  "sandbox_org_name": "Sandbox",
  "production_org_id": "54321",
  "production_org_name": "Production",
  "created_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `generatePipelineToken`

Generate a temporary pipeline access token to access the other org from the pipeline

`GET /v1/sandbox/pipelines/{pipeline_id}/token`

```ts
const { data } = await client.generatePipelineToken({
  pipeline_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "pipeline_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

</details>

---

### `requestSandbox`

Request a sandbox account for a user

`POST /v1/sandbox:request`

```ts
const { data } = await client.requestSandbox(
  null,
  {
    id: 12345,
    fullname: 'John Doe',
    company_name: 'Company Name',
    position: 'Software Engineer',
    email: 'user@example.com',
    sandbox_usecase: 'Build a payment integration',
    status: 'pending',
    connected_to_existing_epilot_customer: true,
    requested_at: '2022-01-01T00:00:00Z',
    sandbox_request_category: 'APP_DEVELOPER_ACCOUNT'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": 12345,
  "fullname": "John Doe",
  "company_name": "Company Name",
  "position": "Software Engineer",
  "email": "user@example.com",
  "sandbox_usecase": "Build a payment integration",
  "status": "pending",
  "connected_to_existing_epilot_customer": true,
  "requested_at": "2022-01-01T00:00:00Z",
  "sandbox_request_category": "APP_DEVELOPER_ACCOUNT"
}
```

</details>

---

### `listSandboxRequests`

List sandbox requests from users

`GET /v1/sandbox/requests`

```ts
const { data } = await client.listSandboxRequests()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": 12345,
      "fullname": "John Doe",
      "company_name": "Company Name",
      "position": "Software Engineer",
      "email": "user@example.com",
      "sandbox_usecase": "Build a payment integration",
      "status": "pending",
      "connected_to_existing_epilot_customer": true,
      "requested_at": "2022-01-01T00:00:00Z",
      "sandbox_request_category": "APP_DEVELOPER_ACCOUNT"
    }
  ],
  "total": 1
}
```

</details>

---

## Schemas

### `OrgId`

Epilot Tenant Organization ID

```ts
type OrgId = string
```

### `PipelineId`

Unique identifier for a pipeline.

The format for a pipeline is: `<sandbox_org>::<production_org>`


```ts
type PipelineId = string
```

### `PipelineRole`

The role of the other organization in the pipeline from the perspective of the caller's organization

```ts
type PipelineRole = "sandbox" | "production"
```

### `PipelineItem`

```ts
type PipelineItem = {
  pipeline_id?: string
  sandbox_org_id?: object
  sandbox_org_name?: string
  production_org_id?: string
  production_org_name?: string
  created_at?: string // date-time
}
```

### `Pipeline`

```ts
type Pipeline = {
  pipeline_role?: "sandbox" | "production"
  pipeline_id?: string
  sandbox_org_id?: object
  sandbox_org_name?: string
  production_org_id?: string
  production_org_name?: string
  created_at?: string // date-time
}
```

### `CreatePipelineRequest`

```ts
type CreatePipelineRequest = {
  pipeline_role: "sandbox" | "production"
  api_token: object
}
```

### `AccessToken`

An epilot access token

```ts
type AccessToken = string
```

### `SandboxToken`

```ts
type SandboxToken = object
```

### `PipelineToken`

```ts
type PipelineToken = object
```

### `SandboxRequest`

```ts
type SandboxRequest = {
  id?: string
  fullname: string
  company_name: string
  position: string
  email: string // email
  sandbox_usecase: string
  status?: "pending" | "created" | "rejected"
  connected_to_existing_epilot_customer: boolean
  requested_at?: string // date-time
  sandbox_request_category?: "APP_DEVELOPER_ACCOUNT" | "BLUEPRINT_SANDBOX" | "OTHER"
}
```
