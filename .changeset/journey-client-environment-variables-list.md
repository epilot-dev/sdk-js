---
"@epilot/sdk": minor
---

Add `getJourneyEnvironmentVariables` — the Map environment variables a journey block may use as an options source (ER-5356)

`getJourneyEnvironmentVariables` (`GET /v1/journey/environment-variables`) lists the organization's `Map` environment variables that currently hold a valid value, each as `{ key, type: 'Map', value, description? }` where `value` is an `EnvironmentMap`. It is authenticated with a journey **authoring** token and gated on journey read permission — not on `environments:edit` — because its consumer is the journey builder's options-source picker.

It complements `getJourneyEnvironment`, which resolves the variables a *saved* journey already references for the runtime. This one enumerates candidates for an author who has not picked one yet, which the journey-scoped endpoint cannot do.

Only `Map` is returned. `Text`, `Number` and `Boolean` are client-safe and `getJourneyEnvironment` resolves them, but no journey block consumes one as an options source yet.

The response is always `Cache-Control: private, no-store`.
