# @epilot/pricing-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/pricing-client.svg)](https://www.npmjs.com/package/@epilot/pricing-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/pricing-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/pricing-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Pricing API](https://docs.epilot.io/api/pricing)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/pricing-client
```

## Usage

```typescript
import { getClient } from '@epilot/pricing-client';

const pricingClient = getClient()
const res = await pricingClient.createOrder(null, order)
```

## Documentation:

https://docs.epilot.io/api/pricing
