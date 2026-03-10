# Permissions API

**API Name:** `permissions`
**Base URL:** `https://permissions.sls.epilot.io`

Flexible Role-based Access Control for epilot

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listCurrentRoles` | GET | `/v1/permissions/me` | listCurrentRoles |
| `listAllRoles` | GET | `/v1/permissions/roles` | listAllRoles |
| `createRole` | POST | `/v1/permissions/roles` | createRole |
| `searchRoles` | POST | `/v1/permissions/roles:search` | searchRoles |
| `getRole` | GET | `/v1/permissions/roles/{roleId}` | getRole |
| `putRole` | PUT | `/v1/permissions/roles/{roleId}` | putRole |
| `deleteRole` | DELETE | `/v1/permissions/roles/{roleId}` | deleteRole |
| `refreshPermissions` | GET | `/v1/permissions/refresh` | refreshPermissions |
| `getAssignedRolesForUser` | GET | `/v1/permissions/assignments/{userId}` | getAssignedRolesForUser |
| `assignRoles` | PUT | `/v1/permissions/assignments/{userId}` | assignRoles |
| `addAssignment` | POST | `/v1/permissions/assignments/{userId}/{roleId}` | addAssignment |
| `removeAssignment` | DELETE | `/v1/permissions/assignments/{userId}/{roleId}` | removeAssignment |
| `listAllAssignments` | GET | `/v1/permissions/assignments` | listAllAssignments |

## Usage

```bash
epilot permissions listCurrentRoles
```
