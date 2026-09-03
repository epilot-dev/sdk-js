---
"@epilot/entity-client": minor
"@epilot/sdk": minor
---

Regenerate the entity client from the Entity API spec as merged on `main`. Two changes come across: `overridable_attribute` documents what it accepts and rejects (accepted on scalar attributes and on relations, where a variant replaces the whole `$relation` list; rejected on system, `readonly`, `hidden`, `computed` and `repeatable` attributes), and a `select` condition now declares its vocabulary as `options` — a bare value or a `{ value, title }` object, like a `select` attribute's `options` — replacing the old `values: string[]`.
