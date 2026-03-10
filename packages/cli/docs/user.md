# User API

**API Name:** `user`
**Base URL:** `https://user.sls.epilot.io`

Manage users in epilot organization(s)


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `signUpUser` | POST | `/v2/users/public/signup` | signUpUser |
| `getMeV2` | GET | `/v2/users/me` | getMeV2 |
| `listUsersV2` | GET | `/v2/users` | listUsersV2 |
| `getUserV2` | GET | `/v2/users/{id}` | getUserV2 |
| `updateUserV2` | PATCH | `/v2/users/{id}` | updateUserV2 |
| `deleteUserV2` | DELETE | `/v2/users/{id}` | deleteUserV2 |
| `inviteUser` | POST | `/v2/users/invite` | inviteUser |
| `resendUserInvitation` | POST | `/v2/users/invite:resendEmail` | resendUserInvitation |
| `getGroupsForUser` | GET | `/v2/users/{id}/groups` | getGroupsForUser |
| `getGroups` | GET | `/v1/groups` | getGroups |
| `createGroup` | POST | `/v1/groups` | createGroup |
| `getGroup` | GET | `/v1/groups/{id}` | getGroup |
| `updateGroup` | PATCH | `/v1/groups/{id}` | updateGroup |
| `deleteGroup` | DELETE | `/v1/groups/{id}` | deleteGroup |
| `advanceUserAssignment` | POST | `/v1/groups/{id}/user:next` | advanceUserAssignment |
| `createNavigation` | POST | `/v2/user/navigations` | createNavigation |
| `getNavigation` | GET | `/v2/user/navigations/{id}` | getNavigation |
| `verifyEmailWithToken` | POST | `/v2/users/public/verifyEmail` | verifyEmailWithToken |
| `checkInviteToken` | GET | `/v2/users/public/checkToken` | checkInviteToken |
| `activateUser` | POST | `/v2/users/public/activate` | activateUser |
| `rejectInvite` | DELETE | `/v2/users/public/reject` | rejectInvite |
| `getUserLoginParametersV2` | GET | `/v2/users/public/username/{username}:getLoginParameters` | getUserLoginParametersV2 |
| `beginPasskeyAuthentication` | POST | `/v2/users/public/passkeys:authenticateBegin` | beginPasskeyAuthentication |
| `beginDiscoverablePasskeyAuthentication` | POST | `/v2/users/public/passkeys:authenticateBeginDiscoverable` | beginDiscoverablePasskeyAuthentication |
| `resolveDiscoverableCredential` | POST | `/v2/users/public/passkeys:resolveCredential` | resolveDiscoverableCredential |
| `beginPasskeyRegistration` | POST | `/v2/users/me/passkeys:registerBegin` | beginPasskeyRegistration |
| `completePasskeyRegistration` | POST | `/v2/users/me/passkeys:registerComplete` | completePasskeyRegistration |
| `listPasskeys` | GET | `/v2/users/me/passkeys` | listPasskeys |
| `deletePasskey` | DELETE | `/v2/users/me/passkeys/{credentialId}` | deletePasskey |
| `switchOrganization` | POST | `/v2/users/switchOrganization` | switchOrganization |
| `getMe` | GET | `/v1/users/me` | getMe |
| `listUsers` | GET | `/v1/users` | listUsers |
| `getUser` | GET | `/v1/users/{id}` | getUser |
| `getUserLoginParameters` | GET | `/v1/users/username/{username}:getLoginParameters` | getUserLoginParameters |

## Usage

```bash
epilot user signUpUser
```
