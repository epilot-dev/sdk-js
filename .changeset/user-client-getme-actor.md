---
"@epilot/user-client": minor
"@epilot/sdk": patch
"@epilot/cli": patch
---

User API: `getMeV2` answers agent and API tokens (new readOnly `actor` on `UserV2`: `type` agent | api_token, token / agent details), and documents the 403 for passkey registration/deletion and credential changes in `updateUserV2` with tokens other than the user's own login. Also syncs the user client with the published User API spec.
