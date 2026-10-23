# @epilot/app-client

## 0.20.0

### Minor Changes

- EXTERNAL_VALUES hooks: typed `contexts` requirements are back in the spec (`EntityContextRequirement`, dropped by the 0.19.0 regeneration) and gain `ValueContextRequirement` (`{ type: "value", name, value_type }`) for scalar inputs such as a reading date, sent as `Context.<name>`

## 0.18.0

### Minor Changes

- EXTERNAL_VALUES hooks: optional typed `contexts` requirements (`{ type: "entity", schema }`); `x-epilot-permissions` metadata on operations

## 0.9.2

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 0.8.1

### Patch Changes

- Mark access as public for all packages

## 0.8.0

### Minor Changes

- Minor version bump for all client packages
