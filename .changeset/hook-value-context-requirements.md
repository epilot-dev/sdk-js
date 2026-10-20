---
"@epilot/sdk": patch
"@epilot/cli": patch
---

Pick up `@epilot/app-client` 0.20.0 and `@epilot/external-values-client` 0.3.0: External Values hooks declare typed `contexts` again (`EntityContextRequirement`) and gain `ValueContextRequirement` (`{ type: "value", name, value_type }`) for scalar inputs such as a reading date, sent as `Context.<name>`
