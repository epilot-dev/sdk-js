# @epilot/erp-integration-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/erp-integration-client.svg)](https://www.npmjs.com/package/@epilot/erp-integration-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/erp-integration-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/erp-integration-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Integration Toolkit API](https://docs.api.epilot.io/integration-toolkit/)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/integration-toolkit-client
```

## Usage

```typescript
import { getClient } from '@epilot/integration-toolkit-client';

const IntegrationToolkitClient = getClient();
const res = await IntegrationToolkitClient.acknowledgeTracking({ack_id: '123e4567-e89b-12d3-a456-426614174000'});
```

## Documentation

https://docs.api.epilot.io/integration-toolkit/
