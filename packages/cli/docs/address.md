# Address API

**API Name:** `address`
**Base URL:** `https://address.sls.epilot.io`

API for address based operations on the Epilot platform

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getAddressSuggestions` | GET | `/v1/public/suggestions` | getAddressSuggestions |
| `availabilityCheck` | POST | `/v1/public/availability` | availabilityCheck |
| `validateAvailabilityFile` | GET | `/v1/availability/{id}/validate` | validateAvailabilityFile |

## Usage

```bash
epilot address getAddressSuggestions
```
