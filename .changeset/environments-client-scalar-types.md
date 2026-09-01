---
"@epilot/environments-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add the scalar environment variable types `Text`, `Number`, `Boolean` and `Map` (ER-5350, ER-5354)

`EnvironmentValueType` widens from `"String" | "SecretString"` to include `Text`, `Number`, `Boolean` and `Map`, and a variable's `value` widens from `string` to `string | number | boolean | MapValue` accordingly — a `Number` variable holds a JSON number, a `Boolean` a JSON boolean, and a `Map` an object of selectable entries.

Four new exported types come with it: `EnvironmentValue` for the value union, `MapValue` for a Map's contents, `MapEntry` for one of its entries, and `StringTranslations` for a string carrying one translation per language.

A `MapEntry` is `{ key, value }`: `key` is the token a journey submits, and `value` is what the customer reads — either a single string, or a `StringTranslations` record keyed by language code (`de`, `en-US`). Every entry of one Map must agree on which of the two it uses; a list mixing plain and translated entries is rejected. `MapValue` carries those entries as a non-empty `options` array alongside an optional `fallbackLanguage`, which defaults to `de` and must resolve for every entry of a translated list.

The split matters to browser-facing consumers: `Text`, `Number`, `Boolean` and `Map` may be served to a browser, while `String` and `SecretString` may not. `SecretString` keeps its existing behaviour — encrypted at rest, value never returned.

`value` also becomes genuinely optional rather than merely absent for secrets: a variable created without one — as a blueprint install does, syncing a variable's key and type but never its value — reads back with no `value` at all.

`protected` is now declared on the variable payloads, marking a variable as guarded against editing.

Consumers that exhaustively switch on `EnvironmentValueType`, or that assign `value` straight to a `string`, will need to widen. Everything that only reads `String` and `SecretString` variables is unaffected at runtime.
