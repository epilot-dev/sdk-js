---
"@epilot/app-sdk": minor
---

Add a `responseType` option (`auto | json | text | blob | arrayBuffer`) to `proxy()` and `createProxyClient().proxy()`, so apps can read binary proxy responses such as images without the client decoding them as text. The default `auto` keeps the current behaviour.
