---
"@epilot/automation-client": minor
---

Add Event Catalog trigger support

- `EventCatalogTrigger` (`type: event_catalog`) — starts a flow when an Event Catalog event is published; pinned to an `event_version`, runs in the context of the entity behind `entity_node_id`, `ignore_automation_triggered` defaults to `true`
- `TriggerEventEventCatalog` — new `AutomationExecution.trigger_event` variant with `event_id`, `event_name`, `event_version`, `published_version`, `entity_node_id` and a `payload_ref` to the stored payload
- `ConditionStatement.source.originType` accepts `event` to read the operand from the trigger's event payload
- `searchFlows` accepts a `trigger_event_name` query parameter to filter flows by Event Catalog event
