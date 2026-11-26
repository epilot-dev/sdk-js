# @epilot/entity-mapping-client

## 0.13.0

### Minor Changes

- Graph Context node filters (`GraphNodeFilter` in `graph_context`) accept an optional `operator`: `eq` (default) or `neq` (keep entities whose attribute does not equal `value`, including entities missing the attribute).

## 0.12.0

### Minor Changes

- `validateMappingFlow`: new request field `acknowledged` (`{ action_id, code, target? }[]`, at most 200): blocking findings the user decided to keep stop blocking and come back in `acknowledged` of the response
- `validateMappingFlow` response: `generated` (findings on Journey Builder-generated lines, never blocking) and `references` (`resolved` / `unresolved`: actions that point at a mapping config target via `config.mapping_config` are checked as that target)
- New codes: `source-not-fixed` (an `automation_step` source, source checks skipped) and the suggestion kind `fallback-producers`

## 0.11.0

### Minor Changes

- New operations `validateMapping` (`POST /v1/mappings:validate`) and `validateMappingFlow` (`POST /v1/mappings:validate-flow`): check map-entity mappings against their source (a journey by `journey_id` or an entity schema) before saving
- `block_id` on journey mapping sources
- Breaking: `queryMappingHistory` (`GET /v1/mappings/history`) is removed, as the endpoint was removed from entity-mapping-api

## 0.10.3

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 0.10.1

### Patch Changes

- Mark access as public for all packages

## 0.10.0

### Minor Changes

- Minor version bump for all client packages
