---
"@epilot/identity-client": minor
"@epilot/sdk": minor
---

`approved_at` on `AuthorizationPolicyInput` is now optional: the Identity API records the time of the request when an organization is enabled and keeps the current value on a policy update unless a new one is given.
