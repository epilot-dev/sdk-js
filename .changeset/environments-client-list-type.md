---
'@epilot/environments-client': minor
---

Add the `List` environment variable value type: an ordered collection of one declared element type. A list may hold any value type except `Map` — `String`, `SecretString`, `Text`, `Number`, `Boolean`, `JSON` or `Link` — plus the `LinkFields` schema its `Link` items carry.

A list is exactly as client-safe and exactly as secret as its element type: a `List<SecretString>` is encrypted per item and its value is never returned, and a `List<String>` or `List<SecretString>` is never served to browser-facing consumers. Because a secret list withholds its value, `EnvironmentVariable` and `EnvironmentVariableListItem` gain a derived, read-only `item_type` reporting what a list holds even when its `value` is absent. (ER-5355)
