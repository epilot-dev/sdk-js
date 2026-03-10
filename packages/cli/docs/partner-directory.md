# Partner API

**API Name:** `partner-directory`
**Base URL:** `https://partner-directory-api.sls.epilot.io`

Management of Partners in epilot

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `approvePartner` | POST | `/v1/partners/{id}/approve` | approvePartner |
| `rejectPartner` | POST | `/v1/partners/{id}/reject` | rejectPartner |
| `searchAssignable` | POST | `/v1/partners/assignables:search` | searchAssignables |
| `batchGetAssignable` | POST | `/v1/partners/assignables:batchGet` | batchGet |
| `getPartnerByToken` | GET | `/v1/partner-directory/public/getPartnerByToken` | getPartnerByToken |
| `activatePartner` | POST | `/v1/partner-directory/public/activate` | activatePartner |
| `searchGeolocationForText` | POST | `/v1/geolocation/text:search` | searchGeolocationForText |
| `invitePartnerV2` | POST | `/v2/partners/{id}/invite` | invitePartnerV2 |
| `getPartnerUsers` | GET | `/v2/partners/{orgId}/users` | getPartnerUsers |
| `createPartnerUser` | POST | `/v2/partners/{orgId}/users` | createPartnerUser |
| `deletePartnerUser` | DELETE | `/v2/partners/{orgId}/users/{userId}` | deletePartnerUser |
| `getPartnerRoles` | GET | `/v2/partners/{orgId}/roles` | getPartnerRoles |
| `createPartnerRole` | POST | `/v2/partners/{orgId}/roles` | createPartnerRole |
| `updatePartnerRole` | PUT | `/v2/partners/{orgId}/roles/{roleId}` | updatePartnerRole |
| `assignPartnerUserRoles` | POST | `/v2/partners/{orgId}/users/{userId}/roles` | assignPartnerUserRoles |
| `unassignPartnerUserRoles` | DELETE | `/v2/partners/{orgId}/users/{userId}/roles` | unassignPartnerUserRoles |

## Usage

```bash
epilot partner-directory approvePartner
```
