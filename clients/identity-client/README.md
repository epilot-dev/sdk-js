# @epilot/identity-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/identity-client.svg)](https://www.npmjs.com/package/@epilot/identity-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for the epilot [Identity API](https://docs.epilot.io/api/identity): epilot as an OpenID Connect
provider ("Sign in with epilot").

The client covers the epilot-specific endpoints: the platform-operator client registry (partner applications and
the organizations enabled on them) and the 360 session endpoint used by the portal. The standard OpenID Connect
endpoints are described by the discovery document at `https://id.epilot.cloud/.well-known/openid-configuration`.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/identity-client
```

## Usage

```typescript
import { getClient } from "@epilot/identity-client";

const identityClient = getClient();
// operator API: admin-portal internal-auth bearer required
const { data: clients } = await identityClient.listClients({ partner_key: "babelforce" });
```

Register and look up applications with `identityClient.createOidcClient()` and
`identityClient.getOidcClient()`. The package's `getClient()` and `createClient()` helpers
return SDK HTTP client instances.

## Documentation:

https://docs.epilot.io/api/identity
