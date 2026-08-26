---
"@epilot/customer-portal-client": minor
---

Add `P1Y` to the visualization interval enums

`getConsumption` / `getCosts` / `getPrices` `interval` params and `VisualizationMetadata.intervals` accept `P1Y`, so integrations can advertise and serve yearly data points (e.g. user-reported meter readings covering roughly a year each).
