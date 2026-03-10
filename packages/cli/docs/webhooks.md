# Webhooks

**API Name:** `webhooks`
**Base URL:** `https://webhooks.sls.epilot.io`

Service for configuring webhooks on different events


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getPublicKey` | GET | `/v1/webhooks/.well-known/public-key` | getPublicKey |
| `getConfiguredEvents` | GET | `/v1/webhooks/configured-events` | getConfiguredEvents |
| `getConfigs` | GET | `/v1/webhooks/configs` | getConfigs |
| `createConfig` | POST | `/v1/webhooks/configs` | createConfig |
| `getConfig` | GET | `/v1/webhooks/configs/{configId}` | getConfig |
| `updateConfig` | PUT | `/v1/webhooks/configs/{configId}` | updateConfig |
| `deleteConfig` | DELETE | `/v1/webhooks/configs/{configId}` | deleteConfig |
| `triggerWebhook` | POST | `/v1/webhooks/configs/{configId}/trigger` | triggers a webhook event either async or sync |
| `getWehookEvents` | GET | `/v1/webhooks/configs/{configId}/events` | getWehookEvents |
| `batchReplayEvents` | POST | `/v1/webhooks/configs/{configId}/events/replay-batch` | batchReplayEvents |
| `getEventById` | GET | `/v1/webhooks/configs/{configId}/events/{eventId}` | getEventById |
| `replayEvent` | POST | `/v1/webhooks/configs/{configId}/events/{eventId}/replay` | replayEvent |
| `getWebhookExample` | POST | `/v1/webhooks/configs/{configId}/example` | getWebhookExample |
| `getWebhookEventsV2` | POST | `/v2/webhooks/configs/{configId}/events` | getWebhookEventsV2 |

## Usage

```bash
epilot webhooks getPublicKey
```
