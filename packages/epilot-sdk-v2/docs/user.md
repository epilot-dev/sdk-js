# User API

**Base URL:** `https://user.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/user](https://docs.epilot.io/api/user)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.user.signUpUser(...)

// Or get the client explicitly
const userClient = await epilot.user.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/user'

const userClient = await getClient()
authorize(userClient, () => '<token>')
const { data } = await userClient.signUpUser(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/user'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**User V2**
- [`signUpUser`](#signupuser)
- [`getMeV2`](#getmev2)
- [`listUsersV2`](#listusersv2)
- [`getUserV2`](#getuserv2)
- [`updateUserV2`](#updateuserv2)
- [`deleteUserV2`](#deleteuserv2)
- [`inviteUser`](#inviteuser)
- [`resendUserInvitation`](#resenduserinvitation)
- [`getGroupsForUser`](#getgroupsforuser)
- [`verifyEmailWithToken`](#verifyemailwithtoken)
- [`checkInviteToken`](#checkinvitetoken)
- [`activateUser`](#activateuser)
- [`rejectInvite`](#rejectinvite)
- [`getUserLoginParametersV2`](#getuserloginparametersv2)
- [`beginPasskeyAuthentication`](#beginpasskeyauthentication)
- [`beginDiscoverablePasskeyAuthentication`](#begindiscoverablepasskeyauthentication)
- [`resolveDiscoverableCredential`](#resolvediscoverablecredential)
- [`beginPasskeyRegistration`](#beginpasskeyregistration)
- [`completePasskeyRegistration`](#completepasskeyregistration)
- [`listPasskeys`](#listpasskeys)
- [`deletePasskey`](#deletepasskey)
- [`switchOrganization`](#switchorganization)

**Group**
- [`getGroups`](#getgroups)
- [`createGroup`](#creategroup)
- [`getGroup`](#getgroup)
- [`updateGroup`](#updategroup)
- [`deleteGroup`](#deletegroup)
- [`advanceUserAssignment`](#advanceuserassignment)

**Navigation**
- [`createNavigation`](#createnavigation)
- [`getNavigation`](#getnavigation)

**User V1**
- [`getMe`](#getme)
- [`listUsers`](#listusers)
- [`getUser`](#getuser)
- [`getUserLoginParameters`](#getuserloginparameters)

### `signUpUser`

`POST /v2/users/public/signup`

```ts
const { data } = await client.signUpUser(
  {
    token: 'example',
  },
  {
    organization_detail: {
      type: 'Vendor',
      name: 'Epilot',
      pricing_tier: 'professional',
      email: 'string',
      phone: 'string',
      website: 'string',
      is_privacy_policy_checked: false,
      is_terms_and_conditions_checked: false
    },
    user_detail: {
      full_name: 'Example user',
      email: 'user@example.com',
      password: 'AKjhdakjsdh@!34'
    },
    language: 'en'
  },
)
```

**Response**

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
    "roles": [
      "Owner"
    ],
    "image_uri": {
      "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
      "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
    },
    "properties": [
      {}
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

---

### `getMeV2`

Get currently logged in user

`GET /v2/users/me`

```ts
const { data } = await client.getMeV2()
```

**Response**

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

---

### `listUsersV2`

Get the list of organization users

`GET /v2/users`

```ts
const { data } = await client.listUsersV2({
  query: 'example',
  limit: 1,
  offset: 1,
})
```

**Response**

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
      "feature_preferences": {},
      "image_uri": {},
      "favorites": {},
      "email_notification_setting": {},
      "properties": []
    }
  ]
}
```

---

### `getUserV2`

Get user details by user id

`GET /v2/users/{id}`

```ts
const { data } = await client.getUserV2({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

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

---

### `updateUserV2`

Update user details

`PATCH /v2/users/{id}`

```ts
const { data } = await client.updateUserV2(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'string',
    organization_id: 'string',
    created_at: '1970-01-01T00:00:00.000Z',
    activated_at: '1970-01-01T00:00:00.000Z',
    display_name: 'Example User',
    status: 'Active',
    email: 'user@example.com',
    draft_email: 'user@example.com',
    department: 'Sales',
    phone: 1234567890,
    secondary_phone: 1234567890,
    mfa_enabled: false,
    phone_verified: true,
    token: 'string',
    signature: '<p>Thanks</p>',
    is_signature_enabled: true,
    preferred_language: 'de',
    custom_start_page: '/app/dashboard',
    custom_navigation: '5gbe4nkp6jsfq',
    override_release_channel: 'canary',
    feature_preferences: {
      feature_name: true
    },
    image_uri: {
      original: 'https://account-profile-images.epilot.cloud/1/avatar.png',
      thumbnail_32: 'https://account-profile-images.epilot.cloud/1/avatar_32x32.png'
    },
    favorites: {
      entity_views: {
        opportunity: '891a5409850abf8b92bd2cb7bdd2844d32ce6bec',
        order: '628aee91-7c2f-4047-ab0d-433582a19c49'
      },
      dashboard: '751ff121-9ac2-4511-a2e6-851f11287380'
    },
    email_notification_setting: {
      added_participant_opportunity: true,
      assigned_opportunity: true,
      assigned_task: true,
      comment_opportunity: true,
      deleted_task: true,
      escalated_task: true,
      message_receive_opportunity: true,
      message_send_opportunity: true,
      created_task: true,
      created_opportunity_manual: true,
      created_opportunity_auto: true,
      deleted_opportunity: true
    },
    properties: [
      {
        name: 'profileImageName',
        value: 'avatar.png'
      }
    ]
  },
)
```

**Response**

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

---

### `deleteUserV2`

Delete user by user id

`DELETE /v2/users/{id}`

```ts
const { data } = await client.deleteUserV2({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

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
  "roles": [
    "Owner"
  ],
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

---

### `inviteUser`

Creates a new user in the caller's organization and sends an invite email to activate the user

`POST /v2/users/invite`

```ts
const { data } = await client.inviteUser(
  null,
  {
    email: 'test@example.com',
    language: 'en',
    roles: [
      '123:owner'
    ]
  },
)
```

**Response**

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

---

### `resendUserInvitation`

Resend user invitation email

`POST /v2/users/invite:resendEmail`

```ts
const { data } = await client.resendUserInvitation(
  null,
  {
    email: 'test@example.com',
    language: 'en'
  },
)
```

**Response**

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

---

### `getGroupsForUser`

Get groups of a user

`GET /v2/users/{id}/groups`

```ts
const { data } = await client.getGroupsForUser({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

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

---

### `getGroups`

Lists groups in organizations you have access to

`GET /v1/groups`

```ts
const { data } = await client.getGroups({
  query: 'example',
  limit: 1,
  offset: 1,
  hydrate: true,
})
```

**Response**

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

---

### `createGroup`

Create a new group

`POST /v1/groups`

```ts
const { data } = await client.createGroup(
  null,
  {
    name: 'Finance',
    user_ids: [
      '123',
      '456'
    ]
  },
)
```

**Response**

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

---

### `getGroup`

Get group by id

`GET /v1/groups/{id}`

```ts
const { data } = await client.getGroup({
  id: '123e4567-e89b-12d3-a456-426614174000',
  hydrate: true,
})
```

**Response**

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

---

### `updateGroup`

Update group by id

`PATCH /v1/groups/{id}`

```ts
const { data } = await client.updateGroup(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'Finance',
    user_ids: [
      '123',
      '456'
    ]
  },
)
```

**Response**

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

---

### `deleteGroup`

Delete group by id

`DELETE /v1/groups/{id}`

```ts
const { data } = await client.deleteGroup({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `advanceUserAssignment`

Advance user assignment to next user in line

`POST /v1/groups/{id}/user:next`

```ts
const { data } = await client.advanceUserAssignment({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

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

---

### `createNavigation`

Create a new navigation configuration. Navigations are immutable and globally accessible across organizations.
Each creation generates a new id. To update a navigation, create a new one.

`POST /v2/user/navigations`

```ts
const { data } = await client.createNavigation(
  null,
  {
    name: 'Sales Team Navigation',
    configuration: {
      customer_relations: [
        { /* ... */ },
        { /* ... */ }
      ],
      configurations: [
        { /* ... */ },
        { /* ... */ }
      ]
    }
  },
)
```

**Response**

```json
{
  "id": "5gbe4nkp6jsfq",
  "name": "Sales Team Navigation",
  "configuration": {
    "customer_relations": [
      {},
      {}
    ],
    "configurations": [
      {},
      {}
    ]
  }
}
```

---

### `getNavigation`

Get a navigation configuration by ID

`GET /v2/user/navigations/{id}`

```ts
const { data } = await client.getNavigation({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
{
  "id": "5gbe4nkp6jsfq",
  "name": "Sales Team Navigation",
  "configuration": {
    "customer_relations": [
      {},
      {}
    ],
    "configurations": [
      {},
      {}
    ]
  }
}
```

---

### `verifyEmailWithToken`

Update new email using an verification token

`POST /v2/users/public/verifyEmail`

```ts
const { data } = await client.verifyEmailWithToken(
  {
    token: 'example',
  },
  {
    password: 'AKjhdakjsdh@!34'
  },
)
```

---

### `checkInviteToken`

Check an invite token

`GET /v2/users/public/checkToken`

```ts
const { data } = await client.checkInviteToken({
  token: 'example',
})
```

**Response**

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

---

### `activateUser`

Activate user using an invite token

`POST /v2/users/public/activate`

```ts
const { data } = await client.activateUser(
  {
    token: 'example',
  },
  {
    display_name: 'Example User',
    password: 'AKjhdakjsdh@!34'
  },
)
```

---

### `rejectInvite`

Reject an invite

`DELETE /v2/users/public/reject`

```ts
const { data } = await client.rejectInvite({
  token: 'example',
})
```

**Response**

```json
{
  "success": true
}
```

---

### `getUserLoginParametersV2`

Get user organization login parameters by username

`GET /v2/users/public/username/{username}:getLoginParameters`

```ts
const { data } = await client.getUserLoginParametersV2({
  username: 'example',
})
```

**Response**

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
      "cognito_oauth_scopes": [],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

---

### `beginPasskeyAuthentication`

Begin passkey authentication flow. Returns WebAuthn options and a signed challenge token.

`POST /v2/users/public/passkeys:authenticateBegin`

```ts
const { data } = await client.beginPasskeyAuthentication(
  null,
  {
    email: 'user@example.com'
  },
)
```

**Response**

```json
{
  "options": {},
  "challenge_token": "string"
}
```

---

### `beginDiscoverablePasskeyAuthentication`

Begin discoverable passkey authentication flow (no email required). Returns WebAuthn options with empty allowCredentials for the browser credential picker.

`POST /v2/users/public/passkeys:authenticateBeginDiscoverable`

```ts
const { data } = await client.beginDiscoverablePasskeyAuthentication()
```

**Response**

```json
{
  "options": {},
  "challenge_token": "string"
}
```

---

### `resolveDiscoverableCredential`

Resolve user identity from a discoverable passkey assertion. Returns the user's email and login parameters.

`POST /v2/users/public/passkeys:resolveCredential`

```ts
const { data } = await client.resolveDiscoverableCredential(
  null,
  {
    challenge_token: 'string',
    assertion_response: {}
  },
)
```

**Response**

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
      "cognito_oauth_scopes": [],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

---

### `beginPasskeyRegistration`

Begin passkey registration flow for the authenticated user.

`POST /v2/users/me/passkeys:registerBegin`

```ts
const { data } = await client.beginPasskeyRegistration(
  null,
  {
    friendly_name: 'My Laptop'
  },
)
```

**Response**

```json
{
  "options": {},
  "challenge_token": "string"
}
```

---

### `completePasskeyRegistration`

Complete passkey registration by verifying the attestation response.

`POST /v2/users/me/passkeys:registerComplete`

```ts
const { data } = await client.completePasskeyRegistration(
  null,
  {
    challenge_token: 'string',
    registration_response: {},
    friendly_name: 'My Laptop'
  },
)
```

**Response**

```json
{
  "credential_id": "string",
  "friendly_name": "My Laptop",
  "created_at": "1970-01-01T00:00:00.000Z",
  "transports": [
    "string"
  ],
  "aaguid": "string"
}
```

---

### `listPasskeys`

List all passkeys registered for the authenticated user.

`GET /v2/users/me/passkeys`

```ts
const { data } = await client.listPasskeys()
```

**Response**

```json
{
  "passkeys": [
    {
      "credential_id": "string",
      "friendly_name": "My Laptop",
      "created_at": "1970-01-01T00:00:00.000Z",
      "transports": [],
      "aaguid": "string"
    }
  ]
}
```

---

### `deletePasskey`

Delete a passkey by credential ID.

`DELETE /v2/users/me/passkeys/{credentialId}`

```ts
const { data } = await client.deletePasskey({
  credentialId: 'example',
})
```

---

### `switchOrganization`

Switch to another organization the user is part of

`POST /v2/users/switchOrganization`

```ts
const { data } = await client.switchOrganization(
  null,
  {
    org_id: 'string'
  },
)
```

**Response**

```json
{
  "login_token": "string"
}
```

---

### `getMe`

Get currently logged in user

`GET /v1/users/me`

```ts
const { data } = await client.getMe()
```

**Response**

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
  "roles": [
    "Owner"
  ],
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

---

### `listUsers`

Lists users in organizations you have access to

`GET /v1/users`

```ts
const { data } = await client.listUsers({
  org_ids: ['...'],
  query: 'example',
  limit: 1,
  offset: 1,
})
```

**Response**

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
      "roles": [],
      "image_uri": {},
      "properties": []
    }
  ]
}
```

---

### `getUser`

Get user by id

`GET /v1/users/{id}`

```ts
const { data } = await client.getUser({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

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
  "roles": [
    "Owner"
  ],
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

---

### `getUserLoginParameters`

Get user organization login parameters by username

`GET /v1/users/username/{username}:getLoginParameters`

```ts
const { data } = await client.getUserLoginParameters({
  username: 'example',
})
```

**Response**

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
      "cognito_oauth_scopes": [],
      "oauth_response_type": "code",
      "passkey_enabled": true
    }
  ]
}
```

---

## Schemas

### `NavigationId`

Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.

```ts
type NavigationId = string
```

### `Navigation`

A customized workplace navigation configuration. The ID is a content-hash, so identical configurations will have the same ID.

```ts
type Navigation = {
  id: string
  name: string
  configuration: Record<string, Array<{
    key: string
  } | {
    name: string
    subItems: Array<{
      key: { ... }
    }>
  }>>
}
```

### `NavigationCreateRequest`

Request payload to create a new navigation configuration

```ts
type NavigationCreateRequest = {
  name: string
  configuration: Record<string, Array<{
    key: string
  } | {
    name: string
    subItems: Array<{
      key: { ... }
    }>
  }>>
}
```

### `NavigationConfiguration`

Navigation configuration organized by sections. Each section contains an array of navigation items.


```ts
type NavigationConfiguration = Record<string, Array<{
  key: string
} | {
  name: string
  subItems: Array<{
    key: string
  }>
}>>
```

### `NavigationItem`

A navigation item - either a simple key item or a group with sub-items

```ts
type NavigationItem = {
  key: string
} | {
  name: string
  subItems: Array<{
    key: string
  }>
}
```

### `NavigationKeyItem`

A simple navigation item with a key

```ts
type NavigationKeyItem = {
  key: string
}
```

### `NavigationGroupItem`

A navigation group containing sub-items

```ts
type NavigationGroupItem = {
  name: string
  subItems: Array<{
    key: string
  }>
}
```

### `InviteToken`

Token used to invite a user to epilot

```ts
type InviteToken = string
```

### `PartnerInvitationToken`

Token used to invite a partner user to epilot

```ts
type PartnerInvitationToken = string
```

### `VerificationToken`

```ts
type VerificationToken = string
```

### `GroupId`

Group unique identifier

```ts
type GroupId = string
```

### `UserId`

User's unique identifier

```ts
type UserId = string
```

### `Query`

```ts
type Query = string
```

### `OrganizationId`

```ts
type OrganizationId = string
```

### `Limit`

```ts
type Limit = number
```

### `Offset`

```ts
type Offset = number
```

### `Hydrate`

```ts
type Hydrate = boolean
```

### `Username`

```ts
type Username = string
```

### `UserInvitationPayload`

```ts
type UserInvitationPayload = {
  email?: string
  language?: "en" | "de"
  roles?: string[]
}
```

### `UserActivationPayload`

```ts
type UserActivationPayload = {
  display_name?: string
  password?: string
}
```

### `UserVerificationPayload`

```ts
type UserVerificationPayload = {
  password?: string
}
```

### `UserV2`

```ts
type UserV2 = {
  id?: string
  organization_id?: string
  created_at?: string // date-time
  activated_at?: string // date-time
  display_name?: string
  status?: "Active" | "Pending" | "Deactivated" | "Deleted"
  email?: string // email
  draft_email?: string // email
  department?: string
  phone?: string
  secondary_phone?: string
  mfa_enabled?: boolean
  phone_verified?: boolean
  token?: string
  signature?: string
  is_signature_enabled?: boolean
  preferred_language?: string
  custom_start_page?: string
  custom_navigation?: string
  override_release_channel?: "canary" | "rc" | "stable" | null
  feature_preferences?: Record<string, unknown>
  image_uri?: {
    original?: string // uri
    thumbnail_32?: string // uri
  }
  favorites?: Record<string, unknown>
  email_notification_setting?: Record<string, unknown>
  properties?: Array<{
    name: string
  // ...
}
```

### `User`

```ts
type User = {
  id: string
  organization_id: string
  email: string // email
  display_name?: string
  name: string
  preferred_language: string
  signature?: string
  custom_navigation?: string
  roles: string[]
  image_uri?: {
    original?: string // uri
    thumbnail_32?: string // uri
  }
  properties: Array<{
    name: string
    value: string
  }>
}
```

### `LoginParameters`

```ts
type LoginParameters = {
  organization_id?: string
  organization_name?: string
  organization_type?: string
  organization_use?: string
  cognito_region?: string
  cognito_user_pool_id?: string
  cognito_user_pool_client_id?: string
  cognito_oauth_domain?: string
  cognito_oauth_scopes?: string[]
  oauth_response_type?: "code" | "token"
  passkey_enabled?: boolean
}
```

### `CreateGroupReq`

```ts
type CreateGroupReq = {
  name: string
  user_ids?: string[]
}
```

### `UpdateGroupReq`

```ts
type UpdateGroupReq = {
  name?: string
  user_ids?: string[]
}
```

### `Group`

```ts
type Group = {
  id: string
  org_id: string
  name: string
  created_at: string
  updated_at: string
  created_by?: string
  crt_assignee?: {
    id?: string
    organization_id?: string
    created_at?: string // date-time
    activated_at?: string // date-time
    display_name?: string
    status?: "Active" | "Pending" | "Deactivated" | "Deleted"
    email?: string // email
    draft_email?: string // email
    department?: string
    phone?: string
    secondary_phone?: string
    mfa_enabled?: boolean
    phone_verified?: boolean
    token?: string
    signature?: string
    is_signature_enabled?: boolean
    preferred_language?: string
    custom_start_page?: string
    custom_navigation?: string
    override_release_channel?: "canary" | "rc" | "stable" | null
    feature_preferences?: Record<string, unknown>
    image_uri?: {
  // ...
}
```

### `SignupUserPayload`

```ts
type SignupUserPayload = {
  organization_detail?: {
    type: "Vendor" | "Partner"
    name: string
    pricing_tier: string
    email: string
    phone?: string
    website?: string
    is_privacy_policy_checked?: boolean
    is_terms_and_conditions_checked?: boolean
  }
  user_detail?: {
    full_name: string
    email: string // email
    password: string
  }
  language?: "en" | "de"
}
```

### `OrganizationDetail`

```ts
type OrganizationDetail = {
  type: "Vendor" | "Partner"
  name: string
  pricing_tier: string
  email: string
  phone?: string
  website?: string
  is_privacy_policy_checked?: boolean
  is_terms_and_conditions_checked?: boolean
}
```

### `CognitoDetails`

```ts
type CognitoDetails = {
  cognito_region?: string
  cognito_user_pool_id?: string
  cognito_user_pool_client_id?: string
  cognito_user_pool_arn?: string
}
```

### `UserDetail`

```ts
type UserDetail = {
  full_name: string
  email: string // email
  password: string
}
```

### `Organization`

```ts
type Organization = {
  id?: string
  type?: "Vendor" | "Partner"
  name?: string
  signature?: string
  symbol?: string
  pricing_tier?: string
  email?: string
  phone?: string
  website?: string
  address?: {
    country?: string
    city?: string
    postal_code?: string
    street?: string
    street_number?: string
  }
  logo_url?: string
  logo_thumbnail_url?: string
  is_unlicensed_org?: boolean
  cognito_details?: {
    cognito_region?: string
    cognito_user_pool_id?: string
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
  }
}
```

### `DataPointsResponse`

```ts
type DataPointsResponse = Array<{
  id?: number
  actual_users?: number
  max_users_last_month?: number
  non_billable_users_last_month?: number
}>
```

### `DataPoint`

```ts
type DataPoint = {
  id?: number
  actual_users?: number
  max_users_last_month?: number
  non_billable_users_last_month?: number
}
```

### `Passkey`

```ts
type Passkey = {
  credential_id?: string
  friendly_name?: string
  created_at?: string // date-time
  transports?: string[]
  aaguid?: string
}
```

### `PasskeyAuthenticationOptions`

```ts
type PasskeyAuthenticationOptions = {
  options?: object
  challenge_token?: string
}
```

### `PasskeyRegistrationOptions`

```ts
type PasskeyRegistrationOptions = {
  options?: object
  challenge_token?: string
}
```

### `PasskeyRegistrationResponse`

```ts
type PasskeyRegistrationResponse = {
  challenge_token: string
  registration_response: object
  friendly_name?: string
}
```
