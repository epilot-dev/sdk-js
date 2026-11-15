---
"@epilot/cli": patch
---

Add `epilot auth browser`: prints a portal URL (`/cli-session#token=…`) that signs the browser in with the CLI's
user token, and offers to open it in interactive shells. Supports a landing path, `--open` / `--no-open` and
`--json`. The browser session keeps the token's read-only / anonymize restrictions and ends when the token expires.
API and agent tokens are rejected (no user to sign in as).
