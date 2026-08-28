---
"@epilot/environments-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add the scalar environment variable types `Text`, `Number`, `Boolean` and `Options` (ER-5350)

`EnvironmentValueType` widens from `"String" | "SecretString"` to include `Text`, `Number`, `Boolean` and `Options`, and a variable's `value` widens from `string` to `string | number | boolean | OptionsValue` accordingly — a `Number` variable holds a JSON number, a `Boolean` a JSON boolean, and an `Options` variable an object of selectable entries. Two new exported types come with it: `EnvironmentValue` for the value union and `EnvironmentOption` for one entry of an `Options` list, which carries either a single `label` or a `labels` map keyed by language.

The split matters to browser-facing consumers: `Text`, `Number`, `Boolean` and `Options` may be served to a browser, while `String` and `SecretString` may not. `SecretString` keeps its existing behaviour — encrypted at rest, value never returned.

`value` also becomes genuinely optional rather than merely absent for secrets: a variable created without one — as a blueprint install does, syncing a variable's key and type but never its value — reads back with no `value` at all.

`protected` is now declared on the variable payloads, marking a variable as guarded against editing.

Consumers that exhaustively switch on `EnvironmentValueType`, or that assign `value` straight to a `string`, will need to widen. Everything that only reads `String` and `SecretString` variables is unaffected at runtime.
