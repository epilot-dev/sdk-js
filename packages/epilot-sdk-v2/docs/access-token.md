# Access Token API

- **Base URL:** `https://access-token.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/access-token](https://docs.epilot.io/api/access-token)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.accessToken.createAccessToken(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/access-token'

const accessTokenClient = getClient()
authorize(accessTokenClient, () => '<token>')
const { data } = await accessTokenClient.createAccessToken(...)
```

## Operations

**Access Tokens**
- [`createAccessToken`](#createaccesstoken)
- [`listAccessTokens`](#listaccesstokens)
- [`revokeAccessToken`](#revokeaccesstoken)

**Public**
- [`getAccessTokenJwks`](#getaccesstokenjwks)
- [`getAccessTokenOIDC`](#getaccesstokenoidc)
- [`getPublicTokenJwks`](#getpublictokenjwks)
- [`getPortalPreviewTokenJwks`](#getportalpreviewtokenjwks)
- [`getPublicTokenOIDC`](#getpublictokenoidc)
- [`getPortalPreviewTokenOIDC`](#getportalpreviewtokenoidc)
- [`getContactIdentificationTokenJwks`](#getcontactidentificationtokenjwks)
- [`getContactIdentificationTokenOIDC`](#getcontactidentificationtokenoidc)

**Agent Auth**
- [`getAgentConfiguration`](#getagentconfiguration)
- [`getAgentAuthJwks`](#getagentauthjwks)
- [`listCapabilities`](#listcapabilities)
- [`describeCapability`](#describecapability)
- [`registerAgent`](#registeragent)
- [`getAgentStatus`](#getagentstatus)
- [`requestCapability`](#requestcapability)
- [`reactivateAgent`](#reactivateagent)
- [`revokeAgent`](#revokeagent)
- [`rotateAgentKey`](#rotateagentkey)
- [`rotateHostKey`](#rotatehostkey)
- [`revokeHost`](#revokehost)
- [`executeCapability`](#executecapability)
- [`introspectAgent`](#introspectagent)
- [`getAgentApproval`](#getagentapproval)
- [`decideAgentApproval`](#decideagentapproval)
- [`listOrganizationAgents`](#listorganizationagents)
- [`revokeOrganizationAgent`](#revokeorganizationagent)
- [`exchangeAgentToken`](#exchangeagenttoken)
- [`registerFirstPartyAgent`](#registerfirstpartyagent)
- [`registerPreviewOrgAgent`](#registerprevieworgagent)

**Schemas**
- [`AgentAuthError`](#agentautherror)
- [`AgentMode`](#agentmode)
- [`AgentStatus`](#agentstatus)
- [`GrantStatus`](#grantstatus)
- [`AccessProfile`](#accessprofile)
- [`ProfileOption`](#profileoption)
- [`IssuedAgentToken`](#issuedagenttoken)
- [`Ed25519PublicKey`](#ed25519publickey)
- [`Constraints`](#constraints)
- [`CapabilityRequest`](#capabilityrequest)
- [`Capability`](#capability)
- [`CapabilityGrant`](#capabilitygrant)
- [`DeviceAuthorizationApproval`](#deviceauthorizationapproval)
- [`AgentConfiguration`](#agentconfiguration)
- [`RegisterAgentRequest`](#registeragentrequest)
- [`RegisterAgentResponse`](#registeragentresponse)
- [`RequestCapabilityRequest`](#requestcapabilityrequest)
- [`RequestCapabilityResponse`](#requestcapabilityresponse)
- [`AgentIdRequest`](#agentidrequest)
- [`AgentStatusResponse`](#agentstatusresponse)
- [`OrganizationAgent`](#organizationagent)
- [`AgentApproval`](#agentapproval)
- [`AgentApprovalDecision`](#agentapprovaldecision)
- [`AccessToken`](#accesstoken)
- [`AccessTokenId`](#accesstokenid)
- [`AccessTokenName`](#accesstokenname)
- [`AccessTokenType`](#accesstokentype)
- [`AccessTokenJourneyId`](#accesstokenjourneyid)
- [`PortalId`](#portalid)
- [`PortalUserId`](#portaluserid)
- [`ContactId`](#contactid)
- [`AllowedOperations`](#allowedoperations)
- [`TokenParameters`](#tokenparameters)
- [`ExpiresIn`](#expiresin)
- [`ReadOnly`](#readonly)
- [`Anonymize`](#anonymize)
- [`AccessTokenParameters`](#accesstokenparameters)
- [`JourneyTokenParameters`](#journeytokenparameters)
- [`PortalTokenParameters`](#portaltokenparameters)
- [`AssumeTokenParameters`](#assumetokenparameters)
- [`AppTokenParameters`](#apptokenparameters)
- [`PortalPreviewTokenParameters`](#portalpreviewtokenparameters)
- [`ContactIdentificationTokenParameters`](#contactidentificationtokenparameters)
- [`AccessTokenItem`](#accesstokenitem)
- [`RoleId`](#roleid)
- [`Assignments`](#assignments)

### `createAccessToken`

**Access Token type: `API`** (default if not specified):

`POST /v1/access-tokens`

```ts
const { data } = await client.createAccessToken(
  null,
  {
    name: 'Postman Access Token',
    token_type: 'api',
    assignments: ['123:owner'],
    expires_in: 3600,
    read_only: true,
    anonymize: true
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
  "id": "api_5ZugdRXasLfWBypHi93Fk",
  "created_at": "1970-01-01T00:00:00.000Z",
  "name": "Postman Access Token",
  "token_type": "api",
  "journey_id": "string",
  "portal_id": "string",
  "portal_user_id": "string",
  "contact_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "allowed_operations": ["getContact", "getContracts"],
  "assignments": ["123:owner"],
  "read_only": true,
  "anonymize": true,
  "last_used": "2026-02-24",
  "expires_at": "2026-03-01T12:00:00.000Z"
}
```

</details>

---

### `listAccessTokens`

Lists all Access Tokens for current user (by default excludes system generated tokens)

`GET /v1/access-tokens`

```ts
const { data } = await client.listAccessTokens({
  token_type: ['...'],
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "id": "api_5ZugdRXasLfWBypHi93Fk",
    "created_at": "1970-01-01T00:00:00.000Z",
    "name": "Postman Access Token",
    "token_type": "api",
    "journey_id": "string",
    "portal_id": "string",
    "portal_user_id": "string",
    "contact_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "allowed_operations": ["getContact", "getContracts"],
    "assignments": ["123:owner"],
    "read_only": true,
    "anonymize": true,
    "last_used": "2026-02-24",
    "expires_at": "2026-03-01T12:00:00.000Z"
  }
]
```

</details>

---

### `revokeAccessToken`

Revokes an Access Token so it can't be used anymore.

`DELETE /v1/access-tokens/{id}`

```ts
const { data } = await client.revokeAccessToken({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "api_5ZugdRXasLfWBypHi93Fk",
  "created_at": "1970-01-01T00:00:00.000Z",
  "name": "Postman Access Token",
  "token_type": "api",
  "journey_id": "string",
  "portal_id": "string",
  "portal_user_id": "string",
  "contact_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "allowed_operations": ["getContact", "getContracts"],
  "assignments": ["123:owner"],
  "read_only": true,
  "anonymize": true,
  "last_used": "2026-02-24",
  "expires_at": "2026-03-01T12:00:00.000Z"
}
```

</details>

---

### `getAccessTokenJwks`

Get jwks public key set to verify access tokens generated by this API

`GET /v1/access-tokens/.well-known/jwks.json`

```ts
const { data } = await client.getAccessTokenJwks()
```

<details>
<summary>Response</summary>

```json
{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=",
      "kty": "RSA",
      "n": "h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ",
      "use": "sig"
    }
  ]
}
```

</details>

---

### `getAccessTokenOIDC`

OpenID Connect configuration for Access Token API as identity provider

`GET /v1/access-tokens/.well-known/openid-configuration`

```ts
const { data } = await client.getAccessTokenOIDC()
```

<details>
<summary>Response</summary>

```json
{
  "issuer": "https://access-token.sls.epilot.io/v1/access-tokens",
  "jwks_uri": "https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json"
}
```

</details>

---

### `getPublicTokenJwks`

Get jwks public key set to verify public tokens generated by this API

`GET /v1/access-tokens/public/.well-known/jwks.json`

```ts
const { data } = await client.getPublicTokenJwks()
```

<details>
<summary>Response</summary>

```json
{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=",
      "kty": "RSA",
      "n": "h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ",
      "use": "sig"
    }
  ]
}
```

</details>

---

### `getPortalPreviewTokenJwks`

Get jwks public key set to verify portal preview tokens generated by this API

`GET /v1/access-tokens/portal-preview/.well-known/jwks.json`

```ts
const { data } = await client.getPortalPreviewTokenJwks()
```

<details>
<summary>Response</summary>

```json
{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=",
      "kty": "RSA",
      "n": "h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ",
      "use": "sig"
    }
  ]
}
```

</details>

---

### `getPublicTokenOIDC`

OpenID Connect configuration for Access Token API a a public identity provider

`GET /v1/access-tokens/public/.well-known/openid-configuration`

```ts
const { data } = await client.getPublicTokenOIDC()
```

<details>
<summary>Response</summary>

```json
{
  "issuer": "https://access-token.sls.epilot.io/v1/access-tokens",
  "jwks_uri": "https://access-token.sls.epilot.io/v1/access-tokens/.well-known/jwks.json"
}
```

</details>

---

### `getPortalPreviewTokenOIDC`

OpenID Connect configuration for Access Token API a a portal preview identity provider

`GET /v1/access-tokens/portal-preview/.well-known/openid-configuration`

```ts
const { data } = await client.getPortalPreviewTokenOIDC()
```

<details>
<summary>Response</summary>

```json
{
  "issuer": "https://access-token.sls.epilot.io/v1/access-tokens/portal-preview",
  "jwks_uri": "https://access-token.sls.epilot.io/v1/access-tokens/portal-preview/.well-known/jwks.json"
}
```

</details>

---

### `getContactIdentificationTokenJwks`

Get jwks public key set to verify contact identification tokens generated by this API

`GET /v1/access-tokens/contact-identification/.well-known/jwks.json`

```ts
const { data } = await client.getContactIdentificationTokenJwks()
```

<details>
<summary>Response</summary>

```json
{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "tXWU5mPMbRPczpbQwi6vbhLF4GgF3wlMDSyqo7pfeiw=",
      "kty": "RSA",
      "n": "h_QDoCjZ8W_trtYXaP7_S22wf5r5Wd9XBLED78oT44bJjQXn8ddcFV8Hik65_4IYXVX_hTTU4zpxe3H8vx2j7-Zz3O59mYMp5S0MzODNEdf5Y_2o19eis0brmAJniixsNlQ9LlYkdrVamrgaxHu3ZpP_99zkfFybYeuYoQNzb3PyrT8xVnz_USs_nlFMHpGUxvvz7gfKPqxcLvgLJr4cwI9yzaSY9CD4qW181QVcnL_WzpQ8xx6AuhhHZQ1l_3GG4InTk8ahE7U2ZHVu8RrX6d01pMgc3piEcet9RgFLnhbTg3YIiKGoAbN42wJn_x3lgIAC42T9mbmTsHyUdS6nUQ",
      "use": "sig"
    }
  ]
}
```

</details>

---

### `getContactIdentificationTokenOIDC`

OpenID Connect configuration for Access Token API as a contact identification identity provider

`GET /v1/access-tokens/contact-identification/.well-known/openid-configuration`

```ts
const { data } = await client.getContactIdentificationTokenOIDC()
```

<details>
<summary>Response</summary>

```json
{
  "issuer": "https://access-token.sls.epilot.io/v1/access-tokens/contact-identification",
  "jwks_uri": "https://access-token.sls.epilot.io/v1/access-tokens/contact-identification/.well-known/jwks.json"
}
```

</details>

---

### `getAgentConfiguration`

Agent Auth Protocol discovery document (spec §5.1). Cached for one hour.

`GET /v1/access-tokens/agent-auth/.well-known/agent-configuration`

```ts
const { data } = await client.getAgentConfiguration()
```

<details>
<summary>Response</summary>

```json
{
  "version": "1.0-draft",
  "provider_name": "epilot",
  "description": "string",
  "issuer": "https://access-token.sls.epilot.io/v1/access-tokens/agent-auth",
  "default_location": "https://example.com/path",
  "algorithms": ["Ed25519"],
  "modes": ["delegated"],
  "approval_methods": ["string"],
  "endpoints": {},
  "jwks_uri": "https://example.com/path"
}
```

</details>

---

### `getAgentAuthJwks`

JWKS to verify the epilot access tokens issued through `epilot.access_token.issue` (alias of the Access Token JWKS)

`GET /v1/access-tokens/agent-auth/.well-known/jwks.json`

```ts
const { data } = await client.getAgentAuthJwks()
```

<details>
<summary>Response</summary>

```json
{
  "keys": [
    {}
  ]
}
```

</details>

---

### `listCapabilities`

Lists the capability catalogue (spec §5.2). Optional host or agent JWT; with an agent JWT each
capability carries `grant_status`.

`GET /v1/access-tokens/agent-auth/capability/list`

```ts
const { data } = await client.listCapabilities({
  query: 'example',
  cursor: 'example',
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "capabilities": [
    {
      "name": "epilot.access_token.issue",
      "description": "string",
      "location": "https://example.com/path",
      "input": {},
      "output": {},
      "grant_status": "granted"
    }
  ],
  "next_cursor": "string",
  "has_more": true
}
```

</details>

---

### `describeCapability`

Describes one capability incl. input / output JSON Schema (spec §5.2)

`GET /v1/access-tokens/agent-auth/capability/describe`

```ts
const { data } = await client.describeCapability({
  name: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "name": "epilot.access_token.issue",
  "description": "string",
  "location": "https://example.com/path",
  "input": {},
  "output": {},
  "grant_status": "granted"
}
```

</details>

---

### `registerAgent`

Registers an agent under a host (spec §5.3). Authenticated with a host JWT (`typ: host+jwt`) carrying
`host_public_key` and `agent_public_key`. Unknown hosts are created `pending` and linked to the ap

`POST /v1/access-tokens/agent-auth/agent/register`

```ts
const { data } = await client.registerAgent(
  null,
  {
    name: 'epilot CLI @ laptop',
    host_name: 'Claude Code on laptop',
    capabilities: ['string'],
    mode: 'delegated',
    reason: 'Fix the entity mapping of the PV registration journey so submissions create an opportunity again',
    preferred_method: 'device_authorization',
    login_hint: 'string',
    binding_message: 'string',
    approval_return_uri: 'https://example.com/path',
    client: 'epilot-mcp'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "agent_5ZugdRXasLfWBypHi93Fk",
  "host_id": "string",
  "name": "string",
  "mode": "delegated",
  "status": "active",
  "agent_capability_grants": [
    {
      "id": "grant_5ZugdRXasLfWBypHi93Fk",
      "capability": "string",
      "status": "active",
      "description": "string",
      "input": {},
      "output": {},
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "granted_by": "string",
      "denied_by": "string",
      "reason": "string",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "approval": {
    "method": "device_authorization",
    "verification_uri": "https://portal.epilot.cloud/login?agent_approval",
    "verification_uri_complete": "https://portal.epilot.cloud/login?agent_approval=WDJB-MJHT&agent_issuer=https%3A%2F%2Faccess-token.sls.epilot.io%2Fv1%2Fagent-auth",
    "user_code": "WDJB-MJHT",
    "expires_in": 600,
    "interval": 5
  }
}
```

</details>

---

### `getAgentStatus`

Full agent state incl. grants; host JWT of the owning host (spec §5.5)

`GET /v1/access-tokens/agent-auth/agent/status`

```ts
const { data } = await client.getAgentStatus({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "host_id": "string",
  "name": "string",
  "status": "pending",
  "mode": "delegated",
  "user_id": "string",
  "owner_user_id": "string",
  "agent_capability_grants": [
    {
      "id": "grant_5ZugdRXasLfWBypHi93Fk",
      "capability": "string",
      "status": "active",
      "description": "string",
      "input": {},
      "output": {},
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "granted_by": "string",
      "denied_by": "string",
      "reason": "string",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "last_used_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "approval": {
    "method": "device_authorization",
    "verification_uri": "https://portal.epilot.cloud/login?agent_approval",
    "verification_uri_complete": "https://portal.epilot.cloud/login?agent_approval=WDJB-MJHT&agent_issuer=https%3A%2F%2Faccess-token.sls.epilot.io%2Fv1%2Fagent-auth",
    "user_code": "WDJB-MJHT",
    "expires_in": 600,
    "interval": 5
  }
}
```

</details>

---

### `requestCapability`

Asks the user for additional grants (spec §5.4), e.g. access to another organization or write access.
Agent JWT (`aud` = issuer). Returns only the newly created pending grants plus an approval object.

`POST /v1/access-tokens/agent-auth/agent/request-capability`

```ts
const { data } = await client.requestCapability(
  null,
  {
    capabilities: ['string'],
    reason: 'stringstri',
    preferred_method: 'string',
    login_hint: 'string',
    binding_message: 'string',
    approval_return_uri: 'https://example.com/path'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "agent_capability_grants": [
    {
      "id": "grant_5ZugdRXasLfWBypHi93Fk",
      "capability": "string",
      "status": "active",
      "description": "string",
      "input": {},
      "output": {},
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "granted_by": "string",
      "denied_by": "string",
      "reason": "string",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "approval": {
    "method": "device_authorization",
    "verification_uri": "https://portal.epilot.cloud/login?agent_approval",
    "verification_uri_complete": "https://portal.epilot.cloud/login?agent_approval=WDJB-MJHT&agent_issuer=https%3A%2F%2Faccess-token.sls.epilot.io%2Fv1%2Fagent-auth",
    "user_code": "WDJB-MJHT",
    "expires_in": 600,
    "interval": 5
  }
}
```

</details>

---

### `reactivateAgent`

Reactivates an `expired` agent within its absolute lifetime; old grants are revoked and host default capabilities re-granted (spec §5.6)

`POST /v1/access-tokens/agent-auth/agent/reactivate`

```ts
const { data } = await client.reactivateAgent(
  null,
  {
    agent_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "status": "pending",
  "agent_capability_grants": [
    {
      "id": "grant_5ZugdRXasLfWBypHi93Fk",
      "capability": "string",
      "status": "active",
      "description": "string",
      "input": {},
      "output": {},
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "granted_by": "string",
      "denied_by": "string",
      "reason": "string",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "activated_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `revokeAgent`

Revokes an agent permanently and deletes the epilot access tokens it obtained (spec §5.7)

`POST /v1/access-tokens/agent-auth/agent/revoke`

```ts
const { data } = await client.revokeAgent(
  null,
  {
    agent_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "status": "revoked"
}
```

</details>

---

### `rotateAgentKey`

Replaces the agent's Ed25519 public key (spec §5.8)

`POST /v1/access-tokens/agent-auth/agent/rotate-key`

```ts
const { data } = await client.rotateAgentKey(
  null,
  {
    agent_id: 'string',
    public_key: {
      kty: 'OKP',
      crv: 'Ed25519',
      x: 'string',
      kid: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "status": "pending"
}
```

</details>

---

### `rotateHostKey`

Replaces the host's Ed25519 key (spec §5.9). The host id is the key thumbprint, so the response carries the
new `host_id`; agents move to the new host id and keep working with `iss` = new thumbprint.

`POST /v1/access-tokens/agent-auth/host/rotate-key`

```ts
const { data } = await client.rotateHostKey(
  null,
  {
    public_key: {
      kty: 'OKP',
      crv: 'Ed25519',
      x: 'string',
      kid: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "host_id": "string",
  "status": "string"
}
```

</details>

---

### `revokeHost`

Revokes the host and cascades to all its agents and their epilot access tokens (spec §5.10)

`POST /v1/access-tokens/agent-auth/host/revoke`

```ts
const { data } = await client.revokeHost()
```

<details>
<summary>Response</summary>

```json
{
  "host_id": "string",
  "status": "revoked",
  "agents_revoked": 0
}
```

</details>

---

### `executeCapability`

Executes a capability (spec §5.11). Agent JWT with `aud` = this URL. Synchronous: `{ data }`.

`POST /v1/access-tokens/agent-auth/capability/execute`

```ts
const { data } = await client.executeCapability(
  null,
  {
    capability: 'epilot.access_token.issue',
    arguments: {
      organization_id: '739224',
      access_profile: 'config:read',
      anonymize: true
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": {}
}
```

</details>

---

### `introspectAgent`

Validates an agent JWT and returns its compact state (spec §5.12). Requires an epilot bearer token; rate limited.

`POST /v1/access-tokens/agent-auth/agent/introspect`

```ts
const { data } = await client.introspectAgent(
  null,
  {
    token: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "active": true,
  "agent_id": "string",
  "host_id": "string",
  "user_id": "string",
  "mode": "delegated",
  "agent_capability_grants": [
    {
      "capability": "string",
      "status": "active"
    }
  ],
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getAgentApproval`

epilot extension for the epilot 360 login approval page: what the agent is asking for.
Public, rate limited per source IP.

`GET /v1/access-tokens/agent-auth/approvals/{user_code}`

```ts
const { data } = await client.getAgentApproval({
  user_code: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "agent_name": "string",
  "host_name": "string",
  "client": "string",
  "host_linked": true,
  "agent_has_active_grants": true,
  "mode": "delegated",
  "reason": "string",
  "requested_grants": [
    {
      "grant_id": "string",
      "capability": "string",
      "status": "active",
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "reason": "string",
      "profile_options": [
        {
          "access_profile": "config:write",
          "title": "Change configuration",
          "description": "string",
          "read_only": true,
          "anonymize_allowed": true,
          "allowed_actions": ["journey:*", "automation:*", "entity:view"],
          "expires_in": 86400
        }
      ]
    }
  ],
  "expires_at": "1970-01-01T00:00:00.000Z",
  "approval_return_uri": "https://example.com/path",
  "status": "pending"
}
```

</details>

---

### `decideAgentApproval`

epilot extension: approve or deny the pending grants of a device authorization with an epilot login token.
Approved grants are scoped to the login organization; `read_only` / `anonymize` may only be t

`POST /v1/access-tokens/agent-auth/approvals/{user_code}`

```ts
const { data } = await client.decideAgentApproval(
  {
    user_code: 'example',
  },
  {
    decision: 'approve',
    reason: 'string',
    grants: [
      {
        grant_id: 'string',
        constraints: {
          organization_id: '739224',
          access_profile: 'config:read',
          read_only: true,
          anonymize: true
        },
        expires_in: 604800
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "approved",
  "agent_id": "string",
  "agent_status": "pending",
  "grants": [
    {
      "grant_id": "string",
      "capability": "string",
      "status": "active",
      "constraints": {
        "organization_id": "739224",
        "access_profile": "config:read",
        "read_only": true,
        "anonymize": true
      },
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "approval_return_uri": "https://example.com/path"
}
```

</details>

---

### `listOrganizationAgents`

epilot extension for the Access Tokens settings: the AI agents with access to the caller's organization,
with the users who approved them, their purpose and the tokens they hold there. First-party age

`GET /v1/access-tokens/agent-auth/agents`

```ts
const { data } = await client.listOrganizationAgents()
```

<details>
<summary>Response</summary>

```json
[
  {
    "agent_id": "string",
    "name": "string",
    "client": "epilot-mcp",
    "status": "pending",
    "mode": "delegated",
    "first_party": true,
    "owner": {
      "user_id": "string",
      "email": "string"
    },
    "registered_by": "epilot_service",
    "service_purpose": "blueprint-tests.suggest",
    "host": {
      "id": "string",
      "name": "string"
    },
    "approved_by": [
      {
        "user_id": "string",
        "email": "string"
      }
    ],
    "purpose": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "last_used_at": "1970-01-01T00:00:00.000Z",
    "tokens": [
      {
        "id": "string",
        "name": "string",
        "access_profile": "config:write",
        "read_only": true,
        "anonymize": true,
        "created_at": "1970-01-01T00:00:00.000Z",
        "expires_at": "1970-01-01T00:00:00.000Z",
        "last_used": "string"
      }
    ]
  }
]
```

</details>

---

### `revokeOrganizationAgent`

epilot extension: ends an agent's access to the caller's organization. Deletes its grants approved for
the organization and revokes every token issued there; access in other organizations stays. For a

`DELETE /v1/access-tokens/agent-auth/agents/{agent_id}`

```ts
const { data } = await client.revokeOrganizationAgent({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "organization_id": "string",
  "revoked_grants": 0,
  "revoked_tokens": 0
}
```

</details>

---

### `exchangeAgentToken`

epilot extension for first-party hosts: an epilot service acting for a logged-in user (the Agents API for
Luna) exchanges the user's login token (Authorization header) for a short-lived agent token, w

`POST /v1/access-tokens/agent-auth/token-exchange`

```ts
const { data } = await client.exchangeAgentToken(
  null,
  {
    actor_token: 'string',
    agent_id: 'luna',
    access_profile: 'config:write',
    read_only: true,
    anonymize: true,
    expires_in: 30,
    run_id: 'string',
    channel: 'chat'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "token": "string",
  "token_id": "agent_V1StGXR8_Z5jdHi6B-myT",
  "organization_id": "string",
  "user_id": "string",
  "access_profile": "config:write",
  "read_only": true,
  "anonymize": true,
  "allowed_actions": ["string"],
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `registerFirstPartyAgent`

epilot extension for first-party hosts: while a user is logged in, an epilot service (the Agents API)
registers an Agent Auth agent for them, without a device approval, and later mints tokens with the

`POST /v1/access-tokens/agent-auth/first-party/agents`

```ts
const { data } = await client.registerFirstPartyAgent(
  null,
  {
    actor_token: 'string',
    agent_id: 'luna',
    agent_public_key: {
      kty: 'OKP',
      crv: 'Ed25519',
      x: 'string',
      kid: 'string'
    },
    mode: 'delegated',
    access_profile: 'config:write',
    anonymize: true,
    expires_in: 60,
    reason: 'stringstri',
    run_id: 'string',
    channel: 'background',
    name: 'Email labelling'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "mode": "delegated",
  "status": "pending",
  "organization_id": "string",
  "access_profile": "config:write",
  "allowed_actions": ["string"],
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `registerPreviewOrgAgent`

epilot extension for first-party hosts: an epilot service (the Agents API, started by a backend workflow)
registers an **autonomous** agent in a **preview organization** while no person is logged in, 

`POST /v1/access-tokens/agent-auth/first-party/preview-agents`

```ts
const { data } = await client.registerPreviewOrgAgent(
  {
    x-ivy-org-id: 'example',
  },
  {
    actor_token: 'string',
    agent_id: 'luna',
    agent_public_key: {
      kty: 'OKP',
      crv: 'Ed25519',
      x: 'string',
      kid: 'string'
    },
    owner_user_id: '10010729',
    purpose: 'blueprint-tests.suggest',
    mode: 'autonomous',
    access_profile: 'config:write',
    anonymize: true,
    expires_in: 60,
    reason: 'stringstri',
    run_id: 'string',
    channel: 'background',
    name: 'Configuration Agent'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "agent_id": "string",
  "mode": "delegated",
  "status": "pending",
  "organization_id": "string",
  "access_profile": "config:write",
  "allowed_actions": ["string"],
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

## Schemas

### `AgentAuthError`

```ts
type AgentAuthError = {
  error: string
  message: string
  violations?: Array<{
    field?: string
    constraint?: unknown
    actual?: unknown
  }>
  unknown_operators?: string[]
  invalid_capabilities?: string[]
}
```

### `AgentMode`

```ts
type AgentMode = "delegated" | "autonomous"
```

### `AgentStatus`

```ts
type AgentStatus = "pending" | "active" | "expired" | "revoked" | "rejected" | "claimed"
```

### `GrantStatus`

`expired`: an active escalation grant whose `expires_at` has passed (reported, never stored)

```ts
type GrantStatus = "active" | "pending" | "denied" | "expired"
```

### `AccessProfile`

Access profile of an `epilot.access_token.issue` grant / token (constraint `access_profile`, default `read`).
Downgrade lattice: `full` → `config:write`, `data:write`, `config:read`, `data:read`, `read`;
`config:write` → `config:read`, `read`; `data:write` → `data:read`, `read`; `*:read` → `read`.
R

```ts
type AccessProfile = "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
```

### `ProfileOption`

One selectable profile on the approval page (the requested profile or a downgrade of it)

```ts
type ProfileOption = {
  access_profile: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
  title: string
  description: string
  read_only: boolean
  anonymize_allowed: boolean
  allowed_actions?: string[]
  expires_in?: number
}
```

### `IssuedAgentToken`

An agent token (persisted `api` token with an `actor` claim), as `epilot.access_token.issue` returns it

```ts
type IssuedAgentToken = {
  token: string
  token_id: string
  organization_id: string
  user_id: string
  access_profile: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
  read_only: boolean
  anonymize: boolean
  allowed_actions?: string[]
  expires_at: string // date-time
}
```

### `Ed25519PublicKey`

```ts
type Ed25519PublicKey = {
  kty: "OKP"
  crv: "Ed25519"
  x: string
  kid?: string
}
```

### `Constraints`

Constraints on top-level capability input fields (spec §2.13): an exact value or an operator object
`{ min, max, in, not_in }`. epilot: `organization_id`, `access_profile` (exact value only), `read_only`,
`anonymize` on `epilot.access_token.issue`. A write profile with `read_only: true` is normalise

```ts
type Constraints = Record<string, unknown>
```

### `CapabilityRequest`

```ts
type CapabilityRequest = string | {
  name: string
  constraints?: Record<string, unknown>
}
```

### `Capability`

```ts
type Capability = {
  name: string
  description: string
  location?: string // uri
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  grant_status?: "granted" | "not_granted"
}
```

### `CapabilityGrant`

```ts
type CapabilityGrant = {
  id: string
  capability: string
  status: "active" | "pending" | "denied" | "expired"
  description?: string
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  constraints?: Record<string, unknown>
  granted_by?: string
  denied_by?: string
  reason?: string
  expires_at?: string // date-time
  created_at?: string // date-time
}
```

### `DeviceAuthorizationApproval`

```ts
type DeviceAuthorizationApproval = {
  method: "device_authorization"
  verification_uri: string // uri
  verification_uri_complete?: string // uri
  user_code: string
  expires_in: number
  interval: number
}
```

### `AgentConfiguration`

```ts
type AgentConfiguration = {
  version?: string
  provider_name?: string
  description?: string
  issuer?: string // uri
  default_location?: string // uri
  algorithms?: string[]
  modes?: "delegated" | "autonomous"[]
  approval_methods?: string[]
  endpoints?: Record<string, string>
  jwks_uri?: string // uri
}
```

### `RegisterAgentRequest`

```ts
type RegisterAgentRequest = {
  name: string
  host_name?: string
  capabilities: Array<string | {
    name: string
    constraints?: Record<string, unknown>
  }>
  mode?: "delegated" | "autonomous"
  reason?: string
  preferred_method?: string
  login_hint?: string
  binding_message?: string
  approval_return_uri?: string // uri
  client?: string
}
```

### `RegisterAgentResponse`

```ts
type RegisterAgentResponse = {
  agent_id: string
  host_id: string
  name: string
  mode: "delegated" | "autonomous"
  status: "active" | "pending"
  agent_capability_grants: Array<{
    id: string
    capability: string
    status: "active" | "pending" | "denied" | "expired"
    description?: string
    input?: Record<string, unknown>
    output?: Record<string, unknown>
    constraints?: Record<string, unknown>
    granted_by?: string
    denied_by?: string
    reason?: string
    expires_at?: string // date-time
    created_at?: string // date-time
  }>
  approval?: {
    method: "device_authorization"
    verification_uri: string // uri
    verification_uri_complete?: string // uri
    user_code: string
    expires_in: number
    interval: number
  }
}
```

### `RequestCapabilityRequest`

```ts
type RequestCapabilityRequest = {
  capabilities: Array<string | {
    name: string
    constraints?: Record<string, unknown>
  }>
  reason?: string
  preferred_method?: string
  login_hint?: string
  binding_message?: string
  approval_return_uri?: string // uri
}
```

### `RequestCapabilityResponse`

```ts
type RequestCapabilityResponse = {
  agent_id: string
  agent_capability_grants: Array<{
    id: string
    capability: string
    status: "active" | "pending" | "denied" | "expired"
    description?: string
    input?: Record<string, unknown>
    output?: Record<string, unknown>
    constraints?: Record<string, unknown>
    granted_by?: string
    denied_by?: string
    reason?: string
    expires_at?: string // date-time
    created_at?: string // date-time
  }>
  approval?: {
    method: "device_authorization"
    verification_uri: string // uri
    verification_uri_complete?: string // uri
    user_code: string
    expires_in: number
    interval: number
  }
}
```

### `AgentIdRequest`

```ts
type AgentIdRequest = {
  agent_id: string
}
```

### `AgentStatusResponse`

```ts
type AgentStatusResponse = {
  agent_id: string
  host_id: string
  name: string
  status: "pending" | "active" | "expired" | "revoked" | "rejected" | "claimed"
  mode: "delegated" | "autonomous"
  user_id?: string
  owner_user_id?: string
  agent_capability_grants: Array<{
    id: string
    capability: string
    status: "active" | "pending" | "denied" | "expired"
    description?: string
    input?: Record<string, unknown>
    output?: Record<string, unknown>
    constraints?: Record<string, unknown>
    granted_by?: string
    denied_by?: string
    reason?: string
    expires_at?: string // date-time
    created_at?: string // date-time
  }>
  created_at: string // date-time
  activated_at?: string // date-time
  last_used_at?: string // date-time
  expires_at?: string // date-time
  approval?: {
    method: "device_authorization"
    verification_uri: string // uri
    verification_uri_complete?: string // uri
    user_code: string
    expires_in: number
    interval: number
  }
}
```

### `OrganizationAgent`

```ts
type OrganizationAgent = {
  agent_id: string
  name: string
  client?: string
  status: "pending" | "active" | "expired" | "revoked" | "rejected" | "claimed"
  mode: "delegated" | "autonomous"
  first_party?: boolean
  owner?: {
    user_id: string
    email?: string
  }
  registered_by?: "epilot_service"
  service_purpose?: string
  host: {
    id: string
    name?: string
  }
  approved_by: Array<{
    user_id: string
    email?: string
  }>
  purpose?: string
  created_at: string // date-time
  last_used_at?: string // date-time
  tokens: Array<{
    id: string
    name?: string
    access_profile?: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
    read_only?: boolean
    anonymize?: boolean
    created_at?: string // date-time
    expires_at?: string // date-time
    last_used?: string
  }>
}
```

### `AgentApproval`

```ts
type AgentApproval = {
  agent_id: string
  agent_name: string
  host_name?: string
  client?: string
  host_linked?: boolean
  agent_has_active_grants?: boolean
  mode: "delegated" | "autonomous"
  reason?: string
  requested_grants: Array<{
    grant_id: string
    capability: string
    status: "active" | "pending" | "denied" | "expired"
    constraints?: Record<string, unknown>
    reason?: string
    profile_options?: Array<{
      access_profile: { ... }
      title: { ... }
      description: { ... }
      read_only: { ... }
      anonymize_allowed: { ... }
      allowed_actions?: { ... }
      expires_in?: { ... }
    }>
  }>
  expires_at: string // date-time
  approval_return_uri?: string // uri
  status: "pending" | "approved" | "denied" | "expired"
}
```

### `AgentApprovalDecision`

```ts
type AgentApprovalDecision = {
  decision: "approve" | "deny"
  reason?: string
  grants?: Array<{
    grant_id: string
    constraints?: Record<string, unknown>
    expires_in?: number
  }>
}
```

### `AccessToken`

A JWT Access Token

```ts
type AccessToken = string
```

### `AccessTokenId`

```ts
type AccessTokenId = string
```

### `AccessTokenName`

Human readable name for access token

```ts
type AccessTokenName = string
```

### `AccessTokenType`

Access token type

```ts
type AccessTokenType = "api" | "journey" | "portal" | "assume" | "app" | "portal_preview" | "contact_identification"
```

### `AccessTokenJourneyId`

Journey ID for access token type "journey"

```ts
type AccessTokenJourneyId = string
```

### `PortalId`

Portal ID for access token type "portal"

```ts
type PortalId = string
```

### `PortalUserId`

Portal User ID for access token type "portal_preview"

```ts
type PortalUserId = string
```

### `ContactId`

Contact entity ID for access token type "contact_identification"

```ts
type ContactId = string
```

### `AllowedOperations`

openapi operationIds the token may call. Enforced by the API that consumes the token, which must additionally deny any operation not on this list. Baked into the token at issue time so widening the consumer's own allowlist later cannot retroactively widen a token that is already in circulation.

```ts
type AllowedOperations = string[]
```

### `TokenParameters`

```ts
type TokenParameters = {
  name: string
  token_type?: "api"
  assignments?: string[]
  expires_in?: number | string
  read_only?: boolean
  anonymize?: boolean
} | {
  name: string
  token_type?: "journey"
  journey_id: string
  expires_in?: number | string
} | {
  name: string
  token_type?: "portal"
  portal_id: string
  expires_in?: number | string
} | {
  name: string
  token_type?: "assume"
  assignments?: string[]
  read_only?: boolean
  anonymize?: boolean
} | {
  name: string
  token_type?: "app"
  assignments?: string[]
  expires_in?: number | string
  read_only?: boolean
  anonymize?: boolean
} | {
  name: string
  token_type?: "portal_preview"
  portal_id: string
  portal_user_id: string
} | {
  name: string
  token_type?: "contact_identification"
  portal_id: string
  contact_id: string
  surface_id: string
  allowed_operations: string[]
  expires_in: number
  email?: string
}
```

### `ExpiresIn`

```ts
type ExpiresIn = number | string
```

### `ReadOnly`

When true, the issued token may only perform read-only actions. Any action guarded by permissions that is not read-only (i.e. not a view/export/download action) is denied, regardless of the roles the token carries.

```ts
type ReadOnly = boolean
```

### `Anonymize`

Forces PII anonymization on all entity data returned to this token. Cannot be disabled by the token bearer. See entity-api anonymized responses.

```ts
type Anonymize = boolean
```

### `AccessTokenParameters`

```ts
type AccessTokenParameters = {
  name: string
  token_type?: "api"
  assignments?: string[]
  expires_in?: number | string
  read_only?: boolean
  anonymize?: boolean
}
```

### `JourneyTokenParameters`

```ts
type JourneyTokenParameters = {
  name: string
  token_type?: "journey"
  journey_id: string
  expires_in?: number | string
}
```

### `PortalTokenParameters`

```ts
type PortalTokenParameters = {
  name: string
  token_type?: "portal"
  portal_id: string
  expires_in?: number | string
}
```

### `AssumeTokenParameters`

```ts
type AssumeTokenParameters = {
  name: string
  token_type?: "assume"
  assignments?: string[]
  read_only?: boolean
  anonymize?: boolean
}
```

### `AppTokenParameters`

A token an app acts through, e.g. a Custom Page. Besides the usual claims it carries an `actor` claim `{ type: 'app', app_id, user_id }`, following the convention of agent tokens: `app_id` is the app whose role ``<org_id>`:`<app_id>`` is the token's single assignment, `user_id` the user whose session mi

```ts
type AppTokenParameters = {
  name: string
  token_type?: "app"
  assignments?: string[]
  expires_in?: number | string
  read_only?: boolean
  anonymize?: boolean
}
```

### `PortalPreviewTokenParameters`

```ts
type PortalPreviewTokenParameters = {
  name: string
  token_type?: "portal_preview"
  portal_id: string
  portal_user_id: string
}
```

### `ContactIdentificationTokenParameters`

A token that acts as one contact, issued after that contact was identified by a portal's registration identifiers rather than by logging in. Distinct from portal_preview, which impersonates an existing portal user for a 360 operator: this kind belongs to no user, is minted for an unauthenticated cal

```ts
type ContactIdentificationTokenParameters = {
  name: string
  token_type?: "contact_identification"
  portal_id: string
  contact_id: string
  surface_id: string
  allowed_operations: string[]
  expires_in: number
  email?: string
}
```

### `AccessTokenItem`

```ts
type AccessTokenItem = {
  id: string
  created_at: string // date-time
  name: string
  token_type?: "api" | "journey" | "portal" | "assume" | "app" | "portal_preview" | "contact_identification"
  journey_id?: string
  portal_id?: string
  portal_user_id?: string
  contact_id?: string
  allowed_operations?: string[]
  assignments?: string[]
  read_only?: boolean
  anonymize?: boolean
  last_used?: string // date
  expires_at?: string // date-time
}
```

### `RoleId`

Format: `<organization_id>`:`<slug>`

```ts
type RoleId = string
```

### `Assignments`

List of role ids attached to an user

```ts
type Assignments = string[]
```
