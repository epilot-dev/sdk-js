---
"@epilot/cli": patch
---

Pre-minted tokens in named profiles. Storing a token for a named profile (`epilot auth token --profile <name> <token>`, `auth login --token`, `profile create --token`, `--profile` / `EPILOT_PROFILE`) no longer overwrites the default login in `credentials.json`; `auth logout --profile <name>` clears that profile instead of the default login. Org, user and expiry are read from the token's JWT claims when it is stored, and a command run with an expired stored token fails with `Token of profile "…" expired at … — request a new one` instead of an opaque 401. `auth status` accepts `--token`, reports the effective token source (`--token`, `EPILOT_TOKEN`, profile or `credentials.json`) and shows the decoded claims (org, user, token id, read-only, anonymize, allowed actions, actor, expiry) without printing the token.
