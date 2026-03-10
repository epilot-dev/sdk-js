# ERP Integration API

**API Name:** `erp-integration`
**Base URL:** `https://erp-integration-api.sls.epilot.io`

API for integrating with ERP systems, handling tracking acknowledgments, triggering ERP processes, and processing ERP up

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `acknowledgeTracking` | POST | `/v1/erp/tracking/acknowledgement` | acknowledgeTracking |
| `triggerErp` | POST | `/v1/erp/trigger` | triggerErp |
| `processErpUpdatesEvents` | POST | `/v1/erp/updates/events` | processErpUpdatesEvents |
| `processErpUpdatesEventsV2` | POST | `/v2/erp/updates/events` | processErpUpdatesEventsV2 |
| `processErpUpdatesEventsV3` | POST | `/v3/erp/updates/events` | processErpUpdatesEventsV3 |
| `simulateMappingV2` | POST | `/v2/erp/updates/mapping_simulation` | simulateMappingV2 |
| `simulateMapping` | POST | `/v1/erp/updates/mapping_simulation` | simulateMapping |
| `listIntegrations` | GET | `/v1/integrations` | listIntegrations |
| `createIntegration` | POST | `/v1/integrations` | createIntegration |
| `getIntegration` | GET | `/v1/integrations/{integrationId}` | getIntegration |
| `updateIntegration` | PUT | `/v1/integrations/{integrationId}` | updateIntegration |
| `deleteIntegration` | DELETE | `/v1/integrations/{integrationId}` | deleteIntegration |
| `queryEvents` | POST | `/v1/integrations/{integrationId}/events` | queryEvents |
| `replayEvents` | POST | `/v1/integrations/{integrationId}/events/replay` | replayEvents |
| `listUseCases` | GET | `/v1/integrations/{integrationId}/use-cases` | listUseCases |
| `createUseCase` | POST | `/v1/integrations/{integrationId}/use-cases` | createUseCase |
| `getUseCase` | GET | `/v1/integrations/{integrationId}/use-cases/{useCaseId}` | getUseCase |
| `updateUseCase` | PUT | `/v1/integrations/{integrationId}/use-cases/{useCaseId}` | updateUseCase |
| `deleteUseCase` | DELETE | `/v1/integrations/{integrationId}/use-cases/{useCaseId}` | deleteUseCase |
| `listUseCaseHistory` | GET | `/v1/integrations/{integrationId}/use-cases/{useCaseId}/history` | listUseCaseHistory |
| `listIntegrationsV2` | GET | `/v2/integrations` | listIntegrationsV2 |
| `createIntegrationV2` | POST | `/v2/integrations` | createIntegrationV2 |
| `getIntegrationV2` | GET | `/v2/integrations/{integrationId}` | getIntegrationV2 |
| `updateIntegrationV2` | PUT | `/v2/integrations/{integrationId}` | updateIntegrationV2 |
| `deleteIntegrationV2` | DELETE | `/v2/integrations/{integrationId}` | deleteIntegrationV2 |
| `setIntegrationAppMapping` | PUT | `/v1/integrations/{integrationId}/app-mapping` | setIntegrationAppMapping |
| `deleteIntegrationAppMapping` | DELETE | `/v1/integrations/{integrationId}/app-mapping` | deleteIntegrationAppMapping |
| `queryInboundMonitoringEvents` | POST | `/v1/integrations/{integrationId}/monitoring/inbound-events` | queryInboundMonitoringEvents |
| `getMonitoringStats` | POST | `/v1/integrations/{integrationId}/monitoring/stats` | getMonitoringStats |
| `getMonitoringTimeSeries` | POST | `/v1/integrations/{integrationId}/monitoring/timeseries` | getMonitoringTimeSeries |
| `getOutboundStatus` | GET | `/v1/integrations/{integrationId}/outbound-status` | getOutboundStatus |
| `queryAccessLogs` | POST | `/v1/integrations/{integrationId}/monitoring/access-logs` | queryAccessLogs |
| `queryOutboundMonitoringEvents` | POST | `/v1/integrations/{integrationId}/monitoring/outbound-events` | queryOutboundMonitoringEvents |

## Usage

```bash
epilot erp-integration acknowledgeTracking
```
