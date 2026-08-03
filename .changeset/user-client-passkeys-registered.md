---
"@epilot/user-client": minor
---

Add `passkeys_registered` to `LoginParameters`

`getUserLoginParameters` now reports whether the user has at least one passkey registered, so the login UI can offer passkey authentication as an alternative to typing an MFA code.
