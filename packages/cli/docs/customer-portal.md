# Portal API

- **Base URL:** `https://customer-portal-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/customer-portal](https://docs.epilot.io/api/customer-portal)

Backend for epilot portals - End Customer Portal & Installer Portal

## Quick Start

```bash
# List available operations
epilot customer-portal

# Call an operation
epilot customer-portal upsertPortal -p origin=example
```

## Operations

**ECP Admin**
- [`upsertPortal`](#upsertportal) — Upserts the settings for a portal of an organization.
- [`getPortalConfig`](#getportalconfig) — Retrieves the portal configuration.
- [`deletePortal`](#deleteportal) — Deletes the portal.
- [`getPortalExtensions`](#getportalextensions) — Retrieves the installed portal extensions.
- [`getPortalExtensionsV3`](#getportalextensionsv3) — Retrieves the installed portal extensions.
- [`getExternalLinks`](#getexternallinks) — Retrieves the portal configuration external links.
- [`getExternalLinksV3`](#getexternallinksv3) — Retrieves the portal configuration external links.
- [`getOrgPortalConfig`](#getorgportalconfig) — Retrieves the portal configuration for the organization.
- [`getOrgPortalConfigV3`](#getorgportalconfigv3) — Retrieves the portal configuration for the organization.
- [`getAllPortalConfigs`](#getallportalconfigs) — Retrieves all portal configurations.
- [`getEmailTemplates`](#getemailtemplates) — Retrieves the email templates of a portal
- [`upsertEmailTemplates`](#upsertemailtemplates) — Upserts the email templates of a portal
- [`getEmailTemplatesByPortalId`](#getemailtemplatesbyportalid) — Retrieves the email templates of a portal by portal ID
- [`upsertEmailTemplatesByPortalId`](#upsertemailtemplatesbyportalid) — Upserts the email templates of a portal by portal ID
- [`getPortalWidgets`](#getportalwidgets) — Retrieves the widgets of a portal
- [`upsertPortalWidget`](#upsertportalwidget) — Upsert widget for a portal of an organization.
- [`replaceECPTemplateVariables`](#replaceecptemplatevariables) — Replaces the template variables of a portal
- [`extraPermissionAttributes`](#extrapermissionattributes) — Retrieves the extra permission attributes.
- [`validateCaaRecords`](#validatecaarecords) — Validates the CAA records of a portal
- [`validateCaaRecordsV3`](#validatecaarecordsv3) — Validates the CAA records of a portal
- [`getECPContact`](#getecpcontact) — Get the Contact by id
- [`getValidSecondaryAttributes`](#getvalidsecondaryattributes) — Get valid secondary attributes that are used while mapping a contact on registration
- [`resendConfirmationEmail`](#resendconfirmationemail) — Resend confirmation email
- [`fetchPortalUsersByRelatedEntity`](#fetchportalusersbyrelatedentity) — Get all users for a given entity
- [`getRecipientsToNotifyOnAutomation`](#getrecipientstonotifyonautomation) — Get recipients to notify on automation
- [`configureDistribution`](#configuredistribution) — Configure the distribution for the portal's custom domain
- [`configureDistributionV3`](#configuredistributionv3) — Configure the distribution for the portal's custom domain
- [`getEntityIdentifiers`](#getentityidentifiers) — Retrieve a list of entity identifiers used for entity search by portal users.
- [`savePortalFiles`](#saveportalfiles) — Add files to portal
- [`getRegistrationIdentifiers`](#getregistrationidentifiers) — Get valid attributes from entities that can be used as identifier to map contact to user on registration
- [`loginToPortalAsUser`](#logintoportalasuser) — Generate a token to log in to a portal impersonating a users.
- [`canTriggerPortalFlow`](#cantriggerportalflow) — Returns whether the user can trigger a portal flow
- [`updatePortalPage`](#updateportalpage) — Update a portal page by id
- [`deletePortalPage`](#deleteportalpage) — Delete a portal page by id
- [`createPortalPage`](#createportalpage) — Create a new portal page
- [`getDefaultPages`](#getdefaultpages) — Fetch all default portal pages
- [`createPortalPageBlock`](#createportalpageblock) — Create a new portal page block
- [`updatePortalPageBlock`](#updateportalpageblock) — Update a portal page block by id
- [`deletePortalPageBlock`](#deleteportalpageblock) — Delete a portal page block by id
- [`createPortalConfig`](#createportalconfig) — Creates a new portal configuration.
- [`getPortalConfigV3`](#getportalconfigv3) — Retrieves a specific portal configuration by ID.
- [`putPortalConfig`](#putportalconfig) — Updates a specific portal configuration by ID.
- [`deletePortalConfig`](#deleteportalconfig) — Deletes a specific portal configuration by ID.
- [`listAllPortalConfigs`](#listallportalconfigs) — Retrieves all portal configurations.
- [`swapPortalConfig`](#swapportalconfig) — Swaps the portal configuration of two portals.

**Public**
- [`createUser`](#createuser) — Registers a portal user
- [`createUserV3`](#createuserv3) — Registers a portal user with portal id
- [`getPortalConfigByDomain`](#getportalconfigbydomain) — Retrieves the portal configuration by domain.
- [`getPublicPortalExtensionDetails`](#getpublicportalextensiondetails) — Get public extension details shown to end customers and configuring users.
- [`getPublicPortalExtensionDetailsV3`](#getpublicportalextensiondetailsv3) — Get public extension details shown to end customers and configuring users.
- [`getPublicPortalConfig`](#getpublicportalconfig) — Retrieves the public portal configuration.
- [`getPublicPortalConfigV3`](#getpublicportalconfigv3) — Retrieves the public portal configuration.
- [`getPublicPortalWidgets`](#getpublicportalwidgets) — Retrieves the public widgets of a portal
- [`getSchemasByDomain`](#getschemasbydomain) — Retrieves schemas by domain. Only schemas and attributes used on public pages are returned.
- [`getOrganizationSettingsByDomain`](#getorganizationsettingsbydomain) — Retrieves organization settings by domain. Only public organization settings are returned.
- [`checkContactExists`](#checkcontactexists) — True if contact with given identifiers exists.
- [`checkContactExistsV3`](#checkcontactexistsv3) — True if contact with given identifiers exists.
- [`confirmUser`](#confirmuser) — Confirm a portal user
- [`confirmUserWithUserId`](#confirmuserwithuserid) — Confirm a portal user
- [`userExists`](#userexists) — Checks whether a user exists in the portal
- [`userExistsV3`](#userexistsv3) — Checks whether a user exists in the portal
- [`ssoRedirect`](#ssoredirect) — Handles the redirect from the external SSO provider. Validates the authorization `code` and `state` received from the pr
- [`ssoCallback`](#ssocallback) — Handles the callback from the external SSO provider, validates the authorization `code`
- [`getPublicPages`](#getpublicpages) — Fetch all public portal pages
- [`getUserEntryPoint`](#getuserentrypoint) — Get the entry point for the user
- [`deRegisterMLoginUser`](#deregistermloginuser) — Deregisters a user from the M Login client
- [`notifyMLoginInterestChange`](#notifymlogininterestchange) — Notifies the interest change of a user in the M Login client

**ECP**
- [`validateToken`](#validatetoken) — Validates Portal Token is valid. Pass the token via Authorization Header.
- [`revokeToken`](#revoketoken) — Revokes all of the access tokens for the given Refresh Token.
- [`getConsumption`](#getconsumption) — Get energy consumption data between a given time period.
- [`getCosts`](#getcosts) — Get energy cost data between a given time period.
- [`getPrices`](#getprices) — Get energy prices data between a given time period.
- [`getResolvedSeamlessLink`](#getresolvedseamlesslink) — Retrieves a resolved seamless portal link.
- [`getSchemas`](#getschemas) — Retrieves the schemas. Only schemas usable in the private part of the portal are returned.
- [`getContact`](#getcontact) — Retrieves the contact of the logged in user.
- [`updateContact`](#updatecontact) — Updates the contact details.
- [`getPortalUser`](#getportaluser) — Get the portal user details
- [`updatePortalUser`](#updateportaluser) — Update the portal user details
- [`deletePortalUser`](#deleteportaluser) — Delete the portal user
- [`updatePortalUserEmail`](#updateportaluseremail) — Update portal user email
- [`getAllOrders`](#getallorders) — Get all orders for the portal user
- [`postOrderAcceptance`](#postorderacceptance) — Accept/decline an offer by id
- [`getOrder`](#getorder) — Get an order by id
- [`updateOrder`](#updateorder) — Update an order by id
- [`getAllOpportunities`](#getallopportunities) — Get all opportunities of a portal user
- [`getSearchableAttributesForOpportunities`](#getsearchableattributesforopportunities) — Get all opportunity searchable attributes for a portal user
- [`getSearchResultsForOpportunities`](#getsearchresultsforopportunities) — Get all opportunity with the given serached attributes
- [`getOpportunity`](#getopportunity) — Get an opportunity by id
- [`updateOpportunity`](#updateopportunity) — Update an opportunity by id
- [`getAllRequests`](#getallrequests) — Get all opportunities & orders of a portal user
- [`getAllContracts`](#getallcontracts) — Get all contracts for a portal user
- [`getContract`](#getcontract) — Get a contract by id
- [`updateContract`](#updatecontract) — Update a contract by id
- [`addContractByIdentifiers`](#addcontractbyidentifiers) — Self-assign contract(s) by pre-configured identifiers.
- [`validateCadenceEntityEditRules`](#validatecadenceentityeditrules) — Validate if cadence rule is valid for an entity
- [`searchPaymentRelationsInEntities`](#searchpaymentrelationsinentities) — Search for entities that have the payment relation with the given payment id
- [`createCustomEntityActivity`](#createcustomentityactivity) — Create a custom activity that can be displayed in activity feed of an entity.
- [`saveEntityFile`](#saveentityfile) — Add files to an entity
- [`deleteEntityFile`](#deleteentityfile) — Delete files from an entity
- [`getFileById`](#getfilebyid) — Fetch a document with ID
- [`trackFileDownloaded`](#trackfiledownloaded) — Track that user has downloaded a file
- [`getBillingEvents`](#getbillingevents) — Fetch billing events for a portal user
- [`triggerEntityAccessEvent`](#triggerentityaccessevent) — Trigger entity access event for a portal user
- [`triggerEntityAccessEventV3`](#triggerentityaccesseventv3) — Trigger entity access event for a portal user
- [`getPortalUserEntity`](#getportaluserentity) — Get a single entity for a portal user
- [`searchPortalUserEntities`](#searchportaluserentities) — Search all entities of a portal user
- [`getAutomationContext`](#getautomationcontext) — Retrieves the automation context.
- [`updateWorkflowStepAsDone`](#updateworkflowstepasdone) — Update a workflow step as done
- [`getEntityWorkflows`](#getentityworkflows) — Get all workflows associated with an entity (requires access to the entity)
- [`uploadMeterReadingPhoto`](#uploadmeterreadingphoto) — Uploads a Meter Reading photo and - if enabled - gives back data extracted from the photo.
- [`createMeterReading`](#createmeterreading) — Inserts a new meter reading.
- [`getAllowedMeterReadingRange`](#getallowedmeterreadingrange) — Get allowed reading range for all counters of a meter from the configured
- [`getPortalPage`](#getportalpage) — Fetch a portal page by id
- [`getPortalPages`](#getportalpages) — Fetch all portal pages
- [`getPortalPageBlocks`](#getportalpageblocks) — Fetch all portal page blocks
- [`getPortalPageBlock`](#getportalpageblock) — Fetch a portal page block by id
- [`updateCampaignPortalBlockStatus`](#updatecampaignportalblockstatus) — Updates the status of a campaign portal block for multiple recipients.
- [`updateNotificationsStatus`](#updatenotificationsstatus) — Updates the statuses of multiple notifications at once.
- [`invitePartner`](#invitepartner) — Invites a partner to a portal
- [`listBusinessPartners`](#listbusinesspartners) — Lists all business partners linked to the businessaccount
- [`resendPartnerInvitation`](#resendpartnerinvitation) — Resends an invitation email to a partner
- [`revokePartner`](#revokepartner) — Revokes a partner from a portal
- [`disablePartner`](#disablepartner) — Disables a partner from a portal
- [`enablePartner`](#enablepartner) — Enables a partner from a portal

**Activity**
- [`getEntityActivityFeed`](#getentityactivityfeed) — Get activity feed for an entity

**Balance**
- [`getCustomerBalance`](#getcustomerbalance) — Get total balance across all contracts and orders of a customer entity.

**Billing Accounts**
- [`getBillingAccount`](#getbillingaccount) — Get a billing account by id.

**Login**
- [`ssoLogin`](#ssologin) — Initiate login using external SSO identity.
- [`ssoLoginV3`](#ssologinv3) — Initiate login using external SSO identity.

### `upsertPortal`

Upserts the settings for a portal of an organization.

`POST /v2/portal/portal`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |
| `portal_id` | query | string | No | Portal ID |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal upsertPortal \
  -p origin=example
```

With request body:

```bash
epilot customer-portal upsertPortal \
  -p origin=example \
  -d '{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal upsertPortal -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal upsertPortal -p origin=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ]
}
```

</details>

---

### `createUser`

Registers a portal user

`POST /v2/portal/public/user`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createUser \
  -p origin=example
```

With request body:

```bash
epilot customer-portal createUser \
  -p origin=example \
  -d '{
  "email": "testemail921@yopmail.com",
  "first_name": "John",
  "last_name": "Doe",
  "contactId": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "orgId": 728,
  "password": "124n$aAJs*d41h4",
  "contactIdentifiers": {},
  "registration_identifiers": {
    "contact": {
      "email": "john.doe@example.com"
    },
    "contract": {
      "contract_number": "123456"
    }
  },
  "account_id": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createUser -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal createUser -p origin=example --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "User created successfully"
}
```

</details>

---

### `createUserV3`

Registers a portal user with portal id

`POST /v3/portal/public/user`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | Origin of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createUserV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With request body:

```bash
epilot customer-portal createUserV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c \
  -d '{
  "email": "testemail921@yopmail.com",
  "first_name": "John",
  "last_name": "Doe",
  "contactId": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "orgId": 728,
  "password": "124n$aAJs*d41h4",
  "contactIdentifiers": {},
  "registration_identifiers": {
    "contact": {
      "email": "john.doe@example.com"
    },
    "contract": {
      "contract_number": "123456"
    }
  },
  "account_id": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createUserV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal createUserV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "User created successfully"
}
```

</details>

---

### `validateToken`

Validates Portal Token is valid. Pass the token via Authorization Header.

`POST /v2/portal/token/validate`

**Sample Call**

```bash
epilot customer-portal validateToken
```

With JSONata filter:

```bash
epilot customer-portal validateToken --jsonata '$'
```

---

### `revokeToken`

Revokes all of the access tokens for the given Refresh Token.

`POST /v2/portal/token/revoke`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal revokeToken
```

With request body:

```bash
epilot customer-portal revokeToken \
  -d '{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal revokeToken
```

With JSONata filter:

```bash
epilot customer-portal revokeToken --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Token revoked successfully"
}
```

</details>

---

### `getPortalConfigByDomain`

Retrieves the portal configuration by domain.

`GET /v2/portal/public/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal getPortalConfigByDomain \
  -p domain=example.com
```

With JSONata filter:

```bash
epilot customer-portal getPortalConfigByDomain -p domain=example.com --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ]
}
```

</details>

---

### `getPortalConfig`

Retrieves the portal configuration.

`GET /v2/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | No | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getPortalConfig
```

With JSONata filter:

```bash
epilot customer-portal getPortalConfig --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ]
}
```

</details>

---

### `deletePortal`

Deletes the portal.

`DELETE /v2/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal deletePortal \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal deletePortal -p origin=example --jsonata '$'
```

---

### `getPortalExtensions`

Retrieves the installed portal extensions.

`GET /v2/portal/extensions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | No | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getPortalExtensions
```

With JSONata filter:

```bash
epilot customer-portal getPortalExtensions --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "app_id": "string",
    "app_name": "string",
    "name": {
      "en": "string"
    },
    "description": {
      "en": "string"
    },
    "version": "string",
    "options": [
      {}
    ],
    "links": [
      {}
    ],
    "hooks": [
      {}
    ]
  }
]
```

</details>

---

### `getPublicPortalExtensionDetails`

Get public extension details shown to end customers and configuring users.

`GET /v2/portal/public/extensions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | Yes |  |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getPublicPortalExtensionDetails \
  -p org_id=12324 \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal getPublicPortalExtensionDetails -p org_id=12324 -p origin=example --jsonata 'consumptionDataRetrieval'
```

<details>
<summary>Sample Response</summary>

```json
{
  "consumptionDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "priceDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "costDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "contractIdentification": {
    "extension": {
      "id": "string",
      "name": {
        "en": "string"
      }
    },
    "hook": {
      "explanation": {
        "en": "This process will give you access to all Contracts kept"
      }
    }
  },
  "meterReadingPlausibilityCheck": {
    "extension": {
      "id": "string",
      "name": {
        "en": "string"
      }
    },
    "hook": {
      "plausibility_mode": "check"
    }
  }
}
```

</details>

---

### `getPortalExtensionsV3`

Retrieves the installed portal extensions.

`GET /v3/portal/extensions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | Portal ID |

**Sample Call**

```bash
epilot customer-portal getPortalExtensionsV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal getPortalExtensionsV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "app_id": "string",
    "app_name": "string",
    "name": {
      "en": "string"
    },
    "description": {
      "en": "string"
    },
    "version": "string",
    "options": [
      {}
    ],
    "links": [
      {}
    ],
    "hooks": [
      {}
    ]
  }
]
```

</details>

---

### `getPublicPortalExtensionDetailsV3`

Get public extension details shown to end customers and configuring users.

`GET /v3/portal/public/extensions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | No | Organization ID (required if domain is not provided) |
| `portal_id` | query | string | No | Portal ID (required if domain is not provided) |
| `domain` | query | string | No | Portal domain for identification (alternative to org_id + portal_id) |

**Sample Call**

```bash
epilot customer-portal getPublicPortalExtensionDetailsV3
```

With JSONata filter:

```bash
epilot customer-portal getPublicPortalExtensionDetailsV3 --jsonata 'consumptionDataRetrieval'
```

<details>
<summary>Sample Response</summary>

```json
{
  "consumptionDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "priceDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "costDataRetrieval": [
    {
      "extension": {
        "id": "string",
        "name": {
          "en": "string"
        }
      },
      "hook": {
        "id": "string",
        "name": {
          "en": "string"
        },
        "intervals": ["string"]
      }
    }
  ],
  "contractIdentification": {
    "extension": {
      "id": "string",
      "name": {
        "en": "string"
      }
    },
    "hook": {
      "explanation": {
        "en": "This process will give you access to all Contracts kept"
      }
    }
  },
  "meterReadingPlausibilityCheck": {
    "extension": {
      "id": "string",
      "name": {
        "en": "string"
      }
    },
    "hook": {
      "plausibility_mode": "check"
    }
  }
}
```

</details>

---

### `getConsumption`

Get energy consumption data between a given time period.

`GET /v2/portal/consumption`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `app_id` | query | string | No | App ID for consumption data. |
| `extensionId` | query | string | Yes | Extension ID for consumption data. |
| `hookId` | query | string | Yes | Hook ID for consumption data. |
| `meter_id` | query | string | No | Meter ID for consumption data. Deprecated - use context_entities instead. |
| `from` | query | string (date-time) | Yes | Start date for consumption data (ISO 8601 format). |
| `to` | query | string (date-time) | Yes | End date for consumption data (ISO 8601 format). |
| `interval` | query | "PT15M" \| "PT1H" \| "P1D" \| "P1M" | Yes | Interval between consumption data points (e.g., PT15M for 15 minutes, PT1H for hourly). Not all intervals have to be supported. |
| `context_entities` | query | object[] | No | Additional entities to include in the context for variable interpolation in the hook. |

**Sample Call**

```bash
epilot customer-portal getConsumption \
  -p extensionId=123e4567-e89b-12d3-a456-426614174000 \
  -p hookId=123e4567-e89b-12d3-a456-426614174000 \
  -p from=example \
  -p to=example \
  -p interval=example
```

With JSONata filter:

```bash
epilot customer-portal getConsumption -p extensionId=123e4567-e89b-12d3-a456-426614174000 -p hookId=123e4567-e89b-12d3-a456-426614174000 -p from=example -p to=example -p interval=example --jsonata 'consumptions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "consumptions": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "value": 0,
      "type": "string"
    }
  ]
}
```

</details>

---

### `getCosts`

Get energy cost data between a given time period.

`GET /v2/portal/costs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `app_id` | query | string | No | App ID for consumption data. |
| `extensionId` | query | string | Yes | Extension ID for cost data. |
| `hookId` | query | string | Yes | Hook ID for cost data. |
| `meter_id` | query | string | No | Meter ID for cost data. Deprecated - use context_entities instead. |
| `from` | query | string (date-time) | Yes | Start date for cost data (ISO 8601 format). |
| `to` | query | string (date-time) | Yes | End date for cost data (ISO 8601 format). |
| `interval` | query | "PT15M" \| "PT1H" \| "P1D" \| "P1M" | Yes | Interval between cost data points (e.g., PT15M for 15 minutes, PT1H for hourly). Not all intervals have to be supported. |
| `context_entities` | query | object[] | No | Additional entities to include in the context for variable interpolation in the hook. |

**Sample Call**

```bash
epilot customer-portal getCosts \
  -p extensionId=123e4567-e89b-12d3-a456-426614174000 \
  -p hookId=123e4567-e89b-12d3-a456-426614174000 \
  -p from=example \
  -p to=example \
  -p interval=example
```

With JSONata filter:

```bash
epilot customer-portal getCosts -p extensionId=123e4567-e89b-12d3-a456-426614174000 -p hookId=123e4567-e89b-12d3-a456-426614174000 -p from=example -p to=example -p interval=example --jsonata 'costs'
```

<details>
<summary>Sample Response</summary>

```json
{
  "costs": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "unit_amount": 1234,
      "unit_amount_currency": "EUR",
      "unit_amount_decimal": "12.34",
      "tax_behavior": "exclusive",
      "tax_rate": 19
    }
  ]
}
```

</details>

---

### `getPrices`

Get energy prices data between a given time period.

`GET /v2/portal/prices`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `app_id` | query | string | No | App ID for consumption data. |
| `extensionId` | query | string | Yes | Extension ID for price data. |
| `hookId` | query | string | Yes | Hook ID for price data. |
| `meter_id` | query | string | No | Meter ID for price data. Deprecated - use context_entities instead. |
| `from` | query | string (date-time) | Yes | Start date for price data (ISO 8601 format). |
| `to` | query | string (date-time) | Yes | End date for price data (ISO 8601 format). |
| `interval` | query | "PT15M" \| "PT1H" \| "P1D" \| "P1M" | Yes | Interval between price data points (e.g., PT15M for 15 minutes, PT1H for hourly). Not all intervals have to be supported. |
| `context_entities` | query | object[] | No | Additional entities to include in the context for variable interpolation in the hook. |

**Sample Call**

```bash
epilot customer-portal getPrices \
  -p extensionId=123e4567-e89b-12d3-a456-426614174000 \
  -p hookId=123e4567-e89b-12d3-a456-426614174000 \
  -p from=example \
  -p to=example \
  -p interval=example
```

With JSONata filter:

```bash
epilot customer-portal getPrices -p extensionId=123e4567-e89b-12d3-a456-426614174000 -p hookId=123e4567-e89b-12d3-a456-426614174000 -p from=example -p to=example -p interval=example --jsonata 'prices'
```

<details>
<summary>Sample Response</summary>

```json
{
  "prices": [
    {
      "timestamp": "1970-01-01T00:00:00.000Z",
      "unit_amount": 1234,
      "unit_amount_currency": "EUR",
      "unit_amount_decimal": "12.34",
      "components": {
        "auction_price_amount": 1000,
        "auction_price_amount_decimal": "10.00",
        "taxes_levies_amount": 50,
        "taxes_levies_amount_decimal": "0.50",
        "source_fee_amount": 50,
        "source_fee_amount_decimal": "0.50",
        "grid_fee_amount": 100,
        "grid_fee_amount_decimal": "1.00",
        "margin_amount": 34,
        "margin_amount_decimal": "0.34"
      },
      "tax_behavior": "exclusive",
      "tax_rate": 19
    }
  ]
}
```

</details>

---

### `getExternalLinks`

Retrieves the portal configuration external links.

`GET /v2/portal/external-links`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | No | Origin of the portal |
| `contactId` | query | string (uuid) | No | Contact ID of the user |

**Sample Call**

```bash
epilot customer-portal getExternalLinks
```

With JSONata filter:

```bash
epilot customer-portal getExternalLinks --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "label": {},
    "type": "link",
    "link": "string",
    "rules": [
      {}
    ],
    "attribute": "string",
    "entity": "string",
    "attribute_value": "string",
    "icon": {
      "name": "string",
      "color": "string",
      "size": 0
    },
    "extension_link_id": ["string"]
  }
]
```

</details>

---

### `getExternalLinksV3`

Retrieves the portal configuration external links.

`GET /v3/portal/external-links`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | No | PortalId of the portal |
| `contactId` | query | string (uuid) | No | Contact ID of the user |

**Sample Call**

```bash
epilot customer-portal getExternalLinksV3
```

With JSONata filter:

```bash
epilot customer-portal getExternalLinksV3 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "string",
    "label": {},
    "type": "link",
    "link": "string",
    "rules": [
      {}
    ],
    "attribute": "string",
    "entity": "string",
    "attribute_value": "string",
    "icon": {
      "name": "string",
      "color": "string",
      "size": 0
    },
    "extension_link_id": ["string"]
  }
]
```

</details>

---

### `getResolvedSeamlessLink`

Retrieves a resolved seamless portal link.

`GET /v2/portal/resolve:seamless-link`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `app_id` | query | string | No | ID of the App if the Portal Extension was installed from an App |
| `extension_id` | query | string | Yes | ID of the Portal Extension |
| `link_id` | query | string | Yes | ID of the Seamless Link |
| `context_entities` | query | object[] | No | If the request is in a context of certain entities (i.e. the user in in a context of a specific contract), links can be customized for that. Portal User and Contact entities are automatically part of  |

**Sample Call**

```bash
epilot customer-portal getResolvedSeamlessLink \
  -p extension_id=123e4567-e89b-12d3-a456-426614174000 \
  -p link_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal getResolvedSeamlessLink -p extension_id=123e4567-e89b-12d3-a456-426614174000 -p link_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'link'
```

<details>
<summary>Sample Response</summary>

```json
{
  "link": "string"
}
```

</details>

---

### `getPublicPortalConfig`

Retrieves the public portal configuration.

`GET /v2/portal/public/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | Yes |  |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getPublicPortalConfig \
  -p org_id=12324 \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal getPublicPortalConfig -p org_id=12324 -p origin=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ]
}
```

</details>

---

### `getOrgPortalConfig`

Retrieves the portal configuration for the organization.

`GET /v2/portal/org/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getOrgPortalConfig \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal getOrgPortalConfig -p origin=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "certificate_details": {
    "status": "PENDING_VALIDATION",
    "failed_reason": "CAA_ERROR"
  }
}
```

</details>

---

### `getPublicPortalConfigV3`

Retrieves the public portal configuration.

`GET /v3/portal/public/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | Yes |  |
| `portal_id` | query | string | Yes | PortalId of the portal |

**Sample Call**

```bash
epilot customer-portal getPublicPortalConfigV3 \
  -p org_id=12324 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal getPublicPortalConfigV3 -p org_id=12324 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ]
}
```

</details>

---

### `getOrgPortalConfigV3`

Retrieves the portal configuration for the organization.

`GET /v3/portal/org/portal/config`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | PortalId of the portal |

**Sample Call**

```bash
epilot customer-portal getOrgPortalConfigV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal getOrgPortalConfigV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": {},
  "id": 12345,
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "certificate_details": {
    "status": "PENDING_VALIDATION",
    "failed_reason": "CAA_ERROR"
  }
}
```

</details>

---

### `getAllPortalConfigs`

Retrieves all portal configurations.

`GET /v2/portal/configs`

**Sample Call**

```bash
epilot customer-portal getAllPortalConfigs
```

With JSONata filter:

```bash
epilot customer-portal getAllPortalConfigs --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "enabled": true,
      "name": "Installer Portal",
      "domain": "abc.com",
      "is_epilot_domain": true,
      "epilot_domain": "example-portal-12345.ecp.epilot.cloud",
      "domain_settings": {},
      "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
      "user_account_self_management": false,
      "feature_settings": {},
      "accessToken": "string",
      "advanced_mfa": {},
      "auth_settings": {},
      "cognito_details": {},
      "config": "string",
      "contact_identifiers": ["email", "last_name"],
      "approval_state_attributes": {},
      "email_templates": {},
      "images": {},
      "entity_identifiers": {},
      "contract_identifiers": [],
      "contract_selector_config": {},
      "registration_identifiers": [],
      "triggered_journeys": [],
      "entity_edit_rules": [],
      "allowed_file_extensions": {},
      "prevent_search_engine_indexing": true,
      "meter_reading_grace_period": 0,
      "inactive_contract_cutoff_years": 0,
      "is_dummy": true,
      "is_v3_item": true,
      "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
      "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
      "origin": "string",
      "pages": {},
      "id": 12345,
      "organization_id": 12345,
      "org_settings": {},
      "feature_flags": {},
      "grants": [],
      "identity_providers": []
    }
  ]
}
```

</details>

---

### `getEmailTemplates`

Retrieves the email templates of a portal

`GET /v2/portal/email-templates`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getEmailTemplates \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal getEmailTemplates -p origin=example --jsonata 'confirmAccount'
```

<details>
<summary>Sample Response</summary>

```json
{
  "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
}
```

</details>

---

### `upsertEmailTemplates`

Upserts the email templates of a portal

`POST /v2/portal/email-templates`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal upsertEmailTemplates \
  -p origin=example
```

With request body:

```bash
epilot customer-portal upsertEmailTemplates \
  -p origin=example \
  -d '{
  "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal upsertEmailTemplates -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal upsertEmailTemplates -p origin=example --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Email Templates upserted successfully",
  "emailTemplates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  }
}
```

</details>

---

### `getEmailTemplatesByPortalId`

Retrieves the email templates of a portal by portal ID

`GET /v3/portal/email-templates/{portal_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | path | string | Yes | ID of the portal |

**Sample Call**

```bash
epilot customer-portal getEmailTemplatesByPortalId \
  -p portal_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal getEmailTemplatesByPortalId 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal getEmailTemplatesByPortalId -p portal_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'confirmAccount'
```

<details>
<summary>Sample Response</summary>

```json
{
  "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
}
```

</details>

---

### `upsertEmailTemplatesByPortalId`

Upserts the email templates of a portal by portal ID

`POST /v3/portal/email-templates/{portal_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | path | string | Yes | ID of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal upsertEmailTemplatesByPortalId \
  -p portal_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot customer-portal upsertEmailTemplatesByPortalId \
  -p portal_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal upsertEmailTemplatesByPortalId 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal upsertEmailTemplatesByPortalId -p portal_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal upsertEmailTemplatesByPortalId -p portal_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Email Templates upserted successfully",
  "emailTemplates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  }
}
```

</details>

---

### `getPublicPortalWidgets`

Retrieves the public widgets of a portal

`GET /v2/portal/public-widgets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `org_id` | query | string | Yes |  |
| `origin` | query | string | Yes | Origin of the portal |

**Sample Call**

```bash
epilot customer-portal getPublicPortalWidgets \
  -p org_id=123 \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal getPublicPortalWidgets -p org_id=123 -p origin=example --jsonata 'widgets'
```

<details>
<summary>Sample Response</summary>

```json
{
  "widgets": [
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "schema": "string"
    },
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "content": "string"
    }
  ]
}
```

</details>

---

### `getPortalWidgets`

Retrieves the widgets of a portal

`GET /v2/portal/widgets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | No | Origin of the portal |
| `contract_id` | query | string (uuid) | No | Contract context for widgets |

**Sample Call**

```bash
epilot customer-portal getPortalWidgets
```

With JSONata filter:

```bash
epilot customer-portal getPortalWidgets --jsonata 'widgets'
```

<details>
<summary>Sample Response</summary>

```json
{
  "widgets": [
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "schema": "string"
    },
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "content": "string"
    }
  ]
}
```

</details>

---

### `upsertPortalWidget`

Upsert widget for a portal of an organization.

`POST /v2/portal/widgets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal upsertPortalWidget \
  -p origin=example
```

With request body:

```bash
epilot customer-portal upsertPortalWidget \
  -p origin=example \
  -d '{
  "widgets": [
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "schema": "string"
    },
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "content": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal upsertPortalWidget -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal upsertPortalWidget -p origin=example --jsonata 'widgets'
```

<details>
<summary>Sample Response</summary>

```json
{
  "widgets": [
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "schema": "string"
    },
    {
      "id": "string",
      "type": "ACTION_WIDGET",
      "listIndex": 0,
      "headline": {
        "en": "string",
        "de": "string"
      },
      "subHeadline": {
        "en": "string",
        "de": "string"
      },
      "content": "string"
    }
  ]
}
```

</details>

---

### `replaceECPTemplateVariables`

Replaces the template variables of a portal

`POST /v2/portal/replace-ecp-template-variables`

**Request Body**

**Sample Call**

```bash
epilot customer-portal replaceECPTemplateVariables \
  -d '{"template_id":"5da0a718-c822-403d-9f5d-20d4584e0528","entity_context":{}}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal replaceECPTemplateVariables
```

With JSONata filter:

```bash
epilot customer-portal replaceECPTemplateVariables --jsonata 'customerPortal'
```

<details>
<summary>Sample Response</summary>

```json
{
  "customerPortal": {
    "invitationLink": "https://end-customer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com",
    "newDocumentLink": "https://end-customer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "entityLink": "https://end-customer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "userEmailsOnEntity": ["john@doe.com", "mary@doe.com"]
  },
  "installerPortal": {
    "invitationLink": "https://installer-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com",
    "newDocumentLink": "https://installer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "entityLink": "https://installer-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "userEmailsOnEntity": ["peter@doe.com", "jane@doe.com"]
  },
  "portalUser": {
    "invitationLink": "https://employee-portal.ecp.dev.epilot.io/register?contactId=7aa44fb8-d60e-40cc-9a3a-ba09a1ff7f51&email=john@doe.com",
    "newDocumentLink": "https://employee-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "entityLink": "https://employee-portal.ecp.dev.epilot.io/requests/opportunities/b8fef220-abe0-4382-a704-26848f60977b",
    "userEmailsOnEntity": ["peter@doe.com", "jane@doe.com"]
  }
}
```

</details>

---

### `getSchemas`

Retrieves the schemas. Only schemas usable in the private part of the portal are returned.

`GET /v2/portal/schemas`

**Sample Call**

```bash
epilot customer-portal getSchemas
```

With JSONata filter:

```bash
epilot customer-portal getSchemas --jsonata 'schemas'
```

<details>
<summary>Sample Response</summary>

```json
{
  "schemas": [
    {
      "slug": "contact"
    }
  ]
}
```

</details>

---

### `getSchemasByDomain`

Retrieves schemas by domain. Only schemas and attributes used on public pages are returned.

`GET /v2/portal/public/schemas`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal getSchemasByDomain \
  -p domain=ecp.dev.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal getSchemasByDomain -p domain=ecp.dev.epilot.io --jsonata 'schemas'
```

<details>
<summary>Sample Response</summary>

```json
{
  "schemas": [
    {
      "slug": "contact"
    }
  ]
}
```

</details>

---

### `getOrganizationSettingsByDomain`

Retrieves organization settings by domain. Only public organization settings are returned.

`GET /v2/portal/public/org/settings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal getOrganizationSettingsByDomain \
  -p domain=ecp.dev.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal getOrganizationSettingsByDomain -p domain=ecp.dev.epilot.io --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "automation_entity_mapping": {
      "enabled": true
    },
    "automation_preview": {
      "enabled": true
    },
    "central_inbox_preview_setting": {
      "enabled": true
    },
    "contracts_preview_setting": {
      "enabled": true
    },
    "disable_ivy": {
      "enabled": true
    },
    "double_opt_in": {
      "enabled": true
    },
    "ecommerce_catalog_preview": {
      "enabled": true
    },
    "ecommerce_opportunities_preview": {
      "enabled": true
    },
    "ecommerce_preview": {
      "enabled": true
    },
    "end_customer_portal": {
      "enabled": true
    },
    "installer_portal": {
      "enabled": true
    },
    "entity_schema_builder": {
      "enabled": true
    },
    "logic_editor_preview": {
      "enabled": true
    },
    "new_navigation": {
      "enabled": true
    },
    "partnering": {
      "enabled": true
    },
    "product-availability": {
      "enabled": true
    },
    "sso": {
      "enabled": true
    },
    "submission_preview": {
      "enabled": true
    },
    "user_roles_preview": {
      "enabled": true
    }
  }
}
```

</details>

---

### `extraPermissionAttributes`

Retrieves the extra permission attributes.

`GET /v2/portal/extra-permission-attributes`

**Sample Call**

```bash
epilot customer-portal extraPermissionAttributes
```

With JSONata filter:

```bash
epilot customer-portal extraPermissionAttributes --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "contact": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ],
    "contract": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ],
    "order": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ],
    "opportunity": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ],
    "meter": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ],
    "meter_counter": [
      {
        "name": "string",
        "label": "string",
        "group": "string"
      }
    ]
  }
}
```

</details>

---

### `validateCaaRecords`

Validates the CAA records of a portal

`POST /v2/portal/validate/caa-records`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal validateCaaRecords \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal validateCaaRecords -p origin=example --jsonata 'retry'
```

<details>
<summary>Sample Response</summary>

```json
{
  "retry": true,
  "message": "string",
  "isDNSConfigured": true
}
```

</details>

---

### `validateCaaRecordsV3`

Validates the CAA records of a portal

`POST /v3/portal/validate/caa-records`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | PortalId of the portal |

**Sample Call**

```bash
epilot customer-portal validateCaaRecordsV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal validateCaaRecordsV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata 'retry'
```

<details>
<summary>Sample Response</summary>

```json
{
  "retry": true,
  "message": "string",
  "isDNSConfigured": true
}
```

</details>

---

### `getContact`

Retrieves the contact of the logged in user.

`GET /v2/portal/contact`

**Sample Call**

```bash
epilot customer-portal getContact
```

With JSONata filter:

```bash
epilot customer-portal getContact --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "contact"
  },
  "files": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ],
  "relations": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {
        "content_top_name": "Customer #123456",
        "main_content_name": "Orange Flexible A2 (654321)",
        "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
        "nested_content": {
          "title": "Orange Flexible A2",
          "subtitle": "654321"
        }
      },
      "_schema": "contact"
    }
  ],
  "journey_actions": [
    {
      "journey_id": "string",
      "action_label": {
        "en": "string",
        "de": "string"
      },
      "slug": "string",
      "rules": [
        {
          "entity": "string",
          "attribute": "string",
          "attribute_value": "string"
        }
      ]
    }
  ]
}
```

</details>

---

### `updateContact`

Updates the contact details.

`PATCH /v2/portal/contact`

**Request Body**

**Sample Call**

```bash
epilot customer-portal updateContact \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateContact
```

With JSONata filter:

```bash
epilot customer-portal updateContact --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "contact"
  }
}
```

</details>

---

### `getECPContact`

Get the Contact by id

`GET /v2/portal/ecp/contact`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | query | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal getECPContact \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getECPContact -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "contact"
  }
}
```

</details>

---

### `checkContactExists`

True if contact with given identifiers exists.

`POST /v2/portal/public/contact/exists`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal checkContactExists \
  -p origin=example
```

With request body:

```bash
epilot customer-portal checkContactExists \
  -p origin=example \
  -d '{
  "org_id": 728,
  "registration_identifiers": {
    "contact": {
      "email": "john.doe@example.com"
    },
    "contract": {
      "contract_number": "123456"
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal checkContactExists -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal checkContactExists -p origin=example --jsonata 'exists'
```

<details>
<summary>Sample Response</summary>

```json
{
  "exists": true,
  "contactId": "5da0a718-c822-403d-9f5d-20d4584e0528"
}
```

</details>

---

### `checkContactExistsV3`

True if contact with given identifiers exists.

`POST /v3/portal/public/contact/exists`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | PortalId of the portal |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal checkContactExistsV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With request body:

```bash
epilot customer-portal checkContactExistsV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c \
  -d '{
  "org_id": 728,
  "registration_identifiers": {
    "contact": {
      "email": "john.doe@example.com"
    },
    "contract": {
      "contract_number": "123456"
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal checkContactExistsV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal checkContactExistsV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata 'exists'
```

<details>
<summary>Sample Response</summary>

```json
{
  "exists": true,
  "contactId": "5da0a718-c822-403d-9f5d-20d4584e0528"
}
```

</details>

---

### `getValidSecondaryAttributes`

Get valid secondary attributes that are used while mapping a contact on registration

`GET /v2/portal/contact/valid/secondary/attributes`

**Sample Call**

```bash
epilot customer-portal getValidSecondaryAttributes
```

With JSONata filter:

```bash
epilot customer-portal getValidSecondaryAttributes --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "name": "first_name",
      "type": "string"
    }
  ]
}
```

</details>

---

### `getPortalUser`

Get the portal user details

`GET /v2/portal/user`

**Sample Call**

```bash
epilot customer-portal getPortalUser
```

With JSONata filter:

```bash
epilot customer-portal getPortalUser --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "portal_user"
  }
}
```

</details>

---

### `updatePortalUser`

Update the portal user details

`PATCH /v2/portal/user`

**Request Body**

**Sample Call**

```bash
epilot customer-portal updatePortalUser \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updatePortalUser
```

With JSONata filter:

```bash
epilot customer-portal updatePortalUser --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "portal_user"
  }
}
```

</details>

---

### `deletePortalUser`

Delete the portal user

`DELETE /v2/portal/user`

**Sample Call**

```bash
epilot customer-portal deletePortalUser
```

With JSONata filter:

```bash
epilot customer-portal deletePortalUser --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "User Succesfully Deleted",
  "data": "5da0a718-c822-403d-9f5d-20d4584e0528"
}
```

</details>

---

### `updatePortalUserEmail`

Update portal user email

`PUT /v2/portal/user/update/email`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updatePortalUserEmail \
  -d '{"email":"john@doe.com","password":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updatePortalUserEmail
```

With JSONata filter:

```bash
epilot customer-portal updatePortalUserEmail --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "You will receive a confirmation mail soon on your updated email address."
}
```

</details>

---

### `resendConfirmationEmail`

Resend confirmation email

`POST /v2/portal/user/resend/confirmation-email/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of portal user id |

**Sample Call**

```bash
epilot customer-portal resendConfirmationEmail \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal resendConfirmationEmail 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal resendConfirmationEmail -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Confirmation email sent successfully."
}
```

</details>

---

### `fetchPortalUsersByRelatedEntity`

Get all users for a given entity

`GET /v2/portal/users/by-related-entity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entity_id` | query | string (uuid) | Yes |  |
| `slug` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal fetchPortalUsersByRelatedEntity \
  -p entity_id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p slug=contact
```

With JSONata filter:

```bash
epilot customer-portal fetchPortalUsersByRelatedEntity -p entity_id=5da0a718-c822-403d-9f5d-20d4584e0528 -p slug=contact --jsonata 'portalUsers'
```

<details>
<summary>Sample Response</summary>

```json
{
  "portalUsers": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "portal_user"
    }
  ]
}
```

</details>

---

### `confirmUser`

Confirm a portal user

`GET /v2/portal/user/confirm`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `confirmation_link_token` | query | string | Yes |  |
| `use_redirect` | query | boolean | No |  |

**Sample Call**

```bash
epilot customer-portal confirmUser \
  -p confirmation_link_token=example
```

With JSONata filter:

```bash
epilot customer-portal confirmUser -p confirmation_link_token=example --jsonata 'confirmed'
```

<details>
<summary>Sample Response</summary>

```json
{
  "confirmed": true,
  "user_already_confirmed": true
}
```

</details>

---

### `confirmUserWithUserId`

Confirm a portal user

`GET /v2/portal/user/confirm/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes |  |
| `id` | path | string (uuid) | Yes | The ID of portal user id |
| `org_id` | query | string | Yes | Organization ID |

**Sample Call**

```bash
epilot customer-portal confirmUserWithUserId \
  -p origin=example \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p org_id=123
```

Using positional args for path parameters:

```bash
epilot customer-portal confirmUserWithUserId 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal confirmUserWithUserId -p origin=example -p id=5da0a718-c822-403d-9f5d-20d4584e0528 -p org_id=123 --jsonata '$'
```

---

### `userExists`

Checks whether a user exists in the portal

`GET /v2/portal/public/user/exists`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | query | string | Yes |  |
| `org_id` | query | string | Yes |  |
| `origin` | query | string | No | Checkes if user exists in the given portal origin. If not provided, checks in all origins. |

**Sample Call**

```bash
epilot customer-portal userExists \
  -p email=user@example.com \
  -p org_id=123
```

With JSONata filter:

```bash
epilot customer-portal userExists -p email=user@example.com -p org_id=123 --jsonata 'exists'
```

<details>
<summary>Sample Response</summary>

```json
{
  "exists": true
}
```

</details>

---

### `userExistsV3`

Checks whether a user exists in the portal

`GET /v3/portal/public/user/exists`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | query | string | Yes |  |
| `org_id` | query | string | Yes |  |
| `portal_id` | query | string | No | Checkes if user exists in the given portal ID. If not provided, checks in all portals. |

**Sample Call**

```bash
epilot customer-portal userExistsV3 \
  -p email=user@example.com \
  -p org_id=123
```

With JSONata filter:

```bash
epilot customer-portal userExistsV3 -p email=user@example.com -p org_id=123 --jsonata 'exists'
```

<details>
<summary>Sample Response</summary>

```json
{
  "exists": true
}
```

</details>

---

### `getRecipientsToNotifyOnAutomation`

Get recipients to notify on automation

`POST /v2/portal/recipients-to-notify`

**Request Body**

**Sample Call**

```bash
epilot customer-portal getRecipientsToNotifyOnAutomation
```

With request body:

```bash
epilot customer-portal getRecipientsToNotifyOnAutomation \
  -d '{
  "emails": ["john@doe.com"],
  "template_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "context_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal getRecipientsToNotifyOnAutomation
```

With JSONata filter:

```bash
epilot customer-portal getRecipientsToNotifyOnAutomation --jsonata 'recipients'
```

<details>
<summary>Sample Response</summary>

```json
{
  "recipients": [
    {
      "email": "john@doe.com",
      "recipient_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "message": "string"
}
```

</details>

---

### `configureDistribution`

Configure the distribution for the portal's custom domain

`GET /v2/portal/configure-distribution`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal configureDistribution \
  -p origin=example
```

With JSONata filter:

```bash
epilot customer-portal configureDistribution -p origin=example --jsonata 'domainName'
```

<details>
<summary>Sample Response</summary>

```json
{
  "domainName": "dsj8op4ha01jha23.cloudfront.net"
}
```

</details>

---

### `configureDistributionV3`

Configure the distribution for the portal's custom domain

`GET /v3/portal/configure-distribution`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal configureDistributionV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

With JSONata filter:

```bash
epilot customer-portal configureDistributionV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata 'domainName'
```

<details>
<summary>Sample Response</summary>

```json
{
  "domainName": "dsj8op4ha01jha23.cloudfront.net"
}
```

</details>

---

### `getAllOrders`

Get all orders for the portal user

`GET /v2/portal/order`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot customer-portal getAllOrders
```

With JSONata filter:

```bash
epilot customer-portal getAllOrders --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "order",
      "journey_actions": {
        "journey_id": "string",
        "action_label": {
          "en": "string",
          "de": "string"
        },
        "slug": "string",
        "rules": [
          {
            "entity": "string",
            "attribute": "string",
            "attribute_value": "string"
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `postOrderAcceptance`

Accept/decline an offer by id

`POST /v2/portal/order/{id}/acceptance`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of order |

**Request Body**

**Sample Call**

```bash
epilot customer-portal postOrderAcceptance \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{"decision":"accept"}'
```

Using positional args for path parameters:

```bash
epilot customer-portal postOrderAcceptance 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal postOrderAcceptance -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal postOrderAcceptance -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "order"
  }
}
```

</details>

---

### `getOrder`

Get an order by id

`GET /v2/portal/order/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of order |

**Sample Call**

```bash
epilot customer-portal getOrder \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getOrder 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getOrder -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "order"
  },
  "files": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ],
  "relations": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {},
      "_schema": "contact"
    }
  ],
  "products": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "product"
    }
  ],
  "crossSellableProducts": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "product"
    }
  ],
  "workflow": [
    {
      "id": "8gja72h6kas6h",
      "name": "Lead Qualification",
      "trigger": "MANUAL",
      "status": "STARTED",
      "creationTime": "2021-04-27T12:01:13.000Z",
      "lastUpdateTime": "2021-04-27T12:01:13.000Z",
      "dueDate": "2021-04-27T12:01:13.000Z",
      "assignedTo": ["252", "29052"],
      "flow": []
    }
  ],
  "journey_actions": [
    {
      "journey_id": "string",
      "action_label": {},
      "slug": "string",
      "rules": []
    }
  ]
}
```

</details>

---

### `updateOrder`

Update an order by id

`PATCH /v2/portal/order/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of order |

**Request Body**

**Sample Call**

```bash
epilot customer-portal updateOrder \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updateOrder 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateOrder -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal updateOrder -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "order"
  }
}
```

</details>

---

### `getAllOpportunities`

Get all opportunities of a portal user

`GET /v2/portal/opportunity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot customer-portal getAllOpportunities
```

With JSONata filter:

```bash
epilot customer-portal getAllOpportunities --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "opportunity",
      "journey_actions": {
        "journey_id": "string",
        "action_label": {
          "en": "string",
          "de": "string"
        },
        "slug": "string",
        "rules": [
          {
            "entity": "string",
            "attribute": "string",
            "attribute_value": "string"
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `getSearchableAttributesForOpportunities`

Get all opportunity searchable attributes for a portal user

`GET /v2/portal/opportunities/searchable-attributes`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot customer-portal getSearchableAttributesForOpportunities
```

With JSONata filter:

```bash
epilot customer-portal getSearchableAttributesForOpportunities --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "opportunity"
    }
  ]
}
```

</details>

---

### `getSearchResultsForOpportunities`

Get all opportunity with the given serached attributes

`POST /v2/portal/opportunities/search`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal getSearchResultsForOpportunities \
  -d '{"addresses":["string"],"customers":["string"],"purposes":["5da0a718-c822-403d-9f5d-20d4584e0528"],"workflows":[{}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal getSearchResultsForOpportunities
```

With JSONata filter:

```bash
epilot customer-portal getSearchResultsForOpportunities --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "opportunity"
    }
  ]
}
```

</details>

---

### `getOpportunity`

Get an opportunity by id

`GET /v2/portal/opportunities/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of opportunity |

**Sample Call**

```bash
epilot customer-portal getOpportunity \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getOpportunity 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getOpportunity -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "opportunity"
  },
  "orders": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "order"
    }
  ],
  "files": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ],
  "relations": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {},
      "_schema": "contact"
    }
  ],
  "workflow": [
    {
      "id": "8gja72h6kas6h",
      "name": "Lead Qualification",
      "trigger": "MANUAL",
      "status": "STARTED",
      "creationTime": "2021-04-27T12:01:13.000Z",
      "lastUpdateTime": "2021-04-27T12:01:13.000Z",
      "dueDate": "2021-04-27T12:01:13.000Z",
      "assignedTo": ["252", "29052"],
      "flow": []
    }
  ],
  "journey_actions": [
    {
      "journey_id": "string",
      "action_label": {},
      "slug": "string",
      "rules": []
    }
  ]
}
```

</details>

---

### `updateOpportunity`

Update an opportunity by id

`PATCH /v2/portal/opportunities/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of opportunity |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updateOpportunity \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updateOpportunity 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateOpportunity -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal updateOpportunity -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "opportunity"
  }
}
```

</details>

---

### `getAllRequests`

Get all opportunities & orders of a portal user

`GET /v2/portal/request`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot customer-portal getAllRequests
```

With JSONata filter:

```bash
epilot customer-portal getAllRequests --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "opportunity"
    }
  ]
}
```

</details>

---

### `getAllContracts`

Get all contracts for a portal user

`GET /v2/portal/contract`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot customer-portal getAllContracts
```

With JSONata filter:

```bash
epilot customer-portal getAllContracts --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "contract_name": "Grid Contract",
      "contract_number": "12345",
      "status": "approved",
      "description": "This contract is for the supply of widgets.",
      "account_number": "67890",
      "branch": "power",
      "billing_address": "123 Main St, Anytown",
      "delivery_address": "456 Elm St, Anytown",
      "additional_addresses": "789 Oak St, Anytown",
      "termination_date": "2022-01-01",
      "termination_reason": "Non-payment",
      "billing_period": "monthly",
      "billing_duration_amount": 30,
      "renewal_duration_amount": 365,
      "renewal_duration_unit": "years",
      "notice_time_amount": 30,
      "notice_time_unit": "months",
      "start_date": "2021-01-01",
      "billing_due_day": 2,
      "installment_amount": 10050,
      "balance": 8990,
      "balance_currency": "EUR",
      "journey_actions": {
        "journey_id": "string",
        "action_label": {
          "en": "string",
          "de": "string"
        },
        "slug": "string",
        "rules": [
          {
            "entity": "string",
            "attribute": "string",
            "attribute_value": "string"
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `getContract`

Get a contract by id

`GET /v2/portal/contract/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of the contract |

**Sample Call**

```bash
epilot customer-portal getContract \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getContract 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getContract -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "contract_name": "Grid Contract",
    "contract_number": "12345",
    "status": "approved",
    "description": "This contract is for the supply of widgets.",
    "account_number": "67890",
    "branch": "power",
    "billing_address": "123 Main St, Anytown",
    "delivery_address": "456 Elm St, Anytown",
    "additional_addresses": "789 Oak St, Anytown",
    "termination_date": "2022-01-01",
    "termination_reason": "Non-payment",
    "billing_period": "monthly",
    "billing_duration_amount": 30,
    "renewal_duration_amount": 365,
    "renewal_duration_unit": "years",
    "notice_time_amount": 30,
    "notice_time_unit": "months",
    "start_date": "2021-01-01",
    "billing_due_day": 2,
    "installment_amount": 10050,
    "balance": 8990,
    "balance_currency": "EUR"
  },
  "orders": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "order"
    }
  ],
  "meters": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter"
    }
  ],
  "files": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ],
  "relations": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {},
      "_schema": "contact"
    }
  ],
  "workflow": [
    {
      "id": "8gja72h6kas6h",
      "name": "Lead Qualification",
      "trigger": "MANUAL",
      "status": "STARTED",
      "creationTime": "2021-04-27T12:01:13.000Z",
      "lastUpdateTime": "2021-04-27T12:01:13.000Z",
      "dueDate": "2021-04-27T12:01:13.000Z",
      "assignedTo": ["252", "29052"],
      "flow": []
    }
  ],
  "journey_actions": [
    {
      "journey_id": "string",
      "action_label": {},
      "slug": "string",
      "rules": []
    }
  ]
}
```

</details>

---

### `updateContract`

Update a contract by id

`PATCH /v2/portal/contract/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of the contract |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updateContract \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updateContract 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateContract -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal updateContract -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "contract_name": "Grid Contract",
    "contract_number": "12345",
    "status": "approved",
    "description": "This contract is for the supply of widgets.",
    "account_number": "67890",
    "branch": "power",
    "billing_address": "123 Main St, Anytown",
    "delivery_address": "456 Elm St, Anytown",
    "additional_addresses": "789 Oak St, Anytown",
    "termination_date": "2022-01-01",
    "termination_reason": "Non-payment",
    "billing_period": "monthly",
    "billing_duration_amount": 30,
    "renewal_duration_amount": 365,
    "renewal_duration_unit": "years",
    "notice_time_amount": 30,
    "notice_time_unit": "months",
    "start_date": "2021-01-01",
    "billing_due_day": 2,
    "installment_amount": 10050,
    "balance": 8990,
    "balance_currency": "EUR"
  }
}
```

</details>

---

### `addContractByIdentifiers`

Self-assign contract(s) by pre-configured identifiers.

`POST /v2/portal/contract/by-identifiers`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal addContractByIdentifiers \
  -d '{"contract":{"contract_number":"123456"},"meter":{"meter_number":"123456"}}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal addContractByIdentifiers
```

With JSONata filter:

```bash
epilot customer-portal addContractByIdentifiers --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {
        "content_top_name": "Customer #123456",
        "main_content_name": "Orange Flexible A2 (654321)",
        "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
        "nested_content": {
          "title": "Orange Flexible A2",
          "subtitle": "654321"
        }
      },
      "_schema": "contact"
    }
  ],
  "hits": 0
}
```

</details>

---

### `getEntityIdentifiers`

Retrieve a list of entity identifiers used for entity search by portal users.

`GET /v2/portal/entity/identifiers/{slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | The slug of an entity |

**Sample Call**

```bash
epilot customer-portal getEntityIdentifiers \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot customer-portal getEntityIdentifiers contact
```

With JSONata filter:

```bash
epilot customer-portal getEntityIdentifiers -p slug=contact --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "name": "contract_number",
      "type": "string"
    }
  ]
}
```

</details>

---

### `getEntityActivityFeed`

Get activity feed for an entity

`GET /v2/portal/entity/{slug}/{id}/activity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `after` | query | string (date-time) | No | Get activities after this timestamp |
| `before` | query | string (date-time) | No | get activities before this timestamp |
| `from` | query | number | No | start from page |
| `size` | query | number | No | max number of results to return |
| `type` | query | string | No | Filter by activity type |
| `include_relations` | query | boolean | No | Include activities from related entities |

**Sample Call**

```bash
epilot customer-portal getEntityActivityFeed \
  -p slug=contact \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getEntityActivityFeed contact 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getEntityActivityFeed -p slug=contact -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 1,
  "results": [
    {
      "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "type": "MyCustomActivity",
      "title": "My custom activity",
      "message": "{{caller}} did something with {{entity payload.entity.id}}.",
      "payload": {
        "entity": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "schema": "contact"
        }
      }
    }
  ]
}
```

</details>

---

### `validateCadenceEntityEditRules`

Validate if cadence rule is valid for an entity

`GET /v2/portal/{slug}/{id}:validateRule`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `attribute` | query | string | No | Get activities after this timestamp |

**Sample Call**

```bash
epilot customer-portal validateCadenceEntityEditRules \
  -p slug=contact \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal validateCadenceEntityEditRules contact 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal validateCadenceEntityEditRules -p slug=contact -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'isBlockedByRules'
```

<details>
<summary>Sample Response</summary>

```json
{
  "isBlockedByRules": false,
  "failedRule": {
    "slug": "contact",
    "attribute": "string",
    "rule_type": "string",
    "cadence_period_type": "string",
    "changes_allowed": 0,
    "cadence_period": 0,
    "allowed_decrement": "string",
    "allowed_increment": "string",
    "number_of_days_before_restriction": 0,
    "grace_period": 0
  }
}
```

</details>

---

### `searchPaymentRelationsInEntities`

Search for entities that have the payment relation with the given payment id

`GET /v2/portal/entities-by-payment/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity id |

**Sample Call**

```bash
epilot customer-portal searchPaymentRelationsInEntities \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal searchPaymentRelationsInEntities 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal searchPaymentRelationsInEntities -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {
        "content_top_name": "Customer #123456",
        "main_content_name": "Orange Flexible A2 (654321)",
        "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
        "nested_content": {
          "title": "Orange Flexible A2",
          "subtitle": "654321"
        }
      },
      "_schema": "contact"
    }
  ],
  "hits": 50
}
```

</details>

---

### `createCustomEntityActivity`

Create a custom activity that can be displayed in activity feed of an entity.

`PUT /v2/portal/entity/activity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entities` | query | string (uuid)[] | No | Comma-separated list of entities which the activity primarily concerns. Deprecated - ignored as the list of entities is automatically determined now. |

**Request Body**

**Sample Call**

```bash
epilot customer-portal createCustomEntityActivity \
  -d '{"type":"PortalUserResetPassword"}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createCustomEntityActivity
```

With JSONata filter:

```bash
epilot customer-portal createCustomEntityActivity --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "timestamp": "1970-01-01T00:00:00.000Z",
  "type": "MyCustomActivity",
  "title": "My custom activity",
  "message": "{{caller}} did something with {{entity payload.entity.id}}.",
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  }
}
```

</details>

---

### `saveEntityFile`

Add files to an entity

`POST /v2/portal/entity/file`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal saveEntityFile
```

With request body:

```bash
epilot customer-portal saveEntityFile \
  -d '{
  "entity_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "entity_type": "order",
  "files": [
    {
      "filename": "document.pdf",
      "access_control": "private",
      "s3ref": {
        "bucket": 12345,
        "key": 12345
      }
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal saveEntityFile
```

With JSONata filter:

```bash
epilot customer-portal saveEntityFile --jsonata 'createdFiles'
```

<details>
<summary>Sample Response</summary>

```json
{
  "createdFiles": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ]
}
```

</details>

---

### `deleteEntityFile`

Delete files from an entity

`DELETE /v2/portal/entity/file`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal deleteEntityFile
```

With request body:

```bash
epilot customer-portal deleteEntityFile \
  -d '{
  "entity_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "entity_type": "order",
  "file_entity_ids": ["5da0a718-c822-403d-9f5d-20d4584e0528"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal deleteEntityFile
```

With JSONata filter:

```bash
epilot customer-portal deleteEntityFile --jsonata '$'
```

---

### `savePortalFiles`

Add files to portal

`POST /v2/portal/portal/files`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal savePortalFiles
```

With request body:

```bash
epilot customer-portal savePortalFiles \
  -d '{
  "origin": "string",
  "files": [
    {
      "filename": 12345,
      "file_type": "orderRightTeaser",
      "_tags": 12345,
      "s3ref": {
        "bucket": 12345,
        "key": 12345
      }
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal savePortalFiles
```

With JSONata filter:

```bash
epilot customer-portal savePortalFiles --jsonata 'createdFiles'
```

<details>
<summary>Sample Response</summary>

```json
{
  "createdFiles": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "file"
    }
  ]
}
```

</details>

---

### `getRegistrationIdentifiers`

Get valid attributes from entities that can be used as identifier to map contact to user on registration

`GET /v2/portal/registration/identifiers`

**Sample Call**

```bash
epilot customer-portal getRegistrationIdentifiers
```

With JSONata filter:

```bash
epilot customer-portal getRegistrationIdentifiers --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "contact": [
      {
        "label": "First name",
        "name": "first_name",
        "type": "string"
      }
    ],
    "contract": [
      {
        "label": "Contract number",
        "name": "contract_number",
        "type": "string"
      }
    ]
  }
}
```

</details>

---

### `getFileById`

Fetch a document with ID

`GET /v2/portal/user/file/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The Id of a file |

**Sample Call**

```bash
epilot customer-portal getFileById \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getFileById 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getFileById -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'file'
```

<details>
<summary>Sample Response</summary>

```json
{
  "file": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "file",
    "filename": "document.pdf",
    "access_control": "private",
    "file_date": "2021-02-09T12:41:43.662Z",
    "public_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
    "type": "document",
    "mime_type": "application/pdf",
    "_relations": [
      {
        "entity_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
        "_schema": "contact",
        "_title": "Opportunity ABC"
      }
    ],
    "is_new": true
  }
}
```

</details>

---

### `trackFileDownloaded`

Track that user has downloaded a file

`POST /v2/portal/user/file/{id}/downloaded`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The Id of a file |

**Sample Call**

```bash
epilot customer-portal trackFileDownloaded \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal trackFileDownloaded 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal trackFileDownloaded -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'file'
```

<details>
<summary>Sample Response</summary>

```json
{
  "file": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "file",
    "filename": "document.pdf",
    "access_control": "private",
    "file_date": "2021-02-09T12:41:43.662Z",
    "public_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
    "type": "document",
    "mime_type": "application/pdf",
    "_relations": [
      {
        "entity_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
        "_schema": "contact",
        "_title": "Opportunity ABC"
      }
    ],
    "is_new": true
  }
}
```

</details>

---

### `getBillingEvents`

Fetch billing events for a portal user

`GET /v2/portal/billing/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |
| `entity_id` | query | string (uuid)[] | No | Entity ID to filter billing events by |
| `event_type` | query | "installment" \| "reimbursement" | No |  |
| `paid` | query | boolean | No |  |
| `date_after` | query | string (date-time) | No |  |
| `date_before` | query | string (date-time) | No |  |
| `sort` | query | string | No |  |

**Sample Call**

```bash
epilot customer-portal getBillingEvents
```

With JSONata filter:

```bash
epilot customer-portal getBillingEvents --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "billing_amount_decimal": "100.50",
      "billing_amount": 10050,
      "billing_currency": "EUR",
      "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
      "contract": {
        "$relation": [
          {
            "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
          }
        ]
      },
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "type": "installment",
      "due_date": "1970-01-01",
      "paid_date": "1970-01-01"
    }
  ],
  "hits": 50
}
```

</details>

---

### `getCustomerBalance`

Get total balance across all contracts and orders of a customer entity.

`GET /v2/portal/billing/customers/balance`

**Sample Call**

```bash
epilot customer-portal getCustomerBalance
```

With JSONata filter:

```bash
epilot customer-portal getCustomerBalance --jsonata 'balance'
```

<details>
<summary>Sample Response</summary>

```json
{
  "balance": 8990,
  "balance_decimal": "89.90",
  "balance_currency": "EUR"
}
```

</details>

---

### `getBillingAccount`

Get a billing account by id.

`GET /v2/portal/billing/accounts/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal getBillingAccount \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getBillingAccount 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getBillingAccount -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "billing_account_number": "string",
    "balance": 0,
    "balance_decimal": "string",
    "balance_currency": "EUR",
    "billing_contact": {
      "$relation": [
        {
          "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
        }
      ]
    },
    "billing_address": {
      "$relation_ref": [
        {
          "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896",
          "path": "address",
          "_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
        }
      ]
    },
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z"
  },
  "relations": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {
        "content_top_name": "Customer #123456",
        "main_content_name": "Orange Flexible A2 (654321)",
        "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
        "nested_content": {
          "title": "Orange Flexible A2",
          "subtitle": "654321"
        }
      },
      "_schema": "contact"
    }
  ]
}
```

</details>

---

### `loginToPortalAsUser`

Generate a token to log in to a portal impersonating a users.

`POST /v2/portal/admin:login-as-user`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal loginToPortalAsUser \
  -d '{"email":"portal-customer@email.com","origin":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal loginToPortalAsUser
```

With JSONata filter:

```bash
epilot customer-portal loginToPortalAsUser --jsonata 'login_as_token'
```

<details>
<summary>Sample Response</summary>

```json
{
  "login_as_token": "string"
}
```

</details>

---

### `triggerEntityAccessEvent`

Trigger entity access event for a portal user

`POST /v2/portal/entity/{schema}/access`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | path | string | Yes | Entity schema |
| `entity_id` | query | string (uuid) | No | Entity ID |
| `origin` | query | string | Yes | Portal origin |

**Sample Call**

```bash
epilot customer-portal triggerEntityAccessEvent \
  -p schema=contract \
  -p origin=example
```

Using positional args for path parameters:

```bash
epilot customer-portal triggerEntityAccessEvent contract
```

With JSONata filter:

```bash
epilot customer-portal triggerEntityAccessEvent -p schema=contract -p origin=example --jsonata 'eventId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "eventId": "string"
}
```

</details>

---

### `triggerEntityAccessEventV3`

Trigger entity access event for a portal user

`POST /v3/portal/entity/{schema}/access`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schema` | path | string | Yes | Entity schema |
| `entity_id` | query | string (uuid) | No | Entity ID |
| `portal_id` | query | string | Yes | Portal ID |

**Sample Call**

```bash
epilot customer-portal triggerEntityAccessEventV3 \
  -p schema=contract \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c
```

Using positional args for path parameters:

```bash
epilot customer-portal triggerEntityAccessEventV3 contract
```

With JSONata filter:

```bash
epilot customer-portal triggerEntityAccessEventV3 -p schema=contract -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c --jsonata 'eventId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "eventId": "string"
}
```

</details>

---

### `getPortalUserEntity`

Get a single entity for a portal user

`POST /v2/portal/entity:get`

**Request Body**

**Sample Call**

```bash
epilot customer-portal getPortalUserEntity
```

With request body:

```bash
epilot customer-portal getPortalUserEntity \
  -d '{
  "slug": "contact",
  "entity_id": "3ec28ab5-8598-41ef-9486-b57fca1d5e2a",
  "hydrate": false,
  "fields": ["_id", "_title"],
  "templates": {
    "content_top_name": "Customer #{{contract.customer_number}}",
    "main_content_name": "{{contract.contract_name}} ({{contract.contract_number}})",
    "content_bottom_name": "{{custom_contract_delivery_address}}",
    "nested_content": {
      "title": "{{contract.contract_name}}",
      "subtitle": "{{contract.contract_number}}"
    }
  },
  "filters": [
    {
      "term": {
        "status.keyword": "active"
      }
    },
    {
      "range": {
        "_created_at": {
          "gte": "2023-01-01"
        }
      }
    }
  ],
  "filters_context": [
    {
      "portal_user": true
    },
    {
      "contact": true
    }
  ],
  "targets": ["3ec28ab5-8598-41ef-9486-b57fca1d5e2a"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal getPortalUserEntity
```

With JSONata filter:

```bash
epilot customer-portal getPortalUserEntity --jsonata 'result'
```

<details>
<summary>Sample Response</summary>

```json
{
  "result": {
    "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "templates_output": {
      "content_top_name": "Customer #123456",
      "main_content_name": "Orange Flexible A2 (654321)",
      "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
      "nested_content": {
        "title": "Orange Flexible A2",
        "subtitle": "654321"
      }
    },
    "_schema": "contact"
  }
}
```

</details>

---

### `searchPortalUserEntities`

Search all entities of a portal user

`POST /v2/portal/entity:search`

**Request Body**

**Sample Call**

```bash
epilot customer-portal searchPortalUserEntities
```

With request body:

```bash
epilot customer-portal searchPortalUserEntities \
  -d '{
  "slug": "contact",
  "q": "contract",
  "q_fields": ["_title", "customer._title", "customer.first_name", "customer.last_name"],
  "group": "customer._title",
  "group_title": "{{customer[Primary].first_name}} {{customer[Primary].last_name}}",
  "group_size": 100,
  "group_sort": "desc",
  "group_after_key": {},
  "sort": "_created_at:desc",
  "from": 0,
  "size": 100,
  "hydrate": false,
  "fields": ["_id", "_title"],
  "templates": {
    "content_top_name": "Customer #{{contract.customer_number}}",
    "main_content_name": "{{contract.contract_name}} ({{contract.contract_number}})",
    "content_bottom_name": "{{custom_contract_delivery_address}}"
  },
  "filters": [
    {
      "term": {
        "status.keyword": "active"
      }
    },
    {
      "range": {
        "_created_at": {
          "gte": "2023-01-01"
        }
      }
    }
  ],
  "filters_context": [
    {
      "portal_user": true
    },
    {
      "contact": true
    }
  ],
  "targets": ["3ec28ab5-8598-41ef-9486-b57fca1d5e2a"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal searchPortalUserEntities
```

With JSONata filter:

```bash
epilot customer-portal searchPortalUserEntities --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "templates_output": {
        "content_top_name": "Customer #123456",
        "main_content_name": "Orange Flexible A2 (654321)",
        "content_bottom_name": "Porscheplatz 1, 70435 Stuttgart, Germany",
        "nested_content": {
          "title": "Orange Flexible A2",
          "subtitle": "654321"
        }
      },
      "_schema": "contact"
    }
  ],
  "pagination": {
    "from": 0,
    "size": 10,
    "total": 50,
    "has_more": true
  },
  "hits": 10
}
```

</details>

---

### `canTriggerPortalFlow`

Returns whether the user can trigger a portal flow

`POST /v2/portal/can-trigger-portal-flow`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | No | Origin of the portal |
| `portal_id` | query | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal canTriggerPortalFlow \
  -p portal_id=123
```

With request body:

```bash
epilot customer-portal canTriggerPortalFlow \
  -p portal_id=123 \
  -d '{
  "activity_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "ecp_config": {
    "file_config": {
      "shared_with_end_customer": true,
      "_tags": ["example", "mock"]
    }
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal canTriggerPortalFlow -p portal_id=123
```

With JSONata filter:

```bash
epilot customer-portal canTriggerPortalFlow -p portal_id=123 --jsonata 'can_trigger'
```

<details>
<summary>Sample Response</summary>

```json
{
  "can_trigger": true
}
```

</details>

---

### `getAutomationContext`

Retrieves the automation context.

`GET /v2/portal/automation-context`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `activity_id` | query | string (ulid) | Yes | Activity ID |
| `type` | query | "file" | Yes | Type of the context to retrieve |

**Sample Call**

```bash
epilot customer-portal getAutomationContext \
  -p activity_id=01F130Q52Q6MWSNS8N2AVXV4JN \
  -p type=example
```

With JSONata filter:

```bash
epilot customer-portal getAutomationContext -p activity_id=01F130Q52Q6MWSNS8N2AVXV4JN -p type=example --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `updateWorkflowStepAsDone`

Update a workflow step as done

`PUT /v2/portal/workflow/{workflow_id}/{step_id}:markDone`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `workflow_id` | path | string | Yes |  |
| `step_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal updateWorkflowStepAsDone \
  -p workflow_id=0bjwcxc827t \
  -p step_id=q1d6vcbsqvn
```

Using positional args for path parameters:

```bash
epilot customer-portal updateWorkflowStepAsDone 0bjwcxc827t q1d6vcbsqvn
```

With JSONata filter:

```bash
epilot customer-portal updateWorkflowStepAsDone -p workflow_id=0bjwcxc827t -p step_id=q1d6vcbsqvn --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "startedTime": "2024-01-12T13:29:55.942Z",
  "requirements": [],
  "created": "2023-10-20T17:41:10.256Z",
  "executionType": "MANUAL",
  "assignedToInProgress": "-",
  "sectionId": "lzxsw2sblj7",
  "type": "STEP",
  "entityRefId": "q1d6vcbsqvn",
  "assignedTo": ["10014532"],
  "lastUpdated": "2024-01-13T05:18:43.838Z",
  "ecp": {},
  "userIds": [],
  "name": "Hinterlege den vereinbarten LIC Termin",
  "id": "q1d6vcbsqvn",
  "definitionId": "9UjHKq",
  "status": "COMPLETED",
  "manuallyCreated": false,
  "enabled": true,
  "completedTime": "2024-01-13T05:18:43.827Z"
}
```

</details>

---

### `getEntityWorkflows`

Get all workflows associated with an entity (requires access to the entity)

`GET /v2/portal/entity/{slug}/{id}/workflows`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes |  |
| `id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal getEntityWorkflows \
  -p slug=contact \
  -p id=abc123
```

Using positional args for path parameters:

```bash
epilot customer-portal getEntityWorkflows contact abc123
```

With JSONata filter:

```bash
epilot customer-portal getEntityWorkflows -p slug=contact -p id=abc123 --jsonata 'workflow_executions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "workflow_executions": [
    {
      "id": "8gja72h6kas6h",
      "name": "Lead Qualification",
      "trigger": "MANUAL",
      "status": "STARTED",
      "creationTime": "2021-04-27T12:01:13.000Z",
      "lastUpdateTime": "2021-04-27T12:01:13.000Z",
      "dueDate": "2021-04-27T12:01:13.000Z",
      "assignedTo": ["252", "29052"],
      "flow": [
        {
          "id": "sectionId1",
          "name": "Initial Information Gathering",
          "steps": [
            {
              "id": "sada5641f3a21",
              "name": "Call client and confirm address and product",
              "status": "ASSIGNED",
              "assignedTo": ["11"]
            },
            {
              "id": "sada5641f3a22",
              "name": "Check product availability",
              "status": "UNASSIGNED"
            }
          ]
        },
        {
          "id": "firstLevelStepId1",
          "name": "Print and send catalog",
          "status": "SKIPPED",
          "dueDate": "2023-01-15T20:00:00"
        }
      ]
    }
  ]
}
```

</details>

---

### `uploadMeterReadingPhoto`

Uploads a Meter Reading photo and - if enabled - gives back data extracted from the photo.

`POST /v2/portal/metering/reading/photo`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal uploadMeterReadingPhoto
```

With request body:

```bash
epilot customer-portal uploadMeterReadingPhoto \
  -d '{
  "filename": "Reading 10.01.2025.jpg",
  "mime_type": "image/jpeg",
  "contents": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYFxgYFxgYHSggGBolHRgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUt",
  "meter_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal uploadMeterReadingPhoto
```

With JSONata filter:

```bash
epilot customer-portal uploadMeterReadingPhoto --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "filename": "Reading 10.01.2025.jpg",
    "s3ref": {
      "bucket": "meter-readings",
      "key": "uuid/reading-10.01.2025.jpg"
    },
    "reading": "000123.45",
    "sector": "water",
    "meter_numbers": ["00123456"]
  }
}
```

</details>

---

### `createMeterReading`

Inserts a new meter reading.

`POST /v2/portal/metering/reading`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `override_plausibility` | query | boolean | No | Override plausibility check |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createMeterReading
```

With request body:

```bash
epilot customer-portal createMeterReading \
  -d '{
  "value": 240,
  "read_by": "John Doe",
  "reason": "Storing the feed-in record",
  "meter_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "counter_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "direction": "feed-in",
  "timestamp": "2022-10-10T00:00:00.000Z",
  "source": "ECP",
  "status": "valid",
  "external_id": "string",
  "remark": "Customer reported unusual consumption",
  "metadata": {
    "registration_id": "1234567890",
    "business_unit": "ABC"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createMeterReading
```

With JSONata filter:

```bash
epilot customer-portal createMeterReading --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "value": 240,
    "read_by": "John Doe",
    "reason": "Storing the feed-in record",
    "meter_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "counter_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "direction": "feed-in",
    "timestamp": "2022-10-10T00:00:00.000Z",
    "source": "ECP",
    "status": "valid",
    "external_id": "string",
    "remark": "Customer reported unusual consumption",
    "metadata": {
      "registration_id": "1234567890",
      "business_unit": "ABC"
    }
  }
}
```

</details>

---

### `getAllowedMeterReadingRange`

Get allowed reading range for all counters of a meter from the configured

`GET /v2/portal/metering/reading/allowed-range/{meter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `origin` | query | string | No | Origin of the portal |
| `timestamp` | query | string | No | If not provided, the system will default to now. |
| `context_entities` | query | object[] | No | Additional entities to include in the context for variable interpolation in the hook. |

**Sample Call**

```bash
epilot customer-portal getAllowedMeterReadingRange \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal getAllowedMeterReadingRange 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal getAllowedMeterReadingRange -p meter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "meter_counter_id": "string",
      "min_value": 0,
      "max_value": 0
    }
  ]
}
```

</details>

---

### `ssoLogin`

Initiate login using external SSO identity.

`POST /v2/portal/public/sso/login`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `origin` | query | string | Yes | Origin of the Portal |
| `org_id` | query | string | Yes | epilot organization id |
| `contact_id` | query | string (uuid) | No | contact id in the epilot system |

**Request Body**

**Sample Call**

```bash
epilot customer-portal ssoLogin \
  -p origin=example \
  -p org_id=123 \
  -d '{"provider_slug":"office-365-login"}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal ssoLogin -p origin=example -p org_id=123
```

With JSONata filter:

```bash
epilot customer-portal ssoLogin -p origin=example -p org_id=123 --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "token": "string",
  "email": "portal-customer@email.com"
}
```

</details>

---

### `ssoLoginV3`

Initiate login using external SSO identity.

`POST /v3/portal/public/sso/login`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | query | string | Yes | ID of the Portal |
| `org_id` | query | string | Yes | epilot organization id |
| `contact_id` | query | string (uuid) | No | contact id in the epilot system |

**Request Body**

**Sample Call**

```bash
epilot customer-portal ssoLoginV3 \
  -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c \
  -p org_id=123 \
  -d '{"provider_slug":"office-365-login"}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal ssoLoginV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c -p org_id=123
```

With JSONata filter:

```bash
epilot customer-portal ssoLoginV3 -p portal_id=453ad7bf-86d5-46c8-8252-bcc868df5e3c -p org_id=123 --jsonata 'email'
```

<details>
<summary>Sample Response</summary>

```json
{
  "token": "string",
  "email": "portal-customer@email.com"
}
```

</details>

---

### `ssoRedirect`

Handles the redirect from the external SSO provider. Validates the authorization `code` and `state` received from the pr

`POST /v2/portal/public/sso/redirect`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `web_uri` | query | string | Yes | The URI to redirect to after the SSO login |

**Sample Call**

```bash
epilot customer-portal ssoRedirect \
  -p web_uri=https://customer-portal.com
```

With JSONata filter:

```bash
epilot customer-portal ssoRedirect -p web_uri=https://customer-portal.com --jsonata '$'
```

---

### `ssoCallback`

Handles the callback from the external SSO provider, validates the authorization `code`

`POST /v2/portal/public/sso/callback`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | No |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal ssoCallback
```

With request body:

```bash
epilot customer-portal ssoCallback \
  -d '{
  "provider_slug": "office-365-login",
  "token_endpoint": "https://www.facebook.com/v12.0/dialog/oauth",
  "grant_type": "authorization_code",
  "code": "123456",
  "redirect_uri": "https://customer-portal.com/login",
  "client_id": "123456",
  "code_verifier": "123456"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal ssoCallback
```

With JSONata filter:

```bash
epilot customer-portal ssoCallback --jsonata 'access_token'
```

<details>
<summary>Sample Response</summary>

```json
{
  "access_token": "123456",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "123456",
  "id_token": "123456",
  "scope": "openid email"
}
```

</details>

---

### `getPortalPage`

Fetch a portal page by id

`GET /v2/portal/pages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal getPortalPage \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getPortalPage 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getPortalPage -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "dashboard",
  "path": "/dashboard",
  "schema": ["string"],
  "visibility": {},
  "content": {},
  "design": {},
  "blocks": {},
  "order": 1,
  "is_system": false,
  "is_detail": false,
  "detail_schema": "contact",
  "is_public": true,
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "is_entry_route": false,
  "is_deleted": false,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "last_modified_at": "2021-02-09T12:41:43.662Z"
}
```

</details>

---

### `updatePortalPage`

Update a portal page by id

`PUT /v2/portal/pages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updatePortalPage \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With request body:

```bash
epilot customer-portal updatePortalPage \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{
  "slug": "dashboard",
  "path": "/dashboard",
  "schema": ["string"],
  "visibility": {},
  "content": {},
  "design": {},
  "blocks": {},
  "order": 1,
  "is_system": false,
  "is_detail": false,
  "detail_schema": "contact",
  "is_public": true,
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "is_entry_route": false,
  "is_deleted": false
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updatePortalPage 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updatePortalPage -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal updatePortalPage -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "dashboard",
  "path": "/dashboard",
  "schema": ["string"],
  "visibility": {},
  "content": {},
  "design": {},
  "blocks": {},
  "order": 1,
  "is_system": false,
  "is_detail": false,
  "detail_schema": "contact",
  "is_public": true,
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "is_entry_route": false,
  "is_deleted": false,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "last_modified_at": "2021-02-09T12:41:43.662Z"
}
```

</details>

---

### `deletePortalPage`

Delete a portal page by id

`DELETE /v2/portal/pages/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal deletePortalPage \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal deletePortalPage 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal deletePortalPage -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

---

### `getPortalPages`

Fetch all portal pages

`GET /v2/portal/pages`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |
| `fields` | query | string | No | The fields to include in the response |
| `filter` | query | string | No | The filter to apply to the response |
| `contract_id` | query | string (uuid) | No | Contract context for blocks. Use context_entities instead. |
| `context_entities` | query | object[] | No | If the request is in a context of certain entities (i.e. the user in in a context of a specific contract), pages can be customized for that. Portal User and Contact entities are automatically part of  |

**Sample Call**

```bash
epilot customer-portal getPortalPages \
  -p domain=customer-portal.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal getPortalPages -p domain=customer-portal.epilot.io --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "slug": "dashboard",
    "path": "/dashboard",
    "schema": ["string"],
    "visibility": {},
    "content": {},
    "design": {},
    "blocks": {},
    "order": 1,
    "is_system": false,
    "is_detail": false,
    "detail_schema": "contact",
    "is_public": true,
    "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "is_entry_route": false,
    "is_deleted": false,
    "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "last_modified_at": "2021-02-09T12:41:43.662Z"
  }
]
```

</details>

---

### `createPortalPage`

Create a new portal page

`POST /v2/portal/pages`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createPortalPage \
  -p domain=customer-portal.epilot.io
```

With request body:

```bash
epilot customer-portal createPortalPage \
  -p domain=customer-portal.epilot.io \
  -d '{
  "slug": "dashboard",
  "path": "/dashboard",
  "schema": ["string"],
  "visibility": {},
  "content": {},
  "design": {},
  "blocks": {},
  "order": 1,
  "is_system": false,
  "is_detail": false,
  "detail_schema": "contact",
  "is_public": true,
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "is_entry_route": false,
  "is_deleted": false
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createPortalPage -p domain=customer-portal.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal createPortalPage -p domain=customer-portal.epilot.io --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "dashboard",
  "path": "/dashboard",
  "schema": ["string"],
  "visibility": {},
  "content": {},
  "design": {},
  "blocks": {},
  "order": 1,
  "is_system": false,
  "is_detail": false,
  "detail_schema": "contact",
  "is_public": true,
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "is_entry_route": false,
  "is_deleted": false,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "last_modified_at": "2021-02-09T12:41:43.662Z"
}
```

</details>

---

### `getPublicPages`

Fetch all public portal pages

`GET /v2/portal/public/pages`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `domain` | query | string | Yes |  |
| `fields` | query | string | No | The fields to include in the response |
| `filter` | query | string | No | The filter to apply to the response |

**Sample Call**

```bash
epilot customer-portal getPublicPages \
  -p domain=customer-portal.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal getPublicPages -p domain=customer-portal.epilot.io --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "slug": "dashboard",
    "path": "/dashboard",
    "schema": ["string"],
    "visibility": {},
    "content": {},
    "design": {},
    "blocks": {},
    "order": 1,
    "is_system": false,
    "is_detail": false,
    "detail_schema": "contact",
    "is_public": true,
    "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "is_entry_route": false,
    "is_deleted": false,
    "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "last_modified_at": "2021-02-09T12:41:43.662Z"
  }
]
```

</details>

---

### `getDefaultPages`

Fetch all default portal pages

`GET /v2/portal/pages/default`

**Sample Call**

```bash
epilot customer-portal getDefaultPages
```

With JSONata filter:

```bash
epilot customer-portal getDefaultPages --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "slug": "dashboard",
    "path": "/dashboard",
    "schema": ["string"],
    "visibility": {},
    "content": {},
    "design": {},
    "blocks": {},
    "order": 1,
    "is_system": false,
    "is_detail": false,
    "detail_schema": "contact",
    "is_public": true,
    "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "is_entry_route": false,
    "is_deleted": false,
    "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "last_modified_at": "2021-02-09T12:41:43.662Z"
  }
]
```

</details>

---

### `getPortalPageBlocks`

Fetch all portal page blocks

`GET /v2/portal/pages/{id}/blocks`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal getPortalPageBlocks \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getPortalPageBlocks 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getPortalPageBlocks -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "props": {
      "visibility": {},
      "content": {},
      "design": {}
    },
    "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
    "type": "tab",
    "order": 1,
    "id": "c495fef9-eeca-4019-a989-8390dcd9825b"
  }
]
```

</details>

---

### `createPortalPageBlock`

Create a new portal page block

`POST /v2/portal/pages/{id}/blocks`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createPortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With request body:

```bash
epilot customer-portal createPortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{
  "props": {
    "visibility": {},
    "content": {},
    "design": {}
  },
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "type": "tab",
  "order": 1
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal createPortalPageBlock 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createPortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal createPortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "props": {
    "visibility": {},
    "content": {},
    "design": {}
  },
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "type": "tab",
  "order": 1,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b"
}
```

</details>

---

### `getPortalPageBlock`

Fetch a portal page block by id

`GET /v2/portal/pages/{id}/blocks/{block_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |
| `block_id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal getPortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getPortalPageBlock 5da0a718-c822-403d-9f5d-20d4584e0528 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getPortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528 -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "props": {
    "visibility": {},
    "content": {},
    "design": {}
  },
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "type": "tab",
  "order": 1,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b"
}
```

</details>

---

### `updatePortalPageBlock`

Update a portal page block by id

`PUT /v2/portal/pages/{id}/blocks/{block_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |
| `block_id` | path | string (uuid) | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updatePortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With request body:

```bash
epilot customer-portal updatePortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{
  "props": {
    "visibility": {},
    "content": {},
    "design": {}
  },
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "type": "tab",
  "order": 1
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updatePortalPageBlock 5da0a718-c822-403d-9f5d-20d4584e0528 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updatePortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528 -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal updatePortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528 -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "props": {
    "visibility": {},
    "content": {},
    "design": {}
  },
  "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
  "type": "tab",
  "order": 1,
  "id": "c495fef9-eeca-4019-a989-8390dcd9825b"
}
```

</details>

---

### `deletePortalPageBlock`

Delete a portal page block by id

`DELETE /v2/portal/pages/{id}/blocks/{block_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes |  |
| `block_id` | path | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot customer-portal deletePortalPageBlock \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal deletePortalPageBlock 5da0a718-c822-403d-9f5d-20d4584e0528 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal deletePortalPageBlock -p id=5da0a718-c822-403d-9f5d-20d4584e0528 -p block_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

---

### `getUserEntryPoint`

Get the entry point for the user

`GET /v2/portal/public/user/entry-point`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `email` | query | string | Yes |  |
| `domain` | query | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal getUserEntryPoint \
  -p email=user@example.com \
  -p domain=customer-portal.epilot.io
```

With JSONata filter:

```bash
epilot customer-portal getUserEntryPoint -p email=user@example.com -p domain=customer-portal.epilot.io --jsonata 'user_exists'
```

<details>
<summary>Sample Response</summary>

```json
{
  "user_exists": true,
  "entry_point": "PASSWORD",
  "preferred_sso_providers": ["office-365-login"],
  "is_soft_deleted": true
}
```

</details>

---

### `updateCampaignPortalBlockStatus`

Updates the status of a campaign portal block for multiple recipients.

`PUT /v2/portal/campaign/{campaign_id}/entity:status`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `campaign_id` | path | string | Yes | ID of the campaign |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updateCampaignPortalBlockStatus \
  -p campaign_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"status":"seen","entity_refs":[{"entity_id":"5da0a718-c822-403d-9f5d-20d4584e0528","entity_schema":"string"}]}'
```

Using positional args for path parameters:

```bash
epilot customer-portal updateCampaignPortalBlockStatus 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateCampaignPortalBlockStatus -p campaign_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal updateCampaignPortalBlockStatus -p campaign_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'success'
```

<details>
<summary>Sample Response</summary>

```json
{
  "success": true,
  "updated": 2,
  "failed": 0,
  "total": 2
}
```

</details>

---

### `updateNotificationsStatus`

Updates the statuses of multiple notifications at once.

`PUT /v2/portal/notifications/entity:status`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal updateNotificationsStatus \
  -d '{"notifications":[{"id":"string","status":"read"}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal updateNotificationsStatus
```

With JSONata filter:

```bash
epilot customer-portal updateNotificationsStatus --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Notifications status updated successfully."
}
```

</details>

---

### `deRegisterMLoginUser`

Deregisters a user from the M Login client

`DELETE /v2/portal/public/m-login/deregister/{client_id}/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes | Client ID |
| `user_id` | path | string | Yes | User ID |

**Sample Call**

```bash
epilot customer-portal deRegisterMLoginUser \
  -p client_id=123e4567-e89b-12d3-a456-426614174000 \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal deRegisterMLoginUser 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal deRegisterMLoginUser -p client_id=123e4567-e89b-12d3-a456-426614174000 -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `notifyMLoginInterestChange`

Notifies the interest change of a user in the M Login client

`POST /v2/portal/public/m-login/notify-interest-change/{client_id}/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `client_id` | path | string | Yes | Client ID |
| `user_id` | path | string | Yes | User ID |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal notifyMLoginInterestChange \
  -p client_id=123e4567-e89b-12d3-a456-426614174000 \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot customer-portal notifyMLoginInterestChange \
  -p client_id=123e4567-e89b-12d3-a456-426614174000 \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "resource_id": "string",
  "user_id": "string",
  "interest_tag": "string",
  "action": "string",
  "resource": {
    "resource_id": "string",
    "description": "string",
    "contact": "string",
    "kind": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal notifyMLoginInterestChange 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal notifyMLoginInterestChange -p client_id=123e4567-e89b-12d3-a456-426614174000 -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal notifyMLoginInterestChange -p client_id=123e4567-e89b-12d3-a456-426614174000 -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `createPortalConfig`

Creates a new portal configuration.

`POST /v3/portal/config`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal createPortalConfig
```

With request body:

```bash
epilot customer-portal createPortalConfig \
  -d '{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-1.ecp.epilot.io",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "pages": [
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "schema": ["string"],
      "visibility": {},
      "content": {},
      "design": {},
      "blocks": {},
      "order": 1,
      "is_system": false,
      "is_detail": false,
      "detail_schema": "contact",
      "is_public": true,
      "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "is_entry_route": false,
      "is_deleted": false
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal createPortalConfig
```

With JSONata filter:

```bash
epilot customer-portal createPortalConfig --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-1.ecp.epilot.io",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "pages": [
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "schema": ["string"],
      "visibility": {},
      "content": {},
      "design": {},
      "blocks": {},
      "order": 1,
      "is_system": false,
      "is_detail": false,
      "detail_schema": "contact",
      "is_public": true,
      "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "is_entry_route": false,
      "is_deleted": false,
      "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "last_modified_at": "2021-02-09T12:41:43.662Z"
    }
  ]
}
```

</details>

---

### `getPortalConfigV3`

Retrieves a specific portal configuration by ID.

`GET /v3/portal/config/{portal_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | path | string (uuid) | Yes | Portal ID (readonly UUID generated on portal creation) |

**Sample Call**

```bash
epilot customer-portal getPortalConfigV3 \
  -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal getPortalConfigV3 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal getPortalConfigV3 -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-1.ecp.epilot.io",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "pages": [
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "schema": ["string"],
      "visibility": {},
      "content": {},
      "design": {},
      "blocks": {},
      "order": 1,
      "is_system": false,
      "is_detail": false,
      "detail_schema": "contact",
      "is_public": true,
      "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "is_entry_route": false,
      "is_deleted": false,
      "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "last_modified_at": "2021-02-09T12:41:43.662Z"
    }
  ]
}
```

</details>

---

### `putPortalConfig`

Updates a specific portal configuration by ID.

`PUT /v3/portal/config/{portal_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | path | string (uuid) | Yes | Portal ID (readonly UUID generated on portal creation) |

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal putPortalConfig \
  -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With request body:

```bash
epilot customer-portal putPortalConfig \
  -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-1.ecp.epilot.io",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "pages": [
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "schema": ["string"],
      "visibility": {},
      "content": {},
      "design": {},
      "blocks": {},
      "order": 1,
      "is_system": false,
      "is_detail": false,
      "detail_schema": "contact",
      "is_public": true,
      "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "is_entry_route": false,
      "is_deleted": false,
      "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "last_modified_at": "2021-02-09T12:41:43.662Z"
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot customer-portal putPortalConfig 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal putPortalConfig -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal putPortalConfig -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_actions": [
    {
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "slug": "contact",
      "action_Label": {}
    }
  ],
  "extensions": [
    {
      "id": "string",
      "status": "installed",
      "options": {}
    }
  ],
  "extension_hooks": {},
  "default_user_to_notify": {
    "onPendingUser": [
      {}
    ]
  },
  "enabled": true,
  "name": "Installer Portal",
  "domain": "abc.com",
  "is_epilot_domain": true,
  "epilot_domain": "example-portal-1.ecp.epilot.io",
  "domain_settings": {
    "is_custom_domain_enabled": true,
    "is_epilot_domain_enabled": true,
    "is_redirection_enabled": true
  },
  "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
  "user_account_self_management": false,
  "feature_settings": {
    "start_page": true,
    "billing": true,
    "change_due_date": true,
    "new_design": true
  },
  "accessToken": "string",
  "advanced_mfa": {
    "enabled": true
  },
  "auth_settings": {
    "passwordless_login": {
      "enabled": true
    },
    "entry_point": "PASSWORD",
    "preferred_sso_providers": ["office-365-login"],
    "auto_redirect_to_sso": true
  },
  "cognito_details": {
    "cognito_user_pool_client_id": "6bsd0jkgoie74k2i8mrhc1vest",
    "cognito_user_pool_arn": "arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341",
    "cognito_user_pool_id": "eu-central-1_CUEQRNbUb",
    "password_policy": {
      "minimum_length": 8,
      "maximum_length": 256,
      "require_lowercase": true,
      "require_uppercase": true,
      "require_numbers": true,
      "require_symbols": true
    }
  },
  "config": "string",
  "contact_identifiers": ["email", "last_name"],
  "approval_state_attributes": {
    "contact": ["name", "address"],
    "contract": ["installment_amount"]
  },
  "email_templates": {
    "confirmAccount": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedAuth": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "advancedMFA": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignUp": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeySignInOneTimePassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "journeyLoginOTP": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "forgotPassword": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "invitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "partnerInvitation": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onNewQuote": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onMapAPendingUser": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onDocUpload": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "onWorkflowStepAssigned": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "confirmEmailUpdate": "5da0a718-c822-403d-9f5d-20d4584e0528",
    "verifyCodeToSetPassword": "5da0a718-c822-403d-9f5d-20d4584e0528"
  },
  "images": {
    "orderLeftTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg",
    "orderRightTeaser": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg",
    "welcomeBanner": "https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg"
  },
  "entity_identifiers": {
    "type": {
      "isEnabled": true,
      "attributes": ["contract_number"]
    }
  },
  "contract_identifiers": [
    {
      "name": "email",
      "schema": "contact"
    },
    {
      "name": "last_name",
      "schema": "contact"
    }
  ],
  "contract_selector_config": {
    "show_inactive": true,
    "title_path": "string"
  },
  "registration_identifiers": [
    {
      "name": "last_name",
      "schema": "contact"
    },
    {
      "name": "contract_number",
      "schema": "contract"
    }
  ],
  "triggered_journeys": [
    {
      "trigger_name": "FIRST_LOGIN",
      "journey_id": "5da0a718-c822-403d-9f5d-20d4584e0528"
    }
  ],
  "entity_edit_rules": [
    {
      "slug": "contact",
      "attribute": "first_name",
      "rule_type": "cadence",
      "cadence_period_type": "days",
      "cadence_period": 1,
      "changes_allowed": 1,
      "grace_period": 1,
      "allowed_increment": "10%",
      "allowed_decrement": "10%",
      "number_of_days_before_restriction": 10
    }
  ],
  "allowed_file_extensions": {
    "document": ["pdf"],
    "image": ["jpg"],
    "spreadsheet": ["xls"],
    "presentation": ["ppt"],
    "audioVideo": ["mp4"],
    "email": ["eml"],
    "archive": ["zip"],
    "cad": ["cad"],
    "calendar": ["ics"],
    "other": ["txt"]
  },
  "prevent_search_engine_indexing": true,
  "meter_reading_grace_period": 0,
  "inactive_contract_cutoff_years": 0,
  "is_dummy": true,
  "is_v3_item": true,
  "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "origin": "string",
  "organization_id": 12345,
  "org_settings": {
    "canary": {
      "enabled": true
    },
    "notracking": {
      "enabled": true
    }
  },
  "feature_flags": {},
  "grants": [
    {
      "action": "entity-read",
      "resource": "entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947",
      "effect": "allow"
    }
  ],
  "identity_providers": [
    {
      "slug": "office-365-login",
      "display_name": "Office 365 Login",
      "oidc_config": {},
      "mobile_oidc_config": {}
    }
  ],
  "pages": [
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "schema": ["string"],
      "visibility": {},
      "content": {},
      "design": {},
      "blocks": {},
      "order": 1,
      "is_system": false,
      "is_detail": false,
      "detail_schema": "contact",
      "is_public": true,
      "parentId": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "is_entry_route": false,
      "is_deleted": false,
      "id": "c495fef9-eeca-4019-a989-8390dcd9825b",
      "last_modified_at": "2021-02-09T12:41:43.662Z"
    }
  ]
}
```

</details>

---

### `deletePortalConfig`

Deletes a specific portal configuration by ID.

`DELETE /v3/portal/config/{portal_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `portal_id` | path | string (uuid) | Yes | Portal ID (readonly UUID generated on portal creation) |

**Sample Call**

```bash
epilot customer-portal deletePortalConfig \
  -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot customer-portal deletePortalConfig 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot customer-portal deletePortalConfig -p portal_id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

---

### `listAllPortalConfigs`

Retrieves all portal configurations.

`GET /v3/portal/configs`

**Sample Call**

```bash
epilot customer-portal listAllPortalConfigs
```

With JSONata filter:

```bash
epilot customer-portal listAllPortalConfigs --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "entity_actions": [],
      "extensions": [],
      "extension_hooks": {},
      "default_user_to_notify": {},
      "enabled": true,
      "name": "Installer Portal",
      "domain": "abc.com",
      "is_epilot_domain": true,
      "epilot_domain": "example-portal-1.ecp.epilot.io",
      "domain_settings": {},
      "design_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "self_registration_setting": "ALLOW_WITH_CONTACT_CREATION",
      "user_account_self_management": false,
      "feature_settings": {},
      "accessToken": "string",
      "advanced_mfa": {},
      "auth_settings": {},
      "cognito_details": {},
      "config": "string",
      "contact_identifiers": ["email", "last_name"],
      "approval_state_attributes": {},
      "email_templates": {},
      "images": {},
      "entity_identifiers": {},
      "contract_identifiers": [],
      "contract_selector_config": {},
      "registration_identifiers": [],
      "triggered_journeys": [],
      "entity_edit_rules": [],
      "allowed_file_extensions": {},
      "prevent_search_engine_indexing": true,
      "meter_reading_grace_period": 0,
      "inactive_contract_cutoff_years": 0,
      "is_dummy": true,
      "is_v3_item": true,
      "portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
      "portal_sk_v3": "PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c",
      "origin": "string",
      "organization_id": 12345,
      "org_settings": {},
      "feature_flags": {},
      "grants": [],
      "identity_providers": [],
      "pages": []
    }
  ]
}
```

</details>

---

### `swapPortalConfig`

Swaps the portal configuration of two portals.

`POST /v3/portal/config/swap`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal swapPortalConfig
```

With request body:

```bash
epilot customer-portal swapPortalConfig \
  -d '{
  "source_portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "target_portal_id": "453ad7bf-86d5-46c8-8252-bcc868df5e3c",
  "items_to_swap": ["all"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal swapPortalConfig
```

With JSONata filter:

```bash
epilot customer-portal swapPortalConfig --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Domain and users swapped successfully."
}
```

</details>

---

### `invitePartner`

Invites a partner to a portal

`POST /v3/portal/partner/invite`

**Request Body** (required)

**Sample Call**

```bash
epilot customer-portal invitePartner \
  -d '{"email":"string","represents_contact_list":["5da0a718-c822-403d-9f5d-20d4584e0528"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot customer-portal invitePartner
```

With JSONata filter:

```bash
epilot customer-portal invitePartner --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "User invited successfully"
}
```

</details>

---

### `listBusinessPartners`

Lists all business partners linked to the businessaccount

`GET /v3/portal/partner/list`

**Sample Call**

```bash
epilot customer-portal listBusinessPartners
```

With JSONata filter:

```bash
epilot customer-portal listBusinessPartners --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "has_portal_user": true,
      "registration_status": "Registration Pending",
      "email": "john.doe@example.com",
      "_title": "John Doe",
      "first_name": "John",
      "last_name": "Doe",
      "access_status": true
    }
  ]
}
```

</details>

---

### `resendPartnerInvitation`

Resends an invitation email to a partner

`POST /v3/portal/partner/{partner_id}/resend-invitation`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal resendPartnerInvitation \
  -p partner_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal resendPartnerInvitation 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal resendPartnerInvitation -p partner_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Partner invitation resent successfully"
}
```

</details>

---

### `revokePartner`

Revokes a partner from a portal

`DELETE /v3/portal/partner/{partner_id}/revoke`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal revokePartner \
  -p partner_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal revokePartner 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal revokePartner -p partner_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Partner revoked from portal successfully"
}
```

</details>

---

### `disablePartner`

Disables a partner from a portal

`POST /v3/portal/partner/{partner_id}/disable`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal disablePartner \
  -p partner_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal disablePartner 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal disablePartner -p partner_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Partner disabled from portal successfully"
}
```

</details>

---

### `enablePartner`

Enables a partner from a portal

`POST /v3/portal/partner/{partner_id}/enable`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `partner_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot customer-portal enablePartner \
  -p partner_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot customer-portal enablePartner 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot customer-portal enablePartner -p partner_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Partner enabled from portal successfully"
}
```

</details>

---

## Deprecated Operations

- ~~`getResolvedExternalLink`~~ GET `/v2/portal/resolve:external-link/{id}`
- ~~`getResolvedExternalLinkV3`~~ GET `/v3/portal/resolve:external-link/{id}`
- ~~`getOrganizationSettings`~~ GET `/v2/portal/org/settings`
- ~~`getAllFiles`~~ GET `/v2/portal/user/files`
- ~~`getFilesCountByEntity`~~ GET `/v2/portal/user/files/count-by-entity`
