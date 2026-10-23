---
'@epilot/environments-client': patch
---

Docs only: `LinkValue` now documents that a link URL may use `http`, `https`, `mailto` or `tel` (with light checks on the `mailto:` address and `tel:` number), matching the environments API. The regeneration also picks up the API's `x-epilot-permissions` annotations and its revised client-safety wording for `EnvironmentValueType`. No type changes. (ER-5506)
