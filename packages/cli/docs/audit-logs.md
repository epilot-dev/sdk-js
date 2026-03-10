# Audit Log

**API Name:** `audit-logs`
**Base URL:** `https://audit-logs.sls.epilot.io`

Service for managing and retrieving auditing logs in the scope of an organization


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getLogs` | POST | `/v1/logs` | getLogs |
| `getLogById` | GET | `/v1/logs/{logId}` | getLogById |

## Usage

```bash
epilot audit-logs getLogs
```
