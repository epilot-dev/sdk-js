---
"@epilot/identity-client": patch
"@epilot/sdk": patch
---

Regenerate the identity client's TypeScript typings (`openapi.d.ts`) from the current definition. The previous regeneration updated the JSON definition only, so the published types still carried `partner_account` and lacked `getUserSubject`.
