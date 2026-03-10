# Portal API

**API Name:** `customer-portal`
**Base URL:** `https://customer-portal-api.sls.epilot.io`

Backend for epilot portals - End Customer Portal & Installer Portal

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `upsertPortal` | POST | `/v2/portal/portal` | upsertPortal |
| `createUser` | POST | `/v2/portal/public/user` | createUser |
| `createUserV3` | POST | `/v3/portal/public/user` | createUserV3 |
| `validateToken` | POST | `/v2/portal/token/validate` | validateToken |
| `revokeToken` | POST | `/v2/portal/token/revoke` | revokeToken |
| `getPortalConfigByDomain` | GET | `/v2/portal/public/config` | getPortalConfigByDomain |
| `getPortalConfig` | GET | `/v2/portal/config` | getPortalConfig |
| `deletePortal` | DELETE | `/v2/portal/config` | deletePortal |
| `getPortalExtensions` | GET | `/v2/portal/extensions` | getPortalExtensions |
| `getPublicPortalExtensionDetails` | GET | `/v2/portal/public/extensions` | getPublicPortalExtensionDetails |
| `getPortalExtensionsV3` | GET | `/v3/portal/extensions` | getPortalExtensionsV3 |
| `getPublicPortalExtensionDetailsV3` | GET | `/v3/portal/public/extensions` | getPublicPortalExtensionDetailsV3 |
| `getConsumption` | GET | `/v2/portal/consumption` | Get Consumption |
| `getCosts` | GET | `/v2/portal/costs` | Get Costs |
| `getPrices` | GET | `/v2/portal/prices` | Get Prices |
| `getExternalLinks` | GET | `/v2/portal/external-links` | getExternalLinks |
| `getResolvedExternalLink` | GET | `/v2/portal/resolve:external-link/{id}` | getResolvedExternalLink |
| `getExternalLinksV3` | GET | `/v3/portal/external-links` | getExternalLinksV3 |
| `getResolvedExternalLinkV3` | GET | `/v3/portal/resolve:external-link/{id}` | getResolvedExternalLinkV3 |
| `getResolvedSeamlessLink` | GET | `/v2/portal/resolve:seamless-link` | getResolvedSeamlessLink |
| `getPublicPortalConfig` | GET | `/v2/portal/public/portal/config` | getPublicPortalConfig |
| `getOrgPortalConfig` | GET | `/v2/portal/org/portal/config` | getOrgPortalConfig |
| `getPublicPortalConfigV3` | GET | `/v3/portal/public/portal/config` | getPublicPortalConfigV3 |
| `getOrgPortalConfigV3` | GET | `/v3/portal/org/portal/config` | getOrgPortalConfigV3 |
| `getAllPortalConfigs` | GET | `/v2/portal/configs` | getAllPortalConfigs |
| `getEmailTemplates` | GET | `/v2/portal/email-templates` | getEmailTemplates |
| `upsertEmailTemplates` | POST | `/v2/portal/email-templates` | upsertEmailTemplates |
| `getEmailTemplatesByPortalId` | GET | `/v3/portal/email-templates/{portal_id}` | getEmailTemplatesByPortalId |
| `upsertEmailTemplatesByPortalId` | POST | `/v3/portal/email-templates/{portal_id}` | upsertEmailTemplatesByPortalId |
| `getPublicPortalWidgets` | GET | `/v2/portal/public-widgets` | getPublicPortalWidgets |
| `getPortalWidgets` | GET | `/v2/portal/widgets` | getPortalWidgets |
| `upsertPortalWidget` | POST | `/v2/portal/widgets` | upsertPortalWidget |
| `replaceECPTemplateVariables` | POST | `/v2/portal/replace-ecp-template-variables` | replaceECPTemplateVariables |
| `getOrganizationSettings` | GET | `/v2/portal/org/settings` | getOrganizationSettings |
| `getSchemas` | GET | `/v2/portal/schemas` | getSchemas |
| `getSchemasByDomain` | GET | `/v2/portal/public/schemas` | getSchemasByDomain |
| `getOrganizationSettingsByDomain` | GET | `/v2/portal/public/org/settings` | getOrganizationSettingsByDomain |
| `extraPermissionAttributes` | GET | `/v2/portal/extra-permission-attributes` | extraPermissionAttributes |
| `validateCaaRecords` | POST | `/v2/portal/validate/caa-records` | validateCaaRecords |
| `validateCaaRecordsV3` | POST | `/v3/portal/validate/caa-records` | validateCaaRecordsV3 |
| `getContact` | GET | `/v2/portal/contact` | getContact |
| `updateContact` | PATCH | `/v2/portal/contact` | updateContact |
| `getECPContact` | GET | `/v2/portal/ecp/contact` | getECPContact |
| `checkContactExists` | POST | `/v2/portal/public/contact/exists` | checkContactExists |
| `checkContactExistsV3` | POST | `/v3/portal/public/contact/exists` | checkContactExistsV3 |
| `getValidSecondaryAttributes` | GET | `/v2/portal/contact/valid/secondary/attributes` | getValidSecondaryAttributes |
| `getPortalUser` | GET | `/v2/portal/user` | getPortalUser |
| `updatePortalUser` | PATCH | `/v2/portal/user` | updatePortalUser |
| `deletePortalUser` | DELETE | `/v2/portal/user` | deletePortalUser |
| `updatePortalUserEmail` | PUT | `/v2/portal/user/update/email` | updatePortalUserEmail |
| `resendConfirmationEmail` | POST | `/v2/portal/user/resend/confirmation-email/{id}` | resendConfirmationEmail |
| `fetchPortalUsersByRelatedEntity` | GET | `/v2/portal/users/by-related-entity` | fetchPortalUsersByRelatedEntity |
| `confirmUser` | GET | `/v2/portal/user/confirm` | confirmUser |
| `confirmUserWithUserId` | GET | `/v2/portal/user/confirm/{id}` | confirmUserWithUserId |
| `userExists` | GET | `/v2/portal/public/user/exists` | userExists |
| `userExistsV3` | GET | `/v3/portal/public/user/exists` | userExistsV3 |
| `getRecipientsToNotifyOnAutomation` | POST | `/v2/portal/recipients-to-notify` | getRecipientsToNotifyOnAutomation |
| `configureDistribution` | GET | `/v2/portal/configure-distribution` | configureDistribution |
| `configureDistributionV3` | GET | `/v3/portal/configure-distribution` | configureDistributionV3 |
| `getAllOrders` | GET | `/v2/portal/order` | getAllOrders |
| `postOrderAcceptance` | POST | `/v2/portal/order/{id}/acceptance` | postOrderAcceptance |
| `getOrder` | GET | `/v2/portal/order/{id}` | getOrder |
| `updateOrder` | PATCH | `/v2/portal/order/{id}` | updateOrder |
| `getAllOpportunities` | GET | `/v2/portal/opportunity` | getAllOpportunities |
| `getSearchableAttributesForOpportunities` | GET | `/v2/portal/opportunities/searchable-attributes` | getSearchableAttributesForOpportunities |
| `getSearchResultsForOpportunities` | POST | `/v2/portal/opportunities/search` | getSearchResultsForOpportunities |
| `getOpportunity` | GET | `/v2/portal/opportunities/{id}` | getOpportunity |
| `updateOpportunity` | PATCH | `/v2/portal/opportunities/{id}` | updateOpportunity |
| `getAllRequests` | GET | `/v2/portal/request` | getAllRequests |
| `getAllContracts` | GET | `/v2/portal/contract` | getAllContracts |
| `getContract` | GET | `/v2/portal/contract/{id}` | getContract |
| `updateContract` | PATCH | `/v2/portal/contract/{id}` | updateContract |
| `addContractByIdentifiers` | POST | `/v2/portal/contract/by-identifiers` | addContractByIdentifiers |
| `getEntityIdentifiers` | GET | `/v2/portal/entity/identifiers/{slug}` | getEntityIdentifiers |
| `getEntityActivityFeed` | GET | `/v2/portal/entity/{slug}/{id}/activity` | getEntityActivityFeed |
| `validateCadenceEntityEditRules` | GET | `/v2/portal/{slug}/{id}:validateRule` | validateCadenceEntityEditRules |
| `searchPaymentRelationsInEntities` | GET | `/v2/portal/entities-by-payment/{id}` | searchPaymentRelationsInEntities |
| `createCustomEntityActivity` | PUT | `/v2/portal/entity/activity` | createCustomEntityActivity |
| `saveEntityFile` | POST | `/v2/portal/entity/file` | saveEntityFile |
| `deleteEntityFile` | DELETE | `/v2/portal/entity/file` | deleteEntityFile |
| `savePortalFiles` | POST | `/v2/portal/portal/files` | savePortalFiles |
| `getRegistrationIdentifiers` | GET | `/v2/portal/registration/identifiers` | getRegistrationIdentifiers |
| `getAllFiles` | GET | `/v2/portal/user/files` | getAllFiles |
| `getFileById` | GET | `/v2/portal/user/file/{id}` | getFileById |
| `trackFileDownloaded` | POST | `/v2/portal/user/file/{id}/downloaded` | trackFileDownloaded |
| `getFilesCountByEntity` | GET | `/v2/portal/user/files/count-by-entity` | getFileCountByEntity |
| `getBillingEvents` | GET | `/v2/portal/billing/events` | getBillingEvents |
| `getCustomerBalance` | GET | `/v2/portal/billing/customers/balance` | getCustomerBalance |
| `getBillingAccount` | GET | `/v2/portal/billing/accounts/{id}` | getBillingAccount |
| `loginToPortalAsUser` | POST | `/v2/portal/admin:login-as-user` | loginToPortalAsUser |
| `triggerEntityAccessEvent` | POST | `/v2/portal/entity/{schema}/access` | triggerEntityAccessEvent |
| `triggerEntityAccessEventV3` | POST | `/v3/portal/entity/{schema}/access` | triggerEntityAccessEventV3 |
| `getPortalUserEntity` | POST | `/v2/portal/entity:get` | getPortalUserEntity |
| `searchPortalUserEntities` | POST | `/v2/portal/entity:search` | searchPortalUserEntities |
| `canTriggerPortalFlow` | POST | `/v2/portal/can-trigger-portal-flow` | canTriggerPortalFlow |
| `getAutomationContext` | GET | `/v2/portal/automation-context` | getAutomationContext |
| `updateWorkflowStepAsDone` | PUT | `/v2/portal/workflow/{workflow_id}/{step_id}:markDone` | updateWorkflowStepAsDone |
| `getEntityWorkflows` | GET | `/v2/portal/entity/{slug}/{id}/workflows` | Get workflows for an entity |
| `uploadMeterReadingPhoto` | POST | `/v2/portal/metering/reading/photo` | Upload Meter Reading Photo |
| `createMeterReading` | POST | `/v2/portal/metering/reading` | Create Meter Reading |
| `getAllowedMeterReadingRange` | GET | `/v2/portal/metering/reading/allowed-range/{meter_id}` | Get allowed reading range for all counters of a meter from the configured 
third |
| `ssoLogin` | POST | `/v2/portal/public/sso/login` | ssoLogin |
| `ssoLoginV3` | POST | `/v3/portal/public/sso/login` | ssoLoginV3 |
| `ssoRedirect` | POST | `/v2/portal/public/sso/redirect` | ssoRedirect |
| `ssoCallback` | POST | `/v2/portal/public/sso/callback` | ssoCallback |
| `getPortalPage` | GET | `/v2/portal/pages/{id}` | getPortalPage |
| `updatePortalPage` | PUT | `/v2/portal/pages/{id}` | updatePortalPage |
| `deletePortalPage` | DELETE | `/v2/portal/pages/{id}` | deletePortalPage |
| `getPortalPages` | GET | `/v2/portal/pages` | getPortalPages |
| `createPortalPage` | POST | `/v2/portal/pages` | createPortalPage |
| `getPublicPages` | GET | `/v2/portal/public/pages` | getPublicPages |
| `getDefaultPages` | GET | `/v2/portal/pages/default` | getDefaultPages |
| `getPortalPageBlocks` | GET | `/v2/portal/pages/{id}/blocks` | getPortalPageBlocks |
| `createPortalPageBlock` | POST | `/v2/portal/pages/{id}/blocks` | createPortalPageBlock |
| `getPortalPageBlock` | GET | `/v2/portal/pages/{id}/blocks/{block_id}` | getPortalPageBlock |
| `updatePortalPageBlock` | PUT | `/v2/portal/pages/{id}/blocks/{block_id}` | updatePortalPageBlock |
| `deletePortalPageBlock` | DELETE | `/v2/portal/pages/{id}/blocks/{block_id}` | deletePortalPageBlock |
| `getUserEntryPoint` | GET | `/v2/portal/public/user/entry-point` | getUserEntryPoint |
| `updateCampaignPortalBlockStatus` | PUT | `/v2/portal/campaign/{campaign_id}/entity:status` | Update Campaign Portal Block Status |
| `updateNotificationsStatus` | PUT | `/v2/portal/notifications/entity:status` | updateNotificationsStatus |
| `deRegisterMLoginUser` | DELETE | `/v2/portal/public/m-login/deregister/{client_id}/{user_id}` | deRegisterMLoginUser |
| `notifyMLoginInterestChange` | POST | `/v2/portal/public/m-login/notify-interest-change/{client_id}/{user_id}` | notifyMLoginInterestChange |
| `createPortalConfig` | POST | `/v3/portal/config` | createPortalConfig |
| `getPortalConfigV3` | GET | `/v3/portal/config/{portal_id}` | getPortalConfigV3 |
| `putPortalConfig` | PUT | `/v3/portal/config/{portal_id}` | putPortalConfig |
| `deletePortalConfig` | DELETE | `/v3/portal/config/{portal_id}` | deletePortalConfig |
| `listAllPortalConfigs` | GET | `/v3/portal/configs` | listAllPortalConfigs |
| `swapPortalConfig` | POST | `/v3/portal/config/swap` | swapPortalConfig |
| `invitePartner` | POST | `/v3/portal/partner/invite` | invitePartner |
| `listBusinessPartners` | GET | `/v3/portal/partner/list` | listBusinessPartners |
| `resendPartnerInvitation` | POST | `/v3/portal/partner/{partner_id}/resend-invitation` | resendPartnerInvitation |
| `revokePartner` | DELETE | `/v3/portal/partner/{partner_id}/revoke` | revokePartner |
| `disablePartner` | POST | `/v3/portal/partner/{partner_id}/disable` | disablePartner |
| `enablePartner` | POST | `/v3/portal/partner/{partner_id}/enable` | enablePartner |

## Usage

```bash
epilot customer-portal upsertPortal
```
