# @epilot/targetin-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/targetin-client.svg)](https://www.npmjs.com/package/@epilot/targetin-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/targetin-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/targetin-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/targetin-client
```

## Usage

```typescript
import { getClient } from '@epilot/targetin-client';
const targetingClient = getClient();

const logs = await targetingClient.getLogs({ limit: 25, page: 2 });
```

## Documentation

tbw
