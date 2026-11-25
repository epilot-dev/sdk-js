# Query API

- **Base URL:** `https://query.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/query](https://docs.epilot.io/api/query)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.query.createOrUpdateView(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/query'

const queryClient = getClient()
authorize(queryClient, () => '<token>')
const { data } = await queryClient.createOrUpdateView(...)
```

## Operations

**Datalake V2**
- [`createOrUpdateView`](#createorupdateview)
- [`getAllViews`](#getallviews)
- [`getView`](#getview)
- [`createOrUpdateRelationship`](#createorupdaterelationship)
- [`getAllRelationships`](#getallrelationships)

**Datasets**
- [`listAvailableDatasetsV2`](#listavailabledatasetsv2)

**Query**
- [`executeEntitiesQuery`](#executeentitiesquery)
- [`executeWorkflowsQuery`](#executeworkflowsquery)
- [`executeAutomationQuery`](#executeautomationquery)
- [`listWorkflowPhasesByDefinitionId`](#listworkflowphasesbydefinitionid)
- [`listWorkflowDefinitions`](#listworkflowdefinitions)
- [`listPhaseNames`](#listphasenames)

**V1**
- [`listDatasets`](#listdatasets)
- [`executeQuery`](#executequery)

**CredentialsV2**
- [`generateCredentialsV2`](#generatecredentialsv2)
- [`listCredentialsV2`](#listcredentialsv2)
- [`revokeCredentialsV2`](#revokecredentialsv2)

**V2**
- [`executeQueryV2`](#executequeryv2)
- [`getSemanticModel`](#getsemanticmodel)
- [`getChartModel`](#getchartmodel)
- [`getChartTemplates`](#getcharttemplates)
- [`resolveChartTemplate`](#resolvecharttemplate)
- [`searchAutocomplete`](#searchautocomplete)
- [`autocomplete`](#autocomplete)
- [`workflowsAutocomplete`](#workflowsautocomplete)

**Schemas**
- [`ErrorResponse`](#errorresponse)
- [`ViewRequest`](#viewrequest)
- [`CurrentEntitiesViewRequest`](#currententitiesviewrequest)
- [`TaxonomiesViewRequest`](#taxonomiesviewrequest)
- [`WorkflowExecutionsViewRequest`](#workflowexecutionsviewrequest)
- [`ViewResponse`](#viewresponse)
- [`ViewsListResponse`](#viewslistresponse)
- [`RelationshipRequest`](#relationshiprequest)
- [`RelationshipResponse`](#relationshipresponse)
- [`RelationshipsListResponse`](#relationshipslistresponse)
- [`NoCache`](#nocache)
- [`CacheExpiration`](#cacheexpiration)
- [`UserId`](#userid)
- [`DatasetDomain`](#datasetdomain)
- [`Dataset`](#dataset)
- [`DatalakeQueryOptions`](#datalakequeryoptions)
- [`DatalakeQuery`](#datalakequery)
- [`AutomationQueryOptions`](#automationqueryoptions)
- [`DatasetOptions.AutomationExecutionsOverview`](#datasetoptions.automationexecutionsoverview)
- [`DatasetOptions.ListAutomationDefinitions`](#datasetoptions.listautomationdefinitions)
- [`WorkflowsQueryOptions`](#workflowsqueryoptions)
- [`DatasetOptions.TotalCountOfWorkflowExecutions`](#datasetoptions.totalcountofworkflowexecutions)
- [`DatasetOptions.WorkflowExecutionTimeSeries`](#datasetoptions.workflowexecutiontimeseries)
- [`DatasetOptions.CumulativeSumOfWorkflows`](#datasetoptions.cumulativesumofworkflows)
- [`DatasetOptions.CancellationReasons`](#datasetoptions.cancellationreasons)
- [`DatasetOptions.WorkflowTasksOverview`](#datasetoptions.workflowtasksoverview)
- [`Response.WorkflowTaskOverview`](#response.workflowtaskoverview)
- [`ECPDetails`](#ecpdetails)
- [`WorkflowContext`](#workflowcontext)
- [`WorkflowStatus`](#workflowstatus)
- [`AutomationConfig`](#automationconfig)
- [`DynamicDueDate`](#dynamicduedate)
- [`TaskStatus`](#taskstatus)
- [`TaskRequirement`](#taskrequirement)
- [`TaskType`](#tasktype)
- [`Task`](#task)
- [`WorkflowsQueryOptions.WorkflowDefinitionIDs`](#workflowsqueryoptions.workflowdefinitionids)
- [`WorkflowsQueryOptions.EntitySchema`](#workflowsqueryoptions.entityschema)
- [`WorkflowsQueryOptions.RelativeTimeRange`](#workflowsqueryoptions.relativetimerange)
- [`WorkflowsQueryOptions.TimeRangeFrom`](#workflowsqueryoptions.timerangefrom)
- [`WorkflowsQueryOptions.TimeRangeTo`](#workflowsqueryoptions.timerangeto)
- [`WorkflowsQueryOptions.GroupTimeBy`](#workflowsqueryoptions.grouptimeby)
- [`WorkflowsQueryOptions.WorkflowStates`](#workflowsqueryoptions.workflowstates)
- [`DatasetName`](#datasetname)
- [`EntityDataset`](#entitydataset)
- [`AutomationExecutionDataset`](#automationexecutiondataset)
- [`WorkflowDataset`](#workflowdataset)
- [`WorkflowStates`](#workflowstates)
- [`PhaseStates`](#phasestates)
- [`TaskStates`](#taskstates)
- [`SortBy`](#sortby)
- [`TimeGroups`](#timegroups)
- [`RelativeTimeRange`](#relativetimerange)
- [`WorkflowsQueryResult`](#workflowsqueryresult)
- [`AutomationExecutionResponse`](#automationexecutionresponse)
- [`ListAutomationDefinitionsResponse`](#listautomationdefinitionsresponse)
- [`QueryTimeWindow`](#querytimewindow)
- [`SemanticModelColumn`](#semanticmodelcolumn)
- [`SemanticModelTable`](#semanticmodeltable)
- [`SemanticModelRelationship`](#semanticmodelrelationship)
- [`SemanticModel`](#semanticmodel)
- [`ChartTemplateOptionSource`](#charttemplateoptionsource)
- [`ChartTemplateParameter`](#charttemplateparameter)
- [`ChartTemplateSummary`](#charttemplatesummary)
- [`ChartTemplateParameterValue`](#charttemplateparametervalue)
- [`ResolvedChartTemplate`](#resolvedcharttemplate)
- [`QueryResults`](#queryresults)
- [`TimeSeriesSettings`](#timeseriessettings)
- [`NameDurationSettings`](#namedurationsettings)

### `createOrUpdateView`

Create or update a materialized SQL view in the epilot data lake.

`POST /datalake/views`

```ts
const { data } = await client.createOrUpdateView(
  null,
  {
    view_name: 'some_view',
    source_dataset: 'current_entities',
    config: {
      schema: 'some_schema',
      include_purpose_view: true,
      include_label_view: true,
      include_relation_view: true,
      relationship_attribute: ['some_relationship_attribute']
    }
  },
)
```

<details>
<summary>Response</summary>

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

### `getAllViews`

Retrieve all materialized data lake views configured for the organization.

`GET /datalake/views`

```ts
const { data } = await client.getAllViews()
```

<details>
<summary>Response</summary>

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

### `getView`

Retrieve the definition and attributes of a specific data lake view by its slug.

`GET /datalake/views/{view_slug}`

```ts
const { data } = await client.getView({
  view_slug: 'example',
})
```

<details>
<summary>Response</summary>

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

### `createOrUpdateRelationship`

Define or update a relationship between two tables in the data lake.

`POST /datalake/relationships`

```ts
const { data } = await client.createOrUpdateRelationship(
  null,
  {
    relationship_name: 'some_relationship',
    from_table: 'some_table',
    to_table: 'some_table',
    from_column: 'some_column',
    to_column: 'some_column',
    type: 'one_to_many'
  },
)
```

<details>
<summary>Response</summary>

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

### `getAllRelationships`

Retrieve all table relationships configured for the organization's data lake.

`GET /datalake/relationships`

```ts
const { data } = await client.getAllRelationships()
```

<details>
<summary>Response</summary>

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

### `listAvailableDatasetsV2`

Lists all available datasets grouped by domain

`GET /v2/query/datasets`

```ts
const { data } = await client.listAvailableDatasetsV2()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeEntitiesQuery(
  {
    cache_expiration: 'example',
    no_cache: true,
  },
  {
    query: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ],
  "sql": "WITH main AS (...) SELECT ... FROM main LEFT JOIN rel_current_sharing_configs ON ...",
  "nextCursor": "string",
  "total": 0,
  "timeRange": {
    "from": "2026-09-28T00:00:00+02:00",
    "to": "2026-10-05T00:00:00+02:00",
    "timezone": "Europe/Berlin"
  },
  "comparison": {
    "to": "previous_period",
    "timeRange": {
      "from": "2026-09-28T00:00:00+02:00",
      "to": "2026-10-05T00:00:00+02:00",
      "timezone": "Europe/Berlin"
    },
    "results": [
      {}
    ],
    "sql": "string",
    "deltas": [
      {
        "column": "string",
        "current": 0,
        "previous": 0,
        "absolute": 0,
        "relative": 0
      }
    ]
  },
  "columns": [
    {
      "role": "dimension",
      "id": "purposes.name",
      "alias": "purposes_name",
      "name": "Purpose Name"
    }
  ]
}
```

</details>

---

### `executeWorkflowsQuery`

Query Workflow Analytics Datasets.

`POST /v2/query/domain/workflows:execute`

```ts
const { data } = await client.executeWorkflowsQuery(
  {
    mock: true,
    cache_expiration: 'example',
    no_cache: true,
  },
  {
    dataset: 'total_count_of_workflow_executions',
    workflow_definition_ids: ['string'],
    entity_schemas: ['string'],
    states: ['string'],
    group_time_by: 'M',
    relative_time_range: 'string',
    time_range_from: 'string',
    time_range_to: 'string',
    duration_threshold: 0
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeAutomationQuery(
  {
    from: 1,
    size: 1,
  },
  {
    dataset: 'automation_executions_overview',
    flow_ids: ['string'],
    execution_states: ['success', 'failed', 'scheduled'],
    relative_time_range: 'all_time',
    time_range_from: 'string',
    time_range_to: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listWorkflowPhasesByDefinitionId({
  workflowDefinitionId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listWorkflowDefinitions({
  mock: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listPhaseNames({
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listDatasets()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeQuery(
  {
    cache_expiration: 'example',
    no_cache: true,
  },
  {
    query: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ],
  "sql": "WITH main AS (...) SELECT ... FROM main LEFT JOIN rel_current_sharing_configs ON ...",
  "nextCursor": "string",
  "total": 0,
  "timeRange": {
    "from": "2026-09-28T00:00:00+02:00",
    "to": "2026-10-05T00:00:00+02:00",
    "timezone": "Europe/Berlin"
  },
  "comparison": {
    "to": "previous_period",
    "timeRange": {
      "from": "2026-09-28T00:00:00+02:00",
      "to": "2026-10-05T00:00:00+02:00",
      "timezone": "Europe/Berlin"
    },
    "results": [
      {}
    ],
    "sql": "string",
    "deltas": [
      {
        "column": "string",
        "current": 0,
        "previous": 0,
        "absolute": 0,
        "relative": 0
      }
    ]
  },
  "columns": [
    {
      "role": "dimension",
      "id": "purposes.name",
      "alias": "purposes_name",
      "name": "Purpose Name"
    }
  ]
}
```

</details>

---

### `generateCredentialsV2`

Generate credentials for the epilot datalake for connecting other BI tools with ClickHouse

`POST /v2/query/credentials:generate`

```ts
const { data } = await client.generateCredentialsV2()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listCredentialsV2()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.revokeCredentialsV2({
  user_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.executeQueryV2(
  null,
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "FINISHED",
  "timestamp": "1715621496068",
  "results": [
    {}
  ],
  "sql": "WITH main AS (...) SELECT ... FROM main LEFT JOIN rel_current_sharing_configs ON ...",
  "nextCursor": "string",
  "total": 0,
  "timeRange": {
    "from": "2026-09-28T00:00:00+02:00",
    "to": "2026-10-05T00:00:00+02:00",
    "timezone": "Europe/Berlin"
  },
  "comparison": {
    "to": "previous_period",
    "timeRange": {
      "from": "2026-09-28T00:00:00+02:00",
      "to": "2026-10-05T00:00:00+02:00",
      "timezone": "Europe/Berlin"
    },
    "results": [
      {}
    ],
    "sql": "string",
    "deltas": [
      {
        "column": "string",
        "current": 0,
        "previous": 0,
        "absolute": 0,
        "relative": 0
      }
    ]
  },
  "columns": [
    {
      "role": "dimension",
      "id": "purposes.name",
      "alias": "purposes_name",
      "name": "Purpose Name"
    }
  ]
}
```

</details>

---

### `getSemanticModel`

Get the semantic model for agent/tool (LLM) consumption.

`GET /v2/query/semantic-model`

```ts
const { data } = await client.getSemanticModel()
```

<details>
<summary>Response</summary>

```json
{
  "version": "3",
  "sql_flavor": "ClickHouse",
  "tables": {
    "entities": {
      "name": "string",
      "description": "string",
      "columns": [],
      "known_schemas": ["string"],
      "shortcuts": {}
    },
    "entity_edges": {
      "name": "string",
      "description": "string",
      "columns": [],
      "known_schemas": ["string"],
      "shortcuts": {}
    },
    "purposes": {
      "name": "string",
      "description": "string",
      "columns": [],
      "known_schemas": ["string"],
      "shortcuts": {}
    },
    "taxonomies": {
      "name": "string",
      "description": "string",
      "columns": [],
      "known_schemas": ["string"],
      "shortcuts": {}
    },
    "workflows": {
      "description": "string",
      "tables": {}
    },
    "sharing": {
      "description": "string",
      "tables": {}
    },
    "analytics_datasets": {
      "description": "string",
      "tables": {}
    }
  },
  "relationships": [
    {
      "name": "string",
      "mechanism": "entity_relation",
      "from": "string",
      "to": "string",
      "via": "string",
      "cardinality": "one-to-one",
      "description": "string"
    }
  ],
  "conventions": {
    "deduplication": "string",
    "soft_delete": "string",
    "org_filter": "string",
    "json_extract": "string",
    "workflow_org_id_padding": "string",
    "entity_fields": "string"
  },
  "capabilities": {
    "chart_calculations": {
      "formula": {},
      "milestone_duration": {}
    }
  }
}
```

</details>

---

### `getChartModel`

Chart-builder UI model. Returns the dataset catalog (per-schema entity
views, cross-schema `current_entities_final`, workflow tables, purposes,
sharing, partners, and pseudo-datasets for purposes/tags

`GET /v2/query/chart-model`

```ts
const { data } = await client.getChartModel()
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `getChartTemplates`

List chart templates

`GET /v2/query/chart-templates`

```ts
const { data } = await client.getChartTemplates()
```

<details>
<summary>Response</summary>

```json
{
  "templates": [
    {
      "id": "string",
      "version": 1,
      "category": "workflows",
      "title": "string",
      "description": "string",
      "chart_type": "metric",
      "tags": ["string"],
      "requires_setup": true,
      "parameters": [
        {
          "id": "string",
          "label": "string",
          "description": "string",
          "required": true,
          "depends_on": ["string"],
          "option_source": {
            "dataset": "workflows",
            "attribute": "workflow_executions.definition_id",
            "filters": {}
          }
        }
      ]
    }
  ]
}
```

</details>

---

### `resolveChartTemplate`

Resolve a chart template

`POST /v2/query/chart-templates/{template_id}:resolve`

```ts
const { data } = await client.resolveChartTemplate(
  {
    template_id: 'example',
  },
  {
    version: 1,
    parameters: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "title": "string",
  "description": "string",
  "chart_config": {}
}
```

</details>

---

### `searchAutocomplete`

Search contextual autocomplete options

`POST /v2/query/autocomplete:search`

```ts
const { data } = await client.searchAutocomplete(
  null,
  {
    dataset: 'workflows',
    attribute: 'workflow_executions.definition_id',
    input: 'string',
    size: 25,
    filters: {
      'workflow_executions.definition_id': 'definition-1'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "options": [
    {
      "value": "string",
      "label": "string",
      "context": {
        "workflow_name": "string",
        "phase_name": "string"
      }
    }
  ]
}
```

</details>

---

### `autocomplete`

Generic autocomplete endpoint for querying distinct values across datasets.
Use the dataset parameter to specify which data category to query.

`GET /v2/query/autocomplete`

```ts
const { data } = await client.autocomplete({
  dataset: 'example',
  input: 'example',
  attribute: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.workflowsAutocomplete({
  input: 'example',
  attribute: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "results": ["value"]
}
```

</details>

---

## Schemas

### `ErrorResponse`

Standard error response body

```ts
type ErrorResponse = {
  status?: number
  error?: string
  message?: string
  code?: string
}
```

### `ViewRequest`

```ts
type ViewRequest = {
  view_name?: string
  source_dataset: "current_entities"
  config: {
    schema: string
    include_purpose_view?: boolean
    include_label_view?: boolean
    include_relation_view?: boolean
    relationship_attribute?: string[]
  }
} | {
  view_name?: string
  source_dataset: "taxonomies"
} | {
  view_name?: string
  source_dataset: "workflow_executions"
}
```

### `CurrentEntitiesViewRequest`

```ts
type CurrentEntitiesViewRequest = {
  view_name?: string
  source_dataset: "current_entities"
  config: {
    schema: string
    include_purpose_view?: boolean
    include_label_view?: boolean
    include_relation_view?: boolean
    relationship_attribute?: string[]
  }
}
```

### `TaxonomiesViewRequest`

```ts
type TaxonomiesViewRequest = {
  view_name?: string
  source_dataset: "taxonomies"
}
```

### `WorkflowExecutionsViewRequest`

```ts
type WorkflowExecutionsViewRequest = {
  view_name?: string
  source_dataset: "workflow_executions"
}
```

### `ViewResponse`

```ts
type ViewResponse = {
  view_name: string
  source_dataset: "current_entities" | "taxonomies" | "workflow_executions"
  attributes: Array<{
    name: string
    type: string
    description?: string
  }>
}
```

### `ViewsListResponse`

```ts
type ViewsListResponse = {
  views?: Array<{
    view_name: string
    source_dataset: "current_entities" | "taxonomies" | "workflow_executions"
    view_slug?: string
    attributes: Array<{
      name: { ... }
      type: { ... }
      description?: { ... }
    }>
  }>
}
```

### `RelationshipRequest`

```ts
type RelationshipRequest = {
  relationship_name: string
  from_table: string
  to_table: string
  from_column: string
  to_column: string
  type: "one_to_many" | "many_to_many" | "many_to_one" | "one_to_one"
}
```

### `RelationshipResponse`

```ts
type RelationshipResponse = {
  relationship_name?: string
  from_table?: string
  to_table?: string
  from_column?: string
  to_column?: string
  type?: "one_to_many" | "many_to_many" | "many_to_one" | "one_to_one"
}
```

### `RelationshipsListResponse`

```ts
type RelationshipsListResponse = {
  relationships?: Array<{
    relationship_name?: string
    from_table?: string
    to_table?: string
    from_column?: string
    to_column?: string
    type?: "one_to_many" | "many_to_many" | "many_to_one" | "one_to_one"
  }>
}
```

### `NoCache`

```ts
type NoCache = boolean
```

### `CacheExpiration`

Cache Expiration timestamp

```ts
type CacheExpiration = string // timestamp
```

### `UserId`

Execution Id for the query

```ts
type UserId = string
```

### `DatasetDomain`

```ts
type DatasetDomain = "entities" | "workflows"
```

### `Dataset`

```ts
type Dataset = {
  dataset?: string
  domain?: "entities" | "workflows"
  endpoint?: string
}
```

### `DatalakeQueryOptions`

```ts
type DatalakeQueryOptions = {
  dataset?: string
  measure?: string
  dimensions?: Record<string, unknown>[]
  filters?: Record<string, unknown>[]
  exclude_deleted?: boolean
}
```

### `DatalakeQuery`

```ts
type DatalakeQuery = {
  dataset?: string
  measure?: string
  dimensions?: Record<string, unknown>[]
  filters?: Record<string, unknown>[]
  exclude_deleted?: boolean
}
```

### `AutomationQueryOptions`

```ts
type AutomationQueryOptions = {
  dataset: "automation_executions_overview" | "list_automation_definitions"
}
```

### `DatasetOptions.AutomationExecutionsOverview`

```ts
type DatasetOptions.AutomationExecutionsOverview = {
  dataset: "automation_executions_overview" | "list_automation_definitions"
  flow_ids?: string[]
  execution_states?: string[]
  relative_time_range?: "all_time" | "this_week" | "last_week" | "last_7_days" | "this_month" | "last_month" | "last_30_days" | "last_3_months" | "last_6_months" | "this_year" | "last_year"
  time_range_from?: string
  time_range_to?: string
}
```

### `DatasetOptions.ListAutomationDefinitions`

```ts
type DatasetOptions.ListAutomationDefinitions = {
  dataset: "automation_executions_overview" | "list_automation_definitions"
  search?: string
}
```

### `WorkflowsQueryOptions`

Settings for the data of the chart that is being queried.

```ts
type WorkflowsQueryOptions = {
  dataset?: "total_count_of_workflow_executions" | "workflow_execution_time_series" | "cumulative_sum_of_workflows" | "cancellation_reasons" | "phases_count" | "phases_duration" | "tasks_duration" | "task_duration" | "workflow_tasks_overview"
  workflow_definition_ids?: string[]
  entity_schemas?: string[]
  states?: string[]
  group_time_by?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
  duration_threshold?: number
}
```

### `DatasetOptions.TotalCountOfWorkflowExecutions`

See the total of workflow executions in a pie chart.

```ts
type DatasetOptions.TotalCountOfWorkflowExecutions = {
  workflow_definition_ids?: string[]
  entity_schema?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
}
```

### `DatasetOptions.WorkflowExecutionTimeSeries`

```ts
type DatasetOptions.WorkflowExecutionTimeSeries = {
  workflow_definition_ids?: string[]
  entity_schema?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
  workflow_states?: string[]
  group_time_by?: string
}
```

### `DatasetOptions.CumulativeSumOfWorkflows`

```ts
type DatasetOptions.CumulativeSumOfWorkflows = {
  workflow_definition_ids?: string[]
  entity_schema?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
  workflow_states?: string[]
  group_time_by?: string
}
```

### `DatasetOptions.CancellationReasons`

See the cancellation reasons of workflows in a pie chart.

```ts
type DatasetOptions.CancellationReasons = {
  workflow_definition_ids?: string[]
  entity_schema?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
}
```

### `DatasetOptions.WorkflowTasksOverview`

Get a list of tasks to help organize executing users their day.

```ts
type DatasetOptions.WorkflowTasksOverview = {
  dataset: "total_count_of_workflow_executions" | "workflow_execution_time_series" | "cumulative_sum_of_workflows" | "cancellation_reasons" | "phases_count" | "phases_duration" | "tasks_duration" | "task_duration" | "workflow_tasks_overview"
  workflow_definition_ids?: string[]
  entity_schema?: string
  relative_time_range?: string
  time_range_from?: string
  time_range_to?: string
  assignee_ids?: string[]
  include_unassigned?: boolean
  due_date_from?: string
  due_date_to?: string
  sort_by?: string
  page_number?: number
  page_size?: number
}
```

### `Response.WorkflowTaskOverview`

```ts
type Response.WorkflowTaskOverview = {
  results?: Array<{
    orgId?: string
    id?: string
    definitionId?: string
    phaseId?: string
    entityRefId?: string
    name?: string
    type?: "MANUAL" | "AUTOMATION"
    ecp?: {
      label?: { ... }
    }
    requirements?: Array<{
      definitionId?: { ... }
      type?: { ... }
      condition?: { ... }
    }>
    executionType?: "MANUAL" | "AUTOMATION"
    executionId?: string
    assignedTo?: string[]
    assignedToInProgress?: string
    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS"
    executionStatus?: "STARTED" | "DONE" | "CLOSED"
    created?: string
    lastUpdated?: string
    dueDate?: string
    dynamicDueDate?: {
      numberOfUnits: { ... }
      timePeriod: { ... }
      actionTypeCondition?: { ... }
      stepId?: { ... }
    }
    manuallyCreated?: boolean
    enabled?: boolean
    automationConfig?: {
      flowId: { ... }
      executionId?: { ... }
      executionStatus?: { ... }
    }
    executionName?: string
    contexts?: Array<{
      id: { ... }
      title: { ... }
      schema: { ... }
    }>
  }>
  hits?: number
}
```

### `ECPDetails`

Details regarding ECP for the workflow step

```ts
type ECPDetails = {
  label?: string
}
```

### `WorkflowContext`

```ts
type WorkflowContext = {
  id: string
  title: string
  schema: string
}
```

### `WorkflowStatus`

```ts
type WorkflowStatus = "STARTED" | "DONE" | "CLOSED"
```

### `AutomationConfig`

Configuration for automation execution to run

```ts
type AutomationConfig = {
  flowId: string
  executionId?: string
  executionStatus?: string
}
```

### `DynamicDueDate`

set a Duedate for a step then a specific

```ts
type DynamicDueDate = {
  numberOfUnits: number
  timePeriod: "days" | "weeks" | "months"
  actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED"
  stepId?: string
}
```

### `TaskStatus`

```ts
type TaskStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS"
```

### `TaskRequirement`

describe the requirement for step enablement

```ts
type TaskRequirement = {
  definitionId?: string
  type?: "STEP"
  condition?: "CLOSED"
}
```

### `TaskType`

```ts
type TaskType = "MANUAL" | "AUTOMATION"
```

### `Task`

```ts
type Task = {
  orgId?: string
  id?: string
  definitionId?: string
  phaseId?: string
  entityRefId?: string
  name?: string
  type?: "MANUAL" | "AUTOMATION"
  ecp?: {
    label?: string
  }
  requirements?: Array<{
    definitionId?: string
    type?: "STEP"
    condition?: "CLOSED"
  }>
  executionType?: "MANUAL" | "AUTOMATION"
  executionId?: string
  assignedTo?: string[]
  assignedToInProgress?: string
  status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED" | "IN_PROGRESS"
  executionStatus?: "STARTED" | "DONE" | "CLOSED"
  created?: string
  lastUpdated?: string
  dueDate?: string
  dynamicDueDate?: {
    numberOfUnits: number
    timePeriod: "days" | "weeks" | "months"
    actionTypeCondition?: "WORKFLOW_STARTED" | "STEP_CLOSED"
    stepId?: string
  }
  manuallyCreated?: boolean
  enabled?: boolean
  automationConfig?: {
    flowId: string
    executionId?: string
    executionStatus?: string
  }
  executionName?: string
  contexts?: Array<{
    id: string
    title: string
    schema: string
  }>
}
```

### `WorkflowsQueryOptions.WorkflowDefinitionIDs`

Filter by specific workflows by passing a list of workflow definition ids.

```ts
type WorkflowsQueryOptions.WorkflowDefinitionIDs = string[]
```

### `WorkflowsQueryOptions.EntitySchema`

Workflows can be applied to different kinds of entities, e.g. on Opportunities or Orders.
You can choose to limit your results to workflow executions to specific entity schemas / types.


```ts
type WorkflowsQueryOptions.EntitySchema = string
```

### `WorkflowsQueryOptions.RelativeTimeRange`

A combination of two worde that describe a time range, e.g. "this year" or "last month"

```ts
type WorkflowsQueryOptions.RelativeTimeRange = string
```

### `WorkflowsQueryOptions.TimeRangeFrom`

Set a specific start of a time range, e.g. "2023-01-01"

```ts
type WorkflowsQueryOptions.TimeRangeFrom = string
```

### `WorkflowsQueryOptions.TimeRangeTo`

Set a specific end of a time range, e.g. "2023-06-30"

```ts
type WorkflowsQueryOptions.TimeRangeTo = string
```

### `WorkflowsQueryOptions.GroupTimeBy`

If chosen a time series, this parameter sets by which time the data is grouped, e.g. quarterly, monthly or weekly.  Available values: "D","W","M","Q","Y"

```ts
type WorkflowsQueryOptions.GroupTimeBy = string
```

### `WorkflowsQueryOptions.WorkflowStates`

Filter by the states of the workflow executions.

```ts
type WorkflowsQueryOptions.WorkflowStates = string[]
```

### `DatasetName`

```ts
type DatasetName = string
```

### `EntityDataset`

```ts
type EntityDataset = "entity_operations" | "entities_timemachine" | "datalake_raw_sql"
```

### `AutomationExecutionDataset`

```ts
type AutomationExecutionDataset = "automation_executions_overview" | "list_automation_definitions"
```

### `WorkflowDataset`

```ts
type WorkflowDataset = "total_count_of_workflow_executions" | "workflow_execution_time_series" | "cumulative_sum_of_workflows" | "cancellation_reasons" | "phases_count" | "phases_duration" | "tasks_duration" | "task_duration" | "workflow_tasks_overview"
```

### `WorkflowStates`

```ts
type WorkflowStates = "STARTED" | "CLOSED" | "DONE"
```

### `PhaseStates`

```ts
type PhaseStates = "OPEN" | "COMPLETED" | "IN_PROGRESS"
```

### `TaskStates`

```ts
type TaskStates = "OPEN" | "COMPLETED" | "IN_PROGRESS"
```

### `SortBy`

```ts
type SortBy = "due_date_ascending" | "due_date_descending" | "creation_date_ascending" | "creation_date_descending"
```

### `TimeGroups`

```ts
type TimeGroups = "Y" | "Q" | "M" | "W" | "D"
```

### `RelativeTimeRange`

```ts
type RelativeTimeRange = "all_time" | "this_week" | "last_week" | "last_7_days" | "this_month" | "last_month" | "last_30_days" | "last_3_months" | "last_6_months" | "this_year" | "last_year"
```

### `WorkflowsQueryResult`

```ts
type WorkflowsQueryResult = {
  data?: string | number | Record<string, unknown> | Record<string, unknown>[][] | Record<string, unknown> | string | number
  labels?: string[]
  timestamp?: string
}
```

### `AutomationExecutionResponse`

```ts
type AutomationExecutionResponse = {
  hits?: number
  results?: Array<{
    flow_id: string
    flow_name?: string
    execution_id: string
    execution_status: string
    entity_schema?: string
    entity_id?: string
    created_at: string
    updated_at?: string
    error?: {
      message?: { ... }
      error_code?: { ... }
    }
    trigger_event?: {
      type?: { ... }
      trigger_type?: { ... }
    }
  }>
}
```

### `ListAutomationDefinitionsResponse`

```ts
type ListAutomationDefinitionsResponse = {
  hits?: number
  results?: Array<{
    flow_id: string
    flow_name: string
    entity_schema?: string
  }>
}
```

### `QueryTimeWindow`

A resolved time window, ISO-8601 instants with the offset of `timezone`.

```ts
type QueryTimeWindow = {
  from: string
  to: string
  timezone: string
}
```

### `SemanticModelColumn`

```ts
type SemanticModelColumn = {
  name: string
  type: string
  description?: string
}
```

### `SemanticModelTable`

```ts
type SemanticModelTable = {
  name: string
  description: string
  columns?: Array<{
    name: string
    type: string
    description?: string
  }>
  known_schemas?: string[]
  shortcuts?: Record<string, string>
}
```

### `SemanticModelRelationship`

```ts
type SemanticModelRelationship = {
  name: string
  mechanism: "entity_relation" | "purpose_array" | "tags_array" | "workflow_context" | "direct_fk"
  from: string
  to?: string
  via?: string
  cardinality: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many"
  description: string
}
```

### `SemanticModel`

Describes the ClickHouse datasets an agent can query: which tables exist, how they
connect, and what conventions (FINAL, soft-delete, JSON extraction, org filter) must
be observed. Intentionally terse — per-entity payload fields live in the Entity API
and are not repeated here.


```ts
type SemanticModel = {
  version: "3"
  sql_flavor: "ClickHouse"
  tables: {
    entities: {
      name: { ... }
      description: { ... }
      columns?: { ... }
      known_schemas?: { ... }
      shortcuts?: { ... }
    }
    entity_edges: {
      name: { ... }
      description: { ... }
      columns?: { ... }
      known_schemas?: { ... }
      shortcuts?: { ... }
    }
    purposes: {
      name: { ... }
      description: { ... }
      columns?: { ... }
      known_schemas?: { ... }
      shortcuts?: { ... }
    }
    taxonomies: {
      name: { ... }
      description: { ... }
      columns?: { ... }
      known_schemas?: { ... }
      shortcuts?: { ... }
    }
    workflows: {
      description: { ... }
      tables: { ... }
    }
    sharing: {
      description: { ... }
      tables: { ... }
    }
    analytics_datasets: {
      description: { ... }
      tables: { ... }
    }
  }
  relationships: Array<{
    name: string
    mechanism: "entity_relation" | "purpose_array" | "tags_array" | "workflow_context" | "direct_fk"
    from: string
    to?: string
    via?: string
    cardinality: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many"
    description: string
  }>
  conventions: {
    deduplication: string
    soft_delete: string
    org_filter: string
    json_extract: string
    workflow_org_id_padding: string
    entity_fields: string
  }
  capabilities: {
    chart_calculations: {
      formula: { ... }
      milestone_duration: { ... }
    }
  }
}
```

### `ChartTemplateOptionSource`

```ts
type ChartTemplateOptionSource = {
  dataset: "workflows"
  attribute: "workflow_executions.definition_id" | "workflow_phases.name" | "workflow_tasks.name"
  filters?: Record<string, {
    parameter: string
  }>
}
```

### `ChartTemplateParameter`

```ts
type ChartTemplateParameter = {
  id: string
  label: string
  description?: string
  required: boolean
  depends_on: string[]
  option_source: {
    dataset: "workflows"
    attribute: "workflow_executions.definition_id" | "workflow_phases.name" | "workflow_tasks.name"
    filters?: Record<string, {
      parameter: { ... }
    }>
  }
}
```

### `ChartTemplateSummary`

```ts
type ChartTemplateSummary = {
  id: string
  version: number
  category: "workflows" | "journeys" | "opportunities" | "sharing" | "contacts" | "orders" | "tickets" | "contracts" | "service"
  title: string
  description: string
  chart_type: "metric" | "line" | "bar" | "horizontal-bar" | "pie" | "donut" | "funnel" | "area"
  tags: string[]
  requires_setup: boolean
  parameters: Array<{
    id: string
    label: string
    description?: string
    required: boolean
    depends_on: string[]
    option_source: {
      dataset: { ... }
      attribute: { ... }
      filters?: { ... }
    }
  }>
}
```

### `ChartTemplateParameterValue`

```ts
type ChartTemplateParameterValue = string | {
  value: string
  label?: string
  context?: {
    workflow_name?: string
    phase_name?: string
  }
}
```

### `ResolvedChartTemplate`

```ts
type ResolvedChartTemplate = {
  title: string
  description: string
  chart_config: Record<string, unknown>
}
```

### `QueryResults`

```ts
type QueryResults = {
  status?: string
  timestamp?: string
  results?: Record<string, unknown>[]
  sql?: string
  nextCursor?: string
  total?: number
  timeRange?: {
    from: string
    to: string
    timezone: string
  }
  comparison?: {
    to: "previous_period" | "previous_year"
    timeRange: {
      from: { ... }
      to: { ... }
      timezone: { ... }
    }
    results: Record<string, unknown>[]
    sql: string
    deltas: Array<{
      column: { ... }
      current: { ... }
      previous: { ... }
      absolute: { ... }
      relative: { ... }
    }>
  }
  columns?: Array<{
    role?: "dimension" | "breakdown" | "measure"
    id?: string
    alias?: string
    name?: string
  }>
}
```

### `TimeSeriesSettings`

```ts
type TimeSeriesSettings = {
  dataset?: "time_series"
  from?: string // date-time
  to?: string // date-time
  time_grouper?: string
  workflow_names?: string[]
}
```

### `NameDurationSettings`

```ts
type NameDurationSettings = {
  dataset?: "name_duration"
  from?: string // date-time
  to?: string // date-time
  workflow_name?: string
}
```
