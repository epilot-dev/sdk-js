# Portal API

- **Base URL:** `https://customer-portal-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/customer-portal](https://docs.epilot.io/api/customer-portal)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.customerPortal.upsertPortal(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/customer-portal'

const customerPortalClient = getClient()
authorize(customerPortalClient, () => '<token>')
const { data } = await customerPortalClient.upsertPortal(...)
```

## Operations

**ECP Admin**
- [`upsertPortal`](#upsertportal)
- [`getPortalConfig`](#getportalconfig)
- [`deletePortal`](#deleteportal)
- [`getPortalExtensions`](#getportalextensions)
- [`getPortalExtensionsV3`](#getportalextensionsv3)
- [`getExternalLinks`](#getexternallinks)
- [`getExternalLinksV3`](#getexternallinksv3)
- [`getOrgPortalConfig`](#getorgportalconfig)
- [`getOrgPortalConfigV3`](#getorgportalconfigv3)
- [`getAllPortalConfigs`](#getallportalconfigs)
- [`upsertEmailTemplates`](#upsertemailtemplates)
- [`getEmailTemplates`](#getemailtemplates)
- [`upsertEmailTemplatesByPortalId`](#upsertemailtemplatesbyportalid)
- [`getEmailTemplatesByPortalId`](#getemailtemplatesbyportalid)
- [`upsertPortalWidget`](#upsertportalwidget)
- [`getPortalWidgets`](#getportalwidgets)
- [`replaceECPTemplateVariables`](#replaceecptemplatevariables)
- [`extraPermissionAttributes`](#extrapermissionattributes)
- [`validateCaaRecords`](#validatecaarecords)
- [`validateCaaRecordsV3`](#validatecaarecordsv3)
- [`getECPContact`](#getecpcontact)
- [`getValidSecondaryAttributes`](#getvalidsecondaryattributes)
- [`resendConfirmationEmail`](#resendconfirmationemail)
- [`fetchPortalUsersByRelatedEntity`](#fetchportalusersbyrelatedentity)
- [`getRecipientsToNotifyOnAutomation`](#getrecipientstonotifyonautomation)
- [`configureDistribution`](#configuredistribution)
- [`configureDistributionV3`](#configuredistributionv3)
- [`getEntityIdentifiers`](#getentityidentifiers)
- [`savePortalFiles`](#saveportalfiles)
- [`getRegistrationIdentifiers`](#getregistrationidentifiers)
- [`loginToPortalAsUser`](#logintoportalasuser)
- [`canTriggerPortalFlow`](#cantriggerportalflow)
- [`updatePortalPage`](#updateportalpage)
- [`deletePortalPage`](#deleteportalpage)
- [`createPortalPage`](#createportalpage)
- [`getDefaultPages`](#getdefaultpages)
- [`createPortalPageBlock`](#createportalpageblock)
- [`updatePortalPageBlock`](#updateportalpageblock)
- [`deletePortalPageBlock`](#deleteportalpageblock)
- [`createPortalConfig`](#createportalconfig)
- [`getPortalConfigV3`](#getportalconfigv3)
- [`putPortalConfig`](#putportalconfig)
- [`deletePortalConfig`](#deleteportalconfig)
- [`listAllPortalConfigs`](#listallportalconfigs)
- [`swapPortalConfig`](#swapportalconfig)

**Public**
- [`createUser`](#createuser)
- [`createUserV3`](#createuserv3)
- [`getPortalConfigByDomain`](#getportalconfigbydomain)
- [`getPublicPortalExtensionDetails`](#getpublicportalextensiondetails)
- [`getPublicPortalExtensionDetailsV3`](#getpublicportalextensiondetailsv3)
- [`getPublicPortalConfig`](#getpublicportalconfig)
- [`getPublicPortalConfigV3`](#getpublicportalconfigv3)
- [`getPublicPortalWidgets`](#getpublicportalwidgets)
- [`getSchemasByDomain`](#getschemasbydomain)
- [`getOrganizationSettingsByDomain`](#getorganizationsettingsbydomain)
- [`checkContactExists`](#checkcontactexists)
- [`checkContactExistsV3`](#checkcontactexistsv3)
- [`confirmUser`](#confirmuser)
- [`confirmUserWithUserId`](#confirmuserwithuserid)
- [`userExists`](#userexists)
- [`userExistsV3`](#userexistsv3)
- [`ssoRedirect`](#ssoredirect)
- [`ssoCallback`](#ssocallback)
- [`getPublicPages`](#getpublicpages)
- [`getUserEntryPoint`](#getuserentrypoint)
- [`deRegisterMLoginUser`](#deregistermloginuser)
- [`notifyMLoginInterestChange`](#notifymlogininterestchange)

**ECP**
- [`validateToken`](#validatetoken)
- [`revokeToken`](#revoketoken)
- [`getConsumption`](#getconsumption)
- [`getCosts`](#getcosts)
- [`getPrices`](#getprices)
- [`getResolvedSeamlessLink`](#getresolvedseamlesslink)
- [`getSchemas`](#getschemas)
- [`getContact`](#getcontact)
- [`updateContact`](#updatecontact)
- [`getPortalUser`](#getportaluser)
- [`updatePortalUser`](#updateportaluser)
- [`deletePortalUser`](#deleteportaluser)
- [`updatePortalUserEmail`](#updateportaluseremail)
- [`getAllOrders`](#getallorders)
- [`postOrderAcceptance`](#postorderacceptance)
- [`getOrder`](#getorder)
- [`updateOrder`](#updateorder)
- [`getAllOpportunities`](#getallopportunities)
- [`getSearchableAttributesForOpportunities`](#getsearchableattributesforopportunities)
- [`getSearchResultsForOpportunities`](#getsearchresultsforopportunities)
- [`getOpportunity`](#getopportunity)
- [`updateOpportunity`](#updateopportunity)
- [`getAllRequests`](#getallrequests)
- [`getAllContracts`](#getallcontracts)
- [`getContract`](#getcontract)
- [`updateContract`](#updatecontract)
- [`addContractByIdentifiers`](#addcontractbyidentifiers)
- [`validateCadenceEntityEditRules`](#validatecadenceentityeditrules)
- [`searchPaymentRelationsInEntities`](#searchpaymentrelationsinentities)
- [`createCustomEntityActivity`](#createcustomentityactivity)
- [`saveEntityFile`](#saveentityfile)
- [`deleteEntityFile`](#deleteentityfile)
- [`getFileById`](#getfilebyid)
- [`trackFileDownloaded`](#trackfiledownloaded)
- [`getBillingEvents`](#getbillingevents)
- [`triggerEntityAccessEvent`](#triggerentityaccessevent)
- [`triggerEntityAccessEventV3`](#triggerentityaccesseventv3)
- [`getPortalUserEntity`](#getportaluserentity)
- [`searchPortalUserEntities`](#searchportaluserentities)
- [`getAutomationContext`](#getautomationcontext)
- [`updateWorkflowStepAsDone`](#updateworkflowstepasdone)
- [`getEntityWorkflows`](#getentityworkflows)
- [`uploadMeterReadingPhoto`](#uploadmeterreadingphoto)
- [`createMeterReading`](#createmeterreading)
- [`getAllowedMeterReadingRange`](#getallowedmeterreadingrange)
- [`getPortalPage`](#getportalpage)
- [`getPortalPages`](#getportalpages)
- [`getPortalPageBlocks`](#getportalpageblocks)
- [`getPortalPageBlock`](#getportalpageblock)
- [`updateCampaignPortalBlockStatus`](#updatecampaignportalblockstatus)
- [`updateNotificationsStatus`](#updatenotificationsstatus)
- [`invitePartner`](#invitepartner)
- [`listBusinessPartners`](#listbusinesspartners)
- [`resendPartnerInvitation`](#resendpartnerinvitation)
- [`revokePartner`](#revokepartner)
- [`disablePartner`](#disablepartner)
- [`enablePartner`](#enablepartner)

**Activity**
- [`getEntityActivityFeed`](#getentityactivityfeed)

**Balance**
- [`getCustomerBalance`](#getcustomerbalance)

**Billing Accounts**
- [`getBillingAccount`](#getbillingaccount)

**Login**
- [`ssoLogin`](#ssologin)
- [`ssoLoginV3`](#ssologinv3)

**Schemas**
- [`ContextEntity`](#contextentity)
- [`ContextEntities`](#contextentities)
- [`ErrorResp`](#errorresp)
- [`FailedRuleErrorResp`](#failedruleerrorresp)
- [`EmailTemplates`](#emailtemplates)
- [`DeleteEntityFile`](#deleteentityfile)
- [`SaveEntityFile`](#saveentityfile)
- [`SavePortalFile`](#saveportalfile)
- [`ExtraSchemaAttributes`](#extraschemaattributes)
- [`Origin`](#origin)
- [`AllowedFileExtensions`](#allowedfileextensions)
- [`UpdateOnlyPortalConfigAttributes`](#updateonlyportalconfigattributes)
- [`CommonConfigAttributes`](#commonconfigattributes)
- [`UpsertPortalConfig`](#upsertportalconfig)
- [`PortalConfig`](#portalconfig)
- [`UpsertPortalWidget`](#upsertportalwidget)
- [`DomainSettings`](#domainsettings)
- [`WidgetBase`](#widgetbase)
- [`EntityWidget`](#entitywidget)
- [`MeterReadingWidget`](#meterreadingwidget)
- [`MeterChartWidget`](#meterchartwidget)
- [`WidgetAction`](#widgetaction)
- [`ActionWidget`](#actionwidget)
- [`TeaserWidget`](#teaserwidget)
- [`ContentWidget`](#contentwidget)
- [`DocumentWidget`](#documentwidget)
- [`PaymentWidget`](#paymentwidget)
- [`CampaignWidget`](#campaignwidget)
- [`PortalWidget`](#portalwidget)
- [`ContactCountRequest`](#contactcountrequest)
- [`ContactExistsRequest`](#contactexistsrequest)
- [`UserRequest`](#userrequest)
- [`CreateUserRequest`](#createuserrequest)
- [`OrganizationSettings`](#organizationsettings)
- [`AuthConfig`](#authconfig)
- [`Exists`](#exists)
- [`EntitySlug`](#entityslug)
- [`EntityId`](#entityid)
- [`BaseEntity`](#baseentity)
- [`Schema`](#schema)
- [`Entity`](#entity)
- [`EntityTemplates`](#entitytemplates)
- [`EntityItem`](#entityitem)
- [`EntityResponse`](#entityresponse)
- [`EntityResponseWithHits`](#entityresponsewithhits)
- [`EntityResponseGroupedWithHits`](#entityresponsegroupedwithhits)
- [`PortalUser`](#portaluser)
- [`Contact`](#contact)
- [`WorfklowIdentifier`](#worfklowidentifier)
- [`Meter`](#meter)
- [`Order`](#order)
- [`Opportunity`](#opportunity)
- [`Contract`](#contract)
- [`File`](#file)
- [`Product`](#product)
- [`ActivityId`](#activityid)
- [`ActivityCallerContext`](#activitycallercontext)
- [`Activity`](#activity)
- [`EntityEditRule`](#entityeditrule)
- [`ActivityItem`](#activityitem)
- [`FileItem`](#fileitem)
- [`EntityFileCount`](#entityfilecount)
- [`AdminUser`](#adminuser)
- [`Grant`](#grant)
- [`ActionLabel`](#actionlabel)
- [`Rule`](#rule)
- [`JourneyActions`](#journeyactions)
- [`ExternalLink`](#externallink)
- [`WorkflowExecution`](#workflowexecution)
- [`WorkflowStep`](#workflowstep)
- [`BaseBillingEvent`](#basebillingevent)
- [`InstallmentEvent`](#installmentevent)
- [`ReimbursementEvent`](#reimbursementevent)
- [`BillingEvent`](#billingevent)
- [`BillingAccount`](#billingaccount)
- [`Balance`](#balance)
- [`Currency`](#currency)
- [`EntityGetParams`](#entitygetparams)
- [`EntitySearchParams`](#entitysearchparams)
- [`IdentifierAttribute`](#identifierattribute)
- [`RegistrationIdentifier`](#registrationidentifier)
- [`ContractIdentifier`](#contractidentifier)
- [`AcceptanceDecision`](#acceptancedecision)
- [`TriggerPortalFlow`](#triggerportalflow)
- [`ExtensionConfig`](#extensionconfig)
- [`ExtensionHookSelection`](#extensionhookselection)
- [`PublicExtensionCapabilities`](#publicextensioncapabilities)
- [`DataRetrievalItem`](#dataretrievalitem)
- [`PublicExtensionDetails`](#publicextensiondetails)
- [`PublicDataRetrievalHookDetails`](#publicdataretrievalhookdetails)
- [`PublicContractIdentificationDetails`](#publiccontractidentificationdetails)
- [`PublicMeterReadingPlausibilityCheckDetails`](#publicmeterreadingplausibilitycheckdetails)
- [`Extension`](#extension)
- [`ExtensionSeamlessLink`](#extensionseamlesslink)
- [`ExtensionHook`](#extensionhook)
- [`ExtensionHookRegistrationIdentifiersCheck`](#extensionhookregistrationidentifierscheck)
- [`ExtensionHookContractIdentification`](#extensionhookcontractidentification)
- [`ExtensionHookMeterReadingPlausibilityCheck`](#extensionhookmeterreadingplausibilitycheck)
- [`ExtensionHookPriceDataRetrieval`](#extensionhookpricedataretrieval)
- [`ExtensionHookConsumptionDataRetrieval`](#extensionhookconsumptiondataretrieval)
- [`ExtensionHookCostDataRetrieval`](#extensionhookcostdataretrieval)
- [`ExtensionAuthBlock`](#extensionauthblock)
- [`Direction`](#direction)
- [`TariffType`](#tarifftype)
- [`Source`](#source)
- [`Reason`](#reason)
- [`ReadBy`](#readby)
- [`ReadingStatus`](#readingstatus)
- [`MeterReading`](#meterreading)
- [`MeterReadingPhoto`](#meterreadingphoto)
- [`MeterReadingPhotoData`](#meterreadingphotodata)
- [`SSOLoginToken`](#ssologintoken)
- [`ProviderSlug`](#providerslug)
- [`ProviderDisplayName`](#providerdisplayname)
- [`ProviderConfig`](#providerconfig)
- [`ProviderPublicConfig`](#providerpublicconfig)
- [`AttributeMappingConfig`](#attributemappingconfig)
- [`EntityMatchingConfig`](#entitymatchingconfig)
- [`OIDCProviderConfig`](#oidcproviderconfig)
- [`MoblieOIDCConfig`](#moblieoidcconfig)
- [`OIDCProviderMetadata`](#oidcprovidermetadata)
- [`SAMLProviderConfig`](#samlproviderconfig)
- [`SSOCallbackRequest`](#ssocallbackrequest)
- [`SSOCallbackResponse`](#ssocallbackresponse)
- [`BlockProps`](#blockprops)
- [`BlockType`](#blocktype)
- [`BlockRequest`](#blockrequest)
- [`BlockId`](#blockid)
- [`Block`](#block)
- [`PageRequest`](#pagerequest)
- [`Page`](#page)
- [`CommonConfigAttributesV3`](#commonconfigattributesv3)
- [`PortalId`](#portalid)
- [`UpsertPortalConfigV3`](#upsertportalconfigv3)
- [`PortalConfigV3`](#portalconfigv3)
- [`JuiceSettings`](#juicesettings)
- [`SwappableConfig`](#swappableconfig)
- [`PortalUserRegistrationStatus`](#portaluserregistrationstatus)
- [`BusinessPartnerItem`](#businesspartneritem)

### `upsertPortal`

Upserts the settings for a portal of an organization.

`POST /v2/portal/portal`

```ts
const { data } = await client.upsertPortal(
  {
    origin: 'example',
    portal_id: 'example',
  },
  {
    entity_actions: [
      {
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
        slug: 'contact',
        action_Label: { /* ... */ }
      }
    ],
    extensions: [
      {
        id: 'string',
        status: 'installed',
        options: {}
      }
    ],
    extension_hooks: {},
    default_user_to_notify: {
      onPendingUser: [
        { /* ... */ }
      ]
    },
    enabled: true,
    name: 'Installer Portal',
    domain: 'abc.com',
    is_epilot_domain: true,
    epilot_domain: 'example-portal-12345.ecp.epilot.cloud',
    domain_settings: {
      is_custom_domain_enabled: true,
      is_epilot_domain_enabled: true,
      is_redirection_enabled: true
    },
    design_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    self_registration_setting: 'ALLOW_WITH_CONTACT_CREATION',
    user_account_self_management: false,
    feature_settings: {
      start_page: true,
      billing: true,
      change_due_date: true,
      new_design: true
    },
    accessToken: 'string',
    advanced_mfa: {
      enabled: true
    },
    auth_settings: {
      passwordless_login: {
        enabled: true
      },
      entry_point: 'PASSWORD',
      preferred_sso_providers: ['office-365-login'],
      auto_redirect_to_sso: true
    },
    cognito_details: {
      cognito_user_pool_client_id: '6bsd0jkgoie74k2i8mrhc1vest',
      cognito_user_pool_arn: 'arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341',
      cognito_user_pool_id: 'eu-central-1_CUEQRNbUb',
      password_policy: {
        minimum_length: 8,
        maximum_length: 256,
        require_lowercase: true,
        require_uppercase: true,
        require_numbers: true,
        require_symbols: true
      }
    },
    config: 'string',
    contact_identifiers: ['email', 'last_name'],
    approval_state_attributes: {
      contact: ['name', 'address'],
      contract: ['installment_amount']
    },
    email_templates: {
      confirmAccount: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedAuth: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedMFA: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignUp: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignInOneTimePassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeyLoginOTP: '5da0a718-c822-403d-9f5d-20d4584e0528',
      forgotPassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      invitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      partnerInvitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onNewQuote: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onMapAPendingUser: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onDocUpload: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onWorkflowStepAssigned: '5da0a718-c822-403d-9f5d-20d4584e0528',
      confirmEmailUpdate: '5da0a718-c822-403d-9f5d-20d4584e0528',
      verifyCodeToSetPassword: '5da0a718-c822-403d-9f5d-20d4584e0528'
    },
    images: {
      orderLeftTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg',
      orderRightTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg',
      welcomeBanner: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg'
    },
    entity_identifiers: {
      type: {
        isEnabled: true,
        attributes: ['contract_number']
      }
    },
    contract_identifiers: [
      {
        name: 'email',
        schema: 'contact'
      },
      {
        name: 'last_name',
        schema: 'contact'
      },
      /* ... 1 more */
    ],
    contract_selector_config: {
      show_inactive: true,
      title_path: 'string'
    },
    registration_identifiers: [
      {
        name: 'last_name',
        schema: 'contact'
      },
      {
        name: 'contract_number',
        schema: 'contract'
      }
    ],
    triggered_journeys: [
      {
        trigger_name: 'FIRST_LOGIN',
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528'
      }
    ],
    entity_edit_rules: [
      {
        slug: 'contact',
        attribute: 'first_name',
        rule_type: 'cadence',
        cadence_period_type: 'days',
        cadence_period: 1,
        changes_allowed: 1,
        grace_period: 1,
        allowed_increment: '10%',
        allowed_decrement: '10%',
        number_of_days_before_restriction: 10
      }
    ],
    allowed_file_extensions: {
      document: ['pdf'],
      image: ['jpg'],
      spreadsheet: ['xls'],
      presentation: ['ppt'],
      audioVideo: ['mp4'],
      email: ['eml'],
      archive: ['zip'],
      cad: ['cad'],
      calendar: ['ics'],
      other: ['txt']
    },
    prevent_search_engine_indexing: true,
    meter_reading_grace_period: 0,
    inactive_contract_cutoff_years: 0,
    is_dummy: true,
    is_v3_item: true,
    portal_id: '453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    portal_sk_v3: 'PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    origin: 'string',
    pages: {}
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createUser(
  {
    origin: 'example',
  },
  {
    email: 'testemail921@yopmail.com',
    first_name: 'John',
    last_name: 'Doe',
    contactId: '5da0a718-c822-403d-9f5d-20d4584e0528',
    orgId: 728,
    password: '124n$aAJs*d41h4',
    contactIdentifiers: {},
    registration_identifiers: {
      contact: {
        email: 'john.doe@example.com'
      },
      contract: {
        contract_number: '123456'
      }
    },
    account_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createUserV3(
  {
    portal_id: 'example',
  },
  {
    email: 'testemail921@yopmail.com',
    first_name: 'John',
    last_name: 'Doe',
    contactId: '5da0a718-c822-403d-9f5d-20d4584e0528',
    orgId: 728,
    password: '124n$aAJs*d41h4',
    contactIdentifiers: {},
    registration_identifiers: {
      contact: {
        email: 'john.doe@example.com'
      },
      contract: {
        contract_number: '123456'
      }
    },
    account_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateToken()
```

---

### `revokeToken`

Revokes all of the access tokens for the given Refresh Token.

`POST /v2/portal/token/revoke`

```ts
const { data } = await client.revokeToken(
  null,
  {
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalConfigByDomain({
  domain: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalConfig({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePortal({
  origin: 'example',
})
```

---

### `getPortalExtensions`

Retrieves the installed portal extensions.

`GET /v2/portal/extensions`

```ts
const { data } = await client.getPortalExtensions({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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
      {
        "id": "string",
        "name": {
          "en": "string"
        },
        "type": "text",
        "description": {
          "en": "string"
        },
        "default": "string",
        "required": false
      }
    ],
    "links": [
      {
        "id": "string",
        "name": {
          "en": "string"
        },
        "description": {
          "en": "string"
        },
        "type": "seamless",
        "condition": "{{Contact.customer_number | is_not_empty}}",
        "auth": {
          "method": "GET",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "cache": {
            "key": "{{Options.api_key}}",
            "ttl": "{{AuthResponse.data.expires_in}}"
          }
        },
        "redirect": {
          "url": "string",
          "params": {}
        }
      }
    ],
    "hooks": [
      {
        "type": "registrationIdentifiersCheck",
        "auth": {
          "method": "GET",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "cache": {
            "key": "{{Options.api_key}}",
            "ttl": "{{AuthResponse.data.expires_in}}"
          }
        },
        "call": {
          "method": "POST",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "result": "string"
        },
        "use_static_ips": false
      }
    ]
  }
]
```

</details>

---

### `getPublicPortalExtensionDetails`

Get public extension details shown to end customers and configuring users.

`GET /v2/portal/public/extensions`

```ts
const { data } = await client.getPublicPortalExtensionDetails({
  org_id: 'example',
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalExtensionsV3({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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
      {
        "id": "string",
        "name": {
          "en": "string"
        },
        "type": "text",
        "description": {
          "en": "string"
        },
        "default": "string",
        "required": false
      }
    ],
    "links": [
      {
        "id": "string",
        "name": {
          "en": "string"
        },
        "description": {
          "en": "string"
        },
        "type": "seamless",
        "condition": "{{Contact.customer_number | is_not_empty}}",
        "auth": {
          "method": "GET",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "cache": {
            "key": "{{Options.api_key}}",
            "ttl": "{{AuthResponse.data.expires_in}}"
          }
        },
        "redirect": {
          "url": "string",
          "params": {}
        }
      }
    ],
    "hooks": [
      {
        "type": "registrationIdentifiersCheck",
        "auth": {
          "method": "GET",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "cache": {
            "key": "{{Options.api_key}}",
            "ttl": "{{AuthResponse.data.expires_in}}"
          }
        },
        "call": {
          "method": "POST",
          "url": "string",
          "params": {},
          "headers": {},
          "body": {},
          "result": "string"
        },
        "use_static_ips": false
      }
    ]
  }
]
```

</details>

---

### `getPublicPortalExtensionDetailsV3`

Get public extension details shown to end customers and configuring users.
Supports two identification methods:
1. Using org_id + portal_id
2. Using domain

`GET /v3/portal/public/extensions`

```ts
const { data } = await client.getPublicPortalExtensionDetailsV3({
  org_id: 'example',
  portal_id: 'example',
  domain: 'example',
})
```

<details>
<summary>Response</summary>

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

Get Consumption

`GET /v2/portal/consumption`

```ts
const { data } = await client.getConsumption({
  app_id: 'example',
  extensionId: 'example',
  hookId: 'example',
  meter_id: 'example',
  from: 'example',
  to: 'example',
  interval: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

Get Costs

`GET /v2/portal/costs`

```ts
const { data } = await client.getCosts({
  app_id: 'example',
  extensionId: 'example',
  hookId: 'example',
  meter_id: 'example',
  from: 'example',
  to: 'example',
  interval: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

Get Prices

`GET /v2/portal/prices`

```ts
const { data } = await client.getPrices({
  app_id: 'example',
  extensionId: 'example',
  hookId: 'example',
  meter_id: 'example',
  from: 'example',
  to: 'example',
  interval: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getExternalLinks({
  origin: 'example',
  contactId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getExternalLinksV3({
  portal_id: 'example',
  contactId: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getResolvedSeamlessLink({
  app_id: 'example',
  extension_id: 'example',
  link_id: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPublicPortalConfig({
  org_id: 'example',
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getOrgPortalConfig({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPublicPortalConfigV3({
  org_id: 'example',
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getOrgPortalConfigV3({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllPortalConfigs()
```

<details>
<summary>Response</summary>

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

### `upsertEmailTemplates`

Upserts the email templates of a portal

`POST /v2/portal/email-templates`

```ts
const { data } = await client.upsertEmailTemplates(
  {
    origin: 'example',
  },
  {
    confirmAccount: '5da0a718-c822-403d-9f5d-20d4584e0528',
    advancedAuth: '5da0a718-c822-403d-9f5d-20d4584e0528',
    advancedMFA: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeySignUp: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeySignInOneTimePassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeyLoginOTP: '5da0a718-c822-403d-9f5d-20d4584e0528',
    forgotPassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
    invitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
    partnerInvitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onNewQuote: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onMapAPendingUser: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onDocUpload: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onWorkflowStepAssigned: '5da0a718-c822-403d-9f5d-20d4584e0528',
    confirmEmailUpdate: '5da0a718-c822-403d-9f5d-20d4584e0528',
    verifyCodeToSetPassword: '5da0a718-c822-403d-9f5d-20d4584e0528'
  },
)
```

<details>
<summary>Response</summary>

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

### `getEmailTemplates`

Retrieves the email templates of a portal

`GET /v2/portal/email-templates`

```ts
const { data } = await client.getEmailTemplates({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.upsertEmailTemplatesByPortalId(
  {
    portal_id: 'example',
  },
  {
    confirmAccount: '5da0a718-c822-403d-9f5d-20d4584e0528',
    advancedAuth: '5da0a718-c822-403d-9f5d-20d4584e0528',
    advancedMFA: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeySignUp: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeySignInOneTimePassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
    journeyLoginOTP: '5da0a718-c822-403d-9f5d-20d4584e0528',
    forgotPassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
    invitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
    partnerInvitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onNewQuote: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onMapAPendingUser: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onDocUpload: '5da0a718-c822-403d-9f5d-20d4584e0528',
    onWorkflowStepAssigned: '5da0a718-c822-403d-9f5d-20d4584e0528',
    confirmEmailUpdate: '5da0a718-c822-403d-9f5d-20d4584e0528',
    verifyCodeToSetPassword: '5da0a718-c822-403d-9f5d-20d4584e0528'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEmailTemplatesByPortalId({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `getPublicPortalWidgets`

Retrieves the public widgets of a portal

`GET /v2/portal/public-widgets`

```ts
const { data } = await client.getPublicPortalWidgets({
  org_id: 'example',
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.upsertPortalWidget(
  {
    origin: 'example',
  },
  {
    widgets: [
      {
        id: 'string',
        type: 'ACTION_WIDGET',
        listIndex: 0,
        headline: {
          en: 'string',
          de: 'string'
        },
        subHeadline: {
          en: 'string',
          de: 'string'
        },
        schema: 'string'
      },
      {
        id: 'string',
        type: 'ACTION_WIDGET',
        listIndex: 0,
        headline: {
          en: 'string',
          de: 'string'
        },
        subHeadline: {
          en: 'string',
          de: 'string'
        },
        content: 'string'
      },
      /* ... 7 more */
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalWidgets({
  origin: 'example',
  contract_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.replaceECPTemplateVariables(
  null,
  {
    template_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    entity_context: {}
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemas()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemasByDomain({
  domain: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getOrganizationSettingsByDomain({
  domain: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.extraPermissionAttributes()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateCaaRecords({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateCaaRecordsV3({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getContact()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateContact(
  null,
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getECPContact({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.checkContactExists(
  {
    origin: 'example',
  },
  {
    org_id: 728,
    registration_identifiers: {
      contact: {
        email: 'john.doe@example.com'
      },
      contract: {
        contract_number: '123456'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.checkContactExistsV3(
  {
    portal_id: 'example',
  },
  {
    org_id: 728,
    registration_identifiers: {
      contact: {
        email: 'john.doe@example.com'
      },
      contract: {
        contract_number: '123456'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getValidSecondaryAttributes()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalUser()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updatePortalUser(
  null,
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePortalUser()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updatePortalUserEmail(
  null,
  {
    email: 'john@doe.com',
    password: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.resendConfirmationEmail({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.fetchPortalUsersByRelatedEntity({
  entity_id: 'example',
  slug: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.confirmUser({
  confirmation_link_token: 'example',
  use_redirect: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.confirmUserWithUserId({
  origin: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  org_id: 'example',
})
```

---

### `userExists`

Checks whether a user exists in the portal

`GET /v2/portal/public/user/exists`

```ts
const { data } = await client.userExists({
  email: 'example',
  org_id: 'example',
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.userExistsV3({
  email: 'example',
  org_id: 'example',
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getRecipientsToNotifyOnAutomation(
  null,
  {
    emails: ['john@doe.com'],
    template_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    context_id: '5da0a718-c822-403d-9f5d-20d4584e0528'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.configureDistribution({
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.configureDistributionV3({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllOrders({
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.postOrderAcceptance(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    decision: 'accept'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getOrder({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateOrder(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllOpportunities({
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSearchableAttributesForOpportunities({
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSearchResultsForOpportunities(
  {
    from: 1,
    size: 1,
  },
  {
    addresses: ['string'],
    customers: ['string'],
    purposes: ['5da0a718-c822-403d-9f5d-20d4584e0528'],
    workflows: [
      {}
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getOpportunity({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateOpportunity(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllRequests({
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllContracts({
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getContract({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateContract(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.addContractByIdentifiers(
  null,
  {
    contract: {
      contract_number: '123456'
    },
    meter: {
      meter_number: '123456'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEntityIdentifiers({
  slug: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEntityActivityFeed({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  after: 'example',
  before: 'example',
  from: 1,
  size: 1,
  type: 'example',
  include_relations: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateCadenceEntityEditRules({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  attribute: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchPaymentRelationsInEntities({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createCustomEntityActivity(
  {
    entities: ['...'],
  },
  {
    type: 'PortalUserResetPassword'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.saveEntityFile(
  null,
  {
    entity_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    entity_type: 'order',
    files: [
      {
        filename: 'document.pdf',
        access_control: 'private',
        s3ref: {
          bucket: 12345,
          key: 12345
        }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteEntityFile(
  null,
  {
    entity_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    entity_type: 'order',
    file_entity_ids: ['5da0a718-c822-403d-9f5d-20d4584e0528']
  },
)
```

---

### `savePortalFiles`

Add files to portal

`POST /v2/portal/portal/files`

```ts
const { data } = await client.savePortalFiles(
  null,
  {
    origin: 'string',
    files: [
      {
        filename: 12345,
        file_type: 'orderRightTeaser',
        _tags: 12345,
        s3ref: {
          bucket: 12345,
          key: 12345
        }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getRegistrationIdentifiers()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getFileById({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.trackFileDownloaded({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getBillingEvents({
  from: 1,
  size: 1,
  entity_id: ['...'],
  event_type: 'example',
  paid: true,
  date_after: 'example',
  date_before: 'example',
  sort: 'example',
})
```

<details>
<summary>Response</summary>

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
      "due_date": "string",
      "paid_date": "string"
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

```ts
const { data } = await client.getCustomerBalance()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getBillingAccount({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.loginToPortalAsUser(
  null,
  {
    email: 'portal-customer@email.com',
    origin: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.triggerEntityAccessEvent({
  schema: 'example',
  entity_id: 'example',
  origin: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.triggerEntityAccessEventV3({
  schema: 'example',
  entity_id: 'example',
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalUserEntity(
  null,
  {
    slug: 'contact',
    entity_id: '3ec28ab5-8598-41ef-9486-b57fca1d5e2a',
    hydrate: false,
    fields: ['_id', '_title'],
    templates: {
      content_top_name: 'Customer #{{contract.customer_number}}',
      main_content_name: '{{contract.contract_name}} ({{contract.contract_number}})',
      content_bottom_name: '{{custom_contract_delivery_address}}',
      nested_content: {
        title: '{{contract.contract_name}}',
        subtitle: '{{contract.contract_number}}'
      }
    },
    filters: [
      {
        term: {
          'status.keyword': 'active'
        }
      },
      {
        range: {
          _created_at: {
            gte: '2023-01-01'
          }
        }
      }
    ],
    filters_context: [
      {
        portal_user: true
      },
      {
        contact: true
      },
      /* ... 1 more */
    ],
    targets: ['3ec28ab5-8598-41ef-9486-b57fca1d5e2a']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchPortalUserEntities(
  null,
  {
    slug: 'contact',
    q: 'contract',
    q_fields: ['_title', 'customer._title', 'customer.first_name', 'customer.last_name'],
    group: 'customer._title',
    group_title: '{{customer[Primary].first_name}} {{customer[Primary].last_name}}',
    group_size: 100,
    group_sort: 'desc',
    group_after_key: {},
    sort: '_created_at:desc',
    from: 0,
    size: 100,
    hydrate: false,
    fields: ['_id', '_title'],
    templates: {
      content_top_name: 'Customer #{{contract.customer_number}}',
      main_content_name: '{{contract.contract_name}} ({{contract.contract_number}})',
      content_bottom_name: '{{custom_contract_delivery_address}}'
    },
    filters: [
      {
        term: {
          'status.keyword': 'active'
        }
      },
      {
        range: {
          _created_at: {
            gte: '2023-01-01'
          }
        }
      }
    ],
    filters_context: [
      {
        portal_user: true
      },
      {
        contact: true
      },
      /* ... 1 more */
    ],
    targets: ['3ec28ab5-8598-41ef-9486-b57fca1d5e2a']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.canTriggerPortalFlow(
  {
    origin: 'example',
    portal_id: 'example',
  },
  {
    activity_id: '01F130Q52Q6MWSNS8N2AVXV4JN',
    ecp_config: {
      file_config: {
        shared_with_end_customer: true,
        _tags: ['example', 'mock']
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAutomationContext({
  activity_id: 'example',
  type: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `updateWorkflowStepAsDone`

Update a workflow step as done

`PUT /v2/portal/workflow/{workflow_id}/{step_id}:markDone`

```ts
const { data } = await client.updateWorkflowStepAsDone({
  workflow_id: 'example',
  step_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Get workflows for an entity

`GET /v2/portal/entity/{slug}/{id}/workflows`

```ts
const { data } = await client.getEntityWorkflows({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

Upload Meter Reading Photo

`POST /v2/portal/metering/reading/photo`

```ts
const { data } = await client.uploadMeterReadingPhoto(
  null,
  {
    filename: 'Reading 10.01.2025.jpg',
    mime_type: 'image/jpeg',
    contents: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYFxgYFxgYHSggGBolHRgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUt',
    meter_id: '5da0a718-c822-403d-9f5d-20d4584e0528'
  },
)
```

<details>
<summary>Response</summary>

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

Create Meter Reading

`POST /v2/portal/metering/reading`

```ts
const { data } = await client.createMeterReading(
  {
    override_plausibility: true,
  },
  {
    value: 240,
    read_by: 'John Doe',
    reason: 'Storing the feed-in record',
    meter_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    counter_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    direction: 'feed-in',
    timestamp: '2022-10-10T00:00:00.000Z',
    source: 'ECP',
    status: 'valid',
    external_id: 'string',
    remark: 'Customer reported unusual consumption',
    metadata: {
      registration_id: '1234567890',
      business_unit: 'ABC'
    }
  },
)
```

<details>
<summary>Response</summary>

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

`GET /v2/portal/metering/reading/allowed-range/{meter_id}`

```ts
const { data } = await client.getAllowedMeterReadingRange({
  meter_id: 'example',
  origin: 'example',
  timestamp: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.ssoLogin(
  {
    origin: 'example',
    org_id: 'example',
    contact_id: 'example',
  },
  {
    provider_slug: 'office-365-login'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.ssoLoginV3(
  {
    portal_id: 'example',
    org_id: 'example',
    contact_id: 'example',
  },
  {
    provider_slug: 'office-365-login'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "token": "string",
  "email": "portal-customer@email.com"
}
```

</details>

---

### `ssoRedirect`

Handles the redirect from the external SSO provider. Validates the authorization `code` and `state` received from the provider.
Redirects the user to the provided `web_uri` with the validated credenti

`POST /v2/portal/public/sso/redirect`

```ts
const { data } = await client.ssoRedirect({
  web_uri: 'example',
})
```

---

### `ssoCallback`

Handles the callback from the external SSO provider, validates the authorization `code`
and generates a external provider token to be used with the CUSTOM_AUTH flow against Cognito.

`POST /v2/portal/public/sso/callback`

```ts
const { data } = await client.ssoCallback(
  {
    domain: 'example',
  },
  {
    provider_slug: 'office-365-login',
    token_endpoint: 'https://www.facebook.com/v12.0/dialog/oauth',
    grant_type: 'authorization_code',
    code: '123456',
    redirect_uri: 'https://customer-portal.com/login',
    client_id: '123456',
    code_verifier: '123456'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalPage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updatePortalPage(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    slug: 'dashboard',
    path: '/dashboard',
    schema: ['string'],
    visibility: {},
    content: {},
    design: {},
    blocks: {},
    order: 1,
    is_system: false,
    is_detail: false,
    detail_schema: 'contact',
    is_public: true,
    parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
    is_entry_route: false,
    is_deleted: false
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePortalPage({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getPortalPages`

Fetch all portal pages

`GET /v2/portal/pages`

```ts
const { data } = await client.getPortalPages({
  domain: 'example',
  fields: 'example',
  filter: 'example',
  contract_id: 'example',
  context_entities: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createPortalPage(
  {
    domain: 'example',
  },
  {
    slug: 'dashboard',
    path: '/dashboard',
    schema: ['string'],
    visibility: {},
    content: {},
    design: {},
    blocks: {},
    order: 1,
    is_system: false,
    is_detail: false,
    detail_schema: 'contact',
    is_public: true,
    parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
    is_entry_route: false,
    is_deleted: false
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPublicPages({
  domain: 'example',
  fields: 'example',
  filter: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getDefaultPages()
```

<details>
<summary>Response</summary>

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

### `createPortalPageBlock`

Create a new portal page block

`POST /v2/portal/pages/{id}/blocks`

```ts
const { data } = await client.createPortalPageBlock(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    props: {
      visibility: {},
      content: {},
      design: {}
    },
    parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
    type: 'tab',
    order: 1
  },
)
```

<details>
<summary>Response</summary>

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

### `getPortalPageBlocks`

Fetch all portal page blocks

`GET /v2/portal/pages/{id}/blocks`

```ts
const { data } = await client.getPortalPageBlocks({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

### `getPortalPageBlock`

Fetch a portal page block by id

`GET /v2/portal/pages/{id}/blocks/{block_id}`

```ts
const { data } = await client.getPortalPageBlock({
  id: '123e4567-e89b-12d3-a456-426614174000',
  block_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updatePortalPageBlock(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    block_id: 'example',
  },
  {
    props: {
      visibility: {},
      content: {},
      design: {}
    },
    parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
    type: 'tab',
    order: 1
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePortalPageBlock({
  id: '123e4567-e89b-12d3-a456-426614174000',
  block_id: 'example',
})
```

---

### `getUserEntryPoint`

Get the entry point for the user

`GET /v2/portal/public/user/entry-point`

```ts
const { data } = await client.getUserEntryPoint({
  email: 'example',
  domain: 'example',
})
```

<details>
<summary>Response</summary>

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

Update Campaign Portal Block Status

`PUT /v2/portal/campaign/{campaign_id}/entity:status`

```ts
const { data } = await client.updateCampaignPortalBlockStatus(
  {
    campaign_id: 'example',
  },
  {
    status: 'seen',
    entity_refs: [
      {
        entity_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
        entity_schema: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateNotificationsStatus(
  null,
  {
    notifications: [
      {
        id: 'string',
        status: 'read'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deRegisterMLoginUser({
  client_id: 'example',
  user_id: 'example',
})
```

---

### `notifyMLoginInterestChange`

Notifies the interest change of a user in the M Login client

`POST /v2/portal/public/m-login/notify-interest-change/{client_id}/{user_id}`

```ts
const { data } = await client.notifyMLoginInterestChange(
  {
    client_id: 'example',
    user_id: 'example',
  },
  {
    resource_id: 'string',
    user_id: 'string',
    interest_tag: 'string',
    action: 'string',
    resource: {
      resource_id: 'string',
      description: 'string',
      contact: 'string',
      kind: 'string'
    }
  },
)
```

---

### `createPortalConfig`

Creates a new portal configuration.

`POST /v3/portal/config`

```ts
const { data } = await client.createPortalConfig(
  null,
  {
    entity_actions: [
      {
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
        slug: 'contact',
        action_Label: { /* ... */ }
      }
    ],
    extensions: [
      {
        id: 'string',
        status: 'installed',
        options: {}
      }
    ],
    extension_hooks: {},
    default_user_to_notify: {
      onPendingUser: [
        { /* ... */ }
      ]
    },
    enabled: true,
    name: 'Installer Portal',
    domain: 'abc.com',
    is_epilot_domain: true,
    epilot_domain: 'example-portal-1.ecp.epilot.io',
    domain_settings: {
      is_custom_domain_enabled: true,
      is_epilot_domain_enabled: true,
      is_redirection_enabled: true
    },
    design_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    self_registration_setting: 'ALLOW_WITH_CONTACT_CREATION',
    user_account_self_management: false,
    feature_settings: {
      start_page: true,
      billing: true,
      change_due_date: true,
      new_design: true
    },
    accessToken: 'string',
    advanced_mfa: {
      enabled: true
    },
    auth_settings: {
      passwordless_login: {
        enabled: true
      },
      entry_point: 'PASSWORD',
      preferred_sso_providers: ['office-365-login'],
      auto_redirect_to_sso: true
    },
    cognito_details: {
      cognito_user_pool_client_id: '6bsd0jkgoie74k2i8mrhc1vest',
      cognito_user_pool_arn: 'arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341',
      cognito_user_pool_id: 'eu-central-1_CUEQRNbUb',
      password_policy: {
        minimum_length: 8,
        maximum_length: 256,
        require_lowercase: true,
        require_uppercase: true,
        require_numbers: true,
        require_symbols: true
      }
    },
    config: 'string',
    contact_identifiers: ['email', 'last_name'],
    approval_state_attributes: {
      contact: ['name', 'address'],
      contract: ['installment_amount']
    },
    email_templates: {
      confirmAccount: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedAuth: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedMFA: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignUp: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignInOneTimePassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeyLoginOTP: '5da0a718-c822-403d-9f5d-20d4584e0528',
      forgotPassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      invitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      partnerInvitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onNewQuote: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onMapAPendingUser: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onDocUpload: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onWorkflowStepAssigned: '5da0a718-c822-403d-9f5d-20d4584e0528',
      confirmEmailUpdate: '5da0a718-c822-403d-9f5d-20d4584e0528',
      verifyCodeToSetPassword: '5da0a718-c822-403d-9f5d-20d4584e0528'
    },
    images: {
      orderLeftTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg',
      orderRightTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg',
      welcomeBanner: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg'
    },
    entity_identifiers: {
      type: {
        isEnabled: true,
        attributes: ['contract_number']
      }
    },
    contract_identifiers: [
      {
        name: 'email',
        schema: 'contact'
      },
      {
        name: 'last_name',
        schema: 'contact'
      },
      /* ... 1 more */
    ],
    contract_selector_config: {
      show_inactive: true,
      title_path: 'string'
    },
    registration_identifiers: [
      {
        name: 'last_name',
        schema: 'contact'
      },
      {
        name: 'contract_number',
        schema: 'contract'
      }
    ],
    triggered_journeys: [
      {
        trigger_name: 'FIRST_LOGIN',
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528'
      }
    ],
    entity_edit_rules: [
      {
        slug: 'contact',
        attribute: 'first_name',
        rule_type: 'cadence',
        cadence_period_type: 'days',
        cadence_period: 1,
        changes_allowed: 1,
        grace_period: 1,
        allowed_increment: '10%',
        allowed_decrement: '10%',
        number_of_days_before_restriction: 10
      }
    ],
    allowed_file_extensions: {
      document: ['pdf'],
      image: ['jpg'],
      spreadsheet: ['xls'],
      presentation: ['ppt'],
      audioVideo: ['mp4'],
      email: ['eml'],
      archive: ['zip'],
      cad: ['cad'],
      calendar: ['ics'],
      other: ['txt']
    },
    prevent_search_engine_indexing: true,
    meter_reading_grace_period: 0,
    inactive_contract_cutoff_years: 0,
    is_dummy: true,
    is_v3_item: true,
    portal_id: '453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    portal_sk_v3: 'PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    origin: 'string',
    pages: [
      {
        slug: 'dashboard',
        path: '/dashboard',
        schema: ['string'],
        visibility: {},
        content: {},
        design: {},
        blocks: {},
        order: 1,
        is_system: false,
        is_detail: false,
        detail_schema: 'contact',
        is_public: true,
        parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
        is_entry_route: false,
        is_deleted: false
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getPortalConfigV3({
  portal_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putPortalConfig(
  {
    portal_id: 'example',
  },
  {
    entity_actions: [
      {
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
        slug: 'contact',
        action_Label: { /* ... */ }
      }
    ],
    extensions: [
      {
        id: 'string',
        status: 'installed',
        options: {}
      }
    ],
    extension_hooks: {},
    default_user_to_notify: {
      onPendingUser: [
        { /* ... */ }
      ]
    },
    enabled: true,
    name: 'Installer Portal',
    domain: 'abc.com',
    is_epilot_domain: true,
    epilot_domain: 'example-portal-1.ecp.epilot.io',
    domain_settings: {
      is_custom_domain_enabled: true,
      is_epilot_domain_enabled: true,
      is_redirection_enabled: true
    },
    design_id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    self_registration_setting: 'ALLOW_WITH_CONTACT_CREATION',
    user_account_self_management: false,
    feature_settings: {
      start_page: true,
      billing: true,
      change_due_date: true,
      new_design: true
    },
    accessToken: 'string',
    advanced_mfa: {
      enabled: true
    },
    auth_settings: {
      passwordless_login: {
        enabled: true
      },
      entry_point: 'PASSWORD',
      preferred_sso_providers: ['office-365-login'],
      auto_redirect_to_sso: true
    },
    cognito_details: {
      cognito_user_pool_client_id: '6bsd0jkgoie74k2i8mrhc1vest',
      cognito_user_pool_arn: 'arn:aws:cognito-idp:us-east-1:123412341234:userpool/us-east-1_123412341',
      cognito_user_pool_id: 'eu-central-1_CUEQRNbUb',
      password_policy: {
        minimum_length: 8,
        maximum_length: 256,
        require_lowercase: true,
        require_uppercase: true,
        require_numbers: true,
        require_symbols: true
      }
    },
    config: 'string',
    contact_identifiers: ['email', 'last_name'],
    approval_state_attributes: {
      contact: ['name', 'address'],
      contract: ['installment_amount']
    },
    email_templates: {
      confirmAccount: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedAuth: '5da0a718-c822-403d-9f5d-20d4584e0528',
      advancedMFA: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignUp: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeySignInOneTimePassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      journeyLoginOTP: '5da0a718-c822-403d-9f5d-20d4584e0528',
      forgotPassword: '5da0a718-c822-403d-9f5d-20d4584e0528',
      invitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      partnerInvitation: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onNewQuote: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onMapAPendingUser: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onDocUpload: '5da0a718-c822-403d-9f5d-20d4584e0528',
      onWorkflowStepAssigned: '5da0a718-c822-403d-9f5d-20d4584e0528',
      confirmEmailUpdate: '5da0a718-c822-403d-9f5d-20d4584e0528',
      verifyCodeToSetPassword: '5da0a718-c822-403d-9f5d-20d4584e0528'
    },
    images: {
      orderLeftTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-left-teaser.jpeg',
      orderRightTeaser: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/order-right-teaser.jpeg',
      welcomeBanner: 'https://epilot-bucket.s3.eu-central-1.amazonaws.com/12344/6538fddb-f0e9-4f0f-af51-6e57891ff20a/welcome-banner.jpeg'
    },
    entity_identifiers: {
      type: {
        isEnabled: true,
        attributes: ['contract_number']
      }
    },
    contract_identifiers: [
      {
        name: 'email',
        schema: 'contact'
      },
      {
        name: 'last_name',
        schema: 'contact'
      },
      /* ... 1 more */
    ],
    contract_selector_config: {
      show_inactive: true,
      title_path: 'string'
    },
    registration_identifiers: [
      {
        name: 'last_name',
        schema: 'contact'
      },
      {
        name: 'contract_number',
        schema: 'contract'
      }
    ],
    triggered_journeys: [
      {
        trigger_name: 'FIRST_LOGIN',
        journey_id: '5da0a718-c822-403d-9f5d-20d4584e0528'
      }
    ],
    entity_edit_rules: [
      {
        slug: 'contact',
        attribute: 'first_name',
        rule_type: 'cadence',
        cadence_period_type: 'days',
        cadence_period: 1,
        changes_allowed: 1,
        grace_period: 1,
        allowed_increment: '10%',
        allowed_decrement: '10%',
        number_of_days_before_restriction: 10
      }
    ],
    allowed_file_extensions: {
      document: ['pdf'],
      image: ['jpg'],
      spreadsheet: ['xls'],
      presentation: ['ppt'],
      audioVideo: ['mp4'],
      email: ['eml'],
      archive: ['zip'],
      cad: ['cad'],
      calendar: ['ics'],
      other: ['txt']
    },
    prevent_search_engine_indexing: true,
    meter_reading_grace_period: 0,
    inactive_contract_cutoff_years: 0,
    is_dummy: true,
    is_v3_item: true,
    portal_id: '453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    portal_sk_v3: 'PORTAL_CONFIG#453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    origin: 'string',
    organization_id: 12345,
    org_settings: {
      canary: {
        enabled: true
      },
      notracking: {
        enabled: true
      }
    },
    feature_flags: {},
    grants: [
      {
        action: 'entity-read',
        resource: 'entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947',
        effect: 'allow'
      }
    ],
    identity_providers: [
      {
        slug: 'office-365-login',
        display_name: 'Office 365 Login',
        oidc_config: { /* ... */ },
        mobile_oidc_config: { /* ... */ }
      }
    ],
    pages: [
      {
        slug: 'dashboard',
        path: '/dashboard',
        schema: ['string'],
        visibility: {},
        content: {},
        design: {},
        blocks: {},
        order: 1,
        is_system: false,
        is_detail: false,
        detail_schema: 'contact',
        is_public: true,
        parentId: 'c495fef9-eeca-4019-a989-8390dcd9825b',
        is_entry_route: false,
        is_deleted: false,
        id: 'c495fef9-eeca-4019-a989-8390dcd9825b',
        last_modified_at: '2021-02-09T12:41:43.662Z'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deletePortalConfig({
  portal_id: 'example',
})
```

---

### `listAllPortalConfigs`

Retrieves all portal configurations.

`GET /v3/portal/configs`

```ts
const { data } = await client.listAllPortalConfigs()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.swapPortalConfig(
  null,
  {
    source_portal_id: '453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    target_portal_id: '453ad7bf-86d5-46c8-8252-bcc868df5e3c',
    items_to_swap: ['all']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.invitePartner(
  null,
  {
    email: 'string',
    represents_contact_list: ['5da0a718-c822-403d-9f5d-20d4584e0528']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listBusinessPartners()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.resendPartnerInvitation({
  partner_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.revokePartner({
  partner_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.disablePartner({
  partner_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.enablePartner({
  partner_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "message": "Partner enabled from portal successfully"
}
```

</details>

---

## Schemas

### `ContextEntity`

An entity reference for context-aware operations

```ts
type ContextEntity = {
  entity_schema: string
  entity_id: string // uuid
}
```

### `ContextEntities`

Additional entities to include in the context for variable interpolation. Portal User and Contact entities are automatically part of the context.

```ts
type ContextEntities = Array<{
  entity_schema: string
  entity_id: string // uuid
}>
```

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
}
```

### `FailedRuleErrorResp`

```ts
type FailedRuleErrorResp = {
  message?: string
  failed_rule?: object
}
```

### `EmailTemplates`

Email templates used for authentication and internal processes

```ts
type EmailTemplates = {
  confirmAccount?: string // uuid
  advancedAuth?: string // uuid
  advancedMFA?: string // uuid
  journeySignUp?: string // uuid
  journeySignInOneTimePassword?: string // uuid
  journeyLoginOTP?: string // uuid
  forgotPassword?: string // uuid
  invitation?: string // uuid
  partnerInvitation?: string // uuid
  onNewQuote?: string // uuid
  onMapAPendingUser?: string // uuid
  onDocUpload?: string // uuid
  onWorkflowStepAssigned?: string // uuid
  confirmEmailUpdate?: string // uuid
  verifyCodeToSetPassword?: string // uuid
}
```

### `DeleteEntityFile`

```ts
type DeleteEntityFile = {
  entity_id: string // uuid
  entity_type: string
  file_entity_ids: string // uuid[]
}
```

### `SaveEntityFile`

```ts
type SaveEntityFile = {
  entity_id: string // uuid
  entity_type: string
  files: Array<{
    filename: string
    access_control?: "private" | "public-read"
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
  }>
}
```

### `SavePortalFile`

```ts
type SavePortalFile = {
  origin: string
  files: Array<{
    filename?: string
    file_type: string
    _tags?: string[]
    s3ref?: {
      bucket: { ... }
      key: { ... }
    }
  }>
}
```

### `ExtraSchemaAttributes`

```ts
type ExtraSchemaAttributes = Array<{
  name: string
  label: string
  group: string
}>
```

### `Origin`

Origin of the portal

```ts
type Origin = string
```

### `AllowedFileExtensions`

Allowed file extensions for upload

```ts
type AllowedFileExtensions = {
  document?: string[]
  image?: string[]
  spreadsheet?: string[]
  presentation?: string[]
  audioVideo?: string[]
  email?: string[]
  archive?: string[]
  cad?: string[]
  calendar?: string[]
  other?: string[]
}
```

### `UpdateOnlyPortalConfigAttributes`

```ts
type UpdateOnlyPortalConfigAttributes = {
  entity_actions?: Array<{
    journey_id?: string // uuid
    slug?: string
    action_Label?: {
      en?: { ... }
      de?: { ... }
    }
  }>
  extensions?: Array<{
    id: string
    status: "installed" | "enabled"
    options?: Record<string, string>
  }>
  extension_hooks?: Record<string, {
    app_id: string
    extension_id: string
    hook_id: string
  }>
  default_user_to_notify?: {
    onPendingUser?: Array<{
      type?: { ... }
      user_id?: { ... }
      display_name?: { ... }
      image_uri?: { ... }
      org_id?: { ... }
      email?: { ... }
      phone?: { ... }
    }>
  }
}
```

### `CommonConfigAttributes`

```ts
type CommonConfigAttributes = {
  enabled?: boolean
  name?: string
  domain: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
    type?: {
      isEnabled?: { ... }
      attributes?: { ... }
    }
  }
  contract_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  contract_selector_config?: {
    show_inactive?: boolean
    title_path?: string
  }
  registration_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  triggered_journeys?: Array<{
    trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER"
    journey_id?: string // uuid
  }>
  entity_edit_rules?: Array<{
    slug?: string
    attribute?: string
    rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments"
    cadence_period_type?: "days" | "weeks" | "months"
    cadence_period?: number
    changes_allowed?: number
    grace_period?: number
  // ...
}
```

### `UpsertPortalConfig`

```ts
type UpsertPortalConfig = {
  entity_actions?: Array<{
    journey_id?: string // uuid
    slug?: string
    action_Label?: {
      en?: { ... }
      de?: { ... }
    }
  }>
  extensions?: Array<{
    id: string
    status: "installed" | "enabled"
    options?: Record<string, string>
  }>
  extension_hooks?: Record<string, {
    app_id: string
    extension_id: string
    hook_id: string
  }>
  default_user_to_notify?: {
    onPendingUser?: Array<{
      type?: { ... }
      user_id?: { ... }
      display_name?: { ... }
      image_uri?: { ... }
      org_id?: { ... }
      email?: { ... }
      phone?: { ... }
    }>
  }
  enabled?: boolean
  name?: string
  domain: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
  // ...
}
```

### `PortalConfig`

```ts
type PortalConfig = {
  enabled?: boolean
  name?: string
  domain: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
    type?: {
      isEnabled?: { ... }
      attributes?: { ... }
    }
  }
  contract_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  contract_selector_config?: {
    show_inactive?: boolean
    title_path?: string
  }
  registration_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  triggered_journeys?: Array<{
    trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER"
    journey_id?: string // uuid
  }>
  entity_edit_rules?: Array<{
    slug?: string
    attribute?: string
    rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments"
    cadence_period_type?: "days" | "weeks" | "months"
    cadence_period?: number
    changes_allowed?: number
    grace_period?: number
  // ...
}
```

### `UpsertPortalWidget`

```ts
type UpsertPortalWidget = {
  widgets: Array<{
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
    schema?: string
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
    content?: string
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
    actions?: Array<{
      _id: { ... }
      type: { ... }
      label: { ... }
      url: { ... }
      rules?: { ... }
    }>
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
    imageUrl?: string
    button?: {
      label?: { ... }
      url?: { ... }
    }
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
  } | {
    id: string
    type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
    listIndex: number
    headline?: {
      en?: { ... }
      de?: { ... }
    }
    subHeadline?: {
      en?: { ... }
      de?: { ... }
    }
    schema?: string
  // ...
}
```

### `DomainSettings`

Domain settings for the portal

```ts
type DomainSettings = {
  is_custom_domain_enabled?: boolean
  is_epilot_domain_enabled?: boolean
  is_redirection_enabled?: boolean
}
```

### `WidgetBase`

```ts
type WidgetBase = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
}
```

### `EntityWidget`

```ts
type EntityWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  schema?: string
}
```

### `MeterReadingWidget`

```ts
type MeterReadingWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  schema?: string
}
```

### `MeterChartWidget`

```ts
type MeterChartWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  schema?: string
}
```

### `WidgetAction`

```ts
type WidgetAction = {
  _id: string
  type: "link" | "journey"
  label: {
    en?: string
    de?: string
  }
  url: string
  rules?: Array<{
    attribute: string
    attribute_value: string
    entity: string
  }>
}
```

### `ActionWidget`

```ts
type ActionWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  actions?: Array<{
    _id: string
    type: "link" | "journey"
    label: {
      en?: { ... }
      de?: { ... }
    }
    url: string
    rules?: Array<{
      attribute: { ... }
      attribute_value: { ... }
      entity: { ... }
    }>
  }>
}
```

### `TeaserWidget`

```ts
type TeaserWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  imageUrl?: string
  button?: {
    label?: {
      en?: { ... }
      de?: { ... }
    }
    url?: string
  }
}
```

### `ContentWidget`

```ts
type ContentWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  content?: string
}
```

### `DocumentWidget`

```ts
type DocumentWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
}
```

### `PaymentWidget`

```ts
type PaymentWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
}
```

### `CampaignWidget`

```ts
type CampaignWidget = {
  campaign_id?: string
}
```

### `PortalWidget`

```ts
type PortalWidget = {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  schema?: string
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  content?: string
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  actions?: Array<{
    _id: string
    type: "link" | "journey"
    label: {
      en?: { ... }
      de?: { ... }
    }
    url: string
    rules?: Array<{
      attribute: { ... }
      attribute_value: { ... }
      entity: { ... }
    }>
  }>
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
  imageUrl?: string
  button?: {
    label?: {
      en?: { ... }
      de?: { ... }
    }
    url?: string
  }
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  headline?: {
    en?: string
    de?: string
  }
  subHeadline?: {
    en?: string
    de?: string
  }
} | {
  id: string
  type: "ACTION_WIDGET" | "CONTENT_WIDGET" | "ENTITY_WIDGET" | "TEASER_WIDGET" | "DOCUMENT_WIDGET" | "PAYMENT_WIDGET" | "METER_READING_WIDGET" | "METER_CHART_WIDGET" | "CAMPAIGN_WIDGET"
  listIndex: number
  // ...
}
```

### `ContactCountRequest`

```ts
type ContactCountRequest = {
  orgId: string
  contactIdentifiers: Record<string, string>
}
```

### `ContactExistsRequest`

```ts
type ContactExistsRequest = {
  org_id: string
  registration_identifiers: Record<string, Record<string, string>>
}
```

### `UserRequest`

```ts
type UserRequest = {
  email?: string
  first_name?: string
  last_name?: string
  contactId?: string // uuid
}
```

### `CreateUserRequest`

```ts
type CreateUserRequest = {
  email?: string
  first_name?: string
  last_name?: string
  contactId?: string // uuid
  orgId?: string
  password?: string
  contactIdentifiers?: Record<string, string>
  registration_identifiers?: Record<string, Record<string, string>>
  account_id?: string
}
```

### `OrganizationSettings`

```ts
type OrganizationSettings = {
  automation_entity_mapping?: {
    enabled?: boolean
  }
  automation_preview?: {
    enabled?: boolean
  }
  central_inbox_preview_setting?: {
    enabled?: boolean
  }
  contracts_preview_setting?: {
    enabled?: boolean
  }
  disable_ivy?: {
    enabled?: boolean
  }
  double_opt_in?: {
    enabled?: boolean
  }
  ecommerce_catalog_preview?: {
    enabled?: boolean
  }
  ecommerce_opportunities_preview?: {
    enabled?: boolean
  }
  ecommerce_preview?: {
    enabled?: boolean
  }
  end_customer_portal?: {
    enabled?: boolean
  }
  installer_portal?: {
    enabled?: boolean
  }
  entity_schema_builder?: {
    enabled?: boolean
  }
  logic_editor_preview?: {
    enabled?: boolean
  }
  new_navigation?: {
    enabled?: boolean
  }
  partnering?: {
    enabled?: boolean
  }
  product-availability?: {
    enabled?: boolean
  }
  sso?: {
    enabled?: boolean
  }
  submission_preview?: {
    enabled?: boolean
  }
  user_roles_preview?: {
    enabled?: boolean
  }
}
```

### `AuthConfig`

```ts
type AuthConfig = {
  user_pool_id: string
  user_pool_client_id: string
  user_pool_identity_pool_id?: string
  portal_id: string
}
```

### `Exists`

```ts
type Exists = {
  exists: boolean
  active?: boolean
}
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = string
```

### `EntityId`

Entity ID

```ts
type EntityId = string // uuid
```

### `BaseEntity`

```ts
type BaseEntity = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `Schema`

```ts
type Schema = {
  slug?: string
}
```

### `Entity`

```ts
type Entity = Record<string, unknown>
```

### `EntityTemplates`

```ts
type EntityTemplates = {
  templates_output?: Record<string, string | Record<string, string>>
}
```

### `EntityItem`

```ts
type EntityItem = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  templates_output?: Record<string, string | Record<string, string>>
  _schema: string
}
```

### `EntityResponse`

Response for entity get request

```ts
type EntityResponse = {
  result?: {
    _id: string // uuid
    _title: string
    _org: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    templates_output?: Record<string, string | Record<string, string>>
    _schema: string
  }
}
```

### `EntityResponseWithHits`

Response for entity search requests

```ts
type EntityResponseWithHits = {
  results?: Array<{
    _id: string // uuid
    _title: string
    _org: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    templates_output?: Record<string, string | Record<string, string>>
    _schema: string
  }>
  pagination?: {
    from?: number
    size?: number
    total?: number
    has_more?: boolean
  }
  hits?: number
}
```

### `EntityResponseGroupedWithHits`

Response for entity search requests, but with groupings

```ts
type EntityResponseGroupedWithHits = {
  groups?: Array<{
    group?: string
    group_title?: string
    count?: number
    results?: Array<{
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      templates_output?: { ... }
      _schema: { ... }
    }>
    pagination?: {
      from?: { ... }
      size?: { ... }
      total?: { ... }
      has_more?: { ... }
    }
  }>
  groups_pagination?: {
    has_more?: boolean
    after_key?: Record<string, string>
  }
  hits?: number
}
```

### `PortalUser`

The portal user entity

```ts
type PortalUser = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "portal_user"
}
```

### `Contact`

The mapped contact of the portal user

```ts
type Contact = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "contact"
}
```

### `WorfklowIdentifier`

Workflow identifier object

```ts
type WorfklowIdentifier = {
  defition_id?: string
  name?: string
}
```

### `Meter`

The meter entity

```ts
type Meter = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "meter"
}
```

### `Order`

The order entity

```ts
type Order = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "order"
}
```

### `Opportunity`

The opportunity entity

```ts
type Opportunity = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "opportunity"
}
```

### `Contract`

The contract entity

```ts
type Contract = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  contract_name?: string
  contract_number?: string
  status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
  description?: string
  account_number?: string
  branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
  billing_address?: string
  delivery_address?: string
  additional_addresses?: string
  termination_date?: string
  termination_reason?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  billing_duration_amount?: number
  renewal_duration_amount?: number
  renewal_duration_unit?: "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "weeks" | "months" | "years"
  start_date?: string
  billing_due_day?: number
  installment_amount?: number
  balance?: number
  balance_currency?: string
}
```

### `File`

The file entity

```ts
type File = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "file"
}
```

### `Product`

The product entity

```ts
type Product = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "product"
}
```

### `ActivityId`

See https://github.com/ulid/spec

```ts
type ActivityId = string // ulid
```

### `ActivityCallerContext`

```ts
type ActivityCallerContext = {
  PortalAuth?: {
    token?: {
      sub?: { ... }
      email?: { ... }
      cognito:username?: { ... }
      custom:portal_user_id?: { ... }
      custom:contact_entity_id?: { ... }
    }
  }
}
```

### `Activity`

```ts
type Activity = {
  type: string
  title: string
  message: string
  payload?: Record<string, unknown>
}
```

### `EntityEditRule`

```ts
type EntityEditRule = {
  slug?: string
  attribute?: string
  rule_type?: string
  cadence_period_type?: string
  changes_allowed?: number
  cadence_period?: number
  allowed_decrement?: string
  allowed_increment?: string
  number_of_days_before_restriction?: number
  grace_period?: number
}
```

### `ActivityItem`

```ts
type ActivityItem = {
  _id?: string // ulid
  timestamp?: string // date-time
  type: string
  title: string
  message: string
  payload?: {
    entity?: {
      id?: { ... }
      schema?: { ... }
    }
    caller?: {
      PortalAuth?: { ... }
    }
  }
}
```

### `FileItem`

```ts
type FileItem = {
  filename?: string
  access_control?: "private" | "public-read"
  file_date?: string // date-time
  public_url?: string // url
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  _relations?: Array<{
    entity_id?: string // uuid
    _schema?: string
    _title?: string
  }>
  is_new?: boolean
}
```

### `EntityFileCount`

```ts
type EntityFileCount = {
  entity_id: string // uuid
  _schema: string
  _title?: string
  file_count: number
}
```

### `AdminUser`

```ts
type AdminUser = {
  type?: string
  user_id?: string
  display_name?: string
  image_uri?: {
    original?: string
    thumbnail_32?: string
    thumbnail_64?: string
    key?: string
  }
  org_id?: string
  email?: string
  phone?: string
}
```

### `Grant`

```ts
type Grant = {
  action: string
  resource?: string
  effect?: "allow" | "deny"
}
```

### `ActionLabel`

```ts
type ActionLabel = {
  en?: string
  de?: string
}
```

### `Rule`

```ts
type Rule = {
  entity?: string
  attribute?: string
  attribute_value?: string
}
```

### `JourneyActions`

```ts
type JourneyActions = {
  journey_id?: string
  action_label?: {
    en?: string
    de?: string
  }
  slug?: string
  rules?: Array<{
    entity?: string
    attribute?: string
    attribute_value?: string
  }>
}
```

### `ExternalLink`

```ts
type ExternalLink = {
  id: string
  label: Record<string, string>
  type: "link" | "journey" | "seamless"
  link: string
  rules?: object[]
  attribute?: string
  entity?: string
  attribute_value?: string
  icon?: {
    name?: string
    color?: string
    size?: number
  }
  extension_link_id?: string[]
}
```

### `WorkflowExecution`

```ts
type WorkflowExecution = Record<string, unknown>
```

### `WorkflowStep`

```ts
type WorkflowStep = Record<string, unknown>
```

### `BaseBillingEvent`

A base billing event to be inherited by all billing events.

```ts
type BaseBillingEvent = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `InstallmentEvent`

An entity that describes an installment billing event.

```ts
type InstallmentEvent = {
  billing_amount?: number
  billing_amount_decimal?: string
  billing_currency?: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "installment"
  due_date: string // date
  paid_date?: string // date
}
```

### `ReimbursementEvent`

An entity that describes a reimbursement billing event.

```ts
type ReimbursementEvent = {
  billing_amount?: number
  billing_amount_decimal?: string
  billing_currency?: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "reimbursement"
  due_date?: string // date
  paid_date?: string // date
}
```

### `BillingEvent`

An entity that describes a billing event such as a future installment or a reimbursement back to the customer.

```ts
type BillingEvent = {
  billing_amount?: number
  billing_amount_decimal?: string
  billing_currency?: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "installment"
  due_date: string // date
  paid_date?: string // date
} | {
  billing_amount?: number
  billing_amount_decimal?: string
  billing_currency?: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "reimbursement"
  due_date?: string // date
  paid_date?: string // date
}
```

### `BillingAccount`

A billing account

```ts
type BillingAccount = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `Balance`

```ts
type Balance = {
  balance?: number
  balance_decimal?: number
  balance_currency?: string
}
```

### `Currency`

Currency code in ISO 4217 format

```ts
type Currency = string
```

### `EntityGetParams`

```ts
type EntityGetParams = {
  slug: string
  entity_id?: string // uuid
  hydrate?: boolean
  fields?: string[]
  templates?: Record<string, string | Record<string, string>>
  filters?: object[]
  filters_context?: Record<string, boolean | string>[]
  targets?: string // uuid[]
}
```

### `EntitySearchParams`

```ts
type EntitySearchParams = {
  slug: string | string[]
  q?: string
  q_fields?: string[]
  group?: string
  group_title?: string
  group_size?: number
  group_sort?: "asc" | "desc"
  group_after_key?: Record<string, string | number>
  sort?: string
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
  templates?: Record<string, string>
  filters?: object[]
  filters_context?: Record<string, boolean | string>[]
  targets?: string // uuid[]
}
```

### `IdentifierAttribute`

```ts
type IdentifierAttribute = {
  label?: string
  name?: string
  type?: string
}
```

### `RegistrationIdentifier`

```ts
type RegistrationIdentifier = {
  name?: string
  schema?: string
}
```

### `ContractIdentifier`

```ts
type ContractIdentifier = {
  name?: string
  schema?: string
}
```

### `AcceptanceDecision`

```ts
type AcceptanceDecision = {
  decision: "accept" | "decline"
}
```

### `TriggerPortalFlow`

```ts
type TriggerPortalFlow = {
  activity_id?: string
  ecp_config?: {
    file_config?: {
      shared_with_end_customer?: { ... }
      _tags?: { ... }
    }
  }
}
```

### `ExtensionConfig`

```ts
type ExtensionConfig = {
  id: string
  status: "installed" | "enabled"
  options?: Record<string, string>
}
```

### `ExtensionHookSelection`

```ts
type ExtensionHookSelection = {
  app_id: string
  extension_id: string
  hook_id: string
}
```

### `PublicExtensionCapabilities`

```ts
type PublicExtensionCapabilities = {
  consumptionDataRetrieval?: Array<{
    extension?: {
      id?: { ... }
      name?: { ... }
    }
    hook?: {
      id?: { ... }
      name?: { ... }
      intervals?: { ... }
    }
  }>
  priceDataRetrieval?: Array<{
    extension?: {
      id?: { ... }
      name?: { ... }
    }
    hook?: {
      id?: { ... }
      name?: { ... }
      intervals?: { ... }
    }
  }>
  costDataRetrieval?: Array<{
    extension?: {
      id?: { ... }
      name?: { ... }
    }
    hook?: {
      id?: { ... }
      name?: { ... }
      intervals?: { ... }
    }
  }>
  contractIdentification?: {
    extension?: {
      id?: { ... }
      name?: { ... }
    }
    hook?: {
      explanation?: { ... }
    }
  }
  meterReadingPlausibilityCheck?: {
    extension?: {
      id?: { ... }
      name?: { ... }
    }
    hook?: {
      plausibility_mode?: { ... }
    }
  }
}
```

### `DataRetrievalItem`

```ts
type DataRetrievalItem = {
  extension?: {
    id?: string
    name?: {
      en: { ... }
    }
  }
  hook?: {
    id?: string
    name?: {
      en: { ... }
    }
    intervals?: string[]
  }
}
```

### `PublicExtensionDetails`

```ts
type PublicExtensionDetails = {
  id?: string
  name?: {
    en: string
  }
}
```

### `PublicDataRetrievalHookDetails`

```ts
type PublicDataRetrievalHookDetails = {
  id?: string
  name?: {
    en: string
  }
  intervals?: string[]
}
```

### `PublicContractIdentificationDetails`

```ts
type PublicContractIdentificationDetails = {
  explanation?: {
    en: string
  }
}
```

### `PublicMeterReadingPlausibilityCheckDetails`

```ts
type PublicMeterReadingPlausibilityCheckDetails = {
  plausibility_mode?: "check" | "range"
}
```

### `Extension`

```ts
type Extension = {
  id: string
  app_id?: string
  app_name?: string
  name: {
    en: string
  }
  description?: {
    en: string
  }
  version?: string
  options?: Array<{
    id: string
    name: {
      en: { ... }
    }
    type: "text" | "secret"
    description?: {
      en: { ... }
    }
    default?: string
    required?: boolean
  }>
  links?: Array<{
    id: string
    name: {
      en: { ... }
    }
    description?: {
      en: { ... }
    }
    type: "seamless"
    condition?: string
    auth?: {
      method?: { ... }
      url: { ... }
      params?: { ... }
      headers?: { ... }
      body?: { ... }
      cache?: { ... }
    }
    redirect: {
      url?: { ... }
      params?: { ... }
    }
  }>
  hooks?: Array<{
    id?: string
  }>
}
```

### `ExtensionSeamlessLink`

```ts
type ExtensionSeamlessLink = {
  id: string
  name: {
    en: string
  }
  description?: {
    en: string
  }
  type: "seamless"
  condition?: string
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  redirect: {
    url?: string
    params?: Record<string, string>
  }
}
```

### `ExtensionHook`

```ts
type ExtensionHook = {
  id?: string
}
```

### `ExtensionHookRegistrationIdentifiersCheck`

Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
  - 200 with contact id if exactly one contact is found
  - 404 if no contact is found or more th

```ts
type ExtensionHookRegistrationIdentifiersCheck = {
  type: "registrationIdentifiersCheck"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers: Record<string, string>
    body?: object
    result?: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionHookContractIdentification`

Hook that replaces the built-in Contract identification for self-assignment. This hook involves an HTTP request whenever a user is trying to self-assign Contract(s).
The expected response http status code to the call is:
  - 200 if found
  - 404 if not found

The following assignment modes are suppo

```ts
type ExtensionHookContractIdentification = {
  type: "contractIdentification"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers: Record<string, string>
    body?: object
    result?: string
  }
  assignment_mode?: "contracts" | "contact_to_contracts" | "contact_to_portal_user"
  contact_relation_attribute?: string
  explanation?: {
    en: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionHookMeterReadingPlausibilityCheck`

Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
  - 200:
    If meter reading is plausible, the response should contain:
      - valid: true
    If meter re

```ts
type ExtensionHookMeterReadingPlausibilityCheck = {
  type: "meterReadingPlausibilityCheck"
  plausibility_mode?: "check" | "range"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    url: string
    body: Record<string, string>
    headers: Record<string, string>
  }
  resolved: {
    dataPath?: string
    counter_identifiers?: string | Record<string, string>
    valid?: string
    upper_limit?: string
    lower_limit?: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionHookPriceDataRetrieval`

Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type ExtensionHookPriceDataRetrieval = {
  type: "priceDataRetrieval"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionHookConsumptionDataRetrieval`

Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type ExtensionHookConsumptionDataRetrieval = {
  type: "consumptionDataRetrieval"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionHookCostDataRetrieval`

Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type ExtensionHookCostDataRetrieval = {
  type: "costDataRetrieval"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, string>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
}
```

### `ExtensionAuthBlock`

```ts
type ExtensionAuthBlock = {
  method?: string
  url: string
  params?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, string>
  cache?: {
    key: string
    ttl: string
  }
}
```

### `Direction`

```ts
type Direction = "feed-in" | "feed-out"
```

### `TariffType`

```ts
type TariffType = "ht" | "nt"
```

### `Source`

```ts
type Source = "ECP" | "ERP" | "360" | "journey-submission"
```

### `Reason`

The reason for recording the reading
If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text


```ts
type Reason = "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
```

### `ReadBy`

The person who recorded the reading

```ts
type ReadBy = string
```

### `ReadingStatus`

```ts
type ReadingStatus = "valid" | "in-validation" | "implausible" | null | ""
```

### `MeterReading`

```ts
type MeterReading = {
  value: number
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  meter_id: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string
  source: "ECP" | "ERP" | "360" | "journey-submission"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  external_id?: string
  remark?: string
  metadata?: Record<string, string>
}
```

### `MeterReadingPhoto`

```ts
type MeterReadingPhoto = {
  filename: string
  mime_type: string
  contents: string
  meter_id: string // uuid
}
```

### `MeterReadingPhotoData`

```ts
type MeterReadingPhotoData = {
  filename: string
  s3ref: {
    bucket: string
    key: string
  }
  reading?: string
  sector?: string
  meter_numbers?: string[]
}
```

### `SSOLoginToken`

```ts
type SSOLoginToken = string
```

### `ProviderSlug`

URL-friendly slug to use as organization-unique identifier for Provider

```ts
type ProviderSlug = string
```

### `ProviderDisplayName`

Human-readable display name for identity provider shown in login

```ts
type ProviderDisplayName = string
```

### `ProviderConfig`

```ts
type ProviderConfig = {
  slug?: string
  display_name: string
  provider_type: "OIDC"
  attribute_mappings?: {
    contact: {
      email: { ... }
      first_name?: { ... }
      last_name?: { ... }
      phone?: { ... }
      preferred_language?: { ... }
      concession?: { ... }
      installer_number?: { ... }
    }
    account?: {
      name?: { ... }
      street?: { ... }
      house_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
    }
    portal_user?: {
      access_status?: { ... }
      expires_at?: { ... }
    }
    concession_attributes?: {
      water?: { ... }
      energy?: { ... }
      gas?: { ... }
    }
  }
  entity_matching?: {
    portal_user?: Record<string, string>
    contact?: Record<string, string>
    auto_create_cognito_user?: boolean
  }
  oidc_config?: {
    type?: "authorization_code" | "implicit"
    oidc_issuer: string
    redirect_uri?: string
    client_id: string
    client_secret?: string
    has_client_secret?: boolean
    scope: string
    metadata?: {
      authorization_endpoint?: { ... }
      token_endpoint?: { ... }
      userinfo_endpoint?: { ... }
      logout_uri?: { ... }
      logout_redirect_uri?: { ... }
      skip_login_as_logout?: { ... }
      mobile_redirect_uri?: { ... }
      test_auth_username?: { ... }
      test_auth_password?: { ... }
    }
    prompt?: "login" | "select_account" | "consent"
  }
  mobile_oidc_config?: {
    client_id?: string
    client_secret?: string
  }
}
```

### `ProviderPublicConfig`

```ts
type ProviderPublicConfig = {
  slug: string
  display_name: string
  oidc_config?: {
    type?: "authorization_code" | "implicit"
    oidc_issuer: string
    redirect_uri?: string
    client_id: string
    client_secret?: string
    has_client_secret?: boolean
    scope: string
    metadata?: {
      authorization_endpoint?: { ... }
      token_endpoint?: { ... }
      userinfo_endpoint?: { ... }
      logout_uri?: { ... }
      logout_redirect_uri?: { ... }
      skip_login_as_logout?: { ... }
      mobile_redirect_uri?: { ... }
      test_auth_username?: { ... }
      test_auth_password?: { ... }
    }
    prompt?: "login" | "select_account" | "consent"
  }
  mobile_oidc_config?: {
    client_id?: string
    client_secret?: string
  }
}
```

### `AttributeMappingConfig`

Dictionary of epilot user attributes to claims

```ts
type AttributeMappingConfig = {
  contact: {
    email: string
    first_name?: string
    last_name?: string
    phone?: string
    preferred_language?: string
    concession?: string
    installer_number?: string
  }
  account?: {
    name?: string
    street?: string
    house_number?: string
    postal_code?: string
    city?: string
  }
  portal_user?: {
    access_status?: string
    expires_at?: string
  }
  concession_attributes?: {
    water?: string
    energy?: string
    gas?: string
  }
}
```

### `EntityMatchingConfig`

Configuration for matching existing entities during SSO login using token claims

```ts
type EntityMatchingConfig = {
  portal_user?: Record<string, string>
  contact?: Record<string, string>
  auto_create_cognito_user?: boolean
}
```

### `OIDCProviderConfig`

```ts
type OIDCProviderConfig = {
  type?: "authorization_code" | "implicit"
  oidc_issuer: string
  redirect_uri?: string
  client_id: string
  client_secret?: string
  has_client_secret?: boolean
  scope: string
  metadata?: {
    authorization_endpoint?: string
    token_endpoint?: string
    userinfo_endpoint?: string
    logout_uri?: string
    logout_redirect_uri?: string
    skip_login_as_logout?: boolean
    mobile_redirect_uri?: string
    test_auth_username?: string
    test_auth_password?: string
  }
  prompt?: "login" | "select_account" | "consent"
}
```

### `MoblieOIDCConfig`

```ts
type MoblieOIDCConfig = {
  client_id?: string
  client_secret?: string
}
```

### `OIDCProviderMetadata`

```ts
type OIDCProviderMetadata = {
  authorization_endpoint?: string
  token_endpoint?: string
  userinfo_endpoint?: string
  logout_uri?: string
  logout_redirect_uri?: string
  skip_login_as_logout?: boolean
  mobile_redirect_uri?: string
  test_auth_username?: string
  test_auth_password?: string
}
```

### `SAMLProviderConfig`

```ts
type SAMLProviderConfig = object
```

### `SSOCallbackRequest`

```ts
type SSOCallbackRequest = {
  provider_slug?: string
  token_endpoint: string
  grant_type: string
  code: string
  redirect_uri: string
  client_id: string
  code_verifier: string
}
```

### `SSOCallbackResponse`

```ts
type SSOCallbackResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  id_token?: string
  scope?: string
}
```

### `BlockProps`

```ts
type BlockProps = {
  visibility?: Record<string, unknown>
  content?: Record<string, unknown>
  design?: Record<string, unknown>
}
```

### `BlockType`

The type of the block. eg; tabs, tab, group, attribute

```ts
type BlockType = string
```

### `BlockRequest`

```ts
type BlockRequest = {
  props?: {
    visibility?: Record<string, unknown>
    content?: Record<string, unknown>
    design?: Record<string, unknown>
  }
  parentId?: string
  type: string
  order: number
}
```

### `BlockId`

The id of the block

```ts
type BlockId = string // uuid
```

### `Block`

```ts
type Block = {
  props?: {
    visibility?: Record<string, unknown>
    content?: Record<string, unknown>
    design?: Record<string, unknown>
  }
  parentId?: string
  type: string
  order: number
  id?: string // uuid
}
```

### `PageRequest`

```ts
type PageRequest = {
  slug: string
  path?: string
  schema?: string[]
  visibility?: Record<string, unknown>
  content?: Record<string, unknown>
  design?: Record<string, unknown>
  blocks?: Record<string, {
    props?: {
      visibility?: { ... }
      content?: { ... }
      design?: { ... }
    }
    parentId?: string
    type: string
    order: number
    id?: string // uuid
  }>
  order: number
  is_system?: boolean
  is_detail?: boolean
  detail_schema?: string
  is_public?: boolean
  parentId?: string
  is_entry_route?: boolean
  is_deleted?: boolean
}
```

### `Page`

```ts
type Page = {
  slug: string
  path?: string
  schema?: string[]
  visibility?: Record<string, unknown>
  content?: Record<string, unknown>
  design?: Record<string, unknown>
  blocks?: Record<string, {
    props?: {
      visibility?: { ... }
      content?: { ... }
      design?: { ... }
    }
    parentId?: string
    type: string
    order: number
    id?: string // uuid
  }>
  order: number
  is_system?: boolean
  is_detail?: boolean
  detail_schema?: string
  is_public?: boolean
  parentId?: string
  is_entry_route?: boolean
  is_deleted?: boolean
  id?: string // uuid
  last_modified_at?: string // date-time
}
```

### `CommonConfigAttributesV3`

```ts
type CommonConfigAttributesV3 = {
  enabled?: boolean
  name?: string
  domain?: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
    type?: {
      isEnabled?: { ... }
      attributes?: { ... }
    }
  }
  contract_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  contract_selector_config?: {
    show_inactive?: boolean
    title_path?: string
  }
  registration_identifiers?: Array<{
    name?: string
    schema?: string
  }>
  triggered_journeys?: Array<{
    trigger_name?: "FIRST_LOGIN" | "ACCEPT_ORDER" | "DECLINE_ORDER"
    journey_id?: string // uuid
  }>
  entity_edit_rules?: Array<{
    slug?: string
    attribute?: string
    rule_type?: "cadence" | "relative_to_current_value" | "days_before_date" | "overdue_payments"
    cadence_period_type?: "days" | "weeks" | "months"
    cadence_period?: number
    changes_allowed?: number
    grace_period?: number
  // ...
}
```

### `PortalId`

ID of the portal

```ts
type PortalId = string
```

### `UpsertPortalConfigV3`

```ts
type UpsertPortalConfigV3 = {
  entity_actions?: Array<{
    journey_id?: string // uuid
    slug?: string
    action_Label?: {
      en?: { ... }
      de?: { ... }
    }
  }>
  extensions?: Array<{
    id: string
    status: "installed" | "enabled"
    options?: Record<string, string>
  }>
  extension_hooks?: Record<string, {
    app_id: string
    extension_id: string
    hook_id: string
  }>
  default_user_to_notify?: {
    onPendingUser?: Array<{
      type?: { ... }
      user_id?: { ... }
      display_name?: { ... }
      image_uri?: { ... }
      org_id?: { ... }
      email?: { ... }
      phone?: { ... }
    }>
  }
  enabled?: boolean
  name?: string
  domain?: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
  // ...
}
```

### `PortalConfigV3`

```ts
type PortalConfigV3 = {
  entity_actions?: Array<{
    journey_id?: string // uuid
    slug?: string
    action_Label?: {
      en?: { ... }
      de?: { ... }
    }
  }>
  extensions?: Array<{
    id: string
    status: "installed" | "enabled"
    options?: Record<string, string>
  }>
  extension_hooks?: Record<string, {
    app_id: string
    extension_id: string
    hook_id: string
  }>
  default_user_to_notify?: {
    onPendingUser?: Array<{
      type?: { ... }
      user_id?: { ... }
      display_name?: { ... }
      image_uri?: { ... }
      org_id?: { ... }
      email?: { ... }
      phone?: { ... }
    }>
  }
  enabled?: boolean
  name?: string
  domain?: string
  is_epilot_domain?: boolean
  epilot_domain?: string
  domain_settings?: {
    is_custom_domain_enabled?: boolean
    is_epilot_domain_enabled?: boolean
    is_redirection_enabled?: boolean
  }
  design_id?: string // uuid
  self_registration_setting?: "ALLOW_WITH_CONTACT_CREATION" | "ALLOW_WITHOUT_CONTACT_CREATION" | "DENY" | "ALWAYS_CREATE_CONTACT" | "DISALLOW_COMPLETELY" | "BLOCK_IF_PORTAL_USER_EXISTS"
  user_account_self_management?: boolean
  feature_settings?: {
    start_page?: boolean
    billing?: boolean
    change_due_date?: boolean
    new_design?: boolean
  }
  accessToken?: string
  advanced_mfa?: {
    enabled?: boolean
  }
  auth_settings?: {
    passwordless_login?: {
      enabled?: { ... }
    }
    entry_point?: "PASSWORD" | "SSO"
    preferred_sso_providers?: string[]
    auto_redirect_to_sso?: boolean
  }
  cognito_details?: {
    cognito_user_pool_client_id?: string
    cognito_user_pool_arn?: string
    cognito_user_pool_id?: string
    password_policy?: {
      minimum_length?: { ... }
      maximum_length?: { ... }
      require_lowercase?: { ... }
      require_uppercase?: { ... }
      require_numbers?: { ... }
      require_symbols?: { ... }
    }
  }
  config?: string
  contact_identifiers?: string[]
  approval_state_attributes?: Record<string, string[]>
  email_templates?: {
    confirmAccount?: string // uuid
    advancedAuth?: string // uuid
    advancedMFA?: string // uuid
    journeySignUp?: string // uuid
    journeySignInOneTimePassword?: string // uuid
    journeyLoginOTP?: string // uuid
    forgotPassword?: string // uuid
    invitation?: string // uuid
    partnerInvitation?: string // uuid
    onNewQuote?: string // uuid
    onMapAPendingUser?: string // uuid
    onDocUpload?: string // uuid
    onWorkflowStepAssigned?: string // uuid
    confirmEmailUpdate?: string // uuid
    verifyCodeToSetPassword?: string // uuid
  }
  images?: {
    orderLeftTeaser?: string
    orderRightTeaser?: string
    welcomeBanner?: string
  }
  entity_identifiers?: {
  // ...
}
```

### `JuiceSettings`

```ts
type JuiceSettings = {
  is_dummy?: boolean
  is_canary?: boolean
  redirect_to?: string
}
```

### `SwappableConfig`

```ts
type SwappableConfig = "all" | "domain" | "users" | "email_templates"
```

### `PortalUserRegistrationStatus`

```ts
type PortalUserRegistrationStatus = "Registration Pending" | "Confirmation Email Sent" | "Registered" | "Email Update In Progress"
```

### `BusinessPartnerItem`

```ts
type BusinessPartnerItem = {
  _id?: string // uuid
  has_portal_user?: boolean
  registration_status?: "Registration Pending" | "Confirmation Email Sent" | "Registered" | "Email Update In Progress"
  email?: string
  _title?: string
  first_name?: string
  last_name?: string
  access_status?: boolean
}
```
