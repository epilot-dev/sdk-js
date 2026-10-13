---
"@epilot/email-settings-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add the `auto_link_identifier_attributes` email setting type (one per org): per entity schema, the extra attributes inbound email auto-linking treats as identifiers, with optional label aliases (`schemas: { [schema]: [{ name, labels? }] }`)
