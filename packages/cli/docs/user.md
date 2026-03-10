# User API

- **Base URL:** `https://user.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/user](https://docs.epilot.io/api/user)

Manage users in epilot organization(s)

## Quick Start

```bash
# List available operations
epilot user

# Call an operation
epilot user signUpUser
```

## Operations

**User V2**
- [`signUpUser`](#signupuser) — POST /v2/users/public/signup
- [`getMeV2`](#getmev2) — Get currently logged in user
- [`listUsersV2`](#listusersv2) — Get the list of organization users
- [`getUserV2`](#getuserv2) — Get user details by user id
- [`updateUserV2`](#updateuserv2) — Update user details
- [`deleteUserV2`](#deleteuserv2) — Delete user by user id
- [`inviteUser`](#inviteuser) — Creates a new user in the caller's organization and sends an invite email to activate the user
- [`resendUserInvitation`](#resenduserinvitation) — Resend user invitation email
- [`getGroupsForUser`](#getgroupsforuser) — Get groups of a user
- [`verifyEmailWithToken`](#verifyemailwithtoken) — Update new email using an verification token
- [`checkInviteToken`](#checkinvitetoken) — Check an invite token
- [`activateUser`](#activateuser) — Activate user using an invite token
- [`rejectInvite`](#rejectinvite) — Reject an invite
- [`getUserLoginParametersV2`](#getuserloginparametersv2) — Get user organization login parameters by username
- [`beginPasskeyAuthentication`](#beginpasskeyauthentication) — Begin passkey authentication flow. Returns WebAuthn options and a signed challenge token.
- [`beginDiscoverablePasskeyAuthentication`](#begindiscoverablepasskeyauthentication) — Begin discoverable passkey authentication flow (no email required). Returns WebAuthn options with empty allowCredentials
- [`resolveDiscoverableCredential`](#resolvediscoverablecredential) — Resolve user identity from a discoverable passkey assertion. Returns the user's email and login parameters.
- [`beginPasskeyRegistration`](#beginpasskeyregistration) — Begin passkey registration flow for the authenticated user.
- [`completePasskeyRegistration`](#completepasskeyregistration) — Complete passkey registration by verifying the attestation response.
- [`listPasskeys`](#listpasskeys) — List all passkeys registered for the authenticated user.
- [`deletePasskey`](#deletepasskey) — Delete a passkey by credential ID.
- [`switchOrganization`](#switchorganization) — Switch to another organization the user is part of

**Group**
- [`getGroups`](#getgroups) — Lists groups in organizations you have access to
- [`createGroup`](#creategroup) — Create a new group
- [`getGroup`](#getgroup) — Get group by id
- [`updateGroup`](#updategroup) — Update group by id
- [`deleteGroup`](#deletegroup) — Delete group by id
- [`advanceUserAssignment`](#advanceuserassignment) — Advance user assignment to next user in line

**Navigation**
- [`createNavigation`](#createnavigation) — Create a new navigation configuration. Navigations are immutable and globally accessible across organizations.
- [`getNavigation`](#getnavigation) — Get a navigation configuration by ID

**User V1**
- [`getMe`](#getme) — Get currently logged in user
- [`listUsers`](#listusers) — Lists users in organizations you have access to
- [`getUser`](#getuser) — Get user by id
- [`getUserLoginParameters`](#getuserloginparameters) — Get user organization login parameters by username

### `signUpUser`

`POST /v2/users/public/signup`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | No | Partner invitation token |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user signUpUser
```

With request body:

```bash
epilot user signUpUser \
  -d '{
  "organization_detail": {
    "type": "Vendor",
    "name": "Epilot",
    "pricing_tier": "professional",
    "email": "string",
    "phone": "string",
    "website": "string",
    "is_privacy_policy_checked": false,
    "is_terms_and_conditions_checked": false
  },
  "user_detail": {
    "full_name": "Example user",
    "email": "user@example.com",
    "password": "AKjhdakjsdh@!34"
  },
  "language": "en"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot user signUpUser
```

With JSONata filter:

```bash
epilot user signUpUser --jsonata 'user'
```

<details>
<summary>Sample Response</summary>

```json
{
  "user": {
    "id": "string",
    "organization_id": "string",
    "email": "user@example.com",
    "display_name": "Example user",
    "name": "Example user",
    "preferred_language": "de",
    "signature": "<p>Thanks</p>",
    "custom_navigation": "5gbe4nkp6jsfq",
    "roles": ["Owner"],
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "properties": [
      {
        "name": "profileImageName",
        "value": "avatar.png"
      }
    ]
  },
  "organization": {
    "id": "string",
    "type": "Vendor",
    "name": "Epilot",
    "signature": "<p>Thanks</p>",
    "symbol": "EPI",
    "pricing_tier": "professional",
    "email": "someone@epilot.cloud",
    "phone": 49123123123,
    "website": "https://epilot.cloud",
    "address": {
      "country": "string",
      "city": "string",
      "postal_code": "string",
      "street": "string",
      "street_number": "string"
    },
    "logo_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
    "logo_thumbnail_url": "https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png",
    "is_unlicensed_org": false,
    "cognito_details": {
      "cognito_region": "eu-central-1",
      "cognito_user_pool_id": "eu-central-sample",
      "cognito_user_pool_client_id": "asbkh213ehkquwhdi",
      "cognito_user_pool_arn": "arn:aws:cognito-idp:eu-central-1:123456789012:userpool/eu-central-sample"
    }
  }
}
```

</details>

---

### `getMeV2`

Get currently logged in user

`GET /v2/users/me`

**Flags**

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

**Sample Call**

```bash
epilot user getMeV2
```

With JSONata filter:

```bash
epilot user getMeV2 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `listUsersV2`

Get the list of organization users

`GET /v2/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `query` | query | string | No | Query text to filter by |
| `limit` | query | number | No | Limit the results size |
| `offset` | query | number | No | Specify the offset |

**Flags**

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

**Sample Call**

```bash
epilot user listUsersV2
```

With JSONata filter:

```bash
epilot user listUsersV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {
        "feature_name": true
      },
      "image_uri": {
        "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
        "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
      },
      "favorites": {
        "entity_views": {
          "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
          "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
        },
        "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
      },
      "email_notification_setting": {
        "added_participant_opportunity": true,
        "assigned_opportunity": true,
        "assigned_task": true,
        "comment_opportunity": true,
        "deleted_task": true,
        "escalated_task": true,
        "message_receive_opportunity": true,
        "message_send_opportunity": true,
        "created_task": true,
        "created_opportunity_manual": true,
        "created_opportunity_auto": true,
        "deleted_opportunity": true
      },
      "properties": [
        {
          "name": "profileImageName",
          "value": "avatar.png"
        }
      ]
    }
  ]
}
```

</details>

---

### `getUserV2`

Get user details by user id

`GET /v2/users/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of user |

**Flags**

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

**Sample Call**

```bash
epilot user getUserV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user getUserV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user getUserV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `updateUserV2`

Update user details

`PATCH /v2/users/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of user |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user updateUserV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot user updateUserV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot user updateUserV2 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot user updateUserV2 -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user updateUserV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `deleteUserV2`

Delete user by user id

`DELETE /v2/users/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of user |

**Flags**

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

**Sample Call**

```bash
epilot user deleteUserV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user deleteUserV2 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user deleteUserV2 -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "email": "user@example.com",
  "display_name": "Example user",
  "name": "Example user",
  "preferred_language": "de",
  "signature": "<p>Thanks</p>",
  "custom_navigation": "5gbe4nkp6jsfq",
  "roles": ["Owner"],
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `inviteUser`

Creates a new user in the caller's organization and sends an invite email to activate the user

`POST /v2/users/invite`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user inviteUser \
  -d '{"email":"test@example.com","language":"en","roles":["123:owner"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot user inviteUser
```

With JSONata filter:

```bash
epilot user inviteUser --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `resendUserInvitation`

Resend user invitation email

`POST /v2/users/invite:resendEmail`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user resendUserInvitation \
  -d '{"email":"test@example.com","language":"en"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user resendUserInvitation
```

With JSONata filter:

```bash
epilot user resendUserInvitation --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "activated_at": "1970-01-01T00:00:00.000Z",
  "display_name": "Example User",
  "status": "Active",
  "email": "user@example.com",
  "draft_email": "user@example.com",
  "department": "Sales",
  "phone": 1234567890,
  "secondary_phone": 1234567890,
  "mfa_enabled": false,
  "phone_verified": true,
  "token": "string",
  "signature": "<p>Thanks</p>",
  "is_signature_enabled": true,
  "preferred_language": "de",
  "custom_start_page": "/app/dashboard",
  "custom_navigation": "5gbe4nkp6jsfq",
  "override_release_channel": "canary",
  "feature_preferences": {
    "feature_name": true
  },
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "favorites": {
    "entity_views": {
      "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
      "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
    },
    "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
  },
  "email_notification_setting": {
    "added_participant_opportunity": true,
    "assigned_opportunity": true,
    "assigned_task": true,
    "comment_opportunity": true,
    "deleted_task": true,
    "escalated_task": true,
    "message_receive_opportunity": true,
    "message_send_opportunity": true,
    "created_task": true,
    "created_opportunity_manual": true,
    "created_opportunity_auto": true,
    "deleted_opportunity": true
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `getGroupsForUser`

Get groups of a user

`GET /v2/users/{id}/groups`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The Id of user |

**Flags**

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

**Sample Call**

```bash
epilot user getGroupsForUser \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user getGroupsForUser 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user getGroupsForUser -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "org_id": "string",
    "name": "Finance",
    "created_at": "2024-02-08T04:44:32.246Z",
    "updated_at": "2024-02-08T04:44:32.246Z",
    "created_by": "123",
    "crt_assignee": {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": [],
      "crt_index": 3
    },
    "users": [
      {}
    ]
  }
]
```

</details>

---

### `getGroups`

Lists groups in organizations you have access to

`GET /v1/groups`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `query` | query | string | No | Query name to filter by |
| `limit` | query | number | No | Limit the results size |
| `offset` | query | number | No | Specify the offset |
| `hydrate` | query | boolean | No | Pass it true when you want to hydrate the group with full user details |

**Flags**

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

**Sample Call**

```bash
epilot user getGroups
```

With JSONata filter:

```bash
epilot user getGroups --jsonata 'hits[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "groups": [
    {
      "id": "string",
      "org_id": "string",
      "name": "Finance",
      "created_at": "2024-02-08T04:44:32.246Z",
      "updated_at": "2024-02-08T04:44:32.246Z",
      "created_by": "123",
      "crt_assignee": {},
      "users": []
    }
  ]
}
```

</details>

---

### `createGroup`

Create a new group

`POST /v1/groups`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user createGroup \
  -d '{"name":"Finance","user_ids":["123","456"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot user createGroup
```

With JSONata filter:

```bash
epilot user createGroup --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "Finance",
  "created_at": "2024-02-08T04:44:32.246Z",
  "updated_at": "2024-02-08T04:44:32.246Z",
  "created_by": "123",
  "crt_assignee": {
    "id": "string",
    "organization_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "activated_at": "1970-01-01T00:00:00.000Z",
    "display_name": "Example User",
    "status": "Active",
    "email": "user@example.com",
    "draft_email": "user@example.com",
    "department": "Sales",
    "phone": 1234567890,
    "secondary_phone": 1234567890,
    "mfa_enabled": false,
    "phone_verified": true,
    "token": "string",
    "signature": "<p>Thanks</p>",
    "is_signature_enabled": true,
    "preferred_language": "de",
    "custom_start_page": "/app/dashboard",
    "custom_navigation": "5gbe4nkp6jsfq",
    "override_release_channel": "canary",
    "feature_preferences": {
      "feature_name": true
    },
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "favorites": {
      "entity_views": {},
      "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
    },
    "email_notification_setting": {
      "added_participant_opportunity": true,
      "assigned_opportunity": true,
      "assigned_task": true,
      "comment_opportunity": true,
      "deleted_task": true,
      "escalated_task": true,
      "message_receive_opportunity": true,
      "message_send_opportunity": true,
      "created_task": true,
      "created_opportunity_manual": true,
      "created_opportunity_auto": true,
      "deleted_opportunity": true
    },
    "properties": [
      {}
    ],
    "crt_index": 3
  },
  "users": [
    {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": []
    }
  ]
}
```

</details>

---

### `getGroup`

Get group by id

`GET /v1/groups/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Group id |
| `hydrate` | query | boolean | No | Pass it true when you want to hydrate the group with full user details |

**Flags**

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

**Sample Call**

```bash
epilot user getGroup \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user getGroup 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user getGroup -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "Finance",
  "created_at": "2024-02-08T04:44:32.246Z",
  "updated_at": "2024-02-08T04:44:32.246Z",
  "created_by": "123",
  "crt_assignee": {
    "id": "string",
    "organization_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "activated_at": "1970-01-01T00:00:00.000Z",
    "display_name": "Example User",
    "status": "Active",
    "email": "user@example.com",
    "draft_email": "user@example.com",
    "department": "Sales",
    "phone": 1234567890,
    "secondary_phone": 1234567890,
    "mfa_enabled": false,
    "phone_verified": true,
    "token": "string",
    "signature": "<p>Thanks</p>",
    "is_signature_enabled": true,
    "preferred_language": "de",
    "custom_start_page": "/app/dashboard",
    "custom_navigation": "5gbe4nkp6jsfq",
    "override_release_channel": "canary",
    "feature_preferences": {
      "feature_name": true
    },
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "favorites": {
      "entity_views": {},
      "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
    },
    "email_notification_setting": {
      "added_participant_opportunity": true,
      "assigned_opportunity": true,
      "assigned_task": true,
      "comment_opportunity": true,
      "deleted_task": true,
      "escalated_task": true,
      "message_receive_opportunity": true,
      "message_send_opportunity": true,
      "created_task": true,
      "created_opportunity_manual": true,
      "created_opportunity_auto": true,
      "deleted_opportunity": true
    },
    "properties": [
      {}
    ],
    "crt_index": 3
  },
  "users": [
    {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": []
    }
  ]
}
```

</details>

---

### `updateGroup`

Update group by id

`PATCH /v1/groups/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Group id |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user updateGroup \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"name":"Finance","user_ids":["123","456"]}'
```

Using positional args for path parameters:

```bash
epilot user updateGroup 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot user updateGroup -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user updateGroup -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "Finance",
  "created_at": "2024-02-08T04:44:32.246Z",
  "updated_at": "2024-02-08T04:44:32.246Z",
  "created_by": "123",
  "crt_assignee": {
    "id": "string",
    "organization_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "activated_at": "1970-01-01T00:00:00.000Z",
    "display_name": "Example User",
    "status": "Active",
    "email": "user@example.com",
    "draft_email": "user@example.com",
    "department": "Sales",
    "phone": 1234567890,
    "secondary_phone": 1234567890,
    "mfa_enabled": false,
    "phone_verified": true,
    "token": "string",
    "signature": "<p>Thanks</p>",
    "is_signature_enabled": true,
    "preferred_language": "de",
    "custom_start_page": "/app/dashboard",
    "custom_navigation": "5gbe4nkp6jsfq",
    "override_release_channel": "canary",
    "feature_preferences": {
      "feature_name": true
    },
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "favorites": {
      "entity_views": {},
      "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
    },
    "email_notification_setting": {
      "added_participant_opportunity": true,
      "assigned_opportunity": true,
      "assigned_task": true,
      "comment_opportunity": true,
      "deleted_task": true,
      "escalated_task": true,
      "message_receive_opportunity": true,
      "message_send_opportunity": true,
      "created_task": true,
      "created_opportunity_manual": true,
      "created_opportunity_auto": true,
      "deleted_opportunity": true
    },
    "properties": [
      {}
    ],
    "crt_index": 3
  },
  "users": [
    {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": []
    }
  ]
}
```

</details>

---

### `deleteGroup`

Delete group by id

`DELETE /v1/groups/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Group id |

**Flags**

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

**Sample Call**

```bash
epilot user deleteGroup \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user deleteGroup 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user deleteGroup -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `advanceUserAssignment`

Advance user assignment to next user in line

`POST /v1/groups/{id}/user:next`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Group id |

**Flags**

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

**Sample Call**

```bash
epilot user advanceUserAssignment \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user advanceUserAssignment 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user advanceUserAssignment -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "org_id": "string",
  "name": "Finance",
  "created_at": "2024-02-08T04:44:32.246Z",
  "updated_at": "2024-02-08T04:44:32.246Z",
  "created_by": "123",
  "crt_assignee": {
    "id": "string",
    "organization_id": "string",
    "created_at": "1970-01-01T00:00:00.000Z",
    "activated_at": "1970-01-01T00:00:00.000Z",
    "display_name": "Example User",
    "status": "Active",
    "email": "user@example.com",
    "draft_email": "user@example.com",
    "department": "Sales",
    "phone": 1234567890,
    "secondary_phone": 1234567890,
    "mfa_enabled": false,
    "phone_verified": true,
    "token": "string",
    "signature": "<p>Thanks</p>",
    "is_signature_enabled": true,
    "preferred_language": "de",
    "custom_start_page": "/app/dashboard",
    "custom_navigation": "5gbe4nkp6jsfq",
    "override_release_channel": "canary",
    "feature_preferences": {
      "feature_name": true
    },
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "favorites": {
      "entity_views": {},
      "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
    },
    "email_notification_setting": {
      "added_participant_opportunity": true,
      "assigned_opportunity": true,
      "assigned_task": true,
      "comment_opportunity": true,
      "deleted_task": true,
      "escalated_task": true,
      "message_receive_opportunity": true,
      "message_send_opportunity": true,
      "created_task": true,
      "created_opportunity_manual": true,
      "created_opportunity_auto": true,
      "deleted_opportunity": true
    },
    "properties": [
      {}
    ],
    "crt_index": 3
  },
  "users": [
    {
      "id": "string",
      "organization_id": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "activated_at": "1970-01-01T00:00:00.000Z",
      "display_name": "Example User",
      "status": "Active",
      "email": "user@example.com",
      "draft_email": "user@example.com",
      "department": "Sales",
      "phone": 1234567890,
      "secondary_phone": 1234567890,
      "mfa_enabled": false,
      "phone_verified": true,
      "token": "string",
      "signature": "<p>Thanks</p>",
      "is_signature_enabled": true,
      "preferred_language": "de",
      "custom_start_page": "/app/dashboard",
      "custom_navigation": "5gbe4nkp6jsfq",
      "override_release_channel": "canary",
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": []
    }
  ]
}
```

</details>

---

### `createNavigation`

Create a new navigation configuration. Navigations are immutable and globally accessible across organizations.

`POST /v2/user/navigations`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user createNavigation
```

With request body:

```bash
epilot user createNavigation \
  -d '{
  "name": "Sales Team Navigation",
  "configuration": {
    "customer_relations": [
      {
        "key": "dashboard"
      },
      {
        "key": "contact"
      }
    ],
    "configurations": [
      {
        "name": "Product Catalog",
        "subItems": [
          {
            "key": "product"
          },
          {
            "key": "price"
          }
        ]
      },
      {
        "key": "journey"
      }
    ]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot user createNavigation
```

With JSONata filter:

```bash
epilot user createNavigation --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "5gbe4nkp6jsfq",
  "name": "Sales Team Navigation",
  "configuration": {
    "customer_relations": [
      {
        "key": "dashboard"
      },
      {
        "key": "contact"
      }
    ],
    "configurations": [
      {
        "name": "Product Catalog",
        "subItems": [
          {
            "key": "product"
          },
          {
            "key": "price"
          }
        ]
      },
      {
        "key": "journey"
      }
    ]
  }
}
```

</details>

---

### `getNavigation`

Get a navigation configuration by ID

`GET /v2/user/navigations/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The UUID of the navigation |

**Flags**

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

**Sample Call**

```bash
epilot user getNavigation \
  -p id=5gbe4nkp6jsfq
```

Using positional args for path parameters:

```bash
epilot user getNavigation 5gbe4nkp6jsfq
```

With JSONata filter:

```bash
epilot user getNavigation -p id=5gbe4nkp6jsfq --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "5gbe4nkp6jsfq",
  "name": "Sales Team Navigation",
  "configuration": {
    "customer_relations": [
      {
        "key": "dashboard"
      },
      {
        "key": "contact"
      }
    ],
    "configurations": [
      {
        "name": "Product Catalog",
        "subItems": [
          {
            "key": "product"
          },
          {
            "key": "price"
          }
        ]
      },
      {
        "key": "journey"
      }
    ]
  }
}
```

</details>

---

### `verifyEmailWithToken`

Update new email using an verification token

`POST /v2/users/public/verifyEmail`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Verification Token |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user verifyEmailWithToken \
  -p token=example \
  -d '{"password":"AKjhdakjsdh@!34"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user verifyEmailWithToken -p token=example
```

With JSONata filter:

```bash
epilot user verifyEmailWithToken -p token=example --jsonata '$'
```

---

### `checkInviteToken`

Check an invite token

`GET /v2/users/public/checkToken`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Invite Token |

**Flags**

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

**Sample Call**

```bash
epilot user checkInviteToken \
  -p token=example
```

With JSONata filter:

```bash
epilot user checkInviteToken -p token=example --jsonata 'invitation_org_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "invitation_org_id": "string",
  "invitation_org_name": "string",
  "invitation_org_logo_url": "string",
  "invitation_org_logo_thumbnail_url": "string",
  "invitee_user_id": "string",
  "invitee_primary_org_id": "string"
}
```

</details>

---

### `activateUser`

Activate user using an invite token

`POST /v2/users/public/activate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Invite Token |

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user activateUser \
  -p token=example \
  -d '{"display_name":"Example User","password":"AKjhdakjsdh@!34"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user activateUser -p token=example
```

With JSONata filter:

```bash
epilot user activateUser -p token=example --jsonata '$'
```

---

### `rejectInvite`

Reject an invite

`DELETE /v2/users/public/reject`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | query | string | Yes | Invite Token |

**Flags**

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

**Sample Call**

```bash
epilot user rejectInvite \
  -p token=example
```

With JSONata filter:

```bash
epilot user rejectInvite -p token=example --jsonata 'success'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true
}
```

</details>

---

### `getUserLoginParametersV2`

Get user organization login parameters by username

`GET /v2/users/public/username/{username}:getLoginParameters`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `username` | path | string | Yes | Username |

**Flags**

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

**Sample Call**

```bash
epilot user getUserLoginParametersV2 \
  -p username=example
```

Using positional args for path parameters:

```bash
epilot user getUserLoginParametersV2 example
```

With JSONata filter:

```bash
epilot user getUserLoginParametersV2 -p username=example --jsonata 'login_parameters'
```

<details>
<summary>Sample Response</summary>

```json
{
  "login_parameters": [
    {
      "organization_id": "123",
      "organization_name": "epilot GmbH",
      "organization_type": "Vendor",
      "organization_use": "Production",
      "cognito_region": "eu-central-1",
      "cognito_user_pool_id": "eu-central-sample",
      "cognito_user_pool_client_id": "asbkh213ehkquwhdi",
      "cognito_oauth_domain": "epilot-org-123",
      "cognito_oauth_scopes": ["openid"],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

</details>

---

### `beginPasskeyAuthentication`

Begin passkey authentication flow. Returns WebAuthn options and a signed challenge token.

`POST /v2/users/public/passkeys:authenticateBegin`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user beginPasskeyAuthentication \
  -d '{"email":"user@example.com"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user beginPasskeyAuthentication
```

With JSONata filter:

```bash
epilot user beginPasskeyAuthentication --jsonata 'options'
```

<details>
<summary>Sample Response</summary>

```json
{
  "options": {},
  "challenge_token": "string"
}
```

</details>

---

### `beginDiscoverablePasskeyAuthentication`

Begin discoverable passkey authentication flow (no email required). Returns WebAuthn options with empty allowCredentials

`POST /v2/users/public/passkeys:authenticateBeginDiscoverable`

**Flags**

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

**Sample Call**

```bash
epilot user beginDiscoverablePasskeyAuthentication
```

With JSONata filter:

```bash
epilot user beginDiscoverablePasskeyAuthentication --jsonata 'options'
```

<details>
<summary>Sample Response</summary>

```json
{
  "options": {},
  "challenge_token": "string"
}
```

</details>

---

### `resolveDiscoverableCredential`

Resolve user identity from a discoverable passkey assertion. Returns the user's email and login parameters.

`POST /v2/users/public/passkeys:resolveCredential`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user resolveDiscoverableCredential \
  -d '{"challenge_token":"string","assertion_response":{}}'
```

Using stdin pipe:

```bash
cat body.json | epilot user resolveDiscoverableCredential
```

With JSONata filter:

```bash
epilot user resolveDiscoverableCredential --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "email": "user@example.com",
  "organization_id": "string",
  "user_id": "string",
  "login_parameters": [
    {
      "organization_id": "123",
      "organization_name": "epilot GmbH",
      "organization_type": "Vendor",
      "organization_use": "Production",
      "cognito_region": "eu-central-1",
      "cognito_user_pool_id": "eu-central-sample",
      "cognito_user_pool_client_id": "asbkh213ehkquwhdi",
      "cognito_oauth_domain": "epilot-org-123",
      "cognito_oauth_scopes": ["openid"],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

</details>

---

### `beginPasskeyRegistration`

Begin passkey registration flow for the authenticated user.

`POST /v2/users/me/passkeys:registerBegin`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user beginPasskeyRegistration \
  -d '{"friendly_name":"My Laptop"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user beginPasskeyRegistration
```

With JSONata filter:

```bash
epilot user beginPasskeyRegistration --jsonata 'options'
```

<details>
<summary>Sample Response</summary>

```json
{
  "options": {},
  "challenge_token": "string"
}
```

</details>

---

### `completePasskeyRegistration`

Complete passkey registration by verifying the attestation response.

`POST /v2/users/me/passkeys:registerComplete`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user completePasskeyRegistration \
  -d '{"challenge_token":"string","registration_response":{},"friendly_name":"My Laptop"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user completePasskeyRegistration
```

With JSONata filter:

```bash
epilot user completePasskeyRegistration --jsonata 'credential_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "credential_id": "string",
  "friendly_name": "My Laptop",
  "created_at": "1970-01-01T00:00:00.000Z",
  "transports": ["string"],
  "aaguid": "string"
}
```

</details>

---

### `listPasskeys`

List all passkeys registered for the authenticated user.

`GET /v2/users/me/passkeys`

**Flags**

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

**Sample Call**

```bash
epilot user listPasskeys
```

With JSONata filter:

```bash
epilot user listPasskeys --jsonata 'passkeys'
```

<details>
<summary>Sample Response</summary>

```json
{
  "passkeys": [
    {
      "credential_id": "string",
      "friendly_name": "My Laptop",
      "created_at": "1970-01-01T00:00:00.000Z",
      "transports": ["string"],
      "aaguid": "string"
    }
  ]
}
```

</details>

---

### `deletePasskey`

Delete a passkey by credential ID.

`DELETE /v2/users/me/passkeys/{credentialId}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `credentialId` | path | string | Yes |  |

**Flags**

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

**Sample Call**

```bash
epilot user deletePasskey \
  -p credentialId=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user deletePasskey 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user deletePasskey -p credentialId=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `switchOrganization`

Switch to another organization the user is part of

`POST /v2/users/switchOrganization`

**Request Body**

**Flags**

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

**Sample Call**

```bash
epilot user switchOrganization \
  -d '{"org_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot user switchOrganization
```

With JSONata filter:

```bash
epilot user switchOrganization --jsonata 'login_token'
```

<details>
<summary>Sample Response</summary>

```json
{
  "login_token": "string"
}
```

</details>

---

### `getMe`

Get currently logged in user

`GET /v1/users/me`

**Flags**

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

**Sample Call**

```bash
epilot user getMe
```

With JSONata filter:

```bash
epilot user getMe --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "email": "user@example.com",
  "display_name": "Example user",
  "name": "Example user",
  "preferred_language": "de",
  "signature": "<p>Thanks</p>",
  "custom_navigation": "5gbe4nkp6jsfq",
  "roles": ["Owner"],
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `listUsers`

Lists users in organizations you have access to

`GET /v1/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_ids` | query | string[] | No | Comma-separated list of organization ids to filter by |
| `query` | query | string | No | Query text to filter by |
| `limit` | query | number | No | Limit the results size |
| `offset` | query | number | No | Specify the offset |

**Flags**

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

**Sample Call**

```bash
epilot user listUsers
```

With JSONata filter:

```bash
epilot user listUsers --jsonata 'users'
```

<details>
<summary>Sample Response</summary>

```json
{
  "users": [
    {
      "id": "string",
      "organization_id": "string",
      "email": "user@example.com",
      "display_name": "Example user",
      "name": "Example user",
      "preferred_language": "de",
      "signature": "<p>Thanks</p>",
      "custom_navigation": "5gbe4nkp6jsfq",
      "roles": ["Owner"],
      "image_uri": {
        "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
        "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
      },
      "properties": [
        {
          "name": "profileImageName",
          "value": "avatar.png"
        }
      ]
    }
  ]
}
```

</details>

---

### `getUser`

Get user by id

`GET /v1/users/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | User id |

**Flags**

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

**Sample Call**

```bash
epilot user getUser \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot user getUser 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot user getUser -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "organization_id": "string",
  "email": "user@example.com",
  "display_name": "Example user",
  "name": "Example user",
  "preferred_language": "de",
  "signature": "<p>Thanks</p>",
  "custom_navigation": "5gbe4nkp6jsfq",
  "roles": ["Owner"],
  "image_uri": {
    "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
    "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
  },
  "properties": [
    {
      "name": "profileImageName",
      "value": "avatar.png"
    }
  ]
}
```

</details>

---

### `getUserLoginParameters`

Get user organization login parameters by username

`GET /v1/users/username/{username}:getLoginParameters`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `username` | path | string | Yes | Username |

**Flags**

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

**Sample Call**

```bash
epilot user getUserLoginParameters \
  -p username=example
```

Using positional args for path parameters:

```bash
epilot user getUserLoginParameters example
```

With JSONata filter:

```bash
epilot user getUserLoginParameters -p username=example --jsonata 'login_parameters'
```

<details>
<summary>Sample Response</summary>

```json
{
  "login_parameters": [
    {
      "organization_id": "123",
      "organization_name": "epilot GmbH",
      "organization_type": "Vendor",
      "organization_use": "Production",
      "cognito_region": "eu-central-1",
      "cognito_user_pool_id": "eu-central-sample",
      "cognito_user_pool_client_id": "asbkh213ehkquwhdi",
      "cognito_oauth_domain": "epilot-org-123",
      "cognito_oauth_scopes": ["openid"],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

</details>

---
