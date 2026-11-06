# @epilot/customer-portal-client

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
