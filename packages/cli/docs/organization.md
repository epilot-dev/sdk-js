# Organization API

**API Name:** `organization`
**Base URL:** `https://organization-v2.sls.epilot.io`

Manage epilot tenant organizations

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getCurrentOrganization` | GET | `/v2/organization/current` | getCurrentOrganization |
| `getOrganization` | GET | `/v2/organization/{org_id}` | getOrganization |
| `updateOrganization` | PATCH | `/v2/organization/{org_id}` | updateOrganization |
| `getSettings` | GET | `/v2/organization/{org_id}/settings` | getSettings |
| `putSettingsValue` | PUT | `/v2/organization/{org_id}/settings/{key}` | putSettingsValue |
| `deleteSettingsValue` | DELETE | `/v2/organization/{org_id}/settings/{key}` | deleteSettingsValue |

## Usage

```bash
epilot organization getCurrentOrganization
```
