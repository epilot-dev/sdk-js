# @epilot/tf-blueprints-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/tf-blueprints-client.svg)](https://www.npmjs.com/package/@epilot/tf-blueprints-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/tf-blueprints-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/tf-blueprints-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Terraform Blueprints API](https://docs.epilot.io/api/tf-blueprints)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/tf-blueprints-client
```

## Usage

```typescript
import { getClient } from "@epilot/tf-blueprints-client";

const terraformBlueprintsClient = getClient();
const res = await terraformBlueprintsClient.createOrder(null, order);
```

## Documentation:

https://docs.epilot.io/api/blueprints
