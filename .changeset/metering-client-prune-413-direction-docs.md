---
'@epilot/metering-client': patch
---

Regenerate from the local Metering spec (1.2.0).

`pruneReadings` documents a `413` response (`ErrorResp`), returned when the prune scope matches too many readings for one request; narrow it with `counter_id` and/or `source`. The reading `direction` docs now explain how the direction is resolved: the explicit value first, then the counter's `direction`, then a value derived from the OBIS number. The descriptions of the reading changeset operations are reworded.
