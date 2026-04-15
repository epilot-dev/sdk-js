# @epilot/configuration-hub-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/configuration-hub-client.svg)](https://www.npmjs.com/package/@epilot/configuration-hub-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/configuration-hub-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/configuration-hub-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Configuration Hub API](https://docs.epilot.io/api/configuration-hub)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/configuration-hub-client
```

## Usage

```typescript
import { getClient } from '@epilot/configuration-hub-client';

const configurationHubClient = getClient();
const res = await configurationHubClient.listConfigTypes();
```

## Documentation

https://docs.epilot.io/api/configuration-hub
