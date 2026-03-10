# Journey API

**API Name:** `journey`
**Base URL:** `https://journey-config.sls.epilot.io`

API to configure journeys

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getJourneysByOrgId` | GET | `/v1/journey/organization/{id}` | getJourneysByOrgId |
| `getJourney` | GET | `/v1/journey/configuration/{id}` | getJourney |
| `removeJourney` | DELETE | `/v1/journey/configuration/{id}` | removeJourney |
| `getJourneyProducts` | GET | `/v1/journey/products/{id}` | getJourneyProducts |
| `createJourney` | POST | `/v1/journey/configuration` | createJourney |
| `updateJourney` | PUT | `/v1/journey/configuration` | updateJourney |
| `patchUpdateJourney` | PATCH | `/v1/journey/configuration` | patchUpdateJourney |
| `searchJourneys` | POST | `/v1/journey/configuration/search` | searchJourneys |
| `generateDocument` | POST | `/v1/journey/document:generate` | generateDocument |
| `createJourneyV2` | POST | `/v2/journey/configuration` | createJourneyV2 |
| `updateJourneyV2` | PUT | `/v2/journey/configuration` | updateJourneyV2 |
| `patchUpdateJourneyV2` | PATCH | `/v2/journey/configuration` | patchUpdateJourneyV2 |
| `getJourneyV2` | GET | `/v2/journey/configuration/{id}` | getJourneyV2 |
| `removeJourneyV2` | DELETE | `/v2/journey/configuration/{id}` | removeJourneyV2 |
| `getSettingsForJourney` | GET | `/v1/journey/{id}/settings` | getSettingsForJourney |
| `getButtonOptions` | GET | `/v1/journey/button-options` | getButtonOptions |

## Usage

```bash
epilot journey getJourneysByOrgId
```
