# Environments API

**API Name:** `environments`
**Base URL:** `https://environments.sls.epilot.io`

API for managing organization environment variables and secrets

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listEnvironmentVariables` | GET | `/v1/environments` | List environment variables |
| `createEnvironmentVariable` | POST | `/v1/environments` | Create environment variable |
| `getEnvironmentVariable` | GET | `/v1/environments/{key}` | Get environment variable |
| `updateEnvironmentVariable` | PUT | `/v1/environments/{key}` | Update environment variable |
| `deleteEnvironmentVariable` | DELETE | `/v1/environments/{key}` | Delete environment variable |

## Usage

```bash
epilot environments listEnvironmentVariables
```
