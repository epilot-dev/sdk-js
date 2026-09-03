# @epilot/event-catalog-client

## 0.7.0

### Minor Changes

- 742c9d1: Custom event lifecycle and automation chain

  - `createCustomEvent` (`POST /v1/events`) reserves an org-scoped custom event name and persists its immutable v1.0 draft definition (`CreateCustomEventPayload`, `CustomSchemaField`, `EventMapping`, `CustomEventLineage`)
  - `previewCustomEvent` (`POST /v1/events/{event_name}:preview`) assembles and validates a persisted draft without publishing it (`PreviewEventResponse`, `ValidationIssue`)
  - `publishCustomEventDefinition` (`POST /v1/events/{event_name}:publish`) conditionally activates an immutable custom-event definition (`PublishCustomEventPayload`)
  - `deprecateCustomEvent` (`DELETE /v1/events/{event_name}`) soft-deprecates an org-scoped custom event
  - `EventConfig` and `Event` gain `event_origin` (`builtin` | `custom`), `mapping`, `lineage` and `purpose_filters` (`PurposeFilterSnapshot`)
  - `UpdateEventPayload` is now a mutable activation overlay limited to `enabled`, `auto_trigger` and `success_criteria`; immutable definition fields are no longer accepted (they were previously ignored)
  - `TriggerEventPayload` and `Event` gain `_automation_chain`, an optional ordered list of automation flow ids that caused the trigger, propagated verbatim onto the published event so automations started by Event Catalog events can detect and break loops

## 0.0.1

Initial release
