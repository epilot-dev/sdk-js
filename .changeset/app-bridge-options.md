---
"@epilot/app-bridge": minor
---

`getOptions()` and `session.options`: the parent app now delivers the installation's non-sensitive option values with the init handshake, so apps no longer need an App API call to read their configuration. Secrets and options declared `sensitive` are never included. Returns `{}` on hosts that do not provide options yet.
