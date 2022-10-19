# @epilot/partner-directory-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/partner-directory-client.svg)](https://www.npmjs.com/package/@epilot/partner-directory-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/partner-directory-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/partner-directory-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Partner API](https://docs.epilot.io/api/partner).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```sh
npm install --save-dev @epilot/partner-directory-client
```

## Usage

```typescript
import { getClient } from '@epilot/partner-directory-client';

const partnerClient = getClient();
await partnerClient.invitePartner({ id: 'e45a6dc2-3795-43a3-ae0f-6b6760f310fc', language: 'en' }).then(res => res.data);
```

## Documentation

https://docs.epilot.io/api/partner/