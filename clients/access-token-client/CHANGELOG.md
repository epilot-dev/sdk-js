# @epilot/access-token-client

## 1.6.0

### Minor Changes

- Remove `origin` from `ContactIdentificationTokenParameters` and from the token item, along with the `PortalOrigin` type. The token carries `portal_id`, and the consuming API resolves the origin from that portal's config.

## 1.5.0

### Minor Changes

- Add the `contact_identification` token type: `ContactIdentificationTokenParameters` (`portal_id`, `contact_id`, `surface_id`, `allowed_operations`, `expires_in`) on `createAccessToken`, the matching fields on the token response, and the `getContactIdentificationTokenJwks` / `getContactIdentificationTokenOIDC` operations.

## 1.1.3

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 1.1.1

### Patch Changes

- Mark access as public for all packages

## 1.1.0

### Minor Changes

- Minor version bump for all client packages
