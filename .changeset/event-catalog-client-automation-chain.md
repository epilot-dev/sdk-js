---
"@epilot/event-catalog-client": patch
---

Add `_automation_chain` to `TriggerEventPayload` and `Event`

Optional ordered list of automation flow ids that caused the trigger. It is propagated verbatim onto the published event so that automations started by Event Catalog events can detect and break automation loops.
