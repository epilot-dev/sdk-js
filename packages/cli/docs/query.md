# Query API

- **Base URL:** `https://query.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/query](https://docs.epilot.io/api/query)

The Query API provides access to epilot's business analytics capabilities, enabling teams to query entity operations, workflow executions, and automation data stored in the epilot data lake.

## Quick Start

```bash
# List available operations
epilot query

# Call an operation
epilot query getAllViews
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

**Datalake V2**
- [`getAllViews`](#getallviews) — Retrieve all materialized data lake views configured for the organization.
- [`createOrUpdateView`](#createorupdateview) — Create or update a materialized SQL view in the epilot data lake.
- [`getView`](#getview) — Retrieve the definition and attributes of a specific data lake view by its slug.
- [`getAllRelationships`](#getallrelationships) — Retrieve all table relationships configured for the organization's data lake.
- [`createOrUpdateRelationship`](#createorupdaterelationship) — Define or update a relationship between two tables in the data lake.

**Datasets**
- [`listAvailableDatasetsV2`](#listavailabledatasetsv2) — Lists all available datasets grouped by domain

**Query**
- [`executeEntitiesQuery`](#executeentitiesquery) — Execute queries against entities datasets.
- [`executeWorkflowsQuery`](#executeworkflowsquery) — Query Workflow Analytics Datasets.
- [`executeAutomationQuery`](#executeautomationquery) — Query Automation Analytics Datasets.
- [`listWorkflowPhasesByDefinitionId`](#listworkflowphasesbydefinitionid) — Retrieves the workflow phases associated with a given workflow definition ID.
- [`listWorkflowDefinitions`](#listworkflowdefinitions) — Lists available worflow definitions with their ids, names and start times
- [`listPhaseNames`](#listphasenames) — Lists phase names of an org.

**V1**
- [`listDatasets`](#listdatasets) — Get list of available datasets
- [`executeQuery`](#executequery) — Execute queries against datasets.

**CredentialsV2**
- [`generateCredentialsV2`](#generatecredentialsv2) — Generate credentials for the epilot datalake for connecting other BI tools with ClickHouse
- [`listCredentialsV2`](#listcredentialsv2) — List all the credentialof Clickhouse for the organization here
- [`revokeCredentialsV2`](#revokecredentialsv2) — Revoke credentials for the epilot datalake for connecting other BI tools with Clickhouse

**V2**
- [`executeQueryV2`](#executequeryv2) — Execute queries against datasets.
- [`getSemanticModel`](#getsemanticmodel) — Get the semantic model for agent/tool consumption.
- [`autocomplete`](#autocomplete) — Generic autocomplete endpoint for querying distinct values across datasets.
- [`workflowsAutocomplete`](#workflowsautocomplete) — Autocomplete Workflows data

### `getAllViews`

Retrieve all materialized data lake views configured for the organization.

`GET /datalake/views`

**Sample Call**

```bash
epilot query getAllViews
```

With JSONata filter:

```bash
epilot query getAllViews --jsonata 'views'
```

<details>
<summary>Sample Response</summary>

```json
{
  "views": [
    {
      "view_name": "some_view",
      "source_dataset": "current_entities",
      "view_slug": "some_view",
      "attributes": [
        {
          "name": "some_attribute",
          "type": "string",
          "description": "some description"
        }
      ]
    },
    {
      "view_name": "another_view",
      "source_dataset": "taxonomies",
      "view_slug": "another_view",
      "attributes": [
        {
          "name": "taxonomy_attribute",
          "type": "string",
          "description": "taxonomy attribute description"
        }
      ]
    }
  ]
}
```

</details>

---

### `createOrUpdateView`

Create or update a materialized SQL view in the epilot data lake.

`POST /datalake/views`

**Request Body** (required)

**Sample Call**

```bash
epilot query createOrUpdateView
```

With request body:

```bash
epilot query createOrUpdateView \
  -d '{
  "view_name": "some_view",
  "source_dataset": "current_entities",
  "config": {
    "schema": "some_schema",
    "include_purpose_view": true,
    "include_label_view": true,
    "include_relation_view": true,
    "relationship_attribute": ["some_relationship_attribute"]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot query createOrUpdateView
```

With JSONata filter:

```bash
epilot query createOrUpdateView --jsonata 'view_name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "view_name": "some_view",
  "source_dataset": "current_entities",
  "attributes": [
    {
      "name": "some_attribute",
      "type": "string",
      "description": "some description"
    }
  ]
}
```

</details>

---

### `getView`

Retrieve the definition and attributes of a specific data lake view by its slug.

`GET /datalake/views/{view_slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `view_slug` | path | string | Yes | The URL-safe slug identifier of the view |

**Sample Call**

```bash
epilot query getView \
  -p view_slug=some_view
```

Using positional args for path parameters:

```bash
epilot query getView some_view
```

With JSONata filter:

```bash
epilot query getView -p view_slug=some_view --jsonata 'view_name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "view_name": "some_view",
  "source_dataset": "current_entities",
  "attributes": [
    {
      "name": "some_attribute",
      "type": "string",
      "description": "some description"
    }
  ]
}
```

</details>

---

### `getAllRelationships`

Retrieve all table relationships configured for the organization's data lake.

`GET /datalake/relationships`

**Sample Call**

```bash
epilot query getAllRelationships
```

With JSONata filter:

```bash
epilot query getAllRelationships --jsonata 'relationships'
```

<details>
<summary>Sample Response</summary>

```json
{
  "relationships": [
    {
      "relationship_name": "some_relationship",
      "from_table": "some_table",
      "to_table": "some_table",
      "from_column": "some_column",
      "to_column": "some_column",
      "type": "one_to_many"
    },
    {
      "relationship_name": "another_relationship",
      "from_table": "table_a",
      "to_table": "table_b",
      "from_column": "column_a",
      "to_column": "column_b",
      "type": "many_to_many"
    }
  ]
}
```

</details>

---

### `createOrUpdateRelationship`

Define or update a relationship between two tables in the data lake.

`POST /datalake/relationships`

**Request Body** (required)

**Sample Call**

```bash
epilot query createOrUpdateRelationship
```

With request body:

```bash
epilot query createOrUpdateRelationship \
  -d '{
  "relationship_name": "some_relationship",
  "from_table": "some_table",
  "to_table": "some_table",
  "from_column": "some_column",
  "to_column": "some_column",
  "type": "one_to_many"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot query createOrUpdateRelationship
```

With JSONata filter:

```bash
epilot query createOrUpdateRelationship --jsonata 'relationship_name'
```

<details>
<summary>Sample Response</summary>

```json
{
  "relationship_name": "some_relationship",
  "from_table": "some_table",
  "to_table": "some_table",
  "from_column": "some_column",
  "to_column": "some_column",
  "type": "one_to_many"
}
```

</details>

---

### `listAvailableDatasetsV2`

Lists all available datasets grouped by domain

`GET /v2/query/datasets`

**Sample Call**

```bash
epilot query listAvailableDatasetsV2
```

With JSONata filter:

```bash
epilot query listAvailableDatasetsV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "domain": "entities",
      "dataset": "entity_operations",
      "endpoint": "/v2/query/domain/entities:execute"
    },
    {
      "domain": "workflows",
      "dataset": "workflow_execution_time_series",
      "endpoint": "/v2/query/domain/workflows:execute"
    }
  ]
}
```

</details>

---

### `executeEntitiesQuery`

Execute queries against entities datasets.

`POST /v2/query/domain/entities:execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cache_expiration` | query | string (timestamp) | No |  |
| `no_cache` | query | boolean | No |  |

**Request Body**

**Sample Call**

```bash
epilot query executeEntitiesQuery \
  -d '{"query":{}}'
```

Using stdin pipe:

```bash
cat body.json | epilot query executeEntitiesQuery
```

With JSONata filter:

```bash
epilot query executeEntitiesQuery --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ]
}
```

</details>

---

### `executeWorkflowsQuery`

Query Workflow Analytics Datasets.

`POST /v2/query/domain/workflows:execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `mock` | query | boolean | No |  |
| `cache_expiration` | query | string (timestamp) | No |  |
| `no_cache` | query | boolean | No |  |

**Request Body**

**Sample Call**

```bash
epilot query executeWorkflowsQuery
```

With request body:

```bash
epilot query executeWorkflowsQuery \
  -d '{
  "dataset": "total_count_of_workflow_executions",
  "workflow_definition_ids": ["string"],
  "entity_schemas": ["string"],
  "states": ["string"],
  "group_time_by": "M",
  "relative_time_range": "string",
  "time_range_from": "string",
  "time_range_to": "string",
  "duration_threshold": 0
}'
```

Using stdin pipe:

```bash
cat body.json | epilot query executeWorkflowsQuery
```

With JSONata filter:

```bash
epilot query executeWorkflowsQuery --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [0, 1],
  "labels": ["label1", "label2"],
  "timestamp": "1715621496068"
}
```

</details>

---

### `executeAutomationQuery`

Query Automation Analytics Datasets.

`POST /v2/query/domain/automations:execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Request Body**

**Sample Call**

```bash
epilot query executeAutomationQuery
```

With request body:

```bash
epilot query executeAutomationQuery \
  -d '{
  "dataset": "automation_executions_overview",
  "flow_ids": ["string"],
  "execution_states": ["success", "failed", "scheduled"],
  "relative_time_range": "all_time",
  "time_range_from": "string",
  "time_range_to": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot query executeAutomationQuery
```

With JSONata filter:

```bash
epilot query executeAutomationQuery --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 100,
  "results": [
    {
      "flow_id": "1234567890",
      "flow_name": "flow_name",
      "execution_id": "execution_id",
      "execution_status": "execution_status",
      "entity_schema": "opportunity",
      "entity_id": "entity_id",
      "created_at": "execution_created_at",
      "updated_at": "execution_updated_at",
      "error": {
        "message": "error_message",
        "error_code": "error_code"
      },
      "trigger_event": {
        "type": "EntityOperation",
        "trigger_type": "createEntity"
      }
    }
  ]
}
```

</details>

---

### `listWorkflowPhasesByDefinitionId`

Retrieves the workflow phases associated with a given workflow definition ID.

`GET /v2/query/domain/workflows/definitions/{workflowDefinitionId}/phases`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `workflowDefinitionId` | path | string | Yes | The ID of the workflow definition to retrieve phases for. |

**Sample Call**

```bash
epilot query listWorkflowPhasesByDefinitionId \
  -p workflowDefinitionId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot query listWorkflowPhasesByDefinitionId 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot query listWorkflowPhasesByDefinitionId -p workflowDefinitionId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "y0UdVCOI",
    "name": "Initial Phase"
  }
]
```

</details>

---

### `listWorkflowDefinitions`

Lists available worflow definitions with their ids, names and start times

`GET /v2/query/domain/workflows/definitions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `mock` | query | boolean | No |  |

**Sample Call**

```bash
epilot query listWorkflowDefinitions
```

With JSONata filter:

```bash
epilot query listWorkflowDefinitions --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "y0UdVCOI",
      "name": "PV Kauf",
      "max_date": "2023-05-31T00:00:00.000Z",
      "min_date": "2023-01-00T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `listPhaseNames`

Lists phase names of an org.

`GET /v2/query/domain/workflows/phases`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | No |  |

**Sample Call**

```bash
epilot query listPhaseNames
```

With JSONata filter:

```bash
epilot query listPhaseNames --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "y0UdVCOI",
      "name": "PV Kauf",
      "max_date": "2023-05-31T00:00:00.000Z",
      "min_date": "2023-01-00T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `listDatasets`

Get list of available datasets

`GET /v1/query/datasets`

**Sample Call**

```bash
epilot query listDatasets
```

With JSONata filter:

```bash
epilot query listDatasets --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "dataset": "entity_operations"
    },
    {
      "dataset": "entities_timemachine"
    }
  ]
}
```

</details>

---

### `executeQuery`

Execute queries against datasets.

`POST /v1/query:execute`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cache_expiration` | query | string (timestamp) | No |  |
| `no_cache` | query | boolean | No |  |

**Request Body**

**Sample Call**

```bash
epilot query executeQuery \
  -d '{"query":{}}'
```

Using stdin pipe:

```bash
cat body.json | epilot query executeQuery
```

With JSONata filter:

```bash
epilot query executeQuery --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ]
}
```

</details>

---

### `generateCredentialsV2`

Generate credentials for the epilot datalake for connecting other BI tools with ClickHouse

`POST /v2/query/credentials:generate`

**Sample Call**

```bash
epilot query generateCredentialsV2
```

With JSONata filter:

```bash
epilot query generateCredentialsV2 --jsonata 'username'
```

<details>
<summary>Sample Response</summary>

```json
{
  "username": "datalakeuser_sfsdfs_66",
  "password": "***",
  "endpoints": {
    "host": "qjjcxsy87t.eu-central-1.aws.clickhouse.cloud",
    "port": 8443
  },
  "database": "datawarehouse"
}
```

</details>

---

### `listCredentialsV2`

List all the credentialof Clickhouse for the organization here

`GET /v2/query/credentials:list`

**Sample Call**

```bash
epilot query listCredentialsV2
```

With JSONata filter:

```bash
epilot query listCredentialsV2 --jsonata 'users'
```

<details>
<summary>Sample Response</summary>

```json
{
  "users": [
    {
      "user_id": "string"
    }
  ]
}
```

</details>

---

### `revokeCredentialsV2`

Revoke credentials for the epilot datalake for connecting other BI tools with Clickhouse

`POST /v2/query/credentials:revoke`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | query | string | No |  |

**Sample Call**

```bash
epilot query revokeCredentialsV2
```

With JSONata filter:

```bash
epilot query revokeCredentialsV2 --jsonata 'success'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true
}
```

</details>

---

### `executeQueryV2`

Execute queries against datasets.

`POST /v2/query:execute`

**Request Body**

**Sample Call**

```bash
epilot query executeQueryV2 \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot query executeQueryV2
```

With JSONata filter:

```bash
epilot query executeQueryV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ]
}
```

</details>

---

### `getSemanticModel`

Get the semantic model for agent/tool consumption.

`GET /v2/query/semantic-model`

**Sample Call**

```bash
epilot query getSemanticModel
```

With JSONata filter:

```bash
epilot query getSemanticModel --jsonata 'entities'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entities": [
    {
      "name": "current_contacts",
      "displayName": "Contacts",
      "schema": "entity"
    }
  ],
  "relationships": [
    {
      "from": "current_contacts",
      "to": "opportunity_account_contact_relation",
      "relationship": "hasMany",
      "displayName": "Contact has many Opportunities"
    }
  ],
  "capabilities": {
    "aggregations": ["count", "count_distinct", "sum", "average", "min", "max", "median"],
    "calculationTypes": [
      {
        "type": "string",
        "description": "string",
        "parameters": {}
      }
    ],
    "granularities": ["day", "week", "month", "quarter", "year"],
    "filterOperators": [
      {
        "operator": "string",
        "description": "string"
      }
    ]
  }
}
```

</details>

---

### `autocomplete`

Generic autocomplete endpoint for querying distinct values across datasets.

`GET /v2/query/autocomplete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `dataset` | query | "workflows" \| "purposes" \| "sharing_configs" \| "partners" | Yes | The dataset category to autocomplete against |
| `input` | query | string | No | Input text to autocomplete |
| `attribute` | query | string | Yes | Attribute to autocomplete in table.column format (e.g., current_purposes.name) |
| `size` | query | number | No | Maximum number of results to return |

**Sample Call**

```bash
epilot query autocomplete \
  -p dataset=example \
  -p attribute=current_purposes.name
```

With JSONata filter:

```bash
epilot query autocomplete -p dataset=example -p attribute=current_purposes.name --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": ["value"]
}
```

</details>

---

### `workflowsAutocomplete`

Autocomplete Workflows data

`GET /v2/query/workflows:autocomplete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `input` | query | string | No | Input to autocomplete |
| `attribute` | query | string | Yes | Autocomplete attribute |
| `size` | query | number | No | Maximum number of results to return |

**Sample Call**

```bash
epilot query workflowsAutocomplete \
  -p attribute=name
```

With JSONata filter:

```bash
epilot query workflowsAutocomplete -p attribute=name --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": ["value"]
}
```

</details>

---
