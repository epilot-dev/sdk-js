# Address Suggestions API

**API Name:** `address-suggestions`
**Base URL:** `https://address-suggestions-api.sls.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getAddresses` | GET | `/v1/public/suggestions` | get addresses from file |
| `validateAddresses` | GET | `/v1/suggestions:validate` | validate addresses file |
| `checkAvailability` | GET | `/v1/public/availability:check` | Check address availability |
| `validateAddressesFile` | GET | `/v1/addresses-files:validate` | validate addresses file |

## Usage

```bash
epilot address-suggestions getAddresses
```
