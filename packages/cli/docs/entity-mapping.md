# Entity Mapping API

**API Name:** `entity-mapping`
**Base URL:** `https://entity-mapping.sls.epilot.io`

API Backend for mapping source entity into target entities

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `storeConfig` | POST | `/v1/mappings` | storeConfig |
| `getConfig` | GET | `/v1/mappings/{id}` | getConfig |
| `deleteConfig` | DELETE | `/v1/mappings/{id}` | deleteConfig |
| `getAllVersions` | GET | `/v1/mappings/{id}/versions` | getAllVersions |
| `storeNewVersion` | POST | `/v1/mappings/{id}/versions` | storeNewVersion |
| `getConfigVersion` | GET | `/v1/mappings/{id}/versions/{version}` | getConfigVersion |
| `executeMapping` | POST | `/v1/mappings:execute` | executeMapping |
| `searchConfigs` | POST | `/v1/mappings:search` | searchConfigs |
| `queryMappingHistory` | GET | `/v1/mappings/history` | queryMappingHistory |
| `executeRelations` | POST | `/v1/relations:execute` | executeRelations |
| `getMappingConfig` | GET | `/v2/mappings/{id}` | getMappingConfig |
| `putMappingConfig` | PUT | `/v2/mappings/{id}` | putMappingConfig |

## Usage

```bash
epilot entity-mapping storeConfig
```
