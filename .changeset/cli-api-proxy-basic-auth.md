---
"@epilot/cli": patch
---

`app add-component --type API_PROXY` now offers `basic` auth (adds the `username` and `password` options the proxy reads) and prints the option keys each auth type expects. Corrects the API_PROXY guidance in the `app init` agent instructions: query parameters, PUT/PATCH/DELETE and `basic` auth are supported; binary responses are not yet.
