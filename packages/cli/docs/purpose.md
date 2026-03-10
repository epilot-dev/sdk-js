# Purpose API

**API Name:** `purpose`
**Base URL:** `https://purpose.sls.epilot.io`

Purpose API - enables the management of purposes for the epilot platform. 

epilot 'Purposes' are a special system taxon

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `createPurpose` | POST | `/v1/purpose` | Create Purpose |
| `searchPurposes` | GET | `/v1/purpose:search` | Search Purposes |
| `batchGetPurposes` | POST | `/v1/purpose:batchGet` | Batch Get Purposes |
| `getPurpose` | GET | `/v1/purpose/{purposeId}` | Get Purpose |
| `updatePurpose` | PUT | `/v1/purpose/{purposeId}` | Update Purpose |
| `deletePurpose` | DELETE | `/v1/purpose/{purposeId}` | Delete Purpose |

## Usage

```bash
epilot purpose createPurpose
```
