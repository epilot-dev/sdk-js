# Consent API

**API Name:** `consent`
**Base URL:** `https://consent.sls.epilot.io`

Consent Management for epilot customer entities


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `publishConsentEvent` | POST | `/v1/consent/publish` | publishConsentEvent |
| `listConsentEvents` | GET | `/v1/consent/{identifier}` | listConsentEvents |
| `handleOptInWithToken` | GET | `/v1/opt-in/{token}` | handleOptInWithToken |

## Usage

```bash
epilot consent publishConsentEvent
```
