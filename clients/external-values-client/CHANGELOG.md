# @epilot/external-values-client

## 0.3.0

### Minor Changes

- Hook summaries and `resolve` requests support `value` context requirements (`{ type: "value", name, value_type }`): a scalar input such as a reading date, sent as `Context.<name>` and optional at runtime

## 0.2.0

### Minor Changes

- Hook summaries carry the typed `contexts` requirements a hook declares (`{ type: "entity", schema }`); the `context.input` convention is gone from the docs
