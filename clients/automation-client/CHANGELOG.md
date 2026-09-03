# @epilot/automation-client

## 2.38.0

### Minor Changes

- 742c9d1: Add Event Catalog trigger support

  - `EventCatalogTrigger` (`type: event_catalog`) — starts a flow when an Event Catalog event is published; pinned to an `event_version`, runs in the context of the entity behind `entity_node_id`, `ignore_automation_triggered` defaults to `true`
  - `TriggerEventEventCatalog` — new `AutomationExecution.trigger_event` variant with `event_id`, `event_name`, `event_version`, `published_version`, `entity_node_id` and a `payload_ref` to the stored payload
  - `ConditionStatement.source.originType` accepts `event` to read the operand from the trigger's event payload
  - `searchFlows` accepts a `trigger_event_name` query parameter to filter flows by Event Catalog event

## 2.25.0

### Minor Changes

- Add support for internal execution chain to prevent infinite loops

## 2.24.2

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 2.24.1

### Patch Changes

- Mark access as public for all packages

## 2.24.0

### Minor Changes

- Minor version bump for all client packages
