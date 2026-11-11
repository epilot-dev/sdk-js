# @epilot/customer-portal-client

## 0.53.0

### Minor Changes

- `x-epilot-agent` annotations on the operations that change a portal's live configuration (`effect: config` on `upsertPortal`, `putPortalConfig`, `publishPortalRevision`, `createPortalRevision`, `clonePortalConfig`, the page and block writes, the email template and widget upserts and `putMobileConfig`; `effect: destructive` on `swapPortalConfig`), so agents ask a person before calling them
- Metering pass-throughs: `getContractMeters`, `getMeter`, `getMeterCounters`, `getMeterCounter`, `getAllowedMeterReading`, `createMeterReadings`, with `MeterCounter` and `PortalMeterReading`
- `cognito_details` and the page `is_system` flag are documented as server-managed

## 0.52.1

### Patch Changes

- Regenerated from the deployed Customer Portal API: everything in 0.52.0, plus the portal `header` config (`PortalHeader`, `PortalHeaderDesignOverrides`), `engagement_center_title`, `force` on publishing a revision, `draft` on portal files, and 409/413 responses on the config, page, block, email template and file writes
- Removed `getAllFiles` (`GET /v2/portal/user/files`) and `getFilesCountByEntity` (`GET /v2/portal/user/files/count-by-entity`) with `EntityFileCount`: the API no longer serves them

## 0.52.0

### Minor Changes

- Stable release with the same content as 0.52.0-rc.1

## 0.52.0-rc.1

### Minor Changes

- Optional `validation_rule_id` on registration identifiers, additional contact attributes, contact identifiers for accounts, contract identifiers and access point identifiers
- Public portal config: `registration_validation_rules` (rules for the registration and add-contract forms, keyed by rule ID) and the `RegistrationValidationRule` schema
- 400 reasons `INVALID_REGISTRATION_FIELD` (registration) and `INVALID_IDENTIFIER_VALUE` (`identifyContact`, add contract by identifiers), with `fields: [{ schema, name, rule_id }]`
- Email template variables: `link` (the portal's start page)

## 0.36.0

### Minor Changes

- v3 apis

## 0.33.1

### Patch Changes

- Use runtime definition

## 0.29.1

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 0.23.1

### Patch Changes

- Mark access as public for all packages

## 0.23.0

### Minor Changes

- Minor version bump for all client packages
