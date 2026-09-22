# Identity API

- **Base URL:** `https://id.epilot.cloud`
- **API Docs:** [https://docs.epilot.io/api/identity](https://docs.epilot.io/api/identity)

epilot as an OpenID Connect provider ("Sign in with epilot").

## Quick Start

```bash
# List available operations
epilot identity

# Call an operation
epilot identity listClients
```

## Common Flags

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Operator Clients**
- [`listClients`](#listclients) — List registered partner clients. The client secret is never returned.
- [`createClient`](#createclient) — Create a partner client in `draft` status. The client secret is returned exactly once in this
- [`getClient`](#getclient) — Read a partner client. The client secret is never returned.
- [`updateClient`](#updateclient) — Replace the mutable configuration of a client. `config_version` must equal the current
- [`retireClient`](#retireclient) — Retire a client. The record is kept as a tombstone, the `client_id` is never reused, every
- [`activateClient`](#activateclient) — Activate a `draft` or `suspended` client. Validates that every redirect URI is an absolute
- [`suspendClient`](#suspendclient) — Immediately block the client for every organization. Provider-side artefacts (codes, tokens,
- [`rotateClientSecret`](#rotateclientsecret) — Issue a new client secret. The new secret is returned exactly once. The previous secret

**Operator Organizations**
- [`listClientOrganizations`](#listclientorganizations) — List the organizations enabled on a client, including suspended and revoked ones.
- [`enableClientOrganization`](#enableclientorganization) — Enable an epilot organization on a client, recording the customer's authorization policy
- [`getClientOrganization`](#getclientorganization) — Read one organization enablement.
- [`updateClientOrganization`](#updateclientorganization) — Record a new version of the customer's authorization policy. `expected_policy_version` must
- [`revokeClientOrganization`](#revokeclientorganization) — Revoke an organization's enablement. The record is kept as an audited tombstone; future
- [`suspendClientOrganization`](#suspendclientorganization) — Temporarily block one organization on this client. Reversible with `activateClientOrganization`.
- [`activateClientOrganization`](#activateclientorganization) — Resume a suspended organization on this client. Revoked enablements cannot be re-activated; enabling the organization ag

**Session**
- [`createIdentitySession`](#createidentitysession) — Called by the epilot portal through the portal-host proxy after every persisted 360 session.
- [`deleteIdentitySession`](#deleteidentitysession) — Clears the `identity_session` cookie. Called by the portal on logout.

**Launch**
- [`launchClient`](#launchclient) — One validated place for partner start links (manager UI, hosted apps). Redirects the browser to the

### `listClients`

List registered partner clients. The client secret is never returned.

`GET /v1/identity/operator/clients`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_key` | query | string | No | Filter by partner key |
| `status` | query | "draft" \| "active" \| "suspended" \| "retired" | No |  |
| `size` | query | number | No |  |
| `cursor` | query | string | No | Opaque cursor from a previous response |

**Sample Call**

```bash
epilot identity listClients
```

With JSONata filter:

```bash
epilot identity listClients --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

### `createClient`

Create a partner client in `draft` status. The client secret is returned exactly once in this

`POST /v1/identity/operator/clients`

**Request Body** (required)

**Sample Call**

```bash
epilot identity createClient
```

With request body:

```bash
epilot identity createClient \
  -d '{
  "partner_key": "babelforce",
  "display_name": "Babelforce",
  "description": "string",
  "environment": "dev",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "scopes_allowed": ["openid"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot identity createClient
```

With JSONata filter:

```bash
epilot identity createClient --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

### `getClient`

Read a partner client. The client secret is never returned.

`GET /v1/identity/operator/clients/{client_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot identity getClient \
  -p client_id=bf-prod-x7k2
```

Using positional args for path parameters:

```bash
epilot identity getClient bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity getClient -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`PUT /v1/identity/operator/clients/{client_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot identity updateClient \
  -p client_id=bf-prod-x7k2
```

With request body:

```bash
epilot identity updateClient \
  -p client_id=bf-prod-x7k2 \
  -d '{
  "config_version": 1,
  "allow_sector_change": false,
  "display_name": "string",
  "description": "string",
  "redirect_uris": ["https://partner.example.com/auth/callback"],
  "sector_identifier_uri": "https://partner.example.com/auth/callback",
  "initiate_login_uri": "https://partner.example.com/auth/callback",
  "launch_target_prefixes": ["string"],
  "scopes_allowed": ["openid"]
}'
```

Using positional args for path parameters:

```bash
epilot identity updateClient bf-prod-x7k2
```

Using stdin pipe:

```bash
cat body.json | epilot identity updateClient -p client_id=bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity updateClient -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`DELETE /v1/identity/operator/clients/{client_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot identity retireClient \
  -p client_id=bf-prod-x7k2
```

Using positional args for path parameters:

```bash
epilot identity retireClient bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity retireClient -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/identity/operator/clients/{client_id}:activate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot identity activateClient \
  -p client_id=bf-prod-x7k2
```

Using positional args for path parameters:

```bash
epilot identity activateClient bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity activateClient -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/identity/operator/clients/{client_id}:suspend`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot identity suspendClient \
  -p client_id=bf-prod-x7k2 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot identity suspendClient bf-prod-x7k2
```

Using stdin pipe:

```bash
cat body.json | epilot identity suspendClient -p client_id=bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity suspendClient -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/identity/operator/clients/{client_id}:rotateSecret`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot identity rotateClientSecret \
  -p client_id=bf-prod-x7k2 \
  -d '{"compromise_mode":false,"migration_window_seconds":86400}'
```

Using positional args for path parameters:

```bash
epilot identity rotateClientSecret bf-prod-x7k2
```

Using stdin pipe:

```bash
cat body.json | epilot identity rotateClientSecret -p client_id=bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity rotateClientSecret -p client_id=bf-prod-x7k2 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `status` | query | "active" \| "suspended" \| "revoked" | No |  |

**Sample Call**

```bash
epilot identity listClientOrganizations \
  -p client_id=bf-prod-x7k2
```

Using positional args for path parameters:

```bash
epilot identity listClientOrganizations bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity listClientOrganizations -p client_id=bf-prod-x7k2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

`POST /v1/identity/operator/clients/{client_id}/organizations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot identity enableClientOrganization \
  -p client_id=bf-prod-x7k2
```

With request body:

```bash
epilot identity enableClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -d '{
  "org_id": "739224",
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot identity enableClientOrganization bf-prod-x7k2
```

Using stdin pipe:

```bash
cat body.json | epilot identity enableClientOrganization -p client_id=bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity enableClientOrganization -p client_id=bf-prod-x7k2 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `org_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot identity getClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224
```

Using positional args for path parameters:

```bash
epilot identity getClientOrganization bf-prod-x7k2 739224
```

With JSONata filter:

```bash
epilot identity getClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`PUT /v1/identity/operator/clients/{client_id}/organizations/{org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `org_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot identity updateClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224
```

With request body:

```bash
epilot identity updateClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224 \
  -d '{
  "expected_policy_version": 1,
  "authorization_policy": {
    "mode": "preauthorized",
    "population": "all_current_org_members",
    "allowed_scopes": ["openid"],
    "customer_approval_ref": "string",
    "approved_at": "1970-01-01T00:00:00.000Z"
  },
  "partner_account": {
    "id": "string",
    "label": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot identity updateClientOrganization bf-prod-x7k2 739224
```

Using stdin pipe:

```bash
cat body.json | epilot identity updateClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224
```

With JSONata filter:

```bash
epilot identity updateClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`DELETE /v1/identity/operator/clients/{client_id}/organizations/{org_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `org_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot identity revokeClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot identity revokeClientOrganization bf-prod-x7k2 739224
```

Using stdin pipe:

```bash
cat body.json | epilot identity revokeClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224
```

With JSONata filter:

```bash
epilot identity revokeClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `org_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot identity suspendClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot identity suspendClientOrganization bf-prod-x7k2 739224
```

Using stdin pipe:

```bash
cat body.json | epilot identity suspendClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224
```

With JSONata filter:

```bash
epilot identity suspendClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

Resume a suspended organization on this client. Revoked enablements cannot be re-activated; enabling the organization ag

`POST /v1/identity/operator/clients/{client_id}/organizations/{org_id}:activate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `org_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot identity activateClientOrganization \
  -p client_id=bf-prod-x7k2 \
  -p org_id=739224
```

Using positional args for path parameters:

```bash
epilot identity activateClientOrganization bf-prod-x7k2 739224
```

With JSONata filter:

```bash
epilot identity activateClientOrganization -p client_id=bf-prod-x7k2 -p org_id=739224 --jsonata 'client_id'
```

<details>
<summary>Sample Response</summary>

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

`GET /v1/identity/session`

**Sample Call**

```bash
epilot identity createIdentitySession
```

With JSONata filter:

```bash
epilot identity createIdentitySession --jsonata 'org_id'
```

<details>
<summary>Sample Response</summary>

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

**Sample Call**

```bash
epilot identity deleteIdentitySession
```

With JSONata filter:

```bash
epilot identity deleteIdentitySession --jsonata '$'
```

---

### `launchClient`

One validated place for partner start links (manager UI, hosted apps). Redirects the browser to the

`GET /v1/identity/launch/{client_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes |  |
| `target` | query | string (uri) | No | Deep link inside the partner application to continue to after login |
| `extra` | query | object | No | Any other query parameters (marketing tags on a start link, parameters a proxy appends) are accepted
and ignored. Start links and the session hop must never fail on an unknown parameter.
 |

**Sample Call**

```bash
epilot identity launchClient \
  -p client_id=bf-prod-x7k2
```

Using positional args for path parameters:

```bash
epilot identity launchClient bf-prod-x7k2
```

With JSONata filter:

```bash
epilot identity launchClient -p client_id=bf-prod-x7k2 --jsonata '$'
```

---
