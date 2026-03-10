# Sandbox API

- **Base URL:** `https://sandbox.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/sandbox](https://docs.epilot.io/api/sandbox)

API to set up pipeline connections between epilot orgs to sync and promote configurations (from sandbox to production and vice-versa)

## Quick Start

```bash
# List available operations
epilot sandbox

# Call an operation
epilot sandbox listPipelines
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

**Pipelines**
- [`listPipelines`](#listpipelines) — List pipelines the current organization is part of
- [`createPipeline`](#createpipeline) — Create a new pipeline by passing an api token from another organization.
- [`getPipeline`](#getpipeline) — Get pipeline by ID
- [`deletePipeline`](#deletepipeline) — Delete a pipeline by ID
- [`generatePipelineToken`](#generatepipelinetoken) — Generate a temporary pipeline access token to access the other org from the pipeline

**Sandbox Requests**
- [`requestSandbox`](#requestsandbox) — Request a sandbox account for a user
- [`listSandboxRequests`](#listsandboxrequests) — List sandbox requests from users

### `listPipelines`

List pipelines the current organization is part of

`GET /v1/sandbox/pipelines`

**Sample Call**

```bash
epilot sandbox listPipelines
```

With JSONata filter:

```bash
epilot sandbox listPipelines --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

**Request Body**

**Sample Call**

```bash
epilot sandbox createPipeline \
  -d '{"pipeline_role":"sandbox","api_token":"eyJhbGciOiJIUzI1NiIs..."}'
```

Using stdin pipe:

```bash
cat body.json | epilot sandbox createPipeline
```

With JSONata filter:

```bash
epilot sandbox createPipeline --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `pipeline_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot sandbox getPipeline \
  -p pipeline_id=12345::54321
```

Using positional args for path parameters:

```bash
epilot sandbox getPipeline 12345::54321
```

With JSONata filter:

```bash
epilot sandbox getPipeline -p pipeline_id=12345::54321 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `pipeline_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot sandbox deletePipeline \
  -p pipeline_id=12345::54321
```

Using positional args for path parameters:

```bash
epilot sandbox deletePipeline 12345::54321
```

With JSONata filter:

```bash
epilot sandbox deletePipeline -p pipeline_id=12345::54321 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `pipeline_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot sandbox generatePipelineToken \
  -p pipeline_id=12345::54321
```

Using positional args for path parameters:

```bash
epilot sandbox generatePipelineToken 12345::54321
```

With JSONata filter:

```bash
epilot sandbox generatePipelineToken -p pipeline_id=12345::54321 --jsonata 'pipeline_token'
```

<details>
<summary>Sample Response</summary>

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

**Request Body**

**Sample Call**

```bash
epilot sandbox requestSandbox
```

With request body:

```bash
epilot sandbox requestSandbox \
  -d '{
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot sandbox requestSandbox
```

With JSONata filter:

```bash
epilot sandbox requestSandbox --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Sample Call**

```bash
epilot sandbox listSandboxRequests
```

With JSONata filter:

```bash
epilot sandbox listSandboxRequests --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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
