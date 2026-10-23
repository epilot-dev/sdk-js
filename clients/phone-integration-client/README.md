# @epilot/phone-integration-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/phone-integration-client.svg)](https://www.npmjs.com/package/@epilot/phone-integration-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/phone-integration-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/phone-integration-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot Phone Integration API

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/phone-integration-client
```

## Usage

```typescript
import { getClient } from '@epilot/phone-integration-client';
const phoneIntegrationClient = getClient();

const { data: customers } = await phoneIntegrationClient.batchSearchCustomers({ phone_number: ['+4917012345678'] });
```

## Regenerating from a local spec

Pass the service spec to the existing OpenAPI command:

```bash
pnpm openapi /path/to/phone-integration-api/lambda/ApiHandlerFunction/openapi.yml
pnpm typegen
```
