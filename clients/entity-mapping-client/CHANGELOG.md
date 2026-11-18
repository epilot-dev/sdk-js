# @epilot/entity-mapping-client

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
