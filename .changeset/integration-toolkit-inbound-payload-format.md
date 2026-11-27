---
'@epilot/integration-toolkit-client': minor
---

Regenerate from Integration Toolkit spec 1.65.0.

- Inbound use case configuration: optional `payload_format` (`'1.0' | '2.0'`). `2.0` gives mappings one envelope (`kind`, `body`, `raw`, `original_request`) whatever produced the event; absent means `1.0`.
- Mapping simulation: optional `original_request`, so the response of a managed call can be simulated under payload format `2.0`.
- `inbound_use_case_slug` on managed calls documents what a `2.0` mapping receives; `bootstrapIntegrationLifecycle` no longer documents the `environment_config` fallback.
