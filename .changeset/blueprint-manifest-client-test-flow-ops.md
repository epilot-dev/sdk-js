---
'@epilot/blueprint-manifest-client': minor
---

Regenerate from the Blueprint Manifest API spec (blueprint-manifest-api `main`, after !1090).

- Flow-mode test suggestions: `submitBlueprintTestFlowPlan` (`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/suggestions/{generation_id}/flow-plan`) and `submitBlueprintTestSuggestionPart` (`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/test-suite/suggestions/parts/{part_key}/submissions`).
- Test suite suggestions report `flows` coverage and a `deadline` in flow mode.
