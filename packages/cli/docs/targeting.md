# Targeting API

**API Name:** `targeting`
**Base URL:** `https://targeting.sls.epilot.io`

API for Targeting

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `changeCampaignStatus` | POST | `/v1/campaign/{campaign_id}/status` | Change the status of a campaign |
| `getCampaignJobStatus` | GET | `/v1/campaign/{campaign_id}/job` | Get the status of a campaign's automation job |
| `getCampaignPortals` | GET | `/v1/campaign/{campaign_id}/portals` | Get portals usage info for a campaign |
| `retriggerCampaignAutomations` | POST | `/v1/campaign/{campaign_id}/automations:retrigger` | Retrigger automations for campaign recipients |
| `matchCampaigns` | POST | `/v1/campaign:match` | Match campaigns |
| `matchTargets` | POST | `/v1/target:match` | Match targets |
| `getTargetQueries` | POST | `/v1/target/queries` | Get target queries |
| `createRecipient` | POST | `/v1/campaign/{campaign_id}/recipient` | Create a recipient associated with a campaign |
| `updateRecipient` | PATCH | `/v1/campaign/{campaign_id}/recipient/{recipient_id}` | Update a recipient |
| `updateRecipientPortalStatus` | PATCH | `/v1/campaign/{campaign_id}/recipient/{recipient_id}/portal:status` | Update portal status for a campaign recipient |
| `getRecipients` | GET | `/v1/campaign/{campaign_id}/recipients` | Get campaign recipients |

## Usage

```bash
epilot targeting changeCampaignStatus
```
