---
"@epilot/cli": patch
---

Add `epilot auth browser`: prints a portal URL (`/cli-session#token=…`) that signs the browser in with the CLI's
user token, and offers to open it in interactive shells. Supports a landing path, `--open` / `--no-open` and
`--json`. Works with user, API and agent tokens; the browser session keeps the token's read-only / anonymize
restrictions and ends when the token expires, at most after 8 hours.
The portal shows the confirmation code printed in the terminal to compare before approving; when stdout is not a terminal the URL is printed
with the token hidden unless `--print-url` is given.
