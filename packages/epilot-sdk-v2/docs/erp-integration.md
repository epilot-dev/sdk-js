# ERP Integration API

- **Base URL:** `https://erp-integration-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/erp-integration](https://docs.epilot.io/api/erp-integration)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.erpIntegration.acknowledgeTracking(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/erp-integration'

const erpIntegrationClient = getClient()
authorize(erpIntegrationClient, () => '<token>')
const { data } = await erpIntegrationClient.acknowledgeTracking(...)
```

## Operations

**erp**
- [`acknowledgeTracking`](#acknowledgetracking)
- [`triggerErp`](#triggererp)
- [`processErpUpdatesEventsV3`](#processerpupdateseventsv3)
- [`simulateMappingV2`](#simulatemappingv2)
- [`simulateMapping`](#simulatemapping)

**integrations**
- [`listIntegrations`](#listintegrations)
- [`createIntegration`](#createintegration)
- [`getIntegration`](#getintegration)
- [`updateIntegration`](#updateintegration)
- [`deleteIntegration`](#deleteintegration)
- [`queryEvents`](#queryevents)
- [`replayEvents`](#replayevents)
- [`listUseCases`](#listusecases)
- [`createUseCase`](#createusecase)
- [`getUseCase`](#getusecase)
- [`updateUseCase`](#updateusecase)
- [`deleteUseCase`](#deleteusecase)
- [`listUseCaseHistory`](#listusecasehistory)
- [`listIntegrationsV2`](#listintegrationsv2)
- [`createIntegrationV2`](#createintegrationv2)
- [`getIntegrationV2`](#getintegrationv2)
- [`updateIntegrationV2`](#updateintegrationv2)
- [`deleteIntegrationV2`](#deleteintegrationv2)
- [`setIntegrationAppMapping`](#setintegrationappmapping)
- [`deleteIntegrationAppMapping`](#deleteintegrationappmapping)
- [`getOutboundStatus`](#getoutboundstatus)
- [`listSecureProxies`](#listsecureproxies)
- [`generateTypesPreview`](#generatetypespreview)
- [`generateTypes`](#generatetypes)
- [`commitTypes`](#committypes)

**monitoring**
- [`queryInboundMonitoringEvents`](#queryinboundmonitoringevents)
- [`getMonitoringStats`](#getmonitoringstats)
- [`getMonitoringTimeSeries`](#getmonitoringtimeseries)
- [`queryAccessLogs`](#queryaccesslogs)
- [`queryOutboundMonitoringEvents`](#queryoutboundmonitoringevents)
- [`queryMonitoringEventsV2`](#querymonitoringeventsv2)
- [`getMonitoringStatsV2`](#getmonitoringstatsv2)
- [`getMonitoringTimeSeriesV2`](#getmonitoringtimeseriesv2)
- [`getAssociatedMonitoringEvents`](#getassociatedmonitoringevents)

**proxy**
- [`secureProxy`](#secureproxy)

**managed-call**
- [`managedCallExecute`](#managedcallexecute)

**Schemas**
- [`ErrorResponseBase`](#errorresponsebase)
- [`ErpEvent`](#erpevent)
- [`ErpUpdatesEventsV2Request`](#erpupdateseventsv2request)
- [`ErpEventV3`](#erpeventv3)
- [`ErpUpdatesEventsV3Request`](#erpupdateseventsv3request)
- [`TriggerErpActionRequest`](#triggererpactionrequest)
- [`TriggerWebhookResp`](#triggerwebhookresp)
- [`IntegrationEditableFields`](#integrationeditablefields)
- [`ConnectorConfig`](#connectorconfig)
- [`ManagedCallAuth`](#managedcallauth)
- [`Integration`](#integration)
- [`CreateIntegrationRequest`](#createintegrationrequest)
- [`UpdateIntegrationRequest`](#updateintegrationrequest)
- [`EnvironmentFieldConfig`](#environmentfieldconfig)
- [`IntegrationSettings`](#integrationsettings)
- [`AutoRefreshSettings`](#autorefreshsettings)
- [`SetIntegrationAppMappingRequest`](#setintegrationappmappingrequest)
- [`DeleteIntegrationAppMappingRequest`](#deleteintegrationappmappingrequest)
- [`IntegrationAppMapping`](#integrationappmapping)
- [`IntegrationWithUseCases`](#integrationwithusecases)
- [`UpsertIntegrationWithUseCasesRequest`](#upsertintegrationwithusecasesrequest)
- [`InboundIntegrationEventConfiguration`](#inboundintegrationeventconfiguration)
- [`OutboundIntegrationEventConfiguration`](#outboundintegrationeventconfiguration)
- [`IntegrationEntity`](#integrationentity)
- [`IntegrationMeterReading`](#integrationmeterreading)
- [`PruneScopeConfig`](#prunescopeconfig)
- [`MeterReadingPruneScopeConfig`](#meterreadingprunescopeconfig)
- [`MeterUniqueIdsConfig`](#meteruniqueidsconfig)
- [`IntegrationEntityField`](#integrationentityfield)
- [`FileProxyUrlParam`](#fileproxyurlparam)
- [`FileProxyUrlParams`](#fileproxyurlparams)
- [`FileProxyUrlConfig`](#fileproxyurlconfig)
- [`EmbeddedUseCaseRequest`](#embeddedusecaserequest)
- [`EmbeddedUseCaseRequestBase`](#embeddedusecaserequestbase)
- [`EmbeddedInboundUseCaseRequest`](#embeddedinboundusecaserequest)
- [`EmbeddedOutboundUseCaseRequest`](#embeddedoutboundusecaserequest)
- [`EmbeddedFileProxyUseCaseRequest`](#embeddedfileproxyusecaserequest)
- [`EmbeddedManagedCallUseCaseRequest`](#embeddedmanagedcallusecaserequest)
- [`EmbeddedSecureProxyUseCaseRequest`](#embeddedsecureproxyusecaserequest)
- [`UseCaseBase`](#usecasebase)
- [`InboundUseCase`](#inboundusecase)
- [`OutboundUseCase`](#outboundusecase)
- [`FileProxyUseCase`](#fileproxyusecase)
- [`ManagedCallUseCase`](#managedcallusecase)
- [`SecureProxyUseCase`](#secureproxyusecase)
- [`UseCase`](#usecase)
- [`CreateUseCaseRequest`](#createusecaserequest)
- [`CreateUseCaseRequestBase`](#createusecaserequestbase)
- [`CreateInboundUseCaseRequest`](#createinboundusecaserequest)
- [`CreateOutboundUseCaseRequest`](#createoutboundusecaserequest)
- [`CreateFileProxyUseCaseRequest`](#createfileproxyusecaserequest)
- [`CreateManagedCallUseCaseRequest`](#createmanagedcallusecaserequest)
- [`CreateSecureProxyUseCaseRequest`](#createsecureproxyusecaserequest)
- [`UpdateUseCaseRequest`](#updateusecaserequest)
- [`UpdateUseCaseRequestBase`](#updateusecaserequestbase)
- [`UpdateInboundUseCaseRequest`](#updateinboundusecaserequest)
- [`UpdateOutboundUseCaseRequest`](#updateoutboundusecaserequest)
- [`UpdateFileProxyUseCaseRequest`](#updatefileproxyusecaserequest)
- [`UpdateManagedCallUseCaseRequest`](#updatemanagedcallusecaserequest)
- [`UpdateSecureProxyUseCaseRequest`](#updatesecureproxyusecaserequest)
- [`UseCaseHistoryEntry`](#usecasehistoryentry)
- [`UseCaseHistoryEntryBase`](#usecasehistoryentrybase)
- [`InboundUseCaseHistoryEntry`](#inboundusecasehistoryentry)
- [`OutboundUseCaseHistoryEntry`](#outboundusecasehistoryentry)
- [`FileProxyUseCaseHistoryEntry`](#fileproxyusecasehistoryentry)
- [`ManagedCallUseCaseHistoryEntry`](#managedcallusecasehistoryentry)
- [`SecureProxyUseCaseHistoryEntry`](#secureproxyusecasehistoryentry)
- [`SecureProxyUseCaseConfiguration`](#secureproxyusecaseconfiguration)
- [`SecureProxySummary`](#secureproxysummary)
- [`SecureProxyRequest`](#secureproxyrequest)
- [`SecureProxyResponse`](#secureproxyresponse)
- [`ManagedCallOperationConfig`](#managedcalloperationconfig)
- [`ManagedCallOperation`](#managedcalloperation)
- [`ManagedCallExecuteRequest`](#managedcallexecuterequest)
- [`ManagedCallExecuteResponse`](#managedcallexecuteresponse)
- [`ManagedCallErrorResponse`](#managedcallerrorresponse)
- [`TypeAnnotations`](#typeannotations)
- [`TypeDescriptor`](#typedescriptor)
- [`UseCaseTypePreview`](#usecasetypepreview)
- [`GenerateTypesPreviewResponse`](#generatetypespreviewresponse)
- [`GenerateTypesRequest`](#generatetypesrequest)
- [`GenerateTypesResponse`](#generatetypesresponse)
- [`CommitTypesRequest`](#committypesrequest)
- [`CommitTypesResponse`](#committypesresponse)
- [`FileProxyUseCaseConfiguration`](#fileproxyusecaseconfiguration)
- [`FileProxySecureProxyAttachment`](#fileproxysecureproxyattachment)
- [`FileProxyAuth`](#fileproxyauth)
- [`FileProxyParam`](#fileproxyparam)
- [`FileProxyStep`](#fileproxystep)
- [`FileProxyResponseConfig`](#fileproxyresponseconfig)
- [`MappingSimulationRequest`](#mappingsimulationrequest)
- [`MappingSimulationV2Request`](#mappingsimulationv2request)
- [`MappingSimulationResponse`](#mappingsimulationresponse)
- [`MappingSimulationWarning`](#mappingsimulationwarning)
- [`EntityUpdate`](#entityupdate)
- [`MeterReadingUpdate`](#meterreadingupdate)
- [`IntegrationConfigurationV1`](#integrationconfigurationv1)
- [`IntegrationObjectV1`](#integrationobjectv1)
- [`IntegrationFieldV1`](#integrationfieldv1)
- [`IntegrationConfigurationV2`](#integrationconfigurationv2)
- [`OutboundMapping`](#outboundmapping)
- [`DeliveryConfig`](#deliveryconfig)
- [`OutboundStatusResponse`](#outboundstatusresponse)
- [`OutboundUseCaseStatus`](#outboundusecasestatus)
- [`WebhookStatus`](#webhookstatus)
- [`OutboundConflict`](#outboundconflict)
- [`RelationConfig`](#relationconfig)
- [`RelationItemConfig`](#relationitemconfig)
- [`RelationUniqueIdField`](#relationuniqueidfield)
- [`RelationRefsConfig`](#relationrefsconfig)
- [`RelationRefItemConfig`](#relationrefitemconfig)
- [`RelationRefValueConfig`](#relationrefvalueconfig)
- [`RepeatableFieldType`](#repeatablefieldtype)
- [`ReplayEventsRequest`](#replayeventsrequest)
- [`QueryEventsRequest`](#queryeventsrequest)
- [`QueryInboundMonitoringEventsRequest`](#queryinboundmonitoringeventsrequest)
- [`QueryAccessLogsRequest`](#queryaccesslogsrequest)
- [`AccessLogEntry`](#accesslogentry)
- [`GetMonitoringStatsRequest`](#getmonitoringstatsrequest)
- [`GetMonitoringTimeSeriesRequest`](#getmonitoringtimeseriesrequest)
- [`TimeSeriesBucket`](#timeseriesbucket)
- [`QueryOutboundMonitoringEventsRequest`](#queryoutboundmonitoringeventsrequest)
- [`OutboundMonitoringEvent`](#outboundmonitoringevent)
- [`MonitoringStats`](#monitoringstats)
- [`InboundMonitoringEvent`](#inboundmonitoringevent)
- [`QueryMonitoringEventsV2Request`](#querymonitoringeventsv2request)
- [`MonitoringEventV2`](#monitoringeventv2)
- [`GetMonitoringStatsV2Request`](#getmonitoringstatsv2request)
- [`MonitoringStatsV2`](#monitoringstatsv2)
- [`GetMonitoringTimeSeriesV2Request`](#getmonitoringtimeseriesv2request)
- [`TimeSeriesBucketV2`](#timeseriesbucketv2)

### `acknowledgeTracking`

Acknowledges an ERP tracking record by removing it from the tracking table, requires public authentication

`POST /v1/erp/tracking/acknowledgement`

```ts
const { data } = await client.acknowledgeTracking(
  null,
  {
    ack_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `triggerErp`

Triggers the ERP integration process

`POST /v1/erp/trigger`

```ts
const { data } = await client.triggerErp(
  null,
  {
    execution_id: 'string',
    org_id: 'string',
    webhook_id: 'string',
    flow_id: 'string',
    created_at: '1970-01-01T00:00:00.000Z',
    action_id: 'string',
    flow_action_id: 'string',
    flow_name: 'string',
    activity_id: 'string',
    entity_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status_code": "string",
  "message": "string",
  "body": {},
  "code": "string",
  "status": "succeeded",
  "start_date": "string",
  "end_date": "string",
  "event_id": "string"
}
```

</details>

---

### `processErpUpdatesEventsV3`

Handles updates from ERP systems using integration_id directly.
This is the v3 version that removes the unused event_type field and renames object_type to event_name
to align with the integration UI n

`POST /v3/erp/updates/events`

```ts
const { data } = await client.processErpUpdatesEventsV3(
  null,
  {
    integration_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    correlation_id: 'string',
    events: [
      {},
      {}
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "event_id": "string",
      "status": "success",
      "message": "string"
    }
  ]
}
```

</details>

---

### `simulateMappingV2`

Test v2.0 mapping configuration by transforming a payload using the provided mapping rules without persisting data.

`POST /v2/erp/updates/mapping_simulation`

```ts
const { data } = await client.simulateMappingV2(
  null,
  {
    event_configuration: {
      entities: [
        { /* ... */ }
      ],
      meter_readings: [
        { /* ... */ }
      ]
    },
    format: 'json',
    payload: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {}
    }
  ],
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "attributes": {}
    }
  ],
  "warnings": [
    {
      "entity_schema": "string",
      "field": "string",
      "message": "string"
    }
  ]
}
```

</details>

---

### `simulateMapping`

Test mapping configuration by transforming a payload using the provided mapping rules without persisting data.

`POST /v1/erp/updates/mapping_simulation`

```ts
const { data } = await client.simulateMapping(
  null,
  {
    mapping_configuration: {
      version: '1.0',
      mapping: {
        objects: {}
      }
    },
    object_type: 'string',
    format: 'json',
    payload: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "entity_updates": [
    {
      "entity_slug": "string",
      "unique_identifiers": {},
      "attributes": {}
    }
  ],
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {}
      },
      "meter_counter": {
        "$entity_unique_ids": {}
      },
      "attributes": {}
    }
  ],
  "warnings": [
    {
      "entity_schema": "string",
      "field": "string",
      "message": "string"
    }
  ]
}
```

</details>

---

### `listIntegrations`

Retrieve all integrations for the authenticated organization

`GET /v1/integrations`

```ts
const { data } = await client.listIntegrations()
```

<details>
<summary>Response</summary>

```json
{
  "integrations": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "name": "string",
      "description": "string",
      "access_token_ids": ["string"],
      "app_ids": ["string"],
      "environment_config": [
        {
          "key": "string",
          "label": "string",
          "type": "String",
          "description": "string",
          "required": false,
          "order": 0
        }
      ],
      "settings": {
        "autoRefresh": {
          "enabled": false,
          "freshnessThresholdMinutes": 1
        }
      },
      "integration_type": "erp",
      "connector_config": {
        "base_url": "string",
        "auth": {
          "type": "oauth2_client_credentials",
          "token_url": "string",
          "client_id": "string",
          "client_secret": "string",
          "scope": "string",
          "audience": "string",
          "resource": "string",
          "body_params": {},
          "headers": {},
          "query_params": {},
          "api_key_header": "string",
          "api_key": "string",
          "token": "string"
        },
        "types_versions": [
          {
            "version": "string",
            "package_name": "string",
            "generated_at": "1970-01-01T00:00:00.000Z",
            "generated_by": "string",
            "status": "active"
          }
        ],
        "latest_types_version": "string",
        "latest_types_package_name": "string"
      },
      "protected": true
    }
  ]
}
```

</details>

---

### `createIntegration`

Create a new integration configuration

`POST /v1/integrations`

```ts
const { data } = await client.createIntegration(
  null,
  {
    name: 'string',
    description: 'string',
    access_token_ids: ['string'],
    app_ids: ['string'],
    environment_config: [
      {
        key: 'string',
        label: 'string',
        type: 'String',
        description: 'string',
        required: false,
        order: 0
      }
    ],
    settings: {
      autoRefresh: {
        enabled: false,
        freshnessThresholdMinutes: 1
      }
    },
    integration_type: 'erp',
    connector_config: {
      base_url: 'string',
      auth: {
        type: 'oauth2_client_credentials',
        token_url: 'string',
        client_id: 'string',
        client_secret: 'string',
        scope: 'string',
        audience: 'string',
        resource: 'string',
        body_params: {},
        headers: {},
        query_params: {},
        api_key_header: 'string',
        api_key: 'string',
        token: 'string'
      },
      types_versions: [
        {
          version: 'string',
          package_name: 'string',
          generated_at: '1970-01-01T00:00:00.000Z',
          generated_by: 'string',
          status: 'active'
        }
      ],
      latest_types_version: 'string',
      latest_types_package_name: 'string'
    },
    protected: true
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {
        "version": "string",
        "package_name": "string",
        "generated_at": "1970-01-01T00:00:00.000Z",
        "generated_by": "string",
        "status": "active"
      }
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true
}
```

</details>

---

### `getIntegration`

Retrieve a specific integration by its ID

`GET /v1/integrations/{integrationId}`

```ts
const { data } = await client.getIntegration({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {
        "version": "string",
        "package_name": "string",
        "generated_at": "1970-01-01T00:00:00.000Z",
        "generated_by": "string",
        "status": "active"
      }
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true
}
```

</details>

---

### `updateIntegration`

Update an existing integration configuration

`PUT /v1/integrations/{integrationId}`

```ts
const { data } = await client.updateIntegration(
  {
    integrationId: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {
        "version": "string",
        "package_name": "string",
        "generated_at": "1970-01-01T00:00:00.000Z",
        "generated_by": "string",
        "status": "active"
      }
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true
}
```

</details>

---

### `deleteIntegration`

Delete an integration and all its use cases

`DELETE /v1/integrations/{integrationId}`

```ts
const { data } = await client.deleteIntegration({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `queryEvents`

Query events for a specific integration

`POST /v1/integrations/{integrationId}/events`

```ts
const { data } = await client.queryEvents(
  {
    integrationId: 'example',
  },
  {
    event_id: 'string',
    event_type: 'CREATE',
    correlation_id: 'string',
    object_type: 'string',
    event_name: 'string',
    limit: 25,
    cursor: {
      event_time: '2025-10-31T12:34:56Z',
      event_id: 'evt_1234567890abcdef'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "event_type": "CREATE",
      "object_type": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "format": "json",
      "payload": "string",
      "deduplication_id": "evt-2025-05-01-12345-create-bp"
    }
  ],
  "next_cursor": {
    "event_time": "2025-10-31T12:34:56Z",
    "event_id": "evt_1234567890abcdef"
  },
  "has_more": true
}
```

</details>

---

### `replayEvents`

Replay one or more events for a specific integration. Events will be re-processed with their original payloads but with a new correlation ID for traceability.

`POST /v1/integrations/{integrationId}/events/replay`

```ts
const { data } = await client.replayEvents(
  {
    integrationId: 'example',
  },
  {
    event_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "event_ids": ["string"]
}
```

</details>

---

### `listUseCases`

Retrieve all use cases for a specific integration

`GET /v1/integrations/{integrationId}/use-cases`

```ts
const { data } = await client.listUseCases({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `createUseCase`

Create a new use case for an integration

`POST /v1/integrations/{integrationId}/use-cases`

```ts
const { data } = await client.createUseCase(
  {
    integrationId: 'example',
  },
  {
    name: 'string',
    slug: 'string',
    enabled: true,
    type: 'inbound',
    configuration: {
      entities: [
        { /* ... */ }
      ],
      meter_readings: [
        { /* ... */ }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `getUseCase`

Retrieve a specific use case by its ID

`GET /v1/integrations/{integrationId}/use-cases/{useCaseId}`

```ts
const { data } = await client.getUseCase({
  integrationId: 'example',
  useCaseId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `updateUseCase`

Update an existing use case configuration

`PUT /v1/integrations/{integrationId}/use-cases/{useCaseId}`

```ts
const { data } = await client.updateUseCase(
  {
    integrationId: 'example',
    useCaseId: 'example',
  },
  {
    name: 'string',
    slug: 'string',
    enabled: true,
    change_description: 'string',
    type: 'inbound',
    configuration: {
      entities: [
        { /* ... */ }
      ],
      meter_readings: [
        { /* ... */ }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "slug": "string",
  "type": "inbound",
  "enabled": true,
  "change_description": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "configuration": {
    "entities": [
      {}
    ],
    "meter_readings": [
      {}
    ]
  }
}
```

</details>

---

### `deleteUseCase`

Delete a use case from an integration

`DELETE /v1/integrations/{integrationId}/use-cases/{useCaseId}`

```ts
const { data } = await client.deleteUseCase({
  integrationId: 'example',
  useCaseId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `listUseCaseHistory`

Retrieve historical versions of a use case's configuration.
History entries are returned in reverse chronological order (newest first).
Use the 'cursor' parameter for pagination to fetch additional en

`GET /v1/integrations/{integrationId}/use-cases/{useCaseId}/history`

```ts
const { data } = await client.listUseCaseHistory({
  integrationId: 'example',
  useCaseId: 'example',
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "history": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "useCaseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "history_created_at": "1970-01-01T00:00:00.000Z",
      "type": "inbound",
      "configuration": {}
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `listIntegrationsV2`

Retrieve all integrations with embedded use cases for the authenticated organization

`GET /v2/integrations`

```ts
const { data } = await client.listIntegrationsV2()
```

<details>
<summary>Response</summary>

```json
{
  "integrations": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "orgId": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "name": "string",
      "description": "string",
      "access_token_ids": ["string"],
      "app_ids": ["string"],
      "environment_config": [],
      "settings": {},
      "integration_type": "erp",
      "connector_config": {},
      "protected": true,
      "use_cases": []
    }
  ]
}
```

</details>

---

### `createIntegrationV2`

Create a new integration with embedded use cases.

`POST /v2/integrations`

```ts
const { data } = await client.createIntegrationV2(
  null,
  {
    name: 'string',
    description: 'string',
    access_token_ids: ['string'],
    app_ids: ['string'],
    environment_config: [
      {
        key: 'string',
        label: 'string',
        type: 'String',
        description: 'string',
        required: false,
        order: 0
      }
    ],
    settings: {
      autoRefresh: {
        enabled: false,
        freshnessThresholdMinutes: 1
      }
    },
    integration_type: 'erp',
    connector_config: {
      base_url: 'string',
      auth: {
        type: 'oauth2_client_credentials',
        token_url: 'string',
        client_id: 'string',
        client_secret: 'string',
        scope: 'string',
        audience: 'string',
        resource: 'string',
        body_params: {},
        headers: {},
        query_params: {},
        api_key_header: 'string',
        api_key: 'string',
        token: 'string'
      },
      types_versions: [
        { /* ... */ }
      ],
      latest_types_version: 'string',
      latest_types_package_name: 'string'
    },
    protected: true,
    use_cases: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        slug: 'string',
        enabled: true,
        change_description: 'string',
        type: 'inbound',
        configuration: { /* ... */ }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `getIntegrationV2`

Retrieve a specific integration with all its embedded use cases

`GET /v2/integrations/{integrationId}`

```ts
const { data } = await client.getIntegrationV2({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `updateIntegrationV2`

Update an existing integration with embedded use cases.
The integration must already exist.
Use cases are updated declaratively:
- Use cases in the request with matching IDs are updated
- Use cases in

`PUT /v2/integrations/{integrationId}`

```ts
const { data } = await client.updateIntegrationV2(
  {
    integrationId: 'example',
  },
  {
    name: 'string',
    description: 'string',
    access_token_ids: ['string'],
    app_ids: ['string'],
    environment_config: [
      {
        key: 'string',
        label: 'string',
        type: 'String',
        description: 'string',
        required: false,
        order: 0
      }
    ],
    settings: {
      autoRefresh: {
        enabled: false,
        freshnessThresholdMinutes: 1
      }
    },
    integration_type: 'erp',
    connector_config: {
      base_url: 'string',
      auth: {
        type: 'oauth2_client_credentials',
        token_url: 'string',
        client_id: 'string',
        client_secret: 'string',
        scope: 'string',
        audience: 'string',
        resource: 'string',
        body_params: {},
        headers: {},
        query_params: {},
        api_key_header: 'string',
        api_key: 'string',
        token: 'string'
      },
      types_versions: [
        { /* ... */ }
      ],
      latest_types_version: 'string',
      latest_types_package_name: 'string'
    },
    protected: true,
    use_cases: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        slug: 'string',
        enabled: true,
        change_description: 'string',
        type: 'inbound',
        configuration: { /* ... */ }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orgId": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "name": "string",
  "description": "string",
  "access_token_ids": ["string"],
  "app_ids": ["string"],
  "environment_config": [
    {
      "key": "string",
      "label": "string",
      "type": "String",
      "description": "string",
      "required": false,
      "order": 0
    }
  ],
  "settings": {
    "autoRefresh": {
      "enabled": false,
      "freshnessThresholdMinutes": 1
    }
  },
  "integration_type": "erp",
  "connector_config": {
    "base_url": "string",
    "auth": {
      "type": "oauth2_client_credentials",
      "token_url": "string",
      "client_id": "string",
      "client_secret": "string",
      "scope": "string",
      "audience": "string",
      "resource": "string",
      "body_params": {},
      "headers": {},
      "query_params": {},
      "api_key_header": "string",
      "api_key": "string",
      "token": "string"
    },
    "types_versions": [
      {}
    ],
    "latest_types_version": "string",
    "latest_types_package_name": "string"
  },
  "protected": true,
  "use_cases": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "type": "inbound",
      "enabled": true,
      "change_description": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "configuration": {}
    }
  ]
}
```

</details>

---

### `deleteIntegrationV2`

Delete an integration and all its use cases

`DELETE /v2/integrations/{integrationId}`

```ts
const { data } = await client.deleteIntegrationV2({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `setIntegrationAppMapping`

Creates or updates a mapping from an app/component to an integration.
This allows ERP updates sent via app_id and component_id to be associated
with a specific integration configuration.

`PUT /v1/integrations/{integrationId}/app-mapping`

```ts
const { data } = await client.setIntegrationAppMapping(
  {
    integrationId: 'example',
  },
  {
    app_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    component_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    overwrite: false
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `deleteIntegrationAppMapping`

Removes a mapping from an app/component to an integration.

`DELETE /v1/integrations/{integrationId}/app-mapping`

```ts
const { data } = await client.deleteIntegrationAppMapping(
  {
    integrationId: 'example',
  },
  {
    app_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    component_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "message": "string"
}
```

</details>

---

### `queryInboundMonitoringEvents`

Query inbound monitoring events for a specific integration.
Returns detailed information about inbound sync events from ERP systems,
including success rates, error breakdowns, and processing metrics.

`POST /v1/integrations/{integrationId}/monitoring/inbound-events`

```ts
const { data } = await client.queryInboundMonitoringEvents(
  {
    integrationId: 'example',
  },
  {
    use_case_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    event_type: 'CREATE',
    sync_type: 'entity',
    status: 'success',
    error_category: 'validation',
    correlation_id: 'string',
    object_type: 'string',
    event_name: 'string',
    event_id: 'string',
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    limit: 50,
    cursor: {
      completed_at: '1970-01-01T00:00:00.000Z',
      event_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "org_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "integration_id": "string",
      "use_case_id": "string",
      "event_type": "CREATE",
      "object_type": "string",
      "sync_type": "entity",
      "status": "success",
      "error_code": "string",
      "error_message": "string",
      "error_category": "validation",
      "processing_duration_ms": 0,
      "received_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "completed_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `getMonitoringStats`

Get aggregated statistics for both inbound and outbound monitoring events for a specific integration.
Returns summary metrics for inbound (ERP sync) and outbound (webhook delivery) events,
including s

`POST /v1/integrations/{integrationId}/monitoring/stats`

```ts
const { data } = await client.getMonitoringStats(
  {
    integrationId: 'example',
  },
  {
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    inbound_group_by: ['use_case_id', 'status'],
    outbound_group_by: ['event_name', 'status']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "inbound": {
    "total_events": 0,
    "total_correlations": 0,
    "success_count": 0,
    "error_count": 0,
    "skipped_count": 0,
    "warning_count": 0,
    "success_rate": 0,
    "last_error_at": "1970-01-01T00:00:00.000Z",
    "breakdown": [
      {}
    ]
  },
  "outbound": {
    "total_events": 0,
    "success_count": 0,
    "error_count": 0,
    "pending_count": 0,
    "success_rate": 0,
    "last_error_at": "1970-01-01T00:00:00.000Z",
    "breakdown": [
      {}
    ]
  }
}
```

</details>

---

### `getMonitoringTimeSeries`

Get time-series aggregated event counts for monitoring charts.
Returns pre-bucketed counts at configurable intervals for both inbound and outbound events.
Maximum of 200 buckets per request. Returns 4

`POST /v1/integrations/{integrationId}/monitoring/timeseries`

```ts
const { data } = await client.getMonitoringTimeSeries(
  {
    integrationId: 'example',
  },
  {
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    interval: '1h',
    direction: 'both'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "interval": "5m",
  "from_date": "1970-01-01T00:00:00.000Z",
  "to_date": "1970-01-01T00:00:00.000Z",
  "buckets": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "inbound": {
        "success_count": 0,
        "error_count": 0,
        "warning_count": 0,
        "skipped_count": 0,
        "total_count": 0
      },
      "outbound": {
        "success_count": 0,
        "error_count": 0,
        "pending_count": 0,
        "total_count": 0
      }
    }
  ]
}
```

</details>

---

### `getOutboundStatus`

Get the status of all outbound use cases for a specific integration.
Returns conflict information when events or webhooks are disabled but the use case is enabled.

`GET /v1/integrations/{integrationId}/outbound-status`

```ts
const { data } = await client.getOutboundStatus({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "useCases": [
    {
      "useCaseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "useCaseEnabled": true,
      "eventCatalogEvent": "contract.created",
      "eventEnabled": true,
      "webhooks": [
        {
          "webhookId": "string",
          "webhookName": "string",
          "enabled": true
        }
      ],
      "status": "ok",
      "conflicts": [
        {
          "type": "event_disabled",
          "webhookId": "string",
          "message": "string"
        }
      ]
    }
  ]
}
```

</details>

---

### `queryAccessLogs`

Query API access logs for a specific integration's organization.
Returns access token usage analytics filtered by user_id (access token).
Supports infinite scroll pagination with cursor-based navigati

`POST /v1/integrations/{integrationId}/monitoring/access-logs`

```ts
const { data } = await client.queryAccessLogs(
  {
    integrationId: 'example',
  },
  {
    token_id: 'api_5ZugdRXasLfWBypHi93Fk',
    service: 'entity',
    method: 'GET',
    path: '/v1/entity',
    status: 200,
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    limit: 50,
    cursor: {
      timestamp: '1970-01-01T00:00:00.000Z',
      request_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "environment": "string",
      "service": "string",
      "request_id": "string",
      "method": "string",
      "path": "string",
      "status": 0,
      "response_latency_ms": 0,
      "response_length": 0,
      "token_id": "string",
      "org_id": "string",
      "origin": "string",
      "source_ip": "string"
    }
  ],
  "next_cursor": {
    "timestamp": "1970-01-01T00:00:00.000Z",
    "request_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `queryOutboundMonitoringEvents`

Query outbound monitoring events for a specific integration.
Returns detailed information about outbound event deliveries,
filtered by event_name (event_catalog_event) linked to the integration's outb

`POST /v1/integrations/{integrationId}/monitoring/outbound-events`

```ts
const { data } = await client.queryOutboundMonitoringEvents(
  {
    integrationId: 'example',
  },
  {
    event_name: 'automation_flow_target',
    status: 'succeeded',
    webhook_config_id: 'string',
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    limit: 50,
    cursor: {
      created_at: '1970-01-01T00:00:00.000Z',
      event_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "org_id": "string",
      "event_id": "string",
      "event_name": "string",
      "status": "succeeded",
      "url": "string",
      "http_method": "string",
      "http_response": {},
      "webhook_config_id": "string",
      "metadata": {},
      "execution_context": {},
      "payload": {},
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "event_id": "string"
  },
  "has_more": true
}
```

</details>

---

### `queryMonitoringEventsV2`

Query monitoring events from the unified erp_monitoring_v2 table.
Returns all event types (inbound, outbound, file_proxy, etc.) in a single list.
Replaces the separate v1 inbound-events and outbound-e

`POST /v2/integrations/{integrationId}/monitoring/events`

```ts
const { data } = await client.queryMonitoringEventsV2(
  {
    integrationId: 'example',
  },
  {
    use_case_id: 'string',
    use_case_type: 'inbound',
    level: 'success',
    code: 'string',
    event_id: 'string',
    correlation_id: 'string',
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    limit: 50,
    cursor: {
      created_at: '1970-01-01T00:00:00.000Z',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "integration_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "use_case_id": "string",
      "use_case_type": "inbound",
      "level": "success",
      "code": "string",
      "message": "string",
      "detail": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": {
    "created_at": "1970-01-01T00:00:00.000Z",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "has_more": true
}
```

</details>

---

### `getMonitoringStatsV2`

Get aggregated statistics from the unified erp_monitoring_v2 table.
Returns combined metrics for all event types with optional breakdowns.

`POST /v2/integrations/{integrationId}/monitoring/stats`

```ts
const { data } = await client.getMonitoringStatsV2(
  {
    integrationId: 'example',
  },
  {
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    use_case_type: 'inbound',
    group_by: 'use_case_id'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "total_events": 0,
  "success_count": 0,
  "error_count": 0,
  "warning_count": 0,
  "skipped_count": 0,
  "ack_timeout_count": 0,
  "success_rate": 0,
  "last_error_at": "1970-01-01T00:00:00.000Z",
  "breakdown": [
    {}
  ]
}
```

</details>

---

### `getMonitoringTimeSeriesV2`

Get time-series aggregated event counts from the unified erp_monitoring_v2 table.
Returns bucketed counts for chart rendering.

`POST /v2/integrations/{integrationId}/monitoring/time-series`

```ts
const { data } = await client.getMonitoringTimeSeriesV2(
  {
    integrationId: 'example',
  },
  {
    from_date: '2025-01-01T00:00:00Z',
    to_date: '2025-01-31T23:59:59Z',
    interval: '5m',
    use_case_type: 'inbound'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "interval": "5m",
  "from_date": "1970-01-01T00:00:00.000Z",
  "to_date": "1970-01-01T00:00:00.000Z",
  "buckets": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "success_count": 0,
      "error_count": 0,
      "warning_count": 0,
      "skipped_count": 0,
      "total_count": 0
    }
  ]
}
```

</details>

---

### `getAssociatedMonitoringEvents`

Returns all monitoring events sharing the same event_id, ordered chronologically.
Also includes the original inbound event payload from erp_incoming_events if available.
Used to display a full event t

`GET /v2/integrations/{integrationId}/monitoring/events/{eventId}/associated`

```ts
const { data } = await client.getAssociatedMonitoringEvents({
  integrationId: 'example',
  eventId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "monitoring_events": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "integration_id": "string",
      "event_id": "string",
      "correlation_id": "string",
      "use_case_id": "string",
      "use_case_type": "inbound",
      "level": "success",
      "code": "string",
      "message": "string",
      "detail": {},
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "inbound_event": {}
}
```

</details>

---

### `listSecureProxies`

List all secure proxy use cases

`GET /v1/integrations/secure-proxies`

```ts
const { data } = await client.listSecureProxies()
```

<details>
<summary>Response</summary>

```json
{
  "secure_proxies": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "slug": "string",
      "enabled": true,
      "vpc_mode": "static_ip",
      "allowed_domains": ["string"],
      "allowed_ips": ["string"],
      "integration_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "integration_name": "string"
    }
  ]
}
```

</details>

---

### `secureProxy`

Proxy HTTP request through secure VPC

`POST /v1/secure-proxy`

```ts
const { data } = await client.secureProxy(
  null,
  {
    integration_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    use_case_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    use_case_slug: 'string',
    url: 'https://example.com/path',
    method: 'GET',
    headers: {},
    body: {},
    response_type: 'json'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status_code": 0,
  "headers": {},
  "body": {}
}
```

</details>

---

### `managedCallExecute`

Execute a managed call operation

`POST /v1/managed-call/{slug}/execute`

```ts
const { data } = await client.managedCallExecute(
  {
    slug: 'example',
  },
  {
    integration_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    payload: {},
    correlation_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `generateTypesPreview`

Preview scaffolded types for a connector integration

`POST /v1/integrations/{integrationId}/generate-types-preview`

```ts
const { data } = await client.generateTypesPreview({
  integrationId: 'example',
})
```

---

### `generateTypes`

Generate a TypeScript npm package for a connector integration

`POST /v1/integrations/{integrationId}/generate-types`

```ts
const { data } = await client.generateTypes(
  {
    integrationId: 'example',
  },
  {
    package_name: '@epilot/hems-cleverpv',
    version: '1.0.0',
    description: 'string',
    domain_package: '@epilot/hems',
    domain_map_name: 'HemsUseCaseMap',
    annotations: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "package_name": "string",
  "version": "string",
  "files": {},
  "warnings": ["string"]
}
```

</details>

---

### `commitTypes`

Commit generated types and lock use case configurations

`POST /v1/integrations/{integrationId}/commit-types`

```ts
const { data } = await client.commitTypes(
  {
    integrationId: 'example',
  },
  {
    package_name: '@epilot/hems-cleverpv',
    version: '1.0.0',
    annotations: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "committed": true,
  "warnings": ["string"]
}
```

</details>

---

## Schemas

### `ErrorResponseBase`

```ts
type ErrorResponseBase = {
  code?: string
  message?: string
}
```

### `ErpEvent`

```ts
type ErpEvent = {
  event_type: "CREATE" | "UPDATE" | "DELETE"
  object_type: string
  timestamp: string // date-time
  format: "json" | "xml"
  payload: string | Record<string, unknown>
  deduplication_id?: string
}
```

### `ErpUpdatesEventsV2Request`

```ts
type ErpUpdatesEventsV2Request = {
  integration_id: string // uuid
  correlation_id?: string
  events: Array<{
    event_type: "CREATE" | "UPDATE" | "DELETE"
    object_type: string
    timestamp: string // date-time
    format: "json" | "xml"
    payload: string | Record<string, unknown>
    deduplication_id?: string
  }>
}
```

### `ErpEventV3`

```ts
type ErpEventV3 = unknown | unknown
```

### `ErpUpdatesEventsV3Request`

```ts
type ErpUpdatesEventsV3Request = {
  integration_id: string // uuid
  correlation_id?: string
  events: unknown | unknown[]
}
```

### `TriggerErpActionRequest`

```ts
type TriggerErpActionRequest = {
  execution_id: string
  org_id: string
  webhook_id: string
  flow_id: string
  created_at: string // date-time
  action_id: string
  flow_action_id: string
  flow_name: string
  activity_id: string
  entity_id: string
}
```

### `TriggerWebhookResp`

```ts
type TriggerWebhookResp = {
  status_code?: string
  message?: string
  body?: object
  code?: string
  status?: "succeeded" | "failed"
  start_date?: string
  end_date?: string
  event_id?: string
}
```

### `IntegrationEditableFields`

```ts
type IntegrationEditableFields = {
  name?: string
  description?: string
  access_token_ids?: string[]
  app_ids?: string[]
  environment_config?: Array<{
    key: string
    label: string
    type: "String" | "SecretString"
    description?: string
    required?: boolean
    order?: number
  }>
  settings?: {
    autoRefresh?: {
      enabled?: { ... }
      freshnessThresholdMinutes?: { ... }
    }
  }
  integration_type?: "erp" | "connector"
  connector_config?: {
    base_url?: string
    auth?: {
      type?: { ... }
      token_url?: { ... }
      client_id?: { ... }
      client_secret?: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
      api_key_header?: { ... }
      api_key?: { ... }
      token?: { ... }
    }
    types_versions?: Array<{
      version: { ... }
      package_name: { ... }
      generated_at: { ... }
      generated_by: { ... }
      status: { ... }
    }>
    latest_types_version?: string
    latest_types_package_name?: string
  }
  protected?: boolean
}
```

### `ConnectorConfig`

Shared configuration for connector-type integrations

```ts
type ConnectorConfig = {
  base_url?: string
  auth?: {
    type?: "oauth2_client_credentials" | "api_key" | "bearer"
    token_url?: string
    client_id?: string
    client_secret?: string
    scope?: string
    audience?: string
    resource?: string
    body_params?: Record<string, string>
    headers?: Record<string, string>
    query_params?: Record<string, string>
    api_key_header?: string
    api_key?: string
    token?: string
  }
  types_versions?: Array<{
    version: string
    package_name: string
    generated_at: string // date-time
    generated_by: string
    status: "active" | "deprecated"
  }>
  latest_types_version?: string
  latest_types_package_name?: string
}
```

### `ManagedCallAuth`

Authentication configuration for managed call requests

```ts
type ManagedCallAuth = {
  type?: "oauth2_client_credentials" | "api_key" | "bearer"
  token_url?: string
  client_id?: string
  client_secret?: string
  scope?: string
  audience?: string
  resource?: string
  body_params?: Record<string, string>
  headers?: Record<string, string>
  query_params?: Record<string, string>
  api_key_header?: string
  api_key?: string
  token?: string
}
```

### `Integration`

```ts
type Integration = {
  id: string // uuid
  orgId: string
  created_at: string // date-time
  updated_at: string // date-time
  name: string
  description?: string
  access_token_ids?: string[]
  app_ids?: string[]
  environment_config?: Array<{
    key: string
    label: string
    type: "String" | "SecretString"
    description?: string
    required?: boolean
    order?: number
  }>
  settings?: {
    autoRefresh?: {
      enabled?: { ... }
      freshnessThresholdMinutes?: { ... }
    }
  }
  integration_type?: "erp" | "connector"
  connector_config?: {
    base_url?: string
    auth?: {
      type?: { ... }
      token_url?: { ... }
      client_id?: { ... }
      client_secret?: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
      api_key_header?: { ... }
      api_key?: { ... }
      token?: { ... }
    }
    types_versions?: Array<{
      version: { ... }
      package_name: { ... }
      generated_at: { ... }
      generated_by: { ... }
      status: { ... }
    }>
    latest_types_version?: string
    latest_types_package_name?: string
  }
  protected?: boolean
}
```

### `CreateIntegrationRequest`

```ts
type CreateIntegrationRequest = {
  name: string
  description?: string
  access_token_ids?: string[]
  app_ids?: string[]
  environment_config?: Array<{
    key: string
    label: string
    type: "String" | "SecretString"
    description?: string
    required?: boolean
    order?: number
  }>
  settings?: {
    autoRefresh?: {
      enabled?: { ... }
      freshnessThresholdMinutes?: { ... }
    }
  }
  integration_type?: "erp" | "connector"
  connector_config?: {
    base_url?: string
    auth?: {
      type?: { ... }
      token_url?: { ... }
      client_id?: { ... }
      client_secret?: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
      api_key_header?: { ... }
      api_key?: { ... }
      token?: { ... }
    }
    types_versions?: Array<{
      version: { ... }
      package_name: { ... }
      generated_at: { ... }
      generated_by: { ... }
      status: { ... }
    }>
    latest_types_version?: string
    latest_types_package_name?: string
  }
  protected?: boolean
}
```

### `UpdateIntegrationRequest`

```ts
type UpdateIntegrationRequest = {
  name?: string
  description?: string
  access_token_ids?: string[]
  app_ids?: string[]
  environment_config?: Array<{
    key: string
    label: string
    type: "String" | "SecretString"
    description?: string
    required?: boolean
    order?: number
  }>
  settings?: {
    autoRefresh?: {
      enabled?: { ... }
      freshnessThresholdMinutes?: { ... }
    }
  }
  integration_type?: "erp" | "connector"
  connector_config?: {
    base_url?: string
    auth?: {
      type?: { ... }
      token_url?: { ... }
      client_id?: { ... }
      client_secret?: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
      api_key_header?: { ... }
      api_key?: { ... }
      token?: { ... }
    }
    types_versions?: Array<{
      version: { ... }
      package_name: { ... }
      generated_at: { ... }
      generated_by: { ... }
      status: { ... }
    }>
    latest_types_version?: string
    latest_types_package_name?: string
  }
  protected?: boolean
}
```

### `EnvironmentFieldConfig`

```ts
type EnvironmentFieldConfig = {
  key: string
  label: string
  type: "String" | "SecretString"
  description?: string
  required?: boolean
  order?: number
}
```

### `IntegrationSettings`

Settings for the integration

```ts
type IntegrationSettings = {
  autoRefresh?: {
    enabled?: boolean
    freshnessThresholdMinutes?: number
  }
}
```

### `AutoRefreshSettings`

Auto-refresh settings for keeping integration data fresh

```ts
type AutoRefreshSettings = {
  enabled?: boolean
  freshnessThresholdMinutes?: number
}
```

### `SetIntegrationAppMappingRequest`

```ts
type SetIntegrationAppMappingRequest = {
  app_id: string // uuid
  component_id: string // uuid
  overwrite?: boolean
}
```

### `DeleteIntegrationAppMappingRequest`

```ts
type DeleteIntegrationAppMappingRequest = {
  app_id: string // uuid
  component_id: string // uuid
}
```

### `IntegrationAppMapping`

```ts
type IntegrationAppMapping = {
  integration_id: string // uuid
}
```

### `IntegrationWithUseCases`

```ts
type IntegrationWithUseCases = {
  use_cases: Array<{
    id: string // uuid
    integrationId: string // uuid
    name: string
    slug?: string
    type: "inbound"
    enabled: boolean
    change_description?: string
    created_at: string // date-time
    updated_at: string // date-time
    configuration?: {
      entities?: { ... }
      meter_readings?: { ... }
    }
  } | {
    id: string // uuid
    integrationId: string // uuid
    name: string
    slug?: string
    type: "outbound"
    enabled: boolean
    change_description?: string
    created_at: string // date-time
    updated_at: string // date-time
    configuration?: {
      event_catalog_event: { ... }
      mappings: { ... }
    }
  } | {
    id: string // uuid
    integrationId: string // uuid
    name: string
    slug?: string
    type: "file_proxy"
    enabled: boolean
    change_description?: string
    created_at: string // date-time
    updated_at: string // date-time
    configuration?: {
      secure_proxy?: { ... }
      auth?: { ... }
      params?: { ... }
      steps: { ... }
      response: { ... }
    }
  } | {
    id: string // uuid
    integrationId: string // uuid
    name: string
    slug?: string
    type: "managed_call"
    enabled: boolean
    change_description?: string
    created_at: string // date-time
    updated_at: string // date-time
    configuration?: {
      operation: { ... }
      request_mapping?: { ... }
      response_mapping?: { ... }
      inbound_use_case_slug?: { ... }
    }
    type_annotations?: {
      request?: { ... }
      response?: { ... }
    }
    types_locked?: boolean
  } | {
    id: string // uuid
    integrationId: string // uuid
    name: string
    slug?: string
    type: "secure_proxy"
    enabled: boolean
    change_description?: string
    created_at: string // date-time
    updated_at: string // date-time
    configuration?: {
      vpc_mode: { ... }
      allowed_domains?: { ... }
      allowed_ips?: { ... }
    }
  }>
}
```

### `UpsertIntegrationWithUseCasesRequest`

```ts
type UpsertIntegrationWithUseCasesRequest = {
  name: string
  description?: string
  access_token_ids?: string[]
  app_ids?: string[]
  environment_config?: Array<{
    key: string
    label: string
    type: "String" | "SecretString"
    description?: string
    required?: boolean
    order?: number
  }>
  settings?: {
    autoRefresh?: {
      enabled?: { ... }
      freshnessThresholdMinutes?: { ... }
    }
  }
  integration_type?: "erp" | "connector"
  connector_config?: {
    base_url?: string
    auth?: {
      type?: { ... }
      token_url?: { ... }
      client_id?: { ... }
      client_secret?: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
      api_key_header?: { ... }
      api_key?: { ... }
      token?: { ... }
    }
    types_versions?: Array<{
      version: { ... }
      package_name: { ... }
      generated_at: { ... }
      generated_by: { ... }
      status: { ... }
    }>
    latest_types_version?: string
    latest_types_package_name?: string
  }
  protected?: boolean
  use_cases?: Array<{
    id?: string // uuid
    name: string
    slug?: string
    enabled: boolean
    change_description?: string
    type: "inbound"
    configuration?: {
      entities?: { ... }
      meter_readings?: { ... }
    }
  } | {
    id?: string // uuid
    name: string
    slug?: string
    enabled: boolean
    change_description?: string
    type: "outbound"
    configuration?: {
      event_catalog_event: { ... }
      mappings: { ... }
    }
  } | {
    id?: string // uuid
    name: string
    slug?: string
    enabled: boolean
    change_description?: string
    type: "file_proxy"
    configuration?: {
      secure_proxy?: { ... }
      auth?: { ... }
      params?: { ... }
      steps: { ... }
      response: { ... }
    }
  } | {
    id?: string // uuid
    name: string
    slug?: string
    enabled: boolean
    change_description?: string
    type: "managed_call"
    configuration?: {
      operation: { ... }
      request_mapping?: { ... }
      response_mapping?: { ... }
      inbound_use_case_slug?: { ... }
    }
  } | {
    id?: string // uuid
    name: string
  // ...
}
```

### `InboundIntegrationEventConfiguration`

Configuration for inbound use cases (ERP to epilot)

```ts
type InboundIntegrationEventConfiguration = {
  entities?: Array<{
    entity_schema: string
    unique_ids: string[]
    jsonataExpression?: string
    enabled?: boolean | string
    mode?: "upsert" | "delete" | "purge" | "upsert-prune-scope-purge" | "upsert-prune-scope-delete"
    scope?: {
      scope_mode: { ... }
      schema?: { ... }
      unique_ids?: { ... }
      query?: { ... }
    }
    fields: Array<{
      attribute: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
      _type?: { ... }
      enabled?: { ... }
      relations?: { ... }
      relation_refs?: { ... }
      file_proxy_url?: { ... }
    }>
  }>
  meter_readings?: Array<{
    jsonataExpression?: string
    reading_matching?: "external_id" | "strict-date"
    mode?: "upsert" | "delete" | "upsert-prune-scope"
    scope?: {
      source?: { ... }
    }
    meter: {
      unique_ids: { ... }
    }
    meter_counter?: {
      unique_ids: { ... }
    }
    fields: Array<{
      attribute: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
      _type?: { ... }
      enabled?: { ... }
      relations?: { ... }
      relation_refs?: { ... }
      file_proxy_url?: { ... }
    }>
  }>
}
```

### `OutboundIntegrationEventConfiguration`

Configuration for outbound use cases. Defines the event that triggers the flow and the webhook mappings.

```ts
type OutboundIntegrationEventConfiguration = {
  event_catalog_event: string
  mappings: Array<{
    id?: string // uuid
    name: string
    jsonata_expression: string
    enabled: boolean
    delivery: {
      type: { ... }
      webhook_id: { ... }
      webhook_name?: { ... }
      webhook_url?: { ... }
    }
    created_at?: string // date-time
    updated_at?: string // date-time
  }>
}
```

### `IntegrationEntity`

```ts
type IntegrationEntity = {
  entity_schema: string
  unique_ids: string[]
  jsonataExpression?: string
  enabled?: boolean | string
  mode?: "upsert" | "delete" | "purge" | "upsert-prune-scope-purge" | "upsert-prune-scope-delete"
  scope?: {
    scope_mode: "relations" | "query"
    schema?: string
    unique_ids?: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
    query?: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
  }
  fields: Array<{
    attribute: string
    field?: string
    jsonataExpression?: string
    constant?: unknown
    _type?: "email" | "phone"
    enabled?: boolean | string
    relations?: {
      operation: { ... }
      items?: { ... }
      jsonataExpression?: { ... }
    }
    relation_refs?: {
      operation: { ... }
      items?: { ... }
      jsonataExpression?: { ... }
    }
    file_proxy_url?: {
      use_case_slug: { ... }
      params?: { ... }
    } | {
      use_case_id: { ... }
      params?: { ... }
    }
  }>
}
```

### `IntegrationMeterReading`

```ts
type IntegrationMeterReading = {
  jsonataExpression?: string
  reading_matching?: "external_id" | "strict-date"
  mode?: "upsert" | "delete" | "upsert-prune-scope"
  scope?: {
    source?: string
  }
  meter: {
    unique_ids: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
  }
  meter_counter?: {
    unique_ids: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
  }
  fields: Array<{
    attribute: string
    field?: string
    jsonataExpression?: string
    constant?: unknown
    _type?: "email" | "phone"
    enabled?: boolean | string
    relations?: {
      operation: { ... }
      items?: { ... }
      jsonataExpression?: { ... }
    }
    relation_refs?: {
      operation: { ... }
      items?: { ... }
      jsonataExpression?: { ... }
    }
    file_proxy_url?: {
      use_case_slug: { ... }
      params?: { ... }
    } | {
      use_case_id: { ... }
      params?: { ... }
    }
  }>
}
```

### `PruneScopeConfig`

Scope configuration for upsert-prune-scope modes.
Defines how to find entities that should be pruned if not in the upsert payload.
The scope is resolved against the original event payload (not individual array items).


```ts
type PruneScopeConfig = {
  scope_mode: "relations" | "query"
  schema?: string
  unique_ids?: Array<{
    attribute: string
    _type?: "email" | "phone"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }>
  query?: Array<{
    attribute: string
    _type?: "email" | "phone"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }>
}
```

### `MeterReadingPruneScopeConfig`

Scope configuration for meter reading upsert-prune-scope mode.
The scope is all readings for the same meter + counter.


```ts
type MeterReadingPruneScopeConfig = {
  source?: string
}
```

### `MeterUniqueIdsConfig`

```ts
type MeterUniqueIdsConfig = {
  unique_ids: Array<{
    attribute: string
    _type?: "email" | "phone"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }>
}
```

### `IntegrationEntityField`

```ts
type IntegrationEntityField = {
  attribute: string
  field?: string
  jsonataExpression?: string
  constant?: unknown
  _type?: "email" | "phone"
  enabled?: boolean | string
  relations?: {
    operation: "_set" | "_append" | "_append_all"
    items?: Array<{
      entity_schema: { ... }
      _tags?: { ... }
      unique_ids: { ... }
    }>
    jsonataExpression?: string
  }
  relation_refs?: {
    operation: "_set" | "_append" | "_append_all"
    items?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      path: { ... }
      value: { ... }
    }>
    jsonataExpression?: string
  }
  file_proxy_url?: {
    use_case_slug: string
    params?: Record<string, {
      field: { ... }
    } | {
      constant: { ... }
    } | {
      jsonataExpression: { ... }
    }>
  } | {
    use_case_id: string
    params?: Record<string, {
      field: { ... }
    } | {
      constant: { ... }
    } | {
      jsonataExpression: { ... }
    }>
  }
}
```

### `FileProxyUrlParam`

Parameter for file proxy URL. Exactly one of field, constant, or jsonataExpression must be set.

```ts
type FileProxyUrlParam = {
  field: string
} | {
  constant: unknown
} | {
  jsonataExpression: string
}
```

### `FileProxyUrlParams`

Custom query parameters. Keys become URL param names, values resolved from payload.

```ts
type FileProxyUrlParams = Record<string, {
  field: string
} | {
  constant: unknown
} | {
  jsonataExpression: string
}>
```

### `FileProxyUrlConfig`

Auto-constructs a file proxy download URL. orgId and integrationId are injected from context. Exactly one of use_case_id or use_case_slug must be provided. Using use_case_slug is recommended as it is portable across environments.


```ts
type FileProxyUrlConfig = {
  use_case_slug: string
  params?: Record<string, {
    field: string
  } | {
    constant: unknown
  } | {
    jsonataExpression: string
  }>
} | {
  use_case_id: string
  params?: Record<string, {
    field: string
  } | {
    constant: unknown
  } | {
    jsonataExpression: string
  }>
}
```

### `EmbeddedUseCaseRequest`

```ts
type EmbeddedUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
} | {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
} | {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
} | {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
  // ...
}
```

### `EmbeddedUseCaseRequestBase`

```ts
type EmbeddedUseCaseRequestBase = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
}
```

### `EmbeddedInboundUseCaseRequest`

```ts
type EmbeddedInboundUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
}
```

### `EmbeddedOutboundUseCaseRequest`

```ts
type EmbeddedOutboundUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `EmbeddedFileProxyUseCaseRequest`

```ts
type EmbeddedFileProxyUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
}
```

### `EmbeddedManagedCallUseCaseRequest`

```ts
type EmbeddedManagedCallUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
}
```

### `EmbeddedSecureProxyUseCaseRequest`

```ts
type EmbeddedSecureProxyUseCaseRequest = {
  id?: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  type: "secure_proxy"
  configuration?: {
    vpc_mode: "static_ip" | "secure_link"
    allowed_domains?: string[]
    allowed_ips?: string[]
  }
}
```

### `UseCaseBase`

```ts
type UseCaseBase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "inbound" | "outbound" | "file_proxy" | "managed_call" | "secure_proxy"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `InboundUseCase`

```ts
type InboundUseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "inbound"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
}
```

### `OutboundUseCase`

```ts
type OutboundUseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "outbound"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `FileProxyUseCase`

```ts
type FileProxyUseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "file_proxy"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
}
```

### `ManagedCallUseCase`

```ts
type ManagedCallUseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "managed_call"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
  type_annotations?: {
    request?: Record<string, string>
    response?: Record<string, string>
  }
  types_locked?: boolean
}
```

### `SecureProxyUseCase`

```ts
type SecureProxyUseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "secure_proxy"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    vpc_mode: "static_ip" | "secure_link"
    allowed_domains?: string[]
    allowed_ips?: string[]
  }
}
```

### `UseCase`

```ts
type UseCase = {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "inbound"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
} | {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "outbound"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
} | {
  id: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  type: "file_proxy"
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
} | {
  // ...
}
```

### `CreateUseCaseRequest`

```ts
type CreateUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
} | {
  name: string
  slug?: string
  enabled: boolean
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
} | {
  name: string
  slug?: string
  enabled: boolean
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
} | {
  name: string
  slug?: string
  enabled: boolean
  type: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
  // ...
}
```

### `CreateUseCaseRequestBase`

```ts
type CreateUseCaseRequestBase = {
  name: string
  slug?: string
  enabled: boolean
}
```

### `CreateInboundUseCaseRequest`

```ts
type CreateInboundUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
}
```

### `CreateOutboundUseCaseRequest`

```ts
type CreateOutboundUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `CreateFileProxyUseCaseRequest`

```ts
type CreateFileProxyUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
}
```

### `CreateManagedCallUseCaseRequest`

```ts
type CreateManagedCallUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
}
```

### `CreateSecureProxyUseCaseRequest`

```ts
type CreateSecureProxyUseCaseRequest = {
  name: string
  slug?: string
  enabled: boolean
  type: "secure_proxy"
  configuration?: {
    vpc_mode: "static_ip" | "secure_link"
    allowed_domains?: string[]
    allowed_ips?: string[]
  }
}
```

### `UpdateUseCaseRequest`

```ts
type UpdateUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
} | {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
} | {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
} | {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
  // ...
}
```

### `UpdateUseCaseRequestBase`

```ts
type UpdateUseCaseRequestBase = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
}
```

### `UpdateInboundUseCaseRequest`

```ts
type UpdateInboundUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
}
```

### `UpdateOutboundUseCaseRequest`

```ts
type UpdateOutboundUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `UpdateFileProxyUseCaseRequest`

```ts
type UpdateFileProxyUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
}
```

### `UpdateManagedCallUseCaseRequest`

```ts
type UpdateManagedCallUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
  type_annotations?: {
    request?: Record<string, string>
    response?: Record<string, string>
  }
}
```

### `UpdateSecureProxyUseCaseRequest`

```ts
type UpdateSecureProxyUseCaseRequest = {
  name?: string
  slug?: string
  enabled?: boolean
  change_description?: string
  type?: "secure_proxy"
  configuration?: {
    vpc_mode: "static_ip" | "secure_link"
    allowed_domains?: string[]
    allowed_ips?: string[]
  }
}
```

### `UseCaseHistoryEntry`

```ts
type UseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
} | {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
} | {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
  // ...
}
```

### `UseCaseHistoryEntryBase`

```ts
type UseCaseHistoryEntryBase = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
}
```

### `InboundUseCaseHistoryEntry`

```ts
type InboundUseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "inbound"
  configuration?: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
}
```

### `OutboundUseCaseHistoryEntry`

```ts
type OutboundUseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "outbound"
  configuration?: {
    event_catalog_event: string
    mappings: Array<{
      id?: { ... }
      name: { ... }
      jsonata_expression: { ... }
      enabled: { ... }
      delivery: { ... }
      created_at?: { ... }
      updated_at?: { ... }
    }>
  }
}
```

### `FileProxyUseCaseHistoryEntry`

```ts
type FileProxyUseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "file_proxy"
  configuration?: {
    secure_proxy?: {
      use_case_slug: { ... }
    }
    auth?: {
      type: { ... }
      token_url: { ... }
      client_id: { ... }
      client_secret: { ... }
      scope?: { ... }
      audience?: { ... }
      resource?: { ... }
      username?: { ... }
      password?: { ... }
      body_params?: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    params?: Array<{
      name: { ... }
      required: { ... }
      description?: { ... }
    }>
    steps: Array<{
      url: { ... }
      method: { ... }
      headers?: { ... }
      body?: { ... }
      response_type: { ... }
    }>
    response: {
      body: { ... }
      encoding: { ... }
      filename?: { ... }
      content_type?: { ... }
    }
  }
}
```

### `ManagedCallUseCaseHistoryEntry`

```ts
type ManagedCallUseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "managed_call"
  configuration?: {
    operation: {
      method: { ... }
      path: { ... }
      headers?: { ... }
      query_params?: { ... }
    }
    request_mapping?: string
    response_mapping?: string
    inbound_use_case_slug?: string
  }
  type_annotations?: {
    request?: Record<string, string>
    response?: Record<string, string>
  }
  types_locked?: boolean
}
```

### `SecureProxyUseCaseHistoryEntry`

```ts
type SecureProxyUseCaseHistoryEntry = {
  id: string // uuid
  useCaseId: string // uuid
  integrationId: string // uuid
  name: string
  slug?: string
  enabled: boolean
  change_description?: string
  created_at: string // date-time
  updated_at: string // date-time
  history_created_at: string // date-time
  type: "secure_proxy"
  configuration?: {
    vpc_mode: "static_ip" | "secure_link"
    allowed_domains?: string[]
    allowed_ips?: string[]
  }
}
```

### `SecureProxyUseCaseConfiguration`

Configuration for secure_proxy use cases. Defines how to route requests through a secure VPC.


```ts
type SecureProxyUseCaseConfiguration = {
  vpc_mode: "static_ip" | "secure_link"
  allowed_domains?: string[]
  allowed_ips?: string[]
}
```

### `SecureProxySummary`

```ts
type SecureProxySummary = {
  id: string // uuid
  name: string
  slug?: string
  enabled: boolean
  vpc_mode: "static_ip" | "secure_link"
  allowed_domains?: string[]
  allowed_ips?: string[]
  integration_id: string // uuid
  integration_name: string
}
```

### `SecureProxyRequest`

```ts
type SecureProxyRequest = {
  integration_id: string // uuid
  use_case_id?: string // uuid
  use_case_slug?: string
  url: string // uri
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  headers?: Record<string, string>
  body?: unknown
  response_type?: "json" | "binary"
}
```

### `SecureProxyResponse`

```ts
type SecureProxyResponse = {
  status_code?: number
  headers?: Record<string, string>
  body?: unknown
}
```

### `ManagedCallOperationConfig`

Configuration for managed_call use cases. Defines a single API operation with JSONata mapping.

```ts
type ManagedCallOperationConfig = {
  operation: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    path: string
    headers?: Record<string, string>
    query_params?: Record<string, string>
  }
  request_mapping?: string
  response_mapping?: string
  inbound_use_case_slug?: string
}
```

### `ManagedCallOperation`

HTTP operation configuration for managed calls

```ts
type ManagedCallOperation = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  path: string
  headers?: Record<string, string>
  query_params?: Record<string, string>
}
```

### `ManagedCallExecuteRequest`

```ts
type ManagedCallExecuteRequest = {
  integration_id: string // uuid
  payload?: Record<string, unknown>
  correlation_id?: string
}
```

### `ManagedCallExecuteResponse`

The response from a managed call execution.
On success, returns the JSONata-mapped response data directly (no wrapper).
The shape is entirely defined by your response_mapping JSONata expression.
If no response_mapping is configured, returns the raw external API response.
Check the X-Inbound-Event-Id

```ts
type ManagedCallExecuteResponse = unknown
```

### `ManagedCallErrorResponse`

```ts
type ManagedCallErrorResponse = {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}
```

### `TypeAnnotations`

Developer-provided type annotations for a use case's request and response fields

```ts
type TypeAnnotations = {
  request?: Record<string, string>
  response?: Record<string, string>
}
```

### `TypeDescriptor`

Describes the inferred type shape of a JSONata expression

```ts
type TypeDescriptor = {
  kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
  properties?: Record<string, {
    kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
    properties?: Record<string, {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
    items?: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    source?: string
    variants?: Array<{
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
  }>
  items?: {
    kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
    properties?: Record<string, {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
    items?: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    source?: string
    variants?: Array<{
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
  }
  source?: string
  variants?: Array<{
    kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
    properties?: Record<string, {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
    items?: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    source?: string
    variants?: Array<{
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
  }>
}
```

### `UseCaseTypePreview`

Scaffolded type descriptors for a single use case

```ts
type UseCaseTypePreview = {
  slug: string
  name?: string
  request_shape: {
    kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
    properties?: Record<string, {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
    items?: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    source?: string
    variants?: Array<{
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
  }
  response_shape: {
    kind: "object" | "array" | "string" | "number" | "boolean" | "null" | "unknown" | "union"
    properties?: Record<string, {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
    items?: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    source?: string
    variants?: Array<{
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }>
  }
  existing_annotations?: {
    request?: Record<string, string>
    response?: Record<string, string>
  }
}
```

### `GenerateTypesPreviewResponse`

```ts
type GenerateTypesPreviewResponse = {
  integration_name?: string
  use_cases: Array<{
    slug: string
    name?: string
    request_shape: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    response_shape: {
      kind: { ... }
      properties?: { ... }
      items?: { ... }
      source?: { ... }
      variants?: { ... }
    }
    existing_annotations?: {
      request?: { ... }
      response?: { ... }
    }
  }>
  previous_version?: string
  suggested_version?: string
  suggested_bump?: "major" | "minor"
  detected_changes?: Array<{
    slug: string
    field: string
    type: "breaking" | "non-breaking"
    description: string
  }>
}
```

### `GenerateTypesRequest`

```ts
type GenerateTypesRequest = {
  package_name: string
  version: string
  description?: string
  domain_package?: string
  domain_map_name?: string
  annotations?: Record<string, {
    request?: Record<string, string>
    response?: Record<string, string>
  }>
}
```

### `GenerateTypesResponse`

```ts
type GenerateTypesResponse = {
  package_name: string
  version: string
  files: Record<string, string>
  warnings?: string[]
}
```

### `CommitTypesRequest`

```ts
type CommitTypesRequest = {
  package_name: string
  version: string
  annotations?: Record<string, {
    request?: Record<string, string>
    response?: Record<string, string>
  }>
}
```

### `CommitTypesResponse`

```ts
type CommitTypesResponse = {
  committed: boolean
  warnings?: string[]
}
```

### `FileProxyUseCaseConfiguration`

Configuration for file_proxy use cases. Defines how to authenticate and fetch files from external document systems.

The file proxy download URL always requires `orgId`, `integrationId`, and either `useCaseSlug` (recommended) or `useCaseId` (legacy UUID) as query parameters.
The `orgId` is included 

```ts
type FileProxyUseCaseConfiguration = {
  secure_proxy?: {
    use_case_slug: string
  }
  auth?: {
    type: "oauth2_client_credentials" | "oauth2_password"
    token_url: string
    client_id: string
    client_secret: string
    scope?: string
    audience?: string
    resource?: string
    username?: string
    password?: string
    body_params?: Record<string, string>
    headers?: Record<string, string>
    query_params?: Record<string, string>
  }
  params?: Array<{
    name: string
    required: boolean
    description?: string
  }>
  steps: Array<{
    url: string
    method: "GET" | "POST"
    headers?: Record<string, string>
    body?: string
    response_type: "json" | "binary"
  }>
  response: {
    body: string
    encoding: "base64" | "binary"
    filename?: string
    content_type?: string
  }
}
```

### `FileProxySecureProxyAttachment`

```ts
type FileProxySecureProxyAttachment = {
  use_case_slug: string
}
```

### `FileProxyAuth`

```ts
type FileProxyAuth = {
  type: "oauth2_client_credentials" | "oauth2_password"
  token_url: string
  client_id: string
  client_secret: string
  scope?: string
  audience?: string
  resource?: string
  username?: string
  password?: string
  body_params?: Record<string, string>
  headers?: Record<string, string>
  query_params?: Record<string, string>
}
```

### `FileProxyParam`

```ts
type FileProxyParam = {
  name: string
  required: boolean
  description?: string
}
```

### `FileProxyStep`

```ts
type FileProxyStep = {
  url: string
  method: "GET" | "POST"
  headers?: Record<string, string>
  body?: string
  response_type: "json" | "binary"
}
```

### `FileProxyResponseConfig`

```ts
type FileProxyResponseConfig = {
  body: string
  encoding: "base64" | "binary"
  filename?: string
  content_type?: string
}
```

### `MappingSimulationRequest`

```ts
type MappingSimulationRequest = {
  mapping_configuration: {
    version?: "1.0"
    mapping: {
      objects: { ... }
    }
  } | {
    version: "2.0"
    mapping: {
      events: { ... }
    }
  }
  object_type: string
  format: "json" | "xml"
  payload: string | Record<string, unknown>
}
```

### `MappingSimulationV2Request`

Request for v2 mapping simulation. Uses the same configuration format stored in integration use case resources,
making it easier to test configurations before saving them.


```ts
type MappingSimulationV2Request = {
  event_configuration: {
    entities?: Array<{
      entity_schema: { ... }
      unique_ids: { ... }
      jsonataExpression?: { ... }
      enabled?: { ... }
      mode?: { ... }
      scope?: { ... }
      fields: { ... }
    }>
    meter_readings?: Array<{
      jsonataExpression?: { ... }
      reading_matching?: { ... }
      mode?: { ... }
      scope?: { ... }
      meter: { ... }
      meter_counter?: { ... }
      fields: { ... }
    }>
  }
  format: "json" | "xml"
  payload: string | Record<string, unknown>
}
```

### `MappingSimulationResponse`

```ts
type MappingSimulationResponse = {
  entity_updates: Array<{
    entity_slug: string
    unique_identifiers: Record<string, unknown>
    attributes: Record<string, unknown>
  }>
  meter_readings_updates?: Array<{
    meter: {
      $entity_unique_ids: { ... }
    }
    meter_counter?: {
      $entity_unique_ids?: { ... }
    }
    attributes: Record<string, unknown>
  }>
  warnings?: Array<{
    entity_schema: string
    field: string
    message: string
  }>
}
```

### `MappingSimulationWarning`

```ts
type MappingSimulationWarning = {
  entity_schema: string
  field: string
  message: string
}
```

### `EntityUpdate`

```ts
type EntityUpdate = {
  entity_slug: string
  unique_identifiers: Record<string, unknown>
  attributes: Record<string, unknown>
}
```

### `MeterReadingUpdate`

```ts
type MeterReadingUpdate = {
  meter: {
    $entity_unique_ids: Record<string, unknown>
  }
  meter_counter?: {
    $entity_unique_ids?: Record<string, unknown>
  }
  attributes: Record<string, unknown>
}
```

### `IntegrationConfigurationV1`

```ts
type IntegrationConfigurationV1 = {
  version?: "1.0"
  mapping: {
    objects: Record<string, {
      unique_ids: { ... }
      fields: { ... }
    }>
  }
}
```

### `IntegrationObjectV1`

```ts
type IntegrationObjectV1 = {
  unique_ids: Record<string, string[] | Record<string, string>>
  fields: Array<{
    entity: string
    attribute: string
    field?: string
    jsonataExpression?: string
  }>
}
```

### `IntegrationFieldV1`

```ts
type IntegrationFieldV1 = {
  entity: string
  attribute: string
  field?: string
  jsonataExpression?: string
}
```

### `IntegrationConfigurationV2`

```ts
type IntegrationConfigurationV2 = {
  version: "2.0"
  mapping: {
    events: Record<string, {
      entities?: { ... }
      meter_readings?: { ... }
    }>
  }
}
```

### `OutboundMapping`

A mapping that transforms an event and delivers it to a webhook

```ts
type OutboundMapping = {
  id?: string // uuid
  name: string
  jsonata_expression: string
  enabled: boolean
  delivery: {
    type: "webhook"
    webhook_id: string
    webhook_name?: string
    webhook_url?: string
  }
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `DeliveryConfig`

Configuration for how the transformed event should be delivered

```ts
type DeliveryConfig = {
  type: "webhook"
  webhook_id: string
  webhook_name?: string
  webhook_url?: string
}
```

### `OutboundStatusResponse`

```ts
type OutboundStatusResponse = {
  useCases: Array<{
    useCaseId: string // uuid
    name: string
    useCaseEnabled: boolean
    eventCatalogEvent?: string
    eventEnabled?: boolean
    webhooks?: Array<{
      webhookId: { ... }
      webhookName?: { ... }
      enabled?: { ... }
    }>
    status: "ok" | "conflict" | "disabled"
    conflicts?: Array<{
      type: { ... }
      webhookId?: { ... }
      message: { ... }
    }>
  }>
}
```

### `OutboundUseCaseStatus`

```ts
type OutboundUseCaseStatus = {
  useCaseId: string // uuid
  name: string
  useCaseEnabled: boolean
  eventCatalogEvent?: string
  eventEnabled?: boolean
  webhooks?: Array<{
    webhookId: string
    webhookName?: string
    enabled?: boolean
  }>
  status: "ok" | "conflict" | "disabled"
  conflicts?: Array<{
    type: "event_disabled" | "all_webhooks_disabled" | "event_enabled_while_disabled" | "webhook_enabled_while_disabled"
    webhookId?: string
    message: string
  }>
}
```

### `WebhookStatus`

```ts
type WebhookStatus = {
  webhookId: string
  webhookName?: string
  enabled?: boolean
}
```

### `OutboundConflict`

```ts
type OutboundConflict = {
  type: "event_disabled" | "all_webhooks_disabled" | "event_enabled_while_disabled" | "webhook_enabled_while_disabled"
  webhookId?: string
  message: string
}
```

### `RelationConfig`

```ts
type RelationConfig = {
  operation: "_set" | "_append" | "_append_all"
  items?: Array<{
    entity_schema: string
    _tags?: string[]
    unique_ids: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
  }>
  jsonataExpression?: string
}
```

### `RelationItemConfig`

```ts
type RelationItemConfig = {
  entity_schema: string
  _tags?: string[]
  unique_ids: Array<{
    attribute: string
    _type?: "email" | "phone"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }>
}
```

### `RelationUniqueIdField`

```ts
type RelationUniqueIdField = {
  attribute: string
  _type?: "email" | "phone"
  field?: string
  jsonataExpression?: string
  constant?: unknown
}
```

### `RelationRefsConfig`

Configuration for relation references ($relation_ref).
Relation references link to a specific item within a repeatable attribute on a related entity.
Common use case: referencing a specific address within a contact's address list.


```ts
type RelationRefsConfig = {
  operation: "_set" | "_append" | "_append_all"
  items?: Array<{
    entity_schema: string
    unique_ids: Array<{
      attribute: { ... }
      _type?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }>
    path: string
    value: {
      attribute: { ... }
      operation?: { ... }
      field?: { ... }
      jsonataExpression?: { ... }
      constant?: { ... }
    }
  }>
  jsonataExpression?: string
}
```

### `RelationRefItemConfig`

Configuration for a single relation reference item

```ts
type RelationRefItemConfig = {
  entity_schema: string
  unique_ids: Array<{
    attribute: string
    _type?: "email" | "phone"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }>
  path: string
  value: {
    attribute: string
    operation?: "_set" | "_append" | "_append_all"
    field?: string
    jsonataExpression?: string
    constant?: unknown
  }
}
```

### `RelationRefValueConfig`

Configuration for the value to set on the related entity's attribute

```ts
type RelationRefValueConfig = {
  attribute: string
  operation?: "_set" | "_append" | "_append_all"
  field?: string
  jsonataExpression?: string
  constant?: unknown
}
```

### `RepeatableFieldType`

Type hint for repeatable fields that require special search handling.
These fields are stored as arrays of objects (e.g., email: [{ email: "value" }]).


```ts
type RepeatableFieldType = "email" | "phone"
```

### `ReplayEventsRequest`

```ts
type ReplayEventsRequest = {
  event_ids: string[]
}
```

### `QueryEventsRequest`

```ts
type QueryEventsRequest = {
  event_id?: string
  event_type?: "CREATE" | "UPDATE" | "DELETE"
  correlation_id?: string
  object_type?: string
  event_name?: string
  limit?: number
  cursor?: {
    event_time?: string // date-time
    event_id?: string
  }
}
```

### `QueryInboundMonitoringEventsRequest`

```ts
type QueryInboundMonitoringEventsRequest = {
  use_case_id?: string // uuid
  event_type?: "CREATE" | "UPDATE" | "DELETE" | "TRIGGER"
  sync_type?: "entity" | "meter_reading" | "webhook" | "api_deprecation"
  status?: "success" | "error" | "skipped" | "warning"
  error_category?: "validation" | "configuration" | "downstream_api" | "timeout" | "system"
  correlation_id?: string
  object_type?: string
  event_name?: string
  event_id?: string
  from_date?: string // date-time
  to_date?: string // date-time
  limit?: number
  cursor?: {
    completed_at?: string // date-time
    event_id?: string
  }
}
```

### `QueryAccessLogsRequest`

```ts
type QueryAccessLogsRequest = {
  token_id?: string
  service?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
  path?: string
  status?: number
  from_date?: string // date-time
  to_date?: string // date-time
  limit?: number
  cursor?: {
    timestamp?: string // date-time
    request_id?: string
  }
}
```

### `AccessLogEntry`

```ts
type AccessLogEntry = {
  timestamp?: string // date-time
  environment?: string
  service?: string
  request_id?: string
  method?: string
  path?: string
  status?: number
  response_latency_ms?: number
  response_length?: number
  token_id?: string
  org_id?: string
  origin?: string
  source_ip?: string
}
```

### `GetMonitoringStatsRequest`

```ts
type GetMonitoringStatsRequest = {
  from_date?: string // date-time
  to_date?: string // date-time
  inbound_group_by?: "use_case_id" | "sync_type" | "status" | "error_category" | "object_type" | "event_name" | "date"[]
  outbound_group_by?: "event_name" | "status" | "webhook_config_id" | "date"[]
}
```

### `GetMonitoringTimeSeriesRequest`

```ts
type GetMonitoringTimeSeriesRequest = {
  from_date: string // date-time
  to_date?: string // date-time
  interval: "5m" | "10m" | "30m" | "1h" | "3h" | "1d"
  direction?: "inbound" | "outbound" | "both"
}
```

### `TimeSeriesBucket`

```ts
type TimeSeriesBucket = {
  timestamp: string // date-time
  inbound?: {
    success_count?: number
    error_count?: number
    warning_count?: number
    skipped_count?: number
    total_count?: number
  }
  outbound?: {
    success_count?: number
    error_count?: number
    pending_count?: number
    total_count?: number
  }
}
```

### `QueryOutboundMonitoringEventsRequest`

```ts
type QueryOutboundMonitoringEventsRequest = {
  event_name?: string
  status?: "succeeded" | "failed" | "pending"
  webhook_config_id?: string
  from_date?: string // date-time
  to_date?: string // date-time
  limit?: number
  cursor?: {
    created_at?: string // date-time
    event_id?: string
  }
}
```

### `OutboundMonitoringEvent`

```ts
type OutboundMonitoringEvent = {
  org_id: string
  event_id: string
  event_name: string
  status: "succeeded" | "failed" | "pending"
  url?: string
  http_method?: string
  http_response?: Record<string, unknown>
  webhook_config_id?: string
  metadata?: Record<string, unknown>
  execution_context?: Record<string, unknown>
  payload?: Record<string, unknown>
  created_at: string // date-time
  updated_at?: string // date-time
}
```

### `MonitoringStats`

```ts
type MonitoringStats = {
  inbound: {
    total_events: number
    total_correlations?: number
    success_count: number
    error_count: number
    skipped_count: number
    warning_count?: number
    success_rate?: number
    last_error_at?: string // date-time
    breakdown?: Record<string, unknown>[]
  }
  outbound: {
    total_events: number
    success_count: number
    error_count: number
    pending_count?: number
    success_rate?: number
    last_error_at?: string // date-time
    breakdown?: Record<string, unknown>[]
  }
}
```

### `InboundMonitoringEvent`

```ts
type InboundMonitoringEvent = {
  org_id: string
  event_id: string
  correlation_id?: string
  integration_id?: string
  use_case_id?: string
  event_type?: "CREATE" | "UPDATE" | "DELETE" | "TRIGGER"
  object_type: string
  sync_type: "entity" | "meter_reading" | "webhook" | "api_deprecation"
  status: "success" | "error" | "skipped" | "warning"
  error_code?: string
  error_message?: string
  error_category?: "validation" | "configuration" | "downstream_api" | "timeout" | "system"
  processing_duration_ms?: number
  received_at: string // date-time
  completed_at: string // date-time
}
```

### `QueryMonitoringEventsV2Request`

```ts
type QueryMonitoringEventsV2Request = {
  use_case_id?: string
  use_case_type?: "inbound" | "outbound" | "file_proxy" | "managed_call" | "secure_proxy"
  level?: "success" | "error" | "skipped" | "warning"
  code?: string
  event_id?: string
  correlation_id?: string
  from_date?: string // date-time
  to_date?: string // date-time
  limit?: number
  cursor?: {
    created_at?: string // date-time
    id?: string // uuid
  }
}
```

### `MonitoringEventV2`

```ts
type MonitoringEventV2 = {
  id: string // uuid
  org_id: string
  integration_id: string
  event_id: string
  correlation_id?: string
  use_case_id?: string
  use_case_type: "inbound" | "outbound" | "file_proxy" | "managed_call" | "secure_proxy" | ""
  level: "success" | "error" | "skipped" | "warning"
  code?: string
  message?: string
  detail?: Record<string, unknown>
  created_at: string // date-time
}
```

### `GetMonitoringStatsV2Request`

```ts
type GetMonitoringStatsV2Request = {
  from_date?: string // date-time
  to_date?: string // date-time
  use_case_type?: "inbound" | "outbound" | "file_proxy" | "managed_call" | "secure_proxy"
  group_by?: "use_case_id" | "use_case_type" | "level" | "code" | "date"
}
```

### `MonitoringStatsV2`

```ts
type MonitoringStatsV2 = {
  total_events: number
  success_count: number
  error_count: number
  warning_count: number
  skipped_count: number
  ack_timeout_count?: number
  success_rate?: number
  last_error_at?: string // date-time
  breakdown?: Record<string, unknown>[]
}
```

### `GetMonitoringTimeSeriesV2Request`

```ts
type GetMonitoringTimeSeriesV2Request = {
  from_date: string // date-time
  to_date?: string // date-time
  interval: "5m" | "10m" | "30m" | "1h" | "3h" | "1d"
  use_case_type?: "inbound" | "outbound" | "file_proxy" | "managed_call" | "secure_proxy"
}
```

### `TimeSeriesBucketV2`

```ts
type TimeSeriesBucketV2 = {
  timestamp: string // date-time
  success_count?: number
  error_count?: number
  warning_count?: number
  skipped_count?: number
  total_count: number
}
```
