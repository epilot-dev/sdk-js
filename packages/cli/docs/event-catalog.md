# Event Catalog API

**API Name:** `event-catalog`
**Base URL:** `https://event-catalog.sls.epilot.io`

Manages the catalog of business events available in epilot

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listEvents` | GET | `/v1/events` | listEvents |
| `getEvent` | GET | `/v1/events/{event_name}` | getEvent |
| `patchEvent` | PATCH | `/v1/events/{event_name}` | patchEvent |
| `getEventJSONSchema` | GET | `/v1/events/{event_name}/json_schema` | getEventJSONSchema |
| `getEventExample` | GET | `/v1/events/{event_name}/example` | getEventExample |
| `searchEventHistory` | POST | `/v1/events/{event_name}:history` | searchEventHistory |
| `triggerEvent` | POST | `/v1/events/{event_name}:trigger` | triggerEvent |

## Usage

```bash
epilot event-catalog listEvents
```
