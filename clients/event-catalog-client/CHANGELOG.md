# @epilot/event-catalog-client

## 0.7.1

### Patch Changes

- f1a13fb: Regenerate the event catalog client from the Event Catalog API spec as merged on `main`, continuing the custom-events iteration shipped in `0.7.0`.

  `replaceCustomEventDraft` (`PUT /v1/events/{event_name}`) replaces the complete v1.0 definition of a custom event while it is still an unpublished draft. Drafts have no consumers, so their definition is not yet immutable; the event name stays the identity and cannot change, and publication remains a separate action.

  `CreateCustomEventPayload` gains three trigger-source fields and tightens one: `api_trigger` allows API-source triggering independently of Automation, `automation_trigger_only` restricts triggering to Automation with durable delivery and strict readiness, and `automation_trigger_seed_node` names the cardinality-one graph seed such an event requires. `entity_graph` is now required — custom events are always projected from an entity graph — and in guided mapping mode every schema field needs a `graph_source` expression. `api_trigger` is also reported back on `EventConfig` and `Event`.

  The remaining changes document behaviour that was already enforced: built-in inheritance is validated against the exact lineage version pinned in `lineage`, whose trigger restrictions cannot be removed or replaced; a derived built-in trigger retains every inherited attribute and cannot narrow an inherited unfiltered trigger; and `purpose` names are allowed only when inherited unchanged from that pinned version, with new purposes using the stable `purpose_filters` IDs, the two being OR alternatives.

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
