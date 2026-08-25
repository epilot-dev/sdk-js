---
"@epilot/customer-portal-client": minor
---

Regenerate types from the deployed Portal API: add the `templates_ref` field on the entity get/search, meter readings, and contract resolve-templates request bodies (references admin-authored portal config so templates are derived server-side), and mark the raw `templates` / `counter_templates` / `group_title` params as deprecated.
