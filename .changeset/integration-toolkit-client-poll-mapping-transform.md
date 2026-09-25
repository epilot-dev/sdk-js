---
'@epilot/integration-toolkit-client': minor
---

Add the poll mapping transform to the outbound contract. `simulateOutboundMapping` evaluates an outbound mapping against a sample event, with the new `SimulateOutboundMappingRequest`, `SimulateOutboundMappingResponse` and `OutboundMappingSimulationError` schemas. A poll mapping may now carry a `jsonata_expression`, evaluated once at enqueue. `OutboundMessage` gains `mapping_version` and `org_id`, `OutboundDlqMessage` gains `mapping_error` and `mapping_version`, and `redriveOutboundDlqMessages` takes `reapply_mapping` and reports `mapping_error`. The `MSG_LATE_ARRIVAL` monitoring code is added, and the monitoring catalog picks up the corrected levels for `ACK_CONFIRMED`, `MSG_ACKED` and `MSG_DEAD_LETTERED`.
