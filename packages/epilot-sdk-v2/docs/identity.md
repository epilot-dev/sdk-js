# Identity API

- **Base URL:** `https://id.epilot.cloud`
- **Full API Docs:** [https://docs.epilot.io/api/identity](https://docs.epilot.io/api/identity)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.identity.listClients(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/identity'

const identityClient = getClient()
authorize(identityClient, () => '<token>')
const { data } = await identityClient.listClients(...)
```

## Operations

**Operator Clients**
- [`listClients`](#listclients)
- [`createOidcClient`](#createoidcclient)
- [`getOidcClient`](#getoidcclient)
- [`updateClient`](#updateclient)
- [`retireClient`](#retireclient)
- [`activateClient`](#activateclient)
- [`suspendClient`](#suspendclient)
- [`rotateClientSecret`](#rotateclientsecret)

**Operator Organizations**
- [`listClientOrganizations`](#listclientorganizations)
- [`enableClientOrganization`](#enableclientorganization)
- [`getClientOrganization`](#getclientorganization)
- [`updateClientOrganization`](#updateclientorganization)
- [`revokeClientOrganization`](#revokeclientorganization)
- [`suspendClientOrganization`](#suspendclientorganization)
- [`activateClientOrganization`](#activateclientorganization)

**Session**
- [`createIdentitySession`](#createidentitysession)
- [`deleteIdentitySession`](#deleteidentitysession)

**Launch**
- [`launchClient`](#launchclient)

**Schemas**
- [`Error`](#error)
- [`PartnerClientId`](#partnerclientid)
- [`OrgId`](#orgid)
- [`Environment`](#environment)
- [`PartnerClientStatus`](#partnerclientstatus)
- [`Scope`](#scope)
- [`HttpsUri`](#httpsuri)
- [`PartnerClientCreate`](#partnerclientcreate)
- [`PartnerClientUpdate`](#partnerclientupdate)
- [`PartnerClient`](#partnerclient)
- [`PartnerClientWithSecret`](#partnerclientwithsecret)
- [`PartnerClientList`](#partnerclientlist)
- [`StatusChangeRequest`](#statuschangerequest)
- [`RotateSecretRequest`](#rotatesecretrequest)
- [`AuthorizationPolicyInput`](#authorizationpolicyinput)
- [`AuthorizationPolicy`](#authorizationpolicy)
- [`PartnerAccount`](#partneraccount)
- [`OrgEnablementStatus`](#orgenablementstatus)
- [`OrgEnablementCreate`](#orgenablementcreate)
- [`OrgEnablementUpdate`](#orgenablementupdate)
- [`OrgEnablement`](#orgenablement)
- [`OrgEnablementList`](#orgenablementlist)
- [`IdentitySession`](#identitysession)

### `listClients`

List registered partner clients. The client secret is never returned.

`GET /v1/identity/operator/clients`

```ts
const { data } = await client.listClients({
  partner_key: 'example',
  status: 'example',
  size: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "client_id": "bf-prod-x7k2",
      "partner_key": "string",
      "display_name": "string",
      "description": "string",
      "environment": "dev",
      "redirect_uris": ["https://partner.example.com/auth/callback"],
      "sector_identifier_uri": "https://partner.example.com/auth/callback",
      "initiate_login_uri": "https://partner.example.com/auth/callback",
      "launch_target_prefixes": ["string"],
      "token_endpoint_auth_method": "client_secret_basic",
      "grant_types": ["authorization_code"],
      "scopes_allowed": ["openid"],
      "status": "draft",
      "status_reason": "string",
      "config_version": 1,
      "secret_rotated_at": "1970-01-01T00:00:00.000Z",
      "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string",
      "updated_by": "string"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createOidcClient`

Create a partner client in `draft` status. The client secret is returned exactly once in this
response and can never be read again; use `rotateClientSecret` to obtain a new one.

`POST /v1/identity/operator/clients`

```ts
const { data } = await client.createOidcClient(
  null,
  {
    partner_key: 'babelforce',
    display_name: 'Babelforce',
    description: 'string',
    environment: 'dev',
    redirect_uris: ['https://partner.example.com/auth/callback'],
    sector_identifier_uri: 'https://partner.example.com/auth/callback',
    initiate_login_uri: 'https://partner.example.com/auth/callback',
    launch_target_prefixes: ['string'],
    scopes_allowed: ['openid']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string",
  "client_secret": "string"
}
```

</details>

---

### `getOidcClient`

Read a partner client. The client secret is never returned.

`GET /v1/identity/operator/clients/{client_id}`

```ts
const { data } = await client.getOidcClient({
  client_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `updateClient`

Replace the mutable configuration of a client. `config_version` must equal the current
version (compare-and-swap); a mismatch is rejected with `409`.

`PUT /v1/identity/operator/clients/{client_id}`

```ts
const { data } = await client.updateClient(
  {
    client_id: 'example',
  },
  {
    config_version: 1,
    allow_sector_change: false,
    display_name: 'string',
    description: 'string',
    redirect_uris: ['https://partner.example.com/auth/callback'],
    sector_identifier_uri: 'https://partner.example.com/auth/callback',
    initiate_login_uri: 'https://partner.example.com/auth/callback',
    launch_target_prefixes: ['string'],
    scopes_allowed: ['openid']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `retireClient`

Retire a client. The record is kept as a tombstone, the `client_id` is never reused, every
organization enablement is revoked and all provider-side artefacts are revoked.

`DELETE /v1/identity/operator/clients/{client_id}`

```ts
const { data } = await client.retireClient({
  client_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `activateClient`

Activate a `draft` or `suspended` client. Validates that every redirect URI is an absolute
HTTPS URL without fragment, that `scopes_allowed` contains `openid`, and that the
authentication method is `c

`POST /v1/identity/operator/clients/{client_id}:activate`

```ts
const { data } = await client.activateClient({
  client_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `suspendClient`

Immediately block the client for every organization. Provider-side artefacts (codes, tokens,
grants) are revoked; the audit trail is kept. Reversible with `activateClient`.

`POST /v1/identity/operator/clients/{client_id}:suspend`

```ts
const { data } = await client.suspendClient(
  {
    client_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `rotateClientSecret`

Issue a new client secret. The new secret is returned exactly once. The previous secret
keeps working until `previous_secret_expires_at` unless `compromise_mode` is set, in which
case it stops working

`POST /v1/identity/operator/clients/{client_id}:rotateSecret`

```ts
const { data } = await client.rotateClientSecret(
  {
    client_id: 'example',
  },
  {
    compromise_mode: false,
    migration_window_seconds: 86400
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "partner_key": "string",
  "display_name": "string",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code"],
  "scopes_allowed": ["openid"],
  "status": "draft",
  "status_reason": "string",
  "config_version": 1,
  "secret_rotated_at": "1970-01-01T00:00:00.000Z",
  "previous_secret_expires_at": "1970-01-01T00:00:00.000Z",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string",
  "client_secret": "string"
}
```

</details>

---

### `listClientOrganizations`

List the organizations enabled on a client, including suspended and revoked ones.

`GET /v1/identity/operator/clients/{client_id}/organizations`

```ts
const { data } = await client.listClientOrganizations({
  client_id: 'example',
  status: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "client_id": "bf-prod-x7k2",
      "org_id": "739224",
      "status": "active",
      "status_reason": "string",
      "authorization_policy": {
        "mode": "preauthorized",
        "population": "all_current_org_members",
        "allowed_scopes": ["openid"],
        "customer_approval_ref": "string",
        "approved_at": "1970-01-01T00:00:00.000Z",
        "version": 1,
        "mandatory_claims": ["org_id"],
        "recorded_by": "string",
        "recorded_at": "1970-01-01T00:00:00.000Z"
      },
      "partner_account": {
        "id": "string",
        "label": "string"
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string",
      "updated_by": "string"
    }
  ]
}
```

</details>

---

### `enableClientOrganization`

Enable an epilot organization on a client, recording the customer's authorization policy
(version 1). `allowed_scopes` must contain `openid` and be a subset of the client's
`scopes_allowed`.

`POST /v1/identity/operator/clients/{client_id}/organizations`

```ts
const { data } = await client.enableClientOrganization(
  {
    client_id: 'example',
  },
  {
    org_id: '739224',
    authorization_policy: {
      mode: 'preauthorized',
      population: 'all_current_org_members',
      allowed_scopes: ['openid'],
      customer_approval_ref: 'string',
      approved_at: '1970-01-01T00:00:00.000Z'
    },
    partner_account: {
      id: 'string',
      label: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `getClientOrganization`

Read one organization enablement.

`GET /v1/identity/operator/clients/{client_id}/organizations/{org_id}`

```ts
const { data } = await client.getClientOrganization({
  client_id: 'example',
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `updateClientOrganization`

Record a new version of the customer's authorization policy. `expected_policy_version` must
equal the current version (compare-and-swap); a mismatch is rejected with `409`.

`PUT /v1/identity/operator/clients/{client_id}/organizations/{org_id}`

```ts
const { data } = await client.updateClientOrganization(
  {
    client_id: 'example',
    org_id: 'example',
  },
  {
    expected_policy_version: 1,
    authorization_policy: {
      mode: 'preauthorized',
      population: 'all_current_org_members',
      allowed_scopes: ['openid'],
      customer_approval_ref: 'string',
      approved_at: '1970-01-01T00:00:00.000Z'
    },
    partner_account: {
      id: 'string',
      label: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `revokeClientOrganization`

Revoke an organization's enablement. The record is kept as an audited tombstone; future
authorizations for this organization fail with `access_denied` and provider-side artefacts
bound to it are revok

`DELETE /v1/identity/operator/clients/{client_id}/organizations/{org_id}`

```ts
const { data } = await client.revokeClientOrganization(
  {
    client_id: 'example',
    org_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `suspendClientOrganization`

Temporarily block one organization on this client. Reversible with `activateClientOrganization`.

`POST /v1/identity/operator/clients/{client_id}/organizations/{org_id}:suspend`

```ts
const { data } = await client.suspendClientOrganization(
  {
    client_id: 'example',
    org_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `activateClientOrganization`

Resume a suspended organization on this client. Revoked enablements cannot be re-activated; enabling the organization again (`POST …/organizations`) replaces the revoked entry and continues its policy

`POST /v1/identity/operator/clients/{client_id}/organizations/{org_id}:activate`

```ts
const { data } = await client.activateClientOrganization({
  client_id: 'example',
  org_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "client_id": "bf-prod-x7k2",
  "org_id": "739224",
  "status": "active",
  "status_reason": "string",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z",
    "version": 1,
    "mandatory_claims": ["org_id"],
    "recorded_by": "string",
    "recorded_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string",
  "updated_by": "string"
}
```

</details>

---

### `createIdentitySession`

Called by the epilot portal through the portal-host proxy after every persisted 360 session.
Validates the 360 bearer token itself and mirrors it into the `identity_session` cookie
(`HttpOnly; Secure;

`GET /v1/identity/session`

```ts
const { data } = await client.createIdentitySession()
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "739224",
  "user_id": "string",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteIdentitySession`

Clears the `identity_session` cookie. Called by the portal on logout.

`DELETE /v1/identity/session`

```ts
const { data } = await client.deleteIdentitySession()
```

---

### `launchClient`

One validated place for partner start links (manager UI, hosted apps). Redirects the browser to the
client's registered `initiate_login_uri` with `iss` set to this issuer and, when given, the deep lin

`GET /v1/identity/launch/{client_id}`

```ts
const { data } = await client.launchClient({
  client_id: 'example',
  target: 'example',
  extra: 'example',
})
```

---

## Schemas

### `Error`

```ts
type Error = {
  status: number
  error: string
  details?: Record<string, unknown>[]
}
```

### `PartnerClientId`

Opaque client identifier, unique within the issuer, never reused

```ts
type PartnerClientId = string
```

### `OrgId`

epilot organization id, an opaque case-sensitive string

```ts
type OrgId = string
```

### `Environment`

Partner-side environment this client belongs to

```ts
type Environment = "dev" | "staging" | "production"
```

### `PartnerClientStatus`

```ts
type PartnerClientStatus = "draft" | "active" | "suspended" | "retired"
```

### `Scope`

```ts
type Scope = "openid" | "email" | "profile"
```

### `HttpsUri`

Absolute HTTPS URL without fragment

```ts
type HttpsUri = string // uri
```

### `PartnerClientCreate`

```ts
type PartnerClientCreate = {
  partner_key: string
  display_name: string
  description?: string
  environment: "dev" | "staging" | "production"
  redirect_uris: string // uri[]
  sector_identifier_uri?: string // uri
  initiate_login_uri?: string // uri
  launch_target_prefixes?: string[]
  scopes_allowed?: "openid" | "email" | "profile"[]
}
```

### `PartnerClientUpdate`

```ts
type PartnerClientUpdate = {
  config_version: number
  allow_sector_change?: boolean
  display_name: string
  description?: string
  redirect_uris: string // uri[]
  sector_identifier_uri?: string // uri
  initiate_login_uri?: string // uri
  launch_target_prefixes?: string[]
  scopes_allowed: "openid" | "email" | "profile"[]
}
```

### `PartnerClient`

```ts
type PartnerClient = {
  client_id: string
  partner_key: string
  display_name: string
  description?: string
  environment: "dev" | "staging" | "production"
  redirect_uris: string // uri[]
  sector_identifier_uri?: string // uri
  initiate_login_uri?: string // uri
  launch_target_prefixes?: string[]
  token_endpoint_auth_method: "client_secret_basic"
  grant_types: "authorization_code"[]
  scopes_allowed: "openid" | "email" | "profile"[]
  status: "draft" | "active" | "suspended" | "retired"
  status_reason?: string
  config_version: number
  secret_rotated_at?: string // date-time
  previous_secret_expires_at?: string // date-time
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
  updated_by?: string
}
```

### `PartnerClientWithSecret`

```ts
type PartnerClientWithSecret = {
  client_id: string
  partner_key: string
  display_name: string
  description?: string
  environment: "dev" | "staging" | "production"
  redirect_uris: string // uri[]
  sector_identifier_uri?: string // uri
  initiate_login_uri?: string // uri
  launch_target_prefixes?: string[]
  token_endpoint_auth_method: "client_secret_basic"
  grant_types: "authorization_code"[]
  scopes_allowed: "openid" | "email" | "profile"[]
  status: "draft" | "active" | "suspended" | "retired"
  status_reason?: string
  config_version: number
  secret_rotated_at?: string // date-time
  previous_secret_expires_at?: string // date-time
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
  updated_by?: string
  client_secret: string
}
```

### `PartnerClientList`

```ts
type PartnerClientList = {
  results: Array<{
    client_id: string
    partner_key: string
    display_name: string
    description?: string
    environment: "dev" | "staging" | "production"
    redirect_uris: string // uri[]
    sector_identifier_uri?: string // uri
    initiate_login_uri?: string // uri
    launch_target_prefixes?: string[]
    token_endpoint_auth_method: "client_secret_basic"
    grant_types: "authorization_code"[]
    scopes_allowed: "openid" | "email" | "profile"[]
    status: "draft" | "active" | "suspended" | "retired"
    status_reason?: string
    config_version: number
    secret_rotated_at?: string // date-time
    previous_secret_expires_at?: string // date-time
    created_at: string // date-time
    updated_at: string // date-time
    created_by?: string
    updated_by?: string
  }>
  next_cursor?: string
}
```

### `StatusChangeRequest`

```ts
type StatusChangeRequest = {
  reason?: string
}
```

### `RotateSecretRequest`

```ts
type RotateSecretRequest = {
  compromise_mode?: boolean
  migration_window_seconds?: number
}
```

### `AuthorizationPolicyInput`

```ts
type AuthorizationPolicyInput = {
  mode?: "preauthorized"
  population?: "all_current_org_members"
  allowed_scopes: "openid" | "email" | "profile"[]
  customer_approval_ref: string
  approved_at: string // date-time
}
```

### `AuthorizationPolicy`

```ts
type AuthorizationPolicy = {
  mode?: "preauthorized"
  population?: "all_current_org_members"
  allowed_scopes: "openid" | "email" | "profile"[]
  customer_approval_ref: string
  approved_at: string // date-time
  version: number
  mandatory_claims: "org_id"[]
  recorded_by: string
  recorded_at: string // date-time
}
```

### `PartnerAccount`

Optional audit reference to the partner tenant this organization maps to. The partner enforces the mapping.

```ts
type PartnerAccount = {
  id: string
  label?: string
}
```

### `OrgEnablementStatus`

```ts
type OrgEnablementStatus = "active" | "suspended" | "revoked"
```

### `OrgEnablementCreate`

```ts
type OrgEnablementCreate = {
  org_id: string
  authorization_policy: {
    mode?: "preauthorized"
    population?: "all_current_org_members"
    allowed_scopes: "openid" | "email" | "profile"[]
    customer_approval_ref: string
    approved_at: string // date-time
  }
  partner_account?: {
    id: string
    label?: string
  }
}
```

### `OrgEnablementUpdate`

```ts
type OrgEnablementUpdate = {
  expected_policy_version: number
  authorization_policy: {
    mode?: "preauthorized"
    population?: "all_current_org_members"
    allowed_scopes: "openid" | "email" | "profile"[]
    customer_approval_ref: string
    approved_at: string // date-time
  }
  partner_account?: {
    id: string
    label?: string
  }
}
```

### `OrgEnablement`

```ts
type OrgEnablement = {
  client_id: string
  org_id: string
  status: "active" | "suspended" | "revoked"
  status_reason?: string
  authorization_policy: {
    mode?: "preauthorized"
    population?: "all_current_org_members"
    allowed_scopes: "openid" | "email" | "profile"[]
    customer_approval_ref: string
    approved_at: string // date-time
    version: number
    mandatory_claims: "org_id"[]
    recorded_by: string
    recorded_at: string // date-time
  }
  partner_account?: {
    id: string
    label?: string
  }
  created_at: string // date-time
  updated_at: string // date-time
  created_by?: string
  updated_by?: string
}
```

### `OrgEnablementList`

```ts
type OrgEnablementList = {
  results: Array<{
    client_id: string
    org_id: string
    status: "active" | "suspended" | "revoked"
    status_reason?: string
    authorization_policy: {
      mode?: { ... }
      population?: { ... }
      allowed_scopes: { ... }
      customer_approval_ref: { ... }
      approved_at: { ... }
      version: { ... }
      mandatory_claims: { ... }
      recorded_by: { ... }
      recorded_at: { ... }
    }
    partner_account?: {
      id: { ... }
      label?: { ... }
    }
    created_at: string // date-time
    updated_at: string // date-time
    created_by?: string
    updated_by?: string
  }>
}
```

### `IdentitySession`

```ts
type IdentitySession = {
  org_id: string
  user_id: string
  expires_at: string // date-time
}
```
