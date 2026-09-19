---
"@epilot/cli": minor
---

`epilot auth login` now uses the Agent Auth Protocol: the CLI registers an agent for this machine, the user approves it once in the browser, and tokens are issued (and silently refreshed) per organization. New `epilot org list|use|request|current` commands switch organizations and request access; `auth status` shows the agent and its grants; `auth logout` revokes the agent. `--legacy` keeps the previous browser callback flow, `--token` stays as manual mode.
