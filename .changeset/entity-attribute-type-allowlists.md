---
"@epilot/entity-client": minor
"@epilot/sdk": minor
---

Publish the entity attribute-type allowlists

`RELATION_ATTRIBUTE_TYPES` (the four relation-like types) and `OVERRIDABLE_ATTRIBUTE_TYPES` (the types a conditional variant may override via `overridable_attribute`) are now exported as `ReadonlySet<string>`, ready for `.has(attribute.type)` without narrowing first. `RELATION_ATTRIBUTE_TYPE_LIST` and `OVERRIDABLE_ATTRIBUTE_TYPE_LIST` expose the same members as literal-typed arrays, and `AttributeType` names the union of every `type` an attribute can have.

Both lists are `satisfies readonly AttributeType[]`, so a member the spec does not declare is a compile error and they cannot drift from the schema.

These were hand-copied in `entity-api`, `epilot360-entity-builder`, `epilot360-entity-builder-v2` and `epilot360-integration-hub`; those copies can now be replaced with an import.
